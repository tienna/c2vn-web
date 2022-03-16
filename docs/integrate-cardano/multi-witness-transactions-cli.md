---
id: multi-witness-transactions-cli
title: Giao dịch đa nhân chứng
sidebar_label: Giao dịch đa nhân chứng
description: This article explains how you can create multi witness transactions using the cardano-cli.
# image: ./img/og-developer-portal.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Tổng quan

:::note

Hướng dân này giả định rằng bạn đã hoàn thành hướng dẫn [Exploring Cardano Wallets](/docs/integrate-cardano/creating-wallet-faucet). Bạn sẽ cần một UTxO ở mỗi ví(`payment1.addr` và `payment2.addr`) để hoàn thành hướng dẫn này.

Hướng dẫn này cũng giả định rằng bạn có `cardano-node` chạy trên nền tảng và nối với mạng `testnet`.

:::

### Tóm tắt

Chúng ta hãy tóm tắt lại những gì chúng ta đã làm cho đến nay. Mục tiêu của chúng ta trong hướng dẫn trước (/docs/integrate-cardano/creating-wallet-faucet) là lấy `1000 tADA` từ testnet và gửi `250 tAda`  từ **payment1** tới **payment2**.

Đảm bảo rằng chúng ta ở đúng thư mục.

```bash
$ pwd
$HOME/cardano
```

<Tabs
  defaultValue="query"
  groupId="step"
  values={[
    {label: 'Query UTxO', value: 'query'},
    {label: 'Calculate fees', value: 'calc'},
    {label: 'Build Tx', value: 'build'},
    {label: 'Sign & Submit Tx', value: 'sign'},
    {label: 'Verify Tx', value: 'verify'}
  ]}>

  <TabItem value="query">


 Chúng ta đã rút `1000 tAda` từ Testnet Faucet vào ví **payment1** của mình.

```bash
$ cardano-cli query utxo \
--testnet-magic 1097911063 \
--address $(cat keys/payment1.addr)
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
264c0aa805652e3607c5ea2b1e8a9f3bf9c3bc8d4d938e1a9035f352083ba703     0        1000000000 lovelace
```

  </TabItem>
  <TabItem value="calc">


Chúng ta đã sử dụng `protocol-parameters` để dự thảo giao dịch của chúng ta và tính toán phí dự kiến.

```bash
$ cardano-cli query protocol-parameters \
--testnet-magic 1097911063 \
--out-file protocol.json
```

```bash
$ cardano-cli transaction build-raw \
--tx-in 264c0aa805652e3607c5ea2b1e8a9f3bf9c3bc8d4d938e1a9035f352083ba703#0 \
--tx-out $(cat keys/payment2.addr)+0 \
--tx-out $(cat keys/payment1.addr)+0 \
--fee 0 \
--out-file tx.draft
```

```bash {8}
$ cardano-cli transaction calculate-min-fee \
--tx-body-file tx.draft \
--tx-in-count 1 \
--tx-out-count 2 \
--witness-count 1 \
--testnet-magic 1097911063 \
--protocol-params-file protocol.json
174169 Lovelace
```

  </TabItem>
  <TabItem value="build">

Từ mức phí dự kiến `174169 Lovelace`, chúng ta có thể tính toán kết quả đầu ra và xây dựng giao dịch của mình.

```bash {3,4,5}
cardano-cli transaction build-raw \
--tx-in 264c0aa805652e3607c5ea2b1e8a9f3bf9c3bc8d4d938e1a9035f352083ba703#0 \
--tx-out $(cat keys/payment2.addr)+250000000 \
--tx-out $(cat keys/payment1.addr)+749825831 \
--fee 174169 \
--out-file tx.draft
```

:::note

Phí của bạn có thể khác nhau do đó bạn sẽ có số tiền khác nhau.
:::

  </TabItem>
  <TabItem value="sign">

