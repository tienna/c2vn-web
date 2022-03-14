---
id: listening-for-payments-wallet
title: Thanh toán ada bằng cardano-wallet
sidebar_label: Thánh toán băng cardano-wallet
description: Làm thế nào để xem Ada thanh toán bằng cardano-wallet?.
#image: img/ada-online-shop.png
--- 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

:::note

This guide assumes that you have basic understanding of `cardano-wallet`, how to use it and that you have installed it into your system. Otherwise we recommend reading [Installing cardano-node](/docs/get-started/installing-cardano-node), [Running cardano-node](/docs/get-started/running-cardano) and [Exploring Cardano Wallets](/docs/integrate-cardano/creating-wallet-faucet) guides first.

Hướng dẫn này giả định rằng bạn có hiểu biết cơ bản về `cardano-wallet`, cách sử dụng nó và bạn đã cài đặt nó vào hệ thống của mình. Nếu không, chúng tôi khuyên bạn nên đọc hướng dẫn[Installing cardano-node](/docs/get-started/installing-cardano-node), [Running cardano-node](/docs/get-started/running-cardano) và [Exploring Cardano Wallets](/docs/integrate-cardano/creating-wallet-faucet) trước tiên.


This guide also assumes that you have `cardano-node` and `cardano-wallet` running in the background and connected to the `testnet` network.

Hướng dẫn này cũng giả định rằng bạn có `cardano-node` và `cardano-wallet` đang chạy và được kết nối với mạng `testnet`.
:::

## Use case

There are many possible reasons why you would want to have the functionality of listening for `ada` payments, but a very obvious use case would be for something like an **online shop** or a **payment gateway** that uses `ada` tokens as the currency.

Có nhiều lý do có thể khiến bạn muốn có chức năng kiểm tra các khoản thanh toán `ada`, nhưng một trường hợp điển hình là đối với một **cửa hàng trực tuyến** hoặc **cổng thanh toán** sử dụng tokens `ada` là đồng tiền thanh toán.

![img](../../static/img/integrate-cardano/ada-online-shop.png)

## Technical flow

To understand how something like this could work in a technical point of view, let's take a look at the following diagram:

Để hiểu hơn về vấn đề này về mặt kỹ thuật, chúng ta hãy xem sơ đồ sau:
![img](../../static/img/integrate-cardano/ada-payment-flow-wallet.png)

So let's imagine a very basic scenario where a **customer** is browsing an online shop. Once the user has choosen and added all the items into the **shopping cart**. The next step would then be to checkout and pay for the items, Of course we will be using **Cardano** for that!

Vì vậy, hãy tưởng tượng một tình huống rất cơ bản khi một **khách hàng** đang duyệt qua một cửa hàng trực tuyến. Khi người dùng đã chọn và thêm tất cả các mặt hàng vào **giỏ hàng** . Bước tiếp theo sẽ là kiểm tra và sử dụng cardano để thanh toán các mặt hàng đã chọn!

The **front-end** application would then request for a **wallet address** from the backend service and render a QR code to the **customer** to be scanned via a **Cardano wallet**. The backend service would then know that it has to query the `cardano-wallet` with a certain time interval to confirm and alert the **front-end** application that the payment has completed succesfully.

Sau đó, ứng dụng **front-end** sẽ yêu cầu **địa chỉ ví** từ dịch vụ backend và hiển thị mã QR cho khách hàng quét bằng **ví Cardano**. Sau đó, dịch vụ backend sẽ truy vấn trong `cardano-wallet` một khoảng thời gian nhất định để xác nhận và thông báo cho ứng dụng **front-end** rằng khoản thanh toán đã hoàn thành.

In the meantime the transaction is then being processed and settled within the **Cardano** network. We can see in the diagram above that both parties are ultimately connected to the network via the `cardano-node` software component.

Sau đó giao dịch sẽ được xử lý và thanh toán trong mạng **Cardano**. Chúng ta có thể thấy trong sơ đồ trên là cuối cùng cả hai bên đều được kết nối với mạng thông qua thành phần phần mềm `cardano-node`.

## Time to code

Now let's get our hands dirty and see how we can implement something like this in actual code.

