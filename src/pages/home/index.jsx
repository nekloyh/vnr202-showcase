import "./style.css";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Section from "../../components/layout/Section";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div
      ref={containerRef}
      className="home-shell w-full bg-bone selection:bg-ink selection:text-gold snap-container h-screen overflow-y-scroll"
    >
      {/* ═══════════ HERO — Full viewport, centered question ═══════════ */}
      <Section className="items-center justify-center pt-20 bg-bone min-h-screen border-b-2 border-ink">
        <div className="absolute inset-0 home-hero-overlay pointer-events-none mix-blend-multiply opacity-15" />

        <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center justify-center text-center z-10 relative py-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-10 px-3 py-1 bg-ink text-bone border-2 border-transparent"
          >
            <span className="w-2 h-2 bg-bone rounded-full animate-pulse"></span>
            <span className="font-mono text-xs uppercase tracking-widest">
              VNR202 Historical Inquiry
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase text-ink leading-[0.85] tracking-tighter"
          >
            WAS VIETNAM
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tighter text-crimson"
          >
            A CIVIL WAR?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-xl md:text-2xl text-graphite/70 max-w-2xl mt-10 leading-relaxed"
          >
            1954–1965. The years that shaped how we understand the war — and why
            the answer is more complicated than you think.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <Button
              variant="danger"
              size="lg"
              onClick={() =>
                document
                  .getElementById("why-it-matters")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="gap-2 shadow-hard hover:shadow-hard-lg transition-all"
            >
              Begin Inquiry <ArrowRight size={20} strokeWidth={3} />
            </Button>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="mt-16 text-ink/30"
          >
            <ChevronDown size={28} />
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ WHY IT MATTERS — 3 punchy points ═══════════ */}
      <Section
        id="why-it-matters"
        className="items-center justify-center bg-ink text-bone"
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#F0F0E0 1px, transparent 1px), linear-gradient(to right, #F0F0E0 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        <div className="max-w-screen-lg mx-auto relative z-10 py-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-black leading-tight tracking-tight uppercase text-center mb-16"
          >
            Why does this question matter?
          </motion.h2>

          <div className="space-y-8 max-w-2xl mx-auto">
            {[
              "The answer determines whether we see Vietnamese people as agents of their own history or as pawns of superpower rivalry.",
              "It shapes how we judge the legitimacy of American intervention — and whether the southern government was a real state or a foreign creation.",
              "It reveals how Cold War framing imposed artificial clarity on a conflict whose internal dynamics were far more complicated than either side admitted.",
            ].map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-5"
              >
                <span className="font-display text-3xl font-black text-crimson leading-none mt-1 shrink-0">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-lg text-bone/85 leading-relaxed">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ TWO POSITIONS IN TENSION — single visual ═══════════ */}
      <Section className="items-center justify-center bg-bone py-24">
        <div className="max-w-screen-lg mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-black text-ink uppercase text-center mb-16"
          >
            Two positions. One question.
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-0 border-2 border-ink shadow-hard-lg">
            {/* Left — Civil War */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-10 md:p-12 bg-white md:border-r-2 md:border-ink border-b-2 md:border-b-0 border-ink border-l-4 border-l-crimson"
            >
              <span className="font-mono text-xs font-bold text-crimson uppercase tracking-widest">
                Interpretation A
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-black text-ink uppercase mt-3 mb-6">
                Civil War
              </h3>
              <p className="font-body text-lg text-graphite/80 leading-relaxed">
                A conflict between rival Vietnamese political visions — socialist
                revolution against anti-communist republicanism — fought primarily
                by Vietnamese on both sides.
              </p>
            </motion.div>

            {/* Right — National Liberation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 md:p-12 bg-white border-l-4 border-l-ink"
            >
              <span className="font-mono text-xs font-bold text-ink/60 uppercase tracking-widest">
                Interpretation B
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-black text-ink uppercase mt-3 mb-6">
                National Liberation
              </h3>
              <p className="font-body text-lg text-graphite/80 leading-relaxed">
                A struggle against foreign-backed domination and for national
                reunification — a continuation of the anti-colonial movement against
                an American-backed regime lacking genuine popular mandate.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════ CONTEXT STRIP + CTA ═══════════ */}
      <Section className="items-center justify-center bg-sand border-t-2 border-ink">
        <div className="max-w-screen-md mx-auto text-center relative z-10 py-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-lg md:text-xl text-graphite/70 leading-relaxed mb-6"
          >
            After the 1954 Geneva Accords divided Vietnam at the 17th parallel,
            two rival states emerged — each claiming to represent the Vietnamese
            nation. By 1965, the conflict had escalated into a full-scale war
            involving hundreds of thousands of foreign troops.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-lg md:text-xl text-ink font-medium leading-relaxed mb-12"
          >
            To understand why historians disagree, you first need to understand
            what Vietnam actually looked like after 1954 — a divided country,
            two competing governments, and a population whose loyalties were far
            more complicated than either side wanted to admit.
          </motion.p>

          <Button
            variant="danger"
            size="lg"
            onClick={() => navigate("/bo-may-nha-nuoc")}
            className="gap-3 shadow-hard hover:shadow-hard-lg transition-all"
          >
            Explore the Historical Context <ArrowRight size={20} strokeWidth={3} />
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
