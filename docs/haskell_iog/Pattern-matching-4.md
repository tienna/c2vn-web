
# Pattern matching và biểu thức Case

## Outline

-   Pattern matching in functions
    -   Catch-all patterns
-   Closer look at lists
-   Pattern matching
    -   Lists
    -   Tuples
-   Case expressions
-   Declaration style VS Expression style



## Pattern matching


**Pattern matching** là hành động khớp dữ liệu (giá trị, kiểu, v.v.) với một mẫu, tùy chọn ràng buộc các biến để khớp thành công.

Chúng ta sẽ thảo luận về khớp mẫu trong ba trường hợp:

- Khớp mẫu (Pattern matching) trong định nghĩa hàm.

- Kết hợp mẫu cho danh sách.

- Kết hợp mẫu cho bộ dữ liệu.

Nghe có vẻ phức tạp, nhưng nó thực sự khá trực quan khi bạn hiểu rõ về nó. Sẽ rõ như ban ngày sau một vài ví dụ.

Hãy để mô hình khớp với một số hàm!




## Pattern matching trong hàm


Nhớ lại hàm `specialBirthday` trong bài học trước?



``` {.haskell}
specialBirthday :: Int -> [Char]
specialbirthday age =
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



Tôi biết \... Chúng ta đã khắc phục sự rườm rà đó với guards. Nhưng bây giờ, chúng ta sẽ sáng tạo hơn và giải quyết vấn đề bằng khớp mẫu (Pattern matching)!

Để khớp mẫu trên các định nghĩa hàm, chúng ta chỉ cần xác định cùng một hàm nhiều lần, thay thế các tham số bằng các giá trị. Như thế này:



``` {.haskell}
specialBirthday :: Int -> [Char]
specialBirthday 1   = "First birthday!"
specialBirthday 18  = "You're an adult!"
specialBirthday 60  = "finally, I can stop caring about new lingo!"
```

Và làm như thế nào? Chà, khi được trình bày với mã như thế này, Haskell sẽ cố gắng khớp giá trị của `age` với định nghĩa đầu tiên. Nếu `age /= 1`, nó sẽ cố khớp với định nghĩa thứ hai. Nếu `age /= 18`, nó sẽ cố khớp với định nghĩa thứ ba. Và tiếp tục như vậy cho đến khi giá trị được truyền dưới dạng tham số khớp với một trong các giá trị của định nghĩa.

Và, tất nhiên, tôi chắc rằng bạn đã nhận thấy một vấn đề lớn. Điều gì xảy ra nếu chúng ta chuyển một số khác với số đã xác định? Giống như 29? Chúng ta có thể giải quyết vấn đề đó bằng `catch-all patterns`!


### Catch-all patterns

Chữ ký của hàm nêu rõ rằng bạn có thể chuyển bất kỳ giá trị nào thuộc kiểu `Int`.

Vì vậy, chúng ta có thể chuyển `14` ---theo ví dụ---hoặc bất kỳ số nào khác, cho vấn đề đó. Nhưng các hàm nên làm gì nếu chúng ta vượt qua `14`? Chúng tôi không chỉ định nó vì chúng ta không khớp mẫu cho `14`! Vì vậy, chương trình sẽ bị sập 💥 vì không biết cách xử lý giá trị đó! 😱

Bởi vì chúng ta cần hàm hoạt động với bất kỳ giá trị nào mà các kiểu của chúng ta có thể chấp nhận, nên chúng ta cần khớp mẫu cho tất cả các tình huống có thể xảy ra. Nhưng bạn không thể viết định nghĩa cho mọi giá trị đơn lẻ! Sau đó, bạn có thể làm gì?!?!

Bạn sử dụng một **catch-all pattern**!
 
**Catch-all patterns cho phép bạn cung cấp một định nghĩa mặc định trong trường hợp không có định nghĩa cụ thể nào của bạn phù hợp**


Trong trường hợp này, nó sẽ đóng vai trò `else` ở cuối `specialBirthday`.
 
Để sử dụng các mẫu catch-all, bạn phải cung cấp tên bắt đầu bằng chữ thường, như  `age`, `x`, hoặc `yearsSinceThisPoorSoulHasTouchedTheEarth`.



Như thế này:

``` {.haskell}
specialBirthday :: Int -> [Char]
specialBirthday 1   = "First birthday!"
specialBirthday 18  = "You're an adult!"
specialBirthday 60  = "finally, I can stop caring about new lingo!"
specialBirthday age = "Nothing special"

