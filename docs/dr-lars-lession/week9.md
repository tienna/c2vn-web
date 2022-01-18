Week 09 - Marlowe
=================

Lưu ý

Đây là phiên bản viết của [Bài giảng số 9 Dr.Lars](https://youtu.be/J5as459k10E).

Trong bài giảng này, chúng tôi đề cập đến Marlowe - một ngôn ngữ dành riêng cho các hợp đồng tài chính trên Cardano.

Tổng quát
--------

Trong các bài giảng trước, chúng ta đã học về tất cả các thành phần quan trọng để viết một ứng dụng Plutus.

Đầu tiên chúng ta đã xem xét mô hình UTxO mở rộng - mô hình kế toán mà Cardano sử dụng - và những bổ sung mà Plutus mang lại cho nó.

Sau đó, chúng tôi đã nói về xác thực trên chuỗi, các chính sách đúc tiền, viết mã ngoài chuỗi, chúng tôi đã xem cách triển khai các hợp đồng thông minh và cả cách kiểm tra chúng.

Plutus là một ngôn ngữ rất mạnh mẽ. Trên thực tế, mạnh mẽ đến mức bạn có thể triển khai các ngôn ngữ khác bên trên nó - bạn có thể viết thông dịch viên bằng Plutus cho các ngôn ngữ khác.

Một trong những ngôn ngữ như vậy là Marlowe. Marlowe là Ngôn ngữ dành riêng cho miền (DSL) dành cho các hợp đồng thông minh.

Đối với bài giảng này, Giáo sư Simon Thompson, một nhân vật rất nổi bật trong cộng đồng Haskell, người lãnh đạo nhóm Marlowe, và đồng nghiệp của ông Alex Nemish sẽ thuyết trình với khách mời để cho chúng ta biết một chút về Marlowe.

Sau đó, chúng ta sẽ xem xét [sân chơi Marlowe](https://play.marlowe-finance.io/) và chơi với một hợp đồng thông minh đơn giản.

Bài giảng của GS Simon Thompson
-------------------------------

Marlowe là một ngôn ngữ chuyên dùng để viết các hợp đồng tài chính trên Cardano.

![](img/pic__00005.png)

### Tại sao chúng tôi xây dựng DSL?

Một lý do là chúng tôi muốn xây dựng các ngôn ngữ gần gũi hơn với ngôn ngữ của người dùng chứ không phải ngôn ngữ của hệ thống quá nhiều. Chúng được thiết kế để nằm trong miền cụ thể của ứng dụng. Ví dụ, một ngôn ngữ tài chính sẽ nói về các khoản thanh toán.

Khi chúng tôi viết một DSL, chúng tôi nhận được một số lợi thế. Chúng ta có thể viết ra mọi thứ trong lĩnh vực đó, nhưng có lẽ chúng ta không thể viết nhiều nhất có thể bằng một ngôn ngữ dành cho mục đích chung. Và, nếu chúng tôi làm việc trong bối cảnh chuyên biệt hơn này, chúng tôi có lợi thế là có thể cung cấp cho mọi người phản hồi tốt hơn và thông báo lỗi tốt hơn. Chúng tôi cũng có thể đưa ra nhiều đảm bảo hơn về hành vi của chương trình. Đó là một trong những điều sẽ được nhấn mạnh trong bài giảng này.

![](img/pic__00006.png)

### Chúng ta có thể đưa ra loại đảm bảo nào?

Chúng tôi có thể đưa ra hai loại đảm bảo. Chúng tôi có thể đảm bảo rằng các hợp đồng làm những gì họ phải làm, nhưng chúng tôi cũng có thể đảm bảo rằng họ không làm những gì họ không nên làm. Chúng ta sẽ thấy cả hai khía cạnh của điều đó khi chúng ta tiếp tục.

Chúng tôi đã thiết kế ngôn ngữ trở nên đơn giản nhất có thể và việc triển khai phản ánh điều đó và chúng ta sẽ nói một chút về điều đó sau. Hợp đồng rất hay và dễ đọc, đồng thời chúng tôi cũng có thể dễ dàng mô phỏng chúng, vì vậy chúng tôi có thể trình bày cho người dùng một bức tranh rất rõ ràng về cách hợp đồng của họ trong Marlowe sẽ hoạt động.

Trên thực tế, chúng ta có thể làm được nhiều hơn thế. Bởi vì chúng đặc biệt bị hạn chế, chúng tôi có thể khám phá mọi hành vi có thể có mà một hợp đồng có thể thực hiện, trước khi nó được thực thi. Vì vậy, chúng tôi có thể đưa ra những đảm bảo đầy đủ về cách một hợp đồng sẽ hoạt động như thế nào, không chỉ trong một hoặc hai lần kiểm tra, mà còn trên mọi trình tự thực hiện có thể.

Cũng dễ hiểu hơn khi viết các bằng chứng toán học về nhiều loại an toàn khác nhau, vì vậy đó là tiêu chí mạnh nhất mà chúng ta có thể đạt được trong thế giới này; một bằng chứng toán học rằng hệ thống sẽ làm những điều nhất định và sẽ không làm những điều khác.

### Hợp đồng tài chính làm gì?

Hãy bắt đầu bằng cách xem xét những gì một hợp đồng tài chính có thể làm.

Hợp đồng có thể chấp nhận thanh toán từ những người tham gia hợp đồng.

Tùy thuộc vào sự lựa chọn của một trong những người tham gia, nó có thể phát triển theo các hướng khác nhau.

![](img/pic__00011.png)

Nó có thể đưa ra quyết định dựa trên thông tin bên ngoài, chẳng hạn như thông tin đến từ một sàn giao dịch chứng khoán. Vì vậy, thông tin đến từ một nhà tiên tri có thể xác định hành vi trong tương lai của một hợp đồng.

Một hợp đồng cũng có thể thực hiện thanh toán. Nếu tiền đã được ký gửi trong hợp đồng, số tiền đó có thể được chuyển cho người tham gia.

Vì vậy, chúng ta có các dòng tiền và sự lựa chọn theo các yếu tố bên ngoài.

Một điều cuối cùng mà chúng tôi có là các vai trò trong hợp đồng là những thứ mà bản thân họ có thể sở hữu. Chúng tôi thể hiện điều đó ở Marlowe bằng cách đúc các mã thông báo đại diện cho các vai trò đó. Điều đó có nghĩa là chúng ta có thể sử dụng những mã thông báo đó làm bằng chứng cho thấy ai đó có ý định đóng một vai trò nào đó. Chúng là một hình thức bảo mật mà một người gửi giao dịch được phép gửi giao dịch đó, nhưng cũng có nghĩa là những vai trò này có thể giao dịch được. Một vai trò có thể được giao dịch bởi một người khác hoặc một hợp đồng khác.

### Thiết kế ngôn ngữ

Bây giờ chúng ta hãy nghĩ về cách thiết kế một ngôn ngữ dựa trên những thành phần này.

![](img/pic__00012.png)

Khi chúng tôi thiết kế một ngôn ngữ hợp đồng, những gì chúng tôi thực sự đang làm là thiết kế một ngôn ngữ lập trình. Hợp đồng thông minh chỉ là một chương trình chạy trên một chuỗi khối.

Về nguyên tắc, một hợp đồng có thể chạy mãi mãi. Và, tinh tế hơn, nó có thể bị mắc kẹt khi chờ đợi một đầu vào mãi mãi.

Nó có thể chấm dứt trong khi giữ tài sản, khóa chúng mãi mãi.

Vì vậy, có rất nhiều vấn đề bảo mật mà một chương trình có thể mắc phải.

#### Được thiết kế để an toàn

Những gì chúng tôi chọn làm là thiết kế để đảm bảo an toàn.

##### Hợp đồng là hữu hạn

Thứ nhất, hợp đồng được thiết kế để có thời hạn. Cuộc sống của họ sẽ là hữu hạn, không có đệ quy hay vòng lặp trong Marlowe. Chúng ta sẽ quay lại vấn đề đó một chút sau khi chúng ta nói về việc Marlowe được nhúng vào các ngôn ngữ khác.

##### Hợp đồng sẽ chấm dứt

We can be sure that contracts will terminate. We do that by putting
timeouts on every external action. Every choice, every deposit of money
into the contract comes with a deadline. Marlowe contracts cannot wait
forever for somebody to make a choice or for an action to happen. If you
hit the timeout then an alternative course is taken.

##### Không có nội dung nào được giữ lại khi đóng

Chúng tôi đã thiết kế ngữ nghĩa của ngôn ngữ để khi hợp đồng kết thúc, vào cuối thời hạn của nó, mọi khoản tiền còn lại trong hợp đồng sẽ được hoàn trả cho người tham gia.

##### Bảo tồn giá trị

Bảo toàn giá trị là thứ mà chúng tôi nhận được miễn phí từ chuỗi khối cơ bản. Blockchain đảm bảo rằng chúng ta không thể chi tiêu gấp đôi và bởi vì chúng ta đang sử dụng các cơ chế giao dịch của blockchain cơ bản, chúng ta có thể chắc chắn rằng chúng ta đang bảo toàn giá trị.

Vì vậy, điều này mang lại cho chúng tôi rất nhiều đảm bảo. Đây không phải là sự đảm bảo rằng bạn nhận được từ các hợp đồng Plutus nói chung. Một hợp đồng Plutus có thể tồn tại mãi mãi, nó không cần phải chấm dứt và nó có thể chấm dứt trong khi nắm giữ toàn bộ bộ sưu tập tài sản mà sau đó không thể truy cập được.

### Ngôn ngữ Marlowe

Vậy ngôn ngữ trông như thế nào? Hãy bắt đầu cuộc rượt đuổi.

![](img/pic__00013.png)

Về cơ bản, Marlowe được biểu thị như một kiểu dữ liệu Haskell.

``` {.haskell}
data Contract = Close
| Pay Party Payee Value Contract
| If Observation Contract Contract
| When [Case Action Contract] Timeout Contract
| Let ValueId Value Contract
| Assert Observation Contract
deriving (Eq,Ord,Show,Read,Generic,Pretty)
```

Chúng tôi có một cấu trúc `Pay`. Trong đó `Party` là một trong hợp đồng thực hiện một khoản thanh toán cho `Payee` với gí trị cụ thể `Value`, và sau đó hợp đồng tiếp tục với cái mà chúng tôi gọi là hợp đồng tiếp tục.

``` {.haskell}
Pay Party Payee Value Contract
```

Chúng ta có thể đi theo hai hướng riêng biệt. Chúng ta có thể quan sát `If` nếu một điều cụ thể `Observation` là đúng hay không. Nếu quan sát đúng, chúng tôi theo dõi điều đầu tiên `Contract`, nếu sai chúng tôi theo dõi điều thứ hai `Contract`.

``` {.haskell}
If Observation Contract Contract
```

Cấu trúc phức tạp nhất trong Marlowe là cấu trúc `When` . Nó cần ba đối số. Đầu tiên trong số đó là danh sách các cặp `Contract/ Action` - danh sách các `Case`.

``` {.haskell}
When [Case Action Contract] Timeout Contract
```

Những gì cấu trúc `When` làm là đợi một trong số các `Actions`. Khi một trong những điều hành động `Action` xảy ra, nó sẽ thực hiện tương ứng `Contract`. Ví dụ, nó có thể đang đợi một khoản tiền gửi. Nếu chúng ta gặp trường hợp phần đầu tiên của cặp là tiền gửi, thì chúng ta thực hiện phần thứ hai tương ứng của cặp. Tương tự với việc lựa chọn hoặc nhận giá trị từ một một oracle.

Here we are waiting for external actions and, of course, the contract
can\'t make those actions happen. A contract can\'t force somebody to
make a choice. It can\'t force somebody to make a deposit. But what we
can do is say that if none of these actions takes place then we will hit
the `Timeout`, and when we hit the `Timeout`, we will perform the
`Contract` represented by the final argument to the `When` construct.
Ở đây chúng tôi đang chờ đợi các hành động bên ngoài và tất nhiên, hợp đồng không thể làm cho những hành động đó xảy ra. Một hợp đồng không thể buộc ai đó phải lựa chọn. Nó không thể buộc ai đó đặt cọc. Nhưng những gì chúng ta có thể làm là nói rằng nếu không có hành động nào trong số này xảy ra thì chúng ta sẽ nhấn `Timeout` và khi nhấn vào `Timeout`, chúng ta sẽ thực hiện `Contract` đại diện bởi đối số cuối cùng cho cấu trúc `When` .


Vì vậy, chúng tôi có thể đảm bảo rằng điều gì đó sẽ xảy ra trong cấu trúc `When`, bằng một trong các hành động kích hoạt hợp đồng liên tiếp hoặc chúng tôi đạt thời gian chờ và đi đến phần tiếp tục đó.

Cuối cùng, chúng ta có một cấu trúc `Close` có ngữ nghĩa được xác định để không có gì được giữ lại khi chúng ta đóng.

Đó là ngôn ngữ Marlowe, và chúng ta sẽ thấy rằng chúng ta có thể sử dụng những ngôn ngữ này để xây dựng các hợp đồng Marlowe theo nhiều cách khác nhau.

### Sản phẩm Marlowe

Vì vậy, đó là ngôn ngữ. Bản thân sản phẩm Marlowe là gì?

Chúng tôi có một bộ nhiều thứ. Đầu tiên, chúng tôi sẽ xem xét tầm nhìn tổng thể của Marlowe và sau đó xem xét vị trí của chúng tôi trong việc thực hiện tầm nhìn đó.

![](img/pic__00020.png)

Chúng tôi có một nguyên mẫu cho Marlowe Run. Đó là hệ thống mà thông qua đó người dùng cuối sẽ tương tác với các hợp đồng chạy trên chuỗi khối Cardano. Bạn có thể coi Marlowe Run là dApp Marlowe. Đó là những thứ cho phép các hợp đồng của Marlowe được thực hiện.

Chúng tôi cũng đang xây dựng một thị trường nơi các hợp đồng có thể được tải lên, tải xuống và nơi chúng tôi có thể cung cấp các loại đảm bảo khác nhau về các hợp đồng đó.

Chúng tôi cho phép các hợp đồng được mô phỏng một cách tương tác và chúng tôi gọi đó là Marlowe Play. Chúng tôi cho phép các hợp đồng được xây dựng theo nhiều cách khác nhau và chúng tôi gọi đó là Xây dựng Marlowe. Trên thực tế, những gì chúng tôi đã làm vào lúc này là gộp hai thứ đó - Marlowe Play và Build - vào cái mà chúng tôi gọi là Marlowe Playground.

Vì vậy, khi mọi thứ vẫn ổn ở thời điểm hiện tại, bạn có thể sử dụng Marlowe Playground để mô phỏng và xây dựng các hợp đồng của Marlowe, chúng tôi đang trong quá trình thiết kế lại trải nghiệm người dùng dựa trên những gì chúng tôi đã làm với Marlowe Run.

Những gì chúng tôi phát hành rất sớm là nguyên mẫu của Marlowe Run và đây là nguyên mẫu về cách người dùng cuối sẽ tương tác với Marlowe trên blockchain. Ý định của chúng tôi là chúng tôi sẽ cung cấp tất cả các sản phẩm này chạy trên chuỗi khối Cardano khi chúng tôi có hỗ trợ đầy đủ cho việc này, điều này sẽ liên quan đến việc có Phần phụ trợ ứng dụng Plutus và kết thúc ví và cứ thế hoạt động như bình thường.

### Trình diễn

Bây giờ chúng tôi sẽ xem xét bản demo về những gì chúng tôi có trong Marlowe chạy để cho bạn biết những gì chúng tôi có thể làm vào lúc này nhằm mang lại cho người dùng trải nghiệm mà họ sẽ có khi Marlowe chạy trên blockchain. Đây sẽ là ứng dụng sẽ cung cấp trải nghiệm đó.

Hiện tại, nó đang chạy cục bộ nhưng trong vài tuần nữa, chúng tôi sẽ phát hành một phiên bản chạy theo kiểu phân tán trên blockchain mô phỏng. Sau đó, khi bước vào cuối năm, chúng tôi mong đợi nó sẽ hoạt động thực tế trên chính chuỗi khối Cardano.

Bạn có thể tìm thấy Sân chơi Marlowe tại

``` {.}
https://staging.marlowe-dash.iohkdev.io/
```

![](img/pic__00023.png)

Marlowe chạy trong trình duyệt và những gì nó làm là cung cấp sự tương tác của người dùng cuối với các hợp đồng chạy trên blockchain.

Hiện tại, chúng tôi đang mô phỏng blockchain đó bên trong trình duyệt nhưng cuối cùng đây sẽ là công cụ bạn sẽ sử dụng để chạy các hợp đồng thực trên Cardano.

Để tương tác với hợp đồng, ví của bạn cần phải tham gia để kiểm soát chữ ký của bạn và kiểm soát tài sản của bạn, vì vậy chúng tôi liên kết Marlowe để chạy với một ví. Hãy liên kết nó với ví của Shruti. Bạn có thể thực hiện việc này bằng cách tạo một ví demo hoặc bằng cách chọn một ví hiện có.

To interact with the contract your wallet needs to be involved to
control your your signature and to control your assets, so we link up
Marlowe to run with a wallet. Let\'s link it up with Shruti\'s wallet.
You can do this by creating a demo wallet, or by selecting an existing
wallet.

![](img/pic__00024.png)

Trong cửa sổ này, chúng ta nhìn thế giới từ góc nhìn của Shruti. Hãy mở một cửa sổ khác và liên kết cửa sổ đó với thế giới từ góc nhìn của Charles.

![](img/pic__00028.png)

At the moment neither of them has any contracts running. They have a
blank space, but let\'s start a contract up. Let\'s set up a zero coupon
bond which is a fancy name for a loan. You can do this by clicking
`Create` and selecting the `Zero Coupon Bond` option.
Hiện tại, cả hai đều không có hợp đồng nào đang hoạt động. Họ có một khoảng trống, nhưng chúng ta hãy bắt đầu một hợp đồng. Hãy thiết lập một trái phiếu không phiếu giảm giá, một cái tên ưa thích cho một khoản vay. Bạn có thể thực hiện việc này bằng cách nhấp `Create`và chọn tùy chọn `Zero Coupon Bond` .

Giả sử Shruti đang cho Charles vay. Cô ấy là nhà đầu tư, anh ấy là người phát hành trái phiếu.

![](img/pic__00034.png)

Charles muốn mượn một Ada từ Shruti và anh ấy hứa sẽ trả lại 1,1 Ada. Vì vậy, chúng tôi đã nói nhà phát hành và nhà đầu tư là ai, chúng tôi đã nói giá và giá trị cuối cùng sẽ như thế nào và bây giờ chúng tôi sẽ tạo hợp đồng. Để làm được điều đó, chúng tôi phải thanh toán 30 lovelace để bắt đầu hợp đồng.

![](img/pic__00035.png)

Vì vậy, chúng ta hãy trả tiền. Chúng tôi được yêu cầu phê duyệt và việc thanh toán được thực hiện. Bạn có thể thấy bây giờ trong Marlowe Run của Shruti, chúng ta đã có Zero Coupon Bond đang chạy, ngoài ra, nếu bạn nhìn vào quan điểm của Charles về thế giới, nó cũng đang chạy ở đó đối với anh ấy.

![](img/pic__00037.png)

Chúng tôi đang ở bước đầu tiên. Nếu chúng ta nhấp vào hợp đồng của Charles, điều đó nói rằng nó đang chờ đợi điều gì đó từ nhà đầu tư, Shruti.

![](img/pic__00038.png)

Vì vậy, hãy xem những gì đang xảy ra trong quan điểm của cô ấy.

![](img/pic__00039.png)

Cô ấy đang được yêu cầu gửi tiền vì vậy hãy nhấp vào đó để thực hiện gửi tiền.

![](img/pic__00040.png)

Và nhấp để xác nhận với mức phí là 10 lovelace.

Sau đó, bạn có thể thấy chế độ xem của cô ấy đã thay đổi và cô ấy đang chờ nhà phát hành hoàn trả tiền cho mình.

Chúng tôi xem xét chế độ xem của Charles, tình cờ là chế độ xem di động, của Marlowe Run và anh ấy được yêu cầu trả 1 Ada của mình.

![](img/pic__00041.png)

Hãy bắt anh ta làm điều đó ngay bây giờ. Anh ta cũng sẽ phải trả một khoản phí giao dịch đáng yêu 10.

![](img/pic__00043.png)

Hãy đặt cọc đó.

![](img/pic__00045.png)


Và bây giờ bạn thấy từ cả hai khía cạnh của họ rằng khoản vay đã hoàn thành, bạn có thể thấy lịch sử của những gì đã xảy ra. Bạn có thể thấy, tại các điểm cụ thể, số dư mà hợp đồng nắm giữ.

Nếu chúng tôi đóng và chọn `History`, chúng tôi có thể xem lịch sử của tất cả các hợp đồng mà Shruti đã tham gia.

![](img/pic__00046.png)

Điều đó bao gồm khá nhiều điều cơ bản về những gì bạn nhận được từ Marlowe Run. Đó là một giao diện trực quan cho một hợp đồng chạy trên blockchain. Bạn thấy rằng mỗi người tham gia hợp đồng có được chế độ xem của họ về hợp đồng trong thời gian thực, được cập nhật từ những gì, trong trường hợp này là trong trình duyệt, nhưng cuối cùng là những gì trên blockchain.

### Kỹ thuật

Bây giờ chúng ta hãy xem xét kỹ lưỡng và xem Marlowe sẽ bị hành quyết như thế nào trên Cardano.

Đây là một sơ đồ chỉ để cung cấp cho bạn bối cảnh. Bạn sẽ hiểu hầu hết các phần của sơ đồ này rồi. Chúng tôi là một nút gốc của Cardano mà Plutus đang chạy trên đó, và như bạn biết, Plutus là một phương ngữ của haskell, ít hay nhiều.

![](img/pic__00042.png)

Marlowe được nhúng vào Haskell và Marlowe được thực thi bằng Plutus. Vì vậy, Marlowe nằm trên Plutus, nhưng nó cũng được liên kết với Marlowe Run và có tệp đính kèm với ví mà bạn có thể tương tác với tư cách là người dùng cuối với hợp đồng Marlowe đang chạy.

Ngoài ra, nó được liên kết với Oracles và cứ thế ngồi ngoài đó trong thế giới thực.

Bây giờ, nó có nghĩa là gì để thực hiện một hợp đồng Marlowe?

![](img/pic__00044.png)

Một lần nữa điều này sẽ quen thuộc với bạn từ Plutus nhưng chúng ta hãy chỉ nói qua chính xác cách thức hoạt động của nó.

Việc thực thi hợp đồng Marlowe sẽ tạo ra một loạt các giao dịch trên blockchain. Rõ ràng là Plutus chạy trên Cardano sẽ kiểm tra tính hợp lệ của các giao dịch. Chúng tôi có một chức năng xác nhận.

Chức năng xác thực cho các giao dịch Marlowe này về cơ bản là một trình thông dịch Marlowe. Nó kiểm tra xem các giao dịch có thực sự tuân theo các bước của hợp đồng Marlowe hay không. Điều đó được thực hiện bằng cách sử dụng mô hình (E) UTxO, vì vậy chúng tôi chuyển trạng thái hiện tại của hợp đồng và một số thông tin khác qua dưới dạng dữ liệu.

Trình thông dịch Marlowe sử dụng điều đó để đảm bảo rằng các giao dịch được gửi đáp ứng các tiêu chí cho hợp đồng Marlowe cụ thể.

Vì vậy, đó là một phần trên dây chuyền.

![](img/pic__00047.png)

Rõ ràng là ngoài chuỗi cũng có một thành phần. Vì vậy, chúng tôi phải có Marlowe Run và chúng tôi sẽ phải xây dựng các giao dịch đáp ứng bước xác thực trên chuỗi.

Và, nếu và khi hợp đồng yêu cầu tài sản tiền điện tử, hợp đồng đó sẽ có mã chuỗi để đảm bảo rằng các giao dịch được ký kết một cách thích hợp để chúng tôi có quyền chi tiêu tài sản tiền điện tử.

Sử dụng Marlowe run và một ví được liên kết, chúng tôi xây dựng các giao dịch.

Chúng tôi nhận được một luồng thông tin theo cả hai hướng. Marlowe run sẽ gửi các giao dịch đến blockchain mà sau đó có thể được xác thực bởi trình thông dịch Marlowe, bản thân nó là một hợp đồng Plutus. Đó là một trong những hợp đồng Plutus lớn nhất còn tồn tại.

Nhưng cũng có luồng thông tin theo cách khác bởi vì giả sử rằng giao dịch tôi đã gửi là một khoản tiền gửi vào một hợp đồng đang chạy và giả sử hợp đồng cũng liên quan đến Charles Hoskinson, vì vậy ví dụ về Marlowe Run của tôi đã gửi giao dịch đó, nhưng Charles cũng có để được thông báo về điều đó.

Thông tin chảy theo hướng khác bằng cách sử dụng hợp đồng đồng hành để đảm bảo rằng mọi phiên bản của Marlowe Run đều được thông báo về hoạt động trong hợp đồng đó.

Alex sẽ nói thêm một số chi tiết về việc triển khai nhưng ở đây bạn sẽ thấy một bản phác thảo về cách tất cả hoạt động của nó.

Các giao dịch được xác thực trên chuỗi thông qua trình thông dịch, nhưng chúng phải được xây dựng ngoài chuỗi và trong một số trường hợp phải được ủy quyền. Về cơ bản, blockchain là điểm đồng bộ hóa trung tâm cho hệ thống phân tán là tập hợp các phiên bản của Marlowe Run đang tương tác để thực hiện hợp đồng /

Bạn đã thấy trong bản demo rằng, trong hai cửa sổ riêng biệt, chúng tôi đang chia sẻ thông tin. Đó là mô phỏng nó cục bộ nhưng trong quá trình sản xuất, đây sẽ là thông tin được lưu trữ trên blockchain.

### Thiết kế hệ thống

Hãy nói một chút về cách hệ thống được thiết kế theo cách cấp cao.

Đây là một phần ngữ nghĩa của Marlowe và như bạn có thể thấy đó là một hàm Haskell.

![](img/pic__00047.png)

Chúng tôi xem xét một môi trường, trạng thái hiện tại và một hợp đồng mà chúng tôi đã thực hiện, và dựa trên hợp đồng đó là gì - closecó lẽ, hoặc là pay, chúng tôi có thể giảm bớt, chúng tôi có thể thực hiện một số bước tính toán kết quả của hợp đồng đó.

Chúng tôi làm điều đó theo cách sử dụng Haskell một cách khá đơn giản để thúc đẩy hợp đồng. Đặc tả này trong Haskell là một đặc tả ngữ nghĩa có thể thực thi được và điều này mang lại cho chúng ta một số hệ quả rất tốt.

![](img/pic__00048.png)

Chúng tôi đã có một mô tả cấp cao về ngữ nghĩa là gì, và chúng tôi đang làm điều đó thông qua một thứ có hiệu quả là một trình thông dịch. Vì vậy, chúng tôi đang xác định ở cấp độ cao thông dịch viên này trong Haskell cho các hợp đồng Marlowe.

Một điều thực sự thú vị khi viết nó theo cách này là chúng ta có thể chắc chắn rằng chúng ta bao gồm tất cả các trường hợp bởi vì nó sẽ hiển nhiên nếu chúng ta thiếu một số trường hợp. Viết nó như một trình thông dịch đảm bảo rằng chúng ta sẽ giải quyết được các trường hợp cần thiết khi mô tả ngữ nghĩa.

Ngoài ra, nó thực sự giúp chúng ta hiểu ngữ nghĩa. Khi bạn thiết kế một ngôn ngữ, bạn có một ý tưởng trừu tượng về ý nghĩa của nó, nhưng không có gì giống như việc triển khai nó để bạn thực sự có thể chạy ngữ nghĩa.

Điều đó có nghĩa là gì nếu chúng ta thêm cấu trúc này? Điều đó có nghĩa là gì nếu chúng ta sửa đổi ngữ nghĩa theo cách này?

Nếu chúng tôi đã viết nó theo một định dạng hoàn toàn thuần túy logic, thì rất khó để sắp xếp lại chỉ từ các quy tắc vì chúng đã đặt ra một cách chính xác, một sự thay đổi trong quy tắc có thể có ý nghĩa như thế nào.

![](img/pic__00049.png)

Điều tuyệt vời hơn nữa là chúng ta có thể sử dụng lại ngữ nghĩa theo một số cách khác nhau.

Trong câu châm ngôn về định lý Isabelle, chúng ta có thể sử dụng ngữ nghĩa để lập luận và chứng minh và chúng ta sử dụng khá nhiều ngữ nghĩa giống nhau vì Isabelle sử dụng một ngôn ngữ chức năng giống như chủ đề của nó.

![](img/pic__00050.png)

Chúng tôi có thể chạy ngữ nghĩa trong Plutus. Plutus ít nhiều là Haskell, có lẽ không phải với tất cả các thư viện, nhưng về nguyên tắc, ít nhất chúng ta có thể xây dựng triển khai trên blockchain từ ngữ nghĩa của chúng ta và chúng ta cũng có thể dịch ngữ nghĩa sang PureScript để mô phỏng trong trình duyệt.

![](img/pic__00051.png)

Bây giờ tập lệnh thuần túy không giống hoàn toàn giống như Haskell. Ngôn ngữ của Isabelle không hoàn toàn giống với Haskell. Làm thế nào chúng tôi có thể chắc chắn rằng tất cả các phiên bản này đều giống nhau?

Một cách thực hiện là trích xuất mã Haskell từ Isabelle và kiểm tra bản gốc đối với mã được trích xuất này. Chúng tôi thực hiện điều đó trên các hợp đồng ngẫu nhiên và điều đó mang lại cho chúng tôi mức độ đảm bảo khá cao rằng cả hai đều giống nhau.

Cuối cùng trong sơ đồ lộ trình của chúng tôi, chúng tôi chắc chắn sẽ sử dụng triển khai Haskell và Javascript vào một thời điểm nào đó để thay thế PureScript trong giao diện người dùng để chúng tôi không phải viết phiên bản PureScript về ngữ nghĩa khi chúng tôi đang thực hiện diễn giải chuỗi xây dựng các giao dịch sẽ được đệ trình. Chúng ta có thể sử dụng triển khai haskell thực bằng cách biên dịch nó thành Javascript và chạy nó trong Marlowe Run trong mã khách hàng.

Vì vậy, việc xây dựng ngôn ngữ trong Haskell có nghĩa là mặc dù chúng ta sử dụng nhiều phiên bản ngữ nghĩa khác nhau, chúng ta có thể có được mức độ đảm bảo cao rằng chúng giống nhau và thực sự trong một số trường hợp chúng ta có thể thay thế những thứ như PureScript bằng Javascript.

### Khả năng sử dụng

Điều đó cho chúng ta một bức tranh về cách hệ thống được kết hợp với nhau. Hãy đi đến một khía cạnh khác của Marlowe. Chúng tôi đã nói về việc nó là một ngôn ngữ có mục đích đặc biệt và việc là một DSL thúc đẩy khả năng sử dụng.

Hãy nói thêm một chút về điều đó.

![](img/pic__00053.png)

Một cách mà chúng tôi đề cao tính khả dụng là chúng tôi cung cấp các cách viết hợp đồng khác nhau. Một cách khác mà chúng tôi thúc đẩy khả năng sử dụng là cho phép mọi người tương tác khám phá cách các hợp đồng hoạt động trước khi chúng thực sự chạy trong mô phỏng.

Vì vậy, chúng ta hãy nói về những người bây giờ.

![](img/pic__00054.png)

Chúng tôi muốn viết một hợp đồng Marlowe, làm thế nào chúng tôi có thể làm điều đó? Chúng ta có thể viết Haskell bằng kiểu dữ liệu Marlowe dưới dạng văn bản. Đó là một cách chúng tôi có thể làm và điều đó tốt. Chúng tôi có một trình chỉnh sửa cho điều đó bên trong sân chơi hỗ trợ hoàn thành mã và sẽ đưa ra đề xuất, v.v.

Vì vậy, chúng tôi có thể xây dựng các hợp đồng như Marlowe thuần túy, nhưng cũng có những lộ trình khác.

Chúng tôi có một trình chỉnh sửa trực quan cho Marlowe để bạn có thể tạo các hợp đồng Marlowe một cách trực quan, ghép các khối lại với nhau theo cách không yêu cầu bạn phải là một lập trình viên tự tin. Bạn có thể bắt đầu bằng cách sử dụng phiên bản trực quan như một cách học cách tương tác với Marlowe nếu bạn là một lập trình viên.

Marlowe được nhúng trong Haskell và trong Javascript nên chúng ta có thể sử dụng các phương tiện như đệ quy để mô tả các hợp đồng Marlowe. Có thể nói, trong Haskell, chúng ta hãy thực hiện mô hình hành vi cụ thể này một số lần nhất định. Chúng tôi có thể viết điều đó bằng Haskell và sau đó đối với một hợp đồng cụ thể, chúng tôi chuyển đổi Haskell thành Marlowe và chúng tôi cũng có thể làm điều đó đối với Javascript.

Cuối cùng, điều mà chúng ta sẽ không nói đến nữa trong cuộc nói chuyện này là chúng ta có thể tạo hợp đồng từ những điều kiện ban đầu. Chúng tôi đã xem xét điều đó cho tiêu chuẩn diễn viên của các hợp đồng tài chính. Trên cơ sở các điều khoản hợp đồng, chúng tôi tạo mã trong Marlowe. Chúng tôi viết các hàm có đầu ra là mã Marlowe.

Chúng tôi cung cấp cho người dùng nhiều cách tiếp cận khác nhau, chẳng hạn như tận dụng kiến ​​thức về Javascript hoặc tận dụng cách tiếp cận không dựa trên mã để mô tả các hợp đồng

Chúng tôi cũng cho phép mọi người mô phỏng hành vi của các hợp đồng. Đây là thứ mà bạn có thể thấy trong phiên bản hiện tại của Sân chơi Marlowe.

![](img/pic__00055.png)

Đó là điều bạn có thể chơi với chính mình. Chúng tôi đang xem xét các cách khác nhau để mô tả kết quả của một mô phỏng. Vì vậy, tại thời điểm này, chúng tôi có một nhật ký giao dịch. Chúng tôi được phép chọn một hành động tiếp theo để thực hiện, bạn có thể hoàn tác bước cuối cùng để đưa bạn quay lại và sau đó thử một con đường khác để bạn có thể tương tác lùi và chuyển tiếp thông qua mã nguồn thông qua ứng dụng của hợp đồng.

Những gì chúng tôi đang xem xét là thay đổi giao diện người dùng Marlowe Playground để chúng tôi sử dụng một cái gì đó giống như mô tả chạy Marlowe Run của một hợp đồng đang chạy.

![](img/pic__00056.png)

### Đảm bảo

Chúng tôi đã nói về khả năng sử dụng. Còn về loại đảm bảo mà Marlowe có thể cung cấp cho người dùng thì sao?

![](img/pic__00057.png)

Chúng tôi đã thấy rằng chúng tôi đã thấy rằng làm cho hệ thống minh bạch, làm cho mã có thể đọc được bản thân nó là một lợi thế. Chúng tôi thấy rằng có mô phỏng để cung cấp cho mọi người xác thực trực giác của họ về một hợp đồng.

Nhưng chính thức hơn, chúng ta có thể sử dụng sức mạnh của logic để làm hai việc cho chúng ta. Chúng tôi có thể thực hiện những gì được gọi là static analysisđể chúng tôi có thể tự động xác minh thuộc tính của các hợp đồng riêng lẻ. Điều đó có nghĩa là chúng tôi có thể đảm bảo hợp đồng này sẽ hoạt động như bình thường, kiểm tra mọi tuyến đường thông qua hợp đồng.

Ngoài ra, chúng tôi có thể làm bằng chứng do máy hỗ trợ, không phải tự động nữa, do người dùng viết, nhưng chúng tôi có thể chứng minh các thuộc tính của hệ thống tổng thể.

#### Phân tích tĩnh

![](img/pic__00058.png)

Những gì phân tích tĩnh cho phép chúng tôi làm là kiểm tra tất cả các đường dẫn thực thi thông qua hợp đồng Marlowe. Tất cả các lựa chọn, tất cả các lựa chọn vị trí để gửi một giao dịch, vì vậy chúng tôi kiểm tra mọi cách có thể để hợp đồng có thể được thực hiện.

Ví dụ chính tắc ở đây là ví dụ về việc liệu cấu trúc trả tiền có thể thất bại hay không. Có thể một cấu trúc trả tiền có thể thất bại? Câu trả lời là chúng tôi sẽ sử dụng cái được gọi là bộ giải SMT Một SMT là một công cụ logic tự động - công cụ chúng tôi sử dụng được gọi là Z3, mặc dù những công cụ khác đều có sẵn. Bộ giải SMT kiểm tra hiệu quả tất cả các phần thực thi.

Nếu một thuộc tính được hài lòng thì không sao, chúng ta sẽ có được kết quả. Nếu nó không hài lòng, chúng tôi nhận được một ví dụ truy cập. Chúng tôi được biết rằng có một cách thông qua hợp đồng này dẫn đến việc thanh toán không thành công - một khoản thanh toán không thể thực hiện được. Vì vậy, nó đưa ra một ví dụ về việc nó có thể xảy ra sai sót như thế nào và điều đó thực sự hữu ích. Điều này có nghĩa là nếu bạn thực sự muốn đảm bảo rằng một khoản thanh toán thất bại không thể xảy ra, thì điều này cung cấp cho bạn một cơ chế để hiểu và gỡ lỗi tình huống đó có thể xảy ra như thế nào và do đó, cho bạn cơ hội để suy nghĩ về cách tránh nó.

Vì vậy, rất mạnh mẽ và hoàn toàn là nút nhấn. Bạn nhấn một nút và bạn sẽ nhận được kết quả.

![](img/pic__00059.png)

Ở đây bạn sẽ thấy một đoạn của hợp đồng Marlowe. Đó là một hợp đồng ký quỹ trong đó hợp đồng bắt đầu với một khoản tiền gửi là 450 người yêu.

Kiểm tra các phân tích trong sân chơi, chúng tôi đã có kết quả. Phân tích tĩnh không thể tìm thấy bất kỳ thực thi nào dẫn đến bất kỳ cảnh báo nào, vì vậy điều đó nói rằng bạn ổn - nó sẽ không đưa ra cảnh báo cho bạn bất cứ điều gì bạn làm.

Nhưng nếu chúng tôi thay đổi khoản tiền gửi 450 lovelace đó thành khoản tiền gửi 40 và phân tích thì chúng tôi sẽ nhận được cảnh báo này.

![](img/pic__00060.png)

Chúng tôi nhận được một khoản thanh toán một phần giao dịch. Chúng tôi được thông báo rằng chúng tôi đến một khoản thanh toán mà chúng tôi định trả 450 đơn vị lovelace nhưng chỉ có 40 đơn vị khả dụng và chúng tôi nhận được danh sách các giao dịch đưa chúng tôi đến đó.

Vì vậy, chúng tôi có thể thấy từ đó làm thế nào chúng tôi đi đến thời điểm đó, và vấn đề là chúng tôi đã không nạp đủ tiền và sau đó chúng tôi đến một nơi mà chúng tôi cần thanh toán 450 lovelace.

Vì vậy, chúng tôi dễ dàng nhận thấy rằng chúng tôi cần phải làm cho khoản thanh toán nhỏ hơn hoặc làm cho khoản tiền gửi ban đầu lớn hơn. Vì nó hoàn toàn là nút nhấn, chúng tôi nhận được loại đảm bảo đó miễn phí, như nó vốn có.

![](img/pic__00061.png)

Nhưng nghĩ về xác minh, chúng ta có thể làm nhiều hơn thế. Chúng ta có thể chứng minh các thuộc tính của hệ thống một lần và mãi mãi.

Vì vậy, ví dụ, chúng ta có thể chứng minh từ ngữ nghĩa rằng các tài khoản bên trong hợp đồng Marlowe không bao giờ có giá trị tiêu cực. Bạn không bao giờ được thấu chi tài khoản trong hợp đồng Marlowe.

Chúng ta cũng có thể chứng minh định lý bảo toàn tiền này. Chúng tôi có thể chứng minh rằng nếu chúng tôi nhìn vào tất cả số tiền đã ký hợp đồng cho đến nay, con số đó bằng tổng của hai thứ - số tiền được giữ trong hợp đồng cộng với số tiền đã được thanh toán. Điều đó cho thấy một bức tranh rõ ràng về việc bảo quản tiền.

Chúng tôi cũng có thể chứng minh những điều khác kỹ thuật hơn về hệ thống. Ví dụ, một cấu trúc `Close` sẽ không bao giờ tạo ra bất kỳ cảnh báo nào. Vì vậy, nếu chúng tôi đang phân tích các cảnh báo, chúng tôi không cần phải lo lắng về các cấu trúc `Close`. Điều đó cho phép chúng tôi tối ưu hóa phân tích tĩnh.

Chúng tôi cũng có thể chứng minh rằng phân tích tĩnh, tạo ra một số đơn giản hóa để tăng tốc độ, là đúng đắn và hoàn chỉnh. Điều đó có nghĩa là phân tích tĩnh sẽ cung cấp cho chúng tôi cảnh báo lỗi khi hợp đồng thực có thể tạo ra cảnh báo lỗi và nó sẽ không đưa ra cảnh báo lỗi nếu hợp đồng thực không thể thực hiện điều đó.

Một điều mà chúng tôi chưa làm nhưng có trên lộ trình của chúng tôi là làm những loại bằng chứng này cho các hợp đồng cá nhân hoặc các mẫu hợp đồng cá nhân. Những điều mà chúng ta không thể nhất thiết phải chứng minh bằng phân tích tĩnh, chúng ta có thể chứng minh bằng cách chứng minh bằng tay.

Hệ thống có thể chấp nhận được những bằng chứng này được viết về nó và chúng cung cấp cho chúng tôi mức độ đảm bảo cao nhất về cách nó hoạt động.

Chúng tôi đã nói đủ cho thời điểm này về Marlowe. Bạn có thể đi đến đâu để tìm hiểu thêm?


![](img/pic__00062.png)

Có một kho lưu trữ Marlowe GitHub có ngữ nghĩa và những điều cơ bản về Marlowe.

``` {.}
https://github.com/input-output-hk/marlowe
```

Khá nhiều việc triển khai các công cụ từ Marlowe nằm trong kho lưu trữ của Plutus vì nó có kho lưu trữ đó như một phần phụ thuộc.

Nếu bạn tìm trong [thư viện nghiên cứu trực tuyến IOHK](https://iohk.io/en/research/library/) và tìm kiếm Marlowe, bạn sẽ tìm thấy một số tài liệu nghiên cứu mà chúng tôi đã viết về cách hệ thống hoạt động.

Bạn cũng sẽ tìm thấy một hướng dẫn trực tuyến trong Sân chơi Marlowe.

Cuối cùng, Alex sẽ cung cấp thêm một số thông tin trong bài thuyết trình của anh ấy sắp tới.

### Bản tóm tắt

![](img/pic__00063.png)

Tóm lại, những gì chúng ta có ở Marlowe là DSL, một ngôn ngữ chuyên dùng cho các hợp đồng tài chính, chạy trên Plutus. Bởi vì nó là một DSL nên nó cho phép chúng tôi cung cấp sự đảm bảo khó có thể đưa ra đối với một ngôn ngữ có mục đích chung. Và chúng tôi nhận được sự đảm bảo về cách các hợp đồng nên và không nên hành xử.

Nó cũng cho phép chúng tôi định hướng thiết kế của mình xung quanh người dùng cũng như các nhà phát triển. Ngôn ngữ đơn giản và do đó chúng tôi có thể đọc được.

Chúng tôi cũng nhận được khả năng mô phỏng và chúng tôi nhận được những đảm bảo mạnh mẽ hơn về phân tích và xác minh tĩnh.

Bài giảng của Alex Nemish
----------------------

Alex Nemish là một trong những nhà phát triển Marlowe và trong bài thuyết trình này, anh ấy cho chúng ta thấy một chút ngữ nghĩa của Marlowe và các hợp đồng Marlowe PAB (Plutus Application Backend).

Chúng ta sẽ bắt đầu với mô tả ngắn gọn về Ngữ nghĩa Marlowe được triển khai trong tệp
[Semantics.hs](https://github.com/input-output-hk/marlowe/blob/master/semantics-2.0/Semantics.hs). Sau đó, chúng ta sẽ xem xét các hợp đồng PAB.

Dưới đây là các kiểu dữ liệu chính của Marlowe.

![](img/pic__00065.png)

Đó là một hợp đồng. Về cơ bản, đó là sáu cấu trúc mà bạn có thể bắt đầu để lập mô hình hợp đồng và đây là trạng thái sẽ được lưu trữ trên blockchain.

![](img/pic__00066.png)

So we have a state of balances of accounts by party, we have a map of
choices, we have bound values which come from the `Let` constructor, and
a `minSlot` which is the first slot that the contract sees.
Vì vậy, chúng tôi có trạng thái số dư tài khoản của từng bên, chúng tôi có bản đồ các lựa chọn, chúng tôi có các giá trị ràng buộc đến từ hàm tạo `Let` và `minSlot` là vị trí đầu tiên mà hợp đồng nhìn thấy.

![](img/pic__00067.png)

Về cơ bản `Input`, kiểu dữ liệu chứa các hành động cho hợp đồng Marlowe. Nó có thể là một khoản tiền gửi, một sự lựa chọn hoặc một thông báo. 

![](img/pic__00068.png)

Đây là kiểu dữ liệu `TransactionInput`. Đây là những gì chúng tôi cung cấp như một đầu vào. Mọi giao dịch đều có khoảng thời gian xác định và danh sách các đầu vào.

![](img/pic__00070.png)

Và chúng tôi có `TransactionOutput` trong đó chứa các khoản thanh toán mà chúng tôi mong đợi sẽ xảy ra, trạng thái đầu ra và hợp đồng đầu ra.

Chúng tôi cũng thấy `MarloweData` rằng về cơ bản là những gì sẽ được lưu trữ trên blockchain. Đó là trạng thái hiện tại của hợp đồng cũng như hợp đồng thực tế.

![](img/pic__00073.png)

Lối vào ngữ nghĩa là hàm`computeTransaction`.Nó nhận đầu vào của giao dịch, trạng thái hiện tại và hợp đồng hiện tại và trả về đầu ra của giao dịch.

Trước hết, chúng tôi kiểm tra khoảng thời gian để tìm lỗi. Ví dụ: chúng tôi không cho phép khoảng thời gian chứa bất kỳ khoảng thời gian chờ nào. Nếu bạn có hợp đồng với cấu trúc `When` là 10, bạn không thể tạo hợp đồng với khoảng thời gian là 5..15 vì nó sẽ chứa thời gian chờ.

Sau đó, chúng tôi áp dụng tất cả các đầu vào và nếu điều này thành công, chúng tôi trả lại đầu ra của giao dịch với bất kỳ cảnh báo nào chúng tôi đã tìm thấy, các khoản thanh toán mà chúng tôi mong đợi, trạng thái mới và hợp đồng tiếp tục.



![](img/pic__00073.png)

Vì vậy, những gì xảy ra trong `applyAllInputs` là gì?

Trước hết, đó là một vòng lặp. Nó sử dụng hàm `reduceContractUntilQuiescent` làm giảm hợp đồng cho đến khi nó đạt đến trạng thái tĩnh. Khi chúng tôi đạt đến trạng thái tĩnh, chúng tôi lấy đầu vào đầu tiên và cố gắng áp dụng nó, sau đó tiếp tục với vòng lặp, cho đến khi chúng tôi nhận được danh sách đầu vào trống. Sau đó, chúng tôi trả lại trạng thái hiện tại và hợp đồng tiếp tục.

![](img/pic__00074.png)

Hàm `reduceContractUntilQuiescent` đi qua một vòng lặp và cố gắng áp dụng `reduceContractStep` mà về cơ bản sẽ đánh giá một hợp đồng.

![](img/pic__00075.png)

Nếu chúng ta nhận được một `Close` thì chúng ta đang ở trạng thái tĩnh. Nếu chúng tôi nhận được một khoản thanh toán, sau đó chúng tôi đánh giá nó, cập nhật số dư và sau đó trả lại hợp đồng đã giảm.

![](img/pic__00076.png)

Chúng tôi cũng làm như vậy đối với `If`, `Let` và `Assert`. Nhưng đối với `When`, chúng tôi chỉ đánh giá nó nếu nó quá thời gian, nếu không chúng tôi nói rằng nó không bị giảm và hợp đồng đã tạm dừng.

Tóm lại, đánh giá hợp đồng Marlowe bao gồm hai bước:

-   Chúng tôi giảm hợp đồng cho đến khi nó ngừng hoạt động - nó đã đóng hoặc chúng tôi chưa đến hạn `When`.
-   Chúng tôi cố gắng áp dụng các yếu tố đầu vào và đánh giá hợp đồng thêm.

Hãy xem nó hoạt động như thế nào từ phía khách hàng.

Như bạn có thể nhận thấy, mã ngữ nghĩa Marlowe khá trừu tượng và nó không phụ thuộc vào các hoạt động của hệ thống Cardano. Vì vậy, hãy xem trình xác thực Marlowe thực tế đang được thực thi On-chain.

![](img/pic__00078.png)

Đây là hàm`scriptInstance` gọi mã `mkMarloweValidator`,
đến lượt nó `mkValidator`, hàm này sử dụng chức năng thư viện máy trạng thái. Chức năng `mkStateMachine` này cung cấp hai chức năng - chức năng chuyển tiếp và kiểm tra tính cuối cùng.

Việc kiểm tra tính cuối cùng rất đơn giản - chúng tôi chỉ kiểm tra hợp đồng hợp đồng được xây dựng với `Close`.

![](img/pic__00079.png)

Hàm chuyển đổi là phần thịt của trình xác nhận.

Nó cần `MarloweParams` - điều mà chúng ta sẽ nói sau, nó lấy trạng thái của máy trạng thái `MarloweData`, nó lấy `MarloweInput` về cơ bản là đầu vào giao dịch được thể hiện trong các loại Cardano. Sau đó, nó sẽ trả về `Nothing` trong trường hợp lỗi hoặc trạng thái mới cùng với 0 hoặc nhiều ràng buộc hơn.

Chúng tôi kiểm tra xem số dư có hợp lệ không - chúng tôi yêu cầu số dư phải dương.

Sau đó, chúng tôi tạo các ràng buộc đầu vào dựa trên các yếu tố đầu vào. Vì vậy, trong trường hợp đặt cọc, chúng tôi mong đợi rằng số tiền đó sẽ được chuyển thành hợp đồng. Trong trường hợp lựa chọn, chúng tôi mong đợi sự chứng kiến ​​của các bên tương ứng. Chúng tôi tính toán rằng hợp đồng có số dư chính xác.

![](img/pic__00081.png)


Chúng tôi xây dựng một `TransactionInput` với một khoảng slot và danh sách đầu vào cho trước, và chúng tôi gọi hàm `computeTransaction`  mà chúng tôi đã thấy trong đó `semantics.hs`.

![](img/pic__00082.png)

Với kết quả được tính toán, chúng tôi xây dựng một trạng thái `MarloweData` và cập nhật hợp đồng mới. Chúng tôi đưa ra các ràng buộc đầu ra tạo ra các khoản thanh toán cho các bên tương ứng và chúng tôi tính toán số dư mới. Sau đó, chúng tôi kết hợp tất cả các ràng buộc với xác nhận phạm vi.

![](img/pic__00083.png)

Để xác thực thông tin đầu vào, chúng tôi kiểm tra xem có các chữ ký bắt buộc và mã thông báo vai trò hay không.


![](img/pic__00084.png)

Các khoản thanh toán cho các bên được chuyển đến một khóa công khai hoặc đi tới trình xác thực `rolePayoutValidatorHash`, chỉ cần kiểm tra, đưa ra một loại tiền tệ, rằng một giao dịch sử dụng mã thông báo vai trò.

Để thực hiện ngoài chuỗi, chúng tôi cung cấp ba hợp đồng Marlowe PAB.

-   Hợp đồng theo dõi Marlowe (Marlowe Follower Contract)
-   Hợp đồng kiểm soát Marlowe (Marlowe Control Contract)
-   Hợp đồng đồng hành Marlowe (Marlowe Companion Contract)

### Hợp đồng theo dõi (Follower Contract)

![](img/pic__00086.png)

Đây là một cái rất đơn giản - nó chỉ chứa một điểm cuối được gọi `follow`. Nó đăng ký tất cả các thay đổi đối với địa chỉ trình xác thực hợp đồng Marlowe, để chúng tôi có thể lưu trữ tất cả các đầu vào được áp dụng cho hợp đồng Marlowe.

Nó sử dụng hàm `updateHistoryFromTx` tìm một đầu vào Marlowe và xây dựng kiểu dữ liệu `TransactionInput` và sử dụng` tell` để cập nhật trạng thái hợp đồng PAB.

Nếu bạn đã kết nối với ổ cắm web cho hợp đồng này, bạn sẽ được thông báo về các thay đổi giao dịch.

![](img/pic__00087.png)

Trạng thái của hợp đồng được lưu trữ trong `ContractHistory` nó lưu trữ ban đầu `MarloweParams`,`MarloweData` và danh sách tất cả `TransactionInput` các thứ đã được áp dụng cho hợp đồng này. Bạn luôn có thể khôi phục trạng thái hiện tại bằng cách áp dụng danh sách các đầu vào cho trạng thái ban đầu.

![](img/pic__00088.png)

### Hợp đồng kiểm soát (Control Contract)

![](img/pic__00089.png)

 `marlowePlutusContract` là một hợp đồng kiểm soát. Nó cho phép bạn tạo một phiên bản của hợp đồng Marlowe, áp dụng các đầu vào cho phiên bản đó, để tự động thực hiện hợp đồng, nếu có thể, để đổi mã thông báo từ các khoản thanh toán sang các vai trò và để đóng hợp đồng.

Chúng ta hãy xem xét việc tạo hợp đồng Marlowe.

#### Tạo điểm cuối (Create Endpoint)

Khi bạn gọi điểm cuối `create` , bạn cung cấp hợp đồng và bản đồ các vai trò cho khóa công khai. Sau đó chúng tôi thiết lập một`MarloweParams`.

![](img/pic__00090.png)

`MarloweParams` là một cách để tham số hóa hợp đồng Marlowe. Bạn có thể chỉ định trình xác thực vai trò của riêng mình bằng cách cung cấp hàm băm của nó. Có một công cụ mặc định kiểm tra xem mã thông báo vai trò có được sử dụng trong giao dịch hay không nhưng bạn có thể làm bất cứ điều gì bạn muốn.

Khi hợp đồng của bạn sử dụng vai trò, chúng tôi cần biết ký hiệu tiền tệ cho vai trò. Khi hợp đồng sử dụng `roles`, chúng tôi cần tạo mã thông báo vai trò và phân phối chúng cho chủ sở hữu của chúng.

Trong hàm `setupMarloweParams`  chúng tôi nhận được các `roles` được sử dụng trong hợp đồng. Nếu chúng tôi có chủ sở hữu cho những `roles` này, chúng tôi sẽ tạo mã thông báo có tên `roles`. Theo mặc định, chúng tôi tạo một mã thông báo cho mỗi `roles`. Chúng tôi sử dụng hàm `Contract.forgeContract`để tạo mã thông báo và sau đó gán chúng cho người tạo. Sau đó, trong cùng một giao dịch, chúng tôi phân phối các mã `roles` cho chủ sở hữu của chúng.

Tiếp theo trong hợp đồng kiểm soát, chúng tôi sử dụng thư viện máy trạng thái để tạo một máy khách trạng thái và gửi giao dịch.

#### Apply Endpoint

 endpoint `apply` rất đơn giản. rất đơn giản. Chúng tôi gọi là hàm `applyInputs`.

![](img/pic__00092.png)

Chúng tôi xây dựng một phạm vi vị trí và chúng tôi sử dụng hàm`runStep` lấy một phạm vi vị trí và danh sách các đầu vào.

#### Redeem Endpoint

endpoint `redeem` cho phép bạn nhận tiền đã được trả cho một kịch bản thanh toán `role`.

![](img/pic__00093.png)

Chúng tôi lấy địa chỉ của tập lệnh và sau đó gửi tất cả các kết quả đầu ra cho chủ sở hữu mã thông báo.

#### Auto Endpoint

![](img/pic__00095.png)

 endpoint `auto`  khá thú vị và khá phức tạp. Có một tập hợp các hợp đồng có thể được thực hiện tự động.

Hãy tưởng tượng một hợp đồng chỉ chứa các khoản tiền gửi và các khoản thanh toán. Không người tham gia nào cần cung cấp các lựa chọn hoặc bất kỳ nội dung tương tác nào. Chỉ có các khoản thanh toán theo lịch trình. Một hợp đồng như vậy có thể được thực hiện tự động và endpoint `auto` cho phép chính xác điều đó.

Vì vậy, nếu một hợp đồng có thể được thực hiện tự động, nó sẽ gọi
`autoExecuteContract`.

![](img/pic__00096.png)

Đây là một máy nhà nước trả tiền đặt cọc hoặc đợi các bên khác thực hiện phần việc của họ.

### Hợp đồng đồng hành (Companion Contract)

Hợp đồng thú vị cuối cùng là Hợp đồng đồng hành Marlowe.

![](img/pic__00097.png)

Đây là một hợp đồng giám sát ví của người tham gia và thông báo khi mã thông báo vai trò đến.

![](img/pic__00098.png)

Nó lắng nghe các giao dịch đi đến địa chỉ của riêng bạn và nếu có mã thông báo và mã thông báo này được tạo ra bằng cách tạo hợp đồng Marlowe, nó sẽ cố gắng tìm hợp đồng Marlowe và nếu thành công, nó sẽ cập nhật trạng thái của hợp đồng. Nếu bạn đã đăng ký với ổ cắm web của hợp đồng, bạn sẽ nhận được thông báo về mã thông báo vai trò và bạn sẽ nhận được bản đồ `MarloweParams` về `MarloweData`.

![](img/pic__00099.png)

Chơi trong sân chơi
-------------------------

Hãy chơi một chút với Marlowe trong sân chơi.

Khi bạn đến sân chơi, trước tiên bạn sẽ được đưa ra với ba tùy chọn để bạn chọn bằng ngôn ngữ nào bạn muốn viết các hợp đồng Marlowe của mình.

![](img/pic__00101.png)

Bạn có thể làm điều đó trong Haskell, bạn có thể làm điều đó trong Javascript, hoặc bạn có thể làm điều đó trong Blockly hoặc trực tiếp trong Marlowe.

Blockly rất hay và bạn không cần kinh nghiệm lập trình để làm việc này.

### Blockly

Hãy bắt đầu một dự án mới và chọn `Blockly`.

![](img/pic__00102.png)

Đây là một trình biên tập đồ họa. Chúng ta có thể chỉ cần nhấp và thả một hợp đồng Marlowe cùng nhau.

Ví dụ, hãy viết một hợp đồng có ba bên - Alice, Bob và Charlie.

Ý tưởng là Alice và Bob đặt cọc một số tiền Ada vào hợp đồng, giả sử là 10 Ada, và sau đó Charlie quyết định xem Alice hay Bob nhận được tổng số tiền đó hay không. Tùy thuộc vào quyết định của Charlie, Alice được 20 hoặc Bob được 20.

Luôn có khả năng một trong ba người không chơi cùng; Alice không đặt cọc, Bob không gửi tiền hoặc Charlie không đưa ra lựa chọn của mình. Trong trường hợp này, mọi người sẽ chỉ được hoàn lại tiền.

Khi chúng tôi bắt đầu với `Blockly`, có một hợp đồng và nó chỉ là một hợp đồng `Close` , trong trường hợp này không làm được gì cả. Nếu có tiền trong tài khoản nội bộ, nó sẽ trả lại tiền cho chủ tài khoản.

Chúng tôi muốn làm điều gì đó khác, vì vậy trước tiên chúng ta hãy đợi Alice gửi tiền.

Bởi vì đó là một hành động bên ngoài được kích hoạt bởi một trong các bên, trong trường hợp này là Alice, chúng ta cần cấu trúc `When`  mà `Simon` đã đề cập.

![](img/pic__00103.png)

Chúng tôi có thể xóa hợp đồng `Close` , chuyển nó vào vị trí `When` 

![](img/pic__00104.png)

Ở đây chúng tôi thấy tất cả các vị trí mà những thứ khác cần phải đi. Chúng tôi thấy một số trường mà chúng tôi phải đặt.

Chúng tôi có thể đặt thời gian chờ, vì vậy, giả sử khoản tiền gửi này của Alice phải xảy ra ở vị trí số 10.

![](img/pic__00105.png)

Nếu nó không xảy ra, chúng ta có thể nói điều gì sẽ xảy ra sau đó, và thực sự không có lựa chọn tốt để làm bất cứ điều gì ngoại trừ đóng cửa trong trường hợp đó, vì vậy trong trường hợp đó sẽ không có gì xảy ra.

![](img/pic__00106.png)

Ở đây chúng tôi nói những hành động bên ngoài mà chúng tôi chờ đợi. Giả sử chúng ta chỉ đợi một hành động, đó là Alice gửi tiền.

Vì vậy, chúng tôi có thể kiểm tra các hành động và chọn một khoản tiền gửi và chuyển nó vào.

![](img/pic__00107.png)

Chúng tôi thấy một số chỗ trống mà chúng tôi phải lấp đầy. Trước hết, một bên phải thực hiện ký quỹ và có hai sự lựa chọn - khóa công khai hoặc role.

![](img/pic__00108.png)

Hãy đảm nhận vai trò vì khi đó chúng ta chỉ có thể nói Alice. Thông thường, đây sẽ là tên của mã thông báo vai trò, vì vậy bất kỳ ai sở hữu mã thông báo đó đều có thể kết hợp role.

![](img/pic__00109.png)

Vì vậy, Alice đặt cọc. Bây giờ số lượng. Đó là một `Value`và giả sử chúng ta chỉ chọn một lượng không đổi là 10 Ada.

![](img/pic__00110.png)

Số tiền là 10 và thực tế rằng nó là Ada phải được chỉ định trong vùng tiền tệ.

![](img/pic__00111.png)

Ngoài ra còn có tùy chọn sử dụng mã thông báo hơn Ada, nhưng hãy gắn bó với Ada.

Bây giờ có những tài khoản nội bộ này cũng thuộc về một trong các bên, vì vậy giả sử Alice thanh toán nó vào tài khoản nội bộ của riêng cô ấy.

![](img/pic__00112.png)

Điều đó có thể được sao chép/dán thay vì lấy lại từ menu `Party`.

Bây giờ chúng ta phải nói điều gì sẽ xảy ra tiếp theo, nếu Alice thực hiện khoản tiền gửi này. Sau đó, chúng tôi muốn Bob gửi tiền, vì vậy chúng tôi có thể bắt đầu bằng cách sao chép toàn bộ khối `When`.

![](img/pic__00113.png)

Trước hết, chúng tôi thay đổi thời gian chờ thành 20 để cung cấp cho Bob 10 chỗ trống để làm việc gì đó, và sau đó bất cứ nơi nào chúng tôi có Alice, chúng tôi bây giờ đặt Bob.

![](img/pic__00114.png)

Vì vậy, tại thời điểm này, nếu cả hai hành động này xảy ra, Alice đã gửi 10 vào tài khoản nội bộ của cô ấy và Bob đã gửi 10 vào tài khoản bên ngoài của anh ấy.

Bây giờ chúng tôi muốn Charlie đưa ra lựa chọn và đây lại là một hành động bên ngoài, vì vậy chúng tôi cần một lần nữa `When`, nhưng lần này không phải là một khoản tiền gửi, vì vậy hãy xóa khoản tiền gửi đi. Sau đó, hãy thay đổi thời gian chờ thành 30 để cho Charlie 10 chỗ trống để anh ấy lựa chọn.

![](img/pic__00115.png)

Now we need a different action. Where earlier we had `Deposit`, now we
pick the `Choice` action. We can give it a name, let\'s say `Winner`. We
must say who makes the choice, so that\'s will be Charlie, and now we
must specify what values this choice can have.
Bây giờ chúng ta cần một hành động khác. Nơi trước đó chúng ta đã có `Deposit`, bây giờ chúng ta chọn hành động `Choice`. Chúng ta có thể đặt cho nó một cái tên, giả sử `Winner`. Chúng ta phải nói ai là người đưa ra lựa chọn, vì vậy đó sẽ là Charlie, và bây giờ chúng ta phải xác định những giá trị mà lựa chọn này có thể có.

![](img/pic__00116.png)

Đó là số vì Charlie phải chọn giữa Alice và Bobs, đó là hai lựa chọn, tôi có thể chọn các giá trị tùy ý như một và hai. Một cho Alice, hai cho Bob. Đó đã là mặc định nên không sao cả.

Điều này cho phép Charlie chọn một hoặc hai.

![](img/pic__00117.png)

Sau đó, nếu và khi Charlie đưa ra lựa chọn, chúng tôi tiếp tục, và điều đó bây giờ phụ thuộc vào sự lựa chọn mà anh ấy đã đưa ra. Nếu anh ta chọn Alice thì Alice phải nhận được tất cả tiền, nếu anh ta chọn Bob thì Bob phải nhận được tất cả tiền.

Vì vậy, chúng tôi sẽ thêm một điều kiện `If`.

![](img/pic__00118.png)

Sau đó, chúng tôi sẽ thêm một quan sát để kiểm tra xem Alice có phải là người chiến thắng hay không. Sự quan sát chúng ta thêm vào là sự quan sát `value is equal to`

![](img/pic__00119.png)

To see if it is Alice, we will use the `Choice by` option to ask if
Charlie\'s `Winner` name is equal to Alice.
Để xem đó có phải là Alice hay không, chúng tôi sẽ sử dụng  `Choice by`  để hỏi xem `Winner` tên của Charlie có bằng Alice hay không.

![](img/pic__00120.png)

Trong nhánh `then` bây giờ chúng tôi có một hợp đồng trả lương. Người nhận tiền là người nhận tiền - đó có thể là một tài khoản nội bộ hoặc có thể là một bên bên ngoài. Trong trường hợp này không thành vấn đề, vì khi chúng tôi đóng, tất cả các bên đều nhận được tiền từ tài khoản nội bộ.

![](img/pic__00121.png)

Vì vậy, chúng tôi sẽ chỉ chọn tài khoản nội bộ của Alice.

![](img/pic__00122.png)

Chúng tôi sẽ trả 10 Ada.

![](img/pic__00123.png)

Vậy ai trả tiền? Nó phải là một tài khoản nội bộ vì hợp đồng trả lương này là thứ mà hợp đồng có quyền kiểm soát, vì vậy nó không phải là một hành động bên ngoài. Vì vậy, các khoản thanh toán được kích hoạt từ các tài khoản nội bộ và trong trường hợp này, đó là tài khoản của Bob.

![](img/pic__00124.png)

Vì vậy, điều này bây giờ nói: Nếu Charlie chọn 1, thì hãy thanh toán từ tài khoản nội bộ của Bob là 10 Ada vào tài khoản nội bộ của Alice.

Sau đó, chúng ta có thể đóng cửa. Và khi chúng tôi đóng, tất cả các tài khoản nội bộ sẽ được trả cho chủ sở hữu bên ngoài. Tại thời điểm này, tài khoản nội bộ của Alices sẽ có 20 Ada và khi chúng tôi đóng, cô ấy sẽ nhận được 20 Ada được trả cho mình.

![](img/pic__00125.png)

Và, nếu Charlie không chọn Alice, thì chúng ta phải trả tiền cho Bob. Chúng tôi có thể sao chép, dán hợp đồng Thanh toán trước đó cho việc này và thực hiện các sửa đổi cần thiết.

![](img/pic__00126.png)

Và điều này là đủ cho hợp đồng của chúng tôi.

Ví dụ, bây giờ chúng ta có thể nhìn vào Marlowe thuần túy. Đây là giá trị của kiểu dữ liệu Marlowe được gọi `Contract`.

![](img/pic__00127.png)

Và chúng tôi có thể gửi nó đến trình mô phỏng.

![](img/pic__00128.png)

Chúng ta có thể bắt đầu mô phỏng.

![](img/pic__00129.png)

Bây giờ, bất cứ khi nào có `When`, chúng tôi sẽ được nhắc thực hiện các hành động nào trong số các hành động có sẵn. Trong trường hợp của chúng tôi, chúng tôi chỉ có một hành động khả dụng tại mỗi thời điểm.

Vì vậy, trong lần đầu tiên `When`, Alice gửi tiền của mình, hoặc hết thời gian chờ.

Nếu chúng ta chờ hết giờ thì rất nhàm chán. Hợp đồng được giảm xuống `Close`, và không có gì xảy ra.

![](img/pic__00130.png)

Tuy nhiên, nếu cô ấy đặt cọc, thì hợp đồng này sẽ đơn giản hóa - nó giảm xuống những gì xảy ra sau khi cô ấy đặt cọc.

![](img/pic__00131.png)

Và bây giờ chúng ta có thể thấy chúng ta đang ở phần thứ hai `When`, nơi chúng ta đang đợi khoản tiền gửi của Bob. Một lần nữa, anh ta có thể chọn không gửi tiền. Nếu anh ta làm điều đó, thì chúng ta có thể thấy các hành động trong nhật ký giao dịch mà Alice đã gửi 10 Ada và hợp đồng sẽ trả lại khoản tiền này cho Alice khi kết thúc.

![](img/pic__00132.png)

Tuy nhiên, sẽ thú vị hơn nếu Bob cũng thực hiện khoản tiền gửi của mình.

![](img/pic__00133.png)

Bây giờ hợp đồng đã đơn giản trở lại. Bây giờ chúng ta đang ở `When` nơi mà hành động khả dụng duy nhất là Charlie chọn người chiến thắng.

Nếu Charlie không làm bất cứ điều gì và hợp đồng hết hạn, cả Bob và Alice đều lấy lại tiền của họ.

![](img/pic__00134.png)

Nếu Charlie chọn Alice (lựa chọn 1), thì chúng ta thấy rằng hợp đồng trả 20 Ada cho Alice.

![](img/pic__00135.png)

Thay vào đó, nếu anh ta chọn lựa chọn 2, thì hợp đồng trả 20 Ada cho Bob.

![](img/pic__00136.png)

Bây giờ chúng ta hãy thiết lập lại hợp đồng.

Chúng tôi sẽ sao chép mã Marlowe vào khay nhớ tạm, sau đó tạo một dự án Haskell mới.

![](img/pic__00137.png)

Trong trình soạn thảo Haskell có một mẫu.

![](img/pic__00138.png)

Tất cả những gì chương trình này làm là lấy một hợp đồng Marlowe, và sau đó in nó ra. Ví dụ, điều này được sử dụng để chạy trong trình mô phỏng.

Thay vì Đóng, chúng ta có thể dán những gì chúng ta vừa sao chép vào khay nhớ tạm.

![](img/pic__00139.png)

Sau đó, chúng tôi có thể biên dịch nó và gửi nó đến trình mô phỏng và nó sẽ hoạt động chính xác như trước.

Ở đó, chúng tôi không thực sự thấy lợi ích của việc làm điều đó trong Haskell, chúng tôi cũng có thể làm điều đó trong Blockly, mặc dù bạn có thể thấy rằng Blockly thực sự chỉ hữu ích cho việc học và viết các hợp đồng cực kỳ đơn giản. Chúng tôi vừa mới viết một hợp đồng đơn giản và nó đã bắt đầu khá khó sử dụng trong trình chỉnh sửa Blockly. Nếu bạn làm điều gì đó phức tạp hơn, nó có thể bắt đầu rất khó hiểu trong trình chỉnh sửa.

Tuy nhiên, chúng ta có thể làm những việc khác trong chương trình Haskell này. Chúng ta không cần phải xác định hợp đồng theo nghĩa đen. Chúng tôi có thể sử dụng toàn bộ sức mạnh của Haskell để giúp chúng tôi viết hợp đồng.

Ví dụ, chúng ta có thể thấy rất nhiều sự lặp lại vì chúng ta luôn có các vai Alice, Bob và Charlie. Chúng tôi có thể xác định những điều này một cách riêng biệt.

Lưu ý rằng chúng ta có thể sử dụng các ký tự chuỗi được nạp chồng ở đây vì hàm`fromString`  sử dụng phương `Role` thức khởi tạo `Party`.

![](img/pic__00140.png)

Chúng tôi cũng có thể xác định một hằng số cho khoản tiền gửi 10 Ada.

![](img/pic__00141.png)

Đối với (Mã thông báo "" ""), chúng ta có thể thay thế mã này bằng chữ viết tắt ada .

![](img/pic__00142.png)

Chúng tôi cũng có thể đơn giản hóa của Charlie `ChoiceId`.

![](img/pic__00143.png)

Bây giờ nó đã được dọn dẹp khá nhiều.

Có thể làm những việc phức tạp hơn. Hợp đồng của chúng tôi hơi bất đối xứng mặc dù nghe có vẻ như là một tình huống đối xứng. Alice và Bob hoàn toàn đối xứng, nhưng trong hợp đồng của chúng tôi, Alice phải đặt cọc trước.

Những gì chúng tôi có thể làm là cho phép Bob gửi tiền trước. Ở ngoài cùng, `When` chúng tôi sẽ có hai khoản tiền gửi - một nơi Alice gửi và một nơi Bob gửi.

Hãy tạo một chức năng trợ giúp nhỏ. Phải mất hai `Partys` - bên gửi tiền đầu tiên và bên gửi tiền thứ hai và sau đó sẽ trả lại  `Case`. Chúng ta có thể sử dụng điều này để tham số hóa Alice và Bob dưới dạng `x` và `y` trong `Case`. Lưu ý rằng chúng ta chỉ cần làm điều này đối với các khoản tiền gửi, phần mà Charlie đưa ra lựa chọn của anh ấy có thể giữ nguyên, với Alice và Bob tiếp tục được đại diện bởi 1 và 2 tương ứng.

![](img/pic__00144.png)

Bây giờ chúng ta có thể thay thế mã đã dán ban đầu bằng hàm trợ giúp của chúng ta và chúng ta có thể tạo trường hợp đối xứng trong đó Bob đặt cọc trước như một tùy chọn ở ngoài cùng `When`.

![](img/pic__00146.png)

Điều này sẽ được biên dịch và bây giờ chúng tôi có thể gửi đến trình mô phỏng.

![](img/pic__00147.png)

Bây giờ chúng ta có hai hành động khả thi có thể xảy ra trong bước đầu tiên. Alice có thể gửi 10, hoặc Bob có thể gửi 10.

Nếu Bob bắt đầu ...

![](img/pic__00147.png)

Rồi bây giờ đến lượt Alice.

Vì vậy, về cơ bản, để sử dụng trình soạn thảo Haskell, chúng tôi viết một chương trình tạo ra một thứ gì đó thuộc loại `Contract` và bạn có thể sử dụng tất cả các tính năng của Haskell như các hàm cục bộ hoặc bất cứ điều gì để làm cho cuộc sống của bạn dễ dàng hơn.

Khi sử dụng `Blockly`, nếu chúng tôi muốn cung cấp cho Bob tùy chọn là người đầu tiên gửi tiền, chúng tôi sẽ không có lựa chọn nào khác ngoài việc sao chép và dán toàn bộ cấu trúc `When` .

Tất nhiên, có những tùy chọn khác khi sử dụng Haskell. Ví dụ, chúng tôi cũng có thể diễn giải hợp đồng, chúng tôi có thể chuyển giá trị tiền gửi vào làm đối số.

Chúng tôi cũng có thể tham số hóa các bên và thậm chí tổng quát hóa nó để số lượng các bên có thể thay đổi. Điều này sẽ rất bất tiện nếu chúng ta phải làm điều này bằng tay bằng Blockly, nhưng trong Haskell thì điều đó khá đơn giản.

Điều đáng chú ý ở đây là Marlowe, trái ngược với Plutus, rất đơn giản là Haskell. Nhóm Marlowe đã đưa ra quan điểm là chỉ sử dụng các tính năng Haskell cơ bản. Bạn không cần ống kính, bạn không cần Template Haskell, bạn thậm chí không cần monads hoặc lập trình cấp kiểu.

Marlowe không phải lúc nào cũng thích hợp vì nó dành riêng cho các hợp đồng tài chính, nhưng nếu nó phù hợp thì đó là một lựa chọn rất tốt do tất cả các đảm bảo an toàn mà Simon đã đề cập và vì nó đơn giản và dễ thực hiện hơn Plutus rất nhiều.

