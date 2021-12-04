Week 03 - Script Context
========================

::: {.note}
::: {.title}
Note
:::

Đây là phiên bản đã dịch của [Bài giảng số 3 Dr. Lars](https://youtu.be/WG3uw-TkW2k).

Trong bài giảng này, chúng ta tìm hiểu về context script (đối số xác thực thứ ba), thời gian xử lý và các hợp đồng được tham số hóa.

Đoạn mã trong bài giảng này sử dụng Plutus commit

The code in this lecture uses Plutus commit
`81ba78edb1d634a13371397d8c8b19829345ce0d`.

Trước khi chúng ta bắt đầu
---------------

Kể từ bài giảng cuối cùng đã có một bản cập nhật cho sân chơi, có trong bản cam kết Plutus mà chúng tôi đang sử dụng cho bài giảng này (xem ghi chú ở trên).

Đã xảy ra sự cố khi thời gian chờ được mã hóa cứng vào sân chơi quá ngắn. Điều này sẽ khiến mô phỏng không thành công nếu chúng mất nhiều thời gian hơn thời gian chờ mã cứng.

Bây giờ có một tùy chọn khi bạn khởi động Máy chủ sân chơi Plutus cho phép bạn chỉ định thời gian chờ. Ví dụ sau đặt thời gian chờ thành 120 giây.

``` {.}
plutus-playground-server -i 120s
```

Tóm tắt lại
-----

Khi chúng tôi đã giải thích (E) UTxO mô hình trong bài giảng đầu tiên, chúng tôi đề cập rằng để mở khóa một địa chỉ kịch bản, kịch bản gắn liền với địa chỉ được chạy, và kịch bản mà được ba mẩu thông tin - 
*datum*,  *redeemer* và *context*.

Trong bài giảng thứ hai, chúng ta đã xem các ví dụ về điều đó và chúng ta đã thấy nó thực sự hoạt động như thế nào trong Haskell.

Chúng tôi đã thấy việc triển khai cấp thấp, trong đó cả ba đối số đều được biểu thị bằng kiểu `Data`. Chúng tôi cũng thấy rằng trong thực tế điều này không được sử dụng.

Thay vào đó, chúng tôi sử dụng phiên bản đã nhập, trong đó dữ liệu và công cụ đổi có thể là kiểu tùy chỉnh (miễn là chúng triển khai lớp kiểu `IsData`) và trong đó đối số thứ ba là kiểu `ScriptContext`.

Trong các ví dụ mà chúng tôi đã thấy cho đến nay, chúng tôi đã xem xét dữ liệu và công cụ đổi, nhưng chúng tôi luôn bỏ qua ngữ cảnh. Nhưng bối cảnh, tất nhiên, rất quan trọng. Vì vậy, trong bài giảng này, chúng ta sẽ bắt đầu xem xét context.

ScriptContext
-------------

`ScriptContext` được định nghĩa trong gói `plutus-ledger-api`, mà là một gói phần mềm đó, cho đến bây giờ, chúng tôi đã không cần thiết. Nhưng bây giờ chúng tôi cần nó, và nó đã được đưa vào files `.cabal` của tuần này . Nó được định nghĩa trong mô-đun `Plutus.V1.Ledger.Contexts`.

``` {.haskell}
data ScriptContext = ScriptContext { 
            scriptContextTxInfo :: TxInfo, 
            scriptContextPurpose :: ScriptPurpose 
      }
```

Nó là một loại bản ghi có hai trường.

Trường thứ hai thuộc loại `ScriptPurpose`, được xác định trong cùng một mô-đun. Nó xác định mục đích mà một tập lệnh đang được chạy.

``` {.haskell}
data ScriptPurpose
   = Minting CurrencySymbol
   | Spending TxOutRef
   | Rewarding StakingCredential
   | Certifying DCert
```

Đối với chúng tôi, quan trọng nhất là `Spending`. Đây là những gì chúng ta đã nói cho đến nay trong context của mô hình (E) UTxO. Đây là khi một tập lệnh được chạy để xác thực đầu vào chi tiêu cho một giao dịch.

Các `Minting` dùng khi bạn muốn định nghĩa một token gốc. Mục đích của nó là chúng tôi mô tả trong những trường hợp nào token gốc có thể được đúc hoặc đốt.

Ngoài ra còn có hai mục đích hoàn toàn mới -`Rewarding`-  liên quan đến đặt cược và _`Certifying`_  liên quan đến ủy quyền cổ phần.

Trường thú vị nhất, trường chứa ngữ cảnh thực tế `scriptContextTxInfo` là trường thuộc loại `TxInfo`, cũng được xác định trong cùng một mô-đun.

``` {.haskell}
data TxInfo = TxInfo
   { txInfoInputs      :: [TxInInfo] -- ^ Transaction inputs
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

Nó mô tả giao dịch chi tiêu. Trong mô hình (E) UTxO, bối cảnh xác thực là giao dịch chi tiêu và các đầu vào và đầu ra của nó. Bối cảnh này được thể hiện trong `TxInfo`.

Có một số trường là toàn cầu cho toàn bộ giao dịch và cụ thể là chúng tôi có danh sách tất cả các đầu vào `txInfoInputs` và danh sách tất cả các đầu ra `txInfoOutputs`. Mỗi người trong số họ có nhiều lĩnh vực khác nhau để đi sâu vào từng đầu vào hoặc đầu ra riêng lẻ.

Chúng tôi cũng thấy các trường về phí `txFee`, giá trị giả mạo `txInfoForge`, được sử dụng khi đúc hoặc đốt các token gốc.

Sau đó, chúng tôi có một danh sách các chứng chỉ ủy quyền trong `txInfoDCert` và một trường `txInfoWdrl` để nắm giữ thông tin về việc rút tiền đặt cược.

Trường `txInfoValidRange` mà chúng ta sẽ xem xét chi tiết hơn trong giây lát, xác định phạm vi vị trí mà giao dịch này hợp lệ.

`txInfoSignatories` là danh sách các khóa công khai đã ký kết giao dịch này.

Các giao dịch sử dụng đầu ra tập lệnh cần phải bao gồm dữ liệu của đầu ra tập lệnh. Các `txInfoData` lĩnh vực là một danh sách liên kết datums với băm tương ứng của họ. Nếu có một đầu ra giao dịch tới một địa chỉ tập lệnh mang một số dữ liệu nào đó, bạn không cần phải bao gồm dữ liệu đó, bạn chỉ có thể bao gồm băm dữ liệu. Tuy nhiên, các tập lệnh sử dụng một đầu ra cần phải bao gồm dữ liệu, trong trường hợp đó, nó sẽ được đưa vào danh sách `txInfoData` .

Cuối cùng, trường `txInfoId` là ID của giao dịch này.

### txInfoValidRange

Mặc dù có rất nhiều thông tin chứa trong kiểu `txInfo`, nhưng đối với ví dụ đầu tiên của chúng tôi về cách sử dụng đối số thứ ba để xác thực, chúng tôi sẽ tập trung vào trường `txInfoValidRange` này.

Điều này đưa chúng ta đến một tình huống khó xử thú vị. Chúng tôi đã nhấn mạnh nhiều lần rằng lợi thế lớn mà Cardano có so với một thứ như Ethereum là việc xác thực có thể xảy ra trong ví. Nhưng chúng tôi cũng đã lưu ý rằng một giao dịch vẫn có thể không thành công on-chain sau khi xác thực, nếu khi giao dịch trên blockchain, nó đã bị người khác sử dụng. Trong trường hợp này, giao dịch không thành công mà không phải trả phí.

Điều không bao giờ nên xảy ra trong các trường hợp bình thường là một tập lệnh xác thực chạy và sau đó không thành công. Điều này là do bạn luôn có thể chạy xác thực trong cùng một điều kiện trong ví, vì vậy nó sẽ không thành công trước khi bạn gửi nó.

Vì vậy, đó là một tính năng rất hay, nhưng không rõ ràng là làm thế nào để quản lý thời gian trong context đó. Thời gian rất quan trọng, bởi vì chúng tôi muốn thể hiện rằng một giao dịch nhất định chỉ có hiệu lực trước hoặc chỉ có hiệu lực sau khi đã đạt đến một thời điểm nhất định.

Chúng ta đã thấy một ví dụ về điều này trong bài giảng một - ví dụ đấu giá (bid), trong đó giá thầu chỉ được phép cho đến khi đạt đến thời hạn cuối cùng và `close` chỉ khi có thể gọi _Endpoint_ sau khi thời hạn đã qua.

Điều đó dường như là một sự mâu thuẫn, bởi vì thời gian rõ ràng là đang trôi. Vì vậy, khi bạn cố gắng xác thực một giao dịch mà bạn đang tạo trong ví của mình, tất nhiên, thời gian bạn đang thực hiện có thể khác với thời gian giao dịch đến một nút để xác thực. Vì vậy, không rõ làm thế nào để kết hợp hai điều này lại với nhau để xác thực là xác định và để đảm bảo rằng nếu và chỉ khi, xác thực thành công trong ví, thì nó cũng sẽ thành công trong nút.

Cách Cardano giải quyết điều đó, là bằng cách thêm trường phạm vi vị trí `txInfoValidRange` vào một giao dịch, về cơ bản nói rằng "Giao dịch này hợp lệ giữa vị trí này và vị trí kia ".

Khi một giao dịch được gửi đến blockchain và được xác thực bởi một nút, sau đó trước khi chạy bất kỳ tập lệnh nào, một số kiểm tra chung sẽ được thực hiện, chẳng hạn như tất cả các đầu vào đều có mặt và số dư cộng lại, phí được bao gồm, v.v.

Một trong những kiểm tra xảy ra trước khi xác thực là kiểm tra xem phạm vi vị trí có hợp lệ hay không. Nút sẽ xem xét thời điểm hiện tại và kiểm tra xem nó có nằm trong phạm vi vị trí hợp lệ của giao dịch hay không. Nếu không, thì xác thực không thành công ngay lập tức mà không bao giờ chạy các tập lệnh trình xác thực.

Vì vậy, nếu kiểm tra trước thành công, thì điều này có nghĩa là thời gian hiện tại rơi vào phạm vi vị trí hợp lệ. Đến lượt nó, điều này có nghĩa là chúng ta lại hoàn toàn xác định được. Tập lệnh xác thực có thể đơn giản giả định rằng nó đang được chạy tại một vị trí hợp lệ.

Theo mặc định, một tập lệnh sẽ sử dụng phạm vi vị trí vô hạn, một tập lệnh bao gồm tất cả các vị trí bắt đầu từ khối gốc và chạy cho đến hết thời gian.

Có một sự phức tạp nhỏ với điều này, đó là Ouroboros, giao thức đồng thuận cung cấp năng lượng cho Cardano không sử dụng thời gian POSIX, nó sử dụng các khe cắm. Nhưng Plutus sử dụng thời gian thực, vì vậy chúng ta cần có khả năng chuyển đổi qua lại giữa thời gian thực và thời điểm. Điều này không có vấn đề gì miễn là thời gian rãnh được cố định. Ngay bây giờ là một giây, vì vậy ngay bây giờ nó là dễ dàng.

Tuy nhiên, điều này có thể thay đổi trong tương lai. Có thể có một đợt hard fork với một số thay đổi thông số sẽ thay đổi thời gian của vị trí. Chúng tôi không thể biết trước điều đó. Ví dụ, chúng tôi không biết độ dài vị trí sẽ là bao nhiêu trong 10 năm nữa.

Điều đó có nghĩa là các khoảng thời gian được xác định cho các giao dịch không được có giới hạn trên xác định là quá xa trong tương lai. Chỉ càng xa trong tương lai thì người ta mới có thể biết được độ dài rãnh sẽ là bao nhiêu. Điều này xảy ra tương tự như 36 giờ. Chúng tôi biết rằng nếu sắp có một đợt hard fork, chúng tôi sẽ biết về nó trước ít nhất 36 giờ.

### POSIXTimeRange

Hãy xem `POSIXTimeRange` này , được định nghĩa trong `Plutus.V1.Ledger.Time`.

``` {.haskell}
type POSIXTimeRange = Interval POSIXTime.
```

Nó là một loại từ đồng nghĩa với `Interval POSIXTime` và chúng ta thấy rằng nó `Interval` được định nghĩa bởi  `LowerBound` và `UpperBound`.

``` {.haskell}
Interval
      ivFrom :: LowerBound a
      inTo   :: UpperBound a      
```

Nếu chúng ta đi sâu vào, `LowerBound` chúng ta sẽ thấy hàm tạo

``` {.haskell}
data LowerBound a = LowerBound (Extended a) Closure
```

`Closure` là một từ đông nghĩa với `Bool` và chắc chắn rằng có đưa vào `Interval` hay không.

`Extended` có thể là `NegInf` âm vô cùng, `PosInf` dương vô cùng, hoặc `Finite`.

Chúng tôi cũng tìm thấy một số hàm trợ giúp bao gồm cả hàm `member` kiểm tra xem một cái đã cho `a` có phải là một phần của một cái đã cho hay không `Interval`, miễn là kiểu của `a` là một kiểu con của `Ord`, đây là trường hợp cho `POSIXTime`.

``` {.haskell}
member :: Ord a => a -> Interval a -> Bool
member a i = i `contains` singleton a
```

`interval` là một hàm tạo thông minh cho `Interval` Kiểu này tạo `Interval` với giới hạn trên và dưới.

``` {.haskell}
interval :: a -> a -> Interval a
interval s s' = Interval (lowerBound s) (upperBound s')
```

Sau đó chúng ta có `from` với `Interval` cái này bắt đầu từ `a`
và kéo dài đến vô cùng.

``` {.haskell}
from :: a -> Interval a
from s = Interval (lowerBound s) (UpperBound PosInf True)
```

Và chúng ta có `to`, nó là ngước lại với `from`. Nó cũng được dùng `Interval`
nó bắt đầu block genesis tới `a`, và bao gồm cả `a`.

``` {.haskell}
to :: a -> Interval a
to s = Interval (LowerBound NegInf True) (upperBound s)
```

`always` luôn mặc định `Interval` bao gồm tất cả từ âm vô cùng đến dương vô cùng.

``` {.haskell}
always :: Interval a
always = Interval (LowerBound NegInf True) (UpperBound PosInf True)
```

và có điều ngươc lại, `never`, Nó không chứa slots nào.

``` {.haskell}
never :: Interval a
never = Interval (LowerBound PosInf True) (UpperBound NegInf True)
```

Ngoài ra còn trình trợ giúp `singleton`, nó bao gồm một slot

``` {.haskell}
singleton :: a -> Interval a
singleton s = interval s s      
```

Hàm `hull` cho khoảng nhỏ nhất chứa cả hai khoảng đã cho.

``` {.haskell}
hull :: Ord a => Interval a -> Interval a -> Interval a
hull (Interval l1 h1) (Interval l2 h2) = Interval (min l1 l2) (max h1 h2)
```

Chức năng `intersection` xác định khoảng thời gian lớn nhất được chứa trong cả khoảng thời gian nhất định. Đây là một `Interval` bắt đầu từ giới hạn dưới lớn nhất của hai khoảng và kéo dài cho đến giới hạn trên nhỏ nhất.

``` {.haskell}
intersection :: Ord a => Interval a -> Interval a -> Interval a
intersection (Interval l1 h1) (Interval l2 h2) = Interval (max l1 l2) (min h1 h2)    
```

Hàm `overlaps` kiểm tra chức năng cho dù hai khoảng thời gian chồng lên nhau, có nghĩa là, cho dù có một giá trị chồng lên nhau của cả hai khoảng thời gian.

``` {.haskell}
overlaps :: Ord a => Interval a -> Interval a -> Bool
overlaps l r = isEmpty (l `intersection` r)
```

`contains` tlấy hai khoảng và xác định xem khoảng thứ hai có hoàn toàn nằm trong khoảng thời gian đầu tiên hay không.

``` {.haskell}
contains :: Ord a => Interval a -> Interval a -> Bool
contains (Interval l1 h1) (Interval l2 h2) = l1 <= l2 && h2 <= h1
```

Và chúng tôi có các chức năng `before` và `after` để xác định nếu một thời gian nhất định tương ứng, trước hoặc sau mọi thứ trong một thời gian nhất định `Interval`.

``` {.haskell}
before :: Ord a => a -> Interval a -> Bool
before h (Interval f _) = lowerBound h < f

