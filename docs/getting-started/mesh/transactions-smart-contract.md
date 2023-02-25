---
id: transactions-smart-contract
sidebar_position: '5'
title: Giao dịch hợp đồng thông minh   - SDK Mesh (Thư viện nguồn mở để xây dựng ứng dụng Web3 trên chuỗi khối Cardano)
sidebar_label: Giao dịch hợp đồng thông minh
description: Tạo giao dịch để làm việc với hợp đồng thông minh.
#image: "../img/og/og-getstarted-mesh.png"
---

Trong phần này, chúng ta sẽ xem xét cách tạo giao dịch để làm việc với hợp đồng thông minh. Nếu bạn chưa quen với giao dịch, hãy nhớ xem cách tạo giao dịch để [Gửi lovelace và tài sản](transactions-basic) .

Trong phần này, chúng ta sẽ khám phá những điều sau đây:

- [Khóa tài sản trong hợp đồng thông minh](#khóa-tài-sản-trong-hợp-đồng-thông-minh)
- [Mở khóa tài sản từ Hợp đồng thông minh](#mở-khóa-tài-sản-từ-hợp-đồng-thông-minh)
- [Đúc tài sản với hợp đồng thông minh](#đúc-tài-sản-với-hợp-đồng-thông-minh)

## Khóa tài sản trong hợp đồng thông minh

Khóa tài sản (token hay NFT) là một tính năng trong đó một số tài sản nhất định được bảo lưu trên hợp đồng thông minh. Chỉ có thể mở khóa tài sản khi đáp ứng một số điều kiện nhất định, chẳng hạn như khi mua hàng.

Ví dụ: Để khóa tài sản trong hợp đồng thông minh luôn thành công:

```javascript
import { Transaction } from "@meshsdk/core";

// this is the script address of always succeed contract
const scriptAddress = "addr_test1wpnlxv2xv9a9ucvnvzqakwepzl9ltx7jzgm53av2e9ncv4sysemm8";

const tx = new Transaction({ initiator: wallet }).sendAssets(
  {
    address: scriptAddress,
    datum: {
      value: "supersecret",
    },
  },
  [
    {
      unit: "64af286e2ad0df4de2e7de15f8ff5b3d27faecf4ab2757056d860a424d657368546f6b656e",
      quantity: "1",
    },
  ]
);

const unsignedTx = await tx.build();
const signedTx = await wallet.signTx(unsignedTx);
const txHash = await wallet.submitTx(signedTx);
```

[Thử nghiệm(https://meshjs.dev/apis/transaction/smart-contract#lockAssets)

## Mở khóa tài sản từ Hợp đồng thông minh

Vì chúng ta có thể có tài sản bị khóa trong hợp đồng, bạn có thể tạo giao dịch để mở khóa tài sản bằng redeemer tương ứng với datum. Xác định mã tương ứng để tạo dữ liệu, chỉ một giao dịch có hàm băm dữ liệu chính xác mới có thể mở khóa nội dung. Xác định đơn vị của tài sản bị khóa để tìm kiếm UTXO trong hợp đồng thông minh, được yêu cầu cho đầu vào của giao dịch.

```javascript
async function _getAssetUtxo({ scriptAddress, asset, datum }) {
  const koios = new KoiosProvider("preprod");

  const utxos = await koios.fetchAddressUTxOs(scriptAddress, asset);

  const dataHash = resolveDataHash(datum);

  let utxo = utxos.find((utxo: any) => {
    return utxo.output.dataHash == dataHash;
  });

  return utxo;
}

// fetch input UTXO
const assetUtxo = await _getAssetUtxo({
  scriptAddress: "addr_test1wpnlxv2xv9a9ucvnvzqakwepzl9ltx7jzgm53av2e9ncv4sysemm8",
  asset: "64af286e2ad0df4de2e7de15f8ff5b3d27faecf4ab2757056d860a424d657368546f6b656e",
  datum: "supersecret",
});

// get wallet change address
const address = await wallet.getChangeAddress();

// create the unlock asset transaction
const tx = new Transaction({ initiator: wallet })
  .redeemValue({
    value: assetUtxo,
    script: {
      version: "V1",
      code: "4e4d01000033222220051200120011",
    },
    datum: "supersecret",
  })
  .sendValue(address, assetUtxo) // address is recipient address
  .setRequiredSigners([address]);

const unsignedTx = await tx.build();
// note that the partial sign is set to true
const signedTx = await wallet.signTx(unsignedTx, true);
const txHash = await wallet.submitTx(signedTx);
```

[Thử nghiệm](https://meshjs.dev/apis/transaction/smart-contract#unlockAssets)

## Đúc tài sản với hợp đồng thông minh

Chúng ta có thể sử dụng **Plutus Script** để đúc mã Token. `Plutus Script` này được thiết kế để luôn thành công, nghĩa là bất kỳ ai cũng có thể ký và đúc token bằng tập lệnh này, vì tập lệnh này không có xác thực.

```javascript
import {
  Transaction,
  AssetMetadata,
  Mint,
  Action,
  PlutusScript,
} from "@meshsdk/core";

const script: PlutusScript = {
  code: plutusMintingScriptCbor,
  version: "V2",
};

const redeemer: Partial<Action> = {
  tag: "MINT",
};

const tx = new Transaction({ initiator: wallet });

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
tx.mintAsset(script, asset1, redeemer);

const unsignedTx = await tx.build();
const signedTx = await wallet.signTx(unsignedTx);
const txHash = await wallet.submitTx(signedTx);
```

Kiểm tra [Sân chơi Mesh](https://meshjs.dev/apis/transaction/smart-contract) để xem bản trình diễn trực tiếp và giải thích đầy đủ.
