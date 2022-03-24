---
id: creating-wallet-faucet
title: Tạo ví Cardano và nhận tAda
sidebar_label: Tạo ví Cardano và nhận tAda
description: Bài viết này giải thích cách bạn có thể tạo các loại Ví Cardano khác nhau và cách bạn có thể nhận một số tAda (quảng cáo thử nghiệm) từ vòi.
#image: ./img/og-developer-portal.png 
--- 

### Tổng quat 

Trong hướng dẫn này, chúng tôi sẽ chỉ cho bạn cách tạo ví Cardano , nhận một số `tAda` (**thử nghiệm ada**) trong mạng `testnet` và  ví dụ cơ bản gửi các giao dịch. Chúng ta sẽ khám phá các công cụ  `cardano-cli` và `cardano-wallet` làm việc như thế nào.

:::Lưu ý
Hướng dẫn này giả định rằng bạn đã cài đặt `cardano-node` và `cardano-cli` trong hệ thống của bạn. Nếu không, bạn có thể tham khảo Hướng dẫn [Installing cardano-node](/docs/dr-lars-lession/setup-node-testnet) để biết hướng dẫn về cách thực hiện điều đó.

Bạn cũng phải kết nối mạng của mình `cardano-node` và `testnet` đảm bảo rằng nó đã được đồng bộ hóa hoàn toàn.

Nếu bạn không chắc chắn về cách thực hiện điều đó, bạn nên đọc Hướng dẫn [Running cardano-node](/docs/getting-started/running-cardano) trước khi tiếp tục.
:::

### Ví Cardano

Vì vậy, bạn đã cài đặt `cardano-node` và làm cho nó chạy, thậm chí bạn có thể đã cố gắng truy vấn một số dữ liệu blockchain đơn giản (Nếu bạn đọc Hướng dẫn [Running cardano-node](/docs/getting-started/running-cardano)). Nhưng làm thế nào để bạn thực sự tạo một ví **Cardano**, nhận và gửi một số `ada` hoặc `tAda` mã thông báo?

Trước tiên, chúng ta phải xem xét các ứng dụng chúng ta có thể sử dụng để tạo ví.

