Cập nhật Djed: Tính kinh tế của Djed Stablecoin và Phần thưởng ủy quyền!
===============================================================

![](img/tokenshen.jpeg)

Quay trở lại năm 2021, trong bài phát biểu quan trọng kết thúc của Charles Hoskinson, COTI đã thông báo rằng COTI sẽ cung cấp năng lượng cho Djed và kể từ đó chúng tôi đã phát triển Djed, loại tiền ổn định được thế chấp hóa quá mức.

Vai trò của COTI trong việc hỗ trợ Djed bao gồm phụ trách các khía cạnh như giao diện người dùng của nền tảng djed.xyz , Phát triển kinh doanh (bao gồm hơn 40 quan hệ đối tác) và triển khai hợp đồng thông minh. Vì Djed mới chỉ là sách trắng vào năm 2021 nên điều quan trọng là phải xem xét thiết kế tiết kiệm của nó và sau đó triển khai nó, đó là chủ đề của bài viết này.

Một trong những thành phần chính trong cấu trúc của Djed là tỷ lệ dự trữ của nó , xác định tỷ lệ ADA được giữ trong khoản dự trữ để thế chấp và duy trì sự ổn định của DJED. Sau khi nghiên cứu sâu rộng, chúng tôi đã khẳng định lại kết luận rằng phạm vi tối ưu cho tỷ lệ dự trữ bắt buộc là từ 400%-800%, như đã đề cập ban đầu trong báo cáo chính thức của Djed.

Tỷ lệ này được xác định bằng cách kiểm tra mức giảm giá tối đa hàng tháng của ADA tại mọi thời điểm, xấp xỉ 66% tại thời điểm nghiên cứu, dẫn đến kết luận rằng việc tài sản thế chấp quá mức của DJED khoảng 300% sẽ giúp có đủ tiền dự trữ trong trường hợp nó xảy ra một lần nữa.

