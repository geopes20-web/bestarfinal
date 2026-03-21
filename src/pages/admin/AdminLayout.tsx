import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const { user, loading, isAdmin, signOut } = useAuth();

  // ⏳ استنى لحد ما auth يخلص
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // ❌ مش مسجل دخول
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // ❌ مش أدمن
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // ✅ أدمن حقيقي
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <img src="/images/logo.png" alt="Bestar" className="h-7 w-auto" />
              <span className="text-sm font-display font-bold text-gradient-gold">BESTAR</span>
              <span className="text-xs text-muted-foreground">Dashboard</span>
            </div>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </header>

          <main className="flex-1 p-6 bg-muted/30 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;