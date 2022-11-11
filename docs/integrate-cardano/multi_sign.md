# Giao dịch đa chữ ký - multi_signature

Tôi đã nghe nói nhiều lần về các địa chỉ có nhiều chữ ký trên Cardano, nhưng tôi chưa bao giờ thực sự thấy một ví dụ sử dụng một địa chỉ như vậy. Tôi đã tìm thấy một số tài liệu về điều này ở đây, nhưng tôi nhận ra rằng nó đã lỗi thời và các lệnh không hoạt động nữa như trên trang này. Đây là lý do tại sao tôi quyết định viết bài đăng này sau khi thực hiện một số thử nghiệm thành công với địa chỉ đa chữ ký.

Nhưng trước tiên, địa chỉ đa chữ ký là gì? Địa chỉ có nhiều chữ ký là một địa chỉ được liên kết với nhiều khóa cá nhân, có thể thuộc quyền sở hữu của những người khác nhau, do đó, giao dịch từ địa chỉ đó chỉ có thể được thực hiện khi tất cả các khóa riêng được sử dụng để ký giao dịch.

Tôi đã quyết định tạo 3 khóa riêng cho bản demo địa chỉ đa chữ ký của mình và tôi đã thực hiện trên testnet, nhưng nó tương tự với mainnet. Tôi đang sử dụng Daedalus-testnet làm nút cardano cho bản demo của mình. Tôi cũng đã tạo một kho lưu trữ Github với các tệp được sử dụng trong bản demo này, để dễ dàng hơn trong việc tạo cục bộ các tệp, trong trường hợp ai đó muốn kiểm tra điều này.

Điều đầu tiên tôi tạo là một tệp có một vài biến môi trường sẽ được sử dụng bởi tất cả các tập lệnh. Điều này cũng tạo ra các thư mục cần thiết cho các tập lệnh khác, trong trường hợp chúng chưa tồn tại và tệp tham số giao thức, được yêu cầu bởi một số lệnh. Tôi đã gọi tệp này là “env”:

## Tạo biến môi trường

    #!/bin/bash


    # for testnet
    CARDANO_NET="testnet"
    CARDANO_NET_PREFIX="--testnet-magic 1097911063"
    # for mainnet
    #CARDANO_NET="mainnet"
    #CARDANO_NET_PREFIX="--mainnet"
    #
    KEYS_PATH=./wallet
    ADDRESSES_PATH=./wallet
    FILES_PATH=./files
    POLICY_PATH=./policy
    PROTOCOL_PARAMETERS=${FILES_PATH}/protocol-parameters.json
    export CARDANO_NODE_SOCKET_PATH=~/.local/share/Daedalus/${CARDANO_NET}/cardano-node.socket

    if [ ! -d ${KEYS_PATH} ] ; then
      mkdir -p ${KEYS_PATH}
    fi

    if [ ! -d ${ADDRESSES_PATH} ] ; then
      mkdir -p ${ADDRESSES_PATH}
    fi

    if [ ! -d ${FILES_PATH} ] ; then
      mkdir -p ${FILES_PATH}
    fi

    if [ ! -d ${POLICY_PATH} ] ; then
      mkdir -p ${POLICY_PATH}
    fi

    if [ ! -f ${PROTOCOL_PARAMETERS} ] ; then
      cardano-cli query protocol-parameters --out-file  ${PROTOCOL_PARAMETERS} ${CARDANO_NET_PREFIX}
    fi


## Tạo 3 cặp key cho 3 ví trên blockchain Cardano

