


7-Giới thiệu về kiểu lớp
===================



## Outline

-   The awesomeness of `type classes`
-   What are `type classes`
-   Common `type classes`
    -   `Eq`, `Ord`
    -   `Num`, `Integral`, `Floating`
    -   `Read`, `Show`
-   The most general valid type
-   Multiple constraints

Đây là phần giới thiệu về khái niệm và cách sử dụng các `type classes` từ quan điểm của người tiêu dùng. Có nghĩa là, khi chúng tôi đang phát triển trong Haskell, có các loại lớp và chúng tôi muốn hiểu và sử dụng chúng.


Hai bài học tiếp theo, sau khi tìm hiểu về cách tạo kiểu, chúng ta sẽ xem xét nó từ quan điểm của lớp kiểu và trình tạo thể hiện.



## Sự tuyệt vời của `type classes`



Cho đến giờ, chúng ta đã học được rằng, khi định nghĩa một hàm, chúng ta chọn nó có thể được sử dụng với một kiểu cụ thể như sau: 



``` {.haskell}
sqr :: Int -> Int
sqr v = v * v
```


Điều này cung cấp nhiều sự an toàn bởi vì bằng cách đảm bảo rằng hàm của bạn chỉ nhận kiểu `Int`, bất kể giá trị mà nó nhận, bạn có thể làm toán với nó. Nhưng nhược điểm là bạn bị hạn chế sử dụng hàm đó chỉ với kiểu đó. Nếu bạn cần nó `Double` hoặc `Float`, bạn phải xác định lại nó với một tên khác như `sqrDouble` or `sqrFloat`.

Hoặc với một loại đa hình như thế này:


``` {.haskell}
fst :: (a, b) -> a
fst (x, _) = x
```

Điều này cung cấp rất nhiều tính linh hoạt vì bạn có thể sử dụng các giá trị thuộc bất kỳ loại nào làm đầu vào, nhưng bạn sẽ mất tất cả sự an toàn khi sử dụng kiểu.

Vì vậy, chúng tôi có một cái gì đó như thế này: 

                        ↑
                        | X (Polym.)    
                        |
          Flexibility   |
                        |
                        |
                        |                X (Types)     
                        |
                        ------------------⟶
                                 Safety



`Type classes` là những gì bạn nhận được khi bạn là một nhà phát triển ngôn ngữ lập trình cứng đầu và muốn có sự linh hoạt khi có các loại đa hình và sự an toàn khi sử dụng tất cả các kiểu cùng một lúc. 

                        ↑
                        | X (Polym.)     X (Type Classes)
                        |
          Flexibility   |
                        |
                        |
                        |                X (Types)     
                        |
                        ------------------⟶
                                 Safety


Vào cuối ngày, những gì `Type Classes` làm là cho phép bạn sử dụng các giá trị đa hình bị hạn chế . Các giá trị có thể thuộc các loại khác nhau, nhưng không phải tất cả chúng. Chỉ là một tập hợp con được ủy quyền. Điều này được gọi là đa hình Ad-hoc hoặc quá tải , nhưng bạn không cần phải nhớ điều đó ngay bây giờ

Bây giờ chúng ta đã biết tại sao `type classes` chúng tuyệt vời, hãy xem chúng thực sự là gì! 


## `Type classes` là gì?

Nếu bạn gặp những người thuộc câu lạc bộ vẽ nâng cao, bạn sẽ biết họ có thể vẽ. Tại sao? Bởi vì đó là một trong những yêu cầu để vào câu lạc bộ! 


`Type classes` giống như các câu lạc bộ mà các kiểu có thể tham gia nếu chúng có những hành vi cụ thể. (Hành vi, trong ngữ cảnh này, có nghĩa là chức năng.) Vì vậy, một lớp kiểu xác định một loạt các chức năng và mỗi loại thuộc về lớp kiểu có định nghĩa riêng về các chức năng đó.


Vì vậy, từ quan điểm của nhà phát triển sử dụng các kiểu có sẵn và `type classes`:

**Nếu bạn thấy rằng một kiểu là một thể hiện của một lớp kiểu, thì bạn biết rằng nó thực hiện và hỗ trợ các hành vi (chức năng) của lớp kiểu đó.**

