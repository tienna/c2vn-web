---
id: cardanosharp-wallet
title: Bắt đầu với CardanoSharp Wallet
sidebar_label: CardanoSharp Wallet
description: Bắt đầu với CardanoSharp Wallet
#image: ./img/og-developer-portal.png
--- 

# CardanoSharp.Wallet 
[![Build status](https://ci.appveyor.com/api/projects/status/knh87k86mf7gbxyo?svg=true)](https://ci.appveyor.com/project/nothingalike/cardanosharp-wallet/branch/main) [![Test status](https://img.shields.io/appveyor/tests/nothingalike/cardanosharp-wallet)](https://ci.appveyor.com/project/nothingalike/cardanosharp-wallet/branch/main) [![NuGet Version](https://img.shields.io/nuget/v/CardanoSharp.Wallet.svg?style=flat)](https://www.nuget.org/packages/CardanoSharp.Wallet/) ![NuGet Downloads](https://img.shields.io/nuget/dt/CardanoSharp.Wallet.svg)


CardanoSharp Wallet là một thư viện .NET để tạo/quản lý ví và xây dựng/ký giao dịch.

## Bắt đầu


CardanoSharp.Wallet được cài đặt từ NuGet.
```sh
Install-Package CardanoSharp.Wallet
```

## Tạo Mnemonics

`MnemonicService` có hoạt động giúp *tạo* và *khôi phục* thuật nhớ (Mnemonics). Nó 
được xây dựng để sử dụng trong các vùng chứa DI (tức là giao diện`IMnemonicService`). 

```cs
IMnemonicService service = new MnemonicService();
```

### Generate Mnemonic

```cs
IMnemonicService service = new MnemonicService();
Mnemonic rememberMe = service.Generate(24, WordLists.English);
System.Console.WriteLine(rememberMe.Words);
```

### Khôi phục Mnemonic

```cs
string words = "art forum devote street sure rather head chuckle guard poverty release quote oak craft enemy";
Mnemonic mnemonic = MnemonicService.Restore(words);
```

## Tạo Private và Public Keys


Sử dụng các tiện ích mở rộng mạnh mẽ để tạo và lấy khóa.
```cs
// The rootKey is a PrivateKey made of up of the 
//  - byte[] Key
//  - byte[] Chaincode
PrivateKey rootKey = mnemonic.GetRootKey();

// This path will give us our Payment Key on index 0
string paymentPath = $"m/1852'/1815'/0'/0/0";
// The paymentPrv is Private Key of the specified path.
PrivateKey paymentPrv = rootKey.Derive(paymentPath);
// Get the Public Key from the Private Key
PublicKey paymentPub = paymentPrv.GetPublicKey(false);

// This path will give us our Stake Key on index 0
string stakePath = $"m/1852'/1815'/0'/2/0";
// The stakePrv is Private Key of the specified path
PrivateKey stakePrv = rootKey.Derive(stakePath);
// Get the Public Key from the Stake Private Key
PublicKey stakePub = stakePrv.GetPublicKey(false);
```

 > Nếu bạn muốn tìm hiểu thêm về các đường dẫn chính, hãy đọc bài viết này [About Address Derivation](https://github.com/input-output-hk/technical-docs/blob/main/cardano-components/cardano-wallet/doc/About-Address-Derivation.md)

## Tạo điacj chỉ (Addresses)

`AddressService` cho phép bạn tạo các địa chỉ từ khóa. Nó được xây dựng để sử dụng trong các vùng chứa DI (tức là giao diện`IAddressService`)


```cs
IAddressService addressService = new AddressService();
```

Từ các khóa công khai mà chúng ta đã tạo ở trên, bây giờ chúng ta có thể lấy địa chỉ công khai.

```csharp
// add using
using CardanoSharp.Wallet.Models.Addresses;

// Creating Addresses require the Public Payment and Stake Keys
Address baseAddr = addressService.GetAddress(
    paymentPub, 
    stakePub, 
    NetworkType.Testnet, 
    AddressType.Base);
```

Nếu bạn đã có một địa chỉ.

```cs
Address baseAddr = new Address("addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj83ws8lhrn648jjxtwq2ytjqp");
```

## Khởi tạo Key

Một API chính xác giúp điều hướng các đường dẫn xuất.

```cs
// Add using
using CardanoSharp.Wallet.Extensions.Models;

// Restore a Mnemonic
var mnemonic = new MnemonicService().Restore(words);

// Fluent derivation API
var derivation = mnemonic
    .GetMasterNode("password")      // IMasterNodeDerivation
    .Derive(PurposeType.Shelley)    // IPurposeNodeDerivation
    .Derive(CoinType.Ada)           // ICoinNodeDerivation
    .Derive(0)                      // IAccountNodeDerivation
    .Derive(RoleType.ExternalChain) // IRoleNodeDerivation
    //or .Derive(RoleType.Staking) 
    .Derive(0);                     // IIndexNodeDerivation

PrivateKey privateKey = derivation.PrivateKey;
PublicKey publicKey = derivation.PublicKey;
```

## Build và Sign giao dịch


CardanoSharp.Wallet yêu cầu đầu vào từ chuỗi để tạo giao dịch. Giả sử chúng tôi đã thu thập thông tin sau đây.

```cs
uint currentSlot = 40000000;
ulong minFeeA = 44;
ulong minFeeB = 155381;
string inputTx = "0000000000000000000000000000000000000000000000000000000000000000";
```

Cho phép lấy một vài khóa để sử dụng trong khi xây dựng các giao dịch.

```cs
// Derive down to our Account Node
var accountNode = rootKey.Derive()
    .Derive(PurposeType.Shelley)
    .Derive(CoinType.Ada)
    .Derive(0);

// Derive our Change Node on Index 0
var changeNode = accountNode
    .Derive(RoleType.InternalChain) 
    .Derive(0);

// Derive our Staking Node on Index 0
var stakingNode = accountNode
    .Derive(RoleType.Staking) 
    .Derive(0);

// Deriving our Payment Node
//  note: We did not derive down to the index.
var paymentNode = accountNode
    .Derive(RoleType.ExternalChain);
```

## Giao dịch đơn

Giả sử như sau...


- Bạn có 100 ADA:  `m/1852'/1815'/0'/0/0`
- Bạn muốn gửi 25 ADA đến: `m/1852'/1815'/0'/0/1`

### Build giao dịch

```cs
// Generate the Recieving Address
Address paymentAddr = addressService.GetAddress(
    paymentNode.Derive(1).PublicKey, 
    stakingNode.PublicKey, 
    NetworkType.Testnet, 
    AddressType.Base);

// Generate an Address for changes
Address changeAddr = addressService.GetAddress(
    changeNode.PublicKey, 
    stakingNode.PublicKey, 
    NetworkType.Testnet, 
    AddressType.Base);

var transactionBody = TransactionBodyBuilder.Create
    .AddInput(inputTx, 0)
    .AddOutput(paymentAddr, 25)
    .AddOutput(changeAddr, 75)
    .SetTtl(currentSlot + 1000)
    .SetFee(0)
    .Build();
```

### Build Transaction Witnesses


Đối với giao dịch đơn giản này, chúng tôi thực sự chỉ cần thêm các khóa của mình. Đây là cách chúng tôi ký kết các giao dịch của mình.
```cs
// Derive Sender Keys
var senderKeys = paymentNode.Derive(0);

var witnesses = TransactionWitnessSetBuilder.Create
    .AddVKeyWitness(senderKeys.PublicKey, senderKeys.PrivateKey);
```

### Tính Fee

```cs
// Construct Transaction Builder
var transactionBuilder = TransactionBuilder.Create
    .SetBody(transactionBody)
    .SetWitnesses(witnesses);

// Calculate Fee
var fee = transaction.CalculateFee(minFeeA, minFeeB);

// Update Fee and Rebuild
transactionBody.SetFee(fee);
Transaction transaction = transactionBuilder.Build();
transaction.TransactionBody.TransactionOutputs.Last().Value.Coin -= fee;
```

## Giao dịch siêu dữ liệu (Metadata )


Xây dựng các giao dịch đa nhân chứng cũng giống như giao dịch đơn giản
> Nếu bạn muốn đọc thêm về Siêu dữ liệu, vui lòng đọc bài viết này về
[Tx Metadata](https://github.com/input-output-hk/cardano-node/blob/master/doc/reference/tx-metadata.md)

```cs
// Build Metadata and Add to Transaction
var auxData = AuxiliaryDataBuilder.Create
    .AddMetadata(1234, new { name = "simple message" });

var transaction = TransactionBuilder.Create
    .SetBody(transactionBody)
    .SetWitnesses(witnesses)
    .SetAuxData(auxData)
    .Build();
```

## Giao dịch đúc tiền

Trước khi chúng ta có thể tạo ra một token, chúng ta cần tạo ra một chính sách.

> Nếu bạn muốn đọc thêm về các tập lệnh chính sách, vui lòng đọc bài viết này về [Simple Scripts](https://github.com/input-output-hk/cardano-node/blob/master/doc/reference/simple-scripts.md).

```cs
// Generate a Key Pair for your new Policy
var keyPair = KeyPair.GenerateKeyPair();
var policySkey = keyPair.PrivateKey;
var policyVkey = keyPair.PublicKey;
var policyKeyHash = HashUtility.Blake2b244(policyVkey.Key);

// Create a Policy Script with a type of Script All
var policyScript = ScriptAllBuilder.Create
    .SetScript(NativeScriptBuilder.Create.SetKeyHash(policyKeyHash))
    .Build();

// Generate the Policy Id
var policyId = policyScript.GetPolicyId();
```


Bây giờ hãy xác định token của chúng ta.

```cs
// Create the AWESOME Token
string tokenName = "AWESOME";
uint tokenQuantity = 1;

var tokenAsset = TokenBundleBuilder.Create
    .AddToken(policyId, tokenName.ToBytes(), tokenQuantity);
```


Khi tạo, chúng ta sẽ cần thêm token mới của mình vào một trong các đầu ra của  giao dịch.

```cs
// Generate an Address to send the Token
Address baseAddr = addressService.GetAddress(
    paymentNode.Derive(1).PublicKey, 
    stakingNode.PublicKey, 
    NetworkType.Testnet, 
    AddressType.Base);

// Build Transaction Body with Token Bundle
var transactionBody = TransactionBodyBuilder.Create
    .AddInput(inputTx, 0)
    // Sending to Base Address, includes 100 ADA and the Token we are minting
    .AddOutput(baseAddr, 100, tokenAsset)
    .SetTtl(currentSlot + 1000)
    .SetFee(0)
    .Build();
```

## Xử lý gói token


Khi xây dựng giao dịch, chúng ta cần đảm bảo chúng ta xử lý các tokens đúng cách.
```cs
var tokenBundle = TokenBundleBuilder.Create
    .AddToken(policyId, "Token1".ToBytes(), 100)
    .AddToken(policyId, "Token2".ToBytes(), 200);

Address baseAddr = addressService.GetAddress(
    paymentNode.Derive(1).PublicKey, 
    stakingNode.PublicKey, 
    NetworkType.Testnet, 
    AddressType.Base);

var transactionBody = TransactionBodyBuilder.Create
    .AddInput(inputTx, 0)
    .AddOutput(baseAddr, 2, tokenBundle)
    .AddOutput(changeAddr, 98)
    .SetTtl(currentSlot + 1000)
    .SetFee(0)
    .Build();
```
