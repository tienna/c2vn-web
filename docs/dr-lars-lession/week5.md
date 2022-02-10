Week 05 - Native Tokens
=======================

Ghi chú

Đây là phiên bản viết của [Bài giảng số 5](https://youtu.be/6VbhY162GQA).

<iframe width="560" height="315" src="https://www.youtube.com/embed/6VbhY162GQA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Trong bài giảng này, chúng ta tìm hiểu về token gốc, `policy` khai thác và NFT.

Những ghi chú này sử dụng Plutus cam kết: 0c3c310cab61dbff8cbc1998a3678b367be6815a

Tổng quat
--------

Chúng ta sẽ nói về cách Plutus hỗ trợ các token gốc và cách xác định các token gốc có thể được đúc và đốt trong những điều kiện nào. Nhưng trước khi đạt được điều đó, hãy cùng khám phá xem `value` Cardano có ý nghĩa gì.

Khi chúng ta nói về mô hình (E) UTxO, chúng ta đã biết rằng mỗi UTxO (giao dịch chưa sử dụng) đều có một địa chỉ và một giá trị. Và chúng tôi thấy rằng, do được mở rộng sang mô hình (E) UTxO, mỗi UTxO cũng có một `Datum`. Chúng ta đã thấy các ví dụ về UTxO như vậy trong các bài giảng trước.

Trong hầu hết các ví dụ mà chúng ta đã thấy cho đến nay, giá trị chỉ đơn giản là một số lượng Ada, được gọi là số lovelace. Ngoại lệ là ví dụ đầu tiên từ bài giảng 1, cụ thể là ví dụ `English Auction` . Trong ví dụ đó, chúng tôi đã bán đấu giá một NFT. Tuy nhiên, NFT chỉ được tạo ra từ hư không trong sân chơi.

Tuy nhiên, trong chuỗi khối Cardano thực, ban đầu chỉ có Ada, không có token gốc nào khác. Vì vậy, bạn phải làm gì đó để tạo các token gốc mới hoặc ghi các mã hiện có. Trong bài giảng này, chúng ta sẽ xem cách thực hiện điều đó.

Nhưng trước hết hãy nói về các giá trị `Value` trên.

Value
-----

Các loại liên quan được xác định trong gói `plutus-ledger-api`. Các mô-đun quan tâm là

``` {.haskell}
module Plutus.V1.Ledger.Value
module Plutus.V1.Ledger.Ada
```

### Kiểu Value

`Value` được định nghĩa là một `map` từ `CurrencySymbol` tới maps. từ
`TokenName` tới `Integers`, nghe có vẻ hơi kỳ cục và phức tạp.

``` {.haskell}
newtype Value = Value { getValue :: Map.Map CurrencySymbol (Map.Map TokenName Integer) }
    deriving stock (Generic)
    deriving anyclass (ToJSON, FromJSON, Hashable, NFData)
    deriving newtype (Serialise, PlutusTx.IsData)
    deriving Pretty via (PrettyShow Value)
```

Điều đầu tiên cần lưu ý là mỗi token gốc, bao gồm cả Ada, được xác định bằng hai phần dữ liệu -  `CurrencySymbol` và
`TokenName`.

Một `CurrencySymbol` là `newtype` với kiểu `ByteString`.

``` {.haskell}
newtype CurrencySymbol = CurrencySymbol { unCurrencySymbol :: Builtins.ByteString }
    deriving (IsString, Show, Serialise, Pretty) via LedgerBytes
    deriving stock (Generic)
    deriving newtype (Haskell.Eq, Haskell.Ord, Eq, Ord, PlutusTx.IsData)
    deriving anyclass (Hashable, ToJSONKey, FromJSONKey,  NFData)
```

Và điều này cũng đúng với `TokenName`.

``` {.haskell}
newtype TokenName = TokenName { unTokenName :: Builtins.ByteString }
    deriving (Serialise) via LedgerBytes
    deriving stock (Generic)
    deriving newtype (Haskell.Eq, Haskell.Ord, Eq, Ord, PlutusTx.IsData)
    deriving anyclass (Hashable, NFData)
    deriving Pretty via (PrettyShow TokenName)    
```

Chúng ta có hai biến `ByteStrings` định nghĩa là coin, hoặc nó còn được gọi là `asset class`.

``` {.haskell}
assetClass :: CurrencySymbol -> TokenName -> AssetClass
assetClass s t = AssetClass (s, t)
```

Ada là một lớp tài sản và các Token gốc tùy chỉnh sẽ là các lớp tài sản khác.

Một `Value` chỉ đơn giản cho thấy có bao nhiêu đơn vị có cho một loại tài sản nhất định.

Hãy bắt đầu REPL và nhập hai mô-đun có liên quan.

``` {.haskell}
cabal repl
Prelude Week05.Free> import Plutus.V1.Ledger.Ada
Prelude Plutus.V1.Ledger.Ada Week05.Free> import Plutus.V1.Ledger.Value 
Prelude Plutus.V1.Ledger.Ada Plutus.V1.Ledger.Value Week05.Free> 
Prelude Plutus.V1.Ledger.Ada Plutus.V1.Ledger.Value Week05.Free> :set -XOverloadedStrings
```

Ghi chú:

Chúng tôi cũng đã kích hoạt tiện ích mở rộng `OverloadedStrings` . Chúng ta có thể đưa vào dưới dạng chuỗi ký tự `ByteString` .


Bây giờ chúng ta hãy xem xét một số giá trị. Hãy bắt đầu với các giá trị lovelace. Tương tự `Ledger.Ada` module này được gọi là`adaSymbol`.

``` {.haskell}
Prelude Plutus.V1.Ledger.Ada Plutus.V1.Ledger.Value Week05.Free> :t adaSymbol
adaSymbol :: CurrencySymbol
```

Điều này cho chúng ta ký hiệu tiền tệ của loại tài sản Ada, chỉ là  trống `ByteString`. Tương tự, có một hàm `adaToken`, sẽ cung cấp cho chúng ta tên token.

``` {.haskell}
Prelude Plutus.V1.Ledger.Ada Plutus.V1.Ledger.Value Week05.Free> :t adaToken
adaToken :: TokenName
```

Một lần nữa, đây cũng là trống `ByteString`.

Chúng ta đã thấy trước đây trong các ví dụ về cách tạo một biểu tượng có `Value` là lovelace. Hàm  `lovelaceValueOf` nay với giá trị `Integer`, chúng ta đưa vào `Value`.

``` {.haskell}
Prelude Plutus.V1.Ledger.Ada Plutus.V1.Ledger.Value Week05.Free> :t lovelaceValueOf
lovelaceValueOf :: Integer -> Value
```

Ví dụ ta đưa vào 123 lovelace, Chúng ta có thể làm:

``` {.haskell}
Prelude Plutus.V1.Ledger.Ada Plutus.V1.Ledger.Value Week05.Free> lovelaceValueOf 123
Value (Map [(,Map [("",123)])])
```

Bạn sẽ luôn sử dụng một hàm trợ giúp chẳng hạn như `lovelaceValueOf` để xây dựng các map giá trị - bạn sẽ không bao giờ cần phải tạo một `map` trực tiếp.

Ở đây chúng ta xem xét `map`. `Map` bên ngoài của các ký hiệu tiền tệ có một khóa, là ký hiệu trống cho Ada và `map` bên trong tên token có một khóa, chuỗi trống cho Ada và giá trị là 123.

Một điều chúng ta có thể làm với các giá trị là kết hợp chúng. Các lớp `Value` là thể hiện của `Monoid`, vì chúng ta có thể sử dụng `mappend`, nó có thể viết `<>`, xuất phát từ  super class của `Monoid` gọi là `Semigroup`.

``` {.haskell}
Prelude Plutus.V1.Ledger.Ada Plutus.V1.Ledger.Value Week05.Free> lovelaceValueOf 123 <> lovelaceValueOf 10
Value (Map [(,Map [("",133)])])
```

Vì vậy, làm thế nào để chúng ta tạo ra `Value` bao gồm tokens gốc?

Có một chức năng rất hữu ích được gọi là `singleton`.

``` {.haskell}
Prelude Plutus.V1.Ledger.Ada Plutus.V1.Ledger.Value Week05.Free> :t singleton
singleton :: CurrencySymbol -> TokenName -> Integer -> Value
```

Điều này sẽ tạo ra một  `Value` cho token được chỉ định bởi `CurrencySymbol`
và `TokenName`, và cho một số tiền nhất định `Integer`.

``` {.haskell}
Week05.Free> singleton "a8ff" "ABC" 7
Value (Map [(a8ff,Map [("ABC",7)])])
```

Đối số đầu tiền là "a8ff" cho `CurrencySymbol` là chuỗi ký tự mã hexa value, là lý ro cho nó rõ ràng hơn. Đối số thứ 2 là "ABC" cho `TokenName` có thể là chuỗi ký tự tùy ý.

Và, chúng ta có thể kết hợp, như trước đây toán tử `mappend`. Bây giờ chúng ta có thể tạo một `map` thú vị hơn.

``` {.haskell}
Week05.Free> singleton "a8ff" "ABC" 7 <> lovelaceValueOf 42 <> singleton "a8ff" "XYZ" 100
Value (Map [(,Map [("",42)]),(a8ff,Map [("ABC",7),("XYZ",100)])])
```

Bây giờ, chúng ta thấy một bản đồ đại diện cho 42 lovelace cũng như hai token `ABC` và `XYZ` cả hai đều thuộc về `CurrencySymbol` "af88", và mỗi mã có số nguyên tương ứng.

Hãy đặt tên cho giá trị này:

``` {.haskell}
Week05.Free> let v = singleton "a8ff" "ABC" 7 <> lovelaceValueOf 42 <> singleton "a8ff" "XYZ" 100
Week05.Free> v
Value (Map [(,Map [("",42)]),(a8ff,Map [("ABC",7),("XYZ",100)])])
```

Một chức năng hữu ích khác là `valueOf` cho phép chúng tôi lấy giá trị của một ký hiệu tiền tệ và tên token nhất định.

``` {.haskell}
Week05.Free> :t valueOf
valueOf :: Value -> CurrencySymbol -> TokenName -> Integer

Week05.Free> valueOf v "a8ff" "XYZ"
100    

Week05.Free> valueOf v "a8ff" "ABC"
7

Week05.Free> valueOf v "a8ff" "abc"
0
```

Một chức năng hữu ích là `flattenValue`. Như tên cho thấy, nó làm phẳng bản đồ của các bản đồ thành một danh sách phẳng gồm các bộ ba.

> ``` {.haskell}
> Week05.Free> :t flattenValue
> flattenValue :: Value -> [(CurrencySymbol, TokenName, Integer)]
>
> Week05.Free> flattenValue v
> [(a8ff,"ABC",7),(a8ff,"XYZ",100),(,"",42)]
> ```

Chính sách đúc tiền (Minting Policies)
----------------

Bây giờ câu hỏi là tại sao? Tại sao chúng ta cần cả biểu tượng tiền tệ và tên token? Tại sao chúng ta không chỉ sử dụng một mã định danh cho một loại tài sản? Và tại sao ký hiệu tiền tệ (currency symbol) phải ở dạng chữ số thập lục phân?

Đây là nơi mà cái được gọi là `policy` đúc tiền xuất hiện.

Quy tắc chung, một giao dịch không thể tạo hoặc xóa token. Bất kỳ cái gì có vào cũng có ra, trừ đi phí. Luôn luôn có một số lovelace phải được trả trong mỗi giao dịch. Phí phụ thuộc vào quy mô của giao dịch và số bước mà tập lệnh xác thực thực hiện cũng như mức tiêu thụ bộ nhớ của tập lệnh.

Nhưng, nếu đó là toàn bộ câu chuyện thì chúng ta không bao giờ có thể tạo ra các token gốc. Và đây là lúc các `policy` đúc tiền được đưa ra, và sự liên quan của biểu tượng tiền tệ xuất hiện.

Lý do mà ký hiệu tiền tệ phải bao gồm các chữ số thập lục phân là vì nó thực sự là hàm băm của một tập lệnh. Và tập lệnh này được gọi là `policy` đúc tiền và nếu chúng ta có một giao dịch mà chúng ta dự kiến ​​tạo hoặc ghi token gốc thì đối với mỗi token gốc mà chúng ta cố gắng tạo hoặc đốt, ký hiệu tiền tệ sẽ được tra cứu. Vì vậy, tập lệnh tương ứng cũng phải được chứa trong giao dịch. Và tập lệnh đó được thực thi cùng với các tập lệnh xác thực khác.

Và tương tự như các tập lệnh xác thực mà chúng ta đã thấy để xác thực đầu vào, mục đích của các tập lệnh này là để quyết định xem giao dịch này có quyền đúc hoặc đốt token hay không. Ada cũng không ngoại lệ. Hãy nhớ rằng biểu tượng tiền tệ của Ada chỉ là một chuỗi rỗng, không phải là mã băm của bất kỳ tập lệnh nào. Vì vậy, không có tập lệnh nào băm thành chuỗi trống, vì vậy không có tập lệnh nào cho phép đúc hoặc đốt Ada, `có nghĩa là Ada không bao giờ có thể được đúc hoặc đốt`.

Tất cả Ada tồn tại đến từ giao dịch Genesis và tổng số Ada trong hệ thống là cố định và không bao giờ có thể thay đổi. Chỉ các token gốc tùy chỉnh mới có thể có các `policy` đúc tiền tùy chỉnh.

Vì vậy, chúng ta sẽ xem xét một ví dụ về `policy` đúc tiền tiếp theo và sẽ thấy rằng nó rất giống với một tập lệnh xác thực, nhưng không giống hệt nhau.

Trước khi chúng tôi viết ra `policy` đúc tiền đầu tiên, hãy nhớ lại ngắn gọn cách thức hoạt động của xác thực.

Khi chúng ta không có địa chỉ khóa công khai mà có địa chỉ tập lệnh và UTxO nằm tại địa chỉ đó, thì đối với bất kỳ giao dịch nào cố gắng sử dụng UTxO đó, một tập lệnh xác thực sẽ được chạy.

Tập lệnh xác thực đó, dưới dạng đầu vào, `datum`, cái mà đến từ UTxO, `Redeemer`, cái mà đến từ đầu vào và `Context`.

Nhớ lại rằng `ScriptContext` có hai trường.

``` {.haskell}
data ScriptContext = ScriptContext{scriptContextTxInfo :: TxInfo, scriptContextPurpose :: ScriptPurpose }
```

Một trong những trường đó là `ScriptPurpose`, và trong trường này
mọi thứ chúng ta thấy cho đến bây giờ đều thuộc loại `Spending`.

``` {.haskell}
data ScriptPurpose
    = Minting CurrencySymbol
    | Spending TxOutRef
    | Rewarding StakingCredential
    | Certifying DCert
```

Trường khác là  `TxInfo` chứa tất cả thông tin `Context` về giao dịch.

``` {.haskell}
-- | A pending transaction. This is the view as seen by validator scripts, so some details are stripped out.
data TxInfo = TxInfo
    { txInfoInputs      :: [TxInInfo] -- ^ Transaction inputs
    , txInfoInputsFees  :: [TxInInfo]     -- ^ Transaction inputs designated to pay fees
    , txInfoOutputs     :: [TxOut] -- ^ Transaction outputs
    , txInfoFee         :: Value -- ^ The fee paid by this transaction.
    , txInfoForge       :: Value -- ^ The 'Value' forged by this transaction.
    , txInfoDCert       :: [DCert] -- ^ Digests of certificates included in this transaction
    , txInfoWdrl        :: [(StakingCredential, Integer)] -- ^ Withdrawals
    , txInfoValidRange  :: SlotRange -- ^ The valid range for the transaction.
    , txInfoSignatories :: [PubKeyHash] -- ^ Signatures provided with the transaction, attested that they all signed the tx
    , txInfoData        :: [(DatumHash, Datum)]
    , txInfoId          :: TxId
    -- ^ Hash of the pending transaction (excluding witnesses)
    } deriving (Generic)
```

Đối với các `policy` đúc tiền, điều này được kích hoạt nếu `txInfoForge` trường của giao dịch chứa giá trị khác 0. Trong tất cả các giao dịch mà chúng tôi đã thấy cho đến nay, giá trị trường này bằng 0 - chúng tôi chưa bao giờ tạo hoặc phá hủy bất kỳ token nào.

Nếu nó là khác 0, thì đối với mỗi ký hiệu tiền tệ có trong `Value`, tập lệnh `policy` đúc tiền tương ứng sẽ được chạy.

Trong khi các tập lệnh xác thực có ba đầu vào - `datum`, `Redeemer` và `Context`, các tập lệnh `policy` đúc tiền này chỉ có một đầu vào - `Context`. Và đó là `Context` giống như chúng ta đã có trước đây - `ScriptContext`. Sẽ không có ý nghĩa gì nếu có `Datum`, vì nó thuộc về UTxO và sẽ không có ý nghĩa gì nếu có `Redeemer` vì nó thuộc về tập lệnh xác thực. ``policy` đúc tiền thuộc về bản thân giao dịch, không phải đầu vào hoặc đầu ra cụ thể`.

Đối với `ScriptPurpose`, điều này sẽ không được `Spending` như nó đã được cho đến bây giờ, nhưng sẽ là `Minting`.

Ví dụ 1 - Free
----------------

Hãy viết một `policy` đúc tiền đơn giản.

### On chain

Khi chúng tôi viết trình xác thực, chúng tôi viết mã On-chain như sau:

``` {.haskell}
mkValidator :: Datum -> Redeemer -> ScriptContext -> Bool
```

Chúng tôi cũng đã thấy phiên bản cấp thấp trong đó chúng tôi có ba đối số `Data` và trả về `Unit`. Và chúng tôi thấy rằng có thể có các đối số bổ sung trước số liệu, nếu chúng tôi viết một tập lệnh được tham số hóa.

Chúng ta cũng có thể có các kịch bản `policy` đúc tiền được tham số hóa và chúng ta sẽ thấy điều đó trong một ví dụ sau. Nhưng trước tiên chúng ta sẽ xem xét một cái không được tham số hóa.

Đầu tiên, hãy đổi tên hàm thành `mkPolicy`, xóa `Datum` và `Redeemer`, và viết thành đơn giản nhất mà chúng ta có thể..

``` {.haskell}
mkPolicy :: ScriptContext -> Bool
mkPolicy _ = True
```

Điều này bỏ qua `Context` và luôn trả về `True`. Điều này sẽ cho phép đúc và đốt token tùy ý và tên token thuộc về ký hiệu tiền tệ được liên kết với `policy` này.

Hãy nhớ rằng, khi chúng tôi viết trình xác thực, chúng tôi cần sử dụng Template Haskell để biên dịch hàm này sang mã Plutus. Chúng tôi cần làm điều gì đó tương tự cho `policy` đúc tiền của mình.

``` {.haskell}
policy :: Scripts.MonetaryPolicy
policy = mkMonetaryPolicyScript $$(PlutusTx.compile [|| Scripts.wrapMonetaryPolicy mkPolicy ||])
```

Và như trước đây, chúng ta cần tạo hàm `mkPolicy` và `INLINABLE`,vì mọi thứ trong ngoặc Oxford [] cần phải có sẵn tại thời điểm biên dịch.

``` {.haskell}
{-# INLINABLE mkPolicy #-}
mkPolicy :: ScriptContext -> Bool
mkPolicy _ = True
```

Bây giờ chúng tôi có một `policy`, chúng tôi có thể nhận được một ký hiệu tiền tệ từ `policy`.

``` {.haskell}
curSymbol :: CurrencySymbol
curSymbol = scriptCurrencySymbol policy
```

Và chúng ta có thể xem xét điều này trong REPL:

``` {.haskell}
Prelude Week05.Free> curSymbol
e01824b4319351c40b5ec727fff328a82076b1474a6bad6c8e8a2cd835cc6aaf
```

Và điều này hoàn thành phần on-chain, cho việc đúc tiền đơn giản này. Nhưng để dùng thử và tương tác với nó, chúng ta cần phần off-chain.

### Off chain

Phần off-chain nên làm gì? Chà, nó sẽ cho phép các ví tùy ý đúc và đốt các token  biểu tượng của tiền tệ.

Chúng tôi có biểu tượng tiền tệ, vì vậy điều còn thiếu là tên token và số tiền chúng tôi muốn đúc hoặc đốt. Và đối với điều này, chúng tôi sẽ xác định một kiểu dữ liệu `MintParams`.

``` {.haskell}
data MintParams = MintParams
    { mpTokenName :: !TokenName
    , mpAmount    :: !Integer
    } deriving (Generic, ToJSON, FromJSON, ToSchema)    
```

Chúng tôi thấy hai trường - `mpTokenName` and `mpAmount`. Ý tưởng là nếu giá trị `mpAmount` là Dương, chúng ta nên tạo token, và nếu nó là Âm, chúng ta nên đốt token.

Bước tiếp theo là xác định lược đồ (schema). Nhớ lại rằng một trong những tham số của `Contact` `monad` là lược đồ xác định các hành động có sẵn mà chúng ta có thể thực hiện.

``` {.haskell}
type FreeSchema =
    BlockchainActions
        .\/ Endpoint "mint" MintParams
```

Như mọi khi, chúng ta có `BlockchainActions` cung cấp cho chúng tôi quyền truy cập vào những thứ chung chung như lấy khóa công khai của riêng bạn. Và ở đây, chúng tôi đã thêm một `endpoint` `mint` bằng cách sử dụng toán tử cấp kiểu mà chúng tôi đã thấy trước đây.

Vì vậy, bây giờ chúng ta có thể xem xét bản hợp đồng.

``` {.haskell}
mint :: MintParams -> Contract w FreeSchema Text ()
```

Trong quá khứ, chúng tôi đã không đi sâu vào chi tiết về phần off-chain của hợp đồng. Nhưng, như bây giờ chúng ta đã biết về `Contract monad` từ bài giảng trước, chúng ta đã sẵn sàng đi vào chi tiết hơn nhiều.

Nhớ lại rằng `Contract monad` Nhận 4 tham số.

- Đầu tiên là monad của người viết cho phép chúng ta sử dụng một hàm `tell`. Bằng cách để tham số này bằng `w`, chúng tôi chỉ ra rằng chúng tôi sẽ không sử dụng tham số này - chúng tôi sẽ không có hàm `tell` với bất kỳ trạng thái nào.

- Tham số tiếp theo là lược đồ mà chúng ta vừa thảo luận. Như đã lưu ý ở trên, bằng cách sử dụng, `FreeSchema` chúng tôi có quyền truy cập vào các hành động chuỗi khối thông thường, cũng như endpoint `mint`.

- Tham số thứ ba là loại thông báo lỗi, và như chúng ta đã thấy, `Text` thường là một lựa chọn tốt.

- Cuối cùng, tham số thứ tư là kiểu trả về, và hợp đồng của chúng ta sẽ chỉ có kiểu trả về `Unit`.

Bây giờ phần thân hàm, như là `Contact` là một monad, Chúng ta có thể sử dụng `do`.

``` {.haskell}
mint mp = do
    let val     = Value.singleton curSymbol (mpTokenName mp) (mpAmount mp)
        lookups = Constraints.monetaryPolicy policy
        tx      = Constraints.mustForgeValue val
    ledgerTx <- submitTxConstraintsWith @Void lookups tx
    void $ awaitTxConfirmed $ txId ledgerTx
    Contract.logInfo @String $ printf "forged %s" (show val)
```

Điều đầu tiên mà chúng tôi xác định là giá trị mà chúng tôi muốn rèn luyện. Đối với điều này, chúng tôi đang sử dụng hàm `singleton` mà chúng tôi đã thử trong REPL trước đó.

Các đối số của hàm `singleton` là ký hiệu tiền tệ đại diện cho hàm băm của `policy` đúc tiền, cộng với tên token và số tiền được trích xuất từ `MintParams`.

Bây giờ Chúng ta sẽ tạm thời bỏ qua đối số `lookups` ,và chuyển sang đối số `tx`.

Một trong những mục đích chính của `Contract monad` là xây dựng và gửi các giao dịch. Con đường mà nhóm Plutus đã thực hiện là cung cấp một cách để chỉ định các ràng buộc của giao dịch mà bạn đang xác định. Sau đó, các thư viện Plutus sẽ đảm nhận việc xây dựng giao dịch chính xác (nếu có thể). Điều này trái ngược với việc yêu cầu chỉ định tất cả các đầu vào và đầu ra theo cách thủ công, điều này sẽ rất tẻ nhạt vì nhiều yêu cầu, chẳng hạn như gửi tiền lẻ trở lại ví. việc gửi thường giống nhau.

Các điều kiện này đều có tên bắt đầu bằng `must`. Có những thứ như `mustSpendScriptOutput`, `mustPayToPublicKey` và tất cả các loại điều kiện có thể được đặt vào một điều kiện.

Trong ví dụ của chúng tôi, chúng tôi đang sử dụng `mustForgeValue` và chúng tôi chuyển nó vào giá trị đã được xác định trước đó `val`. Kết quả của việc giả mạo các token được chỉ định `val` là chúng sẽ kết thúc trong ví của chính chúng ta.

Khi các điều kiện được xác định, bạn cần gọi một hàm để gửi giao dịch. Có rất nhiều chức năng như vậy, nhưng trong trường hợp này, chức năng thích hợp là `submitTxConstraintsWith`.

Tất cả các hàm `submitTx` đều nhận các điều kiện khai báo này mà giao dịch phải thỏa mãn, và sau đó chúng cố gắng xây dựng một giao dịch đáp ứng các điều kiện đó. Trong trường hợp của chúng tôi, điều kiện duy nhất là chúng tôi muốn tạo giá trị.

Vì vậy, những gì phải làm `submitTxConstraintsWith` để tạo ra một giao dịch hợp lệ? Ví dụ, nó phải cân bằng các đầu vào và đầu ra. Trong trường hợp này, vì chúng tôi luôn có phí giao dịch, chúng tôi cần thông tin đầu vào bao gồm phí giao dịch. Vì vậy, để tạo giao dịch, hàm sẽ xem xét các UTxO của chính chúng ta và tìm một hoặc nhiều UTxO có thể bao trả phí giao dịch và sử dụng chúng làm đầu vào cho giao dịch.

Hơn nữa, nếu chúng ta đang tạo giá trị (nếu `mpAmount` là giá trị dương), thì giá trị đó phải đi đâu đó. Trong trường hợp này `submitTxConstraintsWith`, sẽ tạo một đầu ra gửi giá trị mới được đúc đến ví của chính chúng ta.

Mặt khác, nếu chúng tôi đốt các token (nếu `mpAmount` là số âm), thì các token đó phải đến từ một nơi nào đó. Trong trường hợp đó, hàm `submitTxConstraintsWith` sẽ tìm một đầu vào trong ví của chính chúng ta để lấy các token.

Chức năng gửi cũng có thể không thành công. Ví dụ, nếu chúng ta muốn thanh toán cho ai đó, nhưng chúng ta không có đủ tiền trong ví, nó sẽ không thành công. Hoặc, nếu chúng tôi yêu cầu đốt các token mà chúng tôi không có, nó cũng sẽ thất bại. Khi không thành công, một ngoại lệ sẽ được đưa ra, với một thông báo lỗi thuộc kiểu `Text`.

Bây giờ, trở lại `lookups`.  Để đáp ứng các điều kiện trong hàm
`mustForgeValue`, đôi khi thư viện cần thêm thông tin. Trong trường hợp này, để xác thực một giao dịch tạo giá trị, các nút xác thực giao dịch phải chạy tập lệnh `policy` này.

Tuy nhiên, ký hiệu tiền tệ chỉ là mã băm của tập lệnh `policy`. Để tự chạy tập lệnh, nó phải được bao gồm trong giao dịch. Có nghĩa là, trong bước xây dựng của giao dịch, khi thuật toán nhìn thấy ràng buộc `mustForgeValue`,  nó biết rằng nó phải đính kèm tập lệnh `policy` tương ứng vào giao dịch.

Để cho thuật toán biết tập lệnh `policy` ở đâu, chúng tôi có thể đưa ra các gợi ý và đây là các bản tra cứu. Có thể sử dụng nhiều cách tra cứu khác nhau - bạn có thể cung cấp UTxO, tập lệnh trình xác thực và, như chúng tôi làm ở đây, bạn có thể cung cấp tập lệnh `policy` tiền tệ (policy scripts).

Trong trường hợp của chúng tôi, điều duy nhất chúng tôi cần cung cấp khi tra cứu là `policy` mà chúng tôi đã xác định trước đó trong tập lệnh.

Có những biến thể của `submitTxConstraintsWith` không có biến thể `with` không cần tra cứu, như chúng ta đã thấy trong các bài giảng trước.

Cuối cùng là dòng `@Void`:

``` {.haskell}
ledgerTx <- submitTxConstraintsWith @Void lookups tx
```

Hầu hết các hàm ràng buộc đều hướng tới việc sử dụng một tập lệnh trình xác nhận cụ thể. Thông thường, bạn có tình huống rằng bạn đang làm việc trên một hợp đồng thông minh cụ thể. Và hợp đồng thông minh cụ thể đó có mức `Datum` và `Redeemer`, và hầu hết các chức năng ràng buộc là tham số trong kiểu `Datum` và kiểu `Redeemer`. Trong trường hợp đó, bạn có thể sử dụng trực tiếp kiểu `Datum` mà không cần phải chuyển đổi nó sang kiểu `Plutus Datum`.

Nhưng trong trường hợp này, chúng tôi không tận dụng điều đó. Chúng tôi không có bất kỳ tập lệnh xác thực nào. Điều đó có nghĩa là `submitTxConstraintsWith` sẽ không biết loại nào để sử dụng cho `datum` và `Redeemer` vì chúng tôi không có chúng trong ví dụ này. Vì vậy, trong trường hợp đó, chúng ta phải cho trình biên dịch biết loại nào sẽ sử dụng. Chúng tôi không quan tâm, vì không có `datum` và `Redeemer`, vì vậy chúng tôi sử dụng loại `Void`.

Ngoài ra, trong cùng một dòng, chúng ta thấy một ràng buộc `monad`, vì vậy chúng ta biết rằng đây là một hành động `monad` xảy ra trong `Contract monad`. Lý do cho điều này là, để tra cứu, chẳng hạn như các UTxO của chúng ta, hàm `submitTxConstraintsWith` phải sử dụng sức mạnh siêu việt của `Contract monad`, đó là để truy cập `BlockchainActions`.

Bây giờ, `ledgerTx` về cơ bản là một xử lý cho giao dịch mà chúng tôi vừa gửi.

Sau đó, chúng tôi đợi giao dịch được xác nhận.

``` {.haskell}
void $ awaitTxConfirmed $ txId ledgerTx
```

Hiện tại, nếu xác thực giao dịch không thành công, dòng chờ xác nhận sẽ bị chặn vĩnh viễn. Tuy nhiên, điều này sẽ sớm thay đổi trong bản phát hành sắp tới của Plutus để cho phép chúng tôi lắng nghe các thay đổi về trạng thái, vì vậy bạn có thể phát hiện xem xác thực có thất bại hay không.

Sau khi xác nhận, chúng tôi chỉ cần viết một thông báo nhật ký.

Cuối cùng, chúng ta cần thêm một số bản soạn sẵn để xác định `endpoint` của chúng ta, để có thể thực thi hàm `mint`, ví dụ, trong playground.

``` {.haskell}
endpoints :: Contract () FreeSchema Text ()
endpoints = mint' >> endpoints
  where
    mint' = endpoint @"mint" >>= mint    
```

Chúng tôi xác định một hợp đồng endpoints khác, và đó luôn là tên của hợp đồng mà playground sẽ chạy. Vì vậy, nếu bạn muốn thử nghiệm điều gì đó trong playground, bạn luôn cần một thứ được gọi là `endpoints`.

Ở đây chúng ta chỉ định nghĩa một hàm được gọi `mint'`và sau đó gọi đệ quy `endpoints`, vì vậy khi nó đã được thực thi, nó sẽ có sẵn để được thực thi lại.

Vì `mint'` bằng cách nào đó chúng ta phải có được `MintParams` và để sử dụng `endpoint`. Hàm `endpoint` cung cấp một tham số cho Contract. Khi tham số của `MintParams` được cung cấp, chúng tôi sử dụng ràng buộc monad để gọi `mint` với các đối số đó.

Hai dòng cuối cùng, như chúng ta đã thấy trước đây, chỉ cần thiết cho giao diện người dùng của playground.

``` {.haskell}
mkSchemaDefinitions ''FreeSchema
mkKnownCurrencies []    
```

### Trong sân chơi (Playground)

Chúng tôi đã thiết lập một kịch bản trong đó Ví 1 đúc 555 token ABC và Ví 2 đúc 444 token ABC. Sau đó, sau khi chờ 1 khe, Ví 1 đốt 222 token ABC. Cuối cùng, chúng ta đợi 1 slot ở cuối.

![](img/week05__00007.png)

Bây giờ, nếu chúng ta đánh giá điều này, trước tiên chúng ta sẽ thấy giao dịch khởi đầu trong đó các ví được cấp 1000 lovelace mỗi ví.

![](img/week05__00008.png)

Tiếp theo, chúng tôi thấy hai giao dịch tại Vị trí 1. Đầu tiên là giao dịch từ Ví 2, nơi 444 token ABC được đúc và một khoản phí 10 lovelace được thanh toán. UTxO để thanh toán phí đã được tự động tìm thấy bởi chức năng tạo giao dịch `submitTxConstraintsWith`, như đã thảo luận trước đây.

Chúng tôi thấy ở đây một thứ mà chúng tôi chưa từng thấy trước đây - `Forge` một phần của giao dịch, nơi các token gốc thực sự được tạo ra. Hộp chứa ký hiệu tiền tệ (băm `policy`) và tên token.

Chúng tôi cũng thấy hai kết quả đầu ra - một lần với sự thay đổi 990 lovelace và một kết quả khác với các token mới được đúc. Trên thực tế, các kết quả đầu ra này có thể được kết hợp với nhau, nhưng ở đây chúng được thể hiện dưới dạng hai UTxO riêng biệt.

![](img/week05__00009.png)

Sau đó, chúng tôi thấy giao dịch từ Ví 1, nơi có 555 token ABC được đúc và một khoản phí 10 lovelace được thanh toán.

![](img/week05__00010.png)

Cuối cùng, chúng tôi thấy việc đốt 222 token bằng Ví 1. Ở đây, chúng tôi thấy rằng thuật toán đã làm một điều gì đó hơi khác một chút. Khi nhận thấy rằng một đợt đốt đang diễn ra, nó đã tìm thấy token ABC từ UTxO trong Wallet 1 và sử dụng chúng làm đầu vào. Chúng tôi cũng lưu ý ở đây rằng UTxO đầu ra được kết hợp, như chúng tôi đã đề cập ở trên, có thể được thực hiện thay vì sử dụng hai UTxO đầu ra.

![](img/week05__00011.png)

Và chúng tôi cũng có thể xem các số dư cuối cùng để kiểm tra lại xem tất cả đã diễn ra theo đúng kế hoạch chưa.

![](img/week05__00012.png)

Với `policy` tiền tệ của chúng tôi, chúng tôi có thể tạo các giao dịch đào token và đốt tùy ý bằng bất kỳ ví nào. Vì vậy, đây có lẽ không phải là một `policy` tiền tệ tốt. Mục đích của token là đại diện cho giá trị, nhưng nếu bất kỳ ai tại bất kỳ thời điểm nào có thể tạo ra token mới, thì token này sẽ không có nhiều ý nghĩa. Có thể có một số trường hợp sử dụng kỳ lạ cho nó, nhưng trên thực tế, `policy` này khá vô dụng.

### Thử nghiệm với EmulatorTrace

Hãy cũng kiểm tra điều này từ dòng lệnh, thay vì trong playground.

``` {.haskell}
test :: IO ()
test = runEmulatorTraceIO $ do
    let tn = "ABC"
    h1 <- activateContractWallet (Wallet 1) endpoints
    h2 <- activateContractWallet (Wallet 2) endpoints
    callEndpoint @"mint" h1 $ MintParams
        { mpTokenName = tn
        , mpAmount    = 555
        }
    callEndpoint @"mint" h2 $ MintParams
        { mpTokenName = tn
        , mpAmount    = 444
        }
    void $ Emulator.waitNSlots 1
    callEndpoint @"mint" h1 $ MintParams
        { mpTokenName = tn
        , mpAmount    = -222
        }
    void $ Emulator.waitNSlots 1
```

Nếu chúng tôi chạy điều này trong REPL, chúng tôi sẽ thấy những gì chúng tôi đã thấy trong sân chơi, nhưng thay vào đó trên bảng điều khiển. Nó không đẹp, nhưng nó nhanh hơn.

``` {.}
Prelude Week05.Free> test
Slot 00000: TxnValidate af5e6d25b5ecb26185289a03d50786b7ac4425b21849143ed7e18bcd70dc4db8
Slot 00000: SlotAdd Slot 1
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Contract instance started
Slot 00001: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 2}:
Contract instance started
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Receive endpoint call: Object (fromList [("tag",String "mint"),("value",Object (fromList [("unEndpointValue",Object (fromList [("mpAmount",Number 555.0),("mpTokenName",Object (fromList [("unTokenName",String "ABC")]))]))]))])
Slot 00001: W1: TxSubmit: 7c01d39fc031815eaf05d97709e4973a24dfa38e9dd68a4fd1ec92bb80cf76e4
Slot 00001: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 2}:
Receive endpoint call: Object (fromList [("tag",String "mint"),("value",Object (fromList [("unEndpointValue",Object (fromList [("mpAmount",Number 444.0),("mpTokenName",Object (fromList [("unTokenName",String "ABC")]))]))]))])
Slot 00001: W2: TxSubmit: 6ba7eb4441992284e687d184080d4a8693e7b188fc45150d6e7ccd1243968f53
Slot 00001: TxnValidate 6ba7eb4441992284e687d184080d4a8693e7b188fc45150d6e7ccd1243968f53
Slot 00001: TxnValidate 7c01d39fc031815eaf05d97709e4973a24dfa38e9dd68a4fd1ec92bb80cf76e4
Slot 00001: SlotAdd Slot 2
Slot 00002: ``` CONTRACT LOG: "forged Value (Map [(e01824b4319351c40b5ec727fff328a82076b1474a6bad6c8e8a2cd835cc6aaf,Map [(\"ABC\",555)])])"
Slot 00002: ``` CONTRACT LOG: "forged Value (Map [(e01824b4319351c40b5ec727fff328a82076b1474a6bad6c8e8a2cd835cc6aaf,Map [(\"ABC\",444)])])"
Slot 00002: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Receive endpoint call: Object (fromList [("tag",String "mint"),("value",Object (fromList [("unEndpointValue",Object (fromList [("mpAmount",Number -222.0),("mpTokenName",Object (fromList [("unTokenName",String "ABC")]))]))]))])
Slot 00002: W1: TxSubmit: 95d42e93ee41ab5bed7857b176be5a4e16602323eaacaa90f3bb807a9fd235c0
Slot 00002: TxnValidate 95d42e93ee41ab5bed7857b176be5a4e16602323eaacaa90f3bb807a9fd235c0
Slot 00002: SlotAdd Slot 3
Slot 00003: `` CONTRACT LOG: "forged Value (Map [(e01824b4319351c40b5ec727fff328a82076b1474a6bad6c8e8a2cd835cc6aaf,Map [(\"ABC\",-222)])])"
Slot 00003: SlotAdd Slot 4
Final balances
Wallet 1: 
    {, ""}: 99999980
    {e01824b4319351c40b5ec727fff328a82076b1474a6bad6c8e8a2cd835cc6aaf, "ABC"}: 333
Wallet 2: 
    {e01824b4319351c40b5ec727fff328a82076b1474a6bad6c8e8a2cd835cc6aaf, "ABC"}: 444
    {, ""}: 99999990
...    
Wallet 10: 
    {, ""}: 100000000
```

Ví dụ 2 - Signed
------------------

### On-chain

Hãy xem một ví dụ thực tế hơn.

Chúng tôi sẽ lấy một bản sao của mô-đun `Free` và gọi nó là `Signed`.

Có lẽ ví dụ dễ nhất về `policy` đúc tiền thực tế là một `policy` mà việc đúc và đốt token bị hạn chế đối với các giao dịch được ký bởi một hàm băm khóa công khai cụ thể. Điều đó tương tự như một ngân hàng trung ương, bằng các loại tiền tệ fiat.

Điều này có nghĩa là các `policy` của chúng tôi không còn là không có các tham số. Chúng tôi cần mã băm khóa công khai. Ngoài ra, chúng ta cũng cần phải xem xét `Context`, vì vậy chúng ta không thể bỏ qua như lần trước.

Chúng tôi nhớ rằng `scriptContextTxInfo` từ `Context` có chứa danh sách tất cả các bên ký kết của giao dịch. Vì vậy, chúng tôi có thể sử dụng điều này để xem liệu người ký được yêu cầu có phải là một trong số họ hay không.

``` {.haskell}
mkPolicy :: PubKeyHash -> ScriptContext -> Bool
mkPolicy pkh ctx = txSignedBy (scriptContextTxInfo ctx) pkh
```

Các hàm `txSignedBy` là một cách thuận tiện để kiểm tra này. Trong các ví dụ trước, chúng tôi đã sử dụng hàm `elem` để kiểm tra xem nó có tồn tại trong danh sách hay không.

``` {.haskell}
Prelude Week05.Free> import Ledger
Prelude Ledger Week05.Free> :t txSignedBy
txSignedBy :: TxInfo -> PubKeyHash -> Bool
```

Bây giờ, chúng ta cần cập nhật phần mã biên dịch hàm `mkPolicy`  của chúng ta thành mã Plutus. Chúng tôi sẽ sử dụng các kỹ thuật tương tự mà chúng tôi đã sử dụng khi viết các tập lệnh trình xác thực. Cụ thể, chúng tôi sử dụng hàm `applyCode` để cho phép chúng tôi tham chiếu `pkh`, giá trị của nó chỉ được biết trong thời gian chạy.

``` {.haskell}
policy :: PubKeyHash -> Scripts.MonetaryPolicy
policy pkh = mkMonetaryPolicyScript $
    $$(PlutusTx.compile [|| Scripts.wrapMonetaryPolicy . mkPolicy ||])
    `PlutusTx.applyCode`
    PlutusTx.liftCode pkh
```

Chúng tôi cũng cần cập nhật hàm `curSymbol`, vì nó hiện phụ thuộc vào hàm băm của khóa công khai. Nó phụ thuộc vào nó để nó có thể chuyển nó đến hàm `policy`.

``` {.haskell}
curSymbol :: PubKeyHash -> CurrencySymbol
curSymbol = scriptCurrencySymbol . policy
```

Lưu ý, dòng thứ hai ở đây, phần nội dung, là cách viết ngắn hơn:

``` {.haskell}
curSymbol pkh = scriptCurrencySymbol $ policy pkh
```

Điều này rõ ràng, khi bạn xem xét một cái gì đó như sau, đâu `timesSix` chỉ là một cách khác để viết kết quả của việc kết hợp các hàm `timesTwo` and `timesThree`.

``` {.haskell}
timesSix x = timesTwo $ timesThree x 
```

giống hệt như ...

``` {.haskell}
timesSix = timesTwo . timesThree
```

Quá trình đơn giản hóa này được gọi là giảm ETA, vì vậy nếu bạn từng thấy IDE của mình gợi ý rằng bạn có thể giảm ETA, thì đây chính là những gì nó đang nói đến.

Bây giờ cho mã off-chain.

### Off-chain

Chúng tôi không cần mở rộng kiểu dữ liệu `MintParams` cho Off-chain. Ví muốn đúc hoặc đốt tiền tệ có thể ký bằng mã băm khóa công khai của chính nó. Đây là chữ ký duy nhất mà ví có thể cung cấp và nó có khả năng tự tra cứu.

Chúng tôi sẽ thực hiện một thay đổi đối với tên của lược đồ cho rõ ràng. Tất nhiên, chúng tôi cũng sẽ cập nhật tên này bất cứ nơi nào nó xuất hiện trong tập lệnh hợp đồng.

``` {.haskell}
type SignedSchema =
    BlockchainActions
        .\/ Endpoint "mint" MintParams
```

Bây giờ, đối với hàm `mint`, chúng ta cần chuyển hàm băm khóa công khai cho hàm `curSymbol`. Nắm giữ khóa công khai là thứ được cung cấp bởi `BlockchainActions`. Vì vậy, chúng tôi sẽ lấy điều này từ `Contract` và áp dụng hàm `pubKeyHash`cho nó.

Một cách để làm điều này sẽ là

``` {.haskell}
pk <- Contract.ownPubKey
let pkh = pubKeyHash pk
```

Tuy nhiên, như `Contract` là một monad, và do đó là một thể hiện của `Functor`,  chúng ta có hàm `fmap` , hàm này sẽ biến 
`Contract a` thành `Contract b`. Trong trường hợp này, chúng ta có thể tận dụng điều đó bằng cách sử dụng hàm `pubKeyHash` như là (a -> b) của hàm `fmap` và sẽ chuyển `Contract pubKey` thành `Contract pubKeyHash`,và sau đó có thể dùng hàm `grab` để lấy giá trị.

``` {.haskell}
pkh <- fmap pubKeyHash Contract.ownPubKey
```

Còn một điều nữa chúng tôi có thể làm để cải thiện điều này. Có một nhà điều hành cho `fmap`.

``` {.haskell}
pkh <- pubKeyHash <$> Contract.ownPubKey
```


Được rồi, bây giờ chúng ta hãy cập nhật dòng `lookups` để chuyển qua hàm băm khóa công khai.

``` {.haskell}
lookups = Constraints.monetaryPolicy $ policy pkh
```
Và bây giờ chúng ta đã hoàn thành việc sửa đổi hàm `mint`.

``` {.haskell}
mint :: MintParams -> Contract w SignedSchema Text ()
mint mp = do
    pkh <- pubKeyHash <$> Contract.ownPubKey
    let val     = Value.singleton (curSymbol pkh) (mpTokenName mp) (mpAmount mp)
        lookups = Constraints.monetaryPolicy $ policy pkh
        tx      = Constraints.mustForgeValue val
    ledgerTx <- submitTxConstraintsWith @Void lookups tx
    void $ awaitTxConfirmed $ txId ledgerTx
    Contract.logInfo @String $ printf "forged %s" (show val)
```

Vì vậy, chúng ta hãy thử nó bằng cách sử dụng hàm `test`.

``` {.}
Prelude Ledger Week05.Signed> Week05.Signed.test
Slot 00000: TxnValidate af5e6d25b5ecb26185289a03d50786b7ac4425b21849143ed7e18bcd70dc4db8
Slot 00000: SlotAdd Slot 1
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Contract instance started
Slot 00001: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 2}:
Contract instance started
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Receive endpoint call: Object (fromList [("tag",String "mint"),("value",Object (fromList [("unEndpointValue",Object (fromList [("mpAmount",Number 555.0),("mpTokenName",Object (fromList [("unTokenName",String "ABC")]))]))]))])
Slot 00001: W1: TxSubmit: 20289e7b1bb6692b35e24e0f9293327f9169d843ae0ea431186fdefae6092a44
Slot 00001: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 2}:
Receive endpoint call: Object (fromList [("tag",String "mint"),("value",Object (fromList [("unEndpointValue",Object (fromList [("mpAmount",Number 444.0),("mpTokenName",Object (fromList [("unTokenName",String "ABC")]))]))]))])
Slot 00001: W2: TxSubmit: 1c367cf81dd2da478abb96235ee16facf9f7d47374c9455d5fdd516aaf04d0c2
Slot 00001: TxnValidate 1c367cf81dd2da478abb96235ee16facf9f7d47374c9455d5fdd516aaf04d0c2
Slot 00001: TxnValidate 20289e7b1bb6692b35e24e0f9293327f9169d843ae0ea431186fdefae6092a44
Slot 00001: SlotAdd Slot 2
Slot 00002: ``` CONTRACT LOG: "forged Value (Map [(7183b1cf81e44b26c558ddf442c4a7161a1b504b61136a8773dc2e4960323521,Map [(\"ABC\",555)])])"
Slot 00002: ``` CONTRACT LOG: "forged Value (Map [(2a964fa6314803cf1b61165aeb1d758e355aae9480a29e282b58e76983f101ba,Map [(\"ABC\",444)])])"
Slot 00002: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Receive endpoint call: Object (fromList [("tag",String "mint"),("value",Object (fromList [("unEndpointValue",Object (fromList [("mpAmount",Number -222.0),("mpTokenName",Object (fromList [("unTokenName",String "ABC")]))]))]))])
Slot 00002: W1: TxSubmit: 6e20d243447d7f49de509ef6b52c6d947769d95a6451c9cda53e42a0ba02fa69
Slot 00002: TxnValidate 6e20d243447d7f49de509ef6b52c6d947769d95a6451c9cda53e42a0ba02fa69
Slot 00002: SlotAdd Slot 3
Slot 00003: `` CONTRACT LOG: "forged Value (Map [(7183b1cf81e44b26c558ddf442c4a7161a1b504b61136a8773dc2e4960323521,Map [(\"ABC\",-222)])])"
Slot 00003: SlotAdd Slot 4
Final balances
Wallet 1: 
    {, ""}: 99999980
    {7183b1cf81e44b26c558ddf442c4a7161a1b504b61136a8773dc2e4960323521, "ABC"}: 333
Wallet 2: 
    {2a964fa6314803cf1b61165aeb1d758e355aae9480a29e282b58e76983f101ba, "ABC"}: 444
    {, ""}: 99999990
...
Wallet 10: 
    {, ""}: 100000000
```

Điều này trông rất giống với trước đây, nhưng lần này, hãy lưu ý rằng, trong khi tên token giống nhau, các ký hiệu tiền tệ khác nhau cho mỗi ví.

NFT - Non-Fungible Tokens
----

Bây giờ chúng ta hãy nói về NFT - Non-Fungible Tokens. NFT là các token có số lượng chính xác là 1.

Các ví dụ về token gốc mà chúng tôi đã nghiên cứu cho đến nay chắc chắn không phải là NFT vì chúng tôi có thể dễ dàng đúc bao nhiêu tùy thích. Điều này không chỉ đúng trong ví dụ đầu tiên, nơi bất kỳ ai cũng có thể đúc token, mà còn trong ví dụ thứ hai, trong đó, miễn là bạn là chủ sở hữu của mã băm khóa công khai chính xác, bạn có thể đúc token không giới hạn cho ký hiệu tiền tệ và tên token.

Để tạo ra một NFT, có lẽ ý tưởng ngây thơ đầu tiên sẽ là xem xét trường forge trong `policy` và thực thi một `policy` trong đó số tiền là một.

Nhưng điều đó không giúp được gì cho chúng tôi. Điều đó chỉ có nghĩa là trong một giao dịch, bạn chỉ có thể đúc một token. Nhưng không ai có thể ngăn chúng tôi gửi bao nhiêu trong số các giao dịch đó tùy thích.

Tùy chọn thứ hai thực sự đã được sử dụng trên chuỗi khối Cardano. NFT đã có sẵn kể từ Mary fork, có trước Plutus, và để làm được điều này, chúng được thực hiện bằng cách sử dụng thời hạn.

Trong các ví dụ trước, chúng ta đã thấy cách thời gian có thể được kết hợp trong các tập lệnh xác thực và điều tương tự cũng có thể được thực hiện trong các tập lệnh `policy`.

Ý tưởng ở đây là chỉ cho phép đúc tiền trước khi thời hạn nhất định trôi qua. Sử dụng phương pháp này, nếu bạn muốn đúc NFT, bạn đúc một token trước thời hạn, sau đó cho phép thời hạn trôi qua. Điều này đảm bảo rằng, sau thời hạn, sẽ không có token mới nào được đúc.

Tuy nhiên, để kiểm tra rằng bạn chỉ đúc một token trước thời hạn, bạn cần một cái gì đó giống như một công cụ tìm kiếm chuỗi khối. Vì vậy, theo nghĩa này, chúng không phải là NFT thực sự, trong chừng mực bản thân biểu tượng tiền tệ đảm bảo rằng chúng là duy nhất.

Sử dụng Plutus, có thể tạo ra các NFT thực sự. Nếu bạn biết tập lệnh `policy` tương ứng với ký hiệu tiền tệ, bạn có thể chắc chắn rằng chỉ có một token đang tồn tại mà không cần phải sử dụng đến một thứ gì đó như trình tìm kiếm chuỗi khối.

Và, suy nghĩ về cách làm điều đó, phải có một cách để ngăn chặn việc có nhiều hơn một giao dịch đúc tiền cho token được đề cập. Bất cứ điều gì bạn viết trong tập lệnh `policy` của mình, nó chỉ phải trả về `true` cho một giao dịch, do đó không thể thực hiện lại điều tương tự trong một giao dịch khác.

Lúc đầu, điều này nghe có vẻ không thể. Tại sao bạn không thể chạy lại cùng một giao dịch và xác thực lại thành công? Ngay cả khi xem xét thời hạn, điều gì ngăn giao dịch thứ hai trong cùng một vị trí vượt qua xác thực?

Chìa khóa ở đây là chúng ta cần một cái gì đó độc đáo. Một thứ chỉ có thể tồn tại trong một lần giao dịch và không bao giờ lặp lại. Đây là một thủ thuật quan trọng và cần ghi nhớ.

Ý tưởng là sử dụng UTxO. UTxO là duy nhất. UTxO là đầu ra của một giao dịch và số nhận dạng duy nhất của nó là ID giao dịch và chỉ mục của nó trong danh sách các đầu ra từ giao dịch đó.

Lý do mà các giao dịch là duy nhất là một chút tinh tế. Chúng sẽ không nhất thiết là duy nhất nếu nó không phải là phí. Nếu không có phí, bạn có thể có một giao dịch không có đầu vào và chỉ với đầu ra không có giá trị. Một giao dịch như vậy sẽ có một số băm chính xác mỗi khi nó được chạy và do đó có cùng một id giao dịch chính xác. Nhưng với phí, một giao dịch như vậy không thể tồn tại, vì bạn luôn cần đầu vào cung cấp phí và phí không bao giờ có thể đến từ cùng một UTxO như đầu vào.

Vì vậy, để tạo NFT, chúng tôi sẽ cung cấp một UTxO cụ thể làm tham số cho `policy` đúc tiền và trong `policy` này, chúng tôi sẽ kiểm tra xem giao dịch có sử dụng UTxO này hay không. Và, như chúng tôi vừa lưu ý, một khi UTxO đó đã được tiêu thụ, nó không bao giờ có thể được tiêu thụ lại.

## Ví dụ 3 - NFT

Chúng tôi bắt đầu với một bản sao của ví dụ trước `Signed` và chúng tôi sẽ gọi `NFT`.

Vì vậy, hãy biến `policy` `Signed` thành một `policy` NFT thực sự.

### On-chain

Đầu tiên, chúng tôi sẽ không sử dụng mã băm khóa công khai làm đầu vào nữa, như thể chúng tôi là ngân hàng trung ương, mà thay vào đó sẽ sử dụng UTxO. Vậy, loại nào tương ứng với UTxO?

Hãy xem REPL và nhắc nhở bản thân về điều đó `TxInfo`.

``` {.haskell}
Prelude Week05.Signed Week05.Free> import Ledger
Prelude Week05.Signed Ledger Week05.Free> :i TxInfo
type TxInfo :: `
data TxInfo
    = TxInfo {txInfoInputs :: [TxInInfo],
                txInfoInputsFees :: [TxInInfo],
                txInfoOutputs :: [TxOut],
                txInfoFee :: Value,
                txInfoForge :: Value,
                txInfoDCert :: [Plutus.V1.Ledger.DCert.DCert],
                txInfoWdrl :: [(Plutus.V1.Ledger.Credential.StakingCredential,
                                Integer)],
                txInfoValidRange :: SlotRange,
                txInfoSignatories :: [PubKeyHash],
                txInfoData :: [(DatumHash, Datum)],
                txInfoId :: TxId}
```

Chúng tôi, chúng tôi quan tâm đến trường này:

``` {.haskell}
txInfoInputs :: [TxInInfo]
```

Hãy xem xét kiểu `TxInInfo`

``` {.haskell}
Prelude Week05.Signed Ledger Week05.Free> :i TxInInfo
type TxInInfo :: `
data TxInInfo
    = TxInInfo {txInInfoOutRef :: TxOutRef, txInInfoResolved :: TxOut}
```

Chúng ta thấy rằng nó là một bản ghi có hai trường. Đầu tiên là về loại `TxOutRef` và điều này tham chiếu đến UTxO, chính xác là những gì chúng ta cần. Vì vậy, chúng ta hãy sử dụng nó.

``` {.haskell}
mkPolicy :: TxOutRef -> ScriptContext -> Bool
```

Bây giờ, chúng tôi đã sẵn sàng để viết logic. Chúng ta phải kiểm tra xem tập lệnh có chứa UTxO được chỉ định làm đầu vào hay không. Chúng tôi sẽ ủy thác điều này cho một chức năng trợ giúp. Chức năng này, mà chúng tôi sẽ gọi hàm `hasUTxO` sử dụng hàm `any`, là một hàm tiêu chuẩn Prelude, nhưng cũng có phiên bản Plutus, vì những lý do mà chúng tôi đã giải quyết trước đó.

Các hàm `any` có một đơn vị (một hàm trả về một boolean) và áp dụng nó vào một bộ sưu tập đầu vào của các kiểu `Foldable`( ví dụ một danh sách), và sẽ trở thành sự thật nếu vị là đúng đối với bất kỳ đầu vào.

Ở đây, chúng tôi sử dụng hàm `any` để xem liệu có bất kỳ `txInInfoOutRefs` nào trong `txInfoInputs` từ trường `TxInfo`  của `Context` khớp với UTxO mà chúng tôi đang xác thực hay không.

Để rõ ràng, chúng tôi cũng sẽ cung cấp một chức năng trợ giúp để lấy danh sách `txInfoInputs`.

``` {.haskell}
info :: TxInfo
info = scriptContextTxInfo ctx

hasUTxO :: Bool
hasUTxO = any (\i -> txInInfoOutRef i == oref) $ txInfoInputs info
```

Vì vậy, chúng ta có đủ để hoàn thành việc viết `policy` của chúng tôi? Hãy xem những gì chúng tôi có.

``` {.haskell}
mkPolicy :: TxOutRef -> ScriptContext -> Bool
mkPolicy oref ctx = traceIfFalse "UTxO not consumed" hasUTxO
where
    info :: TxInfo
    info = scriptContextTxInfo ctx

    hasUTxO :: Bool
    hasUTxO = any (\i -> txInInfoOutRef i == oref) $ txInfoInputs info
```

Hiện tại, chúng tôi có `policy` chỉ có thể đúc hoặc đốt một lần. Tuy nhiên, tất nhiên, trong một giao dịch duy nhất đó, chúng ta vẫn có thể đúc bao nhiêu token tùy thích.

Bây giờ, chúng tôi nghĩ về những gì chúng tôi thực sự muốn. Có thể chúng tôi muốn một `policy` cho phép chúng tôi đúc chỉ một token cho biểu tượng tiền tệ. Hoặc có lẽ, chúng tôi muốn có thể đúc nhiều NFT cùng một lúc, mỗi NFT có một tên token khác nhau.

Điều đó tùy thuộc vào chúng ta. Nhưng, giả sử chúng ta đi với tùy chọn đầu tiên. Chúng ta chỉ muốn đúc một token NFT.

Vì vậy, sẽ hợp lý khi chuyển tên token làm tham số.

``` {.haskell}
mkPolicy :: TxOutRef -> TokenName -> ScriptContext -> Bool
```

Và chúng tôi cần một điều kiện thứ hai để kiểm tra xem chúng tôi có đúc chỉ một coin cụ thể này hay không.

``` {.haskell}
mkPolicy oref tn ctx = traceIfFalse "UTxO not consumed"   hasUTxO           &&
                       traceIfFalse "wrong amount minted" checkMintedAmount
```

Và, tất nhiên, chúng tôi cần phải thực hiện `checkMintedAmount`.

Trước hết, chúng ta cần truy cập vào giá trị. Chúng tôi có được điều này từ các trường `txInfoForge` của `TxInfo`.

Làm cách nào để chúng tôi kiểm tra xem giá trị giả mạo này có đúng là 1 token của tên mà chúng tôi yêu cầu hay không? Có một số cách tiếp cận, nhưng một là sử dụng hàm `flattenValue` mà chúng tôi sẽ nhớ lại, trả về danh sách bộ ba ký hiệu `tiền tệ, tên token và giá trị`. Sau đó, chúng tôi có thể kiểm tra xem đầu ra của `flattenValue` có chính xác một bộ ba khớp với biểu tượng, token và giá trị mà chúng tôi mong đợi hay không.

Nó sẽ trông giống như thế này:

``` {.haskell}
flattenValue (txInfoForge info) == [(cs, tn, 1)]
```

Nhưng chúng tôi vẫn còn một vấn đề cần giải quyết - chúng tôi cần biết ký hiệu tiền tệ là gì. Cho rằng biểu tượng tiền tệ là một hàm băm của `policy`, có vẻ như chúng ta đang gặp vấn đề về con gà và quả trứng.

May mắn thay, có một chức năng được gọi là `ownCurrencySymbol` tồn tại để giải quyết chính xác vấn đề này.

``` {.haskell}
flattenValue (txInfoForge info) == [(ownCurrencySymbol ctx, tn, 1)]
```

Khi nó xảy ra, điều này sẽ không biên dịch, vì Eq không được xác định cho bộ ba trong Plutus Prelude. Vì vậy, chúng ta có thể giải quyết vấn đề này với một câu lệnh trường hợp và một số đối sánh mẫu.

``` {.haskell}
case flattenValue (txInfoForge info) of
        [(cs, tn', amt)] -> cs  == ownCurrencySymbol ctx && tn' == tn && amt == 1
        _                -> False
```

Bây giờ, chúng tôi có thể hoàn thành `policy` của mình.

``` {.haskell}
mkPolicy :: TxOutRef -> TokenName -> ScriptContext -> Bool
mkPolicy oref tn ctx = traceIfFalse "UTxO not consumed"   hasUTxO           &&
                    traceIfFalse "wrong amount minted" checkMintedAmount
where
    info :: TxInfo
    info = scriptContextTxInfo ctx

    hasUTxO :: Bool
    hasUTxO = any (\i -> txInInfoOutRef i == oref) $ txInfoInputs info

    checkMintedAmount :: Bool
    checkMintedAmount = case flattenValue (txInfoForge info) of
        [(cs, tn', amt)] -> cs  == ownCurrencySymbol ctx && tn' == tn && amt == 1
        _                -> False
```

Và chúng tôi sẽ cập nhật boilerplate của chúng tôi.

``` {.haskell}
policy :: TxOutRef -> TokenName -> Scripts.MonetaryPolicy
policy oref tn = mkMonetaryPolicyScript $
    $$(PlutusTx.compile [|| \oref' tn' -> Scripts.wrapMonetaryPolicy $ mkPolicy oref' tn' ||])
    `PlutusTx.applyCode`
    PlutusTx.liftCode oref
    `PlutusTx.applyCode`
    PlutusTx.liftCode tn

curSymbol :: TxOutRef -> TokenName -> CurrencySymbol
curSymbol oref tn = scriptCurrencySymbol $ policy oref tn    
```

Điều đó hoàn thành phần on-chain.

### Off-chain

Chúng ta cần suy nghĩ về các yếu tố đầu vào mà chúng ta cần cho giao dịch này.

Đầu tiên, chúng tôi cần một UTxO và chúng tôi cần cung cấp một UTxO của riêng mình. Tuy nhiên, chúng ta không cần chuyển nó vào vì chúng ta có thể tra cứu trực tiếp.

Chúng tôi chỉ cần cung cấp tên token, vì vậy chúng tôi không cần loại dữ liệu đặc biệt nữa, vì vậy chúng tôi có thể xóa `MintParams` và chỉ sử dụng `TokenName`.

``` {.haskell}
type NFTSchema =
    BlockchainActions
        .\/ Endpoint "mint" TokenName
```

Bây giờ chúng ta sẽ viết hàm off-chain `mint`.

``` {.haskell}
mint :: TokenName -> Contract w NFTSchema Text ()
mint tn = do
```

Điều đầu tiên cần làm là lấy danh sách các UTxO thuộc về chúng tôi.

Các mô-đun `Plutus.Contract`  cho chúng ta hàm `utxoAt`, trong đó có chữ ký dưới đây, và nhìn lên tất cả các UTxOs tại một địa chỉ nhất định.

``` {.haskell}
utxoAt :: Address -> Contract w s e Ledger.AddressMap.UtxoMap
```

Một `AddressMap` là `map` trong đó  `keys` là `TxOutRef` giá trị là `TxOutTx`.

``` {.haskell}
Prelude Week05.NFT> :i Ledger.AddressMap.UtxoMap
type Ledger.AddressMap.UtxoMap :: `
type Ledger.AddressMap.UtxoMap = Data.Map.Internal.Map TxOutRef TxOutTx
```

Nếu chúng tôi chuyển chức năng này đến địa chỉ của chính chúng tôi thì các khóa của map này sẽ là các UTxO thuộc về chúng tôi. Chúng tôi chọn cái nào trong số này không quan trọng. Vì vậy, miễn là chúng ta sở hữu ít nhất một UTxO là được.

Bước đầu tiên là tìm địa chỉ của chính chúng ta. Chúng ta biết cách tìm khóa công khai của riêng mình và, với điều này, chúng ta có thể sử dụng chức năng này `pubKeyAddress` để lấy địa chỉ của mình.

``` {.haskell}
pubKeyAddress :: PubKey -> address
```

Hãy lấy chúng.

``` {.haskell}
import qualified Data.Map as Map

mint :: TokenName -> Contract w NFTSchema Text ()
mint tn = do
    pk    <- Contract.ownPubKey
    utxos <- utxoAt (pubKeyAddress pk)
```

Chúng ta chỉ cần một cái - chúng tôi không quan tâm cái nào. Chúng tôi sẽ viết một câu lệnh trường hợp sẽ ghi lại lỗi nếu chúng tôi không có UTxO có sẵn hoặc sẽ sử dụng UTxO đầu tiên trong danh sách tiếp tục với mã giả mạo.

Thay đổi đầu tiên là chỉ định 1 thay vì chỉ định `mpAmount`, vì chúng tôi muốn có chính xác 1 NFT được đúc.

``` {.haskell}
case Map.keys utxos of
    []       -> Contract.logError @String "no utxo found"
    oref : _ -> do
        let val     = Value.singleton (curSymbol oref tn) tn 1
```

Thứ hai, chúng tôi thêm đối số tên token vào loopup.

``` {.haskell}
lookups = Constraints.monetaryPolicy $ policy oref tn
```

Thứ ba, bây giờ chúng tôi cần một ràng buộc bổ sung để khẳng định rằng UTxO cụ thể của chúng tôi đã được tiêu thụ.

Có một chức năng cho điều đó.

``` {.haskell}
Prelude Week05.NFT> import Ledger.Constraints
Prelude Week05.NFT> :t mustSpendPubKeyOutput
mustSpendPubKeyOutput :: TxOutRef -> TxConstraints i o
```

Làm thế nào để chúng ta kết hợp các ràng buộc của `mustForgeValue` và `mustSpendPubKeyOutput`? `Contraints` không tạo thành một `Monoid`, nhưng chúng có tạo thành một `Semigroup`, và sự khác biệt chỉ là ở chỗ `Semigroup` chúng ta không có `mempty`, phần tử trung tính. Chúng tôi vẫn có thể kết hợp chúng với toán tử `<>`.

``` {.haskell}
tx = Constraints.mustForgeValue val <> Constraints.mustSpendPubKeyOutput oref
```

Bây giờ, chúng tôi cần cung cấp một bản tra cứu cho phép truy cập vào nơi `oref` có thể tìm thấy UTxO . Vì vậy, chúng ta có thể sử dụng

``` {.haskell}
Ledger.Constraints.unspentOutputs :: Data.Map.Internal.Map TxOutRef TxOutTx -> ScriptLookups a
```

Vì vậy, hãy cập nhật `loopups` của chúng tôi.

``` {.haskell}
lookups = Constraints.monetaryPolicy (policy oref tn) <> Constraints.unspentOutputs utxos
```

Một cái gì đó chúng ta cần phải làm trước khi kịch bản này sẽ chạy là phải import các nhà điều hành `<>` cho `Semigroup` từ Haskell Prelude tiêu chuẩn, như chúng ta đã thay thế một cách rõ ràng từ các mudule `PlutusTx.Prelude`.

``` {.haskell}
import Prelude (Semigroup (..))
```

Chúng ta hãy nhìn vào toàn bộ chức năng.

``` {.haskell}
mint :: TokenName -> Contract w NFTSchema Text ()
mint tn = do
    pk    <- Contract.ownPubKey
    utxos <- utxoAt (pubKeyAddress pk)
    case Map.keys utxos of
        []       -> Contract.logError @String "no utxo found"
        oref : _ -> do
            let val     = Value.singleton (curSymbol oref tn) tn 1
                lookups = Constraints.monetaryPolicy (policy oref tn) <> Constraints.unspentOutputs utxos
                tx      = Constraints.mustForgeValue val <> Constraints.mustSpendPubKeyOutput oref
            ledgerTx <- submitTxConstraintsWith @Void lookups tx
            void $ awaitTxConfirmed $ txId ledgerTx
            Contract.logInfo @String $ printf "forged %s" (show val)
```

Đối với kịch bản thử nghiệm.

``` {.haskell}
test :: IO ()
test = runEmulatorTraceIO $ do
    let tn = "ABC"
    h1 <- activateContractWallet (Wallet 1) endpoints
    h2 <- activateContractWallet (Wallet 2) endpoints
    callEndpoint @"mint" h1 tn
    callEndpoint @"mint" h2 tn
    void $ Emulator.waitNSlots 1
```

Hãy thử nghiệm.

``` {.haskell}
Prelude Week05.Signed Ledger Plutus.Contract Ledger.Constraints Week05.Free> Week05.NFT.test
Slot 00000: TxnValidate af5e6d25b5ecb26185289a03d50786b7ac4425b21849143ed7e18bcd70dc4db8
Slot 00000: SlotAdd Slot 1
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Contract instance started
Slot 00001: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 2}:
Contract instance started
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Receive endpoint call: Object (fromList [("tag",String "mint"),("value",Object (fromList [("unEndpointValue",Object (fromList [("unTokenName",String "ABC")]))]))])
Slot 00001: W1: TxSubmit: 691a5c0725ac09f79c8c45c899d732d26460d18c4c18167be71d55319bcd5669
Slot 00001: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 2}:
Receive endpoint call: Object (fromList [("tag",String "mint"),("value",Object (fromList [("unEndpointValue",Object (fromList [("unTokenName",String "ABC")]))]))])
Slot 00001: W2: TxSubmit: e53519b17bf7d11a148ce17ac0305330f138a684530ba08b1c57f714672b8c68
Slot 00001: TxnValidate e53519b17bf7d11a148ce17ac0305330f138a684530ba08b1c57f714672b8c68
Slot 00001: TxnValidate 691a5c0725ac09f79c8c45c899d732d26460d18c4c18167be71d55319bcd5669
Slot 00001: SlotAdd Slot 2
Slot 00002: ``` CONTRACT LOG: "forged Value (Map [(9d969e597d45fcd1732ce255e12a97599e883f924b4565fc3a2407bc08d34524,Map [(\"ABC\",1)])])"
Slot 00002: ``` CONTRACT LOG: "forged Value (Map [(913f220c3b1ba49531bae2fedd9edb138a8b360e7e605bfcf4ff3f2045433069,Map [(\"ABC\",1)])])"
Slot 00002: SlotAdd Slot 3
Final balances
Wallet 1: 
    {9d969e597d45fcd1732ce255e12a97599e883f924b4565fc3a2407bc08d34524, "ABC"}: 1
    {, ""}: 99999990
Wallet 2: 
    {913f220c3b1ba49531bae2fedd9edb138a8b360e7e605bfcf4ff3f2045433069, "ABC"}: 1
    {, ""}: 99999990
...
Wallet 10: 
    {, ""}: 100000000
```

Và bây giờ chúng tôi đã đúc một số NFT.
