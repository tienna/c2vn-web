---
id: listening-for-payments-cli
title: Listening for ada payments using cardano-cli
sidebar_label: Receiving payments (cardano-cli)
description: How to listen for ada Payments with the cardano-cli.
image: ./img/og-developer-portal.png
--- 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

:::note
Hướng dẫn này giả định rằng bạn có hiểu biết cơ bản về `cardano-cli`, cách sử dụng nó và bạn đã cài đặt nó vào hệ thống của mình. Nếu không, chúng tôi khuyên bạn nên đọc hướng dẫn [Installing cardano-node](/docs/get-started/installing-cardano-node), [Running cardano-node](/docs/get-started/running-cardano) và [Exploring Cardano Wallets](/docs/integrate-cardano/creating-wallet-faucet) trước tiên.
Hướng dẫn này cũng giả định rằng bạn có `cardano-node` chạy trên nền tảng và nối với mạng `testnet` .
:::

## Cách sử dụng

Có nhiều lý do có thể khiến bạn muốn có chức năng lắng nghe các khoản thanh toán `ada` , nhưng một trường hợp sử dụng rất rõ ràng sẽ là đối với một thứ gì đó như **cửa hàng trực tuyến** hoặc **cổng thanh toán** có thể sử dụng token`ada` như một tiền tệ.

![img](../../static/img/integrate-cardano/ada-online-shop.png)

## Biểu đồ kỹ thuật

Để hiểu cách một thứ như thế này có thể hoạt động theo quan điểm kỹ thuật, chúng ta hãy xem sơ đồ sau:



![img](../../static/img/integrate-cardano/ada-payment-flow.png)


Vì vậy, hãy tưởng tượng một tình huống rất cơ bản khi một **khách hàng** đang lướt qua một cửa hàng trực tuyến. Khi khách hàng đã chọn và thêm tất cả các mặt hàng vào **giỏ hàng** . Bước tiếp theo sẽ là kiểm tra và thanh toán các mặt hàng, Tất nhiên chúng tôi sẽ sử dụng **Cardano** cho việc đó!


Ứng dụng **front-end** sau đó sẽ yêu cầu **địa chỉ ví** từ dịch vụ **back end** và hiển thị mã QR cho **khách hàng** để được quét qua **ví Cardano**. Sau đó, dịch vụ **back end** sẽ biết rằng nó phải truy vấn địa chỉ ví bằng cách dùng `cardano-cli` trong một khoảng thời gian nhất định để xác nhận và thông báo cho ứng dụng **front-end** rằng thanh toán đã hoàn tất thành công.


Trong khi đó, giao dịch sẽ được xử lý và thanh toán trong mạng **Cardano**. Chúng ta có thể thấy trong sơ đồ trên rằng cuối cùng cả hai bên đều được kết nối với mạng thông qua thành phần phần mềm`cardano-node`.

## Bước code

Bây giờ chúng ta có thể bắt tay vào triển khai mã thực tế.

:::Ghi chú

Trong phần này, Chúng tôi sẽ sử dụng đường dẫn `$HOME/receive-ada-sample` để lưu trữ tất cả các tập tin liên quan làm ví dụ, hãy thay thế nó bằng thư mục bạn đã chọn để lưu trữ các tập tin. Tất cả các ví dụ mã trong bài viết này giả định rằng bạn sẽ lưu tất cả các tệp mã nguồn dưới thư mục gốc với đường dẫn trên.
:::
### Tạo keys và yêu cầu tAda


Đầu tiên, chúng ta tạo một đường dẫn để lưu trữ dự án của chúng ta:

```bash
mkdir -p $HOME/receive-ada-sample/keys
```


Tiếp theo, chúng ta tạo **một cặp key thanh toán ** sử dụng`cardano-cli`:


```bash
cardano-cli address key-gen \
--verification-key-file $HOME/receive-ada-sample/keys/payment.vkey \
--signing-key-file $HOME/receive-ada-sample/keys/payment.skey
```

