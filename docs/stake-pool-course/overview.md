---
id: overview
slug: /stake-pool-course/
title: Stake Pool Course
sidebar_label: Overview
description: This course is designed to (re)introduce you to Cardano, walk you through how to set up a stake pool, and provide guidance on managing and maintaining your stake pool to ensure optimal performance and profitability.
#image: ../img/og-developer-portal.png
---

**Welcome**, chúng tôi rất vui vì bạn quan tâm đến việc thiết lập một nhóm cổ phần trên Cardano.

Khóa học này được thiết kế để giới thiệu cho bạn về Cardano, hướng dẫn bạn cách thiết lập nhóm cổ phần và cung cấp hướng dẫn về quản lý và duy trì nhóm cổ phần của bạn để đảm bảo hiệu suất và lợi nhuận tối ưu.

:::danger Chỉ cho Testnet
Toàn bộ khóa học về  nhóm cổ phần chỉ làm trên testnet. Trước khi chạy pool của mình trên mainnet, bạn nên thực hành rất nhiều trên testnet, biết cách xoay các khóa KES của mình và hiểu biết sâu sắc về bảo mật của pool.
:::

## Những gì bạn sẽ học

<iframe width="100%" height="325" src="https://www.youtube.com/embed/Jb08HTkk7yo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"></iframe>
<br/>

## Để cương môn học

Khóa học bao gồm một số bài học và một cuốn sổ tay hướng dẫn đầy đủ cho mỗi bài học.

### Bài 1

Sau khi kết thúc bài học đầu tiên, bạn sẽ học được những điều sau:

1. [Cách thiết lập VirtualBox](../stake-pool-course/lesson-1#install-virtualbox)
2. [Cách thiết lập máy chủ Linux trên AWS](../stake-pool-course/lesson-1#setup-a-linux-server-on-aws)
3. [Cách định cấu hình máy chủ trong các nhà cung cấp máy chủ khác nhau](../stake-pool-course/lesson-1#alternative-to-aws)
4. [Cách cài đặt cardano-node](../stake-pool-course/lesson-1#install-cardano-node)
5. [Cách khởi động cardano-node và tải các tệp cấu hình](../stake-pool-course/lesson-1#run-cardano-node)

### Bài 2

Sau khi kết thúc bài học thứ hai, bạn sẽ học được những điều sau:

* [Mô hình UTxO là gì](/docs/stake-pool-course/lesson-2#the-utxo-model)
* [Cách tạo khóa và địa chỉ thanh toán với CLI](/docs/stake-pool-course/lesson-2#generate-payment-keys-and-addresses)
* [Cách yêu cầu nhận tADA](/docs/stake-pool-course/lesson-2#request-funds-to-the-faucet)
* [Cách tạo và gửi giao dịch](/docs/stake-pool-course/lesson-2#create-a-simple-transaction)

### Bài 3

Sau khi học xong bài thứ ba, bạn sẽ học được những điều sau::

* [Cách tạo khóa và địa chỉ nhóm cổ phần](/docs/stake-pool-course/lesson-3#create-stake-pool-keys-and-adresses)
* [Cách tạo và đăng ký nhóm cổ phần](/docs/stake-pool-course/lesson-3#create-and-register-a-stake-pool-certificate)

### Bài 4

Sau khi kết thúc bài học thứ tư, bạn sẽ học được những điều sau:

* [Chữ ký phát triển chính (KES) là gì](/docs/stake-pool-course/lesson-4#key-evolving-signature)
* [Cơ chế cam kết là gì](/docs/stake-pool-course/lesson-4#pledge-mechanism) 
* [Cách tạo Khóa và poolid hoạt động cho nhóm cổ phần](/docs/stake-pool-course/lesson-4#generate-stake-pool-keys)
* [Cách chuẩn bị các tệp cấu trúc liên kết của bạn](/docs/stake-pool-course/lesson-4#topology-files) 
* [Cách đăng ký nhóm cổ phần của bạn và siêu dữ liệu của nó vào chuỗi khối](/docs/stake-pool-course/lesson-4#register-stake-pool-metadata)
* [Cách bảo mật các khóa mật mã của bạn](/docs/stake-pool-course/lesson-4#secure-your-cryptographic-keys)

### Bài 5

Sau khi kết thúc bài học thứ năm, bạn sẽ học được những điều sau:

* [Cách thực hiện ghi nhật ký và giám sát bằng prometheus](/docs/stake-pool-course/lesson-5#logging-and-monitoring-with-prometheus)
* [Cách sử dụng bảng điều khiển Grafana](/docs/stake-pool-course/lesson-5#grafana-dashboard)

## Hướng dẫn Khóa học và sổ tay

[Khóa học này có mọi thứ bạn có thể cần từ video hướng dẫn đến hướng dẫn hỗ trợ và sổ tay](/docs/stake-pool-course/handbook/install-cardano-node-written).

## Bài tập trong khóa học

Để đảm bảo rằng bạn hiểu đầy đủ về khóa học, vui lòng hoàn thành[Bài tập](/docs/stake-pool-course/assignments/assignment-1).

:::tip Câu hỏi hơcj gợi ý?
Nếu bạn có bất kỳ câu hỏi và đề xuất nào trong khi tham gia các bài học, [vui lòng hỏi trong diễn đàn Cardano](https://forum.cardano.org/c/staking-delegation/setup-a-stake-pool/158) và chúng tôi sẽ trả lời sớm nhất có thể.
:::

chỉnh sửa trang này
Cập nhật lần cuối vào 4/5/2022 bởi Tommy Kammerer
