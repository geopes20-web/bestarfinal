import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Heart, Shield, Users, Globe, Trophy } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const About = () => {
  const { t } = useI18n();
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-80px" });

  const features = [
    { icon: Award, titleKey: "about.certified", descKey: "about.certifiedDesc" },
    { icon: Shield, titleKey: "about.safe", descKey: "about.safeDesc" },
    { icon: Heart, titleKey: "about.patient", descKey: "about.patientDesc" },
    { icon: Globe, titleKey: "about.internationalPatients", descKey: "about.internationalPatientsDesc" },
    { icon: Trophy, titleKey: "about.provenResults", descKey: "about.provenResultsDesc" },
    { icon: Users, titleKey: "about.expertTeam", descKey: "about.expertTeamDesc" },
  ];

  return (
    <div className="pt-[72px]">
      <section className="py-20 lg:py-28 bg-gradient-hero text-center relative overflow-hidden noise">
        <motion.div className="absolute top-1/2 start-1/4 w-72 h-72 rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 end-1/4 w-56 h-56 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }} animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{t("about.tag")}</span>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-display font-bold" style={{ color: 'white' }}>
              {t("page.about.title")} <motion.span className="text-gradient-gold inline-block" initial={{ opacity: 0, x: -20, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} transition={{ delay: 0.3, duration: 0.8 }}>{t("page.about.bestar")}</motion.span>
            </h1>
            <motion.div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-gold" initial={{ width: 0 }} animate={{ width: 64 }} transition={{ delay: 0.4, duration: 0.6 }} />
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 end-0 w-96 h-96 rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
              <h2 className="text-3xl font-display font-bold text-foreground">{t("about.title1")} <span className="text-gradient-blue">{t("about.title2")}</span></h2>
              <motion.div className="mt-4 w-16 h-1 rounded-full bg-gradient-gold" initial={{ width: 0 }} whileInView={{ width: 64 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} />
              <p className="mt-6 text-muted-foreground leading-[1.8] text-[15px]">{t("about.p1")}</p>
              <p className="mt-4 text-muted-foreground leading-[1.8] text-[15px]">{t("about.p2")}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }} className="relative">
              <motion.div
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img src="/images/hero2.png" alt="Bestar Clinic Team" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent" />
              </motion.div>
              <motion.div
                className="absolute -top-3 -end-3 w-20 h-20 rounded-full border-2 border-dashed opacity-20"
                style={{ borderColor: 'hsl(var(--primary))' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-0 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-2xl overflow-hidden shadow-elevated relative">
            <img src="/images/clinic-interior.jpg" alt="Bestar Clinic Interior" className="w-full h-64 md:h-80 object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      <section ref={featuresRef} className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute bottom-0 start-0 w-72 h-72 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div className="text-center mb-14">
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={featuresInView ? { opacity: 1, y: 0 } : {}} className="text-3xl font-display font-bold text-foreground">
              {t("about.title1")} <span className="text-gradient-blue">{t("page.about.bestar")}</span>
            </motion.h2>
            <motion.div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-gold" initial={{ width: 0 }} animate={featuresInView ? { width: 64 } : {}} transition={{ delay: 0.3, duration: 0.6 }} />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, titleKey, descKey }, i) => (
              <motion.div
                key={titleKey}
                initial={{ opacity: 0, y: 30, scale: 0.93 }}
                animate={featuresInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                className="p-7 rounded-2xl bg-card border border-border/60 shadow-card hover:shadow-elevated transition-all duration-300 group shimmer"
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-gradient-blue transition-all duration-300"
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                >
                  <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </motion.div>
                <h3 className="mt-4 font-display font-semibold text-foreground">{t(titleKey)}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
