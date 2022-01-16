Week 08 - Property Based Testing
================================

Chú ý:

Đây là phiên bản viết của [Bài giảng số 8 Dr.Lars](https://www.youtube.com/watch?v=tGjEvumVBk8).

Trong bài giảng này, chúng tôi đề cập đến một ví dụ máy trạng thái khác, kiểm tra tự động bằng cách sử dụng dấu vết giả lập, quang học và kiểm tra dựa trên thuộc tính.

Tuần này, chúng ta đã sử dụng Plutus commit: 
ae35c4b8fe66dd626679bd2951bd72190e09a123, cùng một commit như chúng ta đã sử dụng trong bài giảng trước.


Token Sale
----------

Trong bài giảng trước, chúng ta đã xem xét các máy trạng thái và thấy cách chúng thường cho phép chúng ta viết ít mã hơn nhiều để thể hiện logic của hợp đồng thông minh, một phần là do có nhiều sự chia sẻ giữa mã on-chain và mã off-chain và một phần bởi vì rất nhiều  boilerplate được đóng gói trong state machine.

Trong bài giảng này, chúng ta sẽ thấy một ví dụ khác sử dụng máy trạng thái, bởi vì khái niệm này rất quan trọng. Chúng tôi cũng sẽ xem xét thử nghiệm. Đầu tiên chúng ta sẽ xem xét mã, sau đó chúng ta sẽ khám phá các cách khác nhau để bắt đầu thử nghiệm.

Ví dụ mà chúng tôi sẽ sử dụng là một hợp đồng cho phép ai đó bán token. Ý tưởng là ai đó gọi khóa một số token trong hợp đồng, đặt giá và sau đó người khác có thể mua chúng.

Để bắt đầu, người bán bắt đầu với một NFT. Nó có thể là một NFT tùy ý và nó sẽ chỉ được sử dụng, như trước đây, để xác định đúng UTxO có chứa trạng thái hợp đồng.

Bước đầu tiên là khóa NFT tại địa chỉ tập lệnh của hợp đồng thông minh mà chúng ta sắp viết. Chúng tôi sẽ gọi hợp đồng `TS` cho Token Sale. Là một datum, chúng tôi sẽ sử dụng một số nguyên đơn giản, sẽ đại diện cho giá của token mà chúng tôi đang bán và điều này sẽ bắt đầu bằng 0.

![](img/week08__00001.png)

Sẽ có một số thao tác mà người bán có thể thực hiện. Một trong số đó sẽ đặt giá thành một giá trị khác. Để làm điều đó, người bán sẽ gửi một giao dịch có UTxO hiện tại làm đầu vào và UTxO được cập nhật làm đầu ra, trong đó datum đã được thay đổi thành một mức giá khác cho mỗi token.

![](img/week08__00002.png)

Một điều khác mà người bán có thể làm là khóa một số token trong hợp đồng. Để làm được điều đó, họ phải tạo một giao dịch khác có đầu vào là UTxO của hợp đồng và UTxO chứa một số token và như đầu ra, UTxO được cập nhật tại địa chỉ hợp đồng hiện chứa các token được cung cấp.

![](img/week08__00003.png)

Trong ví dụ này, người bán cung cấp năm token cho hợp đồng.

Để mua token, cần có một giao dịch được tạo bởi người mua. Giao dịch này có đầu vào là UTxO tại địa chỉ tập lệnh `TS` và giá mua Ada.

Vì vậy, nếu người mua muốn mua hai token, họ sẽ tạo một giao dịch có đầu vào là 12 Ada và UTxO tại địa chỉ tập lệnh. Sau đó, hai đầu ra. Một trạng thái hợp đồng được cập nhật mà bây giờ các token được lấy ra và Ada đã được thêm vào, và một đầu ra sẽ đến tay người mua với các token mà họ vừa mua.

![](img/week08__00004.png)

Cuối cùng, phải có cách để người bán lấy lại các token và Ada. Trong ví dụ này, nếu sau khi bán, người bán muốn truy xuất tất cả Ada và một token, họ sẽ tạo một giao dịch, một lần nữa, có tập lệnh UTxO làm đầu vào và dưới dạng đầu ra, tập lệnh được cập nhật UTxO với số dư giảm và một cho chính họ với các khoản tiền đã truy xuất.

Sơ đồ chỉ hiển thị một tình huống, nhưng các hoạt động này có thể được thực hiện theo bất kỳ thứ tự nào - có thể thêm token, giá có thể thay đổi, có thể mua token, v.v. theo thứ tự tùy ý.


### Mã On-chain

Ví dụ đầu tiên của tuần này được triển khai trong module

``` {.haskell}
module Week08.TokenSale
```

Trước tiên, hãy xem loại mà chúng ta sẽ sử dụng làm tham số mà chúng ta sẽ sử dụng cho hợp đồng.

``` {.haskell}
data TokenSale = TokenSale
    { tsSeller :: !PubKeyHash
    , tsToken  :: !AssetClass
    , tsNFT    :: !AssetClass
    } deriving (Show, Generic, FromJSON, ToJSON, Prelude.Eq, Prelude.Ord)    
```

Điều này có ba trường - khóa công khai của người bán có, token đang được bán và NFT được sử dụng để xác định UTxO.

Đối với redeemer, chúng tôi cung cấp chính xác các hoạt động mà chúng tôi đã thấy trong sơ đồ

``` {.haskell}
data TSredeemer =
      SetPrice Integer         -- the price
    | AddTokens Integer        -- the number of tokens to add
    | BuyTokens Integer        -- the number of tokens to buy
    | Withdraw Integer Integer -- first argument is the number of tokens, the second is the number of lovelace
    deriving (Show, Prelude.Eq)    
```

Một lần nữa chúng ta có hàm trợ giúp mà chúng ta đã sử dụng trong các ví dụ trước

``` {.haskell}
lovelaces :: Value -> Integer
lovelaces = Ada.getLovelace . Ada.fromValue
```

Bây giờ, chúng ta đến với hàm `transition` của máy trạng thái. Chúng tối thấy tham số `TokenSale` chứa các giá trị cấu hình máy trạng thái, `State` là đối tượng có giá trị `Integer` đại diện cho giá của token, sau đó là `Tsredeemer`.  Một lần nữa, chúng tôi trả về`Maybe`,và sẽ trả về `Nothing` nếu quá trình chuyển đổi tương ứng là bất hợp pháp,hoặc  nếu nó hợp pháp thì trả về `Just`

``` {.haskell}
transition :: TokenSale -> State Integer -> TSredeemer -> Maybe (TxConstraints Void Void, State Integer)
transition ts s r = case (stateValue s, stateData s, r) of
```

Nếu `SetPrice` được cung cấp,  thì chúng tôi chỉ coi nó là hợp pháp nếu giá không bị âm. Sau đó chúng tôi trả về `Just` với ràng buộc rằng giao dịch phải được ký bởi người bán token và với trạng thái mới. Trạng thái mới sẽ là giá mới `p`, và `Value`trong hợp đồng vẫn giữ nguyên, ngoại trừ một điều.

Một điều không may, nhưng có một sự khác biệt giữa `v`
bên trai và `v` bên phải. Ở bên trái, nó không chứa NFT, nhưng bên phải thì có chứa NFT. Vì vậy, mặc dù chúng tôi muốn nói rằng chúng tôi không muốn giá trị bị thay đổi, nhưng trên thực tế, chúng tôi phải xóa NFT, vì các thư viện Plutus sẽ thêm lại nó. Đây có lẽ không phải là một thiết kế lý tưởng, nhưng đó là cách hiện tại của nó.

``` {.haskell}
(v, _, SetPrice p) | p >= 0 -> Just ( Constraints.mustBeSignedBy (tsSeller ts)
                                    , State p $
                                      v <>
                                      nft (negate 1)
                                    )
```

Chúng tôi sử dụng một hàm trợ giúp để tham chiếu NFT.

``` {.haskell}
nft :: Integer -> Value
nft = assetClassValue (tsNFT ts)  
```

Khi thêm token, chúng tôi có thể kiểm tra xem người bán đã ký giao dịch chưa, nhưng hợp đồng này sẽ do người bán cung cấp và người bán không phiền nếu ai đó muốn tặng quà miễn phí cho họ! Do đó, khi chúng ta có `AddTokens` dạng redeemer và `n` > 0, chúng ta vui lòng trả lại trạng thái mới mà không bị ràng buộc.

Trạng thái mà chúng tôi trả về là không bị ảnh hưởng, ngoại trừ thủ thuật đáng tiếc mà chúng tôi cần thực hiện với NFT và việc bổ sung các token mới.

``` {.haskell}
(v, p, AddTokens n) | n > 0 -> Just ( mempty
                                    , State p $
                                      v                                       <>
                                      nft (negate 1)                          <>
                                      assetClassValue (tsToken ts) n
                                    )
```

Đối với `BuyTokens` kiểu redeemer,  một lần nữa chúng tôi kiểm tra số lượng token là số dương và chúng tôi không cần bất kỳ ràng buộc nào, vì ai cũng có thể mua token.

Đối với trạng thái mới, chúng tôi không chạm vào giá cả. Chúng tôi lại sửa cho NFT. Sau đó, chúng tôi trừ đi các token đã được mua và chúng tôi thêm vào điểm đáng yêu đã được trả cho chúng.

``` {.haskell}
(v, p, BuyTokens n) | n > 0 -> Just ( mempty
                                    , State p $
                                      v                                       <>
                                      nft (negate 1)                          <>
                                      assetClassValue (tsToken ts) (negate n) <>
                                      lovelaceValueOf (n ` p)
                                    )
```

Cuối cùng `WithDraw`,chúng tôi nhấn mạnh rằng số lượng token và số lượng lovelace đều không âm. Lần này chúng tôi lại thêm một ràng buộc rằng người bán phải ký vào giao dịch. Chúng tôi sửa đổi trạng thái theo cách tương tự như cách chúng tôi đã làm đối với `BuyTokens` kiểu redeemer, nhưng lần này chúng tôi điều chỉnh số lượng token và lovelace theo số tiền đã được rút.

``` {.haskell}
(v, p, Withdraw n l) | n >= 0 && l >= 0 -> Just ( Constraints.mustBeSignedBy (tsSeller ts)
                                                , State p $
                                                  v                                       <>
                                                  nft (negate 1)                          <>
                                                  assetClassValue (tsToken ts) (negate n) <>
                                                  lovelaceValueOf (negate l)
                                                )
```

Tất cả các chuyển đổi trạng thái khác là không hợp lệ.

``` {.haskell}
_ -> Nothing
```

Trong ví dụ này, chúng ta có thể xây dựng máy trạng thái của mình đơn giản hơn mà chúng ta có thể làm trong bài giảng trước. Điều này là do, trong bài giảng trước, chúng ta có một điều kiện không thể được thể hiện trong các ràng buộc thông thường.

Trong những tình huống này, có một hàm trợ giúp được gọi là `mkStateMachine` có ba đối số. Cái đầu tiên là token trạng thái, cái thứ hai là chức năng chuyển tiếp. Cuối cùng cho biết trạng thái nào là cuối cùng. Trong trường hợp này, không có trạng thái cuối cùng. Khi việc bán token này đã được thiết lập, nó sẽ luôn ở đó.

``` {.haskell}
tsStateMachine :: TokenSale -> StateMachine Integer TSredeemer
tsStateMachine ts = mkStateMachine (Just $ tsNFT ts) (transition ts) (const False)
```

Bây giờ chúng ta có thể sử dụng bảng soạn sẵn thông thường để biến nó thành một hợp đồng thông minh của Plutus.

``` {.haskell}
type TS = StateMachine Integer TSredeemer

tsInst :: TokenSale -> Scripts.ScriptInstance TS
tsInst ts = Scripts.validator @TS
    ($$(PlutusTx.compile [|| mkTSValidator ||]) `PlutusTx.applyCode` PlutusTx.liftCode ts)
    $$(PlutusTx.compile [|| wrap ||])
  where
    wrap = Scripts.wrapValidator @Integer @TSredeemer

tsValidator :: TokenSale -> Validator
tsValidator = Scripts.validatorScript . tsInst

tsAddress :: TokenSale -> Ledger.Address
tsAddress = scriptAddress . tsValidator

tsClient :: TokenSale -> StateMachineClient Integer TSredeemer
tsClient ts = mkStateMachineClient $ StateMachineInstance (tsStateMachine ts) (tsInst ts)
```

Có hai chức năng trợ giúp để chuyển đổi các loại lỗi chuyên biệt sang
`Text`.

``` {.haskell}
mapErrorC :: Contract w s C.CurrencyError a -> Contract w s Text a
mapErrorC = mapError $ pack . show

mapErrorSM :: Contract w s SMContractError a -> Contract w s Text a
mapErrorSM = mapError $ pack . show
```

### Mã Off-chain

Đối với mã off-chain chúng tôi bắt đầu bằng cách xác định một hằng số cho tên token của NFT.

``` {.haskell}
nftName :: TokenName
nftName = "NFT"
```

Đầu tiên của Hợp đồng chúng tôi xác định là bắt đầu bán token. Hợp đồng này được thiết kế để được người bán viện dẫn.

Đối số đầu tiên này là `Maybe CurrencySymbol`. Ý tưởng ở đây là nếu không phải là `Nothing`, hợp đồng sẽ tạo ra (mint) một NFT mới. Ngoài ra, bạn có thể cung cấp `Just CurrencySymbol` nếu token đã tồn tại. Chúng tôi đã thực hiện theo cách này chủ yếu để giúp việc kiểm tra dễ dàng hơn. 

Đối số `AssetClass` là token mà người bán muốn giao dịch.

Đối với kiểu kết quả, chúng tôi đang sử dụng kiểu đơn nguyên của người viết với kiểu `Last`. Ý tưởng là một khi việc bán token đã được thiết lập, nó sẽ được viết ở đây để các hợp đồng khác có thể phát hiện ra nó. Ngoài ra, chúng tôi trả lại việc bán token đã tạo.

Để bắt đầu, chúng tôi tra cứu hàm băm khóa công khai của người bán. Sau đó, chúng ta cần nắm giữ NFT. Vì vậy, chúng tôi xác định xem chúng tôi có cần đúc NFT hay không, và nếu có, chúng tôi đúc nó, nếu không, chúng tôi chỉ sử dụng cái đã được truyền vào hàm.

``` {.haskell}
startTS :: HasBlockchainActions s => Maybe CurrencySymbol -> AssetClass -> Contract (Last TokenSale) s Text TokenSale
startTS mcs token = do

    pkh <- pubKeyHash <$> Contract.ownPubKey
    cs  <- case mcs of
        Nothing  -> C.currencySymbol <$> mapErrorC (C.forgeContract pkh [(nftName, 1)])
        Just cs' -> return cs'
```

Và bây giờ chúng ta có thể xác định `TokenSale` và tạo máy khách trạng thái.

``` {.haskell}
let ts = TokenSale
        { tsSeller = pkh
        , tsToken  = token
        , tsNFT    = AssetClass (cs, nftName)
        }
    client = tsClient ts
