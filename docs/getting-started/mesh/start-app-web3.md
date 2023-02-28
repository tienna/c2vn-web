---
id: start-app-web3
sidebar_position: '9'
title: Bắt đầu một ứng dụng Web3 trên Next.js vơi Mesh
sidebar_label: Bắt đầu một ứng dụng Web3 trên Next.js
description: Ví để xây dựng các giao dịch trong các ứng dụng của bạn.
#image: "../img/og/og-getstarted-mesh.png"
---

Bắt đầu một ứng dụng Web3 trên Next.js
Hướng dẫn từng bước để thiết lập ứng dụng web Next.js, kết nối ví và duyệt nội dung của ví.

Next.js là một khung phát triển web được xây dựng dựa trên Node.js cho phép các chức năng của ứng dụng web dựa trên React như kết xuất phía máy chủ và tạo các trang web tĩnh.

Next.js và Mesh là các thư viện JavaScript, vì vậy chúng tôi giả định rằng bạn đã quen thuộc với ngôn ngữ HTML và JavaScript, nhưng bạn sẽ có thể làm theo ngay cả khi bạn đến từ một ngôn ngữ lập trình khác. Nếu bạn cảm thấy không tự tin lắm, chúng tôi khuyên bạn nên xem qua hướng dẫn JS này hoặc Tham khảo JavaScript MDN hoặc phương pháp ưa thích của tôi bằng cách xem một vài video từ YouTube .

## Thiết lập hệ thống
1. Visual Studio Code

Visual Studio Code là một trình chỉnh sửa mã được tạo bởi Microsoft. Tải xuống và cài đặt Visual Studio Code để chỉnh sửa mã.

2. Node.js

Node.js là môi trường thời gian chạy JavaScript đa nền tảng chạy trên công cụ V8 và thực thi mã JavaScript. Cài đặt phiên bản Hỗ trợ dài hạn (LTS) của Node.js (khi viết v16.16.0).

## Thiết lập Next.js
1. Tạo thư mục dự án và mở Visual Studio Code

Tạo một thư mục mới cho dự án của bạn và đặt cho thư mục một cái tên có ý nghĩa. Mở ứng dụng Visual Studio Code và kéo thư mục dự án của bạn vào Visual Studio Code.

2. Tạo ứng dụng Next.js

Từ các tùy chọn menu trong Visual Studio Code của bạn, hãy mở và thực thi lệnh này để tạo một ứng dụng NextJs mới: Terminal

```javascript
npx create-next-app@latest --typescript .
```

3. Bắt đầu phát triển máy chủ

Sau khi cài đặt hoàn tất, hãy khởi động máy chủ phát triển với:

```javascript
npm run dev
```

Truy cập http://localhost:3000 để xem ứng dụng của bạn. để dừng ứng dụng. CTRL+C

## Thiết lập với Mesh

1. Cài đặt gói MeshJS

Cài đặt phiên bản mới nhất của Lưới với npm:

```javascript
npm install @meshsdk/core @meshsdk/react
```

2. Thêm webpack vào `next.config.js`

Mở `next.config.js` và  cấu hình `webpack`. file `next.config.js` sẽ trông như thế này:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
    };
    return config;
  },
};
module.exports = nextConfig;
```

3. Xin chúc mừng

Bạn vừa tiết kiệm được một vài tuần học tập và một số ngày cố gắng bắt đầu. Ứng dụng Next.js của bạn đã sẵn sàng để kết nối ví, duyệt nội dung và thực hiện một số giao dịch.


## Thêm vào dự án

1. Thêm MeshProvider

`React` là một công cụ thiết yếu để xây dựng các ứng dụng web. Nó cho phép bạn dễ dàng chia sẻ trạng thái trong các ứng dụng của mình, vì vậy bạn có thể sử dụng dữ liệu trong bất kỳ thành phần nào trong ứng dụng. Điều này có nghĩa là khi người dùng đã kết nối ví của họ, việc truy cập các trang khác nhau trên ứng dụng sẽ đảm bảo rằng ví của họ vẫn được kết nối.

Mở `pages/_app.tsx`,  import [MeshProvider.](https://meshjs.dev/react/getting-started)  File `_app.tsx` của bạn sẽ trông giống như thế này: 


```javascript
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <Component {...pageProps} />
    </MeshProvider>
  );
}

export default MyApp;

```

2. Thêm thành phần kết nối ví và kiểm tra tài sản của ví

Hãy thêm [thành phần kết nối ví](https://meshjs.dev/react/ui-components) để cho phép người dùng kết nối ví mà họ đã cài đặt trên thiết bị của mình. Kết nối với ví sẽ yêu cầu người dùng cho phép nếu không được cấp và tiến hành kết nối ví đã chọn.

Cuối cùng, chúng tôi liên kết các thành phần đó lại với nhau, cho phép người dùng chọn ví để kết nối và truy vấn nội dung trong ví với `wallet.getAssets()`

Mở `pages/index.tsx` và thay thế nó bằng các mã sau:


```javascript
import { useState } from "react";
import type { NextPage } from "next";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';

const Home: NextPage = () => {
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      setAssets(_assets);
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Connect Wallet</h1>
      <CardanoWallet />
      {connected && (
        <>
          <h1>Get Wallet Assets</h1>
          {assets ? (
            <pre>
              <code className="language-js">
                {JSON.stringify(assets, null, 2)}
              </code>
            </pre>
          ) : (
            <button
              type="button"
              onClick={() => getAssets()}
              disabled={loading}
              style={{
                margin: "8px",
                backgroundColor: loading ? "orange" : "grey",
              }}
            >
              Get Wallet Assets
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

```

Khởi động máy chủ phát triển và dùng thử:

```
npm run dev

```

Truy cập [http://localhost:3000](http://localhost:3000) để kết nối các ví có sẵn và xem nội dung trong ví.

Nếu bạn chưa quen với Cardano, trước tiên bạn sẽ phải tải xuống một trong các ví Cardano. Tall Nupinks đã viết một hướng dẫn chi tiết về [Cardano Wallet 101](https://cutedumborcs.substack.com/p/cardano-wallets-101) để giúp bạn hiểu các nguyên tắc cơ bản của ví Cardano, bao gồm các tính năng và cách thức hoạt động của nó. Với hướng dẫn này, bạn sẽ có thể đưa ra quyết định sáng suốt về ví Cardano tốt nhất cho nhu cầu của mình.

3. Giờ tự mình thử nào...

Triển khai một thành phần khác để hiển thị địa chỉ ví và số lượng lovelace trong ứng dụng Next.js của bạn. Kiểm tra [trang ví](https://meshjs.dev/apis/browserwallet) để biết thêm chi tiết.
