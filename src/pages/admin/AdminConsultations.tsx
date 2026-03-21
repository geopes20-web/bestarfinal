import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, Mail, ChevronDown, Send, X } from "lucide-react";

type ZoomConsultation = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string | null;
  topic: string;
  payment_screenshot: string | null;
  created_at: string;
};

const ZoomConsultations = () => {
  const [items, setItems] = useState<ZoomConsultation[]>([]);

  const fetchZoom = async () => {
    const { data } = await supabase
      .from("consultationszoom")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setItems(data as ZoomConsultation[]);
  };

  useEffect(() => {
    fetchZoom();
  }, []);

  if (items.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No zoom consultations yet
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((c) => (
        <div
          key={c.id}
          className="border border-border rounded-xl p-4 bg-card"
        >
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">{c.name}</p>
            <span className="text-xs text-muted-foreground">
              {new Date(c.created_at).toLocaleString()}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-1">
            📱 {c.phone}
          </p>

          {c.whatsapp && (
            <p className="text-sm text-muted-foreground mb-1">
              💬 {c.whatsapp}
            </p>
          )}

          <p className="text-sm mb-2">
            🧠 {c.topic}
          </p>

          {c.payment_screenshot && (
            <a
              href={c.payment_screenshot}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={c.payment_screenshot}
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

type Consultation = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  whatsapp?: string | null;
  photos?: string[] | null;
  question: string;
  doctor_reply: string | null;
  status: string;
  created_at: string;
};

const AdminConsultations = () => {
  const [items, setItems] = useState<Consultation[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setItems(data as unknown as Consultation[]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      setReply("");
    } else {
      setExpandedId(id);
      const item = items.find((c) => c.id === id);
      setReply(item?.doctor_reply || "");
    }
  };

  const sendReply = async (id: string) => {
    if (!reply.trim()) return;
    await supabase
      .from("consultations")
      .update({ doctor_reply: reply, status: "answered" })
      .eq("id", id);

    toast({ title: "تم إرسال الرد بنجاح" });
    setReply("");
    setExpandedId(null);
    fetchData();
  };

  const openWhatsApp = (consultation: Consultation) => {
    const number = (consultation.whatsapp || consultation.phone || "").replace(
      /[^0-9+]/g,
      ""
    );

    if (number) {
      const replyText = consultation.doctor_reply
        ? consultation.doctor_reply.substring(0, 500)
        : "";

      const msg = `خبر سعيد 🎉 تم الرد على استفسار حضرتك من فريق Bestar Clinic\n\n👨‍⚕️ رد الدكتور:\n${replyText || "سيتم إرسال الرد قريباً إن شاء الله"}\n\n🏥 Bestar Clinic\nيسعدنا الرد على أي استفسار آخر في أي وقت.`;

      window.open(
        `https://wa.me/${number.replace("+", "")}?text=${encodeURIComponent(
          msg
        )}`,
        "_blank"
      );
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">
        Consultations
      </h1>

      {items.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>No consultations yet</p>
        </div>
      )}

      <div className="space-y-3">
        {items.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md"
          >
            <button
              onClick={() => toggleExpand(c.id)}
              className="w-full flex items-center gap-4 p-4 text-start hover:bg-muted/30 transition-colors"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  c.status === "answered"
                    ? "bg-emerald-500"
                    : "bg-amber-500"
                }`}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-foreground text-sm">
                    {c.name}
                  </span>

                  <Badge
                    variant={
                      c.status === "answered" ? "default" : "outline"
                    }
                    className="text-[10px] h-5"
                  >
                    {c.status === "answered" ? "Answered" : "Pending"}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground truncate">
                  {c.question}
                </p>
              </div>

              <span className="text-[10px] text-muted-foreground shrink-0 hidden sm:block">
                {formatDate(c.created_at)}
              </span>

              <ChevronDown
                className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${
                  expandedId === c.id ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {expandedId === c.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail className="w-3.5 h-3.5" /> {c.email}
                      </div>

                      {c.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="w-3.5 h-3.5" /> {c.phone}
                        </div>
                      )}

                      {(c.whatsapp || c.phone) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openWhatsApp(c)}
                        >
                          Reply on WhatsApp
                        </Button>
                      )}
                    </div>

                    <Textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                    />

                    <Button onClick={() => sendReply(c.id)}>
                      Send Reply
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* ================= ZOOM CONSULTATIONS ================= */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4 text-primary">
          Online Zoom Consultations 🎥
        </h2>

        <ZoomConsultations />
      </div>
    </div>
  );
};

export default AdminConsultations;