/* ============================================================================
   KENVINZONE PROP FIRM HUB — DATA & CONFIGURATION (Single Source of Truth)
   ----------------------------------------------------------------------------
   HƯỚNG DẪN CẬP NHẬT NHANH CHO CHỦ WEB:
   1. Thay link Affiliate của bạn trong mục `SITE_CONFIG.affiliateLinks`.
   2. Thêm / sửa mã giảm giá mới nhất trong mục `COUPONS`.
   3. Khi các quỹ thay đổi Rule, chỉnh sửa trực tiếp trong `PROP_FIRMS`.
   ============================================================================ */

window.KZ_PROP_DATA = {
  site: {
    brandName: "KENVINZONE",
    subBrand: "PROP HUB",
    lastUpdated: "22/11/2026",
    auroraUrl: "https://aurora.kenvinzone.com/",
    mainSiteUrl: "https://kenvinzone.com/",
    telegramUrl: "https://t.me/kenvinzone", // Thay bằng link nhóm Telegram cộng đồng của bạn
    /* TỰ ĐỘNG CẬP NHẬT COUPON TỪ GOOGLE SHEETS (Không cần sửa code hay deploy lại web):
       1. Import file `coupons-template.csv` vào Google Sheets.
       2. Chọn Tệp -> Chia sẻ -> Xuất bản lên web -> Định dạng CSV -> Sao chép link.
       3. Dán link CSV đó vào dòng dưới đây (để trống "" nếu dùng danh sách tĩnh bên dưới). */
    couponSheetCsvUrl: "",
    affiliateLinks: {
      bulenox: "https://bulenox.com/member/aff/go/kenvinzone",
      earn2trade: "https://www.earn2trade.com/?a_pid=KENVINZONE",
      topstep: "https://www.topstep.com/?ref=KENVINZONE"
    }
  },

  /* ==========================================================================
     DANH SÁCH COUPON / MÃ GIẢM GIÁ (Hiển thị trên coupons.html & banner)
     - active: true để hiển thị, false để ẩn
     - hot: true để gắn nhãn HOT / Flash Sale
     - expiresDate: "YYYY-MM-DD" → Web tự tính ngày còn lại & tự ẩn khi quá hạn
     ========================================================================== */
  coupons: [
    {
      id: "bulenox-all-in-one",
      firmId: "bulenox",
      firmName: "Bulenox",
      badge: "SIÊU MÃ ALL-IN-ONE · TỚI 89%",
      hot: true,
      active: true,
      code: "5BAAG",
      title: "Mã đa năng Bulenox (Option 1: 89% • Option 2: 75% • Fast Track: 40%)",
      description: "1 mã duy nhất áp được cho toàn bộ các dòng tài khoản Bulenox: Qualification Option 1 (89%), Option 2 EOD (75%), Fast Track (40%), Momentum Option 1 (35–61%) và Momentum Option 2 (30%).",
      appliesTo: "Option 1, Option 2, Fast Track & Momentum",
      expires: "Đến 30/11/2026",
      expiresDate: "2026-11-30",
      note: "Khuyên dùng mã này trước tiên vì áp dụng được cho mọi loại tài khoản Bulenox với mức giảm cao nhất."
    },
    {
      id: "bulenox-opt1-89",
      firmId: "bulenox",
      firmName: "Bulenox",
      badge: "GIẢM 89% · OPTION 1",
      hot: true,
      active: true,
      code: "LTRRR",
      title: "Chuyên gói Qualification Option 1 (Trailing Drawdown)",
      description: "Giảm trực tiếp 89% cho các gói Qualification Option 1 ($25K / 3 HĐ, $50K / 7 HĐ, $100K / 12 HĐ, $150K / 15 HĐ). Không DLL, không Scaling.",
      appliesTo: "Qualification Option 1 ($25K – $150K)",
      expires: "Đến 30/11/2026",
      expiresDate: "2026-11-30",
      note: "Gói $50K sau khi giảm 89% chỉ còn ~$19/tháng (chưa gồm phí kích hoạt Master $148 khi đỗ)."
    },
    {
      id: "bulenox-opt2-75",
      firmId: "bulenox",
      firmName: "Bulenox",
      badge: "GIẢM 75% · OPTION 2 EOD",
      hot: false,
      active: true,
      code: "UREHV",
      title: "Chuyên gói Qualification Option 2 (EOD / Scaling / DLL)",
      description: "Giảm mạnh 75% cho các gói Option 2 ($25K, $50K, $100K, $150K) — Drawdown tính cuối ngày EOD cực an toàn, không bị kéo sàn theo lãi ảo.",
      appliesTo: "Qualification Option 2 ($25K – $150K)",
      expires: "Đến 30/11/2026",
      expiresDate: "2026-11-30",
      note: "Rất hiếm khi Option 2 EOD có mức giảm sâu tới 75% — cực hời cho trader đánh theo trend."
    },
    {
      id: "e2t-blackweek-2026",
      firmId: "earn2trade",
      firmName: "Earn2Trade",
      badge: "BLACK WEEK · GIẢM TỚI 70%",
      hot: true,
      active: true,
      code: "BIGBF2026",
      title: "Black Week 2026: Giảm tới 70% (2 tháng liên tiếp) + Giảm giá Reset",
      description: "Giảm 70% tháng 1 + 60% tháng 2 cho TCP100 & GAU100 • Giảm 60% (2 tháng) cho GAU150 • Giảm 50% (2 tháng) cho TCP25, TCP50, GAU50 & GAU200.",
      appliesTo: "Tất cả gói TCP & Gauntlet Mini",
      expires: "Đến 29/11/2026",
      expiresDate: "2026-11-29",
      note: "Kèm ưu đãi Reset đến 31/01/2027: TCP25 ($100→$65), GAU50 ($100→$75), TCP50 ($100→$85)."
    },
    {
      id: "topstep-friendsgiving-50",
      firmId: "topstep",
      firmName: "Topstep",
      badge: "FRIENDSGIVING · GIẢM 50%",
      hot: true,
      active: true,
      code: "KENVINZONE",
      title: "Mã Friendsgiving giảm 50% cho Trading Combine lần đầu",
      description: "Áp dụng cho cả Standard Path ($49→$24.50) và No Activation Fee Path ($85→$42.50 khi bật Responsible Trading Advantage). Mã không bao giờ hết hạn cho trader mới!",
      appliesTo: "Trading Combine ($50K / $100K / $150K)",
      expires: "Không hết hạn (Friendsgiving)",
      expiresDate: "",
      note: "Nhập mã KENVINZONE tại bước checkout Topstep để được giảm thẳng 50% lần đầu."
    }
  ],

  /* ==========================================================================
     DỮ LIỆU CHI TIẾT 3 QUỸ: BULENOX, EARN2TRADE, TOPSTEP (Cập nhật T11/2026)
     ========================================================================== */
  firms: {
    bulenox: {
      id: "bulenox",
      name: "Bulenox",
      tagline: "Linh hoạt 2 chế độ Risk • 100% lợi nhuận $10K đầu tiên • Hay có Sale sâu",
      accent: "#38D5E7",
      badgeText: "PHỔ BIẾN CHO SCALPER & COPY TRADE",
      founded: "2020 (Mỹ)",
      platforms: ["Rithmic", "NinjaTrader", "Quantower", "Bookmap", "Sierra Chart", "ATAS", "Jigsaw"],
      markets: "CME, CBOT, NYMEX, COMEX (Futures)",
      closeTimeCT: "3:59 PM CT",
      closeTimeVN_Summer: "03:59 sáng (giờ VN, mùa Hè CDT)",
      closeTimeVN_Winter: "04:59 sáng (giờ VN, mùa Đông CST)",
      newsTrading: "Cho phép (không cần đóng lệnh trước tin, nhưng phải tự kiểm soát Drawdown)",
      copyTrading: "Cho phép copy giữa các tài khoản Bulenox của chính bạn (cấm cross-firm arbitrage/HFT)",
      maxAccounts: "Không giới hạn TK thi (Qualification) • Tối đa 5 TK Master hoạt động cùng lúc",
      resetFee: "$78 / lần (gói Qualification)",
      profitSplit: "100% cho $10,000 lợi nhuận đầu tiên → 90/10 sau mốc $10,000",
      consistencyRule: "40% trên tài khoản Master khi rút tiền (không có ngày nào vượt quá 40% tổng lãi kỳ rút)",
      affiliateInfo: "Có chương trình Affiliate chính thức (trả hoa hồng theo link ref & mã coupon riêng).",
      summaryCompare: {
        drawdown: "Opt 1: Intraday Trailing | Opt 2: EOD",
        dll: "Opt 1: Không có | Opt 2: Soft Pause (tạm dừng ngày)",
        consistency: "40% (khi rút tiền Master)",
        activationFee: "$143 – $498 (1 lần, miễn phí nếu gói Momentum)",
        profitSplit: "100% ($10K đầu) → 90/10",
        minDays: "Không yêu cầu số ngày tối thiểu khi thi (tùy gói)",
        closeTime: "3:59 PM CT",
        news: "Cho phép",
        maxFunded: "5 TK Master"
      },
      traps: [
        {
          title: "Bẫy #1: Option 1 vs Option 2 bị khóa vĩnh viễn",
          detail: "Bạn chỉ được chọn Option 1 (Intraday Trailing) hoặc Option 2 (EOD) lúc mua tài khoản và KHÔNG THỂ đổi sau khi đỗ. Option 1 kéo sàn theo cả LÃI ẢO (unrealized profit) — nếu lệnh đang xanh +$800 rồi quay về hòa vốn, sàn Drawdown vẫn đã bị kéo lên $800!"
        },
        {
          title: "Bẫy #2: Safety Reserve & Trần rút tiền 3 lần đầu",
          detail: "Trong 3 lần rút tiền đầu tiên trên TK Master, Bulenox áp dụng cả Mức Dự Phòng (Safety Reserve) lẫn Trần Rút Tối Đa ($1,000–$2,000 tùy size). Bạn phải tích lãi vượt ngưỡng Safety Reserve mới được rút. Từ lần rút thứ 4 trở đi mới bỏ trần."
        },
        {
          title: "Bẫy #3: Quy tắc Consistency 40% khi rút tiền",
          detail: "Nếu bạn ăn 1 cú hit quá lớn trong 1 ngày chiếm >40% tổng lợi nhuận của kỳ rút, yêu cầu rút tiền sẽ chưa hợp lệ — bạn buộc phải giao dịch thêm các ngày khác để kéo tỷ trọng ngày lớn nhất xuống ≤ 40%."
        },
        {
          title: "Bẫy #4: Giữ lệnh quá 3:59 PM CT",
          detail: "Bắt buộc đóng toàn bộ lệnh và hủy lệnh chờ trước 3:59 PM CT (3:59 sáng VN mùa hè / 4:59 sáng mùa đông). Cấm tuyệt đối giữ lệnh qua đêm."
        }
      ],
      bulenoxPricingMatrix: {
        coupons: [
          { id: "none", label: "Giá gốc (Chưa mã)", code: "", note: "Hiển thị giá niêm yết gốc trên trang đăng ký Bulenox." },
          { id: "5BAAG", label: "🔥 Áp mã 5BAAG (Đa năng)", code: "5BAAG", note: "Mã All-in-One: Option 1 (-89%) • Option 2 (-75%) • Fast-Track (-40%) • Momentum Opt 1 (-35%→61%) • Momentum Opt 2 (-30%)." },
          { id: "LTRRR", label: "⚡ Áp mã LTRRR (-89% Opt 1)", code: "LTRRR", note: "Chuyên giảm 89% cho tất cả gói Qualification Option 1 ($25K – $150K)." },
          { id: "UREHV", label: "🛡️ Áp mã UREHV (-75% Opt 2)", code: "UREHV", note: "Chuyên giảm 75% cho tất cả gói Qualification Option 2 EOD ($25K – $150K)." }
        ],
        tracks: [
          {
            id: "qualification",
            label: "Qualification (Thi chuẩn · 1 Tháng)",
            subtitle: "Drawdown rộng nhất ($1,500–$4,500) • Giảm sâu nhất tới 89% • Phí kích hoạt Master khi đỗ ($143–$498).",
            opt1: [
              { size: "$25,000", price: 145, unit: "/tháng", target: "$1,500", drawdown: "$1,500 (Trailing)", dll: "Không có", contracts: "3 Minis", activation: "$143", discounts: { "5BAAG": 89, "LTRRR": 89, "UREHV": 0 } },
              { size: "$50,000", price: 175, unit: "/tháng", target: "$3,000", drawdown: "$2,500 (Trailing)", dll: "Không có", contracts: "7 Minis", activation: "$148", popular: true, discounts: { "5BAAG": 89, "LTRRR": 89, "UREHV": 0 } },
              { size: "$100,000", price: 215, unit: "/tháng", target: "$6,000", drawdown: "$3,000 (Trailing)", dll: "Không có", contracts: "12 Minis", activation: "$248", discounts: { "5BAAG": 89, "LTRRR": 89, "UREHV": 0 } },
              { size: "$150,000", price: 325, unit: "/tháng", target: "$9,000", drawdown: "$4,500 (Trailing)", dll: "Không có", contracts: "15 Minis", activation: "$498", discounts: { "5BAAG": 89, "LTRRR": 89, "UREHV": 0 } }
            ],
            opt2: [
              { size: "$25,000", price: 145, unit: "/tháng", target: "$1,500", drawdown: "$1,500 (EOD)", dll: "$500 (Soft)", contracts: "3 Scaling", activation: "$143", discounts: { "5BAAG": 75, "LTRRR": 0, "UREHV": 75 } },
              { size: "$50,000", price: 175, unit: "/tháng", target: "$3,000", drawdown: "$2,500 (EOD)", dll: "$1,100 (Soft)", contracts: "7 Scaling", activation: "$148", popular: true, discounts: { "5BAAG": 75, "LTRRR": 0, "UREHV": 75 } },
              { size: "$100,000", price: 215, unit: "/tháng", target: "$6,000", drawdown: "$3,000 (EOD)", dll: "$2,200 (Soft)", contracts: "12 Scaling", activation: "$248", discounts: { "5BAAG": 75, "LTRRR": 0, "UREHV": 75 } },
              { size: "$150,000", price: 325, unit: "/tháng", target: "$9,000", drawdown: "$4,500 (EOD)", dll: "$3,300 (Soft)", contracts: "15 Scaling", activation: "$498", discounts: { "5BAAG": 75, "LTRRR": 0, "UREHV": 75 } }
            ]
          },
          {
            id: "momentum",
            label: "Momentum (Không phí kích hoạt · 1 Tháng)",
            subtitle: "Gói Momentum tối ưu tổng chi phí cho trader pass nhanh • Áp mã 5BAAG giảm 35–61% (Opt 1) hoặc 30% (Opt 2).",
            opt1: [
              { size: "$25,000", price: 94, unit: "/tháng", target: "$1,500", drawdown: "$1,000 (Trailing)", dll: "Không có", contracts: "3 Minis", activation: "$0 (Gộp gói)", discounts: { "5BAAG": 35, "LTRRR": 0, "UREHV": 0 }, discountRange: "35–61%" },
              { size: "$50,000", price: 143, unit: "/tháng", target: "$3,000", drawdown: "$2,000 (Trailing)", dll: "Không có", contracts: "7 Minis", activation: "$0 (Gộp gói)", popular: true, discounts: { "5BAAG": 45, "LTRRR": 0, "UREHV": 0 }, discountRange: "35–61%" },
              { size: "$100,000", price: 248, unit: "/tháng", target: "$6,000", drawdown: "$3,000 (Trailing)", dll: "Không có", contracts: "12 Minis", activation: "$0 (Gộp gói)", discounts: { "5BAAG": 55, "LTRRR": 0, "UREHV": 0 }, discountRange: "35–61%" },
              { size: "$150,000", price: 358, unit: "/tháng", target: "$9,000", drawdown: "$4,500 (Trailing)", dll: "Không có", contracts: "15 Minis", activation: "$0 (Gộp gói)", discounts: { "5BAAG": 61, "LTRRR": 0, "UREHV": 0 }, discountRange: "35–61%" }
            ],
            opt2: [
              { size: "$25,000", price: 94, unit: "/tháng", target: "$1,500", drawdown: "$1,000 (EOD)", dll: "$600 (Soft)", contracts: "2 Scaling", activation: "$0 (Gộp gói)", discounts: { "5BAAG": 30, "LTRRR": 0, "UREHV": 0 } },
              { size: "$50,000", price: 143, unit: "/tháng", target: "$3,000", drawdown: "$2,000 (EOD)", dll: "$1,200 (Soft)", contracts: "4 Scaling", activation: "$0 (Gộp gói)", popular: true, discounts: { "5BAAG": 30, "LTRRR": 0, "UREHV": 0 } },
              { size: "$100,000", price: 248, unit: "/tháng", target: "$6,000", drawdown: "$3,000 (EOD)", dll: "$2,500 (Soft)", contracts: "8 Scaling", activation: "$0 (Gộp gói)", discounts: { "5BAAG": 30, "LTRRR": 0, "UREHV": 0 } },
              { size: "$150,000", price: 358, unit: "/tháng", target: "$9,000", drawdown: "$4,500 (EOD)", dll: "$3,300 (Soft)", contracts: "12 Scaling", activation: "$0 (Gộp gói)", discounts: { "5BAAG": 30, "LTRRR": 0, "UREHV": 0 } }
            ]
          },
          {
            id: "fasttrack",
            label: "Fast-Track (Bỏ qua vòng thi · 1 Lần)",
            subtitle: "Đóng 1 lần vào thẳng chế độ Fast-Track không cần cày Profit Target vòng thi • Áp mã 5BAAG giảm thẳng 40%!",
            opt1: [
              { size: "$25,000", price: 338, unit: " (1 lần)", target: "Vào thẳng", drawdown: "$1,000 (Trailing)", dll: "Không có", contracts: "3 Minis", activation: "$0", discounts: { "5BAAG": 40, "LTRRR": 0, "UREHV": 0 } },
              { size: "$50,000", price: 488, unit: " (1 lần)", target: "Vào thẳng", drawdown: "$2,000 (Trailing)", dll: "Không có", contracts: "7 Minis", activation: "$0", popular: true, discounts: { "5BAAG": 40, "LTRRR": 0, "UREHV": 0 } },
              { size: "$100,000", price: 648, unit: " (1 lần)", target: "Vào thẳng", drawdown: "$4,000 (Trailing)", dll: "Không có", contracts: "12 Minis", activation: "$0", discounts: { "5BAAG": 40, "LTRRR": 0, "UREHV": 0 } },
              { size: "$150,000", price: 788, unit: " (1 lần)", target: "Vào thẳng", drawdown: "$5,500 (Trailing)", dll: "Không có", contracts: "15 Minis", activation: "$0", discounts: { "5BAAG": 40, "LTRRR": 0, "UREHV": 0 } }
            ],
            opt2: [
              { size: "$25,000", price: 338, unit: " (1 lần)", target: "Vào thẳng", drawdown: "$1,000 (EOD)", dll: "Không có (Ngoại lệ $25K)", contracts: "2 Minis", activation: "$0", discounts: { "5BAAG": 40, "LTRRR": 0, "UREHV": 0 } },
              { size: "$50,000", price: 488, unit: " (1 lần)", target: "Vào thẳng", drawdown: "$2,000 (EOD)", dll: "$1,200 (Soft)", contracts: "4 Minis", activation: "$0", popular: true, discounts: { "5BAAG": 40, "LTRRR": 0, "UREHV": 0 } },
              { size: "$100,000", price: 648, unit: " (1 lần)", target: "Vào thẳng", drawdown: "$4,000 (EOD)", dll: "$2,500 (Soft)", contracts: "8 Minis", activation: "$0", discounts: { "5BAAG": 40, "LTRRR": 0, "UREHV": 0 } },
              { size: "$150,000", price: 788, unit: " (1 lần)", target: "Vào thẳng", drawdown: "$5,500 (EOD)", dll: "$3,300 (Soft)", contracts: "12 Minis", activation: "$0", discounts: { "5BAAG": 40, "LTRRR": 0, "UREHV": 0 } }
            ]
          }
        ]
      },
      modes: [
        {
          id: "opt1",
          label: "Option 1 — Intraday Trailing (Không Scaling, Không DLL)",
          note: "Phù hợp trader đánh nhanh, cắt chốt dứt khoát, không muốn bị giới hạn Daily Loss Limit hay Scaling hợp đồng.",
          plans: [
            { size: "$25,000", listPrice: "$145/tháng", target: "$1,500", drawdown: "$1,500 (Intraday)", dll: "Không có", contracts: "3 Minis (30 Micros)", activation: "$143", safetyReserve: "$1,600", payoutCap3: "$1,000" },
            { size: "$50,000", listPrice: "$175/tháng", target: "$3,000", drawdown: "$2,500 (Intraday)", dll: "Không có", contracts: "7 Minis (70 Micros)", activation: "$148", safetyReserve: "$2,600", payoutCap3: "$1,500" },
            { size: "$100,000", listPrice: "$215/tháng", target: "$6,000", drawdown: "$3,000 (Intraday)", dll: "Không có", contracts: "12 Minis (120 Micros)", activation: "$248", safetyReserve: "$3,100", payoutCap3: "$1,750" },
            { size: "$150,000", listPrice: "$325/tháng", target: "$9,000", drawdown: "$4,500 (Intraday)", dll: "Không có", contracts: "15 Minis (150 Micros)", activation: "$498", safetyReserve: "$4,600", payoutCap3: "$2,000" }
          ]
        },
        {
          id: "opt2",
          label: "Option 2 — EOD Drawdown (Có DLL & Scaling Plan)",
          note: "Drawdown chỉ cập nhật 1 lần vào cuối ngày theo lãi thực (realized). Chạm DLL chỉ bị khóa giao dịch hết ngày hôm đó, KHÔNG cháy tài khoản.",
          plans: [
            { size: "$25,000", listPrice: "$145/tháng", target: "$1,500", drawdown: "$1,500 (EOD)", dll: "$500 (Soft Pause)", contracts: "3 Scaling", activation: "$143", safetyReserve: "$1,600", payoutCap3: "$1,000" },
            { size: "$50,000", listPrice: "$175/tháng", target: "$3,000", drawdown: "$2,500 (EOD)", dll: "$1,100 (Soft Pause)", contracts: "7 Scaling", activation: "$148", safetyReserve: "$2,600", payoutCap3: "$1,500" },
            { size: "$100,000", listPrice: "$215/tháng", target: "$6,000", drawdown: "$3,000 (EOD)", dll: "$2,200 (Soft Pause)", contracts: "12 Scaling", activation: "$248", safetyReserve: "$3,100", payoutCap3: "$1,750" },
            { size: "$150,000", listPrice: "$325/tháng", target: "$9,000", drawdown: "$4,500 (EOD)", dll: "$3,300 (Soft Pause)", contracts: "15 Scaling", activation: "$498", safetyReserve: "$4,600", payoutCap3: "$2,000" }
          ]
        }
      ],
      payoutDetails: [
        "Tỷ lệ chia lợi nhuận: Giữ 100% cho $10,000 lợi nhuận đầu tiên, sau đó 90% Trader / 10% Quỹ.",
        "Giới hạn 3 lần rút đầu: $1,000 (25K) • $1,500 (50K) • $1,750 (100K) • $2,000 (150K). Từ lần rút thứ 4 trở đi gỡ bỏ trần rút.",
        "Drawdown trên Master Account thường dừng kéo (lock) khi chạm mức Số dư ban đầu + $100.",
        "Consistency Rule: 40% trong kỳ yêu cầu rút tiền."
      ],
      platformGuide: {
        dataFeed: "Rithmic (dữ liệu tốc độ cao, tương thích sâu với NinjaTrader, Quantower, Bookmap, Sierra Chart, ATAS, Jigsaw).",
        bestPick: "NinjaTrader 8 hoặc Quantower qua Rithmic (phổ biến nhất cho scalper & copy trade nhiều tài khoản).",
        commissionEst: "Tham khảo ~$4.00–$5.00/vòng (Mini) • ~$1.20–$1.50/vòng (Micro) tùy sàn CME & cấu hình clearing.",
        liveDataFee: "Miễn phí data Non-Professional trong vòng thi. Khi lên Master / Live áp dụng phí dữ liệu Rithmic/CME theo gói Non-Pro (tránh chọn nhầm Professional vì phí $140+/tháng)."
      }
    },

    earn2trade: {
      id: "earn2trade",
      name: "Earn2Trade",
      tagline: "Lộ trình tăng vốn đến $400K • Bỏ Progression Ladder từ T11/2026 • Tặng Reset khi gia hạn",
      accent: "#F3BE62",
      badgeText: "CẬP NHẬT LUẬT MỚI 02/11/2026",
      founded: "2016 (Mỹ — Uy tín lâu năm)",
      platforms: ["Rithmic", "dxFeed", "NinjaTrader", "Tradovate", "TradingView", "BlackArrow", "ATAS", "Jigsaw", "Sierra Chart", "MotiveWave"],
      markets: "CME, CBOT, NYMEX, COMEX (Cấm Bitcoin & Ether Futures)",
      closeTimeCT: "3:50 PM CT",
      closeTimeVN_Summer: "03:50 sáng (giờ VN, mùa Hè CDT)",
      closeTimeVN_Winter: "04:50 sáng (giờ VN, mùa Đông CST)",
      newsTrading: "Cho phép giao dịch tin tức ở cả vòng thi và tài khoản cấp vốn",
      copyTrading: "Hỗ trợ trên các nền tảng tương thích (Rithmic/Tradovate) cho tài khoản cá nhân",
      maxAccounts: "Theo quy định tài khoản LiveSim / Live (tập trung lộ trình tăng vốn TCP lên $400K)",
      resetFee: "Miễn phí 1 lần Reset mỗi chu kỳ gia hạn tháng (Rebill) • Reset giữa tháng tính phí tiêu chuẩn",
      profitSplit: "Bậc thang 50/50 (dưới ngưỡng) → 80/20 (đạt/vượt ngưỡng) • Bậc $400K cố định 60/40",
      consistencyRule: "30% ở vòng thi (1 ngày không vượt quá 30% tổng target) • GỠ BỎ hoàn toàn khi lên Funded",
      affiliateInfo: "Có chương trình Affiliate/Partner chính thức với hoa hồng hấp dẫn & tracking link tự áp khuyến mãi.",
      summaryCompare: {
        drawdown: "EOD Trailing (tính cuối ngày)",
        dll: "Hard Breach (chạm là rớt ngay, tính cả lỗ ảo)",
        consistency: "30% (chỉ vòng thi • Bỏ khi Funded)",
        activationFee: "$139 (LiveSim — trừ vào lần rút đầu tiên!)",
        profitSplit: "50/50 → 80/20 (60/40 ở mốc $400K)",
        minDays: "Không yêu cầu tối thiểu (nhưng 30% rule → cần ≥4 ngày)",
        closeTime: "3:50 PM CT",
        news: "Cho phép",
        maxFunded: "Lộ trình scale lên $400K"
      },
      traps: [
        {
          title: "Bẫy #1: Daily Loss Limit (DLL) là HARD BREACH!",
          detail: "Khác với Bulenox Option 2 (chỉ khóa ngày), tại Earn2Trade, DLL tính theo cả lỗ thực + lỗ ảo (unrealized) + phí hoa hồng. Chạm DLL dù chỉ 1 tích tắc là RỚT TÀI KHOẢN NGAY LẬP TỨC."
        },
        {
          title: "Cập nhật lớn 02/11/2026: Đã bỏ Progression Ladder!",
          detail: "Với các gói mua từ 02/11/2026 trở đi, Earn2Trade đã bỏ hoàn toàn bảng Progression Ladder cũ dễ vi phạm. Thay vào đó là giới hạn hợp đồng CỐ ĐỊNH do hệ thống tự chặn (TCP25: 2 Minis, 50K: 4 Minis, 100K: 8 Minis, 150K: 12 Minis, 200K: 15 Minis, 400K: 20 Minis)."
        },
        {
          title: "Bẫy #2: Luật 5 ngày có lãi mới (Post-Nov 2, 2026)",
          detail: "Mỗi lần muốn rút tiền trên LiveSim/Live, bạn phải tích lũy đủ 5 ngày giao dịch có lãi ròng tối thiểu (không cần liên tiếp): TCP25 ≥ $100/ngày, 50K ≥ $150/ngày, 100K ≥ $200/ngày. Ngày đã dùng cho lần rút trước không được tính lại."
        },
        {
          title: "Bẫy #3: Ngưỡng chia lợi nhuận 50/50 vs 80/20",
          detail: "Nếu bạn rút số tiền THẤP HƠN ngưỡng quy định của gói (TCP25: $1,500 • TCP50: $2,250 • TCP100: $3,000 • TCP200: $5,000), bạn chỉ được chia 50/50! Hãy gom đủ từ ngưỡng trở lên để hưởng tỷ lệ 80/20."
        }
      ],
      earn2tradePricingMatrix: {
        coupons: [
          { id: "none", label: "Giá gốc (Chưa mã)", code: "", note: "Hiển thị giá niêm yết gốc trên trang đăng ký Earn2Trade." },
          { id: "BIGBF2026", label: "🔥 Áp mã BIGBF2026 (Black Week tới 70%)", code: "BIGBF2026", note: "Hạn đến 29/11/2026: Giảm 70% tháng 1 + 60% tháng 2 (TCP100 & GAU100) • 60% × 2 tháng (GAU150) • 50% × 2 tháng (TCP25, TCP50, GAU50, GAU200). Kèm giảm giá Reset đến 31/01/2027!" }
        ],
        tracks: [
          {
            id: "tcp",
            label: "Trader Career Path® (TCP — Scale tới $400K)",
            subtitle: "Tối đa 5 tài khoản song song • Tặng 1 Reset miễn phí khi Rebill • Đã bỏ Progression Ladder từ 02/11/2026.",
            plans: [
              { size: "TCP25 ($25K)", price: 150, unit: "/tháng", target: "$1,750", drawdown: "$1,500 (EOD)", dll: "$550 (Hard)", contracts: "2 Minis", resetNote: "Reset: $100 → $65", discounts: { "BIGBF2026": 50 }, dealBadge: "-50% × 2 tháng" },
              { size: "TCP50 ($50K)", price: 190, unit: "/tháng", target: "$3,000", drawdown: "$2,000 (EOD)", dll: "$1,100 (Hard)", contracts: "4 Minis", resetNote: "Reset: $100 → $85", popular: true, discounts: { "BIGBF2026": 50 }, dealBadge: "-50% × 2 tháng" },
              { size: "TCP100 ($100K)", price: 350, unit: "/tháng", target: "$6,000", drawdown: "$3,500 (EOD)", dll: "$2,200 (Hard)", contracts: "8 Minis", resetNote: "Tặng Reset khi Rebill", discounts: { "BIGBF2026": 70 }, dealBadge: "-70% T1 • -60% T2" }
            ]
          },
          {
            id: "gau",
            label: "The Gauntlet Mini™ (GAU — Thi thẳng size lớn)",
            subtitle: "Thi thẳng cấp vốn $50K – $200K • Không giới hạn số ngày tối thiểu • Được giao dịch tin tức (News).",
            plans: [
              { size: "GAU50 ($50K)", price: 170, unit: "/tháng", target: "$3,000", drawdown: "$2,000 (EOD)", dll: "$1,100 (Hard)", contracts: "4 Minis", resetNote: "Reset: $100 → $75", discounts: { "BIGBF2026": 50 }, dealBadge: "-50% × 2 tháng" },
              { size: "GAU100 ($100K)", price: 315, unit: "/tháng", target: "$6,000", drawdown: "$3,500 (EOD)", dll: "$2,200 (Hard)", contracts: "8 Minis", resetNote: "Reset chuẩn", popular: true, discounts: { "BIGBF2026": 70 }, dealBadge: "-70% T1 • -60% T2" },
              { size: "GAU150 ($150K)", price: 375, unit: "/tháng", target: "$9,000", drawdown: "$4,500 (EOD)", dll: "$3,300 (Hard)", contracts: "12 Minis", resetNote: "Reset: $130", discounts: { "BIGBF2026": 60 }, dealBadge: "-60% × 2 tháng" },
              { size: "GAU200 ($200K)", price: 550, unit: "/tháng", target: "$11,000", drawdown: "$6,000 (EOD)", dll: "$4,400 (Hard)", contracts: "15 Minis", resetNote: "Reset chuẩn", discounts: { "BIGBF2026": 50 }, dealBadge: "-50% × 2 tháng" }
            ]
          }
        ]
      },
      modes: [
        {
          id: "tcp",
          label: "Trader Career Path® (TCP) — Lộ trình Scale lên $200K / $400K",
          note: "Thi 1 lần, đỗ rồi rút tiền và tự động nâng hạng vốn lên các bậc cao hơn. Tặng 1 Reset miễn phí mỗi lần gia hạn tháng.",
          plans: [
            { size: "TCP25 ($25K → $200K)", listPrice: "$150/tháng", target: "$1,750", drawdown: "$1,500 (EOD)", dll: "$550 (Hard)", contracts: "2 Minis (20 Micros)", activation: "$139 (trừ rút đầu)", minProfitDay: "$100/ngày", split80Threshold: "$1,500" },
            { size: "TCP50 ($50K → $400K)", listPrice: "$190/tháng", target: "$3,000", drawdown: "$2,000 (EOD)", dll: "$1,100 (Hard)", contracts: "4 Minis (40 Micros)", activation: "$139 (trừ rút đầu)", minProfitDay: "$150/ngày", split80Threshold: "$2,250" },
            { size: "TCP100 ($100K → $400K)", listPrice: "$350/tháng", target: "$6,000", drawdown: "$3,500 (EOD)", dll: "$2,200 (Hard)", contracts: "8 Minis (80 Micros)", activation: "$139 (trừ rút đầu)", minProfitDay: "$200/ngày", split80Threshold: "$3,000" }
          ]
        },
        {
          id: "gau",
          label: "The Gauntlet Mini™ (GAU) — Thi thẳng Size Cố Định",
          note: "Đỗ gói nào cấp vốn thẳng gói đó ($50K – $200K), không đi theo lộ trình nâng bậc TCP. Luật EOD Drawdown & 30% Consistency tương tự.",
          plans: [
            { size: "Gauntlet Mini 50K", listPrice: "$170/tháng", target: "$3,000", drawdown: "$2,000 (EOD)", dll: "$1,100 (Hard)", contracts: "4 Minis (40 Micros)", activation: "$139 (trừ rút đầu)", minProfitDay: "$150/ngày", split80Threshold: "$2,250" },
            { size: "Gauntlet Mini 100K", listPrice: "$315/tháng", target: "$6,000", drawdown: "$3,500 (EOD)", dll: "$2,200 (Hard)", contracts: "8 Minis (80 Micros)", activation: "$139 (trừ rút đầu)", minProfitDay: "$200/ngày", split80Threshold: "$3,000" },
            { size: "Gauntlet Mini 150K", listPrice: "$375/tháng", target: "$9,000", drawdown: "$4,500 (EOD)", dll: "$3,300 (Hard)", contracts: "12 Minis (120 Micros)", activation: "$139 (trừ rút đầu)", minProfitDay: "$250/ngày", split80Threshold: "$4,000" },
            { size: "Gauntlet Mini 200K", listPrice: "$550/tháng", target: "$11,000", drawdown: "$6,000 (EOD)", dll: "$4,400 (Hard)", contracts: "15 Minis (150 Micros)", activation: "$139 (trừ rút đầu)", minProfitDay: "$300/ngày", split80Threshold: "$5,000" }
          ]
        }
      ],
      tcpScaling: [
        {
          tier: "TCP25 ($25K → $200K)",
          levels: [
            "Khởi điểm $25K: Tối đa 2 Minis (20 Micros)",
            "Nâng bậc $50K: Tối đa 4 Minis (40 Micros)",
            "Nâng bậc $100K: Tối đa 8 Minis (80 Micros)",
            "Trần tối đa $200K: Tối đa 15 Minis (150 Micros)"
          ]
        },
        {
          tier: "TCP50 ($50K → $400K)",
          levels: [
            "Khởi điểm $50K: Tối đa 4 Minis (40 Micros)",
            "Nâng bậc $100K: Tối đa 8 Minis (80 Micros)",
            "Nâng bậc $200K: Tối đa 15 Minis (150 Micros)",
            "Trần tối đa $400K: 20 Minis (chia 60/40 cố định)"
          ]
        },
        {
          tier: "TCP100 ($100K → $400K)",
          levels: [
            "Khởi điểm $100K: Tối đa 8 Minis (80 Micros)",
            "Nâng bậc $150K: Tối đa 12 Minis (120 Micros)",
            "Nâng bậc $200K: Tối đa 15 Minis (150 Micros)",
            "Trần tối đa $400K: 20 Minis (chia 60/40 cố định)"
          ]
        }
      ],
      payoutDetails: [
        "Phí kích hoạt LiveSim $139 KHÔNG cần đóng trước — được trừ thẳng vào lần rút lợi nhuận đầu tiên.",
        "Xử lý rút tiền hàng tuần (gửi yêu cầu trước 2:00 PM CT thứ Sáu, chi trả qua Rise và các cổng quốc tế).",
        "Yêu cầu 5 ngày có lãi đạt ngưỡng tối thiểu cho mỗi chu kỳ rút (luật áp dụng từ 02/11/2026).",
        "Chuyển từ LiveSim lên Live (tiền thật) sẽ chịu phí data sàn CME hàng tháng theo quy định sàn."
      ],
      platformGuide: {
        dataFeed: "Hỗ trợ cả Rithmic và dxFeed (chuẩn tổ chức, độ sâu sổ lệnh MBO cực mượt).",
        bestPick: "Gói dxFeed × ATAS hoặc dxFeed × DeepCharts (được MIỄN PHÍ bản quyền phần mềm phân tích Order Flow / Footprint đắt tiền suốt vòng thi & LiveSim!). Hoặc NinjaTrader / Tradovate nếu quen dùng.",
        commissionEst: "Tham khảo ~$4.20–$4.80/vòng (Mini) • ~$1.10–$1.50/vòng (Micro) tùy sàn CME & đối tác brokerage.",
        liveDataFee: "Vòng thi miễn phí data Non-Pro. Giai đoạn LiveSim gộp trong phí kích hoạt $139 (trừ vào lần rút đầu). Chuyển lên Live thật tính phí data sàn CME (~$140+/tháng nếu là Professional, Non-Pro theo biểu phí CME)."
      }
    },

    topstep: {
      id: "topstep",
      name: "Topstep",
      tagline: "Quỹ Futures số 1 toàn cầu • Phí thi từ $49 • Có gói $0 Activation Fee • TopstepX cực mượt",
      accent: "#34D399",
      badgeText: "ĐƯỢC TRADER QUỸ ƯA CHUỘNG NHẤT",
      founded: "2012 (Chicago, Mỹ)",
      platforms: ["TopstepX (Tích hợp TradingView & Copy Trade)", "Tradovate", "Quantower (tùy lộ trình)"],
      markets: "CME, CBOT, NYMEX, COMEX (Futures)",
      closeTimeCT: "3:10 PM CT",
      closeTimeVN_Summer: "03:10 sáng (giờ VN, mùa Hè CDT)",
      closeTimeVN_Winter: "04:10 sáng (giờ VN, mùa Đông CST)",
      newsTrading: "Cho phép giao dịch tin tức (nhưng phải tự giữ an toàn trong MLL & Scaling Plan)",
      copyTrading: "Cho phép copy tối đa 5 TK XFA bằng bộ copy tích hợp sẵn trong TopstepX (cấm Hedge chéo 2 TK)",
      maxAccounts: "Tối đa 5 tài khoản Express Funded Account (XFA) chạy song song",
      resetFee: "Standard: $49 / $99 / $199 • No Activation Fee: $95 / $149 / $229",
      profitSplit: "90% Trader / 10% Topstep (ở cả 2 nhánh Standard & Consistency Path)",
      consistencyRule: "Combine: 55% (vượt không rớt, chỉ tăng target) • XFA: Chọn Standard (5 ngày $150+) hoặc Consistency (3 ngày + 40%)",
      affiliateInfo: "Đã đóng Affiliate truyền thống cho người mới → Sử dụng Referral Code từ Trader Profile (tối đa 5 mã thưởng/tháng).",
      summaryCompare: {
        drawdown: "EOD Trailing MLL (khóa tại $0 sau khi hòa vốn/rút đầu)",
        dll: "Tùy chọn cài đặt trên TopstepX (không bắt buộc)",
        consistency: "Combine 55% | XFA: 5 ngày $150+ hoặc 3 ngày 40%",
        activationFee: "Standard: $149 | Gói NAF: $0",
        profitSplit: "90/10 (Rút tối đa 50% balance mỗi lần, có trần)",
        minDays: "2 ngày giao dịch (vòng Combine)",
        closeTime: "3:10 PM CT (nhớ đóng sớm hơn 2 quỹ kia!)",
        news: "Cho phép",
        maxFunded: "5 TK XFA song song"
      },
      traps: [
        {
          title: "Bẫy #1: 'First Payout Trap' — Rút tiền lần đầu kéo MLL về $0!",
          detail: "Ngay khi bạn rút tiền lần đầu trên XFA, Maximum Loss Limit (MLL) sẽ khóa cứng tại mức $0 (vốn gốc). Ví dụ TK 50K lãi $3,000, bạn rút $1,500 thì phần đệm (buffer) còn lại chỉ là $1,500 — thua $1,500 là cháy ngay! Đừng rút cạn sạch buffer quá sớm."
        },
        {
          title: "Bẫy #2: Giờ đóng lệnh 3:10 PM CT sớm nhất trong 3 quỹ",
          detail: "Topstep yêu cầu phẳng toàn bộ lệnh và lệnh chờ trước 3:10 PM CT (hệ thống bắt đầu quét từ 3:08 PM CT), sớm hơn Bulenox gần 50 phút và Earn2Trade 40 phút!"
        },
        {
          title: "Bẫy #3: Scaling Plan trên XFA siết rất chặt lúc mới đỗ",
          detail: "Lúc thi Combine 50K bạn được đánh 5 Minis, nhưng vừa đỗ lên XFA 50K (khi số dư lãi < $1,500) bạn CHỈ ĐƯỢC ĐÁNH TỐI ĐA 1 Mini (10 Micros). Mức hợp đồng chỉ mở khóa vào ngày hôm sau sau khi chốt phiên EOD."
        },
        {
          title: "Bẫy #4: Phải chọn vĩnh viễn Standard Path hay Consistency Path",
          detail: "Khi kích hoạt XFA, bạn phải chọn 1 trong 2 nhánh rút tiền và không đổi được: Standard (5 ngày lãi ≥$150, trần rút $2K/$3K/$5K) hoặc Consistency (3 ngày + 40% consistency, trần rút cao hơn: $3K/$4K/$6K)."
        }
      ],
      topstepPricingMatrix: {
        coupons: [
          { id: "none", label: "Giá gốc (Chưa mã)", code: "", note: "Hiển thị giá niêm yết gốc trên trang checkout Topstep." },
          { id: "KENVINZONE", label: "🦃 Áp mã KENVINZONE (-50% Friendsgiving)", code: "KENVINZONE", note: "Giảm thẳng 50% cho lần mua Trading Combine đầu tiên! Mã KENVINZONE không bao giờ hết hạn cho trader mới." }
        ],
        tracks: [
          {
            id: "naf",
            label: "No Activation Fee ($0 kích hoạt XFA)",
            subtitle: "Không mất $149 phí kích hoạt khi đỗ • Bật Responsible Trading Advantage để giảm thêm tới $30/tháng + X2 Trần Rút (DOUBLE Payout Caps)!",
            rtaOff: [
              { size: "$50K Combine", price: 95, unit: "/tháng", target: "$3,000", drawdown: "$2,000 (EOD MLL)", dll: "Không bắt buộc", contracts: "5 Minis / 50 Micros", activation: "FREE ($0)", resetFee: "$95", discounts: { "KENVINZONE": 50 } },
              { size: "$100K Combine", price: 149, unit: "/tháng", target: "$6,000", drawdown: "$3,000 (EOD MLL)", dll: "Không bắt buộc", contracts: "10 Minis / 100 Micros", activation: "FREE ($0)", resetFee: "$149", popular: true, discounts: { "KENVINZONE": 50 } },
              { size: "$150K Combine", price: 229, unit: "/tháng", target: "$9,000", drawdown: "$4,500 (EOD MLL)", dll: "Không bắt buộc", contracts: "15 Minis / 150 Micros", activation: "FREE ($0)", resetFee: "$229", discounts: { "KENVINZONE": 50 } }
            ],
            rtaOn: [
              { size: "$50K Combine", price: 85, baseBeforeRta: 95, unit: "/tháng", target: "$3,000", drawdown: "$2,000 (EOD MLL)", dll: "$1,000 + X2 Payout Cap", contracts: "5 Minis / 50 Micros", activation: "FREE ($0)", resetFee: "$85", discounts: { "KENVINZONE": 50 } },
              { size: "$100K Combine", price: 129, baseBeforeRta: 149, unit: "/tháng", target: "$6,000", drawdown: "$3,000 (EOD MLL)", dll: "$2,000 + X2 Payout Cap", contracts: "10 Minis / 100 Micros", activation: "FREE ($0)", resetFee: "$129", popular: true, discounts: { "KENVINZONE": 50 } },
              { size: "$150K Combine", price: 199, baseBeforeRta: 229, unit: "/tháng", target: "$9,000", drawdown: "$4,500 (EOD MLL)", dll: "$3,000 + X2 Payout Cap", contracts: "15 Minis / 150 Micros", activation: "FREE ($0)", resetFee: "$199", discounts: { "KENVINZONE": 50 } }
            ]
          },
          {
            id: "standard",
            label: "Standard Path (Phí tháng từ $49 + $149 kích hoạt)",
            subtitle: "Tối ưu cho người mới luyện tay • Phí tháng thấp nhất ($49/$99/$199) • Lưu ý: Bật RTA ở gói Standard giữ nguyên giá tháng, chỉ kích hoạt thêm DLL & X2 Trần Rút (giảm -$10→$30/tháng chỉ áp dụng cho gói NAF).",
            rtaOff: [
              { size: "$50K Combine", price: 49, unit: "/tháng", target: "$3,000", drawdown: "$2,000 (EOD MLL)", dll: "Không bắt buộc", contracts: "5 Minis / 50 Micros", activation: "$149", resetFee: "$49", discounts: { "KENVINZONE": 50 } },
              { size: "$100K Combine", price: 99, unit: "/tháng", target: "$6,000", drawdown: "$3,000 (EOD MLL)", dll: "Không bắt buộc", contracts: "10 Minis / 100 Micros", activation: "$149", resetFee: "$99", popular: true, discounts: { "KENVINZONE": 50 } },
              { size: "$150K Combine", price: 199, unit: "/tháng", target: "$9,000", drawdown: "$4,500 (EOD MLL)", dll: "Không bắt buộc", contracts: "15 Minis / 150 Micros", activation: "$149", resetFee: "$199", discounts: { "KENVINZONE": 50 } }
            ],
            rtaOn: [
              { size: "$50K Combine", price: 49, unit: "/tháng", target: "$3,000", drawdown: "$2,000 (EOD MLL)", dll: "$1,000 + X2 Payout Cap", contracts: "5 Minis / 50 Micros", activation: "$149", resetFee: "$49", discounts: { "KENVINZONE": 50 } },
              { size: "$100K Combine", price: 99, unit: "/tháng", target: "$6,000", drawdown: "$3,000 (EOD MLL)", dll: "$2,000 + X2 Payout Cap", contracts: "10 Minis / 100 Micros", activation: "$149", resetFee: "$99", popular: true, discounts: { "KENVINZONE": 50 } },
              { size: "$150K Combine", price: 199, unit: "/tháng", target: "$9,000", drawdown: "$4,500 (EOD MLL)", dll: "$3,000 + X2 Payout Cap", contracts: "15 Minis / 150 Micros", activation: "$149", resetFee: "$199", discounts: { "KENVINZONE": 50 } }
            ]
          }
        ]
      },
      modes: [
        {
          id: "standard",
          label: "Standard Path — Phí tháng thấp ($49–$199) + Phí kích hoạt $149",
          note: "Tối ưu nếu bạn mới làm quen Topstep hoặc dự kiến thi kéo dài trên 2 tháng / có thể cần reset nhiều lần.",
          plans: [
            { size: "$50,000", listPrice: "$49/tháng", target: "$3,000", drawdown: "$2,000 (EOD MLL)", dll: "Tùy chọn ($1,000)", contracts: "5 Minis (50 Micros)", activation: "$149 (1 lần)", consistencyMaxDay: "$1,650 (55%)", resetPrice: "$49" },
            { size: "$100,000", listPrice: "$99/tháng", target: "$6,000", drawdown: "$3,000 (EOD MLL)", dll: "Tùy chọn ($2,000)", contracts: "10 Minis (100 Micros)", activation: "$149 (1 lần)", consistencyMaxDay: "$3,300 (55%)", resetPrice: "$99" },
            { size: "$150,000", listPrice: "$199/tháng", target: "$9,000", drawdown: "$4,500 (EOD MLL)", dll: "Tùy chọn ($3,000)", contracts: "15 Minis (150 Micros)", activation: "$149 (1 lần)", consistencyMaxDay: "$4,950 (55%)", resetPrice: "$199" }
          ]
        },
        {
          id: "naf",
          label: "No Activation Fee (NAF) Path — Miễn $149 phí kích hoạt XFA",
          note: "Cực lợi về tổng chi phí cho trader tự tin vượt vòng Combine trong 1–2 lần thử (ví dụ gói 50K chỉ tốn tổng $95 thay vì $49 + $149 = $198!).",
          plans: [
            { size: "$50,000", listPrice: "$95/tháng", target: "$3,000", drawdown: "$2,000 (EOD MLL)", dll: "Tùy chọn ($1,000)", contracts: "5 Minis (50 Micros)", activation: "$0 (Miễn phí)", consistencyMaxDay: "$1,650 (55%)", resetPrice: "$95" },
            { size: "$100,000", listPrice: "$149/tháng", target: "$6,000", drawdown: "$3,000 (EOD MLL)", dll: "Tùy chọn ($2,000)", contracts: "10 Minis (100 Micros)", activation: "$0 (Miễn phí)", consistencyMaxDay: "$3,300 (55%)", resetPrice: "$149" },
            { size: "$150,000", listPrice: "$229/tháng", target: "$9,000", drawdown: "$4,500 (EOD MLL)", dll: "Tùy chọn ($3,000)", contracts: "15 Minis (150 Micros)", activation: "$0 (Miễn phí)", consistencyMaxDay: "$4,950 (55%)", resetPrice: "$229" }
          ]
        }
      ],
      xfaScaling: [
        { tier: "$50K XFA", levels: ["Lãi < $1,500: 1 Mini (10 Micros)", "Lãi ≥ $1,500: 2 Minis (20 Micros)", "Lãi ≥ $2,000: 3 Minis (31 Micros)"] },
        { tier: "$100K XFA", levels: ["Lãi < $1,500: 1 Mini (18 Micros)", "Lãi ≥ $1,500: 2 Minis (25 Micros)", "Lãi ≥ $2,000: 3 Minis (31 Micros)", "Lãi ≥ $3,000: 6 Minis (62 Micros)"] },
        { tier: "$150K XFA", levels: ["Lãi < $1,500: 1 Mini (18 Micros)", "Lãi ≥ $1,500: 2 Minis (25 Micros)", "Lãi ≥ $2,000: 3 Minis (31 Micros)", "Lãi ≥ $3,000: 6 Minis (62 Micros)", "Lãi ≥ $4,500: 9 Minis (93 Micros)"] }
      ],
      payoutDetails: [
        "Rút tối thiểu $125/lần • Tối đa 50% số dư lãi mỗi lần yêu cầu, bị giới hạn bởi trần rút theo gói & nhánh chọn.",
        "Nhánh XFA Standard Path (5 ngày lãi ≥ $150): Trần rút $2,000 (50K) • $3,000 (100K) • $5,000 (150K).",
        "Nhánh XFA Consistency Path (3 ngày + 40% Consistency): Trần rút $3,000 (50K) • $4,000 (100K) • $6,000 (150K).",
        "Phí rút tiền: ACH/Wire mất $30; các cổng như Wise / Aeropay thường được miễn phí từ Topstep. Lên Live Funded Account (LFA) sẽ bỏ trần rút hoàn toàn."
      ],
      platformGuide: {
        dataFeed: "TopstepX (ProjectX / tích hợp trực tiếp biểu đồ TradingView trên trình duyệt, không cần cài phần mềm hay cấu hình Rithmic phức tạp).",
        bestPick: "TopstepX — dễ làm quen nhất cho người mới từ Forex/Crypto sang, có sẵn Copy Trader nội bộ (tối đa 5 XFA), khóa DLL tự động & nút Flatten 1 chạm.",
        commissionEst: "Rất cạnh tranh trên TopstepX: ~$2.80/vòng (Mini ES/NQ) • ~$0.74/vòng (Micro MES/MNQ).",
        liveDataFee: "Miễn phí data trong suốt Combine & XFA. Khi nâng cấp lên Live Funded Account (LFA), áp dụng phí data gói CME (~$135/tháng cho Non-Professional)."
      }
    }
  }
};
