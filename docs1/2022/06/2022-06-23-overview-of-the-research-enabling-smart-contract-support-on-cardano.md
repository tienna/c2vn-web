# Tổng quan về nghiên cứu cho phép hỗ trợ hợp đồng thông minh trên Cardano

### **Phần 2 - Cùng xem xét kỹ lưỡng hơn nghiên cứu của Cardano. Dưới đây là thông tin thêm về mô hình EUTXO của Cardano và cách nó tạo điều kiện để các hợp đồng thông minh trở nên hiệu quả hơn**

![](img/2022-06-23-overview-of-the-research-enabling-smart-contract-support-on-cardano.002.png) 23 tháng 6 năm 2022 ![](img/2022-06-23-overview-of-the-research-enabling-smart-contract-support-on-cardano.002.png) [Olga Hryniuk](/en/blog/authors/olga-hryniuk/page-1/) ![](img/2022-06-23-overview-of-the-research-enabling-smart-contract-support-on-cardano.003.png) 6 phút đọc

![Olga Hryniuk](img/2022-06-23-overview-of-the-research-enabling-smart-contract-support-on-cardano.004.png)[](/en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](/en/blog/authors/olga-hryniuk/page-1/)

Technical Writer

Marketing &amp; Communications

- ![](img/2022-06-23-overview-of-the-research-enabling-smart-contract-support-on-cardano.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2022-06-23-overview-of-the-research-enabling-smart-contract-support-on-cardano.006.png)[](https://github.com/olgahryniuk "GitHub")

![Tổng quan về nghiên cứu cho phép hỗ trợ hợp đồng thông minh trên Cardano](img/2022-06-23-overview-of-the-research-enabling-smart-contract-support-on-cardano.007.png)

[Bài đăng trên blog](https://iohk.io/en/blog/posts/2022/06/10/cardanos-foundational-research-overview/) trước đây của chúng tôi đã thảo luận về việc nghiên cứu để củng cố một số yếu tố cốt lõi của Cardano, bao gồm đặt cược, ủy quyền và chia sẻ phần thưởng. Lần này, chúng tôi phác thảo các tài liệu đã giúp thiết lập một nền tảng hợp đồng thông minh với chức năng phát triển ứng dụng phi tập trung (DApp) - được kích hoạt bởi mô hình Tài khoản [Đầu ra giao dịch chưa được sử dụng mở rộng](https://iohk.io/en/blog/posts/2021/03/11/cardanos-extended-utxo-accounting-model/) (EUTXO).

## **UTXO vs mô hình dựa trên tài khoản**

Bitcoin và Ethereum là một trong những blockchain phổ biến nhất hiện nay. Họ sử dụng hai mô hình tài khoản có sổ cái khác nhau để theo dõi việc phân phối và sở hữu tiền của người dùng. Các mô hình này là mô hình Đầu ra Giao dịch được sử dụng (UTXO) của Bitcoin và mô hình dựa trên tài khoản mà Ethereum đang sử dụng.

Mô hình UTXO đảm bảo tính bảo mật cốt lõi của các hoạt động tài chính. Xét về ngữ nghĩa, UTXO tồn tại trong một môi trường điện toán phân tán và phức tạp, nó bị hạn chế trong việc hỗ trợ các hợp đồng thông minh. Ethereum đã chọn mô hình dựa trên tài khoản một cách rõ ràng để tạo điều kiện cho các hợp đồng thông minh dễ dàng phát huy tính hiệu quả hơn.

Giải quyết câu hỏi liệu có thể có các hợp đồng thông minh rõ ràng trong khi vẫn giữ được sự đơn giản (về ngữ nghĩa) của mô hình UTXO hay không, các nhà nghiên cứu của IOG đã đưa ra các giải pháp ' [Mô hình UTXO mở rộng](https://iohk.io/en/research/library/papers/the-extended-utxo-model/) ' và 'Native Token có tính [tùy chỉnh trong Mô hình UTXO mở rộng](https://iohk.io/en/research/library/papers/native-custom-tokens-in-the-extended-utxo-model/) '. Cả hai bài nghiên cứu đều được xuất bản vào năm 2020 và mô tả đầy đủ mô hình EUTXO được thực hiện trên Cardano.

Manuel Chakravarty, nhà khoa học Lambda và kiến trúc sư Plutus tại Input Output Global, Inc. cho biết:

Mô hình sổ cái UTXO, được thử nghiệm bởi Bitcoin, vẫn là tiêu chuẩn vàng về bảo mật và khả năng mở rộng. Chúng tôi đã tạo ra mô hình UTXO mở rộng (EUTXO) để đạt được mức độ hiệu quả của hợp đồng thông minh do Ethereum tiên phong, trong khi vẫn duy trì khả năng mở rộng và bảo mật của UTXO. Chỉ đơn giản là chúng tôi muốn chọn lấy tính ưu việt nhất của cả hai mô hình!

Bài nghiên cứu 'Mô hình UTXO mở rộng' chứng minh khả năng của EUTXO trong việc liên tục duy trì trạng thái của hợp đồng và sử dụng cùng một mã hợp đồng dựa theo toàn bộ chuỗi giao dịch. Một tính năng mạnh mẽ khác của mô hình EUTXO là các khoản phí cần thiết cho một giao dịch hợp lệ có thể được dự đoán chính xác trước khi đăng tải. Đây là một tính năng độc đáo được thúc đẩy bởi [thiết kế của mô hình EUTXO](https://iog.io/en/blog/posts/2021/09/06/no-surprises-transaction-validation-on-cardano/) , không có trong các mô hình dựa trên tài khoản.

### **Plutus**

Hợp đồng thông minh là động lực thúc đẩy thực hiện giao dịch trên Cardano. Họ có thể tự thực hiện nên không bị phụ thuộc vào bên thứ ba.

Tại Hội nghị quốc tế ACM SIGPLAN về lập trình chức năng (ICFP'19), [Manuel Chakravarty đã thảo luận về các blockchains chức năng](https://www.youtube.com/watch?v=zXy4kxUlUmY) và đặc biệt, đã trình bày Plutus như một liên quan mật thiết đối với các hợp đồng thông minh:

Việc thực hiện nhanh chóng khiến mọi thứ bị phá vỡ không phải là cách phù hợp để xây dựng nền tảng blockchain. Những thứ bị phá vỡ sẽ không thể được sửa một cách dễ dàng. Do đó, Plutus được xây dựng trên nền tảng toán học vững chắc của hàm lập trình. Nó là một nền tảng lập trình cho hợp đồng thông minh, bao gồm các yếu tố như thư viện Haskell dùng để viết hợp đồng thông minh, trình biên dịch từ mã trên chuỗi (on-chain) Haskell sang Plutus Core và các công cụ khác nhau để hỗ trợ phát triển.

Hầu hết các nền tảng lập trình blockchain phụ thuộc vào một ngôn ngữ lập trình, chẳng hạn như Solidity của Ethereum. Plutus đã được hiện thực hóa trên nền của Haskell. Việc lựa chọn Haskell đã cho phép các nhóm nghiên cứu và kỹ thuật của IOG sử dụng lại cơ sở hạ tầng, thư viện và công cụ Haskell với hồ sơ theo dõi đã được thiết lập cho phần mềm có tính đảm bảo cao. Haskell tạo điều kiện cho mã trở nên ngắn gọn và có thể tái sử dụng, đồng thời đơn giản hóa việc lập luận, kiểm tra và sử dụng các phương pháp chính thức để đạt được mức độ bảo mật mong muốn. Các phương pháp chính thức, là hình thức lập luận nghiêm ngặt nhất về tính chính xác của mã, được các hợp đồng thông minh có giá trị cao đặc biệt quan tâm và được hỗ trợ tốt bởi mô hình lập trình chức năng.

Các nhóm nghiên cứu và kỹ thuật của IOG đã phân phối các hợp đồng thông minh của Plutus dựa trên các tài liệu như ' [Mô hình UTXO mở rộng](https://iohk.io/en/research/library/papers/the-extended-utxo-model/) ', 'Native Token[tùy chỉnh trong Mô hình UTXO mở rộng](https://iohk.io/en/research/library/papers/native-custom-tokens-in-the-extended-utxo-model/) ', ' [Làm sáng tỏ đệ quy: biên dịch IR với đệ quy sang Hệ thống F](https://iohk.io/en/research/library/papers/unraveling-recursioncompiling-an-ir-with-recursion-to-system-f/) ' và ' [Hệ thống F ở Agda, vì niềm vui và lợi nhuận](https://iohk.io/en/research/library/papers/system-f-in-agdafor-fun-and-profit/) '. Các giấy tờ này cùng nhau thiết lập mô hình sổ cái hỗ trợ hợp đồng thông minh của Cardano cũng như đại diện trên chuỗi (on-chain) của mã hợp đồng như cái gọi là các điều khoản lambda. 'Hệ thống F trong Agda, cho niềm vui và lợi nhuận' bao gồm một định nghĩa toán học nghiêm ngặt, được kiểm tra bằng máy tính với sự trợ giúp của định lý Agda.

Plutus hiện là một nền tảng lập trình sống động và đang hỗ trợ phát triển các hợp đồng thông minh trên Cardano. Nhóm giáo dục IOG cũng đã khởi động chương trình Plutus Pioneer (chương trình Tiên phong của Plutus) để tuyển dụng và đào tạo các nhà phát triển ngôn ngữ lập trình Plutus cho hệ sinh thái Cardano. Bạn có thể [tìm hiểu thêm về chương trình tại đây](https://testnets.cardano.org/en/plutus-pioneer-program/) .

### **Marlowe**

Trong khi Plutus là một ngôn ngữ lập trình hợp đồng thông minh chức năng, Marlowe là một nền tảng dựa trên web để xây dựng và chạy các hợp đồng thông minh tài chính với chi phí thấp mà không cần phải hiểu biết nhiều về lập trình. Nó mở ra một loạt các cơ hội cho những người không phải lập trình viên có thể thực hiện các hợp đồng đơn giản và được tối ưu hóa cho các giao dịch tài chính.

Bài báo nghiên cứu đầu tiên trình bày về Marlowe, ' [Marlowe: các hợp đồng tài chính trên blockchain](https://iohk.io/en/research/library/papers/marlowefinancial-contracts-on-blockchain/) ', được xuất bản vào năm 2018. Bài báo này khám phá thiết kế của một ngôn ngữ dành riêng cho mục đích thực hiện các hợp đồng tài chính. Nó trình bày ngữ nghĩa thực thi của Marlowe trong Haskell, một ví dụ về Marlowe trong thực tế và mô tả công cụ cho phép người dùng tương tác trong trình duyệt với các mô phỏng hợp đồng Marlowe.

Sau đó, vào năm 2020, nhóm nghiên cứu của IOG đã xuất bản một bài báo về ' [Phân tích tính hiệu quả của các hợp đồng Marlowe](https://iohk.io/en/research/library/papers/efficient-static-analysis-of-marlowe-contracts/) ', trình bày tóm tắt về công việc tối ưu hóa phân tích các hợp đồng Marlowe. Tiếp theo là ' [Marlowe: thực hiện và phân tích các hợp đồng tài chính trên blockchain](https://iohk.io/en/research/library/papers/marloweimplementing-and-analysing-financial-contracts-on-blockchain/) ' để mô tả việc triển khai Marlowe trên Cardano và môi trường mô phỏng và phát triển dựa trên web của Marlowe Playground (Sân chơi Marlowe). Bài báo cũng chỉ ra rằng các hợp đồng Marlowe có thể được phân tích toàn diện trước khi thực hiện chúng, do đó cung cấp sự đảm bảo chắc chắn cho những người tham gia hợp đồng.

Marlowe đã có sẵn để mọi người dùng thử trong [Marlowe Playground](https://playground.marlowe.iohkdev.io/#/) - một môi trường có tính thử nghiệm trên trình duyệt, nơi bạn có thể phát triển, mô phỏng và thử nghiệm quy trình viết các hợp đồng thông minh. IOG hiện đang chuẩn bị cho việc ra mắt mạng thử nghiệm Marlowe và sẽ sử dụng [Chương trình Marlowe tiên phong](https://pioneers.marlowe-finance.io/) để thu thập phản hồi từ các trường hợp sử dụng trên bộ sản phẩm Marlowe. Nhóm nghiên cứu gần đây đã cung cấp [công cụ Marlowe CLI](https://iohk.io/en/blog/posts/2022/04/19/introducing-the-new-command-line-interface-tool-for-marlowe/) để cho phép người dùng gửi các giao dịch và tương tác với các hợp đồng Marlowe bằng giao diện dòng lệnh. Khi được khởi chạy trên mainnet, các hợp đồng Marlowe sẽ mở ra một loạt các khả năng của DeFi.

*Vừa rồi chúng ta đã thảo luận về các đặc điểm của mô hình EUTXO của Cardano và cách nó tạo điều kiện phát triển hợp đồng thông minh trên Cardano, chúng ta sẽ thảo luận thêm về nghiên cứu cho phép hỗ trợ đa tài sản. Hãy theo dõi các bài blog tiếp theo!*

Bài này được dịch bởi Max Long, Review bởi Pham Quang, biên tập bởi Nguyễn Hiệu. Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2022/06/23/overview-of-the-research-enabling-smart-contract-support-on-cardano)

*Dự án này được tài trợ bới Catalyst*
