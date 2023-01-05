Biên dịch mã plutus như thế nào?
=================================

👉 Tôi vẫn đang trong giai đoạn đầu học cách xây dựng các hợp đồng thông minh Plutus và nhận ra rằng tôi cần hiểu rõ hơn về cách làm việc với Haskell, đặc biệt là trong việc hình thành các tệp môi trường phù hợp cho một dự án. 
👉 Ví dụ: tôi tạo một dự án mới, chạy cabal init, sau đó bắt đầu mã hóa, giả sử một trình xác thực đơn giản… tại thời điểm đó, tôi phải làm như sau (có thể sao chép/dán nếu cần):

 - Cập nhật tệp cabal.project để  cài đặt các nguồn phụ thuộc phù hợp
 - Cập nhật tệp .cabal
 - Cập nhật tệp app/*.hs để xuất tập lệnh .plutus của tôi

Tôi đang nói cụ thể về việc biên dịch trên hệ thống cục bộ của mình, không phải sân chơi, tôi muốn có thể biên dịch hiệu quả các tập lệnh trình xác thực mà tôi có thể kiểm tra ngay trên mạng thử nghiệm(testnet).

❓Tôi chưa tìm thấy hướng dẫn rõ ràng về các tác vụ cấp thấp này, nếu ai đó có thể chỉ cho tôi khóa học cấp tốc về phần này hoặc tài liệu tương tự vì nó liên quan đến việc biên dịch tạo tệp plutus, điều đó sẽ rất hữu ích!


👉Nếu bạn chưa nghiên cứu [Alonzo-testnet/README.md tại main GitHub input-output-hk/Alonzo-testnet](https://github.com/input-output-hk/Alonzo-testnet/blob/main/README.md).

👉 Liên quan đến cabal.project, các phần phụ thuộc gói Cardano và Plutus khá phức tạp, vì vậy, tốt nhất là bắt đầu với một bản sao của tệp được biết là có các phần phụ thuộc tương thích để tạo Plutus chạy trên cardano-node-1.29.0. Nếu các gói bổ sung mà bạn đang sử dụng đều có trên [Hackage 3](https://hackage.haskell.org/), thì có thể bạn sẽ không cần chỉnh sửa thêm cabal.project, vì các gói Hackage sẽ phân giải trong cabal configure hoặc cabal build. Nếu các gói bổ sung không có trong Hackage, thì bạn sẽ cần thêm các mục vào cabal.project.

🧑‍💻🗯Một phiên bản lý tưởng hóa quy trình công việc điển hình của tôi cho một dự án Plutus mới là:

- Chạy cabal init và chỉnh sửa file .cabal  cho dự án nếu cần.
- Lấy cabal.project thẻ thích hợp trên kho lưu trữ cardano-node, sau đó thêm một mục vào đó cho cardano-nodechính nó.
- Viết mã Haskell.
- Thêm phụ thuộc cho bất kỳ importcâu lệnh mới nào vào .cabaltệp. Nếu những phần phụ thuộc đó không có trong Hackage, thì hãy thêm chúng vào cabal.project.
- Xây dựng với cabal build.
- Chạy trực tiếp tệp thực thi hoặc sử dụng cabal runđể biên dịch và tuần tự hóa tập lệnh Plutus.
- Sử dụng cardano-cliđể sử dụng tập lệnh trên testnet.
- Lặp lại các bước 3-7.

Tôi nói “lý tưởng hóa” bởi vì tôi thường thêm các thành phần phụ thuộc trước khi viết bất kỳ mã nào để IDE (VIM+HLS+hlint+…) của tôi hỗ trợ. Ngoài ra, tôi thường sử dụng haskell.nix và nix-shell để tạo bản phát hành và/hoặc môi trường phát triển. Tôi cũng sẽ sử dụng Haskell ngoài chuỗi thay vì cardano-cli.

👉 Đây là một quy trình làm việc tuyệt vời. Cảm ơn bạn đã chia sẻ điều này, có thể tôi là kiểu người học nhưng không nơi nào tôi có thể tìm thấy một giàn giáo phác thảo/quy trình công việc đơn giản như bạn vừa cung cấp!



