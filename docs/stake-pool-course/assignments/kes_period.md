---
id: kes_period
title:  KES Periods
sidebar_label:  KES periods
description: "Stake pool course: KES period assignment." 
#image: ../img/og-developer-portal.png
---

Để tạo chứng chỉ hoạt động cho một nút tạo khối, bạn cần tạo một _KES key pair_.

Ở đây "KES" là viết tắt của _**K**ey **E**volving **S**ignature_, có nghĩa là sau một khoảng thời gian nhất định, khóa sẽ phát hành thành khóa mới và loại bỏ phiên bản cũ của nó. Điều này rất hữu ích, bởi vì nó có nghĩa là ngay cả khi kẻ tấn công xâm phạm khóa và có quyền truy cập vào khóa ký, anh ta chỉ có thể sử dụng nó để ký các khối từ bây giờ, chứ không phải các khối có từ trước đó, khiến kẻ tấn công không thể viết lại lịch sử.

Thật không may, có một vấn đề: Khóa KES chỉ có thể phát hành trong một số khoảng thời gian nhất định và trở nên vô dụng sau đó. Điều này có nghĩa là trước khi số khoảng thời gian đó trôi qua, nhà điều hành nút phải tạo cặp khóa KES mới, cấp chứng chỉ nút hoạt động mới với cặp khóa mới đó và khởi động lại nút bằng chứng chỉ mới.

Để tìm hiểu thời gian một chu kỳ là bao lâu và khóa có thể phát triển trong bao lâu, chúng ta có thể xem xét tệp nguồn gốc. Nếu tệp đó được gọi `shelley_testnet-genesis.json`, chúng ta có thể thấy.

```
cat shelley_testnet-genesis.json | grep KES

> "slotsPerKESPeriod": 3600,
> "maxKESEvolutions": 120,
```

và chúng ta thấy rằng trong ví dụ này, chìa khóa sẽ phát hành sau mỗi khoảng thời gian 3600 slot và nó có thể phát hành 120 lần trước khi cần được đổi mới.

Trước khi chúng tôi có thể tạo chứng chỉ hoạt động cho nút của mình, chúng tôi cần tìm ra thời điểm bắt đầu thời hạn hiệu lực KES, tức là chúng tôi đang ở giai đoạn phát triển KES nào. Chúng tôi kiểm tra vị trí hiện tại \(giả sử tệp ổ cắm nút chuyển tiếp của chúng tôi đang ở  `$HOME/cardano-node/relay/db/node.socket`\):

```
export CARDANO_NODE_SOCKET_PATH=$HOME/cardano-node/relay/db/node.socket
cardano-cli shelley query tip --testnet-magic 1097911063

{
    "blockNo": 27470,
    "headerHash": "bd954e753c1131a6cb7ab3a737ca7f78e2477bea93db54511cedefe8899ebed0",
    "slotNo": 656260
}
```

Trong ví dụ này, chúng tôi hiện đang ở vị trí 656260 và chúng tôi biết từ tệp nguồn gốc rằng một giai đoạn kéo dài cho 3600 slot. Vì vậy, chúng tôi tính toán khoảng thời gian hiện tại bằng cách

```
expr 656260 / 3600
> 182
```

Với điều này, chúng tôi có thể tạo chứng chỉ hoạt động cho nhóm cổ phần của chúng tôi (giả sử các tên tệp giống như [ở ](../handbook/generate-stake-pool-keys)):

```
cardano-cli shelley node issue-op-cert \
    --kes-verification-key-file kes.vkey \
    --cold-signing-key-file cold.skey \
    --operational-certificate-issue-counter cold.counter \
    --kes-period 182 \
    --out-file node.cert
```
