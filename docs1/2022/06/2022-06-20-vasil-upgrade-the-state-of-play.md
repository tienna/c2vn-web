# Vasil upgrade - the state of play
### **Very close but a little further still to go. Here’s an update on the progress towards the Vasil upgrade** 
![](img/2022-06-20-vasil-upgrade-the-state-of-play.002.png) 20 June 2022![](img/2022-06-20-vasil-upgrade-the-state-of-play.002.png)[ Nigel Hemsley](tmp//en/blog/authors/nigel-hemsley/page-1/)![](img/2022-06-20-vasil-upgrade-the-state-of-play.003.png) 4 mins read

![Nigel Hemsley](img/2022-06-20-vasil-upgrade-the-state-of-play.004.png)[](tmp//en/blog/authors/nigel-hemsley/page-1/)
### [**Nigel Hemsley**](tmp//en/blog/authors/nigel-hemsley/page-1/)
Head of Delivery and Projects

Operations

- ![](img/2022-06-20-vasil-upgrade-the-state-of-play.005.png)[](mailto:nigel.hemsley@iohk.io "Email")
- ![](img/2022-06-20-vasil-upgrade-the-state-of-play.006.png)[](tmp/www.linkedin.com/in/nigel-hemsley-433a213 "LinkedIn")

![Vasil upgrade - the state of play](img/2022-06-20-vasil-upgrade-the-state-of-play.007.png)

Vào thứ Sáu, nhóm đầu ra cốt lõi toàn cầu (IOG) làm việc hướng tới việc nâng cấp Vasil đã tổ chức cuộc gọi đánh giá cuối tuần thường xuyên. Hôm nay (Thứ Hai, ngày 20 tháng 6) là ngày mới nhất mà chúng tôi có thể tạo điều kiện nâng cấp Cardano Testnet trước ranh giới kỷ nguyên tiếp theo, vì vậy chúng tôi đã đồng ý đánh giá lại tình trạng mới nhất vào chiều nay, có tính đến công việc các kỹ sư của chúng tôi đã làm vào cuối tuần.

Nhóm IOG Engineering rất gần để hoàn thiện công việc cốt lõi, chỉ với bảy lỗi vẫn còn nổi bật để hoàn thành công việc khó khăn, không có công việc nào được xếp hạng là ’nghiêm trọng. Sau một số xem xét, chúng tôi đã đồng ý không gửi đề xuất cập nhật hard fork cho testnet ngay hôm nay để cho phép nhiều thời gian hơn để thử nghiệm.

Cho đến nay, chúng tôi đã quản lý để vượt qua đa số (khoảng 95%) của [SScripts V2 của Plutus V2] (https://github.com/input-output-hk/cardano-node-tests/issues/1079) . Tuy nhiên, chúng tôi vẫn có một vài mục nổi bật mà chúng tôi cần chạy để xác nhận mọi thứ đang hoạt động như mong đợi. Chúng tôi đã xác định chúng tôi sẽ cần thêm một vài ngày cho việc này. Điều này đặt chúng tôi đằng sau lịch trình vào ngày mục tiêu được truyền đạt trước đây của chúng tôi là ngày 29 tháng 6 cho một hard hard chính.

Kể từ đầu tháng 6, chúng tôi đã chạy thành công bản dựng sớm của nút mới (bao gồm đường ống khuếch tán và CIP Plutus V2 mới trong số các cải tiến khác) như một nhà phát triển Vasil bán công khai (DevNet). Bây giờ chúng tôi có khoảng 35 nhà phát triển từ 27 dự án kiểm tra DAPP của họ và giúp xác định bất kỳ vấn đề nào, cùng với 16 nhà khai thác nhóm cổ phần (SPO) hỗ trợ. Chúng tôi cũng hợp tác chặt chẽ với một số nhà cung cấp công cụ/API hàng đầu, bao gồm [Blockfrost] (https://blockfrost.io/), Thư viện tuần tự hóa Cardano (EMURGO) và Thư viện đa dạng Cardano (DCSPARK). Chúng tôi muốn gọi ra công việc của MLABS và Dquadrant nói riêng để cung cấp hỗ trợ tuyệt vời trong suốt quá trình. Giai đoạn TestNet nhà phát triển này đặt chúng ta vào một vị trí tốt khi nói đến tính tương thích và chức năng của mã Plutus. Công việc có giá trị này sẽ tiếp tục trên TestNet phát triển này trong vài tuần tới.

Công việc trên Vasil là chương trình phát triển và tích hợp phức tạp nhất cho đến nay, từ một số góc độ. Đó là một quá trình đầy thách thức đòi hỏi không chỉ công việc quan trọng từ các nhóm cốt lõi, mà còn phối hợp chặt chẽ trên toàn hệ sinh thái.

Quyết định cuối cùng về Hard Fork The Cardano Testnet sẽ được đưa ra - tham khảo ý kiến của các thành viên của cộng đồng phát triển SPO và DAPP - theo 3 tiêu chí chính:

1. Không có vấn đề quan trọng nào nổi bật trên nút (bao gồm sổ cái, CLI, đồng thuận, v.v.) hoặc chức năng kiểm toán nội bộ của chúng tôi,
1. Phân tích điểm chuẩn và chi phí hiệu suất được chấp nhận và
1. Cộng đồng (bao gồm cả trao đổi và các dự án DAPP) đã được thông báo đúng và đã có đủ thời gian để chuẩn bị cho sự kiện tổ hợp hard fork.

Dự án tiếp tục theo dõi tốt các tiêu chí này. Một khi chúng tôi có thể thoải mái và tự tin đánh dấu vào tất cả các hộp này, chúng tôi có thể tiến về phía trước và khó khăn trong cardano testnet, đánh dấu sự đếm ngược cuối cùng đến hardnet hard fork. Nhóm Tích hợp Cardano Foundation dẫn đầu quá trình này và thường nhằm mục đích cung cấp trao đổi 4 tuần để hoàn thành các tích hợp/cập nhật của riêng họ. Nguyên tắc Pareto có xu hướng được tuân thủ ở đây - nhằm mục đích đạt được sự tuân thủ trao đổi 80% (bằng thanh khoản) trước khi Fork Mainnet Hard, do đó giảm thiểu sự bất tiện cho người dùng trong khi nhận ra các trao đổi khác nhau có thể hoạt động theo các mốc thời gian khác nhau.

Hôm nay, IOG và Quỹ Cardano đã đồng ý một ngày mục tiêu mới để làm khó thử testnet vào cuối tháng Sáu. Sau khi hoàn thành, sau đó chúng tôi sẽ cho phép bốn tuần để trao đổi và SPO thực hiện bất kỳ công việc tích hợp và thử nghiệm cần thiết nào. Điều này chỉ là hợp lý và không nên vội vàng. Do đó, giả định làm việc bây giờ nên là một chiếc xe ngựa cứng Cardano xảy ra trong tuần cuối cùng của tháng Bảy.

Chúng tôi nhận ra rằng tin tức này sẽ gây thất vọng cho một số người. Tuy nhiên, chúng tôi đang thận trọng rất nhiều để đảm bảo rằng chúng tôi thực hiện việc triển khai này một cách chính xác.
Vì chúng tôi đã liên tục truyền đạt và hầu hết trong cộng đồng nhận ra, không có mốc thời gian nào có thể là tuyệt đối trong phát triển phần mềm.
Chất lượng và bảo mật phải duy trì điều tối quan trọng.
Nếu cần nhiều thời gian hơn để có được mã cốt lõi - và đảm bảo tất cả người chơi hệ sinh thái (SPO, dự án DAPP, công cụ, trao đổi, v.v.) hoàn toàn thoải mái - vì vậy hãy là nó.
Cho quá trình lâu hơn là điều duy nhất có trách nhiệm để làm.