```

Sau đó, chúng tôi sử dụng hàm`runInitialise` mà chúng tôi đã thảo luận trong bài giảng trước, sử dụng ứng dụng khách, giá ban đầu bằng 0 và không có tiền ban đầu, ngoại trừ NFT sẽ được tự động thêm vào.

Chúng tôi ghi `ts` into the log, vào nhật ký, sau đó ghi một tin nhắn và trả về `ts`.

``` {.haskell}
void $ mapErrorSM $ runInitialise client 0 mempty
tell $ Last $ Just ts
logInfo $ "started token sale " ++ show ts
return ts
```

Các chức năng cho tất cả các hoạt động khác là cực kỳ ngắn. Ví dụ này là lý tưởng cho cách tiếp cận máy trạng thái.

Chúng đều rất giống nhau. Tất cả chúng đều gọi `runStep` và sau đó gọi chuyển đổi chính xác từ máy trạng thái.

Ví dụ, `setPrice`, chúng ta cần  `TokenSale` đối số để xác định hợp đồng chính xác và giá trị mới của giá. Sau đó, chúng tôi sử dụng  `runStep` bằng cách sử dụng máy khách và `SetPrice` với tư cách là redeemer. Chúng tôi chuyển điều đó bằng cách sử dụng `mapErrorSM` để chuyển đổi thành thông báo lỗi `Text`  và chúng tôi bỏ qua kết quả.

``` {.haskell}
setPrice :: HasBlockchainActions s => TokenSale -> Integer -> Contract w s Text ()
setPrice ts p = void $ mapErrorSM $ runStep (tsClient ts) $ SetPrice p
```

Ba phần còn lại làm theo cùng một mô hình.

``` {.haskell}
addTokens :: HasBlockchainActions s => TokenSale -> Integer -> Contract w s Text ()
addTokens ts n = void (mapErrorSM $ runStep (tsClient ts) $ AddTokens n)

buyTokens :: HasBlockchainActions s => TokenSale -> Integer -> Contract w s Text ()
buyTokens ts n = void $ mapErrorSM $ runStep (tsClient ts) $ BuyTokens n

withdraw :: HasBlockchainActions s => TokenSale -> Integer -> Integer -> Contract w s Text ()
withdraw ts n l = void $ mapErrorSM $ runStep (tsClient ts) $ Withdraw n l
```

Bây giờ chúng ta xác định ba lược đồ.

Một cho người bán chỉ có một điểm cuối `CurrencySymbol` và `TokenName` tài sản được giao dịch

``` {.haskell}
type TSStartSchema = BlockchainActions
    .\/ Endpoint "start"      (CurrencySymbol, TokenName)
```

Đối với các mục đích thử nghiệm, chúng tôi tạo ra `TSStartSchema'` và sử dụng `CurrencySymbol` của NFT.

``` {.haskell}
type TSStartSchema' = BlockchainActions
    .\/ Endpoint "start"      (CurrencySymbol, CurrencySymbol, TokenName)  
```

Cuối cùng, chúng tôi có một `use`, với các endpoints cho bốn hoạt động - đặt giá, thêm token, mua token và rút tiền -
set price, add tokens, buy tokens and withdraw.

``` {.haskell}
type TSUseSchema = BlockchainActions
  .\/ Endpoint "set price"  Integer
  .\/ Endpoint "add tokens" Integer
  .\/ Endpoint "buy tokens" Integer
  .\/ Endpoint "withdraw"   (Integer, Integer)  
```

Bây giờ để triển khai endpoint start . Nó đơn giản gọi là `startTs'`.`startTs'` cho đến khi các tham số được cung cấp và sau đó gọi `startTs` với `Nothing`, chỉ ra rằng NFT phải được đúc. Chúng tôi kết thúc `handleError` và nếu có lỗi, chúng tôi chỉ cần ghi lại lỗi đó.

``` {.haskell}
startEndpoint :: Contract (Last TokenSale) TSStartSchema Text ()
startEndpoint = startTS' >> startEndpoint
  where
    startTS' = handleError logError $ endpoint @"start"  >>= void . startTS Nothing . AssetClass
```

Hàm `startEndpoint'` là rất dơn giản, nhưng chúng tôi thêm tham số của NFT như là trên `TSStartSchema'`.

``` {.haskell}
startEndpoint' :: Contract (Last TokenSale) TSStartSchema' Text ()
startEndpoint' = startTS' >> startEndpoint'
  where
    startTS' = handleError logError $ endpoint @"start"  >>= \(cs1, cs2, tn) ->  void $ startTS (Just cs1) $ AssetClass (cs2, tn)
```

No surprises in the `use` endpoints. We give a choice between the four
endpoints and just call the functions we defined earlier with the
arguments fed in from the endpoint call, and with everything wrapped
inside an error handler so that the contract won\'t crash in the event
of an error.
Không có gì ngạc nhiên về endpoint `use` . Chúng tôi đưa ra lựa chọn giữa bốn endpoint và chỉ cần gọi các hàm mà chúng tôi đã xác định trước đó với các đối số được đưa vào từ lệnh gọi điểm cuối và với mọi thứ được bao bọc bên trong trình xử lý lỗi để hợp đồng không bị lỗi trong trường hợp có lỗi.

``` {.haskell}
useEndpoints :: TokenSale -> Contract () TSUseSchema Text ()
useEndpoints ts = (setPrice' `select` addTokens' `select` buyTokens' `select` withdraw') >> useEndpoints ts
  where
    setPrice'  = handleError logError $ endpoint @"set price"  >>= setPrice ts
    addTokens' = handleError logError $ endpoint @"add tokens" >>= addTokens ts
    buyTokens' = handleError logError $ endpoint @"buy tokens" >>= buyTokens ts
    withdraw'  = handleError logError $ endpoint @"withdraw"   >>= uncurry (withdraw ts)
```

### Thử nghiệm

Để dùng thử, hãy chạy nó trong trình mô phỏng.

Chúng tôi định nghĩa hàm `runMyTrace`  sử dụng `runEmulatorTraceIO'`với cấu hình trình mô phỏng tùy chỉnh và một hàm `myTrace`.

``` {.haskell}
runMyTrace :: IO ()
runMyTrace = runEmulatorTraceIO' def emCfg myTrace
```

Đầu tiên chúng ta hãy xem xét hàm `emCfg`. Nhớ lại rằng đây là nơi chúng ta có thể cung cấp các bản phân phối ban đầu tùy chỉnh cho ví. Ở đây, chúng tôi cung cấp 1000 Ada và 1000 token tùy chỉnh vào ba ví.

Chú ý:

Khả năng sử dụng dấu gạch dưới với số lượng lớn chẳng hạn như 1000_000_000 được cung cấp bởi tiện ích mở rộng GHC`NumericUnderscores`


``` {.haskell}
emCfg :: EmulatorConfig
emCfg = EmulatorConfig $ Left $ Map.fromList [(Wallet w, v) | w <- [1 .. 3]]
  where
    v :: Value
    v = Ada.lovelaceValueOf 1000_000_000 <> assetClassValue token 1000

currency :: CurrencySymbol
currency = "aa"

name :: TokenName
name = "A"

token :: AssetClass
token = AssetClass (currency, name)      
```

For the trace, first we activate Wallet 1 using the non-primed
`startEndpoint` function which mints the NFT is minted automatically.
Then, we call the start endpoint, giving it the symbol and name of the
token we want to sell, and then wait for five slots, although two would
be enough in this case.
Đối với dấu vết, trước tiên, chúng tôi kích hoạt Ví 1 bằng hàm `startEndpoint` để đúc NFT và được đúc tự động. Sau đó, chúng tôi gọi endpoint start, đặt cho nó biểu tượng và tên của token mà chúng tôi muốn bán, rồi đợi năm vị trí, mặc dù trong trường hợp này chỉ có hai vị trí là đủ.

``` {.haskell}
myTrace :: EmulatorTrace ()
myTrace = do
    h <- activateContractWallet (Wallet 1) startEndpoint  
    callEndpoint @"start" h (currency, name)
    void $ Emulator.waitNSlots 5
    Last m <- observableState h
```

Sau đó, chúng tôi đọc trạng thái mà chúng tôi đã viết bằng cách sử dụng `tell` và kiểm tra xem nó có hợp lệ hay không. Nếu không, chúng tôi ghi lại một lỗi. Nếu đúng, chúng tôi tiến hành kiểm tra.

``` {.haskell}
case m of
  Nothing -> Extras.logError @String "error starting token sale"
  Just ts -> do  
      Extras.logInfo $ "started token sale " ++ show ts
```

Bây giờ chúng tôi có thể kích hoạt các điểm cuối cho ba ví. Nhớ lại rằng hàm`useEndpoints` được tham số hóa bởi `TokenSale`,đó là lý do tại sao chúng ta cần lấy giá trị đó.

``` {.haskell}
h1 <- activateContractWallet (Wallet 1) $ useEndpoints ts
h2 <- activateContractWallet (Wallet 2) $ useEndpoints ts
h3 <- activateContractWallet (Wallet 3) $ useEndpoints ts  
```

Ví 1 đặt giá thành 1 Ada và chúng tôi lại đợi thêm một khoảng thời gian nữa.

``` {.haskell}
callEndpoint @"set price" h1 1_000_000
void $ Emulator.waitNSlots 5  
```

Ví 1 thêm 100 tokens.

``` {.haskell}
callEndpoint @"add tokens" h1 100
void $ Emulator.waitNSlots 5
```

Ví 2 mua 20 token. Vì vậy, bây giờ hợp đồng sẽ chứa 80 token và 20 Ada.

``` {.haskell}
callEndpoint @"buy tokens" h2 20
void $ Emulator.waitNSlots 5
```

Ví 3 mua 5 token. Bây giờ sẽ có 75 token trong hợp đồng và 25 Ada.

``` {.haskell}
callEndpoint @"buy tokens" h3 5
void $ Emulator.waitNSlots 5
```

Cuối cùng, Wallet 1 gọi điểm cuối rút tiền, lấy ra 40 token và 10 Ada. Tại thời điểm này, sẽ có 35 token và 10 Ada trong hợp đồng.

``` {.haskell}
callEndpoint @"withdraw" h1 (40, 10_000_000)
void $ Emulator.waitNSlots 5
```

Hãy chạy điều này trong REPL.

``` {.}
cabal repl plutus-pioneer-program-week08-tests
Ok, five modules loaded.
Prelude Main> :l Spec.Trace
Ok, one module loaded.
Prelude Spec.Trace> runMyTrace

Slot 00000: TxnValidate 2125c8770581c6140c3c71276889f6353830744191de0184b6aa00b185004500
Slot 00000: SlotAdd Slot 1
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Contract instance started
```

Cuộc gọi điểm cuối đầu tiên là đến `start`. Điều này tạo ra ba giao dịch. Hai trong số này là từ hợp đồng để tạo NFT và hợp đồng thứ ba là thiết lập UTxO ban đầu của chúng tôi để bán token.

``` {.}
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Receive endpoint call: Object (fromList [("tag",String "start"),("value",Object (fromList [("unEndpointValue",Array [Object (fromList [("unCurrencySymbol",String "aa")]),Object (fromList [("unTokenName",String "A")])])]))])
Slot 00001: W1: TxSubmit: cccba8b2abc3e82a735735c2346aa3fcac58152f17854b1745306e5b63a0b965
Slot 00001: TxnValidate cccba8b2abc3e82a735735c2346aa3fcac58152f17854b1745306e5b63a0b965
Slot 00001: SlotAdd Slot 2
Slot 00002: W1: TxSubmit: e23e19192aea3304a989ab98f05e70bc01fe43f3ea940da78a92ab7cebec9bbb
Slot 00002: TxnValidate e23e19192aea3304a989ab98f05e70bc01fe43f3ea940da78a92ab7cebec9bbb
Slot 00002: SlotAdd Slot 3
Slot 00003: W1: TxSubmit: 4cae1c5115eb4128243ce029dcd4d6c23d6497d3ab5e71a79f4dc34e9b8cd763
Slot 00003: TxnValidate 4cae1c5115eb4128243ce029dcd4d6c23d6497d3ab5e71a79f4dc34e9b8cd763
Slot 00003: SlotAdd Slot 4
Slot 00004: `` CONTRACT LOG: "started token sale TokenSale {tsSeller = 21fe31dfa154a261626bf854046fd2271b7bed4b6abe45aa58877ef47f9721b9, tsToken = (aa,\"A\"), tsNFT = (65b4199f7d025bfb3b065b0fb88a77d694ffd849ff740b1a4cc453bfaab30f55,\"NFT\")}"
Slot 00004: SlotAdd Slot 5
Slot 00005: SlotAdd Slot 6
```

Chúng tôi đã đọc thành công giá trị `TokenSale` từ trạng thái có thể quan sát và bắt đầu ba phiên bản hợp đồng cho hợp đồng sử dụng.

``` {.}
Slot 00006: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Sending contract state to Thread 0
Slot 00006: SlotAdd Slot 7
Slot 00007: `` USER LOG: started token sale TokenSale {tsSeller = 21fe31dfa154a261626bf854046fd2271b7bed4b6abe45aa58877ef47f9721b9, tsToken = (aa,"A"), tsNFT = (65b4199f7d025bfb3b065b0fb88a77d694ffd849ff740b1a4cc453bfaab30f55,"NFT")}
Slot 00007: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 1}:
  Contract instance started
Slot 00007: 00000000-0000-4000-8000-000000000002 {Contract instance for wallet 2}:
  Contract instance started
Slot 00007: 00000000-0000-4000-8000-000000000003 {Contract instance for wallet 3}:
  Contract instance started
```

Sau đó, chúng tôi đặt giá.

``` {.}
Slot 00007: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 1}:
  Receive endpoint call: Object (fromList [("tag",String "set price"),("value",Object (fromList [("unEndpointValue",Number 1000000.0)]))])
Slot 00007: W1: TxSubmit: 2de6dd820e6939b4b1f9e162c0e2cc878cc38ea1231a9be610315da4eda06714
Slot 00007: TxnValidate 2de6dd820e6939b4b1f9e162c0e2cc878cc38ea1231a9be610315da4eda06714
Slot 00007: SlotAdd Slot 8
Slot 00008: SlotAdd Slot 9
Slot 00009: SlotAdd Slot 10
Slot 00010: SlotAdd Slot 11
Slot 00011: SlotAdd Slot 12
```

Sau đó, thêm một số tokens.

``` {.}
Slot 00012: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 1}:
  Receive endpoint call: Object (fromList [("tag",String "add tokens"),("value",Object (fromList [("unEndpointValue",Number 100.0)]))])
Slot 00012: W1: TxSubmit: 42f1bebe285d1ea23bd90683d110866bb438eede8ef62eaf5e9e3d65eec18e90
Slot 00012: TxnValidate 42f1bebe285d1ea23bd90683d110866bb438eede8ef62eaf5e9e3d65eec18e90
Slot 00012: SlotAdd Slot 13
Slot 00013: SlotAdd Slot 14
Slot 00014: SlotAdd Slot 15
Slot 00015: SlotAdd Slot 16
Slot 00016: SlotAdd Slot 17
```

