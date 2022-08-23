# Kachina: hợp đồng thông minh bảo vệ quyền riêng tư

### **Tận dụng ZK Snarks để kích hoạt chức năng hợp đồng thông minh bảo vệ quyền riêng tư mà không hy sinh các đặc điểm phi tập trung**

![](img/2022-08-05-kachina-privacy-preserving-smart-contracts.002.png) Ngày 5 tháng 8 năm 2022![](img/2022-08-05-kachina-privacy-preserving-smart-contracts.002.png)[ Olga Hryniuk](/en/blog/authors/olga-hryniuk/page-1/)![](img/2022-08-05-kachina-privacy-preserving-smart-contracts.003.png) bài đọc 4 phút

![Olga Hryniuk](img/2022-08-05-kachina-privacy-preserving-smart-contracts.004.png)[](/en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](/en/blog/authors/olga-hryniuk/page-1/)

Technical Writer

Marketing &amp; Communications

- ![](img/2022-08-05-kachina-privacy-preserving-smart-contracts.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2022-08-05-kachina-privacy-preserving-smart-contracts.006.png)[](https://github.com/olgahryniuk "GitHub")

![Kachina: hợp đồng thông minh bảo vệ quyền riêng tư](img/2022-08-05-kachina-privacy-preserving-smart-contracts.007.jpeg)

Những hợp đồng thông minh trình bày một cách tiếp cận tiêu chuẩn để thực hiện các tương tác phức tạp giữa hai hoặc nhiều bên sẵn sàng trao đổi tiền tệ hoặc dữ liệu theo cách phi tập trung. Hợp đồng thông minh là các thỏa thuận kỹ thuật số tự động hiệu quả trên một blockchain. Được viết bằng mật mã, chúng có thể theo dõi, xác minh và thực hiện các giao dịch ràng buộc của hợp đồng khi đáp ứng các điều kiện xác định trước. Để tạo ra một hợp đồng thông minh thể hiện các điều kiện như vậy, các nhà phát triển sử dụng các ngôn ngữ lập trình. Mật mã hợp đồng được lưu trữ và phân phối trên một mạng blockchain phi tập trung, làm cho nó trở nên minh bạch và dù có muốn cũng không thể thay đổi được.

Trong bài blog này, chúng tôi thảo luận về Kachina - một giải pháp hợp đồng thông minh bảo vệ quyền riêng tư phát triển bởi Input Output Global (IOG) phối hợp với Đại học Edinburgh. Nó cho phép người dùng đạt được chức năng bảo vệ quyền riêng tư và chức năng hợp đồng thông minh có mục đích chung mà không phải hy sinh các đặc điểm phi tập trung.

## **Duy trì quyền riêng tư trong các giao dịch hợp đồng thông minh**

Tính minh bạch và thiết lập công khai của hầu hết các sổ cái hợp đồng thông minh giúp mọi người có thể nhìn thấy các điều kiện hợp đồng. Trong khi tính minh bạch là một trong những lợi thế mạnh nhất của công nghệ blockchain, quyền riêng tư vẫn cần thiết cho các ứng dụng làm việc với dữ liệu nhạy cảm.

Các nhà phát triển có thể sử dụng một số kỹ thuật mật mã để đảm bảo tăng tính riêng tư trong các hợp đồng thông minh Zero-knowledge proofs (ZKP) và tính toán an toàn là hai ví dụ điển hình. Được thúc đẩy bởi các kỹ thuật mật mã như vậy, một số giải pháp đáp ứng các định nghĩa khác nhau về quyền riêng tư và yêu cầu các giả định về độ tin cậy đã xuất hiện. Ví dụ bao gồm như: Zexe, zkay, Hawk, Zether, mạng Secret, và các loại khác. Giải pháp rõ ràng nhất trong số này, Hawk và Secret, dựa trên các giả định về niềm tin, hạn chế đáng kể mức độ phi tập trung mà chúng có thể đạt được. Hawk triển khai trong một nhóm nhỏ, cố định những người tham gia ở cốt lõi của hệ thống, trong khi Secret dựa trên Trusted Execution Environments (TEEs), một công nghệ có lịch sử sâu rộng về các cuộc tấn công gây tổn hại đến quyền riêng tư. Những kỹ thuật này nhìn chung xung đột với các nguyên tắc cơ bản của một nền tảng blockchain phi tập trung.

## **Kachina: nền tảng của các hợp đồng thông minh riêng tư**

Kachina xác định một lớp lớn các tính toán phân tán được thể hiện dưới dạng các hợp đồng thông minh đảm bảo quyền riêng tư, mà các nhà phát triển có thể thực hiện mà không cần thêm các giả định về độ tin cậy.

Một giao thức hợp đồng thông minh chỉ dựa trên zero-knowledge succinct non-interactive arguments of knowledge (ZK Snarks) để cung cấp quyền riêng tư. Các đảm bảo về quyền riêng tư của giao thức này đã được chứng minh trong khuôn khổ bảo mật Universal Composability (UC) thông qua mô hình hóa và chứng minh toán học. Mục tiêu chính của giao thức là cung cấp các cơ sở tối thiếu và các cơ sở mục đích chung cho các hệ thống bảo vệ nhiều quyền riêng tư hơn nữa mà không yêu cầu hệ thống cơ bản phải được nâng cấp với phần mở rộng mới hoặc thay đổi mới.

Kachina cho phép các tác giả của hợp đồng thu hẹp khoảng cách giữa blockchain và các máy móc cục bộ của người dùng - chúng được đại diện thông qua hai trạng thái độc lập, một trạng thái công khai và một trạng thái riêng tư tương ứng. Một hợp đồng có thể cập nhật cả hai trạng thái cùng với nhau là trạng thái công khai (và được chia sẻ) trên chuỗi và trạng thái riêng tư (và cục bộ) ngoài chuỗi. Sau đó, các bên được chứng minh trong zero-knowledge, họ được phép cập nhật trạng thái công khai: họ cung cấp thông tin chi tiết về sự tồn tại của trạng thái riêng tư và các yếu tố đầu vào mà bản cập nhật này có ý nghĩa.

Hợp đồng Kachina cũng đảm bảo:

- **Sự đồng thờ**i: trong một cách bảo vệ quyền riêng tư, Kachina đạt được sự đồng thời lớn hơn thông qua khái niệm mới lạ về bảng sao chép trạng thái oracle. Đây là các bản ghi của các hoạt động được thực hiện trên trạng thái của hợp đồng tương tác với các truy vấn oracle. Tác giả hợp đồng có thể tối ưu hóa các giao dịch xung đột, đảm bảo rò rỉ tối thiểu trong khi vẫn cho phép sắp xếp lại thứ tự.
- **Cấu trúc mô-đun** hiệu quả: Kachina được thiết kế để triển khai trên quy mô lớn. Các công việc trước đây sử dụng zero-knowledge không duy trì trạng thái hợp đồng một cách rõ ràng. Kachina cho phép truy cập vào trạng thái gián tiếp thông qua các oracle được quy định trong hợp đồng. Việc truy cập gián tiếp này đảm bảo khả năng mở rộng lớn hơn và do đó, sự phức tạp của những gì phải được chứng minh nằm dưới sự kiểm soát hoàn toàn của tác giả hợp đồng và có thể được tối ưu hóa.

Trong bài báo nghiên cứu, IOG chứng minh tính linh hoạt của giao thức Kachina trong nghiên cứu điển hình về thanh toán cá nhân. Đội ngũ này chính thức chỉ định một hợp đồng token riêng tư thông qua các chức năng chuyển tiếp và rò rỉ của nó. Hợp đồng này hỗ trợ chuyển khoản quỹ riêng tư, truy vấn số dư và tạo tài sản.

Trong khi thiết kế được đề xuất chủ yếu là lý thuyết, Kachina chứng minh khả năng tạo các hợp đồng thông minh bảo vệ quyền riêng tư dưới các ràng buộc trong cuộc sống thực:

- Việc sử dụng trạng thái oracle cho phép di chuyển hầu hết các hoạt động khó tính toán hoặc đòi hỏi nhiều hoạt động lưu trữ bên ngoài zero-knowledge proof, điều này làm giảm chi phí của nó.
- Trong khi hệ thống zero-knowledge proof vẫn phổ biến, các cấu trúc ZKP vẫn tồn tại và thực tế có thể sử dụng trong thiết lập được đề xuất.

Để biết thêm chi tiết, ví dụ và mẫu hợp đồng, hãy đọc ‘[Kachina – Foundations of Private Smart Contracts](https://iohk.io/en/research/library/papers/kachina-foundations-of-private-smart-contracts/)’.

*Tôi muốn cảm ơn [Thomas Kerber](https://iohk.io/en/team/thomas-kerber) đã đóng góp ý kiến ​​và hỗ trợ trong việc chuẩn bị bài blog này.

Bài này được dịch bởi Lê Nguyên với ngồn [tại đây](https://iohk.io/en/blog/posts/2022/08/05/kachina-privacy-preserving-smart-contracts/) 

*Dự án này được tài trợ bới Catalyst*
