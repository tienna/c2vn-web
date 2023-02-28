---
id: prove-wallet-ownership
sidebar_position: '13'
title: Chứng minh quyền sở hữu ví bằng mật mã
sidebar_label: Chứng minh quyền sở hữu ví bằng mật mã
description: Thật dễ dàng để chứng minh quyền sở hữu tài khoản bằng mật mã bằng cách ký một phần dữ liệu bằng khóa riêng. Vì địa chỉ công khai của người dùng có thể được sử dụng làm mã định danh của họ nên chúng ta có thể xây dựng cơ chế xác thực dựa trên việc ký thông báo. Cơ chế này được thực hiện bằng cách có thể chứng minh bằng mật mã quyền sở hữu tài khoản bằng cách ký một phần dữ liệu cụ thể bằng khóa riêng tư tương ứng. Nếu dữ liệu được ký chính xác, thì `backend` sẽ nhận ra nó là chủ sở hữu của địa chỉ công khai.
#image: "../img/og/og-getstarted-mesh.png"
---

# Chứng minh quyền sở hữu ví bằng mật mã

Chứng minh bằng mật mã quyền sở hữu của ví bằng cách ký một phần dữ liệu sử dụng ký hiệu dữ liệu.

Thật dễ dàng để chứng minh quyền sở hữu tài khoản bằng mật mã bằng cách ký một phần dữ liệu bằng khóa riêng. Vì địa chỉ công khai của người dùng có thể được sử dụng làm mã định danh của họ nên chúng ta có thể xây dựng cơ chế xác thực dựa trên việc ký thông báo. Cơ chế này được thực hiện bằng cách có thể chứng minh bằng mật mã quyền sở hữu tài khoản bằng cách ký một phần dữ liệu cụ thể bằng khóa riêng tư tương ứng. Nếu dữ liệu được ký chính xác, thì `backend` sẽ nhận ra nó là chủ sở hữu của địa chỉ công khai.

Các xác nhận quyền sở hữu JSON Web Token (JWT) thường có thể được sử dụng để chuyển danh tính của người dùng được xác thực giữa nhà cung cấp danh tính và nhà cung cấp dịch vụ. Máy chủ (nhà cung cấp dịch vụ) có thể tạo token và cung cấp mã đó cho khách hàng (nhà cung cấp danh tính). Sau đó, khách hàng có thể sử dụng token đó để chứng minh quyền sở hữu ví, những token này có thể được ký bằng khóa riêng của một bên.

Một số cách sử dụng dấu hiệu dữ liệu để chứng minh quyền sở hữu bằng mật mã:

- Xác thực người dùng đăng nhập bằng JSON Web Token (JWT) . Thông tin đăng nhập bảo mật bằng mật mã để chứng minh quyền sở hữu tài khoản bằng cách ký một phần dữ liệu bằng khóa riêng.
- Xác thực hành động của người dùng . Nếu Backend muốn xác nhận ủy quyền của người dùng đối với một hành động ngoài chuỗi, chẳng hạn như thực hiện giao dịch trong trò chơi.
- Luồng tài khoản ngoài chuỗi . Nếu bạn cần hiển thị một số dữ liệu ngoại tuyến hoặc trên một trang web chỉ cho một người dùng cụ thể được xác định bằng ví của họ, bạn có thể sử dụng tin nhắn làm phương tiện để thực hiện việc đó.



## Làm thế nào nó hoạt động?

![](img/cryptographically-prove-wallet-ownership-process.png)

Bằng cách ký một tin nhắn, bạn xác nhận rằng bạn đang kiểm soát địa chỉ ví được liên kết với Chuỗi khối và do đó có thể chứng minh quyền sở hữu địa chỉ đó.

Có 4 thành phần để ký một thông điệp:

- Địa chỉ ví người dùng
- Khóa riêng
- Khóa công khai
- Tin nhắn để ký

Để kiểm tra xem người dùng có sở hữu một địa chỉ nhất định trên trang Web3 hay không, người ta cần cung cấp một thông báo và yêu cầu người dùng "ký" vào đó. "Chữ ký" này được tạo bằng tin nhắn, khóa riêng của người dùng, khóa chung và thuật toán mật mã.

Để đảm bảo chữ ký hợp lệ, thuật toán mã hóa tương tự được áp dụng cho thông báo và khóa công khai được lấy. Bạn có thể tự hỏi làm thế nào điều này được bảo mật và câu trả lời là nếu không có khóa riêng, việc xác thực thông báo và khóa chung không thể khớp bằng mật mã, do đó xác nhận quyền sở hữu.