after :: Ord a => a -> Interval a -> Bool
after h (Interval _ t) = upperBound h > t
```

Hãy vào trong REPL.

``` {.haskell}
Prelude Week03.Homework1> import Plutus.V1.Ledger.Interval
Prelude Plutus.V1.Ledger.Interval Week03.Homework1>
```

Hãy xây dựng `Interval` từ 10 đến 20, bao gồm cả hai đầu.

``` {.haskell}
Prelude Plutus.V1.Ledger.Interval Week03.Homework1> interval (10 :: Integer) 20
Interval {ivFrom = LowerBound (Finite 10) True, ivTo = UpperBound (Finite 20) True}
```

Chúng ta có thể kiểm tra xem một giá trị có phải là thành viên của một khoảng hay không:

``` {.haskell}
Prelude Plutus.V1.Ledger.Interval Week03.Homework1> member 9 $ interval (10 :: Integer) 20
False

Prelude Plutus.V1.Ledger.Interval Week03.Homework1> member 10 $ interval (10 :: Integer) 20
True

Prelude Plutus.V1.Ledger.Interval Week03.Homework1> member 12 $ interval (10 :: Integer) 20
True

Prelude Plutus.V1.Ledger.Interval Week03.Homework1> member 20 $ interval (10 :: Integer) 20
True

