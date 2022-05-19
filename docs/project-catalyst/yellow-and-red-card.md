# THẺ VÀNG VÀ Thẻ ĐỎ v2.0

## Giới thiệu

Tài liệu này được tạo ra để thiết lập các tiêu chí đánh giá các đánh giá do Cố vấn Cộng đồng thực hiện. Các tiêu chí này nhằm mục đích thiết lập các hướng dẫn cho các vCA (Cố vấn Cộng đồng Cựu chiến binh) để đánh giá các đánh giá một cách khách quan và thống nhất hơn. Mục đích của hướng dẫn là giảm thiểu tính chủ quan của giai đoạn ĐÁNH GIÁ QA và cho phép đánh giá công bằng và phù hợp hơn.

Ý tưởng là các CA (cố vấn của Cộng đồng) nhận được phản hồi cho các đánh giá của họ và quá trình này cho phép sửa chữa các đánh giá bị loại và đưa ra mô hình kiểm soát chất lượng.

Người ta đã thảo luận rằng một mô hình gắn cờ được phát triển bằng cách sử dụng tương tự bóng đá (bóng đá) của hệ thống thẻ đỏ và vàng. Trong trường hợp thẻ đỏ là tự động bị truất quyền thi đấu và thẻ vàng được đưa ra do vi phạm ít nghiêm trọng hơn và một khi vượt qua ngưỡng sẽ dẫn đến thẻ đỏ và truất quyền thi đấu.

Các lý do sai trái hoặc đánh giá công kích định kỳ sẽ bị coi là vi phạm nghiêm trọng và bị thẻ đỏ, điều này sẽ dẫn đến việc loại CA khỏi QUỸ THƯỞNG, loại trừ tất cả các đánh giá của anh ta và mất khả năng nhận được phần thưởng trong quỹ hiện tại.

Các đánh giá hợp lý không bao gồm vi phạm nghiêm trọng (thẻ đỏ), nhưng không được coi là đạt yêu cầu sẽ được đánh giá khác bởi các vCA và có thể dẫn đến thẻ vàng. Các thẻ vàng loại bỏ đánh giá của CA khỏi đề xuất tương ứng, cũng như sự tham gia của họ vào lá phiếu tương ứng.

Trong các Quỹ tương lai, có ý kiến ​​cho rằng nếu vượt quá số thẻ vàng từ một CA nhất định sẽ dẫn đến thẻ đỏ, nhưng vì việc triển khai mô hình này vẫn là một thử nghiệm, chúng tôi sẽ thận trọng và quan sát các kết quả và dữ liệu của Fund5 trước khi đưa ra các biện pháp khác về chất lượng.

Trong Quỹ 2 và 3 có một hệ thống tiêu chuẩn trắng và đen. Tuy nhiên, điều đó có nghĩa là khi đánh giá các cuộc đánh giá , không có cách nào áp dụng sự chậm trễ hoặc một hình phạt mà không có triết học và cân nhắc về kết quả theo cách này hay cách khác. Với tính linh hoạt cao hơn của các thẻ vàng, nó cho phép CA có cơ hội thứ hai và không bị phạt một cách quá đáng, nhưng vẫn kiểm tra công việc của anh ta sao cho nhất quán.

## Xây dựng

Sự đồng thuận Để tồn tại sự đồng thuận, số lượng vCAs đánh giá một cuộc đánh giá tối thiểu phải là bốn (4). Các bài đánh giá có ít hơn bốn (4) bài đánh giá có thể dẫn đến một cuộc đánh giá tổng thể bị méo mó do sự tham gia thấp của các vCA và nên được giữ KHÔNG THAY ĐỔI ,để tránh thao túng và vượt quá quyền lực của các vCA.

## THẺ ĐỎ

### Đánh giá trống

Việc xác định các đánh giá trống sẽ được thực hiện tự động, thông qua một kịch bản.

