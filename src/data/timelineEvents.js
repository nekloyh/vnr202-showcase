/**
 * ═══════════════════════════════════════════════════════════════
 *  TIMELINE EVENT SCHEMA
 * ═══════════════════════════════════════════════════════════════
 *
 *  Each event in the `timelineEvents` array follows this structure:
 *
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │  REQUIRED FIELDS                                           │
 *  ├─────────────────────────────────────────────────────────────┤
 *  │  id            number | string  – Unique identifier        │
 *  │  year          string            – Display year / range     │
 *  │                                    e.g. "1954", "1947–1950" │
 *  │  title         string            – Event headline           │
 *  │  shortDesc     string            – 1–2 sentence summary     │
 *  │  coords        [lng, lat]        – Primary map anchor       │
 *  ├─────────────────────────────────────────────────────────────┤
 *  │  RECOMMENDED FIELDS                                        │
 *  ├─────────────────────────────────────────────────────────────┤
 *  │  longDesc      string            – Full description for     │
 *  │                                    the detail panel         │
 *  │  badge         string            – Short label, e.g.        │
 *  │                                    "KHAI SINH"              │
 *  │  category      string            – "military" | "political" │
 *  │                                    | "diplomatic" | "social"│
 *  │  image         string            – Path to event image      │
 *  │  zoomLevel     number            – Map zoom (default: 6.2)  │
 *  │  regionIds     string[]          – Province codes (VN-XX)   │
 *  │  stats         object            – Metadata for detail panel│
 *  │    .location   string            – Place name               │
 *  │    .impact     string            – Impact summary           │
 *  │    .significance string          – "Cao" | "Rất cao" etc.   │
 *  ├─────────────────────────────────────────────────────────────┤
 *  │  OPTIONAL FIELDS                                           │
 *  ├─────────────────────────────────────────────────────────────┤
 *  │  tags          string[]          – Freeform labels          │
 *  │  dateRange     [string, string]  – ISO start/end dates      │
 *  │  influencePaths                                             │
 *  │    Array of movement/influence arrow definitions:           │
 *  │      • [[lng,lat], …]  simple coordinate array              │
 *  │      • { coordinates, dashed?, color?, strokeWidth? }       │
 *  │  archipelagoRelevance                                       │
 *  │    string[]  – ["hoang-sa"] or ["truong-sa"]                │
 *  │    Highlights island group when event is selected.          │
 *  ├─────────────────────────────────────────────────────────────┤
 *  │  HOW TO ADD A NEW EVENT                                    │
 *  │  1. Copy any event below                                   │
 *  │  2. Give it a unique `id`                                  │
 *  │  3. Fill year, title, shortDesc, coords                    │
 *  │  4. Add regionIds for province highlights                  │
 *  │  5. Add influencePaths for map arrows                      │
 *  │  6. Run `npm run build` to verify                          │
 *  └─────────────────────────────────────────────────────────────┘
 */

