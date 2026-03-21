import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const FAQ = () => {
  const { t } = useI18n();

  const faqs = [
    { qKey: "faq.q1", aKey: "faq.a1" },
    { qKey: "faq.q2", aKey: "faq.a2" },
    { qKey: "faq.q3", aKey: "faq.a3" },
    { qKey: "faq.q4", aKey: "faq.a4" },
    { qKey: "faq.q5", aKey: "faq.a5" },
    { qKey: "faq.q6", aKey: "faq.a6" },
    { qKey: "faq.q7", aKey: "faq.a7" },
    { qKey: "faq.q8", aKey: "faq.a8" },
  ];

  return (
    <div className="pt-[72px]">
      <section className="py-20 lg:py-28 bg-gradient-hero text-center relative overflow-hidden noise">
        <motion.div className="absolute top-1/2 start-1/4 w-72 h-72 rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 end-1/3 w-56 h-56 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }} animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-5 glow-primary"
            >
              <HelpCircle className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold" style={{ color: 'white' }}>
              {t("page.faq.title1")} <span className="text-gradient-gold">{t("page.faq.title2")}</span>
            </h1>
            <motion.div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-gold" initial={{ width: 0 }} animate={{ width: 64 }} transition={{ delay: 0.4, duration: 0.6 }} />
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute top-0 end-0 w-96 h-96 rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} />
        <div className="container mx-auto px-4 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.6, type: "spring" }}
              >
                <AccordionItem value={`faq-${i}`} className="border border-border/60 rounded-xl px-6 bg-card shadow-card hover:shadow-card-hover transition-all duration-300 group">
                  <AccordionTrigger className="text-left font-medium text-foreground text-[15px] hover:text-primary transition-colors group-hover:text-primary">{t(faq.qKey)}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-[15px] leading-relaxed">{t(faq.aKey)}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
