---
id: creating-wallet-faucet
title: Khám phá ví Cardano
sidebar_label: Khám phá ví Cardano
description: Bài viết này giải thích cách bạn có thể tạo các loại Ví Cardano khác nhau và cách bạn có thể nhận một số tAda (quảng cáo thử nghiệm) từ vòi.
#image: ./img/og-developer-portal.png
--- 

### Tổng quat 

Trong hướng dẫn này, chúng tôi sẽ chỉ cho bạn cách tạo ví Cardano , nhận một số `tAda` (**thử nghiệm ada**) trong mạng `testnet` và  ví dụ cơ bản gửi các giao dịch. Chúng ta sẽ khám phá các công cụ  `cardano-cli` và `cardano-wallet` làm việc như thế nào.

:::Lưu ý
Hướng dẫn này giả định rằng bạn đã cài đặt `cardano-node` và `cardano-cli` trong hệ thống của bạn. Nếu không, bạn có thể tham khảo Hướng dẫn [Installing cardano-node](/docs/dr-lars-lession/setup-node-testnet) để biết hướng dẫn về cách thực hiện điều đó.

Bạn cũng phải kết nối mạng của mình `cardano-node` và `testnet` đảm bảo rằng nó đã được đồng bộ hóa hoàn toàn.

Nếu bạn không chắc chắn về cách thực hiện điều đó, bạn nên đọc Hướng dẫn [Running cardano-node](/docs/get-started/running-cardano) trước khi tiếp tục.
:::

### Ví Cardano

Vì vậy, bạn đã cài đặt `cardano-node` và làm cho nó chạy, thậm chí bạn có thể đã cố gắng truy vấn một số dữ liệu blockchain đơn giản (Nếu bạn đọc Hướng dẫn [Running cardano-node](/docs/get-started/running-cardano)). Nhưng làm thế nào để bạn thực sự tạo một ví **Cardano**, nhận và gửi một số `ada` hoặc `tAda` mã thông báo?

Trước tiên, chúng ta phải xem xét các ứng dụng chúng ta có thể sử dụng để tạo ví.

