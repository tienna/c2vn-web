Cách viết các giao dịch Plutus
==========================
Hướng dẫn này phác thảo giao dịch Plutus là gì và cách viết một giao dịch.

## Giao dịch Plutus là gì?
Giao dịch là một phần dữ liệu chứa cả đầu vào và đầu ra, và kể từ thời Alonzo, chúng cũng có thể bao gồm các tập lệnh Plutus. Đầu vào là đầu ra chưa sử dụng từ các giao dịch trước đó (UTxO). Ngay sau khi UTxO được sử dụng làm đầu vào trong một giao dịch, nó sẽ được sử dụng và không bao giờ có thể được sử dụng lại. Đầu ra được chỉ định bởi một địa chỉ (khóa công khai hoặc mã băm khóa công khai) và một giá trị (bao gồm số lượng ada và số lượng mã thông báo gốc bổ sung tùy chọn). Sơ đồ luồng này cung cấp ý tưởng tốt hơn về các thành phần của giao dịch ở cấp độ kỹ thuật:

  

![Plutus-transaction](diagram-plutus-transaction.png)
  

Nói tóm lại, đầu vào chứa các tham chiếu đến các UTXO được giới thiệu bởi các giao dịch trước đó và đầu ra là các UTXO mới mà giao dịch này sẽ tạo ra. Ngoài ra, nếu chúng ta nghĩ về nó, điều này cho phép chúng ta thay đổi trạng thái của hợp đồng thông minh vì dữ liệu mới có thể được chứa trong các đầu ra đã tạo.

Điều quan trọng nữa là phải xác định `Plutus Tx` là gì. `Plutus Tx` là tên được đặt cho các phần được phân tách đặc biệt của chương trình Haskell được sử dụng để biên dịch phần trên chuỗi của ứng dụng hợp đồng thành Plutus Core (mã đã biên dịch này sau đó được sử dụng để xác thực giao dịch, do đó là "Tx") . Biểu thức Plutus Core kết quả có thể là một phần của dữ liệu giao dịch hoặc dữ liệu được lưu trữ trên sổ cái. Những đoạn mã này yêu cầu xử lý đặc biệt trên blockchain và được gọi là *Plutus script*.

  

**Tại sao**

  

Từ góc độ nhà phát triển Plutus, bằng cách sử dụng các giao dịch, chúng tôi có thể kiểm soát luồng thực thi tập lệnh Plutus của mình. Do đó, một giao dịch cũng có thể được coi là các thông điệp được sử dụng để tương tác với hợp đồng thông minh. Hiểu các giao dịch là một khái niệm chính để nắm vững sự phát triển của các hợp đồng thông minh.

  

**Khi nào**

  

Một giao dịch phải được tạo bởi ví trong khi đánh giá mã ngoài chuỗi. Hiện tại, chúng ta phải tập hợp giao dịch bằng cardano-cli và đặt tập lệnh Plutus đã biên dịch vào bên trong. Tuy nhiên, ở các giai đoạn sau, điều này sẽ được tự động hóa bởi phần mềm ví của người dùng. Giao dịch, sau khi được gửi, sẽ được xác thực và do đó, mã Plutus sẽ được đánh giá bởi một nút xác thực. Nếu tập lệnh đánh giá thành công, giao dịch sẽ được coi là hợp lệ. Nếu không, giao dịch sẽ bị từ chối.

  
  

## Thiết lập môi trường

If you already have a Haskell development environment set up, feel free to skip this section, otherwise follow along, we will set up a suitable environment for compiling plutus scripts using Nix.

  

