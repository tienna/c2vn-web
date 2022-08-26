# Atala SCAN: xác thực sản phẩm dựa trên blockchain

### **Cách một vi mạch thông minh có thể hoạt động với một blockchain tiên tiến để chống lại những kẻ làm giả sản phẩm**

![](img/2022-05-04-atala-scan-blockchain-based-product-authentication.002.png) Ngày 4 tháng 5 năm 2022![](img/2022-05-04-atala-scan-blockchain-based-product-authentication.002.png)[ Neil Burgess](/en/blog/authors/neil-burgess/page-1/)![](img/2022-05-04-atala-scan-blockchain-based-product-authentication.003.png) bài đọc6 phút

![Neil Burgess](img/2022-05-04-atala-scan-blockchain-based-product-authentication.004.png)[](/en/blog/authors/neil-burgess/page-1/)

### [**Neil Burgess**](/en/blog/authors/neil-burgess/page-1/)

Technical Writer

Marketing &amp; Communications

- ![](img/2022-05-04-atala-scan-blockchain-based-product-authentication.005.png)[](mailto:neil.burgess@iohk.io "Email")
- ![](img/2022-05-04-atala-scan-blockchain-based-product-authentication.006.png)[](https://www.linkedin.com/in/neilburgessa84482125 "LinkedIn")

![Atala SCAN: xác thực sản phẩm dựa trên blockchain](img/2022-05-04-atala-scan-blockchain-based-product-authentication.007.jpeg)

Bạn đã trả một mức giá cao cho một chai rượu mạnh cao cấp có thể sưu tầm được, nhưng vẫn luôn trong tình trạng nghi ngờ. Bạn có tin tưởng những nhà bán lẻ và tất cả những thành phần tham gia trong chuỗi cung ứng sẽ hành động một cách trung thực không?

Bạn mua một loại thuốc đắt tiền từ một hiệu thuốc trực tuyến. Bạn có chắc chắn bạn nhận được những gì bạn đã trả? Atala SCAN - hệ thống xác thực sản phẩm của IOG - có thể trả lời các câu hỏi của bạn mà không cần phải tin tưởng vào nhà bán lẻ hoặc bất kỳ ai trong chuỗi cung ứng.

Giải pháp cho vấn đề của các chai rượu mạnh nói trên là một cái tem thông minh để biết liệu nó có bị giả mạo hay không. Atala sẽ thêm vào một liên kết được mã hóa, có thể kiểm tra được giữa con tem và lịch sử sản xuất đầy đủ của chai rượu có tem dán đó. Bạn có thể kiểm tra lịch sử bằng một ứng dụng miễn phí trên điện thoại có thể xác minh được ngay tính xác thực của sản phẩm.

[Atala SCAN](https://atalascan.io/) được xây dựng trên công nghệ blockchain thế hệ thứ ba của Cardano. Phần mềm blockchain kết hợp với công nghệ 'chip cảm ứng' mang lại những lợi thế thực sự so với các phương pháp bảo mật truyền thống như niêm phong nắp, ảnh ba chiều và bao bì kỳ công - lịch sử của sản phẩm có thể được khách hàng kiểm tra ngay lập tức.

### **Vấn đề và giải pháp**

Nhu cầu cải thiện bảo mật trên các sản phẩm như rượu mạnh, mỹ phẩm, hàng thời trang và thuốc được kê đơn đang được thúc đẩy bởi cuộc chiến chống lại những kẻ làm giả đang ngày càng tinh vi hơn. Cơ quan của Liên Hợp Quốc đang điều phối cuộc chiến chống lại các nhóm tội phạm có tổ chức xuyên quốc gia, cơ quan này [mô tả vấn đề như sau](https://www.unodc.org/toc/en/crimes/counterfeit-goods.html): 'Sản xuất và buôn bán hàng giả là một vấn đề toàn cầu, gây thiệt hại nhiều tỷ đô la và là một vấn đề gây hậu quả nghiêm trọng đến kinh tế và sức khỏe cho các chính phủ, doanh nghiệp và người tiêu dùng .

[Theo Phòng Bảo hộ Bản quyền và Nhãn hiệu Hoa Kỳ (The US Patent and Trademark Office)](https://www.uspto.gov/sites/default/files/documents/USPTO-Counterfeit.pdf), quy mô của thị trường hàng giả quốc tế đã tăng gấp đôi từ 200 tỷ USD năm 2008 lên 509 tỷ USD vào năm 2019 - tương đương 2,5% của thương mại thế giới. Việc làm giả ở quy mô như vậy gây tốn kém công việc sản xuất, gây nguy hiểm cho an toàn thực phẩm và dược phẩm, đồng thời tước đi phần thưởng xứng đáng cho những nỗ lực đã bỏ ra.

Giải pháp chống tội phạm hàng giả của IOG là một hệ thống tích hợp bao gồm một con tem thông minh dựa trên một 'con chip có cánh' có thể được liên kết bằng cách chạm điện thoại thông minh vào hồ sơ sản xuất của mặt hàng. Các bản ghi được lưu giữ trong kho lưu trữ an toàn và không thể thay đổi được. Người mua có thể kiểm tra xuất xứ nhanh chóng, dễ dàng và không mất phí.

### **Con tem thông minh**

Con tem thông minh là trung tâm của hệ thống. Nó là một nhãn mỏng bằng tấm wafer kết hợp một [Chip giao tiếp cự ly gần (Near-Field Communication Chip) (NFC)](http://nearfieldcommunication.org/how-it-works.html). Nó đủ nhỏ để dán vào một sản phẩm, được tích hợp trong thẻ hoặc được nhúng vào sản phẩm hoặc bao bì của sản phẩm. Ví dụ, nó có thể là một phần của nắp chai đặc biệt hoặc được khâu vào túi xách. Bạn có thể đã thấy logo NFC trên thẻ ngân hàng. Công nghệ này cho phép các thiết bị trao đổi thông tin đơn giản bằng cách chạm hoặc đặt chúng cạnh nhau. Giống như các vi mạch được sử dụng cho chó cưng, con tem thông minh không tiêu thụ điện năng và im lặng chờ tín hiệu từ đầu đọc. Tín hiệu tạo ra một dòng điện trong ăng-ten của chip và đó là năng lượng đủ để chip truyền dữ liệu được lưu trữ của nó.

Điện thoại thông minh hiện đại kết hợp thiết bị NFC hai chiều như một tính năng tiêu chuẩn để điện thoại có thể hoạt động như một đầu đọc và một thẻ. Nexus S là thiết bị Android đầu tiên có tính năng này vào năm 2010, Apple đã thêm NFC vào iPhone vào năm 2014 - nó đã được tích hợp vào mọi phiên bản iPhone kể từ thế hệ 6.

Hầu hết các thẻ NFC chống giả mạo đều được thiết kế để ngừng hoạt động nếu bị can thiệp. Tất cả các thẻ NFC đều cần một ăng-ten để hoạt động và nếu ăng-ten đủ mỏng manh, bất kỳ hành vi giả mạo nào sẽ khiến thẻ không hoạt động. Sản phẩm NTAG được sử dụng trong các ứng dụng Atala SCAN đã giúp nó tiến thêm một bước nữa. Con chip trong thẻ có hai ăng-ten, chỉ một trong số đó được thiết kế để phá vỡ. Nếu thẻ bị can thiệp, thẻ vẫn tiếp tục hoạt động nhưng truyền tín hiệu đã được sửa đổi để làm bằng chứng cho việc giả mạo.

Atala SCAN được thực hiện tại điểm đầu tiên trong chuỗi cung ứng, nơi cung cấp thành phẩm cho chủ sở hữu thương hiệu. Hồ sơ của chủ sở hữu thương hiệu có thể bao gồm hình ảnh sản phẩm và lịch sử đầy đủ, bao gồm cả việc truy tìm từng thành phần từ điểm xuất xứ của nó. Chủ sở hữu thương hiệu quyết định thông tin nào được tiết lộ cho khách hàng thông qua chip thông minh được nhúng. Đó có thể là dữ liệu theo dõi cơ bản hoặc một phần của chiến dịch tiếp thị tiêu dùng toàn cầu. Thông tin này được liên kết với số nhận dạng duy nhất của mỗi thẻ. Các kỹ sư của Atala SCAN có thể giúp thiết lập mối liên kết này. Sau đó, thẻ được gắn hoặc được liên kết theo một cách nào đó với từng mặt hàng sản phẩm.

### **Blockchain**

Cardano là một nền tảng blockchain dành cho những người thích thay đổi, thích đổi mới và những người có tầm nhìn xa. Nó sử dụng giao thức bằng chứng cổ phần của Ouroboros để đạt được sự đồng thuận, điều này khiến nó được bảo mật trong khi chỉ tiêu thụ một phần nhỏ tài nguyên được yêu cầu so với các blockchain cũ hơn. Với Atala, mọi mặt hàng được liên kết với một nghiệp vụ duy nhất trên Cardano. Nghiệp vụ đó không thể thay đổi, nhưng có thể xem một cách dễ dàng và có thể được sử dụng như một phần của hệ thống kiểm toán. Mỗi nghiệp vụ bao gồm hàm băm mã hóa của mã nhận dạng của thẻ và các liên kết dẫn đến hệ thống siêu dữ liệu của sản phẩm. Siêu dữ liệu bao gồm cả hình ảnh được lưu trữ ngoài chuỗi.

Juan Ignacio Sierra, giám đốc dự án Atala SCAN, cho biết: 'Làm việc với blockchain đảm bảo tính bất biến của thông tin sản phẩm, nhưng nếu không có cơ chế nào để liên kết an toàn thông tin với chính sản phẩm, các sản phẩm giả mạo có thể lợi dụng thông tin của cùng một blockchain như bản gốc. Trong Atala SCAN, chúng tôi sử dụng phần cứng mã hóa bảo mật cao trong con tem để đảm bảo tính bảo mật của liên kết giữa thông tin blockchain và sản phẩm vật lý.

### **Quét mã trên điện thoại thông minh**

Nếu bạn có điện thoại thông minh, bạn có thể tải xuống ứng dụng Atala SCAN miễn phí từ cửa hàng trực tuyến có liên quan. Ứng dụng này sử dụng đầu đọc NFC của điện thoại để đọc chip và tra cứu thông tin sản phẩm trên Cardano. Chỉ cần chạm điện thoại vào sản phẩm là có thể biết ngay sản phẩm đó có phải chính hãng hay không và tìm hiểu về lịch sử của nó.

IOG đang làm việc với một số công ty về việc khởi chạy hệ thống này.

Juan Sierra cho biết: “Atala SCAN đã ra đời được một thời gian và thật thú vị khi chúng tôi có thể bắt đầu đưa đề xuất này ra thị trường. Chúng tôi đang thảo luận với một số khách hàng tiềm năng. Chúng tôi sẽ sớm có nhiều điều để chia sẻ!"

*Nếu bạn quan tâm đến việc xác thực sản phẩm với bất kỳ lý do gì, vui lòng liên hệ với IOG thông qua trang [web Atala SCAN](https://atalascan.io/), và chúng tôi sẽ rất vui được giải đáp các thắc mắc của bạn.*

*Cảm ơn Anthony Quinn và Rachel Epstein vì những đóng góp không thể thiếu của họ cho bài đăng này.<br><br><br><br>Bài này được dịch bởi Lê Nguyên. <a class="_active_edit_href" href="https://iohk.io/en/blog/posts/2022/05/04/atala-scan-blockchain-based-product-authentication/">với bài gốc</a><br><em>Dự án này được tài trợ bởi Catalyst</em>*
