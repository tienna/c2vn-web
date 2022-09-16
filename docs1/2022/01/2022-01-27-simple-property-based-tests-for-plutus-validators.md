# Các bài kiểm tra thuộc tính đơn giản cho trình xác thực Plutus

### **Cách viết mã off-chain với thư viện 'cook-validators' và nhận các bài kiểm tra thuộc tính đơn giản một cách miễn phí**

![](img/2022-01-27-simple-property-based-tests-for-plutus-validators.002.png) 27 tháng 1 năm 2022 ![](img/2022-01-27-simple-property-based-tests-for-plutus-validators.002.png) [Victor Cacciari Miraldo](/en/blog/authors/victor-miraldo/page-1/) ![](img/2022-01-27-simple-property-based-tests-for-plutus-validators.003.png) 8 phút đọc

![Victor Cacciari Miraldo](img/2022-01-27-simple-property-based-tests-for-plutus-validators.004.jpeg)[](/en/blog/authors/victor-miraldo/page-1/)

### [**Victor Cacciari Miraldo**](/en/blog/authors/victor-miraldo/page-1/)

Software Engineer

![Các bài kiểm tra thuộc tính đơn giản cho trình xác thực Plutus](https://github.com/cardano2vn/iohk-blog/blob/main/vi/docs1/2022/01/img/2022-01-27-simple-property-based-tests-for-plutus-validators.005.jpeg?raw=true)

*Gần đây, chúng tôi đã nghe [Victor Miraldo](https://victorcmiraldo.github.io/) , người đứng đầu nhóm kiểm toán và xác minh hợp đồng thông minh tại [Tweag](https://www.tweag.io/) trình bày về tầm quan trọng của việc xác minh vì lý do bảo mật trong thế giới tài chính phi tập trung (DeFi). Victor là kỹ sư về các giải pháp đến từ ngôn ngữ lập trình Haskell và cam kết đảm bảo tính an toàn, chính xác của các ứng dụng phi tập trung (DApps) thông qua các công cụ và quy trình. Trong bài này, anh ấy đề cập đến việc viết và triển khai DApp theo cách đơn giản là chưa đủ, và tại sao mọi nhà phát triển nên kiểm tra thật kỹ tất cả mã on-chain và tập lệnh Plutus để ngăn chặn và loại bỏ các tác nhân xấu. Vì vậy, anh ấy giới thiệu một thư viện các công cụ sẵn có để tương tác với các tập lệnh của trình xác thực Plutus - được gọi là [cooked-validators](https://github.com/tweag/plutus-libs/tree/main/cooked-validators) , được phát triển tại Tweag. Thư viện này giúp triển khai layer ở phía trong cùng cho mã của off-chain, nó chịu trách nhiệm tạo và gửi các giao dịch. Bằng cách sử dụng thư viện này, bạn có thể nhận các bài kiểm tra thuộc tính đơn giản ở cấp độ giao dịch một cách miễn phí.*

*Hãy nghe Victor nói về việc sử dụng thư viện cooked-validators.*

## **Giới thiệu**

Việc kiểm tra cấp độ giao dịch cho phép chúng tôi gửi các giao dịch tùy ý tới các tập lệnh trình xác thực và đánh giá hành vi của chúng. Quá trình này khác với việc kiểm tra toàn bộ hợp đồng thông minh bằng cách sử dụng các điểm cuối đã xác định như một phần mã off-chain của hợp đồng. Rốt cuộc, mã off-chain đó được thiết kế để kết hợp với mã on-chain và sẽ được kiểm tra về độ an toàn và bảo mật nội tại của nó. Phương pháp này áp dụng đối với các hoạt động vận hành bình thường, nhưng khi thử nghiệm, nó thường giúp các tập lệnh trình xác thực on-chain tránh gặp phải sai sót hoặc độc hại ở các đầu vào (inputs). Do đó, để kiểm tra cấp độ giao dịch, chúng tôi muốn mã off-chain phải được bảo vệ và các đoạn mã on-chain phải có khả năng tương tự như cơ sở hạ tầng off-chain được tạo theo cách thủ công mà kẻ tấn công mang tới. Tương tự với các dịch vụ web, bạn thường muốn kiểm tra máy chủ của mình bằng cách gửi cho nó các yêu cầu tùy ý, ngoài những yêu cầu giao diện người dùng mà máy chủ cho phép.

Thư viện cooked-validators cho phép bạn viết mã off-chain có thể chịu trách nhiệm tạo, gửi các giao dịch và sử dụng cùng một mã để thực hiện và kiểm tra hợp đồng của bạn ở cấp giao dịch. Điều này làm cho việc viết các bài kiểm tra cho on-chain trở nên dễ dàng hơn nhiều, qua đó phát hiện ra một số điều tồi tệ có thể hoặc không thể xảy ra.

## **Giới thiệu về thư viện 'cooked-validators'**

Việc xây dựng hợp đồng của bạn với cooked-validators không khác nhiều so với những gì bạn đã quen với Hợp đồng đơn nguyên. Giả sử bạn đã làm theo [hướng dẫn về Hợp đồng phân tách](https://plutus-apps.readthedocs.io/en/latest/plutus/tutorials/basic-apps.html#defining-the-validator-script) bao gồm phần 'Xác định tập lệnh trình xác thực'. Cuối cùng, bạn có một hàm [splitValidator](https://github.com/tweag/plutus-libs/blob/30f4c061cc8d38e5968bbb6418b40a6f4e9e25fa/examples/src/Split.hs) thực thi phần *on-chain* của hợp đồng đó. Nếu bạn không làm theo hướng dẫn, hợp đồng splitValidator sẽ khóa một lượng tiền nhất định mà chỉ có thể mở được bằng cách chia tiền cho cả hai bên đã được chỉ định từ trước.

Bây giờ, để tương tác với chính hợp đồng đó, chúng ta cần viết mã *off-chain*, mã này tạo và gửi các giao dịch cần thiết đến blockchain. Thay vì làm điều đó trực tiếp trong Hợp đồng đơn nguyên, chúng tôi sẽ dựa vào thư viện cooked-validators. Giao dịch [lockFunds](https://plutus-apps.readthedocs.io/en/latest/plutus/tutorials/basic-apps.html#locking-the-funds) có thể được viết như sau:

lockFunds :: (MonadBlockChain m) =&gt; SplitData -&gt; m ()

lockFunds s@SplitData{amount} = void $ validateTxConstr

`  `[PaysScript splitValidator [(datum, Ada.toValue amount)]]

Điều này rất giống với [lockFunds](https://plutus-apps.readthedocs.io/en/latest/plutus/tutorials/basic-apps.html#locking-the-funds) mà chúng tôi đã viết trực tiếp trong Hợp đồng đơn nguyên. Sự khác biệt là ở đây là chúng tôi đã sử dụng đơn nguyên [MonadBlockChain](https://github.com/tweag/plutus-libs/blob/30f4c061cc8d38e5968bbb6418b40a6f4e9e25fa/cooked-validators/src/Cooked/MockChain/Monad.hs#L45) một cách tùy ý. Kỹ thuật này cho phép chúng tôi sử dụng cùng một lockFunds cho hai mục đích:

1. Tạo giao dịch, vì Hợp đồng đơn nguyên là một bản sao của MonadBlockChain, và
2. Viết các bài kiểm tra cho các trình xác nhận *on-chain* bằng cách sử dụng cơ sở là cooked-validators.

Giả sử rằng chúng tôi cũng đã xác định các giao dịch unlockFunds ([mã để sử dụng](https://github.com/tweag/plutus-libs/blob/30f4c061cc8d38e5968bbb6418b40a6f4e9e25fa/examples/src/Split/OffChain.hs#L54)), để cooked-validators sẽ tương tác liền mạch với Hợp đồng đơn nguyên. Trên thực tế, chúng ta có thể định nghĩa hàm endpoints giống như trong [hướng dẫn](https://plutus-apps.readthedocs.io/en/latest/plutus/tutorials/basic-apps.html#deploying-the-app-on-the-playground) :

endpoints :: (AsContractError e) =&gt; Promise w SplitSchema e ()

endpoints = selectList [lock, unlock]

`  `where

`    `lock = endpoint @"lock" (lockFunds . mkSplitData)

`    `unlock = endpoint @"unlock" (const unlockFunds)

## **Kiểm tra hợp đồng**

Bởi vì chúng tôi đã xác định layer đầu tiên của mã off-chain của chúng tôi (tạo và gửi các giao dịch thô) với cooked-validators, chúng tôi có thể sử dụng cơ sở hạ tầng thử nghiệm của nó để kiểm tra trình xác thực *on-chain*. Một bài kiểm tra cơ bản về việc có thể mở các khoản tiền đã bị khóa hay không được viết như sau:

unlockPossible1 = assertSucceeds $ do

`  `lockFunds sd `as` wallet 1 -- sends the lockFunds pretending to be user 1,

`  `unlockFunds `as` wallet 2 -- sends the unlockFunds pretending to be user 2.

where

`  `-- makes a split of 10 ada between users 2 and 3 that only those users should be able to unlock.

`  `sd = SplitData (wallet 2) (wallet 3) 10

Ở đây, bộ tổ hợp *as* chỉ hoạt động khi thử nghiệm mã và nó cho phép chúng tôi tương tác với hợp đồng của mình theo cách giống như nhiều người đã dùng.

Chức năng unlockPossible1 là một đơn vị để kiểm tra xem có điều gì tốt xảy ra hay không. Chúng tôi có thể dễ dàng kiểm tra xem có điều gì đó tồi tệ *không* xảy ra không:

unlockImpossible1 = assertFails $ do

`  `lockFunds sd `as` wallet 1

`  `unlockFunds `as` wallet 5 -- user 5 shouldn't be able to unlock the funds.

where

`  `sd = SplitData (wallet 2) (wallet 3) 10

Chúng tôi cũng có thể sử dụng các bài kiểm tra này như các bài *kiểm tra thuộc tính đơn giản*. Trong trường hợp này, thuộc tính đang được kiểm tra là một trong hai người nhận phân tách luôn luôn có thể mở khóa:

unlockProp1 = forAllTr tr assertSucceeds

`  `where

`    `tr = do

`      `-- generates a random SplitData

`      `sd &lt;- genSplitData

code0} -- generates a random wallet; anyone can lock funds.

`      `w &lt;- genArbitraryWallet

`      `lockFunds sd `as` w

` `-- but only the recipients can unlock the funds

`      `unlocker &lt;- choose [ recipient1 params , recipient2 params ]

`      `unlockFunds `as` unlocker

Ngoài ra, nếu một trong các thử nghiệm của chúng tôi không thành công, chúng tôi sẽ nhận được một bản tóm tắt về các giao dịch khiến thử nghiệm không thành công. Dưới đây là đoạn trích của ba giao dịch đầu tiên từ một lần thử nghiệm không thành công của trình xác thực có liên quan:

\1) ValidateTxSkel

`     `- Signers: [wallet #1 (a2c20c)]

`     `- Label: ProposalSkel 2(Payment{paymentAmount = 4200000,paymentRecipient = a96a66})

`     `- Constraints:

`        `/\ Mints

`            `- (18ab4cc $ "threadToken"): 1

`            `- Policies: [18ab4c]

`        `/\ PaysScript script 9d52e00:

`            `- Accumulator{payment = Payment{paymentAmount = 4200000,paymentRecipient = a96a66},signees = []}

`              `{ Lovelace: 6200000

`                `(18ab4cc $ "threadToken"): 1 }

\2) ValidateTxSkel

`     `- Signers: [wallet #1 (a2c20c)]

`     `- Constraints:

`        `/\ PaysScript script 9d52e00:

`            `- Sign{signPk = a2c20c,signSignature = 8fef22}

`              `Lovelace: 1

\3) ValidateTxSkel

`     `- Signers: [wallet #2 (80a4f4)]

`     `- Constraints:

`        `/\ PaysScript script 9d52e00:

`            `- Sign{signPk = 80a4f4,signSignature = 6853e0}

`              `Lovelace: 1

...

Dấu vết được hiển thị cho nhà phát triển chứa tất cả thông tin cần thiết để gỡ lỗi sự cố và nó cố gắng trình bày thông tin theo cách có thể đọc được.

Ngoài kiểm tra thuộc tính đơn giản, cooked-validators cũng cung cấp khả năng sửa đổi các giao dịch dựa vào theo dõi một số chức năng. Điều này có thể mô phỏng một cuộc tấn công theo nhiều cách khác nhau. Ví dụ, viết một bài kiểm tra như:

attackNotPossibleOnSplit = assertFails $ do

`  `somewhere doAttack $ do

`    `lockFunds sd `as` wallet 1

`    `unlockFunds `as` wallet 2

` `where

`  `sd = SplitData (wallet 2) (wallet 3) 10

sẽ khiến cooked-validators cố gắng thực hiện hai thử nghiệm, cả hai đều không thành công, như sau:

1. Sửa đổi giao dịch sd lockFunds theo doAttack và gửi; sau đó gửi một unlockFunds không sửa đổi hoặc
2. Gửi sd lockFunds; sau đó sửa đổi và gửi unlockFunds theo doAttack.

Các chi tiết của bộ tổ hợp ở một số chỗ có thể hơi phức tạp, do vậy trong bài viết này chúng tôi sẽ bỏ qua. Có một [bài blog](https://www.tweag.io/blog/2022-01-26-property-based-testing-of-monadic-code) riêng đưa ra các chi tiết kỹ thuật trên blog Tweag cho những ai quan tâm.

## **Các thư viện có liên quan và kết luận**

Mặc dù Plutus [đã hỗ trợ](https://plutus-pioneer-program.readthedocs.io/en/latest/pioneer/week8.html#property-based-testing) một hình thức kiểm tra thuộc tính đơn giản của các điểm kết thúc hợp đồng (endpoints) với lớp [ContractModel](https://marlowe-playground-staging.plutus.aws.iohkdev.io/doc/haddock/plutus-contract/html/Plutus-Contract-Test-ContractModel.html) của nó, nó không cung cấp kiểm tra ở cấp độ giao dịch. Kiểm tra cấp độ giao dịch là rất quan trọng đối với chúng tôi tại Tweag. Khi kiểm tra một hợp đồng Plutus, chúng ta cần có khả năng hoạt động như một kẻ tấn công và sửa đổi các giao dịch để nghiên cứu cách những người xác nhận sẽ phản ứng.

Bằng cách sử dụng cooked-validators để phát triển mã off-chain của bạn, bạn có thể tự kiểm tra nhiều thuộc tính an toàn và chính xác của mã on-chain và điều này có thể làm tăng đáng kể sự tin tưởng vào tính đúng đắn của mã. Điều đó có thể tiết kiệm thời gian và tiền bạc trong quá trình kiểm tra. Trên thực tế, bước đầu tiên của quá trình kiểm tra Tweag là viết mã tạo giao dịch bằng cách sử dụng cooked-validators, để sau đó có thể tương tác với cơ sở hạ tầng của chúng tôi một cách tự do.

Bài này được dịch bởi Max Long, Review bởi Pham Quang, biên tập bởi Nguyễn Hiệu. Bài viết nguồn [tại đây](https://iohk.io/en/blog/posts/2022/01/27/simple-property-based-tests-for-plutus-validators)
*Dự án này được tài trợ bới Catalyst*
