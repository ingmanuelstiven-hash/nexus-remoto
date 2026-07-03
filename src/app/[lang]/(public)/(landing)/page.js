import Hero from "@/components/section/home/Hero";
import Services from "@/components/section/home/Services";
import Pricing from "@/components/section/home/Pricing";
import TopBooks from "@/components/section/home/TopBooks";
import { query } from "@/lib/db";

// Habilitar ISR (Incremental Static Regeneration) - Revalida cada 60 segundos
export const revalidate = 60;

async function getTopBooks() {
  try {
    const rows = await query(`
      SELECT l.*, COALESCE(SUM(dc.cantidad), 0) as total_vendido
      FROM libreria l
      LEFT JOIN d_compras dc ON l.id_libreria = dc.id_libreria
      GROUP BY l.id_libreria
      ORDER BY total_vendido DESC, l.id_libreria DESC
      LIMIT 10
    `);
    
    return rows.map((row) => ({
      id: row.id_libreria,
      titulo: row.nombre,
      autor: row.editorial,
      categoria: row.categoria,
      precio: Number(row.valor),
      imagen: row.imagen,
      masVendido: true,
      anioPublicacion: row.ano,
      sinopsis: row.sinopsis,
    }));
  } catch (error) {
    console.error("Error fetching top books directly from DB on landing page:", error);
    return [];
  }
}

async function Home() {
  const topBooks = await getTopBooks();

  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1">

        {/* HERO */}
        <section className="pt-10">
          <Hero />
        </section>

        {/* TOP BOOKS (SSG + ISR) */}
        <section className="mt-16 bg-slate-50/50 border-y border-slate-100">
          <TopBooks books={topBooks} />
        </section>

        {/* SERVICES */}
        <section className="mt-20">
          <Services />
        </section>

        {/* PRICING */}
        <section className="mt-24 mb-10">
          <Pricing />
        </section>

      </main>
    </div>
  );
}

export default Home;