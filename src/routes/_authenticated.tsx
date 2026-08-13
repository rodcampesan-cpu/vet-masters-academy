import { createFileRoute, Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_authenticated")({
  component: AuthGate,
});

function AuthGate() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
      return;
    }
    if (user && (location.pathname === "/app" || location.pathname === "/app/")) {
      const email = user.email?.toLowerCase()?.trim() || "";
      const isAdmin = user.user_metadata?.role === "admin" || email === "mimoshow10@gmail.com";
      const cleanEmail = email.replace(/\./g, '');
      const isTeacher = user.user_metadata?.role === "teacher" || email === "rodrigo.vetlat@hotmail.com" || email === "namdias02@gmail.com" || email === "carolina_vet@yahoo.com.br" || cleanEmail.includes("nathyarmarinhos");
      
      if (isAdmin) {
        navigate({ to: "/app/admin" });
      }
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-coral border-t-transparent" />
      </div>
    );
  }
  return <Outlet />;
}
