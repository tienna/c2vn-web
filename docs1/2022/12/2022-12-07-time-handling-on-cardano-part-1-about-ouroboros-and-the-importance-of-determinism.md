# Xử lý thời gian trên Cardano, phần 1 Giới thiệu về Ouroboros và tầm quan trọng của Lý thuyết tất định

### **Thời gian hiện hành trên chuỗi là điều cần thiết để đảm bảo sự đồng thuận toàn cầu trong cài đặt của Blockchain. Bài đăng này giải thích cách xử lý thời gian trên Cardano**

![](img/2022-12-07-time-handling-on-cardano-part-1-about-ouroboros-and-the-importance-of-determinism.002.png) 7 tháng 12 năm 2022 ![](img/2022-12-07-time-handling-on-cardano-part-1-about-ouroboros-and-the-importance-of-determinism.002.png) [Arnaud Bailly](/en/blog/authors/arnaud-bailly/page-1/) ![](img/2022-12-07-time-handling-on-cardano-part-1-about-ouroboros-and-the-importance-of-determinism.003.png) 6 phút đọc

![Arnaud Bailly](img/2022-12-07-time-handling-on-cardano-part-1-about-ouroboros-and-the-importance-of-determinism.004.png)[](/en/blog/authors/arnaud-bailly/page-1/)

### [**Arnaud Bailly**](/en/blog/authors/arnaud-bailly/page-1/)

Technical Lead

Engineering

