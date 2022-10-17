# Xử lý đồng thời: Hợp đồng thông minh của Cardano và mô hình EUTXO

### **Mô hình EUTXO của Cardano cung cấp một môi trường an toàn và linh hoạt để xử lý đa tác vụ mà không gây lỗi hệ thống**

![](img/2021-09-10-concurrency-and-all-that-cardano-smart-contracts-and-the-eutxo-model.002.png) Ngày 10 tháng 9 năm 2021 ![](img/2021-09-10-concurrency-and-all-that-cardano-smart-contracts-and-the-eutxo-model.002.png)[ Olga Hryniuk](tmp//en/blog/authors/olga-hryniuk/page-1/) ![](img/2021-09-10-concurrency-and-all-that-cardano-smart-contracts-and-the-eutxo-model.003.png) 7 phút đọc

![Olga Hryniuk](img/2021-09-10-concurrency-and-all-that-cardano-smart-contracts-and-the-eutxo-model.004.png)[](tmp//en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](tmp//en/blog/authors/olga-hryniuk/page-1/)

Technical Writer

Marketing &amp; Communications

- ![](img/2021-09-10-concurrency-and-all-that-cardano-smart-contracts-and-the-eutxo-model.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2021-09-10-concurrency-and-all-that-cardano-smart-contracts-and-the-eutxo-model.006.png)[](https://github.com/olgahryniuk "GitHub")

![Xử lý đồng thời: Hợp đồng thông minh của Cardano và mô hình EUTXO](img/2021-09-10-concurrency-and-all-that-cardano-smart-contracts-and-the-eutxo-model.007.jpeg)

Cardano là một blockchain dựa trên UTXO, sử dụng mô hình lập trình cho các ứng dụng phi tập trung (DApps) khác so với blockchain dựa trên tài khoản như Ethereum. [Mô hình Đầu ra Giao dịch Chưa được chi tiêu Mở rộng (EUTXO)](https://iohk.io/en/blog/posts/2021/03/11/cardanos-extended-utxo-accounting-model/) là mô hình đặc biệt sử dụng trên Cardano, được giới thiệu trong bản nâng cấp Alonzo. EUTXO cung cấp khả năng bảo mật cao hơn cho phép dự đoán chi phí thực thi hợp đồng thông minh (mà không gây ra những bất ngờ khó chịu) và qua đó, cung cấp một cách tiếp cận khác để song song hóa.

EUTXO kế thừa thiết kế phân nhánh của mô hình UTXO (Bitcoin), trong đó một nhánh được định nghĩa là một chuỗi các giao dịch yêu cầu  xác thực tuần tự. Để phân chia logic qua các nhánh khác nhau và thực thi một cách song song hơn, điều cần thiết là phải xây dựng DApp và các giải pháp khác bằng cách sử dụng *nhiều UTXO*. Điều này mang lại lợi ích về quy mô, giống như việc phát triển các dịch vụ của Bitcoin, điều kiện tiên quyết là tách một ví thành các ví phụ.

DApp xây dựng trên Cardano **không bị giới hạn** một giao dịch trên mỗi block. Trên thực tế, ngân sách của một block (đó là số lượng giao dịch tối đa mà block đó có thể giữ) cho phép thực hiện hàng trăm giao dịch đơn giản và một số tập lệnh phức tạp. Tuy nhiên, mô hình EUTXO cho phép một đầu ra giao dịch chỉ được chi tiêu một lần. Do đó người dùng có thể phải đối mặt với các vấn đề tranh chấp khi cố gắng truy cập vào cùng một UTXO, điều cốt lõi ở đây là cần sử dụng nhiều UTXO khác nhau. Lưu ý rằng điều này là quan trọng trừ khi một thiết kế như vậy đạt lợi ích từ lệnh yêu cầu đặt hàng nghiêm ngặt của khách hàng. Các bộ UTXO có thể được sử dụng để triển khai mô hình thiết kế chứa các semaphore (chú thích thêm: semaphores là cơ chế hữu dụng để kiểm soát truy cập của nhiều tiến trình đến một tài nguyên chung trong môi trường lập trình song song). Ngoài ra, những người dùng khác nhau có thể tương tác với một hợp đồng thông minh mà không gặp bất kỳ lỗi xử lý đồng thời nào. Đó là vì hợp đồng thông minh có thể xử lý *một số lượng UTXO khác nhau* tạo nên trạng thái hiện tại và siêu dữ liệu ngoài chuỗi cho phép thông dịch các UTXO đó.

## **Thực thi song song**

Các blockchain đạt được tính bất biến và minh bạch trong quá trình xử lý giao dịch theo nhiều cách khác nhau. Bất kỳ hệ thống blockchain nào cũng phải sở hữu một tập hợp các thuộc tính để đáp ứng nhu cầu ngày càng tăng về xử lý hoạt động an toàn nhưng nhanh chóng, cụ thể là:

- **Thông lượng** - số lượng hoạt động mà hệ thống có thể thực hiện trong một khoảng thời gian nhất định. Ví dụ: liên quan đến số lượng giao dịch hoặc hợp đồng thông minh được xử lý trong một giây.
- **Hiệu suất** - hệ thống hoạt động nhanh như thế nào. Hiệu suất đo lường thời gian thực hiện giao dịch hoặc hợp đồng thông minh.
- **Khả năng mở rộng** - khả năng hệ thống thực hiện nhiều hoạt động mà không xảy ra quá tải mạng hoặc ảnh hưởng đến các thuộc tính hiệu suất.

Bằng cách gia tăng tính song song, chúng ta có thể cải thiện thông lượng của hệ thống trong khi vẫn giữ nguyên hiệu suất của các hoạt động riêng lẻ, nhưng khả năng mở rộng sẽ luôn bị giới hạn bởi mức độ cạnh tranh.

Khi nói đến khả năng mở rộng, chúng ta cũng phân biệt các thuộc tính hệ thống như *tính đồng thời*, *tính song song* và *tính cạch tranh*. Đồng thời là cần thiết để cho phép nhiều tác nhân cùng tiến hành một tác vụ nhất định mà không ảnh hưởng lẫn nhau. Song song cho phép những tác vụ này diễn ra *cùng một lúc* mà không xảy ra bất kỳ sự cạnh tranh nào. Cạnh tranh xảy ra khi nhiều tác nhân đó gây trở ngại cho nhau trong khi làm việc đồng thời hoặc song song.

## **Hiểu về tính đồng thời**

Tính đồng thời có thể hoặc không giúp cải thiện hiệu suất, thông lượng hoặc khả năng đáp ứng của hệ thống. Số lượng các tác vụ đồng thời bị giới hạn bởi số lượng tối đa các hoạt động đồng thời có thể được thực hiện.

Để đạt được những cải thiện về hiệu suất *thực tế* trong một blockchain dựa trên UTXO, bộ xử lý hoặc các tác nhân khác phải có thể thực hiện nhiều tác vụ đồng thời. Mức độ đồng thời càng cao thì khả năng song song tối đa càng cao. Cách tiếp cận như vậy sẽ giúp cải tiến hiệu suất và thông lượng. Nó cũng cung cấp những lợi thế đáng kể so với các hệ thống dựa trên tài khoản (như Ethereum).

## ***Sự khác biệt* khi triển khai DApp trên sổ cái UTXO**

Cách thức triển khai DApp trên Cardano có sự khác biệt, do đó nó yêu cầu một kiến thức và cách tiếp cận khác. Điều này giống như làm việc với các ngôn ngữ lập trình khác nhau: có một mục tiêu - triển khai một giải pháp, nhưng có rất nhiều ngôn ngữ lập trình để sử dụng cho mục đích này.

Tối đa hóa sự đồng thời là một kỹ năng cần phải học: các nhà phát triển cần phải viết code theo cách hạn chế tối đa nguy cơ tranh chấp (ví dụ: bằng cách tránh các trạng thái chia sẻ và các biến phụ thuộc ngẫu nhiên). Sau đó hệ thống phải chuyển sự đồng thời này thành song song. Một số nhà phát triển đã xác định được cách tiếp cận để đạt được điều này, trong khi những nhà phát triển khác vẫn đang xây dựng các giải pháp. Sẽ không hiệu quả nếu chỉ đơn giản lắp ghép các bài học kinh nghiệm vào trong một blockchain; trong khi việc học tập sẽ phức tạp hơn nhưng kết quả đạt được sẽ là một thành quả xứng đáng.

Dù bằng cách nào, điều quan trọng cần phải hiểu là để triển khai DApp có khả năng mở rộng trên Cardano, nhà phát triển không thể chỉ sử dụng một hợp đồng Ethereum được điều chỉnh lại. Cardano dựa trên mô hình đầu ra giao dịch chưa được chi tiêu; không phải mô hình dựa trên tài khoản. Điều này có nghĩa là một trạng thái on-chain duy nhất sẽ không đáp ứng thuộc tính đồng thời trên Cardano. Thay vào đó, DApp nên phân chia trạng thái on-chain của mình thành nhiều UTXO. Điều này sẽ làm tăng tính đồng thời trong ứng dụng, qua đó cho phép thông lượng cao hơn.

Nhóm giáo dục của chúng tôi trước đây đã chia sẻ cách triển khai DEX kiểu AMM (automated market maker) đơn giản trong khóa học Plutus Pioneer. Dù hữu ích cho mục đích giảng dạy, nhưng kiến trúc này sẽ không hỗ trợ trực tiếp cho một DEX thương mại, nơi yêu cầu phương pháp tiếp cận theo hình thức sổ lệnh (order book) và yêu cầu khả năng xử lý đồng thời rất cao. Một nhà phát triển muốn triển khai trên mạng chính Cardano sẽ cần phải cải thiện khả năng mở rộng của kiến trúc cho phù hợp.

Chúng tôi đã đề xuất một giải pháp trong [bài nghiên cứu về stablecoin Djed](https://iohk.io/en/research/library/papers/djeda-formally-verified-crypto-backed-pegged-algorithmic-stablecoin/) gần đây. Đối với việc triển khai Djed trên Cardano, mô hình sổ lệnh được ưa chuộng, theo đó người mua bán có trách nhiệm chuyển tiếp bất kỳ đơn hàng minting (đúc) hoặc burning (đốt) nào tới hợp đồng thông minh stablecoin, với một khoản phí khuyến khích bổ sung được áp dụng cho mỗi người mua hoặc người bán stablecoin và đồng dự trữ (reserve coin). Một số cơ chế bảo mật - thông qua việc sử dụng thêm các Token không thể thay thế (NFT) - cũng được dùng để đảm bảo tính duy nhất của các giao dịch, tính đúng đắn của mỗi đơn đặt hàng được gửi và để ngăn chặn các cuộc tấn công chạy trước (front-running). Các NFT cũng được sử dụng để ghi nhận xem các đơn đặt hàng đúc và đốt thành công hay thất bại. Chúng tôi sẽ sớm xuất bản một bài báo chi tiết hơn về vấn đề này.

Để tìm hiểu thêm về khả năng mở rộng, bạn có thể đọc [cách thiết kế ứng dụng Plutus có khả năng mở rộng](https://plutus.readthedocs.io/en/latest/plutus/howtos/writing-a-scalable-app.html) và tìm hiểu cách tổ chức DApp trên Cardano bằng cách sử dụng [các mô hình sổ lệnh](https://plutus.readthedocs.io/en/latest/plutus/explanations/order-book-pattern.html). Các nhà phát triển cũng đã trình bày [các phương pháp tiếp cận tính đồng thời và tính xác định đối với kiến trúc hợp đồng thông minh EUTXO](https://medium.com/meld-labs/concurrent-deterministic-batching-on-the-utxo-ledger-99040f809706) có thể được coi là sự khái quát về các bước của máy trạng thái (state machine) thực thi song song được giới thiệu trong [bài nghiên cứu về Hydra](https://iohk.io/en/research/library/papers/hydrafast-isomorphic-state-channels/) để hiện thực hóa máy trạng thái đa bước (multi-step state machines). Một số [nhà phát triển](https://twitter.com/ErgoDex/status/1434241104015151105?s=20) và thành viên cộng đồng khác cũng đã xuất bản các bài nghiên cứu, [video](https://youtube.com/watch?v=TxnvYsBnLjQ) , [bài báo](https://sundaeswap-finance.medium.com/concurrency-state-cardano-c160f8c07575) và các [chủ đề](https://twitter.com/CardanoMaladex/status/1434960813006200835) hữu ích trên Twitter đưa ra các phương pháp tiếp cận của họ. Đây là một bài học tuyệt vời về cách mà cộng đồng sẽ tiếp tục phát triển các giải pháp sáng tạo của riêng mình, cũng như các phương pháp tiếp cận trở nên chuẩn hóa hơn với sự trưởng thành của nền tảng.

## **Lộ trình tiếp theo**

Sự kiện hard fork Alonzo sẽ giới thiệu các miếng ghép nền tảng của Plutus 1.0. Đây là bước khởi đầu của sự phát triển hệ sinh thái. Mặc dù vẫn còn rất sớm, nhưng mạng testnet Alonzo đã cho phép các nhà phát triển của chúng ta đánh giá những thuộc tính hệ thống và xây dựng các DApp có khả năng mở rộng - chuẩn bị cho việc ra mắt trên mainnet của họ. Hàng chục dự án đã và đang làm việc với các phiên bản môi trường Plutus nội bộ. Với việc mạng testnet công khai chính sẽ sớm hỗ trợ các hợp đồng thông minh, chúng tôi hy vọng sẽ có sự gia tăng hoạt động đáng kể trong các tuần và tháng tới đây. Cuối tháng này, [hội nghị thượng đỉnh Cardano](https://summit.cardano.org/) (25-26 tháng 9) sẽ giới thiệu nhiều dự án trong số này, đồng thời cung cấp các cập nhật quan trọng về lộ trình của hợp đồng thông minh và bước phát triển tiếp theo của nền tảng công nghệ. Các sự kiện dành cho nhà phát triển, hackathons và tất nhiên kết quả của Dự án Catalyst sẽ tiếp tục mang lại các công cụ mới và những điều không tưởng cho hệ sinh thái nhà phát triển đang gia tăng nhanh chóng này.

Nếu bạn là một nhà phát triển, hãy tham gia [cộng đồng Discord](https://discord.gg/ScxDkrxpBg) của chúng tôi và [Project Catalyst](https://cardano.ideascale.com/a/index) nếu bạn đang tìm nguồn tài trợ cho dự án của mình.

*Tôi xin cảm ơn [Lars Brünjes](https://github.com/brunjlar) , [Jann Müller](https://github.com/j-mueller) và [Manuel Chakravarty](https://github.com/mchakravarty) vì những đóng góp và hỗ trợ kỹ thuật của họ trong quá trình chuẩn bị bài đăng này.*

Bài này được dịch bởi Hoàng Tâm, review bởi Quang Pham , biên tập bởi Nguyễn Hiệu.

Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/09/10/concurrency-and-all-that-cardano-smart-contracts-and-the-eutxo-model/)

*Dự án này được tài trợ bởi Catalyst*
