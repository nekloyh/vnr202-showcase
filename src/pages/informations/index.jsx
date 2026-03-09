import { motion } from "framer-motion";
import {
  Crown,
  FileText,
  Video,
  Newspaper,
  ExternalLink,
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

const ProfileCard = ({ member }) => {
  const isLeader = member.role === "leader";
  const isFemale = member.gender === "female";
  const avatarSrc = isFemale ? "/images/user/female.png" : "/images/user/male.png";

  return (
    <div
      className={`brutal-card relative group h-full flex flex-col p-4 md:p-6 overflow-hidden border-4 border-ink shadow-hard bg-white`}
    >
      <div className="flex justify-between items-start mb-6">
        {/* Avatar Image */}
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

        {/* Name & Role */}
        <div className="text-right flex-1 pl-4">
          <h3 className="font-display text-2xl text-ink leading-tight uppercase mb-2">
            {member.name}
          </h3>
          <div className="text-sm font-mono text-ink/60 mb-1">{member.studentCode}</div>
          <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-ink ${isLeader ? 'bg-gold text-ink' : 'bg-gray-100 text-ink/70'}`}>
            {isLeader ? "Trưởng Nhóm" : "Thành Viên"}
          </span>
        </div>
      </div>

      {/* Tasks */}
      <div className="mt-auto border-t-2 border-dashed border-ink/20 pt-4">
        <ul className="space-y-2">
          {member.task.map((t, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm font-body text-ink leading-snug">
              <span className="mt-1.5 w-1.5 h-1.5 bg-crimson rounded-full shrink-0"></span>
              {t}
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
      case "video": return Video;
      case "document": return FileText;
      default: return Newspaper;
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

const InformationsPage = () => {
  return (
    <div className="w-full bg-bone min-h-screen page-shell selection:bg-gold selection:text-ink">
      <Section autoHeight={true} className="pt-24 pb-16 px-4 md:px-8">

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center space-y-6 max-w-5xl mx-auto w-full relative z-10 mb-12 mt-5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gold border-4 border-ink px-6 py-2 shadow-hard transform rotate-1"
          >
            <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-ink">
              THÔNG TIN CHUNG
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

          <KineticSubline className="max-w-2xl mx-auto text-xl text-center">
            Nhóm thực hiện đề tài VNR202: Lịch sử Đảng Cộng sản Việt Nam.
          </KineticSubline>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px bg-ink/30 flex-1 max-w-[100px]"></div>
            <h2 className="text-2xl font-display font-bold text-ink uppercase tracking-widest">
              Thành viên nhóm
            </h2>
            <div className="h-px bg-ink/30 flex-1 max-w-[100px]"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {members.map((m, index) => (
              <div key={index} className="w-full h-full">
                <ProfileCard member={m} />
              </div>
            ))}
          </div>
        </div>

        {/* References Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px bg-ink/30 flex-1 max-w-[100px]"></div>
            <h2 className="text-2xl font-display font-bold text-ink uppercase tracking-widest">
              Tài liệu tham khảo
            </h2>
            <div className="h-px bg-ink/30 flex-1 max-w-[100px]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {references.map((ref, index) => (
              <div key={index} className="w-full h-full">
                <ReferenceCard reference={ref} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pb-12 opacity-50">
          <p className="font-mono text-xs uppercase tracking-widest text-ink">
            Đại học FPT &copy; 2026
          </p>
        </div>
      </Section>
    </div>
  );
};

export default InformationsPage;

