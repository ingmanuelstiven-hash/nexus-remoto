"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    tarjeta: "",
  });

  const [errors, setErrors] = useState({});

  const total = cart.reduce(
    (acc, item) =>
      acc + Number(item.precio || 0) * Number(item.cantidad || 0),
    0
  );

  // 🔥 VALIDACIONES
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

    // 🔥 formatear tarjeta
    if (e.target.name === "tarjeta") {
      value = value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }

    setForm({ ...form, [e.target.name]: value });

    // limpiar error en vivo
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setLoading(true);

    await new Promise((res) => setTimeout(res, 1200));

    clearCart();
    router.push("/success");
  };

  if (!cart.length) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p>Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-[1fr_400px] gap-10">

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">

        <h1 className="text-3xl font-bold">Checkout</h1>

        {/* NOMBRE */}
        <div>
          <input
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            className="input w-full"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nombre}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            className="input w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* TARJETA */}
        <div>
          <input
            name="tarjeta"
            placeholder="1234 5678 9012 3456"
            value={form.tarjeta}
            onChange={handleChange}
            className="input w-full tracking-widest"
          />
          {errors.tarjeta && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tarjeta}
            </p>
          )}
        </div>

        {/* BOTÓN */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? "Procesando..." : `Pagar $${total.toLocaleString()}`}
        </button>

      </form>

      {/* RESUMEN */}
      <aside className="bg-white border rounded-xl p-6 h-fit shadow-sm">

        <h2 className="font-semibold mb-4">Resumen</h2>

        <div className="space-y-3 text-sm">
          {cart.map((item) => (
            <div key={item.bookId} className="flex justify-between">
              <span>{item.titulo}</span>
              <span>
                ${(item.precio * item.cantidad).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>

      </aside>

    </div>
  );
}

export default CheckoutPage;