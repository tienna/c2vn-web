---
id: ogmios
title: Bắt đầu với Ogmios
sidebar_label: Ogmios
description: Bắt đầu với Ogmios
#image: ./img/og-developer-portal.png
---


**Ogmios** là một giao diện cầu nối nhẹ cho [cardano-node](https://github.com/input-output-hk/cardano-node/). Nó cung cấp một WebSockets API cho phép các khách hàng cục bộ nói [Ouroboros' mini-protocols](https://hydra.iohk.io/build/1070091/download/1/network.pdf#chapter.3) thông qua JSON/RPC.

Ogmios không làm được nhiều hơn những gì mà chính node đó làm. Nó khá thấp như những thứ có thể có được với mạng Cardano. Đối với nhiều ứng dụng, mức này quá thấp trong lớp trừu tượng và chúng sẽ tốt hơn nếu sử dụng các dịch vụ cấp cao hơn như [cardano-graphql](https://github.com/input-output-hk/cardano-graphql), [Rosetta](https://www.rosetta-api.org), or [Blockfrost](https://blockfrost.io).


## Giới thiệu

Cách dễ nhất để bắt đầu với Ogmios là sử dụng [docker](https://www.docker.com). Vì Ogmios yêu cầu sự hiện diện của một node Cardano, nên phải sử dụng docker-compose để sắp đặt cả hai dịch vụ. Tệp soạn thảo có sẵn trên kho lưu trữ Ogmios, hãy tải tệp đó qua:

```sh
git clone --depth 1 https://github.com/CardanoSolutions/ogmios.git
cd ogmios
```

Sau đó, bắt đầu các thành phần bằng cách sử dụng:
```sh
docker-compose up
```

 Nếu bạn muốn xây dựng mọi thứ từ nguồn hoặc không có docker, vui lòng truy cập [Ogmios website](https://ogmios.dev/getting-started).

## Dashboard

Bây giờ bạn có thể truy cập bảng điều khiển trên [http://localhost:1337](http://localhost:1337) với hình ảnh trực quan thời gian thực của một số chỉ số thời gian chạy của máy chủ.

![img](../../static/img/get-started/ogmios/1-dashboard.gif)

## Truy vấn số liệu


Bảng điều khiển cung cấp bởi JSON được dùng [http://localhost:1337/health](http://localhost:1337/health).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="curl"
values={[
{label: 'curl', value: 'curl'},
{label: 'wget', value: 'wget'},
]}>
<TabItem value="curl">

```sh
curl -H 'Accept: application/json' http://localhost:1337/health
```

  </TabItem>
  <TabItem value="wget">

```sh
wget --header='Accept: application/json' -qO- http://localhost:1337/health
```

  </TabItem>
</Tabs>

Phản hồi:

```json
{
    "metrics": {
        "totalUnrouted": 1,
        "totalMessages": 30029,
        "runtimeStats": {
            "gcCpuTime": 1233009354,
            "cpuTime": 81064672549,
            "maxHeapSize": 41630,
            "currentHeapSize": 1014
        },
        "totalConnections": 10,
        "sessionDurations": {
            "max": 57385,
            "mean": 7057,
            "min": 0
        },
        "activeConnections": 0
    },
    "startTime": "2021-03-15T16:16:41.470782977Z",
    "lastTipUpdate": "2021-03-15T16:28:36.853115034Z",
    "lastKnownTip": {
        "hash": "c29428f386c701c1d1ba1fd259d4be78921ee9ee6c174eac898245ceb55e8061",
        "blockNo": 5034297,
        "slot": 15520688
    },
    "networkSynchronization": 0.99,
    "currentEra": "Mary"
}
```

## Tài liệu về Ogmios

 Để tìm hiểu sâu hơn về Ogmios và cách tương tác với các giao thức mini Ouroboros, hãy truy cập[ogmios.dev](https://ogmios.dev/mini-protocols).