---
id: transactions-staking
sidebar_position: '7'
title: Giao dịch đặt cược   - SDK Mesh (Thư viện nguồn mở để xây dựng ứng dụng Web3 trên Chuỗi khối Cardano)
sidebar_label: Giao dịch đặt cược
description: API để đặt cược ADA và quản lý nhóm cổ phần.
#image: "../img/og/og-getstarted-mesh.png"
---

Trong phần này, chúng ta sẽ tìm hiểu cách tạo cổ phần ADA trong các nhóm cổ phần. Nếu bạn chưa quen với giao dịch, hãy nhớ xem cách tạo giao dịch để [Gửi lovelace và tài sản](transactions-basic) .

Trong phần này, chúng ta sẽ khám phá những điều sau đây:

- [Đăng ký địa chỉ cổ phần](#đăng-ký-địa-chỉ-cổ-phần)
- [Ủy quyền ADA cho Stakepool](#ủy-quyền-ada-cho-stakepool)

## Đăng ký địa chỉ cổ phần

Địa chỉ mới phải "đăng ký" trước khi họ có thể ủy quyền cho các nhóm stakepool.

```javascript
import { Transaction } from "@meshsdk/core";

const rewardAddress = "stake1qdzmqvfdnxsn4a3hd57x435madswynt4hqw8n7f2pdq05g4995re";
const poolId = "pool1mhww3q6d7qssj5j2add05r7cyr7znyswe2g6vd23anpx5sh6z8d";

const tx = new Transaction({ initiator: wallet });
tx.registerStake(rewardAddress);
tx.delegateStake(rewardAddress, poolId);

const unsignedTx = await tx.build();
const signedTx = await wallet.signTx(unsignedTx);
const txHash = await wallet.submitTx(signedTx);
```

## Ủy quyền ADA cho Stakepool

Ủy quyền là quá trình theo đó chủ sở hữu ADA ủy quyền cổ phần liên quan đến ADA của họ cho nhóm cổ phần. Làm như vậy, điều này cho phép những người nắm giữ ADA tham gia vào mạng và được thưởng tương ứng với số cổ phần được ủy quyền.

```javascript
import { Transaction } from "@meshsdk/core";

const rewardAddress = "stake1qdzmqvfdnxsn4a3hd57x435madswynt4hqw8n7f2pdq05g4995re";
const poolId = "pool1mhww3q6d7qssj5j2add05r7cyr7znyswe2g6vd23anpx5sh6z8d";

const tx = new Transaction({ initiator: wallet });
tx.delegateStake(rewardAddress, poolId);

const unsignedTx = await tx.build();
const signedTx = await wallet.signTx(unsignedTx);
const txHash = await wallet.submitTx(signedTx);
```

Kiểm tra [Sân chơi Mesh](https://meshjs.dev/apis/transaction/staking) để xem bản trình diễn trực tiếp và giải thích đầy đủ.
