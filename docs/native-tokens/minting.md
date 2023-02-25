---
id: minting
title: Minting Native Assets
sidebar_label: Minting Native Assets
description: How to mint native tokens on Cardano. 
#image: ./img/og-developer-portal.png
--- 

Trong phần này, chúng tôi sẽ khai thác tài sản gốc --**chứ không phải NFT**

Chúng tôi đặc biệt khuyên bạn nên tham khảo phần này để hiểu cách hoạt động của giao dịch và đúc tiền.
Minting NFTs sẽ tuân theo quy trình tương tự, chỉ với một vài chỉnh sửa. Nếu bạn quan tâm NFT, vui lòng truy cập 
[Minting NFTs](mint-nfts).

<iframe width="100%" height="325" src="https://www.youtube.com/embed/IeB-QgRk95A" title="Hướng dẫn tạo token trên Cardano bằng câu lệnh" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

## Yêu cầu
1. Một nút Cardano đang chạy và được đồng bộ hóa - có thể truy cập thông qua lệnh `cardano-cli`. Hướng dẫn này được viết bằng `cardano-cli` v 1.27.0. Một số lệnh có thể thay đổi.
2. Bạn có một số kiến thức về Linux về cách điều hướng giữa các thư mục, tạo và chỉnh sửa tệp cũng như thiết lập và kiểm tra các biến thông qua Linux shell.


## Tổng quan
Hướng dẫn này sẽ cung cấp cho bạn một bản sao và hướng dẫn có thể dán qua vòng đời hoàn chỉnh của mã thông báo:

