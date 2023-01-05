# 3-Conditions and helper constructions
 
 
## Outline

-   Biểu thức `If-then-else`.

-   Guards

-   Biểu thức `let` 

-   Biểu thức  `where`

-   Nên sử dụng `let` or `where`?

-   Những điều cần lưu ý.
 

 
## Biểu thức If-then-else
 
Thông thường trong mã của bạn, bạn phải đưa ra lựa chọn. Có một số cách để thể hiện điều kiện. Trong Haskell, chúng ta thường sử dụng các biểu thức  **if-then-else** 
 
``` {.haskell}
if <Condition> 
  then <Expesssion1>
  else <Expesssion2>
```

Trong đó  `Condition` là biểu thức logic mang lại giá trị `True` or `False`,
`Expression1` nếu điều kiện `Condition` là `True`, và
`Expression2` nếu điều kiện `Condition` là `False`. THàm `checkLocalHost` bbên dưới kiểm tra xem đối số có phải là `localhost` hay không và báo cáo cho người dùng.
 
``` {.haskell}
checkLocalhost :: String -> String
checkLocalhost ip =
    -- True or False?
    if ip == "127.0.0.1"
        -- When the condition is True the answer is
        then "It's localhost!"
        -- Otherwise the condition is False and the answer is
        else "No, it's not localhost."

checkLocalhost "127.0.0.1"
```
 
  "It's localhost!"
 
 
Hàm `checkLocalhost` được áp dụng cho một đối số  kiểu `String` và trả về kiểu  `String`. đối số lad một chuỗi `ip` chứa địa chỉ IP và hàm sẽ kiểm tra xem chuỗi đó có bằng `"127.0.0.1"`. Nếu kiểm tra thành công thì hàm trả về `"It's localhost!"`, nếu không thì trả về`"No, it's not localhost."`
 
 Mặc dù trong các ngôn ngữ lập trình mệnh lệnh, `else` là không bắt buộc, nhưng trong Haskell thì có! Đó là bởi vì, trong Haskell, mọi hàm đều phải trả về một giá trị. Vì vậy, chúng tôi có nghĩa vụ cung cấp kết quả cùng kiểu cho cả hai.


## Guards
 
Bây giờ, hãy tưởng tượng rằng chúng ta muốn thực hiện một kiểm tra phức tạp hơn. Giống như kiểm tra xem sinh nhật năm nay có ý nghĩa đặc biệt nào không. Chúng ta có thể sử dụng các câu lệnh if-else lồng nhau như sau:
 

``` {.haskell}
specialBirthday :: Int -> [Char]
specialBirthday age =
  if age == 1
    then "First birthday!"
    else
      if age == 18
        then "You're an adult!"
        else
          if age == 60
            then "Finally, I can stop caring about new lingo!"
            else "Nothing special"
```

```
Use guards
Found:
specialBirthday age
  = if age == 1 then
        "First birthday!"
    else
        if age == 18 then
            "You're an adult!"
        else
            if age == 60 then
                "Finally, I can stop caring about new lingo!"
            else
                "Nothing special"
                
  Why Not:
  pecialBirthday age
  | age == 1 = "First birthday!"
  | age == 18 = "You're an adult!"
  | age == 60 = "Finally, I can stop caring about new lingo!"
  | otherwise = "Nothing special"
```
 
Đó chỉ là một mớ hỗn độn! Quá phức tạp để đọc và viết. May mắn thay, chúng tôi có bảo vệ!

Bộ bảo vệ hoạt động tương tự như câu lệnh if-else, nhưng bạn có thể có nhiều điều kiện:

 
``` {.haskell}
func arg
  | <Condition1> = <Result1>
  | <Condition2> = <Result2>
  | <Condition3> = <Result3> 
  ...
```
 

 
Chúng tôi sử dụng biểu tượng`|` để chỉ sự khởi đầu của mỗĩ guard.
 
