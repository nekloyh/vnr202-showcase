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
    <div className="page-shell w-full bg-bone selection:bg-ink selection:text-gold scroll-container-fluid">
      {/* ═══════════ HERO ═══════════ */}
      <Section className="items-center justify-center px-4 md:px-10 border-b-[8px] border-ink bg-[#f0f0f0] pt-24 pb-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-1"
          >
            <div className="bg-ink border-[4px] border-ink px-6 py-2 shadow-[8px_8px_0_#D32F2F] transform -rotate-1">
              <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-white">
                HỒ SƠ 01 — BỐI CẢNH LỊCH SỬ
              </span>
            </div>
          </motion.div>

          <div className="relative text-center mt-8">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.25, ease: "linear" }}
              className="font-display font-black text-[clamp(4.5rem,8vw,8rem)] uppercase text-ink leading-[0.85] tracking-tighter drop-shadow-[8px_8px_0_#F9F9F9] mb-4"
            >
              TỪ CHIA CẮT
            </motion.h1>
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.25, ease: "linear" }}
              className="font-display font-black text-[clamp(4.5rem,8vw,8rem)] uppercase text-white bg-ink px-8 py-2 border-[6px] border-ink leading-[0.85] tracking-tighter drop-shadow-[8px_8px_0_#D32F2F] mt-4 rotate-1 inline-block shadow-[16px_16px_0_rgba(0,0,0,0.2)]"
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
      <Section className="items-center justify-center bg-ink text-bone py-32 border-b-[8px] border-crimson">
        <div className="max-w-screen-md mx-auto relative z-10 border-[6px] border-bone p-10 md:p-16">
          <div className="absolute -top-[30px] left-[-6px] bg-bone text-ink font-mono font-bold text-sm tracking-widest uppercase px-6 py-2 border-[6px] border-b-0 border-bone">
            GHI CHÚ NGHIÊN CỨU
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-3xl md:text-4xl text-bone leading-tight font-bold"
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
        className="items-center justify-center px-4 md:px-10 bg-[#FAFAFA] relative overflow-hidden border-b-[8px] border-ink py-32"
      >
        <div className="max-w-screen-lg mx-auto w-full relative z-10">
          <div className="relative z-10 mb-12 w-fit max-w-[90%]">
            <div className="bg-ink text-white font-mono text-sm font-bold px-6 py-2 inline-block border-[6px] border-ink border-b-0 uppercase tracking-widest relative top-[6px]">
              VĂN BẢN TRÍCH XUẤT
            </div>
            <h2 className="text-[clamp(3rem,5vw,5rem)] font-display font-black text-ink uppercase leading-none bg-paper border-[6px] border-ink p-8 shadow-[16px_16px_0px_#1976D2]">
              Sau Geneva:<br/>Đất Nước Bị Chia Cắt
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

          <div className="relative z-10 brutal-card border-[8px] border-ink shadow-[16px_16px_0_#000] bg-white p-10 md:p-16 transition-transform hover:-translate-y-2">
            
            {/* Stamp Overlay */}
            <div className="absolute -top-6 -right-6 md:top-8 md:-right-12 z-20 transform rotate-12 opacity-90 pointer-events-none">
              <div className="border-[6px] border-crimson text-crimson font-display font-black text-4xl px-4 py-2 uppercase tracking-widest mix-blend-multiply">
                TÀI LIỆU LƯU TRỮ
              </div>
            </div>

            <div className="space-y-8 text-2xl text-ink font-medium leading-relaxed max-w-3xl relative z-10">
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

            <div className="mt-12 bg-crimson border-[6px] border-ink p-8 shadow-[8px_8px_0_#000] max-w-3xl transform -rotate-1 relative z-10">
              <p className="font-body text-2xl text-white font-bold italic leading-snug">
                "Việc thất bại trong việc tổ chức tuyển cử thống nhất năm 1956 thường được xem là bước ngoặt quyết định — khoảnh khắc khiến xung đột vũ trang ngày càng dễ xảy ra và khả năng thống nhất hòa bình gần như khép lại."
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ TWO STATES, TWO SYSTEMS ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-ink text-paper border-b-[8px] border-ink py-32"
      >
        <div className="max-w-screen-2xl mx-auto w-full relative z-10">
          <div className="text-center mb-20 relative">
            <h2 className="font-display text-[clamp(4rem,6vw,6rem)] font-black uppercase mb-6 text-white tracking-tighter leading-none">
              Hai Nhà Nước, Hai Thể Chế
            </h2>
            <p className="font-body text-2xl font-medium text-bone max-w-4xl mx-auto bg-crimson inline-block px-4 py-2 border-[4px] border-white shadow-[6px_6px_0_#000] transform rotate-1">
              Hiểu rõ động lực nội bộ hai miền là chìa khóa của cuộc tranh luận.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border-[8px] border-white shadow-[16px_16px_0_0_#D32F2F]">
            {/* NORTH */}
            <div className="bg-[#1A1A1A] md:border-r-[8px] md:border-white border-b-[8px] border-white md:border-b-0 p-10 md:p-16 relative overflow-hidden">
              <div className="absolute -left-8 top-12 -rotate-90 text-[120px] font-display font-black text-white/5 pointer-events-none uppercase">
                HỒ SƠ BẮC
              </div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 border-b-[6px] border-white pb-8">
                  <div className="w-20 h-20 bg-crimson border-[6px] border-white text-white flex items-center justify-center shadow-[6px_6px_0_#000] rotate-3 shrink-0">
                    <Flag size={40} />
                  </div>
                  <div>
                    <h3 className="font-display text-5xl font-black text-white uppercase tracking-tighter">Miền Bắc</h3>
                    <div className="bg-white text-ink font-mono font-bold text-sm px-4 py-1 mt-2 inline-block border-[4px] border-ink shadow-[4px_4px_0_#D32F2F]">
                      VIỆT NAM DÂN CHỦ CỘNG HÒA
                    </div>
                  </div>
                </div>

                <div className="space-y-6 text-bone text-xl md:text-2xl font-medium leading-relaxed">
                  <p>
                    Củng cố một nhà nước xã hội chủ nghĩa dưới sự lãnh đạo của Đảng Lao động. Cải cách ruộng đất (1953–56) giúp phân chia lại quyền sở hữu, trong khi công nghiệp hóa được tiến hành với sự hỗ trợ từ Liên Xô và Trung Quốc.
                  </p>
                  <p>
                    Bất đồng nội bộ bị kiểm soát nghiêm ngặt — từ những tiếng nói trong phong trào Nhân Văn – Giai Phẩm, án trí người Công giáo, cho đến các cuộc tranh luận chiến lược trong nội bộ Đảng.
                  </p>
                  <div className="bg-white text-ink border-[6px] border-ink p-6 mt-8 font-mono font-bold text-lg shadow-[8px_8px_0_#000] transform -rotate-1">
                    Miền Bắc không phải là một khối đồng nhất hoàn toàn. Tranh luận nội bộ về chiến lược là đa chiều.
                  </div>
                </div>
              </div>
            </div>

            {/* SOUTH */}
            <div className="bg-[#F0F0F0] text-ink p-10 md:p-16 relative overflow-hidden">
              <div className="absolute -right-8 top-12 rotate-90 text-[120px] font-display font-black text-ink/5 pointer-events-none uppercase">
                HỒ SƠ NAM
              </div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 border-b-[6px] border-ink pb-8">
                  <div className="w-20 h-20 bg-blue border-[6px] border-ink text-white flex items-center justify-center shadow-[6px_6px_0_#D32F2F] -rotate-3 shrink-0">
                    <Shield size={40} />
                  </div>
                  <div>
                    <h3 className="font-display text-5xl font-black text-ink uppercase tracking-tighter">Miền Nam</h3>
                    <div className="bg-ink text-white font-mono font-bold text-sm px-4 py-1 mt-2 inline-block border-[4px] border-ink shadow-[4px_4px_0_#1976D2]">
                      VIỆT NAM CỘNG HÒA
                    </div>
                  </div>
                </div>

                <div className="space-y-6 text-ink text-xl md:text-2xl font-medium leading-relaxed">
                  <p>
                    Ngô Đình Diệm củng cố quyền lực, trấn áp các giáo phái đối thủ, phát động chiến dịch "Tố Cộng" và xây dựng nhà nước tập quyền với viện trợ ồ ạt từ Mỹ.
                  </p>
                  <p>
                    Chống đối trong nước lan rộng: bản Tuyên cáo Caravelle (1960), chương trình Ấp chiến lược gây phẫn nộ, Khủng hoảng Phật giáo (1963) dẫn đến cái chết của Diệm trong một cuộc đảo chính quân sự.
                  </p>
                  <div className="bg-ink text-white border-[6px] border-white p-6 mt-8 font-mono font-bold text-lg shadow-[8px_8px_0_#D32F2F] transform rotate-1">
                    Rạn nứt nội bộ do khủng hoảng tính chính danh là bằng chứng trọng yếu cho luận điểm nội chiến.
                  </div>
                </div>
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
        className="items-center justify-center px-4 md:px-10 bg-white border-b-[8px] border-ink py-32"
      >
        <div className="max-w-screen-xl mx-auto w-full">
          <div className="bg-ink text-white font-mono text-sm font-bold uppercase tracking-widest px-6 py-2 inline-block border-[6px] border-ink border-b-0 mb-[-6px] relative z-20">
            HỒ SƠ TÌNH BÁO / ĐÁNH GIÁ CHIẾN LƯỢC
          </div>
          <div className="border-[8px] border-ink bg-[#FAFAFA] shadow-[16px_16px_0_0_#D32F2F] p-10 md:p-16 relative z-10">
            <h2 className="text-[clamp(3.5rem,5.5vw,5.5rem)] font-display font-black text-ink uppercase leading-none mb-8 tracking-tighter drop-shadow-[4px_4px_0_#FFF]">
              Chiến lược Vận động<br/>của Đảng Cộng sản
            </h2>
            <p className="font-body text-2xl font-bold text-ink mb-16 max-w-4xl border-l-[8px] border-crimson pl-6">
              Chiến lược của Đảng trả lời thế nào cho câu hỏi về hệ quả nội chiến? Trọng tâm phụ thuộc vào việc bạn nhấn mạnh sự chỉ đạo từ miền Bắc hay quyền chủ động đòi hỏi vũ trang từ miền Nam.
            </p>

            <div className="grid md:grid-cols-2 gap-0 border-[6px] border-ink shadow-[12px_12px_0_0_#000]">
              {/* Political strategy */}
              <div className="relative border-b-[6px] md:border-b-0 md:border-r-[6px] border-ink p-10 bg-white">
                <h3 className="font-display text-4xl font-black text-ink uppercase mb-6 bg-crimson text-white inline-block px-4 py-2 border-[4px] border-ink shadow-[4px_4px_0_#000]">
                  GIAI ĐOẠN ĐẤU TRANH CHÍNH TRỊ
                </h3>
                <div className="space-y-6 text-xl md:text-2xl text-ink font-medium leading-relaxed">
                  <p>
                    Ngay sau Geneva, sự chú ý ban đầu của Đảng là huy động chính trị trong Nam, kỳ vọng rằng cuộc bầu cử thống nhất sẽ giải quyết sự chia rẽ hòa bình. Khi bầu cử bị chặn đứng, các cán bộ miền Nam dấy lên sức ép, đòi hỏi quyền vũ trang đánh trả sự đàn áp của chính quyền Diệm.
                  </p>
                  <p className="bg-bone text-ink border-[4px] border-ink p-6 font-bold shadow-[6px_6px_0_#D32F2F] transform -rotate-1 mt-6">
                    Giai đoạn này hỗ trợ luận điểm nội chiến: yêu cầu vũ trang xuất phát một phần từ dưới lên để tự vệ trước các điều kiện áp bức.
                  </p>
                </div>
              </div>

              {/* Military strategy */}
              <div className="relative p-10 bg-[#EEEEEE]">
                <h3 className="font-display text-4xl font-black text-ink uppercase mb-6 bg-blue text-white inline-block px-4 py-2 border-[4px] border-ink shadow-[4px_4px_0_#000]">
                  GIAI ĐOẠN CHUYỂN HƯỚNG QUÂN SỰ
                </h3>
                <div className="space-y-6 text-xl md:text-2xl text-ink font-medium leading-relaxed">
                  <p>
                    Nghị quyết 15 (1959) chính thức cho phép đấu tranh vũ trang. Đoàn 559 thiết lập đường Hồ Chí Minh. Đến năm 1963, khi Sài Gòn thoái trào vì biến động nội bộ, Hà Nội đã chủ động gia tăng thiết bị và quân lực cho chiến tuyến.
                  </p>
                  <p className="bg-ink text-white border-[4px] border-ink p-6 font-bold shadow-[6px_6px_0_#1976D2] transform rotate-1 mt-6">
                    Giai đoạn này củng cố góc nhìn về cuộc nổi dậy có chỉ đạo: Hà Nội tiến hành điều phối hậu cần và tổ chức bộ máy xuyên suốt ranh giới.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 brutal-card bg-ink text-white border-[8px] border-ink p-10 max-w-5xl shadow-[16px_16px_0_0_#D32F2F] relative z-20 md:-mr-12 md:-mb-12">
              <p className="font-body text-2xl font-bold leading-relaxed">
                Dù là chiến lược chính trị hay quân sự, sự tùy biến của Đảng cho thấy cuộc chiến mang cả dáng dấp của một cuộc nổi dậy có chỉ đạo lẫn một cuộc đánh trả tự phát từ cơ sở. Sự dịch chuyển từ đấu tranh chính trị sang quân sự là sự phản ứng không ngừng trước áp lực của cán bộ nằm vùng và các chính sách khốc liệt của Diệm.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ INTERPRETED TIMELINE ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-paper border-b-[6px] border-ink"
      >
        <div className="max-w-screen-lg mx-auto w-full py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-fluid-6xl font-black uppercase mb-4 text-ink drop-shadow-[4px_4px_0px_#D32F2F]">
              Mốc Thời Gian: 1954–1965
            </h2>
            <p className="text-ink font-bold text-xl max-w-2xl mx-auto">
              Không chỉ là những gì đã xảy ra — mà là lý do mỗi sự kiện càng làm phức tạp thêm câu hỏi nghiên cứu.
            </p>
          </div>

          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-[22px] md:left-[30px] top-0 bottom-0 border-l-[6px] border-[#1976D2]"></div>

            <div className="space-y-16">
              {timelineData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[13px] md:left-[21px] top-1 w-6 h-6 bg-crimson border-[4px] border-ink z-10 hover:scale-110 hover:shadow-[4px_4px_0_#000] transition-all cursor-default"></div>

                  {/* Year badge */}
                  <div className="inline-block font-mono text-3xl font-black text-white bg-blue border-[4px] border-ink shadow-[4px_4px_0_#000] px-4 py-1 mb-4">
                    {item.year}
                  </div>

                  {/* Event card */}
                  <div className="border-[4px] border-ink bg-white shadow-[12px_12px_0_#000] p-8 hover:-translate-y-2 hover:shadow-[16px_16px_0_#000] transition-transform">
                    <div className="font-display text-fluid-2xl font-bold uppercase text-ink leading-tight mb-4 border-b-[4px] border-ink pb-2">
                      {item.event}
                    </div>
                    <p className="font-body text-xl text-[#212121] mb-8 font-medium">
                      {item.detail}
                    </p>
                  
                    {/* Interpretation piece */}
                    <div className="border-[4px] border-ink p-6 bg-[#FAFAFA] shadow-[8px_8px_0_#D32F2F] relative">
                      <div className="absolute -top-4 -left-2 bg-crimson text-white border-[4px] border-ink px-3 py-1 font-mono text-sm font-bold shadow-[4px_4px_0_#000] rotate-[-2deg]">
                        QUAN ĐIỂM TRANH LUẬN
                      </div>
                      <p className="font-body text-lg text-ink font-bold leading-relaxed mt-2">
                        {item.interpretation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ SYNTHESIS + TRANSITION CTA ═══════════ */}
      <Section className="items-center justify-center bg-ink border-t-[8px] border-crimson py-32">
        <div className="max-w-screen-md mx-auto text-center relative z-10">
          <div className="absolute -top-[52px] right-0 bg-crimson text-white font-display font-black text-2xl uppercase px-8 py-3 border-[8px] border-b-0 border-white">
            KẾT LUẬN & CHUYỂN TIẾP
          </div>
          <div className="space-y-8 text-2xl md:text-3xl text-ink font-bold leading-relaxed border-[8px] border-white shadow-[20px_20px_0_0_#D32F2F] p-12 md:p-16 bg-white text-left">
            <p className="border-l-[8px] border-ink pl-6">
              Bạn đang nắm trong tay nền móng lịch sử. Những tham vọng là xác thực, những hố sâu ngăn cách là có thật, và bạo lực đã leo thang vuột khỏi tầm nhìn của chính những người tham dự.
            </p>
            <p className="bg-ink text-white p-6 md:p-8 transform rotate-1 shadow-[8px_8px_0_#000]">
              Câu hỏi khó nhất nằm ở phía trước: ba luồng tư tưởng lịch sử vạch ra ba hệ luận đối lập — và toàn bộ bằng chứng mà bạn vừa đọc đều chỉ vào một khu vực màu xám giữa các lằn ranh đó.
            </p>

            <div className="mt-16 text-center">
              <Button
                variant="danger"
                size="lg"
                onClick={() => navigate("/tranh-luan-ket-luan")}
                className="gap-4 text-xl md:text-2xl px-12 py-6 border-[6px] border-ink shadow-[8px_8px_0_#000] hover:shadow-[16px_16px_0_#000] hover:-translate-y-2 uppercase font-black"
              >
                Bước Vào Vòng Tranh Luận <ArrowRight size={28} strokeWidth={4} />
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default BoMayNhaNuocPage;

