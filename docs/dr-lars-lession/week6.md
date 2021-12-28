Week 06 - Oracles
=================

Ghi chú

Đây là phiên bản viết của [Bài giảng số 6](https://www.youtube.com/watch?v=X9fOkkpj-aU).

Trong bài giảng này, chúng ta học về oracles và sử dụng PAB (Plutus Application Backend).

Những ghi chú này sử dụng Plutus cam kết: 476409eaee94141e2fe076a7821fc2fcdec5dfcb


Tổng quat
--------

Trong bài giảng này, chúng ta sẽ xem xét một nghiên cứu điển hình, để xem làm thế nào những gì chúng ta đã học được cho đến nay có thể được biến thành một ứng dụng thực tế. Một bộ sưu tập các tệp thực thi thậm chí đi kèm với một giao diện người dùng nhỏ.

Nó sẽ là một dApp thực sự, ngoài việc chúng ta chưa có sẵn một blockchain thực sự. Điều này sẽ chạy trên một chuỗi khối mô phỏng - một chuỗi mô hình.

Ví dụ chúng ta sẽ sử dụng cho việc này là triển khai một tiên tri rất đơn giản.

Ghi chú

Trong thế giới blockchain, tiên tri là một cách để đưa thông tin thế giới thực vào blockchain, để làm cho nó có thể sử dụng được trong các hợp đồng thông minh.

Có rất nhiều ví dụ về các trường hợp sử dụng cho oracles. Chúng ta có thể nghĩ đến các nguồn dữ liệu bên ngoài như dữ liệu thời tiết, kết quả bầu cử, dữ liệu trao đổi chứng khoán hoặc sự ngẫu nhiên. Ví dụ, bạn có thể có một hợp đồng cá cược phụ thuộc vào kết quả của một trò chơi thể thao cụ thể.

Có nhiều cách khác nhau để thực hiện các câu chuyện thần thoại, với mức độ phức tạp khác nhau.

Chúng tôi sẽ sử dụng một cách tiếp cận rất đơn giản, nơi chúng tôi có một nhà cung cấp dữ liệu đáng tin cậy. Và, để làm ví dụ về dữ liệu, chúng tôi sẽ sử dụng tỷ giá hối đoái ADA / USD.

Có rất nhiều vấn đề với cách tiếp cận này, vì chúng ta phải tin tưởng vào nguồn dữ liệu. Có nhiều cách để giảm thiểu rủi ro nguồn dữ liệu không đáng tin cậy hoặc không đáng tin cậy. Ví dụ: chúng tôi có thể yêu cầu nhà cung cấp đưa ra một số tài sản thế chấp bị mất nếu dữ liệu không được cung cấp hoặc không chính xác. Hoặc, bạn có thể kết hợp nhiều câu thần chú thành một và chỉ chấp nhận kết quả nếu tất cả chúng đều đồng ý hoặc lấy giá trị trung bình hoặc giá trị trung bình của các nguồn khác nhau. Bạn cũng có thể nghĩ ra các cơ chế phức tạp hơn.

Như chúng ta đã biết, đối với bất kỳ điều gì xảy ra trên blockchain, phải có UTxO, vì vậy điều hiển nhiên cần làm là biểu thị nguồn cấp dữ liệu dưới dạng UTxO. UTxO nằm ở địa chỉ tập lệnh của oracle và trường dữ liệu của nó mang giá trị hiện tại của dữ liệu oracle.

![](img/week06__00000.png)

Và đây là nơi chúng tôi tìm ra vấn đề đầu tiên của mình. Như chúng ta đã lưu ý trước đây, xác thực chỉ xảy ra khi bạn muốn sử dụng thứ gì đó từ địa chỉ tập lệnh, chứ không phải khi bạn tạo đầu ra tại địa chỉ tập lệnh. Điều này có nghĩa là chúng tôi không thể ngăn cản bất kỳ ai tạo ra kết quả đầu ra tùy ý tại địa chỉ tập lệnh.

![](img/week06__00001.png)

Bằng cách nào đó, chúng ta cần phân biệt đầu ra oracle thực sự với các đầu ra khác có thể ở cùng một địa chỉ tập lệnh. Và cách chúng tôi làm điều này là đặt một NFT trên đầu ra. Vì một NFT chỉ có thể tồn tại một lần nên chỉ có thể có một UTxO tại địa chỉ tập lệnh chứa NFT.

![](img/week06__00002.png)

Làm thế nào một lời tiên tri như vậy có thể được sử dụng?

Ở đây chúng ta đến với một cái gì đó mà chúng ta chưa từng thấy trước đây. Trong tất cả các hợp đồng và trình xác thực viết mã của chúng tôi, chúng tôi luôn biết trước toàn bộ API. Trong trường hợp của một nhà tiên tri, điều này là khác nhau. Tại thời điểm mà một tiên tri được tạo ra, bạn không biết mọi người có thể muốn sử dụng nó như thế nào. Nó phải giống như một API mở, có thể hoạt động với các hợp đồng thông minh chưa được thiết kế.

Ví dụ về trường hợp sử dụng có thể sử dụng oracle cụ thể này, chúng ta hãy xem xét một hợp đồng hoán đổi trong đó, tại địa chỉ hoán đổi, ai đó có thể gửi ADA và sau đó người khác có thể lấy những ADA đó để đổi lấy USD.

![](img/week06__00003.png)

Tất nhiên, chúng ta không có USD trực tiếp trên blockchain, nhưng chúng ta có thể tưởng tượng rằng chúng được đại diện bởi một số mã thông báo gốc.

Trong ví dụ này, vì giá trị của oracle là 1,75, thì nếu ai đó cung cấp 100 ADA, giá cho điều đó sẽ là 175 USD.

Ngoài ra, chúng tôi cần một động lực để tiên tri cung cấp dữ liệu, bởi vì ngoài các chi phí khác để cung cấp dữ liệu, thì ở mức tối thiểu họ sẽ phải trả phí để tạo UTxO.

Vì vậy, giả sử rằng nhà cung cấp oracle xác định một khoản phí 1 ADA phải trả mỗi khi oracle được sử dụng.

Trong ví dụ này, điều đó có nghĩa là người muốn ADA sẽ phải trả 175 USD cho người bán ADA và 1 ADA cho nhà tiên tri.

Giao dịch sẽ như thế nào?

![](img/week06__00004.png)

Trước hết, logic xác thực hoán đổi sẽ cần quyền truy cập vào giá trị oracle hiện tại, có nghĩa là UTxO oracle phải là đầu vào cho giao dịch.

Sau đó, chúng ta có logic xác thực tiên tri. Trong trường hợp này, chúng tôi muốn sử dụng tiên tri. Vì vậy, giả sử chúng ta có một công cụ đổi quà được gọi là sử dụng . Bây giờ, trình xác thực tiên tri phải kiểm tra một số thứ.

1.  NFT có trong đầu vào được tiêu thụ không?
2.  Có đầu ra từ giao dịch tại cùng một địa chỉ có chứa cùng một NFT không?
3.  IGiá trị trong UTxO đầu ra có giống với giá trị đầu vào không?
4.  Phí có phải không?

Bây giờ chúng ta có thể hoàn thành giao dịch.

Chúng tôi sử dụng hai đầu vào bổ sung - phí do người mua trả và 100 ADA do người bán đặt cọc. Sau đó, chúng tôi có hai đầu ra bổ sung - 175 USD cho người bán và 100 ADA cho người mua. Và đối với những đầu vào và đầu ra mới này, người xác nhận hoán đổi có trách nhiệm đảm bảo rằng nó chính xác. Trong khi đó, trình xác nhận tiên tri chỉ quan tâm đến việc đảm bảo rằng mọi thứ liên quan đến tiên tri là chính xác.

![](img/week06__00005.png)

Chỉ cần nhấn mạnh, hợp đồng hoán đổi này chỉ là một ví dụ. Nhà tiên tri phải có khả năng làm việc với nhiều hợp đồng thông minh khác nhau muốn sử dụng dữ liệu của nó.

Nếu đây là tất cả, thì chúng ta sẽ không cần một lời tiên tri. Nếu giá trị đã được cố định, để nó luôn là 1,75 thì chúng tôi có thể chỉ cần mã hóa giá trị này vào hợp đồng của mình. Vì vậy, giá trị phải có thể thay đổi. Ít nhất, trong một ví dụ chẳng hạn như ví dụ này, nơi chúng ta có một tỷ giá hối đoái, tất nhiên, có thể thay đổi theo thời gian. Có thể có các ví dụ khác như kết quả của một trận đấu thể thao, trong đó nó là một sự kiện kỳ ​​lạ trong lịch sử, nhưng trong trường hợp này, điều quan trọng là nó có thể thay đổi.

Điều này có nghĩa là trình xác thực oracle, ngoài việc sử dụng Redeemer, phải có khả năng hỗ trợ một hoạt động khác mà nhà cung cấp oracle thực sự có thể thay đổi dữ liệu.

Vì vậy, giả sử giá trị thay đổi từ 1,75 thành 1,77.

Chúng tôi biết rằng trên blockchain UTxO (E), không có gì thay đổi, vì vậy bạn không thể thay đổi dữ liệu của UTxO hiện có. Tất cả những gì bạn có thể làm là sử dụng UTxO và sản xuất UTxO mới.

Chúng tôi sẽ có một giao dịch sử dụng Redeemer bản cập nhật . Logic xác nhận hơi khác. Nó giống như trước đây ở chỗ NFT cần phải có mặt trong đầu vào oracle đã tiêu thụ, và cũng cần có mặt trong đầu ra mới. Ngoài ra, giao dịch phải được ký bởi nhà cung cấp oracle. Và, chúng tôi có thể sử dụng giao dịch cập nhật này như một cơ hội để nhà cung cấp oracle thu phí.

Chúng tôi nhấn mạnh rằng NFT có trong đầu ra, nhưng chúng tôi không nói gì về các giá trị khác. Tất cả các khoản phí do các giao dịch khác sử dụng dữ liệu oracle này có thể được thu trong quá trình cập nhật giao dịch.

![](img/week06__00006.png)

### Bản tóm tắt

Tóm lại, chúng tôi đại diện cho tiên tri bởi một UTxO và xác định UTxO chính xác bằng một NFT. Giá trị oracle là dữ liệu của UTxO. Chúng tôi hỗ trợ hai hoạt động.

Một là sử dụng sử dụng tiên tri trong một số giao dịch tùy ý. Các sử dụng validator sẽ đảm bảo rằng các đầu vào oracle tiêu thụ mang NFT, rằng có một đầu ra mà lại mang NFT, không làm thay đổi dữ kiện, và mang phí bổ sung.

Thao tác thứ hai là cập nhật chỉ có thể được thực hiện bởi nhà cung cấp oracle. Đối với một giao dịch cập nhật , đầu vào oracle lại phải mang NFT, phải có đầu ra oracle cũng mang NFT. Không có hạn chế nào nữa. Số liệu có thể thay đổi và phí tích lũy có thể được lấy ra.

Oracle Core
-----------

Bây giờ chúng ta biết nó hoạt động như thế nào, hãy xem một số đoạn mã.

### On-chain

Đầu tiên, hãy xem mã Plutus tự thực thi oracle.

``` {.haskell}
module Week06.Oracle.Core
```

The oracle sẽ là một hợp đồng được tham số hóa và nó sẽ phụ thuộc vào bốn trường.

``` {.haskell}
data Oracle = Oracle
    { oSymbol   :: !CurrencySymbol
    , oOperator :: !PubKeyHash
    , oFee      :: !Integer
    , oAsset    :: !AssetClass
    } deriving (Show, Generic, FromJSON, ToJSON, Prelude.Eq, Prelude.Ord)    
```

-   `oSymbol`  là biểu tượng tiền tệ của NFT được sử dụng để xác định giao dịch. Chúng tôi không cần tên mã thông báo vì chúng tôi sẽ chỉ sử dụng chuỗi trống làm tên mã thông báo.
-   `oOperator`  là chủ sở hữu của oracle - hàm băm của chủ sở hữu khóa công khai có thể thực hiện cập nhật
    
-   `oFee`  là khoản phí trong tình yêu phải trả mỗi khi sử dụng oracle
-   `oAsset`  đại diện cho loại tài sản mà chúng tôi muốn trao đổi tỷ giá so với Ada, trong trường hợp của chúng tôi sẽ là một số loại mã thông báo USD

Redeemer sẽ hỗ trợ hai hoạt động.

``` {.haskell}
data OracleRedeemer = Update | Use
    deriving Show

PlutusTx.unstableMakeIsData ''OracleRedeemer
```

Chúng ta cần xác định lớp tài sản NFT. Như đã đề cập, chúng ta sẽ sử dụng chuỗi trống cho tên mã thông báo.

``` {.haskell}
{-# INLINABLE oracleTokenName #-}
oracleTokenName :: TokenName
oracleTokenName = TokenName emptyByteString
```

Các `oracleAsset` sẽ được sử dụng để xác định các NFT - đây không phải là `oAsset` định nghĩa ở trên.

``` {.haskell}
{-# INLINABLE oracleAsset #-}
oracleAsset :: Oracle -> AssetClass
oracleAsset oracle = AssetClass (oSymbol oracle, oracleTokenName)
```

Chúng tôi tạo một hàm trợ giúp nhỏ gọi là `oracleValue` . Điều này nhận một giao dịch đầu ra và một hàm tìm kiếm dữ liệu, sau đó trả về một Số nguyên . Các Integer đại diện cho tỷ giá hối đoái (ví dụ 1,75) nhân với một triệu. Điều này tránh những phức tạp có thể xảy ra khi sử dụng số thực.

``` {.haskell}
{-# INLINABLE oracleValue #-}
oracleValue :: TxOut -> (DatumHash -> Maybe Datum) -> Maybe Integer
oracleValue o f = do
    dh      <- txOutDatum o
    Datum d <- f dh
    PlutusTx.fromData d
```

Hàm này là một ví dụ về tính toán monadic trong monad. nó không phải là `IO`  hoặc `Contract monad`. Đầu tiên chung ta gọi `txOutDatum`, Nó không thành công nếu đâu ra không có datum. Nếu nó thành công, chúng tôi nhận được một băm datum mà chúng tôi có thể tham chiếu trong đó `dh`.  Tiếp theo, chúng tôi sử dụng hàm  `f`  được cung cấp làm đối số thứ hai để có thể biến băm dữ liệu này thành một dữ liệu. Điều này cũng có thể thất bại. Nếu nó thành công, chúng tôi có thể tham khảo kết quả trong `d`. `Datum`  chỉ là một trình bao bọc kiểu mới xung quanh `Data`,vì vậy sau đó chúng ta có thể sử dụng `PlutusTx.fromData`  để có thể biến `d`  thành `Integer`.Một lần nữa, điều này có thể không thành công, bởi vì ngay cả khi dữ liệu ở đó, nó có thể không được chuyển đổi thành giá trị số nguyên.

Chúng ta sẽ thấy chúng ta sử dụng hàm `oracleValue`  ở đây trong giây lát.

Chức năng quan trọng nhất là  `mkOracleValidator`.

``` {.haskell}
{-# INLINABLE mkOracleValidator #-}
mkOracleValidator :: Oracle -> Integer -> OracleRedeemer -> ScriptContext -> Bool
mkOracleValidator oracle x r ctx =
    traceIfFalse "token missing from input"  inputHasToken  &&
    traceIfFalse "token missing from output" outputHasToken &&
    case r of
        Update -> traceIfFalse "operator signature missing" (txSignedBy info $ oOperator oracle) &&
                  traceIfFalse "invalid output datum"       validOutputDatum
        Use    -> traceIfFalse "oracle value changed"       (outputDatum == Just x)              &&
                  traceIfFalse "fees not paid"              feesPaid
  where
    info :: TxInfo
    info = scriptContextTxInfo ctx

    ownInput :: TxOut
    ownInput = case findOwnInput ctx of
        Nothing -> traceError "oracle input missing"
        Just i  -> txInInfoResolved i

    inputHasToken :: Bool
    inputHasToken = assetClassValueOf (txOutValue ownInput) (oracleAsset oracle) == 1

    ownOutput :: TxOut
    ownOutput = case getContinuingOutputs ctx of
        [o] -> o
        _   -> traceError "expected exactly one oracle output"

    outputHasToken :: Bool
    outputHasToken = assetClassValueOf (txOutValue ownOutput) (oracleAsset oracle) == 1

    outputDatum :: Maybe Integer
    outputDatum = oracleValue ownOutput (`findDatum` info)

    validOutputDatum :: Bool
    validOutputDatum = isJust outputDatum

    feesPaid :: Bool
    feesPaid =
      let
        inVal  = txOutValue ownInput
        outVal = txOutValue ownOutput
      in
        outVal `geq` (inVal <> Ada.lovelaceValueOf (oFee oracle))
```

Hàm `mkOracleValidator`  nhận 4 tham số: `Oracle`,
trong ví dụ này `datum`  là `Integer`, `redeemer` là
`OracleRedeemer`  và cuối cùng là `ScriptContext`.

Có hai trường hợp cho trình xác thực này - `use` và `update` - nhưng có những điểm tương đồng. Trong cả hai trường hợp, chúng tôi muốn kiểm tra xem chúng tôi có đầu vào chứa NFT và có đầu ra chứa NFT không.

Vì cả hai việc kiểm tra này đều cần được thực hiện bất kể trường hợp sử dụng nào, nên chúng được thực hiện trước.

``` {.haskell}
...
traceIfFalse "token missing from input"  inputHasToken  &&
traceIfFalse "token missing from output" outputHasToken &&
...    
```

Sau đó, chúng tôi xem xét trường hợp sử dụng mà chúng tôi đang xử lý.

``` {.haskell}
case r of
    Update -> traceIfFalse "operator signature missing" (txSignedBy info $ oOperator oracle) &&
              traceIfFalse "invalid output datum"       validOutputDatum
    Use    -> traceIfFalse "oracle value changed"       (outputDatum == Just x)              &&
              traceIfFalse "fees not paid"              feesPaid    
```

Trước khi xem xét hàm `inputHasToken`, có một chức năng trợ giúp khác cần xem xét

``` {.haskell}
ownInput :: TxOut
ownInput = case findOwnInput ctx of
    Nothing -> traceError "oracle input missing"
    Just i  -> txInInfoResolved i
```

Hàm `ownInput`  trả về `TxOut`  Mà nó đang có gắng tiêu thụ, trong trường hợp này là oracle output. Trường hợp `Nothing`  có thể sẩy ra nếu ra nếu chúng ta đang ở trong một context khác, chẳng hạn như context đúc, vì vậy tình huống này sẽ không xảy ra cho chúng ta. Hàm `findOwnInput` được cung cấp bởi Plutus và sẽ nhận context, sau đó tìm các đầu vào liên quan. Hàm `txInInfoResolved`  nhận `TxOut`  từ `TxInInfo`.

Hàm `inputHashToken`  kiểm tra token hiện tại. Nó sử dụng hàm `assetClassValueOf`  để tìm kiếm NFT trong phản hồi `ownInput`.

``` {.haskell}
inputHasToken :: Bool
inputHasToken = assetClassValueOf (txOutValue ownInput) (oracleAsset oracle) == 1
```

Hàm trợ giúp tiếp theo, `ownOutput` kiểm tra xem chúng có chính xác một đầu ra hay không và trả lại đầu ra đó cho chúng.

``` {.haskell}
ownOutput :: TxOut
ownOutput = case getContinuingOutputs ctx of
    [o] -> o
    _   -> traceError "expected exactly one oracle output"    
```

Chúng ta có thể sử dụng hàm trợ giúp `outputHasToken`  giống như hàm `inputHashToken`.

``` {.haskell}
outputHasToken :: Bool
outputHasToken = assetClassValueOf (txOutValue ownOutput) (oracleAsset oracle) == 1
```

Điều đó bao gồm mã cho các trường hợp phổ biến. Bây giờ, hãy xem mã cụ thể cho trường hợp `update`.

Có hai điều kiện để kiểm tra. Đầu tiên là nhà điều hành đã thực sự ký kết giao dịch. Điều này rất đơn giản nên chúng ta có thể thực hiện nó on-chain mà không cần hàm trợ giúp.

``` {.haskell}
traceIfFalse "operator signature missing" (txSignedBy info $ oOperator oracle)
```

Điều tiếp theo cần kiểm tra là dữ liệu đầu ra. Chúng tôi biết rằng giá trị có thể thay đổi, nhưng chúng tôi cần kiểm tra xem ít nhất nó có phải là kiểu đúng hay không.

``` {.haskell}
traceIfFalse "invalid output datum" validOutputDatum
```

Và đối với điều này, chúng tôi đã tham chiếu đến một hàm trợ giúp mới `validOutputDatum`, chính nó sử dụng một hàm trợ giúp `outputDatum`.

``` {.haskell}
outputDatum :: Maybe Integer
outputDatum = oracleValue ownOutput (`findDatum` info)    

validOutputDatum :: Bool
validOutputDatum = isJust outputDatum
```

Chú ý
-----

Nếu bạn tra cứu `findDatum`  trong REPL, Bạn sẽ thấy có một loại này `DatumHash -> TxInfo -> Maybe Datum`. Vì chúng ta đang sử dụng infix ở đây, Chúng ta có thể chuyển vào `info`  dưới dạng tham số duy nhất, và điều này sẽ dẫn đến toàn bộ biểu thức có kiểu `DatumHash -> Maybe Datum`, là kiểu mà chúng ta cần chuyển vào`oracleValue`.


Điều này hoạt động bằng cách cố gắng lấy giá trị dữ liệu từ băm dữ liệu và sau đó cố gắng tạo giá trị oracle từ nó. Nếu thành công, nó sẽ trả về `Just Integer`, ngược lại nó sẽ trả về `Nothing`, vì vậy hàm `validOutputDatum`  chỉ cần kiểm tra xem giá trị trả về có phải `Nothing`,hay là `Just`.

Lưu ý rằng chúng tôi không kiểm tra bất kỳ điều gì về giá trị của `Integer`. Giá trị này thậm chí có thể giữ nguyên như giá trị đầu vào, nếu giao dịch được sử dụng chỉ để thu phí đã tích lũy từ việc sử dụng oracle.

Trường hợp thứ hai cho `mkOracleValidator`  là trường hợp `use`. Trường hợp này ai cũng có thể sử dụng được nhưng hạn chế hơn rất nhiều.

Đầu tiên, chúng tôi không cho phép giá trị thay đổi. Vì vậy, đây là điều kiện đầu tiên.

``` {.haskell}
traceIfFalse "oracle value changed" (outputDatum == Just x)
```

Chúng tôi đã viết hàm trợ giúp `outputDatum`. Thay vì chỉ kiểm tra xem nó có phải là `Integer` hay không , ở đây chúng ta cũng kiểm tra xem giá trị đầu ra của nó có giống với giá trị đầu vào hay không.

Và cuối cùng, chúng ta phải kiểm tra xem các khoản phí đã được thanh toán hay chưa. Và đối với điều này, chúng tôi sử dụng một chức năng trợ giúp mới được gọi là `feesPaid`.

``` {.haskell}
feesPaid :: Bool
feesPaid =
  let
    inVal  = txOutValue ownInput
    outVal = txOutValue ownOutput
  in
    outVal `geq` (inVal <> Ada.lovelaceValueOf (oFee oracle))    
```

Hàm `feesPaid` kiểm tra giá trị đầu ra ít nhất bằng giá trị đầu vào cộng với phí bắt buộc. Chúng tôi lại sử dụng toán tử  `<>` để cộng thêm fee vào giá trị đầu vào. Chúng tôi có thể đã sử dụng bằng (eq) thay vì lớn hơn hoặc bằng (geq). Việc sử dụng `geq`  ho phép người dùng oracle đưa cho nhà cung cấp oracle một mẹo, nếu họ muốn dùng.

Vì vậy, đây về cơ bản là logic cốt lõi của oracle như được thể hiện trong sơ đồ sau.

![](img/week06__00006.png)

Bây giờ chúng ta có boilerplate của chúng ta. Đặc biệt lưu ý rằng chúng tôi sử dụng mẫu mà chúng tôi cần cho trình xác thực được tham số hóa.

``` {.haskell}
data Oracling
instance Scripts.ScriptType Oracling where
    type instance DatumType Oracling = Integer
    type instance RedeemerType Oracling = OracleRedeemer

oracleInst :: Oracle -> Scripts.ScriptInstance Oracling
oracleInst oracle = Scripts.validator @Oracling
    ($$(PlutusTx.compile [|| mkOracleValidator ||]) `PlutusTx.applyCode` PlutusTx.liftCode oracle)
    $$(PlutusTx.compile [|| wrap ||])
where
    wrap = Scripts.wrapValidator @Integer @OracleRedeemer

oracleValidator :: Oracle -> Validator
oracleValidator = Scripts.validatorScript . oracleInst

oracleAddress :: Oracle -> Ledger.Address
oracleAddress = scriptAddress . oracleValidator
```

Và điều này kết thúc phần on-chain của mã oracle.

### Off-chain

Chúng tôi cũng tạo một số mã ngoài chuỗi, cụ thể là để bắt đầu tiên tri và cập nhật nó. Tuy nhiên, chúng tôi không viết mã off-chain cho useoracle. Đó không phải là trách nhiệm của tác giả của hợp đồng này. Đó sẽ là trách nhiệm của người muốn sử dụng oracle - họ sẽ viết mã để tạo giao dịch với người đổi use. Đây là lần đầu tiên chúng tôi thấy trường hợp chúng tôi có một số mã trong chuỗi không được ghép nối với một số mã ngoài chuỗi.

#### Starting the Oracle

Để bắt đầu oracle, chúng ta cần một số tham số.

``` {.haskell}
data OracleParams = OracleParams
    { opFees   :: !Integer
    , opSymbol :: !CurrencySymbol
    , opToken  :: !TokenName
    } deriving (Show, Generic, FromJSON, ToJSON)    
```

 `opFees`  tham số đại diện cho số phí lovelace đó sẽ được tính vào sử dụng oracle.

Tham số `opSymbol`  và `opToken`  đại diện cho token 
mà chúng tôi đang cung cấp tỷ giá hối đoái Ada, trong trường hợp này là token USD.

Đầu tiên, chúng tôi tạo một hàm `startOracle`, có trách nhiệm tạo ra NFT sẽ được sử dụng để xác định UTxO oracle. Các hàm`startOracle`  này sẽ không cung cấp một giá trị ban đầu cho oracle, điều này sẽ được xử lý bởi các hàm `updateOracle` . Lý do cho điều này là, nếu chúng tôi cung cấp một giá trị ban đầu, nó có thể bị lỗi thời vào thời điểm NFT được đúc.

Chúng tôi có thể đã sử dụng cùng một mã để đúc NFT như chúng tôi đã sử dụng trong bài giảng 5. Điều này sẽ hoạt động hoàn toàn tốt.

Tuy nhiên, đây là một mô-đun tiền tệ được cung cấp trong `plutus-use-cases` cái mà cung cấp hàm `forgeContract`  cho phép tạo NFT

Đây là hàm `forgeContract`  hiện thị trong REPL.

``` {.}
Prelude Week06.Oracle.Core> :t Plutus.Contracts.Currency.forgeContract
Plutus.Contracts.Currency.forgeContract
  :: (row-types-1.0.1.0:Data.Row.Internal.AllUniqueLabels
        (Plutus.Contract.Schema.Input s),
      row-types-1.0.1.0:Data.Row.Internal.AllUniqueLabels
        (Plutus.Contract.Schema.Output s),
      Plutus.Contracts.Currency.AsCurrencyError e,
      (Plutus.Contract.Schema.Input s
       row-types-1.0.1.0:Data.Row.Internal..! "tx-confirmation")
      ~ Plutus.Contract.Effects.AwaitTxConfirmed.TxConfirmed,
      (Plutus.Contract.Schema.Input s
       row-types-1.0.1.0:Data.Row.Internal..! "tx")
      ~ Plutus.Contract.Effects.WriteTx.WriteTxResponse,
      (Plutus.Contract.Schema.Output s
       row-types-1.0.1.0:Data.Row.Internal..! "tx")
      ~ Ledger.Constraints.OffChain.UnbalancedTx,
      (Plutus.Contract.Schema.Output s
       row-types-1.0.1.0:Data.Row.Internal..! "tx-confirmation")
      ~ Plutus.V1.Ledger.TxId.TxId) =>
     Plutus.V1.Ledger.Crypto.PubKeyHash
     -> [(Plutus.V1.Ledger.Value.TokenName, Integer)]
     -> Plutus.Contract.Types.Contract
          w s e Plutus.Contracts.Currency.OneShotCurrency
```

Phần quan trọng bắt đầu về phía cuối, nơi mà tham số đầu tiên - của kiểu `PubKeyHash`  - được định nghĩa. Đây là băm của khóa công khai của người nhận NFT.

Hàm `forgeContract`  ung cấp chức năng tổng quát hơn hợp đồng NFT trước của chúng tôi. Nó cho phép tạo nhiều NFT trong một lần. Nó sẽ tạo ra một ký hiệu tiền tệ chỉ có thể được sử dụng một, tương tự như NFT của chúng tôi từ lần trước, vì vậy chỉ có thể có một giao dịch đúc tiền. Nhưng đối với một biểu tượng tiền tệ, bạn có thể đúc nhiều mã thông báo khác nhau trong cùng một giao dịch, với nhiều tên mã thông báo khác nhau và với số lượng khác nhau. Tham số thứ hai cho phép chúng tôi xác định các tên và số lượng mã thông báo này.

Và nó cho chúng ta một `Contract`  nó trả về một gia trị kiểu `OneShotCurrency`. Loại này dành riêng cho tiền tệ và nó không thực sự quan trọng đối với chúng tôi. Tất cả những gì quan trọng đối với chúng tôi là chúng tôi có thể lấy lại biểu tượng tiền tệ từ nó.

Có một vấn đề nhỏ. Điều này không tương thích với những gì chúng tôi muốn. Chúng tôi muốn các loại này

``` {.haskell}
Contract w s Text Oracle
```

Một kiểu người viết tùy ý (vì chúng ta không sử dụng nó), một lược đồ tùy ý (miễn là chúng ta có `BlockChainActions` sẵn), `Text` thông báo lỗi và kiểu trả về `Oracle`.

Vấn đề là giá trị `Contract` trả về `forgeContract` không cho phép `Text` thông báo lỗi. Bạn có thể thấy điều này trong đầu ra chi tiết từ REPL - có một ràng buộc đối với tham số `e`.

``` {.haskell}
Plutus.Contracts.Currency.AsCurrencyError e,
```

Thật không may là `Text` không thực hiện `AsCurrencyError`.

May mắn thay, có một hàm có thể trợ giúp

``` {.haskell}
Plutus.Contract.mapError
:: (e -> e')
   -> Plutus.Contract.Types.Contract w s e a
   -> Plutus.Contract.Types.Contract w s e' a
```

Với một `Contract`, nó cho phép chúng tôi tạo mới một `Contract`  với một loại thông báo lỗi mới.Điều đó được cung cấp, chúng tôi cung cấp một hàm chuyển đổi từ loại lỗi đầu tiên sang loại lỗi thứ hai.

Vì vậy, chúng ta hãy nhìn vào hàm `startOracle`.

``` {.haskell}
startOracle :: forall w s. HasBlockchainActions s => OracleParams -> Contract w s Text Oracle
startOracle op = do
    pkh <- pubKeyHash <$> Contract.ownPubKey
    osc <- mapError (pack . show) (forgeContract pkh [(oracleTokenName, 1)] :: Contract w s CurrencyError OneShotCurrency)
    let cs     = Currency.currencySymbol osc
        oracle = Oracle
            { oSymbol   = cs
            , oOperator = pkh
            , oFee      = opFees op
            , oAsset    = AssetClass (opSymbol op, opToken op)
            }
    logInfo @String $ "started oracle " ++ show oracle
    return oracle
```

Ở đây chúng ta thấy hàm chuyển đổi lỗi được cung cấp dưới dạng  `pack . show`.
Hàm `show`  chuyển đổi lỗi cho một `String`  và hàm `pack`
chuyển đổ một `String`  tới một kiểu `Data.Text`.

Tại thời điểm này `osc`  giữ  `OneShotCurrency`, Và chúng ta có thể sử dụng hàm `currencySymbol`  để lấy ký hiệu tiền tệ như`cs`.

Hàm `currencySymbol`  có kiểu:

``` {.haskell}
currencySymbol
      :: OneShotCurrency -> Plutus.V1.Ledger.Value.CurrencySymbol
```

và được sử dụng phù hợp

``` {.haskell}
let cs = Currency.currencySymbol osc
```

Bây giờ chúng tôi đã đúc NFT của mình và nó có ký hiệu tiền tệ `cs`. à bây giờ chúng ta có thể xây dựng giá trị tham số `Oracle`.

``` {.haskell}
oracle = Oracle
    { oSymbol   = cs
    , oOperator = pkh
    , oFee      = opFees op
    , oAsset    = AssetClass (opSymbol op, opToken op)
    }
```

lý do là `opSymbol`  và `opToken` được định nghĩa riêng trong kiểu `OracleParams`.  `op`  hỉ là điều này làm cho việc này trở nên dễ dàng hơn khi chúng ta sử dụng playground.

#### Updating the Oracle

Hàm `updateOracle`  là phức tạp hơn.

Chức năng này phải xử lý hai trường hợp. Cụ thể là trường hợp chúng tôi có một giá trị mà chúng tôi muốn cập nhật và trường hợp 2 chúng tôi mới bắt đầu tạo oracle và chúng tôi muốn tạo một giá trị lần đầu tiên.

Nó lấy các tham số oracle and `Integer` giá trị mà chúng tôi muốn có oracle giữ.

Đầu tiên, chúng tôi tạo một chức năng trợ giúp `findOracle`.

``` {.haskell}
findOracle :: forall w s. HasBlockchainActions s => Oracle -> Contract w s Text (Maybe (TxOutRef, TxOutTx, Integer))
findOracle oracle = do
    utxos <- Map.filter f <$> utxoAt (oracleAddress oracle)
    return $ case Map.toList utxos of
        [(oref, o)] -> do
            x <- oracleValue (txOutTxOut o) $ \dh -> Map.lookup dh $ txData $ txOutTxTx o
            return (oref, o, x)
        _           -> Nothing
  where
    f :: TxOutTx -> Bool
    f o = assetClassValueOf (txOutValue $ txOutTxOut o) (oracleAsset oracle) == 1
```

Muchj đích của `findOracle`  là để tra cứu UTxO oracle hiện có. Điều này có thể không thành công vì có thể không có tiên tri ở đó. Điều này sẽ xảy ra nếu chúng ta mới bắt đầu oracles và chưa tạo UTxO với giá trị oracle. Tuy nhiên, nếu chúng tôi tìm thấy nó, chúng tôi trả về một bộ ba chứa mã nhận dạng UTxO (TxOutRef), chính UTxO, chứa tất cả dữ liệu (TxOutTx) và giá trị oracle (tỷ giá hối đoái hiện tại do oracle nắm giữ). Các `Integer` chứa giá trị oracle được mã hóa cũng trong giá trị TxOutTx, nhưng chúng tôi thêm nó vào ba để làm cho nó dễ dàng hơn để làm việc với.

Điều đầu tiên chúng tôi làm là lấy tất cả các UTxO ở địa chỉ này. Nhưng chỉ một trong số này sẽ là thứ mà chúng tôi đang tìm kiếm - cái có chứa NFT.

Chúng tôi thực hiện điều này bằng cách sử dụng hàm `Map.filter`  nhận một hàm làm tham số, trong trường hợp này, trả về True cho UTxO nơi NFT hiện diện.

``` {.haskell}
utxos <- Map.filter f <$> utxoAt (oracleAddress oracle)
...
where
  f :: TxOutTx -> Bool
  f o = assetClassValueOf (txOutValue $ txOutTxOut o) (oracleAsset oracle) == 1    
```

Chúng ta sẽ kết thúc với một map `utxos` trống hoặc chứa một mục. Bây giờ, chúng ta phân biệt giữa hai trường hợp này.

``` {.haskell}
return $ case Map.toList utxos of
    [(oref, o)] -> do
        x <- oracleValue (txOutTxOut o) $ \dh -> Map.lookup dh $ txData $ txOutTxTx o
        return (oref, o, x)
    _           -> Nothing
```

Chúng tôi chuyển đổi bản đồ thành danh sách các bộ giá trị đại diện cho các cặp giá trị quan trọng của id giao dịch và chính các giao dịch.

Đối với trường hợp không có phần tử, chúng tôi sử dụng trường hợp _ để đại diện cho tất cả các trường hợp khác. Đây chỉ có thể là danh sách trống, nhưng trình biên dịch không biết điều đó.

Tuy nhiên, nếu chúng tôi đã tìm thấy UTxO, thì vì chúng tôi đã có id và giao dịch của nó, chúng tôi chỉ cần tìm `Integer` giá trị của nó . Phần này vẫn có thể sai. Mặc dù chúng tôi đã tìm thấy đúng UTxO, nhưng có thể có một số dữ liệu bị hỏng trong đó vì bất kỳ lý do gì.

Chúng tôi sử dụng hàm `oracleValue` mà chúng tôi cũng đã sử dụng để xác thực. Hàm này nhận một tham số `TxOut` theo sau là một tham số thứ hai là một hàm, được cung cấp một hàm băm dữ liệu sẽ trả về giá trị dữ liệu được liên kết.

Trong mã off-chain, chúng ta có thể sử dụng tham số hàm sau

``` {.haskell}
\dh -> Map.lookup dh $ txData $ txOutTxTx o
```

Đây `txData`  là một trường của giao dịch và nó là một map từ hàm băm datum. Chúng tôi nhận được giao dịch từ `txOutTxTx o`.

Nếu tất cả điều này thành công, khi nào sẽ trả về bộ ba `(oref, o, x)`,trong đó `x` là `Integer`  giá trị của oracle.

Bây giờ chúng ta đã viết hàm `findOracle`. húng ta có thể nhìn vào hàm `updateOracle`.

``` {.haskell}
updateOracle :: forall w s. HasBlockchainActions s => Oracle -> Integer -> Contract w s Text ()
updateOracle oracle x = do
    m <- findOracle oracle
    let c = Constraints.mustPayToTheScript x $ assetClassValue (oracleAsset oracle) 1
    case m of
        Nothing -> do
            ledgerTx <- submitTxConstraints (oracleInst oracle) c
            awaitTxConfirmed $ txId ledgerTx
            logInfo @String $ "set initial oracle value to " ++ show x
        Just (oref, o,  _) -> do
            let lookups = Constraints.unspentOutputs (Map.singleton oref o)     <>
                          Constraints.scriptInstanceLookups (oracleInst oracle) <>
                          Constraints.otherScript (oracleValidator oracle)
                tx      = c <> Constraints.mustSpendScriptOutput oref (Redeemer $ PlutusTx.toData Update)
            ledgerTx <- submitTxConstraintsWith @Oracling lookups tx
            awaitTxConfirmed $ txId ledgerTx
            logInfo @String $ "updated oracle value to " ++ show x
```

sau đó nhìn hàm `findOracle`  hàm trợ giúp, vì chúng ta sẽ cần ràng buộc này hai lần.

``` {.haskell}
let c = Constraints.mustPayToTheScript x $ assetClassValue (oracleAsset oracle) 1
```

Sau khi tìm kiếm tiên tri, có rất nhiều khả năng xảy ra - chúng tôi đã tìm thấy nó hoặc chúng tôi đã không.

Nếu chúng tôi không tìm thấy nó, thì chúng tôi đã bắt đầu tiên tri nhưng chúng tôi chưa cung cấp giá trị ban đầu. Đây là trường hợp đầu tiên. Và trong trường hợp này, tất cả những gì chúng ta phải làm là gửi một giao dịch tạo ra giá trị đầu tiên cho oracle.

``` {.haskell}
ledgerTx <- submitTxConstraints (oracleInst oracle) c
awaitTxConfirmed $ txId ledgerTx
logInfo @String $ "set initial oracle value to " ++ show x
```

Đây là cách sử dụng đầu tiên của hàm trợ giúp `c` . Nó cung cấp ràng buộc `mustPayToTheScript`  đảm bảo rằng giao dịch sẽ có đầu ra trả cho một địa chỉ tập lệnh. Là các đối số, nó lấy datum `x`  và NFT. Tập lệnh mà nó phải trả tiền luôn là tập lệnh nằm trong tiêu điểm - ở đây nó là tham số đầu tiên đến `submitTxConstraints`  - `(oracleInst oracle)`.

Sau đó chúng tôi chờ xác nhận và viết thông báo nhật ký. Và đây là tất cả những gì chúng ta cần làm cho trường hợp này.

Trong trường hợp khác, khi chúng tôi đã có một giá trị, chúng tôi cần tham chiếu đến các phần UTxO, nhưng chúng tôi không quan tâm đến dữ liệu hiện tại, vì chúng tôi vẫn sẽ cập nhật nó.

``` {.haskell}
Just (oref, o,  _) -> do
```

Bây giờ nó trở nên phức tạp hơn một chút, bởi vì bây giờ chúng ta cần hai điều kiện.

Ràng buộc đầu tiên cũng giống như trong trường hợp khác - ràng buộc được tham chiếu bởi hàm trợ giúp `c`. Nhưng bây giờ có một hạn chế bổ sung là chúng ta cũng phải sử dụng UTxO hiện có.

``` {.haskell}
tx = c <> Constraints.mustSpendScriptOutput oref (Redeemer $ PlutusTx.toData Update)
```

Hàm `mustSpendScriptOutput`  cơ bản là trái ngược với `mustPayToTheScript`. ItNó tạo ra một đầu vào cho địa chỉ tập lệnh này. Vì các tham số, nó có tham chiếu đến UTxO mà chúng ta muốn sử dụng, và nó cần một `Redeemer`. Trong trường hợp `Redeemer`  là `Update`  nó được chuyển đổi thành kiểu `Data`  trong Plutus.

Để điều này hoạt động, chúng tôi cần cung cấp một số tra cứu.

Nhằm mục đích tìm đầu ra `oref`  mà nó muốn chi tiêu, chúng ta phải sử dụng `unspentOutputs`  tra cứu và trong trường hợp này, chúng ta chỉ cung cấp tra cứu bằng một UTxO.

``` {.haskell}
Constraints.unspentOutputs (Map.singleton oref o)
```

Sau đó, chúng tôi phải cung cấp các phiên bản script. Chúng ta cần làm điều này hai lần, một lần cho phía đầu vào và một lần cho phía đầu ra. Đối với điều này, chúng tôi cung cấp phiên bản oracle và trình xác thực oracle.

``` {.haskell}
Constraints.scriptInstanceLookups (oracleInst oracle) <>
Constraints.otherScript (oracleValidator oracle)
```

Chúng tôi không cần cung cấp `scriptInstanceLookups`  tra cứu trong trường hợp đầu tiên, vì chúng tôi có thể chuyển `oracleInst oracle`  đến hàm `submitTxConstraints`. Tuy nhiên, với hàm `submitTxConstraintsWith` thì chúng ta không có tùy chọn đó.

Khi gửi giao dịch, chúng ta cần thúc đẩy trình biên dịch một chút để cho nó biết script mà chúng ta đang nói đến - để nó biết, chẳng hạn như The Script ở trong `mustPayToTheScript`.  Đối với điều này, chúng tôi tham khảo loại `Oracling`.

``` {.haskell}
ledgerTx <- submitTxConstraintsWith @Oracling lookups tx
```

Hy vọng rằng bây giờ chúng ta có một giao dịch hợp lệ được gửi đi, và sau đó chúng ta đợi nó được xác nhận và viết một số thông tin ghi nhật ký.

``` {.haskell}
awaitTxConfirmed $ txId ledgerTx
logInfo @String $ "updated oracle value to " ++ show x
```

Hãy nhớ rằng, chúng ta đã nói về việc thu phí trước đó. Điều này sẽ tự động xảy ra. Hàm `submitTxConstraintsWith` sẽ gửi phí đến ví của chính chúng ta. Nó làm được điều này bởi vì có sự mất cân bằng giữa giá trị gắn với đầu vào, bao gồm phí và NFT, và giá trị mà chúng tôi đã nói phải được trả cho tập lệnh, đó chỉ là NFT.

Quá trình này cũng sẽ tự động tạo thêm một đầu vào từ đầu vào của chính chúng ta để trả phí giao dịch cho việc thực hiện giao dịch.

Cuối cùng, chúng tôi cung cấp một chức năng kết hợp hai hoạt động này `startOracle` và `updateOracle` thành một hợp đồng. Điều này sẽ làm cho nó có thể được sử dụng trong sân chơi và `EmulatorTrace` monad, cũng như trong PAB.

``` {.haskell}
type OracleSchema = BlockchainActions .\/ Endpoint "update" Integer

runOracle :: OracleParams -> Contract (Last Oracle) OracleSchema Text ()
runOracle op = do
    oracle <- startOracle op
    tell $ Last $ Just oracle
    go oracle
  where
    go :: Oracle -> Contract (Last Oracle) OracleSchema Text a
    go oracle = do
        x <- endpoint @"update"
        updateOracle oracle x
        go oracle
```

Trước tiên hàm `runOracle`  khởi động oracle. sau đó, vì những lý do sẽ trở nên rõ ràng sau này, chúng tôi sử dụng `tell`  để viết tham số cho oracle. Chúng ta cần có khả năng giao tiếp giá trị tham số của oracle với thế giới bên ngoài, để mọi người có thể sử dụng oracle. Chúng tôi sẽ không biết cho đến khi chạy ký hiệu tiền tệ sẽ được sử dụng cho NFT, vì vậy chúng tôi chưa biết giá trị của tham số oracle.

Hãy nhớ rằng `tell`  mong đợi loại `Monoid`. Ví dụ điển hình là một danh sách các chuỗi được nối với một danh sách tất cả các thông báo nhật ký.

Nhưng nó không phải là danh sách. Trong `Data.Monoid` Chúng tôi có  `Last` Monoid.

``` {.haskell}
Prelude Week06.Oracle.Core> import Data.Monoid (Last (..))
Prelude Data.Monoid Week06.Oracle.Core> :i Last
type Last :: ` -> `
newtype Last a = Last {getLast :: Maybe a}
      -- Defined in ‘Data.Monoid’
instance Applicative Last -- Defined in ‘Data.Monoid’
instance Eq a => Eq (Last a) -- Defined in ‘Data.Monoid’
instance Functor Last -- Defined in ‘Data.Monoid’
instance Monad Last -- Defined in ‘Data.Monoid’
instance Monoid (Last a) -- Defined in ‘Data.Monoid’
instance Ord a => Ord (Last a) -- Defined in ‘Data.Monoid’
instance Semigroup (Last a) -- Defined in ‘Data.Monoid’
instance Show a => Show (Last a) -- Defined in ‘Data.Monoid’
instance Read a => Read (Last a) -- Defined in ‘Data.Monoid’
instance Traversable Last -- Defined in ‘Data.Traversable’
instance Foldable Last -- Defined in ‘Data.Foldable’
```

Chúng ta thấy rằng nó chỉ là một cái  `newtype`  bao bọc xung quanh `Maybe`.Vấn đề là cung cấp một ví dụ cụ thể `Monoid`. TÝ tưởng, như tên cho thấy, đó là một hoạt động đơn nguyên luôn ghi nhớ giá trị Just cuối cùng. 
Ví dụ:

``` {.haskell}
Prelude Data.Monoid Week06.Oracle.Core> Last (Just 'x') <> Last (Just 'y')
Last {getLast = Just 'y'}
```

Tuy nhiên, nếu cái thứ hai  `Last` là không có gì, nó sẽ trả về cái đầu tiên.

``` {.haskell}
Prelude Data.Monoid Week06.Oracle.Core> Last (Just 'x') <> Last Nothing
Last {getLast = Just 'x'}
```

Nếu cả hai đều `Nothing`, nó sẽ là `Nothing`.

`Last`  rất hữu ích vì nó cho phép chúng ta giữ nguyên trạng thái hiện tại. Giá trị của nhật ký về cơ bản sẽ là giá trị cuối cùng `Just` mà chúng tôi đã nói.

Trong hợp đồng này, chúng tôi sẽ chỉ làm điều đó một lần. Ban đầu nó sẽ như vậy `Last Nothing`. Sau đó, chúng tôi đúc NFT, và sau đó, khi chúng tôi nhận được giá trị oracle trong `runOracle`, và sau đó `tell` nó luôn là giá trị đó. Nếu các hợp đồng khác từ bên ngoài truy vấn trạng thái, chúng sẽ luôn nhận được `Just oracle`, vì vậy chúng sẽ có thể khám phá giá trị của oracle.

Vì vậy, tiếp theo trong `runOracle`, húng tôi gọi hàm trợ giúp `go`. Điều này là chặn endpoint update. Ngay sau khi ai đó cung cấp một `Integer` như là một giá trị mới, nó sẽ gọi hàm  `updateOracle` với một giá trị mới, sau đó lặp lại để cho phép người khác cập nhật oracle..

Tóm lại, `runOracle` khởi động `oracle`, `tell` là `oracle`, sau đó lặp lại để cho phép người khác cập nhật oracle.

Và điều đó kết thúc mã cho chính nhà tiên tri. Những gì hiện còn thiếu là một ví dụ, một hợp đồng thực sự sử dụng oracle - một hợp đồng hoán đổi. Và cũng sử dụng Plutus Application Backend để chạy mã này trong thế giới thực hoặc trong trường hợp của chúng tôi là trong một chuỗi khối mô phỏng.

Xác thực hoán đổi(Swap Validation)
---------------

Hợp đồng hoán đổi mẫu của chúng tôi có thể được tìm thấy trong:

``` {.haskell}
module Week06.Oracle.swap
```

Mục đích của hợp đồng này là để ai đó có thể ký gửi ADA và đổi nó lấy mã thông báo, trong trường hợp này là token mà chúng tôi sử dụng sẽ gọi là USDT là token USD.

Ý tưởng là giá, số lượng USDT sẽ được yêu cầu thanh toán cho ADA, sẽ được xác định bởi giá trị của oracle. Hãy nhớ rằng chúng tôi đang sử dụng một `Integer` để phản ánh tỷ giá hối đoái, với giá trị một triệu tương đương với một USDT.

Chúng ta sẽ bắt đầu với một hàm trợ giúp được gọi là `price`, với một số lovelace và tỷ giá hối đoái, sẽ trả về giá USDT.

``` {.haskell}
price :: Integer -> Integer -> Integer
price lovelace exchangeRate = (lovelace ` exchangeRate) `divide` 1000000
```

Tiếp theo là hàm trợ giưps `lovelaces`,  kết hợp với các hàm từ thư viện Plutus để trích xuất một số lovelace từ một kiểu `Value`.

``` {.haskell}
lovelaces :: Value -> Integer
lovelaces = Ada.getLovelace . Ada.fromValue    
```

Bây giờ chúng ta sẽ viết `mkSwapValidator`. Đây là một trình xác thực được tham số hóa với hai tham số.

Tham số đầu tiên là oracle mà chúng ta đang sử dụng. Để sử dụng điều này, chúng tôi nhập mô-đun oracle.

``` {.haskell}
import Week06.Oracle.core
```

Tham số thứ hai là địa chỉ của oracle. Thông thường, với oracle , chúng ta sẽ có thể tính toán địa chỉ từ nó. Trong mô-đun cốt lõi, chúng tôi đã thấy một hàm `oracleAddress` thực hiện điều này cho chúng tôi. Nhưng đây là một chức năng mà chúng tôi không thể sử dụng trong trình xác thực, vì nó không thể được biên dịch sang tập lệnh Plutus. Vì vậy, ở đây, chúng tôi đưa địa chỉ một cách rõ ràng cho trình xác thực.

Đối với dữ liệu, chúng tôi sử dụng mã băm khóa công khai của người bán. Chúng tôi không sử dụng công cụ đổi quà, vì vậy chúng tôi cung cấp cho nó một loại `Unit`.

Chúng tôi nhớ lại từ sơ đồ, giao dịch hoán đổi phải có ba đầu vào và ba đầu ra.

![](img/week06__00006.png)

  -----------------------------------------------------------------------
  Inputs                              Outputs
  ----------------------------------- -----------------------------------
 Oracle, Để kiểm tra Oracle hiện tại, cái mà chúng ta không cần xem xét tỷ giá hối đoái trong xác nhận hoán đổi

UTxO hoán đổi giữ các token lovelace của người bán                            

  The source of the buyer\'s funds    The lovelace for the buyer
  -----------------------------------------------------------------------

Hoán đổi đầu vào đầu ra giao dịch:

Lưu ý rằng chúng ta không cần phải lo lắng về oracle như một đầu ra. Trình xác thực oracle sẽ đảm bảo rằng giá trị không bị thay đổi và các khoản phí được thêm vào.

Chúng tôi cũng muốn hỗ trợ trường hợp sử dụng thứ hai, trường hợp người bán có thể lấy token ADA trong trường hợp họ không muốn thực hiện hoán đổi nữa. Nếu chúng tôi không hỗ trợ trường hợp này, ADA có thể bị khóa ở đó mãi mãi, nếu không ai quyết định thực hiện hoán đổi.

Trường hợp thứ hai này là điều kiện chúng tôi kiểm tra trong trình xác thực. Nếu người bán tự mình ký vào giao dịch, thì không có bất kỳ ràng buộc nào nữa - chúng tôi không cần kiểm tra oracle hay bất cứ thứ gì khác - người bán chỉ có thể lấy lại lovelace của họ.

``` {.haskell}
mkSwapValidator :: Oracle -> Address -> PubKeyHash -> () -> ScriptContext -> Bool
mkSwapValidator oracle addr pkh () ctx =
    txSignedBy info pkh ||
