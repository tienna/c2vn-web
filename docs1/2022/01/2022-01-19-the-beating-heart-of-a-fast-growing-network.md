# Trái tim đang đập của một mạng lưới đang phát triển nhanh chóng

### **Cốt lõi của mạng lưới Cardano là dựa vào node. Khi chúng ta mở rộng quy mô Cardano trong năm 2022, công nghệ tích hợp này sẽ phát huy vai trò của nó.**

![](img/2022-01-19-the-beating-heart-of-a-fast-growing-network.002.png) 19 tháng 1 năm 2022 ![](img/2022-01-19-the-beating-heart-of-a-fast-growing-network.002.png) [John Woods](/en/blog/authors/john-woods/page-1/) ![](img/2022-01-19-the-beating-heart-of-a-fast-growing-network.003.png) 5 phút đọc

![John Woods](img/2022-01-19-the-beating-heart-of-a-fast-growing-network.004.png)[](/en/blog/authors/john-woods/page-1/)

### [**John Woods**](/en/blog/authors/john-woods/page-1/)

Giám đốc Cardano Architecture

Kỹ thuật

- ![](img/2022-01-19-the-beating-heart-of-a-fast-growing-network.005.png)[](https://www.linkedin.com/in/johnalanwoods/ "LinkedIn")
- ![](img/2022-01-19-the-beating-heart-of-a-fast-growing-network.006.png)[](https://github.com/johnalanwoods "GitHub")

![Nhịp đập từ mạng lưới đang phát triển nhanh chóng](img/2022-01-19-the-beating-heart-of-a-fast-growing-network.007.jpeg)

Trong một [bài viết gần đây](https://iohk.io/en/blog/posts/2021/11/22/slow-and-steady-wins-the-race-network-evolution-for-network-growth/), chúng tôi đã thảo luận về phương pháp tiếp cận chuẩn bị cho sự tăng trưởng của Cardano được dự kiến trong vài tuần đến vài tháng sắp tới. Hiện nay, ngày càng nhiều ứng dụng phi tập trung (dApp) tham gia, giúp cho Cardano như một miến đất hứa, đồng thời là sự mở rộng và phát triển của hệ sinh thái tài chính phi tập trung (DeFi) cùng "RealFi", do đó Blockchain cũng cần mở rộng khả năng hoạt động của nó.

Cardano đang bước vào giai đoạn Basho với trọng tâm là [tối ưu hóa, mở rộng quy mô và phát triển mạng lưới](https://iohk.io/en/blog/posts/2022/01/14/how-we-re-scaling-cardano-in-2022/) . Chúng tôi dự đoán lưu lượng giao dịch sẽ tăng đáng kể trong những tháng tới và đây là lúc chúng tôi bắt đầu quy trình linh hoạt để đáp ứng điều này. Trong đó có việc cải tiến node cốt lõi. Chúng tôi đã hoàn thành node v1.33.0 với đầy đủ các tỉnh năng và cải tiến các thành phần hiện có, nâng cao khả năng diễn đạt của Cardano và khả năng của chuỗi để làm được nhiều điều hơn.

## **Node có những gì?**

Node v1.33.0 – được tung ra vào đầu tháng 1 và hiện đang chạy 80% hệ thống SPO - được thiết kế từ đầu một cách chỉnh chu và hiệu quả. Các cải tiến này nhằm giảm thời gian truyền của khối, vì thế chúng ta có nhiều khoảng trống hơn để tạo ra những thay đổi cần thiết cho DApps, Sàn phi tập trung (DEXs), các môi trường DeFi, vân vân.

Sau khi triển khai phiên bản của node, các khối giờ đây lưu truyền nhanh hơn. Điều này cho chúng tôi thêm thời gian mà chúng tôi có thể sử dụng để triển khai các cải tiến khác.

Các cải tiến kỹ thuật có trong node v1.33.0 có thể được phân loại rộng rãi trong việc **sử dụng RAM một cách tối ưu** và **những nâng cấp hiệu quả** .

**Sử dụng RAM một cách tối ưu**

Kể từ node mới, việc sử dụng bộ nhớ được giảm đáng kể nhờ hai yếu tố: nén bộ nhớ và chia sẻ chúng hiệu quả hơn (thay vì chia nhiều phiên bản từ cùng một đối tượng, thì hệ thống sẽ phân ra làm nhiều luồng để cùng dùng chung đối tượng đó.)

Cụ thể là những cải tiến về bộ nhớ trong việc xử lý đầu ra của giao dịch chưa thanh toán(UTXO), phân chia cổ phần, phân chia cổ phần trực tiếp của các pool, và trình bày hàm băm.

Những cải tiến này bao gồm:

- Xử lý UTXO

Node v1.33.0 sử dụng ít từ ngữ hơn cho các đầu vào giao dịch.

- Phân chia cổ phần

Ảnh chụp nhanh về phân tán cổ phần sẽ thay mặt cho 35% tổng số dữ liệu trực tiếp. Node mới đã đạt được mức giảm 8 hệ số bằng cách chia sẻ và thay đổi cách trình bày.

- Phân chia cổ phần trực tiếp

Phân chia cổ phần trực tiếp chiếm 22% tổng số dữ liệu trực tiếp trong hệ thống.

Node v1.33.0 tiết kiệm bộ nhớ theo hai cách:

Chia sẻ bằng cách kết hợp nhiều sơ đồ được khóa trên địa chỉ cổ phần (mỗi sơ đồ kết hợp giúp tiết kiệm 11 từ cho mỗi địa chỉ cổ phần) và chia sẻ ID của nhóm cổ phần (5 từ).

- Trình bày hàm băm

Trình bày hằm băm bây giờ sử dụng 5 thay vì 6 từ. Mặc dù thay đổi này có vẻ không đáng kể, nhưng sẽ dẫn đến những cải thiện lớn về hiệu quả vì hàm băm rất phổ biến trong hệ thống.

**Thực tế về việc sử dụng RAM một cách tối ưu**

Node mới cho phép tiết kiệm đáng kể dữ liệu trực tiếp do nén và chia sẻ.

**Những Nâng cấp hiệu quả**

Ngoài việc làm cho việc sử dụng bộ nhớ hiệu quả hơn nhiều so với các phiên bản trước, node v1.33.0 còn bao gồm các thay đổi đối với các thuật toán mà Cardano sử dụng để tính toán phần thưởng và phân chia tiền cược.

Cơ sở lý luận cho những thay đổi này là để giải quyết hiệu suất mạng thay đổi đã xảy ra khi tính toán phần thưởng, dẫn đến tăng đột biến tải mạng. Thuật toán tính toán phần thưởng mới hiện đã được áp dụng, vì vậy những việc tăng đột biến này sẽ không xảy ra nữa.

Thuật toán để tính toán phần thưởng đã thay đổi từ "cột chính" trên 4.000 pool, thành "hàng chính" trên ~ 1 triệu địa chỉ ủy thác. Điều này cho phép tính toán dàn trải trong 3 ngày, thay vì 1 ngày (4.000 khối).

Chúng tôi cũng đã thực hiện các thay đổi để làm cho việc tính toán phân chia ủy thác hiệu quả hơn.

**Quy trình Pipelining**

Cuối năm nay, chúng tôi sẽ thực hiện những cải tiến quan trọng hơn nữa cho node. Một node thực hiện rất nhiều công việc xử lý từ khối này đến khối khác. Tuy nhiên node lại nhàn rỗi ở thời gian đợi giữa mỗi khối (khoảng thời gian nhàn rỗi này thường được gọi là 'không gian chết'). Chi phí lan truyền khối này có thể được giảm bớt thông qua các kỹ thuật nhất định để tận dụng tốt thời gian 'chết' đó. Đây là lúc kỹ thuật Pipelining xuất hiện.

Kỹ thuật này kết hợp việc xác nhận và truyền các khối. Bây giờ, thay vì thực hiện theo quy trình lấy tiêu đề, xác thực tiêu đề, lấy khối tương ứng tiêu đề, xác thực và sau đó gửi đến ngang hàng, bây giờ chúng ta sẽ nhận một tiêu đề, xác thực và gửi tiêu đề đến ngang hàng mà không cần xác thực cả khối. Việc tinh giản này sẽ mang lại cho mạng nhiều khoảng trống hơn để thực hiện nhiều thay đổi hơn.

Bằng cách giảm chi phí lan truyền khối (thời gian chết), kỹ thuật Pipelining sẽ giúp gia tăng đáng kể phạm vi và nhiều khoảng không hơn cho việc thực hiện các cải tiến hơn cho mạng lưới.

## **Nhìn về tương lai**

Dự án Cardano luôn cam kết xây dựng một mạng lưới an toàn, đàn hồi và phi tập trung cao có thể đáp ứng nhu cầu của thập kỷ tới và hơn thế nữa. Và thực hiện một cách tiếp cận dài hạn có phương pháp, có trách nhiệm là trọng tâm của vấn đề này. Như câu nói, "Đo hai lần, cắt một lần."

Với sự ra mắt của nhiều dự án mới thú vị trên Cardano, hệ sinh thái sẽ chứng kiến sự phát triển bùng nổ. Tất nhiên, sức chứa trong ngắn hạn sẽ không theo kịp nhu cầu và sẽ xảy ra tình trạng tắc nghẽn nghiêm trọng. Nhưng đây là một quá trình mà mọi chuỗi mới đều phải trải qua. Với sự giám sát cẩn thận xuyên suốt, chúng ta sẽ tiếp tục làm việc để tăng hiệu quả, thông lượng và khả năng của Cardano trong những tuần và tháng tới. Trong đó, việc duy trì phương pháp tiếp cận một cách an toàn và được cân nhắc đã giúp đỡ chúng tôi từ đó đến nay.

##### **Fernando Sanchez đã đóng góp cho bài viết này**.

Bài này được dịch bởi Hoang Tran. Xem bài viết gốc [tại đây]( https://iohk.io/en/blog/posts/2022/01/19/the-bating-heart-of-a-fast-growing-network)

*Dự án này được tài trợ bới Catalyst*
