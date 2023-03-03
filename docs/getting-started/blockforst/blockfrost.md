---
id: blockfrost-1
sidebar_position: '1'
title: Bắt đầu với Blockfrost
sidebar_label: Blockfrost
description: Bắt đầu với Blockfrost
#image: ./img/og-developer-portal.png
---


Blockfrost cung cấp API để truy cập và xử lý thông tin được lưu trữ trên blockchain Cardano. Mức cơ bản là miễn phí và cho phép 50.000 yêu cầu mỗi ngày.

## Đăng nhập

 [Đăng nhập vào Blockfrost](https://blockfrost.io/auth/signin) với tài khoản GitHub của bạn, không cần đăng ký. Nhập tên dự án và chọn Cardano mainnet và Cardano testnet, phụ thuộc vào nhu cầu của bạn.

![img](../../../static/img/getting-started/blockfrost/1-add-project.png)

## Lấy API của bạn

Sau khi nhấp vào `Save Project` ngay lập tức bạn sẽ nhận được `API KEY`lưu nó, bạn sẽ cần khóa này cho mọi yêu cầu.

![img](../../../static/img/getting-started/blockfrost/2-get-api-key.png)

## Yêu cầu epoch gần nhất

Gửi yêu cầu đầu tiên của bạn để nhận dữ liệu về epoch mới nhất. Đừng quên thay `1234567890` bằng `API KEY` của bạn.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="curl"
values={[
{label: 'curl', value: 'curl'},
{label: 'wget', value: 'wget'},
{label: 'PHP', value: 'php'},
]}>
<TabItem value="curl">

```sh
curl -H 'project_id: 1234567890' https://cardano-mainnet.blockfrost.io/api/v0/epochs/latest
```

  </TabItem>
  <TabItem value="wget">

```sh
wget --header='project_id: 1234567890' -qO- https://cardano-mainnet.blockfrost.io/api/v0/epochs/latest
```

  </TabItem>
  <TabItem value="php">

```php
$headers = array('http'=> array(
					 'method' => 'GET',
					 'header' => 'project_id: 1234567890'
					)
   			    );
$context = stream_context_create($headers);
$json = file_get_contents('https://cardano-mainnet.blockfrost.io/api/v0/epochs/latest', false, $context);
$parsedJson = json_decode($json);
```

  </TabItem>
</Tabs>


Nếu bạn đã làm mọi thứ chính xác, bạn sẽ nhận được phản hồi ở định dạng JSON, tương tự như sau:

```json
{
  "epoch": 225,
  "start_time": 1603403091,
  "end_time": 1603835086,
  "first_block_time": 1603403092,
  "last_block_time": 1603835084,
  "block_count": 21298,
  "tx_count": 17856,
  "output": "7849943934049314",
  "fees": "4203312194",
  "active_stake": "784953934049314"
}
```

## Truy vấn dữ liệu  của một nhóm cổ phần cụ thể

Hãy xem xét một ví dụ khác và truy vấn dữ liệu của một pool cụ thể. Bạn cần cung cấp Bech32 hoặc id của pool `pool_id`.

<Tabs
defaultValue="curl"
values={[
{label: 'curl', value: 'curl'},
{label: 'wget', value: 'wget'},
{label: 'PHP', value: 'php'},
]}>
<TabItem value="curl">

```sh
curl -H 'project_id: 1234567890' https://cardano-mainnet.blockfrost.io/api/v0/pools/c1cadab46b74defa9f79b59b617fe2a50bdbce6b367e472b6109a7bc

```

  </TabItem>
<TabItem value="wget">

```sh
wget --header='project_id: 1234567890' -qO- https://cardano-mainnet.blockfrost.io/api/v0/pools/c1cadab46b74defa9f79b59b617fe2a50bdbce6b367e472b6109a7bc

```

  </TabItem>
  <TabItem value="php">

```php
$headers = array('http'=> array(
					 'method' => 'GET',
					 'header' => 'project_id: 1234567890'
					)
   			    );
$context = stream_context_create($headers);
$json = file_get_contents('https://cardano-mainnet.blockfrost.io/api/v0/pools/c1cadab46b74defa9f79b59b617fe2a50bdbce6b367e472b6109a7bc', false, $context);
$parsedJson = json_decode($json);
```

  </TabItem>
</Tabs>


Bạn sẽ nhận được phản hồi ở định dạng JSON, tương tự như sau:

```json
{
  "vrf_key": "57c4d222e0f2f8083d7b63c8f7886f16fb7046621442bbd857f404b6f433c5e6",
  "blocks_minted": 1675,
  "live_stake": "33978569808898",
  "live_size": 0.0014709194212545152,
  "live_saturation": 0.5169025966078663,
  "live_delegators": 395,
  "active_stake": "37990508551252",
  "active_size": 0.0016498675360681707,
  "declared_pledge": "250010000000",
  "live_pledge": "765352096766",
  "margin_cost": 0.015,
  "fixed_cost": "340000000",
  "reward_account": "stake1u97pa0j0wtj5r3l6462z0xmlf5tg0dxpmss3y20almfnj5gc4tmrw",
  "owners": [
    "stake1uywma333mgeccv3aa2gvrkhz4qtz0cq9sszrnws8pv78gqqq6a65g",
    "stake1u9dqkqmdtdcav5qd933xwvwxgamrsdkr0zsn63ca0v4lz5cm7tvq0",
    "stake1u97pa0j0wtj5r3l6462z0xmlf5tg0dxpmss3y20almfnj5gc4tmrw"
  ],
  "registration": [
    "f6865b914988ed40998d2ff5453bd8af16976688065c9756d32c7a872064aaf8",
    "0e08711da89ebbaefaf897f5633c7b7bc6c1c9037451431745fbaefbf1227ec7",
    "9b85adfebc25f2cc7737039fb376043207e1ec7147b2800436138e7df58c70d4",
    "1243db764e42a3ec89d815d96bcf7242bfd2837d54f3047f2b5abacd7e52345d"
  ],
  "retirement": []
}
```

## Truy vấn thông tin  của một nội dung cụ thể

Hãy xem ví dụ cuối cùng này và truy vấn thông tin của một token gốc cụ thể trên Cardano. Bạn cần cung cấp cách nối chuỗi của của `policy_id` và hex-encoded `asset_name`.

<Tabs
defaultValue="curl"
values={[
{label: 'curl', value: 'curl'},
{label: 'wget', value: 'wget'},
{label: 'PHP', value: 'php'},
]}>
<TabItem value="curl">

```sh
curl -H 'project_id: 1234567890' https://cardano-mainnet.blockfrost.io/api/v0/assets/d894897411707efa755a76deb66d26dfd50593f2e70863e1661e98a07370616365636f696e73

```

  </TabItem>
  <TabItem value="wget">

```sh
wget --header='project_id: 1234567890' -qO- https://cardano-mainnet.blockfrost.io/api/v0/assets/d894897411707efa755a76deb66d26dfd50593f2e70863e1661e98a07370616365636f696e73

```

  </TabItem>
  <TabItem value="php">

```php
$headers = array('http'=> array(
					 'method' => 'GET',
					 'header' => 'project_id: 1234567890'
					)
   			    );
$context = stream_context_create($headers);
$json = file_get_contents('https://cardano-mainnet.blockfrost.io/api/v0/assets/d894897411707efa755a76deb66d26dfd50593f2e70863e1661e98a07370616365636f696e73', false, $context);
$parsedJson = json_decode($json);
```

  </TabItem>
</Tabs>


Bạn sẽ nhận được phản hồi JSON:

```json
{
  "policy_id": "d894897411707efa755a76deb66d26dfd50593f2e70863e1661e98a0",
  "asset_name": "7370616365636f696e73",
  "fingerprint": "asset1pmmzqf2akudknt05ealtvcvsy7n6wnc9dd03mf",
  "quantity": "50000000",
  "initial_mint_tx_hash": "3cce12c77b9d11d70575320c4f2834b26debb065308fbe43954018fbeb90010d",
  "onchain_metadata": null,
  "metadata": null
}
```

## Tài liệu và Blockfrost 

Blockfrost có một API mạnh mẽ mà bạn có thể làm được nhiều việc. Truy cập [docs.blockfrost.io](https://docs.blockfrost.io) để xem tài liệu API hoàn chỉnh.
