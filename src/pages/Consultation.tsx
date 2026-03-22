import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Upload, Sparkles, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/contexts/I18nContext";

const Consultation = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [question, setQuestion] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(f => {
      if (f.size > 10 * 1024 * 1024) {
        toast({ title: "File too large", description: `${f.name} exceeds 10MB`, variant: "destructive" });
        return false;
      }
      if (!f.type.startsWith("image/")) {
        toast({ title: "Invalid file", description: `${f.name} is not an image`, variant: "destructive" });
        return false;
      }
      return true;
    });
    setSelectedFiles(prev => [...prev, ...validFiles].slice(0, 5));
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadPhotos = async (): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of selectedFiles) {
      const ext = file.name.split('.').pop();
      const fileName = `consultations/${Date.now()}_${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("clinic-uploads").upload(fileName, file, {
        contentType: file.type,
        cacheControl: "3600",
      });
      if (!error) {
        const { data } = supabase.storage.from("clinic-uploads").getPublicUrl(fileName);
        urls.push(data.publicUrl);
      }
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !whatsapp.trim() || !question.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      let photoUrls: string[] = [];
      if (selectedFiles.length > 0) {
        photoUrls = await uploadPhotos();
      }

      const { error } = await supabase.from("consultations").insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        whatsapp: whatsapp.trim() || null,
        question: question.trim(),
        photos: photoUrls.length > 0 ? photoUrls : null,
      });

      if (error) {
        console.error("Consultation insert error:", error);
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Consultation submit error:", err);
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
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-3 text-muted-foreground max-w-md">{t("success.consultationSent")}</motion.p>
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

        <motion.div
          className="absolute pointer-events-none top-1/2 end-1/4 w-72 h-72 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <motion.div
          className="absolute pointer-events-none bottom-0 start-1/3 w-56 h-56 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{t("page.consultation.tag")}</span>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-display font-bold" style={{ color: 'white' }}>
              {t("page.consultation.title1")} <span className="text-gradient-gold">{t("page.consultation.title2")}</span>
            </h1>
            <motion.div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-gold" initial={{ width: 0 }} animate={{ width: 64 }} transition={{ delay: 0.4, duration: 0.6 }} />
            <p className="mt-4 max-w-xl mx-auto" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>{t("page.consultation.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute pointer-events-none top-0 start-0 w-96 h-96 rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }} />

        <div className="container mx-auto px-4 max-w-2xl">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="relative z-50 pointer-events-auto space-y-5 p-8 rounded-2xl border border-border/60 bg-card shadow-card hover:shadow-elevated transition-shadow duration-500"
          >

            <div className="flex items-center gap-2 mb-2">
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <h3 className="text-lg font-display font-bold text-foreground">{t("page.consultation.tag")}</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.name")} *</label>
                <Input value={name} onChange={e => setName(e.target.value)} required maxLength={100} className="h-11 rounded-xl focus:glow-primary transition-shadow" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.phone")}</label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} type="tel" maxLength={20} className="h-11 rounded-xl focus:glow-primary transition-shadow" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">WhatsApp *</label>
                <Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} type="tel" required maxLength={20} placeholder="+20 xxx xxx xxxx" className="h-11 rounded-xl focus:glow-primary transition-shadow" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.email")} *</label>
                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" required maxLength={255} className="h-11 rounded-xl focus:glow-primary transition-shadow" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.question")} *</label>
              <Textarea value={question} onChange={e => setQuestion(e.target.value)} rows={6} required maxLength={2000} className="rounded-xl focus:glow-primary transition-shadow" />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1.5 block">{t("form.uploadPhotos")}</label>
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />

              <div
                className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/40 transition-all cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-7 h-7 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="mt-2 text-sm text-muted-foreground">JPG, PNG up to 10MB (max 5 photos)</p>
              </div>

              {selectedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedFiles.map((file, i) => (
                    <div key={i} className="relative group/thumb">
                      <img src={URL.createObjectURL(file)} alt={file.name} className="w-16 h-16 rounded-lg object-cover border border-border" />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" size="lg" disabled={loading} className="w-full bg-gradient-blue text-primary-foreground shadow-blue rounded-xl glow-primary">
              {loading ? t("form.sending") : t("form.submit")}
            </Button>

          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Consultation;