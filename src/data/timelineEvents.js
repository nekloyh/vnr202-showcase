/**
 * ═══════════════════════════════════════════════════════════════
 *  TIMELINE EVENT DATA — Vietnam War 1954–1965
 * ═══════════════════════════════════════════════════════════════
 *
 * Central data source for the Mốc Thời Gian (timeline / map) page.
 * Each event drives three UI areas:
 *   (1) Left panel  — event list navigation
 *   (2) Center      — interactive map with markers and arrows
 *   (3) Right panel — detail with image, stats, description
 *
 * ─────────────────────────────────────────────────────────────
 *  SCHEMA
 * ─────────────────────────────────────────────────────────────
 *
 * @typedef {Object} EventStats
 * @property {string} location        – Primary location name
 * @property {string} impact          – One-line impact summary
 * @property {string} significance    – "Trung bình" | "Cao" | "Rất cao"
 *
 * @typedef {Object} InfluencePath
 * @property {[number,number][]} coordinates – [lng, lat] waypoints (min 2)
 * @property {boolean}  [dashed=true]        – true = influence/spread, false = troop movement
 * @property {string}   [color="#C9484A"]    – Stroke color
 * @property {number}   [strokeWidth=0.6]    – Line weight (renderer caps at 1.2)
 *
 * @typedef {Object} TimelineEvent
 * ┌──────────────────────────────────────────────────────────┐
 * │  REQUIRED                                                │
 * ├──────────────────────────────────────────────────────────┤
 * │  id             number|string    Unique event identifier │
 * │  year           string           Display year / range    │
 * │  title          string           Event headline          │
 * │  shortDesc      string           1–2 sentence summary    │
 * │  coords         [lng, lat]       Primary map anchor      │
 * │  category       string           See CATEGORIES below    │
 * ├──────────────────────────────────────────────────────────┤
 * │  RECOMMENDED                                             │
 * ├──────────────────────────────────────────────────────────┤
 * │  longDesc       string           Full detail description │
 * │  badge          string           Short label / subtitle  │
 * │  image          string           Image path (/public/)   │
 * │  regionIds      string[]         Province HASC ("VN-HN") │
 * │  zoomLevel      number           Map zoom (default 6.2)  │
 * │  stats          EventStats       Metadata for panel      │
 * │  influencePaths InfluencePath[]  Directional map arrows  │
 * │  tags           string[]         Freeform keywords       │
 * ├──────────────────────────────────────────────────────────┤
 * │  OPTIONAL                                                │
 * ├──────────────────────────────────────────────────────────┤
 * │  dateRange      [string, string] ISO start/end dates     │
 * │  archipelagoRelevance string[]   ["hoang-sa"|"truong-sa"]│
 * ├──────────────────────────────────────────────────────────┤
 * │  CATEGORIES                                              │
 * │  "military" · "political" · "diplomatic" · "social"      │
 * └──────────────────────────────────────────────────────────┘
 *
 * ─────────────────────────────────────────────────────────────
 *  HOW TO ADD A NEW EVENT
 * ─────────────────────────────────────────────────────────────
 *  1. Copy the TEMPLATE below or duplicate any existing event.
 *  2. Assign a unique `id` (increment from the last).
 *  3. Fill at minimum: year, title, category, shortDesc, coords.
 *  4. Add regionIds for province highlights on the map.
 *  5. Add influencePaths for directional arrows.
 *  6. Use coords from MAP_ANCHORS or add your own [lng, lat].
 *  7. Run `npm run build` to verify.
 *
 *  TEMPLATE:
 *  {
 *    id: 99,
 *    year: "19XX",
 *    title: "Tên sự kiện",
 *    badge: "NHÃN NGẮN",
 *    category: "military",
 *    shortDesc: "Tóm tắt 1–2 câu.",
 *    longDesc:  "Mô tả đầy đủ cho bảng chi tiết bên phải.",
 *    coords: MAP_ANCHORS.hanoi,
 *    regionIds: ["VN-XX"],
 *    zoomLevel: 6.5,
 *    image: "/historical/image.png",
 *    tags: ["từ khóa"],
 *    stats: {
 *      location: "Địa điểm",
 *      impact: "Tác động chính",
 *      significance: "Cao",
 *    },
 *    influencePaths: [
 *      { coordinates: [MAP_ANCHORS.hanoi, MAP_ANCHORS.hue], dashed: true },
 *    ],
 *  },
 *
 * ═══════════════════════════════════════════════════════════════
 */

/* ── Named coordinate anchors ─────────────────────────────── */