Bây giờ chúng ta hãy bắt tay vào xem chúng ta có thể thực hiện một công việc như trên trong mã thực tế.

### Generate wallet and request tAda

First, we create our new **wallet** via `cardano-wallet` **REST API**:

Đầu tiên, chúng ta tạo **ví** mới thông qua `cardano-wallet`**REST API**:

#### Generate seed

<Tabs
  defaultValue="js"
  groupId="language"
  values={[
    {label: 'JavaScript', value: 'js'},
    {label: 'Typescript', value: 'ts'},
    {label: 'Python', value: 'py'},
    {label: 'C#', value: 'cs'}
  ]}>

  <TabItem value="js">

```js
// Please add this dependency using npm install node-cmd
import cmd from 'node-cmd';
const mnemonic = cmd.runSync(["cardano-wallet","recovery-phrase", "generate"].join(" ")).data;

```

  </TabItem>
  <TabItem value="py">

```py
import subprocess

mnemonic = subprocess.check_output([
    'cardano-wallet', 'recovery-phrase', 'generate'
])
```

  </TabItem>

  <TabItem value="cs">

```csharp
using System;
using SimpleExec; // dotnet add package SimpleExec --version 7.0.0

var mnemonic = await Command.ReadAsync("cardano-wallet", "recovery-phrase generate", noEcho: true);
```

  </TabItem>
  <TabItem value="ts">

```ts
// Please add this dependency using npm install node-cmd but there is no @type definition for it
const cmd: any = require('node-cmd');

const mnemonic: string = cmd.runSync(["cardano-wallet", "recovery-phrase", "generate"].join(" ")).data;
```

  </TabItem>
</Tabs>

#### Restore wallet from seed

We will then pass the generated seed to the wallet create / restore endpoint of `cardano-wallet`.

Sau đó, chúng ta sẽ chuyển các từ đã được tạo ở trên để tạo/khôi phục `cardano-wallet`.
<Tabs
  defaultValue="js"
  groupId="language"
  values={[
    {label: 'JavaScript', value: 'js'},
    {label: 'Typescript', value: 'ts'},
    {label: 'Python', value: 'py'},
    {label: 'C#', value: 'cs'}
  ]}>

  <TabItem value="js">

```js
// Please add this dependency using npm install node-fetch
import fetch from 'node-fetch';

const resp = await fetch("http://localhost:9998/v2/wallets", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: "test_cf_1",
        mnemonic_sentence: ["expose", "biology", "will", "pause", "taxi", "behave", "inquiry", "lock", "matter", "pride", "divorce", "model", "little", "easily", "solid", "need", "dose", "sadness", "kitchen", "pyramid", "erosion", "shoulder", "double", "fragile"],
        passphrase: "test123456"
    })
});
```

  </TabItem>

  <TabItem value="ts">

```ts
// Please add this dependency using npm install node-fetch and npm install @types/node-fetch
import fetch from 'node-fetch';
import { Response } from 'node-fetch';

const resp: Response = await fetch("http://localhost:9998/v2/wallets", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: "test_cf_1",
        mnemonic_sentence: ["expose", "biology", "will", "pause", "taxi", "behave", "inquiry", "lock", "matter", "pride", "divorce", "model", "little", "easily", "solid", "need", "dose", "sadness", "kitchen", "pyramid", "erosion", "shoulder", "double", "fragile"],
        passphrase: "test123456"
    })
});
```

  </TabItem>

  <TabItem value="py">

```py
# pip install requests
import requests

data = {
    'name'                  :   'test_cf_1',
    'mnemonic_sentence'     :  ["expose", "biology", "will", "pause", "taxi", "behave", "inquiry", "lock", "matter", "pride", "divorce", "model", "little", "easily", "solid", "need", "dose", "sadness", "kitchen", "pyramid", "erosion", "shoulder", "double", "fragile"],
    'passphrase'            :   'test123456'
}

r = requests.post("http://localhost:9998/v2/wallets", json=data)
```

  </TabItem>

  <TabItem value="cs">

