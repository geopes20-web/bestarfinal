import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Appointment = {
  id: string; name: string; email: string; phone: string; service: string | null;
  preferred_date: string | null; preferred_time: string | null; notes: string | null;
  status: string; created_at: string;
};

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
    if (data) setAppointments(data);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("appointments").update({ status }).eq("id", id);
    toast({ title: `Appointment ${status}` });
    fetchData();
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "confirmed": return "default";
      case "cancelled": return "destructive";
      case "completed": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">Appointments</h1>
      <div className="rounded-xl border border-border bg-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((a) => (
              <TableRow key={a.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.email}</p>
                    <p className="text-xs text-muted-foreground">{a.phone}</p>
                  </div>
                </TableCell>
                <TableCell>{a.service || "—"}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{a.preferred_date || "—"}</p>
                    <p className="text-muted-foreground">{a.preferred_time || ""}</p>
                  </div>
                </TableCell>
                <TableCell><Badge variant={statusColor(a.status) as any}>{a.status}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {a.status === "pending" && (
                      <>
                        <Button size="sm" onClick={() => updateStatus(a.id, "confirmed")} className="bg-gradient-gold text-primary-foreground text-xs h-8">Confirm</Button>
                        <Button size="sm" variant="destructive" onClick={() => updateStatus(a.id, "cancelled")} className="text-xs h-8">Cancel</Button>
                      </>
                    )}
                    {a.status === "confirmed" && (
                      <Button size="sm" onClick={() => updateStatus(a.id, "completed")} className="text-xs h-8">Complete</Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {appointments.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No appointments yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminAppointments;