![image](https://user-images.githubusercontent.com/34856010/162867266-a61dfbe8-f0cb-4c97-9c1a-7ef71d818e23.png)

Đây sẽ là những bước chúng ta cần thực hiện để hoàn thành toàn bộ vòng đời:

1. Thiết lập mọi thứ sẵn sàng
2. Tạo địa chỉ và khóa (keys) mới
3. Tạo chính sách đúc tiền
4. Soạn thảo một giao dịch đúc tiền
5. Tính phí
6. Gửi mã thông báo giao dịch và đúc token (cho chính chúng tôi)
7. Gửi token đến ví Daedalus
8. Đốt token


### Cấu trúc thư mục
Chúng ta sẽ làm việc trong một thư mục mới, Đây là tổng quan về các file sẽ được tạo ra:

```
├── burning.raw                    # Giao dich để đốt token
├── burning.signed                 # File ký giao dịch đã được ký để đốt token
├── matx.raw                       # Giao dịch tạo token
├── matx.signed                    # File ký giao dịch tạo token
├── metadata.json                  # Metadata mô tả đặc tính NFT
├── payment.addr                   # Địa chỉ để gửi và nhận
├── payment.skey                   # Khóa ký giao dịch
├── payment.vkey                   # Khóa xác nhận giao dịch
├── policy                         # Thư mục chứa chính sách
│   ├── policy.script              # Script tạo  policyID
│   ├── policy.skey                # Khóa ký Policy
│   ├── policy.vkey                # Khóa xác nhận Policy 
│   └── policyID                   # File chứa policy ID
└── protocol.json                  # File thông số hệ thống
```

### Kiến trúc mã thông báo
Trước khi khai thác nội dung gốc, bạn cần tự hỏi bản thân ít nhất bốn câu hỏi sau:
1. Tên của (các) mã thông báo tùy chỉnh của tôi sẽ là gì?
2. Tôi muốn đúc bao nhiêu?
3. Sẽ có giới hạn thời gian cho việc tương tác (đúc hoặc ghi mã thông báo?)
4. Ai sẽ có thể đúc chúng?

Số 1, 3 và 4 sẽ được xác định trong cái gọi là kịch bản chính sách tiền tệ, trong khi số tiền thực tế sẽ chỉ được xác định trên giao dịch đúc tiền.

Đối với hướng dẫn này, chúng tôi sẽ sử dụng:

1. Tên của (các) mã thông báo tùy chỉnh của tôi sẽ là gì?
--> Chúng tôi sẽ đặt tên là `Testtoken` và `SecondTesttoken`
2. Tôi muốn đúc bao nhiêu?
--> 10000000 each (10M `Testtoken` and 10M `SecondTesttoken`)
3. Sẽ có giới hạn thời gian cho việc tương tác (đúc hoặc đốt mã thông báo?)
---> Không (tuy nhiên, chúng tôi sẽ làm khi tạo NFT), chúng tôi muốn đúc và đốt chúng theo cách chúng tôi muốn.
4. Ai sẽ có thể đúc chúng?
--> chỉ có một chữ ký (mà chúng tôi sơ hữu) mới có thể ký giao dịch và do đó có thể đúc mã thông báo

## Cài đặt- Thiết lập
### Thiết lập Cardano node socket path
Để làm việc với `cardano-cli` chúng ta cần thiết lập một biến môi trường được gọi là `CARDANO_NODE_SOCKET_PATH`. Xin lưu ý rằng tên biến đều là chữ hoa. Biến cần giữ đường dẫn tuyệt đối đến tệp socket của cài đặt nút (node) Cardano đang chạy của bạn.
Nếu bạn không chắc chắn hoặc không biết tìm đường dẫn ổ cắm của mình ở đâu, vui lòng kiểm tra lệnh về cách bạn bắt đầu / chạy nút Cardano của mình.
Ví dụ - nếu bạn bắt đầu nút của mình bằng lệnh này

```bash
$HOME/.local/bin/cardano-node run \
 --topology config/testnet-topology.json \
 --database-path db \
 --socket-path $HOME/TESTNET_NODE/socket/node.socket \
 --port 3001 \
 --config config/testnet-config.json
```
Bạn cần đặt biến thành đường dẫn tương ứng thông qua tham số `--socket-path` :

```bash
export CARDANO_NODE_SOCKET_PATH="$HOME/TESTNET_NODE/socket/node.socket"
```
Bạn cần điều chỉnh đường dẫn trên thiết lập và đường dẫn ổ cắm của mình cho phù hợp.

### Cải thiện cho dễ đọc
Vì chúng tôi đã trả lời tất cả các câu hỏi ở trên, chúng tôi sẽ đặt các biến trên terminal / bash của mình để làm cho khả năng đọc dễ dàng hơn một chút. Chúng tôi cũng sẽ sử dụng testnet. Sự khác biệt duy nhất giữa việc khai thác nội dung gốc trong mạng chính là bạn cần thay thế <b>testnet</b> bằng <b>mainnet</b>. 

<b>Kể từ phiên bản cardano-cli 1.31.0, tên mã thông báo phải được mã hóa base16 </b>.  Vì vậy, ở đây, chúng tôi sử dụng công cụ xxd để mã hóa tên mã thông báo.

```bash
testnet="--testnet-magic 1097911063"
tokenname1=$(echo -n "Testtoken" | xxd -ps | tr -d '\n')
tokenname2=$(echo -n "SecondTesttoken" | xxd -ps | tr -d '\n')
tokenamount="10000000"
output="0"
```

Chúng tôi sẽ sử dụng kỹ thuật thiết lập các biến này để giúp bạn dễ dàng theo dõi hơn..

### Kiểm tra tình trạng node

Chúng tôi cũng muốn kiểm tra xem Node của chúng tôi có được cập nhật hay không. Để làm điều đó, chúng tôi kiểm tra kỷ nguyên / khối hiện tại và so sánh nó với giá trị hiện tại được hiển thị trong [Cardano Explorer for the testnet](https://explorer.cardano-testnet.iohkdev.io/en).

```bash
cardano-cli query tip $testnet
```

Sẽ cung cấp cho bạn một đầu ra như thế này
```bash
{
    "epoch": 282,
    "hash": "82cfbbadaaec1a6204442b91de1535505b6482ae9858f3f0bd9c4bb9c8a2c12b",
    "slot": 36723570,
    "block": 6078639,
    "era": "Mary"
}
```

Epoch và số vị trí phải khớp khi được so sánh với Cardano [Explorer for testnet](https://explorer.cardano-testnet.iohkdev.io/en)

![image](https://user-images.githubusercontent.com/34856010/162867330-fa85a6a9-37fa-4cad-94c8-bfe742c7983d.png)


### Thiết lập không gian làm việc

Chúng ta sẽ bắt đầu với một nơi làm việc sạch sẽ. Vì vậy, hãy tạo một thư mục mới và làm việc trong thư mục đó.

```bash
mkdir tokens
cd tokens/
```

###Tạo khóa và địa chỉ

Nếu bạn đã có địa chỉ thanh toán và khóa và bạn muốn sử dụng chúng, bạn có thể bỏ qua bước này.
Nếu không - chúng ta cần tạo khóa và địa chỉ để gửi giao dịch và gửi và nhận ada hoặc tài sản gốc.

Khóa xác minh và khóa ký là những khóa đầu tiên chúng tôi cần tạo.

```bash
cardano-cli address key-gen --verification-key-file payment.vkey --signing-key-file payment.skey
```

Hai khóa này bây giờ có thể được sử dụng để tạo một địa chỉ.

```bash
cardano-cli address build --payment-verification-key-file payment.vkey --out-file payment.addr $testnet
```

Chúng ta sẽ lưu giá trị băm địa chỉ trong một biến được gọi là `address`.

```bash
address=$(cat payment.addr)
```
### Cấp tiền cho địa chỉ

Thực hiện một giao dịch luôn yêu cầu bạn trả phí. Việc gửi nội dung gốc cũng yêu cầu gửi ít nhất 1 ada.
Vì vậy, hãy đảm bảo rằng địa chỉ bạn sẽ sử dụng làm đầu vào cho giao dịch đúc tiền luôn có đủ tiền.


Trên mạng **thử nghiệm - testnet**, bạn có thể yêu cầu cấp tiền từ [testnet faucet](../integrate-cardano/testnet-faucet).

### Export protocol parameters

Để tính toán các giao dich, chúng tôi cần một số tham số giao thức hiện tại. Các tham số có thể được lưu trong một tệp có tên là <i>protocol.json</i> bằng câu lệnh:

```bash
cardano-cli query protocol-parameters $testnet --out-file protocol.json
```

## Minting tài sản gốc

### Tạo policy

Chính sách (Policies) là yếu tố quyết định công việc tài sản gốc. Chỉ những người sở hữu từ khóa chính sách mới mới có thể tạo ra tài liệu gốc theo chính sách này. Chúng tôi sẽ tạo một thư mục con riêng biệt trong thư mục công việc của mình để giữ cho mọi thứ được tách biệt theo chính sách và có tổ chức hơn. Để đọc thêm, vui lòng xem [tài liệu chính thức](https://docs.cardano.org/native-tokens/getting-started/#tokenmintingpolicies) hoặc [trang github về tập lệnh đa chữ ký](https://github.com/input-output-hk/cardano-node/blob/c6b574229f76627a058a7e559599d2fc3f40575d/doc/reference/simple-scripts.md) .

```bash
mkdir policy
```

:::note Chúng tôi không điều hướng vào thư mục này và mọi thứ được thực hiện từ thư mục làm việc của chúng tôi. :::

Trước hết, chúng tôi - một lần nữa - cần một số cặp khóa:

```bash
cardano-cli address key-gen \
    --verification-key-file policy/policy.vkey \
    --signing-key-file policy/policy.skey
```

Tạo một tệp `policy.script` và điền vào đó một chuỗi trống.

```bash
touch policy/policy.script && echo "" > policy/policy.script
```

Sử dụng lệnh `echo` để điền vào tệp:

```bash
echo "{" >> policy/policy.script
echo "  \"keyHash\": \"$(cardano-cli address key-hash --payment-verification-key-file policy/policy.vkey)\"," >> policy/policy.script
echo "  \"type\": \"sig\"" >> policy/policy.script
echo "}" >> policy/policy.script
```

:::note Tiếng vang thứ hai sử dụng lệnh sub-shell để tạo cái gọi là key-hash. Nhưng, tất nhiên, bạn cũng có thể làm điều đó bằng tay. :::

Bây giờ chúng tôi có một tệp tập lệnh đơn giản xác định khóa xác minh chính sách làm nhân chứng để ký giao dịch đúc. Không có ràng buộc nào khác như khóa mã thông báo hoặc yêu cầu chữ ký cụ thể để gửi thành công giao dịch với chính sách đúc tiền này.

### Mint tài sản

Để đúc nội dung gốc, chúng tôi cần tạo ID chính sách từ tệp tập lệnh mà chúng tôi đã tạo.

```bash
cardano-cli transaction policyid --script-file ./policy/policy.script > policy/policyID
```

Đầu ra được lưu vào tệp `policyID` vì chúng tôi cần tham khảo nó sau này.

### Xây dựng giao dịch thô để gửi cho chính mình

Để đúc mã thông báo, chúng tôi sẽ thực hiện giao dịch bằng cách sử dụng địa chỉ được tạo và tài trợ trước đó của chúng tôi.

#### Nói nhanh về các giao dịch trong Cardano

Mỗi giao dịch trong Cardano yêu cầu thanh toán một khoản phí — tính đến thời điểm hiện tại — phần lớn sẽ được xác định bởi quy mô của những gì chúng tôi muốn truyền tải. Càng nhiều byte được gửi, phí càng cao.

Đó là lý do tại sao thực hiện giao dịch trong Cardano là một quá trình ba chiều.

1. Đầu tiên, chúng tôi sẽ xây dựng một giao dịch, kết quả là một tệp. Đây sẽ là cơ sở để tính phí giao dịch.
2. Chúng tôi sử dụng tệp `raw` này và các tham số giao thức của mình để tính phí
3. Sau đó, chúng tôi cần xây dựng lại giao dịch, bao gồm phí chính xác và số tiền đã điều chỉnh mà chúng tôi có thể gửi. Vì chúng tôi gửi nó cho chính mình nên đầu ra cần phải là số tiền chúng tôi tài trợ trừ đi phí tính toán.

Một điều khác cần lưu ý là mô hình về cách các giao dịch và "số dư" được thiết kế trong Cardano. Mỗi giao dịch có một (hoặc nhiều) đầu vào (nguồn tiền của bạn, chẳng hạn như hóa đơn bạn muốn sử dụng trong ví của mình để thanh toán) và một hoặc nhiều đầu ra. Trong ví dụ đúc tiền của chúng tôi, đầu vào và đầu ra sẽ giống nhau - <b>địa chỉ của chính chúng tôi</b> .

Trước khi bắt đầu, một lần nữa chúng ta sẽ cần một số thiết lập để giúp việc xây dựng giao dịch dễ dàng hơn. Trước tiên, hãy truy vấn địa chỉ thanh toán của bạn và lưu ý các giá trị khác nhau hiện có.

```bash
cardano-cli query utxo --address $address $testnet
```

Đầu ra của bạn sẽ trông giống như thế này (ví dụ hư cấu):

```bash
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
b35a4ba9ef3ce21adcd6879d08553642224304704d206c74d3ffb3e6eed3ca28     0        1000000000 lovelace
```

Vì chúng tôi cần từng giá trị đó trong giao dịch của mình nên chúng tôi sẽ lưu trữ chúng riêng lẻ trong một biến tương ứng.

```bash
txhash="insert your txhash here"
txix="insert your TxIx here"
funds="insert Amount here"
policyid=$(cat policy/policyID)
```

Đối với ví dụ hư cấu của chúng tôi, điều này sẽ dẫn đến đầu ra sau - <b>vui lòng điều chỉnh các giá trị của bạn cho phù hợp</b> :

```bash
$ txhash="b35a4ba9ef3ce21adcd6879d08553642224304704d206c74d3ffb3e6eed3ca28"
$ txix="0"
$ funds="1000000000"
$ policyid=$(cat policy/policyID)
```

Ngoài ra, các giao dịch chỉ được sử dụng để tính phí vẫn phải có một khoản phí được đặt, mặc dù không nhất thiết phải chính xác. Phí tính toán sẽ được bao gồm *trong lần thứ hai* giao dịch này được xây dựng (tức là giao dịch để ký và gửi). Lần đầu tiên, chỉ *có độ dài* tham số phí là quan trọng, vì vậy ở đây chúng tôi chọn giá trị tối đa ( [lưu ý](https://github.com/cardano-foundation/developer-portal/pull/283#discussion_r705612888) ):

```bash
$ fee="300000"
```

Bây giờ chúng tôi đã sẵn sàng tạo giao dịch đầu tiên để tính phí của chúng tôi và lưu nó vào một tệp có tên <i>matx.raw</i> . Chúng tôi sẽ tham chiếu các biến trong giao dịch của mình để cải thiện khả năng đọc vì chúng tôi đã lưu gần như tất cả các giá trị cần thiết trong các biến. Đây là giao dịch của chúng tôi trông như thế nào:

```bash
cardano-cli transaction build-raw \
 --fee $fee \
 --tx-in $txhash#$txix \
 --tx-out $address+$output+"$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
 --mint="$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
 --minting-script-file policy/policy.script \
 --out-file matx.raw
```

:::note Trong các phiên bản sau của cardano-cli (ít nhất là từ &gt;1.31.0), <b>tên mã thông báo phải được mã hóa base16 nếu không bạn sẽ gặp lỗi</b>

```bash
option --tx-out:
unexpected 'T'
expecting alphanumeric asset name, white space, "+" or end of input
```

Bạn có thể khắc phục điều này bằng cách xác định lại tên mã thông báo. Trong hướng dẫn này, tên mã thông báo base16 tương đương là:

```bash
tokenname1="54657374746F6B656E"
tokenname2="5365636F6E6454657374746F6B656E"
```

:::

#### phân tích cú pháp

Dưới đây là bảng phân tích cú pháp về các tham số chúng tôi xác định trong giao dịch đúc tiền của mình:

```bash
--fee: $fee
```

Phí mạng mà chúng tôi cần phải trả cho giao dịch của mình. Phí sẽ được tính thông qua các tham số mạng và tùy thuộc vào kích thước (tính bằng byte) mà giao dịch của chúng tôi sẽ có. Dung lượng file càng lớn thì phí càng cao.

```bash
--tx-in $txhash#$txix \
```

Hàm băm của địa chỉ mà chúng tôi sử dụng làm đầu vào cho giao dịch cần có đủ tiền. Vì vậy, cú pháp là: hàm băm, theo sau là dấu thăng, theo sau là giá trị TxIx của hàm băm tương ứng.

```bash
--tx-out $address+$output+"$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
```

Đây là nơi phần một của phép thuật xảy ra. Đối với <i>--tx-out</i> , chúng tôi cần chỉ định địa chỉ nào sẽ nhận giao dịch của chúng tôi. Trong trường hợp của chúng tôi, chúng tôi gửi mã thông báo đến địa chỉ của chúng tôi. :::note Cú pháp rất quan trọng, vì vậy đây là từng từ một. Không có khoảng trống trừ khi được nêu rõ ràng:

1. băm địa chỉ
2. một dấu cộng
3. đầu ra tính bằng Lovelace (ada) (đầu ra = số tiền đầu vào — phí)
4. một dấu cộng
5. dấu ngoặc kép
6. số lượng mã thông báo
7. một khoảng trống/không gian
8. id chính sách
9. một dấu chấm
10. tên mã thông báo (tùy chọn nếu bạn muốn có nhiều/mã thông báo khác nhau: một ô trống, một dấu cộng, một ô trống và bắt đầu lại từ 6.)
11. dấu ngoặc kép :::

```bash
--mint="$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
```

Một lần nữa, cú pháp tương tự như được chỉ định trong <i>--tx-out</i> nhưng không có địa chỉ và đầu ra.

```bash
--out-file matx.raw
```

Chúng tôi lưu giao dịch của mình vào một tệp mà bạn có thể đặt tên theo ý muốn. Chỉ cần đảm bảo tham chiếu đúng tên tệp trong các lệnh sắp tới. Tôi đã chọn gắn bó với các tài liệu chính thức và khai báo nó là <i>matx.raw</i> .

Dựa trên giao dịch thô này, chúng tôi có thể tính phí giao dịch tối thiểu và lưu trữ nó trong biến <i>$fee</i> . Chúng tôi hơi lạ mắt ở đây và chỉ lưu trữ giá trị để chúng tôi có thể sử dụng biến cho các phép tính dựa trên thiết bị đầu cuối:

```bash
fee=$(cardano-cli transaction calculate-min-fee --tx-body-file matx.raw --tx-in-count 1 --tx-out-count 1 --witness-count 2 $testnet --protocol-params-file protocol.json | cut -d " " -f1)
```

Hãy nhớ rằng, đầu vào và đầu ra của giao dịch phải bằng nhau, nếu không, giao dịch sẽ thất bại. Không thể có thức ăn thừa. Để tính toán sản lượng còn lại, chúng ta cần trừ phí từ quỹ của mình và lưu kết quả vào biến đầu ra.

```bash
output=$(expr $funds - $fee)
```

Bây giờ chúng tôi có mọi giá trị chúng tôi cần để xây dựng lại giao dịch, sẵn sàng để được ký kết. Vì vậy, chúng tôi phát hành lại cùng một lệnh để xây dựng lại, sự khác biệt duy nhất là các biến của chúng tôi hiện đang giữ các giá trị chính xác.

```bash
cardano-cli transaction build-raw \
--fee $fee  \
--tx-in $txhash#$txix  \
--tx-out $address+$output+"$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
--mint="$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
--minting-script-file policy/policy.script \
--out-file matx.raw
```

Các giao dịch cần phải được ký để chứng minh tính xác thực và quyền sở hữu của khóa chính sách.

```bash
cardano-cli transaction sign  \
--signing-key-file payment.skey  \
--signing-key-file policy/policy.skey  \
$testnet --tx-body-file matx.raw  \
--out-file matx.signed
```

:::note Giao dịch đã ký sẽ được lưu trong một tệp mới có tên <i>matx.signed</i> thay vì <i>matx.raw</i> . :::

Bây giờ chúng tôi sẽ gửi giao dịch, do đó đúc tài sản gốc của chúng tôi:

```bash
cardano-cli transaction submit --tx-file matx.signed $testnet
```

Xin chúc mừng, chúng tôi hiện đã đúc thành công mã thông báo của riêng mình. Sau vài giây, chúng ta có thể kiểm tra địa chỉ đầu ra

```bash
cardano-cli query utxo --address $address $testnet
```

và sẽ thấy một cái gì đó như thế này (ví dụ hư cấu):

```bash
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
d82e82776b3588c1a2c75245a20a9703f971145d1ca9fba4ad11f50803a43190     0        999824071 lovelace + 10000000 45fb072eb2d45b8be940c13d1f235fa5a8263fc8ebe8c1af5194ea9c.5365636F6E6454657374746F6B656E + 10000000 45fb072eb2d45b8be940c13d1f235fa5a8263fc8ebe8c1af5194ea9c.54657374746F6B656E
```

## Gửi mã thông báo đến ví

Để gửi mã thông báo đến ví, chúng tôi cần tạo một giao dịch khác - chỉ lần này là không có tham số đúc. Chúng tôi sẽ thiết lập các biến của chúng tôi cho phù hợp.

```bash
fee="0"
receiver="Insert wallet address here"
receiver_output="10000000"
txhash=""
txix=""
funds="Amout of lovelace"
```

Một lần nữa - đây là một ví dụ về giao diện của nó nếu chúng ta sử dụng ví dụ hư cấu của mình:

```bash
$ fee="0"
$ receiver="addr_test1qp0al5v8mvwv9mzn77ls0tev3t838yp9ghvgxf9t5qa4sqlua2ywcygl3d356c34576elq5mcacg88gaevceyc5tulwsmk7s8v"
$ receiver_output="10000000"
$ txhash="d82e82776b3588c1a2c75245a20a9703f971145d1ca9fba4ad11f50803a43190"
$ txix="0"
$ funds="999824071"
```

Bạn vẫn có quyền truy cập vào các biến khác từ quá trình đúc. Vui lòng kiểm tra xem các biến đó đã được đặt chưa:

```bash
echo Tokenname 1: $tokenname1
echo Tokenname 2: $tokenname2
echo Address: $address
echo Policy ID: $policyid
```

Chúng tôi sẽ gửi 2 mã thông báo đầu tiên của mình, `Testtoken` , đến địa chỉ nước ngoài.
 Một vài điều đáng chỉ ra:

1. Chúng tôi buộc phải gửi ít nhất tối thiểu 1 ada (1000000 Lovelace) đến địa chỉ nước ngoài. Chúng tôi không thể chỉ gửi mã thông báo. Vì vậy, chúng ta cần tính giá trị này vào đầu ra của mình. Chúng tôi sẽ tham chiếu giá trị đầu ra của địa chỉ từ xa với biến receiver_output.
2. Ngoài địa chỉ nhận, chúng ta cũng cần đặt địa chỉ của chính mình làm đầu ra bổ sung. Vì chúng tôi không muốn gửi mọi thứ chúng tôi có đến địa chỉ từ xa, nên chúng tôi sẽ sử dụng địa chỉ của chính mình để nhận mọi thứ khác đến từ đầu vào.
3. Do đó, địa chỉ riêng của chúng tôi cần nhận tiền của chúng tôi, trừ đi phí giao dịch cũng như tối thiểu 1 ada chúng tôi cần gửi đến địa chỉ khác và
4. tất cả các mã thông báo mà txhash hiện đang nắm giữ, trừ đi các mã thông báo chúng tôi gửi.

:::note Tùy thuộc vào quy mô và số lượng nội dung gốc mà bạn định gửi, có thể gửi nhiều hơn yêu cầu tối thiểu chỉ 1 ada. Đối với hướng dẫn này, chúng tôi sẽ gửi 10 ada để đảm bảo an toàn. Kiểm tra [tài liệu sổ cái Cardano để đọc thêm](https://cardano-ledger.readthedocs.io/en/latest/explanations/min-utxo-alonzo.html#example-min-ada-value-calculations-and-current-constants) :::

Vì chúng tôi sẽ gửi 2 trong số các mã thông báo đầu tiên của mình đến địa chỉ từ xa nên chúng tôi còn lại 999998 `Testtoken` cũng như 1000000 `SecondTesttoken` bổ sung.

Đây là giao dịch `raw` trông như thế nào:

```bash
cardano-cli transaction build-raw  \
--fee $fee  \
--tx-in $txhash#$txix  \
--tx-out $receiver+$receiver_output+"2 $policyid.$tokenname1"  \
--tx-out $address+$output+"9999998 $policyid.$tokenname1 + 10000000 $policyid.$tokenname2"  \
--out-file rec_matx.raw
```

Một lần nữa, chúng ta sẽ tính phí và lưu nó vào một biến.

```bash
fee=$(cardano-cli transaction calculate-min-fee --tx-body-file rec_matx.raw --tx-in-count 1 --tx-out-count 2 --witness-count 1 $testnet --protocol-params-file protocol.json | cut -d " " -f1)
```

Như đã nêu ở trên, chúng tôi cần tính toán phần còn lại sẽ được gửi trở lại địa chỉ của chúng tôi. Logic là: `TxHash Amount` — `fee` — `min Send 10 ada in Lovelace` = `the output for our own address`

```bash
output=$(expr $funds - $fee - 10000000)
```

Hãy cập nhật giao dịch:

```bash
cardano-cli transaction build-raw  \
--fee $fee  \
--tx-in $txhash#$txix  \
--tx-out $receiver+$receiver_output+"2 $policyid.$tokenname1"  \
--tx-out $address+$output+"9999998 $policyid.$tokenname1 + 10000000 $policyid.$tokenname2"  \
--out-file rec_matx.raw
```

Kí tên:

```bash
cardano-cli transaction sign --signing-key-file payment.skey $testnet --tx-body-file rec_matx.raw --out-file rec_matx.signed
```

Gửi nó:

```bash
cardano-cli transaction submit --tx-file rec_matx.signed $testnet
```

Sau vài giây, bạn, người nhận, sẽ có mã thông báo của mình. Đối với ví dụ này, một ví testnet Daedalus được sử dụng.

![hình ảnh](https://user-images.githubusercontent.com/34856010/162867390-459b718b-505c-45e5-8a4c-ef0860cb21c5.png)

## Đốt mã thông báo

Trong phần cuối của vòng đời mã thông báo, chúng tôi sẽ đốt 5000 mã thông báo mới được tạo <i>SecondTesttoken</i> , do đó sẽ hủy chúng vĩnh viễn.

Bạn sẽ không ngạc nhiên khi điều này — một lần nữa — sẽ được thực hiện với một giao dịch. Nếu bạn đã làm theo hướng dẫn này cho đến thời điểm này, thì bạn đã quen với quy trình, vì vậy hãy bắt đầu lại.

Thiết lập mọi thứ và kiểm tra địa chỉ của chúng tôi:

```bash
cardano-cli query utxo --address $address $testnet
```

:::note Vì chúng tôi đã gửi mã thông báo đi, nên chúng tôi cần điều chỉnh số lượng Testtoken mà chúng tôi sẽ gửi. :::

Hãy đặt các biến của chúng tôi cho phù hợp (nếu chưa được đặt). Các biến như địa chỉ và tên mã thông báo cũng phải được đặt.

```bash
txhash="insert your txhash here"
txix="insert your TxIx here"
funds="insert Amount only in here"
burnfee="0"
policyid=$(cat policy/policyID)
burnoutput="0"
```

Việc đốt mã thông báo khá đơn giản. Bạn sẽ đưa ra một hành động đúc kết mới, nhưng lần này với đầu vào <b>âm</b> . Điều này về cơ bản sẽ trừ đi số lượng mã thông báo.

```bash
cardano-cli transaction build-raw \
 --fee $burnfee \
 --tx-in $txhash#$txix \
 --tx-out $address+$burnoutput+"9999998 $policyid.$tokenname1 + 9995000 $policyid.$tokenname2"  \
 --mint="-5000 $policyid.$tokenname2" \
 --minting-script-file policy/policy.script \
 --out-file burning.raw
```

:::note Vì chúng tôi đã có nhiều tệp giao dịch, chúng tôi sẽ đặt cho giao dịch này một cái tên hay hơn và gọi nó là <i>burn.raw</i> . Chúng tôi cũng cần chỉ định số lượng mã thông báo còn lại sau khi hủy. Phép toán là: <i>lượng token đầu vào</i> — <i>lượng token bị hủy</i> = <i>lượng token đầu ra</i> :::

Như thường lệ, chúng ta cần tính phí. Để tạo sự khác biệt tốt hơn, chúng tôi đặt tên biến là <i>burnfee</i> :

```bash
burnfee=$(cardano-cli transaction calculate-min-fee --tx-body-file burning.raw --tx-in-count 1 --tx-out-count 1 --witness-count 2 $testnet --protocol-params-file protocol.json | cut -d " " -f1)
```

Tính toán giá trị đầu ra chính xác

```bash
burnoutput=$(expr $funds - $burnfee)
```

Xây dựng lại giao dịch với số tiền chính xác

```bash
cardano-cli transaction build-raw \
 --fee $burnfee \
 --tx-in $txhash#$txix \
 --tx-out $address+$burnoutput+"9999998 $policyid.$tokenname1 + 9995000 $policyid.$tokenname2"  \
 --mint="-5000 $policyid.$tokenname2" \
 --minting-script-file policy/policy.script \
 --out-file burning.raw
```

Ký giao dịch:

```bash
cardano-cli transaction sign  \
--signing-key-file payment.skey  \
--signing-key-file policy/policy.skey  \
$testnet  \
--tx-body-file burning.raw  \
--out-file burning.signed
```

Gửi nó:

```bash
cardano-cli transaction submit --tx-file burning.signed $testnet
```

Kiểm tra địa chỉ của bạn:

```bash
cardano-cli query utxo --address $address $testnet
```

Bây giờ bạn sẽ có ít hơn 5000 mã thông báo so với trước đây:

```bash
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
f56e2800b7b5980de6a57ebade086a54aaf0457ec517e13012571b712cf53fb3     1        989643170 lovelace + 9995000 45fb072eb2d45b8be940c13d1f235fa5a8263fc8ebe8c1af5194ea9c.5365636F6E6454657374746F6B656E + 9999998 45fb072eb2d45b8be940c13d1f235fa5a8263fc8ebe8c1af5194ea9c.54657374746F6B656E
```
