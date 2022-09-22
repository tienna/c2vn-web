# Kiến trúc DApp (ứng dụng phi tập trung) trên sổ cái EUTXO

### **Cùng tìm hiểu kỹ hơn về các kiến trúc DApp trên Cardano**

![](img/2021-11-16-architecting-dapps-on-the-eutxo-ledger.002.png) 16 tháng 11 năm 2021 ![](img/2021-11-16-architecting-dapps-on-the-eutxo-ledger.002.png) [Jean-Frédéric Etienne](tmp//en/blog/authors/Jean-Fr%C3%A9d%C3%A9ric-Etienne/page-1/) ![](img/2021-11-16-architecting-dapps-on-the-eutxo-ledger.003.png) 5 phút đọc

![Jean-Frédéric Etienne](img/2021-11-16-architecting-dapps-on-the-eutxo-ledger.004.png)[](tmp//en/blog/authors/Jean-Fr%C3%A9d%C3%A9ric-Etienne/page-1/)

### [**Jean-Frédéric Etienne**](tmp//en/blog/authors/Jean-Fr%C3%A9d%C3%A9ric-Etienne/page-1/)

Software Engineer

Engineering

- ![](img/2021-11-16-architecting-dapps-on-the-eutxo-ledger.005.png)[](mailto:jean-frederic.etienne@iohk.io "Email")
- ![](img/2021-11-16-architecting-dapps-on-the-eutxo-ledger.006.png)[](https://www.linkedin.com/in/jean-fr%C3%A9d%C3%A9ric-etienne-89607a130 "LinkedIn")
- ![](img/2021-11-16-architecting-dapps-on-the-eutxo-ledger.007.png)[](https://twitter.com/JeanFrdricEtie1 "Twitter")
- ![](img/2021-11-16-architecting-dapps-on-the-eutxo-ledger.008.png)[](https://github.com/etiennejf "GitHub")

![Kiến trúc DApp (ứng dụng phi tập trung) trên sổ cái EUTXO](img/2021-11-16-architecting-dapps-on-the-eutxo-ledger.009.jpeg)

Tiếp theo bài đăng trên blog gần đây của chúng tôi về [hiệu suất của Cardano và lộ trình tối ưu hóa sổ cái](https://iohk.io/en/blog/posts/2021/11/10/optimizing-cardano/), chúng tôi đã giới thiệu sâu hơn về công nghệ trong kiến trúc của sổ cái EUTXO.

Ở đây, chúng tôi cung cấp một kiến trúc mẫu và thảo luận về những cải tiến có thể có để thúc đẩy thông lượng giao dịch và giảm thiểu sự chậm trễ trong quá trình xử lý giao dịch.

Mô hình EUTXO của Cardano là cơ sở vững chắc để phát triển tài chính phi tập trung (DeFi) và các ứng dụng phi tập trung (DApp) vì nó tạo điều kiện thuận lợi cho việc xử lý giao dịch song song, cho phép khả năng mở rộng lớn hơn so với các mô hình dựa trên tài khoản, cũng như cung cấp thiết lập bảo mật nâng cao.

Tuy nhiên, việc sử dụng thiết kế hoặc cơ chế áp dụng cho các hệ thống dựa trên tài khoản thay vì mô hình EUTXO (đặc biệt là khi xây dựng các sàn giao dịch phi tập trung) có thể dẫn đến các vấn đề tranh chấp. Điều này dẫn đến tình trạng khi một giao dịch mới phụ thuộc vào kết quả của một giao dịch trước đó sẽ gây ra sự chậm trễ, đặc biệt nếu có một số lượng lớn các giao dịch. Để loại bỏ vấn đề này, các nhà phát triển nên tránh sử dụng kiểu chuyển đổi trạng thái single-threaded (chỉ một giao dịch được giải quyết yêu cầu trong 1 khoảng thời gian) và các ứng dụng thiết kế đặc biệt có tính đến các thuộc tính EUTXO.

## **Một kiểu kiến trúc tốt sẽ như thế nào?**

[Kiểu order book (sổ lệnh)](https://www.google.com/url?q=https://plutus-apps.readthedocs.io/en/latest/plutus/explanations/order-book-pattern.html%23what-is-the-order-book-pattern&sa=D&source=docs&ust=1636717791363000&usg=AOvVaw1XLRJgIX-WV7BDp-_EO-A_) là một trong những cách áp dụng cho phát triển DEX (sàn giao dịch phi tập trung) nếu nó tương thích với logic hợp đồng thông minh. Và hầu hết các kiến trúc, giao thức được đánh giá và trình bày trong [bài đăng trên blog của SundaeSwap](https://sundaeswap-finance.medium.com/sundaeswap-labs-presents-the-scooper-model-678d6054318d), dựa trên một cách tiếp cận chung, bằng cách:

- người dùng khóa tiền trong một tập lệnh trung gian (mà chúng tôi sẽ gọi là tập lệnh ***request*** ) cùng với mô tả về các lệnh chờ đã gửi (ví dụ: token or datum)
- một bên thứ ba (được gọi là *batcher*) tổng hợp các lệnh đã gửi theo tập lệnh ***request*** thành một giao dịch duy nhất sao cho:
    - các lệnh bị khóa được chi tiêu cùng với UTXO lưu giữ các thành phần của tập lệnh ***main*** (ví dụ: nhóm thanh khoản) sẽ được cập nhật
    - kết quả của các lệnh đã thực hiện được gửi lại cho người dùng ban đầu
    - một UTXO mới sẽ lưu giữ các thành phần được cập nhật ở địa chỉ tập lệnh ***main***

Khi áp dụng mô hình batching (nhóm các lệnh để thực hiện), được hiểu là, bất cứ khi nào *N* lệnh đặt ở tập lệnh ***request*** được sử dụng trong một giao dịch duy nhất, thì tập lệnh ***request*** sẽ được thực hiện *N* lần khi gửi giao dịch. Hơn nữa, việc kiểm tra giới hạn bộ nhớ (được kích hoạt khi giao dịch được gửi) được thực hiện bằng cách tổng hợp mức tiêu thụ bộ nhớ cho mỗi lần thực thi tập lệnh ***request*** duy nhất, cho việc thực thi tập lệnh *main* và cho bất kỳ tập lệnh MintingPolicy nào cũng có thể được thực thi (tức là theo giao thức thiết kế). Ngoài ra, cùng một ngữ cảnh giao dịch, tỷ lệ với số lượng lệnh được thực hiện, sẽ được chuyển làm đối số cho mỗi lần thực thi tập lệnh.

Mặc dù đây là một cách tiếp cận tốt, nhưng có thể có những cải tiến để làm cho nó tốt hơn nữa.

(Trong giao dịch tổng hợp) một giải pháp tiềm năng để tránh kích hoạt việc thực thi tập lệnh ***request*** *N* lần là người dùng gửi trực tiếp lệnh đến địa chỉ khóa công khai của chính họ. Tập lệnh ***request*** chỉ được sử dụng để thông báo sự hiện diện của các lệnh đang chờ xử lý và khóa các khoản phí giao dịch mà sau đó bên nhận lệnh có thể yêu cầu *batcher* khi lệnh đã được xử lý. Sử dụng giải pháp này, người dùng cũng được yêu cầu ký kết giao dịch tổng hợp để cho phép chi tiêu các đơn đặt hàng. Điều quan trọng cần lưu ý là trong trường hợp này, tất cả người dùng phải tham gia trực tuyến. Một kiến trúc đơn giản hóa cho một giải pháp như vậy có thể được tóm tắt như sau:

**Gửi lệnh** :

- Một tập lệnh MintingPolicy cụ thể có thể được sử dụng để đúc một mã thông báo 'lệnh' được gửi đến địa chỉ khóa công khai của người dùng.
- Chuyển đổi địa chỉ khóa công khai của người dùng, cùng với mô tả lệnh và phí giao dịch cần thiết, có thể được gửi tới tập lệnh request để thông báo

**Xử lý lệnh** :

- Người quản lý sẽ kiểm tra các *UTXO* ở địa chỉ tập lệnh request để thu thập các mã thông báo 'lệnh' và xây dựng giao dịch tổng hợp, sao cho mã thông báo 'lệnh' được tập lệnh chính sử dụng để xác thực giao dịch tổng hợp. Lưu ý rằng nếu mã thông báo 'lệnh' không có tại địa chỉ khóa công khai tương ứng, lệnh này được coi là vô hiệu.
- Các UTXO nằm trong tập lệnh yêu cầu không được chi tiêu bởi giao dịch tổng hợp. Chúng chỉ được sử dụng để thu thập các UTXO nắm giữ mã thông báo 'lệnh'.
- *batcher* thông báo cho những người dùng có liên quan để ký vào giao dịch tổng hợp để gửi.
- một MintingPolicy, liên kết với tập lệnh chính, được sử dụng để tạo mã thông báo 'xác nhận' cho mỗi lệnh được xử lý. Mã thông báo 'xác nhận' này sẽ được sử dụng bởi *batcher* để yêu cầu phí giao dịch bị khóa theo tập lệnh request.

**Thu phí giao dịch:**

- *Batcher* có thể sử dụng từng UTXO ở tập lệnh request bằng cách cung cấp mã thông báo 'xác nhận' tương ứng.

Các điểm chuẩn được thực hiện trên mạng thử nghiệm công khai cho thấy rằng với kiến trúc đơn giản này, khoảng 25 đến 30 lệnh có thể dễ dàng được xử lý trong một giao dịch duy nhất mà không vượt quá giới hạn bộ nhớ 10 triệu đơn vị. Chúng tôi tin rằng một số tối ưu hóa bổ sung vẫn có thể được thực hiện để tăng con số này.

Các nhà phát triển cũng có thể mở rộng kiến trúc này để xem xét các cơ chế phức tạp hơn đảm bảo lệnh được xác định, hủy lệnh của người dùng trong một khung thời gian cụ thể và bảo vệ bổ sung chống lại những kẻ theo dõi độc hại.

Đây chỉ là một ví dụ về cách người ta có thể áp dụng phương pháp tiếp cận cụ thể của EUTXO đối với thiết kế DApp. Chúng tôi đang trong quá trình mở rộng tài liệu của mình và sẽ chia sẻ các ví dụ khác trong quá trình thực hiện. Hiện tại, bạn có thể tìm thấy một số code mẫu để [tránh sử dụng đồng thời nhiều chữ ký tại đây](https://github.com/input-output-hk/lobster-challenge/tree/concurrency-multisig) .

Chúng tôi cũng dự đoán rằng cộng đồng phát triển sẽ xây dựng thêm nhiều mô hình khác và chúng tôi sẵn sàng đưa những mô hình này vào kho của chúng tôi để xây dựng một nhóm tài nguyên cho cộng đồng phát triển Plutus trong những tháng tới.

*Cảm ơn John Woods và nhóm đã đóng góp ý kiến và hỗ trợ đăng bài trên blog này.*

Bài này được dịch bởi LinhPool, Review bởi Tienna, biên tập bởi Nguyễn Hiệu. Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2021/11/16/architecting-dapps-on-the-eutxo-ledger)
*Dự án này được tài trợ bới Catalyst*
