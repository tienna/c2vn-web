# Nguyên tắc mã hóa Cardano mới để mang lại khả năng tương tác cao hơn và phát triển DApp chuỗi chéo, an toàn

### **Để giúp các nhà phát triển xây dựng các ứng dụng chuỗi chéo dễ dàng hơn, Input Output Global (IOG) đang thêm các chức năng tích hợp mới vào Plutus để hỗ trợ chữ ký ECDSA và Schnorr**

![](img/2023-01-19-new-cardano-cryptographic-primitives-to-bring-greater-interoperability-and-secure-cross-chain-dapp-development.002.png) 19 tháng một 2023 ![](img/2023-01-19-new-cardano-cryptographic-primitives-to-bring-greater-interoperability-and-secure-cross-chain-dapp-development.003.png) [Tim Harrison](/en/blog/authors/tim-harrison/page-1/) ![](img/2023-01-19-new-cardano-cryptographic-primitives-to-bring-greater-interoperability-and-secure-cross-chain-dapp-development.004.png) 4 phút đọc

![Tim Harrison](img/2023-01-19-new-cardano-cryptographic-primitives-to-bring-greater-interoperability-and-secure-cross-chain-dapp-development.005.png)[](/en/blog/authors/tim-harrison/page-1/)

### [**Tim Harrison**](/en/blog/authors/tim-harrison/page-1/)

Phó Giám đốc Cộng đồng &amp; Hệ sinh thái

truyền thông

