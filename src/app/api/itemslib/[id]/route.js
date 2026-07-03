import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request, { params }) {
  try {

    const resolvedParams = await params;
    const { id } = resolvedParams;

    const rows = await query("SELECT * FROM libreria WHERE id_libreria = $1", [id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Libro no encontrado" }, { status: 404 });
    }

    const row = rows[0];
    const libro = {
      id: row.id_libreria,
      titulo: row.nombre,
      autor: row.editorial,
      categoria: row.categoria,
      precio: Number(row.valor),
      imagen: row.imagen,
      anioPublicacion: row.ano,
      sinopsis: row.sinopsis,
    };

    return NextResponse.json(libro);
  } catch (error) {
    console.error("Error al obtener libro:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
