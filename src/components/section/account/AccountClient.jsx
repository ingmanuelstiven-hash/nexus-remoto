"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { storeService } from "@/services/storeService";
import { User, Calendar, ShoppingBag, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

// ==========================================
// COMPONENTES STUB
// ==========================================
function AccountSidebar({ onTabChange, activeTab, onLogout }) {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => onTabChange("perfil")}
        className={`flex items-center gap-3 px-4 py-3 border rounded-xl font-medium transition-colors ${activeTab === "perfil" ? "bg-[#1e2939] text-white" : "hover:bg-slate-100 text-slate-700"
          }`}
      >
        <User size={18} /> Mi Perfil
      </button>

      <div className="pt-4 pb-1 px-2 text-[10px] font-bold text-slate-400 tracking-wider">ACTIVIDAD</div>

      <button
        onClick={() => onTabChange("historial-reservas")}
        className={`flex items-center gap-3 px-4 py-3 border rounded-xl font-medium transition-colors ${activeTab === "historial-reservas" ? "bg-[#1e2939] border-transparent text-white" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
          }`}
      >
        <Calendar size={18} /> Mis Reservas
      </button>

      <button
        onClick={() => onTabChange("historial-compras")}
        className={`flex items-center gap-3 px-4 py-3 border rounded-xl font-medium transition-colors ${activeTab === "historial-compras" ? "bg-[#1e2939] border-transparent text-white" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
          }`}
      >
        <ShoppingBag size={18} /> Mis Compras
      </button>

      <div className="pt-4 pb-1 px-2 text-[10px] font-bold text-slate-400 tracking-wider">AJUSTES</div>

      <button
        onClick={() => onTabChange("preferencias")}
        className={`flex items-center gap-3 px-4 py-3 border rounded-xl font-medium transition-colors ${activeTab === "preferencias" ? "bg-[#1e2939] border-transparent text-white" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
          }`}
      >
        <Settings size={18} /> Preferencias
      </button>

      <div className="border-t border-slate-300 my-2" />

      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors"
      >
        <LogOut size={18} /> Salir
      </button>
    </div>
  );
}

function HistoryItem({ compra }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 p-5 border border-border-light rounded-xl sm:items-center bg-white shadow-sm hover:shadow-md transition">
      <img
        src={compra.imagen || "https://placehold.net/120x180"}
        alt={compra.titulo}
        className="w-24 h-36 object-cover rounded-md border border-slate-100"
      />

      <div className="flex-1 space-y-1">
        <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full mb-1 uppercase tracking-wider">
          Completado
        </div>
        <h3 className="text-xl font-bold text-slate-900">{compra.titulo || "Libro Desconocido"}</h3>
        <p className="text-sm font-semibold text-amber-600">Orden #{compra.purchaseId || compra.id || "000"}</p>
        <div className="pt-2">
          <p className="text-xs text-slate-500">Precio total</p>
          <p className="text-lg font-bold text-slate-900">
            ${compra.precio ? Number(compra.precio).toLocaleString("es-CO") : "0"}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:items-end justify-between self-stretch py-1 gap-4 sm:gap-0">
        <span className="text-sm text-slate-600 font-medium">{compra.fecha || "9 feb 2025"}</span>
        <button className="px-5 py-2 bg-slate-900 text-white font-medium rounded-full text-sm hover:bg-slate-800 transition shadow-sm mt-auto">
          Ver detalles
        </button>
      </div>
    </div>
  );
}

export default function AccountClient() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [activeTab, setActiveTab] = useState("perfil");

  useEffect(() => {
    const loadPurchases = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const compras = await storeService.getPurchases(user.id);
        setPurchases(compras);
      } catch (error) {
        console.error("Error al cargar compras:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPurchases();
  }, [user]);

  const userProfile = {
    nombre: user?.nombre || "Usuario Nexus",
    email: user?.correo || user?.email || "usuario@nexus.com.co",
    rol: user?.rol || "Miembro",
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "perfil":
        return (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-8 border-b border-slate-300 text-center md:text-left">
              <div className="w-24 h-24 rounded-full border border-slate-800 bg-slate-300 flex items-center justify-center overflow-hidden">
                <User size={48} className="text-slate-500" />
              </div>
              <div className="flex flex-col items-center md:items-start pt-1">
                <h1 className="text-2xl font-bold text-black mb-1">{userProfile.nombre}</h1>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-400 text-black mb-2">
                  {userProfile.rol}
                </span>
                <p className="text-slate-600 font-medium">{userProfile.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h4 className="text-[10px] font-bold uppercase text-slate-400 mb-2 tracking-wider">Libro en préstamo</h4>
                <p className="text-lg font-bold text-black">El olvido que seremos</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h4 className="text-[10px] font-bold uppercase text-slate-400 mb-2 tracking-wider">Próximo coworking</h4>
                <p className="text-lg font-bold text-black">Sala 01 - Reunión</p>
              </div>
            </div>
          </div>
        );

      case "historial-compras":
        return (
          <div className="space-y-6">
            {loading ? (
              <p className="text-text-secondary">Cargando compras...</p>
            ) : purchases && purchases.length > 0 ? (
              purchases.map((compra) => (
                <HistoryItem key={compra.purchaseId || compra.id} compra={compra} />
              ))
            ) : (
              <div className="text-text-secondary">Aún no tienes compras registradas.</div>
            )}
          </div>
        );

      case "historial-reservas":
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Historial de Reservas</h3>
              <p className="text-text-secondary mb-6">Aquí podrás ver todas tus reservas.</p>

            </div>
          </div>
        );

      case "preferencias":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-6">Preferencias de Cuenta</h3>
              <div className="space-y-6">
                <div className="bg-bg-fill border border-border-light rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-text-primary mb-4">Notificaciones</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-text-primary">Recordatorios de préstamos</span>
                      <input type="checkbox" defaultChecked className="rounded border-border-light" />
                    </label>
                  </div>
                </div>
                <div className="pt-4">

                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-text-secondary">Sección en construcción.</div>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] max-w-6xl mx-auto w-full px-4 md:px-6 py-8 gap-8 flex-1 items-start">
      <aside className="bg-[#fcfcf9] border border-slate-200 rounded-2xl p-4 shadow-sm h-fit">
        <AccountSidebar onTabChange={setActiveTab} activeTab={activeTab} onLogout={handleLogout} />
      </aside>
      <main className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm min-h-[500px]">
        {renderTabContent()}
      </main>
    </div>
  );
}
