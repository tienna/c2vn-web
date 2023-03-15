# Bài giảng 2: Tập lệnh xác thực cấp thấp và cấp cao

Plutus Pioneer Program - Cohort 3
January 20, 2022

Offical Video by Lars Brünjes: [PPP-Cohort3-Lecture2](https://www.youtube.com/watch?v=BEr7lcCPjnA&list=PLNEK_Ejlx3x0mhPmOjPSHZPtTFpfJo3Nd)

Google Doc version can be found [HERE](https://docs.google.com/document/d/1wclIpwHW-Lo8R8IJHbjvEYjyzsm5qLUMcrN9bpCOL00/edit#)


## Table of Contents
- [Lecture 2: Low and High Level Validation Scripts](#lecture-2-low-and-high-level-validation-scripts)
  - [Table of Contents](#table-of-contents)
  - [Preparation for Lecture 2](#preparation-for-lecture-2)
  - [Low Level Untyped Validation Scripts](#low-level-untyped-validation-scripts)
  - [High Level Typed Validation Scripts](#high-level-typed-validation-scripts)
  - [Homework Part 1](#homework-part-1)
  - [Homework Part 2](#homework-part-2)

## Chuẩn bị cho bài giảng 2

Trước khi bắt đầu bài giảng 2, trước tiên chúng ta phải cập nhật môi trường phát triển của mình. Bạn có thể sao chép và dán trực tiếp bất kỳ mã nào trong hướng dẫn này vào Terminal hoặc IDE của mình.

Đầu tiên, hãy vào thư mục plutus-pioneer-program để lấy nội dung bài giảng tuần 2. Hành hình:



```
~/plutus-pioneer-program$ git pull
```

Bây giờ bạn có thể điều hướng đến thư mục week02 hiện tại và mở tệp cabal.project:

```
~/plutus-pioneer-program/code/week02$ cat cabal.project
```

Lấy thẻ plutus-apps bên trong tệp cabal.project:
 
```
location: https://github.com/input-output-hk/plutus-apps.git
  tag:6aff97d596ac9d59460aab5c65627b1c8c0a1528
```

Quay trở lại thư mục plutus-apps và cập nhật nó vào thẻ git hiện tại:

```
~/plutus-apps$ git checkout main
```
```
~/plutus-apps$ git pull
```
```
~/plutus-apps$ git checkout 6aff97d596ac9d59460aab5c65627b1c8c0a1528
```

Bây giờ bạn đã được cập nhật và có thể chạy nix-shell trong thư mục này. Chạy nix-shell:

```
~/plutus-apps$ nix-shell
```

Quay trở lại thư mục week02 để bắt đầu chạy các lệnh cabal:

```
[nix-shell:~/plutus-pioneer-program/code/week02]$ cabal update
```
```
[nix-shell:~/plutus-pioneer-program/code/week02]$ cabal build
```
```
[nix-shell:~/plutus-pioneer-program/code/week02]$ cabal repl
```

Nếu thành công, bây giờ bạn đã sẵn sàng để bắt đầu bài giảng:

```haskell
Ok, 9 modules loaded.
Prelude week02.Burn > 
```

## Low Level Untyped Validation Scripts



Bài giảng này sẽ tập trung vào mã on-chain của tập lệnh plutus. Có ba phần dữ liệu mà tập lệnh Plutus nhận được:

	1. `datum` trong UTxO
	2. `redeemer` đến từ đầu vào và xác thực
	3. `context` của giao dịch được xác thực từ I/O của nó

Ba phần dữ liệu này cần được biểu diễn bằng một kiểu dữ liệu Haskell. Nhìn vào triển khai cấp thấp, cùng một loại dữ liệu sẽ được sử dụng cho cả ba phần dữ liệu. Trong phần tiếp theo, chúng ta sẽ xem xét xác thực cấp cao sẽ xem xét các loại dữ liệu tùy chỉnh cho mốc thời gian và người đổi quà. Xác thực cấp cao sẽ phải trả giá bằng hiệu suất.

Nhìn vào dữ liệu cho một `redeemer`:

```haskell
data Data
A generic "data" type.
The main constructor Constr represents a datatype value in sum-of-products form: Constr i args represents a use of the ith constructor along with its arguments.
The other constructors are various primitives.
Constructors
Constr Integer [Data]
 
Map [(Data, Data)]
 
List [Data]
 
I Integer
 
B ByteString

```

Bây giờ chúng ta có thể sử dụng  Terminal để có được một số trải nghiệm thực tế. Đầu tiên, hãy nhập PlutusTx

```haskell
Prelude week02.Burn > import PlutusTx
```


Bây giờ chúng ta có thể lấy thông tin về dữ liệu bằng lệnh:

```haskell
Prelude PlutusTx week02.Burn > :i Data

Output:
type Data :: *
data Data
  = Constr Integer [Data]
  | Map [(Data, Data)]
  | List [Data]
  | I Integer
  | B bytestring
```


Example :

```haskell
Prelude PlutusTx week02.Burn > I 42

Output:
I 42
```

```haskell
Prelude PlutusTx week02.Burn > :t I 42

Output:
I 42 :: Data
```

Bây giờ chúng ta có thể sử dụng tiện ích mở rộng này (-XOverloadedStrings) để sử dụng các chuỗi ký tự cho các  kiểu string-like. Một ví dụ là kiểu Byte string. 
Execute:

```haskell
Prelude PlutusTx week02.Burn > :set -XOverloadedStrings
```

Example using the B constructor:

```haskell
Prelude PlutusTx week02.Burn > B "Haskell"

Output:
B "Haskell"
```

```haskell
Prelude PlutusTx week02.Burn > :t B "Haskell"

Output:
B "Haskell" :: Data
```

Example using Map:

```haskell
Prelude PlutusTx week02.Burn > 
:t Map [(I 42, B "Haskell"), (List [I 0], I 1000)]

Output:
Map [(I 42, B "Haskell"), (List [I 0], I 1000)] :: Data
```


Với kiến ​​thức này, giờ đây chúng ta có thể tạo trình xác thực đầu tiên của mình. Chúng tôi sẽ sử dụng tệp Gift.hs có trong thư mục week02.

Nhìn vào phần xác thực của Gift.hs:

```haskell
{-# INLINABLE mkValidator #-}
mkValidator :: BuiltinData -> BuiltinData -> BuiltinData -> ()
mkValidator _ _ _ = ()

validator :: Validator
validator = mkValidatorScript $$(PlutusTx.compile [|| mkValidator ||])

valHash :: Ledger.ValidatorHash
valHash = Scripts.validatorHash validator

scrAddress :: Ledger.Address
scrAddress = scriptAddress validator
```

Đây là chức năng xác thực cơ bản nhất. Tệp được gọi là quà tặng vì nếu bất kỳ ai gửi tiền đến địa chỉ tập lệnh này, thì bất kỳ ai khác cũng có thể sử dụng đầu ra đó để sử dụng.

Trước tiên, chúng tôi xem xét mkValidatorScript:

```haskell
validator :: Validator
validator = mkValidatorScript $$(PlutusTx.compile [|| mkValidator ||])
```

Chúng tôi có một hàm haskell có logic, trong đó (||) dấu ngoặc vuông Oxford chuyển đổi hàm đó thành biểu diễn cú pháp của hàm đó. Trình biên dịch lấy biểu diễn đó và biến nó thành một hàm lõi plutus tương ứng. Sau đó, ($$) lấy lõi Plutus đó và ghép nó vào mã nguồn. Kết quả đó là những gì sau đó biến thành trình xác thực.

Trường hợp mkValidatorScript là:

```haskell
mkValidatorScript :: CompiledCode (BuiltinData -> BuiltinData -> BuiltinData -> ()) -> Validator
```

Để tận dụng điều này, chúng ta cần thêm một hàm Pragma để tạo ra hàm xác thực:

```haskell
{-# INLINABLE mkValidator #-}
```

Bây giờ chúng ta có thể tải tệp này:

```haskell 
Prelude PlutusTx week02.Burn > :l src/Week02/Gift.hs

Output:
Ok, one module loaded.
```

Đảm bảo cả PlutusTx và Ledger.Scripts đều được imported:

```haskell
Prelude week02.Gift > import PlutusTx
```
```haskell
Prelude PlutusTx week02.Burn > import Ledger.Scripts
```

Type validator:

```haskell
Prelude PlutusTx Ledger.Scripts week02.Gift > validator

Output:
Validator { <script> }
```

Trình xác thực và tập lệnh ở đâu:

```haskell
newtype Validator
Validator is a wrapper around Scripts which are used as validators in transaction outputs.
Constructors
Validator
 
getValidator :: Script
```

```haskell
newtype Script
A script on the chain. This is an opaque type as far as the chain is concerned.
Constructors
Script
 
unScript :: Program DeBruijn DefaultUni DefaultFun ()
```

### Bây giờ chúng ta có thể chạy trình xác thực unScript $ getValidator:

```haskell
Prelude PlutusTx Ledger.Scripts week02.Gift >
unScript $ getValidator validator

Output:
Program () (Version () 1 0 0) (Apply () (Apply () (LamAbs () (DeBruijn {dbnIndex = 0}) (LamAbs () (DeBruijn {dbnIndex = 0}) (LamAbs () (DeBruijn {dbnIndex = 0}) (LamAbs () (DeBruijn {dbnIndex = 0}) (LamAbs () (DeBruijn {dbnIndex = 0}) (Var () (DeBruijn {dbnIndex = 5}))))))) (Delay () (LamAbs () (DeBruijn {dbnIndex = 0}) (Var () (DeBruijn {dbnIndex = 1}))))) (LamAbs () (DeBruijn {dbnIndex = 0}) (Var () (DeBruijn {dbnIndex = 1}))))
```

Đây là tập lệnh cốt lõi của plutus trong biểu diễn này. Chúng tôi đã biên dịch chức năng mkValidator của mình và biến nó thành Plutus Core.

Hai phần quan trọng khác của trình xác thực là các hàm validatorHash và ScriptAddress.

```haskell
valHash :: Ledger.ValidatorHash
valHash = Scripts.validatorHash validator

scrAddress :: Ledger.Address
scrAddress = scriptAddress validator
```

Trong đó valHash lưu trữ hàm băm của trình xác thực và scrAddress lưu trữ địa chỉ của tập lệnh.

Thí dụ:

```haskell
Prelude PlutusTx Ledger.Scripts week02.Gift > valHash

Output:
67f33146617a5e61936081db3b2117cbf59bd2123748f58ac9678656
```

```haskell
Prelude PlutusTx Ledger.Scripts week02.Gift > scrAddress

Output:
Address {addressCredential = ScriptCredential 67f33146617a5e61936081db3b2117cbf59bd2123748f58ac9678656, addressStakingCredential = Nothing}
```

### Bây giờ chúng ta có thể kiểm tra điều này trong Plutus Playground.

Để bắt đầu với Plutus Playground, chúng ta cần có hai Terminal đang chạy, cả hai đều nằm trong nix-shell.

Hãy bắt đầu với terminal 1. Đi tới thư mục plutus-apps và chạy nix-shell trước:

```haskell
Terminal 1
. /home/user/.nix-profile/etc/profile.d/nix.sh
~/plutus-apps$ nix-shell
```

Tiếp theo, chúng tôi đi đến thư mục plutus-playground-server và chạy:

```haskell
Terminal 1
cd ~/plutus-apps/plutus-playground-server
[nix-shell:~/plutus-apps/plutus-playground-server]$ plutus-playground-server
```

Nếu thành công, bạn sẽ thấy đầu ra:

```haskell
Terminal 1
Interpreter Ready
```

Hãy bắt đầu với terminal 2. Đi tới thư mục plutus-apps và chạy nix-shell trước:

```haskell
Terminal 2
. /home/user/.nix-profile/etc/profile.d/nix.sh
~/plutus-apps$ nix-shell
```


Tiếp theo, chúng tôi đi đến thư mục plutus-playground-client và chạy:

```haskell
Terminal 2
cd ~/plutus-apps/plutus-playground-clien
[nix-shell:~/plutus-apps/plutus-playground-client]$ npm run start
```

Nếu thành công, bạn sẽ thấy đầu ra:

```haskell
Terminal 2
[wdm]: Compiled successfully.

or

[wdm]: Compiled with warnings.
```

Giữ cả hai Terminal mở và giờ đây chúng ta có thể truy cập Plutus Playground từ trình duyệt.

Mở trình duyệt và truy cập địa chỉ:

```haskell
https://localhost:8009
```

Bạn sẽ nhận được một cảnh báo phàn nàn về việc đây là một trang web nguy hiểm, dù sao hãy bỏ qua thông báo để nhấp qua.

Giờ đây, bạn có thể biên dịch và chạy thành công hợp đồng quà tặng bằng cách sao chép/dán nó vào Plutus Playground và sử dụng hai nút ở góc trên cùng bên phải: “Biên dịch” và “Mô phỏng”

Thiết lập ví của chúng ta sẽ giống như sau:


![Screenshot 2022-02-18 9 49 58 AM](https://user-images.githubusercontent.com/59018247/154706878-d148e873-28d3-44a0-b7f6-91002212f047.png)

<br/>
Genesis Slot 0 looks like:<br/>

![Screenshot 2022-02-17 4 11 38 PM](https://user-images.githubusercontent.com/59018247/154707925-7b82fbb3-5782-4d4a-90d3-524f676d3625.png)

<br/>
Slot 1, TX 0:<br/>

![Screenshot 2022-02-17 4 12 07 PM](https://user-images.githubusercontent.com/59018247/154707978-fe5c81d6-bbbc-4f02-a15a-e50d4e17a6dc.png)
 
<br/>
Slot 1, TX 1:<br/>

![Screenshot 2022-02-17 4 12 37 PM](https://user-images.githubusercontent.com/59018247/154708031-bd31ad20-1a0b-42ea-adde-0d9fdc2cc85b.png)

<br/>
Slot 2, TX 0:<br/>

![Screenshot 2022-02-17 4 13 01 PM](https://user-images.githubusercontent.com/59018247/154708054-94460dac-1b76-4b70-882f-a80be6200564.png)

<br/>
Final Balances:<br/>

![Screenshot 2022-02-17 4 14 07 PM](https://user-images.githubusercontent.com/59018247/154708099-31f7a939-0b37-4883-b1cc-eed6965d3ca1.png)

### Bây giờ chúng ta xem tệp **Burn.hs** nơi mkValidator trông giống như:

```haskell
mkValidator :: BuiltinData -> BuiltinData -> BuiltinData -> ()
mkValidator _ _ _ = traceError "BURNT!"
```

Tải tệp và kiểm tra lỗi:

```haskell
Prelude PlutusTx week02.Gift > :l src/Week02/Burn.hs

Output:
Ok, one module loaded.
```

Giờ đây, bạn có thể biên dịch và chạy thành công hợp đồng ghi đĩa bằng cách sao chép/dán nó vào Plutus Playground và sử dụng hai nút ở góc trên cùng bên phải: “Biên dịch” và “Mô phỏng”:

Đánh giá các ví có cấu hình tương tự gift.hs:

![Screenshot 2022-02-18 9 49 58 AM](https://user-images.githubusercontent.com/59018247/154706878-d148e873-28d3-44a0-b7f6-91002212f047.png)

<br/>
Genesis Slot 0 looks like:<br/>

![Screenshot 2022-02-17 4 30 58 PM](https://user-images.githubusercontent.com/59018247/154708702-432431b5-68d3-47f5-b206-077d3cc267e2.png)

<br/>
Slot 1, TX 0:<br/>

![Screenshot 2022-02-17 4 31 46 PM](https://user-images.githubusercontent.com/59018247/154708737-0d4e40bd-eeff-4f59-827d-1921e1c67f5e.png)

<br/>
Slot 1, TX 1:<br/>

![Screenshot 2022-02-17 4 32 16 PM](https://user-images.githubusercontent.com/59018247/154708796-637a153f-4d6f-4e9b-95e5-52c3bd6315ff.png)

<br/>
Final Balances:<br/>

![Screenshot 2022-02-17 4 32 43 PM](https://user-images.githubusercontent.com/59018247/154708834-0bfad52f-5ad9-4d6f-a43f-554c0c397287.png)
<br/><br/>
As expected, the grab did not work. No transactions can ever use those outputs as inputs.

```haskell
Contract instance stopped with error: "WalletError (ValidationError (ScriptFailure (EvaluationError [\"BURNT!\"] \"CekEvaluationFailure\")))" ]
```
<br/><br/>


## High Level Typed Validation Scripts


Bây giờ chúng ta sẽ xem xét một số ví dụ về các tập lệnh xác thực được nhập ở mức độ cao. Chúng ta có thể bắt đầu bằng cách xem Typed.hs:

```haskell
Prelude PlutusTx week02.Burn > :l src/Week02/Typed.hs

Output:
Ok, one module loaded.
```


Hàm mkValidator bên trong Typed.hs có dạng:

```haskell
mkValidator :: () -> Integer -> ScriptContext -> Bool
mkValidator _ r _ = traceIfFalse "wrong redeemer" $ r == 42
```
Redeemer này sẽ kiểm tra xem số nguyên có phải là 42 hay không, nếu không, nó sẽ trả về giá trị False, xuất ra “Redeemer False”.
Sau đó, chúng tôi đã sửa đổi chức năng biên dịch:

```haskell
data Typed
instance Scripts.ValidatorTypes Typed where
   type instance DatumType Typed = ()
   type instance RedeemerType Typed = Integer

typedValidator :: Scripts.TypedValidator Typed
typedValidator = Scripts.mkTypedValidator @Typed
   $$(PlutusTx.compile [|| mkValidator ||])
   $$(PlutusTx.compile [|| wrap ||])
 where
   wrap = Scripts.wrapValidator @() @Integer
```

Đầu tiên chúng ta khai báo DatumType là kiểu unit() và RedeemerType là một Integer. Sau đó, chúng tôi thêm chức năng bọc để có thể dịch các loại mạnh từ phiên bản cấp thấp. Sau đó, nó được khai báo ở vị trí, rằng mốc thời gian và người mua lại lần lượt là loại () và Số nguyên.

Bây giờ chúng ta có thể xem một ví dụ thực tế trong Plutus Playground. Trước tiên, hãy kiểm tra để đảm bảo không có lỗi trong tệp isData.hs.

```haskell
Prelude PlutusTx week02.Typed > :l src/Week02/isData.hs

Output:
Ok, one module loaded.
```

**Nhìn vào mã xác thực trên chuỗi: on-chain**

```haskell
{-# INLINABLE mkValidator #-}
mkValidator :: () -> MySillyRedeemer -> ScriptContext -> Bool
mkValidator _ (MySillyRedeemer r) _ = traceIfFalse "wrong redeemer" $ r == 42

data Typed
instance Scripts.ValidatorTypes Typed where
   type instance DatumType Typed = ()
   type instance RedeemerType Typed = MySillyRedeemer

typedValidator :: Scripts.TypedValidator Typed
typedValidator = Scripts.mkTypedValidator @Typed
   $$(PlutusTx.compile [|| mkValidator ||])
   $$(PlutusTx.compile [|| wrap ||])
 where
   wrap = Scripts.wrapValidator @() @MySillyRedeemer

validator :: Validator
validator = Scripts.validatorScript typedValidator

valHash :: Ledger.ValidatorHash
valHash = Scripts.validatorHash typedValidator

scrAddress :: Ledger.Address
scrAddress = scriptAddress validator
```

Giờ đây, bạn có thể biên dịch và chạy thành công hợp đồng isData bằng cách sao chép/dán nó vào Plutus Playground và sử dụng hai nút ở góc trên cùng bên phải: “Biên dịch” và “Mô phỏng”:

Trường hợp thử nghiệm đầu tiên của chúng tôi sẽ sử dụng giá trị lấy là 100. Điều này có thể sẽ thất bại và tiền sẽ không được chuyển.


![Screenshot 2022-02-17 4 49 26 PM](https://user-images.githubusercontent.com/59018247/154709233-12d4b818-b489-436f-98fa-7a6fe119f632.png)

<br/>
Results:<br/>

![Screenshot 2022-02-17 4 51 26 PM](https://user-images.githubusercontent.com/59018247/154709551-cec0e32e-5dcb-4b2b-bc32-2b477933c3a1.png)

Đúng như dự đoán, vụ chộp lấy đã không xảy ra.

Trường hợp thử nghiệm thứ hai của chúng tôi sẽ sử dụng giá trị là 42. Điều này sẽ vượt qua xác thực.

![Screenshot 2022-02-17 4 54 54 PM](https://user-images.githubusercontent.com/59018247/154709587-76539d7b-afdc-4430-867a-da76df4f6107.png)

<br/>
Results:<br/>

![Screenshot 2022-02-17 4 56 22 PM](https://user-images.githubusercontent.com/59018247/154709620-3f99f922-36d7-4a33-abf3-73812d9cf279.png)

Đúng như dự đoán, việc lấy đã thành công và tiền đã được chuyển..

## Homework Part 1

```haskell
-- This should validate if and only if the two Booleans in the redeemer are equal!

mkValidator :: () -> (Bool, Bool) -> ScriptContext -> Bool
mkValidator _ _ _ = True -- FIX ME!
```

Mục tiêu của bài tập về nhà phần 1 là vượt qua mkValidator chỉ khi hai phép toán luận trong trình chuộc bằng nhau. Trước tiên, chúng ta cần chuyển các tham số chính xác vào mkValidator. Nó chấp nhận một loại đơn vị (), theo sau là hai boolean mà chúng ta có thể gọi là b và c tương ứng.

```haskell
mkValidator :: () -> (Bool, Bool) -> ScriptContext -> Bool
mkValidator () (b, c) _ = traceIfFalse "wrong redeemer" $ b == c
```

Tiếp theo, chúng tôi kiểm tra xem b và c có giá trị bằng nhau không; nếu không thì ném thông báo "wrong Redeemer". Sau đó, chúng ta cần khai báo các kiểu dữ liệu cho cả tham số đơn vị và boolean.

```haskell
data Typed
instance Scripts.ValidatorTypes Typed where
   type instance DatumType Typed = ()
   type instance RedeemerType Typed = (Bool, Bool)
```

Tiếp theo, chúng tôi viết mã biên dịch cho tập lệnh xác thực cấp cao, gói gọn cả loại đơn vị và giá trị boolean.

```haskell
typedValidator :: Scripts.TypedValidator Typed
typedValidator = Scripts.mkTypedValidator @Typed
   $$(PlutusTx.compile [|| mkValidator ||])
   $$(PlutusTx.compile [|| wrap ||])
 where
   wrap = Scripts.wrapValidator @() @(Bool, Bool)
```


Cuối cùng, chúng tôi viết mã cho validator, valHash, and srcAddress.

```haskell
validator :: Validator
validator = Scripts.validatorScript typedValidator

valHash :: Ledger.ValidatorHash
valHash = Scripts.validatorHash typedValidator

scrAddress :: Ledger.Address
scrAddress = scriptAddress validator
```

Mã trên chuỗi cuối cùng sẽ giống như:

```haskell
{-# INLINABLE mkValidator #-}
-- This should validate if and only if the two Booleans in the redeemer are equal!
mkValidator :: () -> (Bool, Bool) -> ScriptContext -> Bool
mkValidator () (b, c) _ = traceIfFalse "wrong redeemer" $ b == c

data Typed
instance Scripts.ValidatorTypes Typed where
   type instance DatumType Typed = ()
   type instance RedeemerType Typed = (Bool, Bool)

typedValidator :: Scripts.TypedValidator Typed
typedValidator = Scripts.mkTypedValidator @Typed
   $$(PlutusTx.compile [|| mkValidator ||])
   $$(PlutusTx.compile [|| wrap ||])
 where
   wrap = Scripts.wrapValidator @() @(Bool, Bool)

validator :: Validator
validator = Scripts.validatorScript typedValidator

valHash :: Ledger.ValidatorHash
valHash = Scripts.validatorHash typedValidator

scrAddress :: Ledger.Address
scrAddress = scriptAddress validator
```

Kiểm tra mã trong Plutus Playground:

![Screenshot 2022-02-17 5 16 23 PM](https://user-images.githubusercontent.com/59018247/154709818-073df3c1-5fbc-4d22-9295-dccd7a95bc0d.png)

<br/>
Results:<br/>

![Screenshot 2022-02-17 5 17 58 PM](https://user-images.githubusercontent.com/59018247/154710014-dbbdda57-53f7-4599-ac2d-9c2ef5522f79.png)


Như mong đợi, quá trình xác thực được thông qua khi cả hai phép toán luận đều có giá trị bằng nhau.

## Homework Part 2


Mục tiêu của bài tập về nhà phần 2 giống với mục tiêu của phần, ngoại trừ việc sử dụng các loại dữ liệu tùy chỉnh cho redeemer:

```haskell
data MyRedeemer = MyRedeemer
   { flag1 :: Bool
   , flag2 :: Bool
   } deriving (Generic, FromJSON, ToJSON, ToSchema)
```

Logic giống nhau, ngoại trừ bây giờ chúng ta sẽ sử dụng MyRedeemer để chuyển cả hai cờ dưới dạng booleans.

```haskell
mkValidator :: () -> MyRedeemer -> ScriptContext -> Bool
mkValidator () (MyRedeemer b c) _ = traceIfFalse "wrong redeemer" $ b == c
```

Chúng tôi thay đổi mã và thay đổi dữ liệu đã nhập từ boolean thành MyRedeemer:

```haskell
data Typed
instance Scripts.ValidatorTypes Typed where
   type instance DatumType Typed = ()
   type instance RedeemerType Typed = MyRedeemer
```

Thay đổi tương tự bên trong trình bao bọc biên dịch:

```haskell
typedValidator :: Scripts.TypedValidator Typed
typedValidator = Scripts.mkTypedValidator @Typed
   $$(PlutusTx.compile [|| mkValidator ||])
   $$(PlutusTx.compile [|| wrap ||])
 where
   wrap = Scripts.wrapValidator @() @MyRedeemer
```

Mã trên chuỗi cuối cùng sẽ giống như:

```haskell
data MyRedeemer = MyRedeemer
   { flag1 :: Bool
   , flag2 :: Bool
   } deriving (Generic, FromJSON, ToJSON, ToSchema)

PlutusTx.unstableMakeIsData ''MyRedeemer

{-# INLINABLE mkValidator #-}
-- This should validate if and only if the two Booleans in the redeemer are equal!
mkValidator :: () -> MyRedeemer -> ScriptContext -> Bool
mkValidator () (MyRedeemer b c) _ = traceIfFalse "wrong redeemer" $ b == c

data Typed
instance Scripts.ValidatorTypes Typed where
   type instance DatumType Typed = ()
   type instance RedeemerType Typed = MyRedeemer

typedValidator :: Scripts.TypedValidator Typed
typedValidator = Scripts.mkTypedValidator @Typed
   $$(PlutusTx.compile [|| mkValidator ||])
   $$(PlutusTx.compile [|| wrap ||])
 where
   wrap = Scripts.wrapValidator @() @MyRedeemer

validator :: Validator
validator = Scripts.validatorScript typedValidator

valHash :: Ledger.ValidatorHash
valHash = Scripts.validatorHash typedValidator

scrAddress :: Ledger.Address
scrAddress = scriptAddress validator
```
Kiểm tra mã trong Plutus Playground:

![Screenshot 2022-02-17 5 34 57 PM](https://user-images.githubusercontent.com/59018247/154710339-65c5d8d1-cc63-4f59-bce7-963b9034ef8b.png)

<br/>
Results:<br/>

![Screenshot 2022-02-17 5 37 22 PM](https://user-images.githubusercontent.com/59018247/154710370-40c74548-2d13-48f5-9417-68265cb9d98d.png)

Như mong đợi, quá trình xác thực được thông qua khi cả hai phép toán luận đều có giá trị bằng nhau