Sau đó, cả hai mua bằng Ví 2 và 3.

``` {.}
Slot 00017: 00000000-0000-4000-8000-000000000002 {Contract instance for wallet 2}:
  Receive endpoint call: Object (fromList [("tag",String "buy tokens"),("value",Object (fromList [("unEndpointValue",Number 20.0)]))])
Slot 00017: W2: TxSubmit: 30d28ca855a14accbb11deee682b174adffb548922e1d4257242880f28328f8e
Slot 00017: TxnValidate 30d28ca855a14accbb11deee682b174adffb548922e1d4257242880f28328f8e
Slot 00017: SlotAdd Slot 18
Slot 00018: SlotAdd Slot 19
Slot 00019: SlotAdd Slot 20
Slot 00020: SlotAdd Slot 21
Slot 00021: SlotAdd Slot 22
Slot 00022: 00000000-0000-4000-8000-000000000003 {Contract instance for wallet 3}:
  Receive endpoint call: Object (fromList [("tag",String "buy tokens"),("value",Object (fromList [("unEndpointValue",Number 5.0)]))])
Slot 00022: W3: TxSubmit: 708b0c4117ad3b38b69254a714e4695c574af404c3fff0eda859b571218b003c
Slot 00022: TxnValidate 708b0c4117ad3b38b69254a714e4695c574af404c3fff0eda859b571218b003c
Slot 00022: SlotAdd Slot 23
Slot 00023: SlotAdd Slot 24
Slot 00024: SlotAdd Slot 25
Slot 00025: SlotAdd Slot 26
Slot 00026: SlotAdd Slot 27
```

Và cuối cùng là rút tiền bằng Ví 1.

``` {.}
Slot 00027: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 1}:
  Receive endpoint call: Object (fromList [("tag",String "withdraw"),("value",Object (fromList [("unEndpointValue",Array [Number 40.0,Number 1.0e7])]))])
Slot 00027: W1: TxSubmit: a42a06cc3e3b1653ec4aba5ab8304484d778adcbddac2ceb9f639f7e4bd1dfd2
Slot 00027: TxnValidate a42a06cc3e3b1653ec4aba5ab8304484d778adcbddac2ceb9f639f7e4bd1dfd2
Slot 00027: SlotAdd Slot 28
Slot 00028: SlotAdd Slot 29
Slot 00029: SlotAdd Slot 30
Slot 00030: SlotAdd Slot 31
Slot 00031: SlotAdd Slot 32
Slot 00032: SlotAdd Slot 33
```

Tất cả các ví ban đầu sở hữu 1000 token và 1000 Ada. Ví 1 đã thêm 100 token vào hợp đồng, nhưng sau đó ở bước cuối cùng đã lấy lại 40 token và 10 Ada, vì vậy chúng tôi thấy số dư cuối cùng của nó là 940 token và 1010 Ada trừ đi phí giao dịch.

``` {.}
Final balances
Wallet 1: 
    {aa, "A"}: 940
    {, ""}: 1009942570
```

Ví 2 đã mua 20 token và trả 20 Ada cho chúng, cộng với một số phí giao dịch.

``` {.}
Wallet 2: 
    {aa, "A"}: 1020
    {, ""}: 979985260
```

Ví 3 đã mua 5 token với giá 5 Ada.

``` {.}
Wallet 3: 
    {aa, "A"}: 1005
    {, ""}: 994985211
```

Cuối cùng, tập lệnh vẫn chứa NFT, sẽ mãi mãi ở đó, cộng với 35 token và 15 Ada. Tại một thời điểm, 75 token và 25 Ada, trước khi Wallet 1 thực hiện rút tiền.

``` {.}
Script fb3eca878d177b6d9264c7c36845fb1e28935553812ed2b56e39c9c4564b85ad: 
    {65b4199f7d025bfb3b065b0fb88a77d694ffd849ff740b1a4cc453bfaab30f55, "NFT"}: 1
    {aa, "A"}: 35
    {, ""}: 15000000
```

Thử nghiệm Unit 
------------

### Tasty

Bạn có thể tìm `tasty` trên Hackage.

![](img/pic__00001.png)

Cũng có một số mã ví dụ trên cùng một trang.

Về cơ bản, bạn có một chương trình chính tham chiếu đến một số `test` kiểu `TestTree`. Như tên cho thấy, điều này cho phép một cây kiểm tra, nơi bạn có thể có các nhóm phụ và nhóm phụ-phụ, v.v.

``` {.haskell}
main = defaultMain tests

tests :: TestTree
tests = testGroup "Tests" [properties, unitTests]
```

Có hỗ trợ đặc biệt cho các bài kiểm tra trong Plutus trong gói `plutus-contract` 

``` {.haskell}
module Plutus.Contract.Test
```

Có nhiều loại kiểm tra khác nhau được hỗ trợ, nhưng ở đây chúng ta sẽ chỉ xem xét hai trong số đó. Một cái hoạt động với dấu vết giả lập và một cái phức tạp hơn nhiều và sử dụng cái gọi là kiểm tra dựa trên thuộc tính.

Mô-đun này cung cấp cho chúng tôi các chức năng để kiểm tra các vị từ, ví dụ

``` {.haskell}
checkPredicate :: String -> TracePredicate -> EmulatorTrace () -> TestTree 
```

Ở đây chúng ta thấy mối liên hệ với Tasty. Nó cần các đối số, tên mô tả của thử nghiệm, sau đó là tên `TracePredicate` mà chúng ta sẽ đến trong giây lát, và `EmulatorTrace` tương tự như tên mà chúng tôi đã sử dụng để kiểm tra các hợp đồng của mình trước đây. Và kết quả `TestTree`, như chúng ta đã thấy, là loại xét nghiệm mà Tasty sử dụng. Vì vậy, bằng cách sử dụng hàm `checkPredicate`  này, chúng tôi có thể tạo ra một cái gì đó mà  Tasty có thể hiểu được.

Ngoài ra còn có một biến thể với một đối số bổ sung là `CheckOptions`

``` {.haskell}
checkPredicateOptions :: CheckOptions -> String -> TracePredicate -> EmulatorTrace () -> TestTree 
```

`CheckOptions` không có hàm tạo. Điều này hơi đáng tiếc, vì chúng tôi buộc phải tương tác với nó thông qua ba thao tác lấy một kiểu
`Lens'`. `Lens'` có liên quan đến một cái gì đó được gọi là `optics` trong Haskell.
Optics một chủ đề rất lớn, với toàn bộ sách đã được viết về nó, vì vậy chúng ta sẽ chỉ đề cập đến nó ngay bây giờ và chỉ cần tìm hiểu cách sử dụng dấu vết giả lập.

Một trong những hoạt động của nó là `emulatorConfig` cho phép chúng tôi chỉ định phân phối tiền ban đầu, theo cách tương tự như cách chúng tôi đã thực hiện trong các ví dụ thử nghiệm trước đó.

``` {.haskell}
emulatorConfig :: Lens' CheckOptions EmulatorConfig
```

Bây giờ chúng ta hãy nhìn vào `TracePredicate`. Điều này chỉ định một số điều kiện mà dấu vết trình mô phỏng phải đáp ứng. Đây là những gì sẽ được kiểm tra khi chúng tôi chạy thử nghiệm.

Trước hết, chúng ta thấy một số tổ hợp hợp lý - một lôgic `not` và một logic `and`.

``` {.haskell}
not :: TracePredicate -> TracePredicate
```

``` {.haskell}
(.&&.) :: TracePredicate -> TracePredicate -> TracePredicate
```

Có rất nhiều chức năng để sản xuất `TracePredicate`. Một vài ví dụ là

``` {.haskell}
endpointAvailable :: forall (l :: Symbol) w s e a. ( HasType l Endpoints.ActiveEndpoint (Output s), KnownSymbol l, ContractConstraints s, Monoid w )
  => Contract w s e a -> ContractInstanceTag -> TracePredicate  
```

``` {.haskell}
queryingUtxoAt :: forall w s e a. ( UtxoAt.HasUtxoAt s, ContractConstraints s, Monoid w )
  => Contract w s e a -> ContractInstanceTag -> Address -> TracePredicate      
```

``` {.haskell}
assertDone :: forall w s e a. ( ContractConstraints s, Monoid w )
  => Contract w s e a -> ContractInstanceTag -> (a -> Bool) -> String -> TracePredicate 
```

Đối với ví dụ của chúng tôi, chúng tôi sẽ chỉ sử dụng một trong các séc có sẵn, `walletFundsChange` mà kiểm tra funds.

``` {.haskell}
-- | Check that the funds in the wallet have changed by the given amount, exluding fees.
walletFundsChange :: Wallet -> Value -> TracePredicate
```

Hàm này `walletFundsChange` tạo một `TracePredicate` để kiểm tra xem các khoản tiền trong một `Wallet` đã thay đổi theo số `Value` đã cho hay chưa  . Điều thú vị là ở đây, phí được bỏ qua. Chúng tôi sẽ gặp khó khăn khi viết các bài kiểm tra chính xác nếu không phải như vậy - chúng tôi sẽ thấy mình cần phải ước tính chi phí phí ​​mà không biết chính xác chúng sẽ như thế nào.

Có một biến thể `walletFundsExactChange`, `does` tính phí vào tài khoản

Nếu chúng tôi quay lại mô-đun thử nghiệm của mình `Spec.Trace` ó một chức năng mà chúng tôi chưa xem xét  `tests`, và nó sử dụng chức năng này `checkPredicateOptions`.

``` {.haskell}
tests :: TestTree
tests = checkPredicateOptions
    (defaultCheckOptions & emulatorConfig .~ emCfg)
    "token sale trace"
    (     walletFundsChange (Wallet 1) (Ada.lovelaceValueOf   10_000_000  <> assetClassValue token (-60))
    .&&. walletFundsChange (Wallet 2) (Ada.lovelaceValueOf (-20_000_000) <> assetClassValue token   20)
    .&&. walletFundsChange (Wallet 3) (Ada.lovelaceValueOf (- 5_000_000) <> assetClassValue token    5)
    )
    myTrace
```

Đối số đầu tiên, như chúng ta đã thấy là thuộc loại  `CheckOptions`. TĐây là nơi chúng ta phải sử dụng quang học, nhưng chúng ta sẽ không đi vào chi tiết ở đây. Bây giờ là đủ để lưu ý rằng chúng tôi sử dụng giống `EmulatorConfig` như chúng tôi đã sử dụng cho `runMyTrace`.

Đối số thứ hai là tên mô tả của dấu vết.

Đối với đối số thứ ba, chúng tôi sử dụng tổ hợp (. &&.) Để xâu chuỗi ba vị từ theo dõi khác nhau với nhau, mỗi vị từ sử dụng hàm `walletFundsChange` mà chúng ta đã thấy ở trên. Ở đây, chúng tôi chỉ định những thay đổi mà chúng tôi mong đợi sẽ thấy trong mỗi ví khi kết thúc theo dõi - ví dụ: chúng tôi mong đợi Ví 1 đã đạt được 10 Ada và mất 60 token.

Bây giờ chúng ta có thể chạy điều này trong REPL.

``` {.}
Prelude Spec.Trace> import Test.Tasty
Prelude Test.Tasty Spec.Trace> defaultMain tests
token sale trace: OK (1.22s)

All 1 tests passed (1.22s)
`` Exception: ExitSuccess
```

Điều này trôi qua. Hãy xem điều gì sẽ xảy ra nếu nó không vượt qua. Chúng tôi có thể thay đổi một trong các giá trị.

``` {.haskell}
( walletFundsChange (Wallet 1) (Ada.lovelaceValueOf   10_000_000  <> assetClassValue token (-50) )
```

``` {.}
Prelude Test.Tasty Spec.Trace> :l Spec.Trace
[1 of 1] Compiling Spec.Trace       ( test/Spec/Trace.hs, /home/chris/git/ada/pioneer-fork/code/week08/dist-newstyle/build/x86_64-linux/ghc-8.10.4.20210212/plutus-pioneer-program-week08-0.1.0.0/t/plutus-pioneer-program-week08-tests/build/plutus-pioneer-program-week08-tests/plutus-pioneer-program-week08-tests-tmp/Spec/Trace.o )
Ok, one module loaded.
Prelude Test.Tasty Spec.Trace> defaultMain tests
token sale trace: FAIL (1.32s)
  Expected funds of W1 to change by
    Value (Map [(,Map [("",10000000)]),(aa,Map [("A",-50)])])
    (excluding 57430 lovelace in fees)
  but they changed by
    Value (Map [(,Map [("",10000000)]),(aa,Map [("A",-60)])])
  Test failed.
  Emulator log:

  [INFO] Slot 0: TxnValidate 2125c8770581c6140c3c71276889f6353830744191de0184b6aa00b185004500
  [INFO] Slot 1: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
                   Contract instance started
  [INFO] Slot 1: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
                   Receive endpoint call: Object (fromList [("tag",String "start"),("value",Object (fromList [("unEndpointValue",Array [Object (fromList [("unCurrencySymbol",String "aa")]),Object (fromList [("unTokenName",String "A")])])]))])
  [INFO] Slot 1: W1: Balancing an unbalanced transaction:
  ...
  ...
  [INFO] Slot 27: W1: TxSubmit: a42a06cc3e3b1653ec4aba5ab8304484d778adcbddac2ceb9f639f7e4bd1dfd2
  [INFO] Slot 27: TxnValidate a42a06cc3e3b1653ec4aba5ab8304484d778adcbddac2ceb9f639f7e4bd1dfd2
    src/Plutus/Contract/Test.hs:245:
    token sale trace

1 out of 1 tests failed (1.32s)
`` Exception: ExitFailure 1
```

Chúng tôi thấy một thông báo lỗi khá hay, tiếp theo là nhật ký trình giả lập, mà chúng tôi không nhận được khi các bài kiểm tra trôi qua.

Đây có lẽ là cách đơn giản nhất để viết các bài kiểm tra tự động cho các hợp đồng Plutus. Bạn chỉ cần viết một hoặc nhiều dấu vết giả lập, sau đó sử dụng `checkPredicate` kết hợp với các vị từ thử nghiệm thích hợp, để kiểm tra xem dấu vết đó có dẫn đến kết quả mong muốn hay không. Điều này cho phép chúng tôi viết nhiều hơn hoặc ít hơn các bài kiểm tra đơn vị truyền thống.

Optics and Lenses
-----------------

Trước khi đến với cách thứ hai để kiểm tra các hợp đồng Plutus, chúng ta sẽ tìm hiểu sơ qua về Optics and Lenses.

Có nhiều thư viện quang học cạnh tranh khác nhau trên Hackage, nhưng thư viện nổi bật nhất và khét tiếng nhất, và thư viện mà nhóm Plutus quyết định sử dụng có tên là `Lens`.

