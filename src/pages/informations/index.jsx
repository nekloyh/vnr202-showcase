import { motion } from "framer-motion";
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
import { KineticSubline } from "../../components/ui/KineticText";
import Section from "../../components/layout/Section";

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
    title: "Giáo trình Chủ nghĩa Xã hội khoa học (Bộ GD&ĐT)",
    type: "document",
    link: "https://drive.google.com/file/d/1fgQf9P5Vc77CiIkhcXfs65qgAFgWlp9u/view",
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
    tools: ["ChatGPT 5", "NotebookLM"],
    icon: Search,
    description: [
      "Phân tích, đối chiếu quan điểm giáo trình & văn kiện Đảng.",
      "Tóm tắt video bài giảng, trích xuất luận điểm cốt lõi.",
      "Kiểm tra chéo (Cross-check) kiến thức lịch sử.",
    ],
    images: [
      "/images/ai-usage/gpt.jpg",
      "/images/ai-usage/notebooklm1.jpg",
      "/images/ai-usage/notebooklm2.jpg",
    ],
    color: "bg-green-100",
    status: "OPERATIONAL",
  },
  {
    category: "CHATBOT OPERATION",
    name: "Vận hành Chatbot Cộng",
    tools: ["Google AI Studio", "Groq Cloud"],
    icon: Cpu,
    description: [
      "Fine-tune Gemini 1.5 Flash với dữ liệu Tư tưởng HCM.",
      "Tối ưu độ trễ phản hồi (<1s) với Groq LPU.",
      "Xây dựng Persona 'Cộng' gần gũi, học thuật.",
    ],
    images: ["/images/ai-usage/googlestudio.png", "/images/ai-usage/groq.png"],
    color: "bg-orange-100",
    status: "OPTIMIZED",
  },
  {
    category: "WEB DEVELOPMENT",
    name: "Xây dựng Website",
    tools: ["Gemini Advanced"],
    icon: Layout,
    description: [
      "Generate code UI React/Tailwind chuẩn Neo-Brutalist.",
      "Tối ưu Responsive & Animation (Framer Motion).",
      "Debug logic & Refactor code base.",
    ],
    images: ["/images/ai-usage/gemini_1.png", "/images/ai-usage/gemini_2.png"],
    color: "bg-blue-100",
    status: "ACTIVE",
  },
];

