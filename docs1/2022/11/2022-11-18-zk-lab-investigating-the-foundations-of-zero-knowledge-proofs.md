# ZK-Lab – Nghiên cứu nền tảng về Zero Knowledge Proof

### **ZK-Lab là phòng thí nghiệm chị em với Phòng thí nghiệm Công nghệ blockchain Edinburgh hợp tác với IOG để cung cấp các giải pháp blockchain có độ đảm bảo cao**

![](img/2022-11-18-zk-lab-investigating-the-foundations-of-zero-knowledge-proofs.002.png) 18 tháng mười một 2022 ![](img/2022-11-18-zk-lab-investigating-the-foundations-of-zero-knowledge-proofs.002.png) [Olga Hryniuk](/en/blog/authors/olga-hryniuk/page-1/) ![](img/2022-11-18-zk-lab-investigating-the-foundations-of-zero-knowledge-proofs.003.png) 3 phút đọc

![Olga Hryniuk](img/2022-11-18-zk-lab-investigating-the-foundations-of-zero-knowledge-proofs.004.png)[](/en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](/en/blog/authors/olga-hryniuk/page-1/)

Senior Technical Writer

Marketing &amp; Communications

- ![](img/2022-11-18-zk-lab-investigating-the-foundations-of-zero-knowledge-proofs.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2022-11-18-zk-lab-investigating-the-foundations-of-zero-knowledge-proofs.006.png)[](https://github.com/olgahryniuk "GitHub")

![ZK-Lab – Nghiên cứu nền tảng của Zero Knowledge proof](img/2022-11-18-zk-lab-investigating-the-foundations-of-zero-knowledge-proofs.007.png)

Là một công ty nghiên cứu và phát triển blockchain hàng đầu, Input Output Global, Inc. (IOG) hợp tác với các trường đại học và trung tâm nghiên cứu hàng đầu để nghiên cứu công nghệ phân tán và cung cấp các giải pháp blockchain an toàn.

Một bài đăng gần đây đã thảo luận về cách [IOG thiết lập một mạng lưới các tổ chức](https://iohk.io/en/blog/posts/2022/10/25/how-iog-s-research-spans-the-academic-world/) và phòng thí nghiệm cam kết nghiên cứu công nghệ blockchain dựa trên tính chính xác của chức năng và bằng chứng dựa trên nghiên cứu. Bài đăng này xem xét ZK-Lab – một phòng thí nghiệm nghiên cứu nền tảng Zero Knowledge proof (ZKP).

## **Tại sao lại là ZKP?**

Sự trỗi dậy của mô hình tính toán phi tập trung đang làm dấy lên mối quan tâm mới trong việc thiết lập các phương tiện an toàn để các bên có chủ quyền quản lý dữ liệu của chính họ. ZKP cho phép một bên chứng minh với bên kia rằng một tuyên bố hoặc yêu cầu nhất định là đúng mà không cần tiết lộ nội dung của tuyên bố đó.

Lần đầu tiên được đề xuất bởi[Goldwasser, Micali và Rackoff](https://news.mit.edu/2013/goldwasser-and-micali-win-turing-award-0313) trong bài báo cáo năm 1985 'Sự phức tạp về kiến thức của các hệ thống bằng chứng tương tác', ZKP đã thu hút được sự quan tâm của các nhà lý thuyết khoa học cũng như các nhà thực hành. Ban đầu được đánh giá cao về các khía cạnh phức tạp, lý thuyết và nền tảng, ZKP cũng được công nhận là một giải pháp tiềm năng để bảo vệ danh tính kỹ thuật số và giải quyết vấn đề về khả năng mở rộng của Ethereum và các blockchain khác.

Nhiều ứng dụng thực tế hiện tại của ZKP khác nhau về hiệu suất và các giả định về mật mã. Lập luận tri thức ZK không tương tác ngắn gọn ( [SNARKS](https://iohk.io/en/blog/posts/2022/09/01/zk-snarks-updatable-setups-on-the-blockchain/) ) hiện là hệ thống chứng minh hấp dẫn nhất theo quan điểm của người xác minh. SNARKS có thể cải thiện hiệu suất, tính cô đọng và các thuộc tính bảo vệ dữ liệu của hệ thống blockchain và có thể được áp dụng cho nhiều trường hợp sử dụng như ứng dụng khách nhẹ, hợp đồng thông minh, thanh toán, quản lý danh tính kỹ thuật số, bỏ phiếu, v.v.

## **Giới thiệu về ZK-Lab**

ZK-Lab có trụ sở tại Đại học Edinburgh và là phòng thí nghiệm chị em với Phòng thí nghiệm Công nghệ blockchain Edinburgh. ZK-Lab đã được giới thiệu với cộng đồng tại [IO ScotFest: Kỷ nguyên Voltaire](https://iohk.io/en/blog/posts/2022/11/04/announcing-io-scotfest-the-age-of-voltaire/) . Được dẫn dắt bởi [Markulf Kohlweiss](https://iohk.io/en/team/markulf-kohlweiss) , nhà nghiên cứu IOG và là giảng viên cao cấp trong nhóm nghiên cứu bảo mật và quyền riêng tư tại Đại học Edinburgh, ZK-Lab có các cộng sự nghiên cứu sau tiến sĩ và nghiên cứu sinh tiến sĩ.

Phòng thí nghiệm tập trung vào nghiên cứu nền tảng và ứng dụng của ZKP, đặc biệt tập trung vào bảo mật và hiệu suất. Bên cạnh các giao thức ZK, phòng thí nghiệm cũng sẽ nghiên cứu các kỹ thuật phần cứng mã hóa và đáng tin cậy khác để giúp đạt được mục tiêu tính toán an toàn hơn, có thể mở rộng và phi tập trung hơn.

Phòng thí nghiệm được hưởng lợi từ sự hợp tác và [tài liệu nghiên cứu](https://iohk.io/en/research/library/) hiện có. Những thành công trong quá khứ bao gồm các hệ thống bằng chứng zkSNARK như [Sonic](https://iohk.io/en/research/library/papers/sonic-zero-knowledge-snarks-from-linear-size-universal-and-updateable-structured-reference-strings/) , các ứng dụng không kiến thức như [zswap](https://iohk.io/en/research/library/papers/zswap-zk-snark-based-non-interactive-multi-asset-swaps/) và [PEReDi](https://iohk.io/en/research/library/papers/peredi-privacy-enhanced-regulated-and-distributed-central-bank-digital-currencies/) , và một hướng nghiên cứu về các khía cạnh bảo mật trong thế giới thực với [các tài liệu nghiên cứu](https://dblp.org/pid/12/2177.html) như 'Cái nhìn khác về khai thác và ngẫu nhiên hóa zk- của Groth' SNARK', 'Điều gì làm cho phiên bản mô phỏng Fiat-Shamir zkSNARKs (SRS có thể cập nhật) có thể trích xuất được?', 'Giao thức Snarky', và những thứ khác. Các công trình này cùng nhau đặt nền tảng cho các nghiên cứu sâu hơn và triển khai SNARKS trong môi trường blockchain.

ZK-Lab đã vạch ra các mục tiêu và sáng kiến của mình tại IO ScotFest. Một số điểm thảo luận bao gồm:

- Tầm quan trọng của lý thuyết tốt đối với thực hành
- Vai trò của zero-knowledge trong các ứng dụng phi tập trung
- Sự tương tác của zero-knowledge, sổ cái phân tán và tính toán đa bên

Tham gia [sự kiện ảo IO ScotFest](https://iohk.io/en/scotfest) để tìm hiểu thêm về ZK-Lab, các sáng kiến nghiên cứu khác, đồng thời nghe các bài phát biểu và thuyết trình về các thông báo mới của IOG và cập nhật dự án. Bài này được dịch bởi Quang Pham, Review và biên tập bởi Nguyễn Hiệu. Bài viết nguồn [tại đây:](https://iohk.io/en/blog/posts/2022/11/18/zk-lab-investigating-the-foundations-of-zero-knowledge-proofs) Dự án này được tài trợ bới Catalyst.
