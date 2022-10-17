# Phí Babel - xác định phí giao dịch bằng Token gốc

### **Giới thiệu một cơ chế mới cho phép thanh toán phí giao dịch bằng Token do người dùng xác định trên Cardano**

![](img/2021-02-25-babel-fees.002.png)25 tháng 2 năm 2021![](img/2021-02-25-babel-fees.002.png) [Giáo sư Aggelos Kiayias](tmp//en/blog/authors/aggelos-kiayias/page-1/)![](img/2021-02-25-babel-fees.003.png) 8 phút đọc

![Giáo sư Aggelos Kiayias](img/2021-02-25-babel-fees.004.png)[](tmp//en/blog/authors/aggelos-kiayias/page-1/)

### [**Giáo sư Aggelos Kiayias**](tmp//en/blog/authors/aggelos-kiayias/page-1/)

Chief Scientist

Academic Research

- ![](img/2021-02-25-babel-fees.005.png)[](mailto:aggelos.kiayias@iohk.io "Email")
- ![](img/2021-02-25-babel-fees.006.png)[](tmp///www.youtube.com/watch?v=nB6eDbnkAk8 "YouTube")

![Phí Babel - xác định phí giao dịch bằng Token gốc](img/2021-02-25-babel-fees.007.jpeg)

Trong cuốn sách kinh điển The Hitchhiker's Guide to the Galaxy của Douglas Adams, [cá Babel](http://www.bbc.co.uk/cult/hitchhikers/guide/babelfish.shtml) là sinh vật cho phép bạn nghe bất kỳ ngôn ngữ nào được dịch sang tiếng mẹ đẻ của bạn. Hãy tưởng tượng bản dịch phổ quát này đảm bảo sự tương tác có ý nghĩa bất chấp có vô số ngôn ngữ khác nhau trong thiên hà.

Trong lĩnh vực tiền mã hoá, các nền tảng hợp đồng thông minh cho phép phát triển vô số Token tùy chỉnh. Bạn có thể tương tác với nền tảng bằng cách sử dụng Token ưa thích của mình không? Giá mà có một cơ chế giống như "phí Babel" để chuyển đổi Token bạn sử dụng sang cơ chế mà nền tảng yêu cầu để gửi giao dịch.

Sự khôn ngoan phổ biến trong các hệ thống blockchain cho thấy rằng việc gửi một giao dịch hợp lệ phải chịu một khoản chi phí đối với người gửi. Nếu không có sự ràng buộc như vậy thì không thể ngăn cản ai đó làm quá tải hệ thống với các giao dịch vô ích làm bão hòa dung lượng và khiến hệ thống không thể sử dụng được. Với nguyên lý trên, một hệ quả thường xảy ra là trong bất kỳ hệ thống Blockchain nào có hỗ trợ Token xác định của người dùng, sẽ bị cấm thanh toán phí giao dịch bằng các Token đó. Thay vào đó, các giao dịch phải trả một khoản phí bằng Token gốc của nền tảng được tất cả những người tham gia chấp nhận là có giá trị. Có thể cho rằng một hạn chế như vậy là không mong muốn. Nhưng làm thế nào để có thể phá vỡ lỗ hổng dường như không thể tránh khỏi như vậy?

## **Nghệ thuật của những điều có thể**

Mật mã học và lý thuyết trò chơi đã được biết đến là có thể biến những gì tưởng chừng như không thể thành có thể. Các ví dụ nổi tiếng bao gồm trao đổi quan trọng qua kênh công khai, câu đố của Merkle, và đấu giá trong đó trung thực là điều hợp lý để làm, như đấu giá của Vickrey. Vì vậy, nó cũng xuất hiện trong trường hợp này.

Trước tiên, chúng ta hãy nhớ lại cách tài sản gốc hoạt động trong Cardano: Các Token có thể được tạo theo chính sách đúc tiền và chúng được xử lý nguyên bản trong sổ cái cùng với ADA. Sổ cái của Cardano áp dụng mô hình UTXO mở rộng (EUTXO). Việc phát hành một giao dịch hợp lệ yêu cầu sử dụng một hoặc nhiều UTXO. UTXO trong Cardano không chỉ chứa ADA mà trên thực tế là một gói Token có thể chứa nhiều Token khác nhau, cả Token có thể thay thế và không thể thay thế. Bằng cách này, có thể tạo các giao dịch chuyển nhiều Token khác nhau với một UTXO duy nhất.

Phí giao dịch trong sổ cái được tính bằng ADA theo một hàm được cố định dưới dạng tham số sổ cái. Mô hình EUTXO của Cardano có một tính năng mạnh mẽ là các khoản phí cần thiết cho một giao dịch hợp lệ có thể được dự đoán chính xác trước khi gửi. Đây là một tính năng độc đáo không có trong các sổ cái khác (chẳng hạn như mô hình dựa trên tài khoản được sử dụng trong Ethereum). Thật vậy, trong trường hợp thứ hai này, phí cần thiết cho một giao dịch có thể thay đổi trong thời gian cần thiết để giao dịch được giải quyết, vì các giao dịch khác có thể ảnh hưởng đến trạng thái của sổ cái ở giữa quá trình và ảnh hưởng đến chi phí cần thiết để xử lý giao dịch.

## **Một thử nghiệm đáng suy nghĩ**

Hãy xem xét thử nghiệm đáng suy nghĩ sau đây để tiến gần hơn đến mục tiêu của chúng tôi về phí Babel. Hãy tưởng tượng rằng có thể phát hành một giao dịch tuyên bố một khoản nợ phải trả bằng ADA bằng với số phí mà người tạo giao dịch phải trả. Một giao dịch như vậy sẽ không được chấp nhận vào sổ cái. Tuy nhiên, nó có thể được coi là một đề nghị mở yêu cầu trách nhiệm được bảo hiểm. Tại sao mọi người sẽ phản hồi một đề nghị như vậy? Để thu hút phản hồi, giả sử khái niệm gói Token đã có trong Cardano, giao dịch có thể cung cấp một số lượng Token cho bất kỳ ai đảm nhận trách nhiệm. Điều này gợi ý một giao dịch giao ngay giữa ADA và (các) Token được cung cấp ở một tỷ giá hối đoái nhất định. Bây giờ hãy xem xét một nhà sản xuất Block khi thấy một giao dịch như vậy. Nhà sản xuất Block có thể tạo một giao dịch phù hợp đảm nhận trách nhiệm pháp lý bao gồm nó với ADA cũng như yêu cầu các Token được cung cấp.

Bằng cách mở rộng một cách thích hợp các quy tắc sổ cái, giao dịch với khoản nợ phải trả cũng như giao dịch khớp lệnh của nó trở nên được chấp nhận vào sổ cái như một nhóm. Do việc đảm nhận trách nhiệm, tập hợp hai giao dịch sẽ được định giá thích hợp bằng ADA. Do đó nó không phá vỡ các quy tắc ghi sổ kế toán của sổ cái về phí ADA. Kết quả là giao dịch với trách nhiệm pháp lý được giải quyết và chúng tôi đã đạt được mục tiêu của mình. Người dùng có thể gửi các giao dịch được định giá bằng bất kỳ (các) Token nào mà họ sở hữu và cung cấp cho nhà sản xuất Block sẵn sàng thực hiện giao dịch giao ngay để họ giải quyết trong sổ cái như các giao dịch thông thường!

## **Một ví dụ cụ thể**

Tất nhiên, cơ chế được điều phối dựa trên sự hiện diện của các nhà cung cấp thanh khoản sở hữu ADA và sẵn sàng đưa ra các giao dịch khớp lệnh. Trên thực tế, cơ chế tạo ra một thị trường cho các nhà cung cấp thanh khoản như vậy. Ví dụ như một nhà điều hành Pool cổ phần (SPO) có thể công bố tỷ giá hối đoái cho các Token cụ thể mà họ có thể chấp nhận được. Ví dụ: một SPO có thể tuyên bố rằng họ sẽ chấp nhận Token X với tỷ giá hối đoái 3:1 so với ADA. Sau đó, nếu một giao dịch có chi phí, chẳng hạn như 0,16 ADA, giao dịch có thể tuyên bố trách nhiệm pháp lý là 0,16 ADA cũng như cung cấp 0,48 Token X. Trong mô hình tài sản gốc của Cardano, điều này có thể được triển khai dưới dạng một UTXO duy nhất mang gói Token với đặc điểm kỹ thuật sau (ADA--&gt; -0.16, Token X --&gt; 0.48). Lưu ý dấu âm thể hiện trách nhiệm pháp lý.

Giả sử bây giờ SPO sắp sản xuất một Block. Họ khôi phục giao dịch trách nhiệm pháp lý từ Mempool và đưa ra một giao dịch khớp lệnh sử dụng UTXO cùng với khoản nợ phải trả. Giao dịch khớp lệnh chuyển 0,48 Token X sang một đầu ra mới thuộc sở hữu của SPO. Block kết quả chứa hai giao dịch theo trình tự. Giao dịch khớp lệnh cung cấp 0,16 ADA còn thiếu ngoài các khoản phí cần thiết cho chính nó. Trên thực tế, nhiều giao dịch có thể được thực hiện cùng nhau và phí của chúng được chi trả bởi một giao dịch khớp lệnh duy nhất.

![](img/2021-02-25-babel-fees.008.png)

Hình 1. Alice gửi một số lượng gồm 9 Token X cho Bob với sự hỗ trợ của Stacy là một SPO, người chi trả trách nhiệm giao dịch của Alice và nhận các Token X để trao đổi. Tỷ giá hối đoái giữa X và ADA là 3:1.

## **Thước đo giá trị mới**

SPO hoàn toàn nắm quyền lựa chọn tham gia trong quá trình trên. Mỗi SPO có thể xác định chính sách và tỷ giá hối đoái của riêng mình cũng như quyết định thay đổi tỷ giá hối đoái cho các Token khác nhau mà họ chấp nhận giao dịch giao ngay. Trên thực tế, các SPO khác nhau có thể cung cấp tỷ giá hối đoái khác nhau cho cùng một Token. Người dùng phát hành giao dịch trách nhiệm có thể cung cấp số lượng Token tương ứng với mức tối thiểu, trung bình hoặc thậm chí tối đa của tỷ giá hối đoái đã đăng trong mạng lưới. Theo cách này, sự trao đổi tự nhiên phát sinh giữa thời gian thanh toán các giao dịch trách nhiệm pháp lý và giá trị thị trường của các Token mà họ cung cấp.

Điều này minh họa cách các tài sản gốc, mô hình EUTXO và sự tinh chỉnh đơn giản nhưng hiệu quả của việc giới thiệu các khoản nợ dưới dạng giá trị âm trong các gói Token có thể đáp ứng phí Babel, cho phép người dùng định giá các giao dịch với bất kỳ Token nào được hệ thống hỗ trợ. Nó cũng cho thấy lợi thế của việc trở thành một SPO trong một hệ thống như vậy. Cần lưu ý rằng SPO không cần phải là thực thể duy nhất trong mạng lưới cung cấp để trang trải các khoản nợ. Trên thực tế, nếu muốn thì một SPO có thể dễ dàng hợp tác với một nhà cung cấp thanh khoản bên ngoài, người sẽ đưa ra các giao dịch khớp lệnh. Ngoài ra, các nhà cung cấp bên thứ ba cũng có thể hoạt động trên mạng lưới một cách độc lập và đưa ra các giao dịch khớp lệnh. Tuy nhiên, lợi ích sẽ vẫn thuộc về các nhà sản xuất Block. SPO luôn có thể chạy trước các giao dịch khớp lệnh và thay thế chúng cho các giao dịch của riêng họ nếu muốn. Đây là một trường hợp mà các giao dịch chạy trước (front-running) là một tính năng: nó giúp các SPO có thể được thanh toán bằng các Token mà họ thích cho các dịch vụ xử lý giao dịch.

Cơ chế số lượng âm trong gói Token có thể được thực hiện trong quy tắc sổ cái cơ bản của Cardano tại một số thời điểm sau khi giới thiệu tài sản gốc với Mary Hardfork. Ngoài phí Babel, cơ chế cho phép nhiều ứng dụng thú vị khác, chẳng hạn như hoán đổi nguyên tử cho các giao dịch giao ngay, mà chúng tôi sẽ đề cập trong một bài đăng Blog trong tương lai. Đó là một minh họa khác về sức mạnh của phương pháp tiếp cận của Cardano. Cardano có khả năng hỗ trợ một cộng đồng người dùng, nhà điều hành Pool cổ phần đa dạng và có tính kinh doanh.

*Tôi biết ơn Manuel Chakravarty, Michael Peyton Jones, Nikos Karagiannidis, Chad Nester và Polina Vinogradova về các cuộc thảo luận, đề xuất và nhận xét hữu ích liên quan đến khái niệm phí Babel và việc triển khai nó trong sổ cái Cardano. Chúng tôi cũng có một [Video hướng dẫn](https://youtu.be/YXaK0cvgoFQ?t=2184) về chủ đề này. Bài này được dịch bởi Nguyễn Văn Tú, Review bởi Quang Pham, biên tập bởi.... Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/02/25/babel-fees). *Dự án này được tài trợ bởi Catalyst*.*
