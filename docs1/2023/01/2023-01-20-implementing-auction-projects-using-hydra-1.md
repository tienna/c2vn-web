# Triển khai các dự án đấu giá bằng Hydra

### **IOG và MLabs hợp tác để phát triển triển khai phiên đấu giá tham chiếu bằng giao thức Hydra**

![](img/2023-01-20-implementing-auction-projects-using-hydra-1.002.png) 20 tháng một 2023 ![](img/2023-01-20-implementing-auction-projects-using-hydra-1.002.png) [Olga Hryniuk](/en/blog/authors/olga-hryniuk/page-1/) ![](img/2023-01-20-implementing-auction-projects-using-hydra-1.003.png) 4 phút đọc

![Olga Hryniuk](img/2023-01-20-implementing-auction-projects-using-hydra-1.004.png)[](/en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](/en/blog/authors/olga-hryniuk/page-1/)

Nhà văn kỹ thuật cao cấp

Tiếp thị &amp; Truyền thông

- ![](img/2023-01-20-implementing-auction-projects-using-hydra-1.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2023-01-20-implementing-auction-projects-using-hydra-1.006.png)[](https://github.com/olgahryniuk "GitHub")

![Triển khai các dự án đấu giá bằng Hydra](img/2023-01-20-implementing-auction-projects-using-hydra-1.007.png)

Input Output Global, Inc. (IOG) và MLabs Ltd. (MLabs) đang hợp tác phát triển triển khai phiên đấu giá tham chiếu bằng giao thức Hydra. Kết quả đầu tiên của sự hợp tác này là một [bài báo](https://iohk.io/en/blog/posts/2023/01/20/implementing-auction-projects-using-hydra/) phác thảo các cách tiếp cận khả thi để triển khai đấu giá tài sản kỹ thuật số bằng giao thức Hydra Head với những ưu điểm tương ứng và những hạn chế hiện tại. Bài đăng này giới thiệu một bản tóm tắt ngắn gọn về các chủ đề được trình bày chi tiết hơn trong bài báo.

Sự hợp tác này nhằm mục đích chứng minh tính khả thi của việc triển khai giao thức Hydra Head hiện tại để phát triển các ứng dụng đấu giá. Việc triển khai tham chiếu được đề xuất cũng xác định và điều chỉnh một cách xây dựng thiết kế giao thức Hydra Head với các trường hợp sử dụng cụ thể trong hệ sinh thái Cardano.

## **Một từ về đấu giá**

Đấu giá phi tập trung sử dụng hợp đồng thông minh để thực hiện giao dịch giữa người mua và người bán.

Lợi ích của đấu giá blockchain bao gồm:

![](img/2023-01-20-implementing-auction-projects-using-hydra-1.008.png)

## **Chạy đấu giá trên Cardano**

[Giao thức Hydra Head](https://hydra.family/head-protocol/) là một giải pháp khả năng mở rộng lớp 2 trên Cardano. Giao thức này bao gồm các hợp đồng thông minh và phần mềm cho phép bất kỳ nhóm người tham gia nào thiết lập các kênh trạng thái đa bên, đẳng cấu ( [Hydra Heads](https://iohk.io/en/blog/posts/2022/02/03/implementing-hydra-heads-the-first-step-towards-the-full-hydra-vision/) ) với nhau.

Các kênh Hydra Head có lợi cho việc chạy đấu giá trên Cardano vì các giải pháp lớp 2 cung cấp các khả năng tốt hơn về:

![](img/2023-01-20-implementing-auction-projects-using-hydra-1.009.png)

## **Thiết kế đấu giá Hydra Head**

Cardano có thể chạy các loại đấu giá khác nhau bằng giao thức Hydra Head. Các thiết kế đấu giá trên một Đầu có thể bao gồm đấu giá một đầu cơ bản, đấu giá bí mật một đầu, đấu giá giám sát được ủy quyền, đấu giá chứng từ hoặc đấu giá chứng từ được ủy quyền. Các thiết kế đấu giá trên mạng của Hydra Heads có thể bao gồm các trường hợp như đấu giá hình ngôi sao hoặc đấu giá lược đồ chòm sao.

Để triển khai đấu giá tham chiếu bằng giao thức Hydra Head, các nhóm đã chọn thiết kế đấu giá phiếu thưởng được ủy quyền bao gồm các tính năng đấu giá kiểu Anh cốt lõi.

Để biết phân tích chi tiết về các tùy chọn khả thi cùng với lợi ích và hạn chế của chúng, hãy xem toàn bộ bài viết được liên kết bên dưới.

Thiết kế ban đầu của phiên đấu giá nhằm cung cấp các tính năng sau:

- Một nhóm đại biểu có thể mở một Hydra Head có khả năng tổ chức đấu giá cho tài sản NFT do người bán cung cấp.
- Người bán có thể phân phối quyền tham gia (ví dụ: thông qua mã thông báo tham gia) trong cuộc đấu giá cho những người đặt giá thầu tiềm năng đã khóa khoản tiền gửi được khấu trừ của họ trong hợp đồng thông minh cho cuộc đấu giá.
- Mỗi người đặt giá thầu có thể gửi giá thầu cho cuộc đấu giá bằng cách gửi nó cho một trong những người được ủy quyền, người này sau đó sẽ phát nó cho những người được ủy quyền còn lại.
- Các đại biểu có thể xác nhận chung các giá thầu bằng cách ký nhiều lần thông qua giao thức Hydra Head, do đó bao gồm các giá thầu trong trạng thái sổ cái Hydra Head.
- Khi thời hạn đấu giá trôi qua, các đại biểu có thể giải quyết dứt khoát các giá thầu trong Hydra Head để xác định giá thầu chiến thắng.
- Các đại biểu có thể đóng Hydra Head:
    - Nếu cuộc đấu giá được giải quyết, một phiếu thưởng có thể được cấp cho người đấu giá thắng cuộc, cho phép người đấu giá thắng cuộc mua lại tài sản NFT của người bán để đổi lấy số tiền đấu thầu.
    - Nếu cuộc đấu giá không được giải quyết, các giá thầu của nó có thể được giải quyết trên lớp 1 để xác định giá thắng cuộc, và *sau đó* phiếu thưởng có thể được cấp cho người thắng cuộc.
- Những người đấu giá thua cuộc có thể đổi lại khoản tiền đặt cọc được khấu trừ của họ khi Hydra Head của cuộc đấu giá đóng cửa và cuộc đấu giá được giải quyết.
- Người đấu giá thắng cuộc có thể sử dụng số tiền trong khoản tiền gửi được khấu trừ của mình để thanh toán cho người bán tài sản NFT.
- Khi chứng từ được cấp cho người đấu giá thắng cuộc, thời hạn được đặt để mua lại tài sản NFT của người bán. Nếu người thắng đấu giá không mua lại tài sản NFT của người bán trước thời hạn, người bán có thể yêu cầu khoản đặt cọc được khấu trừ của người đấu giá thắng.
- Phiếu thưởng UTXO chỉ có thể được sử dụng bởi người đấu giá thắng cuộc để đổi lấy NFT của người bán hoặc bởi người bán để yêu cầu khoản đặt cọc được khấu trừ của người đấu giá thắng cuộc sau thời hạn đổi thưởng.

## **Tìm hiểu thêm từ bài báo**

Nếu bạn muốn tìm hiểu thêm, hãy đọc bài viết này **' [Triển khai các dự án đấu giá bằng cách sử dụng Hydra'](https://iohk.io/en/blog/posts/2023/01/20/implementing-auction-projects-using-hydra/) .**

Bài viết phản ánh về:

- Nhu cầu hiện tại của các dự án chạy đấu giá tài sản kỹ thuật số (ví dụ: thị trường NFT) trong hệ sinh thái Cardano và những thách thức mà họ gặp phải trên chuỗi lớp 1 Cardano.
- Việc phân tích các thách thức và yêu cầu đề xuất các thiết kế đấu giá có thể sử dụng Hydra để chạy đấu giá tài sản kỹ thuật số và ý nghĩa tương ứng của chúng đối với tính sống động, phân cấp, bảo mật và hiệu quả.
- Việc thực hiện thiết kế đấu giá Hydra Head được đề xuất dựa trên khả năng hiện tại.
- Các cải tiến được đề xuất cho giao thức Hydra Head hiện tại cùng với các phần mở rộng được đề xuất cho dòng giao thức Hydra để mang lại lợi ích cho việc chạy đấu giá tài sản kỹ thuật số.

Để tham gia, hãy tham gia [kênh Discord này](https://discord.gg/Qq5vNTg9PT) hoặc tham gia [các cuộc thảo luận trên GitHub](https://github.com/input-output-hk/hydra/discussions) .
