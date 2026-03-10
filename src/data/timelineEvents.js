export const timelineEvents = [
  {
    id: 1,
    year: "1945",
    title: "Tuyên ngôn Độc lập",
    shortDesc: "Ngày 2/9/1945, nước Việt Nam Dân chủ Cộng hòa được tuyên bố tại Hà Nội.",
    longDesc:
      "Sự kiện tại Quảng trường Ba Đình đánh dấu sự ra đời của một nhà nước độc lập mới, mở đầu cho giai đoạn kháng chiến và kiến tạo thể chế hiện đại.",
    coords: [105.8342, 21.0278],
    regionIds: ["VN-HN"],
    influencePaths: [
      [[105.8342, 21.0278], [106.6881, 20.8449]],
      [[105.8342, 21.0278], [106.5, 18.5], [108.2022, 16.0544]],
      [[105.8342, 21.0278], [106.0, 14.0], [106.6297, 10.8231]],
    ],
    image: "/historical/ViTuyen17.png",
    zoomLevel: 6.4,
    stats: {
      location: "Hà Nội",
      impact: "Khai sinh nhà nước cách mạng",
      significance: "Cao",
    },
  },
  {
    id: 2,
    year: "1946",
    title: "Toàn quốc kháng chiến",
    shortDesc: "Lời kêu gọi Toàn quốc kháng chiến được phát đi, mở đầu cuộc chiến chống thực dân trở lại.",
    longDesc:
      "Từ Hà Nội, kháng chiến lan rộng ra nhiều đô thị và nông thôn, định hình chiến lược trường kỳ, tự lực cánh sinh trong giai đoạn đầu.",
    coords: [105.8342, 21.0278],
    regionIds: ["VN-HN", "VN-HP"],
    influencePaths: [
      [[105.8342, 21.0278], [106.6881, 20.8449]],
      [[105.8342, 21.0278], [105.83, 20.5], [105.9, 19.8]],
    ],
    image: "/historical/ViTuyen17.png",
    zoomLevel: 6.6,
    stats: {
      location: "Hà Nội",
      impact: "Chuyển sang kháng chiến toàn diện",
      significance: "Cao",
    },
  },
  {
    id: 3,
    year: "1950",
    title: "Chiến dịch Biên giới",
    shortDesc: "Chiến dịch Biên giới 1950 phá thế bao vây, mở hành lang chiến lược ở Việt Bắc.",
    longDesc:
      "Thắng lợi ở Cao Bằng - Lạng Sơn giúp lực lượng kháng chiến mở rộng liên lạc quốc tế, nâng cao thế chủ động chiến trường.",
    coords: [106.257, 22.666],
    regionIds: ["VN-CB", "VN-LS"],
    influencePaths: [
      [[106.257, 22.666], [106.75, 21.85], [105.8342, 21.0278]],
      [[106.257, 22.666], [104.95, 21.6], [103.016, 21.386]],
    ],
    image: "/historical/ViTuyen17.png",
    zoomLevel: 7.2,
    stats: {
      location: "Cao Bằng",
      impact: "Mở thông tuyến chiến lược",
      significance: "Cao",
    },
  },
  {
    id: 4,
    year: "1954",
    title: "Chiến thắng Điện Biên Phủ",
    shortDesc: "Tập đoàn cứ điểm Điện Biên Phủ thất thủ, buộc Pháp ngồi vào bàn đàm phán.",
    longDesc:
      "Chiến dịch Điện Biên Phủ là bước ngoặt có ý nghĩa quốc tế, góp phần dẫn tới Hiệp định Geneva và thay đổi cục diện Đông Dương.",
    coords: [103.016, 21.386],
    regionIds: ["VN-DI"],
    influencePaths: [
      [[103.016, 21.386], [105.8342, 21.0278]],
      [[103.016, 21.386], [105.5, 18.5], [107.5909, 16.4637], [106.6297, 10.8231]],
    ],
    image: "/historical/ViTuyen17.png",
    zoomLevel: 7.1,
    stats: {
      location: "Điện Biên",
      impact: "Bước ngoặt quân sự - ngoại giao",
      significance: "Rất cao",
    },
  },
  {
    id: 5,
    year: "1960",
    title: "Phong trào Đồng Khởi",
    shortDesc: "Đồng Khởi ở Bến Tre tạo thế phát triển mới cho phong trào cách mạng miền Nam.",
    longDesc:
      "Phong trào từ Bến Tre lan ra nhiều tỉnh Nam Bộ, thúc đẩy chuyển biến tương quan lực lượng và phương thức đấu tranh ở miền Nam.",
    coords: [106.375, 10.243],
    regionIds: ["VN-BT", "VN-SG"],
    influencePaths: [
      [[106.375, 10.243], [106.6297, 10.8231], [107.13, 10.58]],
      [[106.375, 10.243], [105.97, 10.03], [105.75, 9.95]],
    ],
    image: "/historical/ViTuyen17.png",
    zoomLevel: 7.3,
    stats: {
      location: "Bến Tre",
      impact: "Mở rộng đấu tranh ở Nam Bộ",
      significance: "Cao",
    },
  },
  {
    id: 6,
    year: "1968",
    title: "Tổng tiến công và nổi dậy Tết Mậu Thân",
    shortDesc: "Đợt tiến công đồng loạt tại nhiều đô thị làm thay đổi nhận thức chiến tranh.",
    longDesc:
      "Từ Huế, Sài Gòn đến nhiều thành phố khác, Tết Mậu Thân tạo hiệu ứng chính trị - quân sự lớn trong và ngoài nước.",
    coords: [107.5909, 16.4637],
    regionIds: ["VN-TTH", "VN-SG", "VN-HN"],
    influencePaths: [
      [[107.5909, 16.4637], [108.2022, 16.0544], [106.6297, 10.8231]],
      [[107.5909, 16.4637], [105.8342, 21.0278]],
    ],
    image: "/historical/ViTuyen17.png",
    zoomLevel: 6.7,
    stats: {
      location: "Huế",
      impact: "Tác động chiến lược toàn miền",
      significance: "Rất cao",
    },
  },
  {
    id: 7,
    year: "1972",
    title: "Chiến dịch Trị - Thiên và Quảng Trị",
    shortDesc: "Mặt trận Quảng Trị trở thành điểm nóng quyết định trong giai đoạn đàm phán.",
    longDesc:
      "Các trận đánh ác liệt tại Quảng Trị tác động trực tiếp tới thế mặc cả trên bàn đàm phán Paris và cục diện quân sự miền Trung.",
    coords: [107.183, 16.75],
    regionIds: ["VN-QT", "VN-TTH"],
    influencePaths: [
      [[107.183, 16.75], [107.5909, 16.4637], [108.2022, 16.0544]],
      [[107.183, 16.75], [106.5, 18.5], [105.8342, 21.0278]],
    ],
    image: "/historical/ViTuyen17.png",
    zoomLevel: 7.0,
    stats: {
      location: "Quảng Trị",
      impact: "Tạo áp lực chiến lược",
      significance: "Cao",
    },
  },
  {
    id: 8,
    year: "1975",
    title: "Chiến dịch Hồ Chí Minh",
    shortDesc: "Giải phóng Sài Gòn, thống nhất đất nước vào ngày 30/4/1975.",
    longDesc:
      "Đòn tiến công chiến lược cuối cùng kết thúc chiến tranh, mở ra giai đoạn thống nhất lãnh thổ và tái thiết quốc gia.",
    coords: [106.6297, 10.8231],
    regionIds: ["VN-SG"],
    influencePaths: [
      [[106.6297, 10.8231], [108.2022, 16.0544]],
      [[106.6297, 10.8231], [107.5909, 16.4637], [105.8342, 21.0278]],
    ],
    image: "/historical/ViTuyen17.png",
    zoomLevel: 6.9,
    stats: {
      location: "Sài Gòn",
      impact: "Kết thúc chiến tranh, thống nhất",
      significance: "Rất cao",
    },
  },
];

