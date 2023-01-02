# Xử lý thời gian trên Cardano, phần 2: Các trường hợp sử dụng

### **Cách Plutus, Marlowe và Hydra giải quyết vấn đề về thời gian trên Cardano**

![](img/2022-12-08-time-handling-on-cardano-part-2-use-cases.002.png) 8 tháng 12 năm 2022 ![](img/2022-12-08-time-handling-on-cardano-part-2-use-cases.002.png) [Arnaud Bailly](/en/blog/authors/arnaud-bailly/page-1/) ![](img/2022-12-08-time-handling-on-cardano-part-2-use-cases.003.png) 6 phút đọc

![Arnaud Bailly](img/2022-12-08-time-handling-on-cardano-part-2-use-cases.004.png)[](/en/blog/authors/arnaud-bailly/page-1/)

### [**Arnaud Bailly**](/en/blog/authors/arnaud-bailly/page-1/)

Technical Lead

Engineering

- ![](img/2022-12-08-time-handling-on-cardano-part-2-use-cases.005.png)[](mailto:arnaud.bailly@iohk.io "Email")
- ![](img/2022-12-08-time-handling-on-cardano-part-2-use-cases.006.png)[](https://linkedin.com/in/arnaudbailly "LinkedIn")
- ![](img/2022-12-08-time-handling-on-cardano-part-2-use-cases.007.png)[](https://twitter.com/dr_c0d3 "Twitter")
- ![](img/2022-12-08-time-handling-on-cardano-part-2-use-cases.008.png)[](https://github.com/abailly "GitHub")

![Xử lý thời gian trên Cardano, phần 2: Các trường hợp sử dụng](img/2022-12-08-time-handling-on-cardano-part-2-use-cases.009.jpeg)

*Bài đăng trên blog này được viết bởi Arnaud Bailly, Michael Peyton Jones, Sebastian Nagel, Polina Vinogradova và Brian Bush.*

Bài [đăng trước](https://iohk.io/en/blog/posts/2022/12/07/time-handling-on-cardano-part-1-about-ouroboros-and-the-importance-of-determinism/) đã thảo luận về cách Ouroboros xử lý thời gian trên Cardano và giải thích tầm quan trọng của thuyết Tất định. Dưới đây là thông tin thêm về các trường hợp sử dụng cụ thể về thời gian trên Cardano.

## **Các tập lệnh Plutus xử lý thời gian như thế nào?**

Các tập lệnh Plutus có quyền truy cập vào phạm vi hiệu lực của giao dịch, do người tạo ra nó xác định. Khi xác định phạm vi hiệu lực, người tạo có thể quyết định rằng giao dịch hợp lệ từ vị trí X đến vị trí Y hoặc không xác định một hoặc cả hai giới hạn. Điều này đặt ra các ràng buộc về vị trí mà một giao dịch có thể được đưa vào, điều này rất hữu ích trên chuỗi để xác định các 'hợp đồng' khác nhau.

Tập lệnh có thể cho rằng thời gian xác thực thực tế nằm trong phạm vi này. Nếu không, giao dịch sẽ không thành công trong [giai đoạn 1](https://iohk.io/en/blog/posts/2021/09/07/no-surprises-transaction-validation-part-2/) trước khi thực thi tập lệnh. Điều này đảm bảo tính xác định vì tập lệnh sẽ *luôn* nhìn thấy cùng một phần thông tin (phạm vi hợp lệ) bất kể thời điểm tập lệnh được xác thực, vì vậy hành vi sẽ giống nhau.

Các giới hạn của khoảng thời gian hiệu lực được thể hiện theo thời gian thực (POSIXTime), thay vì các vị trí và việc chuyển đổi từ các vị trí sang thời gian thực được thực hiện theo sự đồng thuận, như đã thảo luận trong bài đăng trước. Việc sử dụng thời gian thực thay vì các vị trí rất quan trọng vì độ dài của vị trí có thể thay đổi tại một hard fork, do đó, các giả định dựa trên việc đếm các vị trí thường không đáng tin cậy. Thực tế là các tập lệnh nhìn thấy phạm vi hợp lệ cho phép các tập lệnh đưa ra các xác nhận như "thời gian hiện tại là trước/sau một khoảng thời gian nhất định", nhưng nó không cho phép một tập lệnh đưa ra bất kỳ loại xác nhận nào khác ('lần thứ hai trong đó giao dịch này được xác thực là chẵn', chẳng hạn.)

Trong thiết kế ban đầu của Alonzo, phạm vi hiệu lực bao gồm tất cả các cách sử dụng thời gian đã biết, đồng thời phù hợp gọn gàng với trường thời gian tồn tại (TTL) hiện có. Về lý thuyết, có thể áp dụng các nguyên tắc tương tự cho các loại xác nhận khác, chẳng hạn - hãy để tập lệnh dựa trên các xác nhận được kiểm tra trong giai đoạn 1. Tuy nhiên, điều này sẽ không dễ dàng vì nó hàm ý những thay đổi sâu sắc về cấu trúc đối với các phần khác nhau của mạng Cardano. Và bởi vì các kiểm tra ở giai đoạn 1 cần phải hợp lệ đối với mọi node trên mạng, nên điều này ngăn cản mọi loại xác nhận phụ thuộc vào một số điều kiện cục bộ, chẳng hạn như 'Thời gian hiện tại'.

## **Các trường hợp sử dụng cho thời gian**

Thời gian có các ứng dụng khác nhau trong hệ sinh thái Cardano.

### **Hydra**

Giao thức Hydra phụ thuộc vào thời gian để tính toán và thực thi thời hạn tranh chấp, đây là một phần quan trọng trong cơ chế an toàn của giao thức. Máy trạng thái Hydra Head theo dõi thời gian trôi qua bằng UTCTime nhưng dấu tích đến từ chuỗi, dựa trên số vị trí quan sát được từ các block do chuỗi tạo ra. Lý do sử dụng UTCTime để giải quyết các hạn chế cố hữu trong chuyển đổi theo thời gian mà áp đặt thời hạn hợp lệ. Người ta không thể chuyển đổi một vị trí quá xa trong tương lai, điều đó có nghĩa là việc sử dụng UTCTime ngoài chuỗi sẽ đơn giản hơn và chỉ thực hiện chuyển đổi khi gửi/nhận giao dịch đến hoặc từ chuỗi.

Điều này ngụ ý rằng độ chi tiết đánh dấu là khoảng 20 giây, vì đây là tần suất dự kiến mà các block được tạo ra. Sử dụng thước đo thời gian này, Hydra sẵn sàng phản ứng với việc vượt qua thời hạn tranh chấp liên quan đến giao thức.

Điều quan trọng là thời gian cục bộ trong Hydra Head (và các node) được gắn với thời gian trên chuỗi do Ouroboros xử lý (xem [phần 1](https://iohk.io/en/blog/posts/2022/12/07/time-handling-on-cardano-part-1-about-ouroboros-and-the-importance-of-determinism/) để biết thêm chi tiết). Vì Hydra là một giao thức đẳng cấu nên nên xử lý 'giao dịch theo thời gian' trên layer 2 (xem [vấn đề #196](https://github.com/input-output-hk/hydra-poc/issues/196) ). Tuy nhiên, Hydra không tạo ra các block, vì vậy bản thân sự đồng thuận không cần khái niệm về thời gian .

Điều này đòi hỏi sự hiểu biết về độ chính xác và quy trình rời rạc hóa thời gian trên sổ cái layer 2. Mặc dù sự phức tạp của thời gian xử lý trên chuỗi cũng áp dụng cho layer 2, nhưng layer 2 có thể cung cấp các giải pháp tốt hơn vì các mạng như vậy nhỏ hơn nhiều, có tuổi thọ ngắn hơn và không cần mở rộng quy mô toàn cầu.

Nếu bạn muốn tham gia vào các cuộc thảo luận và chia sẻ các loại ứng dụng bạn có và thời gian giải quyết chúng, hãy tham gia [kênh Hydra Discord này](https://discord.com/channels/826816523368005654/890903732462710836/890951034099335178) .

### **Marlowe**

Marlowe là một ngôn ngữ dành riêng cho miền (DSL) để viết các hợp đồng giao dịch về tài chính, gần như tất cả đều liên quan đến thời gian. Nhiều loại hợp đồng tài chính tiêu chuẩn đã được viết bằng Marlowe, bao gồm hầu hết các hợp đồng tiêu chuẩn [ACTUS](https://www.actusfrf.org/) (ví dụ: cho vay, hoán đổi, quyền chọn và các công cụ phái sinh). Hơn nữa, Marlowe hỗ trợ nhiều loại hợp đồng phi tài chính như đấu giá, hoán đổi token và thậm chí cả trò chơi. Các cơ chế hiện có của Cardano để làm việc với thời gian phù hợp độc đáo với ngữ nghĩa của Marlowe và cung cấp cho các giao dịch Marlowe tính địa phương và tính quyết định được kế thừa từ Plutus.

Ở Marlowe, thời gian của hợp đồng thường xuất hiện trong thời hạn và thời gian chờ hạn chế cách thức thực hiện hợp đồng và điều này hoạt động hoàn hảo với khoảng thời gian hiệu lực của Cardano. Ví dụ, logic thời gian chờ là cần thiết trong hợp đồng cho vay, để xử lý tình huống khi khoản vay bị bỏ lỡ: khi đó logic khác cần được thực hiện để áp dụng hình phạt, điều chỉnh lịch thanh toán trong tương lai, v.v. Hợp đồng cũng có thể sử dụng trực tiếp các điểm cuối thời gian của khoảng thời gian hiệu lực trong các tính toán, có lẽ để điều chỉnh số tiền thanh toán trong tương lai dựa trên thời điểm nhận được khoản thanh toán sớm. Thực tế là thời gian xuất hiện dưới dạng khoảng thời gian có ít tác động thực tế đối với Marlowe vì khoảng thời gian có thể ngắn bằng thời gian tính từ khi gửi giao dịch đến khi giao dịch xuất hiện trong một block trên mạng Cardano - chỉ vài phút.

## **Các giải pháp**

Cardano có khả năng cung cấp dữ liệu liên quan đến thời gian chính xác hơn trong quá trình xác thực giao dịch, chẳng hạn như dấu thời gian từ nhà sản xuất block mà tại đó block được đúc, được chuyển đổi từ vị trí của nó hoặc thậm chí là dấu thời gian thực tế trong UTC với độ chính xác đến mili giây. Tuy nhiên, điều này sẽ *phá vỡ tính tất định trong tương lai* (xem [phần 1](https://iohk.io/en/blog/posts/2022/12/07/time-handling-on-cardano-part-1-about-ouroboros-and-the-importance-of-determinism/) ) giống như trên các giao thức không bao gồm tính năng này: người dùng không còn có thể biết liệu một giao dịch có chắc chắn được áp dụng vào sổ cái hay không, bởi vì điều đó sẽ phụ thuộc vào dấu thời gian chính xác mà nhà sản xuất block đã sử dụng khi tạo block.

Một tùy chọn khác là thêm các loại xác nhận khác nhau vào các nội dung giao dịch ngoài khoảng thời gian hiệu lực. Điều này là có thể, nhưng khó khăn như đã nêu trước đây, do đó cần phải có trường hợp sử dụng để các loại xác nhận này trở nên hữu ích.

Cuối cùng, các mạng layer 2 như Hydra, có thể cung cấp độ chính xác cao hơn thông qua 'độ dài vị trí' ngắn hơn và phạm vi hiệu lực ngắn hơn, cùng với độ trễ giảm trong giao dịch cuối cùng. Lưu ý rằng việc triển khai Hydra Head hiện tại *chưa* cung cấp mức độ linh hoạt đó.

## **Phần kết luận**

Thời gian *là* một chủ đề phức tạp, đặc biệt là trong bối cảnh blockchain phi tập trung. Các bài đăng trên blog này cho thấy rằng có một khái niệm rõ ràng về thời gian trực tuyến trên Cardano với các ràng buộc cụ thể và các tùy chọn cải tiến có sẵn trong dài hạn.

Thời gian trên chuỗi hoạt động theo cách hơi khác so với thời gian trong phần mềm truyền thống. Sự khác biệt này được xác định theo một cách nhất quán để giải quyết các hạn chế của hệ thống đồng thời đảm bảo tính bảo mật và khả năng sử dụng cho người dùng cuối và nhà điều hành nhóm cổ phần. Hơn nữa, thước đo thời gian của Cardano dường như đủ tốt để đáp ứng nhiều trường hợp sử dụng, ngay cả khi so sánh với các mục đích sử dụng tài chính truyền thống.

Tham gia [các kênh cộng đồng Discord](https://discord.com/channels/826816523368005654/826816523964383263) để thảo luận thêm về việc xử lý thời gian trên Cardano và các trường hợp sử dụng tiềm năng không được đề cập trong các bài đăng này. 

Bài này được dịch bởi Quang Pham, Review va biên tập bởi Nguyen Hieu. 
Bài viết nguồn [tại đây:](https://iohk.io/en/blog/posts/2022/12/08/time-handling-on-cardano-part-2-use-cases)

*Dự án này được tài trợ bởi Catalyst*
