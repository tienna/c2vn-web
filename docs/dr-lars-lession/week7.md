Week 07 - State Machines
========================

Chú ý

Đây là phiên bản viết của [Bài giảng số 7 Dr.Lars](https://youtu.be/ptsltoZNl50).

<iframe width="100%" height="400" src="https://www.youtube.com/embed/ptsltoZNl50" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Nó bao gồm các lược đồ cam kết và máy trạng thái.

Tuần này, chúng tôi đã sử dụng Plutus commit: 
530cc134364ae186f39fb2b54239fb7c5e2986e9

Giới thiệu
------------

Trong bài giảng này, chúng ta sẽ xem xét các máy trạng thái. Máy trạng thái có thể rất hữu ích để viết các hợp đồng ngắn hơn và súc tích hơn, cả on-chain và off-chain. Có hỗ trợ cấp cao hơn cho các máy trạng thái trong các thư viện Plutus được xây dựng dựa trên các cơ chế cấp thấp hơn mà chúng tôi đã thấy cho đến nay.

Như một ví dụ đang chạy, chúng tôi sẽ triển khai một trò chơi nhỏ, được chơi giữa Alice và Bob. Nó hơi giống Rock, Paper, Scissors, nhưng thậm chí còn đơn giản hơn, vì chỉ có hai lựa chọn.

Alice và Bob đều có hai lựa chọn, họ có thể chọn 0 hoặc 1.

![](img/week07__00000.png)

Nếu có người chơi trò chơi này khi đang ở trong cùng một phòng, họ sẽ thực hiện các bước di chuyển của mình cùng một lúc. Sẽ có một cử chỉ cho 0 và một cử chỉ cho 1, họ sẽ giơ tay đồng thời và, tùy thuộc vào những gì họ chơi, một trong số họ sẽ thắng.

Nếu cả hai chơi cùng một số, Alice thắng. Nếu họ chơi các số khác nhau, Bob thắng.

![](img/week07__00001.png)

Bây giờ, hãy tưởng tượng rằng Alice và Bob không thể gặp nhau trực tiếp nhưng họ vẫn muốn chơi trò chơi. Vì vậy, họ quyết định chơi nó qua thư - email hoặc thư ốc, điều đó không quan trọng. Nó sẽ hoạt động như thế nào?

Alice có thể gửi cho Bob

![](img/week07__00004.png)

Tuy nhiên, điều này mang lại một lợi thế rất không công bằng cho Bob, bởi vì bây giờ anh ta mở thư của Alice, thấy rằng cô ấy đã chơi 0, và anh ta chỉ cần trả lời bằng 1, và anh ta thắng.

![](img/week07__00003.png)

Và, nếu Alice gửi 1, Bob chỉ có thể trả lời bằng 1. Vì vậy, Bob luôn thắng, vì vậy không công bằng.

![](img/week07__00005.png)

Chúng ta có thể làm gì về điều đó?

Có một thủ thuật rất thông minh thường được sử dụng trong các giao thức mật mã, đó là các lược đồ cam kết. Ý tưởng là Alice không tiết lộ sự lựa chọn của mình cho Bob, nhưng cô ấy cam kết với điều đó, để sau này cô ấy không thể thay đổi quyết định của mình.

Một cách để thực hiện công việc đó là sử dụng các hàm băm.

Băm đều ở khắp nơi trong thế giới blockchain. Chúng tôi đã thấy rằng các địa chỉ script chỉ là hàm băm của tập lệnh mã plutus và chúng tôi đã thấy rất nhiều ví dụ về băm khóa công khai.

Hàm băm là một hàm một chiều. Với một hàm băm, và rất khó, hoặc không thể, để tạo lại chuỗi byte ban đầu đã được băm.

Vì vậy, một cách mà chúng tôi có thể thử để làm cho điều này hoạt động là, thay vì Alice gửi lựa chọn của mình cho Bob, thay vào đó, cô ấy gửi hàm băm theo lựa chọn của mình.

![](img/week07__00006.png)

Bob sau đó nhìn thấy chuỗi byte khó hiểu này và anh ta không biết Alice chọn 0 hay 1.

Bob sau đó trả lời bằng cách di chuyển chọn chẳng hạn như 0. Anh ta không cần sử dụng hàm băm, anh ta chỉ có thể gửi phản hồi của mình bằng văn bản rõ ràng.

Bây giờ, Alice sẽ thắng. Nhưng có lẽ Bob không tin cô ấy. Vì vậy, có một bước bổ sung mà Alice phải thực hiện.

Alice phải gửi lựa chọn thực tế của mình cho Bob bằng văn bản rõ ràng. Bob sau đó phải kiểm tra xem băm mà cô ấy chọn có thực sự giống với băm mà Alice đã gửi trước đó hay không.

![](img/week07__00007.png)

Nếu đúng như vậy, thì anh ta biết rằng Alice không nói dối và anh ta thực sự đã thua. Nếu nó không khớp, thì anh ta biết rằng Alice đang gian lận và anh ta sẽ thắng.

Tất cả điều này nghe có vẻ đầy hứa hẹn, nhưng có một vấn đề lớn với nó.

Trong trò chơi này chỉ có hai sự lựa chọn, 0 và 1. Có nghĩa là chỉ có hai phép băm. Chúng có thể trông rất khó hiểu đối với Bob trong lần đầu tiên chơi, nhưng chẳng bao lâu sau, anh ấy sẽ nhận thấy rằng anh ấy luôn nhìn thấy một trong hai hàm băm khả thi, và sau đó anh ấy có thể biết Alice đã chọn lựa chọn nào.

Điều này gần như tồi tệ như thể Alice vừa gửi sự lựa chọn của mình bằng văn bản rõ ràng.

Những gì chúng ta có thể làm về điều này là, thay vì gửi hàm băm theo lựa chọn của mình, thay vào đó, trước tiên cô ấy chọn một chuỗi byte tùy ý và thêm vào sự nửa chọn của mình rồi mới băm. Chuỗi byte tùy ý mà Alice chọn được gọi là "nonce" - một số chỉ được sử dụng một lần.

![](img/week07__00008.png)

Vì vậy, bây giờ không phải lúc nào cũng là một chuỗi byte giống nhau nếu cô ấy chọn 0, miễn là cô ấy chọn một số nonce ngẫu nhiên, không thể đoán trước.

Bây giờ, Bob nhận được thông báo này và chúng tôi tiếp tục như trước - Bob gửi lựa chọn của anh ấy, và sau đó, trong thông điệp thứ ba, Alice không chỉ cần gửi lựa chọn ban đầu của mình mà còn phải gửi cả tin nhắn nữa.

![](img/week07__00010.png)

Và sau đó Bob kiểm tra xem mã băm của Alice được xác nhận quyền sở hữu không được nối với lựa chọn của cô ấy có thực sự là mã băm mà anh ta nhận được ban đầu hay không. Nếu đúng, anh biết mình đã thua, còn nếu không, anh biết cô đã cố lừa anh.

Điều này hoạt động rất độc đáo và đây là những gì chúng tôi sẽ cố gắng triển khai trong Cardano. Đầu tiên chúng ta sẽ làm điều đó bằng cách sử dụng các kỹ thuật mà chúng ta đã thấy, sau đó chúng ta sẽ xem làm thế nào, bằng cách sử dụng máy trạng thái, mã có thể rõ ràng hơn và ngắn hơn nhiều.

Ví dụ 1
--------------

Chúng ta có thể tưởng tượng rằng, khi bắt đầu trò chơi, Alice và Bob đã đặt mỗi người một số tiền như nhau và người thắng sẽ lấy hết.

Trò chơi bắt đầu với việc Alice đăng hàm băm của cô ấy, như đã mô tả ở trên. Bob, nếu anh ấy chơi cùng, sẽ đăng sự lựa chọn của riêng anh ấy. Tại thời điểm này, chúng ta có lựa chọn băm của Alice và Bob.

![](img/week07__00011.png)

Nếu, tại thời điểm này, Alice nhận ra rằng cô ấy đã thắng, dựa trên sự lựa chọn của Bob, cô ấy có thể tiết lộ bí mật của mình, trò chơi kết thúc và cô ấy đã thắng.

![](img/week07__00012.png)

Tuy nhiên, nếu sau khi Bob chơi, Alice thấy rằng cô ấy đã thua cuộc thì cô ấy không cần phải làm gì cả. Sau khi đạt đến một thời hạn nhất định, nếu Alice không phản hồi, Bob sẽ có thể yêu cầu các khoản tiền.

![](img/week07__00013.png)

Có một kịch bản khác. Có lẽ, sau khi Alice bắt đầu chơi, Bob chỉ đơn giản là không hứng thú, không chơi. Trong trường hợp này, Alice phải có cách lấy lại số tiền của chính mình.

![](img/week07__00016.png)

Như đã đề cập, nỗ lực đầu tiên của chúng tôi để mã hóa điều này trong Plutus sẽ sử dụng các kỹ thuật mà chúng tôi đã học trong các bài giảng trước.

Mã chúng tôi đang làm việc nằm trong mô-đun sau:

``` {.haskell}
module Week07.EvenOdd
```

Chúng tôi gọi là trò chơi `EvenOdd` thực tế là nếu tổng các số là chẵn thì người chơi thứ nhất thắng, và nếu tổng là số lẻ, người chơi thứ hai sẽ thắng.

Trong mã của chúng tôi, chúng tôi sẽ gọi những người chơi `first` và `second` thay vì Alice và Bob.

### On chain


Chúng tôi xác định một kiểu data `Game` sẽ được sử dụng làm tham số cho hợp đồng.

``` {.haskell}
data Game = Game
    { gFirst          :: !PubKeyHash
    , gSecond         :: !PubKeyHash
    , gStake          :: !Integer
    , gPlayDeadline   :: !Slot
    , gRevealDeadline :: !Slot
    , gToken          :: !AssetClass
    } deriving (Show, Generic, FromJSON, ToJSON, Prelude.Eq, Prelude.Ord)    
```

Những người chơi được xác định bằng hàm băm khóa công khai của họ là `gFirst` và `gSecond`.

Số `lovelace` được sử dụng làm tiền đặt cược trong trò chơi được thể hiện bằng `gStake` - Số tiền cược này phải được cung cấp bởi mỗi người chơi.

Có hai thời hạn. Là số slot `gPlayDeadline`  mà người chơi thứ hai phải chơi. Trong trường hợp người chơi thứ hai đã chơi,thì `gRevealDeadline` là số slot mà người chơi thứ nhất phải tuyên bố chiến thắng bằng cách tiết lộ `nonce` của mình.

Cuối cùng, chúng tôi có một mã thông báo được đại diện bởi `gToken`. Đây sẽ là thủ thuật tương tự mà chúng tôi đã sử dụng cho oracle. Nó sẽ là một NFT tùy ý, được sử dụng để xác định phiên bản đúng của UTxO mà chúng tôi đang sử dụng. Ý tưởng là sử dụng dữ liệu đặt tại UTxO trong địa chỉ tập lệnh của hợp đồng này để theo dõi vị trí của chúng tôi trong trò chơi.

Tiếp theo, chúng tôi xác định hai nước đi mà người chơi có thể thực hiện.


``` {.haskell}
data GameChoice = Zero | One
    deriving (Show, Generic, FromJSON, ToJSON, ToSchema, Prelude.Eq, Prelude.Ord)    

instance Eq GameChoice where
    {-# INLINABLE (==) #-}
    Zero == Zero = True
    One  == One  = True
    _    == _    = False
```

Chúng tôi cần `Eq`,  nhưng không thể tuyên bố rằng trong mệnh đề dẫn xuất, đó là lý do tại sao `Eq` trong mệnh đề dẫn xuất đủ điều kiện là từ Haskell Prelude tiêu chuẩn.

Lưu ý rằng chúng tôi đã sử dụng `INLINABLE` pragma trong `Eq` cho `GameChoice`. Điều này một lần nữa để làm cho nó tương thích với Template Haskell mà chúng tôi sẽ cần sử dụng.

Đối với trạng thái, chúng tôi sẽ sử dụng một loại được gọi là `GameDatum`.

``` {.haskell}
data GameDatum = GameDatum ByteString (Maybe GameChoice)
deriving Show

instance Eq GameDatum where
    {-# INLINABLE (==) #-}
    GameDatum bs mc == GameDatum bs' mc' = (bs == bs') && (mc == mc')    
```

Đây `ByteString` à hàm băm mà người chơi đầu tiên gửi và và có thể
`GameChoice` là `Just` di chuyển của người chơi thứ hai hoặc `Nothing` nếu họ chưa di chuyển.


Bây giờ chúng ta đến với `redeemer` và chúng ta cũng sẽ sử dụng một loại tùy chỉnh cho việc này.

``` {.haskell}
data GameRedeemer = Play GameChoice | Reveal ByteString | ClaimFirst | ClaimSecond
    deriving Show
```

--- `Play` là nơi người chơi thứ hai di chuyển và như một đối số, nó có một `GameChoice`. `Reveal` dành cho trường hợp người chơi đầu tiên đã thắng và phải chứng minh điều đó bằng cách tiết lộ `nonce` của họ, và `nonce` được thể hiện bằng đối số `ByteString`. Chúng tôi không cần `Reveal`, vì họ sẽ chỉ tiết lộ nếu họ đã thắng, và chúng tôi biết nước đi nào khiến họ thắng.

--- `ClaimFirst` là khi người chơi đầu tiên yêu cầu trả lại tiền đặt cược ngay cả khi người chơi thứ hai không di chuyển trước thời hạn chơi.
--- `ClaimSecond` dành cho trường hợp người chơi đầu tiên không tiết lộ trước thời hạn tiết lộ.

Sau đó, chúng tôi có `lovelaces`  hàm trợ giúp của chúng tôi mà chúng tôi đã sử dụng trong các tập lệnh khác, có số lượng được giữ trong `Value`.

``` {.haskell}
lovelaces :: Value -> Integer
lovelaces = Ada.getLovelace . Ada.fromValue
```

Và chúng ta có một hàm trợ giúp `gameDatum` nó hoạt động giống hệt như hàm `oracleValue`, wmà bạn có thể tìm thấy trong ghi chú của bài giảng 6.

``` {.haskell}
gameDatum :: TxOut -> (DatumHash -> Maybe Datum) -> Maybe GameDatum
gameDatum o f = do
    dh      <- txOutDatum o
    Datum d <- f dh
    PlutusTx.fromData d    
```

Bây giờ chúng ta đến với logic nghiệp vụ cốt lõi trong hàm `mkGameValidator`.

``` {.haskell}
mkGameValidator :: Game -> ByteString -> ByteString -> GameDatum -> GameRedeemer -> ScriptContext -> Bool
mkGameValidator game bsZero' bsOne' dat red ctx =
...
```

Đối số đầu tiên là `Game`.

thứ hai và thứ ba hơi phiền phức. Chúng tôi chỉ cần chúng do thực tế là không thể sử dụng chuỗi ký tự để lấy ByteStringstrong Haskell được biên dịch thành lõi Plutus.
Và, chúng tôi muốn các ký tự chuỗi đại diện cho các lựa chọn 0 và 1. So `bsZero'` đại diện cho `"0"` và `beOne'` đại diện cho `"1"`. Bạn sẽ thấy cách chúng tôi chuyển những điều này làm đối số phụ sau này.

Sau đó, chúng tôi chuyển các đối số thông thường cho  datum, redeemer and context.

Trước tiên, hãy xem xét một số chức năng của helper. Có ba hàm chúng ta đã sử dụng trước đây và đã thảo luận trong bài giảng 6.

``` {.haskell}
info :: TxInfo
info = scriptContextTxInfo ctx

ownInput :: TxOut
ownInput = case findOwnInput ctx of
    Nothing -> traceError "game input missing"
    Just i  -> txInInfoResolved i

ownOutput :: TxOut
ownOutput = case getContinuingOutputs ctx of
    [o] -> o
    _   -> traceError "expected exactly one game output"
```

Lưu ý rằng `ownInput` không bao giờ được thất bại vì chúng tôi đang trong quá trình xác thực UTxO.

The `outputDatum` trợ giúp sử dụng kiểu `GameDatum` mà chúng ta đã xác định trước đó. Trong trường hợp chúng ta có chính xác một đầu ra (trả về từ ownOutput), nó sẽ cung cấp cho chúng ta datum.

``` {.haskell}
outputDatum :: GameDatum
outputDatum = case gameDatum ownOutput (`findDatum` info) of
    Nothing -> traceError "game output datum not found"
    Just d  -> d
```

Hàm `checkNonce` dành cho những trường hợp người chơi đầu tiên như won và mong muốn chứng minh điều đó bằng cách tiết lộ `nonce` của họ. Đối số đầu tiên là hàm băm đã được gửi ban đầu, đối số thứ hai là hàm băm đang được tiết lộ.

Đối với tham số `GameChoice` - typed, chúng tôi sẽ chuyển nước đi được thực hiện bởi người chơi 2. Điều này sẽ giống với nước đi được thực hiện bởi người chơi 1 và đây là những gì hàm này sẽ xác định bằng cách sử dụng băm và nonce.

Để kiểm tra hàm băm của nonce được nối với `GameChoice`,chúng tôi sử dụng một hàm trợ giúp để chuyển đổi `GameChoice` thành  `ByteString`. Lưu ý rằng việc sử dụng `cFirst` và `cSecond` trong hàm `checkNonce` có thể được hoán đổi vòng và hàm sẽ hoạt động giống nhau - sự khác biệt là  Hai là `GameChoice` và một là `ByteString`.
 
``` {.haskell}
checkNonce :: ByteString -> ByteString -> GameChoice -> Bool
checkNonce bs nonce cSecond = sha2_256 (nonce `concatenate` cFirst) == bs
  where
    cFirst :: ByteString
    cFirst = case cSecond of
        Zero -> bsZero'
        One  -> bsOne'    
```

Cuối cùng, câu hỏi đặt ra là điều gì sẽ xảy ra với NFT sau khi trò chơi kết thúc và không còn địa chỉ trò chơi nào nữa. Cách chúng tôi đã triển khai ở đây là NFT quay trở lại trình phát đầu tiên. Người chơi đầu tiên cần nó ngay từ đầu để bắt đầu trò chơi và đặt NFT vào đúng UTxO, vì vậy cuối cùng thì việc trả lại cho người chơi 1 là điều hợp lý.

Để xác minh rằng điều kiện này được đáp ứng, chúng tôi đã tạo một hàm trợ giúp được gọi là `nftToFirst`.

``` {.haskell}
nftToFirst :: Bool
nftToFirst = assetClassValueOf (valuePaidTo info $ gFirst game) (gToken game) == 1
```

Bây giờ chúng ta đã đề cập đến các chức năng của helper, hãy xem xét các điều kiện.

Có một điều kiện bao gồm tất cả các trường hợp, đó là đầu vào mà chúng tôi đang xác thực phải chứa NFT.

``` {.haskell}
traceIfFalse "token missing from input" (assetClassValueOf (txOutValue ownInput) (gToken game) == 1) &&
```

Sau đó, các quy tắc tùy thuộc vào tình huống.

``` {.haskell}
case (dat, red) of
```

Tình huống đầu tiên là tình huống mà người chơi thứ hai vẫn chưa di chuyển, và họ vừa mới di chuyển.

``` {.haskell}
(GameDatum bs Nothing, Play c) ->
    traceIfFalse "not signed by second player"   (txSignedBy info (gSecond game))                                   &&
    traceIfFalse "first player's stake missing"  (lovelaces (txOutValue ownInput) == gStake game)                   &&
    traceIfFalse "second player's stake missing" (lovelaces (txOutValue ownOutput) == (2 ` gStake game))            &&
    traceIfFalse "wrong output datum"            (outputDatum == GameDatum bs (Just c))                             &&
    traceIfFalse "missed deadline"               (to (gPlayDeadline game) `contains` txInfoValidRange info)         &&
    traceIfFalse "token missing from output"     (assetClassValueOf (txOutValue ownOutput) (gToken game) == 1)    
