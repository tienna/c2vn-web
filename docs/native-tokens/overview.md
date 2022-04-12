---
id: overview
slug: /native-tokens/
title: Khám phá Native Tokens
sidebar_label: Tổng quan
description: Khám phá Cardano's native tokens. 

---



:::note
Hiện có 02 cách để tạo ra NFTs:

- Dành cho người không rành về công nghệ. The [showcase section](../../showcase/?tags=nft) có một số dịch vụ cung cấp việc tạo này.
- Đổi với người hiểu biết về công nghệ. Nếu bạn muốn có toàn quyền kiểm soát các mã thông báo của mình, bạn cần **tự đúc**. và đây là nội dung của bài viết này.

Minting đòi hỏi một số kỹ năng nhất định trong việc điều hướng và làm việc với Linux thông qua thiết bị đầu cuối và một node Cardano đang chạy.
 
Chúng tôi sẽ không đi sâu vào cách tạo một nút Cardano, nhưng điều này được đề cập trong [danh mục Cardano tích hợp] (https://cardano2vn.io/docs/integrate-cardano/overview).

:::

## Native tokens/assets là gì?
Cardano Blockchain có khả năng độc đáo để tạo, tương tác và xóa các token đặt biệt (hoặc 'tài sản') nguyên bản. Trong ví dụ này, Gốc (native) có nghĩa là, ngoài việc gửi và nhận đơn vị tiền tệ chính thức, bạn có thể tương tác với các tài sản tùy chỉnh ngay lập tức - mà không cần sử dụng hợp đồng thông minh.

Thực tế, nội dung gốc có thể được cư xử như là ada theo mọi khía cạnh vì khả năng này đã được tích hợp sẵn. Tất nhiên, có một số hạn chế (mà chúng ta sẽ thảo luận sau), nhưng bạn có thể coi nội dung gốc như một cách để sản xuất tùy chỉnh của riêng bạn trong thời điểm hiện tại.


## Bạn cần biết những gì?
Trước khi chúng ta đi xa hơn, đây là tóm tắt nhanh về những gì bạn cần biết.

### Cách chúng tôi tương tác với blockchain
Hầu hết tất cả các tương tác với mạng / blockchain Cardano đều dựa trên giao dịch. Chúng ta có thể phân chia các tương tác thành hai cấp với điều này.

Lớp trên cùng nhấn mạnh cách tiếp cận trực quan và bao gồm tương tác tiêu chuẩn. Gửi và nhận ada hoặc token, ủy quyền cổ phần của bạn và bỏ phiếu là tất cả các ví dụ về điều này. Các ví như ví Daedalus hoặc ví Yoroi nhẹ hơn có thể được sử dụng để thực hiện các tương tác này.

Tuy nhiên, nếu chúng ta muốn đi sâu hơn và có nhiều tùy chọn hơn để tương tác và tạo các tương tác "tùy chỉnh", chúng ta phải đi sâu hơn một bước. Chúng tôi sẽ cần toàn bộ node trong lớp này để gửi các giao dịch với các tham số được chỉ định. Một node đầy đủ thường là một chương trình thực thi được xây dựng từ kho lưu trữ nút cardano mới nhất chính thức. Có nhiều tùy chọn hơn, nhưng chúng tôi sẽ tập trung vào phiên bản Linux

Vậy, chúng ta có thể tạo ra những loại giao dịch phức tạp nào với một nút đầy đủ, và chúng ta có thể thực hiện điều đó như thế nào? Làm việc trên dòng lệnh và phát hành các giao dịch từ đó là phương pháp hiện tại. Các nhà điều hành nhóm cổ phần phải sử dụng phương thức giao dịch này để đăng ký nhóm cổ phần của họ hoặc thực hiện các thay đổi đối với cam kết của họ, trong số những thứ khác. Tuy nhiên, chúng tôi có thể sử dụng phương pháp này để sản xuất, gửi, nhận và ghi mã thông báo

Trong tương lai, đây có lẽ cũng sẽ là nơi các hợp đồng thông minh được viết, thử nghiệm và có thể được thực thi nếu không có giao diện người dùng trực quan
 

### Các hạn chế khi làm việc với mã thông báo

Vì chúng ta đã biết rằng tương tác với mạng hầu như luôn luôn là một giao dịch, chúng ta cần lưu ý một số điều được thực thi thông qua các tham số mạng.

1. Luôn phải trả một khoản phí khi phát hành một giao dịch hay gửi một thứ gì đó. Hiện tại, chi phí được xác định bởi quy mô của giao dịch (bao nhiêu "thông tin" được gửi). Quy mô của giao dịch có thể từ đơn giản "A truyền 2 ada đến B" đến giao dịch phức tạp hơn đáng kể với siêu dữ liệu bổ sung.
2. Có một giá trị tối thiểu phải được gửi. Hiện tại, giá trị được đặt thành 1 ada. Điều này có nghĩa là nếu chúng tôi muốn gửi mã thông báo, chúng tôi phải bao gồm ít nhất một ada trong giao dịch. Điều này là để tránh một lượng lớn mã thông báo tùy chỉnh được tạo và mạng bị ngập trong các giao dịch mã thông báo tùy chỉnh.
3. Chúng tôi hiện tại (tháng 6 năm 2021) không có cách tiêu chuẩn nào để xác định NFT. Tuy nhiên, có một [open pull request] (https://github.com/cardano-foundation/CIPs/pull/85). Hầu hết các NFT hiện tại trên Cardano hầu hết tuân theo cấu trúc được đề xuất, như chúng tôi sẽ trình bày trong phần này.

Hãy ghi nhớ những ràng buộc đó nếu bạn muốn làm việc với token gốc.
 

## Sự khác biệt giữa mã thông báo "thông thường" và NFT

Về mặt công nghệ, không có nhiều sự khác biệt giữa mã thông báo / tài sản gốc và NFT "thông thường". Điều này là do thực tế là cả hai đều có thể được sản xuất bằng cli node cardano và là tài sản gốc.

Không giống như các tài sản gốc có thể thay thế, có thể bao gồm hàng triệu mã thông báo có thể hoán đổi cho nhau, NFT là một tài sản gốc duy nhất không thể được đúc lại hoặc phá hủy và nó tồn tại vĩnh viễn trên blockchain.
