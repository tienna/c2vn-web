---
description: Hướng dẫn cấu hình BP/RL qua cntools
---

# Tạo ví và Pool bằng cntools


 
## Tại sao lại có hướng dẫn này?

Trong khi tự build và cấu hình Block Producer(BP) và Relay (RL) người sử dụng cần thông qua rất nhiều bước đơn lẻ, rời rạc.
Công cụ cntools giúp cho công việc trên đơn giản hơn.


:::caution

**Hướng dẫn này giả định bạn đã cài đặt được Cardano node thành công, nếu bạn cần hỗ trợ có thể tham khảo [tại đây](https://cardano2vn.io/docs/stake-pool-course/handbook/install-cardano-node-written)**
Trong hướng dẫn này chúng tôi sử dụng BP node và RL node có các địa chỉ IP sau:

**BP node IP:	194.233.74.202 **

**RL node IP: 38.242.253.232 **
:::

## Thiết lập port hoạt động cho Cardano node
 
 Port hoạt động của Cardano node được xác định bởi tham số `CNODE_PORT` trong file `/opt/cardano/cnode/scripts ` để sửa bạn có thể dùng trình edit nano
 
 ```bash title=">_ Terminal"
nano /opt/cardano/cnode/scripts/env
```
Sửa tham số CNODE_PORT về giá trị mong muốn, trên hình là port 6000 (port mặc định).
```
CNODE_PORT=6000 
```

Lưu lại file  bằng tổ hợp phím Ctrl+x

 
:::caution

Cần thiết lập việc chạy Cardano node thành một service, mỗi lần khởi động lại hệ điều hành sẽ tự chạy bằng các lệnh sau:
:::
```
/opt/cardano/cnode/scripts/deploy-as-systemd.sh

sudo systemctl restart cnode
```


Dữ liệu dần dần được đồng bộ- việc đồng bộ có thể cần nhiều thời gian, bạn có thể cân nhắc việc copy dữ liệu từ một node khác sẽ 
giúp tiết kiệm thời gian hơn

Khi dịch vụ đã chạy, bạn có thể giám sát bằng lệnh

```
./gLiveView.sh
```



## Cấu hình kết nối
## Trên BP node

Bạn cần chỉnh sửa file `topology.json` để thông báo rằng BP node sẽ kết nối đến những node nào

```bash title=">_ Terminal"
cd $CNODE_HOME/files
nano topology.json
```
Chỉnh sửa lại các file như sau
```
{
  "Producers": [
    {"addr": "38.242.253.232", "port": 6123,"valency": 1}
  ]
}

```
Chọn Ctrl+x  và chọn `y` để lưu file, nếu bạn có nhiều hơn 1 Relay thì file cấu hình sẽ giống như sau


```
{
  "Producers": [
    {"addr": "38.242.253.232","port": 6123,"valency": 1 },
    {"addr": "38.242.253.233","port": 6123,"valency": 1 }
  ]
}
```

Bạn cần chỉnh lại firewall để cho phép BP node kết nối được với RL nodes

```
sudo ufw allow proto tcp from 38.242.253.232 to any port 6123
sudo ufw status
```


## Trên RL node

Bạn cần chỉnh sửa file topologyUpdater script, cụ thể

```
cd $CNODE_HOME/scripts
nano topologyUpdater.sh
```
Đưa địa chỉ IP của BP node vào cột CUSTOM_PEERS cùng với Port mà BP node chạy trên đó

```
CUSTOM_PEERS="194.233.74.202:6123" 
```
Bạn có thể thêm vào các địa chỉ IP của các node đáng tin cậy, khi đó file sẽ như sau
 
```
CUSTOM_PEERS="194.233.74.202:6123|relay2.cardano2vn.io:3001|relay3.cardano2vn.io:3000" 
```
:::caution

relay2.cardano2vn.io:3001|relay3.cardano2vn.io:3000 là các thông tin giả định KHÔNG CÓ THỰC được lấy ra làm ví dụ để bạn hiểu hơn về cách viết file cấu hình
:::

Tiếp theo bạn cần mở firewall để RL node có thể gia tiếp được với các node trên. Mặc định Rule sau của filewall
sẽ cho phép các node giao tiếp với RL node thông qua cổng 6123

```
sudo ufw allow proto tcp from any to any port 6123
```
Kiểm tra lại hoạt động của RL node bằng lệnh

```
cd $CNODE_HOME/scripts
sudo systemctl restart cnode
sudo systemctl status cnode
./gLiveView.sh
```
Nếu Bạn cấu hình đúng, trong gLiveView sẽ hiển thị kết nối giữa BP và RL