- [Daedalus](https://daedaluswallet.io/) : **Daedalus Wallet** là ví đầy đủ chính thức của **Cardano**, Nó là một [GUI (Graphical User Interface)](https://en.wikipedia.org/wiki/Graphical_user_interface) cho Máy tính để bàn (**Linux**, **MacOS**, **Windows**). Điều đó có nghĩa là người dùng sẽ được sử dụng giao diện người dùng đẹp (Giao diện người dùng), các nút và bố cục để tương tác với chuỗi khối **Cardano**.

   Về cơ bản, ví đầy đủ có nghĩa là nó phải đồng bộ hóa và tải xuống blockchain trước khi người dùng có thể gửi giao dịch và tương tác với ví.
    
    Nó là mã nguồn mở chủ yếu được phát triển bởi [InputOutputGlobal](https://iohk.io/),  công ty phát triển đằng sau giao thức  **Cardano** và cũng là một trong ba thực thể nền tảng của dự án **Cardano**.
- [Yoroi](https://yoroi-wallet.com/#/) : **Yoroi Wallet** là ví nhẹ chính thức của **Cardano**, Nó có sẵn dưới dạng **ứng dụng di động** và dưới dạng **tiện ích mở rộng của trình duyệt** . 
  
  Ví nhẹ có nghĩa là người dùng sẽ không bị buộc phải tải xuống toàn bộ chuỗi khối, Thay vào đó Yoroi có một máy chủ phụ trợ và tải dữ liệu chuỗi khối cho người dùng mà người dùng không để lộ dữ liệu nhạy cảm ( Khóa riêng ) cho máy chủ và cuối cùng là duy trì bảo mật. Điều này mang lại trải nghiệm nhanh hơn cho người dùng do thực tế là người dùng sẽ không phải đợi hàng giờ trước khi có thể sử dụng ví.

  Nó là mã nguồn mở chủ yếu được phát triển bởi [Emurgo](https://emurgo.io), Một công ty có trụ sở tại [Japan](https://en.wikipedia.org/wiki/Japan) tập trung vào Doanh nghiệp và Doanh nghiệp áp dụng chuỗi khối Cardano . Nó cũng là một trong ba thực thể nền tảng của dự án Cardano .

- [cardano-wallet](https://github.com/input-output-hk/cardano-wallet) : `cardano-wallet` is a [CLI (Command Line Interface)](https://en.wikipedia.org/wiki/Command-line_interface) là một ứng dụng CLI (Giao diện Dòng lệnh) cung cấp các chức năng của ví Cardano thông qua các tham số dòng lệnh hoặc thông qua [Web API](https://en.wikipedia.org/wiki/Web_API). 

 Đây là phần mềm phụ trợ ví mà ví **Daedalus** sử dụng ẩn nên nó cũng là mã nguồn mở, một trong nhiều thành phần phần mềm Cardano dựa trên Haskell được viết bởi [InputOutputGlobal](https://iohk.io/).

 Bạn có thể tìm tài liệu `cardano-wallet` **REST API** tại đây: [https://input-output-hk.github.io/cardano-wallet/api/edge/](https://input-output-hk.github.io/cardano-wallet/api/edge/)

- [cardano-cli](https://github.com/input-output-hk/cardano-node) : `cardano-cli` cũng là một ứng dụng [CLI (Command Line Interface)](https://en.wikipedia.org/wiki/Command-line_interface) cung cấp các chức năng của ví `Cardano` . Nhưng `cardano-cli` mục đích là hướng nhiều hơn đến các chức năng chung của Cardano như tạo khóa , xây dựng và gửi giao dịch , quản lý chứng chỉ nhóm cổ phần , các truy vấn blockchain đơn giản như địa chỉ ví `UTXO` và hơn thế nữa.

    Nó là một phần của `cardano-node`, vì vậy nếu bạn [compile and install](/docs/get-started/installing-cardano-node) `cardano-node` bạn cũng nên có `cardano-cli`.Nó là một trong nhiều thành phần phần mềm Cardano dựa trên Haskell được viết bởi[InputOutputGlobal](https://iohk.io/).

:::warning
cảnh báo Luôn tải xuống ví từ các nguồn chính thức. Có rất nhiều ví giả mạo, phần mềm độc hại giả danh ví Cardano có khả năng ăn tokens / assets của bạn.
:::

### Tạo ví

Như đã đề cập trước đây, trong hướng dẫn này, chúng tôi sẽ chỉ tập trung vào `cardano-cli` và `cardano-wallet` vì chúng cung cấp một số mức độ khả năng lập trình rất quan trọng khi chúng ta nói về tích hợp Cardano cho các loại trường hợp sử dụng khác nhau.


#### Tạo ví bằng `cardano-cli`

:::note
In this section, We will use the path `$HOME/cardano` to store all the `cardano-cli` related files as an example, please replace it with the directory you have choosen to store the files.
:::

:::important
Please make sure your `cardano-node` is connected and synchronized to the `testnet` network before proceeding.
:::

:::warning
In a production environment, it might not be a good idea to store wallets / keys in a public server unless you know what you are doing.
:::

First, lets create a directory to store all our `keys` like so:

```bash
mkdir -p $HOME/cardano/keys
```

Make sure we are inside the `keys` directory like so: `cd $HOME/cardano/keys`

Next, we generate our **payment key-pair** using `cardano-cli`:

```bash
cardano-cli address key-gen \
--verification-key-file $HOME/cardano/keys/payment1.vkey \
--signing-key-file $HOME/cardano/keys/payment1.skey
```

`cardano-cli address key-gen` : generates a **payment key-pair**.

`--verification-key-file` : points to the path where you want to save the `vkey` file.

`--signing-key-file` : points to the path where you want to save the `skey` file.

You should now have two files in your `keys` directory like so: 

```bash
$HOME/cardano/keys/
├── payment1.skey
└── payment1.vkey

0 directories, 2 files
```

Lets try to understand what these keys are used for in a very high-level overview that is relevant to our topic:

- `.vkey` / **Public Verification Key** : Is used to derive a **Cardano** wallet address, a wallet address is basically the hash string value that you share to other users to provide them a way to send `ada` / `tAda` or other assets in the **Cardano** blockchain into your wallet.

    **The verification key file should look something like this**:
    ```json
    {
        "type": "PaymentVerificationKeyShelley_ed25519",
        "description": "Payment Verification Key",
        "cborHex": "582056a29cba161c2a534adae32c4359fda6f90a3f6ae6990491237b28c1caeef0c4"
    }
    ```

- `.skey` / **Private Signing Key** : Is used to sign / approve transactions for your wallet. As you can imagine, it is very important to not expose this file to the public and must be kept secure.

    **The signing key file should look something like this**:
    ```json
    {
        "type": "PaymentSigningKeyShelley_ed25519",
        "description": "Payment Signing Key",
        "cborHex": "58208c61d557e1b8ddd82107fa506fab1b1565ec76fe96e8fb19a922d5460acd5a5b"
    }
    ```

Since we now have our **payment key-pair**, the next step would be to generate a **wallet address** for the `testnet` network like so:

```bash
cardano-cli address build \
--payment-verification-key-file $HOME/cardano/keys/payment1.vkey \
--out-file $HOME/cardano/keys/payment1.addr \
--testnet-magic 1097911063
```

- `cardano-cli address build` : Generates a **wallet address** from a `vkey` file.

- `--payment-verification-key-file` : The path to the `vkey` file to be used for the derivation.

- `--out-file` : The path to save the wallet address file.

- `--testnet-magic` : The **NetworkMagic** of the network that where you want to use the wallet address.

You should now have `payment1.vkey`, `payment1.skey` and `payment1.addr` in your `keys` directory. It should look something like this:

```bash
$HOME/cardano/keys/
├── payment1.addr
├── payment1.skey
└── payment1.vkey

0 directories, 3 files
```

The `payment1.addr` file contains the derived **wallet address** from your `vkey` file. It should look something like this:

```
addr_test1vz95zjvtwm9u9mc83uzsfj55tzwf99fgeyt3gmwm9gdw2xgwrvsa5
```

:::note
 You can derive more than one **wallet address** from a **Public Verification Key** for more advanced use-cases using `cardano-addresses` component. Which we discuss in more details here: ***@TODO: link to article***

  - `mainnet` addresses are **prefixed** with the string value `addr1`. 
  - `testnet` addresses are **prefixed** with the string value `addr_test1`. 


 If you want to create a wallet address to be used on `mainnet`, please use the `--mainnet` flag instead of `--testnet-magic 1097911063`. You can learn more about the different **Cardano** blockchain networks [here](/docs/get-started/running-cardano#mainnet--production).
:::

#### Querying the wallet **UTXO (Unspent Transaction Output)** with `cardano-cli`

Now that we have a **wallet address**, we can then query the **UTXO** of the address like so: 

```bash
cardano-cli query utxo \
--testnet-magic 1097911063 \
--address $(cat $HOME/cardano/keys/payment1.addr)
```

- `cardano-cli query utxo` : Queries the wallet address **UTXO**.

- `--testnet-magic 1097911063` : Specifies that we want to query the `testnet` **Cardano** network.

- `--address $(cat $HOME/cardano/keys/payment1.addr)` : The **wallet address** string value that we want to query, In this case we read the contents of `$HOME/cardano/keys/payment1.addr` using the `cat` command and we pass that value to the `--address` flag. That means you could also directly paste the **wallet address** value like so: 
```
--address addr_test1vz95zjvtwm9u9mc83uzsfj55tzwf99fgeyt3gmwm9gdw2xgwrvsa5
```

You should see something like this:

```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
```


Now you might find it odd that there is not much information in the result that was returned the command, but that is totally normal as there are no available **UTXO** in the specific **wallet address** that we have queried just yet as it is a new wallet.

Our next step is to request some `tAda` from the [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet).

Once you requested some `tAda` from the [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet) we can then run the query again and you should see something like this:

```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85     0        1000000000 lovelace
```

This result tells us that there is one **UTXO** with the amount of 1,000,000,000 `lovelaces` in our specific **wallet address**, that means our wallet has a balance of `1,000 tAda`. 

The result also specifies that the **UTXO** **transaction id** (`TxHash` / `TxId`) is `cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85` with the **transaction index** of `0`.

:::note
In the **Cardano** blockchain, the `lovelace` is the unit used to represent `ada` in **transactions** and **UTXO**. 

Where `1 ada` is equal to `1,000,000 lovelace`, so moving forward we will be using `lovelace` instead of `ada` / `tAda`.

You can also use the `TxHash` to view the complete transaction via the **Cardano Blockchain Explorer** for the relevant network. You can check the specific transaction for the example **UTXO** here: [f3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85](https://explorer.cardano-testnet.iohkdev.io/en/transaction?id=cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85)

To learn more about **UTXO (unspent transaction output)** and how transactions work for the **UTXO Model**, we recommend watching this lecture by [Dr. Lars Brünjes](https://iohk.io/en/team/lars-brunjes), Education Director at [InputOutputGlobal](https://iohk.io).

<iframe width="100%" height="400" src="https://www.youtube.com/embed/EoO76YCSTLo?t=1854" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

:::

#### Creating simple transactions

To have a clearer understanding of how sending transactions work using `cardano-cli`, first lets create another wallet like so:

**Generate payment key-pair**
```bash
cardano-cli address key-gen \
--verification-key-file $HOME/cardano/keys/payment2.vkey \
--signing-key-file $HOME/cardano/keys/payment2.skey 
```

**Generate wallet address**
```bash
cardano-cli address build \
--payment-verification-key-file $HOME/cardano/keys/payment2.vkey \
--out-file $HOME/cardano/keys/payment2.addr \
--testnet-magic 1097911063
```

Once complete you should have the following directory structure:

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

Querying the **UTXO** for the second wallet `payment2.addr` should give you a familiar result:

```bash
cardano-cli query utxo \
--testnet-magic 1097911063 \
--address $(cat $HOME/cardano/keys/payment2.addr)
```

**UTXO Result**
```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
```

Again, this is to be expected as the `payment2.addr` wallet address and keys has just recently been generated. So we expect that no one has sent any `tAda` to this wallet yet.

In this example, we now have two wallets. We can call them `payment1` and `payment2`. Now remember that we requested some `tAda` from the [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet) for `payment1` wallet, and thats how we have the following:

`payment1` **wallet**: `1,000,000,000 lovelace`

```
UTXO
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85     0        1000000000 lovelace
```

`payment2` **wallet**: `0 lovelace`
```
UTXO
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
```

Now let's say we want to send `250,000,000 lovelace` to `payment2` **wallet**, how can we achieve that?

We start by storing the current on-chain protocol parameters to a **JSON** file:

**Query Protocol Parameters**
```bash
cardano-cli query protocol-parameters \
  --testnet-magic 1097911063 \
  --out-file $HOME/cardano/protocol.json
```
This will produce a **JSON** file that looks something like this:
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


**Create draft transaction**

Next, we create a draft transaction like so:

```bash
cardano-cli transaction build-raw \
--tx-in cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85#0 \
--tx-out $(cat $HOME/cardano/keys/payment2.addr)+0 \
--tx-out $(cat $HOME/cardano/keys/payment1.addr)+0 \
--fee 0 \
--out-file $HOME/cardano/tx.draft
```

`cardano-cli transaction build-raw` : This tells `cardano-cli` to build a raw transaction.

`--tx-in` : This specifices the **UTXO** input that the transaction will use, you can add as many **UTXO** input as you want by adding multiple `--tx-in` in the `cardano-cli` arguments as long as they have a unique `TxHash` and `TxIdx` within all your inputs.

`--tx-out` : This specifies the target **wallet address**, **assets** and **quantity** to be sent to. You can add as many **UTXO** outputs as you want as long as the total **UTXO** input can satisfy the **assets** and **quantity** specified by the output.

`--fee` : This specifies the fee amount of the transaction in `lovelace`.

`--out-file` : This is the path to the transaction file that will be generated.

In this case, we are just building a draft transaction to calculate how much fee would the transaction need. We can do that by executing the following command: 

```bash
cardano-cli transaction calculate-min-fee \
--tx-body-file $HOME/cardano/tx.draft \
--tx-in-count 1 \
--tx-out-count 2 \
--witness-count 1 \
--testnet-magic 1097911063 \
--protocol-params-file $HOME/cardano/protocol.json
```

You should see something like this for the output: 

```bash
174169 Lovelace
```

You will notice that we use the `protocol.json` we queried awhile ago to calculate the transaction fee:
```
--protocol-params-file $HOME/cardano/protocol.json
```

That is because the transaction fee calculation results changes depending on the on-chain protocol parameters.

The `--witness-count 1` basically tells `cardano-cli` that there will be only `1` **signing key** required for this transaction to be valid. Since the **UTXO** input involved in this transaction will only be coming from `payment1` wallet, so that means we indeed only need `1` key to sign the transaction.

We can then finally build the real transaction like so:

```bash
cardano-cli transaction build-raw \
--tx-in cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85#0 \
--tx-out $(cat $HOME/cardano/keys/payment2.addr)+250000000 \
--tx-out $(cat $HOME/cardano/keys/payment1.addr)+749825831 \
--fee 174169 \
--out-file $HOME/cardano/tx.draft
```

To recap, We want to send `250,000,000 lovelace` from `payment1` wallet to `payment2` wallet. Our `payment1` wallet had the following **UTXO**:

```
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85     0        1000000000 lovelace
```

So we will use the `TxHash` `cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85` and `TxIx` `0` as our `--tx-input`. 

```bash
--tx-in cf3cf4850c8862f2d698b2ece926578b3815795c9e38d2f907280f02f577cf85#0
```

We then tell `cardano-cli` that the destination of the `250,000,000 lovelace` is the **wallet address** of `payment2`.

```bash
--tx-out $(cat $HOME/cardano/keys/payment2.addr)+250000000
```

Now, we still have `750000000 lovelace` as the change amount, so we will simply send it back to ourselves like so:

```bash
--tx-out $(cat $HOME/cardano/keys/payment1.addr)+749825831
```

Now an important question you might ask here is that, why is the amount `749825831 lovelace`? Well remember that we calculated the fee to be `174169 lovelace` and someone has to shoulder the transaction fee, so we decide that `payment` should pay for the fee with the change `lovelace` amount. So we calculate that `750000000 - 174169 = 749825831` and so the total change would be `749825831 lovelace`.

We then specify the transaction fee like so:

```
--fee 174169
```

And then we specify where we will save the transaction file:

```
--out-file $HOME/cardano/tx.draft
```

Now that we have the transaction file, we must sign the transaction in-order to prove that we are the owner of the input **UTXO** that was used.

```bash
cardano-cli transaction sign \
--tx-body-file $HOME/cardano/tx.draft \
--signing-key-file $HOME/cardano/keys/payment1.skey \
--testnet-magic 1097911063 \
--out-file $HOME/cardano/tx.signed
```

`--signing-key-file $HOME/cardano/keys/payment1.skey` : This argument tells the `cardano-cli` that we will use `payment1.skey` to sign the transaction.

Finally, we submit the transaction to the blockchain!

```bash
cardano-cli transaction submit \
--tx-file $HOME/cardano/tx.signed \
--testnet-magic 1097911063 
```
:::important
If you have waited too long to sign and submit the transaction, the fees might've changed during that time and therefore the transaction might get rejected by the network. To solve this, you simply have to **recalculate the fees, rebuild the transaction, sign it and submit it**!
:::

Checking the balances of both wallets `payment1` and `payment2`:

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

As we can see, `payment2` now has a **UTXO** with the amount of `250,000,000 lovelace` with the change amount returned to `payment1` and has generated a new **UTXO** with the amount of `749,825,303 lovelace` as-well.

Congratulations, You have created and sent your first **Cardano** transaction using `cardano-cli`! 🎉🎉🎉

#### Creating a wallet with `cardano-wallet`

:::note
This guide assumes you have installed `cardano-wallet` into your system. If not you can refer to [Installing cardano-wallet](/docs/get-started/installing-cardano-wallet) guide for instructions on how to do that.

We will use the path `$HOME/cardano/wallets` to store all the `cardano-wallet` related files as an example, please replace it with the directory you have choosen to store the files.
:::

:::important
Please make sure your `cardano-node` is connected and synchronized to the `testnet` network before proceeding.
:::

:::warning
In a production environment, it might not be a good idea to store wallets / keys in a public server unless you know what you are doing.
:::

First, lets create a directory to store all our `wallets` like so:

```bash
mkdir -p $HOME/cardano/wallets
```

**Starting cardano-wallet as a REST API server**

We will be focusing on the [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) that `cardano-wallet` provides. In-order to interact with the API, we must first start the server.

```bash
cardano-wallet serve \
--port 1337 \
--testnet $HOME/cardano/testnet-byron-genesis.json \
--database $HOME/cardano/wallets/db \
--node-socket $CARDANO_NODE_SOCKET_PATH
```

`cardano-wallet serve` : Runs `cardano-wallet` as a web server that provides a [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer).

`--port` : Specifies the port that the web server will listen to for any requests.

> You can choose whatever `port` number you like, but it is recommended to use `port` numbers `1024` and above. See [Registered Port](https://www.sciencedirect.com/topics/computer-science/registered-port) for more information.

`--testnet` : Specifies the **Byron** genesis file path for the `testnet` network.

> This should match the genesis file that the `cardano-node` you are connected is using as-well. If you meant to connect to `mainnet` then use the `--mainnet` flag and the `mainnet` **Byron** genesis file instead.

`--database` : Specifies the path where the wallet database will be saved.

> It is important to note that the wallet creation function requires a passphrase so all the wallet data will be encrypted by the passphrase.

`--node-socket` : Specifies the `cardano-node` socket path that will be used by the `cardano-wallet` to communicate with the node.

> The `cardano-node` uses **IPC (Inter-Process-Communication)** for communicating with the other **Cardano** components like `cardano-cli`, `cardano-wallet` and `cardano-db-sync`. In **Linux** and **MacOS** it uses something called [unix sockets](https://en.wikipedia.org/wiki/Unix_domain_socket) and [Named Pipes](https://docs.microsoft.com/en-us/windows/win32/ipc/named-pipes) in **Windows**.
> 
> Here is an example `--socket-path` argument for **Linux**:
```
--socket-path $HOME/cardano/db/node.socket
```
> As you can see the argument points to a file since **unix sockets** are represented as files (like everything else in **Linux**). In this case we put the socket file in the `db` directory that we have just created before.
> 
> In **Windows**, the `--socket-path` argument would look something like this:
```
--socket-path "\\\\.\\pipe\\cardano-node-testnet"
```
> As you notice its almost like a network `URI` or a network `Path` than a file, this is a key difference that you will have to be aware depending on your operating system. You can replace the string `cardano-node-testnet` in the argument to whatever you like, this example path in particular is used in the [Daedalus Testnet Wallet](https://daedaluswallet.io) for **Windows**.

Once the server is running you should see sometihng like this (among other things): 

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

**Checking Wallet Server Information**

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


