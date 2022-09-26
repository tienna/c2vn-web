---
description: Hướng dẫn tạo ví bằng cntools
---

# Tạo ví và Pool bằng cntools


 
## Tạo ví mới
Chạy công cụ cntool bằng câu lệnh

```bash title=">_ Terminal"
cd $CNODE_HOME/scripts
./cntools.sh
```
Chọn chức năng `wallet` bằng cách bấm phím w hoặc di chuyển đến dòng chữ wallet
![image](https://user-images.githubusercontent.com/34856010/192183418-7f1460f9-0af6-4f43-8f59-8182cfc4daf9.png)

Chọn chức năng tạo mới `New`

![image](https://user-images.githubusercontent.com/34856010/192183501-911b9cae-1fff-4b5b-9dca-c0944a8c316b.png)

Ngày sau khi tao xong bạn có thể kiểm tra việc tồn tại cặp key của ví tại thư mục `/opt/cardano/cnode/priv/wallet/ `

![image](https://user-images.githubusercontent.com/34856010/192183754-7ce24bbe-e597-4dce-881b-83a8e56647e4.png)



## Import ví thông qua Mnemonic
 
Bạn cũng có thể import được ví đã tạo trên Daedalus/Yoroi thông qua 24/25 mnemonic nhờ chức năng import của cntools
 
 ```bash title=">_ Terminal"
cd $CNODE_HOME/scripts
./cntools.sh
```
Chọn chức năng import

![image](https://user-images.githubusercontent.com/34856010/192184011-d1599ddd-64cf-41da-adb6-581c9b5b4fcd.png)

:::caution
1. Bạn cần chuyển tiền tối thiểu 500 ADA để làm tiền cọc cho việc đăng ký (số tiền này sẽ được lấy về khi bạn Retire pool :) ) + số tiền bạn chọn pledge
2. Cần thực hiện phiên chuyển tài sản đến ví và chuyển đi khỏi ví -> đảm bảo bộ key của bạn hoạt động tốt trước khi thực hiện các bước tiếp theo
::: 


## Tạo Metadata file cho pool và upload lên github

Bạn cần tạo một file metadata cho pool của mình theo định dạng json với các thông tin căn bản như sau
```
{
"name":"CARDANO2VN",
"ticker":"C2VN",
"description":"Our Stake pool is running on Raspberry Pi- a very low power consumption infrastructure. Staking to C2VN means you are supporting carbon-neutral blockchains",
"homepage":"https://cardano2vn.io/", 
"telegram": "https://t.me/cardano2vn"
}
```
Trong đó name là tên pool, yicker là tên viết tắt, description là mô tả.

Sau đó upload lên github hoặc website để khi khai báo pool trình khai báo có thể đọc được file này. Ví dụ sau là metadata file được đưa lên github

![image](https://user-images.githubusercontent.com/34856010/192184536-601f6fdf-5282-47e7-8a1f-a99d48dbbd54.png)

![image](https://user-images.githubusercontent.com/34856010/192184617-7b5c84dd-4917-4d1f-bb90-9a45c3211109.png)

## Tạo Pool
Việc tạo Pool được thực hiện qua công cụ cntools nên bạn cần khởi chạy công cụ này trước

 ```bash title=">_ Terminal"
cd $CNODE_HOME/scripts
./cntools.sh
```
Chọn `p` để chọn Pool
![image](https://user-images.githubusercontent.com/34856010/192184858-f6c4fccb-4def-4934-8100-2238c36916bf.png)

Chọn `n` để tạo Pool mới
![image](https://user-images.githubusercontent.com/34856010/192184886-2c57ec82-8d03-4fbe-b112-0accc1e782c8.png)

Nhập vào tên Pool bạn định tạo 

![image](https://user-images.githubusercontent.com/34856010/192185397-61c7aece-969d-4362-bbfd-e5de377322ac.png)

## Đăng ký  Pool
Vẫn trong công cụ cntool, bạn cần đăng ký Pool bằng chức năng Register

![image](https://user-images.githubusercontent.com/34856010/192185788-1170b0fc-ca33-4c90-bf89-a9a913794205.png)

![image](https://user-images.githubusercontent.com/34856010/192185844-5b08f02c-cd8c-4b93-94ca-71cd41a52f90.png)
Bạn cần nhập vào các thông tin cho Pool ở màn hình kế tiếp.
Ở đây bạn cũng được hỏi nhập vào địa chỉ URL chứa Metadata file tạo ở bước trên

![image](https://user-images.githubusercontent.com/34856010/192185969-e4df0a83-dd5f-451a-bf7f-8f37801fe97c.png)


Khi đăng ký thành công, bạn sẽ nhận được thông báo transaction successfully summitted

![image](https://user-images.githubusercontent.com/34856010/192186218-7d563ae0-8648-4251-a48e-f9af9bc07164.png)


 