```csharp
using System;
using System.Net.Http;
using System.Net.Http.Json;

// Restore the wallet using the previously generated seed. Assuming cardano-wallet is listening on port 9998
using var http = new HttpClient() { BaseAddress = new Uri("http://localhost:9998/v2/") };

var resp = await http.PostAsJsonAsync("wallets", new {
    name = "test_cf_1",    
    mnemonic_sentence = new[] { "expose", "biology", "will", "pause", "taxi", "behave", "inquiry", "lock", "matter", "pride", "divorce", "model", "little", "easily", "solid", "need", "dose", "sadness", "kitchen", "pyramid", "erosion", "shoulder", "double", "fragile" },    
    passphrase = "test123456"
});
```

  </TabItem>

</Tabs>

#### Get unused wallet address to receive some payments

We will get a **wallet address** to show to the customers and for them to send payments to the wallet. In this case we can use the address to request some `tAda` from the [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet) and simulate a payment:

Chúng ta sẽ nhận một ** địa chỉ ví**  gửi cho khách hàng để họ thanh toán. Trong trường hợp này, chúng ta có thể sử dụng địa chỉ để yêu cầu một số `tAda` từ [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet) và mô phỏng một khoản thanh toán:

<Tabs
  defaultValue="js"
  groupId="language"
  values={[
    {label: 'JavaScript', value: 'js'},
    {label: 'Typescript', value: 'ts'},
    {label: 'Python', value: 'py'},
    {label: 'C#', value: 'cs'}
  ]}>

  <TabItem value="js">

```js
// Please add this dependency using npm install node-fetch
import fetch from 'node-fetch';
const walletId = "101b3814d6977de4b58c9dedc67b87c63a4f36dd";
const resp = await fetch(`http://localhost:9998/v2/wallets/${walletId}/addresses?state=unused`);
const addresses = await resp.json();
const firstWalletAddress = addresses[0].id;
```

  </TabItem>

  <TabItem value="ts">

```ts
// Please add this dependency using npm install node-fetch and npm install @types/node-fetch
import fetch from 'node-fetch';
import { Response } from 'node-fetch';

const walletId: string = "101b3814d6977de4b58c9dedc67b87c63a4f36dd";
const resp: Response = await fetch(`http://localhost:9998/v2/wallets/${walletId}/addresses?state=unused`);
const addresses: any = await resp.json();
const firstWalletAddress: string = addresses[0].id;
```

  </TabItem>

  <TabItem value="py">

```python
# pip install requests
import requests
walletId = '101b3814d6977de4b58c9dedc67b87c63a4f36dd'
r = requests.get('http://localhost:9998/v2/wallets/%s/addresses?state=unused' % walletId)
addresses = r.json()
firstWalletAddress = addresses[0]['id']
```

  </TabItem>

  <TabItem value="cs">

```csharp
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;

using var http = new HttpClient() { BaseAddress = new Uri("http://localhost:9998/v2/") };
// Retrieve wallet address from previously created wallet
// Replace with the wallet Id you previously generated above
var walletId = "101b3814d6977de4b58c9dedc67b87c63a4f36dd";
var address = await http.GetFromJsonAsync<JsonElement>($"wallets/{walletId}/addresses?state=unused");
var firstWalletAddress = addressResponse[0].GetProperty("id");
```

  </TabItem>

</Tabs>

### Retrieve wallet balance

We will then retrieve the wallet details to get stuff like its `sync status`, `native assets` and `balance (lovelace)`. We can then use the `balance` to check if we have received a some payment.

Sau đó, chúng ta sẽ truy xuất các chi tiết ví để nhận `sync status`, `native assets` và `balance (lovelace)`. Sau đó, chúng ta có thể sử dụng `balance` để kiểm tra chúng ta có nhận được khoản thanh toán nào chưa.

<Tabs
  defaultValue="js"
  groupId="language"
  values={[
    {label: 'JavaScript', value: 'js'},
    {label: 'Typescript', value: 'ts'},
    {label: 'Python', value: 'py'},
    {label: 'C#', value: 'cs'}
  ]}>

  <TabItem value="js">

```csharp
// Please add this dependency using npm install node-fetch
import fetch from 'node-fetch';
const walletId = "101b3814d6977de4b58c9dedc67b87c63a4f36dd";
// The total payment we expect in lovelace unit
const totalExpectedLovelace = 1000000;
const resp = await fetch(`http://localhost:9998/v2/wallets/${walletId}`);
const wallet = await resp.json();
const balance = wallet.balance.total.quantity;
```

  </TabItem>

  <TabItem value="ts">

```ts
// Please add this dependency using npm install node-fetch and npm install @types/node-fetch
import fetch from 'node-fetch';
import { Response } from 'node-fetch';
const walletId: string = "101b3814d6977de4b58c9dedc67b87c63a4f36dd";
// The total payment we expect in lovelace unit
const totalExpectedLovelace = 1000000;
const resp: Response = await fetch(`http://localhost:9998/v2/wallets/${walletId}`);
const wallet: any = await resp.json();
const balance: number = wallet.balance.total.quantity;
```

  </TabItem>

  <TabItem value="py">

```py
# pip install requests
import requests
walletId = '101b3814d6977de4b58c9dedc67b87c63a4f36dd'
# The total payment we expect in lovelace unit
totalExpectedLovelace = 1000000;
r = requests.get('http://localhost:9998/v2/wallets/%s' % walletId)
wallet = r.json()
balance = wallet['balance']['total']['quantity']
```

  </TabItem>

  <TabItem value="cs">

```csharp
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;

