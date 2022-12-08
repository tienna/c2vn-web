# Khóa học Haskell

[Version en 🇪🇸](https://github.com/input-output-hk/haskell-course/)

**Khóa học này được thiết kế để dạy cho sinh viên Haskell từ con số 0 đến mọi thứ cần thiết để làm việc với Marlowe và Plutus.** Bản thân khóa học không chứa nội dung dành riêng cho Marlowe hoặc Plutus. Vì vậy, nếu bạn muốn sử dụng nó để học Haskell cho các mục đích khác, bạn có thể!mặt cười

FĐể được giải thích chi tiết hơn, hãy tiếp tục đọc hoặc xem video giới thiệu: 
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=flat&logo=YouTube&logoColor=white)](https://www.youtube.com/watch?v=x2LqBeF3SGA&list=PLbQhX3HIoPxqkrmTs8iCnxOXXARo3lcxp&index=1)

## Tôi nên học bao nhiêu nếu tôi chỉ muốn sử dụng Marlowe/Plutus?

Trong phần [outline](#what-well-cover) bên dưới, có các điểm dừng rõ ràng (đối với cả Marlowe và Plutus) mà chúng tôi cho rằng bạn phải biết đủ về Haskell để sử dụng công nghệ một cách hiệu quả.

## Làm thế nào để đọc / xem các bài học

Để xem qua các bài học tương tác, hãy chuyển đến dàn bài của bài học bạn đã chọn bên trong "[What we'll cover](#what-well-cover)" " và nhấp vào nút giống như bên dưới. Nếu trang tải với thông báo "500: Internal Server Error", chỉ cần làm mới trang đó và nó sẽ ổn. Ở trên cùng, bạn sẽ thấy bảng điều khiển hiển thị tiến trình chuẩn bị bài học tương tác của mình. Trong thời gian này, bạn có thể cuộn xuống và xem bài học được hiển thị không tương tác.

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/input-output-hk/haskell-course/HEAD?labpath=%2Flessons%2F01-Introduction-to-haskell.ipynb)

Và để xem video, hãy nhấp vào nút trông như thế này:

[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=flat&logo=YouTube&logoColor=white)](https://youtu.be/H1vbUKMKvnM)

## Làm bài tập về nhà

1. Sao chép kho lưu trữ này.
2. Tạo một tài khoản  [GitPod](https://www.gitpod.io/).
3. CNhấp vào nút này để tạo môi trường phát triển từ xa: [![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=flat&logo=visual-studio-code&logoColor=white)](https://gitpod.io/#https://github.com/input-output-hk/haskell-course)
4. Chọn `Homework/HomeworkXX` hư mục có bài tập về nhà mà bạn muốn hoàn thành.
5.Thực hiện theo các hướng dẫn bên trong tệp `Homework.hs` or `Main.hs`.
6. **Kiểm tra các giải pháp trong `solutions` branch!**

#### Cấu trúc kho lưu trữ

    Haskell-Course
        |   |
        |   |---- Homework
        |          |
        |          |---- Homework01 (Homework for lesson 01)
        |          |---- Homework02 (Homework for lesson 02)
        |          ...
        |
        |-------- lessons (Lessons in Jupyter notebook format. Access through Binder.)
                   |
                   |---- 1-Introduction-to-haskell
                   |---- 2-Functions-Data-Types-and-Signatures

Mọi thứ khác có thể được bỏ qua một cách an toàn

## thảo luận với các sinh viên khác

- [Canvas](https://iohk.instructure.com/enroll/3BAAGG)
- [IOG's technical community (check out the #ask-haskell channel!)](https://discord.gg/inputoutput)

## Câu hỏi thường gặp

--[FAQ](FAQ)

## Các thay đổi được đề xuất cho lần lặp lại/phiên bản tiếp theo

--[Changes](Changes)

## What we'll cover

**Đây là một phác thảo dự kiến. Các thay đổi có thể (và sẽ) được thực hiện khi chúng tôi tiến hành khóa học và thu thập phản hồi từ học viên.**

**Nếu không có nút nào trên một bài học, điều đó có nghĩa là bài học đó chưa được xuất bản.**

---

### PHẦN BẮT ĐẦU 🐣⟶🐥

---

### 1. Giới thiệu và công cụ [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/input-output-hk/haskell-course/HEAD?labpath=%2Flessons%2F01-Introduction-to-haskell.ipynb) [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=flat&logo=YouTube&logoColor=white)](https://youtu.be/pkU8eiNZipQ)

- Giới thiệu khóa học và bài giảng
  - What we’ll cover
  - Repository structure
- Giới thiệu về Haskell
  - Cách mở và sử dụng JupyterLab
  - Ngôn ngữ lập trình chức năng thuần túy
  - Cú pháp cơ bản
  - Kiểu trong Haskell
  - Tính lười (Laziness)
  - GHC (and GHCi)
- GitPod
  - Cách mở và sử dụng GitPod
  - Ví dụ về cách hoàn thành bài tập về nhà..

### 2. Data types, Signatures, and Polymorphism [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/input-output-hk/haskell-course/HEAD?labpath=%2Flessons%2F02-Functions-Data-Types-and-Signatures.ipynb) [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=flat&logo=YouTube&logoColor=white)](https://youtu.be/RABzYje2d2A)

- Giới thiệu các kiểu thực tế
- Kiểu signature
  - Function’s signatures
  - Biến  Haskell
    - Tham số triong hàm
    - Tên/ định nghĩa
- Hàm trung tố và tiền tố 
- Các kiểu dữ liệu:
  - Int, Integer
  - Float, Double
  - Rational
  - Bool
  - Char
  - Lists
  - Strings
  - Tuples + Tuples VS Lists
- Polymorphic values and type variables

### 3. Điều kiện và Cấu trúc trợ giúp [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/input-output-hk/haskell-course/HEAD?labpath=%2Flessons%2F03-Conditions-and-helper-constructions.ipynb) [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=flat&logo=YouTube&logoColor=white)](https://www.youtube.com/watch?v=G0XPELNZuws)

- If-then-else
- Guards
- `let` expressions
- `where`
- Should I use `let` or `where`?
- Things to keep in mind

### 4. Pattern matching and Case [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/input-output-hk/haskell-course/HEAD?labpath=%2Flessons%2F04-Pattern-matching.ipynb) [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=flat&logo=YouTube&logoColor=white)](https://www.youtube.com/watch?v=sQPGN4b95DU)

- What is pattern matching
- Pattern matching on
  - Function implementations
  - Lists
  - Tuples
- Case

### 5. Cải tiến và kết hợp các hàm [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/input-output-hk/haskell-course/HEAD?labpath=%2Flessons%2F05-Improving-and-combining-functions.ipynb) [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=flat&logo=YouTube&logoColor=white)](https://youtu.be/E-OEw4FKdf4)

- Các Hàm bậc cao
  - Hàm `filter`
  - Hàm `any` 
- Hàm `Lambda`
- Precedence and associativity
- Hàm `Curried`
  - Partial application
- Soạn thảo và ứng dụng hàm
  - The `$` operator
  - The `.` operator
- Kiểu Point-free

### 6. Đề Quy (Recursion) [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/input-output-hk/haskell-course/HEAD?labpath=%2Flessons%2F06-Recursion-and-folds.ipynb) [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=flat&logo=YouTube&logoColor=white)](https://www.youtube.com/watch?v=wzvbUxSykXM)

- Tại sao đề quy (Recursion)?
- Tư duy đề quy
  - `sum` và `product`
- Các bước để tạo hàm đệ quy của riêng bạn
- Ví dụ về đệ quy
  - `and`, `length`, `reverse`, `drop`, `take`, `map`, `filter`
- Trích xuất mẫu `foldr`
- Hàm `foldl`
- Hàm `foldl'`
- Khi nào thì sử dụng `foldr`, `foldl`, và `foldl'`

### 7. Giới thiểu về lớp kiểu [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/input-output-hk/haskell-course/HEAD?labpath=%2Flessons%2F07-Intro-to-Type-Classes.ipynb) [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=flat&logo=YouTube&logoColor=white)](https://www.youtube.com/watch?v=dGNd0GmsYWU)

- Sự tuyệt vời của lớp
- Các loại lớp là gì
- Các lớp kiểu phổ biến
  - `Eq`, `Ord`
  - `Num`, `Integral`, `Floating`
  - `Read`, `Show`
- Kiểu hợp lệ trung nhất
- Đa ràng buộc

### 8. Tạo kiểu không tham số [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/input-output-hk/haskell-course/HEAD?labpath=%2Flessons%2F08-Creating-non-parameterized-types.ipynb) [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=flat&logo=YouTube&logoColor=white)](https://www.youtube.com/watch?v=mAZC1w_VfEs)

- Kiều (Type synonyms)
  - How to define type synonyms
  - Why use type synonyms
- Defining new types
  - Creating new types with `data`
  - Using new types
  - Value parameters
- Record syntax

### 9. Tạo các kiểu tham số hóa và đệ quy [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/input-output-hk/haskell-course/HEAD?labpath=%2Flessons%2F09-Creating-parameterized-and-recursive-types.ipynb) [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=flat&logo=YouTube&logoColor=white)](https://www.youtube.com/watch?v=wPV94aZIOGQ)

- Kiểu tham số
  - Kiểu tham số `type`
  - Kiểu tham số `data`
- Kiểu dữ liệu đề quy
  - `Tweet` 
  - A `Sequence` of `Node`s
  - A `Tree` of `Node`s
- Các kiểu
- Từ khóa `newType`

### 10. Tạo Type Classes and Instances

- Revisiting Type Classes
- The `Eq` type class
  - Defining the `Eq` type class
  - Defining an instance for the `Eq` type class
  - Improving our `Eq` type class (minimal complete definition)
  - Defining an instance for a parameterize type.
- The `Ord` type class
  - Exploring `Ord` type class (Subclassing)
- Deriving
- Complete example

### 11. Basic IO

- We need side effects
- What is IO
- main + putStrLn + composing other functions
- `>>`
- `>>=`
- do notation
  - `do`
  - `<-`
  - `let`
- Some examples
- Read/Write to console
- Read/Write to file

### 12. Pragmas, Modules, and Cabal

- Prelude
- pragmas/extensions
- Overview of base modules
- Importing base modules
- A few modules
  - Data.Char
  - Data.Tuple
  - Data.Array
- Creating our own modules
- Cabal
  - What is it and why we use it
  - Cabal file
  - Using external libraries with Cabal

### 13. Bits and Bytes

- Grouping bits and bytes
- Haskell and bytes
- Lazy and strict byte strings
- Example

### 14. Handling Errors

- TODO

### 15. Learning on your own and Map

- Using GHCi to find out more
- Hoogle
- HaskellWiki
- Walking through while teaching Map module

---

### END OF THE BEGINNER SECTION 🐥

---

#### Congratulations! 🥳 You can call yourself a (beginner) Haskell programmer!

#### YOU'RE READY FOR THE MARLOWE PIONEER PROGRAM! 🥳🎉 (Keep going for Plutus.)

---

### START OF THE INTERMEDIATE SECTION 🐥⟶🐓

---

### 16. Monoid

- Basic idea (definition without details)
- Intuitive examples
- Extracting the pattern
- Complete definition (with all the details/laws)

### 17. Functor

- Basic idea (definition without details)
- Intuitive examples
- Extracting the pattern
- Complete definition (with all the details/laws)

### 18. Applicative

- Basic idea (definition without details)
- Intuitive examples
- Extracting the pattern
- Complete definition (with all the details/laws)

### 19. Aeson

- Aeson

### 20. Monad

- Basic idea (definition without details)
- Intuitive examples
- Extracting the pattern
- Complete definition (with all the details/laws)
- `do` notation in general

### 21. Reader Monad

- Incentive/Motivation
- Binding strategy (see [here](https://wiki.haskell.org/All_About_Monads#The_Reader_monad))
- Definition
- Examples

### 22. Writer Monad

- Incentive/Motivation
- Binding strategy
- Definition
- Examples

### 23. State Monad

- Incentive/Motivation
- Binding strategy
- Definition
- Examples

### 24. Monadic functions / Operating with Monads

- liftM
- sequence and sequence\_
- mapM and mapM\_
- filterM
- foldM

### TODO: It keeps going, but I'm not sure about the outline yet. 😬