Ví dụ như kiểu `Bool`. Để  xem thuộc lớp kiểu nào bạn có thể dử dụng `:i` (info) trong ghci. Nếu chạy `:i Bool`, Chúng tôi nhận được:

``` {.haskell}
type Bool :: *
data Bool = False | True
  	-- Defined in ‘GHC.Types’
instance Eq Bool -- Defined in ‘GHC.Classes’
instance Ord Bool -- Defined in ‘GHC.Classes’
instance Enum Bool -- Defined in ‘GHC.Enum’
instance Show Bool -- Defined in ‘GHC.Show’
instance Read Bool -- Defined in ‘GHC.Read’
instance Bounded Bool -- Defined in ‘GHC.Enum’
```

Chúng ta sẽ tìm hiểu về ` type` và `data`trong bài học tiếp theo. Vì vậy, nếu chúng ta bỏ qua hai dòng mã đầu tiên, chúng ta sẽ thấy một loạt các dòng có nội dung instance .... Những dòng đó cho chúng ta biết rằng kiểu `Bool` là một thể hiện của  `Eq` , lớp kiểu Ord , v.v.

Vì vậy, `Bool` thực hiện các chức năng của tất cả những `type classes`. Và, một cách tự nhiên, bây giờ chúng tôi muốn biết những hành vi đó `type classes` xác định điều gì. Vậy hãy cùng tìm hiểu nhé!


## `Type classes`



Bây giờ, chúng ta sẽ điểm qua những cách phổ biến nhất của `type classes`. Và tôi sẽ cho bạn biết chúng đại diện cho điều gì và hành vi chính của chúng. Nhưng bạn không cần phải ghi nhớ bất cứ điều gì về điều này. Sau bài học "tạo lớp loại", bạn sẽ có thể nhanh chóng kiểm tra mọi thứ tôi sẽ nói trong lớp này. Ngoài ra, đừng lo lắng về các chi tiết. Chúng ta sẽ dành phần này và hai bài học nữa về hệ thống kiểu. Sử dụng bài học này để bắt đầu phát triển ý tưởng về một lớp kiểu (`type classes`) và để làm quen với những lớp tích hợp phổ biến nhất (thường là những lớp duy nhất bạn cần).

### Lớp kiểu `Eq` 


Lớp Kiểu `Eq` là tất cả bình đẳng hay bằng nhau. Các kiểu là thể hiện của lớp kiểu `Eq` có thể cho biết liệu hai giá trị của kiểu có bằng nhau hay không bằng cách sử dụng các hàm `==`(bằng) và `/=`(không bằng).


Và bởi vì kiểu ` Bool` là một thể hiện của `Eq`, nên chúng ta biết rằng chúng ta có thể sử dụng hai hàm đó để so sánh các giá trị của kiểu đó:


``` {.haskell}
True == False  -- False

True /= False  -- True
```

Và nếu chúng ta kiểm tra chữ ký của các hàm `==` và `/=`, chúng ta sẽ thấy một vài điều mới:



``` {.haskell}
(==) :: Eq a => a -> a -> Bool

(/=) :: Eq a => a -> a -> Bool
```

Biểu `=>` tượng là **biểu tượng ràng buộc lớp** . Nó chỉ ra rằng một **kiểu đa hình bị ràng buộc là một thể hiện của một lớp kiểu** . 


Trong trường hợp này, mã ở bên phải của mũi tên ( `a -> a -> Bool`) chỉ ra rằng các hàm này nhận hai giá trị đa hình và trả về  kiểu `Bool`. Như mọi khi. Và mã ở bên trái mũi tên ( `Eq a`) chỉ ra rằng kiểu `a` được sử dụng hai lần ở bên phải mũi tên phải là một thể hiện của lớp kiểu `Eq`.

Vì vậy, chúng ta đang hạn chế (giới hạn) các loại mà bạn có thể chuyển đến hai hàm này, từ tất cả các loại đến chỉ những loại là thể hiện của `Eq`.


Và nó không dừng lại ở đó. Ví dụ, hãy tưởng tượng bạn tạo hàm này: 


