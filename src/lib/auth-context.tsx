import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthCtx {
  user: any | null; // Using any to avoid type complaints with custom metadata
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  loginAs: (role: "student" | "teacher" | "admin") => void;
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Start without a user to force the login screen
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Autenticação mockada para não exigir Supabase/Lovable Cloud agora.
  }, []);

  const signOut = async () => {
    setSession(null);
  };

  const loginAs = (role: "student" | "teacher" | "admin") => {
    const mockUsers = {
      student: { id: "student-1", email: "aluno@vetclass.com", user_metadata: { full_name: "Aluno Exemplo", role: "student" } },
      teacher: { id: "teacher-1", email: "prof@vetclass.com", user_metadata: { full_name: "Prof. Especialista", role: "teacher" } },
      admin: { id: "admin-1", email: "admin@vetclass.com", user_metadata: { full_name: "Administrador", role: "admin" } },
    };
    
    setSession({ user: mockUsers[role] } as any);
  };

  return (
    <AuthContext.Provider value={{ user: session?.user ?? null, session, loading, signOut, loginAs }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