...            
```

Trường hợp thú vị hơn là trường hợp thứ hai, nơi chúng tôi kiểm tra hai điều kiện.

Đầu tiên, phải có hai đầu vào - oracle và UTxO hoán đổi. Tất cả các đầu vào bổ sung (tiền của người mua) phải là đầu vào khóa công khai. Điều này là do chúng tôi không muốn lo lắng về việc can thiệp vào các hợp đồng thông minh khác.

Thứ hai, chúng tôi muốn kiểm tra xem người bán có được thanh toán hay không.

``` {.haskell}
(traceIfFalse "expected exactly two script inputs" hasTwoScriptInputs &&
 traceIfFalse "price not paid"                     sellerPaid)    
```

Bây giờ, chúng ta có các định nghĩa về hàm trợ giúp của chúng ta.

Đầu tiên:

``` {.haskell}
info :: TxInfo
info = scriptContextTxInfo ctx
```

Sau đó, chúng ta phải dùng `oracleInput`  để lấy UTxO từ oracle.

``` {.haskell}
oracleInput :: TxOut
oracleInput =
  let
    ins = [ o
          | i <- txInfoInputs info
          , let o = txInInfoResolved i
          , txOutAddress o == addr
          ]
  in
    case ins of
        [o] -> o
        _   -> traceError "expected exactly one oracle input"
