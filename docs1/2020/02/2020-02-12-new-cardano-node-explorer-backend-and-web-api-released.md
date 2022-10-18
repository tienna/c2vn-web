# Phát hành explorer backend, API web và Node Cardano mới

### **Chúng tôi đã thay đổi kiến trúc của Cardano với nhiều thứ mới hơn**

![](img/2020-02-12-new-cardano-node-explorer-backend-and-web-api-released.002.png) Ngày 12 tháng 2 năm 2020 ![](img/2020-02-12-new-cardano-node-explorer-backend-and-web-api-released.002.png) [Tim Harrison](tmp//en/blog/authors/tim-harrison/page-1/) ![](img/2020-02-12-new-cardano-node-explorer-backend-and-web-api-released.003.png) 4 mins read

![Tim Harrison](img/2020-02-12-new-cardano-node-explorer-backend-and-web-api-released.004.png)[](tmp//en/blog/authors/tim-harrison/page-1/)

### [**Tim Harrison**](tmp//en/blog/authors/tim-harrison/page-1/)

VP of Community &amp; Ecosystem

Communications

- ![](img/2020-02-12-new-cardano-node-explorer-backend-and-web-api-released.005.png)[](mailto:tim.harrison@iohk.io "Email")
- ![](img/2020-02-12-new-cardano-node-explorer-backend-and-web-api-released.006.png)[](https://uk.linkedin.com/in/timbharrison "LinkedIn")
- ![](img/2020-02-12-new-cardano-node-explorer-backend-and-web-api-released.007.png)[](https://twitter.com/timbharrison "Twitter")
- ![](img/2020-02-12-new-cardano-node-explorer-backend-and-web-api-released.008.png)[](https://github.com/timbharrison "GitHub")

![New Cardano node, explorer backend, and web API released](img/2020-02-12-new-cardano-node-explorer-backend-and-web-api-released.009.jpeg)

Hôm nay là ngày đánh dấu đỉnh cao nỗ lực đáng kể của nhóm Cardano về việc phát hành một triển khai Cardano Haskell mới. Việc triển khai này bao gồm hai thành phần chính: [Cardano Node](https://github.com/input-output-hk/cardano-node) và [Cardano Explorer Backend và Web API](https://github.com/input-output-hk/cardano-explorer) . Trong 18 tháng qua, chúng tôi đã xây dựng một nền tảng kiến trúc mới không chỉ giúp chúng tôi chuẩn bị cho các bản phát hành sắp tới cho Shelley - và sau đó là Goguen - mà còn mở ra cánh cửa cho các nhà phát triển bên thứ ba và doanh nghiệp .

Các thay đổi sẽ bắt đầu với bản cập nhật Ouroboros lên Ouroboros BFT (Byzantine Fault Tolerance), dự kiến vào ngày 20 tháng 2. Hiện tại, việc sản xuất blockchain của Cardano vẫn được thực hiện theo phương thức cũ. Sau khi cập nhật lên Ouroboros BFT, chúng tôi sẽ có thể di chuyển các core nodes tạo khối, trong khi người dùng Daedalus sẽ có thể nâng cấp sau, khi phần phụ trợ ví tương thích có.

## **Tại sao lại là lúc này ?**

Việc triển khai ban đầu của mạng node  - được khởi chạy vào tháng 9 năm 2017 - đã đưa chúng tôi đi xa nhất có thể. Từ lâu, chúng tôi đã biết rằng một kiến trúc mới là cần thiết để đạt được lộ trình của chúng tôi, sẵn sàng hệ thống cho Shelley và cung cấp nền tảng cho Goguen, cũng như các bản phát hành khác trong tương lai.

Bản cập nhật này nhằm cải thiện hoàn toàn thiết kế của Cardano và cũng là bản cập nhật đầu tiên tận dụng công việc của chúng tôi trên các phương pháp chính thức. Trong khi node cũ là nguyên khối - với các thành phần như backend và explore ví được tích hợp sẵn - phiên bản mới được mô-đun hóa. Điều này làm cho việc tích hợp trong tương lai dễ dàng hơn và cho phép nút được tích hợp dễ dàng hơn vào các hệ thống khác, chẳng hạn như các hệ thống được sử dụng bởi các sàn giao dịch. Trong kiến trúc mới, nút, ví và trình khám phá tồn tại dưới dạng các thành phần riêng biệt (một chương trình phụ trợ ví mới sẽ sớm được phát hành).

## **Điều này sẽ liên quan tới những gì ?**

Một thành tựu đáng kể của việc triển khai mới này là sự tách biệt của lớp đồng thuận và các quy tắc sổ cái. Việc phân tách này có nghĩa là chúng tôi có thể thay đổi các quy tắc sổ cái mà không cần thực hiện các thay đổi đối với (hoặc có nguy cơ phá vỡ) sự đồng thuận. Sau đó, khi chúng tôi chuyển từ Shelley sang Goguen, chỉ các quy tắc sổ cái sẽ thay đổi. Điều này sẽ cho phép chúng tôi thực hiện triển khai hiệu quả hơn và thêm các tính năng mới thường xuyên hơn. Chúng tôi sẽ xác thực và kiểm tra ít hơn, đồng thời hỗ trợ phát triển hiệu quả hơn.

Một số lợi ích sẽ được nhận ra lập tức, và những lợi ích khác sẽ được nhận ra theo thời gian. Lợi ích trực tiếp là các kỹ sư IOHK sẽ có thể đổi mới dễ dàng hơn và thực hiện các thay đổi đối với các thành phần cụ thể mà không nhất thiết phải tác động đến những người khác. Việc triển khai mới, cùng với bản cập nhật cho Ouroboros BFT, cũng sẽ dẫn đến cải thiện hiệu suất TPS (giao dịch mỗi giây) đáng kể. Đối với người dùng , lợi ích của bản cập nhật này sẽ được tích lũy, vì mạng Cardano thu được lợi ích từ sự hỗ trợ phát triển lớn hơn cũng như khả năng thích ứng và mềm dẻo của hệ thống.

Việc thực hiện mới này là kết quả của rất nhiều giờ làm việc khó khăn. Giờ đây, chúng tôi bắt đầu thấy những lợi ích của việc cam kết với các phương pháp chính thức, cung cấp một mạng lưới không chỉ có thể mở rộng quy mô mà còn ổn định trong khi làm như vậy. Cơ sở mã mới đã được thử nghiệm khá nhiều - và đang diễn ra, và chúng tôi có thể thực hiện một số cải tiến cơ bản mà không lặp lại những thiếu sót của cơ sở mã cũ.

Node Cardano mới cũng có giao diện IPC có thể được sử dụng bởi nhiều thành phần khách hàng, bao gồm ví, trình khám phá, công cụ CLI cũng như các công cụ và API tích hợp tùy chỉnh. Điều này không chỉ về việc chúng tôi có thể phát triển các hệ thống và ứng dụng hoạt động tốt hơn mà những người khác cũng có thể phát triển được.

## **Explorer Backend and API Web của Cardano.**

[Explore Backen và API web của Cardano](https://github.com/input-output-hk/cardano-explorer) là điều mới cho [Node Cardano](https://github.com/input-output-hk/cardano-node) . Nó đã được viết lại hoàn toàn so với trình [cardano-sl explore](https://github.com/input-output-hk/cardano-sl-explorer) trước đó. Nó có thiết kế mô-đun mới và bao gồm các thành phần sau: Node Cardano Explorer, cơ sở dữ liệu PostgreSQL và API Web Cardano Explorer.

- Node [cardano-explorer](https://github.com/input-output-hk/cardano-explorer/tree/master/cardano-explorer-node) là một ứng dụng khách của nút Cardano. Nó đồng bộ hóa dữ liệu chuỗi Byron vào cơ sở dữ liệu PostgreSQL. Lược đồ cơ sở dữ liệu PostgreSQL là một giao diện công cộng ổn định và có thể được sử dụng trực tiếp cho các truy vấn.
- [API web cardano-explorer](https://github.com/input-output-hk/cardano-explorer/tree/master/cardano-explorer-webapi) là một máy chủ REST API đọc dữ liệu từ cơ sở dữ liệu PostgreSQL. Nó tương thích với API HTTP cardano-sl explorer cũ và giao diện người dùng web cũ.

Để biết thêm thông tin, hãy xem [ghi chú phát hành](https://github.com/input-output-hk/cardano-explorer/releases) và tài liệu được liên kết trong đó.

Bản phát hành này nhằm chuẩn bị cho Cardano cho những gì sắp tới và chúng tôi đảm bảo có sẵn kiến trúc và bộ máy mạng để mở rộng quy mô, vẫn nhanh và cho phép khả năng tương tác; tương tác và dễ sử dụng cần thiết mà các trường hợp sử dụng trong ngành yêu cầu.

Để biết các bản cập nhật Cardano mới nhất, hãy truy cập [diễn đàn Cardano](https://forum.cardano.org/) hoặc theo dõi chúng tôi trên [Twitter](https://twitter.com/Cardano) - và theo dõi để biết thêm thông tin về chương trình phụ trợ ví mới. 

Bài này được dịch bởi Nguyễn Đức, Review và đăng bài bởi Nguyễn Hiệu. Nguồn bài dịch [tại đây](https://iohk.io/en/blog/posts/2020/02/12/new-cardano-node-explorer-backend-and-web-api-released/) 

*Dự án này được tài trợ bởi Catalyst*
