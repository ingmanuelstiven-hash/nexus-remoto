"use client";

import { useRouter } from "next/navigation";
import { House } from "lucide-react";

function Login() {
  const router = useRouter();

  const handleGoogleLogin = () => {
    // Redirigir al flujo oficial de Auth0
    router.push("/auth/login");
  };

  return (
    <section className="min-h-dvh flex items-center justify-center px-4 login-page">
      <div className="relative w-full max-w-md login-card rounded-[2rem] p-8 sm:p-10 bg-slate-200">
        {/* HOME */}
        <button
          onClick={() => router.replace("/")}
          className="inline-flex items-center gap-2 rounded-full login-home-pill px-4 py-2 text-sm font-semibold shadow-lg shadow-slate-900/10"
        >
          <House size={18} />
          Home
        </button>

        {/* LOGO */}
        <div className="flex justify-center my-8">
          <img src="/img/nexus.svg" alt="Nexus" className="w-36" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-slate-950 mb-4">
          Iniciar sesión
        </h2>

        <p className="text-sm text-slate-600 text-center mb-8">
          Accede de forma rápida y segura utilizando tu cuenta institucional.
        </p>

        {/* INICIAR SESIÓN CON GOOGLE (AUTH0) */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-slate-900 border border-slate-300 shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-all duration-200"
        >
          {/* SVG GOOGLE LOGO con dimensiones fijas obligatorias mediante inline styles */}
          <svg 
            viewBox="0 0 24 24" 
            style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', display: 'block' }}
          >
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.49 3.77v3.12h4.01c2.34-2.16 3.69-5.32 3.69-8.74z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.89-3.02c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.21v3.22C3.18 21.82 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.27 14.27a7.18 7.18 0 0 1 0-4.54V6.51H1.21a11.94 11.94 0 0 0 0 10.98l4.06-3.22z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.96 1.19 15.24 0 12 0 7.31 0 3.18 2.18 1.21 5.79l4.06 3.22c.95-2.85 3.6-4.96 6.73-4.96z"
            />
          </svg>
          <span>Iniciar sesión con Google</span>
        </button>

        {/* DEMO ACCESOS */}
        <div className="flex flex-col gap-1 mt-8 p-4 login-panel rounded-3xl text-[11px] font-medium bg-brand-200/50 text-slate-800">
          <p className="font-bold">Acceso institucional:</p>
          <p>Usa el botón de Google para iniciar sesión mediante tu cuenta universitaria vinculada a Auth0.</p>
        </div>
      </div>
    </section>
  );
}

export default Login;