export const timelineEvents = [
  {
    id: 1,
    year: "1945",
    title: "Tuyên ngôn Độc lập",
    badge: "KHAI SINH",
    category: "political",
    shortDesc:
      "Ngày 2/9/1945, nước Việt Nam Dân chủ Cộng hòa được tuyên bố tại Hà Nội.",
    longDesc:
      "Sự kiện tại Quảng trường Ba Đình đánh dấu sự ra đời của một nhà nước độc lập mới, mở đầu cho giai đoạn kháng chiến và kiến tạo thể chế hiện đại.",
    coords: [105.8342, 21.0278],
    regionIds: ["VN-HN"],
    zoomLevel: 6.4,
    image: "/historical/ViTuyen17.png",
    tags: ["độc lập", "ba đình", "hồ chí minh"],
    stats: {
      location: "Hà Nội",
      impact: "Khai sinh nhà nước cách mạng",
      significance: "Cao",
    },
    influencePaths: [
      {
        coordinates: [
          [105.8342, 21.0278],
          [106.6881, 20.8449],
        ],
      },
      {
        coordinates: [
          [105.8342, 21.0278],
          [107.59, 16.46],
        ],
      },
      {
        coordinates: [
          [105.8342, 21.0278],
          [106.63, 10.82],
        ],
      },
    ],
  },
  {
    id: 2,
    year: "1946",
    title: "Toàn quốc kháng chiến",
    badge: "TOÀN QUỐC KHÁNG CHIẾN",
    category: "military",
    shortDesc:
      "Lời kêu gọi Toàn quốc kháng chiến được phát đi, mở đầu cuộc chiến chống thực dân trở lại.",
    longDesc:
      "Từ Hà Nội, kháng chiến lan rộng ra nhiều đô thị và nông thôn, định hình chiến lược trường kỳ, tự lực cánh sinh trong giai đoạn đầu.",
    coords: [105.8342, 21.0278],
    regionIds: ["VN-HN", "VN-HP"],
    zoomLevel: 6.6,
    image: "/historical/ViTuyen17.png",
    tags: ["kháng chiến", "hồ chí minh"],
    stats: {
      location: "Hà Nội",
      impact: "Chuyển sang kháng chiến toàn diện",
      significance: "Cao",
    },
    influencePaths: [
      {
        coordinates: [
          [105.8342, 21.0278],
          [106.6881, 20.8449],
        ],
      },
      {
        coordinates: [
          [105.8342, 21.0278],
          [105.83, 19.8],
        ],
      },
    ],
  },
  {
    id: 3,
    year: "1947–1950",
    title: "Chiến dịch Biên giới",
    badge: "CĂN CỨ ĐỊA",
    category: "military",
    shortDesc:
      "Chiến dịch Biên giới 1950 phá thế bao vây, mở hành lang chiến lược ở Việt Bắc.",
    longDesc:
      "Thắng lợi ở Cao Bằng – Lạng Sơn giúp lực lượng kháng chiến mở rộng liên lạc quốc tế, nâng cao thế chủ động chiến trường.",
    coords: [106.257, 22.666],
    regionIds: ["VN-CB", "VN-LS"],
    zoomLevel: 7.2,
    image: "/historical/ViTuyen17.png",
    tags: ["biên giới", "việt bắc", "cao bằng"],
    stats: {
      location: "Cao Bằng",
      impact: "Mở thông tuyến chiến lược",
      significance: "Cao",
    },
    influencePaths: [
      {
        coordinates: [
          [106.257, 22.666],
          [105.8342, 21.0278],
        ],
      },
      {
        coordinates: [
          [106.257, 22.666],
          [103.016, 21.386],
        ],
      },
    ],
  },
  {
    id: 4,
    year: "1954",
    title: "Chiến thắng Điện Biên Phủ",
    badge: "CHIẾN THẮNG LỊCH SỬ",
    category: "military",
    shortDesc:
      "Tập đoàn cứ điểm Điện Biên Phủ thất thủ, buộc Pháp ngồi vào bàn đàm phán.",
    longDesc:
      "Chiến dịch Điện Biên Phủ là bước ngoặt có ý nghĩa quốc tế, góp phần dẫn tới Hiệp định Geneva và thay đổi cục diện Đông Dương.",
    coords: [103.016, 21.386],
    regionIds: ["VN-DI"],
    zoomLevel: 7.1,
    image: "/historical/ViTuyen17.png",
    tags: ["điện biên phủ", "geneva", "pháp"],
    stats: {
      location: "Điện Biên",
      impact: "Bước ngoặt quân sự – ngoại giao",
      significance: "Rất cao",
    },
    influencePaths: [
      {
        coordinates: [
          [103.016, 21.386],
          [105.8342, 21.0278],
        ],
      },
      {
        coordinates: [
          [103.016, 21.386],
          [107.59, 16.46],
          [106.63, 10.82],
        ],
      },
    ],
  },
  {
    id: 5,
    year: "1960",
    title: "Phong trào Đồng Khởi",
    badge: "ĐỒNG KHỞI",
    category: "social",
    shortDesc:
      "Đồng Khởi ở Bến Tre tạo thế phát triển mới cho phong trào cách mạng miền Nam.",
    longDesc:
      "Phong trào từ Bến Tre lan ra nhiều tỉnh Nam Bộ, thúc đẩy chuyển biến tương quan lực lượng và phương thức đấu tranh ở miền Nam.",
    coords: [106.375, 10.243],
    regionIds: ["VN-BT", "VN-SG"],
    zoomLevel: 7.3,
    image: "/historical/ViTuyen17.png",
    tags: ["đồng khởi", "bến tre", "nam bộ"],
    stats: {
      location: "Bến Tre",
      impact: "Mở rộng đấu tranh ở Nam Bộ",
      significance: "Cao",
    },
    influencePaths: [
      {
        coordinates: [
          [106.375, 10.243],
          [106.63, 10.82],
        ],
      },
      {
        coordinates: [
          [106.375, 10.243],
          [105.75, 9.95],
        ],
      },
    ],
  },
  {
    id: 6,
    year: "1968",
    title: "Tổng tiến công Tết Mậu Thân",
    badge: "TẾT MẬU THÂN",
    category: "military",
    shortDesc:
      "Đợt tiến công đồng loạt tại nhiều đô thị làm thay đổi nhận thức chiến tranh.",
    longDesc:
      "Từ Huế, Sài Gòn đến nhiều thành phố khác, Tết Mậu Thân tạo hiệu ứng chính trị – quân sự lớn trong và ngoài nước.",
    coords: [107.5909, 16.4637],
    regionIds: ["VN-TTH", "VN-SG", "VN-HN"],
    zoomLevel: 6.7,
    image: "/historical/ViTuyen17.png",
    tags: ["tết mậu thân", "huế", "sài gòn"],
    stats: {
      location: "Huế",
      impact: "Tác động chiến lược toàn miền",
      significance: "Rất cao",
    },
    influencePaths: [
      {
        coordinates: [
          [107.5909, 16.4637],
          [106.63, 10.82],
        ],
      },
      {
        coordinates: [
          [107.5909, 16.4637],
          [105.8342, 21.0278],
        ],
      },
    ],
  },
  {
    id: 7,
    year: "1972",
    title: "Chiến dịch Trị–Thiên và Quảng Trị",
    badge: "MÙA HÈ ĐỎ LỬA",
    category: "military",
    shortDesc:
      "Mặt trận Quảng Trị trở thành điểm nóng quyết định trong giai đoạn đàm phán.",
    longDesc:
      "Các trận đánh ác liệt tại Quảng Trị tác động trực tiếp tới thế mặc cả trên bàn đàm phán Paris và cục diện quân sự miền Trung.",
    coords: [107.183, 16.75],
    regionIds: ["VN-QT", "VN-TTH"],
    zoomLevel: 7.0,
    image: "/historical/ViTuyen17.png",
    tags: ["quảng trị", "paris", "đàm phán"],
    stats: {
      location: "Quảng Trị",
      impact: "Tạo áp lực chiến lược",
      significance: "Cao",
    },
    influencePaths: [
      {
        coordinates: [
          [107.183, 16.75],
          [108.2022, 16.0544],
        ],
      },
      {
        coordinates: [
          [107.183, 16.75],
          [105.8342, 21.0278],
        ],
      },
    ],
  },
  {
    id: 8,
    year: "1975",
    title: "Chiến dịch Hồ Chí Minh",
    badge: "THỐNG NHẤT",
    category: "military",
    shortDesc:
      "Giải phóng Sài Gòn, thống nhất đất nước vào ngày 30/4/1975.",
    longDesc:
      "Đòn tiến công chiến lược cuối cùng kết thúc chiến tranh, mở ra giai đoạn thống nhất lãnh thổ và tái thiết quốc gia.",
    coords: [106.6297, 10.8231],
    regionIds: ["VN-SG"],
    zoomLevel: 6.9,
    image: "/historical/ViTuyen17.png",
    tags: ["giải phóng", "sài gòn", "thống nhất"],
    stats: {
      location: "Sài Gòn",
      impact: "Kết thúc chiến tranh, thống nhất",
      significance: "Rất cao",
    },
    influencePaths: [
      {
        coordinates: [
          [108.2022, 16.0544],
          [106.63, 10.82],
        ],
      },
      {
        coordinates: [
          [105.8342, 21.0278],
          [107.59, 16.46],
          [106.63, 10.82],
        ],
      },
    ],
  },
];