Tập lệnh này sẽ tính tổng số lượng đánh giá của một CA nhất định, nếu hơn 10% đánh giá hợp lý của CA được gửi trống, CA sẽ tự động nhận thẻ đỏ và sẽ bị loại khỏi Quỹ tương ứng, thua cuộc khả năng tham gia vào các cuộc bỏ phiếu của Quỹ hiện tại và loại bỏ tất cả các đánh giá của anh ta đối với Quỹ hiện tại.

Theo hướng dẫn do CA thành lập, các CA cần mô tả 3 lý do cho tất cả các đánh giá của họ, việc đưa ra thẻ đỏ cho các CA có hơn 10% các đánh giá trống là hợp lý là một cách để ngăn cản những CA không tuân theo các hướng dẫn và tại đồng thời duy trì một mức sai số để tránh quá nghiêm ngặt trong trường hợp các CA có thể đã quên một số lý do chính đáng hoặc nếu có vấn đề với việc gửi trên trang web Ideascale.

Tuy nhiên, để CA tránh được những vấn đề có thể xảy ra này, điều quan trọng là Ideascale phải cung cấp một bảng điều khiển nơi CA có thể thực tế truy cập vào các đánh giá đã hoàn thành của họ, điều này giúp CA có cơ hội sửa chữa các đánh giá trống và thưởng cho họ để giữ các kiểm tra và số dư.

Nếu không có trang tổng quan nào trong IdeaScale nơi CA có thể xem các đánh giá đã hoàn thành của họ trong một phần duy nhất, thì khuyến nghị là thay đổi biên độ 10% để có mức dung sai 20% cho các đánh giá trống.




### Các cáo buộc xúc phạm / thù địch / tục tĩu / không có căn cứ

Nếu 50% trở lên trong số vCA (đã tham gia đánh giá cụ thể) báo cáo một hoặc nhiều tiêu chí dưới đây, CA sẽ nhận thẻ đỏ và sẽ bị loại khỏi quỹ tương ứng. quyền được thưởng.

1. Xúc phạm
2. Sự thù địch (Giọng điệu hung hăng / thù địch)
3. Tục tĩu hoặc không 
4. Lời buộc tội (Các nhận xét như "Điều này trông giống như lừa đảo" và "Đây chỉ là một đề xuất đúc tiền" là những lời buộc tội nghiêm trọng và cần bằng chứng chắc chắn. Phải tránh những lời buộc tội kiểu này mà không có chi tiết và lý do chính đáng để duy trì sự toàn vẹn của cả hai bên.)

## THẺ VÀNG

### Phản hồi không mang tính xây dựng

Mục đích của việc đánh giá trong Catalyst là để thúc đẩy những lời chỉ trích mang tính xây dựng. Thông qua các đánh giá mang tính xây dựng, cử tri có thể có bản tóm tắt và đánh giá đủ điều kiện về các đề xuất để tạo điều kiện thuận lợi cho việc ra quyết định của họ, cho phép họ trả lời các câu hỏi của họ và những người đề xuất có thể có phản hồi mang tính xây dựng về đề xuất, cách cải thiện đề xuất hoặc tại sao nó tốt . 

Một đánh giá tốt sẽ dạy cho bạn điều gì đó: Người bỏ phiếu nên hiểu biết hơn, người đề xuất nên biết những gì họ cần phải làm.

Điều quan trọng nữa là CA phải duy trì tính khách quan trong đánh giá của anh ta. Các ý kiến ​​không có cơ sở / dữ liệu để đủ điều kiện đánh giá có thể được phân loại là đánh giá không mang tính xây dựng.

Hơn nữa, CA không có nhiệm vụ quyết định ý tưởng nào nên được biểu quyết, đó là nhiệm vụ của cử tri. Các CA chỉ nên tập trung vào 3 tiêu chí đánh giá (ví dụ: tác động, khả năng kiểm toán và tính khả thi). Những nhận xét như: “Chúng tôi có quá nhiều thị trường NFT” hoặc “Tôi không nghĩ chúng ta nên tài trợ cho cộng đồng này” là những ví dụ về những ý kiến ​​vô căn cứ nên tránh vì chúng không đưa ra phản hồi mang tính xây dựng.

