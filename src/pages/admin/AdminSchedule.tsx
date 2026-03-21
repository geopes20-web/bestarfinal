import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type Schedule = {
  id: string; day_of_week: number; start_time: string; end_time: string; is_active: boolean | null;
};

const AdminSchedule = () => {
  const [items, setItems] = useState<Schedule[]>([]);
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("doctor_schedule").select("*").order("day_of_week");
    if (data) setItems(data);
  };

  useEffect(() => { fetchData(); }, []);

  const initSchedule = async () => {
    // Create default schedule Mon-Sat 9-17
    const days = [1, 2, 3, 4, 5, 6].map(d => ({
      day_of_week: d, start_time: "09:00", end_time: "17:00", is_active: true,
    }));
    await supabase.from("doctor_schedule").insert(days);
    toast({ title: "Default schedule created" });
    fetchData();
  };

  const updateSlot = async (id: string, field: string, value: any) => {
    await supabase.from("doctor_schedule").update({ [field]: value }).eq("id", id);
    fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Working Schedule</h1>
        {items.length === 0 && (
          <Button onClick={initSchedule} className="bg-gradient-gold text-primary-foreground">
            Initialize Default Schedule
          </Button>
        )}
      </div>

      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((slot) => (
            <div key={slot.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="w-28">
                <span className="font-medium text-foreground">{dayNames[slot.day_of_week]}</span>
              </div>
              <Input
                type="time"
                value={slot.start_time}
                onChange={(e) => updateSlot(slot.id, "start_time", e.target.value)}
                className="w-32"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="time"
                value={slot.end_time}
                onChange={(e) => updateSlot(slot.id, "end_time", e.target.value)}
                className="w-32"
              />
              <Switch
                checked={slot.is_active ?? true}
                onCheckedChange={(c) => updateSlot(slot.id, "is_active", c)}
              />
              <span className="text-sm text-muted-foreground">{slot.is_active ? "Open" : "Closed"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSchedule;
