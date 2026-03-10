import "./style.css";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, BookOpen, Target, CheckCircle } from "lucide-react";
import RevealSection from "../../components/layout/RevealSection";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const R = RevealSection.Item;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-shell w-full bg-bone scroll-container-fluid">
      {/* ═══════════ HERO ═══════════ */}
      <RevealSection
        className="border-b-2 border-charcoal/20 bg-bone"
        id="hero"
      >
        <div className="absolute inset-0 home-hero-overlay pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <R>
            <span className="brutal-badge mb-8 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bone" />
              Lịch sử Đảng – VNR202
            </span>
          </R>

          <R>
            <h1 className="font-display font-black text-fluid-hero uppercase text-ink leading-[1.05] tracking-tight mb-2">
              CUỘC CHIẾN TRANH Ở VIỆT NAM
            </h1>
          </R>
          <R>
            <h1 className="font-display font-black text-fluid-hero uppercase text-ink leading-[1.05] tracking-tight mb-3">
              GIAI ĐOẠN 1954–1965
            </h1>
          </R>
          <R>
            <h1 className="font-display font-black text-fluid-hero uppercase leading-[1.05] tracking-tight text-crimson mb-1">
              KHÁNG CHIẾN CHỐNG MỸ CỨU NƯỚC
            </h1>
          </R>
          <R>
            <h1 className="font-display font-black text-fluid-hero uppercase leading-[1.05] tracking-tight text-crimson">
              HAY NỘI CHIẾN?
            </h1>
          </R>

          <R className="mt-10 max-w-2xl">
            <blockquote className="border-l-4 border-crimson bg-paper/80 backdrop-blur-sm p-6">
              <p className="font-body text-xl md:text-2xl text-ink italic font-semibold leading-relaxed">
                &ldquo;Không có gì quý hơn độc lập, tự do.&rdquo;
              </p>
              <cite className="font-mono text-sm text-graphite mt-2 block font-bold uppercase tracking-widest not-italic">
                — Chủ tịch Hồ Chí Minh
              </cite>
            </blockquote>
          </R>

          <R className="mt-10">
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
              Bắt đầu Khám phá <ArrowRight size={20} strokeWidth={2.5} />
            </Button>
          </R>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="mt-14 text-charcoal/30"
          >
            <ChevronDown size={28} />
          </motion.div>
        </div>
      </RevealSection>

      {/* ═══════════ VÌ SAO CÂU HỎI NÀY QUAN TRỌNG ═══════════ */}
      <RevealSection id="why-it-matters" dark>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-bone) 1px, transparent 1px), linear-gradient(to right, var(--color-bone) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <R>
            <h2 className="font-display text-fluid-6xl font-black leading-tight tracking-tight uppercase text-center mb-8 text-bone">
              Vì sao cần phải trả lời câu hỏi này?
            </h2>
          </R>

          <R>
            <p className="font-body text-xl text-bone/75 leading-relaxed text-center mb-14">
              Trong kho tàng lịch sử cận hiện đại Việt Nam, hiếm có giai đoạn
              nào được tranh luận gay gắt và mang tính quyết định hơn những năm
              từ 1954 đến 1965. Đó là thời kỳ bản lề của lịch sử, khi ách thống
              trị của thực dân Pháp chính thức sụp đổ, đồng thời mở ra giai đoạn
              mới trong cuộc đấu tranh của nhân dân Việt Nam trước sự can thiệp
              ngày càng sâu và sự leo thang quân sự mạnh mẽ của đế quốc Mỹ.
            </p>
          </R>

          <div className="space-y-6">
            {[
              "Cách đặt tên cho cuộc chiến này quy định cách chúng ta nhìn nhận bản chất của lịch sử dân tộc, tính chính nghĩa của cuộc đấu tranh, và trách nhiệm lịch sử của các thế lực ngoại bang.",
              'Nếu gọi đây là "nội chiến", ta ngầm thừa nhận rằng chế độ Sài Gòn là một nhà nước hợp pháp, ngang hàng và độc lập và rằng cuộc chiến chỉ là cuộc tranh giành quyền lực giữa những người Việt với nhau.',
              "Nhưng nếu nhìn vào chứng cứ lịch sử một cách toàn diện, ta sẽ thấy rõ: đây là một cuộc Kháng chiến chống Mỹ cứu nước sự tiếp nối trực tiếp và tất yếu của truyền thống đấu tranh giải phóng dân tộc.",
            ].map((point, idx) => (
              <R key={idx}>
                <div className="flex items-start gap-6 p-8 border-l-4 border-crimson bg-charcoal/50">
                  <span className="font-display text-4xl font-black text-crimson leading-none shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="font-body text-lg text-bone/90 leading-relaxed">
                    {point}
                  </p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ═══════════ BỐI CẢNH: TỪ GENEVA ĐẾN CHIẾN TRANH ═══════════ */}
      <RevealSection>
        <div className="max-w-3xl mx-auto">
          <R>
            <h2 className="font-display text-fluid-5xl font-black text-ink uppercase text-center mb-10">
              Từ Geneva Đến Chiến Tranh Toàn Diện
            </h2>
          </R>

          <R>
            <div className="border-2 border-charcoal/20 bg-paper p-8 md:p-12 space-y-6 text-lg text-ink leading-relaxed">
              <p>
                Sau Chiến thắng Điện Biên Phủ lừng lẫy năm 1954, Hiệp định
                Geneva được ký kết, chấm dứt sự thống trị của Pháp trên bán đảo
                Đông Dương. Tuy nhiên, thay vì mang lại hòa bình và thống nhất
                cho dân tộc Việt Nam như tinh thần của hiệp định đề ra, giai
                đoạn tiếp theo lại chứng kiến một cuộc chiến âm mưu và xâm lược
                mới dưới bàn tay của đế quốc Mỹ.
              </p>
              <p>
                Đường ranh vĩ tuyến 17 vốn chỉ được quy định là ranh giới quân sự tạm thời sau hiệp định Geneva. Thế nhưng 
                Mỹ và chính quyền Ngô Đình Diệm cố tình biến thành biên giới
                quốc gia lâu dài nhắm chia cắt đất nước Việt Nam. Cuộc Tổng tuyển cử thống nhất dự kiến năm
                1956, mà cả thế giới đều biết Chủ tịch Hồ Chí Minh sẽ thắng áp
                đảo, đã bị cố tình ngăn cản. 
              </p>
              <p className="font-semibold border-l-4 border-crimson pl-6 text-ink">
                Từ đó, một chế độ tay sai hoàn toàn phụ thuộc vào viện trợ, vũ
                khí và cố vấn Mỹ được dựng lên ở miền Nam, áp bức nhân dân,
                trắng trợn vi phạm Hiệp định Geneva và cản trở công cuộc thống
                nhất đất nước.
              </p>
            </div>
          </R>
        </div>
      </RevealSection>

      {/* ═══════════ HAI QUAN ĐIỂM — A/B: Kháng chiến (A) left, Nội chiến (B) right ═══════════ */}
      <RevealSection dark>
        <div className="max-w-6xl mx-auto">
          <R>
            <h2 className="font-display text-fluid-5xl font-black text-bone uppercase text-center mb-4">
              Hai Quan Điểm — Và Sự Thật Lịch Sử
            </h2>
          </R>
          <R>
            <p className="font-body text-xl text-bone/70 text-center max-w-3xl mx-auto mb-14">
              Trong giới học thuật, đặc biệt là học thuật phương Tây, tồn tại
              hai luồng diễn giải chính về giai đoạn này.
            </p>
          </R>

          <R>
            <div className="grid md:grid-cols-2 gap-0 border-2 border-bone/20 overflow-hidden">
              {/* LEFT — A: Kháng chiến chống Mỹ (FAVORED) */}
              <div className="p-8 md:p-12 bg-charcoal border-b-2 md:border-b-0 md:border-r-2 border-bone/20 flex flex-col justify-center">
                <span className="inline-block self-start px-3 py-1 bg-crimson text-bone font-mono text-xs font-bold uppercase tracking-widest mb-5">
                  Quan điểm chính thống
                </span>
                <h3 className="font-display text-fluid-4xl font-black text-bone uppercase mt-2 mb-6">
                  Kháng Chiến Chống Mỹ Cứu Nước
                </h3>
                <p className="font-body text-lg text-bone/85 leading-relaxed">
                  Sử học chính thống Việt Nam, được ghi trong các văn kiện của
                  Đảng Cộng sản Việt Nam và ngày càng được khẳng định bởi nhiều
                  học giả quốc tế nghiêm túc, coi giai đoạn 1954–1965 là giai
                  đoạn khởi đầu và leo thang của Cuộc kháng chiến chống Mỹ cứu
                  nước, một cuộc đấu tranh chính nghĩa vì độc lập dân tộc, chủ
                  quyền lãnh thổ và thống nhất Tổ quốc.
                </p>
              </div>

              {/* RIGHT — B: "Nội chiến" */}
              <div className="p-8 md:p-12 bg-ink/80 flex flex-col justify-center">
                <span className="inline-block self-start px-3 py-1 bg-graphite text-bone/70 font-mono text-xs font-bold uppercase tracking-widest mb-5">
                  Quan điểm thứ hai
                </span>
                <h3 className="font-display text-fluid-4xl font-black text-bone/60 uppercase mt-2 mb-6">
                  &ldquo;Nội Chiến&rdquo;
                </h3>
                <p className="font-body text-lg text-bone/60 leading-relaxed">
                  Một số học giả theo xu hướng xét lại lịch sử của phương Tây
                  cho rằng cuộc xung đột giai đoạn 1954–1965 là cuộc tranh giành
                  nội bộ giữa hai tầm nhìn chính trị đối lập của người Việt.
                  Theo quan điểm này, Hoa Kỳ chỉ can thiệp vào một cuộc xung đột
                  đã tồn tại sẵn để hỗ trợ một &ldquo;đồng minh hợp pháp&rdquo;.
                </p>
              </div>
            </div>
          </R>
        </div>
      </RevealSection>

      {/* ═══════════ MỤC TIÊU CỦA TRANG WEB ═══════════ */}
      <RevealSection>
        <div className="max-w-4xl mx-auto">
          <R>
            <h2 className="font-display text-fluid-5xl font-black text-ink uppercase text-center mb-14">
              Mục Tiêu Của Trang Web
            </h2>
          </R>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen size={28} />,
                title: "Tái hiện bối cảnh",
                desc: "Tái hiện trung thực bối cảnh lịch sử giai đoạn 1954–1965 về tình hình địa lý, kinh tế, chính trị và xã hội ở cả hai miền, bản chất chính quyền Ngô Đình Diệm, chính sách can thiệp của Mỹ, và đường lối lãnh đạo sáng suốt của Đảng.",
              },
              {
                icon: <Target size={28} />,
                title: "Phân tích & so sánh",
                desc: "Phân tích và so sánh hai quan điểm học thuật một cách khoa học, dựa trên hệ thống dẫn chứng lịch sử cụ thể từ nhiều nguồn trong và ngoài nước.",
              },
              {
                icon: <CheckCircle size={28} />,
                title: "Kết luận có cơ sở",
                desc: "Dẫn dắt đến kết luận rõ ràng: cuộc chiến tranh giai đoạn 1954–1965 không phải là nội chiến, mà là Cuộc kháng chiến chống Mỹ cứu nước chính nghĩa, tiếp nối truyền thống chống ngoại xâm bất khuất của dân tộc.",
              },
            ].map((item, idx) => (
              <R key={idx}>
                <div className="border-2 border-charcoal/15 bg-paper p-7 h-full">
                  <div className="w-12 h-12 bg-olive text-bone flex items-center justify-center mb-5">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink uppercase mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-base text-graphite leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ═══════════ HÀNH TRÌNH KHÁM PHÁ ═══════════ */}
      <RevealSection className="bg-sand border-t-2 border-charcoal/10">
        <div className="max-w-2xl mx-auto text-center">
          <R>
            <h2 className="font-display text-fluid-5xl font-black text-ink uppercase mb-10">
              Hành Trình Khám Phá
            </h2>
          </R>

          <div className="space-y-5 mb-14 text-left">
            <R>
              <div className="border-2 border-charcoal/15 bg-bone p-7">
                <span className="brutal-badge mb-3">Trang 1</span>
                <h3 className="font-display text-xl font-bold text-ink uppercase mt-3 mb-2">
                  Bối cảnh lịch sử (1954–1965)
                </h3>
                <p className="font-body text-base text-graphite leading-relaxed">
                  Hiểu rõ những điều kiện cụ thể đã tạo nên cuộc chiến — sự thật
                  về Hiệp định Geneva, bản chất của chế độ Ngô Đình Diệm, và
                  đường lối lãnh đạo của Đảng.
                </p>
              </div>
            </R>

            <R>
              <div className="border-2 border-charcoal/15 bg-bone p-7">
                <span className="brutal-badge bg-charcoal! mb-3">Trang 2</span>
                <h3 className="font-display text-xl font-bold text-ink uppercase mt-3 mb-2">
                  So sánh và Kết luận
                </h3>
                <p className="font-body text-base text-graphite leading-relaxed">
                  Đánh giá hai luồng quan điểm học thuật và đi đến kết luận dựa
                  trên chứng cứ lịch sử toàn diện.
                </p>
              </div>
            </R>
          </div>

          <R>
            <Button
              variant="danger"
              size="lg"
              onClick={() => navigate("/boi-canh-lich-su")}
              className="gap-3 text-lg px-10 py-5"
            >
              Khám phá Bối cảnh Lịch sử{" "}
              <ArrowRight size={22} strokeWidth={2.5} />
            </Button>
          </R>
        </div>
      </RevealSection>
    </div>
  );
};

export default HomePage;
