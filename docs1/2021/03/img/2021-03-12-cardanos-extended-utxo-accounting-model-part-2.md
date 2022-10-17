# Mô hình kế toán EUTXO của Cardano hỗ trợ đa tài sản và hợp đồng thông minh (phần 2)

### **Trong phần thứ hai của Blog về mô hình kế toán EUTXO của Cardano, chúng ta xem xét hơn về kỹ thuật của các thành phần giao dịch, bộ UTXO và nghiên cứu sâu hơn về cơ sở lý luận cho mô hình EUTXO.**

![](img/2021-03-12-cardanos-extended-utxo-accounting-model-part-2.002.png) 12 tháng 3 năm 2021 ![](img/2021-03-12-cardanos-extended-utxo-accounting-model-part-2.002.png) [Fernando Sanchez](tmp//en/blog/authors/fernando-sanchez/page-1/) ![](img/2021-03-12-cardanos-extended-utxo-accounting-model-part-2.003.png) 5 phút đọc

![Fernando Sanchez](img/2021-03-12-cardanos-extended-utxo-accounting-model-part-2.004.png)[](tmp//en/blog/authors/fernando-sanchez/page-1/)

### [**Fernando Sanchez**](tmp//en/blog/authors/fernando-sanchez/page-1/)

Technical Writer

Marketing &amp; Communication

- ![](img/2021-03-12-cardanos-extended-utxo-accounting-model-part-2.005.png)[](mailto:fernando.sanchez@iohk.io "Email")
- ![](img/2021-03-12-cardanos-extended-utxo-accounting-model-part-2.006.png)[](https://www.linkedin.com/in/linkedinsanchezf/ "LinkedIn")

![Mô hình kế toán UTXO mở rộng của Cardano - được xây dựng để hỗ trợ đa tài sản và hợp đồng thông minh (phần 2)](img/2021-03-12-cardanos-extended-utxo-accounting-model-part-2.007.jpeg)

Hôm qua, chúng tôi đã cung cấp một [cái nhìn tổng quan về](https://iohk.io/en/blog/posts/2021/03/11/cardanos-extended-utxo-accounting-model/) mô hình UTXO mở rộng mà Cardano sử dụng, giải thích sự khác nhau trong cách tiếp cận so với Bitcoin và Ethereum. Bây giờ chúng ta hãy đi sâu hơn về đầu vào và đầu ra, các bộ phận cấu thành của một giao dịch.

### **Chúng tôi cần nói về các giao dịch: Đầu ra và Đầu vào**

Thuật ngữ *giao dịch* thường gợi lên tiếng vang về tài chính. Mặc dù ý nghĩa như vậy sẽ áp dụng cho Bitcoin (vì Bitcoin Blockchain được sử dụng để chuyển tiền giữa các node ngang hàng), nhiều Blockchain khác (bao gồm cả Cardano) linh hoạt hơn nhiều. Trong những trường hợp này, thuật ngữ 'giao dịch' mang nhiều sắc thái hơn. Người ta có thể coi các giao dịch là sự chuyển giao giá trị.

Trong môi trường Blockchain, mỗi giao dịch có thể có một hoặc nhiều đầu vào và đầu ra. Khái niệm về **Đầu vào** và **Đầu ra** phải được hiểu rõ nếu chúng ta muốn hiểu cách hoạt động của một giao dịch và nó liên quan đến UTXO như thế nào. Nói một cách tóm lược, hãy nghĩ về một giao dịch như *một hành động mở khóa các đầu ra trước đó và tạo đầu ra mới*.

**Đầu ra của giao dịch**

Đầu ra giao dịch bao gồm một địa chỉ (mà bạn có thể coi là một khóa) và một giá trị. Để phù hợp với sự giống nhau này, chữ ký thuộc địa chỉ là chìa khóa để mở khóa đầu ra. Sau khi mở khóa, một đầu ra có thể được sử dụng làm đầu vào. Giao dịch mới chi tiêu đầu ra của giao dịch trước đó và tạo đầu ra mới, có thể được sử dụng bởi các giao dịch trong tương lai. Mỗi UTXO chỉ có thể được chi tiêu một lần và phải chi tiêu toàn bộ. Mỗi đầu ra có thể được chi tiêu bởi chính xác một *và chỉ một đầu vào.*

**Đầu vào của giao dịch**

Đầu vào giao dịch là đầu ra của giao dịch trước đó. Đầu vào giao dịch bao gồm một con trỏ (Pointer) và một chữ ký đã được mã hoá đóng vai trò là chìa khóa mở khóa. Con trỏ trỏ trở lại đầu ra giao dịch trước đó và chìa khóa sẽ mở khoá đầu ra này. Khi một đầu ra được mở khóa bởi một đầu vào, Blockchain sẽ đánh dấu đầu ra được mở khóa là “đã chi tiêu”. Các đầu ra mới được tạo ra bởi một giao dịch nhất định sau đó có thể được trỏ đến bởi các đầu vào mới. Vì vậy, chuỗi sẽ tiếp tục. Các đầu ra mới này (chưa được mở khóa, tức là chưa chi tiêu) là UTXO. **Đầu ra chưa chi tiêu chỉ đơn giản là đầu ra chưa được chi tiêu**.

### **Tóm lược cách UTXO hoạt động**

Trong mô hình kế toán UTXO, giao dịch sử dụng đầu ra chưa chi tiêu từ giao dịch trước đó và tạo đầu ra mới, có thể được sử dụng làm đầu vào cho các giao dịch trong tương lai.

![](img/2021-03-12-cardanos-extended-utxo-accounting-model-part-2.008.png)

Ví của người dùng quản lý các UTXO này và bắt đầu các giao dịch liên quan đến các UTXO do người dùng sở hữu. Mọi node Blockchain luôn duy trì một bản ghi về tập hợp con của tất cả UTXO. Đây được gọi là *bộ UTXO*. Về mặt kỹ thuật, đây là *trạng thái chuỗi * được lưu trữ trong thư mục dữ liệu của mọi node. Khi một Block mới được thêm vào chuỗi, trạng thái chuỗi sẽ được cập nhật tương ứng. Block mới chứa danh sách các giao dịch mới nhất (tất nhiên bao gồm cả bản ghi của các UTXO đã chi tiêu và các giao dịch mới được tạo kể từ khi trạng thái chuỗi được cập nhật lần cuối). Mỗi node duy trì một bản sao chính xác của trạng thái chuỗi.

### **EUTXO: Lý do đằng sau sự lựa chọn của Cardano**

Mô hình kế toán UTXO 'đơn giản' của Bitcoin sẽ không phù hợp với Cardano, vì Cardano được thiết kế để làm nhiều việc hơn là chỉ xử lý các khoản thanh toán. Đặc biệt, nhu cầu về khả năng biểu đạt trong lập trình nhiều hơn cho chức năng hợp đồng thông minh sắp tới trong kỷ nguyên Alonzo đòi hỏi một giải pháp ('Mở rộng') mới.

Mô hình UTXO 'cơ bản' có hạn chế về khả năng lập trình. Mô hình kế toán Tài khoản/Số dư của Ethereum đã giải quyết vấn đề cụ thể này với sự phát triển của sổ cái dựa trên tài khoản và các tài khoản hợp đồng được liên kết. Nhưng bằng cách làm như vậy, ngữ nghĩa của mã Code hợp đồng trở nên phức tạp hơn nhiều. Tác động không mong muốn của điều này là buộc người tạo hợp đồng phải nắm bắt đầy đủ các sắc thái của ngữ nghĩa để tránh tạo ra các lỗ hổng tiềm ẩn gây ra sự tốn kém trong mã Code.

Giải pháp UTXO 'mở rộng' sẽ yêu cầu hai phần chức năng bổ sung mà mô hình UTXO hiện tại không thể cung cấp:

1 - Để có thể duy trì trạng thái hợp đồng.

2 - Trong quá trình thực thi, một mã Code hợp đồng có thể được sử dụng trong toàn bộ chuỗi giao dịch. Chúng tôi gọi là sự liên tục.

Một tính năng mạnh mẽ của mô hình EUTXO là các khoản phí cần thiết cho một giao dịch hợp lệ có thể được dự đoán chính xác trước khi gửi. Đây là một tính năng độc đáo mà mô hình dựa trên tài khoản không có.

### **Làm thế nào để mô hình EUTXO mở rộng UTXO?**

Bằng cách thêm dữ liệu tùy chỉnh vào đầu ra (ngoài giá trị), và bằng cách cho phép thêm "khóa" và "chìa khóa" sẽ quyết định dựa theo điều kiện nào mà đầu ra có thể được mở khóa để chi tiêu bằng một giao dịch. Nói cách khác, thay vì chỉ có khóa công khai (Hash) cho khóa và chữ ký tương ứng đóng vai trò là "khóa", EUTXO cho phép Logic tùy ý dưới dạng tập lệnh. Logic tùy ý này kiểm tra giao dịch và dữ liệu để quyết định xem giao dịch có được phép sử dụng đầu vào hay không.

### **Kết luận: Điều gì làm cho mô hình EUTXO sáng tạo và phù hợp**

Mô hình sổ cái của Cardano mở rộng mô hình UTXO để hỗ trợ đa tài sản và hợp đồng thông minh mà không ảnh hưởng đến các lợi thế quan trọng của mô hình UTXO. Nghiên cứu sáng tạo của chúng tôi cung cấp chức năng vượt xa những gì được hỗ trợ trong bất kỳ sổ cái UTXO nào khác, biến Cardano trở thành đối thủ cạnh tranh duy nhất trong lĩnh vực Blockchain thế hệ tiếp theo. Bài này được dịch bởi Nguyễn Văn Tú. review bởi tienna. Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/03/12/cardanos-extended-utxo-accounting-model-part-2). *Dự án này được tài trợ bởi Catalyst*.