```

Ở đây, phần đầu tiên là `GameDatum` và nó chứa hàm băm của người chơi đầu tiên và a `Nothing` cho thấy rằng người chơi thứ hai vẫn chưa di chuyển. Phần thứ hai là `GameRedeemer` và đã được xác định là thuộc loại `Play GameChoice`. Chúng tôi chỉ định `GameChoice` một phần để `c` sử dụng mẫu.

Chúng tôi kiểm tra xem người chơi thứ hai đã ký vào giao dịch chưa.


``` {.haskell}
traceIfFalse "not signed by second player" (txSignedBy info (gSecond game))
```

Sau đó, chúng tôi kiểm tra xem số tiền đặt cược của người chơi đầu tiên có trong đầu vào hay không.

``` {.haskell}
traceIfFalse "first player's stake missing" (lovelaces (txOutValue ownInput) == gStake game)
```

Đầu ra phải có số tiền đặt cược của người chơi thứ hai được thêm vào tổng số tiền cược.

``` {.haskell}
traceIfFalse "second player's stake missing" (lovelaces (txOutValue ownOutput) == (2 ` gStake game))
```

Bây giờ chúng ta chính xác dữ liệu của đầu ra phải là gì. Nó phải là cùng một hàm băm, cộng với nước đi được thực hiện bởi người chơi thứ hai.

``` {.haskell}
traceIfFalse "wrong output datum" (outputDatum == GameDatum bs (Just c))
```

Việc di chuyển phải xảy ra trước thời hạn chơi.

``` {.haskell}
traceIfFalse "missed deadline" (to (gPlayDeadline game) `contains` txInfoValidRange info)
```

Và cuối cùng, NFT phải được chuyển vào  đầu ra UTxO.

``` {.haskell}
traceIfFalse "token missing from output" (assetClassValueOf (txOutValue ownOutput) (gToken game) == 1)    
```

Tình huống thứ hai là khi cả hai người chơi đã di chuyển, và người chơi thứ hai phát hiện ra rằng họ đã thắng. Để chứng minh điều đó và nhận được tiền thắng, họ phải tiết lộ nonce của mình.

Vì vậy, giao dịch phải được ký bởi người chơi đầu tiên, nonce thực sự phải đồng ý với băm được gửi trước đó, nó phải được thực hiện trước thời hạn tiết lộ, thông tin đầu vào phải chứa cả cổ phần của cả hai người chơi và cuối cùng NFT phải quay trở lại người chơi đầu tiên.

``` {.haskell}
(GameDatum bs (Just c), Reveal nonce) ->
    traceIfFalse "not signed by first player"    (txSignedBy info (gFirst game))                                    &&
    traceIfFalse "commit mismatch"               (checkNonce bs nonce c)                                            &&
    traceIfFalse "missed deadline"               (to (gRevealDeadline game) `contains` txInfoValidRange info)       &&
    traceIfFalse "wrong stake"                   (lovelaces (txOutValue ownInput) == (2 ` gStake game))             &&
    traceIfFalse "NFT must go to first player"   nftToFirst    
```

Tiếp theo, chúng ta có trường hợp người chơi thứ hai không di chuyển trong thời hạn và người chơi thứ nhất đang đòi lại tiền đặt cược của họ. Ở đây, người chơi đầu tiên phải ký vào giao dịch, thời hạn chơi phải trôi qua, tiền đặt cược của họ phải có và NFT phải quay trở lại người chơi đầu tiên.

``` {.haskell}
(GameDatum _ Nothing, ClaimFirst) ->
    traceIfFalse "not signed by first player"    (txSignedBy info (gFirst game))                                    &&
    traceIfFalse "too early"                     (from (1 + gPlayDeadline game) `contains` txInfoValidRange info)   &&
    traceIfFalse "first player's stake missing"  (lovelaces (txOutValue ownInput) == gStake game)                   &&
    traceIfFalse "NFT must go to first player"   nftToFirst
