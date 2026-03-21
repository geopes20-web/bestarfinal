import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useI18n } from "@/contexts/I18nContext";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("contact_messages").insert({
      name: fd.get("name")?.toString().trim() || "",
      email: fd.get("email")?.toString().trim() || "",
      phone: fd.get("phone")?.toString().trim() || null,
      subject: fd.get("subject")?.toString().trim() || null,
      message: fd.get("message")?.toString().trim() || "",
    });
    setLoading(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: t("success.messageSent") }); (e.target as HTMLFormElement).reset(); }
  };

  const branches = [
    {
      name: t("contact.cairo"),
      address: t("contact.cairo.address"),
      phone: t("contact.cairo.phone"),
      mapsLink: "https://goo.gl/maps/1cMzBUFvH6np6qAh8",
    },
    {
      name: t("contact.sharqia"),
      address: t("contact.sharqia.address"),
      phone: t("contact.sharqia.phone"),
      mapsLink: "https://goo.gl/maps/wrWFCSjXi5cqXBqx9",
    },
  ];

  return (
    <div className="pt-[72px]">
      <section className="py-20 lg:py-28 bg-gradient-hero text-center relative overflow-hidden noise">
        <motion.div className="absolute top-1/2 start-1/3 w-72 h-72 rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 end-1/4 w-56 h-56 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }} animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{t("page.contact.tag")}</span>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-display font-bold" style={{ color: 'white' }}>
              {t("page.contact.title1")} <span className="text-gradient-gold">{t("page.contact.title2")}</span>
            </h1>
            <motion.div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-gold" initial={{ width: 0 }} animate={{ width: 64 }} transition={{ delay: 0.4, duration: 0.6 }} />
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute top-0 end-0 w-96 h-96 rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.8 }}>
              <h2 className="text-2xl font-display font-bold text-foreground mb-8">{t("contact.branches")}</h2>

              <div className="space-y-6">
                {branches.map((branch, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
                    whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
                    className="p-6 rounded-2xl border border-border/60 bg-card shadow-card hover:shadow-elevated transition-all duration-300 shimmer"
                  >
                    <h3 className="font-display font-semibold text-primary mb-3">{branch.name}</h3>
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                        <p className="text-sm text-muted-foreground">{branch.address}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                        <p className="text-sm text-muted-foreground" dir="ltr">{branch.phone}</p>
                      </div>
                    </div>
                    <a href={branch.mapsLink} target="_blank" rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                      📍 Google Maps
                    </a>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <p className="text-sm text-muted-foreground">{t("contact.email")}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <p className="text-sm text-muted-foreground">{t("contact.hours")}</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-6 flex gap-3">
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
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary hover:glow-primary transition-all text-muted-foreground"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
              <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl border border-border/60 bg-card shadow-card hover:shadow-elevated transition-shadow duration-500">
                <h3 className="text-lg font-display font-bold text-foreground">{t("form.message")}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.name")} *</label>
                    <Input name="name" required maxLength={100} className="h-11 rounded-xl focus:glow-primary transition-shadow" />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.phone")}</label>
                    <Input name="phone" type="tel" maxLength={20} className="h-11 rounded-xl focus:glow-primary transition-shadow" />
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.email")} *</label>
                  <Input name="email" type="email" required maxLength={255} className="h-11 rounded-xl focus:glow-primary transition-shadow" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                  <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.subject")}</label>
                  <Input name="subject" maxLength={200} className="h-11 rounded-xl focus:glow-primary transition-shadow" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.message")} *</label>
                  <Textarea name="message" rows={5} required maxLength={2000} className="rounded-xl focus:glow-primary transition-shadow" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" size="lg" disabled={loading} className="w-full bg-gradient-blue text-primary-foreground shadow-blue rounded-xl glow-primary">
                    <Send className="w-4 h-4 me-2" /> {loading ? t("form.sending") : t("form.submit")}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
