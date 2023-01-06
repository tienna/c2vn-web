# 6-Đệ quy và Fold

## Nội dung

-   Tại sao là đệ quy?
-   Tư duy đệ quy
    -   `sum` and `product`
-   Các bước để tạo hàm đệ quy của riêng bạn
-   Ví dụ về đệ quy
    -   `and`, `length`, `reverse`, `drop`, `take`, `map`, `filter`
-   Extracting the `foldr` pattern
-   Hàm `foldl` 
-   Hàm `foldl'` 
-   Khi nào sử dụng `foldr`, `foldl`, à `foldl'`



## Tại sao là đệ quy?

Một trong những hàm cơ bản cần thiết trong bất kỳ ngôn ngữ lập trình nào là sự lặp lại (vòng lặp). Ví dụ:

- Bạn có một danh sách các đối tượng và muốn làm điều gì đó với chúng. Từng thành phần một trong đó.
- Bạn muốn thực hiện một số phép tính 5 lần với các giá trị khác nhau.
- Vân vân.

Trong các ngôn ngữ lập trình mệnh lệnh, các tác vụ lặp đi lặp lại này được xử lý bằng cách sử dụng các vòng lặp lặp đi lặp lại. Ví dụ: trong JavaScript, bạn có thể có:

``` {.javascript}
for (i = 0; i < 5; i = i + 1) {
    // Do something
}

let i = 0;
while (i < 5) {
  // Do something
  i = i + 1;
}
```


Nhưng, nếu chúng ta cố gắng tạo một cái gì đó như thế này trong Haskell, chúng ta gặp vấn đề lớn. Và đó là biến `i`.

Như chúng ta đã đề cập trong bài một, Haskell là một ngôn ngữ hàm thuần túy. Nhưng hai nhóm lệnh trên dựa vào sự thay đổi `i` trên mỗi lần lặp lại. Điều đó có nghĩa là chúng có tác dụng phụ là cập nhật trạng thái khi chương trình chạy.

Vì vậy, trong Haskell, chúng ta không có các hàm lặp tích hợp sẵn. Thay vào đó, chúng ta có đệ quy!

Và làm thế nào là đệ quy tốt hơn vòng lặp, ý của bạn? Dưới đây là một vài lý do:

Lý do tại sao đệ quy lại hữu ích:

- Mọi thứ bạn có thể làm với vòng lặp, bạn có thể làm điều đó bằng cách sử dụng đệ quy. Và trên hết, thậm chí có những chương trình mà bạn có thể sử dụng đệ quy mà không thể viết bằng vòng lặp `for`.
- Nhiều hàm (nếu không muốn nói là hầu hết) có thể được định nghĩa một cách tự nhiên bằng cách sử dụng đệ quy. Điều này có nghĩa là cách bạn nghĩ một cách trừu tượng về hàm và cách bạn viết nó bằng cách sử dụng đệ quy là rất giống nhau.
- Một số hàm rõ ràng hơn và ngắn gọn hơn nếu được định nghĩa bằng cách sử dụng đệ quy.
- Bạn có thể sử dụng phương pháp quy nạp để lập luận toán học và chứng minh các thuộc tính của các hàm được xác định bằng cách sử dụng đệ quy. (Cao cấp hơn, nhưng vô cùng mạnh mẽ.)

Bây giờ bạn đã biết mình sắp học một khái niệm khá mạnh mẽ, hãy bắt đầu tìm hiểu!

## Tư duy đệ quy

Đệ quy xảy ra khi một thứ được định nghĩa theo chính nó. Vì vậy, một hàm đệ quy là một hàm mà nó được định nghĩa chính nó.

Là vậy đấy. Khái niệm này thực sự đơn giản. Việc thực hiện sẽ gây ra hầu hết các rắc rối. Vì vậy, chúng ta sẽ bắt đầu bằng cách định nghĩa một hàm sử dụng cả vòng lặp `for` (sử dụng Python) và đệ quy (sử dụng Haskell) để làm nổi bật sự khác biệt trong cách suy nghĩ về vấn đề.

Giả sử chúng ta muốn tính tổng của một danh sách các số.

Cả Python và Haskell đều có hàm `sum` đã làm điều đó. Nhưng lần này, chúng ta sẽ tạo nó từ đầu. Trong các ngôn ngữ mệnh lệnh, bạn sẽ viết như sau:

``` {.python}
def sum(list):
    total = 0
    for i in list:
        total = total + i
    return total
```

Ở đây, bạn đang mô tả từng bước những gì chương trình nên làm:

1. Chúng ta tạo một hàm có tên `sum` lấy phần mở rộng `list`.
2. Sau đó, chúng ta tạo một biến được gọi `total` với giá trị ban đầu là 0.
3. Sau đó, đối với mỗi phần tử trong danh sách, chúng ta lấy `total`, thêm phần tử vào phần tử đó và ghi đè phép gán cho `total` bằng giá trị mới.
4. Sau khi vòng lặp kết thúc, hàm trả về biến `total` .

Như bạn có thể thấy, trong các ngôn ngữ mệnh lệnh, chúng ta sử dụng một chuỗi các câu lệnh để xác định CÁCH đạt được mục tiêu. Trong trường hợp này, tổng của các phần tử trong danh sách.

Để dễ dàng viết các hàm đệ quy, bạn phải kiểu bỏ lối suy nghĩ đó và chuyển sang lập trình khai báo. Nơi bạn tuyên bố những thứ LÀ thay vì làm thế nào để có được chúng từng bước.

Bây giờ, hãy định nghĩa hàm tương tự trong Haskell.

Như mọi khi, điều đầu tiên chúng ta cần làm là viết chữ ký kiểu:


``` {.haskell}
sum :: [Int] -> Int
```

Vì vậy, chúng ta biết nó lấy một danh sách các số nguyên và trả về một số nguyên.

Bây giờ, dựa trên hàm LÀ: Hàm lấy danh sách các số và trả về tổng của nó, bước tiếp theo là tìm các trường hợp đầu và cuối danh sách.

Chúng ta lấy một danh sách làm đầu vào. Điều gì xảy ra nếu danh sách trống chẳng hạn? Chà, trong trường hợp đó, chúng ta biết rằng tổng của một danh sách trống là 0. Vì vậy, chúng ta có thể bắt đầu bằng cách xác định rằng:


``` {.haskell}
sum :: [Int] -> Int
sum [] = 0
```

Bây giờ, bên cạnh đó, có trường hợp khi có các phần tử bên trong danh sách:

``` {.haskell}
sum :: [Int] -> Int
sum [] = 0
sum (x:xs) =
```

Nếu chúng ta nghĩ về hàm `sum` LÀ gì trong định nghĩa thứ hai, thì đó là một hàm lấy danh sách `Int` không trống và cộng chúng lại. Điều này giống như việc thêm `x` (phần tử đầu tiên) vào kết quả của việc thêm tất cả các `Int` trong xs. Vì vậy, chúng ta có thể làm một cái gì đó như:


``` {.haskell}
sum :: [Int] -> Int
sum [] = 0
sum (x:xs) = x + ...
```
Và bây giờ, chúng ta cần tìm tổng của tất cả các phần tử trong xs. Nhưng chờ một phút ... chúng ta đã có hàm để làm điều đó! nó giống như chúng ta đang làm! Vì vậy, chúng ta chỉ có thể sử dụng nó!:

``` {.haskell}
sum :: [Int] -> Int
sum [] = 0
sum (x:xs) = x + sum xs
```

Chúng ta đã triển khai hàm đệ quy đầu tiên của mình! Tại sao? Bởi vì chúng ta đã xác định `sum` bằng cách sử dụng chính nó!

Hãy xem điều gì sẽ xảy ra khi chúng ta sử dụng hàm này. Ví dụ: hãy tính tổng của một danh sách chứa tất cả các số nguyên từ `1` đến `5`:

A
``` {.haskell}
sum [1,2,3,4,5] = 1 + sum [2,3,4,5]
                = 1 + 2 + sum [3,4,5]
                = 1 + 2 + 3 + sum [4,5]
                = 1 + 2 + 3 + 4 + sum [5]
                = 1 + 2 + 3 + 4 + 5 + sum []
                = 1 + 2 + 3 + 4 + 5 + 0
                = 15
```

Và đó là cách Haskell đánh giá hàm của chúng ta .

Lưu ý rằng trường hợp cơ sở là trường hợp cho phép chúng ta dừng đệ quy và có kết quả. Nếu chúng ta xác định hàm đệ quy mà không có trường hợp cơ sở, hàm đó sẽ bị lỗi hoặc chạy vĩnh viễn.

Vì vậy, Tóm tắt là:

Với các vòng lặp, bạn thay đổi ngữ cảnh bằng bộ tích lũy đột biến bao gồm các bước để xác định CÁCH đạt được mục tiêu.

Với đệ quy, bạn bọc hàm với chính nó, điều này tạo ra một ngữ cảnh mới với đột biến mong muốn. Và hàm đó, đến lượt nó, lại gọi chính nó, thiết lập bối cảnh riêng của nó, v.v.

Bây giờ, mặc dù đây là hướng dẫn đầy đủ về cách tạo  hàm đệ quy `sum`, lý do có thể hơi quá cụ thể để áp dụng cho các hàm khác.

Để giúp bạn dễ dàng tạo các hàm đệ quy của riêng mình, chúng ta sẽ viết một hướng dẫn chung từng bước để bạn có thể áp dụng cho mọi trường hợp. Hãy đi sâu vào!

## Các bước để tạo hàm đệ quy của riêng bạn

Tôi đã chuẩn bị một phiên bản sửa đổi đôi chút của các bước do Tiến sĩ Graham Hutton  tạo ra. Nhà nghiên cứu, giáo viên và thành viên hội đồng quản trị nổi tiếng của Haskell Foundation. Vì vậy . .. bạn biết đấy . .. Đây là công việc nghiêm túc:


1. Viết ra kiểu: Điều này sẽ giúp bạn xác định hàm đề quy sau này. (Bạn phải luôn xác định kiểu trước, ngay cả khi bạn không xác định hàm đệ quy.)
2. Liệt kê các trường hợp có thể xảy ra mà bạn có thể có dựa trên đầu vào. (Bắt đầu với những "tiêu chuẩn" và thay đổi hoặc tinh chỉnh chúng nếu cần.)
3. Giữa tất cả các trường hợp đã khởi tạo trước đó, hãy xác định trường hợp nào đơn giản nhất và định nghĩa chúng. (Đây thường là các trường hợp cơ sở (hoặc đầu và cuối danh sách).)
4. Hãy suy nghĩ về những gì bạn có sẵn (tham số, hàm, toán tử, giá trị khác, toán tử cho kiểu đó, v.v.).
5. Xác định các trường hợp còn lại.
6. Phản ánh về hàm. Định nghĩa có thể được đơn giản hóa? Chữ ký có thể được khái quát hóa? (chúng ta sẽ xem cách thực hiện trong các bài học sau) Nó có hoạt động như bạn dự định không?


Không phải lúc nào bạn cũng phải thực hiện các bước này. Khi bạn cảm thấy thoải mái hơn, bạn có thể bỏ qua một số hoặc thậm chí viết hàm ngay lập tức.

Nói chung, trường hợp cơ sở (hoặc đầu và cuối danh sách) thường là trường hợp "giống nhau". Một trường hợp không sửa đổi kết quả mà chỉ dừng đệ quy. Ở đây chúng ta có một vài ví dụ:

Hai mẫu tiêu chuẩn phổ biến:

- Đối với các hàm đệ quy lấy các số không âm làm đầu vào, bạn thường (not always) có trường hợp cơ sở (hoặc cạnh) `0` hoặc `1` (tùy thuộc vào thao tác) và trường hợp đệ quy là n.
- Đối với các hàm đệ quy lấy danh sách làm đầu vào, bạn thường (không phải luôn luôn) có trường hợp cơ sở (hoặc cạnh) của `[]`(danh sách trống) và trường hợp đệ quy của (x:xs)(danh sách không trống).

Vì vậy, nếu chúng ta muốn sửa đổi hàm `sum`  để tính tích của các phần tử trong danh sách và chúng ta chỉ cần thay đổi trường hợp đệ quy như thế này:


``` {.haskell}
product :: [Int] -> Int
product [] = 0
product (x:xs) = x * product xs -- Only changed + to *
```

Chúng ta gặp vấn đề là hàm này luôn trả về `0`. Bởi vì tất cả các phần tử của danh sách được nhân lên `0` ở cuối đệ quy do trường hợp cơ sở!

Vì vậy, thay vào đó, cách chính xác để xác định trường hợp cơ sở `product` là cung cấp "identity" cho hàm product `(*)` đó là `1`:

``` {.haskell}
product :: [Int] -> Int
product [] = 1
product (x:xs) = x * product xs
```

Và ở đó. Chúng ta đã xác định hàm đệ quy thứ hai.

Thực hành sẽ cung cấp cho bạn trực giác cần thiết để nhanh chóng xác định các hàm đệ quy. Vì vậy, hãy xác định một loạt các hàm để làm cho trực giác đó hoạt động! 💪


## Ví dụ đệ quy

Lưu ý: Tôi đã thêm `'` vào tất cả các tên vì tất cả các hàm này đã tồn tại trong Haskell.


### `and'`: Hàm trả về trả về `True` khi và chỉ khi tất cả các phần tử của danh sách là `True`. {#and-a-function-that-returns-returns-true-if-and-only-if-all-the-elemens-of-the-list-are-true}

