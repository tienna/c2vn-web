# Djed: Stablecoin thuật toán đã được xác minh chính thức

### **Djed là đồng tiền đầu tiên sử dụng thuật toán đã được chính thức xác minh để loại bỏ biến động giá**

![](img/2021-08-18-djed-implementing-algorithmic-stablecoins-for-proven-price-stability.002.png) 18 tháng 8 năm 2021 ![](img/2021-08-18-djed-implementing-algorithmic-stablecoins-for-proven-price-stability.002.png) [Olga Hryniuk](tmp//en/blog/authors/olga-hryniuk/page-1/) ![](img/2021-08-18-djed-implementing-algorithmic-stablecoins-for-proven-price-stability.003.png) 7 phút đọc

![Olga Hryniuk](img/2021-08-18-djed-implementing-algorithmic-stablecoins-for-proven-price-stability.004.png)[](tmp//en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](tmp//en/blog/authors/olga-hryniuk/page-1/)

Technical Writer

Marketing &amp; Communications

- ![](img/2021-08-18-djed-implementing-algorithmic-stablecoins-for-proven-price-stability.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2021-08-18-djed-implementing-algorithmic-stablecoins-for-proven-price-stability.006.png)[](https://github.com/olgahryniuk "GitHub")

![ Djed: Stablecoin thuật toán đã được xác minh chính thức](img/2021-08-18-djed-implementing-algorithmic-stablecoins-for-proven-price-stability.007.png)

Sự biến động của tiền mã hóa là một trong những trở ngại khi mở rộng khả năng áp dụng của nó. Công nghệ blockchain cung cấp các ưu điểm như tính minh bạch và bất biến của dữ liệu cũng như tính bảo mật đã được chứng minh cho các hoạt động tài chính. Tuy nhiên, việc dự đoán thị trường sẽ hoạt động như thế nào hoặc dự báo giá trị của một loại tiền mã hóa còn khó hơn so với các loại tiền pháp định. Điều này cản trở việc sử dụng tiền mã hóa làm đơn vị thanh toán và trao đổi trong các hoạt động hàng ngày.

Stablecoin là một loại tiền mã hóa được gắn với một rổ tiền tệ pháp định hay một loại tiền tệ duy nhất (ví dụ: USD hoặc EUR); hàng hóa như vàng hoặc bạc; cổ phiếu; hoặc các loại tiền mã hóa khác. Stablecoin bao gồm các cơ chế duy trì độ chênh lệch giá thấp so với giá mục tiêu của chúng. Do vậy, loại tiền này rất hữu ích để lưu trữ hoặc trao đổi giá trị, vì các cơ chế tích hợp của chúng loại bỏ sự biến động.

Một số stablecoin thiếu tính minh bạch và thanh khoản của nguồn dự trữ, điều này làm ảnh hưởng đến sự ổn định giá của chúng. Để giải quyết những thách thức này, IOG đã hợp tác với Emurgo, một trong ba đối tác sáng lập khác của Cardano và blockchain Ergo. Họ sử dụng mô hình sổ cái dựa trên UTXO như Cardano, để làm việc trên một hợp đồng stablecoin, được gọi là Djed. Các thuật toán được sử dụng để thiết kế Djed. Nghĩa là nó sử dụng các hợp đồng thông minh (smart contract) để đảm bảo tính ổn định giá và như vậy, đồng tiền này sẽ hữu ích cho các hoạt động tài chính phi tập trung (decentralized finance-DeFi).

## **Phương thức làm việc của stablecoins**

Các cơ chế khác nhau góp phần vào việc ổn định giá trị của đồng tiền và giúp loại bỏ các biến động về giá. Các cơ chế này cũng được củng cố bởi các nguyên tắc kinh tế giữa cung và cầu.

Một cơ chế phổ biến để đảm bảo stablecoin là sử dụng một khoản dự trữ tiền tệ làm cột mốc. Nếu nhu cầu cao hơn lượng cung từ các lệnh bán hoặc mua, lượng cung này sẽ được tăng lên để tránh biến động về giá. Thông thường, lượng dự trữ stablecoin không được lưu trữ bằng tiền mặt. Thay vào đó, chúng được giữ trong các công cụ tài chính có lãi suất như trái phiếu. Lợi nhuận từ những thứ này mang lại doanh thu cho các nhà khai thác.

Miễn sao stablecoin được đảm bảo toàn bộ từ một khoản dự trữ dựa trên tiền tệ, được sử dụng làm cột mốc - và các nhà khai thác có thể phản ứng nhanh chóng trước các thay đổi của nhu cầu - đồng thời vẫn duy trì được sự ổn định giá.

## **Rủi ro chung**

Dự trữ stablecoin thường được kết hợp với các khoản đầu tư. Tính thiếu thanh khoản của các khoản đầu tư này có thể khiến nhà khai thác khó phản ứng nhanh trước các nhu cầu. Điều này làm ảnh hưởng đến sự ổn định giá trong ngắn hạn.

Một hạn chế của stablecoin được đảm bảo bằng tiền tệ là chúng yêu cầu sự tin tưởng vào các thực thể giữ các lượng dự trữ. Việc lượng dữ trữ thiếu tính minh hoặc thiếu yêu cầu “đảm bảo toàn bộ”, kết hợp với các biện pháp ổn định giá không hiệu quả, đã khiến đồng stablecoin Tether (USDT) giảm xuống dưới 0,96$, như thể hiện trong Hình 1.

![Giá USDT](img/2021-08-18-djed-implementing-algorithmic-stablecoins-for-proven-price-stability.008.png)

Hình 1. Giá của stablecoin Tether (USDT) trong ba năm qua

Vấn đề về tính minh bạch sẽ không phát sinh khi bảo đảm bằng tài sản dựa trên một loại tiền mã hóa trong một blockchain công khai. Hơn nữa, việc sử dụng hợp đồng thông minh đảm bảo thực hiện hiệu quả và đáng tin cậy các biện pháp ổn định giá do các cơ chế tự động và an toàn của nó.

## **Sử dụng thuật toán để nâng cao cơ chế ổn định của đồng stablecoin Djed**

Djed là một hợp đồng stablecoin được đảm bảo bằng tiền mã hóa và hoạt động như một ngân hàng tự trị. Nó hoạt động bằng cách giữ một khoản dự trữ đồng cơ sở gọi là *base coin*, đồng thời đúc (minting) và đốt (burning) đồng *stablecoin* và *reserve coin* (đồng dự trữ). Hợp đồng duy trì mức cột mốc của stablecoin ở mức giá mục tiêu bằng cách mua và bán stablecoin, sử dụng khoản dự trữ và phí giao dịch được tích lũy trong khoản dự trữ, như được thể hiện trong Hình 2. Người hưởng lợi cuối cùng của nguồn doanh thu này là người nắm giữ reserve coin. Những người này tăng khoản dự trữ bằng cách ký quỹ trong quá trình giả định rủi ro biến động giá.

![Phương thức làm việc của Djed](img/2021-08-18-djed-implementing-algorithmic-stablecoins-for-proven-price-stability.009.png)

Hình 2. Phương thức làm việc của Djed

Stablecoin Djed được thiết kế như một tài sản gắn liền với một loại tiền tệ pháp định (USD), cùng với một thuật toán quản lý. Cách tiếp cận này cung cấp một phương tiện trao đổi ổn định. Nhưng Djed không bị giới hạn với việc sử dụng đồng đô la làm cột mốc. Nó có thể hoạt động với các loại tiền tệ khác, miễn là nguồn cấp dữ liệu (oracle) cung cấp hợp đồng với chỉ số định giá tương ứng.

## **Giao thức stablecoin đầu tiên được xác minh chính thức**

Djed là giao thức stablecoin đầu tiên *được xác minh chính thức*. Việc sử dụng các phương pháp chính thức khi lập trình đã góp phần rất lớn vào thiết kế và các đặc tính ổn định của Djed. Các đặc tính này được chứng minh dựa trên các định lý toán học bằng cách sử dụng các phương thức kỹ thuật chính thức.

- **Cột mốc duy trì giới hạn trên và dưới**: giá sẽ không cao hơn hoặc thấp hơn mức giá đã đặt. Trong phạm vi tỷ lệ dự trữ thông thường, việc mua &amp; bán không bị hạn chế và người dùng không có động cơ để giao dịch stablecoin ngoài phạm vi neo giá trên thị trường thứ cấp.
- **Sự ổn định của cột mốc trong thời gian thị trường sụp đổ**: khi lên đến một giới hạn nhất định phụ thuộc vào tỷ lệ dự trữ, cột mốc vẫn được duy trì ngay cả khi giá của base coin giảm mạnh.
- **Không mất khả năng thanh toán**: không có sự tham gia của ngân hàng nên không có hợp đồng ngân hàng và không lo ngân hàng phá sản.
- **Không có ngân hàng nào vận hành**: tất cả người dùng đều được đối xử công bằng và được trả tiền phù hợp. Do đó, không có lý do gì để người dùng phải chạy đua với mục đích mua lại các stablecoin của họ.
- **Độc lập tăng tài sản thuần trên mỗi reserve coin**: trong một số điều kiện, số thặng dư dự trữ trên mỗi reserve coin được đảm bảo tăng, khi người dùng tương tác với hợp đồng. Trong những điều kiện này, người nắm giữ reserve coin được đảm bảo có lợi nhuận.
- **Không rút khoản dự trữ**: trong một số điều kiện, người dùng có ý đồ xấu không thể thực hiện các hành động để ăn trộm nguồn dự trữ từ ngân hàng.
- **Hạn chế pha loãng**: có giới hạn về số lượng người sở hữu reserve coin và lợi nhuận của họ có thể bị pha loãng do việc phát hành nhiều reserve coin hơn.

## **Các phiên bản của Djed**

Có hai phiên bản Djed:

- **Phiên bản Djed đơn giản (Minimal Djed)**: phiên bản này được thiết kế đơn giản, trực quan và dễ hiểu nhất có thể mà không ảnh hưởng đến sự ổn định.
- **Phiên bản Djed mở rộng (Extended Djed)**: phiên bản phức tạp hơn này cung cấp thêm một số ưu điểm về độ ổn định. Sự khác biệt chính là sử dụng mô hình định giá liên tục và phí động để khuyến khích hơn nữa việc duy trì tỷ lệ dự trữ ở mức tối ưu.

## **Triển khai**

Các nhóm IOG, Ergo và Emurgo đã và đang làm việc để triển khai hợp đồng thuật toán stablecoin Djed vào đầu 2021 với mục đích thử nghiệm các mô hình khác nhau.

Việc triển khai hợp đồng stablecoin Djed đầu tiên là [SigmaUSD](https://sigmausd.io/#/) trên Ergo. Đây là stablecoin thuật toán đầu tiên được triển khai trên sổ cái dựa trên UTXO vào quý 1-2021. Nó có phí 1% cho các hoạt động mua &amp; bán và một nguồn cấp dữ liệu cập nhật tỷ giá hối đoái mỗi giờ. Phiên bản đầu tiên này đã phải chịu một cuộc tấn công tiêu hao nguồn dự trữ bởi một người dùng ẩn danh đang sở hữu một số lượng lớn ERG (đồng tiền gốc của Ergo). Cuối cùng, cuộc tấn công đã không thành công, và ước tính kẻ tấn công đã mất 100.000$.

Để ngăn chặn những cuộc tấn công như vậy, lần triển khai ban đầu này của phiên bản Djed đơn giản đã được thay thế bằng một phiên bản có phí được đặt thành 2%, nguồn cấp dữ liệu cập nhật 12 phút một lần và mỗi bản cập nhật nguồn cấp dữ liệu được phép thay đổi giá nhiều nhất là 0,49%, trừ khi chênh lệch giá lớn hơn 50%. Điều này cung cấp khả năng phục hồi mạnh mẽ hơn trước các cuộc tấn công nhằm rút cạn nguồn dự trữ.

Djed cũng đã được nhóm IOG trong Solidity thực hiện. Một phiên bản sử dụng đồng tiền gốc trong blockchain Ethereum làm base coin và một phiên bản khác sử dụng bất kỳ mã thông báo tuân thủ ERC20 nào làm base coin. Cho đến nay, các triển khai này đã được thực hiện cho các testnet của Binance Smart Chain, Fuji của Avalanche, Mumbai của Polygon, Kovan của Ethereum, Rinkeby của Ethereum và testnet của RSK.

## **Djed: Triển khai trên Cardano**

Bản cập nhật Alonzo cho Cardano sẽ kích hoạt các hợp đồng thông minh sử dụng Plutus. Plutus dựa trên Haskell, một ngôn ngữ lập trình đảm bảo môi trường lập trình chuyên sâu và an toàn.

Dự thảo triển khai phiên bản cũ hơn của Minimal Djed [có sẵn bằng ngôn ngữ Plutus](https://github.com/input-output-hk/plutus/blob/master/plutus-use-cases/src/Plutus/Contracts/Stablecoin.hs) . Trong quá trình triển khai này, stablecoin và reserve coin là tài sản gốc được xác định duy nhất bởi hàm băm của chính sách tiền tệ kiểm soát việc đào và đốt các đồng tiền theo giao thức Djed. Việc triển khai này cũng giả định rằng, dữ liệu trong nguồn cấp dữ liệu như tỷ giá hối đoái được cung cấp trực tiếp dưới dạng dữ liệu có đánh dấu cho các giao dịch, thay vì được bổ sung vào dữ liệu on-chain.

Ngoài ra còn có một triển khai OpenStar đang diễn ra. OpenStar là một kết cấu cho các blockchain đã cấp phép riêng được phát triển trong Scala. Việc triển khai Djed bằng cách sử dụng OpenStar, theo ý tưởng thực hiện hợp đồng thông minh dạng off-chain để có một stablecoin trên Cardano. Điều này không phụ thuộc vào các hợp đồng thông minh được thực hiện on-chain hay không.

Để tìm hiểu thêm về Djed stablecoin, hãy xem [bài báo nghiên cứu được công bố gần đây](https://iohk.io/en/research/library/papers/djeda-formally-verified-crypto-backed-pegged-algorithmic-stablecoin/) hoặc xem [Trình bày của Bruno Woltzenlogel Paleo](https://www.youtube.com/watch?v=zG-rxMCDIa0&t=8366s), giám đốc kỹ thuật IOG, tại hội nghị thượng đỉnh Ergo 2021.

*Chúng tôi muốn cảm ơn và ghi nhận Bruno Woltzenlogel Paleo đã đóng góp ý kiến cho bài viết này và sự hỗ trợ trong suốt quá trình tạo ra nó.*

Bài dịch được dịch bởi Chitk, Review bởi Quang Pham, Biên tập bởi Nguyễn Hiệu.

Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/08/18/djed-implementing-algorithmic-stablecoins-for-proven-price-stability/).

*Dự án này được tài trợ bởi Catalyst*.