specialBirthday 18
```

Kết quả:
    "You're an adult!"


Bây giờ, nếu chúng ta chuyển bất kỳ số nào khác với `1`, `18`, or `60`,
`specialBirthday` sẽ ước tính thành`"Nothing special"`.


 
```

QUAN TRỌNG:Luôn cung cấp Mẫu phù hợp cho tất cả các tình huống có thể xảy ra!
Nếu không, bạn sẽ nhận được cảnh báo tiếp theo:
    
`(Các) đối sánh mẫu là không đầy đủ Trong một phương trình cho ngày đặc biệt`


```

Một chi tiết quan trọng khác là Haskell so khớp từ trên xuống dưới. Vì vậy, nếu bạn làm điều gì đó như:


``` {.haskell}
specialBirthday :: Int -> [Char]
specialBirthday age = "Nothing special"
specialBirthday 1   = "First birthday!"
specialBirthday 18  = "You're an adult!"
specialBirthday 60  = "finally, I can stop caring about new lingo!"

specialBirthday 60
```

Kết quả:
    "Nothing special"


Định nghĩa đầu tiên sẽ nắm bắt tất cả các lần xuất hiện và chúng ta sẽ luôn nhận được `"Nothing special"` kết quả, bất kể chúng ta vượt qua số nào. Vì vậy, hãy đảm bảo thêm mẫu bắt tất cả làm định nghĩa cuối cùng.

Cuối cùng, chúng ta đã nói rằng bạn có thể tùy chọn **liên kết các biến để khớp thành công** và đó là những gì chúng ta vừa làm!

When using `specialBirthday`, every time the value falls into the `age`
catch-all pattern, we bind that value to the `age` variable. Allowing us
to use the value inside the definition\'s expression (it\'s just an
argument)!:
Khi sử dụng `specialBirthday`, mỗi khi giá trị rơi vào mẫu catch-all `age`, chúng ta sẽ liên kết giá trị đó với biến `age`. Cho phép chúng ta sử dụng giá trị bên trong biểu thức của định nghĩa (nó chỉ là một đối số)!:


``` {.haskell}
-- Note: You should know how to use `show` if you did last week homework.

specialBirthday :: Int -> [Char]
specialBirthday 1   = "First birthday!"
specialBirthday 18  = "You're an adult!"
specialBirthday 60  = "finally, I can stop caring about new lingo!"
specialBirthday age = "Nothing special, you're just " ++ show age

specialBirthday 22
```

Kết quả:
    "Nothing special, you're just 22"




Bạn không thể phóng đại mức độ hữu ích của điều này! **Bạn đang lọc các giá trị thành những giá trị khớp với một mẫu cụ thể VÀ đồng thời liên kết các giá trị đó với các biến để sử dụng sau này!**

Một ví dụ hấp dẫn hơn về cách điều này hữu ích là khi mẫu khớp với các cấu trúc phức tạp hơn như danh sách và bộ dữ liệu. Hãy khám phá điều đó.



## em kỹ hơn về lists

Trước khi tìm hiểu về khớp mẫu với danh sách, chúng ta cần xem xét kỹ hơn về danh sách.

Chúng ta biết rằng toán tử  `:` (khuyết điểm) thêm một phần tử vào đầu danh sách (đặt trước một phần tử):


``` {.haskell}
-- (:) :: a -> [a] -> [a]

3 : [4,5]  -- [3,4,5]

'L' : "ook, mom! I'm programming"  -- "I'm programming"
```

Kết quả:
    [3,4,5]


Kết quả:
    "Look, mom! I'm programming"


Hãy nhớ khi tôi nói với bạn rằng  `String` là cú pháp list cho [Char]? Chà, hãy sẵn sàng cho việc bất ngờ cách chúng ta viết danh sách cho đến nay thực sự là  cú pháp cho  Haskell thực sự nhìn thấy danh sách! Là một danh sách trống được thêm vào trước tất cả các phần tử mà nó chứa! 🤯

``` {.haskell}
[1,2,3,4] == 1:2:3:4:[]  -- True

"Hello!"  == 'H':'e':'l':'l':'o':'!':[]  -- True
```

Kết quả:
```
Use list literal
Found:
1 : 2 : 3 : 4 : []
Why Not:
[1, 2, 3, 4]
Use list literal
Found:
'H' : 'e' : 'l' : 'l' : 'o' : '!' : []
Why Not:
['H', 'e', 'l', 'l', 'o', '!']