Điều đó có nghĩa là, nếu cơ sở lý luận đánh giá không hỗ trợ người bỏ phiếu hoặc người đề xuất theo bất kỳ cách nào, không chứng minh rõ ràng xếp hạng đã cho và không có lý do hợp lý nào về cơ sở lý luận, cách cải thiện đề xuất hoặc tại sao nó tốt, thì đánh giá đó không mang tính xây dựng.

### Theo dõi:

- Sửa lại đơn giản của văn bản đề xuất.
- Trả lời câu hỏi đánh giá đơn giản như một lời khẳng định hoặc phủ định: “Đề xuất này giải quyết rõ ràng thách thức và được viết rất tốt với các từ được lựa chọn rất cẩn thận có độ dài thích hợp, được thực hiện tốt!”
- Các đánh giá có thể đã được viết mà không cần đọc đề xuất hoặc phù hợp với bất kỳ đề xuất nào.

Nếu 50% trở lên trong số các vCA  (những người đã tham gia đánh giá đánh giá cụ thể) cho rằng lý do không mang tính xây dựng, CA sẽ nhận thẻ vàng, đánh giá của anh ta sẽ bị loại trừ, cũng như việc kiếm tiền từ đánh giá.


### Điểm số không phù hợp với lý do

Nếu 50% trở lên của vCA (những người đã tham gia đánh giá cụ thể) cho rằng điểm số không phù hợp với lý do, CA sẽ nhận một thẻ vàng, bài đánh giá của anh ta sẽ bị loại trừ. cũng như việc kiếm tiền từ đánh giá.

Trong trường hợp này, chúng ta phải chú ý đến những đánh giá khen ngợi một đề xuất nhưng cho điểm thấp hoặc những đánh giá chỉ trích tiêu cực một đề xuất nhưng lại cho điểm cao.

### Đánh giá được sao chép một cách có hệ thống mà không có lý do chính đáng

Một số CA sử dụng các khuôn mẫu và điều này làm cho một số đánh giá trông giống nhau, điều này không nhất thiết là một vấn đề.

Các trường hợp nên áp dụng thẻ vàng:

- Các bản sao tương tự từ các NHÀ TƯ VẤN CỘNG ĐỒNG KHÁC NHAU (so sánh theo số id của CA)

