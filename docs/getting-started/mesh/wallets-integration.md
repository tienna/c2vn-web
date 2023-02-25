---
id: wallets-integration
sidebar_position: '3'
title: Tích hợp ví   - SDK Mesh (Thư viện mã nguồn mở để xây dựng ứng dụng Web3 trên Chuỗi khối Cardano)
sidebar_label: Tích hợp ví
description: Ví để xây dựng các giao dịch trong các ứng dụng của bạn.
#image: "../img/og/og-getstarted-mesh.png"
---

Với Mesh, bạn có thể khởi tạo ví mới với:

- Ví CIP-30 ( [Ví trình duyệt](#browser-wallet) )
- Khóa do Cardano CLI tạo ( [Ví ứng dụng](#app-wallet) )
- Cụm từ ghi nhớ ( [Ví ứng dụng](#app-wallet) )
- Khóa cá nhân ( [Ví ứng dụng](#app-wallet) )

## Ví trình duyệt

[Ví trình duyệt](https://meshjs.dev/apis/browserwallet) được sử dụng để kết nối, truy vấn và thực hiện các chức năng của ví theo [CIP-30](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0030) , định nghĩa API cho dApps để giao tiếp với ví của người dùng.

Để sử dụng Browser Wallet rất đơn giản, chỉ cần nhập `BrowserWallet` thực thi các API, ví dụ:

```javascript
// import BrowserWallet
import { BrowserWallet } from '@meshsdk/core';

// connect to a wallet
const wallet = await BrowserWallet.enable('eternl');

// get assets in wallet
const assets = await wallet.getAssets();
```

|API | |
|--- | ---|
|[Nhận ví đã cài đặt](https://meshjs.dev/apis/browserwallet#getInstallWallets) | `BrowserWallet.getInstalledWallets();`|
|[Kết nối ví](https://meshjs.dev/apis/browserwallet#connectWallet) | `const wallet = await BrowserWallet.enable('eternl');`|
|[Lấy số dư](https://meshjs.dev/apis/browserwallet#getBalance) | `const balance = await wallet.getBalance();`|
|[Nhận thay đổi địa chỉ](https://meshjs.dev/apis/browserwallet#getChangeAddress) | `const changeAddress = await wallet.getChangeAddress();`|
|[Nhận ID mạng](https://meshjs.dev/apis/browserwallet#getNetworkId) | `const networkId = await wallet.getNetworkId();`|
|[Nhận địa chỉ phần thưởng](https://meshjs.dev/apis/browserwallet#getRewardAddresses) | `const rewardAddresses = await wallet.getRewardAddresses();`|
|[Nhận địa chỉ đã sử dụng](https://meshjs.dev/apis/browserwallet#getUsedAddresses) | `const usedAddresses = await wallet.getUsedAddresses();`|
|[Nhận địa chỉ không sử dụng](https://meshjs.dev/apis/browserwallet#getUnusedAddresses) | `const unusedAddresses = await wallet.getUnusedAddresses();`|
|[Nhận UTXO](https://meshjs.dev/apis/browserwallet#getUtxos) | `const utxos = await wallet.getUtxos();`|
|[ký dữ liệu](https://meshjs.dev/apis/browserwallet#signData) | `const addresses = await wallet.getUsedAddresses(); const signature = await wallet.signData(addresses[0], 'mesh');`|
|[Ký giao dịch](https://meshjs.dev/apis/browserwallet#signTx) | `const signedTx = await wallet.signTx(tx, partialSign?);`|
|[Gửi giao dịch](https://meshjs.dev/apis/browserwallet#submitTx) | `const txHash = await wallet.submitTx(signedTx);`|
|[Nhận được lovelace](https://meshjs.dev/apis/browserwallet#getLovelace) | `const lovelace = await wallet.getLovelace();`|
|[Nhận tài sản](https://meshjs.dev/apis/browserwallet#getAssets) | `const assets = await wallet.getAssets();`|
|[Nhận policyID](https://meshjs.dev/apis/browserwallet#getPolicyIds) | `const policyIds = await wallet.getPolicyIds();`|
|[Nhận tài sản policy](https://meshjs.dev/apis/browserwallet#getPolicyIdAssets) | `const assets = await wallet.getPolicyIdAssets('64af2...42');`|

Chắc chắn hãy xem [Sân chơi Mesh](https://meshjs.dev/apis/browserwallet) để xem bản trình diễn trực tiếp và giải thích đầy đủ.

## Ví ứng dụng

[AppWallet](https://meshjs.dev/apis/appwallet) được sử dụng để xây dựng các giao dịch trong ứng dụng của bạn. Bạn có thể nhập `AppWallet` bằng:

```javascript
import { AppWallet } from '@meshsdk/core';
```

### Tạo ví mới

```javascript
import { AppWallet } from '@meshsdk/core';

const mnemonic = AppWallet.brew();
```

### Tải bằng các khóa do Cardano CLI tạo

```javascript
import { AppWallet } from '@meshsdk/core';

const wallet = new AppWallet({
  networkId: 0,
  fetcher: blockchainProvider,
  submitter: blockchainProvider,
  key: {
    type: 'cli',
    payment: '5820aaca553a7b95b38b5d9b82a5daa7a27ac8e34f3cf27152a978f4576520dd6503',
    stake: '582097c458f19a3111c3b965220b1bef7d548fd75bc140a7f0a4f080e03cce604f0e',
  },
});
```

### Tải với các cụm từ ghi nhớ

```javascript
import { AppWallet } from '@meshsdk/core';

const wallet = new AppWallet({
  networkId: 0,
  fetcher: blockchainProvider,
  submitter: blockchainProvider,
  key: {
    type: 'mnemonic',
    words: ["solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution","solution"],
  },
});
```

### Tải bằng khóa riêng

```javascript
import { AppWallet } from '@meshsdk/core';

const wallet = new AppWallet({
  networkId: 0,
  fetcher: blockchainProvider,
  submitter: blockchainProvider,
  key: {
    type: 'root',
    bech32: 'xprv1cqa46gk29plgkg98upclnjv5t425fcpl4rgf9mq2txdxuga7jfq5shk7np6l55nj00sl3m4syzna3uwgrwppdm0azgy9d8zahyf32s62klfyhe0ayyxkc7x92nv4s77fa0v25tufk9tnv7x6dgexe9kdz5gpeqgu',
  },
});
```

Kiểm tra [Sân chơi Mesh](https://meshjs.dev/apis/appwallet) để xem bản trình diễn trực tiếp và giải thích đầy đủ.
