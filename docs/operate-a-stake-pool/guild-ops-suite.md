---
id: guild-ops-suite
title: Get Started with Guild Operators Tools
sidebar_label: Guild Operators Suite
description: Bắt đầu với Công cụ điều hành Guild
#image: ../img/og-developer-portal.png
---

## Guild Operators Suite

Bộ Guild-Operators là một bộ công cụ và tập lệnh để thiết lập, quản lý và giám sát các nhóm cổ phần Cardano, cũng như quản lý mã thông báo và khóa. Đó là kết quả của một nỗ lực hợp tác cộng đồng của các thành viên cộng đồng tích cực lâu năm để làm cho các công việc chung của các nhà điều hành trở nên dễ dàng hơn. Chúng tôi sẽ cố gắng cung cấp thông tin nhanh về các công cụ liên quan và tổng quan cấp cao về các thủ tục để giúp bạn bắt đầu vì tài liệu đầy đủ cho bộ phần mềm được lưu trữ [here][guild-website].

### Tools

#### CNTools

CNTools là một con dao quân đội Thụy Sĩ dành cho những người điều hành hồ bơi, những người muốn thực hiện các nhiệm vụ thông thường dễ dàng hơn. Đó là một ứng dụng GUI bash theo hướng menu để tạo và quản lý ví, gửi ada và mã thông báo, cũng như về bất kỳ chức năng chung nào. Ngoài ra, công cụ đã được tăng cường với các tính năng và cải tiến mới kể từ khi phát hành lần đầu tiên vào tháng 7 năm 2020, trùng với sự ra đời của Cardano Shelley MainNet. Thông tin thêm về CNTools có thể được tìm thấy [here](https://cardano-community.github.io/guild-operators/Scripts/cntools/).  
![img](../../static/img/getting-started/guild-ops-suite/guild_cntools.png)  

#### gLiveView

Guild LiveView, thường được gọi là gLiveView, là một tiện ích giám sát CLI bash cục bộ với giao diện dễ sử dụng để theo dõi trạng thái nút. Nó kết nối với nút đang chạy cục bộ thông qua các điểm cuối nút EKG / Prometheus được chỉ định để thu thập và hiển thị số liệu nút, thông tin mạng và thông tin khác trong thời gian thực. Chương trình nhận biết liệu nút đang được sử dụng như một rơle hay một nhà sản xuất khối và điều chỉnh đầu ra cho phù hợp. Bạn có thể tìm thêm thông tin về gLiveView [here](https://cardano-community.github.io/guild-operators/Scripts/gliveview/).  
![img](../../static/img/getting-started/guild-ops-suite/guild_gliveview.png)  

#### Topology Updater
Trình cập nhật cấu trúc liên kết được xây dựng như một giải pháp thay thế để cho phép các rơle nhóm cổ phần tự động phát hiện và ghép nối với các đồng nghiệp trên mạng. Trong khi việc triển khai P2P bị tạm dừng do các ưu tiên khác, tập lệnh này đã trở thành một trong những công cụ quan trọng nhất để tránh phải liên hệ với bạn bè theo cách thủ công và yêu cầu đưa các nút riêng lẻ vào tệp cấu trúc liên kết. Thông tin thêm về công cụ có thể được tìm thấy [here](https://cardano-community.github.io/guild-operators/Scripts/topologyupdater/).  
![img](../../static/img/getting-started/guild-ops-suite/guild_topologyupdater.png)  

#### Guild Network and Support for other networks

Mạng Guild là một mạng ngắn gọn (kỷ nguyên 30 phút) có chức năng tương tự như testnet nhưng hoàn toàn do cộng đồng quản lý. Nó tuyệt vời để thử nghiệm với những thứ trong hộp cát, cũng như thử nghiệm các tính năng khả thi trước khi phát hành chúng cho các mạng khác. Mạng này đã được hỗ trợ bởi tất cả các công cụ trong repo, bao gồm mainnet, testnet và staging.

#### Others..

Các tập lệnh tiện ích khác ở quy mô nhỏ hơn bao gồm tạo các thành phần cốt lõi từ nguồn cho các thành phần cụ thể, thiết lập các điều kiện tiên quyết về môi trường, v.v. Bắt đầu từ đây, bạn có thể đọc về các chi tiết cụ thể khi xem qua trang chủ [here][guild-website].  

:::note
    Please ensure to read the disclaimers on guild website before continuing
:::

### Thiết lập điều kiện trước

FĐể cài đặt Gói hệ điều hành, gói phụ thuộc, thiết lập [cấu trúc thư mục mẫu](https://cardano-community.github.io/guild-operators/basics/#folder-structure) được sử dụng làm đầu vào mẫu ví dụ (có thể tùy chỉnh) cho các công cụ guild, tìm nạp cấu hình, tạo tác gốc, tải xuống tập lệnh công cụ, v.v., bạn có thể sử dụng các lệnh bên dưới. Tập lệnh có khá nhiều tùy chọn (bạn có thể sử dụng `-h` để kiểm tra bất kỳ thành phần / đối số tùy chọn nào mà bạn muốn đưa vào).  

``` bash
mkdir "$HOME/tmp";cd "$HOME/tmp"
curl -sS -o prereqs.sh https://raw.githubusercontent.com/cardano-community/guild-operators/master/scripts/cnode-helper-scripts/prereqs.sh
chmod 755 prereqs.sh
./prereqs.sh
. "$HOME"/.bashrc
```

### Xây dựng các thành phần Node/DBSync 
Chúng tôi cho rằng bạn đã xem hướng dẫne [here](../../docs/getting-started/installing-cardano-node.md). Có sẵn các tập lệnh / hướng dẫn xây dựng tương tự để xây dựng các công cụ cardano-node, cardano-db-sync, offline-metadata-offline và thiết lập postgres + postgREST với dbsync) khác nhau trên tài liệu guild. Bạn có thể điều hướng hướng dẫn cho từng người trong số họ [here](https://cardano-community.github.io/guild-operators/build/). Các hướng dẫn cũng sẽ triển khai các dịch vụ này như một dịch vụ systemd, được khuyến nghị để tránh quản lý các dịch vụ theo cách thủ công.

### Cấu hình tùy chỉnh

Bây giờ bạn đã thiết lập các phụ thuộc hệ điều hành và các mã nhị phân nút được xây dựng / cài đặt, đã đến lúc bạn tùy chỉnh cấu hình, đường dẫn, tên, v.v. cho nút của mình. Bạn có thể sử dụng tệp [env](https://cardano-community.github.io/guild-operators/Scripts/env/) để sửa đổi chúng. Mỗi dòng chứa giá trị mặc định và giải thích đơn giản về ý nghĩa của biến.

### Đóng gói và phải hồi

Sự cố/PR được hoan nghênh trên [github repository][guild-github].  

### Yêu cầu hỗ trợ

Chúng tôi có  [kênh telegram hỗ trợ][guild-tg] , nhưng lưu ý rằng chúng tôi dự định chỉ có kênh hỗ trợ cho bộ kỹ năng cơ bản được đánh dấu trên [homepage][guild-website].  

[guild-github]: https://github.com/cardano-community/guild-operators
[guild-website]: https://cardano-community.github.io/guild-operators
[guild-tg]: https://t.me/guild_operators_official


chỉnh sửa trang này
Cập nhật lần cuối vào 4/5/2022 bởi Tommy Kammerer