- ![](img/2023-01-19-new-cardano-cryptographic-primitives-to-bring-greater-interoperability-and-secure-cross-chain-dapp-development.006.png)[](mailto:tim.harrison@iohk.io "E-mail")
- ![](img/2023-01-19-new-cardano-cryptographic-primitives-to-bring-greater-interoperability-and-secure-cross-chain-dapp-development.007.png)[](https://uk.linkedin.com/in/timbharrison "LinkedIn")
- ![](img/2023-01-19-new-cardano-cryptographic-primitives-to-bring-greater-interoperability-and-secure-cross-chain-dapp-development.008.png)[](https://twitter.com/timbharrison "Twitter")
- ![](img/2023-01-19-new-cardano-cryptographic-primitives-to-bring-greater-interoperability-and-secure-cross-chain-dapp-development.009.png)[](https://github.com/timbharrison "GitHub")

![Nguyên tắc mã hóa Cardano mới để mang lại khả năng tương tác cao hơn và phát triển DApp chuỗi chéo, an toàn](img/2023-01-19-new-cardano-cryptographic-primitives-to-bring-greater-interoperability-and-secure-cross-chain-dapp-development.010.png)

Mật mã đảm bảo sự tin cậy và bảo mật trong cài đặt chuỗi khối và các chuỗi khối khác nhau sử dụng các phương thức chữ ký mật mã khác nhau. Thuật toán chữ ký số Elliptic Curve (ECDSA) và chữ ký Schnorr là hai sơ đồ chữ ký phổ biến được sử dụng trong các nền tảng chuỗi khối. Bitcoin và Ethereum, trong số các hệ thống mật mã khác, sử dụng ECDSA. Chữ ký Schnorr, ban đầu được đề xuất như một giải pháp thay thế cho ECDSA, cũng được sử dụng trong một số mạng chuỗi khối, chẳng hạn như Polkadot.

Cardano sử dụng Thuật toán chữ ký số đường cong Edwards (EdDSA) với đường cong hình elip Curve25519 làm đường cong cơ sở (hay còn gọi là Ed25519). Điều này cho phép xác minh chữ ký nhanh và kích thước chữ ký nhỏ, giúp cải thiện hiệu suất tổng thể và tính bảo mật của chuỗi khối. Ngoài ra, Ed25519 được thiết kế để chống lại một số loại tấn công mã hóa nhất định, làm cho nó trở thành một lựa chọn an toàn hơn. [Monero, Ripple và những người khác](http://ethanfast.com/top-crypto.html) cũng sử dụng Ed25519 làm thuật toán chữ ký của họ.

## **Nguyên tắc mật mã mới trên Cardano**

Sự khác biệt trong thuật toán có nghĩa là các nhà phát triển Plutus DApp muốn làm việc với các chuỗi khối khác và cần xác thực chữ ký ECDSA và Schnorr sẽ phải dành thời gian, công sức và kinh phí để triển khai các thuật toán đó trên các đường cong elip Tiêu chuẩn cho Mật mã Hiệu quả ( [SECP](https://iohk.io/en/blog/posts/2022/11/03/what-is-secp-and-how-it-drives-cross-chain-development-on-cardano/) ) trong sao mai. Điều này làm tăng đáng kể các rủi ro bảo mật tiềm ẩn và có thể sử dụng một lượng tài nguyên không thực tế.

Do chỉ có thuật toán chữ ký chính Ed25519 của Cardano được cung cấp dưới dạng chức năng tích hợp sẵn của Plutus, nên các hoạt động của ECDSA và Schnorr sẽ tốn kém và tốn thời gian hơn *trừ khi cũng được cung cấp dưới dạng chức năng tích hợp sẵn* .

Để giúp các nhà phát triển xây dựng các ứng dụng chuỗi chéo dễ dàng hơn, Input Output Global (IOG) đã thêm các chức năng tích hợp mới vào Plutus để hỗ trợ chữ ký ECDSA và Schnorr. Điều này sẽ cho phép các nhà phát triển sử dụng nhiều loại thiết kế chữ ký đa chữ ký hoặc ngưỡng vốn có trong Cardano, do đó cung cấp mức độ bảo mật cao nhất.

### **Chuẩn bị sẵn sàng cho việc nâng cấp**

Quá trình chuẩn bị đã được tiến hành trong một thời gian trên toàn bộ hệ sinh thái Cardano. Các nhóm kỹ thuật cốt lõi tại IOG và Cardano Foundation, SPO, nhà phát triển DApp và sàn giao dịch đã thực hiện thử nghiệm tích hợp chuyên sâu trong môi trường thử nghiệm xem trước kể từ tháng 11 năm 2022 và thu được kết quả khả quan. Công nghệ này hiện sắp được triển khai trên mạng chính Cardano.

Đối với việc nâng cấp Vasil, IOG và Cardano Foundation đã đồng ý về một số chỉ số khối lượng quan trọng rõ ràng trong giai đoạn cuối để đảm bảo hệ sinh thái sẵn sàng. Ví dụ, bản nâng cấp mới không phức tạp như Vasil và cũng không có tác động như vậy đối với các DApp hiện có. Tuy nhiên, các nhóm đang đảm bảo sẵn sàng bằng cách hợp tác chặt chẽ với các bên liên quan chính của Cardano (đặc biệt là SPO, DApp và sàn giao dịch) có thể cần chuẩn bị cho khả năng mới.

Tại thời điểm viết bài, [hơn 80% nút tạo khối](https://pooltool.io/networkhealth) đang chạy nút mới được yêu cầu (phiên bản 1.35.4). Các thành phần xuôi dòng (chẳng hạn như DB Sync, phụ trợ ví, GraphQL, v.v.) không bị ảnh hưởng trực tiếp bởi thay đổi, nhưng hơn bao giờ hết, khả năng tương thích với phiên bản nút mới đã được thử nghiệm đầy đủ.

Các sàn giao dịch đã được thông báo về việc nâng cấp, vì vậy họ có đủ thời gian để nâng cấp hệ thống của mình theo yêu cầu. IOG cũng đã thăm dò ý kiến cộng đồng phát triển công cụ/DApp – rất ít dự án sẽ bị ảnh hưởng bởi sự thay đổi và chúng tôi đã tính đến nhu cầu của những dự án cần cập nhật mã của họ cho phù hợp. Dựa trên cuộc thăm dò cộng đồng đó, việc nâng cấp mạng chính dự kiến được đề xuất vào ngày 14 tháng 2 năm 2023 lúc **21:44:51** **UTC** . Hard fork mainnet sẽ diễn ra vào đầu kỷ nguyên 394 với chiều cao khe tuyệt đối 84844800, chiều cao khối ước tính 8403208.

Trên cơ sở đó, IOG đang nhắm mục tiêu cập nhật cho **môi trường thử nghiệm tiền sản xuất vào ngày 11 tháng 2 năm 2023 lúc 00:00:00 UTC** .

Như mọi khi, hãy luôn theo dõi các kênh xã hội của chúng tôi và Cardano Foundation để biết thông tin mới nhất về tiến trình khi chúng ta hướng tới ngày này. Nếu bạn là nhà phát triển hoặc SPO, vui lòng tham gia các kênh thông báo [Discord](https://discord.com/invite/inputoutput) , [TG](https://t.me/SPOannouncements) của chúng tôi và theo dõi [trang sẵn sàng của hệ sinh thái này](https://iohk.zendesk.com/hc/en-us/articles/14669691361433-Ecosystem-readiness-for-the-SECP-upgrade) .
