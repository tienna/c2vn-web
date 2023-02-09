# Ouroboros Genesis: tăng cường bảo mật trong một môi trường năng động

### **Ouroboros Genesis đến với Cardano vào năm 2023. Tính năng chính của Genesis là cho phép người tham gia tham gia mạng một cách an toàn mà không cần phải tin tưởng các đồng nghiệp đã chọn để cung cấp ảnh chụp nhanh chính xác về trạng thái chuỗi khối hiện tại. đọc tiếp**

![](img/2023-02-09-ouroboros-genesis-enhanced-security-in-a-dynamic-environment.002.png) 9 Tháng hai 2023 ![](img/2023-02-09-ouroboros-genesis-enhanced-security-in-a-dynamic-environment.002.png) [Christian Badertscher](/en/blog/authors/christian-badertscher/page-1/) ![](img/2023-02-09-ouroboros-genesis-enhanced-security-in-a-dynamic-environment.003.png) 6 phút đọc

![Christian Badertscher](img/2023-02-09-ouroboros-genesis-enhanced-security-in-a-dynamic-environment.004.png)[](/en/blog/authors/christian-badertscher/page-1/)

### [**Christian Badertscher**](/en/blog/authors/christian-badertscher/page-1/)

Nhà nghiên cứu

Nghiên cứu học thuật

- ![](img/2023-02-09-ouroboros-genesis-enhanced-security-in-a-dynamic-environment.005.png)[](mailto:christian.badertscher@iohk.io "E-mail")

![Ouroboros Genesis: tăng cường bảo mật trong một môi trường năng động](img/2023-02-09-ouroboros-genesis-enhanced-security-in-a-dynamic-environment.006.png)

