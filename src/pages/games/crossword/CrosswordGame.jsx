import React, { useMemo, useState, useEffect, useRef } from "react";
import { Mic2, ScrollText, X, HelpCircle, Send, Check, Lightbulb } from "lucide-react";

const VERTICAL_WORD = "MIỀN NAM";

// Vertical word alignment (non-space cursor index → highlighted char):
// 1. N Ă [M]   1 9 5 4         -> M (verticalIndex 2)
// 2. V [Ĩ]   T U Y Ế N        -> Ĩ (verticalIndex 1, base I)
// 3. T Ổ N G   T U Y [Ể] N   C Ử -> Ể (verticalIndex 7, base E)
// 4. Đ Ồ [N] G   K H Ở I      -> N (verticalIndex 2)
// 5. Ấ P   C H I Ế [N]   L Ư Ợ C -> N (verticalIndex 6)
// 6. C H I Ế N   T R [A] N H  -> A (verticalIndex 7)
// 7. [M] Ặ T   T R Ậ N        -> M (verticalIndex 0)

const CROSSWORD_ROWS = [
  {
    id: 1,
    answer: "NĂM 1954",
    hint1: "Năm ký kết Hiệp định kết thúc chiến tranh Đông Dương lần thứ nhất.",
    hint2: "Cũng là năm diễn ra chiến thắng Điện Biên Phủ lừng lẫy, \"chấn động địa cầu.\"",
    clue: "Mốc thời gian quan trọng đánh dấu sự chia cắt đất nước tại một hội nghị quốc tế. (7 ký tự)",
    verticalIndex: 2,
    anchor: "Chữ M ở vị trí 3",
  },
  {
    id: 2,
    answer: "VĨ TUYẾN",
    hint1: "Đường phân chia tạm thời chạy ngang qua tỉnh Quảng Trị.",
    hint2: "Con số đi kèm là 17, nằm trên sông Bến Hải.",
    clue: "Đường ranh giới tạm thời chia cắt Việt Nam thành hai miền theo Hiệp định Geneva. (7 chữ cái)",
    verticalIndex: 1,
    anchor: "Chữ I ở vị trí 2",
  },
  {
    id: 3,
    answer: "TỔNG TUYỂN CỬ",
    hint1: "Theo Hiệp định Geneva, sự kiện này phải được tổ chức trong vòng 2 năm sau ký kết.",
    hint2: "Chính quyền Ngô Đình Diệm từ chối tham gia vì lo ngại kết quả bất lợi.",
    clue: "Cuộc bỏ phiếu toàn quốc dự kiến vào năm 1956 nhằm thống nhất đất nước nhưng không bao giờ diễn ra. (11 chữ cái)",
    verticalIndex: 7,
    anchor: "Chữ E ở vị trí 8",
  },
  {
    id: 4,
    answer: "ĐỒNG KHỞI",
    hint1: "Bắt đầu mạnh mẽ nhất tại tỉnh Bến Tre, lan rộng ra nhiều tỉnh miền Nam.",
    hint2: "Bà Nguyễn Thị Định là nhân vật tiêu biểu của phong trào này.",
    clue: "Phong trào đấu tranh vũ trang và chính trị bùng nổ ở miền Nam năm 1960. (8 chữ cái)",
    verticalIndex: 2,
    anchor: "Chữ N ở vị trí 3",
  },
  {
    id: 5,
    answer: "ẤP CHIẾN LƯỢC",
    hint1: "Chính sách do chính quyền Ngô Đình Diệm thực hiện với sự hậu thuẫn của Mỹ đầu thập niên 1960.",
    hint2: "Mục đích là tách lực lượng cách mạng ra khỏi nhân dân, nhưng gặp sự phản đối mạnh mẽ.",
    clue: "Chương trình dồn dân lập làng có hàng rào nhằm cô lập cách mạng khỏi nông thôn miền Nam. (11 chữ cái)",
    verticalIndex: 6,
    anchor: "Chữ N ở vị trí 7",
  },
  {
    id: 6,
    answer: "CHIẾN TRANH",
    hint1: "Có nhiều cách gọi khác nhau tùy góc nhìn: kháng chiến, nội chiến, hay xung đột ủy nhiệm.",
    hint2: "Cuộc xung đột này leo thang mạnh từ giữa thập niên 1960 khi Mỹ đưa quân trực tiếp tham chiến.",
    clue: "Cuộc xung đột vũ trang kéo dài hàng thập kỷ trên lãnh thổ Việt Nam với sự can thiệp của nước ngoài. (10 chữ cái)",
    verticalIndex: 7,
    anchor: "Chữ A ở vị trí 8",
  },
  {
    id: 7,
    answer: "MẶT TRẬN",
    hint1: "Tên đầy đủ bao gồm cụm từ \"Dân tộc Giải phóng miền Nam Việt Nam.\"",
    hint2: "Tổ chức chính trị đại diện cho phong trào cách mạng miền Nam, thành lập tháng 12/1960.",
    clue: "Tổ chức chính trị được thành lập năm 1960 nhằm tập hợp các lực lượng đấu tranh ở miền Nam. (7 chữ cái)",
    verticalIndex: 0,
    anchor: "Chữ M ở vị trí 1",
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
                      {openedRows.length}/7
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
