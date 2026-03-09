import { motion } from "framer-motion";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import {
  ArrowDown,
} from "lucide-react";

const historiographyData = [
  {
    school: "Orthodox / Liberal",
    coreArg: "US involvement was a misguided intervention in a civil war it did not understand.",
    evidence: "Internal divisions within Vietnamese society; southern instability; popular support for NLF.",
    limitation: "Tends to understate the degree of northern direction and strategic coordination from Hanoi.",
  },
  {
    school: "Revisionist",
    coreArg: "The war was part of the global Cold War; US intervention was justified against communist aggression.",
    evidence: "Resolution 15; Hồ Chí Minh Trail logistics; Hanoi's stated reunification goals.",
    limitation: "Downplays legitimate southern grievances and the RVN's internal legitimacy crises.",
  },
  {
    school: "Official Vietnamese",
    coreArg: "A national liberation struggle against American imperialism and its puppet regime.",
    evidence: "Anti-colonial continuity; Geneva violations; foreign sponsorship of the RVN.",
    limitation: "Denies any civil war dimension; portrays all southern opposition as externally imposed.",
  },
  {
    school: "Vietnam-Centric",
    coreArg: "The conflict must be understood through Vietnamese political dynamics, not Cold War frameworks alone.",
    evidence: "Competing Vietnamese nationalisms; internal repression in both states; agency of southern actors.",
    limitation: "Can understate the transformative impact of superpower involvement on the conflict's character.",
  },
];

