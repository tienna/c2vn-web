# Khả năng tương tác là chìa khóa để phát triển blockchain

### **Các cầu nối (bridge), các chuỗi phụ và bộ chuyển đổi AGIX ERC20 đang cung cấp các giải pháp để phát triển crosschain(chuỗi chéo) Cardano**

![](img/2022-04-28-interoperability-is-key-to-blockchain-growth.002.png) Ngày 28 tháng 4 năm 2022![](img/2022-04-28-interoperability-is-key-to-blockchain-growth.002.png)[ Olga Hryniuk](/en/blog/authors/olga-hryniuk/page-1/)![](img/2022-04-28-interoperability-is-key-to-blockchain-growth.003.png) bài đọc 8 phút

![Olga Hryniuk](img/2022-04-28-interoperability-is-key-to-blockchain-growth.004.png)[](/en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](/en/blog/authors/olga-hryniuk/page-1/)

Technical Writer

Marketing &amp; Communications

- ![](img/2022-04-28-interoperability-is-key-to-blockchain-growth.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2022-04-28-interoperability-is-key-to-blockchain-growth.006.png)[](https://github.com/olgahryniuk "GitHub")

![Khả năng tương tác là chìa khóa để phát triển blockchain](img/2022-04-28-interoperability-is-key-to-blockchain-growth.007.jpeg)

Cardano đang dần mở rộng cộng đồng đông đảo các nhà phát triển và những người đam mê blockchain. Theo [Cardano blockchain insights](https://datastudio.google.com/u/0/reporting/3136c55b-635e-4f46-8e4b-b8ab54f2d460/page/p_wxcw6g0irc), có hơn 4,5 triệu token  gốc, hơn 5.000 dự án NFT và [hơn 900 dự án tổng thể đang xây dựng trên Cardano](https://www.linkedin.com/posts/timbharrison_cardano-activity-6925389231104143360-D7QX?utm_source=linkedin_share&utm_medium=member_desktop_web) cho đến nay.

Để hỗ trợ sự phát triển này, cộng đồng hiện đang làm việc để Cardano được áp dụng rộng rãi hơn. Khả năng làm việc với các blockchain khác - khả năng tương tác - là chìa khóa cho điều này.

Trong bài đăng này, Input Output Global (IOG) sẽ xem xét các cầu nối blockchain( brigde), các sidechain và vai trò của bộ chuyển đổi AGIX ERC20. Đây là những yếu tố cốt lõi cho phép giao tiếp giữa các blockchain để đảm bảo khả năng mở rộng cao hơn, áp dụng công nghệ và dễ sử dụng.

## **Khả năng tương tác**

Ngày nay, có hàng nghìn blockchain - Bitcoin, Ethereum, Algorand, Solana... Họ sử dụng một loạt các ngôn ngữ lập trình và có các hệ thống và quy tắc riêng. Khả năng tương tác là khả năng mà các mạng blockchain khác nhau có thể kết nối để trao đổi và tận dụng dữ liệu và di chuyển các loại tài sản kỹ thuật số qua lại.

Giá trị được lưu trữ trong các blockchain đang tăng lên theo cấp số nhân. Tuy nhiên, để phát triển ngành công nghiệp này, mỗi mạng lưới không thể bị giới hạn trong 'silo' và hoạt động trong hệ sinh thái của riêng nó. Khi khối lượng giao dịch tăng lên, người dùng có xu hướng chuyển sang các mạng khác vì mỗi blockchain xử lý các nhiệm vụ cụ thể mà những các blockchain khác không thể đáp ứng được. Mong muốn chuyển đổi mạng lưới cũng có thể liên quan đến phí, tốc độ xử lý giao dịch, bảo mật hoặc các ưu đãi.

Khả năng tương tác là điều cần thiết để các công nghệ blockchain thành công - người dùng cần có khả năng giao dịch với nhau mà không bị giới hạn trong một mạng lưới nhất định. Các nhà phát triển có thể viết các hợp đồng thông minh tương tác với nhiều blockchain. Và tất nhiên, người dùng có thể giao dịch với tất cả các loại token mà không bị giới hạn.

Những sidechain và cầu nối blockchain là hai công nghệ cho phép khả năng tương tác bằng cách cho phép người dùng tương tác với nhau đồng thời trên nhiều blockchain.

## **Những cầu nối (bridge) blockchain**

Trở lại năm 2017, trong [buổi thuyết trình Cardano whiteboard](https://www.youtube.com/watch?v=Ja9D0kpksxw&t=15s) của mình, Charles Hoskinson đã nói:

Ý tưởng về khả năng tương tác là sẽ không có một token  duy nhất thống trị tất cả.

Các cầu nối blockchain cho phép token  có nguồn gốc từ một blockchain được sử dụng trên một blockchain khác. Một cầu nối cho phép các token  được di chuyển từ blockchain này sang blockchain khác, nơi chúng có thể được sử dụng để thanh toán hoặc tương tác với các ứng dụng phi tập trung (DApps).

Có ba loại cầu nối blockchain:

- **&nbsp;Cầu nối tập trung**: những cầu nối này được sở hữu và kiểm soát hoàn toàn bởi một bên duy nhất (tức là một công ty) xác nhận tất cả các hoạt động của cầu nối.
- **Cầu nối permissioned** (được liên kết): những cầu nối này được phi tập trung nhiều hơn vì chúng được vận hành bởi nhiều bên. Tuy nhiên, một cá nhân hoặc tổ chức sẵn sàng trở thành trình xác thực cần phải có sự cho phép của liên đoàn duy trì cầu nối để thiết lập và chạy một node giúp xác thực các hoạt động của cầu nối.
- **Cầu nối permissionless** (không tin cậy): những cầu nối này hoạt động giống như một hệ thống phi tập trung hoàn toàn. Bất kỳ ai cũng có thể tham gia cầu nối này để giúp duy trì hiệu lực hoạt động của nó.

Nói chung, các nhà khai thác cầu nối hoạt động như những người xác nhận mạng lưới. Các nhà khai thác chấp nhận các token đang trong quá trình di chuyển và lưu trữ chúng trong một hợp đồng thông minh đặc biệt. Sau đó, bằng cách sử dụng các hợp đồng thông minh, các nhà khai thác có thể phát hành số lượng tương đương với các token đó trên một mạng lưới khác. Một số cầu nối chỉ có thể di chuyển token theo một hướng, những cầu khác có thể thực hiện chuyển theo cả hai hướng. Ví dụ: cầu nối một chiều có thể di chuyển token từ Ethereum sang Cardano để người dùng tương tác với DApps trên Cardano. Nếu một cầu nối là hai chiều, thì người dùng sẽ có thể chuyển các token trở lại từ Cardano sang Ethereum. Cơ chế cầu nối phụ thuộc vào loại hợp đồng thông minh được sử dụng trong mạng lưới.

**Bộ chuyển đổi AGIX ERC20 là gì?**

Thông qua một nỗ lực hợp tác, IOG và SingularityNET đã bắt tay vào thực hiện sứ mệnh xây dựng một giải pháp để thúc đẩy việc áp dụng nhiều hơn cho Cardano - tạo cầu nối cho các nhà phát triển Ethereum tận dụng các lợi ích vốn có của mạng lưới, bao gồm một cách dễ dự đoán hơn và tiết kiệm chi phí hơn để lưu trữ các ứng dụng.

SingularityNET gần đây đã ra mắt [bộ chuyển đổi AGIX-ERC20](https://twitter.com/singularity_net/status/1516069469591908361) trên mainnet. Cầu nối này là cầu nối tập trung, có nghĩa là tính hợp lệ của các hoạt động và thành công chuyển token sẽ được quản lý độc quyền bởi SingularityNET.

Trong khi SingularityNET hiện có thể hỗ trợ độc lập bộ chuyển đổi AGIX-ERC20, IOG vẫn tiếp tục khám phá khả năng của các giải pháp khác. Điều này sẽ mang lại nhiều lựa chọn hơn cho hệ sinh thái Cardano - trao quyền cho các nhà phát triển lựa chọn các công cụ phù hợp với nhu cầu cụ thể của họ. Đội ngũ thương mại của IOG cũng sẵn sàng giải đáp yêu cầu của các nhà phát triển, DApps và các doanh nghiệp về khả năng hợp tác liên quan đến các bộ chuyển đổi trong tương lai - hoặc bất kỳ sáng kiến ​​nào khác - có thể liên hệ bằng cách sử dụng [biểu mẫu liên hệ này](https://iohk.io/en/contact-commercial) .

## **Các chuỗi phụ (sidechain)**

Bây giờ chúng ta hãy nói về các sidechain. Lợi ích chính của các sidechain là khả năng giới thiệu các tính năng mới vào mạng lưới mà không gây ra rủi ro bảo mật cho mainnet. Những sidechain tăng cường khả năng mở rộng của blockchain bởi vì chúng loại bỏ gánh nặng xử lý logic phức tạp khỏi chuỗi chính, do đó tăng tốc độ (và giảm chi phí) xử lý giao dịch. Những sidechain cũng có thể hoạt động như một cơ chế hai chiều để chuyển token giữa chuỗi chính và chuỗi bổ sung, do đó làm tăng đáng kể khả năng tương tác của blockchain.

Nói một cách đơn giản, một sidechain là một blockchain riêng biệt được kết nối với mainnet. Mainnet hoạt động như một blockchain mẹ, nhưng vì các sidechain là các sổ cái riêng biệt, chúng không bị ảnh hưởng bởi lưu lượng truy cập tổng thể. Các tổ chức có thể thiết lập các sidechain của riêng họ để xử lý giao dịch, thực hiện hợp đồng thông minh và di chuyển token nhanh hơn. Các hoạt động này không chỉ hiệu quả hơn mà còn rẻ hơn nhiều so với chuỗi chính, mang lại lợi ích cho tất cả mọi người.

Các sidechain cũng có thể kế thừa một số (hoặc tất cả) tính năng của chuỗi mẹ, chẳng hạn như mô hình sổ cái và cơ chế đồng thuận. Tuy nhiên, các tổ chức cũng có thể áp dụng một mô hình khác tùy thuộc vào mục tiêu của họ. Ví dụ: một sidechain có thể kết hợp các giao thức bảo mật, thuật toán đồng thuận hoặc mô hình quản trị khác nhau để tạo ra một sidechain mới tương tác với các mạng lưới khác.

**Các sidechain Cardano**

Bằng cách thêm một sidechain vào Cardano, có thể tạo cơ hội cho các nhà phát triển sử dụng ngôn ngữ Solidity trên Ethereum. Ví dụ: bằng cách sử dụng máy ảo Ethereum (EVM), các nhà phát triển có thể dễ dàng xây dựng DApp trên Cardano.

[Milkomeda](https://www.milkomeda.com/) là một giao thức sidechain được ra mắt gần đây để hỗ trợ Cardano. Nó cho phép các hợp đồng thông minh tương tác với EVM được thực thi trên sidechain Milkomeda C1, được kết nối với mainchain Cardano. Hiện tại, Milkomeda không sử dụng mô hình bảo mật của Cardano, nhưng điều này đang được giải quyết để đảm bảo mức độ bảo mật cao nhất. Milkomeda cung cấp nhiều lựa chọn DApp bằng cách cho phép các nhà phát triển chuyển qua các dự án hiện có từ Ethereum và cũng cho phép triển khai những sáng tạo mới nhất trong công nghệ zero-knowledge dưới dạng giải pháp L3+ trên giao thức của nó. Ngoài ra, Milkomeda cũng hướng đến việc cung cấp khả năng tương tác giữa Cardano và các blockchain khác như Solana vào cuối năm 2022.

Đầu tuần này, [Wanchain đã công bố](https://iohk.io/en/blog/posts/2022/04/27/guest-blog-collaborating-on-cardano-interoperability/) các cầu nối crosschain hai chiều, phi tập trung, không giám sát, kết nối Cardano với các blockchain layer 1 khác. Wanchain vừa là một blockchain bằng chứng cổ phần (PoS) bền vững layer 1 vừa là một giải pháp khả năng tương tác phi tập trung. Blockchain PoS layer 1 của Wanchain là một môi trường giống như Ethereum hoàn chỉnh, hoạt động được với các công cụ tiêu chuẩn của Ethereum, DApp và các giao thức. Quan trọng là, nó có một số điểm chung với Cardano. Wanchain sử dụng thuật toán đồng thuận PoS được gọi là [cơ chế đồng thuận Galaxy](https://www.wanchain.org/_files/ugd/9296c5_5205d584ee594e879d4b8b58048b6fac.pdf) thúc đẩy nhiều kế hoạch mật mã bao gồm chia sẻ bí mật phân tán và chữ ký ngưỡng để cải thiện cơ chế tạo số ngẫu nhiên và cơ chế sản xuất khối. Cơ chế đồng thuận Galaxy được phát triển bởi các nhà nghiên cứu và các học giả hàng đầu thế giới, là phần tiếp theo của [Ouroboros](https://docs.cardano.org/core-concepts/ouroboros-overview) của Cardano.

Tiến sĩ Ben Goertzel, Giám đốc điều hành của SingularityNET, gần đây cũng đã [tuyên bố](https://blog.singularitynet.io/introducing-hypercycle-singularitynets-radically-scalable-ledgerless-cardano-sidechain-3abbb24ff880) rằng dự án AI tiên phong của ông đang giới thiệu sidechain HyperCycle. Nó đang được thiết kế dưới dạng kiến ​​trúc layer 2 nhẹ để cho phép thực thi các dịch vụ nhỏ trên quy mô lớn, tốc độ cao, không tốn kém. Dự án này được thiết kế đặc biệt để tối ưu hóa các quy trình liên quan đến AI và sẽ có ý nghĩa sâu sắc đối với nhiều lĩnh vực ngoài AI, yêu cầu các giải pháp sidechain hiệu quả và có thể mở rộng.

[Orbis](https://twitter.com/orbisproject/status/1496928538536329217?s=21&t=N2A-KPHv5p2ZGP5ZeZuIIA) là một giải pháp khả năng mở rộng bổ sung đang được phát triển trong hệ sinh thái Cardano. [Orbis sẽ hoạt động](https://twitter.com/Soorajksaju2/status/1518208661084160008?s=20&t=88S8vrujQGeWfc8NSlQjeA) như một giao thức cuộn lên layer 2 của ZK (zero-knowledge), di chuyển tính toán ngoài chuỗi để mở rộng lưu lượng của Cardano.

Cuối cùng nhưng không kém phần quan trọng, IOG đang có kế hoạch phát hành một sidechain permissionless EVM mới trong năm nay. Sidechain này sẽ cho phép các nhà phát triển viết hợp đồng thông minh Solidity trên Cardano, tạo DApp tương thích EVM và token tương thích ERC20 (và theo thời gian, sẽ có các sidechain của riêng chúng) đồng thời thu được nhiều lợi ích từ Cardano. Điều đó có nghĩa là người dùng sẽ được hưởng lợi từ mức phí thấp hơn nhiều và thời gian giải quyết nhanh hơn trên một blockchain bền vững hơn thân thiện với môi trường. Các tính năng chính của sidechain EVM sẽ là khả năng tương thích hoàn toàn với các công cụ và nâng cấp của Ethereum, khả năng tương thích ví Web3, sử dụng giao thức đồng thuận Proof-of-stake của Ouroboros Byzantine Fault Tolerance và tất nhiên, có khả năng kế thừa bảo mật từ mainchain Cardano.

[Chương trình Cardano360 vào tháng 4/2022](https://www.youtube.com/watch?v=b4x5OIy4shU) *sẽ có các bản cập nhật từ các đội sidechain EVM của Milkomeda, Wanchain, Orbis và IOG. Hãy chắc chắn rằng bạn có thể tham gia để tìm hiểu thêm*

Bài này được dịch bởi Lê Nguyên [với bài gốc](https://iohk.io/en/blog/posts/2022/04/28/interoperability-is-key-to-blockchain-growth)

*Dự án này được tài trợ bới Catalyst*