Chúng tôi sẽ sử dụng Nix để cung cấp cả Haskell và Cabal, nhưng nếu bạn muốn, bạn cũng có thể dựa vào ghcup để quản lý các phần phụ thuộc này. Tuy nhiên, chúng tôi sẽ không đề cập đến vấn đề này. Bạn có thể tham khảo trang web [ghcup](https://gitlab.haskell.org/haskell/ghcup-hs) chính thức để được hướng dẫn về điều đó.

  

Nix là một công cụ tuyệt vời, trong số những thứ khác, cho phép chúng tôi tạo ra các môi trường biệt lập, trong đó chúng tôi có thể nhúng tất cả các phụ thuộc cần thiết cho một ứng dụng. Những phụ thuộc này thậm chí có thể là những phụ thuộc cấp hệ thống. Do đó, chúng ta có thể tạo một môi trường biệt lập để đảm bảo ứng dụng sẽ hoạt động vì tất cả các phụ thuộc bắt buộc đều có sẵn.



Cài đặt Nix trên bất kỳ IOS nào **Linux distribution**, **MacOS** or **Windows** (via WSL) thông qua [multi-user installation](https://nixos.org/manual/nix/stable/#chap-installation). Tóm lại, bạn cần chạy điều này tại terminal của mình:

```
$ sh <(curl -L https://nixos.org/nix/install) --daemon
```

Thêm IOHK Binary Cache. Để cải thiện tốc độ xây dựng, có thể thiết lập bộ đệm nhị phân do IOHK duy trì.

  
```
sudo mkdir -p /etc/nix

cat <<EOF | sudo tee /etc/nix/nix.conf

substituters = https://cache.nixos.org https://hydra.iohk.io

trusted-public-keys = iohk.cachix.org-1:DpRUyj7h7V830dp/i6Nti+NEO2/nhblbov/8MW7Rqoo= hydra.iohk.io:f/Ea+s+dFdN+3Y/G+FDgSq+a5NEWhJGzdjvKNGv0/EQ= cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY=

EOF
```
  

Trước khi Nix hoạt động trong các trình bao hiện có của bạn, bạn cần đóng chúng và mở lại. Ngoài ra, bạn nên sẵn sàng để đi.

Sau khi Nix được cài đặt, hãy đăng xuất và sau đó đăng nhập lại, để nó được kích hoạt đúng cách trong trình bao của bạn. Sao chép phần sau và kiểm tra thẻ Alonzo.

  
```
git clone https://github.com/input-output-hk/cardano-node
cd cardano-node
git checkout -b alonzo-purple tags/alonzo-purple-1.0.2
```
 
Lưu thông tin sau vào một tệp có tên `plutus-tutorial.nix`:

```
{ version ? "purple", magicId ? 8, pkgs ? import <nixpkgs> { }}:
let
cardano-node-repo = import ./. { };

in pkgs.mkShell {
buildInputs = with pkgs; [
libsodium
cabal-install
haskell.compiler.ghc8104
haskellPackages.haskell-language-server
cardano-node-repo.scripts."alonzo-${version}".node
cardano-node-repo.cardano-cli
];

CARDANO_NODE_SOCKET_PATH = "${builtins.toString ./.}/state-node-alonzo-${version}/node.socket";
TESTNET_MAGIC = magicId;
}
```

và sau đó tải một trình bao với Nix bằng cách sử dụng tệp này với lệnh sau:
```
nix-shell plutus-tutorial.nix
```  

Quá trình này sẽ mất khoảng năm hoặc mười phút, sau đó, bạn sẽ thấy một cái gì đó tương tự như sau:
```
these paths will be fetched (445.08 MiB download, 5870.53 MiB unpacked):

/nix/store/04jc7s1006vhg3qj4fszg6bcljlyap1a-conduit-parse-0.2.1.0-doc

/nix/store/052kzx9p5fl52pk436i2jcsqkz3ni0r2-reflection-2.1.6-doc
.
.
.
/nix/store/7jq1vjy58nj8rjwa688l5x7dyzr55d9f-monad-memo-0.5.3... (34 KB left)

```

Điều này tạo ra một môi trường với tất cả các phụ thuộc được liệt kê trong phần “buildInputs”, với GHC 8.10.4 và Cabal trong số đó.

Khi bạn có phiên bản gần đây của GHC và Cabal, hãy đảm bảo sử dụng GHC 8.10.2 trở lên:
```
ghc --version
The Glorious Glasgow Haskell Compilation System, version 8.10.4

cabal --version
cabal-install version 3.4.0.0
compiled using version 3.4.0.0 of the Cabal library

```

## Chạy cardano-node

Bên trong nix-shell bắt đầu một nút Cardano thụ động:

```
nix-shell plutus-tutorial.nix

[nix-shell:~]$ cardano-node-alonzo-purple
```

Tại thời điểm này, nút sẽ bắt đầu đồng bộ hóa với mạng. Bây giờ chúng tôi đã sẵn sàng để bắt đầu xây dựng giao dịch Plutus. Giữ cho nút chạy trong trình bao này và mở một thiết bị đầu cuối mới để tiếp tục các bước sau. Hãy nhớ nhập môi trường nix-shell trong thiết bị đầu cuối mới này để bạn có sẵn cả GHC và Cabal.

### Plutus tx: Biên dịch tập lệnh Plutus


1. **Clone the `AlwaysSucceeds` Plutus script**. Viết một chương trình Haskell sử dụng nó để biên dịch tập lệnh Plutus mong muốn của chúng tôi hoặc bạn có thể sử dụng nguồn cho dự án  [plutus-alwayssucceeds](https://github.com/input-output-hk/Alonzo-testnet/tree/main/resources/plutus-sources/plutus-alwayssucceeds).


```
[nix-shell:~]$ git clone https://github.com/input-output-hk/Alonzo-testnet.git

[nix-shell:~]$ cd Alonzo-testnet/resources/plutus-sources/plutus-alwayssucceeds
```

 
2. **Compile the plutus-alwayssucceeds project**. Dự án  `AlwaysSucceeds`  này chứa tập lệnh Plutus. Bằng cách xây dựng dự án `plutus-alwayssucceeds`, chúng tôi tạo một tệp nhị phân để biên dịch tập lệnh này.

 
```
[nix-shell:~/Alonzo-testnet/resources/plutus-sources/plutus-alwayssucceeds]$ cabal update

[nix-shell:~/Alonzo-testnet/resources/plutus-sources/plutus-alwayssucceeds]$ cabal build
```


3. **Execute the plutus-alwayssucceeds project**.  Chúng tôi sẽ chọn một số ngẫu nhiên. Nó sẽ được chuyển làm đối số cho tập lệnh Plutus (nó không được tập lệnh sử dụng ngay bây giờ, nhưng sẽ được yêu cầu bởi các giao dịch sử dụng tập lệnh). Đối số thứ hai là tên tệp chúng tôi sử dụng cho tập lệnh Plutus đã biên dịch.

```
cabal run plutus-alwayssucceeds -- 42 alwayssucceeds.plutus
```

Bạn sẽ thấy một cái gì đó như thế này:

```
Up to date

Writing output to: alwayssucceeds.plutus

"Log output"

[]

"Ex Budget"

ExBudget {_exBudgetCPU = ExCPU 1390000, _exBudgetMemory = ExMemory 100}
```

Mở file kết quả.
```
 
[nix-shell:~/Alonzo-testnet/resources/plutus-sources/plutus-alwayssucceeds]$ cat alwayssucceeds.plutus

{
"type": "PlutusScriptV1",
"description": "",
"cborHex": "4e4d01000033222220051200120011"
}
```

Sau đó, chúng tôi sẽ biên dịch script Plutus. Bây giờ, chúng ta cần xây dựng giao dịch trong Alonzo testnet bằng cách sử dụng [cardano-node-cli](https://github.com/input-output-hk/cardano-node/blob/master/doc/reference/cardano-node-cli-reference.md/) bao gồm tập lệnh Plutus.
  

## Tạo ví

1. **Đảm bảo rằng bạn có phiên bản được gắn thẻ mới nhất của kỷ nguyên Alonzo**.  Bây giờ bạn sẽ thấy những điều sau:

```
cardano-cli query tip --testnet-magic $TESTNET_MAGIC
{
"epoch": 188,
"hash": "ec200f79ee7f35f2b8ffd3dc8cfe1f51c425fedceb2369f722ad5e5b6f5f223f",
"slot": 660481,
"block": 31229,
"era": "Alonzo",
"syncProgress": "100.00"
}

```

Lưu ý: Đảm bảo rằng “thời đại” tương ứng với “Alonzo”. Nếu bạn vừa mới bắt đầu nút, bạn có thể cần phải đợi nút của mình đồng bộ hóa trước khi bạn có thể thấy điều này. Nút thực sự không cần thiết để xây dựng một giao dịch, nhưng sẽ rất hữu ích khi gửi giao dịch đó lên mạng.

  

2. **Tạo các keys**.  Để gửi giao dịch, chúng ta cần tạo hai ví như sau. Đối với bước này, hãy tạo khóa thanh toán tại địa chỉ tương ứng:

```

cardano-cli address key-gen \
--verification-key-file payment.vkey \
--signing-key-file payment.skey
  
cardano-cli stake-address key-gen \
--verification-key-file stake.vkey \
--signing-key-file stake.skey

cardano-cli address build \
--payment-verification-key-file payment.vkey \
--stake-verification-key-file stake.vkey \
--out-file payment.addr \
--testnet-magic $TESTNET_MAGIC 
```

```
cat payment.addr
addr_test ...
```

Đảm bảo tạo ví bổ sung bằng cách sử dụng các bước tương tự ở trên để bạn có thể kiểm tra giao dịch giữa các địa chỉ này.

## Xây dựng và gửi một giao dịch đơn giản (không phải Plutus)

Trong giao dịch đơn giản này, chúng tôi gửi tiền từ một địa chỉ cá nhân đến một địa chỉ khác. Giả sử rằng chúng tôi có các địa chỉ này trong các tệp `payment.addr` và `payment2.addr`  và chúng tôi muốn gửi 30.000 ada từ địa chỉ đầu tiên đến địa chỉ thứ hai.

  

1. **Query UTXO**. Đầu tiên, chúng ta cần truy vấn các UTXO trong `payment. addr`:

```
cardano-cli query utxo --address $(cat payment.addr) --testnet-magic $TESTNET_MAGIC
```

Xem xét địa chỉ của bạn có số dư, bạn sẽ thấy một cái gì đó như sau:

```  
TxHash TxIx Amount

--------------------------------------------------------------------------------------

77aff3e7cdedf4874f4bf6c1e79dd9a1a250b32a342d0bdb885b1f7a41a49ca6 0 1000000000000 lovelace + TxOutDatumHashNone
```
 
2. **Build the transaction.** USử dụng thông tin này, chúng tôi có thể xây dựng một giao dịch:

  

```
cardano-cli transaction build \
--alonzo-era \
--testnet-magic ${TESTNET_MAGIC} \
--change-address $(cat payment.addr) \
--tx-in 77aff3e7cdedf4874f4bf6c1e79dd9a1a250b32a342d0bdb885b1f7a41a49ca6#0 \
--tx-out $(cat payment2.addr)+30000000000 \
--out-file tx.build
```

  

Trong đối số `--tx-in` chúng tôi đặt UTXO mà chúng tôi đang sử dụng làm đầu vào, định dạng của nó là  TxHash#TxIx.

Các đối số `--tx-out` xác định đầu ra của UTXO mới, định dạng `address`+`amount`.

Như đã thấy trong sơ đồ dòng ở trên, chúng ta có thể có một hoặc nhiều đầu vào và đầu ra..

 

3. **Sign and submit the transaction.**

```
cardano-cli transaction sign \
--tx-body-file tx.build \
--testnet-magic ${TESTNET_MAGIC} \
--signing-key-file payment.skey \
--out-file tx.signed

cardano-cli transaction submit --tx-file tx.signed --testnet-magic ${TESTNET_MAGIC}

Transaction successfully submitted.

```

Bây giờ nếu chúng ta truy vấn Payment2.addr, chúng ta sẽ có một UTxO mới chứa 30.000 ADA:

  
```
cardano-cli query utxo --address $(cat payment2.addr) --testnet-magic ${TESTNET_MAGIC}

TxHash TxIx Amount

--------------------------------------------------------------------------------------

4df1c8d902f01f04e49f3d7397881af33591a99fcef807ba12ed822fa4c61da0 1 30000000000 lovelace + TxOutDatumHashNone
 
cardano-cli query utxo --address $(cat payment.addr) --testnet-magic ${TESTNET_MAGIC}
  
TxHash TxIx Amount

--------------------------------------------------------------------------------------

4df1c8d902f01f04e49f3d7397881af33591a99fcef807ba12ed822fa4c61da0 0 969999831639 lovelace + TxOutDatumHashNone  
```

Bây giờ chúng tôi đã gửi một giao dịch đơn giản.

## Giao dịch để khóa tiền

Một giao dịch để khóa tiền rất giống với một giao dịch đơn giản. Tuy nhiên, nó có hai điểm khác biệt chính: chúng tôi khóa tiền vào một địa chỉ tập lệnh thay vì một địa chỉ cá nhân và chúng tôi cần chỉ định một hàm băm dữ liệu cho mọi đầu ra.

Đầu tiên, hãy sử dụng tập lệnh trình xác thực Plutus sau:

```
{-# INLINABLE mkValidator #-}

mkValidator :: Data -> Data -> Data -> ()

mkValidator _ _ _ = ()

```

Tập lệnh này sẽ không kiểm tra bất kỳ điều gì và sẽ luôn thành công bất kể giá trị của dữ liệu và công cụ đổi.

1. **Để tính toán địa chỉ tập lệnh**, chúng tôi sẽ sử dụng tập lệnh Plutus mà chúng tôi đã biên dịch  `alwayssucceeds.plutus`:

```

cardano-cli address build \
--payment-script-file alwayssucceeds.plutus \
--testnet-magic ${TESTNET_MAGIC} \
--out-file script.addr
```

Bây giờ địa chỉ tập lệnh nằm trong tệp `script.addr`:

```
cat script.addr
addr_test1wpnlxv2xv9a9ucvnvzqakwepzl9ltx7jzgm53av2e9ncv4sysemm8
```

2. Chúng tôi không đính kèm trực tiếp dữ liệu vào UTXO nhưng chúng tôi sử dụng hàm băm của nó. Để lấy mã băm của dữ liệu, hãy chạy lệnh `cardano-cli` sau:

```
cardano-cli transaction hash-script-data --script-data-value 12 

export scriptdatumhash=5e9d8bac576e8604e7c3526025bc146f5fa178173e3a5592d122687bd785b520
```

3. **Nhận các tham số giao thức**. Nhận các tham số giao thức và lưu chúng vào `pparams.json`:

```
cardano-cli query protocol-parameters \
--testnet-magic ${TESTNET_MAGIC} \
--out-file pparams.json
```

4. **Build the transaction.** Bây giờ, chúng ta nên tạo tx sẽ gửi ADA đến địa chỉ tập lệnh của tập lệnh AlwaysSucceeds của chúng tôi. Chúng tôi viết giao dịch trong một tệp `tx-script.build`:

```
cardano-cli transaction build \
--alonzo-era \
--testnet-magic ${TESTNET_MAGIC} \
--change-address $(cat payment.addr) \
--tx-in 4df1c8d902f01f04e49f3d7397881af33591a99fcef807ba12ed822fa4c61da0#0 \
--tx-out $(cat script.addr)+20000000 \
--tx-out-datum-hash ${scriptdatumhash} \
--protocol-params-file pparams.json \
--out-file tx-script.build
```

5. **Sign the transaction**. Ký giao dịch bằng khóa bí mật `payment.skey` và lưu giao dịch đã ký vào `tx-script.signed`:
 
```
cardano-cli transaction sign \
--tx-body-file tx-script.build \
--signing-key-file payment.skey \
--testnet-magic ${TESTNET_MAGIC} \
--out-file tx-script.signed
```  

6. **Submit the transaction**:

```
cardano-cli transaction submit --testnet-magic ${TESTNET_MAGIC} --tx-file tx-script.signed
 
Transaction successfully submitted.
```

  

7. **Check the balances**. Chúng tôi có thể truy vấn cả địa chỉ cá nhân và địa chỉ tập lệnh:

```
cardano-cli query utxo --address $(cat payment.addr) --testnet-magic ${TESTNET_MAGIC}
```
```
TxHash 								TxIx 						Amount

--------------------------------------------------------------------------------------

2db009bc57c9855a89ec9dc8c99744552fc87df1255eedbdc1db58b1db8dfe59 0 969979663190 lovelace + TxOutDatumHashNone
```
```
cardano-cli query utxo --address $(cat script.addr) --testnet-magic ${TESTNET_MAGIC}
 
```
```
TxHash 									TxIx 					Amount

--------------------------------------------------------------------------------------

2db009bc57c9855a89ec9dc8c99744552fc87df1255eedbdc1db58b1db8dfe59 1 20000000 lovelace + TxOutDatumHash ScriptDataInAlonzoEra "5e9d8bac576e8604e7c3526025bc146f5fa178173e3a5592d122687bd785b520"
.
.
.
```
 ```
export plutusutxotxin=2db009bc57c9855a89ec9dc8c99744552fc87df1255eedbdc1db58b1db8dfe59#1
```

Bây giờ, chúng tôi đã gửi tiền cho một kịch bản.


## Giao dịch để mở khóa tiền từ một tập lệnh

Để mở khóa tiền từ một tập lệnh, chúng tôi cần người đổi. Hãy nhớ rằng tập lệnh này sẽ luôn thành công bất kể giá trị của trình đổi quà là bao nhiêu, miễn là chúng tôi cung cấp mức dữ liệu chính xác. Vì vậy, chúng tôi có thể sử dụng bất kỳ giá trị nào làm công cụ đổi quà. Chúng tôi cũng cần một đầu vào làm tài sản thế chấp: nó bao gồm các khoản phí nếu giao dịch không thành công. Sau đó, chúng tôi cần một UTXO với đủ tiền. Chúng tôi sẽ tạo một giao dịch đơn giản bằng cách sử dụng `payment2.addr` làm ví dụ.

Nó dẫn đến hai UTXO mới.

1. **Check the balances**:

```
cardano-cli query utxo --address $(cat payment2.addr) --testnet-magic ${TESTNET_MAGIC}
```
```
TxHash TxIx Amount

--------------------------------------------------------------------------------------

4df1c8d902f01f04e49f3d7397881af33591a99fcef807ba12ed822fa4c61da0 1 30000000000 lovelace + TxOutDatumHashNone
```
```
export txCollateral="4df1c8d902f01f04e49f3d7397881af33591a99fcef807ba12ed822fa4c61da0#1"
```

2. **Construct, sign, and submit** giao dịch mới để mở khóa:

```
cardano-cli transaction build \
--alonzo-era \
--testnet-magic ${TESTNET_MAGIC} \
--tx-in ${plutusutxotxin} \
--tx-in-script-file alwayssucceeds.plutus \
--tx-in-datum-value 42 \
--tx-in-redeemer-value 22 \
--tx-in-collateral ${txCollateral} \
--change-address $(cat payment.addr) \
--protocol-params-file pparams.json \
--out-file test-alonzo.tx
```

Nếu chúng tôi sử dụng UTXO là một phần của địa chỉ tập lệnh làm đầu vào của giao dịch, chúng tôi cần chỉ định các đối số `--tx-in-script-file  --tx-in datum-value  --tx-in-redeemer-value --tx-in-collateral` sau là đối số `--tx-in` chưa UTXO đó:

```
cardano-cli transaction sign \
--tx-body-file test-alonzo.tx \
--signing-key-file payment2.skey \
--testnet-magic ${TESTNET_MAGIC} \
--out-file test-alonzo.signed
```
```
cardano-cli transaction submit --testnet-magic ${TESTNET_MAGIC} --tx-file test-alonzo.signed 
```
```
Transaction successfully submitted.
```

Bây giờ, nếu chúng tôi truy vấn cả hai địa chỉ, chúng tôi có thể thấy rằng chúng tôi đã mở khóa tiền

```
cardano-cli query utxo --address $(cat payment2.addr) --testnet-magic ${TESTNET_MAGIC}
```
 ```
cardano-cli query utxo --address $(cat untyped-always-succeeds-txin.addr) --testnet-magic ${TESTNET_MAGIC}
```

Lưu ý rằng chúng tôi chỉ định số magic hiện được gán cho chuỗi Alonzo và theo cách tương tự, chúng tôi chỉ định giao dịch vừa được ký trong lệnh trước đó.

Tại thời điểm này, bạn đã gửi thành công giao dịch Plutus đầu tiên của mình!

