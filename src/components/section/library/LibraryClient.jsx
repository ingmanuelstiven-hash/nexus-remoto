"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BookCard from "@/components/ui/library/BookCard";
import LibraryFilters from "@/components/section/library/LibraryFilters";

export default function LibraryClient({ libros }) {
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <main className="min-h-dvh-minusheader mx-auto relative max-w-7xl">
      {/* BOTÓN FILTROS MOBILE */}
      <div className="md:hidden p-5 pb-0">
        <button
          onClick={() => setOpenFilters(true)}
          className="btn-secondary w-full py-2"
        >
          Filtrar por
        </button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-[250px_1fr]">
        {/* SIDEBAR */}
        <aside
          className="
            hidden md:flex md:flex-col
            md:border-r md:border-border-default
            md:sticky md:top-[68px]
            md:h-[calc(100dvh-68px)]
            p-5 lg:p-6
          "
        >
          <LibraryFilters />
        </aside>

        {/* CATÁLOGO */}
        <section className="w-full relative">
          <motion.div
            layout
            className="
              grid gap-5 p-5 lg:p-6
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
            "
          >
            <AnimatePresence mode="popLayout">
              {libros?.length > 0 ? (
                libros.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <BookCard libro={item} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center py-20">
                  <p className="text-text-secondary text-center">
                    No hay libros disponibles.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </section>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {openFilters && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setOpenFilters(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <button
                className="absolute top-4 right-4 text-2xl"
                onClick={() => setOpenFilters(false)}
              >
                x
              </button>

              <div className="flex-1 overflow-y-auto p-6">
                <LibraryFilters />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}