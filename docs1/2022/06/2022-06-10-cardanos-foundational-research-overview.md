# Tổng quan nghiên cứu mang tính nền tảng của Cardano

### **Đây là bài đầu tiên trong một loạt các bài blog giúp chúng ta có cái nhìn rõ hơn về nghiên cứu mang tính nền tảng của Cardano**

![](img/2022-06-10-cardanos-foundational-research-overview.002.png) 10 tháng 6 năm 2022 ![](img/2022-06-10-cardanos-foundational-research-overview.002.png) [Olga Hryniuk](/en/blog/authors/olga-hryniuk/page-1/) ![](img/2022-06-10-cardanos-foundational-research-overview.003.png) 5 phút đọc

![Olga Hryniuk](img/2022-06-10-cardanos-foundational-research-overview.004.png)[](/en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](/en/blog/authors/olga-hryniuk/page-1/)

Technical Writer

Marketing &amp; Communications

- ![](img/2022-06-10-cardanos-foundational-research-overview.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2022-06-10-cardanos-foundational-research-overview.006.png)[](https://github.com/olgahryniuk "GitHub")

![Cardano's foundational research overview](img/2022-06-10-cardanos-foundational-research-overview.007.jpeg)

Năm 2015, ngay từ khi thành lập dự án Cardano đã có một mục tiêu rất rõ ràng: thay đổi cách thức thiết kế và phát triển tiền mã hóa. Thay vì việc có duy nhất một white paper có căn cứ xác định, dự án đã kết hợp một loạt các nguyên tắc thiết kế khoa học và kỹ thuật tốt nhất để tạo ra một blockchain vững chắc, tiên phong và được nghiên cứu kĩ lưỡng. Những ý tưởng quan trọng về sự phát triển Cardano đã được trình bày trong bài tiểu luận '[Why Cardano](https://why.cardano.org/en/introduction/motivation/)' và '[Cardano whiteboard](https://www.youtube.com/watch?v=Ja9D0kpksxw)' của Charles Hoskinson. Phương pháp tiếp cận dựa trên nghiên cứu đã định vị Cardano là một nền tảng độc đáo trong số những nền tảng blockchain khác nhau.

Một tập hợp các phương pháp, ý tưởng và đóng góp hay nhất đã hình thành nên nền tảng của Cardano từ đó xây dựng một sổ cái bảo mật, phi tập trung và có thể mở rộng. Hiện đã có một trung tâm nghiên cứu, mà đại diện là [thư viện tài liệu chuyên sâu](https://iohk.io/research/library/) của công ty Input Output Global, số phát hành tại thời điểm viết bài này là 139. Nhiều nghiên cứu trong số đó đã được xét duyệt và thông qua tại các hội nghị học thuật hàng đầu. [Theo Google Scholar](https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=ouroboros&btnG=), bài báo gốc về cơ chế đồng thuận Ouroboros đã được trích dẫn hơn 1.200 lần.

## **Các tài liệu nghiên cứu**

Charles Hoskinson, Giám đốc điều hành IOG, cho biết:

“Phi tập trung đặt ra những thách thức kỹ thuật lớn đối với các hệ thống tài chính trên toàn thế giới và IOG Research quan tâm đến từng vấn đề trong số đó.”

Tầm nhìn của IOG Research là trở thành một tổ chức hàng đầu trong việc nghiên cứu học thuật về cơ sở hạ tầng blockchain và fintech, rộng hơn là các hệ thống phân tán được bảo mật bằng các kỹ thuật mật mã và được khuyến khích thông qua lý thuyết trò chơi về kinh tế. IOG không những đã tạo dựng được danh tiếng của mình trong việc giải quyết những câu hỏi nghiên cứu khó nói chung mà còn xây dựng nền tảng chính thống và đáng tin cậy cho ngành công nghiệp cơ sở hạ tầng blockchain fintech nói riêng.

Trong bài blog này, chúng tôi xem xét một số tài liệu nghiên cứu đặt nền móng cho Cardano.

### **Giao thức đồng thuân Ouroboros**

Bài báo đầu tiên để thúc đẩy nghiên cứu của dự án là ‘[Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol](https://eprint.iacr.org/2016/889.pdf)’, đã được đánh giá xét duyệt về mặt học thuật và được xuất bản tại Crypto 2017.

Sự đồng thuận là một phần quan trọng của các mạng blockchain. Ouroboros là giao thức đồng thuận bằng chứng cổ phần của Cardano. Cái tên 'Ouroboros' xuất phát từ một biểu tượng cổ đại tượng trưng cho sự vĩnh cửu và sự nối tiếp vô tận. Đối với Cardano, Ouroboros tượng trưng cho sự vĩnh cửu về mặt lý thuyết của một blockchain.

Kể từ năm 2017, một số phiên bản giao thức Ouroboros đã được tạo ra. Mỗi phiên bản của Ouroboros được bổ sung các tính năng và chức năng khác nhau để hỗ trợ sự phát triển của Cardano. Bắt đầu với [Ouroboros Classic](https://eprint.iacr.org/2016/889.pdf) , một sổ cái đã được nâng cấp thường xuyên. Ouroboros Classic đã thiết lập nền tảng cho một giao thức đồng thuận bằng chứng cổ phần tiết kiệm năng lượng trong một thiết lập liên kết (chủ đề về sự phát triển kỉ nguyên Byron của Cardano). [Praos](https://eprint.iacr.org/2016/889.pdf), [Genesis](https://eprint.iacr.org/2017/573.pdf) và [Chronos](https://eprint.iacr.org/2017/573.pdf) được thiết kế để đảm bảo tính bảo mật nâng cao trong một thiết lập mở hoàn toàn. Trong khi Genesis cải tiến giao thức Praos, Chronos sẽ làm cho Genesis thậm chí còn mạnh mẽ hơn khi được triển khai. [Bài blog này](https://eprint.iacr.org/2018/378.pdf) sẽ mô tả sự phát triển của Ouroboros một cách chi tiết hơn.

Cùng với công nghệ độc đáo và các cơ chế được xác minh bằng toán học, Ouroboros nhận ra rằng một ‘[Nakamoto-style consensus](https://bitcoin.org/bitcoin.pdf)’ được điều chỉnh để làm bằng chứng cổ phần. Như chúng ta biết, Ouroboros cung cấp những đảm bảo an ninh mạnh mẽ giống như cơ chế đồng thuận bằng chứng công việc của Bitcoin, đồng thời đảm bảo hiệu quả tốt hơn về mặt tiêu thụ năng lượng. Thay vì dựa vào các thợ đào để giải quyết các vấn đề phức tạp về mặt tính toán để tạo ra một khối, những người tham gia bằng chứng cổ phần tạo ra và xác nhận các khối dựa trên cổ phần mà họ kiểm soát trong mạng lưới.

Trong bài đăng trên blog của mình, [The Ouroboros path to decentralization ](https://iohk.io/en/blog/posts/2020/06/23/the-ouroboros-path-to-decentralization/), [Giáo sư Aggelos Kiayias](https://iohk.io/en/blog/posts/2020/06/23/the-ouroboros-path-to-decentralization/), nhà khoa học hang đầu tại IOG và là chủ nhiệm về an ninh mạng và quyền riêng tư tại Đại học Edinburgh, nói:

“Ouroboros là một giao thức sổ cái phi tập trung được phân tích trong bối cảnh thuật toán đồng thuận Byzantine và hành vi phù hợp. Điều làm cho giao thức này trở nên độc đáo là sự kết hợp của các yếu tố thiết kế như cổ phần, tính khả dụng động, thiết lập không cần tin cậy và việc khuyến khích chia sẻ phần thưởng.”

### **Ủy quyền và nhóm cổ phần**

Việc chuyển đổi từ việc thiết lập liên kết sang phân quyền hoàn toàn yêu cầu một số điều chỉnh đối với giao thức. Điều cần thiết là phải cung cấp các phương tiện để quản lý tài khoản thích hợp (để kích hoạt kỹ thuật ủy quyền cổ phần) và khuyến khích sự tham gia.

Bài báo ‘[Account Management in Proof of Stake Ledgers](https://eprint.iacr.org/2020/525.pdf)’ – được xuất bản vào năm 2020 - khám phá những cách để tối đa hóa sự tham gia của những người nắm giữ cổ phần vào các hoạt động duy trì mạng lưới.

Thông thường, các blockchain bằng chứng cổ phần - về bản chất - phụ thuộc vào sự tham gia tích cực của những người nắm giữ cổ phần. Các bên nắm giữ cổ phần cần liên tục trực tuyến để xác thực các giao dịch mạng và tạo ra các khối mới. Tuy nhiên, không phải mỗi người nắm giữ cổ phần đều có khả năng hoặc mong muốn trực tuyến liên tục. Để đảm bảo rằng hệ thống vận hành liên tục và vẫn an toàn trong những điều kiện như vậy, quan trọng phải cho phép người nắm giữ cổ phần tham gia bất kể họ trực tuyến hay không trực tuyến.

Ủy quyền cổ phần giải quyết vấn đề này và cho phép người dùng tham gia vào các hoạt động của mạng lưới bằng cách ủy quyền cổ phần của họ cho những người tham gia khác. Ủy quyền cổ phần làm gia tăng [các stake pool](https://iohk.io/en/blog/posts/2018/10/23/stake-pools-in-cardano/) – chính là các nodes máy chủ nắm giữ quyền đặt cược của nhiều bên nắm giữ cổ phần. Bài báo phân tích và xác định kỹ thuật ủy quyền một cách toán học và cũng triển khai các thuộc tính cốt lõi của ví để xử lý các khoản thanh toán an toàn.

Bài báo ‘[Reward Sharing Schemes for Stake Pools](https://arxiv.org/ftp/arxiv/papers/1807/1807.11218.pdf)’, cũng được xuất bản vào năm 2020, giới thiệu các cơ chế để khuyến khích những người nắm giữ cổ phần tham gia vào các hoạt động của họ.

Sức mạnh của một stake pool đến từ việc tích lũy cổ phần được ủy thác. Để tránh việc độc quyền xác nhận mạng của một pool duy nhất, điều cần thiết là những người tham gia mạng phải được khuyến khích ủy thác cho một nhóm lớn các pool khác nhau.

Kế hoạch chia sẻ phần thưởng mô tả một phương tiện để [khuyến khích](https://iohk.io/en/blog/posts/2020/11/30/blockchain-reward-sharing-a-comparative-systematization-from-first-principles/) các nhà điều hành pool cổ phần (SPO) và người ủy quyền cho các hoạt động của họ như xác thực giao dịch, tạo khối,... Nghiên cứu cho thấy rằng cơ chế phần thưởng được đề xuất hướng mạng lưới đến mức độ phân quyền mong muốn và đặc biệt là nó cung cấp khả năng bảo vệ chống lại các cuộc tấn công Sybil. Điều này được kích hoạt bởi một cơ chế được gọi là [pledging mechanism](https://iohk.io/en/blog/posts/2020/05/12/how-pledging-encourages-a-healthy-decentralized-cardano-ecosystem/), cơ chế này vô hiệu hóa việc hình thành nhiều nhóm cổ phần được kiểm soát bởi một thực thể trong thế giới thực.

Mô hình khuyến khích của Cardano đã thiết lập một hệ sinh thái nơi những người tham gia hợp pháp được hưởng lợi từ việc tuân theo giao thức, từ đó cho phép blockchain Cardano hoạt động an toàn và hiệu quả. Kết quả là một sổ cái phi tập trung được điều hành một cách đáng tin cậy sẽ được bảo mật bằng các kỹ thuật mã hóa và cơ chế phần thưởng theo lý thuyết trò chơi.

*Chờ nhé! Trong các bài viết tiếp theo chúng tôi sẽ xem xét kỹ lưỡng hơn một số tài liệu nghiên cứu đã thiết lập nền móng cho một nền tảng hợp đồng thông minh. Cụ thể, chúng tôi sẽ bắt đầu với nghiên cứu kích hoạt mô hình UTxO mở rộng, giải thích điều đó thực sự có nghĩa là gì và cách nó cho phép sổ cái xử lý hàng loạt tài sản và các mức phí với nhiều lợi ích khác nhau cho người dùng.<br><br>Bài này được dịch bởi Le Nguyen. [với bài gốc](https://iohk.io/en/blog/posts/2022/06/10/cardanos-foundational-research-overview/)<br>*Dự án này được tài trợ bới Catalyst**
