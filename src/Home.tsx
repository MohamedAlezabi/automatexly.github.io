import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Workflow,
  LayoutDashboard,
  Zap,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Globe,
  Moon,
  Sun
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// --- Theme Toggle ---
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setTheme(theme === "light" ? "dark" : "light")} 
      className="rounded-full w-9 h-9 border border-primary/20 hover:bg-primary/10 text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
          {theme === "light" ? (
             <motion.div key="moon" initial={{y:-20, opacity:0}} animate={{y:0, opacity:1}} exit={{y:20, opacity:0}} transition={{ duration: 0.2 }}>
                <Moon className="w-4 h-4" />
             </motion.div>
          ) : (
             <motion.div key="sun" initial={{y:-20, opacity:0}} animate={{y:0, opacity:1}} exit={{y:20, opacity:0}} transition={{ duration: 0.2 }}>
                <Sun className="w-4 h-4" />
             </motion.div>
          )}
      </AnimatePresence>
    </Button>
  );
}

// --- Clean Logo ---
const AXLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden bg-card border border-primary/20 shadow-lg group">
        <div className="absolute inset-0 bg-gradient-brand opacity-20 group-hover:opacity-40 transition-opacity" />
        <span className="font-extrabold text-xl tracking-tighter z-10 text-foreground" style={{ fontFamily: 'Poppins' }}>AX</span>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-brand blur-sm" />
      </div>
      <span className="text-2xl font-bold tracking-tight text-foreground flex items-center">
        Automate<span className="text-gradient">X</span>
      </span>
    </div>
  );
};

// --- Abstract Pulse Graphic ---
const SkeletonPulse = ({ text }: { text: string }) => (
    <div className="w-full h-full min-h-[120px] rounded-xl border border-primary/10 bg-primary/5 flex items-center justify-center relative overflow-hidden">
        <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-24 h-24 rounded-full bg-primary/20 blur-xl"
        />
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-50%] border-[1px] border-dashed border-primary/20 rounded-full opacity-50"
        />
        <span className="text-xs text-muted-foreground font-mono z-10 text-center max-w-[80%]">{text}</span>
    </div>
)

// --- Bento Card upgraded with Mouse Glow ---
const BentoCardBlock = ({ children, className = "" }: { children:React.ReactNode, className?:string }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mouseP, setMouse] = useState({x: 0, y: 0});
    
    // Complex Glow tracking cursor
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div 
            ref={cardRef} 
            onMouseMove={handleMouseMove}
            className={`bento-card group p-8 relative overflow-hidden ${className}`}
        >
            <motion.div 
                className="absolute w-[300px] h-[300px] bg-primary/30 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ top: mouseP.y - 150, left: mouseP.x - 150 }}
            />
            <div className="relative z-10 h-full flex flex-col justify-between">
                {children}
            </div>
        </div>
    )
}

// --- Framer Motion variants ---
const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
}
const fadeUpItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
}

