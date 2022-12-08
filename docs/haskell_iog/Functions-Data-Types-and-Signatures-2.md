# 2-Data types, Signatures, and Polymorphism
 [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/input-output-hk/haskell-course/HEAD?labpath=%2Flessons%2F02-Functions-Data-Types-and-Signatures.ipynb) [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=flat&logo=YouTube&logoColor=white)](https://youtu.be/nANU-qBZ0pU)
## Outline

-   Giới thiệu các kiểu thực tế
-   Chữ ký của hàm
-   Làm việc với hàm
    -   Biến trong Haskell
    -   Hàm trung tố và tiền tố
-   Các kiểu dữ liệu phổ biến
-   Giá trị đa thức và biến kiểu
-   Fun danh sách list!

## Giới thiệu các kiểu thực tế

### The `::` {#the-}

Một kiểu là một nhãn mà mọi biểu thức đều có và hạn chế việc sử dụng nó.

Chúng ta sử dụng *dấu hai chấm* `::` để hiển thị hoặc chỉ định loại biểu thức. 
Ví dụ: 

``` {.haskell}
myexpression :: MyType 
```

cho chúng ta biết rằng biểu thức `myexpression` có kiểu là `MyType`.

### Các kiểu thường dùng


Dưới đây là các kiểu tiêu chuẩn thường được sử dụng trong Haskel

-   `Int` và `Integer` cho số nguyên.
-   `Float` và `Double` cho số thực.
-   `Bool` và `True` và `False`.
-   `Char` ký tự.
-   `String` cho chuỗi text.

### Làm thế nào để kiểm tra các kiểu?

 Lệnh `:type`  (hoặc `:t`) trong GHCI, theo sau là bất kỳ biểu thức hợp lệ nào, cho chúng tôi biết loại của nó.

``` {.haskell}
:type True

:type False

:t (3 < 5)

:t 'A'

:t "Hello world!"
```

## Signature của hàm

 Ký hiệu dấu hai chấm đôi `::` nên được đọc đơn giản là \"thuộc kiểu\",
và cho biết kiểu *signature*. Hãy giải thích chữ ký kiểu là gì qua ví dụ sau. Trong Haskell, một hàm bình phương đối số của nó được định nghĩa là:

``` {.haskell}
square :: Int -> Int
square v = v * v
```
Dòng đầu tiên chứa chữ ký **signature** , dòng thứ hai chứa định nghĩa **definition** của hàm `square`.

-   **signature** của một hàm là một thông báo cho toàn thế giới rằng hàm đó tồn tại, đây là tên của nó và đây là các kiểu mà nó hoạt động.



-   **definition** của hàm là thông tin về chức năng chính xác của hàm này

Trong signature

``` {.haskell}
square :: Int -> Int
```


Có hai phần phân cách nhau bởi dấu hai chấm đôi `::`

-   phần tên **name** của hàm bên trái

-   và **Kiểu của hàm** bên phải.

**Tất cả dữ liệu trong chương trình Haskell thuộc một kiểu cụ thể.** Và vì hàm hoạt động với dữ liệu nên, its **của nó chứa các loại đầu vào và đầu ra của nó, được phân tách bằng các mũi tên `->`**.

*signature* của hàm bình phương `square` cho chúng ta biết rằng nó chấp nhận một đối số kiểu duy nhất là `Int` và trả về giá trị kiểu `Int`


Nếu có nhiều hơn một đối số, chữ ký sẽ được rút ra một cách đơn giản. Ví dụ, `prod` chữ ký hàm trả về tích của hai đối số nguyên, có thể trông như sau

``` {.haskell}
prod :: Int -> Int -> Int
prod x y = x * y
```

Nó có hai đối số kiểu `Int` và đầu ra của nó cũng có kiểu `Int`.

 Trong định nghĩa của hàm, dấu đẳng thức `=` phân tách mã thành hai phần

-   **Head** là mã bên trái dấu `=` và bao gồm tên của hàm và tên đối số (tên, không phải kiểu!), được phân tách bằng dấu cách.

-   **Body** là một mã ở bên phải dấu `=` thể hiện bản chất của hàm, nội dung của nó

### Chữ ký **signature** cho chúng ta biết điều gì?

Haskell là một ngôn ngữ lập trình hàm và mỗi chương trình bao gồm các hàm. Mỗi hàm nhận một số tham số cố định của một số loại và trả về một giá trị cũng có một loại. 
Chẳng hạn, một hàm:

``` {.haskell}
not :: Bool -> Bool
```
Lấy một tham số thuộc kiểu `Bool` và trả về phủ định của nó, một lần nữa thuộc kiểu `Bool`

Nhìn vào mũi tên ngoài cùng bên phải `->` trong chữ ký (signature), chúng ta hiểu rằng

-   mọi thứ ở bên trái của nó là các loại đối số , cũng có thể được phân tách bằng các mũi tên `->`,

-  mọi thứ ở bên phải là một kiểu **giá trị được tính toán**.

## Làm việc với Hàm

### Biến trong Haskell (Names/definitions)

Xem hàm này:

``` {.haskell}
name = "Bob"
```

Nếu chúng ta không có tham số, chúng ta có một hàm luôn trả về cùng một giá trị---a `String`- --, không có vấn đề gì!

Vì vậy, chúng ta có một biểu thức kiểu:

``` {.haskell}
name :: String
name = "Bob"
```

**Loại hàm không nhận tham số thường được gọi là định nghĩa hoặc tên.**

Mặc dù vậy, bạn cũng có thể gọi nó là biến, vì đây là thứ mà hầu hết các ngôn ngữ lập trình gọi là biến. Tuy nhiên, \"biến\" không phải lúc nào cũng có nghĩa giống nhau. 

Bởi vì chúng ta không thể thay đổi giá trị của một định nghĩa (biểu thức ở bên phải của `=` luôn đánh giá bằng cùng một kết quả) `name` và `"Bob"` về cơ bản là giống nhau. Và chúng ta có thể sử dụng chúng thay thế cho nhau.

 Khi nói về lập trình nói chung, một biến giống như một chiếc hộp chứa một giá trị. Và tên của biến được viết ở bên cạnh hộp. Bạn có thể đặt các giá trị bên trong hộp và---trong hầu hết các ngôn ngữ lập trình---sau này bạn có thể đổi ý và thay thế giá trị bên trong hộp.
:
``` {.haskell}
-- THIS IS NOT VALID HASKELL!!!
x = 3
7 + x   -- 10
x = 5
7 + x   -- 12
```
 OOOOOOOOhhhhhh nhưng không phải với Haskell, không, không, không! Khi bạn nói với Haskell điều đó xcó nghĩa là 3, nó sẽ có nghĩa là 3mãi mãi!
 
Về mặt kỹ thuật:
 

   
Các biến trong Haskell là bất biến **immutable.**
 

  
Khái niệm về biến của Haskell là khác nhau. Haskell có các biến, nhưng theo nghĩa toán học. Theo nghĩa là khi chúng ta nói:
 

   
``` {.haskell}
x = 3
city = "Paris"
letter = 'a'
it'sTrue = True
```
 
Chúng tôi đang nói rằng thuật ngữ ở bên trái của =biển báo có thể hoán đổi cho nhau với thuật ngữ ở bên phải của =.
    
Và điều này cũng áp dụng cho các tham số của hàm:
 

 
``` {.haskell}
volumeOfACylinder r h = pi * r^2 * h 
```
Trong trường hợp này, một khi chúng ta truyền giá trị cho các tham số của `volumeOfACylinder`, chúng ta không thể thay đổi chúng bên trong phần thân của hàm. Chúng ta có thể sử dụng lại hàm và truyền các tham số khác nhau, nhưng chúng ta không thể **thay đổi** chúng sau khi đã truyền chúng.

  
## Tiền tố và Trung tố
   
Bạn có thể áp dụng (sử dụng) các hàm theo hai ký hiệu khác nhau: ký hiệu tiền tố và tiền tố.
   
### Tiền tố
 
Hãy xem xét một biểu thức:
 
``` {.haskell}
prod x y = x * y
prod 4  5
```
 
`prod` sử dụng **Tiền tố**, tức là  **trước các đối số của nó**.
 
  
### Trung tố
 

   
Hãy xem xét một biểu thức:
 

 
``` {.haskell}
1 + 2
```
 

   
`+` thực sự là một chức năng! Và được viết ở dạng **trung tố**, tức là ở **giữa các đối số của nó** .
 
Các hàm dành cho dạng trung tố của ứng dụng được gọi là Toán tử **operators**.
 
Và làm cách nào để biết một hàm là trung tố hay tiền tố? Chà ...

Các hàm được xác định chỉ bằng các ký hiệu sẽ tự động được đặt thành các hàm trung tố, nếu không thì chúng là các hàm tiền tố.

Nhưng bạn vẫn có thể sử dụng hàm trung tố làm hàm tiền tố và ngược lại.
  
### Chuyển Tiền tố thành Trung tố or ngược lại
    
Chúng tôi sử dụng dấu ngoặc đơn xung quanh hàm trung tố để sử dụng nó làm hàm tiền tố:
 
``` {.haskell}
(+) 1 2
```
 
Để kiểm tra loại hàm trung tố, chúng ta cũng phải bao quanh tên giữa dấu ngoặc đơn:
 
``` {.haskell}
:t (+)
```
 

   
Tôi chắc rằng bạn đã nhận thấy rằng hàm kiểu `+` trông khác với những hàm trước đó. Đó là bởi vì nó sử dụng các kiểu đa thức và các lớp kiểu. Hôm nay chúng ta sẽ học về các kiểu đa thức và về các lớp kiểu trong các bài học sau. Hiện tại, đừng lo lắng về nó quá nhiều.
 

   
Chúng tôi sử dụng dấu ` xung quanh hàm tiền tố để sử dụng nó làm hàm trung tố:

 
``` {.haskell}
4 `prod` 5
```
 

  
## Các loại dữ liệu phổ biến
  
### Các loại số nguyên: `Int` and `Integer`
   
-   `Integer` là một loại chính xác tùy ý: Nó sẽ chứa bất kỳ số nguyên nào---dù lớn đến đâu---cho đến giới hạn bộ nhớ máy của bạn.
 
Điều này có nghĩa là bạn sẽ không bao giờ bị tràn số học, nhưng điều đó cũng có nghĩa là số học của bạn tương đối chậm.

-   `Int` mặt khác, các giá trị nhất định nằm trong phạm vi $±2^{63}$ *(for 64-bit CPUs)*.
 
Điều này giới hạn các giá trị Intcó thể giữ, nhưng nó làm cho nó hiệu quả hơn.

Hãy xem điều này trong thực tế:
 
   
``` {.haskell}
2^62 :: Int -- All good
```
 
``` {.haskell}
2^64 :: Int -- Oh no!
```
 

 
``` {.haskell}
2^127 :: Integer -- All good again
```
 
Nhưng còn số thực thì sao? Số có chữ số thập phân? Đó là lý do tại sao chúng tôi cóe `Float` and `Double`.
  
### Các loại số dấu phẩy động: `Float` và `Double`
  
`Float`là một số dấu phẩy động thực với độ chính xác đơn (32 bit), 
trong khi 
`Double` là một dấu phẩy động thực với độ chính xác gấp đôi (64 bit).
 
Hãy xem điều gì sẽ xảy ra nếu chúng ta muốn hiển thị 20 chữ số đầu tiên của số pi (π) ở cả hai kiểu:
   
``` {.haskell}
3.14159265358979323846 :: Float

3.14159265358979323846 :: Double
```
 
Bạn có thể nói đó `Double` là cách chính xác hơn `Float`.

Về mặt lý thuyết, các lý do về thời điểm sử dụng cái này hay cái kia hơi giống với các trường hợp `Int`, và `Integer`. `Double` có độ chính xác gấp đôi, nhưng chiếm nhiều bộ nhớ hơn vì nó sử dụng gấp đôi số bit để biểu diễn số.

NHƯNG!
 
Đề xuất dựa trên việc sử dụng trong thế giới thực:

-   **Ngay cả khi bạn không đặc biệt quan tâm đến các giá trị chính xác, hãy sử dụng    `Double`.** THiếm khi có bất lợi về tốc độ trong các máy tính hiện đại và với `Double`, bạn ít có khả năng tự bắn vào chân mình với các lỗi làm tròn.
   
-   Nếu bạn đang ở trong một môi trường mà **số tiền chính xác là rất quan trọng** (ví dụ: tài chính và kế toán), bạn nên sử dụng loại dữ liệu **Rational hoặc Decimal ** . Bởi vì chúng tránh được lỗi làm tròn hoàn toàn. Chúng tôi sẽ đề cập đến chúng trong các bài học trong tương lai.

  
### Kiểu logic `Bool`
 

   
iểu boolean `Bool` chỉ chứa hai giá trị: `True` and `False`.
 
Các số, ký tự và chuỗi có thể được so sánh bằng cách sử dụng các toán tử so sánh thông thường để tạo ra một `Bool` giá trị: 
 ~~==,~~/=,~~<=,~~>=,~~<, ~~>.
 

 
``` {.haskell}
5 /= 0 -- True

3 >= 0 -- True

7.2 < 6.1 -- False

pi > 3.14 -- True
```
 

  
Ngoài ra còn có các toán tử `&&` (**AND**) and `||` (**OR**) ho phép chúng ta kết hợp các giá trị:
   
-   Toán tử `&&` (AND) trả về `True` nếu cả boolean bên trái và bên phải của nó là `True`.
-   Toán tử `||` (OR) trả về `True` nếu một trong số chúng là `True`.
 

 
``` {.haskell}
:t (&&)
:t (||)

True && False
True || False
```

### Kiểu ký tự `Char`
  
`Char` là kiểu chúng ta dùng để biểu diễn một ký tự *Unicode* 
 
   

Chuẩn Unicode (Unicode) là một bộ quy tắc áp đặt cách xử lý và thể hiện văn bản. Nó cần thiết vì máy tính suy nghĩ bằng các con số (số một và số không) và chúng ta phải cùng nhau quyết định số nào đại diện cho ký tự nào.

Nó thực sự phức tạp hơn một chút. Nhưng với mục đích của chúng tôi, chúng tôi chỉ muốn biết rằng chúng tôi có thể sử dụng hầu hết mọi ký hiệu mà chúng tôi cần bằng cách sử dụng các ký tự Unicode. Chữ cái, số và hơn 140 nghìn ký hiệu.

 
Chúng tôi viết các giá trị kiểu Char (ký tự Unicode) giữa các dấu nháy đơn. Như thế này:
 

``` {.haskell}
'a'
'@'
'7'
```
 
Lưu ý rằng nếu bạn viết một số được bao quanh bởi dấu nháy đơn (như trong biểu thức cuối cùng), Haskell sẽ không coi số đó là số. Nó sẽ coi nó như bất kỳ nhân vật nào khác. Vì vậy, bạn không thể làm toán với '7'(có dấu ngoặc kép), nhưng bạn có thể làm toán với 7(không có dấu ngoặc kép).

   

Quan trọng: Bạn chỉ có thể viết một ký tự tại một thời điểm!
   
Vì vậy, làm thế nào bạn có thể viết câu đầy đủ? Tôi sẽ nói với bạn. Nhưng trước đó, chúng ta phải tìm hiểu về danh sách.
 
### Lists
 
   
Trong Haskell, **danh sách là một cấu trúc dữ liệu đồng nhất.**
 
  
Đây chỉ là một cách thú vị để nói rằng chúng là các danh sách lưu trữ các phần tử cùng loại. Vì vậy, chúng ta có thể có một danh sách Inthoặc một danh sách `Char` nhưng chúng ta không thể có một danh sách hỗn hợp.
 
-   Danh sách được biểu thị bằng dấu ngoặc vuông `[1,5,3,-4,0]` và các giá trị trong danh sách được phân tách bằng dấu phẩy .
  
-   Loại danh sách được thể hiện dưới dạng các loại phần tử mà nó chứa, được bao quanh bởi dấu ngoặc vuông. Một danh sách loại `[Int]` chứa số lượng loại `Int`. Một danh sách kiểu `[Char]` chứa các phần tử kiểu `Char`.

 
``` {.haskell}
:t ['a', 'b', 'c', 'd']

:t [True,False, 3 > 2, 'a' == 'b']
```
 
### Chuỗi (Strings)
   
**Chuỗi đại diện cho danh sách các ký tự.** Bạn có thể sử dụng `String` loại để viết tin nhắn, giá trị chữ và số, ký hiệu, v.v. Không giống như `Char` , `String` được đặt trong dấu ngoặc kép như sau:

 
``` {.haskell}
"Hellooooooo!"
```
 
Điều đó có nghĩa là hai giá trị này giống nhau!:
 
``` {.haskell}
['H','i','!'] == "Hi!"
```
 
Và đó cũng `String` là `[Char]` cùng một loại! Cụ thể hơn, `String` là đường cú pháp (cú pháp được thiết kế để làm cho mọi thứ dễ đọc hoặc dễ diễn đạt hơn) cho `[Char]` ! Vì vậy, bạn có thể sử dụng chúng thay thế cho nhau!

Những gì bạn không thể sử dụng thay thế cho nhau trong Haskell là dấu ngoặc đơn và dấu ngoặc kép. `String` (được viết trong dấu ngoặc kép) là danh sách `Char` (được viết bằng dấu ngoặc đơn). Đây là không giống nhau!:
 
``` {.haskell}
:t "A"
:t 'A'
```
  
Mọi lập trình viên đều biết rằng danh sách cực kỳ hữu ích. Nhưng nếu bạn muốn kết hợp các giá trị thuộc các loại khác nhau thì sao? Đó là khi các bộ dữ liệu hữu ích!
 
### Bội số (Tuples)
 
Bộ dữ liệu là cấu trúc được sử dụng để lưu trữ các phần tử không đồng nhất (kiểu) dưới dạng một giá trị .
 
Chúng tôi biểu diễn các bộ dữ liệu bằng cách bắt đầu bằng dấu ngoặc đơn mở, viết tất cả các phần tử được phân tách bằng dấu phẩy và kết thúc bằng dấu ngoặc đơn đóng. Đây là một ví dụ về một tuple có 3 phần tử:
 
``` {.haskell}
('a', 3, True)
```
 Nghe có vẻ giống danh sách, nhưng có hai điểm khác biệt chính:
   
-   **Các bộ dữ liệu có thể lưu trữ các phần tử thuộc các loại khác nhau:** Như bạn có thể thấy trong ví dụ trước, các bộ dữ liệu có thể lưu trữ các phần tử thuộc các loại khác nhau, trong khi danh sách thì không thể.
-  **Các bộ có kích thước cố định:* Bạn có thể tăng kích thước của danh sách bằng cách nối hoặc các cách khác, nhưng bạn không thể tăng hoặc giảm kích thước của một bộ. Khi bạn chỉ ra rằng một bộ có N phần tử, nó sẽ luôn có N phần tử.
 

   
**Và những điểm khác biệt chính đó được phản ánh trong kiểu của tuple.**

Loại tuple phụ thuộc vào:

- Các loại phần tử của nó.
- Thứ tự của các phần tử.
- Số lượng của các phần tử.

Ví dụ:

 
``` {.haskell}
:t ('a', True)

:t (True, 'a')

:t (True, 'a', 'b')

:t (True)
```
 

   
Như bạn có thể thấy: `('a', True) :: (Char, Bool)`, `(True, 'a') :: (Bool, Char)`, và `('a', True, True) :: (Char, Bool, Bool)` tất cả đều có các kiểu khác nhau. Theo như trình biên dịch biết, ba bộ dữ liệu đó khác nhau giữa chúng  `Float` and `Char`.

Bạn có nhận thấy rằng nếu bạn cố gắng tạo một bộ phần tử đơn lẻ, GHCi chỉ trả về phần tử đó không? (Hai biểu thức cuối cùng của khối mã trước đó.) Đó là bởi vì không có bộ phần tử đơn nào! Có một bộ dữ liệu một phần tử sẽ không cung cấp thêm giá trị nào. Vì vậy, Haskell bỏ qua bộ dữ liệu và chỉ đánh giá phần tử.

  
## Polymorphic values and type variables
 
Điều tuyệt vời về các kiểu là chúng bảo vệ chúng ta khỏi chính chúng ta! Nếu chúng ta nói rằng một hàm lấy đầu vào là loại `[Char]`, Haskell sẽ kiểm tra xem chúng ta có đáp ứng yêu cầu đó mỗi khi chúng ta sử dụng hàm đó không. Nếu chúng ta cho là `Double`, trình biên dịch sẽ yêu cầu chúng ta sửa lỗi đó!

Nhưng bây giờ chúng ta có một vấn đề! Hãy tưởng tượng rằng chúng ta tạo `prod` hàm:

 
``` {.haskell}
prod :: Int -> Int -> Int
prod x y = x * y
```
 
Nó hoạt động hoàn hảo cho các giá trị của loại `Int`. Nhưng nếu chúng ta cần nó cho các giá trị kiểu `Dobule` thì sao? Chúng tôi biết rằng nó sẽ hoạt động vì chúng vẫn là số và công thức sẽ cung cấp câu trả lời chính xác.

Chúng ta có thể tạo một hàm mới thực hiện tương tự nhưng chỉ định một loại khác:

 
``` {.haskell}
prodForDubles :: Double -> Double -> Double
prodForDoubles x y = x * y
```
 
Về mặt kỹ thuật, nó hoạt động. Nhưng bây giờ, những gì về `Float` và `Integer` các loại? Nếu chúng ta cần tạo các hàm trùng lặp cho mọi trường hợp, điều này sẽ nhanh chóng trở nên không bền vững!

**Polymorphic types to the rescue!**
 
Đa hình có nghĩa là một cái gì đó có nhiều hình thức. Và một giá trị đa hình là một giá trị có thể có nhiều loại . (Ví dụ: `4` có thể là `Int`, `Integer`, `Float`, \...)
 

Ví dụ, hãy tưởng tượng rằng chúng ta muốn tạo một hàm nhận một bộ có hai giá trị (còn gọi là cặp) và trả về giá trị đầu tiên. Như thế này:
 

 
``` {.haskell}
first (x,y) = x
```
 
Nó nên có loại nào? Tôi không đặc biệt quan tâm đến các loại phần tử bởi vì tôi không làm bất cứ điều gì với chúng! Tôi không làm số học, những thứ liên quan đến văn bản, hay bất cứ thứ gì! Hơn nữa, tôi vừa lấy lại phần tử đầu tiên, thế là xong!

Trong những trường hợp này, chúng tôi chỉ định một chữ ký với các biến loại!

 
``` {.haskell}
first :: (a, b) -> a
first (x,y) = x

first ('a', "hi!")
```
  
 Hàm đó viết: \" `first` Hàm nhận một cặp loại `(a, b)` và trả về một giá trị loại `a`.\"

   
:::Important

Các loại cụ thể (ví dụ: `Char` `Bool` `Int`) bắt đầu bằng chữ in hoa. Nhưng các loại đa hình bắt đầu bằng chữ thường. Chúng ta có thể sử dụng tên dài hơn cho các loại đa hình, nhưng thông thường là sử dụng các chữ cái đơn lẻ (ví dụ: `a` `b` `c`).
:::
 
Hàm `first` mà chúng ta vừa tạo này thực sự đi kèm với Haskell, nhưng nó được đặt tên là `fst` ! Và nó đi kèm với đối tác của nó : `snd` !:
  
``` {.haskell}
:t fst
:t snd

fst (1,2)
snd (1,2)
```
   
`a` và `b` là các biến kiểu, nghĩa là chúng có thể thuộc bất kỳ kiểu nào. Và bất kể loại nào, giá trị được trả về `first` phải cùng loại với phần tử đầu tiên của cặp (vì cả hai đều thuộc loại `a` ).

Bằng cách sử dụng các biến kiểu, chúng ta có thể sử dụng `first` hàm với các cặp kiểu bất kỳ (giá trị đa hình)!

Lưu ý rằng `a` và `b` cả hai CÓ THỂ thuộc bất kỳ loại nào VÀ các loại khác nhau. Nhưng nó KHÔNG PHẢI như vậy. Bạn có thể sử dụng `first` trên một bộ với các giá trị cùng loại: `('a','b') :: (Char, Char)`.
 

Một ví dụ khác về hàm đa hình là hàm `head` và `tail`
 

Bạn có thể sử dụng `head` để lấy phần tử đầu tiên của danh sách và taillấy tất cả các phần tử của danh sách ngoại trừ phần tử đầu tiên.
 
``` {.haskell}
list = [1,2,3,4]
list

:t head
head list

:t tail
tail list
```
 
Chúng tôi không quan tâm đến các loại cụ thể. Chúng tôi chỉ trích xuất một phần tử. Vì vậy, tham số là một danh sách đa hình (một danh sách thuộc bất kỳ loại nào, hãy gọi nó là `[a]`). Và kết quả phải là một phần tử cùng loại với các phần tử trong danh sách. Đó là lý do tại sao nó phải như vậy `a`.

Bây giờ chúng ta đã quen thuộc với tất cả các loại này, hãy vui vẻ với các danh sách! (Chúng ta sẽ vui vẻ với các bộ dữ liệu sau khi học cách so khớp mẫu. Theo cách đó sẽ thú vị hơn.)
  
## Giờ vui vẻ với danh sách!
 
Mỗi phần tử có một chỉ mục được xác định bởi vị trí của nó trong danh sách --- bắt đầu từ 0 (không).

Chúng tôi sử dụng !!toán tử để truy cập một phần tử cụ thể trong danh sách bằng cách sử dụng chỉ mục của nó:

 
``` {.haskell}
:t (!!)
"abc" !! 1         
[12,13,16,18] !! 3 
```
 
Các bộ không có chỉ số, vì vậy người ta không thể dễ dàng trích xuất các phần tử của các bộ như thế này. Tuy nhiên, chúng ta có thể sử dụng `fst` và `snd` cho các cặp và khớp mẫu cho các bộ dài hơn. (Xem bài học khớp mẫu để biết cách thực hiện.)

Danh sách có thể được xác định bởi một phạm vi:
   
``` {.haskell}
[3..22]
```
 
Và chúng tôi cũng có thể chỉ định một bước giữa các mục của phạm vi:
 
``` {.haskell}
[3,5..22]
['a','c'..'z']
```
 
Kết quả của biểu thức đầu tiên sẽ chứa tất cả các phần tử bắt đầu từ 3một bước `2 = 5 - 3` không vượt quá `22` (nếu phần tử cuối cùng không khớp với một mẫu bước xác định, nó sẽ bị loại khỏi kết quả).

Kết quả của biểu thức thứ hai sẽ chứa mọi chữ cái viết thường khác trong bảng chữ cái.

Điều quan trọng cần lưu ý là bạn chỉ có thể chỉ định kích thước một bước!

Nếu số gia là âm, các phần tử sẽ được liệt kê theo thứ tự giảm dần:

``` {.haskell}
[17,14..3]
```
 
Bạn cũng có thể sử dụng các phạm vi để tạo danh sách vô hạn bằng cách không chỉ định giới hạn trên.
 
 
-   `[1..]` is the infinite list $[1,2,3,4,5,...]$.
 

   
-   `[1,3..]` is the infinite list $[1,3,5,7,9,...]$.
 

   
Bây giờ, nếu chúng ta chỉ đánh giá danh sách một mình, chương trình sẽ chạy mãi mãi (hoặc cho đến khi nó gặp sự cố). Vì vậy, danh sách vô hạn thường được sử dụng như một phần của biểu thức.

Chúng ta cũng có hàm `take` trả về một danh sách chứa các `n` phần tử đầu tiên trong danh sách (có thể là vô hạn) `l`.

 
``` {.haskell}
:t take

take 3 ['x'..]

take 20 [1,3..]

take 7 [5,3..]  
```
 
Chúng tôi sử dụng toán tử khuyết điểm (ký hiệu là dấu hai chấm `:`) để thêm vào trước một phần tử:

 
``` {.haskell}
:t (:)
2 : [3,4,5]
```
 

  
Và chúng tôi sử dụng toán tử **nối** `++`  để đặt hai danh sách lại với nhau:

 
``` {.haskell}
:t (++)
[1,3,7,9] ++ [3,3,1]
```
 
Lưu ý rằng `++` là một hàm nhận hai danh sách và `:` là một hàm nhận một phần tử và một danh sách.
 
 
**Cảnh báo** Việc sử dụng lặp lại toán tử `++`  trong các danh sách dài (thậm chí nếu bạn thêm một danh sách đơn lẻ vào một danh sách, chẳng hạn: `[1,2,3] ++ [4]`), buộc Haskell phải duyệt qua toàn bộ danh sách ở phía bên trái của `++`. Do đó, việc đặt thứ gì đó ở cuối danh sách dài năm mươi triệu mục nhập sẽ mất một khoảng thời gian! Tuy nhiên, đặt một cái gì đó ở đầu danh sách bằng toán tử khuyết điểm `:` là ngay lập tức!

Trong số nhiều chức năng hữu ích khác được xác định cho danh sách, chúng tôi đề cập ngắn gọn như sau:

- lengthlấy một danh sách và trả về độ dài của nó;

- `null` kiểm tra xem danh sách có trống không;

- `sum` lấy một danh sách các số và trả về tổng của chúng;

- `elem` lấy một phần tử xvà một danh sách các phần tử lcùng loại và kiểm tra xem nó có phải xlà một phần tử của danh sách hay không `l`.

``` {.haskell}
length [2,4,5,6,7]

null [2]

sum [-1,0,1,6,-5,-1]

5 `elem` [6,3,5,7,5]
```
 
Bây giờ đó là về danh sách. Nhưng chúng ta sẽ tiếp tục tìm hiểu thêm về chúng trong suốt khóa học!

  
### Nối và ngắt văn bản
 
Có những trường hợp bạn muốn làm gì với danh sách của mình cụ thể là một thứ liên quan đến văn bản. Haskell có các chức năng cụ thể cho điều đó.
   
Ví dụ:

   
-   `words :: String -> [String]` chia `String` nhỏ một danh sách các từ, được phân định bằng khoảng trắng.

-   `unwords :: [String] -> String` là phép toán nghịch đảo với từ. Nó nối các từ với khoảng trắng ngăn cách.

-   `lines :: String -> [String]` chia đối số thành một danh sách các dòng, với các ký tự dòng mới ( `\n`) đóng vai trò là dấu phân cách.

-   `unlines :: [String] -> String` Tạo một `String` từ một mảng các chuỗi, nối thêm các ký tự dòng mới ( `\n`) giữa các chuỗi ban đầu.
 

   
``` {.haskell}
words "To be or not to be?"

lines "How are you doing? \n I'm fine, how about you?"
```
 