![](https://miro.medium.com/max/720/0*Wzz-BLjl9w0k2iYt)

Mặc dù tỷ lệ dự trữ 300% đã được chứng minh là đủ để bù đắp cho việc giảm giá của ADA, nhưng để giữ cho nền tảng thận trọng và đảm bảo sự ổn định ngay cả trong các tình huống tiêu cực hơn, chúng tôi đã quyết định đặt tỷ lệ dự trữ tối thiểu ở mức 400% để cung cấp thêm sự an toàn cho những người nắm giữ DJED, vì vậy ngay cả trong trường hợp giá của ADA giảm 66,28%, sẽ có đủ dự trữ trong hợp đồng và DJED sẽ vẫn được thế chấp quá mức.

Chúng tôi cũng đã kiểm tra các giao thức tương tự như SigmaUSD, một stablecoin dựa trên ERGO có cùng cơ chế ổn định và phát hiện ra rằng stablecoin này duy trì sự ổn định và giữ cố định ngay cả trong tình huống tỷ lệ dự trữ vượt qua mức chuẩn tối thiểu.

Cấu trúc phí của Djed:

Một khía cạnh quan trọng khác của giao thức Djed là cấu trúc phí của nó, điều này luôn quan tâm đến lợi ích tốt nhất của cả chủ sở hữu SHEN và DJED.

Tương tự như các nền tảng đúc tiền ổn định chính, nền tảng của Djed dành cho các giao dịch đúc/đốt lớn với số lượng lớn, thay vì các giao dịch nhỏ hoặc vi mô, được giữ tốt nhất cho DEX/CEX. Đây là lý do tại sao chúng tôi quyết định các yêu cầu sau:

- Số lượng đúc tối thiểu của DJED — 5.000 DJED.
- Lượng DJED đốt cháy tối thiểu — 1.000 DJED.
- Phí đúc/đốt DJED — 1,5%.
- Số tiền tối thiểu đúc SHEN — 5.000 SHEN.
- Lượng SHEN đốt tối thiểu — 2.500 SHEN.
- Phí đúc/đốt SHEN — 1,5%.
- DJED và SHEN đúc/đốt phí hoạt động — 100 ADA
- Giá tối thiểu của SHEN được đặt thành 1 ADA để đảm bảo rằng nó luôn có thể đổi lấy ADA, ngay cả trong các đơn vị Lovelace.
Sau khi ra mắt, khi chúng tôi chuyển từ bootstrapping sang hoạt động hàng ngày, số tiền giao dịch tối thiểu có thể giảm xuống.


![](https://miro.medium.com/max/720/1*dUeEWNQmVSEPymoVdGOPLg.webp)

Các giá trị trên chỉ được áp dụng cho nền tảng của Djed ( djed.xyz ). Tuy nhiên, người dùng luôn có thể giao dịch DJED và SHEN với bất kỳ số tiền nào họ chọn trên DEX và CEX. Phí nền tảng làm tăng vốn chủ sở hữu và do đó làm tăng giá trị của SHEN. Tuy nhiên, SHEN cũng sẽ được giao dịch trên thị trường mở, vì vậy chúng tôi kỳ vọng giá của nó trên nền tảng sẽ giống với giá của nó trên DEX/CEX do chênh lệch giá. Trong tương lai và các phiên bản cải tiến, khi Djed mở rộng được giới thiệu, phí động cũng sẽ được áp dụng.

Tất cả phí đúc và đốt DJED và SHEN thu được trên nền tảng sẽ được phân bổ cho những người nắm giữ SHEN và được phản ánh trong giá của SHEN, dẫn đến giá trị của nó tăng lên. Công thức tính giá của SHEN theo thuật ngữ đơn giản là Vốn chủ sở hữu chia cho số lượng mã thông báo SHEN đang lưu hành. Bạn có thể đọc thêm về nó trong whitepaper . Ngoài phí đúc và đốt, chúng tôi vui mừng thông báo rằng:

Djed 1.1.1 sẽ bao gồm phần thưởng ủy quyền cho những người nắm giữ SHEN bắt đầu từ ngày đầu tiên!
Trong vài tháng qua, chúng tôi đã làm việc để kích hoạt ADA dành riêng, trên hợp đồng thông minh Djed, để kiếm phần thưởng ủy quyền cho những người nắm giữ SHEN. Chúng tôi vui mừng thông báo rằng công việc khó khăn đã được đền đáp và phần thưởng ủy quyền cho những người nắm giữ SHEN sẽ được đưa vào Djed 1.1.1!

Thiết lập kỹ thuật ngay lập tức mà chúng tôi đã nghĩ ra sẽ chỉ là tạm thời, cho đến khi một công nghệ đặt cược nhiều nhóm mạnh mẽ hơn sẽ được trình bày, được lên kế hoạch cho Djed V1.3.

Đây là những gì bạn cần biết, với tư cách là người nắm giữ SHEN, để nhận được phần thưởng ủy quyền của mình:

ADA sẽ được gửi vào quỹ dự trữ để đúc SHEN cùng với phí đúc/đốt thu được của SHEN và DJED. ADA này sẽ được ủy quyền cho một nhóm đặt cược công khai chuyên dụng được điều hành bởi Wave Financial, một trong những nhà điều hành nhóm đặt cược có uy tín nhất trong mạng Cardano. Để ưu tiên cho những người nắm giữ SHEN tham gia vào nhóm và để ngăn cản những người tham gia Djed không có liên quan tham gia, nhóm sẽ tính phí hoạt động 8% từ phần thưởng đặt cược, ngoài khoản phí một lần thông thường là 340 ADA trong tất cả các pool công cộng của họ. Khoản phí này sẽ được bù đắp bằng ADA cam kết bổ sung được Wave thêm vào nhóm, điều này sẽ mang lại phần thưởng gia tăng cho những người nắm giữ SHEN.

Phần thưởng mà nhóm nhận được sẽ được tính toán dựa trên ảnh chụp nhanh được thực hiện trong mỗi kỷ nguyên.Phần thưởng ủy quyền sẽ được tự động phân phối cho những người nắm giữ SHEN đủ điều kiện đã nắm giữ SHEN trong kỷ nguyên mà phần thưởng được phân phối.Phần thưởng từ nhóm sẽ được phân phối cứ sau 4 kỷ liên tiếp (khoảng 20 ngày một lần) và được chuyển trực tiếp cho những người nắm giữ SHEN đủ điều kiện vào ví của họ mà không cần thực hiện thêm bất kỳ hành động nào từ phía họ.

Tất cả những người nắm giữ SHEN đều nhận được phần thưởng ủy quyền, bất kể họ đúc SHEN của mình trên nền tảng hay mua nó trên DEX/CEX.

Chủ sở hữu SHEN sẽ có thể kiểm tra trạng thái và số lượng phần thưởng của họ trên www.djex.xyz .

![](https://miro.medium.com/max/720/0*t32AN0g6npNmxFMF)

Các con số trên chỉ nhằm mục đích trình diễn
Phí hoạt động trên mỗi TX được thanh toán bằng ADA. Phí hoạt động là sự kết hợp của 100 ADA + 25% phần thưởng ủy quyền, cả hai đều được chuyển đổi thành $COTI trên thị trường và được chuyển vào Kho bạc của COTI. Chúng tôi ước tính con số này trung bình là 0,5% khối lượng đúc/đốt đi qua nền tảng. Tất cả các khoản phí hoạt động thu được sẽ được sắp xếp hợp lý thành phần thưởng của Kho bạc COTI, mang lại lợi ích cho người dùng. Trong các phiên bản sau, phí hoạt động 0,5% sẽ được thu trực tiếp trên nền tảng.

Chúng tôi rất vui vì chúng tôi đã quản lý để đưa ra một giải pháp tạm thời giúp tăng phần thưởng cho những người nắm giữ SHEN. Công nghệ đặt cược nhiều nhóm sẽ có sẵn trong các phiên bản Djed trong tương lai. Ngoài phần thưởng ủy quyền, chủ sở hữu $SHEN sẽ được hưởng lợi từ phí nền tảng, cũng như phần thưởng LP và phần thưởng Farming. Phần thưởng đặt cược cũng có thể được cung cấp bởi CEX.





[Nguồn tại đây](https://cotinetwork.medium.com/djed-update-economics-of-the-djed-stablecoin-and-delegation-rewards)