export const MAP_ANCHORS = {
  hanoi:     [105.8342,  21.0278],
  haiphong:  [106.6881,  20.8449],
  caobang:   [106.257,   22.666],
  langson:   [106.761,   21.853],
  dienbien:  [103.023,   21.386],
  nghean:    [105.83,    19.8],
  hue:       [107.5909,  16.4637],
  quangtri:  [107.183,   16.75],
  dmz:       [107.0509,  17.0024],
  danang:    [108.2022,  16.0544],
  tayninh:   [106.0983,  11.31],
  bentre:    [106.375,   10.243],
  saigon:    [106.6297,  10.8231],
  camau:     [105.15,    9.18],
  apbac:     [106.1905,  10.4363],
  truongson: [106.3376,  16.7611],
  tonkin:    [107.8236,  19.8414],
  hoangsa:   [112.333,   16.667],
};

const A = MAP_ANCHORS;

/** @type {TimelineEvent[]} */
export const timelineEvents = [
  /* ─── 1. 1954 — Điện Biên Phủ ──────────────────────────── */
  {
    id: 1,
    year: "1954",
    title: "Điện Biên Phủ thất thủ",
    badge: "TRẬN ĐÁNH",
    category: "military",
    shortDesc:
      "Chiều 7/5/1954, lá cờ Quyết chiến Quyết thắng tung bay trên nóc hầm De Castries — quân và dân Việt Nam đập tan tập đoàn cứ điểm mạnh nhất Đông Dương, kết thúc chín năm kháng chiến chống Pháp và mở đường tới Hiệp định Geneva.",
    longDesc:
      "Chiến thắng Điện Biên Phủ ngày 7/5/1954 là đỉnh cao của cuộc kháng chiến chống thực dân Pháp, khi quân đội nhân dân Việt Nam dưới sự chỉ huy của Đại tướng Võ Nguyên Giáp bao vây và tiêu diệt hoàn toàn tập đoàn cứ điểm được coi là \"bất khả xâm phạm\" của Pháp. Chiến thắng lừng lẫy năm châu, chấn động địa cầu này buộc thực dân Pháp phải ngồi vào bàn đàm phán, trực tiếp dẫn tới Hiệp định Geneva tháng 7/1954 và khẳng định ý chí độc lập không gì lay chuyển của dân tộc Việt Nam.",
    coords: A.dienbien,
    regionIds: ["VN-DI"],
    zoomLevel: 7.1,
    image: "/images/timelines/Điện Biên Phủ thất thủ.jpg",
    tags: ["điện biên phủ", "đông dương", "nguồn gốc chiến tranh"],
    stats: {
      location: "Điện Biên Phủ, Điện Biên",
      impact: "Đánh bại lực lượng viễn chinh Pháp; dẫn tới đàm phán Geneva",
      significance: "Rất cao",
    },
    dateRange: ["1954-05-07", "1954-05-07"],
    influencePaths: [
      { coordinates: [A.dienbien, A.hanoi], dashed: false },
    ],
  },

  /* ─── 2. 1954 — Hiệp định Geneva ───────────────────────── */
  {
    id: 2,
    year: "1954",
    title: "Hiệp định Geneva — chia cắt tạm thời tại vĩ tuyến 17",
    badge: "HIỆP ĐỊNH",
    category: "diplomatic",
    shortDesc:
      "Ngày 21/7/1954, Hiệp định Geneva được ký kết — thừa nhận thắng lợi của nhân dân Việt Nam, thiết lập giới tuyến quân sự tạm thời tại vĩ tuyến 17 và quy định tổng tuyển cử thống nhất đất nước vào tháng 7/1956.",
    longDesc:
      "Hiệp định Geneva ký ngày 21/7/1954 là thành quả ngoại giao trực tiếp từ chiến thắng Điện Biên Phủ, buộc Pháp công nhận ngừng bắn và thiết lập giới tuyến quân sự tạm thời gần vĩ tuyến 17 cùng khu phi quân sự (DMZ). Tuyên bố cuối cùng quy định tổng tuyển cử toàn quốc vào tháng 7/1956 dưới sự giám sát quốc tế để thống nhất Tổ quốc. Tuy nhiên, chính quyền Ngô Đình Diệm được Mỹ hậu thuẫn đã ngang nhiên phá hoại hiệp định, từ chối tổ chức bầu cử, biến giới tuyến tạm thời thành đường chia cắt lâu dài — gieo mầm cho cuộc kháng chiến chống Mỹ sau này.",
    coords: A.dmz,
    regionIds: ["VN-QT"],
    zoomLevel: 7.0,
    image: "/images/timelines/Hiệp định Geneva — chia cắt tạm thời tại vĩ tuyến 17.jpg",
    tags: ["geneva", "chia cắt", "vĩ tuyến 17", "ngoại giao"],
    stats: {
      location: "Geneva, Thụy Sĩ → Vĩ tuyến 17",
      impact: "Ngừng bắn và chia cắt tạm thời; khuôn khổ cho tổng tuyển cử 1956",
      significance: "Rất cao",
    },
    dateRange: ["1954-07-21", "1954-07-21"],
    influencePaths: [
      { coordinates: [A.dmz, A.saigon], dashed: true },
      { coordinates: [A.dmz, A.hanoi], dashed: true },
    ],
  },

  /* ─── 3. 1954 — SEATO / Hiệp ước Manila ────────────────── */
  {
    id: 3,
    year: "1954",
    title: "Hiệp ước phòng thủ tập thể Đông Nam Á (SEATO)",
    badge: "LIÊN MINH",
    category: "diplomatic",
    shortDesc:
      "Ngày 8/9/1954, Mỹ cùng bảy quốc gia ký Hiệp ước Manila, lập ra khối quân sự SEATO — công cụ để Washington dựng cớ can thiệp vào Đông Nam Á và tìm cách bao vây phong trào giải phóng dân tộc tại Việt Nam.",
    longDesc:
      "Chỉ chưa đầy hai tháng sau Hiệp định Geneva, ngày 8/9/1954, Mỹ cùng Úc, Pháp, New Zealand, Pakistan, Philippines, Thái Lan và Anh ký Hiệp ước Manila, lập ra Tổ chức Hiệp ước Đông Nam Á (SEATO). Đây thực chất là một liên minh quân sự trong chiến lược Chiến tranh Lạnh của Mỹ nhằm ngăn chặn phong trào giải phóng dân tộc ở Đông Nam Á. SEATO sau này trở thành vỏ bọc pháp lý để Mỹ leo thang can thiệp quân sự vào Việt Nam, bất chấp tinh thần và nội dung của Hiệp định Geneva.",
    coords: A.saigon,
    regionIds: ["VN-SG"],
    zoomLevel: 6.5,
    image: "/images/timelines/Hiệp ước phòng thủ tập thể Đông Nam Á (SEATO).jpg",
    tags: ["seato", "manila", "chiến tranh lạnh", "liên minh"],
    stats: {
      location: "Manila, Philippines → Đông Nam Á",
      impact: "Khuôn khổ phòng thủ tập thể định hình chính sách Mỹ tại ĐNA",
      significance: "Cao",
    },
    dateRange: ["1954-09-08", "1954-09-08"],
  },

  /* ─── 4. 1954–1955 — Cuộc di cư ────────────────────────── */
  {
    id: 4,
    year: "1954–1955",
    title: "Cuộc di cư lớn từ Bắc vào Nam",
    badge: "DI CƯ",
    category: "social",
    shortDesc:
      "Từ tháng 8/1954 đến tháng 5/1955, Mỹ tổ chức chiến dịch di cư quy mô lớn từ miền Bắc vào miền Nam, sử dụng tuyên truyền tâm lý chiến và Hải quân Mỹ để di chuyển hàng trăm nghìn người nhằm phục vụ mưu đồ chia cắt lâu dài đất nước.",
    longDesc:
      "Sau khi Hiệp định Geneva được ký kết, khuôn khổ hiệp định cho phép di chuyển tự do giữa hai miền trong thời gian chuyển tiếp. Lợi dụng điều này, Mỹ và chính quyền tay sai tiến hành chiến dịch tuyên truyền tâm lý chiến quy mô lớn (như khẩu hiệu \"Chúa đã vào Nam\"), xúi giục và tổ chức di cư hàng loạt từ miền Bắc vào Nam qua cảng Hải Phòng (8/1954–5/1955). Hải quân Mỹ trực tiếp vận chuyển người dân, binh lính và trang thiết bị. Cuộc di cư này nhằm thay đổi cơ cấu dân số miền Nam, tạo cơ sở xã hội cho chính quyền Ngô Đình Diệm và phá hoại triển vọng thống nhất đất nước.",
    coords: A.haiphong,
    regionIds: ["VN-HP", "VN-SG"],
    zoomLevel: 6.4,
    image: "/images/timelines/Cuộc di cư lớn từ Bắc vào Nam.jpg",
    tags: ["di cư", "người tị nạn", "hải phòng", "sài gòn"],
    stats: {
      location: "Hải Phòng → Sài Gòn",
      impact: "Chuyển dịch dân số lớn; ảnh hưởng nhân khẩu và chính trị miền Nam",
      significance: "Cao",
    },
    dateRange: ["1954-08-01", "1955-05-18"],
    influencePaths: [
      { coordinates: [A.haiphong, A.saigon], dashed: false },
    ],
  },

  /* ─── 5. 1955 — Trưng cầu dân ý / VNCH ─────────────────── */
  {
    id: 5,
    year: "1955",
    title: "Trưng cầu dân ý Diệm–Bảo Đại — thành lập VNCH",
    badge: "QUỐC GIA",
    category: "political",
    shortDesc:
      "Ngày 23/10/1955, Ngô Đình Diệm tổ chức cuộc trưng cầu dân ý gian lận để phế truất Bảo Đại; ngày 26/10, Diệm tuyên bố thành lập cái gọi là \"Việt Nam Cộng hòa\" — một chính quyền tay sai phục vụ chiến lược của Mỹ tại Đông Dương.",
    longDesc:
      "Cuộc trưng cầu dân ý ngày 23/10/1955 do Ngô Đình Diệm tổ chức là một trò hề chính trị, với kết quả được ngụy tạo lên tới 98,2% phiếu thuận. Ngày 26/10/1955, Diệm tuyên bố thành lập \"Việt Nam Cộng hòa\" tại Sài Gòn, dựng lên một chính quyền đối lập với Việt Nam Dân chủ Cộng hòa hợp pháp. Bước đi này nằm trong âm mưu của Mỹ nhằm chia cắt vĩnh viễn Việt Nam, phá hoại tinh thần Hiệp định Geneva và ngăn cản cuộc tổng tuyển cử thống nhất mà Mỹ biết rằng Hồ Chí Minh sẽ giành chiến thắng áp đảo.",
    coords: A.saigon,
    regionIds: ["VN-SG"],
    zoomLevel: 7.3,
    image: "/images/timelines/Trưng cầu dân ý Diệm–Bảo Đại — thành lập VNCH.jpg",
    tags: ["ngô đình diệm", "bảo đại", "trưng cầu", "việt nam cộng hòa"],
    stats: {
      location: "Sài Gòn, miền Nam Việt Nam",
      impact: "Thành lập Việt Nam Cộng hòa; củng cố quyền lực Ngô Đình Diệm",
      significance: "Rất cao",
    },
    dateRange: ["1955-10-23", "1955-10-26"],
  },

  /* ─── 6. 1956 — Tổng tuyển cử không diễn ra ────────────── */
  {
    id: 6,
    year: "1956",
    title: "Tổng tuyển cử thống nhất 7/1956 không được thực hiện",
    badge: "BẦU CỬ",
    category: "political",
    shortDesc:
      "Tháng 7/1956, cuộc tổng tuyển cử thống nhất đất nước theo quy định của Hiệp định Geneva đã bị chính quyền Ngô Đình Diệm và Mỹ ngang nhiên phá hoại, cướp đi quyền tự quyết thiêng liêng của nhân dân Việt Nam.",
    longDesc:
      "Hiệp định Geneva quy định rõ ràng tổng tuyển cử toàn quốc sẽ diễn ra vào tháng 7/1956 dưới sự giám sát quốc tế để thống nhất đất nước bằng con đường hòa bình. Tuy nhiên, chính quyền Ngô Đình Diệm được Mỹ chống lưng đã trắng trợn từ chối tổ chức bầu cử, bởi cả Washington lẫn Sài Gòn đều thừa biết rằng Chủ tịch Hồ Chí Minh sẽ giành chiến thắng. Hành động phá hoại này đóng sập con đường thống nhất hòa bình, buộc nhân dân miền Nam phải đứng lên đấu tranh vũ trang để bảo vệ quyền tự quyết và thống nhất Tổ quốc.",
    coords: A.dmz,
    regionIds: ["VN-QT"],
    zoomLevel: 7.0,
    image: null,
    tags: ["geneva 1954", "bầu cử 1956", "chia cắt", "dmz"],
    stats: {
      location: "Cầu Hiền Lương / Sông Bến Hải (vĩ tuyến 17), Quảng Trị",
      impact: "Cố định hóa chia cắt và tăng cường đấu tranh chính danh Bắc–Nam",
      significance: "Rất cao",
    },
    dateRange: ["1956-07-01", "1956-07-31"],
  },

  /* ─── 7. 1956 — Hoàng Sa ────────────────────────────────── */
  {
    id: 7,
    year: "1956",
    title: "Đồn trú VNCH thay thế Pháp tại quần đảo Hoàng Sa",
    badge: "CHỦ QUYỀN",
    category: "diplomatic",
    shortDesc:
      "Tháng 3/1956, quần đảo Hoàng Sa — phần lãnh thổ thiêng liêng của Việt Nam — chứng kiến sự chuyển giao đồn trú từ Pháp sang chính quyền miền Nam, khẳng định chủ quyền không thể tranh cãi của Việt Nam trên Biển Đông.",
    longDesc:
      "Quần đảo Hoàng Sa từ lâu là lãnh thổ không thể tách rời của Việt Nam, được các triều đại phong kiến Việt Nam khai thác và quản lý liên tục qua nhiều thế kỷ. Tháng 3/1956, khi Lực lượng Viễn chinh Pháp rút khỏi miền Nam, đơn vị đồn trú của chính quyền Sài Gòn tiếp quản một số đảo tại Hoàng Sa. Dù giai đoạn 1954–1965 chưa phải thời điểm căng thẳng đỉnh điểm, sự kiện phản ánh tầm quan trọng chiến lược của quần đảo và khẳng định chủ quyền lịch sử liên tục của Việt Nam trên Biển Đông — vấn đề mà toàn dân tộc luôn kiên quyết bảo vệ.",
    coords: A.hoangsa,
    regionIds: ["VN-DN"],
    zoomLevel: 5.6,
    image: null,
    tags: ["hoàng sa", "chủ quyền", "biển đông"],
    stats: {
      location: "Quần đảo Hoàng Sa, Biển Đông",
      impact: "Khẳng định vị thế chiến lược và áp lực bên ngoài tại biên giới biển",
      significance: "Trung bình",
    },
    dateRange: ["1956-03-01", "1956-03-31"],
    influencePaths: [
      { coordinates: [A.danang, A.hoangsa], dashed: true },
    ],
    archipelagoRelevance: ["hoang-sa"],
  },

  /* ─── 8. 1959 — Đoàn 559 / Đường Trường Sơn ────────────── */
  {
    id: 8,
    year: "1959",
    title: "Thành lập Đoàn 559 — mở đường Trường Sơn",
    badge: "HẬU CẦN",
    category: "military",
    shortDesc:
      "Ngày 19/5/1959 — đúng sinh nhật Bác Hồ — Đoàn 559 được thành lập với sứ mệnh thiêng liêng: mở đường Trường Sơn huyền thoại, nối liền hậu phương lớn miền Bắc với tiền tuyến lớn miền Nam.",
    longDesc:
      "Trước khát vọng thống nhất cháy bỏng và yêu cầu chi viện cho đồng bào miền Nam đang đấu tranh, ngày 19/5/1959, Đoàn 559 được thành lập với nhiệm vụ mở tuyến hành lang chiến lược xuyên dãy Trường Sơn. Đây là khởi đầu của con đường huyền thoại mà thế giới gọi là Đường mòn Hồ Chí Minh — biểu tượng của ý chí sắt đá và sự sáng tạo phi thường của quân và dân Việt Nam. Bất chấp bom đạn, chất độc hóa học và địa hình hiểm trở, hàng vạn chiến sĩ, thanh niên xung phong đã dùng máu và mồ hôi xây dựng nên mạch máu giao thông quyết định, đưa người và vũ khí vào chiến trường miền Nam.",
    coords: A.hanoi,
    regionIds: ["VN-HN"],
    zoomLevel: 6.6,
    image: "/images/timelines/Thành lập Đoàn 559 — mở đường Trường Sơn.jpg",
    tags: ["đoàn 559", "đường hồ chí minh", "trường sơn", "hậu cần"],
    stats: {
      location: "Hà Nội (trung tâm quyết định) → Hành lang Trường Sơn",
      impact: "Xây dựng kiến trúc hậu cần bền vững cho xâm nhập và tiếp tế miền Nam",
      significance: "Rất cao",
    },
    dateRange: ["1959-05-19", "1959-05-19"],
    influencePaths: [
      { coordinates: [A.hanoi, A.truongson], dashed: false },
      { coordinates: [A.truongson, A.tayninh], dashed: false, color: "#C8102E" },
    ],
  },

  /* ─── 9. 1960 — Mặt trận Dân tộc Giải phóng ────────────── */
  {
    id: 9,
    year: "1960",
    title: "Thành lập Mặt trận Dân tộc Giải phóng miền Nam",
    badge: "KHỞI NGHĨA",
    category: "political",
    shortDesc:
      "Ngày 20/12/1960, Mặt trận Dân tộc Giải phóng miền Nam Việt Nam ra đời tại Tây Ninh — ngọn cờ đại đoàn kết tập hợp mọi tầng lớp nhân dân miền Nam đứng lên chống chế độ tay sai, đấu tranh cho thống nhất Tổ quốc.",
    longDesc:
      "Ngày 20/12/1960, Mặt trận Dân tộc Giải phóng miền Nam Việt Nam được thành lập tại Tân Lập, tỉnh Tây Ninh, đánh dấu bước ngoặt lịch sử của phong trào cách mạng miền Nam. Mặt trận quy tụ công nhân, nông dân, trí thức, tôn giáo và các dân tộc dưới ngọn cờ đại đoàn kết, tạo nên sức mạnh tổng hợp để chống lại chế độ độc tài Ngô Đình Diệm và sự can thiệp của Mỹ. Sự ra đời của Mặt trận chứng minh cuộc kháng chiến không phải là \"xung đột từ bên ngoài\" mà là phong trào chính nghĩa của nhân dân miền Nam đòi quyền tự do và thống nhất.",
    coords: A.tayninh,
    regionIds: ["VN-SG"],
    zoomLevel: 7.0,
    image: "/images/timelines/Thành lập Mặt trận Dân tộc Giải phóng miền Nam.jpg",
    tags: ["mặt trận giải phóng", "việt cộng", "tây ninh", "khởi nghĩa"],
    stats: {
      location: "Tây Ninh (khu vực Tân Lập), miền Nam Việt Nam",
      impact: "Thể chế hóa mặt trận chính trị và động viên quần chúng miền Nam",
      significance: "Rất cao",
    },
    dateRange: ["1960-12-20", "1960-12-20"],
    influencePaths: [
      { coordinates: [A.tayninh, A.saigon], dashed: true },
    ],
  },

  /* ─── 10. 1962 — Leo thang phản du kích Mỹ ──────────────── */
  {
    id: 10,
    year: "1962",
    title: "Leo thang phản du kích: MACV, ấp chiến lược, Ranch Hand",
    badge: "LEO THANG",
    category: "military",
    shortDesc:
      "Đầu năm 1962, Mỹ đổ quân ào ạt vào miền Nam: lập Bộ Tư lệnh MACV (8/2), chính quyền Diệm dựng chương trình ấp chiến lược gồm cầm dân (3/2), và triển khai Chiến dịch Ranch Hand rải chất độc hóa học hủy diệt mùa màng và rừng xanh Việt Nam.",
    longDesc:
      "Đầu năm 1962 chứng kiến bước leo thang nguy hiểm của đế quốc Mỹ tại miền Nam. Ngày 8/2/1962, Mỹ thành lập Bộ Tư lệnh Viện trợ Quân sự (MACV) tại Sài Gòn do Tướng Paul D. Harkins chỉ huy, trực tiếp nắm quyền điều hành chiến tranh. Song song, Ngô Đình Diệm ký nghị định ngày 3/2/1962 lập Ủy ban Liên bộ về Ấp chiến lược — nhốt nhân dân nông thôn vào các trại gồm cầm để cắt đứt mối liên hệ với cách mạng. Cùng lúc, Chiến dịch Ranch Hand bắt đầu từ tháng 1/1962, rải hàng triệu lít chất độc da cam hủy diệt mùa màng và rừng rậm, gây hậu quả thảm khốc cho môi trường và sức khỏe người dân nhiều thế hệ.",
    coords: A.saigon,
    regionIds: ["VN-SG"],
    zoomLevel: 7.2,
    image: "/images/timelines/Leo thang phản du kích.jpg",
    tags: ["macv", "ấp chiến lược", "ranch hand", "phản du kích", "kennedy"],
    stats: {
      location: "Sài Gòn (Bộ TL MACV) / nông thôn miền Nam",
      impact: "Mở rộng cơ cấu chỉ huy Mỹ, tăng cường bình định và phun thuốc diệt cỏ",
      significance: "Rất cao",
    },
    dateRange: ["1962-01-01", "1962-08-31"],
  },

  /* ─── 11. 1963 — Trận Ấp Bắc ────────────────────────────── */
  {
    id: 11,
    year: "1963",
    title: "Trận Ấp Bắc phơi bày yếu kém chiến thuật QLVNCH",
    badge: "TRẬN ĐÁNH",
    category: "military",
    shortDesc:
      "Ngày 2/1/1963, quân giải phóng miền Nam giành chiến thắng vang dội tại Ấp Bắc (Định Tường), đánh bại lực lượng VNCH dù địch có ưu thế quân số, trực thăng và xe bọc thép Mỹ trang bị.",
    longDesc:
      "Trận Ấp Bắc ngày 2/1/1963 tại tỉnh Định Tường (nay thuộc Tiền Giang), cách Sài Gòn 55 km về phía tây nam, là chiến thắng xuất sắc của quân giải phóng. Chỉ với một tiểu đoàn, các chiến sĩ đã đánh bại lực lượng VNCH đông gấp nhiều lần được trang bị trực thăng, xe bọc thép và cố vấn Mỹ. Trận đánh làm chấn động dư luận Mỹ, phơi bày sự bất lực của quân đội Sài Gòn và chứng minh rằng dù được Mỹ trang bị hiện đại, VNCH không thể dập tắt được ý chí đấu tranh của nhân dân miền Nam.",
    coords: A.apbac,
    regionIds: ["VN-SG"],
    zoomLevel: 8.0,
    image: "/images/timelines/Trận Ấp Bắc phơi bày yếu kém chiến thuật QLVNCH.jpg",
    tags: ["ấp bắc", "đồng bằng cửu long", "QLVNCH", "việt cộng"],
    stats: {
      location: "Ấp Bắc, Định Tường (Tiền Giang), ĐBSCL",
      impact: "Làm giảm niềm tin vào hiệu quả QLVNCH; ảnh hưởng đánh giá của Mỹ",
      significance: "Cao",
    },
    dateRange: ["1963-01-02", "1963-01-02"],
    influencePaths: [
      { coordinates: [A.apbac, A.saigon], dashed: true },
    ],
  },

  /* ─── 12. 1963 — Thích Quảng Đức ────────────────────────── */
  {
    id: 12,
    year: "1963",
    title: "Thích Quảng Đức tự thiêu — khủng hoảng Phật giáo",
    badge: "PHẢN ĐỐI",
    category: "social",
    shortDesc:
      "Ngày 11/6/1963, Hòa thượng Thích Quảng Đức tự thiêu giữa Sài Gòn để phản đối chính sách đàn áp tôn giáo của chế độ Diệm — ngọn lửa chính nghĩa làm rung chuyển lương tâm nhân loại và phơi bày bộ mặt độc tài của chính quyền tay sai.",
    longDesc:
      "Giữa cuộc khủng hoảng Phật giáo khi chính quyền Ngô Đình Diệm đàn áp dã man các Phật tử, ngày 11/6/1963, Hòa thượng Thích Quảng Đức đã tự thiêu tại một giao lộ đông đúc ở Sài Gòn để thức tỉnh lương tri thế giới. Những bức ảnh của Malcolm Browne ghi lại hình ảnh ngọn lửa chính nghĩa lan truyền khắp thế giới, vạch trần bản chất độc tài, phản dân của chính quyền được Mỹ dựng lên. Sự kiện để lại dấu ấn sâu sắc trong lịch sử, góp phần làm suy sụp hệ thống chính trị của chế độ Diệm và dẫn tới cuộc đảo chính tháng 11/1963.",
    coords: A.saigon,
    regionIds: ["VN-SG"],
    zoomLevel: 7.5,
    image: "/images/timelines/Thích Quảng Đức tự thiêu — khủng hoảng Phật giáo.jpg",
    tags: ["khủng hoảng phật giáo", "tự thiêu", "thích quảng đức", "sài gòn"],
    stats: {
      location: "Sài Gòn, miền Nam Việt Nam",
      impact: "Quốc tế hóa khủng hoảng Phật giáo; xói mòn hỗ trợ cho chế độ Diệm",
      significance: "Rất cao",
    },
    dateRange: ["1963-06-11", "1963-06-11"],
  },

  /* ─── 13. 1963 — Đảo chính lật đổ Diệm ─────────────────── */
  {
    id: 13,
    year: "1963",
    title: "Đảo chính lật đổ Ngô Đình Diệm — Diệm và Nhu bị sát hại",
    badge: "ĐẢO CHÍNH",
    category: "political",
    shortDesc:
      "Ngày 1–2/11/1963, các tướng lĩnh Sài Gòn lật đổ Ngô Đình Diệm; Diệm và em trai bị sát hại. Chính quyền tay sai Mỹ lao vào khủng hoảng triền miên, phơi bày bản chất mục ruỗng của chế độ phản động.",
    longDesc:
      "Sau nhiều tháng khủng hoảng chính trị và phong trào phản đối mạnh mẽ của nhân dân miền Nam, các tướng lĩnh VNCH phát động đảo chính ngày 1/11/1963. Đến ngày 2/11, Ngô Đình Diệm và em trai Ngô Đình Nhu đã bị sát hại. Sự sụp đổ của chế độ Diệm — một chính quyền đã du nhập hàng tỷ đôla Mỹ — chứng minh rằng không có độc tài tay sai nào có thể đứng vững khi đi ngược lại ý nguyện của nhân dân. Sau đó, miền Nam lao vào chuỗi đảo chính liên tiếp, làm phức tạp thêm chiến lược của Mỹ và khẳng định sự bất lực của họ trong việc dựng lên một chính quyền vững chắc.",
    coords: A.saigon,
    regionIds: ["VN-SG"],
    zoomLevel: 7.5,
    image: "/images/timelines/Đảo chính lật đổ Ngô Đình Diệm — Diệm và Nhu bị sát hại.jpg",
    tags: ["diệm", "đảo chính", "1963", "khủng hoảng chính trị"],
    stats: {
      location: "Sài Gòn, miền Nam Việt Nam",
      impact: "Chấm dứt chế độ Diệm; mở ra bất ổn chính trị và đảo chính liên tiếp",
      significance: "Rất cao",
    },
    dateRange: ["1963-11-01", "1963-11-02"],
  },

  /* ─── 14. 1964 — Sự kiện Vịnh Bắc Bộ ───────────────────── */
  {
    id: 14,
    year: "1964",
    title: "Sự kiện Vịnh Bắc Bộ và Nghị quyết mở rộng quyền chiến tranh Mỹ",
    badge: "NGHỊ QUYẾT",
    category: "diplomatic",
    shortDesc:
      "Ngày 2–4/8/1964, Mỹ dựng lên \"Sự kiện Vịnh Bắc Bộ\" với báo cáo nguy tạo về cuộc tấn công ngày 4/8, làm cớ để Quốc hội Mỹ thông qua Nghị quyết Vịnh Bắc Bộ (7/8), trao quyền chiến tranh không giới hạn cho Tổng thống Johnson.",
    longDesc:
      "Sự kiện Vịnh Bắc Bộ (2–4/8/1964) là một trong những mưu đồ trắc trở nhất của đế quốc Mỹ. Ngày 2/8, tàu khu trục USS Maddox xâm phạm lãnh hải Việt Nam và bị tàu tuần tra hải quân Việt Nam đánh trả. Đến ngày 4/8, Mỹ dựng lên báo cáo giả về một cuộc tấn công thứ hai — sau này chính tài liệu hải quân Mỹ xác nhận là bao ngụy. Chính quyền Johnson lợi dụng sự kiện giả tạo này để thúc đẩy Quốc hội thông qua Nghị quyết Vịnh Bắc Bộ (7/8/1964; ký 10/8), trao quyền sử dụng vũ lực không giới hạn — mở đường cho cuộc chiến tranh xâm lược quy mô lớn.",
    coords: A.tonkin,
    regionIds: [],
    zoomLevel: 6.0,
    image: "/images/timelines/Sự kiện Vịnh Bắc Bộ và Nghị quyết mở rộng quyền chiến tranh Mỹ.jpg",
    tags: ["vịnh bắc bộ", "maddox", "nghị quyết", "leo thang mỹ"],
    stats: {
      location: "Vịnh Bắc Bộ (Vịnh Tonkin)",
      impact: "Cung cấp cơ sở pháp lý–chính trị cho leo thang lớn của Mỹ tại Việt Nam",
      significance: "Rất cao",
    },
    dateRange: ["1964-08-02", "1964-08-10"],
    influencePaths: [
      { coordinates: [A.tonkin, A.hanoi], dashed: true },
    ],
  },

  /* ─── 15. 1965 — Rolling Thunder & Đà Nẵng ──────────────── */
  {
    id: 15,
    year: "1965",
    title: "Rolling Thunder và Thủy quân lục chiến đổ bộ Đà Nẵng",
    badge: "CHIẾN ĐẤU MỸ",
    category: "military",
    shortDesc:
      "Cuối tháng 2 – đầu tháng 3/1965, Mỹ phát động chiến dịch ném bom Rolling Thunder hủy diệt miền Bắc và đổ quân Thủy quân lục chiến lên Đà Nẵng — chính thức biến cuộc chiến thành chiến tranh xâm lược trực tiếp của Mỹ.",
    longDesc:
      "Đầu năm 1965 đánh dấu giai đoạn đế quốc Mỹ lộ rõ bộ mặt xâm lược. Từ cuối tháng 2/1965, Chiến dịch Rolling Thunder bắt đầu trút hàng nghìn tấn bom xuống miền Bắc, hủy diệt cầu đường, nhà máy, trường học và bệnh viện. Ngày 8/3/1965, 3.500 lính Thủy quân lục chiến Mỹ đổ bộ lên bãi biển Đà Nẵng — đánh dấu sự chuyển đổi từ vai trò \"cố vấn\" sang chiến tranh xâm lược trực tiếp. Nhưng chính sự leo thang điên cuồng này đã thổi bùng ngọn lửa kháng chiến của toàn dân tộc, mở ra cuộc chiến tranh chống Mỹ cứu nước vĩ đại nhất trong lịch sử dân tộc.",
    coords: A.danang,
    regionIds: ["VN-DN"],
    zoomLevel: 7.0,
    image: "/images/timelines/Rolling Thunder và Thủy quân lục chiến đổ bộ Đà Nẵng.jpg",
    tags: ["rolling thunder", "đà nẵng", "thủy quân lục chiến", "leo thang 1965"],
    stats: {
      location: "Đà Nẵng, miền Nam Việt Nam",
      impact: "Khởi đầu ném bom bền vững Mỹ và triển khai lực lượng chiến đấu lớn",
      significance: "Rất cao",
    },
    dateRange: ["1965-02-24", "1965-03-08"],
    influencePaths: [
      { coordinates: [A.hanoi, A.hue, A.danang], dashed: false },
    ],
  },
];
