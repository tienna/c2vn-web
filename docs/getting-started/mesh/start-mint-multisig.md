---
id: start-mint-multisig
sidebar_position: '11'
title: Tạo giao dịch multi-sig và đúc NFT
sidebar_label: Tạo giao dịch multi-sig và đúc NFT
description: Tiao dịch đa chữ ký (multi-sig) yêu cầu nhiều người dùng ký giao dịch trước khi giao dịch được phát trên chuỗi khối. Bạn có thể coi nó giống như tài khoản tiết kiệm của vợ chồng, trong đó cần phải có cả hai chữ ký để tiêu tiền, ngăn không cho một vợ hoặc chồng tiêu tiền mà không có sự chấp thuận của người kia. Đối với giao dịch nhiều chữ ký, bạn có thể bao gồm 2 người ký bắt buộc trở lên, những người ký này có thể là ví ( Ví trình duyệt hoặc Ví ứng dụng ) hoặc tập lệnh Plutus.
#image: "../img/og/og-getstarted-mesh.png"
---


# Giao dịch đa chữ ký (Đúc tiền)
*Tạo giao dịch multi-sig và đúc NFT*

Giao dịch đa chữ ký (multi-sig) yêu cầu nhiều người dùng ký giao dịch trước khi giao dịch được phát trên chuỗi khối. Bạn có thể coi nó giống như tài khoản tiết kiệm của vợ chồng, trong đó cần phải có cả hai chữ ký để tiêu tiền, ngăn không cho một vợ hoặc chồng tiêu tiền mà không có sự chấp thuận của người kia. Đối với giao dịch nhiều chữ ký, bạn có thể bao gồm 2 người ký bắt buộc trở lên, những người ký này có thể là ví ( [browserwallet](https://meshjs.dev/apis/browserwallet) hoặc [appwallet](https://meshjs.dev/apis/appwallet) ) hoặc tập lệnh Plutus.

Trong hướng dẫn này, chúng ta sẽ xây dựng một giao dịch đa chữ ký để đúc. Có 2 ví liên quan, 1) ví khách thuộc về người dùng muốn mint tài sản gốc và 2) ví ứng dụng chứa tập lệnh.

## Quy trình 

Trong hướng dẫn này, chúng ta sẽ kết nối ví CIP ( `BrowserWallet`) của mình để yêu cầu giao dịch đúc. Sau đó, phần backend ví ứng dụng ( `AppWallet`) sẽ tạo giao dịch và chúng ta sẽ ký giao dịch đó bằng ví của chúng ta. Cuối cùng, ví ứng dụng sẽ ký giao dịch và gửi nó tới chuỗi khối. 


## Kết nối ví (user)

Trong phần này, chúng ta sẽ kết nối ví của khách hàng và lấy địa chỉ ví cũng như UTXO của họ.

Người dùng có thể kết nối ví của họ với : `BrowserWallet`

```javascript
import { BrowserWallet } from '@meshsdk/core';
const wallet = await BrowserWallet.enable(walletName);
```

Sau đó, chúng ta nhận được địa chỉ ví của khách hàng và UTXO:

```javascript
const recipientAddress = await wallet.getChangeAddress();
const utxos = await wallet.getUtxos();
```

Địa chỉ `ChangeAddress` sẽ là địa chỉ nhận NFT được đúc và thay đổi của giao dịch. Ngoài ra, chúng ta sẽ cần UTXO ví của khách hàng để xây dựng giao dịch đúc.

## Xây dựng giao dịch (ứng dụng)

Trong phần này, chúng ta sẽ xây dựng giao dịch đúc tài sản.

