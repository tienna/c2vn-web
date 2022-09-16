# Phân tích về khả năng mở rộng của Cardano

### **Xem xét kỹ hơn nghiên cứu của IOG, phần 4. Cách thức các giải pháp layer 1 và layer 2 tạo ra một blockchain nhanh hơn và linh hoạt hơn**

![](img/2022-07-19-an-analysis-of-the-research-underpinning-cardanos-scalability.002.png) Ngày 19 tháng 7 năm 2022![](img/2022-07-19-an-analysis-of-the-research-underpinning-cardanos-scalability.002.png)[ Olga Hryniuk](/en/blog/authors/olga-hryniuk/page-1/)![](img/2022-07-19-an-analysis-of-the-research-underpinning-cardanos-scalability.003.png) 7 phút đọc

![Olga Hryniuk](img/2022-07-19-an-analysis-of-the-research-underpinning-cardanos-scalability.004.png)[](/en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](/en/blog/authors/olga-hryniuk/page-1/)

Technical Writer

Marketing &amp; Communications

- ![](img/2022-07-19-an-analysis-of-the-research-underpinning-cardanos-scalability.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2022-07-19-an-analysis-of-the-research-underpinning-cardanos-scalability.006.png)[](https://github.com/olgahryniuk "GitHub")

![Một phân tích về nghiên cứu củng cố khả năng mở rộng của Cardano](img/2022-07-19-an-analysis-of-the-research-underpinning-cardanos-scalability.007.png)

Các bài đăng trên blog trước đây đã đi sâu vào [nghiên cứu nền tảng](https://iohk.io/en/blog/posts/2022/06/10/cardanos-foundational-research-overview/) cho phép hỗ trợ sổ cái đa chức năng của Cardano với [các hợp đồng thông minh ](https://iohk.io/en/blog/posts/2022/06/23/overview-of-the-research-enabling-smart-contract-support-on-cardano/) và [tài sản gốc](https://iohk.io/en/blog/posts/2022/07/07/research-overview-part-3-tokens-stablecoins-and-fees/) .

Như là một phần giai đoạn phát triển của kỷ nguyên Basho, Cardano đang tiến hành nâng cấp và tối ưu hóa sự ổn định để tăng khả năng mở rộng và khả năng tương tác. Bài đăng ‘[Cách chúng ta mở rộng mạng Cardano năm 2022](https://iohk.io/en/blog/posts/2022/01/14/how-we-re-scaling-cardano-in-2022/)’ phản ánh các mục tiêu về khả năng mở rộng của Cardano, đồng thời cũng thảo luận về [khả năng tương tác và vai trò của các sidechains](https://iohk.io/en/blog/posts/2022/01/14/how-we-re-scaling-cardano-in-2022/). Bài đăng mới này sẽ xem xét kỹ hơn việc nghiên cứu cho phép thực hiện từng bước những cải tiến này.

## **Mở rộng quy mô cho mạng Cardano**

Khả năng mở rộng là điều cần thiết đối với mạng lưới blockchain để hỗ trợ việc mở rộng người dùng và đảm bảo việc tăng trưởng mà không phải hy sinh thông lượng dữ liệu.

Mở rộng quy mô blockchain thường yêu cầu một cách tiếp cận có thể kết hợp với nhiều giải pháp đa dạng để phù hợp với mọi tình huống và mọi dự án. Ví dụ:

- Giải pháp layer 1 là các nâng cấp được áp dụng trực tiếp cho giao thức chuỗi chính.
- Giải pháp layer 2 là chuỗi bổ sung (sidechains) hoặc giải pháp layer 2 (ZK rollups) để tăng hiệu suất chuỗi chính.

## **Các giải pháp mở rộng layer 1**

Pipelining và Input Endorser là hai giải pháp trên chuỗi chính. Nó được lên kế hoạch phát triển trong năm 2022-2023. Chi tiết bài báo nghiên cứu về Pipelining chưa được xuất bản. Nhưng, dưới đây là một số đặc tính và cơ sở lý luận cho việc này.

**Pipelining trong Ouroboros**

Để hiểu Pipelining là gì, trước tiên chúng ta hãy định nghĩa thuật ngữ truyền block . Truyền block có nghĩa là các node tạo block và phát tán các block mới này trên toàn mạng.

Pipelining cải thiện thời gian truyền khối. Mục đích là để các khối được truyền tải đến các node ngang hàng trong vòng năm giây. Pipelining cho phép điều này xảy ra bằng cách cung cấp cho các node có khả năng thông báo trước cho các node phía sau của chúng về một khối đang đến, cho phép node nhận phần thân khối trước.

Nghiên cứu đưa ra một ý tưởng để phát tán các khối trước khi xác nhận đầy đủ. Điều này đưa công việc xác thực phần thân khối ra khỏi thời gian truyền tải khối và cho phép thời gian dành cho việc xác nhậnđồng thời với việc gửi khối tới node ngang hàng khác trong mạng. Điều này làm giảm thời gian truyền khối, cho phép tăng kích thước khối hoặc cải tiến Plutus. Do đó, khối càng lớn thì càng có nhiều giao dịch và tập lệnh Plutus, điều này tăng thông lượng của blockchain. Những nâng cấp này được lên kế hoạch áp dụng cho Cardano trong sự kiện  hard fork Vasil.

**Input endorsers**

Việc thực hiện Input endorsers cũng sẽ cải thiện thời gian và lưu lượng truyền khối. Input endorsers theo dõi tất cả các giao dịch đã gửi và đóng gói các giao dịch này trở thành các khối được xây dựng trước. Điều này có nghĩa là có 2 phần của khối, một phần chứa các giao dịch, một phần để đạt được đồng thuận. Các khối thực hiện đồng thuận sẽ tham chiếu đến các khối được xây dựng trước, được truyền liên tục mà không cần phải đợi cho đến khi đạt được sự đồng thuận. Điều này sẽ cải thiện thời gian truyền khối và cho phép tốc độ giao dịch cao hơn.

John Woods, cựu Giám đốc Kiến trúc Cardano tại IOG, cho biết:

Thực hiện Pipelining là một công nghệ tuyệt vời. Tổng hợp các bài thử nghiệm cho thấy mức tăng hiệu suất lên đến 40%. Đó là điều tuyệt vời về việc mở rộng quy mô của Cardano để đáp ứng nhu cầu vào năm 2022-2023. Năm 2023 sẽ chứng kiến sự ra mắt của [Ouroboros Leios ](https://www.youtube.com/watch?v=xKv94MwSNBw)(Input endorsers), là điều sẽ thay đổi cuộc chơi. Dự kiến, Input endorsers vào sẽ mở rộng quy mô Cardano trong nửa thập kỷ tới.

**Định giá theo bậc thang**

Một sáng kiến ​​nghiên cứu khác của các nhà khoa học IOG là thực hiện [định giá theo bậc thang](https://iohk.io/en/blog/posts/2021/11/26/network-traffic-and-tiered-pricing/) . Ví dụ, trong hệ thống hiện tại, tất cả các giao dịch được xử lý như nhau mà không có khả năng thay đổi mức độ ưu tiên của chúng bằng cách trả phí gas cao hơn. Cách tiếp cận này hoạt động tốt miễn là lưu lượng mạng có thể so sánh với nhu cầu xử lý giao dịch. Tuy nhiên, khi việc sử dụng mạng tăng lên, không phải tất cả các giao dịch cuối cùng đều có thể được đưa vào blockchain. Khả năng xảy ra tấn công từ chối dịch vụ (DoS) – lợi dụng việc xử lý giao dịch công bằng để chuyển thư rác độc hại thành các giao dịch hợp pháp - yêu cầu các biện pháp *bổ sung* để hỗ trợ sức khỏe của mạng.

Định giá theo bậc thang cho phép hiệu suất hệ thống ổn định theo cách nhanh lẹ và đặc biệt có liên quan trong việc ngăn chặn các cuộc tấn công DoS. Nghiên cứu đề xuất duy trì khả năng dự đoán, tính công bằng và hiệu quả chi phí của các giao dịch Cardano trong khi giảm thiểu các vấn đề có thể phát sinh từ nhu cầu mạng lưới ngày càng lớn hơn. Cách tiếp cận đưa ra một cơ chế phí giao dịch mới, trong đó mỗi khối được chia thành ba 'cấp' (dựa trên trường hợp sử dụng). Mỗi cấp tạo nên một tỷ lệ phần trăm của kích thước khối tối đa và được thiết kế cho các loại giao dịch khác nhau như: công bằng, cân bằng và tức thì. Khi mạng lưới không bận, các cấp mặc định là tiêu chuẩn cơ bản để ưu tiên giao dịch.

## **Giải pháp khả năng mở rộng layer 2**

Ví dụ, để giúp mở rộng quy mô một số giao dịch có thể được xử lý cùng một lúc, một mạng lưới blockchain có thể tạo ra một số sidechain, giới thiệu các state channels hoặc áp dụng một sơ đồ đa chữ ký dựa trên cổ phần.

**Sidechains**

Bài báo `[Proof-of-Stake Sidechains](https://iohk.io/en/research/library/papers/proof-of-stake-sidechains/)` được xuất bản vào năm 2019. Bài báo này cung cấp định nghĩa chính thức đầu tiên về hệ thống sidechain và cách tài sản có thể được di chuyển an toàn giữa các sidechain.

Các nhà khoa học của IOG đã đưa ra một định nghĩa bảo mật nhằm tăng cường các thuộc tính của sổ cái giao dịch đã biết về tính bền bỉ và tồn tại để giữ trên nhiều sổ cái và nâng cao chúng bằng thuộc tính bảo mật 'tường lửa' mới. Điều này bảo vệ mỗi blockchain khỏi các sidechain của nó, hạn chế tác động của một sự cố sidechain thảm khốc có thể xảy ra. Bài báo cũng cung cấp cấu trúc sidechain phù hợp với các hệ thống sidechain bằng chứng cổ phần và nhất quán với giao thức đồng thuận Ouroboros. Các kỹ thuật như hợp nhất đặt cọc, chứng nhận chuỗi chéo và sử dụng đa chữ ký được trình bày để đảm bảo khả năng phục hồi của sidechains trước các cuộc tấn công độc hại.

Kết quả của nghiên cứu này, IOG đã phát triển [sidechain Cardano EVM](https://iohk.io/en/blog/posts/2022/07/06/introducing-the-cardano-evm-sidechain/), hiện đang ở phiên bản alpha trên testnet. Nó sẽ tương thích với các công cụ và thư viện của Ethereum, cho phép các nhà phát triển tạo hợp đồng thông minh Solidity, DApps và mã thông báo ERC20 trên Cardano để đạt được những lợi ích như hiệu quả chi phí, khả năng mở rộng và bảo mật.

**Hydra**

Bên cạnh sidechains, còn có các giải pháp khác để cải thiện khả năng mở rộng mạng lưới. Ví dụ: những state channel của Hydra.

Bài báo nghiên cứu `[Hydra: Fast Isomorphic State Channels](https://iohk.io/en/research/library/papers/hydra-fast-isomorphic-state-channels/)` được xuất bản vào năm 2021. Bài báo giới thiệu về Hydra - một isomorphic multi-party state channel. Các state channel là một giải pháp layer 2 đầy hấp dẫn để cải thiện lưu lượng và độ trễ của các blockchain. Hydra đơn giản hóa giao thức ngoài chuỗi và phát triển hợp đồng thông minh bằng cách áp dụng trực tiếp hệ thống hợp đồng thông minh layer 1, theo cách này cho phép sử dụng cùng một đoạn mã cả trong và ngoài chuỗi. Tận dụng [mô hình EUTxO](https://iohk.io/en/research/library/papers/the-extended-utxo-model/) , nghiên cứu đề xuất cách phát triển một giao thức ngoài chuỗi nhanh chóng dành cho sự phát triển của [Hydra Heads](https://iohk.io/en/blog/posts/2022/02/03/implementing-hydra-heads-the-first-step-towards-the-full-hydra-vision/), giao thức hiện đang được triển khai trên Cardano.

**Mithril**

Cuối cùng, để đạt được khả năng mở rộng lớn hơn, điều quan trọng là phải sắp xếp tốc độ và hiệu quả đồng bộ hóa dữ liệu giữa các ứng dụng. Giải quyết vấn đề này, nhóm nghiên cứu của IOG đã xuất bản bài báo về  ‘[Mithril: Stake-based Threshold Multisignatures](https://iohk.io/en/research/library/papers/mithril-stake-based-threshold-multisignatures/)’ vào năm 2021.

Chuỗi xác thực hiệu quả là điều cần thiết để đạt được khả năng mở rộng lớn hơn trong thiết lập blockchain. Điều này cũng phụ thuộc vào các thông báo khác nhau được ký bởi trình xác thực mạng. Mithril giải quyết sự phức tạp của các hoạt động quan trọng phụ thuộc vào tính lôgarit của số lượng những người tham gia này. Với thời gian cần thiết để xác thực một thông báo cụ thể và việc sử dụng tài nguyên trong giai đoạn xác thực của việc đồng bộ hóa chuỗi, Mithril cung cấp một giải pháp giúp tổng hợp đa chữ ký nhanh chóng và hiệu quả mà không ảnh hưởng đến các tính năng bảo mật.

Bài báo phản ánh về cách duy trì cài đặt bảo mật mạnh mẽ trong việc tập hợp đa chữ ký. Do đó, Mithril có thể được áp dụng cho giao thức đồng bộ hóa chuỗi nhanh chóng, hiệu quả và an toàn. Nó thuận lợi cho việc bỏ phiếu an toàn, trao đổi dữ liệu giữa các sidechains và đồng bộ hóa dữ liệu trong ví nhẹ. Đây là một phần của giai đoạn Basho và sẽ được thực hiện vào năm 2022.

## **Lời cuối cùng**

Hiện có [144 bài báo](https://iohk.io/en/research/library/) được lưu trữ trong thư viện nghiên cứu IOG và con số này đang không ngừng tăng lên. Tất cả công việc luôn và sẽ tiếp tục đặt nền móng trước khi bất kỳ tính năng hoặc nâng cấp nào được triển khai trên Cardano.

*Trong những tháng tới, chúng tôi sẽ phản ánh nhiều hơn về sự phát triển và nghiên cứu mới nhất đang diễn ra liên quan đến tối ưu hóa sổ cái, cải tiến khả năng mở rộng và các sáng kiến ​​quản trị.*

Bài này được dịch bởi Lê Nguyên, Review va biên tập bởi Nguyễn Hiệu. Bài viết nguồn [tại đây]( https://iohk.io/en/blog/posts/2022/07/19/an-analysis-of-the-research-underpinning-cardanos-scalability)

*Dự án này được tài trợ bới Catalyst*
