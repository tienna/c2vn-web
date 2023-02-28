# Câu hỏi thường gặp về nâng cấp Valentine

### **Tập hợp các câu hỏi thường gặp về đợt nâng cấp Valentine gần đây.**

![](img/2023-02-27-valentine-upgrade-faq.002.png)27 Tháng hai 2023![](img/2023-02-27-valentine-upgrade-faq.002.png) [Fernando Sánchez](/en/blog/authors/fernando-sanchez/page-1/)![](img/2023-02-27-valentine-upgrade-faq.003.png) 3 phút đọc

![Fernando Sánchez](img/2023-02-27-valentine-upgrade-faq.004.png)[](/en/blog/authors/fernando-sanchez/page-1/)

###

[**Fernando Sánchez**](/en/blog/authors/fernando-sanchez/page-1/)

Nhà văn kỹ thuật cao cấp

Tiếp thị và Truyền thông

- ![](img/2023-02-27-valentine-upgrade-faq.005.png)[](mailto:fernando.sanchez@iohk.io "E-mail")
- ![](img/2023-02-27-valentine-upgrade-faq.006.png)[](https://www.linkedin.com/in/linkedinsanchezf/ "LinkedIn")

![Câu hỏi thường gặp về nâng cấp Valentine](img/2023-02-27-valentine-upgrade-faq.007.png)

**Q** - **Hard fork trong thời đại Valentine đạt được điều gì?**

**Trả lời** - Để cho phép xây dựng các ứng dụng chuỗi chéo hiệu quả, các chức năng tích hợp mới đã được thêm vào để hỗ trợ chữ ký ECDSA và Schnorr cùng với chữ ký gốc của Cardano. Sau khi được triển khai, các chức năng này sẽ trở thành bản địa của Cardano. Một lợi thế bổ sung là kiểm toán bảo mật của các chuyên gia sẽ đảm bảo mức độ bảo mật cao nhất có thể.

**Q** - **Hard fork này thay đổi  gì?**

**A** - Một thay đổi ngữ nghĩa nhỏ và tập trung đối với sổ cái.  Tuy nhiên, nó không thay đổi kỷ nguyên sổ cái (ví dụ: Babbage).

**Hỏi** - **Các nhà phát triển DApp được hưởng lợi như thế nào từ việc triển khai chữ ký ECDSA và chữ ký gốc Schnorr  trên Cardano?**

**Trả lời** - Những chữ ký này thường được sử dụng trong các chuỗi khác và được hiểu rõ, điều đó có nghĩa là các nhà phát triển DApp sẽ có nhiều lựa chọn hơn về thiết kế đa chữ ký hoặc chữ ký ngưỡng. Do đó nâng cao khả năng sử dụng của Cardano.

**H** - **Tại sao lại cần một hard fork để thêm các chức năng tích hợp mới cho chữ ký Schnorr và ECDSA với đường cong SECP256k1 cho các tập lệnh Plutus?**

**Trả lời** - Bản cập nhật này yêu cầu hard fork vì những thay đổi cần thiết cho trình thông dịch Plutus. Bởi vì đây là một hard fork nội tại, nó không thay đổi kỷ nguyên sổ cái, điều đó có nghĩa đây là bản nâng cấp của kỷ nguyên Babbage (chức năng Vasil).

**Q** - **Mật mã gốc là gì?**

**Trả lời** - Chúng là các khối xây dựng cơ bản mà các nhà phát triển DApp sử dụng để bảo mật các giao dịch/dữ liệu, phát triển các thuật toán mã hóa và giải mã tùy chỉnh cũng như xác thực các tin nhắn thông qua chữ ký số.

**Q** - **Tại sao Mã hóa đường cong Elliptic (ECC) trở nên phổ biến trong vài năm qua?**

**Trả lời** - Công nghệ này hiện là xu hướng chủ đạo để phát triển các giao thức mật mã và các ứng dụng bảo mật. ECC sử dụng các khóa và chữ ký nhỏ hơn cho cùng một mức độ bảo mật và cung cấp khả năng tạo và thỏa thuận khóa rất nhanh cũng như chữ ký nhanh.

**Q** - **Chuỗi Ethereum và Bitcoin sử dụng thuật toán mật mã và đường cong elip nào?**

**A** - Cả hai chuỗi đều sử dụng thuật toán ECDSA với đường cong elip SECP256k1.

**Q** - **Cardano sử dụng đường cong elip nào với thuật toán chữ ký của nó?**

**A** - Cardano sử dụng Thuật toán chữ ký số đường cong Edwards (EdDSA) với đường cong hình elip Curve25519 làm đường cong cơ sở. Do đó, nó được gọi là Ed25519.

**H** - **Ưu điểm của việc thêm các chức năng tích hợp sẵn cho chữ ký Schnorr và ECDSA với đường cong SECP256k1 cho các tập lệnh Plutus là gì?**

**Trả lời** - Vì Cardano sử dụng EdDSA (không giống như Ethereum và Bitcoin), các nhà phát triển DApp sẽ cần dành thời gian và nguồn lực để triển khai chữ ký Schnorr và ECDSA trên các đường cong elip SECP trong Plutus. Việc thêm các chức năng tích hợp để hỗ trợ chữ ký Schnorr và ECDSA với đường cong SECP256k1 trong tập lệnh Plutus sẽ loại bỏ gánh nặng đó và cũng loại bỏ mọi rủi ro bảo mật tiềm ẩn vì những đường cong này không có nguồn gốc từ Cardano.

**Q** - **Sau khi triển khai, Plutus có thể làm gì tốt hơn?**

**Trả lời** - Plutus có thể dễ dàng xác minh các giao dịch từ các chuỗi khối khác bằng cách sử dụng các tiêu chuẩn ECDSA và Schnorr. Ví dụ: Plutus có thể xác minh chữ ký được tạo trong chuỗi bên EVM, điều này sẽ cải thiện trải nghiệm của nhà phát triển về quy trình đơn giản, chi phí và bảo mật nâng cao.