Trong hướng dẫn này, chúng ta sẽ không trình bày cách thiết lập API RESTful và `backend servers`. Có hàng ngàn hướng dẫn trên YouTube, chúng ta khuyên bạn nên xây dựng `backend servers` của mình với [API Vercel](https://vercel.com/docs/rest-api) hoặc [NestJ](https://www.youtube.com/results?search_query=nestjs) .

Đầu tiên, chúng ta khởi tạo nhà cung cấp chuỗi khối [blockchain provider](https://meshjs.dev/apis/providers) và `AppWallet`. Trong ví dụ này, chúng ta sử dụng các **từ ghi nhớ** để khôi phục ví của mình, nhưng bạn có thể khởi tạo ví bằng các cụm từ ghi nhớ, khóa riêng tư và khóa do Cardano CLI tạo, xem [AppWallet](https://meshjs.dev/apis/appwallet). 

```javascript
const blockchainProvider = new BlockfrostProvider( '<blockfrost key here....>');

const appWallet = new AppWallet({
  networkId: 0,
  fetcher: blockchainProvider,
  submitter: blockchainProvider,
  key: {
    type: 'mnemonic',
    words: ["pave","base","hello","weekend","symptom","charge","embark".....]
  },
});
```

Tiếp theo, hãy xác định tập lệnh `forging script`, ở đây chúng ta đã sử dụng địa chỉ ví đầu tiên, nhưng bạn cũng có thể xác định bằng cách sử dụng `NativeScript`, xem [Tài sản giao dịch - đúc tiền](https://meshjs.dev/apis/transaction) :

```javascript
const appWalletAddress = appWallet.getPaymentAddress();
const forgingScript = ForgeScript.withOneSignature(appWalletAddress);
```

Sau đó, chúng ta xác định `AssetMetadata` nơi chứa siêu dữ liệu NFT. Trong một bộ sưu tập NFT đúc, bạn sẽ cần một thuật toán lựa chọn và cơ sở dữ liệu để chọn các NFT có sẵn.

```javascript
const assetName = 'MeshToken';

const assetMetadata: AssetMetadata = {
  name: 'Mesh Token',
  image: 'ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua',
  mediaType: 'image/jpg',
  description: 'This NFT is minted by Mesh (https://meshjs.dev/).',
};
```

Sau đó, chúng ta tạo đối tượng `Mint` :

```javascript
const asset: Mint = {
  assetName: assetName,
  assetQuantity: '1',
  metadata: assetMetadata,
  label: '721',
  recipient: recipientAddress,
};
```

Cuối cùng, chúng ta đã sẵn sàng để tạo giao dịch. Thay vì sử dụng mọi UTXO từ ví của khách hàng làm đầu vào của giao dịch, chúng ta có thể sử dụng `largestFirst` để lấy các UTXO cần thiết cho giao dịch này. Trong giao dịch này, chúng ta gửi khoản thanh toán đến địa chỉ ví được xác định trước (`bankWalletAddress` ).

```javascript
const costLovelace = '10000000';
const selectedUtxos = largestFirst(costLovelace, utxos, true);
const bankWalletAddress = 'addr_test1qzmwuzc0qjenaljs2ytquyx8y8x02en3qxswlfcldwetaeuvldqg2n2p8y4kyjm8sqfyg0tpq9042atz0fr8c3grjmysm5e6yx';
```

Hãy tạo giao dịch.

```javascript
const tx = new Transaction({ initiator: appWallet });
tx.setTxInputs(selectedUtxos);
tx.mintAsset(forgingScript, asset);
tx.sendLovelace(bankWalletAddress, costLovelace);
tx.setChangeAddress(recipientAddress);
const unsignedTx = await tx.build();
```

Thay vì gửi giao dịch chứa siêu dữ liệu thực tế, chúng ta sẽ che giấu siêu dữ liệu để khách hàng không biết nội dung của NFT. Trước tiên, chúng ta trích xuất CBOR của siêu dữ liệu ban đầu bằng `Transaction.readMetadata`, và thực thi `Transaction.maskMetadata` để tạo giao dịch ẩn danh.

```javascript
const originalMetadata = Transaction.readMetadata(unsignedTx);
// you want to store 'assetName' and 'originalMetadata' into the database so you can retrive it later
const maskedTx = Transaction.maskMetadata(unsignedTx);

```

chúng ta sẽ gửi giao dịch CBOR  ( `maskedTx`) cho khách hàng ký.


## Ký giao dịch (khách hàng)

Trong phần này, chúng ta cần chữ ký của khách hàng để gửi thanh toán đến `bankWalletAddress`. Ví của khách hàng sẽ mở và nhắc nhập mật khẩu thanh toán. Lưu ý rằng `maskedTx` được đặt thành . true

```javascript
const signedTx = await wallet.signTx(maskedTx, true);
```

chúng ta sẽ gửi `signedTx` đến backend để hoàn thành giao dịch.

## Ký giao dịch (ứng dụng)

Trong phần này, chúng ta sẽ cập nhật siêu dữ liệu của tài sản với siêu dữ liệu thực tế và ví ứng dụng sẽ phản đối ký giao dịch.

Hãy cập nhật siêu dữ liệu thành siêu dữ liệu của nội dung thực tế. chúng ta truy xuất `originalMetadata` từ ​​cơ sở dữ liệu và cập nhật siêu dữ liệu bằng `Transaction.writeMetadata`.

```javascript
// here you want to retrieve the 'originalMetadata' from the database
const signedOriginalTx = Transaction.writeMetadata(
  signedTx,
  originalMetadata
);
```
Ký giao dịch với ví ứng dụng và gửi giao dịch:

```javascript
const appWalletSignedTx = await appWallet.signTx(signedOriginalTx, true);
const txHash = await appWallet.submitTx(appWalletSignedTx);
```

Thì đấy! Bạn có thể tạo bất kỳ giao dịch đa chữ ký nào!
