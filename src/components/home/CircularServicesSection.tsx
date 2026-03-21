import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Scissors, Syringe, Sparkles, Zap, Droplets, Sun, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "زراعة الشعر",
    desc: "تقنيات FUE و DHI المتطورة لنتائج طبيعية ودائمة. نتميز بدقة الزراعة وكثافة لا مثيل لها مع فريق طبي خبير.",
    slug: "hair-transplant",
    image: "/images/service-hair.jpg",
    highlight: "أكثر من 5000 عملية ناجحة",
  },
  {
    icon: Scissors,
    title: "زراعة اللحية",
    desc: "استعادة لحية كثيفة وطبيعية المظهر. نصمم خط اللحية بما يتناسب مع ملامح وجهك لمظهر رجولي متكامل.",
    slug: "beard-transplant",
    image: "/images/before-after-beard-1.jpg",
    highlight: "تصميم مخصص لكل مريض",
  },
  {
    icon: Droplets,
    title: "حقن البلازما PRP",
    desc: "تحفيز نمو الشعر وتجديد البشرة باستخدام البلازما الغنية بالصفائح الدموية. علاج طبيعي وآمن بدون جراحة.",
    slug: "prp-hair-treatment",
    image: "/images/before-after-hair-1.jpg",
    highlight: "نتائج ملحوظة من أول جلسة",
  },
  {
    icon: Syringe,
    title: "البوتوكس",
    desc: "إزالة التجاعيد وخطوط التعبير بدقة متناهية. نستخدم أفضل المنتجات العالمية لنتائج طبيعية تدوم طويلاً.",
    slug: "botox",
    image: "/images/before-after-botox-1.jpg",
    highlight: "بدون فترة نقاهة",
  },
  {
    icon: Sparkles,
    title: "الفيلر",
    desc: "استعادة حجم الوجه ونحت الملامح بمواد آمنة ومعتمدة. نبرز جمالك الطبيعي بلمسات فنية دقيقة.",
    slug: "dermal-fillers",
    image: "/images/before-after-filler-1.jpg",
    highlight: "نتائج فورية ومذهلة",
  },
  {
    icon: Sun,
    title: "تجديد البشرة",
    desc: "علاجات متقدمة لبشرة مشرقة وشابة. من التقشير الكيميائي إلى الميزوثيرابي لتجديد شامل لبشرتك.",
    slug: "skin-rejuvenation",
    image: "/images/before-after-skin-1.jpg",
    highlight: "بشرة أصغر بـ 10 سنوات",
  },
  {
    icon: Zap,
    title: "علاجات الليزر",
    desc: "أحدث أجهزة الليزر لعلاج مشاكل البشرة والندبات وإزالة الشعر. تقنيات دقيقة وآمنة لجميع أنواع البشرة.",
    slug: "laser-treatments",
    image: "/images/before-after-laser-1.jpg",
    highlight: "أحدث أجهزة عالمية",
  },
  {
    icon: Sparkles,
    title: "العناية بالبشرة",
    desc: "جلسات عناية متخصصة تشمل التنظيف العميق والترطيب والتغذية. بروتوكولات مخصصة لكل نوع بشرة.",
    slug: "facial-treatments",
    image: "/images/before-after-skin-1.jpg",
    highlight: "بروتوكولات حصرية",
  },
];

const CircularServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = services.length;

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const activeService = services[activeIndex];

  // Calculate positions for orbital dots
  const getOrbitalPosition = (index: number) => {
    const angle = ((index - activeIndex) / total) * 360 - 90; // Start from top
    const rad = (angle * Math.PI) / 180;
    const radius = 42; // percentage
    const x = 50 + radius * Math.cos(rad);
    const y = 50 + radius * Math.sin(rad);
    return { x, y, angle };
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background" dir="rtl">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">خدماتنا المتميزة</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-[2.75rem] font-display font-bold text-foreground">
            اكتشف عالم <span className="text-gradient-blue">التميز</span>
          </h2>
          <motion.div
            className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-gold"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <p className="mt-5 text-muted-foreground text-[15px]">
            نقدم لك باقة متكاملة من أرقى الخدمات التجميلية والطبية بأيدي خبراء متخصصين
          </p>
        </motion.div>

        {/* Main circular layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Circular orbital display - LEFT side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[480px] aspect-square flex-shrink-0"
          >
            {/* Orbital rings */}
            <div className="absolute inset-[8%] rounded-full border border-border/30" />
            <div className="absolute inset-[15%] rounded-full border border-border/20 border-dashed" />
            
            {/* Rotating glow ring */}
            <motion.div
              className="absolute inset-[7%] rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent, hsl(210 75% 50% / 0.1), transparent, hsl(38 42% 60% / 0.08), transparent)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Center active card */}
            <div className="absolute inset-[20%] z-10">
              {/* Decorative ring around the center card */}
              <div className="absolute -inset-2 rounded-[1.25rem] border-2 border-primary/15 pointer-events-none" />
              <div className="absolute -inset-3.5 rounded-[1.5rem] border border-accent/10 pointer-events-none" />
              {/* Corner accents */}
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-accent/40 rounded-tr-lg pointer-events-none z-20" />
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-accent/40 rounded-tl-lg pointer-events-none z-20" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary/30 rounded-br-lg pointer-events-none z-20" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary/30 rounded-bl-lg pointer-events-none z-20" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  className="w-full h-full rounded-2xl overflow-hidden relative group"
                  style={{
                    boxShadow: '0 8px 40px hsl(210 75% 50% / 0.15), 0 2px 12px hsl(38 42% 60% / 0.1), inset 0 0 0 1px hsl(0 0% 100% / 0.1)',
                  }}
                >
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Soft vignette overlay */}
                  <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: 'inset 0 0 30px hsl(214 85% 10% / 0.3)' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-[11px] font-semibold mb-2">
                      <activeService.icon className="w-3 h-3" />
                      {activeService.highlight}
                    </div>
                    <h3 className="text-lg font-display font-bold text-card">{activeService.title}</h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Orbital service dots */}
            {services.map((service, i) => {
              const pos = getOrbitalPosition(i);
              const isActive = i === activeIndex;
              return (
                <motion.button
                  key={service.slug}
                  onClick={() => setActiveIndex(i)}
                  className={`absolute z-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? "w-14 h-14 bg-gradient-blue shadow-blue glow-primary"
                      : "w-10 h-10 bg-card border border-border/60 shadow-card hover:shadow-card-hover hover:border-primary/30"
                  }`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                  }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
                  whileHover={{ scale: 1.2 }}
                  title={service.title}
                >
                  <service.icon className={`transition-colors duration-300 ${isActive ? "w-5 h-5 text-primary-foreground" : "w-4 h-4 text-primary"}`} />
                </motion.button>
              );
            })}
          </motion.div>

          {/* Service details - RIGHT side */}
          <div className="flex-1 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-blue flex items-center justify-center shadow-blue">
                    <activeService.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">{activeService.title}</h3>
                    <span className="text-xs font-semibold text-accent">{activeService.highlight}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-[15px]">{activeService.desc}</p>

                {/* Progress indicator */}
                <div className="flex items-center gap-2">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === activeIndex ? "w-8 bg-gradient-blue" : "w-1.5 bg-border hover:bg-primary/30"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Link
                    to={`/services/${activeService.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-blue text-primary-foreground font-semibold text-sm shadow-blue hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5"
                  >
                    اعرف المزيد
                  </Link>
                  <Link
                    to="/book-appointment"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:border-primary/30 hover:shadow-card transition-all duration-300"
                  >
                    احجز الآن
                  </Link>
                </div>

                {/* Navigation arrows */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={goNext}
                    className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={goPrev}
                    className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <span className="text-xs text-muted-foreground mr-2">
                    {activeIndex + 1} / {total}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircularServicesSection;
