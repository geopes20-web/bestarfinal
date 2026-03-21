import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  const { signIn, user, isAdmin, loading } = useAuth(); // 👈 مهم
  const navigate = useNavigate();
  const { toast } = useToast();

  // 🔥 دي أهم حاجة في الدنيا كلها
  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingBtn(true);

    const { error } = await signIn(email, password);

    setLoadingBtn(false);

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-navy">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-card border border-border shadow-xl mx-4"
      >
        <div className="text-center mb-8">
          <span className="text-2xl font-display font-bold text-gradient-gold">BESTAR</span>
          <span className="text-sm tracking-[0.3em] text-muted-foreground ml-2 uppercase">Admin</span>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to the doctor dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@bestarclinic.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loadingBtn}
            className="w-full bg-gradient-gold text-primary-foreground shadow-gold h-12"
          >
            {loadingBtn ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;