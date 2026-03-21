import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Star } from "lucide-react";

type Testimonial = {
  id: string; name: string; country: string | null; service: string | null;
  text: string; rating: number | null; is_published: boolean | null;
};

const emptyT = { name: "", country: "", service: "", text: "", rating: 5, is_published: true };

const AdminTestimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState(emptyT);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!form.name || !form.text) { toast({ title: "Name and text required", variant: "destructive" }); return; }
    if (editId) {
      await supabase.from("testimonials").update(form).eq("id", editId);
    } else {
      await supabase.from("testimonials").insert(form);
    }
    toast({ title: editId ? "Updated" : "Created" });
    setForm(emptyT); setEditId(null); setOpen(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    toast({ title: "Deleted" }); fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Testimonials</h1>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setForm(emptyT); setEditId(null); } }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-gold text-primary-foreground"><Plus className="w-4 h-4 mr-2" />Add</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editId ? "Edit" : "Add"} Testimonial</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-1 block">Name *</label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><label className="text-sm font-medium mb-1 block">Country</label><Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} /></div>
              </div>
              <div><label className="text-sm font-medium mb-1 block">Service</label><Input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} /></div>
              <div><label className="text-sm font-medium mb-1 block">Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setForm({ ...form, rating: n })} className="p-1">
                      <Star className={`w-5 h-5 ${n <= form.rating ? "fill-primary text-primary" : "text-muted"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div><label className="text-sm font-medium mb-1 block">Text *</label><Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={4} /></div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_published} onCheckedChange={(c) => setForm({ ...form, is_published: c })} />
                <span className="text-sm">Published</span>
              </div>
              <Button onClick={handleSave} className="w-full bg-gradient-gold text-primary-foreground">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Service</TableHead><TableHead>Rating</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((t) => (
              <TableRow key={t.id}>
                <TableCell><p className="font-medium">{t.name}</p><p className="text-xs text-muted-foreground">{t.country}</p></TableCell>
                <TableCell>{t.service || "—"}</TableCell>
                <TableCell><div className="flex gap-0.5">{Array.from({length: t.rating || 0}).map((_,i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}</div></TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setForm({ name: t.name, country: t.country || "", service: t.service || "", text: t.text, rating: t.rating || 5, is_published: t.is_published ?? true }); setEditId(t.id); setOpen(true); }} className="h-8"><Pencil className="w-3 h-3" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(t.id)} className="h-8"><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (<TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No testimonials yet</TableCell></TableRow>)}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminTestimonials;
