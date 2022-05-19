---
id: dapps-connector
title: DApps Connector
sidebar_label: DApps Connector
description: Tutorial coding DApps connection
#image: ./img/og-developer-portal.png
---

## Hướng dẫn kết nối ví (DApps Connector)

*Hướng dẫn này mang tính chất tham khảo và bạn nên có môi trường lập trình và lập trình viên hiểu biết code để thực hiện để tránh những sai sót.*

Cài đặt extension [Yoroi Extention](https://chrome.google.com/webstore/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb)

### Tạo 1 trang web đơn giản

Tạo một trang page đơn giản với nút Request access to Yoroi như bên dưới bằng HTML

Với các class d-none như bên dưới

![](https://static.slab.com/prod/uploads/9vni9lbw/posts/images/9wNRwKt-obnbhl4xlrHIAj2a.png)

```html
<div class="container">
  <div class="my-3">
    <h1 class="display-4 text-center">Cardano dApp Example</h1>
  </div>
  <div class="row">
    <div class="w-100 d-flex justify-content-center my-2">
      <div class="d-none" id="spinner" role="status"></div>
    </div>
    <div id="request-button-row" class="col-12 text-center my-3 d-none">
      <input type="checkbox" id="check-identification">&nbsp;Request identification</input><br/><br/>
      <button id="request-access" class="btn btn-primary">Request access to Yoroi</button>
    </div>
    <div id="connection-status" class="col-12 text-center my-3 d-none">
      <span style="display: block">Connected to: <b id="wallet-plate">ABCD-1234</b></span>
      <span style="display: block" id="wallet-icon"></span>
    </div>
    <div class="col-12 text-center my-3" id="connected-row" role="alert">
    </div>
  </div>
</div>
```



### Javascript

Import các thư viện của Cardano và xử lý kết nối



```javascript
import * as CardanoWasm from "@emurgo/cardano-serialization-lib-browser"
import { textPartFromWalletChecksumImagePart } from "@emurgo/cip4-js"
import { createIcon } from "@download/blockies"
import { Bech32Prefix } from '../../yoroi-extension/app/config/stringConfig';

const cardanoAccessBtnRow = document.querySelector('#request-button-row')
const cardanoAuthCheck = document.querySelector('#check-identification')
const cardanoAccessBtn = document.querySelector('#request-access')
const connectionStatus = document.querySelector('#connection-status')
const alertEl = document.querySelector('#alert')
const spinner = document.querySelector('#spinner')

let accessGranted = false
let cardanoApi
let returnType = 'cbor'

function isCBOR() {
  return returnType === 'cbor';
}

toggleSpinner('show');

function createBlockiesIcon(seed) {
  const colorIdx = hexToBytes(seed)[0] % COLORS.length;
  const color = COLORS[colorIdx];
  return createIcon({
    seed,
    size: 7,
    scale: 5,
    bgcolor: color.primary,
    color: color.secondary,
    spotcolor: color.spots,
  })
}

function onApiConnected(api) {
  toggleSpinner('hide');
  let walletDisplay = 'an anonymous Yoroi Wallet';

  api.experimental.setReturnType(returnType);

  const auth = api.experimental.auth && api.experimental.auth();
  const authEnabled = auth && auth.isEnabled();

  if (authEnabled) {
    const walletId = auth.getWalletId();
    const pubkey = auth.getWalletPubkey();
    console.log('Auth acquired successfully: ',
      JSON.stringify({ walletId, pubkey }));
    const walletPlate = textPartFromWalletChecksumImagePart(walletId);
    walletDisplay = `Yoroi Wallet ${walletPlate}`;
    walletIconSpan.appendChild(createBlockiesIcon(walletId));
  }

  alertSuccess(`You have access to ${walletDisplay} now`);
  walletPlateSpan.innerHTML = walletDisplay;
  toggleConnectionUI('status');
  accessGranted = true;
  window.cardanoApi = cardanoApi = api;

  api.experimental.onDisconnect(() => {
    alertWarrning(`Disconnected from ${walletDisplay}`);
    toggleConnectionUI('button');
    walletPlateSpan.innerHTML = '';
    walletIconSpan.innerHTML = '';
  });

  if (authEnabled) {
    console.log('Testing auth signatures')
    const messageJson = JSON.stringify({
      type: 'this is a random test message object',
      rndValue: Math.random(),
    });
    const messageHex = bytesToHex(messageJson);
    console.log('Signing randomized message: ', JSON.stringify({
      messageJson,
      messageHex,
    }))
    const start = performance.now();
    auth.signHexPayload(messageHex).then(sig => {
      const elapsed = performance.now() - start;
      console.log(`Signature created in ${elapsed} ms`);
      console.log('Signature received: ', sig);
      console.log('Verifying signature against the message');
      auth.checkHexPayload(messageHex, sig).then(r => {
        console.log('Signature matches message: ', r);
      }, e => {
        console.error('Sig check failed', e);
      });
    }, err => {
      console.error('Sig failed', err);
    });
  }
}

function reduceWasmMultiasset(multiasset, reducer, initValue) {
  let result = initValue;
  if (multiasset) {
    const policyIds = multiasset.keys();
    for (let i = 0; i < policyIds.len(); i++) {
      const policyId = policyIds.get(i);
      const assets = multiasset.get(policyId);
      const assetNames = assets.keys();
      for (let j = 0; j < assetNames.len(); j++) {
        const name = assetNames.get(j);
        const amount = assets.get(name);
        const policyIdHex = bytesToHex(policyId.to_bytes());
        const encodedName = bytesToHex(name.name());
        result = reducer(result, {
          policyId: policyIdHex,
          name: encodedName,
          amount: amount.to_str(),
          assetId: `${policyIdHex}.${encodedName}`,
        });
      }
    }
  }
  return result;
}

cardanoAccessBtn.addEventListener('click', () => {
    toggleSpinner('show');
    const requestIdentification = cardanoAuthCheck.checked;
    cardano.yoroi.enable({ requestIdentification }).then(
      function(api){
          onApiConnected(api);
      },
      function (err) {
        toggleSpinner('hide');
        alertError(`Error: ${err}`);
      },
    );
})
```

**Khi bấm vào request kết nối sẽ popup ra như sau
**
![](https://static.slab.com/prod/uploads/9vni9lbw/posts/images/uzSBgwqsvdMM2pQpwodIJ_L3.png)

Kết nối thành công!

![](https://static.slab.com/prod/uploads/9vni9lbw/posts/images/Gng99sRsPy4O6Nq7_OpVR16c.png)

Full code sample các bạn có thể tham khảo [ở đây](https://github.com/cardano2vn/yoroi-frontend/tree/develop/packages/yoroi-ergo-connector)

Hướng dẫn run code sample

```bash
git clone https://github.com/cardano2vn/yoroi-frontend.git
cd yoroi-frontend/yoroi-frontend/packages/yoroi-ergo-connector/
npm install
npm run start
```
