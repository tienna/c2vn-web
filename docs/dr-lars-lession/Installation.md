Cài đặt playground tại máy local
========================

Xây dựng môi trường nhà phát triển Plutus trên Ubuntu 20.04

Chi tiết 

Xây dựng môi trường Plutus Dev sử dụng (các) Kết quả mong muốn của Oracle VM VirtualBox Môi trường dành cho nhà phát triển làm việc cho Plutus

Tài nguyên

Cấu hình máy tính tốt:
Máy tính cài phần mềm VM virtualBox 32 GB ram 
Hơn 100 GB dung lượng ổ cứng 
Hình ảnh với phần mềm Ubuntu Desktop 20.04

	Ghi chú

	Các hướng gẫn này hoạt động kể từ ngày 5/12/2021. Mọi thứ sẽ thay đổi theo thời gian. Vui lòng luôn kiểm tra kho lưu trữ github được liệt kê bên dưới để biết hướng dẫn cập nhật và bất kỳ thay đổi. Những hướng dẫn này không tuân theo hướng dẫn trên github như đã liệt kê, nhưng đây là cách tôi có thể làm cho mọi thứ hoạt động. Một trong những vấn đề khó khăn nhất trong buổi học đầu tiên là làm cho nó hoạt động, đây chỉ là cách tôi đã làm được. có những lựa chọn khác.

	Các hướng dẫn sẽ được chia thành 2 phần. Phần đầu tiên hướng dẫn bạn cách cài đặt Haskell và các thành phần cần thiết trực tiếp vào máy ảo. Phần thứ hai hướng dẫn bạn cách cài đặt các tệp nhị phân nix-shell và Plutus cần thiết để chạy sân chơi plutus.
	
	 `Bạn cũng có thể sử dụng nix-shell cho bài tập về nhà của mình. Nếu bạn quyết định làm điều đó, Bạn có thể bỏ qua cài đặt Haskell.`


Phần 1
------

1) Tạo máy ảo với ít nhất 8 GB ram và 100 GB dung lượng lưu trữ. Đảm bảo rằng bạn chọn Ubuntu 64.

2) Bắt đầu chạy VM

3) Chọn hình ảnh VM cho ubuntu 20.04

4) Thực hiện quy trình bình thường để cài đặt ubuntu trên hệ thống của bạn (VM)


Sau khi bạn vào ubuntu của mình:

1) cập nhật và nâng cấp phần mềm:

```
	sudo apt update
	sudo apt upgrade -y
```

2) Cài đặt haskell

```
	sudo apt-get install haskell-platform
```

3) Cài đặt ghcup và tất cả các tùy chọn (ghcup giúp dễ dàng di chuyển giữa các phiên bản của haskell, v.v.)

```
	sudo apt install curl
	
	sudo apt install build-essential curl libffi-dev libffi6 libgmp-dev libgmp10 libncurses-dev libncurses5 libtinfo5 libsodium-dev

	curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh 

```
Điều này có thể mất một thời gian

`KHỞI ĐỘNG LẠI VM ĐẦU TIÊN`

```
	ghc --version
```

-- Nó phải là trở lên: 8.10.4

```
	cabal --version
```

-- Nó phải là trở lên: 3.4.0.0


4) Nhân bản plutus và thư mục tiên phong plutus. Bạn có thể đặt chúng ở bất cứ đâu. tôi đã tạo một thư mục riêng biệt để đưa chúng vào:

```
	sudo apt install git

	mkdir cardano

	cd cardano

	git clone https://github.com/input-output-hk/plutus

	git clone https://github.com/input-output-hk/plutus-pioneer-program
```

 -- Bây giờ bạn có mọi thứ bạn cần để chỉnh sửa hợp đồng thông minh và chạy chúng với giao diện dòng lệnh 

 -- Bạn phải chạy cập nhật cabal và xây dựng cabal trước khi bắt đầu ở một phần khác của bài tập về nhà 

-- Lần đầu tiên bạn chạy xây dựng cabal sẽ mất nhiều thời gian ...

-- Bây giờ bạn cũng có thể chạy repl và test haskel - hầu hết tất cả các ví dụ này đều có trong video bài học đầu tiên 


Phần 2
------

-- Bây giờ chúng ta sẽ cài đặt nix