- Lưu ý rằng không có dấu `=` sau các đối số  `func`! Đó là một cạm bẫy phổ biến khi viết bảo vệ. Đừng thêm cái đó

 

 
Với guards, chúng ta có thể viết hàm `specialBirthday` như thế này:
 

``` {.haskell}
specialBirthday :: Int -> [Char]
specialBirthday age
  | age == 1 = "First birthday!"
  | age == 18 = "You're an adult!"
  | age == 60 = "Finally, I can stop caring about new lingo!"
  | True = "Nothing special"
```

```
Use otherwise
Found:
specialBirthday age
  | age == 1 = "First birthday!"
  | age == 18 = "You're an adult!"
  | age == 60 = "Finally, I can stop caring about new lingo!"
  | True = "Nothing special"
Why Not:
specialBirthday age
  | age == 1 = "First birthday!"
  | age == 18 = "You're an adult!"
  | age == 60 = "Finally, I can stop caring about new lingo!"
  | otherwise = "Nothing special"
```
 
That last `True` is there to be a catch-all condition. A condition that
always evaluates to `True` because it\'s literally `True`.

This pattern of adding a last `True` in the last guard is so common that
Haskell comes with a variable called `otherwise` that it\'s equal to
`True` (`otherwise = True`) to make for an even more readable guard:
 

 
``` {.haskell}
specialBirthday :: Int -> [Char]
specialBirthday age
  | age == 1 = "First birthday!"
  | age == 18 = "You're an adult!"
  | age == 60 = "Finally, I can stop caring about new lingo!"
  | otherwise = "Nothing special"

specialBirthday 60
```

"Cuối cùng, tôi có thể ngừng quan tâm đến biệt ngữ mới!"

Bây giờ bạn có thể dễ dàng hiểu ý nghĩa của biểu thức này trong nháy mắt!

OK, đó là về đánh giá có điều kiện. Bây giờ, hãy xem cách chúng ta có thể đưa trò chơi cú pháp hàm của mình lên một tầm cao với `let` and `where`!
 

 
## `let` and `where`
 

Chúng tôi sử dụng `let` và `where` để lưu trữ kết quả tính toán trung gian và liên kết các biến cục bộ.

Hãy bắt đầu với `let`!
 
### Biểu thức `let`
 
`let` có thể liên kết các biểu thức với các biến cục bộ theo cách sau:
 
``` {.haskell}
func arg =
    let <BIND_1> 
        <BIND_2> 
    in  <EXPR that uses BIND_1 and/or BIND_2>
```
 

 
trong đó `<BIND_X>` là các ràng buộc cục bộ có thể truy cập được trong biểu thức `let` 
 
Bây giờ, hãy tạo một hàm nhận nhiệt độ một tính bằng độ C--- và một tính bằng độ F---và trả về nhiệt độ nóng hơn nhưng tính bằng Kelvin. Đó là một vài chuyển đổi, phải không?

Để chuyển từ độ F sang độ C, trước tiên chúng ta phải trừ 32 rồi nhân với 5/9, như sau:
 
`tC = (tF - 32) * 5/9`
 
Để chuyển từ độ C sang độ Kelvin, chúng ta chỉ cần thêm 273,16 như sau:
 
tK = tC + 273.16
 
So, if we want to create **a single function** that does all that, we
can create something like this:
Vì vậy, nếu chúng ta muốn tạo **một hàm duy nhất** thực hiện tất cả những điều đó, chúng ta có thể tạo một cái gì đó như thế này:

 
``` {.haskell}
hotterInKelvin :: Double -> Double -> Double
hotterInKelvin c f = if c > (f - 32) * 5 / 9 then c + 273.16 else ((f - 32) * 5 / 9) + 273.16

hotterInKelvin 40 100
```

 313.16
 
Nó hoạt động, nhưng đó là sách giáo khoa.