using var http = new HttpClient() { BaseAddress = new Uri("http://localhost:9998/v2/") };
// Get Wallet Details / Balance
// Replace with your wallet Id
var walletId = "101b3814d6977de4b58c9dedc67b87c63a4f36dd";
// The total payment we expect in lovelace unit
var totalExpectedLovelace = 1000000;

var wallet = await http.GetFromJsonAsync<JsonElement>($"wallets/{walletId}");
var balance = wallet.GetProperty("balance").GetProperty("total").GetProperty("quantity").GetInt32();
```

  </TabItem>

</Tabs>

### Determine if payment is successful

Once we have the total lovelace amount, we will then determine using our code if a specific payment is a success, ultimately sending or shipping the item if it is indeed succesful. In our example, we expect that the payment is equal to `1,000,000 lovelace` that we defined in our `totalExpectedLovelace` constant.

Khi chúng ta có tổng số tiền như mong muốn, chúng ta sẽ quyết định gửi hàng theo đơn hàng. Trong ví dụ của chúng ta, chúng ta hi vọng một khoản thanh toán là `1,000,000 lovelace` thì chúng ta xác định trong hằng số`totalExpectedLovelace` .

<Tabs
  defaultValue="js"
  groupId="language"
  values={[
    {label: 'JavaScript', value: 'js'},
    {label: 'Typescript', value: 'ts'},
    {label: 'Python', value: 'py'},
    {label: 'C#', value: 'cs'}
  ]}>

  <TabItem value="js">

```js
// Check if payment is complete
const isPaymentComplete = balance >= totalExpectedLovelace;

console.log(`Total Received: ${balance} LOVELACE`);
console.log(`Expected Payment: ${totalExpectedLovelace} LOVELACE`);
console.log(`Payment Complete: ${(isPaymentComplete ? "✅":"❌")}`);
```

  </TabItem>

  <TabItem value="ts">

```ts
// Check if payment is complete
const isPaymentComplete: boolean = balance >= totalExpectedLovelace;

console.log(`Total Received: ${balance} LOVELACE`);
console.log(`Expected Payment: ${totalExpectedLovelace} LOVELACE`);
console.log(`Payment Complete: ${(isPaymentComplete ? "✅":"❌")}`);
```

  </TabItem>

  <TabItem value="py">

```py
# Check if payment is complete
isPaymentComplete = balance >= totalExpectedLovelace

print("Total Received: %s LOVELACE" % balance)
print("Expected Payment: %s LOVELACE" % totalExpectedLovelace)
print("Payment Complete: %s" % {True: "✅", False: "❌"} [isPaymentComplete])
```

  </TabItem>
  <TabItem value="cs">

```csharp
// Check if payment is complete
var isPaymentComplete = balance >= totalExpectedLovelace;

