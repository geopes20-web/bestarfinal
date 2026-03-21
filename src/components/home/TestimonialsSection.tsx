import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useI18n();

  const testimonials = [
    { nameKey: "testimonial.1.name", textKey: "testimonial.1.text", country: "UAE", rating: 5 },
    { nameKey: "testimonial.2.name", textKey: "testimonial.2.text", country: "UK", rating: 5 },
    { nameKey: "testimonial.3.name", textKey: "testimonial.3.text", country: "Italy", rating: 5 },
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative */}
      <motion.div
        className="absolute -top-20 end-0 w-80 h-80 rounded-full opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{t("testimonials.tag")}</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-[2.75rem] font-display font-bold text-foreground">
            {t("testimonials.title1")} <span className="text-gradient-blue">{t("testimonials.title2")}</span>
          </h2>
          <motion.div
            className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-gold"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.93 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, type: "spring" }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="bg-card rounded-2xl p-7 border border-border/60 shadow-card hover:shadow-elevated transition-all duration-300 relative group shimmer"
            >
              <motion.div
                className="absolute top-6 end-6"
                animate={isInView ? { rotate: [0, 12, 0] } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              >
                <Quote className="w-8 h-8 text-primary/8 group-hover:text-primary/25 transition-all duration-500" />
              </motion.div>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 + j * 0.06, type: "spring" }}
                  >
                    <Star className="w-4 h-4 fill-accent text-accent" />
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
  );
};

export default TestimonialsSection;
