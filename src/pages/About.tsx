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

      {/* HERO */}
      <section className="py-16 md:py-20 lg:py-28 bg-gradient-hero text-center relative overflow-hidden noise">

        {/* FIX pointer-events */}
        <motion.div className="absolute pointer-events-none top-1/2 start-1/4 w-40 md:w-72 h-40 md:h-72 rounded-full opacity-[0.06]" />
        <motion.div className="absolute pointer-events-none bottom-0 end-1/4 w-32 md:w-56 h-32 md:h-56 rounded-full opacity-[0.04]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] md:text-xs tracking-widest text-primary">{t("about.tag")}</span>

            <h1 className="mt-3 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {t("page.about.title")}
              <span className="text-gradient-gold block md:inline"> {t("page.about.bestar")}</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-12 md:py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

            {/* TEXT */}
            <div>
              <h2 className="text-xl md:text-3xl font-bold">
                {t("about.title1")} <span className="text-gradient-blue">{t("about.title2")}</span>
              </h2>

              <p className="mt-4 text-sm md:text-base leading-relaxed">
                {t("about.p1")}
              </p>

              <p className="mt-3 text-sm md:text-base leading-relaxed">
                {t("about.p2")}
              </p>
            </div>

            {/* IMAGE */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="/images/hero2.jpg"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* IMAGE SECTION */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <img
            src="/images/clinic-interior.jpg"
            className="w-full h-48 md:h-80 object-cover rounded-xl"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featuresRef} className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">

          <h2 className="text-center text-xl md:text-3xl font-bold mb-8">
            {t("about.title1")} <span className="text-gradient-blue">{t("page.about.bestar")}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

            {features.map(({ icon: Icon, titleKey, descKey }) => (
              <div
                key={titleKey}
                className="p-5 md:p-7 rounded-xl bg-card border shadow-sm"
              >
                <Icon className="w-6 h-6 text-primary mb-3" />

                <h3 className="font-semibold text-sm md:text-base">
                  {t(titleKey)}
                </h3>

                <p className="text-xs md:text-sm text-muted-foreground mt-2">
                  {t(descKey)}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;