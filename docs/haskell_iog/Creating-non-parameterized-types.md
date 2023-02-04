---
jupyter:
  celltoolbar: trình chiếu
  kernelspec:
    display_name: Haskell
    language: haskell
    name: haskell
  language_info:
    codemirror_mode: ihaskell
    file_extension: ".hs"
    mimetype: văn bản/x-haskell
    name: haskell
    pygments_lexer: Haskell
    version: 8.10.7
  nbformat: '4'
  nbformat_minor: '4'
---

8-Tạo kiểu không tham số
===================================


Chúng ta đã biết các kiểu là gì và tại sao chúng lại hữu ích trong các bài học trước. Vì vậy, trong phần này, chúng ta sẽ học cách tạo các kiểu của riêng mình

## Outline

-   **Type synonyms**
    -   How to define them
    -   Why use them
-   **New types with `data`**
    -   Creating types
    -   Using types
    -   Value Parameters
-   **Record syntax**

## Kiểu Synonyms

Ngay từ đầu, khi tìm hiểu về `Strings` trong Haskell, bạn đã phát hiện ra rằng `String` là đường cú pháp cho `[Char]`. Điều này có nghĩa là `String` và `[Char]` là *tương đương* và bạn có thể sử dụng chúng *thay thế cho nhau* .

Đó là bởi vì `String` là một kiểu đồng nghĩa với `[Char]` .

### Cách xác định kiểu đồng nghĩa (Synonyms)

Để xác định một kiểu đồng nghĩa, bạn sử dụng từ khóa `type`, theo sau là tên mới cho kiểu và kiểu tồn tại trước đó tương đương với kiểu nào.

```{.haskell}
type String = [Char]
```

Bạn có thể đặt tên cho kiểu đồng nghĩa theo cách bạn muốn, miễn là nó bắt đầu bằng chữ in hoa.

Khi bạn xác định một kiểu đồng nghĩa, bạn sẽ không tạo một kiểu mới! Bạn đang nói với Haskell rằng một kiểu hiện có có thể được gọi bằng một tên khác (một từ đồng nghĩa)!

### Tại sao nên sử dụng Kiểu đồng nghĩa

Tại sao bạn lại thêm độ phức tạp mà không thêm nhiều hàm hơn?

Bởi vì kiểu đồng nghĩa cho phép chúng ta truyền đạt nhiều thông tin hơn! Hãy xem một ví dụ.

Hãy tưởng tượng bạn bắt đầu làm việc với một thư viện cho phép bạn tạo các giao dịch tiền tệ. Bạn muốn tạo một giao dịch mới, vì vậy bạn hãy xem chữ ký kiểu của hàm mà bạn cần sử dụng:

```{.haskell}
generateTx :: String -> String -> Int -> String
```

Không phải là một chữ ký cực kỳ hữu ích. Bạn có thể suy luận rằng `Int` là giá trị cần chuyển, nhưng những `Strings` đó là gì? Và `String` mà nó trả về  gì?

Bây giờ, hãy so sánh chữ ký kiểu đó với chữ ký này:

```{.haskell}
generateTx :: Address -> Address -> Value -> Id
```

Rõ ràng, chữ ký thứ hai truyền tải ngữ cảnh tốt hơn! Hai tham số đầu tiên là địa chỉ, tham số thứ ba là giá trị của giao dịch và có vẻ như nó trả về id của giao dịch.

Tất cả điều đó chỉ từ chữ ký kiểu. Sự khác biệt? Chỉ cần một vài kiểu đồng nghĩa.

Hãy xem những gì chúng ta đã làm để cải thiện bối cảnh rất nhiều. Bắt đầu bằng cách tạo lại hàm có tên `generateTx` sẽ lấy địa chỉ và giá trị của giao dịch và tạo id cho giao dịch đó:

```{.haskell}
generateTx :: String -> String -> Int -> String
generateTx from to value = from ++ to ++ show value
```