Khi chúng ta có **cặp key thanh toán**, bước tiếp theo là tạo  **địa chỉ ví** cho mạng `testnet` như sau:


```bash
cardano-cli address build \
--payment-verification-key-file $HOME/receive-ada-sample/keys/payment.vkey \
--out-file $HOME/receive-ada-sample/keys/payment.addr \
--testnet-magic 1097911063
```


Cấu trúc đường dẫn trông giống như thế này:

```bash
$HOME/receive-ada-sample/receive-ada-sample
└── keys
    ├── payment.addr
    ├── payment.skey
    └── payment.vkey
```


Bây giờ sử dụng** ngôn ngữ lập trình** của bạn để tạo ra các  dòng code đầu tiên!

### Các biến ban đầu

Trước hết chúng ta sẽ cài đặt các biến ban đầu mà chúng ta sẽ sử dụng như mô tả dưới đây:

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

```js title="checkPayment.js"
import * as fs from 'fs';
// Please add this dependency using npm install node-cmd
import cmd from 'node-cmd';

// Path to the cardano-cli binary or use the global one
const CARDANO_CLI_PATH = "cardano-cli";
// The `testnet` identifier number
const CARDANO_NETWORK_MAGIC = 1097911063;
// The directory where we store our payment keys
// assuming our current directory context is $HOME/receive-ada-sample
const CARDANO_KEYS_DIR = "keys";
// The total payment we expect in lovelace unit
const TOTAL_EXPECTED_LOVELACE = 1000000;
```

  </TabItem>
  <TabItem value="ts">

```ts title="checkPayment.ts"
import * as fs from 'fs';
// Please add this dependency using npm install node-cmd but there is no @type definition for it
const cmd: any = require('node-cmd');

// Path to the cardano-cli binary or use the global one
const CARDANO_CLI_PATH: string = "cardano-cli";
// The `testnet` identifier number
const CARDANO_NETWORK_MAGIC: number = 1097911063;
// The directory where we store our payment keys
// assuming our current directory context is $HOME/receive-ada-sample/receive-ada-sample
const CARDANO_KEYS_DIR: string = "keys";
// The total payment we expect in lovelace unit
const TOTAL_EXPECTED_LOVELACE: number = 1000000;
```

  </TabItem>
  <TabItem value="py">

```python title="checkPayment.py"
import os
import subprocess

# Path to the cardano-cli binary or use the global one
CARDANO_CLI_PATH = "cardano-cli"
# The `testnet` identifier number
CARDANO_NETWORK_MAGIC = 1097911063
# The directory where we store our payment keys
# assuming our current directory context is $HOME/receive-ada-sample
CARDANO_KEYS_DIR = "keys"
# The total payment we expect in lovelace unit
TOTAL_EXPECTED_LOVELACE = 1000000
```

  </TabItem>
  <TabItem value="cs">

```csharp title="Program.cs"
using System.Linq;
using SimpleExec; // `dotnet add package SimpleExec --version 7.0.0`

// Path to the cardano-cli binary or use the global one
const string CARDANO_CLI_PATH = "cardano-cli";
// The `testnet` identifier number
const int CARDANO_NETWORK_MAGIC = 1097911063;
// The directory where we store our payment keys
// assuming our current directory context is $HOME/user/receive-ada-sample
const string CARDANO_KEYS_DIR = "keys";
// The total payment we expect in lovelace unit
const long TOTAL_EXPECTED_LOVELACE = 1000000;
```

  </TabItem>
</Tabs>

### Đọc địa chỉ ví


Tiếp theo, chúng ta nhận giá trị chuỗi của ** địa chỉ ví** từ `payment.addr` mà chúng ta đã tạo ở trên. Thêm vào các dòng dưới đây vào mã của bạn:

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

```js title="checkPayment.js"
// Read wallet address value from payment.addr file
const walletAddress = fs.readFileSync(`${CARDANO_KEYS_DIR}/payment.addr`).toString();
```

  </TabItem>
  <TabItem value="ts">

