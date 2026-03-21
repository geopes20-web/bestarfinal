import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // 🔥 check role
  const checkRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("*")
        .eq("user_id", userId);

      console.log("🔥 USER ID:", userId);
      console.log("🔥 ROLE DATA:", data);
      console.log("🔥 ERROR:", error);

      if (error || !data || data.length === 0) {
        return false;
      }

      const roles = data.map((r) => r.role);
      return roles.includes("admin") || roles.includes("doctor");
    } catch (err) {
      console.error("❌ Role check error:", err);
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const handleSession = async (session: Session | null) => {
      console.log("🟢 HANDLE SESSION:", session);

      if (!isMounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const isAdminUser = await checkRole(session.user.id);
        console.log("🧠 isAdmin:", isAdminUser);

        if (isMounted) {
          setIsAdmin(isAdminUser);
        }
      } else {
        setIsAdmin(false);
      }

      if (isMounted) setLoading(false);
    };

    // ✅ أول تحميل
    supabase.auth.getSession().then(({ data }) => {
      handleSession(data.session);
    });

    // 🔄 أي تغيير (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("⚡ AUTH EVENT:", _event);
        handleSession(session);
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("🔐 TRY LOGIN:", email);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("🔐 LOGIN RESULT:", data, error);

    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};