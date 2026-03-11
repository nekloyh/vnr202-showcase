import { Send, Bot, User } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { sendMessageToAI } from "../../services/aiService";
import Button from "../../components/ui/Button";

const AITalkingAvatar = () => (
  <div className="w-10 h-10 flex items-center justify-center bg-crimson border-2 border-charcoal shadow-hard-sm">
    <Bot className="text-bone w-5 h-5" />
  </div>
);

const AIResponse = ({ text, isLoading }) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    className="w-full flex gap-3 mb-6"
  >
    <div className="shrink-0 mt-1">
      <AITalkingAvatar />
    </div>
    <div className="bg-paper p-5 md:p-6 border-2 border-charcoal/30 shadow-hard-sm max-w-[90%] xl:max-w-4xl">
      <h4 className="font-mono text-xs text-crimson mb-1.5 uppercase tracking-wider font-bold">
        Sử Đảng
      </h4>
      <div className="ai-markdown text-ink font-body text-base leading-relaxed min-h-[1.5rem]">
        {isLoading ? (
          <div className="flex gap-2 py-1">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-2.5 h-2.5 bg-crimson" />
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2.5 h-2.5 bg-gold" />
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-2.5 h-2.5 bg-olive" />
          </div>
        ) : (
          <ReactMarkdown>{text}</ReactMarkdown>
        )}
      </div>
    </div>
  </motion.div>
);

const UserPrompt = ({ text }) => (
  <motion.div
    initial={{ opacity: 0, x: 12 }}
    animate={{ opacity: 1, x: 0 }}
    className="w-full flex items-start justify-end gap-3 mb-6"
  >
    <div className="p-5 md:p-6 bg-blue text-bone border-2 border-charcoal/30 shadow-hard-sm max-w-[90%] xl:max-w-4xl text-left">
      <p className="font-body leading-relaxed text-base font-semibold break-words">{text}</p>
    </div>
    <div className="shrink-0 w-10 h-10 bg-paper flex items-center justify-center border-2 border-charcoal shadow-hard-sm">
      <User className="text-ink w-5 h-5" />
    </div>
  </motion.div>
);

const AIPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "ai",
      text: `Xin chào. Tôi là Sử Đảng, trợ lý học thuật chuyên về môn Lịch sử Đảng Cộng sản Việt Nam. Tôi có thể hỗ trợ bạn tìm hiểu, ôn tập và hệ thống hóa kiến thức giai đoạn đấu tranh kháng chiến chống Pháp và Mỹ (1945–1975). Bạn muốn bắt đầu từ nội dung nào?`,
    },
  ]);
  const inputRef = useRef();
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
    if (!userMessage || isLoading) return;

    const newUserMsg = { role: "user", text: userMessage };
    setChatHistory((prev) => [...prev, newUserMsg]);
    inputRef.current.value = "";
    setIsLoading(true);

    const loadingMsg = { role: "ai", text: "...", isLoading: true };
    setChatHistory((prev) => [...prev, loadingMsg]);

    try {
      const formattedHistory = chatHistory.map((msg) => ({
        role: msg.role === "ai" ? "assistant" : "user",
        content: msg.text,
      }));

      const response = await sendMessageToAI(userMessage, formattedHistory);

      setChatHistory((prev) => {
        const newHistory = prev.filter((msg) => !msg.isLoading);
        return [...newHistory, { role: "ai", text: response }];
      });
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => {
        const newHistory = prev.filter((msg) => !msg.isLoading);
        return [
          ...newHistory,
          {
            role: "ai",
            text: "Xin lỗi, hệ thống đang gặp sự cố kết nối. Bạn thử lại sau nhé!",
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-bone">
      {/* Header */}
      <div className="shrink-0 pt-20 pb-3 px-6 md:px-10 flex items-center justify-center gap-4 border-b-2 border-charcoal/15">
        <span className="brutal-badge shrink-0">Hồ sơ 05</span>
        <h1 className="font-display font-black text-2xl md:text-3xl uppercase text-ink tracking-tight leading-none">
          Hỏi đáp cùng <span className="text-crimson">Bot VNR202</span>
        </h1>
      </div>

      {/* Chat area */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col overflow-hidden px-4 md:px-8">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
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

        {/* Input area */}
        <div className="shrink-0 border-t-2 border-charcoal/15 py-5">
          <form
            onSubmit={handleFormSubmit}
            className="relative flex items-center gap-3 w-full max-w-5xl mx-auto"
          >
            <input
              ref={inputRef}
              type="text"
              disabled={isLoading}
              placeholder="Nhập truy vấn lịch sử của bạn tại đây..."
              className="w-full pl-5 pr-16 py-4 bg-paper border-2 border-charcoal shadow-hard-sm font-body text-ink placeholder:text-graphite/60 focus:outline-none focus:shadow-hard transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <Button
              type="submit"
              disabled={isLoading}
              variant="danger"
              className="absolute right-2 px-4 py-2.5 h-auto"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-bone/30 border-t-bone rounded-full animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 mt-3 max-w-5xl mx-auto">
            {[
              "Tóm tắt sự ra đời của Đảng Cộng sản Việt Nam năm 1930",
              "Ý nghĩa lịch sử của Cách mạng Tháng Tám 1945 là gì?",
            ].map((q, i) => (
              <button
                key={i}
                type="button"
                disabled={isLoading}
                onClick={() => {
                  inputRef.current.value = q;
                }}
                className="px-3 py-1.5 text-xs font-mono font-bold bg-paper text-ink border-2 border-charcoal/30 hover:border-charcoal hover:shadow-hard-sm transition-all disabled:opacity-50 cursor-pointer truncate max-w-xs"
              >
                {q}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-graphite font-mono mt-2.5 max-w-md mx-auto">
            * AI có thể mắc lỗi. Luôn đối chiếu với Giáo trình lịch sử ĐCSVN.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIPage;