Bây giờ, chúng ta chỉ cần thêm một số kiểu đồng nghĩa và thay thế chúng trong chữ ký:

```{.haskell}
type Address = String
type Value = Int
type Id = String

generateTx :: Address -> Address -> Value -> Id
generateTx from to value = from ++ to ++ show value
```

Siêu dễ dàng! Và nếu bạn muốn kiểm tra xem các kiểu `Address` , `Value` hoặc `Id` là gì, bạn có thể mở GHCi, tải tệp và kiểm tra thông tin của nó:

```{.haskell}
:i Address
```

Kết quả:

```
type Address :: *
type Address = String

```

Và, tất nhiên, chúng ta có thể xây dựng trên các kiểu đồng nghĩa trước đó để tạo các kiểu phức tạp hơn. Đây là một ví dụ:

```{.haskell}
type Name = String
type Address = (String, Int)
type Person = (Name, Address)

bob = ("Bob Smith", ("Main St.", 555)) :: Person
:t bob
:t fst bob
```

Có các từ đồng nghĩa là điều tuyệt vời và tất cả, nhưng chúng chỉ là những tên gọi khác nhau cho cùng một thứ. Nếu chúng ta cần tạo một kiểu hoàn toàn mới thì sao? `data` để định nghĩa.

## Xác định các kiểu mới với `data`

Chúng ta có thể tạo các kiểu mới như thế này:

```{.haskell}
data PaymentMethod = Cash | Card | Cryptocurrency

data Color = Red | Green | Blue

data Bool = True | False      -- Real definition of Bool

data Ordering = LT | EQ | GT  -- Real definition of Ordering
```

Chúng ta bắt đầu với từ khóa `data`. Sau đó, phần trước dấu '=' là tên kiểu mới của chúng ta và phần sau dấu '=' là các hàm **tạo giá trị** .

Các hàm tạo giá trị xác định các **giá trị** khác nhau mà kiểu có thể có.

Trong bối cảnh này, dấu `|`  đọc là “or”. Vì vậy, chúng ta có thể đọc kiểu đầu tiên là:

> Kiểu `PaymentMethod` thức thanh toán có thể có giá trị là `Cash` , `Card` hoặc `Cryptocurrency` .

Tên kiểu và các hàm tạo giá trị phải bắt đầu bằng một chữ cái viết HOA!

## Sử dụng kiểu mới của chúng ta

Và bây giờ, làm thế nào chúng ta có thể sử dụng kiểu mới này?

Bằng cách sử dụng các giá trị của nó! Ví dụ: hãy thêm phương thức thanh toán cho chúng:

```{.haskell}
type Name = String
type Address = (String, Int)

data PaymentMethod = Cash | Card | Cryptocurrency deriving (Show)

type Person = (Name, Address, PaymentMethod)

bob = ("Bob Smith", ("Main St.", 555), Cash) :: Person
bob
```

Kết quả: 
("Bob Smith",("Main St.",555),Cash)

Ở cuối khai báo dữ liệu của chúng ta. Bằng cách thêm phần này, Haskell sẽ tự động biến kiểu đó thành một thể hiện của lớp Kiểu `Show`. Cho phép chúng ta in chúng trên terminal. Chúng ta sẽ giải thích chi tiết cách thức hoạt động của tính năng này trong bài học **"Creating type classes and Instances".**

Và, tất nhiên, chúng ta có thể kiểm tra các thuộc tính của nó bằng lệnh `:i` trong ghci:

```{.haskell}
:i PaymentMethod
```

Kết quả:

```
type PaymentMethod :: *
data PaymentMethod = Cash | Card | Cryptocurrency
  	-- Defined at <interactive>:3:1
instance [safe] Show PaymentMethod -- Defined at <interactive>:3:61

```

Chúng ta có thể khớp mẫu cho các giá trị của nó:

```{.haskell}
howItPays :: Person -> String
howItPays (_, _, Cash) = "Pays in cash"
howItPays (_, _, Card) = "Pays with card"
howItPays (_, _, Cryptocurrency) = "Pays with cryptocurrency"

howItPays bob
```

Kết quả: "Thanh toán bằng tiền mặt"

Và sử dụng nó như bất kỳ kiểu nào khác.

Nhưng đó chỉ là **phần nổi của tảng băng chìm**. Chúng ta nên làm gì nếu cần nhiều hơn một vài giá trị?

Ví dụ, nếu tôi muốn một kiểu đại diện cho một hình có thể là bất kỳ hình tròn hoặc hình chữ nhật nào thì sao?

Chúng ta có thể bắt đầu bằng cách định nghĩa một cái gì đó như:

```{.haskell}
data Shape = Circle | Rectangle
```

Nhưng vấn đề là, điều này không được sử dụng nhiều.

Tôi muốn có thể thực hiện các công việc với các giá trị này, chẳng hạn như tính chu vi và diện tích. Và tôi không thể làm điều đó nếu không có các thuộc tính thực tế của hình dạng!

Không có vấn đề gì cả! Chúng ta chỉ có thể truyền một số tham số cho hàm tạo!

### Thông số giá trị (Value Parameters)

Hãy suy nghĩ về những gì chúng ta cần để đại diện cho bất kỳ hình tròn hoặc hình chữ nhật nào:

- Để xác định một vòng tròn, chúng ta cần bán kính của nó. Vì vậy, chỉ cần một giá trị số.
- Để xác định một hình chữ nhật, chúng ta cần độ dài của hai cạnh của nó. Vì vậy, hai giá trị số.

Để dịch các yêu cầu đó thành mã, điều duy nhất chúng ta cần làm là thêm các kiểu khác làm đối số cho hàm tạo giá trị của chúng ta khi xác định kiểu, như sau:

```{.haskell}
data Shape = Circle Float | Rectangle Float Float
```

Và đây là một ví dụ về **kiểu dữ liệu đại số** nổi tiếng mà mọi người nói đến. Một trong nhiều thuộc tính của Haskell.

Chúng được gọi là "Đại số" vì chúng ta có thể tạo các kiểu mới bằng cách kết hợp các kiểu trước đó một cách xen kẽ ( `A | B` , nghĩa là `A` hoặc `B` nhưng không phải cả hai) hoặc bằng cách kết hợp ( `AB` , nghĩa là `A` và `B` cùng nhau).

Và sự kết hợp này hoạt động như thế nào? Nếu chúng ta kiểm tra kiểu hàm tạo `Circle` :

```{.haskell}
-- data Shape = Circle Float | Rectangle Float Float
:t Circle
```

Chúng ta thấy rằng **`Circle` là một hàm!!** Hàm nhận giá trị kiểu `Float` và trả về giá trị kiểu `Shape` ! Vì vậy, để có được giá trị của kiểu `Shape` , tất cả những gì chúng ta phải làm là chuyển bán kính của nó:

```{.haskell}
smallCircle = Circle 3

hugeCircle = Circle 100

:t smallCircle
```

Và nó giống với các giá trị `Rectangle` :

```{.haskell}
-- data Shape = Circle Float | Rectangle Float Float
:t Rectangle
```

`Rectangle` là một hàm nhận hai giá trị kiểu `Float` và trả về một giá trị kiểu `Shape` . Vì vậy, để có được một hình chữ nhật kiểu `Shape` , tất cả những gì chúng ta phải làm là chuyển độ dài các cạnh của nó:

```{.haskell}
rect1 = Rectangle 10 5

rect2 = Rectangle 256 128

:t rect1
```

Đó là nó! Chúng ta đã tạo một số giá trị của kiểu `Shape` mới của mình. Bây giờ chúng ta hãy sử dụng chúng!

Chúng ta có thể định nghĩa một hàm tính diện tích của bất kỳ giá trị nào thuộc kiểu `Shape` như sau:

