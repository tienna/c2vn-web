---
description: Hướng dẫn tạo Pool bằng cntools
---
# Cấu hình BP node và bảo vệ các file quan trọng
## Định nghĩa Node là Block Producers


Sau khi Pool đã được khai báo, bạn cần cập nhật lại file env của BP node

```bash title=">_ Terminal"
cd $CNODE_HOME/scripts 
nano env 
```

Sửa  tên POOL_NAME là tên thư mục trong $CNODE_HOME/priv/pool/

```bash title=">_ Terminal"
#POOL_NAME=""  
POOL_NAME="C2VN" 
```
Lưu lại file bằng tổ hợp phím Ctrl+x và chọn y để lưu.

Bạn kiểm tra lại trạng thái bằng cách chạy gLiveview.

```bash title=">_ Terminal"
cd $CNODE_HOME/scripts/
./gLiveView.sh 
```
 ![image](https://user-images.githubusercontent.com/34856010/192187350-639adf3a-9cec-461f-9cef-1b3b44ba2217.png)

Khi cấu hình đúng, bạn sẽ thấy BP lúc này là Core node trên Mainnet :) 
gLiveview cũng chỉ thị rõ quá trình một Epoch đang hoạt động
Nếu bạn đã đến được bước này --- **Chúc mừng bạn đã thành công**

## Định nghĩa Node là Block Producers:

Các file quan trọng của đều nằm trong thư mục `$CNODE_HOME/priv`
Trong đó, thư mục:

- wallet - chứa các thông tin về ví, nó chứa cả key public lẫn private nếu bạn chưa chỉnh sửa
- pool - Chứa các thông tin về pool, nó chứa cả key public lẫn private nếu bạn chưa chỉnh sửa

:::caution

**Vậy nên: cần lưu trữ các Private key một cách cận thận, lời khuyên của chúng tôi là: **
**1- Đưa các file Private key (.skey) về AIR GAP server nếu có thể**
**2- Nếu buộc phải để online- Cần encrypt chúng lại**
:::


Có các Keys quan trọng sau:
	wallet/walletname/payment.skey   --> file này có thể download về và lưu trữ ở AIR GAP. các bạn có thể tìm cho mình một phương pháp lưu trữ có mã hóa
	wallet/walletname/stake.skey     --> file này có thể download về và lưu trữ ở AIR GAP. các bạn có thể tìm cho mình một phương pháp lưu trữ có mã hóa
	cold.skey                        --> file này có thể download về và lưu trữ ở AIR GAP. các bạn có thể tìm cho mình một phương pháp lưu trữ có mã hóa
	kes.skey     --> file này phải có ở server online để đảm bảo hoạt động 
	vrf.skey      --> file này phải có ở server online để đảm bảo hoạt động 

