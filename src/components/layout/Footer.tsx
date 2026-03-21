import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Globe } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const Footer = () => {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="bg-gradient-navy relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 start-1/4 w-96 h-96 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} />
      <div className="absolute bottom-0 end-1/4 w-72 h-72 rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }} />

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10" style={{ color: 'hsl(0 0% 100% / 0.75)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2.5 mb-4">
              <motion.img src="/images/logo.png" alt="Bestar Clinic" className="h-10 w-auto" whileHover={{ scale: 1.05 }} />
              <div>
                <span className="text-lg font-display font-bold" style={{ color: 'white' }}>BESTAR</span>
                <span className="text-[9px] tracking-[0.25em] ms-1.5 uppercase" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>Clinic</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>{t("footer.desc")}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <h4 className="font-display font-semibold mb-5 text-sm" style={{ color: 'white' }}>{t("footer.quickLinks")}</h4>
            <div className="space-y-2.5">
              {[
                { label: t("nav.about"), path: "/about" },
                { label: t("nav.services"), path: "/services" },
                { label: t("nav.beforeAfter"), path: "/before-after" },
                { label: t("nav.bookAppointment"), path: "/book-appointment" },
                { label: t("nav.blog"), path: "/blog" },
                { label: t("nav.contact"), path: "/contact" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="block text-sm hover:text-primary hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <h4 className="font-display font-semibold mb-5 text-sm" style={{ color: 'white' }}>{t("footer.services")}</h4>
            <div className="space-y-2.5">
              {[
                { key: "services.hairTransplant", slug: "hair-transplant" },
                { key: "services.beardTransplant", slug: "beard-transplant" },
                { key: "services.prp", slug: "prp-hair-treatment" },
                { key: "services.botox", slug: "botox" },
                { key: "services.fillers", slug: "dermal-fillers" },
                { key: "services.skinRejuvenation", slug: "skin-rejuvenation" },
              ].map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="block text-sm hover:text-primary hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>
                  {t(s.key)}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
            <h4 className="font-display font-semibold mb-5 text-sm" style={{ color: 'white' }}>{t("contact.branches")}</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-primary mb-1.5">{t("contact.cairo")}</p>
                <div className="flex items-start gap-2.5 text-sm mb-1">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                  <span className="text-xs" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>{t("contact.cairo.address")}</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm">
                  <Phone className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                  <span className="text-xs" style={{ color: 'hsl(0 0% 100% / 0.45)' }} dir="ltr">{t("contact.cairo.phone")}</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-primary mb-1.5">{t("contact.sharqia")}</p>
                <div className="flex items-start gap-2.5 text-sm mb-1">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                  <span className="text-xs" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>{t("contact.sharqia.address")}</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm">
                  <Phone className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                  <span className="text-xs" style={{ color: 'hsl(0 0% 100% / 0.45)' }} dir="ltr">{t("contact.sharqia.phone")}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-sm">
                <Mail className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                <span className="text-xs" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>{t("contact.email")}</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm">
                <Clock className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                <span className="text-xs" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>{t("contact.hours")}</span>
              </div>
              <div className="flex gap-3 mt-3">
                {[
                  { Icon: Instagram, href: "https://www.instagram.com/bestarclinic?igsh=MWVrdzRvY3B2bmpxNA==" },
                  { Icon: Facebook, href: "https://www.facebook.com/share/1b3RHnhxMa/" },
                ].map(({ Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:text-primary transition-all"
                    style={{ border: '1px solid hsl(0 0% 100% / 0.12)', color: 'hsl(0 0% 100% / 0.45)' }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid hsl(0 0% 100% / 0.08)' }}
        >
          <p className="text-xs" style={{ color: 'hsl(0 0% 100% / 0.25)' }}>{t("footer.rights")}</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs transition-colors hover:text-primary" style={{ color: 'hsl(0 0% 100% / 0.25)' }}>{t("privacy.title1")} {t("privacy.title2")}</Link>
            <Link to="/terms" className="text-xs transition-colors hover:text-primary" style={{ color: 'hsl(0 0% 100% / 0.25)' }}>{t("terms.title1")} {t("terms.title2")}</Link>
            <Link to="/faq" className="text-xs transition-colors hover:text-primary" style={{ color: 'hsl(0 0% 100% / 0.25)' }}>{t("page.faq.title1")} {t("page.faq.title2")}</Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-6 pt-4 text-center"
          style={{ borderTop: '1px solid hsl(0 0% 100% / 0.05)' }}
        >
          <motion.a
            href="https://georgesalama.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs transition-colors hover:text-primary group"
            style={{ color: 'hsl(0 0% 100% / 0.2)' }}
            whileHover={{ scale: 1.02 }}
          >
            <span>تصميم وتطوير بواسطة</span>
            <span className="font-semibold text-primary/80 group-hover:text-primary transition-colors">George Salama</span>
            <Globe className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