```{.haskell}
area :: Shape -> Float
area (Circle r) = pi * r^2        -- We pattern match on value constructors
area (Rectangle l1 l2) = l1 * l2
```
```
area smallCircle
```
Kết quả: 28.274334

```
area rect2
```
Kết quả: 32768.0

Bây giờ chúng ta nói chuyện! Chúng ta vừa tạo ra một kiểu thực sự hữu ích!

Nhưng tôi vẫn chưa xong với những hình dạng này. Tôi muốn nhiều hơn nữa! Tôi muốn thêm màu sắc! Và các điểm trong không gian 2D cho bạn biết vị trí tâm của hình!

Đối với điều đó, chúng ta có thể làm điều gì đó quái dị như thế này:

```{.haskell}
data Shape
  = Circle (Float, Float) Float String | Rectangle (Float, Float) Float Float String
```

Nơi chúng ta thêm các điểm trong không gian dưới dạng bộ giá trị `Float` và màu sắc dưới dạng giá trị `String` .

Chúng ta có thể dễ dàng định nghĩa lại hàm `area` cho kiểu mới này như sau:

```{.haskell}
area :: Shape -> Float
area (Circle _ r _) = pi * r^2
area (Rectangle _ l1 l2 _) = l1 * l2
```

Nhưng sau đó, nếu chúng ta muốn trích xuất các trường cụ thể của kiểu `Shape` , chúng ta phải tạo một hàm tùy chỉnh cho từng trường trong số chúng:

```{.haskell}
color :: Shape -> String
color (Circle _ _ c) = c
color (Rectangle _ _ _ c) = c

point :: Shape -> (Float, Float)
point (Circle p _ _) = p
point (Rectangle p _ _ _) = p

--- Etc...
```

```{.haskell}
type Point = (Float,Float)
type Radius = Float
type Width = Float
type Height = Float
type Color = String

data Shape
    = Circle Point Radius Color | Rectangle Point Width Height Color
```

Kiểu thực tế là cách dễ đọc hơn. Tôi sẽ đưa bạn cai đo.

Nhưng đó là rất nhiều kiểu đồng nghĩa để cải thiện sự hiểu biết về chữ ký. Và trên hết, nó không giải quyết được các vấn đề khác---cấp bách hơn---!

Nhưng đừng lo lắng, Haskell có sự hỗ trợ của chúng ta! Kiểu cú pháp `Record`!

## Cú pháp `Record`

***Cú pháp `Record`* là một cách khác để xác định kiểu dữ liệu đi kèm với một số đặc quyền.**

Chúng ta sẽ bắt đầu với một ví dụ dễ dàng hơn và sau đó chúng ta sẽ sửa kiểu `Shape` của mình.

Giả sử chúng ta muốn tạo kiểu dữ liệu `Employee` chứa tên và số năm kinh nghiệm của nhân viên.

Nếu không có *cú pháp `Record`* , chúng ta sẽ tạo nó như thế này:

```{.haskell}
data Employee = Employee String Float
```

Trong trường hợp này, vì kiểu chỉ có một hàm tạo giá trị, nên thường sử dụng cùng tên với tên của kiểu. Nó không giống như có gì đặc biệt về nó, nó chỉ là quy ước.

Nhưng với *cú pháp `Record`* , chúng ta có thể tạo nó như sau:

```{.haskell}
data Employee = Employee { name :: String, experienceInYears :: Float } deriving (Show)
```

Bạn có thể thấy:

- Các hàm tạo giá trị cú pháp `record` có các tham số của chúng---mà chúng ta gọi là các trường---được bao quanh bởi dấu ngoặc nhọn.
- Mỗi trường có một tên bắt đầu bằng một chữ cái viết thường theo sau là kiểu của nó.
- Và các trường được phân tách bằng dấu phẩy.

Ok, chúng ta có kiểu `Employee` mới. Bây giờ chúng ta hãy sử dụng nó.

