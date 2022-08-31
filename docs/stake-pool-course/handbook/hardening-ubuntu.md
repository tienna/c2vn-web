---
description: Các bước đơn giản để tăng cường bảo mật cho Ubuntu Server
---

# Tăng cường bảo mật cho Ubuntu Server

> *Cảm ơn bạn đã hỗ trợ và ủng hộ chúng tôi! việc bạn quan tâm tới bài viết này thực sự tiếp thêm năng lượng cho chúng tôi để tiếp tục tạo ra các hướng dẫn tốt nhất cho cộng đồng.*


## :key:**Yêu cầu căn bản**

* Ubuntu Server hoặc bản Ubuntu Desktop đã được cài đặt.
* Dịch vụ SSH đã được cấu hình và đang hoạt động.
* Bạn có  SSH client hoặc terminal window để đăng nhập.

Nếu bạn cần tìm hiểu cách cài đặt SSH server, tham khảo [ở đây](https://www.simplified.guide/ubuntu/install-ssh-server):

Nếu bạn cần tìm hiểu về cách dùng SSH client, tham khảo [ở đây](https://www.howtogeek.com/311287/how-to-connect-to-an-ssh-server-from-windows-macos-or-linux/):

## :key:**Sử dụng tài khoản non-root**


Hay tạo thói quen đăng nhập vào máy chủ của bạn bằng tài khoản không phải root. Điều này sẽ ngăn chặn việc vô tình xóa tệp nếu bạn làm sai. Ví dụ: lệnh rm có thể xóa toàn bộ file trên máy chủ của bạn nếu người dùng root sử dụng sai cách.


**Khuyến nghị**: Đừng sử dụng tài khoản root. Nên dùng `su` hoặc `sudo`.


SSH tới server của bạn

```bash
ssh username@server.public.ip.address
# example
# ssh myUsername@77.22.161.10
```

Tạo một tài khoản với tên cardano

```
useradd -m -s /bin/bash cardano
```

Đặt mật khẩu cho cardano user

```
passwd cardano
```

Đưa tài khoản cardano vào nhóm sudo 

```
usermod -aG sudo cardano
```

## <a name="ufw"></a>:bricks:  **Chỉ sử dụng SSH Keys**

Chúng tôi có các lời khuyên sau khi bạn sử dụng dịch vụ SSH:

* Không dùng mật khẩu để đăng nhập SSH (Sử dụng private key)
* Không cho phép tài khoản root sử dụng SSH (dùng các tài khoản khác sau đó `su` hoặc `sudo` sang tài khoản root)
* Khi bạn dùng lệnh `sudo` cho các tài khoản đăng nhập, hệ thống sẽ ghi nhận các lệnh của tài khoản này.
* Khi nhận các lần đăng nhập lỗi ( cân nhắc việc sử dụng phần mềm chặn hoặc cấm người dùng cố tình đăng nhập nhiều lần, như phần mềm fail2ban)
* Cấm SSH đến từ một địa chỉ IP, dải IP nếu bạn thấy nghi ngờ

Bạn nên chọn kiểu mã hóa [ED25519 or RSA](https://goteleport.com/blog/comparing-ssh-keys/) cho  **cặp file**. quan trọng

Với kiểu mã hóa ED25519 câu lệnh trên linux là
```
ssh-keygen -t ed25519
```
với kiểu mã hóa RSA câu lệnh trên linux là
``` bash
ssh-keygen -t rsa -b 4096
```

chuyển ** khóa công khai -public key** tới server. Cập nhật lại  **tên khóa** bằng lệnh

``` bash
ssh-copy-id -i $HOME/.ssh/<keyname>.pub cardano@server.public.ip.address
```

Đăng nhập vào máy chủ với tài khoản cardano

```
ssh cardano@server.public.ip.address
```

Cấm tài khoản root đăng nhập và cấm dùng mật khẩu bằng cách soạn lại file `/etc/ssh/sshd_config`

```
sudo nano /etc/ssh/sshd_config
```

Tìm đến dòng **ChallengeResponseAuthentication** và sửa thành `no`

```
ChallengeResponseAuthentication no
```

Tìm đến dòng  **PasswordAuthentication** và sửa thành `no`

```
PasswordAuthentication no 
```

Tìm đến dòng  **PermitRootLogin** và sửa thành  `no`

```
PermitRootLogin no
```

Tìm đến dòng  **PermitEmptyPasswords** và sửa thành `no`

```
PermitEmptyPasswords no
```

**Tăng cường bảo mật**: Tìm đến từ khóa **Port ** và sửa thành một cổng chưa được sử dụng


Sử dụng một cổng **ngẫu nhiên** từ 1024 tới 49141. [tham khảo cách kiểm tra ở đây.](https://en.wikipedia.org/wiki/List\_of\_TCP\_and\_UDP\_port\_numbers)


```php
Port <port number>
```

Sau khi đổi port cho dịch vụ SSH bạn có thể kiểm tra cấu hình SSH bằng lệnh

```
sudo sshd -t
```
Nếu không thấy báo lỗi, bạn khởi động lại dịch vụ SSH bằng lệnh


```
sudo systemctl restart sshd
```

Đảm bảo rằng SSH vẫn hoạt động bằng cách ssh với port mới đổi

```bash
ssh cardano@server.public.ip.address -p <custom port number>
```
Bạn có thể sử dụng tùy chọn -i để chỉ ra file key mình sử dụng

```bash
ssh -i <path to your SSH_key_name.pub> cardano@server.public.ip.address -p <custom port number>
```


**Mẹo hay**: để đơn giản việc đăng nhập bạn có thể khai báo các tham số về IP, Port, User  trong file `$HOME/.ssh/config`:

```bash
  Host cardano-server
  User cardano
  HostName <server.public.ip.address>
  Port <custom port number>
```

và sau đó chỉ cần gõ lênh `ssh cardano-server` thay vì gõ đầy đủ các tham số như trước đây.

## :bricks:**Cập nhật bản vá hệ điều hành**

Cập nhật bản vá các phần mềm trên máy chủ và hệ điều hành sẽ giúp ngăn trặn kẻ tấn công đăng nhập vào máy chủ. Với Ubuntu câu lệnh bạn cần chạy làm

```bash
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get autoremove
sudo apt-get autoclean
```
Kích hoạt chế độ tự động cài đặt bản vá bằng lệnh: 

```
sudo apt-get install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```
Bạn có thể tham khảo thêm hướng dẫn [Thiết lập cài đặt và nâng cấp tự động cho Ubuntu 20.04](https://www.linuxcapable.com/how-to-setup-configure-unattended-upgrades-on-ubuntu-20-04/), for example.


## :no_entry_sign:** Vô hiệu hóa tài khoản root**
Để đảm bảo an ninh cho máy chủ, tài khoản root KHÔNG nên sử dụng thường xuyên. Khi cần bạn có thể sử dụng `sudo` để có quyền root. Cách vô hiệu hóa đăng nhập cho tài 
khoản root như sau: 

```bash
# để vô hiệu hóa tài khoản root đặng nhập, bạn sử dụng tùy chọn -l như sau:
sudo passwd -l root
```

```bash
# Khi cần cho phép đăng nhập trở lại, hãy sử dụng tùy chọn -u như sau:
sudo passwd -u root
```

## :hammer: **Xác thực 2 yêu tố cho SSH**

Bởi SSH thường được sử dụng để đăng nhập vào máy chủ, nên việc sử dụng xác thực 2 yếu tố luôn được khuyến nghị nhằm đảm bảo an ninh cho hệ thống và dữ liệu.
Các cấu hình như sau 
Cài đặt module google authen 
```
sudo apt install libpam-google-authenticator -y
```

Sửa file `/etc/pam.d/sshd`:

```
sudo nano /etc/pam.d/sshd 
```

và thêm vào dòng:

```
auth required pam_google_authenticator.so
```
Và khởi động lại dịch vụ ssh bằng lệnh: 

```
sudo systemctl restart sshd.service
```

Sửa file   `/etc/ssh/sshd_config`

```
sudo nano /etc/ssh/sshd_config
```

Tìm đến đoạn **ChallengeResponseAuthentication** và sửa thành `yes`

```
ChallengeResponseAuthentication yes
```

Tìm đến đoạn**UsePAM** và sửa thành `yes`

```
UsePAM yes
```
Lưu lại file cấu hình và chạy lệnh **google-authenticator** .

```
google-authenticator
```

Chương trình sẽ hỏi bạn nhiều câu hỏi, đây là nhưng câu trả lời bạn phải chọn:

* Make tokens “time-base”": yes
* Update the `.google_authenticator` file: yes
* Disallow multiple uses: yes
* Increase the original generation time limit: no
* Enable rate-limiting: yes

Bạn sẽ nhận được thông báo mã QR trong quá trình cài đặt và mã cào khẩn cấp(emergency scratch codes). Hãy lưu lại nó một cách an toàn 
Bây giờ, hãy mở Google Authenticator trên điện thoại của bạn và thêm khóa bí mật của bạn để xác thực hai yếu tố hoạt động.


**Lưu ý**: Nếu bạn thiết lập 2FA trên máy từ xa mà bạn muốn sử dụng  SSH bạn phải thực hiện thêm bước **s2 và 3** của [hướng dẫn này](https://www.digitalocean.com/community/tutorials/how-to-set-up-multi-factor-authentication-for-ssh-on-ubuntu-18-04).

## :jigsaw: **Bảo vệ bộ nhớ chia sẻ**


Các thiết lập [bảo vệ bộ nhớ chia sẻ](https://www.lifewire.com/what-is-random-access-memory-ram-2618159) used on the system. If you're unaware, shared memory can be used in an attack against a running service. Because of this, secure that portion of system memory.

Tìm hiểu thêm về [secure shared memory tại đây](https://www.techrepublic.com/article/how-to-enable-secure-shared-memory-on-ubuntu-server/).



#### Ngoại lệ

Có một số trường hợp bạn phải thiết lập bộ nhớ ở chế độ đọc/ghi. khi đó bạn cần mở file `/etc/fstab` và chỉnh nội dung thành:

```
none /run/shm tmpfs rw,noexec,nosuid,nodev 0 0
```


#### Sử dụng với lưu ý

Với một số thử nghiệm và lỗi, bạn có thể phát hiện ra một số ứng dụng (** như Chrome **) không hoạt động với bộ nhớ dùng chung ở chế độ chỉ đọc

Nguồn tham khảo: [techrepublic.com](https://www.techrepublic.com/article/how-to-enable-secure-shared-memory-on-ubuntu-server/)


Khi đó bạn cần chỉnh sửa lại file `/etc/fstab`

```
sudo nano /etc/fstab
```

và thêm vào dòng sau đây.

```
tmpfs	/run/shm	tmpfs	ro,noexec,nosuid	0 0
```

Bạn cần khởi động lại máy chủ để thay đổi trên có hiệu lực.

```
sudo reboot
```

## :chains: **Cài đặt fail2ban**


Fail2ban là một hệ thống phòng chống xâm nhập giám sát các file log và tìm kiếm các mẫu cụ thể tương ứng với một lần đăng nhập không thành công. Nếu một số lần đăng nhập không thành công nhất định được phát hiện từ một địa chỉ IP cụ thể (trong một khoảng thời gian cụ thể), fail2ban sẽ chặn quyền truy cập từ địa chỉ IP đó.

Cách thức cài đặt gồm có:

```
sudo apt-get install fail2ban -y
```

Mở file và đưa vào theo rõi dịch vụ SSH.

```
sudo nano /etc/fail2ban/jail.local
```

Thêm dòng sau vào cuối file


:fire: **Liệt kê các IP, dải IP không sử dụng fail2ban**: 
Tham số `ignoreip` cho phép các địa chỉ IP, dải IP hoặc tên miền DNS mà bạn chỉ định được phép kết nối SSH. Đây là nơi bạn chỉ định IP, dải IP cục bộ hoặc tên miền, các têm được phân tách bằng dấu cách.


```
# Exampleignoreip = 192.168.1.0/24 127.0.0.1/8 
```


```bash
[sshd]
enabled = true
port = <22 or your random port number>
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
# whitelisted IP addresses
ignoreip = <list of whitelisted IP address, your local daily laptop/pc>
```
Lưu lại file và khởi động lại dịch vụ fail2ban để có hiệu lực.

```
sudo systemctl restart fail2ban
```

## :bricks: **Cấu hình tường lửa**

Mặc định tường lửa (UFW) không chạy, nó có thể sử dụng để quản lý các kết nối đến máy chủ.
Đây là các port cẳn bản mà một Cardano node thường dùng ** lưu ý nếu bạn đổi port mặc định**

* Port 22 (or your random port #) TCP cho kết nối tới dịch vụ SSH
* Port 123 UDP chọ kết nối đến dịch vụ ntp
* Port 6000 cho kết nối p2p traffic
* Port 3000 TCP cho kết nối Grafana web server (if applicable)
* Port 9100 tcp cho kết nối Prometheus node data
* Port 12798 tcp cho kết nối Prometheus cardano-node metrics data

```bash
# Mặc định sẽ cấm mọi dữ liệu đi và đến 
sudo ufw default deny incoming
sudo ufw default allow outgoing
# Cho phép các kết nối đến cổng dịch vụ 22
sudo ufw allow ssh #<port 22 or your random ssh port number>/tcp
# Cho phép các kết nối đến cổng dịch vụ p2p port
sudo ufw allow 6000/tcp
# kích hoạt tường lửa
sudo ufw enable
```

```bash
# Kiểm tra trạng thái tường lửa bằng lệnh
sudo ufw status numbered
```


>**Đừng để dịch vụ Grafana (port 3000) và Prometheus (port 9100 and 12798) ra internet. Các hacker có thể tấn công qua các cổng này!**


**Mẹo hay - Cấu hình SSH tunnel tới Grafana server**

Thiết lập SSH tunnel tới Granfana bằng lệnh :

```
ssh -L 3000:localhost:3000 <user>@<your-server-ip-or-dns>
```

Hoặc, nếu bạn dùng putty để đăng nhập SSH bạn có thể cấu hình Tunel ssh như sau. Đảm bảo rằng bạn chọn nút "Add" và lưu vào thành profile của Putty.

![](img/putty-tunnel.png)


Giờ thì bạn có thể đăng nhập vào Granfana thông qua địa chỉ http://localhost:3000

Chỉ mở các cổng sau trên các server cho các thiết bị phía sau tường lửa. Điều này không bắt buộc nếu sử dụng phương pháp đường hầm SSH ở trên.


:fire: **Rất nguy hiểm nếu mở các port này trên VPS/cloud node.**

```bash
# Allow grafana web server port
sudo ufw allow 3000/tcp
# Allow prometheus endpoint port
sudo ufw allow 9100/tcp
# Allow prometheus cardano-node metric data port
sudo ufw allow 12798/tcp
```

Đảm bảo rằng chỉ có các thiết lập sau hoạt động.

> ```csharp
>      To                         Action      From
>      --                         ------      ----
> [ 1] 22/tcp                     ALLOW IN    Anywhere
> [ 2] 3000/tcp                   ALLOW IN    Anywhere
> [ 3] 6000/tcp                   ALLOW IN    Anywhere
> [ 4] 22/tcp (v6)                ALLOW IN    Anywhere (v6)
> [ 5] 3000/tcp (v6)              ALLOW IN    Anywhere (v6)
> [ 6] 6000/tcp (v6)              ALLOW IN    Anywhere (v6)
> ```

**\[ Khuyến cáo ]** Cho phép đăng nhập từ một máy có IP cố định để phục vụ việc cầu hình, quản lý bằng câu lệnh:

```bash
sudo ufw allow from <địa chỉ IP laptop/pc của bạn>
# Ví dụ
# sudo ufw allow from 192.168.50.22
```


### :bricks: Tăng cường cho Block Producer 

Chỉ cho phép Relay Node(s) có quyền kết nối đến Block Producer (BP) Node. Câu lệnh sau sẽ giúp bạn làm điều đó

```bash
sudo ufw allow proto tcp from <RELAY NODE IP> to any port <BLOCK PRODUCER PORT>
# Example
# sudo ufw allow proto tcp from 18.58.3.31 to any port 6000
```

### :bricks: Tăng cường cho Relay Nodes

Để bảo vệ Relay Node(s) từ các cuộc  tấn công "DoS/Syn" [**Michael Fazio**](https://github.com/michaeljfazio)
Tạo ra các bản ghi cấm các kết nối tới một port nhất định có từ năm kết nối trở lên từ một IP

Thay `<RELAY NODE PORT>` bằng port mà Relay chạy, thay số 5 bằng giới hạn bạn đặt ra.

```bash
sudo iptables -I INPUT -p tcp -m tcp --dport <RELAY NODE PORT> --tcp-flags FIN,SYN,RST,ACK SYN -m connlimit --connlimit-above 5 --connlimit-mask 32 --connlimit-saddr -j REJECT --reject-with tcp-reset
```

Đặt giới hạn kết nối đủ cao để kế nối giữa Relay/BP của bạn vẫn hoạt động bình thường

Bạn có thể kiểm tra các kết nối hiện tại của mình với một danh sách được sắp xếp. Thay đổi số cổng của nút chuyển tiếp, nếu cần.

```bash
sudo netstat -enp | grep ":6000" | awk {'print $5'} | cut -d ':' -f 1 | sort | uniq -c | sort
```

## :telescope: **Kiểm tra lại các Ports đang mở**

Nếu bạn muốn duy trì một máy chủ an toàn, bạn cần kiểm soát các cổng đang mở

```
netstat -tulpn
```

```
ss -tulpn
```


Trên đây là các kỹ thuật chúng tôi khuyến cáo bạn sử dụng để đảm bảo an toàn cho BP/Relay nodes trên mạng lưới Cardano.

## :rocket: **Tham khảo**

:::tip
**Bài viết gốc lấy từ** https://github.com/cardano2vn/cardanovn-portal/new/main/docs/stake-pool-course/handbook 
:::

https://medium.com/@BaneBiddix/how-to-harden-your-ubuntu-18-04-server-ffc4b6658fe7

https://linux-audit.com/ubuntu-server-hardening-guide-quick-and-secure/

https://www.digitalocean.com/community/tutorials/how-to-harden-openssh-on-ubuntu-18-04

https://ubuntu.com/tutorials/configure-ssh-2fa#1-overview

[https://gist.github.com/lokhman/cc716d2e2d373dd696b2d9264c0287a3#file-ubuntu-hardening-md](https://gist.github.com/lokhman/cc716d2e2d373dd696b2d9264c0287a3#file-ubuntu-hardening-md)

https://www.lifewire.com/harden-ubuntu-server-security-4178243

https://www.ubuntupit.com/best-linux-hardening-security-tips-a-comprehensive-checklist/
