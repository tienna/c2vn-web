---
description: Các bước đơn giản để tăng cường bảo mật cho Ubuntu Server
---

# Tăng cường bảo mật cho Ubuntu Server

Cảm ơn bạn đã hỗ trợ và ủng hộ chúng tôi! việc bạn quan tâm tới bài viết này thực sự tiếp thêm năng lượng cho chúng tôi để tiếp tục tạo ra các hướng dẫn tốt nhất cho cộng đồng.


## Yêu cầu căn bản

* Ubuntu Server hoặc bản Ubuntu Desktop đã được cài đặt.
* Dịch vụ SSH đã được cấu hình và đang hoạt động.
* Bạn có  SSH client hoặc terminal window để đăng nhập.

Nếu bạn cần tìm hiểu cách cài đặt SSH server, tham khảo [ở đây](https://www.simplified.guide/ubuntu/install-ssh-server):

Nếu bạn cần tìm hiểu về cách dùng SSH client, tham khảo [ở đây](https://www.howtogeek.com/311287/how-to-connect-to-an-ssh-server-from-windows-macos-or-linux/):

## Tạo tài khoản không phải root với quyền sudo


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

## <a name="ufw"></a>:bricks:  **Không xác thực bằng mật khẩu khi dùng SSH, chỉ sử dụng SSH Keys**

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

Tìm đến dòn  **PermitRootLogin** và sửa thành  `prohibit-password`

```
PermitRootLogin prohibit-password
```

Tìm đến dòn  **PermitEmptyPasswords** và sửa thành `no`

```
PermitEmptyPasswords no
```

**Tăng cường bảo mật**: Tìm đến từ khóa **Port ** và sửa thành một cổng chưa được sử dụng


Sử dụng một cổng **ngẫu nhiên** từ 1024 tới 49141. [tham khảo cách kiểm tra ở đây.](https://en.wikipedia.org/wiki/List\_of\_TCP\_and\_UDP\_port\_numbers)


```bash
Port <port number>
```

Validate the syntax of your new SSH configuration.

```
sudo sshd -t
```

If no errors with the syntax validation, restart the SSH process.

```
sudo systemctl restart sshd
```

Verify the login still works

{% tabs %}
{% tab title="Standard SSH Port 22
```
ssh cardano@server.public.ip.address
```
{% endtab %}

{% tab title="Custom SSH Port
```bash
ssh cardano@server.public.ip.address -p <custom port number>
```
{% endtab %}
{% endtabs %}


Alternatively, add the `-p <port#>` flag if you used a custom SSH port.

```bash
ssh -i <path to your SSH_key_name.pub> cardano@server.public.ip.address
```


**Optional**: Make logging in easier by updating your local ssh config.

To simplify the ssh command needed to log in to your server, consider updating your local `$HOME/.ssh/config` file:

```bash
Host cardano-server
  User cardano
  HostName <server.public.ip.address>
  Port <custom port number>
```

This will allow you to log in with `ssh cardano-server` rather than needing to pass through all ssh parameters explicitly.

## :robot: **Updating Your System**


It's critically important to keep your system up-to-date with the latest patches to prevent intruders from accessing your system.


```bash
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get autoremove
sudo apt-get autoclean
```

Enable automatic updates so you don't have to manually install them.

```
sudo apt-get install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```


By default when enabled, the `unattended-upgrades` service only installs security updates automatically. For details on configuring unattended upgrades, see [How to Setup & Configure Unattended Upgrades on Ubuntu 20.04](https://www.linuxcapable.com/how-to-setup-configure-unattended-upgrades-on-ubuntu-20-04/), for example.


## :teddy\_bear: Disabling the root Account

System admins should not frequently log in as root in order to maintain server security. Instead, you can use sudo execute that require low-level privileges.

```bash
# To disable the root account, simply use the -l option.
sudo passwd -l root
```

```bash
# If for some valid reason you need to re-enable the account, simply use the -u option.
sudo passwd -u root
```

## :tools: Configuring Two Factor Authentication for SSH


SSH, the secure shell, is often used to access remote Linux systems. Because we often use it to connect with computers containing important data, it’s recommended to add another security layer. Here comes the two factor authentication (_2FA_).


```
sudo apt install libpam-google-authenticator -y
```

To make SSH use the Google Authenticator PAM module, edit the `/etc/pam.d/sshd` file:

```
sudo nano /etc/pam.d/sshd 
```

Add the follow line:

```
auth required pam_google_authenticator.so
```

Now you need to restart the `sshd` daemon using:

```
sudo systemctl restart sshd.service
```

Modify `/etc/ssh/sshd_config`

```
sudo nano /etc/ssh/sshd_config
```

Locate **ChallengeResponseAuthentication** and update to yes

```
ChallengeResponseAuthentication yes
```

Locate **UsePAM** and update to yes

```
UsePAM yes
```

Save the file and exit.

Run the **google-authenticator** command.

```
google-authenticator
```

It will ask you a series of questions, here is a recommended configuration:

* Make tokens “time-base”": yes
* Update the `.google_authenticator` file: yes
* Disallow multiple uses: yes
* Increase the original generation time limit: no
* Enable rate-limiting: yes

You may have noticed the giant QR code that appeared during the process, underneath are your emergency scratch codes to be used if you don’t have access to your phone: write them down on paper and keep them in a safe place.

Now, open Google Authenticator on your phone and add your secret key to make two factor authentication work.


**Note**: If you are enabling 2FA on a remote machine that you access over SSH you need to follow **steps 2 and 3** of [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-multi-factor-authentication-for-ssh-on-ubuntu-18-04) to make 2FA work.


## :jigsaw: Securing Shared Memory


One of the first things you should do is secure the shared [memory](https://www.lifewire.com/what-is-random-access-memory-ram-2618159) used on the system. If you're unaware, shared memory can be used in an attack against a running service. Because of this, secure that portion of system memory.

To learn more about secure shared memory, read this [techrepublic.com article](https://www.techrepublic.com/article/how-to-enable-secure-shared-memory-on-ubuntu-server/).



#### One exceptional case

There may be a reason for you needing to have that memory space mounted in read/write mode (such as a specific server application like \*\*Chrome \*\*that requires such access to the shared memory or standard applications like Google Chrome). In this case, use the following line for the fstab file with instructions below.

```
none /run/shm tmpfs rw,noexec,nosuid,nodev 0 0
```

The above line will mount the shared memory with read/write access but without permission to execute programs, change the UID of running programs, or to create block or character devices in the namespace. This a net security improvement over default settings.

#### Use with caution

With some trial and error, you may discover some applications(**like Chrome**) do not work with shared memory in read-only mode. For the highest security and if compatible with your applications, it is a worthwhile endeavor to implement this secure shared memory setting.

Source: [techrepublic.com](https://www.techrepublic.com/article/how-to-enable-secure-shared-memory-on-ubuntu-server/)


Edit `/etc/fstab`

```
sudo nano /etc/fstab
```

Insert the following line to the bottom of the file and save/close.

```
tmpfs	/run/shm	tmpfs	ro,noexec,nosuid	0 0
```

Reboot the node in order for changes to take effect.

```
sudo reboot
```

## :chains: **Installing fail2ban**


Fail2ban is an intrusion-prevention system that monitors log files and searches for particular patterns that correspond to a failed login attempt. If a certain number of failed logins are detected from a specific IP address (within a specified amount of time), fail2ban blocks access from that IP address.


```
sudo apt-get install fail2ban -y
```

Edit a config file that monitors SSH logins.

```
sudo nano /etc/fail2ban/jail.local
```

Add the following lines to the bottom of the file.


:fire: **Whitelisting IP address tip**: The `ignoreip` parameter accepts IP addresses, IP ranges or DNS hosts that you can specify to be allowed to connect. This is where you want to specify your local machine, local IP range or local domain, separated by spaces.

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

Save/close file.

Restart fail2ban for settings to take effect.

```
sudo systemctl restart fail2ban
```

## <a name="ufw"></a>:bricks: **Configuring Your Firewall**

The standard UFW firewall can be used to control network access to your node.

With any new installation, ufw is disabled by default. Enable it with the following settings.

* Port 22 (or your random port #) TCP for SSH connection
* Port 123 UDP for chrony ntp
* Port 6000 TCP for p2p traffic
* Port 3000 TCP for Grafana web server (if applicable)
* Port 9100 tcp for Prometheus node data
* Port 12798 tcp for Prometheus cardano-node metrics data

```bash
# By default, deny all incoming and outgoing traffic
sudo ufw default deny incoming
sudo ufw default allow outgoing
# Allow ssh access
sudo ufw allow ssh #<port 22 or your random ssh port number>/tcp
# Allow cardano-node p2p port
sudo ufw allow 6000/tcp
# Enable firewall
sudo ufw enable
```

```bash
# Verify status
sudo ufw status numbered
```


Do not expose Grafana (port 3000) and Prometheus endpoint (port 9100 and 12798) to the public internet as this invites a new attack surface!


**Better idea - SSH tunnel to Grafana server**

Setup a SSH tunnel with the following command:

```
ssh -L 3000:localhost:3000 <user>@<your-server-ip-or-dns>
```

Alternatively, If using Putty for SSHing, you can configure the tunnel as follows. Make sure to click "Add" and save your new profile settings.

![](img/putty-tunnel.png)


Now you can access the Grafana server from your local machine's browser by visiting http://localhost:3000


Only open the following ports on nodes behind a network firewall. This is not required if using the above SSH tunnel method.

:fire: **It is dangerous to open these ports on a VPS/cloud node.**

```bash
# Allow grafana web server port
sudo ufw allow 3000/tcp
# Allow prometheus endpoint port
sudo ufw allow 9100/tcp
# Allow prometheus cardano-node metric data port
sudo ufw allow 12798/tcp
```

Confirm the settings are in effect.

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

**\[ Optional but recommended ]** Whitelisting (or permitting connections from a specific IP) can be setup via the following command.

```bash
sudo ufw allow from <your local daily laptop/pc>
# Example
# sudo ufw allow from 192.168.50.22
```


:confetti\_ball: **Port Forwarding Tip:** You'll need to forward and open ports to your validator. Verify it's working with [https://www.yougetsignal.com/tools/open-ports/](https://www.yougetsignal.com/tools/open-ports/) or [https://canyouseeme.org/](https://canyouseeme.org) .


### :bricks: Additional Hardening Rules for a Block-producing Node

Only your Relay Node(s) should be permitted access to your Block Producer Node.

```bash
sudo ufw allow proto tcp from <RELAY NODE IP> to any port <BLOCK PRODUCER PORT>
# Example
# sudo ufw allow proto tcp from 18.58.3.31 to any port 6000
```

### :bricks: Additional Hardening Rules for Relay Nodes

In order to protect your Relay Node(s) from a novel "DoS/Syn" attack, [**Michael Fazio**](https://github.com/michaeljfazio) created iptables entry which restricts connections to a given destination port to 5 connections from the same IP.

Replace `<RELAY NODE PORT>` with your public relay port, replace the 5 with your preferred connection limit.

```bash
sudo iptables -I INPUT -p tcp -m tcp --dport <RELAY NODE PORT> --tcp-flags FIN,SYN,RST,ACK SYN -m connlimit --connlimit-above 5 --connlimit-mask 32 --connlimit-saddr -j REJECT --reject-with tcp-reset
```


Set the connection limit high enough so that your internal relay/block producer node topology remains functional.


You can check you current connections with a sorted list. Change the relay node port number, if needed.

```bash
sudo netstat -enp | grep ":6000" | awk {'print $5'} | cut -d ':' -f 1 | sort | uniq -c | sort
```

## :telescope: Verifying Listening Ports

If you want to maintain a secure server, you should validate the listening network ports every once in a while. This will provide you essential information about your network.

```
netstat -tulpn
```

```
ss -tulpn
```


Congrats on completing the guide. :sparkles:

Did you find our guide useful? Send us a signal with a tip and we'll keep updating it.

It really energizes us to keep creating the best crypto guides.

Use [cointr.ee to find our donation ](https://cointr.ee/coincashew)addresses. :pray:

Any feedback and all pull requests much appreciated. :first\_quarter\_moon\_with\_face:

Hang out and chat with our stake pool community on Telegram @ [https://t.me/coincashew](https://t.me/coincashew)


## :rocket: References
Credit to https://github.com/cardano2vn/cardanovn-portal/new/main/docs/stake-pool-course/handbook 
https://medium.com/@BaneBiddix/how-to-harden-your-ubuntu-18-04-server-ffc4b6658fe7

https://linux-audit.com/ubuntu-server-hardening-guide-quick-and-secure/

https://www.digitalocean.com/community/tutorials/how-to-harden-openssh-on-ubuntu-18-04

https://ubuntu.com/tutorials/configure-ssh-2fa#1-overview

[https://gist.github.com/lokhman/cc716d2e2d373dd696b2d9264c0287a3#file-ubuntu-hardening-md](https://gist.github.com/lokhman/cc716d2e2d373dd696b2d9264c0287a3#file-ubuntu-hardening-md)

https://www.lifewire.com/harden-ubuntu-server-security-4178243

https://www.ubuntupit.com/best-linux-hardening-security-tips-a-comprehensive-checklist/
