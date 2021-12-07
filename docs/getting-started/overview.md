---
id: overview
slug: /get-started/
title: Get Started
sidebar_label: Overview
description: Get Started
image: ./img/og-developer-portal.png
--- 
![Bắt đầu với Cardano ](../../static/img/card-get-started-title.svg)

Xin chào bạn đến với Cardano2vn. Đây là bản dịch của trang https://developers.cardano.org/; Nếu bạn quan tâm đến ví Cardano wallet bạn có thể tham khảo [showcase section](../../showcase).

Cũng cần lưu ý đề cập đến các nhà phát triển Portal bìa tất cả mọi thứ bạn có thể làm **hôm nay** trên Cardano **mainnet**. 

**Đây là trang nói thuần túy về kỹ thuật trên nền tảng blockchain Cardano**

## Cardano là gì? 
Cardano là một tập hợp các giao thức [mã nguồn mở](https://en.wikipedia.org/wiki/Open_source) , không có bằng sáng chế. Đó là một nền tảng cho phép bạn lưu trữ, chuyển đổi và quản lý giá trị, danh tính và quản trị. Cardano theo dõi nghiên cứu không phải ý kiến ​​hay thiên vị.

## Nó bắt đầu như thế nào?
Cardano bắt đầu như một dự án nghiên cứu và phát triển quan trọng vào năm 2015, và phải mất gần hai năm nghiên cứu để bắt đầu viết mã.

Mục đích của Cardano là hỏi: Làm thế nào chúng ta có thể xây dựng một hệ thống vận hành xã hội và tài chính bền vững cho hàng tỷ người? Chúng ta cần kết hợp những bộ sưu tập công nghệ nào để có được mọi thứ với chi phí hợp lý?

Bên cạnh nghiên cứu mật mã, còn có nghiên cứu lý thuyết trò chơi, nghiên cứu quản lý danh tính và nghiên cứu ngôn ngữ lập trình. Quá trình học tập nghiêm ngặt này đã tạo ra hơn 100 bài báo học thuật. Hầu hết đã được chấp nhận trong các hội nghị mật mã như Eurocrypt và Asiacrypt và trải qua quy trình đánh giá ngang hàng tiêu chuẩn. Ví dụ: bài báo 
[“Ouroboros: Một Giao thức Blockchain Bằng chứng Cổ phần An toàn Bảo mật”](https://eprint.iacr.org/2016/889.pdf) là một trong những [những bài báo bảo mật được trích dẫn nhiều nhất từ ​​năm 2015-2019](https://sweis.medium.com/most-cited-security-papers-from-2015-2019-d21515db3681). 

## What you need to bring
To get the most out of the Cardano Developer Portal, you should  have programming experience and a basic understanding of blockchain concepts of Cardano such as [UTxO](technical-concepts#unspent-transaction-output-utxo), [transactions](technical-concepts#transactions), [addresses](technical-concepts#addresses), [key derivation](technical-concepts#key-derivation), and [networking](technical-concepts#networking). 

If you are unfamiliar with these terms, start with [technical concepts](technical-concepts), and you can complete the [stake pool course](../operate-a-stake-pool/#stake-pool-course) afterward. It will also help you understand basic concepts, even if you don't want to run a stake pool. 

##Cardano thì khác 
Nếu bạn có kinh nghiệm với các nền tảng hợp đồng thông minh khác và muốn bắt đầu xây dựng trên Cardano, điều quan trọng là phải biết sự khác biệt của nó:

- Sẽ rất hợp lý khi bạn tìm hiểu [khái niệm UTxO](technical-concepts#unspent-transaction-output-utxo) và sau này là [mô hình UTxO mở rộng](https://iohk.io/en/blog/posts/2021/03/11/cardanos-extended-utxo-accounting-model/)
- [Tokens trên Cardano](../native-tokens/) không được xây dựng bằng các hợp đồng thông minh. Thay vào đó, các mã thông báo có nguồn gốc tự nhiên và sống trên sổ cái. Giao thức coi họ như những công dân hạng nhất, giống như ada. Nó hoàn toàn khác với các đồng nghiệp của chúng tôi là không có mã thông báo gốc và cần sử dụng hợp đồng thông minh để gửi mã thông báo. 
- [Native tokens](../native-tokens/) sử dụng cơ sở hạ tầng cốt lõi và mạng phải làm mọi thứ khác thay vì chạy một hợp đồng thông minh và gọi một phương thức được gọi là 'chuyển giao'. Trên Cardano, bạn đang gửi một giao dịch tiêu chuẩn. Điều này loại bỏ một lớp phức tạp hơn và nguy cơ do con người mắc lỗi, vì sổ cái xử lý tất cả các chức năng liên quan đến mã thông báo.
- [Smart contracts](../smart-contracts/) hoạt động khác nhau trên Cardano do mô hình [eUTxO model](https://iohk.io/en/blog/posts/2021/03/11/cardanos-extended-utxo-accounting-model/). Các quan niệm sai lầm đã nổi lên cho thấy [Cardano chỉ hỗ trợ một giao dịch trên mỗi khối](https://sundaeswap-finance.medium.com/concurrency-state-cardano-c160f8c07575).

## Bạn có thể làm gì trên Cardano hôm nay
- Bạn có thể gửi và nhận [native tokens](../native-tokens/), bao gồm cả ada.
- Bạn có thể ủy quyền ada của mình cho một trong các nhóm  [các pools hiện có](../../showcase?tags=pooltool) và lĩnh phần thưởng.
- Bạn có thể [sử dụng ada để bỏ phiếu](../governance/project-catalyst#participate-as-a-voter) tđể phân phối ada trị giá hơn một tỷ đô la từ kho bạc để tài trợ cho các đề xuất do cộng đồng thúc đẩy trên [Project Catalyst](../governance/project-catalyst).
- Bạn có thể kiếm được phần thưởng ada bằng cách [bỏ phiếu cho các đề xuất](../governance/project-catalyst#participate-as-a-voter). 
- Bạn có thể tham gia vào quy trình [Đề xuất các ý tưởng cải tiến Cardano ](technical-concepts#cardano-improvement-proposals-cip) (CIP) process.
- Bạn có thể tương tác với [smart contracts](../smart-contracts/).

## Tại sao lại xây dựng trên Cardano?
- Cardano cung cấp cơ sở hạ tầng tốt hơn để xây dựng sản phẩm vì nó nhanh hơn, an toàn hơn và tiết kiệm chi phí.
- Cardano cung cấp khả năng dự đoán chi phí chính xác khi giao dịch. Không có đấu giá cho phí giao dịch.
- Cardano có một cộng đồng năng động và hơn một triệu ví. Nếu bạn tuân theo các tiêu chuẩn cụ thể, chúng tôi rất muốn dùng thử và tương tác với các sản phẩm mới. Tham gia ngay bây giờ biến bạn trở thành động lực đầu tiên.
- Cardano mang đến quỹ đầu tư mạo hiểm của mình. Nếu bạn xây dựng trên Cardano, bạn có thể nhận được [tài trợ cho dự án](../governance/project-catalyst). Cứ sau 6 đến 8 tuần, các dự án có thể được cộng đồng Cardano đề xuất, thảo luận và bỏ phiếu.
- Cardano là một chuỗi khối bằng chứng cổ phần. Theo thiết kế, nó tiêu thụ ít năng lượng và sức mạnh tính toán hơn nhiều.
- CCardano được xây dựng với sự nghiêm ngặt của các phương pháp phát triển chính thức đảm bảo cao. Cơ chế đồng thuận [Ouroboros](https://cardano.org/ouroboros/) wđã được đưa ra với một số bài báo được đánh giá ngang hàng được trình bày trong các hội nghị cấp cao nhất và các ấn phẩm về an ninh mạng và mật mã. Nếu bạn xây dựng trên Cardano, bạn xây dựng trên nền tảng này.

## Những gì bạn có thể xây dựng trên Cardano ngay hôm nay
- You can [integrate Cardano](../integrate-cardano) into existing websites and services.
- You can issue [native tokens](../native-tokens/) and [NFTs](../native-tokens/minting-nfts).
- You can add [metadata to transactions](../transaction-metadata/) to give transactions a story, a background or even an identity. 
- You can prove the existence of a file, text or any other data at a specific point in time with [transaction metadata](../transaction-metadata/). You can even use [transaction metadata](../transaction-metadata/) to validate and verify external physical products and genuine articles.
- You can [setup, manage and maintain a stake pool](../operate-a-stake-pool/) on Cardano.
- You can [create smart contracts](../smart-contracts/).