```ts title="checkPayment.ts"
// Read wallet address string value from payment.addr file
const walletAddress: string = fs.readFileSync(`${CARDANO_KEYS_DIR}/payment.addr`).toString();
```

  </TabItem>
  <TabItem value="py">

```python title="checkPayment.py"
# Read wallet address value from payment.addr file
with open(os.path.join(CARDANO_KEYS_DIR, "payment.addr"), 'r') as file:
    walletAddress = file.read()
```

  </TabItem>
  <TabItem value="cs">

```csharp title="Program.cs"
// Read wallet address value from payment.addr file
var walletAddress = await System.IO.File.ReadAllTextAsync($"{CARDANO_KEYS_DIR}/payment1.addr");
```

  </TabItem>
</Tabs>

### Truy vấn UTxO

Sau đó thực hiện `cardano-cli` và truy vấn **UTxO** cho **địa chỉ ví** cái mà chúng ta đã tạo với key và lưu kết quả`stdout` với biến `rawUtxoTable`.
 
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

```js title="checkPayment.js"
// We use the node-cmd npm library to execute shell commands and read the output data
const rawUtxoTable = cmd.runSync([
    CARDANO_CLI_PATH,
    "query", "utxo",
    "--testnet-magic", CARDANO_NETWORK_MAGIC,
    "--address", walletAddress
].join(" "));
```

  </TabItem>
  <TabItem value="ts">

```ts title="checkPayment.ts"
// We use the node-cmd npm library to execute shell commands and read the output data
const rawUtxoTable: any = cmd.runSync([
    CARDANO_CLI_PATH,
    "query", "utxo",
    "--testnet-magic", CARDANO_NETWORK_MAGIC,
    "--address", walletAddress
].join(" "));
```

  </TabItem>
  <TabItem value="py">

```python title="checkPayment.py"
# We tell python to execute cardano-cli shell command to query the UTXO and read the output data
rawUtxoTable = subprocess.check_output([
    CARDANO_CLI_PATH,
    'query', 'utxo',
    '--testnet-magic', str(CARDANO_NETWORK_MAGIC),
    '--address', walletAddress])
```

  </TabItem>
  <TabItem value="cs">

```csharp title="Program.cs"
// We use the SimpleExec dotnet library to execute shell commands and read the output data
var rawUtxoTable = await Command.ReadAsync(CARDANO_CLI_PATH, string.Join(" ",
    "query", "utxo",
    "--testnet-magic", CARDANO_NETWORK_MAGIC,
    "--address", walletAddress
), noEcho: true);
```

  </TabItem>
</Tabs>

### Xử lý bảng UTxO 

Một lần nữa, Chúng ta truy cập bảng **UTXO**, sau đó chúng ta sẽ phân tích và tính toán tổng lovelace có trong ví.

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

```js title="checkPayment.js"
// Calculate total lovelace of the UTXO(s) inside the wallet address
const utxoTableRows = rawUtxoTable.data.trim().split('\n');
let totalLovelaceRecv = 0;
let isPaymentComplete = false;

for (let x = 2; x < utxoTableRows.length; x++) {
    const cells = utxoTableRows[x].split(" ").filter(i => i);
    totalLovelaceRecv += parseInt(cells[2]);
}
```

  </TabItem>
  <TabItem value="ts">

```ts title="checkPayment.ts"
// Calculate total lovelace of the UTXO(s) inside the wallet address
const utxoTableRows: string[] = rawUtxoTable.data.trim().split('\n');
let totalLovelaceRecv: number = 0;
let isPaymentComplete: boolean = false;

for (let x = 2; x < utxoTableRows.length; x++) {
    const cells = utxoTableRows[x].split(" ").filter((i: string) => i);
    totalLovelaceRecv += parseInt(cells[2]);
}
```

  </TabItem>
  <TabItem value="py">

