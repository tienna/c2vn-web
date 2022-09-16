# Cập nhật về nâng cấp Vasil

### **Rất gần nhưng vẫn còn nhiều việc phải làm- Đây là thông tin cập nhật về tiến trình nâng cấp Vasil**

![](img/2022-06-20-vasil-upgrade-the-state-of-play.002.png)20 tháng 6 năm 2022![](img/2022-06-20-vasil-upgrade-the-state-of-play.002.png) [Nigel Hemsley](/en/blog/authors/nigel-hemsley/page-1/)![](img/2022-06-20-vasil-upgrade-the-state-of-play.003.png) 4 phút đọc

![Nigel Hemsley](img/2022-06-20-vasil-upgrade-the-state-of-play.004.png)[](/en/blog/authors/nigel-hemsley/page-1/)

### [**Nigel Hemsley**](/en/blog/authors/nigel-hemsley/page-1/)

Head of Delivery and Projects

Operations

- ![](img/2022-06-20-vasil-upgrade-the-state-of-play.005.png)[](mailto:nigel.hemsley@iohk.io "Email")
- ![](img/2022-06-20-vasil-upgrade-the-state-of-play.006.png)[](tmp/www.linkedin.com/in/nigel-hemsley-433a213 "LinkedIn")

![Cập nhật về nâng cấp Vasil](https://github.com/cardano2vn/iohk-blog/blob/main/vi/docs1/2022/06/img/2022-06-20-vasil-upgrade-the-state-of-play.007.png?raw=true)

Vào thứ Sáu, nhóm nhân lực nòng cốt của Input Output Global (IOG)  làm việc cho dự án nâng cấp Vasil đã tổ chức cuộc gọi đánh giá định kỳ vào cuối tuần. Hôm nay (Thứ Hai, ngày 20 tháng 6 năm 2022) là ngày chúng tôi thực hiện nâng cấp testnet Cardano trước ranh giới epoch tiếp theo, vì vậy, chúng tôi đã đồng ý đánh giá lại kết quả mới nhất vào chiều nay, có tính đến công việc mà các kỹ sư của chúng tôi đã thực hiện vào cuối tuần.

Nhóm kỹ sư của IOG đang gần hoàn thiện công việc cốt lõi, chỉ còn bảy lỗi vẫn còn tồn tại để hoàn thành công việc hard fork, không có lỗi nào hiện được xếp hạng là 'nghiêm trọng'. Sau một số cân nhắc, chúng tôi đã đồng ý KHÔNG gửi đề xuất cập nhật hard fork testnet ngay hôm nay để có thêm thời gian thử nghiệm.

Cho đến nay, chúng tôi đã quản lý để vượt qua phần lớn (khoảng 95%) các [tập lệnh thử nghiệm Plutus V2](https://github.com/input-output-hk/cardano-node-tests/issues/1079) của chúng tôi. Tuy nhiên, chúng tôi vẫn còn một vài mục còn tồn đọng mà chúng tôi cần chạy để xác nhận mọi thứ đang hoạt động như mong đợi. Chúng tôi đã xác định rằng chúng tôi sẽ cần một vài ngày nữa cho việc này. Điều này khiến chúng tôi chậm tiến độ so với mục tiêu đã thông báo trước đó của chúng tôi là ngày 29 tháng 6 để tiến hành hard fork trên mainnet.

Kể từ đầu tháng 6, chúng tôi đã chạy thành công một nâng cấp sớm của node mới (bao gồm tính năng phát tán đồng thời và Plutus v2 CIP cùng với các cải tiến khác) trên một mạng thử nghiệm  Vasil bán công khai dành cho nhà phát triển (Devnet). Hiện chúng tôi có khoảng 35 nhà phát triển từ 27 dự án đang thử nghiệm DApp của họ và giúp xác định bất kỳ vấn đề nào, cùng với 16 nhà điều hành nhóm cổ phần (SPO) hỗ trợ. Chúng tôi cũng hợp tác chặt chẽ với một số nhà cung cấp công cụ / API hàng đầu, bao gồm [Blockfrost](https://blockfrost.io/) , thư viện Cardano Serialization (EMURGO) và Cardano Multiplatform Library (dcSpark). Chúng tôi muốn gọi công việc của Mlabs và Dquadrant nói riêng là đã hỗ trợ đắc lực trong suốt quá trình. Giai đoạn testnet dành cho các nhà phát triển này đặt chúng tôi vào một vị trí tốt khi nói đến tính tương thích và chức năng của mã Plutus. Công việc có giá trị này sẽ tiếp tục trên mạng thử nghiệm phát triển này trong vài tuần tới.

Nâng cấp Vasil là chương trình phát triển và tích hợp phức tạp nhất cho đến nay, từ nhiều góc độ. Đó là một quá trình đầy thử thách, không chỉ đòi hỏi công việc quan trọng của các nhóm cốt lõi mà còn cả sự phối hợp chặt chẽ trong toàn bộ hệ sinh thái.

Quyết định cuối cùng về hard fork Cardano Testnet sẽ được đưa ra - với sự tham vấn của các thành viên của cộng đồng phát triển SPO và DApp - dựa trên 3 tiêu chí chính:

1. Không có vấn đề quan trọng nào còn tồn tại trên node (bao gồm sổ cái, CLI, sự đồng thuận, v.v.) hoặc chức năng kiểm toán nội bộ của chúng tôi,
2. Đo điểm chuẩn và phân tích hiệu suất-chi phí có thể chấp nhận được, và
3. Cộng đồng (bao gồm các sàn giao dịch và các dự án DApp) đã được thông báo chính xác và đã có đủ thời gian để chuẩn bị cho sự kiện tổ hợp hard fork.

Dự án tiếp tục theo dõi các tiêu chí này. Một khi chúng ta có thể thoải mái và tự tin đánh dấu vào tất cả các ô check box, chúng ta có thể thực hiện hard fork testnet Cardano, đánh dấu thời điểm đếm ngược cuối cùng đến đợt hard fork của mainnet. Nhóm tích hợp của Cardano Foundation dẫn đầu quá trình này và thường dành cho các sàn giao dịch 4 tuần để hoàn thành quá trình tích hợp / cập nhật của riêng họ. Nguyên tắc pareto có xu hướng được tuân thủ ở đây - nhằm đạt được 80% sàn giao dịch tuân thủ (theo tính thanh khoản) trước khi hard fork mainnet, do đó giảm thiểu sự bất tiện cho người dùng trong khi nhận ra các sàn giao dịch khác nhau có thể hoạt động theo các mốc thời gian khác nhau.

Hôm nay, IOG và Cardano Foundation đã thống nhất một mục tiêu mới để hard fork testnet vào cuối tháng 6. Sau khi hoàn thành, chúng tôi sẽ đợi bốn tuần để các sàn giao dịch và SPO thực hiện bất kỳ công việc tích hợp và thử nghiệm bắt buộc nào. Điều này là hợp lý và không nên vội vàng. Do đó, giả định đang hoạt động bây giờ sẽ là một đợt hard fork của mạng chính Cardano xảy ra vào tuần cuối cùng của tháng Bảy.

Chúng tôi nhận ra rằng tin tức này sẽ gây thất vọng cho một số người. Tuy nhiên, chúng tôi đang hết sức thận trọng để đảm bảo rằng chúng tôi thực hiện việc triển khai này một cách chính xác.

Như chúng tôi đã liên tục giao tiếp và hầu hết cộng đồng đều công nhận, không có mốc thời gian nào có thể là tuyệt đối trong phát triển phần mềm. Chất lượng và bảo mật phải là điều tối quan trọng. Nếu cần thêm thời gian để lấy đúng mã lõi - và đảm bảo tất cả những người tham gia trong hệ sinh thái (SPO, dự án DApp, công cụ, sàn giao dịch, v.v.) hoàn toàn thoải mái - hãy cứ như vậy. Để quá trình kéo dài hơn là điều duy nhất cần làm.

Nhóm IOG và Cardano Foundation sẽ tiếp tục hợp tác chặt chẽ với cộng đồng nhà phát triển và các sàn giao dịch khi chúng tôi tiến gần hơn đến hardfork Vasil trên mainnet. Và để cập nhật tới cộng đồng. Cảm ơn tất cả các bạn đã ủng hộ.

Bài này được dịch bởi Nguyễn Anh Tiến, Review bởi Pham Quang, biên tập bởi Nguyễn Hiệu. Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2022/06/20/vasil-upgrade-the-state-of-play)

*Dự án này được tài trợ bởi Catalyst*
