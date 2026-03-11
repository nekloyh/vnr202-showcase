import { motion } from "framer-motion";
import RevealSection from "../../components/layout/RevealSection";
import { ArrowDown, CheckCircle, XCircle } from "lucide-react";

const R = RevealSection.Item;

/* A/B priority: "Kháng chiến" column comes BEFORE "Nội chiến" column */
const evidenceTableData = [
  {
    criteria: "Nguồn gốc sự phân chia",
    resistance: "Sự phân chia được áp đặt bởi các cường quốc tại Geneva, Mỹ ngăn chặn Tổng tuyển cử",
    civilWar: "Phân hóa tư tưởng giữa người Việt từ sau Thế chiến II",
    conclusion: "Sự phân chia được duy trì nhân tạo bởi can thiệp nước ngoài",
  },
  {
    criteria: "Tính chính danh của các bên",
    resistance: "VNDCCH kế thừa Cách mạng Tháng Tám 1945, VNCH qua bầu cử gian lận, phụ thuộc Mỹ",
    civilWar: "VNCH tuyên bố xây dựng nhà nước độc lập",
    conclusion: "VNDCCH có tính chính danh lịch sử, VNCH dựa vào gian lận và hỗ trợ nước ngoài",
  },
  {
    criteria: "Bản chất lực lượng tham chiến",
    resistance: "VNCH hoàn toàn được tài trợ và chỉ đạo bởi Mỹ, PLAF tiếp nối truyền thống chống thực dân",
    civilWar: "Người Việt chiến đấu ở cả hai phía",
    conclusion: "Cấu trúc quyền lực bất đối xứng, bị dẫn dắt bởi nước ngoài",
  },
  {
    criteria: "Tính chất chiến tranh",
    resistance: "\"Chiến tranh Đặc biệt\" của Mỹ với viện trợ tài chính, vũ khí, cố vấn quy mô khổng lồ",
    civilWar: "Xung đột nội bộ, chiến tranh giáo phái",
    conclusion: "Tính bền vững và quy mô bạo lực hoàn toàn phụ thuộc vào nguồn lực Mỹ",
  },
  {
    criteria: "Bản chất của MTDTGP",
    resistance: "Bắt nguồn từ sức phản kháng thực sự của nông dân trước đàn áp của Diệm",
    civilWar: "\"Lực lượng ủy nhiệm\" của Hà Nội",
    conclusion: "MTDTGP có cơ sở quần chúng tự nguyện, không phải áp đặt từ trên xuống",
  },
];

