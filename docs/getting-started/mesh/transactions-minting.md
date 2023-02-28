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
Đầu tiên thêm các đối tượng vào site của bạn.

```javascript
import { Transaction, ForgeScript } from "@meshsdk/core";
import type { Mint, AssetMetadata } from "@meshsdk/core";
```

Tạo một hàm mintNFT() 

```javascript
async function mintNFT() {
      // prepare forgingScript
      const usedAddress = await wallet.getUsedAddresses();
      const address = usedAddress[0];
      const forgingScript = ForgeScript.withOneSignature(address);

      const tx = new Transaction({ initiator: wallet });

      // define asset#1 metadata
      const assetMetadata1: AssetMetadata = {
        "name": "T1",
        "image": "ipfs://QmREp3TLtFCeTFozpDUTnpkLvjDe2Mvdu1r6x8k4m6mdtk",
        "mediaType": "image/jpg",
        "description": "This NFT is minted by Mesh (https://meshjs.dev/)."
      };
      const asset1: Mint = {
        assetName: 'T1',
        assetQuantity: '1',
        metadata: assetMetadata1,
        label: '721',
        recipient: 'addr_test1qrsatwqzdh6w0ucekezvlrhe3cs76mpp7pup3eddkmq4ax8n0l9jsm5npkmszc2jeet7w6wwp5a94aqadlueuzk4sjdsd3dq4j',
      };
      tx.mintAsset(
        forgingScript,
        asset1,
      );

      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);

  }
```
Sau đó bạn tạo một tác vụ button

```javascript
      <div className="demo">
        <button
           type="button"
           onClick={() => mintNFT()}   
        >
        Mint NFT       
        </button>
      </div>
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
```

Tạo một hàm BuntNFT

```javascript
  async function BuntNFT() {
    const usedAddress = await wallet.getUsedAddresses();
    const address = usedAddress[0];
    const forgingScript = ForgeScript.withOneSignature(address);
    console.log (forgingScript)
    
    const tx = new Transaction({ initiator: wallet });

    // burn asset#1
    // const asset1: Asset = {
    //   unit: '64af286e2ad0df4de2e7de15f8ff5b3d27faecf4ab2757056d860a424d657368546f6b656e',
    //   quantity: '1',
    // };
    // tx.burnAsset(forgingScript, asset1);

    // burn asset#2
    const asset2: Asset = {
      unit: 'b7f76d528982d71f0367491eb6a21dbf8a8507304d4e3fb944416b284332564e',
      quantity: '1',
    };
    tx.burnAsset(forgingScript, asset2);

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
  }
```

Sau đó tạo thêm một tác vụ button Bunt

```javascript
      <div className="demo">
        <button
              type="button"
              onClick={() => BuntNFT()}            
         >
            Bunt Asset       
         </button>
      </div>
```

Kiểm tra [Sân chơi Mesh](https://meshjs.dev/apis/transaction/minting) để xem bản trình diễn trực tiếp và giải thích đầy đủ.
