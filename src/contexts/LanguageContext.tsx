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
    // Pricing (AutomateX / Systems & Tools)
    'pricing.ax.starter.title': 'Starter System',
    'pricing.ax.starter.price': '250 LYD',
    'pricing.ax.starter.priceAlt': 'Monthly',
    'pricing.ax.starter.desc': 'Ideal for testing automation on a single channel',
    'pricing.ax.starter.feat1': 'Basic AI chatbot',
    'pricing.ax.starter.feat2': 'FAQ replies',
    'pricing.ax.starter.feat3': 'Lead capture',

    'pricing.ax.growth.title': 'Growth System',
    'pricing.ax.growth.price': '450 LYD',
    'pricing.ax.growth.priceAlt': 'Monthly',
    'pricing.ax.growth.desc': 'Best for restaurants, gyms, clinics and local brands',
    'pricing.ax.growth.feat1': 'Full chatbot + flows',
    'pricing.ax.growth.feat2': 'Basic CRM & tagging',
    'pricing.ax.growth.feat3': 'Simple bookings or orders',
    'pricing.ax.growth.feat4': 'Light analytics',

    'pricing.ax.scale.title': 'Scale System',
    'pricing.ax.scale.price': '800 LYD',
    'pricing.ax.scale.priceAlt': 'Monthly',
    'pricing.ax.scale.desc': 'For serious operations that want a full AI-powered engine',
    'pricing.ax.scale.feat1': 'Full automation system',
    'pricing.ax.scale.feat2': 'Advanced tracking & reports',
    'pricing.ax.scale.feat3': 'Comment → DM → sale funnels',
    'pricing.ax.scale.feat4': 'Priority support',

    // Pricing (AX Media / SMM)
    'pricing.media.starter.title': 'Content Starter',
    'pricing.media.starter.price': '350 LYD',
    'pricing.media.starter.priceAlt': 'Monthly',
    'pricing.media.starter.desc': 'Essential social media presence',
    'pricing.media.starter.feat1': '8 Posts per month',
    'pricing.media.starter.feat2': 'Basic graphic design',
    'pricing.media.starter.feat3': '1 Platform management',

    'pricing.media.growth.title': 'Media Pro',
    'pricing.media.growth.price': '700 LYD',
    'pricing.media.growth.priceAlt': 'Monthly',
    'pricing.media.growth.desc': 'Comprehensive content and video strategy',
    'pricing.media.growth.feat1': '15 Posts + 4 Reels',
    'pricing.media.growth.feat2': 'Professional video editing',
    'pricing.media.growth.feat3': '2 Platforms management',
    'pricing.media.growth.feat4': 'Monthly performance report',

    'pricing.media.scale.title': 'Agency Pipeline',
    'pricing.media.scale.price': '1200 LYD',
    'pricing.media.scale.priceAlt': 'Monthly',
    'pricing.media.scale.desc': 'Full-scale marketing engine',
    'pricing.media.scale.feat1': 'Daily content + 8 Reels',
    'pricing.media.scale.feat2': 'Ad campaign management',
    'pricing.media.scale.feat3': 'Content strategy consulting',
    'pricing.media.scale.feat4': 'All platforms covered',

    // Pricing (AX Training)
    'pricing.training.starter.title': 'Crash Course',
    'pricing.training.starter.price': '150 LYD',
    'pricing.training.starter.priceAlt': 'One-time',
    'pricing.training.starter.desc': 'Introduction to AI and Automation',
    'pricing.training.starter.feat1': '3-hour intensive session',
    'pricing.training.starter.feat2': 'Basic AI tools overview',
    'pricing.training.starter.feat3': 'Certificate of completion',

    'pricing.training.growth.title': 'Pro Workshop',
    'pricing.training.growth.price': '400 LYD',
    'pricing.training.growth.priceAlt': 'One-time',
    'pricing.training.growth.desc': 'Deep dive into building your own systems',
    'pricing.training.growth.feat1': '2-day workshop',
    'pricing.training.growth.feat2': 'Build a chatbot live',
    'pricing.training.growth.feat3': 'Access to resource portal',
    'pricing.training.growth.feat4': '1-on-1 Q&A session',

    'pricing.training.scale.title': 'Corporate Training',
    'pricing.training.scale.price': 'Custom',
    'pricing.training.scale.priceAlt': 'Per Team',
    'pricing.training.scale.desc': 'Transform your entire team’s workflow',
    'pricing.training.scale.feat1': 'Customized curriculum',
    'pricing.training.scale.feat2': 'On-site training available',
    'pricing.training.scale.feat3': 'Company-wide system audits',
    'pricing.training.scale.feat4': 'Post-training support',

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
    // Pricing (AutomateX / Systems & Tools)
    'pricing.ax.starter.title': 'نظام البداية',
    'pricing.ax.starter.price': '250 دينار ליבי',
    'pricing.ax.starter.priceAlt': 'شهرياً',
    'pricing.ax.starter.desc': 'مثالي لاختبار الأتمتة على قناة واحدة',
    'pricing.ax.starter.feat1': 'روبوت محادثة ذكي أساسي',
    'pricing.ax.starter.feat2': 'ردود الأسئلة الشائعة',
    'pricing.ax.starter.feat3': 'التقاط العملاء المحتملين',

    'pricing.ax.growth.title': 'نظام النمو',
    'pricing.ax.growth.price': '450 دينار ליבי',
    'pricing.ax.growth.priceAlt': 'شهرياً',
    'pricing.ax.growth.desc': 'الأفضل للمطاعم والصالات الرياضية والعيادات',
    'pricing.ax.growth.feat1': 'روبوت محادثة كامل + تدفقات',
    'pricing.ax.growth.feat2': 'إدارة علاقات العملاء الأساسية',
    'pricing.ax.growth.feat3': 'حجوزات أو طلبات بسيطة',
    'pricing.ax.growth.feat4': 'تحليلات خفيفة',

    'pricing.ax.scale.title': 'نظام التوسع',
    'pricing.ax.scale.price': '800 دينار ליבי',
    'pricing.ax.scale.priceAlt': 'شهرياً',
    'pricing.ax.scale.desc': 'للعمليات الجادة التي تريد محركًا كاملاً',
    'pricing.ax.scale.feat1': 'نظام أتمتة كامل',
    'pricing.ax.scale.feat2': 'تتبع وتقارير متقدمة',
    'pricing.ax.scale.feat3': 'تعليق → رسالة مباشرة → قمع مبيعات',
    'pricing.ax.scale.feat4': 'دعم ذو أولوية',

    // Pricing (AX Media / SMM)
    'pricing.media.starter.title': 'بداية المحتوى',
    'pricing.media.starter.price': '350 دينار ליבי',
    'pricing.media.starter.priceAlt': 'شهرياً',
    'pricing.media.starter.desc': 'التواجد الأساسي على وسائل التواصل',
    'pricing.media.starter.feat1': '8 منشورات شهرياً',
    'pricing.media.starter.feat2': 'تصميم جرافيك أساسي',
    'pricing.media.starter.feat3': 'إدارة منصة واحدة',

    'pricing.media.growth.title': 'ميديا برو',
    'pricing.media.growth.price': '700 دينار ליבי',
    'pricing.media.growth.priceAlt': 'شهرياً',
    'pricing.media.growth.desc': 'استراتيجية شاملة للمحتوى والفيديو',
    'pricing.media.growth.feat1': '15 منشوراً + 4 مقاطع ريلز',
    'pricing.media.growth.feat2': 'تحرير فيديو احترافي',
    'pricing.media.growth.feat3': 'إدارة منصتين',
    'pricing.media.growth.feat4': 'تقرير أداء شهري',

    'pricing.media.scale.title': 'حزمة الوكالة',
    'pricing.media.scale.price': '1200 دينار ליבי',
    'pricing.media.scale.priceAlt': 'شهرياً',
    'pricing.media.scale.desc': 'محرك تسويق متكامل',
    'pricing.media.scale.feat1': 'محتوى يومي + 8 مقاطع ريلز',
    'pricing.media.scale.feat2': 'إدارة الحملات الإعلانية',
    'pricing.media.scale.feat3': 'استشارات استراتيجية المحتوى',
    'pricing.media.scale.feat4': 'تغطية جميع المنصات',

    // Pricing (AX Training)
    'pricing.training.starter.title': 'دورة مكثفة',
    'pricing.training.starter.price': '150 دينار ליבי',
    'pricing.training.starter.priceAlt': 'مرة واحدة',
    'pricing.training.starter.desc': 'مقدمة في الذكاء الاصطناعي والأتمتة',
    'pricing.training.starter.feat1': 'جلسة مكثفة لمدة 3 ساعات',
    'pricing.training.starter.feat2': 'نظرة عامة على أدوات الذكاء الاصطناعي',
    'pricing.training.starter.feat3': 'شهادة إتمام',

    'pricing.training.growth.title': 'ورشة عمل احترافية',
    'pricing.training.growth.price': '400 دينار ליבי',
    'pricing.training.growth.priceAlt': 'مرة واحدة',
    'pricing.training.growth.desc': 'التعمق في بناء أنظمتك الخاصة',
    'pricing.training.growth.feat1': 'ورشة عمل لمدة يومين',
    'pricing.training.growth.feat2': 'بناء روبوت محادثة بشكل حي',
    'pricing.training.growth.feat3': 'الوصول إلى بوابة الموارد',
    'pricing.training.growth.feat4': 'جلسة أسئلة وأجوبة 1 لـ 1',

    'pricing.training.scale.title': 'تدريب الشركات',
    'pricing.training.scale.price': 'مخصص',
    'pricing.training.scale.priceAlt': 'لكل فريق',
    'pricing.training.scale.desc': 'تحويل سير عمل فريقك بأكمله',
    'pricing.training.scale.feat1': 'منهج مخصص',
    'pricing.training.scale.feat2': 'التدريب في موقع العمل متاح',
    'pricing.training.scale.feat3': 'عمليات تدقيق للأنظمة على مستوى الشركة',
    'pricing.training.scale.feat4': 'دعم ما بعد التدريب',

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
  const [language, setLanguage] = useState<Language>(() => {
    try { const saved = localStorage.getItem('ax:lang'); if (saved === 'ar' || saved === 'en') return saved as Language; } catch (e) { }
    return (navigator.language || (navigator as any).userLanguage || 'en').startsWith('ar') ? 'ar' : 'en';
  });

  useEffect(() => {
    // Update document direction and lang attribute
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    try { localStorage.setItem('ax:lang', language); } catch (e) { }
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
