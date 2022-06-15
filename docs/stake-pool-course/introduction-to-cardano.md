---
id: introduction-to-cardano
title: (Re)introduction into Cardano
sidebar_label: (Re)introduction into Cardano
description: "Stake pool course: (Re)introduction into Cardano."
#image: ../img/og-developer-portal.png
---

Phát triển Cardano không phải là một công việc nhỏ. Không có dự án nào khác đã từng được xây dựng theo các tham số này, kết hợp nghiên cứu mật mã được đánh giá ngang hàng với việc triển khai bằng mã Haskell bảo mật cao.

Đây không phải là mã sao chép và dán được thấy trong rất nhiều blockchain khác. Thay vào đó, Cardano được thiết kế với đầu vào từ một nhóm lớn toàn cầu bao gồm các chuyên gia và giáo sư hàng đầu trong lĩnh vực ngôn ngữ lập trình máy tính, thiết kế mạng và mật mã.

Chúng tôi vô cùng tự hào về Cardano, quá trình phát triển đòi hỏi một quá trình phát triển tỉ mỉ và chăm chỉ kéo dài hàng tháng của các kỹ sư tài năng của chúng tôi.

## Tại sao lại là Cardano?
Nếu bạn chưa xem, hãy xem video về whiteboard huyền thoại năm 2017. Một số chi tiết hơi lỗi thời, nhưng vẫn rất đáng xem để hiểu Cardano là gì và Cardano đến từ đâu.

<iframe width="100%" height="325" src="https://www.youtube.com/embed/Ja9D0kpksxw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Sự đồng thuận được hiểu như thế nào?

Sự đồng thuận là quá trình mà tất cả những người tham gia vào việc vận hành blockchain đều đạt được ý kiến ​​đa số. Phải có thỏa thuận về việc sản xuất khối nào, áp dụng chuỗi nào và xác định trạng thái duy nhất của mạng. Giao thức đồng thuận xác định cách các nút riêng lẻ đánh giá trạng thái hiện tại của hệ thống sổ cái và đạt được sự đồng thuận. Nó có ba trách nhiệm chính; để thực hiện kiểm tra của người lãnh đạo và quyết định xem có nên sản xuất một khối hay không, để xử lý việc lựa chọn chuỗi và xác minh các khối được sản xuất.