1) Chúng ta cần cài đặt bộ nhớ đệm

Tạo thư mục /etc/nix/:

```
	sudo mkdir /etc/nix
```

Sử dụng trình chỉnh sửa mã để đưa nội dung sau vào tệp có tên nix.conf trong thư mục nix `(/etc/nix/nix.conf)`:

```
substituters        = https://hydra.iohk.io https://iohk.cachix.org https://cache.nixos.org/

trusted-public-keys = hydra.iohk.io:f/Ea+s+dFdN+3Y/G+FDgSq+a5NEWhJGzdjvKNGv0/EQ= iohk.cachix.org-1:DpRUyj7h7V830dp/i6Nti+NEO2/nhblbov/8MW7Rqoo= cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY=
```

2) Cài đặt nix

```
	curl -L https://nixos.org/nix/install | sh
```

* Sau khi bạn cài đặt nix, hãy đảm bảo cài đặt các biến môi trường. Nó sẽ cho bạn biết làm thế nào sau khi cài đặt xong nix. nó sẽ giống cái này

* Như thế này   .  /home/(user)/.nix-profile/etc/profile.d/nix.sh


* bạn cũng có thể cần thêm nix vào Đường dẫn của mình. Tôi thực hiện bằng cách thêm  ~/.nix-profile/bin   vào file /etc/environment. Sau đó bạn khởi động lại Máy tính

* Để nó hoạt động


3) Chạy lệnh nix trong thư mục Plutus::

` Trước khi chạy lệnh nix-build sau, hãy đặt thẻ trong plutus trở lại thẻ ban đầu (3746610e53654a1167aeb4c6294c6096d16b0502) từ ngày học đầu tiên. Điều này đã giải quyết được sự cố mà tôi đang gặp phải với ứng dụng Client không biên dịch chính xác với các sáng tạo môi trường nhà phát triển mới hơn.`

```
	~/cardano/plutus $ git checkout 3746610e53654a1167aeb4c6294c6096d16b0502
```

``` 
	~/cardano/plutus $ nix build -f default.nix plutus.haskell.packages.plutus-core.components.library
```

-- Điều này sẽ mất nhiều thời gian và bạn sẽ nhận được cảnh báo về việc: `dumping very large path`.   Bạn có thể bỏ qua điều đó.


-- Sau khi hoàn tất, mọi thứ đã được cài đặt ngoại trừ trình chỉnh sửa mã bạn sẽ sử dụng

-- Lần đầu tiên bạn chạy nix-shell, nó cũng sẽ mất một lúc

-- video đầu tiên hướng dẫn bạn cách khởi động ứng dụng và máy chủ sân chơi plutus

Phần 3
------

Điều trên sẽ thiết lập môi trường của bạn với các phụ thuộc cần thiết để biên dịch các hợp đồng mẫu.

Khi bạn đã ở bên trong Nix shell, bạn có thể khởi động máy khách và máy chủ Plutus từ kho lưu trữ Plutus của bạn.

Các video bài giảng được ghi lại vào nhiều thời điểm khác nhau và mã Plutus cùng với chúng được biên soạn dựa trên các cam kết cụ thể của nhánh chính của Plutus. Bạn có thể tìm thấy thẻ cam kết trong tệp cabal.project.

-- Bạn mở 2 terminal một cho server 1 cho client

### Server

Tại terminal 1 bạn chạy:

``` 
	cd /path/to/plutus/repo/plutus-playground-client
	
	plutus-playground-server
```


### Client

Tại terminal 2 bạn chạy:

```
	cd /path/to/plutus/repo/plutus-playground-client
	npm run start
```

### Biên dịch

Để kiểm tra xem mọi thứ có theo thứ tự hay không, sau đó bạn có thể biên dịch mã cho week01. Điều này không cần thiết để chạy mã trong sân chơi, vì sân chơi có thể tự biên dịch mã.

```
	cd /path/to/plutus-pioneer-program/repo/code/week01
	cabal build all
```

Nếu mọi thứ suôn sẻ trong thiết lập ở trên, bạn sẽ có thể mở sân chơi tại https://localhost:8009. Bạn có thể sẽ nhận được lỗi chứng chỉ, lỗi này có thể được bỏ qua.