```

Chúng tôi thực hiện điều này bằng cách lấy danh sách tất cả các đầu vào. Đối với điều này, chúng tôi sử dụng khả năng hiểu danh sách, cho phép chúng tôi lấy từ các danh sách khác bằng bộ lọc. Trong trường hợp này, chúng tôi lấy từ danh sách từ `txInfoInputs info`, đó là danh sách của `TxInfo`. Chúng tôi sử dụng hàm `txInInfoResolved`  để xem mỗi phần tử kiểu `TxOut`, sau đó chúng tôi so sánh với tham số `addr`. Danh sách kết quả sẽ trống hoặc sẽ có danh sách `TxOut` phù hợp với UTxO oracle.

Sau đó, chúng tôi kiểm tra xem có chính xác một phần tử trong danh sách kết quả hay không, và nếu có, chúng tôi trả về nó. Chúng tôi không trả lại danh sách, chỉ trả lại `TxOut`.

Điều này hiện đã cho chúng ta kết quả đầu ra kỳ diệu mà chúng ta đang sử dụng làm đầu vào.

Bây giờ, chúng tôi muốn kiểm tra tỷ giá hối đoái thực tế. Đối với điều đó, chúng tôi sử dụng hàm `oracleValue`   mà chúng tôi đã xác định trong mô-đun cốt lõi. Ở đây một lần nữa, nó có thể thành công, hoặc nó có thể thất bại. Nếu nó thành công, chúng tôi trả về giá trị.

``` {.haskell}
oracleValue' = case oracleValue oracleInput (`findDatum` info) of
    Nothing -> traceError "oracle value not found"
    Just x  -> x    
