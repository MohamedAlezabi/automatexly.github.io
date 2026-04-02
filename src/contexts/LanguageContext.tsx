import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.services': 'Services',
    'nav.process': 'Process',
    'nav.academy': 'Academy',
    'nav.resources': 'Resources',
    'nav.start': 'Start Now',
    
    // Hero
    'hero.title': 'Build the systems behind modern business',
    'hero.subtitle': 'AutomateX designs and deploys AI systems, automations, websites, and digital workflows that reduce manual work and improve execution.',
    'hero.cta.primary': 'Get a Proposal',
    'hero.cta.secondary': 'Explore Services',
    
    // Strip
    'strip.ai': 'AI Systems',
    'strip.automation': 'Automation Infrastructure',
    'strip.websites': 'Smart Websites',
    'strip.capture': 'Lead Capture',
    'strip.workflows': 'Internal Workflows',
    'strip.training': 'Training',
    
    // Services
    'services.title': 'The systems we build',
    'services.subtitle': 'We build digital systems that help businesses operate faster, respond better, and scale with less friction.',
    
    'services.c1.title': 'AI Chatbots',
    'services.c1.desc': 'Automate conversations across WhatsApp, websites, and social channels to answer questions, qualify leads, and reduce response time.',
    
    'services.c2.title': 'Internal Automations',
    'services.c2.desc': 'Remove repetitive manual work with workflows that connect forms, approvals, notifications, databases, and everyday operations.',
    
    'services.c3.title': 'Smart Websites',
    'services.c3.desc': 'Build modern websites that do more than look good — they explain, convert, and support the business.',
    
    'services.c4.title': 'Lead Capture Systems',
    'services.c4.desc': 'Turn attention into structured inquiries with better forms, funnels, routing, and follow-up logic.',
    
    'services.c5.title': 'Dashboards & Ops Layers',
    'services.c5.desc': 'Centralize information and simplify visibility across tasks, leads, updates, and internal execution.',
    
    'services.c6.title': 'Training & AI Adoption',
    'services.c6.desc': 'Help teams understand, adopt, and use AI tools in practical ways that fit real workflows.',
    
    // Why AutomateX
    'why.title': 'Why clients work with AutomateX',
    'why.subtitle': 'Because most businesses do not need more noise. They need better systems.',
    'why.i1': 'Less repetitive work',
    'why.i2': 'Faster response and follow-up',
    'why.i3': 'Better digital structure',
    'why.i4': 'Clearer operations',
    'why.i5': 'More scalable execution',
    'why.i6': 'Stronger online presence',

    // Process
    'process.title': 'A clear system from idea to deployment',
    'process.s1.title': 'Audit',
    'process.s1.desc': 'We identify the real friction points, bottlenecks, and opportunities.',
    'process.s2.title': 'Architecture',
    'process.s2.desc': 'We design the right system, structure, and user flow.',
    'process.s3.title': 'Build',
    'process.s3.desc': 'We develop the website, automation, chatbot, or digital layer.',
    'process.s4.title': 'Deploy & Optimize',
    'process.s4.desc': 'We test, refine, and launch with practical performance in mind.',

    // Use cases
    'cases.title': 'What this can look like in practice',
    'cases.i1': 'A restaurant that handles inquiries and orders more efficiently on WhatsApp',
    'cases.i2': 'A training center with a cleaner student registration flow',
    'cases.i3': 'An initiative website that organizes information, resources, and contact points',
    'cases.i4': 'A school inquiry system that reduces manual back-and-forth',
    'cases.i5': 'A chatbot that answers FAQs and captures qualified leads',
    'cases.i6': 'An admin dashboard that keeps operations visible and organized',

    // Credibility
    'cred.title': 'Built for practical execution',
    'cred.subtitle': 'AutomateX combines strategy, systems thinking, design, and implementation to help businesses build digital infrastructure that actually gets used.',

    // CTA
    'cta.title': 'Need a smarter system behind your business?',
    'cta.subtitle': 'Let’s design the right automation, website, or digital workflow for your operation.',
    'cta.primary': 'Book a Strategy Call',
    'cta.secondary': 'Message on WhatsApp',
    
    // Footer
    'footer.rights': '© 2026 AutomateX. All rights reserved.',

    // Placeholders
    'ph.hero': '[ Replace with a system-oriented illustration or dashboard-style composition in Framer Motion or an Image block. ]',
    'ph.chat': '[ Visual Placeholder: Chat UI / WhatsApp Interface ]',
    'ph.nodes': '[ Visual Placeholder: Make/Zapier Style Nodes ]',
    'ph.web': '[ Visual Placeholder: Wireframe or Browser Mockup ]',
    'ph.funnel': '[ Visual Placeholder: Form or Funnel Graphic ]',
    'ph.dash': '[ Visual Placeholder: Kanban Board or Chart ]',
    'ph.video': '[ Visual Placeholder: Video Player or Docs Graphic ]',
    'ph.cred': 'Replace this block with a clean, high-quality image of the founder, a professional team snapshot, or a credibility-inducing system architecture graphic.',
    'ph.ui': '[ USER INSTRUCTION ]'
  },
  ar: {
    // Nav
    'nav.services': 'الخدمات',
    'nav.process': 'العملية',
    'nav.academy': 'الأكاديمية',
    'nav.resources': 'الموارد',
    'nav.start': 'ابدأ الآن',
    
    // Hero
    'hero.title': 'نبني الأنظمة التي تحرك الشركات الحديثة',
    'hero.subtitle': 'تقوم AutomateX بتصميم ونشر أنظمة الذكاء الاصطناعي، الأتمتة، المواقع الإلكترونية، وسير العمل الرقمي مما يقلل العمل اليدوي ويحسن الأداء.',
    'hero.cta.primary': 'احصل على عرض سعر',
    'hero.cta.secondary': 'استكشف الخدمات',
    
    // Strip
    'strip.ai': 'أنظمة الذكاء الاصطناعي',
    'strip.automation': 'البنية التحتية للأتمتة',
    'strip.websites': 'مواقع ذكية',
    'strip.capture': 'استقطاب العملاء',
    'strip.workflows': 'سير العمل الداخلي',
    'strip.training': 'التدريب',
    
    // Services
    'services.title': 'الأنظمة التي نبنيها',
    'services.subtitle': 'نبني أنظمة رقمية لتساعد الشركات على العمل بشكل أسرع، الاستجابة بشكل أفضل، والتوسع بأقل تعقيد.',
    
    'services.c1.title': 'مساعدون أذكياء (Chatbots)',
    'services.c1.desc': 'أتمتة المحادثات عبر واتساب، المواقع، وشبكات التواصل للإجابة على الأسئلة، تأهيل العملاء، وتقليل وقت الاستجابة.',
    
    'services.c2.title': 'أتمتة سير العمل الداخلي',
    'services.c2.desc': 'إزالة العمل اليدوي المتكرر عبر بناء تدفقات تربط النماذج، الموافقات، الإشعارات، قواعد البيانات والعمليات اليومية.',
    
    'services.c3.title': 'مواقع ذكية ومتقدمة',
    'services.c3.desc': 'بناء مواقع حديثة لا تبدو رائعة فحسب — بل تشرح خدماتك، تحول الزوار إلى عملاء، وتدعم عملك.',
    
    'services.c4.title': 'أنظمة التقاط العملاء',
    'services.c4.desc': 'تحويل الانتباه إلى استفسارات منظمة باستخدام نماذج، مسارات تحويل، التوجيه، ومنطق المتابعة الفعال.',
    
    'services.c5.title': 'لوحات التحكم وإدارة العمليات',
    'services.c5.desc': 'مركزة المعلومات وتبسيط الرؤية عبر عرض المهام، العملاء، التحديثات والسير الداخلي للعمل.',
    
    'services.c6.title': 'التدريب وتبني الذكاء الاصطناعي',
    'services.c6.desc': 'مساعدة الفِرق على فهم، تبني، واستخدام أدوات الذكاء الاصطناعي بطرق عملية تناسب بيئة العمل الحقيقية.',
    
    // Why AutomateX
    'why.title': 'لماذا يعمل العملاء مع AutomateX',
    'why.subtitle': 'لأن معظم الشركات لا تحتاج إلى المزيد من الفوضى. هم يحتاجون إلى أنظمة أفضل.',
    'why.i1': 'أعمال متكررة أقل',
    'why.i2': 'استجابة ومتابعة أسرع',
    'why.i3': 'بنية رقمية أفضل',
    'why.i4': 'عمليات أوضح بكثير',
    'why.i5': 'أداء قابل للتوسع والتطور',
    'why.i6': 'حضور أقوى على الإنترنت',

    // Process
    'process.title': 'نظام واضح من الفكرة للتنفيذ',
    'process.s1.title': 'التدقيق والتقييم',
    'process.s1.desc': 'نحدد نقاط الاحتكاك الحقيقية، العوائق، والفرص المتاحة.',
    'process.s2.title': 'هندسة النظام',
    'process.s2.desc': 'نصمم النظام الصحيح، بنيته، وتجربة أو مسار المستخدم.',
    'process.s3.title': 'البناء والتطوير',
    'process.s3.desc': 'نطور الموقع، الأتمتة، روبوت المحادثة، أو الطبقة الرقمية بالكامل.',
    'process.s4.title': 'النشر والتحسين',
    'process.s4.desc': 'نختبر الدقة، نحسّن المنطق، ونطلق مع التركيز العملي على الأداء.',

    // Use cases
    'cases.title': 'كيف يبدو هذا على أرض الواقع',
    'cases.i1': 'مطعم يتعامل مع الاستفسارات والطلبات بكفاءة أعلى على واتساب',
    'cases.i2': 'مركز تدريب بآلية تسجيل طلاب منظمة وأكثر وضوحاً',
    'cases.i3': 'موقع رقمي لمبادرة ينظم المعلومات، الموارد، ونقاط الاتصال مباشرة',
    'cases.i4': 'نظام استفسار في مدرسة يُقلص الكثير من المراسلات اليدوية المزعجة',
    'cases.i5': 'روبوت ذكي يجيب على الأسئلة الشائعة ويسجّل المهتمين فوراً',
    'cases.i6': 'لوحة تحكم إدارية تبقي مسار العمليات مرئيًا ومنظمًا ومتاحاً',

    // Credibility
    'cred.title': 'مُصمم للتنفيذ العملي والحقيقي',
    'cred.subtitle': 'تجمع AutomateX بين التخطيط الاستراتيجي، التفكير النُظُمي، التصميم، والتنفيذ لمساعدة الشركات على بناء بنية تحتية رقمية يمكن استخدامها فعلياً وعلى نطاق واسع.',

    // CTA
    'cta.title': 'هل تحتاج إلى نظام أذكى خلف عملك؟',
    'cta.subtitle': 'دعنا نُصمم الأتمتة، الموقع الإلكتروني، أو مسار العمل الرقمي المناسب لعملياتك.',
    'cta.primary': 'احجز مكالمة تخطيط',
    'cta.secondary': 'تواصل عبر واتساب',
    
    // Footer
    'footer.rights': '© 2026 AutomateX. جميع الحقوق محفوظة.',

    // Placeholders
    'ph.hero': '[ استبدل هذا برسوم توضيحية للأنظمة أو نمط لوحة معلومات تم تصميمه بواسطة Framer Motion ]',
    'ph.chat': '[ مكان بصري: واجهة دردشة أو واتساب ]',
    'ph.nodes': '[ مكان بصري: هيكل العقد البرمجية لـ Make/Zapier ]',
    'ph.web': '[ مكان بصري: تصميم هيكل موقع أو متصفح ]',
    'ph.funnel': '[ مكان بصري: رسم بياني لنموذج أو قمع تسويقي ]',
    'ph.dash': '[ مكان بصري: لوحة مهام أو رسم بياني إحصائي ]',
    'ph.video': '[ مكان بصري: مشغل فيديو أو تصميمات وثائقية ]',
    'ph.cred': 'استبدل هذه الكتلة بصورة نظيفة للمؤسس، لقطة احترافية لفريق العمل، أو رسم معماري لنظام يزيد من الثقة والمصداقية.',
    'ph.ui': '[ تعليمات المستخدم ]'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Wait until mounted to avoid hydration mismatch, default to english initially for SSR safe component
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    try { const saved = localStorage.getItem('ax:lang'); if (saved === 'ar' || saved === 'en') setLanguage(saved as Language); } catch (e) { }
    setMounted(true);
  }, []);

  useEffect(() => {
    if(!mounted) return;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    try { localStorage.setItem('ax:lang', language); } catch (e) { }
  }, [language, mounted]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
