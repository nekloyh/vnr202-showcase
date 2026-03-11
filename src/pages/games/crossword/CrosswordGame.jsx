import React, { useMemo, useState, useEffect, useRef } from "react";
import { Mic2, ScrollText, X, HelpCircle, Send, Check, Lightbulb } from "lucide-react";

const VERTICAL_WORD = "KHÁNG CHIẾN";

// Vertical word alignment (non-space cursor index → highlighted char):
//  1. [K] Ế   H O Ạ C H                  -> K (verticalIndex 0)
//  2. Đ Ư Ờ N G   [H] Ồ   C H Í   M I N H -> H (verticalIndex 5)
//  3. P H [Á]   Á P   C H I Ế N   L Ư Ợ C -> Á (verticalIndex 2)
//  4. [N] G U Y Ễ N   V Ă N   T R Ỗ I     -> N (verticalIndex 0)
//  5. [G] E N E V A                        -> G (verticalIndex 0)
//  6. [C] Ố   V Ấ N                        -> C (verticalIndex 0)
//  7. [H] À   N Ộ I                        -> H (verticalIndex 0)
//  8. Đ [I] Ệ N   B I Ê N   P H Ủ         -> I (verticalIndex 1)
//  9. V Ĩ   T U Y [Ế] N   1 7             -> Ế (verticalIndex 5)
// 10. B A   S Ẵ [N]                        -> N (verticalIndex 4)