``` {.haskell}
func x y = if x == y then x else y
```

Bạn không làm toán hay thao tác với các chuỗi. Nhưng bạn kiểm tra xem các giá trị có bằng nhau không. Vì vậy, bạn muốn đảm bảo rằng chức năng này chỉ chấp nhận các giá trị có thể được kiểm tra **tính bình đẳng** . Đó là mục đích của `Eq` ràng buộc lớp kiểu. Để chặn bạn sử dụng các kiểu có giá trị không thể so sánh được.

Và bởi vì `==` có `Eq a` ràng buộc và `func` sử dụng `==` bên trong, Haskell đủ thông minh để suy ra rằng chữ ký kiểu của hàm của chúng ta cũng có ràng buộc đó:


``` {.haskell}
func :: Eq a => a -> a -> a
func x y = if x == y then x else y
```

Và bây giờ đến thời điểm của sự thật. Tôi có thể áp dụng các chức năng này cho bao nhiêu loại? Chúng tôi biết rằng chúng tôi có thể áp dụng `Bool` vì `Bool` là một phiên bản của `Eq`. Nhưng những gì khác ở đây? Đó là những trường hợp khác? 

Chà.. nếu bạn sử dụng lệnh `:i Eq`, bạn sẽ thấy một danh sách khổng lồ tất cả các kiểu là thể hiện của lớp kiểu này: 


``` {.haskell}
-- ...
instance Eq a => Eq [a] -- Defined in ‘GHC.Classes’
instance Eq Word -- Defined in ‘GHC.Classes’
instance Eq Ordering -- Defined in ‘GHC.Classes’
instance Eq Int -- Defined in ‘GHC.Classes’
instance Eq Float -- Defined in ‘GHC.Classes’
instance Eq Double -- Defined in ‘GHC.Classes’
instance Eq Char -- Defined in ‘GHC.Classes’
instance Eq Bool -- Defined in ‘GHC.Classes’
-- ... more instances
```

Như bạn có thể thấy, tất cả các kiểu mà chúng ta đã gặp cho đến nay (và hơn thế nữa) đều là các thể hiện của lớp kiểu này (ngoại trừ các hàm). Đó là lý do tại sao chúng ta có thể kiểm tra xem hai giá trị loại `Char`, `Int`, `Float`, v.v. có bằng nhau hay không và đó là lý do tại sao chúng ta có thể áp dụng hàm `func` mà chúng ta vừa xác định cho bất kỳ giá trị nào trong số chúng:


``` {.haskell}
func True False -- False

func 1 2        -- 2

func 1.0 1.0    -- 1.0

func 'a' 'c'    -- 'c'
```


Và nếu bạn tình cờ chuyển một giá trị không phải là một thể hiện của Eq, chẳng hạn như một hàm thí sao:



``` {.haskell}
f1 x = x + 1
f2 x = x + 2 - 1

func f1 f2
```

Bạn sẽ gặp lỗi: 


``` {.haskell}
No instance for (Eq (Integer -> Integer))
        arising from a use of ‘==’
        (maybe you haven't applied a function to enough arguments?)
```

Bởi vì, giống như lỗi trên, loại `Integer -> Integer` không phải là phiên bản của `Eq`, và chúng tôi cần phải như vậy vì chúng tôi đang sử dụng `==`


Điều đó thực sự rất tuyệt, nhưng bạn không thể làm được gì nhiều với các kiểu chỉ thuộc về  lớp kiểu `Eq`. Bạn chỉ có thể biết liệu hai giá trị có bằng nhau hay không. Đó là nó. May mắn thay, Eqkhông phải là câu lạc bộ duy nhất trong thị trấn! 


###  Lớp kiểu `Ord` 



`Ord` là tất cả về thứ tự. Các loại là thể hiện của lớp loại `Ord`  có thể sắp xếp các giá trị của chúng và cho biết giá trị nào là lớn nhất. 

Và để làm được điều đó, lớp `Ord`  có tất cả các chức năng sau:


``` {.haskell}
  (<), (<=), (>=), (>) :: Ord a => a -> a -> Bool
  max, min             :: Ord a => a -> a -> a
  compare              :: Ord a => a -> a -> Ordering
```

