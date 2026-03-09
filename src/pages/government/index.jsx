import { motion } from "framer-motion";
import {
  KineticSubline,
} from "../../components/ui/KineticText";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  ArrowDown,
  ArrowRight,
  Flag,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const timelineData = [
  {
    year: "1954",
    event: "Geneva Accords signed",
    detail: "Vietnam temporarily divided at 17th parallel after French defeat at Điện Biên Phủ.",
    interpretation: "Creates the structural condition for rival state-building — the starting point of the 'two Vietnams' that makes the civil war question possible.",
  },
  {
    year: "1955",
    event: "Diệm consolidates power",
    detail: "Ngô Đình Diệm defeats rival sects, deposes Bảo Đại, and proclaims the Republic of Vietnam.",
    interpretation: "Establishes the South as a distinct political entity — evidence that there were genuinely competing Vietnamese state projects, not just foreign imposition.",
  },
  {
    year: "1956",
    event: "Reunification elections not held",
    detail: "South Vietnam refuses to participate in the planned nationwide elections.",
    interpretation: "The North sees this as proof of foreign-backed obstruction; the South argues free elections were impossible under communist conditions. Both readings have merit.",
  },
  {
    year: "1957–58",
    event: "Repression intensifies",
    detail: "Denounce the Communists campaign; mass arrests, imprisonment, and rural resettlement in the South.",
    interpretation: "Generates indigenous southern grievances that later fuel the insurgency — complicating any reading that the war was purely northern aggression.",
  },
  {
    year: "1959",
    event: "Resolution 15 passed",
    detail: "Communist Party Central Committee authorises armed struggle in the South; Group 559 opens supply routes.",
    interpretation: "Marks the shift from political to military strategy. Supports northern direction of the war, but was partly driven by southern cadre demand — a hybrid dynamic.",
  },
  {
    year: "1960",
    event: "NLF founded",
    detail: "National Liberation Front established; Third Party Congress reaffirms reunification goal.",
    interpretation: "The NLF included genuine southern participants alongside northern-directed cadres — evidence for both the civil war and the directed-insurgency interpretations.",
  },
  {
    year: "1961–62",
    event: "Strategic Hamlet Program",
    detail: "Mass rural relocation to isolate population from insurgents; generates widespread resentment.",
    interpretation: "A state-building policy that deepened the internal conflict within the South — more consistent with civil war dynamics than external invasion.",
  },
  {
    year: "1963",
    event: "Buddhist Crisis and Diệm's fall",
    detail: "Self-immolation of Thích Quảng Đức; military coup overthrows and kills Diệm in November.",
    interpretation: "The South's internal collapse was driven by domestic failures, not external attack — the strongest single piece of evidence for the civil war reading.",
  },
  {
    year: "1964",
    event: "Gulf of Tonkin incident",
    detail: "US Congress passes Tonkin Resolution; political instability continues in Saigon.",
    interpretation: "American escalation transforms the conflict's character — supporting the argument that foreign intervention, not internal dynamics, defined the war.",
  },
  {
    year: "1965",
    event: "US combat troops arrive",
    detail: "Operation Rolling Thunder begins; Marines land at Đà Nẵng; war becomes fully internationalised.",
    interpretation: "The arrival of foreign combat troops makes the 'civil war' label increasingly inadequate — but it doesn't erase the domestic dimensions that preceded this moment.",
  },
];

const BoMayNhaNuocPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-shell w-full bg-bone selection:bg-ink selection:text-gold snap-container">
      {/* ═══════════ HERO ═══════════ */}
      <Section className="items-center justify-center px-4 md:px-10 border-b-2 border-ink bg-bone">
        <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-ink border-4 border-ink px-6 py-2 shadow-hard transform rotate-1"
          >
            <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-bone">
              Page 1 — Historical Context
            </span>
          </motion.div>

          <div className="relative text-center">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase text-ink leading-[0.85] tracking-tighter"
            >
              FROM PARTITION
            </motion.h1>
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase text-crimson leading-[0.85] tracking-tighter"
            >
              TO CONFLICT
            </motion.h1>
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

      {/* ═══════════ WHY CONTEXT MATTERS ═══════════ */}
      <Section className="items-center justify-center bg-ink text-bone">
        <div className="max-w-screen-md mx-auto text-center py-12 relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xl md:text-2xl text-bone/80 leading-relaxed"
          >
            Before evaluating whether the Vietnam conflict was a civil war, you need to
            understand the conditions that produced it. This page builds the evidential
            foundation — not a complete history of Vietnam, but the specific political
            developments that make the question genuinely difficult to answer.
          </motion.p>
        </div>
      </Section>

      {/* ═══════════ AFTER GENEVA ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-white"
      >
        <div className="max-w-screen-lg mx-auto w-full py-24">
          <span className="font-mono text-sm text-crimson font-bold uppercase tracking-widest">Section 1</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-ink uppercase leading-none mt-2 mb-10">
            After Geneva: The Divided Nation
          </h2>

          <div className="space-y-6 text-lg text-graphite/80 leading-relaxed max-w-3xl">
            <p>
              The 1954 Geneva Accords ended the First Indochina War against France and
              temporarily divided Vietnam at the 17th parallel. The agreements called for
              nationwide reunification elections in 1956. Those elections were never held.
            </p>
            <p>
              Ngô Đình Diệm's southern government refused to participate, arguing that free
              elections were impossible in the communist-controlled North. Hanoi viewed this
              as a violation of the Geneva settlement — and as proof that reunification
              would require something other than diplomacy.
            </p>
            <p>
              What emerged were two rival states, each claiming to represent the Vietnamese
              nation: the Democratic Republic of Vietnam in the North, pursuing socialist
              transformation under Hồ Chí Minh, and the Republic of Vietnam in the South,
              building an anti-communist state with American backing under Ngô Đình Diệm.
            </p>
          </div>

          <div className="mt-10 bg-crimson/5 p-6 border-l-4 border-crimson max-w-3xl">
            <p className="font-body text-lg text-ink font-medium italic">
              The failure to hold reunification elections in 1956 is often identified as
              a critical turning point — the moment that made armed conflict increasingly
              likely and peaceful reunification effectively impossible.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ TWO STATES, TWO SYSTEMS ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-ink text-bone border-y-2 border-bone"
      >
        <div className="max-w-screen-2xl mx-auto w-full py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-6 text-white">
              Two States, Two Systems
            </h2>
            <p className="font-body text-lg text-bone/60 max-w-2xl mx-auto">
              Neither was politically simple. Neither was socially uniform.
              Understanding their internal dynamics is essential to the debate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* NORTH */}
            <div className="bg-white/5 border border-bone/20 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-crimson text-white flex items-center justify-center">
                  <Flag size={20} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white uppercase">North Vietnam</h3>
                  <span className="font-mono text-xs text-bone/50 uppercase">Democratic Republic of Vietnam</span>
                </div>
              </div>

              <div className="space-y-4 text-bone/75 leading-relaxed">
                <p>
                  The DRV consolidated a socialist state under the Vietnamese Workers' Party.
                  Land reform (1953–56) redistributed property but caused severe excesses and
                  violence against perceived class enemies. Industrialisation proceeded with
                  Soviet and Chinese support.
                </p>
                <p>
                  Dissent was suppressed — intellectuals involved in the Nhân Văn–Giai Phẩm
                  literary movement were silenced, Catholics faced pressure, and internal
                  Party debates over southern strategy were tightly controlled.
                </p>
                <p className="text-sm text-bone/50 border-t border-bone/10 pt-4 mt-4">
                  The North was not politically monolithic. Its internal repression and
                  debates over strategy complicate any simple narrative.
                </p>
              </div>
            </div>

            {/* SOUTH */}
            <div className="bg-white/5 border border-bone/20 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white uppercase">South Vietnam</h3>
                  <span className="font-mono text-xs text-bone/50 uppercase">Republic of Vietnam</span>
                </div>
              </div>

              <div className="space-y-4 text-bone/75 leading-relaxed">
                <p>
                  Ngô Đình Diệm consolidated power by destroying rival sects, launching the
                  Denounce the Communists campaign, and building an authoritarian state with
                  American financial and military support.
                </p>
                <p>
                  Internal opposition was widespread: the Caravelle Manifesto (1960) expressed
                  elite dissent, a coup attempt failed the same year, the Strategic Hamlet
                  Program generated rural resentment, and the 1963 Buddhist Crisis triggered
                  international outrage and Diệm's assassination in a military coup.
                </p>
                <p className="text-sm text-bone/50 border-t border-bone/10 pt-4 mt-4">
                  The South's fragmentation was not only caused by external forces. Its
                  internal legitimacy crises are central evidence for the civil war reading.
                </p>
              </div>
            </div>
          </div>

          {/* Synthesis note */}
          <div className="mt-10 text-center max-w-3xl mx-auto">
            <p className="font-body text-base text-bone/50 italic">
              When you compare these two systems, the question becomes clearer: was this a
              conflict between foreign-imposed structures, or between genuinely different
              Vietnamese political visions? The evidence suggests elements of both.
            </p>
          </div>

          {/* Comparison table */}
          <div className="mt-12 overflow-x-auto">
            <table className="w-full border border-bone/20 text-sm">
              <thead>
                <tr className="bg-white/5 font-display uppercase tracking-wider text-bone/70">
                  <th className="p-4 text-left border-r border-bone/10">Dimension</th>
                  <th className="p-4 text-left border-r border-bone/10">North (DRV)</th>
                  <th className="p-4 text-left">South (RVN)</th>
                </tr>
              </thead>
              <tbody className="font-body text-bone/65">
                {[
                  ["Political System", "Single-party socialist state", "Authoritarian republic"],
                  ["Ideology", "Marxism-Leninism, Vietnamese nationalism", "Anti-communism, nationalist legitimacy"],
                  ["Foreign Support", "Soviet Union, China", "United States, France (initially)"],
                  ["Internal Challenges", "Land reform excesses, intellectual dissent", "Sectarian rivalries, Buddhist crisis, coups"],
                  ["Leadership", "Hồ Chí Minh, Lê Duẩn", "Ngô Đình Diệm (until 1963), military juntas"],
                  ["Legitimacy Claim", "Anti-colonial victor, reunification", "Sovereignty, anti-communist independence"],
                ].map(([dim, north, south], idx) => (
                  <tr key={idx} className="border-t border-bone/10">
                    <td className="p-4 font-bold text-bone/80 border-r border-bone/10">{dim}</td>
                    <td className="p-4 border-r border-bone/10">{north}</td>
                    <td className="p-4">{south}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ═══════════ CPV STRATEGY — reframed ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-white"
      >
        <div className="max-w-screen-lg mx-auto w-full py-24">
          <span className="font-mono text-sm text-crimson font-bold uppercase tracking-widest">Section 4</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-ink uppercase leading-none mt-2 mb-4">
            The Communist Party's Evolving Strategy
          </h2>
          <p className="font-body text-lg text-graphite/60 mb-10 max-w-3xl">
            How does the Party's strategy speak to the civil war question? The answer
            depends on whether you emphasise northern direction or southern initiative.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {/* Political strategy */}
            <div className="border-2 border-ink p-8 bg-bone shadow-hard">
              <h3 className="font-display text-xl font-bold text-ink uppercase mb-4">
                Political Strategy (1954–59)
              </h3>
              <div className="space-y-3 text-graphite/80 leading-relaxed">
                <p>
                  After Geneva, the Party initially focused on political mobilisation in the
                  South, expecting that reunification elections would resolve the division
                  peacefully. When elections were blocked, southern cadres — facing Diệm's
                  repression — increasingly pressed Hanoi for permission to fight back.
                </p>
                <p className="text-sm text-graphite/60 border-t border-ink/10 pt-3 mt-3 italic">
                  This phase supports the civil war reading: the pressure for armed struggle
                  came partly from below, from southern Vietnamese facing local conditions.
                </p>
              </div>
            </div>

            {/* Military strategy */}
            <div className="border-2 border-ink p-8 bg-bone shadow-hard">
              <h3 className="font-display text-xl font-bold text-ink uppercase mb-4">
                Military Strategy (1959–65)
              </h3>
              <div className="space-y-3 text-graphite/80 leading-relaxed">
                <p>
                  Resolution 15 (1959) authorised armed struggle. Group 559 established the
                  Hồ Chí Minh Trail supply network. The NLF was founded in 1960. The Third
                  Party Congress reaffirmed reunification as a strategic goal. By 1963, Hanoi
                  was escalating material support as the South's government collapsed from within.
                </p>
                <p className="text-sm text-graphite/60 border-t border-ink/10 pt-3 mt-3 italic">
                  This phase supports the directed-insurgency reading: Hanoi coordinated
                  logistics, strategy, and political organisation across the border.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-ink text-bone p-6 max-w-4xl">
            <p className="font-body text-base leading-relaxed">
              The strongest reading acknowledges both dynamics: southern initiative and
              northern direction operated simultaneously. The shift from political to armed
              struggle was not a sudden decision from Hanoi but an evolving response shaped
              by southern cadre pressure, Diệm's repression, and changing strategic
              calculations — a hybrid dynamic that defies simple categorisation.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ INTERPRETED TIMELINE ═══════════ */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-bone border-y-2 border-ink"
      >
        <div className="max-w-screen-lg mx-auto w-full py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-black uppercase mb-4 text-ink">
              Timeline: 1954–1965
            </h2>
            <p className="text-graphite/60 max-w-2xl mx-auto">
              Not just what happened — but why each event complicates the question.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-ink/15"></div>

            <div className="space-y-10">
              {timelineData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Dot */}
                  <div className="absolute left-[18px] md:left-[26px] top-1 w-3 h-3 bg-crimson rounded-full border-2 border-bone z-10"></div>

                  <div className="font-display text-xl font-black text-crimson">{item.year}</div>
                  <div className="font-display text-base font-bold uppercase text-ink mt-1">{item.event}</div>
                  <p className="text-sm text-graphite/70 mt-1">{item.detail}</p>
                  <div className="mt-3 bg-crimson/5 border-l-4 border-crimson pl-4 py-2">
                    <p className="text-sm text-ink/70 font-medium">
                      <span className="font-mono text-xs text-crimson uppercase tracking-wider">For the debate: </span>
                      {item.interpretation}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ SYNTHESIS + TRANSITION CTA ═══════════ */}
      <Section className="items-center justify-center bg-sand border-t-2 border-ink">
        <div className="max-w-screen-md mx-auto text-center relative z-10 py-24">
          <div className="space-y-6 text-lg text-graphite/80 leading-relaxed">
            <p>
              You now have the historical foundation. The conditions were real,
              the divisions were deep, and the violence escalated in ways neither
              side fully controlled.
            </p>
            <p className="font-medium text-ink">
              Now the harder question: what does all of this actually mean? Three
              schools of historical thought give three different answers — and
              the evidence doesn't make the choice simple.
            </p>
          </div>

          <div className="mt-12">
            <Button
              variant="danger"
              size="lg"
              onClick={() => navigate("/dang-va-nhan-dan")}
              className="gap-3 shadow-hard hover:shadow-hard-lg transition-all"
            >
              Enter the Debate <ArrowRight size={20} strokeWidth={3} />
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default BoMayNhaNuocPage;
