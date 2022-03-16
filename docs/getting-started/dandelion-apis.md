---
id: dandelion-apis
title: Bắt đầu với Dandelion APIs
sidebar_label: Dandelion APIs
description: Bắt đầu với Dandelion APIs
#image: ./img/og-developer-portal.png
--- 

Dandelion hiện cung cấp 2 con đường khác nhau để bắt đầu:

- ** Đối với các nhà phát triển**: [A hosted instance][gimbalabs-dandelion] của hầu hết mọi API Cardano có sẵn được [Gimbalabs]cung cấp dưới dạng dịch vụ cộng đồng miễn phí để bắt đầu xây dựng ngay lập tức.


- ** Đối với SPOs/DevOps/sysadmins**: [An OpenSource project][kustomize-dandelion] để triển khai dịch vụ cộng đồng sử dụng 
Kubernetes.
[gimbalabs]: https://gimbalabs.com/
[gimbalabs-dandelion]: https://gimbalabs.com/dandelion/
[kustomize-dandelion]: https://gitlab.com/gimbalabs/dandelion/kustomize-dandelion

## Cho nhà phát triển

Bắt đầu tạo mẫu ngay lập tức dự án của bạn bằng cách chọn API phù hợp hơn với nhu cầu của bạn.

Tất cả chúng đều được cung cấp theo các dự án nguồn mở được phát triển bởi IOG, Emurgo và các nhà phát triển khác từ cộng đồng, vì vậy bạn sẽ không cần phải thay đổi bất cứ điều gì trong trường hợp bạn quyết định tự mình lưu trữ chúng.

Đây là các liên kết đến kho lưu trữ github và mô tả ngắn gọn về chúng:

- [hasura/graphql-api][gh-hasura-graphql]: sử dụng API GraphQL này để thu thập thông tin tổng hợp từ blockchain và gửi các giao dịch đã ký đến blockchain


- [cardano-rest/explorer-api][gh-cardano-rest]:sử dụng API REST này để thu thập thông tin cơ bản từ blockchain. *DEPRECATED*

- [cardano-rest/submit-api][gh-cardano-rest]: sử dụng API REST này để gửi các giao dịch đã ký đến blockchain *DEPRECATED*


- [KtorZ/ogmios-api][gh-ogmios]: sử dụng API JSON-WSP (websocket) này để thu thập thông tin blockchain trực tiếp trực tiếp từ một phiên bản cardano-node

 -[cardano-db-sync][gh-cardano-db-sync]/[postgrest-api][gh-postgrest]: 
sử dụng API REST này để thực hiện các truy vấn SQL nhằm thu thập thông tin trực tiếp từ cơ sở dữ liệu của cardano-db-sync.


- [rosetta-api][gh-cardano-rosetta]: sử dụng API này để tích hợp ứng dụng của bạn với nhiều blockchain theo cách đơn giản hơn, nhanh hơn và đáng tin cậy hơn.

[gh-hasura-graphql]: https://github.com/input-output-hk/cardano-graphql
[gh-cardano-rest]: https://github.com/input-output-hk/cardano-rest
[gh-ogmios]: https://github.com/cardanosolutions/ogmios
[gh-cardano-db-sync]: https://github.com/input-output-hk/cardano-db-sync
[gh-cardano-rosetta]: https://github.com/input-output-hk/cardano-rosetta
[gh-postgrest]: https://github.com/PostgREST/postgrest

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Cardano GraphQL

![img](../../static/img/get-started/dandelion-apis/showcase-graphql-api.png)


Các liên kết hữu ích

- [Link][gimbalabs-graphql-api] liên kết đến thông tin điểm cuối của Gimbalabs

- [Link][graphql-official-doc] liên kết đến tài liệu chính thức của dự án
- [Link][graphql-example-queries] vào bộ sưu tập chính thức của các truy vấn mẫu. Bạn có thể chạy trực tiếp từ [GraphQL playground][graphql-playground-testnet]

[gimbalabs-graphql-api]: https://gimbalabs.com/dandelion/endpoints/graphql-api

[graphql-example-queries]: https://github.com/input-output-hk/cardano-graphql/tree/master/packages/api-cardano-db-hasura/src/example_queries

[graphql-official-doc]: https://input-output-hk.github.io/cardano-graphql/

[graphql-playground-testnet]:  https://graphql-api.testnet.dandelion.link

Các ví dụ sử dụng:

<Tabs
defaultValue="curl"
values={[
{label: 'curl', value: 'curl'},
]}>
  <TabItem value="curl">

```sh
# testnet
curl -H 'Content-Type: application/json' \
     -H 'Accept: application/json' \
     --data-binary \
'{"query":"query cardanoDbSyncProgress {\n cardanoDbMeta {\n initialized\n syncPercentage\n }\n}\n"}' \
    https://graphql-api.testnet.dandelion.link
```
  </TabItem>
