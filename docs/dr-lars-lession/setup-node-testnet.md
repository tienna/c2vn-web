Cài đặt Node cho Cardano trên mạng Testnet
========================
Xây dựng Node cho Cardano trên mạng Testnet với hệ điều hành Ubuntu 20.04

Tài nguyên

Cấu hình máy tính tốt:
Máy tính cài phần mềm 32 GB ram 
Hơn 100 GB dung lượng ổ cứng 
Với hệ điều hành Ubuntu 20.04
Cài đặt Máy chủ Ubuntu (Linux)

Cài đặt Cardano Node
-----

Tạo nơi lưu trữ các tập tin liên quan đến Cardano.

```
mkdir ~/cardano
cd ~/cardano
```

Tải xuống và giải nén tệp nhị phân được biên dịch trước cho Cardano Node. Sau đây là kể từ tháng 12 năm 2021. Truy cập https://developers.cardano.org/docs/get-started/installing-cardano-node/ để tải phiên bản mới nhất.

```
wget https://hydra.iohk.io/build/8674953/download/1/cardano-node-1.31.0-linux.tar.gz
tar zxvf cardano-node-1.31.0-linux.tar.gz
```

Ngoài ra, bạn có thể dành cả ngày để xây dựng các tệp nhị phân từ nguồn. Nếu bạn giống tôi, bạn sẽ nản lòng sau hai giờ đầu tiên và muốn bỏ. Việc sử dụng các mã nhị phân ở trên (được xây dựng bởi IOHK, nhóm đứng sau Cardano) chỉ mất vài giây, ít tham gia hơn và chính xác là những gì bạn nhận được nếu bạn tự xây dựng chúng.

Sao chép hai mã nhị phân chính vào local/bin.

```
mkdir -p ~/.local/bin
cp ./cardano-cli ~/.local/bin/
cp ./cardano-node ~/.local/bin/
```

Thêm local/bin đó vào đường dẫn của shell của bạn.

```
export PATH="$HOME/.local/bin/:$PATH"
Nối dòng trên vào ~/.bashrctệp của bạn. Ví dụ:nano ~/.bashrc
```

Tải xuống blockchain
------

Tạo một nơi để đặt testnet blockchain.

```
mkdir ~/cardano/testnet
cd ~/cardano/testnet
mkdir testnet-db
```

Tải xuống tệp cấu hình testnet từ IOHK.

```
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-topology.json
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-shelley-genesis.json
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-config.json
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-byron-genesis.json
curl -O -J https://hydra.iohk.io/build/7654130/download/1/testnet-alonzo-genesis.json
```

Đặt một số biến môi trường.

```
export CARDANO_NODE_SOCKET_PATH="$HOME/cardano/testnet-db/node.socket"
```

Kết nối với testnet và tải xuống blockchain. Quá trình này có thể mất vài giờ.

```
cardano-node run \
--topology ~/cardano/configuration/testnet/testnet-topology.json \
--database-path ~/cardano/testnet-db \
--socket-path ~/cardano/testnet-db/node.socket \
--host-addr 127.0.0.1 \
--port 3001 \
--config ~/cardano/configuration/testnet/testnet-config.json
```

Kiểm tra xem liệu nút của bạn đã được đồng bộ hóa chưa.

```
cardano-cli query tip --testnet-magic 1097911063
```

Cài đặt Ví Cardano
-----

Mở cửa sổ shell thứ hai (sử dụng Alt + F2). Chúng tôi sẽ để nút chạy trong trình bao khác (chuyển trở lại nó bằng cách sử dụng Alt + F1). Ngoài ra, kết nối bằng Putty hoặc ứng dụng SSH yêu thích của bạn.

Tải xuống tệp nhị phân được biên dịch trước cho Ví Cardano và đặt nó ở vị trí cố định. Sau đây là kể từ tháng 12 năm 2021. Truy cập https://developers.cardano.org/docs/get-started/installing-cardano-wallet/ để tải phiên bản mới nhất.

```
mkdir ~/cardano/wallet
cd ~/cardano/wallet
wget https://hydra.iohk.io/build/8600272/download/1/cardano-wallet-v2021-11-11-linux64.tar.gz
tar zxvf cardano-wallet-v2021-11-11-linux64.tar.gz
cd cardano-wallet-v2021-11-11-linux64/
cp cardano-wallet ~/.local/bin/
```

Chạy Ví Cardano như một máy chủ API.

```
cardano-wallet serve \
--port 8090 \
--database ~/cardano/testnet-db \
--node-socket $CARDANO_NODE_SOCKET_PATH \
--testnet ~/cardano/configuration/testnet/testnet-byron-genesis.json
```

Để biết thêm thông tin, hãy xem Hướng dẫn sử dụng ví cardano.
https://input-output-hk.github.io/cardano-wallet/user-guide/cli