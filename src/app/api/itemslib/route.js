import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const masVendido = searchParams.get("masVendido");
    const categoria = searchParams.get("categoria");
    const anio = searchParams.get("anio");

    let sql = "";
    const params = [];

    if (masVendido === "true") {
      // Calculamos dinámicamente los 10 más vendidos de la tabla libreria usando d_compras
      sql = `
        SELECT l.*, COALESCE(SUM(dc.cantidad), 0) as total_vendido
        FROM libreria l
        LEFT JOIN d_compras dc ON l.id_libreria = dc.id_libreria
        GROUP BY l.id_libreria
        ORDER BY total_vendido DESC, l.id_libreria DESC
        LIMIT 10
      `;
    } else {
      sql = "SELECT * FROM libreria WHERE 1=1";
      if (categoria) {
        params.push(categoria);
        sql += ` AND categoria = $${params.length}`;
      }
      if (anio) {
        params.push(parseInt(anio));
        sql += ` AND ano = $${params.length}`;
      }
      sql += " ORDER BY id_libreria DESC";
    }

    const rows = await query(sql, params);

    const libros = rows.map((row) => ({
      id: row.id_libreria,
      titulo: row.nombre,
      autor: row.editorial,
      categoria: row.categoria,
      precio: Number(row.valor),
      imagen: row.imagen,
      masVendido: masVendido === "true" || (row.total_vendido && Number(row.total_vendido) > 0),
      anioPublicacion: row.ano,
      sinopsis: row.sinopsis,
    }));

    return NextResponse.json(libros);
  } catch (error) {
    console.error("Error al obtener libros:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