Chúng ta sử dụng `payment1.skey` để ký giao dịch của mình và gửi nó lên blockchain.

```bash {3,10}
cardano-cli transaction sign \
--tx-body-file tx.draft \
--signing-key-file keys/payment1.skey \
--testnet-magic 1097911063 \
--out-file tx.signed

cardano-cli transaction submit \
--tx-file cardano/tx.signed \
--testnet-magic 1097911063
Transaction successfully submitted.
```

  </TabItem>
  <TabItem value="verify">

Cuối cùng, chúng ta xác minh giao dịch bằng cách truy vấn ví **payment1** và **payment2**.

```bash
$ cardano-cli query utxo \
--testnet-magic 1097911063 \
--address $(cat keys/payment1.addr)
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
b73b7503576412219241731230b5b7dd3b64eed62ccfc3ce69eb86822f1db251     1        749825831 lovelace
```

```bash
$ cardano-cli query utxo \
--testnet-magic 1097911063 \
--address $(cat payment2.addr)
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
b73b7503576412219241731230b5b7dd3b64eed62ccfc3ce69eb86822f1db251     0        250000000 lovelace
```

  </TabItem>
</Tabs>

Chúng ta hiện có `749.825831 tAda` trong ví **payment1** và `250 tAda` trong ví **payment2**. 

Hãy xem làm thế nào chúng ta có thể chi tiêu tất cả cùng một lúc!


## Trường hợp sử dụng


Có nhiều lý do để bạn muốn có nhiều ví gửi ada trong một giao dịch duy nhất. Một là, chính bạn có hai ví (**payment1** và **payment2**) và bạn muốn chi tiêu nó vào thứ gì đó...



* đắt hơn số tiền bạn có trong bất kỳ ví nào trong hai ví của mình,
* nhưng cả hai số tiền gộp lại sẽ trang trải các chi phí.

Giả sử bạn đang ở **cửa hàng xe đạp** và bạn nhìn thấy một cái xe đẹp với giá `1100 tAda`. Bạn chỉ còn lại `999 tAda` (cộng với tiền lẻ).

Chủ cửa hàng xe đạp - *một người đam mê công nghệ blockchai* - sẵn sàng giảm giá cho bạn 10%, nếu bạn **thanh toán cho anh ta trong một giao dịch duy nhất**.

> * Không có gì thay đổi cả, anh bạn* - Chủ cửa hàng Bike

Vì vậy, chúng ta cần đảm bảo chi tiêu tất cả `tAda` từ hai ví của mình trong một giao dịch duy nhất.

:::note

Anh ta có thể dễ dàng xác minh xem chúng ta đã tiêu tất cả số tiền chưa bằng cách kiểm tra xem giao dịch có hơn một đầu ra hay không.

Có nhiều cách để tối ưu hóa số tiền bạn chi tiêu. Chúng ta sẽ để điều này cho bạn tự tìm hiểu.

:::

## Quy trình kỹ thuật

This scenario is pretty straight forward and looks like this.
Kịch bản này khá dễ hiểu và trông như này:

![img](../../static/img/integrate-cardano/multi-witness-transaction.png "Multi witness flow")


Như bạn có thể nhìn ở sơ đồ trên, chúng ta sẽ xây dựng và gửi một **multi-witness transaction**, có *hai đầu vào* và *một đầu ra*

:::note


Chúng ta không thể thực hiện việc này với `cardano-wallet` hay bất kỳ ví nào khác như Daedalus hay Yoroi bởi vì chúng ta sẽ cần cả `signing-keys` từ **payment1** và **payment2** để ký giao dịch.

:::

## Viết code

:::note


Như đã đề cập ở trên, hướng dẫn này giả sử bạn đã hoàn thành hướng dẫn 
[Exploring Cardano Wallets](/docs/integrate-cardano/creating-wallet-faucet)

Chúng ta cũng giả định bạn đã thanh toán `174169 Lovelace` phí giao dịch và số dư hiện tại của bạn là:

* **payment1**: `749825831 Lovelace`
* **payment2**: `250000000 Lovelace`

:::

### Tạo ví chủ


Nếu bạn chưa có ví thứ ba để sử dụng cho hướng dẫn này, hãy tạo một ví để chúng ta có thể chuyển tất cả tiền của mình sang.


Đảm bảo rằng bạn ở trong thư mục `keys` như sau: `cd $HOME/cardano/keys`

Tạo một **cặp khóa thanh toán ** sử dụng `cardano-cli`:

```bash
cardano-cli address key-gen \
--verification-key-file $HOME/cardano/keys/store-owner.vkey \
--signing-key-file $HOME/cardano/keys/store-owner.skey
```

 Sau đó tạo một ** địa chỉ ví** cho mạng `testnet`:

```bash
cardano-cli address build \
--payment-verification-key-file $HOME/cardano/keys/store-owner.vkey \
--out-file $HOME/cardano/keys/store-owner.addr \
--testnet-magic 1097911063
```

Kiểm tra thư mục `keys` của bạn. Nó trông như sau:

```bash
$HOME/cardano/keys/
├── payment1.addr
├── payment1.skey
├── payment1.vkey
├── payment2.addr
├── payment2.skey
├── payment2.vkey
├── store-owner.addr
├── store-owner.skey
└── store-owner.vkey

0 directories, 9 files
```

### Tính toán phí cho giao dịch

Hãy tạo một thư mục để lưu trữ các giao dịch cho hướng dẫn này và nhập nó vào:

```bash
mkdir -p $HOME/cardano/multi-witness-sample && cd $_;
```


Chúng ta muốn gửi ** tất cả tAda** tại hai UTxO mà chúng ta đã xác minh trước đó và gửi nó đến `store-owner.addr`. Điều đó có nghĩa là chúng ta sẽ có **hai đầu vào**

Thế còn đầu ra? Chủ cửa hàng muốn chúng ta tiêu hết số tiền đó vì vậy sẽ có ** một đầu ra cho chủ cửa hàng** và ** không có đầu ra cho chúng ta**. 

Hãy xây dựng giao dịch đó.

```bash
cardano-cli transaction build-raw \
--tx-in b73b7503576412219241731230b5b7dd3b64eed62ccfc3ce69eb86822f1db251#0 \
--tx-in b73b7503576412219241731230b5b7dd3b64eed62ccfc3ce69eb86822f1db251#1 \
--tx-out $(cat ../keys/store-owner.addr)+0 \
--fee 0 \
--out-file tx2.draft
```

Điều cuối cùng chúng ta cần làm là tính toán các khoản phí cho`tx2.draft`. Chú ý `--tx-in-count` và `--witness-count`.

```bash {3,4,5,8}
cardano-cli transaction calculate-min-fee \
--tx-body-file tx2.draft \
--tx-in-count 2 \
--tx-out-count 1 \
--witness-count 2 \
--testnet-magic 1097911063 \
--protocol-params-file ../protocol.json 
179581 Lovelace
```

Chúng tôi có thể tính toán số tiền mà chủ cửa hàng sẽ nhận được, nếu cả hai UTxO đều được chi tiêu trong giao dịch:

```text
  749825831 (payment1)
+ 250000000 (payment2)
  ---------
  999825831
-    179581 (fee)
  ---------
  999646250 (store-owner)
  =========
```

### Build, sign và submit giao dịch


Chúng ta biết *số lượng đầu ra* cũng như *phí* . Cuối cùng, chúng ta có thể xây dựng, ký và gửi giao dịch `tx2.draft` của mình.

