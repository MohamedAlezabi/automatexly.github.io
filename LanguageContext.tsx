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
    // Navigation
    'nav.services': 'Services',
    'nav.process': 'Process',
    'nav.pricing': 'Pricing',
    'nav.caseStudy': 'Case Study',
    'nav.resources': 'Resources',
    'nav.about': 'About',
    
    // Hero
    'hero.title': 'Run Your Business on Autopilot',
    'hero.subtitle': "Libya's first AI-powered systems agency. We build chatbots, workflows, and business systems that save time, increase sales, and handle customers 24/7.",
    'hero.cta.primary': 'Get Started on WhatsApp',
    'hero.cta.secondary': 'Book Free Audit',
    'hero.badge': 'Est. 2021 • 12+ Active Clients • Libya\'s Pioneer',
    
    // Core Pillars
    'pillars.title': 'Four Core Pillars',
    'pillars.subtitle': 'A complete ecosystem built to teach, automate, and inspire',
    'pillars.tools.title': 'Tools',
    'pillars.tools.desc': 'AI tools, workflows, and step-by-step tutorials',
    'pillars.media.title': 'Media',
    'pillars.media.desc': 'Storytelling, visual creation, and marketing systems',
    'pillars.consultation.title': 'Consultation & Training',
    'pillars.consultation.desc': 'Workshops, mentorship, and AI education',
    'pillars.systems.title': 'Systems',
    'pillars.systems.desc': 'Thought leadership and systemic thinking',
    
    // Services
    'services.title': 'What We Build',
    'services.subtitle': 'Simple, powerful systems for real businesses',
    'services.chatbots.title': 'AI Chatbots',
    'services.chatbots.desc': '24/7 smart replies on WhatsApp, Instagram, and Facebook. Answer questions, collect leads, send menus, and move people toward booking—automatically.',
    'services.workflows.title': 'Workflow Automation',
    'services.workflows.desc': 'Stop losing customers to "I forgot". Turn repetitive tasks into automated flows: reminders, re-engagement, notifications, and internal processes.',
    'services.systems.title': 'Business Systems',
    'services.systems.desc': 'A clean setup connecting everything: customer messages, bookings, notes, and follow-ups—so your business feels organized instead of chaotic.',
    
    // Process
    'process.title': 'How It Works',
    'process.subtitle': 'Clear, lightweight process. No endless calls, no confusion.',
    'process.step1.title': 'Free Automation Audit',
    'process.step1.desc': 'We look at how customers reach you and where time is being wasted (10 minutes)',
    'process.step2.title': 'System Design',
    'process.step2.desc': 'We map a simple automation flow based on your goals',
    'process.step3.title': 'Installation',
    'process.step3.desc': 'We connect chatbots, WhatsApp/IG, CRM, and workflows',
    'process.step4.title': 'Optimization',
    'process.step4.desc': 'We tune replies, steps, and triggers over 2-4 weeks',
    'process.step5.title': 'Maintenance',
    'process.step5.desc': 'Optional monthly updates as your business changes',
    
    // Pricing
    'pricing.title': 'Simple Pricing',
    'pricing.subtitle': 'Transparent pricing you can grow with',
    'pricing.starter.title': 'Starter',
    'pricing.starter.price': '$79',
    'pricing.starter.priceAlt': '200-300 LYD',
    'pricing.starter.desc': 'Ideal for testing automation on a single channel',
    'pricing.starter.feat1': 'Basic AI chatbot',
    'pricing.starter.feat2': 'FAQ replies',
    'pricing.starter.feat3': 'Lead capture',
    'pricing.growth.title': 'Growth',
    'pricing.growth.price': '$149',
    'pricing.growth.priceAlt': '350-500 LYD',
    'pricing.growth.desc': 'Best for restaurants, gyms, clinics and local brands',
    'pricing.growth.feat1': 'Full chatbot + flows',
    'pricing.growth.feat2': 'Basic CRM & tagging',
    'pricing.growth.feat3': 'Simple bookings or orders',
    'pricing.growth.feat4': 'Light analytics',
    'pricing.scale.title': 'Scale',
    'pricing.scale.price': '$249+',
    'pricing.scale.priceAlt': 'Custom',
    'pricing.scale.desc': 'For serious operations that want a full AI-powered engine',
    'pricing.scale.feat1': 'Full automation system',
    'pricing.scale.feat2': 'Advanced tracking & reports',
    'pricing.scale.feat3': 'Comment → DM → sale funnels',
    'pricing.scale.feat4': 'Priority support',
    
    // Case Study
    'case.title': 'Case Study: Almansory Restaurant',
    'case.subtitle': 'From manual replies to automated system',
    'case.before.title': 'Before',
    'case.before.item1': 'Owner replying to DMs manually',
    'case.before.item2': 'No tracking of what posts brought customers',
    'case.before.item3': 'Inconsistent response times',
    'case.after.title': 'After AutomateX',
    'case.after.item1': 'Automated menu & FAQ replies',
    'case.after.item2': 'Comment → DM → order flow',
    'case.after.item3': 'Clear understanding of what drives sales',
    'case.system.title': 'System Installed',
    'case.system.item1': 'Instagram + Facebook chatbot flows',
    'case.system.item2': 'Simple lead/interest tracking',
    'case.system.item3': 'Foundations for future campaigns',
    
    // About
    'about.title': 'About AutomateX',
    'about.mission': 'Mission',
    'about.mission.text': 'Automate business workflows and implement AI systems to help organisations operate smarter and faster.',
    'about.services': 'Services',
    'about.services.text': 'Automation solutions, AI-powered tools, workflow optimisation.',
    'about.target': 'Target Clients',
    'about.target.text': 'International schools, SMEs, and growing organisations looking to modernise operations.',
    'about.founder': 'Founded by Mohamed Al-Ezabi, an AI expert and systems thinker. Based in Libya, serving clients across MENA and beyond.',
    'about.values.title': 'Our Values',
    'about.values.clarity': 'Clarity',
    'about.values.clarity.desc': 'We communicate simply and systemically. No noise, no hype.',
    'about.values.innovation': 'Innovation',
    'about.values.innovation.desc': 'We embrace new technology and push boundaries responsibly.',
    'about.values.structure': 'Structure',
    'about.values.structure.desc': 'Everything we build is organised, repeatable, and scalable.',
    'about.values.education': 'Education',
    'about.values.education.desc': 'We teach before we sell; knowledge fuels empowerment.',
    'about.values.impact': 'Impact',
    'about.values.impact.desc': 'We aim to transform workflows, businesses, and mindsets.',
    'about.values.integrity': 'Integrity',
    'about.values.integrity.desc': 'Calm, confident, and transparent in every decision.',
    
    // Resources
    'resources.title': 'Free Resources',
    'resources.subtitle': 'Starter resources to test automation and use AI with clear structure',
    'resources.prompts.title': 'Prompt Library',
    'resources.prompts.desc': '100+ ready-to-use prompts for leads, content, and automation',
    'resources.downloads.title': 'Free Downloads',
    'resources.downloads.desc': 'Automation pack, social engine blueprint, and starter guides',
    'resources.templates.title': 'Template Store',
    'resources.templates.desc': 'Coming soon: Ready-made systems for restaurants, gyms, and service businesses',
    
    // CTA
    'cta.title': 'Ready to Automate Your Business?',
    'cta.subtitle': 'Book a free 20-minute automation audit. We\'ll show you what can be automated in the next 30 days.',
    'cta.button': 'Book Free Audit',
    'cta.email': 'Or email us at',
    
    // Footer
    'footer.tagline': 'System, not chaos.',
    'footer.rights': '© 2025 AutomateX. All rights reserved.',
  },
  ar: {
    // Navigation
    'nav.services': 'الخدمات',
    'nav.process': 'العملية',
    'nav.pricing': 'الأسعار',
    'nav.caseStudy': 'دراسة حالة',
    'nav.resources': 'الموارد',
    'nav.about': 'عن الشركة',
    
    // Hero
    'hero.title': 'شغّل عملك بشكل تلقائي',
    'hero.subtitle': 'أول وكالة أنظمة مدعومة بالذكاء الاصطناعي في ليبيا. نبني روبوتات المحادثة وسير العمل وأنظمة الأعمال التي توفر الوقت وتزيد المبيعات وتتعامل مع العملاء على مدار الساعة.',
    'hero.cta.primary': 'ابدأ على واتساب',
    'hero.cta.secondary': 'احجز تدقيق مجاني',
    'hero.badge': 'تأسست 2021 • 12+ عميل نشط • رائدة ليبيا',
    
    // Core Pillars
    'pillars.title': 'أربع ركائز أساسية',
    'pillars.subtitle': 'نظام بيئي كامل مبني للتعليم والأتمتة والإلهام',
    'pillars.tools.title': 'الأدوات',
    'pillars.tools.desc': 'أدوات الذكاء الاصطناعي وسير العمل والدروس التعليمية',
    'pillars.media.title': 'الإعلام',
    'pillars.media.desc': 'سرد القصص والإبداع المرئي وأنظمة التسويق',
    'pillars.consultation.title': 'الاستشارات والتدريب',
    'pillars.consultation.desc': 'ورش العمل والإرشاد والتعليم في مجال الذكاء الاصطناعي',
    'pillars.systems.title': 'الأنظمة',
    'pillars.systems.desc': 'القيادة الفكرية والتفكير المنهجي',
    
    // Services
    'services.title': 'ما نبنيه',
    'services.subtitle': 'أنظمة بسيطة وقوية للأعمال الحقيقية',
    'services.chatbots.title': 'روبوتات المحادثة الذكية',
    'services.chatbots.desc': 'ردود ذكية على مدار الساعة على واتساب وإنستغرام وفيسبوك. الإجابة على الأسئلة وجمع العملاء المحتملين وإرسال القوائم ونقل الأشخاص نحو الحجز—تلقائيًا.',
    'services.workflows.title': 'أتمتة سير العمل',
    'services.workflows.desc': 'توقف عن فقدان العملاء بسبب "نسيت". حوّل المهام المتكررة إلى تدفقات تلقائية: التذكيرات وإعادة المشاركة والإشعارات والعمليات الداخلية.',
    'services.systems.title': 'أنظمة الأعمال',
    'services.systems.desc': 'إعداد نظيف يربط كل شيء: رسائل العملاء والحجوزات والملاحظات والمتابعات—حتى يشعر عملك بالتنظيم بدلاً من الفوضى.',
    
    // Process
    'process.title': 'كيف يعمل',
    'process.subtitle': 'عملية واضحة وخفيفة. لا مكالمات لا نهاية لها، لا ارتباك.',
    'process.step1.title': 'تدقيق الأتمتة المجاني',
    'process.step1.desc': 'ننظر إلى كيفية وصول العملاء إليك وأين يتم إهدار الوقت (10 دقائق)',
    'process.step2.title': 'تصميم النظام',
    'process.step2.desc': 'نرسم تدفق أتمتة بسيط بناءً على أهدافك',
    'process.step3.title': 'التثبيت',
    'process.step3.desc': 'نربط روبوتات المحادثة وواتساب/إنستغرام وإدارة علاقات العملاء وسير العمل',
    'process.step4.title': 'التحسين',
    'process.step4.desc': 'نضبط الردود والخطوات والمحفزات على مدى 2-4 أسابيع',
    'process.step5.title': 'الصيانة',
    'process.step5.desc': 'تحديثات شهرية اختيارية مع تغير عملك',
    
    // Pricing
    'pricing.title': 'أسعار بسيطة',
    'pricing.subtitle': 'أسعار شفافة يمكنك النمو معها',
    'pricing.starter.title': 'البداية',
    'pricing.starter.price': '79$',
    'pricing.starter.priceAlt': '200-300 دينار ليبي',
    'pricing.starter.desc': 'مثالي لاختبار الأتمتة على قناة واحدة',
    'pricing.starter.feat1': 'روبوت محادثة ذكي أساسي',
    'pricing.starter.feat2': 'ردود الأسئلة الشائعة',
    'pricing.starter.feat3': 'التقاط العملاء المحتملين',
    'pricing.growth.title': 'النمو',
    'pricing.growth.price': '149$',
    'pricing.growth.priceAlt': '350-500 دينار ليبي',
    'pricing.growth.desc': 'الأفضل للمطاعم والصالات الرياضية والعيادات والعلامات التجارية المحلية',
    'pricing.growth.feat1': 'روبوت محادثة كامل + تدفقات',
    'pricing.growth.feat2': 'إدارة علاقات العملاء الأساسية والوسم',
    'pricing.growth.feat3': 'حجوزات أو طلبات بسيطة',
    'pricing.growth.feat4': 'تحليلات خفيفة',
    'pricing.scale.title': 'التوسع',
    'pricing.scale.price': '249$+',
    'pricing.scale.priceAlt': 'مخصص',
    'pricing.scale.desc': 'للعمليات الجادة التي تريد محركًا كاملاً مدعومًا بالذكاء الاصطناعي',
    'pricing.scale.feat1': 'نظام أتمتة كامل',
    'pricing.scale.feat2': 'تتبع وتقارير متقدمة',
    'pricing.scale.feat3': 'تعليق → رسالة مباشرة → قمع مبيعات',
    'pricing.scale.feat4': 'دعم ذو أولوية',
    
    // Case Study
    'case.title': 'دراسة حالة: مطعم المنصوري',
    'case.subtitle': 'من الردود اليدوية إلى النظام الآلي',
    'case.before.title': 'قبل',
    'case.before.item1': 'المالك يرد على الرسائل المباشرة يدويًا',
    'case.before.item2': 'لا تتبع للمنشورات التي جلبت العملاء',
    'case.before.item3': 'أوقات استجابة غير متسقة',
    'case.after.title': 'بعد AutomateX',
    'case.after.item1': 'ردود تلقائية للقائمة والأسئلة الشائعة',
    'case.after.item2': 'تعليق → رسالة مباشرة → تدفق الطلب',
    'case.after.item3': 'فهم واضح لما يدفع المبيعات',
    'case.system.title': 'النظام المثبت',
    'case.system.item1': 'تدفقات روبوت محادثة إنستغرام + فيسبوك',
    'case.system.item2': 'تتبع بسيط للعملاء المحتملين/الاهتمام',
    'case.system.item3': 'أسس للحملات المستقبلية',
    
    // About
    'about.title': 'عن AutomateX',
    'about.mission': 'المهمة',
    'about.mission.text': 'أتمتة سير عمل الأعمال وتنفيذ أنظمة الذكاء الاصطناعي لمساعدة المؤسسات على العمل بشكل أذكى وأسرع.',
    'about.services': 'الخدمات',
    'about.services.text': 'حلول الأتمتة والأدوات المدعومة بالذكاء الاصطناعي وتحسين سير العمل.',
    'about.target': 'العملاء المستهدفون',
    'about.target.text': 'المدارس الدولية والشركات الصغيرة والمتوسطة والمؤسسات النامية التي تتطلع إلى تحديث العمليات.',
    'about.founder': 'أسسها محمد العزابي، خبير في الذكاء الاصطناعي ومفكر في الأنظمة. مقرها في ليبيا، تخدم العملاء في منطقة الشرق الأوسط وشمال أفريقيا وخارجها.',
    'about.values.title': 'قيمنا',
    'about.values.clarity': 'الوضوح',
    'about.values.clarity.desc': 'نتواصل ببساطة ومنهجية. لا ضوضاء، لا مبالغة.',
    'about.values.innovation': 'الابتكار',
    'about.values.innovation.desc': 'نتبنى التكنولوجيا الجديدة وندفع الحدود بمسؤولية.',
    'about.values.structure': 'البنية',
    'about.values.structure.desc': 'كل ما نبنيه منظم وقابل للتكرار وقابل للتوسع.',
    'about.values.education': 'التعليم',
    'about.values.education.desc': 'نعلم قبل أن نبيع؛ المعرفة تغذي التمكين.',
    'about.values.impact': 'التأثير',
    'about.values.impact.desc': 'نهدف إلى تحويل سير العمل والأعمال والعقليات.',
    'about.values.integrity': 'النزاهة',
    'about.values.integrity.desc': 'هادئون وواثقون وشفافون في كل قرار.',
    
    // Resources
    'resources.title': 'موارد مجانية',
    'resources.subtitle': 'موارد بداية لاختبار الأتمتة واستخدام الذكاء الاصطناعي ببنية واضحة',
    'resources.prompts.title': 'مكتبة التعليمات',
    'resources.prompts.desc': '100+ تعليمات جاهزة للاستخدام للعملاء المحتملين والمحتوى والأتمتة',
    'resources.downloads.title': 'تنزيلات مجانية',
    'resources.downloads.desc': 'حزمة الأتمتة ومخطط محرك الوسائط الاجتماعية وأدلة البداية',
    'resources.templates.title': 'متجر القوالب',
    'resources.templates.desc': 'قريبًا: أنظمة جاهزة للمطاعم والصالات الرياضية وشركات الخدمات',
    
    // CTA
    'cta.title': 'هل أنت مستعد لأتمتة عملك؟',
    'cta.subtitle': 'احجز تدقيق أتمتة مجاني لمدة 20 دقيقة. سنريك ما يمكن أتمته في الـ 30 يومًا القادمة.',
    'cta.button': 'احجز تدقيق مجاني',
    'cta.email': 'أو راسلنا على',
    
    // Footer
    'footer.tagline': 'نظام، وليس فوضى.',
    'footer.rights': '© 2025 AutomateX. جميع الحقوق محفوظة.',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Update document direction and lang attribute
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

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
