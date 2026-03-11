import { motion } from "framer-motion";
import RevealSection from "../../components/layout/RevealSection";
import Button from "../../components/ui/Button";
import { ArrowDown, ArrowRight, Flag, Crown, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const R = RevealSection.Item;

const genevaTableData = [
  {
    provision: "Ngừng bắn tạm thời, tái tập kết quân sự",
    reality: "Hòa bình tạm thời nhưng ngay lập tức bị vi phạm bởi các hoạt động ngầm",
    consequence: "Tạo ra \"vùng xám\" giữa hòa bình và chiến tranh bí mật",
  },
  {
    provision: "Vĩ tuyến 17 là ranh giới quân sự tạm thời, không phải biên giới quốc gia",
    reality: "Bị cố tình biến thành biên giới vĩnh viễn với hàng rào phòng thủ dày đặc",
    consequence: "Hình thành hai khối tư tưởng đối địch nhau",
  },
  {
    provision: "Tổng tuyển cử thống nhất năm 1956",
    reality: "Bị Mỹ và chính quyền Diệm cố tình ngăn chặn",
    consequence: "Vi phạm trắng trợn luật pháp quốc tế, đẩy đất nước vào 20 năm chiến tranh",
  },
  {
    provision: "Cấm đưa quân đội và cố vấn quân sự nước ngoài vào",
    reality: "Bị vi phạm nghiêm trọng bởi sự hiện diện của MAAG, CIA và hàng trăm nghìn lính Mỹ",
    consequence: "Biến Việt Nam thành chiến trường của Chiến tranh Lạnh",
  },
];

const timelineData = [
  { year: "1954", event: "Chiến thắng Điện Biên Phủ, Ký kết Hiệp định Geneva", detail: "Việt Nam tạm thời phân chia tại vĩ tuyến 17. Pháp rút quân khỏi Đông Dương." },
  { year: "1955", event: "Trưng cầu dân ý gian lận, thành lập VNCH", detail: "Ngô Đình Diệm tuyên bố nhận được 98% phiếu bầu, bắt đầu đàn áp các lực lượng chính trị đối lập." },
  { year: "1956", event: "Tổng tuyển cử thống nhất bị ngăn chặn hoàn toàn", detail: "Vi phạm trực tiếp Hiệp định Geneva. Con đường thống nhất hòa bình bị bịt kín." },
  { year: "1957–58", event: "Chiến dịch \"Tố Cộng, Diệt Cộng\" leo thang", detail: "Hàng chục nghìn người bị bắt, giết hoặc tù đày. Luật 10/59 thiết lập tòa án quân sự đặc biệt." },
  { year: "1959", event: "Nghị quyết 15: Bước ngoặt lịch sử", detail: "Đảng chính thức cho phép đấu tranh vũ trang ở miền Nam, khi tất cả con đường hòa bình đã bị bịt kín." },
  { year: "1959", event: "Thành lập Đoàn 559, khai thông đường Hồ Chí Minh", detail: "Mạng lưới hậu cần khổng lồ chạy xuyên qua rừng núi Lào và Campuchia, minh chứng cho tầm nhìn chiến lược của Đảng." },
  { year: "1960", event: "MTDTGP miền Nam Việt Nam ra đời", detail: "Đại hội III của Đảng tái khẳng định mục tiêu thống nhất. Mặt trận Dân tộc Giải phóng tập hợp mọi lực lượng yêu nước." },
  { year: "1961–63", event: "Mỹ triển khai \"Chiến tranh Đặc biệt\"", detail: "Chương trình Ấp Chiến lược thất bại toàn diện. Khủng hoảng Phật giáo 1963, đảo chính lật đổ Diệm." },
  { year: "1964", event: "Sự kiện Vịnh Bắc Bộ", detail: "Sự kiện được Mỹ dàn dựng, Quốc hội Mỹ thông qua Nghị quyết mở đường cho leo thang chiến tranh." },
  { year: "1965", event: "Quân chiến đấu Mỹ đổ bộ vào Đà Nẵng", detail: "Chiến tranh bước sang giai đoạn mới. Kháng chiến chống Mỹ cứu nước ở chiều sâu và quy mô toàn quốc." },
];

const comparisonData = [
  ["Hệ thống chính trị", "Nhà nước xã hội chủ nghĩa dưới sự lãnh đạo của Đảng Lao động", "Nền cộng hòa tập quyền, phụ thuộc viện trợ Mỹ"],
  ["Tính chính danh", "Kế thừa Cách mạng Tháng Tám 1945, chiến thắng Điện Biên Phủ", "Trưng cầu dân ý gian lận 1955, dựa vào hỗ trợ nước ngoài"],
  ["Cơ sở quần chúng", "Liên minh công - nông - trí thức, cải cách ruộng đất", "Thiểu số Công giáo được ưu ái, Phật tử bị phân biệt đối xử"],
  ["Ngoại giao", "Liên Xô, Trung Quốc (điều hướng khéo léo)", "Hoàn toàn phụ thuộc Mỹ về tài chính, quân sự, chiến lược"],
  ["Thách thức nội bộ", "Sửa sai Cải cách ruộng đất, cân bằng Xô – Trung", "Mâu thuẫn giáo phái, Khủng hoảng Phật giáo, đảo chính liên miên"],
  ["Lãnh đạo", "Hồ Chí Minh, Lê Duẩn, Phạm Văn Đồng", "Ngô Đình Diệm (đến 1963), sau đó khủng hoảng lãnh đạo"],
];

const HistoricalPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-bone scroll-container-fluid">
      {/* ═══════════ HERO ═══════════ */}
      <RevealSection className="border-b-2 border-charcoal/15">
        <div className="flex flex-col items-center text-center relative z-10">
          <R>
            <span className="brutal-badge bg-olive! mb-6">
              Trang 1 — Bối cảnh Lịch sử
            </span>
          </R>
          <R>
            <h1 className="font-display font-black text-fluid-hero uppercase text-ink leading-[1.05] tracking-tight mb-2">
              BỐI CẢNH LỊCH SỬ
            </h1>
          </R>
          <R>
            <h1 className="font-display font-black text-fluid-hero uppercase text-crimson leading-[1.05] tracking-tight mb-4">
              1954–1965
            </h1>
          </R>
          <R>
            <p className="font-body text-xl text-graphite mt-4 max-w-2xl mx-auto">
              Từ Hiệp Định Geneva Đến Ngưỡng Cửa Chiến Tranh Toàn Diện
            </p>
          </R>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-14 text-charcoal/30"
          >
            <ArrowDown size={28} />
          </motion.div>
        </div>
      </RevealSection>

      {/* ═══════════ INTRO CONTEXT ═══════════ */}
      <RevealSection dark fullHeight={false}>
        <div className="max-w-3xl mx-auto text-center py-6">
          <R>
            <p className="font-body text-2xl text-bone/75 leading-relaxed">
              Để hiểu bản chất thật sự của cuộc chiến tranh ở Việt Nam giai đoạn
              1954–1965, ta phải bắt đầu từ nền tảng: những điều kiện lịch sử cụ
              thể đã tạo ra cuộc chiến đó là gì? Ai đã hành động như thế nào, và
              vì lý do gì?
            </p>
          </R>
        </div>
      </RevealSection>

      {/* ═══════════ PHẦN 1: HIỆP ĐỊNH GENEVA ═══════════ */}
      <RevealSection fullHeight={false}>
        <div className="max-w-5xl mx-auto">
          <R>
            <div className="flex items-center gap-4 mb-8">
              <span className="brutal-badge">PHẦN 1</span>
              <h2 className="font-display text-fluid-5xl font-black text-ink uppercase leading-tight">
                Hiệp Định Geneva 1954
              </h2>
            </div>
          </R>

          <R>
            <div className="relative border-2 border-charcoal/15 bg-paper p-8 md:p-10">
              <div className="absolute right-[-50%] top-[10%] w-[80%] opacity-15 pointer-events-none select-none z-0">
                <div
                  className="w-full h-full scale-[2]"
                  style={{
                    maskImage:
                      "radial-gradient(ellipse at center, black 20%, transparent 60%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at center, black 20%, transparent 60%)",
                  }}
                >
                  <img
                    src="/historical/ViTuyen17.png"
                    alt=""
                    className="w-full h-auto object-cover grayscale"
                  />
                </div>
              </div>

              <div className="relative z-10 space-y-5 text-lg text-ink leading-relaxed max-w-3xl">
                <p>
                  Mùa xuân năm 1954, sau thất bại thảm hại tại lòng chảo Điện
                  Biên Phủ, quân đội viễn chinh Pháp buộc phải ngồi vào bàn đàm
                  phán tại Geneva. Hiệp định được ký kết vào tháng 7 năm 1954 là
                  kết quả của những thỏa hiệp chiến lược đầy phức tạp.
                </p>
                <p className="font-semibold border-l-4 border-crimson pl-6">
                  Điểm then chốt: Hiệp định Geneva không tạo ra hai quốc gia
                  Việt Nam. Vĩ tuyến 17 chỉ là ranh giới quân sự tạm thời. Tổng
                  tuyển cử tự do phải được tổ chức vào tháng 7 năm 1956 trên
                  toàn lãnh thổ Việt Nam.
                </p>
                <p>
                  Lãnh đạo Hà Nội chấp nhận điều khoản này với sự tự tin có cơ
                  sở: mọi đánh giá tình báo, kể cả của chính phủ Mỹ, đều thừa
                  nhận rằng Chủ tịch Hồ Chí Minh sẽ giành chiến thắng áp đảo
                  trong bất kỳ cuộc bầu cử tự do nào. Nhưng cuộc bầu cử đó đã
                  không bao giờ được tổ chức.
                </p>
              </div>
            </div>
          </R>

          {/* Geneva Table */}
          <R className="mt-8">
            <div className="overflow-x-auto border-2 border-charcoal/20">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-olive text-bone font-display uppercase tracking-wider">
                    <th className="p-4 text-left border-r border-bone/20">
                      Điều khoản Geneva
                    </th>
                    <th className="p-4 text-left border-r border-bone/20">
                      Thực tế lịch sử
                    </th>
                    <th className="p-4 text-left">Hệ quả</th>
                  </tr>
                </thead>
                <tbody className="font-body text-ink">
                  {genevaTableData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-t border-charcoal/15 ${idx % 2 === 0 ? "bg-bone" : "bg-paper"}`}
                    >
                      <td className="p-4 border-r border-charcoal/10 font-semibold">
                        {row.provision}
                      </td>
                      <td className="p-4 border-r border-charcoal/10">
                        {row.reality}
                      </td>
                      <td className="p-4 font-mono text-sm font-semibold text-ember">
                        {row.consequence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </R>

          <R className="mt-6">
            <div className="bg-crimson/8 border-l-4 border-crimson p-5 max-w-3xl">
              <p className="font-body text-lg text-ink font-semibold italic">
                Sự phá vỡ hoàn toàn các điều khoản Geneva là nguồn gốc trực tiếp
                dẫn đến xung đột vũ trang. Đây không phải là một cuộc nội chiến
                tự nhiên nảy sinh, đây là hậu quả của một âm mưu có tính toán
                nhằm chia cắt vĩnh viễn Việt Nam.
              </p>
            </div>
          </R>
        </div>
      </RevealSection>

      {/* ═══════════ PHẦN 2 & 3: HAI NHÀ NƯỚC — A: Miền Bắc (left), B: Miền Nam (right) ═══════════ */}
      <RevealSection dark fullHeight={false}>
        <div className="max-w-6xl mx-auto">
          <R className="text-center mb-12">
            <span className="brutal-badge bg-bone! text-ink! mb-4">
              PHẦN 2 & 3
            </span>
            <h2 className="font-display text-fluid-6xl font-black uppercase mt-4 mb-4 text-bone">
              Hai Nhà Nước, Hai Thể Chế
            </h2>
            <p className="font-body text-xl text-bone/70 max-w-3xl mx-auto">
              Trái ngược hoàn toàn về nền tảng chính trị và tính chính danh lịch
              sử.
            </p>
          </R>

          <R>
            <div className="grid md:grid-cols-2 gap-6">
              {/* A: MIỀN BẮC (favored, left) */}
              <div className="bg-charcoal border-l-4 border-crimson p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-crimson text-bone flex items-center justify-center">
                    <Flag size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-bone uppercase">
                      Miền Bắc
                    </h3>
                    <span className="font-mono text-xs text-bone/60 uppercase tracking-wider">
                      Việt Nam Dân Chủ Cộng Hòa
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-bone/85 text-base leading-relaxed">
                  <p>
                    Dưới sự lãnh đạo của Đảng Lao động Việt Nam và Chủ tịch Hồ
                    Chí Minh, VNDCCH sở hữu điều mà VNCH không bao giờ có được:{" "}
                    <strong className="text-bone">
                      tính chính danh lịch sử thực sự
                    </strong>
                    . Đảng gắn liền với Cách mạng Tháng Tám 1945, cuộc kháng
                    chiến 9 năm chống Pháp, và chiến thắng Điện Biên Phủ chấn
                    động địa cầu.
                  </p>
                  <p>
                    Cải cách ruộng đất (1953–1956) xóa bỏ giai cấp địa chủ phong
                    kiến, phân phối lại đất đai cho người lao động. Dù có những
                    sai lầm được Đảng thẳng thắn nhìn nhận và kịp thời sửa chữa,
                    cải cách về cơ bản xây dựng được nền tảng ủng hộ rộng lớn
                    trong tầng lớp nông dân.
                  </p>
                  <p>
                    Về ngoại giao, VNDCCH điều hướng khéo léo giữa Liên Xô và
                    Trung Quốc để đảm bảo nguồn viện trợ vật chất và ngoại giao
                    cần thiết.
                  </p>
                  <p className="text-sm text-bone/60 border-t border-bone/20 pt-4 mt-4 font-mono font-semibold italic">
                    &ldquo;Yêu nước là xây dựng chủ nghĩa xã hội; xây dựng chủ
                    nghĩa xã hội là yêu nước.&rdquo; — Phạm Văn Đồng
                  </p>
                </div>
              </div>

              {/* B: MIỀN NAM (right) */}
              <div className="bg-ink/60 border-l-4 border-graphite p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-graphite text-bone/70 flex items-center justify-center">
                    <Crown size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-bone/70 uppercase">
                      Miền Nam
                    </h3>
                    <span className="font-mono text-xs text-bone/40 uppercase tracking-wider">
                      Việt Nam Cộng Hòa
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-bone/65 text-base leading-relaxed">
                  <p>
                    VNCH được thành lập qua cuộc trưng cầu dân ý gian lận trắng
                    trợn (1955). Diệm tuyên bố nhận 98% phiếu bầu. Tại Sài Gòn,
                    ông ta thu 605.000 phiếu dù chỉ có 450.000 cử tri. Ngay cả
                    cố vấn Mỹ cũng đề nghị tỷ lệ &ldquo;hợp lý&rdquo; 60–70% để
                    tránh tai tiếng.
                  </p>
                  <p>
                    Em trai Ngô Đình Nhu nắm an ninh nội địa, thành lập Đảng Cần
                    Lao, một tổ chức bí mật thâm nhập mọi cấp bộ máy. Người Công
                    giáo (thiểu số) được ưu ái, trong khi Phật tử (70–80% dân
                    số) bị phân biệt đối xử có hệ thống.
                  </p>
                  <p>
                    Luật 10/59 thiết lập tòa án quân sự đặc biệt chỉ với hai mức
                    hình phạt: tử hình hoặc tù chung thân. Chương trình Ấp Chiến
                    lược cưỡng bức di dời hàng triệu nông dân. Không những thất
                    bại mà còn trở thành nguồn tuyển dụng cho lực lượng giải
                    phóng.
                  </p>
                  <p className="text-sm text-bone/40 border-t border-bone/15 pt-4 mt-4 font-mono font-semibold">
                    Đỉnh điểm: Hòa thượng Thích Quảng Đức tự thiêu (6/1963). Mỹ
                    bật đèn xanh cho đảo chính (11/1963). Sau đó VNCH rơi vào
                    vòng xoáy khủng hoảng lãnh đạo liên miên.
                  </p>
                </div>
              </div>
            </div>
          </R>

          {/* Comparison table — A (North) column before B (South) */}
          <R className="mt-10">
            <div className="overflow-x-auto border-2 border-bone/15">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-olive text-bone font-display uppercase tracking-wider">
                    <th className="p-4 text-left border-r border-bone/20">
                      Khía Cạnh
                    </th>
                    <th className="p-4 text-left border-r border-bone/20">
                      Miền Bắc (VNDCCH)
                    </th>
                    <th className="p-4 text-left">Miền Nam (VNCH)</th>
                  </tr>
                </thead>
                <tbody className="font-body text-ink">
                  {comparisonData.map(([dim, north, south], idx) => (
                    <tr
                      key={idx}
                      className={`border-t border-charcoal/15 ${idx % 2 === 0 ? "bg-bone" : "bg-paper"}`}
                    >
                      <td className="p-4 font-semibold border-r border-charcoal/10">
                        {dim}
                      </td>
                      <td className="p-4 border-r border-charcoal/10">
                        {north}
                      </td>
                      <td className="p-4 text-graphite">{south}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </R>
        </div>
      </RevealSection>

      {/* ═══════════ PHẦN 4: ĐƯỜNG LỐI CÁCH MẠNG ═══════════ */}
      <RevealSection fullHeight={false}>
        <div className="max-w-5xl mx-auto">
          <R>
            <span className="brutal-badge mb-4">PHẦN 4</span>
            <h2 className="font-display text-fluid-5xl font-black text-ink uppercase leading-none mt-2 mb-4">
              Đường Lối Cách Mạng Của Đảng Ở Miền Nam
            </h2>
            <p className="font-body text-xl text-graphite mb-10 max-w-3xl">
              Từ đấu tranh chính trị đến đấu tranh vũ trang. Đây là một tiến
              trình tất yếu khi mọi con đường hòa bình đã bị bịt kín bởi bạo lực
              của kẻ thù.
            </p>
          </R>

          <R>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
              <div className="border-2 border-charcoal/15 bg-paper p-8">
                <h3 className="font-display text-xl font-bold text-ink uppercase mb-4 pb-3 border-b-2 border-charcoal/15">
                  1954–1959: Đấu tranh chính trị
                </h3>
                <div className="space-y-3 text-ink leading-relaxed">
                  <p>
                    Ngay sau Geneva, Đảng chủ trương kiên trì đấu tranh chính
                    trị và ngoại giao, chờ đợi Tổng tuyển cử. Các cơ sở cách
                    mạng được duy trì bí mật ở miền Nam. Nhưng dưới áp lực của
                    Luật 10/59, nhiều cán bộ cơ sở bị tiêu diệt, mạng lưới cách
                    mạng bị tổn thất nặng nề.
                  </p>
                  <p className="text-sm text-graphite border-t border-charcoal/10 pt-3 mt-3 font-mono font-semibold">
                    Áp lực đòi được quyền vũ trang tự vệ từ các cán bộ miền Nam
                    ngày càng mạnh và cấp bách.
                  </p>
                </div>
              </div>

              <div className="border-2 border-charcoal/15 bg-paper p-8">
                <h3 className="font-display text-xl font-bold text-ink uppercase mb-4 pb-3 border-b-2 border-charcoal/15">
                  Từ 1959: Chuyển sang đấu tranh vũ trang
                </h3>
                <div className="space-y-3 text-ink leading-relaxed">
                  <p>
                    <strong>Nghị quyết 15 (1/1959)</strong> chính thức cho phép
                    đấu tranh vũ trang. Con đường cách mạng miền Nam là dùng bạo
                    lực cách mạng đánh đổ chính quyền Diệm và đánh bại sự can
                    thiệp Mỹ. <strong>Đoàn 559 (5/1959)</strong> khai thông
                    đường Hồ Chí Minh.
                    <strong> MTDTGP (12/1960)</strong> tập hợp mọi lực lượng yêu
                    nước.
                  </p>
                  <p className="text-sm text-graphite border-t border-charcoal/10 pt-3 mt-3 font-mono font-semibold">
                    Đến cuối 1964, &ldquo;Chiến tranh Đặc biệt&rdquo; hoàn toàn
                    phá sản. Mỹ buộc phải đưa quân chiến đấu trực tiếp tham
                    chiến.
                  </p>
                </div>
              </div>
            </div>
          </R>

          <R className="mt-8">
            <div className="bg-crimson/8 border-l-4 border-crimson p-6 max-w-5xl flex items-start gap-3">
              <AlertTriangle size={22} className="text-crimson shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-lg font-bold text-ink uppercase mb-2">
                  1961–1965: &ldquo;Chiến tranh Đặc biệt&rdquo; Bản chất thực
                  dân mới
                </h3>
                <p className="font-body text-base text-ink leading-relaxed">
                  Mỹ triển khai chiến lược dùng quân đội VNCH (được trang bị vũ
                  khí và có cố vấn Mỹ kèm cặp) làm lực lượng chiến đấu trực
                  tiếp, biểu hiện điển hình của chủ nghĩa thực dân mới. Dưới sự
                  lãnh đạo của Lê Duẩn và Bộ Chính trị, cách mạng miền Nam liên
                  tục giành thắng lợi, khiến &ldquo;Chiến tranh Đặc biệt&rdquo;
                  hoàn toàn phá sản.
                </p>
              </div>
            </div>
          </R>
        </div>
      </RevealSection>

      {/* ═══════════ MỐC THỜI GIAN ═══════════ */}
      <RevealSection
        fullHeight={false}
        className="bg-sand border-y-2 border-charcoal/10"
      >
        <div className="max-w-4xl mx-auto">
          <R className="text-center mb-14">
            <h2 className="font-display text-fluid-6xl font-black uppercase text-ink">
              Mốc Thời Gian: 1954–1965
            </h2>
          </R>

          <div className="relative">
            <div className="absolute left-4.5 md:left-6 top-0 bottom-0 border-l-2 border-charcoal/30" />

            <div className="space-y-10">
              {timelineData.map((item, idx) => (
                <R key={idx}>
                  <div className="relative pl-14 md:pl-16">
                    <div className="absolute left-3 md:left-4.5 top-2 w-3.5 h-3.5 bg-crimson border-2 border-charcoal rounded-full z-10" />

                    <div className="inline-block font-display text-xl font-black text-ink bg-gold/20 border border-gold/40 px-3 py-0.5 mb-2">
                      {item.year}
                    </div>
                    <div className="font-display text-lg font-bold uppercase text-ink leading-tight mb-2">
                      {item.event}
                    </div>
                    <p className="font-body text-base text-graphite leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ═══════════ CTA ═══════════ */}
      <RevealSection className="bg-sand border-t-2 border-charcoal/10">
        <div className="max-w-2xl mx-auto text-center">
          <R>
            <div className="border-2 border-charcoal/15 bg-bone p-8 text-left space-y-4 text-lg text-ink leading-relaxed">
              <p>
                Bạn đã nắm vững nền tảng lịch sử cốt lõi cùng những dữ kiện then
                chốt về Hiệp định Geneva, sự thật về bản chất chế độ Ngô Đình
                Diệm, tính chính danh của Việt Nam Dân chủ Cộng hoà, và đường
                lối cách mạng sáng suốt của Đảng.
              </p>
              <p className="font-semibold">
                Bước tiếp theo: đối chiếu hai quan điểm học thuật &ldquo;kháng
                chiến chống Mỹ&rdquo; và &ldquo;nội chiến&rdquo; dựa trên hệ
                thống bằng chứng lịch sử và đi đến kết luận thuyết phục.
              </p>
            </div>
          </R>

          <R className="mt-12">
            <Button
              variant="danger"
              size="lg"
              onClick={() => navigate("/tranh-luan-ket-luan")}
              className="gap-3 text-lg px-10 py-5"
            >
              So Sánh Và Kết Luận <ArrowRight size={22} strokeWidth={2.5} />
            </Button>
          </R>
        </div>
      </RevealSection>
    </div>
  );
};

export default HistoricalPage;
