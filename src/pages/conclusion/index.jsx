import { motion } from "framer-motion";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
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
    <div className="transition-shell w-full bg-bone snap-container font-body">
      {/* ═══════════ HERO ═══════════ */}
      <Section className="items-center justify-center px-4 md:px-10 border-b-2 border-ink bg-bone">
        <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-ink border-4 border-ink px-6 py-2 shadow-hard transform -rotate-1"
          >
            <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-bone">
              Page 2 — Góc Nhìn & Kết Luận
            </span>
          </motion.div>

          <div className="relative text-center">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.25, ease: "linear" }}
              className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase text-ink leading-[0.85] tracking-tighter drop-shadow-[4px_4px_0px_#ffd700]"
            >
              TRANH LUẬN
            </motion.h1>
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.25, ease: "linear" }}
              className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase text-crimson leading-[0.85] tracking-tighter drop-shadow-[4px_4px_0px_#000000]"
            >
              VỀ CUỘC CHIẾN
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-body text-xl font-medium text-graphite/80 mt-6 max-w-xl mx-auto"
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
      <Section className="items-center justify-center bg-ink text-bone">
        <div className="max-w-screen-md mx-auto text-center py-20 relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xl md:text-2xl font-medium text-bone/80 leading-relaxed"
          >
            Bạn đã nắm được nền tảng lịch sử. Bạn hiểu về sự chia cắt, về hai nhà nước
            đối đầu, và những điều kiện dẫn đến cuộc chiến. Trang này sẽ đi sâu vào
            trung tâm của mọi diễn ngôn: cách các sử gia giải mã những dữ kiện ấy — và
            hệ thống bằng chứng nào vững chắc nhất.
          </motion.p>
        </div>
      </Section>

      {/* ═══════════ THE CENTRAL DEBATE ═══════════ */}
      <Section className="items-center justify-center px-4 md:px-10 bg-ink text-bone border-y-2 border-bone">
        <div className="max-w-screen-lg mx-auto relative z-10 py-24">
          <h2 className="font-display text-4xl md:text-6xl font-black text-white uppercase text-center mb-6 tracking-wide drop-shadow-[4px_4px_0_#9B1B30]">
            Trọng Tâm Tranh Luận
          </h2>
          <p className="text-center font-body text-bone/80 text-lg font-medium max-w-2xl mx-auto mb-16">
            Mọi diễn ngôn lịch sử đều xoay quanh việc trả lời hai câu hỏi này. Các sử gia
            đã dành nhiều thập kỷ tranh luận xem khuôn khổ nào thực sự phản ánh
            bản chất của cuộc xung đột.
          </p>

          <div className="space-y-12 max-w-4xl mx-auto">
            {/* Question A */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="brutal-card bg-ink border-4 border-bone p-10 md:p-14 shadow-[12px_12px_0_0_#fffdf5]"
            >
              <span className="brutal-badge !bg-bone !text-ink !text-[12px]">
                QUAN ĐIỂM A
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-black text-white uppercase mt-6 mb-6">
                Đó có phải là một cuộc nội chiến?
              </h3>
              <p className="font-body text-xl font-medium text-bone/90 leading-relaxed">
                Phải chăng cuộc xung đột về cơ bản là giữa những tầm nhìn chính trị Việt Nam đối lập —
                cách mạng xã hội chủ nghĩa so với cộng hòa chống cộng — được thực hiện chủ yếu
                bởi người Việt cả hai miền vì tương lai của quốc gia họ?
              </p>
              <p className="text-base font-mono font-bold text-bone/80 border-t-2 border-bone/30 pt-6 mt-6">
                Cách đóng khung này đề cao quyền tự quyết của người Việt và sự phân định trong nội bộ xã hội.
              </p>
            </motion.div>

            {/* Question B */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="brutal-card bg-ink border-4 border-bone p-10 md:p-14 shadow-[12px_12px_0_0_#ffd700]"
            >
              <span className="brutal-badge !bg-bone !text-ink !text-[12px]">
                QUAN ĐIỂM B
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-black text-white uppercase mt-6 mb-6">
                Hay đấu tranh giải phóng dân tộc?
              </h3>
              <p className="font-body text-xl font-medium text-bone/90 leading-relaxed">
                Phải chăng đây chủ yếu là cuộc chiến chống lại sự thống trị có can thiệp ngoại bang —
                sự tiếp cản của phong trào chống thực dân, chiến đấu vì độc lập thống nhất
                chống lại chế độ được Mỹ bảo trợ thiếu đi tính chính danh thực sự?
              </p>
              <p className="text-base font-mono font-bold text-bone/80 border-t-2 border-bone/30 pt-6 mt-6">
                Cách tiếp cận này đề cao chủ nghĩa dân tộc chống thực dân và sự can thiệp của nước ngoài.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════ TWO SIDES OF THE DEBATE ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-white border-y-2 border-ink"
      >
        <div className="max-w-screen-2xl mx-auto w-full py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase text-ink mb-6 drop-shadow-[2px_2px_0_#C89B3C]">
              Hai Mặt Của Tranh Luận
            </h2>
            <p className="text-graphite font-medium max-w-3xl mx-auto text-xl">
              Đây là những lập trường học thuật nghiêm túc, thay vì những luận điểm chính trị áp đặt. Mỗi góc nhìn nắm bắt một phần bản chất chân thực của cuộc chiến.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
            {/* PRO CIVIL WAR */}
            <div className="brutal-card border-x-8 border-x-crimson p-10 bg-paper shadow-hard">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-ink uppercase mb-8 drop-shadow-[2px_2px_0px_#d91c1c]">
                Tại sao đây là NỘI CHIẾN?
              </h3>
              <ul className="space-y-8 text-ink leading-relaxed font-bold text-lg">
                <li className="flex items-start gap-4">
                  <span className="mt-2 w-4 h-4 border-2 border-ink shadow-hard-sm bg-crimson shrink-0"></span>
                  <span>Cả miền Bắc và Nam phản ánh các dự án chính trị thực sự của người Việt với nguồn ủng hộ riêng — không chỉ là sản phẩm tạo lập ngoại lai.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-2 w-4 h-4 border-2 border-ink shadow-hard-sm bg-crimson shrink-0"></span>
                  <span>Sự phân hóa xã hội và tư tưởng sâu sắc xuất phát từ bên trong Việt Nam, thay vì chỉ là hậu quả bảo trợ của hai khối đối lập.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-2 w-4 h-4 border-2 border-ink shadow-hard-sm bg-crimson shrink-0"></span>
                  <span>Lực lượng tham chiến chủ yếu do người Việt tự đảm trách, và các thế lực nội bộ đe dọa chính quyền miền Nam tự phát mà ra.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-2 w-4 h-4 border-2 border-ink shadow-hard-sm bg-crimson shrink-0"></span>
                  <span>Cả hai nhà nước đều áp dụng chính sách kỷ luật chính trị lên người dân — dấu hiệu điển hình của xung đột trong nước chứ không phải xâm lược ngoài luồng.</span>
                </li>
              </ul>
            </div>

            {/* AGAINST CIVIL WAR */}
            <div className="brutal-card border-x-8 border-x-ink p-10 bg-bone shadow-hard">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-ink uppercase mb-8 drop-shadow-[2px_2px_0px_#fffdf5]">
                Tại sao bác bỏ danh xưng trên?
              </h3>
              <ul className="space-y-8 text-graphite/90 leading-relaxed font-bold text-lg">
                <li className="flex items-start gap-4">
                  <span className="mt-2 w-4 h-4 border-2 border-ink shadow-hard-sm bg-ink shrink-0"></span>
                  <span>VNDCCH thừa hưởng lòng tin chính trị từ công cuộc chống thực dân, biến cuộc chiến này thành sự tiếp diễn để giải phóng đất nước hơn là sự phân ly.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-2 w-4 h-4 border-2 border-ink shadow-hard-sm bg-ink shrink-0"></span>
                  <span>Nhà nước phụ thuộc viện trợ quy mô khổng lồ, tài chính và quân lực từ Mỹ mới tồn tại được.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-2 w-4 h-4 border-2 border-ink shadow-hard-sm bg-ink shrink-0"></span>
                  <span>Bực dọc trong nội bộ ở Nam bộ bén rễ tận vấn đề chênh lệch đất đai, bất công tôn giáo — không hoàn toàn chịu sự chỉ đạo từ phương Bắc.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-2 w-4 h-4 border-2 border-ink shadow-hard-sm bg-ink shrink-0"></span>
                  <span>Tuy gọi nó là 'nội chiến', nhưng điều này chứa đầy rủi ro hợp thức hóa cho một tư duy Chiến tranh Lạnh đã bao biện cho hành vi của Mỹ ngay từ đầu.</span>
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
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-6 text-ink text-center">
            Trường Phái Diễn Ngôn
          </h2>
          <p className="font-body text-lg font-bold text-graphite/80 max-w-3xl mx-auto text-center mb-8">
            Đây chẳng phải là bất đồng hàn lâm suông. Mỗi diễn ngôn định hướng hậu quả của cách mà ta định nghĩa sự tự quyết của người Việt Nam, sự ngụy biện sai trái của nước Mỹ, và bản chất thực của khủng hoảng Chiến tranh Lạnh.
          </p>

          <div className="overflow-x-auto mt-12 bg-paper brutal-card p-0 border-4 border-ink shadow-[8px_8px_0_0_#1C1C1A]">
            <table className="w-full text-base">
              <thead>
                <tr className="bg-ink text-bone font-display uppercase tracking-wider">
                  <th className="p-5 text-left border-r-4 border-b-4 border-ink">Trường phái</th>
                  <th className="p-5 text-left border-r-4 border-b-4 border-ink w-1/4">Lập luận cốt lõi</th>
                  <th className="p-5 text-left border-r-4 border-b-4 border-ink w-1/3">Bằng chứng chính</th>
                  <th className="p-5 text-left border-b-4 border-ink">Hạn chế</th>
                </tr>
              </thead>
              <tbody className="font-body">
                {historiographyData.map((row, idx) => (
                  <tr key={idx} className={`border-b-4 border-ink last:border-b-0 ${idx % 2 === 0 ? "bg-white" : "bg-bone"}`}>
                    <td className="p-5 font-display text-lg font-bold text-ink border-r-4 border-ink">
                      {row.school}
                    </td>
                    <td className="p-5 text-ink border-r-4 border-ink font-medium leading-relaxed">{row.coreArg}</td>
                    <td className="p-5 text-ink border-r-4 border-ink font-medium leading-relaxed">{row.evidence}</td>
                    <td className="p-5 text-ink font-mono italic text-sm font-bold leading-relaxed">{row.limitation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 brutal-card bg-bone border-l-8 border-gold p-8 max-w-4xl mx-auto border-4 border-ink shadow-hard">
            <p className="font-body text-lg font-medium text-ink leading-relaxed">
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
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-6 text-white text-center drop-shadow-[2px_2px_0px_#C89B3C]">
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
        className="items-center justify-center px-4 md:px-10 bg-ink border-t-8 border-crimson"
      >
        <div className="max-w-screen-md mx-auto w-full relative z-10 py-32 md:py-40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs font-bold text-gold/60 uppercase tracking-[0.3em]">
              KẾT LUẬN
            </span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase leading-[0.9] tracking-tight mt-6 mb-16">
              CUỘC CHIẾN MANG <span className="text-crimson">TÍNH CHẤT KÉP</span> — VÀ 
              MỘT DANH XƯNG ĐƠN LẺ LÀ KHÔNG ĐỦ.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-12 text-left max-w-2xl mx-auto"
          >
            <div>
              <span className="font-mono font-bold text-sm text-gold uppercase tracking-wider">Hệ thống bằng chứng ủng hộ</span>
              <p className="text-xl text-white/90 font-medium leading-relaxed mt-4">
                Các bằng chứng củng cố nhận định về một định dạng nội chiến đích thực: hai nhà nước kình địch, sự chia rẽ hệ tư tưởng bám sâu, và bạo lực chính trị hoàn toàn điều hướng bởi áp lực quốc nội. Người Việt ở cả hai ranh giới là chủ thể cốt lõi — chứ không chỉ là công cụ cho ván cờ siêu cường.
              </p>
            </div>

            <div>
              <span className="font-mono font-bold text-sm text-gold uppercase tracking-wider">Mảng tối trong lập luận</span>
              <p className="text-xl text-white/90 font-medium leading-relaxed mt-4">
                Tuy vậy, bằng chứng cũng kháng cự lại việc giáng cấp xung đột này xuống chỉ còn là một cuộc nội chiến đơn thuần. Chủ nghĩa dân tộc chống thực dân đã bơm một nguồn sinh khí thực sự cho phong trào; bộ máy miền Nam lún sâu vào sự chống lưng cấu trúc của Mỹ; và bàn tay của các cường quốc đã uốn nắn quá trình leo thang, trường kỳ, lẫn mức độ tàn khốc của đường đạn.
              </p>
            </div>

            <div>
              <span className="font-mono font-bold text-sm text-gold uppercase tracking-wider">Hệ quả bao quát</span>
              <p className="text-xl text-white/90 font-medium leading-relaxed mt-4">
                Quãng thời gian 1954–1965 đã nhào nặn ra một cuộc xung đột đồng thời là nội chiến, giải phóng dân tộc, và một màn ủy nhiệm của Chiến tranh Lạnh — ba nếp gấp chồng chéo không thể tước bỏ nếu không muốn làm biến dạng độ nguyên chất của lịch sử.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-24 pt-16 border-t-[3px] border-bone/20"
          >
            <p className="font-display text-3xl md:text-4xl font-black text-crimson uppercase leading-tight max-w-2xl mx-auto drop-shadow-[2px_2px_0_#FFF]">
              Một thẻ tên đơn độc không thể lột tả hết. Bằng chứng đòi hỏi một góc nhìn đủ sức níu giữ cả ba chiều không gian đó cùng lúc.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ WHAT TO TAKE AWAY — prose epilogue ═══════════ */}
      <Section className="items-center justify-center px-4 md:px-10 bg-bone border-t-2 border-ink">
        <div className="max-w-screen-md mx-auto w-full relative z-10 py-24">
          <h2 className="font-display text-4xl md:text-5xl font-black text-ink uppercase text-center mb-12 drop-shadow-[2px_2px_0_#9B1B30]">
            Hệ Luận Rút Ra
          </h2>

          <div className="brutal-card bg-paper border-4 border-ink p-10 md:p-14 shadow-[12px_12px_0_0_#1C1C1A]">
            <div className="space-y-8 text-xl text-ink font-medium leading-relaxed">
              <p>
                Những định danh lịch sử không bao giờ là những miêu tả vô thưởng vô phạt — chúng là những vòng kim cô nhận thức tô đậm phần bằng chứng này và xé rách mảng bằng chứng khác. Nếu quy về "nội chiến", ta thấy được vai trò tự quyết của người Việt và những đứt gãy từ bên trong quốc gia; nếu gắn mác "giải phóng", ta bắt gặp mạch ngầm chống thực dân và bàn tay ngoại bang. Cả hai danh xưng đều không sai trái. Chẳng mô tả nào là trọn vẹn.
              </p>
              <p>
                Xung đột tại Việt Nam là bằng chứng rành rành cho thấy cách cái màng lọc Chiến tranh Lạnh đã khoác lên vai cuộc chiến một sự minh định nhân tạo, trong khi ẩn ức nội bộ của bản ngã nó lại chằng chịt và ngoằn ngoèo hơn nhiều so với những gì Washington hay Hà Nội muốn thừa nhận. Lập trường trung thực nhất về mặt học thuật là khước từ vòng kim cô của những nhãn mác độc tôn, mà hãy ôm vào lòng mọi tầng lớp chồng lấn đó bằng tư tưởng khách quan.
              </p>
              <p className="font-bold border-l-8 border-gold pl-6 mt-10">
                Câu hỏi làm sao để "gọi tên" cuộc tương tàn này đến nay vẫn chưa thế cất gọn trong kho tàng văn học lịch sử. Thế nhưng điều chắc chắn là danh xưng làm nên chuyện — nếu buông lời cẩu thả, ta đã vô tình vò nát sinh mệnh của hàng triệu phận người thành một trò mô phỏng địa chính trị trống rỗng.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default DangVaNhanDanPage;