`Lens` là tác giả của Edward Kmett, người có lẽ là người đóng góp nhiều nhất cho các thư viện Haskell.

![](img/pic__00002.png)

Bạn có thể thấy trên trang Hackage có một sơ đồ đáng sợ. Có cả một vườn thú về quang học. Có thấu kính và lăng kính và phương ngang, isos và whatnot. Sơ đồ này cho thấy một số hoạt động mà thư viện cung cấp.

![](img/pic__00003.png)

Optics là tất cả về việc tiếp cận sâu vào các kiểu dữ liệu phân cấp để kiểm tra các phần ẩn sâu trong kiểu dữ liệu và thao tác chúng.

Hãy xem một ví dụ rất đơn giản trong

``` {.haskell}
module Week08.Lens
```

Chúng tôi có một loại  `Company` là một trình bao bọc xung quanh một danh sách `Person`.
Có một trường `_staff`. Khi xử lý lens, quy ước bắt đầu tên trường bằng dấu gạch dưới.

``` {.haskell}
newtype Company = Company {_staff :: [Person]} deriving Show

data Person  = Person
    { _name    :: String
    , _address :: Address
    } deriving Show

newtype Address = Address {_city :: String} deriving Show
```

Và chúng tôi định nghĩa hai loại `Person` và `Company` mà chúng liên kết với nhau.

``` {.haskell}
alejandro, lars :: Person
alejandro = Person
  {  _name    = "Alejandro"
  ,  _address = Address {_city = "Zacateca"}
  }
lars = Person
  {  _name    = "Lars"
  ,  _address = Address {_city = "Regensburg"}
  }

iohk :: Company
iohk = Company { _staff = [alejandro, lars] }
```

Nhiệm vụ là viết một hàm đơn giản `goTo`, nó nhận một `String` như là một đối số, cùng với `Company`. Hàm này tạo ra một `Company` mới 

Nếu chúng ta áp dụng điều đó tới `iohk` với đối số chuỗi là "Athens", Sau đó chúng ta nhận được `Company` với hai `Person` giống nhau, nhưng bây giờ cả hai `Person`có city của "Athens".

Bạn không cần bất kỳ Haskell nâng cao nào để đạt được điều này, nhưng nó hơi lộn xộn, ngay cả trong ví dụ đơn giản này. Hàm bên dưới sử dụng cú pháp bản ghi để sửa đổi các trường bản ghi cụ thể, trong khi giữ nguyên các trường khác.

Hàm trợ giúp `movePerson` cập nhật trường `_address` của `Person` `p`, và trường `_city` của `Address`, và phần chính của hàm ánh xạ `map movePerson` tới từng thành phần của `_staff`.

``` {.haskell}
goTo :: String -> Company -> Company
goTo there c = c {_staff = map movePerson (_staff c)}
  where
    movePerson p = p {_address = (_address p) {_city = there}}
```

Chúng ta có thể xem xét company ban đầu trong REPL. 

``` {.haskell}
Prelude Week08.Lens> iohk
Company {_staff = [Person {_name = "Alejandro", _address = Address {_city = "Zacateca"}},Person {_name = "Lars", _address = Address {_city = "Regensburg"}}]}
```

Bây giờ, hãy áp dụng hàm `goTo` và xem sự thay đổi.

``` {.haskell}
Prelude Week08.Lens> goTo "Athens" iohk
Company {_staff = [Person {_name = "Alejandro", _address = Address {_city = "Athens"}},Person {_name = "Lars", _address = Address {_city = "Athens"}}]}
```

Vì vậy, xử lý các loại bản ghi lồng nhau, mặc dù nó khá đơn giản về mặt khái niệm, có thể khá lộn xộn.

Đây là những gì quang học cố gắng làm cho dễ dàng hơn với ý tưởng cung cấp các bộ truy cập trường hạng nhất. Cuối cùng, nó rất giống với việc xử lý các kiểu dữ liệu như vậy trong một ngôn ngữ mệnh lệnh như C # hoặc Java.

Chúng ta đã thấy trong bài giảng bốn cách các đơn nguyên có thể được xem như một dấu chấm phẩy có thể lập trình được, trong đó dấu chấm phẩy là dấu phân cách câu lệnh trong nhiều ngôn ngữ mệnh lệnh. Theo cách tương tự, quang học có thể được coi là cung cấp một dấu chấm có thể lập trình được, trong đó một dấu chấm là dấu chấm truy cập như trong Python hoặc Java.

Bạn có thể thực hiện các thấu kính bằng tay, nhưng thư viện `lens`cung cấp một số phép thuật của Template Haskell để làm điều đó một cách tự động, miễn là chúng ta tuân theo quy ước gạch dưới được đề cập ở trên.


``` {.haskell}
makeLenses ''Company
makeLenses ''Person
makeLenses ''Address
```

Tên của các thấu kính sẽ là tên của các trường gốc không có gạch dưới.

Có một cách, trong REPL, để kiểm tra mã mà Mẫu Haskell viết tại thời điểm biên dịch.

Đầu tiên, hãy bật cờ sau

``` {.}
Prelude Week08.Lens> :set -ddump-splices
```

Sau đó, tải lại mô-đun. Nếu không có gì xảy ra, bạn sẽ cần thực hiện một thay đổi nhỏ đối với mã, có thể bằng cách thêm một số khoảng trắng, trước khi tải lại.

``` {.}
Prelude Week08.Lens> :r
[4 of 4] Compiling Week08.Lens      ( src/Week08/Lens.hs, /home/chris/git/ada/pioneer-fork/code/week08/dist-newstyle/build/x86_64-linux/ghc-8.10.4.20210212/plutus-pioneer-program-week08-0.1.0.0/build/Week08/Lens.o )
src/Week08/Lens.hs:35:1-20: Splicing declarations
    makeLenses ''Company
  ======>
    staff :: Iso' Company [Person]
    staff = (iso (\ (Company x_abBO) -> x_abBO)) Company
    {-# INLINE staff #-}
src/Week08/Lens.hs:36:1-19: Splicing declarations
    makeLenses ''Person
  ======>
    address :: Lens' Person Address
    address f_abEJ (Person x1_abEK x2_abEL)
      = (fmap (\ y1_abEM -> (Person x1_abEK) y1_abEM)) (f_abEJ x2_abEL)
    {-# INLINE address #-}
    name :: Lens' Person String
    name f_abEN (Person x1_abEO x2_abEP)
      = (fmap (\ y1_abEQ -> (Person y1_abEQ) x2_abEP)) (f_abEN x1_abEO)
    {-# INLINE name #-}
src/Week08/Lens.hs:37:1-20: Splicing declarations
    makeLenses ''Address
  ======>
    city :: Iso' Address String
    city = (iso (\ (Address x_abFw) -> x_abFw)) Address
    {-# INLINE city #-}
```

Điều này bây giờ cho chúng ta thấy Template Haskell làm gì.

Chúng ta thấy rằng hàm `makeLenses` cho `Company`tạo hàm `staff`, trả về `Iso'` - một loại optic - từ `Company` tới `[Person]`.

Vì `makeLenses Person` chúng tôi nhận hàm `address` trả về `Lens'` từ `Person` tới `Address`, và chúng tôi nhận được `name lens ` từ
`Person` tới `String`.

Đối với `makeLenses Address` chúng tôi nhận được hàm `city` trả về
`Iso'` từ `Address` tới `String`.

`Iso` và `Lens` là hai loại khác nhau của optics nhưng thứ tự của các đối số loại luôn giống nhau. Bạn luôn có hai đối số kiểu, ít nhất là đối với các phiên bản mồi này (có nhiều quang học tổng quát hơn có bốn tham số kiểu). Đối số đầu tiên luôn là kiểu dữ liệu lớn và tham số thứ hai là phần bạn đang phóng to. Tên gọi quang học liên quan đến hình ảnh tinh thần của việc phóng to thành một kiểu dữ liệu.

Hãy thử chúng trong REPL.

``` {.}
Prelude Week08.Lens> lars
Person {_name = "Lars", _address = Address {_city = "Regensburg"}}

Prelude Week08.Lens> import Control.Lens

Prelude Control.Lens Week08.Lens> lars ^. name
"Lars"

Prelude Control.Lens Week08.Lens> lars ^. address
Address {_city = "Regensburg"}
```

Một tính năng rất mạnh của ống kính là bạn có thể bố cục chúng.

Nơi chúng ta có, ở trên, một cái gì đó đi `Person` đến `Address` và chúng ta có một cái gì đó khác đi `Address` đến `String`, sau đó chúng ta có thể kết hợp chúng bằng cách sử dụng dấu chấm thành phần hàm. Có một số máy móc cấp loại tiên tiến đang hoạt động đằng sau hậu trường để làm cho công việc đó, nhưng nó hoạt động.

``` {.}
Prelude Control.Lens Week08.Lens> lars ^. address . city
"Regensburg"
```

Bạn không chỉ có thể xem nội dung của các loại bản ghi như thế này mà còn có thể thao tác với chúng.

``` {.}
Prelude Control.Lens Week08.Lens> lars & name .~ "LARS"
Person {_name = "LARS", _address = Address {_city = "Regensburg"}}
```

Biểu tượng `&` ở đây là ứng dụng hàm, nhưng ngược lại - đối số đến trước rồi đến hàm.

Một lần nữa, chúng ta có thể sáng tác.

``` {.haskell}
Prelude Control.Lens Week08.Lens> lars & address . city .~ "Munich"
Person {_name = "Lars", _address = Address {_city = "Munich"}}
```

There is another type of optics called `Traversables`, that zooms not
only into one field, but into many simultaneously. If you had a list it
would zoom into each element. So, for example, we could use a list of
integers, with the `each` traversable that works with many container
types, including lists, and set every element to 42.

Có một loại optics khác được gọi là `Traversables`, phóng to không chỉ vào một trường, mà còn vào nhiều trường đồng thời. Nếu bạn có một danh sách, nó sẽ phóng to từng phần tử. Vì vậy, chẳng hạn, chúng ta có thể sử dụng danh sách các số nguyên, có thể duyệt `each`  hoạt động với nhiều loại vùng chứa, bao gồm danh sách và đặt mọi phần tử thành 42.

``` {.haskell}
Prelude Control.Lens Week08.Lens> [1 :: Int, 3, 4] & each .~ 42
[42,42,42]
```

Bạn có thể thấy một `type-defaults` cảnh báo khi chạy phần trên, nhưng nó đã bị xóa ở đây.

Một điều thú vị là có thể kết hợp nhiều loại thấu kính khác nhau, một lần nữa với toán tử chấm. Ví dụ

``` {.haskell}
Prelude Control.Lens Week08.Lens> iohk & staff . each . address . city .~ "Athens"
Company {_staff = [Person {_name = "Alejandro", _address = Address {_city = "Athens"}},Person {_name = "Lars", _address = Address {_city = "Athens"}}]}
```

Và đây chính xác là những gì hàm `goTo`  của chúng tôi đạt được, vì vậy chúng tôi có thể viết `goTo'` là


``` {.haskell}
goTo' :: String -> Company -> Company
goTo' there c = c & staff . each . address . city .~ there
```

Và đây thực sự là những gì chúng tôi đã làm khi định cấu hình thử nghiệm của mình.

``` {.haskell}
tests :: TestTree
tests = checkPredicateOptions
    (defaultCheckOptions & emulatorConfig .~ emCfg)
```

Hàm `defaultCheckOptions` là kiểu `CheckOptions` và có một lens từ `CheckOptions` tới `EmulatorConfig`, và đây là phần mà chúng tôi muốn thay đổi.

Và điều đó kết thúc chuyến du ngoạn ngắn ngủi của chúng tôi về optics and lenses.

Kiểm thử dựa trên thuộc tính
----------------------

(Property Based Testing) Kiểm thử dựa trên thuộc tính là một cách tiếp cận mang tính cách mạng để kiểm tra mạnh mẽ hơn nhiều so với kiểm thử đơn vị đơn giản. Nó có nguồn gốc từ Haskell, với tính thuần túy và cấu trúc dữ liệu bất biến đặc biệt phù hợp với cách tiếp cận này. Bây giờ nó đã được sao chép bởi hầu hết các ngôn ngữ lập trình khác..

### Kiểm tra nhanh (QuickCheck)

Một trong những nhà phát minh `QuickCheck`, nổi bật nhất và là thư viện đầu tiên sử dụng phương pháp này, là John Hughes, cũng là một trong những nhà phát minh ban đầu của Haskell. Anh ấy và công ty của anh ấy làm việc với IOHK để cung cấp hỗ trợ đặc biệt về cách tiếp cận này để kiểm tra các hợp đồng Plutus.

Trước khi xem xét việc sử dụng QuickCheck cho các hợp đồng Plutus, trước tiên chúng ta hãy xem việc sử dụng nó cho các chương trình Haskell.

Thử nghiệm dựa trên thuộc tính phụ thuộc vào các thử nghiệm unit. Hãy viết một bài kiểm tra Unit rất đơn giản và rễ hiểu.


``` {.haskell}
prop_simple :: Bool
prop_simple = 2 + 2 == (4 :: Int)
```

Hàm  này có sẵn trong mô-đun.

``` {.haskell}
module Week08.QuickCheck
```
Sau khi tải mô-đun này và môdun `Test.QuickCheck`, chúng tôi có thể kiểm tra thử nghiệm đơn vị của chúng tôi trong REPL.

``` {.haskell}
Prelude Control.Lens Test.QuickCheck Week08.QuickCheck> quickCheck prop_simple
+++ OK, passed 1 test.
```

Điều này không phải là rất thú vị. Đối với một ví dụ thú vị hơn, cùng một mô-đun chứa triển khai lỗi của một loại chèn.

``` {.haskell}
sort :: [Int] -> [Int] -- not correct
sort []     =  []
sort (x:xs) =  insert x xs

insert :: Int -> [Int] -> [Int] -- not correct
insert x []                     =  [x]
insert x (y:ys)  | x <= y       =  x : ys
                 | otherwise    =  y : insert x ys
```

Để kiểm tra nó, một thuộc tính có thể kiểm tra là sau khi áp dụng sắp xếp cho danh sách các số nguyên, danh sách kết quả sẽ được sắp xếp.

``` {.haskell}
isSorted :: [Int] -> Bool
isSorted []           = True
isSorted [_]          = True
isSorted (x : y : ys) = x <= y && isSorted (y : ys)  
```

Sử dụng điều này, bây giờ chúng ta có thể cung cấp một thuộc tính QuickCheck không chỉ đơn giản là kiểu `Bool`, mà thay vào đó là một hàm từ danh sách các `Int`đến `Bool`.

``` {.haskell}
prop_sort_sorts :: [Int] -> Bool
prop_sort_sorts xs = isSorted $ sort xs  
```

Bạn có thể đọc nó giống như một đặc tả, có nội dung "đối với tất cả danh sách các số nguyên `xs`, nếu bạn áp dụng `sort` cho nó, thì kết quả sẽ được sắp xếp.

QuickCheck có thể xử lý các thuộc tính như vậy.

