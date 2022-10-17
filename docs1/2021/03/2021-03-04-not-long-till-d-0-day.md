# Gần tới ngày hệ số 'd'= 0

### **Chúng ta đang tiến nhanh đến phi tập trung hoàn toàn việc đóng block trên Cardano. Đây là thời điểm thích hợp để suy ngẫm về sự phát triển của mạng lưới**

![](img/2021-03-04-not-long-till-d-0-day.002.png) Ngày 4 tháng 3 năm 2021![](img/2021-03-04-not-long-till-d-0-day.002.png)[ Colin L Edwards](tmp//en/blog/authors/colin-edwards/page-1/)![](img/2021-03-04-not-long-till-d-0-day.003.png) bài đọc 8 phút

![Colin L Edwards](img/2021-03-04-not-long-till-d-0-day.004.png)[](tmp//en/blog/authors/colin-edwards/page-1/)

### [**Colin L Edwards**](tmp//en/blog/authors/colin-edwards/page-1/)

Quantitative Strategist

Commercial

- ![](img/2021-03-04-not-long-till-d-0-day.005.png)[](mailto:colin.edwards@iohk.io "Email")
- ![](img/2021-03-04-not-long-till-d-0-day.006.png)[](https://www.linkedin.com/in/colin-edwards-04938a5/ "LinkedIn")

![Gần tới ngày hệ số 'd'= 0](img/2021-03-04-not-long-till-d-0-day.007.jpeg)

Vào cuối tháng 3, chúng ta sẽ đạt được một cột mốc quan trọng khác cho Cardano khi chúng ta thấy hệ số "d", hệ số điều chỉnh tỷ lệ phần trăm giao dịch được xử lý bởi các node genesis, về 0. Tại thời điểm này, trách nhiệm đóng block sẽ được phi tập trung hoàn toàn. Nói cách khác, mạng lưới hơn 1.800 pool cộng đồng của Cardano sẽ tự chịu trách nhiệm sản xuất các block.

Ngày *d*=0 sẽ là một thời điểm quan trọng trong hành trình của Cardano. Khi chúng tôi triển khai bản cập nhật Shelley vào tháng 7 năm 2020, "d" được đặt thành 1.0, có nghĩa là mọi block được tạo ra bởi mạng lưới các node liên kết của IOHK. Tất nhiên, điều này trái ngược với phi tập trung nhưng là một cách tiếp cận khôn ngoan (tức là an toàn) trong thời gian tới trong khi mạng lưới các nhà điều hành pool cổ phần (SPO) bắt đầu và vận hành.

### **Chuẩn bị cho ngày d = 0**

Theo thời gian, chúng tôi đã giảm dần *d* với tốc độ 0,02 mỗi epoch (nói cách khác, cứ năm ngày lại tăng hai điểm phần trăm để trao quyền sản xuất block cho cộng đồng). Vào ngày bài blog này được xuất bản, chúng tôi đang ở mức *d* = 0,12 với 88% block được tạo bởi các pool cộng đồng và chỉ 12% bởi các node liên kết.

Nói một cách đơn giản, khi *d* giảm, cộng đồng sẽ tạo ra nhiều block hơn và nhiều stake pool hơn có thể đóng block. Khi hệ số *d* giảm đi, sự đa dạng của mạng lưới và sự phân bố địa lý sẽ mở rộng.

Vào ngày 31 tháng 3, tại epoch 257, *d* sẽ bằng 0. Ngày đó sẽ rất đặc biệt vì ngày *d* có thể bằng 0 nhưng ý nghĩa của nó là rất lớn. Trong bối cảnh này, số 0 đó báo trước chỉ số bên ngoài quan trọng nhất của sự phi tập trung, một biểu tượng tham số được hỗ trợ bởi nguyên lý cốt lõi trong triết lý của chúng tôi - *d = 0 giúp phi tập trung sức mạnh*.

Khi chúng tôi tiếp tục chuyển sang phi tập trung hoàn toàn, đây cũng là thời điểm tốt để tham khảo các thông số khác chi phối sự phát triển của mạng lưới Cardano và xem xét một số thay đổi mà chúng tôi đã nhìn thấy.

 Số *d* chỉ là một trong hơn 20 tham số chi phối hoạt động và tình trạng mạng lưới. Bộ thông số này là 'đòn bẩy' để quản lý và chỉ đạo hoạt động hiệu quả và tự nhiên của [hệ thống proof of stake phi tập trung](https://iohk.io/en/blog/posts/2020/11/13/the-general-perspective-on-staking-in-cardano/). Cuối cùng cộng đồng sẽ thúc đẩy sự phát triển của Cardano thông qua các quy tắc quản trị ở kỷ nguyên Voltaire, nhưng cho đến lúc đó, nhiệm vụ của chúng tôi là quản lý các thông số này. Quyền giám hộ của chúng tôi yêu cầu chúng tôi thực hiện các điều chỉnh theo yêu cầu để xây dựng và duy trì sức khỏe của mạng lưới.

### **Tại sao tham số *k* là đặc biệt**

Bên cạnh những cân nhắc kỹ thuật, chúng tôi vẫn cam kết hỗ trợ các stake pool nhỏ hơn, vì chúng tôi tin rằng cách tiếp cận này phù hợp với mục tiêu dài hạn của chúng tôi là tạo ra hệ sinh thái phi tập trung và bền vững nhất về mặt kinh tế cho các stake pool. Điều này được phản ánh rõ hơn trong [cách tiếp cận ủy quyền](https://iohk.io/en/blog/posts/2020/12/10/delegating-to-decentralize-and-build-value/) của chúng tôi trong năm 2021 nhằm hỗ trợ sự đa dạng của stake pool.

Năm ngoái, chúng tôi đã thực hiện điều chỉnh đáng kể đầu tiên đối với các thông số mạng khi chuyển *k* từ 150 thành *k* = 500 (nghĩa là một hệ thống được tối ưu hóa khi khởi chạy cho 150 pool đóng block, mặc dù các pool khác có thể đóng block). Điều này xảy ra sau cuộc tranh luận rộng rãi, cả trong IOHK, Cardano Foundation và với cộng đồng SPO.

Việc chuyển sang *k* = 500 là một quyết định cân bằng dựa trên nhu cầu tạo cơ hội cho nhiều pool đóng block hơn (bằng cách khuyến khích cổ phần từ các pool bão hòa sang các pool mới), đồng thời hỗ trợ các pool đóng được block và giảm thiểu sự gián đoạn cho người ủy quyền. Nhìn chung, nó đã được chứng minh là thành công - hãy đi sâu hơn một chút.

### **Thay đổi *k* = 500**

Trước khi có thông báo rằng *k* thay đổi, 54,6% tổng số ada được ủy quyền được đại diện bởi 10 stake pool lớn nhất và 45,4% ada được đại diện bởi các pool nhỏ hơn. Sau khi thay đổi k = 500, những con số đó đã đảo ngược: 55,9% ada hiện được đại diện bởi các pool khác ngoài 10 pool lớn nhất.

![](img/2021-03-04-not-long-till-d-0-day.008.png)

Đây là một sự thay đổi đáng kể liên quan trực tiếp đến sự thay đổi trong tham số *k*.

![](img/2021-03-04-not-long-till-d-0-day.009.png)

Đó là một khởi đầu tuyệt vời, nhưng mục tiêu của chúng tôi là tiếp tục tối ưu hóa mạng lưới. Vì vậy, chúng tôi đã quan sát những gì đã xảy ra, thu thập phản hồi và kết hợp mọi thứ chúng tôi học được để thực hiện vòng thay đổi tiếp theo.

Các pool sẽ chia tách khi sự chia tách mang lại ý nghĩa kinh tế. Đối với những pool có tỷ lệ cam kết lớn hơn, họ càng có nhiều cam kết thì nó càng có giá trị và càng có nhiều lý do để các SPO cùng nhau giữ cam kết. Ngược lại, nếu một pool có mức cam kết thấp, thì có rất ít lý do để không chia nhỏ thêm để bắt đầu các pool bổ sung.

Mặc dù có một khoản chi phí liên quan đến việc vận hành một pool nhỏ và với  giá trị hiện tại của ada, chúng tôi tin rằng động cơ tài chính cho việc chia nhỏ  thậm chí còn mạnh mẽ hơn bây giờ. Ví dụ tăng *k* lên 1.000 mà không giải quyết vấn đề này trước tiên, sẽ không dẫn đến một hệ sinh thái phi tập trung và đa dạng hơn. Đơn giản là chúng ta sẽ thấy nhiều nhà điều hành pool sẽ chạy gấp đôi số lượng pool.

### **Thay đổi cam kết**

Tham số *a0* sẽ là phần thưởng cho các SPO vì đã tập trung cam kết của họ vào một số lượng các pool nhỏ. Điều này đã có hiệu quả trong việc khuyến khích các pool có mức cam kết cao sẽ hợp nhất thành các pool tư nhân lớn (như chúng tôi đã làm ở IOHK) và do đó mang lại cho các pool nhỏ hơn cơ hội lớn hơn để thu hút sự ủy quyền.

Tuy nhiên, chúng tôi tin rằng hệ thống hiện tại có thể được cải thiện, vì vậy trong một thời gian, chúng tôi đã thảo luận và lập mô hình các phương án để thực hiện cam kết hiệu quả hơn trong việc giải quyết tách pool đối với các mức cam kết thấp hơn.

Cấu trúc hiện tại của công thức phần thưởng không cho chúng tôi sự linh hoạt để điều chỉnh tác động bằng cách thay đổi tham số một cách đơn giản; chúng tôi sẽ cần sửa đổi công thức phần thưởng, đây là điều mà đội ngũ nghiên cứu của chúng tôi đã làm việc trong một thời gian.

Một số ứng viên đầy triển vọng đã vượt qua vòng đánh giá. Vào thời điểm này, chúng tôi muốn ghi nhận công lao từ người đóng góp cho cộng đồng, là Shawn McMurdo với [đề xuất cải thiện Curve Pledge Benefit](https://github.com/cardano-foundation/CIPs/pull/12) đã giúp phát triển tư duy trong lĩnh vực này.

Đội ngũ nghiên cứu của chúng tôi đang trong giai đoạn cuối của việc hoàn thiện cách tiếp cận. Họ sẽ sớm trình bày những phát hiện của họ và sau đó chúng tôi sẽ cập nhật cho cộng đồng. Tuy nhiên, đội ngũ nghiên cứu đã kết luận rằng *a0* nên thay đổi. Chúng tôi tin rằng sự thay đổi này sẽ mang lại lợi ích to lớn cho mạng lưới, giúp hệ thống bền vững hơn, phân phối rộng rãi và đa dạng trên toàn cầu. Nó cũng sẽ làm tăng thu nhập của tất cả các pool công khai (tức là những pool chưa hoàn toàn 'bão hòa').

Mặc dù đây là một vấn đề thảo luận nội bộ, chúng tôi cũng đã kết luận rằng bất kỳ sự thay đổi nào của hệ số *k* sẽ đến sau khi thay đổi công thức cho *a0* để mang lại kết quả như mong muốn (đặc biệt khuyến khích tiền đặt cược tham gia vào các pool nhỏ hơn là chia nhỏ các pool). Vì đây là sự sửa đổi công thức hoàn chỉnh và không còn nằm trong một epoch đơn giản, nên nó cần được phát hành như một phần của hard fork. Với sản phẩm pipeline và sự tập trung hiện tại của pool vào việc tiếp tục triển khai Goguen và chúng tôi sẽ thực hiện thay đổi này trong quý ba của năm.

### **Những cân nhắc ​​khác**

Các yếu tố khác cần được xem xét. Đầu tiên là ủy quyền nhiều pool, để cho phép các chủ sở hữu ada chia cổ phần của họ trên một số pool từ một ví duy nhất. Điều này đòi hỏi công sức đáng kể của đội ngũ phát triển cốt lõi, cùng với giao diện mới và điều chỉnh các quy tắc kinh doanh. Chúng tôi cũng muốn cung cấp các tùy chọn cam kết tốt hơn cho SPO từ Daedalus trong một khung thời gian tương tự (hiện chỉ khả dụng qua CLI hoặc AdaLite), có nghĩa là công việc phát triển bổ sung không chỉ cho các pool nội bộ mà còn cho các công ty như ví Ledger và Trezor .

Chúng tôi cũng sẽ tiếp tục nghiên cứu các thông số khác như phí tối thiểu (được thực hiện để ngăn chặn 'race to the bottom (cuộc đua xuống đáy)' tuy nhiên bị lệch so với các pool nhỏ hơn) trong khi tiếp tục đo điểm chuẩn và tối ưu hóa hiệu suất node khi chức năng hợp đồng thông minh ra mắt. Trách nhiệm và cam kết của chúng tôi vẫn là đạt được sự cân bằng tinh tế giữa tính ổn định, khả năng mở rộng và sức khỏe tổng thể của mạng lưới với một hệ sinh thái phát triển mạnh mẽ của các nhà điều hành pool và người ủy quyền.

### **Phát triển trong tương lai**

Khi chúng tôi thúc đẩy sự lành mạnh của mạng lưới và hệ sinh stake pool, chúng tôi tiếp tục theo dõi và nghiên cứu các thông số và giá trị quan trọng khác. Công việc này xem xét cả các phương pháp tiếp cận chiến thuật và chiến lược mà chúng tôi có thể thực hiện.

Với sự tăng giá của ada, triển khai các token gốc và dự đoán các hợp đồng thông minh, chúng tôi cũng tiếp tục đánh giá và xem xét cấu trúc phí của Cardano. Ví dụ: dựa trên phản hồi của cộng đồng, chúng tôi đang xem xét giảm một số khoản phí. Phí cố định tối thiểu là 340 ada cho các stake pool là một trong những loại phí được cân nhắc thay đổi; Phí giao dịch mạng lưới và tiền đặt cọc cho các hợp đồng thông minh cũng đang được thảo luận.

Các nhà nghiên cứu và nhà phân tích của chúng tôi cũng đang làm việc với một nhóm tư vấn kinh tế bên ngoài để chính thức hóa cách tiếp cận tối ưu nhằm đảm bảo phí sẽ duy trì ổn định và có thể dự đoán được trong thời gian dài hơn. Kết quả của đánh giá này sẽ bao gồm một mô hình quản trị với nhiệm vụ rõ ràng về thời điểm và cách thức xác định phí trong tương lai khi chúng tôi phát triển, tối ưu hóa và mở rộng mạng lưới. Chúng tôi sẽ đảm bảo cộng đồng được thông báo và tham gia khi chúng tôi phát triển ý tưởng .

*Tôi muốn cảm ơn và ghi nhận ý kiến đóng góp của Francisco Landino, Lars Brünjes, Aikaterini-Panagiota Stouka, Aggelos Kiayias và Tim Harrison ​​cho bài viết và cảm ơn sự phản hồi của họ trong cả bài viết.*

Bài này được dịch bởi Thanhtintran, Review bởi Pham Quang, biên tập bởi Nguyễn Hiệu
 Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/03/04/not-long-till-d-0-day/)
 
 *Dự án này được tài trợ bởi Catalyst*
