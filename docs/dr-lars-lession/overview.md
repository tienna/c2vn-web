# Plutus Pioneer Program

Đây là nhánh của tôi về Chương trình tiên phong của Plutus, nơi tôi sẽ cập nhật các ví dụ chính mới nhất của Plutus.

Tôi cũng sử dụng điều này để thêm nhận xét vào mã.


## Bài giảng

- Bài giảng số 1: [Video ](https://youtu.be/CJD8ctJqDw0), [Html](week1.md)

  - Welcome
  - (E)UTxO-model
  - Chạy một hợp đồng đấu giá mẫu trên một Playground
  - Bài tập về nhà
  
  <iframe width="100%" height="400" src="https://www.youtube.com/embed/CJD8ctJqDw0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"></iframe>

- Bài giảng số 2: [Video ](https://youtu.be/7nDGZkUIeUQ), [Html](week2.md)

  - Kích hoạt sự thay đổi.
  - Low-level, Các tập lệnh xác thực on-chain chưa được định kiểu.
  - High-level, Các tập lệnh xác thực on-chain định kiểu.
  
  <iframe width="100%" height="400" src="https://www.youtube.com/embed/7nDGZkUIeUQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Bài giảng số 3: [Video ](https://youtu.be/WG3uw-TkW2k), [Html](week3.md)

  - Kịch bản context.
  - Xử lý thời gian (Time handling).
  - Hợp đồng được tham số hóa (Parameterized contracts).
  
  <iframe width="100%" height="400" src="https://www.youtube.com/embed/WG3uw-TkW2k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Bài giảng số 4: [Video](https://youtu.be/HLJOcKlEucI), [Html](week4.md)

  - Monads.
  - Đơn nguyên `EmulatorTrace`.
  - Đơn nguyên `Contract`.

  <iframe width="100%" height="400" src="https://www.youtube.com/embed/HLJOcKlEucI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Bài giảng số 5: [Video](https://youtu.be/6VbhY162GQA), [Html](week5.md)

  - Values.
  - Mã thông báo gốc và chính sách đúc tiền
  - NFT's.

  <iframe width="100%" height="400" src="https://www.youtube.com/embed/6VbhY162GQA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Bài giảng số 6: [Video](https://www.youtube.com/watch?v=X9fOkkpj-aU), [Html](week6.md)

  - Oracles.
  - Sử dụng PAB.
  
  <iframe width="100%" height="400" src="https://www.youtube.com/embed/X9fOkkpj-aU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Bài giảng số 7: [Video](https://youtu.be/ptsltoZNl50), [Html](week7.md)

  - Commit schemes.
  - Máy trạng thái (State machines).
  
  <iframe width="100%" height="400" src="https://www.youtube.com/embed/ptsltoZNl50" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Bài giảng số 8: [Video](https://www.youtube.com/watch?v=tGjEvumVBk8), [Html](week8.md)

  - Ví dụ khác về state machine: Token Sale.
  - Kiểm tra tự động sử dụng dấu vết giả lập (emulator traces).
  - Chuyển tiếp (Interlude): optics.
  - Kiểm tra tài sản với `QuickCheck`.
  - Thử nghiệm hợp đồng Plutus với thử nghiệm dựa trên tài sản.
  
  <iframe width="100%" height="400" src="https://www.youtube.com/embed/tGjEvumVBk8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Bài giảng số 9: [Video](https://youtu.be/J5as459k10E), [Html](week9.md)

  - Tổng quan về Marlowe.  [Site](https://github.com/input-output-hk/plutus-pioneer-program/blob/main/Marlowe_Plutus_Pioneers_June_2021.pdf)
  - Marlowe trong Plutus.
  - Giới thiệu Marlowe Playground.

  <iframe width="100%" height="400" src="https://www.youtube.com/embed/J5as459k10E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Bài giảng số 10: [Video](https://youtu.be/X_q4AHMsw5Y), [Html](week10.md)

  - Giới thiệu Uniswap.
  - Triển khai Uniswap trong Plutus.
  - Triển khai Uniswap với PAB.
  - Demo.
  - Sử dụng `curl` để tương tác với PAB.
  
  <iframe width="100%" height="400" src="https://www.youtube.com/embed/X_q4AHMsw5Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Các Code ví dụ 

- Lecture #1:  [English Auction](https://github.com/cardano2vn/cardanovn-portal/tree/main/docs/dr-lars-lession/code/week01/src/Week01)
- Lecture #2:  [Simple Validation](https://github.com/cardano2vn/cardanovn-portal/tree/main/docs/dr-lars-lession/code/week02/src/Week02)
- Lecture #3:  [Validation Context & Parameterized Contracts](https://github.com/cardano2vn/cardanovn-portal/tree/main/docs/dr-lars-lession/code/week03/src/Week03)
- Lecture #4:  [Monads, `EmulatorTrace` & `Contract`](https://github.com/cardano2vn/cardanovn-portal/tree/main/docs/dr-lars-lession/code/week04/src/Week04)
- Lecture #5:  [Minting Policies](https://github.com/cardano2vn/cardanovn-portal/tree/main/docs/dr-lars-lession/code/week05/src/Week05)
- Lecture #6:  [Oracles](https://github.com/cardano2vn/cardanovn-portal/tree/main/docs/dr-lars-lession/code/week06/src/Week06)
- Lecture #7:  [State Machines](https://github.com/cardano2vn/cardanovn-portal/tree/main/docs/dr-lars-lession/code/week07/src/Week07)
- Lecture #8:  [Testing](https://github.com/cardano2vn/cardanovn-portal/tree/main/docs/dr-lars-lession/code/week08/src/Week08)
- Lecture #9:  [Marlowe](https://github.com/cardano2vn/cardanovn-portal/tree/main/docs/dr-lars-lession/code/week09/src/Week09)
- Lecture #10: [Uniswap](https://github.com/cardano2vn/cardanovn-portal/tree/main/docs/dr-lars-lession/code/week10)

## Tài nguyên bổ sung

- [Kho lưu trữ Plutus](https://github.com/input-output-hk/plutus)
- [Tìm hiểu Haskell!](http://learnyouahaskell.com/)
- [Khóa học về Haskell & Cryptocurrencies ở Mông Cổ](https://www.youtube.com/playlist?list=PLJ3w5xyG4JWmBVIigNBytJhvSSfZZzfTm)