Tập lệnh đầu tiên sẽ tạo ra 3 cặp khóa cá nhân và khóa công khai được sử dụng để kiểm soát địa chỉ đa chữ ký. Bởi vì cũng có thể liên kết địa chỉ với một khóa đặt cược và ủy quyền nó cho một nhóm cổ phần, tôi cũng đã tạo một cặp khóa cổ phần và tôi cũng sẽ tạo sau này địa chỉ bao gồm cả địa chỉ cổ phần. Đây là tập lệnh đầu tiên, được gọi là “01-keys.sh”:

    #!/bin/bash


    . ./env

    for i in {0..2}
    do
      if [ -f "${KEYS_PATH}/payment-${i}.skey" ] ; then
        echo "Key already exists!"
      else
        cardano-cli address key-gen --verification-key-file ${KEYS_PATH}/payment-${i}.vkey --signing-key-file ${KEYS_PATH}/payment-${i}.skey
      fi
    done

    cardano-cli stake-address key-gen --verification-key-file ${KEYS_PATH}/stake.vkey --signing-key-file ${KEYS_PATH}/stake.skey



Thực thi tập lệnh này với “./01-keys.sh ”sẽ tạo các thư mục, sẽ tạo 3 cặp khóa thanh toán và cặp khóa cổ phần trong thư mục “wallet" và cũng sẽ tạo tệp protocol-parameters.json trong thư mục “files”.

## Tạo tập lệnh policy.script

Bước tiếp theo là tạo tập lệnh chính sách yêu cầu sử dụng cả 3 khóa thanh toán khi thực hiện giao dịch. Tôi đã gọi tập lệnh này là “02-policy_script.sh”:

    #!/bin/bash


    . ./env

    KEYHASH0=$(cardano-cli address key-hash --payment-verification-key-file ${KEYS_PATH}/payment-0.vkey)
    KEYHASH1=$(cardano-cli address key-hash --payment-verification-key-file ${KEYS_PATH}/payment-1.vkey)
    KEYHASH2=$(cardano-cli address key-hash --payment-verification-key-file ${KEYS_PATH}/payment-2.vkey)


    if [ ! -f ${POLICY_PATH}/policy.script ] ; then
    cat << EOF >${POLICY_PATH}/policy.script
    {
      "type": "all",
      "scripts":
      [
        {
          "type": "sig",
          "keyHash": "${KEYHASH0}"
        },
        {
          "type": "sig",
          "keyHash": "${KEYHASH1}"
        },
        {
          "type": "sig",
          "keyHash": "${KEYHASH2}"
        }
      ]
    }
    EOF
    fi

Thực thi điều này (với “./02-policy_script.sh”) sẽ tạo ra tệp policy/policy.script.

## Tạo địa chỉ thanh toán đa chữ ký

Bước tiếp theo là tính toán địa chỉ thanh toán đa chữ ký từ tập lệnh chính sách này, bao gồm các băm của 3 khóa xác minh thanh toán được tạo trong bước đầu tiên. Tôi tính toán địa chỉ có và không có bao gồm cả địa chỉ cổ phần. Tôi đã gọi tập lệnh này là “03-script-addr.sh”:

    #!/bin/bash


    . ./env

    cardano-cli address build \
    --payment-script-file ${POLICY_PATH}/policy.script \
    ${CARDANO_NET_PREFIX} \
    --out-file ${ADDRESSES_PATH}/script.addr

    cardano-cli address build \
    --payment-script-file ${POLICY_PATH}/policy.script \
    --stake-verification-key-file ${KEYS_PATH}/stake.vkey \
    ${CARDANO_NET_PREFIX} \
    --out-file ${ADDRESSES_PATH}/script-with-stake.addr


Đừng quên thực hiện script này: “. 03-script-addr.sh ”. Sau đó, bạn có thể gửi một số tiền testnet (tADA) từ ví của mình đến địa chỉ này (được tìm thấy trong wallet/script.addr). Bạn cũng có thể yêu cầu 1000 tADA từ vòi testnet. Tôi đã yêu cầu chúng từ vòi ngay bây giờ. Bạn có thể kiểm tra xem bạn đã nhận được các khoản tiền như thế này chưa:

``` 
$ cardano-cli query utxo ${CARDANO_NET_PREFIX} --address $(<wallet/script.addr)

                               TxHash                                 TxIx        Amount 
    --------------------------------------------------------------------------------------
    14d8610f16738b41c3d1f...224e1e792ceb1c9db279#0     0        1000000000 lovelace + TxOutDatumNone 
```