const ConclusionPage = () => {
  return (
    <div className="w-full bg-bone scroll-container-fluid font-body">
      {/* ═══════════ HERO ═══════════ */}
      <RevealSection className="border-b-2 border-charcoal/15">
        <div className="flex flex-col items-center text-center relative z-10">
          <R>
            <span className="brutal-badge bg-olive! mb-6">
              Trang 2 — So Sánh & Kết Luận
            </span>
          </R>
          <R>
            <h1 className="font-display font-black text-fluid-hero uppercase text-ink leading-[1.05] tracking-tight mb-2">
              SO SÁNH
            </h1>
          </R>
          <R>
            <h1 className="font-display font-black text-fluid-hero uppercase text-crimson leading-[1.05] tracking-tight mb-4">
              VÀ KẾT LUẬN
            </h1>
          </R>
          <R>
            <p className="font-body text-xl text-graphite mt-4 max-w-xl mx-auto">
              Kháng chiến chống Mỹ cứu nước hay Nội chiến? Bằng chứng lịch sử
              trả lời.
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

      {/* ═══════════ INTRO ═══════════ */}
      <RevealSection dark fullHeight={false}>
        <div className="max-w-3xl mx-auto text-center py-6">
          <R>
            <p className="font-body text-xl md:text-2xl text-bone/75 leading-relaxed">
              Sau khi đã nắm vững bối cảnh lịch sử và các yếu tố nền tảng quan
              trọng của giai đoạn này, ta có đủ cơ sở để đánh giá và đối chiếu
              hai quan điểm học thuật về bản chất của cuộc chiến tranh ở Việt
              Nam trong giai đoạn 1954 đến 1965. Đây không phải là cuộc tranh
              luận học thuật suông mà câu trả lời sẽ quy định cách chúng ta hiểu
              đúng về lịch sử dân tộc.
            </p>
          </R>
        </div>
      </RevealSection>

      {/* ═══════════ PHẦN 1: QUAN ĐIỂM "NỘI CHIẾN" ═══════════ */}
      <RevealSection fullHeight={false}>
        <div className="max-w-4xl mx-auto">
          <R>
            <span className="brutal-badge mb-4">PHẦN 1</span>
            <h2 className="font-display text-fluid-5xl font-black text-ink uppercase leading-none mt-2 mb-4">
              Quan Điểm &ldquo;Nội Chiến&rdquo; Và Cơ Sở Lập Luận
            </h2>
            <p className="font-body text-xl text-graphite mb-10 max-w-3xl">
              Một số học giả phương Tây, tiêu biểu là Mark Moyar và Michael
              Kort, lập luận rằng cuộc xung đột 1954–1965 về cơ bản là nội chiến
              giữa các tầm nhìn chính trị của người Việt.
            </p>
          </R>

          <R>
            <div className="border-2 border-charcoal/15 bg-paper p-8 max-w-4xl">
              <h3 className="font-display text-xl font-bold text-ink uppercase mb-6 pb-3 border-b-2 border-charcoal/15">
                Lập luận chính của trường phái này
              </h3>
              <ul className="space-y-4 text-ink leading-relaxed text-base">
                {[
                  "Cả hai miền đều là những dự án chính trị thực sự của người Việt, với nguồn ủng hộ riêng.",
                  "Sự phân hóa tư tưởng và tôn giáo sâu sắc ở Việt Nam là thực tế nội tại, tồn tại trước khi Mỹ can thiệp.",
                  "Lực lượng tham chiến phần lớn là người Việt ở cả hai phía.",
                  "Gần một triệu người di cư từ Bắc vào Nam năm 1954 được dẫn ra như bằng chứng nhân khẩu học.",
                  'MTDTGP được đặc trưng hóa là "cánh tay nối dài" của Hà Nội.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 bg-graphite shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </R>

          <R className="mt-6">
            <div className="bg-crimson/8 border-l-4 border-crimson p-6 max-w-4xl">
              <p className="font-body text-base font-semibold text-ink leading-relaxed italic">
                Cần thừa nhận một cách thẳng thắn: trường phái này không hoàn
                toàn thiếu cơ sở. Thực tế là có những người Việt Nam ở miền Nam
                thật sự phản đối chủ nghĩa cộng sản. Sự phân hóa tư tưởng trong
                xã hội Việt Nam là có thật. Tuy nhiên, như phần tiếp theo sẽ
                chứng minh, những yếu tố này không đủ để cấu thành một
                &ldquo;nội chiến&rdquo; theo đúng nghĩa.
              </p>
            </div>
          </R>
        </div>
      </RevealSection>

      {/* ═══════════ PHẦN 2: BÁC BỎ — 5 pillars ═══════════ */}
      <RevealSection dark fullHeight={false}>
        <div className="max-w-4xl mx-auto">
          <R className="text-center mb-10">
            <span className="brutal-badge bg-bone! text-ink! mb-4">PHẦN 2</span>
            <h2 className="font-display text-fluid-6xl font-black uppercase text-bone mt-4 mb-4">
              Bác Bỏ Quan Điểm &ldquo;Nội Chiến&rdquo;
            </h2>
            <p className="text-bone/70 max-w-3xl mx-auto text-lg">
              Luận cứ từ sử học chính thống và thực tiễn lịch sử đã được khẳng
              định bởi cả các học giả phương Tây nghiêm túc như George Herring
              và Gabriel Kolko.
            </p>
          </R>

          <div className="space-y-6">
            {[
              {
                num: "01",
                title: "Tính phi pháp của sự phân chia",
                content:
                  'Hiệp định Geneva không tạo ra hai nhà nước, mà chỉ tạo ra ranh giới quân sự tạm thời. Việc Mỹ và Ngô Đình Diệm xây dựng VNCH như một "quốc gia có chủ quyền riêng" là hành động vi phạm trực tiếp luật pháp quốc tế. Một cuộc "nội chiến" giả thiết sự tồn tại của hai thực thể có chủ quyền hợp pháp, điều này không có ở đây.',
              },
              {
                num: "02",
                title: "VNCH thiếu chủ quyền độc lập thực sự",
                content:
                  'Sự tồn tại của VNCH hoàn toàn phụ thuộc vào viện trợ tài chính, vũ khí, và cố vấn chiến lược của Mỹ. Trưng cầu dân ý 1955 với tỷ lệ 98% phiếu là gian lận trắng trợn, ngay cả cố vấn Mỹ cũng thừa nhận. Một nhà nước như vậy không thể được coi là "bên tham chiến nội chiến" bình đẳng và độc lập.',
              },
              {
                num: "03",
                title: 'MTDTGP không phải "lực lượng ủy nhiệm" đơn thuần',
                content:
                  "Các học giả David Elliott và Philip Catton đã chứng minh cuộc nổi dậy ở miền Nam bắt nguồn từ sức phản kháng của quần chúng nông dân trước sự đàn áp tàn bạo của Diệm. Luật 10/59, đảo ngược cải cách ruộng đất, Ấp Chiến lược đã đẩy hàng triệu người vào vòng tay cách mạng trước khi Hà Nội phát động đấu tranh vũ trang.",
              },
              {
                num: "04",
                title: "Tính liên tục của truyền thống chống ngoại xâm",
                content:
                  "Cuộc chiến tranh chống Mỹ không phải là điểm khởi đầu mới, mà là sự tiếp nối trực tiếp của cuộc kháng chiến chống Pháp, chống Nhật, và truyền thống ngàn năm đấu tranh bảo vệ độc lập. Sau khi Pháp rút lui, Mỹ bước vào thế chỗ. Đây là thực tế địa chính trị được phản ánh trong chính tài liệu nội bộ của chính phủ Mỹ.",
              },
              {
                num: "05",
                title: '"Chiến tranh Đặc biệt" là chủ nghĩa thực dân mới',
                content:
                  "Chiến lược dùng quân đội ARVN làm lực lượng chiến đấu với vũ khí, tài chính và cố vấn Mỹ chính là biểu hiện cổ điển của chủ nghĩa thực dân mới: dùng người bản địa đàn áp đồng bào để phục vụ lợi ích nước ngoài. Một cuộc nội chiến thực sự không có cấu trúc bất đối xứng như vậy.",
              },
            ].map((item, idx) => (
              <R key={idx}>
                <div className="border-l-4 border-crimson bg-charcoal/50 p-8 flex items-start gap-5">
                  <span className="font-display text-4xl font-black text-crimson leading-none shrink-0">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-bone uppercase mb-3">
                      {item.title}
                    </h3>
                    <p className="font-body text-base text-bone/80 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ═══════════ PHẦN 3: BẢNG ĐỐI CHIẾU — A (Kháng chiến) before B (Nội chiến) ═══════════ */}
      <RevealSection fullHeight={false}>
        <div className="max-w-6xl mx-auto">
          <R>
            <span className="brutal-badge mb-4">PHẦN 3</span>
            <h2 className="font-display text-fluid-5xl font-black uppercase mb-8 text-ink mt-2">
              Đối Chiếu Bằng Chứng Lịch Sử
            </h2>
          </R>

          <R>
            <div className="overflow-x-auto border-2 border-charcoal/20">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-olive text-bone font-display uppercase tracking-wider text-sm">
                    <th className="p-4 text-left border-r border-bone/20 w-[14%]">
                      Tiêu chí
                    </th>
                    <th className="p-4 text-left border-r border-bone/20 w-[28%]">
                      <span className="flex items-center gap-2">
                        <CheckCircle size={14} /> Bằng chứng &ldquo;Kháng chiến
                        chống Mỹ&rdquo;
                      </span>
                    </th>
                    <th className="p-4 text-left border-r border-bone/20 w-[24%]">
                      <span className="flex items-center gap-2">
                        <XCircle size={14} /> Bằng chứng &ldquo;Nội chiến&rdquo;
                      </span>
                    </th>
                    <th className="p-4 text-left w-[34%]">
                      Kết luận phân tích
                    </th>
                  </tr>
                </thead>
                <tbody className="font-body">
                  {evidenceTableData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-t border-charcoal/15 ${idx % 2 === 0 ? "bg-bone" : "bg-paper"}`}
                    >
                      <td className="p-4 font-display text-sm font-bold text-ink border-r border-charcoal/10">
                        {row.criteria}
                      </td>
                      <td className="p-4 text-ink border-r border-charcoal/10 leading-relaxed">
                        {row.resistance}
                      </td>
                      <td className="p-4 text-graphite border-r border-charcoal/10 leading-relaxed">
                        {row.civilWar}
                      </td>
                      <td className="p-4 text-ink font-mono text-sm font-semibold leading-relaxed">
                        {row.conclusion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </R>
        </div>
      </RevealSection>

      {/* ═══════════ PHẦN 4: KẾT LUẬN ═══════════ */}
      <RevealSection dark className="border-t-4 border-crimson">
        <div className="max-w-3xl mx-auto text-center">
          <R>
            <span className="font-mono text-xs font-bold text-bone/50 uppercase tracking-[0.3em]">
              PHẦN 4 — KẾT LUẬN
            </span>
            <h2 className="font-display text-fluid-6xl font-black text-bone uppercase leading-[1.1] tracking-tight mt-8 mb-16">
              CUỘC KHÁNG CHIẾN CHỐNG MỸ CỨU NƯỚC LÀ{" "}
              <span className="text-crimson">SỰ THẬT LỊCH SỬ</span>
            </h2>
          </R>

          <div className="space-y-10 text-left max-w-2xl mx-auto">
            <R>
              <div>
                <span className="font-mono font-bold text-sm text-crimson uppercase tracking-wider">
                  Về quan điểm &ldquo;nội chiến&rdquo;
                </span>
                <p className="text-lg text-bone/85 leading-relaxed mt-3">
                  Mặc dù trong quá trình lịch sử có những biểu hiện của xung đột
                  nội bộ như sự phân hóa tư tưởng, những mâu thuẫn giáo phái hay
                  những cuộc đụng độ giữa người Việt với người Việt, nhưng không
                  thể tách rời những hiện tượng ấy khỏi bối cảnh lịch sử căn bản
                  của thời đại. Đất nước Việt Nam bị chia cắt bởi sự áp đặt của
                  các thế lực bên ngoài, quyền tự quyết của dân tộc bị phủ nhận
                  khi Tổng tuyển cử thống nhất đất nước bị phá hoại, và một chế
                  độ ở miền Nam được duy trì bằng nguồn viện trợ tài chính, quân
                  sự và chiến lược khổng lồ từ Hoa Kỳ. Chính những yếu tố ngoại
                  sinh đó đã tạo nên điều kiện cho cuộc chiến kéo dài.
                  <strong className="text-bone">
                    {" "}
                    Nếu không có những yếu tố ngoại sinh đó, điều kiện cho một
                    cuộc &ldquo;nội chiến&rdquo; kéo dài sẽ không tồn tại.
                  </strong>
                </p>
              </div>
            </R>

            <R>
              <div>
                <span className="font-mono font-bold text-sm text-crimson uppercase tracking-wider">
                  Quan điểm chính thống của Đảng
                </span>
                <p className="text-lg text-bone/85 leading-relaxed mt-3">
                  Xem giai đoạn này như bước mở đầu và quá trình leo thang của
                  cuộc kháng chiến chống Mỹ cứu nước phản ánh đúng bản chất của
                  lịch sử. Cung cấp khung phân tích vừa chặt chẽ về mặt lịch sử,
                  vừa trung thực với thực tế. Khung này nắm bắt được: tính liên
                  tục của truyền thống chống ngoại xâm, tính phi pháp và phi
                  chính danh của sự phân chia đất nước và vai trò quyết định của
                  sự can thiệp Mỹ.
                </p>
              </div>
            </R>

            <R>
              <div>
                <span className="font-mono font-bold text-sm text-crimson uppercase tracking-wider">
                  Bằng chứng hùng hồn nhất
                </span>
                <p className="text-lg text-bone/85 leading-relaxed mt-3">
                  Bằng chứng rõ ràng nhất chính là việc Hoa Kỳ buộc phải đưa
                  hàng trăm nghìn quân chiến đấu trực tiếp vào miền Nam từ năm
                  1965 sau khi chiến lược &ldquo;Chiến tranh đặc biệt&rdquo;
                  hoàn toàn phá sản.{" "}
                  <strong className="text-bone">
                    {" "}
                    Nếu đó thực sự chỉ là một cuộc nội chiến đơn thuần, thì vì
                    sao cường quốc quân sự mạnh nhất thế giới lại phải trực tiếp
                    đưa quân đội của mình tham chiến để duy trì chính quyền ấy.
                  </strong>
                </p>
              </div>
            </R>
          </div>

          <R className="mt-20 pt-12 border-t border-bone/15 max-w-2xl mx-auto">
            <p className="font-display text-2xl md:text-3xl font-black text-crimson uppercase leading-tight">
              Cuộc đấu tranh mà Đảng lãnh đạo, mà Mặt trận Dân tộc Giải phóng
              miền Nam thực hiện, và mà toàn thể nhân dân miền Nam kiên cường
              tham gia chính là cuộc đấu tranh vì độc lập, vì chủ quyền và vì
              quyền tự quyết thiêng liêng của dân tộc Việt Nam trước một chế độ
              được dựng lên và bảo vệ bởi sức mạnh của một cường quốc bên ngoài.
            </p>
          </R>
        </div>
      </RevealSection>

      {/* ═══════════ BÀI HỌC LỊCH SỬ ═══════════ */}
      <RevealSection
        fullHeight={false}
        className="border-t-2 border-charcoal/10"
      >
        <div className="max-w-4xl mx-auto">
          <R>
            <h2 className="font-display text-fluid-5xl font-black text-ink uppercase text-center mb-10">
              Bài Học Lịch Sử
            </h2>
          </R>

          <div className="space-y-6">
            {[
              {
                title: "Ý chí dân tộc không thể bị đè bẹp",
                content:
                  "Chủ nghĩa dân tộc không thể bị đè bẹp bởi sức mạnh quân sự và tiền bạc của nước ngoài khi nó gắn liền với khát vọng chính nghĩa của một dân tộc. Ý chí thống nhất và độc lập được thể hiện qua Cách mạng Tháng Tám, chiến thắng Điện Biên Phủ, và cuộc Kháng chiến chống Mỹ. Đây chính là sức mạnh không một đế quốc nào khuất phục được.",
              },
              {
                title: "Nhãn hiệu lịch sử không phải trung tính",
                content:
                  'Việc gọi cuộc chiến này là "nội chiến" không phải là kết quả của nghiên cứu lịch sử khách quan, mà thường là nỗ lực biện hộ cho sự can thiệp của Mỹ và xóa mờ trách nhiệm lịch sử. Ngược lại, nhìn nhận đây là Cuộc kháng chiến chống Mỹ cứu nước không phải là tuyên truyền mà là sự trung thực với tổng thể bằng chứng lịch sử.',
              },
              {
                title: "Tài năng lãnh đạo chiến lược của Đảng",
                content:
                  "Đường lối và sự lãnh đạo của Đảng Cộng sản Việt Nam từ kiên trì đấu tranh ngoại giao và chính trị, đến quyết định lịch sử của Nghị quyết 15, đến xây dựng Mặt trận Dân tộc Giải phóng thể hiện tài năng lãnh đạo chiến lược xuất sắc, luôn đặt lợi ích dân tộc lên trên hết và tìm ra đường đi đúng đắn trong hoàn cảnh cực kỳ khó khăn.",
              },
            ].map((item, idx) => (
              <R key={idx}>
                <div className="border-2 border-charcoal/15 bg-paper p-8">
                  <h3 className="font-display text-xl font-bold text-ink uppercase mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-base text-ink leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ═══════════ LỜI KẾT ═══════════ */}
      <RevealSection dark className="border-t-4 border-crimson">
        <div className="max-w-3xl mx-auto">
          <R>
            <span className="font-mono text-xs font-bold text-bone/50 uppercase tracking-[0.3em]">
              LỜI KẾT
            </span>
          </R>

          <R className="mt-8">
            <div className="space-y-6 text-lg text-bone/85 leading-relaxed">
              <p>
                Giai đoạn 1954–1965 không phải là sự khởi đầu của một cuộc nội
                chiến như một số cách diễn giải giản lược. Đó là thời khắc mở
                màn cho một chương sử lớn của dân tộc Việt Nam,
                <strong className="text-bone">
                  {" "}
                  cuộc kháng chiến chống Mỹ cứu nước,{" "}
                </strong>
                cuộc đấu tranh trường kỳ và quyết liệt của một dân tộc yêu
                chuộng hòa bình nhưng không bao giờ khuất phục trước bất kỳ thế
                lực xâm lược nào. Trong cuộc đối đầu tưởng chừng chênh lệch ấy,
                một dân tộc nhỏ bé nhưng kiên cường đã đứng vững, chiến đấu bằng
                ý chí sắt đá, bằng khát vọng độc lập cháy bỏng, và cuối cùng làm
                nên chiến thắng lịch sử vào ngày
                <strong className="text-bone"> 30 tháng 4 năm 1975, </strong>
                khép lại hơn một thế kỷ đấu tranh giành độc lập và thống nhất
                đất nước.
              </p>
              <p>
                Hiểu đúng bản chất của cuộc chiến ấy không chỉ là một yêu cầu
                của nghiên cứu lịch sử, mà còn là
                <strong className="text-bone">
                  {" "}
                  trách nhiệm đạo lý đối với quá khứ và đối với những con người
                  đã hy sinh.{" "}
                </strong>
                Hàng triệu đồng bào, chiến sĩ từ mọi miền đất nước đã ngã xuống,
                mang theo tuổi trẻ, ước mơ và cả cuộc đời mình để đổi lấy nền
                độc lập, tự do và sự thống nhất thiêng liêng của Tổ quốc. Mỗi
                trang lịch sử của thời kỳ ấy được viết bằng máu, bằng nước mắt,
                và bằng lòng yêu nước sâu sắc của cả một dân tộc quyết không
                chấp nhận làm nô lệ.
              </p>
              <p className="font-semibold text-bone border-l-4 border-crimson pl-6 text-xl">
                Lịch sử không phải là những dòng chữ có thể tùy tiện giản lược
                hay bóp méo theo những cách nhìn phiến diện. Lịch sử luôn giữ
                tiếng nói của sự thật. Và trong trường hợp này, sự thật ấy được
                khẳng định rõ ràng: đó là cuộc Kháng chiến chống Mỹ cứu nước,
                một cuộc đấu tranh chính nghĩa, một bản anh hùng ca của nhân dân
                Việt Nam trong hành trình bảo vệ độc lập, gìn giữ tự do và hoàn
                thành khát vọng thống nhất non sông.
              </p>
            </div>
          </R>

          <R className="mt-16 pt-8 border-t border-bone/15">
            <p className="font-mono text-xs text-bone/40 leading-relaxed uppercase tracking-wider">
              Trang web được biên soạn theo tinh thần sử học chính thống của
              Đảng Cộng sản Việt Nam, có tham khảo và đối chiếu với các nguồn
              học thuật trong và ngoài nước: Văn kiện Đảng toàn tập, Cambridge
              History of the Vietnam War, George Herring, Gabriel Kolko, David
              Elliott, Philip Catton, và các tài liệu lưu trữ của CIA và Bộ
              Ngoại giao Hoa Kỳ.
            </p>
          </R>
        </div>
      </RevealSection>
    </div>
  );
};

export default ConclusionPage;
