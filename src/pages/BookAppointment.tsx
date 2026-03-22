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
const timeSlots = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

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
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        setSubmitted(true);
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-10">
          <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
          <h2 className="mt-6 text-3xl font-bold">{t("success.thankYou")}</h2>
          <p className="mt-3">{t("success.appointmentSent")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px]">

      {/* HEADER */}
      <section className="py-20 bg-gradient-hero text-center relative overflow-hidden">

        {/* FIX */}
        <motion.div className="absolute pointer-events-none top-1/2 start-1/3 w-72 h-72 rounded-full opacity-[0.06]" />
        <motion.div className="absolute pointer-events-none bottom-0 end-1/4 w-56 h-56 rounded-full opacity-[0.04]" />

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl text-white">
            {t("page.booking.title1")} <span className="text-gradient-gold">{t("page.booking.title2")}</span>
          </h1>
        </div>
      </section>

      {/* FORM */}
      <section className="py-16 bg-background relative">
        <div className="container mx-auto px-4 max-w-2xl">

          {/* FIX */}
          <motion.form
            onSubmit={handleSubmit}
            className="relative z-50 pointer-events-auto space-y-5 p-8 rounded-2xl border bg-card"
          >

            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
            <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />

            {/* FIX Select */}
            <Select value={service} onValueChange={setService}>
              <SelectTrigger className="h-11 rounded-xl pointer-events-auto">
                <SelectValue placeholder="Select Service" />
              </SelectTrigger>
              <SelectContent className="pointer-events-auto z-50">
                {services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>

            {/* FIX Calendar */}
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full">Pick Date</Button>
              </PopoverTrigger>
              <PopoverContent className="pointer-events-auto z-50">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>

            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="pointer-events-auto">
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent className="pointer-events-auto z-50">
                {timeSlots.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>

            <Textarea value={notes} onChange={e => setNotes(e.target.value)} />

            <Button type="submit" className="w-full">
              Submit
            </Button>

          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default BookAppointment;