Console.WriteLine($"Total Received: {balance} LOVELACE");
Console.WriteLine($"Expected Payment: {totalExpectedLovelace} LOVELACE");
Console.WriteLine($"Payment Complete: {(isPaymentComplete ? "✅":"❌")}");
```

  </TabItem>
</Tabs>

## Running and testing

Our final code should look something like this:

Mã cuối cùng sẽ như sau:

<Tabs
  defaultValue="js"
  groupId="language"
  values={[
    {label: 'JavaScript', value: 'js'},
    {label: 'Typescript', value: 'ts'},
    {label: 'Python', value: 'py'},
    {label: 'C#', value: 'cs'}
  ]}>

  <TabItem value="js">

```js
// Please add this dependency using npm install node-fetch
import fetch from 'node-fetch';
const walletId = "101b3814d6977de4b58c9dedc67b87c63a4f36dd";
// The total payment we expect in lovelace unit
const totalExpectedLovelace = 1000000;
const resp = await fetch(`http://localhost:9998/v2/wallets/${walletId}`);
const wallet = await resp.json();
const balance = wallet.balance.total.quantity;

// Check if payment is complete
const isPaymentComplete = balance >= totalExpectedLovelace;

console.log(`Total Received: ${balance} LOVELACE`);
console.log(`Expected Payment: ${totalExpectedLovelace} LOVELACE`);
console.log(`Payment Complete: ${(isPaymentComplete ? "✅":"❌")}`);
```

  </TabItem>

  <TabItem value="ts">

```ts
// Please add this dependency using npm install node-fetch and npm install @types/node-fetch
import fetch from 'node-fetch';
import { Response } from 'node-fetch';
const walletId: string = "101b3814d6977de4b58c9dedc67b87c63a4f36dd";
const totalExpectedLovelace: number = 1000000;
const resp: Response = await fetch(`http://localhost:9998/v2/wallets/${walletId}`);
const wallet: any = await resp.json();
const balance: number = wallet.balance.total.quantity;

// Check if payment is complete
const isPaymentComplete: boolean = balance >= totalExpectedLovelace;

console.log(`Total Received: ${balance} LOVELACE`);
console.log(`Expected Payment: ${totalExpectedLovelace} LOVELACE`);
console.log(`Payment Complete: ${(isPaymentComplete ? "✅":"❌")}`);
```

  </TabItem>

  <TabItem value="py">

```py
# coding: utf-8
# pip install requests
import requests
walletId = '101b3814d6977de4b58c9dedc67b87c63a4f36dd'
r = requests.get('http://localhost:9998/v2/wallets/%s' % walletId)
wallet = r.json()
balance = wallet['balance']['total']['quantity']
totalExpectedLovelace = 1000000

# Check if payment is complete
isPaymentComplete = balance >= totalExpectedLovelace

print("Total Received: %s LOVELACE" % balance)
print("Expected Payment: %s LOVELACE" % totalExpectedLovelace)
print("Payment Complete: %s" % {True: "✅", False: "❌"} [isPaymentComplete])
```

  </TabItem>
  <TabItem value="cs">

```csharp
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;

using var http = new HttpClient() { BaseAddress = new Uri("http://localhost:9998/v2/") };
// Get Wallet Details / Balance
// Replace with your wallet Id
var walletId = "101b3814d6977de4b58c9dedc67b87c63a4f36dd";
// The total payment we expect in lovelace unit
var totalExpectedLovelace = 1000000;

var wallet = await http.GetFromJsonAsync<JsonElement>($"wallets/{walletId}");
var balance = wallet.GetProperty("balance").GetProperty("total").GetProperty("quantity").GetInt32();

// Check if payment is complete
var isPaymentComplete = balance >= totalExpectedLovelace;

