import { useState, useEffect, useRef } from "react";
import {
  Moon, Sun, Menu, X, Download, ArrowRight, Mail,
  Phone, MapPin, Github, Linkedin, ExternalLink, ChevronUp,
  Code2, Layers, Cpu, Globe, Star, CheckCircle, Zap,
  Users, Award, Heart, Monitor, Database, BarChart2,
  Figma, Smartphone, Layout, Shield
} from "lucide-react";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const P  = "#5B5FEF"; // primary indigo
const S  = "#8B5CF6"; // secondary violet
const A  = "#00D4FF"; // accent cyan
const G  = "#22C55E"; // success green
const W  = "#F59E0B"; // warning amber

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV = [
  { label: "Home",       id: "home"       },
  { label: "About",      id: "about"      },
  { label: "Experience", id: "experience" },
  { label: "Skills",     id: "skills"     },
  { label: "Projects",   id: "projects"   },
  { label: "Contact",    id: "contact"    },
];

const STATS = [
  { value: "2+",          label: "Years Experience"  },
  { value: "20+",         label: "UI Screens"         },
  { value: "Healthcare",  label: "Domain"             },
  { value: "Responsive",  label: "Design"             },
];

const HIGHLIGHTS = [
  { icon: Award,    label: "2+ Years Experience",    color: P },
  { icon: Heart,    label: "Healthcare UX",          color: S },
  { icon: Monitor,  label: "Enterprise Applications",color: A },
  { icon: Globe,    label: "Responsive Design",      color: G },
  { icon: Layers,   label: "Design Systems",         color: W },
  { icon: Cpu,      label: "AI-Assisted Design",     color: P },
];

const SKILLS = [
  {
    title: "Design Tools",
    icon: Layers,
    color: P,
    items: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "Canva"],
  },
  {
    title: "UX Skills",
    icon: Users,
    color: S,
    items: [
      "User Research", "Personas", "Journey Mapping",
      "Information Architecture", "Wireframing", "Prototyping",
      "Usability Testing", "A/B Testing", "Accessibility",
    ],
  },
  {
    title: "Frontend",
    icon: Code2,
    color: A,
    items: [
      "HTML5", "CSS3", "Bootstrap", "JavaScript",
      "Angular Basics", "TypeScript Basics", "Responsive Design",
    ],
  },
  {
    title: "AI Tools",
    icon: Cpu,
    color: G,
    items: ["ChatGPT", "Lovable AI", "Figma AI", "Claude", "Notion AI"],
  },
];

const PROJECTS = [
  {
    emoji: "🏥",
    title: "Enterprise eClinical Platform",
    category: "Healthcare UX",
    desc: "End-to-end clinical trial management covering EDC, eSource, eCOA, RTSM, and eTMF workflows for global research teams.",
    problem: "Steep learning curves in complex clinical data workflows",
    solution: "Contextual UI patterns and progressive disclosure navigation",
    tools: ["Figma", "Adobe XD", "Prototyping", "Design System"],
    duration: "8 months",
    color: P,
    tags: ["EDC", "eCOA", "RTSM"],
  },
  {
    emoji: "📱",
    title: "Patient eCOA Mobile App",
    category: "Mobile Design",
    desc: "Patient-facing app for daily symptom questionnaires, medication tracking, and health progress dashboards.",
    problem: "Poor patient adherence to clinical data submission schedules",
    solution: "Gamified check-ins with accessible, friendly mobile UI",
    tools: ["Figma", "Prototyping", "Accessibility", "iOS/Android"],
    duration: "5 months",
    color: S,
    tags: ["Mobile", "Accessibility", "Healthcare"],
  },
  {
    emoji: "📊",
    title: "Clinical Analytics Dashboard",
    category: "Data Visualization",
    desc: "Interactive analytics with charts, filterable tables, and drill-down views designed for clinical site managers.",
    problem: "Data overload with no actionable, prioritized insights",
    solution: "Hierarchical data cards with intelligent drill-down patterns",
    tools: ["Figma", "Data Viz", "Dark Mode", "Recharts"],
    duration: "4 months",
    color: A,
    tags: ["Analytics", "Dashboard", "Dark Mode"],
  },
  {
    emoji: "💳",
    title: "Banking Mobile App",
    category: "Fintech UI",
    desc: "Premium fintech mobile UI featuring glassmorphism cards, biometric login flow, and spending analytics.",
    problem: "Traditional banking apps feel dated and friction-heavy",
    solution: "Premium glassmorphism aesthetic with streamlined navigation",
    tools: ["Figma", "Glassmorphism", "Prototyping"],
    duration: "3 months",
    color: W,
    tags: ["Fintech", "Glassmorphism", "Mobile"],
  },
  {
    emoji: "🍔",
    title: "Food Delivery App",
    category: "Consumer Mobile",
    desc: "Food discovery and delivery app with micro-interactions, live order tracking, and personalized recommendations.",
    problem: "High cart abandonment at a multi-step checkout",
    solution: "Streamlined 2-step checkout with smart address defaults",
    tools: ["Figma", "Micro-interactions", "Prototyping"],
    duration: "3 months",
    color: G,
    tags: ["Consumer", "Micro-interactions", "Mobile"],
  },
];

