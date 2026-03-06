import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Send
} from "lucide-react";
import { motion } from "framer-motion";

// Small utilities
const uid = () => Math.random().toString(36).slice(2, 9);


export default function Home() {
  const { t, language } = useLanguage();

  // Division (AX / AX Media / AX Training)
  const [division, setDivision] = useState<'ax' | 'ax-media' | 'ax-training'>(() => {
    try { const v = localStorage.getItem('ax:division'); if (v === 'ax' || v === 'ax-media' || v === 'ax-training') return v as any; } catch (e) { }
    return 'ax';
  });

  useEffect(() => {
    try { localStorage.setItem('ax:division', division); } catch (e) { }
    // update accent vars
    const map: Record<string, { a: string, b: string }> = {
      'ax': { a: '#8F75D3', b: '#6A00FF' },
      'ax-media': { a: '#FF5A7A', b: '#FF8A00' },
      'ax-training': { a: '#00E5FF', b: '#6AFFC3' }
    };
    const pair = map[division] || map['ax'];
    document.documentElement.style.setProperty('--ax-accent', pair.a);
    document.documentElement.style.setProperty('--ax-accent-strong', pair.b);
  }, [division]);

  // Theme (dark/light) persisted
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try { const s = localStorage.getItem('ax:theme'); if (s === 'light' || s === 'dark') return s as any; } catch (e) { }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  useEffect(() => {
    try { localStorage.setItem('ax:theme', theme); } catch (e) { }
    if (theme === 'light') document.documentElement.classList.add('light'); else document.documentElement.classList.remove('light');
  }, [theme]);

  // Hero canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let w = canvas.clientWidth, h = canvas.clientHeight; const dpr = window.devicePixelRatio || 1; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const nodes: any[] = [];
    const N = Math.max(12, Math.floor((w * h) / 90000));
    for (let i = 0; i < N; i++) { nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: 1.5 + Math.random() * 3 }); }
    let mouse = { x: -9999, y: -9999 };
    function onMove(e: MouseEvent) { const r = canvas!.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }
    canvas.addEventListener('mousemove', onMove); canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
    let raf = 0;
    function step() {
      ctx.clearRect(0, 0, w, h); nodes.forEach(n => { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > w) n.vx *= -1; if (n.y < 0 || n.y > h) n.vy *= -1; const dx = mouse.x - n.x, dy = mouse.y - n.y; const dist = Math.hypot(dx, dy); if (dist < 160) { n.vx += dx / dist * 0.03; n.vy += dy / dist * 0.03; } });
      for (let i = 0; i < nodes.length; i++) { for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i], b = nodes[j]; const dx = a.x - b.x, dy = a.y - b.y; const dist = Math.hypot(dx, dy); if (dist < 140) { const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y); g.addColorStop(0, getComputedStyle(document.documentElement).getPropertyValue('--ax-accent') || '#8F75D3'); g.addColorStop(1, getComputedStyle(document.documentElement).getPropertyValue('--ax-accent-strong') || '#6A00FF'); ctx.strokeStyle = g; ctx.globalAlpha = 1 - dist / 140; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } } }
      nodes.forEach(n => { ctx.beginPath(); ctx.fillStyle = 'white'; ctx.globalAlpha = 0.9; ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill(); }); ctx.globalAlpha = 1; raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    const onResize = () => { w = canvas.clientWidth; h = canvas.clientHeight; const d = window.devicePixelRatio || 1; canvas.width = w * d; canvas.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); canvas.removeEventListener('mousemove', onMove); };
  }, []);

  const whatsappNumber = "+218912345678"; // Replace with actual number
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold gradient-purple bg-clip-text text-transparent">
              AutomateX
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm hover:text-primary transition-colors">
              {t('nav.services')}
            </a>
            <a href="#process" className="text-sm hover:text-primary transition-colors">
              {t('nav.process')}
            </a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">
              {t('nav.pricing')}
            </a>
            <a href="#case-study" className="text-sm hover:text-primary transition-colors">
              {t('nav.caseStudy')}
            </a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">
              {t('nav.about')}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Button asChild className="gradient-purple">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Send className="h-4 w-4 mr-2" />
                {t('hero.cta.primary')}
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-dark opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-6">
              {t('hero.badge')}
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-purple text-lg">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Send className="h-5 w-5 mr-2" />
                  {t('hero.cta.primary')}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <a href="#contact">
                  {t('hero.cta.secondary')}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 max-w-5xl mx-auto hero-canvas-wrap"
          >
            <canvas ref={canvasRef} className="hero-canvas w-full rounded-2xl" aria-hidden="true" style={{ height: 320, borderRadius: 12 }} />
            <div className="mt-4 text-center text-sm text-muted-foreground">Live system network — interactive preview</div>
          </motion.div>
        </div>
      </section>

      {/* Four Core Pillars */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('pillars.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('pillars.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: t('pillars.tools.title'), desc: t('pillars.tools.desc') },
              { icon: Sparkles, title: t('pillars.media.title'), desc: t('pillars.media.desc') },
              { icon: GraduationCap, title: t('pillars.consultation.title'), desc: t('pillars.consultation.desc') },
              { icon: Brain, title: t('pillars.systems.title'), desc: t('pillars.systems.desc') },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg gradient-purple flex items-center justify-center mb-4">
                      <pillar.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{pillar.desc}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('services.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('services.subtitle')}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: t('services.chatbots.title'),
                desc: t('services.chatbots.desc'),
                image: '/chatbot-demo.png'
              },
              {
                icon: Workflow,
                title: t('services.workflows.title'),
                desc: t('services.workflows.desc'),
                image: '/workflow-automation.png'
              },
              {
                icon: LayoutDashboard,
                title: t('services.systems.title'),
                desc: t('services.systems.desc'),
                image: '/business-systems.png'
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full overflow-hidden hover:border-primary/50 transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg gradient-purple flex items-center justify-center">
                        <service.icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-card/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('process.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('process.subtitle')}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              { title: t('process.step1.title'), desc: t('process.step1.desc') },
              { title: t('process.step2.title'), desc: t('process.step2.desc') },
              { title: t('process.step3.title'), desc: t('process.step3.desc') },
              { title: t('process.step4.title'), desc: t('process.step4.desc') },
              { title: t('process.step5.title'), desc: t('process.step5.desc') },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full gradient-purple flex items-center justify-center text-white font-bold text-lg">
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t('pricing.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('pricing.subtitle')}</p>
          </div>

          {/* Division Switcher */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-1.5 rounded-xl inline-flex flex-wrap items-center gap-1">
              <button
                onClick={() => setDivision('ax')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${division === 'ax' ? 'bg-[#6A00FF] text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}
              >
                Systems & Tools
              </button>
              <button
                onClick={() => setDivision('ax-media')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${division === 'ax-media' ? 'bg-[#FF5A7A] text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}
              >
                Media & Marketing
              </button>
              <button
                onClick={() => setDivision('ax-training')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${division === 'ax-training' ? 'bg-[#00E5FF] text-[#0A0A0F] shadow-lg' : 'text-muted-foreground hover:text-white'}`}
              >
                Training & Workshops
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(() => {
              const pKey = division === 'ax-media' ? 'media' : division === 'ax-training' ? 'training' : 'ax';
              return [
                {
                  title: t(`pricing.${pKey}.starter.title`),
                  price: t(`pricing.${pKey}.starter.price`),
                  priceAlt: t(`pricing.${pKey}.starter.priceAlt`),
                  desc: t(`pricing.${pKey}.starter.desc`),
                  features: [
                    t(`pricing.${pKey}.starter.feat1`),
                    t(`pricing.${pKey}.starter.feat2`),
                    t(`pricing.${pKey}.starter.feat3`),
                  ]
                },
                {
                  title: t(`pricing.${pKey}.growth.title`),
                  price: t(`pricing.${pKey}.growth.price`),
                  priceAlt: t(`pricing.${pKey}.growth.priceAlt`),
                  desc: t(`pricing.${pKey}.growth.desc`),
                  features: [
                    t(`pricing.${pKey}.growth.feat1`),
                    t(`pricing.${pKey}.growth.feat2`),
                    t(`pricing.${pKey}.growth.feat3`),
                    t(`pricing.${pKey}.growth.feat4`),
                  ],
                  popular: true
                },
                {
                  title: t(`pricing.${pKey}.scale.title`),
                  price: t(`pricing.${pKey}.scale.price`),
                  priceAlt: t(`pricing.${pKey}.scale.priceAlt`),
                  desc: t(`pricing.${pKey}.scale.desc`),
                  features: [
                    t(`pricing.${pKey}.scale.feat1`),
                    t(`pricing.${pKey}.scale.feat2`),
                    t(`pricing.${pKey}.scale.feat3`),
                    t(`pricing.${pKey}.scale.feat4`),
                  ]
                },
              ];
            })().map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className={`h-full ${tier.popular ? 'border-primary shadow-lg shadow-primary/20' : ''}`}>
                  <CardHeader>
                    {tier.popular && (
                      <Badge className="w-fit mb-2 gradient-purple">Most Popular</Badge>
                    )}
                    <CardTitle className="text-2xl">{tier.title}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground ml-2">/ month</span>
                      <div className="text-sm text-muted-foreground mt-1">{tier.priceAlt}</div>
                    </div>
                    <CardDescription className="mt-4">{tier.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className={`w-full mt-6 ${tier.popular ? 'gradient-purple' : ''}`}
                      variant={tier.popular ? 'default' : 'outline'}
                    >
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        Get Started
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section id="case-study" className="py-20 bg-card/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('case.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('case.subtitle')}</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">{t('case.before.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground">• {t('case.before.item1')}</li>
                    <li className="text-sm text-muted-foreground">• {t('case.before.item2')}</li>
                    <li className="text-sm text-muted-foreground">• {t('case.before.item3')}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="text-primary">{t('case.after.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="text-sm">✓ {t('case.after.item1')}</li>
                    <li className="text-sm">✓ {t('case.after.item2')}</li>
                    <li className="text-sm">✓ {t('case.after.item3')}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('case.system.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground">• {t('case.system.item1')}</li>
                    <li className="text-sm text-muted-foreground">• {t('case.system.item2')}</li>
                    <li className="text-sm text-muted-foreground">• {t('case.system.item3')}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <img
                src="/success-metrics.png"
                alt="Success Metrics"
                className="w-full rounded-2xl border border-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('about.title')}</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('about.mission')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t('about.mission.text')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('about.services')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t('about.services.text')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('about.target')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t('about.target.text')}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-12">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">{t('about.founder')}</p>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">{t('about.values.title')}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: t('about.values.clarity'), desc: t('about.values.clarity.desc') },
                  { title: t('about.values.innovation'), desc: t('about.values.innovation.desc') },
                  { title: t('about.values.structure'), desc: t('about.values.structure.desc') },
                  { title: t('about.values.education'), desc: t('about.values.education.desc') },
                  { title: t('about.values.impact'), desc: t('about.values.impact.desc') },
                  { title: t('about.values.integrity'), desc: t('about.values.integrity.desc') },
                ].map((value, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle className="text-base">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{value.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-card/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-xl text-muted-foreground mb-8">{t('cta.subtitle')}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button asChild size="lg" className="gradient-purple text-lg">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Send className="h-5 w-5 mr-2" />
                  {t('cta.button')}
                </a>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              {t('cta.email')} <a href="mailto:automatex.ly@gmail.com" className="text-primary hover:underline">automatex.ly@gmail.com</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Email Capture */}
      <section className="py-24 border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="container relative z-10 max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">Weekly Insights</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Master Systems & AI</h2>
          <p className="text-muted-foreground mb-8">
            Join 2,500+ professionals. We send one actionable email a week on AI workflows, tools, and business systems. Free resources included.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const email = formData.get('email') as string;
              if (!email) return;

              // Only runs if Supabase is properly configured
              import('@/lib/supabase').then(({ supabase, isSupabaseConfigured }) => {
                if (isSupabaseConfigured()) {
                  supabase.from('subscribers').insert([{ email }]).then(({ error }) => {
                    if (error) alert(error.message);
                    else {
                      alert("Subscribed successfully! Welcome to the AutomateX ecosystem.");
                      (e.target as HTMLFormElement).reset();
                    }
                  });
                } else {
                  alert("Subscribed simulated (Database not connected yet) -> " + email);
                }
              });
            }}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address..."
              className="flex-1 h-12 px-4 rounded-lg bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans"
            />
            <Button type="submit" className="h-12 px-8 gradient-purple font-semibold shadow-lg shadow-primary/20">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">Unsubscribe at any time. No spam.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-2xl font-bold gradient-purple bg-clip-text text-transparent mb-2">
                AutomateX
              </div>
              <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://instagram.com/automatex.ly" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/automatex.ly" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/automatex-ly" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:automatex.ly@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            {t('footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Prompt Library (exported for route /prompts) ---
export function PromptLibrary() {
  const [prompts, setPrompts] = useState<Array<any>>(() => {
    try { const raw = localStorage.getItem('ax:prompts'); return raw ? JSON.parse(raw) : []; } catch (e) { return []; }
  });
  const [q, setQ] = useState('');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');

  useEffect(() => { try { localStorage.setItem('ax:prompts', JSON.stringify(prompts)); } catch (e) { } }, [prompts]);

  function addPrompt() {
    if (!newTitle.trim() && !newContent.trim()) return;
    const item = { id: uid(), title: newTitle.trim() || 'Untitled', content: newContent.trim(), tags: newTags.split(',').map((s: string) => s.trim()).filter(Boolean), favorite: false, createdAt: Date.now() };
    setPrompts(p => [item, ...p]);
    setNewTitle(''); setNewContent(''); setNewTags(''); setShowNew(false);
  }

  function toggleFav(id: string) { setPrompts(p => p.map(x => x.id === id ? { ...x, favorite: !x.favorite } : x)); }
  function removePrompt(id: string) { setPrompts(p => p.filter(x => x.id !== id)); }

  const tags = Array.from(new Set(prompts.flatMap(p => p.tags || [])));
  const filtered = prompts.filter(p => {
    if (q && !(p.title || '').toLowerCase().includes(q.toLowerCase()) && !(p.content || '').toLowerCase().includes(q.toLowerCase())) return false;
    if (tagFilter && !(p.tags || []).includes(tagFilter)) return false;
    return true;
  });

  function exportJSON() {
    const data = JSON.stringify(prompts, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `automatex-prompts-${new Date().toISOString().slice(0, 10)}.json`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen container py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Prompt Library</h2>
        <div className="flex items-center gap-2">
          <input className="input mr-2" placeholder="Search prompts..." value={q} onChange={e => setQ(e.target.value)} />
          <button className="btn" onClick={() => setShowNew(s => !s)}>{showNew ? 'Cancel' : 'New Prompt'}</button>
          <button className="btn outline" onClick={exportJSON}>Export JSON</button>
        </div>
      </div>

      {showNew && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-card/50">
          <input className="w-full mb-2 p-2 rounded bg-transparent border border-border" placeholder="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
          <textarea className="w-full mb-2 p-2 rounded bg-transparent border border-border" rows={4} placeholder="Prompt content" value={newContent} onChange={e => setNewContent(e.target.value)} />
          <input className="w-full mb-2 p-2 rounded bg-transparent border border-border" placeholder="tags (comma separated)" value={newTags} onChange={e => setNewTags(e.target.value)} />
          <div className="flex gap-2 justify-end"><button className="btn gradient-purple" onClick={addPrompt}>Save Prompt</button></div>
        </div>
      )}

      <div className="mb-4 flex gap-2 items-center">
        <div className="text-sm text-muted-foreground">Filter tags:</div>
        <button className={`badge ${tagFilter === null ? 'badge-active' : ''}`} onClick={() => setTagFilter(null)}>All</button>
        {tags.map(t => (
          <button key={t} className={`badge ${tagFilter === t ? 'badge-active' : ''}`} onClick={() => setTagFilter(tagFilter === t ? null : t)}>{t}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <Card key={p.id} className="group">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <div>
                  <CardTitle>{p.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{new Date(p.createdAt).toLocaleString()}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn" onClick={() => { navigator.clipboard?.writeText(p.content); }}>Copy</button>
                  <button className="btn" onClick={() => toggleFav(p.id)}>{p.favorite ? '★' : '☆'}</button>
                  <button className="btn outline" onClick={() => removePrompt(p.id)}>Delete</button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm bg-transparent">{p.content}</pre>
              <div className="mt-3 flex gap-2 flex-wrap">
                {(p.tags || []).map((t: string) => <Badge key={t}>{t}</Badge>)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Courses() { return <div className="container py-16"><h2 className="text-2xl font-bold">Courses (coming soon)</h2></div> }
export function Dashboard() { return <div className="container py-16"><h2 className="text-2xl font-bold">Dashboard (coming soon)</h2></div> }
