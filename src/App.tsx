import { useState, useEffect, useRef } from 'react';
import {
  Cloud, Shield, Network, Server, Database, Monitor,
  Building2, HeartPulse, Landmark, Cpu, ClipboardCheck,
  Package, Plug, Rocket, Users,
  LayoutDashboard, Activity, BookOpen, BarChart2,
  ChevronRight, ArrowRight, Menu, X, Mail, Phone, Globe,
  CheckCircle,
} from 'lucide-react';

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return scrolled;
}

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, vis } = useFadeIn();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const HIGHLIGHT = '#50E3FF';

const NAV_SECTIONS = [
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Client Tools', href: '#client-tools' },
  { label: 'Connect', href: '#connect' },
];

const STATS = [
  { value: '300%', label: 'Productivity Gain' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '24/7', label: 'Expert Support' },
  { value: '15+', label: 'Years Experience' },
];

const PARTNERS = ['Microsoft', 'AWS', 'Google Cloud', 'Cisco', 'VMware', 'ServiceNow'];

const SERVICES = [
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    body: 'Design, migrate, and manage multi-cloud environments with cost optimization built in.',
    tags: ['Migration', 'FinOps', 'Multi-Cloud'],
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    body: 'End-to-end security posture — threat detection, SOC operations, and zero-trust architecture.',
    tags: ['SOC / SIEM', 'Compliance', 'Zero Trust'],
  },
  {
    icon: Network,
    title: 'Network & Connectivity',
    body: 'SD-WAN, SASE, and enterprise LAN/WAN design that delivers reliable global performance.',
    tags: ['SD-WAN', 'SASE', 'MPLS'],
  },
  {
    icon: Server,
    title: 'Managed Infrastructure',
    body: 'Proactive monitoring, patching, and lifecycle management for hybrid environments.',
    tags: ['24/7 NOC', 'Lifecycle Mgmt', 'Hybrid'],
  },
  {
    icon: Database,
    title: 'Data & AI',
    body: 'Modern data platforms, analytics, and agentic AI capabilities built for enterprise scale.',
    tags: ['Data Platform', 'Agentic AI', 'MLOps'],
  },
  {
    icon: Monitor,
    title: 'Digital Workplace',
    body: 'Endpoint, collaboration, and identity management for the modern distributed workforce.',
    tags: ['Endpoint', 'Identity', 'Collab'],
  },
];

const SOLUTIONS = [
  {
    icon: Building2,
    title: 'Industry Solutions',
    body: 'Tailored agentic AI blueprints for finance, healthcare, manufacturing, and the public sector.',
    tags: ['Finance', 'Healthcare', 'Public Sector'],
  },
  {
    icon: Cpu,
    title: 'AI Transformation',
    body: 'End-to-end agentic AI adoption — strategy, platform, and managed operations.',
    tags: ['Strategy', 'Platform', 'Operations'],
  },
  {
    icon: ClipboardCheck,
    title: 'Compliance & Governance',
    body: 'Risk, audit, and regulatory frameworks engineered into every solution we deliver.',
    tags: ['SOC 2', 'HIPAA', 'FedRAMP'],
  },
];

const MARKETPLACE = [
  {
    icon: Package,
    title: 'Agent Catalog',
    body: 'Pre-built domain agents ready to deploy into your environment in days, not months.',
  },
  {
    icon: Plug,
    title: 'Integration Connectors',
    body: 'Hundreds of certified connectors for the systems and platforms you already run.',
  },
  {
    icon: Rocket,
    title: 'Solution Accelerators',
    body: 'Reference architectures and IP that compress time-to-value for common use cases.',
  },
  {
    icon: Users,
    title: 'Partner Offerings',
    body: 'Curated offerings from our certified partner ecosystem across cloud, security, and data.',
  },
];

const CLIENT_TOOLS = [
  {
    icon: LayoutDashboard,
    title: 'Client Portal',
    body: 'Single pane of glass for tickets, projects, billing, and platform health.',
  },
  {
    icon: Activity,
    title: 'Observability',
    body: 'Real-time visibility into every service, agent, and integration we operate for you.',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Base',
    body: 'Searchable runbooks, architecture references, and self-service guides.',
  },
  {
    icon: BarChart2,
    title: 'Status & SLAs',
    body: 'Live status, SLA reporting, and incident postmortems — fully transparent.',
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: HIGHLIGHT }}>
      {children}
    </p>
  );
}

function CardTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border"
      style={{ color: HIGHLIGHT, borderColor: `${HIGHLIGHT}30`, background: `${HIGHLIGHT}0f` }}>
      {children}
    </span>
  );
}