Trong REPL

``` {.haskell}
Prelude Control.Lens Test.QuickCheck Week08.QuickCheck> quickCheck prop_sort_sorts 
`` Failed! Falsified (after 8 tests and 4 shrinks):    
[0,0,-1]
```

Nó không thành công và cung cấp cho chúng tôi một ví dụ nơi thuộc tính không giữ. Chúng ta có thể kiểm tra ví dụ đó.

``` {.haskell}
Prelude Control.Lens Test.QuickCheck Week08.QuickCheck> sort [0, 0, -1]
[0,-1]
```

Và có thể thấy rằng, quả thực là không đúng.

QuickCheck thực hiện điều này như thế nào? Nếu bạn cung cấp một hàm có một hoặc nhiều đối số, nó sẽ tạo ra các đối số ngẫu nhiên cho hàm. Trong ví dụ của chúng tôi, QuickCheck đã tạo 100 danh sách ngẫu nhiên gồm các số nguyên và đối với mỗi danh sách đó, đã kiểm tra xem thuộc tính có giữ hay không, cho đến khi nó gặp lỗi.

Lưu ý rằng lỗi đã được báo cáo là

``` {.}
`` Failed! Falsified (after 8 tests and 4 shrinks):    
```

Điều này có nghĩa là sau 8 lần kiểm tra thuộc tính đã bị làm giả, nhưng tại thời điểm này, thay vì chỉ báo cáo lỗi, nó đã cố gắng thu nhỏ nó lại - để đơn giản hóa nó.

Đây là một tính năng mạnh mẽ của QuickCheck, vì các ví dụ về bộ đếm ngẫu nhiên mà QuickCheck tìm thấy rất phức tạp - danh sách dài với các số dài. Nhưng khi một ví dụ về bộ đếm đã được tìm thấy, QuickCheck sẽ cố gắng đơn giản hóa nó, có thể bằng cách loại bỏ một số phần tử khỏi danh sách hoặc bằng cách làm cho một số con số nhỏ hơn, cho đến khi nó không tìm ra cách để lấy một ví dụ thậm chí còn đơn giản hơn.

Chính sự kết hợp giữa tạo và thu nhỏ thử nghiệm ngẫu nhiên này đã làm cho QuickCheck trở nên vô cùng hữu ích.

Chúng ta có thể xem QuickCheck tạo ra loại danh sách ngẫu nhiên nào.

``` {.haskell}
Prelude Control.Lens Test.QuickCheck Week08.QuickCheck> sample (arbitrary :: Gen [Int])
[]
[0]
[2,4,-1,3]
[3,-1,4,3,-5]
[3,-1,-8,-4,-6]
[4,5,-1,4,-7,2,8,4,-5]
[-8,-8,-11,-12,2,-4,-12,2,4]
[7,9,3,-5,5,-9,3,1,11]
[12,-7,-9,9,-11,-15,5,-10,-7,4,8,8,-12,-6,16]
[-11,11,-1,-6]
[14,2,-5,9,13,-8,-8,-17,-1,-11,-19,15,9,8,-19,-4,16,4,4,19]
```

Cách QuickCheck thực hiện việc tạo ngẫu nhiên này là bằng cách sử dụng một lớp kiểu được gọi là `Arbitrary`

``` {.}
Prelude Control.Lens Test.QuickCheck Week08.QuickCheck> :i Arbitrary
type Arbitrary :: ` -> Constraint
class Arbitrary a where
  arbitrary :: Gen a
  shrink :: a -> [a]
```

Có nhiều dòng khác cho kết quả ở trên, nhưng những dòng quan trọng được hiển thị. Chúng ta có thể thấy rằng nó có hai phương pháp. Một được gọi `arbitrary` và một được gọi `shrink`.

`Gen` là một đơn nguyên khác. Đơn nguyên cung cấp các phương pháp khác nhau cho phép tạo số ngẫu nhiên cho các giá trị của kiểu `a`.

Phương pháp thứ hai là `shrink`,khi được cung cấp một  `a`. sẽ cung cấp một danh sách các phiên bản đơn giản hơn của `a`. Điều này, tất nhiên, phụ thuộc vào loại `a`

Nếu chúng ta nhìn vào kết quả ở trên cung cấp một số danh sách số nguyên ngẫu nhiên, chúng ta sẽ thấy điều gì đó thú vị. Chúng ta càng đi sâu xuống danh sách, danh sách càng trở nên phức tạp. Đầu tiên chỉ là danh sách trống, sau đó chúng ta nhận được danh sách đơn phần tử, sau đó là một số danh sách dài hơn và nó có xu hướng phức tạp hơn theo thời gian.

Ngoài việc chỉ cung cấp thế hệ ngẫu nhiên trong `Gen` monad,còn có một khái niệm về độ phức tạp. Nếu bạn triển khai một phiên bản của 
`Gen` bạn, bạn được mong đợi không chỉ tạo ra một ngẫu nhiên `a` mà còn là một ngẫu nhiên acủa một số phức tạp nhất định.

Khi `QuickCheck` kiểm tra một thuộc tính, nó bắt đầu với các đối số ngẫu nhiên, đơn giản, sau đó làm cho chúng phức tạp hơn theo thời gian. Theo mặc định, nó kiểm tra 100 đối số ngẫu nhiên, nhưng điều này có thể được định cấu hình.

Bây giờ chúng tôi biết rằng mã của chúng tôi bị lỗi, hãy cố gắng sửa nó.

``` {.haskell}
sort :: [Int] -> [Int] -- not correct
sort []     =  []
sort (x:xs) =  insert x xs
```

Vấn đề là tất cả những gì chúng ta làm đối với một danh sách không trống là chèn phần tử đầu tiên vào đuôi, nhưng chúng ta không sắp xếp đệ quy phần đuôi.

Nỗ lực đầu tiên của chúng tôi để sửa ...

``` {.haskell}
sort :: [Int] -> [Int]
sort []     =  []
sort (x:xs) =  insert x $ sort xs
```

Bây giờ, khi chúng tôi kiểm tra điều này ...

``` {.haskell}
Prelude Control.Lens Test.QuickCheck> :r
[1 of 1] Compiling Week08.QuickCheck ( src/Week08/QuickCheck.hs, /home/chris/git/ada/pioneer-fork/code/week08/dist-newstyle/build/x86_64-linux/ghc-8.10.4.20210212/plutus-pioneer-program-week08-0.1.0.0/build/Week08/QuickCheck.o )
Ok, one module loaded.
Prelude Control.Lens Test.QuickCheck Week08.QuickCheck> quickCheck prop_sort_sorts 
+++ OK, passed 100 tests.
```

Nó đi. Tuy nhiên, nếu chúng tôi kiểm tra cụ thể cho trường hợp không thành công trước đó ...

``` {.haskell}
Prelude Control.Lens Test.QuickCheck Week08.QuickCheck> sort [0, 0, -1]
[-1,0]
```

Nó rõ ràng là không chính xác. Mặc dù danh sách đã được sắp xếp, độ dài của danh sách đã thay đổi. Điều này dẫn đến một điểm quan trọng. QuickCheck không thể làm nên điều kỳ diệu - kết quả của nó chỉ tốt như các thuộc tính mà chúng tôi cung cấp. Những gì chúng ta thấy ở đây là thuộc tính của chúng ta `prop_sort_sorts` không đủ mạnh để kiểm tra xem chức năng có đúng hay không.

Chúng ta có thể thêm thuộc tính thứ hai để kiểm tra độ dài.

``` {.haskell}
prop_sort_preserves_length :: [Int] -> Bool
prop_sort_preserves_length xs = length (sort xs) == length xs
```

Và chúng tôi thấy rằng thuộc tính này không được thỏa mãn bởi mã của chúng tôi.

``` {.haskell}
Prelude Control.Lens Test.QuickCheck Week08.QuickCheck> quickCheck prop_sort_preserves_length
`` Failed! Falsified (after 4 tests and 3 shrinks):    
[0,0]
```

Lỗi trong mã của chúng tôi là trong `insert`.

``` {.haskell}
insert :: Int -> [Int] -> [Int] -- not correct
insert x []                     =  [x]
insert x (y:ys)  | x <= y       =  x : ys
                 | otherwise    =  y : insert x ys
```

Ở đây chúng ta nói rằng, nếu `x` nhỏ hơn hoặc bằng `y`, tthì chúng ta nối  `x` vào `ys`, nhưng chúng ta đã quên mất `y`. Nó sẽ đọc:

``` {.haskell}
insert x (y:ys)  | x <= y       =  x : y : ys
```

Điều này sẽ sửa chữa nó.

``` {.haskell}
Prelude Control.Lens Test.QuickCheck Week08.QuickCheck> :r
Prelude Control.Lens Test.QuickCheck Week08.QuickCheck> quickCheck prop_sort_preserves_length
+++ OK, passed 100 tests.
```

Tất nhiên, đây vẫn chưa phải là bằng chứng cho thấy hàm của chúng ta là đúng, vì hai thuộc tính này vẫn chưa đủ để chỉ định một hàm sắp xếp một cách đầy đủ. Ví dụ, hàm sắp xếp có thể trả về một danh sách có cùng độ dài chỉ chứa các số 0. Điều này sẽ vượt qua tất cả các bài kiểm tra. Đó là một nghệ thuật để tìm các tài sản đảm bảo rằng, nếu tất cả chúng đều hài lòng, không có lỗi.

Mặc dù vậy, cách tiếp cận kiểm thử này thường hiệu quả hơn kiểm thử đơn vị vì nó có thể kiểm tra một số lượng lớn các trường hợp ngẫu nhiên và có thể tìm ra các ví dụ về sự thất bại mà một lập trình viên viết đơn vị kiểm thử có thể không nghĩ đến.

#### Sử dụng QuickCheck với Plutus

Bây giờ chúng ta đã thấy QuickCheck có thể làm gì, chúng ta sẽ chuyển sự chú ý của mình sang việc sử dụng nó để kiểm tra các hợp đồng Plutus.

Ở đây chúng tôi gặp phải một vấn đề - làm cách nào để bạn sử dụng QuickCheck để kiểm tra mã có tác dụng phụ? Vấn đề này không chỉ phát sinh với blockchain, nó phát sinh với tất cả các hệ thống sử dụng IO.

John Hughes luôn sử dụng ví dụ về hệ thống tệp. Bạn sẽ kiểm tra các hoạt động của hệ thống tệp như thế nào, tức là đọc, ghi, mở và đóng tệp bằng QuickCheck.

Cách tiếp cận để sử dụng rất giống với cách bạn có thể sử dụng với Plutus. Ý tưởng là bạn bắt đầu với một mô hình.

![](img/pic__00004.png)

Mô hình về cơ bản là một mô hình lý tưởng hóa về cách thức hoạt động của hệ thống thế giới thực. Phải có một số loại mối quan hệ giữa mô hình và hệ thống thực.

Nếu hệ thống thực là một hệ thống tệp, thì trong mô hình, bạn có thể có một phiên bản lý tưởng về cách bạn cho rằng các tệp sẽ hoạt động. Và sau đó, những gì QuickCheck làm, trong thế hệ ngẫu nhiên của nó, là tạo ra một chuỗi hành động ngẫu nhiên mà bạn có thể thực hiện trên hệ thống. Trong ví dụ về hệ thống tệp, nó sẽ tạo ngẫu nhiên một chuỗi các thao tác mở tệp, đóng tệp, ghi vào tệp, đọc tệp, v.v. Bây giờ về cơ bản bạn có thể thực hiện song song mô hình này và hệ thống.

Bạn có một số loại hành động mà bạn thực hiện trong thế giới thực và bạn áp dụng cùng một loại hành động cho mô hình của mình. Sau đó, hệ thống thực của bạn đã chuyển sang trạng thái mới và mô hình của bạn cũng đã được cập nhật. Sau bước này, bạn có thể so sánh cả hai và kiểm tra xem chúng có còn đồng bộ hay không. Sau đó, bạn có thể tiếp tục điều này trong một số bước.

![](img/pic__00009.png)

Trong khi ví dụ QuickCheck đầu tiên của chúng tôi tạo ra một danh sách ngẫu nhiên gồm các `Int`, ý tưởng để kiểm tra một hệ thống trong thế giới thực là tạo danh sách ngẫu nhiên các hành động và sau đó áp dụng các hành động đó cho cả một mô hình và hệ thống thực và để kiểm tra xem mô hình và hệ thống thực luôn đồng bộ.

Thu gọn trong ví dụ này sẽ là, nếu bạn có một danh sách các hành động cho thấy rằng có lỗi, thì bạn có thể bỏ một số hành động và xem liệu sự cố có còn phát sinh hay không. Điều này có thể được lặp lại cho đến khi bạn không thể bỏ bất kỳ hành động nào khác khỏi danh sách và vẫn tạo ra lỗi.

Đây chính xác là cách hỗ trợ QuickCheck dành cho Plutus hoạt động. Để kiểm tra một hợp đồng Plutus, chúng ta phải đưa ra một mô hình và xác định kỳ vọng của chúng ta về cách các điểm cuối khác nhau, chẳng hạn, sẽ thay đổi mô hình như thế nào. Sau đó, chúng tôi cần cung cấp liên kết giữa mô hình và hệ thống thực (trình giả lập), rồi áp dụng máy móc QuickCheck.

Mã để làm điều này là trong module:

``` {.haskell}
module Spec.Model 
```

Chúng tôi nhận thấy rằng chúng tôi nhập hai mô-đun thử nghiệm Plutus, với sự hỗ trợ QuickCheck được cung cấp bởi, mô-đun `ContractModel` có tất cả các thiết bị để xác định một mô hình và để liên kết mô hình đó với một hợp đồng

``` {.haskell}
import           Plutus.Contract.Test
import           Plutus.Contract.Test.ContractModel
```

Và chúng tôi nhập thêm ba mô-đun thử nghiệm. Một cho Tasty, một cho QuickCheck và một cho phép sử dụng thuộc tính QuickCheck trong bộ thử nghiệm Tasty.

``` {.haskell}
import           Test.QuickCheck
import           Test.Tasty
import           Test.Tasty.QuickCheck  
```

Để xác định một mô hình, trước tiên chúng ta xác định một kiểu dữ liệu đại diện cho trạng thái của một cá thể `TokenSale`.

``` {.haskell}
data TSState = TSState
  { _tssPrice    :: !Integer
  , _tssLovelace :: !Integer
  , _tssToken    :: !Integer
  } deriving Show
