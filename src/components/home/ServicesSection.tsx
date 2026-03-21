import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Scissors, Syringe, Sparkles, Zap, Droplets, Sun, ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useI18n();

  const services = [
    { icon: Scissors, titleKey: "services.hairTransplant", descKey: "services.hairTransplantDesc", slug: "hair-transplant", image: "/images/service-hair.jpg" },
    { icon: Scissors, titleKey: "services.beardTransplant", descKey: "services.beardTransplantDesc", slug: "beard-transplant", image: "/images/before-after-beard-1.jpg" },
    { icon: Droplets, titleKey: "services.prp", descKey: "services.prpDesc", slug: "prp-hair-treatment", image: "/images/before-after-hair-1.jpg" },
    { icon: Syringe, titleKey: "services.botox", descKey: "services.botoxDesc", slug: "botox", image: "/images/before-after-botox-1.jpg" },
    { icon: Sparkles, titleKey: "services.fillers", descKey: "services.fillersDesc", slug: "dermal-fillers", image: "/images/before-after-filler-1.jpg" },
    { icon: Sun, titleKey: "services.skinRejuvenation", descKey: "services.skinRejuvenationDesc", slug: "skin-rejuvenation", image: "/images/before-after-skin-1.jpg" },
    { icon: Zap, titleKey: "services.laser", descKey: "services.laserDesc", slug: "laser-treatments", image: "/images/before-after-laser-1.jpg" },
    { icon: Sparkles, titleKey: "services.facial", descKey: "services.facialDesc", slug: "facial-treatments", image: "/images/new.jpg" },
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 -start-32 w-64 h-64 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} />
      <div className="absolute bottom-1/4 -end-32 w-64 h-64 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }} />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{t("services.tag")}</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-[2.75rem] font-display font-bold text-foreground">
            {t("services.title1")} <span className="text-gradient-blue">{t("services.title2")}</span>
          </h2>
          <motion.div
            className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-gold"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <p className="mt-5 text-muted-foreground text-[15px]">{t("services.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Link
                to={`/services/${service.slug}`}
                className="group block rounded-2xl bg-card border border-border/60 hover:shadow-elevated hover:border-primary/20 transition-all duration-400 h-full overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={service.image} alt={t(service.titleKey)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-5">
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center group-hover:bg-gradient-blue transition-all duration-300"
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                  >
                    <service.icon className="w-4.5 h-4.5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <h3 className="mt-4 font-display font-semibold text-foreground text-[15px] group-hover:text-primary transition-colors duration-300">{t(service.titleKey)}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t(service.descKey)}</p>
                  <div className="mt-4 flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 duration-300">
                    {t("services.learnMore")} <ArrowRight className="w-3.5 h-3.5 ms-1 rtl:rotate-180" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