Chúng ta phải sử dụng payment1.skey` và `payment2.skey`đẻ ký kết giao dịch của mình.

```bash {10,11,18}
cardano-cli transaction build-raw \
--tx-in b73b7503576412219241731230b5b7dd3b64eed62ccfc3ce69eb86822f1db251#0 \
--tx-in b73b7503576412219241731230b5b7dd3b64eed62ccfc3ce69eb86822f1db251#1 \
--tx-out $(cat ../keys/store-owner.addr)+999646250 \
--fee 179581 \
--out-file tx2.draft 

cardano-cli transaction sign \
--tx-body-file tx2.draft \
--signing-key-file ../keys/payment1.skey \
--signing-key-file ../keys/payment2.skey \
--testnet-magic 1097911063 \
--out-file tx2.signed

cardano-cli transaction submit \
--tx-file tx2.signed \
--testnet-magic 1097911063
Transaction successfully submitted
```

### Xác minh các giao dịch có nhiều nhân chứng

Chủ cửa hàng bây giờ sẽ xác minh rằng mọi thứ đã diễn ra theo kế hoạch của anh ta.

```bash
cardano-cli query utxo \
--testnet-magic 1097911063 \
--address $(cat $HOME/cardano/keys/store-owner.addr)
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
258abd628eef7d6ff0f7b4e6866b4f7c21065f4d6b5e49b51e2ac4ff035ad06f     0        999646250 lovelace
```


Xác minh [258abd628eef7d6ff0f7b4e6866b4f7c21065f4d6b5e49b51e2ac4ff035ad06f](https://explorer.cardano-testnet.iohkdev.io/en/transaction?id=258abd628eef7d6ff0f7b4e6866b4f7c21065f4d6b5e49b51e2ac4ff035ad06f) trên cardano testnet explorer


:::tip Success!

Anh ta có thể thấy rằng giao dịch có một đầu ra vào ví của anh ta. Không có kết quả đầu ra nào khác, do đó bạn phải tiêu hết `tAda`.
:::

Xin chúc mừng, bạn hiện có thể gửi các giao dịch nhiều nhân chứng trên Cardano . Điều này sẽ giúp bạn tích hợp các ứng dụng hiện có hoặc ứng dụng mới sắp ra mắt của bạn. 🎉🎉🎉

<!-- ## Compare fees

We had to pay `179581 Lovelace` to get all of our funds from A+B to C. Let's compare with the fees we would have payed had we used two transactions.

For that we draft two transactions

```sh
cardano-cli transaction build-raw \
--tx-in 258abd628eef7d6ff0f7b4e6866b4f7c21065f4d6b5e49b51e2ac4ff035ad06f#0 \
--tx-out $(cat $HOME/cardano/keys/payment1.addr)+0 \
--fee 0 \
--out-file $HOME/cardano/multi-witness-sample/tx-single1.draft

cardano-cli transaction build-raw \
--tx-in 258abd628eef7d6ff0f7b4e6866b4f7c21065f4d6b5e49b51e2ac4ff035ad06f#0 \
--tx-out $(cat $HOME/cardano/keys/payment2.addr)+0 \
--fee 0 \
--out-file $HOME/cardano/multi-witness-sample/tx-single2.draft
```

And invoke the calculate-min-fees endpoint on `cardano-cli` for both of them:

```bash {8,17}
cardano-cli transaction calculate-min-fee \
--tx-body-file $HOME/cardano/multi-witness-sample/tx-single1.draft \
--tx-in-count 1 \
--tx-out-count 1 \
--witness-count 1 \
--testnet-magic 1097911063 \
--protocol-params-file $HOME/cardano/protocol.json 
169857 Lovelace

cardano-cli transaction calculate-min-fee \
--tx-body-file $HOME/cardano/multi-witness-sample/tx-single2.draft \
--tx-in-count 1 \
--tx-out-count 1 \
--witness-count 1 \
--testnet-magic 1097911063 \
--protocol-params-file $HOME/cardano/protocol.json 
169857 Lovelace
```

We would have to have payed `329714 Lovelace`. Another good reason not to use two transactions. -->