```

Nó có ba trường - giá hiện tại, nguồn cung cấp lovelace hiện tại trong hợp đồng và nguồn cung cấp token hiện tại trong hợp đồng.

Sau đó mô hình của chúng tôi `TSModel` là một map từ ví đến trạng thái `TokenSale`.

``` {.haskell}
newtype TSModel = TSModel {_tsModel :: Map Wallet TSState}
deriving Show
```

Ý tưởng trong thử nghiệm này là chúng ta có hai ví và mỗi ví chạy một hợp đồng `TokenSale`,và hai ví sẽ giao dịch các token khác nhau.

Chúng tôi tạo ra các ống kính cho mô hình. Chúng tôi cần quang học để tương tác với `ContactModel`.

``` {.haskell}
makeLenses ''TSModel
```

Tất cả logic xác định cách mô hình của chúng ta sẽ hoạt động và cách nó được liên kết với hợp đồng thực

``` {.haskell}
instance ContractModel TSModel where
```

Đầu tiên, chúng tôi có một kiểu dữ liệu được liên kết. Đây là một tính năng Haskell khá tiên tiến. Trong các lớp Typer, cũng như các phương thức, bạn có thể có các kiểu dữ liệu. Chúng tôi đã thấy điều này trước đây trong trình xác thực nơi chúng tôi xác định một loại giả cung cấp liên kết giữa loại datum và loại redeemer.

Ở đây, chúng tôi liên kết một kiểu `Action`, đại diện cho các hành động mà QuickCheck sẽ tạo ra. Về cơ bản, chúng ta chỉ có một hàm tạo kiểu `Action` cho mỗi điểm cuối mà chúng ta đã thấy trước đó. Chúng tôi có các đối số bổ sung vì bây giờ có các ví bổ sung đang hoạt động và chúng tôi phải theo dõi ví nào thực hiện một hành động.


``` {.haskell}
data Action TSModel =
    Start Wallet
  | SetPrice Wallet Wallet Integer
  | AddTokens Wallet Wallet Integer
  | Withdraw Wallet Wallet Integer Integer
  | BuyTokens Wallet Wallet Integer
deriving (Show, Eq)
```

`Start Wallet` có nghĩa là ví này bắt đầu hợp đồng bán token.

`SetPrice Wallet Wallet Integer`có nghĩa là ví thứ hai đặt giá cho hợp đồng bán token do ví đầu tiên vận hành. Theo logic hợp đồng, chúng tôi biết rằng điều này sẽ chỉ hoạt động nếu cả hai ví đều giống nhau, bởi vì chỉ chủ sở hữu của hợp đồng mới có thể đặt giá.

`AddTokens` là rất giống với `SetPrice`.

Với `Withdraw` ví thứ hai cố gắng rút một số lượng nhất định và một số token nhất định (tương ứng) từ việc bán token do ví đầu tiên điều hành. Một lần nữa, điều này sẽ không thành công nếu hai ví không giống nhau.

Trong `BuyTokens`, ví thứ hai sẽ cố gắng mua một số lượng token nhất định từ việc bán token do ví đầu tiên điều hành.


Vì vậy kiểu `Action` là thành phần đầu tiên.

Thành phần thứ hai là một kiểu dữ liệu liên quan khác. Đối với mỗi phiên bản hợp đồng mà chúng tôi đang chạy, chúng tôi muốn có một khóa xác định phiên bản đó.

``` {.haskell}
data ContractInstanceKey TSModel w s e where
  StartKey :: Wallet           -> ContractInstanceKey TSModel (Last TokenSale) TSStartSchema' Text
  UseKey   :: Wallet -> Wallet -> ContractInstanceKey TSModel ()               TSUseSchema    Text
```

Đây là một kiểu dữ liệu đại số tổng quát (GADT), vì vậy nó hơi khác so với khai báo dữ liệu thông thường trong Haskell. Thay vì chỉ cung cấp các hàm tạo, bạn cung cấp cho các hàm tạo một chữ ký kiểu.

Trong `ContractInstanceKey`,  chúng ta có một hàm tạo `StartKey` nhận `Wallet` Như là một đối số và sau đó tạo ra một cái gì đó của kiểu

``` {.haskell}
ContractInstanceKey TSModel (Last TokenSale) TSStartSchema' Text
```

Điểm của GADT là với các kiểu dữ liệu thông thường, các tham số kiểu giống nhau đối với tất cả các hàm tạo, ví dụ: `Action TSModel` có năm hàm tạo, nhưng kiểu luôn là như vậy `TSModel`. Nhưng với GADT, chúng tôi có thể cung cấp một tham số kiểu tổng quát hơn - trong trường hợp này `TSModel w s e`.

Chúng tôi cần tính năng này trong trường hợp này vì hợp đồng của chúng tôi có thể có các tham số kiểu khác nhau.

Có hai loại trường hợp. Nhớ lại chúng ta có hợp đồng `start`  và hợp đồng `use`, có các loại chữ ký khác nhau.

`StartKey` trả về một kiểu bao gồm mô hình của chúng ta và sau đó là các tham số đến từ chính hợp đồng - kiểu trạng thái, lược đồ và kiểu lỗi. Chúng tôi đã sử dụng phiên bản mồi của
`TSStartSchema` - `TSStartSchema'` bởi vì chúng tôi không muốn tạo NFT, chúng tôi muốn tự mình vượt qua nó vì nó giúp viết bài kiểm tra dễ dàng hơn nếu chúng tôi biết trước NFT chúng tôi sẽ sử dụng.

Chúng tôi cũng cung cấp một khóa cho hợp đồng sử dụng có hai `Wallet`làm tham số. Đầu tiên là người sở hữu việc bán token mà chúng tôi đang tương tác và thứ hai là người thực sự chạy hợp đồng. Đối với các tham số kiểu, không có tham số trạng thái và nó sử dụng một lược đồ khác - `TSUseSchema`, nhưng kiểu lỗi thì giống nhau.

Tiếp theo, chúng ta cần cung cấp phương thức `instanceTag`, với một khóa phiên bản và một ví, sẽ cung cấp một thẻ phiên bản hợp đồng. Như chúng ta đã biết ví chạy phiên bản, bởi vì đó là một trong những đối số của phương thức khởi tạo khóa cá thể, chúng ta có thể bỏ qua nó như một đối số.

``` {.haskell}
instanceTag key _ = fromString $ "instance tag for: " ++ show key
```

Hàm `instanceTag` không có một phương thức khởi tạo có thể truy cập, nhưng nó thực thi lớp `IsString`. Chúng tôi chưa nhìn thấy lớp `IsString` một cách rõ ràng nhưng chúng tôi đã sử dụng nó khi chúng tôi sử dụng `OverloadedStrings` là phần mở rộng GHC - nó cho phép một lớp kiểu triển khai nó được biểu diễn bằng một ký tự chuỗi. Đặc biệt, nó có một phương thức `fromString`, cho trước một chuỗi, sẽ tạo ra một thể hiện của kiểu.

 "instance tag for:" ltheo nghĩa đen trong hàm trên là không cần thiết - tất cả những gì cần thiết là để toàn bộ chuỗi là duy nhất cho mỗi phiên bản mà chúng tôi sẽ chạy trong các thử nghiệm của mình.

Có một triển khai mặc định cho phương thức `instanceTag` của lớp `ContractModel`,  vì vậy bạn thường không phải tự triển khai nó. Tuy nhiên, nó chỉ hoạt động nếu bạn có nhiều nhất một phiên bản hợp đồng cho mỗi ví. Đây không phải là trường hợp của chúng tôi, vì chúng tôi sẽ có ba trường hợp cho mỗi ví - một trường hợp `start`  và hai trường hợp `use` (một trường hợp cho việc bán token của ví riêng và một trường hợp cho việc bán token của ví khác).

Phương pháp tiếp theo mà chúng ta cần thực hiện `arbitraryAction` là cách chúng ta cho hệ thống biết cách tạo một hành động ngẫu nhiên.

``` {.haskell}
arbitraryAction _ = oneof $
   (Start <$> genWallet) :
  [ SetPrice  <$> genWallet <`> genWallet <`> genNonNeg ]               ++
  [ AddTokens <$> genWallet <`> genWallet <`> genNonNeg ]               ++
  [ BuyTokens <$> genWallet <`> genWallet <`> genNonNeg ]               ++
  [ Withdraw  <$> genWallet <`> genWallet <`> genNonNeg <`> genNonNeg ]  
```

Như một đối số, nó nhận được trạng thái mô hình. Chúng ta sẽ đến điều này sau, nhưng chúng ta không cần nó ở đây và vì vậy hãy bỏ qua nó trong khai báo phương thức.

Hàm `oneof` là một trong những tổ hợp được cung cấp bởi QuickCheck. Đưa ra một danh sách các hành động tùy ý, nó sẽ chọn ngẫu nhiên một trong những hành động đó.

Ở đây chúng tôi đang sử dụng một thứ khác mà chúng tôi chưa từng thấy trước đây - phong cách ứng dụng. Nhớ lại rằng khi chúng ta xem xét các monads, chúng ta đã thấy đó `Monad` là `Applicative` một lớp cha. `Applicative` thường hữu ích để viết mã đơn nguyên nhỏ gọn hơn.

Đầu tiên chúng ta hãy nhìn vào chức năng `genWallet` .

``` {.haskell}
genWallet :: Gen Wallet
genWallet = elements wallets
```

Trong đơn nguyên thế hệ ngẫu nhiên `Gen`, nó tạo ra một ví ngẫu nhiên. Nó sử dụng một bộ tổ hợp khác được cung cấp bởi QuickCheck, `elements` chỉ đơn giản là lấy một danh sách kiểu mà chúng tôi muốn tạo và chọn ngẫu nhiên một trong những phần tử đó.

Điều này đang sử dụng một chức năng trợ giúp khác `wallets`.

``` {.haskell}
wallets :: [Wallet]
wallets = [w1, w2]
```

Đến lượt nó, sử dụng

``` {.haskell}
w1, w2 :: Wallet
w1 = Wallet 1
w2 = Wallet 2
```

Vì vậy `genWallet` sẽ chọn ngẫu nhiên Ví 1 hoặc Ví 2.

Lấy lại mã `arbitraryAction`.

``` {.haskell}
Start <$> genWallet
```

Điều này có nghĩa là trước tiên chúng tôi sử dụng `genWallet` để tạo một ví ngẫu nhiên và sau đó trả lại `Action Start w`, ở đó `w` là ví chúng tôi vừa chọn ở đâu.

và trả về một hành động. Nếu chúng tôi có `fmap` (<$>), chúng tôi nhận được `GenWallet -> GenAction`,Đó là những gì chúng ta muốn.

Đối với bốn hành động khác, chúng tôi sử dụng một hàm trợ giúp bổ sung `genNonNeg` để tạo ra một số không âm.

``` {.haskell}
genNonNeg :: Gen Integer
genNonNeg = getNonNegative <$> arbitrary
```


Bây giờ, khi chúng ta muốn tạo một hành động ngẫu nhiên cho `SetPrice`, đây là lúc mà phong cách ứng dụng thực sự tỏa sáng.

``` {.haskell}
SetPrice <$> genWallet <`> genWallet <`> genNonNeg
```

Nếu chúng tôi muốn viết điều này trong một khối `do`, chúng tôi sẽ làm điều gì đó như

``` {.haskell}
w1 <- genWallet
w2 <- genWallet
p  <- genNonNeg
return (SetPrice w1 w2 p)
```

Bạn có thể sử dụng kiểu ứng dụng nếu các hành động trong đơn nguyên mà bạn đang gọi không phụ thuộc vào kết quả của các hành động trước đó. Trong một khối `do` , bạn có thể kiểm tra kết quả `w1` và đưa ra một số lựa chọn dựa trên nó. Điều này là không thể xảy ra `Applicative`, nhưng thường thì mã đơn nguyên không sử dụng được sức mạnh này, và trong những tình huống này, chúng ta có cách viết đơn giản hơn này.

Chúng ta có thể thử hàm `arbitraryAction` trong REPL.

``` {.haskell}
Prelude Test.QuickCheck Plutus.Contract.Test.ContractModel Spec.Model> sample (arbitraryAction undefined :: Gen (Action TSModel))
Start (Wallet 1)
AddTokens (Wallet 1) (Wallet 1) 1
AddTokens (Wallet 1) (Wallet 1) 3
SetPrice (Wallet 1) (Wallet 2) 3
SetPrice (Wallet 1) (Wallet 1) 2
AddTokens (Wallet 1) (Wallet 1) 1
SetPrice (Wallet 2) (Wallet 1) 12
Withdraw (Wallet 2) (Wallet 1) 14 3
AddTokens (Wallet 2) (Wallet 1) 9
AddTokens (Wallet 2) (Wallet 1) 18
SetPrice (Wallet 2) (Wallet 1) 17
```

Chúng tôi thấy rằng tạo ra một mẫu các hành động ngẫu nhiên với các đối số ngẫu nhiên.

Phương pháp tiếp theo để triển khai `initialState`, như tên cho thấy, là trạng thái ban đầu của mô hình của chúng ta.

``` {.haskell}
initialState = TSModel Map.empty
```

Bây giờ đến chức năng phức tạp nhất mà chúng ta phải thực hiện để thiết lập điều này. Bạn sẽ nhớ lại từ khi chúng ta nhìn vào biểu đồ rằng chúng ta phải biết hiệu quả hoạt động và hành động sẽ có trên mô hình. Đây chính xác là những gì hàm `nextState` làm.

Nếu chúng ta nhìn vào kiểu của `nextState`, chúng ta thấy rằng nó thực hiện một hành động và trả về một cái gì đó trong một đơn nguyên khác, lần này là `Spec` đơn nguyên. Đơn nguyên `Spec`  cho phép chúng tôi kiểm tra trạng thái hiện tại của mô hình và cũng có thể chuyển tiền trong mô hình của chúng tôi.

``` {.haskell}
nextState :: ContractModel state => Action state -> Spec state ()
```

Hãy xem một ví dụ cho `Start`. Điều này sẽ cho chúng tôi biết ảnh hưởng đến mô hình của chúng tôi nếu ví `w` bắt đầu bán token.

``` {.haskell}
nextState (Start w) = do
  withdraw w $ nfts Map.! w
    (tsModel . at w) $= Just (TSState 0 0 0)
  wait 1
```

Ở đây chúng ta thấy một hàm từ đơn nguyên `Spec` được gọi `withdraw`. Việc sử dụng `withdraw` có nghĩa là một số tiền sẽ chuyển từ ví sang hợp đồng - không quan trọng là hợp đồng nào. Vì vậy, điều này nói rằng ảnh hưởng của `Start` sẽ là Ví `w` mất NFT.

NFT lại là một thứ được định nghĩa trong một hàm trợ giúp. Hãy nhanh chóng xem xét các chức năng trợ giúp xác định NFT và các token có thể giao dịch.

Mỗi ví sẽ giao dịch token của riêng mình và mỗi ví sẽ có NFT riêng.

``` {.haskell}
tokenCurrencies, nftCurrencies :: Map Wallet CurrencySymbol
tokenCurrencies = Map.fromList $ zip wallets ["aa", "bb"]
nftCurrencies   = Map.fromList $ zip wallets ["01", "02"]

tokenNames :: Map Wallet TokenName
tokenNames = Map.fromList $ zip wallets ["A", "B"]

tokens :: Map Wallet AssetClass
tokens = Map.fromList [(w, AssetClass (tokenCurrencies Map.! w, tokenNames Map.! w)) | w <- wallets]

