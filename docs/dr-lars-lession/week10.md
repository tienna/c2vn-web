Week 10 - Uniswap
=================

Chú ý:

Đây là phiên bản viết của  [Bài giảng số 10 Dr.Lars](https://youtu.be/X_q4AHMsw5Y).

<iframe width="100%" height="400" src="https://www.youtube.com/embed/X_q4AHMsw5Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Trong bài giảng này, chúng ta xem xét việc triển khai Uniswap trong Plutus.

Đây là bài giảng cuối cùng trong Chương trình Tiên phong của Plutus. Tuy nhiên, sẽ có một bài giảng đặc biệt khi có thể triển khai các hợp đồng tới testnet.

Trong bài giảng này, chúng tôi sẽ không giới thiệu bất kỳ chủ đề hoặc khái niệm mới nào. Thay vào đó, chúng tôi sẽ thực hiện một đoạn giới thiệu từ đầu đến cuối mà Lars đã viết vài tháng trước, sao chép hợp đồng Uniswap rất phổ biến từ Ethereum.

Một điều mới mà chúng ta sẽ xem xét sau một số yêu cầu là cách bạn có thể truy vấn các endpoint được tạo bởi PAB bằng các lệnh Curl chỉ từ bảng điều khiển.

Uniswap là gì
---------------

Vậy đối với những bạn chưa nghe nói về Uniswap, thì Uniswap là gì?

Uniswap là một ứng dụng được gọi là DeFi, hoặc ứng dụng tài chính phi tập trung, cho phép hoán đổi mã thông báo mà không cần bất kỳ cơ quan trung ương nào. Trong trường hợp của Ethereum, đó là mã thông báo ERC20.

Vì vậy, bạn không cần trao đổi tập trung, cách truyền thống để trao đổi mã thông báo hoặc các tài sản tiền điện tử khác. Thay vào đó, mọi thứ được điều chỉnh bởi các hợp đồng thông minh và hoạt động hoàn toàn tự động trên blockchain.

Một tính năng thú vị khác của Uniswap là nó không khám phá giá theo cách thông thường với cái gọi là sổ đặt hàng, mà sử dụng một hệ thống khám phá giá tự động khác. Ý tưởng là mọi người có thể tạo ra cái gọi là bể thanh khoản.

Nếu họ muốn những người dùng khác có thể hoán đổi hai mã thông báo khác nhau, thì ai đó có thể tạo một nhóm thanh khoản và đặt một số lượng nhất định của hai mã thông báo đó vào nhóm thanh khoản này và đổi lại người tạo ra nhóm sẽ nhận được cái gọi là mã thông báo thanh khoản cụ thể cho một nhóm này.

Những người dùng khác có thể sử dụng nhóm đó để hoán đổi. Họ lấy một số lượng của một trong các mã thông báo để đổi lấy một lượng mã thông báo khác vào lại.

Ngoài ra, mọi người cũng có thể thêm thanh khoản vào pool và nhận token thanh khoản hoặc họ cũng có thể đốt token thanh khoản để đổi lấy token từ pool.

Và tất cả các tính năng này cũng được triển khai trong phiên bản Uniswap hoạt động trên Cardano mà chúng ta sẽ xem xét bây giờ.

![](img/pic__00149.png)

Vì vậy, chúng ta hãy xem xét các hoạt động khác nhau có sẵn lần lượt.

Tất cả bắt đầu bởi ai đó thiết lập toàn bộ hệ thống. Vì vậy, một tổ chức hoặc đơn vị nào đó muốn cung cấp dịch vụ Uniswap này.

Nó bắt đầu với một giao dịch tạo UTxO tại địa chỉ tập lệnh này, ở đây chúng tôi gọi điều đó là `factory` cho Uniswap factory. Nó chứa một NFT xác định nhà máy, thủ thuật tương tự mà chúng tôi đã sử dụng một vài lần trước đây và dưới dạng dữ liệu, nó sẽ chứa danh sách tất cả các nhóm thanh khoản.

Vì vậy, ban đầu, khi nhà máy mới được tạo, danh sách đó sẽ trống.

Bây giờ, hãy giả sử rằng một người dùng, Alice muốn tạo một nhóm thanh khoản cho các mã thông báo A và B. Một nhóm cho phép những người khác hoán đổi A với B hoặc B với A.

![](img/pic__00150.png)

Cô ấy phải cung cấp một số thanh khoản ban đầu cho hồ bơi. Vì vậy, cô ấy cần một số lượng token A và một số lượng token B, giả sử cô ấy có 1.000A và 2000B.

Điều quan trọng cần lưu ý ở đây là tỷ lệ giữa A và B phản ánh niềm tin của Alice vào giá trị tương đối của các mã thông báo. Vì vậy, nếu cô ấy muốn thiết lập một hồ bơi có 1000A và 2000B, thì cô ấy tin rằng một A có cùng giá trị với hai B.

Để tạo quỹ thanh khoản, cô ấy sẽ tạo một giao dịch với hai đầu vào và ba đầu ra.

![](img/pic__00151.png)

Hai yếu tố đầu vào sẽ là tính thanh khoản mà cô ấy muốn cung cấp; 1000A và 2000B và nhà máy Uniswap được gọi với redeemer tạo. Ba đầu ra sẽ là nhóm mới được tạo.

Chúng tôi gọi nó là `Pool AB` ở đây để chỉ ra rằng nó chứa các token AB, sẽ chứa tính thanh khoản mà Alice đã cung cấp; 1000A và 2000B và một mã thông báo mới đúc xác định nhóm này, một NFT, được gọi là `AB NFT`.

Số liệu của nhóm, 1415, sẽ là số lượng mã thông báo thanh khoản mà Alice nhận được để thiết lập nhóm này và cung cấp tính thanh khoản. #

Nếu bạn thắc mắc về con số, đó là căn bậc hai của tích số 1000 và 2000, vì vậy đó là cách tính số lượng mã thông báo thanh khoản ban đầu. Nó không thực sự quan trọng, bạn có thể mở rộng quy mô tùy ý, nhưng đó là cách Uniswap thực hiện.

Đầu ra thứ hai là nhà máy Uniswap một lần nữa, với NFT giống như trước đó xác định nó. Và bây giờ dữ liệu đã được cập nhật. Vì vậy, trong danh sách này trống trước đây, danh sách tất cả các nhóm thanh khoản, bây giờ có một mục nhập cho nhóm AB mới được tạo.

Cuối cùng, có một đầu ra thứ ba cho Alice, nơi cô ấy nhận được các mã thông báo thanh khoản mới được đúc, được gọi ABở đây để chỉ ra rằng chúng thuộc nhóm `AB`.

Giờ đây, nhóm thanh khoản đã được thiết lập, những người dùng khác có thể sử dụng nó để hoán đổi.


![](img/pic__00152.png)

Vì vậy, giả sử rằng Bob muốn hoán đổi 100A với B. Bob sẽ làm gì?

Anh ta sẽ tạo một giao dịch có hai đầu vào và hai đầu ra. Hai đầu vào là 100A mà anh ta muốn hoán đổi và nhóm với công cụ hoán đổi. Kết quả đầu ra là B mà anh ta nhận được.

Trong ví dụ này, đó sẽ là 181B và nhóm được cập nhật. Vì vậy, hồ bơi hiện có thêm 100A mà Bob đã cung cấp. Vì vậy, bây giờ nó là 1.100A, và nó có ít hơn 181B so với trước đây.

Tất nhiên, nó vẫn có NFT xác định nhóm và dữ liệu không thay đổi vì số lượng mã thông báo thanh khoản đã được đúc không thay đổi.

Tất nhiên, câu hỏi đặt ra là số 181 này đến từ đâu? Đây là ý tưởng tài tình, cách khám phá giá hoạt động trong Uniswap.

Vì vậy, quy tắc gần như là tích số của hai mã thông báo không bao giờ được giảm. Ban đầu chúng ta có 1000 A và 2000 B và tích là 2 triệu.

Nếu bạn làm phép tính thì bạn sẽ thấy sau khi hoán đổi 1100\*1819 sẽ lớn hơn 2 triệu một chút.

Nếu bạn nghĩ về nó hoặc tự mình thử một vài ví dụ, thì bạn sẽ thấy rằng về nguyên tắc, bạn sẽ luôn trả tỷ lệ A\*B này không đổi, ít nhất là nếu bạn hoán đổi một số tiền nhỏ.

Vì vậy, ban đầu tỷ lệ từ A đến B là 1: 2, 1000: 2000. 100 là tương đối nhỏ so với thanh khoản 1000, vì vậy Bob gần như sẽ nhận được 200 tỷ, nhưng anh ta nhận được ít hơn và có hai lý do cho điều đó.

Một là số lượng mã thông báo trong nhóm thanh khoản không bao giờ được phép về 0. Và bạn càng lấy ra nhiều  thì càng đắt - đổi lại bạn càng ít. Vì vậy 100 làm cạn kiệt tổng số A một chút, vì vậy Bob không nhận được đầy đủ hệ số 2, anh ta nhận được ít hơn một chút. Đó chính xác là cách hoạt động của công thức sản phẩm này.

Điều này cũng làm cho nó trở nên khéo léo, bởi vì nó tự động tính toán cung và cầu. Nếu người tiếp theo cũng muốn hoán đổi 100A, họ sẽ nhận được ít hơn.

Ý tưởng là nếu nhiều người muốn bỏ A vào và muốn nhận lại B, điều đó có nghĩa là nhu cầu về B cao. Và điều đó có nghĩa là giá của B so với A sẽ tăng lên. Và đó chính xác là những gì đang xảy ra.

Vì vậy, càng nhiều người thực hiện hoán đổi theo hướng này, đưa A vào và đưa B ra, thì khoảng cách càng ít vì giá của B tăng. Nếu có sự hoán đổi theo hướng khác, bạn sẽ có tác dụng ngược lại.

Nếu có một lượng hoán đổi bằng nhau từ A đến B và B thành A, thì tỷ lệ này giữa hai số tiền sẽ gần như bằng nhau.

Có một lý do bổ sung khiến Bob không nhận được đầy đủ 200 mà anh ấy có thể mong đợi, và đó là phí.

Chúng tôi muốn khuyến khích Alice thiết lập hồ bơi ngay từ đầu. Cô ấy sẽ không chỉ làm điều đó cho vui, cô ấy muốn kiếm lợi nhuận từ nó, vì vậy cô ấy muốn kiếm tiền từ các giao dịch hoán đổi mà mọi người thực hiện.

Công thức sản phẩm ban đầu được sửa đổi một chút để khẳng định rằng sản phẩm không những không giảm mà còn tăng lên theo một lượng nhất định, một tỷ lệ nhất định, tùy thuộc vào mức độ hoán đổi của mọi người. Đó là 3% trong ví dụ này về 100A mà Bob hoán đổi và sẽ tương tự nếu bạn hoán đổi B thay vào đó.

Về cơ bản, điều này được thêm vào trên sản phẩm này, vì vậy bất cứ khi nào ai đó hoán đổi, sản phẩm không những không giảm mà còn thực sự tăng lên. Và càng nhiều người hoán đổi, nó càng tăng.

Ý tưởng là nếu bây giờ Alice đóng nhóm bằng cách đốt các mã thông báo thanh khoản của mình, cô ấy sẽ nhận được tất cả các mã còn lại trong nhóm và sản phẩm sẽ cao hơn những gì cô ấy đặt vào ban đầu.

Vì vậy, đó là động cơ của cô ấy để thiết lập hồ bơi ngay từ đầu.

Hoạt động tiếp theo mà chúng ta xem xét là hoạt động bổ sung trong đó ai đó cung cấp cho nhóm với thanh khoản bổ sung.

![](img/pic__00153.png)

Vì vậy, giả sử Charlie cũng tin rằng tỷ lệ từ A đến B phải là 1: 2 và anh ấy muốn đóng góp 400A và 800B.

Anh ta cũng có thể có các mã thông báo theo một tỷ lệ khác; tỷ lệ phản ánh niềm tin của anh ta vào giá trị tương đối thực sự của các mã thông báo.

Vì vậy, Charlie muốn thêm 400 A và 800 B, và anh ta tạo một giao dịch với hai đầu vào và hai đầu ra. Các đầu vào là nhóm và đóng góp của anh ấy, tính thanh khoản bổ sung của anh ấy và đầu ra là nhóm được cập nhật mà giờ đây, A và B của anh ấy đã được thêm vào mã thông báo của nhóm. Lưu ý rằng bây giờ mức dữ liệu đã thay đổi.

Vì vậy, chúng tôi đã có 1415 mã thông báo thanh khoản trước đây, và bây giờ chúng tôi có năm 1982, và sự khác biệt, 567, thuộc về Charlie. Vì vậy, đó là đầu ra thứ hai của giao dịch này và đó là phần thưởng cho Charlie vì đã cung cấp tính thanh khoản này.

Và ở đó, công thức có một chút phức tạp, nhưng về nguyên tắc, nó cũng hoạt động với sản phẩm. Vì vậy, bạn kiểm tra xem sản phẩm có giá trị bao nhiêu trước và sau khi mã thông báo được thêm vào và bạn tính đến số lượng đã được đúc. Điều đó cũng đảm bảo rằng bây giờ Alice về cơ bản kiếm được lợi nhuận từ các khoản phí mà Bob đã trả khi hoán đổi còn Charlie thì không.

Công thức cụ thể không quan trọng. Ý tưởng chỉ là nó công bằng.

Vì vậy, mọi người nên nhận được mã thông báo thanh khoản tương ứng với đóng góp của họ, nhưng nếu họ chỉ thêm thanh khoản sau khi một vài hoán đổi đã xảy ra, thì họ sẽ không kiếm được lợi nhuận từ các khoản phí đã tích lũy trong thời gian trước đó.

Hoạt động tiếp theo mà chúng tôi xem xét được gọi là `remove` và nó cho phép chủ sở hữu các mã thông báo thanh khoản cho một nhóm để đốt một số trong số chúng.

![](img/pic__00154.png)

Vì vậy, trong ví dụ này, hãy giả sử rằng Alice muốn đốt tất cả các mã thông báo thanh khoản của mình. Cô ấy cũng có thể giữ một số, cô ấy không cần phải đốt tất cả, nhưng trong ví dụ này, cô ấy muốn đốt tất cả 1415 mã thông báo thanh khoản của mình.

Vì vậy, để làm điều đó, cô ấy tạo một giao dịch khác với hai đầu vào và hai đầu ra, đầu vào là mã thông báo thanh khoản mà cô ấy muốn đốt và tất nhiên, gộp lại với`remove`- redeemer.

Kết quả đầu ra là các mã thông báo từ nhóm mà cô ấy nhận được để đổi lại, vì vậy trong trường hợp này, cô ấy sẽ nhận được 1078A và 1869B. Đầu ra thứ hai là nhóm được cập nhật.

Vì vậy, 1078A và 1869B đã bị xóa khỏi nhóm và dữ liệu đã được cập nhật, vì vậy 1415 mã thông báo thanh khoản mà Alice đã đốt hiện được trừ vào  1982 mà chúng tôi có trước đó. Chúng tôi thấy rằng 567 chiếc còn lại chính xác là những chiếc mà Charlie sở hữu.

Công thức về số lượng mã thông báo Alice nhận được để đốt mã thông báo thanh khoản một lần nữa hơi phức tạp, nhưng về cơ bản nó chỉ tương ứng.

Vì vậy, chúng tôi biết tổng cộng có 1982 mã thông báo thanh khoản  từ dữ liệu. Và về cơ bản cô ấy chỉ nhận được 1415:1982 của hồ bơi. Và cô ấy nhận được các mã thông báo theo tỷ lệ hiện tại.

Vì vậy, 1072: 1869 phải có cùng tỷ lệ với 1500: 2619, có nghĩa là bằng cách đốt, bạn không thay đổi tỷ lệ của nhóm.

Hoạt động cuối cùng `close` là để đóng hoàn toàn một nhóm và loại bỏ nó.

![](img/pic__00155.png)

Điều này chỉ có thể xảy ra khi các mã thông báo thanh khoản cuối cùng còn lại bị đốt.

Vì vậy, trong ví dụ của chúng tôi, Charlie nắm giữ tất cả 567 mã thông báo thanh khoản còn lại và do đó anh ta có thể đóng nhóm.

Để làm điều đó, anh ta tạo một giao dịch với ba đầu vào. Một là `factory`. Lưu ý rằng chúng tôi chỉ liên quan đến nhà máy khi chúng tôi tạo hồ bơi và bây giờ khi chúng tôi đóng cửa lại, điều đó cũng có nghĩa là sự cạnh tranh về nhà máy không cao lắm.

Vì vậy, `factory` chỉ tham gia khi các pool mới được tạo ra và khi các pool bị đóng cửa, nhưng một khi chúng tồn tại và miễn là chúng chưa bị đóng cửa, các hoạt động độc lập với nhà máy.

Chúng tôi chỉ cần `factory` khi chúng tôi muốn cập nhật danh sách các nhóm hiện có và nhân diện, danh sách này được sử dụng để đảm bảo rằng sẽ không có các nhóm trùng lặp. Vì vậy, hoạt động tạo mà chúng ta đã xem xét lúc đầu sẽ không thành công nếu ai đó cố gắng tạo một nhóm đã tồn tại cho một cặp mã thông báo đã tồn tại.

Được rồi, chúng ta hãy quay lại thao tác `close` .

Vì vậy, đầu vào đầu tiên là `factory` với trình đổi `close`, đầu vào thứ hai là nhóm mà chúng ta muốn đóng. Và đầu vào thứ ba là tất cả các mã thông báo thanh khoản còn lại.

Chúng tôi nhận được hai đầu ra, một là `factory` được cập nhật. Trong trường hợp này, chúng tôi chỉ có một nhóm, vì vậy danh sách chỉ chứa một nhóm này và nó hiện đã bị xóa khỏi danh sách. Đầu ra thứ hai chứa tất cả các mã thông báo còn lại, tất cả các mã thông báo vẫn còn trong nhóm khi nó bị đóng.

Vì vậy, các mã thông báo thanh khoản còn lại bị đốt và Charlie nhận được tất cả các mã thông báo còn lại từ nhóm.

Uniswap trên Plutus
-----------------

![](img/pic__00156.png)

Mã cho Uniswap thực sự là một phần của kho lưu trữ Plutus và nó nằm trong thư viện plutus-usecases, được chia thành bốn mô-đun được nhập bởi mô-đun Plutus.Contracts.Uniswap - OnChain, OffChain, Types và Pool.

Vì vậy, như tên gợi ý, OnChain chứa xác thực trên chuỗi, OffChain chứa các hợp đồng ngoài chuỗi, Loại chứa các loại phổ biến và Nhóm chứa logic kinh doanh, các phép tính, số lượng mã thông báo thanh khoản mà người tạo nhóm nhận được, bao nhiêu mã thông báo bạn nhận được khi thêm thanh khoản vào một nhóm, số lượng mã thông báo bạn nhận lại khi đốt mã thông báo thanh khoản và trong những điều kiện nào thì việc hoán đổi là hợp lệ.

Chúng tôi sẽ không trình bày quá chi tiết về tất cả những điều đó. Nó không có gì mà chúng ta chưa nói đến trước đây, nhưng ít nhất chúng ta hãy có một cái nhìn ngắn gọn.

Vì vậy, chúng ta hãy xem xét mô-đun Loại trước.

![](img/pic__00157.png)

`U` đại diện cho đồng tiền Uniswap, một đồng tiền xác định `factory`.

![](img/pic__00158.png)

`A` và `B`được sử dụng cho các hoạt động nhóm trong đó chúng tôi có hai loại mã thông báo này bên trong nhóm.

![](img/pic__00160.png)

`PoolState` là mã thông báo xác định một nhóm, thực sự trong sơ đồ trước đó tôi đã nói đó là một NFT. Theo định nghĩa, NFT là thứ chỉ tồn tại một lần. Trên thực tế ở đây trong quá trình triển khai cho mỗi nhóm, một đồng tiền giống hệt nhau được tạo ra để xác định nhóm đó. Vì vậy, nó không hoàn toàn là một NFT.

Tất cả các nhóm thanh khoản đều có một loại coin như vậy.

![](img/pic__00161.png)

`Liquidity` được sử dụng cho các mã thông báo thanh khoản mà các nhà cung cấp thanh khoản nhận được.

![](img/pic__00162.png)

Và tất cả các loại này sau đó được sử dụng trong loại coin A. Vì vậy, A là một tham số kiểu, được gọi là một kiểu `phantom`. Vì vậy, điều đó có nghĩa là nó không có đại diện tại run time. Nó chỉ được sử dụng để không trộn lẫn các đồng tiền khác nhau để giúp dễ dàng xem những gì sẽ đi đến đâu, vì vậy trong dữ liệu, một đồng coin chỉ đơn giản là một loại tài sản mà chúng ta đã thấy trước đây. Nhớ lại rằng đó `AssetClass` là sự kết hợp của ký hiệu tiền tệ và tên mã thông báo.

![](img/pic__00163.png)

Sau đó, số tiền chỉ là một trình bao bọc xung quanh số nguyên cũng chứa tham số kiểu ảo như vậy, để chúng ta không nhầm lẫn số lượng cho mã thông báo A và mã thông báo B, chẳng hạn.

![](img/pic__00164.png)

Sau đó, chúng tôi có một số hàm trợ giúp, ví dụ hàm `valueOf` để xây dựng `Value` từ `Coin` và `Amount`. Ở đây, ví dụ, chúng ta thấy việc sử dụng loại `phantom` này.

Đó thực sự là một thủ thuật phổ biến trong Haskell bởi vì bây giờ nếu bạn có, ví dụ, hoạt động gộp có hai đồng tiền khác nhau và hai số tiền khác nhau cho các đồng tiền khác nhau. Và nếu một cái được gắn thẻ loại này là vốn A và loại kia với vốn B, thì thông thường người ta có thể dễ dàng nhầm lẫn chúng và bằng cách nào đó thực hiện các thao tác với đồng này, với số tiền kia, và sau đó mắc lỗi.

Và ở đây, hệ thống loại thực thi rằng chúng tôi không làm điều đó. Vì vậy, chúng ta chỉ có thể sử dụng giá trị này của hàm, ví dụ, nếu chúng ta là một đồng coin và một số tiền có cùng loại thẻ.

Vì vậy, như tôi đã nói, đó là một thủ thuật phổ biến trong Haskell, một số lập trình cấp loại nhẹ không cần bất kỳ phần mở rộng GHC ưa thích nào.

Hàm `unitValue` tạo một số lượng của đồng coin đã cho và `isUnity` kiểm tra xem đồng coin này có được chứa giá trị chính xác một lần hay không,

Sau đó, `amountOf` kiểm tra tần suất đồng coin được chứa giá trị và cuối cùng `mkCoin` biến biểu tượng tiền tệ thành tên mã thông báo, thành đồng coin .


![](img/pic__00165.png)

Sau đó, chúng ta có kiểu Uniswap xác định phiên bản của hệ thống Uniswap mà chúng ta đang chạy. Vì vậy, tất nhiên, không ai có thể ngăn cản bất kỳ ai thiết lập một hệ thống Uniswap cạnh tranh với `factory` này, nhưng giá trị của loại này xác định một hệ thống cụ thể.

Và tất cả các hoạt động cụ thể cho pool sẽ được tham số hóa bởi một giá trị thuộc loại này, nhưng nó chỉ là một lớp bao bọc xung quanh đồng coin `U`. Và đó chỉ là NFT xác định `factory`.

![](img/pic__00166.png)

Sau đó, chúng tôi có một loại cho các nhóm thanh khoản, và về cơ bản đó chỉ là hai đồng coin, hai đồng coin trong đó.

Tuy nhiên, có một sự phức tạp nhỏ, có vấn đề là chỉ có hai loại mã thông báo bên trong nhóm , không có thứ tự, không có mã thông báo thứ nhất hoặc thứ hai.

![](img/pic__00167.png)

And in order to achieve that, the `Eq` instance has a special
implementation. If we want to compare two liquidity pools, we don\'t
just compare the first field with the first field of the other, and the
second with the second, but we also try the other way round.

So liquidity pool tokens AB would be the same as liquidity pool with
tokens BA. So that\'s the only slight complication here.

Và để đạt được điều đó, `Eq` có một cách triển khai đặc biệt. Nếu chúng ta muốn so sánh hai nhóm thanh khoản, chúng ta không chỉ so sánh trường đầu tiên với trường đầu tiên của trường kia và trường thứ hai với trường thứ hai, mà còn thử theo cách khác.

Vì vậy, nhóm thanh khoản mã thông báo AB sẽ giống như nhóm thanh khoản với mã thông báo BA. Vì vậy, đó là vấn đề nhỏduy nhất ở đây.

![](img/pic__00168.png)

Sau đó, chúng tôi xác định các hành động, về cơ bản đó là redeemer. Vì vậy, `Create` với lập luận `LiquidityPool` là để tạo ra một nhóm thanh khoản mới, `Close` là để đóng một pool, `Swap` là để hoán đổi, `Remove` là để loại bỏ thanh khoản và `Add` là để thêm thanh khoản.

Lưu ý rằng trong các sơ đồ mà chúng ta đã thấy trước đó để đơn giản hơn, `redeemer` được gọi đơn giản `Create`. Vì vậy, tôi đã không đề cập đến đối số này của loại nhóm thanh khoản.

![](img/pic__00170.png)

Dữ liệu phức tạp hơn một chút so với những gì chúng ta đã thấy trước đây. Nó không chỉ là một số nguyên đơn giản hoặc một kiểu đơn giản tương tự, nó là một kiểu `UniswapDatum`.

Có hai nhà xây dựng, một cho `factory` và một cho mỗi `pool`. `Factory` sẽ sử dụng `Factoryconstructor` và `pool` sẽ sử dụng `Poolconstructor`.

Và chúng ta đã thấy trước đây, dữ liệu chứa danh sách tất cả các nhóm thanh khoản hiện đang tồn tại. Và dữ liệu cho `Pool` chứa `LiquidityPool` mà chúng tôi không thấy trong biểu đồ. Nó cũng chứa một cái gì đó mà chúng ta đã thấy trong sơ đồ, lượng thanh khoản đã được đúc cho nhóm này. Hãy nhớ rằng điều đó được cập nhật khi ai đó thêm thanh khoản hoặc loại bỏ thanh khoản.

![](img/pic__00172.png)

Tiếp theo, hãy xem  mô-đun `Pool`, như tôi đã giải thích trước đây, chứa logic nghiệp vụ, các phép tính.

Vì vậy, chúng tôi có `calculateInitialLiquidity`. Nó nhận số lượng mã thông báo A và B ban đầu được đưa vào nhóm và trả lại các mã thông báo thanh khoản được trả lại để đổi lấy chúng.

Sau đó, `calculateAdditionalLiquidity` đối với trường hợp `pool` đã tồn tại và ai đó cung cấp thanh khoản bổ sung. Vì vậy, hai đối số đầu tiên là số lượng mã thông báo đã có trong đó. Sau đó, thứ ba là các mã thông báo thanh khoản đã được đúc cho nhóm. Và hai đối số tiếp theo là có bao nhiêu As và B được thêm vào nhóm. Kết quả là có bao nhiêu mã thông báo thanh khoản sẽ được đúc để đổi lấy số tiền bổ sung này.

![](img/pic__00173.png)

Các hàm `calculateRemoval` là đối với trường hợp ngược lại. Vì vậy, với bao nhiêu mã thông báo trong nhóm, bao nhiêu mã thông báo thanh khoản đã được đúc, bao nhiêu mã thông báo thanh khoản nên được loại bỏ? Nó cung cấp bao nhiêu mã thông báo A và B còn lại trong nhóm.

Bây giờ `checkSwap` được cho là chức năng trung tâm của toàn bộ hệ thống Uniswap. Nó tính toán một sự hoán đổi.

Đây là số lượng A và B ban đầu trong nhóm và điều này cho biết có bao nhiêu A và B sau khi hoán đổi trong nhóm. Và nó chỉ trả về cho dù điều đó có ổn hay không.

Vì vậy, về nguyên tắc, nó chỉ kiểm tra rằng tích của hai đối số cuối cùng lớn hơn tích của hai đối số đầu tiên.

Và chúng tôi đã lưu ý trước đây, nó phức tạp hơn một chút vì phí đã được tính đến. Vì vậy, trong trường hợp này, nó là 0,3% và bạn có thể thấy điều này được tính đến ở đây.

![](img/pic__00175.png)

Nó cũng đảm bảo rằng không có số tiền nào giảm xuống 0. Vì vậy, không được phép loại bỏ tất cả các loại tiền của một loại hoặc cả hai loại khỏi một nhóm. Điều đó cũng có ý nghĩa vì sản phẩm này, nếu một trong các yếu tố bằng 0, thì tất nhiên nó không thể lớn hơn trước.

Cuối cùng, có hàm `lpTicker` này. Nó chỉ là một hàm trợ giúp cung cấp một nhóm thanh khoản, tính toán tên mã thông báo cho mã thông báo thanh khoản. Ý tưởng ở đây là tên mã thông báo này chỉ nên phụ thuộc vào nhóm thanh khoản và phải là duy nhất. Vì vậy, mỗi cặp mã thông báo sẽ dẫn đến một tên mã thông báo duy nhất. Về nguyên tắc, nó chỉ lấy các ký hiệu tiền tệ và tên mã thông báo của hai mã thông báo hoặc đồng coin, ghép tất cả chúng và băm cái đó, sau đó sử dụng hàm băm của phép ghép để có được thứ gì đó duy nhất.

Một chút phức tạp ở đây là một lần nữa chúng ta phải đảm bảo rằng thứ tự của các đồng coin trong nhóm không quan trọng.

![](img/pic__00176.png)

#### Mã On-chain

Bây giờ chúng ta hãy xem xét phần on-chain. Chỉ có hai chức năng được dùng.

Đầu tiên `mkUniswapValidator`, để tạo trình xác thực cho Uniswap cả `factory` và `pool`, vì chúng chia sẻ cùng một địa chỉ tập lệnh. Chúng chỉ được phân biệt bởi số liệu và các đồng coin xác định chúng.

Sau đó `validateLiquidityForging` là kịch bản chính sách tiền tệ cho các mã thông báo thanh khoản, nhưng có rất nhiều mã trong mô-đun này và chúng tôi không muốn đi sâu vào chi tiết, chúng ta hãy xem xét cấu trúc sau.

![](img/pic__00178.png)

Vì vậy, hàm `mkUniswapValidator`. Hàm này chứa tất cả các trường hợp cho các `factory` và `pool` và các bộ định giá lại khác nhau.

Và chúng tôi có hàm `validateLiquidityForging`, đó là chính sách tiền tệ cho các token thanh khoản. Ý tưởng ở đây là nó không chứa bất kỳ logic nào và chỉ đơn giản là ủy quyền logic cho trình xác nhận Uniswap. Cách nó thực hiện là nó kiểm tra các đầu vào của giao dịch giả mạo và kiểm tra xem nó có chứa một `factory` hoặc chứa một pool hay không, bởi vì nếu có, thì chúng tôi biết rằng trình xác thực này sẽ chạy và sau đó trình xác thực có thể kiểm tra xem việc giả mạo có ổn không.

Cách nó kiểm tra xem các factory hoặc pool có phải là đầu vào hay không là thông qua các đồng coin xác định factory hoặc pool. Vì vậy, nó sẽ kiểm tra xem đồng coin factory Uniswap này có nằm trong đầu vào hay không hoặc một trong các đồng coin chung có nằm trong đầu vào hay không.

Và sau đó chúng tôi chỉ có các chức năng trợ giúp cho tất cả các trường hợp khác nhau và chúng trông khá dài nhưng tất cả đều đơn giản. Về cơ bản, đó là những gì chúng ta đã thấy trong sơ đồ, chỉ được trình bày chi tiết để tất cả các điều kiện này được thỏa mãn cho tất cả các trường hợp khác nhau.

![](img/pic__00179.png)

#### Mã off-chain

Cuối cùng, hãy xem mã off-chain.

![](img/pic__00181.png)

Không có gì ngạc nhiên ở đây, đó là tấm nồi hơi thông thường.

![](img/pic__00182.png)

Chúng tôi xác định hai lược đồ khác nhau. Ý tưởng là một cái dành cho thực thể tạo ra factory Uniswap và nó chỉ có một endpoint `start` và không có tham số.

Sau đó, một khi nó được tạo một lược đồ thứ hai cho những người sử dụng hệ thống Uniswap này và tất cả các hợp đồng trong đây sẽ được tham số hóa bởi phiên bản uniswap mà hành động đầu tiên tạo ra.

![](img/pic__00183.png)

Chúng tôi sử dụng cơ chế máy trạng thái, Cơ chế ghi monad này có thể truy cập thông qua `tell`, và về cơ bản đối với tất cả các hoạt động của người dùng, chúng tôi có trạng thái riêng của mình, chúng tôi gọi nó là trạng thái `UserContractState`.

Vì vậy, sẽ có một hợp đồng trợ giúp truy vấn cho tất cả các nhóm hiện có. Vì vậy, khi đó trạng thái sẽ sử dụng hàm tạo `Pools`  và sẽ trả về danh sách các nhóm ở dạng đơn giản - nó chỉ là một cặp lồng ghép các cặp tiền và số tiền trong mỗi nhóm.

Bây giờ chức năng trợ giúp để truy vấn số tiền hiện có của một ví sẽ chỉ trả về một giá trị.

Sau đó, các hàm tạo cho tất cả các hoạt động khác. Vì vậy, nếu chúng đã xảy ra, thì một trong những điều đó sẽ là trạng thái. Ví dụ: nếu chúng ta đã hoán đổi, thì sau đó trạng thái sẽ được cập nhật để hoán đổi. Nếu chúng tôi loại bỏ thanh khoản, nó sẽ được cập nhật thành loại bỏ, v.v.

![](img/pic__00184.png)

Sau đó, một số tên cho các mã thông báo khác nhau, vì vậy "Uniswap" sẽ là tên mã thông báo của NFT trong nhà máy Uniswap, "Trạng thái hồ bơi" sẽ là tên mã thông báo cho các đồng tiền xác định các nhóm thanh khoản.

Sau đó, tấm boiler thông thường của chúng ta để thực sự có được một phiên bản script.

![](img/pic__00185.png)

Và chính sách đối với mã thông báo thanh khoản.

Một số chức năng trợ giúp khác nhau,

![](img/pic__00186.png)

Sau đó, tất cả các tham số cho các endpoint. Vì vậy, ví dụ, nếu chúng ta muốn tạo một nhóm, chúng ta cần biết các mã thông báo và số lượng.

Nếu bạn muốn hoán đổi, nó phải biết các mã thông báo và số lượng để hoán đổi và ý tưởng trong kiểu dữ liệu `SwapParams` rằng một trong hai trường cuối cùng phải bằng không. Vì vậy, nếu bạn muốn đưa vào A và lấy ra B, chúng tôi sẽ chỉ định số lượng `spAmountA`  Như chúng tôi muốn đưa vào, nhưng chúng tôi sẽ để `spAmountB` ở mức 0 và ngược lại nếu chúng tôi muốn hoán đổi B lấy A .

`CloseParams` nếu bạn muốn đóng một nhóm - chúng tôi chỉ cần chỉ định nhóm nào. Vì vậy, chúng tôi cung cấp hai mã thông báo có trong đó.

`RemoveParams` - bạn phải chỉ định nhóm và bao nhiêu mã thanh khoản mà bạn muốn đốt.

`AddParams` - một lần nữa, xác định nhóm và có bao nhiêu A và bao nhiêu B mà chúng ta muốn thêm vào.

![](img/pic__00188.png)

Bây giờ ở đây chúng tôi đã thực hiện.

Vì vậy `start`, như chúng ta đã thấy, hãy thiết lập toàn bộ hệ thống và  một lần nữa sử dụng trường hợp sử dụng khác mà chúng ta đã sử dụng trước đây, `Currency.forgeContract` để đúc `NFT factory` sau đó được sử dụng để xác định `factory` Uniswap.

![](img/pic__00189.png)

Hợp đồng `create` là hợp đồng tạo ra một nhóm thanh khoản. Chúng tôi thấy rằng tất cả những điều này sẽ làm, như chúng tôi đã đề cập trước đây, được xác định bởi giá trị Uniswap, là kết quả của hợp đồng `start` này.

Vì vậy, chúng tôi có `create`,

![](img/pic__00190.png)

Chúng tôi có `close` lại được tham số hóa bởi Uniswap,

![](img/pic__00191.png)

`remove` 

![](img/pic__00192.png)

`add`

![](img/pic__00193.png)

và `swap`.

Tất cả các hàm này được sử dụng từ mô-đun `Pools`, có chứa logic nghiệp vụ. Vì vậy, điều đó sẽ được sử dụng cả trong trình xác thực, ở phía nội bộ, cũng như bên ngoài chuỗi trong các hợp đồng này ở đây.

![](img/pic__00194.png)

Hợp đồng `pools` chỉ truy vấn các nhóm hiện có. Vì vậy, nó tìm kiếm UTxO của nhà máy và kiểm tra dữ liệu, và như chúng ta biết, dữ liệu của nhà máy chứa danh sách tất cả các nhóm.

![](img/pic__00195.png)

Và cuối cùng `funds` chỉ cần kiểm tra tiền của chính chúng ta, tiền trong ví và trả lại.

Vì vậy, tất cả các giá trị này trả về nhưng chúng tôi muốn viết nó ở trạng thái, và điều này bây giờ đã được thực hiện xong các định nghĩa endpoint này.

![](img/pic__00197.png)

Vì vậy, trước tiên chúng ta phải `ownerEndpoint` fthiết lập toàn bộ hệ thống, chỉ sử dụng hợp đồng dừng.

Và sau đó chúng tôi có  `userEndpoints`, wkết hợp tất cả các hoạt động này mà người dùng có thể thực hiện.

Bây giờ không có giá trị trả về nữa, và thay vào đó chúng ta sử dụng trạng thái. Vì vậy, chúng tôi sử dụng `Last` một lần nữa, vì vậy trạng thái `told`cuối cùng sẽ giữ lại.

Và chúng tôi cũng cho phép sai sót, vì vậy nếu có lỗi trong một trong những hợp đồng này, thì chúng tôi sẽ bắt lỗi đó, nhưng sử dụng  `Left` để viết nó vào trong trạng thái. Nếu không có lỗi, chúng tôi viết giá trị trạng thái hợp đồng người dùng thích hợp trong trạng thái với hàm `Right` tạo bởi `Either`.

![](img/pic__00198.png)

Cuối cùng cúng ta có một endpoint `stop` đơn giản chỉ là dừng lại, nó không làm gì cả. Bất cứ lúc nào bạn có thể gọi `stop` hoặc một trong những cái khác, và nếu nó là một trong những cái khác thì đệ quy được gọi lại `userEndpoints`, nhưng trong trường hợp không `stop`, vì vậy nếu endpoint `stop` đã từng được gọi thì hợp đồng sẽ dừng lại.

Ngoài ra còn có các bài kiểm tra cho Uniswap có trong thư viện ca sử dụng Plutus này, nhưng chúng tôi sẽ không xem xét chúng ngay bây giờ.

Thay vào đó, hãy xem xét phần Plutus PAB và cách bạn có thể viết giao diện người dùng cho Uniswap.

Thực ra có một cái cũng được chứa trong repo Plutus. Nó nằm trong thư viện plutus-pab và trong thư mục ví dụ có một thư mục Uniswap chứa ví dụ về cách thực hiện điều đó.

![](img/pic__00200.png)

Điều này đã được sao chép nó vào repo Chương trình Tiên phong Plutus của chúng tôi và sửa đổi một chút để phù hợp hơn với mục đích của chúng tôi.

Khi chúng ta xem tệp Cabal cho mã của tuần này, có hai tệp thực thi.

Một uniswap-pab, sẽ chạy máy chủ PAB, và sau đó uniswap-client, là giao diện người dùng đơn giản dựa trên bảng điều khiển cho ứng dụng Uniswap.

![](img/pic__00201.png)

Bạn thấy đó, trong trường `other-modules`  có một mô-đun Uniswap và nó được liệt kê trong cả hai. Điều đó chứa một số định nghĩa chung được sử dụng bởi cả hai phần.

Vì vậy, đầu tiên chúng ta hãy nhìn vào điều đó.

![](img/pic__00202.png)

Trước hết, như chúng ta đã thấy với bản demo oracle, chúng ta cần một số kiểu dữ liệu nắm bắt các trường hợp khác nhau mà chúng ta có thể chạy cho ví. Trong trường hợp này, chúng tôi có ba trường

`Init`chưa từng được đề cập trước đây, điều đó không liên quan cụ thể đến Uniswap, điều này chỉ được sử dụng để tạo một số mã thông báo mẫu và phân phối chúng trong thời gian đầu.

`UniswapStart` ctương ứng với lược đồ bắt đầu Uniswap hoặc chủ sở hữu Uniswap mà chúng ta đã thấy vừa rồi để thiết lập toàn bộ hệ thống.

`UniswapUser` tương ứng với phần khác, với các endpoint khác nhau để tương tác với hệ thống. Và phương thức khởi tạo lớp này được tham số hóa bởi một giá trị kiểu Uniswap, là kết quả của việc khởi động. Vì vậy, sau khi khởi động hệ thống, kết quả sẽ là kiểu Uniswap và điều này sau đó là cần thiết để tham số hóa máy khách.

![](img/pic__00203.png)

Sau đó, có một file,hàm `initContract` f phân phối các khoản tiền ban đầu. Vì vậy, nó một lần nữa sử dụng `forgeContract` những  gì chúng ta đã thấy trước đây.

à bây giờ nó tạo ra các mã thông báo với tên mã thông báo A, B, C, D với 1 triệu mỗi mã. Trên thực tế, nó cũng nhân số đó với số lượng ví. Vì vậy, trong trường hợp này, tôi muốn sử dụng bốn ví, ví từ một đến bốn, vì vậy nó thực sự là 4 triệu trong số mỗi mã thông báo sẽ được giả mạo.

Và một khi chúng đã được giả mạo, chúng sẽ được gửi từ ví giả mạo đến tất cả các ví khác. Vì vậy, một ví giả mạo bốn triệu mỗi ví, sau đó lặp lại các ví khác và gửi cho chúng 1 triệu mỗi ví.

Vì vậy, điều này chỉ cần thiết để thiết lập các mã thông báo mẫu và phân phối chúng giữa các ví.

Hàm `cidFile` chỉ là một hàm trợ giúp vì để giao tiếp các ID phiên bản hợp đồng khác nhau và những thứ khác mà chúng ta cần, chúng ta sử dụng tệp trợ giúp và đây là hàm cung cấp tên tệp cho một ví nhất định.

![](img/pic__00205.png)

Vì vậy, bây giờ chúng ta hãy xem xét phần PAB.

Đầu tiên là file mà chúng ta đã thấy trước đó để thực sự kết nối cơ chế PAB với các hợp đồng thực tế. Nó sử dụng các hợp đồng Uniswap mà chúng ta vừa xác định với ba hàm `Init`, `UniswapStart`
và `UniswapUser`.

Vì vậy, `UniswapUser`: Người dùng sẽ sử dụng lược đồ `UniswapUser` cái mà chúng ta đã định nghĩa trước đó, `UniswapStart` sẽ sử dụng lược đò `UniswapOwner` cái mà chúng ta đã định nghĩa trước đó và `Init` sẽ sử dụng một lược đồ không có endpoints.

Và chúng tôi kết nối các nhà xây dựng này với các hợp đồng thực tế. Vì vậy, `UniswapUser` với đối số `us` sẽ sử dụng `userEndpoints` cái mà chúng ta đã xem xét trước đó, `UniswapStart` sẽ sử dụng `ownerEndpoint` và `Init` sẽ sử dụng  `initContract` cái mà chúng ta vừa xác định, và đó chỉ để trình diễn để tạo ra những đồng coin ban đầu này.

![](img/pic__00206.png)

Bây giờ chúng ta có thể nhìn vào chương trình chính.

Vì vậy, trong `Simulator` chúng tôi thực hiện một số điều nhất định. Đầu tiên, chúng tôi thiết lập toàn bộ hệ thống, chúng tôi khởi động máy chủ và yêu cầu xử lý để tắt nó một lần nữa.

Điều đầu tiên là Ví 1 kích hoạt hợp đồng `Init`. Chúng tôi biết từ việc xem mã những gì sẽ làm, nó sẽ đúc tất cả các mã thông báo ví dụ này, ABCD, 4 triệu mỗi mã, và sau đó phân phối chúng để các ví từ một đến bốn kết thúc bằng 1 triệu trong số bốn mã thông báo khác nhau.

Điều này sẽ đồng thời bắt đầu hợp đồng này, nhưng sau đó tiếp tục ngay lập tức - nó sẽ không chặn - vì vậy chúng tôi sử dụng `waitForState` điều mà chúng tôi đã thấy khi chúng tôi nói về oracles, để đợi cho đến khi `Init` trả về.

Điều `Init` sẽ làm là nó sẽ viết ký hiệu tiền tệ của các ví dụ vào trạng thái. Vì vậy, chúng tôi đợi cho đến khi chúng tôi thấy điều đó và sau đó chúng tôi nhớ nó và chúng tôi đợi cho đến khi  `Init`  kết thúc.

Và sau đó chúng tôi ghi ký hiệu tiền tệ vào tệp `symbol.json`. Chúng tôi sử dụng hàm `encode`  từ `Data.Aeson`, thư viện `json` chuẩn `json` ở Haskell.

Sau đó, một lần nữa đối với Ví 1, chúng tôi khởi động hệ thống Uniswap. Vì vậy, chúng tôi sử dụng hàm `UniswapStart` và chúng tôi lại sử dụng hàm `waitForState` để đợi cho đến khi chúng tôi nhận được kết quả. Kết quả của `UniswapStart` như chúng ta đã thấy trước đó sẽ là một giá trị kiểu `Uniswap` và chúng ta cần giá trị đó để tham số hóa các hợp đồng người dùng.

Vì vậy, chúng tôi đợi cho đến khi chúng tôi nhận được điều này và gọi nó là `us`, và bây giờ `Uniswap`- hệ thống đang chạy và bây giờ chúng tôi có thể bắt đầu các phiên bản người dùng cho tất cả các ví.

Vì vậy, chúng tôi lặp qua tất cả các ví và kích hoạt  `UniswapUser`  hiện được tham số hóa bằng giá trị `us` mà chúng tôi nhận được trong bước trước ở đây.

Bây giờ chúng ta có những tay cầm này và để tương tác, giao tiếp, từ front-end với máy chủ, chúng ta cần những tay cầm này. Vì vậy, chúng tôi ghi chúng vào một tệp và đây là nơi chúng tôi sử dụng chức năng trợ giúp `cidFile` mà chúng tôi đã thấy trước đó.

Vì vậy, chúng tôi sẽ kết thúc với bốn tệp `w1.cid` đến `w4.cid`, chứa các ID phiên bản hợp đồng này cho bốn hợp đồng.

Sau đó, chúng tôi chỉ cần đợi cho đến khi người dùng nhập khóa và sau đó chúng tôi có thể tắt máy chủ.

![](img/pic__00208.png)

Hãy thử điều này với `cabal run uniswap-pab`.

Rất nhiều thứ đang xảy ra. Hãy nhớ rằng, đầu tiên chúng tôi tạo ra những mã thông báo mẫu ABCD này, và sau đó chúng tôi cần phân phối chúng đến các ví khác.

Sau đó, chúng ta phải khởi động hệ thống Uniswap. Và đối với điều đó, trước tiên chúng ta phải tạo Uniswap NFT xác định nhà máy và sau đó tạo UTxO ban đầu cho factory có chứa danh sách các nhóm trống.

![](img/pic__00209.png)

Bây giờ chúng ta thấy rằng tất cả các hợp đồng `UniswapUser` đã bắt đầu cho từng ví trong số bốn ví.

Nếu chúng ta nhìn, chúng ta thấy các tệp khác nhau, vì vậy chúng ta có thể nhìn vào chúng.

File `symbol.json` biểu tưởng tiền tệ của các mã thông báo ví dụ cũng vậy và chúng ta cần điều đó để tham khảo chúng .

![](img/pic__00211.png)

Và sau đó chung tôi có các file `w1.cid` -> `w4.cid` Nếu bạn nhìn vào một trong số đó, họ giữ ID phiên bản hợp đồng cho các phiên bản hợp đồng cho bốn ví.

Chúng tôi cần những thứ này để tìm các endpoint HTTP chính xác để giao tiếp với chúng.

![](img/pic__00212.png)

Hãy xem xét khách hàng tiếp theo.

Đối với oracle, điều này cũng được viết rằng trong Haskell sử dụng cùng một thư viện để thực hiện các yêu cầu HTTP.

Trong chương trình chính, chúng tôi mong đợi một tham số dòng lệnh, chỉ là một số từ một đến bốn, để chương trình chính biết nó đang chạy ví nào.

Sau đó, chúng tôi đọc tệp CID tương ứng để lấy ID phiên bản hợp đồng cho ví đó. Chúng tôi đọc tệp `symbol.json` này để lấy ký hiệu tiền tệ của các mã thông báo mẫu. Chúng tôi sử dụng hàm `readFile` ở thư viện `ByteString` và `decode` đến từ thư viện `Data.Aeson` để giải mã json trở lại kiểu dữ liệu Haskell.

Chúng tôi kiểm tra xem có lỗi không và nếu không, chúng tôi gọi `go` hàm mà chúng tôi chuyển ID phiên bản hợp đồng và ký hiệu tiền tệ.

![](img/pic__00213.png)

Và sau đó nó chỉ là một vòng lặp. Chúng tôi đọc một lệnh từ bảng điều khiển và sau đó tùy thuộc vào lệnh, chúng tôi liên quan đến các chức năng trợ giúp khác nhau. Các lệnh tương ứng chính xác với các endpoint mà chúng ta có, ngoại trừ lệnh dừng, không được thực hiện.

Vì vậy, chúng tôi có thể truy vấn số tiền của mình, chúng tôi có thể tìm kiếm các nhóm hiện có, chúng tôi có thể tạo một nhóm, chúng tôi có thể thêm thanh khoản vào một nhóm, chúng tôi có thể xóa thanh khoản khỏi một nhóm, chúng tôi có thể đóng một nhóm và chúng tôi có thể hoán đổi, đó là toàn bộ điểm.

Vì vậy, đối với mỗi cái đó, chúng ta có một hàm tạo trong Commandkiểu dữ liệu.

Bởi vì ký hiệu tiền tệ sẽ luôn là `cs` - mã thông báo mẫu của chúng tôi, chúng tôi không cần tham số hóa biểu tượng tiền tệ. Và vì tên mã thông báo chỉ là A, B, C và D nên chúng ta chỉ có thể sử dụng một ký tự cho điều đó.

Vì vậy, ví dụ, `Create Integer Character Integer Character` có nghĩa là tạo một nhóm thanh khoản với một số lượng nhất định của một mã thông báo nhất định và một số lượng nhất định của mã thông báo thứ hai.

![](img/pic__00214.png)

Hàm `readCommandIO` đọc từ bàn phím và sau đó cố gắng để vượt qua điều đó như một lệnh. Nếu nó không thành công, nó sẽ chỉ gọi lại lệnh đọc một lần nữa. Nếu thành công, nó sẽ trả về lệnh.

Sau đó, chỉ có các chức năng trợ giúp khác nhau để chuyển đổi một thứ gì đó thuộc kiểu `Command` thành các kiểu tham số tương ứng, như
`CreateParams` or `AddParams` từ mô-đun Uniswap mà chúng ta đã thấy trước đó.

![](img/pic__00215.png)

Hàm `showCoinHeader` và `showCoin` chỉ để làm cho nó trông đẹp hơn một chút khi chúng tôi truy vấn quỹ hoặc nhóm, sau đó chúng tôi có các endpoint khác nhau và tất cả đều sử dụng một số chức năng trợ giúp.

![](img/pic__00216.png)

Đó là `getStatus`, thứ chúng ta cần để lấy lại thứ gì đó từ các hợp đồng và gọi `callEndpoint` thứ sử dụng từ thư viện `Req` , giống như lần trước.

Phần thú vị là yêu cầu. Nó sẽ là yêu cầu đăng và chúng tôi phải cung cấp  phiên bản `ID`. Đây là loại `UUID`, vì vậy chúng tôi chỉ cần chuyển đổi nó thành một chuỗi và sau đó đóng gói nó thành một văn bản vì thư viện HTTP này mong đợi `Text`.

Nội dung yêu cầu phụ thuộc vào đối số thứ ba trong hàm.

Phản hồi sẽ luôn như vậy `Unit` và chúng tôi chỉ kiểm tra xem chúng tôi có nhận được mã trạng thái 200 hay không.

Đây `getStatus` là một yêu cầu nhận được gọi endpoint `status  HTTP`, một lần nữa với CID.

Chúng tôi phải cho nó biết những gì chúng tôi đang xử lý, vì vậy đó là lý do tại sao chúng tôi cần kiểu `UniswapContracts`  và đó cũng là lý do tại sao ứng dụng khách Uniswap này cũng cần quyền truy cập vào mô-đun Uniswap này.

Và sau đó chúng tôi chỉ cần kiểm tra xem trạng thái có trống không, điều này xảy ra ngay từ đầu bởi vì đó là trước khi bất cứ điều gì nói với trạng thái. Sau đó, chúng tôi đợi một giây và đệ quy và nếu có một trạng thái (nếu có `Just e`), thì chúng tôi biết rằng đây là loại `Either Text UserContractState`.

Nhớ lại `UserContractState` này có một hàm tạo cho mỗi endpoint, nhưng nếu có lỗi trong quá trình thực thi hợp đồng, chúng tôi sẽ nhận được thông báo lỗi là một `Text`.

Và nếu có gì đó sai, thì chúng ta kết thúc ở trường hợp thứ ba. Với hai hàm này - `getStatus` và `getEndpoint`- thật dễ dàng để viết tất cả các trường hợp cho các endpoint.

![](img/pic__00217.png)

Vì vậy, chúng ta có thể xem xét một `getFunds`,. Chúng tôi sử dụng `callEndpoint` mà chúng tôi vừa thấy. Đối với endpoint có tên là "funds", và trong trường hợp này, đối số, phần thân yêu cầu, chỉ là `Unit`.

Chúng tôi đợi trong hai giây và sau đó sử dụng `getStatus`. Nếu chúng tôi nhận được một `Right`, thì chúng tôi hiển thị các khoản tiền, nếu không chúng tôi lặp lại.

Vì vậy, chúng tôi chờ đợi cho đến khi chúng tôi nhận được `Right`, bởi vì trong trường hợp này "funds" không bao giờ bị hỏng. Không có cách nào có thể thất bại, vì vậy chúng ta có thể yên tâm chờ đợi mãi mãi.

![](img/pic__00218.png)

Hàm `getPools` cũng tương tự. Nó ít nhiều giống nhau, ngoại trừ việc thay vì "funds", mà là "pools".

Hãy xem xét một ví dụ khác, để tạo một pool.

![](img/pic__00219.png)

Một lần nữa, chúng tôi gọi endpoint và chúng tôi đợi trong hai giây. Ở đây thực sự có thể xảy ra sự cố. Ví dụ: nếu chúng tôi cố gắng tạo một nhóm trong đó cả hai đồng tiền giống nhau hoặc nếu chúng tôi chỉ định thanh khoản lớn hơn số tiền tồn tại trong ví, thì chúng tôi sẽ gặp lỗi.

Vì vậy, trong trường hợp này, nếu chúng tôi gặp lỗi, chúng tôi chỉ cần đăng nhập nó vào bảng điều khiển.

Các trường hợp cho tất cả các endpoint khác rất giống nhau.

Dùng thử
-------------

Bây giờ chúng ta hãy thử nó ra.

Hãy bắt đầu ba trường hợp cho ví một, hai và ba và cố gắng tạo lại kịch bản từ sơ đồ ở phần đầu.

Chúng tôi bắt đầu nó đơn giản bằng cách sử dụng cabal runvới một tham số dòng lệnh cho số lượng của ví.

``` {.haskell}
cabal run uniswap-client -- 1
```

Và chúng tôi cũng làm như vậy đối với ví 2 và 3.

![](img/pic__00220.png)

Tại đây, chúng tôi thấy các thông báo nhật ký cho ID phiên bản hợp đồng và biểu tượng cho mã thông báo mà chúng tôi có thể sử dụng.

Vậy chúng ta có thể làm gì?

Ví dụ, chúng tôi có thể truy vấn tiền của chúng tôi.

![](img/pic__00221.png)

Và chúng ta thấy rằng chúng ta có A, B, C, D với 1 triệu mỗi cái và 100.000 Ada.

Chúng tôi cũng có thể tìm kiếm các hồ bơi, nhưng hiện tại, không nên có bất kỳ hồ bơi nào và thực sự là không có hồ bơi nào được liệt kê.

![](img/pic__00222.png)

Vì vậy, hãy chuyển sang Ví 1, giả sử đây là Alice, Bob là 2 và Charlie là 3.

Trong sơ đồ, chúng tôi bắt đầu với việc Alice thiết lập một nhóm thanh khoản cho 1000 mã thông báo A và 2000 mã thông báo B.

Vì vậy, để làm điều này ở đây, chúng ta có thể nhập

``` {.haskell}
Create 1000 'A' 2000 'B'
```

Hãy nhớ rằng đó là loại `Char`, vì vậy chúng tôi sử dụng dấu ngoặc kép.

Chúng tôi nhận được thông số trạng thái đã tạo.

![](img/pic__00223.png)

Vì vậy, nó dường như đã hoạt động. Chúng tôi có thể truy vấn các nhóm một lần nữa, và thực sự là có một nhóm ngay bây giờ.

![](img/pic__00224.png)

Chúng ta thấy rằng nó có A và B và với số tiền đúng là 1000 và 2000 tương ứng.

Bước tiếp theo là Bob đổi 100A lấy B. Vì vậy, trong bảng điều khiển đang chạy ví của Bob, chúng ta có thể viết

``` {.haskell}
Swap 100 'A' 'B'
```

Hãy kiểm tra xem Bob hiện có bao nhiêu tiền. Như dự đoán, anh ta có ít hơn 100 A và nhiều hơn 181 B .

![](img/pic__00225.png)

Tiếp theo Charlie thêm thanh khoản.

``` {.haskell}
Add 400 'A' 800 'B'
```

Bây giờ chúng ta kiểm tra lại các hồ bơi.

Đó là 1500 và 2619. Lúc đầu chúng tôi có 1000, sau đó là 100, do Bob thêm vào và bây giờ là 400 bởi Charlie.

![](img/pic__00226.png)

Bây giờ, nếu chúng ta quay trở lại Alice, cô ấy muốn xóa thanh khoản của mình. Vì vậy, trước tiên hãy truy vấn số tiền của cô ấy.

![](img/pic__00227.png)

Vì vậy, cô ấy có ít A và B hơn bây giờ vì cô ấy cung cấp chúng làm thanh khoản cho nhóm, nhưng cô ấy có 1415 mã thông báo thanh khoản.

Vì vậy, chẳng hạn, cô ấy có thể đốt các mã thông báo thanh khoản và lấy các mã thông báo để đổi lấy. Cô ấy không cần phải đốt cháy tất cả, nhưng trong sơ đồ cô ấy đã làm. Vì vậy, chúng ta hãy làm điều này, vì vậy

``` {.haskell}
Remove 1415 'A' 'B'
```

Và hãy truy vấn lại số tiền của cô ấy.

![](img/pic__00228.png)

Vì vậy, bây giờ cô ấy không có mã thông báo thanh khoản nữa, nhưng cô ấy đã nhận lại As và B.

Vì vậy, cô ấy nhận được 1869Bs và 1070 A.

Bước cuối cùng là Charlie đóng hồ bơi. Vì vậy, hãy chuyển sang Charlie

``` {.haskell}
Close 'A' 'B'
```

![](img/pic__00229.png)

Và nếu bây giờ chúng tôi tìm kiếm các hồ bơi, thì một lần nữa, chúng tôi không nhận được bất kỳ hồ bơi nào. Vì vậy, tất cả dường như hoạt động.

Cuối cùng, chúng ta sẽ xem xét cách sử dụng front-end mà không cần Haskell và chỉ sử dụng một số thứ như curl.

Hãy xem tệp `status.sh` mà bạn sẽ tìm thấy trong thư mục `code`.

![](img/pic__00230.png)

Tập lệnh này mong đợi một đối số, đó là ví.

Sau đó, chúng tôi sử dụng `curl` với URL này và nội lấy nội dung của tệp ví chính xác được cung cấp bởi tham số đầu tiên.

Và bởi vì đầu ra rất khó sử dụng, chúng tôi chuyển nó qua `jq` và lấy trạng thái hiện tại và trạng thái có thể quan sát được của kết quả `json` .

Vì vậy, nếu tôi thử điều này ngay bây giờ cho Ví 1, chẳng hạn, chúng tôi thấy rằng ví hiện tại có số lượng mã thông báo ABCD này.

![](img/pic__00230.png)

Ít nhất đó là trạng thái cuối cùng. Có lẽ nó không được cập nhật.

Hãy cũng nhìn vào `funds.sh`.

![](img/pic__00231.png)

Vì vậy, một lần nữa, chỉ lấy một tham số, một đối số, ví, để đặt ID phiên bản chính xác trong URL, sau đó sử dụng endpoint `funds` .

Và đây là một yêu cầu POST, vì vậy chúng tôi cần một nội dung yêu cầu. Điều này là `Unit` do endpoint của `funds` không yêu cầu bất kỳ đối số nào ngoại trừ đối số `Unit` .

Thú vị hơn một chút là phải làm gì với yêu cầu POST có các đối số thú vị. Ví dụ: nếu bây giờ, Wallet 1 muốn tạo lại một nhóm với 1000A và 2000 B. Trong trường hợp đó, chúng tôi cần một phần thân yêu cầu cho các tham số chính xác cho CreateParams.

Vì vậy, chúng ta hãy xem xét điều này trong `create.sh`

![](img/pic__00232.png)

Về nguyên tắc, curl rất đơn giản, vì vậy bây giờ một lần nữa, ID phiên bản hợp đồng nhưng bây giờ với endpoint `create`. Nhưng câu hỏi là viết gì trong cơ thể này.

Chúng tôi sử dụng các đối số tương tự để triển khai Haskell. Vì vậy, đầu tiên là ví và sau đó là số tiền A, mã thông báo A, số tiền B và mã thông báo B.

Vì vậy, có lẽ trước tiên chúng ta nên kiểm tra xem nó có hoạt động hay không.

``` {.haskell}
./create.sh 1 1000 A 2000 B
```

![](img/pic__00233.png)

Và bây giờ nếu chúng ta đợi một vài giây và sau đó truy vấn trạng thái, nó sẽ được cập nhật.

![](img/pic__00234.png)

Bây giờ chúng ta có thể chạy

``` {.haskell}
./status.sh 1
```

![](img/pic__00235.png)

Bây giờ chúng tôi có nhóm thanh khoản mới này với A và B.

Vì vậy, câu hỏi còn lại là, làm thế nào chúng ta có được phần thân JSON cho lệnh gọi curl? Thật khó để làm điều này bằng tay, nhưng nếu chúng ta nhìn lại đầu ra Haskell, những gì chúng ta đã làm ở đây, chẳng hạn như tạo, luôn viết URL mà chúng ta đang gọi và cả nội dung yêu cầu.

Và chúng tôi có thể kiểm tra mã cho điều này. Nếu chúng ta nhìn vào uniswap-client. Nó nằm trong chức năng trợ giúp `callEndpoint` trong dòng 216 và 217.

![](img/pic__00237.png)

Vì vậy, chúng tôi nhận được `a`, đó chỉ là một giá trị Haskell với một phiên bản `ToJSON` có thể được mã hóa thành `JSON` và chúng tôi chỉ sử dụng mã hóa từ thư viện Aeson. Đây bây giờ là một chuỗi byte, nhưng để ghi điều đó vào bảng điều khiển, chúng tôi cần hai chuỗi, vì vậy chúng tôi sử dụng một cái gì đó từ thư viện `ByteString`

``` {.haskell}
Data.ByteString.Lazy.Char8
```

Và chúng tôi giải nén ByteString này thành một chuỗi và sau đó ghi lại nó. Vì vậy, đây là một cách tốt để tìm ra những yêu cầu các cơ quan sử dụng.

Tất nhiên, bạn không phải viết toàn bộ chương trình, bạn cũng có thể làm điều đó trong REPL. Bạn chỉ cần một giá trị của loại chính xác và sau đó sử dụng Aeson để mã hóa nó và nhìn vào kết quả và sau đó bạn sẽ thấy hình dạng của json mà bạn mong đợi.
