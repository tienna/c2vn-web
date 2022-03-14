---
id: running-cardano
title: Cách chạy cardano-node
sidebar_label: Chạy cardano-node
description: This guide will explain and show you how to run the cardano-node and components on your system.
#image: ./img/og-developer-portal.png
--- 
### Tổng quan

Hướng dẫn này sẽ chỉ cho bạn cách chạy `cardano-node` và `cardano-cli` trên hệ điều thành của bạn và một số ví dụ đơn giản về cách bạn có thể tương tác với chuỗi khối Cardano 

:::note
Hướng dẫn này giả định rằng bạn đã cài đặt `cardano-node` và `cardano-cli` vào hệ thống của mình. Nếu không, bạn có thể tham khảo Hướng dẫn [Installing cardano-node](/docs/getting-started/installing-cardano-node) để biết hướng dẫn về cách thực hiện điều đó..
:::

:::important
Hướng dẫn này không bao gồm chủ đề điều hành sản xuất khối `cardano-node` hoặc vận hành **Nhóm cổ phần Cardano** . Để biết thêm thông tin liên quan đến chủ đề đó, vui lòng truy cập [Stake Pool Operation](/docs/operate-a-stake-pool/).
:::

### File Cấu hình

`cardano-node` yêu cầu ít nhất bốn tệp cấu hình để chạy khi viết bài này.

- **Main Config**: Nó chứa các cài đặt nút chung như ghi nhật ký và lập phiên bản . Nó cũng chỉ đến tệp **Byron Genesis** and the **Shelly Genesis**.
- **Byron Genesis**: Nó chứa các tham số giao thức ban đầu và hướng dẫn`cardano-node` cách khởi động **Byron Era** của blockchain **Cardano** .
- **Shelly Genesis**: Nó chứa các tham số giao thức ban đầu và hướng dẫn`cardano-node` cách khởi động **Shelly Era** của blockchain **Cardano**.
- **Alonzo Genesis**: Nó chứa các tham số giao thức ban đầu và hướng dẫn `cardano-node` cách khởi động **Alonzo Era** của blockchain **Cardano**.
- **Topology**: Nó chứa danh sách các mạng ngang hàng (**`IP Address` and `Port` of other nodes running the blockchain network**)  mà nút của bạn sẽ kết nối.