[Ouroboros Genesis](https://www.essentialcardano.io/glossary/ouroboros-genesis) là một giao thức chuỗi khối bằng chứng cổ phần (PoS) mở rộng tiền thân của nó - [Ouroboros Praos](https://www.essentialcardano.io/glossary/ouroboros-praos) .

Trước tiên, chúng ta hãy nhớ lại rằng Ouroboros là một [giao thức PoS kiểu Nakamoto](https://iohk.io/en/research/library/papers/ouroboros-a-provably-secure-proof-of-stake-blockchain-protocol/) với khả năng phục hồi tích hợp sẵn đối với sự tham gia có khả năng biến động mạnh. Điều này có nghĩa là nó có khả năng phục hồi trước nhiều thách thức có thể phát sinh từ sự cố mạng, cấu hình sai của các nút hoặc điều kiện chủng tộc có thể gây ra thời gian ngừng hoạt động của nút. Ouroboros được chứng minh là an toàn miễn là chưa đến một nửa tổng số cổ phần đang hoạt động nằm trong tay những kẻ độc hại. Và ngay cả khi giả định này tạm thời bị vi phạm, Ouroboros sẽ nhanh chóng tự phục hồi sau khi tình trạng đa số trung thực được giữ lại. Một [bài báo nghiên cứu năm 2020 của IOG](https://eprint.iacr.org/2020/1021.pdf) phân tích tình huống này.

Một câu hỏi quan trọng và thường bị bỏ qua trong các hệ thống PoS động trong một thời gian dài là: làm thế nào các bên có thể tham gia hoặc tham gia lại hệ thống một cách an toàn với cùng một giả định bảo mật – và đặc biệt là không cần dựa vào các đồng nghiệp đáng tin cậy cung cấp phiên bản chính xác của hệ thống hiện tại. chuỗi khối? Câu hỏi này được coi là một nhược điểm lớn đối với các hệ thống PoS – cho đến khi một [bài báo nghiên cứu năm 2018 của IOG](https://eprint.iacr.org/2018/378.pdf) đề xuất một giải pháp cho vấn đề này. Bài đăng này giải thích tầm quan trọng và ý tưởng chính đằng sau Genesis.

## **Tầm quan trọng của tính sẵn sàng động**

Tính khả dụng động trong cài đặt chuỗi khối có thể được coi là thuộc tính cho phép [các nút](https://www.essentialcardano.io/glossary/node) tạo khối hoạt động trực tuyến và ngoại tuyến mà không cần thông báo trước. Đồng thời, hệ thống vẫn hoạt động cho mọi cấp độ tham gia và vẫn an toàn miễn là (trong số các nút đang hoạt động) hơn 50% tài nguyên, chẳng hạn như sức mạnh tính toán bằng Bitcoin hoặc cổ phần trong Cardano được kiểm soát bởi những người tham gia trung thực. Cơ chế đồng thuận, với mục đích là đưa tất cả các nút vào thỏa thuận, sử dụng các tài nguyên đó để bầu ra các nhà lãnh đạo có quyền mở rộng chuỗi khối bằng một khối chứa các giao dịch hợp lệ.

Trong bối cảnh này, tính khả dụng động mang lại sự sống động cho mạng nâng cao và rất cần thiết cho một hệ thống phi tập trung thực sự, vì không phải tất cả các nút đều có thể được coi là trực tuyến liên tục. Tuy nhiên, để hoàn thành câu chuyện này, các nút phải có khả năng dễ dàng tham gia lại hệ thống, chỉ bằng cách quan sát mạng và biết khối gốc. Bất kỳ giả định tin cậy nào khác, như yêu cầu đối với các trạm kiểm soát được phục vụ bởi các đồng nghiệp đáng tin cậy, đều đi ngược lại tầm nhìn về phân quyền.

Vào năm 2018, nghiên cứu của IOG đã trình bày và phân tích thuật toán Ouroboros Genesis có thể đáp ứng các yêu cầu trên trong một mô hình mật mã mạnh. Thuật toán Genesis về cơ bản là Praos, với một quy tắc lựa chọn chuỗi mới được bổ sung cho phép các bên tham gia và khởi động chuỗi khối một cách an toàn mà không cần lời khuyên đáng tin cậy hoặc bất kỳ trợ giúp nào khác, chẳng hạn như kiến thức về tính khả dụng trong quá khứ.

## **Đảm bảo an ninh thông qua quy tắc lựa chọn chuỗi**

Genesis có cấu trúc tương tự Ouroboros Praos. Trên thực tế, xem xét trường hợp tất cả các bên luôn sẵn sàng, hai giao thức hoạt động giống hệt nhau. Tuy nhiên, khi nói đến tính khả dụng động, các bên mới tham gia cần có lời khuyên trong Praos: để có thể mở rộng chuỗi dài nhất một cách an toàn. Những người mới đến trước tiên phải được biết về trạng thái sổ cái (đúng) hiện tại, ví dụ: bằng cách hỏi các đồng nghiệp đáng tin cậy. Nếu kẻ tấn công có thể cung cấp một chuỗi giả cho những người mới đó, thì có thể ngăn họ tham gia và đóng góp vào hiệu suất và bảo mật của hệ thống. Vậy, làm thế nào Sáng-thế Ký tránh được những lời khuyên đáng tin cậy như vậy? Sự đổi mới kỹ thuật nằm trong quy tắc lựa chọn chuỗi mới.

Nói một cách đơn giản, hãy nghĩ về lựa chọn chuỗi như một bộ lọc. Bộ lọc này, khi được hiển thị với tất cả các chuỗi khối được quan sát trên mạng, sẽ phát hiện chuỗi khối *hữu ích nhất* cho hệ thống. Về nguyên tắc, theo sự đồng thuận của Nakamoto, cách tiếp cận là đi theo chuỗi dài nhất. Mặc dù điều này tốt cho Bitcoin, nhưng trong trường hợp PoS [, quy tắc chuỗi dài nhất đơn giản không phải là một ý tưởng hay](https://eprint.iacr.org/2018/248.pdf) : kẻ thù có thể rẽ nhánh từ một chuỗi trung thực và tiếp tục tạo các khối một cách riêng tư. Sau một khoảng thời gian đáng kể (theo thứ tự vài kỷ nguyên), đối thủ về cơ bản sẽ là cổ đông lớn nhất trong chuỗi riêng tư của anh ta và do đó có thể tạo khối nhanh hơn nhiều so với chuỗi trung thực, cuối cùng vượt qua nó về chiều dài. Lời khen ngợi và các thuật toán PoS khác ngăn chặn việc bị lừa vào một chuỗi bất lợi như vậy bằng cách đưa ra các điểm kiểm tra luân phiên mà tất cả các chuỗi cần phải tuân thủ. Như đã đề cập ở trên, việc giới thiệu các trạm kiểm soát như vậy có nhược điểm là các bên tham gia cần có lời khuyên đáng tin cậy.

Vậy thì cái gì có thể làm được? Thông tin chi tiết quan trọng là bất cứ khi nào một đối thủ tách khỏi một chuỗi trung thực nào đó và mở rộng chuỗi đó một cách riêng tư, thì đối thủ đó không thể tránh khỏi thực tế là bất kỳ chuỗi riêng nào như vậy đều có một phân đoạn vị trí ban đầu, ngay sau điểm rẽ nhánh, ít dày đặc hơn (có ít khối hơn) so với chuỗi mà những người tham gia trung thực tạo ra cho phân khúc đó. Điều này có thể được tận dụng để phân biệt cái tốt với cái xấu và do đó cũng để loại bỏ các điểm kiểm tra luân phiên nói trên bằng cách đưa ra một quy tắc lựa chọn chuỗi mới.

Giả sử một người mới bắt đầu từ khối genesis làm chuỗi ban đầu. Bất cứ khi nào một chuỗi mới được nhìn thấy trên mạng, người mới này sẽ so sánh chuỗi được tổ chức cục bộ với chuỗi mới theo mật độ trong phân khúc cụ thể đó sau khi hai chuỗi bắt đầu rẽ nhánh từ nhau. Người mới chỉ chấp nhận chuỗi mới nếu nó dày đặc hơn trong phân khúc đó và tiếp tục lặp lại quy trình này với các chuỗi mới nhận khác. Theo quan sát ở trên, có thể kết luận rằng khi người mới tình cờ quan sát thấy chuỗi thực tế được hỗ trợ bởi phần lớn cổ phần trung thực đang hoạt động trong mạng, thì chuỗi này sẽ được chấp nhận. Do đó, người mới tham gia khóa trạng thái của chuỗi khối chính xác như những người tham gia đã hoạt động khác làm.

Để có lập luận kỹ thuật hoàn chỉnh, hãy tham khảo [tài liệu nghiên cứu năm 2018](https://eprint.iacr.org/2018/378.pdf) và xem phần [trình bày về Ouroboros Genesis](https://www.youtube.com/watch?v=LCeK_4o-NCc) của Aggelos Kiayias.

Tóm lại, quy tắc lựa chọn chuỗi cho phép Ouroboros xử lý liền mạch các thay đổi về số lượng bên đang hoạt động theo cách phi tập trung bằng cách khởi động từ khối genesis và giữ an toàn, miễn là những người tham gia trung thực nắm giữ phần lớn cổ phần đang hoạt động.

**Khi nào trên Cardano?**

Cardano hiện đang chạy trên Ouroboros Praos và các nhóm đã làm việc để thiết kế lại sự đồng thuận. Có một nguyên mẫu Genesis đang hoạt động một phần, đang được điều chỉnh để đạt được hiệu suất và được kiểm tra để tìm các hướng tấn công mới. Các nhóm cũng đã làm việc để triển khai độc lập logic ngắt kết nối Genesis, đây là thành phần chính của quá trình triển khai. Logic này hiện đang trong quá trình thử nghiệm và yêu cầu các nỗ lực tích hợp bổ sung.

Nếu bạn quan tâm đến quá trình phát triển, hãy xem [lộ trình Genesis này](https://github.com/input-output-hk/ouroboros-network/blob/a626c84f6df585dd27d735eb7eec73904a1f570e/ouroboros-consensus/docs/2023-Jan-Genesis-roadmap.md) . Để theo dõi, hãy theo dõi [các cập nhật kỹ thuật từ nhóm đồng thuận](https://input-output-hk.github.io/cardano-updates/tags/consensus) và các kênh [truyền thông IOG](https://twitter.com/InputOutputHK?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor) .

*Olga Hryniuk đã đóng góp cho bài đăng trên blog này.*
