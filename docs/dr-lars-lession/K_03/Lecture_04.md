# Bài giảng 4: Emulator Trace and Contract Monads

Plutus Pioneer Program - Cohort 3 
February 3, 2022

Offical Video by Lars Brünjes: [PPP-Cohort3-Lecture4](https://youtu.be/gxMW9uXTEj4)

Google Doc version can be found [HERE](https://docs.google.com/document/d/1gRv1mZdzokLW_UHQzmCmSoW-ioDnj2gOkwxEbeMTjBs/edit#)

## Table of Contents

- [Lecture 4: Emulator Trace and Contract Monads](#lecture-4-emulator-trace-and-contract-monads)
  - [Table of Contents](#table-of-contents)
  - [Preparation for Lecture 4](#preparation-for-lecture-4)
  - [Monads](#monads)
  - [The Emulator Trace Monad](#trình-giả-lập-monad)
  - [The Contract Monad](#the-contract-monad)
  - [Homework Part 1](#homework-part-1)
  - [Homework Part 2](#homework-part-2)

## Chuẩn bị cho bài giảng 4

Trước khi bắt đầu bài giảng 4, trước tiên chúng ta phải cập nhật môi trường phát triển của mình. Bạn có thể sao chép và dán trực tiếp bất kỳ mã nào trong hướng dẫn này vào thiết bị đầu cuối hoặc IDE của mình.

Đầu tiên, hãy đến thư mục plutus-pioneer-program để lấy nội dung bài giảng tuần 4.

```
~/plutus-pioneer-program$ git pull
```

Bây giờ bạn có thể điều hướng đến thư mục week04 hiện tại và mở tệp cabal.project:

```
~/plutus-pioneer-program/code/week04$ cat cabal.project
```

Lấy thẻ plutus-apps bên trong tệp cabal.project:

```
location: https://github.com/input-output-hk/plutus-apps.git
  tag:ea1bfc6a49ee731c67ada3bfb326ee798001701a
```

Quay trở lại thư mục plutus-apps và cập nhật nó vào thẻ git hiện tại:

```
~/plutus-apps$ git checkout main
```
```
~/plutus-apps$ git pull
```
```
~/plutus-apps$ git checkout ea1bfc6a49ee731c67ada3bfb326ee798001701a
```

Bây giờ bạn đã được cập nhật và có thể chạy nix-shell trong thư mục này. 
Chạy nix-shell:

```
~/plutus-apps$ nix-shell
```

Quay trở lại thư mục week04 để bắt đầu chạy các lệnh cabal:

```
[nix-shell:~/plutus-pioneer-program/code/week04]$ cabal update
```
```
[nix-shell:~/plutus-pioneer-program/code/week04]$ cabal build
```
```
[nix-shell:~/plutus-pioneer-program/code/week04]$ cabal repl
```
Nếu thành công, bây giờ bạn đã sẵn sàng để bắt đầu bài giảng:

```
Ok, 9 modules loaded.
Prelude Week04.Contract> 
```

## Monads


Để khám phá một số lớp Haskell mới, chúng ta cần tải hello.hs. Trong nix-shell trong thư mục week04, *run*:

```
[nix-shell:~/plutus-pioneer-program/code/week04]$ cabal repl plutus-pioneer-program-week04:exe:hello
```

Output:

```
Build profile: -w ghc-8.10.4.20210212 -O1
In order, the following will be built (use -v for more details):
 - plutus-pioneer-program-week04-0.1.0.0 (exe:hello) (ephemeral targets)
Preprocessing executable 'hello' for plutus-pioneer-program-week04-0.1.0.0..
GHCi, version 8.10.4.20210212: https://www.haskell.org/ghc/  :? for help
[1 of 1] Compiling Main             ( app/hello.hs, interpreted )
Ok, one module loaded.
*Main>
```


* lưu ý: Nếu repl đang chạy, bạn có thể nhấn CTRL+Z để quay lại nix-shell

Chúng ta đã học về lớp Functor IO.

```haskell
class Functor f where
Plutus Tx version of Functor.
Methods
fmap :: (a -> b) -> f a -> f b
Plutus Tx version of fmap.
```
Ví dụ, Hàm chữ hoa. Đầu tiên import Data.Char:


```
*Main> import Data.Char


*Main Data.Char> toUpper 'q'

Output:
'Q'
```


```
*Main Data.Char> map toUpper "haskell"

Output:
"HASKELL"
```



```
*Main Data.Char> fmap (map toUpper) getLine 
<user input> Haskell

Output:
"HASKELL"
```


Toán tử (>>):

```haskell
(>>) :: Monad m => m a -> m b -> m b
```

```
*Main Data.Char> putStrLn "Hello" >> putStrLn "World"

Output:
Hello
World
```

Toán tử liên kết (>>=):

```haskell
(>>=) :: Monad m => m a -> (a -> m b) -> m b
```
```
*Main Data.Char> getLine >>= putStrLn
<user input> Haskell

Output:
Haskell
```


Return:

```haskell
return :: Monad m => a -> m a
```

```
*Main Data.Char> return "Haskell" :: IO String

Output:
Haskell
```

Một Hàm IO phức tạp hơn trong hello.hs:

```haskell
main :: IO ()
main = bar -- putStrLn "Hello, world!"

bar :: IO ()
bar = getLine >>= \s ->
      getLine >>= \t ->
      putStrLn (s ++ t)
```


Gọi hàm *bar:

```
*Main Data.Char> bar
<user input> one
<user input> two

Output:
onetwo
```

*lưu ý, nếu bạn ở bên ngoài thay thế, bạn có thể trực tiếp chạy hello.hs bằng cách:*

```
[nix-shell:~/plutus-pioneer-program/code/week04]$ cabal run hello
Up to date
<user input> one
<user input> two

Output:
onetwo
```


### Kiểu Maybe:

```haskell
data Maybe a
Constructors
Nothing
 
Just a
```

Ví dụ, đọc. Đầu tiên import Text.Read (readMaybe):

```
*Main Data.Char> import Text.Read (readMaybe)
```
```
*Main Data.Char Text.Read> read "42" :: Int

Output:
42
```
```
*Main Data.Char Text.Read> read "42+x" :: Int

Output:
*** Exception: Prelude.read: no parse
```


readMaybe (lý tưởng hơn, tránh đưa ra một ngoại lệ):

```
*Main Data.Char Text.Read> readMaybe "42+x" :: Maybe Int

Output:
Nothing
```

```
*Main Data.Char Text.Read> readMaybe "42" :: Maybe Int

Output:
Just 42
```

Bây giờ chúng ta sẽ tìm hiểu cách sử dụng phức tạp hơn của read Maybe trong tệp Maybe.hs. Thoát thay thế bằng CTRL+Z, sau đó thực hiện:

```
[nix-shell:~/plutus-pioneer-program/code/week04]$ cabal repl

Output:
Ok, 9 modules loaded.
Prelude Week04.Contract>
```

Bây giờ chúng ta tải tệp Maybe.hs:

```
Prelude Week04.Contract> :l src/Week4/Maybe.hs

Output:
Ok, two modules loaded.
Prelude Week04.Maybe>
```

Bên trong tệp Maybe.hs, trước tiên chúng ta xem xét hàm foo:


```haskell
foo :: String -> String -> String -> Maybe Int
foo x y z = case readMaybe x of
   Nothing -> Nothing
   Just k  -> case readMaybe y of
       Nothing -> Nothing
       Just l  -> case readMaybe z of
           Nothing -> Nothing
           Just m  -> Just (k + l + m)
```

Đầu ra ví dụ của chức năng foo:

```
Prelude Week04.Maybe> foo "1" "2" "3"

Output:
Just 6

Prelude Week04.Maybe> foo "" "2" "3"

Output:
Nothing

Prelude Week04.Maybe> foo "1" "2" ""

Output:
Nothing
```
Bây giờ chúng ta xem xét bindMaybe trong Maybe.hs (để tạo một phiên bản ngắn gọn hơn của hàm foo được gọi là foo' ):


```haskell
bindMaybe :: Maybe a -> (a -> Maybe b) -> Maybe b
bindMaybe Nothing  _ = Nothing
bindMaybe (Just x) f = f x

foo' :: String -> String -> String -> Maybe Int
foo' x y z = readMaybe x `bindMaybe` \k ->
            readMaybe y `bindMaybe` \l ->
            readMaybe z `bindMaybe` \m ->
            Just (k + l + m)
```

Kết quả đầu ra ví dụ của hàm foo' như mong đợi:

```
Prelude Week04.Maybe> foo' "1" "2" "3"

Output:
Just 6

Prelude Week04.Maybe> foo' "" "2" "3"

Output:
Nothing

Prelude Week04.Maybe> foo' "1" "2" ""

Output:
Nothing
```

### Kiểu Either:

```haskell
data Either a b
Constructors

Left a
 
Right b
```

Ví dụ kiểu Either:

```
Prelude Week04.Maybe> Left "Haskell" :: Either String Int

Output:
Left "Haskell"

Prelude Week04.Maybe> Right 7 :: Either String Int

Output:
Right 7
```


Bây giờ chúng tôi tải file Either.hs:

```
Prelude Week04.Contract> :l src/Week04/Either.hs

Output:
Ok, two modules loaded.
Prelude Week04.Either>
```

Bên trong both.hs, trước tiên chúng ta xem xét hàm readEither:

```haskell
readEither :: Read a => String -> Either String a
readEither s = case readMaybe s of
   Nothing -> Left $ "can't parse: " ++ s
   Just a  -> Right a
```

Đầu ra ví dụ của readEither:

```
Prelude Week04.Either> readEither "42" :: Either String Int

Output:
42

Prelude Week04.Either> readEither "42+x" :: Either String Int

Output:
Left "can't parse: 42+x"
```

Sau đó, chúng tôi xem xét hàm foo:


```haskell
readEither :: Read a => String -> Either String a
readEither s = case readMaybe s of
   Nothing -> Left $ "can't parse: " ++ s
   Just a  -> Right a

foo :: String -> String -> String -> Either String Int
foo x y z = case readEither x of
   Left err -> Left err
   Right k  -> case readEither y of
       Left err -> Left err
       Right l  -> case readEither z of
           Left err -> Left err
           Right m  -> Right (k + l + m)
```

Ví dụ đầu ra của foo:

```
Prelude Week04.Either> foo "1" "2" "3"

Output:
Right 6

Prelude Week04.Either> foo "" "2" "3"

Output:
Left "can't parse: "

Prelude Week04.Either> foo "ays" "2" "3"

Output:
Left "can't parse: ays"

Prelude Week04.Either> foo "1" "2" "aws"

Output:
Left "can't parse: aws"
```

Sau đó, chúng tôi xem foo' (phiên bản ngắn gọn hơn của foo):

```haskell
bindEither :: Either String a -> (a -> Either String b) -> Either String b
bindEither (Left err) _ = Left err
bindEither (Right x)  f = f x

foo' :: String -> String -> String -> Either String Int
foo' x y z = readEither x `bindEither` \k ->
            readEither y `bindEither` \l ->
            readEither z `bindEither` \m ->
            Right (k + l + m)
```


Kết quả đầu ra ví dụ của foo' như mong đợi:

```
Prelude Week04.Either> foo' "1" "2" "3"

Output:
Right 6

Prelude Week04.Either> foo' "" "2" "3"

Output:
Left "can't parse: "

Prelude Week04.Either> foo' "ays" "2" "3"

Output:
Left "can't parse: ays"

Prelude Week04.Either> foo' "1" "2" "aws"

Output:
Left "can't parse: aws"
```

Cuối cùng, chúng tôi tải tệp Writer.hs:

```
Prelude Week04.Either> :l src/Week04/Writer.hs

Output:
Ok, two modules loaded.
Prelude Week04.Writer>
```

Hàm quan tâm đầu tiên trong tệp là `number`:

```haskell
number :: Int -> Writer Int
number n = Writer n $ ["number: " ++ show n]
```

Ví dụ về number:

```
Prelude Week04.Writer> number 42

Output:
Writer 42 ["number: 42"]
```

Bây giờ chúng ta nhìn vào foo:

```haskell
foo :: Writer Int -> Writer Int -> Writer Int -> Writer Int
foo (Writer k xs) (Writer l ys) (Writer m zs) =
 let
   s = k + l + m
   Writer _ us = tell ["sum: " ++ show s]
 in
   Writer s $ xs ++ ys ++ zs ++ us
```


Ví dụ về  foo:
```
Prelude Week04.Writer> foo (number 1) (number 2) (number 3)

Output:
Writer 6 ["number: 1","number: 2","number: 3","sum: 6"]
```


Bây giờ chúng ta xem xét hàm bindWriter với foo':

```haskell
bindWriter :: Writer a -> (a -> Writer b) -> Writer b
bindWriter (Writer a xs) f =
 let
   Writer b ys = f a
 in
   Writer b $ xs ++ ys

foo' :: Writer Int -> Writer Int -> Writer Int -> Writer Int
foo' x y z = x `bindWriter` \k ->
            y `bindWriter` \l ->
            z `bindWriter` \m ->
            let s = k + l + m
            in tell ["sum: " ++ show s] `bindWriter` \_ ->
               Writer s []
```



Ví dụ về foo':
```
Prelude Week04.Writer> foo' (number 1) (number 2) (number 3)

Output:
Writer 6 ["number: 1","number: 2","number: 3","sum: 6"]
```
*Cuối cùng, chúng tôi đã xem xét toàn bộ Lớp Monad:*

```haskell
Monad
(>>=) :: Monad m => m a -> (a -> m b) -> m b
(=<<) :: Monad m => (a -> m b) -> m a -> m b
(>>) :: Monad m => m a -> m b -> m b
return :: Monad m => a -> m a
```

## Trình giả lập Monad



Trước khi chúng ta có thể bắt đầu sử dụng Trình giả lập Trace Monad, hãy bắt đầu bằng cách tải bản repl.

```
[nix-shell:~/plutus-pioneer-program/code/week04]$ cabal repl
```


Import Plutus.Trace.Emulator and Data.Default

```
Prelude Week04.Contract> import Plutus.Trace.Emulator

Prelude Plutus.Trace.Emulator Week04.Contract> import Data.Default

Prelude Plutus.Trace.Emulator Data.Default Week04.Contract>
```

Chúng tôi được giới thiệu về Cấu hình giả lập:

```haskell
data EmulatorConfig
Constructors
EmulatorConfig
 
_initialChainState :: InitialChainState
State of the blockchain at the beginning of the simulation. Can be given as a map of funds to wallets, or as a block of transactions.
_slotConfig :: SlotConfig
Set the start time of slot 0 and the length of one slot
_feeConfig :: FeeConfig
Configure the fee of a transaction
```

Sau đó là phiên bản Default Emulator Config:

```haskell
Defined in Wallet.Emulator.Stream
Methods
def :: EmulatorConfig
```

Ví dụ đơn giản Default Emulator Config:

```
Prelude Plutus.Trace.Emulator Data.Default Week04.Contract> 
def :: EmulatorConfig

Output:
EmulatorConfig {_initialChainState = Left (fromList [(Wallet 1bc5f27d7b4e20083977418e839e429d00cc87f3,Value (Map [(,Map [("",100000000)])])),(Wallet 3a4778247ad35117d7c3150d194da389f3148f4a,Value (Map [(,Map [("",100000000)])])),(Wallet 4e76ce6b3f12c6cc5a6a2545f6770d2bcb360648,Value (Map [(,Map [("",100000000)])])),(Wallet 5f5a4f5f465580a5500b9a9cede7f4e014a37ea8,Value (Map [(,Map [("",100000000)])])),(Wallet 7ce812d7a4770bbf58004067665c3a48f28ddd58,Value (Map [(,Map [("",100000000)])])),(Wallet 872cb83b5ee40eb23bfdab1772660c822a48d491,Value (Map [(,Map [("",100000000)])])),(Wallet bdf8dbca0cadeb365480c6ec29ec746a2b85274f,Value (Map [(,Map [("",100000000)])])),(Wallet c19599f22890ced15c6a87222302109e83b78bdf,Value (Map [(,Map [("",100000000)])])),(Wallet c30efb78b4e272685c1f9f0c93787fd4b6743154,Value (Map [(,Map [("",100000000)])])),(Wallet d3eddd0d37989746b029a0e050386bc425363901,Value (Map [(,Map [("",100000000)])]))]), _slotConfig = SlotConfig {scSlotLength = 1000, scSlotZeroTime = POSIXTime {getPOSIXTime = 1596059091000}}, _feeConfig = FeeConfig {fcConstantFee = Lovelace {getLovelace = 10}, fcScriptsFeeFactor = 1.0}}
```

Chạy trình giả lập Trace:

```haskell
runEmulatorTrace :: EmulatorConfig -> EmulatorTrace () -> ([EmulatorEvent], Maybe EmulatorErr, EmulatorState)Source#
Run an emulator trace to completion, returning a tuple of the final state of the emulator, the events, and any error, if any.
```
```
Prelude Plutus.Trace.Emulator Data.Default Week04.Contract> 
runEmulatorTrace def $ return ()

Output:
<pages of data>
```

Ở đây chúng ta thấy rằng đầu ra chứa một lượng dữ liệu quá lớn, tương ứng với các sự kiện giả lập của cấu hình mặc định. Điều này là không thực tế, vì vậy thay vào đó, chúng tôi sẽ sử dụng một trình mô phỏng khác có tên là runEmulatorTraceIO.

Chạy Trình giả lập Trace IO:

```haskell
runEmulatorTraceIO :: EmulatorTrace () -> IO ()
Runs the trace with runEmulatorTrace, with default configuration that prints a selection of events to stdout.
```

Ví dụ đơn giản về Run Emulator TraceIO:

```
Prelude Plutus.Trace.Emulator Data.Default Week04.Contract> 
runEmulatorTraceIO $ return ()

Output:

Final balances
Wallet 1bc5f27d7b4e20083977418e839e429d00cc87f3: 
    {, ""}: 100000000
Wallet 3a4778247ad35117d7c3150d194da389f3148f4a: 
    {, ""}: 100000000
Wallet 4e76ce6b3f12c6cc5a6a2545f6770d2bcb360648: 
    {, ""}: 100000000
Wallet 5f5a4f5f465580a5500b9a9cede7f4e014a37ea8: 
    {, ""}: 100000000
Wallet 7ce812d7a4770bbf58004067665c3a48f28ddd58: 
    {, ""}: 100000000
Wallet 872cb83b5ee40eb23bfdab1772660c822a48d491: 
    {, ""}: 100000000
Wallet bdf8dbca0cadeb365480c6ec29ec746a2b85274f: 
    {, ""}: 100000000
Wallet c19599f22890ced15c6a87222302109e83b78bdf: 
    {, ""}: 100000000
Wallet c30efb78b4e272685c1f9f0c93787fd4b6743154: 
    {, ""}: 100000000
Wallet d3eddd0d37989746b029a0e050386bc425363901: 
    {, ""}: 100000000
```


Chạy trình giả lập TraceIO’

```haskell
runEmulatorTraceIO' :: TraceConfig -> EmulatorConfig -> EmulatorTrace () -> IO ()
```
Như bạn có thể thấy, Run Emulator TraceIO' có thêm hai đối số. Bạn có thể thay đổi cách phân phối ví ban đầu.

TraceConfig ở đâu:

```haskell
data TraceConfig
Options for how to set up and print the trace.
Constructors
TraceConfig
 
showEvent :: EmulatorEvent' -> Maybe String
Function to decide how to print the particular events.
outputHandle :: Handle
Where to print the outputs to. Default: stdout
```

Bây giờ chúng ta sẽ xem xét một ví dụ thực tế trong tệp Trace.hs. 
Tải tệp Trace.hs:

```
Prelude Prelude Plutus.Trace.Emulator Data.Default Week04.Contract> 
:l src/Week04/Trace.hs

Output:
Ok, two modules loaded.
Prelude Prelude Plutus.Trace.Emulator Data.Default Week04.Trace> 
```

Nhìn vào tệp Trace.hs:

```haskell
-- Contract w s e a
-- EmulatorTrace a

test :: IO ()
test = runEmulatorTraceIO myTrace

myTrace :: EmulatorTrace ()
myTrace = do
   h1 <- activateContractWallet (knownWallet 1) endpoints
   h2 <- activateContractWallet (knownWallet 2) endpoints
   callEndpoint @"give" h1 $ GiveParams
       { gpBeneficiary = mockWalletPaymentPubKeyHash $ knownWallet 2
       , gpDeadline    = slotToBeginPOSIXTime def 20
       , gpAmount      = 10000000
       }
   void $ waitUntilSlot 20
   callEndpoint @"grab" h2 ()
   s <- waitNSlots 2
   Extras.logInfo $ "reached " ++ show s
```

Chúng ta có thể chạy theo dõi bằng hàm test:

```
Prelude Prelude Plutus.Trace.Emulator Data.Default Week04.Trace> 
test

Output:
Receive endpoint call on 'give' for Object XXX

Slot 00002: *** CONTRACT LOG: "made a gift of 10000000 lovelace to XXX

Receive endpoint call on 'grab' for Object XXX

Slot 00022: *** USER LOG: reached Slot {getSlot = 22}
Slot 00022: *** CONTRACT LOG: "collected gifts"

Final balances
Wallet 1bc5f27d7b4e20083977418e839e429d00cc87f3: 
    {, ""}: 100000000
Wallet 3a4778247ad35117d7c3150d194da389f3148f4a: 
    {, ""}: 100000000
Wallet 4e76ce6b3f12c6cc5a6a2545f6770d2bcb360648: 
    {, ""}: 100000000
Wallet 5f5a4f5f465580a5500b9a9cede7f4e014a37ea8: 
    {, ""}: 100000000
Wallet 7ce812d7a4770bbf58004067665c3a48f28ddd58: 
    {, ""}: 109995870
Wallet 872cb83b5ee40eb23bfdab1772660c822a48d491: 
    {, ""}: 89999990
Wallet bdf8dbca0cadeb365480c6ec29ec746a2b85274f: 
    {, ""}: 100000000
Wallet c19599f22890ced15c6a87222302109e83b78bdf: 
    {, ""}: 100000000
Wallet c30efb78b4e272685c1f9f0c93787fd4b6743154: 
    {, ""}: 100000000
Wallet d3eddd0d37989746b029a0e050386bc425363901: 
    {, ""}: 100000000
```


## The Contract Monad


```haskell
-- Contract w s e a
```
```haskell
newtype Contract w (s :: Row *) e aSource#
Contract w s e a is a contract with schema s, producing a value of type a or an error e. See note [Contract Schema].
Constructors
Contract
 
unContract :: Eff (ContractEffs w e) a
```
Trong đó w: Cho phép hợp đồng ghi log  kiểu w (có thể truyền thông tin ra bên ngoài)

Where s: Chỉ định những điểm cuối nào khả dụng

Trong đó e: Chỉ định loại thông báo lỗi

Trong đó a: Là kết quả

Trước tiên, chúng ta cần tải tệp Contract.hs:

```
Prelude Prelude Plutus.Trace.Emulator Data.Default Week04.Trace> 
:l src/Week04/Contract.hs

Output:
Ok, one module loaded.
Prelude Prelude Plutus.Trace.Emulator Data.Default Week04.Contract> 
```



Mở file Contract.hs, trước tiên chúng ta sẽ tìm hiểu cách đưa ra lỗi trong hợp đồng:

```haskell
myContract1 :: Contract () Empty Text ()
myContract1 = do
   void $ Contract.throwError "BOOM!"
   Contract.logInfo @String "hello from the contract"

myTrace1 :: EmulatorTrace ()
myTrace1 = void $ activateContractWallet (knownWallet 1) myContract1

test1 :: IO ()
test1 = runEmulatorTraceIO myTrace1
```


Chúng ta có thể kiểm tra myContract1 bằng cách gọi hàm test1:

```
Prelude Prelude Plutus.Trace.Emulator Data.Default Week04.Contract> 
test1

Output:
Slot 00001: *** CONTRACT STOPPED WITH ERROR: "\"BOOM!\""
```
Thay vào đó, chúng ta có thể sửa đổi myContract1 để bắt ngoại lệ. Contract2 hiện được tạo để xử lý ngoại lệ:


```haskell
myContract2 :: Contract () Empty Void ()
myContract2 = Contract.handleError
   (\err -> Contract.logError $ "caught: " ++ unpack err)
   myContract1

myTrace2 :: EmulatorTrace ()
myTrace2 = void $ activateContractWallet (knownWallet 1) myContract2

test2 :: IO ()
test2 = runEmulatorTraceIO myTrace2
```


Chúng ta có thể kiểm tra mycontract2 bằng cách gọi hàm test2:

```
Prelude Prelude Plutus.Trace.Emulator Data.Default Week04.Contract> 
test2

Output:
Slot 00001: *** CONTRACT LOG: "caught: BOOM!"
```

Tạo một hợp đồng mới myContract3, chúng ta có thể xem cách sử dụng các endpoints trong Hợp đồng:

```haskell
type MySchema = Endpoint "foo" Int .\/ Endpoint "bar" String

myContract3 :: Contract () MySchema Text ()
myContract3 = do
   awaitPromise $ endpoint @"foo" Contract.logInfo
   awaitPromise $ endpoint @"bar" Contract.logInfo

myTrace3 :: EmulatorTrace ()
myTrace3 = do
   h <- activateContractWallet (knownWallet 1) myContract3
   callEndpoint @"foo" h 42
   callEndpoint @"bar" h "Haskell"

test3 :: IO ()
test3 = runEmulatorTraceIO myTrace3
```

Chúng ta có thể  kiểm tra contract 3 bằng cách gọi hàm test3:

```
Prelude Prelude Plutus.Trace.Emulator Data.Default Week04.Contract> 
test3

Output:
Receive endpoint call on 'foo' for Object XXX
Contract log: Number 42.0
Receive endpoint call on 'bar' for Object XXX
Slot 00001: *** CONTRACT LOG: "Haskell"
```
Tạo một hợp đồng mới myContract4, chúng ta có thể xem cách để hợp đồng chờ 'n' vị trí:

```haskell
myContract4 :: Contract [Int] Empty Text ()
myContract4 = do
   void $ Contract.waitNSlots 10
   tell [1]
   void $ Contract.waitNSlots 10
   tell [2]
   void $ Contract.waitNSlots 10

myTrace4 :: EmulatorTrace ()
myTrace4 = do
   h <- activateContractWallet (knownWallet 1) myContract4

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

We can test out contract 4 by calling the test4 function:

```
Chúng ta có thể kiểm tra hợp đồng 4 bằng cách gọi hàm test4:

Output:
Slot 00007: *** USER LOG: []
Slot 00007: SlotAdd Slot 8
Slot 00017: *** USER LOG: [1]
Slot 00017: SlotAdd Slot 18
Slot 00027: *** USER LOG: [1,2]
```

## Homework Part 1

```haskell
-- A trace that invokes the pay endpoint of payContract on Wallet 1 twice, each time with Wallet 2 as
-- recipient, but with amounts given by the two arguments. There should be a delay of one slot
-- after each endpoint call.
```

Bài tập về nhà mục tiêu 1 là viết một theo dõi trình giả lập nhận 2 khoản thanh toán số nguyên và sử dụng payContract để thực hiện hai khoản thanh toán cho ví người nhận 2 với độ trễ là một vị trí. Nhập Wallet.Emulator.Wallet: nhập Wallet.Emulator.Wallet

Đầu tiên, chúng ta cần chuyển hai giá trị vào paytrace (tôi đã định nghĩa chúng lần lượt là x , y):

```haskell
payTrace x y = do
```
Thứ hai, chúng ta cần gọi payContract từ Wallet 1:

```haskell
h <- activateContractWallet (knownWallet 1) payContract
let pkh = mockWalletPaymentPubKeyHash $ knownWallet 2
```

Bây giờ, chúng ta cần sử dụng điểm cuối @pay và sử dụng Payparams để thanh toán cho người thụ hưởng Wallet2 với giá trị đầu tiên, x:

```haskell
callEndpoint @"pay" h $ PayParams
       { ppRecipient = pkh
       , ppLovelace  = x
       }

```

Chờ 1 slot trước khi gọi thanh toán tiếp theo:

```haskell
void $ Emulator.waitNSlots 1
```

Bây giờ, chúng ta cần sử dụng lại điểm cuối @pay và sử dụng Payparams để thanh toán cho người thụ hưởng Wallet2 với giá trị thứ hai, y:

```haskell
callEndpoint @"pay" h $ PayParams
       { ppRecipient = pkh
       , ppLovelace  = y
       }
```

Chờ 1 slot sau lần thanh toán thứ 2:

```haskell
void $ Emulator.waitNSlots 1
```

Trình giả lập dấu vết cuối cùng sẽ giống như:

```haskell
payTrace :: Integer -> Integer -> EmulatorTrace ()
payTrace x y = do
   h <- activateContractWallet (knownWallet 1) payContract
   let pkh = mockWalletPaymentPubKeyHash $ knownWallet 2
   callEndpoint @"pay" h $ PayParams
       { ppRecipient = pkh
       , ppLovelace  = x
       }
   void $ Emulator.waitNSlots 1
   callEndpoint @"pay" h $ PayParams
       { ppRecipient = pkh
       , ppLovelace  = y
       }
   void $ Emulator.waitNSlots 1
```


Chạy payTest1 ta được kết quả như sau:

```
Prelude Prelude Plutus.Trace.Emulator Data.Default Week04.Homework> 
payTest1

Output:
Final balances
Wallet 1bc5f27d7b4e20083977418e839e429d00cc87f3: 
    {, ""}: 100000000
Wallet 3a4778247ad35117d7c3150d194da389f3148f4a: 
    {, ""}: 100000000
Wallet 4e76ce6b3f12c6cc5a6a2545f6770d2bcb360648: 
    {, ""}: 100000000
Wallet 5f5a4f5f465580a5500b9a9cede7f4e014a37ea8: 
    {, ""}: 100000000
Wallet 7ce812d7a4770bbf58004067665c3a48f28ddd58: 
    {, ""}: 130000000
Wallet 872cb83b5ee40eb23bfdab1772660c822a48d491: 
    {, ""}: 69999980
Wallet bdf8dbca0cadeb365480c6ec29ec746a2b85274f: 
    {, ""}: 100000000
Wallet c19599f22890ced15c6a87222302109e83b78bdf: 
    {, ""}: 100000000
Wallet c30efb78b4e272685c1f9f0c93787fd4b6743154: 
    {, ""}: 100000000
Wallet d3eddd0d37989746b029a0e050386bc425363901: 
    {, ""}: 100000000
```


## Homework Part 2


Mục tiêu của bài tập 2 là giải thích trường hợp một ví không có đủ tiền để chuyển sang ví thứ hai. Trong payTest2, khoản thanh toán đầu tiên lớn hơn số dư ví trong ví 1. Do đó, chúng tôi cần xử lý lỗi cho khoản thanh toán đầu tiên x, trong khi vẫn tiếp tục hợp đồng để chuyển sang giá trị y.

Trước tiên, chúng ta cần xem xét payContract, cụ thể hơn:

We need to first look at the payContract, more specifically:
```haskell
$ void $ submitTx tx
```

Đầu tiên, vì chúng tôi sẽ sử dụng xử lý lỗi giải nén, chúng tôi cần nhập nó vào tệp:

```haskell
import Data.Text              (Text, unpack)
```

Bây giờ chúng ta có thể sửa đổi dòng gửi giao dịch ở trên để xử lý lỗi, tạo nhật ký và sau đó tiếp tục hợp đồng:

```haskell
handleError (\err -> Contract.logInfo $ "caught error: " ++ unpack err) $ void $ submitTx tx
```

PayContract cuối cùng sẽ giống như sau:

```haskell
payContract :: Contract () PaySchema Text ()
payContract = do
   pp <- awaitPromise $ endpoint @"pay" return
   let tx = mustPayToPubKey (ppRecipient pp) $ lovelaceValueOf $ ppLovelace pp
   handleError (\err -> Contract.logInfo $ "caught error: " ++ unpack err) $ void $ submitTx tx
   payContract
```

Chạy payTest2 ta được kết quả như sau:

```
Prelude Prelude Plutus.Trace.Emulator Data.Default Week04.Homework> 
payTest2

Output:
Slot 00001: *** CONTRACT LOG: "caught error: WalletError (InsufficientFunds

Final balances
Wallet 1bc5f27d7b4e20083977418e839e429d00cc87f3: 
    {, ""}: 100000000
Wallet 3a4778247ad35117d7c3150d194da389f3148f4a: 
    {, ""}: 100000000
Wallet 4e76ce6b3f12c6cc5a6a2545f6770d2bcb360648: 
    {, ""}: 100000000
Wallet 5f5a4f5f465580a5500b9a9cede7f4e014a37ea8: 
    {, ""}: 100000000
Wallet 7ce812d7a4770bbf58004067665c3a48f28ddd58: 
    {, ""}: 120000000
Wallet 872cb83b5ee40eb23bfdab1772660c822a48d491: 
    {, ""}: 79999990
Wallet bdf8dbca0cadeb365480c6ec29ec746a2b85274f: 
    {, ""}: 100000000
Wallet c19599f22890ced15c6a87222302109e83b78bdf: 
    {, ""}: 100000000
Wallet c30efb78b4e272685c1f9f0c93787fd4b6743154: 
    {, ""}: 100000000
Wallet d3eddd0d37989746b029a0e050386bc425363901: 
    {, ""}: 100000000
```