```python title="checkPayment.py"
# Calculate total lovelace of the UTXO(s) inside the wallet address
utxoTableRows = rawUtxoTable.strip().splitlines()
totalLovelaceRecv = 0
isPaymentComplete = False

for x in range(2, len(utxoTableRows)):
    cells = utxoTableRows[x].split()
    totalLovelaceRecv +=  int(cells[2])
```

  </TabItem>
  <TabItem value="cs">

```csharp title="Program.cs"
// Calculate total lovelace of the UTXO(s) inside the wallet address
var utxoTableRows = rawUtxoTable.Trim().Split("\n");
var totalLovelaceRecv = 0L;
var isPaymentComplete = false;

foreach(var row in utxoTableRows.Skip(2)){
    var cells = row.Split(" ").Where(c => c.Trim() != string.Empty);
    totalLovelaceRecv +=  long.Parse(cells.ElementAt(2));
}
```

  </TabItem>
</Tabs>

### Quyết định nếu thanh toán thành công

Once we have the total lovelace amount, we will then determine using our code if a specific payment is a success, ultimately sending or shipping the item if it is indeed succesful. In our example, we expect that the payment is equal to `1,000,000 lovelace` that we defined in our `TOTAL_EXPECTED_LOVELACE` constant variable.
Khi chúng ta có tổng lovelace, chúng ta sẽ quyết định sử dụng mã của chúng ta nếu thanh toán này thành công, cuối cùng thì gửi hoặc chuyển mặt hàng nếu thực sự thành công. Trong ví dụ của chúng ta, chúng ta mong đợi rằng việc thanh toán bằng `1,000,000 lovelace` cái mà đã được định nghĩa trong biến `TOTAL_EXPECTED_LOVELACE` không đổi.

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

```js title="checkPayment.js"
// Determine if the total lovelace received is more than or equal to
// the total expected lovelace and displaying the results.
isPaymentComplete = totalLovelaceRecv >= TOTAL_EXPECTED_LOVELACE;

console.log(`Total Received: ${totalLovelaceRecv} LOVELACE`);
console.log(`Expected Payment: ${TOTAL_EXPECTED_LOVELACE} LOVELACE`);
console.log(`Payment Complete: ${(isPaymentComplete ? "✅" : "❌")}`);
```

  </TabItem>
  <TabItem value="ts">

```ts title="checkPayment.ts"
// Determine if the total lovelace received is more than or equal to
// the total expected lovelace and displaying the results.
isPaymentComplete = totalLovelaceRecv >= TOTAL_EXPECTED_LOVELACE;

console.log(`Total Received: ${totalLovelaceRecv} LOVELACE`);
console.log(`Expected Payment: ${TOTAL_EXPECTED_LOVELACE} LOVELACE`);
console.log(`Payment Complete: ${(isPaymentComplete ? "✅" : "❌")}`);
```

  </TabItem>
  <TabItem value="py">

```python title="checkPayment.py"
# Determine if the total lovelace received is more than or equal to
# the total expected lovelace and displaying the results.
isPaymentComplete = totalLovelaceRecv >= TOTAL_EXPECTED_LOVELACE

print("Total Received: %s LOVELACE" % totalLovelaceRecv)
print("Expected Payment: %s LOVELACE" % TOTAL_EXPECTED_LOVELACE)
print("Payment Complete: %s" % {True: "✅", False: "❌"} [isPaymentComplete])
```

  </TabItem>
  <TabItem value="cs">

```csharp title="Program.cs"
// Determine if the total lovelace received is more than or equal to
// the total expected lovelace and displaying the results.
isPaymentComplete = totalLovelaceRecv >= TOTAL_EXPECTED_LOVELACE;

System.Console.WriteLine($"Total Received: {totalLovelaceRecv} LOVELACE");
System.Console.WriteLine($"Expected Payment: {TOTAL_EXPECTED_LOVELACE} LOVELACE");
System.Console.WriteLine($"Payment Complete: {(isPaymentComplete ? "✅":"❌")}");
```

  </TabItem>