- Các bản sao tương tự không có lý do rõ ràng (cùng một CA có thể có các đánh giá tương tự, miễn là điều này hợp lý và đánh giá phù hợp(

Nếu 50% trở lên trong số các vCA  những người đã tham gia đánh giá cụ thể) cho rằng cơ sở lý luận đã được sao chép, CA sẽ nhận thẻ vàng, đánh giá của anh ta sẽ bị loại trừ, cũng như việc kiếm tiền từ đánh giá.

### Đọc Đề xuất Không đầy đủ

Nếu 50% trở lên trong số vCA  (những người đã tham gia đánh giá đánh giá cụ thể) cho rằng CA rõ ràng không nhận thấy bất kỳ khía cạnh nào được mô tả trong đề xuất hoặc trong các tệp đính kèm và ví dụ như đánh giá của anh ta đã bị xâm phạm : chi tiết về phân bổ ngân sách, chi tiết về kinh nghiệm thời gian đã bị bỏ qua, CA sẽ nhận thẻ vàng, đánh giá của anh ta sẽ bị loại trừ, cũng như việc kiếm tiền từ đánh giá.

>Đánh giá không liên quan đến đề xuất

Nếu 50% trở lên trong số các vCA (những người đã tham gia đánh giá cụ thể) cho rằng lý do chính đáng là:

Hoàn toàn không có bối cảnh hoặc
Đã được thực hiện cho một thử thách sai (Phải rõ ràng rằng đánh giá được thực hiện dựa trên loại thử thách sai) hoặc
Đã được thực hiện cho các tiêu chí sai (Ví dụ: tác động, tính khả thi, khả năng kiểm toán)

CA sẽ nhận thẻ vàng, đánh giá của anh ta sẽ bị loại trừ, cũng như việc kiếm tiền từ đánh giá.

### Vi phạm chung

Nếu 50% trở lên trong số vCA  (những người đã tham gia đánh giá đánh giá cụ thể) cho rằng tuyên bố của người đề xuất là có lý và CA đã không hành động theo hướng dẫn của CAs hoặc đưa ra một lỗi đánh giá rõ ràng về lý do của nó, CA sẽ nhận thẻ vàng, đánh giá của anh ta về đề xuất tương ứng sẽ bị loại trừ, cũng như việc kiếm tiền từ đánh giá.

Do tính chất chủ quan của tiêu chí này, nên chỉ những vCA có kiến ​​thức và cảm thấy thoải mái về chủ đề của đề xuất mới tham gia, vì việc đánh giá vCA trong những trường hợp này có thể yêu cầu thêm chuyên môn.




## TIÊU CHÍ BỔ SUNG (KHÔNG PHẢI LÀ THẺ, CHỈ LÀ NHẮC NHỞ)

Những tiêu chí này sẽ không được sử dụng để phân bổ thẻ, chỉ mang tính chất biểu thị cho những cải tiến trong quy trình.

Việc bao gồm các danh mục này sẽ cho phép chúng ta thấy khuôn mẫu hành vi của một CA, nếu anh ta rất nghiêm khắc trong một số đánh giá và khoan dung với những người khác, chúng ta có thể thấy rằng anh ta có thể được thiên vị. Chúng tôi sẽ không trao thẻ vàng, nhưng điều này có thể cho phép theo dõi các hành vi lạ và thu thập dữ liệu để cải thiện quy trình.

Vì chúng tôi đã có tùy chọn báo hiệu "Phản hồi mang tính xây dựng", CÔNG BẰNG cuối cùng là dư thừa hoặc phóng đại. Do đó, CÔNG BẰNG sẽ bị xóa và BỀN VỮNG và CHẤP NHẬN danh mụcsẽ được đưa vào. 

### Phản hồi mang tính xây dựng

Danh mục này cho phép đánh giá các tiêu chuẩn chất lượng cao được nêu bật và được sử dụng làm ví dụ cho các Cố vấn cộng đồng khác, chúng phù hợp với các nguyên tắc, mang tính xây dựng và được viết tốt. Quyết định của CA sẽ được tính để tính toán sự đồng thuận.

### Có thể chấp nhận

Đánh giá nằm trong mức dự kiến, phù hợp với hướng dẫn của CA, mang tính xây dựng và không cần thẻ (đỏ hoặc vàng). Quyết định của CA sẽ được tính để tính toán sự đồng thuận.

### vCA

Loại này cho phép đã phân tích đề xuất, không thấy rõ rằng đánh giá là Chấp nhận được hoặc xứng đáng được nhận thẻ (đỏ hoặc vàng). Vì vậy, nó sẽ là thích hợp để duy trì sự trung lập và tiết chế. Quyết định của CA sẽ không được tính để tính toán sự đồng thuận, nhưng quyết định của anh ta sẽ rất quan trọng đối với việc thu thập dữ liệu và cải thiện quy trình.

### Lenient

Đánh giá có thể phù hợp với các hướng dẫn nhưng lại quá mềm so với đánh giá. Sẽlà một đánh giá chọn ra một tiêu chí của đề xuất là tính hợp pháp để được xếp hạng cao, không tính đến các vấn đề được trình bày trong đề xuất. Quyết định của CA sẽ không được tính để tính toán sự đồng thuận, nhưng quyết định của anh ta sẽ rất quan trọng đối với việc thu thập dữ liệu và cải thiện quy trình.

### Nghiêm ngặt

Đánh giá của anh ta có thể phù hợp với các nguyên tắc nhưng quá khắc nghiệt với xếp hạng. Sẽ là một đánh giá chọn ra một tiêu chí của đề xuất là tính hợp pháp đối với một đánh giá thấp, bỏ qua các khía cạnh / thông tin tích cực được trình bày trong đề xuất. Quyết định của CA sẽ không được tính để tính toán sự đồng thuận, nhưng quyết định của anh ta sẽ rất quan trọng đối với việc thu thập dữ liệu và cải thiện quy trình.
