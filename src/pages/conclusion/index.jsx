import { motion } from "framer-motion";
import Section from "../../components/layout/Section";
import {
  ArrowDown,
} from "lucide-react";

const historiographyData = [
  {
    school: "Chính thống / Tự do",
    coreArg: "Sự can thiệp của Hoa Kỳ là một sai lầm trong một cuộc nội chiến mà họ không hiểu rõ.",
    evidence: "Sự phân hóa sâu sắc trong xã hội Việt Nam; bất ổn nội bộ miền Nam; sự ủng hộ của dân chúng dành cho Mặt trận Dân tộc Giải phóng.",
    limitation: "Có xu hướng đánh giá thấp mức độ chỉ đạo và phối hợp chiến lược từ Hà Nội.",
  },
  {
    school: "Xét lại / Cánh hữu",
    coreArg: "Cuộc chiến là một phần của Chiến tranh Lạnh toàn cầu; sự can thiệp của Mỹ là chính đáng để chống lại sự bành trướng của cộng sản.",
    evidence: "Nghị quyết 15; Hệ thống hậu cần đường Hồ Chí Minh; mục tiêu thống nhất được Hà Nội tuyên bố công khai.",
    limitation: "Hạ thấp những bất mãn chính đáng của người miền Nam và các cuộc khủng hoảng tính chính danh nội bộ của VNCH.",
  },
  {
    school: "Chính thống Việt Nam",
    coreArg: "Một cuộc đấu tranh giải phóng dân tộc chống lại chủ nghĩa đế quốc Mỹ và chính quyền tay sai.",
    evidence: "Tính liên tục của phong trào chống thực dân; các vi phạm Hiệp định Geneva; sự bảo trợ của nước ngoài đối với VNCH.",
    limitation: "Phủ nhận mọi chiều kích nội chiến; miêu tả mọi phong trào đối lập ở miền Nam đều do thế lực bên ngoài áp đặt.",
  },
  {
    school: "Lấy Việt Nam làm trung tâm",
    coreArg: "Cuộc xung đột phải được hiểu qua các động lực chính trị của người Việt, không chỉ qua khuôn khổ Chiến tranh Lạnh.",
    evidence: "Sự cạnh tranh của các hệ tư tưởng dân tộc chủ nghĩa Việt Nam; sự đàn áp nội bộ ở cả hai miền; quyền chủ động của các nhân tố miền Nam.",
    limitation: "Có thể đánh giá thấp tác động mang tính thay đổi của sự can thiệp từ các siêu cường đối với bản chất cuộc xung đột.",
  },
];

