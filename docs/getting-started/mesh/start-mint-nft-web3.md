---
id: start-mint-nft-web3
sidebar_position: '10'
title: Bắt đầu đúc NFT trên Next.js vơi Mesh
sidebar_label: Bắt đầu đúc NFT trên Next.js vơi Mesh
description: Ví để xây dựng các giao dịch trong các ứng dụng của bạn.
#image: "../img/og/og-getstarted-mesh.png"
---

Đúc tài sản trên Node.js
Tải khóa do CLI tạo và tài sản đúc trên Node.js

Trong hướng dẫn này, chúng ta sẽ tạo tài sản với `AppWallet` trên Node.js. 

## Thiết lập hệ thống

1. Visual Studio Code

Visual Studio Code là một trình chỉnh sửa mã được tạo bởi Microsoft. Tải xuống và cài đặt [Visual Studio Code](https://code.visualstudio.com/) để chỉnh sửa mã.

2. Node.js

Node.js là môi trường thời gian chạy JavaScript đa nền tảng chạy trên công cụ V8 và thực thi mã JavaScript. Cài đặt phiên bản Hỗ trợ dài hạn (LTS) của [Node.js](https://nodejs.org/) (v16.16.0).

## Thiết lập dự án

Đầu tiên, tạo một thư mục mới và khởi tạo dự án Node.js:

```
npm init
```

Tiếp theo, cài đặt `typescript` và gói `Mesh` :

```javascript
npm install --dev typescript && npm install @meshsdk/core
```

Sau đó, khởi tạo `TypeScript` cần thiết để biên dịch `TypeScript`:

```javascript
npx tsc --init
```

Sau đó, mở tệp `tsconfig.json`  và định cấu hình sau:

```javascript
{
  ...
  "target": "ESNext",
  "module": "ESNext",
  "moduleResolution": "Node",
  "outDir": "dist",
  ...
}
```

Cuối cùng, mở tệp `package.json`  thêm các cấu hình sau:

```javascript
{
  ...
  "type": "module",
  "scripts": {
    "start": "tsc && node ./dist/main.js"
  }
  ...
}
```

## Xây dựng giao dịch đúc tài sản

### 1. Tạo danh sách siêu dữ liệu của NFT

Tạo một tệp có tên `metadata.ts` và định nghĩa siêu dữ liệu cho NFT của chúng ta như sau:

```javascript
export const metadata: { [assetName: string]: any } = {
  MeshToken01: {
    name: "Mesh Token 1",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "Just a purple coin.",
    artist: "This NFT is minted by Mesh (https://meshjs.dev/).",
  },
  MeshToken02: {
    name: "Mesh Token 2",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "This is suppose to be a gold coin.",
    artist: "This NFT is minted by Mesh (https://meshjs.dev/).",
  },
  MeshToken03: {
    name: "Mesh Token 3",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "A coin with a M on it.",
    artist: "This NFT is minted by Mesh (https://meshjs.dev/).",
  },
};

```

### 2. Tạo danh sách người nhận

Tạo một tệp có tên `recipients.ts` và chỉ định danh sách người nhận:

```javascript
export const recipients: { [recipient: string]: string } = {
  addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr:
    "MeshToken01",
  addr_test1qqlcxawu4gxarenqvdqyw0tqyjy69mrgsmfqhm6h65jwm4vvldqg2n2p8y4kyjm8sqfyg0tpq9042atz0fr8c3grjmyscxry4r:
    "MeshToken02",
  addr_test1qq5tay78z9l77vkxvrvtrv70nvjdk0fyvxmqzs57jg0vq6wk3w9pfppagj5rc4wsmlfyvc8xs7ytkumazu9xq49z94pqzl95zt:
    "MeshToken03",
};
```

### 3. Tạo `main.ts` và import các gói:

Hãy tạo một tệp có tên `main.ts` và nhập các gói chúng ta cần và các tệp chúng ta đã tạo:

```javascript
import {
  AppWallet,
  Transaction,
  ForgeScript,
  BlockfrostProvider,
  resolveTxHash,
} from '@meshsdk/core';
import type { Mint, AssetMetadata } from '@meshsdk/core';

import { metadata } from './metadata.js';
import { recipients } from './recipients.js';

```

### 4. Định nghĩa các biến

Tiếp theo, hãy xác định một số biến chúng ta sẽ cần để đúc. Bạn nên sử dụng ví của riêng mình nếu bạn muốn đúc một bộ sưu tập của riêng mình. Đối với ví dụ này, đây là những biến chúng ta cần:

```javascript

const networkId = 0;
const blockfrostKey = 'BLOCKFROST_KEY_HERE...';
```

### 5. Xây dựng giao dịch đúc NFT

Trong hướng dẫn này, chúng ta đang xây dựng một giao dịch đúc NFT, nhưng nó có thể là bất kỳ giao dịch nào. [Tìm hiểu thêm về Giao dịch](https://meshjs.dev/apis/transaction).

Đầu tiên, chúng ta cần một nhà cung cấp API blockchain, trong hướng dẫn này, chúng ta sẽ dùng `BlockfrostProvider`, nhưng bạn cũng có thể sử dụng các nhà cung cấp khác:

```javascript
const blockchainProvider = new BlockfrostProvider(blockfrostKey);
```

Tiếp theo, hãy khởi tạo tập lệnh `AppWallet` và tập lệnh `forgingScript` của nó. Trong ví dụ này, chúng ta khởi tạo bằng cách sử dụng các khóa do CLI tạo, nhưng bạn cũng có thể tải ví của mình bằng khóa riêng và các cụm từ ghi nhớ. Tìm hiểu thêm về [AppWallet](https://meshjs.dev/apis/appwallet).

```javascript
const demoCLIKey = {
  paymentSkey:
    '5820aaca553a7b95b38b5d9b82a5daa7a27ac8e34f3cf27152a978f4576520dd6503',
  stakeSkey:
    '582097c458f19a3111c3b965220b1bef7d548fd75bc140a7f0a4f080e03cce604f0e',
};

const wallet = new AppWallet({
  networkId: networkId,
  fetcher: blockchainProvider,
  submitter: blockchainProvider,
  key: {
    type: 'cli',
    payment: demoCLIKey.paymentSkey,
    stake: demoCLIKey.stakeSkey,
  },
});
```
hoặc
```javascript
  const wallet = new AppWallet({
    networkId: 0,
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
    key: {
      type: 'mnemonic',
      words: ["pave","base","hello","weekend","symptom","charge","embark","clerk","polar","wish","ribbon","boat","nerve","split","diagram","athlete","holiday","real","slide","judge","lawn","predict","give","comfort"],
    },
  });

```
Rồi tạo biến `walletAddress` và `forgingScript`
```javascript
const walletAddress = wallet.getPaymentAddress();
const forgingScript = ForgeScript.withOneSignature(walletAddress);
```

Sau đó, hãy tạo một giao dịch `Transaction`, lặp qua từng người nhận và đúc một tài sản với `mintAsset`( [Tìm hiểu thêm về giao dịch đúc](https://meshjs.dev/apis/transaction) ):

```javascript
const tx = new Transaction({ initiator: wallet });
for (let recipient in recipients) {
  const recipientAddress = recipient;
  const assetName = recipients[recipient];
  const assetMetadata: AssetMetadata = metadata[assetName];
  const asset: Mint = {
    assetName: assetName,
    assetQuantity: '1',
    metadata: assetMetadata,
    label: '721',
    recipient: recipientAddress
  };
  tx.mintAsset(forgingScript, asset);
}

```
Cuối cùng, hãy ký và gửi giao dịch:

```javascript
const unsignedTx = await tx.build();
const signedTx = await wallet.signTx(unsignedTx, false);
const txHash = await wallet.submitTx(signedTx);
```

Để thực thi tập lệnh, hãy chạy đoạn mã sau trên Terminal của bạn:

```
npm start
```

Đối với một giao dịch thành công, bạn sẽ nhận được một hàm băm giao dịch, bạn nên đúc nhiều tài sản trong một giao dịch và gửi chúng cho nhiều người nhận.