- [Daedalus](https://daedaluswallet.io/) : **Daedalus Wallet** là ví đầy đủ chính thức của **Cardano**, Nó là một [GUI (Graphical User Interface)](https://en.wikipedia.org/wiki/Graphical_user_interface) cho máy tính để bàn (**Linux**, **MacOS**, **Windows**). Điều đó có nghĩa là người dùng sẽ được sử dụng giao diện người dùng đẹp (Giao diện người dùng), các nút bố cục để tương tác với chuỗi khối **Cardano**.

   Về cơ bản, ví đầy đủ có nghĩa là nó phải đồng bộ hóa và tải xuống blockchain trước khi người dùng có thể gửi giao dịch và tương tác với ví.
    
    Nó là mã nguồn mở chủ yếu được phát triển bởi [InputOutputGlobal](https://iohk.io/),  công ty phát triển đằng sau giao thức  **Cardano** và cũng là một trong ba thực thể nền tảng của dự án **Cardano**.
- [Yoroi](https://yoroi-wallet.com/#/) : **Yoroi Wallet** là ví nhẹ chính thức của **Cardano**, Nó có sẵn dưới dạng **ứng dụng di động** và dưới dạng **tiện ích mở rộng của trình duyệt** . 
  
  Ví nhẹ có nghĩa là người dùng sẽ không bị buộc phải tải xuống toàn bộ chuỗi khối, Thay vào đó Yoroi có một máy chủ phụ trợ và tải dữ liệu chuỗi khối cho người dùng mà người dùng không để lộ dữ liệu nhạy cảm ( Khóa riêng ) cho máy chủ và cuối cùng là duy trì bảo mật. Điều này mang lại trải nghiệm nhanh hơn cho người dùng do thực tế là người dùng sẽ không phải đợi hàng giờ trước khi có thể sử dụng ví.

  Nó là mã nguồn mở chủ yếu được phát triển bởi [Emurgo](https://emurgo.io), Một công ty có trụ sở tại [Japan](https://en.wikipedia.org/wiki/Japan) tập trung vào Doanh nghiệp và Doanh nghiệp áp dụng chuỗi khối Cardano . Nó cũng là một trong ba thực thể nền tảng của dự án Cardano .

- [cardano-wallet](https://github.com/input-output-hk/cardano-wallet) : `cardano-wallet` is a [CLI (Command Line Interface)](https://en.wikipedia.org/wiki/Command-line_interface) là một ứng dụng CLI (Giao diện Dòng lệnh) cung cấp các chức năng của ví Cardano thông qua các tham số dòng lệnh hoặc thông qua [Web API](https://en.wikipedia.org/wiki/Web_API). 

 Đây là phần mềm phụ trợ ví mà ví **Daedalus** sử dụng ẩn nên nó cũng là mã nguồn mở, một trong nhiều thành phần phần mềm Cardano dựa trên Haskell được viết bởi [InputOutputGlobal](https://iohk.io/).

 Bạn có thể tìm tài liệu `cardano-wallet` **REST API** tại đây: [https://input-output-hk.github.io/cardano-wallet/api/edge/](https://input-output-hk.github.io/cardano-wallet/api/edge/)

- [cardano-cli](https://github.com/input-output-hk/cardano-node) : `cardano-cli` cũng là một ứng dụng [CLI (Command Line Interface)](https://en.wikipedia.org/wiki/Command-line_interface) cung cấp các chức năng của ví `Cardano` . Nhưng `cardano-cli` mục đích là hướng nhiều hơn đến các chức năng chung của Cardano như tạo khóa , xây dựng và gửi giao dịch , quản lý chứng chỉ nhóm cổ phần , các truy vấn blockchain đơn giản như địa chỉ ví `UTXO` và hơn thế nữa.

    Nó là một phần của `cardano-node`, vì vậy nếu bạn [compile and install](/docs/getting-started/installing-cardano-node) `cardano-node` bạn cũng nên có `cardano-cli`.Nó là một trong nhiều thành phần phần mềm Cardano dựa trên Haskell được viết bởi[InputOutputGlobal](https://iohk.io/).

:::warning
cảnh báo Luôn tải xuống ví từ các nguồn chính thức. Có rất nhiều ví giả mạo, phần mềm độc hại giả danh ví Cardano có khả năng ăn tokens / assets của bạn.
:::

### Tạo ví

Như đã đề cập trước đây, trong hướng dẫn này, chúng tôi sẽ chỉ tập trung vào `cardano-cli` và `cardano-wallet` vì chúng cung cấp một số mức độ khả năng lập trình rất quan trọng khi chúng ta nói về tích hợp Cardano cho các loại trường hợp sử dụng khác nhau.


#### Tạo ví bằng `cardano-cli`

:::note
Trong phần này, chúng tôi sẽ sử dụng đường dẫn `$HOME/cardano`để lưu trữ tất cả các tập tin `cardano-cli` liên quan làm ví dụ, hãy thay thế nó bằng thư mục bạn đã chọn để lưu trữ các tập tin đó.
:::

:::important
Hãy đảm bảo rằng node `cardano-node` đã được kết nối và đồng bộ với mạng `testnet` trước khi tiếp tục.
:::

:::warning
Trong môi trường sản xuất, việc lưu trữ ví/key trong máy chủ công cộng có thể không phải là ý kiến ​​hay trừ khi bạn biết mình đang làm gì.
Bạn có thể tạo các `key` này ở máy nội bộ và cất giữ cẩn thận.
:::

Đầu tiên, hãy tạo một thư mục để lưu trữ tất cả những `keys` thứ tương tự của chúng ta thấy:

```bash
mkdir -p $HOME/cardano/keys
cd $HOME/cardano/keys
```

Hãy đảm bảo bạn đang bên trong  thư mục `keys` giống như: `cd $HOME/cardano/keys`

Tiết theo, tạo một cặp key **payment key-pair** sử dụng `cardano-cli`:

```bash
cardano-cli address key-gen \
--verification-key-file $HOME/cardano/keys/payment1.vkey \
--signing-key-file $HOME/cardano/keys/payment1.skey
```

`cardano-cli address key-gen` : tạo  **cặp key payment**.

`--verification-key-file` :Trỏ đến đường đẫn muốn lưu file `vkey`.

`--signing-key-file` : rỏ đến đường đẫn muốn lưu file `skey`.

Bây giờ bạn sẽ có hai tệp trong thư mục của mình `keys` trông giống như sau: 

```bash
$HOME/cardano/keys/
├── payment1.skey
└── payment1.vkey

0 directories, 2 files
```

Hãy cố gắng hiểu những khóa này được sử dụng để làm gì trong phần tổng quan:

- `.vkey` / **Public Verification Key** Khóa xác minh công khai: Được sử dụng để lấy địa chỉ ví **Cardano** , địa chỉ ví về cơ bản là giá trị chuỗi băm mà bạn chia sẻ với người dùng khác để cung cấp cho họ cách gửi `ada/tAda` hoặc các tài sản khác trong chuỗi khối Cardano vào ví của bạn.

    **File khóa xác minh sẽ trông giống như sau**:
    ```json
    {
        "type": "PaymentVerificationKeyShelley_ed25519",
        "description": "Payment Verification Key",
        "cborHex": "582056a29cba161c2a534adae32c4359fda6f90a3f6ae6990491237b28c1caeef0c4"
    }
    ```

- `.skey` / **Private Signing Key** Khóa ký riêng : Được sử dụng để ký / phê duyệt các giao dịch cho ví của bạn. Như bạn có thể tưởng tượng, điều rất quan trọng là không được để lộ tệp này ra công chúng và phải được bảo mật.

    **File khóa ký sẽ trông giống như sau**:
    ```json
    {
        "type": "PaymentSigningKeyShelley_ed25519",
        "description": "Payment Signing Key",
        "cborHex": "58208c61d557e1b8ddd82107fa506fab1b1565ec76fe96e8fb19a922d5460acd5a5b"
    }
    ```

Vì bây giờ chúng ta đã có **cặp khóa payment **, bước tiếp theo sẽ là tạo địa chỉ ví cho mạng `testnet`  như sau:

```bash
cardano-cli address build \
--payment-verification-key-file $HOME/cardano/keys/payment1.vkey \
--out-file $HOME/cardano/keys/payment1.addr \
--testnet-magic 1097911063
```

- `cardano-cli address build` : Tạo địa chỉ ví từ một file `vkey` .

- `--payment-verification-key-file` :đường đẫn đến file `vkey` được sử dụng để dẫn xuất..

- `--out-file` :  Đường dẫn lưu tệp địa chỉ ví.

- `--testnet-magic` : **NetworkMagic** của mạng mà bạn muốn sử dụng địa chỉ ví.

Bây giờ bạn có `payment1.vkey`, `payment1.skey` và `payment1.addr` trong thư mục `keys`. trông giống như sau:

```bash
$HOME/cardano/keys/
├── payment1.addr
├── payment1.skey
└── payment1.vkey

0 directories, 3 files
```

File `payment1.addr` chứa **địa chỉ ví** có phần mở rộng `vkey` Nó sẽ trông giống như thế này:

```
addr_test1vz95zjvtwm9u9mc83uzsfj55tzwf99fgeyt3gmwm9gdw2xgwrvsa5
```

:::note
 Bạn có thể lấy nhiều địa chỉ ví từ Khóa xác minh công khai cho các trường hợp sử dụng nâng cao hơn bằng cách sử dụng thành phần`cardano-addresses` . Chúng ta sẽ thảo luận chi tiết hơn tại đây: ***@TODO: link to article***

  - `mainnet` địa chỉ **bắt đầu** với chuỗi `addr1`. 
  - `testnet` địa chỉ **bắt đầu** với chuỗi `addr_test1`. 


 Nếu bạn muốn tạo một địa chỉ ví để sử dụng `mainnet`, vui lòng sử dụng `--mainnet` thay cho `--testnet-magic 1097911063`. Bạn có thể tìm hiểu thêm về các mạng blockchain Cardano khác nhau [tại đây](/docs/getting-started/running-cardano#mainnet/production).
:::

#### Truy vấn ví UTXO (Đầu ra giao dịch chưa được sử dụng) bằng`cardano-cli`

Bây giờ chúng ta đã có một địa chỉ ví , sau đó chúng ta có thể truy vấn UTXO của địa chỉ đó như sau:

```bash
cardano-cli query utxo \
--testnet-magic 1097911063 \
--address $(cat $HOME/cardano/keys/payment1.addr)
```

- `cardano-cli query utxo` :Truy vấn địa chỉ ví UTXO .

- `--testnet-magic 1097911063` : hỉ định rằng chúng tôi muốn truy vấn mạng testnet Cardano .

- `--address $(cat $HOME/cardano/keys/payment1.addr)` :Giá trị chuỗi địa chỉ ví mà chúng tôi muốn truy vấn, Trong trường hợp này, chúng tôi đọc nội dung của file `$HOME/cardano/keys/payment1.addr` sử dụng lệnh `cat` và chuyển giá trị đó cho tham số `--address`. Điều đó có nghĩa là bạn cũng có thể dán trực tiếp giá trị địa chỉ ví như sau: 
```
--address addr_test1vz95zjvtwm9u9mc83uzsfj55tzwf99fgeyt3gmwm9gdw2xgwrvsa5
```

Và nó trông như thế này:

```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
```


Bây giờ bạn có thể thấy kỳ lạ là không có nhiều thông tin trong kết quả được trả về lệnh, nhưng điều đó hoàn toàn bình thường vì không có UTXO khả dụng trong địa chỉ ví cụ thể mà chúng tôi đã truy vấn vì nó là một ví mới.

Bước tiếp theo của chúng tôi là yêu cầu một số `tAda` từ [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet).

Sau khi bạn yêu cầu một số `tAda` từ [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet) sau đó, chúng tôi có thể chạy lại truy vấn trên và bạn sẽ thấy thông báo như sau:

```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85     0        1000000000 lovelace
```

Kết quả này cho chúng ta biết rằng có một **UTXO** với số tiền 1.000.000.000 lovelaces trong địa chỉ ví của chúng ta , điều đó có nghĩa là ví của chúng ta có số dư là `1,000 tAda`. 

Kết quả chỉ ra rằng **UTXO** **transaction id** (`TxHash` - `TxId`) là `cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85` với  **transaction index** `TxIx` là `0`.

:::note
Trong chuỗi khối **Cardano** , `lovelace` là đơn vị sử dụng để đại diện cho `ada` trong các ** giao dịch** và **UTXO**. 

trong đó `1 ada` ibằng `1,000,000 lovelace`, Vì vậy trong tương lai chung ta sử dụng `lovelace` thay cho `ada` / `tAda`.

Bạn cũng có thể sử dụng `TxHash` để xem toàn bộ giao dịch thông qua Cardano Blockchain Explorer cho mạng có liên quan. Bạn có thể kiểm tra giao dịch cụ thể cho ví dụ UTXO tại đây:[f3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85](https://explorer.cardano-testnet.iohkdev.io/en/transaction?id=cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85)

Để tìm hiểu thêm về **UTXO (đầu ra giao dịch chưa sử dụng) ** và cách giao dịch hoạt động cho Mô hình UTXO , chúng tôi khuyên bạn nên xem bài giảng này của [Dr. Lars Brünjes](https://iohk.io/en/team/lars-brunjes), Education Director at [InputOutputGlobal](https://iohk.io).

<iframe width="100%" height="400" src="https://www.youtube.com/embed/EoO76YCSTLo?t=1854" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

:::

#### Tạo giao dịch đơn giản

Để hiểu rõ hơn về cách hoạt động của các giao dịch gửi `cardano-cli`, trước tiên hãy tạo một ví khác như sau:

**Tạo cặp key payment**

```bash
cardano-cli address key-gen \
--verification-key-file $HOME/cardano/keys/payment2.vkey \
--signing-key-file $HOME/cardano/keys/payment2.skey 
```

**tạo địa chỉ ví**
```bash
cardano-cli address build \
--payment-verification-key-file $HOME/cardano/keys/payment2.vkey \
--out-file $HOME/cardano/keys/payment2.addr \
--testnet-magic 1097911063
```

Sau khi hoàn tất, bạn sẽ có cấu trúc thư mục sau:

```bash
$HOME/cardano/keys
├── payment1.addr
├── payment1.skey
├── payment1.vkey
├── payment2.addr
├── payment2.skey
└── payment2.vkey

0 directories, 6 files
```

Truy vấn **UTXO** cho ví thứ hai `payment2.addr` cho bạn một kết quả quen thuộc:

```bash
cardano-cli query utxo \
--testnet-magic 1097911063 \
--address $(cat $HOME/cardano/keys/payment2.addr)
```

**Kết quả UTXO**
```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
```

Một lần nữa, điều này được mong đợi vì địa chỉ ví `payment2.addr` và khóa vừa được tạo gần đây. Vì vậy, chúng tôi hy vọng rằng chưa có ai gửi bất kỳ khoản tiền `tAda`  nào đến ví này.

Trong ví dụ này, bây giờ chúng ta có hai ví. Chúng tôi có thể gọi cho họ `payment1` và `payment2`. Bây giờ hãy nhớ rằng chúng tôi đã yêu cầu một số tAdatừ [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet) cho ví `payment1`,  và đó là cách chúng tôi có những thứ sau:

**ví** `payment1` : `1,000,000,000 lovelace`

```
UTXO
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85     0        1000000000 lovelace
```

**ví** `payment2` : `0 lovelace`
```
UTXO
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
```

Bây giờ giả sử chúng ta muốn gửi `250,000,000 lovelace` tới  `payment2` , và có thể làm điều đó?

Chúng tôi bắt đầu bằng cách lưu trữ các tham số giao thức trên chuỗi hiện tại vào tệp JSON :

**Tham số giao thức truy vấn**
```bash
cardano-cli query protocol-parameters \
  --testnet-magic 1097911063 \
  --out-file $HOME/cardano/protocol.json
```
Điều này sẽ tạo ra một tệp **JSON** trông như sau:
```json
{
    "poolDeposit": 500000000,
    "protocolVersion": {
        "minor": 0,
        "major": 4
    },
    "minUTxOValue": 1000000,
    "decentralisationParam": 0,
    "maxTxSize": 16384,
    "minPoolCost": 340000000,
    "minFeeA": 44,
    "maxBlockBodySize": 65536,
    "minFeeB": 155381,
    "eMax": 18,
    "extraEntropy": {
        "tag": "NeutralNonce"
    },
    "maxBlockHeaderSize": 1100,
    "keyDeposit": 2000000,
    "nOpt": 500,
    "rho": 3.0e-3,
    "tau": 0.2,
    "a0": 0.3
}
```


**Tạo giao dịch thô**

Tiếp theo, chúng tôi tạo một giao dịch thô như sau:

```bash
cardano-cli transaction build-raw \
--tx-in cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85#0 \
--tx-out $(cat $HOME/cardano/keys/payment2.addr)+0 \
--tx-out $(cat $HOME/cardano/keys/payment1.addr)+0 \
--fee 0 \
--out-file $HOME/cardano/tx.draft
```

`cardano-cli transaction build-raw` : Điều này cho biết `cardano-cli` xây dựng một giao dịch thô.

`--tx-in` : Điều này xác định cụ thể đầu vào UTXO mà giao dịch sẽ sử dụng, bạn có thể thêm bao nhiêu đầu vào UTXO tùy thích bằng cách thêm nhiều `--tx-in` trong đối số `cardano-cli` vào miễn là chúng có một đối số duy nhất `TxHash` và `TxIdx` tất cả các đầu vào của bạn.

`--tx-out` : Điều này chỉ định **địa chỉ ví đích** , tài sản và số lượng được gửi đến. Bạn có thể thêm bao nhiêu đầu ra UTXO tùy thích miễn là tổng đầu vào UTXO có thể đáp ứng các nội dung và số lượng được chỉ định bởi đầu ra.

`--fee` :  Điều này chỉ định số tiền phí của giao dịch trong `lovelace`.

`--out-file` : Đây là đường dẫn đến tệp giao dịch sẽ được tạo.

Trong trường hợp này, chúng tôi chỉ đang xây dựng một giao dịch nháp để tính toán xem giao dịch đó sẽ cần bao nhiêu phí. Chúng ta có thể làm điều đó bằng cách thực hiện lệnh sau:

```bash
cardano-cli transaction calculate-min-fee \
--tx-body-file $HOME/cardano/tx.draft \
--tx-in-count 1 \
--tx-out-count 2 \
--witness-count 1 \
--testnet-magic 1097911063 \
--protocol-params-file $HOME/cardano/protocol.json
```

Bạn sẽ thấy một cái gì đó như thế này cho đầu ra:

```bash
174169 Lovelace
```

Bạn sẽ nhận thấy rằng chúng tôi sử dụng số liệu `protocol.json` chúng tôi đã truy vấn cách đây một thời gian để tính phí giao dịch:

```
--protocol-params-file $HOME/cardano/protocol.json
```

Đó là do kết quả tính phí giao dịch thay đổi tùy thuộc vào các tham số giao thức trên chuỗi..

 `--witness-count 1` Về cơ bản, nó cho biết `cardano-cli` rằng sẽ chỉ có 1 khóa ký được yêu cầu để giao dịch này hợp lệ. Vì đầu vào UTXO liên quan đến giao dịch này sẽ chỉ đến từ ví `payment1` , do đó, điều đó có nghĩa là chúng tôi thực sự chỉ cần khóa `1`  để ký giao dịch.
 
Sau đó, cuối cùng chúng ta có thể xây dựng giao dịch thực như vậy:

```bash
cardano-cli transaction build-raw \
--tx-in cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85#0 \
--tx-out $(cat $HOME/cardano/keys/payment2.addr)+250000000 \
--tx-out $(cat $HOME/cardano/keys/payment1.addr)+749825831 \
--fee 174169 \
--out-file $HOME/cardano/tx.draft
```

Tóm lại, Chúng tôi muốn gửi `250,000,000 lovelace` từ ví `payment1` tới ví `payment2`. sau cùng ví `payment1`có **UTXO**:

```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85     0        1000000000 lovelace
```

vì vậy chúng ta sử dụng `TxHash` `cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85` and `TxIx` `0` làm `--tx-input`. 

```bash
--tx-in cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85#0
```

Sau đó chúng tôi dùng `cardano-cli` chuyển `250,000,000 lovelace` tới ví   `payment2`.

```bash
--tx-out $(cat $HOME/cardano/keys/payment2.addr)+250000000
```

Bây giờ ví 1 đã thay đổi còn `750000000 lovelace` vì vậy gưởi lại cho chính mình sau:

```bash
--tx-out $(cat $HOME/cardano/keys/payment1.addr)+749825831
```

Now an important question you might ask here is that, why is the amount `749825831 lovelace`? Well remember that we calculated the fee to be `174169 lovelace` and someone has to shoulder the transaction fee, so we decide that `payment` should pay for the fee with the change `lovelace` amount. So we calculate that `750000000 - 174169 = 749825831` and so the total change would be `749825831 lovelace`.

We then specify the transaction fee like so:

Bây giờ một câu hỏi quan trọng bạn có thể hỏi ở đây là, tại sao lại là số tiền `749825831 lovelace`? Hãy nhớ rằng chúng tôi đã tính toán phí `174169 lovelace ` và ai đó phải chịu phí giao dịch, vì vậy chúng tôi quyết định rằng `payment` sẽ trả phí bằng `lovelace`. Vì vậy, chúng tôi tính toán điều đó `750000000 - 174169 = 749825831` và do đó tổng còn lại sẽ là `749825831 lovelace`.

Sau đó, chúng tôi chỉ định phí giao dịch như sau:

```
--fee 174169
```

Và sau đó chúng tôi chỉ định nơi chúng tôi sẽ lưu tệp giao dịch:

```
--out-file $HOME/cardano/tx.draft
```

Bây giờ chúng tôi đã có tệp giao dịch, chúng tôi phải ký vào giao dịch để chứng minh rằng chúng tôi là chủ sở hữu của UTXO đầu vào đã được sử dụng.

```bash
cardano-cli transaction sign \
--tx-body-file $HOME/cardano/tx.draft \
--signing-key-file $HOME/cardano/keys/payment1.skey \
--testnet-magic 1097911063 \
--out-file $HOME/cardano/tx.signed
```

`--signing-key-file $HOME/cardano/keys/payment1.skey` : Đối số này cho biết rằng `cardano-cli` chúng ta sẽ sử dụng chữ ký `payment1.skey` cho giao dịch này

Cuối cùng, chúng tôi gửi giao dịch tới blockchain!

```bash
cardano-cli transaction submit \
--tx-file $HOME/cardano/tx.signed \
--testnet-magic 1097911063 
```
:::important
Nếu bạn đã đợi quá lâu để ký và gửi giao dịch, phí có thể đã thay đổi trong thời gian đó và do đó giao dịch có thể bị mạng từ chối. Để giải quyết vấn đề này, bạn chỉ cần **tính toán lại các khoản phí, xây dựng lại giao dịch, ký tên và gửi nó **!
:::

Kiểm tra số dư của cả hai ví `payment1` và `payment2`:

```bash
# payment1 wallet UTXO
❯ cardano-cli query utxo --testnet-magic 1097911063 --address $(cat $HOME/cardano/keys/payment1.addr)

                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
63eeeb7e43171aeea0b3d53c5a36236cf9af92d5ee39e99bfadfe0237c46bd91     1        749825303 lovelace

# payment2 wallet UTXO
❯ cardano-cli query utxo --testnet-magic 1097911063 --address $(cat $HOME/cardano/keys/payment2.addr)
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
63eeeb7e43171aeea0b3d53c5a36236cf9af92d5ee39e99bfadfe0237c46bd91     0        250000000 lovelace
```

Như chúng ta có thể thấy, `payment2` có **UTXO**  với số tiền `250,000,000 lovelace`. `payment1` có **UTXO** mới vơi số tiền là `749,825,303 lovelace`.

Xin chúc mừng, Bạn đã tạo và gửi giao dịch `Cardano` `cardano-cli` đầu tiên của mình bằng cách sử dụng ! 🎉🎉🎉

#### Tạo ví bằng `cardano-wallet`

:::note
Hướng dẫn này giả định rằng bạn đã cài đặt cardano-walletvào hệ thống của mình. Nếu không, bạn có thể tham khảo Hướng dẫn [cài đặtcardano-wallet](/docs/getting-started/installing-cardano-wallet) để bbiết cách thực hiện.

Chúng tôi sẽ sử dụng đường dẫn `$HOME/cardano/wallets` để lưu trữ tất cả các `cardano-wallet` tệp liên quan làm ví dụ, vui lòng thay thế nó bằng thư mục bạn đã chọn để lưu trữ các tệp.
:::

:::important
Vui lòng đảm bảo rằng `cardano-node` đã kết nối và đồng bộ xong với mạng `testnet`trước khi tiếp tục.
:::

:::warning
Trong môi trường sản xuất, việc lưu trữ ví / khóa trong máy chủ công cộng có thể không phải là ý kiến ​​hay trừ khi bạn biết mình đang làm gì.
:::

Đầu tiên, hãy tạo một thư mục để lưu trữ tất cả `wallets`:

```bash
mkdir -p $HOME/cardano/wallets
```

**Starting cardano-wallet as a REST API server**

Chúng tôi sẽ tập trung vào [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) cung cấp `cardano-wallet`. để tương tác với API, trước tiên chúng ta phải khởi động máy chủ.

```bash
cardano-wallet serve \
--port 1337 \
--testnet $HOME/cardano/testnet-byron-genesis.json \
--database $HOME/cardano/wallets/db \
--node-socket $CARDANO_NODE_SOCKET_PATH
```

`cardano-wallet serve` : chạy `cardano-wallet` như một máy chủ cung cấp [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer).

`--port` :  Chỉ định cổng mà máy chủ web sẽ lắng nghe bất kỳ yêu cầu nào.

> Bạn có thể chọn bất cứ `port` nào bạn thích, nhưng nên sử dụng  `port` từ `1024` trỏ lên. Xem [Registered Port](https://www.sciencedirect.com/topics/computer-science/registered-port)để biết thêm thông tin.

`--testnet` : Chỉ định đường dẫn tệp gốc  **Byron** cho mạng `testnet` 

> Điều này cũng phải khớp với tệp genesis mà `cardano-node` đang kết nối. Nếu bạn muốn kết nối với `mainnet` thì sử dụng `--mainnet` flag và file gốc là `mainnet` **Byron**.

`--database` : Chỉ định đường dẫn nơi cơ sở dữ liệu ví sẽ được lưu.

> Điều quan trọng cần lưu ý là chức năng tạo ví yêu cầu cụm mật khẩu nên tất cả dữ liệu ví sẽ được mã hóa bằng cụm mật khẩu.

`--node-socket` : Chỉ định `cardano-node` đường dẫn socket sẽ được sử dụng `cardano-wallet` để giao tiếp với nút.

>  `cardano-node` sử dụng **IPC (Inter-Process-Communication)** cho việc giao tiếp vớ các thành phần **Cardano** như `cardano-cli`, `cardano-wallet` và `cardano-db-sync`. Trong **Linux** và **MacOS** nó đực gọi như sau [unix sockets](https://en.wikipedia.org/wiki/Unix_domain_socket) và [Named Pipes](https://docs.microsoft.com/en-us/windows/win32/ipc/named-pipes) trong **Windows**.
> 
> Đây là ví dụ đối số `--socket-path` cho  **Linux**:
```
--socket-path $HOME/cardano/db/node.socket
```
> Như bạn có thể thấy đối số trỏ đến một tệp vì các ổ cắm unix được biểu diễn dưới dạng tệp (giống như mọi thứ khác trong Linux ). Trong trường hợp này, chúng tôi đặt tệp socket vào thư mục `db` mà chúng tôi vừa tạo trước đó.
> 
> Trong **Windows**, Đối số `--socket-path` trông giông như sau:
```
--socket-path "\\\\.\\pipe\\cardano-node-testnet"
```
> Khi bạn nhận thấy nó gần giống như một mạng `URI` hoặc một mạng `Path` hơn là một tệp, đây là sự khác biệt chính mà bạn sẽ phải biết tùy thuộc vào hệ điều hành của mình. Bạn có thể thay thế chuỗi `cardano-node-testnet` trong đối số thành bất kỳ thứ gì bạn thích, đường dẫn ví dụ này đặc biệt được sử dụng trong [Daedalus Testnet Wallet](https://daedaluswallet.io) cho **Windows**.

Khi máy chủ đang chạy, bạn sẽ thấy một số thông tin như thế này (trong số những thứ khác):

```
[cardano-wallet.network:Info:12] [2021-06-03 13:48:24.82 UTC] Protocol parameters for tip are:
 Decentralization level: 100.00%
 Transaction parameters: [Fee policy: 155381.0 + 44.0x, Tx max size: 16384]
 Desired number of pools: 500
 Minimum UTxO value: 1.000000
 Eras:
   - byron from -0
   - shelley from 74
   - allegra from 102
   - mary from 112

Slotting parameters for tip are:
 Slot length:        1s
 Epoch length:       432000
 Active slot coeff:  5.0e-2
 Security parameter: 2160 block


[cardano-wallet.main:Info:4] [2021-06-03 13:48:24.86 UTC] Wallet backend server listening on http://127.0.0.1:1337/
```

**Kiểm tra thông tin máy chủ Wallet**

The first thing we can do to test if the wallet server is working correctly is to query the network information via the API.

```bash
curl --url http://localhost:1337/v2/network/information | jq
```

The result should be something like this: 

```json
{
  "node_era": "mary",
  "network_tip": {
    "slot_number": 408744,
    "absolute_slot_number": 28359144,
    "time": "2021-06-03T13:52:40Z",
    "epoch_number": 135
  },
  "next_epoch": {
    "epoch_start_time": "2021-06-03T20:20:16Z",
    "epoch_number": 136
  },
  "sync_progress": {
    "status": "ready"
  },
  "node_tip": {
    "height": {
      "unit": "block",
      "quantity": 2639489
    },
    "slot_number": 408722,
    "absolute_slot_number": 28359122,
    "time": "2021-06-03T13:52:18Z",
    "epoch_number": 135
  }
}
```

It is important to make sure that the `sync_progress.status` is equal to `ready` before proceeding.

**Creating the wallet**

To create a wallet we must first generate a wallet **recovery phrase** using the `cardano-wallet` in the CLI.

```bash
cardano-wallet recovery-phrase generate | jq -c --raw-input 'split(" ")'
```

You should get a **24-word mnemonic seed** in return similar to this: 

```
["shift", "badge", "heavy", "action", "tube", "divide", "course", "quality", "capable", "velvet", "cart", "marriage", "vague", "aware", "maximum", "exist", "crime", "file", "analyst", "great", "cabbage", "course", "sad", "apology"]
```

We can now create a **Cardano** wallet using the `/v2/wallets` API endpoint:

```bash
curl --request POST \
  --url http://localhost:1337/v2/wallets \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "test_cf_1",
	"mnemonic_sentence": ["shift", "badge", "heavy", "action", "tube", "divide", "course", "quality", "capable", "velvet", "cart", "marriage", "vague", "aware", "maximum", "exist", "crime", "file", "analyst", "great", "cabbage", "course", "sad", "apology"],
	"passphrase": "test123456"
}' | jq
```

Our requests payload data is composed of:

`name` : The name of the wallet.

`passphrase` : Sets the security phrase to protect the funds inside the wallet. It will be required everytime you need write access to the wallet, more specifically sending assets.

`mnemonic_sentence` : This is the wallet **recovery phrase** formatted into a `JSON` array.

If succesful, you should see something like this: 

```json
{
  "address_pool_gap": 20,
  "passphrase": {
    "last_updated_at": "2021-06-03T14:25:18.2676524Z"
  },
  "balance": {
    "available": {
      "unit": "lovelace",
      "quantity": 0
    },
    "total": {
      "unit": "lovelace",
      "quantity": 0
    },
    "reward": {
      "unit": "lovelace",
      "quantity": 0
    }
  },
  "id": "5076b34c6949dbd150eb9c39039037543946bdce",
  "state": {
    "status": "syncing",
    "progress": {
      "unit": "percent",
      "quantity": 0
    }
  },
  "name": "test_cf_1",
  "assets": {
    "available": [],
    "total": []
  },
  "tip": {
    "height": {
      "unit": "block",
      "quantity": 0
    },
    "slot_number": 0,
    "absolute_slot_number": 0,
    "time": "2019-07-24T20:20:16Z",
    "epoch_number": 0
  },
  "delegation": {
    "next": [],
    "active": {
      "status": "not_delegating"
    }
  }
}
```

Initially, the newly created/restored wallet will need to be synced before it can be used. You can verify if the wallet is already synced by executing the following request:

```bash
curl --url http://localhost:1337/v2/wallets/5076b34c6949dbd150eb9c39039037543946bdce | jq '.state'
```

***It is important to note that the `5076b34c6949dbd150eb9c39039037543946bdce` string is actually the `wallet.id` of the previously generated wallet.***

You should see something like this:

```json
{
  "status": "ready"
}
```

**Receiving tAda (test ada)**

Now that we have created a wallet, we can now request some tAda from the **Testnet Faucet**. But before we can do that we must first get a cardano address for our wallet.

We can do that by executing the command:

```bash
curl --url 'http://localhost:1337/v2/wallets/5076b34c6949dbd150eb9c39039037543946bdce/addresses?state=unused' | jq '.[0]'
```

The result should be something like this:

```json
{
  "derivation_path": [
    "1852H",
    "1815H",
    "0H",
    "0",
    "0"
  ],
  "id": "addr_test1qzf9q3qjcaf6kxshwjfw9ge29njtm56r2a08g49l79xgt4je0592agqpwraqajx2dsu2sxj64uese5s4qum293wuc00q7j6vsp",
  "state": "unused"
}
```
It is important to note that the parameter of this request is the **wallet id** of the target wallet you want to get the address. In this case it is `5076b34c6949dbd150eb9c39039037543946bdce` our previously generated wallet.

We are basically querying the first wallet address that has not been used just yet, Indicated by `state: "unused"`. As we can see the wallet address value is: `addr_test1qzf9q3qjcaf6kxshwjfw9ge29njtm56r2a08g49l79xgt4je0592agqpwraqajx2dsu2sxj64uese5s4qum293wuc00q7j6vsp"`

Now we can finally request some `tAda` for the wallet address from the [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet).

Once you requested some `tAda` from the [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet), we can then check if it has arrived into our wallet like so:

```bash
curl --url http://localhost:1337/v2/wallets/5076b34c6949dbd150eb9c39039037543946bdce | jq '.balance'
```

You should see something like this:

```json
{
  "available": {
    "unit": "lovelace",
    "quantity": 1000000000
  },
  "total": {
    "unit": "lovelace",
    "quantity": 1000000000
  },
  "reward": {
    "unit": "lovelace",
    "quantity": 0
  }
}
```

As we can see here we have a total of `1,000,000,000 lovelace` available to spend that we received from the [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet).

#### Creating simple transactions

To have a clearer understanding of how sending transactions work using `cardano-wallet`, first lets create another wallet like so:

**Generate recovery-phrase**

```bash
cardano-wallet recovery-phrase generate | jq -c --raw-input 'split(" ")'
```
**Recovery-phrase result**

```
["then", "tattoo", "copy", "glance", "silk", "kitchen", "kingdom", "pioneer", "off", "path", "connect", "artwork", "alley", "smooth", "also", "foil", "glare", "trouble", "erupt", "move", "position", "merge", "scale", "echo"]
```

**Create Wallet Request**
```bash
curl --request POST \
  --url http://localhost:1337/v2/wallets \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "test_cf_2",
	"mnemonic_sentence": ["then", "tattoo", "copy", "glance", "silk", "kitchen", "kingdom", "pioneer", "off", "path", "connect", "artwork", "alley", "smooth", "also", "foil", "glare", "trouble", "erupt", "move", "position", "merge", "scale", "echo"],
	"passphrase": "test123456"
}' | jq
```

**Create Wallet Result**

```json
{
  "address_pool_gap": 20,
  "passphrase": {
    "last_updated_at": "2021-06-04T11:39:06.8887923Z"
  },
  "balance": {
    "available": {
      "unit": "lovelace",
      "quantity": 0
    },
    "total": {
      "unit": "lovelace",
      "quantity": 0
    },
    "reward": {
      "unit": "lovelace",
      "quantity": 0
    }
  },
  "id": "4a64b453ad1c1d33bfec4d3ba90bd2456ede35bb",
  "state": {
    "status": "syncing",
    "progress": {
      "unit": "percent",
      "quantity": 0
    }
  },
  "name": "test_cf_2",
  "assets": {
    "available": [],
    "total": []
  },
  "tip": {
    "height": {
      "unit": "block",
      "quantity": 0
    },
    "slot_number": 0,
    "absolute_slot_number": 0,
    "time": "2019-07-24T20:20:16Z",
    "epoch_number": 0
  },
  "delegation": {
    "next": [],
    "active": {
      "status": "not_delegating"
    }
  }
}
```

We now have the following wallets:

| WalletId                                        | Wallet Name       | Balance(Lovelace)     |
| --------                                        | ---------         | ----------            |
| 5076b34c6949dbd150eb9c39039037543946bdce        | test_cf_1         | 1000000000            |
| 4a64b453ad1c1d33bfec4d3ba90bd2456ede35bb        | test_cf_2         | 0                     | 

Now let's say that we want to send `250,000,000 lovelaces` to `test_cf_2` wallet. Well first we have to get `test_cf_2` wallet address like so:

```bash
curl --url 'http://localhost:1337/v2/wallets/4a64b453ad1c1d33bfec4d3ba90bd2456ede35bb/addresses?state=unused' | jq '.[0]'
```

and we should see something like this:

```json
{
  "derivation_path": [
    "1852H",
    "1815H",
    "0H",
    "0",
    "0"
  ],
  "id": "addr_test1qzyfnjk3zmgzmvnnvnpeguv6se2ptjj3w3uuh30llqe5xdtzdduxxvke8rekwukyn0qt9g5pahasrnrdmv7nr86x537qxdgza0",
  "state": "unused"
}
```

So now that we have `test_cf_2` wallet address `addr_test1qzyfnjk3zmgzmvnnvnpeguv6se2ptjj3w3uuh30llqe5xdtzdduxxvke8rekwukyn0qt9g5pahasrnrdmv7nr86x537qxdgza0`. We can now use it to send some `tAda` to it from `test_cf_1` wallet like so:

```bash
curl --request POST \
  --url http://localhost:1337/v2/wallets/5076b34c6949dbd150eb9c39039037543946bdce/transactions \
  --header 'Content-Type: application/json' \
  --data '{
	"passphrase": "test123456",
	"payments": [
		{
			"address": "addr_test1qzyfnjk3zmgzmvnnvnpeguv6se2ptjj3w3uuh30llqe5xdtzdduxxvke8rekwukyn0qt9g5pahasrnrdmv7nr86x537qxdgza0",
			"amount": {
				"quantity": 250000000,
				"unit": "lovelace"
			}
		}
	]
}'
```

:::note
Remember, we use the `test_cf_1` wallet id in the `http://localhost:1337/v2/wallets/<walletId>` endpoint, because we want the `test_cf_1` to send to `test_cf_2` wallet address.
:::

Now we can check `test_cf_2` wallet balance like so:

```bash
curl --url http://localhost:1337/v2/wallets/4a64b453ad1c1d33bfec4d3ba90bd2456ede35bb | jq '.balance'
```

And we should see that indeed the `250,000,000 tAda` has been received (***you might need to wait for a few seconds***).

```json
{
  "available": {
    "unit": "lovelace",
    "quantity": 250000000
  },
  "total": {
    "unit": "lovelace",
    "quantity": 250000000
  },
  "reward": {
    "unit": "lovelace",
    "quantity": 0
  }
}
```

Checking `test_cf_1` wallet balance should show you something like this:

```json
{
  "available": {
    "unit": "lovelace",
    "quantity": 749831199
  },
  "total": {
    "unit": "lovelace",
    "quantity": 749831199
  },
  "reward": {
    "unit": "lovelace",
    "quantity": 0
  }
}
```

Our wallets should now be the following:

| WalletId                                        | Wallet Name       | Balance(Lovelace)     |
| --------                                        | ---------         | ----------            |
| 5076b34c6949dbd150eb9c39039037543946bdce        | test_cf_1         | 749831199             |
| 4a64b453ad1c1d33bfec4d3ba90bd2456ede35bb        | test_cf_2         | 250000000             |


:::note

It is important to note that `cardano-wallet` has automatically determined the fee for the transaction to send `250,000,000 lovelace` from wallet `test_cf_1` to `test_cf_2` and `cardano_wallet` has deducted the fee from `test_cf_1` wallet automatically.

:::

:::tip

Full documentation of the `cardano-wallet` [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) can be found here: [https://input-output-hk.github.io/cardano-wallet/api/edge](https://input-output-hk.github.io/cardano-wallet/api/edge)

:::

Congratulations, You have created and sent your first **Cardano** transaction using `cardano-wallet`! 🎉🎉🎉