```

Chúng ta không cần kiểm tra xem oracle có chứa NFT hay không. Do cách thức hoạt động của xác thực đối với oracle, chúng ta biết rằng nó hiện diện..

Bây giờ, chúng ta hãy xem xét hàm trợ giúp `hasTwoScriptInputs`.

``` {.haskell}
hasTwoScriptInputs :: Bool
hasTwoScriptInputs =
  let
    xs = filter (isJust . toValidatorHash . txOutAddress . txInInfoResolved) $ txInfoInputs info
  in
    length xs == 2
```

Đầu tiên, chúng tôi lọc, sử dụng hàm tổng hợp

``` {.haskell}
(isJust . toValidatorHash . txOutAddress . txInInfoResolved)
```

Đọc từ phải sang trái, chúng ta nhận được UTxO từ đầu vào, sau đó chúng ta nhận được địa chỉ cho UTxO này, và chúng ta nhận được mã băm của trình xác thực cho địa chỉ đó. Cuối cùng, chúng ta kiểm tra xem nó có phải là đầu ra tập lệnh hay không, bằng cách xem nó có phải là `Just`. Nếu nó là  `Nothing`, thì điều này sẽ cho thấy rằng nó là một khóa công khai, không phải là một địa chỉ tập lệnh.

Sau đó, chúng tôi sử dụng hàm tổng hợp này như một bộ lọc dựa trên danh sách các `TxInInfos`. Và sau đó chúng tôi kiểm tra độ dài của danh sách kết quả là chính xác hai.

Quay trở lại các điều kiện xác thực của chúng ta, bây giờ chúng ta phải làm với việc kiểm tra xem người bán có được thanh toán hay không. Vì vậy, hãy viết hàm `sellerPaid` mà chúng ta đã tham chiếu.

Đối với điều này, chúng tôi sẽ sử dụng một hàm trợ giúp khác để xác định giá yêu cầu.

``` {.haskell}
minPrice :: Integer
minPrice =
  let
    lovelaceIn = case findOwnInput ctx of
        Nothing -> traceError "own input not found"
        Just i  -> lovelaces $ txOutValue $ txInInfoResolved i
  in
    price lovelaceIn oracleValue'    
```

Trước tiên, chúng tôi kiểm tra xem chúng tôi có một đầu vào hay không, và nếu có, chúng tôi trích xuất số lượng khoảng cách và gán số đó cho `lovelaceIn`. Sau đó, chúng tôi sử dụng hàm `price` để xác định giá bằng token USDT.

Bây giờ, chúng ta có thể định nghĩa hàm `sellerPaid`.

``` {.haskell}
sellerPaid :: Bool
sellerPaid =
  let
    pricePaid :: Integer
    pricePaid =  assetClassValueOf (valuePaidTo info pkh) (oAsset oracle)
  in
    pricePaid >= minPrice
```

Hàm `valuePaidTo`  này là từ các thư viện Plutus. Đã cho `info` và một băm khóa công khai, nó sẽ cộng tất cả các giá trị của tất cả các đầu ra khóa công khai đi đến địa chỉ này. Sau đó, chúng tôi sử dụng `assetClassValueOf` để kiểm tra thành phần của giá trị có trong mã thông báo USD và kiểm tra xem chúng tôi có ít nhất bao nhiêu tùy theo yêu cầu của chúng tôi.

Đó là chức năng cuối của phần chính trong mã trình xác thực hoán đổi. 

``` {.haskell}
data Swapping
instance Scripts.ScriptType Swapping where
    type instance DatumType Swapping = PubKeyHash
    type instance RedeemerType Swapping = ()

swapInst :: Oracle -> Scripts.ScriptInstance Swapping
swapInst oracle = Scripts.validator @Swapping
    ($$(PlutusTx.compile [|| mkSwapValidator ||])
        `PlutusTx.applyCode` PlutusTx.liftCode oracle
        `PlutusTx.applyCode` PlutusTx.liftCode (oracleAddress oracle))
    $$(PlutusTx.compile [|| wrap ||])
  where
    wrap = Scripts.wrapValidator @PubKeyHash @()

swapValidator :: Oracle -> Validator
swapValidator = Scripts.validatorScript . swapInst

swapAddress :: Oracle -> Ledger.Address
swapAddress = scriptAddress . swapValidator
```

Lưu ý rằng trong hàm `swapInst`, nơi chúng ta sử dụng hàm băm mẫu để tạo trình xác thực Plutus từ hàm `mkSwapValidator`, chúng tôi không cần chuyển địa chỉ oracle làm tham số. Điều này là do chúng tôi sẽ tính toán điều này bên trong hàm. Hãy nhớ rằng chúng ta không thể sử dụng hàm `oracleAddress`  bên trong trình xác thực Plutus.

Bây giờ để xác định một số hợp đồng.

### Chào hàng (offerSwap)

Đầu tiên `offerSwap`. Điều này dành cho người bán muốn đưa ra một số lượng nhất định để trao đổi.

``` {.haskell}
offerSwap :: forall w s. HasBlockchainActions s => Oracle -> Integer -> Contract w s Text ()
offerSwap oracle amt = do
    pkh <- pubKeyHash <$> Contract.ownPubKey
    let tx = Constraints.mustPayToTheScript pkh $ Ada.lovelaceValueOf amt
    ledgerTx <- submitTxConstraints (swapInst oracle) tx
    awaitTxConfirmed $ txId ledgerTx
    logInfo @String $ "offered " ++ show amt ++ " lovelace for swap"    
```

### findSwaps

Tiếp theo, một hàm trợ giúp sẽ tìm tất cả các hoán đổi thỏa mãn một vị thế nhất định. Nó cần một oracle cộng với một vị thế dựa trên hàm băm khóa công khai và trả về danh sách bộ ba UTxO thỏa mãn vị thế.

``` {.haskell}
findSwaps :: HasBlockchainActions s => Oracle -> (PubKeyHash -> Bool) -> Contract w s Text [(TxOutRef, TxOutTx, PubKeyHash)]
findSwaps oracle p = do
    utxos <- utxoAt $ swapAddress oracle
    return $ mapMaybe g $ Map.toList utxos
  where
    f :: TxOutTx -> Maybe PubKeyHash
    f o = do
        dh        <- txOutDatumHash $ txOutTxOut o
        (Datum d) <- Map.lookup dh $ txData $ txOutTxTx o
        PlutusTx.fromData d

    g :: (TxOutRef, TxOutTx) -> Maybe (TxOutRef, TxOutTx, PubKeyHash)
    g (oref, o) = do
        pkh <- f o
        guard $ p pkh
        return (oref, o, pkh)
```

Đầu tiên, chúng tôi nhận được danh sách tất cả các UTxO ở địa chỉ hợp đồng hoán đổi. Sau đó chúng tôi áp dụng `mapMaybe`  dành cho danh sách này.

``` {.haskell}
mapMaybe :: (a -> Maybe b) -> [a] -> [b]
```

Hàm này sẽ áp dụng hàm `(a -> Maybe b)`  cho từng phần tử trong danh sách `a` và tạo danh sách `Maybe b`, có thể chứa hỗn hợp của `Just` và `Nothing`. sau đó nó bỏ `Nothing`và chỉ để lại giá trị`Just`.

Để làm rõ điều này, hãy tưởng tượng chúng ta có một hàm trả về như `Just`  cho số chẵn và một `Nothing`  cho số lẻ.

``` {.haskell}
f (n :: Int) = if even n then Just (div n 2) else Nothing
```

Chúng ta có thể sử dụng thông số này làm tham số đầu tiên để lập `mapMaybe`

``` {.haskell}
Prelude Week06.Oracle.Core> import Data.Maybe
Prelude Data.Maybe Week06.Oracle.Core> mapMaybe f [2, 4, 10, 11, 13, 100]
[1,2,5,50]
```

Chung ta sử dụng `mapMaybe`  và hàm `g` để lọc danh sách các UTxO.

``` {.haskell}
g :: (TxOutRef, TxOutTx) -> Maybe (TxOutRef, TxOutTx, PubKeyHash)
g (oref, o) = do
    pkh <- f o
    guard $ p pkh
    return (oref, o, pkh)
```

Hàm này nhận một cặp giá trị khóa đại diện cho UTxO và trả về một bộ ba `Maybe` chứa các mục từ cặp cùng với `PubKeyHash`.

Hàm `g`  bên trong monad `Maybe`  và sử dụng hàm `f`,
cũng nằm bên trong monad `Maybe`. Hàm `f` lấy mã băm khóa công khai từ UTxO, nếu nó tồn tại. Sau đó, hàm  `g`  sử dụng hàm`guard`  cùng với thuộc tính `p`  tmà chúng ta chuyển vào làm   đối số.

Hàm `guard`  là hàm có sẵn trong monads, và monad `Maybe`  
cũng vậy. Nó nhận một boolean làm tham số, và nếu boolean là false, thì quá trình tính toán sẽ không thành công. Trong trường hợp này, false có nghĩa là quay trở lại `Nothing`. nếu là true, Nếu nó là sự thật, nó chỉ tiếp tục. Trong trường hợp này, điều đó có nghĩa là trả về  bộ ba `Just` chứa hàm băm khóa công khai. 

Chúng ta sẽ xem cách chúng ta sử dụng hàm `findSwaps`  một lát nữa.

### lấy lại Hoán đổi (retrieveSwaps)

Contract `retrieveSwaps`  là dành cho người bán nếu họ muốn thay đổi suy nghĩ của họ và nhận được Ada trở lại của họ.

Đây là nơi chúng tôi sử dụng hàm `findSwaps`. Chúng ta sử dụng nó với`(== pkh)` như là một thuộc tính, có nghĩa là chúng tôi muốn chỉ những UTxO ở địa chỉ hoán đổi thuộc về nhà điều hành.

``` {.haskell}
retrieveSwaps :: HasBlockchainActions s => Oracle -> Contract w s Text ()
retrieveSwaps oracle = do
    pkh <- pubKeyHash <$> ownPubKey
    xs <- findSwaps oracle (== pkh)
    case xs of
        [] -> logInfo @String "no swaps found"
        _  -> do
            let lookups = Constraints.unspentOutputs (Map.fromList [(oref, o) | (oref, o, _) <- xs]) <>
                          Constraints.otherScript (swapValidator oracle)
                tx      = mconcat [Constraints.mustSpendScriptOutput oref $ Redeemer $ PlutusTx.toData () | (oref, _, _) <- xs]
            ledgerTx <- submitTxConstraintsWith @Swapping lookups tx
            awaitTxConfirmed $ txId ledgerTx
            logInfo @String $ "retrieved " ++ show (length xs) ++ " swap(s)"
