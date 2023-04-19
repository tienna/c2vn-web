---
id: aiken
title: Aiken
sidebar_label: Aiken(Rust)
description: Aiken
#image: ../img/aiken-logo.png
--- 

## Giới thiệu

[Aiken](https://github.com/aiken-lang/aiken) là một ngôn ngữ lập trình và chuỗi công cụ mới để phát triển các hợp đồng thông minh trên chuỗi khối Cardano. Nó lấy cảm hứng từ nhiều ngôn ngữ hiện đại như Gleam, Rust và Elm, được biết đến với các thông báo lỗi thân thiện và trải nghiệm tổng thể tuyệt vời dành cho nhà phát triển.

Ngôn ngữ này được sử dụng riêng để tạo tập lệnh xác thực trên chuỗi. Bạn sẽ cần viết mã ngoại tuyến để tạo giao dịch bằng ngôn ngữ khác, chẳng hạn như Rust, Haskell, Javascript, Python, v.v.

:::caution

Aiken vẫn đang trong quá trình hoàn thiện và KHÔNG được khuyến nghị sử dụng trong sản phẩm chính.

:::

## Bắt đầu

Truy cập [bắt đầu với Aiken](https://developers.cardano.org/docs/get-started/aiken) để cài đặt Aiken từ Nguồn hoặc Nix Flakes.

Bạn có thể tìm thấy hướng dẫn toàn diện để bắt đầu với Aiken trên trang web [aiken-lang.org](https://aiken-lang.org). Để biết thêm chi tiết về dự án, bạn cũng có thể muốn truy cập  [Aiken git repository](https://github.com/aiken-lang/aiken).


### Ví dụ về hợp đồng

Đây là trình xác thực cơ bản được viết bằng Aiken

```aiken
use aiken/hash.{Blake2b_224, Hash}
use aiken/list
use aiken/string
use aiken/transaction.{ScriptContext}
use aiken/transaction/credential.{VerificationKey}
 
pub type Datum {
  owner: Hash<Blake2b_224, VerificationKey>,
}
 
pub type Redeemer {
  msg: ByteArray,
}
 
pub fn spend(datum: Datum, redeemer: Redeemer, context: ScriptContext) -> Bool {
  let must_say_hello = string.from_bytearray(redeemer.msg) == "Hello, World!"
 
  let must_be_signed =
    list.has(context.transaction.extra_signatories, datum.owner)
 
  must_say_hello && must_be_signed
}
```

### Thử nghiệm

Các bài kiểm tra có thể được tạo trực tiếp trong Aiken và thực hiện chúng ngay lập tức bằng cách sử dụng lệnh "kiểm tra aiken".

Dưới đây là một ví dụ về cách xác định các bài kiểm tra như vậy:


```aiken
use aiken/interval.{Finite, Interval, IntervalBound, PositiveInfinity}
 
test must_start_after_succeed_when_lower_bound_is_after() {
  let range: ValidityRange =
    Interval {
      lower_bound: IntervalBound { bound_type: Finite(2), is_inclusive: True },
      upper_bound: IntervalBound { bound_type: PositiveInfinity, is_inclusive: False },
    }
 
  must_start_after(range, 1)
}
 
test must_start_after_suceed_when_lower_bound_is_equal() {
  let range: ValidityRange =
    Interval {
      lower_bound: IntervalBound { bound_type: Finite(2), is_inclusive: True },
      upper_bound: IntervalBound { bound_type: PositiveInfinity, is_inclusive: False },
    }
 
  must_start_after(range, 2)
}
 
test must_start_after_fail_when_lower_bound_is_after() {
  let range: ValidityRange =
    Interval {
      lower_bound: IntervalBound { bound_type: Finite(2), is_inclusive: True },
      upper_bound: IntervalBound { bound_type: PositiveInfinity, is_inclusive: False },
    }
 
  !must_start_after(range, 3)
}
```


## Links
- [Aiken User-Manual](https://aiken-lang.org/)
- [Aiken Github Repository](https://github.com/aiken-lang/aiken).