</Tabs>

Ví dụ hiện thị ra:

```json
{"data":{"cardanoDbMeta":{"initialized":true,"syncPercentage":100}}}
```

## Cardano Explorer

![img](../../static/img/get-started/dandelion-apis/showcase-explorer-api.png)


Các liên kết hữu ích:

- [Link][gimbalabs-explorer-api] liên kết đến thông tin điểm cuối của Gimbalabs
- [Link][explorer-official-doc] Tài liệu của chính thức của dự án.

[gimbalabs-explorer-api]: https://gimbalabs.com/dandelion/endpoints/explorer-api

[explorer-official-doc]: https://input-output-hk.github.io/cardano-rest/explorer-api
- [Link][explorer-official-doc]  đến tài liệu chính thức của dự án

Ví dụ hữu dụng:

<Tabs
defaultValue="curl"
values={[
{label: 'curl', value: 'curl'},
]}>
  <TabItem value="curl">

```sh
# testnet
curl -s https://explorer-api.testnet.dandelion.link/api/txs/last
# mainnet
curl -s https://explorer-api.mainnet.dandelion.link/api/txs/last
```
  </TabItem>
</Tabs>

Ví dụ đâu ra (REDACTED):

```json
{
  "Right": [
    {
      "cteId": "12703a0f201c9596d4fc256924f98e38d33dc23c4be1c7c3bc9bbc373ee3dbdf",
      "cteTimeIssued": 1621292369,
      "cteAmount": {
        "getCoin": "541898740"
      }
    },
    {
      "cteId": "f7f0be9988551b5179b143444f67215a06ef9794f3ed9e6f58a1b067db37f0a1",
      "cteTimeIssued": 1621292297,
      "cteAmount": {
        "getCoin": "1019242"
      }
    },
...
  ]
}
```

## Cardano Submit 

![img](../../static/img/get-started/dandelion-apis/showcase-submit-api.png)

Link sử dụng:

 
- [Link][gimbalabs-submit-api] liên kết đến thông tin điểm cuối của Gimbalabs
- [Link][submit-official-doc] đến tài liệu chính thức của dự án
[gimbalabs-submit-api]: https://gimbalabs.com/dandelion/endpoints/submit-api
[submit-official-doc]: https://input-output-hk.github.io/cardano-rest/submit-api

Các ví dụ sử dụng giả sử bạn có một tệp `application/cbor` chứa một giao dịch đã ký ( ví dụ: từ `cardano-cli` hoặc bất kỳ thư viện nào khác) nằm tại `/tmp/cbor-tx`:

<Tabs
defaultValue="curl"
values={[
{label: 'curl', value: 'curl'},
]}>
  <TabItem value="curl">

```sh
curl -X POST \
    --header "Content-Type: application/cbor" \
    --data-binary @/tmp/cbor-tx \
    https://submit-api.testnet.dandelion.link/api/submit/tx
```
  </TabItem>
</Tabs>

Ví dụ thông tin đầu ra (a transaction id):

```json
92bcd06b25dfbd89b578d536b4d3b7dd269b7c2aa206ed518012cffe0444d67f
```

## Cardano Rosetta

![img](../../static/img/get-started/dandelion-apis/showcase-rosetta-api.png)

Các link hữu ích:

- [Link][gimbalabs-rosetta-api] liên kết đến thông tin điểm cuối của Gimbalabs
- [Link][rosetta-official-doc] đến tài liệu chính thức của dự án
[gimbalabs-rosetta-api]: https://gimbalabs.com/dandelion/endpoints/rosetta-api
[rosetta-official-doc]: https://github.com/input-output-hk/cardano-rosetta#documentation

Ví dụ hữu ích:

<Tabs
defaultValue="curl"
values={[
{label: 'curl', value: 'curl'},
]}>
  <TabItem value="curl">

```sh
curl -s -X POST \
     -H 'Content-Type: application/json' \
     --data '{"network_identifier":{"blockchain":"cardano","network":"testnet"},"block_identifier":{"index":100}}' \
     https://rosetta-api.testnet.dandelion.link/block
```
  </TabItem>
</Tabs>

Ví dụ đầu ra:

```json
{
  "block": {
    "block_identifier": {
      "index": 100,
      "hash": "4c81fe7ddb7ab93a1973d674f1920bb1be980efdb819ea0a92d25706e72809fc"
    },
    "parent_block_identifier": {
      "index": 99,
      "hash": "e8b65f34c3b562a996b6bf6a9109e279536ae7efbc714ae0526bd222e7288eb4"
    },
    "timestamp": 1564022216000,
    "transactions": [],
    "metadata": {
      "transactionsCount": 0,
      "createdBy": "ByronGenesis-0df4205606dcb8ad",
      "size": 668,
      "epochNo": 0,
      "slotNo": 1130
    }
  }
}
```