```

Kết quả:
    True


Kết quả:
    True



Bây giờ, bạn có thể nghĩ: "Tại sao tôi phải quan tâm? Tôi sẽ tiếp tục viết các danh sách như mọi khi." Đối với những gì tôi nói: "AHA! KHỐI MẪU!!"



## Pattern matching lists


Bây giờ chúng ta đã biết danh sách trông như thế nào khi không trang điểm 💅, chúng ta có thể sử dụng nó để khớp mẫu với các định nghĩa hàm khác nhau tùy thuộc vào cấu trúc của danh sách!

Hãy để mẫu khớp với nhau theo nhiều cách khác nhau và điều tra cách thức hoạt động của mã sau:



``` {.haskell}
whatsInsideThisList :: [Int] -> String
whatsInsideThisList []         = "It's empty!"
whatsInsideThisList [x]        = "A single element: " ++ show x
whatsInsideThisList [x, y]     = "Two elements: " ++ show x ++ " and " ++ show y
whatsInsideThisList (x:y:z:[]) = "The list has three elements: " ++ show [x,y,z]
whatsInsideThisList (x:rest)   = "The first element is: " ++ show x ++ ", and there are quite a few more!"

whatsInsideThisList []           -- "It's empty!"
whatsInsideThisList [1, 2]       -- "Two elements: 1 and 2"
whatsInsideThisList [1, 2, 3]    -- "The list has three elements: [1,2,3]"
whatsInsideThisList [1, 2, 3, 4] -- "The first element is: 1, and there are quite a few more!"
```

Kết quả:
```
Use list literal pattern
Found:
(x : y : z : [])
Why Not:
[x, y, z]
"It's empty!"
"Two elements: 1 and 2"
"The list has three elements: [1,2,3]"
"The first element is: 1, and there are quite a few more!"
As you can see, you can pattern match for:
```


Kết quả:
    "It's empty!"


Kết quả:
    "Two elements: 1 and 2"


Kết quả:
    "The list has three elements: [1,2,3]"


Kết quả:
    "The first element is: 1, and there are quite a few more!"



Như bạn có thể thấy, bạn có thể  khớp mẫu cho:

-   Danh sách trống `[]`.

-   Danh sách có kích thước cố định, cả với (`[x]`, `[x,y]`) và không có cú pháp
    (`x:[]`,`x:y:[]`).

-   Danh sách không trống ở bất kỳ kích thước nào với `x:rest`. ( (Thường được sử dụng trong các hàm đệ quy và thường được đặt tên là `x:xs`.)



```
Chúng tôi bao quanh `()` các mẫu của hai định nghĩa cuối cùng để chỉ ra rằng hàm lấy mọi thứ bên trong `()` làm một đối số duy nhất.

```



Và, bởi vì chúng ta đã ràng buộc các kết quả khớp với các biến (`x`, `y`,`z`, `rest`),nên bạn có thể sử dụng các biến đó bên trong định nghĩa của hàm.

Nhưng nếu bạn không cần chúng thì sao? Điều gì sẽ xảy ra nếu bạn muốn làm điều gì đó khi một mẫu cụ thể phù hợp, nhưng không quan tâm đến giá trị/giá trị thực tế?

**Liên kết các giá trị và sau đó bỏ qua chúng sẽ làm ô nhiễm môi trường của bạn bằng các biến mà bạn sẽ không bao giờ sử dụng!** Nhưng đừng lo lắng. Để đặt hiệu quả lên hàng đầu, bạn có thể bỏ qua dữ liệu mà bạn không quan tâm trong khi khớp mẫu cho phần còn lại! Hãy xem hàm sau. Nó cho chúng ta biết đâu là phần tử đầu tiên và thứ ba trong danh sách `Bool` (if any):



``` {.haskell}
firstAndThird :: [Bool] -> String
firstAndThird (x:_:z:_) = "The first and third elements are: " ++ show x ++ " and " ++ show z
firstAndThird _ = "Don't have them!"

firstAndThird [True, True, False]
```

Kết quả:
    "The first and third elements are: True and False"


Định nghĩa đầu tiên sẽ khớp mẫu cho bất kỳ danh sách nào có 3 phần tử trở lên, trong khi `_` sẽ bỏ qua phần tử thứ hai và phần còn lại của danh sách.

Và đối với bất kỳ danh sách nào khác, chúng ta hoàn toàn bỏ qua nó với `_` toàn bộ danh sách.

Tuyệt vời, phải không? Biết được điều này, chúng ta có thể sửa đổi hàm `initials` của bài học cuối cùng từ đây:

``` {.haskell}
initials :: String -> String -> String
initials name lastName = if name == "" || lastName == ""
                         then "How was your name again?"
                         else let x = head name
                                  y = head lastName
                              in [x] ++ "." ++ [y] ++ "."

