import "./style.css";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Section from "../../components/layout/Section";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div
      ref={containerRef}
      className="home-shell w-full bg-bone selection:bg-ink selection:text-gold scroll-container-fluid"
    >
      {/* ═══════════ HERO — Full viewport, centered question ═══════════ */}
      <Section className="items-center justify-center bg-[#f0f0f0] border-b-[8px] border-ink pt-0 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center justify-center text-center z-10 relative py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 inline-flex flex-col items-center gap-1"
          >
            <div className="bg-ink text-white font-mono font-bold text-xs md:text-sm uppercase tracking-widest px-6 py-2 border-[4px] border-ink shadow-[6px_6px_0_#D32F2F]">
              HỒ SƠ / VNR202 / TẬP LỊCH SỬ
            </div>
            <div className="text-crimson font-mono text-[10px] font-bold uppercase tracking-widest border-2 border-crimson px-2 py-0.5 mt-2 rotate-2 opacity-80">
              [ TÀI LIỆU ĐÃ GIẢI MÃ ]
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-[clamp(4rem,8vw,8rem)] uppercase text-ink leading-[0.85] tracking-tighter drop-shadow-[8px_8px_0_#F9F9F9] mb-4"
          >
            CUỘC KHÁNG CHIẾN
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-black text-[clamp(4rem,7vw,7rem)] uppercase text-ink leading-[0.85] tracking-tighter drop-shadow-[8px_8px_0_#F9F9F9] mb-4 border-b-[8px] border-ink pb-4 inline-block relative -mt-2"
          >
            CHỐNG MỸ CỨU NƯỚC
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display font-black text-fluid-hero uppercase leading-[0.85] tracking-tighter text-crimson drop-shadow-[6px_6px_0_#000] mt-8 mb-6 relative z-10"
          >
            HAY
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-display font-black text-[clamp(4rem,7.5vw,7.5rem)] uppercase leading-[0.85] tracking-tighter text-white drop-shadow-[8px_8px_0_#D32F2F] mb-4 inline-block bg-ink px-8 py-4 border-[6px] border-ink -rotate-2 transform hover:rotate-0 transition-transform duration-300 shadow-[16px_16px_0_rgba(0,0,0,0.2)]"
          >
            NỘI CHIẾN VIỆT NAM?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-xl md:text-2xl text-graphite/90 max-w-2xl mt-10 leading-relaxed font-medium"
          >
            1954–1965. Giai đoạn định hình cách chúng ta hiểu về cuộc chiến — và
            tại sao câu trả lời lại phức tạp hơn những gì lịch sử chính thống
            thường ghi nhận.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <Button
              variant="danger"
              size="lg"
              onClick={() =>
                document
                  .getElementById("why-it-matters")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="gap-2"
            >
              Bắt đầu Khám phá <ArrowRight size={20} strokeWidth={3} />
            </Button>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="mt-16 text-ink/30"
          >
            <ChevronDown size={28} />
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ WHY IT MATTERS — 3 punchy points ═══════════ */}
      <Section
        id="why-it-matters"
        className="items-center justify-center bg-ink text-paper border-b-[6px] border-ink"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#F0F0E0 1px, transparent 1px), linear-gradient(to right, #F0F0E0 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="max-w-screen-lg mx-auto relative z-10 py-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-fluid-6xl font-black leading-tight tracking-tight uppercase text-center mb-16 text-stroke-white text-ink"
          >
            Tại sao câu hỏi này lại quan trọng?
          </motion.h2>

          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              "Câu trả lời quyết định liệu chúng ta nhìn nhận người Việt Nam như những chủ thể tự quyết định lịch sử của chính họ, hay chỉ là những con tốt trong cuộc cạnh tranh của các siêu cường.",
              "Nó định hình cách chúng ta đánh giá tính chính danh của sự can thiệp từ Mỹ — và liệu chính quyền miền Nam là một quốc gia thực sự hay chỉ là một sản phẩm do nước ngoài tạo ra.",
              "Nó cho thấy lăng kính Chiến tranh Lạnh đã áp đặt một sự rạch ròi giả tạo lên một cuộc xung đột mà ở đó động lực nội tại phức tạp hơn nhiều so với những gì cả hai phe thừa nhận.",
            ].map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col border-[6px] border-ink bg-white shadow-[12px_12px_0_#D32F2F] p-8 md:p-12 transition-transform hover:-translate-y-2 hover:shadow-[16px_16px_0_#D32F2F] duration-300"
                >
                  <div className="absolute top-0 left-0 bg-ink text-white font-mono text-xs font-bold px-4 py-2 border-b-[4px] border-r-[4px] border-ink tracking-widest uppercase">
                    CHỨNG CỨ / 0{idx + 1}
                  </div>
                  <span className="absolute bottom-4 right-4 font-display font-black text-[120px] leading-none text-ink/5 select-none pointer-events-none">
                    0{idx + 1}
                  </span>
                  
                  <p className="font-body text-2xl md:text-3xl text-ink leading-snug font-bold mt-6 relative z-10 w-[90%]">
                    {point}
                  </p>
                </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ TWO POSITIONS IN TENSION — single visual ═══════════ */}
      <Section className="items-center justify-center bg-paper py-24 border-b-[6px] border-ink">
        <div className="max-w-screen-xl mx-auto w-full relative z-10 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-fluid-5xl font-black text-ink uppercase text-center mb-16"
          >
            Hai Lập Trường. Một Câu Hỏi.
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-0 border-[6px] border-ink shadow-[16px_16px_0px_#000]">
            {/* Left — Civil War */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative p-10 md:p-16 bg-white md:border-r-[6px] md:border-ink border-b-[6px] md:border-b-0 border-ink flex flex-col justify-center overflow-hidden"
            >
              {/* Archival watermark */}
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-[100px] font-display font-black text-ink/5 pointer-events-none whitespace-nowrap uppercase">
                LUẬN ĐIỂM A
              </div>

              <div className="relative z-10">
                <div className="inline-block px-4 py-2 bg-crimson border-[4px] border-ink shadow-[4px_4px_0_#000] text-white font-mono text-sm font-bold uppercase tracking-widest mb-8">
                  [ HỒ SƠ 01 ]
                </div>
                <h3 className="font-display text-fluid-5xl font-black text-ink uppercase mb-6 tracking-tighter leading-none">
                  Nội Chiến
                </h3>
                <p className="font-body text-xl md:text-2xl text-ink font-bold leading-relaxed border-l-[6px] border-crimson pl-6">
                  Một cuộc xung đột giữa những tầm nhìn chính trị đối lập của
                  người Việt — Cách mạng Xã hội chủ nghĩa chống lại Chủ nghĩa Cộng
                  hòa chống Cộng — được tiến hành chủ yếu bởi người Việt ở cả hai
                  chiến tuyến.
                </p>
              </div>
            </motion.div>

            {/* Right — National Liberation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative p-10 md:p-16 bg-[#1A1A1A] text-white flex flex-col justify-center overflow-hidden"
            >
              {/* Archival watermark */}
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 rotate-90 text-[100px] font-display font-black text-white/5 pointer-events-none whitespace-nowrap uppercase">
                LUẬN ĐIỂM B
              </div>

              <div className="relative z-10">
                <div className="inline-block px-4 py-2 bg-[#1976D2] border-[4px] border-white shadow-[4px_4px_0_#FFF] text-white font-mono text-sm font-bold uppercase tracking-widest mb-8">
                  [ HỒ SƠ 02 ]
                </div>
                <h3 className="font-display text-fluid-5xl font-black text-white uppercase mb-6 tracking-tighter leading-none">
                  Giải Phóng Dân Tộc
                </h3>
                <p className="font-body text-xl md:text-2xl text-white font-medium leading-relaxed border-l-[6px] border-[#1976D2] pl-6">
                  Một cuộc đấu tranh chống lại sự khuất phục do nước ngoài hậu
                  thuẫn và vì mục tiêu thống nhất đất nước — một sự tiếp nối của
                  phong trào chống thực dân nhằm chống lại một chế độ do Mỹ chống
                  lưng.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════ CONTEXT STRIP + CTA ═══════════ */}
      <Section className="items-center justify-center bg-[#E5E5E5] border-b-[8px] border-ink py-32">
        <div className="max-w-screen-md mx-auto relative z-10 bg-white border-[8px] border-ink shadow-[20px_20px_0_0_#000] p-10 md:p-16">
          {/* Top Label Tab */}
          <div className="absolute -top-[52px] left-[-8px] bg-ink text-white font-display font-black text-2xl uppercase px-8 py-3 border-[8px] border-b-0 border-ink">
            TỔNG QUAN TÌNH HÌNH
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xl md:text-2xl text-ink leading-relaxed mb-6 font-medium"
          >
            Sau Hiệp định Geneva năm 1954 chia cắt Việt Nam tại vĩ tuyến 17, hai
            quốc gia đối lập đã hình thành — mỗi quốc gia đều tuyên bố đại diện
            cho dân tộc Việt Nam. Đến năm 1965, xung đột đã leo thang thành một
            cuộc chiến tranh toàn diện với sự tham gia của hàng trăm ngàn lính
            ngoại quốc.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-xl md:text-2xl text-ink font-bold leading-relaxed mb-12 bg-gold/30 px-2 py-1 inline"
          >
            Để hiểu tại sao các nhà sử học lại bất đồng quan điểm, trước tiên
            bạn cần hiểu Việt Nam thực sự trông như thế nào sau năm 1954 — một
            đất nước bị chia cắt, hai chính phủ cạnh tranh, và một quần chúng
            nhân dân mà lòng trung thành của họ phức tạp hơn nhiều so với những
            gì các bên muốn thừa nhận.
          </motion.p>

          <div className="mt-12 text-center md:text-left">
            <Button
              variant="danger"
              size="lg"
              onClick={() => navigate("/boi-canh-lich-su")}
              className="gap-4 text-xl md:text-2xl px-12 py-6 border-[4px] shadow-[8px_8px_0_#000] hover:shadow-[12px_12px_0_#000] hover:-translate-y-2 uppercase font-black"
            >
              Khám phá Bối cảnh <ArrowRight size={28} strokeWidth={4} />
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
