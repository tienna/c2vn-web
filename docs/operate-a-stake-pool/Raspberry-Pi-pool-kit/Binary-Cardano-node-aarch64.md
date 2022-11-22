# Mã nhị phân cho các CPU ARM


***các phiên bản khác nhau của nút cardano và các mã nhị phân cli được xây dựng cho các CPU ARM*** 🏴‍☠️🦾

BIG Thanks to SPO's [ZW3RK](https://twitter.com/zw3rkpool/) who provides the amazing Static Binaries, [SRN](https://armada-alliance.com/stake-pools/cc1b1c03798884c636703443a23b8d9e827d6c0417921600394198a0) who provides dynamic builds and maintains repo with [PIADA](https://armada-alliance.com/stake-pools/b8d8742c7b7b512468448429c776b3b0f824cef460db61aa1d24bc65) and our friend [Daniel](https://github.com/rekuenkdr) ₳🏴‍☠️🙏


![](img/PoolKit01.png)

## Cardano Node RTS Parameter Notebook

**Điều này chứa thông tin về các tối ưu hóa thời gian chạy khác nhau mà các SPO của Armada Alliance đang sử dụng để cải thiện hiệu suất của cardano-node của họ. Để biết thêm thông tin về các tham số GHC RTS và chạy các chương trình đã biên dịch, hãy đọc tài liệu Haskel ["Using GHC"](https://downloads.haskell.org/~ghc/latest/docs/html/users_guide/runtime_control.html)**

***[Armada Alliance Cardano RTS Notebook](https://docs.google.com/spreadsheets/d/1sw_fzqoubOEG6lMpWKVzCF8yISfY4YFAvnx_5E5T-1s/edit#gid=0)***

Cảm ơn [PGWAD](https://armada-alliance.com/stake-pools/7e45a7e6ab3afcf99120e97aedf84e706e43d829ddc610ad667a85a3) đã thiết lập nó và tất cả các thành viên của chúng tôi, những người đã đóng góp 🙏🏴‍☠️


### Dynamic build (Ubuntu 20.04 and above. Requires [Libsodium and SECP256K1](/docs/operate-a-stake-pool/Raspberry-Pi-pool-kit/note)

Cardano-node/cli 1.35.4

```
wget -O cardano-1_35_4-aarch64-ubuntu_2004.zip https://github.com/armada-alliance/cardano-node-binaries/blob/main/dynamic-binaries/1.35.4/cardano-1_35_4-aarch64-ubuntu_2004.zip?raw=true
```

[1.35.3](https://github.com/armada-alliance/cardano-node-binaries/blob/main/dynamic-binaries/1.35.3/cardano-1_35_3-aarch64-ubuntu_2004.zip?raw=true) (Mainnet)

```
wget -O cardano-1_35_3-aarch64-ubuntu_2004.zip https://github.com/armada-alliance/cardano-node-binaries/blob/main/dynamic-binaries/1.35.3/cardano-1_35_3-aarch64-ubuntu_2004.zip?raw=true
```

[1.35.2](https://github.com/armada-alliance/cardano-node-binaries/blob/main/dynamic-binaries/1.35.2/cardano-1_35_2-aarch64-ubuntu_2004.zip?raw=true) (Public Testnet)

```
wget -O cardano-1_35_2-aarch64-ubuntu_2004.zip https://github.com/armada-alliance/cardano-node-binaries/blob/main/dynamic-binaries/1.35.2/cardano-1_35_2-aarch64-ubuntu_2004.zip?raw=true
```

[1.35.3-rc1](https://github.com/armada-alliance/cardano-node-binaries/blob/main/dynamic-binaries/1.35.3-rc1/cardano-1_35_3_rc1-aarch64-ubuntu_2004.zip?raw=true) (Vasil-dev Testnet)

```
wget -O cardano-1_35_3_rc1-aarch64-ubuntu_2004.zip https://github.com/armada-alliance/cardano-node-binaries/blob/main/dynamic-binaries/1.35.3-rc1/cardano-1_35_3_rc1-aarch64-ubuntu_2004.zip?raw=true
```