Prelude Plutus.V1.Ledger.Interval Week03.Homework1> member 21 $ interval (10 :: Integer) 20
False
```

Chúng ta có thể sử dụng hàm `from`. Ở đây giới hạn dưới lại là một slot hữu hạn, nhưng giới hạn trên là dương vô cùng.

``` {.haskell}
Prelude Plutus.V1.Ledger.Interval Week03.Homework1> member 21 $ from (30 :: Integer)
False

Prelude Plutus.V1.Ledger.Interval Week03.Homework1> member 30 $ from (30 :: Integer)
True

Prelude Plutus.V1.Ledger.Interval Week03.Homework1> member 300000 $ from (30 :: Integer)
True
```

And the `to` constructor. Here the lower bound is negative infinity,
while the upper bound is a finite slot number.

``` {.haskell}
Prelude Plutus.V1.Ledger.Interval Week03.Homework1> member 300000 $ to (30 :: Integer)
False

Prelude Plutus.V1.Ledger.Interval Week03.Homework1> member 31 $ to (30 :: Integer)
False

Prelude Plutus.V1.Ledger.Interval Week03.Homework1> member 30 $ to (30 :: Integer)
True

Prelude Plutus.V1.Ledger.Interval Week03.Homework1> member 7 $ to (30 :: Integer)
True
```

Now, let\'s try the `intersection` function on the `Interval` from 10 to
20 and the `Interval` from 18 to 30.

``` {.haskell}
Prelude Plutus.V1.Ledger.Interval Week03.Homework1> intersection (interval (10 :: Integer) 20) $ interval 18 30
Interval {ivFrom = LowerBound (Finite 18) True, ivTo = UpperBound (Finite 20) True}
```

As expected, we get the `Interval` that runs from 18 to 20, inclusive.

We can check whether one `Interval` contains another.

``` {.haskell}
Prelude Plutus.V1.Ledger.Interval Week03.Homework1> contains (to (100 :: Integer)) $ interval 30 80
True

