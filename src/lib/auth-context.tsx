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
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica mock local primeiro
    const mockRole = localStorage.getItem("mock_auth_role");
    if (mockRole) {
      setSession(createMockSession(mockRole as any));
      setLoading(false);
    } else {
      // Busca a sessão inicial
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      });
    }

    // Escuta mudanças (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!localStorage.getItem("mock_auth_role")) {
        setSession(session);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const createMockSession = (role: "student" | "teacher" | "admin"): any => ({
    access_token: "fake-token",
    refresh_token: "fake-refresh",
    expires_in: 99999,
    token_type: "bearer",
    user: {
      id: "mock-id-123",
      app_metadata: {},
      user_metadata: { role, full_name: "Visitante VIP" },
      aud: "authenticated",
      created_at: new Date().toISOString(),
      email: role === "admin" ? "admin@teste.com" : role === "teacher" ? "prof@teste.com" : "aluno@teste.com"
    }
  });

  const signOut = async () => {
    localStorage.removeItem("mock_auth_role");
    setSession(null);
    await supabase.auth.signOut();
  };

  const loginAs = (role: "student" | "teacher" | "admin") => {
    localStorage.setItem("mock_auth_role", role);
    setSession(createMockSession(role));
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
