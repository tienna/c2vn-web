# Plutus Application Backend (PAB): hỗ trợ phát triển DApp trên Cardano

### **PAB cung cấp các thành phần và môi trường để giúp các nhà phát triển tạo và thử nghiệm các DApp, trước khi triển khai chúng trong môi trường thực**

![](img/2021-10-28-plutus-application-backend-pab-supporting-dapp-development-on-cardano.002.png) Ngày 28 tháng 10 năm 2021![](img/2021-10-28-plutus-application-backend-pab-supporting-dapp-development-on-cardano.002.png)[ Fernando Sanchez](tmp//en/blog/authors/fernando-sanchez/page-1/)![](img/2021-10-28-plutus-application-backend-pab-supporting-dapp-development-on-cardano.003.png) bài 6 phút đọc

![Fernando Sanchez](img/2021-10-28-plutus-application-backend-pab-supporting-dapp-development-on-cardano.004.png)[](tmp//en/blog/authors/fernando-sanchez/page-1/)

### [**Fernando Sanchez**](tmp//en/blog/authors/fernando-sanchez/page-1/)

Technical Writer

Marketing and Communications

- ![](img/2021-10-28-plutus-application-backend-pab-supporting-dapp-development-on-cardano.005.png)[](mailto:fernando.sanchez@iohk.io "Email")
- ![](img/2021-10-28-plutus-application-backend-pab-supporting-dapp-development-on-cardano.006.png)[](https://www.linkedin.com/in/linkedinsanchezf/ "LinkedIn")

![Plutus Application Backend (PAB ): hỗ trợ phát triển DApp trên Cardano](img/2021-10-28-plutus-application-backend-pab-supporting-dapp-development-on-cardano.007.jpeg)

Bản nâng cấp giao thức Alonzo đã giới thiệu Plutus - một nền tảng cung cấp ngôn ngữ hợp đồng thông minh bản địa cùng với cơ sở hạ tầng và công cụ cần thiết để hỗ trợ hợp đồng thông minh trên Cardano. Nền tảng Plutus cho phép các nhà phát triển viết các ứng dụng phi tập trung (DApps) với khả năng viết tập lệnh tương tác với các sổ cái phân tán.

Để hiểu Plutus, người ta phải hiểu rõ ba khái niệm:

- Mô hình Extended Unspent Transaction Output (EUTXO)
- Plutus Core - phần 'on-chain' của Plutus
- The Plutus Application Framework (PAF) - Các hợp đồng của Plutus bao gồm các phần chạy trên blockchain (mã on-chain) và các phần chạy trên máy của người dùng (moã off-chain hoặc mã khách hàng)

Cả hai mã on-chain và off-chain đều được viết bằng Haskell và những hợp đồng thông minh Plutus là các chương trình Haskell hiệu quả.

### **Plutus Application Backend(PAB)là gì?**

[Trong một bài blog trước](https://iohk.io/en/blog/posts/2021/04/13/plutus-what-you-need-to-know/), chúng tôi đã thảo luận chi tiết hơn về chức năng on- chain và off-chain về các thành phần cốt lõi của Plutus. Ở đây, chúng ta hãy đi sâu hơn vào các khả năng off-chain của Plutus và xem xét chương trình Plutus Application Backend (PAB).

Trong mô hình UTXO, chúng tôi có cơ sở hạ tầng off-chain, dùng để xây dựng các giao dịch di chuyển các ứng dụng. Cơ sở hạ tầng off-chain này khá phức tạp vì nó cần phải xem trạng thái sổ cái, chọn một số thông tin từ sổ cái và tập hợp tất cả lại với nhau để xây dựng một giao dịch với các phần dữ liệu phù hợp và đúng vị trí. PAB là một thư viện Haskell duy nhất giúp viết cơ sở hạ tầng off-chain và các tập lệnh on-chain dễ dàng hơn.

PAB giúp xây dựng các giao dịch UTXO theo hai cách:

- Hướng đọc - Tức là lấy thông tin từ chuỗi và phản ứng với các sự kiện xảy ra trên blockchain. Đường dẫn đọc hiện đang hoạt động trên testnet
- Hướng ghi - Đây là nơi chúng tôi thực sự xây dựng các giao dịch chạy các tập lệnh Plutus

### **Vai trò của PAB**

PAB là một thành phần chính của Plutus Application Framework (PAF) cho phép các nhà phát triển tạo và kiểm tra các DApp tại chỗ, trước khi triển khai chúng vào môi trường thực. Giống như [Marlowe Playground](https://alpha.marlowe.iohkdev.io/#/) cung cấp một môi trường thử nghiệm cho các nhà phát triển để tạo và thử nghiệm các hợp đồng thông minh tài chính, PAB cung cấp một môi trường tương tự cho các nhà phát triển để tạo và thử nghiệm các DApp đầy đủ.

PAB là một dịch vụ phụ trợ off-chain để quản lý và xử lý các yêu cầu của phiên bản ứng dụng trong suốt vòng đời của nó. Điều này bao gồm tương tác với các khách hàng bên ngoài (chẳng hạn như giao diện người dùng của ví) và hoạt động như một trung gian giữa ứng dụng Plutus, node, chương trình phụ trợ của ví và người dùng cuối. Sự tương tác như vậy có thể thực hiện được nhờ các lệnh PAB và các thành phần mô phỏng cho phép mô phỏng và tích hợp DApps một cách thuận tiện.

Một số nhà phát triển đang tạo ra các công cụ của riêng họ mặc dù đó không phải là điều kiện tiên quyết để tạo hoặc triển khai Dapp và thực sự các [giải pháp thay thế dựa trên API](https://youtu.be/W2R3zl91U24?t=357) đang được cộng đồng thực hiện - PAB loại bỏ việc phải tạo cơ sở hạ tầng của riêng các nhà phát triển ngay từ đầu (bao gồm cả chuỗi chỉ định,...) giảm thời gian phát triển và nguồn lực cần thiết. Nó cho phép các nhà phát triển mô phỏng cách một ứng dụng sẽ hoạt động trên chuỗi để kiểm tra trước và loại bỏ lỗi, để đảm bảo một quá trình chuyển đổi hoàn hảo để khởi chạy.

Mục đích của PAB là:

- cung cấp một môi trường tiêu chuẩn hóa để các ứng dụng Plutus chạy được
- trình bày các giao diện có thể khám phá cho các máy khách bên ngoài
- theo dõi thông tin trên chuỗi để sử dụng hợp đồng thông minh
- cho phép nhà phát triển làm việc trong môi trường mô phỏng và môi trường thực

PAB có thể chuyển đổi liền mạch giữa các môi trường mô phỏng và môi trường thực. Điều này giúp dễ dàng hơn khi thực hiện tất cả các loại bài kiểm tra khác nhau - bài kiểm tra đơn vị, bài kiểm tra tích hợp, bài kiểm tra dựa trên thuộc tính,... PAB cho phép các DApp dễ dàng giao tiếp với nó vì phần phụ trợ có thể nhận và gửi tin nhắn. Do đó, DApp có thể gửi các yêu cầu thông thường đến các điểm cuối mà PAB đã tiếp xúc và đáp lại các hành động và hoạt động mà bất kỳ hợp đồng thông minh cụ thể nào đều có khả năng xử lý.

Các ứng dụng được triển khai bằng cách sử dụng các thư viện của khung có thể chạy trên PAB, cung cấp hỗ trợ thời gian chạy để truy cập vào blockchain nhằm thực hiện thêm các hoạt động giao dịch của hợp đồng thông minh dựa trên [mô hình EUTXO](https://iohk.io/en/blog/posts/2021/03/11/cardanos-extended-utxo-accounting-model/). Ngoài ra, PAB có chức năng bền bỉ, ghi nhật ký và giám sát.

### **Hiện tại chúng ta đang ở đâu?**

Đầu mùa hè này, chúng tôi đã triển khai testnet đầu tiên trong một loạt các testnet được mã hóa để mang lại khả năng hợp đồng thông minh cốt lõi của Plutus cho Cardano. Điều này đã được triển khai trên mainnet thông qua hard fork 'Alonzo'. Khả năng hợp đồng thông minh hiện có thể truy cập được bằng giao diện dòng lệnh (CLI). Mặc dù các hợp đồng thông minh đơn giản đầu tiên đã được kích hoạt trên mainnet vào đầu tháng 9, nhưng đây luôn là giai đoạn đầu tiên trong lộ trình triển khai DApp trên mainnet.

Trong khi đó, các nhà phát triển đã làm việc trên DApp của họ một cách cục bộ (nhiều người thông qua PAB) trong khi thử nghiệm bất kỳ chức năng hợp đồng thông minh cốt lõi nào trên testnet. Các yếu tố này cần phải kết hợp với nhau trước khi DApp truy cập vào mainnet và điều này cần thời gian. Khi PAB được tích hợp với node và các thành phần cốt lõi khác như trình kết nối wallet back end (WBE), các nhà phát triển sẽ có thể chuyển DApp của họ sang trạng thái sẵn sàng và đưa chúng đến Cardano testnet trước khi khởi chạy mainnet.

Các ứng dụng ban đầu này được xây dựng cục bộ sau đó sẽ có thể tương tác với mạng chính như dự kiến. Đối với phương pháp tiếp cận 'mockchain' dành cho nhà phát triển DApp, nó sẽ là một quá trình chuyển đổi suôn sẻ từ testnet sang mainnet. Tất cả những gì cần là thay đổi tệp cấu hình để khởi động PAB, nó không yêu cầu thay đổi mã thực hoặc mã Haskell. Công việc tích hợp này rất phức tạp và là một phần quan trọng của cơ sở hạ tầng Cardano, vì vậy chúng tôi cần đảm bảo nó được thực hiện chính xác. Chúng tôi đang tiếp tục làm việc trên các tích hợp cuối cùng và dựa trên quỹ đạo hiện tại, chúng tôi dự định thực hiện tích hợp vào tháng 11 năm 2021 nếu chúng tôi không gặp phải bất kỳ vấn đề nghiêm trọng nào.

### **Nhìn về tương lai**

Đây mới chỉ là khởi đầu. Như mọi khi, đây sẽ là một quá trình lặp đi lặp lại. Với sự phát triển của nền tảng Plutus, chúng tôi sẽ mời cộng đồng nhà phát triển triển khai công cụ của riêng họ và tạo mã off-chain cho DApp của họ chạy trên Cardano. Chúng tôi đã thấy nhiều hoạt động trong lĩnh vực này, thông qua cả chương trình mạng thử nghiệm Alonzo và Project Catalyst. Vì vậy, trong khi chúng tôi thử nghiệm nền tảng với các kỹ sư/QA và cộng đồng nhà phát triển, chúng tôi sẽ cải tiến dần dần và bổ sung thêm nhiều khả năng và chức năng. Mục đích là gì? Từ hardfork Alonzo và sự xuất hiện của các hợp đồng thông minh Plutus, trải nghiệm của nhà phát triển được mở rộng nhanh chóng, với các công cụ, API và môi trường mới để hỗ trợ một hệ sinh thái với nhiều nhân tài đang phát triển

*Để cập nhật thường xuyên, hãy chắc rằng bạn theo dõi chúng tôi trên [Twitter](https://twitter.com/InputOutputHK) và đăng ký kênh [YouTube](https://www.youtube.com/channel/UCBJ0p9aCW-W82TwNM-z3V2w) của chúng tôi. Để biết tổng quan về các dự án #BuildingOnCardano, hãy nhớ kiểm tra kho dữ liệu [Essential Cardano](https://github.com/input-output-hk/essential-cardano) .Bài này được dịch bởi Thanhtintran. review và đăng bài bởi Nguyễn Hiệu <a class="_active_edit_href" href="https://iohk.io/en/blog/posts/2021/10/28/plutus-application-backend-pab-supporting-dapp-development-on-cardano/">với bài gốc</a>. *Dự án này được tài trợ bởi Catalyst**
