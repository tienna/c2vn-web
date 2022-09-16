# Giới thiệu mạng thử nghiệm ngang hàng (P2P) mới.

### **Chúng tôi đang làm việc với một nhóm nhỏ các SPO trên mạng thử nghiệm P2P mới để mạng lưới ngày càng phi tập trung hơn**

![](img/2021-12-08-introducing-our-new-peer-to-peer-p2p-testnet.002.png) 8 tháng 12 năm 2021 ![](img/2021-12-08-introducing-our-new-peer-to-peer-p2p-testnet.002.png) [Olga Hryniuk](tmp//en/blog/authors/olga-hryniuk/page-1/) ![](img/2021-12-08-introducing-our-new-peer-to-peer-p2p-testnet.003.png) 3 phút đọc

![Olga Hryniuk](img/2021-12-08-introducing-our-new-peer-to-peer-p2p-testnet.004.png)[](tmp//en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](tmp//en/blog/authors/olga-hryniuk/page-1/)

Technical Writer

Marketing &amp; Communications

- ![](img/2021-12-08-introducing-our-new-peer-to-peer-p2p-testnet.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2021-12-08-introducing-our-new-peer-to-peer-p2p-testnet.006.png)[](https://github.com/olgahryniuk "GitHub")

![Giới thiệu mạng thử nghiệm ngang hàng (P2P) mới](img/2021-12-08-introducing-our-new-peer-to-peer-p2p-testnet.007.png)

Cardano tiếp tục bổ sung thêm nhiều tính năng và khả năng hơn vào Blockchain. Trong báo cáo gần đây, chúng tôi đang [tối ưu hóa mạng lưới](https://iohk.io/en/blog/posts/2021/11/10/optimizing-cardano/) để tăng thông lượng giúp cho nhiều giao dịch được xử lý nhanh hơn, đồng thời các ứng dụng phi tập trung (DApp) và Hợp đồng thông minh (smart contract) được tạo và sử dụng hiệu quả hơn. Trong tuần này, chúng tôi sẽ ra mắt mạng thử nghiệm P2P mới. Đó là một sáng kiến mới quan trọng để hỗ trợ cho mục tiêu phi tập trung hoàn toàn của mạng lưới.

Cardano đảm bảo sự tin cậy và bảo mật trong một thiết lập phi tập trung bằng cách sử dụng cơ chế đồng thuận bằng chứng cổ phần - PoS thông qua thuật toán Ouroboros. Trọng tâm của vấn đề này là khoảng 3.000 stake Pool được điều hành bởi các SPO, những người điều hành các node phân tán cung cấp năng lượng cho mạng lưới. Rõ ràng, trong một mạng lưới phân tán và phi tập trung, cần phải có sự trao đổi thông tin đáng tin cậy giữa các node. Đối với việc xác minh các hoạt động trên Blockchain, quan trọng là sự phát tán dữ liệu - quá trình chia sẻ thông tin về các giao dịch và phân bổ đóng block. Điều này cũng cho phép thuật toán Ouroboros thực hiện "các quyết định".

Thời gian gần đây, các node Cardano đã thiết lập kết nối với node ngang hàng bằng cách tìm kiếm một tệp mô tả cấu hình tĩnh của mạng lưới. Hệ thống cũng dựa vào các node do IOG thiết lập - với cấu trúc liên kết được cấu hình và quản lý bởi cộng đồng - đã giúp thiết lập kết nối mạng lưới (đọc thêm về [sự phát triển của kết nối mạng lưới](https://iohk.io/en/blog/posts/2021/05/11/cardano-decentralization-continues/) tại đây). Để tăng cường sự phi tập trung và đơn giản hóa việc trao đổi thông tin giữa các node, chúng tôi đã thiết lập [một mạng P2P](https://iohk.io/en/blog/posts/2021/04/06/boosting-network-decentralization-with-p2p/). Tương tác trực tiếp giữa các node ngang hàng, hợp lý hóa việc trao đổi thông tin giữa hàng nghìn node phân tán sẽ duy trì mạng lưới mà không phụ thuộc vào các Relay liên kết. Điều này sẽ được thực hiện một cách tự động bởi các thành phần trong mạng lưới P2P. Tự động hóa quá trình lựa chọn node ngang hàng đưa chúng ta đến gần hơn với một mạng lưới phi tập trung hoàn toàn và đơn giản hóa quá trình chạy một Relay hoặc một node để tạo block.

Từ [Shelley Testnet](https://iohk.io/en/blog/posts/2019/10/24/incentivized-testnet-what-is-it-and-how-to-get-involved/) cho đến [Alonzo Testnet](https://twitter.com/InputOutputHK/status/1423704788512952331), các đợt triển khai do cộng đồng hỗ trợ đã là trọng tâm trong cách tiếp cận của chúng tôi. Để mở rộng thử nghiệm các thay đổi của mạng P2P, chúng tôi hiện đang mời một số SPO tham gia Testnet bán công khai. Sẽ có 11 SPO giúp chúng tôi kiểm tra các thành phần P2P một cách tự động trước khi chương trình được mở rộng.

## **P2P Testnet có gì mới?**

P2P vẫn là một tính năng thử nghiệm. Mặc dù nó sẽ là một phần của các bản phát hành trong tương lai, nhưng chúng tôi vẫn chưa tích hợp nó vào trong các phần công việc. Các SPO sẽ đánh giá môi trường thử nghiệm bằng cách cấu hình để các Node tương tác trực tiếp với nhau. Các khả năng của mạng P2P sẽ được đưa vào [nhánh chính của Cardano-Node](https://github.com/input-output-hk/cardano-node/pull/3363) và trong [các yêu cầu được hợp nhất với "mạng lưới Ouroboros"](https://github.com/input-output-hk/ouroboros-network/pulls?q=is%3Apr+is%3Amerged+label%3Apeer2peer+label%3Anetworking+) trên GitHub.

Chế độ P2P sẽ kích hoạt tính năng "tỷ lệ Churn" để đảm bảo việc linh động lựa chọn các Node ngang hàng. Việc cập nhật cấu hình mạng lưới cũng sẽ đơn giản hơn đối với các SPO vì họ không phải khởi động lại các Node.

Testnet bán công khai cũng sẽ cải thiện giao diện Prometheus của node. Nó sẽ bao gồm các số liệu thống kê sau:

- Kết nối bên ngoài: warm(kết nối đang hoạt động nhưng không tham gia vào sự đồng thuận) và hot (kết nối đang hoạt động và có tham gia vào sự đồng thuận)
- Kết nối bên trong: ấm áp và nóng
- Kết nối đơn hướng / cho phép truyền đồng thời hai tín hiệu theo các hướng ngược nhau.

## **Tiếp theo là gì?**

Việc đánh giá các kết nối mạng lưới trên Testnet bán công khai sẽ giúp chúng tôi thu thập phản hồi có giá trị và nắm bắt các vấn đề cần cải thiện. Khi mọi việc hoạt động ổn định, chúng tôi sẽ mời tất cả SPO thử nghiệm việc trao đổi thông tin với Node P2P trên Testnet công khai. Điều này sẽ đánh dấu việc thực hiện một chính sách thông minh để lựa chọn Node ngang hàng. Chính sách này sẽ cho phép xác định các chỉ số cuối cùng để so sánh với chỉ số trước đó, cài đặt Non-P2P. Quan trọng nhất, chúng tôi sẽ tiếp tục thử nghiệm để xác minh rằng tất cả các thành phần đều tốt khi hoạt động độc lập, cũng như kết hợp trong nhiều điều kiện của mạng lưới.

Theo dõi các [bản cập nhật phát triển hàng tuần](https://roadmap.cardano.org/en/status-updates/) của chúng tôi để tìm hiểu thêm về phát triển mạng lưới P2P và kiểm tra [kho lưu trữ mạng lưới Ouroboros](https://github.com/input-output-hk/ouroboros-network) để biết các bản cập nhật mới nhất.

Bài này được dịch bởi Nguyễn Văn Tú Review bởi Pham Quang, biên tập bởi Nguyễn Hiệu. Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/12/08/introducing-our-new-peer-to-peer-p2p-testnet)

*Dự án này được tài trợ bởi Catalyst*
