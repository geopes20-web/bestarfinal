import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

const Terms = () => {
  const { t } = useI18n();

  const sections = [
    { titleKey: "terms.s1.title", textKey: "terms.s1.text" },
    { titleKey: "terms.s2.title", textKey: "terms.s2.text" },
    { titleKey: "terms.s3.title", textKey: "terms.s3.text" },
    { titleKey: "terms.s4.title", textKey: "terms.s4.text" },
    { titleKey: "terms.s5.title", textKey: "terms.s5.text" },
    { titleKey: "terms.s6.title", textKey: "terms.s6.text" },
  ];

  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-gradient-hero text-center">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white">
              {t("terms.title1")} <span className="text-gradient-gold">{t("terms.title2")}</span>
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

export default Terms;
