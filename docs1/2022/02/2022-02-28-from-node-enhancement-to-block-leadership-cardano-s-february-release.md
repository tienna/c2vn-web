# Từ  việc cải tiến node đến việc node được đóng block… Bản phát hành tháng 2 của Cardano

### **Vào năm 2022, chúng tôi sẽ gộp nhiều bản phần mềm để cải thiện khả năng dự đoán phân phối cho hệ sinh thái. Đây là những gì sẽ ra mắt trong bản cập nhật lớn đầu tiên của chúng tôi vào năm 2022**

![](img/2022-02-28-from-node-enhancement-to-block-leadership-cardano-s-february-release.002.png) 28 tháng 2 năm 2022![](img/2022-02-28-from-node-enhancement-to-block-leadership-cardano-s-february-release.002.png)[ Tim Harrison](/en/blog/authors/tim-harrison/page-1/)![](img/2022-02-28-from-node-enhancement-to-block-leadership-cardano-s-february-release.003.png) bài đọc 4 phút

![Tim Harrison](img/2022-02-28-from-node-enhancement-to-block-leadership-cardano-s-february-release.004.png)[](/en/blog/authors/tim-harrison/page-1/)

### [**Tim Harrison**](/en/blog/authors/tim-harrison/page-1/)

VP of Community &amp; Ecosystem

Communications

