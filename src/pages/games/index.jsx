import { useState, useEffect } from "react";
import { Gamepad2, ScrollText, Trophy, Zap, BookOpen, X, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../components/layout/Section";
import Button from "../../components/ui/Button";
import RunnerQuizGame from "./runner-quiz/three/RunnerQuiz3DWrapper";
import CrosswordGame from "./crossword/CrosswordGame";
import { fetchLeaderboard } from "../../services/runnerQuizApi";

const GuideModal = ({ gameId, onClose }) => {
    const guides = {
        1: { // Runner Quiz
            title: "RUNNER QUIZ",
            sections: [
                {
                    heading: "Cách chơi",
                    content: [
                        "Di chuyển giữa 4 làn đường bằng phím ← → hoặc A/D",
                        "Mỗi làn tương ứng với một đáp án A, B, C, D",
                        "Nhấn SPACE hoặc Enter để khóa đáp án sớm và nhận điểm cao hơn",
                        "Nếu không nhấn, đáp án sẽ được tính khi tường chạm vào bạn"
                    ]
                },
                {
                    heading: "Hệ thống điểm & Mạng",
                    content: [
                        "Trả lời càng nhanh → điểm càng cao (200-500 điểm)",
                        "Bạn có 3 mạng (trái tim) để chơi",
                        "Sai hoặc hết giờ = mất 1 mạng",
                        "Hết mạng = Game Over, điểm được lưu vào bảng xếp hạng"
                    ]
                },
                {
                    heading: "Độ khó tăng dần",
                    content: [
                        "Thời gian trả lời bắt đầu từ 20 giây",
                        "Mỗi câu đúng, thời gian sẽ giảm dần (tối thiểu 12 giây)",
                        "Trả lời hết tất cả câu hỏi để chiến thắng!"
                    ]
                }
            ]
        },
        2: { // Ô chữ
            title: "Ô CHỮ LỊCH SỬ",
            sections: [
                {
                    heading: "Luật chơi",
                    content: [
                        "Giải 7 hàng ngang để tìm ra từ khóa dọc bí ẩn",
                        "Mỗi hàng ngang là một câu hỏi về lịch sử Việt Nam giai đoạn 1954–1965",
                        "Nhập đáp án vào ô trống (có dấu, có khoảng cách)"
                    ]
                },
                {
                    heading: "Cách nhập đáp án",
                    content: [
                        "Click vào hàng ngang muốn giải",
                        "Đọc câu hỏi — gợi ý sẽ khóa lúc đầu",
                        "Trả lời sai hoặc nhấn nút ? để mở gợi ý (tối đa 2 gợi ý)",
                        "Nhập câu trả lời và nhấn Enter hoặc nút Xác nhận"
                    ]
                },
                {
                    heading: "Chiến thắng",
                    content: [
                        "Giải đúng tất cả hàng ngang để lộ diện từ khóa: MIỀN NAM",
                        "Từ khóa dọc sẽ sáng lên khi bạn hoàn thành",
                        "Không giới hạn thời gian - hãy suy nghĩ kỹ!"
                    ]
                }
            ]
        }
    };

    const guide = guides[gameId] || guides[1];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-2xl max-h-[80vh] bg-bone border-4 border-ink shadow-hard-xl flex flex-col relative overflow-hidden">
                <div className="h-12 bg-ink text-bone flex items-center justify-between px-4 border-b-4 border-ink select-none shrink-0">
                    <div className="flex items-center gap-2">
                        <Info size={20} />
                        <span className="font-mono font-bold uppercase">HƯỚNG DẪN: {guide.title}</span>
                    </div>
                    <button onClick={onClose} className="hover:text-crimson transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="space-y-6">
                        {guide.sections.map((section, idx) => (
                            <div key={idx} className="border-2 border-ink/20 p-4 bg-white shadow-sm">
                                <h3 className="font-display text-xl font-bold text-ink uppercase mb-3 pb-2 border-b-2 border-dashed border-ink/20">
                                    {section.heading}
                                </h3>
                                <ul className="space-y-2">
                                    {section.content.map((item, itemIdx) => (
                                        <li key={itemIdx} className="flex items-start gap-3 text-graphite">
                                            <span className="mt-1 w-2 h-2 bg-crimson rounded-full shrink-0"></span>
                                            <span className="font-body">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 bg-ink/5 border-t-2 border-ink/20 shrink-0">
                    <p className="text-center font-mono text-xs text-ink/60 uppercase">
                        Chúc bạn chơi vui vẻ và học tập hiệu quả!
                    </p>
                </div>
            </div>
        </div>
    );
};

const LeaderboardModal = ({ onClose }) => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadScores = async () => {
            try {
                setLoading(true);
                const data = await fetchLeaderboard({ level: 1, limit: 10 });
                setScores(data.scores || []);
            } catch (err) {
                console.error('[Leaderboard] Load error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadScores();
    }, []);

    // Get top 1 player
    const topPlayer = scores[0];
    const otherPlayers = scores.slice(1);

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200">
        <div className="w-full max-w-3xl bg-paper border-[8px] border-ink shadow-[20px_20px_0px_0px_#1C1C1A] flex flex-col relative rounded-none">
            
            {/* Retro Mac/Windows Title Bar */}
            <div className="h-12 bg-crimson border-b-4 border-ink flex items-center justify-between px-4 select-none">
                <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-none border-2 border-ink bg-bone"></div>
                    <div className="w-4 h-4 rounded-none border-2 border-ink bg-ink"></div>
                </div>
                <div className="font-black font-mono text-lg uppercase tracking-widest text-bone">
                    BANG_XEP_HANG.EXE
                </div>
                <button onClick={onClose} className="hover:bg-ink hover:text-bone p-1 border-2 border-transparent hover:border-bone transition-all">
                    <X size={20} className="text-ink hover:text-bone" strokeWidth={3} />
                </button>
            </div>

            {/* Arcade Header */}
            <div className="bg-ink text-gold p-8 text-center border-b-4 border-ink relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-fluid-6xl font-black font-display uppercase tracking-tighter leading-none mb-2 drop-shadow-[4px_4px_0_#9B1B30]">
                        TOP RUNNERS
                    </h2>
                    <p className="font-mono text-xs md:text-sm text-bone/80 uppercase tracking-[0.3em]">
                        Giải Vô Địch Runner Quiz • Mùa 1
                    </p>
                </div>
                {/* Decorative grid or lines */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,#fffdf5_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
            </div>

            {/* Table Area */}
            <div className="p-6 md:p-8 bg-paper overflow-y-auto max-h-[60vh] md:max-h-[70vh] custom-scrollbar">
                
                {/* Loading State */}
                {loading && (
                    <div className="text-center py-8 font-mono text-ink/60 animate-pulse">
                        Đang tải bảng xếp hạng...
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-8 font-mono text-crimson">
                        ⚠️ {error}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && scores.length === 0 && (
                    <div className="text-center py-8 font-mono text-ink/60">
                        Chưa có điểm nào! Hãy là người đầu tiên chơi!
                    </div>
                )}

                {/* Has Scores */}
                {!loading && !error && scores.length > 0 && (
                    <>
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 mb-4 text-xs font-black font-mono uppercase tracking-widest text-ink/60 border-b-2 border-ink/20 pb-2">
                            <div className="col-span-2 text-center">Hạng</div>
                            <div className="col-span-6">Người Chơi</div>
                            <div className="col-span-4 text-right">Điểm</div>
                        </div>

                        {/* Top 1 Highlight */}
                        {topPlayer && (
                            <div className="relative mb-6 group">
                                <div className="absolute inset-0 bg-gold border-4 border-ink shadow-[8px_8px_0px_0px_#1C1C1A] translate-x-1 translate-y-1"></div>
                                <div className="relative bg-bone border-4 border-ink p-4 grid grid-cols-12 gap-4 items-center hover:-translate-y-1 hover:-translate-x-1 transition-transform cursor-default">
                                    <div className="col-span-2 flex justify-center">
                                        <Trophy size={32} className="text-gold fill-gold drop-shadow-[1px_1px_0_#1C1C1A]" strokeWidth={2.5} />
                                    </div>
                                    <div className="col-span-6">
                                        <div className="font-black text-xl uppercase truncate text-ink">{topPlayer.playerName}</div>
                                        <div className="text-xs font-mono bg-ink text-bone inline-block px-1">HUYỀN THOẠI</div>
                                    </div>
                                    <div className="col-span-4 text-right font-black text-2xl text-crimson">
                                        {topPlayer.score.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Rest of List */}
                        <div className="space-y-3">
                            {otherPlayers.map((player) => (
                                <div key={player.id} className="grid grid-cols-12 gap-4 items-center p-3 border-b-2 border-dashed border-ink/20 hover:bg-bone hover:border-solid hover:border-ink transition-all font-mono text-ink">
                                    <div className="col-span-2 text-center font-black text-lg text-ink/40">
                                        {String(player.rank).padStart(2, '0')}
                                    </div>
                                    <div className="col-span-6 font-bold uppercase truncate">{player.playerName}</div>
                                    <div className="col-span-4 text-right font-bold text-crimson">{player.score.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>
            
            {/* Footer */}
            <div className="bg-ink p-4 flex justify-between items-center text-bone font-mono text-xs uppercase border-t-4 border-ink">
                <span>Trạng thái: {loading ? 'ĐANG TẢI...' : 'TRỰC TUYẾN'}</span>
                <span className="animate-pulse">Đang chờ người thách đấu...</span>
            </div>
        </div>
    </div>
    );
};

const GamesPage = () => {
    const [showRunnerQuiz, setShowRunnerQuiz] = useState(false);
    const [showCrossword, setShowCrossword] = useState(false);
    const [activeGuide, setActiveGuide] = useState(null);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const games = [
        {
            id: 1,
            title: "Runner Quiz",
            description: "Trò chơi endless runner kết hợp giải đố. Nhảy qua chướng ngại vật, trả lời câu hỏi nhanh để ghi điểm. Sai 3 lần là thua!",
            icon: <Zap size={40} className="text-crimson" />,
            status: "Sẵn sàng",
            action: "Chơi ngay",
            color: "border-crimson",
            playable: true,
            onClick: () => setShowRunnerQuiz(true)
        },
        {
            id: 2,
            title: "Ô Chữ Lịch Sử",
            description: "Giải 7 hàng ngang về lịch sử Việt Nam giai đoạn 1954–1965, lộ diện từ khóa bí ẩn. Đáp án đúng sẽ làm chữ dọc bừng sáng.",
            icon: <ScrollText size={40} className="text-gold" />,
            status: "Sẵn sàng",
            action: "Chơi ngay",
            color: "border-gold",
            playable: true,
            onClick: () => setShowCrossword(true)
        }
    ];

    return (
        <div className="page-shell w-full bg-[#f0f0f0] min-h-screen">
            {/* Guide Modal */}
            <AnimatePresence>
                {activeGuide && <GuideModal gameId={activeGuide} onClose={() => setActiveGuide(null)} />}
            </AnimatePresence>

            {/* Leaderboard Modal */}
            <AnimatePresence>
                {showLeaderboard && <LeaderboardModal onClose={() => setShowLeaderboard(false)} />}
            </AnimatePresence>

            {/* Runner Quiz Game Modal */}
            {showRunnerQuiz && (
                <RunnerQuizGame onClose={() => setShowRunnerQuiz(false)} />
            )}

            {/* Crossword Game Modal */}
            {showCrossword && (
                <CrosswordGame onClose={() => setShowCrossword(false)} />
            )}

            {/* SECTION 1: HEADER & GAME LIST COMBINED FOR BETTER FLOW */}
            <Section autoHeight={true} className="items-center justify-center pt-24 pb-32 px-4 md:px-10 border-b-[8px] border-ink bg-[#f0f0f0] relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "linear-gradient(#000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />

                <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto w-full relative z-10 mb-20">
                     {/* Top Label Box */}
                     <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-ink border-[4px] border-ink px-6 py-2 shadow-[8px_8px_0_#D32F2F] transform -rotate-1 mt-10 md:mt-10"
                     >
                        <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-white">
                           HỒ SƠ 04 — MÔ PHỎNG & ĐÁNH GIÁ THỰC NGHIỆM
                        </span>
                     </motion.div>

                     {/* Main Title Block */}
                     <div className="relative text-center mt-8">
                        <motion.h1
                           initial={{ scale: 0.9, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           transition={{ delay: 0.1, duration: 0.25, ease: "linear" }}
                           className="font-display font-black text-[clamp(4.5rem,8vw,8rem)] uppercase text-ink leading-[0.85] tracking-tighter drop-shadow-[8px_8px_0_#F9F9F9] mb-4"
                        >
                           ĐẤU TRƯỜNG
                        </motion.h1>

                        <motion.h1
                           initial={{ scale: 0.9, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           transition={{ delay: 0.2, duration: 0.25, ease: "linear" }}
                           className="font-display font-black text-[clamp(4.5rem,8vw,8rem)] uppercase text-white bg-ink px-8 py-2 border-[6px] border-ink leading-[0.85] tracking-tighter drop-shadow-[8px_8px_0_#D32F2F] mt-4 rotate-1 inline-block shadow-[16px_16px_0_rgba(0,0,0,0.2)]"
                        >
                           TRÍ TUỆ
                        </motion.h1>
                     </div>

                    <p className="max-w-3xl mx-auto text-2xl font-bold mt-12 bg-white px-6 py-4 border-[4px] border-ink shadow-[6px_6px_0_#1976D2] -rotate-1 text-center text-ink leading-relaxed">
                        Các hoạt động tương tác dưới đây được thiết kế giúp bạn củng cố sự hiểu biết về lập luận phức tạp, hệ thống bằng chứng và các cột mốc lịch sử cốt lõi.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto w-full relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
                        {games.map((game) => (
                            <div
                                key={game.id}
                                className={`brutal-card p-10 md:p-12 flex flex-col h-full border-t-[16px] bg-white border-[8px] border-ink ${game.color} shadow-[16px_16px_0_0_#000] transform transition-transform duration-300 hover:-translate-y-2 relative`}
                            >
                                <div className="absolute top-0 right-0 bg-ink text-white font-mono text-sm uppercase px-4 py-1 border-l-[8px] border-b-[8px] border-ink font-bold tracking-widest">
                                    [ BÀI TẬP KIỂM TRA ]
                                </div>
                                <div className="mb-8 flex justify-between items-start mt-6">
                                    <div className="p-4 bg-bone border-[6px] border-ink shadow-[6px_6px_0_#1C1C1A] group-hover:bg-gold transition-colors inline-block">
                                        {game.icon}
                                    </div>
                                    <span className="text-sm font-mono uppercase font-black bg-gold text-ink px-4 py-2 border-[4px] border-ink shadow-[4px_4px_0_#000] rotate-2">
                                        {game.status}
                                    </span>
                                </div>

                                <div className="flex-grow">
                                    <h3 className="font-display text-[clamp(2rem,3vw,3rem)] font-black mb-6 uppercase tracking-tighter leading-none">{game.title}</h3>
                                    <p className="text-ink font-bold text-xl leading-relaxed mb-8">
                                        {game.description}
                                    </p>
                                </div>

                                <div className="mt-4 pt-8 border-t-[8px] border-ink space-y-4">
                                    <Button 
                                        variant="primary"
                                        className="w-full justify-center group text-xl py-5 shadow-[8px_8px_0_#000] hover:shadow-[10px_10px_0_#000] border-[4px] border-ink bg-ink text-white hover:bg-gold hover:text-ink hover:-translate-y-1 font-black uppercase tracking-widest transition-all"
                                        onClick={game.onClick}
                                        disabled={!game.playable && !game.onClick}
                                    >
                                        {game.action}
                                        {game.playable && <Gamepad2 className="ml-3 group-hover:rotate-12 transition-transform" size={24} />}
                                    </Button>
                                    
                                    <Button
                                        variant="outline"
                                        className="w-full justify-center text-lg font-bold border-[4px] border-ink hover:bg-[#E5E5E5] hover:text-ink py-4 transition-all"
                                        onClick={() => setActiveGuide(game.id)}
                                    >
                                        <BookOpen size={20} className="mr-3" />
                                        ĐỌC HƯỚNG DẪN
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-32 mb-16 max-w-5xl mx-auto relative">
                        <div className="absolute -top-[48px] left-0 bg-gold text-ink font-mono text-xl font-bold uppercase tracking-widest px-8 py-3 border-[8px] border-b-0 border-ink shadow-[12px_0_0_#D32F2F] z-20">
                            TRUY CẬP DỮ LIỆU
                        </div>
                        <div className="relative overflow-hidden rounded-none border-[8px] border-ink bg-ink text-bone shadow-[24px_24px_0_0_#D32F2F] p-10 md:p-16">
                            {/* Animated Background */}
                            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,#fffdf5_50%,transparent_75%,transparent_100%)] bg-[length:30px_30px]"></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 mb-2">
                                        <Trophy className="text-gold hidden md:block" size={64} strokeWidth={2.5} />
                                        <h3 className="font-display font-black text-fluid-5xl uppercase tracking-tighter drop-shadow-[4px_4px_0_#D32F2F] text-white">
                                            Bảng Phân Hạng<br/>
                                            <span className="text-gold drop-shadow-[4px_4px_0_#D32F2F]">Chiến Dịch Sinh Tồn</span>
                                        </h3>
                                    </div>
                                    <p className="text-white text-xl font-bold font-mono mt-6 max-w-2xl bg-crimson inline-block px-4 py-2 border-[4px] border-ink shadow-[6px_6px_0_#000] -rotate-1">
                                        Ghi danh vào lịch sử. Vượt qua thử thách và đoạt vị trí dẫn đầu.
                                    </p>
                                </div>
                                <div className="flex-shrink-0 relative group mt-8 md:mt-0">
                                    <div className="absolute inset-0 bg-gold translate-x-2 translate-y-2 border-[4px] border-ink shadow-[4px_4px_0_#D32F2F]"></div>
                                    <Button 
                                        onClick={() => setShowLeaderboard(true)}
                                        variant="outline" 
                                        className="relative bg-white text-ink border-[6px] border-ink hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xl md:text-2xl px-10 py-5 uppercase font-black tracking-widest"
                                    >
                                        XEM DANH SÁCH
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};


export default GamesPage;

