import { Send, Bot, User } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { sendMessageToAI } from "../../services/aiService";
import Section from "../../components/layout/Section";
import Button from "../../components/ui/Button";

const AITalkingAvatar = () => {
  return (
    <div className="w-14 h-14 flex items-center justify-center bg-crimson border-[4px] border-ink shadow-[4px_4px_0_#000] rounded-none">
      <Bot className="text-white w-8 h-8" />
    </div>
  );
};

const AIResponse = ({ text, isLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full flex gap-4 mb-10"
    >
      <div className="shrink-0 mt-1 flex-col items-center">
        <AITalkingAvatar />
      </div>
      <div className="bg-bone p-6 md:p-8 border-[6px] border-ink shadow-[12px_12px_0_0_#d91c1c] rounded-none max-w-[95%] md:max-w-[85%] xl:max-w-[1000px] relative">
        <h4 className="font-display text-crimson text-sm mb-2 uppercase tracking-wide font-black">Sử Đảng</h4>
        <div className="ai-markdown text-ink font-body text-xl font-medium leading-relaxed min-h-[1.5rem]">
          {isLoading ? (
            <div className="flex gap-2 py-2">
              <motion.div 
                animate={{ y: [0, -8, 0] }} 
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} 
                className="w-4 h-4 bg-crimson"
              />
              <motion.div 
                animate={{ y: [0, -8, 0] }} 
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} 
                className="w-4 h-4 bg-gold"
              />
              <motion.div 
                animate={{ y: [0, -8, 0] }} 
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} 
                className="w-4 h-4 bg-blue-500"
              />
            </div>
          ) : (
            <ReactMarkdown>{text}</ReactMarkdown>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const UserPrompt = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full flex items-start justify-end gap-4 mb-10"
    >
      <div className="p-6 md:p-8 bg-[#1976D2] text-white border-[6px] border-ink shadow-[16px_16px_0_0_#000] rounded-none max-w-[90%] md:max-w-[85%] xl:max-w-[1000px] text-left relative">
        <p className="wrap-break-word font-body leading-relaxed md:text-2xl font-bold">{text}</p>
      </div>
      <div className="shrink-0 w-14 h-14 bg-white flex items-center justify-center border-[4px] border-ink shadow-[4px_4px_0_#000] rounded-none">
        <User className="text-ink w-8 h-8" />
      </div>
    </motion.div>
  );
};

const AIPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "ai",
      text: `Xin chào. Tôi là Sử Đảng – trợ lý học thuật chuyên về môn Lịch sử Đảng Cộng sản Việt Nam. Tôi có thể hỗ trợ bạn tìm hiểu, ôn tập và hệ thống hóa kiến thức các giai đoạn: sự ra đời của Đảng (1920–1930), đấu tranh giành chính quyền (1930–1945), kháng chiến chống Pháp và Mỹ (1945–1975), cùng công cuộc đổi mới (1975–2018). Bạn muốn bắt đầu từ nội dung nào?`,
    },
  ]);
  const inputRef = useRef();
  // Use a ref callback to scroll to bottom reliably
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();

    if (!userMessage || isLoading) {
      return;
    }

    const newUserMsg = { role: "user", text: userMessage };
    setChatHistory((prev) => [...prev, newUserMsg]);

    inputRef.current.value = "";
    setIsLoading(true);

    // Initial dummy loading state
    const loadingMsg = { role: "ai", text: "...", isLoading: true };
    setChatHistory((prev) => [...prev, loadingMsg]);

    try {
      const formattedHistory = chatHistory.map((msg) => ({
        role: msg.role === "ai" ? "assistant" : "user",
        content: msg.text,
      }));

      const response = await sendMessageToAI(userMessage, formattedHistory);

      setChatHistory((prev) => {
        // Remove loading message and add real response
        const newHistory = prev.filter(msg => !msg.isLoading);
        return [...newHistory, { role: "ai", text: response }];
      });
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => {
        const newHistory = prev.filter(msg => !msg.isLoading);
        return [...newHistory, {
          role: "ai",
          text: "Xin lỗi, Cộng đang gặp chút sự cố kết nối. Bạn thử lại sau nhé!",
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#EEEEEE]">
      <Section className="flex-1 flex flex-col items-center pt-8 md:pt-10 pb-4 px-4 md:px-8 border-b-0 h-full relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="w-full flex-1 flex flex-col overflow-hidden px-0 h-full relative z-10">

          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-6 shrink-0 relative z-10 w-full mt-2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-ink border-[4px] border-ink px-6 py-2 shadow-[8px_8px_0_#D32F2F] transform -rotate-1 mb-4"
            >
              <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-white">
                HỒ SƠ 06 — HỆ THỐNG TRUY VẤN AI
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-[clamp(4rem,6vw,6rem)] uppercase text-ink tracking-tighter text-center leading-none drop-shadow-[6px_6px_0px_#F9F9F9]"
            >
              HỎI ĐÁP CÙNG <span className="text-crimson bg-white px-4 border-[6px] border-ink drop-shadow-[8px_8px_0_#D32F2F] ml-2 transform rotate-1 inline-block">BOT VNR202</span>
            </motion.h1>
          </div>

          {/* Chat Container */}
          <div className="flex-1 w-full max-w-7xl mx-auto bg-white border-[8px] border-ink shadow-[24px_24px_0_0_#000] flex flex-col relative overflow-hidden rounded-none mb-8">

            {/* Decorative Header Bar */}
            <div className="h-14 bg-ink flex items-center justify-between px-6 shrink-0 border-b-[6px] border-ink">
              <div className="flex gap-4">
                <div className="w-4 h-4 rounded-none bg-crimson border-2 border-ink shadow-[2px_2px_0_#FFF]"></div>
                <div className="w-4 h-4 rounded-none bg-gold border-2 border-ink shadow-[2px_2px_0_#FFF]"></div>
                <div className="w-4 h-4 rounded-none bg-[#1976D2] border-2 border-ink shadow-[2px_2px_0_#FFF]"></div>
              </div>
              <div className="text-white text-sm font-black font-mono tracking-widest uppercase">VNR202_CONSOLE v3.0</div>
            </div>

            {/* Messages Area */}
            <div
              id="chat_content"
              className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth custom-scrollbar bg-white"
            >
              <AnimatePresence>
                {chatHistory.map((msg, index) => (
                  <div key={index}>
                    {msg.role === "ai" ? (
                      <AIResponse text={msg.text} isLoading={msg.isLoading} />
                    ) : (
                      <UserPrompt text={msg.text} />
                    )}
                  </div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-8 bg-[#FAFAFA] border-t-[8px] border-ink shrink-0 relative">
              <form
                onSubmit={handleFormSubmit}
                className="relative flex items-center gap-4 w-full max-w-5xl mx-auto"
              >
                <input
                  ref={inputRef}
                  type="text"
                  disabled={isLoading}
                  placeholder="Nhập truy vấn lịch sử của bạn tại đây..."
                  className="w-full pl-8 pr-20 py-6 bg-white border-[6px] border-ink shadow-[8px_8px_0_#000] rounded-none font-body text-ink font-bold md:text-xl placeholder:text-graphite focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="primary"
                  className="absolute right-4 px-6 py-4 h-auto text-2xl border-[4px] border-ink shadow-[4px_4px_0_#000] transition-transform font-black !bg-crimson !text-white hover:!bg-gold hover:!text-ink"
                >
                  {isLoading ? (
                    <div className="w-8 h-8 border-[4px] border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={24} />
                  )}
                </Button>
              </form>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6 w-full max-w-5xl mx-auto">
                {[
                  "Tóm tắt sự ra đời của Đảng Cộng sản Việt Nam năm 1930",
                  "Ý nghĩa lịch sử của Cách mạng Tháng Tám 1945 là gì?",
                  "Đại hội VI và đường lối đổi mới của Đảng có nội dung gì?"
                ].map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                       inputRef.current.value = q;
                    }}
                    className="px-4 py-2 text-sm md:text-base font-mono font-bold bg-white text-ink border-[4px] border-ink shadow-[4px_4px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-gold transition-all disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-graphite font-black mt-6 font-mono border-t-[4px] border-dashed border-ink/20 pt-4 max-w-md mx-auto">
                * AI có thể mắc lỗi. Luôn đối chiếu với Giáo trình lịch sử ĐCSVN.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default AIPage;