Vì vậy, nó lấy một danh sách các phép toán logic và trả về một phép toán logic. Dịch nó sang kiểu:

``` {.haskell}
and' :: [Bool] -> Bool
```

Bây giờ, bởi vì nó cần một danh sách, chúng ta sẽ xác định các trường hợp tiêu chuẩn cho danh sách:


``` {.haskell}
and' :: [Bool] -> Bool
and' []     =
and' (x:xs) =
```
Trường hợp cơ bản có thể không rõ ràng. Chắc chắn rồi, chỉ có hai giá trị để chọn vì nó là `Bool`. Nhưng nó là cái nào? Vì vậy, chúng ta sẽ bắt đầu với trường hợp đệ quy.

Bây giờ, hãy nghĩ về những gì chúng ta có sẵn cho ta. Bởi vì chúng ta đang xử lý  kiểu `Bool`, nên chúng ta có quyền truy cập vào tất cả các hoạt động boolean. Và có một cái làm những gì chúng ta cần nhưng chỉ giữa hai giá trị. Toán tử `&&` (và).

Vì vậy, phần tử đầu tiên được kết hợp sử dụng `&&` với kết quả xử lý phần còn lại của danh sách sẽ cho chúng ta kết quả mong muốn:


``` {.haskell}
and' :: [Bool] -> Bool
and' []     =
and' (x:xs) = x && ...
```



Và, bây giờ chúng ta phải trả về  `True` nếu và chỉ khi **tất cả** các phần tử của danh sách `xs` là True. Có nghĩa là chúng ta cần hàm tương tự mà chúng ta đang xác định ngay bây giờ. Vì vậy, chúng ta áp dụng nó cho `xs`:



``` {.haskell}
and' :: [Bool] -> Bool
and' []     =
and' (x:xs) = x && and' xs
```
Và bây giờ, trường hợp cơ bản đã rõ ràng! Nếu chúng ta sử dụng False, thì việc chúng ta xử lý danh sách nào không quan trọng, chúng ta sẽ luôn nhận được `False` vì `&& False` luôn bằng `False`.

Nhưng nếu chúng ta sử dụng `True`, chúng ta sẽ không sửa đổi kết quả! Vì kết quả của `&& True` phụ thuộc vào vế trái còn thiếu. Nếu có một yếu tố nào đó không phải là `True` trong danh sách, nó sẽ đưa kết quả về `False` cho đến khi kết thúc. và nếu Khác, nó sẽ cung cấp cho chúng ta True!

Một cách khác để tìm ra điều này là tìm ra rằng `True` là danh tính cho `&&`:


``` {.haskell}
and' :: [Bool] -> Bool
and' []     = True
and' (x:xs) = x && and xs

and' [True, False, True]
```

Kết quả
    False


```
and' [2 < 3, 4 == 4]
```

Kết quả
    True


### `length'`: Hàm cung cấp cho bạn độ dài của danh sách (list)

Để tính độ dài của một danh sách, chúng ta phải lấy một danh sách và trả về một số nguyên. Và bởi vì, về nguyên tắc, chúng ta sẽ không thao tác trên các phần tử của danh sách, nên chúng ta có thể sử dụng một kiểu đa hình như sau:

``` {.haskell}
length' :: [a] -> Int
```

NBây giờ, bởi vì nó cần một danh sách, chúng ta sẽ xác định các trường hợp tiêu chuẩn cho danh sách:

``` {.haskell}
length' :: [a] -> Int
length' []     =
length' (x:xs) =
```

Bây giờ, tìm kiếm các trường hợp dễ dàng, chúng ta có thể xác định rằng độ dài của một danh sách trống tất nhiên là bằng `0` các phần tử. Vì vậy, chúng ta thay thế rằng:



``` {.haskell}
length' :: [a] -> Int
length' []     = 0
length' (x:xs) =
```

Và bây giờ, chúng ta có thể tính toán độ dài của danh sách nếu chúng ta cộng với `1` cho từng phần tử của danh sách, phải không? Và bởi vì chúng ta có phần tử đầu tiên (`x`) được chọn ra bằng cách so khớp mẫu, nên chúng ta có thể thêm `1` vào phần tử đó và tính toán đệ quy độ dài của phần còn lại của danh sách (`xs`):

``` {.haskell}
length' :: [a] -> Int
length' []     = 0
length' (x:xs) = 1 + length' xs
```
Đó có thể là thân hàm cuối cùng. Nhưng vì chúng ta không thực sự sử dụng `x`, nên chúng ta có thể bỏ qua nó trong mẫu của mình:

``` {.haskell}
length' :: [a] -> Int
length' []     = 0
length' (_:xs) = 1 + length' xs

length' [1,2,3,4,5]
```
Kết quả
    5
```
length' ['a'..'z']
```

Kết quả
    26


Và đó là định nghĩa cuối cùng của chúng ta .


###  `reverse'`:  Một hàm đảo ngược một danh sách. #reverse-a-function-that-reverses-a-list}

Để đảo ngược một danh sách, chúng ta lấy một danh sách các phần tử và trả về một danh sách các phần tử. Và bởi vì, về nguyên tắc, chúng ta sẽ không thao tác trên các phần tử của danh sách, nên chúng ta có thể sử dụng một kiểu đa hình như sau:

``` {.haskell}
reverse' :: [a] -> [a]
```

Bây giờ, bởi vì nó cần một danh sách, chúng ta sẽ xác định các trường hợp tiêu chuẩn cho danh sách:



``` {.haskell}
reverse' :: [a] -> [a]
reverse' []     =
reverse' (x:xs) =
```

Bên trái của danh sách trống nó chỉ là danh sách trống. Và nó cũng là trường hợp cơ bản vì nó không đệ quy:

``` {.haskell}
reverse' :: [a] -> [a]
reverse' []     = []
reverse' (x:xs) =
```

Và bây giờ, nếu chúng ta lấy phần tử đầu tiên, đặt nó ở cuối và tiếp tục làm như vậy cho đến khi chúng ta đến cuối danh sách ban đầu, nó sẽ bị đảo ngược! Vì vậy, chúng ta chỉ cần lấy x, đặt nó ở cuối và thực hiện đệ quy tương tự cho đến khi hết phần tử, đây là trường hợp cơ bản của chúng ta:

``` {.haskell}
reverse' :: [a] -> [a]
reverse' []     = []
reverse' (x:xs) = reverse' xs ++ [x]

reverse' [1,2,3,4,5]
```
Kết quả
    [5,4,3,2,1]
```
reverse' "stressed" -- What's the reverse of stressed?
```

Kết quả
    "desserts"

Vâng. Chúng ta đã thấy đủ các ví dụ dễ dàng. Bây giờ chúng ta hãy làm điều gì đó phức tạp hơn một chút:

### `drop'`: Xóa `n` phần tử đầu tiên trong list

Vì vậy, nó nhận một số nguyên và một danh sách rồi trả về một danh sách. Và bởi vì, về nguyên tắc, chúng ta sẽ không thao tác trên các phần tử của danh sách, nên chúng ta có thể sử dụng một kiểu đa hình như sau:

``` {.haskell}
drop' :: Int -> [a] -> [a]
```

VÂNG! Điều này là mới! Chúng ta có hai đối số khác nhau để tính đến bây giờ.

Cách để làm điều này là trình bày tất cả các kết hợp mẫu tiêu chuẩn có thể có. Bởi vì chúng ta có số, ban đầu chúng ta tính đến mẫu cho `0` và bất kỳ số nào khác. Và bởi vì chúng ta có danh sách, chúng ta phải tính đến mẫu cho danh sách trống và không trống.

Vì vậy chúng ta có:


``` {.haskell}
drop' :: Int -> [a] -> [a]
drop' 0 []     =
drop' 0 (x:xs) =
drop' n []     =
drop' n (x:xs) =
```
Như bạn có thể thấy, còn nhiều điều cần tính đến. Nhưng nó không nhất thiết phải khó khăn hơn. Chúng ta hãy suy nghĩ về từng trường hợp riêng lẻ.

1. Nếu chúng ta kiểu bỏ `0` các phần tử khỏi một danh sách trống, điều đó có nghĩa là kết quả sẽ là một danh sách trống.
2. Nếu chúng ta kiểu bỏ `0` các phần tử khỏi danh sách không trống, chúng ta sẽ trả về danh sách chính xác tương tự.
3. Nếu chúng ta kiểu bỏ `n` các phần tử khỏi danh sách trống, chúng ta có thể trả về lỗi hoặc danh sách trống. Chúng ta chọn trả lại danh sách trống.

Thay thế điều đó trong các định nghĩa:

``` {.haskell}
drop' :: Int -> [a] -> [a]
drop' 0 []     = []
drop' 0 (x:xs) = x:xs
drop' n []     = []
drop' n (x:xs) =
```
Chúng ta đã hoàn thành 3 trong số 4 trường hợp. Bây giờ, chúng ta muốn kiểu bỏ `n` số lượng phần tử khỏi danh sách không trống thì sao?

Chúng ta đã có phần tử đầu tiên được tách ra khỏi danh sách. Vì vậy, nếu chúng ta kiểu bỏ cái đó thì sẽ bớt một phần tử cần kiểu bỏ. Nhưng nếu chúng ta chỉ làm điều gì đó như drop n xs, hàm sẽ tiếp tục kiểu bỏ các phần tử cho đến khi danh sách trống.

May mắn thay, có một giải pháp dễ dàng. Nếu chúng ta gọi đệ quy drop'với xs, chúng ta sẽ kiểu bỏ một phần tử trên mỗi lệnh gọi đệ quy. Vì vậy, chúng ta có thể trừ đi `1` trên nmỗi cuộc gọi để giữ cho cuộc gọi được đồng bộ hóa. Bằng cách đó, nếu có nhiều hơn `n` các phần tử, chúng ta sẽ dừng đệ quy khi chúng ta đạt đến `n = 0`:


``` {.haskell}
drop' :: Int -> [a] -> [a]
drop' 0 []     = []
drop' 0 (x:xs) = x:xs
drop' n []     = []
drop' n (x:xs) = drop' (n - 1) xs
```

Vâng. Chúng ta có một hàm làm việc đầy đủ. Nhưng có một vài điều cần được cải thiện:

1. Có hai trường hợp lấy một danh sách trống đều trả về một danh sách trống. Vì vậy, chúng ta có thể bỏ qua the `Int` trong những trường hợp đó.
2. Trong trường hợp thứ hai, chúng ta chỉ chuyển qua đầu vào, do đó, không cần khớp mẫu.
3. Chúng ta không sử dụng `x` trong định nghĩa đệ quy, vì vậy chúng ta cũng có thể bỏ qua nó.

Thực hiện những thay đổi đó, chúng ta nhận được:


``` {.haskell}
drop' :: Int -> [a] -> [a]
drop' _ []     = []
drop' 0 xs     = xs
drop' n (_:xs) = drop' (n - 1) xs
```

Có vẻ như chúng ta đã có hàm `drop` cuối cùng của mình. Nhưng chúng ta đã thực sự tối ưu chưa? Điều gì xảy ra nếu n < 0? Về mặt lý thuyết, nó không có ý nghĩa gì cả. Nhưng trong thực tế, ai đó có thể đủ điên để thử nó!

Trong trường hợp đó, hàm hiện tại của chúng ta sẽ tiếp tục kiểu bỏ từng phần tử một cho đến khi hết vì chúng ta sẽ không bao giờ đến được n = 0.

Đó có thể là một cách để xử lý trường hợp đó. Nhưng theo trực giác, bạn sẽ nghĩ rằng việc kiểu bỏ một số phần tử âm sẽ giống như việc kiểu bỏ các phần tử bằng không.

Vì vậy, chúng ta phải điều chỉnh định nghĩa của mình để phù hợp với điều đó. Và để làm điều đó, chúng ta có thể thay đổi trường hợp xử lý `n == 0` thành xử lý `n <= 0` bằng cách liên kết số với biến nvà sử dụng bộ bảo vệ để kiểm tra thuộc tính mong muốn.

Như thế này:



``` {.haskell}
drop' :: Int -> [a] -> [a]
drop' _ []           = []
drop' n xs | n <= 0  = xs
drop' n (_:xs)       = drop' (n - 1) xs


drop' (-3) [1,2,3]
Kết quả
    [1,2,3]

yesYouDo :: String -> String
yesYouDo = ("Ok, I do"++) . drop' 7

Kết quả
    "Ok, I do like chocolate."

yesYouDo "I don't like chocolate."
yesYouDo "I don't like to write silly examples."

Kết quả
    "Ok, I do like to write silly examples."
```


### `take'`: Lấy (và trả lại) `n` nphần tử đầu tiên từ danh sách

Hàm này tương tự một cách kỳ lạ với drop'. Nó nhận một số nguyên và một danh sách và trả về một danh sách. Nhưng lần này, danh sách chứa tất cả các phần tử từ phần tử đầu tiên cho đến phần tử n. Vì chúng ta vừa thấy một trường hợp tương tự nên chúng ta sẽ cùng nhau thực hiện bước đầu tiên và bước thứ hai:



``` {.haskell}
take' :: Int -> [a] -> [a]
take' 0 []     =
take' 0 (x:xs) =
take' n []     =
take' n (x:xs) =
```
Tương tự như trước đây, chúng ta hãy nghĩ về từng trường hợp riêng lẻ:

1. Nếu chúng ta lấy `0` phần tử từ một danh sách trống, điều đó có nghĩa là kết quả sẽ là một danh sách trống.
2. Nếu chúng ta lấy `0` phần tử từ một danh sách không trống, chúng ta không lấy gì cả, vì vậy chúng ta  trả về một danh sách trống.
3. Nếu chúng ta lấy `n` các phần tử từ danh sách trống, chúng ta có thể trả về lỗi hoặc danh sách trống. Chúng ta  chọn trả lại danh sách trống.

Vì vậy, thay thế rằng:

``` {.haskell}
take' :: Int -> [a] -> [a]
take' 0 []     = []
take' 0 (x:xs) = []
take' n []     = []
take' n (x:xs) =
```

Vâng, nó thất là dễ dàng. Bây giờ, đối với trường hợp đệ quy. Giống như lần trước, chúng ta cũng cần giảm `n` đi 1 trên mỗi bước. Nhưng, không giống như lần trước, bây giờ chúng ta  muốn giữ các phần tử trên mỗi bước. Và có một cách dễ dàng để làm điều đó.

Chúng ta có thể thêm chúng vào một danh sách mới sẽ tiếp tục lớn hơn theo cách đệ quy cho đến khi chúng ta  tiếp cận `n = 0` hoặc hết các phần tử trong danh sách:


``` {.haskell}
take' :: Int -> [a] -> [a]
take' 0 []     = []
take' 0 (x:xs) = []
take' n []     = []
take' n (x:xs) = x : take' (n-1) xs
```
Bây giờ, chúng ta có thể đơn giản hóa biểu thức:

1. Nếu `n = 0`, chúng ta  không quan tâm đến danh sách. Dù sao thì chúng ta  cũng sẽ trả về một danh sách trống.
2. Nếu danh sách trống, chúng ta  không quan tâm đến số lượng. Dù sao thì chúng ta  cũng sẽ trả về một danh sách trống.

Được dịch sang mã:



``` {.haskell}
take' :: Int -> [a] -> [a]
take' 0 _      = []
take' _ []     = []
take' n (x:xs) = x : take' (n-1) xs
```

Chúng ta  có cùng một vấn đề như chúng ta đã làm với hàm `drop`. Theo trực giác, việc lấy một số phần tử âm sẽ làm giống như việc lấy các phần tử bằng không. Nó không nên trả lại toàn bộ danh sách.

May mắn thay, chúng ta đã biết cách giải quyết vấn đề này. Tương tự như với `drop`:


``` {.haskell}
take' :: Int -> [a] -> [a]
take' n _ | n <= 0 = []
take' _ []         = []
take' n (x:xs)     = x : take' (n-1) xs

take' 3 [1,2,3,4,5]

Kết quả
    [1,2,3]

take' (-3) [1,2,3,4,5]


Kết quả
    []
```

### `map'`: Một hàm bậc cao áp dụng một hàm cho mọi phần tử trong danh sách


Như mọi khi, hãy bắt đầu với kiểu. Chúng ta sẽ có một hàm và một danh sách và sẽ trả về một danh sách. Bởi vì chúng ta không biết hàm sẽ được truyền dưới dạng đối số, nên chúng ta sẽ sử dụng các biến kiểu đa hình. 

Vì vậy, kiểu là:

``` {.haskell}
map' :: (a -> b) -> [a] -> [b]
```

Bây giờ, hãy liệt kê các trường hợp. Trong trường hợp của một hàm, chỉ có một trường hợp. Bạn nhận được hàm. Vì vậy, có tính đến "estandard" các trường hợp cho danh sách, chúng ta nhận được:


``` {.haskell}
map' :: (a -> b) -> [a] -> [b]
map' f []     =
map' f (x:xs) =
```

Nếu chúng ta không có phần tử nào trong danh sách, chúng ta chỉ trả về danh sách trống. Đó sẽ là trường hợp cơ bản của chúng ta. Ngoài ra, chúng ta sẽ không sử dụng hàm này trong trường hợp này, vì vậy chúng ta có thể bỏ qua nó:

``` {.haskell}
map' :: (a -> b) -> [a] -> [b]
map' _ []     = []
map' f (x:xs) =
```

Bây giờ đối với trường hợp đệ quy, chúng ta phải áp dụng hàm `f` cho mọi phần tử và trả về danh sách. Vì vậy, chúng ta có thể áp dụng `f` cho phần tử đầu tiên (`x`) và thêm nó vào trước việc sử dụng đệ quy của `map'` áp dụng cho phần còn lại của danh sách (`xs`):


``` {.haskell}
map' :: (a -> b) -> [a] -> [b]
map' _ []     = []
map' f (x:xs) = f x : map' f xs


map' (+1) [1,2,3,4]
map' (++"!") ["Hey","Ho","Let's go"]
```

Kết quả
    [2,3,4,5]


Kết quả
    ["Hey!","Ho!","Let's go!"]

Đây là một hàm cực kỳ hữu ích. Bạn sẽ sử dụng nó khá thường xuyên!

Bây giờ, hãy thực hiện một định nghĩa đệ quy cuối cùng trước khi tìm hiểu về folds!



### `filter'`: Lọc các phần tử của danh sách thỏa mãn. {#filter-filter-the-elements-of-a-list-that-dont-satisfy-a-predicate}

Chúng ta đã sử dụng hàm này khá nhiều. Vì vậy, bạn biết làm thế nào nó hoạt động. Nó nhận một vị từ và một danh sách rồi trả về một danh sách chỉ có các phần tử thỏa mãn vị từ đó:


``` {.haskell}
filter' :: (a -> Bool) -> [a] -> [a]
```
Bây giờ, nếu chúng ta liệt kê các trường hợp, tham số đầu tiên là một hàm, do đó, chỉ có một trường hợp và tham số thứ hai là một danh sách, do đó, nó có thể là danh sách trống hoặc danh sách không trống:

``` {.haskell}
filter' :: (a -> Bool) -> [a] -> [a]
filter' p []     =
filter' p (x:xs) =
```

Bởi vì chúng ta không có phần tử nào để lọc trong trường hợp đầu tiên, nên chúng ta trả về một danh sách trống. Và bởi vì chúng ta sẽ không sử dụng điều kiện, chúng ta có thể bỏ qua nó. Nó bắt đầu cảm thấy dễ dàng, phải không?



``` {.haskell}
filter' :: (a -> Bool) -> [a] -> [a]
filter' _ []     = []
filter' p (x:xs) =
```

Bây giờ hãy giải quyết trường hợp đệ quy.

Trong trường hợp này, chúng ta có hai tình huống. Một là phần tử thỏa mãn điều kiện, và hai là nó không thỏa mãn. Chúng ta có thể truyền đạt điều này theo những cách khác nhau. Tôi thích sử dụng Guard hơn:

``` {.haskell}
filter' :: (a -> Bool) -> [a] -> [a]
filter' _ []     = []
filter' p (x:xs)
    | p x       =
    | otherwise =
```
Vì vậy, nếu điwwù kiện `p` được áp dụng cho phần tử đầu tiên `x` trả về `True`, chúng ta sẽ thêm phần tử vào danh sách mà chúng ta sẽ trả về ở cuối. Nếu không, chúng ta không gì thêm. Và trong cả hai trường hợp, chúng ta áp dụng đệ quy filter' cho các phần tử còn lại (`xs`).

Chúng ta nhận được:




``` {.haskell}
filter' :: (a -> Bool) -> [a] -> [a]
filter' _ []     = []
filter' p (x:xs)
    | p x       = x : filter' p xs
    | otherwise = filter' p xs
    

filter' (==True) [True,False,True,True,False]
Kết quả
    [True,True,True]

filter' ('!' `elem`) ["Hey!", "How are you?"]
Kết quả
    ["Hey!"]

filter' (\x -> x**2 < 37) [1,2,3,4,5,6,7,8,9,10]
Kết quả
    [1.0,2.0,3.0,4.0,5.0,6.0]

```

Và đó là nó! Bạn có thể lọc đi!

Vâng. Chúng ta đã tạo đủ các hàm đệ quy để bắt đầu nhận thấy một số mẫu. Vì vậy, chúng ta hãy nói về điều đó.



## Hàm `foldr` 

Hãy xem các hàm được xác định trước đó. Xem nếu bạn có thể phát hiện ra một mô hình:

``` {.haskell}
sum' :: [Int] -> Int
sum' []     = 0
sum' (x:xs) = x + sum' xs
```

``` {.haskell}
product' :: [Int] -> Int
product' []     = 1
product' (x:xs) = x * product' xs
```

``` {.haskell}
and' :: [Bool] -> Bool
and' []     =  True
and' (x:xs) =  x && and' xs
```
Như bạn có thể thấy, có một mẫu lặp lại trong mọi hàm!:

1. Có một trường hợp cơ sở cho một danh sách trống trả về một giá trị không đệ quy.
2. Có một trường hợp đệ quy cho một danh sách khác trống lấy giá trị đầu tiên của danh sách và áp dụng một hàm để kết hợp nó với một lệnh gọi đệ quy xử lý phần còn lại của danh sách.

Mô hình này có một tên! Nó được gọi là **"đệ quy nguyên thủy"**.

Đến bây giờ, Chúng ta sẽ trích xuất mẫu thành hàm riêng của nó! Nhưng trước tiên, hãy lưu ý rằng mẫu này giả định rằng hàm kết hợp các giá trị trong trường hợp đệ quy là một toán tử. Để làm cho nó tổng quát hơn, hãy sửa đổi chúng để sử dụng hàm tiền tố trước khi giải nó:


``` {.haskell}
sum' :: [Int] -> Int
sum' [] = 0
sum' (x:xs) = (+) x (sum' xs)
```



``` {.haskell}
product' :: [Int] -> Int
product' [] = 1
product' (x:xs) = (*) x (product' xs)
```



``` {.haskell}
and' :: [Bool] -> Bool
and' []     =  True
and' (x:xs) =  (&&) x (and' xs)
```

Chúng ta sẽ gọi phần trừu tượng(abstraction) `foldr`(duh) vì chúng ta đang gấp danh sách từ bên phải. Bạn sẽ thấy những gì tôi muốn nói.

