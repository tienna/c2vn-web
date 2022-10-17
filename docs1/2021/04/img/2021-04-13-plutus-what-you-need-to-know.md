# Những điều bạn cần biết về Plutus

### **Các nhà phát triển hiện đang chuẩn bị cho sự xuất hiện của hợp đồng thông minh Cardano, được kích hoạt bởi Plutus và nâng cấp giao thức Alonzo**

![](img/2021-04-13-plutus-what-you-need-to-know.002.png)13 tháng 4 năm 2021![](img/2021-04-13-plutus-what-you-need-to-know.002.png) [Lars Brünjes](tmp//en/blog/authors/lars-brunjes/page-1/)![](img/2021-04-13-plutus-what-you-need-to-know.003.png) 9 phút đọc

![Lars Brünjes](img/2021-04-13-plutus-what-you-need-to-know.004.png)[](tmp//en/blog/authors/lars-brunjes/page-1/)

### [**Lars Brünjes**](tmp//en/blog/authors/lars-brunjes/page-1/)

Giám đốc đào tạo

Đào tạo

- ![](img/2021-04-13-plutus-what-you-need-to-know.005.png)[](mailto:lars.bruenjes@iohk.io "Email")
- ![](img/2021-04-13-plutus-what-you-need-to-know.006.png)[](https://www.linkedin.com/in/dr-lars-br%C3%BCnjes-1640993b "LinkedIn")
- ![](img/2021-04-13-plutus-what-you-need-to-know.007.png)[](https://twitter.com/LarsBrunjes "Twitter")
- ![](img/2021-04-13-plutus-what-you-need-to-know.008.png)[](https://github.com/brunjlar "GitHub")

![Những điều bạn cần biết về Plutus](img/2021-04-13-plutus-what-you-need-to-know.009.jpeg)

Trong bài đăng trên Blog trước, chúng tôi đã thảo luận về [*Alonzo*](https://iohk.io/en/blog/posts/2021/04/08/smart-contracts-%E2%80%93-here-we-come/) - cái tên được đặt cho bản nâng cấp giao thức sẽ hỗ trợ hợp đồng thông minh trên Cardano. Alonzo sẽ thiết lập cơ sở hạ tầng và thêm các công cụ để phát triển chức năng của hợp đồng thông minh bằng cách sử dụng Plutus.

Nền tảng Plutus cung cấp ngôn ngữ hợp đồng thông minh gốc cho Cardano Blockchain. Để hiểu và thành thạo Plutus, chúng ta phải hiểu ba khái niệm:

- *Mô hình UTXO mở rộng (EUTXO)*
- *Plutus Core* - phần 'trên chuỗi' của Plutus.
- *Khung ứng dụng Plutus (PAF - Plutus Application Framework )* - một phần 'ngoài chuỗi' của Plutus cho phép tương tác với hợp đồng thông minh.

Hợp đồng Plutus bao gồm các phần chạy trên Blockchain (mã Code trên chuỗi) và các phần chạy trên máy của người dùng (mã Code ngoài chuỗi hoặc của ứng dụng người dùng). Cả mã Code trên chuỗi và ngoài chuỗi đều được viết bằng Haskell. Hợp đồng thông minh Plutus là các chương trình Haskell hiệu quả. Mã Code ngoài chuỗi có thể được viết bằng PAF. Sau đó mã Code này được biên dịch bởi Trình biên dịch Glasgow Haskell (GHC - Glasgow Haskell Compiler). Trong khi mã Code trên chuỗi (được viết bằng Plutus Core) được biên dịch bởi trình biên dịch Plutus.

Điều quan trọng là phải hiểu mối quan hệ giữa các khái niệm Plutus và chức năng của Token gốc và xem cách tương tác của chúng để trở thành một tính năng hữu ích và mạnh mẽ hơn.

## **Mô hình UTXO mở rộng**

Cardano (giống như Bitcoin) sử dụng mô hình kế toán đầu ra giao dịch chưa chi tiêu (UTXO). Trong mô hình UTXO, một *giao dịch* có *đầu vào* và *đầu ra*. Trong đó **đầu vào** là đầu ra chưa sử dụng từ các giao dịch trước đó. Ngay sau khi một đầu ra được sử dụng làm đầu vào trong một giao dịch, nó sẽ được *tiêu* và không bao giờ có thể được sử dụng lại. **Đầu ra** được chỉ định bởi một *địa chỉ* (khóa công khai hoặc Hash khóa công khai) và một *giá trị* (bao gồm số lượng ADA và số lượng Token gốc tuỳ chọn bổ sung). Địa chỉ của đầu ra xác định giao dịch nào được phép 'mở khóa' đầu ra và sử dụng nó làm đầu vào. Một giao dịch phải được *ký* bởi chủ sở hữu của khóa cá nhân tương ứng với địa chỉ. Hãy coi một địa chỉ như một 'ổ khóa' chỉ có thể được 'mở khóa' bằng đúng 'chìa khóa' - chữ ký chính xác.

Mô hình EUTXO *mở rộng* mô hình này theo hai hướng:

1. Nó khái quát khái niệm 'địa chỉ' bằng cách sử dụng phép tương tự khóa và chìa khóa. Thay vì giới hạn khóa đối với khóa công khai và khóa đối với chữ ký, các địa chỉ trong mô hình EUTXO có thể chứa Logic tùy ý dưới dạng *tập lệnh*. Ví dụ như khi một node xác thực một giao dịch, node đó sẽ xác định xem giao dịch đó có được phép sử dụng một đầu ra nhất định làm đầu vào hay không. Giao dịch sẽ tra cứu tập lệnh được cung cấp bởi địa chỉ của đầu ra và sẽ thực thi tập lệnh nếu giao dịch có thể sử dụng đầu ra làm đầu vào.
2. Sự khác biệt thứ hai giữa UTXO và EUTXO là đầu ra có thể mang (hầu như) dữ liệu tùy ý ngoài một địa chỉ và giá trị. Điều này làm cho các tập lệnh trở nên mạnh mẽ hơn nhiều bằng cách cho phép chúng mang *trạng thái*.

Khi xác thực một địa chỉ, tập lệnh sẽ truy cập dữ liệu đang được mang theo bởi đầu ra, giao dịch đang được xác thực và một số phần dữ liệu bổ sung được gọi là *Redeemer* mà giao dịch cung cấp cho mọi đầu vào. Bằng cách tra cứu tất cả thông tin này, tập lệnh có đủ ngữ cảnh (Context) để đưa ra câu trả lời 'có' hoặc 'không' trong những trường hợp có thể là những tình huống và trường hợp sử dụng rất phức tạp.

Tóm lại, EUTXO mở rộng mô hình UTXO bằng cách cho phép các địa chỉ đầu ra chứa Logic phức tạp để quyết định giao dịch nào có thể mở khóa chúng và bằng cách thêm dữ liệu *tùy chỉnh* vào *tất cả* đầu ra.

Mô hình EUTXO cung cấp những lợi thế độc đáo so với các mô hình kế toán khác. Việc xác thực giao dịch thành công hay thất bại chỉ phụ thuộc vào bản thân giao dịch và các đầu vào của nó, *chứ không* phụ thuộc vào bất kỳ thứ gì khác trên Blockchain. Do đó, tính hợp lệ của giao dịch có thể được kiểm tra *ngoài chuỗi*, trước khi giao dịch được gửi lên Blockchain. Một giao dịch vẫn có thể không thành công nếu một số giao dịch khác đồng thời sử dụng đầu vào mà giao dịch đang mong đợi, nhưng nếu tất cả các đầu vào vẫn còn, giao dịch được *đảm bảo* thành công.

Điều này trái ngược với mô hình dựa trên tài khoản (được Ethereum sử dụng), trong đó một giao dịch có thể không thành công khi thực hiện đến giữa tập lệnh. Điều này không bao giờ có thể xảy ra trong EUTXO. Ngoài ra, chi phí thực hiện giao dịch có thể được xác định ngoài chuỗi trước khi lan truyền - một tính năng khác mà Ethereum không thể có.

Cuối cùng, do tính chất 'cục bộ' của xác thực giao dịch, mức độ song song cao là có thể xảy ra: về nguyên tắc, một node có thể xác thực các giao dịch song song, nếu các giao dịch đó không cố gắng sử dụng cùng một đầu vào. Điều này rất tốt cho cả hiệu quả và lý luận, đơn giản hóa việc phân tích các kết quả có thể xảy ra và chứng minh rằng 'không có gì xấu' có thể xảy ra. Bạn có thể tìm hiểu sâu hơn về [mô hình EUTXO trong bài đăng trên Blog trước](https://iohk.io/en/blog/posts/2021/03/12/cardanos-extended-utxo-accounting-model-part-2/) .

## **Plutus Core**

Để triển khai mô hình EUTXO, cần phải xác định rõ ràng điều khoản *tập lệnh* và *dữ liệu*. Các tập lệnh yêu cầu một ngôn ngữ tập lệnh xác định và được chỉ định rõ ràng. Điều quan trọng là phải xác định loại dữ liệu được gắn vào các đầu ra và được sử dụng làm Redeemer.

Đây là nơi *xuất hiện của Plutus Core*. Plutus Core là ngôn ngữ tập lệnh được Cardano sử dụng. Nó là một ngôn ngữ lập trình hàm đơn giản tương tự như Haskell và một tập hợp con lớn của Haskell có thể được sử dụng để viết các tập lệnh Plutus Core. Là người tạo hợp đồng, bạn không viết bất kỳ Plutus Core nào. Tất cả các chương trình Plutus Core đều được tạo bởi một Plugin trình biên dịch Haskell.

Những tập lệnh này sẽ được thực thi bởi các node trong quá trình xác thực giao dịch 'trực tiếp' trên chuỗi. Họ sẽ khóa các UTXO dưới dạng *tập lệnh trình xác thực* hoặc dưới dạng *các chính sách đúc tiền*, kiểm soát việc đúc và đốt Token gốc (xem bên dưới).

Dữ liệu của Redeemer là một kiểu dữ liệu (đại số) đơn giản có thể được định nghĩa dễ dàng trong Haskell. Đó cũng là một lý do tại sao Haskell là một lựa chọn tốt để viết các tập lệnh Plutus Core. Trên thực tế, một nhà phát triển hợp đồng thông minh sẽ viết các tập lệnh trình xác thực trong Haskell. Sau đó chúng sẽ được tự động [biên dịch thành Plutus Core](https://iohk.io/en/blog/posts/2021/02/02/plutus-tx-compiling-haskell-into-plutus-core/).

Các thư viện Haskell thích hợp giúp đơn giản hóa việc viết Logic xác thực bằng cách cung cấp các kiểu dữ liệu cốt lõi để kiểm tra các giao dịch trong quá trình xác thực. Bằng cách cung cấp nhiều hàm trợ giúp và mức trừu tượng cao hơn, nó cho phép người tạo hợp đồng tập trung vào Logic nghiệp vụ và không phải lo lắng quá nhiều về các chi tiết ở cấp độ thấp.

## **Khung ứng dụng Plutus (PAF)**

Trạng thái trên chuỗi của các tập lệnh trình xác thực chỉ có thể được sửa đổi bằng các giao dịch chi tiêu và tạo ra đầu ra tập lệnh. Khi viết một ứng dụng Plutus, chúng ta cần xem xét không chỉ phần trên chuỗi của ứng dụng (các tập lệnh Plutus Core) mà còn cả phần ngoài chuỗi để xây dựng và gửi các giao dịch.

Mã Code ngoài chuỗi được viết bằng Haskell giống như mã Code trên chuỗi. Bằng cách đó, chúng ta chỉ cần viết Logic nghiệp vụ một lần. Sau đó, chúng ta có thể sử dụng nó trong tập lệnh trình xác thực và trong mã Code để xây dựng các giao dịch chạy tập lệnh trình xác thực.

Nhiều ứng dụng cần theo dõi bộ UTXO để thay đổi các địa chỉ cụ thể. Vì vậy, nếu viết hợp đồng dưới dạng máy trạng thái (State Machine), chúng ta cần theo dõi đầu ra chưa sử dụng đại diện cho trạng thái hiện tại của máy và cập nhật trạng thái cục bộ khi thay đổi trạng thái trên chuỗi. Tương tự như vậy, nhiều ứng dụng cần giao tiếp với phần phụ trợ ví để truy cập vào tiền mã hoá mà chúng đang sử dụng cho các giao dịch.

PAF cung cấp khả năng truy cập dễ dàng vào các dịch vụ thường được các ứng dụng Plutus sử dụng. Các ứng dụng được triển khai bằng cách sử dụng thư viện của khuôn khổ có thể được chạy trên phần phụ trợ ứng dụng Plutus. Nó cung cấp hỗ trợ thời gian chạy để truy cập vào Blockchain và các mối quan tâm khác như tính bền bỉ, ghi nhật ký và giám sát. Các ứng dụng được viết trên PAF tự động cung cấp giao diện HTTP và WebSocket có thể được sử dụng để tương tác với ứng dụng từ trình duyệt Web.

## **Token gốc**

Các *Token gốc* đã có sẵn trên Cardano với Hardfork *Mary* vào tháng hai. Bất kỳ người dùng nào cũng có thể tạo Token của riêng họ. Token có thể được gửi và nhận một cách tự do giống như ADA. Mỗi Token gốc đi kèm với [*chính sách đúc tiền*](https://docs.cardano.org/en/latest/native-tokens/learn-about-native-tokens.html#minting-policy) riêng, xác định các điều kiện mà Token có thể được đúc và đốt.

Hiện tại, chính sách đúc tiền bao gồm sự kết hợp của các quy tắc đơn giản xác định *chữ ký* và *thời gian*. Ví dụ: một chính sách có thể nêu rõ rằng chỉ các giao dịch được ký bởi hai trong số năm chữ ký mới có thể được phép đúc hoặc đốt Token. Một chính sách khác có thể chỉ cho phép đúc tiền trước hoặc sau một khoảng thời gian cụ thể.

Mạnh mẽ như những Block được xây dựng cơ bản, chúng không bao gồm mọi mục đích sử dụng có thể tưởng tượng được. Ví dụ, mặc dù khó khăn, nhưng nó có thể mô hình hóa các Token không thể thay thế (NFT) bằng cách sử dụng các chính sách đơn giản. Điều này có thể được thực hiện bằng cách sử dụng một mốc thời gian để đúc một NFT, bằng cách giới hạn hoạt động đúc trong một thời điểm cụ thể. Nếu chỉ có một Token được đúc trước khi đạt đến thời điểm đó, thì về mặt kỹ thuật, Token là không thể thay thế được (vì chỉ có một). Nhưng để kiểm tra điều này, chỉ cần kiểm tra chính sách đúc tiền thôi là chưa đủ. Chúng ta cần phải xem xét lịch sử đúc của Token để đảm bảo rằng nó thực sự chỉ được đúc một lần.

Với việc triển khai Plutus, người dùng sẽ có thể viết các chính sách đúc tiền bằng cách sử dụng Plutus Core. Trong quá trình đúc hoặc đốt, tập lệnh chính sách của Plutus Core sẽ được thực thi trong ngữ cảnh (Context) của giao dịch đúc hoặc đốt. Tập lệnh sẽ phải chấp thuận hoặc ngăn cấm hành động này. Điều này sẽ đẩy nhanh hơn nữa sự phát triển của NFT trên Cardano bằng cách cho phép tạo ra các chính sách đúc tiền phức tạp hơn nhiều và cho phép tạo NFT mà không phải nghi ngờ gì về độ tin cậy.

Alonzo đang dần được triển khai trên Mainnet thông qua một số Testnet. Vì vậy, các đối tác của chúng tôi và [những người tiên phong của Plutus](https://iohk.io/en/blog/posts/2021/04/01/everything-you-need-to-know-about-our-new-plutus-pioneer-program/) sẽ có thể thử nghiệm Plutus Core bằng cách viết ứng dụng trên Cardano trong suốt tháng 5 và tháng 6 trước khi đóng băng mã Code. Đây cũng sẽ là giai đoạn đảm bảo chất lượng và kiểm tra sự chấp nhận của người dùng bởi các sàn giao dịch để đảm bảo rằng nền tảng đã hoàn toàn sẵn sàng vào thời điểm nâng cấp Mainnet Alonzo. Nếu bạn là nhà phát triển và muốn tìm hiểu thêm về Plutus, hãy cân nhắc tham gia [nhóm  tiên phong trong tương lai](https://developers.cardano.org/en/plutus-pioneer-program/). Ngoài ra, hãy xem kho lưu trữ [Plutus GitHub](https://github.com/input-output-hk/plutus) và tham gia vào các cuộc thảo luận về Plutus tại [Diễn đàn Cardano](https://forum.cardano.org/c/developers/cardano-plutus/148).

*Tôi muốn ghi nhận Jann Müller về những ý kiến đóng góp và bổ sung cho bài đăng trên Blog này. Bài này được dịch bởi Nguyễn Văn Tú, soát xét bởi Brit Nguyễn. Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/04/13/plutus-what-you-need-to-know). *Dự án này được tài trợ bởi Catalyst*.*
