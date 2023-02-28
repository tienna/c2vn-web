---
id: Smart-contract
sidebar_position: '12'
title: Sử dụng Hợp đồng thông minh của bạn với Mesh
sidebar_label: Sử dụng Hợp đồng thông minh của bạn với Mesh
description: Cardano đã giới thiệu hỗ trợ hợp đồng thông minh (smart contract) Plutus vào năm 2021, cho phép tạo ra một số ứng dụng phi tập trung. Tuy nhiên, kiến ​​thức cần thiết để phát triển một ứng dụng như vậy là rất rộng và có thể khiến các nhà phát triển hoặc công ty mới muốn xây dựng trên Cardano lo lắng. Mesh nhằm mục đích giải quyết vấn đề này và ở đây chúng ta đang cung cấp cho người dùng một hướng dẫn toàn diện để tạo điều kiện thuận lợi cho cách tiếp cận phát triển Cardano của họ.
#image: "../img/og/og-getstarted-mesh.png"
---


##Sử dụng Hợp đồng thông minh của bạn với Mesh

Hướng dẫn từng bước để tích hợp Hợp đồng thông minh Cardano của bạn với ứng dụng web.

Cardano đã giới thiệu hỗ trợ hợp đồng thông minh (smart contract) Plutus vào năm 2021, cho phép tạo ra một số ứng dụng phi tập trung. Tuy nhiên, kiến ​​thức cần thiết để phát triển một ứng dụng như vậy là rất rộng và có thể khiến các nhà phát triển hoặc công ty mới muốn xây dựng trên Cardano lo lắng. Mesh nhằm mục đích giải quyết vấn đề này và ở đây chúng ta đang cung cấp cho người dùng một hướng dẫn toàn diện để tạo điều kiện thuận lợi cho cách tiếp cận phát triển Cardano của họ.

Next.js và Mesh là các thư viện JavaScript, vì vậy chúng ta giả định rằng bạn đã quen thuộc với ngôn ngữ HTML và JavaScript, nhưng bạn sẽ có thể làm theo ngay cả khi bạn đến từ một ngôn ngữ lập trình khác. Nếu bạn không cảm thấy tự tin lắm, chúng ta khuyên bạn nên xem qua [hướng dẫn JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) này hoặc [Tham khảo MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) .