Prelude Plutus.V1.Ledger.Interval Week03.Homework1> contains (to (100 :: Integer)) $ interval 30 100
True

Prelude Plutus.V1.Ledger.Interval Week03.Homework1> contains (to (100 :: Integer)) $ interval 30 101
False
```

We see that as soon as the second `Interval` extends to 101, it is no
longer fully contained within the `Interval` that runs to 100.

However, if we check with `overlaps`, then it will be true because there
are elements, such as 40, that are contained in both intervals.

``` {.haskell}
Prelude Plutus.V1.Ledger.Interval Week03.Homework1> overlaps (to (100 :: Integer)) $ interval 30 101
True

Prelude Plutus.V1.Ledger.Interval Week03.Homework1> overlaps (to (100 :: Integer)) $ interval 101 110
False
```

Example - Vesting
-----------------

Imagine you want to give a gift of Ada to a child. You want the child to
own the Ada, but you only want the child to have access to it he or she
turns eighteen.

Using Plutus, it is very easy to implement. As our first contract that
will look at the context argument, we will implement a contract that
implements a vesting scheme. Money will be put into a script and then it
can be retrieved by a certain person, but only once a certain deadline
has been reached.

We start by copying the `IsData` contract from lecture two into a new
module called `Vesting`.

The first step is to think about the types for the datum and redeemer.

For datum, it makes sense to have two pieces of information, the
beneficiary and the deadline. So, let\'s define this type:

``` {.haskell}
data VestingDatum = VestingDatum
   { beneficiary :: PubKeyHash
   , deadline    :: POSIXTime
   } deriving Show

PlutusTx.unstableMakeIsData ''VestingDatum
```

In order to know if someone can spend this script output, two pieces
information are required, i.e. the beneficiary\'s signature and the time
of the transaction. In this case, both those pieces of information are
contained in the transaction itself. This means that we don\'t need any
information in the redeemer, so we can just use `()` for the redeemer.

``` {.haskell}
mkValidator :: VestingDatum -> () -> ScriptContext -> Bool
```

We need to check two conditions.

1.  That only the correct beneficiary can unlock a UTxO sitting at this
    address. This we can validate by checking that the beneficiary\'s
    signature is included in the transaction.
2.  That this transaction is only executed after the deadline is
    reached.

We could probably just write this in one go, but we will write it in a
more top-down fashion and delegate to some helper functions.

``` {.haskell}
mkValidator dat () ctx =
      mkValidator dat () ctx = traceIfFalse "beneficiary's signature missing" signedByBeneficiary &&
                               traceIfFalse "deadline not reached" deadlineReached
where
      info :: TxInfo
      info = scriptContextTxInfo ctx
```

To check that the transaction is signed by the beneficiary, we can get
the public key of the beneficiary from the datum and pass it, along with
the transaction information to the `txSignedBy` function.

``` {.haskell}
signedByBeneficiary :: Bool
signedByBeneficiary = txSignedBy info $ beneficiary dat
```

How do we check that the deadline has passed?

![](img/iteration2/pic__00046.png)

Let\'s consider a transaction with a validity that crosses the deadline,
which is shown as the uppermost range in the above diagram.

Recall that before the validator script is run, other checks are made,
including the time check. The node checks that the current time falls
into the valid range of the transaction and only then is the validator
run. So we know that, if we are in the validator, the current time lies
somewhere within the validity interval.

In the case of the range that crosses the deadline, the validator code
cannot know whether the current time is before or after the deadline. In
this case, the validator must declare that the transaction is invalid.

The second example in the diagram, however, is fine. We still don\'t
know what the current time is exactly, but we know that whatever the
time is, it will be after the deadline.

So, what we are checking for is that the whole validity interval is to
the right of the deadline. One way to do this is to use the `contains`
function to check whether the validity interval is fully contained
within the interval that starts from the deadline and extends until the
end of time.

``` {.haskell}
deadlineReached :: Bool
deadlineReached = contains (from $ deadline dat) $ txInfoValidRange info
```

That completes the validation logic. Let\'s take care of some
boilerplate.

``` {.haskell}
data Vesting
instance Scripts.ValidatorTypes Vesting where
    type instance DatumType Vesting = VestingDatum
    type instance RedeemerType Vesting = ()

typedValidator :: Scripts.TypedValidator Vesting
typedValidator = Scripts.mkTypedValidator @Vesting
    $$(PlutusTx.compile [|| mkValidator ||])
    $$(PlutusTx.compile [|| wrap ||])
  where
    wrap = Scripts.wrapValidator @VestingDatum @()
```

We will focus more on the wallet part of the script later, but here are
the changes.

In addition to some new `LANGUAGE` pragmas and some extra imports, we
have created a `GiveParams` type, and modified the `grab` endpoint to
require no parameters.

The `VestingSchema` type defines the endpoints that we want to expose to
the user. As in our last example, `give` will be used by the user who
puts funds into the contract, then `grab` will be used by the user
wanting to claim the funds.

``` {.haskell}
type VestingSchema =
   .\/ Endpoint "give" GiveParams
   .\/ Endpoint "grab" ()
