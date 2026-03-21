import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays, Clock, CheckCircle2, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/contexts/I18nContext";

const services = ["Hair Transplant", "Beard Transplant", "PRP Hair Treatment", "Botox", "Dermal Fillers", "Skin Rejuvenation", "Laser Treatments", "Facial Treatments", "Acne Treatment", "Scar Treatment"];
const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const BookAppointment = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [date, setDate] = useState<Date>();
  const [service, setService] = useState("");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("appointments").insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service: service || null,
        preferred_date: date ? format(date, "yyyy-MM-dd") : null,
        preferred_time: time || null,
        notes: notes.trim() || null,
      });

      if (error) {
        console.error("Appointment insert error:", error);
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Appointment submit error:", err);
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center bg-background">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="text-center p-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto glow-primary"
          >
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6 text-3xl font-display font-bold text-foreground">{t("success.thankYou")}</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-3 text-muted-foreground max-w-md">{t("success.appointmentSent")}</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <Sparkles className="w-5 h-5 text-accent mx-auto mt-4 animate-float" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-[72px]">
      <section className="py-20 lg:py-28 bg-gradient-hero text-center relative overflow-hidden noise">
        <motion.div className="absolute top-1/2 start-1/3 w-72 h-72 rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 end-1/4 w-56 h-56 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }} animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{t("page.booking.tag")}</span>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-display font-bold" style={{ color: 'white' }}>
              {t("page.booking.title1")} <span className="text-gradient-gold">{t("page.booking.title2")}</span>
            </h1>
            <motion.div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-gold" initial={{ width: 0 }} animate={{ width: 64 }} transition={{ delay: 0.4, duration: 0.6 }} />
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute top-0 end-0 w-96 h-96 rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} />
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl border border-border/60 bg-card shadow-card hover:shadow-elevated transition-shadow duration-500">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.name")} *</label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder={t("form.name")} required maxLength={100} className="h-11 rounded-xl focus:glow-primary transition-shadow" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.phone")} *</label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="+20 xxx xxx xxxx" required maxLength={20} className="h-11 rounded-xl focus:glow-primary transition-shadow" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.email")} *</label>
              <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" required maxLength={255} className="h-11 rounded-xl focus:glow-primary transition-shadow" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.service")}</label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder={t("form.selectService")} /></SelectTrigger>
                <SelectContent>{services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.date")}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal h-11 rounded-xl", !date && "text-muted-foreground")}>
                      <CalendarDays className="me-2 h-4 w-4" />{date ? format(date, "PPP") : t("form.pickDate")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} className={cn("p-3 pointer-events-auto")} />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.time")}</label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder={t("form.selectTime")} /></SelectTrigger>
                  <SelectContent>{timeSlots.map(slot => <SelectItem key={slot} value={slot}><Clock className="w-3 h-3 inline me-2" />{slot}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.notes")}</label>
              <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder={t("form.notes")} rows={4} maxLength={1000} className="rounded-xl focus:glow-primary transition-shadow" />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="w-full bg-gradient-blue text-primary-foreground shadow-blue rounded-xl glow-primary">
              {loading ? t("form.sending") : t("nav.bookAppointment")}
            </Button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default BookAppointment;