Một cách tiếp cận tốt hơn là sử dụng `let` các liên kết cho các biểu thức trung gian và viết biểu thức kéo mọi thứ lại với nhau tại một phần:
  `in` 

 
``` {.haskell}
hotterInKelvin' :: Double -> Double -> Double
hotterInKelvin' c f =
  let fToC t = (t - 32) * 5 / 9
      cToK t = t + 273.16
      fToK t = cToK (fToC t)
   in if c > fToC f then cToK c else fToK f

hotterInKelvin' 40 100
```

    313.16
 

Bây giờ mã của chúng ta dễ đọc hơn nhiều và không có tất cả các biểu thức lặp lại đó!

Nhưng xin chờ chút nữa! Chúng tôi cũng có thể sử dụng `where`

 
### `where`
 
Chúng ta có thể sử dụng `where` để liên kết các giá trị với các biến theo cách sau:
 
 
``` {.haskell}
func arg = <EXP that uses BIND_1 and/or BIND_2>
    where <BIND_1>
          <BIND_2>
```
 

 
Vì vậy hàm `hotterInKelvin` tương tự như trước đây có thể được thể hiện `where` như thế này:
 

 
Trong đó `<BIND_X>` là các ràng buộc có thể truy cập trong toàn bộ thân chức năng.
 
``` {.haskell}
hotterInKelvin'' :: Double -> Double -> Double
hotterInKelvin'' c f = if c > fToC f then cToK c else fToK f
  where
    fToC t = (t - 32) * 5 / 9
    cToK t = t + 273.16
    fToK t = cToK (fToC t)

hotterInKelvin'' 40 100
```

    313.16
 
 Ok, cả hai dường như làm điều tương tự. Vì vậy, tại sao bận tâm có cả hai? Chúng ta không thể chọn sử dụng một trong số chúng sao?

Chà, có rất nhiều trường hợp chúng có thể hoán đổi cho nhau. Trong những trường hợp đó, bạn có thể chọn cái nào bạn thích nhất. Nhưng họ cũng có những hạn chế và điểm mạnh.

 
### Tôi có nên sử dụng `let` or `where`?
 
`let` các biểu thức thuận tiện bất cứ khi nào chúng ta muốn tách các biểu thức phức tạp thành các khối xây dựng nhỏ hơn mà bạn kết hợp thành một biểu thức cuối cùng.

Ví dụ, hãy tưởng tượng bạn muốn tính thể tích của một ngôi nhà. Chúng ta có thể đơn giản hóa vấn đề như thế này:

Một ngôi nhà là một khối lập phương với một kim tự tháp trên đỉnh (mái nhà). Vì vậy, để tìm thể tích của nó, chúng ta cần tính thể tích của khối lập phương và thể tích của hình chóp rồi cộng chúng lại với nhau:
 
``` {.haskell}
houseV side roofH = let cubeV = side ^ 3
                        pyramidV = (side ^ 2) * roofH / 3
                    in  cubeV + pyramidV
                    
houseV 3 1
```
    30.0
 
 
Chúng tôi tạo `cubeV` và `pyramidV` các khối xây dựng bên trong `let`sau đó chúng tôi sử dụng chúng bên trong biểu thức `in`.

Bên cạnh sự rõ ràng của cú pháp, một ưu điểm khác là nếu biểu thức cuối cùng sau này trở nên phức tạp hơn (ví dụ: chúng ta thêm một ống khói vào nhà), chúng ta chỉ cần thêm một ràng buộc khác và sử dụng nó trong biểu thức cuối cùng!:
 
``` {.haskell}
houseV side roofH = let cubeV = side ^ 3
                        pyramidV = (side ^ 2) * roofH / 3
                        chimneyV = (0.5 ^ 2) * roofH
                    in  cubeV + pyramidV + chimneyV
                    
houseV 3 1
```
    30.25
 
Mặt khác, các biểu thức `where`  thuận tiện bất cứ khi nào chúng ta muốn mở rộng các ràng buộc trên một số phương trình guarded.
 
