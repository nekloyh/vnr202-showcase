import { Send, Bot, User } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { sendMessageToAI } from "../../services/aiService";
import Section from "../../components/layout/Section";
import Button from "../../components/ui/Button";

const AITalkingAvatar = () => {
  return (
    <div className="w-12 h-12 flex items-center justify-center bg-ink border-2 border-ink shadow-hard-sm rounded-none">
      <Bot className="text-bone w-7 h-7" />
    </div>
  );
};

const AIResponse = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full flex gap-4 mb-8"
    >
      <div className="shrink-0 mt-1">
        <AITalkingAvatar />
      </div>
      <div className="bg-bone p-5 border-4 border-ink shadow-[4px_4px_0_0_#d91c1c] rounded-none max-w-[85%] md:max-w-[75%] relative">
        <h4 className="font-display text-crimson text-sm mb-2 uppercase tracking-wide font-bold">Sử Đảng</h4>
        <div className="ai-markdown text-ink font-body text-lg leading-relaxed">
          <ReactMarkdown>{text}</ReactMarkdown>
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
      className="w-full flex items-center justify-end gap-3 mb-8"
    >
      <div className="p-5 bg-ink text-bone border-4 border-ink shadow-[4px_4px_0_0_#ffd700] rounded-none max-w-[80%] md:max-w-[70%] text-right relative">
        <p className="wrap-break-word font-body leading-relaxed">{text}</p>
      </div>
      <div className="shrink-0 w-12 h-12 bg-white flex items-center justify-center border-4 border-ink shadow-hard-sm rounded-none">
        <User className="text-ink w-6 h-6" />
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
    <div className="w-full h-screen flex flex-col bg-bone">
      <Section className="flex-1 flex flex-col items-center pt-20 pb-4 px-4 md:px-8 border-b-0 h-full">
        <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col overflow-hidden px-0 lg:px-4 h-full">

          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-5 shrink-0 relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-crimson border-2 border-ink px-4 py-1.5 shadow-hard-sm mb-3"
            >
              <span className="font-mono font-bold uppercase tracking-widest text-xs text-bone">
                TRỢ LÝ AI
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-5xl md:text-7xl uppercase text-ink tracking-tight text-center leading-tight drop-shadow-[2px_2px_0px_#ffd700]"
            >
              Hỏi đáp cùng <span className="text-crimson">VNR202 Bot</span>
            </motion.h1>
          </div>

          {/* Chat Container */}
          <div className="flex-1 bg-white border-4 border-ink shadow-hard-lg flex flex-col relative overflow-hidden rounded-none mb-4">

            {/* Decorative Header Bar */}
            <div className="h-10 bg-ink flex items-center justify-between px-4 shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-none bg-crimson border border-white/20"></div>
                <div className="w-3 h-3 rounded-none bg-gold border border-white/20"></div>
                <div className="w-3 h-3 rounded-none bg-blue-500 border border-white/20"></div>
              </div>
              <div className="text-white/60 text-xs font-mono tracking-widest uppercase">VNR202_CONSOLE v2.0</div>
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
                      <AIResponse text={msg.text} />
                    ) : (
                      <UserPrompt text={msg.text} />
                    )}
                  </div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-bone border-t-2 border-ink shrink-0">
              <form
                onSubmit={handleFormSubmit}
                className="relative flex items-center gap-3 max-w-4xl mx-auto"
              >
                <input
                  ref={inputRef}
                  type="text"
                  disabled={isLoading}
                  placeholder="Nhập câu hỏi của bạn tại đây..."
                  className="w-full pl-6 pr-16 py-4 bg-white border-2 border-ink rounded-none font-body text-graphite placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-gold/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-hard-sm"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="primary"
                  className="absolute right-2 px-3 py-2 h-auto"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                </Button>
              </form>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-4xl mx-auto">
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
                    className="px-3 py-1.5 text-xs md:text-sm font-mono font-bold bg-white text-ink border-2 border-ink hover:bg-ink/5 hover:text-crimson transition-colors disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <p className="text-center text-xs text-graphite/60 mt-3 font-mono">
                * AI có thể mắc lỗi. Hãy kiểm tra lại thông tin.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default AIPage;
