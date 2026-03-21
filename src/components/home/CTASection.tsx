import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, Stethoscope } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useI18n();

  return (
    <section ref={ref} className="py-28 bg-gradient-hero relative overflow-hidden noise">
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-0 start-1/4 w-96 h-96 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 end-1/4 w-96 h-96 rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }}
        animate={{ x: [0, -60, 0], y: [0, 40, 0], scale: [1.2, 1, 1.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Decorative lines */}
      <motion.div
        className="absolute top-1/3 start-0 w-full h-px opacity-[0.06]"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(0 0% 100%), transparent)' }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative container mx-auto px-4 text-center z-10"
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight"
          style={{ color: 'white' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          {t("cta.title1")} <span className="text-gradient-gold">{t("cta.title2")}</span> {t("cta.title3")}
        </motion.h2>
        <motion.div
          className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-gold"
          initial={{ width: 0 }}
          animate={isInView ? { width: 64 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        />
        <p className="mt-5 max-w-lg mx-auto text-[15px]" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>{t("cta.subtitle")}</p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
            <Button asChild size="lg" className="bg-gradient-blue hover:opacity-90 text-primary-foreground shadow-blue rounded-xl px-7 glow-primary">
              <Link to="/book-appointment"><CalendarDays className="w-4 h-4 me-2" />{t("hero.bookBtn")}</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
            <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 rounded-xl px-7">
              <Link to="/consultation"><Stethoscope className="w-4 h-4 me-2" />{t("hero.consultBtn")}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
