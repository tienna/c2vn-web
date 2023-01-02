# SECP là gì và cách nó thúc đẩy sự phát triển chuỗi chéo (cross-chain) trên Cardano

### **Các nguyên tắc mật mã mới đang đến với Cardano để cho phép phát triển DApp chuỗi chéo, an toàn**

![](img/2022-11-03-what-is-secp-and-how-it-drives-cross-chain-development-on-cardano.002.png) 3 tháng 11 năm 2022 ![](img/2022-11-03-what-is-secp-and-how-it-drives-cross-chain-development-on-cardano.002.png) [Olga Hryniuk](/en/blog/authors/olga-hryniuk/page-1/) ![](img/2022-11-03-what-is-secp-and-how-it-drives-cross-chain-development-on-cardano.003.png) 3 phút đọc

![Olga Hryniuk](img/2022-11-03-what-is-secp-and-how-it-drives-cross-chain-development-on-cardano.004.png)[](/en/blog/authors/olga-hryniuk/page-1/)

### [**Olga Hryniuk**](/en/blog/authors/olga-hryniuk/page-1/)

Senior Technical Writer

Marketing &amp; Communications

- ![](img/2022-11-03-what-is-secp-and-how-it-drives-cross-chain-development-on-cardano.005.png)[](https://www.linkedin.com/in/olga-hryniuk-1094a3160/ "LinkedIn")
- ![](img/2022-11-03-what-is-secp-and-how-it-drives-cross-chain-development-on-cardano.006.png)[](https://github.com/olgahryniuk "GitHub")

![SECP là gì và cách nó thúc đẩy sự phát triển chuỗi chéo  trên Cardano](img/2022-11-03-what-is-secp-and-how-it-drives-cross-chain-development-on-cardano.007.png)

Mật mã đóng một vai trò không thể thiếu trong ngành blockchain, đảm bảo sự tin cậy và bảo mật giữa những người tham gia mạng lưới.

Các nhà phát triển DApp có thể sử dụng *các nguyên tắc mật mã* làm nền tảng để tạo các giao dịch an toàn có chứa dữ liệu nhạy cảm, phát triển các thuật toán mã hóa và giải mã tùy chỉnh cũng như xác thực các giao dịch đó bằng cách sử dụng chữ ký số.

Trong những thập kỷ gần đây, Mật mã đường cong Elliptic (ECC) đã trở thành công cụ cơ bản trên thực tế để phát triển các giao thức mật mã và các ứng dụng bảo mật. ECC cung cấp mức độ bảo mật giống như các cơ chế khác trong khi sử dụng các khóa và chữ ký ngắn hơn.

**SECP là gì?**

SECP, hay cụ thể là SECP256k1, là tên của đường cong elip. Nhiều blockchain(bao gồm Bitcoin, Ethereum và Binance Coin) sử dụng đường cong này để triển khai mật mã khóa công khai, sử dụng một cặp khóa (khóa chung và khóa riêng) để xác thực chữ ký giao dịch.

Các ví dụ về SECP bao gồm Thuật toán Chữ ký số Đường cong Elliptic (ECDSA) và chữ ký Schnorr. Điều này cho phép người dùng xác minh tính toàn vẹn của dữ liệu băm đã ký cụ thể. Các thuật toán chữ ký ECDSA và Schnorr hoạt động với đường cong SECP256k1 trong nhiều blockchain.

## **Mật mã trên Cardano**

Cardano sử dụng Thuật toán chữ ký số đường cong Edwards (EdDSA) với đường cong elip25519 làm thuật toán chữ ký gốc của nó.

Điều này có nghĩa là các nhà phát triển DApp của Plutus muốn làm việc với các blockchain khác và cần xác thực chữ ký ECDSA và Schnorr sẽ phải dành thời gian, công sức và kinh phí để triển khai các đường cong elip SECP như vậy trong Plutus. Ngoài ra, điều này làm tăng đáng kể rủi ro bảo mật tiềm ẩn. Vì ECDSA và Schnorr không có nguồn gốc từ Cardano nên các hoạt động như vậy sẽ tốn kém và tốn thời gian hơn *trừ khi được cung cấp dưới dạng các chức năng tích hợp sẵn* .

**Thêm chức năng tích hợp mới vào Plutus**

Để cho phép xây dựng các ứng dụng chuỗi chéo một cách hiệu quả, Input Output Global (IOG) đang bổ sung các chức năng tích hợp mới để hỗ trợ chữ ký ECDSA và Schnorr cùng với chữ ký gốc của Cardano.

Các chức năng tích hợp này sẽ trở thành ưu thế của Cardano vì chúng sẽ được triển khai và kiểm tra bởi các chuyên gia nên chúng sẽ cung cấp mức độ bảo mật cao nhất. Điều này sẽ cho phép mọi nhà phát triển Plutus DApp mở rộng lựa chọn thiết kế đa chữ ký hoặc chữ ký ngưỡng để sử dụng. Đặc biệt, các thiết kế dựa trên Schnorr được cộng đồng DApp hiểu rõ và sử dụng rộng rãi.

[CIP-49](https://github.com/mlabs-haskell/CIPs/blob/c5bdd66fe49c19c341499f86cebaa2eef9e90b74/CIP-0049/README.md) cung cấp khả năng giám sát sâu hơn về động lực và thông số kỹ thuật cho việc triển khai mới các chức năng tích hợp. Những thay đổi này ảnh hưởng đến trình thông dịch Plutus, vì vậy việc triển khai sẽ yêu cầu một sự kiện tổ hợp hard fork. Để tìm hiểu thêm về yêu cầu này, hãy đọc [chi tiết triển khai CIP](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0035#types-of-release) .

## **Nguyên tắc mật mã mới sẽ hoạt động như thế nào?**

![SECP trên Cardano](img/2022-11-03-what-is-secp-and-how-it-drives-cross-chain-development-on-cardano.008.png)

Figure 1. How SECP cryptographic primitives will work on Cardano

Sau khi triển khai các nguyên tắc mật mã mới, Plutus sẽ có thể dễ dàng xác minh các giao dịch từ các blockchain khác bằng cách sử dụng các tiêu chuẩn ECDSA và Schnorr. Ví dụ: Plutus sẽ có thể xác minh nguyên bản các chữ ký được tạo trong side chain EVM, điều này sẽ cải thiện trải nghiệm của nhà phát triển về mặt đơn giản hóa quy trình, chi phí và nâng cao bảo mật.

Phản hồi của cộng đồng đã chỉ ra cách bổ sung các nguyên tắc mật mã mới sẽ cải thiện quá trình phát triển DApp chuỗi chéo an toàn và hiệu quả trên Cardano. Rút kinh nghiệm từ bản nâng cấp Vasil, các nhóm IOG đã [thực hiện rất nhiều công việc](https://youtu.be/hZRwLWKNNfQ?t=257) để tinh chỉnh quy trình phát hành và đang sử dụng quy trình này để phát hành SECP. Cộng đồng đã giúp thử nghiệm chức năng mới này, ban đầu sẽ được triển khai trên Cardano devnet. Từ thời điểm đó, chức năng này sẽ được thử nghiệm liên tục trên các môi trường xem trước và tiền sản xuất. Sau khi cộng đồng cảm thấy thoải mái khi đạt được các tiêu chuẩn thử nghiệm và các chỉ số quan trọng đã được đáp ứng, IOG sẽ đề xuất ngày triển khai mạng chính thông qua một sự kiện hard fork.

Để theo kịp sự phát triển, vui lòng tham gia [các kênh Discord](https://discord.com/channels/826816523368005654/826816523964383263) dành cho nhà phát triển của IOG.

Tôi muốn cảm ơn Inigo Querejeta Azurmendi, Nigel Hemsley và Mark Irwin vì những đóng góp và hỗ trợ của họ trong việc chuẩn bị bài đăng trên blog này. Bài này được dịch bởi Quang Pham, Review và biên tập bởi Nguyễn Hiệu. 

Bài viết nguồn [tại đây:](https://iohk.io/en/blog/posts/2022/11/03/what-is-secp-and-how-it-drives-cross-chain-development-on-cardano)

Dự án này được tài trợ bởi Catalyst.
