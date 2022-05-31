---
id: minting
title: Minting Native Assets
sidebar_label: Minting Native Assets
description: How to mint native tokens on Cardano. 
#image: ./img/og-developer-portal.png
--- 

Trong phần này, chúng tôi sẽ khai thác tài sản gốc --**chứ không phải NFT**

Chúng tôi đặc biệt khuyên bạn nên tham khảo phần này để hiểu cách hoạt động của giao dịch và đúc tiền.
Minting NFTs sẽ tuân theo quy trình tương tự, chỉ với một vài chỉnh sửa. Nếu bạn quan tâm NFT, vui lòng truy cập 
[Minting NFTs](minting-nfts.md).

## Yêu cầu
1. Một nút Cardano đang chạy và được đồng bộ hóa - có thể truy cập thông qua lệnh `cardano-cli`. Hướng dẫn này được viết bằng `cardano-cli` v 1.27.0. Một số lệnh có thể thay đổi.
2. Bạn có một số kiến thức về Linux về cách điều hướng giữa các thư mục, tạo và chỉnh sửa tệp cũng như thiết lập và kiểm tra các biến thông qua Linux shell.


## Tổng quan
Hướng dẫn này sẽ cung cấp cho bạn một bản sao và hướng dẫn có thể dán qua vòng đời hoàn chỉnh của mã thông báo:

![image](https://user-images.githubusercontent.com/34856010/162867266-a61dfbe8-f0cb-4c97-9c1a-7ef71d818e23.png)

Đây sẽ là những bước chúng ta cần thực hiện để hoàn thành toàn bộ vòng đời:

1. Thiết lập mọi thứ sẵn sàng
2. Tạo địa chỉ và khóa (keys) mới
3. Tạo chính sách đúc tiền
4. Soạn thảo một giao dịch đúc tiền
5. Tính phí
6. Gửi mã thông báo giao dịch và đúc token (cho chính chúng tôi)
7. Gửi token đến ví Daedalus
8. Đốt token


### Cấu trúc thư mục
Chúng ta sẽ làm việc trong một thư mục mới, Đây là tổng quan về các file sẽ được tạo ra:

```
├── burning.raw                    # Giao dich để đốt token
├── burning.signed                 # File ký giao dịch đã được ký để đốt token
├── matx.raw                       # Giao dịch tạo token
├── matx.signed                    # File ký giao dịch tạo token
├── metadata.json                  # Metadata mô tả đặc tính NFT
├── payment.addr                   # Địa chỉ để gửi và nhận
├── payment.skey                   # Khóa ký giao dịch
├── payment.vkey                   # Khóa xác nhận giao dịch
├── policy                         # Thư mục chứa chính sách
│   ├── policy.script              # Script tạo  policyID
│   ├── policy.skey                # Khóa ký Policy
│   ├── policy.vkey                # Khóa xác nhận Policy 
│   └── policyID                   # File chứa policy ID
└── protocol.json                  # File thông số hệ thống
```

### Kiến trúc mã thông báo
Trước khi khai thác nội dung gốc, bạn cần tự hỏi bản thân ít nhất bốn câu hỏi sau:
1. Tên của (các) mã thông báo tùy chỉnh của tôi sẽ là gì?
2. Tôi muốn đúc bao nhiêu?
3. Sẽ có giới hạn thời gian cho việc tương tác (đúc hoặc ghi mã thông báo?)
4. Ai sẽ có thể đúc chúng?

Số 1, 3 và 4 sẽ được xác định trong cái gọi là kịch bản chính sách tiền tệ, trong khi số tiền thực tế sẽ chỉ được xác định trên giao dịch đúc tiền.

Đối với hướng dẫn này, chúng tôi sẽ sử dụng:

1. Tên của (các) mã thông báo tùy chỉnh của tôi sẽ là gì?
--> Chúng tôi sẽ đặt tên là `Testtoken` và `SecondTesttoken`
2. Tôi muốn đúc bao nhiêu?
--> 10000000 each (10M `Testtoken` and 10M `SecondTesttoken`)
3. Sẽ có giới hạn thời gian cho việc tương tác (đúc hoặc đốt mã thông báo?)
---> Không (tuy nhiên, chúng tôi sẽ làm khi tạo NFT), chúng tôi muốn đúc và đốt chúng theo cách chúng tôi muốn.
4. Ai sẽ có thể đúc chúng?
--> chỉ có một chữ ký (mà chúng tôi sơ hữu) mới có thể ký giao dịch và do đó có thể đúc mã thông báo

## Cài đặt- Thiết lập
### Thiết lập Cardano node socket path
Để làm việc với `cardano-cli` chúng ta cần thiết lập một biến môi trường được gọi là `CARDANO_NODE_SOCKET_PATH`. Xin lưu ý rằng tên biến đều là chữ hoa. Biến cần giữ đường dẫn tuyệt đối đến tệp socket của cài đặt nút (node) Cardano đang chạy của bạn.
Nếu bạn không chắc chắn hoặc không biết tìm đường dẫn ổ cắm của mình ở đâu, vui lòng kiểm tra lệnh về cách bạn bắt đầu / chạy nút Cardano của mình.
Ví dụ - nếu bạn bắt đầu nút của mình bằng lệnh này

```bash
$HOME/.local/bin/cardano-node run \
 --topology config/testnet-topology.json \
 --database-path db \
 --socket-path $HOME/TESTNET_NODE/socket/node.socket \
 --port 3001 \
 --config config/testnet-config.json
```
Bạn cần đặt biến thành đường dẫn tương ứng thông qua tham số `--socket-path` :

```bash
export CARDANO_NODE_SOCKET_PATH="$HOME/TESTNET_NODE/socket/node.socket"
```
Bạn cần điều chỉnh đường dẫn trên thiết lập và đường dẫn ổ cắm của mình cho phù hợp.

### Cải thiện cho dễ đọc
Vì chúng tôi đã trả lời tất cả các câu hỏi ở trên, chúng tôi sẽ đặt các biến trên terminal / bash của mình để làm cho khả năng đọc dễ dàng hơn một chút. Chúng tôi cũng sẽ sử dụng testnet. Sự khác biệt duy nhất giữa việc khai thác nội dung gốc trong mạng chính là bạn cần thay thế <b>testnet</b> bằng <b>mainnet</b>. 

<b>Kể từ phiên bản cardano-cli 1.31.0, tên mã thông báo phải được mã hóa base16 </b>.  Vì vậy, ở đây, chúng tôi sử dụng công cụ xxd để mã hóa tên mã thông báo.

```bash
testnet="--testnet-magic 1097911063"
tokenname1=$(echo -n "Testtoken" | xxd -ps | tr -d '\n')
tokenname2=$(echo -n "SecondTesttoken" | xxd -ps | tr -d '\n')
tokenamount="10000000"
output="0"
```

Chúng tôi sẽ sử dụng kỹ thuật thiết lập các biến này để giúp bạn dễ dàng theo dõi hơn..

### Kiểm tra tình trạng node

Chúng tôi cũng muốn kiểm tra xem Node của chúng tôi có được cập nhật hay không. Để làm điều đó, chúng tôi kiểm tra kỷ nguyên / khối hiện tại và so sánh nó với giá trị hiện tại được hiển thị trong [Cardano Explorer for the testnet](https://explorer.cardano-testnet.iohkdev.io/en).

```bash
cardano-cli query tip $testnet
```

Sẽ cung cấp cho bạn một đầu ra như thế này
```bash
{
    "epoch": 282,
    "hash": "82cfbbadaaec1a6204442b91de1535505b6482ae9858f3f0bd9c4bb9c8a2c12b",
    "slot": 36723570,
    "block": 6078639,
    "era": "Mary"
}
```

Epoch và số vị trí phải khớp khi được so sánh với Cardano [Explorer for testnet](https://explorer.cardano-testnet.iohkdev.io/en)

![image](https://user-images.githubusercontent.com/34856010/162867330-fa85a6a9-37fa-4cad-94c8-bfe742c7983d.png)


### Set up your workspace

We will start with a clean slate. So let's make a new directory and navigate into it.
```bash
mkdir tokens
cd tokens/
```

### Generate keys and address

If you already have a payment address and keys and you want to use those, you can skip this step.  
If not - we need to generate those to submit transactions and to send and receive ada or native assets.

Payment verification and signing keys are the first keys we need to create.

```bash
cardano-cli address key-gen --verification-key-file payment.vkey --signing-key-file payment.skey
```

Those two keys can now be used to generate an address.

```bash
cardano-cli address build --payment-verification-key-file payment.vkey --out-file payment.addr $testnet
```

We will save our address hash in a variable called `address`.

```bash
address=$(cat payment.addr)
```
### Fund the address

Submitting transactions always require you to pay a fee. Sending native assets requires also requires sending at least 1 ada.  
So make sure the address you are going to use as the input for the minting transaction has sufficient funds. 

For the **testnet**, you can request funds through the [testnet faucet](../integrate-cardano/testnet-faucet).

### Export protocol parameters

For our transaction calculations, we need some of the current protocol parameters. The parameters can be saved in a file called <i>protocol.json</i> with this command:

```bash
cardano-cli query protocol-parameters $testnet --out-file protocol.json
```

## Minting native assets

### Generate the policy

Policies are the defining factor under which tokens can be minted. Only those in possession of the policy keys can mint or burn tokens minted under this specific policy.
We'll make a separate sub-directory in our work directory to keep everything policy-wise separated and more organized.
For further reading, please check [the official docs](https://docs.cardano.org/native-tokens/getting-started/#tokenmintingpolicies) or the [github page about multi-signature scripts](https://github.com/input-output-hk/cardano-node/blob/c6b574229f76627a058a7e559599d2fc3f40575d/doc/reference/simple-scripts.md).

```bash
mkdir policy
```

:::note 
We don't navigate into this directory, and everything is done from our working directory.
:::


First of all, we — again — need some key pairs:

```bash
cardano-cli address key-gen \
    --verification-key-file policy/policy.vkey \
    --signing-key-file policy/policy.skey
```

Create a `policy.script` file and fill it with an empty string.

```bash
touch policy/policy.script && echo "" > policy/policy.script
```

Use the `echo` command to populate the file:

```bash
echo "{" >> policy/policy.script 
echo "  \"keyHash\": \"$(cardano-cli address key-hash --payment-verification-key-file policy/policy.vkey)\"," >> policy/policy.script 
echo "  \"type\": \"sig\"" >> policy/policy.script 
echo "}" >> policy/policy.script
```

:::note 
The second echo uses a sub-shell command to generate the so-called key-hash. But, of course, you could also do that by hand.
:::

We now have a simple script file that defines the policy verification key as a witness to sign the minting transaction. There are no further constraints such as token locking or requiring specific signatures to successfully submit a transaction with this minting policy.

### Asset minting
To mint the native assets, we need to generate the policy ID from the script file we created.

```bash
cardano-cli transaction policyid --script-file ./policy/policy.script > policy/policyID
```

The output gets saved to the file `policyID` as we need to reference it later on.

### Build the raw transaction to send to oneself
To mint the tokens, we will make a transaction using our previously generated and funded address.

#### A quick word about transactions in Cardano

Each transaction in Cardano requires the payment of a fee which — as of now — will mostly be determined by the size of what we want to transmit.
The more bytes get sent, the higher the fee.

That's why making a transaction in Cardano is a three-way process.

1. First, we will build a transaction, resulting in a file. This will be the foundation of how the transaction fee will be calculated. 
2. We use this `raw` file and our protocol parameters to calculate our fees
3. Then we need to re-build the transaction, including the correct fee and the adjusted amount we're able to send. Since we send it to ourselves, the output needs to be the amount of our fundings minus the calculated fee.

Another thing to keep in mind is the model of how transactions and "balances" are designed in Cardano.
Each transaction has one (or multiple) inputs (the source of your funds, like which bill you'd like to use in your wallet to pay) and one or multiple outputs.
In our minting example, the input and output will be the same - <b>our own address</b>.

Before we start, we will again need some setup to make the transaction building easier.
First, query your payment address and take note of the different values present.

```bash
cardano-cli query utxo --address $address $testnet
```

Your output should look something like this (fictional example):

```bash
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
b35a4ba9ef3ce21adcd6879d08553642224304704d206c74d3ffb3e6eed3ca28     0        1000000000 lovelace
```

Since we need each of those values in our transaction, we will store them individually in a corresponding variable.

```bash
txhash="insert your txhash here"
txix="insert your TxIx here"
funds="insert Amount here"
policyid=$(cat policy/policyID)
```

For our fictional example, this would result in the following output - <b>please adjust your values accordingly</b>:

```bash
$ txhash="b35a4ba9ef3ce21adcd6879d08553642224304704d206c74d3ffb3e6eed3ca28"
$ txix="0"
$ funds="1000000000"
$ policyid=$(cat policy/policyID)
```
Also, transactions only used to calculate fees must still have a fee set, though it doesn't have to be exact.  The calculated fee will be included *the second time* this transaction is built (i.e. the transaction to sign and submit).  This first time, only the fee parameter *length* matters, so here we choose a maximum value ([note](https://github.com/cardano-foundation/developer-portal/pull/283#discussion_r705612888)): 

```bash
$ fee="300000"
```

Now we are ready to build the first transaction to calculate our fee and save it in a file called <i>matx.raw</i>.
We will reference the variables in our transaction to improve readability because we saved almost all of the needed values in variables.
This is what our transaction looks like:
```bash
cardano-cli transaction build-raw \
 --fee $fee \
 --tx-in $txhash#$txix \
 --tx-out $address+$output+"$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
 --mint="$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
 --minting-script-file policy/policy.script \
 --out-file matx.raw
```

:::note 
In later versions of cardano-cli (at least from >1.31.0) <b>the tokennames must be base16 encoded or you will receive an error</b>
```bash
option --tx-out: 
unexpected 'T'
expecting alphanumeric asset name, white space, "+" or end of input
```

You can fix this by redefining the tokennames. In this tutorial the equivalent base16 token names are:
```bash
tokenname1="54657374746F6B656E"
tokenname2="5365636F6E6454657374746F6B656E"
```
:::

#### Syntax breakdown 
Here's a breakdown of the syntax as to which parameters we define in our minting transaction:
```bash
--fee: $fee
```
The network fee we need to pay for our transaction. Fees will be calculated through the network parameters and depending on the size (in bytes) our transaction will have. The bigger the file size, the higher the fee.

```bash
--tx-in $txhash#$txix \
```
The hash of our address we use as the input for the transaction needs sufficient funds.
So the syntax is: the hash, followed by a hashtag, followed by the value of TxIx of the corresponding hash.

```bash
--tx-out $address+$output+"$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
```
Here is where part one of the magic happens. For the <i>--tx-out</i>, we need to specify which address will receive our transaction. 
In our case, we send the tokens to our own address. 
:::note
The syntax is very important, so here it is word for word. There are no spaces unless explicitly stated:
1. address hash
2. a plus sign
3. the output in Lovelace (ada) (output = input amount — fee)
4. a plus sign
5. quotation marks
6. the amount of the token
7. a blank/space
8. the policy id
9. a dot
10. the token name (optional if you want multiple/different tokens: a blank, a plus, a blank, and start over at 6.) 
11. quotation marks
:::

```bash
--mint="$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
```
Again, the same syntax as specified in <i>--tx-out</i> but without the address and output.

```bash
--out-file matx.raw
```
We save our transaction to a file that you can name however you want. 
Just be sure to reference the correct filename in upcoming commands. I chose to stick with the official docs and declared it as <i>matx.raw</i>.

Based on this raw transaction we can calculate the minimal transaction fee and store it in the variable <i>$fee</i>. We get a bit fancy here and only store the value so we can use the variable for terminal based calculations:

```bash
fee=$(cardano-cli transaction calculate-min-fee --tx-body-file matx.raw --tx-in-count 1 --tx-out-count 1 --witness-count 2 $testnet --protocol-params-file protocol.json | cut -d " " -f1)
```

Remember, the transaction input and the output of ada must be equal, or otherwise, the transaction will fail. There can be no leftovers.
To calculate the remaining output we need to subtract the fee from our funds and save the result in our output variable.

```bash
output=$(expr $funds - $fee)
```

We now have every value we need to re-build the transaction, ready to be signed. So we reissue the same command to re-build, the only difference being our variables now holding the correct values.

```bash
cardano-cli transaction build-raw \
--fee $fee  \
--tx-in $txhash#$txix  \
--tx-out $address+$output+"$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
--mint="$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
--minting-script-file policy/policy.script \
--out-file matx.raw
```

Transactions need to be signed to prove the authenticity and ownership of the policy key.

```bash
cardano-cli transaction sign  \
--signing-key-file payment.skey  \
--signing-key-file policy/policy.skey  \
$testnet --tx-body-file matx.raw  \
--out-file matx.signed
```

:::note The signed transaction will be saved in a new file called <i>matx.signed</i> instead of <i>matx.raw</i>.
:::

Now we are going to submit the transaction, therefore minting our native assets:
```bash
cardano-cli transaction submit --tx-file matx.signed $testnet
```

Congratulations, we have now successfully minted our own token.
After a couple of seconds, we can check the output address
```bash
cardano-cli query utxo --address $address $testnet
```

and should see something like this (fictional example):

```bash
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
d82e82776b3588c1a2c75245a20a9703f971145d1ca9fba4ad11f50803a43190     0        999824071 lovelace + 10000000 45fb072eb2d45b8be940c13d1f235fa5a8263fc8ebe8c1af5194ea9c.5365636F6E6454657374746F6B656E + 10000000 45fb072eb2d45b8be940c13d1f235fa5a8263fc8ebe8c1af5194ea9c.54657374746F6B656E
```

## Sending token to a wallet

To send tokens to a wallet, we need to build another transaction - this time only without the minting parameter.
We will set up our variables accordingly.

```bash
fee="0"
receiver="Insert wallet address here"
receiver_output="10000000"
txhash=""
txix=""
funds="Amout of lovelace"
```

Again - here is an example of how it would look if we use our fictional example:

```bash
$ fee="0"
$ receiver="addr_test1qp0al5v8mvwv9mzn77ls0tev3t838yp9ghvgxf9t5qa4sqlua2ywcygl3d356c34576elq5mcacg88gaevceyc5tulwsmk7s8v"
$ receiver_output="10000000"
$ txhash="d82e82776b3588c1a2c75245a20a9703f971145d1ca9fba4ad11f50803a43190"
$ txix="0"
$ funds="999824071"
```

You should still have access to the other variables from the minting process.
Please check if those variables are set:

```bash
echo Tokenname 1: $tokenname1
echo Tokenname 2: $tokenname2
echo Address: $address
echo Policy ID: $policyid
```

We will be sending 2 of our first tokens, `Testtoken`, to the foreign address.  
A few things worth pointing out:

1. We are forced to send at least a minimum of 1 ada (1000000 Lovelace) to the foreign address. We can not send tokens only. So we need to factor this value into our output. We will reference the output value of the remote address with the variable receiver_output.
2. Apart from the receiving address, we also need to set our own address as an additional output. Since we don't want to send everything we have to the remote address, we're going to use our own address to receive everything else coming from the input.
3. Our own address, therefore, needs to receive our funds, subtracted by the transaction fee as well as the minimum of 1 ada we need to send to the other address and
4. all of the tokens the txhash currently holds, subtracted by the tokens we send.

:::note Depending on the size and amount of native assets you are going to send it might be possible to send more than the minimum requirement of only 1 ada. For this guide, we will be sending 10 ada to be on the safe side.
Check the [Cardano ledger docs for further reading](https://cardano-ledger.readthedocs.io/en/latest/explanations/min-utxo-alonzo.html#example-min-ada-value-calculations-and-current-constants)
:::

Since we will send 2 of our first tokens to the remote address we are left with 999998 of the `Testtoken` as well as the additional 1000000 `SecondTesttoken`.

Here’s what the `raw` transaction looks like:

```bash
cardano-cli transaction build-raw  \
--fee $fee  \
--tx-in $txhash#$txix  \
--tx-out $receiver+$receiver_output+"2 $policyid.$tokenname1"  \
--tx-out $address+$output+"9999998 $policyid.$tokenname1 + 10000000 $policyid.$tokenname2"  \
--out-file rec_matx.raw
```

Again we are going to calculate the fee and save it in a variable.

```bash
fee=$(cardano-cli transaction calculate-min-fee --tx-body-file rec_matx.raw --tx-in-count 1 --tx-out-count 2 --witness-count 1 $testnet --protocol-params-file protocol.json | cut -d " " -f1)
```

As stated above, we need to calculate the leftovers that will get sent back to our address.
The logic being:
`TxHash Amount` — `fee` — `min Send 10 ada in Lovelace` = `the output for our own address`

```bash
output=$(expr $funds - $fee - 10000000)
```

Let’s update the transaction:

```bash
cardano-cli transaction build-raw  \
--fee $fee  \
--tx-in $txhash#$txix  \
--tx-out $receiver+$receiver_output+"2 $policyid.$tokenname1"  \
--tx-out $address+$output+"9999998 $policyid.$tokenname1 + 10000000 $policyid.$tokenname2"  \
--out-file rec_matx.raw
```

Sign it:
```bash
cardano-cli transaction sign --signing-key-file payment.skey $testnet --tx-body-file rec_matx.raw --out-file rec_matx.signed
```

Send it:
```bash
cardano-cli transaction submit --tx-file rec_matx.signed $testnet
```

After a few seconds, you, the receiver, should have your tokens. For this example, a Daedalus testnet wallet is used.

![image](https://user-images.githubusercontent.com/34856010/162867390-459b718b-505c-45e5-8a4c-ef0860cb21c5.png)



## Burning token

In the last part of our token lifecycle, we will burn 5000 of our newly made tokens <i>SecondTesttoken</i>, thereby destroying them permanently.

You won't be surprised that this — again — will be done with a transaction.
If you've followed this guide up to this point, you should be familiar with the process, so let's start over.

Set everything up and check our address:

```bash
cardano-cli query utxo --address $address $testnet
```

:::note Since we've already sent tokens away, we need to adjust the amount of Testtoken we are going to send.
:::

Let's set our variables accordingly (if not already set). Variables like address and the token names should also be set.

```bash
txhash="insert your txhash here"
txix="insert your TxIx here"
funds="insert Amount only in here"
burnfee="0"
policyid=$(cat policy/policyID)
burnoutput="0"
```

Burning tokens is fairly straightforward.
You will issue a new minting action, but this time with a <b>negative</b> input. This will essentially subtract the amount of token.

```bash
cardano-cli transaction build-raw \
 --fee $burnfee \
 --tx-in $txhash#$txix \
 --tx-out $address+$burnoutput+"9999998 $policyid.$tokenname1 + 9995000 $policyid.$tokenname2"  \
 --mint="-5000 $policyid.$tokenname2" \
 --minting-script-file policy/policy.script \
 --out-file burning.raw
 ```
 

:::note Since we already have multiple transaction files, we will give this transaction a better name and call it <i>burning.raw</i>.
We also need to specify the amount of tokens left after destroying.
The math is:
<i>amount of input token</i> — <i>amount of destroyed token</i> = <i>amount of output token</i>
:::

As usual, we need to calculate the fee. 
To make a better differentiation, we named the variable <i>burnfee</i>:

```bash
burnfee=$(cardano-cli transaction calculate-min-fee --tx-body-file burning.raw --tx-in-count 1 --tx-out-count 1 --witness-count 2 $testnet --protocol-params-file protocol.json | cut -d " " -f1)
```

Calculate the correct output value
```bash
burnoutput=$(expr $funds - $burnfee)
```

Re-build the transaction with the correct amounts

```bash
cardano-cli transaction build-raw \
 --fee $burnfee \
 --tx-in $txhash#$txix \
 --tx-out $address+$burnoutput+"9999998 $policyid.$tokenname1 + 9995000 $policyid.$tokenname2"  \
 --mint="-5000 $policyid.$tokenname2" \
 --minting-script-file policy/policy.script \
 --out-file burning.raw
 ```

 Sign the transaction:

 ```bash
 cardano-cli transaction sign  \
--signing-key-file payment.skey  \
--signing-key-file policy/policy.skey  \
$testnet  \
--tx-body-file burning.raw  \
--out-file burning.signed
```

Send it:

```bash
cardano-cli transaction submit --tx-file burning.signed $testnet
```

Check your address: 

```bash
cardano-cli query utxo --address $address $testnet
```

You should now have 5000 tokens less than before:
```bash
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
f56e2800b7b5980de6a57ebade086a54aaf0457ec517e13012571b712cf53fb3     1        989643170 lovelace + 9995000 45fb072eb2d45b8be940c13d1f235fa5a8263fc8ebe8c1af5194ea9c.5365636F6E6454657374746F6B656E + 9999998 45fb072eb2d45b8be940c13d1f235fa5a8263fc8ebe8c1af5194ea9c.54657374746F6B656E
```
