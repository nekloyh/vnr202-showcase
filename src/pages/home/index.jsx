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
      className="home-shell w-full bg-bone selection:bg-ink selection:text-gold snap-container h-screen overflow-y-scroll"
    >
      {/* ═══════════ HERO — Full viewport, centered question ═══════════ */}
      <Section className="items-center justify-center pt-20 bg-bone min-h-screen border-b-2 border-ink">
        <div className="absolute inset-0 home-hero-overlay pointer-events-none" />

        <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center justify-center text-center z-10 relative py-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="brutal-badge mb-10 inline-flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-bone border border-transparent"></span>
            <span>
              Lịch sử Đảng - VNR202
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase text-ink leading-[0.85] tracking-tighter drop-shadow-[4px_4px_0px_#ffd700]"
          >
            VIỆT NAM
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tighter text-crimson drop-shadow-[4px_4px_0px_#000000]"
          >
            CÓ PHẢI NỘI CHIẾN?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-xl md:text-2xl text-graphite/90 max-w-2xl mt-10 leading-relaxed font-medium"
          >
            1954–1965. Giai đoạn định hình cách chúng ta hiểu về cuộc chiến — và tại sao câu trả lời lại phức tạp hơn những gì lịch sử chính thống thường ghi nhận.
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
        className="items-center justify-center bg-ink text-bone border-b-2 border-ink"
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
            className="font-display text-4xl md:text-6xl font-black leading-tight tracking-tight uppercase text-center mb-16 text-stroke-white text-ink"
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
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-6 brutal-card p-8 !bg-ink border-bone/20 !shadow-[8px_8px_0px_#fffdf5]"
              >
                <span className="font-display text-5xl font-black text-stroke-red text-transparent leading-none mt-0 shrink-0">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-xl text-bone leading-relaxed font-medium">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ TWO POSITIONS IN TENSION — single visual ═══════════ */}
      <Section className="items-center justify-center bg-bone py-24">
        <div className="max-w-screen-xl mx-auto w-full relative z-10 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-black text-ink uppercase text-center mb-16"
          >
            Hai Lập Trường. Một Câu Hỏi.
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-0 border-4 border-ink shadow-[12px_12px_0px_#1C1C1A]">
            {/* Left — Civil War */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-10 md:p-16 bg-white md:border-r-4 md:border-ink border-b-4 md:border-b-0 border-ink flex flex-col justify-center"
            >
              <div className="inline-block self-start px-4 py-2 bg-crimson border-2 border-ink shadow-hard-sm text-bone font-mono text-sm font-bold uppercase tracking-widest mb-6">
                Luồng Quan Điểm A
              </div>
              <h3 className="font-display text-3xl md:text-5xl font-black text-ink uppercase mt-3 mb-8 drop-shadow-[2px_2px_0px_#EAE6DA]">
                Nội Chiến
              </h3>
              <p className="font-body text-xl text-ink font-medium leading-relaxed">
                Một cuộc xung đột giữa những tầm nhìn chính trị đối lập của người Việt — Cách mạng Xã hội chủ nghĩa chống lại Chủ nghĩa Cộng hòa chống cộng — được tiến hành chủ yếu bởi người Việt ở cả hai chiến tuyến.
              </p>
            </motion.div>

            {/* Right — National Liberation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 md:p-16 bg-bone flex flex-col justify-center"
            >
              <div className="inline-block self-start px-4 py-2 bg-ink border-2 border-ink shadow-hard-sm text-bone font-mono text-sm font-bold uppercase tracking-widest mb-6">
                Luồng Quan Điểm B
              </div>
              <h3 className="font-display text-3xl md:text-5xl font-black text-ink uppercase mt-3 mb-8 drop-shadow-[2px_2px_0px_#ffffff]">
                Giải Phóng Dân Tộc
              </h3>
              <p className="font-body text-xl text-ink font-medium leading-relaxed">
                Một cuộc đấu tranh chống lại sự khuất phục do nước ngoài hậu thuẫn và vì mục tiêu thống nhất đất nước — một sự tiếp nối của phong trào chống thực dân nhằm chống lại một chế độ do Mỹ chống lưng.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════ CONTEXT STRIP + CTA ═══════════ */}
      <Section className="items-center justify-center bg-sand border-t-2 border-ink">
        <div className="max-w-screen-md mx-auto text-center relative z-10 py-32 brutal-card border-4 border-ink shadow-[8px_8px_0_0_#1C1C1A]">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xl md:text-2xl text-ink leading-relaxed mb-6 font-medium"
          >
            Sau Hiệp định Geneva năm 1954 chia cắt Việt Nam tại vĩ tuyến 17,
            hai quốc gia đối lập đã hình thành — mỗi quốc gia đều tuyên bố đại diện cho dân tộc
            Việt Nam. Đến năm 1965, xung đột đã leo thang thành một cuộc chiến tranh toàn diện
            với sự tham gia của hàng trăm ngàn lính ngoại quốc.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-xl md:text-2xl text-ink font-bold leading-relaxed mb-12"
          >
            Để hiểu tại sao các nhà sử học lại bất đồng quan điểm, trước tiên bạn cần hiểu
            Việt Nam thực sự trông như thế nào sau năm 1954 — một đất nước bị chia cắt,
            hai chính phủ cạnh tranh, và một quần chúng nhân dân mà lòng trung thành của họ phức tạp
            hơn nhiều so với những gì các bên muốn thừa nhận.
          </motion.p>

          <Button
            variant="danger"
            size="lg"
            onClick={() => navigate("/boi-canh-lich-su")}
            className="gap-3 text-lg px-10 py-5"
          >
            Khám phá Bối cảnh Lịch sử <ArrowRight size={24} strokeWidth={3} />
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