initials' "Nikola" "Tesla"
```

Kết quả:
    "N.T."


Về điều này tương tương:


``` {.haskell}
initials' :: String -> String -> String  
initials' (f:_) (l:_) = [f] ++ "." ++ [l] ++ "." 
initials' _ _ = "How was your name again?"

initials' "Nikola" "Tesla"
```

Kết quả:
    "N.T."




Trong ngắn ngọn và rõ ràng hơn.

Bây giờ, hãy xem cách khớp mẫu giúp cuộc sống của chúng ta dễ dàng hơn với các bộ dữ liệu!



## Pattern matching tuples



Như bạn có thể nhớ lại từ các bài học trước, chúng ta chỉ có thể lấy các phần tử bên trong một cặp (bộ gồm hai phần tử) bằng cách sử dụng hàm `fst` và `snd` .

Nếu bạn cần một giá trị từ các bộ dữ liệu lớn hơn thế, thì bạn đang gặp khó khăn. 👀 Nhưng bây giờ bạn đã là một ảo thuật gia khớp mẫu 🪄, nó không còn là là giới hạn!

Bạn muốn trích xuất phần tử đầu tiên của bộ 3 phần tử? Không vấn đề gì:



``` {.haskell}
firstOfThree :: (a, b, c) -> a
firstOfThree (x, _, _) = x

firstOfThree (1,2,3)
```

Kết quả:
    1




**Done!**

Bạn muốn tạo một cặp có phần tử thứ hai và thứ tư của bộ 4 phần tử? Giống như trước!:



``` {.haskell}
pairFromFour :: (a, b, c, d) -> (b, d)
pairFromFour (_, x, _, y) = (x, y)

pairFromFour (1,2,3,4)
```

Kết quả:
    (2,4)




**BOOM! 💥 Done!**Và bạn có thể tiếp tục nếu bạn muốn. Tuy nhiên, ngay bây giờ, chúng ta sẽ chuyển sang biểu thức `case`.



## Biểu thức Case 



Với biểu thức `case`, chúng ta có thể thực thi một khối mã cụ thể dựa trên mẫu của một biến.



Tương tự như với câu lệnh  `switch` trong các ngôn ngữ lập trình khác. `case`
trông như sau:


 
``` {.haskell}
case <Exp> of <Pattern1> -> <Result1>
              <Pattern2> -> <Result2>
              <Pattern3> -> <Result3>
	          ...
```



Trong đó giá trị của `<Exp>`được sao sánh với `<Pattern>` bên trong khối
`of`. và nó phù hượp thì `<Result>` là giá trị tương ứng.

(Notice that there\'s no `=` sign! That\'s because the entire `case`
expression is just an expression. Not a function or a binding.)

Ví dụ, chúng ta có thể viết một hàm nhận vào một bộ 3 `Int`  và kiểm tra xem có bất kỳ phần tử nào trong hàm chứa số  `0` không:

``` {.haskell}
checkForZeroes :: (Int, Int, Int) -> String
checkForZeroes tuple3 = case tuple3 of
  (0, _, _) -> "The first one is a zero!"
  (_, 0, _) -> "The second one is a zero!"
  (_, _, 0) -> "The third one is a zero!"
  _         -> "We're good!"
  
checkForZeroes (32,0,256)
```

Kết quả:
    "The second one is a zero!"




Và tôi đã có thể thấy rằng. "Không phải kết quả cuối cùng giống với kết quả chúng ta nhận được khi so khớp mẫu trên các tham số trong định nghĩa hàm sao?"

Chà . .. Vâng. Về cốt lõi, khớp mẫu trên các tham số trong định nghĩa hàm chỉ là  cú pháp cho các biểu thức chữ hoa chữ thường! Vì vậy, mã trước đó có thể hoán đổi với mã này:



``` {.haskell}
checkForZeroes :: (Int, Int, Int) -> String
checkForZeroes (0, _, _) = "The first one is a zero!"
checkForZeroes (_, 0, _) = "The second one is a zero!"
checkForZeroes (_, _, 0) = "The third one is a zero!"
checkForZeroes _         = "We're good!"

