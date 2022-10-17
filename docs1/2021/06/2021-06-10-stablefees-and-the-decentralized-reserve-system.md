# Phí ổn định(Stablefee) và Hệ thống dự trữ phi tập trung

### **Khám phá một cơ chế mới để giúp các khoản phí trở nên công bằng, ổn định và dễ dự đoán hơn theo thời gian**

![](img/2021-06-10-stablefees-and-the-decentralized-reserve-system.002.png) 10 tháng 6 năm 2021 ![](img/2021-06-10-stablefees-and-the-decentralized-reserve-system.002.png) [Giáo sư Aggelos Kiayias](tmp//en/blog/authors/aggelos-kiayias/page-1/) ![](img/2021-06-10-stablefees-and-the-decentralized-reserve-system.003.png) 7 phút đọc

![Prof Aggelos Kiayias](img/2021-06-10-stablefees-and-the-decentralized-reserve-system.004.png)[](tmp//en/blog/authors/aggelos-kiayias/page-1/)

### [**Prof Aggelos Kiayias**](tmp//en/blog/authors/aggelos-kiayias/page-1/)

Chief Scientist

Academic Research

- ![](img/2021-06-10-stablefees-and-the-decentralized-reserve-system.005.png)[](mailto:aggelos.kiayias@iohk.io "Email")
- ![](img/2021-06-10-stablefees-and-the-decentralized-reserve-system.006.png)[](tmp///www.youtube.com/watch?v=nB6eDbnkAk8 "YouTube")

![Phí ổn định và Hệ thống dự trữ phi tập trung](img/2021-06-10-stablefees-and-the-decentralized-reserve-system.007.jpeg)

Việc tạo điều kiện thuận lợi cho các giao dịch trong nền tảng tiền mã hóa được sử dụng với 2 mục đích. Một mặt, người dùng có thể nắm giữ và giao dịch nó như một phần của danh mục đầu tư của họ. Mặt khác, nó cung cấp nhiên liệu cần thiết để xử lý các giao dịch. Tính hai mặt này cho thấy hệ thống cần có cơ chế điều chỉnh chi phí giao dịch để chúng duy trì tính cạnh tranh và hợp lý. Ngoài ra, thông lượng giới hạn của các nền tảng phi tập trung trên một đơn vị thời gian dẫn đến một rào cản khác: hệ thống cũng phải cho phép người dùng tìm ra mức giá chính xác để xử lý giao dịch kịp thời, tùy thuộc vào nhu cầu cá nhân của họ.

Tại sao không giảm hoàn toàn phí giao dịch? Có ba lý do: Một là quá trình xử lý giao dịch phát sinh chi phí từ phía hệ thống (về tính toán và lưu trữ). Điều hợp lý là cho phép các nhà xử lý giao dịch (nhà điều hành nhóm cổ phần (SPO), trong trường hợp của Cardano) nhận được thù lao của họ. Thứ hai, ngay cả với khả năng vô hạn về mặt lý thuyết, điều quan trọng là phải ngăn các tổ chức phát sinh các giao dịch vô nghĩa gây bão hòa mạng lưới . Thứ ba, khuyến khích những người xử lý giao dịch cung cấp chất lượng dịch vụ phù hợp. Nhu cầu tăng đột biến sẽ ảnh hưởng đến thù lao được nhận của họ.

Thêm vào một khoản phí cho mỗi giao dịch có thể giải quyết các vấn đề trên.

### **Bitcoin và xa hơn thế.**

Bitcoin đặt ra cơ chế đầu tiên để định giá các giao dịch trong nền tảng sổ cái phân tán. Cơ chế này giống như đấu giá theo mức giá đầu tiên: các giao dịch đặt giá thầu cho một vị trí trong một block đặt tên cho một phần thưởng cụ thể và các nhà sản xuất block chọn các giao dịch mà họ muốn đưa vào. Các nhà sản xuất block cũng được thưởng bằng quyền đúc tiền mới, tức là, hoạt động của họ được cả cộng đồng trợ cấp thông qua lạm phát của tổng nguồn cung tiền. Lạm phát giảm về mặt hình học theo thời gian và phí giao dịch ngày càng chiếm nhiều hơn trong phần thưởng. Cơ chế này, trong khi cho phép Bitcoin hoạt động tốt trong hơn một thập kỷ, đã bị chỉ trích vì tính kém hiệu quả của nó. Chi phí giao dịch cũng đã tăng lên theo thời gian.

Trong bài đăng trên blog này, chúng tôi khám phá một cơ chế mới dựa trên cách tiếp cận của Cardano đối với các quy tắc sổ cái và tài sản hệ thống, đồng thời bổ sung cho khái niệm [phí Babel](https://iohk.io/en/blog/posts/2021/02/25/babel-fees/) . Mục tiêu là làm cho phí công bằng, ổn định và có thể dự đoán được theo thời gian. Chúng tôi mô tả cơ chế trong bối cảnh của Cardano. Tuy nhiên, nó có thể được điều chỉnh cho phù hợp với bất kỳ loại tiền mã hóa nào khác có đặc điểm tương tự.

### **Giới thiệu phí ổn định (Stablefees)**

Ý tưởng cốt lõi đằng sau Stablefees là có giá cơ bản cho các giao dịch thông qua việc neo vào một rổ hàng hóa hoặc tiền tệ. Stablefees bao gồm một hợp đồng "dự trữ phi tập trung" ban đầu phát hành và quản lý một stablecoin được gắn vào rổ. Một so sánh trong thế giới fiat có thể là [SDR](https://www.imf.org/en/About/Factsheets/Sheets/2016/08/01/14/51/Special-Drawing-Right-SDR) của Quỹ Tiền tệ Quốc tế, (được thành lập vào năm 1969) và được định giá dựa trên một rổ gồm 5 loại tiền tệ là đô la Mỹ, đồng euro, đồng nhân dân tệ của Trung Quốc, đồng yên Nhật và Đồng bảng Anh. Stablecoin --- hãy gọi nó là "rổ chứa đồng tiền tương đương" (BEC) --- là đơn vị tiền tệ được sử dụng để thanh toán phí giao dịch (và tất cả các nhu cầu định giá trong thế giới thực khác của nền tảng, ví dụ: chi phí SPO).

Trong hệ thống này, ada sẽ đóng một vai trò kép: Tài sản dự trữ của quỹ dự trữ phi tập trung và tiền thưởng cho việc staking. Nó cũng sẽ là đồng tiền dự phòng trong các tình huống cực đoan khi hợp đồng dự trữ gặp khó khăn về thanh khoản. Trước khi giao dịch, tổ chức phát hành sẽ phải có được BEC, thông qua các bên thứ ba khác hoặc trực tiếp bằng cách gửi ada đến hợp đồng dự trữ phi tập trung. Cơ sở phát hành BECs dự trữ là gì? Hợp đồng dự trữ sẽ phát hành cổ phiếu vốn cổ phần - chúng tôi sẽ gọi chúng là đồng tiền cổ phần phi tập trung (DEC) -, để đổi lấy ada. Tận dụng giá trị của DEC, quỹ dự trữ phi tập trung thường sẽ điều chỉnh giá trị của BEC để nó được chốt trên rổ hàng hóa cơ bản. Nói cách khác, DEC sẽ hấp thụ các biến động của ada so với rổ để đảm bảo rằng giá trị trong thế giới thực của BEC vẫn ổn định (xem [thiết kế stablecoin AgeUSD](https://github.com/Emurgo/age-usd) đã được [triển khai và sử dụng trên Ergo](https://sigmausd.io/#/) ).

Bộ ba đồng tiền chung này, được phát hành nguyên bản bởi hệ thống, sẽ thu hút các nhóm người dùng khác nhau. Tính ổn định và tính thanh khoản của BEC có thể hấp dẫn đối với những người sở hữu nhiều giao dịch, không thích rủi ro. DEC sẽ đưa ra phần thưởng cao nhất nếu giá ada tăng, nhưng cũng nhận được phần thưởng đáng kể nhất khi giá ada giảm. Những người nắm giữ dài hạn có thể thấy DEC hấp dẫn hơn. Ngoài ra, vì giá dự trữ phi tập trung của các đồng tiền này theo ada, cả BEC và DEC đều có thể tạo điều kiện thuận lợi cho việc tham gia staking và quản trị. Lợi nhuận có thể được phát hành với tỷ lệ khác nhau, phản ánh bản chất khác nhau của mỗi đồng. Cuối cùng, phần thưởng sẽ luôn được định giá và thanh toán bằng ada, sẽ vẫn là loại tiền linh hoạt nhất trong cả ba loại trên.

### **Oracles**

Trọng tâm của cơ chế này là một oracles trên chuỗi ( on-chain) xác định giá của rổ bằng ADA. Các SPO có thể tích hợp oracles này theo cách phi tập trung. Quỹ dự trữ có thể cung cấp thêm phần thưởng cho tất cả những người đóng góp oracle từ phí thu được trong các đợt phát hành BEC / DEC. Điều này sẽ đảm bảo hai điều: hàng nghìn người từ nhiều nơi khác nhau cùng đóng góp  và các quy tắc sổ cái tính toán tỷ giá hối đoái tổng hợp theo một số quy chuẩn (ví dụ: thông qua trung bình có trọng số trên tất cả các lần gửi giá trong một epoch). Nếu những người đóng góp oracle thao túng những đóng góp của họ, họ có thể phải chịu trách nhiệm bằng cách bị giữ lại phần thưởng nhờ hình thức theo dõi danh tiếng và hiệu suất của họ trên chuỗi.

### **Cơ chế định giá**

Làm thế nào để giao dịch một giá và thưởng cho các nhà sản xuất block? Sử dụng cách tiếp cận hiện tại trong Cardano, mỗi giao dịch sẽ được ánh xạ một cách xác định đến một giá trị chính xác được tính bằng BEC, sử dụng công thức được xác định bởi các quy tắc sổ cái. Công thức sẽ tính đến cả quy mô giao dịch và các yêu cầu tính toán của nó và cũng có thể kết hợp các chỉ số thời gian chạy (chẳng hạn như giá trị trung bình hệ thống tải). Giá trị thu được sẽ là phí cơ bản đảm bảo rằng giao dịch sẽ được hệ thống xử lý. Với mức phí cơ bản, người dùng cuối sẽ có thể áp dụng hệ số nhân nếu họ muốn (sẽ là giá trị ít nhất là 1, ví dụ: 1,5x, 3x, v.v.) để tăng phí và đẩy nhanh quá trình xử lý. Điều này là phù hợp vào thời điểm nhu cầu tăng cao.

Cách tiếp cận này có một ưu điểm khi so sánh với mô hình đấu giá theo mức giá thứ nhất: cơ chế định giá liên tục được ổn định đến một giá trị mặc định hợp lý. Người dùng chỉ thực hiện khám phá giá theo một hướng để tăng tốc quá trình xử lý, nếu được yêu cầu. Ngoài ra, các tổ chức phát hành giao dịch có thể lưu trữ BEC để đảm bảo khả năng phát hành giao dịch trong tương lai của họ mà không bị ảnh hưởng bởi sự biến động giá ADA.

### **Phí ổn định và phí Babel (Stablefees and Babel fees)**

Cơ chế Stablefees có thể được coi là một phần mở rộng tự nhiên của [phí Babel](https://iohk.io/en/blog/posts/2021/02/25/babel-fees/) --- chuyển đổi ngay BEC thành ADA bằng nguồn dự trữ phi tập trung. Cả hai cơ chế bổ sung (và tương thích) lẫn nhau. Phí Babel có thể được triển khai cùng với Stablefees chỉ với một thay đổi: Sử dụng BEC để thanh toán các khoản nợ phí Babel, thay vì ADA. Điều này cũng có nghĩa là phí sẽ luôn được thanh toán bằng ADA (thông qua khoản phí Babel có thể chuyển đổi được theo ADA ngay lập tức). Do đó, toàn bộ cơ chế tương thích ngược: nó sẽ không ảnh hưởng đến những người dùng không thường xuyên, những người chỉ giữ ADA và không muốn lấy BEC.

Một điểm cuối cùng về sự đa dạng. Trong khi câu truyện nêu trên xác định một BEC toàn cầu và duy nhất, cơ chế tương tự có thể được sử dụng để phát hành các BEC khu vực được gắn với các rổ hàng hóa khác nhau, có thể có trọng số khác nhau. Các BEC khu vực như vậy sẽ có thể tăng tính toàn diện của hệ thống, đồng thời cho phép các SPO có các chính sách chi tiết hơn về giao dịch.

### **Phí ổn định 'lite'**

Cơ chế trên yêu cầu một hợp đồng dự trữ phi tập trung và việc phát hành BEC và DEC theo hợp đồng cho người mua. Một phiên bản "lite" tránh hợp đồng dự trữ và điều chỉnh trực tiếp công thức tính phí bằng cách gắn nó vào rổ hàng hoá đã thoả thuận thông qua oracle về giá. Hệ thống kết quả quy định phí giao dịch trên danh nghĩa bằng BEC và ngay lập tức chuyển đổi chúng thành ADA. Số tiền phải trả dao động, tùy thuộc vào giá trị của BEC. Về mặt khác, cơ chế này giống hệt nhau, cũng tạo điều kiện thuận lợi cho việc khám phá giá một chiều thông qua hệ số nhân. Điểm bất lợi duy nhất là nhà phát hành giao dịch tiềm năng không có quyền truy cập vào token gốc cho phép xử lý giao dịch có thể dự đoán được; người phát hành giao dịch phải trả phí theo ADA. Tuy nhiên, phí sẽ liên tục điều chỉnh và duy trì ổn định thông qua cơ chế neo đối với rổ. Do đó, công ty phát hành giao dịch sẽ có thể tổ chức danh mục tài sản ngoài chuỗi của họ để đáp ứng nhu cầu giao dịch của họ một cách hiệu quả.

### **Công việc tiếp theo**

Nhóm của chúng tôi hiện đang nghiên cứu các chi tiết cụ thể của cơ chế Stablefees. Sau khi nghiên cứu này hoàn tất, Stablefees có thể được tích hợp vào Cardano để đưa ra giá giao dịch công bằng và có thể dự đoán được. Hơn nữa, oracle về giá  và BEC toàn cầu (và các biến thể khu vực, nếu được bao gồm) chắc chắn sẽ tìm thấy các công dụng ngoài việc trả phí giao dịch, mở rộng khả năng của các ứng dụng phi tập trung trong hệ sinh thái Cardano. 

Bài này được dịch bởi LinhPool, Review bởi Quang Pham và biên tập bởi Nguyễn Hiệu.
Nguồn bài dịch [tại đây](https://iohk.io/en/blog/posts/2021/06/10/stablefees-and-the-decentralized-reserve-system/) 

*Dự án này được tài trợ bới Catalyst*
