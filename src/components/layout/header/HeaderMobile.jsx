"use client";

import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

function HeaderMobile({ open, user, totalItems, onClose, onLogout }) {
  const [mounted, setMounted] = useState(false);

  useLockBodyScroll(open);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[998]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* DRAWER */}
          <motion.aside
            className="
              fixed top-0 right-0
              h-[100dvh] w-72
              bg-white z-[999]
              shadow-2xl
              flex flex-col
              overflow-y-auto
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}

            // 🔥 swipe
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.x > 80) onClose();
            }}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-semibold">Menú</h2>
              <button onClick={onClose} className="text-xl">✕</button>
            </div>

            {/* USER */}
            {user && (
              <div className="px-6 py-4 border-b">
                <p className="font-semibold">{user.nombre}</p>
                <p className="text-sm text-text-secondary">
                  {user.correo}
                </p>
              </div>
            )}

            {/* NAV */}
            <nav className="flex-1 px-6 py-6 flex flex-col gap-4 text-sm">

              {!user && (
                <Link href="/login" onClick={onClose}>
                  Login
                </Link>
              )}

              {user && (
                <>
                  <Link href="/library" onClick={onClose}>📚 Librería</Link>
                  <Link href="/coworking" onClick={onClose}>💼 Coworking</Link>

                  <Link href="/cart" onClick={onClose}>
                    🛒 Carrito ({totalItems})
                  </Link>
                  <Link href="/account" onClick={onClose}>👤 Mi cuenta</Link>
                  
                  <div className="border-t border-border-default my-2"></div>
                  
                  <button 
                    onClick={() => {
                      if (onLogout) onLogout();
                      onClose();
                    }} 
                    className="flex items-center gap-2 text-red-500 font-medium text-left mt-2"
                  >
                    <LogOut size={18} /> Cerrar sesión
                  </button>
                </>
              )}
            </nav>

            {/* FOOTER */}
            {user && (
              <div className="p-6 border-t">
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 text-red-500"
                >
                  <LogOut size={16} />
                  Cerrar sesión
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body // 🔥 CLAVE
  );
}

export default HeaderMobile;