checkForZeroes (32,0,256)
```

Kết quả:
    "The second one is a zero!"



Nhưng mà! Bởi vì bây giờ chúng ta đang sử dụng BIỂU THỨC viết hoa chữ thường, nên chúng ta có thể sử dụng chúng ở bất kỳ đâu mà một biểu thức có thể được sử dụng! Không chỉ khi xác định một chức năng. Vì vậy, ví dụ, chúng ta có thể nối kết quả đánh giá biểu thức trường hợp với một Chuỗi khác:



``` {.haskell}
checkForZeroes' :: (Int, Int, Int) -> String
checkForZeroes' tuple3 = "The " ++ show tuple3 ++ " has " ++
    case tuple3 of
      (0, _, _) -> "a zero as its first element"
      (_, 0, _) -> "a zero as its second element"
      (_, _, 0) -> "a zero as its third element"
      _         -> "no zeroes!"

checkForZeroes' (32,0,256)
```

Kết quả:
    "The (32,0,256) has a zero as its second element"

Điều đó làm cho biểu thức `case` thuận tiện để sử dụng bên trong các biểu thức khác. Ngoài ra, hãy nhớ rằng bất kỳ điều gì bạn có thể làm với các biểu thức  `case` đều có thể được thực hiện bằng cách xác định các hàm với let, where, hoặc guards.

Và điều đó đặt ra câu hỏi: "Tại sao chúng ta lại có quá nhiều cách để làm cùng một việc?!" Tôi sẽ cho bạn biết tại sao . ..

## Phong cách khai báo 🆚 Phong cách thể hiện
Declaration style 🆚 Expression style

Có hai phong cách chính để viết các chương trình chức năng trong Haskell:

- **Kiểu khai báo** là nơi bạn xây dựng một thuật toán theo một số phương trình được thỏa mãn.
- **Kiểu biểu thức** là nơi bạn soạn các biểu thức lớn từ các biểu thức nhỏ.
 

Nhiều mặt trước đây, những `<s>` người tạo ra các `</s>` Haskell đã tham gia vào một cuộc tranh luận gay gắt xem phong cách nào tốt hơn. Chủ yếu là vì nếu có thể, chỉ có một cách để làm điều gì đó sẽ ít gây nhầm lẫn và dư thừa hơn. Nhưng mà! Sau khi đổ máu, mồ hôi và nước mắt, họ quyết định hỗ trợ toàn diện về mặt cú pháp cho cả hai. Và hãy để những người bình thường sử dụng những gì họ thích nhất.

Như ví dụ về điều này, chúng ta đã nhận được:

  ------------------------------------------------------------------------
  |Declaration style                    |Expression style|
  |:---                                  |:---:|
  |`where` clause                       |`let` expressions|
  |Pattern matching in function         |case expression:|
  |definitions: `f [] = 0`              |`f xs = case xs of [] -> 0`|
  |Guards on function definitions       |`if` expression:|
  |`f [x] \| x > 0 = 'a'`               |`f [x] if x > 0 then 'a' else...`|
  |Function arguments on left-hand      |ambda abstraction|
  |side: `f x = x*x`                    |`f = \x -> x*x`|
  ------------------------------------------------------------------------



Và thứ lambda đó ở cuối bảng là gì? Đó là một chủ đề cho bài học tuần tới! 😁 Vì vậy hãy chắc chắn rằng bạn đã xem nó!

Bây giờ, như một bản tóm tắt:


## Summary

- Khớp mẫu cho các định nghĩa hàm giúp dễ dàng thực hiện những việc khác nhau tùy thuộc vào cấu trúc hoặc giá trị của các đối số.

- Khớp mẫu trên bộ dữ liệu, danh sách và các cấu trúc khác cho phép bạn dễ dàng trích xuất các giá trị chứa trong đó.

- Các biểu thức chữ hoa chữ thường là một cách biểu đạt hơn của các định nghĩa hàm so khớp mẫu, nhưng chúng cũng có thể được sử dụng ở hầu hết mọi nơi như bất kỳ biểu thức nào khác. (Không chỉ để xác định chức năng.)

- Hai kiểu chính để viết lập trình chức năng trong Haskell là "Kiểu khai báo" và "Kiểu biểu thức". Đừng lãng phí thời gian để tranh luận xem kiểu nào là tốt nhất. Áp dụng cái bạn thích hơn hoặc trộn và kết hợp theo ý muốn.

