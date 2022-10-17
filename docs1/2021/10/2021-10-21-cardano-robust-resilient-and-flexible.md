# Cardano: Mạnh mẽ, Bền bỉ và Linh hoạt

### **Với cách tiếp cận dựa trên tham số và mô-đun hóa,  Cardano đã được thiết kế từ đầu với khả năng mở rộng thực sự ấn tượng.**

![](img/2021-10-21-cardano-robust-resilient-and-flexible.002.png)21 tháng 10 năm 2021![](img/2021-10-21-cardano-robust-resilient-and-flexible.002.png)[Kevin Hammond](tmp//en/blog/authors/kevin-hammond/page-1/)![](img/2021-10-21-cardano-robust-resilient-and-flexible.003.png)10 phút đọc

![Kevin Hammond](img/2021-10-21-cardano-robust-resilient-and-flexible.004.png)[](tmp//en/blog/authors/kevin-hammond/page-1/)

### [**Kevin Hammond**](tmp//en/blog/authors/kevin-hammond/page-1/)

Nhà phát triển

Engineering

- ![](img/2021-10-21-cardano-robust-resilient-and-flexible.005.png)[](https://twitter.com/inputoutputhk "Twitter")

![Cardano: Mạnh mẽ, Bền bỉ và Linh hoạt](img/2021-10-21-cardano-robust-resilient-and-flexible.006.jpeg)

Cardano được thiết kế để phục vụ hàng triệu người dùng phân tán trên toàn cầu. Như với bất kỳ blockchain phi tập trung nào khác, điều này có nghĩa chúng ta cần khai thác các *block* mới một cách nhất quán và có thể dự đoán được nhằm phát triển chuỗi và ghi lại *các giao dịch* giữa người dùng một cách minh bạch. Để đảm bảo các block mới được phát tán trên mạng một cách hiệu quả và an toàn, điều quan trọng là hệ thống sử dụng tài nguyên mạng, bộ nhớ, lưu trữ và tính toán một cách hiệu quả.

Điểm mấu chốt là tính linh hoạt, vì vậy một đặc tính quan trọng của giao thức Cardano là nó đã được thiết kế từ đầu với khả năng mở rộng ấn tượng. Điều này không chỉ cho thấy khả năng sẵn sàng về mặt hạ tầng dài hạn hơn, phục vụ cho một hệ điều hành trên phạm vi toàn cầu và  phi tập trung hoàn toàn; mà cách tiếp cận tham số hóa của Cardano cũng được thiết kế để mạng lưới linh hoạt và điều chỉnh theo,  chẳng hạn như theo biến động giá cả, theo mạng lưới đã bão hòa hay chưa, hoặc theo lượng truy vấn tăng đột biến... Một số tham số của giao thức cho phép điều chỉnh thông số hệ thống mà không cần *hard fork* . Thậm chí ngay cả khi bắt buộc phải hard fork, những nâng cấp quan trọng cũng được quản lý khéo léo bởi Công nghệ tổ hợp hard fork (hard fork combinator technology - HFC). Hiện nay đó đều là những điểm khác biệt đáng kể của Cardano mang đến sự mạnh mẽ và đáng tin cậy, và cả cách thức nâng cấp nhanh chóng khi mạng lưới và lưu lượng ngày càng phát triển.

Lộ trình của Cardano cũng được vạch ra theo từng giai đoạn gọi là kỷ nguyên để tiến gần đến đích cuối cùng. Kỷ nguyên Byron tập trung vào khả năng giao dịch cơ bản trong mạng lưới. Điều này sẵn sàng cho việc bắt đầu xây dựng cộng đồng và quan hệ đối tác ở giai đoạn tiếp theo. Việc khởi động lại Byron đã tạo nên nền tảng vững chắc phục vụ nhiều tính năng hơn, trong khi kỷ nguyên Shelley cho ra mắt cơ chế vận hành pool, mở rộng cộng đồng và khai thác block 100% là phi tập trung.

Năm nay, chúng ta đã ra mắt một số tính năng mới rất đáng mong đợi. Kể từ đầu năm 2021, với bản Hard Fork có tên Mary, Cardano đã hỗ trợ việc khởi tạo đa tài sản và NFT trên sổ cái. Với mức phí thấp và không cần hợp đồng thông minh, chúng ta đã chứng kiến sự hoạt động bùng nổ trong lĩnh vực thú vị này. Bản nâng cấp Alonzo vào tháng 9 đã hỗ trợ hợp đồng thông minh cho ngôn ngữ Plutus, mở đường cho việc xây dựng một loạt các ứng dụng phi tập trung (dApp). Các hợp đồng thông minh tuy mới xuất hiện, nhưng với hàng chục [dự án dApp](https://github.com/input-output-hk/essential-cardano/blob/main/essential-cardano-list.md) và một số khác sắp bước vào giai đoạn triển khai, mọi thứ sẽ sớm bắt đầu tăng tốc. Những khả năng mới này ảnh hưởng đến cách sổ cái xử lý các tập lệnh và giao dịch mới, đồng thời yêu cầu thêm tài nguyên mới. Khi lượng xử lý giao dịch tăng lên, kiến trúc Cardano vẫn cho phép chúng ta linh hoạt và thích ứng theo yêu cầu.

## **Dung lượng mạng**

Hạ tầng mạng đóng vai trò trung tâm trong tất cả các hoạt động của Cardano. Mạng lưới Cardano phân phối các giao dịch và block qua hệ thống *các node* phân tán nằm rải rác khắp các châu lục để khai thác và xác minh blockchain. Đây được gọi là *sự phát tán dữ liệu* và điều quan trọng là phải cung cấp đủ thông tin cần thiết để các node thực hiện thuật toán đồng thuận đưa ra quyết định. Những quyết định này giúp chuỗi liên tục phát triển, khi sự đồng thuận giữa các node đảm bảo tất cả các giao dịch được xác minh và đưa vào một block mới một cách minh bạch.

Cardano đang sử dụng [giao thức đồng thuận Ouroboros Praos](https://iohk.io/en/research/library/papers/ouroboros-praosan-adaptively-securesemi-synchronous-proof-of-stake-protocol/) phi tập trung. Cardano đã chuyển dần sang Praos từ giao thức Ouroboros Classic trước đó thông qua một loạt các thay đổi đối với [tham số phi tập trung, được gọi là tham số *d*](https://iohk.io/en/blog/posts/2021/03/04/not-long-till-d-0-day/) . Ouroboros Praos thiết lập và đảm bảo cho các vấn đề bảo mật nâng cao được công bố qua các bài báo nghiên cứu theo phương pháp peer-review, giao thức đã được trình bày trong các hội thảo và tạp chí hàng đầu về mật mã học và an ninh mạng.

Hiệu suất mạng ảnh hưởng đến tốc độ hoạt động của toàn bộ hệ thống, bao gồm các yêu cầu về:

- *Thông lượng* (khối lượng dữ liệu được truyền)
- *Timeliness* (thời gian chấp nhận block)

Hai yêu cầu này thường đối nghịch nhau. Chúng ta có thể tối đa thông lượng khi các block tạo ra được sử dụng hiệu quả nhất. Ngược lại, điều này đòi hỏi có đủ bộ đệm để *ẩn độ trễ*, làm giảm đi những hạn chế của một hệ thống phân tán toàn cầu.

Nhiều bộ đệm hơn thường có nghĩa là sử dụng block (và mạng) tốt hơn, nhưng phải trả giá bằng việc tăng độ trễ (thời gian áp dụng trong chuỗi) khi hệ thống đã đạt bão hòa.

**Giới hạn block**

Để hiểu các giao dịch và tập lệnh có thể được thực hiện nhanh như thế nào trên Cardano, trước tiên chúng ta tìm hiểu khái niệm về *giới hạn block* . Kích thước tổng thể của một block hiện được giới hạn ở mức tối đa 64 KB, thể hiện sự cân bằng giữa việc đảm bảo sử dụng mạng hiệu quả và giảm thiểu độ trễ giao dịch. Một block duy nhất có thể chứa hỗn hợp các giao dịch, bao gồm các giao dịch có tập lệnh Plutus (hợp đồng thông minh), token gốc, siêu dữ liệu và giao dịch ADA đơn thuần ( giao dịch thanh toán). Tương tự, một giao dịch đơn lẻ hiện được giới hạn ở mức tối đa là 16KB. Điều này đảm bảo rằng một block duy nhất sẽ luôn chứa nhiều giao dịch (ít nhất là 4, nhưng nói chung là nhiều hơn), do đó, cải thiện thông lượng tổng thể.

*Giới hạn block time* là một thuộc tính khác, là khoảng thời gian cố định sẵn sàng để xử lý tất cả các giao dịch trong một block duy nhất. Điều này được chia thành thời gian có thể được sử dụng để thực thi tập lệnh Plutus và thời gian sẵn sàng để thực hiện các giao dịch khác. Thuộc tính này đảm bảo rằng các giao dịch với tập lệnh Plutus không thể độc chiếm thời hạn có sẵn và hệ thống sẽ luôn có thể xử lý các giao dịch thanh toán đơn giản trong cùng một block chứa tập lệnh Plutus. Tổng thời hạn để khai thác mỗi block (tính cả chi phí dành cho mạng) được đặt thành 1 giây, với thời hạn khoảng 50 mili giây sẵn sàng để thực thi tập lệnh Plutus. Trên thực tế, đây là một khoản phân bổ lớn - thử nghiệm đã chỉ ra rằng nhiều tập lệnh thực tế chỉ thực thi trong 1 mili giây hoặc ít hơn trên hệ thống đánh giá.

Giới hạn block time hiện được đặt là 1 giây. Vì lý do bảo mật, giao thức đồng thuận Praos chỉ chọn một phần nhỏ (1/20) trong số các block có khả năng được thêm vào chuỗi. Đối với các tham số giao thức hiện tại, thông lượng giao dịch tối đa (đối với các giao dịch đơn giản) là khoảng 11 giao dịch mỗi giây (TPS). Rõ ràng, các giao dịch khác nhau sẽ khác nhau về quy mô và có số dữ liệu truyền tải khác nhau. Ví dụ như một giao dịch duy nhất có thể kết thúc toàn bộ vòng bỏ phiếu của Catalyst, hay như một giao dịch chuyển hàng triệu đô la.

Như đã thảo luận ở trên, mỗi block chứa một số giao dịch được gửi bởi người dùng cuối từ ví hoặc từ giao diện dòng lệnh (CLI), v.v. Các giao dịch này được lưu giữ trong bộ nhớ tạm thời( *mempool* ) cho đến khi chúng sẵn sàng được xử lý và đưa vào một block. Các giao dịch đang chờ xử lý sẽ bị xóa khỏi mempool khi một block được khai thác và các giao dịch tiếp theo được thêm mới vào mempool. Bằng cách sử dụng mempool có kích thước cố định, các node tránh được tình trạng bị quá tải trong giai đoạn cao điểm, nhưng điều này có nghĩa là ví hoặc ứng dụng có thể cần phải gửi lại các giao dịch. Kích thước mempool hiện được đặt thành 128 KB: gấp đôi kích thước block hiện tại. Kích thước này được đặt dựa trên các mô hình xếp hàng.

## **Sự co giãn mạng lưới theo nhu cầu**

Ouroboros được thiết kế để xử lý một khối lượng lớn dữ liệu cũng như các giao dịch và tập lệnh có độ phức tạp và kích thước khác nhau. Với các thông số hiện tại, mạng Cardano chỉ đang sử dụng trung bình khoảng 25% công suất. Tất nhiên, kịch bản hiệu quả nhất là Cardano chạy bằng hoặc gần 100% công suất (mạng đã bão hòa). Trong khi nhiều bockchain khác sẽ bị ảnh hưởng trong những điều kiện như vậy, thì cả Ouroboros và mạng Cardano đã được thiết kế để luôn giữ cân bằng và có khả năng phục hồi cao ngay cả trong điều kiện bão hòa toàn phần. Thử nghiệm cho thấy dưới độ bão hòa 200%, hiệu suất tổng thể vẫn có khả năng phục hồi và không có lỗi mạng. Ngay cả khi thử nghiệm liên tục cường độ cao dưới 44 lần, năng lực sẵn sàng của toàn mạng cũng không phát sinh lỗi (mặc dù một số giao dịch có thể bị chậm trễ một chút). Mạng được thiết kế sử dụng *áp suất ngược* để quản lý tải tổng thể của hệ thống. Vì vậy, ví dụ khi một số người dùng tham gia vào một sự kiện airdrop NFT quy mô lớn, họ có thể phải chờ đợi lâu hơn mới nhận được phần thưởng NFT, hoặc có thể cần phải gửi lại giao dịch từ một đợt airdrop lớn (hoặc tổ chức các sự kiện airdrop trong một khoảng thời gian dài hơn), điều này xảy ra không có nghĩa là mạng đang 'gặp vấn đề'. Điều đó thực sự có nghĩa là mạng đang hoạt động như kế hoạch. Nó được các kỹ sư Cardano gọi là một 'sự thoái biến tiến hành' và bạn có thể [đọc thêm về nó trong các tài liệu thiết kế mạng](https://hydra.iohk.io/build/7249613/download/1/network-design.pdf) .

**Ví**

Ví đại diện người dùng để gửi các khoản thanh toán và các giao dịch khác tới blockchain và theo dõi trạng thái của blockchain. Một trong những dịch vụ chính mà ví cung cấp là đại diện người dùng gửi các giao dịch, xác nhận rằng giao dịch đã được chấp nhận trên blockchain và gửi lại nếu không thành công. Có nghĩa là, ví phải tính đến các tác động của áp suất ngược trong mạng khi mạng lưới đạt trạng thái bão hòa, cũng như các hiệu ứng mạng khác (như ngắt kết nối tạm thời, có thể có chuỗi phân nhánh, v.v.). Ví có thể là:

- *Ví full-node* (như Daedalus), sử dụng máy tính cục bộ và tài nguyên mạng để chạy một nút kết node trực tiếp với mạng Cardano.
- *Ví nhẹ: ngược lại, những ví* này sử dụng máy tính và tài nguyên mạng được chia sẻ để phục vụ một số người dùng cuối.

Trong giai đoạn cao tải (ví dụ: bán NFT), cả hai loại ví có thể cần phải gửi lại các giao dịch. Vì chia sẻ tài nguyên giữa nhiều người dùng, ví nhẹ có thể cần tạm thời mở rộng quy mô tài nguyên mạng và máy tính có sẵn (bao gồm cả việc nhân rộng các endpoint) để đảm bảo rằng nhu cầu của người dùng có thể được đáp ứng. Ví dụ nhu cầu tăng mạnh khi một công ty phát hành một sản phẩm mới phổ biến. Ngược lại, các ví full-node về cơ bản có thể không bị ảnh hưởng. Các giao dịch có thể hơi chậm trễ, nhưng mỗi ví sẽ có các tài nguyên chuyên dụng cần thiết để gửi lại, bao gồm các kết nối mạng của chính nó. Các nguyên tắc tương tự áp dụng cho các nhà cung cấp dApp - nơi cung cấp các điểm cuối mạng cụ thể, tài nguyên hệ thống phải được mở rộng để đáp ứng nhu cầu.

## **Tối ưu hóa quy trình**

Chúng tôi hoan nghênh sự đổi mới (và đối thoại) đang thấy trong cộng đồng NFT. Để cải thiện trải nghiệm người dùng, cần phải tối ưu hóa các quy trình phát triển để ví dụ như quá trình tạo NFT hoạt động tốt ngay cả khi hệ thống đạt trạng thái bão hòa. Hay ví dụ như, nhiều người có thể đúc vật phẩm NFT hàng loạt với hiệu quả cao hơn.

Chúng tôi khuyến khích người dùng sáng tạo tiếp tục xem xét cách tối ưu hóa nỗ lực của mình để giảm thiểu tắc nghẽn mạng. Chúng tôi cũng khuyến khích tất cả tham gia các cuộc thảo luận trên Discord như một phần của Cộng đồng Người sáng tạo và Cardano cũng đang đề nghị các kỹ sư của mình tìm ra giải pháp phù hợp nhất cho mỗi trường hợp cụ thể.

Cũng như tính linh hoạt có được nhờ các điều chỉnh tham số - có thể được thực hiện trong một khoảng thời gian nếu được yêu cầu - trong trung hạn và dài hạn, các tùy chọn khác sẽ dần có hiệu quả. [Hydra](https://iohk.io/en/blog/posts/2021/09/17/hydra-cardano-s-solution-for-ultimate-scalability/) cho phép nhiều hoạt động được chạy song song, giúp nâng cao khả năng mở rộng. Các [giải pháp state-channel](https://www.youtube.com/watch?v=lvMtaixmPwo) của Hydra làm tăng thông lượng của hệ thống, đồng thời giảm nhu cầu thực thi trên chuỗi. Tuy nhiên, trong khi Hydra hỗ trợ nhiều trường hợp với khả năng mở rộng, nó không giải quyết hiệu quả  vấn đề đúc NFT. Khi Cardano tiếp tục trưởng thành và phát triển, chúng ta sẽ tiếp tục xem xét cách tối ưu hóa và quản lý năng lực mạng lưới. Như tôi đã nói gần đây trong [bản cập nhật giữa tháng 10](https://youtu.be/XzdTyV5Jejc?t=736), khi mạng bắt đầu chạy ở công suất cao hơn, chúng ta sẽ có thể điều chỉnh các thông số Cardano đó nếu cần. Ví dụ: giảm giới hạn blocktime, tối ưu hóa kích thước và thời gian thực thi của các tập lệnh Plutus hoặc giảm chi phí thực hiện và cải thiện thông lượng.

Tham gia [cộng đồng Discord](https://discord.gg/inputoutput) của chúng tôi ngay hôm nay để tìm hiểu thêm và thảo luận mọi thứ về Cardano với cộng đồng tận tâm của chúng tôi.

*Cảm ơn Neil Davies và Olga Hryniuk đã đóng góp và hỗ trợ cho bài viết này. Bài này được dịch bởi vudinhquanhn, Review bởi Quang Pham. <a>với bài gốc</a>(https://iohk.io/en/blog/posts/2021/10/21/cardano-robust-resilient-and-flexible/)<br>Dự án này được tài trợ bởi Catalyst*