Chúng ta đã sử dụng các toán tử bất đẳng thức (`<`, `>`, `<=`, `>=`) trong các bài học trước. Chúng lấy hai giá trị cùng kiểu thuộc về  `Ord`  và trả về một giá trị boolean:


``` {.haskell}
4 > 9      -- False

'a' >= 'b' -- False
```

Và các giá trị được sắp xếp như thế nào? Nó phụ thuộc vào kiểu. Với các số, nó tuân theo thứ tự toán học (ví dụ: `4` đến trước `5` và sau `3`). Với các ký tự, nó tuân theo thứ tự Unicode. Và các loại khác có thứ hạng khác. Như chúng ta đã nói, mỗi kiểu thuộc về một **lớp kiểu** có các triển khai (định nghĩa) riêng của các chức năng đó. Chúng ta sẽ tìm hiểu thêm về nó khi tạo các phiên bản của riêng mình. 

Nhưng với khả năng sắp xếp mọi thứ xung quanh, chúng ta có thể làm được nhiều điều hơn là chỉ có sự bất bình đẳng. 


#### Hàm `min` và `max`



Hàm `min` nhận hai giá trị của kiểu `a` là một thể hiện của `Ord` và trả về giá trị nhỏ nhất trong hai giá trị đó:


``` {.haskell}
min :: Ord a => a -> a -> a
```


Ví dụ:



``` {.haskell}
min 12 19 -- 12
```

Hàm `max` nhận hai giá trị của một kiểu `a` là một thể hiện của `Ord` và trả về giá trị lớn nhất trong hai giá trị: 


``` {.haskell}
max :: Ord a => a -> a -> a
```

Ví dụ:


``` {.haskell}
max 12 19 -- 19
```



#### Hàm `compare` 

Hàm `compare` nhận hai giá trị của một kiểu là một thể hiện của `Ord` và trả về một giá trị của kiểu `Ordering`, cho biết thứ tự của các giá trị.


``` {.haskell}
compare :: Ord a => a -> a -> Ordering
```


Kiểu `Bool` chỉ có 2 giá trị (`True` và `False`),
Còn kiểu `Ordering` 3 giá trị: `LT` (nhỏ hơn), `EQ`
(bằng), và `GT` (lớn hơn).



Ví dụ:


``` {.haskell}
compare 4 9         -- LT (4 is lesser than 9)

'f' `compare` 'e'   -- GT ('f' is greater than 'e')

True `compare` True -- EQ ( True is equal to True)
```

Một lần nữa, cho đến nay, tất cả các kiểu chúng ta đã học đều là thể hiện của kiểu lớp này (ngoại trừ các hàm).


Bây giờ, bạn có thể nói: "Nếu tôi có thể kiểm tra kiểu `EQ`  kiểu `Ord`, tại sao tôi cần kiểu lớp `Eq`?"

Đôi khi một kiểu trước hết phải là một thể hiện của một lớp kiểu này thì mới được phép trở thành một thể hiện của một kiểu khác. Giống như bạn phải tham gia câu lạc bộ vẽ nguệch ngoạc để được phép đăng ký vào câu lạc bộ vẽ.

Đó là trường hợp của `Eq` và `Ord`.

Để sắp xếp thứ tự các giá trị của một kiểu, đối với người mới bắt đầu, bạn phải biết liệu chúng có bằng nhau hay không. Điều này cho chúng tôi biết rằng nếu chúng tôi có một loại là một thể hiện của `Ord`, thì nó cũng hỗ trợ tất cả các hành vi `Eq`! Trong những trường hợp này, ta nói đó là  `Eq` lớp cha của `Ord`(ngược lại, `Ord`là lớp con của `Eq`).


Một lần nữa, bạn không cần phải ghi nhớ tất cả những điều này. Ban đầu, bạn sẽ có thể nhanh chóng kiểm tra nó và với một chút thời gian, bạn sẽ thuộc lòng tất cả các hành vi và phân lớp.

Một cái gì đó tương tự xảy ra với `Num`.



### Lớp kiểu `Num`

Các kiểu số  (Num) là một trong những kiểu được sử dụng nhiều nhất trong bất kỳ ngôn ngữ lập trình nào. Nhưng không phải tất cả các kiểu số đều có thể làm những việc giống nhau. 