export default function Home() {
  const { t, language } = useLanguage();
  const { scrollYProgress } = useScroll();
  // Enhanced Parallax
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const whatsappNumber = "+218912345678";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="min-h-screen overflow-hidden selection:bg-primary/30 selection:text-primary-foreground relative transition-colors duration-500">
      {/* Global Background Aurora */}
      <div className="aurora-bg" />

      {/* Dynamic Island Navbar */}
      <nav className="dynamic-island w-[95%] max-w-5xl">
        <AXLogo />

        <div className="hidden md:flex items-center gap-8 px-8">
          <a href="#services" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">{t('nav.services')}</a>
          <a href="#process" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">{t('nav.process')}</a>
          <Link href="/courses" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
            {t('nav.academy')}
          </Link>
          <Link href="/resources" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
            {t('nav.resources')}
          </Link>
        </div>

        <div className="flex items-center gap-3 relative z-20 pointer-events-auto">
          <ThemeToggle />
          <LanguageToggle />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold shadow-[0_0_20px_var(--brand-glow)]">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {t('nav.start')}
                </a>
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-4 flex flex-col items-center justify-center min-h-[90vh]">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="text-center max-w-5xl mx-auto z-10 relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1] text-foreground"
          >
            {t('hero.title').split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? <span key={i} className="text-gradient"> {word}</span> : <span key={i}> {word}</span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-30 pointer-events-auto"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button asChild size="lg" className="h-14 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold text-lg glow-brand transition-all">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    {t('hero.cta.primary')} <ArrowRight className="ml-2 w-5 h-5 rtl:mr-2 rtl:rotate-180" />
                </a>
                </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full border-border bg-background/50 backdrop-blur-md hover:bg-muted font-bold text-lg transition-all">
                <a href="#services">{t('hero.cta.secondary')}</a>
                </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* HERO VISUAL PLACEHOLDER */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full max-w-5xl mx-auto mt-16 z-20"
        >
            <div className="w-full h-80 md:h-[500px] border border-border bg-card/50 rounded-3xl flex flex-col items-center justify-center p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden group">
                <SkeletonPulse text={t('ph.hero')} />
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </div>
        </motion.div>
      </section>

      {/* Trust/Capability Strip (Animated Marquee) */}
      <section className="py-8 border-y border-border bg-card/30 backdrop-blur-sm overflow-hidden flex items-center relative z-20">
        <motion.div 
            className="flex whitespace-nowrap gap-12 font-medium text-sm md:text-base tracking-wider uppercase text-foreground/60 w-max"
            animate={{ x: language === 'ar' ? ['100%', '-100%'] : ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
            {[...Array(3)].map((_, index) => (
                <div key={index} className="flex gap-12 text-center items-center">
                    <span>{t('strip.ai')}</span>
                    <span className="text-primary">•</span>
                    <span>{t('strip.automation')}</span>
                    <span className="text-primary">•</span>
                    <span>{t('strip.websites')}</span>
                    <span className="text-primary">•</span>
                    <span>{t('strip.capture')}</span>
                    <span className="text-primary">•</span>
                    <span>{t('strip.workflows')}</span>
                    <span className="text-primary">•</span>
                    <span>{t('strip.training')}</span>
                    <span className="text-primary">•</span>
                </div>
            ))}
        </motion.div>
      </section>

      {/* The systems we build */}
      <section id="services" className="py-32 relative z-20 bg-background/50">
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpItem}
            className="mb-20 max-w-3xl"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-foreground">{t('services.title')}</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
                { icon: MessageSquare, title: t('services.c1.title'), desc: t('services.c1.desc'), ph: t('ph.chat') },
                { icon: Workflow, title: t('services.c2.title'), desc: t('services.c2.desc'), ph: t('ph.nodes') },
                { icon: Globe, title: t('services.c3.title'), desc: t('services.c3.desc'), ph: t('ph.web') },
                { icon: Zap, title: t('services.c4.title'), desc: t('services.c4.desc'), ph: t('ph.funnel') },
                { icon: LayoutDashboard, title: t('services.c5.title'), desc: t('services.c5.desc'), ph: t('ph.dash') },
                { icon: GraduationCap, title: t('services.c6.title'), desc: t('services.c6.desc'), ph: t('ph.video') },
            ].map((card, i) => (
                <motion.div key={i} variants={fadeUpItem}>
                    <BentoCardBlock className="h-full">
                        <div>
                            <card.icon className="w-8 h-8 text-primary mb-6" />
                            <h3 className="text-xl font-bold mb-3 text-foreground">{card.title}</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">{card.desc}</p>
                        </div>
                        <SkeletonPulse text={card.ph} />
                    </BentoCardBlock>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why clients work with AutomateX */}
      <section className="py-24 bg-card/40 relative z-20 border-y border-border">
        <div className="container max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-16 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring" }}
                className="flex-1"
            >
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 text-foreground">{t('why.title')}</h2>
                <p className="text-xl text-muted-foreground mb-8">
                    {t('why.subtitle')}
                </p>
            </motion.div>
            
            <motion.div 
                variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="flex-1 w-full"
            >
                <ul className="space-y-4">
                    {[ t('why.i1'), t('why.i2'), t('why.i3'), t('why.i4'), t('why.i5'), t('why.i6') ].map((item, i) => (
                        <motion.li key={i} variants={fadeUpItem} className="flex items-center gap-4 bg-background/80 p-4 rounded-xl border border-border/50 shadow-sm transition-transform hover:scale-[1.01]">
                            <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                            <span className="font-medium text-foreground">{item}</span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </div>
      </section>

      {/* Process Pipeline */}
      <section id="process" className="py-32 relative z-20 bg-background/50">
        <div className="container max-w-6xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-foreground">{t('process.title')}</h2>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-4 gap-6 relative">
                {/* Connecting Line animated */}
                <motion.div 
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: true }}
                    className="hidden md:block absolute top-[45px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 origin-left" 
                />

                {[
                    { step: "1", title: t('process.s1.title'), desc: t('process.s1.desc') },
                    { step: "2", title: t('process.s2.title'), desc: t('process.s2.desc') },
                    { step: "3", title: t('process.s3.title'), desc: t('process.s3.desc') },
                    { step: "4", title: t('process.s4.title'), desc: t('process.s4.desc') }
                ].map((s, i) => (
                    <motion.div key={i} variants={fadeUpItem} className="relative z-10">
                        <BentoCardBlock className="h-full bg-card/90">
                            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg mb-6 border border-primary/30 shadow-[0_0_15px_var(--brand-glow)]">
                                {s.step}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-foreground">{s.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                        </BentoCardBlock>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 relative z-20 bg-background/50">
        <div className="container max-w-6xl mx-auto px-4">
            <div className="mb-16 border-b border-border pb-8">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">{t('cases.title')}</h2>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6">
                {[ t('cases.i1'), t('cases.i2'), t('cases.i3'), t('cases.i4'), t('cases.i5'), t('cases.i6') ].map((useCase, i) => (
                    <motion.div key={i} variants={fadeUpItem} className="p-6 rounded-2xl border border-border bg-card/30 hover:bg-card/50 transition-colors flex items-start gap-4">
                        <div className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0 shadow-[0_0_10px_var(--brand-glow)]" />
                        <p className="text-lg text-foreground/80 leading-relaxed">{useCase}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* Credibility */}
      <section className="py-24 relative z-20 bg-card/60 border-y border-border">
        <div className="container max-w-4xl mx-auto px-4 text-center">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl md:text-4xl font-black mb-6 text-foreground">{t('cred.title')}</motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground leading-relaxed mb-12">
                {t('cred.subtitle')}
            </motion.p>
            
            <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="w-full max-w-2xl mx-auto h-80 bg-background/80 border border-border rounded-3xl flex flex-col items-center justify-center p-6 text-center shadow-xl">
                <SkeletonPulse text={t('ph.cred')} />
            </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative z-20 bg-background">
        <div className="container max-w-4xl mx-auto px-4 text-center">
            <BentoCardBlock className="p-12 md:p-20 relative overflow-hidden bg-gradient-to-b from-card to-background">
                <div className="absolute inset-0 bg-gradient-brand opacity-10 blur-[100px]" />
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 relative z-10 text-foreground">
                    {t('cta.title')}
                </h2>
                <p className="text-xl text-muted-foreground mb-10 relative z-10 max-w-2xl mx-auto">
                    {t('cta.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button asChild size="lg" className="h-14 px-8 rounded-xl bg-foreground text-background font-bold text-lg shadow-[0_0_20px_var(--brand-glow)]">
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                {t('cta.primary')}
                            </a>
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-xl border-border bg-background/50 backdrop-blur-sm font-bold text-lg">
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                               <MessageSquare className="w-5 h-5 mr-2 rtl:ml-2" /> {t('cta.secondary')}
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </BentoCardBlock>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background relative z-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <AXLogo />
            <div className="text-sm text-muted-foreground mt-4 md:mt-0 font-medium tracking-wide">
              {t('footer.rights')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PromptLibrary() { return <div className="p-20 text-center text-foreground">Resource Library Moved to /resources</div>; }
