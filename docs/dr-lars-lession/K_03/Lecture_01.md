# Bài giảng 1: EUTxO và đấu giá kiểu Anh


Plutus Pioneer Program - Cohort 3
January 12, 2022

Offical Video by Lars Brünjes: [PPP-Cohort3-Lecture1](https://www.youtube.com/watch?v=X80uNXenWF4&list=PLNEK_Ejlx3x2nLM4fAck2JS6KhFQlXq2N)

Google Doc version can be found [HERE](https://docs.google.com/document/d/1cd1wtXYH3ej8udF02cV9cyJYziPqln-uPyCPlFMANKM/edit?usp=sharing)


## Table of Contents

- [Lecture 1: EUTxO and English Auction](#lecture-1-eutxo-and-english-auction)
  - [Table of Contents](#table-of-contents)
  - [Preparation for Lecture 1](#preparation-for-lecture-1)
  - [The EUTxO Model](#the-eutxo-model)
  - [The Auction Contract in the EUTxO Model](#the-auction-contract-in-the-eutxo-model)
  - [The Auction Contract in Plutus Playground](#the-auction-contract-in-plutus-playground)
    - [Simulation](#simulation)
    - [Evaluation](#evaluation)
  - [Homework](#homework)
  
## Chuẩn bị cho bài giảng 1
Trước khi bắt đầu bài giảng 1, trước tiên chúng ta phải thiết lập môi trường phát triển.

Hướng dẫn này sẽ sử dụng bản cài đặt mới của Ubuntu Linux. Nếu bạn muốn sử dụng Linux nhưng chỉ có một máy tính cài đặt Windows, bạn có thể chạy một môi trường ảo bên trong Windows. Bạn có thể tìm thấy hướng dẫn từng bước tuyệt vời về cách bắt đầu tại đây:<br/>
[How to install an Ubuntu VM in Windows](https://youtu.be/x5MhydijWmc)

Bạn có thể sao chép và dán trực tiếp bất kỳ mã nào trong hướng dẫn này vào thiết bị đầu cuối hoặc IDE của mình. Nếu bạn chưa quen với Linux và không quen với các lệnh trình bao đầu cuối, bảng cheat này cung cấp tổng quan nhanh:<br/>
[Linux Command Master List](https://drive.google.com/file/d/10xz7Dm3E_20doL08Wu_dfWJqiIfvTKlc/view?usp=sharing)


Tài liệu về cá tuyết chấm đen cũng là một nguồn thông tin tuyệt vời cho tất cả các thư viện plutus công cộng. Điều này có thể được tìm thấy ở đây:<br/>
[Documentation for all public Plutus Libraries](https://www.google.com/url?q=https://playground.plutus.iohkdev.io/doc/haddock/&sa=D&source=editors&ust=1644942252629960&usg=AOvVaw2eoK-uGZuqWIqtuCZt0t_H)

Đầu tiên, Mở terminal để bắt đầu. Trước tiên, chúng tôi sẽ cài đặt các phụ thuộc cần thiết trước cho một bản sao Linux mới.

Chúng ta cần cài đặt Nix và cấu hình nó đúng cách để sử dụng bộ đệm của IOG. Trong hướng dẫn này, chúng tôi sẽ thực hiện cài đặt một người dùng. Trước khi chúng tôi có thể cài đặt Nix, chúng tôi cần đảm bảo rằng phiên bản Linux bạn đang sử dụng đã được cài đặt cả curl và git. Lần chạy đầu tiên:

```
sudo sh -c 'apt update && apt install curl'
```


Bây giờ curl đã được cài đặt, chúng ta có thể cài đặt git. Chạy:


```
sudo apt-get install git
```

Bây giờ chúng ta có thể cài đặt cài đặt Nix một user. Chạy:

```
sh <(curl -L https://nixos.org/nix/install) --no-daemon
```


```
Output:
Installation finished!  To ensure that the necessary environment
variables are set, either log in again, or type
  . /home/totinj/.nix-profile/etc/profile.d/nix.sh
```


Bây giờ để kết thúc, chúng ta cần thiết lập môi trường với thông báo lệnh sau từ phía trên. Rất quan trọng ở đây bạn thay thế `totinj` bằng user Linux hiện tại của bạn!!
```
. /home/totinj/.nix-profile/etc/profile.d/nix.sh
```


Bây giờ chúng ta cần thêm bộ nhớ đệm Đầu ra, Đầu vào để tăng tốc đáng kể quá trình xây dựng. Nếu không có bước này, bạn có thể chạy nix-shell trong nhiều ngày thay vì vài phút! Điều này có thể được tìm thấy ở đây:  [IOG Binaries](https://github.com/input-output-hk/plutus-apps#iohk-binary-cache). Hãy tạo một tệp cấu hình mới có các liên kết IOG được liên kết. Chạy:
```
mkdir ~/.config/nix
echo 'substituters = https://hydra.iohk.io https://iohk.cachix.org https://cache.nixos.org/' >> ~/.config/nix/nix.conf
echo 'trusted-public-keys = hydra.iohk.io:f/Ea+s+dFdN+3Y/G+FDgSq+ani5NEWhJGzdjvKNGv0/EQ= iohk.cachix.org-1:DpRUyj7h7V830dp/i6Nti+NEO2/nhblbov/8MW7Rqoo= cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY=' >> ~/.config/nix/nix.conf
```
Nếu CPU là ARM thì thêm vào ~/.config/nix/nix.conf

```
extra-platforms = x86_64-darwin aarch64-darwin
```
or tạm thời dùng lệnh dưới đây khi chạy nix-shell
```
nix-build default.nix  --argstr system x86_64-darwin --option extra-platforms  "x86_64-darwin aarch64-darwin"
```
Với Nix hiện đã được cài đặt và định cấu hình, chúng tôi sẽ sao chép các kho lưu trữ thích hợp từ github. Chúng tôi sẽ sao chép các ứng dụng plutus và chương trình tiên phong plutus. Đầu tiên, hãy clone plutus-apps:

```
git clone https://github.com/input-output-hk/plutus-apps.git
```
Tiếp theo, hãy sao chép repo plutus-pioneer-program:

```
git clone https://github.com/input-output-hk/plutus-pioneer-program.git
```

Bây giờ bạn có thể điều hướng đến thư mục week01 hiện tại trong thư mục chương trình plutus-pioneer và mở tệp cabal.project:

```
cat ~/plutus-pioneer-program/code/week01/cabal.project
```
Lấy thẻ plutus-apps bên trong tệp cabal.project:

```
location: https://github.com/input-output-hk/plutus-apps.git
 tag:41149926c108c71831cfe8d244c83b0ee4bf5c8a
```
Quay trở lại thư mục plutus-apps và cập nhật nó vào thẻ git hiện tại:

```
~/plutus-apps$ git checkout main
```
```
~/plutus-apps$ git pull
```
```
~/plutus-apps$ git checkout 41149926c108c71831cfe8d244c83b0ee4bf5c8a
```


Bây giờ bạn đã được cập nhật và có thể chạy nix-shell trong thư mục này. 
bạn chạy để mở một tab có thể chạy ẩn

```
tmux
```

và Chạy nix-shell:

```
~/plutus-apps$ nix-shell
```
Nix-shell sẽ mất khá nhiều thời gian để xây dựng trong lần đầu tiên bạn chạy nó, vì vậy hãy kiên nhẫn. Nếu bạn đã thiết lập chính xác bộ đệm của mình, bạn sẽ thấy nó được xây dựng từ https://hydra.iohk.io. Nếu thành công, bạn sẽ thấy nix-shell:

```
[nix-shell:~/plutus-apps]$ 
```


Quay trở lại thư mục week01 để bắt đầu chạy các lệnh cabal:
```
[nix-shell:~/plutus-pioneer-program/code/week01]$ cabal update
```
```
[nix-shell:~/plutus-pioneer-program/code/week01]$ cabal build
```
```
[nix-shell:~/plutus-pioneer-program/code/week01]$ cabal repl
```
Những thứ này cũng sẽ mất nhiều thời gian để chạy lần đầu tiên. Nếu thành công, bây giờ bạn đã sẵn sàng để bắt đầu bài giảng:

```haskell
Ok, one module loaded.
Prelude Week01.EnglishAuction> 
```

## The EUTxO Model

Đây là bản ghi video bài giảng về EUTxOs của Lars Brünjes. Thông tin thêm về các mô hình EUTxO có thể được tìm thấy tại đây:<br/> [Accounting Systems for Blockchains](https://iohk.io/en/blog/posts/2021/03/11/cardanos-extended-utxo-accounting-model/) <br/><br/>
Một trong những điều quan trọng nhất bạn cần hiểu để viết hợp đồng thông minh Plutus là mô hình kế toán mà Cardano sử dụng; và đó là cái gọi là mô hình (E)UTxO, là từ viết tắt của mô hình đầu ra giao dịch chưa chi tiêu mở rộng. Mô hình UTxO mà không được mở rộng là mô hình đã được giới thiệu bởi Bitcoin. Nhưng có những mô hình khác. Ethereum, ví dụ, sử dụng cái gọi là mô hình dựa trên tài khoản, đó là những gì bạn đã quen với một ngân hàng bình thường, nơi mọi người đều có tài khoản và mỗi tài khoản có số dư. Và nếu bạn chuyển tiền từ tài khoản này sang tài khoản khác, thì số dư sẽ được cập nhật tương ứng, nhưng đó không phải là cách hoạt động của mô hình UTxO. Đầu ra giao dịch chưa được xác định đúng như tên gọi.<br/>

![Screenshot 2022-03-22 at 19-54-02 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159595570-f8a5f9e9-3cfe-4213-8ce0-bab6937de382.png)

Vì vậy, hãy xem một ví dụ trong đó chúng ta có hai UTxO như vậy, một thuộc về Alice, 100 ADA và một thuộc về Bob, 50 ADA. Và để làm ví dụ, giả sử rằng Alice muốn gửi 10 ADA cho Bob. Vì vậy, cô ấy tạo một giao dịch và giao dịch là thứ có đầu vào và đầu ra, có thể là số lượng đầu vào tùy ý và số lượng đầu ra tùy ý. Và một điều quan trọng là bạn luôn có thể chỉ sử dụng các UTxO hoàn chỉnh làm đầu vào. Vì vậy, nếu cô ấy muốn gửi 10 ADA cho Bob, cô ấy không thể đơn giản chia 100 ADA hiện có của mình thành 90 đến 10 phần. Cô ấy phải sử dụng toàn bộ 100 ADA làm đầu vào. 

![Screenshot 2022-03-22 at 19-55-18 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159595764-3208715a-08c2-4811-83b4-91939b4f7a48.png)

Vì vậy, bằng cách sử dụng UTxO 100 ADA làm đầu vào cho giao dịch. Alice đã không sử dụng UTxO đó, vì vậy nó không còn là UTxO nữa. Nó không còn là không được sử dụng, nó đã được sử dụng. Và bây giờ cô ấy có thể tạo đầu ra cho một giao dịch. Vì vậy, cô ấy muốn trả 10 ADA cho Bob. Vì vậy, một đầu ra sẽ là 10 ADA cho Bob, và sau đó cô ấy muốn trả lại số tiền thừa của mình. Vì vậy, cô ấy tạo ra đầu ra thứ hai là 90 ADA cho chính mình.<br/>

![Screenshot 2022-03-22 at 19-56-56 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159595910-34d76fae-61fc-4d57-9f55-602cd0f26461.png)

Và đây là cách, mặc dù bạn luôn phải sử dụng các UTxO hoàn chỉnh, nhưng bạn vẫn có thể nhận lại tiền thừa của mình. Vì vậy, bạn sử dụng UTxO hoàn chỉnh, nhưng sau đó bạn tạo đầu ra cho thay đổi và lưu ý rằng trong một giao dịch, tổng giá trị đầu vào phải bằng tổng giá trị đầu ra. Vì vậy, trong trường hợp này, 100 ADA được đưa vào và 10 cộng với 90 ADA được rút ra. Đây là nói nghiêm túc, không đúng sự thật. Có hai trường hợp ngoại lệ, ngoại lệ đầu tiên là phí giao dịch. Vì vậy, trong blockchain thực cho mỗi giao dịch, bạn phải trả phí. Vì vậy, điều đó có nghĩa là tổng giá trị đầu vào phải cao hơn một chút so với tổng giá trị đầu ra để đáp ứng các khoản phí. Và ngoại lệ thứ hai là các mã thông báo gốc mà chúng tôi có trên Cardano. Vì vậy, các giao dịch có thể tạo mã thông báo mới. Trong trường hợp đó, đầu ra sẽ cao hơn đầu vào hoặc để ghi mã thông báo, trong trường hợp đó đầu vào sẽ cao hơn đầu ra. Nhưng đó là một chủ đề hơi nâng cao, làm thế nào để xử lý việc đúc và đốt các mã thông báo gốc trong Plutus. Và chúng ta sẽ quay lại vấn đề đó sau trong khóa học. Vì vậy, hiện tại chúng tôi chỉ xem xét các giao dịch trong đó tổng giá trị đầu vào bằng tổng giá trị đầu ra.

Vì vậy, đây là ví dụ đầu tiên về giao dịch đơn giản và chúng tôi thấy rằng tác động của giao dịch là tiêu thụ và chi tiêu đầu ra của giao dịch và tạo ra giao dịch mới. Vì vậy, trong ví dụ này, một UTxO đã được sử dụng, 100 ADA UTxO ban đầu của Alice và hai UTxO mới đã được tạo. Một 90 ADA UTxO thuộc về Alice và 10 ADA UTxO khác thuộc về Bob. Điều quan trọng cần lưu ý rằng đây là điều duy nhất xảy ra trên chuỗi khối UTxO. Điều duy nhất xảy ra khi một giao dịch mới được thêm vào chuỗi khối là một số UTxO sẽ được sử dụng và UTxO xuất hiện. Vì vậy, cụ thể là không có gì thay đổi, không có giá trị hoặc bất kỳ dữ liệu nào khác liên quan đến đầu ra giao dịch được thay đổi. Điều duy nhất thay đổi bởi một giao dịch mới là một số đầu ra giao dịch chưa được sử dụng trước đây biến mất và những đầu ra khác được tạo ra, nhưng bản thân kết quả đầu ra không bao giờ thay đổi. Điều duy nhất thay đổi là liệu chúng có được sử dụng hay không.

Hãy làm một ví dụ khác, một ví dụ phức tạp hơn một chút khi Alice và Bob cùng nhau muốn trả 55 ADA mỗi người cho Charlie. Vì vậy, họ cùng nhau tạo ra một giao dịch. Và với tư cách là đầu vào, Alice không có lựa chọn nào khác, cô ấy chỉ có một UTxO, vì vậy cô ấy sử dụng cái đó. Và Bob cũng không có lựa chọn nào khác vì cả hai UTxO của anh ấy đều không đủ lớn để bao phủ 55 ADA. Vì vậy, Bob phải sử dụng cả hai UTxO của mình làm đầu vào.

![Screenshot 2022-03-22 at 19-58-43 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159596144-411b6d09-bbfa-4636-b6dd-a3df3b52776a.png)

Lần này chúng ta cần ba đầu ra, một là 55 cộng 55 bằng 110 ADA cho Charlie, và hai đầu ra thay đổi, một cho thay đổi của Alice và một cho thay đổi của Bob. Vì vậy, Alice đã trả 90, vì vậy cô ấy sẽ nhận được 35 tiền lẻ và Bob trả 60. Vì vậy, anh ấy sẽ nhận được 5 tiền lẻ.

![Screenshot 2022-03-22 at 20-01-15 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159596202-c5f5b1e7-dd5a-4764-861f-4ba4bea294c4.png)

Một điều tôi chưa giải thích là trong những điều kiện nào thì một giao dịch có thể chi tiêu một UTxO nhất định. Rõ ràng sẽ không phải là một ý tưởng hay nếu bất kỳ giao dịch nào có thể chi tiêu UTxO tùy ý, nếu đúng như vậy, thì Bob có thể chi tiêu tiền của Alice mà không cần sự đồng ý của cô ấy. Vì vậy, cách thức hoạt động của nó là bằng cách thêm chữ ký vào các giao dịch, ví dụ đầu tiên của chúng ta, giao dịch của chúng ta, bởi vì điều đó sử dụng một UTxO thuộc về Alice làm đầu vào. Chữ ký của Alice phải được thêm vào giao dịch. Và trong ví dụ thứ hai, vì có đầu vào thuộc về cả Alice và Bob nên cả Alice và Bob đều phải ký vào giao dịch đó, tình cờ đây lại là điều bạn không thể thực hiện trong Daedalus. Vì vậy, bạn sẽ phải sử dụng Cardano CLI cho các giao dịch phức tạp như vậy.

Mọi thứ tôi đã giải thích cho đến nay chỉ là về mô hình UTxO, không phải mô hình UTxO mở rộng. Vì vậy, đây chỉ là một mô hình UTxO đơn giản. Và phần mở rộng xuất hiện khi chúng ta nói về hợp đồng thông minh. Vì vậy, để hiểu điều đó, chúng ta hãy chỉ tập trung vào một mức tiêu thụ trên UTxO theo đầu vào. 

![Screenshot 2022-03-22 at 20-02-40 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159596277-5db97b72-55fc-4edb-b273-1c9399c3cf7e.png)

Và như tôi vừa giải thích, việc xác thực quyết định liệu giao dịch mà đầu vào này thuộc về có được phép sử dụng hay không mà bạn thực hiện trong mô hình UTxO đơn giản dựa trên chữ ký điện tử. Vì vậy, trong trường hợp này, Alice phải ký giao dịch để việc tiêu thụ UTxO này có hiệu lực. Và bây giờ, ý tưởng về mô hình UTxO mở rộng là làm cho điều này trở nên tổng quát hơn. Vì vậy, thay vì chỉ có một điều kiện, cụ thể là có chữ ký phù hợp trong giao dịch. Chúng tôi thay thế điều này bằng logic tùy ý và đây là lúc Plutus xuất hiện.

Vì vậy, thay vì chỉ có một địa chỉ tương ứng với khóa chung và địa chỉ đó có thể được xác minh bằng chữ ký được thêm vào giao dịch, thay vào đó, chúng tôi có nhiều địa chỉ chung hơn không dựa trên khóa chung hoặc giá trị băm của khóa chung, nhưng thay vào đó chứa logic tùy ý có thể quyết định trong điều kiện nào UTxO cụ thể này có thể được chi tiêu bởi một giao dịch. Vì vậy, thay vì một địa chỉ chuyển đến khóa chung, như khóa chung của Alice trong ví dụ này, sẽ có một tập lệnh tùy ý, một tập lệnh chứa logic tùy ý. Và thay vì chữ ký trong giao dịch, đầu vào sẽ chứng minh rằng nó được phép sử dụng đầu ra này với một số phần dữ liệu tùy ý mà chúng tôi gọi là người mua lại. Vì vậy, chúng tôi thay thế địa chỉ khóa công khai.


![Screenshot 2022-03-22 at 20-04-22 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159596485-9d39165d-167c-4624-84ff-15f68c52c3db.png)

Alice trong ví dụ của chúng tôi bằng một tập lệnh, chúng tôi đặt chữ ký điện tử của người mua lại, đây là một phần dữ liệu tùy ý. Bây giờ, câu hỏi tiếp theo là, điều đó chính xác có nghĩa là gì? Chúng ta có ý nghĩa gì bởi logic tùy ý? Và đặc biệt quan trọng là xem xét thông tin gì? Kịch bản này có ngữ cảnh gì? Vì vậy, có một số tùy chọn. Và điều được chỉ ra trong sơ đồ này là tất cả những gì tập lệnh nhìn thấy là người chuộc lỗi. Vì vậy, tất cả thông tin mà tập lệnh có để quyết định liệu giao dịch có sử dụng UTxO này hay không đều đang xem xét người mua lại. Và đó là điều mà Bitcoin tình cờ làm được. Vì vậy, trong Bitcoin, có các hợp đồng thông minh, chúng không thông minh lắm. Chúng được gọi là tập lệnh Bitcoin và tập lệnh Bitcoin hoạt động chính xác như thế này. Vì vậy, có ' sa trên trang web UTxO và một công cụ đổi thưởng ở phía đầu vào và tập lệnh này nhận được công cụ đổi quà và có thể sử dụng công cụ đổi quà để quyết định xem có thể sử dụng UTxO hay không. Nhưng đó không phải là lựa chọn duy nhất, chúng tôi có thể quyết định cung cấp thêm thông tin cho tập lệnh.

![Screenshot 2022-03-22 at 20-01-15 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159596728-7f3c241d-810c-4cfd-bcfb-42ec86b1f04a.png)

Vì vậy, Ethereum sử dụng một khái niệm khác. Trong Ethereum, về cơ bản, tập lệnh có thể nhìn thấy mọi thứ, toàn bộ chuỗi khối, toàn bộ trạng thái của chuỗi khối. Vì vậy, đó giống như một thái cực đối lập với Bitcoin. Tập lệnh Bitcoin có rất ít ngữ cảnh, tất cả những gì nó có thể thấy là người mua lại. Trong Ethereum, các tập lệnh solidity trong Ethereum có thể thấy trạng thái hoàn chỉnh của chuỗi khối. Vì vậy, điều đó cho phép các tập lệnh của Ethereum mạnh hơn nhiều để về cơ bản chúng có thể làm được mọi thứ, nhưng nó cũng đi kèm với các vấn đề vì các tập lệnh quá mạnh, cũng rất khó để dự đoán một tập lệnh cụ thể sẽ làm gì và điều đó mở ra cơ hội cho mọi loại về các vấn đề bảo mật và nguy hiểm, bởi vì rất khó để dự đoán đối với các nhà phát triển hợp đồng thông minh Ethereum điều gì có thể xảy ra vì có rất nhiều khả năng.

Vì vậy, những gì Cardano làm là một cái gì đó ở giữa, vì vậy nó không đưa ra quan điểm hạn chế như Bitcoin, nhưng cũng không có quan điểm toàn cầu như Ethereum, mà thay vào đó chọn một nền tảng trung gian. Vì vậy, tập lệnh Plutus không thể nhìn thấy toàn bộ chuỗi khối, nhưng nó có thể thấy toàn bộ giao dịch đang được xác thực.


![Screenshot 2022-03-22 at 20-08-04 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159596869-3ebf8181-ae73-4539-bded-21b1eaf5d9fd.png)

Vì vậy, trái ngược với Bitcoin, nó chỉ có thể thấy một đầu vào này, việc mua lại một đầu vào này, nhưng nó có thể thấy đầu vào đó và tất cả các đầu vào khác của giao dịch cũng như tất cả các đầu ra của giao dịch và chính giao dịch đó, và Plutus tập lệnh có thể sử dụng thông tin đó để quyết định xem có nên sử dụng đầu ra này hay không.

Bây giờ, trong ví dụ này, chỉ có một đầu vào, nhưng nếu giao dịch này có nhiều hơn một đầu vào, thì tập lệnh cũng có thể nhìn thấy những đầu vào đó. Còn một thành phần cuối cùng mà các tập lệnh Plutus cần để trở nên mạnh mẽ và biểu cảm như các tập lệnh Ethereum. Và đó là cái gọi là dữ liệu chuẩn, là một phần dữ liệu có thể được liên kết với UTxO ngoài giá trị. Vì vậy, tại một địa chỉ tập lệnh, như trong ví dụ này, ngoài giá trị 100 ADA này, đó có thể là một phần dữ liệu tùy ý được đính kèm, mà chúng tôi gọi là mốc thời gian. Và với điều này, chúng ta thực sự có thể chứng minh về mặt toán học rằng Plutus ít nhất cũng mạnh ngang với Ethereum, vì vậy mọi thứ, mọi logic bạn có thể thể hiện trong Ethereum, bạn cũng có thể thể hiện trong mô hình UTxO mở rộng này mà Cardano sử dụng, nhưng nó có rất nhiều lợi thế quan trọng so với mô hình Ethereum. Ví dụ, trong Plutus, có thể kiểm tra xem một giao dịch có được xác thực trong ví của bạn hay không trước khi bạn gửi giao dịch đó đến chuỗi. Vì vậy vẫn có thể xảy ra sự cố, ví dụ: giao dịch của bạn có thể sử dụng một đầu ra và sau đó khi nó được đưa vào chuỗi, ai đó khác đã sử dụng đầu ra đó. Đầu ra này đã được sử dụng bởi một giao dịch khác. Bạn không thể ngăn chặn điều đó , nhưng trong trường hợp đó, giao dịch của bạn sẽ không thành công mà bạn không phải trả bất kỳ khoản phí nào. Nhưng nếu tất cả các đầu vào vẫn còn đó, mà giao dịch của bạn mong đợi, thì bạn có thể chắc chắn rằng giao dịch sẽ hợp lệ và nó sẽ có tác dụng như bạn đã dự đoán khi chạy nó trong ví của mình. giao dịch của bạn có thể tiêu thụ một đầu ra và sau đó khi nó đến chuỗi, ai đó khác đã tiêu thụ đầu ra đó. Đầu ra này đã được sử dụng bởi một giao dịch khác. Bạn không thể ngăn chặn điều đó, nhưng trong trường hợp đó, giao dịch của bạn sẽ đơn giản là thất bại mà bạn không phải trả bất kỳ khoản phí nào. Nhưng nếu tất cả các đầu vào vẫn còn đó, mà giao dịch của bạn mong đợi, thì bạn có thể chắc chắn rằng giao dịch sẽ hợp lệ và nó sẽ có tác dụng như bạn đã dự đoán khi chạy nó trong ví của mình. giao dịch của bạn có thể tiêu thụ một đầu ra và sau đó khi nó đến chuỗi, ai đó khác đã tiêu thụ đầu ra đó. Đầu ra này đã được sử dụng bởi một giao dịch khác. Bạn không thể ngăn chặn điều đó, nhưng trong trường hợp đó, giao dịch của bạn sẽ đơn giản là thất bại mà bạn không phải trả bất kỳ khoản phí nào. Nhưng nếu tất cả các đầu vào vẫn còn đó, mà giao dịch của bạn mong đợi, thì bạn có thể chắc chắn rằng giao dịch sẽ hợp lệ và nó sẽ có tác dụng như bạn đã dự đoán khi chạy nó trong ví của mình.

Đây chắc chắn không phải là trường hợp của Ethereum, trong Ethereum trong khoảng thời gian giữa bạn xây dựng giao dịch và nó được tích hợp vào chuỗi khối, rất nhiều thứ có thể xảy ra đồng thời và điều đó không thể đoán trước, và điều đó có thể có những tác động không thể đoán trước đối với những gì sẽ xảy ra khi giao dịch của bạn kịch bản cuối cùng thực thi. Vì vậy, điều đó có nghĩa là trong Ethereum, luôn có khả năng bạn phải trả phí gas cho một giao dịch, mặc dù giao dịch cuối cùng không thành công do lỗi và điều đó được đảm bảo không xảy ra trong Cardano. Ngoài ra, việc phân tích tập lệnh Plutus cũng dễ dàng hơn và kiểm tra hoặc thậm chí chứng minh rằng nó an toàn vì bạn không phải xem xét toàn bộ trạng thái của chuỗi khối, điều không thể biết được. Bạn có thể tập trung vào bối cảnh chỉ bao gồm giao dịch chi tiêu này.

Vì vậy, để tóm tắt lại việc mở rộng mô hình UTxO thông thường, chúng tôi thay thế các địa chỉ khóa công khai từ mô hình UTxO thông thường bằng tập lệnh, tập lệnh Plutus và thay vì hợp pháp hóa việc sử dụng UTxO mới bằng chữ ký số, như trong mô hình UTxO đơn giản, dữ liệu tùy ý được gọi là người mua lại được sử dụng ở phía đầu vào. Và chúng tôi cũng thêm dữ liệu tùy chỉnh tùy ý ở phía đầu ra. Và tập lệnh dưới dạng ngữ cảnh khi nó chạy, sẽ thấy giao dịch chi tiêu, giao dịch, trong ví dụ này. Vì vậy, với người mua lại và mốc thời gian cũng như giao dịch với các đầu vào và đầu ra khác của nó, tập lệnh có thể chạy logic tùy ý để quyết định xem giao dịch này có thể tiêu thụ đầu ra hay không. Và đó là cách Plutus hoạt động.

Một điều tôi chưa đề cập đến là ai chịu trách nhiệm cung cấp dữ liệu, người mua lại và trình xác thực, tập lệnh xác thực xem một giao dịch có thể sử dụng đầu vào hay không. Và quy tắc trong Plutus là giao dịch chi tiêu phải thực hiện điều đó trong khi giao dịch sản xuất chỉ phải cung cấp hàm băm. Vì vậy, điều đó có nghĩa là nếu tôi tạo ra một đầu ra nằm ở địa chỉ tập lệnh, thì giao dịch tạo ra này chỉ phải bao gồm hàm băm của tập lệnh và hàm băm của dữ liệu thuộc về đầu ra này. Nhưng theo tùy chọn, nó cũng có thể bao gồm dữ liệu và tập lệnh đầy đủ, nhưng đó chỉ là tùy chọn. Và nếu một giao dịch muốn sử dụng đầu ra tập lệnh như vậy, thì giao dịch đó, giao dịch chi tiêu phải bao gồm dữ liệu và người mua lại và tập lệnh. Đó là quy tắc, cách nó hoạt động trong Plutus, tất nhiên, điều đó có nghĩa là để có thể chi tiêu một đầu vào nhất định, bạn cần biết dữ liệu vì chỉ hàm băm được hiển thị công khai trên chuỗi khối. Điều này đôi khi là một vấn đề và không phải là điều bạn muốn và đó là lúc khả năng này xuất hiện để đưa nó vào giao dịch sản xuất. Mặt khác, chỉ những người biết dữ liệu bằng một số phương tiện khác chứ không phải bằng cách nhìn vào chuỗi khối mới có thể chi tiêu một đầu ra như vậy.

Đây là mô hình UTxO, mô hình đầu ra giao dịch chưa chi tiêu mở rộng. Và điều đó tất nhiên là không gắn với một ngôn ngữ lập trình cụ thể nào. Ý tôi là, cái chúng ta có là Plutus, dựa trên Haskell, nhưng về nguyên tắc, bạn có thể sử dụng cùng một khái niệm, cùng một mô hình UTxO với một ngôn ngữ lập trình hoàn toàn khác. Và chúng tôi cũng có kế hoạch viết các trình biên dịch từ các ngôn ngữ lập trình khác sang tập lệnh Plutus, một loại ngôn ngữ hợp ngữ và Plutus được căn chỉnh. Vì vậy, có một mô hình UTxO mở rộng khác với ngôn ngữ lập trình cụ thể mà chúng tôi sử dụng. Trong khóa học này, rõ ràng chúng ta sẽ sử dụng Plutus, nhưng việc hiểu mô hình UTxO có giá trị độc lập với việc hiểu Plutus hoặc học cú pháp Plutus.

## Hợp đồng đấu giá trong Mô hình EUTxO


![Screenshot 2022-03-22 at 20-13-48 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159597264-b3900135-1d11-4796-ae1b-11c4965c48a7.png)

Như ví dụ giới thiệu của chúng tôi, chúng tôi sẽ xem xét Đấu giá kiểu Anh. Ai đó muốn bán đấu giá NFT (Mã thông báo không thể thay thế) - mã thông báo gốc trên Cardano chỉ tồn tại một lần. Một NFT có thể đại diện cho một số tác phẩm nghệ thuật kỹ thuật số hoặc có thể là một số tài sản trong thế giới thực.

Phiên đấu giá được tham số hóa bởi chủ sở hữu mã thông báo, chính mã thông báo, giá thầu tối thiểu và thời hạn.

Vì vậy, giả sử Alice có một NFT và muốn bán đấu giá nó. Alice tạo một cuộc đấu giá bằng tiếng Anh

Cô ấy tạo một UTxO ở đầu ra tập lệnh. Chúng ta sẽ xem xét mã sau, nhưng trước tiên chúng ta sẽ chỉ xem xét các ý tưởng của mô hình UTxO.

Giá trị của UTxO là NFT và dữ liệu chuẩn là Không có gì. Sau đó, nó sẽ là người trả giá cao nhất và giá thầu cao nhất. Nhưng ngay bây giờ, vẫn chưa có giá thầu.

Trong chuỗi khối thực, bạn không thể có UTxO chỉ chứa mã thông báo gốc, chúng luôn phải đi kèm với một số Ada, nhưng để đơn giản, chúng tôi sẽ bỏ qua điều đó ở đây.


![Screenshot 2022-03-22 at 20-15-58 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159597444-ab704788-ab82-42f0-b343-4e987a4a50e7.png)


Không giả sử rằng Bob muốn đặt giá thầu 100 Ada. Bob đưa ra giá thầu

Để làm điều này, Bob tạo một giao dịch với hai đầu vào và một đầu ra. Đầu vào đầu tiên là phiên đấu giá UTxO và đầu vào thứ hai là giá thầu của Bob là 100 Ada. Đầu ra, một lần nữa, ở tập lệnh đầu ra, nhưng bây giờ giá trị và mốc thời gian đã thay đổi. Trước đây tiêu chuẩn là Không có gì nhưng bây giờ là như vậy (Bob, 100).

Giá trị đã thay đổi vì giờ đây không chỉ có NFT trong UTxO mà còn có giá thầu 100 Ada.

Với tư cách là người đổi thưởng, để mở khóa phiên đấu giá gốc UTxO, chúng tôi sử dụng thứ gọi là Giá thầu. Đây chỉ là một kiểu dữ liệu đại số. Cũng sẽ có các giá trị khác nhưng một trong số đó là Giá thầu. Và kịch bản đấu giá sẽ kiểm tra xem tất cả các điều kiện có được đáp ứng hay không. Vì vậy, trong trường hợp này, tập lệnh phải kiểm tra xem giá thầu có diễn ra trước thời hạn không, giá thầu có đủ cao không.

Nó cũng phải kiểm tra xem có đúng đầu vào và đầu ra không. Trong trường hợp này, điều đó có nghĩa là kiểm tra xem phiên đấu giá có phải là đầu ra chứa NFT và có datum chính xác hay không. 


![Screenshot 2022-03-22 at 20-17-06 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159597527-ad86acf8-8fae-4718-9358-2cb383414b2a.png)



Tiếp theo, giả sử rằng Charlie muốn trả giá cao hơn Bob và đặt giá thầu 200 Ada. Charlie đưa ra giá thầu

Charlie sẽ tạo một giao dịch khác, lần này là giao dịch có hai đầu vào và hai đầu ra. Như trong trường hợp đầu tiên, hai đầu vào là giá thầu (lần này giá thầu của Charlie là 200 Ada) và phiên đấu giá UTxO. Một trong những kết quả đầu ra là phiên đấu giá UTxO được cập nhật. Cũng sẽ có đầu ra thứ hai, sẽ là UTxO trả về giá thầu 100 Ada của Bob.

Ghi chú

Trên thực tế, phiên đấu giá UTxO không được cập nhật vì không có gì thay đổi.

Điều thực sự xảy ra là phiên đấu giá cũ UTxO đã được sử dụng và một phiên đấu giá mới được tạo, nhưng nó có cảm giác cập nhật trạng thái của phiên đấu giá UTxO

Lần này, chúng tôi lại sử dụng công cụ mua lại Giá thầu. Lần này, tập lệnh phải kiểm tra xem đã đạt đến thời hạn chưa, giá thầu có cao hơn giá thầu trước đó không, tập lệnh phải kiểm tra xem phiên đấu giá UTxO có được tạo chính xác hay không và phải kiểm tra xem người trả giá cao nhất trước đó có nhận lại giá thầu của họ không.


![Screenshot 2022-03-22 at 20-18-31 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159597670-239a57c9-1dbe-4d07-ae2d-4b30de61b474.png)

Cuối cùng, giả sử rằng sẽ không có giá thầu nào khác, vì vậy khi đã hết thời hạn, phiên đấu giá có thể kết thúc.

Để làm được điều đó, ai đó phải tạo một giao dịch khác. Đó có thể là Alice muốn thu thập giá thầu hoặc có thể là Charlie muốn thu thập NFT. Đó có thể là bất kỳ ai, nhưng Alice và Charlie có động cơ để làm như vậy.

Giao dịch này sẽ có một đầu vào - phiên đấu giá UTxO, lần này với người mua lại Đóng - và giao dịch này sẽ có hai đầu ra. Một trong những kết quả đầu ra dành cho người trả giá cao nhất, Charlie, và anh ấy nhận được NFT và kết quả thứ hai thuộc về Alice, người nhận được giá thầu cao nhất.

Trong trường hợp Đóng, tập lệnh phải kiểm tra xem đã đến thời hạn chưa và người chiến thắng nhận được NFT và chủ sở hữu phiên đấu giá nhận được giá thầu cao nhất.


![Screenshot 2022-03-22 at 20-19-24 PPP 030101 - Welcome and Introduction](https://user-images.githubusercontent.com/59018247/159597728-da57dd37-5236-4665-b099-877b66620db3.png)


Có một kịch bản nữa để chúng ta xem xét, đó là không ai đưa ra bất kỳ giá thầu nào. Không ai đặt giá thầu

Alice tạo phiên đấu giá nhưng không nhận được giá thầu nào. Trong trường hợp này, phải có một cơ chế để Alice lấy lại NFT của mình.

Để làm được điều đó, cô ấy đã tạo một giao dịch với người mua lại Đóng, nhưng bây giờ vì không có người đặt giá thầu, NFT không chuyển đến người đặt giá thầu cao nhất mà chỉ quay trở lại Alice.

Logic trong trường hợp này hơi khác một chút. Nó sẽ kiểm tra xem NFT có quay trở lại Alice hay không, tuy nhiên, nó không thực sự cần kiểm tra người nhận vì giao dịch sẽ được kích hoạt bởi Alice và cô ấy có thể gửi NFT đến bất cứ đâu cô ấy muốn.

Mã Plutus được chia thành mã trên chuỗi và mã ngoài chuỗi. Mã trên chuỗi chỉ cần kiểm tra và xác thực, vì trong đó chỉ nói có hoặc không. Mã ngoài chuỗi tích cực tạo bản dịch đó, sau đó sẽ vượt qua xác thực. Cả hai phần on-chain và off-chain đều được viết thống nhất bằng haskell. Điều này phần lớn có lợi vì mã có thể được chia sẻ và bạn chỉ cần quan tâm đến một ngôn ngữ lập trình.

Nhìn vào hợp đồng đấu giá EnglishAuction.hs, chúng tôi thấy các loại dữ liệu khác nhau được liệt kê đầu tiên trong hợp đồng:

```haskell
minLovelace :: Integer
minLovelace = 2000000
data Auction = Auction
  { aSeller   :: !PaymentPubKeyHash
  , aDeadline :: !POSIXTime
  , aMinBid   :: !Integer
  , aCurrency :: !CurrencySymbol
  , aToken    :: !TokenName
  } deriving (P.Show, Generic, ToJSON, FromJSON, ToSchema)
instance Eq Auction where
  {-# INLINABLE (==) #-}
  a == b = (aSeller   a == aSeller   b) &&
           (aDeadline a == aDeadline b) &&
           (aMinBid   a == aMinBid   b) &&
           (aCurrency a == aCurrency b) &&
           (aToken    a == aToken    b)
PlutusTx.unstableMakeIsData ''Auction
PlutusTx.makeLift ''Auction
data Bid = Bid
  { bBidder :: !PaymentPubKeyHash
  , bBid    :: !Integer
  } deriving P.Show
instance Eq Bid where
  {-# INLINABLE (==) #-}
  b == c = (bBidder b == bBidder c) &&
           (bBid    b == bBid    c)
PlutusTx.unstableMakeIsData ''Bid
PlutusTx.makeLift ''Bid
data AuctionAction = MkBid Bid | Close
  deriving P.Show
PlutusTx.unstableMakeIsData ''AuctionAction
PlutusTx.makeLift ''AuctionAction
data AuctionDatum = AuctionDatum
  { adAuction    :: !Auction
  , adHighestBid :: !(Maybe Bid)
  } deriving P.Show
PlutusTx.unstableMakeIsData ''AuctionDatum
PlutusTx.makeLift ''AuctionDatum
data Auctioning
instance Scripts.ValidatorTypes Auctioning where
  type instance RedeemerType Auctioning = AuctionAction
  type instance DatumType Auctioning = AuctionDatum
```

Tiếp theo là mã trên chuỗi chính (xác thực)- on-chain code (validation):


```haskell
{-# INLINABLE mkAuctionValidator #-}
mkAuctionValidator :: AuctionDatum -> AuctionAction -> ScriptContext -> Bool
mkAuctionValidator ad redeemer ctx =
  traceIfFalse "wrong input value" correctInputValue &&
  case redeemer of
      MkBid b@Bid{..} ->
          traceIfFalse "bid too low"        (sufficientBid bBid)         &&
          traceIfFalse "wrong output datum" (correctBidOutputDatum b)    &&
          traceIfFalse "wrong output value" (correctBidOutputValue bBid) &&
          traceIfFalse "wrong refund"       correctBidRefund             &&
          traceIfFalse "too late"           correctBidSlotRange
      Close           ->
          traceIfFalse "too early" correctCloseSlotRange &&
          case adHighestBid ad of
              Nothing      ->
                  traceIfFalse "expected seller to get token" (getsValue (aSeller auction) $ tokenValue <> Ada.lovelaceValueOf minLovelace)
              Just Bid{..} ->
                  traceIfFalse "expected highest bidder to get token" (getsValue bBidder $ tokenValue <> Ada.lovelaceValueOf minLovelace) &&
                  traceIfFalse "expected seller to get highest bid" (getsValue (aSeller auction) $ Ada.lovelaceValueOf bBid)
where
  info :: TxInfo
  info = scriptContextTxInfo ctx
  input :: TxInInfo
  input =
    let
      isScriptInput i = case (txOutDatumHash . txInInfoResolved) i of
          Nothing -> False
          Just _  -> True
      xs = [i | i <- txInfoInputs info, isScriptInput i]
    in
      case xs of
          [i] -> i
          _   -> traceError "expected exactly one script input"
  inVal :: Value
  inVal = txOutValue . txInInfoResolved $ input
  auction :: Auction
  auction = adAuction ad
  tokenValue :: Value
  tokenValue = Value.singleton (aCurrency auction) (aToken auction) 1
  correctInputValue :: Bool
  correctInputValue = inVal == case adHighestBid ad of
      Nothing      -> tokenValue <> Ada.lovelaceValueOf minLovelace
      Just Bid{..} -> tokenValue <> Ada.lovelaceValueOf (minLovelace + bBid)
  sufficientBid :: Integer -> Bool
  sufficientBid amount = amount >= minBid ad
  ownOutput   :: TxOut
  outputDatum :: AuctionDatum
  (ownOutput, outputDatum) = case getContinuingOutputs ctx of
      [o] -> case txOutDatumHash o of
          Nothing   -> traceError "wrong output type"
          Just h -> case findDatum h info of
              Nothing        -> traceError "datum not found"
              Just (Datum d) ->  case PlutusTx.fromBuiltinData d of
                  Just ad' -> (o, ad')
                  Nothing  -> traceError "error decoding data"
      _   -> traceError "expected exactly one continuing output"
  correctBidOutputDatum :: Bid -> Bool
  correctBidOutputDatum b = (adAuction outputDatum == auction)   &&
                            (adHighestBid outputDatum == Just b)
  correctBidOutputValue :: Integer -> Bool
  correctBidOutputValue amount =
      txOutValue ownOutput == tokenValue <> Ada.lovelaceValueOf (minLovelace + amount)
  correctBidRefund :: Bool
  correctBidRefund = case adHighestBid ad of
      Nothing      -> True
      Just Bid{..} ->
        let
          os = [ o
               | o <- txInfoOutputs info
               , txOutAddress o == pubKeyHashAddress bBidder Nothing
               ]
        in
          case os of
              [o] -> txOutValue o == Ada.lovelaceValueOf bBid
              _   -> traceError "expected exactly one refund output"
  correctBidSlotRange :: Bool
  correctBidSlotRange = to (aDeadline auction) `contains` txInfoValidRange info
  correctCloseSlotRange :: Bool
  correctCloseSlotRange = from (aDeadline auction) `contains` txInfoValidRange info
  getsValue :: PaymentPubKeyHash -> Value -> Bool
  getsValue h v =
    let
      [o] = [ o'
            | o' <- txInfoOutputs info
            , txOutValue o' == v
            ]
    in
      txOutAddress o == pubKeyHashAddress h Nothing
```
**Tiếp theo là nơi quá trình biên dịch diễn ra:**

```haskell
typedAuctionValidator :: Scripts.TypedValidator Auctioning
typedAuctionValidator = Scripts.mkTypedValidator @Auctioning
  $$(PlutusTx.compile [|| mkAuctionValidator ||])
  $$(PlutusTx.compile [|| wrap ||])
where
  wrap = Scripts.wrapValidator @AuctionDatum @AuctionAction
```

Sau đó, tiếp theo là mã ngoại tuyến bắt đầu bằng ba điểm cuối bắt đầu, đặt giá thầu và đóng.

```haskell
data StartParams = StartParams
  { spDeadline :: !POSIXTime
  , spMinBid   :: !Integer
  , spCurrency :: !CurrencySymbol
  , spToken    :: !TokenName
  } deriving (Generic, ToJSON, FromJSON, ToSchema)
data BidParams = BidParams
  { bpCurrency :: !CurrencySymbol
  , bpToken    :: !TokenName
  , bpBid      :: !Integer
  } deriving (Generic, ToJSON, FromJSON, ToSchema)
data CloseParams = CloseParams
  { cpCurrency :: !CurrencySymbol
  , cpToken    :: !TokenName
  } deriving (Generic, ToJSON, FromJSON, ToSchema)
type AuctionSchema =
      Endpoint "start" StartParams
  .\/ Endpoint "bid"   BidParams
  .\/ Endpoint "close" CloseParams
start :: AsContractError e => StartParams -> Contract w s e ()
start StartParams{..} = do
  pkh <- ownPaymentPubKeyHash
  let a = Auction
              { aSeller   = pkh
              , aDeadline = spDeadline
              , aMinBid   = spMinBid
              , aCurrency = spCurrency
              , aToken    = spToken
              }
      d = AuctionDatum
              { adAuction    = a
              , adHighestBid = Nothing
              }
      v = Value.singleton spCurrency spToken 1 <> Ada.lovelaceValueOf minLovelace
      tx = Constraints.mustPayToTheScript d v
  ledgerTx <- submitTxConstraints typedAuctionValidator tx
  void $ awaitTxConfirmed $ getCardanoTxId ledgerTx
  logInfo @P.String $ printf "started auction %s for token %s" (P.show a) (P.show v)
bid :: forall w s. BidParams -> Contract w s Text ()
bid BidParams{..} = do
  (oref, o, d@AuctionDatum{..}) <- findAuction bpCurrency bpToken
  logInfo @P.String $ printf "found auction utxo with datum %s" (P.show d)
  when (bpBid < minBid d) $
      throwError $ pack $ printf "bid lower than minimal bid %d" (minBid d)
  pkh <- ownPaymentPubKeyHash
  let b  = Bid {bBidder = pkh, bBid = bpBid}
      d' = d {adHighestBid = Just b}
      v  = Value.singleton bpCurrency bpToken 1 <> Ada.lovelaceValueOf (minLovelace + bpBid)
      r  = Redeemer $ PlutusTx.toBuiltinData $ MkBid b
      lookups = Constraints.typedValidatorLookups typedAuctionValidator P.<>
                Constraints.otherScript auctionValidator                P.<>
                Constraints.unspentOutputs (Map.singleton oref o)
      tx      = case adHighestBid of
                  Nothing      -> Constraints.mustPayToTheScript d' v                            <>
                                  Constraints.mustValidateIn (to $ aDeadline adAuction)          <>
                                  Constraints.mustSpendScriptOutput oref r
                  Just Bid{..} -> Constraints.mustPayToTheScript d' v                            <>
                                  Constraints.mustPayToPubKey bBidder (Ada.lovelaceValueOf bBid) <>
                                  Constraints.mustValidateIn (to $ aDeadline adAuction)          <>
                                  Constraints.mustSpendScriptOutput oref r
  ledgerTx <- submitTxConstraintsWith lookups tx
  void $ awaitTxConfirmed $ getCardanoTxId ledgerTx
  logInfo @P.String $ printf "made bid of %d lovelace in auction %s for token (%s, %s)"
      bpBid
      (P.show adAuction)
      (P.show bpCurrency)
      (P.show bpToken)
close :: forall w s. CloseParams -> Contract w s Text ()
close CloseParams{..} = do
  (oref, o, d@AuctionDatum{..}) <- findAuction cpCurrency cpToken
  logInfo @P.String $ printf "found auction utxo with datum %s" (P.show d)
  let t      = Value.singleton cpCurrency cpToken 1
      r      = Redeemer $ PlutusTx.toBuiltinData Close
      seller = aSeller adAuction
      lookups = Constraints.typedValidatorLookups typedAuctionValidator P.<>
                Constraints.otherScript auctionValidator                P.<>
                Constraints.unspentOutputs (Map.singleton oref o)
      tx      = case adHighestBid of
                  Nothing      -> Constraints.mustPayToPubKey seller (t <> Ada.lovelaceValueOf minLovelace)  <>
                                  Constraints.mustValidateIn (from $ aDeadline adAuction)                    <>
                                  Constraints.mustSpendScriptOutput oref r
                  Just Bid{..} -> Constraints.mustPayToPubKey bBidder (t <> Ada.lovelaceValueOf minLovelace) <>
                                  Constraints.mustPayToPubKey seller (Ada.lovelaceValueOf bBid)              <>
                                  Constraints.mustValidateIn (from $ aDeadline adAuction)                    <>
                                  Constraints.mustSpendScriptOutput oref r
  ledgerTx <- submitTxConstraintsWith lookups tx
  void $ awaitTxConfirmed $ getCardanoTxId ledgerTx
  logInfo @P.String $ printf "closed auction %s for token (%s, %s)"
      (P.show adAuction)
      (P.show cpCurrency)
      (P.show cpToken)
findAuction :: CurrencySymbol
          -> TokenName
          -> Contract w s Text (TxOutRef, ChainIndexTxOut, AuctionDatum)
findAuction cs tn = do
  utxos <- utxosAt $ scriptHashAddress auctionHash
  let xs = [ (oref, o)
           | (oref, o) <- Map.toList utxos
           , Value.valueOf (_ciTxOutValue o) cs tn == 1
           ]
  case xs of
      [(oref, o)] -> case _ciTxOutDatum o of
          Left _          -> throwError "datum missing"
          Right (Datum e) -> case PlutusTx.fromBuiltinData e of
              Nothing -> throwError "datum has wrong type"
              Just d@AuctionDatum{..}
                  | aCurrency adAuction == cs && aToken adAuction == tn -> return (oref, o, d)
                  | otherwise                                           -> throwError "auction token missmatch"
      _           -> throwError "auction utxo not found"
endpoints :: Contract () AuctionSchema Text ()
endpoints = awaitPromise (start' `select` bid' `select` close') >> endpoints
where
  start' = endpoint @"start" start
  bid'   = endpoint @"bid"   bid
  close' = endpoint @"close" close
mkSchemaDefinitions ''AuctionSchema
myToken :: KnownCurrency
myToken = KnownCurrency (ValidatorHash "f") "Token" (TokenName "T" :| [])
```

## Hợp đồng đấu giá trên Plutus Playground


Để bắt đầu với Plutus Playground, chúng ta cần có hai thiết bị đầu cuối đang chạy, cả hai đều nằm trong nix-shell.

Hãy bắt đầu với terminal 1. Đi tới thư mục plutus-apps và chạy nix-shell trước:


```haskell
Terminal 1
. /home/user/.nix-profile/etc/profile.d/nix.sh
~/plutus-apps$ nix-shell
```

Tiếp theo, chúng tôi đi đến thư mục plutus-playground-server và chạy:

```haskell
Terminal 1
cd ~/plutus-apps/plutus-playground-server
[nix-shell:~/plutus-apps/plutus-playground-server]$ plutus-playground-server
```

Nếu thành công, bạn sẽ thấy đầu ra:

```haskell
Terminal 1
Interpreter Ready
```

Hãy bắt đầu với terminal 2. Đi tới thư mục plutus-apps và chạy nix-shell trước:

```haskell
Terminal 2
. /home/user/.nix-profile/etc/profile.d/nix.sh
~/plutus-apps$ nix-shell
```


Tiếp theo, chúng tôi đi đến thư mục plutus-playground-client và chạy:

```haskell
Terminal 2
cd ~/plutus-apps/plutus-playground-clien
[nix-shell:~/plutus-apps/plutus-playground-client]$ npm run start
```

Nếu thành công, bạn sẽ thấy đầu ra:

```
Terminal 2

[wdm]: Compiled successfully.

or

[wdm]: Compiled with warnings.
```

Giữ cả hai thiết bị đầu cuối mở và giờ đây chúng ta có thể truy cập Plutus Playground từ trình duyệt.

Mở trình duyệt và truy cập địa chỉ:

```
https://localhost:8009
```

Bạn sẽ nhận được một cảnh báo phàn nàn về việc đây là một trang web nguy hiểm, dù sao hãy bỏ qua thông báo để nhấp qua.

Giờ đây, bạn có thể biên dịch và chạy thành công hợp đồng đấu giá bằng cách sử dụng hai nút ở góc trên cùng bên phải: `“Biên dịch” và “Mô phỏng”. “Compile” and “Simulate”`.<br/><br/><br/>
**The next part is taken from reddit (u/RikAlexander) which walks through plutus playground. Credit to him for this submission:** <br/>

### Simulation

Nhấn "simulate" (nút màu xanh lam ở trên cùng bên phải).


Điều này sẽ mở ra cửa sổ Mô phỏng, nơi chúng tôi có thể thử hợp đồng mới được biên dịch của mình.

Điều này mặc định là 2 ví, tuy nhiên, để làm cho mọi thứ trở nên thú vị, hãy thêm một ví khác. (the big `"add wallet"` button)


oàn bộ ý tưởng của hợp đồng này là bán đấu giá một NFT (Mã thông báo không thể thay thế).

Mỗi ví có 10 lovelaces và 10 T (T ở đây là Token).

Thay đổi tổng số T cho Wallet1 thành 1 và cho Wallet2 và 3 thành 0. (nếu có nhiều hơn 1 thì tất nhiên đó không phải là NFT)


***Nói một cách đơn giản:*** Wallet1 sẽ đưa ra đấu giá 1T và Wallet2-3 sẽ đấu thầu.

Như bạn có thể thấy, mỗi ví có các chức năng `"bid", "close" and "start".`

**Bid** -> đặt giá thầu x lovelaces

**Start** ->bắt đầu quy trình đặt giá thầu với getSlot (thời gian đặt giá thầu sẽ kéo dài bao lâu), spMinBid (yêu cầu dây buộc tối thiểu)

**Close** ->  đóng giá thầu; cung cấp cho người trả giá cao nhất NFT/Token của nó



**Note:** "pay to wallet" luôn ở đó, đừng lo lắng về điều đó bây giờ :)



[![r/cardano - Week 01 Contract - EnglishAuction - Plutus Pioneer Program](https://preview.redd.it/g4w8mnj5r0t61.png?width=968&format=png&auto=webp&s=fa29ff20500aa56e2774e6d0a0d84284c9b3a5d4)](https://preview.redd.it/g4w8mnj5r0t61.png?width=968&format=png&auto=webp&s=fa29ff20500aa56e2774e6d0a0d84284c9b3a5d4)



6 - Wallet1 sẽ đưa Token lên đấu giá, chúng tôi sẽ thực hiện việc này bằng cách nhấn nút "start" tại Wallet1.

Thao tác này sẽ thêm một Hành động vào Chuỗi Hành động.

Ở đây chúng ta cần thiết lập các thông số:

**getSlot:** 20 (the bidding will close on slot 20)

**spMinBid:** 3 (atleast 3 lovelaces are required)

**spCurrency:** 66 (ký hiệu tiền tệ của token T; sẽ được giải thích trong các bài giảng sau)

**spToken:** T (the Token)



[![r/cardano - Week 01 Contract - EnglishAuction - Plutus Pioneer Program](https://preview.redd.it/qag2ffs7r0t61.png?width=316&format=png&auto=webp&s=6b75cf9e5fd4e886880897d22fa73939dc84ea3c)](https://preview.redd.it/qag2ffs7r0t61.png?width=316&format=png&auto=webp&s=6b75cf9e5fd4e886880897d22fa73939dc84ea3c)





**Ví 1**

7 - Tiếp theo, chúng ta cần thêm hành động chờ (1 vị trí).

Điều này sẽ cung cấp cho tất cả các hành động thời gian để được thực hiện.



[![r/cardano - Week 01 Contract - EnglishAuction - Plutus Pioneer Program](https://preview.redd.it/k3ofbhi9r0t61.png?width=320&format=png&auto=webp&s=a1ba4fac171b17c503def39da8a37ed24026ef45)](https://preview.redd.it/k3ofbhi9r0t61.png?width=320&format=png&auto=webp&s=a1ba4fac171b17c503def39da8a37ed24026ef45)



8 - Bây giờ, trong ví dụ này, Wallet2 sẽ bắt đầu đặt giá thầu với Giá thầu là 3 dây buộc tình yêu.

Nhấn nút "đặt giá thầu" tại Wallet2 và cập nhật Hành động với các tham số:


**spCurrency:** 66 (Same as above)

**spToken:** T (the Token)

**bpBid:** 3 (how much lovelaces)



[![r/cardano - Week 01 Contract - EnglishAuction - Plutus Pioneer Program](https://preview.redd.it/j2xc9wiar0t61.png?width=321&format=png&auto=webp&s=684dbc484a9cf8b702fd04c1b458ba194eb26fe0)](https://preview.redd.it/j2xc9wiar0t61.png?width=321&format=png&auto=webp&s=684dbc484a9cf8b702fd04c1b458ba194eb26fe0)

**Ví 2**

9 - Chèn một hành động chờ khác tại đây (1 vị trí)

10 - Bây giờ Wallet3 cũng muốn đặt giá thầu.

Tương tự như Wallet2, thêm hành động "đặt giá thầu" với tất cả các tham số giống như trên; ngoại trừ tham số bpBid.

Điều này có thể được đặt thành bất kỳ thứ gì (tối thiểu 3), nhưng trong ví dụ này, chúng tôi sẽ đặt thành 5.



[![r/cardano - Week 01 Contract - EnglishAuction - Plutus Pioneer Program](https://preview.redd.it/ekgbkrzbr0t61.png?width=315&format=png&auto=webp&s=f07a612bdad692299bdd9f7a0211b740888751cd)](https://preview.redd.it/ekgbkrzbr0t61.png?width=315&format=png&auto=webp&s=f07a612bdad692299bdd9f7a0211b740888751cd)

**Ví 3**

Tuyệt quá. Toàn bộ trình tự đặt giá thầu ĐÃ XONG.

11 - Để kết thúc việc đặt giá thầu, chúng tôi sẽ thêm một hành động chờ khác; chỉ lần này chúng tôi sẽ "chờ cho đến" vị trí 20.

(hãy nhớ hành động đầu tiên chứ? Tại khe 20, cuộc đấu thầu sẽ kết thúc!)

Sau đó, chức năng cuối cùng (đóng) vẫn cần được thêm vào để hoàn tất trình tự đặt giá thầu.

Chúng tôi sẽ gọi điều này từ Wallet1, vì vậy hãy thêm hành động "đóng" từ Wallet1, với các tham số chính xác (bạn biết phải làm gì).





[![r/cardano - Week 01 Contract - EnglishAuction - Plutus Pioneer Program](https://preview.redd.it/cl2z2ccdr0t61.png?width=317&format=png&auto=webp&s=aee55aa7390e92b029eb3cfda09a8d513b13a7f1)](https://preview.redd.it/cl2z2ccdr0t61.png?width=317&format=png&auto=webp&s=aee55aa7390e92b029eb3cfda09a8d513b13a7f1)



[![r/cardano - Week 01 Contract - EnglishAuction - Plutus Pioneer Program](https://preview.redd.it/ei15tit0s0t61.png?width=316&format=png&auto=webp&s=246838413dc21abd94a816d2b0a6b00a2fb644b2)](https://preview.redd.it/ei15tit0s0t61.png?width=316&format=png&auto=webp&s=246838413dc21abd94a816d2b0a6b00a2fb644b2)



12 - Cuối cùng nhưng không kém phần quan trọng, chúng tôi sẽ thêm một hành động chờ khác tại đây (1 vị trí)


### Evaluation

**Thật tuyệt, chúng ta đã hoàn tất toàn bộ quá trình thiết lập!**



Để thực thi mọi thứ trên chuỗi khối mô phỏng, hãy nhấn nút "Đánh giá" màu xanh lục ở cuối màn hình của bạn.

Trên màn hình tiếp theo, bạn sẽ thấy các vị trí riêng lẻ.

[![r/cardano - Week 01 Contract - EnglishAuction - Plutus Pioneer Program](https://preview.redd.it/exzozcyfr0t61.png?width=800&format=png&auto=webp&s=7ada65e6443b2d594099374195c0bf50c33f78f7)](https://preview.redd.it/exzozcyfr0t61.png?width=800&format=png&auto=webp&s=7ada65e6443b2d594099374195c0bf50c33f78f7)



_**Slot 0, Tx 0**_ ->  vị trí Genesis. Đây là có để thiết lập tất cả mọi thứ.

Wallet1 -> 1T và 10 lovelace, Wallet2 -> 10 lovelace, Wallet3 -> 10 lovelace

_**Slot 1, Tx 0**_ -> Hành động bắt đầu, đây là nơi Wallet1 chuyển 1T (Mã thông báo) vào Hợp đồng.

_**Slot 2, Tx 0**_ -> Giá thầu của Wallet2 (3 lovelaces)

**Note:** Hợp đồng hiện có 1T và 3 lovelaces

_**Slot 3, Tx 0**_ -> Giá thầu của Wallet3 (5 lovelaces)

**Note:**  Hợp đồng hiện có 1T và 5 lovelaces; Wallet2 lấy lại được 3 lovelaces

_**Slot 20, Tx 0**_ -> Tại đây, Wallet3 đã thắng "cuộc chiến" đấu thầu và được cấp 1T! Ngoài ra, Wallet1 có 5 dây buộc tình yêu :)

**Note:** Hợp đồng bây giờ không có bất cứ thứ gì cả :) mọi thứ đều được trao cho chủ sở hữu hợp pháp của nó.


13 - Để kiểm tra đầu ra cuối cùng của tất cả các ví, hãy cuộn xuống phần "Số dư cuối cùng".

Như bạn có thể thấy, Wallet3 hiện có 1T.

[![r/cardano - Week 01 Contract - EnglishAuction - Plutus Pioneer Program](https://preview.redd.it/2yswtd1ir0t61.png?width=1188&format=png&auto=webp&s=25a895aa510ff3e7faa7f3fb25b8f91d4f7ffcf2)](https://preview.redd.it/2yswtd1ir0t61.png?width=1188&format=png&auto=webp&s=25a895aa510ff3e7faa7f3fb25b8f91d4f7ffcf2)


## Bài tập về nhà

Mục tiêu của bài tập về nhà tuần này là làm quen với việc vận hành môi trường và chơi đùa bên trong Plutus Playground. Nếu bạn đã làm theo hướng dẫn cho đến thời điểm này, thì bây giờ chúng ta đã có những kiến ​​thức cần thiết cả về kiến ​​thức và môi trường phát triển để sẵn sàng chuyển sang bài giảng 2.
