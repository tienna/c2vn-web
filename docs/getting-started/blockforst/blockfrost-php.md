---
id: blockfrost-php
sidebar_position: '2'
title: Blockfrost với php
sidebar_label: Blockfrost với php
description: Xây dựng một ứng dụng bằng PHP trên Chuỗi khối Cardano
#image: ./img/og-developer-portal.png
---

Xây dựng một ứng dụng bằng PHP trên Chuỗi khối Cardano. Dưới đây là các bước bạn có thể làm theo:

1. Đăng ký tài khoản Blockfrost và lấy khóa API của bạn.

2. Cài đặt tiện ích mở rộng PHP `cURL`, tiện ích này sẽ cho phép bạn thực hiện các yêu cầu API.

3. Sử dụng API Blockfrost để tạo địa chỉ mới bằng cách sử dụng `/addresses`. Bạn sẽ cần đưa khóa API của mình vào tiêu đề yêu cầu.

```javascript
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://cardano-mainnet.blockfrost.io/api/v0/addresses");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
    "project_id: {YOUR_API_KEY}"
));
$response = curl_exec($ch);
curl_close($ch);

$address = json_decode($response, true)["address"];
```

4. Lưu địa chỉ mới được tạo vào cơ sở dữ liệu hoặc phiên của bạn, tùy thuộc vào yêu cầu của ứng dụng của bạn.

5. Tạo một cặp khóa mới bằng cách sử dụng `/addresses/{address}/keys`. Bạn sẽ cần đưa khóa API của mình vào tiêu đề yêu cầu.

```javascript

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://cardano-mainnet.blockfrost.io/api/v0/addresses/{$address}/keys");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
    "project_id: {YOUR_API_KEY}"
));
$response = curl_exec($ch);
curl_close($ch);

$keyPair = json_decode($response, true);
$publicKey = $keyPair["cbor_hex"];
$privateKey = $keyPair["private_key_bech32"];

```

5. Lưu khóa riêng vào cơ sở dữ liệu hoặc phiên của bạn và sử dụng nó để ký các giao dịch khi cần.

7. Để gửi ADA từ địa chỉ này sang địa chỉ khác, hãy sử dụng điểm cuối `/txs/build` và `/txs/submit`. Trước tiên, hãy sử dụng `/txs/build` để xây dựng giao dịch bằng cách cung cấp địa chỉ nguồn và địa chỉ đích, lượng ADA cần gửi và phí. Bạn cũng sẽ cần đưa khóa API của mình vào tiêu đề yêu cầu.

```javascript

$sourceAddress = "your-source-address";
$destinationAddress = "your-destination-address";
$amount = 1000000; // 1 ADA
$fee = 1000000; // 1 ADA

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://cardano-mainnet.blockfrost.io/api/v0/txs/build");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(
    "outputs" => array(
        array(
            "address" => $destinationAddress,
            "amount" => $amount
        )
    ),
    "inputs" => array(
        array(
            "address" => $sourceAddress
        )
    ),
    "fee" => $fee
)));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
    "project_id: {YOUR_API_KEY}"
));
$response = curl_exec($ch);
curl_close($ch);

$transaction = json_decode($response, true);
$transactionHash
```
8. Khi bạn đã tạo giao dịch, hãy ký giao dịch đó bằng khóa riêng được liên kết với địa chỉ nguồn bằng cách sử dụng `/txs/{txHash}/sign`. Bạn sẽ cần đưa giao dịch được tuần tự hóa vào nội dung yêu cầu và khóa API của bạn trong tiêu đề yêu cầu.

```javascript

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://cardano-mainnet.blockfrost.io/api/v0/txs/{$transactionHash}/sign");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(
    "signatures" => array(
        $privateKey
    )
)));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
    "project_id: {YOUR_API_KEY}"
));
$response = curl_exec($ch);
curl_close($ch);

$signedTransaction = json_decode($response, true)["hex"];
```

9. Cuối cùng, gửi giao dịch đã ký tới mạng Cardano bằng `/txs/submit`. Bạn sẽ cần đưa giao dịch đã ký vào nội dung yêu cầu và khóa API của bạn trong tiêu đề yêu cầu.

```javascript

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://cardano-mainnet.blockfrost.io/api/v0/txs/submit");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(
    "tx_body" => $signedTransaction
)));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
    "project_id: {YOUR_API_KEY}"
));
$response = curl_exec($ch);
curl_close($ch);

$transactionId = json_decode($response, true)["tx_hash"];

```

Bạn có thể sử dụng các bước này để xây dựng ứng dụng PHP tương tác với Chuỗi khối Cardano bằng API Blockfrost.

