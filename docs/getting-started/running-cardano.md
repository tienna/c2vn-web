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
> In this case, we expect nodes in your [LAN (Local Area Network)](https://en.wikipedia.org/wiki/Local_area_network) to connect via `192.168.0.1`, assuming that the `IP Address` of the machine `cardano-node` is running on; replace it with your real `IP Address`. If you don't expect or need external nodes to connect to your node, you can use the loopback address `127.0.0.1`. If you have multiple network interfaces and unsure what to use, you can simply use `0.0.0.0` to accept connections from any network interface.

**`--port`**: In conjunction with the `IP Address`, we will also set the `port` that your `cardano-node` will use for listening to any incoming connection.
> Here is an example `--port` argument:
```
--port 1337
```
> You can choose whatever `port` number you like, but it is recommended to use `port` numbers `1024` and above. See [Registered Port](https://www.sciencedirect.com/topics/computer-science/registered-port) for more information.

**`--config`**: This expects the path to the main configuration file that we have downloaded previously.
> Here is an example `--config` argument:
```
--config $HOME/cardano/testnet-config.json
```
> Please make sure that the `alonzo-genesis.json`, `byron-genesis.json` and `shelley-genesis.json` are in the same directory as the `config.json`.

Here is a realistic example for running `cardano-node`:

```bash
cardano-node run \
--config $HOME/cardano/testnet-config.json \
--database-path $HOME/cardano/db/ \
--socket-path $HOME/cardano/db/node.socket \
--host-addr 127.0.0.1 \
--port 1337 \
--topology $HOME/cardano/testnet-topology.json
```

If you have everything set correctly, you should see something like this:

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

Syncing the blockchain from zero can take a while. Please be patient. If you want to stop syncing, you can do so by pressing `CTRL` + `C` while in the terminal. Rerunning the `cardano-node run` command with the correct parameters will resume syncing the blockchain.

### Querying the Cardano Blockchain

Now that we have `cardano-node` running and syncing, we can test it out by querying the blockchain tip data; which is the current point your local node is synced. To do this, we use the `cardano-cli` command-line application.

But before we can do that, `cardano-cli` and other **Cardano** software components need to know where the node socket file is located. We saved it to the path `$HOME/cardano/db/node.socket` in the previous example. The components read the shell environment variable `CARDANO_NODE_SOCKET_PATH` to find this.

So we will set that in `$HOME/.bashrc` or `$HOME/.zshrc`, depending on which shell application that you use. In Windows, you can follow this guide: [How to Set Environment Variable in Windows](https://phoenixnap.com/kb/windows-set-environment-variable).

Add this line to the bottom of your shell profile (**MacOS** and **Linux**):
```
export CARDANO_NODE_SOCKET_PATH="$HOME/cardano/db/node.socket"
```

Once saved, reload your shell/terminal for changes to take effect.

Finally, we can now test querying the blockchain tip of our `cardano-node`:

- First, run `cardano-node` in a separate terminal for it to start syncing (if not already).
- Open another terminal and run the following command `cardano-cli query tip --testnet-magic 1097911063`.
> You should see something like this:
> ```json
{
    "blockNo": 2598870,
    "headerHash": "e5be38153db4dc639134969e6449f37e105e0c5228f828f76a885968b4423aaf",
    "slotNo": 27149964
}

:::note
We include `--testnet-magic <NetworkMagic>` in the parameter for `cardano-cli query tip` because we are using a `testnet` node. If you intend to query `mainnet` instead, please use the `--mainnet` parameter  and make sure your node is connected to the `mainnet` network.
:::

What you see here is the local tip data of your node. This case, means that you are synced up to `blockNo: 2598870` and `slotNo: 27149964`.

To know whether you are fully synced or not, you can check the **Cardano Blockchain Explorer** of the relevant network:

#### Mainnet Explorer
[https://explorer.cardano.org](https://explorer.cardano.org)

#### Testnet Explorer
[https://explorer.cardano-testnet.iohkdev.io](https://explorer.cardano-testnet.iohkdev.io)

Scroll down to the **Latest Blocks** section, and you can find the latest network tip.

![img](../../static/img/integrate-cardano/latest-block.png)

:::important
Before making any transactions, make sure you are fully synced to the blockchain network.
:::

Congratulations, you are now ready to explore the world of **Cardano**! 🎉🎉🎉
