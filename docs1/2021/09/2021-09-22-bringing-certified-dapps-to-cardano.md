# Chứng nhận DApp trên Cardano

### **Chúng tôi sẽ tiết lộ một cách tiếp cận tích hợp mới tại Hội nghị thượng đỉnh Cardano vào cuối tuần này. Đây là bản xem trước ...**

![](img/2021-09-22-bringing-certified-dapps-to-cardano.002.png) 22 tháng 9 năm 2021![](img/2021-09-22-bringing-certified-dapps-to-cardano.002.png) [Shruti Appiah](tmp//en/blog/authors/shruti-appiah/page-1/)![](img/2021-09-22-bringing-certified-dapps-to-cardano.003.png) 6 phút đọc

![Shruti Appiah](img/2021-09-22-bringing-certified-dapps-to-cardano.004.png)[](tmp//en/blog/authors/shruti-appiah/page-1/)

### [**Shruti Appiah**](tmp//en/blog/authors/shruti-appiah/page-1/)

Head of Product

Engineering

- ![](img/2021-09-22-bringing-certified-dapps-to-cardano.005.png)[](https://www.linkedin.com/in/shrutiappiah/ "LinkedIn")
- ![](img/2021-09-22-bringing-certified-dapps-to-cardano.006.png)[](https://github.com/ShrutiAppiah "GitHub")

![Chứng nhận DApp trên Cardano](img/2021-09-22-bringing-certified-dapps-to-cardano.007.jpeg)

Bản nâng cấp Alonzo đã cho phép triển khai các hợp đồng thông minh ( smart contract), ứng dụng phi tập trung (DApp) và các ứng dụng khác trên Cardano. Tất cả điều này cực kỳ quan trọng đối với Cardano, vì nó sẽ giúp Cardano có thêm một cộng đồng nhà phát triển hoàn toàn mới, những người có động lực sáng tạo sẽ thúc đẩy việc áp dụng và nâng cao tiện ích cho Cardano.

Bất kỳ hệ sinh thái ứng dụng mới nào cũng tạo ra sự thích thú cho việc trải nghiệm. Tương tự, một hệ sinh thái mới nổi phải đối mặt với hai thách thức chính ngay từ đầu: khám phá và đảm bảo chất lượng. Người dùng cần tìm thấy các sản phẩm mà họ muốn tương tác và sự đảm bảo chất lượng cơ bản ở mức nhất định.

Các ứng dụng mới của bên thứ ba cũng tạo ra nguy cơ tiềm ẩn về tài liệu không phù hợp hoặc độc hại, hoặc nội dung không đạt tiêu chuẩn. Vì vậy, giải quyết các vấn đề về khám phá và đảm bảo chất lượng là chìa khóa cho sự phát triển sớm của hệ sinh thái.

Chúng tôi sẽ đi sâu hơn vào chủ đề quan trọng đó vào cuối tuần này tại Hội nghị thượng đỉnh Cardano. Tại đó, chúng tôi sẽ giới thiệu một chương trình chứng nhận để đánh giá các ứng dụng được phát triển trên Cardano. Và cả những thứ trên dAppStore sắp tới mà chúng tôi đang phát triển.

### **Khám phá DApp trên Cardano**

Chúng tôi sẽ xem trước một nguyên mẫu tại Hội nghị. DAppStore là nơi các nhà phát triển có thể tải lên DApp mà họ đang chạy trên Cardano và cung cấp cho những người khác. Cửa hàng sẽ cung cấp một môi trường dân chủ và đáng tin cậy để các nhà phát triển xuất bản DApp mà không phải đối mặt với sự kiểm duyệt.

Plutus dAppStore giải quyết hai rào cản gia nhập:

- Hiện tại không có quy trình phát hành chính thức cho DApp. Hầu hết mọi phát hành đều xảy ra thông qua các phương tiện cơ bản hoặc truyền miệng, hoặc thông qua tiếp thị trên mạng xã hội.
- Không có cái nhìn tổng hợp về tất cả các DApp có sẵn trong một hệ sinh thái nhất định dành cho người dùng.

Người dùng sẽ có thể truy cập Plutus dAppStore bằng trình duyệt Web. Hãy coi Plutus dAppStore như một 'mặt tiền của cửa hàng' cho Cardano. Cửa hàng hiển thị nhiều thứ bạn có thể làm trên Cardano. Chương trình chứng nhận cung cấp cho người dùng sự đảm bảo về hành vi của bất kỳ ứng dụng nào mà họ sử dụng, thông qua kiểm tra Logic tự động, kiểm toán hợp đồng thông minh thủ công và xác minh chính thức.

Bất kỳ DApp nào cũng có thể tồn tại trên cửa hàng, dù được chứng nhận hay chưa. Nhưng chúng tôi sẽ cung cấp cho người dùng thông tin rõ ràng về trạng thái chứng nhận của một DApp cụ thể. DAppStore không tìm cách hoạt động như người gác cổng - Gatekeeper (hoặc người đánh giá - Judge) mà là cung cấp một nền tảng để đánh giá minh bạch cho người dùng.

### **Vai trò quan trọng của chứng nhận**

DAppStore là một cửa hàng. Nhưng ngoài việc xác nhận cho cộng đồng, nó không cung cấp sự đảm bảo 'bắt buộc' (Baked-in). Vì vậy, đây là nơi yếu tố thứ hai xuất hiện. Vai trò của chương trình chứng nhận là ngăn chặn các lỗ hổng bảo mật ở cấp độ mã Code. Chúng ta sẽ đạt được điều này bằng cách triển khai các cấp độ 'bảo vệ' khác nhau.

Sẽ có một số cấp độ. Ở cấp độ đơn giản nhất, kiểm tra Logic tự động sẽ cho phép chúng tôi phát hiện một số loại mã Code độc hại. Ví dụ: những điều này sẽ có thể xác minh việc hợp đồng không có cách nào để thu hồi các khoản tiền bị khóa. Trong một hợp đồng được soạn thảo tốt, các khoản tiền bị khóa cần phải lấy lại được.

Ngoài ra, kiểm toán hợp đồng thông minh thủ công sẽ giúp chúng tôi xác minh tính toàn vẹn của DApp. Cuối cùng, xác minh chính thức đầy đủ sẽ kiểm tra mô hình toán học để chứng minh rằng hợp đồng thông minh đáp ứng các đặc điểm kỹ thuật chính thức về hành vi của nó.

Tất nhiên, bất kỳ chương trình chứng nhận nào cũng tốt cho những người thực thi và sử dụng nó. Vì lý do này, chúng tôi đang hợp tác với một số tên tuổi hàng đầu trong không gian lập trình chức năng, những người bạn sẽ gặp tại Hội nghị.

### **Xây dựng trên nền tảng an toàn: chính là Cardano**

Nỗ lực chứng nhận này được xây dựng trên một Blockchain đã cung cấp nhiều đảm bảo hơn so với các Blockchain khác như Bitcoin hoặc Ethereum. Ví dụ: Token được xây dựng trong kiến trúc của chính Cardano, thay vì phải được cung cấp bởi các hợp đồng, chẳng hạn như ERC20 trên Ethereum. Điều này giúp loại bỏ bất kỳ vấn đề nào được tạo ra bằng cách sao chép và sửa đổi hợp đồng để triển khai Token mới.

Nhìn vào nền tảng của chuỗi, về cơ bản đầu ra giao dịch chưa chi tiêu mở rộng [eUTXO](https://iohk.io/en/blog/posts/2021/03/11/cardanos-extended-utxo-accounting-model/) là mô hình kế toán đơn giản và an toàn hơn cho một Blockchain. Hợp đồng thông minh trong Plutus là các chương trình chức năng. Ngữ nghĩa đơn giản và có thể kiểm chứng làm nền tảng cho những gì chúng tôi thực hiện với cả kiểm tra tự động và xác minh chính thức. Chúng tôi muốn xây dựng một nền tảng an toàn hơn các chuỗi khác. Plutus là một ngôn ngữ lập trình.

Ngoài ra, Marlowe là ngôn ngữ lập trình đặc biệt dành cho lĩnh vực tài chính. Nó đảm bảo một số thuộc tính nhất định trong thiết kế. Ví dụ, không có hợp đồng Marlowe nào sẽ giữ lại tài sản sau khi hợp đồng đã chấm dứt. Đó là tài sản được tích hợp sẵn trong Marlowe, không yêu cầu kiểm tra thêm để được thực thi. Thiết kế của Marlowe cũng cho phép các công cụ tự động kiểm tra xem các hợp đồng có các đặc tính tốt nhất định hay không bằng cách xác minh mọi khả năng thực hiện hợp đồng mà không cần phải chạy nó. Đây là điều mà các hợp đồng Plutus nói chung không thể làm được.

### **Chứng nhận trong bối cảnh của Hardfork Alonzo**

Tại Hội nghị, chúng tôi sẽ đưa ra các ví dụ về kiểm tra tự động hợp đồng thông minh là một thành phần của DApp, chứ không phải toàn bộ DApp.

Về lâu dài, chúng tôi muốn thấy các công cụ do người dùng thiết kế. Việc triển khai các công cụ đó vào cửa hàng và sự phát triển của Plutus dAppStore để có các tính năng mới như ủng hộ, đánh giá và thậm chí tích hợp Atala PRISM, v.v. mang đến cho người dùng cơ hội phản hồi về phạm vi DApp trong cửa hàng.

Thông qua công việc trên Testnet Alonzo, chương trình Plutus Pioneer và Dự án Catalyst, chúng tôi đã thấy một loạt các dự án bắt đầu xây dựng trên Cardano. Khi các dự án này bắt đầu hoạt động trên thị trường trong những tháng tới, khả năng khám phá và sự tin tưởng của người dùng vào các DApp đó sẽ là chìa khoá quan trọng. Chúng ta đang làm việc với một hệ sinh thái mở và phi tập trung. Vì vậy, các quy tắc thông thường của *người báo trước (Caveat Emptor)* và 'Tự nghiên cứu của riêng bạn' sẽ tiếp tục được áp dụng. Nhưng việc giúp thúc đẩy các tiêu chuẩn cao hơn trong chứng nhận và đảm bảo sẽ là chìa khóa để thúc đẩy sự phát triển của một hệ sinh thái thành công trên Cardano và cuối cùng là cơ sở người dùng rộng rãi nhất có thể.

##### **Simon Thompson và Fernando Sanchez cũng đóng góp vào tác phẩm này.**

*Tham gia với chúng tôi tại Hội nghị thượng đỉnh vào ngày 25-26 tháng 9 để tìm hiểu thêm về sáng kiến mới thú vị này và xem bản Demo của nguyên mẫu dAppStore.*

Bài này được dịch bởi Nguyễn Văn Tú, review bởi Quang Pham, biên tập bởiNguyễn Hiệu.

Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/09/22/bringing-certified-dapps-to-cardano). 

*Dự án này được tài trợ bởi Catalyst*