Các kiểu này là thể hiện của lớp kiểu `Num` có thể hoạt động giống như các số. Nhưng không giống như một tập hợp con số cụ thể. Lớp kiểu `Num` xác định hành vi mà tất cả các số nên có.


Ví dụ: các kiểu là thể hiện của lớp kiểu có thể được cộng, trừ hoặc nhân (trong số những thứ khác):


``` {.haskell}
(+) :: Num a => a -> a -> a

(-) :: Num a => a -> a -> a

(*) :: Num a => a -> a -> a
```



Ví dụ:


``` {.haskell}
5 - 1      -- 4

8.9 + 0.1  -- 9.0

'a' - 'b'  -- ERROR! Char is not an instance of Num!
```

Bây giờ chúng ta nói chuyện! Hãy tưởng tượng tôi muốn tạo một hàm thực hiện một số phép toán:


``` {.haskell}
add1 x = x + 1
```

Tôi không muốn chọn một kiểu củ thể như `Int` và chỉ cho phép các giá trị `Int`. `Float`, `Double`và `Integer` có thể hoạt động hoàn toàn tốt! Nhưng, nếu không có ràng buộc, tôi có thể vượt qua bất kỳ kiểu nào! Kết quả của `'a' + 'b'` là gì? Hay `True + False`? Nó không có ý nghĩa gì cả!

Vì chỉ những kiểu là thể hiện của lớp kiểu `Num` mới có thể sử dụng `+`, và bởi vì `Float`, `Double`, `Int` và `Integer` tất cả đều là thể hiện của `Num`, nên chúng ta có thể hạn chế hàm của mình như sau:


``` {.haskell}
add1 :: Num a => a -> a
add1 x = x + 1
```

Nhưng hãy nhớ rằng nếu bạn không chắc chắn về chữ ký kiểu, hãy hỏi trình biên dịch! Nó biết rằng để sử dụng `+`, bạn phải là một thể hiện của kiểu `Num`, vì vậy nó sẽ tự động suy ra chữ ký kiểu của `add1`! Cung cấp sự linh hoạt và bảo vệ chúng tôi cùng một lúc.

Điều này thật tuyệt. Nhưng, đôi khi, chúng ta cần một cái gì đó cụ thể hơn.


### Lớp kiểu `Integral` 


Lớp kiểu `Num` bao gồm tất cả các số. Nhưng lớp kiểu `Integral` chỉ các số nguyên. Như  `4`, nhưng không phải là `4.3`.



`Integral` là cái gì đó đặc biệt hơn `Num`. Trong số tất cả các kiểu chúng ta đã thấy cho đến nay, chỉ có `Int` và `Integer` thuộc về nó.

Lớp kiểu này định nghĩa nhiều hành vi, một trong những hàm `Integral`nổi tiếng nhất là `div`.


``` {.haskell}
div :: Integral a => a -> a -> a
```

Nó nhận hai giá trị của một kiểu là một thể hiện của `Integral` và chia chúng, chỉ trả về toàn bộ phần của phép chia.

Ví dụ:


``` {.haskell}
3 `div` 5    -- 0

div 5 2      -- 2
```



Và ngược lại chúng ta có lớp kiểu `Fractional`



### Lớp kiểu `Fractional` 


Lớp kiểu `Fractional` là tất cả về số phân số. Các kiểu là thể hiện của lớp kiểu `Fractional` có thể biểu diễn và sửa đổi các giá trị phân số.

Cho đến nay, chức năng được sử dụng nhiều nhất mà các thể hiện của lớp kiểu `Fractional` là `/`


``` {.haskell}
(/) :: Fractional a => a -> a -> a
```

Không giống như div, chúng ta có thể chính xác hơn về các giá trị của mình vì chúng ta đang sử dụng các số phân số. Và chỉ `Float` và `Double` là các thể hiện của lớp kiểu này.

Ví dụ:


``` {.haskell}
10 / 5  -- 2.0

5  / 2  -- 2.5

10 / 3  -- 3.3333333333333335
```