nftAssets :: Map Wallet AssetClass
nftAssets = Map.fromList [(w, AssetClass (nftCurrencies Map.! w, nftName)) | w <- wallets]

nfts :: Map Wallet Value
nfts = Map.fromList [(w, assetClassValue (nftAssets Map.! w) 1) | w <- wallets]  
```

Ví 1 sẽ giao dịch token A và Ví 2 sẽ giao dịch token B. Ví một sẽ có 01 NFT và Ví hai sẽ có 02 NFT.

Trong khi chúng tôi ở đây, chúng tôi có thể xem trình `tss`  tồn tại cùng với các chức năng của trình trợ giúp ở trên và ánh xạ các ví tới các tham số `TokenSale`  của chúng.

``` {.haskell}
tss :: Map Wallet TokenSale
tss = Map.fromList
    [ (w, TokenSale { tsSeller =  pubKeyHash $ walletPubKey w
                    , tsToken  =  tokens Map.! w
                    , tsNFT    =  nftAssets Map.! w
                    })
    | w <- wallets
    ]
```

Bây giờ, trở lại hàm `nextState`. Dòng đầu tiên của khối `do`  nói rằng tác động của việc gọi `Start` là ví sẽ mất NFT vào hợp đồng. Hãy nhớ rằng NFT bị khóa trong hợp đồng khi chúng tôi bắt đầu bán token.

``` {.haskell}
nextState (Start w) = do
  withdraw w $ nfts Map.! w
    (tsModel . at w) $= Just (TSState 0 0 0)
  wait 1
```

Thứ hai, sẽ có ảnh hưởng đến trạng thái của mô hình. Hãy nhớ rằng trạng thái mô hình là một bản đồ từ `Wallet` đến `TSState`, đâu `TSState` là bộ ba giá, token và Ada.

Dòng thứ hai của khối `do`  nói rằng sau khi hợp đồng đã bắt đầu, sẽ có một mục nhập trong bản đồ ở vị trí then chốt wvới 0 giá, 0 token và 0 Ada.

Phía bên trái của biểu thức là một ví dụ khác về quang học, lần này cho phép chúng tôi truy cập bản đồ `_tsModel` từ `TSModel`. `at` cho phép chúng tôi tham chiếu mục nhập bản đồ tại một khóa nhất định. Loại được trả về bởi quang này là một `Maybe` vì chìa khóa có thể ở đó hoặc có thể không.

$ = Đến từ đơn nguyên `Spec` và nó có một `lens` ở phía bên trái và sau đó là một giá trị mới ở phía bên phải.

Hàm `wait` đến từ đơn nguyên `Spec` và nói ở đây rằng hàm `Start`sẽ chiếm một vị trí.

Bây giờ chúng ta làm một cái gì đó tương tự cho tất cả các hoạt động khác. Thứ nhất `SetPrice`,.


``` {.haskell}
nextState (SetPrice v w p) = do
  when (v == w) $
      (tsModel . ix v . tssPrice) $= p
  wait 1
```

Trong chức năng này, chúng tôi chỉ thực hiện điều gì đó nếu ví gọi ra `SetPrice` giống với ví đang chạy bán token. Nếu đúng như vậy thì tiền không di chuyển, nhưng chúng ta phải cập nhật mô hình.

Chúng tôi sử dụng một `optic` khác - thay vì `at` chúng tôi sử dụng `ix` một `optic` `Traversal`. Nó tương tự như `at`, nhưng trong khi `at` trả về `Maybe`, thì `ix` là không. Nó cũng sử dụng `tssPrice` để tiếp cận phần tử đầu tiên của bộ `TSState` ba phần tử mà nó đặt thành giá. Trong trường hợp `ix` không tìm thấy mục nhập nó sẽ không có hiệu lực.

Các ví có khớp nhau hay không và việc cập nhật giá có thành công hay không, chúng tôi chờ một thời điểm.

Thay đổi trạng thái mô hình cho `AddTokens` phức tạp hơn.

``` {.haskell}
nextState (AddTokens v w n) = do
  started <- hasStarted v                                     -- has the token sale started?
  ...
```

Đầu tiên, chúng tôi kiểm tra việc bán token cho ví vđã thực sự bắt đầu chưa và đây là một chức năng trợ giúp khác.

``` {.haskell}
getTSState' :: ModelState TSModel -> Wallet -> Maybe TSState
getTSState' s v = s ^. contractState . tsModel . at v
```

Với một `ModelState`(thuộc loại `TSModel` nhưng với thông tin bổ sung như tiền hiện tại và thời gian hiện tại) và cho trước một `Wallet`, chúng tôi muốn trích xuất trạng thái`TSState`  của hợp đồng bán token cho ví đó, có thể có hoặc có thể chưa bắt đầu.

Điều này một lần nữa được thực hiện bằng cách sử dụng optic. Có một optic được gọi là `contractState`, đây là loại`TSModel` . Sau đó, chúng tôi phóng to bản đồ và sử dụng `at`, optic sẽ trả lại `Nothing` nếu chìa khóa ví `v` không tồn tại hoặc `Just` nếu `TSState` ở đó.

Sử dụng hàm này, chúng ta có thể viết một chút hàm này mà không có đối số đầu tiên. Thay vào đó, nó chỉ lấy đối số `Wallet` , nhưng sau đó trả về `Maybe TSState` của đơn nguyên `Spec`. Để làm điều đó, chúng tôi sử dụng một tính năng của đơn nguyên `Spec`, một hàm được gọi `getModelState`, sẽ trả về trạng thái mô hình, sau đó chúng tôi truyền cho phiên bản gốc của hàm cùng với đối số `Wallet` .

``` {.haskell}
getTSState :: Wallet -> Spec TSModel (Maybe TSState)
getTSState v = do
    s <- getModelState
    return $ getTSState' s v
```

Và sau đó, một biến thể khác, lần này được gọi là `hasStarted`, sẽ cho chúng ta biết, trong đơn nguyên Spec, liệu việc bán token đã thành công hay chưa.

``` {.haskell}
hasStarted :: Wallet -> Spec TSModel Bool
hasStarted v = isJust <$> getTSState v
```

Điều này chỉ kiểm tra xem giá trị trả về từ `getTSState v` là
`Just` hoặc là `Nothing`. Hàm `isJust` Trả về True nếu nó là `Just`và chúng tôi sử dụng `fmap` để nâng nó thành đơn nguyên Spec.

Tiếp tục với hàm `nextState` cho `AddTokens`

``` {.haskell}
nextState (AddTokens v w n) = do
  started <- hasStarted v 
  when (n > 0 && started) $ do
    bc <- askModelState $ view $ balanceChange w
```

Nếu việc bán token chưa bắt đầu, chúng tôi không làm bất cứ điều gì vì `AddTokens` sẽ không có bất kỳ tác dụng nào trong trường hợp đó.

Chúng tôi cũng kiểm tra xem số lượng token được thêm vào có lớn hơn không. Nếu không, một lần nữa chúng tôi không làm gì cả. Nếu không, chúng tôi tiếp tục.

Bây giờ chúng ta thấy một hàm khác từ đơn nguyên `Spec` được gọi là `askModelState`, tương tự như `getModelState` nhưng nó không trả về trạng thái mô hình hoàn chỉnh mà thay vào đó nhận một hàm và áp dụng nó vào trạng thái mô hình. Chức năng `view` này đến từ thư viện `lens`  và chỉ là một tên gọi khác của toán tử `^.`  để xem kết quả của việc phóng to optic.

Và có một lens `balanceChange w`  là thấu kính để thay đổi số dư của ví `w`. Sự thay đổi số dư đề cập đến số tiền của ví đã thay đổi kể từ khi bắt đầu mô phỏng.

Tại thời điểm này, chúng tôi có sự thay đổi số dư bị ràng buộc `bc`. Lý do chúng tôi làm điều này là vì chúng tôi muốn đảm bảo rằng ví có đủ tiền để thêm số lượng token được yêu cầu, điều mà chúng tôi hiện đang làm. Đầu tiên, chúng tôi tìm kiếm token.


``` {.haskell}
let token = tokens Map.! v
```

Sau đó, chúng tôi kiểm tra xem ví có đủ chúng hay không.

``` {.haskell}
when (tokenAmt + assetClassValueOf bc token >= n) $ do  -- does the wallet have the tokens to give?
  withdraw w $ assetClassValue token n
  (tsModel . ix v . tssToken) $~ (+ n)
wait 1
```

Số trong `tokenAmt` là số lượng token mà ví có lúc đầu, vì vậy, bằng cách thêm số này vào thay đổi số dư cho token, chúng tôi nhận được số lượng token hiện có trong ví.

Nếu chúng tôi có đủ token, thì chúng tôi sẽ rút đúng số token từ ví và chúng tôi cập nhật mô hình để cho thấy rằng các token bây giờ phải có trong hợp đồng. Lưu ý rằng thay vì sử dụng $ = để đặt giá trị, chúng ta sử dụng hàm $ ~ để áp dụng một hàm cho một giá trị.

Một lần nữa, chúng tôi chờ một chỗ.

Tiếp theo, chúng tôi viết một hàm `nextState` cho `BuyTokens`.

``` {.haskell}
nextState (BuyTokens v w n) = do
when (n > 0) $ do
    m <- getTSState v
    case m of
        Just t
            | t ^. tssToken >= n -> do
                let p = t ^. tssPrice
                    l = p ` n
                withdraw w $ lovelaceValueOf l
                deposit w $ assetClassValue (tokens Map.! v) n
                (tsModel . ix v . tssLovelace) $~ (+ l)
                (tsModel . ix v . tssToken)    $~ (+ (- n))
        _ -> return ()
wait 1
```

Đầu tiên, chúng tôi kiểm tra số lượng token mà chúng tôi đang cố gắng mua là số dương. Nếu đúng như vậy, thì chúng ta sẽ có trạng thái bán token.

Nếu trạng thái là một `Just` thì chúng tôi biết rằng việc bán token đã bắt đầu.

``` {.haskell}
m <- getTSState v
case m of
    Just t
```

Nếu vậy, chúng tôi sử dụng quang học để kiểm tra xem số lượng token có sẵn trong hợp đồng ít nhất là đủ để chúng tôi mua những gì chúng tôi yêu cầu.

``` {.haskell}
t ^. tssToken >= n -> do
```

Nếu chúng tôi vẫn tiếp tục, sau đó chúng tôi tra cứu giá hiện tại và tính toán số lượng token được yêu cầu sẽ có giá là bao nhiêu.

``` {.haskell}
let p = t ^. tssPrice
l = p ` n
```

Sau đó, hậu quả sẽ là ví của chúng tôi mất đi số lượng lovelace đó và nhận được các token chúng tôi mua. Đây `deposit` là lần đầu tiên chúng ta thấy chức năng này. Nó đối lập với chức năng`withdraw` .

``` {.haskell}
withdraw w $ lovelaceValueOf l
deposit w $ assetClassValue (tokens Map.! v) n
```

Cuối cùng, chúng tôi cập nhật trạng thái mô hình bằng cách thêm biểu tượng và xóa các token đã mua.

``` {.haskell}
(tsModel . ix v . tssLovelace) $~ (+ l)
(tsModel . ix v . tssToken)    $~ (+ (- n))  
```

Và chúng tôi chờ đợi một vị trí.

Cuối cùng là hành động `Withdraw`.

``` {.haskell}
nextState (Withdraw v w n l) = do
when (v == w) $ do
    m <- getTSState v
    case m of
        Just t
            | t ^. tssToken >= n && t ^. tssLovelace >= l -> do
                deposit w $ lovelaceValueOf l <> assetClassValue (tokens Map.! w) n
                (tsModel . ix v . tssLovelace) $~ (+ (- l))
                (tsModel . ix v . tssToken) $~ (+ (- n))
        _ -> return ()
wait 1  
```

Điều này chỉ có thể thực hiện được nếu ví muốn rút giống với ví đang bán hàng. Chúng tôi kiểm tra điều này trước, sau đó lấy trạng thái hợp đồng.

Chúng tôi kiểm tra cả hai để đảm bảo có đủ token để chúng tôi rút các token mà chúng tôi yêu cầu và cũng có đủ khả năng để chúng tôi rút tiền yêu cầu mà chúng tôi đang yêu cầu. Nếu điều này được thỏa mãn, thì hiệu quả là chúng tôi thêm biểu tượng và token vào ví và mô hình được cập nhật để phản ánh thực tế là các token và biểu tượng tình yêu đã bị xóa

Điều đó hoàn thành các khai báo hàm`nextState`.

Hiện tại, mô hình chỉ là một mô hình khái niệm không liên quan gì đến các hợp đồng mà chúng tôi đã viết trước đó. Những cái tên mang tính gợi ý vì chúng có cùng tên với chúng tôi đã sử dụng trong redeemer, nhưng vẫn chưa có mối liên hệ nào giữa mô hình và các hợp đồng thực tế.

Liên kết được cung cấp bởi một phương thức khác trong lớp `ContractModel`  mà chúng ta phải triển khai, và đó là hàm `perform`.

``` {.haskell}
perform
  :: ContractModel state =>
    HandleFun state
    -> ModelState state
    -> Action state
    -> Plutus.Trace.Emulator.EmulatorTrace ()
```

Nó nhận một cái gì đó gọi là `HandleFun` và sau đó lấy `ModelState`
và `Action`.

Tham số `HandleFun` cung cấp cho chúng tôi quyền truy cập vào các xử lý hợp đồng.

Hãy xem việc thực hiện phương pháp này của chúng tôi. Chúng tôi không cần truy cập vào `ModelState` cho ở ví dụ này.

``` {.haskell}
perform h _ cmd = case cmd of
  (Start w)          -> callEndpoint @"start"      (h $ StartKey w) (nftCurrencies Map.! w, tokenCurrencies Map.! w, tokenNames Map.! w) >> delay 1
  (SetPrice v w p)   -> callEndpoint @"set price"  (h $ UseKey v w) p                                                                    >> delay 1
  (AddTokens v w n)  -> callEndpoint @"add tokens" (h $ UseKey v w) n                                                                    >> delay 1
  (BuyTokens v w n)  -> callEndpoint @"buy tokens" (h $ UseKey v w) n                                                                    >> delay 1
  (Withdraw v w n l) -> callEndpoint @"withdraw"   (h $ UseKey v w) (n, l)   
```

Ở đây chúng tôi đang liên kết các hành động với các điểm cuối hợp đồng. Nhớ lại rằng chúng tôi đã viết các hàm tạo khóa xác định duy nhất các hợp đồng. Các hàm đã được gọi `StartKey` và `UseKey`.

Hàm `StartKey` nhận `Wallet` làm đối số, và bạn có thể thấy rằng chúng tôi cung cấp đối số đó ở đây trong dòng đầu tiên của nội dung hàm. Sau đó, chúng tôi áp dụng chức năng `h` cho nó. Hàm `h` là một tham số `HandleFun` và công việc của hàm này là nhận một xử lý đối với cá thể hợp đồng được liên kết với một khóa nhất định.

Chúng tôi cũng chuyển các tham số vào. Vì vậy, trong ví dụ về hành động bắt đầu, chúng tôi chuyển các giá trị được tính toán trước cho NFT, token và tên token. Chúng ta sẽ nói sau về cách hàm `instanceSpec` liên kết `StartKey` đến `startEndpoint'`, phiên bản gốc của hàm, nhận ba tham số đó.

