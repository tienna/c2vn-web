# Bài giảng 3: Vesting và Cardano Testnet

Plutus Pioneer Program - Cohort 3 
January 26, 2022

Offical Video by Lars Brünjes: [PPP-Cohort3-Lecture3](https://youtu.be/sLMhsqiWeGU)

Google Doc version can be found [HERE](https://docs.google.com/document/d/1MKEcgNl5QUugBhan39eOKM6zkBJ9_kLkQ6abjWp9pUY/edit#)

**Video thực hành Deploy smartcontract Vesting trên testnet Preprod.**


 <iframe width="100%" height="600" src="https://www.youtube.com/embed/ju3To-i9fnI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Table of Contents
- [Lecture 3: Vesting and the Cardano Testnet](#lecture-3-vesting-and-the-cardano-testnet)
  - [Table of Contents](#table-of-contents)
  - [Preparation for Lecture 3](#preperation-for-lecture-3)
  - [Plutus Playground Timeout](#plutus-playground-timeout)
  - [Script Context](#script-context)
  - [Handling Time](#handling-time)
  - [Vesting Contract](#vesting-contract)
  - [Parameterized Contract](#parameterized-contract)
  - [Cardano Testnet](#cardano-testnet-smartconctact-trên-mạng-preprod)
  - [Homework Part 1](#homework-part-1)
  - [Homework Part 2](#homework-part-2)


## Preparation for Lecture 3

Trước khi chúng ta có thể bắt đầu trong Bài giảng 3, trước tiên chúng ta phải cập nhật môi trường phát triển của mình. Bạn có thể sao chép và dán trực tiếp bất kỳ mã nào trong hướng dẫn này vào Terminal  hoặc IDE của mình.

Đầu tiên, hãy vào thư mục plutus-pioneer-program để lấy nội dung bài giảng tuần 3. Hành hình:

```
~/plutus-pioneer-program$ git pull
```

Bây giờ bạn có thể điều hướng đến thư mục week03 hiện tại và mở tệp cabal.project:

```
~/plutus-pioneer-program/code/week03$ cat cabal.project
```

Lấy thẻ plutus-apps bên trong tệp cabal.project:
 
```
location: https://github.com/input-output-hk/plutus-apps.git
  tag:4edc082309c882736e9dec0132a3c936fe63b4ea
```

Quay trở lại thư mục plutus-apps và cập nhật nó vào thẻ git hiện tại:

```
~/plutus-apps$ git checkout main
```
```
~/plutus-apps$ git pull
```
```
~/plutus-apps$ git checkout 4edc082309c882736e9dec0132a3c936fe63b4ea
```

Bây giờ bạn đã được cập nhật và có thể chạy nix-shell trong thư mục này. Chạy nix-shell:

```
. ~/.nix-profile/etc/profile.d/nix.sh
~/plutus-apps$ nix-shell
```

Quay trở lại thư mục week03 để bắt đầu chạy các lệnh cabal:

```
[nix-shell:~/plutus-pioneer-program/code/week03]$ cabal update
```
```
[nix-shell:~/plutus-pioneer-program/code/week03]$ cabal build
```
```
[nix-shell:~/plutus-pioneer-program/code/week03]$ cabal repl
```

Nếu thành công, bây giờ bạn sẽ thấy trong Terminal :

```haskell
Ok, 7 modules loaded.
Prelude week03.Deploy> 
```

Bài giảng này cũng sẽ khám phá Cardano Testnet Preprod. Để tương tác với nó sau này, trước tiên chúng ta cần đồng bộ hóa nút cục bộ, có thể mất hơn 1 giờ. Hãy bắt đầu trong nền:

Giữ cabal mở trên Terminal  1 và mở Terminal mới 2. Đi tới thư mục ứng dụng plutus và chạy nix-shell trước:

```
Terminal 2
. ~/.nix-profile/etc/profile.d/nix.sh
~/plutus-apps$ nix-shell
```

Chúng ta có thể kiểm tra phiên bản của Cardano Node và bằng các lệnh:

```
Terminal 2
[nix-shell:~/plutus-apps]$ cardano-node --version

Output:
cardano-node 1.35.4 - linux-x86_64 - ghc-8.10
git rev ebc7be471b30e5931b35f9bbc236d21c375b91bb

```

```
Terminal 2
[nix-shell:~/plutus-apps]$ cardano-cli --version

Output:
cardano-cli 1.35.4 - linux-x86_64 - ghc-8.10
git rev ebc7be471b30e5931b35f9bbc236d21c375b91bb

```
Nếu chưa có cardano-node và cardano-cli chúng ta có thể download file binary của iohk về máy
```
cd ~/.cabal/bin

sudo wget https://update-cardano-mainnet.iohk.io/cardano-node-releases/cardano-node-1.35.4-linux.tar.gz
sudo tar zxvf cardano-node-1.35.4-linux.tar.gz
```
sau đó kiểm tra lại bước trên

Tiếp đến chúng ta chạy node trên testnet preprod

 **tạo cấu trúc thư mục cntool**
```
echo export CNODE_HOME=/opt/cardano/cnode  >> $HOME/.bashrc
source ~/.bashrc

sudo whoami
mkdir "$HOME/tmp";
cd "$HOME/tmp"
curl -sS -o prereqs.sh https://raw.githubusercontent.com/cardano-community/guild-operators/master/scripts/cnode-helper-scripts/prereqs.sh       
chmod 755 prereqs.sh
./prereqs.sh -n preprod
```



 Cập nhật PATH
```
echo export PATH=~/.cabal/bin:$PATH >> ~/.bashrc
export LD_LIBRARY_PATH="/usr/local/lib:$LD_LIBRARY_PATH" 
export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH"
echo export CNODE_HOME=/opt/cardano/cnode  >> $HOME/.bashrc
source ~/.bashrc

echo export CARDANO_NODE_SOCKET_PATH="$CNODE_HOME/sockets/node0.socket" >> $HOME/.bashrc
source ~/.bashrc

echo export PATH="$HOME/.cargo/bin:$PATH" >> ~/.bashrc
source ~/.bashrc
```
sau đó vào thư mục để chạy node

```
cd $CNODE_HOME/scripts
./cnode.sh
```
kết quả như thế này và để nguyên Terminal đó để đồng bộ

```
.............ncTargetNumberOfActivePeers = 20, ncEnableP2P = EnabledP2PMode}
Listening on http://127.0.0.1:12798
```
Quá trình này sẽ mất 1 giờ or hơn để đồng bộ hóa. Bạn sẽ được đồng bộ hóa 100% sau khi bạn bắt đầu thấy một khối mới cứ sau 20 giây, thay vì nhiều khối mỗi giây. Để thiết bị đầu cuối này mở và bây giờ chúng ta có thể bắt đầu.

## Plutus Playground Timeout


Nếu máy chủ sân chơi plutus gặp thời gian chờ trước khi hoàn thành, chúng ta có thể sử dụng lệnh này thay thế để kéo dài thời gian chạy:

```
[nix-shell:~/plutus-apps/plutus-playground-server]$ 
plutus-playground-server -i 120s
```
## Script Context


Trong bài giảng này, chúng ta sẽ khám phá `script context`. Nếu chúng ta còn nhớ bài giảng 2, `script context` là phần thứ ba của dữ liệu trên chuỗi xác định mục đích cho việc chạy:

```haskell
data ScriptContext
Constructors
ScriptContext
 
scriptContextTxInfo :: TxInfo
scriptContextPurpose ::ScriptPurpose
```

```haskell
data ScriptPurpose
Purpose of the script that is currently running
Constructors
Minting CurrencySymbol
 
Spending TxOutRef
 
Rewarding StakingCredential
 
Certifying DCert
```
```haskell
data TxInfo
A pending transaction. This is the view as seen by validator scripts, so some details are stripped out.
Constructors
TxInfo
 
txInfoInputs :: [TxInInfo]
Transaction inputs
txInfoOutputs :: [TxOut]
Transaction outputs
txInfoFee :: Value
The fee paid by this transaction.
txInfoMint :: Value
The Value minted by this transaction.
txInfoDCert :: [DCert]
Digests of certificates included in this transaction
txInfoWdrl :: [(StakingCredential, Integer)]
Withdrawals
txInfoValidRange :: POSIXTimeRange
The valid range for the transaction.
txInfoSignatories :: [PubKeyHash] 
Signatures provided with the transaction, attested that they all signed the tx
txInfoData :: [(DatumHash, Datum)]
txInfoId :: TxId  Hash of the pending transaction (excluding witnesses)
```

Nếu xem tài liệu về cardano, chúng ta có thể thấy một ví dụ đơn giản:

Ví dụ trực quan: một đứa trẻ muốn đi đu quay, nhưng trước khi lên, chúng phải cao hơn biển báo an toàn. Chúng ta có thể diễn đạt ý tưởng đó bằng mã giả, như:

```haskell
if isTallEnough(attraction=ferrisWheel,passenger=michael):
   getOnFerrisWheel()


def isTallEnough(attraction,kid):
   return kid["height"] >= attraction["minimumHeight"]


def getOnFerrisWheel():
   print ("get On the Ferris Wheel")


ferrisWheel = {"minimumHeight":120}
michael = {"height":135}
```

Trong ví dụ này, những điều sau đây được áp dụng:

 - The datum à thông tin về giao dịch này: ```michael.height```.
 - The context là trạng thái của thế giới, tại thời điểm đó có nghĩa là: ```ferrisWheel.minimumHeight```.
 - Reedemer, là hành động để thực hiện: ```getOnFerrisWheel()```
 - The validator script Tập lệnh trình xác thực là chức năng sử dụng tất cả thông tin đó ```isTallEnough```

## Handling Time

Trong mô hình Cardano eUTxO, giao dịch vẫn có thể thất bại. Điều này là do một giao dịch có thể tiêu thụ một đầu vào, khi giao dịch đó đến trên chuỗi khối tại nút để xác thực, nó có thể đã được một người khác sử dụng. Nhưng trong trường hợp đó, giao dịch đơn giản là thất bại mà không phải trả phí. Nhưng điều không bao giờ có thể xảy ra hoặc sẽ không bao giờ xảy ra trong các trường hợp bình thường, đó là tập lệnh xác thực chạy và sau đó không thành công. Lỗi sẽ xảy ra trước khi nó được gửi. Đó là một tính năng tuyệt vời, tuy nhiên nó có nhiều ẩn ý về cách thể hiện thời gian.

Chúng tôi muốn có thể thể hiện logic xác thực nói rằng một giao dịch nhất định chỉ hợp lệ sau khi đạt đến một thời gian nhất định hoặc trước khi đạt đến một thời điểm nhất định. Chúng ta đã thấy một ví dụ về điều đó trong ví dụ đầu tiên, ví dụ đấu giá, giá thầu chỉ được phép cho đến khi đạt đến thời hạn. Điểm cuối gần chỉ có thể được gọi sau khi thời hạn đã qua.

Nếu bạn nghĩ về điều đó, thì đó dường như là một mâu thuẫn bởi vì thời gian rõ ràng là đang trôi. Khi bạn cố gắng xác thực một giao dịch mà bạn đang xây dựng trong ví của mình, tất nhiên, thời gian xảy ra trong ví có thể khác với thời gian giao dịch đến một nút để xác thực. Không rõ làm thế nào để kết hợp hai thứ này lại với nhau để một mặt xử lý thời gian, nhưng mặt khác đảm bảo rằng việc xác thực là xác định theo nghĩa là nếu nó thành công trong ví thì nó cũng sẽ thành công trong nút.

Cardano giải quyết vấn đề này bằng cách thêm trường phạm vi thời gian POSIX này và trường phạm vi hợp lệ của thông tin TX vào một giao dịch. Với điều này, chúng ta có thể tuyên bố một giao dịch là hợp lệ trong khoảng thời gian xác định được chỉ định trong giao dịch. Khi một nút đang xác thực một giao dịch, một trong những bước kiểm tra trước này trước khi xác thực, là nút sẽ kiểm tra thời gian hiện tại và so sánh nó với phạm vi thời gian được chỉ định trong giao dịch. Nếu thời gian hiện tại không nằm trong phạm vi thời gian này, thì quá trình xác thực không thành công ngay lập tức mà không bao giờ chạy tập lệnh trình xác thực. Điều đó cũng có nghĩa là nếu những lần kiểm tra trước này thành công, thì chúng ta có thể giả định rằng thời gian hiện tại rơi vào khoảng thời gian này. Điều này bảo tồn các thuộc tính eUTxO xác định.

Theo mặc định, tất cả các giao dịch sử dụng phạm vi thời gian vô hạn. Điều này bắt đầu từ đầu thời gian hoặc tại khối Genesis và kéo dài vĩnh viễn. Các giao dịch này sẽ luôn hợp lệ, bất kể thời gian chúng đến một nút để xác thực. Các trường hợp ngoại lệ duy nhất mà chúng ta đã thấy cho đến nay là những trường hợp trong ví dụ đấu giá, trong đó giá thầu và giá đóng không thể sử dụng khoảng thời gian vô hạn vì chúng ta đảm bảo rằng giá thầu diễn ra trước thời hạn và giá đóng sau thời hạn. Tuy nhiên, theo mặc định, tất cả các giao dịch bao gồm các giao dịch mà bạn gửi từ Daedalus chẳng hạn, sẽ luôn sử dụng phạm vi thời gian vô hạn.

Có một sự phức tạp nhỏ là Ouroboros, giao thức đồng thuận cung cấp năng lượng cho Cardano, không sử dụng thời gian POSIX; nó sử dụng khe cắm. Plutus sử dụng thời gian thực, vì vậy chúng ta cần có khả năng chuyển đổi qua lại giữa thời gian thực và thời gian. Ngay bây giờ, độ dài khe là một giây. Biết rằng, thật dễ dàng để chuyển đổi qua lại giữa thời gian thực và số vị trí. Tuy nhiên, điều này có thể thay đổi trong tương lai thông qua thay đổi tham số thông qua một hard fork. Và, tất nhiên, chúng ta không thể biết trước điều đó.

Chẳng hạn, hiện tại chúng ta không biết độ dài của vị trí sẽ là bao nhiêu trong 10 năm nữa. Điều này có nghĩa là chúng ta không được có giới hạn trên nhất định. Chúng tôi biết thời lượng của vị trí sẽ là bao nhiêu trong 36 giờ tới vì nếu có thay đổi về tham số giao thức, thì chúng ta sẽ biết điều đó trước ít nhất 36 giờ. Bạn không thể chỉ định phạm vi thời gian tùy ý trong khoảng thời gian giao dịch. Nó chỉ được tối đa là 36 giờ trong tương lai hoặc có thể là vô thời hạn.

Vì vậy, hãy xem loại phạm vi thời gian POSIX này.

```haskell
type POSIXTimeRange = Interval POSIXTime
An Interval of POSIXTimes.
```

Trong đó Khoảng thời gian là:

```haskell
data Interval a
An interval of as.
The interval may be either closed or open at either end, meaning that the endpoints may or may not be included in the interval.
The interval can also be unbounded on either side.
Constructors
Interval
 
ivFrom :: LowerBound a 
ivTo :: UpperBound a
```

Trong đó Giới hạn dưới là:

```haskell
data LowerBound a
The lower bound of an interval.
Constructors
LowerBound (Extended a) Closure
```

Trường hợp đóng `Closure` là:

```haskell
type Closure = Bool
Whether a bound is inclusive or not.
```

Trường hợp mở rộng là:

```haskell
data Extended a
A set extended with a positive and negative infinity.
Constructors
NegInf
 
Finite a
 
PosInf
```

Một số chức năng hữu ích để xác định giới hạn:

```haskell
after :: Ord a => a -> Interval a -> Bool
Check if a value is later than the end of a Interval.
```

```haskell
before :: Ord a => a -> Interval a -> Bool
Check if a value is earlier than the beginning of an Interval.
```

```haskell
isEmpty :: (Enum a, Ord a) => Interval a -> Bool
Check if an Interval is empty.
 ```
 
 ```haskell
contains :: Ord a => Interval a -> Interval a -> Bool
a contains b is true if the Interval b is entirely contained in a. That is, a contains b if for every entry s, if member s b then member s a.
```

```haskell
hull :: Ord a => Interval a -> Interval a -> Interval a
'hull a b' is the smallest interval containing a and b.
```

```haskell
intersection :: Ord a => Interval a -> Interval a -> Interval a
'intersection a b' is the largest interval that is contained in a and in b, if it exists.
```

```haskell
overlaps :: (Enum a, Ord a) => Interval a -> Interval a -> Bool
Check whether two intervals overlap, that is, whether there is a value that is a member of both intervals.
```

```haskell
member :: Ord a => a -> Interval a -> Bool
Check whether a value is in an interval.
```

```haskell
never :: Interval a
An Interval that is empty.
```

```haskell
always :: Interval a
An Interval that covers every slot.
```

```haskell
to :: a -> Interval a
to a is an Interval that includes all values that are smaller than or equal to a.
```

```haskell
from :: a -> Interval a
from a is an Interval that includes all values that are greater than or equal to a.
```

```haskell
singleton :: a -> Interval a
```

```haskell
interval :: a -> a -> Interval a
interval a b includes all values that are greater than or equal to a and smaller than or equal to b. Therefore it includes a and b.
```

```haskell
upperBound :: a -> UpperBound a
```

```haskell
lowerBound :: a -> LowerBound a
```

```haskell
strictLowerBound :: a -> LowerBound a
```

```haskell
strictUpperBound :: a -> UpperBound a
```

Bây giờ chúng ta có thể thực hành một số thay thế cabal. Đầu tiên chúng ta sẽ nhập Plutus.V1.Ledger.Interval.

```haskell
Prelude week03.Deploy> import Plutus.V1.Ledger.Interval
```


Ví dụ khoảng thời gian :

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
interval (10 :: Integer) 20
```
```
Output:
Interval {ivFrom = LowerBound (Finite 10) True, ivTo = UpperBound (Finite 20) True}
```


Ví dụ Thành viên:

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
member 9 $ interval (10 :: Integer) 20
```
```
Output:
False
```


```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
member 10 $ interval (10 :: Integer) 20
```
```
Output:
True
```

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
member 21 $ interval (10 :: Integer) 20

Output:
False
```


Ví dụ bắt đầu từ:

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
member 10 $ from (30 :: Integer)

Output:
False
```

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
member 30 $ from (30 :: Integer)

Output:
True
```

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
member 31 $ from (30 :: Integer)

Output:
True
```


Ví dụ đến:

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
member 10 $ to (30 :: Integer)

Output:
True
```

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
member 30 $ to (30 :: Integer)

Output:
True
```

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
member 31 $ to (30 :: Integer)

Output:
False
```

Example Intersection:


```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
intersection (interval (10 :: Integer) 20) $ interval 18 30

Output:
Interval {ivFrom = LowerBound (Finite 18) True, ivTo = UpperBound (Finite 20) True}
```

Ví dụ trong khoảng:

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
contains (to (100 :: Integer)) $ interval 30 80

Output:
True
```

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
contains (to (100 :: Integer)) $ interval 30 100

Output:
True
```

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
contains (to (100 :: Integer)) $ interval 30 101

Output:
False
```

Ví dụ Overlaps:

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
overlaps (to (100 :: Integer)) $ interval 30 101

Output:
True
```

```haskell
Prelude Plutus.V1.Ledger.Interval week03.Deploy> 
overlaps (to (100 :: Integer)) $ interval 101 110

Output:
False
```

## Vesting Contract

Bây giờ chúng ta sẽ xem xét một ví dụ về hợp đồng trao quyền `Vesting Contract`. Hãy tưởng tượng bạn muốn tặng một món quà ADA cho một đứa trẻ. Bạn muốn đứa trẻ sở hữu ADA, tuy nhiên, bạn chỉ muốn đứa trẻ có quyền truy cập vào ADA khi chúng đến một độ tuổi cụ thể. Sử dụng plutus, rất dễ dàng thực hiện một kế hoạch trao quyền thỏa mãn các điều kiện đó.

Trước tiên, chúng ta xem xét mốc thời gian được thông qua với hai mẩu thông tin; Người thụ hưởng và thời hạn:

```haskell
data VestingDatum = VestingDatum
   { beneficiary :: PaymentPubKeyHash
   , deadline    :: POSIXTime
   } deriving Show
```

Sau đó, chúng ta xem xét chức năng trình xác thực:

```haskell
{-# INLINABLE mkValidator #-}
mkValidator :: VestingDatum -> () -> ScriptContext -> Bool
mkValidator dat () ctx = traceIfFalse "beneficiary's signature missing" signedByBeneficiary &&
                        traceIfFalse "deadline not reached" deadlineReached
 where
   info :: TxInfo
   info = scriptContextTxInfo ctx

   signedByBeneficiary :: Bool
   signedByBeneficiary = txSignedBy info $ unPaymentPubKeyHash $ beneficiary dat

   deadlineReached :: Bool
   deadlineReached = contains (from $ deadline dat) $ txInfoValidRange info
```

Chúng tôi đã xác định mốc thời gian là dat và context là ctx. Sau đó, chúng ta kiểm tra đúng người thụ hưởng bằng cách tạo hàm SignByBeneficiary và thời hạn bằng hàm deadlineReached.

Sau đó mã hóa mốc thời gian và redeemer:

```haskell
data Vesting
instance Scripts.ValidatorTypes Vesting where
   type instance DatumType Vesting = VestingDatum
   type instance RedeemerType Vesting = ()
```


Bây giờ chúng ta cần xử lý việc biên dịch:

```haskell
typedValidator :: Scripts.TypedValidator Vesting
typedValidator = Scripts.mkTypedValidator @Vesting
   $$(PlutusTx.compile [|| mkValidator ||])
   $$(PlutusTx.compile [|| wrap ||])
 where
   wrap = Scripts.wrapValidator @VestingDatum @()
```
Tiếp theo là mã soạn sẵn cho trình xác thực, hàm băm và địa chỉ:

```haskell
validator :: Validator
validator = Scripts.validatorScript typedValidator

valHash :: Ledger.ValidatorHash
valHash = Scripts.validatorHash typedValidator

scrAddress :: Ledger.Address
scrAddress = scriptAddress validator
```

Cuối cùng, mã ngoài chuỗi `off-chain` :

```haskell
data GiveParams = GiveParams
   { gpBeneficiary :: !PaymentPubKeyHash
   , gpDeadline    :: !POSIXTime
   , gpAmount      :: !Integer
   } deriving (Generic, ToJSON, FromJSON, ToSchema)

type VestingSchema =
           Endpoint "give" GiveParams
       .\/ Endpoint "grab" ()

give :: AsContractError e => GiveParams -> Contract w s e ()
give gp = do
   let dat = VestingDatum
               { beneficiary = gpBeneficiary gp
               , deadline    = gpDeadline gp
               }
       tx  = Constraints.mustPayToTheScript dat $ Ada.lovelaceValueOf $ gpAmount gp
   ledgerTx <- submitTxConstraints typedValidator tx
   void $ awaitTxConfirmed $ getCardanoTxId ledgerTx
   logInfo @String $ printf "made a gift of %d lovelace to %s with deadline %s"
       (gpAmount gp)
       (show $ gpBeneficiary gp)
       (show $ gpDeadline gp)

grab :: forall w s e. AsContractError e => Contract w s e ()
grab = do
   now   <- currentTime
   pkh   <- ownPaymentPubKeyHash
   utxos <- Map.filter (isSuitable pkh now) <$> utxosAt scrAddress
   if Map.null utxos
       then logInfo @String $ "no gifts available"
       else do
           let orefs   = fst <$> Map.toList utxos
               lookups = Constraints.unspentOutputs utxos  <>
                         Constraints.otherScript validator
               tx :: TxConstraints Void Void
               tx      = mconcat [Constraints.mustSpendScriptOutput oref unitRedeemer | oref <- orefs] <>
                         Constraints.mustValidateIn (from now)
           ledgerTx <- submitTxConstraintsWith @Void lookups tx
           void $ awaitTxConfirmed $ getCardanoTxId ledgerTx
           logInfo @String $ "collected gifts"
 where
   isSuitable :: PaymentPubKeyHash -> POSIXTime -> ChainIndexTxOut -> Bool
   isSuitable pkh now o = case _ciTxOutDatum o of
       Left _          -> False
       Right (Datum e) -> case PlutusTx.fromBuiltinData e of
           Nothing -> False
           Just d  -> beneficiary d == pkh && deadline d <= now

endpoints :: Contract () VestingSchema Text ()
endpoints = awaitPromise (give' `select` grab') >> endpoints
 where
   give' = endpoint @"give" give
   grab' = endpoint @"grab" $ const grab

mkSchemaDefinitions ''VestingSchema

mkKnownCurrencies []
```

Bây giờ chúng ta có thể kiểm tra điều này trong Plutus Playground.

Để bắt đầu với Plutus Playground, chúng ta cần có hai Terminal  đang chạy, cả hai đều nằm trong nix-shell.

Hãy bắt đầu với terminal 1. Đi tới thư mục plutus-apps và chạy nix-shell trước:

```haskell
Terminal 3
. ~/.nix-profile/etc/profile.d/nix.sh
~/plutus-apps$ nix-shell
```


Tiếp theo, chúng ta đi đến thư mục plutus-playground-server và chạy:

```haskell
Terminal 3
[nix-shell:~/plutus-apps/plutus-playground-server]$ plutus-playground-server
```

Nếu thành công, bạn sẽ thấy đầu ra:

```haskell
Terminal 3
Interpreter Ready
```

Hãy bắt đầu với terminal 2. Đi tới thư mục plutus-apps và chạy nix-shell trước:

```haskell
Terminal 4
. ~/.nix-profile/etc/profile.d/nix.sh
~/plutus-apps$ nix-shell
```

Tiếp theo, chúng ta đi đến thư mục plutus-playground-client và chạy:

```haskell
Terminal 4
[nix-shell:~/plutus-apps/plutus-playground-client]$ npm run start
```

Nếu thành công, bạn sẽ thấy đầu ra:

```haskell
Terminal 4
[wdm]: Compiled successfully.

or

[wdm]: Compiled with warnings.
```

Giữ cả hai Terminal  mở và giờ đây chúng ta có thể truy cập Plutus Playground từ trình duyệt.

Mở trình duyệt và truy cập địa chỉ:

```
https://localhost:8009
```
Bạn sẽ nhận được một cảnh báo phàn nàn về việc đây là một trang web nguy hiểm, dù sao hãy bỏ qua thông báo để nhấp qua.
Giờ đây, bạn có thể biên dịch và chạy thành công hợp đồng quà tặng bằng cách sao chép/dán nó vào Plutus Playground và sử dụng hai nút ở góc trên cùng bên phải: “Biên dịch” và “Mô phỏng”.

Trước khi chúng ta thực hiện mô phỏng của mình, chúng ta cần tìm mã hash của ví thanh toán `pubkeyhash` cho ví 2 và 3. Chúng tôi có thể thực hiện việc này:

```haskell
Prelude week03.Deploy> import Wallet.Emulator
```

```haskell
Prelude Wallet.Emulator week03.Deploy> 
mockWalletPaymentPubKeyHash $ knownWallet 2

Output:
80a4f45b56b88d1139da23bc4c3c75ec6d32943c087f250b86193ca7
```

```haskell
Prelude Wallet.Emulator week03.Deploy> 
mockWalletPaymentPubKeyHash $ knownWallet 3

Output:
2e0ad60c3207248cecd47dbde3d752e0aad141d6b8f81ac2c6eca27c
```

Chúng tôi có thể sao chép/dán các giá trị băm đó vào simulation cho ví 2 và 3.

Chúng tôi cũng cần chuyển đổi các vị trí thành POSIXTime, điều mà chúng ta cũng có thể thực hiện trong Terminal này:

```haskell
Prelude week03.Deploy> import Ledger.TimeSlot
```

```haskell
Prelude Ledger.TimeSlot week03.Deploy> import Data.Default
```

```haskell
Prelude Ledger.TimeSlot Data.Default week03.Deploy>
slotToBeginPOSIXTime def 10

Output:
POSIXTime {getPOSIXTime = 1596059101000}
```

```haskell
Prelude Ledger.TimeSlot Data.Default week03.Deploy>
slotToBeginPOSIXTime def 20

Output:
POSIXTime {getPOSIXTime = 1596059111000}
```

Các ví sẽ trông giống như:

![Screenshot 2022-02-22 3 10 38 PM](https://user-images.githubusercontent.com/59018247/155421121-238f98c6-5db4-4998-a8b9-c5480f2af862.png)


Khe Genesis 0 trông giống như:

![Screenshot 2022-02-22 3 12 52 PM](https://user-images.githubusercontent.com/59018247/155421184-0cf78d3a-8231-4e87-93ba-cc309e5194b0.png)


Khe 1, TX 0:

![Screenshot 2022-02-22 3 13 29 PM](https://user-images.githubusercontent.com/59018247/155421261-3de95d30-3273-480e-9e7c-2dd195f8a017.png)

Khe 2, TX 0:

![Screenshot 2022-02-22 3 13 52 PM](https://user-images.githubusercontent.com/59018247/155421299-074999f6-79d2-40f0-85e7-378771261b8c.png)

Khe 3, TX 0:

![Screenshot 2022-02-22 3 14 15 PM](https://user-images.githubusercontent.com/59018247/155421319-53290473-87f2-450b-8c32-12625866edf6.png)


Slot 12, TX 0:

![Screenshot 2022-02-22 3 14 57 PM](https://user-images.githubusercontent.com/59018247/155421344-87dfb48b-63c0-434c-a79d-d299b4ef82af.png)


Slot 12, TX 1:


![Screenshot 2022-02-22 3 15 24 PM](https://user-images.githubusercontent.com/59018247/155421386-60aa58a0-4dd7-46a6-98eb-a16904ceb596.png)


**Số dư cuối kỳ:**

![Screenshot 2022-02-22 3 16 04 PM](https://user-images.githubusercontent.com/59018247/155421404-913f1e1d-ca78-4e9a-8bea-aa3cef0cebe7.png)


## Parameterized Contract

Bây giờ chúng ta sẽ xem xét một ví dụ tương tự về hợp đồng trao quyền, ngoại trừ việc chúng ta sẽ chuyển một tham số thay vì một mốc thời gian. Trước tiên chúng ta có thể xem mkValidator, trong đó datum hiện là kiểu unit():

```haskell
mkValidator :: VestingParam -> () -> () -> ScriptContext -> Bool
mkValidator p () () ctx = traceIfFalse "beneficiary's signature missing" signedByBeneficiary && traceIfFalse "deadline not reached" deadlineReached
 where
   info :: TxInfo
   info = scriptContextTxInfo ctx

   signedByBeneficiary :: Bool
   signedByBeneficiary = txSignedBy info $ unPaymentPubKeyHash $ beneficiary p

   deadlineReached :: Bool
   deadlineReached = contains (from $ deadline p) $ txInfoValidRange info
```

Sau đó mã hóa datum tới kiểu unit:

```haskell
data Vesting
instance Scripts.ValidatorTypes Vesting where
   type instance DatumType Vesting = ()
   type instance RedeemerType Vesting = ()
```

Sửa đổi phần compiler:

```haskell
typedValidator :: VestingParam -> Scripts.TypedValidator Vesting
typedValidator p = Scripts.mkTypedValidator @Vesting
   ($$(PlutusTx.compile [|| mkValidator ||]) `PlutusTx.applyCode` PlutusTx.liftCode p)
   $$(PlutusTx.compile [|| wrap ||])
 where
   wrap = Scripts.wrapValidator @() @()
```

Tiếp theo là mã cho trình xác thực, hàm băm và địa chỉ:

```haskell
validator :: VestingParam -> Validator
validator = Scripts.validatorScript . typedValidator

valHash :: VestingParam -> Ledger.ValidatorHash
valHash = Scripts.validatorHash . typedValidator

scrAddress :: VestingParam -> Ledger.Address
scrAddress = scriptAddress . validator
```

Tiếp theo là mã ngoài chuỗi:

```haskell
data GiveParams = GiveParams
   { gpBeneficiary :: !PaymentPubKeyHash
   , gpDeadline    :: !POSIXTime
   , gpAmount      :: !Integer
   } deriving (Generic, ToJSON, FromJSON, ToSchema)

type VestingSchema =
           Endpoint "give" GiveParams
       .\/ Endpoint "grab" POSIXTime

give :: AsContractError e => GiveParams -> Contract w s e ()
give gp = do
   let p  = VestingParam
               { beneficiary = gpBeneficiary gp
               , deadline    = gpDeadline gp
               }
       tx = Constraints.mustPayToTheScript () $ Ada.lovelaceValueOf $ gpAmount gp
   ledgerTx <- submitTxConstraints (typedValidator p) tx
   void $ awaitTxConfirmed $ getCardanoTxId ledgerTx
   logInfo @String $ printf "made a gift of %d lovelace to %s with deadline %s"
       (gpAmount gp)
       (show $ gpBeneficiary gp)
       (show $ gpDeadline gp)

grab :: forall w s e. AsContractError e => POSIXTime -> Contract w s e ()
grab d = do
   now   <- currentTime
   pkh   <- ownPaymentPubKeyHash
   if now < d
       then logInfo @String $ "too early"
       else do
           let p = VestingParam
                       { beneficiary = pkh
                       , deadline    = d
                       }
           utxos <- utxosAt $ scrAddress p
           if Map.null utxos
               then logInfo @String $ "no gifts available"
               else do
                   let orefs   = fst <$> Map.toList utxos
                       lookups = Constraints.unspentOutputs utxos      <>
                                 Constraints.otherScript (validator p)
                       tx :: TxConstraints Void Void
                       tx      = mconcat [Constraints.mustSpendScriptOutput oref unitRedeemer | oref <- orefs] <>
                                 Constraints.mustValidateIn (from now)
                   ledgerTx <- submitTxConstraintsWith @Void lookups tx
                   void $ awaitTxConfirmed $ getCardanoTxId ledgerTx
                   logInfo @String $ "collected gifts"

endpoints :: Contract () VestingSchema Text ()
endpoints = awaitPromise (give' `select` grab') >> endpoints
 where
   give' = endpoint @"give" give
   grab' = endpoint @"grab" grab

mkSchemaDefinitions ''VestingSchema

mkKnownCurrencies []
```

Bây giờ chúng ta có thể kiểm tra điều này trong Plutus Playground.

Nhìn vào thiết lập ví:

![Screenshot 2022-02-23 9 55 52 AM](https://user-images.githubusercontent.com/59018247/155421747-ccde3f2a-05b9-47fe-9d1f-c387f99351e8.png)

Khe Genesis 0 trông giống như:


![Screenshot 2022-02-23 10 11 03 AM](https://user-images.githubusercontent.com/59018247/155421766-dd3a400d-41e2-4955-812c-9f9772a1d041.png)


Slot 1, TX 0:

![Screenshot 2022-02-23 10 11 35 AM](https://user-images.githubusercontent.com/59018247/155421778-14f47cf5-f705-4e09-b83c-25d14aa746ec.png)

Slot 3, TX 0:

![Screenshot 2022-02-23 10 11 58 AM](https://user-images.githubusercontent.com/59018247/155421793-d5afe021-3b3d-4460-a5c8-90b930ca8185.png)


Slot 12, TX 0:

![Screenshot 2022-02-23 10 12 25 AM](https://user-images.githubusercontent.com/59018247/155421815-dfa9d563-98aa-4153-bdf3-0373e56bca2a.png)


Slot 12, TX 1:

![Screenshot 2022-02-23 10 12 48 AM](https://user-images.githubusercontent.com/59018247/155421839-6462a381-5f75-41d3-b4c3-c4e5151001fa.png)


Số dư cuối kỳ:

![Screenshot 2022-02-23 10 13 15 AM](https://user-images.githubusercontent.com/59018247/155421860-7749eb55-993a-4e96-ae4a-4d9061cb14bd.png)


## Cardano Testnet Smartconctact trên mạng Preprod

Mạng thử nghiệm Cardano preprod

Bây giờ chúng ta sẽ xem xét Cardano CLI và cách nó tương tác với testnet. Hy vọng rằng tại thời điểm này, nút cục bộ của bạn hiện đã được đồng bộ hóa từ công việc được thực hiện trong phần “chuẩn bị cho bài giảng 3”.

Giao diện dòng lệnh (CLI) cung cấp một tập hợp các công cụ để tạo khóa, xây dựng giao dịch, tạo chứng chỉ và thực hiện các tác vụ quan trọng khác. Nó được tổ chức theo một hệ thống phân cấp các lệnh con và mỗi cấp độ đi kèm với tài liệu tích hợp sẵn về cú pháp lệnh và các tùy chọn.

Phần này cung cấp tài liệu tham khảo về các lệnh cốt lõi `cardano-cli` và các lệnh con liên quan của chúng:

cardano-cli

*cardano-cli* <br/>
The set of `cardano-cli` commands include: <br/>
- `address`: payment address commands <br/>
- `stake-address`: stake address commands <br/>
- `transaction`: transaction commands <br/>
- `node`: node operation commands <br/>
- `stake-pool`: stake pool commands <br/>
- `query`: node query commands. Commands in this group query the local node whose Unix domain socket is obtained from the CARDANO_NODE_SOCKET_PATH environment variable. <br/>
- `genesis`: genesis block commands <br/>
- `text-view`: commands for dealing with text view files that are stored on disk, such as transactions or addresses <br/>
- `governance`: governance commands <br/>

*cardano-cli address* <br/>
The `address` command contains the following subcommands: <br/>
- `key-gen`: creates a single address key pair <br/>
- `key-hash`: prints the hash of an address to stdout <br/>
- `build`: builds a payment address, with optional delegation to a stake address <br/>
- `build-script`: builds a token locking script <br/>
- `info`: prints details about the address <br/>

*cardano-cli stake-address* <br/>
The `stake-address` command contains the following subcommands: <br/>
- `key-gen`: creates a single address key pair <br/>
- `build`: builds a stake address <br/>
- `key-hash`: prints the hash of a stake verification key <br/>
- `registration-certificate`: creates a registration certificate <br/>
- `delegation-certificate`: creates a stake address delegation certificate <br/>
- `deregistration-certificate`: creates a de-registration certificate <br/>

*cardano-cli transaction* <br/>
The `transaction` command contains the following subcommands: <br/>
- `build-raw`: builds a low-level transaction (uses the `--cardano-mode`, `--byron-mode`, `--shelley-mode` flags) <br/>
- `build`: builds an automatically balanced transaction (automatically calculates fees) <br/>
- `sign`: signs the transaction <br/>
- `assemble`: combines and assembles the transaction witness(es) with a transaction body to create a transaction <br/>
- `witness`: witnesses a transaction <br/>
- `submit`: submits the transaction to the local node whose Unix domain socket is obtained from the CARANO_NODE_SOCKET_PATH environment variable (uses the `--cardano-mode`, `--byron-mode`, `--shelley-mode` flags) <br/>
- `calculate-min-fee`: calculates the minimum fee for the transaction <br/>
- `calculate-min-required-utxo`: calculates the minimum required ADA for a transaction output <br/>
- `hash-script-data`: calculates the hash of script data (datums) <br/>
- `txid`: retrieves the transaction ID <br/>
- `policyid`: retrieves the policy ID <br/>
- `view`: pretty prints a transaction <br/>

*cardano-cli node* <br/>
The `node` command contains the following subcommands: <br/>
- `key-gen`: creates a key pair for a node operator's offline key and a new certificate issue counter <br/>
- `key-gen-KES`: creates a key pair for a node KES operational key <br/>
- `key-gen-VRF`: creates a key pair for a node VRF operational key <br/>
- `key-hash-VRF`: creates a key hash for a node VRF operational key <br/>
- `new-counter`: keeps track of the number of KES evolutions for a given operational certificate hot key <br/>
- `issue-op-cert`: issues a node operational certificate <br/>

*cardano-cli stake-pool* <br/>
The `stake-pool` command contains the following subcommands: <br/>
- `registration-certificate`: creates a stake pool registration certificate <br/>
- `de-registration-certificate`: creates a stake pool de-registration certificate <br/>
- `id`: builds pool id from the offline key <br/>
- `metadata-hash`:  retrieves the metadata hash <br/>

*cardano-cli query* <br/>
The `query` command contains the following subcommands: <br/>
- `protocol-parameters` (advanced): retrieves the node's current pool parameters (a raw dump of `Ledger.ChainDepState`). <br/>
- `tip`: gets the node's current tip (slot number, hash, and block number) <br/>
- `stake-pools`: gets the node's current set of stake pool ids <br/>
- `utxo`: retrieves the node's current UTxO, filtered by address <br/>
- `ledger-state` (advanced):  dumps the current state of the node (a raw dump of `Ledger.NewEpochState`) <br/>
- `stake-distribution`: gets the node's current set of stake pool ids <br/>
- `protocol-state` (advanced): dumps the node's current protocol state <br/>
- `stake-address-info`: gets the current delegations and reward accounts filtered by stake address. <br/>
- `stake-distribution`: gets the node's current aggregated stake distribution <br/>
- `stake-snapshot` (advanced): gets the stake snapshot information for a stake pool <br/>
- `pool-params` (advanced): gets the current and future parameters for a stake pool <br/>
- `leadership-schedule`: gets the slots in which the node is slot leader for the current or following epoch <br/>
- `kes-period-info` (advanced): returns diagnostic information about your operational certificate <br/>

*cardano-cli governance* <br/>
The `governance` command contains the following subcommands: <br/>
- `create-mir-certificate`: creates an MIR (move instantaneous rewards) certificate <br/>
- `create-update-proposal`: creates an update proposal <br/>
- `create-genesis-key-certificate`: retrieves the genesis key certificate <br/>

*cardano-cli genesis* <br/>
The `genesis` command contains the following subcommands: <br/>
- `key-gen-genesis`: creates a genesis key pair <br/>
- `key-gen-delegate`: creates a genesis delegate key pair <br/>
- `key-gen-utxo`: creates a genesis UTxO key pair <br/>
- `key-hash`: prints the identifier, or hash, of a public key <br/>
- `get-ver-key`: derives verification key from a signing key <br/>
- `initial-addr`: gets the address for an initial UTxO based on the verification key <br/>
- `initial-txin`: gets the transaction ID for an initial UTxO based on the verification key. <br/>
- `create`: creates a genesis file from a genesis template, as well as genesis keys, delegation keys, and spending keys. <br/>
- `create-staked`: creates a staked genesis file <br/>
- `hash`: retrieves the hash value <br/>
unit
*cardano-cli text-view* <br/>
The `text-view` command contains the following subcommand: <br/>
- `decode-cbor`: prints a text view file as decoded CBOR. <br/>

 
Để kiểm tra các hợp đồng của chúng ta, trước tiên chúng ta cần tạo các cặp khóa trên mạng thử nghiệm. Chúng ta có thể bắt đầu bằng cách mở một Terminal mới để chạy nix-shell, đảm bảo không đóng nút đồng bộ hóa trong terminal khác:

```
. ~/.nix-profile/etc/profile.d/nix.sh
~/plutus-apps$ nix-shell
```
Kiểm tra mạng đã đồng bộ xong chưa bằng lệnh

```
cardano-cli query tip --testnet-magic 1
```
Kết quả sẽ thấy như sau là đã đồng bộ xong và có thể chạy thử nghiệm được.
```
{
    "block": 388004,
    "epoch": 38,
    "era": "Babbage",
    "hash": "e65317fa3ef1eef097d251ad31d4d3e8d90198cf7095d4ab9756a42f62d0cda8",
    "slot": 15078737,
    "syncProgress": "100.00"
}


```

Chuyển đến thư mục con week03 trong thư mục tiên phong plutus, sau đó bên trong thư mục testnet. Trước tiên, chúng ta sẽ tạo khóa công khai và khóa riêng 01.vkey và 01.skey tương ứng bằng lệnh:

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cardano-cli address key-gen --verification-key-file 01.vkey --signing-key-file 01.skey
```

Bây giờ chúng ta sẽ tạo khóa công khai và khóa riêng thứ hai lần lượt là 02.vkey và 02.skey bằng lện

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cardano-cli address key-gen --verification-key-file 02.vkey --signing-key-file 02.skey
```

Nhìn vào 01.vkey:

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cat 01.vkey
```
```
Output:
{
    "type": "PaymentVerificationKeyShelley_ed25519",
    "description": "Payment Verification Key",
    "cborHex": "58201dd3552d73e7fef875031da2b2deeacc8cc9d1d70751850408d51a4061dd3e96"
}
```

Bây giờ chúng ta có thể tạo địa chỉ trên testnet cho 01.vkey và xuất địa chỉ đó vào tệp 01.addr bằng lệnh sau:

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cardano-cli address build --payment-verification-key-file 01.vkey --testnet-magic 1 --out-file 01.addr
```

Nhìn vào 01.addr:

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cat 01.addr
```
```
Output:
addr_test1vreew5etr04emz52u2jdm4fp37q9kx4pq963tt0ahflmdzgn3y7v0
```

Bây giờ chúng ta có thể tạo địa chỉ trên testnet cho 02.vkey và xuất địa chỉ đó vào tệp 02.addr bằng lệnh sau:

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cardano-cli address build --payment-verification-key-file 02.vkey --testnet-magic 1 --out-file 02.addr
```

Nhìn vào 02.addr:

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cat 02.addr

Output:
addr_test1vprfsx932ejfehn64vkkchpsu95hw28ae0hudqkk3c50zesxpmzkh
```

Bây giờ chúng ta cần tạo một số ADA để gửi đến địa chỉ đầu tiên của chúng ta. Điều này có thể được thực hiện từ trang sau bằng cách sử dụng faucet Cardano.

```
https://testnets.cardano.org/en/testnets/cardano/tools/faucet/
```

![Screenshot 2022-02-23 10 56 22 AM](https://user-images.githubusercontent.com/59018247/155427518-9a8eda85-1b36-4f33-8337-0441e619afe7.png)


Điều quan trọng cần lưu ý ở đây là địa chỉ của bạn cho 01.addr sẽ khác với địa chỉ được tạo trong hướng dẫn này! Đảm bảo bạn gửi ADA testnet đến địa chỉ bạn đã tạo trong CLI!

Bây giờ chúng ta sẽ có thể truy vấn địa chỉ. Điều quan trọng cần lưu ý ở đây, nút cục bộ của bạn phải được đồng bộ hóa với chuỗi khối vào thời điểm này, nếu không bạn sẽ không thể thấy tiền!

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cardano-cli query utxo --address $(cat 01.addr) --testnet-magic 1

Output:
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
6524545abf8050de175d489e0ec8f9f789e7e975932e528a3b398367caa0a9f8     0        10000000000 lovelace + TxOutDatumNone

```

Bây giờ chúng ta sẽ gửi một số tiền đến địa chỉ thứ hai của mình bằng cách sử dụng tập lệnh được tạo sẵn send.sh:

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cat send.sh

Output:

    --alonzo-era \
    --testnet-magic 1 \
    --change-address $(cat 01.addr) \
    --tx-in 6524545abf8050de175d489e0ec8f9f789e7e975932e528a3b398367caa0a9f8#0 \
    --tx-out "$(cat 02.addr) 10000000 lovelace" \
    --out-file tx.body

cardano-cli transaction sign \
    --tx-body-file tx.body \
    --signing-key-file 01.skey \
    --testnet-magic 1 \
    --out-file tx.signed

cardano-cli transaction submit \
    --testnet-magic 1 \
    --tx-file tx.signed

```

Lưu ý quan trọng, bạn cần thay đổi `tx-in` thành hàm băm `TxHash` của 01.addr nơi chúng ta đã gửi tiền ở bước trước! Cũng lưu ý rằng nó kết thúc bằng #0 chỉ định chỉ số  `TxIx` giao dịch ở đây là 0
và chạy:

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
./send.sh

Output:
Estimated transaction fee: Lovelace 165545
Transaction successfully submitted.

```

Sau khi đợi khoảng 20 giây, chúng ta có thể truy vấn địa chỉ đầu tiên để xem tiền đã được gửi chưa:

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cardano-cli query utxo --address $(cat 01.addr) --testnet-magic 1

Output:

                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
d1c42f58ac97fc1b8a9d2966bdce8687358a475dba9ea9d4083044d258c38d31     1        9989834455 lovelace + TxOutDatumNone

```

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cardano-cli query utxo --address $(cat 02.addr) --testnet-magic 1

Output:

                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
d1c42f58ac97fc1b8a9d2966bdce8687358a475dba9ea9d4083044d258c38d31     0        10000000 lovelace + TxOutDatumNone

```

Để bắt đầu sử dụng Plutus bằng Cardano-CLI, chúng ta cần tuần tự hóa và ghi vào đĩa các loại Plutus khác nhau. Tuy nhiên, trước tiên chúng ta cần lấy `PaymentPubKeyHash` của ví 2:

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cardano-cli address key-hash --payment-verification-key-file 02.vkey --out-file 02.pkh
```

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cat 02.pkh

Output:
469818b156649cde7aab2d6c5c30e1697728fdcbefc682d68e28f166

```
tạo biến 
```
signer_hash="469818b156649cde7aab2d6c5c30e1697728fdcbefc682d68e28f166"
```

Nhìn vào Deploy.hs, chúng ta cần thay thế hàm băm khóa công khai thanh toán của người thụ hưởng bằng hàm băm mà chúng ta đã tạo ở trên. Lưu ý rằng hàm băm của bạn sẽ khác với hàm băm trong hướng dẫn này. Chúng tôi cũng thay thế thời hạn bằng một thời gian trong tương lai. (bạn có thể sử dụng [Epoch Converter](https://www.epochconverter.com/) để tìm dấu thời gian trong tương lai)

```haskell
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TypeApplications  #-}

module Week03.Deploy
   ( writeJSON
   , writeValidator
   , writeUnit
   , writeVestingValidator
   ) where

import           Cardano.Api
import           Cardano.Api.Shelley   (PlutusScript (..))
import           Codec.Serialise       (serialise)
import           Data.Aeson            (encode)
import qualified Data.ByteString.Lazy  as LBS
import qualified Data.ByteString.Short as SBS
import           PlutusTx              (Data (..))
import qualified PlutusTx
import qualified Ledger

import           Week03.Parameterized

dataToScriptData :: Data -> ScriptData
dataToScriptData (Constr n xs) = ScriptDataConstructor n $ dataToScriptData <$> xs
dataToScriptData (Map xs)      = ScriptDataMap [(dataToScriptData x, dataToScriptData y) | (x, y) <- xs]
dataToScriptData (List xs)     = ScriptDataList $ dataToScriptData <$> xs
dataToScriptData (I n)         = ScriptDataNumber n
dataToScriptData (B bs)        = ScriptDataBytes bs

writeJSON :: PlutusTx.ToData a => FilePath -> a -> IO ()
writeJSON file = LBS.writeFile file . encode . scriptDataToJson ScriptDataJsonDetailedSchema . dataToScriptData . PlutusTx.toData

writeValidator :: FilePath -> Ledger.Validator -> IO (Either (FileError ()) ())
writeValidator file = writeFileTextEnvelope @(PlutusScript PlutusScriptV1) file Nothing . PlutusScriptSerialised . SBS.toShort . LBS.toStrict . serialise . Ledger.unValidatorScript

writeUnit :: IO ()
writeUnit = writeJSON "testnet/unit.json" ()

writeVestingValidator :: IO (Either (FileError ()) ())
writeVestingValidator = writeValidator "testnet/vesting.plutus" $ validator $ VestingParam
   { beneficiary = Ledger.PaymentPubKeyHash "469818b156649cde7aab2d6c5c30e1697728fdcbefc682d68e28f166"
   , deadline    = 15300036
   }
```
### Biên dịch smartcontract plutus

Mở cabal repl trong Terminal  khác và chạy:

```
cd ~plutus-apps/
nix-shell
cd ~/plutus-pioneer-program/code/week03
[nix-shell:~/plutus-pioneer-program/code/week03]$ cabal repl 
```

```haskell
Prelude week03.Deploy> writeUnit
```

```haskell
Prelude week03.Deploy> writeVestingValidator

Output:
Right ()
```
## Tạo giao dịch với SmartContract

### B1 Tạo địa chỉ ví smartcontract

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cardano-cli address build --payment-script-file vesting.plutus --testnet-magic 1 --out-file vesting.addr
```

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cat vesting.addr

Output:
addr_test1wq43pks2g94gzh2rqgjrf5ee6l7pzhju8vwpjpca2m8dchsn6t6a8
```

### B2: Lấy Txin của địa chỉ gửi
```
cardano-cli query utxo --address $(cat 01.addr) --testnet-magic 1

                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
f9f0655084b8ab67df1ac1fb5c016379ea03068505bd1d0e97b94bdd4b4fe734     1        9989834455 lovelace + TxOutDatumNone

```
tạo biến

```
TXIN1="f9f0655084b8ab67df1ac1fb5c016379ea03068505bd1d0e97b94bdd4b4fe734#1"
```
### B3: tạo giao dịch gửi tADA lên Smartcontract

Nhìn vào tập lệnh give.sh, chúng ta thay đổi `tx-in` thành địa chỉ query 1 utxo mà chúng ta đã tạo trước đó:

```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 

```

```
TXIN1="f9f0655084b8ab67df1ac1fb5c016379ea03068505bd1d0e97b94bdd4b4fe734#1"

cardano-cli transaction build \
    --alonzo-era \
    --testnet-magic 1 \
    --change-address $(cat 01.addr) \
    --tx-in $TXIN1 \
    --tx-out "$(cat vesting.addr) 2000002 lovelace" \
    --tx-out-datum-hash-file unit.json \
    --out-file tx.body

cardano-cli transaction sign \
    --tx-body-file tx.body \
    --signing-key-file 01.skey \
    --testnet-magic 1 \
    --out-file tx.signed

cardano-cli transaction submit \
    --testnet-magic 1 \
    --tx-file tx.signed
```

Bây giờ chúng ta có thể xem tập lệnh grab.sh. Chúng ta sẽ thay đổi hàm băm `Txin` thành hàm băm của vesting.addr mà chúng ta đã gửi lên. Chúng tôi sẽ thay đổi tài sản thế chấp thành hàm băm của 02.addr từ trước đó. Chúng tôi cũng sẽ thay đổi hàm băm của người ký thành hàm băm của 02.pkh. Cuối cùng, chúng ta cần thay đổi `invalid-before` để phản ánh vị trí hiện tại; mà chúng ta đã truy vấn ở bước cuối cùng:


### B4: Lấy Txin của địa chỉ  Smartcontract   vừa gửi lên

``` 
cardano-cli query utxo --address $(cat vesting.addr) --testnet-magic 1

TXINSM="5d3ddaf94078cc7d3ee7e3a42e2676576a689e216d53e4d72b0301624de0f5c1#0"

```

### B5: Lấy slot hiện tại 

```
cardano-cli query tip --testnet-magic 1 

{
    "block": 398631,
    "epoch": 39,
    "era": "Babbage",
    "hash": "348a710d1eab461b20b94c36a41f8d8ca537ce6054658ce32d04e04b725737da",
    "slot": 15300036,
    "syncProgress": "100.00"
}
```

### B6: tải protocol.json
```
cardano-cli query protocol-parameters --testnet-magic 1  --out-file protocol.json
```
### B7: Lấy Txin của địa chỉ nhận (trả phí)

```
cardano-cli query utxo --address $(cat 02.addr) --testnet-magic 1

TXIN2="d1c42f58ac97fc1b8a9d2966bdce8687358a475dba9ea9d4083044d258c38d31#0" 
```

### B8: Ví người thụ hưởng nhận quà (tADA)

thay đổi các thông số --tx-in; tx-in-collateral; --invalid-before; --required-signer-hash (vẫn hợp đồng cũ thì không đổi) 

```
TXINSM="5d3ddaf94078cc7d3ee7e3a42e2676576a689e216d53e4d72b0301624de0f5c1#0"
TXIN2="d1c42f58ac97fc1b8a9d2966bdce8687358a475dba9ea9d4083044d258c38d31#0"
signer_hash="469818b156649cde7aab2d6c5c30e1697728fdcbefc682d68e28f166"

cardano-cli transaction build \
    --alonzo-era \
    --testnet-magic 1 \
    --change-address $(cat 02.addr) \
    --tx-in $TXINSM \
    --tx-in-script-file vesting.plutus \
    --tx-in-datum-file unit.json \
    --tx-in-redeemer-file unit.json \
    --tx-in-collateral $TXIN2 \
    --required-signer-hash $signer_hash \
    --invalid-before 15300036 \
    --protocol-params-file protocol.json \
    --out-file tx.body

cardano-cli transaction sign \
    --tx-body-file tx.body \
    --signing-key-file 02.skey \
    --testnet-magic 1 \
    --out-file tx.signed

cardano-cli transaction submit \
    --testnet-magic 1 \
    --tx-file tx.signed
 ```   





Nếu sai thì sẽ báo lỗi sau

```

Command failed: transaction build  Error: The followings tx inputs were expected to be key witnessed but are actually script witnessed: ["6e7bd85be4c37d9c8deb70236bdd9c61f22812ec5779055778e53a762b9ac54b#0"]
```
Nếu không
```
Output:
Estimated transaction fee: Lovelace 365397
Transaction successfully submitted.
```

Sau khi đợi khoảng 20 giây, chúng ta có thể truy vấn địa chỉ thứ hai để xem cuối cùng đã nhận được tiền từ món quà chưa:


```
[nix-shell:~/plutus-pioneer-program/code/week03/testnet]$ 
cardano-cli query utxo --address $(cat 02.addr) --testnet-magic 1

                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
582e65894b72410057dce6cdabb5be18d401a2e124732c1c2f8272e5f0e1699a     0        1639485 lovelace + TxOutDatumNone
d1c42f58ac97fc1b8a9d2966bdce8687358a475dba9ea9d4083044d258c38d31     0        10000000 lovelace + TxOutDatumNone
```
Địa chỉ Smartcontract đã không còn UTxO 

```
cardano-cli query utxo --address $(cat vesting.addr) --testnet-magic 1    

                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
```



## Homework Part 1

- Điều này sẽ hợp lệ nếu một trong hai người thụ hưởng1 đã ký giao dịch và vị trí hiện tại là trước hoặc vào thời hạn
- Hoặc nếu người thụ hưởng2 đã ký giao dịch và thời hạn đã qua.

Phần đầu tiên của bài tập về nhà, chúng ta cần viết một hàm trình xác thực sẽ trả về giá trị true nếu người thụ hưởng1 đã ký giao dịch và vị trí hiện tại là trước hoặc vào thời hạn chót. Nó cũng phải trả về true nếu người thụ hưởng2 đã ký giao dịch và thời hạn đã qua.

Trước tiên chúng ta cần chuyển datum (dat) và context (ctx) vào trình xác thực:

```haskell
mkValidator :: VestingDatum -> () -> ScriptContext -> Bool
mkValidator dat () ctx
```

Sau đó, chúng ta cần viết logic thỏa mãn cả hai điều kiện đã được mô tả ở trên:

```haskell
   | (unPaymentPubKeyHash (beneficiary1 dat) `elem` sigs) && (to       (deadline dat) `contains` range) = True
   | (unPaymentPubKeyHash (beneficiary2 dat) `elem` sigs) && (from (1 + deadline dat) `contains` range) = True
   | otherwise                                                                                          = False
 where
   info :: TxInfo
   info = scriptContextTxInfo ctx

   sigs :: [PubKeyHash]
   sigs = txInfoSignatories info

   range :: POSIXTimeRange
   range = txInfoValidRange info
```
Chúng tôi kiểm tra cả hai điều kiện, một điều kiện mà người thụ hưởng1 ký và nó ở trước hoặc vào thời hạn, và cũng là trường hợp người thụ hưởng2 ký và nó ở sau thời hạn. Nếu không, tất cả những thứ khác trả về false.
Mã sẽ giống như:

```haskell
{-# INLINABLE mkValidator #-}
-- This should validate if either beneficiary1 has signed the transaction and the current slot is before or at the deadline
-- or if beneficiary2 has signed the transaction and the deadline has passed.
mkValidator :: VestingDatum -> () -> ScriptContext -> Bool
mkValidator dat () ctx
   | (unPaymentPubKeyHash (beneficiary1 dat) `elem` sigs) && (to       (deadline dat) `contains` range) = True
   | (unPaymentPubKeyHash (beneficiary2 dat) `elem` sigs) && (from (1 + deadline dat) `contains` range) = True
   | otherwise                                                                                          = False
 where
   info :: TxInfo
   info = scriptContextTxInfo ctx

   sigs :: [PubKeyHash]
   sigs = txInfoSignatories info

   range :: POSIXTimeRange
   range = txInfoValidRange info
```

Thử nghiệm trong Plutus Playground ta thấy:


![Screenshot 2022-02-23 4 23 29 PM](https://user-images.githubusercontent.com/59018247/155427775-f5cab26b-29ae-4ef1-bee3-5037a837e404.png)


Slot 0, Tx 0

![Screenshot 2022-02-23 4 24 11 PM](https://user-images.githubusercontent.com/59018247/155427795-d854d097-f010-4450-9dc0-1b2777117389.png)

Slot 1, Tx 0

![Screenshot 2022-02-23 4 24 32 PM](https://user-images.githubusercontent.com/59018247/155427815-195f3fa7-1c1a-427b-9ad7-3cb915564b50.png)

Slot 1, Tx 1

![Screenshot 2022-02-23 4 24 55 PM](https://user-images.githubusercontent.com/59018247/155427828-04d2728a-751a-42a7-97f6-d45bd322fcf8.png)

Slot 6, Tx 0

![Screenshot 2022-02-23 4 25 15 PM](https://user-images.githubusercontent.com/59018247/155427850-646fe543-5a6b-47dc-a9ef-1efdbbe1a904.png)

Slot 7, Tx 0

![Screenshot 2022-02-23 4 25 39 PM](https://user-images.githubusercontent.com/59018247/155427867-654eeca7-0635-40f1-ab3c-67c82df9c30b.png)

Số dư cuối kỳ:

![Screenshot 2022-02-23 4 26 06 PM](https://user-images.githubusercontent.com/59018247/155427887-c7ecd668-96e8-4d72-ac9d-acb73a53b3c9.png)


## Homework Part 2



Phần thứ hai của bài tập về nhà, chúng ta cần viết hàm trình xác thực cho hợp đồng trao quyền, thay vào đó chúng ta chuyển pubkeyhash làm tham số và POSIXTime như là datum.

```haskell
mkValidator :: PaymentPubKeyHash -> POSIXTime -> () -> ScriptContext -> Bool
```


Chúng tôi có thể bắt đầu bằng cách kiểm tra xem chữ ký của người thụ hưởng có tồn tại hay không và thời hạn đã đến chưa. Đầu tiên chúng ta vượt qua:
```haskell
mkValidator pkh s () ctx =
```

Bây giờ chúng ta lấy logic như được mô tả ở trên:

```haskell
   traceIfFalse "beneficiary's signature missing" checkSig      &&
   traceIfFalse "deadline not reached"            checkDeadline
 where
   info :: TxInfo
   info = scriptContextTxInfo ctx

   checkSig :: Bool
   checkSig = unPaymentPubKeyHash pkh `elem` txInfoSignatories info

   checkDeadline :: Bool
   checkDeadline = from s `contains` txInfoValidRange info
```

Implementing the compilation:
Thực hiện biên soạn:

```haskell
typedValidator :: PaymentPubKeyHash -> Scripts.TypedValidator Vesting
typedValidator p = Scripts.mkTypedValidator @Vesting
   ($$(PlutusTx.compile [|| mkValidator ||]) `PlutusTx.applyCode` PlutusTx.liftCode p)
   $$(PlutusTx.compile [|| wrap ||])
 where
   wrap = Scripts.wrapValidator @POSIXTime @()
```


Cuối cùng là mã cho trình xác thực và địa chỉ. Ở đây chúng ta cần thêm PaymentPubKeyHash:

```haskell
validator :: PaymentPubKeyHash -> Validator
validator = Scripts.validatorScript . typedValidator

scrAddress :: PaymentPubKeyHash -> Ledger.Address
scrAddress = scriptAddress . validator
```

Mã cuối sẽ giống như này:

```haskell
{-# INLINABLE mkValidator #-}
mkValidator :: PaymentPubKeyHash -> POSIXTime -> () -> ScriptContext -> Bool
mkValidator pkh s () ctx =
   traceIfFalse "beneficiary's signature missing" checkSig      &&
   traceIfFalse "deadline not reached"            checkDeadline
 where
   info :: TxInfo
   info = scriptContextTxInfo ctx

   checkSig :: Bool
   checkSig = unPaymentPubKeyHash pkh `elem` txInfoSignatories info

   checkDeadline :: Bool
   checkDeadline = from s `contains` txInfoValidRange info

data Vesting
instance Scripts.ValidatorTypes Vesting where
   type instance DatumType Vesting = POSIXTime
   type instance RedeemerType Vesting = ()

typedValidator :: PaymentPubKeyHash -> Scripts.TypedValidator Vesting
typedValidator p = Scripts.mkTypedValidator @Vesting
   ($$(PlutusTx.compile [|| mkValidator ||]) `PlutusTx.applyCode` PlutusTx.liftCode p)
   $$(PlutusTx.compile [|| wrap ||])
 where
   wrap = Scripts.wrapValidator @POSIXTime @()

validator :: PaymentPubKeyHash -> Validator
validator = Scripts.validatorScript . typedValidator

scrAddress :: PaymentPubKeyHash -> Ledger.Address
scrAddress = scriptAddress . validator
```

Mô phỏng Plutus Playground sẽ giống như sau:

![Screenshot 2022-02-23 4 30 53 PM](https://user-images.githubusercontent.com/59018247/155428012-76cd9313-34dd-4aa8-a89c-3783a5ac2e5b.png)

Slot 0, Tx 0

![Screenshot 2022-02-23 4 32 08 PM](https://user-images.githubusercontent.com/59018247/155428065-c66c330c-50e0-409e-95c9-2a394a3193f5.png)


Slot 1, Tx 0

![Screenshot 2022-02-23 4 32 23 PM](https://user-images.githubusercontent.com/59018247/155428290-7b064448-ee5c-4ff2-a58a-f8fce0426e49.png)


Slot 2, Tx 0


![Screenshot 2022-02-23 4 32 44 PM](https://user-images.githubusercontent.com/59018247/155428488-be2b0531-788d-4159-b42f-31864aa69b49.png)


Slot 12, Tx 0


![Screenshot 2022-02-23 4 33 11 PM](https://user-images.githubusercontent.com/59018247/155428632-557b71c2-c2fa-4548-aac3-f43e421266a0.png)


Slot 22, Tx 0


![Screenshot 2022-02-23 4 33 35 PM](https://user-images.githubusercontent.com/59018247/155428745-a511fe14-1da3-4dda-ae2b-06d1b51334b3.png)


Số dư cuối kỳ:


![Screenshot 2022-02-23 4 33 53 PM](https://user-images.githubusercontent.com/59018247/155429048-d5cb7872-387b-422a-8f10-a8cb72c59f11.png)