```

Nếu không có, thì không có gì để làm. Nếu có một số, chúng tôi xây dựng một giao dịch truy xuất tất cả chúng.

Để làm điều đó, chúng tôi tạo một danh sách các ràng buộc `mustSpendScriptOutput`.

``` {.haskell}
tx = mconcat [Constraints.mustSpendScriptOutput oref $ Redeemer $ PlutusTx.toData () | (oref, _, _) <- xs]
```

 Trông có vẻ đáng sợ, nhưng nó chỉ là trích xuất một danh sách các `oref` từ danh sách `xs`  và sử dụng nó để xây dựng một ràng buộc cho từng người trong số họ, sử dụng `Unit`  như là kiểu `Redeemer`. Hàm `mconcat` áp dụng  `Semigroup` toán tử `<>` trong toàn bộ danh sách để kết hợp chúng.

Khi tra cứu, chúng tôi phải cung cấp tất cả các UTxO và trình xác thực hoán đổi.

Chúng tôi có danh sách các UTxO trong `xs` và chúng tôi biến danh sách này thành danh sách các cặp và sau đó chúng tôi sử dụng `Map.fromList` để biến các cặp đó thành một bản đồ (map), sau đó chúng tôi áp dụng ràng buộc `unspentOutputs` .

### useSwaps

Và bây giờ là một trong những thú vị nhất `useSwaps`. Đây là nơi chúng tôi thực sự sử dụng oracle.

``` {.haskell}
useSwap :: forall w s. HasBlockchainActions s => Oracle -> Contract w s Text ()
useSwap oracle = do
    funds <- ownFunds
    let amt = assetClassValueOf funds $ oAsset oracle
    logInfo @String $ "available assets: " ++ show amt

    m <- findOracle oracle
    case m of
        Nothing           -> logInfo @String "oracle not found"
        Just (oref, o, x) -> do
            logInfo @String $ "found oracle, exchange rate " ++ show x
            pkh   <- pubKeyHash <$> Contract.ownPubKey
            swaps <- findSwaps oracle (/= pkh)
            case find (f amt x) swaps of
                Nothing                -> logInfo @String "no suitable swap found"
                Just (oref', o', pkh') -> do
                    let v       = txOutValue (txOutTxOut o) <> lovelaceValueOf (oFee oracle)
                        p       = assetClassValue (oAsset oracle) $ price (lovelaces $ txOutValue $ txOutTxOut o') x
                        lookups = Constraints.otherScript (swapValidator oracle)                     <>
                                  Constraints.otherScript (oracleValidator oracle)                   <>
                                  Constraints.unspentOutputs (Map.fromList [(oref, o), (oref', o')])
                        tx      = Constraints.mustSpendScriptOutput oref  (Redeemer $ PlutusTx.toData Use) <>
                                  Constraints.mustSpendScriptOutput oref' (Redeemer $ PlutusTx.toData ())  <>
                                  Constraints.mustPayToOtherScript
                                    (validatorHash $ oracleValidator oracle)
                                    (Datum $ PlutusTx.toData x)
                                    v                                                                      <>
                                  Constraints.mustPayToPubKey pkh' p
                    ledgerTx <- submitTxConstraintsWith @Swapping lookups tx
                    awaitTxConfirmed $ txId ledgerTx
                    logInfo @String $ "made swap with price " ++ show (Value.flattenValue p)
  where
    getPrice :: Integer -> TxOutTx -> Integer
    getPrice x o = price (lovelaces $ txOutValue $ txOutTxOut o) x

    f :: Integer -> Integer -> (TxOutRef, TxOutTx, PubKeyHash) -> Bool
    f amt x (_, o, _) = getPrice x o <= amt
```

Đầu tiên, chúng tôi sử dụng hàm `ownFunds`. Điều này được định nghĩa trong một mô-đun riêng biệt mà chúng ta sẽ đi sâu vào trong một chút. Tất cả những gì nó làm là thêm tất cả tiền vào ví của chính chúng ta và trả về `Value`. Sau đó, chúng tôi tìm hiểu chúng tôi có bao nhiêu USD Token.

``` {.haskell}
funds <- ownFunds
let amt = assetClassValueOf funds $ oAsset oracle
logInfo @String $ "available assets: " ++ show amt
```

Hàm `findOracle`  được định nghia trong mô đun Oracle.Core từ trước. Bạn sẽ nhớ lại rằng nó tìm thấy oracle UTxO có chứa giá trị oracle.

``` {.haskell}
m <- findOracle oracle
```

Nếu chúng tôi không tìm thấy lời tiên tri, chúng tôi sẽ chỉ ghi lại một thông báo về hiệu ứng đó.

``` {.haskell}
case m of
    Nothing           -> logInfo @String "oracle not found"
```

Nếu chúng tôi tìm thấy nó, chúng tôi sẽ ghi lại một thông báo với tỷ giá hối đoái hiện tại.

``` {.haskell}
Just (oref, o, x) -> do
    logInfo @String $ "found oracle, exchange rate " ++ show x    
```

Tiếp theo, chúng tôi kiểm tra khóa công khai của riêng mình và kiểm tra tất cả các giao dịch hoán đổi có sẵn.

``` {.haskell}
pkh   <- pubKeyHash <$> Contract.ownPubKey
swaps <- findSwaps oracle (/= pkh)    
```

Sau đó, chúng tôi sử dụng một hàm `find`  đó là từ Haskell prelude,Trong module `Data.List`. Hàm `find`  với đối số là một thuộc tính là một danh sách `Maybe`  trả về một phần tử phù hợp với thuộc tính đó.

Hàm được sử dụng trong vị từ được định nghĩa là hàm trợ giúp `f`.

``` {.haskell}
where
    getPrice :: Integer -> TxOutTx -> Integer
    getPrice x o = price (lovelaces $ txOutValue $ txOutTxOut o) x    

    f :: Integer -> Integer -> (TxOutRef, TxOutTx, PubKeyHash) -> Bool
    f amt x (_, o, _) = getPrice x o <= amt    
```

Chúng tôi cung cấp cho nó một số tiền, tỷ giá hối đoái hiện tại và một bộ ba UTxO. Hàm xác định xem có hoán đổi nào rẻ hơn hoặc bằng tham số số tiền hay không.

Bây giờ, chúng tôi đã tìm kiếm một giao dịch hoán đổi mà chúng tôi có thể chi trả. Nếu chúng tôi không tìm thấy một, chúng tôi sẽ ghi lại một thông báo nói như vậy.

``` {.haskell}
case find (f amt x) swaps of
    Nothing                -> logInfo @String "no suitable swap found"
```

Nếu chúng tôi tìm thấy một cái, chúng tôi chỉ lấy cái đầu tiên. Tất nhiên, điều này không thực tế lắm. Trong một ví dụ thực tế, chúng tôi có thể sẽ chỉ định số tiền chính xác mà chúng tôi muốn hoán đổi. Ở đây, chúng tôi chỉ giữ nó đơn giản vì chúng tôi tập trung vào mục tiêu mấu chốt hơn là hoán đổi.

Vì vậy, bây giờ chúng ta xây dựng một giao dịch.

``` {.haskell}
let v = txOutValue (txOutTxOut o) <> lovelaceValueOf (oFee oracle)                
```

Đây là đầu ra cho tiên tri. Nó cũng giống như đầu vào, bao gồm bất kỳ khoản phí nào đã tích lũy ở đó, cộng với khoản phí trong tình yêu mà chúng ta cần phải trả.

Sau đó, chúng tôi tạo một `Value` mã thông báo USD  đại diện mà chúng tôi cần thanh toán. 

``` {.haskell}
p = assetClassValue (oAsset oracle) $ price (lovelaces $ txOutValue $ txOutTxOut o') x
```

Bây giờ, chúng ta hãy xem xét các ràng buộc.

Ràng buộc đầu tiên là chúng ta phải sử dụng oracle làm đầu vào. Và ở đây chúng ta thấy lần đầu tiên sử dụng `Redeemer`. Chúng tôi chưa bao giờ sử dụng `Redeemer` này trong chính lõi oracle, vì nhà cung cấp oracle chỉ chịu trách nhiệm cập nhật các giá trị sử dụng `Redeemer`.

``` {.haskell}
Constraints.mustSpendScriptOutput oref (Redeemer $ PlutusTx.toData Use)
```

Ràng buộc thứ hai là sử dụng đầu vào hoán đổi, chỉ sử dụng một trình `Unit` cho Redeeemer.

``` {.haskell}
Constraints.mustSpendScriptOutput oref' (Redeemer $ PlutusTx.toData ())
```

Ràng buộc thứ ba là trả tiền oracle.

``` {.haskell}
Constraints.mustPayToOtherScript
    (validatorHash $ oracleValidator oracle)
    (Datum $ PlutusTx.toData x)
    v
```

Ở đây chúng tôi sử dụng `mustPayToOtherScript`, chỉ định tập lệnh oracle, vì bây giờ chúng ta có hai tập lệnh đang hoạt động - tập lệnh oracle và tập lệnh hoán đổi. Như `Datum`  chúng tôi sử dụng datum tồn tại - wchúng tôi không được thay đổi nó - và
như là `Value`  chúng tôi sử dụng giá trị `v`  mà chúng tôi đã tính toán trước đó.

Ràng buộc cuối cùng là chúng tôi phải trả tiền cho người bán  - và khoản thanh toán là giá trị `p` mà chúng tôi đã tính toán trước đó.

``` {.haskell}
Constraints.mustPayToPubKey pkh' p
```

Để tra cứu, chúng tôi phải cung cấp trình xác thực của hợp đồng oracle và hoán đổi, đồng thời chúng tôi phải cung cấp hai UTxO mà chúng tôi muốn sử dụng.

``` {.haskell}
lookups = Constraints.otherScript (swapValidator oracle)               <>
    Constraints.otherScript (oracleValidator oracle)                   <>
    Constraints.unspentOutputs (Map.fromList [(oref, o), (oref', o')])
```

Bây giờ, thông thường - chúng tôi gửi nó, chờ xác nhận, sau đó ghi lại một tin nhắn.

``` {.haskell}
ledgerTx <- submitTxConstraintsWith @Swapping lookups tx
awaitTxConfirmed $ txId ledgerTx
logInfo @String $ "made swap with price " ++ show (Value.flattenValue p)    
```

### Gói hợp đồng (Contract bundle)

Điều đó xác định các hợp đồng thô. Bây giờ, chúng tôi cung cấp một gói chứa tất cả chúng.

Đầu tiên, chúng tôi định nghĩa, như mọi khi, một `SwapSchema`, xác định các endpoints.

``` {.haskell}
type SwapSchema =
    BlockchainActions
        .\/ Endpoint "offer"    Integer
        .\/ Endpoint "retrieve" ()
        .\/ Endpoint "use"      ()
        .\/ Endpoint "funds"    ()    
```

Tiếp theo, chúng ta thấy toán tử `select`. Việc sử dụng toán tử này sẽ khiến mã của chúng tôi đợi cho đến khi một trong các điểm cuối được chọn, rồi thực thi mã được liên kết.

Các hàm `swap`  đệ quy gọi chính nó, cung cấp một lần nữa và một lần nữa lựa chọn cùng một endpoints.

``` {.haskell}
swap :: Oracle -> Contract (Last Value) SwapSchema Text ()
swap oracle = (offer `select` retrieve `select` use `select` funds) >> swap oracle
    where
        offer :: Contract (Last Value) SwapSchema Text ()
        offer = h $ do
            amt <- endpoint @"offer"
            offerSwap oracle amt

        retrieve :: Contract (Last Value) SwapSchema Text ()
        retrieve = h $ do
            endpoint @"retrieve"
            retrieveSwaps oracle

        use :: Contract (Last Value) SwapSchema Text ()
        use = h $ do
            endpoint @"use"
            useSwap oracle

        funds :: Contract (Last Value) SwapSchema Text ()
        funds = h $ do
            endpoint @"funds"
            v <- ownFunds
            tell $ Last $ Just v

        h :: Contract (Last Value) SwapSchema Text () -> Contract (Last Value) SwapSchema Text ()
        h = handleError logError    
```

Mã cho bốn endpoint là trình bao bọc cho mã chúng ta đã viết.

Ví dụ `offer`, wchúng tôi chặn cho đến khi chúng tôi được cung cấp `amt` và sau đó gọi contract `offerSwap`  .

Đối với endpoints `retrieve`  và  `use`  ,chúng không cần tham số.

cuối cùng là endpoint `funds`, nó thì khác một chút. hàm `ownFunds`xuất phát từ mô-đun `Funds` , chúng ta đã đề cập trước đó, Chung ta thấy, nó chứa một giá trị `Value` mà nó sở hứu. sau đó chúng ta `tell` giá trị này  như một cách báo cáo với thế giới bên ngoài rằng chúng tôi có bao nhiêu.

Trong hmỗi điểm cuối là một trình xử lý lỗ `h`. Mỗi điểm cuối được bao bọc bên trong trình xử lý lỗi, trình này chỉ ghi lại lỗi, nhưng không tạm dừng thực thi.

Và điều đó kết thúc ví dụ hoán đổi.

Funds Module
------------

Bây giờ chúng ta hãy nhanh chóng xem xét mô-đun `Funds`. Đó là một mô-đun ngắn cung cấp hai hợp đồng.

Các hàm `ownFunds`  được giao nhiệm vụ tổng hợp tất cả các giá trị trong các UTxOs của chúng.

``` {.haskell}
ownFunds :: HasBlockchainActions s => Contract w s Text Value
ownFunds = do
    pk    <- ownPubKey
    utxos <- utxoAt $ pubKeyAddress pk
    let v = mconcat $ Map.elems $ txOutValue . txOutTxOut <$> utxos
    logInfo @String $ "own funds: " ++ show (Value.flattenValue v)
    return v
```

Nó thực hiện điều này bằng cách tra cứu khóa công khai của chúng, sau đó nhận tất cả các UTxO tại địa chỉ khóa công khai đó. Sau đó `utxos` là một bản đồ từ các tham chiếu UTxO đến các UTxO.

như `map`  thực hiện `Functor`  húng tôi có thể ánh xạ trên bản đồ để thay đổi các yếu tố thành một cái gì đó khác. Trong trường hợp này, chúng tôi thay đổi chúng thành giá trị bằng cách áp dụng hàm tổng hợp `txOutValue`  . `txOutTxOut`.

Các hàm `Map.elems`  bỏ qua các phím và chỉ cho chúng ta các giá trị. Và, như chúng ta đã thấy trước đây `mconcat`khi được cung cấp một kiểu `Semigroup`  or `Monoid`sẽ kết hợp danh sách các giá trị thành một giá trị.

Vì vậy,  `v`  không phải là tổng của tất cả các giá trị của tất cả các UTxO mà chúng ta sở hữu.
Hàm `ownFunds`  của chúng tôi là một hợp đồng có kiểu trả về giá trị `v`.

Hàm `ownFunds'` là một biến thể, thay vì trả về giá trị, nó sẽ vĩnh viễn là tell. 

``` {.haskell}
ownFunds' :: Contract (Last Value) BlockchainActions Text ()
ownFunds' = do
    handleError logError $ ownFunds >>= tell . Last . Just
    void $ Contract.waitNSlots 1
    ownFunds'
```

Điều này gọi hàm `ownFunds`  thực hiện liên kết đơn nguyên với hàm tổng hợp `tell . Last . Just`  wày cho biết giá trị, sau đó nó đợi một vị trí và sau đó gọi chính nó. Vì vậy, mỗi khối, nó ghi giá trị vào nhật ký.

Testing
-------

Bây giờ chúng tôi sẽ viết mã, sử dụng  `EmulatorTrace`  monad, kiểm tra các hợp đồng chúng tôi đã viết.

Mã này có thể được tìm thấy trong mô-đun sau:

``` {.haskell}
module Week06.Oracle.Test
```

Đầu tiên, chúng ta cần xác định một mã thông báo mà chúng ta có thể kiểm tra. `assetSymbol` là một hàm băm tùy ý, dùng được cho các mục đích thử nghiệm.

``` {.haskell}
assetSymbol :: CurrencySymbol
assetSymbol = "ff"

assetToken :: TokenName
assetToken = "USDT"
```

Lần này chúng ta sẽ sử dụng phiên bản mồi của `runEmulatorTraceIO`, lấy thêm hai đối số và cung cấp nhiều chi tiết hơn cho môi trường giả lập.

``` {.haskell}
test :: IO ()
test = runEmulatorTraceIO' def emCfg myTrace
  where
    emCfg :: EmulatorConfig
    emCfg = EmulatorConfig $ Left $ Map.fromList [(Wallet i, v) | i <- [1 .. 10]]

    v :: Value
    v = Ada.lovelaceValueOf                    100_000_000 <>
        Value.singleton assetSymbol assetToken 100_000_000    
```

Đối số đầu tiên để `runEmulatorTraceIO'`  xác định cách hiển thị các thông báo nhật ký khác nhau. Bằng cách sử dụng  `def`, chúng tôi đã chọn mặc định, giống như trong phiên bản không có bản quyền.

Lý do chúng tôi đang sử dụng phiên bản mồi là chúng tôi muốn định cấu hình phân phối ban đầu và chúng tôi có thể thực hiện điều đó với đối số thứ hai, mà ở đây chúng tôi đã gắn nhãn `emCfg`.

``` {.haskell}
emCfg :: EmulatorConfig
emCfg = EmulatorConfig $ Left $ Map.fromList [(Wallet i, v) | i <- [1 .. 10]]
```

Chúng tôi sử dụng điều này với hàm trợ giúp `v`  để cung cấp cho mọi người 100 triệu lovelace (100 Ada) and 100 triệu USD Tokens để bắt đầu.

``` {.haskell}
v :: Value
v = Ada.lovelaceValueOf                    100_000_000 <>
    Value.singleton assetSymbol assetToken 100_000_000
```

Chúng tôi xác định một hợp đồng trợ giúp  `checkOracle`, nó sẽ liên tục kiểm tra giá trị oracle và ghi lại nó.

``` {.haskell}
checkOracle :: Oracle -> Contract () BlockchainActions Text a
checkOracle oracle = do
    m <- findOracle oracle
    case m of
        Nothing        -> return ()
        Just (_, _, x) -> Contract.logInfo $ "Oracle value: " ++ show x
    Contract.waitNSlots 1 >> checkOracle oracle
```

Và bây giờ chúng ta có thể xác định dấu vết của mình.

``` {.haskell}
myTrace :: EmulatorTrace ()
myTrace = do
    let op = OracleParams
                { opFees = 1_000_000
                , opSymbol = assetSymbol
                , opToken  = assetToken
                }

    h1 <- activateContractWallet (Wallet 1) $ runOracle op
    void $ Emulator.waitNSlots 1
    oracle <- getOracle h1

    void $ activateContractWallet (Wallet 2) $ checkOracle oracle

    callEndpoint @"update" h1 1_500_000
    void $ Emulator.waitNSlots 3

    void $ activateContractWallet (Wallet 1) ownFunds'
    void $ activateContractWallet (Wallet 3) ownFunds'
    void $ activateContractWallet (Wallet 4) ownFunds'
    void $ activateContractWallet (Wallet 5) ownFunds'

    h3 <- activateContractWallet (Wallet 3) $ swap oracle
    h4 <- activateContractWallet (Wallet 4) $ swap oracle
    h5 <- activateContractWallet (Wallet 5) $ swap oracle

    callEndpoint @"offer" h3 10_000_000
    callEndpoint @"offer" h4 20_000_000
    void $ Emulator.waitNSlots 3

    callEndpoint @"use" h5 ()
    void $ Emulator.waitNSlots 3

    callEndpoint @"update" h1 1_700_000
    void $ Emulator.waitNSlots 3

    callEndpoint @"use" h5 ()
    void $ Emulator.waitNSlots 3

    callEndpoint @"update" h1 1_800_000
    void $ Emulator.waitNSlots 3

    callEndpoint @"retrieve" h3 ()
    callEndpoint @"retrieve" h4 ()
    void $ Emulator.waitNSlots 3
  where
    getOracle :: ContractHandle (Last Oracle) OracleSchema Text -> EmulatorTrace Oracle
    getOracle h = do
        l <- observableState h
        case l of
            Last Nothing       -> Emulator.waitNSlots 1 >> getOracle h
            Last (Just oracle) -> Extras.logInfo (show oracle) >> return oracle
```

Đây là tất cả những thứ mà chúng ta đã thấy. Chúng tôi xác định các tham số oracle của mình, đặt mức phí oracle ở mức 1 triệu lovelace và loại tài sản tùy ý của chúng tôi đã xác định trước đó.

``` {.haskell}
let op = OracleParams
    { opFees = 1_000_000
    , opSymbol = assetSymbol
    , opToken  = assetToken
    }    
```

Sau đó, chúng tôi bắt đầu một oracle và chờ một slot.

``` {.haskell}
h1 <- activateContractWallet (Wallet 1) $ runOracle op
void $ Emulator.waitNSlots 1
oracle <- getOracle h1
```

Chúng tôi đã nắm bắt được một xử lý đối với oracle bằng cách sử dụng chức năng trợ giúp được định nghĩa trong mệnh đề `where` .

``` {.haskell}
getOracle :: ContractHandle (Last Oracle) OracleSchema Text -> EmulatorTrace Oracle
getOracle h = do
    l <- observableState h
    case l of
        Last Nothing       -> Emulator.waitNSlots 1 >> getOracle h
        Last (Just oracle) -> Extras.logInfo (show oracle) >> return oracle
```

Chúng ta cần điều này vì hợp đồng hoán đổi được tham số hóa với giá trị oracle. Và đây là lý do tại sao chúng tôi sử dụng `tell`  trong hàm `runOracle`.

Chúng tôi sử dụng hàm `observableState`  để nắm giữ thông tin này. Nếu nó không tồn tại, chúng tôi đợi một vị trí và thử lại. Nếu không, chúng tôi ghi lại nó cho mục đích gỡ lỗi và trả lại nó.

Tiếp theo, chúng tôi sử dụng Wallet 2 để thực thi hàm `checkOracle`  mà chúng tôi đã thấy trước đó.

``` {.haskell}
void $ activateContractWallet (Wallet 2) $ checkOracle oracle
```

Sau đó, chúng tôi khởi tạo oracle với tỷ giá hối đoái là 1,5 Ada và đợi 3 slots.

``` {.haskell}
callEndpoint @"update" h1 1_500_000
void $ Emulator.waitNSlots 3
```

Bây giờ chúng ta gọi hàm `ownFunds'`  trên ví 1, 3, 4 và 5 để kiểm tra số dư ban đầu.

``` {.haskell}
void $ activateContractWallet (Wallet 1) ownFunds'
void $ activateContractWallet (Wallet 3) ownFunds'
void $ activateContractWallet (Wallet 4) ownFunds'
void $ activateContractWallet (Wallet 5) ownFunds'    
```

Sau đó, chúng tôi bắt đầu hợp đồng hoán đổi trên Ví 3, 4 và 5.

``` {.haskell}
h3 <- activateContractWallet (Wallet 3) $ swap oracle
h4 <- activateContractWallet (Wallet 4) $ swap oracle
h5 <- activateContractWallet (Wallet 5) $ swap oracle
```

Sau đó, chúng tôi thử một số kịch bản. Đầu tiên, Ví 3 và 4 lần lượt cung cấp 10 và 20 Ada để hoán đổi.

``` {.haskell}
callEndpoint @"offer" h3 10_000_000
callEndpoint @"offer" h4 20_000_000
void $ Emulator.waitNSlots 3
```

Và bây giờ Ví 5 sử dụng hoán đổi. Nó sẽ chọn một trong hai. Không rõ cái nào, cái nào tìm trước. Hãy nhớ rằng chúng tôi chỉ viết mã để tìm vị trí đầu tiên có giá cả phải chăng. Sau đó, nó sẽ trả USD Token cho nó. Số tiền được trả sẽ phụ thuộc vào giá trị hiện tại của oracle.

``` {.haskell}
callEndpoint @"use" h5 ()
void $ Emulator.waitNSlots 3    
```

Bây giờ, Wallet 1 cập nhật giá trị oracle lên 1,7. Điều này cũng dẫn đến phí tích lũy (1 Ada) được trả cho Ví 1.

> callEndpoint @\"update\" h1 1\_700\_000 void \$ Emulator.waitNSlots 3

Sau đó, Wallet 5 thử lại, lấy phần hoán đổi còn lại, nhưng hiện đang trả một giá USD Token khác.

``` {.haskell}
callEndpoint @"use" h5 ()
void $ Emulator.waitNSlots 3
```

Sau đó, chúng tôi đặt giá trị oracle thành 1,8.

``` {.haskell}
callEndpoint @"update" h1 1_800_000
void $ Emulator.waitNSlots 3
```

Điều này sẽ cho phép Wallet 1 thu phí. Giá trị oracle thực sự không cần phải thay đổi để điều này xảy ra.

Ví 3 và 4 hiện đưa ra `retrieve` yêu cầu lấy lại bất kỳ khoản tiền nào chưa được mua. Điều này sẽ dẫn đến việc không có tiền được trả lại vì tất cả các khoản hoán đổi đã được sử dụng.

``` {.haskell}
callEndpoint @"retrieve" h3 ()
callEndpoint @"retrieve" h4 ()
void $ Emulator.waitNSlots 3
```

Và đây là toàn bộ code. Vì vậy, hãy chạy nó trong REPL.

### Test in the REPL

``` {.haskell}
Prelude Week06.Oracle.Core> import Week06.Oracle.Test
Prelude Week06.Oracle.Test Week06.Oracle.Core> test
```

Sẽ có rất nhiều đầu ra.

Hãy xem xét một số phần chính. Đầu tiên, slot 3, nơi tạo ra oracle. Ở đây chúng tôi nhận được giá trị `oSymbol`  mà chúng tôi có thể sử dụng cho mọi thứ khác.

Chúng tôi cũng thấy trong vị trí số 3 `getOracle` được bắt đầu sẽ ghi lại giá trị của oracle, để biết thông tin của chúng tôi, mọi vị trí kể từ bây giờ.

``` {.}
Slot 00003: ```  CONTRACT LOG: "started oracle Oracle {oSymbol = 6122edd57c938cda24066f434da9aee55120b4eb362d4a1bd37547ef6e4a6cbb, oOperator = 21fe31dfa154a261626bf854046fd2271b7bed4b6abe45aa58877ef47f9721b9, oFee = 1000000, oAsset = (ff,\"USDT\")}"
Slot 00003: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Sending contract state to Thread 0
Slot 00003: ```  USER LOG: Oracle {oSymbol = 6122edd57c938cda24066f434da9aee55120b4eb362d4a1bd37547ef6e4a6cbb, oOperator = 21fe31dfa154a261626bf854046fd2271b7bed4b6abe45aa58877ef47f9721b9, oFee = 1000000, oAsset = (ff,"USDT")}
Slot 00003: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 2}:
  Contract instance started
Slot 00003: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Receive endpoint call: Object (fromList [("tag",String "update"),("value",Object (fromList [("unEndpointValue",Number 1500000.0)]))])
Slot 00003: W1: TxSubmit: 93fab1c0845a5b96863a50d248fa2de68bd6702185e3de92ae0c58b869569909
Slot 00003: TxnValidate 93fab1c0845a5b96863a50d248fa2de68bd6702185e3de92ae0c58b869569909
```

Và, vị trí thứ 4, chúng ta thấy giá trị đầu tiên `getOracle` tìm thấy là 1.500.000.

``` {.}
Slot 00004: ```  CONTRACT LOG: "Oracle value: 1500000"
Slot 00004: ```  CONTRACT LOG: "set initial oracle value to 1500000"
```

Vị trí 6 là kết quả của tất cả các lần gọi `activateContractWallet`. Chúng không nhất thiết phải xuất hiện theo thứ tự như trong mã. Lưu ý rằng Ví 1 có ít Ada hơn một chút so với các ví khác. Điều này là do Ví 1 startOracle và cần phải trả phí giao dịch cho việc đó.

``` {.}
Slot 00006: 00000000-0000-4000-8000-000000000002 {Contract instance for wallet 1}:
  Contract instance started
Slot 00006: 00000000-0000-4000-8000-000000000003 {Contract instance for wallet 3}:
  Contract instance started
Slot 00006: 00000000-0000-4000-8000-000000000004 {Contract instance for wallet 4}:
  Contract instance started
Slot 00006: ```  CONTRACT LOG: "own funds: [(,\"\",99999970),(ff,\"USDT\",100000000)]"
Slot 00006: 00000000-0000-4000-8000-000000000005 {Contract instance for wallet 5}:
  Contract instance started
Slot 00006: ```  CONTRACT LOG: "own funds: [(,\"\",100000000),(ff,\"USDT\",100000000)]"
Slot 00006: 00000000-0000-4000-8000-000000000006 {Contract instance for wallet 3}:
  Contract instance started
Slot 00006: ```  CONTRACT LOG: "own funds: [(,\"\",100000000),(ff,\"USDT\",100000000)]"
Slot 00006: 00000000-0000-4000-8000-000000000007 {Contract instance for wallet 4}:
  Contract instance started
Slot 00006: ```  CONTRACT LOG: "own funds: [(,\"\",100000000),(ff,\"USDT\",100000000)]"
Slot 00006: 00000000-0000-4000-8000-000000000008 {Contract instance for wallet 5}:
  Contract instance started
Slot 00006: ```  CONTRACT LOG: "Oracle value: 1500000"
Slot 00006: 00000000-0000-4000-8000-000000000006 {Contract instance for wallet 3}:
  Receive endpoint call: Object (fromList [("tag",String "offer"),("value",Object (fromList [("unEndpointValue",Number 1.0e7)]))])
Slot 00006: W3: TxSubmit: 8274315b83fb8b4d721146a75772cf39be3f96730557bd6021235864f0f37bc6
Slot 00006: 00000000-0000-4000-8000-000000000007 {Contract instance for wallet 4}:
  Receive endpoint call: Object (fromList [("tag",String "offer"),("value",Object (fromList [("unEndpointValue",Number 2.0e7)]))])
Slot 00006: W4: TxSubmit: 221f86cc1d6087a5967793aaf9eb078d8ec0677b2d6aca586f985f6f2c57a100
Slot 00006: TxnValidate 221f86cc1d6087a5967793aaf9eb078d8ec0677b2d6aca586f985f6f2c57a100
Slot 00006: TxnValidate 8274315b83fb8b4d721146a75772cf39be3f96730557bd6021235864f0f37bc6
```

Slot 7, các ưu đãi của 10 Ada và 20 Ada được thực hiện.

``` {.}
Slot 00007: ```  CONTRACT LOG: "own funds: [(,\"\",99999970),(ff,\"USDT\",100000000)]"
Slot 00007: ```  CONTRACT LOG: "offered 10000000 lovelace for swap"
Slot 00007: ```  CONTRACT LOG: "own funds: [(,\"\",89999990),(ff,\"USDT\",100000000)]"
Slot 00007: ```  CONTRACT LOG: "offered 20000000 lovelace for swap"
Slot 00007: ```  CONTRACT LOG: "own funds: [(,\"\",79999990),(ff,\"USDT\",100000000)]"
Slot 00007: ```  CONTRACT LOG: "own funds: [(,\"\",100000000),(ff,\"USDT\",100000000)]"
Slot 00007: ```  CONTRACT LOG: "Oracle value: 1500000"
```

Trong vị trí 9, cái đầu tiên `use` được yêu cầu.

``` {.Slot 00009: 00000000-0000-4000-8000-000000000008 {Contract instance for wallet 5}:
Receive endpoint call: Object (fromList [(\"tag\",String \"use\"),(\"value\",Object (fromList [(\"unEndpointValue\",Array [])]))])
Slot 00009: ```  CONTRACT LOG: \"own funds: [(,\\\"\\\",100000000),(ff,\\\"USDT\\\",100000000)]\"
Slot 00009: ```  CONTRACT LOG: \"available assets: 100000000\"
Slot 00009: ```  CONTRACT LOG: \"found oracle, exchange rate 1500000\"
Slot 00009: W5: TxSubmit: 35d38def28dd6f5d016bee056e227501b97b2bb3ed2192e364242f01319e5e56
Slot 00009: TxnValidate 35d38def28dd6f5d016bee056e227501b97b2bb3ed2192e364242f01319e5e56}
```

Và ở vị trí số 10, chúng ta thấy sự hoán đổi xảy ra.

``` {.}
Slot 00010: ```  CONTRACT LOG: "own funds: [(,\"\",99999970),(ff,\"USDT\",100000000)]"
Slot 00010: ```  CONTRACT LOG: "own funds: [(,\"\",89999990),(ff,\"USDT\",100000000)]"
Slot 00010: ```  CONTRACT LOG: "own funds: [(,\"\",79999990),(ff,\"USDT\",130000000)]"
Slot 00010: ```  CONTRACT LOG: "made swap with price [(ff,\"USDT\",30000000)]"
Slot 00010: ```  CONTRACT LOG: "own funds: [(,\"\",118999990),(ff,\"USDT\",70000000)]"
```

The oracle nhận và cập nhật yêu cầu trong slot 12.

``` {.}
Slot 00012: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Receive endpoint call: Object (fromList [("tag",String "update"),("value",Object (fromList [("unEndpointValue",Number 1700000.0)]))])
Slot 00012: W1: TxSubmit: ff7e1fbfb51897b100dcfdf551ad9a03886432af0a9fa92ff8dd986a0f7c90fe
Slot 00012: TxnValidate ff7e1fbfb51897b100dcfdf551ad9a03886432af0a9fa92ff8dd986a0f7c90fe
```

Và chúng tôi thấy nó xảy ra ở vị trí số 13.

``` {.}
Slot 00013: ```  CONTRACT LOG: "updated oracle value to 1700000"
```
```

Thứ  nhì `use`  yêu cầu đến slot 15.

``` {.}
Slot 00015: 00000000-0000-4000-8000-000000000008 {Contract instance for wallet 5}:
  Receive endpoint call: Object (fromList [("tag",String "use"),("value",Object (fromList [("unEndpointValue",Array [])]))])
Slot 00015: ```  CONTRACT LOG: "own funds: [(,\"\",118999990),(ff,\"USDT\",70000000)]"
Slot 00015: ```  CONTRACT LOG: "available assets: 70000000"
Slot 00015: ```  CONTRACT LOG: "found oracle, exchange rate 1700000"
Slot 00015: W5: TxSubmit: 84bec9a9044eee9c5b40029dca5bbc8346214504e5adb4745bbe6e5d7d96078e
Slot 00015: TxnValidate 84bec9a9044eee9c5b40029dca5bbc8346214504e5adb4745bbe6e5d7d96078e
```

Và sự hoán đổi xảy ra ở vị trí 16.

``` {.}
Slot 00016: ```  CONTRACT LOG: "made swap with price [(ff,\"USDT\",17000000)]"
```

Và ở dưới cùng, chúng tôi thấy số dư cuối cùng.

Ví 2 vẫn có tất cả tiền của nó. Tất cả những gì Ví 2 đã làm là kiểm tra bằng Oracle, không tốn bất kỳ chi phí nào, vì nó hoàn toàn là một vấn đề off-chain.

Ví 1 đã trả một số phí giao dịch nhưng kết thúc với số tiền cao hơn khoảng 2 Ada so với ban đầu. Điều này là do nó đã thu 2 Ada phí sử dụng oracle.

Ví 3 và 4 đều đưa ra đề nghị và số dư của chúng phản ánh tỷ giá hối đoái mà tại đó các đề nghị của chúng đã được chấp nhận.

Ví 5 là người chấp nhận các đề nghị và Ada bổ sung cũng vậy, nhưng số dư Mã thông báo USD bị giảm. Lưu ý rằng Ví 5 cũng đã bị khấu trừ một số khoản phí từ số dư Ada của nó.

``` {.}
Final balances
Wallet 1: 
    {, ""}: 101999950
    {ff, "USDT"}: 100000000
Wallet 2: 
    {, ""}: 100000000
    {ff, "USDT"}: 100000000
Wallet 3: 
    {ff, "USDT"}: 117000000
    {, ""}: 89999990
Wallet 4: 
    {ff, "USDT"}: 130000000
    {, ""}: 79999990
Wallet 5: 
    {, ""}: 127999980
    {ff, "USDT"}: 53000000
Wallet 6: 
    {, ""}: 100000000
    {ff, "USDT"}: 100000000
Wallet 7: 
    {, ""}: 100000000
    {ff, "USDT"}: 100000000
Wallet 8: 
    {, ""}: 100000000
    {ff, "USDT"}: 100000000
Wallet 9: 
    {, ""}: 100000000
    {ff, "USDT"}: 100000000
Wallet 10: 
    {, ""}: 100000000
    {ff, "USDT"}: 100000000
```

Và cuối cùng, cũng như các ví, chúng ta thấy rằng oracle vẫn tiếp tục, và vẫn sở hữu NFT. Lưu ý rằng, trong nhật ký này, chúng tôi không thấy giá trị datum.

``` {.}
Script cc6a43073dce46eebc7b309223904c7a8033ffab7d9b239cf013342d4c69a5d6: 
    {6122edd57c938cda24066f434da9aee55120b4eb362d4a1bd37547ef6e4a6cbb, ""}: 1
```

Plutus Application Backend (PAB)
--------------------------

Ngoài ý tưởng về cách triển khai một oracle trong Plutus, không có gì chúng tôi đã làm trong bài giảng này cho đến nay là mới, ngoại trừ một vài hàm thư viện và kỹ thuật Haskell. Về nguyên tắc, chúng ta đã quen thuộc với cách trình xác thực được viết cho mã off-chain và cách hợp đồng được viết cho mã on-chain cũng như cách chúng ta có thể kiểm tra mã của mình với `EmulatorTrace`  monad.

Nhưng bây giờ chúng ta sẽ nói về một thứ mới - Plutus Application Backend (PAB), cho phép chúng ta lấy tất cả những thứ chúng ta đã làm và biến nó thành một tệp thực thi chạy các hợp đồng.

Nếu testnet hoặc mainnet có sẵn với sự hỗ trợ của Plutus, chúng tôi có thể triển khai một ứng dụng như vậy, nhưng hiện tại chúng tôi sẽ cần hài lòng với một blockchain mô phỏng. Tuy nhiên, quá trình biến mã thành một dApp thực tế giống như trên một blockchain thực.

Chúng ta cần thêm một mô-đun nhỏ nữa, về cơ bản chỉ là một định nghĩa kiểu. Nó rất nhỏ, chúng tôi có thể bao gồm toàn bộ nội dung tệp ở đây.

``` {.haskell}
{-# LANGUAGE DeriveAnyClass     #-}
{-# LANGUAGE DeriveGeneric      #-}

module Week06.Oracle.PAB
    ( OracleContracts (..)
    ) where

import           Data.Aeson                (FromJSON, ToJSON)
import           Data.Text.Prettyprint.Doc (Pretty (..), viaShow)
import           GHC.Generics              (Generic)
import           Ledger

import qualified Week06.Oracle.Core        as Oracle

data OracleContracts = Init | Oracle CurrencySymbol | Swap Oracle.Oracle
    deriving (Eq, Ord, Show, Generic, FromJSON, ToJSON)

instance Pretty OracleContracts where
    pretty = viaShow
```

Ý tưởng là nó sửa đổi các phiên bản hợp đồng mà chúng tôi muốn chạy. Chúng tôi có nhiều hợp đồng khác nhau và chúng tôi muốn có một kiểu dữ liệu trong đó mỗi giá trị của kiểu dữ liệu tương ứng với một liên hệ mà cuối cùng chúng tôi muốn chạy.

Phương thức khởi tạo `Init`  sẽ được sử dụng để thiết lập một môi trường nơi có sẵn Mã thông báo USD và nơi các ví có nguồn cung cấp ban đầu của chúng.

Hàm `Oracle` tạo tương ứng với `runOracle` hợp đồng sẽ bắt đầu `oracle` và cung cấp endpoint `update` , và tham số `CurrencySymbol`  sẽ được sử dụng cho Mã thông báo USD.

Cuối cùng, các Swap, tham số hóa bằng cách `Oracle` sẽ được sử dụng để chạy các hợp đồng hoán đổi, cung cấp thiết bị đầu cuối khác nhau như `offer` , `retrieve`, `use` và `funds`.

Chúng ta cần định nghĩa `OracleContracts`  trong một mô-đun riêng biệt vì chúng ta sẽ sử dụng nó cả từ PAB và cả từ giao diện người dùng.

Chúng ta sẽ xem xét tệp Cabal.



``` {.}
plutus-pioneer-program-week06.cabal
```

Trong đó, chúng tôi có các định nghĩa cho các tệp thực thi khác nhau.

Tập tin `oracle-pab`  thực thi sẽ thiết lập một ví mô phỏng, khởi tạo tất cả các hợp đồng và thiết lập một máy chủ web cho phép thế giới bên ngoài tương tác với các hợp đồng này.


``` {.}
executable oracle-pab
main-is: oracle-pab.hs
hs-source-dirs:      app
ghc-options:         -Wall -threaded
build-depends:       aeson
                   , base ^>= 4.14.1.0
                   , freer-extras
                   , freer-simple
                   , plutus-contract
                   , plutus-ledger
                   , plutus-pab
                   , plutus-pioneer-program-week06
                   , plutus-use-cases
                   , text
```

Tệp `oracle-clientt` thực thi sẽ được chạy bởi nhà cung cấp oracle, do đó, tệp sẽ tương tác với hợp đồng `runOracle` . Nó cũng sẽ lấy tỷ giá hối đoái từ internet và đưa chúng vào hệ thống.

``` {.}
executable oracle-client
main-is: oracle-client.hs
hs-source-dirs:      app
ghc-options:         -Wall
build-depends:       base ^>= 4.14.1.0
                   , bytestring
                   , regex-tdfa ^>= 1.3.1.0
                   , req ^>= 3.9.0
                   , text
                   , uuid
```

Sau đó, tệp có `swap-client`  thực thi sẽ được chạy bởi các khách hàng muốn sử dụng hợp đồng hoán đổi.

``` {.}
executable swap-client
main-is: swap-client.hs
hs-source-dirs:      app
ghc-options:         -Wall
build-depends:       aeson
                   , base ^>= 4.14.1.0
                   , plutus-ledger
                   , plutus-pab
                   , plutus-pioneer-program-week06
                   , req ^>= 3.9.0
                   , text
                   , uuid
```

Chúng ta sẽ lần lượt xem xét từng điều này.

Bạn có thể tìm thấy mã cho từng ứng dụng này trong thư mục `app` .

``` {.}
app/oracle-client.hs
app/oracle-pab.hs
app/swap-client.hs
```

### Oracle PAB

Đầu tiên, một số bảng soạn sẵn để kết nối kiểu dữ liệu mà chúng ta vừa xác định - các trường hợp hợp đồng được sửa đổi - với các lược đồ và hợp đồng mà chúng ta đã xác định trước đó.

``` {.haskell}
handleOracleContracts ::
    ( Member (Error PABError) effs
    , Member (LogMsg (PABMultiAgentMsg (Builtin OracleContracts))) effs
    )
    => ContractEffect (Builtin OracleContracts)
    ~> Eff effs
handleOracleContracts = handleBuiltin getSchema getContract where
    getSchema = \case
        Init     -> endpointsToSchemas @Empty
        Oracle _ -> endpointsToSchemas @(Oracle.OracleSchema .\\ BlockchainActions)
        Swap _   -> endpointsToSchemas @(Oracle.SwapSchema   .\\ BlockchainActions)
    getContract = \case
        Init        -> SomeBuiltin   initContract
        Oracle cs   -> SomeBuiltin $ Oracle.runOracle $ oracleParams cs
        Swap oracle -> SomeBuiltin $ Oracle.swap oracle
```

`Init`  sẽ không có bất kỳ schema nào ,vì vậy nó chỉ có `BlockChainActions`.
`Oracle`  sử dụng `OracleSchema`  và `Swap` sử dụng `SwapSchema`. Không có gì ngạc nhiên ở đó.

`Init`  sẽ chạy `initContract`, mà chúng ta sẽ thấy trong giây lát.

`Oracle`  sẽ chạy hợp đồng `runOracle` với `oracleParams` ký hiệu tiền tệ của USD Token và ví dụ định nghĩa oracleparams.

``` {.haskell}
oracleParams :: CurrencySymbol -> Oracle.OracleParams
oracleParams cs = Oracle.OracleParams
    { Oracle.opFees   = 1_000_000
    , Oracle.opSymbol = cs
    , Oracle.opToken  = usdt
    }
```

và cuối cùng `Swap`  sẽ chạy hợp đồng hoán đổi với một giá trị oracle.

Đây là một số bản copy/paste boilerplate.

``` {.haskell}
handlers :: SimulatorEffectHandlers (Builtin OracleContracts)
handlers =
    Simulator.mkSimulatorHandlers @(Builtin OracleContracts) []
    $ interpret handleOracleContracts        
```

Và đây là hàm `initContract`  mà chúng tôi đã đề cập ngay trước đây.

``` {.haskell}
initContract :: Contract (Last CurrencySymbol) BlockchainActions Text ()
initContract = do
    ownPK <- pubKeyHash <$> ownPubKey
    cur   <-
        mapError (pack . show)
        (Currency.forgeContract ownPK [(usdt, fromIntegral (length wallets) ` amount)]
        :: Contract (Last CurrencySymbol) BlockchainActions Currency.CurrencyError Currency.OneShotCurrency)
    let cs = Currency.currencySymbol cur
        v  = Value.singleton cs usdt amount
    forM_ wallets $ \w -> do
        let pkh = pubKeyHash $ walletPubKey w
        when (pkh /= ownPK) $ do
            tx <- submitTx $ mustPayToPubKey pkh v
            awaitTxConfirmed $ txId tx
    tell $ Last $ Just cs
  where
    amount :: Integer
    amount = 100_000_000
