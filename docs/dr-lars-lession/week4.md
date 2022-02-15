Week 04 - Monads
================


Đây là phiên bản viết của Bài [giảng số
4 Dr. Lars](https://youtu.be/HLJOcKlEucI).

<iframe width="100%" height="400" src="https://www.youtube.com/embed/HLJOcKlEucI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Trong bài giảng này, chúng ta tìm hiểu về Monad (Monads). Đặc biệt là các Monads EmulatorTrace và Contract..

Tổng quat 
---------

Chúng tôi đã dành hai bài giảng cuối cùng để nói về phần on-chain của
Plutus - logic xác thực được biên dịch thành tập lệnh Plutus và thực sự chạy trên blockchain và được thực hiện bởi các nút xác thực giao dịch.

Còn rất nhiều điều để nói về bộ phận on-chain đó.

Chúng tôi chưa xem xét các ví dụ phức tạp hơn về xác thực sử dụng `Context` phức tạp hơn và chúng tôi chưa thấy cách token gốc hoạt động như thế nào (tập lệnh Plutus cũng được sử dụng để xác thực việc đúc và đốt token gốc).

Chúng ta chắc chắn sẽ phải nói về những chủ đề đó, và quay lại vấn đề
đó.

Tuy nhiên, trước khi đi vào quá nhiều chủ đề phức tạp về xác thực on-chain, chúng ta không được bỏ qua phần off-chain, vì nó cũng quan
trọng không kém.

Phần on-chain đảm nhận việc xác thực nhưng để có thứ gì đó được xác
thực, chúng ta phải xây dựng một giao dịch và gửi nó lên blockchain. Và, đó là những gì phần off-chain thực hiện.

Vì vậy, chúng ta sẽ bắt đầu nói về cách viết mã Plutus off-chain.

Thật không may, có một vấn đề nhỏ liên quan đến các tính năng Haskell
cần thiết.

Phần on-chain mà chúng ta đã thấy cho đến nay hơi xa lạ và cần làm quen một chút, do thực tế là chúng ta có thêm sự phức tạp của quá trình biên dịch sang tập lệnh Plutus. Nhưng, chúng ta không thực sự phải lo lắng về điều đó nếu chúng ta sử dụng Template Haskell. Trong trường hợp đó, hàm xác nhận chỉ là một hàm đơn giản.

Và nó thực sự là một hàm Haskell rất đơn giản theo quan điểm kỹ thuật. Chúng tôi không sử dụng bất kỳ tính năng Haskell ưa thích nào để viết hàm này.

Một trong những lý do cho điều đó là cách thức hoạt động của quá trìn 
biên dịch Plutus. Chúng tôi đã thấy làm thế nào để việc biên dịch sang Plutus thành công, tất cả mã được sử dụng bởi hàm xác nhận phải có sẵn trong Oxford Brackets. Điều này có nghĩa là tất cả các hàm được sử dụng bởi hàm `mkValidator` phải sử dụng pragma `INLINABLE`.

``` {.haskell}
{-# INLINABLE mkValidator #-}
mkValidator :: Data -> Data -> Data -> ()
mkValidator _ _ _ = ()

$$(PlutusTx.compile [|| mkValidator ||])
```

Và hãy nhớ lại rằng vì các hàm Haskell tiêu chuẩn không có pragma `INLINABLE` này, nên có một mô-đun Plutus.Prelude mới tương tự như Haskell Prelude tiêu chuẩn, nhưng với các hàm được xác định với pragma `INLINABLE`.

Nhưng, tất nhiên, có hàng trăm thư viện Haskell ngoài kia và hầu hết
chúng không được viết với Plutus, vì vậy chúng tôi không thể sử dụng
chúng trong quá trình xác thực. Và, điều đó có tác dụng là xác thực bên trong Haskell sẽ tương đối đơn giản và sẽ không có nhiều phụ thuộc.

Monads
------

Trong phần off-chain của Plutus, tình hình đã đảo ngược. Chúng ta không phải lo lắng về việc biên dịch sang tập lệnh Plutus - nó chỉ là Haskell đơn giản. Tuy nhiên, mặt trái của nó là, cách nó được thực hiện, nó sử dụng các tính năng Haskell phức tạp hơn nhiều - ví dụ như cái gọi là hệ thống hiệu ứng, phát trực tuyến và đặc biệt là Monads.

Tất cả mã off-chain (mã ví), được viết bằng một Monad đặc biệt -
hợp đồng Monad.

Các Monads nổi tiếng trong thế giới Haskell. Đây thường là trở ngại đầu tiên khi bắt đầu lập trình Haskell.

Có rất nhiều hướng dẫn cố gắng giải thích các Monads. Monads được so
sánh với burritos, và tất cả các loại ẩn dụ được sử dụng để cố gắng giải thích khái niệm. Nhưng ở đây, ít nhất chúng ta hãy cố gắng cung cấp một khóa học cơ bản về Monads cho những người mới sử dụng Haskell.

Trước khi đến với các Monad chung, chúng ta sẽ bắt đầu với IO , đó
là cách xử lý các tác dụng của IO trong Haskell. Tuy nhiên, trước
khi đến với Haskell, chúng ta hãy xem xét một ngôn ngữ chính thống như Java.

Hãy xem xét phương pháp Java sau đây.

``` {.java}
public static int foo() {
   ...
}
```

Hàm này không có đối số và nó trả về `int`. Hãy tưởng tượng nó được gọi hai lần trong mã.

``` {.java}
...
final int a = foo();
...
final int b = foo();
```

Bây giờ, chúng ta lưu ý rằng, chừng nào chúng ta không biết điều gì đang xảy ra bên trong hàm foo(), thì giá trị trả về của biểu thức sau là không xác định.

``` {.java}
a == b; // true or false? at compile time, we don't know
```

Chúng tôi không biết `a` giống như `b` vậy không vì trong Java, hoàn
toàn có thể xảy ra một số IO bên trong `foo`. Ví dụ: có mã là mã yêu cầu người dùng nhập đầu vào trên bảng điều khiển và sử dụng mã này để tính toán giá trị trả về.

Điều này có nghĩa là, để lập luận về mã, chúng ta cần phải nhìn vào bên trong `foo`, điều này làm cho việc thử nghiệm trở nên khó khăn hơn. Và nó có nghĩa là ví dụ `foo` , đó là lệnh gọi trả về đầu tiên `13`- chúng ta không thể thay thế tất cả các lệnh gọi khác đến `foo` bằng giá trị trả về đã biết của `13`.

Ở Haskell, tình hình rất khác vì Haskell là một ngôn ngữ hàm thuần túy. Chữ ký tương đương trong Haskell sẽ giống như sau:

``` {.haskell}
foo :: Int
foo = ...
```

Bây giờ, nếu chúng ta gặp trường hợp chúng ta gọi `foo` hai lần, mặc dù chúng ta không biết giá trị của `foo` là gì, chúng ta biết chắc rằng hai giá trị trả về sẽ giống nhau.

Đây là một tính năng rất quan trọng được gọi là tính minh bạch tham
chiếu. Trên thực tế, có một số cách để giải quyết vấn đề này, nhưng chúng ta có thể bỏ qua điều này.

Điều này làm cho các tác vụ như tái cấu trúc và kiểm tra dễ dàng hơn
nhiều.

Điều này là rất tốt, nhưng bạn cần có side-effects để có ảnh hưởng đến thế giới. Nếu không, tất cả những gì chương trình của bạn làm chỉ làm nóng bộ xử lý.

Bạn cần đầu vào và đầu ra. Bạn phải có khả năng ghi kết quả đầu ra ra
màn hình, hoặc đọc đầu vào từ bàn phím, kết nối mạng hoặc tệp, chẳng
hạn.

Có một [video nổi tiếng của Simon Peyton-Jones là Haskell Is
Useless](https://www.youtube.com/watch?v=iSmkqocn0oQ) giải thích rằng
ngôn ngữ thuần túy, không có tác dụng thì rất đẹp về mặt toán học,
nhưng cuối cùng thì bạn cũng cần có side-effects để biến bất cứ điều gì xảy ra.

Và Haskell có một cách để xử lý các side-effects và đó là `Monad IO`.
Tuy nhiên, đừng lo lắng về phần `Monad`.

Đây là cách chúng tôi làm điều đó trong Haskell.

``` {.haskell}
foo :: IO Int
foo = ...
```

`IO` là một phương thức khởi tạo kiểu nhận một đối số, giống như một số ví dụ khác về các hàm tạo kiểu như `Maybe` and `List` . Tuy nhiên, không giống như những ví dụ đó, `IO` đặc biệt, theo nghĩa là bạn không thể triển khai nó bằng chính ngôn ngữ. Nó là một nguyên thủy được tích hợp sẵn.

Giá trị trả về `IO Int` cho chúng ta biết rằng đây là một công thức để tính `Int` và công thức này có thể gây ra các phản ứng phụ. Một danh sách các hướng dẫn cho máy tính biết phải làm gì để kết thúc với một `Int` .

Điều quan trọng cần lưu ý là tính minh bạch của tham chiếu không bị phá vỡ ở đây. Kết quả đánh giá `foo` là chính công thức, không phải giá trị `Int`. Và vì công thức luôn giống nhau, nên tính minh bạch của tham chiếu được duy trì.

Cách duy nhất để thực sự thực hiện một công thức như vậy trong chương
trình Haskell là từ điểm nhập chính của chương trình - hàm chính . Bạn cũng có thể thực hiện các hành động `IO` trong REPL.

### Hello World

`Hello World` trong Haskell trông như thế này:

``` {.haskell}
main :: IO ()
main = putStrLn "Hello, world!"
```

Ở đây, `main` là một công thức thực hiện một số tác dụng và trả về
`Unit` - `Nothing`.

Hãy xem `putStrLn` trong REPL. Chúng tôi thấy rằng đó là một hành động `IO` sử dụng `String` và không trả về kết quả thú vị nào.

``` {.haskell}
Prelude Week04.Contract> :t putStrLn
putStrLn :: String -> IO ()

Prelude Week04.Contract> :t putStrLn "Hello, world!"
putStrLn "Hello, world!" :: IO ()
```

Chúng tôi cũng có thể chạy điều này. Mở ứng dụng /Main.sh và chỉnh
sửa hàm chính để nó đọc:

``` {.haskell}
main :: IO ()
main = putStrLn "Hello, world!"
```

Sau đó chạy

``` {.bash}
cabal run hello
```

Chúng ta sẽ xem xét nhanh tệp cabal ngay bây giờ.

Trong các bài giảng trước, chúng ta chỉ cần phần thư viện `library`
trong tệp `plutus-pioneer-program-week04.cabal` vì chúng ta chỉ xử lý
các hàm thư viện. Bây giờ, chúng ta cần thêm một đoạn code sau có thể thực thi được .

``` {.cabal}
executable hello
hs-source-dirs:      app
main-is:             hello.hs
build-depends:       base ^>=4.14.1.0
default-language:    Haskell2010
ghc-options:         -Wall -O2
```

Điều này chỉ định thư mục nguồn và tệp nào giữ hàm chính. Thông
thường tên tệp phải khớp với tên mô-đun, nhưng `main` là một ngoại lệ.

Thay vì chỉ yêu cầu loại `putStrLn` , chúng ta có thể chạy nó trong
REPL. Như đã đề cập, REPL cho phép chúng ta thực hiện các hành động IO.

``` {.haskell}
Prelude Week04.Contract> putStrLn "Hello, world!"
Hello, world!
```

### getLine

Hãy xem `getLine`

``` {.haskell}
Prelude Week04.Contract> :t getLine
getLine :: IO String
```

Điều này cho thấy rằng đó là một công thức, có thể tạo ra các hiệu ứng phụ, khi được thực thi sẽ tạo ra một Chuỗi . Trong trường hợp `getLine`, side-effect được đề cập là nó sẽ đợi người dùng nhập từ bàn phím.

Nếu chúng ta thực thi `getLine` trong REPL.

``` {.haskell}
Prelude Week04.Contract> getLine
```

Nó chờ nhập bàn phím. Sau đó, nếu chúng ta nhập một cái gì đó, nó sẽ trả về kết quả.

``` {.haskell}
Haskell
"Haskell"
```

Có một loạt các hành động IO được định nghĩa trong Haskell để thực hiện tất cả các loại như đọc tệp, ghi tệp, đọc và ghi vào sockets.

Nhưng cho dù bạn có bao nhiêu hành động được xác định trước, điều đó sẽ không bao giờ là đủ để đạt được điều gì đó phức tạp, vì vậy cần phải có cách để kết hợp các hành động IO nguyên thủy này thành những công thức lớn hơn, phức tạp hơn.

Một điều chúng ta có thể làm là sử dụng phiên bản kiểu `Functor` của `IO`. Hãy xem xét các trường hợp loại của `IO` trong REPL.

``` {.haskell}
Prelude Week04.Contract> :i IO
type IO :: ` -> `
newtype IO a
= ghc-prim-0.6.1:GHC.Types.IO (ghc-prim-0.6.1:GHC.Prim.State#
                                 ghc-prim-0.6.1:GHC.Prim.RealWorld
                                 -> (# ghc-prim-0.6.1:GHC.Prim.State#
                                       ghc-prim-0.6.1:GHC.Prim.RealWorld,
                                       a #))
   -- Defined in ‘ghc-prim-0.6.1:GHC.Types’
instance Applicative IO -- Defined in ‘GHC.Base’
instance Functor IO -- Defined in ‘GHC.Base’
instance Monad IO -- Defined in ‘GHC.Base’
instance Monoid a => Monoid (IO a) -- Defined in ‘GHC.Base’
instance Semigroup a => Semigroup (IO a) -- Defined in ‘GHC.Base’
instance MonadFail IO -- Defined in ‘Control.Monad.Fail’
```

Chúng ta thấy cá thể `Monad` đáng sợ , nhưng chúng ta cũng thấy một cá thể `Functor`. `Functor` là một loại lớp rất quan trọng trong Haskell.
Nếu chúng ta nhìn vào nó trong REPL:

``` {.haskell}
Prelude Week04.Contract> :i Functor
type Functor :: (` -> `) -> Constraint
class Functor f where
fmap :: (a -> b) -> f a -> f b
(<$) :: a -> f b -> f a
{-# MINIMAL fmap #-}
   -- Defined in ‘GHC.Base’
instance Functor (Either a) -- Defined in ‘Data.Either’
instance Functor [] -- Defined in ‘GHC.Base’
instance Functor Maybe -- Defined in ‘GHC.Base’
instance Functor IO -- Defined in ‘GHC.Base’
instance Functor ((->) r) -- Defined in ‘GHC.Base’
instance Functor ((,,,) a b c) -- Defined in ‘GHC.Base’
instance Functor ((,,) a b) -- Defined in ‘GHC.Base’
instance Functor ((,) a) -- Defined in ‘GHC.Base’
```

Phương pháp quan trọng ở đây là `fmap`. Hàm thứ hai (<$) là một hàm
tiện lợi.

``` {.haskell}
fmap :: (a -> b) -> f a -> f b
```

Hàm này `fmap` , mà tất cả `Functor` có cho chúng ta biết rằng, nếu
chúng ta cấp cho nó quyền truy cập vào một hàm có thể biến `a` thành `b` , thì nó có thể biến `fa` thành `fb`. Ở đây, chúng ta quan tâm
đến trường hợp `f` là `IO` .

Nếu chúng ta chuyên biệt hóa hàm cho `IO` , chúng ta sẽ có một hàm như:

``` {.haskell}
fmap' :: (a -> b) -> IO a -> IO b
```

Làm thế nào để làm việc đó. À, `IO a` là một công thức có tác dụng
và tạo ra `a`. Vì vậy, làm thế nào để chúng ta có được một `b` trong số đó? Chúng tôi thực hiện công thức, nhưng, trước khi trả về `a`, chúng tôi áp dụng hàm `(a -> b)` cho `a` và trả về kết quả là `b` .

Trong REPL, chúng ta hãy xem xét hàm `toUpper` .

``` {.haskell}
Prelude Week04.Contract> import Data.Char
Prelude Data.Char Week04.Contract> :t toUpper
toUpper :: Char -> Char
Prelude Data.Char Week04.Contract> toUpper 'q'
'Q'
```

Nếu chúng ta muốn áp dụng được cho một chuỗi chứ không phải là một `Char` chúng ta có thể sử dụng bản đồ hàm. Các chuỗi `String` trong Haskell chỉ là các `Char`.

``` {.haskell}
Prelude Data.Char Week04.Contract> map toUpper "Haskell"
"HASKELL"
```

Hàm `map toUpper` là một hàm chuyển từ `String` to `String`.

``` {.haskell}
Prelude Data.Char Week04.Contract> :t map toUpper
map toUpper :: [Char] -> [Char]
```

Và chúng ta có thể sử dụng kết hợp với `fmap`. Nếu chúng ta sử dụng `map toUpper` làm hàm chuyển đổi `a` thành `b` , chúng ta có thể thấy loại đầu ra của `fmap` sẽ như thế nào khi áp dụng cho `IO a`.

``` {.haskell}
Prelude Data.Char Week04.Contract> :t fmap (map toUpper) getLine
fmap (map toUpper) getLine :: IO [Char]
```

Hãy xem nó trong hành động.

``` {.haskell}
Prelude Data.Char Week04.Contract> fmap (map toUpper) getLine
haskell
"HASKELL"
```

Chúng ta cũng có thể sử dụng toán tử `>>`. Điều này chuỗi hai hành
động `IO` lại với nhau, bỏ qua kết quả của hành động đầu tiên. Trong ví dụ sau, cả hai hành động sẽ được thực hiện theo trình tự.

``` {.haskell}
Prelude Week04.Contract> putStrLn "Hello" >> putStrLn "World"
Hello
World
```

Ở đây, không có kết quả từ `putStrLn`, nhưng nếu có, nó sẽ bị bỏ qua. Các tác dụng không mong muốn của nó sẽ được thực hiện, kết quả của nó bị bỏ qua, sau đó các tác dụng không mong muốn thứ hai của `putStrLn` sẽ được thực hiện trước khi trả về kết quả của lần gọi thứ hai.

Sau đó, có một toán tử quan trọng không bỏ qua kết quả của hành động `IO` đầu tiên , và đó được gọi là ràng buộc . Nó được viết dưới dạng ký hiệu `>>=` .

``` {.haskell}
Prelude Week04.Contract> :t (>>=)
(>>=) :: Monad m => m a -> (a -> m b) -> m b
```

Chúng tôi thấy ràng buộc `Monad` , nhưng chúng tôi có thể bỏ qua điều đó ngay bây giờ và chỉ nghĩ về `IO` .

Điều này nói lên rằng nếu tôi có một công thức thực hiện các tác dụng sau đó cho tôi kết quả `a`, và cho rằng tôi có một hàm nhận `a` và trả lại cho tôi một công thức trả về `b` , thì tôi có thể kết hợp công thức `m a`. với công thức `mb` bằng cách lấy giá trị `a` và sử dụng nó trong công thức thu được giá trị `b` .

Một ví dụ sẽ làm rõ điều này.

``` {.haskell}
Prelude Week04.Contract> getLine >>= putStrLn
Haskell
Haskell
```

Ở đây, hàm `getLine`  có kiểu `IO String` . Giá trị trả về `a` được chuyển cho hàm `(a -> m b)` , sau đó tạo ra một công thức `putStrLn` với giá trị đầu vào là `a` và đầu ra là kiểu `IO ()` . Sau đó, `putStrLn` thực hiện các tác dụng của nó và trả về `Unit` .

Có một cách khác, rất quan trọng, để tạo các hành động `IO` , và đó là tạo các công thức  ngay lập tức trả về kết quả mà không thực hiện bất kỳ tác dụng nào.

Điều đó được thực hiện với một hàm được gọi là `return`.

``` {.haskell}
Prelude Week04.Contract> :t return
return :: Monad m => a -> m a
```

Một lần nữa, nó là chung cho bất kỳ `Monad` nào, chúng ta chỉ cần nghĩ về `IO` ngay bây giờ.

Nó nhận một giá trị `a` và trả về một công thức tạo ra giá trị `a` . Trong trường hợp trả lại, công thức thực sự không tạo ra bất kỳ tác dụng nào.

Ví dụ:

``` {.haskell}
Prelude Week04.Contract> return "Haskell" :: IO String
"Haskell"
```

Chúng tôi cần chỉ định kiểu trả về để REPL biết chúng tôi đang sử dụng `Monad` nào: 

``` {.haskell}
Prelude Week04.Contract> :t return "Haskell" :: IO String
return "Haskell" :: IO String :: IO String

Prelude Week04.Contract> :t return "Haskell"
return "Haskell" :: Monad m => m [Char]
```

Nếu bây giờ chúng ta quay lại `main` của mình, bây giờ chúng ta có thể viết các hành động `IO`  tương đối phức tạp . Ví dụ, chúng ta có thể xác định một hành động `IO`  sẽ yêu cầu hai chuỗi và in kết quả của việc nối hai chuỗi đó với bảng điều khiển.

``` {.haskell}
main :: IO ()
main = bar

bar :: IO ()
bar = getLine >>= \s ->
      getLine >>= \t ->
      putStrLn (s ++ t)
```

Và sau đó, khi chúng tôi chạy nó, chương trình sẽ đợi hai đầu vào và sau đó xuất ra kết quả được nối.

``` {.bash}
cabal run hello
one
two
onetwo
```
Bây giờ điều này là đủ cho các mục đích của chúng tôi, mặc dù chúng tôi sẽ không cần `IO Monad` cho đến khi có lẽ sau này trong khóa học khi chúng tôi nói về việc thực sự triển khai các hợp đồng Plutus. Tuy nhiên, `IO Monad` là một ví dụ quan trọng và là một ví dụ tốt để bắt đầu.

Vì vậy, hiện tại, chúng ta hãy hoàn toàn quên `IO` và chỉ viết Haskell thuần túy, có hàm, sử dụng kiểu `Maybe` .

### Maybe

Kiểu `Maybe`  là một trong những loại hữu ích nhất trong Haskell.

``` {.haskell}
Prelude Week04.Contract> :i Maybe
type Maybe :: ` -> `
data Maybe a = Nothing | Just a
   -- Defined in ‘GHC.Maybe’
instance Applicative Maybe -- Defined in ‘GHC.Base’
instance Eq a => Eq (Maybe a) -- Defined in ‘GHC.Maybe’
instance Functor Maybe -- Defined in ‘GHC.Base’
instance Monad Maybe -- Defined in ‘GHC.Base’
instance Semigroup a => Monoid (Maybe a) -- Defined in ‘GHC.Base’
instance Ord a => Ord (Maybe a) -- Defined in ‘GHC.Maybe’
instance Semigroup a => Semigroup (Maybe a)
-- Defined in ‘GHC.Base’
instance Show a => Show (Maybe a) -- Defined in ‘GHC.Show’
instance Read a => Read (Maybe a) -- Defined in ‘GHC.Read’
instance Foldable Maybe -- Defined in ‘Data.Foldable’
instance Traversable Maybe -- Defined in ‘Data.Traversable’
instance MonadFail Maybe -- Defined in ‘Control.Monad.Fail’
```

Nó thường được gọi là `Optional` trong các ngôn ngữ lập trình khác.

Nó có hai hàm tạo `Nothing` - không nhận đối số và `Just` - có một đối số.

``` {.haskell}
data Maybe a = Nothing | Just a
```

Hãy xem một ví dụ.

Trong Haskell, nếu bạn muốn truyền `String` đến một giá trị có thể hiện `read` , bạn sẽ thường làm điều này với hàm `read` .


``` {.haskell}
Week04.Maybe> read "42" :: Int
42
```

Tuy nhiên, `read` hơi khó chịu, bởi vì nếu chúng ta có thứ gì đó không thể phân tích cú pháp thành `Int` , thì chúng ta sẽ gặp lỗi.

``` {.haskell}
Week04.Maybe> read "42+u" :: Int
*** Exception: Prelude.read: no parse
```

Hãy import `readMaybe` để làm điều đó theo cách tốt hơn.

``` {.haskell}
Prelude Week04.Maybe> import Text.Read (readMaybe)
Prelude Text.Read Week04.Contract>
```

Hàm `readMaybe` làm tương tự như `read`, nhưng nó trả về một `Maybe` và trong trường hợp nó không thể phân tích cú pháp, nó sẽ trả về một `Maybe` được tạo bằng phương thức khởi tạo `Nothing` .


``` {.haskell}
Prelude Text.Read Week04.Contract> readMaybe "42" :: Maybe Int
Just 42

Prelude Text.Read Week04.Contract> readMaybe "42+u" :: Maybe Int
Nothing
```

Giả sử chúng ta muốn tạo một hàm mới trả về a `Maybe`.

``` {.haskell}
    foo :: String -> String -> String -> Maybe Int
```

Ý tưởng là hàm nên cố gắng phân tích cú pháp cả ba `String` như là `Int`. Nếu tất cả các `String` có thể được phân tích cú pháp thành công thành `Int`, thì chúng ta muốn cộng ba `Int` đó để có được một tổng. Nếu một trong các phân tích cú pháp không thành công, chúng tôi muốn quay lại `Nothing`.

Một cách để làm điều đó sẽ là:

``` {.haskell}
foo :: String -> String -> String -> Maybe Int
foo x y z = case readMaybe x of
   Nothing -> Nothing
   Just k  -> case readMaybe y of
      Nothing -> Nothing
      Just l  -> case readMaybe z of
            Nothing -> Nothing
            Just m  -> Just (k + l + m)
```

Hãy xem nếu nó hoạt động. Đầu tiên, trường hợp thành công:

``` {.haskell}
Prelude Week04.Contract> :l Week04.Maybe 
Prelude Week04.Maybe> foo "1" "2" "3"
Just 6
```

Tuy nhiên, nếu một trong các giá trị không thể được phân tích cú pháp, chúng tôi nhận được `Nothing`:

``` {.haskell}
Prelude Week04.Maybe> foo "" "2" "3"
Nothing
```

Mã này không lý tưởng vì chúng ta lặp lại cùng một mẫu ba lần. Mỗi lần chúng ta phải xem xét hai trường hợp - kết quả của phép đọc là `Just` hoặc `Nothing`.

Trong Haskell ghét sự lặp lại như thế này.

Điều chúng tôi muốn làm rất đơn giản. Chúng tôi muốn vượt qua ba `Strings` và thêm kết quả, nhưng với tất cả những trường hợp đó, nó rất ồn và rất xấu. Chúng tôi muốn loại bỏ mô hình này.

Một cách để làm điều đó là xác định một cái gì đó như:

``` {.haskell}
bindMaybe :: Maybe a -> (a -> Maybe b) -> Maybe b
bindMaybe Nothing = Nothing
bindMaybe (Just x) f = f x
```

Hãy viết lại cùng một hàm bằng cách sử dụng `bindMaybe`.

``` {.haskell}
foo' :: String -> String -> String -> Maybe Int
foo' x y z = readMaybe x `bindMaybe` \k ->
            readMaybe y `bindMaybe` \l ->
            readMaybe z `bindMaybe` \m ->
            Just (k + l + m)
```

Và sau đó, trong REPL, chúng tôi nhận được kết quả tương tự `foo'`như chúng tôi đã nhận được `foo`.

``` {.haskell}
Prelude Week04.Maybe> foo "1" "2" "3"
Just 6

Prelude Week04.Maybe> foo "" "2" "3"
Nothing
```

Điều này thực hiện chính xác như `foo`, nhưng nó nhỏ gọn hơn nhiều, ít phức tạp hơn và logic rõ ràng hơn nhiều.

Nó có thể, hoặc có thể không, giúp xem hàm mà nó không được sử dụng với ký hiệu infix:

``` {.haskell}
Prelude Text.Read Week04.Maybe> bindMaybe (readMaybe "42" :: Maybe Int) (\x -> Just x)
Just 42
```

Ở đây bạn có thể thấy rõ ràng hàm `Maybe` và sau đó là hàm lấy `a` từ `Maybe` và sử dụng nó làm đầu vào cho một hàm trả về một `Maybe` mới.

Điều này tạo ra `Nothing` hữu ích, cho đến khi chúng tôi thêm `readMaybe`

``` {.haskell}
Prelude Text.Read Week04.Maybe> bindMaybe (readMaybe "42" :: Maybe Int) (\x -> bindMaybe (readMaybe "5" :: Maybe Int) (\y -> Just (y + x)))
Just 47
```

Theo một số cách `Nothing` thì hơi giống một ngoại lệ trong các ngôn ngữ khác. Nếu bất kỳ phép tính nào trả về  `Nothing`,  phần còn lại của phép tính trong khối không được thực hiện và  `Nothing` được trả về.

### Kiểu Either

Một kiểu rất hữu ích khác trong Haskell là kiểu `Either` .

``` {.haskell}
Prelude Week04.Contract> :i Either
type Either :: ` -> ` -> `
data Either a b = Left a | Right b
   -- Defined in ‘Data.Either’
instance Applicative (Either e) -- Defined in ‘Data.Either’
instance (Eq a, Eq b) => Eq (Either a b)
-- Defined in ‘Data.Either’
instance Functor (Either a) -- Defined in ‘Data.Either’
instance Monad (Either e) -- Defined in ‘Data.Either’
instance (Ord a, Ord b) => Ord (Either a b)
-- Defined in ‘Data.Either’
instance Semigroup (Either a b) -- Defined in ‘Data.Either’
instance (Show a, Show b) => Show (Either a b)
-- Defined in ‘Data.Either’
instance (Read a, Read b) => Read (Either a b)
-- Defined in ‘Data.Either’
instance Foldable (Either a) -- Defined in ‘Data.Foldable’
instance Traversable (Either a) -- Defined in ‘Data.Traversable’
```

`Either` nhận hai tham số `a` và `b`.  Giống như `Maybe` nó có hai hàm tạo, nhưng không giống như `Maybe` cả hai đều nhận một giá trị. Nó có thể `Either` là một `a` hoặc một là `b`. Hai hàm tạo là `Left` and `Right`.

Ví dụ:

``` {.haskell}
Prelude Week04.Contract> Left "Haskell" :: Either String Int
Left "Haskell"
```

hoặc

``` {.haskell}
Prelude Week04.Contract> Right 7 :: Either String Int
Right 7
```

Nếu chúng ta xem xét phép loại suy ngoại lệ xa hơn một chút, thì một vấn đề `Maybe` là nếu chúng ta quay trở lại `Nothing`, không có thông báo lỗi. Tuy nhiên, nếu chúng ta muốn một thứ gì đó đưa ra một thông điệp, chúng ta có thể thay thế `Maybe`bằng `Either`.

Trong trường hợp đó, `Right` có thể tương ứng với `Just` và `Left` có thể tương ứng với một lỗi, như `Nothing` đã làm. Tuy nhiên, tùy thuộc vào loại mà chúng tôi chọn cho `a`, chúng tôi có thể đưa ra các thông báo lỗi thích hợp.

Hãy định nghĩa một cái gì đó được gọi `readEither` và xem nó làm gì khi có thể và khi nào nó không thể phân tích cú pháp đầu vào của nó.

``` {.haskell}
readEither :: Read a => String -> Either String a
readEither s case readMaybe s of
   Nothing -> Left $ "can't parse: " ++ s
   Just a  -> Right a
```

``` {.haskell}
Prelude Week04.Either> readEither "42" :: Either String Int
Right 42
```

``` {.haskell}
Prelude Week04.Either> readEither "42+u" :: Either String Int
Left "can't parse: 42+u"
```

Sử dụng điều này, bây giờ chúng ta có thể viết lại `foo` bằng `Either`. Đầu tiên, sử dụng phương pháp dài dòng:

``` {.haskell}
foo :: String -> String -> String -> Either String Int
foo x y z = case readEither x of
   Left err -> Left err
   Right k  -> case readEither y of
      Left err -> Left err
      Right l  -> case readEither z of
            Left err -> Left err
            Right m  -> Right (k + l + m)
```

Hãy thử nó. Đầu tiên vẫn tốt:

``` {.haskell}
Prelude Week04.Either> foo "1" "2" "3"
Right 6
```

sau đó có vấn đề:

``` {.haskell}
Prelude Week04.Either> foo "ays" "2" "3"
Left "can't parse: ays"
```

Nhưng chúng tôi có cùng một vấn đề mà chúng tôi đã gặp phải `Maybe`; chúng tôi có rất nhiều sự lặp lại.

Giải pháp cũng tương tự.

``` {.haskell}
bindEither :: Either String a -> (a -> Either String b) -> Either String b
bindEither (Left err) _ = Left err
bindEither (Right x)  f = f x

foo' :: String -> String -> String -> Either String Int
foo' x y z = readEither x `bindEither` \k ->
            readEither y `bindEither` \l ->
            readEither z `bindEither` \m ->
            Right (k + l + m)
```

Bạn có thể chạy lại điều này trong REPL và nó sẽ hoạt động giống như phiên bản dài dòng của nó.

### Writer

Cho đến nay chúng tôi đã xem xét ba ví dụ: `IO a`, `Maybe a` và `Either String a`. `IO a` đại diện cho các kế hoạch có thể liên quan đến các tác dụng và khi được thực hiện, tạo ra một `a`. `Maybe a` và `Either String a` đại diện cho các phép tính có thể tạo ra  `a` nhưng cũng có thể thất bại. Sự khác biệt giữa `Maybe` và `Either` chỉ `Maybe` không tạo ra bất kỳ thông báo lỗi nào, nhưng  `Either` thì có.

Bây giờ chúng ta hãy xem xét một ví dụ hoàn toàn khác ghi lại ý tưởng về các phép tính cũng có thể tạo ra đầu ra nhật ký.

Chúng ta có thể biểu diễn điều đó bằng một kiểu.

``` {.haskell}
data Writer a = Writer a [String]
   deriving Show
```

Ví dụ, hãy viết một hàm trả về  `Writer` cho  `Int` và viết một thông báo nhật ký.

``` {.haskell}
number :: Int -> Writer Int
number n = Writer n $ ["number: " ++ show n]
```

Trong REPL:

``` {.haskell}
Prelude Week04.Writer> number 42
Writer 42 ["number: 42"]
```

Bây giờ, chúng ta hãy làm điều gì đó tương tự như chúng ta đã làm với `Maybe`và  `Either`.

Hãy viết một hàm sử dụng ba phép tính ghi nhật ký mà mỗi phép tính tạo ra một `Int` và chúng ta muốn trả về một phép tính duy nhất tạo ra tổng của các phép tính đó `Int`.

``` {.haskell}
foo :: Writer Int -> Writer Int -> Writer Int -> Writer Int
foo (Writer k xs) (Writer l ys) (Writer m zs) =
Writer (K + l + m) $ xs ++ ys ++ zs
```

Trong REPL:

``` {.haskell}
Prelude Week04.Writer> foo (number 1) (number 2) (number 3)
Writer 6 ["number: 1","number: 2","number: 3"]
```

Bây giờ, hãy viết một hàm hữu ích khác có danh sách thông báo và các nhà sản xuất một `Writer` không có kết quả hữu ích.

``` {.haskell}
tell :: [String] -> Writer ()
tell = Writer ()
```

Bây giờ, chúng tôi có thể cập nhật `foo` để thêm một thông báo nhật ký bổ sung hiển thị tổng các số.

``` {.haskell}
foo :: Writer Int -> Writer Int -> Writer Int -> Writer Int
foo (Writer k xs) (Writer l ys) (Writer m zs) =
let
   s = k + l + m
   Writer _ us = tell ["sum: " ++ show s]
in
   Writer s $ xs ++ ys ++ zs ++ us
```

In the REPL:

``` {.haskell}
Prelude Week04.Writer> foo (number 1) (number 2) (number 3)
Writer 6 ["number: 1","number: 2","number: 3","sum: 6"]
```

Như trước đây, chúng ta có thể viết một hàm ràng buộc:

``` {.haskell}
bindWriter :: Writer a -> (a -> Writer b) -> Writer b
bindWriter (Writer a xs) f =
let
   Writer b ys = f a
in
   Writer b $ xs ++ ys
```

Ở đây, `bindWriter` hàm được trả lại `Writer b` và tạo thông điệp log đó là một nối của `xs` mà chúng ta mô hình phù hợp trên đầu vào, và `ys` mà chúng ta mô hình phù hợp khi gọi `f a` để sản xuất các `Writer b` .

Bây giờ, chúng ta có thể viết lại `foo` bằng `bindWriter` và làm cho nó đẹp hơn nhiều.

``` {.haskell}
foo' :: Writer Int -> Writer Int -> Writer Int -> Writer Int
foo' x y z = x `bindWriter` \k ->
            y `bindWriter` \l ->
            z `bindWriter` \m ->
            let s = k + l + m
            in tell ["sum: " ++ show s] `bindWriter` \_ ->
               Writer s []
```

Những gì chúng tôi đã làm với `foo'`trước đây, bây giờ chúng tôi có thể làm với `foo'` , và chúng tôi nhận được kết quả tương tự.

``` {.haskell}
Prelude Week04.Writer> foo' (number 1) (number 2) (number 3)
Writer 6 ["number: 1","number: 2","number: 3","sum: 6"]
```

Phải thừa nhận rằng nó dài hơn trước, nhưng nó đẹp hơn rất nhiều. Chúng tôi không còn cần thực hiện đối sánh mẫu để trích xuất các thông báo. Chúng tôi không cần phải kết hợp các thông báo nhật ký một cách rõ ràng, nơi chúng tôi có thể mắc lỗi và quên một hoặc sai thứ tự. Thay vào đó, chúng tôi trừu tượng hóa tất cả những thứ đó đi và chỉ có thể tập trung vào logic kinh doanh.

Mặc dù mô hình giống như với `Maybe` and `Either`, lưu ý rằng khía cạnh đặc biệt của các tính toán này là hoàn toàn khác nhau. Với `Maybe` and `Either`, chúng tôi xử lý khái niệm thất bại, trong khi ở đây, với `Writer`, không có thất bại, mà thay vào đó chúng tôi có thêm đầu ra.


### Monad là gì?

Bây giờ, chúng ta có thể giải thích Monad là gì.

Nhìn lại bốn ví dụ, chúng có điểm gì chung? Trong tất cả bốn trường hợp, Chúng tôi đã có một loại cấu trúc (constructor)  với một tham số kiểu -  `IO`, `Maybe`, `Either String` and `Writer` tất cả phải mất một tham số kiểu.

Và, đối với tất cả bốn ví dụ này, chúng tôi có một hàm ràng buộc. Đối với `IO`, chúng tôi có `>>=` hàm và đối với những hàm khác, chúng tôi có các hàm ràng buộc mà chúng tôi tự viết. 

``` {.haskell}
bindWriter :: Writer a -> (a -> Writer b) -> Writer b
bindEither :: Either String a -> (a -> Either String b) -> Either String b
bindMaybe :: Maybe a -> (a -> Maybe b) -> Maybe b
```

Cách thức hoạt động của hàm ràng buộc tùy thuộc vào từng trường hợp. Trong trường hợp của `IO` nó tích hợp sẵn, nhưng bạn có thể nghĩ nó chỉ là kết hợp hai kế hoạch mô tả các hành động cần thực hiện trong quá trình tính toán. Đối với `bindMaybe` và `bindEither` logic là toàn bộ kế hoạch sẽ thất bại nếu bất kỳ phần nào của nó không thành công và đối với `bindWriter`, logic là kết hợp danh sách các thông báo nhật ký.

Và đó là ý tưởng chính của `Monads`. Đó là một khái niệm về tính toán với một số tác dụng bổ sung và khả năng liên kết hai phép tính đó lại với nhau.

Có một khía cạnh khác mà chúng tôi đã đề cập ngắn gọn trong trường hợp IO nhưng không phải đối với các ví dụ khác - một điều khác mà chúng tôi luôn có thể làm.

Bất cứ khi nào chúng ta có khái niệm tính toán với các tác dụng như vậy, chúng ta cũng luôn có khả năng tạo ra một phép tính kiểu này không có bất kỳ tác dụng nào.

Trong ví dụ của `IO`, điều này đã được thực hiện với `return`. Với một `a`, bạn có thể tạo một `IO a` công thức luôn trả về đơn giản mà `a` không có tác dụng. Mỗi ví dụ khác cũng có khả năng này, như được hiển thị bên dưới.


``` {.haskell}
return              :: a -> IO a
Just                :: a -> Maybe a
Right               :: a -> Either String a
(\a -> Writer a []) :: a -> Writer a
```

Và chính sự kết hợp của hai đặc điểm này đã xác định một Monad.

- Khả năng liên kết hai phép tính với nhau
- Khả năng xây dựng một phép tính từ một giá trị thuần túy mà không sử dụng bất kỳ tác dụng tiềm ẩn nào

Nếu chúng ta xem trong REPL:

``` {.haskell}
Prelude Week04.Contract> :i Monad
type Monad :: (` -> `) -> Constraint
class Applicative m => Monad m where
(>>=) :: m a -> (a -> m b) -> m b
(>>) :: m a -> m b -> m b
return :: a -> m a
{-# MINIMAL (>>=) #-}
   -- Defined in ‘GHC.Base’
instance Monad (Either e) -- Defined in ‘Data.Either’
instance Monad [] -- Defined in ‘GHC.Base’
instance Monad Maybe -- Defined in ‘GHC.Base’
instance Monad IO -- Defined in ‘GHC.Base’
instance Monad ((->) r) -- Defined in ‘GHC.Base’
instance (Monoid a, Monoid b, Monoid c) => Monad ((,,,) a b c)
-- Defined in ‘GHC.Base’
instance (Monoid a, Monoid b) => Monad ((,,) a b)
-- Defined in ‘GHC.Base’
instance Monoid a => Monad ((,) a) -- Defined in ‘GHC.Base’
```

Chúng tôi thấy hàm ràng buộc

``` {.haskell}
(>>=) :: m a -> (a -> m b) -> m b
```

Và `return` hàm nhận một giá trị thuần túy và biến nó thành một phép tính tiềm ẩn tác dụng, nhưng không sử dụng chúng.

``` {.haskell}
return :: a -> m a
```

Các hàm khác `>>` có thể dễ dàng được xác định `>>=`, nhưng được cung cấp để thuận tiện.

``` {.haskell}
(>>) :: m a -> m b -> m b
```

Những gì hàm này làm là loại bỏ kết quả của phép tính đầu tiên, vì vậy bạn có thể xác định nó `>>=` theo nghĩa chỉ bằng cách bỏ qua đối số của tham số hàm.

Có một tính toán kỹ thuật khác. Chúng tôi thấy rằng `Monad` có siêu lớp `Applicative`, vì vậy mọi `Monad` đều như vậy `Applicative`.


``` {.haskell}
Prelude Week04.Contract> :i Applicative
type Applicative :: (` -> `) -> Constraint
class Functor f => Applicative f where
pure :: a -> f a
(<`>) :: f (a -> b) -> f a -> f b
GHC.Base.liftA2 :: (a -> b -> c) -> f a -> f b -> f c
(`>) :: f a -> f b -> f b
(<`) :: f a -> f b -> f a
{-# MINIMAL pure, ((<`>) | liftA2) #-}
   -- Defined in ‘GHC.Base’
instance Applicative (Either e) -- Defined in ‘Data.Either’
instance Applicative [] -- Defined in ‘GHC.Base’
instance Applicative Maybe -- Defined in ‘GHC.Base’
instance Applicative IO -- Defined in ‘GHC.Base’
instance Applicative ((->) r) -- Defined in ‘GHC.Base’
instance (Monoid a, Monoid b, Monoid c) =>
         Applicative ((,,,) a b c)
-- Defined in ‘GHC.Base’
instance (Monoid a, Monoid b) => Applicative ((,,) a b)
-- Defined in ‘GHC.Base’
instance Monoid a => Applicative ((,) a) -- Defined in ‘GHC.Base’
```

Chúng tôi thấy nó có một loạt các hàm, nhưng chúng tôi chỉ cần hai hàm đầu tiên.

``` {.haskell}
pure :: a -> f a
(<*>) :: f (a -> b) -> f a -> f b
```

Hàm `pure` có cùng kiểu chữ ký với `return`. Sau đó, có `<*>` (phát âm là 'ap') trông phức tạp hơn một chút. Nhưng, sự thật là, một khi bạn có `return` và `>>=` ở trong Monad, chúng ta có thể dễ dàng xác định cả hai `pure` và `<*>`.

Chúng tôi thấy rằng `Applicative` cũng có một lớp cha `Functor`.


``` {.haskell}
Prelude Week04.Contract> :i Functor
type Functor :: (` -> `) -> Constraint
class Functor f where
fmap :: (a -> b) -> f a -> f b
(<$) :: a -> f b -> f a
{-# MINIMAL fmap #-}
   -- Defined in ‘GHC.Base’
instance Functor (Either a) -- Defined in ‘Data.Either’
instance Functor [] -- Defined in ‘GHC.Base’
instance Functor Maybe -- Defined in ‘GHC.Base’
instance Functor IO -- Defined in ‘GHC.Base’
instance Functor ((->) r) -- Defined in ‘GHC.Base’
instance Functor ((,,,) a b c) -- Defined in ‘GHC.Base’
instance Functor ((,,) a b) -- Defined in ‘GHC.Base’
instance Functor ((,) a) -- Defined in ‘GHC.Base’
```

Như chúng ta đã đề cập trong `Context` `IO`, `Functor` có một hàm `fmap`, được cho trước một hàm từ `a` tới `b` sẽ biến một `f a` thành một `f b`.

Ví dụ nguyên mẫu cho `fmap` là danh sách ở đâu chính `fmap` là `fmap`. Cho một hàm từ `a` to `b`, bạn có thể tạo một danh sách kiểu btừ một danh sách kiểu abằng cách áp dụng maphàm cho từng phần tử của danh sách.

Một lần nữa, một khi bạn có `return` and `\>\>=`, thật dễ dàng để xác định `fmap`.

Vì vậy, bất cứ khi nào bạn muốn xác định Monad, bạn chỉ cần xác định `return` và `>>=`, và để làm cho trình biên dịch hài lòng và đưa ra các thể hiện cho `Functor` and `Applicative`, luôn có một cách tiêu chuẩn để làm điều đó.

Chúng ta có thể làm điều này trong ví dụ của `Writer`.


``` {.haskell}
import Control.Monad

instance Functor Writer where
   fmap = liftM

instance Applicative Writer where
   pure = return
   (<*>) = ap

instance Monad Writer where
   return a = Writer a []
   (>>=) = bindWriter
```

Chúng ta không cần phải làm như vậy đối với `Maybe`, `Either` or `IO` vì chúng đã là Monad được xác định bởi Prelude.

### Tại sao điều này hữu ích?

Nói chung, nó luôn hữu ích để xác định một mẫu chung và đặt tên cho nó.

Nhưng, có lẽ lợi thế quan trọng nhất là có rất nhiều hàm không quan tâm đến `Unit` nào mà chúng ta đang xử lý - chúng sẽ hoạt động với tất cả `Unit`.

Hãy tổng quát hóa ví dụ nơi chúng ta tính tổng của ba số nguyên. Chúng tôi sử dụng một `let` trong ví dụ bên dưới vì những lý do sẽ trở nên rõ ràng trong giây lát.`

``` {.haskell}
threeInts :: Monad m => m Int -> m Int -> m Int -> m Int
threeInts mx my mz =
   mx >>= \k ->
   my >>= \l ->
   mz >>= \m ->
   let s = k + l + m in return s
```

Bây giờ chúng ta có hàm này, chúng ta có thể quay lại `Maybe` ví dụ và viết lại nó.

``` {.haskell}
foo'' :: String -> String -> String -> Maybe Int
foo'' x y z = threeInts (readMaybe x) (readMaybe y) (readMaybe z)
```

Chúng ta có thể làm tương tự cho `Either` ví dụ. 

``` {.haskell}
foo'' :: String -> String -> String -> Either String Int
foo'' x y z = threeInts (readEither x) (readEither y) (readEither z)
```

Các `Writer`  ví dụ không phải là giống hệt nhau.

Nếu chúng tôi không hài lòng khi không có thông báo nhật ký cho tổng, nó rất đơn giản vì nó đã là một ví dụ của

``` {.haskell}
foo'' :: Writer Int -> Writer Int -> Writer Int -> Writer Int
foo'' x y z = threeInts
```

Tuy nhiên, nếu chúng ta muốn thông báo nhật ký cuối cùng, nó sẽ trở nên phức tạp hơn một chút.

``` {.haskell}
foo'' :: Writer Int -> Writer Int -> Writer Int -> Writer Int
foo'' x y z = do
   s <- threeInts x y z
   tell ["sum: " ++ show s]
   return s
```

Nếu bạn nhìn vào mô-đun Control.Monad trong Haskell Prelude tiêu chuẩn, bạn sẽ thấy rằng có rất nhiều hàm hữu ích mà bạn có thể sử dụng cho tất cả các Monad.

Một cách để nghĩ về Monad là tính toán với một siêu năng lực.

Trong trường hợp của `IO`, siêu sức mạnh sẽ có tác dụng trong thế giới thực. Trong trường hợp của `Maybe`, siêu sức mạnh có thể bị hỏng. Sức mạnh siêu việt của `Either`là không thành công với một thông báo lỗi. Và trong trường hợp của `Writer`, siêu sức mạnh là ghi lại các tin nhắn.

Có một câu nói trong cộng đồng Haskell rằng Haskell có dấu chấm phẩy quá tải. Giải thích cho điều này là trong nhiều ngôn ngữ lập trình mệnh lệnh, bạn có dấu chấm phẩy kết thúc bằng dấu chấm phẩy - mỗi câu lệnh được thực thi lần lượt, mỗi câu cách nhau bằng dấu chấm phẩy. Nhưng, chính xác dấu chấm phẩy có nghĩa là gì phụ thuộc vào ngôn ngữ. Ví dụ, có thể có một ngoại lệ, trong trường hợp đó, quá trình tính toán sẽ dừng lại và không tiếp tục với các dòng tiếp theo.

Theo một nghĩa nào đó, `bind` giống như dấu chấm phẩy. Và điều thú vị về Haskell là nó là một dấu chấm phẩy có thể lập trình được. Chúng ta có thể nói logic là gì để kết hợp hai phép tính với nhau.

Mỗi `Monad` đi kèm với "dấu chấm phẩy" riêng.

### ký hiệu 'do' 

Bởi vì mô hình này rất phổ biến và các phép tính đơn lẻ ở khắp nơi, có một ký hiệu đặc biệt cho điều này trong Haskell, được gọi là ký hiệu `do`.

Nó là cú pháp. Hãy viết lại `threeInts` bằng cách sử dụng ký hiệu`do`.


``` {.haskell}
threeInts' :: Monad m => m Int -> m Int -> m Int -> m Int
threeInts' mx my mz = do
   k <- mx
   l <- my
   m <- mz
   let s = k + l + m
   return s
```

Điều này thực hiện chính xác những điều tương tự như `non-do` phiên bản, nhưng nó có ít tiếng ồn hơn.

Lưu ý rằng `let` câu lệnh không sử dụng một `in` phần. Nó không cần phải bên trong một khối `do`.

Và đó là `Monads`. Còn rất nhiều điều để nói về chúng nhưng hy vọng bây giờ bạn đã biết được `Monads` là gì và chúng hoạt động như thế nào.

Thường thì bạn ở trong một tình huống mà bạn muốn có nhiều hiệu ứng cùng một lúc - ví dụ, bạn có thể muốn andthông báo nhật ký lỗi tùy chọn . Có nhiều cách để làm điều đó trong Haskell. Ví dụ, có Monad Transformers nơi về cơ bản người ta có thể xây dựng các Monad tùy chỉnh với các tính năng mà bạn muốn.

Có những cách tiếp cận khác. Một được gọi là Hệ thống Hiệu ứng, có mục tiêu tương tự. Và đây tình cờ là thứ mà Plutus sử dụng cho các Môn phái quan trọng. Đặc biệt là `Unit` liên hệ trong ví và `Unit` theo dõi được sử dụng để kiểm tra mã Plutus.

Tin tốt là bạn không cần phải hiểu Hệ thống Hiệu ứng để làm việc với các Monad này. Bạn chỉ cần biết rằng bạn đang làm việc với Monad, và nó có siêu năng lực nào.

Plutus Monads
-------------

Bây giờ chúng ta đã thấy cách viết mã Monad, bằng cách sử dụng ràng buộc và trả về hoặc bằng cách sử dụng ký hiệu, chúng ta có thể xem một Monad rất quan trọng, đó là hợp đồng Monad, mà bạn có thể đã nhận thấy trong các ví dụ trước đó.

hợp đồng Monad xác định mã sẽ chạy trong ví, đây là phần off-chain của Plutus.

Tuy nhiên, trước khi đi vào chi tiết, chúng ta sẽ nói về Monad thứ hai- Monad EmulatorTrace.

###  EmulatorTrace Monad

Bạn có thể đã tự hỏi liệu có cách nào để thực thi mã Plutus cho mục đích thử nghiệm mà không cần sử dụng Sân chơi Plutus hay không. Thực sự là có, và điều này được thực hiện bằng cách sử dụng `EmulatorTrace Monad`.

Bạn có thể nghĩ về một chương trình trong Monad này giống như những gì chúng tôi thực hiện thủ công trong tab `simulator`  của sân chơi. Nghĩa là, chúng tôi xác định các điều kiện ban đầu, chúng tôi xác định các hành động chẳng hạn như ví nào gọi endpoint nào với các tham số nào và chúng tôi xác định khoảng thời gian chờ giữa các hành động.

Các định nghĩa liên quan nằm trong gói `plutus-contract` trong mô-đun `Plutus.Trace.Emulator`.

``` {.haskell}
module Plutus.Trace.Emulator
```

hàm cơ bản nhất được gọi `runEmulatorTrace`.

``` {.haskell}
-- | Run an emulator trace to completion, returning a tuple of the final state
-- of the emulator, the events, and any error, if any.
runEmulatorTrace
    :: EmulatorConfig
    -> EmulatorTrace ()
    -> ([EmulatorEvent], Maybe EmulatorErr, EmulatorState)
runEmulatorTrace cfg trace =
    (\(xs :> (y, z)) -> (xs, y, z))
    $ run
    $ runReader ((initialDist . _initialChainState) cfg)
    $ foldEmulatorStreamM (generalize list)
    $ runEmulatorStream cfg trace
```

Nó nhận được một thứ gọi là một `EmulatorConfig` và `EmulatorTrace ()`, là một phép tính thuần túy mà không có tác dụng trong thế giới thực. Nó là một hàm thuần túy thực hiện theo dõi trên một blockchain được mô phỏng, sau đó đưa ra kết quả là một danh sách các `EmulatorState`, có thể là lỗi nếu có, và cuối cùng là kết quả cuối cùng `EmulatorState`.

`EmulatorConfig` được định nghĩa trong một mô-đun khác trong cùng một gói:


``` {.haskell}
module Wallet.Emulator.Stream

data EmulatorConfig =
EmulatorConfig
    { _initialChainState      :: InitialChainState -- ^ State of the blockchain at the beginning of the simulation. Can be given as a map of funds to wallets, or as a block of transactions.
    } deriving (Eq, Show)

type InitialChainState = Either InitialDistribution Block
```

Chúng tôi thấy nó chỉ có một trường, thuộc loại `InitialChainState` và nó là`InitialDistribution` hoặc `Block`.

`InitialDistribution` được định nghĩa trong một mô-đun khác trong cùng một gói và nó là một từ đồng nghĩa kiểu cho một bản đồ các cặp giá trị khóa từ  `Wallet` đến `Value`, như bạn mong đợi. `Value` có thể là token lovelace hoặc token gốc.

``` {.haskell}
module Plutus.Contract.Trace

type InitialDistribution = Map Wallet Value
```

Trong cùng một mô-đun, chúng ta thấy một thứ được gọi là `defaultDist` nó trả về phân phối mặc định cho tất cả các ví. Nó làm điều này bằng cách đi qua 10 ví xác định bởi `allWallets` để `defaultDistFor` mà phải mang một danh sách các ví.

``` {.haskell}
-- | The wallets used in mockchain simulations by default. There are
--   ten wallets because the emulator comes with ten private keys.
allWallets :: [EM.Wallet]
allWallets = EM.Wallet <$> [1 .. 10]

defaultDist :: InitialDistribution
defaultDist = defaultDistFor allWallets

defaultDistFor :: [EM.Wallet] -> InitialDistribution
defaultDistFor wallets = Map.fromList $ zip wallets (repeat (Ada.lovelaceValueOf 100_000_000))
```

Chúng tôi có thể thử điều này trong REPL:

``` {.haskell}
Prelude Week04.Contract> import Plutus.Trace.Emulator
Prelude Plutus.Trace.Emulator Week04.Contract> import Plutus.Contract.Trace
Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Week04.Contract> defaultDist
fromList [(Wallet 1,Value (Map [(,Map [("",100000000)])])),(Wallet 2,Value (Map [(,Map [("",100000000)])])),(Wallet 3,Value (Map [(,Map [("",100000000)])])),(Wallet 4,Value (Map [(,Map [("",100000000)])])),(Wallet 5,Value (Map [(,Map [("",100000000)])])),(Wallet 6,Value (Map [(,Map [("",100000000)])])),(Wallet 7,Value (Map [(,Map [("",100000000)])])),(Wallet 8,Value (Map [(,Map [("",100000000)])])),(Wallet 9,Value (Map [(,Map [("",100000000)])])),(Wallet 10,Value (Map [(,Map [("",100000000)])]))]
```

Chúng ta có thể thấy rằng mỗi ví trong số 10 ví đã được phân phối ban đầu là 100.000.000 lovelace.

Chúng tôi cũng có thể lấy số dư cho một ví cụ thể hoặc các ví:

``` {.haskell}
Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Week04.Contract> defaultDistFor [Wallet 1]
fromList [(Wallet 1,Value (Map [(,Map [("",100000000)])]))]
```

Nếu bạn muốn các giá trị ban đầu khác nhau, nếu bạn muốn token gốc, thì bạn phải chỉ định giá trị đó theo cách thủ công.

Hãy xem những gì chúng ta cần để chạy dấu vết đầu tiên của mình:

``` {.haskell}
Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Week04.Contract> :t runEmulatorTrace
runEmulatorTrace
:: EmulatorConfig
-> EmulatorTrace ()
-> ([Wallet.Emulator.MultiAgent.EmulatorEvent], Maybe EmulatorErr,
      Wallet.Emulator.MultiAgent.EmulatorState)
```

 vậy, chúng ta cần một `EmulatorConfig` cái mà chúng ta biết cần một cái `InitialChainState`.

``` {.haskell}
Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Week04.Contract> import Wallet.Emulator.Stream 
Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Wallet.Emulator.Stream Week04.Contract> :i InitialChainState 
type InitialChainState :: `
type InitialChainState =
Either InitialDistribution Ledger.Blockchain.Block
      -- Defined in ‘Wallet.Emulator.Stream’
```

Nếu chúng ta thực hiện `Left` của `defaultDist` chúc sẽ nhận được một `InitialDistribution`.

``` {.haskell}
Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Wallet.Emulator.Stream Week04.Contract> :t Left defaultDist
Left defaultDist :: Either InitialDistribution b
```

Sau đó, chúng ta có thể sử dụng để tạo một `EmulatorConfig`.

``` {.haskell}
Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Wallet.Emulator.Stream Week04.Contract> EmulatorConfig $ Left defaultDist
EmulatorConfig {_initialChainState = Left (fromList [(Wallet 1,Value (Map [(,Map [("",100000000)])])),(Wallet 2,Value (Map [(,Map [("",100000000)])])),(Wallet 3,Value (Map [(,Map [("",100000000)])])),(Wallet 4,Value (Map [(,Map [("",100000000)])])),(Wallet 5,Value (Map [(,Map [("",100000000)])])),(Wallet 6,Value (Map [(,Map [("",100000000)])])),(Wallet 7,Value (Map [(,Map [("",100000000)])])),(Wallet 8,Value (Map [(,Map [("",100000000)])])),(Wallet 9,Value (Map [(,Map [("",100000000)])])),(Wallet 10,Value (Map [(,Map [("",100000000)])]))])}
```

Vì vậy, chúng ta hãy thử `runEmulatorTrace`. Nhớ lại rằng, cũng như và `EmulatorConfig`, chúng ta cũng cần chuyển vào một `EmulatorTrace` và cái đơn giản nhất mà chúng ta có thể tạo chỉ đơn giản là một cái trả về `Unit` - `return ()`.

``` {.haskell}
runEmulatorTrace (EmulatorConfig $ Left defaultDist) $ return ()
```

Nếu bạn chạy điều này trong REPL, bạn sẽ nhận được một lượng lớn dữ liệu xuất ra bảng điều khiển, mặc dù chúng tôi không làm gì với dấu vết. Nếu bạn muốn làm cho nó trở nên hữu ích, bằng cách nào đó, bạn phải lọc tất cả dữ liệu này thành một thứ hợp lý và tổng hợp nó theo một cách nào đó.

May mắn thay, có những hàm khác `runEmulatorTrace`. Một trong số đó là `runEmulatorTraceIo` chạy mô phỏng sau đó xuất ra ở dạng đẹp trên màn hình.

``` {.haskell}
runEmulatorTraceIO
:: EmulatorTrace ()
-> IO ()
runEmulatorTraceIO = runEmulatorTraceIO' def def
```

Để sử dụng hàm này, chúng ta không cần chỉ định `EmulatorConfig` như chúng ta đã làm trước đây, vì theo mặc định sẽ chỉ sử dụng phân phối mặc định.

Trong REPL:

``` {.haskell}
Prelude...> runEmulatorTraceIO $ return ()
```

``` {.}
Slot 00000: TxnValidate af5e6d25b5ecb26185289a03d50786b7ac4425b21849143ed7e18bcd70dc4db8
Slot 00000: SlotAdd Slot 1
Slot 00001: SlotAdd Slot 2
Final balances
Wallet 1: 
{, ""}: 100000000
Wallet 2: 
{, ""}: 100000000
Wallet 3: 
{, ""}: 100000000
Wallet 4: 
{, ""}: 100000000
Wallet 5: 
{, ""}: 100000000
Wallet 6: 
{, ""}: 100000000
Wallet 7: 
{, ""}: 100000000
Wallet 8: 
{, ""}: 100000000
Wallet 9: 
{, ""}: 100000000
Wallet 10: 
{, ""}: 100000000
```

And we see a much more manageable, concise output. Nothing happens, but
we see the Genesis transaction and then the final balances for each
wallet.

If you want more control, there is also `runEmulatorTraceIO\'`, which
does take an `EmulatorConfig`, so we could specify a different
distribution. Và chúng tôi thấy một đầu ra ngắn gọn, dễ quản lý hơn nhiều. `Nothing` xảy ra, nhưng chúng tôi thấy giao dịch Genesis và sau đó là số dư cuối cùng cho mỗi ví.

Nếu bạn muốn kiểm soát nhiều hơn, thì cũng có `runEmulatorTraceIO'`, điều này có nghĩa là `EmulatorConfig`, vì vậy chúng tôi có thể chỉ định một phân phối khác.

``` {.haskell}
runEmulatorTraceIO'
:: TraceConfig
-> EmulatorConfig
-> EmulatorTrace ()
-> IO ()
runEmulatorTraceIO' tcfg cfg trace
= runPrintEffect (outputHandle tcfg) $ runEmulatorTraceEff tcfg cfg trace
```

Nó cũng có một  `TraceConfig`, có hai trường.

``` {.haskell}
data TraceConfig = TraceConfig
{ showEvent    :: EmulatorEvent' -> Maybe String
-- ^ Function to decide how to print the particular events.
, outputHandle :: Handle
-- ^ Where to print the outputs to. Default: 'System.IO.stdout'
}
```

Trường đầu tiên, `showEvent` là một hàm chỉ định cái mà các `EmulatorEvent`s được hiển thị và cách chúng được hiển thị. Nó nhận một `EmulatorEvent` đối số như một đối số và có thể trả về `Nothing ` nó nếu sự kiện sẽ không được hiển thị hoặc một `Just` với một `String` cách hiển thị sự kiện sẽ được hiển thị.

Đây là mặc định `TraceConfig` được sử dụng bởi `runEmulatorTraceIO`. Chúng ta có thể thấy rằng hầu hết các sự kiện đều bị bỏ qua và chúng ta chỉ nhận được kết quả cho một số sự kiện.

``` {.haskell}
instance Default TraceConfig where
def = TraceConfig
            { showEvent     = defaultShowEvent
            , outputHandle  = stdout
            }

defaultShowEvent :: EmulatorEvent' -> Maybe String
defaultShowEvent = \case
UserThreadEvent (UserLog msg)                                        -> Just $ "*** USER LOG: " <> msg
InstanceEvent (ContractInstanceLog (ContractLog (A.String msg)) _ _) -> Just $ "*** CONTRACT LOG: " <> show msg
InstanceEvent (ContractInstanceLog (StoppedWithError err)       _ _) -> Just $ "*** CONTRACT STOPPED WITH ERROR: " <> show err
InstanceEvent (ContractInstanceLog NoRequestsHandled            _ _) -> Nothing
InstanceEvent (ContractInstanceLog (HandledRequest _)           _ _) -> Nothing
InstanceEvent (ContractInstanceLog (CurrentRequests _)          _ _) -> Nothing
SchedulerEvent _                                                     -> Nothing
ChainIndexEvent _ _                                                  -> Nothing
WalletEvent _ _                                                      -> Nothing
ev                                                                   -> Just . renderString . layoutPretty defaultLayoutOptions . pretty $ ev
```

Trường thứ hai là một xử lý được đặt mặc định `stdout`, nhưng chúng tôi cũng có thể chỉ định một tệp ở đây.

Bây giờ chúng ta hãy xem xét một dấu vết thú vị hơn, sử dụng `Vesting` hợp đồng từ bài giảng trước.

Đầu tiên, chúng tôi xác định một `Trace`.

``` {.haskell}
myTrace :: EmulatorTrace ()
myTrace = do
h1 <- activateContractWallet (Wallet 1) endpoints
h2 <- activateContractWallet (Wallet 2) endpoints
callEndpoint @"give" h1 $ GiveParams
      { gpBeneficiary = pubKeyHash $ walletPubKey $ Wallet 2
      , gpDeadline    = Slot 20
      , gpAmount      = 1000
      }
void $ waitUntilSlot 20
callEndpoint @"grab" h2 ()
void $ waitNSlots 1
```

Điều đầu tiên chúng ta phải làm là kích hoạt ví bằng cách sử dụng hàm Monad `activateContractWallet`. Chúng ta liên kết kết quả của hàm này với `h1`, và sau đó liên kết kết quả của cuộc gọi thứ hai (đối với Wallet 2) với `h2`. Hai giá trị đó - `h1` và `h2`được xử lý đối với ví tương ứng của chúng.

Tiếp theo, chúng tôi sử dụng `callEndpoint` để mô phỏng Ví 1 gọi endpoint `give`, với các thông số được hiển thị. Sau đó, chúng tôi chờ đợi đến vị trí 20. Hàm `waitUntilSlot` thực sự trả về một giá trị đại diện cho vị trí đã đạt đến, nhưng vì chúng tôi không quan tâm đến giá trị đó ở đây, chúng tôi sử dụng `void` để bỏ qua nó. Sau đó, chúng tôi mô phỏng cuộc gọi đến endpoint `grab` bằng Ví 2.

Bây giờ, chúng ta có thể viết một hàm để gọi `runEmulatorTraceIO` với out `Trace`.

``` {.haskell}
test :: IO ()
test = runEmulatorTraceIO myTrace
```

Và, sau đó chúng ta có thể chạy điều này trong REPL:

``` {.haskell}
Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Wallet.Emulator Week04.Trace Wallet.Emulator.Stream Week04.Contract> test
```

``` {.}
Slot 00000: TxnValidate af5e6d25b5ecb26185289a03d50786b7ac4425b21849143ed7e18bcd70dc4db8
Slot 00000: SlotAdd Slot 1
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Contract instance started
Slot 00001: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 2}:
  Contract instance started
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Receive endpoint call: Object (fromList [("tag",String "give"),("value",Object (fromList [("unEndpointValue",Object (fromList [("gpAmount",Number 1000.0),("gpBeneficiary",Object (fromList [("getPubKeyHash",String "39f713d0a644253f04529421b9f51b9b08979d08295959c4f3990ee617f5139f")])),("gpDeadline",Object (fromList [("getSlot",Number 20.0)]))]))]))])
Slot 00001: W1: TxSubmit: 49f326a21c09ba52eddee46b65bdb5fb33b3444745e9af1510a68f9043696eba
Slot 00001: TxnValidate 49f326a21c09ba52eddee46b65bdb5fb33b3444745e9af1510a68f9043696eba
Slot 00001: SlotAdd Slot 2
Slot 00002: *** CONTRACT LOG: "made a gift of 1000 lovelace to 39f713d0a644253f04529421b9f51b9b08979d08295959c4f3990ee617f5139f with deadline Slot {getSlot = 20}"
Slot 00002: SlotAdd Slot 3
Slot 00003: SlotAdd Slot 4
Slot 00004: SlotAdd Slot 5
Slot 00005: SlotAdd Slot 6
Slot 00006: SlotAdd Slot 7
Slot 00007: SlotAdd Slot 8
Slot 00008: SlotAdd Slot 9
Slot 00009: SlotAdd Slot 10
Slot 00010: SlotAdd Slot 11
Slot 00011: SlotAdd Slot 12
Slot 00012: SlotAdd Slot 13
Slot 00013: SlotAdd Slot 14
Slot 00014: SlotAdd Slot 15
Slot 00015: SlotAdd Slot 16
Slot 00016: SlotAdd Slot 17
Slot 00017: SlotAdd Slot 18
Slot 00018: SlotAdd Slot 19
Slot 00019: SlotAdd Slot 20
Slot 00020: 00000000-0000-4000-8000-000000000001 {Contract instance for wallet 2}:
  Receive endpoint call: Object (fromList [("tag",String "grab"),("value",Object (fromList [("unEndpointValue",Array [])]))])
Slot 00020: W2: TxSubmit: d9a2028384b4472242371f27cb51727f5c7c04327972e4278d1f69f606019a8b
Slot 00020: TxnValidate d9a2028384b4472242371f27cb51727f5c7c04327972e4278d1f69f606019a8b
Slot 00020: SlotAdd Slot 21
Slot 00021: *** CONTRACT LOG: "collected gifts"
Slot 00021: SlotAdd Slot 22
Final balances
Wallet 1: 
    {, ""}: 99998990
Wallet 2: 
    {, ""}: 100000990
Wallet 3: 
    {, ""}: 100000000
Wallet 4: 
    {, ""}: 100000000
Wallet 5: 
    {, ""}: 100000000
Wallet 6: 
    {, ""}: 100000000
Wallet 7: 
    {, ""}: 100000000
Wallet 8: 
    {, ""}: 100000000
Wallet 9: 
    {, ""}: 100000000
Wallet 10: 
    {, ""}: 100000000
```

Đầu ra này rất giống với đầu ra mà chúng ta thấy trong playground. Chúng ta có thể thấy giao dịch Genesis cũng như cả giao dịch `give`và `grab` giao dịch từ `Trace`. Chúng ta cũng có thể thấy một số đầu ra nhật ký từ chính hợp đồng, có tiền tố là `CONTRACT LOG`.

Chúng tôi cũng có thể đăng nhập từ bên trong `Trace` Monad. Ví dụ, chúng tôi có thể xem kết quả của `waitNSlots` cuộc gọi cuối cùng :

``` {.haskell}
myTrace :: EmulatorTrace ()
myTrace = do
...
...
s <- waitNSlots 1
Extras.logInfo $ "reached slot " ++ show s
```

Sau đó, chúng tôi sẽ thấy kết quả này khi chúng tôi chạy mô phỏng:

``` {.}
...
Slot 00020: SlotAdd Slot 21
Slot 00021: *** USER LOG: reached slot Slot {getSlot = 21}
Slot 00021: *** CONTRACT LOG: "collected gifts"
Slot 00021: SlotAdd Slot 22
...
```

Bây giờ chúng ta hãy nhìn vào Contract Monad.

### Hợp đồng Monad

Mục đích của hợp đồng Monad là xác định mã off-chain chạy trong ví. Nó có bốn tham số kiểu:

``` {.haskell}
newtype Contract w s e a = Contract { unContract :: Eff (ContractEffs w s e) a }
      deriving newtype (Functor, Applicative, Monad)
```


`a` như trong mọi Monad - nó biểu thị kiểu kết quả của phép tính.

Chúng ta sẽ đi vào chi tiết hơn ba phần khác sau nhưng chỉ ngắn gọn:

- `w` giống như ví dụ Monad `Writer` của chúng tôi, nó cho phép chúng tôi viết các thông báo kiểu nhật ký `w`.
- `s` mô tả các khả năng của blockchain, ví dụ như đợi một vị trí, gửi giao dịch, lấy khóa công khai của ví. Nó cũng có thể chứa các endpoint cụ thể.
- `e` mô tả loại thông báo lỗi mà Monad này có thể ném ra.

Hãy viết một ví dụ.

``` {.haskell}
myContract1 :: Contract () BlockchainActions Text ()
myContract1 = Contract.logInfo @String "Hello from the contract!"
```

Ở đây, Chung tôi đưa `Contract` xây dựng với `Unit` như là kiểu `w`và `BlockchainActions` như là đối số thứ 2 `s`. Điều này cho phép chúng tôi truy cập vào tất cả các hành động của blockchain - điều duy nhất chúng tôi không thể làm là gọi các endpoint cụ thể.

Đối với `e` - loại thông báo lỗi, Chúng tôi sử dụng `Text`. `Text` trong Haskell được sử dụng như là `String`, nhưng nó hiệu quả hơn nhiều

Chúng tôi không muốn một kết quả cụ thể, vì vậy chúng tôi sử dụng `Unit` thay cho `a`.

Đối với phần thân hàm, chúng tôi viết một thông báo nhật ký. Chúng tôi sử dụng `@String`. bởi vì, chúng tôi đã import kiểu `Data.Text` Và sử dụng `OverloadedStrings` trong GHC biên dịch, vì vậy trình biên dịch cần biết loại mà chúng tôi đang tham chiếu - một `Text` hoặc một `String`. Chung tôi có thể sử dụng`@String` Nếu chúng tôi sử dụng tùy biến biên dichij `TypeApplications`.

Bây giờ chung ta định nghĩa `Trace` bắt đầu chạy hợp đồng trong ví và hàm `test` để chạy nó.

``` {.haskell}
myTrace1 :: EmulatorTrace ()
myTrace1 = void $ activateContractWallet (Wallet 1) myContract1

test1 :: IO ()
test1 = runEmulatorTraceIO myTrace1
```

Nếu chúng tôi chạy điều này trong REPL, chúng tôi sẽ thấy thông báo nhật ký của chúng tôi từ hợp đồng..

``` {.Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Wallet.Emulator Week04.Trace Wallet.Emulator.Stream Week04.Contract> test1
Slot 00000: TxnValidate af5e6d25b5ecb26185289a03d50786b7ac4425b21849143ed7e18bcd70dc4db8
Slot 00000: SlotAdd Slot 1
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Contract instance started
Slot 00001: *** CONTRACT LOG: \"Hello from the contract!\"
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Contract instance stopped (no errors)
Slot 00001: SlotAdd Slot 2
Final balances
Wallet 1: 
{, \"\"}: 100000000
Wallet 2: 
{, \"\"}: 100000000
Wallet 3: 
{, \"\"}: 100000000
Wallet 4: 
{, \"\"}: 100000000
Wallet 5: 
{, \"\"}: 100000000
Wallet 6: 
{, \"\"}: 100000000
Wallet 7: 
{, \"\"}: 100000000
Wallet 8: 
{, \"\"}: 100000000
Wallet 9: 
{, \"\"}: 100000000
Wallet 10: 
{, \"\"}: 100000000}
```

Bây giờ, hãy xém một ngoại lệ.

``` {.haskell}
myContract1 :: Contract () BlockchainActions Text ()
myContract1 = do
void $ Contract.throwError "BOOM!"
Contract.logInfo @String "Hello from the contract!"
```

Nhớ lại rằng chúng tôi đã chọn loại `Text` làm thông báo lỗi. 

``` {.}
Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Wallet.Emulator Week04.Trace Wallet.Emulator.Stream Week04.Contract> test1
Slot 00000: TxnValidate af5e6d25b5ecb26185289a03d50786b7ac4425b21849143ed7e18bcd70dc4db8
Slot 00000: SlotAdd Slot 1
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Contract instance started
Slot 00001: *** CONTRACT STOPPED WITH ERROR: "\"BOOM!\""
Slot 00001: SlotAdd Slot 2
Final balances
Wallet 1: 
{, ""}: 100000000
Wallet 2: 
{, ""}: 100000000
Wallet 3: 
{, ""}: 100000000
Wallet 4: 
{, ""}: 100000000
Wallet 5: 
{, ""}: 100000000
Wallet 6: 
{, ""}: 100000000
Wallet 7: 
{, ""}: 100000000
Wallet 8: 
{, ""}: 100000000
Wallet 9: 
{, ""}: 100000000
Wallet 10: 
{, ""}: 100000000
```

Bây giờ, chúng tôi không nhận được thông báo nhật ký, nhưng chúng tôi được thông báo rằng hợp đồng đã dừng do lỗi và chúng tôi thấy thông báo ngoại lệ của mình.

Một điều khác bạn có thể làm là xử lý các trường hợp ngoại lệ. Chúng tôi sẽ sử dụng hàm `handleError` từ mô-đun`Plutus.Contract.Types`.

``` {.haskell}
handleError ::
      forall w s e e' a.
      (e -> Contract w s e' a)
      -> Contract w s e a
      -> Contract w s e' a
handleError f (Contract c) = Contract c' where
      c' = E.handleError @e (raiseUnderN @'[E.Error e'] c) (fmap unContract f)
```

Các hàm `handleError` và hàm `Contract` xử lý lỗi . Trình xử lý lỗi nhận một đối số kiểu `e` từ hợp đồng của chúng tôi và trả về một đối số mới  `Contract` như một tham số thứ nhất, nhưng chúng ta có thể thay đổi kiểu của `e`  - kiểu lỗi, được thể hiện trong danh sách đối số `Contract` như là `e'`.

``` {.haskell}
myContract2 :: Contract () BlockchainActions Void ()
myContract2 = Contract.handleError
      (\err -> Contract.logError $ "Caught error: " ++ unpack err)
      myContract1

myTrace2 :: EmulatorTrace ()
myTrace2 = void $ activateContractWallet (Wallet 1) myContract2

test2 :: IO ()
test2 = runEmulatorTraceIO myTrace2
```

Chúng tôi sử dụng loại `Void` làm loại lỗi. `Void` là một loại không có giá trị, vì vậy, bằng cách sử dụng loại này, chúng tôi muốn nói rằng không thể có bất kỳ sai sót nào đối với hợp đồng này.

*Chú ý*

Hàm `unpack` được định nghĩa trong module `Data.Text`. nó chuyển đổi một giá trị kiểu `Text` thành giá trị kiểu `String`.

``` {.}
Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Wallet.Emulator Week04.Trace Wallet.Emulator.Stream Week04.Contract> test2
Slot 00000: TxnValidate af5e6d25b5ecb26185289a03d50786b7ac4425b21849143ed7e18bcd70dc4db8
Slot 00000: SlotAdd Slot 1
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Contract instance started
Slot 00001: *** CONTRACT LOG: "Caught error: BOOM!"
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Contract instance stopped (no errors)
Slot 00001: SlotAdd Slot 2
Final balances
...
```

Chúng tôi không còn nhận được thông báo lỗi nữa, nhưng thay vào đó chúng tôi nhận được thông báo từ trình xử lý lỗi hiển thị ngoại lệ đã được đưa ra bởi Contract1. Lưu ý rằng chúng tôi vẫn không nhận được thông báo "Xin chào từ hợp đồng!". Hợp đồng 1 vẫn ngừng xử lý sau lỗi của nó, nhưng không có lỗi tổng thể của hợp đồng do ngoại lệ được phát hiện và xử lý.

Tất nhiên, các trường hợp ngoại lệ cũng có thể xảy ra ngay cả khi chúng không được mã hợp đồng của bạn đưa ra một cách rõ ràng. Có những hoạt động, chẳng hạn như gửi một giao dịch mà không có đủ đầu vào để thanh toán cho một đầu ra, trong đó Plutus sẽ đưa ra một ngoại lệ.

Tiếp theo, hãy xem tham số`s`, tham số thứ hai `Contract`, xác định các hành động blockchain có sẵn.

Trong hai ví dụ đầu tiên, chúng tôi chỉ sử dụng `BlockChainActions` kiểu có tất cả các hàm tiêu chuẩn nhưng không hỗ trợ cho các endpoint cụ thể. Nếu chúng tôi muốn hỗ trợ cho các endpoint cụ thể, chúng tôi phải sử dụng một loại khác.

Cách thường được thực hiện là sử dụng từ đồng nghĩa loại. Ví dụ sau đây sẽ tạo ra một từ đồng nghĩa kiểu `MySchema` có tất cả các khả năng `BlockChainActions` nhưng với việc bổ sung khả năng gọi endpoint `foo` với một đối số kiểu `Int`.

``` {.haskell}
type MySchema = BlockchainActions .\/ Endpoint "foo" Int
```

*Chú ý*

Toán tử `.\/` là một kiểu hoạt động - nó hoạt động trên kiểu không giá trị. Để sử dụng điều này chúng ta sử dụng các tùy chọn `TypeOperators` và `DataKinds` biên dịch.

Bây giờ, chúng ta có thể sử dụng khiểu `MySchema` để xác định hợp đồng của mình.

``` {.haskell}
myContract3 :: Contract () MySchema Text ()
myContract3 = do
      n <- endpoint @"foo"
      Contract.logInfo n
```

Hợp đồng này sẽ chặn cho đến khi endpoint `foo` được gọi, trong trường hợp của chúng tôi, là một `Int`. Khi đó giá trị của tham  số`Int` sẽ được ràng buộc với `n`. Bởi vì điều này, chúng tôi không còn đủ để chỉ cần kích hoạt hợp đồng để kiểm tra nó. Bây giờ, chúng ta cũng phải gọi endpoint.

Để làm điều này, bây giờ chúng ta cần phải xử lý từ `activateContractWallet` đó, sau đó chúng ta có thể sử dụng để gọi endpoint .

``` {.haskell}
myTrace3 :: EmulatorTrace ()
myTrace3 = do
      h <- activateContractWallet (Wallet 1) myContract3
      callEndpoint @"foo" h 42

test3 :: IO ()
test3 = runEmulatorTraceIO myTrace3
```

Chạy điều này trong REPL:

``` {.}
Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Wallet.Emulator Week04.Trace Wallet.Emulator.Stream Week04.Contract> test3
Slot 00000: TxnValidate af5e6d25b5ecb26185289a03d50786b7ac4425b21849143ed7e18bcd70dc4db8
...
Receive endpoint call: Object (fromList [("tag",String "foo"),("value",Object (fromList [("unEndpointValue",Number 42.0)]))])
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
Contract log: Number 42.0
...
Final balances
...
Wallet 10: 
{, ""}: 100000000
```

Cuối cùng, hãy xem tham số kiểu đầu tiên, người viết. Không thể `w`  là một kiểu tùy ý, nó phải là một thể hiện của lớp kiểu `Monoid`.

``` {.haskell}
Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Wallet.Emulator Week04.Trace Wallet.Emulator.Stream Week04.Contract> :i Monoid
type Monoid :: ` -> Constraint
class Semigroup a => Monoid a where
mempty :: a
mappend :: a -> a -> a
mconcat :: [a] -> a
{-# MINIMAL mempty #-}
      -- Defined in ‘GHC.Base’
instance Monoid [a] -- Defined in ‘GHC.Base’
instance Monoid Ordering -- Defined in ‘GHC.Base’
instance Semigroup a => Monoid (Maybe a) -- Defined in ‘GHC.Base’
instance Monoid a => Monoid (IO a) -- Defined in ‘GHC.Base’
instance Monoid b => Monoid (a -> b) -- Defined in ‘GHC.Base’
instance (Monoid a, Monoid b, Monoid c, Monoid d, Monoid e) =>
      Monoid (a, b, c, d, e)
-- Defined in ‘GHC.Base’
instance (Monoid a, Monoid b, Monoid c, Monoid d) =>
      Monoid (a, b, c, d)
-- Defined in ‘GHC.Base’
instance (Monoid a, Monoid b, Monoid c) => Monoid (a, b, c)
-- Defined in ‘GHC.Base’
instance (Monoid a, Monoid b) => Monoid (a, b)
-- Defined in ‘GHC.Base’
instance Monoid () -- Defined in ‘GHC.Base’
```

Đây là một lớp kiểu rất quan trọng và rất phổ biến trong Haskell. Nó định nghĩa `mempty` và `mappend`.

Hàm `mempty` giống như phần tử trung lập và `mappend` kết hợp hai phần tử của loại này để tạo ra một phần tử mới cùng loại.

Ví dụ `Monoid` là `List`, khi `mempty` là danh sách empty `[]`, và `mappend` là nối `++`.

Ví dụ:

``` {.haskell}
Prelude> mempty :: [Int]
[]
Prelude> mappend [1, 2, 3 :: Int] [4, 5, 6]
[1,2,3,4,5,6]
```

Có rất nhiều ví dụ khác về `Monoid`, và chúng ta sẽ thấy các trường hợp khác trong khóa học này.

Nhưng bây giờ, chúng ta hãy gắn bó với các danh sách và viết ví dụ cuối cùng của chúng ta.

``` {.haskell}
myContract4 :: Contract [Int] BlockchainActions Text ()
myContract4 = do
    void $ Contract.waitNSlots 10
    tell [1]
    void $ Contract.waitNSlots 10
    tell [2]
    void $ Contract.waitNSlots 10
```


Thay vì sử dụng `Unit` như là kiểu `w`, Chúng tôi sử dụng`[Int]`.Điều này cho phép chúng tôi sử dụng `tell` như là show.

Điều này bây giờ cho phép chúng tôi truy cập vào các thông báo đó trong quá trình theo dõi, bằng cách sử dụng hàm `observableState` .

``` {.haskell}
myTrace4 :: EmulatorTrace ()
myTrace4 = do
    h <- activateContractWallet (Wallet 1) myContract4

    void $ Emulator.waitNSlots 5
    xs <- observableState h
    Extras.logInfo $ show xs

    void $ Emulator.waitNSlots 10
    ys <- observableState h
    Extras.logInfo $ show ys

    void $ Emulator.waitNSlots 10
    zs <- observableState h
    Extras.logInfo $ show zs

test4 :: IO ()
test4 = runEmulatorTraceIO myTrace4
```

Nếu chúng ta chạy điều này trong REPL, chúng ta có thể thấy các `USER LOG` thông báo được tạo bằng cách sử dụng hàm `tell`.

``` {.}
Prelude Plutus.Trace.Emulator Plutus.Contract.Trace Wallet.Emulator Week04.Trace Wallet.Emulator.Stream Week04.Contract> test4
Slot 00000: TxnValidate af5e6d25b5ecb26185289a03d50786b7ac4425b21849143ed7e18bcd70dc4db8
Slot 00000: SlotAdd Slot 1
Slot 00001: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Contract instance started
Slot 00001: SlotAdd Slot 2
...
Slot 00005: SlotAdd Slot 6
Slot 00006: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Sending contract state to Thread 0
Slot 00006: SlotAdd Slot 7
Slot 00007: *** USER LOG: []
Slot 00007: SlotAdd Slot 8
...
Slot 00015: SlotAdd Slot 16
Slot 00016: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Sending contract state to Thread 0
Slot 00016: SlotAdd Slot 17
Slot 00017: *** USER LOG: [1]
Slot 00017: SlotAdd Slot 18
...
Slot 00025: SlotAdd Slot 26
Slot 00026: 00000000-0000-4000-8000-000000000000 {Contract instance for wallet 1}:
  Sending contract state to Thread 0
Slot 00026: SlotAdd Slot 27
Slot 00027: *** USER LOG: [1,2]
Final balances
Wallet 1: 
    {, ""}: 100000000
Wallet 2: 
    {, ""}: 100000000
...
Wallet 10: 
    {, ""}: 100000000
```

Sử dụng cơ chế này, có thể truyền thông tin từ hợp đồng đang chạy trong ví ra thế giới bên ngoài. Sử dụng thiết bị đầu cuối, chúng tôi có thể chuyển thông tin vào một hợp đồng. Và bằng cách sử dụng cơ chế `tell`, chúng tôi có thể lấy thông tin ra khỏi ví.
