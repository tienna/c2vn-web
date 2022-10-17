# Hydra - Giải pháp Layer 2 để Cardano tối ưu khả năng mở rộng

### **Khả năng mở rộng của Hydra được đưa vào lộ trình phát triển Cardano**

![](img/2021-09-17-hydra-cardano-s-solution-for-ultimate-scalability.002.png) 17 tháng 9 năm 2021 ![](img/2021-09-17-hydra-cardano-s-solution-for-ultimate-scalability.002.png) [Sebastian Nagel](tmp//en/blog/authors/sebastian-nagel/page-1/) ![](img/2021-09-17-hydra-cardano-s-solution-for-ultimate-scalability.003.png) 7 phút đọc

![Sebastian Nagel](img/2021-09-17-hydra-cardano-s-solution-for-ultimate-scalability.004.png)[](tmp//en/blog/authors/sebastian-nagel/page-1/)

### [**Sebastian Nagel**](tmp//en/blog/authors/sebastian-nagel/page-1/)

Software Engineering Lead

Engineering

- ![](img/2021-09-17-hydra-cardano-s-solution-for-ultimate-scalability.005.png)[](mailto:sebastian.nagel@iohk.io "Email")
- ![](img/2021-09-17-hydra-cardano-s-solution-for-ultimate-scalability.006.png)[](https://www.linkedin.com/in/sebastian-nagel-2bb43a1a/ "LinkedIn")
- ![](img/2021-09-17-hydra-cardano-s-solution-for-ultimate-scalability.007.png)[](https://github.com/ch1bo "GitHub")

![Hydra - Giải pháp Layer 2 để Cardano tối ưu khả năng mở rộng](img/2021-09-17-hydra-cardano-s-solution-for-ultimate-scalability.008.jpeg)

Bản nâng cấp Alonzo cho phép tạo các hợp đồng thông minh (smart contract), ứng dụng phi tập trung (DApp) và các ứng dụng khác trên Cardano.

Alonzo đánh dấu một cột mốc quan trọng trong hành trình của Cardano, triển khai khả năng viết tập lệnh ở cấp độ cơ sở, do đó sẽ cho phép đổi mới và phát triển mạng lưới hơn nữa. Nó cũng bắt đầu quá trình chuyển đổi Blockchain dựa trên giao dịch &amp; các token thành một tổ hợp năng động của sự sáng tạo, bao gồm tài chính và phát triển phi tập trung.

Hydra là một trong những phát triển thú vị nhất được Alonzo kích hoạt. Nó là một giải pháp Layer 2 quan trọng để cải thiện hơn nữa khả năng mở rộng của Cardano, phân lớp một giao thức mới trên Blockchain Layer 1 hiện tại.

### **Hydra: Giải pháp Layer 2 của Cardano**

Trong mạng lưới Blockchain, thuật toán đồng thuận tạo ra một môi trường an toàn và không cần lòng tin bằng cách đảm bảo thỏa thuận về lịch sử giao dịch. Cardano sử dụng Ouroboros, một thuật toán đồng thuận bằng chứng cổ phần hiệu quả, cho mục đích này. Nhưng Cardano cũng giống như bất kỳ Blockchain không cần cấp phép nào. Cardano phải đối mặt với những thách thức khi cố gắng mở rộng quy mô để đạt được thông lượng cần thiết để hỗ trợ các ứng dụng trong thế giới thực, bao gồm các dịch vụ thanh toán, định danh, trò chơi hoặc dịch vụ di động. Cuối cùng, Blockchain cần đạt được sự đồng thuận toàn cầu đối với mọi giao dịch.

Các giao dịch Cardano phải trả phí. Những người vận hành mạng lưới (trong trường hợp của Cardano là cộng đồng SPO) cần được thưởng xứng đáng cho phần công việc mà họ xử lý, vì vậy phí giao dịch cần phải được đặt ở mức hợp lý. Người dùng muốn trả mức phí mà họ có thể chấp nhận được. Ngoài ra, Blockchain cần được bảo vệ trước các cuộc tấn công từ chối dịch vụ (DoS). Do đó, các khoản phí không thể được đặt quá thấp để dẫn đến rủi ro không đáng có. Kẻ tấn công sẽ chịu tổn thất cực kỳ lớn nếu thực hiện các cuộc tấn công DoS. Việc lưu trữ cũng là một mối quan tâm, vì lịch sử giao dịch ngày càng tăng có thể dẫn đến các vấn đề về lưu trữ. Về mặt ảnh hưởng, các Blockchain thành công nhất có nguy cơ trở thành 'nạn nhân' của chính thành công đó.

Hydra là một giải pháp khả năng mở rộng Layer 2. Nó tìm cách giải quyết tất cả những mối quan tâm này với mục đích tối đa hóa thông lượng, giảm thiểu độ trễ, phát sinh chi phí thấp hoặc không tốn kém và giảm đáng kể yêu cầu lưu trữ.

### **Chia tỷ lệ theo phương pháp đẳng cấu**

Vậy Hydra làm điều này như thế nào? Bằng cách cung cấp các phương thức xử lý giao dịch ngoài chuỗi hiệu quả hơn cho một nhóm người dùng, đồng thời sử dụng sổ cái của chuỗi chính làm lớp thanh toán an toàn. Hydra giữ các đảm bảo an toàn trong khi vẫn giữ được liên kết cần thiết với chuỗi chính. Nó không yêu cầu sự đồng thuận toàn cầu và có thể thích ứng với nhiều loại ứng dụng. Ví dụ: Hydra cho phép phí giao dịch và Giá trị UTXO tối thiểu được cài đặt ở mức thấp nhất là 1 hoặc 2 Lovelace, rất quan trọng đối với các giao dịch vi mô và các trường hợp sử dụng mà chúng mở khóa.

Tuy nhiên, quan trọng nhất là Hydra đưa ra khái niệm về [các kênh trạng thái đẳng cấu](https://eprint.iacr.org/2020/299.pdf): nghĩa là nó sử dụng lại cùng một đại diện sổ cái để mang lại các bộ sổ cái ngoài chuỗi thống nhất, mà chúng tôi gọi là Hydra Head (cái tên Hydra ám chỉ đến [sinh vật nhiều đầu trong thần thoại Hy Lạp](https://en.wikipedia.org/wiki/Lernaean_Hydra)). Đặc biệt đối với Cardano, điều này có nghĩa là tài sản gốc, Token không thể thay thế (NFT) và tập lệnh Plutus có sẵn bên trong *mỗi* Hydra Head. Phép đẳng cấu cho phép một phần mở rộng tự nhiên của hệ thống, chứ không phải là một phần mở rộng bắt buộc.

Nhiều giao dịch hiện đang được xử lý bởi chuỗi chính hoặc ứng dụng chạy trên chuỗi chính có thể được hưởng lợi trực tiếp từ Hydra, vì nó chỉ hiểu các định dạng và chữ ký giao dịch giống nhau. Điều này làm giảm đáng kể rào cản gia nhập Hydra đối với các khách hàng mới hiện tại và tiềm năng. Họ có thể sử dụng lại cơ sở hạ tầng đã được thử nghiệm của Cardano để xây dựng ví và ứng dụng tương tác với hệ thống Layer 2. Ngoài ra, một Hydra Head có thể được tạo mà không cần tiền ban đầu từ phía bên nhận, điều này cho phép trải nghiệm người dùng mượt mà.

### **Phát triển bằng chứng về khái niệm**

Chúng tôi đã triển khai giao thức Hydra Head cơ bản như một bằng chứng về khái niệm Hydra-node. Bản xem trước dành cho nhà phát triển sẽ sẵn sàng vào thời điểm diễn ra Hội nghị thượng đỉnh Cardano sắp tới. Điều này sẽ cho phép các nhà phát triển (hoặc bất kỳ ai quan tâm) chạy một hoặc nhiều node Hydra trực tuyến, mở một Hydra Head với số lượng người tham gia giới hạn và cung cấp các giao dịch cho nó. Người dùng có thể mong đợi một nguyên mẫu hoạt động qua một Testnet chuyên dụng, cộng với các số liệu và tài liệu đo điểm chuẩn sớm trong [kho lưu trữ](https://github.com/input-output-hk/hydra-poc) GitHub này. Có thể sẽ không có bất kỳ thành phần hướng tới người dùng nào (ví, giao diện người dùng, v.v.) có sẵn.

Cũng cần lưu ý về tốc độ giao dịch mỗi giây (TPS), vẫn thường được sử dụng như là thước đo duy nhất của 'thành công' khi nói đến khả năng mở rộng. Một số người có xu hướng xếp hạng một mạng lưới dựa trên thông lượng tối đa của nó được đo bằng thông lượng (TPS). Mặc dù đây là một thước đo hợp lý cho các hệ thống 'legacy' có khả năng dự đoán và tính phù hợp cao (ví dụ như mạng lưới VISA), nó là một thước đo ít hữu ích hơn cho các hệ thống phân tán. Thay vào đó, trọng tâm ban đầu của chúng tôi là độ trễ (thời gian trôi qua cho đến khi giao dịch được xác nhận) như một cách khác thực tế hơn để đo tốc độ của các giao dịch Blockchain. Trên Mainnet, độ trễ tối thiểu là 20 giây (một Block). Đây là điểm khởi đầu. Trong một hệ thống Layer 2 như Hydra, có thể đạt được thời gian xác nhận *dưới một giây*. Các thuật ngữ như 'một triệu TPS' đã được sử dụng trước đây. Đó là một con số táo bạo và trong khi đây vẫn là một mục tiêu đầy khát vọng. Mục tiêu cuối cùng của bất kỳ hệ thống nào là sự linh hoạt để phát triển khả năng theo nhu cầu. Thông lượng được đo bằng TPS trên mỗi Hydra Head là thứ yếu, nó chủ yếu bị giới hạn bởi phần cứng có sẵn. Về nguyên tắc, bằng cách tăng thêm dần dần số lượng Hydra Head vào hệ thống, toàn bộ hệ thống có thể đạt được thông lượng cao tùy ý.

### **Sự phát triển của Hydra theo thời gian**

Trong ngắn hạn, chúng tôi sẽ tiếp tục phát triển Hydra node và giao thức Hydra Head cho đến khi nó trở thành nền tảng vững chắc và ổn định cho cộng đồng (và chúng tôi!) để xây dựng các ứng dụng trong thế giới thực. Các ứng dụng mới này sẽ được hưởng lợi từ việc giải quyết nhanh chóng với chi phí giao dịch thấp. Chúng tôi cũng đang tích cực phát triển các tính năng quan trọng khác, bao gồm hỗ trợ nhiều Head trên mỗi node, tính bền bỉ và tiện ích mở rộng giao thức Hydra Head.

Trong trung hạn từ 6-12 tháng, tiến độ sẽ phụ thuộc rất nhiều vào kết quả nghiên cứu và thử nghiệm của chúng tôi, cộng với phản hồi từ cộng đồng nhà phát triển. Ví dụ, chúng tôi đang nghiên cứu các cách kết nối nhiều Hydra Head để tăng “phạm vi tiếp cận” của giải pháp Layer 2 và cũng thử nghiệm các phương pháp khác nhau để giúp tích hợp và sử dụng Hydra dễ dàng hơn. Một trong những tầm nhìn thú vị nhất về lâu dài là sự phát triển của 'Đầu ảo (Virtual Head)' bằng cách chạy giao thức Hydra Head *bên trong* Hydra Head, do đó sử dụng đầy đủ tính đẳng cấu của giải pháp Layer 2. Đây là sự thật, một khả năng mở rộng *vô hạn về mặt lý thuyết* .

### **Tính linh hoạt là chìa khóa cho khả năng mở rộng và tăng trưởng**

Khái niệm bao quát cho Hydra là việc cung cấp giải pháp khả năng mở rộng Layer 2 tiên phong phù hợp với Cardano, một Blockchain thế hệ thứ ba dựa trên UTXO có khả năng hỗ trợ các hợp đồng thông minh. Hydra sẽ giảm chi phí trong khi tăng thông lượng và duy trì bảo mật.

Hydra sao chép chức năng của chuỗi chính trong khi giảm thiểu xung đột cho người dùng, nhưng vẫn cho phép tính linh hoạt khi có cấu trúc phí / chi phí khác nhau và các ràng buộc về thời gian ở Layer 2. Bất kỳ hệ sinh thái thành công nào cũng cân bằng nhu cầu của tất cả người dùng. Chúng tôi muốn hệ sinh thái này phục vụ nhu cầu của người tiêu dùng cá nhân, doanh nghiệp, chuyên gia, danh sách ngày càng tăng các ứng dụng phi tập trung và các nhà phát triển.

Với Hardfork Alonzo, Cardano sẽ bắt đầu một hành trình mới với tư cách là một nền tảng hợp đồng thông minh, cho phép các công nghệ như Hydra sẽ cải thiện đáng kể khả năng mở rộng của Cardano và tiếp tục được áp dụng.

*Tại [Hội nghị thượng đỉnh Cardano 2021](https://summit.cardano.org/), diễn ra từ 25-26 tháng 9, chúng tôi sẽ nói nhiều hơn về Hydra, tiến trình của nó cho đến nay và các mục tiêu cho tương lai. Hãy chắc chắn rằng bạn tham gia với chúng tôi! Và bạn cũng có thể muốn xem [phần giải thích Video này](https://www.youtube.com/watch?v=7ySUbFpTrAk) .*

**Matthias Benkort, Arnaud Bailly và Fernando Sanchez cũng đóng góp vào tác phẩm này.**

 Bài này được dịch bởi Nguyễn Văn Tú, Review bởi Quang Pham, Biên tập bởi Nguyễn Hiệu.
 
 Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/09/17/hydra-cardano-s-solution-for-ultimate-scalability/). 
 
 *Dự án này được tài trợ bởi Catalyst*
