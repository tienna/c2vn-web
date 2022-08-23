# Những điều bạn luôn muốn biết mà ngại đặt câu hỏi về Tổn thất tạm thời (Impermanent Loss)

### **Mô hình EUTxO tốt hơn như thế nào so với *Chuỗi dựa trên Tài khoản* (Accounts-based chains) về khả năng dự đoán của *Tổn thất tạm thời***

![](img/2022-05-27-everything-you-always-wanted-to-know-about-impermanent-loss-and-were-afraid-to-ask.002.png) 27 tháng 5 năm 2022 ![](img/2022-05-27-everything-you-always-wanted-to-know-about-impermanent-loss-and-were-afraid-to-ask.002.png) [Fernando Sanchez](/en/blog/authors/fernando-sanchez/page-1/) ![](img/2022-05-27-everything-you-always-wanted-to-know-about-impermanent-loss-and-were-afraid-to-ask.003.png) 9 phút đọc

![Fernando Sanchez](img/2022-05-27-everything-you-always-wanted-to-know-about-impermanent-loss-and-were-afraid-to-ask.004.png)[](/en/blog/authors/fernando-sanchez/page-1/)

### [**Fernando Sanchez**](/en/blog/authors/fernando-sanchez/page-1/)

Technical Writer

Tiếp thị &amp; Truyền thông

