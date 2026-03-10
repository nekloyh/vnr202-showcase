import {
  Crown,
  FileText,
  Video,
  Newspaper,
  ExternalLink,
  Search,
  Cpu,
  Layout,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import RevealSection from "../../components/layout/RevealSection";

const R = RevealSection.Item;

const members = [
  {
    name: "Ông Trần Hải Triều",
    studentCode: "SE173617",
    role: "leader",
    gender: "male",
    task: [
      "Tìm kiếm và đóng góp tư liệu học thuật",
      "Điều phối tiến độ, rà soát học thuật",
    ],
  },
  {
    name: "Ngô Khai Nguyên",
    studentCode: "SE150947",
    role: "member",
    gender: "male",
    task: [
      "Biên tập nội dung thuyết trình",
      "Kiểm thử và đánh giá trải nghiệm",
    ],
  },
  {
    name: "Lê Quốc Bảo",
    studentCode: "SS170194",
    role: "member",
    gender: "male",
    task: [
      "Hỗ trợ xây dựng các nội dung trò chơi",
      "Đối chiếu nguồn chính thống, kiểm chứng trích dẫn",
    ],
  },
  {
    name: "Nguyễn Lý Minh Kỳ",
    studentCode: "SE181748",
    role: "member",
    gender: "male",
    task: [
      "Thiết kế & xây dựng website",
      "Thu thập tư liệu, số liệu cho website",
    ],
  },
];

const references = [
  {
    title: "Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bộ GD&ĐT)",
    type: "document",
    link: "https://www.iuv.edu.vn/cms/plugin_upload/preview/news/1468/1113/gt-lich-su-dang-csvn-ban-tuyen-giao-tw.pdf",
  },
  {
    title: "Tài liệu môn VNR202 - FPT University",
    type: "document",
    link: "https://drive.google.com/drive/folders/14fM8b59OFX9CHfEMl449oWC7k-N4Te0O",
  },
];

const tools = [
  {
    category: "RESEARCH & DATA",
    name: "Nghiên cứu & Tổng hợp",
    tools: ["ChatGPT 5", "NotebookLM", "Gemini"],
    icon: Search,
    description: [
      "Phân tích, đối chiếu quan điểm giáo trình & văn kiện Đảng.",
      "Tóm tắt video bài giảng, trích xuất luận điểm cốt lõi.",
      "Kiểm tra chéo (Cross-check) kiến thức lịch sử.",
    ],
    images: [
      "/images/ai-usage/gpt.png",
      "/images/ai-usage/notebooklm1.png",
      "/images/ai-usage/notebooklm2.png",
    ],
    color: "bg-olive text-bone",
    status: "OPERATIONAL",
  },
  {
    category: "CHATBOT OPERATION",
    name: "Vận hành Chatbot",
    tools: ["Google AI Studio", "Groq Cloud"],
    icon: Cpu,
    description: [
      "Prompting Gemini 2.5 Flash trả lời câu hỏi về Đảng Cộng sản Việt Nam.",
      "Tối ưu độ trễ phản hồi với Groq LPU.",
      "Xây dựng Persona 'Sử Đảng' gần gũi, học thuật.",
    ],
    images: ["/images/ai-usage/googlestudio.png", "/images/ai-usage/groq.png"],
    color: "bg-gold text-ink",
    status: "OPTIMIZED",
  },
  {
    category: "WEB DEVELOPMENT",
    name: "Xây dựng Website",
    tools: ["Gemini 3 Pro", "Antigravity"],
    icon: Layout,
    description: [
      "Generate code UI React/Tailwind chuẩn thiết kế.",
      "Tối ưu Responsive & Animation (Framer Motion).",
      "Debug logic & Refactor code base.",
    ],
    images: ["/images/ai-usage/gemini_1.png", "/images/ai-usage/gemini_2.png"],
    color: "bg-blue text-bone",
    status: "ACTIVE",
  },
];

/* ─────────────── Cards ─────────────── */

const ProfileCard = ({ member }) => {
  const isLeader = member.role === "leader";
  const isFemale = member.gender === "female";
  const avatarSrc = isFemale ? "/images/user/female.png" : "/images/user/male.png";

  return (
    <div className="brutal-card relative group h-full flex flex-col bg-paper">
      <div className="flex justify-between items-start mb-5">
        <div className="w-16 h-16 border-2 border-charcoal bg-bone shrink-0 flex items-center justify-center relative shadow-hard-sm overflow-hidden">
          <img
            src={avatarSrc}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0"
          />
          {isLeader && (
            <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold border border-charcoal flex items-center justify-center">
              <Crown size={10} className="text-ink" />
            </div>
          )}
        </div>
        <div className="text-right flex-1 pl-4">
          <h3 className="font-display text-xl text-ink leading-tight uppercase mb-1">
            {member.name}
          </h3>
          <div className="text-xs font-mono text-graphite mb-1">{member.studentCode}</div>
          <span
            className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border-2 border-charcoal ${isLeader ? "bg-gold text-ink" : "bg-sand text-ink"}`}
          >
            {isLeader ? "Trưởng Nhóm" : "Thành Viên"}
          </span>
        </div>
      </div>

      <div className="mt-auto border-t-2 border-dashed border-charcoal/15 pt-4">
        <ul className="space-y-2">
          {member.task.map((taskItem) => (
            <li
              key={`${member.studentCode}-${taskItem}`}
              className="flex items-start gap-2 text-sm font-body text-graphite leading-snug"
            >
              <span className="mt-1.5 w-1.5 h-1.5 bg-crimson shrink-0" />
              {taskItem}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ReferenceCard = ({ reference }) => {
  const getIcon = (type) => {
    switch (type) {
      case "video":
        return Video;
      case "document":
        return FileText;
      default:
        return Newspaper;
    }
  };
  const Icon = getIcon(reference.type);

  return (
    <a
      href={reference.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group brutal-card relative bg-paper h-full hover:shadow-hard-lg transition-all"
    >
      <div className="flex flex-col h-full">
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 bg-bone px-2 py-0.5 text-xs font-bold font-mono uppercase border border-charcoal/20">
            <Icon size={14} />
            {reference.type}
          </span>
          <ExternalLink
            size={14}
            className="text-graphite group-hover:text-crimson transition-colors"
          />
        </div>
        <h3 className="font-display text-lg font-bold text-ink leading-tight group-hover:text-crimson transition-colors">
          {reference.title}
        </h3>
      </div>
    </a>
  );
};

const ToolCard = ({ item }) => {
  const Icon = item.icon;
  const statusColor =
    item.status === "OPERATIONAL"
      ? "bg-olive"
      : item.status === "OPTIMIZED"
        ? "bg-gold"
        : "bg-blue";

  return (
    <div className="brutal-card h-full flex flex-col bg-paper">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-5">
          <div>
            <span
              className={`inline-block border-2 border-charcoal px-2 py-0.5 font-bold font-mono text-xs mb-3 uppercase shadow-hard-sm ${item.color}`}
            >
              {item.category}
            </span>
            <h3 className="font-display text-fluid-3xl text-ink leading-none uppercase font-black tracking-tight">
              {item.name}
            </h3>
          </div>
          <div className="shrink-0 p-3 border-2 border-charcoal bg-bone shadow-hard-sm">
            <Icon size={28} strokeWidth={2} className="text-ink" />
          </div>
        </div>

        <div className="mb-5">
          <h4 className="font-mono text-xs text-graphite uppercase mb-2 tracking-wider font-bold">
            Công cụ sử dụng:
          </h4>
          <div className="flex flex-wrap gap-2">
            {item.tools.map((toolName) => (
              <span
                key={`${item.category}-${toolName}`}
                className="px-2 py-0.5 border-2 border-charcoal/30 bg-bone font-bold text-sm font-mono"
              >
                {toolName}
              </span>
            ))}
          </div>
        </div>

        <ul className="space-y-2 mb-5">
          {item.description.map((descriptionItem) => (
            <li
              key={`${item.name}-${descriptionItem}`}
              className="flex items-start gap-2 text-sm text-ink leading-snug"
            >
              <ArrowRight size={16} className="text-crimson shrink-0 mt-0.5" />
              <span>{descriptionItem}</span>
            </li>
          ))}
        </ul>

        {item.images && item.images.length > 0 && (
          <div className="mb-5">
            <h4 className="font-mono text-xs text-graphite uppercase mb-2 tracking-wider font-bold">
              Ảnh minh họa:
            </h4>
            <div
              className={`grid gap-2 ${item.images.length === 1 ? "grid-cols-1" : item.images.length === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}
            >
              {item.images.map((img) => (
                <a
                  key={`${item.name}-${img}`}
                  href={img}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-2 border-charcoal/20 overflow-hidden hover:shadow-hard-sm transition-shadow bg-bone"
                >
                  <img
                    src={img}
                    alt={item.name}
                    className="w-full h-28 object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto pt-3 border-t-2 border-dashed border-charcoal/15 flex items-center gap-2 font-mono text-xs font-bold text-graphite">
        <div className={`w-2 h-2 ${statusColor}`} />
        {item.status}
      </div>
    </div>
  );
};

/* ─────────────── Page ─────────────── */

const InformationsPage = () => {
  return (
    <div className="w-full bg-bone scroll-container-fluid">
      {/* ═══════════ HERO ═══════════ */}
      <RevealSection className="border-b-2 border-charcoal/15">
        <div className="flex flex-col items-center text-center">
          <R>
            <span className="brutal-badge mb-6">Hồ sơ 06 — Tài liệu dự án & Báo cáo</span>
          </R>
          <R>
            <h1 className="font-display font-black text-fluid-hero uppercase text-ink leading-[1.05] tracking-tight mb-2">
              HỒ SƠ
            </h1>
          </R>
          <R>
            <h1 className="font-display font-black text-fluid-hero uppercase text-crimson leading-[1.05] tracking-tight mb-6">
              DỰ ÁN
            </h1>
          </R>
          <R>
            <p className="font-body text-xl text-graphite max-w-2xl mx-auto">
              Tổng hợp thành viên thực hiện, tài liệu tham khảo và báo cáo ứng dụng AI
              trong dự án VNR202.
            </p>
          </R>
        </div>
      </RevealSection>

      {/* ═══════════ TEAM ═══════════ */}
      <RevealSection fullHeight={false} className="border-b-2 border-charcoal/15">
        <R>
          <h2 className="font-display text-fluid-5xl font-black text-ink uppercase text-center mb-14 tracking-tight">
            Nhân Sự Dự Án
          </h2>
        </R>
        <R>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((member) => (
              <ProfileCard key={member.studentCode} member={member} />
            ))}
          </div>
        </R>
      </RevealSection>

      {/* ═══════════ REFERENCES ═══════════ */}
      <RevealSection dark fullHeight={false} className="border-b-2 border-charcoal/15">
        <R>
          <h2 className="font-display text-fluid-5xl font-black text-bone uppercase text-center mb-14 tracking-tight">
            Tài Liệu Tham Khảo
          </h2>
        </R>
        <R>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {references.map((reference) => (
              <ReferenceCard key={reference.link} reference={reference} />
            ))}
          </div>
        </R>
      </RevealSection>

      {/* ═══════════ AI TOOLS REPORT ═══════════ */}
      <RevealSection fullHeight={false} className="border-b-2 border-charcoal/15">
        <R>
          <h2 className="font-display text-fluid-5xl font-black text-ink uppercase text-center mb-4 tracking-tight">
            Báo Cáo Công Nghệ
          </h2>
        </R>
        <R>
          <p className="font-body text-xl text-graphite text-center max-w-3xl mx-auto mb-14">
            Báo cáo minh bạch cách nhóm sử dụng AI trong nghiên cứu, vận hành chatbot
            và tối ưu website.
          </p>
        </R>
        <R>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {tools.map((item) => (
              <ToolCard key={item.category} item={item} />
            ))}
          </div>
        </R>
      </RevealSection>

      {/* ═══════════ ACADEMIC INTEGRITY ═══════════ */}
      <RevealSection dark fullHeight={false}>
        <R>
          <div className="max-w-3xl mx-auto text-center">
            <ShieldAlert size={56} className="text-crimson mx-auto mb-6 stroke-[1.5]" />
            <h3 className="font-display text-fluid-4xl font-black text-bone uppercase mb-6 tracking-tight">
              Cam Kết Toàn Vẹn Học Thuật
            </h3>
            <div className="space-y-5 text-bone/85 font-body text-lg leading-relaxed text-left border-2 border-bone/15 p-8 bg-charcoal/50">
              <p>
                Trí tuệ nhân tạo (AI) chỉ đóng vai trò là{" "}
                <strong className="text-bone">công cụ hỗ trợ</strong> nghiên cứu
                (tra cứu, tổng hợp, tối ưu phần mềm),{" "}
                <span className="text-crimson font-black uppercase">không</span>{" "}
                thay thế tư duy và lập trường.
              </p>
              <p>
                Mọi nội dung chuyên môn đều được đối chiếu chéo cẩn trọng với
                các tài liệu{" "}
                <strong className="text-bone">Giáo trình chính quy</strong> và
                nguồn dẫn gốc được công nhận.
              </p>
            </div>
            <p className="font-mono text-xs text-bone/40 uppercase tracking-widest mt-10">
              Đại học FPT © 2026
            </p>
          </div>
        </R>
      </RevealSection>
    </div>
  );
};

export default InformationsPage;
