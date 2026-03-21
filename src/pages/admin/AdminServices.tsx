import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";

type Service = {
  id: string; slug: string; title: string; tagline: string | null;
  description: string | null; category: string | null; is_active: boolean | null;
  pricing: string | null; created_at: string;
};

const emptyService = { slug: "", title: "", tagline: "", description: "", category: "", pricing: "", is_active: true };

const AdminServices = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [form, setForm] = useState(emptyService);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    if (data) setItems(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!form.title || !form.slug) { toast({ title: "Title and slug are required", variant: "destructive" }); return; }
    if (editId) {
      await supabase.from("services").update(form).eq("id", editId);
      toast({ title: "Service updated" });
    } else {
      await supabase.from("services").insert(form);
      toast({ title: "Service created" });
    }
    setForm(emptyService);
    setEditId(null);
    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    toast({ title: "Service deleted" });
    fetchData();
  };

  const openEdit = (s: Service) => {
    setForm({ slug: s.slug, title: s.title, tagline: s.tagline || "", description: s.description || "", category: s.category || "", pricing: s.pricing || "", is_active: s.is_active ?? true });
    setEditId(s.id);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Services</h1>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setForm(emptyService); setEditId(null); } }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-gold text-primary-foreground"><Plus className="w-4 h-4 mr-2" />Add Service</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editId ? "Edit" : "Add"} Service</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Title *</label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Slug *</label>
                  <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Tagline</label>
                <Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Pricing</label>
                  <Input value={form.pricing} onChange={(e) => setForm({ ...form, pricing: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(c) => setForm({ ...form, is_active: c })} />
                <span className="text-sm">Active</span>
              </div>
              <Button onClick={handleSave} className="w-full bg-gradient-gold text-primary-foreground">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.title}</TableCell>
                <TableCell>{s.category || "—"}</TableCell>
                <TableCell>{s.is_active ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEdit(s)} className="h-8"><Pencil className="w-3 h-3" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(s.id)} className="h-8"><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No services yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminServices;