- ![](img/2022-02-28-from-node-enhancement-to-block-leadership-cardano-s-february-release.005.png)[](mailto:tim.harrison@iohk.io "Email")
- ![](img/2022-02-28-from-node-enhancement-to-block-leadership-cardano-s-february-release.006.png)[](https://uk.linkedin.com/in/timbharrison "LinkedIn")
- ![](img/2022-02-28-from-node-enhancement-to-block-leadership-cardano-s-february-release.007.png)[](https://twitter.com/timbharrison "Twitter")
- ![](img/2022-02-28-from-node-enhancement-to-block-leadership-cardano-s-february-release.008.png)[](https://github.com/timbharrison "GitHub")

![Từ  việc cải tiến node đến việc hướng dẫn khối… Bản phát hành tháng 2 của Cardano](img/2022-02-28-from-node-enhancement-to-block-leadership-cardano-s-february-release.009.jpeg)

Sau khi triển khai các khả năng của hợp đồng thông minh với bản cập nhật Alonzo, Cardano hiện đang tập trung vào việc tối ưu hóa hiệu suất và khả năng mở rộng. Giờ đây, chúng ta bắt đầu thấy một loạt các ứng dụng phi tập trung (Dapps), sàn giao dịch (DEX) và nhiều ứng dụng khác sẽ ra mắt trong những tháng tới. Năm 2022 là năm Cardano phát triển thành một nền tảng cung cấp tài chính bền vững ([RealFi](https://iohk.io/en/blog/posts/2021/11/25/welcome-to-the-age-of-realfi/)) cho những người thực và là một môi trường nơi các phát triển trong tương lai sẽ được điều chỉnh bởi một hệ thống quản trị phi tập trung.

Trong suốt những tuần và tháng tới, chúng tôi sẽ tối ưu hóa, mở rộng quy mô và mang lại các tính năng mới thông qua việc triển khai bản phát hành mới. Chúng tôi sẽ thực hiện điều này trong các bản cập nhật tăng dần được xác định rõ ràng, các bản cập nhật này sẽ nhóm các tính năng mới thành một danh sách các dịch vụ kĩ thuật sau đó sẽ phát hành thành các bản cập nhật định kỳ dễ quản lý hơn. Chúng tôi hiện đang trong giai đoạn cuối cùng của việc chuẩn bị phát hành vào tháng 2, đây là lần phát hành đầu tiên trong ba lần phát hành bảng mã chính (tiếp theo là tháng 6 và tháng 10), những bản phát hành này sẽ nâng cấp mạng lõi trong năm 2022.

Chiến lược phân nhóm này có một cơ sở lý luận rõ ràng: là khả năng dự đoán. Cardano đã phát triển đáng kể và dự kiến ​​sẽ còn phát triển hơn nữa sau 2022. Bằng cách tạo lịch phát hành cụ thể, các công ty dựa vào cơ sở hạ tầng của Cardano biết chính xác khi nào các bản phát hành lớn sắp ra mắt, vì vậy họ có thể chuẩn bị cho phù hợp.

### **Những cải tiến sẽ có trong bản phát hành này**

Bản phát hành lớn đầu tiên của năm 2022 chứa một số cải tiến và nâng cấp:

- Khả năng tạo các giao dịch tuân theo Concise Data Definition Language (CDDL) bằng cách sử dụng các công cụ gốc CLI đi kèm theo node, thay vì yêu cầu các công cụ của bên thứ ba.
- Đa chữ ký của các giao dịch trong các giai đoạn tăng dần. Mặc dù đã có thể có một giao dịch Cardano được ký bởi nhiều thực thể (tương tự như một tài khoản ngân hàng chung) bằng cách sử dụng khóa riêng của họ, bản cập nhật này giúp bạn có thể ký một giao dịch tăng dần. Bây giờ, chẳng hạn, một bên có thể ký giao dịch trước, sau đó gửi giao dịch đó cho người khác, thay vì phải ký cùng nhau.
- Công cụ CLI mới dành cho SPO để kiểm tra lịch trình hướng dẫn. Công cụ này cho phép các SPO xem xét epoch tiếp theo và kiểm tra các vị trí mà SPO đang thực thi lệnh để đúc ra một khối. Một số người có thể nghĩ rằng khả năng này có thể đặt ra các vấn đề bảo mật, nhưng công cụ này được thiết kế theo cách mà bất kỳ SPO nào chỉ có thể kiểm tra lịch trình sắp tới của chính họ. Họ không thể kiểm tra bất kỳ lịch trình của những SPO khác.
- Công cụ CLI để kiểm tra mempool cục bộ. Đây là một công cụ dành cho nhà phát triển cho phép kiểm tra mempool cục bộ nơi các giao dịch diễn ra trước khi chúng được đưa vào một khối. Tính năng này cho phép các nhà phát triển theo dõi tiến trình của giao dịch trước khi nó được thêm vào một khối.
- Công cụ CLI để ước tính chi phí của tập lệnh. Người dùng node bây giờ sẽ có thể ước tính chính xác chi phí chạy một tập lệnh Plutus. Tiện ích của việc này là nó cho phép các nhà phát triển xem xét các tài nguyên (giới hạn bộ nhớ, giới hạn CPU, ...) mà họ sử dụng khi viết hợp đồng thông minh hoặc tập lệnh xác thực rất hữu ích khi tạo các giao dịch Plutus. Giờ đây, các nhà phát triển có thể biết các tập lệnh của họ sẽ sử dụng bao nhiêu tài nguyên khi thực thi trên chuỗi.

Bản phát hành tháng hai của chúng tôi chỉ là khởi đầu. [Trong suốt năm 2022](https://iohk.io/en/blog/posts/2022/01/14/how-we-re-scaling-cardano-in-2022/)- và tập trung vào các sự kiện tổ hợp hard fork (HFC) vào tháng 6 và tháng 10 - chúng tôi sẽ giới thiệu một loạt các cải tiến mở rộng quy mô. Bao gồm các yếu tố chính trong kế hoạch mở rộng quy mô của chúng tôi như pipelining (phát tán đồng thời), Plutus CIPs mới, lưu trữ trên đĩa UTXO và Hydra. Kết hợp với việc điều chỉnh thông số, các tính năng này sẽ nâng cao lưu lượng của Cardano và tối ưu hóa hệ thống để đáp ứng ngày càng nhiều các ứng dụng tài chính phi tập trung (DeFi), hợp đồng thông minh và DEX. Ngoài ra, như đã nêu trong chương trình Cardano360 tháng 2 gần đây của chúng tôi, IOG đang làm việc trên một loạt các sản phẩm và tính năng mới, từ cửa hàng DApp và sản phẩm ví nhẹ mới, đến giải pháp đồng bộ hóa nhanh Mithril và những sidechain. Trong khi đó, một cộng đồng đáng kinh ngạc đang đóng góp những DApp, dịch vụ, trang web, công cụ và API mới để tiếp tục xây dựng một hệ sinh thái phi tập trung phát triển mạnh mẽ. Một năm 2022 thú vị đang ở phía trước. Xa hơn nữa...

Bài này được dịch bởi Lê Nguyên, Review bởi Tienna, biên tập bởi Nguyễn Hiệu. Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2022/02/28/from-node-enhancement-to-block-leadership-cardano-s-february-release)
*Dự án này được tài trợ bới Catalyst*
