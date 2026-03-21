import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";

const AnimatedCounter = ({ value, isInView }: { value: string; isInView: boolean }) => {
  const numericMatch = value.match(/^([\d,]+)/);
  if (!numericMatch) return <span>{value}</span>;

  const target = parseInt(numericMatch[1].replace(/,/g, ""));
  const suffix = value.replace(numericMatch[1], "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span>{isInView ? count.toLocaleString() : "0"}{suffix}</span>;
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useI18n();

  const stats = [
    { value: "15,000+", label: t("stats.procedures") },
    { value: "15+", label: t("stats.experience") },
    { value: "40+", label: t("stats.countries") },
    { value: "98%", label: t("stats.satisfaction") },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-hero relative overflow-hidden noise">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      {/* Floating glow orbs */}
      <motion.div
        className="absolute top-1/2 start-1/4 w-48 h-48 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }}
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 end-1/4 w-48 h-48 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }}
        animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative container mx-auto px-4 lg:px-8 z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, type: "spring" }}
              whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
              className="text-center group relative"
            >
              <motion.p
                className="text-3xl md:text-5xl font-display font-bold"
                style={{ color: 'white' }}
              >
                <AnimatedCounter value={stat.value} isInView={isInView} />
              </motion.p>
              <motion.div
                className="mt-2 mx-auto h-0.5 bg-gradient-gold rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: 32 } : {}}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.7 }}
              />
              <p className="mt-3 text-xs font-medium tracking-wide" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