Lưu ý rằng chúng ta chưa bao giờ phải chỉ định kiểu giá trị số trong bất kỳ ví dụ nào cho đến nay. Đó là bởi vì, ví dụ, số 3 có thể là một giá trị thuộc loại `Int`, `Integer`, `Float`, `Double` và bằng cách áp dụng một số hàm nhất định, chẳng hạn như `/`, trình biên dịch có thể hiểu rằng chúng ta muốn nói đến giá trị `3` thuộc về một trong các loại là thể hiện của `Fractional`.



``` {.haskell}
:t (10/3) -- (10/3) :: Fractional a => a
```



### Lớp kiểu `Show` 


Lớp kiểu `Show` được sử dụng để chuyển đổi các giá trị thành `Strings` có thể đọc được. Nó có 3 hành vi khác nhau, nhưng hành vi bạn sẽ thấy đi xem lại là hàm `show`:



``` {.haskell}
show :: Show a => a -> String
```

Hàm `show` trả về một `String` đại diện của bất kỳ kiểu nào là một thể hiện của lớp kiểu `Show`.

Ví dụ:

``` {.haskell}
show (3 :: Int) -- "3"

show True       -- "True"
```



*Điều này thực sự hữu ích cho việc gỡ lỗi và in nhật ký.*



### Lớp kiểu `Read`

Lớp kiểu `Read` cung cấp hành vi ngược lại của lớp kiểu `Show`. Có nghĩa là nó nhận một `String` và trả về một giá trị thuộc loại chúng ta yêu cầu, nếu có thể. Hành vi thường được sử dụng nhất là hàm `read`:


``` {.haskell}
read :: Read a => String -> a 
```

Ví dụ:



``` {.haskell}
read "3" / 2  -- 1.5

read "True" || False  -- True

read "[1,2,3]" :: [Int]  -- [1,2,3]
```

Hãy nhớ rằng nếu hàm `String` không chứa giá trị hợp lệ hoặc hàm `read`  không biết kiểu cần trả về, thì nó sẽ đưa ra một ngoại lệ:


``` {.haskell}
read "3" -- Doesn't know which numeric type. Exception.

read "Turue" :: Bool -- "Turue" is not a valid Bool value. Exception.
```



Bạn có thể tìm thấy mô tả chi tiết về một lớp kiểu nếu bạn tìm kiếm nó trên Hoogle: <https://hoogle.haskell.org/>.



Bây giờ, chúng ta hãy xem trình biên dịch suy ra các kiểu như thế nào.



## Loại hợp lệ chung nhất



Chữ ký của hàm này là gì?

``` {.haskell}
fToC x = (x - 32)*5/9
```



Hàm `fToC` có thể có một vài kiểu khác nhau. Ví dự: `fToC :: Float -> Float`.

Tuy nhiên, trong khi thực hiện suy luận kiểu, trình biên dịch không giả định gì và hạn chế kiểu của hàm càng ít càng tốt. Cung cấp cho bạn ràng buộc chung nhất.

Hãy làm điều đó từng bước một.

Vì vậy, trong trường hợp này, hàm nhận một giá trị và trả về một giá trị. Vì vậy, chữ ký chung nhất sẽ là một:



``` {.haskell}
fToC :: a -> a  -- Intermediate step
```

Tuy nhiên, giá trị nó nhận phải là một kiểu số (chúng tôi đang áp dụng một số hàm toán học. `-`, `*`, and `/`).

Nhưng loại nào? `Num` (vì là `-` và `*`) hoặc `Fractional` (vì là `/`)?

Trong trường hợp này, tất cả các kiểu số là một phần của `Num`, nhưng chỉ `Float` và `Double` là một phần của `Fractional`. Vì vậy, để đảm bảo hàm này luôn hoạt động, nó phải nhận loại hạn chế nhất, nghĩa là `Fractional`:


``` {.haskell}
fToC :: Fractional a => a -> a
```

Và đó là cách trình biên dịch suy ra kiểu của biểu thức. Lưu ý rằng thậm chí kiểu có thể cụ thể hơn, như `Float -> Float` hoặc `Double -> Double`. Nhưng điều đó sẽ giả định rằng bạn cần một kiểu hạn chế hơn mà không có sẵn.