Như bạn có thể thấy, 1000 tADA có trong ví dụ của tôi (tôi đã kiểm duyệt một vài ký tự từ id giao dịch).


## Xây dựng giao dịch đa chữ ký

Bước tiếp theo là thực sự kiểm tra việc gửi tADA từ địa chỉ này (đỉa chỉ đa chữ ký) đến một địa chỉ khác với một giao dịch. Tôi đã tạo một tệp “wallet/dev_wallet.addr” trong đó tôi viết địa chỉ nơi tôi muốn gửi tiền. Tập lệnh được sử dụng để tạo giao dịch này là “04-transaction.sh”:

    #!/bin/bash


    . ./env

    ADDRESS=$(cat ${ADDRESSES_PATH}/script.addr)
    DSTADDRESS=$(cat ${ADDRESSES_PATH}/dev_wallet.addr)

    TRANS=$(cardano-cli query utxo ${CARDANO_NET_PREFIX} --address ${ADDRESS} | tail -n1)
    UTXO=$(echo ${TRANS} | awk '{print $1}')
    ID=$(echo ${TRANS} | awk '{print $2}')
    TXIN=${UTXO}#${ID}

    cardano-cli transaction build \
    --tx-in ${TXIN} \
    --change-address ${DSTADDRESS} \
    --tx-in-script-file ${POLICY_PATH}/policy.script \
    --witness-override 3 \
    --out-file tx.raw \
    ${CARDANO_NET_PREFIX}


Tôi đã tạo giao dịch bằng lệnh "cardano-cli transaction build" mới hơn, vì lệnh này cũng sẽ tự động tính các khoản phí tối thiểu bắt buộc cho giao dịch và chúng tôi bỏ qua 2 bước (tính phí và tạo giao dịch với các khoản phí chính xác) so với sử dụng phương pháp “xây dựng giao dịch cardano-cli-raw”. Cũng lưu ý tham số “–tx-in-script-file”, rất quan trọng khi sử dụng địa chỉ đa chữ ký và “–witness-override 3” được sử dụng để tính phí giao dịch chính xác, vì chúng tôi đang sử dụng 3 khóa riêng để ký giao dịch sau đó.

Việc thực thi tập lệnh này (“./04-transaction.sh”) sẽ tạo ra tệp giao dịch thô “tx.raw” và cũng sẽ thông báo cho chúng tôi về phí giao dịch: “Phí giao dịch ước tính: Lovelace 178657”.

Chúng ta có thể kiểm tra tệp giao dịch bằng lệnh này:

    $ cardano-cli transaction view --tx-body-file tx.raw 
    auxiliary scripts: null
    certificates: null
    era: Alonzo
    fee: 178657 Lovelace
    inputs:
    - 14d8610f16738b41.....e792ceb1c9db279#0
    mint: null
    outputs:
    - address: addr_test1............yy33
      address era: Shelley
      amount:
        lovelace: 999821343
      datum: null
      network: Testnet
      payment credential:
        key hash: e98ef513e28e93b909183292cd27956ddd9939ec6afcbee8694386ab
      stake reference:
        key hash: 10e893f172924ccbe98d3629b9dce63b26664c1c567af0b31327e596
    update proposal: null
    validity range:
      lower bound: null
      upper bound: null
    withdrawals: null


Tôi đã kiểm duyệt các ký tự trong UTxO đầu vào và trong địa chỉ đích trong đầu ra ở trên.

## Kí giao dịch trên từng ví

