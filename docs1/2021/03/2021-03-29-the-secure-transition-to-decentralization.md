# Sự chuyển dịch của Cardano sang phân quyền

### **Sự kiện này được mở đầu với 'sự khẳng định công khai về tính ngẫu nhiên', và giới thiệu phương pháp entropy với cộng đồng.**

![](img/2021-03-29-the-secure-transition-to-decentralization.002.png) 29 tháng 3 năm 2021 ![](img/2021-03-29-the-secure-transition-to-decentralization.002.png) [Giáo sư Alexander Russell](tmp//en/blog/authors/alexander-russell/page-1/) ![](img/2021-03-29-the-secure-transition-to-decentralization.003.png) 6 phút đọc

![Prof Alexander Russell](img/2021-03-29-the-secure-transition-to-decentralization.004.png)[](tmp//en/blog/authors/alexander-russell/page-1/)

### [**Prof Alexander Russell**](tmp//en/blog/authors/alexander-russell/page-1/)

Senior Research Fellow

Academic Research

- ![](img/2021-03-29-the-secure-transition-to-decentralization.005.png)[](mailto:alexander.russell@iohk.io "Email")
- ![](img/2021-03-29-the-secure-transition-to-decentralization.006.png)[](tmp///www.youtube.com/watch?v=KkcAic12dvc "YouTube")
- ![](img/2021-03-29-the-secure-transition-to-decentralization.007.png)[](https://github.com/russella "GitHub")

![Sự chuyển đổi an toàn sang phân quyền  của Cardano](img/2021-03-29-the-secure-transition-to-decentralization.008.jpeg)

Tính bảo mật của các blockchain bằng chứng cổ phần ( POS) được cung cấp bởi mối quan hệ phụ thuộc lẫn nhau giữa token gốc và cơ chế đồng thuận cung cấp năng lượng cho nó: xét cho cùng, việc lựa chọn các node để tạo block theo cổ phần đòi hỏi một cái nhìn nhất quán mang tính toàn cầu về việc phân phối cổ phần, trong khi bản thân việc duy trì tính nhất quán đòi hỏi một cơ chế lựa chọn công bằng. Thật vậy, cái tên Ouroboros - một biểu tượng cổ điển gợi ý cho phép đệ quy toán học - ban đầu được chọn để thu hút sự chú ý đến mối quan hệ này.

Giao thức Ouroboros xác định việc tạo ra block thông qua một trình tự phát triển của lãnh đạo một lần- mỗi lần chạy trong một 'epoch' kéo dài 120 giờ, trong đó nó xác định stake pool nào được chọn làm lãnh đạo (một lần) để tạo block. Cùng với việc chịu trách nhiệm cho các giao dịch mới vào sổ cái, các block xuất hiện trong mỗi epoch cũng có trách nhiệm chọn ra vị trí dẫn đầu cho epoch sau - nhiều hàm đệ quy hơn! Các tham số của lãnh đạo một lần và phân phối cổ phần cùng lúc để cung cấp các thuộc tính sổ cái cơ bản của hệ thống mà chúng tôi yêu cầu.

Blockchain Cardano chuyển sang sản xuất các block phi tập trung hoàn toàn vào ngày 31 tháng 3. Ngay sau đó, sẽ tăng cường khả năng lãnh đạo bằng cách thêm vào một 'tham số nonce chuyển đổi' phản ánh entropy từ nhiều nguồn bên ngoài, không thể đoán trước. Cụ thể, tất cả các giao dịch được ghi lên blockchain trước Thứ Tư, ngày 7 tháng 4 lúc 15:44:51 UTC (vị trí 151200 của epoch 258) sẽ đóng một vai trò đặc biệt trong tương lai của blockchain: giá trị băm tích lũy của chúng, được phản ánh trong 'hàm băm của block ngay trước đó 'từ block đầu tiên trên chuỗi được tạo vào thời gian này hoặc sau thời gian này, sẽ xác định thời điểm chuyển đổi và do đó trực tiếp đóng góp vào chu kỳ tạo block ngẫu nhiên của giao thức.

Các nhà khoa học và kỹ sư của IO Global sẽ đóng góp một số nguồn entropy cụ thể, bên ngoài, không thể đoán trước. Ngoài ra, để phản ánh bản chất phi tập trung của Cardano, chúng tôi đang yêu cầu cộng đồng mở rộng, bao gồm các SPO và các nhà phát triển tham gia với chúng tôi on-chain (trên chuỗi) cho một sự kiện mà chúng tôi gọi là xác nhận công khai của Cardano về sự ngẫu nhiên. Quy trình cộng đồng này sẽ thiết lập quá trình chuyển đổi 256 bit ngẫu nhiên một lần trong đời của hệ thống, do đó sẽ báo trước sự chuyển đổi chính thức của giao thức sang hoạt động phi tập trung.

Bây giờ chúng ta sẽ đi vào phần nội dung chứa nhiều yếu tố kỹ thuật vì vậy thật sự tập trung hoặc bỏ qua nó.

## **Một vài nền tảng** 

Giao thức Ouroboros được tổ chức thành các khoảng thời gian 5 ngày (120 giờ) được gọi là 'epoch'. Như đã mô tả ở trên, nó điều phối hai hoạt động quan trọng: cập nhật việc phân phối cổ phần và cập nhật lãnh đạo một lần. Bằng chứng về tính đúng đắn của giao thức cho thấy rằng nó đạt được trạng thái ổn định tốt: miễn là epoch bắt đầu với một lãnh đạo không thể dự đoán từ trước, nó sẽ mang lại một lãnh đạo mới, không thể đoán trước cho đến epoch sau. Để khởi động quy trình đệ quy, sự kiện xác nhận công khai này được thiết kế để đảm bảo tính chất không thể đoán trước. Chúng tôi cho rằng các giao thức bằng chứng công việc cũng phải tuân theo các yêu cầu ngẫu nhiên tương tự: nổi bật nhất là trường hợp Nakamoto đã bao gồm chuỗi không thể đoán trước với nội dung: 'The Times 03 / Jan / 2009 Chancellor on brink of second bailout for banks' trong [block nguyên thủy ( khối đầu tiên)](https://en.bitcoin.it/wiki/Genesis_block#:~:text=Timestamp,days%20after%20the%20genesis%20block.) của Bitcoin.

## **Phương pháp entropy và dòng thời gian** 

Việc Cardano triển khai giao thức Ouroboros cung cấp một 'cơ chế bổ sung entropy' có thể thêm một chuỗi bit được xác định trên blockchain vào các tham số lãnh đạo một lần tiếp theo; đây chính xác là các mục tiêu dự kiến của quá trình chuyển đổi. Đương nhiên, cơ chế này yêu cầu khai báo công khai về chuỗi bit và phải được phê duyệt rõ ràng, an toàn bằng mật mã: cụ thể, chỉ các phiếu bầu được ký bằng chữ ký số từ các đại biểu nguyên thủy mới có thể hoàn tất quy trình. Hơn nữa, quá trình này có một khoảng thời gian cụ thể: các phiếu bầu phải xuất hiện trước 48 giờ trong epoch.

Epoch bắt đầu vào Thứ Hai, ngày 5 tháng 4 lúc 21:44:51 UTC (epoch 258) sẽ bao gồm cơ chế thêm entropy: cụ thể là block có hàm băm trước đó xuất hiện trong block đầu tiên vào ngày thứ Tư hoặc sau ngày Thứ Tư, ngày 7 tháng 4 lúc 15:44:51 UTC (vị trí 151200 của epoch 258) sẽ xác định thời điểm chuyển tiếp; điều này sẽ diễn ra khoảng 42 giờ sau khi epoch bắt đầu và do đó còn lại sáu giờ để các đại biểu nguyên thuỷ bỏ phiếu của họ. Nhắc lại cấu trúc chuỗi băm của blockchain Ouroboros, giá trị băm này phụ thuộc vào toàn bộ blockchain cho đến thời điểm đó.

Việc kiểm tra chặt chẽ các bằng chứng về tính đúng đắn của giao thức vẽ ra một bức tranh chính xác hơn về các thuộc tính thiết yếu của quá trình chuyển đổi: nó phải dựa trên các giá trị ngẫu nhiên - được giới thiệu trong cài đặt của chúng tôi thông qua các giao dịch blockchain Cardano - không thể dự đoán chính xác khi phân phối cổ phần cho tháng 4, 10 epoch đã được giải quyết. Điều này đặc biệt nhấn mạnh vào các giao dịch xuất hiện trong blockchain giữa mốc 12 giờ, khi việc phân phối cổ phần được giải quyết ổn định và mốc 42 giờ, khi giá trị băm được nâng cao.

## **Nguồn Entropy do IO Global giới thiệu**

Mặc dù cộng đồng Cardano giới thiệu nhiều nguồn ngẫu nhiên - hãy xem bên dưới! - Các nhà khoa học và kỹ sư của IO Global sẽ đưa vào các giao dịch với siêu dữ liệu được xác định bởi một số nguồn entropy công khai: hàm băm giá đóng cửa của Sàn giao dịch chứng khoán New York vào ngày 6 tháng 4 và dữ liệu địa chấn theo thời gian thực từ Cơ quan khảo sát địa chất Hoa Kỳ, Đại học Athens, và Hiệp hội Khí tượng Nhật Bản. Dữ liệu địa chấn từ các nguồn này sẽ bao gồm 36 giờ đầu tiên của epoch. Các chi tiết khác, bao gồm các tập lệnh được sử dụng để thu thập dữ liệu và các nguồn chính xác, sẽ xuất hiện trong [kho lưu trữ github công khai](https://github.com/input-output-hk/cardano-entropy) này.

Chúng tôi cũng muốn nhiều thành viên chuyên về kỹ thuật của cộng đồng Cardano cùng tham gia, bằng cách thêm đóng góp của riêng họ vào sự ngẫu nhiên. Đây là những gì chúng tôi muốn bạn làm.

- Chọn một số nguồn ngẫu nhiên: rút thăm từ khu vực của bạn, public key RSA mới được tạo bằng các công cụ tiêu chuẩn hoặc kết quả của một số lần tung của một con xúc xắc 20 mặt.
- Dán kết quả của các nguồn này vào tài liệu văn bản, lưu và băm tài liệu này bằng hàm băm yêu thích của bạn, chẳng hạn như SHA256. Ghi hàm băm này trên blockchain bằng cách sử dụng [giao dịch với siêu dữ liệu](https://github.com/input-output-hk/cardano-node/blob/master/doc/reference/tx-metadata.md) . (Xem [video này](https://www.youtube.com/watch?v=fxNx4W1_gro&list=PLnPTB0CuBOBxjtuyI7sseODnMffpVHS2v&index=3&t=3s) .)
- Để hữu ích nhất, nguồn ngẫu nhiên của bạn phải được xác định sau Thứ Ba, ngày 6 tháng 4 lúc 9:44:51 UTC (vị trí 43200 của epoch 258) và phải được đưa vào giao dịch blockchain trước Thứ Tư, ngày 7 tháng 4 lúc 15:44:51 UTC (vị trí 151200 của epoch 258).

Nếu không giỏi kỹ thuật, bạn vẫn có thể tham gia. Bạn có thể muốn thử nghiệm một công cụ cộng đồng mới thú vị, [Cardano Wall](https://cardanowall.com/en/) . Điều này cho phép bạn dễ dàng ghi vào blockchain Cardano. Tuy nhiên, nếu bạn chọn tham gia, vui lòng thông báo điều này trên phương tiện truyền thông xã hội, bằng cách xuất bản cả mã nguồn (chưa băm) cùng với giá trị băm xuất hiện trong giao dịch của bạn.

*Cảm ơn sự hỗ trợ của bạn và chúng tôi mong muốn đến vị trí 151200 khi chúng tôi có thể tập hợp, tthúc đẩy, cho một "block party' để xem các phiếu bầu của đại biểu nguyên thủy xuất hiện trên chuỗi!

Bài này được dịch bởi Max Long, Review bởi Quang Pham, biên tập bởi Nguyễn Hiệu.
 Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/03/29/the-secure-transition-to-decentralization/)
 
 *Dự án được tài trợ boải Catalyst*