```

Cuối cùng, trường hợp cả hai người chơi đã di chuyển và người chơi thứ nhất bị thua hoặc không được tiết lộ kịp thời, vì vậy người chơi thứ hai đang đòi tiền thắng. Lần này, giao dịch phải được ký bởi người chơi thứ hai, thời hạn tiết lộ phải trôi qua, tiền cược của cả hai người chơi phải có và NFT, như thường lệ, quay trở lại người chơi đầu tiên.

``` {.haskell}
(GameDatum _ (Just _), ClaimSecond) ->
    traceIfFalse "not signed by second player"   (txSignedBy info (gSecond game))                                   &&
    traceIfFalse "too early"                     (from (1 + gRevealDeadline game) `contains` txInfoValidRange info) &&
    traceIfFalse "wrong stake"                   (lovelaces (txOutValue ownInput) == (2 ` gStake game))             &&
    traceIfFalse "NFT must go to first player"   nftToFirst
```

Bốn trường hợp này là tất cả các trường hợp hợp pháp mà chúng tôi có thể có, vì vậy trong tất cả các trường hợp khác, chúng tôi không xác nhận được.

``` {.haskell}
_ -> False
```

Vì vậy, bây giờ chúng ta hãy xem xét phần còn lại của mã on-chain.

Như thường lệ, chúng tôi xác định một kiểu dữ liệu chứa thông tin về các loại datum and redeemer.

``` {.haskell}
data Gaming
instance Scripts.ScriptType Gaming where
    type instance DatumType Gaming = GameDatum
    type instance RedeemerType Gaming = GameRedeemer    
```

Và chúng tôi xác định `ByteStrings` cái sẽ được sử dụng để đại diện cho hai lựa chọn. Các giá trị này là hoàn toàn tùy ý - chúng không thể giống nhau.

``` {.haskell}
bsZero, bsOne :: ByteString
bsZero = "0"
bsOne  = "1"
```


Trong Boilerplate để biên dịch `mkGameValidator` thành mã Plutus core được tham số hóa của chúng tôi . Chúng tôi áp dụng ba tham số `Game` và hai tham số `ByteString`. Hãy nhớ rằng, chúng ta cần truyền các tham số `ByteString` này vào vì chúng ta không thể coi `ByteStrings` là chuỗi ký tự trong Plutus.

``` {.haskell}
gameInst :: Game -> Scripts.ScriptInstance Gaming
gameInst game = Scripts.validator @Gaming
    ($$(PlutusTx.compile [|| mkGameValidator ||])
        `PlutusTx.applyCode` PlutusTx.liftCode game
        `PlutusTx.applyCode` PlutusTx.liftCode bsZero
        `PlutusTx.applyCode` PlutusTx.liftCode bsOne)
    $$(PlutusTx.compile [|| wrap ||])
  where
    wrap = Scripts.wrapValidator @GameDatum @GameRedeemer
```

Bản soạn thảo thông thường cho trình xác nhận và địa chỉ.

``` {.haskell}
gameValidator :: Game -> Validator
gameValidator = Scripts.validatorScript . gameInst

gameAddress :: Game -> Ledger.Address
gameAddress = scriptAddress . gameValidator
```

Bây giờ, để chuẩn bị cho mã off-chain, chúng tôi sẽ cần phải tìm được UTxO phù hợp - UTxO mang NFT. Để làm điều này, chúng tôi sẽ viết một hàm trợ giúp được gọi `findGameOutput`.

``` {.haskell}
findGameOutput :: HasBlockchainActions s => Game -> Contract w s Text (Maybe (TxOutRef, TxOutTx, GameDatum))
findGameOutput game = do
    utxos <- utxoAt $ gameAddress game
    return $ do
        (oref, o) <- find f $ Map.toList utxos
        dat       <- gameDatum (txOutTxOut o) (`Map.lookup` txData (txOutTxTx o))
        return (oref, o, dat)
  where
    f :: (TxOutRef, TxOutTx) -> Bool
    f (_, o) = assetClassValueOf (txOutValue $ txOutTxOut o) (gToken game) == 1
```

Hàm `findGameOutput` lấy `Game`,sau đó sử dụng `Contract monad`  để cố gắng tìm kiếm UTxO có chứa NFT. Nó trả về kiểu `Maybe`,
bởi vì nó không tìm thấy bất kỳ một UTxO nào chứa NFT. Nếu tìm thấy có thì trả về `Just` chứa tham chiếu giao dịch, giao dịch chính nó, và `GameDatum`.

Đầu tiên, chúng tôi nhận được danh sách tất cả các UTxO tại địa chỉ trò chơi, sau đó chúng tôi sử dụng hàm `find`, chuyển vào một hàm trợ giúp `f` để kiểm tra xem đầu ra có chứa NFT hay không.

Hàm `find` được tìm thấy trong module `Data.List` và định nghĩa như sau:

``` {.haskell}
find :: Foldable t => (a -> Bool) -> t a -> Maybe a
```

Điều này hoạt động với nhiều vùng chung hơn là chỉ danh sách, nhưng bạn có thể nghĩ đến danh sách trong ví dụ này. Nó nhận một `predicate` cho một phần tử của kiểu `Foldable`  - danh sách trong trường hợp này, và cũng lấy một vùng chứa `a` - lại một danh sách trong ví dụ này và trả về `Maybe a`.

Logic là nếu nó tìm thấy một phần tử thỏa mãn vị từ, nó sẽ trả về nó dưới dạng `Just`,  ngược lại nó sẽ trả về `Nothing`.
Ví dụ:

``` {.haskell}
Prelude Data.List Week07.EvenOdd> find even [1 :: Int, 3, 5, 8, 11, 12]
Just 8

Prelude Data.List Week07.EvenOdd> find even [1 :: Int, 3, 5, 11]
Nothing
```

#### Hợp đồng `firstGame`

Chúng tôi có hai hợp đồng, một cho mỗi người chơi.

Mỗi hợp đồng có loại tham số riêng. Đối với  hợp đồng `firstGame`, chúng tôi gọi là `FirstParams`.

``` {.haskell}
data FirstParams = FirstParams
    { fpSecond         :: !PubKeyHash
    , fpStake          :: !Integer
    , fpPlayDeadline   :: !Slot
    , fpRevealDeadline :: !Slot
    , fpNonce          :: !ByteString
    , fpCurrency       :: !CurrencySymbol
    , fpTokenName      :: !TokenName
    , fpChoice         :: !GameChoice
    } deriving (Show, Generic, FromJSON, ToJSON, ToSchema)
```

Chúng tôi không cần trường `fpFirst` ở đây, vì người chơi đầu tiên là chủ sở hữu của ví, vì vậy chúng tôi biết hàm băm khóa công khai của họ. Nhưng chúng tôi cần `fpSecond` và cũng có các trường quen thuộc để đặt cược, thời hạn chơi và thời hạn tiết lộ.

Sau đó, chúng ta cần `nonce`, NFT (tách thành `fpCurrency` và `fpTokenName`), và cuối cùng là nước đi mà người chơi muốn thực hiện.

Bây giờ, hợp đồng là


``` {.haskell}
firstGame :: forall w s. HasBlockchainActions s => FirstParams -> Contract w s Text ()
firstGame fp = do
...
```

Điều đầu tiên chúng tôi làm là lấy băm khóa công khai của riêng mình.

``` {.haskell}
pkh <- pubKeyHash <$> Contract.ownPubKey
```

Sau đó, chúng tôi điền các trường của trò chơi.

``` {.haskell}
let game = Game
        { gFirst          = pkh
        , gSecond         = fpSecond fp
        , gStake          = fpStake fp
        , gPlayDeadline   = fpPlayDeadline fp
        , gRevealDeadline = fpRevealDeadline fp
        , gToken          = AssetClass (fpCurrency fp, fpTokenName fp)
        }
```

The `v` value is our stake plus the NFT, which must both go into the
UTxO.
giá trị `v` cổ phần của chúng tôi cộng với NFT, mà cả hai phải cùng ở trên UTxO.

``` {.haskell}
let ...
    v    = lovelaceValueOf (fpStake fp) <> assetClassValue (gToken game) 1
```

Sau đó, chúng tôi tính toán băm mà chúng tôi cần gửi như một động thái ngụy trang của chúng tôi.

``` {.haskell}
let ...
    c    = fpChoice fp
    bs   = sha2_256 $ fpNonce fp `concatenate` if c == Zero then bsZero else bsOne
```

Sau đó chúng tôi gửi giao dịch và chờ đợi như bình thường. Các ràng buộc rất đơn giản. Chúng ta chỉ cần tạo UTxI với dữ liệu di chuyển của chúng ta (chưa có gì cho người chơi thứ hai) và giá trị `v` mà chúng ta đã xác định ở trên.

``` {.haskell}
let ...
    tx   = Constraints.mustPayToTheScript (GameDatum bs Nothing) v
ledgerTx <- submitTxConstraints (gameInst game) tx
void $ awaitTxConfirmed $ txId ledgerTx
logInfo @String $ "made first move: " ++ show (fpChoice fp)
```

Và chúng tôi chờ đợi thời hạn cuối cùng của thời gian chơi, tại thời điểm đó người chiến thắng có thể được xác định.

``` {.haskell}
void $ awaitSlot $ 1 + fpPlayDeadline fp
```

Sau khi thời hạn trôi qua, chúng tôi nắm giữ UTxO. Nếu tại thời điểm này, UTxO không được tìm thấy, thì đã xảy ra sự cố. Chúng tôi biết rằng chúng tôi đã sản xuất UTxO và điều duy nhất mà người chơi thứ hai có thể làm là tạo một cái mới.

``` {.haskell}
m <- findGameOutput game
case m of
    Nothing             -> throwError "game output not found"
```

Vì vậy, giả sử chúng tôi tìm thấy nó, trường hợp đầu tiên chúng tôi xác định là trường hợp mà người chơi thứ hai không di chuyển. Vì vậy, chúng tôi có thể sử dụng redeemer `ClaimFirst` để lấy lại tiền đặt cược.

Khi tra cứu, chúng tôi cần cung cấp UTxO và trình xác thực của trò chơi.

``` {.haskell}
Just (oref, o, dat) -> case dat of
    GameDatum _ Nothing -> do
        logInfo @String "second player did not play"
        let lookups = Constraints.unspentOutputs (Map.singleton oref o) <>
                      Constraints.otherScript (gameValidator game)
            tx'     = Constraints.mustSpendScriptOutput oref (Redeemer $ PlutusTx.toData ClaimFirst)
        ledgerTx' <- submitTxConstraintsWith @Gaming lookups tx'
        void $ awaitTxConfirmed $ txId ledgerTx'
        logInfo @String "reclaimed stake"
```

Trường hợp thứ hai là người chơi thứ hai đã di chuyển, và họ đã thua. Trong trường hợp đó, bây giờ chúng tôi phải tiết lộ nonce của mình, mà chúng tôi sử dụng công cụ redeemer `Reveal`.

Chúng tôi phải đưa ra một ràng buộc bổ sung rằng giao dịch phải được gửi trước khi thời hạn tiết lộ thông qua.

``` {.haskell}
GameDatum _ (Just c') | c' == c -> do
    logInfo @String "second player played and lost"
    let lookups = Constraints.unspentOutputs (Map.singleton oref o)                                         <>
                  Constraints.otherScript (gameValidator game)
        tx'     = Constraints.mustSpendScriptOutput oref (Redeemer $ PlutusTx.toData $ Reveal $ fpNonce fp) <>
                  Constraints.mustValidateIn (to $ fpRevealDeadline fp)
    ledgerTx' <- submitTxConstraintsWith @Gaming lookups tx'
    void $ awaitTxConfirmed $ txId ledgerTx'
    logInfo @String "victory"
```

Nếu người chơi thứ hai di chuyển và giành chiến thắng, không có gì để làm.

``` {.haskell}
_ -> logInfo @String "second player played and won"
```

#### Hợp đồng thứ `secondGame`

Các thông số cho người chơi thứ hai tương tự như các thông số của người chơi thứ nhất. Lần này chúng tôi không cần băm khóa công khai của người chơi thứ hai, vì đó là của chúng tôi và chúng tôi đã biết nó là gì. Thay vào đó, chúng tôi cần băm khóa công khai của người chơi đầu tiên. Ngoài ra, chúng ta không cần nonce.

``` {.haskell}
data SecondParams = SecondParams
    { spFirst          :: !PubKeyHash
    , spStake          :: !Integer
    , spPlayDeadline   :: !Slot
    , spRevealDeadline :: !Slot
    , spCurrency       :: !CurrencySymbol
    , spTokenName      :: !TokenName
    , spChoice         :: !GameChoice
    } deriving (Show, Generic, FromJSON, ToJSON, ToSchema)    
```

Đầu tiên, chúng tôi lấy mã băm khóa công khai của riêng mình, sau đó chúng tôi thiết lập các giá trị trò chơi, theo cách tương tự như chúng tôi đã làm cho người chơi đầu tiên.

``` {.haskell}
secondGame :: forall w s. HasBlockchainActions s => SecondParams -> Contract w s Text ()
secondGame sp = do
    pkh <- pubKeyHash <$> Contract.ownPubKey
    let game = Game
            { gFirst          = spFirst sp
            , gSecond         = pkh
            , gStake          = spStake sp
            , gPlayDeadline   = spPlayDeadline sp
            , gRevealDeadline = spRevealDeadline sp
            , gToken          = AssetClass (spCurrency sp, spTokenName sp)
            }
```

Bây giờ, chúng tôi cố gắng tìm UTxO có chứa NFT

``` {.haskell}
m <- findGameOutput game
```

Nếu chúng tôi không tìm thấy nó, thì không có gì để làm, nhưng nếu chúng tôi tìm thấy nó ...

``` {.haskell}
case m of
    Just (oref, o, GameDatum bs Nothing) -> do
        logInfo @String "running game found"
```

Sau đó, chúng tôi muốn gọi tập lệnh với trình redeemer `Play` .

Chúng tôi chỉ định NFT cho `token`.

``` {.haskell}
let token   = assetClassValue (gToken game) 1
```


Bây giờ chúng ta tính toán giá trị mà chúng ta phải đưa vào đầu ra mới. Hãy nhớ rằng, nếu chúng ta quyết định chơi, chúng ta phải sử dụng UTxO hiện có và tạo một UTxO mới ở cùng một địa chỉ. Đầu tiên sẽ chứa tiền cược mà người chơi đầu tiên đã thêm, và bây giờ chúng ta phải thêm tiền cược của chính mình và chúng ta phải giữ NFT trong đó.

``` {.haskell}
let v = let x = lovelaceValueOf (spStake sp) in x <> x <> token
```

Tiếp theo, sự lựa chọn của chúng tôi.

``` {.haskell}
let c = spChoice sp
```

Then the constraints and their required lookups.

We must consume the existing UTxO using the Play redeemer with our
choice
Sau đó, các ràng buộc và tra cứu yêu cầu của chúng.

Chúng tôi phải sử dụng UTxO hiện có bằng cách sử dụng redeemer `Play` theo lựa chọn của chúng tôi

``` {.haskell}
let tx = Constraints.mustSpendScriptOutput oref (Redeemer $ PlutusTx.toData $ Play c) <>
```

Và tạo một UTxO mới với updated datum (giống như `bs`, nhưng với lựa chọn của chúng tôi), và với giá trị `v` cái mà chúng tôi đã tính toán.

``` {.haskell}
Constraints.mustPayToTheScript (GameDatum bs $ Just c) v <>
```

Và nó phải được thực hiện trước khi thời hạn trôi qua.

``` {.haskell}
Constraints.mustValidateIn (to $ spPlayDeadline sp)
```

Để tra cứu, chúng tôi cần UTxO, trình xác thực và vì chúng tôi đang tạo UTxO cho tập lệnh, nên chúng tôi cần phiên bản tập lệnh.

``` {.haskell}
let lookups = Constraints.unspentOutputs (Map.singleton oref o)                            <>
              Constraints.otherScript (gameValidator game)                                 <>
              Constraints.scriptInstanceLookups (gameInst game)
```

Sau đó, chúng tôi làm điều bình thường, chúng tôi submit, chúng tôi chờ xác nhận và chúng tôi ghi vào sổ.

``` {.haskell}
ledgerTx <- submitTxConstraintsWith @Gaming lookups tx
let tid = txId ledgerTx
void $ awaitTxConfirmed tid
logInfo @String $ "made second move: " ++ show (spChoice sp)
```

Sau đó, chúng tôi đợi cho đến khi thời hạn tiết lộ đã qua.

``` {.haskell}
void $ awaitSlot $ 1 + spRevealDeadline sp
```

Và chúng tôi lại cố gắng tìm UTxO, mà bây giờ có thể là một UTxO khác.

``` {.haskell}
m' <- findGameOutput game
```

nếu `m'` là `Nothing` - nói cách khác, nếu chúng tôi không tìm thấy UTxO, thì điều đó có nghĩa là trong khi chúng tôi chờ đợi, người chơi đầu tiên đã tiết lộ và giành chiến thắng. Vì vậy, không có gì để chúng tôi phải làm.

``` {.haskell}
case m' of
    Nothing             -> logInfo @String "first player won"
```

Tuy nhiên, nếu chúng tôi tìm thấy UTxO, điều đó có nghĩa là người chơi đầu tiên đã không tiết lộ, có nghĩa là họ quyết định không chơi, có thể là vì họ đã thua. Trong mọi trường hợp, bây giờ chúng tôi có thể yêu cầu tiền thắng cược.

Ràng buộc của chúng tôi là chúng tôi phải sử dụng UTxO mà chúng tôi tìm thấy sau khi thời hạn đã qua và chúng tôi phải giao lại NFT cho người chơi đầu tiên.

``` {.haskell}
Just (oref', o', _) -> do
    logInfo @String "first player didn't reveal"
    let lookups' = Constraints.unspentOutputs (Map.singleton oref' o')                              <>
                   Constraints.otherScript (gameValidator game)
        tx'      = Constraints.mustSpendScriptOutput oref' (Redeemer $ PlutusTx.toData ClaimSecond) <>
                   Constraints.mustValidateIn (from $ 1 + spRevealDeadline sp)                      <>
                   Constraints.mustPayToPubKey (spFirst sp) token
    ledgerTx' <- submitTxConstraintsWith @Gaming lookups' tx'
    void $ awaitTxConfirmed $ txId ledgerTx'
    logInfo @String "second player won"
```

Nếu chúng tôi không tìm thấy NFT, thì không có gì để sử dụng.

``` {.haskell}
_ -> logInfo @String "no running game found"            
```

Đó là tất cả mã chúng ta cần cho hai hợp đồng on-chain.

Để làm cho chúng dễ truy cập hơn, chúng tôi xác định hai `Endpoints`, một cho trình phát đầu tiên và một cho trình phát thứ hai. Và sau đó chúng tôi xác định một hợp đồng được gọi là `endpoints` mà nó lựa chọn giữa hai `Endpoint` và gọi đệ quy chính nó.

``` {.haskell}
type GameSchema = BlockchainActions .\/ Endpoint "first" FirstParams .\/ Endpoint "second" SecondParams

endpoints :: Contract () GameSchema Text ()
endpoints = (first `select` second) >> endpoints
  where
    first  = endpoint @"first"  >>= firstGame
    second = endpoint @"second" >>= secondGame
```

Vì vậy, điều này kết thúc phiên bản đầu tiên của trò chơi - phiên bản không sử dụng máy trạng thái.

Bây giờ, hãy kiểm tra nó bằng cách sử dụng monad `EmulatorTrace` .

#### Thử nghiệm

Hàm `test` kiểm tra mỗi trong số bốn kết hợp bằng cách gọi hàm`test'` mà cần lựa chọn người chơi đầu tiên và thứ hai tương ứng.

hàm `test'` sử dụng `runEmulatorTraceIO'` biến thể cho phép chúng ta thiết lập các bản phân phối ví ban đầu sử dụng một `EmulatorConfig`.

``` {.haskell}
test :: IO ()
test = do
    test' Zero Zero
    test' Zero One
    test' One Zero
    test' One One

test' :: GameChoice -> GameChoice -> IO ()
test' c1 c2 = runEmulatorTraceIO' def emCfg $ myTrace c1 c2
  where
    emCfg :: EmulatorConfig
    emCfg = EmulatorConfig $ Left $ Map.fromList
        [ (Wallet 1, v <> assetClassValue (AssetClass (gameTokenCurrency, gameTokenName)) 1)
        , (Wallet 2, v)
        ]

    v :: Value
    v = Ada.lovelaceValueOf 1000_000_000
```

Vì NFT không phải là trọng tâm của bài giảng này, chúng tôi đã đưa ra một thử nghiệm NFT trong không khí loãng. Trong một kịch bản thế giới thực, chúng ta sẽ cần tạo ra một NFT thực, bằng cách sử dụng một trong những phương pháp chúng ta đã thấy trước đây.

Bây giờ là dấu vết. Chúng tôi chuyển hai lựa chọn trò chơi vào hàm`myTrace`.

``` {.haskell}
myTrace :: GameChoice -> GameChoice -> EmulatorTrace ()
myTrace c1 c2 = do
    Extras.logInfo $ "first move: " ++ show c1 ++ ", second move: " ++ show c2
```

Sau đó, chúng tôi bắt đầu hai phiên bản của hợp đồng, một cho ví 1 và một cho ví 2.

``` {.haskell}
h1 <- activateContractWallet (Wallet 1) endpoints
h2 <- activateContractWallet (Wallet 2) endpoints
```

Chúng tôi tra cứu hai hàm băm khóa công khai.

``` {.haskell}
let pkh1 = pubKeyHash $ walletPubKey $ Wallet 1
    pkh2 = pubKeyHash $ walletPubKey $ Wallet 2
```

Sau đó, chúng tôi xác định các tham số mà chúng tôi sẽ sử dụng cho các hợp đồng. Trong thực tế `fpNonce` sẽ là một số chuỗi ngẫu nhiên, nhưng ở đây chúng tôi chỉ mã hóa cứng là "SECRETNONCE".

``` {.haskell}
fp = FirstParams
        { fpSecond         = pkh2
        , fpStake          = 5000000
        , fpPlayDeadline   = 5
        , fpRevealDeadline = 10
        , fpNonce          = "SECRETNONCE"
        , fpCurrency       = gameTokenCurrency
        , fpTokenName      = gameTokenName
        , fpChoice         = c1
        }
sp = SecondParams
        { spFirst          = pkh1
        , spStake          = 5000000
        , spPlayDeadline   = 5
        , spRevealDeadline = 10
        , spCurrency       = gameTokenCurrency
        , spTokenName      = gameTokenName
        , spChoice         = c2
        }
```

Và sau đó chúng tôi gọi các endpoints.

``` {.haskell}
callEndpoint @"first" h1 fp

void $ Emulator.waitNSlots 3

callEndpoint @"second" h2 sp

void $ Emulator.waitNSlots 10
```

Bây giờ, chúng ta có thể chạy thử nghiệm này từ REPL.

``` {.haskell}
cabal repl
Prelude Week07.StateMachine> :l Week07.Test
Prelude Week07.Test> test
```

##### Thử nghiệm trường hợp 1

Kịch bản đầu tiên là cả hai đều chọn chơi bằng "0", vì vậy ví đầu tiên sẽ thắng.

``` {.haskell}
Slot 00000: TxnValidate 9fbe753823edc9d69538ae9a03702708ccac2b9ae58b8426bcfcf99e274dd552
Slot 00000: SlotAdd Slot 1
Slot 00001: `` USER LOG: first move: Zero, second move: Zero
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Contract instance started
Slot 00001: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 2}:
  Contract instance started
```

Ví đầu tiên tạo UTxO ban đầu với số tiền đặt cọc của nó và ghi lại một thông báo rằng nó đã di chuyển.

``` {.haskell}
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Receive endpoint call: Object (fromList [("tag",String "first"),("value",Object (fromList [("unEndpointValue",Object (fromList [("fpChoice",String "Zero"),("fpCurrency",Object (fromList [("unCurrencySymbol",String "ff")])),("fpNonce",String "5345435245544e4f4e4345"),("fpPlayDeadline",Object (fromList [("getSlot",Number 5.0)])),("fpRevealDeadline",Object (fromList [("getSlot",Number 10.0)])),("fpSecond",Object (fromList [("getPubKeyHash",String "39f713d0a644253f04529421b9f51b9b08979d08295959c4f3990ee617f5139f")])),("fpStake",Number 5000000.0),("fpTokenName",Object (fromList [("unTokenName",String "STATE TOKEN")]))]))]))])
Slot 00001: W1: TxSubmit: 6f41600a05f16728a64f9f227bd2e828a0ccbbf9b56f46503f06873d3e8906a6
Slot 00001: TxnValidate 6f41600a05f16728a64f9f227bd2e828a0ccbbf9b56f46503f06873d3e8906a6
Slot 00001: SlotAdd Slot 2
Slot 00002: `` CONTRACT LOG: "made first move: Zero"
Slot 00002: SlotAdd Slot 3
Slot 00003: SlotAdd Slot 4
```

Trong khi ví đầu tiên đang đợi, ví thứ hai khởi động và tìm thấy UTxO, nhận thấy rằng nó có thể thực hiện và làm như vậy.

``` {.haskell}
Slot 00004: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 2}:
  Receive endpoint call: Object (fromList [("tag",String "second"),("value",Object (fromList [("unEndpointValue",Object (fromList [("spChoice",String "Zero"),("spCurrency",Object (fromList [("unCurrencySymbol",String "ff")])),("spFirst",Object (fromList [("getPubKeyHash",String "21fe31dfa154a261626bf854046fd2271b7bed4b6abe45aa58877ef47f9721b9")])),("spPlayDeadline",Object (fromList [("getSlot",Number 5.0)])),("spRevealDeadline",Object (fromList [("getSlot",Number 10.0)])),("spStake",Number 5000000.0),("spTokenName",Object (fromList [("unTokenName",String "STATE TOKEN")]))]))]))])
Slot 00004: ``` CONTRACT LOG: "running game found"
Slot 00004: W2: TxSubmit: 9ff5cf1ce61c0395b653a57449c39ed14f06bb75600057ea0e32a8d1588d048e
Slot 00004: TxnValidate 9ff5cf1ce61c0395b653a57449c39ed14f06bb75600057ea0e32a8d1588d048e
Slot 00004: SlotAdd Slot 5
Slot 00005: ``` CONTRACT LOG: "made second move: Zero"
```

Người chơi đầu tiên nhận ra rằng họ đã thắng, và vì vậy phải tiết lộ. Và chúng tôi thấy trong số dư cuối cùng rằng Wallet 1 thực sự có NFT trở lại và nó cũng có nhiều hơn gần 5 ada so với ban đầu. Tất nhiên, sự khác biệt là do phí giao dịch. Và ví thứ hai có ít hơn 5 ada một chút.

``` {.haskell}
Slot 00005: SlotAdd Slot 6
Slot 00006: ``` CONTRACT LOG: "second player played and lost"
Slot 00006: W1: TxSubmit: ea946a524a7a3959743fc4c5dbc3982bf1510a84d973fecbb660a328bb58c0b5
Slot 00006: TxnValidate ea946a524a7a3959743fc4c5dbc3982bf1510a84d973fecbb660a328bb58c0b5
Slot 00006: SlotAdd Slot 7
Slot 00007: `` CONTRACT LOG: "victory"
Slot 00007: SlotAdd Slot 8
Slot 00008: SlotAdd Slot 9
Slot 00009: SlotAdd Slot 10
Slot 00010: SlotAdd Slot 11
Slot 00011: ``` CONTRACT LOG: "first player won"
Slot 00011: SlotAdd Slot 12
Slot 00012: SlotAdd Slot 13
Slot 00013: SlotAdd Slot 14
Slot 00014: SlotAdd Slot 15
Final balances
Wallet 1: 
    {, ""}: 1004999980
    {ff, "STATE TOKEN"}: 1
Wallet 2: 
    {, ""}: 994999990
```

##### Thử nghiệm trường hợp 2

Trong trường hợp thứ hai, Ví 1 một lần nữa đóng vai trò chọn chơi Số "0", nhưng lần này Ví tiền 2 đóng vai trò chọn số "1".

``` {.haskell}
Slot 00000: TxnValidate 9fbe753823edc9d69538ae9a03702708ccac2b9ae58b8426bcfcf99e274dd552
Slot 00000: SlotAdd Slot 1
Slot 00001: `` USER LOG: first move: Zero, second move: One
```

Khởi đầu cũng vậy.

``` {.haskell}
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Contract instance started
Slot 00001: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 2}:
  Contract instance started
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Receive endpoint call: Object (fromList [("tag",String "first"),("value",Object (fromList [("unEndpointValue",Object (fromList [("fpChoice",String "Zero"),("fpCurrency",Object (fromList [("unCurrencySymbol",String "ff")])),("fpNonce",String "5345435245544e4f4e4345"),("fpPlayDeadline",Object (fromList [("getSlot",Number 5.0)])),("fpRevealDeadline",Object (fromList [("getSlot",Number 10.0)])),("fpSecond",Object (fromList [("getPubKeyHash",String "39f713d0a644253f04529421b9f51b9b08979d08295959c4f3990ee617f5139f")])),("fpStake",Number 5000000.0),("fpTokenName",Object (fromList [("unTokenName",String "STATE TOKEN")]))]))]))])
Slot 00001: W1: TxSubmit: 6f41600a05f16728a64f9f227bd2e828a0ccbbf9b56f46503f06873d3e8906a6
Slot 00001: TxnValidate 6f41600a05f16728a64f9f227bd2e828a0ccbbf9b56f46503f06873d3e8906a6
Slot 00001: SlotAdd Slot 2
Slot 00002: `` CONTRACT LOG: "made first move: Zero"
Slot 00002: SlotAdd Slot 3
Slot 00003: SlotAdd Slot 4
```

Bây giờ ví thứ hai tìm thấy `game` và thực hiện việc chơi, nhưng bây giờ chọn là Một.

``` {.haskell}
Slot 00004: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 2}:
  Receive endpoint call: Object (fromList [("tag",String "second"),("value",Object (fromList [("unEndpointValue",Object (fromList [("spChoice",String "One"),("spCurrency",Object (fromList [("unCurrencySymbol",String "ff")])),("spFirst",Object (fromList [("getPubKeyHash",String "21fe31dfa154a261626bf854046fd2271b7bed4b6abe45aa58877ef47f9721b9")])),("spPlayDeadline",Object (fromList [("getSlot",Number 5.0)])),("spRevealDeadline",Object (fromList [("getSlot",Number 10.0)])),("spStake",Number 5000000.0),("spTokenName",Object (fromList [("unTokenName",String "STATE TOKEN")]))]))]))])
Slot 00004: ``` CONTRACT LOG: "running game found"
Slot 00004: W2: TxSubmit: 3200aab18d986869a7e9aa65ff45a635e0bc2dff9b04df26a0864355990f9c10
Slot 00004: TxnValidate 3200aab18d986869a7e9aa65ff45a635e0bc2dff9b04df26a0864355990f9c10
Slot 00004: SlotAdd Slot 5
Slot 00005: ``` CONTRACT LOG: "made second move: One"
```

Bây giờ ví đầu tiên nhận ra nó đã bị thua và không làm gì cả.

``` {.haskell}
Slot 00005: SlotAdd Slot 6
Slot 00006: `` CONTRACT LOG: "second player played and won"
Slot 00006: SlotAdd Slot 7
Slot 00007: SlotAdd Slot 8
Slot 00008: SlotAdd Slot 9
Slot 00009: SlotAdd Slot 10
Slot 00010: SlotAdd Slot 11
```

Ví thứ hai phát hiện ra rằng thời hạn đã qua mà không được tiết lộ nonce và gọi endpoint `ClaimSecond` để nhận tiền. Khi chúng tôi xem xét số dư cuối cùng, Ví 1 một lần nữa có NFT trở lại, nhưng tình hình số dư Ada đã bị đảo ngược.

``` {.haskell}
Slot 00011: ``` CONTRACT LOG: "first player didn't reveal"
Slot 00011: W2: TxSubmit: a66744d7b4692db9457d9c3a5d832db7d1471299bd36ffe27827f41ec3e999f1
Slot 00011: TxnValidate a66744d7b4692db9457d9c3a5d832db7d1471299bd36ffe27827f41ec3e999f1
Slot 00011: SlotAdd Slot 12
Slot 00012: ``` CONTRACT LOG: "second player won"
Slot 00012: SlotAdd Slot 13
Slot 00013: SlotAdd Slot 14
Slot 00014: SlotAdd Slot 15
Final balances
Wallet 1: 
    {ff, "STATE TOKEN"}: 1
    {, ""}: 994999990
Wallet 2: 
    {, ""}: 1004999980
```

Hai trường hợp còn lại rất giống nhau, vì vậy chúng tôi sẽ không đăng nhật ký ở đây.

Vì vậy, tất cả điều này dường như hoạt động như mong đợi.

Ví dụ 2
--------------

Bây giờ chúng ta sẽ viết lại mã này bằng cách sử dụng các máy trạng thái (state machine).

### Máy trạng thái là gì?

Một cỗ máy trạng thái không liên quan gì đến blockchain. Nó là một hệ thống bắt đầu với một số loại trạng thái, có một hoặc nhiều chuyển đổi sang các trạng thái khác, và từ những trạng thái đó có những chuyển đổi tiếp theo, v.v., giống như một đồ thị có hướng. Một số trạng thái có thể là trạng thái final , từ đó không thể có chuyển tiếp nữa.

![](img/week07__00014.png)

Nếu chúng ta nhìn lại cách trò chơi của chúng ta hoạt động, thì chúng ta có thể coi nó là một cỗ máy trạng thái.

![](img/week07__00016.png)

Trạng thái ban đầu sẽ là [Hash], nơi người chơi đầu tiên thực hiện hành động.

Từ trạng thái ban đầu, có thể có hai quá trình chuyển đổi. Một nơi Bob chơi và một nơi Bob không chơi và Alice có thể đòi lại.

Trong biểu đồ, tất cả các nút tương ứng với các trạng thái và tất cả các mũi tên tương ứng với các chuyển đổi.

Trong blockchain, máy trạng thái sẽ được đại diện bởi một UTxO ở địa chỉ máy trạng thái. Trạng thái của máy sẽ là dữ liệu của UTxO đó. Quá trình chuyển đổi sẽ là một giao dịch sử dụng trạng thái hiện tại, sử dụng công cụ mua lại đặc trưng cho quá trình chuyển đổi, sau đó tạo ra một UTxO mới tại cùng một địa chỉ, nơi dữ liệu hiện phản ánh trạng thái mới.

Mô hình này rất phù hợp với nhiều tình huống và có sự hỗ trợ đặc biệt trong các thư viện của Plutus để triển khai các máy trạng thái như vậy. Chúng ta sẽ thấy rằng khi chúng ta sử dụng cách tiếp cận này, mã của chúng ta sẽ ngắn hơn nhiều.

Hỗ trợ cho các máy trạng thái nằm trong gói  `plutus-contract`, trong mô-đun
[Language.Plutus.Contract.StateMachine](https://playground.plutus.iohkdev.io/tutorial/haddock/plutus-contract/html/Language-Plutus-Contract-StateMachine.html)

StateMachine có hai tham số kiểu `s` và `i`, đại diện cho trạng thái và đầu vào. Chúng tương ứng với datum and redeemer tương ứng

![](img/week07__00017.png)

Nó là một loại bản ghi có bốn trường. Có lẽ điều quan trọng nhất là`smTransition`,  xác định quá trình chuyển đổi nào có thể di chuyển trạng thái nào ở trạng thái nào khác.

Các loại `State s` về cơ bản là chuẩn. Nó bao gồm chính trạng thái và một giá trị. Hãy nhớ rằng trạng thái của máy trạng thái được đại diện bởi một UTxO, có một giá trị và datum

![](img/week07__00019.png)

Với loại trạng thái `s`, và một giao dịch cố gắng tiêu thụ UTxO này với một redeemer `i`,chúng tôi có thể chỉ ra rằng việc chuyển đổi này không được phép bằng cách quay lại `Nothing`. Nếu nó được cho phép, chúng tôi trả về một `tuple`.

Thành phần thứ hai của bộ `tuple` là trạng thái mới (datum và giá trị mới), là UTxO mới ở cùng một địa chỉ, với UTxO đầu tiên đã được sử dụng.

Thành phần đầu tiên của `tuple` chỉ định các ràng buộc bổ sung mà giao dịch thực hiện điều này phải đáp ứng. Cho đến nay, chúng ta chỉ thấy những ràng buộc trong mã off-chain.

Sau đó, chúng ta có một hàm `setFinal` được dự đoán trên trạng thái cho chúng ta biết liệu nó có phải là trạng thái cuối cùng hay không. Các trạng thái cuối cùng đặc biệt ở chỗ kết quả `State` từ hàm `setTransition` phải không có giá trị nào gắn liền với nó và đầu ra không được tạo ra. Máy kết thúc ở đó.

Hàm `smCheck` rất giống với hàm `setTransition`. Nó lấy datum, redeemer và context rồi trả về bool. Nó cung cấp kiểm tra bổ sung mà không thể được biểu diễn bằng `TxConstraints`trong `setTransition`.

Cuối cùng, `smThreadToken` cho phép chúng tôi xác định UTxO đại diện cho trạng thái hiện tại. Điều này nằm ở chỗ chúng ta có nhiều hơn một UTxO đang ngồi tại địa chỉ của máy trạng thái. Nó sử dụng thủ thuật tương tự mà chúng ta đã thấy trước đây là sử dụng NFT có giá trị của UTxO chính xác. Tuy nhiên, bạn có thể luôn quay lại `Nothing` từ  `smThreadToken` và sử dụng một số cơ chế khác để xác định đúng UTxO.

Trò chơi tương tự như ví dụ 1 đã được thực hiện bằng máy trạng thái, trong mô-đun sau.



``` {.haskell}
module Week07.StateMachine
```

Các phần đầu tiên của mã giống nhau - chúng ta có cùng một `Game` và giống nhau `GameChoice`. Thay đổi đầu tiên mà chúng tôi nhận thấy là `GameDatum`.

Chúng tôi đã thêm một phương thức khởi tạo thứ hai để `GameDatum` được gọi `Finished`.Điều này sẽ đại diện cho trạng thái cuối cùng của máy trạng thái. Nó sẽ không tương ứng với UTxO, nhưng chúng ta cần nó để cơ chế máy trạng thái hoạt động.

``` {.haskell}
data GameDatum = GameDatum ByteString (Maybe GameChoice) | Finished
deriving Show
```

Và điều này làm phức tạp hơn một chút cho định nghĩa của bình đẳng.

``` {.haskell}
instance Eq GameDatum where
{-# INLINABLE (==) #-}
GameDatum bs mc == GameDatum bs' mc' = (bs == bs') && (mc == mc')
Finished        == Finished          = True
_               == _                 = False
```

Redeemer giống hệt như trước đây. Các hàm `lovelaces` và
`gameDatum`giống hệt như trước.

ây giờ chúng ta đi đến hàm `transition`, loại tương ứng với`mkGameValidator` mà chúng ta đã sử dụng trong ví dụ trước. Về cơ bản nó là logic cốt lõi.

``` {.haskell}
transition :: Game -> State GameDatum -> GameRedeemer -> Maybe (TxConstraints Void Void, State GameDatum)
```

Hàm `transition` sử dụng `Game`, sau đó là `State GameDatum`,
mà như chúng ta thấy trong định nghĩa của `StateMachine`, bao gồm một cặp `datum` và giá trị. Thứ ba là redeemer,
và cuối cùng trả về `Maybe` trạng thái mới và các ràng buộc đối với giao dịch.

Hãy cùng so sánh hàm `transition` của máy trạng thái(state machine) với hàm `mkGameValidator` của trò chơi thứ nhất.

``` {.haskell}
transition :: Game -> State GameDatum -> GameRedeemer -> Maybe (TxConstraints Void Void, State GameDatum)
transition game s r = case (stateValue s, stateData s, r) of
    (v, GameDatum bs Nothing, Play c)
        | lovelaces v == gStake game         -> Just ( Constraints.mustBeSignedBy (gSecond game)                    <>
                                                       Constraints.mustValidateIn (to $ gPlayDeadline game)
                                                     , State (GameDatum bs $ Just c) (lovelaceValueOf $ 2 ` gStake game)
                                                     )
    (v, GameDatum _ (Just _), Reveal _)
        | lovelaces v == (2 ` gStake game)   -> Just ( Constraints.mustBeSignedBy (gFirst game)                     <>
                                                       Constraints.mustValidateIn (to $ gRevealDeadline game)       <>
                                                       Constraints.mustPayToPubKey (gFirst game) token
                                                     , State Finished mempty
                                                     )
    (v, GameDatum _ Nothing, ClaimFirst)
        | lovelaces v == gStake game         -> Just ( Constraints.mustBeSignedBy (gFirst game)                     <>
                                                       Constraints.mustValidateIn (from $ 1 + gPlayDeadline game)   <>
                                                       Constraints.mustPayToPubKey (gFirst game) token
                                                     , State Finished mempty
                                                     )
    (v, GameDatum _ (Just _), ClaimSecond)
        | lovelaces v == (2 ` gStake game)   -> Just ( Constraints.mustBeSignedBy (gSecond game)                    <>
                                                       Constraints.mustValidateIn (from $ 1 + gRevealDeadline game) <>
                                                       Constraints.mustPayToPubKey (gFirst game) token
                                                     , State Finished mempty
                                                     )
    _                                        -> Nothing
  where
    token :: Value
    token = assetClassValue (gToken game) 1
```

Điều đầu tiên cần lưu ý là, trong hàm `transition`  chúng ta không cần thực hiện kiểm tra  về sự hiện diện của NFT ban đầu. Điều này là do máy trạng thái đảm nhận việc đó, miễn là chúng ta đặt trường cuối cùng của `StateMachine` là lớp tài sản NFT nào đó.

``` {.haskell}
-- we no longer need something like this for our state machine version
traceIfFalse "token missing from input" (assetClassValueOf (txOutValue ownInput) (gToken game) == 1) &&
```

Hãy tự nhắc lại cách chúng ta đã xác định trường hợp đầu tiên trong đó người chơi đầu tiên đã di chuyển, người chơi thứ hai chưa di chuyển và bây giờ người chơi thứ hai muốn di chuyển. Chúng tôi đã có sáu điều kiện.

``` {.haskell}
(GameDatum bs Nothing, Play c) ->
    traceIfFalse "not signed by second player"   (txSignedBy info (gSecond game))                                   &&
    traceIfFalse "first player's stake missing"  (lovelaces (txOutValue ownInput) == gStake game)                   &&
    traceIfFalse "second player's stake missing" (lovelaces (txOutValue ownOutput) == (2 ` gStake game))            &&
    traceIfFalse "wrong output datum"            (outputDatum == GameDatum bs (Just c))                             &&
    traceIfFalse "missed deadline"               (to (gPlayDeadline game) `contains` txInfoValidRange info)         &&
    traceIfFalse "token missing from output"     (assetClassValueOf (txOutValue ownOutput) (gToken game) == 1)    
```

Hãy xem các điều kiện này được phản ánh như thế nào trong phiên bản máy trạng thái.

``` {.haskell}
transition game s r = case (stateValue s, stateData s, r) of
    (v, GameDatum bs Nothing, Play c)
        | lovelaces v == gStake game -> Just ( Constraints.mustBeSignedBy (gSecond game)                    <>
                                               Constraints.mustValidateIn (to $ gPlayDeadline game)
                                             , State (GameDatum bs $ Just c) (lovelaceValueOf $ 2 ` gStake game)
                                             )    
```

Chúng tôi có thể truy cập các thành phần giá trị và datum của tham số `State` của mình bằng cách sử dụng `stateValue` và `stateData`, điều này mang lại cho chúng tôi bộ ba trạng thái cho `case` của giá trị, datum và redeemer.

Trường hợp phù hợp của chúng tôi bây giờ là

``` {.haskell}
(v, GameDatum bs Nothing, Play c)
```

Đầu tiên, chúng tôi kiểm tra xem số lượng lovelace trong `valuematches` có khớp với tiền đặt cược của trò chơi hay không, đó là điều kiện thứ hai trong mã của chúng tôi cho trường hợp này từ ví dụ 1. Nếu điều kiện này được thỏa mãn, chúng tôi trả về một cặp`Just` . Thành phần đầu tiên của cặp này là các ràng buộc đối với giao dịch (được xây dựng từ mô-đun `Constraints`  mà chúng ta biết từ mã off-chain). Hai ràng buộc bao gồm phần này của cặp tương ứng với điều kiện đầu tiên và điều kiện thứ năm trong mã cũ của chúng tôi.

Thành phần thứ hai của cặp là trạng thái mới - UTxO kết quả - một lần nữa được cung cấp bởi datum và value. Vì vậy, ở đây chúng tôi chỉ định rằng dữ liệu của UTxO mới sẽ chứa cả lựa chọn của người chơi và giá trị của UTxO sẽ chứa cả tiền cược của cả hai người chơi. Chúng tôi để NFT không có trong tình trạng này, mặc dù nó sẽ hiện diện trong UTxO, và điều đó một lần nữa là do máy trạng thái hoàn toàn đảm nhận việc này cho chúng tôi.

Thành phần thứ hai này tương ứng với các điều kiện thứ ba và thứ tư từ mã cũ của chúng tôi.

Điều kiện thứ sáu từ mã cũ của chúng tôi liên quan đến NFT, như chúng tôi đã thấy, chúng tôi không cần phải lo lắng.

Bây giờ chúng ta hãy so sánh mã từ trường hợp thú vị thứ hai, trong đó người chơi thứ hai đã chơi và người chơi đầu tiên thấy rằng họ đã thắng.

``` {.haskell}
-- old version
(GameDatum bs (Just c), Reveal nonce) ->
    traceIfFalse "not signed by first player"    (txSignedBy info (gFirst game))                                    &&
    traceIfFalse "commit mismatch"               (checkNonce bs nonce c)                                            &&
    traceIfFalse "missed deadline"               (to (gRevealDeadline game) `contains` txInfoValidRange info)       &&
    traceIfFalse "wrong stake"                   (lovelaces (txOutValue ownInput) == (2 ` gStake game))             &&
    traceIfFalse "NFT must go to first player"   nftToFirst    
```

``` {.haskell}
-- new version
(v, GameDatum _ (Just _), Reveal _)
| lovelaces v == (2 ` gStake game)   -> Just ( Constraints.mustBeSignedBy (gFirst game)                     <>
                                               Constraints.mustValidateIn (to $ gRevealDeadline game)       <>
                                               Constraints.mustPayToPubKey (gFirst game) token
                                             , State Finished mempty
                                             )    
```

Một lần nữa, chúng tôi thấy rằng điều đầu tiên chúng tôi làm là kiểm tra xem số tiền đặt cược chính xác có tồn tại hay không, và nếu có, chúng tôi lại trả về `Just`. Vì vậy, điều này sẽ quan tâm đến điều kiện thứ tư từ mã cũ. Điều kiện một từ mã cũ được đảm bảo bởi `Constraints.mustBeSignedBy` ràng buộc trong mã mới.

Lưu ý rằng chúng tôi không kiểm tra nonce trong mã mới. Lý do cho điều này là việc kiểm tra này không thể được thể hiện dưới dạng một ràng buộc. Và đây chính xác là hàm `smCheck` dùng để làm gì, và chúng ta sẽ xem nó được sử dụng như thế nào trong giây lát.

Chúng tôi cũng có thể so khớp kiểm tra thời hạn từ mỗi mẫu mã, với nó được xác định bằng cách sử dụng `Constraints.mustValidateIn` trong mã mới.

Trong mã cũ, khi trò chơi kết thúc, chúng tôi trả lại NFT cho người chơi đầu tiên. Trong mã mới, chúng tôi cũng đảm bảo NFT quay trở lại người chơi đầu tiên, nhưng chúng tôi cũng chỉ định trạng thái `Finished` và nói rằng không còn tiền trong hợp đồng đang sử dụng `mempty`.
Bây giờ chúng ta so sánh mã cũ và mã mới cho trường hợp thứ ba trong đó người chơi đầu tiên đòi lại tiền đặt cược của họ khi người chơi thứ hai không chơi trước thời hạn.

``` {.haskell}
-- old version
(GameDatum _ Nothing, ClaimFirst) ->
    traceIfFalse "not signed by first player"    (txSignedBy info (gFirst game))                                    &&
    traceIfFalse "too early"                     (from (1 + gPlayDeadline game) `contains` txInfoValidRange info)   &&
    traceIfFalse "first player's stake missing"  (lovelaces (txOutValue ownInput) == gStake game)                   &&
    traceIfFalse "NFT must go to first player"   nftToFirst    
```

``` {.haskell}
-- new version

(v, GameDatum _ Nothing, ClaimFirst)
| lovelaces v == gStake game         -> Just ( Constraints.mustBeSignedBy (gFirst game)                     <>
                                               Constraints.mustValidateIn (from $ 1 + gPlayDeadline game)   <>
                                               Constraints.mustPayToPubKey (gFirst game) token
                                             , State Finished mempty
                                             )
```

These two match up fairly easily, with the lovelaces being the condition
on the left in the new code, and the remaining conditions on the right
in the new code matching up with corresponding conditions in the old
code. Again we add the `Finished` state in the new code.

The last case, where the second player has played and the first player
does not reveal by the deadline, probably because they lost.

Hai điều này khớp với nhau khá dễ dàng, với các giao diện là điều kiện ở bên trái trong mã mới và các điều kiện còn lại ở bên phải trong mã mới khớp với các điều kiện tương ứng trong mã cũ. Một lần nữa chúng tôi thêm trạng thái `Finished`  trong mã mới.

Trường hợp cuối cùng, trong đó người chơi thứ hai đã chơi và người chơi đầu tiên không tiết lộ trước thời hạn, có thể là do họ đã thua.

``` {.haskell}
(GameDatum _ (Just _), ClaimSecond) ->
    traceIfFalse "not signed by second player"   (txSignedBy info (gSecond game))                                   &&
    traceIfFalse "too early"                     (from (1 + gRevealDeadline game) `contains` txInfoValidRange info) &&
    traceIfFalse "wrong stake"                   (lovelaces (txOutValue ownInput) == (2 ` gStake game))             &&
    traceIfFalse "NFT must go to first player"   nftToFirst
```

``` {.haskell}
(v, GameDatum _ (Just _), ClaimSecond)
    | lovelaces v == (2 ` gStake game)   -> Just ( Constraints.mustBeSignedBy (gSecond game)                    <>
                                                   Constraints.mustValidateIn (from $ 1 + gRevealDeadline game) <>
                                                   Constraints.mustPayToPubKey (gFirst game) token
                                                 , State Finished mempty
                                                 )
```

Các điều kiện trong mã cũ và mã mới cho trường hợp cuối cùng này có thể được làm theo cách rất giống với các điều kiện của trường hợp thứ ba.

Tất cả các trạng thái khác có chuyển đổi tùy ý đều không hợp lệ và chúng tôi chỉ ra điều đó bằng cách trả lại`Nothing`.

``` {.haskell}
_ -> Nothing
```

Cuối cùng, chúng tôi thấy rằng mặc dù bản thân các điều kiện trong phiên bản mới có thể không ngắn hơn nhiều so với những điều kiện trong phiên bản cũ, chúng tôi cũng thấy rằng chúng tôi chỉ cần một chức năng trợ giúp.

``` {.haskell}
token :: Value
token = assetClassValue (gToken game) 1
```

Nhưng chúng tôi vẫn chưa hoàn thành việc xác định máy trạng thái . Có một số trường khác trong hồ sơ `StateMachine` .

Một là `smFinal`, cho phép chúng tôi xác định trạng thái cuối cùng là gì. Đối với chúng tôi, nó chỉ là trạng thái `Finished`. Chúng tôi xác định một chức năng trợ giúp mà chúng tôi có thể sử dụng cho trường này.

``` {.haskell}
final :: GameDatum -> Bool
final Finished = True
final _        = False
```

Another field to define is `smCheck`. Recall that this is where we can
put conditions that cannot be expressed as `Constraint`s. So this is
where we can put our nonce check.

We define another helper function `check`, with two auxiliary
`ByteString` parameters to represent the zero and one choices, for
reasons that we have seen before. We also pass it the datum, redeemer
and context, and it will return us a boolean.

We don\'t need the script context, but we need the datum to get the
second player\'s choice (which the first player is claiming is the same
as theirs), and the redeemer to get the nonce that the first player is
claiming to have used. We can then check that the hash of the choice and
the nonce match the original hash from the datum.

Một trường khác để xác định là `smCheck`. Nhớ lại rằng đây là nơi chúng ta có thể đặt các điều kiện không thể được biểu thị dưới dạng `Constraints`. Vì vậy, đây là nơi chúng tôi có thể đặt kiểm tra nonce của mình.

Chúng tôi xác định một hàm trợ giúp khác `check`, với hai tham số phụ `ByteString`  để đại diện cho các lựa chọn "0" và "1", vì những lý do mà chúng tôi đã thấy trước đây. Chúng tôi cũng chuyển cho nó datum, redeemer và context, và nó sẽ trả về cho chúng tôi một boolean.

Chúng tôi không cần tập lệnh context, nhưng chúng tôi cần datum để có được lựa chọn của người chơi thứ hai (mà người chơi đầu tiên yêu cầu giống với của họ) và redeemer để có được thông tin mà người chơi đầu tiên tuyên bố đã sử dụng . Sau đó, chúng tôi có thể kiểm tra xem hash của lựa chọn và nonce khớp với hash ban đầu từ datum.

``` {.haskell}
check :: ByteString -> ByteString -> GameDatum -> GameRedeemer -> ScriptContext -> Bool
check bsZero' bsOne' (GameDatum bs (Just c)) (Reveal nonce) _ =
    sha2_256 (nonce `concatenate` if c == Zero then bsZero' else bsOne') == bs
```

Trong tất cả các tình huống khác, những trường hợp không kiểm tra nonce được tiết lộ, chúng tôi không cần thực hiện bất kỳ kiểm tra nào.

``` {.haskell}
check _ _ _ _ _ = True
```

Bây giờ chúng ta có thể xác định máy trạng thái của mình.

``` {.haskell}
gameStateMachine :: Game -> ByteString -> ByteString -> StateMachine GameDatum GameRedeemer
gameStateMachine game bsZero' bsOne' = StateMachine
    { smTransition  = transition game
    , smFinal       = final
    , smCheck       = check bsZero' bsOne'
    , smThreadToken = Just $ gToken game
    }
```

Our old `mkGameValidator` can now be replaced by using machinery
provided by the state machine. There is a `mkValidator` function which
will take our state machine, generated by the `gameStateMachine`
function and turn it into a validator with exactly the same type as we
had in the old code.
Cái cũ của chúng tôi `mkGameValidator` bây giờ có thể được thay thế bằng cách sử dụng state  do statemachine cung cấp. Có một  hàm `mkValidator` sẽ lấy máy trạng thái của chúng ta, được tạo bởi hàm `gameStateMachine`  và biến nó thành một trình xác thực với cùng kiểu như chúng ta đã có trong mã cũ.

``` {.haskell}
mkGameValidator :: Game -> ByteString -> ByteString -> GameDatum -> GameRedeemer -> ScriptContext -> Bool
mkGameValidator game bsZero' bsOne' = mkValidator $ gameStateMachine game bsZero' bsOne'
```

Trong mã cũ, chúng tôi có cơ chế này để gói dữ liệu và quy đổi thành một lọai `Gaming` .

``` {.haskell}
-- old code
data Gaming
instance Scripts.ScriptType Gaming where
    type instance DatumType Gaming = GameDatum
    type instance RedeemerType Gaming = GameRedeemer
```

Nhưng bây giờ chúng ta có thể định nghĩa điều này là.

``` {.haskell}
type Gaming = StateMachine GameDatum GameRedeemer
```

Chúng tôi cũng cung cấp một phiên bản thay thế của `gameStateMachine`, phiên bản này không sử dụng hai tham số phụ trợ `ByteString`. Điều này sẽ không hoạt động đối với mã on-chain, nhưng đối với mã off-chain thì nó hoạt động tốt.

``` {.haskell}
gameStateMachine' :: Game -> StateMachine GameDatum GameRedeemer
gameStateMachine' game = gameStateMachine game bsZero bsOne
```

We have the same boilerplate as before for `gameInst`, `gameValidator`
and `gameAddress`, which we won\'t copy again here.

The function `gameClient` is new. It is a `StateMachineClient`, and this
is what we need to interact with our state machine from our wallet in
the `Contract` monad.

Chúng tôi có cùng một bảng (boilerplate) soạn sẵn như trước đây `gameInst`, `gameValidator` và `gameAddress`, chúng tôi sẽ không sao chép lại ở đây.

Chức năng `gameClient` là mới. Đó là một `StateMachineClient`, và đây là những gì chúng ta cần để tương tác với máy trạng thái của mình từ ví của chúng ta trong monad `Contract`.

![](img/week07__00018.png)


Như bạn có thể thấy từ định nghĩa, nó chứa một `StateMachineInstance`. Và `StateMachineInstance` lần lượt chỉ là một `StateMachine` và phiên bản script tương ứng.

![](img/week07__00020.png)

Sau khi chúng ta có điều đó, `StateMachineClient` vẫn cần phải được đóng gói với một cái gọi là `chooser`, đó là cơ chế, từ mã off-chain, để tìm UTxO đại diện cho máy trạng thái của chúng ta. Nói chung, sẽ có một danh sách các UTxO tại địa chỉ của máy trạng thái và `scChooser` là một hàm chỉ định cái nào sẽ chọn.

Chúng tôi không phải lo lắng về điều đó, bởi vì chúng tôi đang sử dụng phương pháp NFT, có nghĩa là việc lựa chọn sẽ được chúng tôi tự động xử lý.

Có một hàm `mkStateMachineClient` nhận `StateMachineInstance` và trả về `StateMachineClient`, và hàm này sử dụng cài đặt mặc định của trình `chooser`. Và điều này sẽ làm đúng và chọn UTxO có chứa NFT của chúng tôi.

``` {.haskell}
gameClient :: Game -> StateMachineClient GameDatum GameRedeemer
gameClient game = mkStateMachineClient $ StateMachineInstance (gameStateMachine' game) (gameInst game)
```

Bây giờ, `gameClient` có thể được sử dụng để tương tác với máy trạng thái từ mã off-chain.

`FirstParams` hoàn toàn giống nhau, vì vậy chúng tôi sẽ không lặp lại ở đây.

Có một phiền toái nhỏ. Các hợp đồng máy trạng thái được cung cấp bởi mô-đun máy trạng thái có một ràng buộc cụ thể về loại lỗi. Một loại lỗi hoạt động là `SMContractError`.

Nhưng chúng tôi muốn làm những gì chúng tôi đã làm trong các bài giảng trước và luôn sử dụng Text làm loại lỗi. Để đạt được điều này, chúng tôi sẽ sử dụng một hàm trợ giúp để chuyển đổi kiểu `SMContractError`  thành một kiểu `Text` . Nhớ lại điều đó `show` sẽ trả về `String` và `pack` sẽ chuyển `String` thành `Text`.

``` {.haskell}
mapError' :: Contract w s SMContractError a -> Contract w s Text a
mapError' = mapError $ pack . show
```

Vì vậy, giờ đây hợp đồng cầu thủ đầu tiên trở nên ngắn và gọn hơn rất nhiều.

Khởi đầu cũng vậy.

``` {.haskell}
firstGame :: forall w s. HasBlockchainActions s => FirstParams -> Contract w s Text ()
firstGame fp = do
    pkh <- pubKeyHash <$> Contract.ownPubKey
    let game   = Game
            { gFirst          = pkh
            , gSecond         = fpSecond fp
            , gStake          = fpStake fp
            , gPlayDeadline   = fpPlayDeadline fp
            , gRevealDeadline = fpRevealDeadline fp
            , gToken          = AssetClass (fpCurrency fp, fpTokenName fp)
            }
```

Bây giờ, chúng tôi đưa khách hàng cùng với một số giá trị mà chúng tôi nhận được như trước đây.

``` {.haskell}
client = gameClient game
v      = lovelaceValueOf (fpStake fp)
c      = fpChoice fp
bs     = sha2_256 $ fpNonce fp `concatenate` if c == Zero then bsZero else bsOne
```

Có một chức năng `runIntialise` khởi động máy trạng thái và tạo UTxO tại địa chỉ máy trạng thái. Nó nhận máy khách làm đối số đầu tiên và sau đó nó cần dữ liệu ban đầu và giá trị ban đầu cho UTxO ở địa chỉ đó. Và nó cũng sẽ tự động đặt NFT ở đó.

``` {.Haskell}
void $ mapError' $ runInitialise client (GameDatum bs Nothing) v
logInfo @String $ "made first move: " ++ show (fpChoice fp)
```

Bây giờ, máy trạng thái đã được thiết lập và người chơi đầu tiên đã di chuyển.

Chúng tôi chờ đợi cho đến khi thời hạn chơi.

``` {.haskell}
void $ awaitSlot $ 1 + fpPlayDeadline fp
```

Trong ví dụ đầu tiên của chúng tôi, chúng tôi đã xác định một hàm trợ giúp `findGameOutput` để lấy UTxO, nhưng điều này hiện có thể được thực hiện theo cách đơn giản hơn bằng cách sử dụng `getOnChainState`.

![](img/week07__00021.png)

Hàm `getOnChainState` sẽ trả về `Just OnChainState` nếu nó tìm thấy máy trạng thái hoặc `Nothing` nếu nó không tìm thấy nó.

![](img/week07__00022.png)

Vậy là `OnChainState` là gì? Nó là một bộ (tuple) bao gồm  `TypedScriptTxOut` và `TypedScriptTxOutRef`. Tương tự như
`utxoAt`, đó là map `TxOutRefs` đến `TxOuts`. Điều này tương tự ở chỗ nó là đầu ra và tham chiếu của nó, nhưng đó là phiên bản`Typed`
 mà chúng ta chưa từng thấy trước đây.

Tất cả những gì làm được là gói những gì chúng ta biết từ trước `TxOut`, nhưng ngoài ra, nó cung cấp datum. Bạn sẽ nhớ rằng trong mã off-chain của chúng tôi, chúng tôi luôn phải xáo trộn và viết các hàm trợ giúp để truy cập vào datum khi chúng tôi đã tìm thấy UTxO. Chúng tôi đã phải tra cứu mã băm datum, có thể không thành công, v.v. `TypedScriptTxOut` ẩn tất cả điều này từ chúng tôi.

![](img/week07__00023.png)

``` {.haskell}
m <- mapError' $ getOnChainState client
```

Như trước đây, chúng ta không bao giờ nên được `Nothing` cho `m`.

> case m of
>
> :   Nothing -> throwError "game output not found"

Bây giờ, chúng tôi chỉ quan tâm đến tham số `TypedScriptTxOut`  mà chúng tôi gán `o` và sử dụng nó để tra cứu datum bằng cách sử dụng `tyTxOutData`.

``` {.haskell}
Just ((o, _), _) -> case tyTxOutData o of
```

Như trước đây chúng ta có hai trường hợp. Người chơi thứ hai đã di chuyển hoặc họ chưa di chuyển.

Nếu họ không di chuyển, chúng tôi phải đòi lại. Trước đó, chúng tôi đã có rất nhiều mã để thiết lập các tra cứu và ràng buộc mà chúng tôi cần. Làm thế nào chúng ta chỉ cần một dòng, và chức năng quan trọng ở đây là `runStep`, tạo và gửi một giao dịch sẽ chuyển đổi máy trạng thái.

Nó có vai trò là đầu vào cho khách hàng và redeemer. Sau đó, nó trả về `TransitionResult`, mà chúng tôi không sử dụng trong ví dụ này, nhưng về cơ bản mã hóa xem nó thành công hay thất bại.

![](img/week07__00024.png)

Which means, that we can use `runStep` with just the client and redeemer
to replace all the lookups, the constraints, the transaction submissions
and the waiting.

The way it works it that the `transition` function is that all the
necessary constraints have been defined as part of the state machine.
Điều đó có nghĩa là chúng tôi có thể chỉ sử dụng `runStep`  với khách hàng (client) và redeemer để thay thế tất cả các tra cứu, các ràng buộc, gửi giao dịch và chờ đợi.

Cách nó hoạt động mà hàm `transition`  là tất cả các ràng buộc cần thiết đã được xác định như một phần của máy trạng thái.

``` {.haskell}
GameDatum _ Nothing -> do
    logInfo @String "second player did not play"
    void $ mapError' $ runStep client ClaimFirst
    logInfo @String "first player reclaimed stake"
```

The second case is that the first player did reveal, and we again use
the `runStep` function to transition the state machine.
Trường hợp thứ hai là người chơi đầu tiên đã tiết lộ, và chúng tôi lại sử dụng hàm `runStep`  để giao dịch máy trạng thái .

``` {.haskell}
GameDatum _ (Just c') | c' == c -> do
    logInfo @String "second player played and lost"
    void $ mapError' $ runStep client $ Reveal $ fpNonce fp
    logInfo @String "first player revealed and won"
```

Và trong tất cả các tình huống khác, người chơi thứ hai sẽ thắng.

``` {.haskell}
_ -> logInfo @String "second player played and won"
```

Hợp đồng của người chơi thứ hai rất giống nhau, và đơn giản như vậy.

``` {.haskell}
secondGame :: forall w s. HasBlockchainActions s => SecondParams -> Contract w s Text ()
secondGame sp = do
    pkh <- pubKeyHash <$> Contract.ownPubKey
    let game   = Game
            { gFirst          = spFirst sp
            , gSecond         = pkh
            , gStake          = spStake sp
            , gPlayDeadline   = spPlayDeadline sp
            , gRevealDeadline = spRevealDeadline sp
            , gToken          = AssetClass (spCurrency sp, spTokenName sp)
            }
        client = gameClient game
    m <- mapError' $ getOnChainState client
    case m of
        Nothing          -> logInfo @String "no running game found"
        Just ((o, _), _) -> case tyTxOutData o of
```

Trường hợp duy nhất chúng ta cần giải quyết là chúng ta chưa chơi ở đâu và nên chơi. Và, để chơi, chúng ta lại sử dụng hàm `runStep` 

``` {.haskell}
GameDatum _ Nothing -> do
    logInfo @String "running game found"
    void $ mapError' $ runStep client $ Play $ spChoice sp
    logInfo @String $ "made second move: " ++ show (spChoice sp)
```

Sau đó, chúng tôi đợi cho đến khi thời hạn tiết lộ trôi qua, sau đó nhận trạng thái mới.

``` {.haskell}
void $ awaitSlot $ 1 + spRevealDeadline sp
m' <- mapError' $ getOnChainState client
case m' of
```

Nếu không có trạng thái nào, người chơi đầu tiên đã thắng và yêu cầu tiền thắng của họ.

``` {.haskell}
Nothing -> logInfo @String "first player won"
```

Nếu không, chúng tôi đã thắng và chúng tôi yêu cầu tiền thắng của mình bằng cách sử dụng chức năng `runStep`  này, trao cho   `ClaimSecond` .

``` {.haskell}
Just _  -> do
    logInfo @String "first player didn't reveal"
    void $ mapError' $ runStep client ClaimSecond
    logInfo @String "second player won"
```

And a final catch all.
Và cuối cùng bắt tất cả.

``` {.haskell}
_ -> throwError "unexpected datum"
```

Điều đó kết thúc phiên bản máy trạng thái của mã.

Điều đặc biệt hay về cách tiếp cận này là chúng ta không cần phải lặp lại logic nữa. Chúng ta đã thảo luận về cách sử dụng mã ngoài chuỗi để xây dựng và mã trên chuỗi được sử dụng để kiểm tra. Khi chúng ta sử dụng phương pháp tiếp cận máy trạng thái, chúng ta xác định logic có thể được sử dụng cho cả hai, vì vậy chúng ta không cần phải viết nó một cách rõ ràng cho phần off-chain và on-chain của mã.

Để kiểm tra điều này, có một mô-đun  `Week07.TestStateMachine` trong code ví dụ. Nó hoàn toàn giống với kiểm tra đối với mã cũ, chỉ có một ngoại lệ và đó chỉ là thay vì nhập `Week07.EvenOdd`, nó sẽ nhập `Week07.StateMachine`. Đây là một cách làm nhanh chóng  - tất nhiên, chúng tôi có thể đã viết một tập lệnh được tham số hóa trên hợp đồng mà chúng tôi muốn sử dụng.

Nếu bạn tải `Week07.TestStateMachine` trong REPL và chạy test, bạn sẽ nhận được kết quả chính xác như trước đó.

Kết luận
----------

Máy trạng thái không phải lúc nào cũng thích hợp, nhưng khi có, bạn chắc chắn nên sử dụng chúng. Chúng làm giảm đáng kể số lượng mã bạn phải viết và cũng giảm các nguồn lỗi.

Cơ chế máy trạng thái tự động đảm bảo rằng bạn có mã on-chain và mã off-chain đang hoạt động chính xác cùng nhau. Từ trước đến nay, chúng tôi luôn phải tự mình lo liệu điều đó.
