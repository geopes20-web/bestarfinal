import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Scissors, Syringe, Sparkles, Zap, Droplets, Sun,
  ChevronLeft, ChevronRight
} from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "زراعة الشعر",
    desc: "نستخدم أحدث تقنيات FUE و DHI للحصول على نتائج طبيعية بكثافة عالية، مع تصميم خط شعر يناسب ملامحك ويمنحك مظهرًا دائمًا واحترافيًا.",
    slug: "hair-transplant",
    image: "/images/service-hair.jpg",
    highlight: "5000+ عملية ناجحة",
  },
  {
    icon: Scissors,
    title: "زراعة اللحية",
    desc: "استعادة كثافة اللحية بشكل طبيعي بالكامل مع تصميم مخصص يناسب شكل وجهك ويعطيك مظهرًا متناسقًا وجذابًا.",
    slug: "beard-transplant",
    image: "/images/before-after-beard-1.jpg",
    highlight: "تصميم مخصص",
  },
  {
    icon: Droplets,
    title: "حقن البلازما (PRP)",
    desc: "علاج طبيعي 100% يحفز نمو الشعر ويقوي البصيلات باستخدام عوامل النمو الموجودة في دمك للحصول على نتائج فعالة وآمنة.",
    slug: "prp-hair-treatment",
    image: "/images/before-after-hair-1.jpg",
    highlight: "نتائج سريعة",
  },
  {
    icon: Syringe,
    title: "البوتوكس",
    desc: "تقنية متطورة لإزالة التجاعيد والخطوط الدقيقة بدقة عالية مع الحفاظ على تعابير الوجه الطبيعية لمظهر أكثر شبابًا.",
    slug: "botox",
    image: "/images/before-after-botox-1.jpg",
    highlight: "بدون ألم",
  },
  {
    icon: Sparkles,
    title: "الفيلر",
    desc: "إعادة تحديد ملامح الوجه واستعادة الحجم المفقود باستخدام مواد آمنة تعطي نتائج فورية وطبيعية تدوم لفترات طويلة.",
    slug: "dermal-fillers",
    image: "/images/before-after-filler-1.jpg",
    highlight: "نتائج فورية",
  },
  {
    icon: Sun,
    title: "تجديد البشرة",
    desc: "مجموعة متكاملة من العلاجات لتحسين نضارة البشرة وتوحيد لونها وتقليل التجاعيد للحصول على مظهر صحي ومشرق.",
    slug: "skin-rejuvenation",
    image: "/images/before-after-skin-1.jpg",
    highlight: "نتائج مذهلة",
  },
  {
    icon: Zap,
    title: "علاجات الليزر",
    desc: "أحدث أجهزة الليزر لعلاج مشاكل البشرة وإزالة الشعر بدقة وأمان مع نتائج فعالة تناسب جميع أنواع البشرة.",
    slug: "laser-treatments",
    image: "/images/before-after-laser-1.jpg",
    highlight: "تقنيات حديثة",
  },
  {
    icon: Sparkles,
    title: "العناية بالبشرة",
    desc: "جلسات تنظيف عميق وترطيب احترافية باستخدام منتجات طبية لتحسين صحة البشرة ومنحها إشراقة فورية.",
    slug: "facial-treatments",
    image: "/images/before-after-skin-1.jpg",
    highlight: "بروتوكولات خاصة",
  },
];

const CircularServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const total = services.length;

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const activeService = services[activeIndex];

  const getOrbitalPosition = (index: number) => {
    const angle = ((index - activeIndex) / total) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    const radius = 42;
    return {
      x: 50 + radius * Math.cos(rad),
      y: 50 + radius * Math.sin(rad),
    };
  };

  const positions = useMemo(() => {
    return services.map((_, i) => getOrbitalPosition(i));
  }, [activeIndex]);

  return (
    <section className="py-24 relative overflow-hidden" dir="rtl">

      <div className="container mx-auto px-4">

        <div className="flex flex-col lg:flex-row items-center gap-14">

          {/* LEFT */}
          <div className="relative w-full max-w-[500px] aspect-square">

            <motion.div
              className="absolute inset-[7%] rounded-full blur-sm"
              style={{
                background: "conic-gradient(from 0deg, transparent, rgba(59,130,246,0.2), transparent)"
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: isMobile ? 0 : Infinity,
                ease: "linear"
              }}
            />

            {/* CENTER CARD */}
            <div className="absolute inset-[20%] z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 p-4 w-full text-center">
                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-2 inline-block">
                      {activeService.highlight}
                    </span>
                    <h3 className="text-white font-bold text-lg">{activeService.title}</h3>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* DOTS */}
            {services.map((service, i) => {
              const pos = positions[i];
              const isActive = i === activeIndex;

              return (
                <button
                  key={service.slug}
                  onClick={() => setActiveIndex(i)}
                  className={`absolute z-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "w-14 h-14 bg-blue-600 shadow-xl scale-110"
                      : "w-10 h-10 bg-white border border-gray-300 hover:bg-blue-50"
                  }`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <service.icon className={`${isActive ? "text-white w-5 h-5" : "text-blue-600 w-4 h-4"}`} />
                </button>
              );
            })}

          </div>

          {/* RIGHT */}
          <div className="flex-1 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold text-foreground">
                  {activeService.title}
                </h2>

                <p className="mt-5 text-muted-foreground leading-relaxed">
                  {activeService.desc}
                </p>

                <div className="flex gap-4 mt-8">

                  <Link
                    to={`/services/${activeService.slug}`}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:scale-105 transition"
                  >
                    اعرف المزيد
                  </Link>

                  <Link
                    to="/book-appointment"
                    className="px-6 py-3 rounded-xl border border-gray-300 text-foreground font-semibold hover:bg-gray-100 transition"
                  >
                    احجز الآن
                  </Link>

                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={goNext} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
                    <ChevronRight />
                  </button>
                  <button onClick={goPrev} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
                    <ChevronLeft />
                  </button>
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