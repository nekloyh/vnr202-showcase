import { useState, useEffect } from "react";
import { Gamepad2, ScrollText, Trophy, Zap, BookOpen, X, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RevealSection from "../../components/layout/RevealSection";
import Button from "../../components/ui/Button";
import RunnerQuizGame from "./runner-quiz/three/RunnerQuiz3DWrapper";
import CrosswordGame from "./crossword/CrosswordGame";
import { fetchLeaderboard } from "../../services/runnerQuizApi";

const R = RevealSection.Item;

/* ─────────────── Guide Modal ─────────────── */

const GuideModal = ({ gameId, onClose }) => {
  const guides = {
    1: {
      title: "RUNNER QUIZ",
      sections: [
        {
          heading: "Cách chơi",
          content: [
            "Di chuyển giữa 4 làn đường bằng phím ← → hoặc A/D",
            "Mỗi làn tương ứng với một đáp án A, B, C, D",
            "Nhấn SPACE hoặc Enter để khóa đáp án sớm và nhận điểm cao hơn",
            "Nếu không nhấn, đáp án sẽ được tính khi tường chạm vào bạn",
          ],
        },
        {
          heading: "Hệ thống điểm & Mạng",
          content: [
            "Trả lời càng nhanh → điểm càng cao (200-500 điểm)",
            "Bạn có 3 mạng (trái tim) để chơi",
            "Sai hoặc hết giờ = mất 1 mạng",
            "Hết mạng = Game Over, điểm được lưu vào bảng xếp hạng",
          ],
        },
        {
          heading: "Độ khó tăng dần",
          content: [
            "Thời gian trả lời bắt đầu từ 20 giây",
            "Mỗi câu đúng, thời gian sẽ giảm dần (tối thiểu 12 giây)",
            "Trả lời hết tất cả câu hỏi để chiến thắng!",
          ],
        },
      ],
    },
    2: {
      title: "Ô CHỮ LỊCH SỬ",
      sections: [
        {
          heading: "Luật chơi",
          content: [
            "Giải 7 hàng ngang để tìm ra từ khóa dọc bí ẩn",
            "Mỗi hàng ngang là một câu hỏi về lịch sử Việt Nam giai đoạn 1954–1965",
            "Nhập đáp án vào ô trống (có dấu, có khoảng cách)",
          ],
        },
        {
          heading: "Cách nhập đáp án",
          content: [
            "Click vào hàng ngang muốn giải",
            "Đọc câu hỏi — gợi ý sẽ khóa lúc đầu",
            "Trả lời sai hoặc nhấn nút ? để mở gợi ý (tối đa 2 gợi ý)",
            "Nhập câu trả lời và nhấn Enter hoặc nút Xác nhận",
          ],
        },
        {
          heading: "Chiến thắng",
          content: [
            "Giải đúng tất cả hàng ngang để lộ diện từ khóa: MIỀN NAM",
            "Từ khóa dọc sẽ sáng lên khi bạn hoàn thành",
            "Không giới hạn thời gian - hãy suy nghĩ kỹ!",
          ],
        },
      ],
    },
  };

  const guide = guides[gameId] || guides[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[80vh] bg-bone border-2 border-charcoal shadow-hard-lg flex flex-col overflow-hidden">
        <div className="h-10 bg-charcoal text-bone flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2">
            <Info size={16} />
            <span className="font-mono font-bold uppercase text-xs tracking-wider">
              Hướng dẫn: {guide.title}
            </span>
          </div>
          <button onClick={onClose} className="hover:text-crimson transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="space-y-6">
            {guide.sections.map((section, idx) => (
              <div key={idx} className="border-2 border-charcoal/15 p-4 bg-paper">
                <h3 className="font-display text-xl font-black text-ink uppercase mb-3 pb-2 border-b-2 border-dashed border-charcoal/20">
                  {section.heading}
                </h3>
                <ul className="space-y-2">
                  {section.content.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3 text-graphite">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-crimson shrink-0" />
                      <span className="font-body text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-paper border-t-2 border-charcoal/15 shrink-0">
          <p className="text-center font-mono text-xs text-graphite uppercase tracking-wider">
            Chúc bạn chơi vui vẻ và học tập hiệu quả!
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─────────────── Leaderboard Modal ─────────────── */

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
        console.error("[Leaderboard] Load error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadScores();
  }, []);

  const topPlayer = scores[0];
  const otherPlayers = scores.slice(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-bone border-2 border-charcoal shadow-hard-xl flex flex-col overflow-hidden">
        <div className="h-10 bg-crimson border-b-2 border-charcoal flex items-center justify-between px-4 select-none">
          <div className="flex gap-2">
            <div className="w-3 h-3 border-2 border-charcoal/50 bg-bone" />
            <div className="w-3 h-3 border-2 border-charcoal/50 bg-charcoal" />
          </div>
          <span className="font-mono font-bold text-sm uppercase tracking-wider text-bone">
            Bảng xếp hạng
          </span>
          <button onClick={onClose} className="text-bone hover:text-bone/70 transition-colors cursor-pointer">
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        <div className="bg-charcoal text-gold p-6 text-center border-b-2 border-charcoal relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-fluid-5xl font-black font-display uppercase tracking-tighter leading-none mb-1">
              TOP RUNNERS
            </h2>
            <p className="font-mono text-xs text-bone/60 uppercase tracking-widest">
              Giải Vô Địch Runner Quiz • Mùa 1
            </p>
          </div>
        </div>

        <div className="p-6 bg-bone overflow-y-auto max-h-[60vh] custom-scrollbar">
          {loading && (
            <div className="text-center py-8 font-mono text-graphite animate-pulse">
              Đang tải bảng xếp hạng...
            </div>
          )}
          {error && !loading && (
            <div className="text-center py-8 font-mono text-crimson">⚠️ {error}</div>
          )}
          {!loading && !error && scores.length === 0 && (
            <div className="text-center py-8 font-mono text-graphite">
              Chưa có điểm nào! Hãy là người đầu tiên chơi!
            </div>
          )}

          {!loading && !error && scores.length > 0 && (
            <>
              <div className="grid grid-cols-12 gap-4 mb-4 text-xs font-bold font-mono uppercase tracking-widest text-graphite border-b-2 border-charcoal/20 pb-2">
                <div className="col-span-2 text-center">Hạng</div>
                <div className="col-span-6">Người Chơi</div>
                <div className="col-span-4 text-right">Điểm</div>
              </div>

              {topPlayer && (
                <div className="mb-5 bg-paper border-2 border-charcoal p-4 grid grid-cols-12 gap-4 items-center shadow-hard-sm border-l-4 border-l-gold">
                  <div className="col-span-2 flex justify-center">
                    <Trophy size={28} className="text-gold fill-gold" strokeWidth={2} />
                  </div>
                  <div className="col-span-6">
                    <div className="font-display font-black text-lg uppercase truncate text-ink">
                      {topPlayer.playerName}
                    </div>
                    <span className="text-[10px] font-mono bg-charcoal text-bone px-1.5 py-0.5 uppercase">
                      Huyền thoại
                    </span>
                  </div>
                  <div className="col-span-4 text-right font-display font-black text-xl text-crimson">
                    {topPlayer.score.toLocaleString()}
                  </div>
                </div>
              )}

              <div className="space-y-1">
                {otherPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="grid grid-cols-12 gap-4 items-center p-3 border-b border-dashed border-charcoal/15 hover:bg-paper transition-colors font-mono text-ink"
                  >
                    <div className="col-span-2 text-center font-bold text-graphite">
                      {String(player.rank).padStart(2, "0")}
                    </div>
                    <div className="col-span-6 font-bold uppercase truncate">
                      {player.playerName}
                    </div>
                    <div className="col-span-4 text-right font-bold text-crimson">
                      {player.score.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="bg-charcoal p-3 flex justify-between items-center text-bone font-mono text-xs uppercase border-t-2 border-charcoal">
          <span>Trạng thái: {loading ? "Đang tải..." : "Trực tuyến"}</span>
          <span className="animate-pulse text-gold">Đang chờ người thách đấu...</span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────── Games Page ─────────────── */

const GamesPage = () => {
  const [showRunnerQuiz, setShowRunnerQuiz] = useState(false);
  const [showCrossword, setShowCrossword] = useState(false);
  const [activeGuide, setActiveGuide] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const games = [
    {
      id: 1,
      title: "Runner Quiz",
      description:
        "Endless runner kết hợp giải đố. Nhảy qua chướng ngại vật, trả lời câu hỏi nhanh để ghi điểm. Sai 3 lần là thua!",
      icon: <Zap size={32} className="text-crimson" />,
      status: "Sẵn sàng",
      action: "Chơi ngay",
      accent: "border-l-4 border-l-crimson",
      onClick: () => setShowRunnerQuiz(true),
    },
    {
      id: 2,
      title: "Ô Chữ Lịch Sử",
      description:
        "Giải 7 hàng ngang về lịch sử Việt Nam giai đoạn 1954–1965, lộ diện từ khóa bí ẩn. Đáp án đúng sẽ làm chữ dọc bừng sáng.",
      icon: <ScrollText size={32} className="text-gold" />,
      status: "Sẵn sàng",
      action: "Chơi ngay",
      accent: "border-l-4 border-l-gold",
      onClick: () => setShowCrossword(true),
    },
  ];

  return (
    <div className="w-full bg-bone scroll-container-fluid">
      {/* Modals */}
      <AnimatePresence>
        {activeGuide && (
          <GuideModal gameId={activeGuide} onClose={() => setActiveGuide(null)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showLeaderboard && (
          <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
        )}
      </AnimatePresence>
      {showRunnerQuiz && <RunnerQuizGame onClose={() => setShowRunnerQuiz(false)} />}
      {showCrossword && <CrosswordGame onClose={() => setShowCrossword(false)} />}

      {/* ═══════════ HERO ═══════════ */}
      <RevealSection className="border-b-2 border-charcoal/15">
        <div className="flex flex-col items-center text-center">
          <R>
            <span className="brutal-badge mb-6">Hồ sơ 04 — Mô phỏng & Đánh giá</span>
          </R>
          <R>
            <h1 className="font-display font-black text-fluid-hero uppercase text-ink leading-[1.05] tracking-tight mb-2">
              ĐẤU TRƯỜNG
            </h1>
          </R>
          <R>
            <h1 className="font-display font-black text-fluid-hero uppercase text-crimson leading-[1.05] tracking-tight mb-6">
              TRÍ TUỆ
            </h1>
          </R>
          <R>
            <p className="font-body text-xl text-graphite max-w-2xl mx-auto">
              Các hoạt động tương tác dưới đây giúp bạn củng cố sự hiểu biết về
              lập luận phức tạp, hệ thống bằng chứng và các cột mốc lịch sử cốt lõi.
            </p>
          </R>
        </div>
      </RevealSection>

      {/* ═══════════ GAME CARDS ═══════════ */}
      <RevealSection fullHeight={false} className="border-b-2 border-charcoal/15">
        <R>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {games.map((game) => (
              <div
                key={game.id}
                className={`brutal-card bg-paper ${game.accent} flex flex-col h-full`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-bone border-2 border-charcoal/20">{game.icon}</div>
                  <span className="brutal-badge bg-olive!">{game.status}</span>
                </div>

                <div className="flex-grow">
                  <h3 className="font-display text-fluid-4xl font-black text-ink uppercase tracking-tight leading-none mb-4">
                    {game.title}
                  </h3>
                  <p className="font-body text-lg text-graphite leading-relaxed mb-8">
                    {game.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t-2 border-dashed border-charcoal/20 space-y-3">
                  <Button
                    variant="danger"
                    className="w-full justify-center gap-2"
                    size="lg"
                    onClick={game.onClick}
                  >
                    {game.action} <Gamepad2 size={20} />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2"
                    onClick={() => setActiveGuide(game.id)}
                  >
                    <BookOpen size={16} /> Đọc hướng dẫn
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </R>
      </RevealSection>

      {/* ═══════════ LEADERBOARD CTA ═══════════ */}
      <RevealSection dark fullHeight={false}>
        <R>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                <Trophy className="text-gold" size={40} strokeWidth={2} />
                <h2 className="font-display font-black text-fluid-5xl uppercase text-bone tracking-tight leading-none">
                  Bảng Xếp Hạng
                </h2>
              </div>
              <p className="font-body text-lg text-bone/70 max-w-xl">
                Ghi danh vào lịch sử. Vượt qua thử thách Runner Quiz và đoạt vị trí dẫn đầu.
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowLeaderboard(true)}
              className="shrink-0"
            >
              Xem danh sách
            </Button>
          </div>
        </R>
      </RevealSection>
    </div>
  );
};

export default GamesPage;