const PROCESS = [
  { step: "01", title: "Discover",  desc: "Stakeholder interviews & requirement gathering"  },
  { step: "02", title: "Research",  desc: "User surveys, competitors & market analysis"      },
  { step: "03", title: "Define",    desc: "Problem statements, personas & journey maps"      },
  { step: "04", title: "Ideate",    desc: "Brainstorming, sketches & concept exploration"    },
  { step: "05", title: "Wireframe", desc: "Low-fidelity layouts & information architecture"  },
  { step: "06", title: "Prototype", desc: "Interactive high-fidelity prototypes in Figma"    },
  { step: "07", title: "Testing",   desc: "Usability testing & iterative improvements"       },
  { step: "08", title: "Handoff",   desc: "Specs, assets & documentation for developers"     },
];

const TESTIMONIALS = [
  {
    quote: "Akhila consistently transformed complex healthcare workflows into intuitive user experiences while maintaining excellent collaboration with the development team.",
    name: "Rajesh Kumar",
    role: "Product Manager, EndPoint IT Global",
    initials: "RK",
    color: P,
  },
  {
    quote: "Her ability to simplify clinical data entry forms while maintaining compliance requirements was exceptional. The eCOA app saw a 40% improvement in patient completion rates.",
    name: "Priya Sharma",
    role: "UX Lead, Healthcare Division",
    initials: "PS",
    color: S,
  },
  {
    quote: "Akhila brings both creative vision and technical understanding to every project. Her design systems have significantly reduced our development timeline.",
    name: "Arun Patel",
    role: "Frontend Developer, EndPoint IT",
    initials: "AP",
    color: A,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function glass(dark: boolean) {
  return dark
    ? "bg-white/[0.04] border border-white/[0.08] backdrop-blur-md"
    : "bg-white border border-gray-200 shadow-sm";
}

function gradText(from: string = P, to: string = A) {
  return {
    backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
    backgroundClip: "text" as const,
  };
}

// ─── Floating Hero Card ───────────────────────────────────────────────────────

function FloatCard({
  dark, label, sublabel, color, delay = "0s",
  className = "",
}: {
  dark: boolean; label: string; sublabel: string;
  color: string; delay?: string; className?: string;
}) {
  return (
    <div
      className={`absolute p-3 rounded-2xl backdrop-blur-lg shadow-xl z-20 ${glass(dark)} ${className}`}
      style={{ animation: `abFloat 5s ease-in-out infinite ${delay}` }}
    >
      <div className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color }}>
        {label}
      </div>
      <div className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{sublabel}</div>
    </div>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────

function SectionHead({
  eyebrow, title, accent, dark,
}: {
  eyebrow: string; title: string; accent: string; dark: boolean;
}) {
  return (
    <div className="text-center mb-16">
      <span
        className="inline-block text-xs font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-4"
        style={{ background: `${P}18`, color: P }}
      >
        {eyebrow}
      </span>
      <h2 className="text-4xl md:text-5xl font-bold">
        {title} <span style={gradText(P, A)}>{accent}</span>
      </h2>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark]           = useState(true);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [sent, setSent]           = useState(false);
  const [form, setForm]           = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3500);
  };

  const bg   = dark ? "#0B0F19" : "#F8FAFC";
  const text = dark ? "#F8FAFC" : "#111827";
  const sub  = dark ? "#94A3B8" : "#64748B";

  return (
    <div
      className="min-h-screen font-[Inter,sans-serif] transition-colors duration-300"
      style={{ background: bg, color: text }}
    >
      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes abFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes pulse-slow {
          0%,100% { opacity: 0.15; transform: scale(1); }
          50%      { opacity: 0.25; transform: scale(1.08); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${P}50; border-radius: 3px; }
      `}</style>

      {/* ═══════════════════════════════════════ NAVBAR ══ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? `backdrop-blur-2xl border-b ${dark ? "border-white/[0.07]" : "border-gray-200/80"}`
            : ""
        }`}
        style={scrolled ? { background: dark ? "rgba(11,15,25,0.82)" : "rgba(248,250,252,0.88)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[68px] flex items-center justify-between gap-6">
          {/* Logo */}
          <button onClick={() => go("home")} className="font-extrabold text-[1.25rem] leading-none">
            <span style={gradText()}>Akhila Bai</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="text-sm font-medium transition-all hover:opacity-100"
                style={{ color: sub }}
                onMouseEnter={e => (e.currentTarget.style.color = P)}
                onMouseLeave={e => (e.currentTarget.style.color = sub)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)" }}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              onClick={() => go("contact")}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
              style={{ background: `linear-gradient(135deg, ${P}, ${S})`, boxShadow: `0 2px 14px ${P}40` }}
            >
              <Download size={13} /> Download Resume
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)" }}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className={`md:hidden border-t px-5 py-4 flex flex-col gap-1 ${
              dark ? "border-white/[0.07]" : "border-gray-200"
            }`}
            style={{ background: dark ? "#0d1120" : "#fff" }}
          >
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ color: sub }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => go("contact")}
              className="mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${P}, ${S})` }}
            >
              <Download size={13} /> Download Resume
            </button>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════ HERO ══ */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">

        {/* Glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[15%] left-[10%] w-[520px] h-[520px] rounded-full blur-[120px]"
            style={{ background: P, animation: "pulse-slow 8s ease-in-out infinite", opacity: 0.13 }}
          />
          <div
            className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full blur-[100px]"
            style={{ background: S, animation: "pulse-slow 10s ease-in-out infinite 2s", opacity: 0.1 }}
          />
          <div
            className="absolute top-[55%] left-[45%] w-[300px] h-[300px] rounded-full blur-[90px]"
            style={{ background: A, animation: "pulse-slow 7s ease-in-out infinite 4s", opacity: 0.08 }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} 1px, transparent 1px),
                linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left ── */}
          <div className="z-10">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-7 border"
              style={{
                background: dark ? "rgba(91,95,239,0.1)" : "rgba(91,95,239,0.06)",
                borderColor: `${P}30`,
                color: P,
              }}
            >
              👋 Hello, I'm
            </div>

            {/* Name */}
            <h1 className="text-[3rem] sm:text-[3.75rem] lg:text-[4.5rem] font-black leading-[1.05] mb-3 tracking-tight">
              Akhila Bai<br />
              <span style={gradText(P, A)}>Vadithe</span>
            </h1>

            {/* Role badge */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: G }}
              />
              <span className="text-xl font-semibold" style={{ color: P }}>
                UI/UX Designer
              </span>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg leading-relaxed mb-9 max-w-[520px]" style={{ color: sub }}>
              Creative UI/UX Designer with 2+ years of experience designing intuitive digital products, healthcare platforms, and enterprise applications. Passionate about transforming complex workflows into simple and delightful user experiences.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-12">
              <button
                onClick={() => go("projects")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${P}, ${S})`,
                  boxShadow: `0 4px 20px ${P}50`,
                }}
              >
                View Projects <ArrowRight size={15} />
              </button>

              <button
                onClick={() => go("contact")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
                  color: text,
                  background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                }}
              >
                <Mail size={15} /> Contact Me
              </button>

              <button
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
                style={{ background: `${A}15`, color: A, border: `1px solid ${A}30` }}
              >
                <Download size={15} /> Resume
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className={`p-3 rounded-xl text-center border transition-all hover:scale-105 ${glass(dark)}`}
                >
                  <div className="text-lg font-extrabold" style={{ color: P }}>{value}</div>
                  <div className="text-[11px] mt-0.5 leading-tight" style={{ color: sub }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right illustration ── */}
          <div className="relative flex items-center justify-center min-h-[420px]">
            {/* Big glow */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-20 mx-auto my-auto w-72 h-72"
              style={{ background: `radial-gradient(circle, ${P}, ${S})` }}
            />

            {/* Rotating ring */}
            <div
              className="absolute w-64 h-64 rounded-full border-2 opacity-15"
              style={{
                borderColor: P,
                borderStyle: "dashed",
                animation: "spin-slow 18s linear infinite",
              }}
            />
            <div
              className="absolute w-80 h-80 rounded-full border opacity-10"
              style={{
                borderColor: A,
                borderStyle: "dashed",
                animation: "spin-slow 26s linear infinite reverse",
              }}
            />

            {/* Avatar */}
            <div
              className="relative z-10 w-[180px] h-[180px] rounded-full p-[3px] shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${P}, ${A}, ${S})` }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-[5rem]"
                style={{ background: dark ? "#111827" : "#fff" }}
              >
                🎨
              </div>
            </div>

            {/* Floating cards */}
            <FloatCard
              dark={dark}
              label="Design Tool"
              sublabel="Figma Expert"
              color={P}
              delay="0s"
              className="top-4 -right-2 sm:right-0"
            />
            <FloatCard
              dark={dark}
              label="Projects"
              sublabel="20+ UI Screens"
              color={A}
              delay="2.5s"
              className="bottom-12 -left-2 sm:left-0"
            />
            <FloatCard
              dark={dark}
              label="Healthcare"
              sublabel="eClinical Platforms"
              color={G}
              delay="1.2s"
              className="top-1/2 -translate-y-1/2 -right-4 sm:-right-6"
            />

            {/* Decorative mini dot grid */}
            <div
              className="absolute bottom-4 right-4 w-24 h-24 opacity-[0.12]"
              style={{
                backgroundImage: `radial-gradient(circle, ${P} 1.5px, transparent 1.5px)`,
                backgroundSize: "10px 10px",
              }}
            />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <div className="w-[1px] h-8 rounded-full animate-bounce" style={{ background: sub }} />
          <span className="text-[10px] uppercase tracking-widest" style={{ color: sub }}>Scroll</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════ ABOUT ══ */}
      <section
        id="about"
        className="py-24"
        style={{ background: dark ? "rgba(255,255,255,0.02)" : "#fff" }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Portrait */}
            <div className="relative">
              <div
                className="w-full aspect-[4/5] rounded-3xl overflow-hidden relative border"
                style={{
                  background: `linear-gradient(135deg, ${P}18, ${S}10)`,
                  borderColor: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="text-9xl">👩‍💻</div>
                  <div className="text-sm font-semibold" style={{ color: P }}>Akhila Bai Vadithe</div>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: `${P}18`, color: P }}
                  >
                    UI/UX Designer · Andhra Pradesh, India
                  </div>
                </div>

                {/* Bottom gradient fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-28"
                  style={{ background: `linear-gradient(to top, ${dark ? "#0B0F19" : "#fff"}, transparent)` }}
                />
              </div>

              {/* Decorative accents */}
              <div
                className="absolute -bottom-5 -right-5 w-24 h-24 rounded-2xl opacity-20"
                style={{ background: `linear-gradient(135deg, ${P}, ${A})` }}
              />
              <div
                className="absolute -top-5 -left-5 w-16 h-16 rounded-full opacity-15"
                style={{ background: S }}
              />
            </div>

            {/* Content */}
            <div>
              <span
                className="inline-block text-xs font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-4"
                style={{ background: `${P}18`, color: P }}
              >
                About Me
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Designing with <span style={gradText()}>Purpose</span>
              </h2>

              <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: sub }}>
                I am Akhila Bai Vadithe, a passionate UI/UX Designer with over two years of experience creating user-centered digital experiences. My expertise spans UX research, wireframing, prototyping, interaction design, design systems, accessibility, and responsive interface design.
              </p>
              <p className="text-base leading-relaxed mb-9" style={{ color: sub }}>
                I enjoy solving complex business problems through thoughtful user experiences while collaborating closely with developers and stakeholders to deliver products that truly make a difference.
              </p>

              {/* Highlight chips */}
              <div className="grid grid-cols-2 gap-3">
                {HIGHLIGHTS.map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-default transition-all hover:-translate-y-0.5 hover:shadow-md ${glass(dark)}`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                      style={{ background: `${color}18` }}
                    >
                      <Icon size={15} style={{ color }} />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ SKILLS ══ */}
      <section id="skills" className="py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHead eyebrow="Expertise" title="Skills &" accent="Capabilities" dark={dark} />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SKILLS.map(({ title, icon: Icon, color, items }) => (
              <div
                key={title}
                className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl ${glass(dark)}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="font-bold text-lg mb-4">{title}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ EXPERIENCE ══ */}
      <section
        id="experience"
        className="py-24"
        style={{ background: dark ? "rgba(255,255,255,0.02)" : "#fff" }}
      >
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <SectionHead eyebrow="Career" title="Work" accent="Experience" dark={dark} />

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-4 bottom-4 w-px"
              style={{ background: `linear-gradient(to bottom, ${P}, ${P}00)` }}
            />

            <div className="ml-16 relative">
              {/* Node dot */}
              <div
                className="absolute -left-[3.35rem] top-6 w-4 h-4 rounded-full ring-4"
                style={{ background: P, ringColor: dark ? "#0B0F19" : "#F8FAFC" }}
              />

              <div className={`p-6 md:p-8 rounded-2xl border ${glass(dark)}`}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <span
                      className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2"
                      style={{ background: `${G}18`, color: G }}
                    >
                      ● Current Position
                    </span>
                    <h3 className="text-xl font-extrabold">UI Designer</h3>
                    <div className="text-sm mt-0.5 font-medium" style={{ color: sub }}>
                      EndPoint IT Global Pvt. Ltd.
                    </div>
                  </div>

                  <span
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                    style={{ background: `${P}15`, color: P }}
                  >
                    Aug 2024 – Present
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-5" style={{ color: sub }}>
                  Designing enterprise healthcare platforms including EDC, eSource, eCOA, RTSM, and eTMF systems. Focused on simplifying complex clinical workflows to improve data quality and user efficiency across global clinical research teams.
                </p>

                {/* Responsibility grid */}
                <div className="grid sm:grid-cols-2 gap-2.5 mb-5">
                  {[
                    "Designed enterprise eClinical platforms",
                    "Simplified complex clinical workflows",
                    "Created interactive prototypes in Figma",
                    "Collaborated closely with developers",
                    "Applied WCAG accessibility principles",
                    "Maintained scalable design systems",
                    "Accelerated design with AI tooling",
                    "Built responsive multi-device interfaces",
                  ].map(item => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: P }} />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Product badges */}
                <div className="flex flex-wrap gap-2">
                  {["EDC", "eSource", "eCOA", "RTSM", "eTMF"].map(p => (
                    <span
                      key={p}
                      className="px-3 py-1 rounded-lg text-xs font-bold"
                      style={{ background: `${A}15`, color: A }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ PROJECTS ══ */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHead eyebrow="Portfolio" title="Featured" accent="Projects" dark={dark} />
          <p className="text-center text-base mb-12 -mt-8" style={{ color: sub }}>
            UI/UX projects spanning healthcare, fintech, and consumer applications.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map(project => (
              <div
                key={project.title}
                className={`group p-6 rounded-2xl border flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${glass(dark)}`}
              >
                {/* Preview area */}
                <div
                  className="w-full h-36 rounded-xl mb-5 flex items-center justify-center text-5xl relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}18, ${project.color}06)`,
                    border: `1px solid ${project.color}25`,
                  }}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {project.emoji}
                  </span>
                  <span
                    className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ background: `${project.color}25`, color: project.color }}
                  >
                    {project.category}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg mb-2">{project.title}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: sub }}>
                  {project.desc}
                </p>

                {/* Problem / Solution */}
                <div className="space-y-1.5 mb-4 text-sm">
                  <div className="flex gap-2">
                    <span className="font-semibold min-w-[4.5rem] flex-shrink-0" style={{ color: sub }}>Problem:</span>
                    <span>{project.problem}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold min-w-[4.5rem] flex-shrink-0" style={{ color: sub }}>Solution:</span>
                    <span>{project.solution}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tools.map(t => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md text-[11px]"
                      style={{ background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", color: sub }}
                    >
                      {t}
                    </span>
                  ))}
                  <span
                    className="px-2 py-0.5 rounded-md text-[11px]"
                    style={{ background: `${project.color}12`, color: project.color }}
                  >
                    {project.duration}
                  </span>
                </div>

                <button
                  className="flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
                  style={{ color: project.color }}
                >
                  View Case Study <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ PROCESS ══ */}
      <section
        className="py-24"
        style={{ background: dark ? "rgba(255,255,255,0.02)" : "#fff" }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHead eyebrow="Methodology" title="Design" accent="Process" dark={dark} />

          {/* Steps */}
          <div className="relative">
            {/* Connecting line (desktop) */}
            <div
              className="hidden lg:block absolute top-8 left-8 right-8 h-px"
              style={{ background: `linear-gradient(to right, transparent, ${P}30, ${S}30, ${A}30, transparent)` }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {PROCESS.map(({ step, title, desc }, i) => {
                const c = i % 3 === 0 ? P : i % 3 === 1 ? S : A;
                return (
                  <div key={step} className="flex flex-col items-center text-center group">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-sm mb-3 transition-all group-hover:scale-110 group-hover:shadow-xl"
                      style={{ background: `linear-gradient(135deg, ${c}, ${A})` }}
                    >
                      {step}
                    </div>
                    <div className="font-bold text-sm mb-1">{title}</div>
                    <div className="text-[11px] leading-snug hidden lg:block" style={{ color: sub }}>{desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ TESTIMONIALS ══ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHead eyebrow="Reviews" title="What They" accent="Say" dark={dark} />

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ quote, name, role, initials, color }) => (
              <div
                key={name}
                className={`p-6 rounded-2xl border flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl ${glass(dark)}`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill={W} style={{ color: W }} />
                  ))}
                </div>

                {/* Decorative quote mark */}
                <div className="text-5xl font-black leading-none mb-2 opacity-15" style={{ color }}>
                  "
                </div>

                <p className="text-sm leading-relaxed mb-6 flex-1 italic" style={{ color: sub }}>
                  {quote}
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${color}, ${A})` }}
                  >
                    {initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{name}</div>
                    <div className="text-xs" style={{ color: sub }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ CONTACT ══ */}
      <section
        id="contact"
        className="py-24"
        style={{ background: dark ? "rgba(255,255,255,0.02)" : "#fff" }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Big CTA heading */}
          <div className="text-center mb-16">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-4"
              style={{ background: `${P}18`, color: P }}
            >
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let's Design Something{" "}
              <span style={gradText(P, A)}>Amazing</span> Together
            </h2>
            <p className="max-w-lg mx-auto text-base" style={{ color: sub }}>
              Have a project in mind? I'd love to hear from you and explore how we can create something great together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <div className="space-y-4 mb-8">
                {([
                  { icon: Mail,   label: "Email",    value: "akhilabai021@gmail.com", href: "mailto:akhilabai021@gmail.com", color: P },
                  { icon: Phone,  label: "Phone",    value: "+91 8317588766",         href: "tel:+918317588766",            color: S },
                  { icon: MapPin, label: "Location", value: "Andhra Pradesh, India",  href: "#",                           color: A },
                ] as const).map(({ icon: Icon, label, value, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:-translate-x-1 ${glass(dark)}`}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}18` }}
                    >
                      <Icon size={17} style={{ color }} />
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-0.5" style={{ color: sub }}>{label}</div>
                      <div className="font-semibold text-sm">{value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social buttons */}
              <div className="flex gap-3">
                {([
                  { icon: Mail,         label: "Email",    href: "mailto:akhilabai021@gmail.com", color: P },
                  { icon: Linkedin,     label: "LinkedIn", href: "#",                             color: S },
                  { icon: ExternalLink, label: "Behance",  href: "#",                             color: A },
                  { icon: Github,       label: "GitHub",   href: "#",                             color: G },
                ] as const).map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    title={label}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all hover:-translate-y-1 hover:shadow-lg ${glass(dark)}`}
                  >
                    <Icon size={17} style={{ color }} />
                  </a>
                ))}
              </div>

              {/* Availability badge */}
              <div
                className="mt-8 flex items-center gap-3 p-4 rounded-xl border"
                style={{
                  background: `${G}10`,
                  borderColor: `${G}25`,
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0" style={{ background: G }} />
                <div>
                  <div className="font-semibold text-sm" style={{ color: G }}>Available for freelance projects</div>
                  <div className="text-xs mt-0.5" style={{ color: sub }}>Response within 24 hours</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {(["name", "email"] as const).map(field => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-1.5 capitalize">{field}</label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={form[field]}
                      onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                      placeholder={field === "name" ? "Your name" : "you@email.com"}
                      required
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                      style={{
                        background: dark ? "rgba(255,255,255,0.05)" : "#f8fafc",
                        borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
                        color: text,
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = P)}
                      onBlur={e => (e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)")}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Subject</label>
                <input
                  value={form.subject}
                  onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                  placeholder="Project inquiry"
                  required
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    background: dark ? "rgba(255,255,255,0.05)" : "#f8fafc",
                    borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
                    color: text,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = P)}
                  onBlur={e => (e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                  required
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none"
                  style={{
                    background: dark ? "rgba(255,255,255,0.05)" : "#f8fafc",
                    borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
                    color: text,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = P)}
                  onBlur={e => (e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)")}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 hover:shadow-xl flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${P}, ${S})`, boxShadow: `0 4px 20px ${P}40` }}
              >
                {sent ? (
                  <><CheckCircle size={16} /> Message Sent! I'll reply within 24h</>
                ) : (
                  <><Mail size={15} /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ FOOTER ══ */}
      <footer
        className="py-8 border-t"
        style={{ borderColor: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)" }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Brand */}
          <div>
            <div className="font-extrabold text-base" style={gradText()}>Akhila Bai Vadithe</div>
            <div className="text-xs mt-0.5" style={{ color: sub }}>© 2026 · UI/UX Designer · India</div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-5">
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="text-xs font-medium transition-all hover:opacity-100"
                style={{ color: sub }}
                onMouseEnter={e => (e.currentTarget.style.color = P)}
                onMouseLeave={e => (e.currentTarget.style.color = sub)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{ background: `linear-gradient(135deg, ${P}, ${S})` }}
            title="Back to top"
          >
            <ChevronUp size={17} />
          </button>
        </div>
      </footer>
    </div>
  );
}