```

So what parameters do we need for `give`? The endpoint will create a
UTxO at the vesting script address with an amount and a datum. If you
recall, our datum contains the beneficiary and the deadline. So, there
are three pieces of information that we must pass to the `give`
endpoint.

``` {.haskell}
data GiveParams = GiveParams
   { gpBeneficiary :: !PubKeyHash
   , gpDeadline    :: !POSIXTime
   , gpAmount      :: !Integer
   } deriving (Generic, ToJSON, FromJSON, ToSchema)
```

The `grab` endpoint doesn\'t require any parameters because the
beneficiary will just look for UTxOs sitting at the script address and
can then check whether they are the beneficiary and whether the deadline
has passed. If so, they can consume them.

Let\'s quickly look at the `give` endpoint.

``` {.haskell}
give :: AsContractError e => GiveParams -> Contract w s e ()
give gp = do
    let dat = VestingDatum
                { beneficiary = gpBeneficiary gp
                , deadline    = gpDeadline gp
                }
        tx  = mustPayToTheScript dat $ Ada.lovelaceValueOf $ gpAmount gp
    ledgerTx <- submitTxConstraints typedValidator tx
    void $ awaitTxConfirmed $ txId ledgerTx
    logInfo @String $ printf "made a gift of %d lovelace to %s with deadline %s"
        (gpAmount gp)
        (show $ gpBeneficiary gp)
        (show $ gpDeadline gp)
```

First we compute the datum we want to use, and we can get both pieces of
information from the `GiveParams` which is passed into the function.

Then, for the transaction, we add a constraint that there must be an
output at this script address with the datum that we just defined and a
certain number of lovelace, which we also get from the `GiveParams`.

The rest of the function is as before, just with a different log
message.

The `grab` endpoint is a bit more involved.

There can be many UTxOs at this script address and some of them might
not be suitable for us, either because we are not the beneficiary, or
because the deadline has not yet passed. If we try to submit a
transaction when there are no suitable UTxOs, we will pay fees, but get
nothing in return.

``` {.haskell}
grab :: forall w s e. AsContractError e => Contract w s e ()
grab = do
    now   <- currentTime
    pkh   <- pubKeyHash <$> ownPubKey
    utxos <- Map.filter (isSuitable pkh now) <$> utxoAt scrAddress
    if Map.null utxos
        then logInfo @String $ "no gifts available"
        else do
            let orefs   = fst <$> Map.toList utxos
                lookups = Constraints.unspentOutputs utxos  <>
                          Constraints.otherScript validator
                tx :: TxConstraints Void Void
                tx      = mconcat [mustSpendScriptOutput oref $ Redeemer $ PlutusTx.toData () | oref <- orefs] <>
                          mustValidateIn (from now)
            ledgerTx <- submitTxConstraintsWith @Void lookups tx
            void $ awaitTxConfirmed $ txId ledgerTx
            logInfo @String $ "collected gifts"
  where
    isSuitable :: PubKeyHash -> POSIXTime -> TxOutTx -> Bool
    isSuitable pkh now o = case txOutDatumHash $ txOutTxOut o of
        Nothing -> False
        Just h  -> case Map.lookup h $ txData $ txOutTxTx o of
            Nothing        -> False
            Just (Datum e) -> case PlutusTx.fromData e of
                Nothing -> False
                Just d  -> beneficiary d == pkh && deadline d <= now
```

First, we get the current time and calculate our public key hash. We
then look up all the UTxOs at this address and filter them using the
`isSuitable` helper function, which is defined in the `where` clause.

It first checks the datum hash, and, if it finds it, it attempts to look
up the corresponding datum. Recall that the producing transaction, in
this case `give` doesn\'t have to supply the datum, it need only supply
the datum hash. However, in our case we need to have the datum available
to the `grab` endpoint, so the `give` endpoint does provide the datum.

If the `grab` endpoint finds the datum, it must deserialise it to the
`Vesting` type.

If all of this succeeds we can check whether we are the beneficiary and
whether the deadline has passed.

At this point, `utxos` contains all the UTxOs that we can consume. If we
find none, then we just log a message to that effect. If there is at
least one, then we construct one transaction that consumes all of them
as inputs and pays the funds to our wallet.

As `lookups`, we provide the list of UTxOs as well as the validator
script. Recall that, in order to consume UTxOs at this address, the
spending transaction must provide the validation script.

We then create a transaction that spends all the suitable UTxOs along
with a constraint that it must validate in the `Interval` which
stretches from now until the end of time. If we don\'t provide the
interval here, then validation will fail, because the default interval
is from genesis until the end of time. The on-chain validation would
reject this as it needs an interval that is fully contained in the
interval stretching from the deadline until the end of time.

We could use the singleton `Interval` `now`, but, if there were any
issues, for example network delays, and the transaction arrived at a
node a slot or two later, then validation would no longer work.

The, we just bundle up the endpoints.

``` {.haskell}
endpoints :: Contract () VestingSchema Text ()
endpoints = (give' `select` grab') >> endpoints
  where
    give' = endpoint @"give" >>= give
    grab' = endpoint @"grab" >>  grab
```

Then there is some boilerplate which is just used in the playground.

``` {.haskell}
mkSchemaDefinitions ''VestingSchema

