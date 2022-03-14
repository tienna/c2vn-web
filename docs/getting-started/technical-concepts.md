---
id: technical-concepts
title: Get started with the technical concepts
sidebar_label: Technical Concepts
description: Get started with the technical concepts behind Cardano.
#image: ./img/og-developer-portal.png
--- 

To get the most out of the Cardano Developer Portal, you should have programming experience and a basic understanding of blockchain concepts such as [UTxO](#unspent-transaction-output-utxo), [transactions](#transactions), [addresses](#addresses), [key derivation](#key-derivation), and [networking](#networking).

Để tận dụng tối đa Cổng thông tin nhà phát triển Cardano, bạn phải có kinh nghiệm lập trình và hiểu biết cơ bản về các khái niệm blockchain như UTxO, giao dịch, địa chỉ, dẫn xuất khóa và mạng .


## Unspent Transaction Output (UTxO)
UTxO or Unspent Transaction Outputs are how ada moves around the Cardano network. Learn how they work in the Cardano ledger.  
<iframe width="100%" height="325" src="https://www.youtube.com/embed/e4YZkgi4V3U" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

UTxO hoặc Kết quả giao dịch chưa được dùng là cách ada di chuyển xung quanh mạng Cardano. Tìm hiểu cách chúng hoạt động trong sổ cái Cardano.

## Transactions
Learn what is inside the guts of a Cardano transaction. We show how unsigned and signed transactions look like, and we cover how signing works.  
<iframe width="100%" height="325" src="https://www.youtube.com/embed/OSNf1MgAbII" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Tìm hiểu nội dung chính bên trong một giao dịch Cardano. Chúng ta chỉ ra các giao dịch chưa ký và đã ký trông như thế nào, bao gồm cả cách thức ký kết.


## Addresses
Cardano Addresses are used as destinations to send ada on the blockchain. We break them down into their parts and show how they're created.  
<iframe width="100%" height="325" src="https://www.youtube.com/embed/NjPf_b9UQNs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Địa chỉ Cardano được sử dụng làm điểm đến để gửi ada trên blockchain. Chúng ta chia nhỏ chúng thành các phần và chỉ ra cách tạo ra chúng.

## Transaction Fees
Understand how transaction fees are calculated on Cardano. Brief coverage of the topics reserve and treasury.  
<iframe width="100%" height="325" src="https://www.youtube.com/embed/lpSIpPWp7H8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Hiểu cách tính phí giao dịch trên Cardano. Bao quát ngắn gọn về các chủ đề dự trữ và kho bạc.


## Mnemonic seed phrase (BIP39)
BIP39 is the standard for creating a mnemonic seed phrase for wallets. In this video, we break down how it's created from randomness on Cardano.  
<iframe width="100%" height="325" src="https://www.youtube.com/embed/5P1jx1ELUHk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

BIP39 là tiêu chuẩn để tạo cụm từ hạt giống dễ nhớ cho ví. Trong video này, chúng tôi phân tích cách tạo ra nó từ sự ngẫu nhiên trên Cardano.

## Key Derivation
Key Derivation is the process a wallet uses to go from a mnemonic phrase to a whole set of keys and addresses that the wallet controls.    
Key Derivation là qúa trình mà ví sử dụng để chuyển từ một cụm từ dễ nhớ đến toàn bộ các khóa và địa chỉ mà ví kiểm soát.

<iframe width="100%" height="325" src="https://www.youtube.com/embed/4tSQBK75CPU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

## Block and transaction propagation
Learn how transactions make it from the mempool into blocks and how blocks move around the network.  
<iframe width="100%" height="325" src="https://www.youtube.com/embed/K7c-5S-23dg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Tìm hiểu cách các giao dịch biến nó từ mempool thành các khối và cách các khối di chuyển trong mạng.

## Networking
We answer your questions about how nodes on Cardano talk to each other. Learn about TCP Sockets,  mini-protocols and the future of P2P.  
<iframe width="100%" height="325" src="https://www.youtube.com/embed/pyhYtLgn1r0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Chúng tôi trả lời câu hỏi của bạn về cách các nút trên Cardano nói chuyện với nhau. Tìm hiểu về TCP Sockets, giao thức mini và tương lai của P2P.

## Cardano Improvement Proposals (CIP)
The [Cardano Improvement Proposal](../governance/cardano-improvement-proposals/CIP-0001) (CIP) process allows the community to interact with the Cardano Foundation to improve the Cardano ecosystem in a formal way.  

Quy trình [Cardano Improvement Proposal](../governance/cardano-improvement-proposals/CIP-0001) (CIP) cho phép 
cộng đồng tương tác với Cardano Foundation để cải thiện hệ sinh thái Cardano một cách chính thức.


<iframe width="100%" height="325" src="https://www.youtube.com/embed/z9wz_WJGGiQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

## Slot Lottery
In this video, we describe exactly how a stake pool on Cardano gets elected to make a block.  
<iframe width="100%" height="325" src="https://www.youtube.com/embed/M3Xq1qz3ljU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Trong video này, chúng tôi mô tả chính xác cách một pool trên Cardano được chọn để tạo một block.

## Slot Battles
On Cardano, slot battles happen when two pools try to make a block in the same slot (at the same time). We break down how the blockchain determines which block should win and what is the "correct" source of truth on the blockchain.  
<iframe width="100%" height="325" src="https://www.youtube.com/embed/Cm5pBM7UYa0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Trên Cardano, slot battles xảy ra khi hai pool cố gắng tạo một block trong cùng một slot (cùng một lúc). Chúng tôi phân tích cách blockchain xác định block nào sẽ giành chiến thắng và đâu là nguồn "chính xác" trên blockchain.


## Catalyst Voting
What is Catalyst voting, how to register, how to vote and why you should participate.
<iframe width="100%" height="325" src="https://www.youtube.com/embed/OwGdSw1T0aI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Bỏ phiếu Catalyst là gì, cách đăng ký, cách bỏ phiếu và lý do bạn nên tham gia.

## Franken Addresses
Franken Addresses are a way to register additional pledge to a pool without registering a second owner on the blockchain.
<iframe width="100%" height="325" src="https://www.youtube.com/embed/KULzovfWn-M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Địa chỉ Franken là một cách để đăng ký cam kết bổ sung cho một pool mà không cần đăng ký chủ sở hữu thứ hai trên blockchain.

## NFT
Non-Fungible Tokens on cardano are native assets that represent immutable art or physical things.
<iframe width="100%" height="325" src="https://www.youtube.com/embed/P-wQ0VymzKU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Các Token Non-Fungible trên cardano là tài sản gốc đại diện cho nghệ thuật hoặc những thứ vật chất bất biến.

## Catalyst Voting Registration
How does the Catalyst voting registration on the side-chain work?
<iframe width="100%" height="325" src="https://www.youtube.com/embed/PPuhH1ihoAY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Cách đăng ký bỏ phiếu Catalyst trên side-chain diễn ra như thế nào?

## Epoch Nonce
The epoch nonce allows you to calculate leaderlogs for your stake pool on Cardano.
<iframe width="100%" height="325" src="https://www.youtube.com/embed/vF82ZalZlcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Kỷ nguyên nonce cho phép bạn tính toán leaderlogs cho pool stake của bạn trên Cardano.

## Guaranteed Transaction Delivery
How dropped transactions happen on cardano and how to ensure we always deliver them into blocks.
<iframe width="100%" height="325" src="https://www.youtube.com/embed/gm-phCUGEoY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Các giao dịch bị giảm xảy ra như thế nào trên cardano và cách đảm bảo chúng tôi luôn phân phối chúng thành các block.

## SundaeSwap & Merkel Trees
Learn about the SundaeSwap ISO and who Merkel Trees work.
<iframe width="100%" height="325" src="https://www.youtube.com/embed/hStyO1L1qOE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Tìm hiểu về SundaeSwap ISO và những người làm việc cho Merkel Trees.

## DripDropz & Phyrhose
DripDropz, the token AirDrop vending machine, powered by Phyrhose.
<iframe width="100%" height="325" src="https://www.youtube.com/embed/x2bwK4Svnps" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

DripDropz, máy bán token AirDrop tự động, được cung cấp bởi Phyrhose.

## P2P Networking
Learn about Byron era network, Shelley era network, unidirectional (Half-Duplex) connections, the Topology Updater, manual P2P vs. automatic P2P.
<iframe width="100%" height="325" src="https://www.youtube.com/embed/ek_DK6Qoqrc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Tìm hiểu về mạng thời đại Byron, mạng thời đại Shelley, kết nối một chiều (Half-Duplex), Trình cập nhật cấu trúc liên kết, P2P thủ công so với P2P tự động.

## TPS vs. eUTxO
Which is better, high transactions per second or eUTxO?  
<iframe width="100%" height="325" src="https://www.youtube.com/embed/wDmLVMmevNQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

Cái nào tốt hơn, giao dịch cao mỗi giây hay eUTxO?

## Network Congestion
How does network congestion happen? What are mempool errors?
<iframe width="100%" height="325" src="https://www.youtube.com/embed/jxHFGPP1uc0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>
 
Làm thế nào để xảy ra tình trạng nghẽn mạng? Lỗi mempool là gì?