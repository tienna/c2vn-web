# Staking là nền tảng của Cardano

### **Ủy quyền giúp giữ cho chuỗi khối phát triển - và người sở hữu Ada cũng được thưởng khi tham gia**

![](img/2022-07-28-staking-is-the-bedrock-of-cardano.002.png) 28 tháng 7 năm 2022![](img/2022-07-28-staking-is-the-bedrock-of-cardano.002.png) [Anthony Quinn](/en/blog/authors/anthony-quinn/page-1/)![](img/2022-07-28-staking-is-the-bedrock-of-cardano.003.png)8 phút đọc

![Anthony Quinn](img/2022-07-28-staking-is-the-bedrock-of-cardano.004.png)[](/en/blog/authors/anthony-quinn/page-1/)

### [**Anthony Quinn**](/en/blog/authors/anthony-quinn/page-1/)

Editor

Marketing &amp; Communications

- ![](img/2022-07-28-staking-is-the-bedrock-of-cardano.005.png)[](mailto:anthony.quinn@iohk.io "E-mail")
- ![](img/2022-07-28-staking-is-the-bedrock-of-cardano.006.png)[](https://www.youtube.com/watch?v=KkcAic12dvc "YouTube")
- ![](img/2022-07-28-staking-is-the-bedrock-of-cardano.007.png)[](https://www.linkedin.com/in/tony-quinn-frsa-0b093229 "LinkedIn")
- ![](img/2022-07-28-staking-is-the-bedrock-of-cardano.008.png)[](https://twitter.com/IohkT "Twitter")

![Ủy thác là nền tảng của Cardano](https://github.com/cardano2vn/iohk-blog/blob/main/vi/docs1/2022/07/img/2022-07-28-staking-is-the-bedrock-of-cardano.009.png?raw=true)

Đầu năm 2021, có khoảng 2.000 pool được tạo. Và cứ mỗi tháng, lại có thêm một vài [stake pool của Cardano](https://docs.cardano.org/getting-started/operating-a-stake-pool/about-stake-pools) được tạo ra, nâng tổng số [pool đang hoạt động hiện nay là hơn 3.000](https://adapools.org/) . Ada được đặt cược từ 1,2 triệu địa chỉ ví. Trong quá trình này, mức độ ủy quyền đã tăng lên gần 74% tổng số Ada đang lưu hành. Đó đã là thành tích, tuy nhiên vẫn còn một phần tư tổng số Ada chưa được ủy thác - việc này nói lên điều gì chăng?

Câu trả lời ngắn gọn là có, vì hai lý do. Đầu tiên, việc ủy thác là thứ đảm bảo an toàn cho mạng Cardano, nên càng nhiều Ada được ủy thác thì sẽ càng tốt. Và thứ hai, ở cấp độ cá nhân, những người sở hữu Ada chưa ủy quyền tiền của họ đang bỏ lỡ phần thưởng được phân phối (khi xác minh giao dịch và sản xuất khối) cho các pool nhận ủy thác.

Ý tưởng về bằng chứng cổ phần (PoS) đã trở nên quá quen thuộc đến mức người ta dễ quên đi bản chất về sự cải cách khổng lồ mà nó mang lại. Việc Ethereum gặp trở ngại khi cố gắng thoải khỏi bằng chứng công việc (PoW) cho thấy PoS khó triển khai như thế nào. Do đó, nó đáng để xem xét kỹ hơn.

## **Trước khi có Cardano**

Bitcoin, blockchain đầu tiên, và Ethereum, đồng tiền đầu tiên sử dụng hợp đồng thông minh, đều dựa trên công nghệ PoW. Các blockchain thế hệ thứ nhất và thứ hai này đều yêu cầu một mạng lưới máy tính cạnh tranh để xác thực các giao dịch và 'đào' (mine) các đồng tiền (coin). Sự cạnh tranh này cụ thể là giải một câu đố vô giá trị để có cơ hội chiếm được phần thưởng kèm theo - mọi thứ chỉ phụ thuộc vào sức mạnh tính toán thô. Việc cạnh tranh này tiêu tốn năng lượng, dẫn đến mức độ sử dụng điện lớn.

Nhiều người đã sớm nhận ra vấn đề của PoW và sau đó PoS đã được đề xuất trong một [diễn đàn bitcoin](https://bitcointalk.org/index.php?topic=27787.0) vào năm 2011:

Tôi tự hỏi… liệu quá trình chuyển đổi hệ thống từ PoW sang PoS có thể xảy ra hay không. Điều tôi muốn nói về PoS là thay vì dùng quyền 'bỏ phiếu' (vote) của bạn dựa trên lịch sử các giao dịch đã xác nhận bằng cách chia sẻ tài nguyên máy tính của bạn cho mạng lưới, nó lại được tính theo số bitcoin bạn có thể chứng minh mình đang sở hữu, bằng cách sử dụng khóa cá nhân (private key).

Một năm sau, Peercoin đã triển khai giao thức lai giữa PoS-PoW. Nhưng cũng có câu hỏi về việc liệu PoS có an toàn hay không. Vì vậy, các nhóm học giả bắt đầu thiết kế một giao thức PoS có thể được chứng minh về mặt toán học. Nó đã trở thành một cuộc đua khá gay gắt, với một nhóm được điều hành bởi Aggelos Kiayias, ông là giáo sư tại Đại học Edinburgh và là trưởng khoa tại Input Output Global (IOG), đã đệ trình tài liệu đột phá về Ouroboros, ' [giao thức blockchain đầu tiên dựa trên bằng chứng cổ phần với các đảm bảo an ninh nghiêm ngặt](https://iohk.io/en/research/library/papers/ouroborosa-provably-secure-proof-of-stake-blockchain-protocol/) ', tại [hội nghị Crypto 2017](https://iohk.io/en/blog/posts/2017/06/19/proof-of-stake-protocol-ouroboros-at-crypto-17/) . Nó đánh bại nhóm từ Đại học Cornell với việc giới thiệu giao thức Snow White và được các tác giả mô tả là một giao thức đồng thuận 'xanh' vì nó sử dụng ít năng lượng hơn nhiều so với các blockchains PoW. Hội nghị tiền mã hóa áp dụng quy trình đánh giá ngang hàng nghiêm ngặt để đưa các bài báo vào chương trình. Điều này đòi hỏi các học giả khác xem xét kỹ lưỡng từng bài báo về giá trị khoa học của nó.

Tài liệu của Giáo sư Kiayias đã đưa ra một bằng chứng toán học chính thức rằng các thuộc tính bảo mật của Ouroboros có thể so sánh với các đặc tính của Bitcoin. Với 1.300 trích dẫn trên Google Scholar, đây là một trong những tài liệu nghiên cứu được tham khảo nhiều nhất về blockchain và đã ảnh hưởng đến một số hệ thống khác, đáng chú ý nhất là Polkadot và Concordium.

Khi lý thuyết đã được chứng minh, các kỹ sư blockchain của IOG bắt đầu triển khai giao thức Ouroboros bằng ngôn ngữ lập trình Haskell. Cardano được ra mắt vào tháng 9 năm 2017 và Ada, tiền mã hóa gốc của Cardano giúp thúc đẩy blockchain này, ngay lập tức trở thành một loại tiền mã hóa hàng đầu - là một trong bốn đồng tiền (coin) duy nhất đã giữ vị trí top 10 kể từ đó.

Tất nhiên, lần ra mắt năm 2017 chỉ là bước khởi đầu cho hành trình của Cardano, như đã đặt ra trong [lộ trình bốn kỷ nguyên](https://roadmap.cardano.org/en/) của nó. Các kỹ sư của IOG đã bác bỏ mô hình 'đi nhanh và phá vỡ mọi thứ' của Thung lũng Silicon, vì những thất bại của cơ sở hạ tầng quan trọng ảnh hưởng đến cuộc sống của người dân. Từ tốn và ổn định là tôn chỉ của Cardano.

## **Staking và Ouroboros**

Cardano dựa vào Ouroboros cùng cơ chế đồng thuận PoS đã được chứng minh về mặt toán học. Cổ phần, một tài nguyên kỹ thuật số, được ghi lại trên chuỗi khối Cardano và việc ủy quyền cổ phần đó của chủ sở hữu Ada là điều giữ cho mạng lưới hoạt động và an toàn.

Thay vì mỗi người sở hữu Ada phải chạy một hệ thống máy tính riêng lẻ để tự tham gia vào quá trình ủy thác, thì việc tham gia ủy thác cho các stake pool sẽ hợp lý hơn. Tuy nhiên, hệ thống cần phải ngăn chặn việc một pool chiếm trọn ưu thế. Vì thế Cardano khuyến khích các pool chia sẻ phần thưởng để đảm bảo sự phát triển công bằng. Đồng thời, hệ thống giúp các cá nhân sở hữu Ada có thể ủy quyền cho các pool hoặc tự tạo pool của mình. Trong trường hợp tự tạo pool ủy thác, bạn cần cam kết và "khóa" một lượng Ada nhất định để giúp bảo vệ mạng lưới.

Việc tạo ra quy trình tham gia đơn giản là rất cần thiết khi càng nhiều cá nhân sở hữu Ada tham gia càng giúp cho việc phân tán của sổ cái an toàn hơn. Đa số người tham gia sẽ không muốn tự mở pool mà họ sẽ ủy thác vào một hay nhiều pool tùy sở thích, để đảm bảo lợi ích của họ và của cả cộng đồng. Cardano sẽ không quản lý việc này nên sẽ không có việc bạn bị khóa số dư, và mọi người đều được khuyến khích ủy thác số Ada mà họ có.

Việc chiếm trọn ưu thế được tránh bằng cách hạn chế sự kiểm soát từ cá nhân. Vì thế sức ảnh hưởng từ các chủ pool ủy thác chỉ có được từ số Ada được ủy thác vào pool chứ không có từ số Ada của họ. Ưu thế cá nhân càng cao thì tính bảo mật của hệ thống càng kém, dễ dẫn đến khả năng xảy ra cuộc tấn công 51% để kiểm soát blockchain. Ngoài ra còn vấn đề khác liên quan việc một cá nhân cùng tạo ra nhiều pool dẫn đến việc tăng đòn bẩy - và thậm chí là một [cuộc tấn công Sybil](https://iohk.io/en/blog/posts/2018/10/29/preventing-sybil-attacks/) .

Giáo sư Kiayias đã mô tả cách thức hoạt động trọng tâm của cơ chế Ouroboros, cả trong [các bài đăng trên blog](https://iohk.io/en/blog/posts/2018/10/23/stake-pools-in-cardano/) và trong bài báo học thuật mang tính đột phá chứng minh tính bảo mật của Ouroboros.

Cơ chế Ouroboros đề ra các ràng buộc phù hợp để hệ thống hướng đến việc cân bằng các pool. Các bên vận hành được khen thưởng xứng đáng cho hiệu suất, hiệu quả chi phí và những đóng góp chung của họ cho hệ sinh thái.

Phương pháp chia sẻ phần thưởng nhằm đảm bảo rằng các pool nhỏ và trung bình có thể đóng góp vào hệ sinh thái mà không bị thâu tóm bới các nhà vận hành và các pool lớn hơn, như là điều đã xảy ra với các hệ thống blockchain khác, đặc biệt là Bitcoin. Phương pháp này cũng được thiết kế để ngay khi tổng Ada được ủy quyền cho một pool nào đó tăng đến ngưỡng nhất định thì phần thưởng sẽ giảm đi. Từ đó khuyến khích những người nắm giữ Ada chuyển sang một pool khác để có phần thưởng tốt hơn, điều này giúp rải đều sự ủy thác cho các pool khác. Khi đấy mạng lưới an toàn hơn do số lượng lớn người tham gia xác thực các giao dịch.

Vào cuối mỗi kỷ nguyên (nguyên văn tiếng Anh là epoch, dùng trong cơ chế Ouroboros, mỗi kỷ nguyên kéo dài năm ngày) phần thưởng sẽ được phân phối. Giao thức Ouroboros sẽ tự động thu thập và phân chia tiền thưởng đến tất cả, từ người vận hành pool cho đến những người tham gia ủy thác mà không cần đến sự can thiệp của người vận hành.

Thuật ngữ mà ta hay bắt gặp 'liquid staking' đề cập về việc một số blockchain khi được ủy thác, sẽ khóa số tiền đấy và người sở hữu không thể dùng nó cho những việc khác, điển hình như việc bỏ phiếu bầu. Đây không là vấn đề với Cardano vì bạn vẫn có thể sử dụng số tiền đã ủy thác đó. Ngoài ra, trước khi việc ủy thác có hiệu lực thì sẽ không có việc khóa số Ada đã ủy thác, điều này nhằm tránh việc đồng tiền không thể sử dụng khi cần.

## **Chọn pool để ủy thác**

Ngoài việc đặt số tiền để cam kết ban đầu, chủ pool còn cần đặt ra mức lợi nhuận và chi phí vận hành. Như đã nói trên, ngày cuối mỗi epoch, phần thưởng được phân phối đến các pool. Phần thưởng này được phân phối theo 3 giai đoạn. Đầu tiên, chủ pool sẽ giữ lại chi phí vừa đủ để đảm bảo pool tiếp tục hoạt động. Thứ hai, lợi nhuận của chủ pool được tính toán và giữ lại trong pool. Cuối cùng, số tiền thưởng còn lại sẽ phân phối đến những người tham gia ủy thác, việc chia tiền thưởng này sẽ dựa trên tỷ lệ Ada mà họ đã ủy thác vào pool.

Giáo sư Kiayias gợi ý rằng những người đang giữ Ada hãy nghĩ về ủy thác như một dạng ['phiếu tín nhiệm'](https://iohk.io/en/blog/posts/2020/11/13/the-general-perspective-on-staking-in-cardano/) - là cách để thể hiện sự ủng hộ với sứ mệnh hoặc mục tiêu của pool. Bạn cũng nên sử dụng các công cụ như [adapools.org](https://adapools.org/) và [pooltool.io](https://pooltool.io/) để xem xét các yếu tố có thể ảnh hưởng đến quyết định lựa chọn của bạn. Nó bao gồm văn hóa, xếp hạng, tài nguyên, độ nhận diện trên cộng đồng, tính chuyên nghiệp và cam kết lâu dài đối với hệ sinh thái Cardano. Ví dụ như theo dõi các thông tin mới về cơ chế xếp hạng trong giao diện ví Daedalus. Cuối cùng, hãy kiểm tra hiệu quả và khả năng cập nhật thường xuyên của pool để đánh giá và đưa ra lựa chọn phù hợp nhất.

>Lưu ý: Nội dung trong bài viết này không nhằm đưa ra lời khuyên về chuyên môn, bao gồm nhưng không giới hạn về tài chính, đầu tư, pháp lý hoặc thuế. Input Output Global Inc. không chịu trách nhiệm về việc bạn sử dụng hoặc tham khảo bất kỳ thông tin nào trong bài viết này.

Bài này được dịch bởi Hoang Tran [với bài gốc](https://iohk.io/en/blog/posts/2022/07/28/staking-is-the-bedrock-of-cardano)

*Dự án này được tài trợ bởi Catalyst*
