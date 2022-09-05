# Nghiên cứu tổng quan phần 3: Tokens, Stablecoin, và phí.

### **IOG research cho phép hỗ trợ đa tài sản, stablecoin và phí hợp lý trên Cardano.**

![](img/2022-07-07-research-overview-part-3-tokens-stablecoins-and-fees.002.png) 7 July 2022![](img/2022-07-07-research-overview-part-3-tokens-stablecoins-and-fees.002.png)[ Olga Hryniuk](/en/blog/authors/olga-hryniuk/page-1/)![](img/2022-07-07-research-overview-part-3-tokens-stablecoins-and-fees.003.png) 5 mins read

![Olga Hryniuk](img/2022-07-07-research-overview-part-3-tokens-stablecoins-and-fees.004.png)[](/en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](/en/blog/authors/olga-hryniuk/page-1/)

Technical Writer

Marketing &amp; Communications

- ![](img/2022-07-07-research-overview-part-3-tokens-stablecoins-and-fees.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2022-07-07-research-overview-part-3-tokens-stablecoins-and-fees.006.png)[](https://github.com/olgahryniuk "GitHub")

![Nghiên cứu tổng quan phần 3: Tokens, Stablecoin, và phí.](img/2022-07-07-research-overview-part-3-tokens-stablecoins-and-fees.007.png)

[Bài đăng trước](https://iohk.io/en/blog/posts/2022/06/23/overview-of-the-research-enabling-smart-contract-support-on-cardano/) của chúng tôi đã thảo luận về sự đột phá của mô hình EUTxO trên mạng Cardano và cách nó tạo điều kiện để Smart contract trên Cardano hoạt động. Lần này, chúng tôi xem xét kỹ hơn nghiên cứu cho phép hỗ trợ đa tài sản và tạo ra nhiều loại tokens do người dùng xác nhận và chúng tôi cũng thảo luận về lợi ích của phí Babel.

## **Hỗ trợ đa tài sản**

Ethereum được biết đến với khả năng tạo token. Tuy nhiên, các tiêu chuẩn về token của Ethereum không được sổ cái hỗ trợ trực tiếp và yêu cầu các đoạn mã tùy chỉnh lặp đi lặp lại. Điều này làm tăng thêm sự phức tạp, phát sinh thêm chi phí và không hiệu quả bởi vì token được tạo bằng hợp đồng thông minh. Nó được sao chép, chỉnh sửa và không phải là một phần của hệ thống. Điều này để lại lỗ hỏng gây lỗi do con người và có thể tạo ra các lỗi có khả năng dẫn đến thiệt hại tài chính.

Bài báo nghiên cứu ' [UTXOma: UTXO with Multi-Asset Support](https://iohk.io/en/research/library/papers/utxomautxo-with-multi-asset-support/)' của các nhà khoa học của IOG và được trình bày tại hội nghị ISoLA 2020. Bài báo nghiên cứu việc tạo ra một loạt các token do người dùng tạo thông qua các tập lệnh hợp đồng được gọi là *chính sách đúc tiền* .

Bài báo khám phá một thiết kế thay thế cho việc tạo tài sản do người dùng xác nhận dựa trên những sổ cái UTXO của Bitcoin. Nó đề xuất một phần mở rộng của mô hình UTXO, trong đó cấu trúc tính toán của một loại tiền điện tử duy nhất được thay thế bằng một cấu trúc mới quản lý một số lượng không giới hạn các token gốc, do người dùng xác nhận, được gọi là *các gói token*.

Trong mô hình mới này, việc tạo token được kiểm soát bằng cách đúc các tập lệnh chính sách, giống như các tập lệnh xác thực của Bitcoin, sử dụng ngôn ngữ riêng với khả năng diễn đạt tính toán giới hạn. Điều này hỗ trợ tính bảo mật của Bitcoin và làm cho việc tạo và chuyển tài sản một cách nhẹ nhàng và chi phí thấp.

Bài báo ‘[Native Custom Tokens in the Extended UTXO Model](https://iohk.io/en/research/library/papers/native-custom-tokens-in-the-extended-utxo-model/)’  đề xuất sự tổng quát hóa của mô hình EUTXO với các token gốc do người dùng xác nhận. Bài báo khám phá sức mạnh tổng hợp giữa các token gốc từ UTXOma với các hợp đồng thông minh mạnh mẽ dựa trên cơ sở sổ cái UTXO khi được đề xuất bởi mô hình EUTXO. Điều này dẫn đến các chính sách đúc tiền rõ ràng hơn và một phép toán trực tiếp của các hợp đồng đa năng dựa trên những cơ chế của sổ cái EUTXO đa tài sản. Bài báo xác định chính thức tính đúng đắn của phép toán này.

## **Stable coin Djed**

Bên cạnh các token tùy chỉnh, IOG đã thực hiện nghiên cứu về việc triển khai một stablecoin trên Cardano. Bài báo ‘[Djed: A Formally Verified Crypto-Backed Pegged Algorithmic Stablecoin](https://iohk.io/en/research/library/papers/djed-a-formally-verified-crypto-backed-pegged-algorithmic-stablecoin/)’  được xuất bản vào năm 2021.

Bài báo giới thiệu một hợp đồng của stablecoin dựa trên thiết kế thuật toán, sử dụng các hợp đồng thông minh để đảm bảo ổn định giá cả. Đây là một tính năng rất hữu ích cho môi trường tài chính phi tập trung (DeFi). [Djed hoạt động như một ngân hàng tự trị](https://iog.io/en/blog/posts/2021/08/18/djed-implementing-algorithmic-stablecoins-for-proven-price-stability/) . Nó đúc và đốt các stablecoin cũng như dự trữ coin, token trong khi vẫn dự trữ một lượng tiền cơ sở. Hợp đồng duy trì peg của stablecoin ở mức giá mục tiêu bằng cách mua và bán stablecoin, sử dụng khoản dự trữ và tính phí được tích lũy trong khoản dự trữ.

Djed hiện đang được [triển khai bởi COTI.](https://iog.io/en/blog/posts/2021/09/26/coti-to-issue-djed-stablecoin-on-cardano/)

## **Phí Babel**

Những lợi ích của mô hình EUTXO đa tài sản của Cardano đã mở ra một con đường nghiên cứu khác dẫn đến '[phí Babel](https://iohk.io/en/research/library/papers/babel-fees-via-limited-liabilities/)'. Phí Babel là một cơ chế cho phép thanh toán phí giao dịch bằng các đồng tiền khác ngoài ada trên Cardano. Bài báo đã được chấp thuận để xuất bản tại [ACNS 2022](https://acns22.di.uniroma1.it/home), diễn ra vào tháng sáu.

Các giao dịch trên blockchain yêu cầu phí để thực hiện chúng. Để đảm bảo an ninh mạng, phí thường phải được thanh toán bằng đơn vị tiền tệ có nguồn gốc từ một blockchain đã chọn, chẳng hạn như ada trên Cardano chẳng hạn. Tuy nhiên, việc cho phép thanh toán phí bằng các token có giá trị khác nhau mà người dùng sở hữu sẽ cải thiện sự tiện lợi khi sử dụng và cũng mang lại lợi ích cho khả năng tương tác. Nghiên cứu của IOG trong bài báo về phí Babel cho thấy điều này có thể thực hiện được.

Một số tính năng sáng tạo của Cardano, chẳng hạn như mô hình EUTXO và những tài sản gốc đang kết hợp với nhau để kích hoạt phí Babel. Hỗ trợ đa tài sản của Cardano cho phép tạo ra các token được coi là token gốc trên sổ cái. Điều này có nghĩa là các token do người dùng tạo - chỉ có giá trị khi có đủ người dùng coi chúng là có giá trị - có thể được sử dụng để thanh toán phí giao dịch giống như ada, đơn vị tiền tệ chính của Cardano.

Manuel Chakravarty, nhà khoa học về Lambda và là kiến ​​trúc sư Plutus tại IOG cho biết:

Cardano khuyến khích các cộng đồng đặc biệt quan tâm việc tạo các token mới mà những cộng đồng này tự tạo bằng cách sử dụng Plutus. Các thành viên của các cộng đồng này có thể sở hữu nhiều thanh khoản trong một token mà không cần giữ nhiều ada. Để hỗ trợ các cộng đồng như vậy, chúng tôi muốn họ có thể trả tiền cho việc sử dụng mạng lưới bằng token của chính họ.

Vì vậy, khi người dùng muốn thanh toán phí giao dịch bằng các token khác ngoài ada, họ có thể đưa ra đề nghị như vậy bằng cách trả phí Babel thay cho phí giao dịch, nhưng phải đảm bảo bằng ada. Một nhà sản xuất khối xác thực giao dịch có thể chấp nhận đề nghị này và họ thiết lập giao dịch ngay giữa ada và các token được cung cấp theo tỷ giá hối đoái được thông báo trước đó. Sau đó, nhà sản xuất khối tạo giao dịch thứ hai, bao gồm phí bằng ada, trong khi vẫn nhận các token được cung cấp để trao đổi. Bằng cách mở rộng các quy tắc sổ cái một cách phù hợp, giao dịch với khoản nợ phải trả – cùng với giao dịch tương ứng với nó – đã có thể được chấp nhận vào sổ cái như một nhóm. Cái hay của việc này là những người dùng đặt cọc vào ada của họ vẫn nhận được phần thưởng đặt cọc được thanh toán bằng ada như bình thường.

Manuel Chakravarty cho biết thêm:

Bước tiếp theo đối với việc triển khai phí Babel trên Cardano là viết một Đề xuất cải tiến Cardano (CIP) trên các cơ sở của bài báo nghiên cứu. Chúng tôi sẽ trình bày điều này cho cộng đồng thảo luận ngay sau khi phiên bản đầu tiên hoàn thành.

Với sự hỗ trợ đa tài sản và hợp đồng thông minh được giới thiệu trên Cardano vào năm 2020-2021, sổ cái đã trở thành một môi trường chức năng để tạo ra vô số ứng dụng phi tập trung (DApps). Hiện với hơn một nghìn dự án được xây dựng trên Cardano, nghiên cứu và phát triển của IOG tập trung vào việc mở rộng quy mô và tối ưu hóa sự ổn định của Cardano. Vì vậy, trong bài blog tiếp theo, chúng tôi sẽ phản ánh nhiều hơn về nghiên cứu thúc đẩy khả năng mở rộng và khả năng tương tác của Cardano.

Bài này được dịch bởi Lê Nguyên [voi bài gốc](https://iohk.io/en/blog/posts/2022/07/07/research-overview-part-3-tokens-stablecoins-and-fees)

*Dự án này được tài trợ bới Catalyst*