## **Client:** Kết nối ví và nhận địa chỉ đặt cược

Mô hình Người dùng được lưu trữ trong cơ sở dữ liệu của `backend` phải có hai trường bắt buộc: địa chỉ công khai và nonce. Hơn nữa, địa chỉ này phải là duy nhất. Các chi tiết khác về người dùng, chẳng hạn như tên người dùng, ID Twitter và các trường tên, không cần thiết cho quy trình này nhưng có thể được thêm vào.

Địa chỉ công khai của người dùng làm số nhận dạng, trong Cardano, chúng ta có thể sử dụng địa chỉ đặt cược trong ví của họ. Điều này sẽ được lưu trữ trong cơ sở dữ liệu phía máy chủ để có thể liên kết các ví được ủy quyền. Người dùng không bao giờ phải lo lắng về việc nhập địa chỉ của họ theo cách thủ công vì có thể truy xuất địa chỉ này bằng cách sử dụng hàm `wallet.getRewardAddresses()`.

Với ví của người dùng được kết nối, lấy địa chỉ đặt cược của người dùng và gửi nó đến `backend` của chúng ta.

```javascript
const { wallet, connected } = useWallet();

async function frontendStartLoginProcess() {
  if (connected) {
    const userAddress = (await wallet.getRewardAddresses())[0];

     // do: send request with 'userAddress' to the backend
  }
}

```

## Server: Tạo số Nonce và Lưu trữ trong Cơ sở dữ liệu

Trước tiên chúng ta cần tạo một số `nonce` mới, được khởi tạo dưới dạng một chuỗi ngẫu nhiên. Mục đích của việc này là tạo một thông báo duy nhất có thể được sử dụng để xác thực ví của người dùng. Số Nonce này sẽ là trọng tải để người dùng chứng minh quyền sở hữu của ví. Với Mesh, bạn có thể tạo một số `nonce` mới với hàm `generateNonce()` và đặt thông báo là `Sign to login in to Mesh: nonce`.

Bằng cách sử dụng hàm `userAddress`, chúng ta có thể tra cứu cơ sở dữ liệu để xác định xem người dùng là mới hay đã tồn tại.

Nếu người dùng là người dùng mới, chúng ta có thể tạo mục nhập người dùng mới, lưu trữ địa chỉ đặt cược, số `nonce` của họ và đặt trạng thái của họ là "chưa được xác minh". Khi người dùng đã xác minh thành công, chúng ta có thể cập nhật trạng thái của họ thành "đã xác minh" trong cơ sở dữ liệu của chúng ta.

Đối với người dùng đã tồn tại, chúng ta chỉ cần lưu trữ số nonce mới được tạo vào cơ sở dữ liệu.

```javascript
import { generateNonce } from '@meshsdk/core';

async function backendGetNonce(userAddress) {
  // do: if new user, create new user model in the database

  const nonce = generateNonce('Sign to login in to Mesh: ');

  // do: store 'nonce' in user model in the database

  // do: return 'nonce'
}
```

Cuối cùng, chúng ta sẽ trả lại số `nonce` để người dùng ký bằng khóa riêng của họ.

## **Client: ** Xác minh quyền sở hữu bằng cách ký nonce

