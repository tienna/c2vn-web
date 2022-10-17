# Cardano tiếp tục hoàn thiện tính phi tập trung: Triển khai P2P

### **Các stake pool sẽ sớm có thể kiểm tra tự động các kết nối ngang hàng**

![](img/2021-05-11-cardano-decentralization-continues.002.png) Ngày 11 tháng 5 năm 2021![](img/2021-05-11-cardano-decentralization-continues.002.png)[ Marcin Szamotulski](tmp//en/blog/authors/marcin-szamotulski/page-1/)![](img/2021-05-11-cardano-decentralization-continues.003.png) 5 phút đọc

![Marcin Szamotulski](img/2021-05-11-cardano-decentralization-continues.004.png)[](tmp//en/blog/authors/marcin-szamotulski/page-1/)

### [**Marcin Szamotulski**](tmp//en/blog/authors/marcin-szamotulski/page-1/)

Software Engineering Lead

Engineering

- ![](img/2021-05-11-cardano-decentralization-continues.005.png)[](mailto:marcin.szamotulski@iohk.io "Email")
- ![](img/2021-05-11-cardano-decentralization-continues.006.png)[](https://www.linkedin.com/in/marcin-szamotulski/ "LinkedIn")
- ![](img/2021-05-11-cardano-decentralization-continues.007.png)[](https://twitter.com/me_coot "Twitter")
- ![](img/2021-05-11-cardano-decentralization-continues.008.png)[](https://github.com/coot "GitHub")

Sự phi tập trung của mạng Cardano là chìa khóa để đảm bảo tính bền vững lâu dài, khả năng phục hồi và tồn tại độc lập với các thực thể quản lý tập trung. Hiện tại, việc sản xuất block đã [phi tập trung hoàn toàn](https://iohk.io/en/blog/posts/2021/03/31/decentralization-to-d-0-day-and-beyond/), trọng tâm tiếp theo của chúng ta là phát triển hệ sinh thái các nhà điều hành pool (SPO - Stake Pool Operator) phi tập trung, nhằm xây dựng các kết nối đáng tin cậy và hiệu quả giữa các node phân tán.

Để cung cấp sức mạnh xác thực block và giao dịch cho các SPO, yêu cầu đặt ra là cần cải tiến phần mềm mạng. Việc kích hoạt trình điều khiển mạng ngang hàng (P2P), cùng với triển khai trình quản lý kết nối, đã cho phép ra mắt mạng thử nghiệm P2P riêng (private P2P testnet) vào cuối tháng 4. Hiện chúng tôi đang đánh giá mạng thử nghiệm kỹ thuật này trước khi triển khai mạng thử nghiệm P2P bán công khai cho một nhóm SPO được mời tham gia để giúp chúng tôi kiểm tra và hiệu chỉnh.

Trong [bài đăng về trình điều khiển P2P](https://iohk.io/en/blog/posts/2021/04/06/boosting-network-decentralization-with-p2p/), chúng tôi đã thảo luận về kiến trúc mạng và sự tương tác giữa các giao thức mini với các thành phần cho phép giao tiếp trực tiếp và tự động giữa các node. Dưới đây, chúng ta sẽ đánh giá mô hình kết nối đã trưởng thành như thế nào để cho phép kết nối ngang hàng tự động và xem xét những kết quả thu được sau khi mạng thử nghiệm riêng khởi chạy.

## **Quá trình phát triển của kết nối mạng Cardano**

Khi Cardano ra mắt, mô hình kết nối mạng kỷ nguyên Byron hoạt động ở trạng thái liên hợp. Trong thiết lập đó, IOHK duy trì các core node và relay node (gọi tắt là relay) kết nối với khoảng 200 relay khác (Hình 1).

![federated network connectivity](img/2021-05-11-cardano-decentralization-continues.009.png)

Hình 1. Cấu trúc mạng liên hợp Byron

Với sự ra mắt của Shelley vào năm ngoái, Cardano bắt đầu hoạt động trong một mô hình kết hợp. Mô hình này cho phép các stake pool xây dựng thủ công mạng P2P của họ bằng cách kết nối với các core node và relay node, cũng như với bảy relay liên kết (federated relay - do chính IOHK vận hành, nên còn được gọi là IO relay/ IO-run relay) đã giúp duy trì mạng trong giai đoạn chuyển tiếp này (Hình 2).

![Hybrid network connectivity](img/2021-05-11-cardano-decentralization-continues.009.png)

Hình 2. Cấu trúc mạng kết hợp ban đầu của Shelley

Kể từ tháng 3, việc sản xuất block đã phi tập trung hoàn toàn, với các stake pool tuân theo cấu trúc liên kết thủ công phục vụ kết nối P2P. Điều này có nghĩa là các SPO sử dụng danh sách relay node đã được đăng ký trên toàn cầu để tạo cấu hình mạng cho phép kết nối với các máy ngang hàng (peer) khác. Để đạt được hiệu quả cao hơn, cần phải kích hoạt giao tiếp node tự động mà không cần phụ thuộc vào các IO-run relay. Do đó, đội ngũ phụ trách hệ thống mạng hiện đang triển khai mã chương trình P2P tự động, cho phép các SPO tạo và vận hành một mạng lưới phi tập trung hơn.

Theo hướng này, khi mainnet P2P được triển khai, mạng Cardano sẽ được duy trì chỉ bởi các node do cộng đồng điều hành (Hình 3).

![p2p network](img/2021-05-11-cardano-decentralization-continues.010.png)

Hình 3. Cấu trúc mạng cuối cùng với giao tiếp node tự động

## **Mạng thử nghiệm P2P và giao tiếp node**

Giai đoạn đầu tiên trong quá trình triển khai P2P là sự ra mắt của mạng thử nghiệm P2P riêng vào tháng trước. Nó được sử dụng để kiểm tra tính năng cơ bản của các thành phần:

- **Trình điều khiển P2P**: quản lý các hot peer, warm peer, cold peer và đảm bảo hệ thống node đáp ứng số lượng mục tiêu cho từng loại peer.
- **Trình quản lý kết nối**: tạo kết nối đi hoặc ghi nhận kết nối đến, theo dõi trạng thái của chúng và cho phép tái sử dụng các kết nối TCP song công toàn phần.
- **Máy chủ**: chấp nhận các kết nối và thực hiện giới hạn tốc độ động (dynamic rate limiting).
- **Trình điều khiển giao thức kết nối đến**: chịu trách nhiệm vận hành và theo dõi trạng thái từ phía kết nối đến. Nhiệm vụ của nó là theo dõi trạng thái các peer từ xa (cold peer, warm peer hoặc hot peer) và trạng thái của từng giao thức mini gửi đến.

Hệ thống P2P được triển khai trong một môi trường riêng và được thử nghiệm giữa tám node kết nối với mạng chính và thiết lập giao tiếp với relay node của các SPO đang hoạt động; chúng tiếp tục được kết nối với các relay node và block-producing node khác. Hệ thống cho phép các node phát hiện ra các relay của SPO khác bằng cách sử dụng bản đăng ký on-chain của stake pool, bao gồm tên DNS hoặc địa chỉ IP của mỗi relay.

Kết quả kiểm tra cho thấy rằng các node có thể tùy ý chọn các peer để giao tiếp, kể cả từ mạng chính. Việc sử dụng chỉ số 'upstream' cho phép loại bỏ các peer hoạt động kém nhất và lựa chọn ngẫu nhiên các peer mới để kết nối. Nguyên tắc hoạt động này đã được chứng minh trong các mô phỏng quy mô lớn (10.000 node), mang lại kết quả gần như tối ưu. Trong thử nghiệm thực tế, đội ngũ thực hiện đã nhận thấy nhiều lần lặp lại quy trình tối ưu hóa. Họ cũng quan sát được một loạt các kết nối ngang hàng đã diễn ra với cả các peer ở gần và ở xa từ các vị trí khác nhau, đạt được trên cả tám node chạy ở các khu vực khác nhau trên thế giới.

Đội ngũ phụ trách hệ thống mạng và DevOps hiện đang cùng làm việc để cải thiện môi trường mạng thử nghiệm, giúp cho tất cả các SPO được mời tham gia mạng thử nghiệm bán công khai đều có thể thiết lập trực tiếp các kết nối ngang hàng. Công việc này bao gồm cải thiện tính năng và quy trình thử nghiệm nhằm mang lại kết quả tốt nhất. Do đó, để giới thiệu các chỉ tiêu mới cho local root peer, nhóm đang hoàn thiện các thử nghiệm cho những tính năng liên quan như chỉ tiêu cho các peer đã biết, đã thiết lập và đang hoạt động.

*Chúng tôi sẽ sớm ra mắt mạng thử nghiệm P2P bán công khai, với sự hỗ trợ của một nhóm nhỏ các đối tác SPO giúp thực hiện những thử nghiệm ban đầu, trước khi mở rộng phạm vi ra cộng đồng SPO. Như mọi khi, những phản hồi sớm và ý tưởng từ cộng đồng là trọng tâm để kiểm tra, lặp đi lặp lại và cải thiện các quy trình khi chúng ta đang dần tiến tới một kiến trúc P2P hoàn toàn tự động và phi tập trung cho mạng chính Cardano.*

*Bài viết nhận được những đóng góp từ Karl Knutsson, Duncan Coutts, Neil Davies, Prashanti Naik và Olga Hryniuk.*

Bài này được dịch bởi Hoàng Tâm,review bởi Brit Nguyễn, Đăng bài bởi Nguyễn Hiệu.
Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/05/11/cardano-decentralization-continues/)

*Dự án này do Catalyst tài trợ.*
