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

export default function Home() {
  const { t, language } = useLanguage();
  
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <img 
              src="/hero-automation.png" 
              alt="AI Automation" 
              className="w-full rounded-2xl shadow-2xl border border-border/50"
            />
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('pricing.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('pricing.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: t('pricing.starter.title'),
                price: t('pricing.starter.price'),
                priceAlt: t('pricing.starter.priceAlt'),
                desc: t('pricing.starter.desc'),
                features: [
                  t('pricing.starter.feat1'),
                  t('pricing.starter.feat2'),
                  t('pricing.starter.feat3'),
                ]
              },
              {
                title: t('pricing.growth.title'),
                price: t('pricing.growth.price'),
                priceAlt: t('pricing.growth.priceAlt'),
                desc: t('pricing.growth.desc'),
                features: [
                  t('pricing.growth.feat1'),
                  t('pricing.growth.feat2'),
                  t('pricing.growth.feat3'),
                  t('pricing.growth.feat4'),
                ],
                popular: true
              },
              {
                title: t('pricing.scale.title'),
                price: t('pricing.scale.price'),
                priceAlt: t('pricing.scale.priceAlt'),
                desc: t('pricing.scale.desc'),
                features: [
                  t('pricing.scale.feat1'),
                  t('pricing.scale.feat2'),
                  t('pricing.scale.feat3'),
                  t('pricing.scale.feat4'),
                ]
              },
            ].map((tier, i) => (
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
