---
id: cardanocli-js
title: Bắt đầu với cardanocli-js
sidebar_label: cardanocli-js
description: Bắt đầu với cardanocli-js
#image: ./img/og-developer-portal.png
---

cardanocli-js wraps the cardano-cli in JavaScript and makes it possible to interact with the cli-commands much faster and more efficient.

## Yêu cầu trước

- `cardano-node >= 1.26.1`
- `node.js >= 12.19.0`

## Cài đặt

#### NPM

```bash
npm install cardanocli-js
```

#### Lấy mã nguồn và cài đặt

```bash
git clone https://github.com/Berry-Pool/cardanocli-js.git
cd cardanocli-js
npm install
```

## Bắt đầu

```javascript
const CardanocliJs = require("cardanocli-js");
const shelleyGenesisPath = "/home/ada/mainnet-shelley-genesis.json";

const cardanocliJs = new CardanocliJs({ shelleyGenesisPath });

const createWallet = (account) => {
  cardanocliJs.addressKeyGen(account);
  cardanocliJs.stakeAddressKeyGen(account);
  cardanocliJs.stakeAddressBuild(account);
  cardanocliJs.addressBuild(account);
  return cardanocliJs.wallet(account);
};

const createPool = (name) => {
  cardanocliJs.nodeKeyGenKES(name);
  cardanocliJs.nodeKeyGen(name);
  cardanocliJs.nodeIssueOpCert(name);
  cardanocliJs.nodeKeyGenVRF(name);
  return cardanocliJs.pool(name);
};

const wallet = createWallet("Ada");
const pool = createPool("Berry");

console.log(wallet.paymentAddr);
console.log(pool.vrf.vkey);
```

## Đối với testnet 

Đây là phiên bản làm việc

```
const CardanocliJs = require("cardanocli-js");
const shelleyGenesisPath = "../..//tconfig/testnet-shelley-genesis.json";
const options={}
options.shelleyGenesisPath = shelleyGenesisPath
options.network = "testnet-magic 1097911063"

const cardanocliJs = new CardanocliJs(options);

const createWallet = (account) => {
    try{
        paymentKeys = cardanocliJs.addressKeyGen(account);
        stakeKeys   = cardanocliJs.stakeAddressKeyGen(account);
        stakeAddr   = cardanocliJs.stakeAddressBuild(account);
        paymentAddr = cardanocliJs.addressBuild(account,{
            "paymentVkey": paymentKeys.vkey,
            "stakeVkey": stakeKeys.vkey
        });
        return cardanocliJs.wallet(account);
    }
    catch(err){
        console.log(err)
    }

};

const createPool = (name) => {
  cardanocliJs.nodeKeyGenKES(name);
  cardanocliJs.nodeKeyGen(name);
  cardanocliJs.nodeIssueOpCert(name);
  cardanocliJs.nodeKeyGenVRF(name);
  return cardanocliJs.pool(name);
};

const wallet = createWallet("Ada");
const pool = createPool("Berry");

console.log(wallet.paymentAddr);
console.log(pool.vrf.vkey);
```


Vào site [cardanocli-js](https://github.com/Berry-Pool/cardanocli-js/blob/main/API.md) để xem tài liệu API đầy đủ.
