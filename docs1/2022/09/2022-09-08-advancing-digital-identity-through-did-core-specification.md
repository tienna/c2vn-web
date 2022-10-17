# Cải tiến định danh kỹ thuật số thông qua đặc tả cốt lõi của DID

### **Việc phê duyệt các đặc tả cốt lõi của DID gần đây tại World Wide Web Consortium (W3C) đã cung cấp nền móng rõ ràng và mạnh mẽ hơn khi xây dựng các ứng dụng định danh phi tập trung.**

![](img/2022-09-08-advancing-digital-identity-through-did-core-specification.002.png) 8 tháng 9 năm 2022 ![](img/2022-09-08-advancing-digital-identity-through-did-core-specification.002.png) [Ivan Irakoze](/en/blog/authors/ivan-irakoze/page-1/) ![](img/2022-09-08-advancing-digital-identity-through-did-core-specification.003.png) 4 phút đọc

![Ivan Irakoze](img/2022-09-08-advancing-digital-identity-through-did-core-specification.004.png)[](/en/blog/authors/ivan-irakoze/page-1/)

### [**Ivan Irakoze**](/en/blog/authors/ivan-irakoze/page-1/)

Blog/Feature Writer

Marketing &amp; Communication

- ![](img/2022-09-08-advancing-digital-identity-through-did-core-specification.005.png)[](mailto:ivan.irakoze@iohk.io "Email")
- ![](img/2022-09-08-advancing-digital-identity-through-did-core-specification.006.png)[](https://twitter.com/The_ADA_Poet "Twitter")

![Cải tiến nhận dạng kỹ thuật số thông qua đặc điểm kỹ thuật cốt lõi của DID](img/2022-09-08-advancing-digital-identity-through-did-core-specification.007.jpeg)

Vào tháng 6 năm 2022, World Wide Web Consortium (W3C) đã phê duyệt các đặc tả cốt lõi DID của [The Working Group](https://www.w3.org/2020/12/did-wg-charter.html) để chuyển sang giai đoạn Khuyến nghị W3C. Sự kiện quan trọng này tái khẳng định mức độ liên quan ngày càng mật thiết của việc **&nbsp;định danh kỹ thuật số** và việc cung cấp các nền móng rõ ràng và mạnh mẽ hơn cho các giải pháp định danh chẳng hạn như [Atala PRISM](https://www.atalaprism.io/#why) .

Trong bài viết này, chúng ta sẽ cùng tìm hiểu:

- Định danh kỹ thuật số và danh tính phi tập trung (DIDs) là gì.
- Việc phê duyệt các đặc tả cốt lõi của DID có ý nghĩa như thế nào đối với định danh kỹ thuật số.

## **Định danh kỹ thuật số là gì?**

Để định nghĩa định danh kỹ thuật số, trước tiên chúng ta phải hiểu tất cả những thứ cấu thành nên danh tính.

[Danh tính](https://atala.mymidnight.blog/ssi-fundamentals-i-identity/) bao gồm tất cả các đặc điểm không thay đổi mô tả chúng ta là ai, chẳng hạn như dân tộc, ngày sinh, dòng dõi, v.v. và các đặc điểm có thể thay đổi như nghề nghiệp, danh tính trực tuyến của chúng ta, v.v.

Thông thường, chúng ta chỉ coi các cá nhân có một danh tính, nhưng các đối tượng khác như tổ chức, doanh nghiệp hay vật thể tồn tại dưới dạng vật lý hay số hóa cũng có thể có các đặc điểm nhận dạng duy nhất.

[Danh tính số](https://www.essentialcardano.io/article/digital-identity) là đại diện trực tuyến của các đối tượng và các tuyên bố về ai đó hoặc cái gì. "Thông tin xác thực có thể xác minh" (Verifiable Credentials - VC) đại diện cho những tuyên bố này trong môi trường số hóa, tương tự như các tài liệu vật lý mà chúng ta sử dụng ngày nay.

Các đối tượng, dù là cá nhân hay tổ chức, sử dụng các VC này để chia sẻ thông tin với các đối tượng khác. Việc trao đổi thông tin này dẫn đến hai câu hỏi quan trọng liên quan đến bảo mật:

- Mức độ an toàn khi chia sẻ thông tin định danh với các đối tượng khác như thế nào?
- Ai nắm quyền kiểm soát dữ liệu?

Trong thời đại internet, các công ty khác nhau thu thập một lượng lớn thông tin (thường là thông tin cá nhân) cho những mục đích ngoài tầm kiểm soát của chúng ta, điều đó khiến việc bảo mật danh tính của chính chúng ta trở nên quan trọng. Do đó  "Định danh tự chủ" (Self-sovereign Identity - SSI) và "Danh tính phi tập trung" (Decentralized Identifiers - DIDs) ra đời.

## **Định danh tự chủ (Self-sovereign Identity -SSI) và danh tính phi tập trung (Decentralized Identifiers - DIDs) là gì?**

SSI [ là một tập hợp các nguyên tắc](https://github.com/WebOfTrustInfo/self-sovereign-identity/blob/master/self-sovereign-identity-principles.md) đòi hỏi phải có đặc quyền không thể chối cãi để kiểm soát thông tin cá nhân mà bạn chia sẻ với người khác.

[DID](https://atala.mymidnight.blog/ssi-fundamentals-iii-dids/) là một khía cạnh quan trọng của nền tảng [ định danh phi tập trung](https://www.essentialcardano.io/glossary/decentralized-identity). Các thuật toán tạo ra các chuỗi ký tự ngẫu nhiên và duy nhất. Khi trao đổi danh tính ngang hàng với một đối tượng, các DID tạo ra một kênh an toàn cho phép giao tiếp hai chiều. Mỗi DID coi như một bút danh và người dùng có toàn quyền kiểm soát dữ liệu của họ và quyết định chia sẻ dữ liệu đó với ai.

Đặc tả cốt lõi DID của The Working Group giúp định nghĩa một DID, các thành phần và chức năng của nó. Theo đó, các DID có các đặc điểm sau:

- Được kiểm soát bởi các đối tượng nắm giữ chúng.
- Cho phép xác thực bằng mật mã của chủ sở hữu DID.
- Mô tả việc khám phá thông tin cần thiết để khởi chạy các phương pháp liên lạc an toàn và bảo vệ quyền riêng tư.
- Cấp quyền di chuyển dữ liệu cá nhân không phụ thuộc dịch vụ.

## **Phê duyệt đặc tả cốt lõi của DID có ý nghĩa gì đối với định danh kỹ thuật số?**

Việc phê duyệt đặc tả cốt lõi của DID bởi W3C đã chuẩn hóa các DID, đảm bảo công nghệ DID được tất cả đối tác đầu tư chấp nhận và có thể bắt đầu tiến tới việc áp dụng rộng rãi hơn.

Mặc dù [Google, Apple và Mozilla chính thức phản đối việc cải tiến thông số kỹ thuật DID](https://www.w3.org/2019/did-wg/faqs/2021-formal-objections/) , [Giám đốc W3C tuyên bố rằng](https://www.w3.org/2022/06/DIDRecommendationDecision.html) :

*Nếu đặc tả cốt lõi về DID không chuyển sang giai đoạn Khuyến nghị, điều này sẽ làm giảm động lực cho các nhà thiết kế hệ thống định danh phi tập trung khác, dẫn tới họ có thể tuân theo sự thống nhất của một nhóm người được thuê để tạo ra một sản phẩm trong lĩnh vực này. Người ta có thể dễ dàng thấy trước không cần thiết phải triển khai các kế hoạch [URI](https://www.techtarget.com/whatis/definition/URI-Uniform-Resource-Identifier) khác làm phức tạp hóa khả năng tương tác mà cộng đồng đã và đang làm việc để giải quyết. Và kết luận rằng sự cân bằng nằm ở lợi ích của cộng đồng các nhà phát triển DID, khuyến khích họ tiếp tục công việc của mình và tìm kiếm sự đồng thuận về các phương pháp DID tiêu chuẩn. Các phản đối đã bị bác bỏ. Đặc tả cốt lõi của DID được chấp thuận để chuyển sang giai đoạn Khuyến nghị W3C.*

Quyết định này **cho phép chuẩn hóa một mẫu chung toàn cầu** cho phép đáp ứng **khả năng tương tác** và **di động** . Nếu không tiêu chuẩn hóa, các DID và VC được tạo bằng các phương pháp DID khác nhau có thể không đọc được bởi những người xác minh hoặc không lưu trữ được trong một Ví danh tính duy nhất.

Do đó, trạng thái Khuyến nghị của W3C về đặc tả cốt lõi của DID đã giúp hệ thống hóa công việc của hàng trăm người đang cần mẫn làm việc để cải thiện nền tảng định danh kỹ thuật số.

Bước tiếp theo trong quy trình do Giám đốc W3C vạch ra là Working Group *phải giải quyết và cung cấp một hoặc nhiều phương pháp DID tiêu chuẩn được đề xuất và chứng minh rằng khi triển khai có thể tương tác được với nhau.*

## **Tìm hiểu thêm về Atala PRISM**

Input Output Global, Inc. (IOG) liên tục nghiên cứu và xây dựng các sản phẩm và dịch vụ thông qua công nghệ blockchain. Một trong những sản phẩm này là **Atala PRISM** - một nền tảng định danh kỹ thuật số được xây dựng trên các nguyên tắc SSI và một bộ dịch vụ dành cho dữ liệu có thể xác minh và danh tính kỹ thuật số, được xây dựng trên blockchain Cardano.

Xem video giải thích bên dưới để tìm hiểu thêm về Atala PRISM.

*Tôi muốn gửi lời cảm ơn [Peter Vielhaber](https://iohk.io/en/team/pete-vielhaber) đã đóng góp ý kiến và hỗ trợ cho bài đăng trên blog cộng tác này.*

Bài này được dịch bởi Vũ Đình Quân, Review bởi Quang Pham, Biên tập bởi Nguyễn Văn Hiệu

Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2022/09/08/advancing-digital-identity-through-did-core-specification). 

*Dự án này được tài trợ bởi Catalyst*
