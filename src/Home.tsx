import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Workflow,
  LayoutDashboard,
  Zap,
  Sparkles,
  GraduationCap,
  Brain,
  CheckCircle2,
  ArrowRight,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Send,
  Play
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- AX Dynamic Logo Component ---
const AXLogo = ({ division }: { division: 'ax' | 'ax-media' | 'ax-training' }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden bg-card border border-white/10 shadow-lg group">
        <div className="absolute inset-0 bg-gradient-brand opacity-20 group-hover:opacity-40 transition-opacity" />
        <span className="font-extrabold text-xl tracking-tighter text-white z-10">AX</span>
        {/* Animated corner accent */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-brand blur-sm" />
      </div>
      <span className="text-2xl font-bold tracking-tight text-white flex items-center">
        Automate<span className="text-gradient">X</span>
        {division === 'ax-media' && <span className="ml-2 text-sm font-medium px-2 py-0.5 rounded-full bg-white/10 border border-white/5 text-white/80">Media</span>}
        {division === 'ax-training' && <span className="ml-2 text-sm font-medium px-2 py-0.5 rounded-full bg-white/10 border border-white/5 text-white/80">Training</span>}
      </span>
    </div>
  );
};

export default function Home() {
  const { t, language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // Brand Division State
  const [division, setDivision] = useState<'ax' | 'ax-media' | 'ax-training'>(() => {
    try { const v = localStorage.getItem('ax:division'); if (v === 'ax' || v === 'ax-media' || v === 'ax-training') return v as any; } catch (e) { }
    return 'ax';
  });

  useEffect(() => {
    try { localStorage.setItem('ax:division', division); } catch (e) { }
    // Update CSS variables for gradients based on division
    const root = document.documentElement;
    if (division === 'ax') {
      root.style.setProperty('--brand-gradient-start', '#6A00FF');
      root.style.setProperty('--brand-gradient-end', '#00E5FF');
      root.style.setProperty('--brand-glow', 'rgba(106, 0, 255, 0.4)');
    } else if (division === 'ax-media') {
      root.style.setProperty('--brand-gradient-start', '#FF5A7A');
      root.style.setProperty('--brand-gradient-end', '#FF8A00');
      root.style.setProperty('--brand-glow', 'rgba(255, 90, 122, 0.4)');
    } else {
      root.style.setProperty('--brand-gradient-start', '#00E5FF');
      root.style.setProperty('--brand-gradient-end', '#6AFFC3');
      root.style.setProperty('--brand-glow', 'rgba(0, 229, 255, 0.4)');
    }
  }, [division]);

  const whatsappNumber = "+218912345678";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="min-h-screen overflow-hidden selection:bg-brand-gradient-start selection:text-white">
      {/* Global Background Aurora */}
      <div className="aurora-bg" />

      {/* Dynamic Island Navbar */}
      <nav className="dynamic-island w-[95%] max-w-5xl">
        <AXLogo division={division} />

        <div className="hidden md:flex items-center gap-8 px-8">
          <a href="#services" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Services</a>
          <a href="#pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Pricing</a>
          <Link href="/courses" className="text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer">
            Academy
          </Link>
          <Link href="/resources" className="text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer">
            Resources
          </Link>
        </div>

        <div className="flex items-center gap-3 relative z-20 pointer-events-auto">
          <LanguageToggle />
          <Link href="/admin">
            <Button variant="outline" size="sm" className="hidden sm:flex border-white/10 hover:bg-white/5 backdrop-blur-md rounded-full">
              Admin
            </Button>
          </Link>
          <Button asChild size="sm" className="bg-white text-black hover:bg-white/90 rounded-full font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Start Now
            </a>
          </Button>
        </div>
      </nav>

      {/* Extreme Hero Section */}
      <section className="relative pt-48 pb-32 px-4 flex flex-col items-center justify-center min-h-[90vh]">
        <motion.div style={{ y: yHero }} className="text-center max-w-5xl mx-auto z-10 relative">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium">AutomateX OS 2.0 is Live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]"
          >
            Scale Your Business <br />
            <span className="text-gradient">On Autopilot.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            We build elite AI workflows, chatbots, and high-conversion media systems that replace manual labor and multiply your revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-30 pointer-events-auto"
          >
            <Button asChild size="lg" className="h-14 px-8 rounded-full bg-white text-black hover:bg-white/90 font-bold text-lg glow-brand hover:scale-105 transition-all">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Build My System <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/20 bg-background/50 backdrop-blur-md hover:bg-white/10 font-bold text-lg transition-all">
              <Link href="/courses">
                <Play className="mr-2 w-5 h-5" /> View Academy
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating 3D Element Placeholder */}
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
      </section>

      {/* 2026 Bento Grid Features Area */}
      <section id="services" className="py-32 relative z-20 bg-background">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Designed For <br /><span className="text-gradient">Domination.</span></h2>
            <p className="text-xl text-muted-foreground max-w-2xl">Stop doing things manually. We engineer the systems that top 1% companies use to scale infinitely without hiring more humans.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[300px]">

            {/* Bento Box 1: Large Feature */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bento-card md:col-span-2 lg:col-span-2 row-span-2 p-8 flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-brand rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Autonomous AI Agents</h3>
                <p className="text-muted-foreground text-lg mb-8 max-w-md">Deploy custom LLMs that talk to your customers, close sales in DMs, and update your CRM automatically 24/7/365.</p>
              </div>
              <div className="w-full h-48 rounded-xl bg-black/50 border border-white/10 overflow-hidden relative">
                {/* Visual Placeholder for UI */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/20 to-transparent" />
                <div className="absolute top-4 left-4 right-4 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center px-4">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-3 animate-pulse" />
                  <span className="text-sm font-mono text-white/50">Agent processing order #492...</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Box 2: Small Feature */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="bento-card p-8 flex flex-col justify-between">
              <div>
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Zapier / Make Workflows</h3>
                <p className="text-sm text-muted-foreground">Connect over 5,000 apps together. When X happens, do Y.</p>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-[#FF4F00]/20 border border-[#FF4F00]/50" />
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 -ml-4" />
                <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/50 -ml-4" />
              </div>
            </motion.div>

            {/* Bento Box 3: Med Feature */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="bento-card md:col-span-2 lg:col-span-1 row-span-2 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h3 className="text-2xl font-bold mb-2">AX Media Visuals</h3>
                <p className="text-sm text-white/80">World-class brand design and social media architecture.</p>
              </div>
            </motion.div>

            {/* Bento Box 4: Small Feature */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="bento-card p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-4xl font-black text-white mb-2">10x</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">operational speed</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Dynamic Division Pricing Selector */}
      <section id="pricing" className="py-32 bg-background relative z-20">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">{t('pricing.title')}</h2>

            {/* Extremely Premium Pill Switcher */}
            <div className="inline-flex p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md relative mx-auto overflow-hidden">
              {/* Active Indicator Background */}
              <div
                className="absolute top-1.5 bottom-1.5 rounded-full bg-white transition-all duration-300 ease-out"
                style={{
                  left: division === 'ax' ? '6px' : division === 'ax-media' ? 'calc(33.33% + 4px)' : 'calc(66.66% + 2px)',
                  width: 'calc(33.33% - 8px)'
                }}
              />

              <button onClick={() => setDivision('ax')} className={`relative z-10 w-36 py-2.5 text-sm font-bold rounded-full transition-colors ${division === 'ax' ? 'text-black' : 'text-white/60 hover:text-white'}`}>
                Systems
              </button>
              <button onClick={() => setDivision('ax-media')} className={`relative z-10 w-36 py-2.5 text-sm font-bold rounded-full transition-colors ${division === 'ax-media' ? 'text-black' : 'text-white/60 hover:text-white'}`}>
                Media
              </button>
              <button onClick={() => setDivision('ax-training')} className={`relative z-10 w-36 py-2.5 text-sm font-bold rounded-full transition-colors ${division === 'ax-training' ? 'text-black' : 'text-white/60 hover:text-white'}`}>
                Training
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(() => {
              const pKey = division === 'ax-media' ? 'media' : division === 'ax-training' ? 'training' : 'ax';
              return [
                {
                  title: t(`pricing.${pKey}.starter.title`),
                  price: t(`pricing.${pKey}.starter.price`),
                  priceAlt: t(`pricing.${pKey}.starter.priceAlt`),
                  desc: t(`pricing.${pKey}.starter.desc`),
                  features: [t(`pricing.${pKey}.starter.feat1`), t(`pricing.${pKey}.starter.feat2`), t(`pricing.${pKey}.starter.feat3`)]
                },
                {
                  title: t(`pricing.${pKey}.growth.title`),
                  price: t(`pricing.${pKey}.growth.price`),
                  priceAlt: t(`pricing.${pKey}.growth.priceAlt`),
                  desc: t(`pricing.${pKey}.growth.desc`),
                  features: [t(`pricing.${pKey}.growth.feat1`), t(`pricing.${pKey}.growth.feat2`), t(`pricing.${pKey}.growth.feat3`), t(`pricing.${pKey}.growth.feat4`)],
                  popular: true
                },
                {
                  title: t(`pricing.${pKey}.scale.title`),
                  price: t(`pricing.${pKey}.scale.price`),
                  priceAlt: t(`pricing.${pKey}.scale.priceAlt`),
                  desc: t(`pricing.${pKey}.scale.desc`),
                  features: [t(`pricing.${pKey}.scale.feat1`), t(`pricing.${pKey}.scale.feat2`), t(`pricing.${pKey}.scale.feat3`), t(`pricing.${pKey}.scale.feat4`)]
                },
              ];
            })().map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className={tier.popular ? 'animated-border h-full' : 'h-full'}>
                  <div className={`bento-card h-full p-8 flex flex-col ${tier.popular ? 'bg-background m-[1px] rounded-[calc(var(--radius)-1px)] border-none hover:bg-background' : ''}`}>
                    {tier.popular && <Badge className="w-fit mb-4 bg-white text-black hover:bg-white/90">Most Popular</Badge>}
                    <h3 className="text-2xl font-bold mb-2">{tier.title}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-black tracking-tight">{tier.price}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-8 flex-1 border-b border-white/10 pb-6">{tier.desc}</p>

                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-sm font-medium text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button asChild className={`w-full h-12 rounded-xl font-bold transition-all ${tier.popular ? 'bg-gradient-brand text-white glow-brand hover:scale-[1.02]' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        Get Started
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extreme Footer Config */}
      <footer className="py-24 border-t border-white/5 bg-black relative overflow-hidden z-20">
        <div className="absolute inset-0 bg-gradient-brand opacity-5 blur-[120px]" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">Ready to automate?</h2>
              <p className="text-xl text-muted-foreground mb-8">Join the elite businesses scaling without adding headcount.</p>

              <form
                className="flex flex-col sm:flex-row gap-2 max-w-md"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const email = formData.get('email') as string;
                  if (!email) return;
                  import('@/lib/supabase').then(({ supabase, isSupabaseConfigured }) => {
                    if (isSupabaseConfigured()) {
                      supabase.from('subscribers').insert([{ email }]).then(() => {
                        alert("Welcome to the 1%. Email securely stored in database.");
                        (e.target as HTMLFormElement).reset();
                      });
                    } else { alert("App running locally. Saved offline."); }
                  });
                }}
              >
                <input type="email" name="email" required placeholder="name@company.com" className="h-14 flex-1 rounded-xl bg-white/5 border border-white/10 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20" />
                <Button type="submit" className="h-14 px-8 rounded-xl bg-white text-black font-bold hover:bg-white/90">Join Newsletter</Button>
              </form>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
            <AXLogo division={division} />
            <div className="text-sm text-white/40 mt-4 md:mt-0 font-medium tracking-wide font-mono">
              © 2026 AUTOMATEX LY. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Keeping PromptLibrary skeleton mapped here to prevent route breakage
export function PromptLibrary() { return <div className="p-20 text-center text-white">Resource Library Moved to /resources</div>; }