</Tabs>

## Chạy và thử nghiệm

Mã cuối cùng của chúng tôi sẽ trông giống như sau:

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

```js title="checkPayment.js"
import * as fs from 'fs';
// Please add this dependency using npm install node-cmd
import cmd from 'node-cmd';

// Path to the cardano-cli binary or use the global one
const CARDANO_CLI_PATH = "cardano-cli";
// The `testnet` identifier number
const CARDANO_NETWORK_MAGIC = 1097911063;
// The directory where we store our payment keys
// assuming our current directory context is $HOME/receive-ada-sample/receive-ada-sample
const CARDANO_KEYS_DIR = "keys";
// The imaginary total payment we expect in lovelace unit
const TOTAL_EXPECTED_LOVELACE = 1000000;

// Read wallet address string value from payment.addr file
const walletAddress = fs.readFileSync(`${CARDANO_KEYS_DIR}/payment.addr`).toString();

// We use the node-cmd npm library to execute shell commands and read the output data
const rawUtxoTable = cmd.runSync([
    CARDANO_CLI_PATH,
    "query", "utxo",
    "--testnet-magic", CARDANO_NETWORK_MAGIC,
    "--address", walletAddress
].join(" "));

// Calculate total lovelace of the UTXO(s) inside the wallet address
const utxoTableRows = rawUtxoTable.data.trim().split('\n');
let totalLovelaceRecv = 0;
let isPaymentComplete = false;

for(let x = 2; x < utxoTableRows.length; x++) {
    const cells = utxoTableRows[x].split(" ").filter(i => i);
    totalLovelaceRecv += parseInt(cells[2]);
}

// Determine if the total lovelace received is more than or equal to
// the total expected lovelace and displaying the results.
isPaymentComplete = totalLovelaceRecv >= TOTAL_EXPECTED_LOVELACE;

console.log(`Total Received: ${totalLovelaceRecv} LOVELACE`);
console.log(`Expected Payment: ${TOTAL_EXPECTED_LOVELACE} LOVELACE`);
console.log(`Payment Complete: ${(isPaymentComplete ? "✅" : "❌")}`);
```

  </TabItem>
  <TabItem value="ts">

```ts title="checkPayment.ts"
import * as fs from 'fs';
// Please add this dependency using npm install node-cmd but there is no @type definition for it
const cmd: any = require('node-cmd');

// Path to the cardano-cli binary or use the global one
const CARDANO_CLI_PATH: string = "cardano-cli";
// The `testnet` identifier number
const CARDANO_NETWORK_MAGIC: number = 1097911063;
// The directory where we store our payment keys
// assuming our current directory context is $HOME/receive-ada-sample/receive-ada-sample
const CARDANO_KEYS_DIR: string = "keys";
// The imaginary total payment we expect in lovelace unit
const TOTAL_EXPECTED_LOVELACE: number = 1000000;

// Read wallet address string value from payment.addr file
const walletAddress: string = fs.readFileSync(`${CARDANO_KEYS_DIR}/payment.addr`).toString();

// We use the node-cmd npm library to execute shell commands and read the output data
const rawUtxoTable: any = cmd.runSync([
    CARDANO_CLI_PATH,
    "query", "utxo",
    "--testnet-magic", CARDANO_NETWORK_MAGIC,
    "--address", walletAddress
].join(" "));

// Calculate total lovelace of the UTXO(s) inside the wallet address
const utxoTableRows: string[] = rawUtxoTable.data.trim().split('\n');
let totalLovelaceRecv: number = 0;
let isPaymentComplete: boolean = false;

for (let x = 2; x < utxoTableRows.length; x++) {
    const cells = utxoTableRows[x].split(" ").filter((i: string) => i);
    totalLovelaceRecv += parseInt(cells[2]);
}

// Determine if the total lovelace received is more than or equal to
// the total expected lovelace and displaying the results.
isPaymentComplete = totalLovelaceRecv >= TOTAL_EXPECTED_LOVELACE;

console.log(`Total Received: ${totalLovelaceRecv} LOVELACE`);
console.log(`Expected Payment: ${TOTAL_EXPECTED_LOVELACE} LOVELACE`);
console.log(`Payment Complete: ${(isPaymentComplete ? "✅" : "❌")}`);
```

  </TabItem>
  <TabItem value="cs">

