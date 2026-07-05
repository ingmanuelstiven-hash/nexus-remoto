"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle2, ArrowRight, ShoppingBag, BookOpen } from "lucide-react";
import { useI18n } from "@/context/TranslationsProvider";

function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const t = useI18n();
  const params = useParams();
  const lang = params?.lang || "es";

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [apiError, setApiError] = useState("");

  const [form, setForm] = useState({
    nombre: user?.nombre || "",
    email: user?.correo || "",
    tarjeta: "",
  });

  const [errors, setErrors] = useState({});

  const total = cart.reduce(
    (acc, item) => acc + Number(item.precio || 0) * Number(item.cantidad || 0),
    0
  );

  // Validaciones del formulario
  const validate = () => {
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = "Nombre requerido";
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Email inválido";
    }

    if (form.tarjeta.replace(/\s/g, "").length < 16) {
      newErrors.tarjeta = "Tarjeta inválida";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    let value = e.target.value;

    // Formatear el número de tarjeta (espacios cada 4 dígitos)
    if (e.target.name === "tarjeta") {
      value = value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }

    setForm({ ...form, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setLoading(true);

    try {
      // Registramos la compra real en la base de datos PostgreSQL
      const response = await fetch("/api/compras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.correo || form.email,
          nombre: user?.nombre || form.nombre,
          items: cart.map((item) => ({
            idLibreria: item.bookId,
            valor: item.precio,
            cantidad: item.cantidad,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo procesar el pago");
      }

      // Guardamos la información de éxito
      setSuccessData({
        orderId: data.idCompras,
        total: total,
        items: [...cart],
      });

      // Limpiamos el carrito local
      clearCart();
    } catch (err) {
      setApiError(err.message || "Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Ventana de Éxito de Compra
  if (successData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#fcfcf9]">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-[2.5rem] p-8 text-center shadow-xl shadow-slate-900/5">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 animate-bounce">
              <CheckCircle2 size={48} />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-950 mb-3 tracking-tight">
            {t.checkout.success}
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            {t.checkout.success_desc}
          </p>

          {/* Resumen de orden */}
          <div className="bg-slate-50 rounded-2xl p-5 mb-8 text-left border border-slate-100">
            <div className="flex justify-between text-xs text-slate-400 font-bold mb-3 uppercase tracking-wider">
              <span>{t.checkout.order} #{successData.orderId}</span>
              <span>{t.checkout.completed}</span>
            </div>
            
            <div className="space-y-3 mb-4 border-b border-slate-200 pb-4">
              {successData.items.map((item) => (
                <div key={item.bookId} className="flex justify-between text-sm text-slate-800">
                  <span className="truncate max-w-[200px] font-medium">{item.titulo}</span>
                  <span className="font-semibold">x{item.cantidad}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-slate-950 text-base">
              <span>{t.checkout.total_paid}</span>
              <span>${successData.total.toLocaleString("es-ES")}</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                // Forzar refresco para ver el top actualizado en el home
                router.push(`/${lang}/`);
                setTimeout(() => router.refresh(), 200);
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              <BookOpen size={16} />
              {t.checkout.back_library}
            </button>
            <button
              onClick={() => router.push(`/${lang}/account?tab=historial-compras`)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <ShoppingBag size={16} />
              {t.checkout.view_purchases}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-[#fcfcf9]">
        <div className="text-center space-y-4">
          <div className="text-5xl">🛒</div>
          <h2 className="text-2xl font-bold text-slate-950">{t.checkout.empty_title}</h2>
          <p className="text-sm text-slate-500 max-w-sm">
            {t.checkout.empty_desc}
          </p>
          <button
            onClick={() => router.push(`/${lang}/library`)}
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            {t.checkout.explore_catalog}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-[#fcfcf9] min-h-[85vh]">
      <h1 className="text-3xl font-extrabold text-slate-950 mb-8 tracking-tight">{t.checkout.title}</h1>

      <div className="grid md:grid-cols-[1fr_400px] gap-10">
        {/* Formulario de Pago */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 border-b pb-3 mb-6">{t.checkout.billing_details}</h2>

          {apiError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
              {apiError}
            </div>
          )}

          {/* Nombre completo */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">{t.checkout.fullname}</label>
            <input
              name="nombre"
              type="text"
              placeholder="Ej: Manuel Rodríguez"
              value={form.nombre}
              onChange={handleChange}
              className="input w-full bg-slate-50 border-slate-200"
              required
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs font-semibold">{errors.nombre}</p>
            )}
          </div>

          {/* Correo */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">{t.checkout.email}</label>
            <input
              name="email"
              type="email"
              placeholder="Ej: manuel@universidad.edu.co"
              value={form.email}
              onChange={handleChange}
              className="input w-full bg-slate-50 border-slate-200"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-semibold">{errors.email}</p>
            )}
          </div>

          {/* Número de Tarjeta */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">{t.checkout.card_number}</label>
            <input
              name="tarjeta"
              type="text"
              maxLength="19"
              placeholder="4000 1234 5678 9010"
              value={form.tarjeta}
              onChange={handleChange}
              className="input w-full bg-slate-50 border-slate-200 tracking-widest"
              required
            />
            {errors.tarjeta && (
              <p className="text-red-500 text-xs font-semibold">{errors.tarjeta}</p>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 rounded-full bg-slate-950 px-6 py-4 text-base font-semibold text-white shadow-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? t.checkout.processing : `${t.checkout.pay_btn} $${total.toLocaleString("es-ES")}`}
          </button>
        </form>

        {/* Resumen del Pedido */}
        <aside className="bg-[#f3f4f1]/50 border border-slate-200 rounded-3xl p-6 h-fit shadow-sm">
          <h2 className="font-extrabold text-lg text-slate-900 mb-4 tracking-tight">{t.checkout.order_summary}</h2>

          <div className="space-y-4 text-sm mb-6 max-h-[300px] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.bookId} className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{item.titulo}</p>
                  <p className="text-xs text-slate-500">Cantidad: {item.cantidad}</p>
                </div>
                <span className="font-bold text-slate-950">
                  ${(item.precio * item.cantidad).toLocaleString("es-ES")}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4 flex justify-between font-bold text-slate-950 text-lg">
            <span>Total</span>
            <span>${total.toLocaleString("es-ES")}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CheckoutPage;
// FORCE_REBUILD_1783124179838