Chúng ta có thể tạo các giá trị như thế này:

```{.haskell}
richard = Employee { name = "Richard", experienceInYears = 7.5 }

:t richard
richard
```

Kết quả: Employee {name="Richard", experienceInYears = 7.5}

Chúng ta cung cấp hàm tạo và giữa các dấu ngoặc nhọn của nó, chúng ta chỉ định tên của từng trường với giá trị tương ứng của nó. Theo bất kỳ thứ tự nào!

Ngay lập tức, kiểu dữ liệu kết quả dễ hiểu hơn và thể `Show` rõ ràng hơn khi chúng ta in nó. Nhược điểm duy nhất là chúng ta cần phải viết tất cả mã bổ sung đó... hay chúng ta?

```{.haskell}
matt = Employee "Matt" 5
matt
```

Kết quả: Employee {name="Matt", experienceInYears = 5.0}

Bạn cũng có thể tạo các giá trị mới của kiểu `Employee` bằng cách chuyển các tham số của các hàm tạo giá trị theo cùng thứ tự như định nghĩa của nó để có được kết quả cuối cùng giống nhau! Không cần thêm mã.

Và điều đó thậm chí còn không lọt vào top 3 đặc quyền tốt nhất! Một cách khác là chúng ta có thể cập nhật giá trị của `record` bằng cách tạo một giá trị mới từ giá trị trước đó và chỉ xác định các trường đã thay đổi, như sau:

```{.haskell}
newMatt = matt { experienceInYears = 6 }
newMatt
```

Kết quả: Employee {name="Matt", experienceInYears = 6.0}

Một điều tuyệt vời hơn nữa là **nó tự động tạo các hàm để tra cứu các trường trong kiểu dữ liệu!**

```{.haskell}
:t name
name richard
```

Kết quả: 28.274334

```
:t experienceInYears
experienceInYears richard
```

Kết quả: 7.5

Bởi vì chúng ta có hai trường (trường `name` và trường `experienceInYears` ), nên chúng ta nhận được miễn phí hai hàm cùng tên nhận giá trị của kiểu `Employee` và trả về giá trị của trường.

Bây giờ, nếu chúng ta muốn, ví dụ, để tính toán kinh nghiệm kết hợp của nhóm của bạn, bạn có thể làm điều gì đó như:

```{.haskell}
team = [Employee "John" 4, Employee "Josh" 2, Employee "Matthew" 7]

combinedExp :: [Employee] -> Float
combinedExp = foldr (\e acc -> experienceInYears e + acc) 0

combinedExp team
```

Kết quả: 13.0

Thực sự tiện lợi! Và có nhiều hơn nữa! Nhưng trước khi tiết lộ thuộc tính tuyệt vời cuối cùng của cú pháp `record`, hãy sử dụng sức mạnh mới này và xác định lại kiểu `Shape` khó hiểu.

Như bạn nhớ lại, không có cú pháp `record`, định nghĩa kiểu dữ liệu là thế này:

```{.haskell}
data Shape
  = Circle (Float, Float) Float String
  | Rectangle (Float, Float) Float Float String
```

Chà, với cú pháp `record` là cú pháp này:

```{.haskell}
data Shape
  = Circle
      { position :: (Float, Float)
      , radius   :: Float
      , color    :: String
      }
  | Rectangle
      { position :: (Float, Float)
      , width    :: Float
      , height   :: Float
      , color    :: String
      }
  deriving (Show)
```

Như bạn có thể thấy, tất cả những gì chúng ta phải làm là thay thế các tham số của hàm tạo bằng các trường `record` và chúng ta có thể sử dụng kiểu dữ liệu giống như chúng ta đã làm với kiểu `Employee` .

Chúng ta có thể tạo các giá trị bằng cách sử dụng cú pháp thông thường và `record` và chúng ta có thể cập nhật các giá trị bằng cách chỉ xác định các trường chúng ta cần thay đổi:

