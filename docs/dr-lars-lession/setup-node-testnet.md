Cài đặt Node cho Cardano trên mạng Testnet
========================
Xây dựng Node cho Cardano trên mạng Testnet với hệ điều hành Ubuntu 20.04

Tài nguyên

Cấu hình máy tính tốt:
Máy tính cài phần mềm 32 GB ram 
Hơn 100 GB dung lượng ổ cứng 
Với hệ điều hành Ubuntu 20.04

1. Install and Update packages Ubuntu dependencies
--------------------------

```
sudo usermod -aG sudo <User_name>
```
```
sudo apt-get update -y
```
```
sudo apt-get upgrade -y
```
```
sudo apt autoremove
```
```
sudo apt-get autoclean
```
```
sudo apt-get -y install automake build-essential pkg-config libffi-dev libgmp-dev libssl-dev libtinfo-dev libsystemd-dev zlib1g-dev

sudo apt-get -y install python3  systemd  yarn libsodium-dev libncursesw5 libtool autoconf
```
```
sudo apt-get -y install make g++ tmux git jq wget htop nload curl zip unzip rsync wget cron
```
```
sudo apt-get -y install openssh-server net-tools gparted
```

2. Install Cabal : the Haskell build tool 
-------

## Install Cabal v3.4.0.0

```
cd

wget https://downloads.haskell.org/~cabal/cabal-install-3.4.0.0/cabal-install-3.4.0.0-x86_64-ubuntu-16.04.tar.xz 

tar -xf cabal-install-3.4.0.0-x86_64-ubuntu-16.04.tar.xz 

rm cabal-install-3.4.0.0-x86_64-ubuntu-16.04.tar.xz 

mkdir -p ~/.cabal/bin

mv cabal ~/.cabal/bin/
```

## Install Cabal v3.6.2.0

```
cd

wget https://downloads.haskell.org/~cabal/cabal-install-3.6.2.0/cabal-install-3.6.2.0-x86_64-linux-alpine.tar.xz

tar -xf cabal-install-3.6.2.0-x86_64-linux-alpine.tar.xz 

rm cabal-install-3.6.2.0-x86_64-linux-alpine.tar.xz

mkdir -p ~/.cabal/bin

mv cabal ~/.cabal/bin/
```

```
echo export PATH=~/.cabal/bin:$PATH >> ~/.bashrc

source ~/.bashrc

echo $PATH

cabal --version
```

3. Installing GHC - The Glorious Glasgow Haskell Compilation System
--------

## Download and install version 8.10.4 of GHC

```
cd
wget https://downloads.haskell.org/ghc/8.10.4/ghc-8.10.4-x86_64-deb9-linux.tar.xz

tar -xf ghc-8.10.4-x86_64-deb9-linux.tar.xz

rm ghc-8.10.4-x86_64-deb9-linux.tar.xz

cd ghc-8.10.4

./configure

sudo make install

```

## Download and install version 8.10.7 of GHC. The easiest way to do this is to use ghcup.

```
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh

ghcup install ghc 8.10.7

ghcup install cabal 3.4.0.0

ghcup set ghc 8.10.7

ghcup set cabal 3.4.0.0

cd

ghc --version
```

4. Install Libsodium
-------

```
mkdir $HOME/git

cd $HOME/git

git clone https://github.com/input-output-hk/libsodium

cd libsodium

git checkout 66f017f1

./autogen.sh

./configure

make

sudo make install
```

5. Update CNODE PATH
--------------

```
export LD_LIBRARY_PATH="/usr/local/lib:$LD_LIBRARY_PATH"

export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH"

echo export CNODE_HOME=/opt/cardano/cnode  >> $HOME/.bashrc

echo export CARDANO_NODE_SOCKET_PATH="$CNODE_HOME/sockets/node0.socket" >> $HOME/.bashrc
source ~/.bashrc
```

6. Build cardano-node & cardano-cli binary
----------------------

```
cd $HOME/git

git clone https://github.com/input-output-hk/cardano-node.git
cd cardano-node
git fetch --all --recurse-submodules --tags && git tag
git checkout tags/<TAGGED VERSION>
cabal configure --with-compiler=ghc-8.10.7

echo "package cardano-crypto-praos" >>  cabal.project.local

echo "  flags: -external-libsodium-vrf" >>  cabal.project.local
```

## Build Core/Relay Node Online

```
cabal build all

cp -p dist-newstyle/build/x86_64-linux/ghc-8.10.2/cardano-node-1.24.2/x/cardano-node/build/cardano-node/cardano-node ~/.cabal/bin/
cp -p dist-newstyle/build/x86_64-linux/ghc-8.10.2/cardano-cli-1.24.2/x/cardano-cli/build/cardano-cli/cardano-cli ~/.cabal/bin/
```


which cardano-node && which cardano-cli

```
cardano-node --version

cardano-cli --version
```

## Build Air-gapped Node Offline

```
$CNODE_HOME/scripts/cabal-build-all.sh -o
```

7. Create CNTools cnode #files #db #priv #scripts #sockets #logs
---------------

```
mkdir "$HOME/tmp"

cd "$HOME/tmp"

curl -sS -o prereqs.sh https://raw.githubusercontent.com/cardano-community/guild-operators/master/scripts/cnode-helper-scripts/prereqs.sh

chmod 700 prereqs.sh

./prereqs.sh
```

8. Create TMUX scripts #start_all #stop_all
-------

```
cd git
git clone https://github.com/stakepool247/CardanoHaskellTestnetScripts.gitcd CardanoHaskellTestnetScripts/

git checkout master
cp *.sh $CNODE_HOME/scripts/
cd $CNODE_HOME/scripts/
chmod +x start_all.sh stop_all.sh node.sh
```
