---
id: install-cardano-node-written
title: Install cardano-node
sidebar_label: Cài đặt cardano-node
description: "Stake pool course: Learn how to install cardano-node and all its dependencies."
#image: ../img/og-developer-portal.png
---

## Điều kiện tiên quyết

Kiểm tra [Bản phát hành cardano-node mới nhất](https://github.com/input-output-hk/cardano-node/releases) và thiết lập nền tảng của bạn:

Bạn sẽ cần:

* Máy chủ x86 ( AMD hoặc Intel ) , Phiên bản Máy ảo hoặc AWS có ít nhất 2 core, 12GB RAM và ít nhất 100 GB dung lượng đĩa trống;
* Phiên bản gần đây của Linux, không phải Windows hoặc MacOS - điều này sẽ giúp chúng tôi cô lập mọi vấn đề phát sinh.
* Đảm bảo rằng bạn đang sử dụng mạng không có tường lửa. Đặc biệt, chúng tôi sẽ sử dụng cổng TCP/IP 3000 và 3001 theo mặc định để thiết lập kết nối với các nút khác, vì vậy điều này sẽ cần phải mở.

## Cài đặt phần phụ thuộc

Chúng tôi cần các gói và công cụ sau trên hệ thống Linux của mình để tải xuống mã nguồn và xây dựng nó:

* the version control system `git`,
* the `gcc` C-compiler,
* C++ support for `gcc`,
* developer libraries for the arbitrary precision library `gmp`,
* developer libraries for the compression library `zlib`,
* developer libraries for `systemd`,
* developer libraries for `ncurses`,
* `ncurses` compatibility libraries,
* the Haskell build tool `cabal`,
* the GHC Haskell compiler.

Nếu chúng tôi đang sử dụng phiên bản AWS chạy Amazon Linux AMI 2 ( [xem hướng dẫn AWS](../lesson-1#setup-a-linux-server-on-aws) để biết cách khởi động và chạy phiên bản đó ) hoặc một hệ thống dựa trên CentOS / RHEL khác, chúng tôi có thể cài đặt các phần phụ thuộc này như sau:

```sh
sudo yum update -y
sudo yum install git gcc gcc-c++ tmux gmp-devel make tar wget jq -y
sudo yum install zlib-devel libtool autoconf -y
sudo yum install systemd-devel ncurses-devel ncurses-compat-libs -y
```

Đối với Debian / Ubuntu, hãy sử dụng cách sau để thay thế:

```sh
sudo apt-get update -y
sudo apt-get install build-essential pkg-config libffi-dev libgmp-dev -y
sudo apt-get install libssl-dev libtinfo-dev libsystemd-dev zlib1g-dev -y
sudo apt-get install make g++ tmux git jq wget libncursesw5 libtool autoconf -y
```

Nếu bạn đang sử dụng phiên bản Linux khác, bạn sẽ cần sử dụng trình quản lý gói phù hợp với nền tảng của mình thay vì `yum` hoặc `apt-get` và tên của các gói bạn cần cài đặt có thể khác nhau.

## Download, unpack, install and update Cabal:

```sh
wget https://downloads.haskell.org/~cabal/cabal-install-3.2.0.0/cabal-install-3.2.0.0-x86_64-unknown-linux.tar.xz
tar -xf cabal-install-3.2.0.0-x86_64-unknown-linux.tar.xz
rm cabal-install-3.2.0.0-x86_64-unknown-linux.tar.xz cabal.sig
mkdir -p $HOME/.local/bin
mv cabal $HOME/.local/bin/
```

xác thực .local/bin là đường dẫn trong PATH

```sh
echo $PATH
```

nếu .local/bin không có trong PATH, Bạn cần làm theo trong file `.bashrc`

Điều hướng đến thư mục chính của bạn:

```sh
cd
```

Bạn mở file .bashrc với lệnh nano  để  editor

```sh
nano .bashrc
```

đi xuống dòng cuối cùng

```sh
export PATH="$HOME/.local/bin:$PATH"
```

Chạy lại file .bashrc

```sh
source .bashrc
```

Update cabal

```sh
cabal update
```

Trên đây hướng dẫn cài đặt phiên bản `Cabal 3.2.0.0`. Bạn có thể kiểm tra phiên bản bằng cách gõ

```sh
cabal --version
```

## Download and install GHC:

Cho hệ thống Debian/Ubuntu:

```sh
wget https://downloads.haskell.org/~ghc/8.10.2/ghc-8.10.2-x86_64-deb9-linux.tar.xz
tar -xf ghc-8.10.2-x86_64-deb9-linux.tar.xz
rm ghc-8.10.2-x86_64-deb9-linux.tar.xz
cd ghc-8.10.2
./configure
sudo make install
cd ..
```

Cho hệ thống CentOS/RHEL:

```sh
wget https://downloads.haskell.org/~ghc/8.10.2/ghc-8.10.2-x86_64-centos7-linux.tar.xz
tar -xf ghc-8.10.2-x86_64-centos7-linux.tar.xz
rm ghc-8.10.2-x86_64-centos7-linux.tar.xz
cd ghc-8.10.2
./configure
sudo make install
cd ..
```

Alternatively, the ghcup tool can be used to install and set several versions of GHC:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh
ghcup upgrade
ghcup install <VERSION>
ghcup set <VERSION>
```

`<VERSION>` here could be for example 8.10.2

You can check that your default GHC version has been properly set:

```sh
ghc --version
```

## Install Libsodium

```sh
export LD_LIBRARY_PATH="/usr/local/lib:$LD_LIBRARY_PATH"
export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH"

git clone https://github.com/input-output-hk/libsodium
cd libsodium
git checkout 66f017f1
./autogen.sh
./configure
make
sudo make install
```

## Download the source code for cardano-node

```sh
cd
git clone https://github.com/input-output-hk/cardano-node.git
```

This creates the folder `cardano-node` and downloads the latest source code.

After the download has finished, we can check its content by

```sh
ls cardano-node
```

We change our working directory to the downloaded source code folder:

```sh
cd cardano-node
```

For reproducible builds, we should check out a specific release, a specific "tag". For the Shelley Testnet, we will use tag `1.24.2`, which we can check out as follows:

```sh
git fetch --all --tags
git tag
git checkout $(curl -s https://api.github.com/repos/input-output-hk/cardano-node/releases/latest | jq -r .tag_name)
```

## Build and install the node

Now we build and install the node with `cabal`, which will take a few minutes the first time you do a build. Later builds will be much faster, because everything that does not change will be cached.

```sh
cabal clean
cabal update
cabal build all
```

Now we can copy the executables files to the .local/bin directory

```sh
cp -p dist-newstyle/build/x86_64-linux/ghc-8.10.2/cardano-node-1.24.2/x/cardano-node/build/cardano-node/cardano-node $HOME/.local/bin/
```

```sh
cp -p dist-newstyle/build/x86_64-linux/ghc-8.10.2/cardano-cli-1.24.2/x/cardano-cli/build/cardano-cli/cardano-cli $HOME/.local/bin/
```

```sh
cardano-cli --version
```

## If you need to update to a newer version follow the steps below:

```sh
cd cardano-node
git fetch --all --tags
git tag
git checkout tags/<the-tag-you-want>
cabal update
cabal build cardano-node cardano-cli
```

This is a good time to backup your current binaries (in case you have to revert to an earlier version). Something like this will work:

```sh
cd $HOME/.local/bin
mv cardano-cli cardano-cli-backup
mv cardano-node cardano-node-backup
```

Now copy your newly built binaries to the appropriate directory, with:

```sh
cp -p dist-newstyle/build/x86_64-linux/ghc-8.10.2/cardano-node-<NEW VERSION>/x/cardano-node/build/cardano-node/cardano-node $HOME/.local/bin/

cp -p dist-newstyle/build/x86_64-linux/ghc-8.10.2/cardano-cli-<NEW VERSION>/x/cardano-cli/build/cardano-cli/cardano-cli $HOME/.local/bin/
```

:::note
It might be necessary to delete the `db`-folder \(the database-folder\) before running an updated version of the node.
:::
