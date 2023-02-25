---
id: react
sidebar_position: '8'
title: Ứng dụng web react   - SDK Mesh (Thư viện mã nguồn mở để xây dựng ứng dụng Web3 trên chuỗi khối Cardano)
sidebar_label: Ứng dụng web react
description: Bắt đầu xây dựng các ứng dụng web3, tương tác với các hợp đồng của bạn bằng ví của bạn.
#image: "../img/og/og-getstarted-mesh.png"
---

Mesh cung cấp một tập hợp các thành phần giao diện người dùng hữu ích, vì vậy bạn có thể dễ dàng thêm chức năng web3 và các tiện ích thuận tiện cho ứng dụng của mình.

- [MeshProvider](#meshprovider) - Đăng ký thay đổi ví
- [Thành phần giao diện người dùng](#ui-components) - Các thành phần giao diện react để tăng tốc độ phát triển ứng dụng của bạn.
- [Wallet hooks](#wallet-hooks) - Hooks react để tương tác với ví được kết nối

Để bắt đầu, hãy cài đặt `mesh-react` :

```bash
npm install @meshsdk/react
```

Tiếp theo, hãy thêm `MeshProvider` vào thư mục gốc của ứng dụng. [React Context](https://reactjs.org/docs/context.html) cho phép ứng dụng chia sẻ dữ liệu trên toàn ứng dụng và MeshProvider cho phép ứng dụng của bạn đăng ký thay đổi ngữ cảnh.

```javascript
import { MeshProvider } from "@meshsdk/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <Component {...pageProps} />
    </MeshProvider>
  );
};
```

## Thành phần giao diện người dùng(UI Components)

Để các dApp giao tiếp với ví của người dùng, chúng tôi cần một cách để kết nối với ví của họ.

Thêm CardanoWallet này để cho phép người dùng chọn ví để kết nối với dApp của bạn. Sau khi ví được kết nối, hãy xem Ví trình duyệt để biết danh sách API CIP-30.

```javascript
import { CardanoWallet } from '@meshsdk/react';

export default function Page() {
  return (
    <>
      <CardanoWallet />
    </>
  );
}
```

Duyệt qua tất cả [các Thành phần giao diện người dùng](https://meshjs.dev/react/ui-components) do Mesh cung cấp để bắt đầu xây dựng các ứng dụng web3, tương tác với các hợp đồng của bạn bằng ví của bạn.

## Wallet Hooks

Trong một ứng dụng React, Hooks cho phép bạn trích xuất và tái sử dụng các biến và logic có trạng thái mà không thay đổi hệ thống phân cấp thành phần của bạn. Điều này giúp dễ dàng sử dụng lại cùng một Hook giữa nhiều thành phần. Bạn có thể thử từng móc này trên [Sân chơi Mesh](https://meshjs.dev/react/wallet-hooks) .

### useWalletList

Trả về danh sách ví được cài đặt trên thiết bị của người dùng.

```javascript
import { useWalletList } from '@meshsdk/react';

export default function Page() {
  const wallets = useWalletList();

  return (
    <>
      {wallets.map((wallet, i) => {
        return (
          <p key={i}>
            <img src={wallet.icon} style={{ width: '48px' }} />
            <b>{wallet.name}</b>
          </p>
        );
      })}
    </>
  );
}
```

### useAddress

Địa chỉ trả về của ví được kết nối.

```javascript
import { useAddress } from '@meshsdk/react';

export default function Page() {
  const address = useAddress();

  return (
    <div><p>Your wallet address is: <code>{address}</code></p></div>
  );
}
```

### useAssets

Trả về danh sách nội dung trong ví được kết nối từ tất cả các UTXO.

```javascript
import { useAssets } from '@meshsdk/react';

export default function Page() {
  const assets = useAssets();

  return (
    <ol>
      {assets &&
        assets.slice(0, 10).map((asset, i) => {
          return (
            <li key={i}>
              <b>{asset.assetName}</b> (x{asset.quantity})
            </li>
          );
        })}
    </ol>
  );
}
```

### useLovelace

Trả lại số lượng lovelace trong ví.

```javascript
import { useLovelace } from '@meshsdk/react';

export default function Page() {
  const lovelace = useLovelace();

  return (
    <div>
      <p>You have <b>₳ {parseInt(lovelace) / 1000000}</b>.</p>
    </div>
  );
}
```

### useNetwork

Trả lại mạng của ví được kết nối.

```javascript
import { useNetwork } from '@meshsdk/react';

export default function Page() {
  const network = useNetwork();

  return (
    <div>
      <p>Connected network: <b>{network}</b>.</p>
    </div>
  );
}
```

### useWallet

Cung cấp thông tin về trạng thái của ví hiện tại và các chức năng kết nối và ngắt kết nối ví của người dùng.

```javascript
import { useWallet } from '@meshsdk/react';

export default function Page() {
  const { wallet, connected, name, connecting, connect, disconnect, error } = useWallet();

  return (
    <div>
      <p>
        <b>Connected?: </b> {connected ? 'Is connected' : 'Not connected'}
      </p>
      <p>
        <b>Connecting wallet?: </b> {connecting ? 'Connecting...' : 'No'}
      </p>
      <p>
        <b>Name of connected wallet: </b>
        {name}
      </p>
      <button onClick={() => disconnect()}>Disconnect Wallet</button>
    </div>
  );
}
```

Kiểm tra [Sân chơi Mesh](https://meshjs.dev/react/wallet-hooks) để xem bản trình diễn trực tiếp và giải thích đầy đủ.
