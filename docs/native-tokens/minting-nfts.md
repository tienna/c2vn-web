---
id: Mint-nfts
title: Mint NFT
sidebar_label: Mint NFT
description: Cách Mint NFT trên Cardano.
---

<iframe width="100%" height="325" src="https://www.youtube.com/embed/IeB-QgRk95A" title="Hướng dẫn tạo token trên Cardano bằng câu lệnh" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

:::note Có nhiều cách để nhận ra NFT với Cardano. Tuy nhiên, trong hướng dẫn này, chúng tôi sẽ tập trung vào cách chiếm ưu thế nhất, để đính kèm các tham chiếu lưu trữ của các dịch vụ khác như [IPFS](https://ipfs.io/) vào mã thông báo của chúng tôi. :::

## Có gì khác biệt?

Sự khác biệt giữa tài sản gốc và NFT là gì?
 Từ quan điểm kỹ thuật, NFT giống như tài sản gốc. Nhưng một số đặc điểm bổ sung làm cho nội dung gốc thực sự là một NFT:

1. Như tên gọi - nó phải là 'không thể thay thế'. Điều này có nghĩa là bạn cần phải có các số nhận dạng hoặc thuộc tính duy nhất được đính kèm với một mã thông báo để làm cho mã đó có thể phân biệt được với các mã khác.
2. Hầu hết thời gian, NFT sẽ tồn tại mãi mãi trên chuỗi. Do đó, chúng tôi cần một số cơ chế để đảm bảo NFT luôn là duy nhất và không thể trùng lặp.

### policyID

Tài sản gốc trong Cardano có các đặc điểm sau:

1. Một số tiền/giá trị (có bao nhiêu?)
2. Một cái tên
3. `policyID` duy nhất

Vì tên tài sản không phải là duy nhất và có thể dễ dàng bị trùng lặp, nên các Cardano NFT cần được xác định bằng `policyID` .
 ID này là duy nhất và được gắn vĩnh viễn vào nội dung. ID chính sách bắt nguồn từ tập lệnh chính sách xác định các đặc điểm như ai có thể Mint mã thông báo và thời điểm có thể thực hiện các hành động đó.

Nhiều dự án NFT cung cấp `policyID` mà theo đó các NFT được Mint có sẵn công khai, vì vậy bất kỳ ai cũng có thể phân biệt các NFT gian lận/trùng lặp với các mã thông báo ban đầu.

Một số dịch vụ thậm chí còn đề nghị đăng ký `policyID` của bạn để phát hiện các mã thông báo có các thuộc tính giống như mã thông báo của bạn nhưng được Mint theo một chính sách khác.

### Thuộc tính siêu dữ liệu

Ngoài `policyID` duy nhất, chúng tôi cũng có thể đính kèm siêu dữ liệu với các thuộc tính khác nhau vào một giao dịch.

Đây là một ví dụ từ [nft-maker.io](https://www.nft-maker.io/)

```json
{
  "721": {
    "{policy_id}": {
      "{policy_name}": {
        "name": "<required>",
        "description": "<optional>",
        "sha256": "<required>",
        "type": "<required>",
        "image": "<required>",
        "location": {
          "ipfs": "<required>",
          "https": "<optional>",
          "arweave": "<optional>"
        }
      }
    }
  }
}
```

Siêu dữ liệu giúp chúng tôi hiển thị những thứ như URI hình ảnh và những thứ thực sự biến nó thành một NFT. Với giải pháp đính kèm siêu dữ liệu này, các nền tảng của bên thứ ba như [pool.pm](https://pool.pm/) có thể dễ dàng truy ngược lại giao dịch Mint cuối cùng, đọc siêu dữ liệu cũng như truy vấn hình ảnh và thuộc tính tương ứng. Truy vấn sẽ giống như thế này:

1. Nhận tên nội dung và `policyID` .
2. Tra cứu giao dịch Mint mới nhất của tài sản này.
3. Kiểm tra siêu dữ liệu cho nhãn `721` .
4. Khớp tên nội dung và (trong trường hợp này) mục nhập {policy_name}.
5. Truy vấn hàm băm IPFS và tất cả các thuộc tính khác cho mục nhập tương ứng.

:::note **Hiện tại không có tiêu chuẩn thống nhất nào về cách xác định NFT hoặc siêu dữ liệu.** Tuy nhiên, có [Đề xuất cải tiến Cardano](https://github.com/cardano-foundation/CIPs/pull/85) nếu bạn muốn theo dõi cuộc thảo luận. :::

### Khóa thời gian

Vì NFT có khả năng được giao dịch hoặc bán nên chúng phải tuân theo một chính sách nghiêm ngặt hơn. Hầu hết thời gian, một giá trị được xác định bởi sự khan hiếm (nhân tạo) của một tài sản.

Bạn có thể điều chỉnh các yếu tố như vậy bằng [tập lệnh đa chữ ký](https://github.com/input-output-hk/cardano-node/blob/c6b574229f76627a058a7e559599d2fc3f40575d/doc/reference/simple-scripts.md) .

Đối với hướng dẫn này, chúng tôi sẽ chọn các ràng buộc sau:

1. Chỉ nên có một chữ ký xác định được phép Mint (hoặc ghi) NFT.
2. Chữ ký sẽ hết hạn sau **10000 chỗ** kể từ bây giờ để rời khỏi phòng nếu chúng tôi làm hỏng điều gì đó.

## Điều kiện tiên quyết

Ngoài các yêu cầu cần thiết giống như trong hướng dẫn [Mint nội dung gốc](minting.md) , chúng tôi sẽ cần thêm:

1. Rõ ràng, bạn muốn tạo bao nhiêu NFT.
     -&gt; Chúng tôi sẽ chỉ tạo một NFT
2. Một `metadata.json` đã được điền sẵn
3. Biết chính sách Mint token của bạn sẽ như thế nào. -&gt; Chỉ cho phép một chữ ký (mà chúng tôi sẽ tạo trong hướng dẫn này)
     -&gt; Không được phép Mint hoặc đốt tài sản nữa sau khi 10000 vị trí đã trôi qua kể từ khi giao dịch được thực hiện
4. Băm nếu hình ảnh được tải lên IPFS
     -&gt; Chúng tôi sẽ sử dụng [hình ảnh](https://gateway.pinata.cloud/ipfs/QmRhTTbUrPYEw3mJGGhQqQST9k86v1DPBiTTWJGKDJsVFw) này

:::note Chúng tôi khuyên bạn nên tải hình ảnh lên IPFS vì đây là dịch vụ lưu trữ phi tập trung phổ biến nhất. Có nhiều lựa chọn thay thế, nhưng IPFS được áp dụng nhiều nhất xét về số lượng NFT được Mint. :::

## Cài đặt

Vì quá trình tạo nội dung gốc được ghi lại rộng rãi trong chương [Mint token](minting.md) nên chúng tôi sẽ không đi sâu vào chi tiết ở đây. Đây là một bản tóm tắt nhỏ và thiết lập cần thiết

### Thư mục làm việc

Trước hết, chúng ta sẽ thiết lập một thư mục làm việc mới và thay đổi nó.

```bash
mkdir nft
cd nft/
```

### Đặt biến

Chúng tôi sẽ đặt các giá trị quan trọng trong một biến dễ đọc hơn để dễ đọc hơn và gỡ lỗi các giao dịch không thành công.

Kể từ phiên bản nút cardano 1.31.0, tên mã thông báo phải ở định dạng hex. Chúng ta sẽ đặt biến $realtokenname (tên thật ở định dạng utf-8) và sau đó chuyển nó thành $tokenname (tên ở định dạng hex).

```bash
realtokenname="NFT1"
tokenname=$(echo -n $realtokenname | xxd -b -ps -c 80 | tr -d '\n')
tokenamount="1"
fee="0"
output="0"
ipfs_hash="please insert your ipfs hash here"
```

:::note Hàm băm IPFS là một yêu cầu quan trọng và có thể được tìm thấy sau khi bạn tải hình ảnh của mình lên IPFS. Đây là một ví dụ về giao diện của IPFS khi một hình ảnh được tải lên trong [pinata](https://pinata.cloud/) ![hình ảnh](https://user-images.githubusercontent.com/34856010/162868237-0085e25f-daa0-4cfc-b82d-0c85ad2dec1c.png)

:::

### Tạo khóa và địa chỉ

Chúng tôi sẽ tạo khóa mới và địa chỉ thanh toán mới:

```bash
cardano-cli address key-gen --verification-key-file payment.vkey --signing-key-file payment.skey
```

Hai khóa đó hiện có thể được sử dụng để tạo địa chỉ.

```bash
cardano-cli address build --payment-verification-key-file payment.vkey --out-file payment.addr --mainnet
```

Chúng tôi sẽ lưu hàm băm địa chỉ của chúng tôi trong một biến có tên là địa chỉ.

```bash
address=$(cat payment.addr)
```

### Địa chỉ quỹ

Gửi các giao dịch luôn yêu cầu bạn phải trả một khoản phí. Gửi nội dung gốc yêu cầu gửi ít nhất 1 ada.
 Vì vậy, hãy đảm bảo rằng địa chỉ bạn sẽ sử dụng làm đầu vào cho giao dịch Mint token có đủ tiền. Ví dụ của chúng tôi, địa chỉ mới được tạo đã được tài trợ bằng 10 ada.

```bash
cardano-cli query utxo --address $address --mainnet
```

Bạn sẽ thấy một cái gì đó như thế này.

```bash
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
974e98c4529f8fc75fa8baf5618f7b5ade81aa9ed29ce33cd1c2f2e70838180e     0        10000000 lovelace
```

### Xuất thông số giao thức

Để tính toán giao dịch của chúng tôi, chúng tôi cần một số tham số giao thức hiện tại. Các tham số có thể được lưu trong một tệp có tên là `protocol.json` bằng lệnh này:

```bash
cardano-cli query protocol-parameters --mainnet --out-file protocol.json
```

### Tạo ID chính sách

Giống như khi tạo nội dung gốc, chúng tôi sẽ cần tạo một số tệp liên quan đến chính sách như cặp khóa và tập lệnh chính sách.

```bash
mkdir policy
```

:::note Chúng tôi không thay đổi thư mục này và mọi thứ được thực hiện từ thư mục làm việc của chúng tôi. :::

Tạo một bộ cặp khóa mới:

```bash
cardano-cli address key-gen \
    --verification-key-file policy/policy.vkey \
    --signing-key-file policy/policy.skey
```

Thay vì chỉ xác định một chữ ký duy nhất (như chúng tôi đã làm trong hướng dẫn tạo nội dung gốc), tệp tập lệnh của chúng tôi cần triển khai các đặc điểm sau (mà chúng tôi đã xác định ở trên):

1. Chỉ cho phép một chữ ký
2. Không cho phép Mint thêm hoặc đốt tài sản sau khi 10000 vị trí đã trôi qua kể từ khi giao dịch được thực hiện

Đối với mục đích cụ thể này, tệp `policy.script` sẽ trông như thế này:

```json
{
  "type": "all",
  "scripts":
  [
    {
      "type": "before",
      "slot": <insert slot here>
    },
    {
      "type": "sig",
      "keyHash": "insert keyHash here"
    }
  ]
}
```

Như bạn có thể thấy, chúng ta cần điều chỉnh hai giá trị ở đây, số `slot` cũng như `keyHash` .

Để đặt mọi thứ cùng một lúc và sao chép và dán nó, hãy sử dụng (các) lệnh này: **Bạn cần cài đặt `jq` để phân tích mẹo chính xác!**

```bash
echo "{" >> policy/policy.script
echo "  \"type\": \"all\"," >> policy/policy.script
echo "  \"scripts\":" >> policy/policy.script
echo "  [" >> policy/policy.script
echo "   {" >> policy/policy.script
echo "     \"type\": \"before\"," >> policy/policy.script
echo "     \"slot\": $(expr $(cardano-cli query tip --mainnet | jq .slot?) + 10000)" >> policy/policy.script
echo "   }," >> policy/policy.script
echo "   {" >> policy/policy.script
echo "     \"type\": \"sig\"," >> policy/policy.script
echo "     \"keyHash\": \"$(cardano-cli address key-hash --payment-verification-key-file policy/policy.vkey)\"" >> policy/policy.script
echo "   }" >> policy/policy.script
echo "  ]" >> policy/policy.script
echo "}" >> policy/policy.script
```

**Nếu lệnh này không hoạt động, vui lòng đặt mã băm chính và vị trí chính xác theo cách thủ công.**

Để tạo `keyHash` , hãy sử dụng lệnh sau:

```bash
cardano-cli address key-hash --payment-verification-key-file policy/policy.vkey
```

Để tính đúng vị trí, hãy truy vấn vị trí hiện tại và thêm 10000 vào vị trí đó:

```bash
cardano-cli query tip --mainnet
```

Tạo một tệp mới có tên policy.script trong thư mục chính sách

```bash
touch policy/policy.script
```

Dán JSON từ phía trên, điền `keyHash` và số `slot` của bạn vào đó

```bash
nano policy/policy.script
```

:::note Xin lưu ý rằng số vị trí được định nghĩa là một số nguyên và do đó không cần dấu ngoặc kép, trong khi `keyHash` được định nghĩa là một chuỗi và cần được đặt trong dấu ngoặc kép. :::

Vui lòng ghi lại số vị trí của bạn và lưu nó vào một biến.

```bash
slotnumber="Replace this with your slot number"
```

Và cũng lưu vị trí của tệp script vào một biến.

```bash
script="policy/policy.script"
```

Bước cuối cùng là tạo policyID:

```bash
cardano-cli transaction policyid --script-file ./policy/policy.script > policy/policyID
```

### metadata

Vì hiện tại chúng tôi đã xác định chính sách cũng như `policyID` của mình, nên chúng tôi cần điều chỉnh thông tin siêu dữ liệu của mình.

Đây là một ví dụ về metadata.json mà chúng tôi sẽ sử dụng cho hướng dẫn này:

```json
{
        "721": {
            "please_insert_policyID_here": {
              "NFT1": {
                "description": "This is my first NFT thanks to the Cardano foundation",
                "name": "Cardano foundation NFT guide token",
                "id": 1,
                "image": ""
              }
            }
        }
}
```

:::note Phần tử thứ ba trong hệ thống phân cấp cần phải có cùng tên với nội dung gốc NFT của chúng tôi. :::

Lưu tệp này dưới dạng `metadata.json` .

Nếu bạn muốn tạo nó "một cách nhanh chóng", hãy sử dụng các lệnh sau:

```bash
echo "{" >> metadata.json
echo "  \"721\": {" >> metadata.json
echo "    \"$(cat policy/policyID)\": {" >> metadata.json
echo "      \"$(echo $realtokenname)\": {" >> metadata.json
echo "        \"description\": \"This is my first NFT thanks to the Cardano foundation\"," >> metadata.json
echo "        \"name\": \"Cardano foundation NFT guide token\"," >> metadata.json
echo "        \"id\": \"1\"," >> metadata.json
echo "        \"image\": \"ipfs://$(echo $ipfs_hash)\"" >> metadata.json
echo "      }" >> metadata.json
echo "    }" >> metadata.json
echo "  }" >> metadata.json
echo "}" >> metadata.json
```

:::note Vui lòng đảm bảo rằng giá trị hình ảnh / hàm băm IPFS được đặt với giao thức sửa sẵn giao thức chính xác <i>ipfs://</i>
 (ví dụ <i>: "ipfs://QmRhTTbUrPYEw3mJGGhQqQST9k86v1DPBiTTWJGKDJsVFw"</i> )

:::

### Lập giao dịch

Hãy bắt đầu xây dựng giao dịch của chúng tôi. Trước khi bắt đầu, một lần nữa chúng ta sẽ cần một số thiết lập để giúp việc xây dựng giao dịch dễ dàng hơn. Truy vấn địa chỉ thanh toán của bạn và lưu ý các giá trị khác nhau hiện có.

```bash
cardano-cli query utxo --address $address --mainnet
```

Đầu ra của bạn sẽ trông giống như thế này (ví dụ hư cấu):

```bash
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
b35a4ba9ef3ce21adcd6879d08553642224304704d206c74d3ffb3e6eed3ca28     0        1000000000 lovelace
```

Vì chúng tôi cần từng giá trị đó trong giao dịch của mình nên chúng tôi sẽ lưu trữ chúng riêng lẻ trong một biến tương ứng.

```bash
txhash="insert your txhash here"
txix="insert your TxIx here"
funds="insert Amount in lovelace here"
policyid=$(cat policy/policyID)
output=1400000
```

Ở đây, chúng tôi đang đặt giá trị `output` thành `1400000` Lovelace, tương đương với `1.4` ADA. Số tiền này được sử dụng vì đây là yêu cầu UTxO tối thiểu.

Nếu bạn không chắc chắn, hãy kiểm tra xem tất cả các biến cần thiết khác cho giao dịch đã được đặt chưa:

```bash
echo $fee
echo $address
echo $output
echo $tokenamount
echo $policyid
echo $tokenname
echo $slotnumber
echo $script
```

Nếu mọi thứ đã được đặt, hãy chạy lệnh sau:

```bash
cardano-cli transaction build \
--mainnet \
--alonzo-era \
--tx-in $txhash#$txix \
--tx-out $address+$output+"$tokenamount $policyid.$tokenname" \
--change-address $address \
--mint="$tokenamount $policyid.$tokenname" \
--minting-script-file $script \
--metadata-json-file metadata.json  \
--invalid-hereafter $slotnumber \
--witness-override 2 \
--out-file matx.raw
```

Lệnh trên có thể tạo đầu ra theo bên dưới:

```bash
Minimum required UTxO: Lovelace 1448244
```

Điều này có nghĩa là chúng ta cần thay đổi giá trị của biến `$output` thành giá trị đã cho.

```
output=1448244
```

Hãy nhớ sử dụng giá trị mà bạn nhận được trong đầu ra của riêng mình.

Nếu giá trị tối thiểu là đúng thì lệnh này sẽ tạo `matx.raw` và sẽ cho đầu ra tương tự như:

```bash
Estimated transaction fee: Lovelace 176677
```

**LƯU Ý** : Có thể giá trị Lovelace dành cho bạn là khác.

Ký giao dịch

```bash
cardano-cli transaction sign  \
--signing-key-file payment.skey  \
--signing-key-file policy/policy.skey  \
--mainnet --tx-body-file matx.raw  \
--out-file matx.signed
```

:::note Giao dịch đã ký sẽ được lưu trong một tệp mới có tên <i>matx.signed</i> thay vì <i>matx.raw</i> . :::

Bây giờ chúng tôi sẽ gửi giao dịch, do đó Mint tài sản gốc của chúng tôi:

```bash
cardano-cli transaction submit --tx-file matx.signed --mainnet
```

Xin chúc mừng, chúng tôi hiện đã Mint thành công mã thông báo của riêng mình. Sau vài giây, chúng ta có thể kiểm tra địa chỉ đầu ra

```bash
cardano-cli query utxo --address $address --mainnet
```

và sẽ thấy một cái gì đó như thế này:

### Hiển thị NFT của bạn

Một trong những trình duyệt NFT được sử dụng nhiều nhất là [pool.pm](https://pool.pm/tokens) . Nhập địa chỉ của bạn vào thanh tìm kiếm, nhấn enter và NFT của bạn sẽ được hiển thị với tất cả các thuộc tính và hình ảnh tương ứng.

![hình ảnh](https://user-images.githubusercontent.com/34856010/162868291-aeafb26c-fafa-4ab0-8ca0-14a7fa60e3b1.png)

Bạn có thể tự kiểm tra và xem NFT được tạo cho hướng dẫn này [tại đây](https://pool.pm/6574f051ee0c4cae35c0407b9e104ed8b3c9cab31dfb61308d69f33c.NFT1) .

## Ghi mã thông báo của bạn

Nếu bạn làm hỏng thứ gì đó và muốn bắt đầu lại, bạn luôn có thể ghi mã thông báo của mình nếu vị trí được xác định trong tập lệnh chính sách của bạn chưa kết thúc. Giả sử bạn vẫn còn mọi biến được đặt, bạn cần đặt lại:

```bash
burnfee="0"
burnoutput="0"
txhash="Insert your utxo holding the NFT"
txix="Insert your txix"
burnoutput=1400000
```

Ở đây, chúng tôi đang đặt giá trị `output` thành `1400000` Lovelace, tương đương với `1.4` ADA. Số tiền này được sử dụng vì đây là yêu cầu UTxO tối thiểu.

Giao dịch trông như thế này:

```bash
cardano-cli transaction build --mainnet --alonzo-era --tx-in $txhash#$txix --tx-out $address+$burnoutput --mint="-1 $policyid.$tokenname" --minting-script-file $script --change-address $address --invalid-hereafter $slot --witness-override 2 --out-file burning.raw
```

:::note Tham số Mint hiện được gọi với giá trị âm, do đó hủy một mã thông báo. :::

Ký giao dịch.

```bash
cardano-cli transaction sign  --signing-key-file payment.skey  --signing-key-file policy/policy.skey --mainnet  --tx-body-file burning.raw --out-file burning.signed
```

Gửi đầy đủ.

```bash
cardano-cli transaction submit --tx-file burning.signed --mainnet
```
