---
id: setup-virtual-box-written
title: Installing VirtualBox
sidebar_label: Cài đặt VirtualBox
description: "Stake pool course: Learn how to install and setup VirtualBox."
#image: ../img/og-developer-portal.png
---

Để xây dựng một nút từ nguồn, chạy nó và kết nối nó với mạng chính(Mainnet) Cardano, bạn cần có hệ thống Linux với ít nhất 12GB RAM và 100GB dung lượng ổ cứng. RAM chủ yếu cần thiết để xây dựng nút; để chạy nó, 10GB sẽ là đủ. Dung lượng ổ cứng là cần thiết nếu bạn muốn kết nối và tải xuống chuỗi khối Cardano.

Bạn có thể sử dụng VirtualBox để tìm hiểu cách thiết lập nhóm cổ phần.

## Install Virtual Box:

[https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)

## Cài đặt Ubuntu 20.04

Làm theo hướng dẫn này để thiết lập một máy ảo với ubuntu 20.04 Desktop:

[https://linuxhint.com/install\_ubuntu\_virtualbox\_2004/](https://linuxhint.com/install_ubuntu_virtualbox_2004/)

Khi bạn đã tạo xong Máy ảo của mình, hãy mở một thiết bị đầu cuối và chạy để cài đặt Cài đặt VirtualBox Guest Additions trên Ubuntu VirtualBox VM.

```sh
sudo apt install virtualbox-guest-dkms virtualbox-guest-x11 virtualbox-guest-utils
```

:::tip questions or suggestions?

Nếu bạn có bất kỳ câu hỏi và đề xuất nào trong khi tham gia các bài học, vui lòng hỏi [trong diễn đàn Cardano](https://forum.cardano.org/c/staking-delegation/setup-a-stake-pool/158)  và chúng tôi sẽ trả lời sớm nhất có thể 

:::