```{.haskell}
circ = Circle { position = (1, 2), radius = 6, color = "Green" }
:t circ
circ


Kết quả:
    Circle {position = (1.0,2.0), radius = 6.0, color = "Green"}

rect1 = Rectangle (9, 3) 7 3 "Yellow"
:t rect1
rect1

Kết quả:
    Rectangle {position = (9.0,3.0), width = 7.0, height = 3.0, color = "Yellow"}

rect2 = rect1 {width = 12}
:t rect2
rect2



Kết quả:
    Rectangle {position = (9.0,3.0), width = 12.0, height = 3.0, color = "Yellow"}

```

Và, tất nhiên, chúng ta có thể dễ dàng trích xuất các giá trị chúng ta cần bằng các hàm mới được xác định tự động:

```{.haskell}
position circ

Kết quả:
    (1.0,2.0)


color rect2


Kết quả:
    "Yellow"
```

Tôi biết, tôi biết, tôi đang cho bạn thấy điều tương tự một lần nữa nhưng với một kiểu khác. Tôi không muốn làm bạn chán, vì vậy hãy xem thứ gì khác đi kèm với hồ sơ.

Hãy **sử dụng khớp mẫu** để xác định lại hàm tính diện tích hình cho kiểu dữ liệu `record` mới của chúng ta.

Ngay cả khi chúng ta đang sử dụng cú pháp `record`, chúng ta vẫn có thể so khớp mẫu như chúng ta vẫn thường làm:

```{.haskell}
area :: Shape -> Float
area (Circle _ r _) = pi * r ^ 2
area (Rectangle _ w h _) = w * h


Kết quả:
    113.097336

area circ
area rect1

Kết quả:
    21.0
```

Chúng ta không mất khả năng để làm điều đó.

Nhưng, nhờ các `record`, giờ đây chúng ta có một cú pháp khớp mẫu đặc biệt!:

```{.haskell}
area :: Shape -> Float
area Circle {radius=r} = pi * r^2
area Rectangle {width=w,height=h} = w * h

Kết quả:
    113.097336

area circ
area rect1

Kết quả:
    21.0
```

Chúng ta khớp mẫu trên các hàm tạo giá trị cú pháp `record` bằng cách viết các trường của hàm tạo giữa các dấu ngoặc nhọn và liên kết chúng với một biến ở bên phải dấu bằng của trường.

Điều thú vị là chúng ta chỉ khớp các mẫu của các trường mà chúng ta cần sử dụng. Và điều này mang lại cho chúng ta một lợi ích tuyệt vời khác của cú pháp `record`. Nếu chúng ta thêm một trường khác vào kiểu dữ liệu, chúng ta không cần thay đổi bất kỳ hàm nào trước đó! Bởi vì chúng ta không tính đến các trường không được sử dụng khi đối sánh mẫu của chúng ta!

Tuyệt vời, phải không?

Cú pháp `record` đặc biệt hữu ích khi bạn có một kiểu dữ liệu có thể có hàng chục trường. Giống như một kiểu chứa các cài đặt của một ứng dụng. Hoặc một trong đó có tất cả các lĩnh vực của một cuộc khảo sát.

Nó cho phép bạn sử dụng kiểu mà không cần nhớ giá trị nào là gì (vì tất cả chúng đều được đặt tên) và cho phép bạn cập nhật và tham chiếu các trường cụ thể, bỏ qua phần còn lại. Vì vậy, nếu bạn thay đổi kiểu của mình trong tương lai, thì chỉ các giá trị và hàm sử dụng trường đã thay đổi bị ảnh hưởng. Nếu có.

# Điều này là dành cho hôm nay!

Ok, đó là nó cho ngày hôm nay. Trong bài học tiếp theo, chúng ta sẽ xây dựng trên bài học này để tạo các kiểu phức tạp hơn. Vì vậy, hãy đảm bảo làm bài tập về nhà, và tôi sẽ gặp bạn ở bài tiếp theo!
