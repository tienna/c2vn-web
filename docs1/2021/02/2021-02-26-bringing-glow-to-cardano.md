# Mang ngôn ngữ lập trình Glow đến với Cardano

### **Chúng tôi vừa tạo ra một devnet để hỗ trợ Glow, ngôn ngữ mới nhất mà Cardano sẽ hỗ trợ. Chúng tôi đã nói chuyện với người tạo ra nó về việc xây dựng DSL để phát triển Dapp.**

![](img/2021-02-26-bringing-glow-to-cardano.002.png) Ngày 26 tháng 2 năm 2021![](img/2021-02-26-bringing-glow-to-cardano.002.png)[ Eric Czuleger](tmp//en/blog/authors/eric-czuleger/page-1/)![](img/2021-02-26-bringing-glow-to-cardano.003.png) bài đọc 7 phút

![Eric Czuleger](img/2021-02-26-bringing-glow-to-cardano.004.png)[](tmp//en/blog/authors/eric-czuleger/page-1/)

### [**Eric Czuleger**](tmp//en/blog/authors/eric-czuleger/page-1/)

Senior Content Editor

Marketing &amp; Communications

- ![](img/2021-02-26-bringing-glow-to-cardano.005.png)[](mailto:eric.czuleger@iohk.io "Email")
- ![](img/2021-02-26-bringing-glow-to-cardano.006.png)[](https://www.linkedin.com/in/eric-czuleger-6b67a395/ "LinkedIn")
- ![](img/2021-02-26-bringing-glow-to-cardano.007.png)[](https://twitter.com/eczuleger "Twitter")

![Mang ngôn ngữ lập trình Glow đến với Cardano](img/2021-02-26-bringing-glow-to-cardano.008.jpeg)

*Vào cuối năm 2022, chúng tôi đã công bố kế hoạch phát triển của mình để hỗ trợ mục tiêu chiến lược lâu dài hơn là mở rộng Cardano cho nhiều ngôn ngữ phát triển - như đã nêu trong video '['Island, Ocean, Pond''](https://youtu.be/k8a6tX53YPs). Trong tuần này, cùng với việc xây dựng [Ethereum Virtual Machine](https://developers.cardano.org/en/virtual-machines/welcome/), chúng tôi cũng đang triển khai [một môi trường phát triển mới](https://developers.cardano.org/en/programming-languages/glow/overview/) để hỗ trợ ngôn ngữ lập trình Glow.*

*François-René Rideau, chủ công ty Mutual Knowledge Systems, người tạo ra Glow, một DSL sẽ cho phép bất kỳ ai viết DApp có thể xác minh từ một thông số kỹ thuật duy nhất và triển khai nó trên mạng EVM của chúng tôi. Chúng tôi đã nói chuyện với Rideau (còn được gọi là Fare) để nghe thêm về tầm nhìn của anh ấy đối với Glow và hành trình với Cardano cho đến nay. Sau đây là những suy nghĩ của anh ấy được tóm tắt từ những cuộc phỏng vấn trước đây của chúng tôi.*

**Lần đầu tiên chúng tôi giới thiệu với cộng đồng về GLOW và MuKn vào [cuối năm ngoái](https://youtu.be/lj9SlvOIBgU?t=2902) khi chúng tôi công bố phương pháp tiếp cận devnet của mình - nhưng anh có thể chia sẽ cho chúng tôi biết rằng anh đã bắt đầu làm việc với IOHK như thế nào không?**

Tôi bắt đầu là một nhà nghiên cứu về các phương pháp chính thức cho ngôn ngữ lập trình và hệ thống phân tán. Nhưng tôi muốn xây dựng các hệ thống thực sự được nhiều người sử dụng, vì vậy tôi đã chuyển sang lĩnh vực mà tôi đặc biệt quan tâm để chứng minh tính đúng đắn của giao thức thanh toán tập trung và tạo hệ thống đặt chỗ của ngành hàng không. Sau một vài năm làm việc tại Google và Bridgewater, tôi quyết định cuộc sống không đáng để làm việc theo hệ thống chức năng rối loạn đó, vì vậy tôi đã thành lập các công ty tiền mã hóa của riêng mình. Charles đã mời tôi phát biểu tại Hội nghị thượng đỉnh IOHK 2019 và tôi nhận ra rằng tôi rất thích cộng đồng Cardano: chúng tôi có cùng trọng tâm là xây dựng phần mềm mạnh mẽ trong dài hạn. Đó là lý do tại sao tôi muốn đưa ngôn ngữ Glow sử dụng cho Cardano.

**Hãy cho chúng tôi biết lý do tại sao anh thành lập công ty Mutual Knowledge Systems, hay còn là MuKn (Moon)?**

Hơn ba năm trước, tôi đã xem xét các sách trắng (whitepaper). Hầu hết các bài báo (khoảng ¾) có kỹ thuật thú vị nhưng không có ý nghĩa kinh tế. Phần còn lại (khoảng ⅕) có ý nghĩa kinh tế nhưng không có nội dung kỹ thuật. Chỉ một số ít (khoảng 5%) thực sự có ý nghĩa cả về mặt kỹ thuật và kinh tế. Vào thời điểm đó, tôi nhận ra mình có thể làm tốt hơn, vì vậy tôi đã thiết kế một giải pháp mở rộng quy mô bằng cách sử dụng kinh nghiệm khi làm việc trên Tezos. Arthur Breitman đã thách tôi sử dụng các hợp đồng thông minh thay vì cố gắng sửa đổi giao thức của anh ấy.

Trong khi cố gắng chứng minh lời thách thức của anh ấy là vô lý, tôi thấy rằng anh ấy đúng còn tôi sai — và cuối cùng tôi đã hiểu tại sao và cách sử dụng hợp đồng thông minh. Tôi thành lập một công ty xoay quanh giải pháp mở rộng quy mô, gây quỹ và tập trung vào việc xây dựng giải pháp mở rộng quy mô. Sau đó tôi đã tranh luận và kết thúc với đối tác của mình, cuối cùng tôi tự trở thành giám đốc điều hành, thành lập một công ty mới và sau nhiều tranh đấu, cuối cùng tôi tìm được đội ngũ sáng lập phù hợp với mình. Cùng với nhau, chúng tôi đã xây dựng Mutual Knowledge Systems hướng đến xây dựng ngôn ngữ lập trình Glow — được thiết kế tốt hơn các ngôn ngữ viết các ứng dụng phi tập trung hiện có.

**Khi anh nói 'tốt hơn', ý anh thực sự muốn nói là gì?**

Viết DApp là điều khó nhất trên thế giới. Điều này là do bạn không thể để xảy ra sai sót, nếu không người dùng của bạn có thể mất số tiền đáng kể. Hơn nữa, bạn không những phải đối mặt với các tình huống ngẫu nhiên mà còn là những kẻ thù tích cực cố gắng tấn công bộ mã của bạn, những kẻ đó sẽ tạo ra các tình huống xấu nhất để khai thác vì lợi nhuận của họ. Tuy nhiên, không giống như quân đội, bạn không thể giấu mã  nguồn hoặc bảo vệ quyền truy cập vào mạng của mình: tất cả các phần quan trọng nhất phải được công khai. Trên hết, các công cụ lập trình hiện có không được thiết kế cho những ràng buộc này và ngay cả các phương pháp truyền thống chính thức cũng thiếu các khái niệm cần thiết để diễn đạt các vấn đề đang được đề cập.

Vì vậy, chúng tôi quyết định làm cho các công cụ mới phù hợp với thử thách. Ngôn ngữ lập trình được tối ưu hóa dành riêng cho một lớp các vấn đề cụ thể của chúng tôi (DSL) đơn giản hóa việc phát triển DApp, bằng cách loại bỏ tất cả cơ sở hạ tầng blockchain chung, vì vậy bạn có thể tập trung vào vấn đề của mình (giao dịch, phái sinh, bảo hiểm, chuỗi cung ứng, v.v.). DApp của bạn có thể là hàng nghìn dòng mã mà người dùng của bạn có thể đủ khả năng kiểm tra, thay vì hàng triệu dòng mã đòi hỏi sự tin tưởng mù quáng. Và mô hình lập trình sẽ cho phép các nhà lập trình, kiểm toán viên và các công cụ xác minh tự động kiểm tra được những người tham gia trao đổi tài sản, chứ không phải chỉ là các gói dữ liệu lưu hành trên Internet.

**Điều gì ở Cardano và cộng đồng của Cardano hấp dẫn anh?**

Tôi đã bắt đầu giống như những người khác, bắt đầu trên Ethereum, bởi vì hệ sinh thái của nó đã trưởng thành. Tuy nhiên, cộng đồng Ethereum có khuynh hướng xây dựng các thử nghiệm càng nhanh càng tốt, đủ tốt cho hiện tại, nhưng thiếu tính toàn vẹn về khái niệm nó sẽ không thể kéo dài; Tôi thấy nhiều giá trị trong cách tiếp cận đó và vô cùng tôn trọng những người có thể phát triển theo cách này — nhưng đối với tôi thì không. Khi tôi gặp cộng đồng Cardano, tôi cảm thấy giống như ở nhà hơn vì chúng tôi có chung một thái độ. Chúng tôi muốn làm những điều đúng đắn bằng cách xây dựng và sẽ tiếp tục hoạt động lâu dài. Chúng tôi xây dựng các tháp bê tông trên nền đá, chứ không xây dựng các căn chòi trên cát. Đôi khi, điều này có thể khiến bạn bực bội vì mọi thứ diễn ra chậm chạp, nhưng tôi rất vui vì sự chú ý đến từng chi tiết và chất lượng trong quá trình phát triển của Cardano. Nó có hoàn hảo không? Không, không hề. Nhưng nó có những nguyên tắc cơ bản tuyệt vời.

**Anh có thể chia sẽ hy vọng của anh về việc liệu Glow sẽ thay đổi trải nghiệm của các nhà lập trình DApp không?**

Glow là tiện lợi. Hiện tại, nó hoạt động trên Cardano và Ethereum nhưng trong tương lai nó sẽ hoạt động với bất kỳ blockchain nào đủ tiên tiến để hỗ trợ các hợp đồng thông minh. Điều đó có nghĩa là bạn có thể viết DApp của mình một lần và nó sẽ chạy trên bất kỳ nền tảng nào có người dùng và tính thanh khoản mà bạn tìm kiếm. Bạn không cần phải đoán xem khả năng thanh khoản sẽ ở đâu trong tương lai, sau đó đầu tư nhiều để phát triển trên một chuỗi duy nhất mà bạn đặt cược để xây công việc của mình.

Với Glow, các nhà lập trình có thể chạy DApp của họ trên tất cả các blockchain. Glow sẽ phổ biến trên các blockchain. Sau đó, các blockchain sẽ cạnh tranh dựa trên giá trị kỹ thuật và kinh tế, chứ không phải dựa trên việc cố định người dùng. Và giá trị mang lại cho người dùng sẽ ngày càng tăng.

**Cộng đồng có thể mong đợi điều gì từ Glow?**

Chúng tôi đã ra mắt phiên bản đầu tiên này của Glow trên Cardano EVM Devnet với giao diện dòng lệnh. Theo nhiều khía cạnh, nó vẫn chưa sẵn sàng để được sử dụng bởi người dùng cuối, nhưng nó đã có thể thực hiện các ứng dụng đơn giản. Người dùng cũng có thể thấy cách họ có thể viết một ứng dụng chỉ 6 dòng trong Glow trong khi kết hợp giữa Solidity và JavaScript thì họ phải viết hàng trăm dòng. Chúng tôi có lộ trình trong vài tháng tới để thêm nhiều tính năng: từ token ERC20 (và trên Cardano là token gốc), đến các kênh trạng thái tổng quát, giao diện web, đến thời gian chạy mạnh mẽ hơn,... Cuối cùng, chúng tôi muốn trở thành môi trường phát triển cho tất cả các dự án blockchain. Và tất nhiên Glow là một phần mềm mã nguồn mở cho cộng đồng.

**Chúng ta đang triển khai tích hợp Glow với chương trình EVM và devnet của mình, vậy một số lợi ích của việc này là gì?**

Side-chain Cardano EVM sẽ cho phép các hợp đồng tùy chỉnh chạy trên Cardano sử dụng nền tảng EVM ổn định, mà không cần đến việc áp dụng Plutus để đạt được tính năng cân bằng, ổn định,... Và Glow có thể chạy trên side-chain EVM này và cung cấp sự đơn giản, an toàn và tính tiện lợi trong phát triển DApp mà trước đây chưa từng có.

**Quy trình triển khai như thế nào và cộng đồng của chúng ta có thể tham gia như thế nào nếu họ muốn?**

Glow vẫn đang trong quá trình phát triển. Có một số điều mà nó có thể làm được và một số nó chưa thể làm được. Chúng tôi mời các nhà lập trình DApp tham gia cộng đồng Glow và sử dụng ngôn ngữ này với những gì nó đã có thể làm được, và mặt khác giúp chúng tôi xây dựng môi trường phát triển blockchain trong tương lai. Bạn có thể tự mình xây dựng các tính năng còn thiếu mà bạn cần hoặc ký hợp đồng với MuKn để xây dựng chúng cho bạn. Ngay cả khi bạn không thể viết mã và không có ngân sách, bạn có thể giúp viết tài liệu hoặc thậm chí chỉ cần cho chúng tôi biết nơi nào chưa rõ hoặc những tính năng bạn cần nhất để chúng tôi biết những gì cần ưu tiên. Cùng nhau, chúng ta có thể xây dựng các DApp tuyệt vời mà bạn không thể đạt được một cách an toàn và trong một phạm vi ngân sách bằng các công cụ trước đó.

*Nếu bạn là nhà lập trình, chúng tôi khuyến khích bạn tham gia vào [Mutual Knowledge Systems and Glow](https://mukn.io/). Hãy xem toàn bộ cuộc trò chuyện của chúng tôi với François-René Rideau và phần trình diễn của Glow trong [Cardano360](https://youtu.be/YXaK0cvgoFQ?t=4367).*

Bài này được dịch bởi Lê Nguyên, Review bởi Quang Pham, Biên tập bởi Nguyễn Hiệu.
 Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/02/26/bringing-glow-to-cardano/) 
 
 *Dự án này được tài trợ bởi Catalyst*