function ServiceCard({ icon: Icon, title, body, tags }: typeof SERVICES[0]) {
  return (
    <div className="group bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] hover:border-[#50E3FF]/20 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: `${HIGHLIGHT}18`, border: `1px solid ${HIGHLIGHT}25` }}>
        <Icon className="w-5 h-5" style={{ color: HIGHLIGHT }} strokeWidth={1.6} />
      </div>
      <div>
        <h3 className="font-fjalla text-white text-lg mb-1.5">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map(t => <CardTag key={t}>{t}</CardTag>)}
      </div>
      <a href="#connect" className="flex items-center gap-1 text-xs font-semibold transition-colors"
        style={{ color: HIGHLIGHT }}>
        Learn more <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

function MarketplaceCard({ icon: Icon, title, body }: typeof MARKETPLACE[0]) {
  return (
    <div className="group bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] hover:border-[#50E3FF]/20 rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${HIGHLIGHT}18`, border: `1px solid ${HIGHLIGHT}25` }}>
        <Icon className="w-5 h-5" style={{ color: HIGHLIGHT }} strokeWidth={1.6} />
      </div>
      <h3 className="font-fjalla text-white text-lg">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed flex-1">{body}</p>
      <a href="#connect" className="flex items-center gap-1 text-xs font-semibold"
        style={{ color: HIGHLIGHT }}>
        Learn more <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export default function App() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen text-white" style={{ fontFamily: 'Inter, sans-serif', background: '#030c1a' }}>

      {/* ─── NAV ─── */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#030c1a]/95 backdrop-blur-md border-b border-white/5 py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src="/Logo_Transparent copy.png" alt="Catch33 logo" className="h-9 w-auto" />
            <img src="/name-mark-v2 copy.png" alt="Catch33 Inc." className="h-6 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_SECTIONS.map(({ label, href }) => (
              <a key={label} href={href}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                {label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#connect"
              className="text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200"
              style={{ background: HIGHLIGHT, color: '#030c1a' }}>
              Start a Project
            </a>
          </div>

          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/5 px-6 py-4 flex flex-col gap-4 bg-[#030c1a]">
            {NAV_SECTIONS.map(({ label, href }) => (
              <a key={label} href={href} className="text-sm text-slate-300 hover:text-white"
                onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a href="#connect"
              className="text-sm font-semibold px-5 py-2.5 rounded-lg text-center mt-1"
              style={{ background: HIGHLIGHT, color: '#030c1a' }}>
              Start a Project
            </a>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/catch33_website_background.png"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.55 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030c1a]/60 via-transparent to-[#030c1a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030c1a]/70 via-transparent to-[#030c1a]/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold rounded-full px-4 py-1.5 mb-8"
            style={{
              color: HIGHLIGHT,
              background: `${HIGHLIGHT}12`,
              border: `1px solid ${HIGHLIGHT}30`,
              animation: 'fadeDown 0.6s ease both',
            }}>
            Trusted by 500+ enterprise clients worldwide
          </div>

          <h1 className="font-fjalla text-5xl md:text-7xl leading-tight mb-6"
            style={{ animation: 'fadeDown 0.65s ease 80ms both' }}>
            Agentic AI Platform{' '}
            <span style={{ color: HIGHLIGHT }}>Solutions</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ animation: 'fadeDown 0.65s ease 160ms both' }}>
            Catch33 Inc. delivers the full spectrum of agentic AI and IT professional services that modern enterprises demand — reliably, securely, and at scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            style={{ animation: 'fadeDown 0.65s ease 240ms both' }}>
            <a href="#connect"
              className="group flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg"
              style={{ background: HIGHLIGHT, color: '#030c1a', boxShadow: `0 0 30px ${HIGHLIGHT}30` }}>
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#solutions"
              className="group flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-xl border border-white/15 text-white hover:bg-white/5 transition-all duration-200">
              Explore Solutions
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/5 bg-white/5"
            style={{ animation: 'fadeDown 0.65s ease 320ms both' }}>
            {STATS.map(({ value, label }) => (
              <div key={label} className="bg-[#030c1a]/80 backdrop-blur-sm px-6 py-6 text-center">
                <div className="font-fjalla text-3xl md:text-4xl mb-1" style={{ color: HIGHLIGHT }}>{value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNERS ─── */}
      <section className="py-14 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-600 mb-8 font-semibold">
            Certified &amp; Partnered With
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {PARTNERS.map(p => (
              <span key={p} className="text-sm font-semibold text-slate-500 hover:text-slate-300 transition-colors tracking-wide">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-14">
            <SectionLabel>Services</SectionLabel>
            <h2 className="font-fjalla text-4xl md:text-5xl text-white leading-tight mb-4">
              Everything Your IT Ecosystem Needs
            </h2>
            <p className="text-slate-400 max-w-xl leading-relaxed">
              A comprehensive portfolio of IT services backed by certified engineers and decades of enterprise experience.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 70}>
                <ServiceCard {...s} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOLUTIONS ─── */}
      <section id="solutions" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-14">
            <SectionLabel>Solutions</SectionLabel>
            <h2 className="font-fjalla text-4xl md:text-5xl text-white leading-tight mb-4">
              Outcomes Engineered for Your Industry
            </h2>
            <p className="text-slate-400 max-w-xl leading-relaxed">
              Vertical-aligned agentic AI solutions designed around your operating model.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {SOLUTIONS.map((s, i) => (
              <FadeIn key={s.title} delay={i * 80}>
                <div className="group bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] hover:border-[#50E3FF]/20 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 h-full">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${HIGHLIGHT}18`, border: `1px solid ${HIGHLIGHT}25` }}>
                    <s.icon className="w-5 h-5" style={{ color: HIGHLIGHT }} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="font-fjalla text-white text-xl mb-2">{s.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{s.body}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {s.tags.map(t => <CardTag key={t}>{t}</CardTag>)}
                  </div>
                  <a href="#connect" className="flex items-center gap-1 text-xs font-semibold"
                    style={{ color: HIGHLIGHT }}>
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MARKETPLACE ─── */}
      <section id="marketplace" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-14">
            <SectionLabel>Marketplace</SectionLabel>
            <h2 className="font-fjalla text-4xl md:text-5xl text-white leading-tight mb-4">
              A Catalog Built to Deploy
            </h2>
            <p className="text-slate-400 max-w-xl leading-relaxed">
              Discover agents, connectors, and accelerators from Catch33 and our partner ecosystem.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MARKETPLACE.map((m, i) => (
              <FadeIn key={m.title} delay={i * 70}>
                <MarketplaceCard {...m} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLIENT TOOLS ─── */}
      <section id="client-tools" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-14">
            <SectionLabel>Client Tools</SectionLabel>
            <h2 className="font-fjalla text-4xl md:text-5xl text-white leading-tight mb-4">
              Run Your Operation With Clarity
            </h2>
            <p className="text-slate-400 max-w-xl leading-relaxed">
              The tooling we give every client to stay in control of their environment.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CLIENT_TOOLS.map((t, i) => (
              <FadeIn key={t.title} delay={i * 70}>
                <div className="group bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] hover:border-[#50E3FF]/20 rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${HIGHLIGHT}18`, border: `1px solid ${HIGHLIGHT}25` }}>
                    <t.icon className="w-5 h-5" style={{ color: HIGHLIGHT }} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-fjalla text-white text-lg">{t.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed flex-1">{t.body}</p>
                  <a href="#connect" className="flex items-center gap-1 text-xs font-semibold mt-auto"
                    style={{ color: HIGHLIGHT }}>
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="connect" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${HIGHLIGHT}08, transparent)` }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <FadeIn>
              <SectionLabel>Connect</SectionLabel>
              <h2 className="font-fjalla text-4xl md:text-5xl text-white leading-tight mb-5">
                Let's build what's next.
              </h2>
              <p className="text-slate-400 leading-relaxed mb-10 max-w-md">
                Tell us about your initiative. A Catch33 strategist will reach out within one business day.
              </p>

              <div className="flex flex-col gap-5">
                {[
                  { icon: Mail, text: 'hello@catch33.ai' },
                  { icon: Phone, text: '+1 (555) 033-0033' },
                  { icon: Globe, text: 'Global · Remote-first' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${HIGHLIGHT}15`, border: `1px solid ${HIGHLIGHT}25` }}>
                      <Icon className="w-4 h-4" style={{ color: HIGHLIGHT }} strokeWidth={1.6} />
                    </div>
                    <span className="text-slate-300 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={100}>
              {sent ? (
                <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-8 flex flex-col items-center justify-center gap-4 min-h-[360px] text-center">
                  <CheckCircle className="w-12 h-12" style={{ color: HIGHLIGHT }} />
                  <h3 className="font-fjalla text-2xl text-white">Message received!</h3>
                  <p className="text-slate-400 text-sm max-w-xs">A Catch33 strategist will be in touch within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}
                  className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-8 flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Jane Smith"
                        className="bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#50E3FF]/40 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Work Email</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="jane@company.com"
                        className="bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#50E3FF]/40 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Company</label>
                    <input
                      value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      placeholder="Acme Corp"
                      className="bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#50E3FF]/40 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Tell us about your initiative</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Describe your project or challenge..."
                      className="bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#50E3FF]/40 transition-colors resize-none"
                    />
                  </div>
                  <button type="submit"
                    className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg"
                    style={{ background: HIGHLIGHT, color: '#030c1a', boxShadow: `0 0 24px ${HIGHLIGHT}25` }}>
                    Send Message
                  </button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/Logo_Transparent copy.png" alt="Catch33" className="h-8 w-auto" />
            <img src="/name-mark-v2 copy.png" alt="Catch33 Inc." className="h-5 w-auto" />
          </div>
          <p className="text-xs text-slate-600 text-center">
            &copy; {new Date().getFullYear()} Catch33 Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        .font-fjalla, h1, h2, h3 { font-family: 'Fjalla One', sans-serif; }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::selection { background: #50E3FF30; color: #50E3FF; }
        * { scroll-behavior: smooth; }
        input:focus, textarea:focus { box-shadow: 0 0 0 2px #50E3FF18; }
      `}</style>
    </div>
  );
}