Blockchains tạo ra sự đồng thuận bằng cách cho phép người tham gia gói các giao dịch mà những người khác đã gửi đến hệ thống thành các khối và thêm chúng vào chuỗi của chúng (chuỗi các khối). Xác định ai được phép tạo ra một khối khi nào và phải làm gì trong trường hợp xung đột, (chẳng hạn như hai người tham gia thêm các khối khác nhau tại cùng một điểm của chuỗi), là mục đích của các giao thức đồng thuận khác nhau. Giao thức đồng thuận bằng chứng cổ phần mang tính đột phá của chúng tôi [Ouroboros](https://iohk.io/en/blog/posts/2020/06/23/the-ouroboros-path-to-decentralization/) được chứng minh là có cùng các đảm bảo an ninh mà bằng chứng công việc có. Các đảm bảo an ninh nghiêm ngặt được thiết  [lập bởi Ouroboros](https://iohk.io/en/blog/posts/2020/03/23/from-classic-to-hydra-the-implementations-of-ouroboros-explained/) và nó đã được cung cấp với một số bài báo được đánh giá ngang hàng đã được trình bày trong các hội nghị và ấn phẩm cấp cao nhất trong lĩnh vực an ninh mạng và mật mã. Các cách triển khai khác nhau của Ouroboros đã được phát triển. Để biết thêm chi tiết về từng góc cạnh của Ouroboros, bạn có thể đọc thông số kỹ thuật cho [Classic](https://iohk.io/en/research/library/papers/ouroborosa-provably-secure-proof-of-stake-blockchain-protocol/), [Byzantine Fault Tolerance (BFT)](https://iohk.io/en/research/library/papers/ouroboros-bfta-simple-byzantine-fault-tolerant-consensus-protocol/), [Genesis](https://iohk.io/en/research/library/papers/ouroboros-genesiscomposable-proof-of-stake-blockchains-with-dynamic-availability/), [Praos](https://iohk.io/en/research/library/papers/ouroboros-praosan-adaptively-securesemi-synchronous-proof-of-stake-protocol/), và gần đây là giải pháp khả năng mở rộng [Hydra](https://eprint.iacr.org/2020/299.pdf)


## Ủy thác Pools

Bằng cách chạy một nút Cardano, người dùng tham gia và đóng góp vào mạng.

Nhóm liên quan là một nút máy chủ đáng tin cậy tập trung vào việc bảo trì và nắm giữ quyền lợi tổng hợp của các bên liên quan khác nhau trong một thực thể duy nhất. Các nhóm cổ phần chịu trách nhiệm xử lý các giao dịch và sản xuất các khối mới và là cốt lõi của Ouroboros, giao thức chứng minh cổ phần của Cardano.

Để đảm bảo an toàn, Ouroboros yêu cầu một số lượng lớn chủ sở hữu ada phải trực tuyến và duy trì kết nối mạng đủ tốt tại bất kỳ thời điểm nào. Đây là lý do tại sao Ouroboros dựa vào các nhóm cổ phần, các thực thể cam kết chạy giao thức 24/7, thay mặt cho các chủ sở hữu ada đóng góp.

Mặc dù Ouroboros rẻ hơn để chạy so với giao thức bằng chứng công việc (POW), nhưng việc chạy Ouroboros vẫn phải chịu một số chi phí. Do đó, các nhà điều hành nhóm cổ phần được thưởng khi chạy giao thức dưới dạng các ưu đãi đến từ phí giao dịch và từ lạm phát (miners)của nguồn cung lưu hành của ada.

## Các khối mới được sản xuất như thế nào?

Mục tiêu của công nghệ blockchain là sản xuất một chuỗi bản ghi (khối) có thể xác minh độc lập và được liên kết bằng mật mã. Một mạng lưới các nhà sản xuất khối hoạt động để thúc đẩy chuỗi khối chung. Giao thức đồng thuận cung cấp tính minh bạch và quyết định khối ứng cử viên nào nên được sử dụng để mở rộng chuỗi.

Các giao dịch hợp lệ đã gửi có thể được đưa vào bất kỳ khối mới nào. Một khối được ký bằng mật mã bởi nhà sản xuất của nó (nhóm cổ phần) và được liên kết với khối trước đó trong chuỗi. Điều này làm cho không thể xóa các giao dịch khỏi một khối, thay đổi thứ tự của các khối, xóa một khối khỏi chuỗi (nếu nó đã có một số khối khác theo sau nó) hoặc chèn một khối mới vào chuỗi mà không cần cảnh báo tất cả những người tham gia mạng. Điều này đảm bảo tính toàn vẹn và minh bạch của việc mở rộng chuỗi khối.

### Slots and Epochs

Chuỗi khối Cardano sử dụng giao thức Ouroboros Praos để tạo sự đồng thuận trên chuỗi.

Ouroboros Praos chia thời gian thành các kỷ nguyên. Mỗi kỷ nguyên Cardano bao gồm một số khe, mỗi khe kéo dài trong một giây. Một kỷ nguyên Cardano hiện bao gồm 432.000 vị trí (5 ngày). Trong bất kỳ vị trí nào, không hoặc nhiều nút tạo khối có thể được đề cử làm vị trí dẫn đầu vị trí. Trung bình, một nút dự kiến ​​sẽ được đề cử sau mỗi 20 giây, với tổng số 21.600 đề cử mỗi kỷ nguyên. Nếu các nhà lãnh đạo vị trí được bầu ngẫu nhiên tạo ra các khối, một trong số chúng sẽ được thêm vào chuỗi. Các khối ứng cử viên khác sẽ bị loại bỏ.

### Bầu vị trí lãnh đạo (slot Leader).

Mạng Cardano bao gồm một số nhóm liên quan kiểm soát tổng cổ phần của các chủ sở hữu của họ và những người ủy quyền khác, còn được gọi là các bên liên quan. Các nhà lãnh đạo vị trí được bầu ngẫu nhiên trong số các nhóm cổ phần. Càng kiểm soát được nhiều cổ phần, thì cơ hội được bầu làm người dẫn đầu vị trí để sản xuất một khối mới được chấp nhận vào blockchain càng lớn. Đây là khái niệm về bằng chứng cổ phần (PoS).

### Xác thực giao dịch

Khi xác thực giao dịch, người đứng đầu vị trí cần đảm bảo rằng người gửi đã bao gồm đủ tiền để thanh toán cho giao dịch đó và cũng phải đảm bảo rằng các thông số của giao dịch được đáp ứng. Giả sử rằng giao dịch đáp ứng tất cả các yêu cầu này, người dẫn đầu vị trí sẽ ghi lại nó như một phần của khối mới, sau đó sẽ được kết nối với các khối khác trong chuỗi.

## Bức tranh lớn Blockchain

Tìm hiểu các thuật ngữ cơ bản như blockchain, đồng thuận, ủy quyền phân quyền và các ưu đãi. Hiểu bức tranh toàn cảnh về Cardano và lý do tại sao các nhóm cổ phần lại quan trọng như vậy.

<iframe width="100%" height="325" src="https://www.youtube.com/embed/zJUJG6V0Y1o" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
<br/><br/>  

:::tip CÂU HỎI HOẶC GỢI Ý?
Nếu bạn có bất kỳ câu hỏi và đề xuất nào trong khi tham gia các bài học, [vui lòng hỏi trong diễn đàn Cardano](https://forum.cardano.org/c/staking-delegation/setup-a-stake-pool/158) và chúng tôi sẽ trả lời sớm nhất có thể. 
:::

## Giao thức Ouroboros 

### Sự đồng thuận

Các blockchain yêu cầu một cơ chế thỏa thuận giữa những người tham gia mạng lưới về cách thêm các giao dịch mới vào sổ cái và trạng thái của nó tại bất kỳ thời điểm nào. Cơ chế này được biết đến như một giao thức đồng thuận.

Mục tiêu của giao thức đồng thuận là đảm bảo rằng chỉ một chuỗi được chấp nhận và tuân theo, nếu không, hệ thống sẽ sụp đổ ngay lập tức.

### Thuật toán đồng thuận Proof-of-work (POW)

Bitcoin đã triển khai thuật toán đồng thuận Proof-of-work. Trong giao thức này, để một khối mới được thêm vào blockchain, nút cố gắng thực hiện nó phải cung cấp bằng chứng công việc, được thể hiện bằng lời giải của một câu đố toán học. Quá trình này được gọi là khai thác.

Nút giải được câu đố sẽ có quyền tạo khối mới và được thưởng cho nó.

Đề án này đặt tất cả các nút vào một cuộc đua với nhau và vì chỉ một nút được thưởng, nên lãng phí rất nhiều sức mạnh tính toán và năng lượng.

Sự lãng phí như vậy đã làm dấy lên lo ngại về tác động môi trường của Bitcoin. Hiện tại, quá trình khai thác Bitcoin tiêu tốn nhiều năng lượng ngang với các quốc gia như Hà Lan hay Iceland.

Ngoài những lo ngại về môi trường, kế hoạch phần thưởng của thuật toán bằng chứng công việc cũng đã dẫn đến việc tập trung hóa mạng Bitcoin. Có tới 75% sức mạnh tính toán của mạng Bitcoin nằm ở Trung Quốc. Và một người chơi duy nhất, Bitmain, kiểm soát hơn 40% tỷ lệ băm của mạng.

Vấn đề cơ bản là Bitcoin phân biệt rõ ràng giữa người dùng thực sự của mạng và những người khai thác. Sở hữu Bitcoin không cấp cho bạn bất kỳ quyền kiểm soát nào đối với mạng, cũng như không có bất kỳ quyền lực nào đối với các quyết định về sự phát triển của nó. Hệ thống được kiểm soát bởi một nhóm nhỏ các nhà phát triển và thợ đào.

### Ouroboros,một thuật toán đồng thuận Proof-of-stake (POS)

Ở Ouroboros, không có cuộc chạy đua giữa các bên liên quan để tạo ra một khối. Thay vào đó, một nhà lãnh đạo vị trí được chọn ngẫu nhiên, tương ứng với số lượng mã thông báo mà anh ta sở hữu (tiền đặt cược), để có cơ hội tạo ra một khối mới.

Vì vậy, sức mạnh băm không phải là thứ mang lại cho bạn cơ hội tạo ra một khối mới (và nhận phần thưởng cho nó), mà chính số tiền đặt cược của bạn mới là thứ làm tăng cơ hội được bầu của bạn.

Vì không có cuộc chạy đua nào để khai thác một khối, nên sẽ không lãng phí năng lượng hoặc tài nguyên tính toán. Theo nghĩa đó, Ouroboros là một giao thức hiệu quả hơn và rẻ hơn để chạy so với bằng chứng công việc của Bitcoin, trong khi vẫn giữ tất cả các đảm bảo an ninh.

### Nếu bạn (Nhóm cổ phần) không trực tuyến thì sao? 


Để tạo ra một khối, bạn phải trực tuyến, nhưng yêu cầu mọi người luôn trực tuyến mọi lúc là không thực tế và không thực tế. Đây là lý do tại sao Ouroboros giới thiệu con số của **Stake Delegation** . Với tư cách là bên liên quan, bạn có thể ủy thác cổ phần của mình cho bên thứ ba để thay mặt bạn hành động bất cứ khi nào bạn được bầu làm lãnh đạo vị trí. Các đại biểu như vậy được gọi là nhóm đặt cọc (_staking pools_) . Họ là các thành viên của cộng đồng cam kết chạy giao thức thay mặt bạn và luôn trực tuyến gần 100% thời gian.

Một điều quan trọng cần lưu ý là bạn chỉ ủy quyền quyền tham gia vào giao thức chứ không phải số tiền thực tế của bạn. Ada của bạn vẫn an toàn và nằm dưới sự kiểm soát của bạn trong ví của bạn và tiền không bị khóa, bạn vẫn có thể thực hiện các giao dịch.


### Những phần thưởng như thế nào?

Các bên liên quan phát hành khối được khuyến khích tham gia vào giao thức bằng cách thu phí giao dịch. Nhưng Ouroboros không khuyến khích các bên liên quan đầu tư tài nguyên tính toán để phát hành khối. Thay vào đó, tính khả dụng và xác minh giao dịch được ưu tiên hơn.

Phần thưởng đến từ hai nguồn: phí giao dịch và tiền rút từ Ada dự trữ.

Trong Ouroboros, các ưu đãi không phụ thuộc vào khối, thay vào đó, phần thưởng từ một kỷ nguyên được thu thập trong một nhóm và được phân phối cho các bên liên quan và nhóm liên quan đã tham gia trong các thời điểm này tỷ lệ với số ADA liên quan của họ.

Trong trường hợp các nhóm cổ phần, những người đó nhận được một phần thưởng để trang trải chi phí hoạt động và tỷ suất lợi nhuận. Phần còn lại được phân phối cho các thành viên nhóm ủy thác, bao gồm cả chủ sở hữu nhóm, tỷ lệ thuận với số ADA mà họ đã đóng góp vào nhóm.

Để tham gia vào giao thức, bạn có thể chọn một nhóm đặt cược hoặc chọn hành động của riêng bạn bất cứ lúc nào tạo nhóm tiền cược của riêng bạn.

### Điều gì sẽ xảy ra nếu vì một lý do nào đó mà có rẽ nhánh (fork)? 

Do các bên liên quan không phải lúc nào cũng trực tuyến, họ đến và đi (hay còn gọi là tính khả dụng động), và đôi khi họ ngoại tuyến trong thời gian dài, điều quan trọng là họ có thể đồng bộ hóa lại với chuỗi chính xác khi họ trực tuyến trở lại.

Đặc điểm chính của Ouroboros Genesis là nhờ quy tắc chọn chuỗi duy nhất, nó cho phép các bên mới hoặc tham gia lại đồng bộ hóa với “chuỗi tốt” chỉ với một bản sao đáng tin cậy của khối genesis. Điều này làm cho giao thức an toàn trước cái gọi là "cuộc tấn công tầm xa".

### Tự tạo khối ngẫu nhiên.

Làm cho việc lựa chọn slot leader công bằng và an toàn **(quy trình đặt cược)** đòi hỏi một nguồn ngẫu nhiên tốt.

Giao thức Ouroboros (cụ thể là Ouroboros Praos và Ouroboros Genesis) kết hợp tính năng Global Random Oracle để tạo ra tính ngẫu nhiên mới và mới hoàn toàn ở mọi kỷ nguyên.

Điều này đạt được bằng cách triển khai Hàm ngẫu nhiên có thể xác minh. Khi được đánh giá bằng khóa của một bên liên quan, Nó trả về một giá trị ngẫu nhiên được lưu trữ trong mọi khối mới được tạo ra. Việc băm của tất cả các giá trị từ kỷ nguyên trước trở thành hạt giống ngẫu nhiên cho quy trình đặt cược. Bản thân blockchain trở thành nguồn ngẫu nhiên mới của nó.

Đây là lý do tại sao giao thức được đặt tên là Ouroboros, con rắn tự ăn đuôi của mình.

### Thúc đẩy phân quyền 

Cuối cùng, cơ chế khuyến khích Ouroboros thúc đẩy sự phân cấp của hệ thống theo cách tốt hơn so với Proof-of-work. Bởi vì Ouroboros xem xét hai kịch bản chính:

Mặt khác, nhóm đặt cược chỉ có thể hoạt động như một đại biểu nếu nó đại diện cho các bên liên quan nhất định có tổng cổ phần vượt quá ngưỡng nhất định, ví dụ: 0,1% tổng số cổ phần trong chuỗi khối. Điều này ngăn chặn một cuộc tấn công phân mảnh, nơi ai đó cố gắng làm ảnh hưởng đến hiệu suất của giao thức bằng cách tăng số ủy quyền.

Đồng thời, khi tổng số tiền của một nhóm cổ phần phát triển vượt quá một ngưỡng nhất định, phần thưởng sẽ trở nên không đổi. Điều này làm cho nhóm liên quan cụ thể đó kém hấp dẫn hơn vì các bên liên quan sẽ không tối đa hóa phần thưởng của họ. Ví dụ: nếu ngưỡng được đặt thành 1%, nhóm cổ phần có cổ phần là 2% sẽ nhận được phần thưởng tương tự như nhóm khác có cổ phần chỉ 1%.

Tất cả các chức năng này làm cho Ouroboros trở thành giao thức sổ cái bằng chứng cổ phần tốt nhất cho đến nay. Và việc triển khai duy nhất của nó hiện đang nằm trong chuỗi khối Cardano.

## Nó làm việc như thế nào?

1. **Thời gian** được chia thành các kỷ nguyên và thời điểm và bắt đầu từ Genesis. Nhiều nhất một khối được tạo ra trong mỗi khe (slot). Chỉ người dẫn đầu (slot leader) mới có thể ký khối cho một vị trí cụ thể.
2. **Đăng ký:** Điều đầu tiên người dùng cần làm để tham gia vào giao thức là đăng ký:
    1. một mạng để đồng bộ hóa với sổ cái
    2. một đồng hồ toàn cầu cho biết vị trí hiện tại
    3. một tiên tri ngẫu nhiên toàn cầu tạo ra các giá trị ngẫu nhiên ( v ) và phân phối chúng cho người dùng
3. **Thử tục đặt cược**
    1. Vào đầu mỗi kỷ nguyên, các bên liên quan trực tuyến lấy \( từ chuỗi khối \) phân phối cổ phần từ khối cuối cùng của 2 kỷ nguyên trước. Ví dụ: nếu kỷ nguyên hiện tại là kỷ nguyên 100, thì phân phối tiền cược được sử dụng là phân phối như trong khối cuối cùng của kỷ nguyên 98.
    2. **Random Oracle**:  Là một hàm băm lấy các giá trị ngẫu nhiên “v” \( được slot leader đưa vào mỗi khối cho mục đích này \) từ các vị trí ⅔ đầu tiên trong kỷ nguyên trước đó và băm chúng lại với nhau và sử dụng nó làm hạt giống ngẫu nhiên để chọn các Slot leader.
    3. Các bên liên quan đánh giá bằng khóa bí mật của họ. Chức năng ngẫu nhiên có thể xác minh \( VRF \) tại mọi vị trí. Nếu giá trị đầu ra \( v \) dưới một ngưỡng nhất định, bên đó sẽ trở thành người dẫn đầu vị trí cho khối đó.
	
        1. **Certificate:**  **VRF** Tạo ra 2 đầu ra: **một là giá trị ngẫu nhiên \(v\)** và một **proof \(π\)**  mà người dẫn đầu vị trí sẽ đưa vào khối mà anh ta tạo ra để chứng nhận rằng anh ta là người dẫn đầu vị trí hợp pháp cho vị trí cụ thể đó.
        2. **Slot leader** thực hiện các nhiệm vụ sau
        3. Thu thập các giao dịch được đưa vào khối của anh ấy.
        4. Bao gồm trong khối của mình giá trị ngẫu nhiên \( v \) và bằng chứng \( π \) thu được từ đầu ra **VRF**.
        5. Trước khi phát khối, người dẫn đầu vị trí tạo khóa bí mật mới **\( Chữ ký phát triển khóa \)** . Khóa công khai vẫn giữ nguyên, nhưng khóa bí mật được cập nhật theo từng bước và khóa cũ bị xóa.
        6. Không thể giả mạo chữ ký cũ bằng khóa mới. Và cũng không thể lấy các khóa trước đó từ khóa mới.
        7. Cuối cùng, người dẫn đầu vị trí phát sóng khối mới vào mạng.
        8. **Phần thưởng** thu được của những người dẫn đầu vị trí được tính vào cuối kỷ nguyên. Phần thưởng đến từ phí giao dịch và tiền từ quỹ dự trữ ada.

**Điều gì sẩy ra khi có rẽ nhánh trong chuỗi?**

Một khía cạnh quan trọng của quy trình được mô tả ở trên là theo thời gian, nó sẽ tạo ra các vị trí không có vị trí dẫn đầu và các vị trí có nhiều vị trí dẫn đầu. Có nghĩa là các nút có thể nhận được các chuỗi hợp lệ từ nhiều nguồn. Để xác định chuỗi nào sẽ áp dụng, mỗi bên thu thập tất cả các chuỗi hợp lệ và áp dụng Quy tắc lựa chọn chuỗi. Điều tương tự cũng được thực hiện bởi những người dùng đã ngoại tuyến trong một thời gian và cần đồng bộ hóa với blockchain.

Nút lọc tất cả các chuỗi hợp lệ (các chuỗi có chữ ký nhất quán với khối gốc và với các khóa được ghi lại trong giao thức Chữ ký phát triển chính, hàm ngẫu nhiên biến đổi và tiên tri ngẫu nhiên toàn cầu.

Sau đó, áp dụng Quy tắc lựa chọn chuỗi: chọn chuỗi dài nhất miễn là nó phát triển nhanh hơn (dày đặc hơn) trong các vị trí theo sau khối chung cuối cùng cho cả hai chuỗi cạnh tranh.

Quy tắc lựa chọn chuỗi này cho phép một bên tham gia mạng bất kỳ lúc nào đồng bộ hóa với đúng chuỗi khối, chỉ dựa trên bản sao đáng tin cậy của khối gốc và bằng cách quan sát cách chuỗi phát triển trong một thời gian đủ.

## Reference material

[Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol](https://eprint.iacr.org/2016/889.pdf)

[Ouroboros Praos: An adaptively-secure, semi-synchronous proof-of-stake blockchain](https://eprint.iacr.org/2017/573.pdf)

[Ouroboros Genesis: Composable Proof-of-Stake Blockchains with Dynamic Availability](https://eprint.iacr.org/2018/378.pdf)

## Video: What’s an Ouroboros and how you cook it?

<iframe width="100%" height="325" src="https://www.youtube.com/embed/U92Ks8rucDQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Cchỉnh sửa trang này
Cập nhật lần cuối vào 4/5/2022 bởi Tommy Kammerer