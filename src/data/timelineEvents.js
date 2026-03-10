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
      "Ngày 7/5/1954, quân đội Pháp thất bại tại Điện Biên Phủ sau cuộc bao vây kéo dài, kết thúc chiến tranh Đông Dương lần thứ nhất và mở đường cho Hiệp định Geneva.",
    longDesc:
      "Sự sụp đổ của cứ điểm Điện Biên Phủ ngày 7/5/1954 đánh dấu bước ngoặt quân sự và chính trị quyết định. Thất bại của Pháp làm suy yếu vị thế của họ tại Đông Dương và thúc đẩy tiến trình đàm phán dẫn tới Hiệp định Geneva tháng 7/1954, tạm thời chia cắt Việt Nam và định hình lại cuộc xung đột thành cuộc chiến tranh Việt Nam / chiến tranh chống Mỹ.",
    coords: A.dienbien,
    regionIds: ["VN-DI"],
    zoomLevel: 7.1,
    image: "/historical/1954_DienBienPhu.png",
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
      "Hiệp định Geneva (21/7/1954) chấm dứt chiến tranh Đông Dương, thiết lập giới tuyến quân sự tạm thời gần vĩ tuyến 17 và dự kiến tổ chức tổng tuyển cử tháng 7/1956.",
    longDesc:
      "Hiệp định Geneva ký ngày 21/7/1954 tạo ra thỏa thuận ngừng bắn, các vùng tập trung quân, và giới tuyến quân sự tạm thời gần vĩ tuyến 17 kèm khu phi quân sự (DMZ). Tuyên bố cuối cùng dự kiến tổng tuyển cử toàn quốc tháng 7/1956 dưới sự giám sát quốc tế để thống nhất đất nước. Trên thực tế, các điều khoản bầu cử không được thực hiện, và sự chia cắt quân sự tạm thời trở thành phân chia chính trị — một trong những nguyên nhân cấu trúc trung tâm của cuộc xung đột Mỹ–Việt Nam sau này.",
    coords: A.dmz,
    regionIds: ["VN-QT"],
    zoomLevel: 7.0,
    image: "/historical/1954_GenevaAccords.png",
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
      "Ngày 8/9/1954, tám quốc gia ký Hiệp ước phòng thủ tập thể Đông Nam Á tại Manila, tạo khuôn khổ SEATO — được Mỹ sử dụng để biện minh cho các cam kết khu vực liên quan đến Việt Nam.",
    longDesc:
      "Hiệp ước Manila ký ngày 8/9/1954 bởi Úc, Pháp, New Zealand, Pakistan, Philippines, Thái Lan, Anh và Hoa Kỳ, trở thành nền tảng của Tổ chức Hiệp ước Đông Nam Á (SEATO). Trong tư duy chiến lược của Mỹ, SEATO và các thỏa thuận nghị định thư liên quan tạo thành một phần kiến trúc an ninh Chiến tranh Lạnh tại Đông Nam Á và sau này xuất hiện trong các lập luận chính trị–pháp lý của Mỹ về sự can thiệp vào Việt Nam.",
    coords: A.saigon,
    regionIds: ["VN-SG"],
    zoomLevel: 6.5,
    image: "/historical/1954_SEATO_ManilaPact.png",
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
      "Sau Hiệp định Geneva, Hải quân Mỹ hỗ trợ cuộc di cư quy mô lớn từ miền Bắc vào miền Nam Việt Nam (8/1954–5/1955), vận chuyển người tị nạn, quân đội và trang thiết bị.",
    longDesc:
      "Sau khi Việt Nam tạm thời bị chia cắt, khuôn khổ Geneva cho phép một khoảng thời gian di chuyển giữa hai miền trước khi biên giới đóng lại. Trong khoảng thời gian này, Hải quân Mỹ hỗ trợ cuộc di cư quy mô lớn (8/1954–5/1955), vận chuyển người tị nạn, lực lượng quân sự và trang thiết bị từ các cảng phía Bắc như Hải Phòng vào Nam (bao gồm Sài Gòn). Cuộc di chuyển này đã thay đổi nhân khẩu và chính trị miền Nam Việt Nam.",
    coords: A.haiphong,
    regionIds: ["VN-HP", "VN-SG"],
    zoomLevel: 6.4,
    image: "/historical/1954_PassageToFreedom.png",
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
      "Ngày 23/10/1955, miền Nam tổ chức trưng cầu dân ý phế truất cựu hoàng Bảo Đại; ngày 26/10, Ngô Đình Diệm tuyên bố thành lập nước Việt Nam Cộng hòa.",
    longDesc:
      "Cuộc trưng cầu dân ý Diệm–Bảo Đại ngày 23/10/1955 là trung tâm của quá trình củng cố chính trị miền Nam. Kết quả chính thức được công bố ngày 26/10/1955 tại Tòa Đô Chính Sài Gòn, khi Ngô Đình Diệm công bố kết quả và tuyên bố quốc gia là nước cộng hòa, khai sinh Việt Nam Cộng hòa. Sự chuyển đổi chính trị này định hình cuộc tranh giành tính chính danh và ảnh hưởng đến quỹ đạo xung đột với phong trào cách mạng được hậu thuẫn từ miền Bắc.",
    coords: A.saigon,
    regionIds: ["VN-SG"],
    zoomLevel: 7.3,
    image: "/historical/1955_Referendum_RVN.png",
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
      "Tuyên bố cuối cùng Geneva dự kiến tổng tuyển cử toàn quốc tháng 7/1956 dưới sự giám sát quốc tế, nhưng cuộc bầu cử đã không được thực hiện — làm sâu thêm chia rẽ Bắc–Nam.",
    longDesc:
      "Tuyên bố cuối cùng Geneva quy định tổng tuyển cử sẽ diễn ra vào tháng 7/1956 dưới sự giám sát quốc tế để thống nhất đất nước. Cuộc bầu cử đã không được thực hiện; lãnh đạo miền Nam từ chối thực hiện các điều khoản bầu cử Geneva, và chính sách Chiến tranh Lạnh của Mỹ duy trì sự chia cắt Bắc–Nam. Việc không tổ chức bầu cử đã cố định hóa sự phân chia và tăng cường cuộc đấu tranh chính danh, nuôi dưỡng sự leo thang của chiến tranh du kích và phản du kích.",
    coords: A.dmz,
    regionIds: ["VN-QT"],
    zoomLevel: 7.0,
    image: "/historical/1956_Elections_Not_Held.png",
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
      "Tháng 3/1956, đơn vị đồn trú VNCH thay thế lực lượng Pháp tại một số đảo thuộc quần đảo Hoàng Sa, phản ánh tầm quan trọng chiến lược và chủ quyền của quần đảo.",
    longDesc:
      "Các báo cáo đương thời năm 1956 ghi nhận các tuyên bố chủ quyền chồng lấn trên Biển Đông. Nguồn tin thời kỳ đó cho biết Hoàng Sa có \"một đơn vị đồn trú nhỏ của VNCH\" đã \"thay thế Pháp vào tháng 3/1956\" sau khi Lực lượng Viễn chinh Pháp rút khỏi miền Nam Việt Nam. Dù không phải chiến trường trung tâm giai đoạn 1954–1965, sự kiện có ý nghĩa trong việc lập bản đồ môi trường chiến lược và các động lực khủng hoảng sau này về biên giới biển Việt Nam.",
    coords: A.hoangsa,
    regionIds: ["VN-DN"],
    zoomLevel: 5.6,
    image: "/historical/1956_HoangSa_1956.png",
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
      "Ngày 19/5/1959, miền Bắc Việt Nam thành lập Đoàn 559 để tổ chức hậu cần và mở hành lang Trường Sơn, cho phép vận chuyển người và vật tư vào chiến trường miền Nam.",
    longDesc:
      "Khi lãnh đạo miền Bắc chuẩn bị cho cuộc đấu tranh trường kỳ ở miền Nam, hậu cần trở thành yếu tố chiến lược. Ngày 19/5/1959, đơn vị công tác đặc biệt — Đoàn 559 — được giao nhiệm vụ mở hành lang Trường Sơn và tổ chức hỗ trợ cho các chiến trường phía Nam. Quyết định thể chế này đánh dấu sự khởi đầu của hệ thống tiếp vận sau này được quốc tế biết đến là Đường mòn Hồ Chí Minh — yếu tố quyết định cho việc vận chuyển nhân lực và vật tư bất chấp địa hình và các đợt không kích ngăn chặn dữ dội sau này.",
    coords: A.hanoi,
    regionIds: ["VN-HN"],
    zoomLevel: 6.6,
    image: "/historical/1959_Group559_TruongSon.png",
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
      "Ngày 20/12/1960, Mặt trận Dân tộc Giải phóng (MTDTGP) được thành lập tại miền Nam Việt Nam để tổ chức lực lượng chống chính quyền Sài Gòn và theo đuổi thống nhất.",
    longDesc:
      "Ngày 20/12/1960, Mặt trận Dân tộc Giải phóng được thành lập như một tổ chức chính trị bao trùm để tổ chức kháng chiến tại miền Nam và theo đuổi thống nhất. Nhiều tài liệu xác định địa điểm thành lập tại Tân Lập, tỉnh Tây Ninh. Sự ra đời của MTDTGP tạo cấu trúc chính trị cho cuộc khởi nghĩa (thường gọi là Việt Cộng) và trở thành động lực chính của xung đột đầu những năm 1960.",
    coords: A.tayninh,
    regionIds: ["VN-SG"],
    zoomLevel: 7.0,
    image: "/historical/1960_NLF_Founding.png",
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
      "Đầu 1962, Mỹ tái tổ chức bộ chỉ huy thành MACV (8/2), VNCH chính thức hóa chương trình ấp chiến lược (3/2), và Chiến dịch Ranch Hand bắt đầu (tháng 1) — leo thang phản du kích lớn.",
    longDesc:
      "Đầu năm 1962 đánh dấu bước leo thang lớn trong phản du kích của Mỹ và VNCH. Chỉ thị của Mỹ thành lập Bộ Tư lệnh Viện trợ Quân sự Mỹ tại Việt Nam (MACV) kể từ ngày 8/2/1962, đặt trụ sở tại Sài Gòn với Tướng Paul D. Harkins chỉ huy. Song song, Tổng thống Ngô Đình Diệm ký nghị định ngày 3/2/1962 thành lập Ủy ban Liên bộ về Ấp chiến lược. Cùng lúc, Chiến dịch Ranch Hand — chương trình phun chất diệt cỏ của Không quân Mỹ — bắt đầu vào tháng 1/1962. Các biện pháp này thể hiện bước chuyển sang kiểm soát tổ chức sâu hơn của Mỹ và các phương pháp an ninh dân cư cùng công nghệ quyết liệt hơn trong chiến tranh nông thôn.",
    coords: A.saigon,
    regionIds: ["VN-SG"],
    zoomLevel: 7.2,
    image: "/historical/1962_MACV_StrategicHamlets_RanchHand.png",
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
      "Ngày 2/1/1963, lực lượng VNCH giao tranh với Việt Cộng tại Ấp Bắc (Định Tường), trận đánh trở thành phép thử quan trọng cho chiến thuật phản du kích được Mỹ hậu thuẫn.",
    longDesc:
      "Trận Ấp Bắc (2/1/1963) diễn ra tại tỉnh Định Tường (nay thuộc Tiền Giang), cách Sài Gòn khoảng 55 km về phía tây nam trong vùng Đồng bằng sông Cửu Long. Lực lượng VNCH giao chiến với một tiểu đoàn Việt Cộng dù có ưu thế quân số và hỏa lực, bao gồm trực thăng và xe bọc thép. Trận đánh mang ý nghĩa biểu tượng vì phơi bày các vấn đề chiến thuật và tổ chức của QLVNCH, nuôi dưỡng tranh luận tại Washington về hướng đi của cuộc chiến.",
    coords: A.apbac,
    regionIds: ["VN-SG"],
    zoomLevel: 8.0,
    image: "/historical/1963_ApBac.png",
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
      "Ngày 11/6/1963, hòa thượng Thích Quảng Đức tự thiêu tại Sài Gòn để phản đối phân biệt tôn giáo, tạo ra hình ảnh biểu tượng làm tăng áp lực chính trị lên chính quyền Diệm.",
    longDesc:
      "Hành động tự thiêu của Thích Quảng Đức ngày 11/6/1963 diễn ra tại một giao lộ đông đúc ở Sài Gòn giữa cuộc khủng hoảng Phật giáo, khi các Phật tử phản đối phân biệt và đàn áp dưới chế độ Diệm. Những bức ảnh của Malcolm Browne lan truyền khắp thế giới và trở thành biểu tượng của cuộc khủng hoảng chính danh mà chính quyền Sài Gòn và những người ủng hộ Mỹ phải đối mặt. Sự kiện góp phần vào tình trạng bất ổn ngày càng tăng, đỉnh điểm là cuộc đảo chính tháng 11/1963.",
    coords: A.saigon,
    regionIds: ["VN-SG"],
    zoomLevel: 7.5,
    image: "/historical/1963_QuangDuc.png",
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
      "Ngày 1–2/11/1963, các tướng lĩnh VNCH lật đổ Tổng thống Ngô Đình Diệm; Diệm và em trai Ngô Đình Nhu bị sát hại, mở ra thời kỳ bất ổn chính trị.",
    longDesc:
      "Sau nhiều tháng biến động chính trị và cuộc khủng hoảng Phật giáo, các sĩ quan quân đội VNCH phát động đảo chính ngày 1/11/1963. Đến ngày 2/11, Tổng thống Ngô Đình Diệm và em trai Ngô Đình Nhu đã thiệt mạng. Cuộc đảo chính chấm dứt chế độ Diệm nhưng mở ra giai đoạn thay đổi chính phủ nhanh chóng, làm phức tạp nỗ lực chiến tranh của VNCH và chiến lược của Mỹ.",
    coords: A.saigon,
    regionIds: ["VN-SG"],
    zoomLevel: 7.5,
    image: "/historical/1963_Coup_Diem.png",
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
      "Giữa ngày 2–4/8/1964, hải quân Mỹ và Bắc Việt đụng độ tại Vịnh Bắc Bộ; sau báo cáo về cuộc tấn công thứ hai (sau đó xác định là sai), Quốc hội thông qua Nghị quyết Vịnh Bắc Bộ ngày 7/8.",
    longDesc:
      "Các sự kiện Vịnh Bắc Bộ diễn ra từ 2–4/8/1964. Ngày 2/8, tàu tuần tra Bắc Việt tấn công tàu khu trục USS Maddox; báo cáo về cuộc tấn công thứ hai ngày 4/8 sau đó được đánh giá là sai trong các tài liệu lịch sử hải quân Mỹ. Hậu quả chính trị là tức thì: chính quyền Johnson tìm kiếm và có được Nghị quyết Vịnh Bắc Bộ (thông qua 7/8/1964; ký 10/8), một sự ủy quyền của Quốc hội mở rộng đáng kể quyền sử dụng vũ lực của tổng thống tại Đông Nam Á.",
    coords: A.tonkin,
    regionIds: [],
    zoomLevel: 6.0,
    image: "/historical/1964_Tonkin_Gulf.png",
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
      "Cuối tháng 2 – đầu tháng 3/1965, Mỹ bắt đầu ném bom bền vững miền Bắc trong Chiến dịch Rolling Thunder và triển khai Thủy quân lục chiến đến Đà Nẵng, đánh dấu chuyển đổi từ cố vấn sang chiến đấu trực tiếp.",
    longDesc:
      "Đầu năm 1965 đánh dấu bước leo thang quyết định của Mỹ. Các nhiệm vụ Rolling Thunder bắt đầu ngày 2/3/1965 theo tài liệu lịch sử hải quân, trong khi tài liệu Không quân Mỹ mô tả chiến dịch bắt đầu cuối tháng 2/1965. Song song, lịch sử Thủy quân lục chiến ghi nhận lính thủy đánh bộ đổ bộ căn cứ không quân Đà Nẵng ngày 8/3/1965. Tổng hợp lại, những diễn biến này báo hiệu chuyển đổi từ hỗ trợ cố vấn chủ yếu sang ném bom chiến lược bền vững và triển khai các đơn vị chiến đấu lớn của Mỹ, thay đổi quy mô và tính chất cuộc chiến.",
    coords: A.danang,
    regionIds: ["VN-DN"],
    zoomLevel: 7.0,
    image: "/historical/1965_RollingThunder_DaNang.png",
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