const CROSSWORD_ROWS = [
  {
    id: 1,
    answer: "KẾ HOẠCH",
    hint1:
      "Trong cơ chế quản lý tập trung, Nhà nước điều hành nền kinh tế chủ yếu thông qua công cụ này.",
    hint2:
      "Ở miền Bắc giai đoạn 1961–1965, công cụ này gắn với mục tiêu xây dựng bước đầu cơ sở vật chất - kỹ thuật của chủ nghĩa xã hội.",
    clue: "Công cụ quản lý kinh tế đặc trưng của cơ chế tập trung bao cấp, gắn với các chỉ tiêu phát triển kinh tế - xã hội ở miền Bắc. (7 chữ cái)",
    verticalIndex: 0,
    anchor: "Chữ K ở vị trí 1",
  },
  {
    id: 2,
    answer: "ĐƯỜNG HỒ CHÍ MINH",
    hint1:
      "Đây là tuyến chi viện chiến lược nối hậu phương lớn với tiền tuyến lớn.",
    hint2: "Tuyến vận tải này gắn với dãy núi chạy dọc phía tây đất nước.",
    clue: "Tên tuyến vận tải chiến lược được mở từ năm 1959 để chi viện cho chiến trường miền Nam. (13 chữ cái)",
    verticalIndex: 5,
    anchor: "Chữ H ở vị trí 6",
  },
  {
    id: 3,
    answer: "PHÁ ẤP CHIẾN LƯỢC",
    hint1:
      "Nhiệm vụ này nhằm chống lại chính sách dồn dân lập khu tập trung của Mỹ - Diệm.",
    hint2:
      "Khẩu hiệu quen thuộc của phong trào này là: ‘Một tấc không đi, một ly không rời’.",
    clue: "Nhiệm vụ trọng tâm của quân dân miền Nam trong thời kỳ chống chiến lược ‘Chiến tranh đặc biệt’, nhằm làm thất bại quốc sách dồn dân của địch. (14 chữ cái)",
    verticalIndex: 2,
    anchor: "Chữ Á ở vị trí 3",
  },
  {
    id: 4,
    answer: "NGUYỄN VĂN TRỖI",
    hint1: "Anh là một chiến sĩ biệt động Sài Gòn, hy sinh năm 1964.",
    hint2:
      "Tên anh gắn với vụ đặt mìn ở cầu Công Lý nhằm vào phái đoàn quân sự cấp cao của Mỹ.",
    clue: "Tên người anh hùng liệt sĩ mưu sát Bộ trưởng Quốc phòng Mỹ Robert McNamara tại cầu Công Lý năm 1964. (13 chữ cái)",
    verticalIndex: 0,
    anchor: "Chữ N ở vị trí 1",
  },
  {
    id: 5,
    answer: "GENEVA",
    hint1:
      "Đây là thành phố của Thụy Sĩ gắn với hiệp định năm 1954 về Đông Dương.",
    hint2:
      "Tên địa danh này thường được phiên âm trong sách giáo khoa là ‘Giơ-ne-vơ’.",
    clue: "Tên quốc tế của thành phố Thụy Sĩ nơi diễn ra hội nghị chấm dứt chiến tranh ở Đông Dương năm 1954. (6 chữ cái)",
    verticalIndex: 0,
    anchor: "Chữ G ở vị trí 1",
  },
  {
    id: 6,
    answer: "CỐ VẤN",
    hint1:
      "Đội ngũ này giữ vai trò tổ chức, chỉ huy và hỗ trợ quân đội Sài Gòn.",
    hint2:
      "Trong chiến lược ‘Chiến tranh đặc biệt’, Mỹ dựa chủ yếu vào quân ngụy dưới sự chỉ đạo của lực lượng này",
    clue: "Tên gọi chung của đội ngũ quân sự Mỹ được đưa vào miền Nam để chỉ huy, huấn luyện và hỗ trợ quân đội Sài Gòn trong chiến lược ‘Chiến tranh đặc biệt’. (5 chữ cái)",
    verticalIndex: 0,
    anchor: "Chữ C ở vị trí 1",
  },
  {
    id: 7,
    answer: "HÀ NỘI",
    hint1:
      "Đây là trung tâm chính trị của nước Việt Nam Dân chủ Cộng hòa sau năm 1954.",
    hint2: "Ngày 10/10/1954, quân ta tiếp quản thành phố này.",
    clue: "Thủ đô của nước Việt Nam Dân chủ Cộng hòa, được tiếp quản ngày 10/10/1954. (5 chữ cái)",
    verticalIndex: 0,
    anchor: "Chữ H ở vị trí 1",
  },
  {
    id: 8,
    answer: "ĐIỆN BIÊN PHỦ",
    hint1:
      "Thắng lợi này tạo điều kiện để đi tới việc ký Hiệp định Giơ-ne-vơ năm 1954.",
    hint2:
      "Đây là chiến thắng quân sự quyết định trong cuộc kháng chiến chống thực dân Pháp.",
    clue: "Tên chiến dịch quân sự năm 1954 làm phá sản hoàn toàn kế hoạch Nava của Pháp. (12 chữ cái)",
    verticalIndex: 1,
    anchor: "Chữ I ở vị trí 2",
  },
  {
    id: 9,
    answer: "VĨ TUYẾN 17",
    hint1: "Gắn liền với hình ảnh cầu Hiền Lương và sông Bến Hải.",
    hint2: "Điểm phân chia địa lý tại Quảng Trị.",
    clue: "Tên gọi thường dùng của giới tuyến quân sự tạm thời chia cắt hai miền Nam - Bắc sau Hiệp định Giơ-ne-vơ. (10 chữ cái)",
    verticalIndex: 5,
    anchor: "Chữ Ế ở vị trí 7",
  },
  {
    id: 10,
    answer: "BA SẴN SÀNG",
    hint1:
      "Đây là phong trào thi đua tiêu biểu của thanh niên miền Bắc trong thời kỳ chống Mỹ.",
    hint2:
      "Ba nội dung nổi tiếng của phong trào này gắn với chiến đấu, nhập ngũ và đi bất cứ nơi đâu Tổ quốc cần.",
    clue: "Tên phong trào hành động cách mạng của thanh niên miền Bắc phát động từ năm 1964 nhằm chống Mỹ, cứu nước. (5 chữ cái)",
    verticalIndex: 4,
    anchor: "Chữ N ở vị trí 6",
  },
];

const normalizeAnswer = (text) =>
    text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Z0-9]/gi, "")
        .toUpperCase();

const getSpacedIndex = (answer, verticalIndex) => {
    let cursor = 0;
    for (let i = 0; i < answer.length; i += 1) {
        if (answer[i] === " ") continue;
        if (cursor === verticalIndex) return i;
        cursor += 1;
    }
    return -1;
};

// Utility: Determine padding to align the vertical word
const getMaxLeftOffset = () => {
    return Math.max(...CROSSWORD_ROWS.map(r => getSpacedIndex(r.answer, r.verticalIndex)));
};

