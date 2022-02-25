Hướng dẫn tập lệnh trình xác thực
=============

Một tập lệnh xác thực (Validator scripts) được sử dụng để khóa các đầu ra giao dịch trên chuỗi. Nó được gắn vào đầu ra tập lệnh trong mô hình UTXO mở rộng và xác định địa chỉ của đầu ra. Nó phải trả về số dương để đầu ra được chi tiêu.

Mục đích của tập lệnh trình xác thực là báo hiệu thất bại. Nếu không thành công, nó báo hiệu rằng nỗ lực chi tiêu đầu ra không hợp lệ và do đó giao dịch sẽ thất bại. Nó chỉ ra lỗi khi sử dụng nội trang PlutusTx.Builtins.error.

Các tập lệnh của trình xác thực được viết dưới dạng các hàm Haskell, được biên dịch với Plutus Tx thành Plutus Core. Loại hàm xác thực là Data -> Data -> Data -> () - một hàm nhận ba đối số kiểu data và trả về giá trị kiểu () (“đơn vị” hoặc “bộ giá trị trống”-“unit” or “the empty tuple”).

## Hiểu biết trực quan về hàm trình xác nhận.

Hãy bắt đầu với một vài ví dụ trong mã giả. Đây là những ví dụ về những thứ cần phải đáp ứng “quy tắc”-“rule” trước khi thực hiện một “hành động”-“action”.

### Example 1: Ferris Wheel

Ví dụ, một đứa trẻ muốn đi đu quay, nhưng trước khi lên, chúng phải cao hơn biển báo an toàn.

Chúng tôi có thể diễn đạt ý tưởng đó bằng mã giả, như:


```python

if isTallEnough(attraction=ferrisWheel,passenger=michael):
    getOnFerrisWheel()

def isTallEnough(attraction,kid):
    return kid["height"] >= attraction["minimumHeight"]

def getOnFerrisWheel():
    print ("get On the Ferris Wheel")

ferrisWheel = {"minimumHeight":120}
michael = {"height":135}
```


### Example 2: Drinking age

 Một ví dụ khác có thể là một người trẻ tuổi đang cố gắng mua bia trong quán bar. Nhưng trước khi có thể làm được điều đó, trước tiên cô ấy phải tuân thủ quy định rằng cô ấy phải đủ tuổi uống rượu hợp pháp tại quốc gia có quán bar.

```python
if mayLegalyDrink(country=USA,person=sarah):
    payBeer()

def mayLegalyDrink(country,person):
    return person["age"] >= country["drinkingAge"]

def payBeer()
    print ("enjoy your beer")

usa = {"drinkingAge":21}
sarah = {"age":18}

```

Với hai ví dụ này, chúng ta đã có thể xác định một `mẫu` -`pattern`.

### Hàm Validator và script mẫu

Một hành động : `getOnFerrisWheel()`, `payBeer()` cần phải vượt qua quy tắc: `isTallEnough()`, `mayLegalyDrink()` trước khi được thực hiện. Quy tắc cần hai bit thông tin: một context `attraction`, `country` và một số dữ liệu dành riêng cho trường hợp quy tắc `michael`, `sarah` này.

Bây giờ chúng ta có thể dịch những khái niệm đó thành tên mà chúng được đặt trong Plutus. Hành động được thực hiện là redeemer, quy tắc được gọi là validator function, Context là `Script Context` và dữ liệu được gọi là `datum`.

Với thông tin đó, chúng ta có thể tạo một chương trình khác thực sự tóm tắt hai chương trình trước đó. Chúng ta có thể gọi nó  `performActionGivenARule` nhưng hãy sử dụng nó là Plutus name: `makeValidator`


```python

def makeValidator(validator,context,datum,redeemer):
    return lambda: if validator(context,datum): redeemer()

```

Với chức năng này, bây giờ chúng ta có thể định nghĩa các ví dụ trước đây của chúng ta đơn giản là `contracts`.

```python
example1 = makeValidator(validator=isTallEnough
                        ,context=ferrisWheel
                        ,datum=michael
                        ,redeemer=getOnFerrisWheel)
example2 = makeValidator(validator=mayLegalyDrink
                        ,context=usa
                        ,datum=sarah
                        ,redeemer=payBeer)
```


Vì vậy, với tất cả các ví dụ này, chúng ta có thể tạo ra một định nghĩa trực quan về trình xác nhận.