- ![](img/2022-12-07-time-handling-on-cardano-part-1-about-ouroboros-and-the-importance-of-determinism.005.png)[](mailto:arnaud.bailly@iohk.io "Email")
- ![](img/2022-12-07-time-handling-on-cardano-part-1-about-ouroboros-and-the-importance-of-determinism.006.png)[](https://linkedin.com/in/arnaudbailly "LinkedIn")
- ![](img/2022-12-07-time-handling-on-cardano-part-1-about-ouroboros-and-the-importance-of-determinism.007.png)[](https://twitter.com/dr_c0d3 "Twitter")
- ![](img/2022-12-07-time-handling-on-cardano-part-1-about-ouroboros-and-the-importance-of-determinism.008.png)[](https://github.com/abailly "GitHub")

![Xử lý thời gian trên Cardano, phần 1. Giới thiệu về Ouroboros và tầm quan trọng của thuyết tất định](img/2022-12-07-time-handling-on-cardano-part-1-about-ouroboros-and-the-importance-of-determinism.009.jpeg)

*Hình ảnh của Noor Younis.*

*Bài đăng trên blog này là nỗ lực hợp tác được thực hiện bởi Arnaud Bailly, Michael Peyton Jones, Sebastian Nagel, Polina Vinogradova và Brian Bush.*

Thời gian cần thiết liên quan đến mọi người tham gia trong hệ thống blockchain là cực kỳ quan trọng để hỗ trợ và duy trì các thuộc tính an toàn của giao thức đồng thuận Ouroboros. Các block được đúc dự kiến sẽ được truyền tới tất cả các node trong hệ thống một cách kịp thời, do đó, cần xây dựng một đại diện thời gian được được chấp nhận trên toàn cầu để đạt được sự đồng thuận.

## **Xử lý thời gian với Ouroboros**

Tại địa phương, một node tính toán thời gian trôi qua bằng cách sử dụng hệ thống 'đồng hồ treo tường'. Mã cho đồng hồ này rất phức tạp vì độ dài có thể thay đổi ở ranh giới hard fork, vì vậy thời gian phải được tính toán cẩn thận đến điều này.

Đoạn mã thực hiện bốn bước để lấy vị trí cục bộ hiện tại:

1. Chờ một số độ trễ tương ứng với thời gian còn lại cho đến vị trí tiếp theo hoặc độ trễ 60 giây tùy ý nếu vị trí hiện tại không xác định xảy ra khi đồng bộ hóa
2. Nhận dạng thời gian hệ thống hiện tại và dịch nó thành vị trí theo độ dài cho kỷ nguyên hiện tại
3. Nếu vị trí mới lớn hơn vị trí trước đó, nó sẽ 'đánh dấu' vào vị trí mới hiện tại.
4. Nếu điều trên không đúng, nó sẽ đợi lâu hơn một chút hoặc báo lỗi nếu thời gian hiện tại lùi quá xa.

Vị trí cục bộ hiện tại được so sánh với vị trí được báo cáo bởi hướng dẫn của node sổ cái. Nếu cái sau cũ hơn, nó sẽ bị bỏ qua vì điều này có nghĩa là node đang đồng bộ hóa trạng thái của nó với chuỗi.

Vì độ dài của vị trí có thể thay đổi tại một đợt hard fork, nên sự đồng thuận chỉ có thể chuyển đổi các vị trí theo thời gian đến một điểm cố định trong tương lai - 'cửa sổ ổn định' - trong đó không có đợt hard fork nào có thể xảy ra. Trong thực tế, cửa sổ ổn định là điều cần thiết vì nó cung cấp thước đo thời gian cần thiết để đảm bảo tính toàn diện của giao dịch và tính bất biến của trạng thái của chuỗi. Trong cửa sổ ổn định, mạng phải tạo ra ít nhất *k* block, trong đó *k* là số block mà sau đó chuỗi trở nên bất biến. Cửa sổ ổn định có thể mất tới 3 *k* /f, tức là 36 giờ với các thông số hiện tại hoặc khoảng một ngày.

## **Những thách thức hiện tại**

Có một giới hạn vật lý cơ bản đối với tốc độ mà thông tin có thể truyền đi: tốc độ ánh sáng. Điều này ngụ ý rằng việc thời gian đồng bộ hóa qua các node mạng **cần có thời gian.**

Giao thức thời gian mạng ( [NTP](https://www.newyorker.com/tech/annals-of-technology/the-thorny-problem-of-keeping-the-internets-time) ) tồn tại để cung cấp cơ chế đồng bộ hóa, giải quyết các giới hạn về thời gian và sự khác biệt về phép đo. Mặt khác, NTP không đảm bảo mức tăng đơn điệu: thời gian đôi khi có thể nhảy qua nhảy lại vài giây hoặc thậm chí vài giờ. Các hệ thống hiện có cung cấp đồng hồ chính xác và đáng tin cậy ở quy mô toàn cầu được *tập trung hóa* , chẳng hạn như đồng hồ toàn cầu do [Spanner](https://research.google/pubs/pub39966/) cung cấp chẳng hạn.

Hiện tại, trên Cardano:

1. Các tham số mạng được đặt theo cách sao cho độ chi tiết của các khoảng thời gian có thể quan sát được (ví dụ: block time) trên chuỗi là 20 giây, bằng độ dài của một vị trí (1 giây) chia cho hệ số khối f (tần số khối dự kiến, 0,05 ). Các thông số này khó có thể thay đổi trong tương lai ngắn hạn.
2. 20 giây này đã được xác định là khoảng thời tối ưu để đảm bảo an toàn của giao thức, do các ràng buộc để sao chép các giao dịch và block mới trên mạng (độ trễ TCP 300 mili giây trên toàn cầu, với hàng nghìn node). Mặc dù thông lượng block có thể tăng lên trong tương lai, nhưng không có khả năng nó sẽ làm giảm mức độ chi tiết của thời gian trên chuỗi có thể quan sát được.
3. Giao dịch cuối cùng có thể đạt được trong khoảng một ngày và *không thể* xảy ra trong *vòng chưa* đầy một ngày, theo thiết kế đồng thuận của Ouroboros. Lưu ý rằng mặc dù mức độ tin cậy cao đã đạt được trong vài phút hoặc vài giờ, xác suất của một block cuối cùng bị loại bỏ giảm theo cấp số nhân với độ sâu của nó và số lượng node phải chấp nhận block này.

Cuối cùng, về lâu dài, giao thức Ouroboros hiện tại được lên kế hoạch thay thế bằng [**Ouroboros Chronos**](https://iohk.io/en/blog/posts/2021/10/27/ouroboros-chronos-provides-the-first-high-resilience-cryptographic-time-source-based-on-blockchain/) . Ouroboros Chronos giải quyết các thách thức về thời gian bằng cách cung cấp nguồn thời gian mã hóa có độ đàn hồi cao đầu tiên dựa trên công nghệ blockchain.

## **Tầm quan trọng của tính tất định trong môi trường blockchain**

Trong bối cảnh hiện tại, thuyết tất định có nghĩa là một giao dịch nhất định có 'hiệu ứng cố định' đối với trạng thái sổ cái. Nhưng điều quan trọng là phải phân biệt giữa các khái niệm về luận tất định *lịch sử* và *tương lai* .

Các blockchain dựa trên nguyên tắc sao chép một chuỗi giao dịch cố định (được nhóm thành các block) để đạt được sự đồng thuận về trạng thái của toàn mạng lưới. Tất cả các blockchain đều có tính tất định *lịch sử* , nghĩa là các giao dịch trong chuỗi có tác động cố định, nếu không, kết quả xác thực chuỗi sẽ không mang tính tất định, điều này sẽ phá vỡ sự đồng thuận.

Nhưng một số blockchain có tính tất định *trong tương lai* , nghĩa là một giao dịch chưa được thêm vào chuỗi sẽ có tác động cố định (hoặc sẽ không áp dụng). Cardano có tính năng xác định tương lai (ngoại trừ địa chỉ con trỏ hiện tại, được đề xuất xóa trong [CIP](https://github.com/cardano-foundation/CIPs/pull/374) này). Bạn cũng có thể tìm hiểu thêm về [quyết định chi phí giao dịch của Cardano tại đây](https://docs.cardano.org/plutus/transaction-costs-determinism) .

Trên các blockchain không có tính xác định trong tương lai, người dùng không thể biết họ cần trả bao nhiêu phí gas cho các giao dịch, điều này dẫn đến việc những người dùng đó trả quá nhiều cho các giao dịch. Việc thiếu khả năng xác định trong tương lai cũng là lý do tại sao tồn tại rủi ro rằng một giao dịch trên các blockchain như vậy có thể thất bại đồng thời tiêu tốn nhiều phí gas.

### **Sức mạnh của Thuyết tất định tiềm năng**

Thuyết tất định tiềm năng là một tính năng rất mạnh mẽ của Cardano, vì nhiều lý do:

- Người dùng biết trước những gì một giao dịch sẽ thực hiện, vì vậy không có gì ngạc nhiên. Điều này đặc biệt phù hợp với các tập lệnh vì người dùng biết chính xác:
    - Các tập lệnh sẽ hoạt động như thế nào
    - Cần bao nhiêu chi phí để thực hiện.
- Các giao dịch được đề xuất có thể được xử lý song song một cách an toàn. Sự song song này là một trong những lý do cho tốc độ của Hydra.
- Bởi vì người dùng biết trước liệu một giao dịch có thất bại hay không, nên các lỗi tập lệnh có thể bị trừng phạt nghiêm khắc (vì chúng sẽ không bao giờ xảy ra với người dùng không có ác ý)
- Nhìn chung, nó làm cho việc tương tác và phát triển blockchain dễ dàng hơn và dễ dự đoán hơn.

Thuyết tất định tiềm năng của các giao dịch yêu cầu mọi phần xác thực giao dịch, bao gồm cả việc thực thi tập lệnh, là hoàn toàn xác định. Cuối cùng, đây là lý do tại sao Cardano không thể có các hoạt động không xác định trong tập lệnh.

Một trong những cách để có được thuyết tất định tiềm năng là để tác động của một giao dịch hoàn toàn được xác định bởi chính giao dịch đó và các kết quả đầu ra mà nó tham chiếu. Trong ngữ cảnh của Cardano, điều này được gọi là *quỹ tích* . Quỹ tích cũng mang lại lợi ích lớn cho người dùng vì điều đó có nghĩa là bất kỳ ai cũng có thể biết giao dịch thực hiện những gì chỉ bằng cách nhìn vào giao dịch.

*Phần thứ hai của bài đăng trên blog này sẽ thảo luận về các trường hợp sử dụng xử lý thời gian trên Cardano với Plutus, Marlowe và Hydra. 

Bài này được dịch bởi Quang Pham, Review va biên tập bởi Nguyen Hieu . Bài viết nguồn [tại đây:](https://iohk.io/en/blog/posts/2022/12/07/time-handling-on-cardano-part-1-about-ouroboros-and-the-importance-of-determinism)

Dự án này được tải trợ bới Catalyst*