chúng ta sẵn sàng sử dụng khóa cá nhân được liên kết với ví để ký số `nonce` với hàm `await wallet.signData(userAddress, nonce)` , cho phép dApp yêu cầu người dùng ký theo [CIP-8](https://cips.cardano.org/cips/cip8/) .

Chúng ta yêu cầu sự cho phép của người dùng và hiển thị cho họ thông báo sẽ được ký: `Sign to login in to Mesh: nonce`. Sau khi được chấp nhận, chữ ký sẽ được tạo và dApp sẽ xử lý chữ ký để xác thực người dùng.

```javascript
async function frontendSignMessage(nonce) {
  try {
    const userAddress = (await wallet.getRewardAddresses())[0];
    const signature = await wallet.signData(userAddress, nonce);

    // do: send request with 'signature' and 'userAddress' to the backend
  } catch (error) {
    // catch error if user refuse to sign
  }
}

```

## **Server:** Xác minh chữ ký

Khi Backend nhận được yêu cầu, nó sẽ truy xuất người dùng từ cơ sở dữ liệu có liên quan đến địa chỉ được chỉ định trong yêu cầu. Sau đó, nó lấy `nonce` liên quan từ cơ sở dữ liệu, đây là một giá trị ngẫu nhiên chỉ người dùng biết.

Với số `nonce`, địa chỉ đặt cược và chữ ký, Backend có thể kiểm tra bằng mật mã để đảm bảo rằng `nonce` đã được người dùng ký chính xác. Điều này cho phép Backend xác minh rằng người dùng là chủ sở hữu của địa chỉ công khai, vì chỉ chủ sở hữu địa chỉ mới biết giá trị `nonce` và có thể ký tên đó bằng khóa riêng được liên kết.

Nếu chữ ký được xác minh, người dùng đã xác thực thành công và giao diện người dùng sau đó sẽ nhận được token Web JSON (JWT) hoặc mã định danh phiên để cho phép người dùng truy cập các tài nguyên khác. Đây là một ví dụ dành cho quy trình đăng nhập, nhưng bạn có thể thay đổi nó thành phê duyệt một hành động cụ thể.

chúng ta cũng đảm bảo rằng `nonce` không được sử dụng lại, vì điều này sẽ giúp kẻ tấn công có thể giành được quyền truy cập vào tài khoản của người dùng. Điều này được thực hiện bằng cách tạo một `nonce` ngẫu nhiên cho người dùng và lưu nó vào cơ sở dữ liệu. Bằng cách liên tục tạo một `nonce` duy nhất mỗi khi người dùng đăng nhập, chúng ta có thể đảm bảo chữ ký của người dùng được bảo mật và tài khoản của họ an toàn.

```javascript
import { checkSignature } from '@meshsdk/core';

async function backendVerifySignature(userAddress, signature) {
  // do: get 'nonce' from user (database) using 'userAddress'

  const result = checkSignature(nonce, userAddress, signature);

  // do: update 'nonce' in the database with another random string

  // do: do what you need after user proof ownership
  // it could be creating a valid JSON Web Token (JWT) or session
  // it could be doing something offchain
  // it could just be updating something in the database
}

```

## Đặt tất cả chúng lại với nhau

Hãy đặt tất cả chúng lại với nhau. Mã lối vào của bạn phải chứa hai hàm `frontendStartLoginProcess()`và  `frontendSignMessage(nonce)`.

Để đăng nhập bằng ví, bạn có thể sử dụng `CardanoWallet` thành phần React UI để kết nối và đăng nhập bằng ví:

```javascript
<CardanoWallet
  label="Sign In with Cardano"
  onConnected={() => frontendStartLoginProcess()}
/>
```

Đặt các mã giao diện người dùng lại với nhau có thể trông như thế này:

```javascript
import { CardanoWallet, useWallet } from '@meshsdk/react';

export default function Page() {
  const { wallet, connected } = useWallet();
  
  async function frontendStartLoginProcess() {
    if (connected) {
      const userAddress = (await wallet.getRewardAddresses())[0];
      const nonce = await backendGetNonce(userAddress);
      await signMessage(nonce);
    }
  }
  
  async function frontendSignMessage(nonce) {
    try {
      const userAddress = (await wallet.getRewardAddresses())[0];
      const signature = await wallet.signData(userAddress, nonce);
      await backendVerifySignature(userAddress, signature);
    } catch (error) {
      setState(0);
    }
  }

  return (
    <>
      <CardanoWallet
        label="Sign In with Cardano"
        onConnected={() => frontendStartLoginProcess()}
      />
    </>
  );
}
```

Và mã phía máy chủ phải có 2 điểm cuối REST ` backendGetNonce(userAddress)` và `backendVerifySignature(userAddress, signature)`

 mã có thể giống như sau:
 
```javascript
import { checkSignature, generateNonce } from '@meshsdk/core';

async function backendGetNonce(userAddress) {
  const nonce = generateNonce('Sign to login in to Mesh: ');
  return nonce;
}

async function backendVerifySignature(userAddress, signature) {
  // do: get 'nonce' from database

  const result = checkSignature(nonce, userAddress, signature);
  if(result){
    // create JWT or approve certain process
  }
  else{
    // prompt user that signature is not correct
  }
}
```

*Mặc dù hướng dẫn này chỉ cho bạn cách bạn có thể đăng nhập bằng ví, nhưng bạn có thể sử dụng kỹ thuật này để xác thực bất kỳ hành động nào của người dùng.*
