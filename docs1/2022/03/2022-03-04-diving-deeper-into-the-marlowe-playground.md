# Tìm hiểu sâu hơn về Sân chơi Marlowe

### **Học cách tạo các mẫu hợp đồng của riêng bạn từ Marlowe và cung cấp gợi ý cho người dùng bằng siêu dữ liệu tùy chỉnh**

![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.002.png) 4 tháng 3 năm 2022 ![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.002.png) [Pablo Lamela](/en/blog/authors/pablo-lamela-seijas/page-1/) ![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.003.png) 7 phút đọc

![Pablo Lamela](img/2022-03-04-diving-deeper-into-the-marlowe-playground.004.png)[](/en/blog/authors/pablo-lamela-seijas/page-1/)

### [**Pablo Lamela**](/en/blog/authors/pablo-lamela-seijas/page-1/)

Nhà nghiên cứu

Nghiên cứu

- ![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.005.png)[](mailto:pablo.lameja-seijas@iohk.io "E-mail")
- ![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.006.png)[](https://www.linkedin.com/in/palas87/ "LinkedIn")
- ![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.007.png)[](https://github.com/palas "GitHub")

![Tìm hiểu sâu hơn về Sân chơi Marlowe](img/2022-03-04-diving-deeper-into-the-marlowe-playground.008.jpeg)

Marlowe là một ngôn ngữ miền chuyên biệt (DSL) được nhúng trong Haskell, cung cấp các hợp đồng tài chính cho blockchain mà mọi người đều có thể viết mã. Nó là một nền tảng cho tài chính phi tập trung (DeFi) hỗ trợ cho vay trực tiếp, ngang hàng, hợp đồng giao dịch phái sinh (CFD) và các công cụ tương tự khác. Marlowe cho phép người dùng áp dụng kiến thức chuyên môn riêng của họ để viết và quản lý các hợp đồng một cách thuận tiện mà không cần quá trình học tập phức tạp liên quan đến phát triển phần mềm, blockchain hoặc hợp đồng thông minh.

[Sân chơi Marlowe](https://play.marlowe-finance.io/#/) là môi trường ảo, nơi bạn có thể thực hành viết các hợp đồng tài chính của mình. Sân chơi này cung cấp cho bạn lựa chọn làm việc trực tiếp bằng nhiều ngôn ngữ như viết trực tiếp bằng Marlowe, [JavaScript](https://play.marlowe-finance.io/doc/marlowe/tutorials/javascript-embedding.html), [Haskell](https://play.marlowe-finance.io/doc/marlowe/tutorials/embedded-marlowe.html) hoặc [Blockly](https://play.marlowe-finance.io/doc/marlowe/tutorials/playground-blockly.html), tùy thuộc vào ngôn ngữ bạn muốn sử dụng. Gần đây, chúng tôi đã thêm các tính năng mới vào Sân chơi Marlowe để xây dựng và chỉnh sửa các mẫu và tùy chỉnh siêu dữ liệu, cũng như tùy chọn tải xuống kiểu dữ liệu mới JSON cho chính các hợp đồng. Trong bài viết này, chúng ta sẽ xem xét kỹ hơn các tính năng mới này.

### **Tạo mẫu hợp đồng**

Với sự ra đời của Marlowe Run, chúng tôi đã mở rộng Sân chơi Marlowe để hỗ trợ những gì chúng tôi gọi là *mẫu* . Các *mẫu* này được triển khai bằng phiên bản mở rộng của Marlowe (được gọi là Extended Marlowe, phiên bản có sẵn trong Sân chơi Marlowe). Những mẫu mới này giúp người dùng có thể dễ dàng sử dụng lại các hợp đồng cho các tình huống và bối cảnh khác nhau.

Marlowe mở rộng cung cấp tính linh hoạt cao hơn Marlowe đơn thuần (hoặc Core Marlowe). Các hợp đồng rất cụ thể được mặc định thời gian timeouts (thời gian chờ) theo giá trị tuyệt đối, ban đầu thông qua slot numbers (số lượng khung giờ) và gần đây hơn là sử dụng timestamps (dấu thời gian) chuẩn (thời gian POSIX).

Ngoài ra, các giá trị trong Marlowe thường là kiểu giá trị không đổi, ngoại trừ những giá trị đầu vào. Ví dụ: bạn có thể thực hiện một khoản vay với số tiền ₳100 hoặc một khoản vay yêu cầu người dùng cho vay lựa chọn khi xây dựng, nhưng chúng ta không có hợp đồng Marlowe được tái sử dụng để triển khai với bất kỳ thời gian và tham số nào. Marlowe phiên bản mở rộng giải quyết những hạn chế này bằng cách thêm tùy chọn cho các tham số hợp đồng. Hiện tại, Marlowe mở rộng thực tế giống với Marlowe thuần túy ngoại trừ việc nó có hai hàm số của *mẫu* đại diện cho *các tham số*  :

- SlotParam - có thể được viết thay cho timeout (thời gian chờ) khi xây dựng
- ConstantParam - là kiểu cấu trúc "Value"

Cả hai hàm này đều lấy làm tham số duy nhất, một string (chuỗi) đóng vai trò là mã định danh cho tham số, ví dụ:

- SlotParam "Thời hạn thanh toán"
- ConstantParam "Giá"

Hai tham số cùng kiểu (SlotParam hoặc ConstantParam) và có cùng số định dạng được coi là cùng một tham số, ngay cả khi chúng xuất hiện ở những nơi khác nhau.

Nếu hợp đồng chứa các tham số (hay được hiểu, nếu đó là một *mẫu* ), thì người dùng sẽ được yêu cầu nhập giá trị cho các tham số đó trước khi bắt đầu mô phỏng hợp đồng hoặc trước khi triển khai hợp đồng trong Marlowe Run:

![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.009.png)

Hình 1. Hộp thoại mô phỏng

Lưu ý rằng đầu vào các tham số giá trị mẫu trong hình không chỉ là một trường nhập số nguyên. Thay vào đó, nó có thể là số thập phân và nó có nhãn với biểu tượng tiền tệ cho biết rằng số được nhập đại diện cho một lượng ada. Quy tắc này cũng đúng đối với các giá trị được yêu cầu lựa chọn khi xây dựng. Ngoài ra, các lựa chọn không cần phải đại diện cho số lượng ada. Chúng có thể đại diện cho bất kỳ thứ gì, chẳng hạn như một tỷ lệ, như sau:

![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.010.png)

Hình 2. Hộp thoại thao tác

Ngoài ra còn có các gợi ý cho từng tham số mà người dùng có thể hiển thị bằng cách nhấp vào dấu hỏi màu tím bên cạnh mỗi thuật ngữ. Văn bản trong gợi ý dành riêng cho mẫu hợp đồng và nó chứa nội dung được định dạng, ví dụ: **nội dung in đậm** , *nội dung in nghiêng* hoặc nội dung gạch chân.

![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.011.png)

Hình 3. Gợi ý tham số

Các hợp đồng do người dùng xác định có thể tùy chỉnh tất cả các chi tiết này thông qua việc sử dụng *siêu dữ liệu* . Hãy xem cách này được thực hiện như thế nào.

## **Tùy chỉnh siêu dữ liệu**

Có một tab *Siêu dữ liệu* ở cuối mỗi trình chỉnh sửa trong Sân chơi Marlowe. Tại đó, người dùng có thể tùy chỉnh siêu dữ liệu khi cần thiết. Ví dụ:

![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.012.png)

Hình 4. Tab Metadata

Có một số siêu dữ liệu cơ bản mà mọi hợp đồng dự kiến sẽ có, chẳng hạn như:

- **Contract type** - Đó là loại hợp đồng nào? Danh mục này sẽ giúp phân loại các hợp đồng để chúng dễ dàng tìm kiếm hơn trong tương lai. Hiện tại, có rất ít danh mục có sẵn, nhưng chúng tôi sẽ bổ sung thêm trong tương lai. Nếu không có danh mục nào phù hợp với hợp đồng của bạn, bạn luôn có thể chọn "Khác".
- **Contract name** - Chỉ là một cái tên ngắn gọn để xác định hợp đồng.
- **Contract short description** - Một mô tả rất ngắn gọn để hiển thị trong danh sách.
- **Contract long description** - Mô tả chi tiết hơn sẽ được hiển thị sau mô tả ngắn gọn trong trường hợp người dùng đã chọn mẫu và muốn biết thêm (ví dụ: khi tạo hợp đồng trong Marlowe Run).

Lưu ý rằng văn bản trong mô tả hỗ trợ sử dụng một số chức năng định dạng có trong Markdown. Ví dụ: thêm hai dấu hoa thị vào trước và sau một phần của văn bản mô tả sẽ làm cho văn bản đó được in đậm khi mô phỏng hợp đồng, như chúng ta đã thấy trong phần trước. Theo cách này, văn bản thuần túy:

Số tiền ** tiền ** phải trả

sẽ được hiển thị dưới dạng

Số **tiền** phải trả

Chúng tôi khuyên bạn nên sử dụng chức năng này để làm nổi bật những từ khóa nào đại diện cho các thực thể có ý nghĩa đặc biệt trong ngữ cảnh của hợp đồng, chẳng hạn như tên của các roles hoặc choices.

Tab metadata cũng hỗ trợ chỉ định gợi ý cho các roles, choices, slot và các tham số giá trị được xác định trong hợp đồng, cũng như định dạng cho các lựa chọn và tham số giá trị.

Thông số role hoặc choice, slot hoặc giá trị mới được thêm vào hợp đồng sẽ xuất hiện trong tab metadata với màu đỏ. Trong trường hợp của trình chỉnh sửa Haskell và JavaScript, có thể cần phải biên dịch mã thành công trước khi điều này xảy ra.

![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.013.png)

Hình 5. Tab Metadata - thêm các mục siêu dữ liệu

Nhấn nút “+” màu đỏ sẽ tạo mục nhập siêu dữ liệu mới cho mục đã cho. Theo cách tương tự, nếu role, choice, hoặc slot hoặc tham số value ngừng được sử dụng trong hợp đồng, siêu dữ liệu hiện có sẽ được gắn cờ màu đỏ để xóa và người dùng phải nhấn nút “-” để xóa mục siêu dữ liệu khỏi hợp đồng.

![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.014.png)

Hình 6. Tab Metadata - xóa các mục siêu dữ liệu

Ngoài mô tả, trong các trường hợp tham số choices và value, người dùng có thể lựa chọn định dạng cho số mà họ muốn người dùng cuối cung cấp. Để làm điều đó, hãy chọn "Fixed point amount" từ menu thả xuống. Điều này sẽ cung cấp hai trường bổ sung:

- **Số chữ số thập phân cho giá trị** (dưới cùng bên trái) - các số trong Marlowe bên trong luôn là số nguyên, nhưng để thuận tiện, người dùng có thể nhập số chữ số sau dấu chấm được cố định. Ví dụ: lượng ada của Marlowe được biểu thị bằng lovelace (một phần triệu ada) nhưng nói chung, người dùng cuối thích làm việc với lượng ada hơn (vì chúng dễ đọc hơn). Các nhà phát triển có thể hỗ trợ điều này bằng cách viết 6 số chữ số thập phân. Do đó, người dùng cuối sẽ thấy dấu phân tách thập phân ở vị trí thứ 6, mặc dù nội bộ hợp đồng vẫn hoạt động với lovelace (đơn vị ada).
- **Nhãn tiền tệ cho giá trị** (dưới cùng bên phải) - các nhà phát triển cũng có thể hiển thị biểu tượng tiền tệ gần hộp nhập giá trị như một gợi ý cho người dùng cuối về đơn vị số tiền mà chúng tôi mong đợi từ họ. Ví dụ: trong trường hợp của ada, chỉ cần viết ký hiệu ada là “₳”.

![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.015.png)

Hình 7. Định dạng số

Cuối cùng, thứ tự của các tham số là quan trọng. Ví dụ: hãy tưởng tượng một số thông số slot để người dùng cuối chọn. Sẽ là hợp lý nếu hiển thị các thông số đó theo thứ tự thời gian.

Để sắp xếp siêu dữ liệu, hãy kéo các mục nhập theo thứ tự mong muốn, ví dụ:

![](img/2022-03-04-diving-deeper-into-the-marlowe-playground.016.png)

Hình 8. Thứ tự Metadata

Thứ tự của các tham số trong metadata sẽ được sử dụng để tạo biểu mẫu được hiển thị ở phần đầu của mô phỏng hoặc thực hiện hợp đồng.

# **Kết luận**

Với mẫu mới và tiện ích mở rộng siêu dữ liệu cho Marlowe, các nhà phát triển hợp đồng giờ đây có thể cung cấp các gợi ý và thông số để giúp người dùng cuối sử dụng lại hợp đồng đó dễ dàng hơn trong một số trường hợp mà không cần phải hiểu cách triển khai đầy đủ và chi tiết của hợp đồng.

Đây chỉ là một số cải tiến mới mà nhóm Marlowe tiếp tục thực hiện và chúng tôi mong sớm được chia sẻ thông tin chi tiết về các cải tiến khác.

*Để tìm hiểu thêm về các bản phát hành Marlowe sắp tới và các tính năng mới, hãy theo dõi các kênh truyền thông xã hội của chúng tôi hoặc kênh [Marlowe Discord mới](https://discord.com/channels/826816523368005654/936295815926927390/936316494042779698) để biết thêm thông tin. Ngoài ra, hãy theo dõi để biết thông tin chi tiết về chương trình Người tiên phong Marlowe đầu tiên của chúng tôi sẽ sớm ra mắt!*

Bài này được dịch bởi LinhPool [với bài gốc](https://iohk.io/en/blog/posts/2022/03/04/diving-deeper-into-the-marlowe-playground/)

*Dự án này được tài trợ bởi Catalyst*