```csharp title="Program.cs"
using System;
using System.IO;
using System.Linq;

// Install using command `dotnet add package SimpleExec --version 7.0.0`
using SimpleExec;

// Path to the cardano-cli binary or use the global one
const string CARDANO_CLI_PATH = "cardano-cli";
// The `testnet` identifier number
const int CARDANO_NETWORK_MAGIC = 1097911063;
// The directory where we store our payment keys
// assuming our current directory context is $HOME/receive-ada-sample
const string CARDANO_KEYS_DIR = "keys";
// The total payment we expect in lovelace unit
const long TOTAL_EXPECTED_LOVELACE = 1000000;

// Read wallet address string value from payment.addr file
var walletAddress = await File.ReadAllTextAsync(Path.Combine(CARDANO_KEYS_DIR, "payment.addr"));

// We use the SimpleExec library to execute cardano-cli shell command to query the wallet UTXO and read the output data
var rawUtxoTable = await Command.ReadAsync(CARDANO_CLI_PATH, string.Join(" ",
    "query", "utxo",
    "--testnet-magic", CARDANO_NETWORK_MAGIC,
    "--address", walletAddress
), noEcho: true);

// Calculate total lovelace of the UTXO(s) inside the wallet address
var utxoTableRows = rawUtxoTable.Trim().Split("\n");
var totalLovelaceRecv = 0L;
var isPaymentComplete = false;

foreach(var row in utxoTableRows.Skip(2)){
    var cells = row.Split(" ").Where(c => c.Trim() != string.Empty);
    totalLovelaceRecv +=  long.Parse(cells.ElementAt(2));
}

// Determine if the total lovelace received is more than or equal to
// the total expected lovelace and displaying the results.
isPaymentComplete = totalLovelaceRecv >= TOTAL_EXPECTED_LOVELACE;

Console.WriteLine($"Total Received: {totalLovelaceRecv} LOVELACE");
Console.WriteLine($"Expected Payment: {TOTAL_EXPECTED_LOVELACE} LOVELACE");
Console.WriteLine($"Payment Complete: {(isPaymentComplete ? "✅":"❌")}");
```

  </TabItem>
  <TabItem value="py">

```python title="checkPayment.py"
import os
import subprocess

# Path to the cardano-cli binary or use the global one
CARDANO_CLI_PATH = "cardano-cli"
# The `testnet` identifier number
CARDANO_NETWORK_MAGIC = 1097911063
# The directory where we store our payment keys
# assuming our current directory context is $HOME/receive-ada-sample
CARDANO_KEYS_DIR = "keys"
# The total payment we expect in lovelace unit
TOTAL_EXPECTED_LOVELACE = 1000000

# Read wallet address value from payment.addr file
with open(os.path.join(CARDANO_KEYS_DIR, "payment.addr"), 'r') as file:
    walletAddress = file.read()

# We tell python to execute cardano-cli shell command to query the UTXO and read the output data
rawUtxoTable = subprocess.check_output([
    CARDANO_CLI_PATH,
    'query', 'utxo',
    '--testnet-magic', str(CARDANO_NETWORK_MAGIC),
    '--address', walletAddress])

# Calculate total lovelace of the UTXO(s) inside the wallet address
utxoTableRows = rawUtxoTable.strip().splitlines()
totalLovelaceRecv = 0
isPaymentComplete = False

for x in range(2, len(utxoTableRows)):
    cells = utxoTableRows[x].split()
    totalLovelaceRecv +=  int(cells[2])

# Determine if the total lovelace received is more than or equal to
# the total expected lovelace and displaying the results.
isPaymentComplete = totalLovelaceRecv >= TOTAL_EXPECTED_LOVELACE

print("Total Received: %s LOVELACE" % totalLovelaceRecv)
print("Expected Payment: %s LOVELACE" % TOTAL_EXPECTED_LOVELACE)
print("Payment Complete: %s" % {True: "✅", False: "❌"} [isPaymentComplete])
```

  </TabItem>