Console.WriteLine($"Total Received: {balance} LOVELACE");
Console.WriteLine($"Expected Payment: {totalExpectedLovelace} LOVELACE");
Console.WriteLine($"Payment Complete: {(isPaymentComplete ? "✅":"❌")}");
```

  </TabItem>
</Tabs>

Now we are ready to test 🚀, running the code should give us the following result:

Bây giờ, chúng ta sẵn sàng để kiểm tra, việc chạy mã sẽ cho chúng ta kết quả sau:

<Tabs
  defaultValue="js"
  groupId="language"
  values={[
    {label: 'JavaScript', value: 'js'},
    {label: 'Typescript', value: 'ts'},
    {label: 'Python', value: 'py'},
    {label: 'C#', value: 'cs'}
  ]}>
  <TabItem value="js">

```bash
❯ node checkPayment.js
Total Received: 0 LOVELACE
Expected Payment: 1000000 LOVELACE
Payment Complete: ❌
```

  </TabItem>
  <TabItem value="ts">

```bash
❯ ts-node checkPayment.ts
Total Received: 0 LOVELACE
Expected Payment: 1000000 LOVELACE
Payment Complete: ❌
```

  </TabItem>
  <TabItem value="cs">

```bash
❯ dotnet run
Total Received: 0 LOVELACE
Expected Payment: 1000000 LOVELACE
Payment Complete: ❌
```

  </TabItem>
  <TabItem value="py">

```bash
❯ python checkPayment.py 
Total Received: 0 LOVELACE
Expected Payment: 1000000 LOVELACE
Payment Complete: ❌
```

  </TabItem>
</Tabs>

The code is telling us that our current wallet has received a total of `0 lovelace` and it expected `1,000,000 lovelace`, therefore it concluded that the payment is not complete.

Mã cho chúng ta biết ví hiện tại nhận được tổng `0 lovelace` và dự kiến là `1,000,000 lovelace`, do đó việc thanh toán không hoàn thành.

## Complete the payment

What we can do to simulate a succesful payment is to send atleast `1,000,000 lovelace` into the **wallet address** that we have just generated for this project. We show how you can get the **wallet address** via code in the examples above.

Chúng ta có thể mô phỏng một khoản thanh toán thành công là gửi ít nhất 
`1,000,000 lovelace` vào ** địa chỉ ví ** mà chúng ta vừa tạo cho dự án này. Chúng ta đã chỉ ra cách có thể lấy ** địa chỉ ví ** thông qua mã trong ví dụ trên.


Now simply send atleast `1,000,000 lovelace` to this **wallet address** or request some `test ada` funds from the [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet). Once complete, we can now run the code again and we should see a succesful result this time.

Bây giờ gửi ít nhất `1,000,000 lovelace` tới **địa chỉ ví này** hoặc yêu cầu tiền`test ada` từ [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet). Sau khi hoàn thành, chúng ta có thể chạy lại mã và sẽ thấy kết quả thành công.

<Tabs
  defaultValue="js"
  groupId="language"
  values={[
    {label: 'JavaScript', value: 'js'},
    {label: 'Typescript', value: 'ts'},
    {label: 'Python', value: 'py'},
    {label: 'C#', value: 'cs'}
  ]}>
  <TabItem value="js">

```bash
❯ node checkPayment.js
Total Received: 1000000000 LOVELACE
Expected Payment: 1000000 LOVELACE
Payment Complete: ✅
```

  </TabItem>
  <TabItem value="ts">

```bash
❯ ts-node checkPayment.ts
Total Received: 1000000000 LOVELACE
Expected Payment: 1000000 LOVELACE
Payment Complete: ✅
```

  </TabItem>
  <TabItem value="cs">

```bash
❯ dotnet run
Total Received: 1000000000 LOVELACE
Expected Payment: 1000000 LOVELACE
Payment Complete: ✅
```

  </TabItem>
  <TabItem value="py">

```bash
❯ python checkPayment.py 
Total Received: 1000000000 LOVELACE
Expected Payment: 1000000 LOVELACE
Payment Complete: ✅
```

  </TabItem>
</Tabs>

:::note
It might take 20 seconds or more for the transaction to propagate within the network depending on the network health, so you will have to be patient.
:::

Có thể mất 20 giây hoặc hơn để giao dịch chuyển lên mạng phụ thuộc vào tình trạng mạng, vì vậy bạn sẽ phải kiên nhẫn.

Congratulations, you are now able to detect succesful **Cardano** payments programatically. This should help you bring integrations to your existing or new upcoming applications. 🎉🎉🎉

Xin chúc mừng, bây giờ bạn có thể thấy việc thanh toán **Cardano** thành công theo chương trình. Điều này sẽ giúp bạn tích hợp các ứng dụng hiện có hoặc ứng dụng mới sắp ra mắt.