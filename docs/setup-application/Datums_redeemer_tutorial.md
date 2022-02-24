Tham số Datums và Redeemers
==============================

Hướng dẫn này giải thích các khái niệm về dữ liệu Plutus và bộ định nghĩa lại, đồng thời phác thảo cách làm việc với các phần tử này khi gửi giao dịch.

**datum** là một phần thông tin có thể được liên kết với UTXO và được sử dụng để mang thông tin trạng thái tập lệnh như chủ sở hữu của nó hoặc chi tiết thời gian (xác định thời điểm UTXO có thể được sử dụng). Nó thường được sử dụng kết hợp với **Redeemer** - thông tin tùy ý được bao gồm trong giao dịch để cung cấp đầu vào cho tập lệnh.

## Xác thực giao dịch hai giai đoạn

Đầu vào là đầu ra chưa sử dụng từ các giao dịch trước đó. Băm dữ liệu và một giá trị (bao gồm số lượng ada và số lượng mã thông báo gốc bổ sung, tùy chọn) được lưu trữ trong UTXO tại một địa chỉ (khóa công khai hoặc mã băm khóa công khai). Khi một UTXO tại địa chỉ tập lệnh là đầu vào cho một giao dịch hợp lệ, tập lệnh sẽ xác định xem có 'mở khóa' tiền hay không. Điều này có thể được thực thi trong các điều kiện cụ thể do tập lệnh xác định (sự kết hợp tùy ý của các yếu tố bao gồm dữ liệu, công cụ đổi quà và ngữ cảnh tập lệnh). Trong giai đoạn xác thực đầu tiên, một giao dịch phải được ký bởi chủ sở hữu khóa cá nhân tương ứng với địa chỉ.

Có một số khái niệm mà chúng ta cần tìm hiểu trước khi hiểu giao dịch redeemer:

1. Script address — địa chỉ Cardano lưu trữ tiền được bảo vệ bởi tập lệnh Plutus có thể được mở khóa. Nó là một hàm băm của Plutus script.
2. Datum hash — Trong Cardano, mã băm `datum` cần được đính kèm với một UTXO tại một địa chỉ tập lệnh. Điều này được thực hiện để giảm yêu cầu bộ nhớ và cho phép truy cập nhanh chóng trong khi xác thực các giao dịch.
3. Plutus script — chương trình thực thi được sử dụng trong sổ cái để thực hiện xác nhận giao dịch bổ sung (giai đoạn hai).
4. Datum value — khi gửi giao dịch để đổi tiền, chúng tôi cần gửi *datum value* khớp với *datum hash* được gửi trong giao dịch khóa. 
5. Redeemer value — sử dụng cùng một định dạng dữ liệu tùy ý như là `datum`. `Redeemer value` được gắn với  đầu vào giao dịch để mở khóa tiền từ một tập lệnh và được tập lệnh sử dụng để xác thực giao dịch.
6. Script context — bản tóm tắt giao dịch, cũng cần thiết trong tập lệnh Plutus để xác thực giao dịch.

Quá trình làm việc với các `Datum` và `Redeemer` như sau: 
Giả sử Alice có UTXO với 100 ADA:

![Alice ada](Alice-ada.png)

Và cô ấy muốn khóa 20 ADA vào tập lệnh "datum-Redeer". Cô ấy có thể làm điều đó bằng cách gửi một giao dịch đính kèm một dữ liệu tùy ý (tức là số 42) vào UTXO mới:

![Alice ada 2](Alice-ada-2.png)

Cuối cùng, ai đó có thể chi 20 adas với một giao dịch mới, lần này redeemer phải được chỉ định.

![Alice ada 3](Alice-ada-3.png)

## Hello world

Ví dụ đơn giản nhất về việc làm việc với datums và redemers là:

1. Khóa UTXO trong một địa chỉ tập lệnh bằng cách đính kèm một băm datum vào nó
2. Sau đó, mở khóa các khoản tiền bằng redeemer tương ứng với datum. 

Điều này được thể hiện trong hợp đồng sau:

```
helloWorld :: Data -> Data -> Data -> ()
helloWorld datum redeemer context = if datum P.== redeemer
                                      then ()
                                      else (P.error ())
```

Hàm trên nhận được ba đối số: *datum*, *redeemer*, and *script context* . Tuy nhiên, chúng tôi chỉ sử dụng datum và redeemer.

## Điều kiện tiên quyết

Tập lệnh Plutus cần được xây dựng với GHC 8.10.4. Một cách để cài đặt phiên bản cụ thể này là sử dụng [ghcup](https://gitlab.haskell.org/haskell/ghcup-hs). Một cách khác là sử dụng Nix.

### Biên dịch hợp đồng

Tong hướng dẫn này, chúng tôi sẽ sửa đổi một trong những ví dụ về[ kho lưu trữ testnet của Alonzo](https://github.com/input-output-hk/Alonzo-testnet). 
Xem các bước sau:

1. Sao chép [Alonzo testnet repository](https://github.com/input-output-hk/Alonzo-testnet).
2. Đi tới thư mục `Alonzo-testnet/resources/plutus-sources/plutus-helloworld` .
3. Trong tệp `src/cardano/PlutusExample/HelloWorld.hs` Thay đổi dòng
`helloWorld datum redeemer context = if datum P.== hello then () else (P.error ())`
thành dòng:
`helloWorld datum redeemer context = if datum P.== redeemer then () else (P.error ())`.
4. Biên dịch mã lệnh `cabal run plutus-helloworld -- 42 datum-redeemer.plutus`.
5. Kết quả là một tệp có tên`datum-redeemer.plutus`. 


## Tạo địa chỉ tập lệnh

Bây giờ chúng ta đã biên dịch hợp đồng, chúng ta cần tạo địa chỉ tập lệnh. Đối với điều này, hãy sử dụng lệnh cardano-cli sau:

```
cardano-cli address build --payment-script-file datum-redeemer.plutus --testnet-magic 8 --out-file datum-redeemer.addr
```

## Truy vấn địa chỉ tập lệnh

Bây giờ chúng ta đã có địa chỉ tập lệnh, chúng ta có thể xem và truy vấn địa chỉ đó bằng các lệnh sau:

```
cat datum-redeemer.addr 
addr_test1wrj2yjcjnpl37fnv74lcwgtc5meefznj490gp2kkuquwt0c84ezsu

```

```
cardano-cli query utxo --address $(cat datum-redeemer.addr) --testnet-magic 8
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
```

## Tính toán băm datum 

Để gửi một giao dịch đến mạng, chúng ta cần băm `datum` . Đây là hàm băm của datum tùy ý. Trong ví dụ này, chúng tôi sử dụng `42` làm dữ liệu. Để tính toán hàm băm `42`, chúng tôi sử dụng lệnh sau:

```
cardano-cli transaction hash-script-data --script-data-value 42
9e1199a988ba72ffd6e9c269cadb3b53b5f360ff99f112d9b2ee30c4d74ad88b
``` 

## Truy vấn UTXO  cá nhân

Đầu tiên, chúng ta cần truy vấn địa chỉ sẽ gửi tiền đến địa chỉ tập lệnh. Trong ví dụ này, chúng tôi có địa chỉ trong tệp `payment.addr`:

```
cardano-cli query utxo --address $(cat payment.addr) --testnet-magic 8
```
```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
cd4a34a97e8845631c57ec21fed3901e4a4f244e0673eb9e5d478437ec3e9bf4     1        1000000 lovelace + TxOutDatumHashNone
d26ccb16e17b7db97b9578c5f787baaeb63e36dc78134e926bdaeb58a512018d     0        999664124755 lovelace + TxOutDatumHashNone
d26ccb16e17b7db97b9578c5f787baaeb63e36dc78134e926bdaeb58a512018d     1        100000000 lovelace + TxOutDatumHashNone


```

Chúng tôi sử dụng UTXO chứa 100 ada (d26ccb16e17b7db97b9578c5f787baaeb63e36dc78134e926bdaeb58a512018d#1), và sử dụng lệnh xây dựng, phí sẽ được tính tự động.

## Tải file thông số giao thức 

Trước khi gửi giao dịch đầu tiên, chúng tôi cần tải xuống tệp có chứa các tham số của giao thức, chúng tôi thực hiện điều đó bằng lệnh sau:

```
cardano-cli query protocol-parameters --out-file protocol.json --testnet-magic 8
```

## Khóa ADA


Để khóa một UTXO được bảo vệ bởi tập lệnh Plutus, chúng tôi cần gửi một giao dịch đến mạng Cardano với một băm datum đính kèm. Để làm điều đó, trước tiên chúng ta cần xây dựng giao dịch:

```
cardano-cli transaction build \
--alonzo-era \
--tx-in 
d26ccb16e17b7db97b9578c5f787baaeb63e36dc78134e926bdaeb58a512018d#1 \
--tx-out $(cat datum-redeemer.addr)+20000000 \
--tx-out-datum-hash 9e1199a988ba72ffd6e9c269cadb3b53b5f360ff99f112d9b2ee30c4d74ad88b \
--change-address $(cat payment.addr) \
--protocol-params-file protocol.json \
--out-file tx.raw \
--testnet-magic 8
```

Vì đây là một giao dịch thời Alonzo, chúng tôi cần chỉ định cờ `--alonzo-era`.

**Ordering of some CLI options matters**. Khi khóa một UTXO bằng tập lệnh Plutus, chúng ta phải cung cấp `--tx-out-datum-hash` **ngay sau** `--tx-out` được cấp cho địa chỉ tập lệnh. UTXO tại địa chỉ tập lệnh không có mã băm dữ liệu đính kèm sẽ bị khóa vĩnh viễn!

Bạn có thể tìm thấy các bước về cách tạo giao dịch trên mạng thời đại Alonzo trong giao dịch Plutus sử dụng cardano-cli.



## Truy vấn địa chỉ tập lệnh

UTXO tại địa chỉ tập lệnh này bây giờ phải có 8 ada và mã băm dữ liệu được đính kèm. Để truy vấn nó, hãy chạy:

```
cardano-cli query utxo --address $(cat datum-redeemer.addr) --testnet-magic 8
```

Kết quả

```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
49ac2bf6a40df00d071b649d1e5b5d3531ddb2bfe6c619f9506cacb557bcb8b6     1        20000000 lovelace + TxOutDatumHash ScriptDataInAlonzoEra "9e1199a988ba72ffd6e9c269cadb3b53b5f360ff99f112d9b2ee30c4d74ad88b"

```

## Khi Redeemer sai

Chúng tôi sẽ kiểm tra hợp đồng bằng cách gửi nhầm `Redeemer`. Hãy nhớ hợp đồng:

```
helloWorld :: Data -> Data -> Data -> ()
helloWorld datum redeemer context = if datum P.== redeemer
                                      then ()
                                      else (P.error ())
```

Hợp đồng này thành công khi `datum` bằng với `Redeemer`. Chúng tôi vừa khóa tiền bằng cách sử dụng hàm băm `datum` cho giá trị của 42. Ví dụ: bây giờ chúng tôi sẽ sử dụng một giá trị khác của `Redeemer` là 43.

Để làm điều đó, chúng tôi cần gửi một giao dịch cố gắng mở khóa tiền từ địa chỉ tập lệnh. Chúng tôi cần UTXO từ địa chỉ tập lệnh:

```
cardano-cli query utxo --address $(cat datum-redeemer.addr) --testnet-magic 8
```

Kết quả:
```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
49ac2bf6a40df00d071b649d1e5b5d3531ddb2bfe6c619f9506cacb557bcb8b6     1        20000000 lovelace + TxOutDatumHash ScriptDataInAlonzoEra "9e1199a988ba72ffd6e9c269cadb3b53b5f360ff99f112d9b2ee30c4d74ad88b"
```

```

cardano-cli query utxo --address $(cat payment.addr) --testnet-magic 8
```


```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
49ac2bf6a40df00d071b649d1e5b5d3531ddb2bfe6c619f9506cacb557bcb8b6     0        79831551 lovelace + TxOutDatumHashNone
cd4a34a97e8845631c57ec21fed3901e4a4f244e0673eb9e5d478437ec3e9bf4     1        1000000 lovelace + TxOutDatumHashNone
d26ccb16e17b7db97b9578c5f787baaeb63e36dc78134e926bdaeb58a512018d     0        999664124755 lovelace + TxOutDatumHashNone


```

Chúng tôi cũng cần một UTXO để được sử dụng làm tài sản thế chấp và để trang trải các khoản phí.

> **Về tài sản thế chấp:** Tài sản thế chấp đã được giới thiệu trong các giao dịch Alonzo để trang trải chi phí của việc nút xác thực thực hiện một tập lệnh không thành công. Trong trường hợp này, UTXO đã cung cấp được sử dụng thay vì phí. Tốt nhất là cung cấp một UTXO với mức tối thiểu có thể để đáp ứng số tiền thế chấp. Xin lưu ý, số tiền ký quỹ có khả năng cao hơn phí giao dịch. UTXO được cung cấp cho tài sản thế chấp chỉ được có ada, không có tài sản gốc nào khác.

Chúng tôi sẽ xây dựng giao dịch bằng cách sử dụng lệnh xây dựng để xem điều gì sẽ xảy ra. Trong ví dụ này, chúng tôi sử dụng UTXO chứa 1 ada cho tài sản thế chấp:

```
cardano-cli transaction build \
--alonzo-era \
--tx-in 49ac2bf6a40df00d071b649d1e5b5d3531ddb2bfe6c619f9506cacb557bcb8b6#1 \
--tx-in-script-file datum-redeemer.plutus \
--tx-in-datum-value 42 \
--tx-in-redeemer-value 43 \
--tx-in-collateral cd4a34a97e8845631c57ec21fed3901e4a4f244e0673eb9e5d478437ec3e9bf4#1 \
--change-address $(cat payment.addr) \
--protocol-params-file protocol.json \
--out-file tx.raw \
--testnet-magic 8
```
Kết quả:
```
Command failed: transaction build  Error: The following scripts have execution failures:
the script for transaction input 0 (in the order of the TxIds) failed with The Plutus script evaluation failed: An error has occurred:  User error:
The provided Plutus code called 'error'.

```

Bây giờ chúng ta có thể thấy rằng chúng ta thậm chí không thể tạo một giao dịch sai. Trước tiên, bản dựng lệnh sẽ thử giao dịch mới để xem liệu nó có được xác thực trước khi được gửi hay không.

### Mở khóa UTxO 

UTXO vẫn bị khóa, vì vậy bây giờ chúng tôi sẽ mở khóa nó. Như mọi khi, chúng tôi làm điều đó bằng cách gửi một giao dịch. Trong giao dịch này, chúng tôi sử dụng UTXO tại địa chỉ tập lệnh làm đầu vào . Bạn có thể thực hiện một giao dịch không có trong địa chỉ của mình (mà là trong một địa chỉ tập lệnh) vì với điều kiện tập lệnh thỏa mãn tất cả các điều kiện của nó, UTXO mà nó bảo vệ sẽ được mở khóa. Trong các địa chỉ thông thường, chúng tôi sử dụng khóa riêng của mình để mở khóa quỹ và trong các địa chỉ tập lệnh, chúng tôi đáp ứng logic tập lệnh để mở khóa quỹ. Đối với tập lệnh này, người đổi là chìa khóa để mở khóa tiền của chúng tôi. Và để làm điều đó, chúng tôi xây dựng một giao dịch như sau:


```
cardano-cli transaction build \
--alonzo-era \
--tx-in 49ac2bf6a40df00d071b649d1e5b5d3531ddb2bfe6c619f9506cacb557bcb8b6#1 \
--tx-in-script-file datum-redeemer.plutus \
--tx-in-datum-value 42 \
--tx-in-redeemer-value 42 \
--tx-in-collateral cd4a34a97e8845631c57ec21fed3901e4a4f244e0673eb9e5d478437ec3e9bf4#1 \
--change-address $(cat payment.addr) \
--protocol-params-file protocol.json \
--out-file tx.raw \
--testnet-magic 8
```

Trong trường hợp này, chúng tôi đã có thể xây dựng giao dịch, vì nó có các giá trị phù hợp. Bây giờ chúng ta có thể ký và gửi giao dịch này.

Sign:
```
cardano-cli transaction sign --tx-body-file tx.raw --signing-key-file payment.skey --testnet-magic 8 --out-file tx.sign
```

Submit:

```
cardano-cli transaction submit --testnet-magic 8 --tx-file tx.sign
```
Kết quả:
```
Transaction successfully submitted.
```

## Truy vấn cả địa chỉ thanh toán và địa chỉ tập lệnh

Chúng tôi có thể truy vấn các địa chỉ để đảm bảo rằng chúng tôi đã mở khóa tiền. Hiện không có UTXO nào tại địa chỉ tập lệnh và đã nhận được một UTXO mới với 8 ada.:

Truy vấn địa chỉ tập lệnh:
```
cardano-cli query utxo --address $(cat datum-redeemer.addr) --testnet-magic 8
```

Kết quả truy vấn đại chỉ tập lệnh:

```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
```
Truy vấn địa chỉ thanh toán:
```
cardano-cli query utxo --address $(cat payment.addr) --testnet-magic 8
```

Kết quả truy vấn địa chỉ thanh toán:

```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
30ccc513f63452602adf43140e5749a11c6ad14f592acda37bf9683e427971c4     0        19788721 lovelace + TxOutDatumHashNone
49ac2bf6a40df00d071b649d1e5b5d3531ddb2bfe6c619f9506cacb557bcb8b6     0        79831551 lovelace + TxOutDatumHashNone
cd4a34a97e8845631c57ec21fed3901e4a4f244e0673eb9e5d478437ec3e9bf4     1        1000000 lovelace + TxOutDatumHashNone
d26ccb16e17b7db97b9578c5f787baaeb63e36dc78134e926bdaeb58a512018d     0        999664124755 lovelace + TxOutDatumHashNone

```

**Nguyên tắc định dạng JSON**

Hãy xem xét các nguyên tắc sau cho các định dạng JSON:

+ JSON được truyền cho `--script-data-value` không thể mã hóa các dạng phương thức khởi tạo nhất định.
+ Giá trị củ `-tx-in-datum-value` và `--tx-in-redeemer-value` được cho cùng giá trị của `{"constructor":0,"fields":[{"int":42}]}`
+ Hãy lưu ý về hàm băm dữ liệu khóa tiền

**Hỗ trợ CLI**

|TCLI hỗ trợ hai lược đồ cho dữ liệu đầu vào: "chính xác" và "bình thường". Các `--script-data-file` sử dụng phong cách chính xác. Ví dụ như `{"constructor":0,"fields":[{"int":42}]}`, Các  `--script-data-value`sử dụng phong cách bình thường, ví dụ:  `42` thay vì `{"int": 42}`.

Kiểu lược đồ chính xác yêu cầu lược đồ cụ thể. Kiểu schemaless không thể mã hóa các hàm tạo.

Nó từ chối các số dấu phẩy động (chỉ chấp nhận các số nguyên (-2 ^ 64-1) .. 2 ^ 64-1) và từ chối các chuỗi dài trên 64 byte.

Chúng là các đối tượng JSON khác nhau và do đó khi cả hai đều được diễn giải theo kiểu schemaless, chúng tương ứng với các Datagiá trị khác nhau. Một là **number** , kia là một đối tượng có một trường chứa một số.

Theo cách tiếp cận dựa trên giản đồ, `42` không hợp lệ (không phù hợp với lược đồ) và `{"int":42}` sẽ hợp lệ và tương ứng với một `Data` giá trị bao gồm một số nguyên duy nhất.
