---
id: opshin
title: opshin 
sidebar_label: opshin (py)
description: opshin
#image: ../img/logo-opshin.png
--- 

## Giới thiệu

[opshin](https://github.com/OpShin/opshin) là ngôn ngữ lập trình để phát triển hợp đồng thông minh trên chuỗi khối Cardano. Cú pháp của nó là mã Python hợp lệ 100% và nó đảm bảo rằng các hợp đồng đánh giá trên chuỗi chính xác như đối tác Python của chúng. Điều này cho phép kiểm tra đơn vị và xác minh mã Python bằng cách sử dụng công cụ tiêu chuẩn có sẵn để phát triển Python. Các IDE, linters và máy chủ ngôn ngữ hiện có cũng có thể được sử dụng lại. Lưu ý rằng hệ thống loại của opshin nghiêm ngặt hơn nhiều so với hệ thống loại của Python, do đó có thể triển khai nhiều tối ưu hóa và cung cấp mức độ bảo mật cao hơn.

Ngôn ngữ tương tác chặt chẽ với thư viện python [pycardano](https://pycardano.readthedocs.io/en/latest/index.html).
Cấu trúc dữ liệu nội bộ được xác định với các loại dữ liệu tương thích với thư viện và cho phép kết hợp chặt chẽ giữa mã ngoại tuyến và mã trực tuyến, tất cả đều được viết bằng Python.

:::caution

opshin vẫn đang trong quá trình hoàn thiện và KHÔNG được khuyến nghị sử dụng trong sản xuất.

:::

## Bắt đầu

Bạn có thể tìm thấy hướng dẫn về cách bắt đầu với opshin trên [GitHub](https://github.com/OpShin/opshin).
Ngoài ra, bạn có thể tìm thấy hướng dẫn trình bày cách viết mã ngoài chuỗi phù hợp cho các hợp đồng opshin trong tài [Tài liệu pycardano](https://pycardano.readthedocs.io/en/latest/guides/plutus.html).


### Hợp đồng

Đây là trình xác thực cơ bản được viết bằng opshin:

```python
from opshin.prelude import *

@dataclass()
class CancelDatum(PlutusData):
    pubkeyhash: bytes


def validator(datum: CancelDatum, redeemer: None, context: ScriptContext) -> None:
    sig_present = False
    for s in context.tx_info.signatories:
        if datum.pubkeyhash == s:
            sig_present = True
    assert sig_present, "Required signature missing"
```


## Links
- [opshin Github Repository](https://github.com/OpShin/opshin).
- [opshin pioneer program](https://github.com/OpShin/opshin-pioneer-program)
- [opshin example project](https://github.com/OpShin/opshin-example)
- [pycardano Smart Contract documentation](https://pycardano.readthedocs.io/en/latest/guides/plutus.html).