Để làm theo hướng dẫn này, bạn cũng sẽ cần một Hợp đồng thông minh Plutus đã biên soạn sẵn, cụ thể là đại diện CBOR của nó. Nếu bạn chưa quen với điều này, hãy xem [Mesh.plutus](https://github.com/MeshJS/mesh.plutus) , một kho lưu trữ do nhóm Mesh viết, chứa tuyển tập Hợp đồng thông minh dựng sẵn cho các trường hợp sử dụng khác nhau.

## Thiết lập hệ thống

1. Visual Studio Code

Visual Studio Code là một trình chỉnh sửa mã được tạo bởi Microsoft. Tải xuống và cài đặt [Visual Studio Code](https://code.visualstudio.com/) để chỉnh sửa mã.

2. Node.js

Node.js là môi trường thời gian chạy JavaScript đa nền tảng chạy trên công cụ V8 và thực thi mã JavaScript. Cài đặt phiên bản Hỗ trợ dài hạn (LTS) của [Node.js](https://nodejs.org/) (phiên bản v18.12.1).

3. Yarn

Để làm theo hướng dẫn này, bạn sẽ cài đặt thêm Yarn. Làm điều đó với lệnh sau:

```
npm install yarn
```


## Cài đặt Next.js

1. Tạo thư mục dự án và mở Visual Studio Code
Tạo một thư mục mới cho dự án của bạn và đặt cho thư mục một cái tên có ý nghĩa. Mở ứng dụng Visual Studio Code và kéo thư mục dự án của bạn vào Visual Studio Code.

2. Tạo ứng dụng Next.js
Từ menu tùy chọn trong Visual Studio Code, hãy mở và thực hiện lệnh này để tạo ứng dụng NextJs mới: Terminal

```
npx create-next-app@latest --typescript .
```

3. Bắt đầu phát triển máy chủ

Sau khi cài đặt hoàn tất, hãy khởi động máy chủ phát triển với:

```
npm run dev
```

Truy cập http://localhost:3000 để xem ứng dụng của bạn. Để dừng ứng dụng: CTRL+C


### Cài đặt Mesh

1. Cài đặt gói MeshJS
Cài đặt phiên bản mới nhất của Mesh với npm:

```
npm install @meshsdk/core
```

2. Thêm webpack vào `next.config.js`

Mở next.config.jsvà nối webpack các cấu hình. của bạn next.config.jssẽ trông như thế này:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
};
module.exports = nextConfig;
```

3. Xin chúc mừng

Bạn vừa tiết kiệm được vài tuần học tập và vài ngày cố gắng bắt đầu. Ứng dụng Next.js của bạn đã sẵn sàng chấp nhận các kết nối ví, duyệt nội dung và thực hiện một số giao dịch.

## Thêm kết nối ví

1. Cài đặt @meshsdk/gói phản ứng

Cài đặt phiên bản mới nhất của Mesh-reac với npm:

```
yarn add @meshsdk/react
```

2. Thiết lập MeshProvider

Mở `pages/_app.tsx` và thay thế nó bằng đoạn mã sau:

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
};

export default MyApp;
```

3. Thêm nút kết nối vào trang web của bạn

Mở `pages/index.tsx` và thay thế nó bằng cách sau:

```javascript
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { useState } from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { wallet, connected, connecting } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <h1>Connect Wallet</h1>
      <CardanoWallet />
    </div>
  );
};

export default Home;

```

Xong! Bây giờ hãy truy cập http://localhost:3000 để xem nút kết nối ví của bạn.

## Tích hợp Hợp đồng thông minh của bạn

1. Thêm mã được biên dịch Plutus của bạn vào dự án

Ở đây chúng ta sẽ cần phiên bản đã biên dịch của Hợp đồng thông minh Plutus của bạn. Nếu bạn không có hoặc không biết đây là gì, hãy xem Hợp đồng thông minh dựng sẵn có sẵn do nhóm Mesh cung cấp [tại đây](https://github.com/MeshJS/mesh.plutus) . Trong hướng dẫn này, chúng ta sẽ sử dụng tập lệnh [Always True](https://github.com/MeshJS/mesh.plutus/tree/always-true) , đúng như tên gọi của nó, luôn thành công, nhưng bạn có thể làm theo hướng dẫn này với bất kỳ hợp đồng thông minh của Mesh xây dựng sẵn nào. Chi tiết cho từng hợp đồng được cung cấp trong chi nhánh cá nhân của họ.

Tạo một thư mục mới có tên `config` và trong đó tạo một tệp mới có tên `contract.ts`. Mở nó và chèn đoạn mã sau:

```javascript
import { PlutusScript, resolvePlutusScriptAddress } from '@meshsdk/core';

export const script: PlutusScript = {
    code: '59079559079201000033232323232323232323232323232332232323232323232222232325335333006300800530070043333573466e1cd55cea80124000466442466002006004646464646464646464646464646666ae68cdc39aab9d500c480008cccccccccccc88888888888848cccccccccccc00403403002c02802402001c01801401000c008cd4060064d5d0a80619a80c00c9aba1500b33501801a35742a014666aa038eb9406cd5d0a804999aa80e3ae501b35742a01066a0300466ae85401cccd54070091d69aba150063232323333573466e1cd55cea801240004664424660020060046464646666ae68cdc39aab9d5002480008cc8848cc00400c008cd40b9d69aba15002302f357426ae8940088c98c80c8cd5ce01981901809aab9e5001137540026ae854008c8c8c8cccd5cd19b8735573aa004900011991091980080180119a8173ad35742a004605e6ae84d5d1280111931901919ab9c033032030135573ca00226ea8004d5d09aba2500223263202e33573805e05c05826aae7940044dd50009aba1500533501875c6ae854010ccd540700808004d5d0a801999aa80e3ae200135742a00460446ae84d5d1280111931901519ab9c02b02a028135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d55cf280089baa00135742a00460246ae84d5d1280111931900e19ab9c01d01c01a101b13263201b3357389201035054350001b135573ca00226ea80054049404448c88c008dd6000990009aa80a911999aab9f0012500a233500930043574200460066ae880080548c8c8cccd5cd19b8735573aa004900011991091980080180118061aba150023005357426ae8940088c98c8054cd5ce00b00a80989aab9e5001137540024646464646666ae68cdc39aab9d5004480008cccc888848cccc00401401000c008c8c8c8cccd5cd19b8735573aa0049000119910919800801801180a9aba1500233500f014357426ae8940088c98c8068cd5ce00d80d00c09aab9e5001137540026ae854010ccd54021d728039aba150033232323333573466e1d4005200423212223002004357426aae79400c8cccd5cd19b875002480088c84888c004010dd71aba135573ca00846666ae68cdc3a801a400042444006464c6403866ae700740700680640604d55cea80089baa00135742a00466a016eb8d5d09aba2500223263201633573802e02c02826ae8940044d5d1280089aab9e500113754002266aa002eb9d6889119118011bab00132001355012223233335573e0044a010466a00e66442466002006004600c6aae754008c014d55cf280118021aba200301313574200222440042442446600200800624464646666ae68cdc3a800a40004642446004006600a6ae84d55cf280191999ab9a3370ea0049001109100091931900899ab9c01201100f00e135573aa00226ea80048c8c8cccd5cd19b875001480188c848888c010014c01cd5d09aab9e500323333573466e1d400920042321222230020053009357426aae7940108cccd5cd19b875003480088c848888c004014c01cd5d09aab9e500523333573466e1d40112000232122223003005375c6ae84d55cf280311931900899ab9c01201100f00e00d00c135573aa00226ea80048c8c8cccd5cd19b8735573aa004900011991091980080180118029aba15002375a6ae84d5d1280111931900699ab9c00e00d00b135573ca00226ea80048c8cccd5cd19b8735573aa002900011bae357426aae7940088c98c802ccd5ce00600580489baa001232323232323333573466e1d4005200c21222222200323333573466e1d4009200a21222222200423333573466e1d400d2008233221222222233001009008375c6ae854014dd69aba135744a00a46666ae68cdc3a8022400c4664424444444660040120106eb8d5d0a8039bae357426ae89401c8cccd5cd19b875005480108cc8848888888cc018024020c030d5d0a8049bae357426ae8940248cccd5cd19b875006480088c848888888c01c020c034d5d09aab9e500b23333573466e1d401d2000232122222223005008300e357426aae7940308c98c8050cd5ce00a80a00900880800780700680609aab9d5004135573ca00626aae7940084d55cf280089baa0012323232323333573466e1d400520022333222122333001005004003375a6ae854010dd69aba15003375a6ae84d5d1280191999ab9a3370ea0049000119091180100198041aba135573ca00c464c6401a66ae7003803402c0284d55cea80189aba25001135573ca00226ea80048c8c8cccd5cd19b875001480088c8488c00400cdd71aba135573ca00646666ae68cdc3a8012400046424460040066eb8d5d09aab9e500423263200a33573801601401000e26aae7540044dd500089119191999ab9a3370ea00290021091100091999ab9a3370ea00490011190911180180218031aba135573ca00846666ae68cdc3a801a400042444004464c6401666ae7003002c02402001c4d55cea80089baa0012323333573466e1d40052002212200223333573466e1d40092000212200123263200733573801000e00a00826aae74dd5000891999ab9a3370e6aae74dd5000a40004008464c6400866ae700140100092612001490103505431001123230010012233003300200200122212200201',
    version: 'V2',
};

export const scriptAddr = resolvePlutusScriptAddress(script, 1);
```

Trường này **code:** là nơi bạn đặt mã CBOR đã biên dịch của Hợp đồng thông minh của mình. Nếu bạn đang sử dụng Hợp đồng thông minh khác để làm theo hướng dẫn này, vui lòng thay thế CBOR được hiển thị ở đây bằng hợp đồng của bạn. Ngoài ra, ở đây tập lệnh của chúng ta là tập lệnh V2, nhưng vui lòng sửa đổi tập lệnh này theo nhu cầu của bạn.

Lưu ý rằng ở đây chúng ta sử dụng hàm của Mesh để lấy địa chỉ của tập lệnh. Hàm `resolvePlutusScriptAddress` nhận hai đối số: một là `PlutusScript` và một là `số nguyên` đại diện cho Id mạng. Ở đây, chúng ta sử dụng mạng mainnet có Id là `1`, nhưng vui lòng thay đổi nó theo nhu cầu của bạn (Đối với việc sử dụng Testnet, Preview hoặc PreProd là 0 ). Để biết thêm thông tin, hãy xem [Resolvers.](https://meshjs.dev/apis/resolvers) . 

**2. Khóa tiền  (Lock funds)**

Bây giờ chúng ta đã đưa thành công hợp đồng của mình vào dự án, chúng ta có thể bắt đầu sử dụng nó trong ứng dụng web của mình.

Mở `pages/index.tsx` và thêm hai thư viện sau vào đầu tệp của bạn:

```javascript
import { script, scriptAddr } from "../config/contract";
import { Transaction, Data, BlockfrostProvider, resolveDataHash } from '@meshsdk/core';
```

Bây giờ chúng ta sẽ sử dụng trình xây dựng giao dịch của Mesh để tạo giao dịch khóa. Tùy thuộc vào hợp đồng của bạn, bạn có thể sẽ cần sửa đổi các trường giá trị và datum, ở đây chúng ta sẽ khóa một [Testtoken](https://cardanoscan.io/token/asset12hd46z28ypg6gm874jklfvcsvw8d8thy5875tc) với dữ liệu chứa một số nguyên đơn giản. Thật vậy, vì hợp đồng [Always True](https://github.com/MeshJS/mesh.plutus/tree/always-true) không phụ thuộc vào giá trị mốc thời gian, nên chúng ta có thể đặt bất kỳ mốc thời gian nào chúng ta muốn và để đơn giản hóa, chúng ta sử dụng một số nguyên.

Thêm hàm sau vào `pages/index.tsx` của bạn, ngay trước `return`.

```javascript
async function lockFunds() {
  if (wallet) {
    const addr = (await wallet.getUsedAddresses())[0];
    const d: Data = {
      alternative: 0,
      fields: [42],
    };
    const tx = new Transaction({ initiator: wallet })
      .sendAssets(
        {
          address: scriptAddr,
          datum: {
            value: d,
          },
        },
        [
          {
            unit: "22f20d5382cec46166b566821f16f79cb03ee1520c71e5f83a4b3f2054657374746f6b656e",
            quantity: "1",
          },
        ],
      );
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
  }
};
```

Nếu bạn đang thắc mắc, chúng ta sử dụng `policyId+hexTokenName` để tạo trường `unit` cho  giá trị. Để có được `unit` này, bạn có thể truy cập bất kỳ trình khám phá Cardano nào và tìm kiếm mã thông báo của mình, bạn sẽ thấy id chính sách cũng như tên mã thông báo cả ở dạng văn bản thuần túy và hex. Ví dụ: [Testtoken](https://cardanoscan.io/token/asset12hd46z28ypg6gm874jklfvcsvw8d8thy5875tc) trên mainnet có id chính sách là `22f20d5382cec46166b566821f16f79cb03ee1520c71e5f83a4b3f20` và tên mã thông báo dạng hex sẽ là `54657374746f6b656e` sau đó cho kết quả `unit`: `22f20d5382cec46166b566821f16f79cb03ee1520c71e5f83a4b3f2054657374746f6b656e`

Bây giờ thay thế hàm `return` bằng cách sau

```javascript
return (
  <div>
    <h1>Connect Wallet</h1>
    <CardanoWallet />
    {connected && (
      <>
        <h1>Lock funds in your Contract</h1>
        
          <button
            type="button"
            onClick={() => lockFunds()}
            disabled={connecting || loading}
            style={{
              margin: "8px",
              backgroundColor: connecting || loading ? "orange" : "grey",
            }}
          >
            Lock funds
          </button>
        
      </>
    )}
  </div>
);
```

giờ truy cập http://localhost:3000 để khóa một số tiền.

Hiện tại, chúng ta đã khóa thành công một NFT trong tập lệnh của mình với datum có giá trị '42'. Nếu bạn muốn tìm hiểu cách xây dựng các cấu trúc dữ liệu phức tạp hơn, hãy xem Tài liệu  [API - giao dịch](https://meshjs.dev/apis/transaction/smart-contract#datum) trong phần `Designing datum`

**3. Mở khóa tiền (Unlock funds)**

Sau khi khóa thành công một số tiền, bây giờ là lúc để mở khóa chúng. Ở đây, ngoài mốc thời gian, chúng ta sẽ cần xây dựng một `redeemer`. Trong ví dụ này, chúng ta sẽ sử dụng một số nguyên đơn giản, nhưng vui lòng sửa đổi nó theo những gì hợp đồng của bạn yêu cầu.

Trước tiên, hãy tìm nạp dữ liệu từ chuỗi khối tại địa chỉ tập lệnh để nhận `UTxO` chính xác mà chúng ta đang cố gắng chi tiêu. Đối với điều này, chúng ta sẽ sử dụng `BlockfrostProvider`, nhưng bạn có thể sử dụng bất kỳ nhà cung cấp nào mà Mesh hỗ trợ, xem [Nhà cung cấp](https://meshjs.dev/apis/providers) .

Dán hàm sau ngay trước phần `return`  của bạn

```javascript
async function _getAssetUtxo({scriptAddress, asset, datum}) {
  const blockfrostProvider = new BlockfrostProvider(
    '<blockfrostApiKey>',
  );
  const utxos = await blockfrostProvider.fetchAddressUTxOs(
    scriptAddress,
    asset
  );
  const dataHash = resolveDataHash(datum);
  let utxo = utxos.find((utxo: any) => {
    return utxo.output.dataHash == dataHash;
  });
  return utxo;
};
```

Hàm `_getAssetUtxo` quét các UTxO tại đỉa chỉ `scriptAddress` và lọc theo hàm băm dữ liệu để tìm chính xác UTxO mà chúng ta đang cố gắng chi tiêu. chúng ta cần `UTxO` này để xây dựng giao dịch mở khóa. 

Bây giờ chúng ta có thể xây dựng giao dịch mở khóa của mình, dán hàm sau ngay trước phần `return` của bạn. Đảm bảo xây dựng cùng dữ liệu bạn đã sử dụng khi khóa tiền.

```javascript
async function unlockFunds() {
  if (wallet) {
    setLoading(true);
    const addr = (await wallet.getUsedAddresses())[0];
    const datumConstr: Data = {
      alternative: 0,
      fields: [42],
    };
    const redeemer = {
      data: {
        alternative: 0,
        fields: [21],
      },
    };
    
    const assetUtxo = await _getAssetUtxo({
      scriptAddress: scriptAddr, 
      asset: '22f20d5382cec46166b566821f16f79cb03ee1520c71e5f83a4b3f2054657374746f6b656e',
      datum: datumConstr,
    });

    const tx = new Transaction({ initiator: wallet })
      .redeemValue({
        value: assetUtxo,
        script: script,
        datum: datumConstr,
        redeemer: redeemer,
      })
      .sendValue({ address: addr }, assetUtxo)
      .setRequiredSigners([addr]);
    
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    setLoading(false);
  }
};
```

Hãy xem hàm này làm gì. Trước tiên, chúng ta đặt các hằng số của mình `addr`, `datumConstr`, `redeemer`, như đã giải thích trước đây trong hướng dẫn này, chúng ta sử dụng tập lệnh `Always True` hoạt động với bất kỳ `Datum` và `Dedeemer` nào, vì vậy, ở đây chúng ta xây dựng cùng một `Datum` như khi khóa **(phải giống nhau!) ** và một `Redeemer` ngẫu nhiên. Sau đó, chúng ta sử dụng hàm `_getAssetUtxo` đã xác định trước đó để tìm nạp UTxO mà chúng ta đang cố gắng chi tiêu. Cuối cùng, chúng ta xây dựng giao dịch mở khóa trong `tx` đó, chúng ta chuyển tất cả các trường cần thiết để mở khóa tiền từ một tập lệnh. 

Cuối cùng, hãy thay đổi hàm `return`  một lần nữa để lần này mở khóa tiền. Thay thế nó bằng đoạn mã sau:

```javascript
return (
  <div>
    <h1>Connect Wallet</h1>
    <CardanoWallet />
    {connected && (
      <>
        <h1>Unlock your funds from your Contract</h1>
        
          <button
            type="button"
            onClick={() => unlockFunds()}
            disabled={connecting || loading}
            style={{
              margin: "8px",
              backgroundColor: connecting || loading ? "orange" : "grey",
            }}
          >
            Unlock funds
          </button>
        
      </>
    )}
  </div>
);
```

Truy cập http://localhost:3000 và mở khóa tiền của bạn.

4. Khám phá thêm

Xin chúc mừng, bạn đã tích hợp thành công Hợp đồng thông minh của mình vào một ứng dụng web!

Giờ đây, bạn có thể muốn khám phá các cấu trúc `datum/redeemer` phức tạp hơn, các tính năng của V2, đúc tiền Plutus, v.v. Mesh hỗ trợ từng tính năng này và chúng ta đang liên tục làm việc để thêm nhiều hướng dẫn hơn và mở rộng tài liệu. Nếu bạn gặp bất kỳ sự cố nào, vui lòng báo cáo chúng trong máy chủ [Discord](https://discord.gg/Z6AH9dahdH) của chúng tôi hoặc mở một sự cố trên trang [Github của Mesh](https://github.com/MeshJS/mesh) .

