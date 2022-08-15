 Build notes
==================

Các mã nhị phân Cardano 1.35.3 được xây dựng qua Ubuntu 20.04 (glibc-2.31)

Chứa các tệp cấu hình mạng và alonzo genesis cho mainnet và testnet.


## Yêu cầu libsodium và secp256k1


### Điều kiện tiên quyết cho Ubuntu

```
sudo apt install automake build-essential pkg-config libffi-dev libgmp-dev libssl-dev libtinfo-dev libsystemd-dev zlib1g-dev make g++ tmux git jq wget libncursesw5 libtool autoconf liblmdb-dev -y
```
### Hướng dẫn cài đặt libsodium

Tạo một thư mục làm việc cho các bản dựng của bạn:

```
mkdir -p ~/src

cd ~/src

```

Tải xuống và cài đặt libsodium:

```
git clone https://github.com/input-output-hk/libsodium

cd libsodium

git checkout 66f017f1

./autogen.sh

./configure

make

sudo make install

```

Thêm phần sau vào tệp .bashrc của bạn và nguồn nó:

```
echo "export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/usr/local/lib"" >> ~/.bashrc

echo "export PKG_CONFIG_PATH="$PKG_CONFIG_PATH:/usr/local/lib/pkgconfig"" >> ~/.bashrc

source ~/.bashrc

```

### Hướng dẫn cài đặt secp256k1

Tạo một thư mục làm việc nếu bạn chưa có

```
mkdir -p ~/src

cd ~/src

```

Tải xuống và cài đặt secp256k1

```
git clone https://github.com/bitcoin-core/secp256k1.git

cd secp256k1

git reset --hard $SECP256K1_REF

./autogen.sh

./configure  --enable-module-schnorrsig --enable-experimental

make

sudo make install

```

Đối với những người chạy cardano-node như một dịch vụ systemd, hãy chạy như sau:


```
sudo ldconfig

```

Điều này đảm bảo hệ thống nhận thức được libsodium và secp256k1 (không chỉ ở cấp độ người dùng).

-------------------------


PS: nếu chạy cardano-node báo lỗi copy thêm 2 thư viện này

```
sudo cp /snap/core20/1597/usr/lib/aarch64-linux-gnu/libssl.so.1.1 /usr/local/lib

sudo cp /snap/core20/1597/usr/lib/aarch64-linux-gnu/libcrypto.so.1.1 /usr/local/lib
```