</Tabs>

Cây thư mục dự án của bạn sẽ trông giống như sau:

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
# Excluding node_modules directory

$HOME/receive-ada-sample/receive-ada-sample
├── checkPayment.js
├── keys
│   ├── payment.addr
│   ├── payment.skey
│   └── payment.vkey
├── package-lock.json
└── package.json

1 directories, 6 files
```

  </TabItem>
  <TabItem value="ts">

```bash
# Excluding node_modules directory

$HOME/receive-ada-sample/receive-ada-sample
├── checkPayment.ts
├── keys
│   ├── payment.addr
│   ├── payment.skey
│   └── payment.vkey
├── package-lock.json
└── package.json

1 directories, 6 files
```

  </TabItem>
  <TabItem value="cs">

```bash
# Excluding bin and obj directories

$HOME/receive-ada-sample/receive-ada-sample
├── Program.cs
├── dotnet.csproj
├── keys
│   ├── payment.addr
│   ├── payment.skey
│   └── payment.vkey

1 directories, 5 files
```

  </TabItem>
  <TabItem value="py">

```bash
$HOME/receive-ada-sample/receive-ada-sample
├── checkPayment.py
└── keys
    ├── payment.addr
    ├── payment.skey
    └── payment.vkey

1 directory, 4 files
```

  </TabItem>
</Tabs>

Bây giờ chúng tôi đã sẵn sàng để kiểm tra 🚀, việc chạy mã sẽ cho chúng tôi kết quả sau:

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

Mã cho chúng tôi biết rằng ví hiện tại của chúng tôi đã nhận được tổng số `0 lovelace` và dự kiến `1,000,000 lovelace`, do đó, kết luận rằng thanh toán chưa hoàn tất.

## Hoàn thành thanh toán

Những gì chúng tôi có thể làm để mô phỏng một khoản thanh toán thành công là gửi ít nhất `1,000,000 lovelace` vào địa chỉ ví mà chúng tôi vừa tạo cho dự án này. Chúng ta có thể lấy địa chỉ ví bằng cách đọc nội dung của `payment.addr` như sau:


```bash
cat $HOME/receive-ada-sample/receive-ada-sample/keys/payment.addr
```

Bạn sẽ thấy **Địa chỉ vís** :

```bash
addr_test1vpfkp665a6wn7nxvjql5vdn5g5a94tc22njf4lf98afk6tgnz5ge4
```

Bây giờ chỉ cần gửi ít nhất `1,000,000 lovelace` tới **địa chỉ ví** hoặc yêu cầu một số `tADA` từ [Cardano Testnet Faucet](../integrate-cardano/testnet-faucet). Sau khi hoàn tất, bây giờ chúng ta có thể chạy lại mã và chúng ta sẽ thấy kết quả thành công lần này.

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

```py
❯ python checkPayment.py 
Total Received: 1000000000 LOVELACE
Expected Payment: 1000000 LOVELACE
Payment Complete: ✅
```

  </TabItem>
</Tabs>

:::Ghi chú

Có thể mất 20 giây hoặc hơn để giao dịch lan truyền trong mạng tùy thuộc vào tình trạng mạng, vì vậy bạn sẽ phải kiên nhẫn

:::

Xin chúc mừng, bạn hiện có thể phát hiện các khoản thanh toán Cardano thành công theo chương trình này. Điều này sẽ giúp bạn tích hợp các ứng dụng hiện có hoặc ứng dụng mới sắp ra mắt của bạn. 🎉🎉🎉
