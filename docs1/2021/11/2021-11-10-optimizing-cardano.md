# Tối ưu hóa Cardano

### **Con đường tối ưu hóa mạng lưới nằm trong việc điều chỉnh từng bước một**

![](img/2021-11-10-optimizing-cardano.002.png)10 tháng 11 năm 2021![](img/2021-11-10-optimizing-cardano.002.png) [Tim Harrison](tmp//en/blog/authors/tim-harrison/page-1/)![](img/2021-11-10-optimizing-cardano.003.png) 10 phút đọc

![Tim Harrison](img/2021-11-10-optimizing-cardano.004.png)[](tmp//en/blog/authors/tim-harrison/page-1/)

### [**Tim Harrison**](tmp//en/blog/authors/tim-harrison/page-1/)

Phó Chủ tịch Cộng đồng &amp; Hệ sinh thái

Communications

- ![](img/2021-11-10-optimizing-cardano.005.png)[](mailto:tim.harrison@iohk.io "Email")
- ![](img/2021-11-10-optimizing-cardano.006.png)[](https://uk.linkedin.com/in/timbharrison "LinkedIn")
- ![](img/2021-11-10-optimizing-cardano.007.png)[](https://twitter.com/timbharrison "Twitter")
- ![](img/2021-11-10-optimizing-cardano.008.png)[](https://github.com/timbharrison "GitHub")

![Tối ưu hóa Cardano](img/2021-11-10-optimizing-cardano.009.jpeg)

Là một Blockchain bằng chứng cổ phần (PoS), Cardano được xây dựng để có tính bảo mật cao và chống lại các sự cố mạng lưới. Được thúc đẩy bởi thuật toán đồng thuận Ouroboros, tích hợp sẵn Haskell sử dụng các phương pháp chính thức và nghiên cứu học thuật được đánh giá Peer-Reviewed, Cardano được thiết kế để cung cấp một môi trường vững chắc để xử lý hàng triệu giao dịch trên toàn cầu, theo cách phi tập trung và có khả năng mở rộng cao.

Trong [bài đăng trên Blog trước đây](https://iohk.io/en/blog/posts/2021/10/21/cardano-robust-resilient-and-flexible/), chúng tôi đã thảo luận về hiệu suất mạng lưới - cách hệ thống hoạt động tổng thể khi xử lý, xác minh và ký kết các giao dịch. Nắm bắt được điều này ngay từ giai đoạn thiết kế đầu tiên là rất quan trọng nếu bạn muốn có một hệ thống được xây dựng lâu dài. Tuy nhiên, dung lượng mạng là một nguồn tài nguyên có giá trị, vì vậy để có các chỉ số hiệu suất hiệu quả nhất, điều cần thiết là các tài nguyên tính toán, bộ nhớ, lưu trữ và mạng lưới phải được sử dụng một cách hiệu quả.

Cardano được xây dựng để trở nên linh hoạt. Nó được thiết kế để tối đa hóa thông lượng đồng thời cho phép đáp ứng nhu cầu ngày càng tăng. Khi mạng lưới phát triển, chúng tôi đang điều chỉnh các tham số giao thức để điều chỉnh theo biến động giá cả, tăng khả năng mở rộng và các thuộc tính thông lượng. Vì vậy, hãy theo dõi chi tiết cách chúng tôi sẽ tối ưu hóa hiệu suất mạng lưới theo thời gian.

## **Xác định tắc nghẽn**

Các hệ thống hiệu quả - từ mạng lưới đến đường xá - được xây dựng để giảm thiểu tắc nghẽn, đồng thời cho phép quản lý hiệu quả khi nó xảy ra. Theo thuật ngữ Blockchain, tắc nghẽn ngụ ý rằng mạng lưới đã bão hòa. Nó gặp khó khăn khi xử lý khối lượng lớn giao dịch và ký các Block liên kết. Các Block của Cardano được sử dụng trung bình khoảng 25% trong một Epoch nhất định. Nói chung, điều này cho thấy mạng lưới *không* bị tắc nghẽn và có dung lượng dự phòng đáng kể để xử lý số lượng giao dịch lớn hơn.

Cardano được thiết kế để công bằng và có khả năng phục hồi cao ngay cả trong điều kiện bão hòa nặng. Chúng ta hãy nhắc nhở bản thân về cài đặt tham số hiện tại và xem xét việc tối ưu hóa trong tương lai đã được lên kế hoạch. Các chỉ số hiệu suất hiện tại phụ thuộc vào các thước đo sau:

- **Thông lượng** - khối lượng dữ liệu được truyền tải. Kích thước khối (Blocksize) hiện tại được đặt là 64 KB. Một giao dịch tập lệnh Plutus đang giới hạn ở 16 KB và các giao dịch đơn giản thường có thể chiếm tới khoảng 300 Byte. Các biện pháp này đã được cân bằng để đảm bảo sử dụng mạng lưới hiệu quả trong khi giảm thiểu độ trễ giao dịch. Nếu thông lượng được tăng lên cao và ngay lập tức, người dùng sẽ phải đối mặt với sự chậm trễ ngày càng tăng trong thời gian chấp nhận Block. Vì thông lượng và tính kịp thời mâu thuẫn với nhau - tối đa hóa thông lượng nghĩa là hiệu suất mạng tốt hơn, nhưng điều này có thể phải trả giá bằng việc tăng độ trễ khi hệ thống bị bão hòa nặng.
- **Tính kịp thời** - tức là thời gian chấp nhận Block. Tổng "ngân sách" cho việc chấp nhận Block được đặt thành 5 giây để một Block lan truyền trên toàn mạng lưới (95% cổ phần) với ngân sách khoảng 50 Mili giây khả dụng cho tập lệnh Plutus. Điều này được thiết kế để chấp nhận Block, bao gồm cả tập lệnh và các giao dịch đơn giản mà không cần độc quyền.

Gần đây, người dùng đã ghi nhận thời gian chờ xử lý giao dịch tăng lên do đợt phát hành NFT (Non-Fungible Token) rất lớn. Nguyên nhân cho sự bão hòa này là do một lượng lớn NFT được giải phóng cùng một lúc, gây ra những điều sau:

- Một số lượng lớn các giao dịch NFT đồng thời
- Một lượng người dùng cố gắng mua cùng một NFT và xử lý các giao dịch cùng một lúc
- Giao dịch hoàn tiền đồng thời cho những người dùng không thể mua NFT

Kịch bản này tạo ra sự khan hiếm trong mạng lưới cho việc bán NFT và nhu cầu lớn về dịch vụ - 43.000% nguồn cung. Cũng cần lưu ý rằng khoảng thời gian "tắc nghẽn" kéo dài chưa đầy một giờ.

Đây là một thị trường đang phát triển và những người tạo NFT đã bắt đầu lặp lại các quy trình để giảm thiểu tác động của những đợt phát hành như vậy đối với trải nghiệm người dùng. Vẫn còn sớm và tất cả chúng ta đang học tập nhanh chóng. Cần lưu ý rằng quá trình đúc NFT hoàn toàn có thể được thực hiện song song, có nghĩa là không có giới hạn cho quá trình này. Sau khi được đúc, các NFT lưu trữ mã hoán đổi có thể lập trình và các tài sản cần thiết để giao dịch đã sẵn sàng tương tác với thị trường.

Nhưng ít nhất trong ngắn hạn và trung hạn, đây là vấn đề xây dựng hệ thống giao thông hiệu quả hơn là mở rộng các con đường. Một số nhà phát triển đã tạo ra các hệ thống như vậy, đặc biệt cho các đợt phát hành NFT. Điều này sẽ giảm chi phí cũng như giảm tải cho mạng lưới trong ngắn hạn.

**Các sàn giao dịch phi tập trung (DEX)**

Nhiều DApp đầu tiên được xây dựng trên Cardano là các DEX (Sàn giao dịch phi tập trung). Trong một số ứng dụng, người dùng có xu hướng tranh chấp trong khi đặt hàng. Vì điều kiện tiên quyết của thiết kế DApp là toàn bộ trạng thái được giữ trong một UTXO (thay vì trải rộng trên nhiều UTXO), sẽ xảy ra sự phụ thuộc của một giao dịch trong tương lai vào kết quả từ một giao dịch trước đó. Mở rộng ra thì đây là 'vấn đề' về tính đồng thời. Tuy nhiên, giải thích lại sự tương tự về ô tô, việc lái xe bên tay trái không phải là một "vấn đề" ở Anh hoặc Nhật Bản. Có vẻ nó đòi hỏi một sự học tập, nhưng cuối cùng nó chỉ là một cách làm việc khác. Nếu một nhà phát triển không làm điều đó, họ sẽ gặp sự cố! Nó cũng không phức tạp hơn - chỉ yêu cầu một cách tiếp cận khác.

Mô hình EUTXO của Cardano khác với mô hình dựa trên tài khoản. DApp được xây dựng trên Cardano nên rời khỏi kiểu máy trạng thái đơn luồng và đi xuống cấp độ trừu tượng trực tiếp cho EUTXO, xây dựng một giải pháp liên quan đến các cạnh đồng thời trong đồ thị EUTXO. Điều quan trọng là sử dụng các bộ UTXO khác nhau, do đó thực thi song song sẽ cải thiện thông lượng của hệ thống trong khi vẫn giữ nguyên hiệu suất của các hoạt động riêng lẻ. Chắc chắn, điều này đòi hỏi sự thay đổi tư duy đối với bất kỳ nhà phát triển nào đã từng sử dụng cách tiếp cận của Ethereum. Tuy nhiên, mô hình dựa trên UTXO an toàn hơn mô hình dựa trên tài khoản vì việc giữ tất cả trạng thái trong một tài khoản sẽ dễ bị tấn công hơn. Nếu sử dụng các kỹ thuật song song một cách chính xác, người dùng sẽ tận hưởng kết quả được cải thiện về thông lượng và khả năng mở rộng trong khi các giải pháp ngoài chuỗi có thể áp dụng tốt hơn cho sổ cái UTXO. Để biết thêm chi tiết, hãy đọc [bài đăng trên Blog về tính đồng thời](https://iohk.io/en/blog/posts/2021/09/10/concurrency-and-all-that-cardano-smart-contracts-and-the-eutxo-model/) và [cách xây dựng Plutus DApp có thể mở rộng](https://plutus-apps.readthedocs.io/en/latest/plutus/howtos/writing-a-scalable-app.html). Chúng tôi sẽ xuất bản thêm nội dung về vấn đề này trong thời gian thích hợp để cung cấp thêm hướng dẫn về cách tận dụng tối đa mô hình.

## **Lộ trình tối ưu hóa**

Trọng tâm của chúng tôi khi ra mắt luôn là cung cấp khả năng cốt lõi và tính đúng đắn, trước khi tối ưu hóa. Chúng tôi luôn đưa ra mục tiêu như vậy. Chúng tôi đang tiếp tục theo dõi các điều chỉnh về hiệu suất và điểm chuẩn. Khi mạng lưới phát triển và Cardano hoạt động với công suất cao hơn, chúng tôi sẽ điều chỉnh các tham số để theo kịp với nhu cầu của mạng lưới. Đây là những nâng cấp sẽ dần dần được thực hiện từng bước trong vài tháng tới để đảm bảo các thay đổi đáp ứng các yêu cầu của mạng lưới và không ảnh hưởng đến các thuộc tính khác.

Chúng tôi đã thực hiện phân tích sâu rộng và bắt đầu triển khai các chỉ số node để đo chính xác thời gian khuếch tán dữ liệu. Khuếch tán dữ liệu là quá trình phân phối các giao dịch và Block qua các node xác minh Blockchain. Điều cần thiết là phải cung cấp cho các node thông tin cần thiết để thuật toán đồng thuận có thể đưa ra quyết định.

Chúng tôi có thể sẽ triển khai thời gian chờ trung bình từ khi gửi giao dịch đến khi chấp nhận giao dịch. Cùng với đó, chúng tôi đang điều tra và phân tích các tình huống sẽ thúc đẩy hiệu suất mạng lặp đi lặp lại trong ngắn hạn và dài hạn, bao gồm:

- **Tăng kích thước khối** - Kích thước khối tăng lên có nghĩa là nhiều giao dịch hơn trong một Block. Lợi ích là sẽ có ít thời gian chờ đợi hơn để các giao dịch được áp dụng bởi một Block trong thời gian mạng lưới bão hòa. Tuy nhiên, có một sự đánh đổi. Các Block lớn hơn mất nhiều thời gian hơn để lan truyền trên mạng lưới. Điều này cũng có nghĩa là các node sẽ cần nhiều thời gian hơn để xác thực giao dịch. Mặc dù việc tăng kích thước khối là một tùy chọn để tăng hiệu suất mạng lưới. Nhưng những thay đổi như vậy nên được thực hiện một cách thận trọng. Để đảm bảo sự gia tăng không ảnh hưởng đến thời gian chấp nhận Block, chúng tôi sẽ dần dần thay đổi các tham số và đánh giá kết quả trong thời gian bão hòa cao. Đây không phải là bản cập nhật một lần mà là một cách tiếp cận lặp đi lặp lại. Nó sẽ cung cấp cho chúng tôi kết quả rõ ràng và giúp đảm bảo các điều chỉnh hiệu quả nhất.
- **Kích thước Mempool** - kích thước của Mempool (bộ nhớ tạm) đang được đặt là 128 KB, gấp đôi kích thước khối hiện tại. Mempool hoạt động như bộ đệm của mạng lưới và có thể gây ra độ trễ ngắn khi đưa các giao dịch vào một Block. Tuy nhiên, việc tăng kích thước Mempool *sẽ không* cải thiện thông lượng mạng - hàng chờ các giao dịch sẽ không thay đổi. Mempool cho phép việc áp dụng hợp lý các giao dịch mới nhập vào nó một cách ngẫu nhiên dựa trên node sản xuất được chọn bởi thuật toán xổ số.
- **Nén tập lệnh** - kích thước giao dịch hiện tại được đặt là 16 KB, chúng tôi đang tiếp tục làm việc với quá trình nén. Điều này cho phép giao thức ‘nén’ mã Code một cách minh bạch. Nghĩa là nhiều giao dịch tập lệnh hơn trong một Block do kích thước giảm - các nhà phát triển sẽ có thể gửi mã Code phức tạp hơn, nén nó xuống 16 KB hoặc ít hơn và sẽ có nhiều không gian hơn cho các giao dịch khác.

## **Kiến trúc cho EUTXO**

Như được mô tả trong [bài đăng trên Blog trước đây về tính đồng thời](https://iohk.io/en/blog/posts/2021/09/10/concurrency-and-all-that-cardano-smart-contracts-and-the-eutxo-model/), mô hình EUTXO của Cardano sẽ loại bỏ toàn bộ các vấn đề khi thiết kế ứng dụng DeFi. Ngoài khả năng tự nhiên của EUTXO để xử lý các giao dịch song song, [bản chất xác định](https://iohk.io/en/blog/posts/2021/09/06/no-surprises-transaction-validation-on-cardano/) của mô hình đảm bảo rằng các nhà phát triển và người dùng có thể tránh lãng phí phí "Gas".

Điều đó thể hiện mô hình EUTXO không giống với mô hình dựa trên tài khoản. Nâng cấp và chuyển kiến trúc ứng dụng dành cho các hệ thống dựa trên tài khoản sang hệ thống dựa trên EUTXO sẽ dẫn đến thiết kế ứng dụng không tối ưu. Các ứng dụng *được thiết kế đặc biệt* cho mô hình EUTXO của Cardano sẽ cung cấp trải nghiệm người dùng tốt nhất.

**Chúng tôi sẽ sớm công bố thông tin chi tiết kỹ thuật sâu hơn về cách các nhà phát triển có thể tối ưu hóa việc gửi và xử lý đơn đặt hàng, chẳng hạn như mô hình EUTXO trong thời gian ngắn.**

## **Lặp lại &amp; Cải tiến**

Có rất nhiều công việc đang diễn ra ở hậu trường khi chúng tôi tiếp tục phát triển và lặp lại. Đây vẫn còn là những ngày đầu. Chúng tôi sẽ liên tục đánh giá hiệu suất mạng và điều chỉnh các tham số cho phù hợp khi chúng tôi bắt đầu. Trong ngắn hạn, chúng tôi sẽ có thể giảm bớt tắc nghẽn khi phát hành NFT bằng cách dàn trải đều hơn việc tính toán phân phối cổ phần và phân phối phần thưởng. Điều này sẽ cho phép chúng tôi tăng kích thước khối, loại bỏ tạm dừng và tắc nghẽn tại ranh giới các Epoch, cũng như loại bỏ các đột biến tính toán (có thể gây ra sự lan truyền Block chậm hơn). Việc tăng dần kích thước khối cũng sẽ cho phép chúng tôi đánh giá các tình huống tốt nhất cho hiệu suất mạng. Những kết quả này sẽ sớm được hiển thị trên mạng lưới.

Chúng tôi cũng có kế hoạch chuyển trạng thái sổ cái sang lưu trữ trên ổ đĩa để giảm tải trên chuỗi, cùng với việc triển khai các tính năng nén tập lệnh và chia sẻ trên chuỗi. Khi được hoàn thiện, chúng sẽ bổ sung rất nhiều cho các điều chỉnh trên mạng lưới.

Trong trung hạn, [Hydra](https://iohk.io/en/blog/posts/2021/09/17/hydra-cardano-s-solution-for-ultimate-scalability/) sẽ mang lại khả năng bổ sung. Về lâu dài, Trưởng nhóm khoa học và nhóm của chúng tôi tiếp tục nghiên cứu các phương pháp và cơ chế khác xung quanh khuôn khổ định giá và nâng cao giao thức Ouroboros để tăng thông lượng giao dịch. Sẽ có nhiều thông tin hơn về điều này trong các bài đăng Blog trong tương lai!

## **Nhìn lại 2 tháng qua**

Chúng ta chỉ mới bắt đầu kỷ nguyên Hợp đồng thông minh trên Cardano trong 2 tháng. Bất kể mức độ kỳ vọng lớn của dự đoán xung quanh việc "ra mắt", đây sẽ không bao giờ là bản nâng cấp một lần. Cũng giống như việc hệ sinh thái luôn cần thời gian để xây dựng động lực, sẽ luôn có một giai đoạn chuẩn bị sẵn sàng và sau đó là điều chỉnh khi nhu cầu trên mạng lưới ngày càng tăng. Chúng tôi đang trong một cuộc hành trình và việc hiểu phản hồi của cộng đồng vẫn là yếu tố then chốt. Trao đổi với nhiều dự án mới thú vị đang xây dựng trên Cardano, chúng tôi đang xây dựng sự hiểu biết tốt hơn về các kế hoạch và mục tiêu của họ - cùng với bất kỳ vấn đề nào họ đang gặp phải - để chúng tôi có thể hỗ trợ và phục vụ khi cần thiết. Chúng tôi cũng đang theo dõi sát sao cuộc tranh luận của cộng đồng.

Đó là những ngày đầu và tất cả chúng ta vẫn đang học hỏi. Tuy nhiên, theo thiết kế, Cardano được thiết lập để linh hoạt và phát triển cùng với hệ sinh thái non trẻ - nhưng đã rất sôi động. *Tất cả* hãy tiếp tục xây dựng!

*Nếu bạn là nhà phát triển và muốn được hướng dẫn, hỗ trợ hoặc chỉ thích ghé qua trò chuyện tại một trong các phiên mở của chúng tôi - hãy đảm bảo bạn tham gia* cộng đồng kỹ thuật đang phát triển của chúng tôi trên [*Discord*](https://discord.com/channels/826816523368005654/892858202851516457) .

*Tôi cảm ơn John Woods, Vitor Silva, Kevin Hammond, Duncan Coutts, Romain Pellerin, Michael Peyton Jones, Jean-Frederic Etienne &amp; Olga Hryniuk vì đã hỗ trợ và phản hồi trong việc chuẩn bị bài đăng trên Blog này. Bài này được dịch bởi Nguyễn Văn Tú (https://iohk.io/en/blog/posts/2021/11/10/optimizing-cardano)*Dự án này được tài trợ bởi Catalyst**