const DangVaNhanDanPage = () => {
  return (
    <div className="transition-shell w-full bg-bone scroll-container-fluid font-body">
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
                HỒ SƠ 02 — KẾT LUẬN & ĐÁNH GIÁ
              </span>
            </div>
            <div className="text-crimson font-mono text-[10px] font-bold uppercase tracking-widest border-2 border-crimson px-2 py-0.5 mt-2 rotate-2 opacity-80 bg-white">
              [ BẢN ĐÁNH GIÁ CUỐI CÙNG ]
            </div>
          </motion.div>

          <div className="relative text-center mt-8">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.25, ease: "linear" }}
              className="font-display font-black text-[clamp(4.5rem,8vw,8rem)] uppercase text-ink leading-[0.85] tracking-tighter drop-shadow-[8px_8px_0_#F9F9F9] mb-4"
            >
              TRANH LUẬN
            </motion.h1>
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.25, ease: "linear" }}
              className="font-display font-black text-[clamp(4.5rem,8vw,8rem)] uppercase text-white bg-ink px-8 py-2 border-[6px] border-ink leading-[0.85] tracking-tighter drop-shadow-[8px_8px_0_#D32F2F] mt-4 rotate-1 inline-block shadow-[16px_16px_0_rgba(0,0,0,0.2)]"
            >
              VỀ CUỘC CHIẾN
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-body text-2xl font-bold text-ink mt-8 max-w-xl mx-auto bg-white px-4 py-2 border-[4px] border-ink shadow-[6px_6px_0_#1976D2] -rotate-1"
            >
              Ba trường phái tư tưởng. Những bằng chứng đối lập. Một hệ luận.
            </motion.p>
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

      {/* ═══════════ APPROACHING THE DEBATE ═══════════ */}
      <Section className="items-center justify-center bg-ink text-bone py-32 border-b-[8px] border-blue">
        <div className="max-w-screen-md mx-auto relative z-10 border-[6px] border-bone p-10 md:p-16">
          <div className="absolute -top-[30px] left-[-6px] bg-bone text-ink font-mono font-bold text-sm tracking-widest uppercase px-6 py-2 border-[6px] border-b-0 border-bone">
            HƯỚNG DẪN ĐỌC TÀI LIỆU
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-3xl md:text-4xl text-bone leading-tight font-bold"
          >
            Bạn đã nắm được nền tảng lịch sử. Bạn hiểu về sự chia cắt, về hai nhà nước
            đối đầu, và những điều kiện dẫn đến tranh chấp. Trang này đi sâu vào
            trung tâm của diễn ngôn: cách các sử gia giải mã những dữ kiện ấy — và
            hệ thống bằng chứng nào thực sự đứng vững.
          </motion.p>
        </div>
      </Section>

      {/* ═══════════ THE CENTRAL DEBATE ═══════════ */}
      <Section className="items-center justify-center px-4 md:px-10 bg-[#FAFAFA] text-ink border-b-[8px] border-ink py-32">
        <div className="max-w-screen-lg mx-auto w-full relative z-10">
          <div className="relative z-10 mb-16 w-fit mx-auto text-center">
            <h2 className="text-[clamp(3rem,5vw,5rem)] font-display font-black text-ink uppercase leading-none bg-paper border-[8px] border-ink p-8 shadow-[16px_16px_0px_#1976D2]">
              Trọng Tâm<br/>Tranh Luận
            </h2>
            <p className="font-body text-ink font-bold text-2xl mt-8 max-w-2xl mx-auto bg-gold/30 px-4 py-2">
              Mọi diễn ngôn lịch sử đều xoay quanh việc trả lời hai câu hỏi cốt lõi này.
            </p>
          </div>

          <div className="space-y-16 max-w-4xl mx-auto relative">
            {/* Background connecting line */}
            <div className="absolute left-1/2 top-10 bottom-10 w-[8px] bg-ink -translate-x-1/2 z-0 hidden md:block"></div>

            {/* Question A */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10 brutal-card bg-white border-[8px] border-ink p-10 md:p-16 shadow-[16px_16px_0_0_#D32F2F] md:mr-16 transform transition-transform hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 bg-crimson text-white font-mono font-bold px-6 py-2 border-l-[8px] border-b-[8px] border-ink text-lg uppercase tracking-widest">
                [ CÂU HỎI 01 ]
              </div>
              <h3 className="font-display text-fluid-4xl font-black text-ink uppercase mt-12 mb-8 leading-tight">
                Đó có phải là một cuộc nội chiến?
              </h3>
              <p className="font-body text-2xl font-bold text-ink leading-relaxed">
                Phải chăng cuộc xung đột về cơ bản là giữa những tầm nhìn chính trị Việt Nam đối lập —
                cách mạng xã hội chủ nghĩa so với cộng hòa chống cộng — được thực hiện chủ yếu
                bởi người Việt ở cả hai miền vì tương lai của quốc gia họ?
              </p>
              <p className="text-xl font-mono font-bold text-ink border-l-[8px] border-[#1976D2] pl-6 mt-8 p-4 bg-[#EEEEEE]">
                Cách đóng khung này đề cao quyền tự quyết của người Việt và sự phân định sâu sắc trong nội bộ xã hội.
              </p>
            </motion.div>

            {/* OR text */}
            <div className="relative z-20 text-center hidden md:block">
              <span className="font-display font-black text-4xl bg-ink text-white px-6 py-4 border-[6px] border-white shadow-[8px_8px_0_#000] rounded-full inline-block">MẶT KHÁC</span>
            </div>

            {/* Question B */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative z-10 brutal-card bg-ink text-white border-[8px] border-ink p-10 md:p-16 shadow-[16px_16px_0_0_#1976D2] md:ml-16 transform transition-transform hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 bg-blue text-white font-mono font-bold px-6 py-2 border-r-[8px] border-b-[8px] border-ink text-lg uppercase tracking-widest">
                [ CÂU HỎI 02 ]
              </div>
              <h3 className="font-display text-fluid-4xl font-black text-white uppercase mt-12 mb-8 leading-tight">
                Hay giải phóng dân tộc?
              </h3>
              <p className="font-body text-2xl font-bold text-white leading-relaxed">
                Phải chăng đây chủ yếu là cuộc chiến chống lại sự thống trị có can thiệp ngoại bang —
                sự nối tiếp của phong trào chống thực dân, chiến đấu vì độc lập thống nhất
                chống lại chế độ được Mỹ bảo trợ?
              </p>
              <p className="text-xl font-mono font-bold text-ink bg-white border-[6px] border-white mt-8 p-6 shadow-[8px_8px_0_#D32F2F] -rotate-1 inline-block">
                Cách tiếp cận này đề cao chủ nghĩa dân tộc và xem xét khía cạnh can thiệp của nước ngoài.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════ TWO SIDES OF THE DEBATE ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-[#EEEEEE] border-b-[8px] border-ink py-32"
      >
        <div className="max-w-screen-2xl mx-auto w-full relative z-10">
          <div className="text-center mb-20 relative">
            <div className="bg-ink text-white font-mono text-sm font-bold uppercase tracking-widest px-6 py-2 inline-block border-[6px] border-ink border-b-0 mb-[-6px] relative z-20">
              TRÍCH LỤC LẬP LUẬN
            </div>
            <h2 className="font-display text-[clamp(4rem,6vw,6rem)] font-black uppercase text-ink tracking-tighter leading-none bg-white border-[8px] border-ink p-10 shadow-[20px_20px_0_#000] inline-block relative z-10">
              Hai Mặt Tranh Luận
            </h2>
            <p className="text-ink font-bold max-w-3xl mx-auto text-2xl mt-12 mb-8 bg-gold/20 inline-block px-4 py-2 border-[4px] border-ink transform -rotate-1">
              Đây là những lập trường học thuật nghiêm túc. Mỗi góc nhìn nắm bắt một phần bản chất chân thực của cuộc chiến.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-0 max-w-7xl mx-auto mt-16 border-[8px] border-ink shadow-[24px_24px_0_0_#000]">
            {/* PRO CIVIL WAR - 60% */}
            <div className="w-full lg:w-[60%] border-b-[8px] lg:border-b-0 lg:border-r-[8px] border-ink p-10 md:p-16 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-6 bg-crimson border-b-[6px] border-ink"></div>
              <div className="absolute -left-10 top-1/2 -rotate-90 text-[100px] font-display font-black text-ink/5 pointer-events-none whitespace-nowrap uppercase">
                TRƯỜNG PHÁI 1
              </div>
              <h3 className="font-display text-[clamp(2.5rem,4vw,4rem)] font-black text-ink uppercase mt-8 mb-12 leading-none tracking-tighter drop-shadow-[2px_2px_0_#F9F9F9] border-b-[8px] border-ink pb-6 relative z-10">
                Tại sao đây là <span className="text-crimson">NỘI CHIẾN?</span>
              </h3>
              <ul className="space-y-8 text-ink leading-relaxed font-bold text-2xl relative z-10">
                <li className="flex items-start gap-6 border-l-[6px] border-crimson pl-6 pb-2">
                  <span>Cả miền Bắc và Nam phản ánh các dự án chính trị thực sự của người Việt với nguồn ủng hộ riêng — không chỉ là sản phẩm tạo lập ngoại lai.</span>
                </li>
                <li className="flex items-start gap-6 border-l-[6px] border-crimson pl-6 pb-2">
                  <span>Sự phân hóa xã hội và tư tưởng sâu sắc xuất phát từ bên trong Việt Nam, thay vì chỉ là hậu quả bảo trợ của hai khối đối lập.</span>
                </li>
                <li className="flex items-start gap-6 border-l-[6px] border-crimson pl-6 pb-2">
                  <span>Lực lượng tham chiến chủ yếu do người Việt tự đảm trách, và các thế lực nội bộ đe dọa chính quyền miền Nam tự phát mà ra.</span>
                </li>
                <li className="flex items-start gap-6 border-l-[6px] border-crimson pl-6 pb-2">
                  <span>Cả hai nhà nước đều áp dụng chính sách kỷ luật chính trị lên người dân — dấu hiệu điển hình của xung đột diện nội chiến.</span>
                </li>
              </ul>
            </div>

            {/* AGAINST CIVIL WAR - 40% */}
            <div className="w-full lg:w-[40%] p-10 md:p-16 bg-[#1976D2] relative text-white overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-6 bg-white border-b-[6px] border-ink"></div>
              <div className="absolute -right-10 top-1/2 rotate-90 text-[100px] font-display font-black text-white/10 pointer-events-none whitespace-nowrap uppercase">
                TRƯỜNG PHÁI 2
              </div>
              <h3 className="font-display text-[clamp(2.5rem,4vw,4rem)] font-black uppercase mt-8 mb-12 leading-none tracking-tighter drop-shadow-[4px_4px_0_#000] border-b-[8px] border-white pb-6 relative z-10">
                Tại sao <span className="text-ink bg-white px-2">BÁC BỎ?</span>
              </h3>
              <ul className="space-y-8 leading-relaxed font-bold text-xl relative z-10">
                <li className="flex items-start gap-4">
                  <span className="mt-2 w-4 h-4 border-[4px] border-ink bg-white shrink-0 shadow-[4px_4px_0_#000]"></span>
                  <span>VNDCCH thừa hưởng lòng tin chính trị từ công cuộc chống thực dân, biến cuộc chiến này thành sự tiếp diễn để giải phóng đất nước hơn là sự phân ly.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-2 w-4 h-4 border-[4px] border-ink bg-white shrink-0 shadow-[4px_4px_0_#000]"></span>
                  <span>Nhà nước Việt Nam Cộng hoà phụ thuộc viện trợ quy mô khổng lồ, tài chính và quân lực từ Mỹ mới tồn tại được.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-2 w-4 h-4 border-[4px] border-ink bg-white shrink-0 shadow-[4px_4px_0_#000]"></span>
                  <span>Bực dọc trong nội bộ ở Nam bộ bén rễ tận vấn đề chênh lệch đất đai, bất công tôn giáo — không hoàn toàn chịu sự chỉ đạo từ phương Bắc.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-2 w-4 h-4 border-[4px] border-ink bg-white shrink-0 shadow-[4px_4px_0_#000]"></span>
                  <span>Tuy gọi nó là 'nội chiến', nhưng điều này chứa đầy rủi ro hợp thức hóa cho một tư duy Chiến tranh Lạnh đã bao biện thiết chế của Mỹ.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ HISTORIOGRAPHY ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-bone"
      >
        <div className="max-w-screen-2xl mx-auto w-full py-24">
          <h2 className="font-display text-fluid-5xl font-black uppercase mb-6 text-ink text-center">
            Trường Phái Diễn Ngôn
          </h2>
          <p className="font-body text-lg font-bold text-graphite/80 max-w-3xl mx-auto text-center mb-8">
            Đây chẳng phải là bất đồng hàn lâm suông. Mỗi diễn ngôn định hướng hậu quả của cách mà ta định nghĩa sự tự quyết của người Việt Nam, sự ngụy biện sai trái của nước Mỹ, và bản chất thực của khủng hoảng Chiến tranh Lạnh.
          </p>

          <div className="overflow-x-auto mt-12 bg-white brutal-card p-0 border-[6px] border-ink shadow-[12px_12px_0_0_#000]">
            <table className="w-full text-base">
              <thead>
                <tr className="bg-ink text-white font-display uppercase tracking-wider text-xl">
                  <th className="p-6 text-left border-r-[4px] border-b-[4px] border-ink">Trường phái</th>
                  <th className="p-6 text-left border-r-[4px] border-b-[4px] border-ink w-1/4">Lập luận cốt lõi</th>
                  <th className="p-6 text-left border-r-[4px] border-b-[4px] border-ink w-1/3">Bằng chứng chính</th>
                  <th className="p-6 text-left border-b-[4px] border-ink">Hạn chế</th>
                </tr>
              </thead>
              <tbody className="font-body font-bold">
                {historiographyData.map((row, idx) => (
                  <tr key={idx} className={`border-b-[4px] border-ink last:border-b-0 ${idx % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}`}>
                    <td className="p-6 font-display text-2xl font-black text-ink border-r-[4px] border-ink">
                      {row.school}
                    </td>
                    <td className="p-6 text-ink border-r-[4px] border-ink text-lg leading-relaxed">{row.coreArg}</td>
                    <td className="p-6 text-ink border-r-[4px] border-ink text-lg leading-relaxed">{row.evidence}</td>
                    <td className="p-6 text-crimson font-mono text-base font-bold leading-relaxed">{row.limitation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-16 brutal-card bg-paper border-l-[12px] border-crimson p-10 md:p-14 max-w-5xl mx-auto border-[6px] border-ink shadow-[12px_12px_0_0_#000]">
            <p className="font-body text-2xl font-bold text-ink leading-relaxed">
              Dưới cả bốn trường phái hiện nay, "Lấy Việt Nam làm trung tâm" đưa ra một thiết chế toàn vẹn nhất — đánh giá nghiêm túc quyền tự chủ của Việt Nam, chịu nhìn nhận sự chia rẽ trong xã hội đối diện thực tế, trong khi không bỏ lỡ tinh hoa dân tộc chống thực dân do diễn ngôn giải phóng mang lại. Yếu điểm không đánh giá cao tác động của siêu cường là một chuyện thực tế, nhưng nó không làm biến dạng lịch sử như cái "điểm mù" của ba trường phái kia.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ EVIDENCE ASSESSMENT ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-ink text-bone border-y-2 border-bone"
      >
        <div className="max-w-screen-2xl mx-auto w-full py-24">
          <h2 className="font-display text-fluid-5xl font-black uppercase mb-6 text-white text-center drop-shadow-[2px_2px_0px_#C89B3C]">
            Đánh Giá Bằng Chứng
          </h2>
          <p className="text-bone/80 font-medium max-w-2xl mx-auto text-center text-xl mb-12">
            Hệ thống bằng chứng thực chất ủng hộ điều gì — và mỗi dữ kiện không thể chứng minh điều gì?
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Civil war evidence */}
            <div className="brutal-card bg-ink border-4 border-bone p-10 shadow-[8px_8px_0_0_#d91c1c]">
              <span className="brutal-badge !bg-bone !text-ink !text-[12px] font-bold">
                ỦNG HỘ NỘI CHIẾN
              </span>
              <div className="mt-8 space-y-8">
                {[
                  { evidence: "Hai nhà nước Việt Nam kình địch với thế chế chính trị đối lập", suggests: "Sự chia rẽ nội bộ thực sự, chứ không phải do áp đặt", fails: "Không phủ nhận ranh giới vĩ tuyến là từ bàn đàm phán Geneva" },
                  { evidence: "Cấu trúc xã hội và tư tưởng phân cực mãnh liệt", suggests: "Xã hội Việt Nam thực ra đã rạn nứt vì ý thức hệ", fails: "Không giúp phân định rõ đâu là mâu thuẫn nội chiến, đâu là động lực cách mạng" },
                  { evidence: "Khủng hoảng trong nội bộ VNCH đều nảy sinh từ trong nước", suggests: "Rễ rễ xung đột hoàn toàn độc lập với tác nhân ngoại quốc", fails: "Chưa cân nhắc thỏa đáng độ phủ của viện trợ Mỹ về mặt cấu trúc" },
                ].map((item, idx) => (
                  <div key={idx} className="border-b-2 border-bone/30 pb-6 last:border-none">
                    <p className="text-bone text-base font-bold leading-relaxed">{item.evidence}</p>
                    <p className="text-bone/80 font-mono font-bold text-sm mt-4">→ Củng cố: {item.suggests}</p>
                    <p className="text-bone/50 font-mono font-bold text-sm mt-2">✗ Bác bỏ: {item.fails}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Liberation evidence */}
            <div className="brutal-card bg-ink border-4 border-bone p-10 shadow-[8px_8px_0_0_#ffd700]">
              <span className="brutal-badge !bg-bone !text-ink !text-[12px] font-bold">
                ỦNG HỘ GIẢI PHÓNG
              </span>
              <div className="mt-8 space-y-8">
                {[
                  { evidence: "Ký ức chống thực dân và chuỗi tiếp nối của chủ nghĩa dân tộc", suggests: "Khát vọng giải phóng chỉ là một phong trào trỗi dậy kéo dài", fails: "Không chứng minh được miền Nam chỉ là bù nhìn — họ có cấu trúc chính trị thực sự" },
                  { evidence: "Mỹ bảo trợ VNCH với quy mô khổng lồ", suggests: "Chính thể miền Nam dựa vào viện trợ nước ngoài để tồn tại", fails: "Viện trợ ngoại quốc không tự động xóa bỏ tính chính danh của một nhà nước" },
                  { evidence: "Sự uất ức nội bộ tạo động lực cho các phong trào đánh trả", suggests: "Sự căm phẫn nhắm vào Diệm hoàn toàn bén rễ từ quốc nội", fails: "Bất mãn cục bộ hoàn toàn khớp với một cuộc nội chiến — chúng không phủ tị nhau" },
                ].map((item, idx) => (
                  <div key={idx} className="border-b-2 border-bone/30 pb-6 last:border-none">
                    <p className="text-bone text-base font-bold leading-relaxed">{item.evidence}</p>
                    <p className="text-bone/80 font-mono font-bold text-sm mt-4">→ Củng cố: {item.suggests}</p>
                    <p className="text-bone/50 font-mono font-bold text-sm mt-2">✗ Bác bỏ: {item.fails}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hybrid evidence */}
            <div className="brutal-card bg-ink border-4 border-bone p-10 shadow-[8px_8px_0_0_#fffdf5]">
              <span className="brutal-badge !bg-bone !text-ink !text-[12px] font-bold">
                TÍNH CHẤT KÉP (HYBRID)
              </span>
              <div className="mt-8 space-y-8">
                {[
                  { evidence: "Chỉ đạo từ miền Bắc song hành cùng lực lượng tham chiến cục bộ của miền Nam", suggests: "Cả tác nhân ngoại khối lẫn nội tại đều vận hành đồng thời", fails: "Không thể làm rõ cán cân quyền lực bên nào cao hơn" },
                  { evidence: "Sự nhúng tay của các siêu cường ở cả hai phe", suggests: "Xung đột đã bị đính kèm vào cấu trúc Chiến tranh Lạnh", fails: "Bàn tay ngoại quốc không quyết định hoàn toàn bản chất cốt lõi của xung đột" },
                  { evidence: "Chẳng có một vỏ bọc mác ngôn nào ôm trọn được mọi góc khuất", suggests: "Cuộc chiến thực sự có cấu tạo đa tầng đa lớp", fails: "Thừa nhận sự phức tạp là cần thiết — nhưng chưa đủ cho một kết luận cụ thể" },
                ].map((item, idx) => (
                  <div key={idx} className="border-b-2 border-bone/30 pb-6 last:border-none">
                    <p className="text-bone text-base font-bold leading-relaxed">{item.evidence}</p>
                    <p className="text-bone/80 font-mono font-bold text-sm mt-4">→ Củng cố: {item.suggests}</p>
                    <p className="text-bone/50 font-mono font-bold text-sm mt-2">✗ Bác bỏ: {item.fails}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ FINAL CONCLUSION — visually dominant ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-[#000000] border-t-[8px] border-crimson border-b-[8px] border-ink"
      >
        <div className="max-w-screen-lg mx-auto w-full relative z-10 py-32 md:py-40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-base font-bold text-white bg-crimson px-4 py-1 uppercase tracking-[0.3em] inline-block mb-10 border-[4px] border-ink shadow-[4px_4px_0_#FFF]">
              KẾT LUẬN
            </span>

            <h2 className="font-display text-fluid-6xl font-black text-white uppercase leading-[1.1] tracking-tight mt-10 mb-24 drop-shadow-[6px_6px_0_#D32F2F]">
              CUỘC CHIẾN MANG <span className="text-crimson bg-white px-2 inline-block border-[4px] border-ink -rotate-1 shadow-[8px_8px_0_#D32F2F]">TÍNH CHẤT KÉP</span> — VÀ 
              MỘT DANH XƯNG ĐƠN LẺ LÀ KHÔNG ĐỦ.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-16 text-left max-w-3xl mx-auto border-[6px] border-ink bg-white p-12 md:p-16 shadow-[16px_16px_0_0_#D32F2F]"
          >
            <div>
              <span className="font-mono font-bold text-lg text-white bg-ink px-3 py-1 uppercase tracking-wider shadow-[4px_4px_0_#D32F2F] -ml-2 mb-4 inline-block">Hệ thống bằng chứng ủng hộ</span>
              <p className="text-2xl text-ink font-bold leading-relaxed mt-4">
                Các bằng chứng củng cố nhận định về một định dạng nội chiến đích thực: hai nhà nước kình địch, sự chia rẽ hệ tư tưởng bám sâu, và bạo lực chính trị hoàn toàn điều hướng bởi áp lực quốc nội. Người Việt ở cả hai ranh giới là chủ thể cốt lõi.
              </p>
            </div>

            <div>
              <span className="font-mono font-bold text-lg text-white bg-ink px-3 py-1 uppercase tracking-wider shadow-[4px_4px_0_#D32F2F] -ml-2 mb-4 inline-block">Mảng tối trong lập luận</span>
              <p className="text-2xl text-ink font-bold leading-relaxed mt-4">
                Tuy vậy, bằng chứng cũng kháng cự lại việc giáng cấp xung đột này xuống chỉ còn là một cuộc nội chiến đơn thuần. Chủ nghĩa dân tộc chống thực dân đã bơm một nguồn sinh khí thực sự cho phong trào; bộ máy miền Nam lún sâu vào sự chống lưng cấu trúc của Mỹ.
              </p>
            </div>

            <div>
              <span className="font-mono font-bold text-lg text-white bg-crimson px-3 py-1 uppercase tracking-wider shadow-[4px_4px_0_#000] -ml-2 mb-4 inline-block">Hệ quả bao quát</span>
              <p className="text-2xl text-ink font-bold leading-relaxed mt-4 bg-[#FAFAFA] p-6 border-[4px] border-ink">
                Quãng thời gian 1954–1965 đã nhào nặn ra một cuộc xung đột đồng thời là nội chiến, giải phóng dân tộc, và một màn ủy nhiệm của Chiến tranh Lạnh — ba nếp gấp chồng chéo không thể tước bỏ nếu không muốn làm biến dạng độ nguyên chất của lịch sử.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-32 w-full text-center"
          >
             <h2 className="font-display font-black text-fluid-5xl uppercase text-white drop-shadow-[4px_4px_0_#1976D2] tracking-wide relative inline-block">
               Bằng Chứng Đòi Hỏi Sự Đa Chiều.
               <div className="absolute -bottom-4 left-0 right-0 h-2 bg-crimson"></div>
             </h2>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ WHAT TO TAKE AWAY — prose epilogue ═══════════ */}
      <Section className="items-center justify-center px-4 md:px-10 bg-[#FAFAFA] border-b-[8px] border-ink py-32">
        <div className="max-w-screen-lg mx-auto w-full relative z-10">
          <h2 className="font-display text-[clamp(4rem,6vw,6rem)] font-black text-ink uppercase text-center mb-16 tracking-tighter drop-shadow-[6px_6px_0_#D32F2F]">
            Hệ Luận Rút Ra
          </h2>

          <div className="relative">
            {/* Folder tab */}
            <div className="absolute -top-[48px] left-0 bg-ink text-white font-mono text-xl font-bold uppercase tracking-widest px-8 py-3 border-[8px] border-b-0 border-ink shadow-[12px_0_0_#D32F2F]">
              ĐÁNH GIÁ CHUNG
            </div>
            
            <div className="brutal-card bg-white border-[8px] border-ink p-10 md:p-16 shadow-[24px_24px_0_0_#D32F2F] relative z-10">
              <div className="space-y-10 text-2xl text-ink font-bold leading-relaxed border-l-[8px] border-ink pl-8 mb-16">
                <p>
                  Những định danh lịch sử không bao giờ là vô thưởng vô phạt — chúng là những vòng kim cô nhận thức tô đậm phần bằng chứng này và xé rách mảng bằng chứng khác. Nếu quy về "nội chiến", ta thấy được vai trò tự quyết của người Việt và những đứt gãy ngay từ bên trong quốc gia; nếu gắn mác "giải phóng", ta bắt gặp mạch ngầm chống thực dân và bàn tay ngoại bang. Cả hai danh xưng đều không trọn vẹn.
                </p>
                <p>
                  Xung đột tại Việt Nam là bằng chứng rành rành cho thấy cách tấm màn lọc Chiến tranh Lạnh đã khoác lên vai cuộc chiến một sự minh định nhân tạo, trong khi ẩn ức nội bộ của bản ngã nó lại chằng chịt hơn nhiều so với những gì Washington hay Hà Nội muốn thừa nhận. Lập trường trung thực nhất về mặt học thuật là khước từ vòng kim cô của những nhãn mác độc tôn, mà hãy ôm vào lòng sự chồng lấn đó bằng tư duy khách quan.
                </p>
              </div>

              <div className="brutal-card bg-ink text-white border-[8px] border-ink p-10 md:p-14 shadow-[16px_16px_0_#D32F2F] transform -rotate-1 relative z-20 md:-mr-12 md:-mb-12">
                <p className="font-black text-2xl md:text-3xl font-mono leading-relaxed underline decoration-4 decoration-crimson underline-offset-8">
                  Tên gọi định hình cách chúng ta phán xét lịch sử. Nếu buông lời cẩu thả, ta đã vô tình vò nát sinh mệnh của hàng trăm nghìn phận người thành một trò mô phỏng địa chính trị rỗng tuếch. Lịch sử không đòi hỏi chúng ta phải chọn phe để phán xét; nó đòi hỏi chúng ta đủ dũng khí để nhìn thẳng vào những mâu thuẫn khốc liệt đan xen mà không vội vã cất chúng vào chiếc hộp dán mác đơn giản.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default DangVaNhanDanPage;

