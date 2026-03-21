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

type Post = {
  id: string; slug: string; title: string; excerpt: string | null;
  content: string | null; category: string | null; is_published: boolean | null; created_at: string;
};

const emptyPost = { slug: "", title: "", excerpt: "", content: "", category: "", is_published: false };

const AdminBlog = () => {
  const [items, setItems] = useState<Post[]>([]);
  const [form, setForm] = useState(emptyPost);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!form.title || !form.slug) { toast({ title: "Title and slug required", variant: "destructive" }); return; }
    const payload = { ...form, published_at: form.is_published ? new Date().toISOString() : null };
    if (editId) {
      await supabase.from("blog_posts").update(payload).eq("id", editId);
    } else {
      await supabase.from("blog_posts").insert(payload);
    }
    toast({ title: editId ? "Post updated" : "Post created" });
    setForm(emptyPost); setEditId(null); setOpen(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("blog_posts").delete().eq("id", id);
    toast({ title: "Post deleted" }); fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Blog Posts</h1>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setForm(emptyPost); setEditId(null); } }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-gold text-primary-foreground"><Plus className="w-4 h-4 mr-2" />Add Post</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editId ? "Edit" : "Add"} Post</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-1 block">Title *</label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><label className="text-sm font-medium mb-1 block">Slug *</label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
              </div>
              <div><label className="text-sm font-medium mb-1 block">Category</label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
              <div><label className="text-sm font-medium mb-1 block">Excerpt</label><Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} /></div>
              <div><label className="text-sm font-medium mb-1 block">Content</label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} /></div>
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
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.category || "—"}</TableCell>
                <TableCell>{p.is_published ? "Published" : "Draft"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setForm({ slug: p.slug, title: p.title, excerpt: p.excerpt || "", content: p.content || "", category: p.category || "", is_published: p.is_published ?? false }); setEditId(p.id); setOpen(true); }} className="h-8"><Pencil className="w-3 h-3" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)} className="h-8"><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No posts yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminBlog;