- ![](img/2022-05-27-everything-you-always-wanted-to-know-about-impermanent-loss-and-were-afraid-to-ask.005.png)[](mailto:fernando.sanchez@iohk.io "Email")
- ![](img/2022-05-27-everything-you-always-wanted-to-know-about-impermanent-loss-and-were-afraid-to-ask.006.png)[](https://www.linkedin.com/in/linkedinsanchezf/ "LinkedIn")

![Những điều mà bạn luôn muốn biết mà ngại đặt câu hỏi về *Tổn thất tạm thời*](img/2022-05-27-everything-you-always-wanted-to-know-about-impermanent-loss-and-were-afraid-to-ask.007.jpeg)

**Tuyên bố từ chối trách nhiệm** : *Nội dung của bài viết này không phải là lời khuyên về tài chính, đầu tư, pháp lý hoặc thuế. Input Output Global không chịu trách nhiệm về việc bạn sử dụng hoặc phụ thuộc vào bất kỳ thông tin nào trong bài viết này.*

Tài chính phi tập trung (DeFi) là một thuật ngữ đề cập đến các ứng dụng phi tập trung (DApps), dịch vụ, giao thức và công cụ tài chính được xây dựng trên nền tảng blockchain. Đây là một phân khúc khá là mới được kích hoạt bởi công nghệ sổ cái phi tập trung, có nghĩa là không có bất kỳ cơ quan quyền lực nào có quyền kiểm soát tập trung đối với hệ thống. Có lẽ bất cứ ai quen thuộc với môi trường DeFi đều biết về *Tổn thất tạm thời*. Đó là một khái niệm đơn giản nhưng có cái tên dễ gây hiểu lầm.

Cardano là một blockchain thế hệ thứ ba có các tính năng [mở rộng của thế giới tài chính phi tập trung (DeFi)](https://iohk.io/en/blog/posts/2022/01/10/defi-demystified/) và có nhiều DApp, cùng các sàn giao dịch phi tập trung (DEXs). Đây là các giao thức trao đổi tiền mã hóa cho phép mọi người giao dịch tiền mã hóa với nhau. DEXs sử dụng hai kiến trúc thiết kế chính: *Công cụ tạo lập thị trường tự động (AMM)* và *Sổ lệnh (Order book)* . Việc triển khai mô hình AMM tương đối đơn giản và trên thực tế, thiết kế này đã trở thành sự lựa chọn cho các *Chuỗi dựa trên Tài khoản*. Tuy nhiên, thiết kế này có một số khuyết điểm cố hữu. Ví dụ điển hình là việc phải chấp nhận Tổn thất tạm thời.

Cardano sử dụng mô hình sổ cái với đầu ra giao dịch chưa sử dụng (EUTxO) mở rộng để theo dõi sự di chuyển của tài sản trong toàn bộ chuỗi. EUTxO có tính xác định, cung cấp khả năng dự đoán tốt hơn về Tổn thất tạm thời.

Những khái niệm dường như không liên quan này lại kết hợp trở thành một sự tác động qua lại rất thú vị trên blockchain. Bài viết này xem xét các thiết kế của DEX và giải thích lý do tại sao EUTxO cung cấp khả năng dự đoán về Tổn thất tạm thời tốt hơn so với các mô hình *Kế toán dựa trên Tài khoản*.

## **Định nghĩa về Tổn thất tạm thời**

Tổn thất tạm thời là khi giá trị tài sản cung cấp vào pool thanh khoản nhỏ hơn khi bạn nắm giữ chúng khi giá thay đổi.

Đây là định nghĩa đơn giản nhất về Tổn thất tạm thời, một khái niệm khiến các nhà cung cấp thanh khoản cảm thấy e ngại.

Tổn thất tạm thời xảy ra khi giá của tài sản được gửi vào pool thanh khoản bị thay đổi (lên hoặc xuống) so với thời điểm chúng được ký gửi. Nói cách khác, giá trị tài sản của bạn khi rút ra khác với khi bạn gửi chúng vào pool thanh khoản.

Cụm từ *tạm thời (impermanent)* gây một chút hiểu lầm, vì việc giảm giá token có thể chỉ là tạm thời và giá token có thể tăng trở lại tùy theo tình hình thị trường hoặc điều kiện giao dịch, v.v. Trong trường hợp này, khoản lỗ sẽ là *tạm thời*, vì giá có thể phục hồi. Tạm thời sẽ trở thành *vĩnh viễn* nếu giá của token khi rút thấp hơn so với khi token được ký gửi.

Bạn có thể cho rằng Tổn thất tạm thời là rủi ro mà các nhà cung cấp thanh khoản phải trả để đổi lấy lợi nhuận bằng cách giao dịch các cặp tiền mã hóa trên các pool thanh khoản. Tình trạng lỗ (số tiền mất đi lớn hơn số tiền kiếm được) có thể không xảy ra nếu nhà cung cấp thanh khoản nắm giữ các token của mình. Hoặc có thể bạn không bị lỗ, nhưng lợi nhuận của bạn có thể ít hơn so với khi bạn chỉ nắm giữ các token.

## **Mô hình AMM và Sổ lệnh**

Để hiểu được Tổn thất tạm thời đòi hỏi bạn phải có hiểu biết cơ bản về cách hoạt động của sàn DEXs (các sàn giao dịch phi tập trung). Hiện các sàn DEX sử dụng hai mô hình: AMM và Sổ lệnh. Mỗi mô hình có các ưu, nhược điểm riêng khi nói đến sự Tổn thất tạm thời, điều này được trình bày ở phần dưới đây.

**Mô hình AMM**

Chế độ sàn giao dịch phi tập trung (DEX) của Công cụ tạo lập thị trường tự động (AMM) cho phép các cặp tiền mã hóa giao dịch tự động bằng cách sử dụng các hợp đồng thông minh. Các cặp này thường xuyên (nhưng không phải là luôn luôn) là token trên nền tảng Ethereum và một đồng ổn định.

Mô hình AMM dựa vào pool thanh khoản, là cơ chế tạo điều kiện cho người dùng gộp tài sản của họ vào các hợp đồng thông minh. Càng có nhiều tính thanh khoản thì việc giao dịch trên sàn DEX càng trở nên dễ dàng hơn, các nhà cung cấp thanh khoản kiếm được tiền và phần thưởng càng cao. Pool thanh khoản tổng hợp các thanh khoản được cung cấp bởi các nhà đầu tư vào cả hai bên của cặp giao dịch. Nhóm sử dụng một thuật toán xem xét tính thanh khoản để tính toán giá thị trường của cặp tiền tại thời điểm đó. Nói một cách khác, thuật toán xem xét tính khả dụng của một tài sản cụ thể để xác định giá của nó.

Mô hình AMM hầu như dựa hoàn toàn vào các nhà cung cấp thanh khoản để cung cấp tính thanh khoản nhằm mở rộng quy mô của pool và đảm bảo tài sản được giao dịch ở mức giá hợp lý. Đặc điểm của thiết kế này có hiệu quả là các nhà cung cấp thanh khoản chính là những người tạo ra thị trường.

Tất nhiên, các nhà cung cấp thanh khoản cần có động cơ để đầu tư. Điều này xảy ra dưới hình thức Yield farming, về cơ bản là phần thưởng token kiếm được thông qua việc cho vay hoặc đặt cọc tài sản kỹ thuật số.

**Mô hình Sổ lệnh**

Cơ chế trong việc thiết kế Sổ lệnh đã có từ lâu trong lĩnh vực kinh tế. Đó là một mô hình rất đơn giản. Sổ lệnh chỉ đơn giản là liệt kê tất cả các lệnh mua / bán (hỏi / đặt giá), vì vậy khi các nhà giao dịch đặt lệnh, sổ lệnh sẽ sắp xếp chúng theo giá của tài sản. Nếu có cung và cầu, tài sản có thể được giao dịch.

Sổ cái dựa trên UTXO, như Cardano, phù hợp hơn nhiều với kiến trúc Sổ lệnh, vì thiết kế này, cùng với các tính năng EUTxO của Cardano làm giảm thiểu tác động của Tổn thất tạm thời.

## **Khả năng dự đoán (hoặc không thể dự đoán) của Tổn thất tạm thời**

Các nhà cung cấp thanh khoản cung cấp tính thanh khoản cho các nhóm để thu lợi nhuận tài chính. Nhưng điều này mang lại rủi ro. Số lượng token trong nhóm và số lượng nhà cung cấp thanh khoản đóng góp vào đó là các yếu tố chính về khả năng xảy ra Tổn thất tạm thời và việc xem xét như vậy là quan trọng đối với các nhà cung cấp thanh khoản tiềm năng. Tổn thất tạm thời thường khiến các pool thanh khoản rơi vào trình trạng cạn kiệt và các nhà cung cấp thanh khoản phải tìm kiếm ở nơi khác.

Đây là điều tối kỵ về sự Tổn thất tạm thời: rất khó đoán liệu nó có xảy ra hay không, và khi xảy ra thì ở mức độ nào.

## **Tổn thất tạm thời trong Chuỗi dựa trên UTXO (UTXO-based chain) so với Chuỗi dựa trên Tài khoản (Account-based chain)**

Giới thiệu nhanh:

- Chuỗi dựa trên UTXO: không có tài khoản nào lưu giữ số dư. Thay vào đó, ví của người dùng theo dõi danh sách các kết quả đầu ra chưa sử dụng được liên kết với tất cả các địa chỉ do người dùng sở hữu và tính toán số dư của họ. UTXO, theo nhiều cách, tương tự như giao dịch tiền mặt. Mô hình EUTxO của Cardano bổ sung một mức dữ liệu, là dữ liệu theo hợp đồng cụ thể. Điều này rất quan trọng vì nó mang lại cho Cardano khả năng hỗ trợ đa tài sản và hợp đồng thông minh.
- Mô hình Dựa trên tài khoản - Mô hình kế toán này sử dụng tài khoản (có thể được kiểm soát bằng khóa cá nhân hoặc hợp đồng thông minh) để lưu giữ số dư. Trong mô hình này, tài sản được biểu thị dưới dạng số dư trong tài khoản của người dùng và số dư được lưu trữ dưới dạng trạng thái toàn cầu của tài khoản. Trạng thái được giữ bởi mỗi node và được cập nhật trong mọi giao dịch.

Có một số khác biệt cơ bản giữa hai mô hình này, nhưng khi nói đến mô hình AMM và Tổn thất tạm thời, có một điểm khác biệt tiêu biểu. AMM hoạt động trên Chuỗi dựa trên tài khoản có xu hướng sử dụng công thức định giá không đổi của Nhà tạo lập thị trường (CFMM), đây là một trong những thuật toán được sử dụng phổ biến cho mô hình AMM. Công thức này tồn tại sự kém hiệu quả. Ví dụ: Tổng giá trị tài sản bị khoá (TVL) - được xác định là tổng của tất cả các tài sản tiền mã hóa đặt cọc kiếm được phần thưởng, tiền lãi, v.v. - được phân bổ trên toàn bộ phạm vi giá, điều này ngụ ý rằng giá của một tài sản có khả năng bằng nhau là 1$ hoặc 10.000$. Theo giả định này, giá CFMM là không thực tế và có xu hướng không phản ánh điều kiện thị trường thực tế. Ngoài ra, các giao dịch với khối lượng token thấp có xu hướng dẫn đến trượt giá cao (chênh lệch giữa giá yêu cầu và giá khi lệnh được thực hiện). Mặc dù CFMM là một lựa chọn phổ biến cho mô hình AMM, nhưng sự thiếu hiệu quả này có thể dẫn đến doanh thu cho các nhà cung cấp thanh khoản bị giảm sút. Quan trọng hơn, tính thanh khoản này có thể chịu Tổn thất tạm thời.

## **EUTxO và Sổ lệnh thiết kế sàn DEX như một bức tường chống lại sự Tổn thất tạm thời**

Các lợi thế vốn có của EUTxO về tính bảo mật, tính [xác định](https://www.essentialcardano.io/glossary/determinism) , tính [song song](https://www.essentialcardano.io/article/concurrency-and-all-that-cardano-smart-contracts-and-the-eutxo-model) và khả năng mở rộng mang lại một môi trường lý tưởng cho các sàn DEX sử dụng thiết kế Sổ lệnh, vì nó thể hiện khả năng phục hồi mạnh mẽ hơn đối với Tổn thất tạm thời. Một ưu điểm chính của thiết kế này là tính thanh khoản tập trung (thanh khoản được phân bổ trong phạm vi giá tùy chỉnh). Tính năng này tối đa hóa hiệu quả của tính thanh khoản và giảm thiểu Tổn thất tạm thời.

## **Tại sao trạng thái toàn cục không phải là vấn đề trong Chuỗi dựa trên EUTxO**

Không giống như các blockchain dựa trên tài khoản, trong đó mọi kết quả giao dịch đơn lẻ đều thay đổi trạng thái toàn cục, trong các blockchain dựa trên UTXO, tính hợp lệ của giao dịch được đánh giá ở cấp độ giao dịch và số dư là tổng của các UTXO còn lại. Nói cách khác, nó ở trạng thái cục bộ.

Điều này ngay lập tức đặt ra vấn đề cho các Chuỗi dựa trên Tài khoản. Vô số hợp đồng thông minh và các tác nhân khác liên tục tương tác và ảnh hưởng đến trạng thái toàn cục, có nghĩa là tài sản và tài nguyên bị sử dụng, đồng thời phí gas lên xuống liên tục. Một tác dụng phụ của điều này là phí giao dịch có thể dao động. Về mặt hiệu quả, điều này có nghĩa là phí gas của giao dịch có thể tăng đáng kể trong khoảng thời gian giữa giao dịch được gửi và xác thực. Do đó, một giao dịch như vậy có thể không được chuỗi chấp nhận, nhưng phí gas vẫn được tính, có khả năng dẫn đến tổn thất tài chính cho người dùng. Đây là một trong những lỗi thiết kế chính của Ethereum.

Mô hình EUTxO của Cardano không xảy ra lãng phí như vậy, vì các giao dịch được xử lý và xác thực ở trạng thái cục bộ. Điều này đạt được bằng cách thêm một dữ liệu (dữ liệu bổ sung) vào giao dịch. Dữ liệu chứa thông tin cụ thể theo hợp đồng, được chuyển đến logic xác thực của giao dịch, do đó duy trì sự xác định của EUTxO. Điều này có nghĩa là phí giao dịch được biết trước và sẽ không thay đổi. Một điểm khác đáng hoan nghênh của EUTxO là các tác nhân xấu không thể sắp xếp lại các giao dịch (một rủi ro khác của mô hình dựa trên Tài khoản).

Bản chất cục bộ của xác thực giao dịch cung cấp một lợi thế đáng kể khác: mức độ song song cao. Một node có thể xác thực các giao dịch song song, miễn là các giao dịch đó không dùng chung một đầu vào (input). Điều này không thể được thực hiện trong Chuỗi dựa trên Tài khoản, vì các giao dịch phải được xử lý tuần tự theo thiết kế.

### **Các cải tiến trong tương lai**

Nền tảng Plutus cung cấp ngôn ngữ hợp đồng thông minh gốc cho chuỗi khối Cardano. Các Đề xuất Cải tiến Cardano (CIP) sắp tới cho Plutus bao gồm:

[CIP-31](https://cips.cardano.org/cips/cip31/) : Đầu vào tham chiếu; [CIP-32](https://cips.cardano.org/cips/cip32/) : Dữ liệu nội tuyến; [CIP-33](https://cips.cardano.org/cips/cip33/) : Tập lệnh tham chiếu; CIP-40: Đầu ra tài sản thế chấp

**Một số điểm quan trọng** :

- Tổn thất tạm thời là sự chênh lệch giữa giá trị của hai tài sản tiền mã hóa trong mô hình AMM dựa trên pool thanh khoản.
- Tổn thất tạm thời được tính bằng cách so sánh giá trị của các token khi rút tiền với giá trị của chúng khi được lưu giữ.
- Stablecoin có sự ổn định về giá, vì vậy các nhóm thanh khoản sử dụng stablecoin có thể ít bị Tổn thất tạm thời.
- Chuỗi dựa trên UTXO sử dụng thiết kế sàn DEX trong mô hình Sổ lệnh có khả năng ít bị Tổn thất tạm thời hơn mô hình AMM sử dụng thiết kế sàn DEX trên Chuỗi dựa trên Tài khoản.
- Không thể xảy ra lãng phí tiền trong mô hình EUTxO, vì các giao dịch được xử lý và xác thực ở trạng thái cục bộ. Bài này được dịch bởi Max Long [với bài gốc tại đây](https://iohk.io/en/blog/posts/2022/05/27/everything-you-always-wanted-to-know-about-impermanent-loss-and-were-afraid-to-ask/) *Dự án này được tài trợ bới Catalyst*