mkKnownCurrencies []
```

### In the playground

First, let\'s add a third wallet. We are going to create a scenario
where Wallet 1 makes two gifts to Wallet 2 with different deadlines and
also makes one gift to Wallet 3.

![](img/iteration2/pic__00043.png)

Normally it would be possible to submit both `give` transactions in the
same slot, but the way our code is implemented, we wait for
confirmation, which means we need to add a wait action. This is maybe
not the best way to do it, but that\'s how it is for the time being.

![](img/iteration2/pic__00044.png)

Here we run into our first problem. We need to supply the beneficiary
address, but there is no way in the playground to get the public key
hash of a wallet.

But we can get it from the REPL.

``` {.haskell}
Prelude Week03.Homework1> :l src/Week03/Vesting.hs 
Ok, one module loaded.
Prelude Week03.Vesting> import Ledger
Prelude Ledger Week03.Vesting> import Wallet.Emulator
Prelude Ledger Wallet.Emulator Week03.Vesting> pubKeyHash $ walletPubKey $ Wallet 2
39f713d0a644253f04529421b9f51b9b08979d08295959c4f3990ee617f5139f
Prelude Ledger Wallet.Emulator Week03.Vesting> pubKeyHash $ walletPubKey $ Wallet 3
dac073e0123bdea59dd9b3bda9cf6037f63aca82627d7abcd5c4ac29dd74003e
```

![](img/iteration2/pic__00047.png)

The next problem is the deadline. In the last lecture we saw how to
convert between slots and POSIX times. This has changed. Previously you
just needed a slot and out came a POSIX time. Now there is a second
argument.

``` {.haskell}
Prelude Ledger Wallet.Emulator Week03.Vesting> import Ledger.TimeSlot 
Prelude Ledger Wallet.Emulator Ledger.TimeSlot Week03.Vesting> :t slotToBeginPOSIXTime
slotToBeginPOSIXTime :: SlotConfig -> Slot -> POSIXTime
```

There are also versions of `slotToBeginPOSIXTime` that have a begin and
an end time. This is because a slot is not just a point in time, it\'s a
duration in time.

So what is this `SlotConfig`?

``` {.haskell}
Prelude Ledger Wallet.Emulator Ledger.TimeSlot Week03.Vesting> :i SlotConfig 
type SlotConfig :: *
data SlotConfig
  = SlotConfig {scSlotLength :: Integer, scZeroSlotTime :: POSIXTime}
        -- Defined in ‘Ledger.TimeSlot’
instance Eq SlotConfig -- Defined in ‘Ledger.TimeSlot’
instance Show SlotConfig -- Defined in ‘Ledger.TimeSlot’
```

It takes the slot length and the time at which slot zero starts.

So now we have to find out what `SlotConfig` to use for the playground.
Luckily, it\'s the default. For that we need to use the `Data.Default`
module.

``` {.haskell}
Prelude Ledger Wallet.Emulator Ledger.TimeSlot Week03.Vesting> import Data.Default
Prelude Ledger Wallet.Emulator Ledger.TimeSlot Data.Default Week03.Vesting> def :: SlotConfig
SlotConfig {scSlotLength = 1000, scZeroSlotTime = POSIXTime {getPOSIXTime = 1596059091000}}
```

Now we can use `slotToBeginPOSIXTime` with the default config to get the
POSIX time for slot 10 and slot 20.

``` {.haskell}
Prelude Ledger Wallet.Emulator Ledger.TimeSlot Data.Default Week03.Vesting> slotToBeginPOSIXTime def 10
POSIXTime {getPOSIXTime = 1596059101000}

Prelude Ledger Wallet.Emulator Ledger.TimeSlot Data.Default Week03.Vesting> slotToBeginPOSIXTime def 20
POSIXTime {getPOSIXTime = 1596059111000}
```

And we can use these in the playground. We\'ll use slot 10 as the
deadline for the first and third `give`s and slot 20 for the second
`give`. We\'ll also give 10 Ada in each case.

![](img/iteration2/pic__00048.png)

Let\'s create a scenario where everything works. Wallet 3 grabs at slot
10 when the deadline for Wallet 3 has passed, and Wallet 2 grabs at slot
20, when both the Wallet 2 deadlines have passed. We will use the
`Wait Until..` option for this.

![](img/iteration2/pic__00049.png)

After evaluation, we first see the Genesis transaction.

![](img/iteration2/pic__00050.png)

If we look at the next transaction, we see the gift from Wallet 1 to
Wallet 2 with the deadline of 10. Here, ten Ada get locked in the script
address.

![](img/iteration2/pic__00051.png)

The next transaction is the gift from Wallet 1 to Wallet 2 with the
deadline of 20. A new UTxO is now created at the script address with ten
Ada.

![](img/iteration2/pic__00052.png)

And the third gift, this time to Wallet 3, with a deadline of 10. Wallet
1 now has about 70 Ada, and another UTxO is created with 10 Ada locked
at the script address.

![](img/iteration2/pic__00053.png)

At slot 10, Wallet 3 grabs successfully. The third UTxO is the input,
some fees are paid, and then the remainder of the lovelace is sent to
Wallet 3.

![](img/iteration2/pic__00054.png)

Then at slot 20, Wallet 2 successfully grabs both the UTxOs for which
they are the beneficiary. This time the fee is higher because two
validators have to run.

![](img/iteration2/pic__00055.png)

The final balances reflect the changes.

![](img/iteration2/pic__00056.png)

Now let\'s look at the case where the grab happens too early. We\'ll
make Wallet 2 grab at slot 15 instead of slot 20.

![](img/iteration2/pic__00010.png)

Now we see that the first transactions are the same, but that the final
transaction at slot 15 has only one input, because the second UTxO is
not yet available.

![](img/iteration2/pic__00057.png)

And we can see that there are 10 Ada still locked at the script address.

![](img/iteration2/pic__00057.png)

Our off-chain code was written in such a way that it will only submit a
transaction if there is a suitable UTxO that can be grabbed. This means
that we don\'t really exercise the validator because we are only sending
transactions to the blockchain that will pass validation.

If you want to test the validator, you could modify the wallet code so
that the grab endpoint attempts to grab everything and then validation
will fail if you are not the beneficiary or the deadline has not been
reached.

You need to keep in mind that anybody can write off-chain code. So, even
though it works now as long as you use the `grab` endpoint that we wrote
ourselves, somebody could write a different piece of off-chain code that
doesn\'t filter the UTxOs as we did. In this case, if the validator is
not correct something could be horribly wrong.

Example 2 - Parameterized Contract
----------------------------------

We\'ll start the next example by copying the code from the vesting
example into a new module called `Week03.Parameterized`.

### On-Chain

Note that in the vesting example we used the `Vesting` type as the
datum, but it was just fixed, it didn\'t change. Alternatively, we could
have baked it into the contract, so to speak, so that we have a contract
where the script itself already contains the beneficiary and deadline
information.

All the examples of contracts we have seen so far were fixed. We used a
`TypedValidator` as a compile-time constant. The idea of parameterized
scripts is that you can have a parameter and, depending on the value of
the parameter, you get different values of `TypedValidator`.

So, instead of defining one script, with a single script address, with
all UTxOs sitting at the same address, you can define a family of
scripts that are parameterized by a given parameter. In our case, this
will mean that UTxOs for different beneficiaries and/or deadlines will
be a different script addresses, as they will have parameterized
validators specific to their parameters rather than specific to the
datum of the UTxO.

We are going to demonstrate how to do this by, instead of using datum
for the beneficiary and deadline values, using a parameter.

Let\'s start by renaming `VestingDatum` to something more suitable.

``` {.haskell}
data VestingParam = VestingParam
      { beneficiary :: PubKeyHash
      , deadline    :: POSIXTime
      } deriving Show
