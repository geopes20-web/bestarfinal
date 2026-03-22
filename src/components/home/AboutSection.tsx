import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Shield, Heart } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useI18n();

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background relative overflow-hidden">

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              {t("about.tag")}
            </span>

            <h2 className="mt-3 text-3xl md:text-4xl lg:text-[2.75rem] font-display font-bold text-foreground leading-tight">
              {t("about.title1")}{" "}
              <span className="text-gradient-blue">{t("about.title2")}</span>
            </h2>

            <motion.div
              className="mt-4 w-16 h-1 rounded-full bg-gradient-gold"
              initial={{ width: 0 }}
              animate={isInView ? { width: 64 } : {}}
              transition={{ delay: 0.4 }}
            />

            <p className="mt-6 text-muted-foreground leading-[1.8] text-[15px]">
              {t("about.p1")}
            </p>

            <p className="mt-4 text-muted-foreground leading-[1.8] text-[15px]">
              {t("about.p2")}
            </p>

            {/* FEATURES */}
            <div className="mt-10 grid grid-cols-3 gap-5">
              {[
                { icon: Award, label: t("about.certified") },
                { icon: Shield, label: t("about.safe") },
                { icon: Heart, label: t("about.patient") },
              ].map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  whileHover={{ y: -6, scale: 1.05 }}
                  className="text-center p-4 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="mt-2.5 text-[11px] font-semibold text-muted-foreground">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* IMAGE 🔥 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative flex justify-center"
          >

            {/* Glow خلفية */}
            <div className="absolute w-[320px] h-[420px] bg-yellow-300/20 blur-3xl rounded-full"></div>

            {/* Frame */}
            <motion.div
              className="relative p-[5px] rounded-2xl bg-gradient-to-br from-yellow-300/40 via-yellow-100/20 to-transparent shadow-xl"
              animate={{ y: [0, -0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >

              <motion.div
                className="rounded-xl overflow-hidden bg-yellow-50 flex items-center justify-center w-[350px] h-[350px]"
                whileHover={{ scale: 1.01 }}
              >
                <motion.img
                  src="/images/uuu.png"
                  alt="Clinic"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  animate={{ scale: [1, 1.01, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-5 -start-5 bg-card rounded-2xl shadow-xl p-5 border border-border/50"
            >
              <p className="text-3xl font-display font-bold text-gradient-blue">
                15+
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("about.yearsExp")}
              </p>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;