Hàm `delay` sử dụng trong `perform` là một hàm trở giúp đơn giản khác để chờ một số slot.

``` {.haskell}
delay :: Int -> EmulatorTrace ()
delay = void . waitNSlots . fromIntegral
```

Tất cả các hành động khác tương tự, nhưng lưu ý rằng tất cả chúng đều sử dụng `UseKey` thay cho `StartKey`.

Cuối cùng, phương pháp cuối cùng mà chúng ta phải cung cấp cho`ContractModel` trường hợp này là `precondition`. Điều này cho phép chúng tôi xác định các điều kiện có thể chấp nhận được để cung cấp mỗi hành động.

``` {.haskell}
precondition :: ContractModel state => ModelState state -> Action state -> Bool
```

Điều kiện tiên quyết `Start` là việc bán token vẫn chưa bắt đầu. Nó nói rằng, với một trạng thái hành động nhất định `s` và `Start w`, hãy kiểm tra xem giá trị trả về của `getTSState\' s w` là `Nothing`.

``` {.haskell}
precondition s (Start w)          = isNothing $ getTSState' s w
```

Và đối với những người khác, chúng tôi làm ngược lại. Chúng chỉ có thể thực hiện được nếu việc bán token đã bắt đầu.

``` {.haskell}
precondition s (SetPrice v _ _)   = isJust    $ getTSState' s v
precondition s (AddTokens v _ _)  = isJust    $ getTSState' s v
precondition s (BuyTokens v _ _)  = isJust    $ getTSState' s v
precondition s (Withdraw v _ _ _) = isJust    $ getTSState' s v  
```

Một điều cuối cùng, chúng ta phải liên kết các chìa khóa với các hợp đồng thực tế. Chúng tôi làm điều này với hàm `instanceSpec`.

``` {.haskell}
instanceSpec :: [ContractInstanceSpec TSModel]
instanceSpec =
    [ContractInstanceSpec (StartKey w) w startEndpoint' | w <- wallets] ++
    [ContractInstanceSpec (UseKey v w) w $ useEndpoints $ tss Map.! v | v <- wallets, w <- wallets]  
```

Hàm `instanceSpec` trả về một danh sách các loại`ContractInstanceSpec`.

Hàm `ContractInstanceSpec` nhận ba đối số - ối số đầu tiên là khóa, đối số thứ hai là ví và đối số thứ ba là hợp đồng được cho là sẽ được gọi.

Đối với điểm cuối Start, chúng tôi tạo một `ContractInstanceSpec` cho mỗi ví.

Đối với endpoint use, Chúng tôi tạo một `ContractInstanceSpec` cho tất cacr các kết hợp hai ví. Lưu ý rằng hàm `useEndpoints` 
nhận đối số kiểu `TokenSale`, vì vầy chúng tôi nhận đối số này từ ví là `v` và chuyển nó vào trong.

Và cuối cùng (thành thật mà nói), chúng ta có thể định nghĩa một thuộc tính QuickCheck.

Có một chức năng trong Plutus.Contract.Test được gọi`propRunActionsWithOptions`.

``` {.haskell}
propRunActionsWithOptions
:: ContractModel state =>
   Plutus.Contract.Test.CheckOptions
   -> [ContractInstanceSpec state]
   -> (ModelState state -> Plutus.Contract.Test.TracePredicate)
   -> Actions state
   -> Property
```

Đầu tiên, nó sử dụng loại `CheckOptions` mà chúng ta đã thấy trước đây khi chúng ta thực hiện thử nghiệm theo dõi trình giả lập. Tiếp theo, nó lấy danh sách các `ContractInstanceSpec` mà chúng ta đã xác định ở trên. Sau đó, nó có một hàm từ `ModelState` đến `TracePredicate`, cho phép chúng tôi chèn các bài kiểm tra bổ sung. Và cuối cùng, nó tạo ra một hàm từ danh sách các `Actions` đến `Property`. `Property` giống như một chương trình tăng cường Bool, có các khả năng bổ sung, chủ yếu là để ghi nhật ký và gỡ lỗi.

Chúng tôi sử dụng điều này trong hàm `prop_TS`. Đối với các tùy chọn, chúng tôi sử dụng giống như trước đây cho phép chúng tôi chỉ định các phân phối tiền xu ban đầu. Chúng tôi cung cấp cho mỗi ví 1.000 Ada, NFT của ví và 1.000 token `A` và `B`.

Đối với đối số thứ hai, chúng tôi cung cấp hàm `instanceSpec`. Đối với đối số thứ ba, chúng tôi không thêm bất kỳ kiểm tra bổ sung nào.

``` {.haskell}
prop_TS :: Actions TSModel -> Property
prop_TS = withMaxSuccess 100 . propRunActionsWithOptions
    (defaultCheckOptions & emulatorConfig .~ EmulatorConfig (Left d))
    instanceSpec
    (const $ pure True)
  where
    d :: InitialDistribution
    d = Map.fromList $ [ ( w
                         , lovelaceValueOf 1000_000_000 <>
                           (nfts Map.! w)               <>
                           mconcat [assetClassValue t tokenAmt | t <- Map.elems tokens])
                       | w <- wallets
                       ]
```

Điều này dẫn đến một loại

``` {.haskell}
Actions TSModel -> Property
```

Và đây là điều mà QuickCheck có thể xử lý.

Hãy xem một mẫu của `Actions TSModel`

``` {.haskell}
Prelude Test.QuickCheck Plutus.Contract.Test.ContractModel Spec.Model> sample (arbitrary :: Gen (Actions TSModel))
Actions []
Actions []
Actions []
Actions []
Actions []
Actions 
 [Start (Wallet 1),
  AddTokens (Wallet 1) (Wallet 2) 8,
  Withdraw (Wallet 1) (Wallet 2) 5 1,
  Withdraw (Wallet 1) (Wallet 1) 7 2,
  SetPrice (Wallet 1) (Wallet 1) 0,
  Start (Wallet 2),
  BuyTokens (Wallet 2) (Wallet 1) 2]
Actions 
 [Start (Wallet 1)]
Actions 
 [Start (Wallet 2),
  Withdraw (Wallet 2) (Wallet 1) 4 5,
  SetPrice (Wallet 2) (Wallet 2) 5,
  BuyTokens (Wallet 2) (Wallet 2) 3,
  Start (Wallet 1),
  BuyTokens (Wallet 1) (Wallet 1) 14,
  Withdraw (Wallet 1) (Wallet 1) 11 7,
  AddTokens (Wallet 2) (Wallet 1) 12]
Actions 
 [Start (Wallet 1),
  AddTokens (Wallet 1) (Wallet 2) 1,
  BuyTokens (Wallet 1) (Wallet 1) 11,
  SetPrice (Wallet 1) (Wallet 2) 5,
  Withdraw (Wallet 1) (Wallet 1) 10 6,
  Withdraw (Wallet 1) (Wallet 2) 13 0,
  BuyTokens (Wallet 1) (Wallet 1) 8,
  Withdraw (Wallet 1) (Wallet 2) 6 14,
  SetPrice (Wallet 1) (Wallet 2) 7,
  BuyTokens (Wallet 1) (Wallet 2) 4,
  AddTokens (Wallet 1) (Wallet 2) 3]
Actions 
 [Start (Wallet 1),
  BuyTokens (Wallet 1) (Wallet 2) 10]
Actions 
 [Start (Wallet 1),
  SetPrice (Wallet 1) (Wallet 2) 14,
  BuyTokens (Wallet 1) (Wallet 1) 20,
  BuyTokens (Wallet 1) (Wallet 2) 15,
  Start (Wallet 2),
  Withdraw (Wallet 2) (Wallet 2) 14 1,
  AddTokens (Wallet 2) (Wallet 2) 4,
  Withdraw (Wallet 2) (Wallet 1) 21 2,
  SetPrice (Wallet 2) (Wallet 1) 8,
  Withdraw (Wallet 1) (Wallet 2) 15 17,
  SetPrice (Wallet 1) (Wallet 1) 2,
  BuyTokens (Wallet 2) (Wallet 1) 4]
```

Chúng tôi nhận thấy ở đây một mô hình tương tự như trước đây, nơi mọi thứ bắt đầu khá đơn giản và phức tạp hơn khi danh sách tiếp tục.

Vì vậy, những gì sẽ được kiểm tra? Như chúng ta đã thấy trong sơ đồ ở phần đầu, đối với tất cả các chuỗi hành động được tạo ngẫu nhiên này, nó sẽ kiểm tra xem các thuộc tính mà chúng tôi đã chỉ định trong mô hình - cách dòng tiền - tương ứng với những gì thực sự xảy ra trong trình mô phỏng. Nếu có sự khác biệt, bài kiểm tra sẽ không thành công.

Hãy sử dụng nó!

``` {.haskell}
Prelude Test.QuickCheck Plutus.Contract.Test.ContractModel Spec.Model> test
(21 tests)
```

Phải mất khá nhiều thời gian.

``` {.haskell}
Prelude Test.QuickCheck Plutus.Contract.Test.ContractModel Spec.Model> test
(27 tests)
```

Nhưng nó sẽ chạy 100% nếu bạn để nó hoàn thành.

Điều thú vị hơn có thể là triển khai một lỗi trong mã và xem liệu các thử nghiệm này có tìm thấy nó hay không.

Trong hàm `transition` của mã `TokenSale` của chúng ta, chúng ta hãy quên kiểm tra rằng chỉ người bán mới có thể thay đổi giá.

``` {.haskell}
transition :: TokenSale -> State Integer -> TSredeemer -> Maybe (TxConstraints Void Void, State Integer)
transition ts s r = case (stateValue s, stateData s, r) of
    (v, _, SetPrice p)   | p >= 0 -> Just ( mempty -- Just ( Constraints.mustBeSignedBy (tsSeller ts)
    , State p $
      v <>
      nft (negate 1)
    )
...
```

Chúng tôi cần tải lại mã.

``` {.haskell}
Prelude Test.QuickCheck Plutus.Contract.Test.ContractModel Spec.Model> :l test/Spec/Model.hs
Ok, one module loaded.
Prelude Test.QuickCheck Plutus.Contract.Test.ContractModel Spec.Model> test
`` Failed! Assertion failed (after 13 tests and 2 shrinks)...
```

Bạn sẽ thấy toàn bộ đầu ra, nhưng ở trên cùng, bạn sẽ thấy rõ ràng chuỗi hành động dẫn đến lỗi.

``` {.haskell}
Actions
  [Start (Wallet 2),
   SetPrice (Wallet 2) (Wallet 1) 12,
   AddTokens (Wallet 2) (Wallet 2) 11,
   BuyTokens (Wallet 2) (Wallet 2) 1]
Expected funds of W2 to change by
   Value (Map [(02,Map [("NFT",-1)]),(bb,Map [("B",-10)])])
   (excluding 29466 lovelace in fees)
but they changed to
   Value (Map [(,Map [("",-12)]),(02,Map [("NFT",-1)]),(bb,Map [("B",-10)])])
Test failed.
```

Và chúng tôi thấy rằng Wallet 1 đã cố gắng đặt giá bán token đã được bắt đầu bởi Wallet 2. Điều này sẽ không dẫn đến thay đổi vì Wallet 1 không được phép làm điều này.

Mô hình tin rằng giá vẫn phải bằng 0, nhưng trong trình giả lập, giá đã được đặt thành 12.

Sau đó, Ví 2 thêm 11 token và sau đó mua 1 token từ chính nó.

Theo mô hình, các token phải miễn phí. Mô hình hy vọng rằng ví mất NFT, ví đó cũng mất 10 "B" vì nó đã cho 11 và sau đó mua lại 1 và không có thay đổi về Ada trong ví, vì giá token bằng 0.

Nhưng trong trình giả lập, việc đặt giá đã có ảnh hưởng và do đó, nó báo cáo rằng ví đã mất 12 lovelace.

Vì vậy, sự khác biệt trong dòng tiền đã được tìm thấy và QuickCheck báo cáo lỗi.

Theo mặc định, đây là tất cả những gì kiểm tra QuickCheck làm. Nó chỉ kiểm tra dòng tiền, liệu trình giả lập và mô hình có đồng ý ở mỗi điểm hay không. Tuy nhiên, có thể thêm các kiểm tra bổ sung. Và cũng có thể ảnh hưởng đến các chuỗi hành động để chúng ta có thể chỉ định các luồng hành động nhất định để điều khiển các bài kiểm tra theo những hướng nhất định. Đó được gọi là Logic động, và đó là một đơn nguyên khác.

Mặc dù điều này rất mạnh mẽ, nó cũng có những hạn chế của nó. Đối với một, nó chỉ kiểm tra các hợp đồng mà chúng tôi cung cấp. Nó không kiểm tra tất cả các mã off-chain có thể có. Có thể một số bên có thể viết mã ngoài chuỗi của riêng họ để cho phép họ ăn cắp tiền từ hợp đồng của chúng tôi và mô hình QuickCheck này không thể kiểm tra điều đó.

Vấn đề thứ hai là tính đồng thời. Chúng tôi đã thêm độ trễ này của một thời điểm vào mỗi hành động để đảm bảo rằng mọi thứ được trình tự độc đáo. Tất nhiên, trong một blockchain thực hoặc trong một trình giả lập, ví có thể có các giao dịch gửi đồng thời. Về nguyên tắc, chúng tôi cũng có thể cố gắng làm điều đó với mô hình này, nhưng sau đó chúng tôi cần phải xác định bằng cách nào đó trong mô hình điều gì sẽ xảy ra trong từng trường hợp và điều đó có thể trở nên rất phức tạp.

Chúng ta nên nhanh chóng xem xét cách thức này tích hợp với Tasty.

Có một hàm trong thư viện Tasty được gọi `testProperty` là một trong những đối số của nó, lấy thuộc tính QuickCheck.

``` {.haskell}
tests :: TestTree
tests = testProperty "token sale model" prop_TS
```

Bạn sẽ thấy một khổ thơ bổ sung trong tệp cabal của tuần này

``` {.}
test-suite plutus-pioneer-program-week08-tests
type: exitcode-stdio-1.0
main-is: Spec.hs
...
```

Và, nếu chúng ta nhìn vào Spec.hs

``` {.haskell}
main :: IO ()
main = defaultMain tests

tests :: TestTree
tests = testGroup "token sale"
    [ Spec.Trace.tests
    , Spec.Model.tests
    ]  
```

Chúng ta có thể thấy rằng nó chỉ định một danh sách các mô-đun thử nghiệm. Và chúng có thể được chạy từ dòng lệnh với lệnh sau.

``` {.}
cabal test
```