## Ogmios

![img](../../static/img/get-started/dandelion-apis/showcase-ogmios-api.png)

Các link hữu ích:

- [Link][gimbalabs-ogmios-api] liên kết đến thông tin điểm cuối của Gimbalabs
- [Link][ogmios-official-doc] đến tài liệu chính thức của dự án
[gimbalabs-ogmios-api]: https://gimbalabs.com/dandelion/endpoints/ogmios-api
[ogmios-official-doc]: https://github.com/cardanosolutions/ogmios

Ví dụ hữu ích:

<Tabs
defaultValue="websocat"
values={[
{label: 'github.com/vi/websocat', value: 'websocat'},
]}>
  <TabItem value="websocat">

```sh
echo '{ "type": "jsonwsp/request", "version": "1.0", "servicename": "ogmios", "methodname": "RequestNext", "args": {} }' \
  | websocat --text -1 - wss://ogmios-api.testnet.dandelion.link
```
  </TabItem>
</Tabs>

Ví dụ đầu ra:

```json
{
  "type": "jsonwsp/response",
  "version": "1.0",
  "servicename": "ogmios",
  "methodname": "RequestNext",
  "result": {
    "RollBackward": {
      "point": "origin",
      "tip": {
        "slot": 26925169,
        "hash": "000a47936fed9bd76cfb52abcd9ab3172ba9118cff9b56767087544f295daba3",
        "blockNo": 2591103
      }
    }
  },
  "reflection": null
}
```

## PostgREST

![img](../../static/img/get-started/dandelion-apis/showcase-postgrest-api.png)

Useful links:

- [Link][gimbalabs-postgrest-api] liên kết đến thông tin điểm cuối của Gimbalabs và tài liệu chính thức.
- [Link][cardano-db-sync-official-doc] tới `cardano-db-sync` tài liệu chinh thức
[gimbalabs-postgrest-api]: https://gimbalabs.com/dandelion/endpoints/postgrest-api
[cardano-db-sync-official-doc]: https://github.com/input-output-hk/cardano-db-sync/blob/master/doc/interesting-queries.md

Ví dụ hữu ích:

<Tabs
defaultValue="curl"
values={[
{label: 'curl', value: 'curl'},
]}>
  <TabItem value="curl">

```sh
# query available metadatums
curl -s "https://postgrest-api.mainnet.dandelion.link/rpc/get_metadatum"
# query metadatum 20201210
curl -d metadatum=20201210 -s "https://postgrest-api.mainnet.dandelion.link/rpc/get_metadata" | jq .
# query metadatum 42 for epoch 234-235 and limit results to 1
curl -s -d metadatum=42 -d epochs="{234,235}" "https://postgrest-api.mainnet.dandelion.link/rpc/get_metadata?limit=1"
# query metadata entry number 15
curl -s "https://postgrest-api.mainnet.dandelion.link/tx_metadata?id=eq.15"
# query pool metadata whose URL contains "repsistance" 
curl -s "https://postgrest-api.mainnet.dandelion.link/pool_meta_data?url=like.*repsistance*"
# query metadata entries for SPOCRA proposalId "80064c28-1b03-4f1c-abf0-ca8c5a98d5b9"
curl -s "https://postgrest-api.mainnet.dandelion.link/tx_metadata?json->>ProposalId=eq.80064c28-1b03-4f1c-abf0-ca8c5a98d5b9"
# query metadata entries for the whole SPOCRA network
curl -s "https://postgrest-api.mainnet.dandelion.link/tx_metadata?json->>NetworkId=eq.SPOCRA"
```
  </TabItem>
</Tabs>

## Triển khai Dandelion của riêng bạn

 Nếu bạn đã cài đặt Docker, bạn gần như đã hoàn tất việc sử dụng Dandelion trong môi trường phát triển cục bộ của mình. Vui lòng tham khảo tài liệu chính thức [the official documentation][local-dandelion-deploy] để làm như vậy và đừng ngần ngại yêu cầu hỗ trợ trong kênh Discord chuyên dụng của chúng tôi[Discord channel][discord-dandelion], chúng tôi biết hệ điều hành, mạng và nhà cung cấp đám mây có thể khác nhau rất nhiều và đưa ra các vấn đề ngẫu nhiên!
[discord-dandelion]: https://discord.gg/qDc3f9R7Ab
[local-dandelion-deploy]: https://gitlab.com/gimbalabs/dandelion/kustomize-dandelion#local-deployment
