---
id: setup-a-server-on-aws-written
title: Setup a Linux server on AWS
sidebar_label: Thiết lập máy chủ Linux trên AWS
description: "Stake pool course: Learn how to setup Linux server on AWS."
#image: ../img/og-developer-portal.png
--- 

Nếu bạn không có quyền truy cập vào máy tính chạy Linux ( hoặc VirtualBox ) , bạn có thể sử dụng Amazon Web Services ( AWS ) để tạo máy ảo dựa trên đám mây chạy Linux miễn phí. Để làm như vậy, vui lòng làm theo các bước dưới đây:

* Đi tới [Amazon Web Services \(AWS\)](https://aws.amazon.com/) và tạo một tài khoản \(free\)  Nếu bạn chưa có.
* Đi tới _AWS Management Console_.
* Đi tới _EC2 Dashboard_.

![img](../../../static/img/stake-pool-course/setup-aws-1.png)

* Nếu bạn đã có một phiên bản đang chạy, hãy chuyển sang bước 9.
* Trước tiên, chúng ta phải đảm bảo có đủ dung lượng ổ cứng ( ít nhất 100GB ) . Nhấp vào _Volumes_. .


![img](../../../static/img/stake-pool-course/setup-aws-2.png)

* Trong _Actions_, chọn _Modify Volume_.

![img](../../../static/img/stake-pool-course/setup-aws-3.png)

* ITrong _Modify Volume_ dialog, Chọn kích thước là 100 và nhấn  _Modify_, sau đó xác nhận trong hộp thoại tiếp theo..

![img](../../../static/img/stake-pool-course/setup-aws-4.png)

* Đi trở lại _EC2 Dashboard_.

![img](../../../static/img/stake-pool-course/setup-aws-5-dashboard.png)

* Đi tới _Launch Instance_.

![img](../../../static/img/stake-pool-course/setup-aws-6-launch-instance.png)

Như Amazon Machine Image, hãy chọn Amazon Linux 2 ( HVM ) , Loại ổ SSD , 64-bit ( x86 ) .


![img](../../../static/img/stake-pool-course/setup-aws-7-choose.png)

* Là Loại phiên bản, chọn t2.medium , sau đó nhấp vào Xem lại và Khởi chạy và cuối cùng Khởi chạy trên màn hình tiếp theo.

![img](../../../static/img/stake-pool-course/setup-aws-8-instance-type.png)

* Tạo một cặp key \( hoặc sử dụng một cặp khóa hiện có\).

![img](../../../static/img/stake-pool-course/setup-aws-9-key-pair.png)

* _Connect_  với phiên bản của bạn.

![img](../../../static/img/stake-pool-course/setup-aws-10-connect.png)

* Bạn có thể sử dụng phương thức kết nối _EC2 Instance Connect_ 

![img](../../../static/img/stake-pool-course/setup-aws-11-connect-2.png)

Xin chúc mừng! Bây giờ bạn có quyền truy cập vào một máy chạy Linux.

:::tip questions or suggestions?

INếu bạn có bất kỳ câu hỏi và đề xuất nào trong khi tham gia các bài học, vui lòng hỏi [trong diễn đàn Cardano](https://forum.cardano.org/c/staking-delegation/setup-a-stake-pool/158) và chúng tôi sẽ trả lời sớm nhất có thể.

:::
