Cài đặt Node cho Cardano trên mạng Testnet
========================
Xây dựng Node cho Cardano trên mạng Testnet với hệ điều hành Ubuntu 20.04

Tài nguyên

Cấu hình máy tính tốt:
Máy tính cài phần mềm 32 GB ram 
Hơn 100 GB dung lượng ổ cứng 
Với hệ điều hành Ubuntu 20.04
Cài đặt Máy chủ Ubuntu (Linux)

<iframe width="100%" height="450" src="https://www.youtube.com/embed/HM9Jc8L-xOw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe> 

Cài đặt Cardano Node
-----

Tạo nơi lưu trữ các tập tin liên quan đến Cardano.

```
sudo whoami
sudo mkdir ~/cardano

```

Tải xuống và giải nén tệp nhị phân được biên dịch trước cho Cardano Node. Sau đây là kể từ tháng 3 năm 2023. [Truy cập ](https://github.com/input-output-hk/cardano-node/releases) để tải phiên bản mới nhất.

Tạo thư mục và chép hai mã nhị phân chính vào ~/.local/bin.

```
sudo mkdir -p ~/.local/bin

cd ~/.local/bin


sudo wget https://s3.ap-southeast-1.amazonaws.com/update-cardano-mainnet.iohk.io/cardano-node-releases/cardano-node-1.35.6-linux.tar.gz
sudo tar zxvf cardano-node-1.35.6-linux.tar.gz


```

```

sudo chmod 700 cardano-cli
sudo chmod 700 cardano-node

```

Ngoài ra, bạn có thể dành cả ngày để xây dựng các tệp nhị phân từ nguồn. Bạn sẽ mất rất nhiều thời gian, bạn sẽ nản lòng sau hai giờ đầu tiên và muốn bỏ nó. Việc sử dụng các mã nhị phân ở trên (được xây dựng bởi IOHK, nhóm đứng sau Cardano) chỉ mất vài giây, ít tham gia hơn và chính xác là những gì bạn nhận được nếu bạn tự xây dựng chúng. [Đây là hướng dẫn bạn tự xây dựng các file nhị phân](https://cardano2vn.io/docs/setup-application/setup-node-mainnet) 


Bạn có thế download `cardano-addresses` để khôi phục ví từ các cụm từ ghi nhớ

```
#cardano-addresses 
cd ~/.local/bin

sudo wget https://github.com/input-output-hk/cardano-addresses/releases/download/3.12.0/cardano-addresses-3.12.0-linux64.tar.gz
sudo tar zxvf cardano-addresses-3.12.0-linux64.tar.gz

sudo cp ~/.local/bin/bin/cardano-address ~/.local/bin/

sudo chmod 700 cardano-address

```


Thêm local/bin đó vào đường dẫn của shell của bạn.

```
export PATH="$HOME/.local/bin/:$PATH"
```

Nối dòng trên vào ~/.bashrc của bạn. 

Ví dụ: 

```
echo export PATH=~/.local/bin:$PATH >> ~/.bashrc

source ~/.bashrc

echo $PATH
```
Kiểm tra phiên bản cardano

```
sudo chown -R nvhieu ~/.local

cardano-cli --version
cardano-node --version
```

Tải xuống blockchain
------

Tạo một nơi để đặt testnet blockchain.

```
sudo mkdir ~/cardano/preprod
cd ~/cardano/preprod
sudo  mkdir db
sudo chown -R nvhieu ~/cardano
```

Tải xuống tệp cấu hình testnet từ IOHK.

```
#preprod-testnet
cd ~/cardano/preprod
wget https://book.world.dev.cardano.org/environments/preprod/config.json
wget https://book.world.dev.cardano.org/environments/preprod/db-sync-config.json
wget https://book.world.dev.cardano.org/environments/preprod/submit-api-config.json
wget https://book.world.dev.cardano.org/environments/preprod/topology.json
wget https://book.world.dev.cardano.org/environments/preprod/byron-genesis.json
wget https://book.world.dev.cardano.org/environments/preprod/shelley-genesis.json
wget https://book.world.dev.cardano.org/environments/preprod/alonzo-genesis.json
```

Đặt một số biến môi trường.

```


echo export CARDANO_NODE_SOCKET_PATH="$HOME/cardano/preprod/node.socket" >> $HOME/.bashrc
source ~/.bashrc

echo $CARDANO_NODE_SOCKET_PATH
```
Cấp quyền cho user 

```
sudo chown -R nvhieu ~/cardano
```
Kết nối với testnet và tải xuống blockchain. Quá trình này có thể mất vài giờ.

tạo file cnode.sh trong thư mục `~/cardano/preprod` với nội dung sau:


```
sudo nano cnode.sh
```

```

cardano-node run \
--topology ~/cardano/preprod/topology.json \
--database-path ~/cardano/preprod/db \
--socket-path "${CARDANO_NODE_SOCKET_PATH}" \
--host-addr 0.0.0.0 \
--port 3001 \
--config ~/cardano/preprod/config.json
```
và đặt mode cho file cnode.sh

```
sudo chmod 777 cnode.sh
```

dùng lệnh tmux để mở cử sổ mới và chạy lệnh 

```
~/cardano/preprod

./cnode.sh
```


Kiểm tra xem liệu nút của bạn đã được đồng bộ hóa chưa.
Mở cửa sổ shell thứ hai 

```
cardano-cli query tip --testnet-magic 1
```



