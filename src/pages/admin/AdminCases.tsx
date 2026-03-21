import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";

type Case = {
  id: string; category: string; procedure_name: string; description: string | null;
  before_image: string | null; after_image: string | null; case_date: string | null;
  is_published: boolean | null;
};

const emptyCase = { category: "", procedure_name: "", description: "", before_image: "", after_image: "", case_date: "", is_published: true };

const AdminCases = () => {
  const [items, setItems] = useState<Case[]>([]);
  const [form, setForm] = useState(emptyCase);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("before_after_cases").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!form.procedure_name || !form.category) { toast({ title: "Required fields missing", variant: "destructive" }); return; }
    const payload = { ...form, case_date: form.case_date || null };
    if (editId) {
      await supabase.from("before_after_cases").update(payload).eq("id", editId);
    } else {
      await supabase.from("before_after_cases").insert(payload);
    }
    toast({ title: editId ? "Case updated" : "Case created" });
    setForm(emptyCase); setEditId(null); setOpen(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("before_after_cases").delete().eq("id", id);
    toast({ title: "Case deleted" }); fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Before & After Cases</h1>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setForm(emptyCase); setEditId(null); } }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-gold text-primary-foreground"><Plus className="w-4 h-4 mr-2" />Add Case</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editId ? "Edit" : "Add"} Case</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Category *</label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Procedure *</label>
                  <Input value={form.procedure_name} onChange={(e) => setForm({ ...form, procedure_name: e.target.value })} />
                </div>
              </div>
              <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <Input placeholder="Before image URL" value={form.before_image} onChange={(e) => setForm({ ...form, before_image: e.target.value })} />
              <Input placeholder="After image URL" value={form.after_image} onChange={(e) => setForm({ ...form, after_image: e.target.value })} />
              <Input type="date" value={form.case_date} onChange={(e) => setForm({ ...form, case_date: e.target.value })} />
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
          <TableHeader>
            <TableRow>
              <TableHead>Procedure</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.procedure_name}</TableCell>
                <TableCell>{c.category}</TableCell>
                <TableCell>{c.is_published ? "Published" : "Draft"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setForm({ category: c.category, procedure_name: c.procedure_name, description: c.description || "", before_image: c.before_image || "", after_image: c.after_image || "", case_date: c.case_date || "", is_published: c.is_published ?? true }); setEditId(c.id); setOpen(true); }} className="h-8"><Pencil className="w-3 h-3" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(c.id)} className="h-8"><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No cases yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCases;
