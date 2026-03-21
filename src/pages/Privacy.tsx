import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

const Privacy = () => {
  const { t } = useI18n();

  const sections = [
    { titleKey: "privacy.s1.title", textKey: "privacy.s1.text" },
    { titleKey: "privacy.s2.title", textKey: "privacy.s2.text" },
    { titleKey: "privacy.s3.title", textKey: "privacy.s3.text" },
    { titleKey: "privacy.s4.title", textKey: "privacy.s4.text" },
    { titleKey: "privacy.s5.title", textKey: "privacy.s5.text" },
    { titleKey: "privacy.s6.title", textKey: "privacy.s6.text" },
  ];

  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-gradient-hero text-center">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white">
              {t("privacy.title1")} <span className="text-gradient-gold">{t("privacy.title2")}</span>
            </h1>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6 text-muted-foreground">
            <p className="text-sm">{t("privacy.lastUpdated")}</p>
            {sections.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                <h2 className="text-xl font-display font-bold text-foreground">{t(s.titleKey)}</h2>
                <p className="mt-2">{t(s.textKey)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
