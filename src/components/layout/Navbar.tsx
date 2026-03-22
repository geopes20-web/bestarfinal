import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, lang, setLang } = useI18n();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.services"), path: "/services" },
    { label: t("nav.beforeAfter"), path: "/before-after" },
    { label: t("nav.blog"), path: "/blog" },
    { label: t("nav.testimonials"), path: "/testimonials" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-xl shadow-card border-b border-border/40"
          : "bg-card/80 backdrop-blur-lg border-b border-border/30"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* LOGO */}
          <div className="flex items-center gap-2.5">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/images/logo.png"
                alt="Bestar Clinic"
                className="h-10 w-auto transition-transform duration-200 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-lg font-display font-bold tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
                  BESTAR
                </span>
                <span className="text-[9px] font-body tracking-[0.25em] text-muted-foreground uppercase -mt-1">
                  Clinic
                </span>
              </div>
            </Link>

            {/* ⚕ ADMIN LINK (سيبته زي ما هو) */}
            <Link
              to="/admin/login"
              className="text-[10px] text-muted-foreground/20 hover:text-muted-foreground/40 transition-colors ms-1"
            >
              ⚕
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[13px] font-medium tracking-wide transition-colors hover:text-primary relative ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-blue rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* DESKTOP RIGHT */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === "en" ? "AR" : "EN"}
            </button>

            <Link
              to="/contact"
              className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t("nav.contact")}</span>
            </Link>

            <div className="hover:scale-[1.04] active:scale-[0.97] transition-transform">
              <Button
                asChild
                size="sm"
                className="bg-gradient-blue hover:opacity-90 text-primary-foreground shadow-blue rounded-lg px-5"
              >
                <Link to="/book-appointment">
                  {t("nav.bookAppointment")}
                </Link>
              </Button>
            </div>
          </div>

          {/* MOBILE */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="p-2 text-xs font-bold text-muted-foreground"
            >
              {lang === "en" ? "AR" : "EN"}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-card/98 backdrop-blur-xl border-b border-border overflow-hidden">
          <div className="container px-4 py-5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2.5 px-3 rounded-lg text-sm font-medium ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Button asChild className="w-full mt-3">
              <Link to="/book-appointment">
                {t("nav.bookAppointment")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;