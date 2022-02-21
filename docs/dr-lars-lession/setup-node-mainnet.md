Cài đặt Node cho Cardano trên mạng Testnet
========================
Xây dựng Node cho Cardano trên mạng Testnet với hệ điều hành Ubuntu 20.04

Tài nguyên

Cấu hình máy tính tốt:
Máy tính cài phần mềm 32 GB ram 
Hơn 100 GB dung lượng ổ cứng 
Với hệ điều hành Ubuntu 20.04

Tài liệu : https://cardano-community.github.io/guild-operators/#/basics

# A. Tạo user

```
sudo adduser nvhieu
sudo usermod -aG sudo nvhieu_gcp
sudo su - nvhieu_gcp
sudo whoami
```

## B1. Cài đặt và update các packages liên quan. 

```
sudo apt-get update -y
```

```
sudo apt-get upgrade -y
```

```
sudo apt-get  install libsodium-dev bsdmainutils  unzip git make tmux rsync htop curl build-essential pkg-config libffi-dev libgmp-dev libssl-dev libtinfo-dev libsystemd-dev zlib1g-dev make g++ git  wget  libtool autoconf nload  nano cron libncursesw5 jq -y
```


## B2 Cài đặt libsodium

```
	mkdir $HOME/git	
	cd $HOME/git	
	git clone https://github.com/input-output-hk/libsodium	
	cd libsodium	
	git checkout 66f017f1	
	./autogen.sh	
	./configure	
```

```
		
		
	make	
	sudo make install	
```

## B3.  Cài đặt GHC và Cài đặt Cabal + CNtool

```

echo export CNODE_HOME=/opt/cardano/cnode  >> $HOME/.bashrc

echo export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH >> $HOME/.bashrc
echo [ -f "/home/hadavn1/.ghcup/env" ] && source "/home/hadavn1/.ghcup/env" >> $HOME/.bashrc 
source ~/.bashrc
```
```
sudo whoami
mkdir "$HOME/tmp";
cd "$HOME/tmp"
curl -sS -o prereqs.sh https://raw.githubusercontent.com/cardano-community/guild-operators/master/scripts/cnode-helper-scripts/prereqs.sh       
chmod 755 prereqs.sh
./prereqs.sh 
```

## B4. Cập nhật PATH

```

echo export PATH=~/.cabal/bin:$PATH >> ~/.bashrc
source ~/.bashrc
echo $PATH
export LD_LIBRARY_PATH="/usr/local/lib:$LD_LIBRARY_PATH" 
export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH"
echo export CNODE_HOME=/opt/cardano/cnode  >> $HOME/.bashrc

echo export CARDANO_NODE_SOCKET_PATH="$CNODE_HOME/sockets/node0.socket" >> $HOME/.bashrc

echo export PATH="$HOME/.cargo/bin:$PATH" >> ~/.bashrc
source ~/.bashrc
```

## B5. Tạo NODE và CLI  

Tài liệu: 
https://cardano-community.github.io/guild-operators/#/Build/node-cli

```

. "${HOME}/.bashrc"
cd
cd ~/git
git clone https://github.com/input-output-hk/cardano-node
cd cardano-node
git fetch --tags --all
git pull
git checkout 1.33.0 # tạo Node Replace release 1.33.0 with the version/branch/tag you'd like to build

$CNODE_HOME/scripts/cabal-build-all.sh -o
```

```
cardano-cli version
cardano-node version
```



## B6. Cập nhật cncli.

chú ý:
Bước này chỉ cần thiết khi check leaderlog

```
cd $HOME/tmp	
curl -sS -o prereqs.sh https://raw.githubusercontent.com/cardano-community/guild-operators/master/scripts/cnode-helper-scripts/prereqs.sh	
sudo chmod 755 prereqs.sh	
	
./prereqs.sh -clf	
```

## B7. Chỉnh sửa file cấu hình

```
cd $CNODE_HOME/scripts
nano topologyUpdater.sh
```
Ví dụ:

CUSTOM_PEERS="34.67.23.232:3000|170.106.15.159:3001|relays-new.cardano-mainnet.iohk.io:3001:2"

### Chỉnh sửa file env 

Sửa port 3001 và bỏ
```
nano env
```
### Sửa ip của prometheus

```
nano ../files/config.json
```


## B8. Chạy node

Tạo các systemctl cho cnode

```
cd $CNODE_HOME/scripts
./deploy-as-systemd.sh
sudo systemctl stop cnode
sudo systemctl restart cnode
```

## B8b. Tạo node thư 2

Sửa file prereqs.sh - CNODE_NAME
```
cd tmp 
nano prereqs.sh
./prereqs.sh -f
```
Sửa port
```
nano env 
```
Sửa Port trong ../files/config.json 

```
nano $CNODE_HOME/files/config.json 
```
Sửa topology.json

```
nano $CNODE_HOME//files/topology.json 
```

Tạo file systemd

```
sudo rm -f /etc/systemd/system/cnodew.service
sudo cp /etc/systemd/system/cnode.service /etc/systemd/system/cnodew.service
sudo sed -i /etc/systemd/system/cnodew.service -e "s/cardano\/cnode/cardano\/cnodew/g"
sudo systemctl daemon-reload
sudo systemctl enable cnodew.service
```
      
## B9. tạo file xóa logs

 tạo file clearlogs.sh 

```
cd $CNODE_HOME/scripts
cat > clearlogs.sh << EOF
#!/bin/bash
/bin/rm -rf /opt/cardano/cnode/logs/node0*		
/bin/rm -rf /opt/cardano/cnode/logs/node0.json		
/bin/rm -rf /opt/cardano/cnode/logs/archive/node*.json		
EOF
chmod 755 clearlogs.sh 

cat > crontab_fragment.txt << EOF
15 5 * * * ${CNODE_HOME}/scripts/clearlogs.sh
EOF
crontab -l | cat - crontab_fragment.txt >crontab.txt && crontab crontab.txt
rm crontab_fragment.txt
```
Ví dụ:
```
systemctl status cron
crontab -e
sudo crontab -e
25 * * * * /opt/cardano/cnode/scripts/topologyUpdater.sh
15 5 * * * /opt/cardano/cnode/scripts/clearlogs.sh
10 * * * * /opt/cardano/cnode/scripts/check_peerin.sh
5 * * * * /opt/cardano/cnode/scripts/reset-ram.sh
systemctl status cron
```


## B10. Tạo bộ nhớ RAM trên SSD  

https://www.cyberciti.biz/faq/linux-add-a-swap-file-howto/

```
sudo fallocate -l 4G /swapfile
or
sudo dd if=/dev/zero of=/swapfile bs=1G count=8
ls -lh /swapfile

sudo chown root:root /swapfile
sudo chmod 0600 /swapfile
ls -lh /swapfile

sudo mkswap /swapfile
sudo swapon /swapfile
swapon -s
grep -i --color swap /proc/meminfo

#check RAM
free -m

sudo nano /etc/fstab
/swapfile none            swap    sw              0       0

#deable RAM ảo
sudo swapoff /swapfile
sudo swapon -s
```
