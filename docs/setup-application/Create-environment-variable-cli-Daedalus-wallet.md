Cách tạo biến môi trường để sử dụng cardano-cli với Daedalus Wallet
===================================


## Tại sao làm điều này?
Nếu bạn muốn sử dụng `cardano-cli` và `cardano-wallet` các công cụ đi kèm với ví Daedalus, bạn sẽ cần tạo một biến môi trường.

## Linux
Trong shell của bạn, hãy nhập như sau:

```
export CARDANO_NODE_SOCKET_PATH="$HOME/cardano/testnet-db/node.socket"
```

Bạn có thể thêm dòng đó vào cuối file ~/.bashrc (Bash shell) hoặc ~/.zshrc (ZSH shell) để không phải gõ nó mỗi lần sử dụng.
```
sudo nano .bashrc
. .bashrc
```

## Windows

Windows sử dụng một đường dẫn được đặt tên thay vì một ổ cắm.

Kể từ tháng 12 năm 2021, không có cách nào dễ dàng (mà tôi biết) để có được đường ống được đặt tên. Mỗi lần ví Daedalus cập nhật lên phiên bản mới, tên của đường dẫn sẽ thay đổi. Điều này có nghĩa là bạn sẽ cần cập nhật biến môi trường của mình bất cứ khi nào có phiên bản mới của Ví Daedalus.

## Lấy tên đường dẫn
Sử dụng bất kỳ phương pháp nào sau đây để tìm tên đường ống Cardano. Nó sẽ trông giống như `\\.\pipe\cardano-node-mainnet.32564.0`

Phương pháp 1- Dòng lệnh:

```
wmic process get commandline | findstr pipe\cardano
```

Phương pháp 2- PowerShell

```
get-childitem \\.\pipe\ | findstr cardano
```

Phương pháp 3: ProcessExplorer
 Tìm kiếm cardano-wallet.exe và xem xét các đối số dòng lệnh của nó

## Tạo một biến môi trường
Sau đó, tạo một biến môi trường mới. Từ menu Bắt đầu, hãy tìm kiếm cái này:  `Edit environment variables for your account. Create a new one for "me"` (phần trên cùng):

- Tên biến: CARDANO_NODE_SOCKET_PATH
- Giá trị biến: \\.\pipe\cardano-node-mainnet.32564.0

## Xem nó có hoạt động không

Mở một dấu nhắc lệnh mới và nhập vào:
```
cd "C:\Program Files\Daedalus Mainnet"
cardano-cli query tip --mainnet
```

Bạn sẽ thấy một cái gì đó như thế này:
```
{
    "hash": "a3a93043d015e9bb089b1a90d59b1922dffb9684b5c64a61426b6134e348123d",
    "block": 6589745,
    "slot": 47163888,
    "syncProgress": "100.00",
    "era": "Alonzo",
    "epoch": 323
}
```
Nó thể hiện mạng Alonzo, epoch 323 , đồng bộ 100%.

## Xử lý sự cố

Nếu bạn cố gắng chạy một trong các lệnh sau để đặt biến môi trường từ dòng lệnh thay vì đặt biến theo cách được mô tả ở trên, thì bạn đã gặp lỗi. Những điều này cho những người đang tìm kiếm một giải pháp.

```
    # you may have tried this
    set CARDANO_NODE_SOCKET_PATH="\\.\pipe\cardano-node-mainnet.32564.0"
    # or maybe you tried this (escaping the backslashes)
    set CARDANO_NODE_SOCKET_PATH="\\\\.\\pipe\\cardano-node-mainnet.32564.0"

    cardano-cli query tip --mainnet
	
```

Điều này sẽ gây ra lỗi sau:
```
 cardano-cli: CreateFile "\"\\\\.\\pipe\\cardano-node-mainnet.32564.0\"": invalid argument (The filename, directory name, or volume label syntax is incorrect.)
 ```