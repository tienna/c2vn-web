**Ví người giám hộ**

Trong một số cuộc thảo luận gần đây, có một mong muốn chung là được lấy lại được tiền trong trường hợp chủ sở hữu chính quên chìa khóa hoặc không có khả năng sử dụng nó.

Vì vậy, các yêu cầu như sau
1) Có chữ ký chính. Đây là chủ sở hữu của địa chỉ này
2) Chủ sở hữu có thể ký giao dịch và chi tiêu bất cứ lúc nào
3) Chủ sở hữu sẽ quyết định người giám hộ. Thông thường, đây phải là 3 người bảo vệ và cần ít nhất 2 người để phục hồi.
4) Chữ ký của người giám hộ có thể được đặt với thời gian chờ. Vì vậy, trước khi hết thời gian, những người bảo vệ không thể sử dụng chìa khóa của họ. Chỉ chủ sở hữu chính mới có thể chi tiêu
5) Nếu chủ sở hữu chính muốn gia hạn thời gian chờ thì có thể thực hiện được với cùng một nhóm người giám hộ nhưng thời gian chờ được đẩy sang tương lai.


**Cách tiếp cận**

Thông thường các hợp đồng thông minh được sử dụng để tạo các loại địa chỉ này. Chúng còn được gọi là ví xã hội cung cấp nhiều khả năng hơn. Ý tưởng ở đây là không cung cấp ví xã hội. Thay vào đó, mục tiêu là chủ sở hữu chính không phải lo lắng về việc mất chìa khóa hoặc người giám hộ có thể giúp đỡ trong trường hợp tử vong/bị thương.
Tự nuôi con luôn là tốt nhất. Tuy nhiên, nhiều usecase cần người giám hộ.

Thay vì sử dụng hợp đồng thông minh, chúng tôi sử dụng tập lệnh gốc. Cardano có các tập lệnh gốc có một số tính năng hay nhưng rất dễ xác minh không giống như các hợp đồng thông minh.
Vì vậy, khả năng của tập lệnh gốc mà chúng tôi sử dụng là
1) Người ký đơn
2) Tạo kịch bản của một kịch bản khác
3) Cấu hình thời gian trờ
4) m chữ ký của n người giám hộ

Đây là tệp mẫu giúp tạo địa chỉ tập lệnh có tính đến các yêu cầu từ 1 đến 4 ở trên chạy file `02-policy-script.sh`

```json
{
  "type": "any",
  "scripts":
  [
    {
      "type": "sig",
      "keyHash": "Hash of Primary Key"
    },
    {
      "type": "all",
      "scripts":
      [
        {
          "type": "after",
          "slot": slot number
        },
        {
          "type": "atLeast",
          "required": 2,
          "scripts":
          [
            {
              "type": "sig",
              "keyHash": "guardian 1"
            },
            {
              "type": "sig",
              "keyHash": "guardian 2"
            },
            {
              "type": "sig",
              "keyHash": "guardian 3"
            }
          ]
        }
      ]
    }
  ]
}
```

Tập tin script này nói gì
1) Cho phép chủ sở hữu chính chi tiêu bất cứ lúc nào
2) Hoặc sau thời gian chờ `slot number` cho phép chi tiêu nếu 2 trong số 3 người giám hộ ký tên

## Các bước thực hiện

Các file có thể tham khảo tại [github cardano2vn](https://github.com/cardano2vn/multi-sign.git)

Chạy 3 file này. 
- file ./01-keys.sh để tạo key cho 4 ví (1 ví trính chủ và 3 ví giám hộ).
- file ./02-policy-script.sh  tạo script với điều kiện như SLOT bao nhiêu để mở khóa giám hộ, 2/3 ví giám hộ là ký được giao dịch , ví chủ sở hữu...
- file ./03-script-addr.sh tạo địa chỉ ví addrxxx

  ./01-keys.sh
  ./02-policy-script.sh
  ./03-script-addr.sh

  cat wallet/script.addr
  
   lấy địa chỉ [vào web](https://www.cardano2vn.io/docs/integrate-cardano/testnet-faucet) lây tADA về thử nghiệm
   
   
   nano 04-transaction.sh xem và chỉnh sửa giao dịch (số tiền chuyển, đỉa chỉ ví cần chuyển đến) sau đó chạy các file sau để hoàn tất giao dịch.
   
  ./04-transaction.sh
  ./05-witness.sh
  ./06-submit.sh

   


The scripts to generate and run are in this folder
