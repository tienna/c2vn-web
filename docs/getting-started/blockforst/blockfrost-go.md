---
id: blockfrost-go
sidebar_position: '3'
title: Blockfrost với Go
sidebar_label: Blockfrost với Go
description: Xây dựng một ứng dụng bằng Go trên Chuỗi khối Cardano
#image: ./img/og-developer-portal.png
---

Dưới đây là các bước để kết nối ví trong Blockchain Cardano bằng cách sử dụng Go với Blockfrost:

## 1. Nhập các gói cần thiết.


```javascript
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "os"
    "strconv"
)
```

## 2. Đặt API Blockfrost và khóa API của bạn làm biến môi trường.



```javascript
apiEndpoint := os.Getenv("BLOCKFROST_API_ENDPOINT")
apiKey := os.Getenv("BLOCKFROST_API_KEY")
```

## 3. Xác định một chức năng để truy xuất các UTxO được liên kết với một địa chỉ nhất định. 

Bạn có thể sử dụng `/addresses/{address}/utxos` cho việc này.


```javascript
func getUTxOs(address string) ([]UTxO, error) {
    url := fmt.Sprintf("%s/addresses/%s/utxos", apiEndpoint, address)
    req, err := http.NewRequest("GET", url, nil)
    if err != nil {
        return nil, err
    }
    req.Header.Set("project_id", apiKey)
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }
    var utxos []UTxO
    err = json.Unmarshal(body, &utxos)
    if err != nil {
        return nil, err
    }
    return utxos, nil
}

type UTxO struct {
    TxHash            string `json:"tx_hash"`
    OutputIndex       int    `json:"output_index"`
    Amount            string `json:"amount"`
    Block              int   `json:"block"`
    BlockHash         string `json:"block_hash"`
    Confirmations     int    `json:"confirmations"`
    Epoch              int   `json:"epoch"`
    Slot               int   `json:"slot"`
    TransactionHeight int    `json:"tx_index"`
    OutputType        string `json:"output_type"`
    SpendingProof     struct {
        Proof           string   `json:"proof"`
        Hash            string   `json:"hash"`
        Index           int      `json:"index"`
        Signature       []string `json:"signature"`
    } `json:"spending_proof"`
}

```
## 4. Định nghĩa một hàm để tính tổng số dư của một địa chỉ nhất định.

 Bạn có thể sử dụng hàm `getUTxOs`  được xác định ở bước 3 để truy xuất các `UTxO` và sau đó tính tổng các giá trị của chúng.


```javascript
func getBalance(address string) (int64, error) {
    utxos, err := getUTxOs(address)
    if err != nil {
        return 0, err
    }
    var balance int64
    for _, utxo := range utxos {
        amount, err := strconv.ParseInt(utxo.Amount, 10, 64)
        if err != nil {
            return 0, err
        }
        balance += amount
    }
    return balance, nil
}

```

## 5. Xác định hàm để xây dựng giao dịch chuyển ADA từ địa chỉ này sang địa chỉ khác.

 Bạn sẽ cần cung cấp địa chỉ nguồn và địa chỉ đích, số tiền cần chuyển và khóa riêng được liên kết với địa chỉ nguồn. Bạn có thể sử dụng `/txs/build` và `/txs/{txHash}/sign` cho việc này.

Đây là một ví dụ về chức năng Go xây dựng và ký một giao dịch để chuyển ADA từ địa chỉ này sang địa chỉ khác bằng API Blockfrost:

```javascript
package main

import (
	"bytes"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

const (
	blockfrostApiUrl = "https://cardano-mainnet.blockfrost.io/api/v0"
	blockfrostApiKey = "YOUR_API_KEY"
)

type BuildTransactionRequest struct {
	Inputs  []TransactionInput  `json:"inputs"`
	Outputs []TransactionOutput `json:"outputs"`
}

type TransactionInput struct {
	TxHash     string `json:"tx_hash"`
	TxIndex    int    `json:"tx_index"`
	Amount     int64  `json:"amount"`
	PrivateKey string `json:"private_key"`
}

type TransactionOutput struct {
	Address string `json:"address"`
	Amount  int64  `json:"amount"`
}

func BuildAndSignTransaction(sourceAddress string, destinationAddress string, amount int64, privateKey string) (string, error) {
	// Construct the input object for the transaction
	input := TransactionInput{
		TxHash:     "INPUT_TX_HASH", // replace with the hash of the transaction containing the source UTXO
		TxIndex:    0,              // replace with the index of the UTXO within the transaction
		Amount:     amount,         // amount of ADA to transfer
		PrivateKey: privateKey,     // private key for the source address
	}
	// Construct the output object for the transaction
	output := TransactionOutput{
		Address: destinationAddress, // destination address
		Amount:  amount,              // amount of ADA to transfer
	}
	// Build the transaction request
	requestBody := BuildTransactionRequest{
		Inputs:  []TransactionInput{input},
		Outputs: []TransactionOutput{output},
	}
	requestBytes, err := json.Marshal(requestBody)
	if err != nil {
		return "", err
	}
	requestReader := bytes.NewReader(requestBytes)

	// Send the build transaction request to Blockfrost
	buildTransactionUrl := fmt.Sprintf("%s/txs/build", blockfrostApiUrl)
	buildTransactionRequest, err := http.NewRequest("POST", buildTransactionUrl, requestReader)
	if err != nil {
		return "", err
	}
	buildTransactionRequest.Header.Set("Content-Type", "application/json")
	buildTransactionRequest.Header.Set("Project_id", blockfrostApiKey)
	buildTransactionResponse, err := http.DefaultClient.Do(buildTransactionRequest)
	if err != nil {
		return "", err
	}
	defer buildTransactionResponse.Body.Close()
	buildTransactionResponseBody, err := ioutil.ReadAll(buildTransactionResponse.Body)
	if err != nil {
		return "", err
	}

	// Sign the transaction
	var buildTransactionResponseData map[string]interface{}
	err = json.Unmarshal(buildTransactionResponseBody, &buildTransactionResponseData)
	if err != nil {
		return "", err
	}
	txHash := buildTransactionResponseData["tx_hash"].(string)
	signTransactionUrl := fmt.Sprintf("%s/txs/%s/sign", blockfrostApiUrl, txHash)
	signTransactionRequest, err := http.NewRequest("POST", signTransactionUrl, nil)
	if err != nil {
		return "", err
	}
	signTransactionRequest.Header.Set("Project_id", blockfrostApiKey)
	signTransactionResponse, err := http.DefaultClient.Do(signTransactionRequest)
	if err != nil {
		return "", err
	}
	defer signTransactionResponse.Body.Close()
	signTransactionResponseBody, err := ioutil.ReadAll(signTransactionResponse.Body)
	if err != nil {
		return "", err
	}

	// Return the signed transaction in hex format
	var signTransaction
```



## 6. Đây là phần tiếp theo của mã Go mẫu để tương tác với API Blockfrost trên Chuỗi khối Cardano.

Sau khi khởi tạo ứng dụng khách API và đặt ID dự án, bạn có thể sử dụng ứng dụng khách để gọi các phương thức khác nhau do API cung cấp.

### Ví dụ: Nhận UTXO của ví

Để lấy danh sách đầu ra giao dịch chưa sử dụng (UTXO) của ví, bạn có thể sử dụng phương GetAddressUtxosthức của ứng dụng khách Blockfrost API.


```javascript
func getAddressUtxos(api *blockfrost.ApiClient, address string) ([]blockfrost_models.UtxoAddress, error) {
    utxos, _, err := api.AddressesApi.GetAddressUtxos(context.Background(), address, nil)
    if err != nil {
        return nil, err
    }
    return utxos, nil
}
```

Hàm này lấy ứng dụng khách API và địa chỉ ví Cardano làm đầu vào, đồng thời trả về một phần `UtxoAddress` và một lỗi Nếu có lỗi, nó sẽ trả về `nilcho` lát và lỗi.

### Ví dụ: Gửi ADA từ ví

Để gửi ADA từ ví, bạn cần tạo một giao dịch và ký tên vào giao dịch đó bằng khóa riêng của ví. Đây là một chức năng ví dụ tạo và ký một giao dịch bằng API Blockfrost.



```javascript
func sendAda(api *blockfrost.ApiClient, privateKey string, fromAddress string, toAddress string, amount int64) (string, error) {
    // Get the current slot
    currentSlot, _, err := api.HealthApi.GetCurrentBackendSlot(context.Background())
    if err != nil {
        return "", err
    }

    // Create the transaction
    tx, _, err := api.TxApi.PostTransactions(context.Background(), blockfrost_models.TxSubmit{
        Inputs: []blockfrost_models.TxInput{
            blockfrost_models.TxInput{
                Address: fromAddress,
            },
        },
        Outputs: []blockfrost_models.TxOutput{
            blockfrost_models.TxOutput{
                Address: toAddress,
                Value:   amount,
            },
        },
        ValidityIntervalStart: currentSlot,
    })
    if err != nil {
        return "", err
    }

    // Sign the transaction
    signedTx, err := cardano.SignTransaction(tx, privateKey)
    if err != nil {
        return "", err
    }

    // Submit the signed transaction
    _, _, err = api.TxApi.PostTransaction(context.Background(), blockfrost_models.TxSubmit{
        TxHash: signedTx,
    })
    if err != nil {
        return "", err
    }

    return signedTx, nil
}
```
Hàm này lấy ứng dụng khách API, khóa riêng của ví, địa chỉ người gửi và người nhận cũng như lượng ADA cần gửi làm đầu vào. Nó trả về hàm băm giao dịch và một lỗi. Nếu có lỗi, nó sẽ trả về một chuỗi trống cho hàm băm giao dịch và lỗi.

Lưu ý rằng đây chỉ là một ví dụ và bạn có thể cần sửa đổi mã để phù hợp với trường hợp sử dụng cụ thể của mình.
