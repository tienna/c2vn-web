---
id: overview
slug: /operate-a-stake-pool/
title: Operate a Stake Pool
sidebar_label: Overview
description: Điều hành một nhóm cổ phần.
#image: ../img/og-developer-portal.png
---

![Cardano Operate a Stake Pool](../../static/img/card-operate-a-stake-pool-title.svg)

Có sẵn các hướng dẫn tuyệt vời về cách thiết lập cardano-node như một nhóm cổ phần. Bạn thậm chí có thể thiết lập một hệ điều hành mà không cần có kinh nghiệm sử dụng Linux trước đây hoặc quan tâm đến các phương pháp hay nhất. Chỉ cần sao chép và dán các lệnh từ hướng dẫn vào trình bao của bạn.

Thật không may, chỉ đơn giản là khởi động và chạy nút của bạn là không đủ. Bạn phải có khả năng quản lý, cập nhật và bảo vệ nó. Để làm như vậy, trước tiên bạn phải hiểu những gì bạn đang làm.

Sau khi bạn đã nắm vững những nguyên tắc cơ bản này, bạn sẽ cần tiếp thị nhóm cổ phần của mình một cách hiệu quả để tạo nên thành công.

## Điều kiện tiên quyết đối với những người muốn học cách điều hành một nhóm cổ phần là gì?
- Kiến thức về cách quản lý máy chủ. Bạn phải quen thuộc với hệ điều hành bạn chọn để quản lý, duy trì và bảo mật máy chủ của mình.
- Điều này bao gồm sự hiểu biết kỹ lưỡng về cách mạng hoạt động, cũng như cách sao lưu và khôi phục dữ liệu.
- Có kinh nghiệm giải thích tài liệu và thực hiện các phương pháp hay nhất
- Hiểu Cardano, blockchain, ví và các cặp khóa ở cấp độ cơ bản.

## Nếu tôi không đạt yêu cầu thì sao?
Nếu bạn không đáp ứng tất cả các bằng cấp, bạn sẽ cần có một mong muốn học tập mạnh mẽ và hiểu rằng bạn sẽ không thể học tất cả mọi thứ trong một vài tuần.

Chúng tôi đã quan sát những người không có kiến ​​thức trước về Linux, shell hoặc mạng, nhưng họ đã cam kết và có đủ thời gian để giải quyết nó một cách hợp lý và những người hiện đang quản lý một nhóm cổ phần sinh lời. Nó không dành cho tất cả mọi người và nó sẽ không đơn giản. Dưới đây là một số tài nguyên giúp bạn bắt đầu:

- [Bắt đầu với Linux](https://ubuntu.com/tutorials/command-line-for-beginners#1-overview).
- [Hãy xem nix và NixOS](https://nixos.org).
- [Chọn an ninh hơn thoải mái](#Chọn-an-ninh-hơn-thoải-mái).
- [Hoàn thành khóa học đặt cọc stake pool](#stake-pool-course).
- [Diễn đàn điều hành hồ bơi cổ phần](https://forum.cardano.org/c/staking-delegation/156).

## Chọn an ninh hơn thoải mái
Các thủ tục tốt nhất luôn phải là một cân nhắc chính khi điều hành một nhóm cổ phần. Bảo mật không phải là thứ bạn có thể bật, tắt hoặc thay đổi trong tệp cấu hình. Đó vừa là thái độ vừa là cách sống.
- [Thảo luận về các chủ đề liên quan đến bảo mật với các nhà điều hành nhóm cổ phần .](https://forum.cardano.org/c/staking-delegation/stake-pool-security/157).

Tìm hiểu những phím nào khả dụng, phím nào nóng và nhạy, và phím nào bạn không bao giờ nên lưu trên máy chủ, cho dù nó có tiện lợi đến đâu.
- [Đọc về các cặp khóa Cardano](cardano-key-pairs).


## Khóa học Stake pool
Hướng dẫn này sẽ chỉ cho bạn cách thiết lập, quản lý và duy trì nhóm cổ phần của bạn để đạt được hiệu suất và lợi nhuận tối đa.
- [Bắt đầu ngay hôm nay với khóa học stake pool course](../stake-pool-course/).

## Tiếp thị nhóm stake pool của bạn
Nếu bạn là một nhà điều hành nhóm cổ phần, bạn có thể nhận thấy rằng việc có một nhóm cổ phần hoàn hảo về mặt kỹ thuật hoạt động là chưa đủ.

Bạn cũng phải xây dựng nhóm của mình xung quanh một thương hiệu có thể thu hút đủ người ủy quyền từ cộng đồng Cardano.
- [Đọc ở đây để biết một vài ý tưởng về cách bạn có thể làm điều đó .](marketing-stake-pool).

## Tài nguyên mà nhà điều hành nhóm cổ phần tham khảo
- [Guild Operators](https://cardano-community.github.io/guild-operators), nổi tiếng với [CNTools](https://cardano-community.github.io/guild-operators/#/Scripts/cntools) của họ và nội dung hàng đầu. 
- [Topology Updater](https://cardano-community.github.io/guild-operators/#/Scripts/topologyupdater) liên kết được dự định là một giải pháp tạm thời để cho phép mọi người kích hoạt các nút chuyển tiếp của họ mà không phải hoãn lại và chờ các yêu cầu hoàn thành cấu trúc liên kết thủ công.
- [CNCLI](https://github.com/AndrewWestberg/cncli) là một tập hợp các tiện ích để nâng cao và mở rộng cardano-cli.
- [Jormanager](https://bitbucket.org/muamw10/jormanager/src/develop/) một phần mềm quản lý nhóm cổ phần Cardano.
- [Stake Pool Operator Scripts](https://github.com/gitmachtl/scripts) tập hợp các tập lệnh để quản lý nhóm cổ phần của bạn theo từng bước.
- [Coin Cashew Guides](https://www.coincashew.com/coins/overview-ada/guide-how-to-build-a-haskell-stakepool-node) dành cho các nhà điều hành nhóm cổ phần.
- [Pool Veterinary](http://pool.vet) sẽ giúp bạn xem liệu nhóm cổ phần Cardano của bạn có đang hoạt động hay không và tìm hiểu lý do tại sao nó có thể không hoạt động.
- [SPOCRA](https://members.spocra.io) bao gồm hướng dẫn cài đặt Stake Pool từ hiệp hội thương mại đã đăng ký - Hội đại diện tập thể người điều hành Stake Pool
- [RaspberryPi with Docker](https://github.com/speedwing/cardano-staking-pool-edu)  Hướng dẫn đầy đủ để xây dựng và chạy cả testnet và mainnet Cardano Stake Pool với Docker trên Raspberry Pi [Youtube Playlist](https://www.youtube.com/playlist?list=PLBhbLwOuj0DfTnneuG3vyoDHY7Dv_aiyq)


chỉnh sửa trang này
Cập nhật lần cuối vào 4/5/2022 bởi Tommy Kammerer