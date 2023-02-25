---
id: transactions-minting
sidebar_position: '6'
title: Giao dịch đúc tiền   - SDK Mesh (Thư viện mã nguồn mở để xây dựng ứng dụng Web3 trên Chuỗi khối Cardano)
sidebar_label: Giao dịch đúc tiền
description: Tìm hiểu cách sử dụng ForgeScript để tạo các giao dịch đúc để đúc và ghi NFT.
#image: "../img/og/og-getstarted-mesh.png"
---

Trong phần này, chúng ta sẽ học cách sử dụng `ForgeScript` để tạo các giao dịch mint để đúc và đốt NFT. Nếu bạn chưa quen với giao dịch, hãy nhớ xem cách tạo giao dịch để [Gửi lovelace và tài sản](transactions-basic) .

Trong phần này, chúng ta sẽ khám phá những điều sau đây:

- [Đúc tài sản](#đúc-tài-sản)
- [Đốt tài sản](#đốt-tài-sản)

## Đúc tài sản

Chúng ta sẽ xem cách đúc NFT bằng `ForgeScript` .

```javascript
import { Transaction, ForgeScript } from "@meshsdk/core";
import type { Mint, AssetMetadata } from "@meshsdk/core";

// prepare forgingScript
const usedAddress = await wallet.getUsedAddresses();
const address = usedAddress[0];
const forgingScript = ForgeScript.withOneSignature(address);

const tx = new Transaction({ initiator: wallet });

// define asset#1 metadata
const assetMetadata1: AssetMetadata = {
  name: "Mesh Token",
  image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
  mediaType: "image/jpg",
  description: "This NFT is minted by Mesh (https://meshjs.dev/).",
};

const asset1: Mint = {
  assetName: "MeshToken",
  assetQuantity: "1",
  metadata: assetMetadata1,
  label: "721",
  recipient: "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
};
tx.mintAsset(forgingScript, asset1);

const unsignedTx = await tx.build();
const signedTx = await wallet.signTx(unsignedTx);
const txHash = await wallet.submitTx(signedTx);
```

Ngoài ra, bạn có thể sử dụng tập lệnh bằng `NativeScript`. 
Ví dụ: nếu bạn muốn có tập lệnh khóa chính sách, bạn có thể thực hiện việc này:

```javascript
import type { NativeScript } from "@meshsdk/core";

const nativeScript: NativeScript = {
  type: "all",
  scripts: [
    {
      type: "before",
      slot: "<insert slot here....>",
    },
    {
      type: "sig",
      keyHash: "<insert keyHash here....>",
    },
  ],
};

const forgingScript = ForgeScript.fromNativeScript(nativeScript);
```

[thử bản trình diễn](https://meshjs.dev/apis/transaction/minting#minting)

## Đốt tài sản

Giống như đúc NFT, chúng ta cần xác định `ForgeScript` . Chúng ta sử dụng địa chỉ ví đầu tiên làm **"địa chỉ đúc"**. Lưu ý rằng, tài sản chỉ có thể bị đốt theo địa chỉ đúc của nó.

```javascript
import { Transaction, ForgeScript } from "@meshsdk/core";
import type { Asset } from "@meshsdk/core";

// prepare forgingScript
const usedAddress = await wallet.getUsedAddresses();
const address = usedAddress[0];
const forgingScript = ForgeScript.withOneSignature(address);

const tx = new Transaction({ initiator: wallet });

// burn asset#1
const asset1: Asset = {
  unit: "64af286e2ad0df4de2e7de15f8ff5b3d27faecf4ab2757056d860a424d657368546f6b656e",
  quantity: "1",
};
tx.burnAsset(forgingScript, asset1);



const unsignedTx = await tx.build();
const signedTx = await wallet.signTx(unsignedTx);
const txHash = await wallet.submitTx(signedTx);
```

Kiểm tra [Sân chơi Mesh](https://meshjs.dev/apis/transaction/minting) để xem bản trình diễn trực tiếp và giải thích đầy đủ.