Bây giờ giao dịch cần được ký kết. Điều này có thể được thực hiện bằng cách sử dụng “cardano-cli transaction sign” (tệp “05-sign.sh”), nhưng điều này chỉ khả thi khi một người có tất cả các khóa riêng và toàn bộ ý tưởng về địa chỉ đa chữ ký là các khóa riêng được phân phối cho những người khác nhau. Đây là lý do tại sao chúng ta cần **“witness”** giao dịch bằng tất cả các khóa thanh toán có chữ ký (private) payment.keys khác nhau và tập hợp giao dịch đã ký từ tất cả chúng. Điều này được thực hiện trong script “05-witness.sh”:

    #!/bin/bash


    . ./env

    cardano-cli transaction witness \
    --signing-key-file ${KEYS_PATH}/payment-0.skey \
    --tx-body-file tx.raw \
    --out-file payment-0.witness \
    ${CARDANO_NET_PREFIX}

    cardano-cli transaction witness \
    --signing-key-file ${KEYS_PATH}/payment-1.skey \
    --tx-body-file tx.raw \
    --out-file payment-1.witness \
    ${CARDANO_NET_PREFIX}

    cardano-cli transaction witness \
    --signing-key-file ${KEYS_PATH}/payment-2.skey \
    --tx-body-file tx.raw \
    --out-file payment-2.witness \
    ${CARDANO_NET_PREFIX}


    cardano-cli transaction assemble \
    --tx-body-file tx.raw \
    --witness-file payment-0.witness \
    --witness-file payment-1.witness \
    --witness-file payment-2.witness \
    --out-file tx.signed

## submit gia dịch

Nếu bạn kiểm tra cả hai cách và so sánh kết quả, bạn sẽ thấy rằng các tệp được tạo “tx.signed” giống hệt nhau. Đừng quên thực thi script: “./05-witness.sh ”. Tệp “tx.signed” sẽ được tạo và bước cuối cùng của bản trình diễn là gửi giao dịch đã ký đến một nút cardano (sử dụng tập lệnh “06-submit.sh”):

    #!/bin/bash


    . ./env

    cardano-cli transaction submit \
    --tx-file tx.signed \
    ${CARDANO_NET_PREFIX}

Thực thi tập lệnh:

    $ . 06-submit.sh
    Transaction successfully submitted. 

Sau vài giây (khối tiếp theo được đúc), tiền sẽ ở địa chỉ đích (tôi đã kiểm duyệt một vài ký tự từ id giao dịch):

```

    $ cardano-cli query utxo ${CARDANO_NET_PREFIX} --address $(<wallet/dev_wallet.addr)
                                TxHash                                 TxIx        Amount
    --------------------------------------------------------------------------------------
    8902f1b5e18cc494a36f8...ac5653df5cfea3b550ce     0        999821343 lovelace + TxOutDatumNone 

```


Trừ đi phí giao dịch từ 1000 tADA, chúng ta sẽ thấy rằng 999816899 chính xác là số tiền dự kiến ​​sẽ có ở địa chỉ đích:

```

    $ expr 1000000000 - 178657
    999821343 
```



Ngoài ra việc thẩm vấn địa chỉ tập lệnh sẽ cho thấy rằng 1000 tADA không còn ở đó nữa:

```

    $ cardano-cli query utxo ${CARDANO_NET_PREFIX} --address $(<wallet/script.addr)
                                TxHash                                 TxIx        Amount
    --------------------------------------------------------------------------------------

```
## Kết luận

Điều này kết thúc bản demo của tôi với các địa chỉ đa chữ ký trên Cardano.

Tôi cũng đã thử nghiệm các tập lệnh với tiền được gửi đến địa chỉ tập lệnh bao gồm địa chỉ cổ phần (“wallet/script-with-stake.addr”), trong trường hợp bạn đang thắc mắc. Loại địa chỉ này có thể được sử dụng để ủy quyền các khoản tiền tại một địa chỉ có nhiều chữ ký cho một nhóm cổ phần.

Bây giờ để ủy quyền ví multisig này

Trước tiên bạn cần đăng ký tiền cược. Điều này có thể được thực hiện bằng cách chạy 3 tập lệnh sau

```
   ./07-deleg.sh
   ./05-sign.sh
   ./06-submit.sh
```  
  
   

Khi điều này được thực hiện, bây giờ bạn cần phải ủy quyền cổ phần. Trong ví dụ này, địa chỉ tập lệnh được ủy quyền cho nhóm Apex.
 
 ```
    ./deleg-08.sh
    ./07-sign-delegation.sh
    ./06-submit.sh
```    