```

We will also remove the `unstableMakeIsData` call as we don\'t need this
anymore.

The reason we don\'t need it, is because we are just going to use `()`
for the datum in the `mkValidator` function. All the information we
require will be in a new argument to `mkValidator`, of type
`VestingParam`, which we add at the beginning of the list of arguments.

``` {.haskell}
{-# INLINABLE mkValidator #-}
mkValidator :: VestingParam -> () -> () -> ScriptContext -> Bool
mkValidator p () () ctx = traceIfFalse "beneficiary's signature missing" signedByBeneficiary &&
                          traceIfFalse "deadline not reached" deadlineReached
  where
    info :: TxInfo
    info = scriptContextTxInfo ctx

    signedByBeneficiary :: Bool
    signedByBeneficiary = txSignedBy info $ beneficiary p

    deadlineReached :: Bool
    deadlineReached = contains (from $ deadline p) $ txInfoValidRange info
```

We also change the `Vesting` type to reflect the change to the datum.

``` {.haskell}
data Vesting
instance Scripts.ValidatorTypes Vesting where
    type instance DatumType Vesting = ()
    type instance RedeemerType Vesting = ()     
```

Now, the `TypedValidator` will no longer be a constant value. Instead it
will take a parameter.

Recall that the function `mkTypedValidator` requires as its first
argument the compiled code of a function that takes three arguments and
returns a `Bool`. But now, it has four arguments, so we need to account
for that.

``` {.haskell}
typedValidator :: VestingParam -> Scripts.TypedValidator Vesting
typedValidator p = Scripts.mkTypedValidator @Vesting      
```

Now, what we would like to do is something like this, passing in the new
parameter `p` to `mkValidator` so that the compiled code within the
Oxford brackets would have the correct type.

``` {.haskell}
-- this won't work
$$(PlutusTx.compile [|| mkValidator p ||])
$$(PlutusTx.compile [|| wrap ||])
where
wrap = Scripts.wrapValidator @() @()
```

This code will not work, but before we investigate, let\'s leave the
code as it is for now and make some more changes to the rest of the
code.

`validator` now will take a `VestingParam` and will return a composed
function. The returned function has the effect that any paramater passed
to `validator` would now effectively get passed to the `typedValidator`
function, whose return value would in turned get passed to the
`validatorScript` function.

``` {.haskell}
validator :: VestingParam -> Validator
validator = Scripts.validatorScript . typedValidator
```

And the same for `valHash` and `scrAddress`.

``` {.haskell}
valHash :: VestingParam -> Ledger.ValidatorHash
valHash = Scripts.validatorHash . typedValidator

scrAddress :: VestingParam -> Ledger.Address
scrAddress = scriptAddress . validator
```

Now, let\'s find out what\'s wrong with out `typedValidator` function.

If we try to launch the REPL, we get a compile error.

``` {.haskell}
GHC Core to PLC plugin: E043:Error: Reference to a name which is not a local, a builtin, or an external INLINABLE function: Variable p
No unfolding
Context: Compiling expr: p
Context: Compiling expr: Week03.Parameterized.mkValidator p
Context: Compiling expr at "plutus-pioneer-program-week03-0.1.0.0-inplace:Week03.Parameterized:(67,10)-(67,48)"
```

The problem is this line.

``` {.haskell}
-- this won't work
$$(PlutusTx.compile [|| mkValidator p ||])
```

Recall that everything inside the Oxford brackets must be explicitly
known at compile time. Normally it would even need all the code to be
written explicitly, but by using the `INLINABLE` pragma on the
`mkValidator` function we can reference the function instead. However,
it must still be known at compile time, because that\'s how Template
Haskell works - it is executed before the main compiler.

The `p` is not known at compile time, because we intend to supply it at
runtime. Luckily there is a way around this.

On the Haskell side, we have our `mkValidator` function and we have `p`
of type `VestingParam`. We can compile `mkValidator` to Plutus, but we
can\'t compile `p` to Plutus because we don\'t know what it is. But, if
we could get our hands on the compiled version of `p`, we could apply
this compiled version to the compiled `mkValidator`, and this would give
us what we want.

This seems to solve nothing, because we still need a compiled version of
`p` and we have the same problem that `p` is not known at compile time.

However, `p` is not some arbitrary Haskell code, it\'s data, so it
doesn\'t contain any function types. If we make the type of `p` an
instance of a type class called `Lift`. We can use `liftCode` to compile
`p` at runtime to Plutus Core and then, using `applyCode` we can apply
the Plutus Core `p` to the Plutus Core `mkValidator`.

#### The Lift Class

Let\'s briefly look at the `Lift` class. It is defined in package
`plutus-tx`.

``` {.haskell}
module PlutusTx.Lift.Class
```

It only has one function, `Lift`. However, we won\'t use this function
directly.

The importance of the class is that it allows us to, at runtime, lift
Haskell values into corresponding Plutus script values. And this is
exactly what we need to convert our parameter `p` into code.

We will use a different function, defined in the same package but in a
different module.

``` {.haskell}
module PlutusTx.Lift
```

The function we will use is called `liftCode`.

``` {.haskell}
-- | Get a Plutus Core program corresponding to the given value as a 'CompiledCodeIn', throwing any errors that occur as exceptions and ignoring fresh names.
liftCode
   :: (Lift.Lift uni a, Throwable uni fun, PLC.ToBuiltinMeaning uni fun)
   => a -> CompiledCodeIn uni fun a
liftCode x = unsafely $ safeLiftCode x
```

It takes a Haskell value of type `a`, provided `a` is an instance of the
`Lift` class, and turns it into a piece of Plutus script code
corresponding to the same type.

Now we can fix our validator.

``` {.haskell}
typedValidator :: VestingParam -> Scripts.TypedValidator Vesting
typedValidator p = Scripts.mkTypedValidator @Vesting
    ($$(PlutusTx.compile [|| mkValidator ||]) `PlutusTx.applyCode` PlutusTx.liftCode p)
    $$(PlutusTx.compile [|| wrap ||])
  where
    wrap = Scripts.wrapValidator @() @()
```

This code is fine, but it won\'t yet compile, because `VestingParam` is
not an instance of `Lift`. To fix this, we can use `makeLift`.

``` {.haskell}
PlutusTx.makeLift ''VestingParam
```

And, we need to enable a GHC extension.

``` {.haskell}
{-# LANGUAGE MultiParamTypeClasses #-}
```

Now it will compile.

### Off-Chain

The off-chain code hasn\'t changed much.

The `GiveParams` are still the same.

``` {.haskell}
data GiveParams = GiveParams
      { gpBeneficiary :: !PubKeyHash
      , gpDeadline    :: !POSIXTime
      , gpAmount      :: !Integer
      } deriving (Generic, ToJSON, FromJSON, ToSchema)      
```

`VestingSchema` has slightly changed because the `grab` endpoint now
relies on knowing the beneficiary and deadline in order to know
determine the script address. We know the beneficiary because it will be
the public key hash of the wallet that calls `grab`, but we don\'t know
the deadline, so we must pass it to `grab`.

``` {.haskell}
type VestingSchema =
          Endpoint "give" GiveParams
      .\/ Endpoint "grab" POSIXTime
```

The `give` endpoint is similar to the vesting example, but there are
some differences.

Instead of computing the datum, we will construct something of type
`VestingParam`. We also change the reference to the datum in
`mustPayToTheScript` to become `()`, and we provide the type `p` to
`typedValidator` as it is no longer a constant.

``` {.haskell}
give :: AsContractError e => GiveParams -> Contract w s e ()
give gp = do
    let p  = VestingParam
                { beneficiary = gpBeneficiary gp
                , deadline    = gpDeadline gp
                }
        tx = mustPayToTheScript () $ Ada.lovelaceValueOf $ gpAmount gp
    ledgerTx <- submitTxConstraints (typedValidator p) tx
    void $ awaitTxConfirmed $ txId ledgerTx
    logInfo @String $ printf "made a gift of %d lovelace to %s with deadline %s"
        (gpAmount gp)
        (show $ gpBeneficiary gp)
        (show $ gpDeadline gp)      
```

In the `grab` endpoint, there are also some changes.

Recall that earlier we got all the UTxOs sitting at this one script
address and that they could be for arbitrary beneficiaries and for
arbitrary deadlines. For this reason, we had to filter those UTxOs which
were for us and where the deadline had been reached.

We now have the additional parameter, which we\'ll call `d`, which
represents the deadline. So we can immediately see if the deadline has
been reached or not.

If it has not been reached, we write a log message and stop, otherwise
we continue and construct the `VestingParam`.

Then, we look up the UTxOs that are sitting at this address. Address is
not a constant anymore, it takes a parameter. So, now, we will only get
UTxOs which are for us and that have a deadline that has been reached.
We don\'t need to filter anything.

If there are none, we log a message to that effect and stop, otherwise
we do more or less what we did before.

``` {.haskell}
grab d = do
now   <- currentTime
pkh   <- pubKeyHash <$> ownPubKey
if now < d
    then logInfo @String $ "too early"
    else do
        let p = VestingParam
                    { beneficiary = pkh
                    , deadline    = d
                    }
                    utxos <- utxoAt $ scrAddress p
                    if Map.null utxos
                        then logInfo @String $ "no gifts available"
                        else do
                            let orefs   = fst <$> Map.toList utxos
                                lookups = Constraints.unspentOutputs utxos      <>
                                          Constraints.otherScript (validator p)
                                tx :: TxConstraints Void Void
                                tx      = mconcat [mustSpendScriptOutput oref $ Redeemer $ PlutusTx.toData () | oref <- orefs] <>
                                          mustValidateIn (from now)
                            ledgerTx <- submitTxConstraintsWith @Void lookups tx
                            void $ awaitTxConfirmed $ txId ledgerTx
                            logInfo @String $ "collected gifts"                          
```

The `endpoints` function is slightly different due to the new parameter
for `grab`.

``` {.haskell}
endpoints :: Contract () VestingSchema Text ()
endpoints = (give' `select` grab') >> endpoints
  where
    give' = endpoint @"give" >>= give
    grab' = endpoint @"grab" >>= grab
```

### Back to the playground

We will now copy and paste this new contract into the playground and
setup a new scenario.

The `give` transactions are the same.

![](img/iteration2/pic__00059.png)

The `grab` is slightly different. In our earlier implementation, one
wallet could grab UTxOs with different deadlines provided that the
deadlines had passed. Now the deadline is part of the script parameter,
so we need to specify it in order to get the script address. This means
that Wallet 2 cannot grab the gifts for slots 10 and 20 at the same
time, at least not in the way that we have implemented it.

First we can wait until slot 10 and then Wallet 2 should be able to grab
its first gift and Wallet 3 should be able to claim its single gift.

We\'ll add a `grab` for Wallets 2 and 3. Here, we don\'t need to wain in
between each transaction because it is two different wallets.

We then wait until slot 20 and perform Wallet 2\'s second `grab` and
then wait for 1 block, as usual.

![](img/iteration2/pic__00060.png)

So let\'s see if it works by clicking `Evaluate`.

![](img/iteration2/pic__00061.png)

Take note of the script address for that transaction out at slot 1.

![](img/iteration2/pic__00062.png)

And compare this with the script address for the transaction output at
slot 2.

![](img/iteration2/pic__00063.png)

Notice that the script address for the UTxOs is different. In our first
version of the vesting contract, the script address was a constant. This
meant that all our gifts ended up at the same script address and only
the datum in each UTxO was different.

Now, the datum is just `()` and the beneficiary and the deadline are
included as part of the script itself, so the addresses are now
different depending on the beneficiary and deadline parameters.

For the gift to Wallet 3 we see yet another address.

![](img/iteration2/pic__00064.png)

We see two grabs in slot 10, one by Wallets 2 and one by Wallet 3. The
order in which they are processed is not deterministic.

Then, finally in slot 20, Wallet 2 grabs its remaining gift.

And the final balances reflect the transactions that have occurred.

![](img/iteration2/pic__00065.png)
