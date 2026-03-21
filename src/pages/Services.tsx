import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scissors, Syringe, Sparkles, Zap, Droplets, Sun, ShieldCheck, Flower2, ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const Services = () => {
  const { t } = useI18n();

  const services = [
    { icon: Scissors, titleKey: "services.hairTransplant", descKey: "services.hairTransplantDesc", slug: "hair-transplant", catKey: "services.hair", image: "/images/service-hair.jpg" },
    { icon: Scissors, titleKey: "services.beardTransplant", descKey: "services.beardTransplantDesc", slug: "beard-transplant", catKey: "services.hair", image: "/images/before-after-beard-1.jpg" },
    { icon: Droplets, titleKey: "services.prp", descKey: "services.prpDesc", slug: "prp-hair-treatment", catKey: "services.hair", image: "/images/before-after-hair-1.jpg" },
    { icon: Syringe, titleKey: "services.botox", descKey: "services.botoxDesc", slug: "botox", catKey: "services.aesthetics", image: "/images/before-after-botox-1.jpg" },
    { icon: Sparkles, titleKey: "services.fillers", descKey: "services.fillersDesc", slug: "dermal-fillers", catKey: "services.aesthetics", image: "/images/before-after-filler-1.jpg" },
    { icon: Sun, titleKey: "services.skinRejuvenation", descKey: "services.skinRejuvenationDesc", slug: "skin-rejuvenation", catKey: "services.skin", image: "/images/before-after-skin-1.jpg" },
    { icon: Zap, titleKey: "services.laser", descKey: "services.laserDesc", slug: "laser-treatments", catKey: "services.skin", image: "/images/before-after-laser-1.jpg" },
    { icon: Flower2, titleKey: "services.facial", descKey: "services.facialDesc", slug: "facial-treatments", catKey: "services.skin", image: "/images/new.jpg" },
    { icon: ShieldCheck, titleKey: "services.acne", descKey: "services.acneDesc", slug: "acne-treatment", catKey: "services.skin", image: "/images/before-after-skin-1.jpg" },
    { icon: ShieldCheck, titleKey: "services.scar", descKey: "services.scarDesc", slug: "scar-treatment", catKey: "services.skin", image: "/images/before-after-laser-1.jpg" },
  ];

  return (
    <div className="pt-[72px]">
      <section className="py-20 lg:py-28 bg-gradient-hero text-center relative overflow-hidden noise">
        <motion.div className="absolute top-1/2 start-1/4 w-72 h-72 rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 end-1/3 w-56 h-56 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }} animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{t("page.services.tag")}</span>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-display font-bold" style={{ color: 'white' }}>
              {t("page.services.title")} <span className="text-gradient-gold">{t("services.title2")}</span>
            </h1>
            <motion.div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-gold" initial={{ width: 0 }} animate={{ width: 64 }} transition={{ delay: 0.4, duration: 0.6 }} />
            <p className="mt-4 max-w-xl mx-auto text-[15px]" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>{t("services.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.06, type: "spring" }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Link to={`/services/${service.slug}`} className="group block rounded-2xl border border-border/60 bg-card hover:shadow-elevated hover:border-primary/20 transition-all duration-300 h-full overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={service.image} alt={t(service.titleKey)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">{t(service.catKey)}</span>
                    <motion.div className="mt-3 w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-gradient-blue transition-all duration-300" whileHover={{ rotate: [0, -8, 8, 0] }}>
                      <service.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </motion.div>
                    <h3 className="mt-4 text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{t(service.titleKey)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(service.descKey)}</p>
                    <div className="mt-4 flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all duration-300">
                      {t("services.learnMore")} <ArrowRight className="w-3.5 h-3.5 ms-1 rtl:rotate-180" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
