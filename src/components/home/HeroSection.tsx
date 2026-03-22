import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarDays, Stethoscope, Award, Shield, Star } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { useEffect, useState, useRef } from "react";

// Animated counter component
const AnimatedCounter = ({ target, suffix = "" }: { target: string; suffix?: string }) => {
  const num = parseInt(target.replace(/[^0-9]/g, ""));
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, num]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const HeroSection = () => {
  const { t } = useI18n();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return; // ❗ وقف التأثير على الموبايل

    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [isMobile]);

  const trustBadges = [
    { icon: Award, label: t("stats.procedures"), value: "15K", suffix: "+" },
    { icon: Star, label: t("stats.satisfaction"), value: "98", suffix: "%" },
    { icon: Shield, label: t("stats.countries"), value: "40", suffix: "+" },
  ];

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">

      {/* === BACKGROUND LAYER === */}
      <div className="absolute inset-0">

        <motion.img
          src="/images/hero.jpg"
          alt="Bestar Clinic"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async" // ✅ تحسين
          initial={{ scale: 1, filter: "brightness(2) saturate(1.5)" }}
          animate={{
            scale: 1,
            filter: "brightness(1) saturate(1.1)",
          }}
          transition={{ duration: 8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transform: isMobile
              ? "none"
              : `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)`,
            willChange: "transform", // ✅ تحسين GPU
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 200px 60px hsl(214 85% 5% / 0.7)",
          }}
        />

        <motion.div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(0 0% 100% / 0.05) 2px, hsl(0 0% 100% / 0.05) 4px)",
          }}
          animate={{ backgroundPosition: ["0px 0px", "0px 100px"] }}
          transition={{
            duration: 8,
            repeat: isMobile ? 0 : Infinity, // ✅ تقليل الحمل
            ease: "linear"
          }}
        />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, hsl(210 75% 50% / 0.08), transparent 60%)",
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 6,
            repeat: isMobile ? 0 : Infinity // ✅ تقليل الحمل
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(214,85%,5%)]/98 via-[hsl(214,75%,8%)]/85 to-[hsl(214,65%,12%)]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(214,85%,5%)]/70 via-transparent to-[hsl(214,85%,5%)]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(214,85%,5%)]/90" />

      </div>

      {/* === CONTENT === */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-24">
        <div className="max-w-2xl">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold leading-[1.3] tracking-wide text-gold-200 drop-shadow-[0_0_15px_rgba(255,215,0,0.2)]"
          >
            {t("hero.title1")} <br />
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              {t("hero.title2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 text-white/70 leading-[1.9]"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-10 flex gap-5"
          >
            <Button asChild>
              <Link to="/book-appointment">
                <CalendarDays className="w-4 h-4 me-2" />
                {t("hero.bookBtn")}
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link to="/consultation">
                <Stethoscope className="w-4 h-4 me-2" />
                {t("hero.consultBtn")}
              </Link>
            </Button>
          </motion.div>

        </div>
      </div>

      {/* زر ثابت */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 sm:bottom-6 left-.1/2 -translate-x-1/2 z-30 w-full flex justify-center px-3"
      >
        <Link to="/cononline" className="w-full flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0px rgba(101, 150, 228, 0.4)",
                "0 0 25px rgba(133, 151, 181, 0.9)",
                "0 0 0px rgba(59,130,246,0.4)"
              ]
            }}
            transition={{
              duration: 2.2,
              repeat: isMobile ? 0 : Infinity // ✅
            }}
            className="
              w-[85%] sm:w-auto
              max-w-[220px] sm:max-w-xs
              bg-gradient-to-r from-yellow-400 to-blue-400
              text-white
              px-4 sm:px-8
              py-2 sm:py-4
              rounded-lg sm:rounded-2xl
              font-medium sm:font-bold
              text-xs sm:text-lg
              shadow-xl
              backdrop-blur
            "
          >
            🎥 Zoom with doctor
          </motion.button>
        </Link>
      </motion.div>

    </section>
  );
};

export default HeroSection;