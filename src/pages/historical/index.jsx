import { motion } from "framer-motion";
import {
  KineticSubline,
} from "../../components/ui/KineticText";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  ArrowDown,
  ArrowRight,
  Flag,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const timelineData = [
  {
    year: "1954",
    event: "Ký kết Hiệp định Geneva",
    detail: "Việt Nam tạm thời bị chia cắt tại vĩ tuyến 17 sau chiến thắng Điện Biên Phủ.",
    interpretation: "Điều này tạo ra điều kiện cấu trúc cho việc xây dựng nhà nước cạnh tranh — điểm khởi đầu của 'hai nước Việt Nam' khiến vấn đề nội chiến trở nên khả dĩ.",
  },
  {
    year: "1955",
    event: "Diệm củng cố quyền lực",
    detail: "Ngô Đình Diệm đánh bại các giáo phái đối lập, phế truất Bảo Đại và tuyên bố thành lập Việt Nam Cộng hòa.",
    interpretation: "Điều này ủng hộ lập luận nội chiến: Nó cho thấy mâu thuẫn phe phái không chỉ tồn tại giữa hai miền mà còn khốc liệt ngay trong lòng chính quyền miền Nam.",
  },
  {
    year: "1956",
    event: "Tuyển cử thống nhất không diễn ra",
    detail: "Miền Nam Việt Nam từ chối tham gia cuộc tổng tuyển cử toàn quốc.",
    interpretation: "Điều này làm phức tạp thêm cuộc tranh luận: Miền Bắc coi đây là sự cản trở do nước ngoài hậu thuẫn, trong khi miền Nam xem đây là hành động tự vệ chính đáng.",
  },
  {
    year: "1957–58",
    event: "Gia tăng đàn áp",
    detail: "Chiến dịch Tố Cộng, Diệt Cộng; bắt giữ hàng loạt, bỏ tù và tái định cư nông thôn.",
    interpretation: "Sự kiện này củng cố góc nhìn nội chiến: Nó tạo ra những mâu thuẫn nội tại ở miền Nam, nguồn cơn trực tiếp châm ngòi cho cuộc nổi dậy cục bộ.",
  },
  {
    year: "1959",
    event: "Thông qua Nghị quyết 15",
    detail: "Đảng cho phép đấu tranh vũ trang ở miền Nam; Đoàn 559 mở các tuyến đường tiếp tế.",
    interpretation: "Điều này củng cố quan điểm tiến công từ bên ngoài: Nó đánh dấu sự chuyển hướng quân sự có chủ đích từ Hà Nội để bảo trợ và điều phối cuộc chiến ở miền Nam.",
  },
  {
    year: "1960",
    event: "Thành lập Mặt trận Dân tộc Giải phóng",
    detail: "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam được thành lập; Đại hội Đảng tái khẳng định mục tiêu thống nhất.",
    interpretation: "Điều này phản ánh tính chất kép của cuộc chiến: Mặt trận tập hợp những người miền Nam thực sự uất ức, nhưng hoạt động dưới bộ khung chiến lược do Hà Nội định hướng.",
  },
  {
    year: "1961–62",
    event: "Chương trình Ấp Chiến lược",
    detail: "Di dời dân nhằm cô lập họ khỏi lực lượng nổi dậy; gây ra sự phẫn nộ lan rộng.",
    interpretation: "Điều này ủng hộ luận điểm nội chiến cục bộ: Một chính sách xây dựng nhà nước thất bại đã đào sâu thêm sự phân hóa xã hội ở nông thôn miền Nam.",
  },
  {
    year: "1963",
    event: "Khủng hoảng Phật giáo và sự sụp đổ của Diệm",
    detail: "Sự kiện tự thiêu của Thích Quảng Đức; cuộc đảo chính quân sự lật đổ Diệm vào tháng 11.",
    interpretation: "Đây là ví dụ điển hình cho lăng kính nội chiến: Sự sụp đổ của miền Nam xuất phát từ những rạn nứt chính trị và tôn giáo trong nước, không phải do tấn công từ bên ngoài.",
  },
  {
    year: "1964",
    event: "Sự kiện Vịnh Bắc Bộ",
    detail: "Quốc hội Mỹ thông qua Nghị quyết Vịnh Bắc Bộ; bất ổn chính trị tại Sài Gòn.",
    interpretation: "Sự kiện này củng cố góc nhìn về chiến tranh ủy nhiệm: Sự leo thang của Mỹ làm thay đổi tính chất cuộc xung đột, biến nó thành một chiến trường của Chiến tranh Lạnh.",
  },
  {
    year: "1965",
    event: "Quân chiến đấu Mỹ đổ bộ",
    detail: "Chiến dịch Sấm Rền; Thủy quân lục chiến đổ bộ tại Đà Nẵng; cuộc chiến bị quốc tế hóa.",
    interpretation: "Điều này làm phức tạp thêm nhận định 'nội chiến': Sự hiện diện khổng lồ của lính ngoại quốc khiến danh xưng nội chiến trở nên không đầy đủ, dù không xóa đi động lực cốt lõi ban đầu.",
  },
];

const BoMayNhaNuocPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-shell w-full bg-bone selection:bg-ink selection:text-gold snap-container">
      {/* ═══════════ HERO ═══════════ */}
      <Section className="items-center justify-center px-4 md:px-10 border-b-2 border-ink bg-bone">
        <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-ink border-4 border-ink px-6 py-2 shadow-hard transform rotate-1"
          >
            <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-bone">
              Page 1 — Historical Context
            </span>
          </motion.div>

          <div className="relative text-center">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.25, ease: "linear" }}
              className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase text-ink leading-[0.85] tracking-tighter drop-shadow-[4px_4px_0px_#ffd700]"
            >
              TỪ CHIA CẮT
            </motion.h1>
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.25, ease: "linear" }}
              className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase text-crimson leading-[0.85] tracking-tighter drop-shadow-[4px_4px_0px_#000000]"
            >
              ĐẾN XUNG ĐỘT
            </motion.h1>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 text-ink opacity-50"
          >
            <ArrowDown size={32} />
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ WHY CONTEXT MATTERS ═══════════ */}
      <Section className="items-center justify-center bg-ink text-bone">
        <div className="max-w-screen-md mx-auto text-center py-12 relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xl md:text-2xl text-bone/80 leading-relaxed font-medium"
          >
            Trước khi đánh giá xem cuộc xung đột Việt Nam có phải là một cuộc nội chiến hay không, bạn cần
            hiểu rõ các điều kiện đã tạo ra nó. Trang này xây dựng nền tảng bằng chứng — không phải một
            lịch sử Việt Nam toàn diện, mà là những phát triển chính trị cụ thể khiến câu hỏi này
            thực sự trở nên phức tạp.
          </motion.p>
        </div>
      </Section>

      {/* ═══════════ AFTER GENEVA ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-white relative overflow-hidden"
      >
        <div className="max-w-screen-lg mx-auto w-full py-24 relative z-10">
          <div className="brutal-badge mb-4 relative z-10 shadow-hard inline-block">PHẦN 1</div>
          <div className="relative z-10 mb-10 w-fit max-w-[90%]">
            <h2 className="text-4xl md:text-5xl font-display font-black text-ink uppercase leading-tight bg-bone border-4 border-ink p-4 shadow-[8px_8px_0px_#ffd700]">
              Sau Geneva: Đất Nước Bị Chia Cắt
            </h2>
          </div>

          <div className="absolute right-[-70%] top-[18%] w-[120%] md:w-[100%] lg:w-[90%] opacity-80 z-0 pointer-events-none select-none">
            <div 
              className="w-full h-full scale-[2.6]"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 60%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 60%)'
              }}
            >
              <img 
                src="/historical/ViTuyen17.png" 
                alt="Vĩ tuyến 17 chia cắt đất nước sau thời kỳ hiệp định Geneva" 
                className="w-full h-auto object-cover mix-blend-multiply grayscale-[50%]"
              />
            </div>
          </div>

          <div className="relative z-10 brutal-card shadow-[8px_8px_0px_#1C1C1A] bg-white/90 backdrop-blur-sm">
            <div className="space-y-6 text-lg text-ink font-medium leading-relaxed max-w-3xl">
              <p>
                Hiệp định Geneva năm 1954 kết thúc Chiến tranh Đông Dương lần thứ nhất chống Pháp và tạm thời chia cắt Việt Nam tại vĩ tuyến 17. Hiệp định kêu gọi tổ chức tổng tuyển cử thống nhất đất nước vào năm 1956, nhưng cuộc bầu cử này chưa bao giờ diễn ra.
              </p>
              <p>
                Chính phủ miền Nam của Ngô Đình Diệm từ chối tham gia, lập luận rằng bầu cử tự do là không thể thực hiện ở miền Bắc. Hà Nội coi đây là hành động vi phạm Hiệp định và nhận ra rằng quá trình thống nhất sẽ đòi hỏi nhiều hơn là các biện pháp ngoại giao.
              </p>
              <p>
                Hệ quả là sự nổi lên của hai nhà nước đối lập, mỗi bên đều tuyên bố đại diện cho toàn bộ dân tộc: Việt Nam Dân chủ Cộng hòa ở miền Bắc theo định hướng xã hội chủ nghĩa, và Việt Nam Cộng hòa ở miền Nam xây dựng nhà nước chống cộng với sự trợ lực từ Mỹ.
              </p>
            </div>

            <div className="mt-10 bg-crimson/10 p-6 border-l-4 border-crimson max-w-3xl">
              <p className="font-body text-lg text-ink font-bold italic">
                Việc thất bại trong việc tổ chức tuyển cử thống nhất năm 1956 thường được xem là bước ngoặt quyết định — khoảnh khắc khiến xung đột vũ trang ngày càng dễ xảy ra và khả năng thống nhất hòa bình gần như khép lại.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ TWO STATES, TWO SYSTEMS ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-ink text-bone border-y-2 border-bone"
      >
        <div className="max-w-screen-2xl mx-auto w-full py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl font-black uppercase mb-6 text-white tracking-widest">
              Hai Nhà Nước, Hai Thể Chế
            </h2>
            <p className="font-body text-xl font-medium text-bone/80 max-w-3xl mx-auto">
              Không bên nào đơn giản về mặt chính trị. Việc hiểu rõ những động lực nội bộ của hai miền là yếu tố then chốt cho mọi cuộc tranh luận.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* NORTH */}
            <div className="bg-ink border-4 border-crimson p-8 md:p-12 shadow-[12px_12px_0_0_#9B1B30]">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-crimson border-2 border-bone text-white flex items-center justify-center">
                  <Flag size={24} />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white uppercase">Miền Bắc</h3>
                  <span className="brutal-badge !bg-bone !text-ink !text-[12px] mt-1">Việt Nam Dân Chủ Cộng Hòa</span>
                </div>
              </div>

              <div className="space-y-5 text-bone text-lg font-medium leading-relaxed">
                <p>
                  Việt Nam Dân chủ Cộng hòa củng cố một nhà nước xã hội chủ nghĩa dưới sự lãnh đạo của Đảng Lao động. Cải cách ruộng đất (1953–56) giúp phân chia lại quyền sở hữu, trong khi công nghiệp hóa được tiến hành với sự hỗ trợ từ Liên Xô và Trung Quốc.
                </p>
                <p>
                  Những bất đồng nội bộ bị kiểm soát nghiêm ngặt — từ những tiếng nói trong phong trào Nhân Văn – Giai Phẩm, áp lực lên người Công giáo, cho đến các cuộc tranh luận trong nội bộ Đảng về chiến lược đối với miền Nam.
                </p>
                <p className="text-base text-bone/80 border-t-2 border-bone/30 pt-4 mt-4 font-mono font-bold">
                  Miền Bắc không phải là một khối hoàn toàn đồng nhất về chính trị. Việc siết chặt nội bộ và tranh luận về chiến lược khiến cho các câu chuyện diễn giải bức tranh chung trở nên đa chiều.
                </p>
              </div>
            </div>

            {/* SOUTH */}
            <div className="bg-ink border-4 border-bone p-8 md:p-12 shadow-[12px_12px_0_0_#DFD8C8]">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-600 border-2 border-bone text-white flex items-center justify-center">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white uppercase">Miền Nam</h3>
                  <span className="brutal-badge !bg-bone !text-ink !text-[12px] mt-1">Việt Nam Cộng Hòa</span>
                </div>
              </div>

              <div className="space-y-5 text-bone text-lg font-medium leading-relaxed">
                <p>
                  Ngô Đình Diệm củng cố quyền lực bằng cách trấn áp các giáo phái đối thủ, phát động chiến dịch "Tố Cộng" và xây dựng nhà nước theo hướng tập quyền với sự hỗ trợ quân sự và tài chính từ Mỹ.
                </p>
                <p>
                  Sự chống đối trong nước rất phổ biến: bản Tuyên cáo Caravelle (1960) thể hiện sự bất bình của giới tinh hoa, âm mưu đảo chính bất thành, chương trình Ấp chiến lược gây phẫn nộ ở nông thôn, và Khủng hoảng Phật giáo năm 1963 dẫn đến cái chết của Diệm trong một cuộc đảo chính quân sự.
                </p>
                <p className="text-base text-bone/80 border-t-2 border-bone/30 pt-4 mt-4 font-mono font-bold">
                  Sự rạn nứt của miền Nam không chỉ do sức ép từ bên ngoài. Các cuộc khủng hoảng tính chính danh nội bộ là bằng chứng quan trọng cho luận điểm coi đây là cuộc nội chiến.
                </p>
              </div>
            </div>
          </div>

          {/* Synthesis note */}
          <div className="mt-12 text-center max-w-3xl mx-auto">
            <p className="font-body text-xl text-bone/80 italic font-medium">
              Khi so sánh hai nhà nước này, một vấn đề trở nên rõ ràng hơn: đây là xung đột
              giữa những khuôn khổ được áp đặt từ bên ngoài, hay giữa những tầm nhìn chính trị thực sự
              của người Việt Nam? Bằng chứng cho thấy tồn tại cả hai yếu tố này.
            </p>
          </div>

          {/* Comparison table */}
          <div className="mt-16 overflow-x-auto bg-paper border-4 border-ink">
            <table className="w-full text-base">
              <thead>
                <tr className="bg-crimson text-bone font-display uppercase tracking-wider text-xl">
                  <th className="p-5 text-left border-r-4 border-ink">Khía Cạnh</th>
                  <th className="p-5 text-left border-r-4 border-ink">Miền Bắc (VNDCCH)</th>
                  <th className="p-5 text-left">Miền Nam (VNCH)</th>
                </tr>
              </thead>
              <tbody className="font-body text-ink font-medium">
                {[
                  ["Hệ thống chính trị", "Nhà nước xã hội chủ nghĩa độc đảng", "Nền cộng hòa theo xu hướng tập quyền"],
                  ["Hệ tư tưởng", "Chủ nghĩa Mác - Lênin, chủ nghĩa dân tộc", "Chống cộng, tính chính danh quốc gia"],
                  ["Sự hỗ trợ quốc tế", "Liên Xô, Trung Quốc", "Mỹ, Pháp (giai đoạn đầu)"],
                  ["Thách thức nội bộ", "Chấn chỉnh Cải cách ruộng đất, kiểm soát tư tưởng", "Mâu thuẫn giáo phái, Khủng hoảng Phật giáo, Đảo chính"],
                  ["Nhà lãnh đạo", "Hồ Chí Minh, Lê Duẩn", "Ngô Đình Diệm (đến năm 1963), Hội đồng Quân nhân"],
                  ["Lý do chính danh", "Thắng lợi chống thực dân, thống nhất", "Chủ quyền, độc lập chống cộng"],
                ].map(([dim, north, south], idx) => (
                  <tr key={idx} className="border-t-4 border-ink hover:bg-gold/20 transition-colors">
                    <td className="p-5 font-bold border-r-4 border-ink">{dim}</td>
                    <td className="p-5 border-r-4 border-ink">{north}</td>
                    <td className="p-5">{south}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ═══════════ CPV STRATEGY — reframed ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-white"
      >
        <div className="max-w-screen-lg mx-auto w-full py-24">
          <div className="brutal-badge mb-4">PHẦN 4</div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-ink uppercase leading-none mt-2 mb-4 drop-shadow-[4px_4px_0px_#ffd700]">
            Chiến lược Vận động của Đảng Cộng sản
          </h2>
          <p className="font-body text-xl font-medium text-graphite mb-10 max-w-3xl">
            Chiến lược của Đảng trả lời thế nào cho câu hỏi về hệ quả nội chiến? Trọng tâm phụ thuộc vào việc bạn nhấn mạnh sự chỉ đạo từ miền Bắc hay quyền chủ động ở miền Nam.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
            {/* Political strategy */}
            <div className="brutal-card border-4 border-ink p-10 bg-paper shadow-[8px_8px_0_0_#1C1C1A]">
              <h3 className="font-display text-2xl font-bold text-ink uppercase mb-6 border-b-4 border-ink pb-4">
                Chiến lược Chính trị (1954–59)
              </h3>
              <div className="space-y-4 text-ink font-medium leading-relaxed">
                <p>
                  Ngay sau Geneva, sự chú ý ban đầu của Đảng là huy động chính trị trong Nam, kỳ vọng rằng cuộc bầu cử thống nhất sẽ giải quyết sự chia rẽ một cách hòa bình. Khi bầu cử bị chặn đứng, các cán bộ miền Nam dấy lên sức ép, đòi hỏi quyền vũ trang đánh trả sự đàn áp của chính quyền Diệm.
                </p>
                <p className="text-base text-ink/80 border-t-2 border-ink/30 pt-4 mt-4 font-mono font-bold">
                  Giai đoạn này hỗ trợ luận điểm nội chiến: yêu cầu đấu tranh vũ trang xuất phát một phần từ dưới lên, từ người Việt ở phương Nam để tự vệ trước các điều kiện áp bức.
                </p>
              </div>
            </div>

            {/* Military strategy */}
            <div className="brutal-card border-4 border-ink p-10 bg-paper shadow-[8px_8px_0_0_#1C1C1A]">
              <h3 className="font-display text-2xl font-bold text-ink uppercase mb-6 border-b-4 border-ink pb-4">
                Chiến lược Quân sự (1959–65)
              </h3>
              <div className="space-y-4 text-ink font-medium leading-relaxed">
                <p>
                  Nghị quyết 15 (1959) chính thức cho phép đấu tranh vũ trang. Đoàn 559 thiết lập đường Hồ Chí Minh. Mặt trận Dân tộc Giải phóng ra đời (1960). Đến năm 1963, khi Sài Gòn bước vào giai đoạn thoái trào vì biến động nội bộ, Hà Nội đã chủ động gia tăng thiết bị và quân lực cho chiến tuyến.
                </p>
                <p className="text-base text-ink/80 border-t-2 border-ink/30 pt-4 mt-4 font-mono font-bold">
                  Giai đoạn này củng cố góc nhìn về cuộc nổi dậy có chỉ đạo: Hà Nội tiến hành điều phối hậu cần, chiến lược, và tổ chức bộ máy xuyên suốt ranh giới.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 brutal-card bg-gold text-ink border-4 border-ink p-8 max-w-5xl shadow-[8px_8px_0_0_#1C1C1A]">
            <p className="font-body text-xl font-bold leading-relaxed">
              Dù là chiến lược chính trị hay quân sự, sự tùy biến của Đảng cho thấy cuộc chiến mang cả dáng dấp của một cuộc nổi dậy có chỉ đạo lẫn một cuộc đánh trả tự phát từ cơ sở. Sự dịch chuyển từ đấu tranh chính trị sang quân sự không phải là một quyết định chớp nhoáng từ Hà Nội, mà là sự ứng biến không ngừng trước áp lực của cán bộ nằm vùng và các chính sách của Diệm.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ INTERPRETED TIMELINE ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-bone border-y-2 border-ink"
      >
        <div className="max-w-screen-lg mx-auto w-full py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl font-black uppercase mb-4 text-ink drop-shadow-[2px_2px_0px_#ffd700]">
              Mốc Thời Gian: 1954–1965
            </h2>
            <p className="text-ink font-bold text-xl max-w-2xl mx-auto">
              Không chỉ là những gì đã xảy ra — mà là lý do mỗi sự kiện càng làm phức tạp thêm câu hỏi nghiên cứu.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[22px] md:left-[30px] top-0 bottom-0 border-l-4 border-ink"></div>

            <div className="space-y-12">
              {timelineData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.25, ease: "linear" }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Block */}
                  <div className="absolute left-[14px] md:left-[22px] top-1 w-5 h-5 bg-crimson border-2 border-ink z-10 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard transition-all cursor-default"></div>

                  <div className="inline-block font-display text-2xl font-black text-ink bg-gold border-2 border-ink shadow-hard-sm px-3 mb-3">{item.year}</div>
                  <div className="font-display text-2xl font-bold uppercase text-ink leading-tight mb-2">{item.event}</div>
                  <p className="font-body text-lg text-graphite mb-4">{item.detail}</p>
                  
                  <div className="brutal-card p-4 !bg-bone">
                    <p className="font-body text-base text-ink font-bold leading-relaxed">
                      <span className="brutal-badge mr-3 bg-crimson text-bone">QUAN ĐIỂM TRANH LUẬN</span>
                      {item.interpretation}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ SYNTHESIS + TRANSITION CTA ═══════════ */}
      <Section className="items-center justify-center bg-sand border-t-2 border-ink">
        <div className="max-w-screen-md mx-auto text-center relative z-10 py-24">
          <div className="space-y-6 text-xl text-ink font-medium leading-relaxed brutal-card border-4 border-ink shadow-[8px_8px_0_0_#1C1C1A] p-10 bg-bone">
            <p>
              Bạn nắm trong tay nền móng lịch sử. Những tham vọng là xác thực, những hố sâu ngăn cách là có thật, và bạo lực đã leo thang vuột khỏi tầm nhìn của chính những người tham dự.
            </p>
            <p className="font-bold">
              Câu hỏi khó nằm ở phía trước: ba luồng tư tưởng lịch sử vạch ra ba kết luận đối lập — và bằng chứng chỉ ra một khu vực màu xám giữa các ranh giới đó.
            </p>
          </div>

          <div className="mt-16">
            <Button
              variant="danger"
              size="lg"
              onClick={() => navigate("/tranh-luan-ket-luan")}
              className="gap-3 text-lg px-10 py-5"
            >
              Bước Vào Vòng Tranh Luận <ArrowRight size={24} strokeWidth={3} />
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default BoMayNhaNuocPage;