```

Hàm `initContract`  đúc Tokens USD  phân phối chúng đến các ví, sau đó nó telllà biểu tượng tiền tệ cho Token USD .

Ví được mã hóa cứng trước đó trong mã. Số lượng ví và số token được trao cho chúng là hoàn toàn tùy ý.

``` {.haskell}
wallets :: [Wallet]
wallets = [Wallet i | i <- [1 .. 5]]
```

Bây giờ chúng ta có thể nhìn vào mã PAB thực tế.

Lần đầu tiên, chúng ta thấy một hàm `main`  là điểm nhập của tệp thực thi.

``` {.haskell}
main :: IO ()
main = void $ Simulator.runSimulationWith handlers $ do
    Simulator.logString @(Builtin OracleContracts) "Starting Oracle PAB webserver. Press enter to exit."
    shutdown <- PAB.Server.startServerDebug

    cidInit <- Simulator.activateContract (Wallet 1) Init
    cs      <- waitForLast cidInit
    _       <- Simulator.waitUntilFinished cidInit

    cidOracle <- Simulator.activateContract (Wallet 1) $ Oracle cs
    liftIO $ writeFile "oracle.cid" $ show $ unContractInstanceId cidOracle
    oracle <- waitForLast cidOracle

    forM_ wallets $ \w ->
        when (w /= Wallet 1) $ do
            cid <- Simulator.activateContract w $ Swap oracle
            liftIO $ writeFile ('W' : show (getWallet w) ++ ".cid") $ show $ unContractInstanceId cid

    void $ liftIO getLine
    shutdown