const CrosswordGame = ({ onClose }) => {
    const [activeRow, setActiveRow] = useState(null);
    const [guess, setGuess] = useState("");
    const [openedRows, setOpenedRows] = useState([]);
    const [hostLine, setHostLine] = useState("Chào mừng đến với Ô CHỮ LỊCH SỬ VIỆT NAM 1954–1965!");
    const [, setFeedback] = useState(null); // Used for triggering re-renders
    const [gameState, setGameState] = useState('playing'); // playing, won
    const [hintLevel, setHintLevel] = useState({}); // 0 = no hints, 1 = hint1 unlocked, 2 = both unlocked
    
    // Board logic
    const maxOffset = useMemo(getMaxLeftOffset, []);
    const inputRef = useRef(null);

    // Focus input on selection
    useEffect(() => {
        if (activeRow && inputRef.current) {
            inputRef.current.focus();
        }
    }, [activeRow]);

    const getHintLevel = (rowId) => hintLevel[rowId] || 0;

    const handleRowSelect = (row) => {
        if (openedRows.includes(row.id)) return;
        setActiveRow(row);
        setGuess("");
        setFeedback(null);
        setHostLine(`Hàng ${row.id}: ${row.clue}`);
    };

    const handleRevealHint = () => {
        if (!activeRow) return;
        const current = getHintLevel(activeRow.id);
        if (current >= 2) return;
        const next = current + 1;
        setHintLevel(prev => ({ ...prev, [activeRow.id]: next }));
        const hintText = next === 1 ? activeRow.hint1 : activeRow.hint2;
        setHostLine(`Gợi ý ${next} đã mở!\n\n💡 ${hintText}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!activeRow) return;

        const expected = normalizeAnswer(activeRow.answer);
        const candidate = normalizeAnswer(guess);

        if (!candidate) return;

        if (candidate === expected) {
            const newOpened = [...openedRows, activeRow.id];
            setOpenedRows(newOpened);
            setFeedback({ type: "success", text: "CHÍNH XÁC!" });
            setHostLine(`Tuyệt vời! Hàng ${activeRow.id} đã mở.`);
            
            if (newOpened.length === CROSSWORD_ROWS.length) {
                setGameState('won');
                setHostLine("CHÚC MỪNG! BẠN ĐÃ GIẢI MÃ THÀNH CÔNG TỪ KHÓA: " + VERTICAL_WORD);
                setActiveRow(null);
            } else {
                 setTimeout(() => setActiveRow(null), 800);
            }
        } else {
            setFeedback({ type: "error", text: "SAI RỒI!" });
            
            // Unlock next hint on wrong answer
            const current = getHintLevel(activeRow.id);
            const next = Math.min(current + 1, 2);
            setHintLevel(prev => ({ ...prev, [activeRow.id]: next }));
            
            if (next === 1) {
                setHostLine(`Sai rồi! Gợi ý 1 đã mở.\n\n💡 ${activeRow.hint1}`);
            } else if (next === 2 && current < 2) {
                setHostLine(`Sai rồi! Gợi ý 2 đã mở.\n\n💡 ${activeRow.hint2}`);
            } else {
                setHostLine(`Sai rồi! Hãy thử lại.`);
            }
            
            // Clear the input
            setGuess("");
            
            // Shake effect logic
            const form = document.getElementById('answer-form');
            if(form) {
                form.classList.add('animate-shake');
                setTimeout(() => form.classList.remove('animate-shake'), 500);
            }
        }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/20 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        {/* Main Window */}
        <div className="w-full max-w-[80vw] h-[90vh] bg-[#FFF8E7] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col relative overflow-hidden">
          {/* Title Bar */}
          <div className="h-14 bg-[#FF6B6B] border-b-4 border-black flex items-center justify-between px-4 select-none">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-black bg-white" />
              <div className="w-4 h-4 rounded-full border-2 border-black bg-black" />
              <h2 className="font-display font-black text-xl text-black ml-2 uppercase tracking-wide">
                GAME.EXE: Ô CHỮ - LỊCH SỬ VIỆT NAM 1954–1965
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <X size={24} strokeWidth={3} />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
            {/* Left Panel: The Board */}
            <div className="flex-1 overflow-auto bg-[#F0E6D2] relative custom-scrollbar flex flex-col">
              {/* Background Grid Pattern */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none sticky top-0 left-0 w-full h-full"
                style={{
                  backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>

              {/* Centered Scrollable Container */}
              <div className="min-w-full min-h-full w-max p-10 flex flex-col items-center justify-center">
                <div className="relative z-10">
                  {/* Vertical Highlight Column */}
                  <div
                    className="absolute top-0 bottom-8 w-[52px] bg-[#FFD700]/20 border-x-2 border-dashed border-black/20 pointer-events-none z-0 left-[calc(48px+16px+(var(--offset)*60px))]"
                    style={{ "--offset": maxOffset }}
                  />

                  <div className="flex flex-col gap-4 pb-8">
                    {CROSSWORD_ROWS.map((row) => {
                      const revealed = openedRows.includes(row.id);
                      const isActive = activeRow?.id === row.id;
                      const spacedIdx = getSpacedIndex(
                        row.answer,
                        row.verticalIndex,
                      );
                      const emptyCellsCount = maxOffset - spacedIdx;

                      return (
                        <div
                          key={row.id}
                          className="flex items-center gap-4 group w-max"
                        >
                          {/* Number Button */}
                          <button
                            onClick={() => handleRowSelect(row)}
                            disabled={revealed}
                            className={`w-12 h-12 flex-shrink-0 flex items-center justify-center font-black font-mono text-lg border-4 border-black transition-all relative z-20
                                                        ${
                                                          revealed
                                                            ? "bg-black text-white cursor-default"
                                                            : isActive
                                                              ? "bg-[#FF6B6B] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                                                              : "bg-white text-black hover:bg-[#FFD700] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                                                        }`}
                          >
                            {row.id}
                          </button>

                          {/* Row Cells - Ensure W-MAX to prevent wrapping/crushing */}
                          <div className="flex items-center gap-2">
                            {/* Hidden Spacers */}
                            {Array.from({ length: emptyCellsCount }).map(
                              (_, i) => (
                                <div
                                  key={`empty-${i}`}
                                  className="w-[52px] h-[52px] flex-shrink-0"
                                />
                              ),
                            )}

                            {row.answer
                              .toUpperCase()
                              .split("")
                              .map((char, idx) => {
                                const isSpace = char === " ";
                                const isVerticalKey = idx === spacedIdx;

                                // Always render the box, even if empty/hidden
                                let cellContent =
                                  !isSpace && revealed ? char : "";
                                let cellStyle =
                                  "bg-[#E5E5E5] border-2 border-dashed border-black/30 text-transparent"; // Default hidden

                                if (isSpace) {
                                  // Space is invisible but takes up layout space
                                  cellStyle = "opacity-0 border-none";
                                } else if (revealed) {
                                  cellStyle = isVerticalKey
                                    ? "bg-[#FFD700] border-4 border-black text-black z-10"
                                    : "bg-white border-2 border-black text-black";
                                } else if (isActive) {
                                  cellStyle =
                                    "bg-[#FF6B6B]/20 border-2 border-black/50 text-transparent animate-pulse";
                                }

                                return (
                                  <div
                                    key={idx}
                                    className={`w-[52px] h-[52px] flex-shrink-0 flex items-center justify-center text-2xl font-black select-none transition-all duration-300 ${cellStyle}`}
                                  >
                                    {cellContent}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Controls */}
            <div className="w-full lg:w-[420px] bg-white border-l-4 border-black flex flex-col overflow-hidden relative z-20">
              {/* MC / Info Section */}
              <div className="p-6 bg-[#A78BFA] border-b-4 border-black relative overflow-hidden">
                {/* Retro Pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)",
                    backgroundSize: "10px 10px",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3 bg-black text-white px-3 py-1 inline-block border-2 border-white transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                    <Mic2 size={16} />
                    <span className="font-mono text-sm font-bold uppercase">
                      LIVE FEED
                    </span>
                  </div>
                  <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-bold text-lg leading-tight first-letter:text-4xl first-letter:font-black first-letter:float-left first-letter:mr-2">
                      {hostLine}
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Zone */}
              <div className="flex-1 p-6 flex flex-col gap-6 bg-[#FFF]">
                {/* Stats */}
                <div className="flex gap-4">
                  <div className="flex-1 bg-[#4ADE80] border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-xs font-black uppercase mb-1">
                      Tiến trình
                    </div>
                    <div className="text-3xl font-black">
                      {openedRows.length}/{CROSSWORD_ROWS.length}
                    </div>
                  </div>
                  <div className="flex-1 bg-[#FACC15] border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-xs font-black uppercase mb-1">
                      Từ Khóa
                    </div>
                    <div className="text-xl font-black truncate tracking-tighter">
                      {gameState === "won" ? VERTICAL_WORD : "???"}
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div
                  id="answer-form"
                  className={`border-4 border-black p-6 relative flex-grow flex flex-col justify-center transition-all ${activeRow ? "bg-[#FF6B6B] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" : "bg-gray-100 border-dashed"}`}
                >
                  {activeRow ? (
                    <form
                      onSubmit={handleSubmit}
                      className="h-full flex flex-col"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <span className="bg-black text-white px-2 py-1 font-mono text-sm font-bold transform -rotate-1">
                          HÀNG {activeRow.id}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveRow(null)}
                          className="p-1 hover:bg-black hover:text-white rounded-full border-2 border-black transition-colors bg-white"
                        >
                          <X size={16} strokeWidth={3} />
                        </button>
                      </div>

                      <p className="font-bold text-lg mb-3 leading-snug bg-white/50 p-3 border-2 border-black/20 rounded">
                        {activeRow.clue}
                      </p>
                      
                      {/* Hint 1 */}
                      <div className={`border-2 border-black p-3 mb-2 rounded transition-all ${
                        getHintLevel(activeRow.id) >= 1
                          ? 'bg-[#FACC15]'
                          : 'bg-gray-200 opacity-60'
                      }`}>
                        <p className="font-semibold text-base">
                          <Lightbulb size={16} className="inline mr-1" />
                          {getHintLevel(activeRow.id) >= 1
                            ? activeRow.hint1
                            : '🔒 Gợi ý 1 — mở khi trả lời sai hoặc nhấn ?'}
                        </p>
                      </div>

                      {/* Hint 2 */}
                      <div className={`border-2 border-black p-3 mb-4 rounded transition-all ${
                        getHintLevel(activeRow.id) >= 2
                          ? 'bg-[#FACC15]'
                          : 'bg-gray-200 opacity-60'
                      }`}>
                        <p className="font-semibold text-base">
                          <Lightbulb size={16} className="inline mr-1" />
                          {getHintLevel(activeRow.id) >= 2
                            ? activeRow.hint2
                            : '🔒 Gợi ý 2 — mở khi trả lời sai 2 lần hoặc nhấn ?'}
                        </p>
                      </div>

                      <div className="relative mb-4">
                        <input
                          ref={inputRef}
                          type="text"
                          value={guess}
                          onChange={(e) => setGuess(e.target.value)}
                          className="w-full h-14 border-4 border-black px-4 font-black text-2xl uppercase focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow placeholder:text-black/30"
                          placeholder="NHẬP..."
                        />
                        {guess && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Send size={20} />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex-1 h-12 bg-black text-white font-black uppercase tracking-wider border-2 border-black hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                        >
                          XÁC NHẬN
                        </button>
                        <button
                          type="button"
                          onClick={handleRevealHint}
                          disabled={getHintLevel(activeRow.id) >= 2}
                          title="Mở gợi ý"
                          className={`w-12 h-12 flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-colors ${
                            getHintLevel(activeRow.id) >= 2
                              ? 'bg-gray-300 cursor-not-allowed opacity-50'
                              : 'bg-[#FACC15] hover:bg-[#eab308]'
                          }`}
                        >
                          <HelpCircle size={24} strokeWidth={3} />
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center opacity-40">
                      <div className="text-6xl font-black mb-2 select-none">
                        ?
                      </div>
                      <p className="font-bold uppercase">
                        Chọn hàng để mở khóa
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-black text-white px-4 py-1 text-xs font-mono flex justify-between uppercase">
            <span>HỆ THỐNG_SẴN SÀNG</span>
            <span>VNR202-SHOWCASE v2.0</span>
          </div>
        </div>
      </div>
    );
};

export default CrosswordGame;