Như mọi khi, (đầu tiên, chúng ta bắt đầu với kiểu. Vì vậy, chúng ta cần 3 đối số:

1. Một hàm để kết hợp các yếu tố của danh sách. Vì vậy, nó sẽ lấy hai phần tử và tạo một phần tử mới.
2. Một giá trị cơ sở để bắt đầu từ.
3. Một danh sách.

Lưu ý rằng các phần tử bên trong danh sách có thể là bất kỳ thứ gì, nhưng không nhất thiết phải cùng kiểu với kết quả. (Chúng ta không biết hàm sẽ làm gì.) Vì vậy, chúng ta sẽ sử dụng kiểu `a` cho các phần tử của danh sách và kiểu `b` cho kết quả. Và từ đó, giá trị cơ sở phải thuộc loại `b` và hàm phải thuộc loại `a -> b -> b`.


``` {.haskell}
foldr :: (a -> b -> b) -> b -> [a] -> b
```

Ok, bây giờ, hãy trích xuất mẫu vào hàm riêng của nó. Hãy bắt đầu bằng cách trình bày mẫu và chúng ta sẽ bắt đầu từ đó:

``` {.haskell}
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr f v [] =  -- base value
foldr f v (x:xs) = --function combining value and recursion
```
Chúng ta đã có giá trị cơ sở (`v`). Đó là một trong những lý lẽ. Và cuộc gọi đệ quy chỉ là áp dụng hàm `f` cho `x` và một cuộc gọi đệ quy `foldr` nhưng với `xs` thay vì danh sách ban đầu. Vì vậy, chúng ta có thể làm điều đó trong định nghĩa:

``` {.haskell}
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr _ v [] =  v
foldr f v (x:xs) = f x (foldr f v xs)
```

Xong! Chúng ta vừa trích xuất mẫu **"đệ quy nguyên thủy"!**

Để chứng minh rằng nó thực sự giống nhau, chúng ta sẽ chuyển các tham số cần thiết để tạo hàm `sum` và làm việc thông qua một ví dụ:

``` {.haskell}
-- same as: sum [1,2,3,4]
foldr (+) 0 [1,2,3,4] = (+) 1 (foldr (+) 0 [2,3,4])
                      = (+) 1 ((+) 2 (foldr (+) 0 [3,4]))
                      = (+) 1 ((+) 2 ((+) 3 (foldr (+) 0 [4])))
                      = (+) 1 ((+) 2 ((+) 3 ((+) 4 (foldr (+) 0 []))))
                      = (+) 1 ((+) 2 ((+) 3 ((+) 4 0))) -- 1 + ( 2 + ( 3 + ( 4 + 0 )))
                      = (+) 1 ((+) 2 ((+) 3 4)) -- 1 + ( 2 + ( 3 + 4 ))
                      = (+) 1 ((+) 2 7) -- 1 + ( 2 + 7 )
                      = (+) 1 9 -- 1 + 9
                      = 10
```

Bây giờ, chúng ta có thể thay thế nó trong các định nghĩa trước đây của mình để có được mã rõ ràng và ngắn gọn hơn nhiều:

``` {.haskell}
sum' :: [Int] -> Int
sum' = foldr (+) 0 -- We partially apply foldr


product' :: [Int] -> Int
product' = foldr (*) 1


and' :: [Bool] -> Bool
and' = foldr (&&) True
```
Nếu, trong khi xác định một hàm đệ quy, bạn phát hiện ra rằng mình đang sử dụng mẫu này, hãy sử dụng `foldr` thay thế! Bằng cách đó, mọi người (bao gồm cả bạn hai tháng sau) sẽ hiểu ngay hàm này làm gì mà không cần tìm ra đệ quy.

Nhắc mới nhớ, `length'` hàm này gần như hoàn toàn phù hợp!:

``` {.haskell}
length' :: [a] -> Int
length' []     = 0
length' (_:xs) = (+) 1 (length' xs)
```

Sự khác biệt duy nhất là chúng ta bỏ qua `x` và thay vào đó thêm một giá trị không đổi. Giá như chúng ta có thể mã hóa cứng tham số đầu tiên của  `+` . .. đó sẽ là hoàn hảo! Chà, tại sao chúng ta không tạo một hàm thực hiện điều đó và chuyển hàm đó thay vì `+`? Chúng ta chỉ cần lấy hai tham số, bỏ qua tham số đầu tiên và thêm `1` vào tham số thứ hai! Chúng ta có thể dễ dàng làm điều đó với hàm lambda nhanh chóng:


``` {.haskell}
length' :: [a] -> Int
length' []     = 0
length' (x:xs) = (\_ n -> 1 + n) x (length' xs) --lambda could be simplified to (\_ -> (+) 1)

length' [1,2,3,4,5]
```

Kết quả
    5

Và bùm! Cứ như vậy, `length'` hoàn toàn phù hợp với khuôn mẫu! Vì vậy, chúng ta có thể thay thế nó bằn `foldr`:



``` {.haskell}
length' = foldr (\_ n -> 1 + n) 0

length' [1,2,3,4,5]
```

Kết quả
    5

Như bạn có thể thấy, có một sự linh hoạt nhất định. Hãy thực hiện lại `reverse'` nhưng với `foldr`:


``` {.haskell}
reverse' :: [a] -> [a]
reverse' = foldr (\x xs -> xs ++ [x]) []

reverse' [1,2,3,4,5]
```

Kết quả
    [5,4,3,2,1]


Có vẻ như chúng ta có thể sử dụng `foldr` cả ngày dài. Nhưng nó không phải là tất cả mầu hồng. Ví dụ: nếu sử dụng `reverse'` với list có số  lớn như một nghìn, mười nghìn hoặc thậm chí nhiều hơn, thì phí sử dụng `++` ngày  càng lớn hơn.

Tại sao? Chà . .. hãy xem cách `++` định nghĩa trong thư viện cơ sở:

``` {.haskell}
(++) :: [a] -> [a] -> [a]
(++) []     ys = ys
(++) (x:xs) ys = x : xs ++ ys
```
Như bạn có thể thấy trong trường hợp đệ quy, mỗi lần chúng ta muốn thêm hai danh sách, trước tiên, chúng ta duyệt qua tất cả các phần tử của danh sách đầu tiên, sau đó chúng ta thêm danh sách thứ hai vào cuối. Vì vậy, nếu chúng ta có một danh sách lớn hơn gấp 10 lần, chúng ta phải đợi gấp 10 lần để hoàn thành. Có nghĩa là phải mất thời gian tuyến tính trong số phần tử của danh sách đầu tiên.

Điều đó có ý nghĩa gì đối với chúng ta? Điều đó có nghĩa là, trong `reverse'` lời gọi đệ quy của `\`, mỗi lần chúng ta muốn di chuyển một phần tử từ đầu ra cuối danh sách (mỗi khi chúng ta thực hiện một lời gọi đệ quy), chúng ta phải duyệt qua toàn bộ danh sách! Mỗi lần! Nếu danh sách đủ dài, bạn có thể chạy trong khi đợi nó được đảo ngược!

Nhưng đừng lo lắng. Tôi sẽ không để bạn treo như vậy. Có một giải pháp gọn gàng cho việc này. Nếu chúng ta có thể duyệt danh sách từ trái sang phải thay vì từ phải sang trái, chúng ta có thể sử dụng toán tử (`:`) thay vì `++` và trong mỗi lệnh gọi đệ quy, chúng ta sẽ thêm phần tử ngay từ đầu. Không cần đi qua toàn bộ danh sách!


## Hàm `foldl`


`foldl` về cơ bản giống như `foldr` nhưng duyệt qua danh sách từ trái sang phải:


``` {.haskell}
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr f v [] =  v
foldr f v (x:xs) = f x (foldr f v xs)


foldl :: (a -> b -> a) -> a -> [b] -> a
foldl f v [] = v
foldl f v (x:xs) = foldl f (f v x) xs
```



Ví dụ: hãy xem điều gì sẽ xảy ra từng bước khi chúng ta thay thế bằng `foldr` với `foldl` trong hàm `sum`:

(Lưu ý cách đối số thứ hai tiếp tục phát triển trong khi đối số thứ ba tiếp tục nhỏ hơn.)


``` {.haskell}
foldl (+) 0 [1,2,3,4] = foldl (+) ((+) 0 1) [2,3,4]
                      = foldl (+) ((+) ((+) 0 1) 2) [3,4]
                      = foldl (+) ((+) ((+) ((+) 0 1) 2) 3) [4]
                      = foldl (+) ((+) ((+) ((+) ((+) 0 1) 2) 3) 4) []
                      = (+) ((+) ((+) ((+) 0 1) 2) 3) 4 -- ((( 0 + 1 ) + 2 ) + 3 ) + 4
                      = (+) ((+) ((+) 1 2) 3) 4 -- ((1 + 2 ) + 3 ) + 4
                      = (+) ((+) 3 3) 4 -- (3 + 3 ) + 4
                      = (+) 6 4 -- 6 + 4
                      = 10
```



và đó là cách hàm `foldl` làm việc.

Và bởi vì bây giờ chúng ta có thể duyệt qua danh sách từ trái sang phải, nên chúng ta có thể sử dụng toán tử `:` để nối các giá trị thay vì `++`.

Tính đến điều đó, chúng ta có thể viết `reverse'` như sau:


``` {.haskell}
reverse'' :: [a] -> [a] 
reverse'' = foldl (\x y -> y:x) []  -- Same as: foldl (flip (:)) []

reverse'' [1,2,3,4,5]
```

Kết quả
    [5,4,3,2,1]


Và bây giờ, chúng ta có thể so sánh tốc độ của hai hàm bằng cách đảo ngược danh sách từ 1 đến 10.000! Chạy hai ô riêng biệt và xem sự khác biệt về tốc độ:

(Chúng ta sử dụng `sum` để tránh in toàn bộ danh sách)



``` {.haskell}
sum . reverse' $ [1..10000] -- With foldr and (++)
```

Kết quả
    50005000


``` {.haskell}
sum . reverse'' $ [1..10000] -- With foldl and (:)
```

Kết quả
    50005000




Một cải tiến ấn tượng! Nhưng không phải là điều duy nhất khác nhau giữa `foldr` and `foldl`!

Cho đến giờ, chúng ta chưa gặp trường hợp này bởi vì, chẳng hạn, toán tử cộng (`+`) trả về cùng một cách:



``` {.haskell}
foldr (+) 0 [4,3,2,1] == foldl (+) 0 [4,3,2,1]
```

Kết quả
    True

Tuy nhiên, đối với một số nhà khai thác, thứ tự của hoạt động có thể cho kết quả khác nhau tùy thuộc vào hướng! Ví dụ: xem xét (`-`)thay vì `(+)`:


``` {.haskell}
foldr (-) 0 [4,3,2,1] == foldl (-) 0 [4,3,2,1]
```

Kết quả
    False

Điều này là sai bởi vì nếu chúng ta viết rõ ràng các hoạt động, chúng ta sẽ nhận được:

``` {.haskell}
foldl (-) 0 [4,3,2,1] = (((0-4)-3)-2)-1 = -10
```

khong khi

``` {.haskell}
foldr (-) 0 [4,3,2,1] = 4-(3-(2-(1-0))) = 2
```

Vì vậy, đó là một điều khác cần tính đến.

Và cuối cùng, có một điều cuối cùng tôi muốn nói đến. Và đó là `foldl'`.

## Hàm `foldl'` {#the-foldl-function}


Tất cả các hàm chúng ta đã xác định cho đến nay đều có `'` ở cuối vì chúng đã tồn tại trong Haskell và chúng ta không muốn xảy ra xung đột. Nhưng mà! foldl'cũng là một hàm đi kèm với Haskell và nó hoạt động hơi khác so với `foldl`.



Cả hai `foldr` và `foldl`, chúng ta thấy rằng chúng ta tiếp tục xếp chồng các biểu thức cho đến khi kết thúc. Và sau đó chúng ta giảm chúng. (Trên thực tế, Haskell làm tất cả công việc, không phải chúng ta. Nhưng bạn hiểu rõ.)

Điều này có nghĩa là nếu bạn cố gắng sắp xếp một danh sách đủ lớn, bạn sẽ nhận được một `stack overflow` ngoại lệ!

Nếu chúng ta chọn bất kỳ bước trung gian nào trong  `foldr'`:

``` {.haskell}
-- Same as:             (+) 1 ((+) 2 ((+) 3 (foldr (+) 0 [4])))
foldr (+) 0 [1,2,3,4] = 1 + (2 + (3 + (foldr (+) 0 [4]))) 
```

Chúng ta thấy rằng chúng ta không thể làm được gì nhiều `foldr` vì chúng ta không có một toán tử nào có cả hai đối số. Vì vậy, chúng ta sẽ luôn cần giải quyết hàm đệ quy trước.

Nhưng mà! Nếu chúng ta xem xét bước trung gian tương tự trong `foldl`:


``` {.haskell}
-- Same as:             foldl (+) ((+) ((+) ((+) 0 1) 2) 3) [4]
foldl (+) 0 [1,2,3,4] = foldl (+) (((0 + 1) + 2) + 3) [4]
```



Chúng ta hoàn toàn có thể giảm `(((0 + 1) + 2) + 3)` xuống `6` trước khi tiếp tục với đệ quy!

Và đó là những gì `foldl'` làm!

Để rõ ràng: `foldl` và `foldl'` trả lại kết quả tương tự! Sự khác biệt là`foldl'` rlàm giảm các biểu thức ở các bước trung gian. Vì vậy, nó hiệu quả hơn vì nó không tạo ra một khối lớn!

Vì vậy, nếu chúng ta chạy một cái gì đó như thế này:

``` {.haskell}
foldl (+) 0 [1..1000000] -- Don't run it! I'm warning you!
```
Bạn sẽ nhận được một ngoại lệ tràn ngăn xếp. Nhưng nếu bạn sử dụng `foldl'` tay thế:

``` {.haskell}
import Data.List

foldl' (+) 0 [1..1000000]  -- No problems!
```

Kết quả
    500000500000

Bạn sẽ không gặp vấn đề gì.

Và điều này đặt ra một câu hỏi. Khi nào bạn nên sử dụng từng cái?



## Khi nào sử dụng `foldr`, `foldl`, hay `foldl'`



Thông thường, sự lựa chọn là giữa `foldr` avàd `foldl'`, khi `foldl` và
`foldl'` giống nhau ngoại trừ các thuộc tính nghiêm ngặt của chúng. Vì vậy, nếu cả hai đều trả về một kết quả, `foldl'` thì đây là cách hiệu quả hơn để đạt được kết quả đó vì nó không tạo ra một khối lớn.

Tuy nhiên, đó không phải là toàn bộ câu chuyện. Chúng ta sẽ đưa ra một số quy tắc ngón tay cái từ lần đầu tiên được sử dụng ít nhất đến được sử dụng nhiều nhất:

Sử dụng `foldl`:

-   ít khi.
-   Nếu hàm kết hợp lười biếng trong đối số đầu tiên của nó. (`foldl` có thể trả về kết quả. Khi đó  `foldl'` thì không.)



Sử dụng `foldl'`:

-   Khi danh sách mà nó được áp dụng lớn nhưng chắc chắn là hữu hạn, bạn không quan tâm đến sự đảo ngược ngầm định (ví dụ: vì hàm kết hợp của bạn có tính chất giao hoán) và bạn tìm cách cải thiện hiệu suất của mã của mình.
-   Khi bạn thực sự muốn đảo ngược thứ tự của danh sách ngoài việc có thể thực hiện một số phép biến đổi khác đối với các phần tử. (Tận dụng lợi thế của đảo ngược ngầm.)



Sử dụng  `foldr`:

-  Khi chuyển danh sách thành danh sách có các phần tử liên quan theo cùng một thứ tự.
-   Khi chuyển danh sách vô hạn thành danh sách vô hạn khác. (Nếu hàm được truyền là lười biếng trong đối số thứ hai của nó, `foldr` thì sẽ tạo ra kết quả một cách lười biếng, chỉ tính toán nhiều như được yêu cầu.)
-   Khi hàm gấp (folding) có thể ngắn mạch (chấm dứt sớm) bằng cách mang lại kết quả không phụ thuộc vào giá trị của tham số tích lũy.
-   Nếu bạn không chắc chắn.



Những quy tắc ngón tay cái này không nhất thiết phải luôn luôn áp dụng. Và bởi vì việc tìm hiểu tất cả lý do tại sao của các quy tắc này có thể chiếm cả lớp, nên chúng ta sẽ dành phần này cho những người tò mò hoặc khi bạn cần.[Here\'s
more information on the
subject](https://wiki.haskell.org/Foldr_Foldl_Foldl').


