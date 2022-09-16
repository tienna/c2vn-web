# Mithril: Một Blockchain mạnh hơn, nhẹ hơn để hiệu quả hơn

### **Một giao thức mới do IOHK phát triển hoạt động với một sơ đồ chữ ký ngưỡng dựa trên cổ phần cho phép tận dụng cổ phần một cách minh bạch, an toàn và nhanh chóng**

![](img/2021-10-29-mithril-a-stronger-and-lighter-blockchain-for-better-efficiency.002.png) 29 tháng 10 năm 2021 ![](img/2021-10-29-mithril-a-stronger-and-lighter-blockchain-for-better-efficiency.002.png) [Olga Hryniuk](tmp//en/blog/authors/olga-hryniuk/page-1/) ![](img/2021-10-29-mithril-a-stronger-and-lighter-blockchain-for-better-efficiency.003.png) 10 phút đọc

![Olga Hryniuk](img/2021-10-29-mithril-a-stronger-and-lighter-blockchain-for-better-efficiency.004.png)[](tmp//en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](tmp//en/blog/authors/olga-hryniuk/page-1/)

Technical Writer

Marketing &amp; Communications

- ![](img/2021-10-29-mithril-a-stronger-and-lighter-blockchain-for-better-efficiency.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2021-10-29-mithril-a-stronger-and-lighter-blockchain-for-better-efficiency.006.png)[](https://github.com/olgahryniuk "GitHub")

![Mithril: Một Blockchain mạnh hơn, nhẹ hơn để hiệu quả hơn](https://github.com/cardano2vn/iohk-blog/blob/main/vi/docs1/2021/10/img/2021-10-29-mithril-a-stronger-and-lighter-blockchain-for-better-efficiency.007.jpeg?raw=true)

Tại [Hội nghị thượng đỉnh Cardano 2021](https://summit.cardano.org/), hai nhà nghiên cứu của IOHK là Pyrros Chaidos và Roman Oliynykov đã trình bày về thiết kế và mục tiêu của Mithril - nỗ lực nghiên cứu và kỹ thuật mới do IOHK thực hiện. Mithril sẽ cung cấp một lược đồ chữ ký ngưỡng dựa trên cổ phần có thể được triển khai như một giao thức. Nó giải quyết các vấn đề về đồng bộ hóa chuỗi, khởi động trạng thái và các vấn đề về tin cậy trong ứng dụng Blockchain.

Mithril là tên của một kim loại hư cấu ở Trung Địa - một vật liệu dễ uốn, trọng lượng rất nhẹ nhưng bền như 'thép Triple', không bị xỉn màu hoặc ăn mòn. Do đó, cái tên này tượng trưng cho sức mạnh về mặt bảo mật và tiếp cận một cách gọn nhẹ đối với giao thức đã phát triển.

## **Sử dụng cổ phần để tổng hợp chữ ký**

Hãy bắt đầu với một số thông tin cơ bản để hiểu lợi ích của Mithril đối với sự phát triển của các giải pháp Blockchain.

Cardano là một Blockchain sử dụng Bằng chứng cổ phần (POS). Do đó, thuật toán đồng thuận sẽ chọn ngẫu nhiên các node để trở thành người sản xuất Block theo số lượng cổ phần mà họ nắm giữ. Đối với một số thông điệp hoặc hành động nhất định, điều quan trọng là một số lượng các bên liên quan phải cung cấp chữ ký mã hoá của họ. Giao thức đồng thuận xác định cách các node riêng lẻ đánh giá trạng thái hiện tại của hệ thống sổ cái và có 3 trách nhiệm chính:

- Thực hiện kiểm tra kế hoạch phân bổ Block và quyết định xem có tạo Block hay không
- Xử lý việc lựa chọn chuỗi
- Xác minh các Block được sản xuất.

Để đạt được khả năng mở rộng hơn trong cách thiết kế một Blockchain, điều cần thiết là phải giải quyết sự phức tạp của các hoạt động quan trọng phụ thuộc vào Logarit về số lượng người tham gia. Điều này có nghĩa là số lượng người tham gia càng cao (số lượng rất lớn), thì việc tổng hợp *hiệu quả* chữ ký của họ càng trở nên phức tạp hơn. Trong một kịch bản cơ sở, để giả định một chữ ký thể hiện cho đa số các bên liên quan, mọi bên liên quan cần phải ký vào thông điệp cá nhân thích hợp. Mặc dù điều này là có thể, nhưng nó không hiệu quả về khả năng mở rộng và tốc độ.

Đối với thời gian cần thiết để xác thực một thông báo cụ thể và việc sử dụng tài nguyên trong quá trình đồng bộ hóa chuỗi, điều quan trọng là phải cung cấp một giải pháp giúp tổng hợp đa chữ ký nhanh chóng và hiệu quả mà không ảnh hưởng đến các tính năng bảo mật.

## **Thiết kế giao thức Mithril**

Mithril là một giao thức được thiết kế để:

- Tận dụng cổ phần để đạt được hiệu quả cao hơn
- Đảm bảo thiết lập minh bạch trong khi không yêu cầu cài đặt tin cậy cao hơn
- Tận dụng sự cân bằng giữa kích thước và hiệu quả, được đảm bảo bởi thành phần mô-đun thiết kế.

Mithril hoạt động công khai, người ký không cần phải tương tác với những người ký khác để tạo ra chữ ký hợp lệ. Người tổng hợp sẽ tổng hợp tất cả các chữ ký thành một và quá trình này là Logarit đối với số lượng chữ ký, dẫn đến hiệu suất  tuyến tính dưới cho phép tổng hợp Mithril. Ví dụ: khi được áp dụng cho các node đầy đủ như Daedalus, Mithril có thể tăng cường đồng bộ hóa dữ liệu cho node đầy đủ, đảm bảo tốc độ và giảm mức tiêu thụ tài nguyên.

Để thể hiện một phần đáng kể trong tổng số lượng cổ phần, Mithril sử dụng thiết lập *ngưỡng* dựa trên số lượng cổ phần. Điều này khác với thiết lập tiêu chuẩn, trong đó số lượng người tham gia nhất định được yêu cầu để xác thực một thông điệp cụ thể. Trong thiết lập ngưỡng dựa trên số lượng cổ phần, giao thức yêu cầu một phần nhỏ của tổng số lượng cổ phần để xác thực một thông điệp nhất định nhằm tạo ra một chữ ký chính xác.

Mithril cũng chứng nhận sự đồng thuận trong một môi trường không cần lòng tin. Điều này nghĩa là nó không bao gồm bất kỳ giả định tin cậy bổ sung nào. Có thể đạt được chứng nhận đồng thuận mà không bao gồm bất kỳ giả định bổ sung nào, ngoài những giả định đã có trong bằng chứng cổ phần. Ví dụ: nó có thể hoạt động trong Ví như một dịch vụ và ứng dụng khách di động sẽ sử dụng chứng chỉ thu được từ một node Mithril. Với cài đặt bảo mật nâng cao, quy trình như vậy có khả năng hiệu quả hơn so với xác minh SPO Blockchain.

Cuối cùng, để đảm bảo việc khởi động trạng thái chuỗi một cách nhanh chóng, sơ đồ chữ ký cho phép các bên liên quan khác nhau chỉ xác nhận một điểm kiểm tra nhất định của chuỗi. Các bên liên quan không cần phải xem toàn bộ lịch sử giao dịch của trạng thái nhất định - họ chỉ cần thông qua các trạm kiểm soát để xác minh rằng cổ phần cuối cùng là hợp lệ. Điều này có lợi cho các ứng dụng khách nhẹ như Ví nhẹ cần hoạt động nhanh mà không cần đồng bộ hóa toàn bộ dữ liệu của Blockchain. Chữ ký Mithril cũng có thể hữu ích cho việc xác minh kiểm đếm nhanh chóng hoặc ra quyết định quản trị đối với tiền mã hoá.

## **Mithril hoạt động như thế nào?**

Mithril cho phép chữ ký của nhiều bên bằng cách nắm giữ một số xổ số riêng lẻ (*M*) và coi một thông điệp là hợp lệ nếu nó đã được ký bởi một số người chiến thắng khác nhau (*K*) đối với các xổ số đó. Do đó, mỗi người dùng cố gắng ký vào thông điệp. Sau đó họ chuyển chữ ký thông qua một chức năng xổ số. Chức năng này cho phép người dùng cá nhân kiểm tra xem chữ ký của họ có đủ điều kiện là người trúng xổ số hay không và xuất ra những chữ ký đó mà không cần chờ đợi. Điều này khác với thiết lập tiêu chuẩn, ở đó các Slot Leader cần đợi cho đến khi Slot của họ hoạt động để tham gia. Khi có chữ ký qua các loại xổ số khác nhau, chúng có thể được tổng hợp thành một chữ ký Mithril duy nhất.

**Các giai đoạn**

Thiết kế của Mithril bao gồm 3 giai đoạn:

![Thiết kế Mithril](img/2021-10-29-mithril-a-stronger-and-lighter-blockchain-for-better-efficiency.008.jpeg)

Hình 1. Các giai đoạn hoạt động của Mithril

**Thiết lập tham số**

Để thiết lập giao thức Mithril, người dùng cần:

- Cố định thiết lập nhóm nơi mật mã sẽ diễn ra
- Chọn phạm vi chỉ số *M*, là số cuộc bầu cử mà họ sẽ tổ chức
- Đặt kích thước túc số *K*, là số lượng người thắng cử cần phải ký chữ ký để được chấp nhận.

Việc cung cấp một chuỗi tham chiếu cho hệ thống bằng chứng  cũng rất quan trọng. Điều này có thể thực hiện một cách minh bạch và không yêu cầu bất kỳ giả định tin cậy cao nào.

**Khởi tạo**

Trong giai đoạn này, người dùng nên *cập nhật phân phối trạng thái.* Điều này cho phép mọi bên liên quan biết họ đang nắm giữ cổ phần nào. Sau đó, mỗi bên liên quan có trách nhiệm *đăng ký khóa của họ*. Điều này có thể xảy ra trên chuỗi (On-Chain) hoặc ngoài chuỗi (Off-Chain).

Cuối cùng, người dùng cần *phân phối cổ phần và nén các khóa kiểm tra của họ*. Điều này được thực hiện bằng cách sử dụng [Merkle Tree](https://docs.cardano.org/glossary/#merkletree). Chức năng này cho phép các chữ ký Mithril được xác minh dựa trên một hàm băm duy nhất đại diện cho Merkle Tree đó. Vì vậy, kích thước trạng thái cần thiết lập để xác minh chữ ký có thể được giữ ở mức thấp.

**Hoạt động**

Trong khi làm việc với chuỗi, người dùng có thể tạo, tổng hợp và xác minh chữ ký Mithril. Việc tạo chữ ký liên quan đến việc người dùng cố gắng kiểm tra xem chữ ký mà họ tạo ra có thực sự là người chiến thắng ở một trong các lần quay xổ số được tổ chức song song hay không. Nếu đúng, người dùng sẽ phát tán đi chữ ký của họ. Nếu có đủ chữ ký hỗ trợ một thông điệp cụ thể qua các lần quay xổ số khác nhau, chúng có thể được tổng hợp thành một chữ ký Mithril duy nhất. Sau đó, nó có thể được truyền phát và xác minh bởi bất kỳ ai chỉ sử dụng chuỗi tham chiếu cho hệ thống bằng chứng và phân phối cổ phần băm Merkle Tree rất nhanh.

Ví dụ: một người dùng có thể tạo chữ ký với Mithril như sau:

![Chữ ký Mithril](img/2021-10-29-mithril-a-stronger-and-lighter-blockchain-for-better-efficiency.009.jpeg)

Hình 2. Quá trình tạo chữ ký Mithril

Đầu tiên, người dùng sẽ kiểm tra số cổ phần mà họ nắm giữ và chuyển nó qua một chức năng tính điểm để nhận được ngưỡng điểm *T* của họ. Sau đó, họ sẽ cố gắng tạo ra một chữ ký ứng viên *S.* Đối với mỗi chỉ số, họ sẽ đánh giá xem chữ ký ứng viên có tương ứng với thông điệp mà họ vừa ký hay không. Số chỉ số của xổ số mà họ đang kiểm tra cũng phải tạo ra một giá trị điểm nhỏ hơn ngưỡng *T* của họ. Nếu điều đó là đúng, thì chữ ký ứng viên mà họ đưa ra đã thực sự trúng xổ số trên số chỉ số cụ thể đó. Nếu không, họ sẽ thực hiện lần tiếp theo.

Sau khi thử tất cả các chỉ số có thể có, người dùng có thể sẽ có một hoặc nhiều chỉ số mà chữ ký *S* của họ là hợp lệ. Đối với mỗi chỉ số đó, họ có thể xuất ra một chữ ký riêng bao gồm chữ ký ứng viên, số chỉ số hợp lệ và bằng chứng xác minh rằng điểm của họ phù hợp với số cổ phần đã đăng ký.

## **Kiến trúc mạng lưới**

Triển khai Mithril trên Cardano, chúng tôi có thể biểu diễn tương tác phần mềm như sau:

![Kiến trúc mạng lưới Mithril](img/2021-10-29-mithril-a-stronger-and-lighter-blockchain-for-better-efficiency.010.jpeg)

Hình 3. Kiến trúc mạng lưới Mithril

Một đại diện cấp cao của phần mềm xung quanh nhà điều hành nhóm cổ phần (SPO) bao gồm kết nối của nó với mạng ngang hàng Cardano (P2P), mạng P2P của node Mithril và ứng dụng khách Mithril được kết nối với node do SPO vận hành.

Node Mithril trên nền tảng SPO truy cập vào Blockchain đã được xác minh tại kho lưu trữ cục bộ và chạy giao thức để tạo ra các chứng chỉ Mithril được lưu giữ tại kho lưu trữ Mithril. Các chứng chỉ Mithril đã sản xuất có thể được đồng bộ hóa và kiểm chứng được trên toàn bộ mạng lưới. Do đó, SPO có thể chia sẻ toàn bộ dữ liệu trên Cardano Blockchain *và* danh sách các chứng chỉ Mithril hợp lệ. Khi ứng dụng khách Mithril kết nối với mạng lưới, nó yêu cầu một danh sách các chứng chỉ Mithril và chỉ yêu cầu chuỗi dài nhất của Cardano Blockchain.

Một số SPO cũng có thể tham gia vào một thiết lập như vậy. Sau đó, ứng dụng khách Mithril sẽ xác minh rằng các chứng chỉ xác nhận đầy đủ mà Cardano Blockchain thu được. Toàn bộ quy trình này tốn ít tài nguyên và sẽ không yêu cầu sự tham gia của các tài nguyên tính toán hoặc lưu trữ mạng đáng kể. Hơn nữa, đồng bộ hóa đầy đủ node Cardano và đồng bộ hóa nhanh với giải pháp Mithril không loại trừ lẫn nhau - chúng có thể chạy song song. Sau này, đồng bộ hóa nhanh Mithril sẽ được xác nhận đồng bộ hóa bởi node đầy đủ.

## **Các trường hợp sử dụng**

Chúng ta hãy xem xét các trường hợp sử dụng mà việc áp dụng Mithril rất có lợi.

Mithril tăng cường hiệu quả của các ứng dụng khách hoặc ứng dụng node đầy đủ như ví [Daedalus](https://www.google.com/url?q=https://docs.cardano.org/cardano-components/daedalus-wallet&sa=D&source=editors&ust=1633506174851000&usg=AOvVaw1TSia4xDEiu6-d-ClvqO6a). Nó đảm bảo sự đồng bộ hóa nhanh chóng và an toàn của dữ liệu node đầy đủ, cải thiện đáng kể thời gian và tài nguyên cần thiết bao gồm tính toán, trao đổi mạng và lưu trữ cục bộ trong khi vẫn đảm bảo tính bảo mật cao.

Mithril cũng có thể áp dụng cho *các ứng dụng khách nhẹ và  ứng dụng di động*, đảm bảo cách tiếp cận không cần lòng tin. Một lợi thế đáng kể khác là sử dụng chữ ký Mithril để chạy các *Sidechain*. Blockchain chính có thể kết nối với các Sidechain khác nhau, thậm chí có thể có các giao thức đồng thuận khác nhau. Mithril có lợi ích trong việc xác minh trạng thái Blockchain mà tốn rất ít tài nguyên. Do đó, các chứng chỉ có thể xác thực trạng thái hiện tại của Blockchain cũng như tính đúng đắn của việc chuyển tiếp và lan truyền một cách an toàn.

Cuối cùng, các ứng dụng bỏ phiếu dựa trên cổ phần và các giải pháp quản trị có thể sử dụng Mithril mà không cần lo về mức độ phức tạp của giao thức bỏ phiếu. Chữ ký Mithril có thể được sử dụng để xác minh kiểm đếm an toàn và tốn ít tài nguyên. Điều này cũng hữu ích trong quản trị khi các bên liên quan trải qua quá trình ra quyết định phi tập trung. Họ đưa ra kết quả cuối cùng một cách dễ dàng và có thể kiểm chứng được.

## **Triển khai**

Một số công ty đã quan tâm đến việc triển khai Mithril trong các giải pháp Blockchain của họ. [Galois](https://galois.com/research-development/), một công ty nghiên cứu và phát triển tiên tiến tập trung vào các phương pháp chính thức, mật mã và phần cứng, sẽ triển khai nguyên mẫu Mithril đầu tiên dựa trên nghiên cứu do IOHK thực hiện. Galois sẽ triển khai Mithril bằng ngôn ngữ lập trình Rust vì nó có tính năng tạo mẫu nhanh. Trước tiên, họ có kế hoạch trình bày các chữ ký nhỏ hơn với BulletProofs. Sau đó là các triển khai sẵn sàng cho quá trình sản xuất và cuối cùng là các bằng chứng chính thức về tính đúng đắn.

[Idyllic Vision](https://www.google.com/url?q=https://idyllicvision.com/%23/&sa=D&source=editors&ust=1633533919267000&usg=AOvVaw1sXpYwItx-H5CX6OgJ-wzT) cũng là một công ty tập trung vào việc xây dựng giao thức nhận dạng độc quyền dựa trên zero-knowledge proof (ZKP), hệ thống quản lý thông tin xác thực cho các tổ chức và Ví di động cho người dùng cuối hỗ trợ khả năng tương tác giữa các giải pháp xã hội đa dạng. Họ đang có kế hoạch triển khai bằng chứng khái niệm (PoC) về node Mithril. Trong những tháng tiếp theo, họ sẽ bắt đầu với việc tạo bản thiết kế giải pháp kiến trúc, xác định một số thành phần hệ thống cần được phát triển và tích hợp hữu cơ vào cơ sở hạ tầng hiện có. Điều này bao gồm tích hợp với thư viện tiền mã hoá Mithril và node Cardano, cũng như một lớp mạng lưới để trao đổi thông tin giữa các node. Kết quả của giai đoạn này sẽ được tích hợp vào Cardano để cho phép node khởi động nhanh và hỗ trợ các chức năng bổ sung như các ứng dụng khách nhẹ và những ứng dụng khác.

Để tìm hiểu thêm, hãy đọc [nghiên cứu về Mithril](https://iohk.io/en/research/library/papers/mithrilstake-based-threshold-multisignatures/) và xem [bài thuyết trình của Hội nghị thượng đỉnh Cardano](https://summit.cardano.org/sessions/mithril-linking-together-a-stronger-and-lighter-blockchain).

Bài này được dịch bởi Nguyễn Văn Tú, Review bởi Pham Quang, biên tập bởi Nguyễn Hiệu. Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/10/29/mithril-a-stronger-and-lighter-blockchain-for-better-efficiency)

*Dự án này được tài trợ bới Catalyst*