const ProfileCard = ({ member }) => {
  const isLeader = member.role === "leader";
  const isFemale = member.gender === "female";
  const avatarSrc = isFemale ? "/images/user/female.png" : "/images/user/male.png";

  return (
    <div className="brutal-card relative group h-full flex flex-col p-4 md:p-6 overflow-hidden border-4 border-ink shadow-hard bg-white">
      <div className="flex justify-between items-start mb-6">
        <div className="w-20 h-20 border-2 border-ink bg-bone shrink-0 flex items-center justify-center relative shadow-sm overflow-hidden">
          <img
            src={avatarSrc}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {isLeader && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gold border-2 border-ink flex items-center justify-center shadow-sm">
              <Crown size={12} className="text-ink" />
            </div>
          )}
        </div>

        <div className="text-right flex-1 pl-4">
          <h3 className="font-display text-2xl text-ink leading-tight uppercase mb-2">
            {member.name}
          </h3>
          <div className="text-sm font-mono text-ink/60 mb-1">{member.studentCode}</div>
          <span
            className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-ink ${isLeader ? "bg-gold text-ink" : "bg-gray-100 text-ink/70"}`}
          >
            {isLeader ? "Trưởng Nhóm" : "Thành Viên"}
          </span>
        </div>
      </div>

      <div className="mt-auto border-t-2 border-dashed border-ink/20 pt-4">
        <ul className="space-y-2">
          {member.task.map((taskItem) => (
            <li
              key={`${member.studentCode}-${taskItem}`}
              className="flex items-start gap-2 text-sm font-body text-ink leading-snug"
            >
              <span className="mt-1.5 w-1.5 h-1.5 bg-crimson rounded-full shrink-0" />
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
      className="block group brutal-card relative bg-bone border-4 border-ink shadow-hard hover:shadow-[4px_4px_0_0_#d91c1c] hover:translate-y-[-4px] hover:-translate-x-1 transition-all h-full"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 bg-bone px-2 py-1 text-xs font-bold font-mono uppercase border border-ink/20 rounded-sm">
            <Icon size={14} />
            {reference.type}
          </span>
          <ExternalLink size={16} className="text-ink/40 group-hover:text-crimson transition-colors" />
        </div>

        <h3 className="font-display text-lg font-bold text-ink leading-tight group-hover:text-crimson transition-colors line-clamp-2">
          {reference.title}
        </h3>
      </div>
    </a>
  );
};

const ToolCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <div className="brutal-card h-full flex flex-col p-5 md:p-6 bg-bone border-4 border-ink shadow-[8px_8px_0_0_#000000]">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span
              className={`inline-block border-2 border-ink px-3 py-1 font-bold font-mono text-xs mb-3 uppercase shadow-sm ${item.color}`}
            >
              {item.category}
            </span>
            <h3 className="font-display text-4xl text-ink leading-[0.9] uppercase font-black">
              {item.name}
            </h3>
          </div>

          <div className="shrink-0 p-3 border-4 border-ink bg-white shadow-sm">
            <Icon size={32} strokeWidth={1.5} className="text-ink" />
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-bold font-mono text-xs text-ink/60 uppercase mb-2 tracking-widest">
            Tools Used:
          </h4>
          <div className="flex flex-wrap gap-2">
            {item.tools.map((toolName) => (
              <span
                key={`${item.category}-${toolName}`}
                className="px-3 py-1 border-2 border-ink bg-bone font-bold text-sm"
              >
                {toolName}
              </span>
            ))}
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {item.description.map((descriptionItem) => (
            <li key={`${item.name}-${descriptionItem}`} className="flex items-start gap-3 text-base text-ink leading-snug">
              <ArrowRight size={20} className="text-crimson shrink-0 mt-0.5" />
              <span>{descriptionItem}</span>
            </li>
          ))}
        </ul>

        {item.images && item.images.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold font-mono text-xs text-ink/60 uppercase mb-3 tracking-widest">
              Screenshots:
            </h4>
            <div
              className={`grid gap-3 ${item.images.length === 1 ? "grid-cols-1" : item.images.length === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}
            >
              {item.images.map((img) => (
                <a
                  key={`${item.name}-${img}`}
                  href={img}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-2 border-ink overflow-hidden hover:shadow-hard transition-shadow duration-200 bg-ink/5"
                >
                  <img
                    src={img}
                    alt={item.name}
                    className="w-full h-32 object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 border-t-2 border-dashed border-ink flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink/70">
          <div
            className={`w-2 h-2 rounded-full ${item.status === "OPERATIONAL" ? "bg-green-500" : item.status === "OPTIMIZED" ? "bg-orange-500" : "bg-blue-500"}`}
          />
          {item.status}
        </div>
      </div>
    </div>
  );
};

const InformationsPage = () => {
  return (
    <div className="w-full bg-bone min-h-screen page-shell selection:bg-gold selection:text-ink">
      <Section autoHeight={true} className="pt-24 pb-16 px-4 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-6 max-w-5xl mx-auto w-full relative z-10 mb-12 mt-5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gold border-4 border-ink px-6 py-2 shadow-hard transform rotate-1"
          >
            <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-ink">
              THÔNG TIN DỰ ÁN
            </span>
          </motion.div>

          <div className="relative text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase text-ink tracking-tight text-center leading-tight drop-shadow-[4px_4px_0px_#ffd700]"
            >
              HỒ SƠ <span className="text-crimson">DỰ ÁN</span>
            </motion.h1>
          </div>

          <KineticSubline className="max-w-3xl mx-auto text-xl text-center">
            Tổng hợp thành viên thực hiện, tài liệu tham khảo và báo cáo ứng dụng AI trong dự án VNR202.
          </KineticSubline>
        </div>

        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px bg-ink/30 flex-1 max-w-[100px]" />
            <h2 className="text-2xl font-display font-bold text-ink uppercase tracking-widest">
              Thành viên nhóm
            </h2>
            <div className="h-px bg-ink/30 flex-1 max-w-[100px]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {members.map((member) => (
              <div key={member.studentCode} className="w-full h-full">
                <ProfileCard member={member} />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px bg-ink/30 flex-1 max-w-[100px]" />
            <h2 className="text-2xl font-display font-bold text-ink uppercase tracking-widest">
              Tài liệu tham khảo
            </h2>
            <div className="h-px bg-ink/30 flex-1 max-w-[100px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {references.map((reference) => (
              <div key={reference.link} className="w-full h-full">
                <ReferenceCard reference={reference} />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-ink/30 flex-1 max-w-[100px]" />
            <h2 className="text-2xl font-display font-bold text-ink uppercase tracking-widest">
              Ứng dụng AI
            </h2>
            <div className="h-px bg-ink/30 flex-1 max-w-[100px]" />
          </div>

          <KineticSubline className="max-w-4xl mx-auto text-lg md:text-xl text-center leading-relaxed mb-8">
            Báo cáo minh bạch cách nhóm sử dụng AI trong nghiên cứu, vận hành chatbot và phát triển website.
          </KineticSubline>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {tools.map((item) => (
              <div key={item.category} className="h-full">
                <ToolCard item={item} />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white border-4 border-ink p-8 md:p-12 text-center relative shadow-hard-lg">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-crimson text-white px-6 py-2 font-bold font-mono uppercase text-sm border-2 border-ink shadow-sm">
              Academic Integrity
            </div>

            <ShieldAlert size={64} className="text-crimson mx-auto mb-6" />

            <h3 className="font-display text-4xl text-ink uppercase mb-4">
              Cam kết học thuật
            </h3>

            <div className="space-y-4 text-ink/80 text-lg leading-relaxed max-w-2xl mx-auto">
              <p>
                AI chỉ đóng vai trò là <strong>công cụ hỗ trợ</strong> (tra cứu, gợi ý, tối ưu mã nguồn),
                <span className="text-crimson font-bold"> KHÔNG</span> thay thế tư duy.
              </p>
              <p>
                Mọi nội dung chuyên môn đều được đối chiếu với <strong>Giáo trình Tư tưởng Hồ Chí Minh</strong> và
                Văn kiện Đảng.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="text-center pb-12 opacity-50">
          <p className="font-mono text-xs uppercase tracking-widest text-ink">Đại học FPT &copy; 2026</p>
        </div>
      </Section>
    </div>
  );
};

export default InformationsPage;