> Trình xác thực là một hàm mã hóa một quy tắc. Các tham số của nó là `Context`, trạng thái của thế giới và datum, một phiên bản cụ thể của dữ liệu. Nó thành công miễn là nó không ném ra một ngoại lệ.

Bây giờ chúng ta đã biết hàm xác nhận là gì, hãy định nghĩa trình xác thực *script*.

> Một hàm trình xác thực đã được biên dịch bằng cách sử dụng 	`PlutusTX.compile` và template Haskell được gọi là một tập lệnh trình xác nhận. Mã băm sẽ được sử dụng làm địa chỉ cho tập lệnh.

## Validators trong hợp đồng Plutus 

Bây giờ chúng ta hãy xem xét các hợp đồng Plutus thực tế, không còn mã giả nữa và xem cách chúng triển khai các hàm xác thực và tập lệnh trình xác thực.

### Ví dụ: Vesting
Hãy tưởng tượng chúng ta muốn để lại tài sản thừa kế cho con mình. Tuy nhiên, cô ấy chỉ có thể nhận được tài sản thừa kế khi cô ấy bước sang tuổi 18. Phân tích toàn bộ ví dụ nằm ngoài phạm vi của bài viết này, nhưng nó được trình bày chi tiết trong Bài giảng thứ 3 của chương trình Plutus Pioneer, với mã hoàn chỉnh và bài giảng ghi chú bởi cộng đồng.


#### Định nghĩa hàm validator

Vì vậy, chúng ta cần tạo một hàm xác nhận có tính đến thời gian yêu cầu được thực hiện.

