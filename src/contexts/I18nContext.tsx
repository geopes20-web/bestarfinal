import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "ar";

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.beforeAfter": "Before & After",
    "nav.blog": "Blog",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact",
    "nav.bookAppointment": "Book Appointment",
    "nav.callUs": "Call Us",

    // Hero
    "hero.badge": "Premium Aesthetic Care",
    "hero.title1": "Welcome to",
    "hero.title2": "Bestar Clinic",
    "hero.subtitle": "Advanced Aesthetic & Hair Restoration Center — Where science meets beauty. We change your life.",
    "hero.bookBtn": "Book Appointment",
    "hero.consultBtn": "Free Consultation",

    // About
    "about.tag": "About Us",
    "about.title1": "Excellence in",
    "about.title2": "Aesthetic Medicine",
    "about.p1": "Bestar Clinic is a world-class aesthetic and hair restoration center equipped with the latest medical technologies. Our team of expert doctors delivers transformative results with precision, care, and artistry.",
    "about.p2": "With years of experience and thousands of successful procedures, we have earned the trust of patients from over 40 countries worldwide.",
    "about.certified": "Certified Experts",
    "about.safe": "Safe & Sterile",
    "about.patient": "Patient First",
    "about.yearsExp": "Years Experience",
    "about.internationalPatients": "International Patients",
    "about.internationalPatientsDesc": "VIP packages including airport transfers, accommodation, and translation.",
    "about.provenResults": "Proven Results",
    "about.provenResultsDesc": "98% patient satisfaction rate with thousands of success stories.",
    "about.expertTeam": "Expert Team",
    "about.expertTeamDesc": "Multidisciplinary team of surgeons, dermatologists, and aestheticians.",
    "about.certifiedDesc": "Board-certified doctors with years of specialized experience.",
    "about.safeDesc": "International safety standards and sterile operating environments.",
    "about.patientDesc": "Personalized treatment plans and 24/7 post-op support.",

    // Services
    "services.tag": "Our Services",
    "services.title1": "Premium",
    "services.title2": "Treatments",
    "services.subtitle": "Discover our comprehensive range of aesthetic and medical treatments designed to help you look and feel your best.",
    "services.learnMore": "Learn More",
    "services.hairTransplant": "Hair Transplant",
    "services.hairTransplantDesc": "Natural, permanent results with FUE/DHI techniques",
    "services.beardTransplant": "Beard Transplant",
    "services.beardTransplantDesc": "Full, natural-looking beard restoration",
    "services.prp": "PRP Treatment",
    "services.prpDesc": "Platelet-rich plasma for hair growth stimulation",
    "services.botox": "Botox",
    "services.botoxDesc": "Smooth fine lines and wrinkles naturally",
    "services.fillers": "Dermal Fillers",
    "services.fillersDesc": "Restore volume and enhance facial contours",
    "services.skinRejuvenation": "Skin Rejuvenation",
    "services.skinRejuvenationDesc": "Advanced treatments for youthful, glowing skin",
    "services.laser": "Laser Treatments",
    "services.laserDesc": "Precision laser for skin correction and renewal",
    "services.facial": "Facial Treatments",
    "services.facialDesc": "Customized facials for every skin type",
    "services.acne": "Acne Treatment",
    "services.acneDesc": "Medical-grade solutions to clear acne and prevent breakouts",
    "services.scar": "Scar Treatment",
    "services.scarDesc": "Reduce the appearance of scars with advanced procedures",
    "services.hair": "Hair",
    "services.aesthetics": "Aesthetics",
    "services.skin": "Skin",

    // Stats
    "stats.procedures": "Successful Procedures",
    "stats.experience": "Years of Experience",
    "stats.countries": "Countries Served",
    "stats.satisfaction": "Patient Satisfaction",

    // Testimonials
    "testimonials.tag": "Testimonials",
    "testimonials.title1": "What Our",
    "testimonials.title2": "Patients Say",

    // Blog
    "blog.tag": "Blog",
    "blog.title1": "Medical",
    "blog.title2": "Articles",
    "blog.viewAll": "View All",
    "blog.post1.title": "Everything You Need to Know About FUE Hair Transplant",
    "blog.post1.excerpt": "FUE is the gold standard for hair transplant procedures. Learn about the technique, recovery, and what to expect.",
    "blog.post2.title": "Botox vs Fillers: Which Is Right for You?",
    "blog.post2.excerpt": "Both treatments rejuvenate your appearance, but they work differently. Here's how to choose.",
    "blog.post3.title": "5 Tips for Faster Recovery After Hair Transplant",
    "blog.post3.excerpt": "Follow these expert-recommended tips to ensure the best results and fastest recovery.",
    "blog.post4.title": "The Science Behind PRP Hair Treatment",
    "blog.post4.excerpt": "Platelet-rich plasma therapy is revolutionizing hair loss treatment. Discover how it works.",
    "blog.post5.title": "Skin Rejuvenation: What Are Your Options?",
    "blog.post5.excerpt": "From chemical peels to laser treatments, explore the full range of skin rejuvenation options.",
    "blog.post6.title": "How to Choose the Right Clinic for Your Hair Transplant",
    "blog.post6.excerpt": "What to look for when selecting a clinic for your hair restoration procedure.",
    "blog.post7.title": "Mesotherapy: The Secret to Glowing, Hydrated Skin",
    "blog.post7.excerpt": "Discover how mesotherapy delivers vitamins and nutrients directly to your skin for an unmatched glow from within.",
    "blog.post8.title": "Understanding Hair Loss: Causes, Types, and Modern Solutions",
    "blog.post8.excerpt": "Hair loss affects millions worldwide. Learn about the different causes, how to identify your type, and the most effective modern treatments.",

    // CTA
    "cta.title1": "Ready to",
    "cta.title2": "Transform",
    "cta.title3": "Your Look?",
    "cta.subtitle": "Book your consultation today and take the first step toward the new you.",

    // Footer
    "footer.desc": "Advanced Aesthetic & Hair Restoration Center. We change your life with world-class medical expertise.",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.contactUs": "Contact Us",
    "footer.rights": "© 2025 Bestar Clinic. All rights reserved.",

    // Pages
    "page.about.title": "About",
    "page.about.bestar": "Bestar Clinic",
    "page.services.tag": "What We Offer",
    "page.services.title": "Our",
    "page.beforeAfter.tag": "Real Results",
    "page.beforeAfter.title1": "Before &",
    "page.beforeAfter.title2": "After",
    "page.beforeAfter.subtitle": "See real patient transformations from our clinic.",
    "page.beforeAfter.all": "All",
    "page.booking.tag": "Schedule a Visit",
    "page.booking.title1": "Book",
    "page.booking.title2": "Appointment",
    "page.consultation.tag": "Ask Our Doctor",
    "page.consultation.title1": "Medical",
    "page.consultation.title2": "Consultation",
    "page.consultation.subtitle": "Send your medical questions directly to our expert team. Free and confidential.",
    "page.contact.tag": "Get in Touch",
    "page.contact.title1": "Contact",
    "page.contact.title2": "Us",
    "page.blog.tag": "Knowledge Center",
    "page.blog.title1": "Medical",
    "page.blog.title2": "Articles",
    "page.testimonials.tag": "Patient Stories",
    "page.faq.title1": "Frequently Asked",
    "page.faq.title2": "Questions",

    // Before & After categories
    "ba.hairTransplant": "Hair Transplant",
    "ba.beardTransplant": "Beard Transplant",
    "ba.skin": "Skin",
    "ba.laser": "Laser",
    "ba.botox": "Botox",
    "ba.fillers": "Fillers",
    "ba.all": "All",

    // Before & After cases
    "ba.case1.procedure": "FUE Hair Transplant — 3500 Grafts",
    "ba.case1.desc": "Male pattern baldness, Norwood 4",
    "ba.case2.procedure": "Beard Transplant — 1200 Grafts",
    "ba.case2.desc": "Full beard restoration from patchy growth",
    "ba.case3.procedure": "Forehead & Crow's Feet Botox",
    "ba.case3.desc": "Dynamic wrinkle smoothing",
    "ba.case4.procedure": "Skin Rejuvenation Package",
    "ba.case4.desc": "Chemical peel + microneedling",
    "ba.case5.procedure": "Laser Scar Treatment",
    "ba.case5.desc": "Acne scar reduction — 3 sessions",
    "ba.case6.procedure": "Lip Enhancement with Dermal Fillers",
    "ba.case6.desc": "Natural volume restoration",

    // Testimonials page
    "testimonial.1.name": "Ahmed R.",
    "testimonial.1.text": "The hair transplant results exceeded my expectations. The team at Bestar Clinic is truly world-class. I look 10 years younger!",
    "testimonial.2.name": "Sarah M.",
    "testimonial.2.text": "I traveled from London for Botox and fillers. The results are so natural, my friends can't tell. Highly recommend!",
    "testimonial.3.name": "Marco L.",
    "testimonial.3.text": "Professional, clean, and the doctor was incredibly skilled. My beard transplant looks completely natural.",
    "testimonial.4.name": "Fatma K.",
    "testimonial.4.text": "The PRP treatment stopped my hair loss and I can see new growth after just 3 sessions. Amazing results!",
    "testimonial.5.name": "John D.",
    "testimonial.5.text": "The entire experience was first class. From airport pickup to the procedure and follow-up. Couldn't ask for more.",
    "testimonial.6.name": "Yasmin A.",
    "testimonial.6.text": "My skin looks incredible after the rejuvenation treatment. The staff made me feel so comfortable throughout.",

    // Contact page
    "contact.branches": "Our Branches",
    "contact.cairo": "Cairo Branch",
    "contact.cairo.address": "Nasr City, Medical Center 3, Abu Dawood Al-Zahiri St., Next to Al-Raya School, Clinic 348",
    "contact.cairo.phone": "01090402031 - 01121157508",
    "contact.sharqia": "Sharqia Branch",
    "contact.sharqia.address": "Zagazig, Al-Qawmia Square, Al-Haramain Tower 2, 2nd Floor",
    "contact.sharqia.phone": "01020152507 - 01020152503",
    "contact.email": "info@bestarclinic.com",
    "contact.hours": "Monday – Saturday: 9AM – 7PM",
    "contact.addressLabel": "Address",
    "contact.phoneLabel": "Phone",
    "contact.emailLabel": "Email",
    "contact.hoursLabel": "Hours",

    // Service Detail
    "sd.allServices": "All Services",
    "sd.aboutProcedure": "About This Procedure",
    "sd.benefits": "Benefits",
    "sd.idealCandidate": "Ideal Candidate",
    "sd.procedureSteps": "Procedure Steps",
    "sd.recovery": "Recovery",
    "sd.expectedResults": "Expected Results",
    "sd.risksSafety": "Risks & Safety",
    "sd.pricing": "Pricing",
    "sd.faq": "Frequently Asked Questions",
    "sd.readyToStart": "Ready to Get Started?",
    "sd.bookConsultation": "Book your consultation today.",
    "sd.askDoctor": "Ask Doctor",

    // FAQ
    "faq.q1": "What services does Bestar Clinic offer?",
    "faq.a1": "We offer hair transplant (FUE/DHI), beard transplant, PRP treatment, Botox, dermal fillers, skin rejuvenation, laser treatments, facial treatments, acne treatment, and scar treatment.",
    "faq.q2": "How do I book an appointment?",
    "faq.a2": "You can book online through our website, call us, or send a WhatsApp message. We'll confirm your appointment within 24 hours.",
    "faq.q3": "Do you accept international patients?",
    "faq.a3": "Yes! We welcome patients from all over the world and offer VIP packages including airport transfers, hotel accommodation, and translation services.",
    "faq.q4": "Is the consultation free?",
    "faq.a4": "Yes, initial consultations are completely free. You can send your questions and photos through our online consultation form.",
    "faq.q5": "How much does a hair transplant cost?",
    "faq.a5": "Pricing depends on the number of grafts needed. Starting from $2,500. Contact us for a personalized quote after evaluation.",
    "faq.q6": "What is the recovery time?",
    "faq.a6": "Recovery varies by procedure. Hair transplant: 3-5 days to return to work. Botox: no downtime. We provide detailed aftercare for every treatment.",
    "faq.q7": "Are results permanent?",
    "faq.a7": "Hair and beard transplants provide permanent results. Botox and fillers require maintenance sessions every 3-12 months.",
    "faq.q8": "Is the clinic accredited?",
    "faq.a8": "Yes, our clinic is fully accredited and meets international healthcare standards. All our doctors are board-certified specialists.",

    // Privacy & Terms
    "privacy.title1": "Privacy",
    "privacy.title2": "Policy",
    "terms.title1": "Terms &",
    "terms.title2": "Conditions",
    "privacy.lastUpdated": "Last updated: March 2025",
    "privacy.s1.title": "1. Information We Collect",
    "privacy.s1.text": "We collect personal information you provide when booking appointments, sending consultations, or contacting us. This includes your name, email, phone number, and medical information relevant to your treatment.",
    "privacy.s2.title": "2. How We Use Your Information",
    "privacy.s2.text": "Your information is used to provide medical services, manage appointments, communicate about treatments, and improve our services. We never share your medical information with third parties without your consent.",
    "privacy.s3.title": "3. Data Security",
    "privacy.s3.text": "We implement industry-standard security measures to protect your personal and medical data. All data transmissions are encrypted using SSL technology.",
    "privacy.s4.title": "4. Your Rights",
    "privacy.s4.text": "You have the right to access, correct, or delete your personal data at any time. Contact us at privacy@bestarclinic.com for any data-related requests.",
    "privacy.s5.title": "5. Cookies",
    "privacy.s5.text": "Our website uses cookies to improve user experience and analyze website traffic. You can manage your cookie preferences through your browser settings.",
    "privacy.s6.title": "6. Contact",
    "privacy.s6.text": "For privacy-related inquiries, please contact us at privacy@bestarclinic.com.",
    "terms.s1.title": "1. Services",
    "terms.s1.text": "Bestar Clinic provides aesthetic and medical treatments. All services are performed by licensed medical professionals. Treatment outcomes may vary between patients.",
    "terms.s2.title": "2. Appointments",
    "terms.s2.text": "Appointments are subject to availability. Cancellations must be made at least 24 hours in advance. Repeated no-shows may result in a booking restriction.",
    "terms.s3.title": "3. Medical Disclaimer",
    "terms.s3.text": "Information on this website is for educational purposes only and does not constitute medical advice. Always consult directly with our medical team regarding your specific condition.",
    "terms.s4.title": "4. Payment",
    "terms.s4.text": "Payment is due at the time of service unless a payment plan has been arranged. We accept various payment methods including credit cards and bank transfers.",
    "terms.s5.title": "5. Limitation of Liability",
    "terms.s5.text": "While we strive for the best results, Bestar Clinic cannot guarantee specific outcomes. All procedures carry inherent risks that will be discussed during your consultation.",
    "terms.s6.title": "6. Contact",
    "terms.s6.text": "For questions about these terms, contact us at legal@bestarclinic.com.",

    // Form labels
    "form.name": "Full Name",
    "form.phone": "Phone",
    "form.email": "Email",
    "form.service": "Service",
    "form.date": "Preferred Date",
    "form.time": "Preferred Time",
    "form.notes": "Notes",
    "form.subject": "Subject",
    "form.message": "Message",
    "form.question": "Your Question",
    "form.uploadPhotos": "Upload Photos (optional)",
    "form.submit": "Submit",
    "form.sending": "Sending...",
    "form.pickDate": "Pick a date",
    "form.selectService": "Select a service",
    "form.selectTime": "Select time",

    // Success
    "success.thankYou": "Thank You!",
    "success.appointmentSent": "Your appointment request has been submitted. We'll contact you within 24 hours to confirm.",
    "success.consultationSent": "Our doctor will review your case and respond within 24 hours.",
    "success.messageSent": "Message sent!",
  },
  ar: {
    // Navbar
    "nav.home": "الرئيسية",
    "nav.about": "عن العيادة",
    "nav.services": "الخدمات",
    "nav.beforeAfter": "قبل وبعد",
    "nav.blog": "المدونة",
    "nav.testimonials": "آراء المرضى",
    "nav.contact": "تواصل معنا",
    "nav.bookAppointment": "حجز موعد",
    "nav.callUs": "اتصل بنا",

    // Hero
    "hero.badge": "رعاية تجميلية متميزة",
    "hero.title1": "مرحباً بكم في",
    "hero.title2": "بيستار كلينك",
    "hero.subtitle": "مركز متقدم للتجميل وزراعة الشعر — حيث يلتقي العلم بالجمال. نحن نغير حياتك.",
    "hero.bookBtn": "حجز موعد",
    "hero.consultBtn": "استشارة مجانية",

    // About
    "about.tag": "عن العيادة",
    "about.title1": "التميز في",
    "about.title2": "الطب التجميلي",
    "about.p1": "بيستار كلينك هو مركز عالمي للتجميل وزراعة الشعر مجهز بأحدث التقنيات الطبية. يقدم فريقنا من الأطباء الخبراء نتائج تحويلية بدقة وعناية وفن.",
    "about.p2": "مع سنوات من الخبرة وآلاف العمليات الناجحة، اكتسبنا ثقة المرضى من أكثر من 40 دولة حول العالم.",
    "about.certified": "خبراء معتمدون",
    "about.safe": "آمن ومعقم",
    "about.patient": "المريض أولاً",
    "about.yearsExp": "سنوات خبرة",
    "about.internationalPatients": "مرضى دوليون",
    "about.internationalPatientsDesc": "باقات VIP تشمل النقل من المطار والإقامة والترجمة.",
    "about.provenResults": "نتائج مثبتة",
    "about.provenResultsDesc": "نسبة رضا 98% مع آلاف قصص النجاح.",
    "about.expertTeam": "فريق خبير",
    "about.expertTeamDesc": "فريق متعدد التخصصات من الجراحين وأطباء الجلدية وأخصائيي التجميل.",
    "about.certifiedDesc": "أطباء معتمدون بسنوات من الخبرة المتخصصة.",
    "about.safeDesc": "معايير سلامة دولية وبيئات تشغيل معقمة.",
    "about.patientDesc": "خطط علاج مخصصة ودعم ما بعد العملية على مدار الساعة.",

    // Services
    "services.tag": "خدماتنا",
    "services.title1": "علاجات",
    "services.title2": "متميزة",
    "services.subtitle": "اكتشف مجموعتنا الشاملة من العلاجات التجميلية والطبية المصممة لمساعدتك على الظهور والشعور بأفضل حال.",
    "services.learnMore": "اعرف المزيد",
    "services.hairTransplant": "زراعة الشعر",
    "services.hairTransplantDesc": "نتائج طبيعية ودائمة بتقنيات FUE/DHI",
    "services.beardTransplant": "زراعة اللحية",
    "services.beardTransplantDesc": "استعادة لحية كاملة وطبيعية المظهر",
    "services.prp": "علاج PRP",
    "services.prpDesc": "بلازما غنية بالصفائح الدموية لتحفيز نمو الشعر",
    "services.botox": "بوتكس",
    "services.botoxDesc": "تنعيم الخطوط الدقيقة والتجاعيد بشكل طبيعي",
    "services.fillers": "فيلر",
    "services.fillersDesc": "استعادة الحجم وتحسين ملامح الوجه",
    "services.skinRejuvenation": "تجديد البشرة",
    "services.skinRejuvenationDesc": "علاجات متقدمة لبشرة شابة ومتوهجة",
    "services.laser": "علاجات الليزر",
    "services.laserDesc": "ليزر دقيق لتصحيح وتجديد البشرة",
    "services.facial": "علاجات الوجه",
    "services.facialDesc": "علاجات وجه مخصصة لكل نوع بشرة",
    "services.acne": "علاج حب الشباب",
    "services.acneDesc": "حلول طبية لإزالة حب الشباب ومنع تكراره",
    "services.scar": "علاج الندبات",
    "services.scarDesc": "تقليل مظهر الندبات بإجراءات متقدمة",
    "services.hair": "شعر",
    "services.aesthetics": "تجميل",
    "services.skin": "بشرة",

    // Stats
    "stats.procedures": "عملية ناجحة",
    "stats.experience": "سنوات خبرة",
    "stats.countries": "دولة نخدمها",
    "stats.satisfaction": "رضا المرضى",

    // Testimonials
    "testimonials.tag": "آراء المرضى",
    "testimonials.title1": "ماذا يقول",
    "testimonials.title2": "مرضانا",

    // Blog
    "blog.tag": "المدونة",
    "blog.title1": "مقالات",
    "blog.title2": "طبية",
    "blog.viewAll": "عرض الكل",
    "blog.post1.title": "كل ما تحتاج معرفته عن زراعة الشعر بتقنية FUE",
    "blog.post1.excerpt": "تقنية FUE هي المعيار الذهبي لعمليات زراعة الشعر. تعرف على التقنية والتعافي وما يمكن توقعه.",
    "blog.post2.title": "البوتكس مقابل الفيلر: أيهما مناسب لك؟",
    "blog.post2.excerpt": "كلا العلاجين يجدد مظهرك، لكنهما يعملان بشكل مختلف. إليك كيفية الاختيار.",
    "blog.post3.title": "5 نصائح للتعافي السريع بعد زراعة الشعر",
    "blog.post3.excerpt": "اتبع هذه النصائح الموصى بها من الخبراء لضمان أفضل النتائج وأسرع تعافي.",
    "blog.post4.title": "العلم وراء علاج PRP للشعر",
    "blog.post4.excerpt": "علاج البلازما الغنية بالصفائح الدموية يحدث ثورة في علاج تساقط الشعر.",
    "blog.post5.title": "تجديد البشرة: ما هي خياراتك؟",
    "blog.post5.excerpt": "من التقشير الكيميائي إلى علاجات الليزر، استكشف النطاق الكامل لخيارات تجديد البشرة.",
    "blog.post6.title": "كيف تختار العيادة المناسبة لزراعة الشعر",
    "blog.post6.excerpt": "ما يجب البحث عنه عند اختيار عيادة لإجراء زراعة الشعر.",
    "blog.post7.title": "الميزوثيرابي: سر البشرة المتوهجة والمرطبة",
    "blog.post7.excerpt": "اكتشف كيف يوصل الميزوثيرابي الفيتامينات والعناصر الغذائية مباشرة لبشرتك لتوهج لا مثيل له من الداخل.",
    "blog.post8.title": "فهم تساقط الشعر: الأسباب والأنواع والحلول الحديثة",
    "blog.post8.excerpt": "تساقط الشعر يؤثر على الملايين. تعرف على الأسباب المختلفة وكيف تحدد نوعك وأكثر العلاجات الحديثة فعالية.",

    // CTA
    "cta.title1": "مستعد",
    "cta.title2": "لتحويل",
    "cta.title3": "مظهرك؟",
    "cta.subtitle": "احجز استشارتك اليوم واتخذ الخطوة الأولى نحو الأنت الجديد.",

    // Footer
    "footer.desc": "مركز متقدم للتجميل وزراعة الشعر. نغير حياتك بخبرة طبية عالمية.",
    "footer.quickLinks": "روابط سريعة",
    "footer.services": "الخدمات",
    "footer.contactUs": "تواصل معنا",
    "footer.rights": "© 2025 بيستار كلينك. جميع الحقوق محفوظة.",

    // Pages
    "page.about.title": "عن",
    "page.about.bestar": "بيستار كلينك",
    "page.services.tag": "ما نقدمه",
    "page.services.title": "خدماتنا",
    "page.beforeAfter.tag": "نتائج حقيقية",
    "page.beforeAfter.title1": "قبل",
    "page.beforeAfter.title2": "وبعد",
    "page.beforeAfter.subtitle": "شاهد التحولات الحقيقية لمرضانا.",
    "page.beforeAfter.all": "الكل",
    "page.booking.tag": "حدد موعد زيارتك",
    "page.booking.title1": "حجز",
    "page.booking.title2": "موعد",
    "page.consultation.tag": "اسأل طبيبنا",
    "page.consultation.title1": "استشارة",
    "page.consultation.title2": "طبية",
    "page.consultation.subtitle": "أرسل أسئلتك الطبية مباشرة إلى فريقنا. مجانية وسرية.",
    "page.contact.tag": "تواصل معنا",
    "page.contact.title1": "اتصل",
    "page.contact.title2": "بنا",
    "page.blog.tag": "مركز المعرفة",
    "page.blog.title1": "مقالات",
    "page.blog.title2": "طبية",
    "page.testimonials.tag": "قصص المرضى",
    "page.faq.title1": "الأسئلة",
    "page.faq.title2": "الشائعة",

    // Before & After
    "ba.hairTransplant": "زراعة الشعر",
    "ba.beardTransplant": "زراعة اللحية",
    "ba.skin": "بشرة",
    "ba.laser": "ليزر",
    "ba.botox": "بوتكس",
    "ba.fillers": "فيلر",
    "ba.all": "الكل",
    "ba.case1.procedure": "زراعة شعر FUE — 3500 بصيلة",
    "ba.case1.desc": "صلع وراثي، نوروود 4",
    "ba.case2.procedure": "زراعة لحية — 1200 بصيلة",
    "ba.case2.desc": "استعادة لحية كاملة من نمو متقطع",
    "ba.case3.procedure": "بوتكس الجبين وحول العينين",
    "ba.case3.desc": "تنعيم التجاعيد الحركية",
    "ba.case4.procedure": "باقة تجديد البشرة",
    "ba.case4.desc": "تقشير كيميائي + ميكرونيدلينج",
    "ba.case5.procedure": "علاج ندبات بالليزر",
    "ba.case5.desc": "تقليل ندبات حب الشباب — 3 جلسات",
    "ba.case6.procedure": "تكبير الشفاه بالفيلر",
    "ba.case6.desc": "استعادة حجم طبيعي",

    // Testimonials page
    // Testimonials page
"testimonial.1.name": "محمد عبد الله",
"testimonial.1.text": "عملت زراعة شعر في بيستار كلينك والنتيجة كانت ممتازة بصراحة. الفريق كان محترف جدًا وكل خطوة كانت واضحة بالنسبة لي.",

"testimonial.2.name": "أحمد حسن",
"testimonial.2.text": "كنت متردد في البداية لكن التجربة كانت مريحة جدًا. العملية تمت بدون ألم تقريبًا والنتيجة طبيعية جدًا.",

"testimonial.3.name": "محمود سامي",
"testimonial.3.text": "عملت زراعة لحية والنتيجة فرقت معايا جدًا في الشكل. الدكتور كان شاطر جدًا والمتابعة بعد العملية كانت ممتازة.",

"testimonial.4.name": "مي أحمد",
"testimonial.4.text": "جربت جلسات PRP للشعر وفعلاً لاحظت فرق بعد كام جلسة. التعامل في العيادة محترم جدًا.",

"testimonial.5.name": "كريم عبد الرحمن",
"testimonial.5.text": "العيادة منظمة جدًا وكل حاجة كانت واضحة من أول الاستشارة لحد العملية. النتائج مرضية جدًا بالنسبة لي.",

"testimonial.6.name": "سارة محمود",
"testimonial.6.text": "عملت جلسات تجديد بشرة وكانت تجربة كويسة جدًا. بشرتي اتحسنت بشكل واضح والدكاترة كانوا متعاونين جدًا.",

    // Contact
    "contact.branches": "فروعنا",
    "contact.cairo": "فرع القاهرة",
    "contact.cairo.address": "مدينة نصر، ميديكال سنتر 3، ش أبو داوود الظاهري، بجوار مدرسة الراية، عيادة 348",
    "contact.cairo.phone": "01090402031 - 01121157508",
    "contact.sharqia": "فرع الشرقية",
    "contact.sharqia.address": "الزقازيق، ميدان القومية، برج الحرمين 2، الدور التاني",
    "contact.sharqia.phone": "01020152507 - 01020152503",
    "contact.email": "info@bestarclinic.com",
    "contact.hours": "السبت – الخميس: 9 صباحاً – 7 مساءً",
    "contact.addressLabel": "العنوان",
    "contact.phoneLabel": "الهاتف",
    "contact.emailLabel": "البريد الإلكتروني",
    "contact.hoursLabel": "ساعات العمل",

    // Service Detail
    "sd.allServices": "جميع الخدمات",
    "sd.aboutProcedure": "عن هذا الإجراء",
    "sd.benefits": "الفوائد",
    "sd.idealCandidate": "المرشح المثالي",
    "sd.procedureSteps": "خطوات الإجراء",
    "sd.recovery": "التعافي",
    "sd.expectedResults": "النتائج المتوقعة",
    "sd.risksSafety": "المخاطر والسلامة",
    "sd.pricing": "الأسعار",
    "sd.faq": "الأسئلة الشائعة",
    "sd.readyToStart": "مستعد للبدء؟",
    "sd.bookConsultation": "احجز استشارتك اليوم.",
    "sd.askDoctor": "اسأل الطبيب",

    // FAQ
    "faq.q1": "ما الخدمات التي تقدمها بيستار كلينك؟",
    "faq.a1": "نقدم زراعة الشعر (FUE/DHI)، زراعة اللحية، علاج PRP، البوتكس، الفيلر، تجديد البشرة، علاجات الليزر، علاجات الوجه، علاج حب الشباب، وعلاج الندبات.",
    "faq.q2": "كيف أحجز موعداً؟",
    "faq.a2": "يمكنك الحجز عبر الإنترنت من خلال موقعنا، الاتصال بنا، أو إرسال رسالة واتساب. سنؤكد موعدك خلال 24 ساعة.",
    "faq.q3": "هل تقبلون المرضى الدوليين؟",
    "faq.a3": "نعم! نرحب بالمرضى من جميع أنحاء العالم ونقدم باقات VIP تشمل النقل من المطار والإقامة في الفندق وخدمات الترجمة.",
    "faq.q4": "هل الاستشارة مجانية؟",
    "faq.a4": "نعم، الاستشارات الأولية مجانية تماماً. يمكنك إرسال أسئلتك وصورك من خلال نموذج الاستشارة عبر الإنترنت.",
    "faq.q5": "كم تكلفة زراعة الشعر؟",
    "faq.a5": "يعتمد السعر على عدد البصيلات المطلوبة. . اتصل بنا للحصول على عرض سعر مخصص بعد التقييم.",
    "faq.q6": "ما هي فترة التعافي؟",
    "faq.a6": "يختلف التعافي حسب الإجراء. زراعة الشعر: 3-5 أيام للعودة للعمل. البوتكس: بدون فترة توقف. نقدم تعليمات رعاية مفصلة لكل علاج.",
    "faq.q7": "هل النتائج دائمة؟",
    "faq.a7": "زراعة الشعر واللحية تقدم نتائج دائمة. البوتكس والفيلر يحتاجان جلسات صيانة كل 3-12 شهراً.",
    "faq.q8": "هل العيادة معتمدة؟",
    "faq.a8": "نعم، عيادتنا معتمدة بالكامل وتلبي معايير الرعاية الصحية الدولية. جميع أطبائنا متخصصون معتمدون.",

    // Privacy & Terms
    "privacy.title1": "سياسة",
    "privacy.title2": "الخصوصية",
    "terms.title1": "الشروط",
    "terms.title2": "والأحكام",
    "privacy.lastUpdated": "آخر تحديث: مارس 2025",
    "privacy.s1.title": "1. المعلومات التي نجمعها",
    "privacy.s1.text": "نجمع المعلومات الشخصية التي تقدمها عند حجز المواعيد أو إرسال الاستشارات أو التواصل معنا. تشمل اسمك وبريدك الإلكتروني ورقم هاتفك والمعلومات الطبية ذات الصلة بعلاجك.",
    "privacy.s2.title": "2. كيف نستخدم معلوماتك",
    "privacy.s2.text": "تُستخدم معلوماتك لتقديم الخدمات الطبية وإدارة المواعيد والتواصل بشأن العلاجات وتحسين خدماتنا. لا نشارك معلوماتك الطبية مع أطراف ثالثة بدون موافقتك.",
    "privacy.s3.title": "3. أمان البيانات",
    "privacy.s3.text": "نطبق إجراءات أمان معيارية لحماية بياناتك الشخصية والطبية. جميع عمليات نقل البيانات مشفرة باستخدام تقنية SSL.",
    "privacy.s4.title": "4. حقوقك",
    "privacy.s4.text": "لديك الحق في الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت. تواصل معنا على privacy@bestarclinic.com لأي طلبات متعلقة بالبيانات.",
    "privacy.s5.title": "5. ملفات تعريف الارتباط",
    "privacy.s5.text": "يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل حركة الموقع. يمكنك إدارة تفضيلات ملفات تعريف الارتباط من خلال إعدادات المتصفح.",
    "privacy.s6.title": "6. التواصل",
    "privacy.s6.text": "للاستفسارات المتعلقة بالخصوصية، يرجى التواصل معنا على privacy@bestarclinic.com.",
    "terms.s1.title": "1. الخدمات",
    "terms.s1.text": "تقدم بيستار كلينك علاجات تجميلية وطبية. يتم تنفيذ جميع الخدمات من قبل متخصصين طبيين مرخصين. قد تختلف نتائج العلاج بين المرضى.",
    "terms.s2.title": "2. المواعيد",
    "terms.s2.text": "المواعيد تخضع للتوفر. يجب إجراء الإلغاء قبل 24 ساعة على الأقل. قد يؤدي عدم الحضور المتكرر إلى تقييد الحجز.",
    "terms.s3.title": "3. إخلاء المسؤولية الطبية",
    "terms.s3.text": "المعلومات على هذا الموقع لأغراض تعليمية فقط ولا تشكل نصيحة طبية. استشر فريقنا الطبي مباشرة بخصوص حالتك المحددة.",
    "terms.s4.title": "4. الدفع",
    "terms.s4.text": "الدفع مستحق عند تقديم الخدمة ما لم يتم ترتيب خطة دفع. نقبل طرق دفع متنوعة بما في ذلك بطاقات الائتمان والتحويلات البنكية.",
    "terms.s5.title": "5. حدود المسؤولية",
    "terms.s5.text": "بينما نسعى لأفضل النتائج، لا يمكن لبيستار كلينك ضمان نتائج محددة. جميع الإجراءات تحمل مخاطر متأصلة ستتم مناقشتها خلال استشارتك.",
    "terms.s6.title": "6. التواصل",
    "terms.s6.text": "لأسئلة حول هذه الشروط، تواصل معنا على legal@bestarclinic.com.",

    // Form labels
    "form.name": "الاسم الكامل",
    "form.phone": "الهاتف",
    "form.email": "البريد الإلكتروني",
    "form.service": "الخدمة",
    "form.date": "التاريخ المفضل",
    "form.time": "الوقت المفضل",
    "form.notes": "ملاحظات",
    "form.subject": "الموضوع",
    "form.message": "الرسالة",
    "form.question": "سؤالك",
    "form.uploadPhotos": "رفع صور (اختياري)",
    "form.submit": "إرسال",
    "form.sending": "جاري الإرسال...",
    "form.pickDate": "اختر تاريخ",
    "form.selectService": "اختر خدمة",
    "form.selectTime": "اختر الوقت",

    // Success
    "success.thankYou": "شكراً لك!",
    "success.appointmentSent": "تم إرسال طلب الموعد. سنتواصل معك خلال 24 ساعة للتأكيد.",
    "success.consultationSent": "سيراجع طبيبنا حالتك ويرد خلال 24 ساعة.",
    "success.messageSent": "تم إرسال الرسالة!",
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

  export const I18nProvider = ({ children }: { children: ReactNode }) => {
      const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("bestar-lang");
    return (saved === "en" ? "en" : "ar") as Lang;
  });
    

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("bestar-lang", l);
  };

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  const t = (key: string): string => {
    return translations[lang][key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
