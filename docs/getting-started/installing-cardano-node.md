---
id: installing-cardano-node
title: Cài đặt cardano-node và cardano-cli từ mã ngồn
sidebar_label: Cài đặt cardano-node
description: Hướng dẫn này chỉ ra cách xây dựng và cài đặt cardano-node và cardano-cli từ mã nguồn cho tất cả các Hệ điều hành chính
#image: ./img/og-developer-portal.png
--- 
import HydraBuildList from '@site/src/components/docs/HydraBuildList';

### Tổng quat


Hướng dẫn này sẽ chỉ cho bạn cách biên dịch và cài đặt `cardano-node` và `cardano-cli` vào hệ điều hành bạn chọn, trực tiếp từ mã nguồn. Nó sẽ cho phép bạn tương tác với chuỗi khối **Cardano** , bao gồm nhưng không giới hạn ở việc **giao dịch** gửi/nhận  , tạo **NFT** , đăng giao dịch **siêu dữ liệu** vào blockchain, minting/burning **native tokens** , tạo nhóm cổ phần **pool**, thực hiện hợp đồng thông minh  **smart contracts** , v.v. !

:::note
Nếu bạn muốn tránh tự biên dịch các tệp nhị phân, bạn có thể tải xuống các phiên bản mới nhất của `cardano-node` và `cardano-cli` từ các liên kết bên dưới.

<HydraBuildList
    latest="9116257"
    linux="9116140"
    macos="9116041"
    win64="9115926"/>

Các thành phần có thể được xây dựng và chạy trên **Windows và MacOS** , nhưng chúng tôi khuyên các nhà điều hành nhóm cổ phần sử dụng **Linux ** trong quá trình sản xuất để tận dụng các lợi thế về hiệu suất liên quan.
:::

### Điều kiện tiên quyết

Để thiết lập các thành phần, bạn sẽ cần:

* **Windows**, **MacOS**, hoặc **Linux** cho hệ điều hành của bạn
* Bộ xử lý intel hoặc AMD x86 với ** hai lõi trở lên, ở tốc độ 1,6 GHz hoặc nhanh hơn ** ((2 GHz hoặc nhanh hơn đối với nhóm cổ phần hoặc relay)  
* **12GB** RAM và ít nhất **30GB** dung lượng đĩa trống

:::note
Nếu có ý định kết nối với phiên bản mainnet, các yêu cầu về RAM và dung lượng lưu trữ sẽ tăng lên ngoài giới hạn cơ bản ở trên.
:::

### Chọn nền tảng của bạn

* [Linux](#linux)
* [MacOS](#macos)
* [Windows](#windows)


## Linux

Trong phần này, chúng tôi sẽ hướng dẫn bạn quá trình tải xuống, biên dịch và cài đặt `cardano-node` và `cardano-cli` đưa vào hệ điều hành dựa trên **Linux-based**. 

#### Installing Operating System dependencies

Để tải xuống mã nguồn và xây dựng nó, bạn cần có các gói và công cụ sau trên hệ thống Linux của mình:

* the version control system `git`,
* the `gcc` C-compiler,
* C++ support for `gcc`,
* developer libraries for the arbitrary precision library `gmp`,
* developer libraries for the compression library `zlib`,
* developer libraries for `systemd`,
* developer libraries for `ncurses`,
* `ncurses` compatibility libraries,
* the Haskell build tool `cabal`,
* the GHC Haskell compiler (version `8.10.7` or above).

Trong Redhat, Fedora, và Centos:
```bash
sudo yum update -y
sudo yum install git gcc gcc-c++ tmux gmp-devel make tar xz wget zlib-devel libtool autoconf jq -y
sudo yum install systemd-devel ncurses-devel ncurses-compat-libs -y
```

Đối với Debian / Ubuntu, hãy sử dụng phần sau để thay thế:

```bash
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install automake build-essential pkg-config libffi-dev libgmp-dev libssl-dev libtinfo-dev libsystemd-dev zlib1g-dev make g++ tmux git jq wget libncursesw5 libtool autoconf -y
```
Nếu bạn đang sử dụng phiên bản Linux khác, bạn sẽ cần sử dụng trình quản lý gói phù hợp cho nền tảng của mình thay vì `yum` hoặc `apt-get` và tên của các gói bạn cần cài đặt có thể khác nhau.

#### Cài đặt GHC và Cabal

Cách nhanh nhất để cài đặt **GHC** (Glasgow Haskell Compiler) và **Cabal ** (Kiến trúc chung cho các ứng dụng và thư viện xây dựng) là sử dụng [ghcup](https://www.haskell.org/ghcup).

Sử dụng lệnh sau để cài đặ `ghcup`

```bash
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh
```

Vui lòng làm theo hướng dẫn và cung cấp thông tin đầu vào cần thiết cho trình cài đặt.

`Do you want ghcup to automatically add the required PATH variable to "/home/ubuntu/.bashrc"?` - (P or enter)

`Do you want to install haskell-language-server (HLS)?` - (N or enter)

`Do you want to install stack?` - (N or enter)

`Press ENTER to proceed or ctrl-c to abort.` (enter)

Sau khi hoàn tất, bạn nên có `ghc` và `cabal` cài đặt vào hệ điều hành của mình.


:::note
`ghcup` sẽ cố gắng phát hiện shell của bạn và yêu cầu bạn thêm nó vào các biến môi trường. Vui lòng khởi động lại shell/terminal của bạn sau khi cài đặt  `ghcup`
:::

You can check if `ghcup` has been installed correctly by typing `ghcup --version` into the terminal. You should see something similar to the following: 
Bạn có thể kiểm tra xem` ghcup` đã được cài đặt chính xác chưa bằng cách nhập `ghcup --version` terminal. Bạn sẽ thấy một cái gì đó tương tự như sau:

```
The GHCup Haskell installer, version v0.1.17.4
```

`ghcup` sẽ cài đặt phiên bản ổn định mới nhất của  `ghc`. Tuy nhiên, tại thời điểm viết bài này, [Input-Output](https://iohk.io) khuyên bạn nên sử dụng `ghc 8.10.7`. Vì vậy, chúng ta sẽ sử dụng `ghcup` để cài đặt và chuyển sang phiên bản yêu cầu.

```bash
ghcup install ghc 8.10.7
ghcup set ghc 8.10.7
```

`ghcup` sẽ cài đặt phiên bản ổn định mới nhất của `cabal`.  Tuy nhiên, tại thời điểm viết bài này, [Input-Output](https://iohk.io)  khuyên bạn nên sử dụng `cabal 3.6.2.0`. Vì vậy, chúng ta sẽ sử dụng `ghcup`để cài đặt và chuyển sang phiên bản yêu cầu.

```bash
ghcup install cabal 3.6.2.0
ghcup set cabal 3.6.2.0
```


Cuối cùng, chúng tôi kiểm tra xem chúng tôi đã cài đặt đúng `ghc` và `cabal` các phiên bản chưa.

Kiểm tra ghcphiên bản:

```bash
ghc --version
```

Bạn sẽ thấy một cái gì đó như thế này:

```
The Glorious Glasgow Haskell Compilation System, version 8.10.7
```

kiểm tra phiên bản `cabal`: 

```bash
cabal --version
```

Bạn sẽ thấy một cái gì đó như thế này:

```
cabal-install version 3.6.2.0
compiled using version 3.6.2.0 of the Cabal library
```

:::Quan trọng 
Vui lòng xác nhận rằng các phiên bản bạn đã cài đặt khớp với các phiên bản được đề xuất ở trên. Nếu không, hãy kiểm tra xem bạn có bỏ sót bất kỳ bước nào trước đó không. 
:::

#### Tải xuống & Biên dịch

Hãy tạo một thư mục làm việc để lưu trữ mã nguồn và các bản dựng cho các thành phần.

```bash
mkdir -p $HOME/cardano-src
cd $HOME/cardano-src
```
Tiếp theo, chúng tôi sẽ tải xuống, biên dịch và cài đặt `libsodium`.

```bash
git clone https://github.com/input-output-hk/libsodium
cd libsodium
git checkout 66f017f1
./autogen.sh
./configure
make
sudo make install
```

Sau đó, chúng tôi sẽ thêm các biến môi trường sau vào shell của bạn. như: `$HOME/.zshrc` hoặc `$HOME/.bashrc` tùy thuộc vào ứng dụng shell nào bạn đang sử dụng. Thêm phần sau vào cuối tệp cấu profile/config shell của bạn để trình biên dịch có thể biết được rằng nó đã `libsodium` được cài đặt trên hệ thống của bạn.

```bash
export LD_LIBRARY_PATH="/usr/local/lib:$LD_LIBRARY_PATH"
export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH"
```

Sau khi được lưu, chúng tôi sẽ tải lại hồ sơ shell của bạn để sử dụng các biến mới. Chúng tôi có thể làm điều đó bằng cách gõ source `$HOME/.bashrc` hoặc source `$HOME/.zshrc` (tùy thuộc vào ứng dụng shell mà bạn sử dụng ).

Bây giờ chúng tôi đã sẵn sàng để tải xuống, biên dịch và cài đặt `cardano-node` và `cardano-cli`. Nhưng trước tiên, chúng ta phải đảm bảo rằng chúng ta đã quay lại thư mục gốc của thư mục làm việc:

```bash
cd $HOME/cardano-src
```

Tải xuống `cardano-node` từ kho lưu trữ:

```bash
git clone https://github.com/input-output-hk/cardano-node.git
cd cardano-node
git fetch --all --recurse-submodules --tags
```
Chuyển kho lưu trữ sang cam kết được gắn thẻ mới nhất:

```bash
git checkout $(curl -s https://api.github.com/repos/input-output-hk/cardano-node/releases/latest | jq -r .tag_name)
```

:::important
Nếu nâng cấp một nút hiện có, hãy đảm bảo rằng bạn đã đọc các [release notes on GitHub](https://github.com/input-output-hk/cardano-node/releases) để biết bất kỳ thay đổi nào.
:::

#### Định cấu hình các tùy chọn build

Chúng tôi sử dụng rõ ràng `ghc` phiên bản mà chúng tôi đã cài đặt trước đó. Điều này tránh để mặc định phiên bản hệ thống `ghc` có thể mới hơn hoặc cũ hơn phiên bản bạn đã cài đặt.

```bash
cabal configure --with-compiler=ghc-8.10.7
```

Nếu bạn đang chạy nền tảng không phải x86/x64 (ví dụ: ARM), vui lòng cài đặt và định cấu hình LLVM với: 

```bash
sudo apt install llvm-9
sudo apt install clang-9 libnuma-dev
sudo ln -s /usr/bin/llvm-config-9 /usr/bin/llvm-config
sudo ln -s /usr/bin/opt-9 /usr/bin/opt
sudo ln -s /usr/bin/llc-9 /usr/bin/llc
sudo ln -s /usr/bin/clang-9 /usr/bin/clang
```

#### Building và cài đặt  node

Bây giờ chúng ta có thể xây dựng `Haskell-based` `cardano-node` để tạo ra các tệp nhị phân thực thi.

```bash
cabal build cardano-node cardano-cli
```

Copy node và CLI mới được tạo vào thư mục `$HOME/.local/bin`:

```bash
mkdir -p $HOME/.local/bin
cp -p "$(./scripts/bin-path.sh cardano-node)" $HOME/.local/bin/
cp -p "$(./scripts/bin-path.sh cardano-cli)" $HOME/.local/bin/
```

Chúng ta phải thêm dòng này bên dưới hồ sơ shell của chúng ta để shell / terminal có thể nhận ra đó `cardano-node` và `cardano-cli` là các lệnh toàn cục. ( `$HOME/.zshrc` hoặc `$HOME/.bashrc` tùy thuộc vào ứng dụng shell bạn sử dụng )

```bash
export PATH="$HOME/.local/bin/:$PATH"
```

Sau khi được lưu, hãy tải lại hồ sơ shell của bạn bằng cách nhập `source $HOME/.zshrc` hoặc `source $HOME/.bashrc` ( tùy thuộc vào ứng dụng shell mà bạn sử dụng ).

Kiểm tra phiên bản đã được cài đặt:

```
cardano-cli --version
cardano-node --version
```

Xin chúc mừng, bạn đã cài đặt thành công các thành phần Cardano vào hệ thống Linux của mình!🎉🎉🎉

Tiếp theo, chúng ta sẽ nói về cách [run cardano-node](/docs/getting-started/running-cardano).

## Hệ điều hành Mac

In this section, we will walk you through the process of downloading, compiling, and installing `cardano-node` and `cardano-cli` into your **MacOS-based** operating system. 
Trong phần này, chúng tôi sẽ hướng dẫn bạn quá trình tải xuống, biên dịch, cài đặt `cardano-node` và `cardano-cli` trên hệ điều hành MacOS của bạn .

#### Cài đặt các phần phụ thuộc hệ điều hành 

Để tải xuống mã nguồn và xây dựng nó, bạn cần có các gói và công cụ sau trên hệ thống MacOS của mình:

* [Xcode](https://developer.apple.com/xcode) - TIDE phát triển của Apple và SDK / Công cụ
* [Xcode Command Line Tools](https://developer.apple.com/xcode/features/), bạn có thể cài đặt nó bằng cách nhập `xcode-select --install` vào terminal.
* [Homebrew](https://brew.sh) - Trình quản lý gói bị thiếu cho MacOS (hoặc Linux)

#### Cài đặt gói Homebrew

Để biên dịch đúng cách `cardano-node` và c`ardano-cli` các thành phần, chúng ta sẽ cần cài đặt một số thư viện thông qua brew:

```bash
brew install jq
brew install libtool
brew install autoconf
brew install automake
brew install pkg-config
```

#### Bạn sẽ cần cài đặt llvm trong trường hợp bạn đang sử dụng M1

```
brew install llvm
```

#### Cài đặt GHC và Cabal

Cách nhanh nhất để cài đặt GHC (Glassglow Haskell Compiler) và Cabal (Kiến trúc chung cho các ứng dụng và thư viện xây dựng) là sử dụng [ghcup](https://www.haskell.org/ghcup).

Sử dụng lệnh sau để cài đặt `ghcup`
```bash
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh
```
Vui lòng làm theo hướng dẫn và cung cấp thông tin đầu vào cần thiết cho trình cài đặt.

`Do you want ghcup to automatically add the required PATH variable to "/home/ubuntu/.bashrc"?` - (P or enter)

`Do you want to install haskell-language-server (HLS)?` - (N or enter)

`Do you want to install stack?` - (N or enter)

`Press ENTER to proceed or ctrl-c to abort.` (enter)

Sau khi hoàn tất, bạn nên có `ghc` và `cabal` cài đặt vào hệ thống của mình.


:::note
`ghcup` sẽ cố gắng phát hiện shell của bạn và sẽ yêu cầu bạn thêm nó vào các biến môi trường. Vui lòng khởi động lại shell / terminal của bạn sau khi cài đặt  `ghcup`
:::

Bạn có thể kiểm tra xem `ghcup` đã được cài đặt đúng cách chưa bằng cách nhập `ghcup --version` vào terminal. Bạn sẽ thấy một cái gì đó tương tự như sau:

```
The GHCup Haskell installer, version v0.1.17.4
```

`ghcup` wsẽ cài đặt phiên bản ổn định mới nhất của ghc. Tuy nhiên, tại thời điểm viết bài này, [Input-Output](https://iohk.io) khuyên bạn nên sử dụng `ghc 8.10.7`. Vì vậy, chúng ta sẽ sử dụng `ghcup` để cài đặt và chuyển sang phiên bản yêu cầu.

```bash
ghcup install ghc 8.10.7
ghcup set ghc 8.10.7
```

`ghcup` sẽ cài đặt phiên bản ổn định mới nhất của `cabal`. Tuy nhiên, tại thời điểm viết bài này, Input-Output khuyên bạn nên sử dụng `cabal 3.6.2.0`. Vì vậy, chúng ta sẽ sử dụng `ghcup` để cài đặt và chuyển sang phiên bản yêu cầu.

```bash
ghcup install cabal 3.6.2.0
ghcup set cabal 3.6.2.0
```

Cuối cùng, chúng tôi kiểm tra xem chúng tôi đã cài đặt đúng các phiên bản`ghc` và `cabal`  chưa.

Kiểm tra phiên bản`ghc` :
 
```bash
ghc --version
```
Bạn sẽ thấy một cái gì đó như thế này:

```
The Glorious Glasgow Haskell Compilation System, version 8.10.7
```

Kiểm tả phiên bản `cabal`: 

```bash
cabal --version
```

Bạn sẽ thấy một cái gì đó như thế này:

```
cabal-install version 3.6.2.0
compiled using version 3.6.2.0 of the Cabal library
```

:::quan trọng 
Vui lòng xác nhận rằng các phiên bản bạn đã cài đặt khớp với các phiên bản được đề xuất ở trên. Nếu không, hãy kiểm tra xem bạn có bỏ sót bất kỳ bước nào trước đó không
:::

#### Tải xuống & Biên dịch

Hãy tạo một thư mục làm việc để lưu trữ mã nguồn và các bản dựng cho các thành phần.

```bash
mkdir -p $HOME/cardano-src
cd $HOME/cardano-src
```
Tiếp theo, chúng tôi sẽ tải xuống, biên dịch và cài đặt `libsodium`.

```bash
git clone https://github.com/input-output-hk/libsodium
cd libsodium
git checkout 66f017f1
./autogen.sh
./configure
make
sudo make install
```

Sau đó, chúng tôi sẽ thêm các biến môi trường sau vào hồ sơ shell của bạn. như `$HOME/.zshrc` hoặc `$HOME/.bashrc` tùy thuộc vào ứng dụng shell nào bạn đang sử dụng. Thêm phần sau vào cuối tệp profile/config trình bao của bạn để trình biên dịch có thể biết rằng trình biên dịch đã `ibsodium` được cài đặt trên hệ thống của bạn.

```bash
export LD_LIBRARY_PATH="/usr/local/lib:$LD_LIBRARY_PATH"
export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH"
```

Nếu bạn đã cài đặt llvm cho M1, thì bạn cũng cần phải thêm cái này:

```bash
export PATH="/opt/homebrew/opt/llvm/bin:$PATH"
```

:::note
rằng đường dẫn cài đặt `llvm` có thể khác nhau dựa trên cài đặt của bạn, nếu bạn sử dụng cài đặt mặc định, nó sẽ ổn. Vui lòng kiểm tra màn hình sau khi bạn cài đặt llvm để xem thông tin này, nếu bạn quên hoặc mất nó, bạn chỉ cần cài đặt lại llvm và sau đó bạn sẽ thấy lại chúng.
:::



Sau khi được lưu, chúng tôi sẽ tải lại hồ sơ shell của bạn để sử dụng các biến mới. Chúng tôi có thể làm điều đó bằng cách gõ `source $HOME/.bashrc` hoặc `source $HOME/.zshrc` ( tùy thuộc vào ứng dụng shell mà bạn sử dụng ).
Bây giờ chúng tôi đã sẵn sàng để tải xuống, biên dịch và cài đặt `cardano-node` và `cardano-cli`. Nhưng trước tiên, chúng ta phải đảm bảo rằng chúng ta đã quay lại thư mục gốc của thư mục làm việc:

```bash
cd $HOME/cardano-src
```

Tải xuống kho lưu trữ `cardano-node`: 

```bash
git clone https://github.com/input-output-hk/cardano-node.git
cd cardano-node
git fetch --all --recurse-submodules --tags
```
Chuyển kho lưu trữ sang cam kết được gắn thẻ mới nhất:

```bash
git checkout $(curl -s https://api.github.com/repos/input-output-hk/cardano-node/releases/latest | jq -r .tag_name)
```

:::important
Nếu nâng cấp một nút hiện có, hãy đảm bảo rằng bạn đã đọc các ghi chú phát hành trên GitHub để biết bất kỳ thay đổi nào [release notes on GitHub](https://github.com/input-output-hk/cardano-node/releases).
:::

##### Định cấu hình các tùy chọn build

Chúng tôi sử dụng phiên bản `ghc`  mà chúng tôi đã cài đặt trước đó. Điều này tránh để mặc định phiên bản hệ thống `ghc` có thể mới hơn hoặc cũ hơn phiên bản bạn đã cài đặt.

```bash
cabal configure --with-compiler=ghc-8.10.7
```

#### Bạn sẽ cần chạy các lệnh sau trên M1, các lệnh đó sẽ thiết lập một số tùy chọn liên quan đến cabal trước khi xây dựng

```
echo "package trace-dispatcher" >> cabal.project.local
echo "  ghc-options: -Wwarn" >> cabal.project.local
echo "" >> cabal.project.local
```

#### Xây dựng và cài đặt nút

```bash
cabal build all
```

Cài đặt nút và CLI mới được xây dựng vào thư mụ `$HOME/.local/bin`:

```bash
mkdir -p $HOME/.local/bin
cp -p "$(./scripts/bin-path.sh cardano-node)" $HOME/.local/bin/
cp -p "$(./scripts/bin-path.sh cardano-cli)" $HOME/.local/bin/
```

Chúng ta phải thêm dòng này bên dưới hồ sơ shell của chúng ta để shell / terminal có thể nhận ra đó `cardano-node` và `cardano-cli` là các lệnh toàn cục. ( 1$HOME/.zshrchoặc $HOME/.bashrc1 tùy thuộc vào ứng dụng shell bạn sử dụng )

```bash
export PATH="$HOME/.local/bin/:$PATH"
```

Sau khi được lưu, hãy tải lại hồ sơ shell của bạn bằng cách nhập `source $HOME/.zshrc` hoặc `source $HOME/.bashrc`( tùy thuộc vào ứng dụng shell mà bạn sử dụng ).

Kiểm tra phiên bản đã được cài đặt:
```
cardano-cli --version
cardano-node --version
```

Xin chúc mừng, bạn đã cài đặt thành công các thành phần Cardano vào hệ thống MacOS của mình!🎉🎉🎉

Tiếp theo, chúng ta sẽ nói về cách [run cardano-node](/docs/getting-started/docs/getting-started/running-cardano).

## Windows

:::important
Hiện tại, hướng dẫn cài đặt Windows vẫn đang được thực hiện. Trong thời gian chờ đợi, chúng tôi khuyên bạn nên sử dụng [WSL (Windows Subsystem for Linux)](https://docs.microsoft.com/en-us/windows/wsl/) để có được môi trường Linux trên nền Windows. Sau khi cài đặt, bạn có thể sử dụng hướng dẫn  [Linux](#linux) để cài đặt và chạy `cardano-node` trong WSL .
:::