```haskell
{-# INLINABLE mkValidator #-}
mkValidator :: VestingDatum -> () -> ScriptContext -> Bool
mkValidator dat () ctx = traceIfFalse "beneficiary's signature missing" signedByBeneficiary &&
                         traceIfFalse "deadline not reached" deadlineReached
  where
    info :: TxInfo
```
Vesting [validator function (Bấm vào đây để xem mã ngồn hoàn chỉnh)](https://github.com/input-output-hk/plutus-pioneer-program/blob/3a7d675f7b53dcd846a0c286c1f56170d079e3ef/code/week01/src/Week01/EnglishAuction.hs#L102-L123)

#### Chuyển hàm validator thành script validator

Bây giờ chúng ta tạo Tập lệnh xác thực của chức năng trình xác thực.

```haskell
...

typedValidator :: Scripts.TypedValidator Vesting
typedValidator = Scripts.mkTypedValidator @Vesting
    $$(PlutusTx.compile [|| mkValidator ||])
    $$(PlutusTx.compile [|| wrap ||])
  where
    wrap = Scripts.wrapValidator @VestingDatum @()
...
```

#### Tạo address cho contract

Và cuối cùng bạn có thể thực hiện một số dòng lệnh củ thể để triển khai:

```haskell
...

validator :: Validator
validator = Scripts.validatorScript typedValidator


valHash :: Ledger.ValidatorHash
valHash = Scripts.validatorHash typedValidator


scrAddress :: Ledger.Address
scrAddress = scriptAddress validator
...

```

### Ví dụ: Đấu giá `English auction`

Mục tiêu của một cuộc đấu giá kiểu Anh là bán thứ gì đó cho người trả giá cao nhất. Phân tích toàn bộ ví dụ nằm ngoài phạm vi của bài viết này, nhưng nó được trình bày chi tiết trong bài giảng đầu tiên của chương trình Plutus Pioneer, với mã hoàn chỉnh và bài giảng được cộng đồng ghi chú.

Để xem lại toàn bộ chương trình, [hãy tham khảo video bài giảng](https://www.youtube.com/watch?v=CJD8ctJqDw0&list=PLbQhX3HIoPxqNPogQcvr9dwlg6Z96GZIL&index=1), hoặc các ghi chú xuất sắc. Tuy nhiên, chúng tôi muốn tập trung vào hai phần:

#### Định nghĩa hàm validator
Vì vậy, hãy bắt đầu bằng cách xác định hàm trình xác nhận sẽ quyết định xem hành động `redeem` có thể thực hiện được với `Context` hiện tại và `datum` hay không.


```haskell
{-# INLINABLE mkAuctionValidator #-}
mkAuctionValidator :: AuctionDatum -> AuctionAction -> ScriptContext -> Bool
mkAuctionValidator ad redeemer ctx =
    traceIfFalse "wrong input value" correctInputValue &&
    case redeemer of
        MkBid b@Bid{..} ->
            traceIfFalse "bid too low" (sufficientBid bBid)                &&
            traceIfFalse "wrong output datum" (correctBidOutputDatum b)    &&
            traceIfFalse "wrong output value" (correctBidOutputValue bBid) &&
            traceIfFalse "wrong refund"       correctBidRefund             &&
            traceIfFalse "too late"           correctBidSlotRange
        Close           ->
            traceIfFalse "too early" correctCloseSlotRange &&
            case adHighestBid ad of
                Nothing      ->
                    traceIfFalse "expected seller to get token" (getsValue (aSeller auction) tokenValue)
                Just Bid{..} ->
                    traceIfFalse "expected highest bidder to get token" (getsValue bBidder tokenValue) &&
                    traceIfFalse "expected seller to get highest bid" (getsValue (aSeller auction) $ Ada.lovelaceValueOf bBid)


  where
    info :: TxInfo

```
English Aauction [validator function (bấm vào đây để xem code hoàn chỉnh)](https://github.com/input-output-hk/plutus-pioneer-program/blob/3a7d675f7b53dcd846a0c286c1f56170d079e3ef/code/week01/src/Week01/EnglishAuction.hs#L102-L123)

Hãy quan sát rằng hàm `makeAuctionValidator` là một hàm nhận các tham số như datum, redeemer and a context…  giống như phiên bản pseudo của chúng tôi!


#### Chuyển đổi hàm validator thành script validator .

Bây giờ khi chúng ta có hàm validator, chúng ta có thể tạo tập lệnh trình xác nhận *script* . Như chúng tôi đã thiết lập trước đây là hàm xác thực đã được biên dịch thông qua haskell mẫu và được nội tuyến trong chương trình.

```haskell

auctionTypedValidator :: Scripts.TypedValidator Auctioning
auctionTypedValidator = Scripts.mkTypedValidator @Auctioning
    $$(PlutusTx.compile [|| mkAuctionValidator ||])
    $$(PlutusTx.compile [|| wrap ||])
  where
    wrap = Scripts.wrapValidator
```
 Tấp lệnh xác thực "Validator Script" kiểu Anh

Bây giờ như chúng ta có thể thấy, hàm `mkAuctionValidator` được biên dịnh với `template haskell` thành `plutus core`. `PlutusTx.compile [|| … ||]` tức nó được nối “spliced” i.e. với `$$(...)` trong sẵn trương trình hiện tại

#### Tạo địa chỉ của contract

Khi tập lệnh trình xác thực được tạo, chúng tôi có thể tính toán địa chỉ của nó sẽ là gì:

```haskell

...
auctionValidator :: Validator
auctionValidator = Scripts.validatorScript auctionTypedValidator


auctionAddress :: Ledger.ValidatorHash
auctionAddress = Scripts.validatorHash auctionValidator
...

```

### Tóm tắt tập lệnh trình xác thực 

Với hai ví dụ trước, thật dễ dàng để trừu tượng hóa mẫu cần thiết để tạo các tập lệnh trình xác nhận:

1. Định nghĩa một hàm xác nhận mà nếu không gặp lỗi có nghĩa là nó đã thành công.
    * Hàm trình xác thực sẽ nhận dưới dạng các tham số là datum,  context và redeemer (i.e. the action)
2. Chuyển đổi hàm trình xác thực thành tập lệnh trình xác nhận-`script`.
    * Điều này yêu cầu sử dụng template haskell `[|| … |]]` và `PlutusTX.compile`. Tuy nhiên, nó luôn luôn giống nhau.
3. Tạo địa chỉ hợp đồng trong blockchain
    * Nó luôn giống như boilerplate: tạo script với: `Scripts.validatorScript typedValidator`
    * tính toán băm-hash của kiểu validator `Script.validatorHash typedValidator`
    * Tính toán địa chỉ tập lệnh với `scriptAddress validator`

## Takeaways

* Một hàm validator:
  * Thành công miễn là nó không gây ra lỗi.
  * Yêu cầu: Datum (tức là thông tin về hành động), Redeemer (hành động muốn được thực hiện), và Context
  * Được biên dịch thành tập lệnh trình xác thực với `PlutusTx.compile` và `template haskell`

* Một script validator 

  * Nó được tạo từ một hàm xác thực
  * Mã không được lưu trữ trên blockchain, *cho đén khi* giao dịch reedemer thực sự thực thi.
  * Bạn cần tính toán địa chỉ của nó với `scriptAddress`