```

Các hàm `main`  sử dụng monad khác  mà chúng ta chưa từng thấy trước đây và là đặc trưng cho PAB  - Các `Simulator`  monad.

Cái `Simulator`  monad là rất giống với `EmulatorTrace`  monad. Về nguyên tắc nó có các khả năng như nhau. Bạn có thể bắt đầu các hợp đồng trên ví, bạn có thể kiểm tra trạng thái bằng cách sử dụng nhật ký, bạn có thể gọi các endpoint, v.v.

Có một chút đáng tiếc là có hai monads cho điều này vì chúng rất giống nhau. Nhóm Plutus có kế hoạch sắp xếp chúng và có thể biến chúng thành một. Vì vậy, nó có thể không đáng để tìm hiểu những điều phức tạp của `Simulator` monad vì nó có thể sẽ sớm thay đổi.

Tương tự như `runEmulatorTraceIO`,Chúng ta có `runSimulationWith`để pass qua `handlers`  boilerplate.

Tuy nhiên một sự khác biệt `EmulatorTrace` monad:
 `EmulatorTrace`  monad là mã thuần túy - không có tác dụng phụ trong thế giới thực, không liên quan đến IO. Đặc biệt có một trình thông dịch thuần túy `runEmulatorTrace` là một hàm Haskell thuần túy không có tác dụng phụ.

`Simulator` khác - bạn có thể làm IO. Cách nó hoạt động là đang sử dụng `MonadIO`, trong đó có một phương thức `liftIO`, thực hiện một hành động `IO`  và `lifts`  nó trở thành monad đề cập . Vì vậy, nếu bạn có một số hành động IO tùy ý mà bạn có thể thực hiện trong Haskell, thì bằng cách áp dụng `liftIO` cho nó, bạn có thể chuyển nó vào `Simulator`  monad.

Ngoài ra, nếu bạn nheo mắt, nó trông rất giống với một `EmulatorTrace`.

Điều đầu tiên chúng tôi làm là sử dụng `logString`  ể ghi lại rằng chúng tôi đang khởi động máy chủ PAB. Sau đó, chúng tôi gọi hàm `startServerDebug`, à giá trị trả về của hàm đó được liên kết với  `shutdown`  ó thể được sử dụng sau này để tắt máy chủ.

Bây giờ chúng tôi sử dụng một cái gì đó được gọi `activateContract`  là tương đương với `activateContractWallet`  từ `EmulatorTrace`  monad.

``` {.haskell}
cidInit <- Simulator.activateContract (Wallet 1) Init
```

Nó cần một ví mà chúng ta muốn bắt đầu phiên bản đó và sau đó là một giá trị của loại hợp đồng đã được sửa đổi. Hãy nhớ rằng chúng ta đã liên kết tạo hàm `Init`
với hàm `initContract` .

Bây giờ chúng ta cần ký hiệu tiền tệ. Đây là một ví dụ về cách chúng tôi lấy thông tin ra khỏi hợp đồng bằng cách sử dụng `tell`.

``` {.haskell}
cs <- waitForLast cidInit
```

Hàm `cidInit`  sử dụng một hàm từ monad `Simulator` được gọi là
`waitForState`, hàm này nhận một hợp đồng và một vị từ. Vị từ nhận một biểu thức JSON và trả về  `Maybe a`.

``` {.haskell}
waitForLast :: FromJSON a => ContractInstanceId -> Simulator.Simulation t a
waitForLast cid =
    flip Simulator.waitForState cid $ \json -> case fromJSON json of
        Success (Last (Just x)) -> Just x
        _                       -> Nothing
```

Ý tưởng là nó sẽ đọc trạng thái của hợp đồng mà chúng tôi đã viết bằng cách sử dụng `tell`. Điều này được tuần tự hóa dưới dạng giá trị JSON và nó áp dụng giá trị JSON này cho vị từ (predicate) được cung cấp. Nếu kết quả là `Nothing`, nó chỉ cần đợi cho đến khi trạng thái thay đổi một lần nữa. Nhưng, nếu đúng như vậy `Just x` nó sẽ trả về `x`.

Có thể có hai cách `Nothing` - phân tích cú pháp JSON có thể không thành công hoặc chúng ta có thể nhận được `Last Nothing`. Vì vậy, kết quả cuối cùng là hàm đợi cho đến khi trạng thái của hợp đồng cho biết một giá trị `Just`.

Tại thời điểm này, chúng tôi có ký hiệu tiền tệ bị ràng buộc `cs`. Và sau đó chúng tôi chờ đợi cho đến khi `initContract` kết thúc.

``` {.haskell}
_ <- Simulator.waitUntilFinished cidInit
```

Bước tiếp theo là bắt đầu oracle trên Ví 1, sử dụng giá trị `cs`  mà chúng tôi đã thu được gần đây.

``` {.haskell}
cidOracle <- Simulator.activateContract (Wallet 1) $ Oracle cs
```

Để tương tác với hợp đồng oracle từ thế giới bên ngoài, ví dụ như từ giao diện web, chúng ta cần bắt tay vào xử lý `cidOracle` .

Vì vậy, những gì chúng tôi làm là ghi điều này vào một tệp có tên `oracle.cid`.


``` {.haskell}
liftIO $ writeFile "oracle.cid" $ show $ unContractInstanceId cidOracle
```

Điều này chỉ là nhanh chóng và không tốt để trình diễn. Trong mã sản xuất, bạn sẽ sử dụng một cơ chế an toàn hơn.

Bây giờ chúng tôi sử dụng `waitForLast` một lần nữa để nhận giá trị oracle, mà chúng tôi đã cung cấp từ hợp đồng `runOracle`  thông qua `tell`. Chúng ta cần điều này vì hợp đồng hoán đổi được tham số hóa bởi giá trị này.

Ở giai đoạn này, NFT được đúc và chúng ta biết giá trị oracle là gì.

Tiếp theo, chúng tôi lặp qua tất cả các ví, ngoại trừ ví 1 chạy oracle và chúng tôi kích hoạt hợp đồng hoán đổi trên mỗi ví. Ở đây chúng tôi sử dụng một phương pháp ghi tệp tương tự để nắm giữ các quy trình xử lý hợp đồng

``` {.haskell}
forM_ wallets $ \w ->
    when (w /= Wallet 1) $ do
        cid <- Simulator.activateContract w $ Swap oracle
        liftIO $ writeFile ('W' : show (getWallet w) ++ ".cid") $ show $ unContractInstanceId cid
```

Bây giờ chúng tôi chỉ chặn cho đến khi người dùng nhấn enter, sau đó chúng tôi tắt máy chủ.

``` {.haskell}
void $ liftIO getLine
shutdown
```

Không thực sự cần thiết phải làm tất cả những điều này, vì bạn cũng có thể bắt đầu và dừng các phiên bản hợp đồng từ giao diện web. Ở đây, chúng tôi dễ dàng thực hiện điều đó hơn theo cách có kịch bản cho bản demo, nhưng về nguyên tắc, bạn chỉ có thể khởi động trình mô phỏng và sau đó đợi cho đến khi bạn tắt máy.

Nếu bạn tò mò về API do PAB cung cấp, bạn có thể kiểm tra điều đó trong gói `plutus-pab` , trong mô-đun `Plutus.PAB.Webserver.API`. Nhưng cái mà chúng tôi đang sử dụng ở đây là:

``` {.haskell}
-- | PAB client API for contracts of type @t@. Examples of @t@ are
--   ` Contract executables that reside in the user's file system
--   ` "Builtin" contracts that run in the same process as the PAB (ie. the PAB is compiled & distributed with these contracts)
type NewAPI t walletId -- see note [WalletID type in wallet API]
    = "api" :> "new" :> "contract" :>
        ("activate" :> ReqBody '[ JSON] (ContractActivationArgs t) :> Post '[JSON] ContractInstanceId -- start a new instance
            :<|> "instance" :>
                    (Capture "contract-instance-id" Text :>
                        ( "status" :> Get '[JSON] (ContractInstanceClientState t) -- Current status of contract instance
                        :<|> "endpoint" :> Capture "endpoint-name" String :> ReqBody '[JSON] JSON.Value :> Post '[JSON] () -- Call an endpoint. Make
                        :<|> "stop" :> Put '[JSON] () -- Terminate the instance.
                        )
                    )
            :<|> "instances" :> "wallet" :> Capture "wallet-id" walletId :> Get '[JSON] [ContractInstanceClientState t]
            :<|> "instances" :> Get '[ JSON] [ContractInstanceClientState t] -- list of all active contract instances
            :<|> "definitions" :> Get '[JSON] [ContractSignatureResponse t] -- list of available contracts
        )
```

Điều này làm cho việc sử dụng thư viện Haskell phổ biến `Servant` để viết các ứng dụng web an toàn, nhưng nó sẽ có thể đọc được ít nhiều mà không cần biết về thư viện `Servant` . Ví dụ: bạn có thể thấy endpoint `/api/new/contract/activate` được khai báo mà bạn có thể dùng `ContractActivationArgs` làm phần thân của nó và trả về một `ContractInstanceId`.

Ngoài ra còn có một API ổ cắm web, nhưng chúng tôi đã không sử dụng nó trong ví dụ này.

Vì vậy, hãy thử tệp thực thi của chúng tôi.


``` {.}
cabal run oracle-pab
```

Chúng tôi nhận được đầu ra nhật ký tương tự như những gì chúng tôi thấy với ` EmulatorTrace` , nhưng đây bây giờ là một máy chủ trực tiếp.

Đầu ra bên dưới được giảm bớt để tránh đầy đủ chi tiết.

``` {.}
[INFO] Slot 0: TxnValidate af5e6d25b5ecb26185289a03d50786b7ac4425b21849143ed7e18bcd70dc4db8
[INFO] Starting Oracle PAB webserver. Press enter to exit.
[INFO] Starting PAB backend server on port: 8080
[INFO] Activated instance dda39c83-5a0f-484f-b49a-9943b1ff5526 on W1
[INFO] Slot 1: W1: Balancing an unbalanced transaction:
                     Tx:
                       Tx da767478580878690990b3a22387be9c5b27fabed2c0ca7b9991eb682a6781f8:
                         {inputs:
                         outputs:
                           - Value (Map [(,Map [("",1)])]) addressed to
                             addressed to ScriptCredential: e9827f1a9e43109d1c8d4555913734b8c48a467a31061b312959f270850fc8a0 (no staking credential)
                         forge: Value (Map [])
                         fee: Value (Map [(,Map [("",10)])])
                         mps:
                         signatures:
                         validity range: Interval {ivFrom = LowerBound NegInf True, ivTo = UpperBound PosInf True}
                         data:
                           <>}
                     Requires signatures:
[INFO] Slot 1: TxnValidate b7d6ba18d02898aa5d0814a306e4a05cf153c199aabb175ef9b00328105ab98f
[INFO] Slot 2: W1: Balancing an unbalanced transaction:
 ...
[INFO] Slot 6: TxnValidate d690122263521c37f308a0d5ae858aa4807cb1e493c2a3374bf65b934c74782a
[INFO] Activated instance deceaa52-f117-46bc-b0f1-eb1f2f529b5a on W1
[INFO] Slot 7: W1: Balancing an unbalanced transaction:
...
[INFO] Slot 7: TxnValidate a679948d128735ec1f380e9f733d7f4a5e54c81f39c73a656d61b077111840e1
[INFO] Slot 8: W1: Balancing an unbalanced transaction:
...
[INFO] Slot 8: TxnValidate f0125e685edd6de2d09f9547f53b18d1bad11bd7fad570a057ba74737ab3053e
[INFO] deceaa52-f117-46bc-b0f1-eb1f2f529b5a: "started oracle Oracle {oSymbol = b8a1d67cd94acf75d7e00f27015ec5e31242adad0967eee473f49c5d1d686169, oOperator = 21fe31dfa154a261626bf854046fd2271b7bed4b6abe45aa58877ef47f9721b9, oFee = 1000000, oAsset = (9a91216e55e5369b926acc07c70a11d9ae7fef454e43e3e5c0aa1733f48c798a,\"USDT\")}"
[INFO] Activated instance 5bac6e67-f956-45ef-b386-f1d045cf5e37 on W2
[INFO] Activated instance 2c3a2794-2592-4c2b-9a7d-9c810cedf886 on W3
[INFO] Activated instance 6f8d611d-a3f6-4794-9048-8ea3201e3c56 on W4
[INFO] Activated instance 387d9651-6024-48c1-a72d-5b3c6d3a6b53 on W5
```

Ví dụ, chúng ta có thể thấy nơi chúng ta có thể tìm thấy ID phiên bản của các hợp đồng nếu chúng ta muốn tương tác với chúng thông qua API.

``` {.}
[INFO] Activated instance deceaa52-f117-46bc-b0f1-eb1f2f529b5a on W1
```

Nếu bây giờ chúng ta dừng máy chủ và tìm trong thư mục, chúng ta sẽ thấy các tệp mà chúng ta đã lưu trữ các ID phiên bản.

``` {.}
[nix-shell:~/git/ada/pioneer-fork/code/week06]$ ls
app            dist-newstyle  LICENSE     plutus-pioneer-program-week06.cabal  W2.cid  W4.cid
cabal.project  hie.yaml       oracle.cid  src                                  W3.cid  W5.cid

[nix-shell:~/git/ada/pioneer-fork/code/week06]$ cat W5.cid 
387d9651-6024-48c1-a72d-5b3c6d3a6b53
```

Với thông tin này - thu được từ nhật ký máy chủ web hoặc từ các tệp chúng tôi đã tạo, chúng tôi có thể sử dụng bất kỳ công cụ HTTP nào như Curl hoặc Postman để tương tác với các hợp đồng khi máy chủ web đang chạy. Theo mặc định, nó chạy trên cổng 8080. Chúng tôi cũng có thể viết mã bằng bất kỳ ngôn ngữ lập trình nào mà chúng tôi muốn để tương tác với máy chủ web bằng cách sử dụng các endpoints HTTP.

Bây giờ chúng ta sẽ xem xét ngắn gọn về `oracle-client` và `swap-client`. Chúng tôi sẽ không đi vào quá nhiều chi tiết vì chúng tôi không quá quan tâm đến cách viết giao diện người dùng ở đây.

### Oracle Client

Chúng tôi sử dụng thư viện Haskell `Req`  ể tương tác với máy chủ web.

Đầu tiên chúng tôi đọc tệp `oracle.cid`  để lấy ID phiên bản oracle. Sau đó, chúng ta có một hàm đệ quy `go`.

Hàm `go` tra cứu tỷ giá hối đoái hiện tại trên CoinMarketCap, kiểm tra xem điều đó đã thay đổi hay chưa, và nếu có thay đổi, nó sẽ gọi hàm `updateOracle` này gọi là `endpoint updateOracle` trên hợp đồng của chúng tôi. Và, cho dù thay đổi có được phát hiện hay không, nó sẽ đợi trong năm giây (tùy ý), rồi lại tiếp tục.

Thời gian trì hoãn sẽ phụ thuộc vào những điều như giới hạn tỷ lệ do CoinMarketCap áp đặt. Trên thực tế, vì các khối trên Cardano chỉ xuất hiện hai mươi giây một lần, nên năm giây có lẽ là quá ngắn.

``` {.haskell}
main :: IO ()
main = do
    uuid <- read <$> readFile "oracle.cid"
    putStrLn $ "oracle contract instance id: " ++ show uuid
    go uuid Nothing
  where
    go :: UUID -> Maybe Integer -> IO a
    go uuid m = do
        x <- getExchangeRate
        let y = Just x
        when (m /= y) $
            updateOracle uuid x
        threadDelay 5_000_000
        go uuid y
```

Bây giờ, hàm `updateOracle`  chuẩn bị một yêu cầu POST bằng cách sử dụng ID phiên bản oracle và một phần thân JSON chứa tỷ giá hối đoái.

``` {.haskell}
updateOracle :: UUID -> Integer -> IO ()
updateOracle uuid x = runReq defaultHttpConfig $ do
    v <- req
        POST
        (http "127.0.0.1" /: "api"  /: "new" /: "contract" /: "instance" /: pack (show uuid) /: "endpoint" /: "update")
        (ReqBodyJson x)
        (Proxy :: Proxy (JsonResponse ()))
        (port 8080)
    liftIO $ putStrLn $ if responseStatusCode v == 200
        then "updated oracle to " ++ show x
        else "error updating oracle"
```

Vad đây là hàm `getExchangeRate` cái mà nhanh chóng và hiệu quả để nhận tỷ giá hối đoái từ CoinMarketCap. Họ cung cấp một API thích hợp, nhưng ở đây chúng tôi chỉ thực hiện một số thao tác quét màn hình từ trang web và sử dụng `regex` để trích xuất giá trị mà chúng tôi quan tâm. Tất nhiên, điều này rất mỏng manh và không bao giờ có thể được sử dụng làm mã sản xuất.

``` {.haskell}
getExchangeRate :: IO Integer
getExchangeRate = runReq defaultHttpConfig $ do
    v <- req
        GET
        (https "coinmarketcap.com" /: "currencies" /: "cardano")
        NoReqBody
        bsResponse
        mempty
    let priceRegex      = "priceValue___11gHJ\">\\$([\\.0-9]`)" :: ByteString
        (_, _, _, [bs]) = responseBody v =~ priceRegex :: (ByteString, ByteString, ByteString, [ByteString])
        d               = read $ unpack bs :: Double
        x               = round $ 1_000_000 ` d
    liftIO $ putStrLn $ "queried exchange rate: " ++ show d
    return x    
```

Hãy để chúng tôi chạy nó.

Trước tiên, chúng ta cần đảm bảo rằng PAB đang chạy.

``` {.}
cabal run oracle-pab 
```

Sau đó, trong một thiết bị đầu cuối khác (terminal)

``` {.}
cabal run oracle-client
...
queried exchange rate: 1.54
updated oracle to 1540000
queried exchange rate: 1.54
```

Chúng ta có thể thấy tỷ giá hối đoái mà nó thu được từ CoinMarketCap và yêu cầu cập nhật oracle.

Và nếu chúng ta đợi đủ lâu, chúng ta sẽ thấy

``` {.}
queried exchange rate: 1.55
updated oracle to 1550000
queried exchange rate: 1.55
```

Và chúng tôi thấy rằng chúng tôi đang di chuyển.

Nếu bạn chuyển trở lại PAB, bạn cũng sẽ thấy các thông báo nhật ký bổ sung.

``` {.}
[INFO] Slot 16: W1: Balancing an unbalanced transaction:
    Tx:
    Tx c5b384f75f93ebc8f1e6b514237aa70d0d982e9b035eececa27af0b3e72568e4:
        {inputs:
        outputs:
        - Value (Map [(b8a1d67cd94acf75d7e00f27015ec5e31242adad0967eee473f49c5d1d686169,Map [("",1)])]) addressed to
            addressed to ScriptCredential: 04a718132f7ca493a011c40926e191a76bd84cbf8e7c14b6c99bbea8b8bc0bba (no staking credential)
        forge: Value (Map [])
        fee: Value (Map [(,Map [("",10)])])
        mps:
        signatures:
        validity range: Interval {ivFrom = LowerBound NegInf True, ivTo = UpperBound PosInf True}
        data:
        1540000}
    Requires signatures:
[INFO] Slot 16: TxnValidate 40c5dbb5e7c8de390a6943d8f0a84d218cf86dd81af1fd7cfc62612e6b616c2c
[INFO] 5d9d778e-55f9-45ab-89a6-2ba9aa18045e: "set initial oracle value to 1540000"
```

### Swap Client

The swap client rất đơn giản.

Ở đây, chúng tôi chỉ đưa ra một giao diện bảng điều khiển đơn giản, vì vậy chúng tôi không bận tâm đến đồ họa hoặc giao diện người dùng web.

``` {.haskell}
main :: IO ()
main = do
    [i :: Int] <- map read <$> getArgs
    uuid       <- read <$> readFile ('W' : show i ++ ".cid")
    hSetBuffering stdout NoBuffering
    putStrLn $ "swap contract instance id for Wallet " ++ show i ++ ": " ++ show uuid
    go uuid
  where
    go :: UUID -> IO a
    go uuid = do
        cmd <- readCommand
        case cmd of
            Offer amt -> offer uuid amt
            Retrieve  -> retrieve uuid
            Use       -> use uuid
            Funds     -> getFunds uuid
        go uuid

    readCommand :: IO Command
    readCommand = do
        putStr "enter command (Offer amt, Retrieve, Use or Funds): "
        s <- getLine
        maybe readCommand return $ readMaybe s
```

Ý tưởng là lấy một lệnh từ bảng điều khiển và gọi endpoint thích hợp. .

``` {.haskell}
case cmd of
    Offer amt -> offer uuid amt
    Retrieve  -> retrieve uuid
    Use       -> use uuid
    Funds     -> getFunds uuid
```

Việc gọi endpoint sử dụng cùng một phương thức cho mỗi endpoint, tạo ra một cuộc gọi HTTP giống như cách mà chúng tôi đã làm cho ứng dụng  Oracle Client.

Các hàm `getFunds` hơi phức tạp hơn so với ba hàm kia vì nó cần để có được thông tin từ máy chủ. Đối với điều này, nó cần phải thực hiện hai yêu cầu. Yêu cầu thứ hai là đọc trạng thái `told` của lần gọi đầu tiên.

``` {.haskell}
getFunds :: UUID -> IO ()
getFunds uuid = handle h $ runReq defaultHttpConfig $ do
    v <- req
        POST
        (http "127.0.0.1" /: "api"  /: "new" /: "contract" /: "instance" /: pack (show uuid) /: "endpoint" /: "funds")
        (ReqBodyJson ())
        (Proxy :: Proxy (JsonResponse ()))
        (port 8080)
    if responseStatusCode v /= 200
        then liftIO $ putStrLn "error getting funds"
        else do
            w <- req
                GET
                (http "127.0.0.1" /: "api"  /: "new" /: "contract" /: "instance" /: pack (show uuid) /: "status")
                NoReqBody
                (Proxy :: Proxy (JsonResponse (ContractInstanceClientState OracleContracts)))
                (port 8080)
            liftIO $ putStrLn $ case fromJSON $ observableState $ cicCurrentState $ responseBody w of
                Success (Last (Just f)) -> "funds: " ++ show (flattenValue f)
                _                       -> "error decoding state"
  where
    h :: HttpException -> IO ()
    h _ = threadDelay 1_000_000 >> getFunds uuid
```

Hãy chạy ứng dụng Swap client. Chúng tôi sẽ để máy chủ web và ứng dụng oracle client đang chạy.

Khi sử dụng cabal, chúng ta truyền các tham số như sau `--`. Đối với ứng dụng oracle client, chúng tôi chuyển số ví vào làm tham số.

Chúng tôi sẽ khởi chạy ứng dụng Swap client cho ví 2 và 3, mỗi ví trong một cửa sổ riêng biệt và truy vấn số tiền tương ứng của chúng.

``` {.}
cabal run swap-client -- 2

swap contract instance id for Wallet 2: ab65f248-450d-4988-ab2a-651ad5697596
enter command (Offer amt, Retrieve, Use or Funds): Funds
funds: [(9a91216e55e5369b926acc07c70a11d9ae7fef454e43e3e5c0aa1733f48c798a,"USDT",100000000),(,"",100000000)]
enter command (Offer amt, Retrieve, Use or Funds): 
```

``` {.}
cabal run swap-client -- 3

swap contract instance id for Wallet 3: 2dc4f6f2-142e-40a2-a1b8-c431eb29a3a2
enter command (Offer amt, Retrieve, Use or Funds): Funds
funds: [(9a91216e55e5369b926acc07c70a11d9ae7fef454e43e3e5c0aa1733f48c798a,"USDT",100000000),(,"",100000000)]
enter command (Offer amt, Retrieve, Use or Funds): 
```

Ví 2 hiện cung cấp 10 Ada dưới dạng hoán đổi và chúng tôi kiểm tra tiền và chúng tôi thấy rằng số dư Ada đã giảm xuống (bằng 10 Ada cộng với phí giao dịch), nhưng số dư Mã thông báo USD vẫn giữ nguyên.

``` {.}
enter command (Offer amt, Retrieve, Use or Funds): Offer 10000000
offered swap of 10000000 lovelace
enter command (Offer amt, Retrieve, Use or Funds): Funds
funds: [(9a91216e55e5369b926acc07c70a11d9ae7fef454e43e3e5c0aa1733f48c798a,"USDT",100000000),(,"",89999990)]
```

Trong khi các lệnh này đang chạy, bạn cũng có thể thấy các lệnh gọi đang được thực hiện trong đầu ra PAB.

``` {.}
INFO] Slot 1662: TxnValidate 17f640f03e4dc7d0a4c246129454aa19daa8d9d674bfebeeee486d6143c6648e
[INFO] ab65f248-450d-4988-ab2a-651ad5697596: "offered 10000000 lovelace for swap"
[INFO] ab65f248-450d-4988-ab2a-651ad5697596: "own funds: [(9a91216e55e5369b926acc07c70a11d9ae7fef454e43e3e5c0aa1733f48c798a,\"USDT\",100000000),(,\"\",89999990)]"    
```

Now, Wallet 3 is going to take up the offer of the swap.
Bây giờ, Wallet 3 sẽ nhận offer của hoán đổi.

``` {.}
enter command (Offer amt, Retrieve, Use or Funds): Use
used swap
enter command (Offer amt, Retrieve, Use or Funds): Funds
funds: [(9a91216e55e5369b926acc07c70a11d9ae7fef454e43e3e5c0aa1733f48c798a,"USDT",100000000),(,"",100000000)]
```

Sẽ mất một chút thời gian để cập nhật tiền, vì vậy hãy thử lại lệnh `Funds` 

``` {.}
enter command (Offer amt, Retrieve, Use or Funds): Funds
funds: [(9a91216e55e5369b926acc07c70a11d9ae7fef454e43e3e5c0aa1733f48c798a,"USDT",84400000),(,"",108999990)]
```

Cái đó tốt hơn. Và chúng ta có thể thấy rằng ví 3 đã nhận được 10 Ada, trừ đi phí oracle của 1 Ada và trừ đi phí giao dịch.

Trong đầu ra PAB, chúng tôi thấy một cái gì đó như

``` {.}
[INFO] Slot 1868: TxnValidate 00afd25af063d58b4f290e43057f4738483098f26ff0134bc14c9d54b9b94090
[INFO] 2dc4f6f2-142e-40a2-a1b8-c431eb29a3a2: "made swap with price [(9a91216e55e5369b926acc07c70a11d9ae7fef454e43e3e5c0aa1733f48c798a,\"USDT\",15600000)]"
[INFO] 2dc4f6f2-142e-40a2-a1b8-c431eb29a3a2: "own funds: [(9a91216e55e5369b926acc07c70a11d9ae7fef454e43e3e5c0aa1733f48c798a,\"USDT\",84400000),(,\"\",108999990)]"
```

Hãy xem xét quỹ của ví 2.

``` {.}
enter command (Offer amt, Retrieve, Use or Funds): Funds
funds: [(9a91216e55e5369b926acc07c70a11d9ae7fef454e43e3e5c0aa1733f48c798a,"USDT",115600000),(,"",89999990)]
```

Và chúng tôi thấy rằng ví 2 đã mất một số Ada, nhưng đã thu được một số Token USD. Việc hoán đổi đã hoàn tất, sử dụng tỷ giá hối đoái đang diễn ra, ngay bây giờ, đã được đưa vào blockchain giả thông qua oracle.

Vì vậy, bây giờ chúng ta đã thấy một ví dụ end-to-end của Plutus dApp. Nó có giao diện người dùng, nó nói chuyện với thế giới bên ngoài, truy cập internet, lấy thông tin và tương tác với các hợp đồng thông minh của Plutus. Các hợp đồng thông minh gửi các giao dịch tới blockchain nơi logic xác thực bắt đầu và đảm bảo rằng mọi thứ tuân theo các quy tắc kinh doanh.

Trong ví dụ này, vì chúng ta không có blockchain thực để chơi cùng, nên tất cả các ví đều sử dụng cùng một máy chủ PAB, tất nhiên, trong cuộc sống thực sẽ là ngớ ngẩn. Rõ ràng, các ví khác nhau sẽ có các phiên bản PAB chạy khác nhau.

Nhưng, ngoài điều đó ra, nó gần như chính xác là end-to-end, cách một hệ thống như vậy sẽ hoạt động.
