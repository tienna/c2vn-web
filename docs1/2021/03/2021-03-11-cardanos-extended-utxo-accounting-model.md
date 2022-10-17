# Mô hình EUTXO của Cardano hỗ trợ đa tài sản và hợp đồng thông minh

### **Cardano sử dụng mô hình kế toán sáng tạo EUTXO để hỗ trợ đa tài sản và hợp đồng thông minh. Phần đầu tiên của Blog gồm hai phần, chúng ta xem xét các hệ thống kế toán Blockchain khác nhau và tại sao EUTXO lại quan trọng**

![](img/2021-03-11-cardanos-extended-utxo-accounting-model.002.png) 11 tháng 3 năm 2021 ![](img/2021-03-11-cardanos-extended-utxo-accounting-model.002.png) [Fernando Sanchez](tmp//en/blog/authors/fernando-sanchez/page-1/) ![](img/2021-03-11-cardanos-extended-utxo-accounting-model.003.png) 5 phút đọc

![Fernando Sanchez](img/2021-03-11-cardanos-extended-utxo-accounting-model.004.png)[](tmp//en/blog/authors/fernando-sanchez/page-1/)

### [**Fernando Sanchez**](tmp//en/blog/authors/fernando-sanchez/page-1/)

Technical Writer

Marketing và Communication

- ![](img/2021-03-11-cardanos-extended-utxo-accounting-model.005.png)[](mailto:fernando.sanchez@iohk.io "E-mail")
- ![](img/2021-03-11-cardanos-extended-utxo-accounting-model.006.png)[](https://www.linkedin.com/in/linkedinsanchezf/ "LinkedIn")

![Mô hình kế toán UTXO mở rộng của Cardano - được xây dựng để hỗ trợ đa tài sản và hợp đồng thông minh](img/2021-03-11-cardanos-extended-utxo-accounting-model.007.jpeg)

Mạng lưới Blockchain là cấu trúc dữ liệu phức tạp. Các giao dịch liên tục đan xen trong chuỗi tạo ra dấu vết kỹ thuật số, yêu cầu theo dõi và quản lý cẩn thận để duy trì tính toàn vẹn và độ tin cậy của sổ cái cơ bản.

Hai sổ cái kế toán chính tồn tại trong lĩnh vực Blockchain: Blockchain dựa trên UTXO (ví dụ như Bitcoin) và dựa trên Tài khoản/Số dư (Ethereum và một số chuỗi khác).

Mỗi loại tiền mã hoá lớn này có những khác nhau cơ bản, nhưng bài viết này tập trung vào mô hình kế toán của chúng. Bitcoin sử dụng mô hình Đầu ra giao dịch chưa chi tiêu (UTXO - Unspent Transaction Output), trong khi Ethereum sử dụng mô hình Tài khoản/Số dư.

Cardano đã tìm cách kết hợp mô hình UTXO của Bitcoin với khả năng xử lý hợp đồng thông minh của Ethereum thành mô hình kế toán UTXO mở rộng (EUTXO). Việc áp dụng EUTXO tạo điều kiện thuận lợi cho việc triển khai các hợp đồng thông minh vào chuỗi Cardano.

### **Mô hình kế toán Blockchain là gì?**

Mọi công ty, doanh nghiệp hoặc tổ chức thương mại đều yêu cầu một bảng cân đối kế toán để ghi chép chính xác về lãi, lỗ, dòng tiền và các thông số khác. Bằng cách duy trì việc hạch toán cẩn thận tất cả dữ liệu, các công ty nhanh chóng có thể hình dung tình trạng tài chính tại bất kỳ thời điểm nào. Sổ cái kế toán của một công ty cung cấp một lợi thế khác: Khả năng theo dõi nguồn gốc và quyền sở hữu các khoản tiền.

Mạng lưới Blockchain cũng yêu cầu một mô hình kế toán để xác định ai sở hữu những đồng Coin nào (và sở hữu bao nhiêu), theo dõi những đồng Coin đó đi đâu, đồng nào đã được sử dụng hết và đồng nào còn khả dụng để chi tiêu.

### **Mô hình UTXO so với mô hình Tài khoản/Số dư: Tổng quan ngắn gọn**

Nhiều thập kỷ trước, kế toán sử dụng sổ cái với bút toán viết tay để ghi chép về sự luân chuyển các khoản tiền. Ngày nay, các công ty sử dụng phiên bản điện tử để làm việc tương tự. Blockchain sử dụng giao dịch như các bản ghi (giống như các mục nhập trên sổ cái) để theo dõi nguồn gốc và quyền sở hữu. Các giao dịch này chứa rất nhiều thông tin (Coin đến từ đâu, đã di chuyển đi đâu và bất kỳ thay đổi nào còn sót lại từ các giao dịch).

Dưới đây là tổng quan ngắn gọn về mô hình UTXO và mô hình Tài khoản/Số dư:

### **Mô hình UTXO**

Trong mô hình UTXO, sự di chuyển của tài sản được ghi lại dưới dạng đồ thị xoay chiều có hướng, trong đó node là các giao dịch và các cạnh là đầu ra giao dịch. Mỗi giao dịch bổ sung sẽ chi tiêu một số UTXO và tạo ra các UTXO mới. Ví của người dùng theo dõi danh sách kết quả đầu ra chưa chi tiêu được liên kết với tất cả các địa chỉ do người dùng sở hữu và tính toán số dư của người dùng.

UTXO có nhiều điểm tương tự như tiền mặt. Một ví dụ điển hình là: Hãy tưởng tượng bạn có 50 USD trong ví. Số tiền này có thể được tạo thành từ một số kết hợp như: hai tờ 20 USD và một tờ 10 USD, bốn tờ 10 USD và hai tờ 5 USD, và nhiều cách khác. Nhưng với bất kể kết hợp nào thì số tiền vẫn bằng nhau (50 USD). UTXO hoạt động theo cách tương tự. Bất kỳ số dư nào bạn có trong ví Blockchain (ví dụ như 150 Coin) có thể được tạo thành từ nhiều kết hợp UTXO khác nhau dựa trên các giao dịch trước đó, nhưng số dư vẫn giữ nguyên. Nói cách khác, số dư được lưu giữ trong một địa chỉ ví nhất định là tổng của tất cả UTXO chưa sử dụng từ các giao dịch trước đó.

### **Khái niệm 'tiền thừa' trong mô hình UTXO**

Giống như giao dịch tiền mặt trong bất kỳ cửa hàng nào, UTXO đưa ra khái niệm 'tiền thừa'. Ví dụ, khi bạn lấy ra một tờ 50 USD từ ví, bạn không thể xé tờ tiền đó thành nhiều phần nhỏ hơn để thanh toán cho một thứ có giá 15 USD. Bạn phải đưa toàn bộ tờ 50 USD và nhận tiền thừa từ nhân viên thu ngân. UTXO hoạt động theo cách tương tự. Bạn không thể 'tách' UTXO thành các Bit nhỏ hơn. UTXO được sử dụng toàn bộ và tiền thừa được trả lại cho địa chỉ ví của bạn dưới dạng UTXO nhỏ hơn.

### **Ưu điểm của mô hình UTXO**

Bằng cách kiểm tra và theo dõi kích thước, thời gian và số lượng UTXO được chuyển đi xung quanh, người ta có thể trích xuất các số liệu chính xác về việc sử dụng Blockchain và hoạt động tài chính của chuỗi.

Mô hình UTXO cung cấp các lợi thế khác. Ví dụ như khả năng mở rộng và quyền riêng tư tốt hơn. Ngoài ra, Logic giao dịch được đơn giản hóa, vì mỗi UTXO chỉ có thể được sử dụng một lần. Điều này làm cho việc xác minh giao dịch đơn giản hơn nhiều.

Tổng hợp về UTXO:

- UTXO là đầu ra của một giao dịch trước đó, có thể được sử dụng trong tương lai.
- Chuỗi UTXO không có tài khoản. Thay vào đó, Coin được lưu trữ dưới dạng danh sách UTXO và các giao dịch được tạo bằng cách sử dụng UTXO hiện có và tạo ra UTXO mới ở vị trí của chúng.
- Số dư là tổng số UTXO được kiểm soát bởi một địa chỉ nhất định.
- UTXO giống tiền mặt ở chỗ chúng sử dụng 'tiền thừa' và không thể phân tách (UTXO được sử dụng toàn bộ).

### **Mô hình Tài khoản/Số dư**

Như cái tên đã cho thấy các Blockchain triển khai mô hình kế toán Tài khoản/Số dư sử dụng tài khoản (có thể được kiểm soát bằng khóa cá nhân hoặc hợp đồng thông minh) để lưu giữ số dư Coin. Trong mô hình này, tài sản được biểu thị dưới dạng số dư trong tài khoản của người dùng. Số dư được lưu trữ dưới dạng trạng thái toàn cầu của tài khoản, được lưu giữ bởi mỗi node và được cập nhật với mọi giao dịch.

Theo nhiều khía cạnh, chuỗi Tài khoản/Số dư (giống như Ethereum) hoạt động theo cách tương tự như các tài khoản ngân hàng truyền thống. Số dư của ví tăng lên khi tiền được gửi và giảm khi tiền được chuyển đi nơi khác. Sự khác biệt quan trọng ở đây là, không giống như UTXO, bạn có thể sử dụng một phần số dư của mình. Ví dụ: nếu bạn có 100 ETH trong tài khoản, bạn có thể gửi một phần trong số đó (giả sử là 30 ETH) cho người khác. Số dư kết quả sẽ còn lại 70 ETH trong tài khoản của bạn và địa chỉ mà bạn gửi tiền đến sẽ tăng thêm 30 ETH. Khái niệm tiền thừa không áp dụng trong mô hình kế toán Tài khoản/Số dư như trong mô hình UTXO.

Tổng hợp về mô hình Tài khoản/Số dư:

- Mô hình kế toán này tương tự như cách một ngân hàng hoạt động.
- Người dùng có tài khoản lưu giữ số dư Coin của họ.
- Có thể chi tiêu một phần số dư.
- Không áp dụng khái niệm tiền thừa.

Trong phần thứ hai của phân tích này vào ngày mai, chúng ta sẽ thảo luận về cách mỗi mô hình xử lý các giao dịch, giải thích lý do phát triển mô hình EUTXO cho Cardano và cung cấp giải thích chuyên sâu về EUTXO là gì và nó hoạt động như thế nào. Bài này được dịch bởi Nguyễn Văn Tú. Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/03/11/cardanos-extended-utxo-accounting-model). *Dự án này được tài trợ bởi Catalyst*.
