# Từ Classic đến Chronos: Giải mã việc triển khai Ouroboros

### **Ouroboros là giao thức đồng thuận của Cardano. Trong bài viết này, chức năng và cách thức phát triển của giao thức này sẽ được giải thích**

![](img/2022-06-03-from-classic-to-chronos-the-implementations-of-ouroboros-explained.002.png) 3 tháng 6 năm 2022 ![](img/2022-06-03-from-classic-to-chronos-the-implementations-of-ouroboros-explained.002.png) [Olga Hryniuk](/en/blog/authors/olga-hryniuk/page-1/) ![](img/2022-06-03-from-classic-to-chronos-the-implementations-of-ouroboros-explained.003.png) 9 phút đọc

![Olga Hryniuk](img/2022-06-03-from-classic-to-chronos-the-implementations-of-ouroboros-explained.004.png)[](/en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](/en/blog/authors/olga-hryniuk/page-1/)

Technical Writer

Marketing &amp; Communications

- ![](img/2022-06-03-from-classic-to-chronos-the-implementations-of-ouroboros-explained.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2022-06-03-from-classic-to-chronos-the-implementations-of-ouroboros-explained.006.png)[](https://github.com/olgahryniuk "GitHub")

![Từ Classic đến Chronos: Giải mã việc triển khai Ouroboros](https://github.com/cardano2vn/iohk-blog/blob/main/vi/docs1/2022/06/img/2022-06-03-from-classic-to-chronos-the-implementations-of-ouroboros-explained.007.jpeg?raw=true)

Có thể nhiều người đã nghe đến Ouroboros: một giao thức đồng thuận bằng chứng cổ phần (proof of stake - POS) mang tính đột phá được Cardano sử dụng. Giao thức này được phát triển như một giải pháp thay thế hiệu quả về mặt năng lượng và bền vững hơn cơ chế đồng thuận bằng chứng công việc (proof of work-POW). Các đồng tiền mã hóa trước đó như Bitcoin và hiện tại là Ethereum đều được xây dựng dựa trên cơ chế đồng thuận bằng chứng công việc. Ouroboros là giao thức đồng thuận blockchain đầu tiên được phát triển dựa trên những nghiên cứu đã được hội đồng khoa học thẩm định (peer-reviewed).

Dưới sự dẫn dắt của [GS. Aggelos Kiayias](https://en.wikipedia.org/wiki/Aggelos_Kiayias) thuộc đại học Edinburgh, Ouroboros và các bước triển khai tiếp theo của nó đang cung cấp một hướng cơ sở mới để giải quyết một số thách thức lớn nhất hiện có trên thế giới một cách an toàn và quy mô lớn.

Tuy nhiên, sự công nhận luôn bắt đầu từ sự hiểu biết. Bài viết này trình bày tổng quan về cách Ouroboros hoạt động. Nó xem xét các điểm chung và giới thiệu những gì triển khai để cộng đồng hiểu thêm về giao thức này. Qua đó, cộng đồng có thể hiểu được tại sao giao thức này là một công cụ thay đổi trong cuộc chơi công nghệ hiện nay. Trong các bài báo tương ứng bên dưới, người đọc có thể tìm thấy những bài phân tích chi tiết về mỗi lần triển khai. Vui lòng đọc tiếp để có được lời giải thích toàn diện về Ouroboros và cách triển khai của nó.

- [Ouroboros Classic](https://iohk.io/en/research/library/papers/ouroborosa-provably-secure-proof-of-stake-blockchain-protocol/)
- [Ouroboros BFT](https://iohk.io/en/research/library/papers/ouroboros-bfta-simple-byzantine-fault-tolerant-consensus-protocol/)
- [Ouroboros Praos](https://iohk.io/en/research/library/papers/ouroboros-praosan-adaptively-securesemi-synchronous-proof-of-stake-protocol/)
- [Ouroboros Genesis](https://iohk.io/en/research/library/papers/ouroboros-genesiscomposable-proof-of-stake-blockchains-with-dynamic-availability/)
- [Ouroboros Crypsinous](https://iohk.io/en/research/library/papers/ouroboros-crypsinousprivacy-preserving-proof-of-stake/)
- [Ouroboros Chronos](https://iohk.io/en/research/library/papers/ouroboros-chronospermissionless-clock-synchronization-via-proof-of-stake/)

## **Đôi điều về các giao thức đồng thuận và tại sao Ouroboros lại khác biệt**

Thật hợp lý khi giả định rằng bất kỳ ai mới tham gia vào lĩnh vực này có thể bị nhầm lẫn bởi thuật ngữ 'giao thức đồng thuận'. Nói một cách đơn giản, giao thức đồng thuận là một hệ thống bao gồm các luật và thông số để chi phối hành vi của sổ cái phân tán: một bộ quy tắc mà mỗi người tham gia mạng có thể đạt được thỏa thuận với nhau.

Các blockchains công khai (Public blockchains) không bị bất kỳ cơ quan trung ương nào kiểm soát. Thay vào đó, một giao thức đồng thuận được sử dụng để cho phép những người tham gia vào mạng lưới phân tán đồng ý về những gì về lịch sử mạng lưới được ghi lại trên blockchain - để đạt được sự đồng thuận cho những điều đã xảy ra và tiếp tục vận hành chỉ từ một nguồn sự thật duy nhất.

Nguồn sự thật duy nhất đó chỉ cung cấp một bản ghi duy nhất.  Đây là lý do tại sao các blockchains đôi khi được coi là không cần lòng tin: thay vì yêu cầu những người tham gia tin tưởng lẫn nhau thì sự tin tưởng được tích hợp vào giao thức. Điều kiện tiên quyết là các tác nhân không xác định được có thể tương tác và giao dịch với nhau mà không cần dựa vào một bên trung gian nào để dàn xếp hoặc trao đổi dữ liệu cá nhân.

Ouroboros là một giao thức bằng chứng cổ phần, nó khác biệt với bằng chứng công việc. Thay vì dựa vào 'thợ đào' để giải các phương trình toán học phức tạp với mục đích tạo ra các khối mới - và thưởng cho người đầu tiên giải được - bằng chứng cổ phần chọn những người tham gia (trong trường hợp của Cardano, nhóm cổ phần (stake pool)) để tạo các block mới dựa trên số tiền mà họ nắm giữ trong mạng lưới.

Các mạng sử dụng Ouroboros tiết kiệm năng lượng hơn nhiều lần so với các mạng sử dụng cơ chế bằng chứng công việc - và Cardano có thể đạt được hiệu quả năng lượng rất lớn với giao thức Ouroboros.  Ví dụ, kể từ 2022, việc đào bitcoin tiêu tốn một lượng điện năng là [204.50 TWh](https://digiconomist.net/bitcoin-energy-consumption) mỗi năm ở Thái Lan. Mặt khác, Ouroboros chỉ cần chạy trên một [Raspberry Pi](https://www.reddit.com/r/cardano/comments/e8t34d/rock_pi_cardano_full_node_for_100/), có công suất tiêu thụ từ 15 đến 18W (watts). Sự khác biệt trong việc tiêu tốn năng lượng này có thể liên tưởng đến mức tiêu thụ điện của một hộ gia đình và một quốc gia: một sản phẩm có thể được mở rộng trong thị trường dân dụng và một cái không thể.

Bây giờ, cùng nhìn sâu hơn vào cách thức hoạt động của giao thức Ouroboros và những gì sẽ được bổ sung sau mỗi lần triển khai.

## **Ouroboros Classic**

Giờ chúng ta bắt đầu với [Ouroboros](https://iohk.io/en/research/library/papers/ouroborosa-provably-secure-proof-of-stake-blockchain-protocol/): lần triển khai đầu tiên của giao thức Ouroboros, được công bố vào 2017. Lần triển khai đầu tiên này (được gọi là Ouroboros Classic) đã đặt nền móng cho giao thức được xem như là một đối thủ của cơ chế bằng chứng công việc nhờ khả năng tiết kiệm điện. Sử dụng toán học để phân tích cơ cấu bằng chứng cổ phần và một cơ chế khuyến khích mới để thưởng cho những người tham gia vào việc thiết lập cơ cấu bằng chứng cổ phần cũng được giới thiệu trong lần triển khai này.

Điều quan tâm nhất chính là điều gì đã tách biệt Ouroboros hay cụ thể hơn là giao thức bằng chứng cổ phần khỏi các blockchain khác, là khả năng tạo ra sự ngẫu nhiên không thiên vị trong thuật toán lựa chọn người đứng đầu trong giao thức, đồng thời đảm bảo cung cấp tính bảo mật và an ninh trong những lần lựa chọn tiếp theo. Tính ngẫu nhiên ngăn cản việc hình thành các mẫu và đóng vai trò quan trọng trong việc duy trì tính bảo mật của giao thức. Bất cứ khi nào xuất hiện một hành vi có thể dự đoán được và hành vi đó có thể sẽ được khai thác — mặc dù Ouroboros đảm bảo tính minh bạch, nhưng giao thức này cũng ngăn cản được sự ép buộc. Điều đáng chú ý là, Ouroboros là giao thức blockchain đầu tiên được phát triển với hình thức phân tích bảo mật nghiêm ngặt này.

## **Cách thức hoạt động của Ouroboros**

Có thể tìm thấy toàn bộ lời giải thích về cách hoạt động của Ouroboros trong các [bài báo nghiên cứu](https://iohk.io/en/research/library/papers/ouroborosa-provably-secure-proof-of-stake-blockchain-protocol/). Ouroboros chia thời gian trong Cardano thành các epoch, trong đó mỗi epoch được chia thành các slot. Slot là một khoảng thời gian ngắn, trong đó một khối có thể được tạo ra và sẽ nhóm các slot thành các epoch. Slot chính là trung tâm điều chỉnh quy trình chọn ra người đứng đầu để phân phối những cổ phần đang thay đổi một cách sôi động.

Trung tâm trong thiết kế Ouroboros là phải duy trì tính bảo mật của chính nó trước các cuộc tấn công. Do đó, giao thức này được tích hợp khả năng bảo vệ để ngăn những kẻ tấn công và tuyên truyền các phiên bản thay thế blockchain. Có thể giả định rằng, bất cứ lúc nào cũng có kẻ tấn công gửi bất kỳ thông điệp nào cho bất kỳ người tham gia nào. Trên thực tế, sự an toàn của giao thức được đảm bảo trong một khái niệm gọi là cài đặt đồng bộ (nghĩa là với được đảm bảo chắc chắn về thời gian gửi tin nhắn), miễn là có hơn 51% cổ phần được những người tham gia trung thực kiểm soát (nghĩa là những người ủng hộ giao thức).

Một slot đứng đầu được bầu chọn cho mỗi slot. Slot đứng đầu này chịu trách nhiệm thêm một khối vào chuỗi và chuyển nó cho slot đứng đầu tiếp theo. Để tự bảo vệ trước những nỗ lực phá hoại giao thức, mỗi slot đứng đầu mới được yêu cầu chú ý tạm thời đến một vài khối cuối cùng của chuỗi đã nhận: chỉ chuỗi đứng trước một số lượng khối tạm thời được xác định trước mới được xem là chắc chắn. Đây cũng được gọi là thời gian giải quyết trì hoãn.<br>Bên cạnh những yếu tố khác, điều này có nghĩa là một người nắm giữ cố phần có thể ngoại tuyến nhưng vẫn được đồng bộ hóa với blockchain, miễn là nó không vượt quá thời gian giải quyết trì hoãn.

Trong giao thức Ouroboros, mỗi node mạng lưu trữ một bản sao của mempool giao dịch - nơi các giao dịch được thêm vào nếu chúng phù hợp với các giao dịch hiện có - và blockchain. Blockchain được lưu trữ cục bộ được thay thế khi node nhận thức được một chuỗi thay thế hợp lệ hơn.

Hạn chế của Ouroboros Classic là nó dễ bị ảnh hưởng bởi những kẻ tấn công thích ứng - mối đe dọa lớn trong bối cảnh thế giới thực này đã được Ouroboros Praos giải quyết - và trước đây đã không có phương thức an toàn nào cho người tham gia mới để khởi động từ blockchain, nhưng hiện giờ điều này đã được Ouroboros Genesis giải quyết.

**Ouroboros BFT**

Tiếp theo là [Ouroboros BFT](https://iohk.io/en/research/library/papers/ouroboros-bfta-simple-byzantine-fault-tolerant-consensus-protocol/), xuất phát như một trường hợp đặc biệt đơn giản từ phép phân tích Classic. Ouroboros BFT (Byzantine Fault Tolerance) là một giao thức đơn giản được Cardano sử dụng trong quá trình [Khởi động lại Byron](https://iohk.io/en/blog/posts/2020/03/30/what-the-byron-reboot-means-for-cardano/), chuyển đổi cơ sở mã Cardano cũ sang mới. Ouroboros BFT đã hỗ trợ quá trình chuẩn bị mạng Cardano cho việc phát hành kỷ nguyên Shelley và cùng với sự phân quyền của nó.

Thay vì yêu cầu các node phải luôn trực tuyến, Ouroboros BFT đã giả định một mạng lưới máy chủ liên kết và giao tiếp đồng bộ giữa các máy chủ để xây dựng blockchain. Trong thiết lập liên kết này, nó là một giao thức đồng thuận hấp dẫn nhờ bản chất đơn giản và tất định (tính tất định nghĩa là với đại lượng đầu vào giống nhau trên mỗi lần vận hành, luôn có cùng một đại lượng đầu ra) của nó. Điều đáng chú ý là BFT yêu cầu một lượng lớn các bên trung thực hơn so với các phiên bản Ouroboros khác.

## **Ouroboros Praos**

[Ouroboros Praos](https://iohk.io/en/research/library/papers/ouroboros-praosan-adaptively-securesemi-synchronous-proof-of-stake-protocol/) được xây dựng dựa trên giao thức Classic - và cung cấp các cải tiến đáng kể về khả năng mở rộng và bảo mật cho - Ouroboros Classic.

Tương tự như Ouroboros Classic, Ouroboros Praos xử lý các khối giao dịch bằng cách chia các chuỗi thành các slot và được tổng hợp thành các epoch. Tuy nhiên, khác với Ouroboros Classic, Praos được phân tích theo một thiết lập bán đồng bộ và an toàn trước những kẻ tấn công thích ứng.

Nó giả định hai khả năng: kẻ tấn công có thể trì hoãn gửi tin nhắn cho người tham gia trung thực lâu hơn một slot và kẻ tấn công có thể gửi tin nhắn tùy ý cho bất kỳ người tham gia nào vào bất kỳ lúc nào.

Thông qua lựa chọn slot đứng đầu riêng, bí mật chuyển tiếp và chữ ký khóa, Praos cung cấp tính ngẫu nhiên cho các epoch tốt hơn và đảm bảo khó dự đoán được slot đứng đầu tiếp theo và ngăn chặn một cuộc tấn công tập trung (như một cuộc tấn công DDoS) để lật đổ giao thức. Praos cũng cho phép sự chậm trễ trong việc gửi tin nhắn do bên đối địch kiểm soát và khoan dung cho những tư duy lệch lạc đang dần dần hình thành của những người tham gia cá nhân trong một quần thể các bên liên quan đang phát triển, điều này rất quan trọng để duy trì an ninh mạng trong môi trường toàn cầu. Điều kiện tiên quyết là phải duy trì được phần lớn cổ phần trung thực.

## **Ouroboros Genesis**

Sau đó là [Ouroboros Genesis.](https://iohk.io/en/research/library/papers/ouroboros-genesiscomposable-proof-of-stake-blockchains-with-dynamic-availability/) Genesis cải tiến hơn nữa dựa trên Ouroboros Praos bằng cách thêm một quy tắc lựa chọn chuỗi mới, cho phép các bên khởi động từ một khối đầu tiên (genesis block) - mà không cần đến các điểm kiểm tra đáng tin cậy hoặc các giả định về tính khả dụng trong quá khứ. Genesis cũng cung cấp bằng chứng về khả năng tương thích chung của giao thức. Nó chứng minh rằng giao thức có thể được kết hợp với các giao thức khác trong các cấu hình tùy ý khi cài đặt trong thế giới thực mà không làm mất đi các thuộc tính bảo mật của mình. Điều này góp phần đáng kể vào tính bảo mật và bền vững của nó cũng như của các mạng sử dụng nó.

**Ouroboros Crypsinous**

[Ouroboros Crypsinous](https://iohk.io/en/research/library/papers/ouroboros-crypsinousprivacy-preserving-proof-of-stake/) trang bị cho Genesis các thuộc tính bảo vệ quyền riêng tư. Đây là giao thức blockchain dựa trên cơ chế bằng chứng cổ phần, có bảo vệ quyền riêng tư đầu tiên được phân tích chính thức để chứng minh khả năng bảo mật của nó trước những đợt tấn công thích ứng, và vẫn đảm bảo quyền riêng tư mạnh mẽ bằng cách giới thiệu một kỹ thuật phát triển đồng tiền mới dựa trên SNARK và mã hóa bảo mật chuyển tiếp khóa-riêng tư. Crypsinous hiện không được lên kế hoạch triển khai trên Cardano, nhưng nó có thể được các chuỗi khác sử dụng để tăng cường cài đặt bảo vệ quyền riêng tư.

## **Ouroboros Chronos**

Lần triển khai cuối cùng nhưng không kém phần quan trọng là [Ouroboros Chronos](https://iohk.io/en/research/library/papers/ouroboros-chronospermissionless-clock-synchronization-via-proof-of-stake/). [Chronos](https://iohk.io/en/blog/posts/2021/10/27/ouroboros-chronos-provides-the-first-high-resilience-cryptographic-time-source-based-on-blockchain/) đạt được hai mục tiêu: thứ nhất, nó cho thấy cách các giao thức blockchain có thể đồng bộ hóa bộ tạo xung nhịp một cách an toàn nhờ cơ chế đồng bộ hóa thời gian mới và do đó trở nên độc lập với các dịch vụ thời gian bên ngoài. Thứ hai, nó là một giao thức blockchain an toàn bằng mật mã, cung cấp thêm nguồn thời gian an toàn bằng mật mã cho các giao thức khác.

Nói tóm lại, Chronos làm cho sổ cái có khả năng chống lại các cuộc tấn công nhắm vào mục tiêu thông tin thời gian.

## **Tương lai của Ouroboros**

Ouroboros, được đặt tên theo biểu tượng vô cực, là xương sống của hệ sinh thái Cardano. Giao thức này đóng vai trò nền tảng và là điểm dịch chuyển cho các hệ thống tự lan truyền. Nó biến đổi và phát triển theo chu kỳ, thay thế các hệ thống hiện có - như hệ thống tài chính và các hệ thống khác - và làm gián đoạn các cấu trúc quyền lực mà nó dựa vào. Đó là sự khởi đầu cho một tiêu chuẩn mới, không được xác định từ trung tâm mà thay vào đó là từ các biên.

Hiện tại, Cardano hoạt động dựa trên giao thức Ouroboros Praos.<br>Genesis đang được triển khai cho 2022, sau đó sổ cái sẽ được nâng cấp để hỗ trợ Ouroboros Chronos.

Tương lai của nó cũng giống như quá khứ của nó vậy: đó là một sự nỗ lực không mệt mỏi để khám phá, tiếp tục, tối ưu hóa và thúc đẩy những thay đổi tích cực thông qua những quá trình nghiên cứu gian khổ. Mỗi bước trong hành trình của Ouroboros là một quá trình phát triển mới, đưa chúng ta đến tiến gần với một thế giới công bằng, an toàn và bền vững hơn.

*Bài đăng này là phiên bản cập nhật của bản gốc (do Kieran Costello tạo) đã được cập nhật để bao gồm các phiên bản giao thức mới. *

Bài này được dịch bởi Chitk , Review bởi Pham Quang, biên tập bởi Nguyễn Hiệu. Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2022/06/03/from-classic-to-chronos-the-implementations-of-ouroboros-explained)

*Dự án này được tài trợ bới Catalyst*
