---
id: installing-cardano-wallet
title: Cài đặt cardano-wallet
sidebar_label: Cài đặt cardano-wallet
description: This guide shows how to build and install the cardano-wallet from the source-code for all major Operating Systems
#image: ./img/og-developer-portal.png
--- 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Tổng quan 

Trong hướng dẫn này, chúng tôi sẽ chỉ cho bạn cách biên dịch và cài đặt `cardano-wallet` vào hệ điều hành bạn chọn, trực tiếp từ mã nguồn. Thành phần này cung cấp [CLI (Command Line Interface)](https://en.wikipedia.org/wiki/Command-line_interface) và [Web API](https://en.wikipedia.org/wiki/Web_API) để tạo nhiều ví Cardano , gửi giao dịch, nhận chi tiết lịch sử giao dịch, số dư ví và hơn thế nữa!

:::note

Nếu bạn muốn tránh tự biên dịch các tệp nhị phân, Bạn có thể tải xuống các tệp nhị phân được tạo sẵn mới nhất `cardano-wallet` từ ​​các liên kết bên dưới. 

- [Linux](https://hydra.iohk.io/job/Cardano/cardano-wallet/cardano-wallet-linux64/latest)
- [MacOS](https://hydra.iohk.io/job/Cardano/cardano-wallet/cardano-wallet-macos64/latest)
- [Windows](https://hydra.iohk.io/job/Cardano/cardano-wallet/cardano-wallet-win64/latest)
  
Hướng dẫn này giả định rằng bạn đã cài đặ `cardano-node` and `cardano-cli` vào hệ thống của mình. Nếu không, bạn có thể tham khảo Hướng dẫn [Installing cardano-node](/docs/getting-started/installing-cardano-node) để biết hướng dẫn về cách thực hiện điều đó.

:::

:::QUAN TRỌNG

Bạn phải kết nối `cardano-node` với mạng `testnet` và đảm bảo rằng nó đã được đồng bộ hóa hoàn toàn. Nếu bạn không chắc chắn về cách thực hiện điều đó, bạn nên đọc Hướng dẫn [Running cardano-node](/docs/getting-started/running-cardano) trước khi tiếp tục.

:::

### Chọn Nền tảng

* [MacOS / Linux](#macos--linux)
* [Windows](#windows)

## MacOS / Linux

Trong phần này, chúng tôi sẽ hướng dẫn bạn quá trình tải xuống, biên dịch và cài đặt `cardano-wallet` vào hệ điều hành trên  

#### Tải xuống & Biên dịch 

Chúng tôi cần cài đặt ngăn xếp, nếu chúng tôi không có:

```bash
curl -sSL https://get.haskellstack.org/ | sh
```

Kiểm tra phiên bản đã được cài đặt:
```bash
stack --version
```

Bạn sẽ thấy một cái gì đó như thế này:

```bash
Version 2.7.3, Git revision 7927a3aec32e2b2e5e4fb5be76d0d50eddcc197f x86_64 hpack-0.34.4
```

Nếu bạn đã làm theo hướng dẫn [Installing cardano-node](/docs/getting-started/installing-cardano-node) Bạn sẽ có thư mục `$HOME/cardano-src` Nếu không, hãy tạo một thư mục làm việc để lưu trữ mã nguồn và xây dựng `cardano-wallet`.

```bash
mkdir -p $HOME/cardano-src
cd $HOME/cardano-src
```

Tiếp theo, chúng ta tải xuống mã nguồn `cardano-wallet`: 

```bash
git clone https://github.com/input-output-hk/cardano-wallet.git 
cd ./cardano-wallet/ 
```

Chuyển kho lưu trữ sang cam kết được gắn thẻ mới nhất:

```bash
TAG=$(git describe --tags --abbrev=0) && echo latest tag $TAG 
git checkout $TAG
```

:::QUAN TRỌNG
Bạn có thể kiểm tra phiên bản/thẻ mới nhất hiện có bằng cách truy cập trang `cardano-wallet` [Github Release](https://github.com/input-output-hk/cardano-wallet/releases) Tại thời điểm viết bài này, phiên bản hiện tại là  `v2021-11-11`. Bạn cũng có thể liệt kê tất cả các thẻ bằng lệnh `git tag -l`.
:::

#### Xây dựng và cài đặt node

Bây giờ chúng ta có thể xây dựng `cardano-wallet` mã để tạo ra các tệp nhị phân thực thi.

```bash
stack build --test --no-run-tests
```

Cài đặt tệp nhị phân `cardano-wallet` mới được xây dựng trong thư mục `$HOME/.local/bin`:

```bash
stack install
```

Kiểm tra phiên bản đã được cài đặt:

```bash
cardano-wallet version
```

Bạn sẽ thấy một cái gì đó như thế này:

```bash
v2021-11-11 (git revision: dac16ba7e3bf64bf5474497656932fd342c3b720)
```

Xin chúc mừng, bạn đã cài đặt thành công cardano-walletvào hệ thống Linux / MacOS của mình! 🎉🎉🎉
## Windows

:::QUAN TRỌNG
Hiện tại, hướng dẫn cài đặt trên Windows vẫn đang được thực hiện. Trong thời gian chờ đợi, chúng tôi khuyên bạn nên sử dụng WSL [WSL (Windows Subsystem for Linux)](https://docs.microsoft.com/en-us/windows/wsl/) để có được môi trường Linux trên nền Windows. Sau khi cài đặt xong, bạn có thể sử dụng hướng dẫn [Linux](#linux) để cài đặt và chạy `cardano-node` với **WSL**.
:::
