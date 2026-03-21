import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const Testimonials = () => {
  const { t } = useI18n();

  const testimonials = [
    { nameKey: "testimonial.1.name", textKey: "testimonial.1.text", country: "UAE", service: t("services.hairTransplant"), rating: 5 },
    { nameKey: "testimonial.2.name", textKey: "testimonial.2.text", country: "UK", service: t("services.botox") + " & " + t("services.fillers"), rating: 5 },
    { nameKey: "testimonial.3.name", textKey: "testimonial.3.text", country: "Italy", service: t("services.beardTransplant"), rating: 5 },
    { nameKey: "testimonial.4.name", textKey: "testimonial.4.text", country: "Kuwait", service: t("services.prp"), rating: 5 },
    { nameKey: "testimonial.5.name", textKey: "testimonial.5.text", country: "USA", service: t("services.hairTransplant"), rating: 5 },
    { nameKey: "testimonial.6.name", textKey: "testimonial.6.text", country: "Saudi Arabia", service: t("services.skinRejuvenation"), rating: 5 },
  ];

  return (
    <div className="pt-[72px]">
      <section className="py-20 lg:py-28 bg-gradient-hero text-center relative overflow-hidden noise">
        <motion.div className="absolute top-1/2 start-1/3 w-72 h-72 rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 end-1/4 w-56 h-56 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }} animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{t("page.testimonials.tag")}</span>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-display font-bold" style={{ color: 'white' }}>
              {t("testimonials.title1")} <span className="text-gradient-gold">{t("testimonials.title2")}</span>
            </h1>
            <motion.div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-gold" initial={{ width: 0 }} animate={{ width: 64 }} transition={{ delay: 0.4, duration: 0.6 }} />
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                className="bg-card rounded-2xl p-7 border border-border/60 shadow-card hover:shadow-elevated transition-all duration-300 relative group shimmer"
              >
                <motion.div className="absolute top-6 end-6" animate={{ rotate: [0, 10, 0] }} transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}>
                  <Quote className="w-8 h-8 text-primary/8 group-hover:text-primary/25 transition-all duration-500" />
                </motion.div>
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-primary">{item.service}</span>
                <div className="flex gap-0.5 mt-3 mb-4">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <motion.div key={j} initial={{ opacity: 0, scale: 0, rotate: -180 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.3 + i * 0.05 + j * 0.05, type: "spring" }}>
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed text-[15px] italic">"{t(item.textKey)}"</p>
                <div className="mt-6 pt-5 border-t border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-blue flex items-center justify-center text-primary-foreground text-xs font-bold">
                      {t(item.nameKey).charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{t(item.nameKey)}</p>
                      <p className="text-xs text-muted-foreground">{item.country}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