const DangVaNhanDanPage = () => {
  return (
    <div className="transition-shell w-full bg-bone snap-container font-body">
      {/* ═══════════ HERO ═══════════ */}
      <Section className="items-center justify-center px-4 md:px-10 border-b-2 border-ink bg-bone">
        <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-ink border-4 border-ink px-6 py-2 shadow-hard transform -rotate-1"
          >
            <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-bone">
              Page 2 — Interpretation & Conclusion
            </span>
          </motion.div>

          <div className="relative text-center">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase text-ink leading-[0.85] tracking-tighter"
            >
              DEBATING
            </motion.h1>
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase text-crimson leading-[0.85] tracking-tighter"
            >
              THE WAR
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-body text-xl text-graphite/60 mt-6 max-w-xl mx-auto"
            >
              Three schools of thought. Competing evidence. One conclusion.
            </motion.p>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 text-ink opacity-50"
          >
            <ArrowDown size={32} />
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ APPROACHING THE DEBATE ═══════════ */}
      <Section className="items-center justify-center bg-ink text-bone">
        <div className="max-w-screen-md mx-auto text-center py-20 relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xl md:text-2xl text-bone/80 leading-relaxed"
          >
            You have now built the historical foundation. You understand the partition,
            the rival states, and the conditions that escalated toward war. This page
            enters the interpretive core of the argument: how historians have read these
            same facts — and which reading the evidence best supports.
          </motion.p>
        </div>
      </Section>

      {/* ═══════════ THE CENTRAL DEBATE ═══════════ */}
      <Section className="items-center justify-center px-4 md:px-10 bg-ink text-bone border-y-2 border-bone">
        <div className="max-w-screen-lg mx-auto relative z-10 py-24">
          <h2 className="font-display text-3xl md:text-5xl font-black text-white uppercase text-center mb-6">
            The Central Debate
          </h2>
          <p className="text-center text-bone/50 text-base max-w-xl mx-auto mb-16">
            Everything on this page turns on how you answer these two questions.
            Historians have spent decades divided over which framing better captures
            the reality of the conflict.
          </p>

          <div className="space-y-8 max-w-3xl mx-auto">
            {/* Question A */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-bone/20 p-8 md:p-12"
            >
              <span className="font-mono text-xs font-bold text-crimson uppercase tracking-widest">
                Interpretation A
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-black text-white uppercase mt-4 mb-6">
                Was this a civil war?
              </h3>
              <p className="font-body text-lg text-bone/70 leading-relaxed">
                Was the conflict fundamentally between rival Vietnamese political visions —
                socialist revolution against anti-communist republicanism — fought primarily
                by Vietnamese on both sides over the future of their nation?
              </p>
              <p className="text-sm text-bone/40 mt-4 italic">
                This framing foregrounds Vietnamese agency and internal social division.
              </p>
            </motion.div>

            {/* Question B */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-bone/20 p-8 md:p-12"
            >
              <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest">
                Interpretation B
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-black text-white uppercase mt-4 mb-6">
                Or a national liberation struggle?
              </h3>
              <p className="font-body text-lg text-bone/70 leading-relaxed">
                Was the conflict primarily a struggle against foreign-backed domination —
                a continuation of Vietnam's anti-colonial movement, fighting for reunification
                against an American-backed regime that lacked genuine popular mandate?
              </p>
              <p className="text-sm text-bone/40 mt-4 italic">
                This framing foregrounds anti-colonial continuity and foreign intervention.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════ TWO SIDES OF THE DEBATE ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-white border-y-2 border-ink"
      >
        <div className="max-w-screen-2xl mx-auto w-full py-24">
          <div className="text-center mb-6">
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-ink mb-4">
              Two Sides of the Debate
            </h2>
            <p className="text-graphite/60 max-w-2xl mx-auto text-base">
              These are genuine scholarly positions grounded in historical evidence, not
              political talking points. Each captures something real about the conflict.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            {/* PRO CIVIL WAR */}
            <Card variant="default" className="p-8 border-t-4 border-t-crimson">
              <h3 className="font-display text-xl font-bold text-ink uppercase mb-6">
                Why some call it a civil war
              </h3>
              <ul className="space-y-4 text-graphite/80 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-crimson rounded-full shrink-0"></span>
                  <span>Both North and South were genuine Vietnamese political projects with real supporters — not simply foreign creations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-crimson rounded-full shrink-0"></span>
                  <span>Deep ideological and social divisions existed within Vietnamese society, not just between rival foreign sponsors.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-crimson rounded-full shrink-0"></span>
                  <span>The combatants on both sides were predominantly Vietnamese, and the southern regime's internal crises were domestically generated.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-crimson rounded-full shrink-0"></span>
                  <span>Both states exercised political repression against their own populations — a hallmark of civil conflict, not external invasion.</span>
                </li>
              </ul>
            </Card>

            {/* AGAINST CIVIL WAR */}
            <Card variant="default" className="p-8 border-t-4 border-t-ink">
              <h3 className="font-display text-xl font-bold text-ink uppercase mb-6">
                Why others reject that label
              </h3>
              <ul className="space-y-4 text-graphite/80 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-full shrink-0"></span>
                  <span>The DRV inherited the legitimacy of the anti-colonial struggle, making this a continuation of national liberation rather than civil division.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-full shrink-0"></span>
                  <span>The southern regime depended on massive American financial, military, and political support for its survival.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-full shrink-0"></span>
                  <span>The southern insurgency had genuine local roots — land inequality, religious discrimination, and authoritarian repression — not just northern direction.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-full shrink-0"></span>
                  <span>Calling it a civil war risks legitimising the Cold War framing that justified American intervention in the first place.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* ═══════════ HISTORIOGRAPHY ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-bone"
      >
        <div className="max-w-screen-2xl mx-auto w-full py-24">
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase mb-4 text-ink text-center">
            Schools of Interpretation
          </h2>
          <p className="font-body text-base text-graphite/60 max-w-3xl mx-auto text-center mb-4">
            These are not just academic disagreements. Each interpretation carries different
            implications for how we understand Vietnamese agency, American culpability, and
            the nature of Cold War conflict.
          </p>

          <div className="overflow-x-auto mt-12">
            <table className="w-full border-2 border-ink text-sm">
              <thead>
                <tr className="bg-ink text-bone font-display uppercase tracking-wider">
                  <th className="p-4 text-left border-r border-bone/20">School</th>
                  <th className="p-4 text-left border-r border-bone/20">Core Claim</th>
                  <th className="p-4 text-left border-r border-bone/20">Key Evidence</th>
                  <th className="p-4 text-left">Limitation</th>
                </tr>
              </thead>
              <tbody className="font-body">
                {historiographyData.map((row, idx) => (
                  <tr key={idx} className={`border-b border-ink/20 ${idx % 2 === 0 ? "bg-white" : "bg-bone"}`}>
                    <td className="p-4 font-display font-bold text-ink uppercase border-r border-ink/10">
                      {row.school}
                    </td>
                    <td className="p-4 text-graphite/80 border-r border-ink/10">{row.coreArg}</td>
                    <td className="p-4 text-graphite/80 border-r border-ink/10">{row.evidence}</td>
                    <td className="p-4 text-graphite/60 italic">{row.limitation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 max-w-3xl mx-auto">
            <p className="font-body text-base text-graphite/80 leading-relaxed">
              Of these four schools, the Vietnam-centric approach offers the most nuanced
              framework — it takes Vietnamese agency seriously, acknowledges the real
              internal divisions that the civil war reading highlights, and does not dismiss
              the anti-colonial dimensions that the liberation narrative emphasises. Its
              limitation — that it can understate superpower impact — is real, but less
              distorting than the blind spots of the other three approaches.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ EVIDENCE ASSESSMENT ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-ink text-bone border-y-2 border-bone"
      >
        <div className="max-w-screen-2xl mx-auto w-full py-24">
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase mb-6 text-white text-center">
            Evidence Assessment
          </h2>
          <p className="text-bone/60 max-w-2xl mx-auto text-center text-base mb-12">
            What does the evidence actually support — and what does each piece fail to prove?
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Civil war evidence */}
            <div className="bg-white/5 border border-bone/15 p-8">
              <span className="font-mono text-xs font-bold text-crimson uppercase tracking-widest">
                Supporting Civil War
              </span>
              <div className="mt-6 space-y-6">
                {[
                  { evidence: "Rival Vietnamese states with competing political systems", suggests: "Genuine internal division, not external imposition", fails: "Does not prove the division was organic — partition was imposed at Geneva" },
                  { evidence: "Deep social and ideological divisions", suggests: "Vietnamese society was genuinely split", fails: "Doesn't distinguish between civil war and revolutionary dynamics" },
                  { evidence: "South Vietnam's internal crises were domestically generated", suggests: "The conflict had roots independent of foreign involvement", fails: "Doesn't account for the degree of American structural support" },
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-bone/10 pb-4 last:border-none">
                    <p className="text-bone/80 text-sm font-medium">{item.evidence}</p>
                    <p className="text-bone/50 text-xs mt-2">→ Suggests: {item.suggests}</p>
                    <p className="text-bone/40 text-xs mt-1">✗ Doesn't prove: {item.fails}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Liberation evidence */}
            <div className="bg-white/5 border border-bone/15 p-8">
              <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest">
                Supporting Liberation
              </span>
              <div className="mt-6 space-y-6">
                {[
                  { evidence: "Anti-colonial memory and nationalist continuity", suggests: "The struggle was part of a longer independence movement", fails: "Doesn't prove the South was merely a puppet — it had real political structures" },
                  { evidence: "Massive US sponsorship of the RVN", suggests: "The southern state depended on foreign support", fails: "External support doesn't automatically negate a state's legitimacy" },
                  { evidence: "Indigenous southern grievances fuelled the insurgency", suggests: "Opposition to Diệm was locally rooted", fails: "Local grievances can exist within a civil war — they don't preclude it" },
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-bone/10 pb-4 last:border-none">
                    <p className="text-bone/80 text-sm font-medium">{item.evidence}</p>
                    <p className="text-bone/50 text-xs mt-2">→ Suggests: {item.suggests}</p>
                    <p className="text-bone/40 text-xs mt-1">✗ Doesn't prove: {item.fails}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hybrid evidence */}
            <div className="bg-white/5 border border-bone/15 p-8">
              <span className="font-mono text-xs font-bold text-bone/70 uppercase tracking-widest">
                Showing Hybrid Dynamics
              </span>
              <div className="mt-6 space-y-6">
                {[
                  { evidence: "Northern direction combined with southern local participation", suggests: "Both external and internal dynamics operated simultaneously", fails: "Doesn't resolve which dimension was primary" },
                  { evidence: "Superpower involvement on both sides", suggests: "The conflict was embedded in Cold War structures", fails: "Presence of foreign actors doesn't determine the conflict's essential nature" },
                  { evidence: "No single label captures all dimensions", suggests: "The conflict was genuinely multi-layered", fails: "Acknowledging complexity is necessary — but not sufficient as a conclusion" },
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-bone/10 pb-4 last:border-none">
                    <p className="text-bone/80 text-sm font-medium">{item.evidence}</p>
                    <p className="text-bone/50 text-xs mt-2">→ Suggests: {item.suggests}</p>
                    <p className="text-bone/40 text-xs mt-1">✗ Doesn't prove: {item.fails}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ FINAL CONCLUSION — visually dominant ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10"
        style={{ background: "linear-gradient(180deg, #1a2744 0%, #0f1a2e 100%)" }}
      >
        <div className="max-w-screen-md mx-auto w-full relative z-10 py-32 md:py-40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs font-bold text-gold/60 uppercase tracking-[0.3em]">
              Conclusion
            </span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-[0.9] tracking-tight mt-6 mb-16">
              The conflict was a{" "}
              <span className="text-crimson">hybrid war</span> — and
              no single label is sufficient.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-10 text-left max-w-2xl mx-auto"
          >
            <div>
              <span className="font-mono text-xs text-gold/50 uppercase tracking-wider">The supporting evidence</span>
              <p className="text-lg text-white/80 leading-relaxed mt-3">
                The evidence supports recognising genuine civil war dynamics: rival
                Vietnamese states, deep ideological divisions, and internal political
                violence driven by domestic conditions. Vietnamese people on both sides
                were primary agents — not merely pawns of superpower rivalry.
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-gold/50 uppercase tracking-wider">The strongest counter-evidence</span>
              <p className="text-lg text-white/80 leading-relaxed mt-3">
                But the evidence also resists reducing the conflict to civil war alone.
                Anti-colonial nationalism provided real political energy; the southern
                state depended structurally on American support; and superpower involvement
                fundamentally shaped the war's escalation, duration, and character.
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-gold/50 uppercase tracking-wider">The broader implication</span>
              <p className="text-lg text-white/80 leading-relaxed mt-3">
                The period 1954–1965 produced a conflict that was simultaneously a civil
                war, a national liberation struggle, and a Cold War proxy engagement —
                three overlapping dimensions that cannot be separated without distorting
                the historical reality.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 pt-12 border-t border-white/10"
          >
            <p className="font-display text-2xl md:text-3xl font-black text-crimson uppercase leading-tight max-w-xl mx-auto">
              A single label is insufficient. The evidence demands a reading that
              holds all three dimensions together.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ WHAT TO TAKE AWAY — prose epilogue ═══════════ */}
      <Section className="items-center justify-center px-4 md:px-10 bg-bone border-t-2 border-ink">
        <div className="max-w-screen-md mx-auto w-full relative z-10 py-24">
          <h2 className="font-display text-3xl md:text-4xl font-black text-ink uppercase text-center mb-12">
            What to Take Away
          </h2>

          <div className="space-y-6 text-lg text-graphite/80 leading-relaxed">
            <p>
              Historical labels are not neutral descriptions — they are interpretive
              frameworks that highlight certain evidence and obscure other evidence.
              Calling the Vietnam conflict a "civil war" foregrounds Vietnamese agency
              and internal divisions; calling it a "national liberation struggle"
              foregrounds anti-colonial continuity and foreign intervention. Neither
              label is wrong. Neither is complete.
            </p>
            <p>
              The Vietnam conflict reveals how Cold War framing imposed artificial
              clarity on a struggle whose internal dynamics were far more complicated
              than either Washington or Hanoi wanted to admit. The most intellectually
              honest position is one that resists the comfort of a single category and
              instead holds multiple dimensions in tension.
            </p>
            <p>
              The question of what to call this conflict is still not settled in the
              historical literature. What is settled is that the label matters — and
              that choosing one carelessly flattens the lives of millions of people
              into a geopolitical abstraction.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default DangVaNhanDanPage;
