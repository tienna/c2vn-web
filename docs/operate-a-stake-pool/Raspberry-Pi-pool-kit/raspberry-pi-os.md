---
description: Raspberry Pi OS Cardano Stakepool
---

# Hướng dẫn Raspi-Node


<iframe width="100%" height="425" src="https://www.youtube.com/embed/c__EqkGQ5sU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

## Tại sao lại có hướng dẫn này?

Hướng dẫn này dành cho những người muốn cài đặt Raspberry-pi 4 với hệ điều hành Raspberry Pi dành cho máy tính mini Rasp-PI đầy đủ được cài đặt cùng với tất cả các phần mềm cần thiết để thiết lập và chạy Cardano Node trên blockchain. Đây có thể là một thiết lập tốt cho những ai đang tìm cách thực hiện một số thiết bị phát triển nhẹ trên blockchain như tạo NFT chẳng hạn.


:::caution

**Bạn sẽ cần một màn hình (ít nhất là để thiết lập ban đầu vì SSH bị vô hiệu hóa và ufw đang hoạt động) và bạn phải sử dụng Raspberry Pi 4 với 8GB RAM!**

:::

## Tải xuông & Flash

### Cài đặt Raspi-Imager

Tải xuống, cài đặt và chạy [Raspberry Pi Imager](https://github.com/raspberrypi/rpi-imager/releases/latest). Cắm ổ USB của bạn vào máy tính.

**Hệ điều hành 64 bit Raspberry Pi**

Hiện có một hình ảnh 64 bit mà bạn có thể cài đặt, nó không có sẵn trong lựa chọn raspi-imageer. Kiểm tra các hình ảnh trong liên kết dưới đây để lấy phiên bản mới nhất. Nó là một tập tin zip nên chúng ta phải giải nén nó trước khi đưa vào flash.

[Tải xuống hệ điều hành Raspberry Pi arm64](https://downloads.raspberrypi.org/raspios_arm64)

Giải nén tệp img và flash nó bằng Raspi-imageer. Cắm nó vào Raspberry Pi 4 của bạn và thực hiện thiết lập ban đầu username=`pi` và password=`raspberrypi`

Bạn có thể tìm tài liệu tại đây [https://www.raspberrypi.com/documentation/](https://www.raspberrypi.com/documentation/)

Cắm SSD vào một trong các cổng usb3 màu xanh lam. Sau đó lắp HDMI, Bàn phím, Chuột, Ethernet và nguồn điện.


:::caution

Những chiếc Pi4 đầu tiên được xuất xưởng không khởi động từ USB3.0 theo mặc định, ngày nay Rasp Pi4 mới đã mặc định. Nếu hình ảnh của bạn không khởi động được một trong hai vấn đề phổ biến nhất là phần sụn cũ trên Pi của bạn hoặc bộ điều hợp USB3.0 không tương thích..

:::

![](img/pi4-usb.jpeg)


:::info

Tất cả những gì chúng ta thực sự cần làm ở đây là tắt tự động đăng nhập và tạo người dùng ada với các đặc quyền sudo. Sau khi đăng nhập lại, chúng tôi sẽ xóa người dùng Pi mặc định và định cấu hình máy chủ & môi trường cho cardano-node & cardano-cli.

:::

![Open the Raspberry Pi Configuration utility.](img/raspberrypi-configuration.png)

![Set Auto Login to Disabled](img/disable-auto-login.png)

### Tạo user mới `ada`

ướng dẫn này cố gắng trở thành người dùng bất khả tri để bạn có thể chọn một tên người dùng khác và bạn sẽ ổn. Tuy nhiên, khi tạo các dịch vụ systemd, bạn sẽ phải chỉnh sửa người dùng. **Chú ý!**

Mở một terminal sau đó tạo một người dùng mới và thêm nó vào nhóm sudo.

```bash title=">_ Terminal"
sudo adduser ada; sudo adduser ada sudo
```

Cập nhật hệ điều hành Raspbery Pi và khởi động lại máy chủ để đảm bảo bạn đang sử dụng nhân mới nhất. Khởi động lại và đăng nhập với tư cách người dùng mới của bạn.

```bash title=">_ Terminal"
sudo apt update; sudo apt upgrade
```

#### Thay đổi mật khẩu

Bạn có thể thay đổi mật khẩu người dùng bất cứ lúc nào bằng lệnh sau.

```bash title=">_ Terminal"
passwd
```


:::caution

Cẩn thận nơi bạn sử dụng sudo. Ví dụ: phát hành 'sudo passwd' sẽ thay đổi mật khẩu gốc. Đây dường như là một nơi mà những người mới sử dụng cảm thấy bối rối.

:::

#### Xóa user pi

The pi user is set to auto login and does not require a password for sudo commands. Best to just trash it to avoid any potential security issues.

```bash title=">_ Terminal"
sudo deluser --remove-home pi
```

### Cài đặt server

### Định cấu hình phần cứng

Hãy tiết kiệm một chút điện năng, nâng cao bộ điều khiển trên CPU lên một chút và đặt ram GPU thấp nhất có thể.

Dưới đây là một số liên kết để ép xung và kiểm tra tốc độ ổ đĩa của bạn. Nếu bạn có tản nhiệt, bạn có thể an toàn đến 2000. Chỉ cần chú ý đến các khuyến nghị để  phù hợp với tốc bạn đã chọn.

* [https://www.raspberrypi.org/documentation/configuration/config-txt/overclocking.md](https://www.raspberrypi.org/documentation/configuration/config-txt/overclocking.md)
* [https://www.seeedstudio.com/blog/2020/02/12/how-to-safely-overclock-your-raspberry-pi-4-to-2-147ghz/](https://www.seeedstudio.com/blog/2020/02/12/how-to-safely-overclock-your-raspberry-pi-4-to-2-147ghz/)
* [https://www.tomshardware.com/how-to/raspberry-pi-4-23-ghz-overclock](https://www.tomshardware.com/how-to/raspberry-pi-4-23-ghz-overclock)
* [https://dopedesi.com/2020/11/24/upgrade-your-raspberry-pi-4-with-a-nvme-boot-drive-by-alex-ellis-nov-2020/](https://dopedesi.com/2020/11/24/upgrade-your-raspberry-pi-4-with-a-nvme-boot-drive-by-alex-ellis-nov-2020/)
* [Legendary Technology: New Raspberry Pi 4 Bootloader USB](https://jamesachambers.com/new-raspberry-pi-4-bootloader-usb-network-boot-guide/)

**Ép xung, Bộ nhớ & radios**

Chỉnh sửa /boot/config.txt.

```bash title=">_ Terminal"
sudo nano /boot/config.txt
```

Chỉ cần dán các bổ sung Pi Pool ở dưới cùng.

```bash title="/boot/config.txt"
## Pi Pool ##
over_voltage=6
arm_freq=2000
```

sử dụng `CTRL + x` để save và `y` đồng ý và thoát.

Save và reboot.

```
sudo reboot
```

### Định cấu hình Raspbia

#### Vô hiệu hóa user root

```
sudo passwd -l root
```

#### Bộ nhớ chia sẻ an toàn #


Gắn bộ nhớ được chia sẻ dưới dạng chỉ đọc. Open /etc/fstab.

```
sudo nano /etc/fstab
```

Thêm dòng này ở dưới cùng, lưu và thoát.

```bash title="/etc/fstab"
tmpfs    /run/shm    tmpfs    ro,noexec,nosuid    0 0
```

#### Tăng giới hạn tệp đang mở cho $ USER

Thêm một vài dòng vào cuối /etc/security/limits.conf

```bash title=">_ Terminal"
sudo bash -c "echo -e '${USER} soft nofile 800000\n${USER} hard nofile 1048576\n' >> /etc/security/limits.conf"
```

Xác nhận nó đã được thêm vào dưới cùng.

```bash title=">_ Terminal"
cat /etc/security/limits.conf
```

#### Tối ưu hóa hiệu suất và bảo mật


:::info

[https://gist.github.com/lokhman/cc716d2e2d373dd696b2d9264c0287a3](https://gist.github.com/lokhman/cc716d2e2d373dd696b2d9264c0287a3)

:::


:::caution

Nếu bạn muốn tắt ipv6 hoặc bật chuyển tiếp, bạn có thể làm dưới đây.

:::

Thêm phần sau vào cuối /etc/sysctl.conf. Save và exit.

```bash title=">_ Terminal"
sudo nano /etc/sysctl.conf
```

```bash title="/etc/sysctl.conf"
## Pi Node ##

fs.file-max = 10000000
fs.nr_open = 10000000

# enable forwarding if using wireguard
net.ipv4.ip_forward=0

# ignore ICMP redirects
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0

net.ipv4.icmp_ignore_bogus_error_responses = 1

# disable IPv6
#net.ipv6.conf.all.disable_ipv6 = 1
#net.ipv6.conf.default.disable_ipv6 = 1

# block SYN attacks
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 2048
net.ipv4.tcp_synack_retries = 3
net.ipv4.netfilter.ip_conntrack_tcp_timeout_syn_recv=45

# in progress tasks
net.ipv4.tcp_keepalive_time = 240
net.ipv4.tcp_keepalive_intvl = 4
net.ipv4.tcp_keepalive_probes = 5

# reboot if we run out of memory
vm.panic_on_oom = 1
kernel.panic = 10

# Use Google's congestion control algorithm
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr
```

**Tải các thay đổi của chúng tôi sau khi khởi động**

Tạo một tệp mới. Dán, lưu và đóng.
```
sudo nano /etc/rc.local
```

```bash title="/etc/rc.local"
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# Print the IP address
_IP=$(hostname -I) || true
if [ "$_IP" ]; then
  printf "My IP address is %s\n" "$_IP"
fi
# Give CPU startup routines time to settle.
sleep 120

sysctl -p /etc/sysctl.conf

exit 0
```

#### Chrony

Chúng tôi cần đồng bộ hóa thời gian của chúng tôi chính xác nhất có thể. Mở /etc/chrony/chrony.conf

```
sudo apt install chrony
```

```bash title=">_ Terminal"
sudo nano /etc/chrony/chrony.conf
```

Thay thế nội dung của tệp bằng nội dung bên dưới, Lưu và thoát.

```bash title="/etc/chrony/chrony.conf"
pool time.google.com       iburst minpoll 2 maxpoll 2 maxsources 3 maxdelay 0.3
pool time.euro.apple.com   iburst minpoll 2 maxpoll 2 maxsources 3 maxdelay 0.3
pool time.apple.com        iburst minpoll 2 maxpoll 2 maxsources 3 maxdelay 0.3
pool ntp.ubuntu.com        iburst minpoll 2 maxpoll 2 maxsources 3 maxdelay 0.3

# This directive specify the location of the file containing ID/key pairs for
# NTP authentication.
keyfile /etc/chrony/chrony.keys

# This directive specify the file into which chronyd will store the rate
# information.
driftfile /var/lib/chrony/chrony.drift

# Uncomment the following line to turn logging on.
#log tracking measurements statistics

# Log files location.
logdir /var/log/chrony

# Stop bad estimates upsetting machine clock.
maxupdateskew 5.0

# This directive enables kernel synchronisation (every 11 minutes) of the
# real-time clock. Note that it can’t be used along with the 'rtcfile' directive.
rtcsync

# Step the system clock instead of slewing it if the adjustment is larger than
# one second, but only in the first three clock updates.
makestep 0.1 -1

# Get TAI-UTC offset and leap seconds from the system tz database
leapsectz right/UTC

# Serve time even if not synchronized to a time source.
local stratum 10
```

Lưu và thoát

```bash title=">_ Terminal"
sudo service chrony restart
```

#### Zram swap


:::info

Chúng tôi đã phát hiện ra rằng cardano-node có thể sử dụng hoán đổi nén này một cách an toàn trong ram về cơ bản cung cấp cho chúng tôi khoảng 20gb ram. Chúng tôi đã thiết lập các tham số hạt nhân cho zram trongn /etc/sysctl.conf

:::

Swapping trên ổ cúng là chậm, swapping dùng nén RAM nhanh hơn và cung cấp cho chúng tôi một số chi phí trước khi hết bộ nhớ (oom).

[Hướng dẫn RPi OS ZRAM](https://haydenjames.io/raspberry-pi-performance-add-zram-kernel-parameters/)

[Bài viết ZRAM trên Ubuntu](https://lists.ubuntu.com/archives/lubuntu-users/2013-October/005831.html)


*Disable Raspbian swapfile.*

```
sudo systemctl disable dphys-swapfile.service
```

```
sudo apt install zram-tools
```

```bash title=">_ Terminal"
sudo nano /etc/default/zramswap
```

```bash title="/etc/default/zramswap"
# Compression algorithm selection
# speed: lz4 > zstd > lzo
# compression: zstd > lzo > lz4
# This is not inclusive of all that is available in latest kernels
# See /sys/block/zram0/comp_algorithm (when zram module is loaded) to see
# what is currently set and available for your kernel[1]
# [1]  https://github.com/torvalds/linux/blob/master/Documentation/blockdev/zram.txt#L86
#ALGO=lz4

# Specifies the amount of RAM that should be used for zram
# based on a percentage the total amount of available memory
# This takes precedence and overrides SIZE below
PERCENT=150

# Specifies a static amount of RAM that should be used for
# the ZRAM devices, this is in MiB
#SIZE=256

# Specifies the priority for the swap devices, see swapon(2)
# for more details. Higher number = higher priority
# This should probably be higher than hdd/ssd swaps.
#PRIORITY=100
```

Lưu và khởi động lại.

```bash title=">_ Terminal"
sudo reboot
```

### Cài đặt gói

Cài đặt các gói cần thiết

```bash title=">_ Terminal"
sudo apt install build-essential libssl-dev tcptraceroute python3-pip \
         make automake unzip net-tools nginx ssl-cert pkg-config jq \
         libffi-dev libgmp-dev libssl-dev libtinfo-dev libsystemd-dev \
         zlib1g-dev g++ libncursesw5 libtool autoconf unattended-upgrades -y
```

```
sudo reboot
```

### Cập nhật bảo mật tự động

Bật cập nhật bảo mật tự động.

```bash title=">_ Terminal"
sudo dpkg-reconfigure -plow unattended-upgrades
```

## Thiết lập Môi trường

***

### Mô tả: Định cấu hình môi trường cho Cardano Node 

### Chọn testnet hoặc mainne.


:::danger

Có một khoản tiền gửi đăng ký 500 ₳ và chi phí đăng ký 5 ₳ khác để bắt đầu một nhóm trên mạng chính. Người dùng lần đầu tiên được khuyến khích sử dụng testnet. Bạn có thể lấy tada với [tada faucet link](https://testnets.cardano.org/en/testnets/cardano/tools/faucet/)

:::

Tạo các thư mục cho dự án.

```bash title=">_ Terminal"
mkdir -p ${HOME}/.local/bin
mkdir -p ${HOME}/pi-pool/files
mkdir -p ${HOME}/pi-pool/scripts
mkdir -p ${HOME}/pi-pool/logs
mkdir ${HOME}/git
mkdir ${HOME}/tmp
```

Tạo tệp .adaenv, chọn mạng bạn muốn sử dụng và nguồn tệp. Tệp này sẽ chứa các biến/cài đặt để vận hành Pi-Node.. /home/ada/.adaenv

```bash title=">_ Terminal"
echo -e NODE_CONFIG=testnet >> ${HOME}/.adaenv; source ${HOME}/.adaenv
```

#### Tạo các biến cơ sở và thêm \~/.local/bin to our $PATH 🏃


:::info

[Biến môi trường trong Linux/Unix](https://askubuntu.com/questions/247738/why-is-etc-profile-not-invoked-for-non-login-shells/247769#247769).

:::


:::caution

Bạn phải tải lại các tệp môi trường sau khi cập nhật chúng. Tương tự đối với nút cardano, các thay đổi đối với cấu trúc liên kết hoặc tệp cấu hình yêu cầu khởi động lại dịch vụ cardano.

:::

```bash title=">_ Terminal"
echo . ~/.adaenv >> ${HOME}/.bashrc
cd .local/bin; echo "export PATH=\"$PWD:\$PATH\"" >> $HOME/.adaenv
echo export NODE_HOME=${HOME}/pi-pool >> ${HOME}/.adaenv
echo export NODE_PORT=3003 >> ${HOME}/.adaenv
echo export NODE_FILES=${HOME}/pi-pool/files >> ${HOME}/.adaenv
echo export TOPOLOGY='${NODE_FILES}'/'${NODE_CONFIG}'-topology.json >> ${HOME}/.adaenv
echo export DB_PATH='${NODE_HOME}'/db >> ${HOME}/.adaenv
echo export CONFIG='${NODE_FILES}'/'${NODE_CONFIG}'-config.json >> ${HOME}/.adaenv
echo export NODE_BUILD_NUM=$(curl https://hydra.iohk.io/job/Cardano/iohk-nix/cardano-deployment/latest-finished/download/1/index.html | grep -e "build" | sed 's/.*build\/\([0-9]*\)\/download.*/\1/g') >> ${HOME}/.adaenv
echo export CARDANO_NODE_SOCKET_PATH="${HOME}/pi-pool/db/socket" >> ${HOME}/.adaenv
source ${HOME}/.bashrc; source ${HOME}/.adaenv
```

### Xây dựng Libsodium

Đây là ngã ba Libsodium của IOHK. Nó cần thiết cho bản nhị phân xây dựng động của nút cardano.

```bash title=">_ Terminal"
cd; cd git/
git clone https://github.com/input-output-hk/libsodium
cd libsodium
git checkout 66f017f1
./autogen.sh
./configure
make
sudo make install
```

Echo thư viện đường dẫn tệp .bashrc và nguồn nó.

```bash title=">_ Terminal"
echo "export LD_LIBRARY_PATH="/usr/local/lib:$LD_LIBRARY_PATH"" >> ~/.bashrc
echo "export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH"" >> ~/.bashrc
. ~/.bashrc
```

Cập nhật bộ đệm liên kết cho các thư viện được chia sẻ và xác nhận.

```bash title=">_ Terminal"
sudo ldconfig; ldconfig -p | grep libsodium
```

#### Truy xuất tệp node

```bash title=">_ Terminal"
cd $NODE_FILES
wget -N https://hydra.iohk.io/build/${NODE_BUILD_NUM}/download/1/${NODE_CONFIG}-config.json
wget -N https://hydra.iohk.io/build/${NODE_BUILD_NUM}/download/1/${NODE_CONFIG}-byron-genesis.json
wget -N https://hydra.iohk.io/build/${NODE_BUILD_NUM}/download/1/${NODE_CONFIG}-shelley-genesis.json
wget -N https://hydra.iohk.io/build/${NODE_BUILD_NUM}/download/1/${NODE_CONFIG}-alonzo-genesis.json
wget -N https://hydra.iohk.io/build/${NODE_BUILD_NUM}/download/1/${NODE_CONFIG}-topology.json
wget -N https://raw.githubusercontent.com/input-output-hk/cardano-node/master/cardano-submit-api/config/tx-submit-mainnet-config.yaml
```

Chạy phần sau để sửa đổi $ {NODE _ CONFIG} -config.json và cập nhật TraceBlockFetchDecisions thành "true" và lắng nghe trên tất cả các giao diện với Prometheus Node Exporter.

```bash title=">_ Terminal"
sed -i ${NODE_CONFIG}-config.json \
    -e "s/TraceBlockFetchDecisions\": false/TraceBlockFetchDecisions\": true/g" \
    -e "s/127.0.0.1/0.0.0.0/g"
```


:::info


**Tip for relay nodes**: Có thể giảm mức sử dụng bộ nhớ và cpu bằng cách đặt "TraceMemPool" thành "false" trong **{NODE\_CONFIG}-config.json.**  Thao tác này sẽ tắt dữ liệu mempool trong Grafana và gLiveView.sh

:::

#### Truy xuất mã nhị phân aarch64 1.33.1 và cardano-submit-api


:::info

Các mã nhị phân cardano-node, cardano-cli và cardano-submit-api không chính thức có sẵn cho chúng tôi đang được một kỹ sư IOHK xây dựng trong thời gian rảnh rỗi. Cân nhắc việc ủy ​​quyền cho nhóm zw3rk để hỗ trợ phát triển Haskel.
:::

```bash title=">_ Terminal"
cd ${HOME}/tmp
wget https://ci.zw3rk.com/build/430108/download/1/aarch64-unknown-linux-musl-cardano-node-1.33.1.zip
unzip *.zip
mv cardano-node/cardano-* ${HOME}/.local/bin
rm -r *
cd ${HOME}
```


:::caution

Nếu các tệp nhị phân đã tồn tại (nếu đang cập nhật), bạn sẽ phải xác nhận việc ghi đè các tệp cũ.

:::

Xác nhận các tệp nhị phân nằm trong $PATH của $USER.

```bash title=">_ Terminal"
cardano-node version
cardano-cli version
which cardano-submit-api
```

#### file khởi động Systemd

Tạo tệp systemd và tập lệnh khởi động để systemd có thể quản lý nút cardano.


```bash title=">_ Terminal"
nano ${HOME}/.local/bin/cardano-service
```

Dán phần sau, lưu và thoát.

```bash title="${HOME}/.local/bin/cardano-service"
#!/bin/bash
. /home/ada/.adaenv

## +RTS -N4 -RTS = Multicore(4)
cardano-node run +RTS -N4 -RTS \
  --topology ${TOPOLOGY} \
  --database-path ${DB_PATH} \
  --socket-path ${CARDANO_NODE_SOCKET_PATH} \
  --port ${NODE_PORT} \
  --config ${CONFIG}
```

Cho phép thực thi tệp dịch vụ nút cardano mới.

```bash title=">_ Terminal"
chmod +x ${HOME}/.local/bin/cardano-service
```

Mở /etc/systemd/system/cardano-node.service.

```bash title=">_ Terminal"
sudo nano /etc/systemd/system/cardano-node.service
```

Dán phần sau, Bạn sẽ cần phải chỉnh sửa tên người dùng tại đây nếu bạn chọn không sử dụng ada. Cứu thoát.

```bash title="/etc/systemd/system/cardano-node.service"
# The Cardano Node Service (part of systemd)
# file: /etc/systemd/system/cardano-node.service

[Unit]
Description     = Cardano node service
Wants           = network-online.target
After           = network-online.target

[Service]
User            = ada
Type            = simple
WorkingDirectory= /home/ada/pi-pool
ExecStart       = /bin/bash -c "PATH=/home/ada/.local/bin:$PATH exec /home/ada/.local/bin/cardano-service"
KillSignal=SIGINT
RestartKillSignal=SIGINT
TimeoutStopSec=10
LimitNOFILE=32768
Restart=always
RestartSec=10
EnvironmentFile=-/home/ada/.adaenv

[Install]
WantedBy= multi-user.target
```

Tạo tệp systemd và tập lệnh khởi động để systemd có thể quản lý cardano-submit-api.

```bash title=">_ Terminal"
nano ${HOME}/.local/bin/cardano-submit-service
```

```bash title="${HOME}/.local/bin/cardano-submit-service"
#!/bin/bash
. /home/ada/.adaenv

cardano-submit-api \
  --socket-path ${CARDANO_NODE_SOCKET_PATH} \
  --port 8090 \
  --config /home/ada/pi-pool/files/tx-submit-mainnet-config.yaml \
  --listen-address 0.0.0.0 \
  --mainnet
```

Cho phép thực thi tập lệnh dịch vụ cardano-submit-api mới 

```bash title=">_ Terminal"
chmod +x ${HOME}/.local/bin/cardano-submit-service
```

Tạo /etc/systemd/system/cardano-submit.service.

```bash title=">_ Terminal"
sudo nano /etc/systemd/system/cardano-submit.service
```

Dán phần sau, Bạn sẽ cần phải chỉnh sửa tên người dùng tại đây nếu bạn chọn không sử dụng ada. cứu thoát.

```bash title=">_ Terminal"
# The Cardano Submit Service (part of systemd)
# file: /etc/systemd/system/cardano-submit.service

[Unit]
Description     = Cardano submit service
Wants           = network-online.target
After           = network-online.target

[Service]
User            = ada
Type            = simple
WorkingDirectory= /home/ada/pi-pool
ExecStart       = /bin/bash -c "PATH=/home/ada/.local/bin:$PATH exec /home/ada/.local/bin/cardano-submit-service"
KillSignal=SIGINT
RestartKillSignal=SIGINT
TimeoutStopSec=10
LimitNOFILE=32768
Restart=always
RestartSec=10
EnvironmentFile=-/home/ada/.adaenv

[Install]
WantedBy= multi-user.target
```

Tải lại systemd để nó chọn các tệp dịch vụ mới của chúng tôi.

```bash title=">_ Terminal"
sudo systemctl daemon-reload
```

Hãy thêm một vài hàm vào cuối tệp .adaenv của chúng tôi để làm cho công việc dễ dàng hơn một chút.

```bash title=">_ Terminal"
nano ${HOME}/.adaenv
```

```bash title="${HOME}/.adaenv"
cardano-service() {
    #do things with parameters like $1 such as
    sudo systemctl "$1" cardano-node.service
}

cardano-submit() {
    #do things with parameters like $1 such as
    sudo systemctl "$1" cardano-submit.service
}
```

Lưu và thoát

```bash title=">_ Terminal"
source ${HOME}/.adaenv
```

Những gì chúng tôi vừa làm là thêm một số chức năng để kiểm soát dịch vụ cardano của chúng tôi và gửi cardano mà không cần phải gõ ra

> sudo systemctl enable cardano-node.service

> sudo systemctl start cardano-node.service

> sudo systemctl stop cardano-node.service

> sudo systemctl status cardano-node.service

Bây giờ chúng ta chỉ cần:

* cardano-service enable (enables cardano-node.service auto start at boot)
* cardano-service start (starts cardano-node.service)
* cardano-service stop (stops cardano-node.service)
* cardano-service status (shows the status of cardano-node.service)

Hoặc

* cardano-submit enable (enables cardano-submit.service auto start at boot)
* cardano-submit start (starts cardano-submit.service)
* cardano-submit stop (stops cardano-submit.service)
* cardano-submit status (shows the status of cardano-submit.service)

Dịch vụ gửi sẽ lắng nghe trên cổng 8090. Bạn có thể kết nối ví Nami của mình như bên dưới để tự gửi tx trong cài đặt của Nami.

```bash title=">_ Terminal"
http://<node lan ip>:8090/api/submit/tx
```

### ⛓ Đồng bộ chuỗi ⛓

Bây giờ bạn đã sẵn sàng để bắt đầu cardano-node. Làm như vậy sẽ bắt đầu quá trình 'đồng bộ hóa chuỗi'. Quá trình này sẽ mất khoảng 48 giờ và thư mục db hiện có kích thước khoảng 13GB. Chúng tôi đã từng phải đồng bộ hóa nó với một nút và sao chép nó từ nút đó sang những nút mới để tiết kiệm thời gian. Tuy nhiên...

#### Tải xuông snapshot

Tôi đã bắt đầu chụp nhanh thư mục db các nút sao lưu của mình và lưu trữ nó trong một thư mục web. Với dịch vụ này, mất khoảng 20 phút để lấy ảnh chụp nhanh mới nhất và có thể mất một giờ nữa để đồng bộ hóa với đầu chuỗi. Dịch vụ này được cung cấp nguyên trạng. Điều đó phụ thuộc vào bạn. Nếu bạn muốn đồng bộ chuỗi của riêng mình, chỉ cần:

```bash title=">_ Terminal"
cardano-service enable
cardano-service start
cardano-service status
```

Nếu không, hãy đảm bảo rằng nút của bạn không chạy và xóa thư mục db nếu nó tồn tại và tải xuống db /.

```bash title=">_ Terminal"
cardano-service stop
cd $NODE_HOME
rm -r db/
```

**Tải xuống cơ sở dữ liệu**

```bash title=">_ Terminal"
wget -r -np -nH -R "index.html*" -e robots=off https://$NODE_CONFIG.adamantium.online/db/
```

Sau khi wget hoàn tất, hãy bật và khởi động cardano-node

```bash title=">_ Terminal"
cardano-service enable
cardano-service start
cardano-service status
```

### gLiveView.sh

Các tập lệnh của nhà điều hành hiệp hội có một vài công cụ hữu ích để vận hành một nhóm. Chúng tôi không muốn dự án nói chung, mặc dù có một vài kịch bản mà chúng tôi sẽ sử dụng.

[Tập lệnh trợ giúp người đieuù hành pool (SPO)](https://github.com/cardano-community/guild-operators/tree/master/scripts/cnode-helper-scripts)

```bash title=">_ Terminal"
cd $NODE_HOME/scripts
wget https://raw.githubusercontent.com/cardano-community/guild-operators/master/scripts/cnode-helper-scripts/env
wget https://raw.githubusercontent.com/cardano-community/guild-operators/master/scripts/cnode-helper-scripts/gLiveView.sh
```


:::info

Bạn có thể thay đổi cổng cardano-node đang chạy trong tệp .adaenv trong thư mục chính của bạn. Mở tệp chỉnh sửa số cổng. Nạp thay đổi vào shell của bạn và khởi động lại dịch vụ cardano-node.

```bash title=">_ Terminal"
nano /home/ada/.adaenv
source /home/ada/.adaenv
cardano-service restart
```

:::

Thêm một dòng tìm nguồn cung cấp tệp .adaenv của chúng tôi vào đầu tệp env và điều chỉnh một số đường dẫn.

```bash title=">_ Terminal"
sed -i env \
    -e "/#CNODEBIN/i. ${HOME}/.adaenv" \
    -e "s/\#CNODE_HOME=\"\/opt\/cardano\/cnode\"/CNODE_HOME=\"\${HOME}\/pi-pool\"/g" \
    -e "s/\#CNODE_PORT=6000"/CNODE_PORT=\"'${NODE_PORT}'\""/g" \
    -e "s/\#CONFIG=\"\${CNODE_HOME}\/files\/config.json\"/CONFIG=\"\${NODE_FILES}\/"'${NODE_CONFIG}'"-config.json\"/g" \
    -e "s/\#TOPOLOGY=\"\${CNODE_HOME}\/files\/topology.json\"/TOPOLOGY=\"\${NODE_FILES}\/"'${NODE_CONFIG}'"-topology.json\"/g" \
    -e "s/\#LOG_DIR=\"\${CNODE_HOME}\/logs\"/LOG_DIR=\"\${CNODE_HOME}\/logs\"/g"
```

Cho phép thực thi gLiveView.sh.

```bash title=">_ Terminal"
chmod +x gLiveView.sh
```

### topologyUpdater.sh

Cho đến khi peer to peer được kích hoạt trên mạng, các nhà khai thác mạng cần một cách để có được danh sách các rơle / peer để kết nối. Dịch vụ cập nhật cấu trúc liên kết chạy trong nền với cron. Mỗi giờ kịch bản sẽ chạy và cho dịch vụ biết bạn là người chuyển tiếp và muốn trở thành một phần của mạng. Nó sẽ thêm relay của bạn vào thư mục của nó sau bốn giờ mà bạn sẽ thấy trong các kết nối trong gLiveView.


:::info

Danh sách được tạo sẽ hiển thị cho bạn khoảng cách & manh mối về vị trí đặt rơ le.

:::

Tải xuống tập lệnh topoUpdater và xem qua nó. Giảm số lượng đồng nghiệp xuống 10 và thêm bất kỳ đồng nghiệp tùy chỉnh nào bạn muốn. Đây là những kết nối gửi đi. Bạn sẽ không thấy bất kỳ giao dịch nào cho đến khi các nút khác bắt đầu kết nối với bạn.

```bash title=">_ Terminal"
wget https://raw.githubusercontent.com/cardano-community/guild-operators/master/scripts/cnode-helper-scripts/topologyUpdater.sh
```

Giảm số MX _ PEERS xuống 10.

```bash title=">_ Terminal"
nano topologyUpdater.sh
```

Lưu, thoát và làm cho nó có thể thực thi được.

```bash title=">_ Terminal"
chmod +x topologyUpdater.sh
```


:::caution

Bạn sẽ không thể thực thi thành công ./topologyUpdater.sh cho đến khi bạn được đồng bộ hóa hoàn toàn đến đầu chuỗi

:::

Tạo một công việc cron sẽ chạy tập lệnh mỗi giờ.

```bash title=">_ Terminal"
crontab -e
```


:::info

Chọn nano khi được nhắc cho trình chỉnh sửa.

:::

Thêm phần sau vào dưới cùng, lưu và thoát.


:::info

Hình ảnh Pi-Node có mục cron này bị tắt theo mặc định. Bạn có thể kích hoạt nó bằng cách xóa dấu #

:::

```bash title=">_ Terminal"
SHELL=/bin/bash
PATH=/home/ada/.local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin
33 * * * * . $HOME/.adaenv; $HOME/pi-pool/scripts/topologyUpdater.sh
```

Sau bốn giờ, bạn có thể mở $ {NODE _ CONFIG} -topology.json và kiểm tra danh sách các dịch vụ ngang hàng mà dịch vụ đề xuất cho bạn. Loại bỏ bất kỳ thứ gì hơn 7k khoảng cách (hoặc ít hơn). IOHK gần đây đã đề xuất 8 đồng nghiệp. Càng nhiều đồng nghiệp bên ngoài, nó càng sử dụng nhiều tài nguyên hệ thống. Bạn cũng có thể thêm bất kỳ đồng nghiệp nào mà bạn muốn kết nối với thủ công bên trong tập lệnh. Đây là nơi bạn sẽ thêm nhà sản xuất khối của mình hoặc bất kỳ nút nào của bạn bè.

```bash title=">_ Terminal"
nano $NODE_FILES/${NODE_CONFIG}-topology.json
```


:::info

Bạn có thể sử dụng gLiveView.sh để xem thời gian ping liên quan đến các ứng dụng ngang hàng trong tệp -topology {NODE _ CONFIG} của mình. Sử dụng Ping để phân giải tên máy chủ thành IP.

:::

Các thay đổi đối với tệp này sẽ có ảnh hưởng khi khởi động lại dịch vụ cardano.


:::caution

Đừng quên xóa dấu phẩy cuối cùng trong tệp cấu trúc liên kết của bạn!

:::

Trạng thái sẽ hiển thị là đã bật và đang chạy

Sau khi nút của bạn đồng bộ hóa trước kỷ nguyên 208 (kỷ nguyên shelley), bạn có thể sử dụng gLiveView.sh để theo dõi tiến trình đồng bộ hóa của mình.


:::danger

Có thể mất hơn một giờ để cardano-node đồng bộ hóa với đầu chuỗi. Sử dụng đầu ra ./gliveView.sh, htop và log để xem quá trình. Hãy kiên nhẫn nó sẽ xuất hiện.

:::

```bash title=">_ Terminal"
cd $NODE_HOME/scripts
./gLiveView.sh
```

![](<img/pi-node-glive.png>)

### Prometheus, Node Exporter & Grafana

Prometheus kết nối với phần phụ trợ của các nút cardano và cung cấp các chỉ số qua http. Đến lượt nó, Grafana có thể sử dụng dữ liệu đó để hiển thị đồ thị và tạo cảnh báo. Bảng điều khiển Grafana của chúng tôi sẽ được tạo thành từ dữ liệu từ hệ thống Ubuntu & nút cardano của chúng tôi. Grafana cũng có thể hiển thị dữ liệu từ các nguồn khác, như [adapools.org](https://adapools.org).


:::info

Bạn có thể kết nối[Telegram bot](https://docs.armada-alliance.com/learn/intermediate-guide/grafana-alerts-with-telegram)  với Grafana, bot này có thể cảnh báo bạn về sự cố với máy chủ. Dễ dàng hơn nhiều so với việc cố gắng cấu hình cảnh báo qua emai

:::

[Prometheus Github](https://github.com/prometheus)

![](<img/pi-pool-grafana.png>)

#### Cài đặt Prometheus & Node Exporter.


:::info

Prometheus có thể quét các điểm cuối http của các máy chủ khác đang chạy trình xuất nút. Có nghĩa là Grafana và Prometheus không cần phải được cài đặt trên lõi và rơle của bạn. Chỉ yêu cầu gói prometheus-node-exportorter nếu bạn muốn xây dựng bảng điều khiển Grafana trung tâm cho nhóm, giải phóng tài nguyên và có một bảng điều khiển duy nhất để giám sát mọi thứ.

:::

```bash title=">_ Terminal"
sudo apt install prometheus prometheus-node-exporter -y
```

Tắt chúng trong systemd ngay bây giờ.

```bash title=">_ Terminal"
sudo systemctl disable prometheus.service
sudo systemctl disable prometheus-node-exporter.service
```

#### Định cấu hình Prometheus

Mở prometheus.yml.

```bash title=">_ Terminal"
sudo nano /etc/prometheus/prometheus.yml
```

Thay thế nội dung của tệp bằng.


:::caution

Thụt lề phải đúng định dạng YAML nếu không Prometheus sẽ không khởi động được.

:::

```yaml title="/etc/prometheus/prometheus.yml"
global:
  scrape_interval: 15s # By default, scrape targets every 15 seconds.

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
    monitor: "codelab-monitor"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label job=<job_name> to any timeseries scraped from this config.
  - job_name: "Prometheus" # To scrape data from Prometheus Node Exporter
    scrape_interval: 5s
    static_configs:
      #      - targets: ['<CORE PRIVATE IP>:12798']
      #        labels:
      #          alias: 'C1'
      #          type:  'cardano-node'
      #      - targets: ['<RELAY PRIVATE IP>:12798']
      #        labels:
      #          alias: 'R1'
      #          type:  'cardano-node'
      - targets: ["localhost:12798"]
        labels:
          alias: "N1"
          type: "cardano-node"

      #      - targets: ['<CORE PRIVATE IP>:9100']
      #        labels:
      #          alias: 'C1'
      #          type:  'node'
      #      - targets: ['<RELAY PRIVATE IP>:9100']
      #        labels:
      #          alias: 'R1'
      #          type:  'node'
      - targets: ["localhost:9100"]
        labels:
          alias: "N1"
          type: "node"
```

Lưu và thoát

**Khởi động Prometheus.**

```bash title=">_ Terminal"
sudo systemctl start prometheus.service
```

#### Cài đặt Grafana #


[Grafana GitHub](https://github.com/grafana/grafana)

Thêm khóa gpg của Grafana vào Ubuntu.

```bash title=">_ Terminal"
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
```

Thêm repo ổn định mới nhất vào các nguồn apt.

```bash title=">_ Terminal"
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

Cập nhật danh sách gói của bạn và cài đặt Grafana.

```bash title=">_ Terminal"
sudo apt update; sudo apt install grafana
```

Thay đổi cổng Grafana nghe để nó không xung đột với nút cardano.

```bash title=">_ Terminal"
sudo sed -i /etc/grafana/grafana.ini \
         -e "s#;http_port#http_port#" \
         -e "s#3000#5000#"
```

Khởi động Grafana

```bash title=">_ Terminal"
sudo systemctl start grafana-server.service
```

#### chức năng bash cardano-monitor #

Mở .adaenv.

```bash title=">_ Terminal"
cd ${HOME}; nano .adaenv
```

Xuống dưới cùng thêm.

```bash title="${HOME}/.adaenv"
cardano-monitor() {
    #do things with parameters like $1 such as
    sudo systemctl "$1" prometheus.service
    sudo systemctl "$1" prometheus-node-exporter.service
    sudo systemctl "$1" grafana-server.service
}
```

Lưu, thoát và source.

```bash title=">_ Terminal"
source .adaenv
```

Ở đây chúng tôi gắn cả ba dịch vụ dưới một chức năng. Bật Prometheus.service, prometheus-node-exporter.service & grafana-server.service để chạy khi khởi động và khởi động dịch vụ.

```bash title=">_ Terminal"
cardano-monitor enable
cardano-monitor start
```


:::caution

Tại thời điểm này, bạn có thể muốn bắt đầu dịch vụ cardano và được đồng bộ hóa trước khi chúng tôi tiếp tục định cấu hình Grafana. Chuyển đến phần đồng bộ chuỗi. Chọn xem bạn muốn đợi 30 giờ hoặc tải xuống ảnh chụp nhanh chuỗi mới nhất. Quay lại đây khi gLiveView.sh cho thấy bạn đang ở đầu chuỗi..

:::

### Grafana, Nginx proxy\_pass & snakeoil

Hãy đặt Grafana sau Nginx với chứng chỉ tự ký (solidoil). Chứng chỉ được tạo khi chúng tôi cài đặt gói ssl-cert.

Bạn sẽ nhận được cảnh báo từ trình duyệt của mình. Điều này là do chứng chỉ ca không thể theo một chuỗi tin cậy đến một nguồn đáng tin cậy (tập trung). Tuy nhiên, kết nối được mã hóa và sẽ bảo vệ mật khẩu của bạn ở dạng văn bản thuần túy

```bash title=">_ Terminal"
sudo nano /etc/nginx/sites-available/default
```

Thay thế nội dung của tệp bằng bên dưới.

```bash title="/etc/nginx/sites-available/default"
# Default server configuration
#
server {
        listen 80 default_server;
        return 301 https://$host$request_uri;
}

server {
        # SSL configuration
        #
        listen 443 ssl default_server;
        #listen [::]:443 ssl default_server;
        #
        # Note: You should disable gzip for SSL traffic.
        # See: https://bugs.debian.org/773332
        #
        # Read up on ssl_ciphers to ensure a secure configuration.
        # See: https://bugs.debian.org/765782
        #
        # Self signed certs generated by the ssl-cert package
        # Don't use them in a production server!
        #
        include snippets/snakeoil.conf;

        add_header X-Proxy-Cache $upstream_cache_status;
        location / {
          proxy_pass http://127.0.0.1:5000;
          proxy_redirect      off;
          include proxy_params;
        }
}
```

Kiểm tra xem Nginx có hài lòng với các thay đổi của chúng tôi không và khởi động lại nó.

```bash title=">_ Terminal"
sudo nginx -t
## if ok, do
sudo service nginx restart
```

Bây giờ bạn có thể truy cập địa chỉ ip pi-node của mình mà không cần bất kỳ thông số cổng nào, kết nối sẽ được nâng cấp lên SSL / TLS và bạn sẽ nhận được một thông báo đáng sợ (không thực sự đáng sợ chút nào). Tiếp tục đến trang tổng quan của bạn.

![](img/snakeoil.png)

#### Định cấu hình Grafana

Trên máy cục bộ của bạn, mở trình duyệt của bạn và nhập địa chỉ ip riêng của các nút của bạn.

Đăng nhập và đặt mật khẩu mới. Tên người dùng và mật khẩu mặc định là **admin:admin**.

**Định cấu hình nguồn dữ liệu**

Trong menu dọc bên trái, chuyển đến **Configure** > **Datasources** và kich **Add data source**. chọn Prometheus. Enter [http://localhost:9090](http://localhost:9090) ở đó màu xám, mọi thứ khác có thể để mặc định. Ở dưới cùng, lưu & kiểm tra. Bạn sẽ nhận được màu xanh lá cây "Nguồn dữ liệu đang hoạt động" nếu cardano-monitor đã được khởi động. Nếu vì lý do nào đó mà các dịch vụ đó không thể bắt đầu , hãy **khởi động lại cardano-service**.

**Import dashboards**

Lưu các tệp json của bảng điều khiển vào máy cục bộ của bạn

[Armada Alliance Grafana Dashboards](https://github.com/armada-alliance/dashboards)

Trong menu dọc bên trái, chuyển đến **Dashboards** > **Manage** và kích **Import**. Chọn tệp bạn vừa tải xuống / tạo và lưu. Quay lại  **Dashboards** > **Manage** và nhấp vào trang tổng quan mới của bạn.

![](<img/pi-pool-grafana.png>)

#### Định cấu hình poolDataLive

Tại đây, bạn có thể sử dụng api poolData để đưa thêm dữ liệu pool vào Grafana như cổ phần và giá cả.

[poolData API](https://api.pooldata.live/dashboard)

Làm theo hướng dẫn để cài đặt plugin Grafana, định cấu hình nguồn dữ liệu của bạn và nhập trang tổng quan.

```bash title=">_ Terminal"
sudo grafana-cli plugins install simpod-json-datasource
cardano-monitor restart
```

### Các lệnh hữu ích


:::info

Xem số lượng zram swap cardano-node đang sử dụng.

```bash title=">_ Terminal"
CNZRAM=$(pidof cardano-node)
grep --color VmSwap /proc/$CNZRAM/status
```

Theo dõi kết xuất nhật ký vào nhật ký.

```bash title=">_ Terminal"
sudo journalctl --unit=cardano-node --follow
```

Thực hiện theo đầu ra nhật ký để stdout.

```bash title=">_ Terminal"
sudo tail -f /var/log/syslog
```

Xem các kết nối mạng với netstat.

```bash title=">_ Terminal"
sudo netstat -puntw
```

