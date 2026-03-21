import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, MessageSquare, Scissors, Users, Mail, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

type RecentAppointment = {
  id: string; name: string; service: string | null; status: string; created_at: string;
};

const AdminOverview = () => {
  const [stats, setStats] = useState({ appointments: 0, consultations: 0, services: 0, testimonials: 0, messages: 0 });
  const [recent, setRecent] = useState<RecentAppointment[]>([]);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const [a, c, s, t, m] = await Promise.all([
        supabase.from("appointments").select("id", { count: "exact", head: true }),
        supabase.from("consultations").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        appointments: a.count || 0,
        consultations: c.count || 0,
        services: s.count || 0,
        testimonials: t.count || 0,
        messages: m.count || 0,
      });

      const { data: recentData } = await supabase.from("appointments").select("id, name, service, status, created_at").order("created_at", { ascending: false }).limit(5);
      if (recentData) setRecent(recentData);

      const { count: pending } = await supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "pending");
      setPendingCount(pending || 0);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Appointments", value: stats.appointments, icon: CalendarDays, gradient: "bg-gradient-blue" },
    { label: "Consultations", value: stats.consultations, icon: MessageSquare, gradient: "bg-gradient-to-br from-secondary to-secondary/80" },
    { label: "Active Services", value: stats.services, icon: Scissors, gradient: "bg-gradient-blue" },
    { label: "Testimonials", value: stats.testimonials, icon: Users, gradient: "bg-gradient-to-br from-accent to-accent/80" },
    { label: "Messages", value: stats.messages, icon: Mail, gradient: "bg-gradient-blue" },
  ];

  const statusColor = (s: string) => {
    switch (s) {
      case "confirmed": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      case "completed": return "bg-blue-100 text-blue-700";
      default: return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back, Doctor</p>
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-50 border border-yellow-200">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-700">{pendingCount} pending appointments</span>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {cards.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="p-5 rounded-xl bg-card border border-border hover:shadow-card transition-shadow">
            <div className={`w-10 h-10 rounded-lg ${c.gradient} flex items-center justify-center mb-3`}>
              <c.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{c.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{c.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Appointments */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-foreground">Recent Appointments</h2>
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
        </div>
        {recent.length > 0 ? (
          <div className="space-y-3">
            {recent.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-3 border-b border-border/60 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{a.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.service || "General"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${statusColor(a.status)}`}>
                    {a.status}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(a.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No appointments yet</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminOverview;
