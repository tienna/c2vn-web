---
id: cardano-key-pairs
title: Cardano Key Pairs
sidebar_label: Cặp khóa Cardano
description: Learn about Cardano key pairs.
#image: ../img/og-developer-portal.png
---

Điều quan trọng là phải hiểu nhiều cặp khóa mật mã được kết nối với Cardano, cũng như mục đích của từng cặp khóa và các phương pháp hay nhất để bảo mật các khóa đó, trước khi bạn bắt đầu làm việc với nó. Mọi nhà phát triển Cardano đầy tham vọng và nhà điều hành nhóm cổ phần phải nắm được đầy đủ các cặp khóa này, cũng như các phân nhánh của một khóa bí mật (riêng tư) bị tấn công. Bất kỳ nhà phát triển Cardano hoặc nhà điều hành nhóm cổ phần nào cũng phải học cách quản lý, bảo vệ và lưu trữ khóa cá nhân để thành công.
 
Các khóa mật mã Cardano được tạo thành từ `Ed25519` các cặp khóa, bao gồm một `public verification key file` và `secret (private) key file`.  Tệp khóa công khai thường được gọi là `keyname.vkey`, trong khi tệp khóa cá nhân được gọi là `keyname.skey`. Tệp khóa riêng, được sử dụng để ký các giao dịch, cực kỳ nhạy cảm và cần được bảo vệ thích hợp. Trong mọi trường hợp, điều này dẫn đến việc hạn chế quyền truy cập của bên thứ ba vào các khóa riêng tư của bạn. Kỹ thuật hiệu quả nhất để ngăn lộ khóa cá nhân là đảm bảo rằng khóa cá nhân cần thiết không bao giờ được giữ trong bất kỳ khoảng thời gian nào trên bất kỳ máy nào được kết nối internet (nút nóng). Xin lưu ý rằng tên tệp của cặp khóa là hoàn toàn ngẫu nhiên và có thể được đặt bất kỳ tên nào bạn muốn.

:::danger 
Hãy hết sức thận trọng để tránh làm mất hoặc ghi đè các khóa bí mật (riêng tư).
:::
 
## Cặp khóa địa chỉ ví
 
Hiện tại, địa chỉ ví Cardano chỉ có hai phần: địa chỉ thanh toán và địa chỉ đặt cọc đối ứng. Địa chỉ thanh toán (cùng với các cặp khóa liên quan) được sử dụng để lưu trữ, nhận và gửi tiền. Địa chỉ tiền cược (và các khóa liên quan) được sử dụng để lưu trữ và rút phần thưởng, cũng như để xác định chủ sở hữu số tiền cược và tài khoản phần thưởng, cũng như ủy quyền nhóm tiền cược mục tiêu của ví.
 
 
`payment.vkey` là tệp khóa xác minh công khai cho địa chỉ thanh toán (không nhạy cảm; có thể được chia sẻ công khai).

`payment.skey` là tệp khóa ký bí mật (riêng tư) của địa chỉ thanh toán có độ nhạy cao. Tệp khóa ký riêng tư cung cấp cho bạn quyền truy cập vào các khoản tiền trong địa chỉ thanh toán của bạn và luôn được giữ an toàn.

:::danger 
Không bao giờ đặt các khóa ký thanh toán trên một nút nóng.
:::
 
 
`stake.vkey` - ệp khóa xác minh công khai địa chỉ cổ phần (không nhạy cảm; có thể được chia sẻ công khai)..
 
`stake.skey` - I Đây là một tệp khóa ký bí mật (riêng tư) của địa chỉ cổ phần nhạy cảm. Tệp khóa ký riêng tư này cung cấp cho bạn quyền truy cập vào bất kỳ giải thưởng tiền mặt nào được giữ trong địa chỉ cổ phần, cũng như khả năng ủy thác ví cho một nhóm. Bạn cũng nên để mắt đến cọc. Chìa khóa.
 
`payment.addr` - Đây là địa chỉ thanh toán ví Cardano thường được tạo với sự trợ giúp của cả khóa thanh toán và tiền đặt cọc. Làm đầu vào, hãy sử dụng tệp vkey. Nếu địa chỉ thanh toán chỉ đơn thuần được sử dụng để gửi và nhận tiền, thì không cần đặt cọc thành phần quan trọng nào. Ngoài ra, có một khoản thanh toán duy nhất. Có thể kết hợp nhiều tệp tin cổ phần riêng biệt với vkey để thiết lập các địa chỉ thanh toán khác nhau có thể được đặt cọc độc lập.
 
 
`stake.addr` - địa chỉ cổ phần cho ví Cardano và được tạo bằng tệp tin cổ phần.vkey
 
## Các cặp khóa Cardano stake pool
 
### Stake pool cold keys

 `cold.skey` - tệp khóa ký bí mật (riêng tư) cho nhóm cổ phần Cardano (cực kỳ nhạy cảm). Bắt `cold.skey` buộc phải đăng ký một nhóm cổ phần, để cập nhật thông số chứng chỉ đăng ký nhóm cổ phần, để xoay các khóa KES của nhóm cổ phần và gỡ bỏ một nhóm cổ phần.
 
 
`cold.vkey` - tệp khóa xác minh công khai cho tệp khóa ký riêng tư cold.skey của nhóm cổ phần (cold.vkey không nhạy cảm; có thể được chia sẻ công khai).
 
 
`cold.counter` -  tăng dần tệp bộ đếm theo dõi số lần một chứng chỉ hoạt động (opcert) đã được tạo cho nhóm cổ phần liên quan.
 
:::danger 
Luôn xoay các phím KES bằng cách sử dụng mới nhất `cold.counter`.
:::
 
### VRF hot keys

`vrf.skey` - tệp khóa ký bí mật (riêng tư) cho khóa VRF của nhóm cổ phần Cardano (được yêu cầu để bắt đầu nút sản xuất khối của nhóm cổ phần; nhạy cảm nhưng phải được đặt trên một nút nóng để bắt đầu nhóm cổ phần).
 
`vrf.vkey` - tệp khóa xác minh công khai cho vrf.skey của nhóm cổ phần Cardano (không nhạy cảm và không bắt buộc phải khởi động nút tạo khối của nhóm cổ phần).
 
 ### KES hot keys
 
`kes.skey`- tệp khóa chữ ký bí mật (riêng tư) cho khóa KES của nhóm cổ phần (cần thiết để bắt đầu nút tạo khối của nhóm cổ phần; nhạy cảm, nhưng phải được đặt trên một nút nóng để bắt đầu nhóm cổ phần và được xoay vòng thường xuyên). Các khóa KES là cần thiết để thiết lập chứng chỉ hoạt động của nhóm cổ phần, chứng chỉ này sẽ hết hạn sau 90 ngày kể từ khi giai đoạn KES xác định của người tham gia hợp tác đã trôi qua. Do đó, các khóa KES mới phải được tạo cùng với một opcert mới cứ sau 90 ngày hoặc sớm hơn để nhóm Cardano Stake tiếp tục đúc các khối.
 
`kes.vkey` - tệp khóa xác minh công khai cho nhóm cổ phần Cardano tương ứng
`kes.skey` (không nhạy cảm và không bắt buộc đối với nhà sản xuất khối).


chỉnh sửa trang này
Cập nhật lần cuối vào 4/5/2022 bởi Tommy Kammerer