và cuối cùng, kiểu hợp lệ chung nhất sẽ thắng.

Ok, vì vậy, cho đến bây giờ, chúng ta đã hạn chế nếu kiểu đó là một thể hiện của một lớp kiểu cụ thể. Và chúng ta biết có thể có nhiều lớp kiểu chuyên biệt hơn (`Fractional` là kiểu chuyên biệt hơn kiêur `Num`).

Nhưng nếu chúng ta cần một kiểu có phần mở rộng . .. tập hợp các khả năng cụ thể?



## Nhiều ràng buộc

Đôi khi bạn cần các ràng buộc khác nhau cho các biến kiểu khác nhau.

Hoặc biến cùng kiểu với nhiều ràng buộc. Tất cả điều này có thể dễ dàng thể hiện trong Haskell.


### Nhiều ràng buộc cho biến cùng kiểu


Thực hiện hàm này bỏ qua số 3:


``` {.haskell}
skip3 x = if x == 3 then x+1 else x
```
Kiểu `x` có thể là bất kỳ thể hiện nào của `Eq`(vì `==`) và `Num`(vì `+` và vì chúng ta đang so sánh đầu vào với giá trị `3` thuộc về  kiểu `Num`).

Để chỉ định nhiều ràng buộc cho cùng một biến kiểu, chúng ta phải bao quanh chúng bằng dấu ngoặc đơn và thêm dấu phẩy giữa chúng.

Giống như nếu họ là một tuple:


``` {.haskell}
skip3 :: (Eq p, Num p) => p -> p
```

Bây giờ, pbiến kiểu phải là kiểu thể hiện của cả hai `Eq` và `Num`. Và, tất nhiên, chúng ta có thể thêm nhiều ràng buộc hơn nếu cần.


### Ràng buộc cho nhiều loại biến

Hãy tạo một hàm nhận hai giá trị và trả về `1`nếu giá trị đầu tiên lớn hơn giá trị thứ hai và `0` nếu ngược lại:


``` {.haskell}
isXBigger x y = if x > y then 1 else 0
```

Trong trường hợp này, `x` và `y` phải là phiên bản của `Ord`. Và giá trị trả về là một số thuộc kiểu không xác định, do đó, đây là `Num` trường hợp tổng quát hơn.

Đặt cái này lại với nhau, chữ ký kiểu sẽ là:


``` {.haskell}
isXBigger :: (Ord a, Num p) => a -> a -> p
```

Bây giờ, chúng ta hãy thực hành một chút. Điều gì về hàm này?:


``` {.haskell}
mistery1 x y z = if x > y then z/2 else z
```

Chúng ta so sánh `x` và `y` với hàm `>` , vì vậy chúng phải là thể hiện của lớp kiểu `Ord`.

Và giá trị trả về được chia bằng cách sử dụng `/` một trong các đường dẫn if-else. Vì vậy, `z` phải là `Fractional`.



``` {.haskell}
mistery1 :: (Ord a, Fractional p) => a -> a -> p -> p
```

Và ví dụ cuối cùng của chúng ta là một sửa đổi về `mistery1` nơi chúng ta thêm `1` vào `x` trước khi so sánh nó với `y`:



``` {.haskell}
mistery2 x y z = if x+1 > y then z/2 else z
```

Giống như trước. Nhưng bây giờ `x` và `y` cũng phải là một ví dụ `Num` để có thể sử dụng `+`:

``` {.haskell}
mistery2 :: (Ord a, Num a, Fractional p) => a -> a -> p -> p
```


Như bạn có thể thấy, **chúng ta có thể áp dụng bao nhiêu ràng buộc nếu cần .**

As you can see, **we can apply as many constraints as needed**.

Tất nhiên, hàng ngày, trình biên dịch có thể suy ra chúng cho bạn (hầu hết thời gian). Nhưng bạn vẫn sẽ phải nhận thức được những gì đang diễn ra để diễn giải và hiểu chúng một cách chính xác. Ngoài ra, viết kiểu của một hàm trước khi xác định nó là một cách thực hành tốt và là một cách tuyệt vời để giảm bớt quá trình xác định nó sau này.