:::important
Hiện tại, `cardano-node` cấu trúc liên kết được thiết lập thủ công bởi cộng đồng các nhà khai thác mạng trong chuỗi khối Cardano . Nhưng một hệ thống p2p (ngang hàng) tự động đang hoạt động. Để biết thêm thông tin, hãy truy cập, [Boosting network decentralization with P2P](https://iohk.io/en/blog/posts/2021/04/06/boosting-network-decentralization-with-p2p/).

Để biết thêm thông tin về các kỷ nguyên và nâng cấp của chuỗi khối Cardano, vui lòng truy cập [Cardano Roadmap](https://roadmap.cardano.org/en).
:::

Bạn có thể tải xuống các tệp cấu hình mạng chuỗi khối  **Cardano** tại đây: 


#### Mainnet / Production

**NetworkMagic**: `764824073`

```
curl -O -J https://hydra.iohk.io/build/7370192/download/1/mainnet-config.json
curl -O -J https://hydra.iohk.io/build/7370192/download/1/mainnet-byron-genesis.json
curl -O -J https://hydra.iohk.io/build/7370192/download/1/mainnet-shelley-genesis.json
curl -O -J https://hydra.iohk.io/build/7370192/download/1/mainnet-alonzo-genesis.json
curl -O -J https://hydra.iohk.io/build/7370192/download/1/mainnet-topology.json
```

#### Testnet / Sandbox

**NetworkMagic**: `1097911063`

```
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-topology.json
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-shelley-genesis.json
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-config.json
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-byron-genesis.json
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-alonzo-genesis.json
```

:::note

Mỗi mạng có một file `config`, file `genesis`, file `topology`, và một số nhận dạng gọi là **Network Magic**.

Phần này sẽ được cập nhật khi các mạng **Cardano** mới trực tuyến với các file cấu hình tương ứng và **Network Magic**.
:::

Bạn có thể hỏi sự khác biệt giữa `mainnet` và `testnet` và tại sao có hai mạng? Nói một cách đơn giản, **Cardano** là một chuỗi khối mã nguồn mở và bất kỳ ai cũng có thể tự do tạo ra một mạng lưới dựa trên các thành phần phần mềm của **Cardano**. Mạng `mainnet`là mạng đầu tiên được thành lập vào đầu kỷ nguyên **Byron** vào năm 2017.  Và tất cả mọi người tham gia vào mạng đều đồng ý rằng đó là nơi tất cả giá trị thực của **Cardano**.

 Việc kiểm tra các tính năng và khả năng của mạng có thể tốn kém và sẽ tiêu tốn giá trị thực. Vì vậy, [Input-Output Global](https://iohk.io) đã tạo ra một phiên bản mạng testnet . Thay vì sử dụng token `ada` thực cho các giao dịch, bạn sử dụng token `tAda` hoặc Thử nghiệm ADA . **Ngoài ra, bạn có thể tạo mạng Cardano tùy chỉnh của riêng mình** , nhưng điều đó nằm ngoài phạm vi của hướng dẫn này.

### Chạy node

Để chạy `cardano-node`  bạn nhập một cái gì đó như thế này vào terminal: 

```bash
 cardano-node run \
   --topology path/to/mainnet-topology.json \
   --database-path path/to/db \
   --socket-path path/to/db/node.socket \
   --host-addr x.x.x.x \
   --port 3001 \
   --config path/to/mainnet-config.json
```

Để có được danh sách đầy đủ các tùy chọn có sẵn, hãy sử dụng `cardano-node run --help`

```
Usage: cardano-node run [--topology FILEPATH] [--database-path FILEPATH] 
                        [--socket-path FILEPATH] 
                        [--byron-delegation-certificate FILEPATH] 
                        [--byron-signing-key FILEPATH] 
                        [--shelley-kes-key FILEPATH] 
                        [--shelley-vrf-key FILEPATH] 
                        [--shelley-operational-certificate FILEPATH] 
                        [--bulk-credentials-file FILEPATH] [--host-addr IPV4] 
                        [--host-ipv6-addr IPV6] [--port PORT] 
                        [--config NODE-CONFIGURATION] [--validate-db]
  Run the node.

Available options:
  --topology FILEPATH      The path to a file describing the topology.
  --database-path FILEPATH Directory where the state is stored.
  --socket-path FILEPATH   Path to a cardano-node socket
  --byron-delegation-certificate FILEPATH
                           Path to the delegation certificate.
  --byron-signing-key FILEPATH
                           Path to the Byron signing key.
  --shelley-kes-key FILEPATH
                           Path to the KES signing key.
  --shelley-vrf-key FILEPATH
                           Path to the VRF signing key.
  --shelley-operational-certificate FILEPATH
                           Path to the delegation certificate.
  --bulk-credentials-file FILEPATH
                           Path to the bulk pool credentials file.
  --host-addr IPV4         An optional ipv4 address
  --host-ipv6-addr IPV6    An optional ipv6 address
  --port PORT              The port number
  --config NODE-CONFIGURATION
                           Configuration file for the cardano-node
  --validate-db            Validate all on-disk database files
  --shutdown-ipc FD        Shut down the process when this inherited FD reaches
                           EOF
  --shutdown-on-slot-synced SLOT
                           Shut down the process after ChainDB is synced up to
                           the specified slot
  -h,--help                Show this help text
```
### Thông số cardano-node

:::note
Trong phần này, chúng tôi sẽ sử dụng đường dẫn `$HOME/cardano` để lưu trữ tất cả các `cardano-node` tệp liên quan làm ví dụ, và vui lòng thay thế nó bằng thư mục bạn đã chọn để lưu trữ các tệp.
:::

Chúng tôi sẽ tập trung vào sáu tham số dòng lệnh chính để chạy một nút:

**`--topology`**: Điều này yêu cầu đường dẫn của file `topology.json` mà bạn đã tải xuống như hướng dẫn [above](/docs/getting-started/running-cardano#configuration-files).

> Ví dụ: Nếu bạn đã tải file `topology.json` có đường dẫn `$HOME/cardano/topology.json`, thì đối số sẽ như sau:

```
--topology $HOME/cardano/topology.json
```

**`--database-path`**: Điều này là đường dẫn đến một thư mục nơi chúng ta sẽ lưu trữ dữ liệu blockchain thực tế như **blocks**, **transactions**, **metadata**, và loại dữ liệu khác mà mọi người đã lưu trữ trong chuỗi khối Cardano . Chúng tôi khám phá cách chúng tôi có thể truy vấn những loại dữ liệu đó trong phần cardano-db-sync. ***@TODO: liên kết tới phần cardano-db-sync.***

> Ví dụ: nếu chúng tôi khẳng định rằng tất cả các file được yêu cầu `cardano-node` đã nằm trong đường dẫn `$HOME/cardano/`. Sau đó, chúng tôi có thể tạo một thư mục cơ sở dữ liệu như thế này `mkdir -p $HOME/cardano/db`.
>  Cấu trúc thư mục sau đó sẽ giống như sau:
```
$HOME/cardano/
├── db
├── testnet-alonzo-genesis.json
├── testnet-byron-genesis.json
├── testnet-config.json
├── testnet-shelley-genesis.json
└── testnet-topology.json
1 directory, 4 files
```
> Như bạn có thể nhận thấy, chúng tôi đang có kế hoạch chạy một node`testnet`  trong ví dụ này và đã tải xuống các file cấu hình vào thư mục `$HOME/cardano/`. Chúng tôi cũng thấy rằng chúng tôi đã tạo thành công thư mục `db` bên trong `$HOME/cardano/`. Đối số sẽ giống như sau:
```
--database-path $HOME/cardano/db
```
> Vui lòng tải xuống và di chuyển các tệp cấu hình vào thư mục Cardano của bạn như được hiển thị ở trên để tiếp tục làm theo hướng dẫn này.

**`--socket-path`**: Điều này mong đợi đường dẫn đến `unix socket` hoặc `named pipe` đường dẫn `cardano-node` sẽ sử dụng cho [IPC (Inter-Process-Communication)](https://en.wikipedia.org/wiki/Inter-process_communication).

> `cardano-node` sử dụng  **IPC (Inter-Process-Communication)** để giao tiếp với các thành phần Cardano khác như  `cardano-cli`, `cardano-wallet`, và `cardano-db-sync`. Trong **Linux** và **MacOS** nó sử dụng một thứ gọi là [unix sockets](https://en.wikipedia.org/wiki/Unix_domain_socket) và [Named Pipes](https://docs.microsoft.com/en-us/windows/win32/ipc/named-pipes) trong **Windows**.
> 
> Đay là một ví dụ về đối số này `--socket-path` trong  **Linux**:
```
--socket-path $HOME/cardano/db/node.socket
```
> Như bạn có thể thấy, đối số trỏ đến một file **unix sockets** (giống như mọi thứ trong **Linux**). Trong trường hợp này, chúng tôi đặt tệp socket vào `db` thư mục mà chúng tôi vừa tạo trước đó.
> 
> Trong **Windows**, đối số `--socket-path` sẽ giống như sau:

```
--socket-path "\\\\.\\pipe\\cardano-node-testnet"
```
> Như bạn có thể nhận thấy, nó giống như một mạng `URI` hoặc một mạng`Path` hơn là một tệp. Đó là một sự khác biệt quan trọng mà bạn sẽ phải biết tùy thuộc vào hệ điều hành của bạn. Bạn có thể thay thế chuỗi `cardano-node-testnet` trong đối số bằng bất kỳ chuỗi nào bạn thích. Đường dẫn ví dụ này được sử dụng trong [Daedalus Testnet Wallet](https://daedaluswallet.io) cho **Windows**.
>

**`--host-addr`**: Điều này là `IP Address` cho node `cardano-node` sẽ chạy. Các nút khác sẽ sử dụng địa chỉ này trong file `topology.json` của chúng để kết nối với nút của bạn nếu bạn định chạy nó như một node `relay`.
> Đây là ví dụ đối số `--host-addr`:
```
--host-addr 192.168.0.1
```
> Trong trường hợp này, chúng tôi mong đợi các nút trong mạng [LAN (Local Area Network)](https://en.wikipedia.org/wiki/Local_area_network) của bạn kết nối qua `192.168.0.1`,  giả sử rằng đaicj chỉ `IP Address` của máy `cardano-node` đang chạy; thay thế nó bằng `IP Address` thật của bạn . Nếu bạn không mong đợi hoặc cần các nút bên ngoài kết nối với nút của mình, bạn có thể sử dụng địa chỉ `127.0.0.1`. Nếu bạn có nhiều giao diện mạng và không chắc chắn nên sử dụng cái gì, bạn có thể chỉ cần sử dụng  `0.0.0.0` để chấp nhận các kết nối từ bất kỳ giao diện mạng nào.

**`--port`**: cùng với `IP Address`, chúng ta cũng sẽ đặt cái `port` với `cardano-node` sẽ sử dụng để nghe bất kỳ kết nối đến nào.
> Đây là một thông số `--port`:
```
--port 1337
```
> Bạn có thể chọn bất kỳ `port` bạn thích, nhưng nên sử dụng `port` từ `1024` trở lên. Xem [Registered Port](https://www.sciencedirect.com/topics/computer-science/registered-port) để biết thêm thông tin.

**`--config`**: Điều này mong đợi đường dẫn đến tệp cấu hình chính mà chúng tôi đã tải xuống trước đó.
> Đây là ví dụ đối số `--config`:
```
--config $HOME/cardano/testnet-config.json
```
> Hãy đảm bảo rằng `alonzo-genesis.json`, `byron-genesis.json` và `shelley-genesis.json` có trong đường dẫn mà cps trong file `config.json` .

Đây là một ví dụ thực tế để chạy `cardano-node`:

```bash
cardano-node run \
--config $HOME/cardano/testnet-config.json \
--database-path $HOME/cardano/db/ \
--socket-path $HOME/cardano/db/node.socket \
--host-addr 127.0.0.1 \
--port 1337 \
--topology $HOME/cardano/testnet-topology.json
```

Nếu bạn đã thiết lập mọi thứ chính xác, bạn sẽ thấy một cái gì đó như sau:

```
Listening on http://127.0.0.1:12798
[cardano.node.networkMagic:Notice:5] [2021-05-20 12:17:10.02 UTC] NetworkMagic 1097911063
[cardano.node.basicInfo.protocol:Notice:5] [2021-05-20 12:17:10.02 UTC] Byron; Shelley
[cardano.node.basicInfo.version:Notice:5] [2021-05-20 12:17:10.02 UTC] 1.XX.X
[cardano.node.basicInfo.commit:Notice:5] [2021-05-20 12:17:10.02 UTC] 9a7331cce5e8bc0ea9c6bfa1c28773f4c5a7000f
[cardano.node.basicInfo.nodeStartTime:Notice:5] [2021-05-20 12:17:10.02 UTC] 2021-05-20 12:17:10.024924 UTC
[cardano.node.basicInfo.systemStartTime:Notice:5] [2021-05-20 12:17:10.02 UTC] 2019-07-24 20:20:16 UTC
[cardano.node.basicInfo.slotLengthByron:Notice:5] [2021-05-20 12:17:10.02 UTC] 20s
[cardano.node.basicInfo.epochLengthByron:Notice:5] [2021-05-20 12:17:10.02 UTC] 21600
[cardano.node.basicInfo.slotLengthShelley:Notice:5] [2021-05-20 12:17:10.02 UTC] 1s
[cardano.node.basicInfo.epochLengthShelley:Notice:5] [2021-05-20 12:17:10.02 UTC] 432000
[cardano.node.basicInfo.slotsPerKESPeriodShelley:Notice:5] [2021-05-20 12:17:10.02 UTC] 129600
[cardano.node.basicInfo.slotLengthAllegra:Notice:5] [2021-05-20 12:17:10.02 UTC] 1s
[cardano.node.basicInfo.epochLengthAllegra:Notice:5] [2021-05-20 12:17:10.02 UTC] 432000
[cardano.node.basicInfo.slotsPerKESPeriodAllegra:Notice:5] [2021-05-20 12:17:10.02 UTC] 129600
[cardano.node.basicInfo.slotLengthMary:Notice:5] [2021-05-20 12:17:10.02 UTC] 1s
[cardano.node.basicInfo.epochLengthMary:Notice:5] [2021-05-20 12:17:10.02 UTC] 432000
[cardano.node.basicInfo.slotsPerKESPeriodMary:Notice:5] [2021-05-20 12:17:10.02 UTC] 129600
[cardano.node.addresses:Notice:5] [2021-05-20 12:17:10.05 UTC] [SocketInfo 0.0.0.0:9999,SocketInfo [::]:9999]
[cardano.node.diffusion-mode:Notice:5] [2021-05-20 12:17:10.05 UTC] InitiatorAndResponderDiffusionMode
[cardano.node.dns-producers:Notice:5] [2021-05-20 12:17:10.05 UTC] [DnsSubscriptionTarget {dstDomain = "relays-new.cardano-testnet.iohkdev.io", dstPort = 3001, dstValency = 2}]
[cardano.node.ip-producers:Notice:5] [2021-05-20 12:17:10.05 UTC] IPSubscriptionTarget {ispIps = [], ispValency = 0}
[cardano.node.ChainDB:Info:5] [2021-05-20 12:17:10.06 UTC] Opened imm db with immutable tip at genesis (origin) and chunk 0
[cardano.node.ChainDB:Info:5] [2021-05-20 12:17:10.06 UTC] Opened vol db
[cardano.node.ChainDB:Info:5] [2021-05-20 12:17:10.06 UTC] Replaying ledger from genesis
[cardano.node.ChainDB:Info:5] [2021-05-20 12:17:10.07 UTC] Opened lgr db
[cardano.node.ChainDB:Info:5] [2021-05-20 12:17:10.07 UTC] Opened db with immutable tip at genesis (origin) and tip genesis (origin)
[cardano.node.ChainDB:Notice:33] [2021-05-20 12:17:10.08 UTC] Chain extended, new tip: 1e64e74bd7ac76d6806480a28017deb0aedd356fb61844ec95c429ae2f30c7c3 at slot 0
```

Đồng bộ hóa chuỗi khối từ 0 có thể mất một thời gian. Xin hãy kiên nhẫn. Nếu bạn muốn dừng đồng bộ hóa, bạn có thể thực hiện việc này bằng cách nhấn `CTRL` + `C` khi đang ở trong terminal. Chạy lại `cardano-node` lệnh với các tham số chính xác sẽ tiếp tục đồng bộ hóa chuỗi khối.

### Truy vấn Blockchain Cardano

Bây giờ chúng tôi đã chạy `cardano-node` và đồng bộ hóa, chúng tôi có thể kiểm tra nó bằng cách truy vấn dữ liệu blockchain; đó là điểm hiện tại mà nút cục bộ của bạn được đồng bộ hóa. Để làm điều này, chúng tôi sử dụng `cardano-cli`.
Nhưng trước khi chúng ta có thể làm điều đó, `cardano-cli` và các thành phần phần mềm `Cardano` khác cần biết node socket nằm ở đâu. Chúng tôi đã lưu nó vào đường dẫn `$HOME/cardano/db/node.socket` trong ví dụ trước. Các thành phần đọc biến môi trường shell `CARDANO_NODE_SOCKET_PATH` để tìm ra điều này.

Vì vậy, chúng tôi sẽ thiết lập điều đó trong `$HOME/.bashrc` hoặc `$HOME/.zshrc`, tùy thuộc vào ứng dụng shell mà bạn sử dụng. Trong Windows, bạn có thể làm theo hướng dẫn sau: [Cách đặt Biến Môi trường trong Windows](https://phoenixnap.com/kb/windows-set-environment-variable).

Thêm dòng này vào cuối hồ sơ shell của bạn (**MacOS** and **Linux**):
```
export CARDANO_NODE_SOCKET_PATH="$HOME/cardano/db/node.socket"
```

Sau khi được lưu, hãy tải lại shell/terminal của bạn để các thay đổi có hiệu lực.

Cuối cùng, bây giờ chúng tôi có thể kiểm tra truy vấn blockchain của chúng tôi `cardano-node`:

- Trước hết chạy `cardano-node` trong một terminal đriêng biệt để đồng bộ (nếu nó chưa chạy).
- Mở một terminal khác và chạy dòng lệnh sau`cardano-cli query tip --testnet-magic 1097911063`.

> Bạn sẽ thấy như sau:
> ```json
{
    "blockNo": 2598870,
    "headerHash": "e5be38153db4dc639134969e6449f37e105e0c5228f828f76a885968b4423aaf",
    "slotNo": 27149964
}```

:::Ghi chú
Chúng tôi đưa `--testnet-magic <NetworkMagic>` vào tham số cho `cardano-cli query tip` bởi vì chúng tôi đang sử dụng một nút `testnet`. Nếu bạn định truy vấn `mainnet` =, hãy sử dụng tham số `--mainnet`  và đảm bảo rằng nút của bạn được kết nối với mạng `mainnet`.
:::

Những gì bạn thấy ở đây là dữ liệu cục bộ của nút của bạn. Trường hợp này, có nghĩa là bạn được đồng bộ hóa với  `blockNo: 2598870` và `slotNo: 27149964`.

Để biết liệu bạn đã được đồng bộ hóa hoàn toàn hay chưa, bạn có thể kiểm tra **Cardano Blockchain Explorer** của mạng liên quan:

#### Mainnet Explorer
[https://explorer.cardano.org](https://explorer.cardano.org)

#### Testnet Explorer
[https://explorer.cardano-testnet.iohkdev.io](https://explorer.cardano-testnet.iohkdev.io)

Cuộn xuống phần **Khối mới nhất** và bạn có thể tìm thấy  mạng mới nhất.

![img](../../static/img/integrate-cardano/latest-block.png)

:::important
Trước khi thực hiện bất kỳ giao dịch nào, hãy đảm bảo rằng bạn đã được đồng bộ hóa hoàn toàn với mạng blockchain.
:::

Xin chúc mừng, bạn đã sẵn sàng khám phá thế giới **Cardano**! 🎉🎉🎉
