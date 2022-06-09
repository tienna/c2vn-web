---
id: ansible-cardano-node
title: Get Started with Ansible for Stake Pools
sidebar_label: Ansible for Stake Pools
description: Bắt đầu với Ansible for Stake Pools
---

![ansible-cardano](https://user-images.githubusercontent.com/84546123/137635107-1b183f63-3cac-4ef9-be9e-3f116cb79aef.png)

## Tổng quan

Kho lưu trữ [Ansible cardano-node](https://github.com/moaipool/ansible-cardano-node) bao gồm [Ansible](https://www.ansible.com/) để cung cấp các nút Cardano an toàn, được tối ưu hóa cho các Nhà khai thác Stake Pool (SPO). Ban đầu nó được phát triển bởi các nhà khai thác [MOAI Pool](https://moaipool.com/) (Ticker: **MOAI**) hưng hiện đang được cung cấp cho cộng đồng Cardano lớn hơn.

Những điều sau được xử lý ra khỏi hộp:

* Bảo mật Linux cơ bản (tăng cường SSH, thiết lập tường lửa, v.v.)
* Cài đặt một nút cardano (tổng hợp từ nguồn IOHK)
* Cấu hình cơ sở cho nhà sản xuất khối và các nút chuyển tiếp
*  Thiết lập các công cụ quản trị & giám sát (cncli, gLiveView, v.v.)

Để tạo điều kiện thuận lợi cho những điều trên, các gói phần mềm tối thiểu sau được cài đặt:

* git-core
* ufw
* unattended-upgrades
* logrotate
* logwatch
* net-tools
* tmuxinator
* vim
* htop
* curl

## Nội dưng

 - [Why Ansible?](#why-ansible)
 - [Installation](#installation)
 - [Playbooks](#playbooks)
 - [Organization](#organization)
 - [Inventory setup](#inventory-setup)
 - [User setup](#user-setup)
 - [Using tags](#using-tags)
 - [Running a playbook](#running-a-playbook)
 - [Base configuration](#base-configuration)
 - [Optional components](#optional-components)
 - [Pro tips](#pro-tips)

### Why Ansible?
Ansible là một công cụ tự động hóa quản lý cấu hình, triển khai ứng dụng và cung cấp. Đã qua rồi cái thời đưa các tập lệnh bash hoặc SSH vào máy chủ của chúng tôi để tiến hành một nhiệm vụ.

Ansible là không có tác nhân, có nghĩa là nó không yêu cầu bất kỳ phần mềm cụ thể nào trên các hệ thống từ xa. SSH được sử dụng để chạy tất cả các lệnh thông qua Ansible.

Các lệnh được thực thi thông qua Ansible là [không cần thiết] (https://en.wikipedia.org/wiki/Idempotence) , có nghĩa là chúng có thể được chạy nhiều lần một cách an toàn mà không có gì bị thay đổi, trừ khi được yêu cầu. Cần đảm bảo `cardano-node` cấu hình được cập nhật trên tất cả các máy chủ? Chỉ cần chạy lệnh và Ansible sẽ đảm bảo chỉ những người cần cập nhật mới nhận được nó. Tất cả các máy chủ khác sẽ không bị ảnh hưởng.

Ansible là một dự án mã ngồn mở [open source project](https://github.com/ansible/ansible) với [hundreds of available modules](https://docs.ansible.com/ansible/2.8/modules/list_of_all_modules.html).

### Cài đặt
Một máy điều khiển duy nhất có thể được thiết lập để thực hiện các lệnh Ansible. Ví dụ bên dưới sử dụng OS X, nhưng bất kỳ nền tảng nào được cài đặt Python đều sẽ hoạt động  (including [Windows](https://docs.ansible.com/ansible/latest/intro_windows.html)).

>**Note:** Ansible được viết bằng Python, nhưng không cần thiết phải viết mã bằng Python. Bạn không bao giờ phải chạm vào Python trừ khi bạn muốn. Bản thân các tập lệnh Ansible được viết ở định dạng YAML rất đơn giản. 

Trước tiên, hãy xác minh rằng đã `pip` được cài đặt:

```
sudo apt install python-pip
```

Sau đó cài đặt Ansible và gói Python [netaddr](https://pypi.org/project/netaddr/) .Sau đó đực dử dụng `ipaddr()` lọc các mẫu Jinja2:

```
sudo pip install ansible
sudo pip install netaddr
```
Ngoài ra, nếu bạn đã cài đặt [Homebrew](https://brew.sh/) (chắc chắn phải có) thì bạn có thể cài đặt Ansible như sau:

```
brew install ansible 
```

Sau khi cài đặt xong, bạn có thể xác minh rằng mọi thứ đã được cài đặt chính xác bằng cách phát hành:

```
ansible --version
```

### Playbooks
Playbook là một phương pháp xâu chuỗi các lệnh để tạo ra một bản thiết kế hoặc tập hợp các hướng dẫn thủ tục. Ansible chạy playbook theo thứ tự, xác minh đầu ra của mỗi lệnh trước khi chuyển sang phần tiếp theo. Nếu bạn dừng quá trình thực thi playbook ở giữa và tiếp tục nó sau đó, chỉ các hướng dẫn chưa hoàn thành sẽ chạy; phần còn lại sẽ được bỏ qua.

Dưới đây là một số thuật ngữ cơ bản về playbook.

**Roles** giúp sách vở luôn ngăn nắp. Họ đã chia nhỏ các hướng dẫn xây dựng phức tạp thành các phần có thể quản lý được. Điều này cho phép các vai trò được chia sẻ giữa các vở kịch mà không cần phải sao chép mã.

**Templates** là các tệp chứa các biến và biểu thức mà mô-đun mẫu Ansible có thể thay thế bằng các giá trị thích hợp. Điều này làm cho tệp có thể được tái sử dụng nhiều hơn vì nó có thể được sử dụng động để định cấu hình một số máy chủ với cùng một tệp.

**Hosts and group variables** are part of Ansible's [inventory setup](https://docs.ansible.com/ansible/latest/intro_inventory.html) của Ansible để quản lý máy chủ riêng lẻ và các nhóm máy chủ hợp lý (chi tiết bên dưới). Điều này phủ nhận sự cần thiết phải nhớ các địa chỉ IP hoặc tên miền riêng lẻ. Nó cũng cung cấp một phương pháp đơn giản để quản lý các cấu hình dành riêng cho máy chủ.

**Handlers** cchứa logic sẽ được thực hiện sau khi một mô-đun kết thúc quá trình thực thi. Chúng hoạt động rất giống với thông báo hoặc sự kiện. Ví dụ: khi `ufw` cấu hình đã thay đổi, trình xử lý sẽ khởi động lại dịch vụ tường lửa. Điều quan trọng cần lưu ý là những sự kiện này chỉ được kích hoạt khi trạng thái mô-đun đã thay đổi.

### Tổ chức
Cấu trúc thư mục cơ bản được sử dụng để tổ chức playbook được hiển thị bên dưới:

```
├── ansible-cardano-node/
│   ├── filter_plugins
│   ├── group_vars
│   └── inventories
│       ├── block-producer/
│       ├── relay-node/
│       ├── all.yml
│       ├── vault
│   ├── roles/
│   │   ├── cardano-node/
│   │   ├── common/
│   │   ├── ssh/
│   │   └── ufw/
│   ├── ansible.cfg
│   ├── apt_periodic
│   └── provision.yml
```
Tất cả các tác vụ Ansible, trình xử lý, cấu hình, v.v. đều có ở trên. Các chi tiết cụ thể được mô tả trong các phần sau.


### Cài đặt Inventory 
Chúng ta cần cho Ansible biết điều gì sẽ chạy ở đâu trước khi chúng ta làm bất cứ điều gì khác. Ansible sử dụng một danh sách hoặc một nhóm danh sách được gọi là khoảng không quảng cáo để làm việc với nhiều nút hoặc máy chủ được quản lý trong cơ sở hạ tầng của chúng tôi cùng một lúc. Sau khi đã tạo xong khoảng không quảng cáo, chúng tôi có thể sử dụng các mẫu để chọn máy chủ hoặc nhóm mà Ansible sẽ thực thi. Giải pháp đơn giản nhất là tạo một tệp 'máy chủ' chứa tất cả các máy chủ đã biết. Định dạng của tệp này có thể là INI hoặc YAML. Sau đây là một ví dụ về tệp INI của máy chủ:

```
[node]
foo.mypool.com
bar.mypool.com
```

Việc sắp xếp khoảng không quảng cáo này hoạt động tốt đối với các cấu hình đơn giản, nhưng khi độ phức tạp của cấu hình tăng lên, nó sẽ bộc lộ những hạn chế của nó. Một kỹ thuật thích hợp cho nhu cầu của chúng ta là chia một vùng riêng lẻ `hosts` thành các nhóm chức năng. Phong cách tổ chức này không có quy tắc cứng và nhanh chóng, đây là một trong những ưu điểm mạnh mẽ của Ansible. Tuy nhiên, khi tạo khoảng không quảng cáo từ đầu, tính linh hoạt này có thể đáng sợ. Chúng tôi có thể tạo các nhóm theo dõi:

- Cái gì - Một ứng dụng, ngăn xếp hoặc dịch vụ vi mô (ví dụ: máy chủ cơ sở dữ liệu, máy chủ web, v.v.)
- Ở đâu - Một trung tâm dữ liệu hoặc vùng địa lý, để nói chuyện với DNS cục bộ, bộ nhớ, v.v. (ví dụ: đông, tây, Newark, Paris, Cape Town)
- Khi nào - Giai đoạn phát triển, để tránh thử nghiệm trên tài nguyên sản xuất (ví dụ: mạng chính, mạng thử nghiệm)

Vì mục đích của chúng tôi, chúng tôi đã chọn sự kết hợp của cấu trúc nhóm "cái gì" và "khi nào". Hãy xem tổng quan cấp cao về cấu trúc nhóm khoảng không quảng cáo của chúng tôi:

```
├── ansible-cardano-node/
    └── inventories
        ├── block-producer/
        └── relay-node/
```

Bạn có thể thấy rằng mỗi nhóm này tương ứng với một loại nút duy nhất. Trong `block-producer` chúng tôi tìm thấy một tệp INI như sau:

```
[node]
blockprod.mypool.com ansible_user=deploy
```

Ở đây, người dùng Ansible `deploy` được sử dụng xuyên suốt, mặc dù một người dùng khác với các quyền / khả năng cụ thể có thể được xác định cho mỗi máy chủ. Bạn cũng có thể thấy rằng các nhóm chức năng (hoặc "cái gì") được xác định ở đây với mỗi tên miền đủ điều kiện (FQDN) tương ứng với một máy chủ phụ trợ sản xuất.

:::note 
Vì lý do bảo mật, bạn có thể muốn làm xáo trộn hoặc ẩn (các) địa chỉ IP công cộng của nhà sản xuất khối của mình. Trong trường hợp này, bạn có thể thay thế FQDN trong ví dụ trên bằng một địa chỉ IP. Kết quả cuối cùng là như nhau.
::::

### Nhóm biến
Nhóm rất tốt cho tổ chức, nhưng chúng cũng được sử dụng để xử lý các biến. Ví dụ, tệp `/groups_vars/all` có các lỗi sau:

```
---
# Cross-environent variables are stored here

# ports 
ssh_port: "22"
cardano_default_port: "6000"

```

Đây là một ví dụ rất nhỏ. Tuy nhiên, bạn có thể nghĩ về cách `group_vars` có thể được sử dụng để lưu trữ các biến hoặc các cài đặt khác trên [functional or per-group basis](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#defining-variables-in-inventory). 

:::note 
Ansible provides Ansible cung cấp một phương tiện [vault]](https://www.ansible.com/blog/2014/02/19/ansible-vault) để mã hóa dữ liệu như mật khẩu hoặc khóa, chứ không phải là văn bản rõ ràng trong sách phát.
::::

### Cải đặt người dừng
Chúng tôi tăng cường bảo mật và dễ sử dụng bằng cách yêu cầu xác thực khóa công khai cho tài khoản người dùng của chúng tôi. Sau đó Ansible chỉ tương tác thông qua tài khoản **triển khai** .

1. Bắt đầu bằng cách tạo người dùng triển khai :

	```
	useradd deploy
	mkdir /home/deploy
	mkdir /home/deploy/.ssh
	chmod 700 /home/deploy/.ssh
	chown -R deploy:deploy /home/deploy
	```
    
Đặt mật khẩu mạnh cho người dùng mới `passwd deploy`:. Bạn sẽ sử dụng điều này một lần khi thêm khóa công khai của mình trong bước tiếp theo. Sau đó, Ansible sẽ không cần mật khẩu.

2. Sao chép an toàn khóa công khai từ máy trạm của bạn sang máy chủ từ xa (trong ví dụ này là relay1.mypool.com):

	```
	ssh-copy-id -i ~/.ssh/id_rsa.pub deploy@relay1.mypool.com
	
	The authenticity of host 'relay1.mypool.com (<no hostip for proxy command>)' can't be established.
	ECDSA key fingerprint is SHA256:HRTSF5/nHmrgiNDvHFZ6OhxF9whXl4o7O1KwuW6Fbd0.
	Are you sure you want to continue connecting (yes/no)? yes
	/usr/local/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
	/usr/local/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
	deploy@relay1.mypool.com's password:
	
	Number of key(s) added: 1
	```

Bây giờ hãy thử đăng nhập vào máy bằng `ssh deploy@relay1.mypool.com` để xác minh rằng khóa đã được thêm thành công.
	
3. Sử dụng visudo để cấp quyền truy cập sudo cho người dùng triển khai và không yêu cầu mật khẩu mỗi lần:

```
visudo
```
Nhận xét tất cả các dòng cấp cho người dùng / nhóm hiện có và thêm:
	
```
# User privilege specification
root    ALL=(ALL:ALL) ALL
deploy  ALL=(ALL) NOPASSWD:ALL
	
# Allow members of group sudo to execute any command
%sudo  ALL=(ALL:ALL) NOPASSWD:ALL

```

Đăng nhập với tư cách là người dùng triển khai và xác minh rằng bạn có quyền truy cập sudo bằng tùy chọn -v (xác thực):
	
```
sudo -v
```
	
Bạn có thể sẽ muốn thay đổi trình bao mặc định thành bash:
```
sudo chsh -s /bin/bash deploy
```

### Sử dựng tags
Thẻ là các thuộc tính được xác định trong cấu trúc Ansible có thể được sử dụng để thực hiện một tập hợp con các nhiệm vụ một cách chọn lọc. Các thẻ có giá trị cao vì chúng chỉ cho phép chúng tôi chạy một phần của sách vở lớn thay vì toàn bộ. Trong Ansible, các thẻ có thể được sử dụng cho nhiều cấu trúc khác nhau, mặc dù ứng dụng cơ bản nhất của chúng là với các tác vụ riêng lẻ. Hai nhiệm vụ bên trong vai trò 'cardano-node' sử dụng các thẻ riêng biệt được hiển thị bên dưới:

```
- name: "Node Install | Building Cardano node"
  shell: cd /home/{{ server_username }}/cardano-node && cabal build cardano-node cardano-cli
  tags:
    - install
    - node

- name: "Node Install | Stop cardano-node service"
  systemd:
    name: cardano-node.service
    state: stopped
  tags:
    - binaries
    - install
    - node
```

Khi chạy một playbook, bạn có thể sử dụng `–tags` hoặc `–skip-tags` để thực hiện một tập hợp con các nhiệm vụ. Bạn cũng có thể xem nhiệm vụ nào sẽ được thực thi với các tùy chọn này bằng cách kết hợp nó với `--list-tasks`. Ví dụ:

```
ansible-playbook provision.yml --tags "install" --list-tasks
```

Sử dụng thẻ nâng cao bao gồm thẻ kế thừa và thẻ đặc biệt được đề cập [here](https://docs.ansible.com/ansible/latest/user_guide/playbooks_tags.html). 

### Running a playbook
Dưới đây là một ví dụ về thực thi playbook. Playbook này nhắm mục tiêu khoảng không `relay-node` quảng cáo bằng cách sử dụng thông tin đăng nhập vault. Các tác vụ chỉ định tùy chọn `--tags` được gắn thẻ là cài đặt "cấu hình". Cuối cùng, `--check` chế độ là một tùy chọn "chạy khô" không thực hiện bất kỳ thay đổi nào trên các hệ thống từ xa:

```
ansible-playbook provision.yml -i inventories/relay-node --vault-password-file ~/.vault_pass.txt --tags "install" --check
```
Giả sử tệp máy chủ lưu trữ được điền và máy chủ có thể truy cập được, bạn sẽ thấy một số đầu ra như sau:

![playbook](https://user-images.githubusercontent.com/229399/135495282-5aaa1f3d-77d3-472b-826e-079c81b1da82.png)

Quá trình trên bao gồm tải xuống và biên dịch cardano-nodetừ nguồn, cùng với các phần phụ thuộc mới nhất, nếu cần. 

### Base configuration
Một tập hợp các cài đặt cơ sở tốt đã biết được cung cấp trong cuốn sách này. Nếu có thể, dưới mỗi vai trò, bạn sẽ tìm thấy một tệp được gọi `/defaults/main.yml`. Các tệp này chứa các giá trị mặc định cho các biến và phải được sửa đổi trước khi cấp phép máy chủ lưu trữ trực tiếp. Ví dụ: `ssh` role áp dụng một số phương pháp hay nhất về bảo mật Linux để tăng cường khả năng truy cập shell an toàn vào các nút của bạn. Tệp `ssh/defaults/main.yml` phải được sửa đổi để phù hợp với địa chỉ IP quản trị từ xa của bạn (tức là máy bạn thực thi Ansible):

```
ssh_allowed_users: "AllowUsers deploy@127.0.0.1/32"
```

Vai `ufw` trò định cấu hình dịch vụ tường lửa Linux và yêu cầu xác định các giá trị mặc định sau:

```
# Relay node public IP addresses
relay_node_ips:
  - 127.0.0.1/32  #relay1.mypool.com
  - 127.0.0.2/32  #relay2.mypool.com

# Trusted IP addresses, used for remote access/administration
trusted_ips:
  - 127.0.10.1/32
  - 127.0.10.2/32
```

Các giá trị trình giữ chỗ cho các nút chuyển tiếp ở trên phải đồng ý với địa chỉ IP máy chủ chuyển tiếp thực của bạn, nếu không chúng sẽ không thể giao tiếp với nhà sản xuất khối hoặc với nhau.

Tương tự như vậy, tệp `cardano-node/defaults/main.yml` chứa các giá trị sẽ được sử dụng để điền siêu dữ liệu nhóm của bạn. Các giá trị trình giữ chỗ này phải được thay thế:
```
# Pool metadata
cardano_pool_name: "My Cardano Stake Pool"
cardano_pool_description: "A description of my stake pool"
cardano_pool_ticker: "My Pool ticker symbol"
cardano_pool_homepage: "https://mypool.com/"
cardano_pool_extended: "https://mypool.com/extendedMetaData.json"
```

Đảm bảo xác định khoảng không quảng cáo của bạn trước khi thực hiện playbook. Tệp kiểm kê cho các nút chuyển tiếp của bạn phải chứa FQDN cho mỗi rơle của bạn. Tệp này tồn tại trong `inventories/relay-node/inventory`:

```
[node]
relay1.mypool.com ansible_user=deploy
relay2.mypool.com ansible_user=deploy
```

Tương tự như vậy, chỉ định một địa chỉ IP công cộng cho nhà sản xuất khối của bạn. Tệp này tồn tại trong `inventories/block-producer/inventory:`

```
[node]
127.0.0.1 ansible_user=deploy
```

### Optional components

#### cardano-submit-api
Cung `cardano-submit-api` cấp một API web cho phép các giao dịch (ví dụ: được tạo bởi ví bên ngoài) được đăng lên chuỗi khối Cardano. Để gửi một giao dịch đến mạng (mainnet, staging hoặc bất kỳ testnet nào), `cardano-node` phải đang chạy và có quyền truy cập vào tệp genesis và giá trị băm genesis cho mạng. Do playbook của chúng tôi cài đặt đầy đủ `cardano-node`, yêu cầu này đã được đáp ứng.

Các nhà điều hành nhóm cổ phần có thể muốn cài đặt và kích hoạt API web trên một hoặc nhiều rơle của họ. Điều này cung cấp một mempool khác để người dùng gửi các giao dịch của họ. Thành phần này bị tắt theo mặc định. Để bật nó, hãy đặt giá trị sau `/roles/cardano-node/defaults/main.yml` thành `true`:

```
# Cardano submit API (optional)
cardano_submit_api: false
```

Bạn có thể muốn cài đặt phần này `cardano-submit-api` như một phần của thiết lập nút chuyển tiếp mặc định của mình hoặc chọn lọc sau khi các rơle của bạn hoạt động. Trong trường hợp sau, bạn có thể cài đặt API web bằng cách chỉ định thẻ được liên kết khi thực thi playbook, như sau:

```
ansible-playbook provision.yml -i inventories/relay-node --vault-password-file ~/.vault_pass.txt --tags "api"
```

>**Note:**  Để ngăn việc cài đặt `cardano-submit-api` trên trình tạo khối, các tác vụ này sẽ _only_ thực hiện nếu khoảng không `relay-node` quảng cáo được chỉ định trong quá trình thực thi playbook. 


Các tác vụ liên quan sẽ xử lý quá trình xây dựng và cài đặt của `cardano-submit-api` to `/usr/bin`. Nó cũng sẽ kiểm tra và, tùy chọn, tải xuống[mainnet base configuration settings](https://raw.githubusercontent.com/input-output-hk/cardano-node/master/cardano-submit-api/config/tx-submit-mainnet-config.yaml).

Cuối cùng, hai tập lệnh được tạo: 1) `tx-api.sh` được thêm vào `/opt/cardano/cnode/scripts` để xử lý việc khởi động API và 2) `tx-api.service` được cài đặt `/etc/systemd/system` và kích hoạt. Dịch vụ thứ hai `systemd` cho phép API bắt đầu và kiểm tra trạng thái đang chạy của nó, như sau

```
sudo systemctl start tx-api.service
sudo systemctl status tx-api.service
```

Với dịch vụ API đang hoạt động, (các) nút chuyển tiếp của bạn sẽ có một api gửi tx chạy trên cổng 8090. Để làm cho điều này khả dụng bên ngoài mạng cục bộ của bạn, bạn sẽ cần phải mở cổng. Điều này có thể được thực hiện với ufwnhư vậy:

```
sudo ufw allow 8090/tcp
```

Ví dụ về giao dịch đã ký được hiển thị bên dưới:

```
$ curl --header "Content-Type: application/cbor" -X POST http://localhost:8090/api/submit/tx --data-binary @tx.signed.cbor
"8a3d63d4d95f669ef62570f2936ad50d2cfad399e04808ca21474e70b11987ee"%
```

### Pro tips
Sử dụng tùy chọn của Ansible `--check` khi thực hiện playbook lần đầu tiên. Thao tác này sẽ thực thi playbook một cách an toàn và kiểm tra bất kỳ lỗi nào mà không cần sửa đổi máy chủ của bạn.

Nếu trước đây bạn đã định cấu hình các nút Cardano của mình theo cách thủ công, thì bạn nên bắt đầu với bản cài đặt mới Ubuntu 20.04 LTS và thực thi playbook Ansible của mình trên máy chủ mới này.


chỉnh sửa trang này
Cập nhật lần cuối vào 3/9/2022 bởi John