Bởi vì chúng tôi không thể truy cập cấc ràng buộc `let` trên tất cả các lính canh, nhưng với `where` chúng tôi có thể!! Ví dụ:
 
``` {.haskell}
analyzeCylinder :: Float -> Float -> String
analyzeCylinder diameter height
       | volume < 10 = "The cylinder is a glass."
       | volume < 100 = "The cylinder is a bucket."
       | volume < 1000 = "The cylinder is a tank."
       | otherwise = "What in the world is that huge thing?!"
    where
        volume = pi * diameter^2 * height / 4

analyzeCylinder 15 6
```

  Kết quả:
    "What in the world is that huge thing?!"
 
Như bạn có thể thấy, chúng tôi đã xác định liên kết `volume` bên trong khối `where`, và sau đó chúng tôi truy cập nó trên mọi biểu thức được bảo vệ!

Và cuối cùng, sự khác biệt chính giữa hai loại này là các liên kết `where` là các khai báo được liên kết với một cấu trúc cú pháp xung quanh.
Có nghĩa là, chúng chỉ có thể được sử dụng ở những nơi cụ thể (như bên trong thân hàm). Tuy nhiên, `let` giới thiệu một biểu thức, vì vậy nó có thể được sử dụng ở bất cứ đâu mà một biểu thức có thể được sử dụng. Ví dụ:

``` {.haskell}
-- Seconds in a day
24 * (let seconds = 60 in seconds * 60) 

-- The volume of a rectangular prism (we can separate expressions by semicolons to have them in the same line)
let s1 = 10; s2 = 20; s3 = 30; in s1*s2*s3 
```

Kết quả:
    86400
 

Kết quả:
    6000
 
Trong tất cả các trường hợp bạn có thể sử dụng cái này hay cái kia, hãy chọn cái phù hợp với tình huống hoặc phong cách của bạn. Phải thực hành một số để chọn cái nào sẽ sử dụng một cách thích hợp và đó cũng là sở thích của người lập trình. Vì vậy, đừng lo lắng quá nhiều về nó.
 

### Những điều cần lưu ý 
 
Các biểu thức được xác định bằng wherekhông thể truy cập bên ngoài thân hàm đó.
 

``` {.haskell}
fToK t = 273.16 + fToC t
    where fToC t = (t - 32) * 5 / 9
    
fToC 60
```

 
    <interactive>:1:1: error:
        • Variable not in scope: fToC :: t0 -> t
        • Perhaps you meant ‘fToK’ (line 1)
 
Biểu thức được giới thiệu trong biểu thức `let`  chỉ tồn tại trong  biểu thức `let` đó.

Ví dụ: hàm này lấy tên và họ của bạn và trả về tên viết tắt của bạn: 
 
``` {.haskell}
initials :: String -> String -> String
initials name lastName = if name == "" || lastName == ""
                         then "How was your name again?"
                         else let x = head name
                                  y = head lastName
                              in [x] ++ "." ++ [y] ++ "."

initials "Richard" "Feynman"
```

Kết quả:
    "R.F."
 
Các biểu thức `x` và `y` chỉ khả dụng bên trong  biểu thức `let` đó. Nếu bạn cố gắng sử dụng chúng bên trong `if` hoặc `then`, thì chúng sẽ nằm ngoài phạm vi và nó sẽ không biên dịch được. 
 
## Tóm tắt

Trong bài học này, chúng ta đã thảo luận:

- Câu lệnh `if-then-else` và tại sao bạn luôn phải xác định trường hợp khác.

- Cách sử dụng các guards để tránh các câu lệnh `if-else` lồng nhau.

- Cách sử dụng `let` và `where` lưu trữ kết quả của các phép tính trung gian, liên kết các biến cục bộ, cho phép ***mã sạch hơn và tránh lặp lại*** chính bạn.
