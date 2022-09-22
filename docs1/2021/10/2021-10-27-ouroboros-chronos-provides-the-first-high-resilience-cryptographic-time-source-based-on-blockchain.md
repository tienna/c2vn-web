# Ouroboros Chronos cung cấp nguồn thời gian mã hoá có khả năng phục hồi cao đầu tiên dựa trên công nghệ Blockchain

### **Được thiết kế để cung cấp thời gian hiện hành toàn cầu chính xác hơn, Chronos đảm bảo tăng cường bảo mật và khả năng phục hồi mạng lưới đối với sự truyền tải chậm trễ**

![](img/2021-10-27-ouroboros-chronos-provides-the-first-high-resilience-cryptographic-time-source-based-on-blockchain.002.png) 27 tháng 10 năm 2021 ![](img/2021-10-27-ouroboros-chronos-provides-the-first-high-resilience-cryptographic-time-source-based-on-blockchain.002.png) [Olga Hryniuk](tmp//en/blog/authors/olga-hryniuk/page-1/) ![](img/2021-10-27-ouroboros-chronos-provides-the-first-high-resilience-cryptographic-time-source-based-on-blockchain.003.png) 5 phút đọc

![Olga Hryniuk](img/2021-10-27-ouroboros-chronos-provides-the-first-high-resilience-cryptographic-time-source-based-on-blockchain.004.png)[](tmp//en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](tmp//en/blog/authors/olga-hryniuk/page-1/)

Technical Writer

Marketing &amp; Communications

- ![](img/2021-10-27-ouroboros-chronos-provides-the-first-high-resilience-cryptographic-time-source-based-on-blockchain.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2021-10-27-ouroboros-chronos-provides-the-first-high-resilience-cryptographic-time-source-based-on-blockchain.006.png)[](https://github.com/olgahryniuk "GitHub")

![Ouroboros Chronos cung cấp nguồn thời gian mã hoá có khả năng phục hồi cao đầu tiên dựa trên công nghệ Blockchain](img/2021-10-27-ouroboros-chronos-provides-the-first-high-resilience-cryptographic-time-source-based-on-blockchain.007.jpeg)

Đồng bộ hóa thời gian toàn cầu trên bất kỳ mạng lưới phân tán nào là điều cần thiết để đảm bảo khả năng phục hồi.

Từ việc đảm bảo thông tin cập nhật giữa những người tham gia đến việc duy trì quá trình xử lý giao dịch chính xác và tạo Block, đồng bộ hóa thời gian là đặc biệt quan trọng trong điều kiện triển khai Hợp đồng thông minh.

Cộng tác với các nhà khoa học từ trường Đại học Edinburgh, Purdue và Connecticut, Input Output đã tìm ra cách đồng bộ hóa đồng hồ trên toàn cầu trên một Blockchain để cung cấp nguồn thời gian toàn cầu an toàn hơn và chống giả mạo. Điều này bao gồm việc đồng bộ hóa thời gian từ các thiết bị Internet vạn vật (IoT), ví dụ như các công cụ đo lường trong chuỗi cung ứng và các hệ thống phân tán chung, đặc biệt khi sự cải tiến của đồng hồ trung tâm gây ra rủi ro bảo mật. Nghiên cứu được thực hiện là Ouroboros Chronos, từ tiếng Hy Lạp chỉ thời gian, là sự cải tiến mới nhất của Ouroboros - thuật toán đồng thuận làm nền tảng cho Cardano Blockchain.

## **Vấn đề thời gian**

Thời gian là một khái niệm không thể thiếu trong các chương trình và ứng dụng máy tính. Nếu không có khái niệm này, chúng ta sẽ không thể truy cập bất kỳ trang Web nào dựa trên bảo mật lớp truyền tải (TLS), trao đổi dữ liệu hoặc sử dụng các thuật toán bảo mật khác nhau.

Tuy nhiên, theo dõi thời gian là một vấn đề khó giải quyết. Đồng bộ hóa thời gian một cách chính xác sẽ dự đoán được việc truyền dữ liệu trên toàn bộ Internet. Điều này cũng mất thời gian. Cũng khó có thể dự đoán được sẽ cần bao nhiêu thời gian để truyền dữ liệu - trạng thái mạng lưới liên tục thay đổi và phụ thuộc vào các yếu tố như tắc nghẽn, kích thước thực của dữ liệu và các yếu tố khác. Do đó, các xung đột thường xảy ra. Điều quan trọng là phải có công cụ và giải pháp để cung cấp thời gian thực một cách chính xác.

## **Thời gian thực**

Với các máy tính thông thường, chúng ta coi thời gian thực là điều hiển nhiên. Tuy nhiên, có một cơ chế nghiêm ngặt hoạt động đằng sau hậu trường. Ví dụ: [Giao thức thời gian mạng](http://ntp.org/) (NTP) giải quyết vấn đề thời gian thực bằng cách sử dụng hệ thống phân cấp máy chủ được phân phối trên toàn cầu. Điều này bao gồm tối đa 15 lớp mà các đường dẫn định tuyến trong đó được phát triển để đồng bộ hóa theo cách tối ưu nhất. Điều này cũng được kích hoạt bằng cách sử dụng thuật toán [Bellman-Ford](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm) giúp tính toán đường đi ngắn nhất để giảm độ trễ và sự không nhất quán về thời gian truyền.

[Thời gian và vị trí dựa trên vệ tinh của Chính phủ Vương quốc Anh: Đánh giá của Blackett](https://www.gov.uk/government/publications/satellite-derived-time-and-position-blackett-review) gần đây đã nhấn mạnh nhu cầu về dữ liệu thời gian linh hoạt hơn và sự phụ thuộc nguy hiểm của các lĩnh vực quan trọng từ mạng lưới thông minh đến các phương tiện tự hành trên Hệ thống vệ tinh định vị toàn cầu (GNSS) vốn dễ bị gây nhiễu, tấn công mạng và thời tiết vũ trụ. Ngoài ra, [Trung tâm Định giờ Quốc gia](https://www.gov.uk/government/news/worlds-first-timing-centre-to-protect-uk-from-risk-of-satellite-failure) đầu tiên trên thế giới, do Phòng thí nghiệm Vật lý Quốc gia đứng đầu, gần đây đã được thành lập để nghiên cứu các dịch vụ định giờ thay thế và linh hoạt hơn cho mọi thứ từ viễn thông đến vận tải thông minh. Các trung tâm đo lường quốc tế hiện phải [so sánh các đồng hồ](https://www.npl.co.uk/time-frequency/comparison-dissemination) hoạt động ở các tần số khác nhau và ở nhiều vị trí để có độ chính xác.

## **Đồng bộ hóa thời gian Blockchain**

Khái niệm về thời gian thực là khác nhau đối với công nghệ sổ cái phân tán. Nếu không có mốc thời gian chính xác và hợp lệ, mạng lưới không thể xác minh xem giao dịch đang được xử lý có hợp lệ hay không và không trở lại giao dịch trước đó. Có các kỹ thuật ghi mốc thời gian khác nhau được sử dụng trên các sổ cái Blockchain. Tuy nhiên, chúng không nhất thiết phải cực kỳ chính xác. Ví dụ: Bitcoin sử dụng mốc thời gian vì lý do bảo mật của cơ chế đồng thuận, chứ không phải vì thời gian thực. Trong Ethereum, mốc thời gian trên chuỗi được xác định bởi những người khai thác trong khi cơ chế đồng thuận sẽ không ngăn chặn về mặt kỹ thuật hoặc xác minh tính hợp lệ của chúng.

Thời gian thực cũng cần thiết cho việc thực thi Hợp đồng thông minh. Sự thiếu chính xác gây ra rủi ro cho các cuộc tấn công Hợp đồng thông minh trong tài chính phi tập trung (DeFi). Các lỗ hổng của Hợp đồng thông minh không phải lúc nào cũng là do mã Code kém chất lượng. Sự mâu thuẫn về thời gian cần được giải quyết để ngăn chặn bất kỳ cuộc tấn công nào có thể xảy ra trong sổ cái.

## **Ouroboros Chronos được thiết kế để tăng cường khả năng giao tiếp và phục hồi thời gian**

Nghiên cứu mới về Ouroboros Chronos cho phép công nghệ Blockchain đồng bộ hóa thời gian an toàn hơn. Chronos là một giao thức Blockchain an toàn bằng mật mã, cung cấp thêm nguồn thời gian chính xác thông qua cơ chế đồng bộ hóa thời gian mới, loại bỏ các lỗ hổng của thời gian được lưu trữ bên ngoài. Điều này cũng cho phép Blockchain thực hiện các giao dịch có mốc thời gian chính xác, giúp cho sổ cái có khả năng chống lại các cuộc tấn công nhằm vào thông tin về thời gian.

Giao thức mới có thể tăng cường đáng kể khả năng phục hồi của các hệ thống viễn thông, vận tải, thương mại và cơ sở hạ tầng quan trọng bằng cách đồng bộ hóa thời gian địa phương với một  mạng lưới đồng hồ thống nhất mà không có lỗi nào.

Giáo sư Aggelos Kiayias, Giám đốc Phòng thí nghiệm Công nghệ Blockchain tại Đại học Edinburgh, Trưởng nhóm khoa học tại Input Output, người dẫn đầu việc nghiên cứu cho biết:

Vấn đề đồng bộ hóa thời gian mà không có bộ lưu thời gian trung tâm là điều cần thiết trong việc tạo ra một hệ thống tài chính phi tập trung thực sự mạnh mẽ. Lần đầu tiên, chúng tôi đã phát triển một cơ chế Blockchain cho phép một nhóm các bên đang phát triển hiệu chỉnh thời gian cục bộ của họ để chúng nhất quán - ngay cả khi họ đến và đi theo các mô hình tham gia tùy ý. Bằng cách tạo thời gian toàn cầu dựa trên Blockchain, chúng tôi cũng đã mở đường cho việc có nguồn thời gian an toàn hơn, chống giả mạo với nhiều ứng dụng bên ngoài có thể có.

Bằng cách cho phép tính thời gian chính xác và có thể truy xuất nguồn gốc đầy đủ của tất cả các giao dịch, bước đột phá khoa học cũng đánh dấu một bước quan trọng trong việc tạo ra các hệ thống tài chính hoàn toàn có thể kiểm toán và chống gian lận.

Để tìm hiểu thêm, hãy xem nghiên cứu đã xuất bản [tại đây](https://eprint.iacr.org/2019/838.pdf).

*Cảm ơn Rachel Bruce, Jenny Corlett, Rod Alexander và Christian Badertscher đã đóng góp ý kiến và hỗ trợ khi viết bài này.<br><br>Bài này được dịch bởi Nguyễn Văn Tú <a class="_active_edit_href" href="https://iohk.io/en/blog/posts/2021/10/27/ouroboros-chronos-provides-the-first-high-resilience-cryptographic-time-source-based-on-blockchain/">với bài gốc</a>.<br>*Dự án này được tài trợ bởi Catalyst**
