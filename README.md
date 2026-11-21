# KENVINZONE PROP HUB — Dashboard Rule Quỹ Futures & Kho Mã Giảm Giá

Website tĩnh siêu nhẹ (không cần build / Node.js), thiết kế đồng bộ hoàn toàn với hệ sinh thái **Kenvinzone** & **Aurora Standard V12.2** (có Dark/Light mode tự đồng bộ qua `kz-theme`).

## Cấu trúc thư mục `PROP.KENVINZONE`
- `index.html` — Trang chính: Bảng so sánh 3 quỹ (Bulenox, Earn2Trade, Topstep), Chi tiết từng gói thi & "bẫy ngầm", Máy tính Consistency Rule & Chi phí thực tế, Quy đổi giờ đóng lệnh CME sang giờ Việt Nam, và khu vực giới thiệu **Aurora Standard V12.2**.
- `coupons.html` — Trang riêng chuyên cập nhật **Mã giảm giá (Coupon Code)** & **Link Ref** theo từng quỹ (có bộ lọc + nút 1-click sao chép mã).
- `data.js` — **File cấu hình duy nhất bạn cần chỉnh sửa** khi muốn thay Link Affiliate, thêm/sửa Coupon mới hoặc cập nhật Rule.
- `styles.css` — Giao diện Kenvinzone Unified Layer (Dark/Light mode, responsive mobile).
- `app.js` — Toàn bộ logic tương tác (tabs, calculators, filter, copy coupon).

## Cách thay Link Ref & cập nhật Coupon trong 10 giây
Mở file `data.js` và chỉnh 2 mục ở ngay đầu file:

1. **Thay Link Affiliate & Telegram:**
   ```js
   affiliateLinks: {
     bulenox: "https://bulenox.com/member/aff/go/YOUR_BULENOX_REF",
     earn2trade: "https://www.earn2trade.com/?a_pid=YOUR_E2T_REF",
     topstep: "https://www.topstep.com/?ref=YOUR_TOPSTEP_REF"
   }
   ```
   Tất cả nút bấm trên cả `index.html` và `coupons.html` sẽ tự động cập nhật theo.

2. **Thêm / Sửa mã giảm giá mới:**
   Chỉnh mảng `coupons` trong `data.js` (`code`, `badge`, `expires`, `active: true/false`, `hot: true/false`).

## Cách xem & đưa lên mạng (Deploy miễn phí)
- **Xem ngay trên máy:** Mở trực tiếp file `index.html` bằng Chrome / Edge.
- **Đưa lên mạng (Gợi ý tên miền `prop.kenvinzone.com`):** Kéo thả toàn bộ thư mục `PROP.KENVINZONE` lên **Netlify Drop** hoặc đẩy lên GitHub kết nối **Cloudflare Pages / Netlify**.
