import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

const BeforeAfter = () => {
  const { t } = useI18n();
  const [filter, setFilter] = useState("All");

  const categories = [
    { key: "All", label: t("ba.all") },
    { key: "Hair Transplant", label: t("ba.hairTransplant") },
    { key: "Beard Transplant", label: t("ba.beardTransplant") },
    { key: "Skin", label: t("ba.skin") },
    { key: "Laser", label: t("ba.laser") },
    { key: "Botox", label: t("ba.botox") },
    { key: "Fillers", label: t("ba.fillers") },
  ];

  const cases = [
    { id: 1, category: "Hair Transplant", procedure: t("ba.case1.procedure"), desc: t("ba.case1.desc"), date: "Jan 2025", image: "/images/before-after-hair-1.jpg" },
    { id: 2, category: "Beard Transplant", procedure: t("ba.case2.procedure"), desc: t("ba.case2.desc"), date: "Nov 2024", image: "/images/before-after-beard-1.jpg" },
    { id: 3, category: "Botox", procedure: t("ba.case3.procedure"), desc: t("ba.case3.desc"), date: "Feb 2025", image: "/images/before-after-botox-1.jpg" },
    { id: 4, category: "Skin", procedure: t("ba.case4.procedure"), desc: t("ba.case4.desc"), date: "Jan 2025", image: "/images/before-after-skin-1.jpg" },
    { id: 5, category: "Laser", procedure: t("ba.case5.procedure"), desc: t("ba.case5.desc"), date: "Oct 2024", image: "/images/before-after-laser-1.jpg" },
    { id: 6, category: "Fillers", procedure: t("ba.case6.procedure"), desc: t("ba.case6.desc"), date: "Dec 2024", image: "/images/before-after-filler-1.jpg" },
  ];

  const filtered = filter === "All" ? cases : cases.filter(c => c.category === filter);

  return (
    <div className="pt-[72px]">
      <section className="py-20 lg:py-28 bg-gradient-hero text-center relative overflow-hidden noise">
        <motion.div className="absolute top-1/2 end-1/4 w-72 h-72 rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 start-1/3 w-56 h-56 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }} animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{t("page.beforeAfter.tag")}</span>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-display font-bold" style={{ color: 'white' }}>
              {t("page.beforeAfter.title1")} <span className="text-gradient-gold">{t("page.beforeAfter.title2")}</span>
            </h1>
            <motion.div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-gold" initial={{ width: 0 }} animate={{ width: 64 }} transition={{ delay: 0.4, duration: 0.6 }} />
            <p className="mt-4 max-w-xl mx-auto" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>{t("page.beforeAfter.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2.5 justify-center mb-12">
            {categories.map(cat => (
              <motion.button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  filter === cat.key ? "bg-gradient-blue text-primary-foreground shadow-blue glow-primary" : "bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-primary"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 30, scale: 0.93 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.6, type: "spring" }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="rounded-2xl border border-border/60 overflow-hidden bg-card shadow-card hover:shadow-elevated transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img src={c.image} alt={c.procedure} className="w-full aspect-[16/10] object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 start-3 flex gap-2">
                      <motion.span
                        className="px-2.5 py-1 rounded-md text-[10px] font-bold backdrop-blur-sm"
                        style={{ background: 'hsl(var(--foreground) / 0.8)', color: 'hsl(var(--background))' }}
                        whileHover={{ scale: 1.05 }}
                      >Before</motion.span>
                      <motion.span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-primary text-primary-foreground backdrop-blur-sm" whileHover={{ scale: 1.05 }}>After</motion.span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-primary">
                      {categories.find(cat => cat.key === c.category)?.label}
                    </span>
                    <h3 className="mt-1.5 font-display font-semibold text-foreground text-sm">{c.procedure}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
                    <p className="mt-2.5 text-[10px] text-muted-foreground/60">{c.date}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default BeforeAfter;
