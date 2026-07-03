import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET: Obtener historial de compras del usuario
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId"); // Espera el id_usuarios

    if (!userId) {
      return NextResponse.json({ error: "Falta userId" }, { status: 400 });
    }

    const sql = `
      SELECT c.id_compras, c.fecha_de_compra, dc.valor, dc.cantidad, l.*
      FROM compras c
      JOIN d_compras dc ON c.id_compras = dc.id_compras
      JOIN libreria l ON dc.id_libreria = l.id_libreria
      WHERE c.id_usuarios = $1
      ORDER BY c.fecha_de_compra DESC
    `;

    const rows = await query(sql, [userId]);

    const compras = rows.map((row) => ({
      id: row.id_compras,
      fechaCompra: row.fecha_de_compra,
      precioPagado: Number(row.valor),
      cantidad: row.cantidad,
      libro: {
        id: row.id_libreria,
        titulo: row.nombre,
        autor: row.editorial,
        categoria: row.categoria,
        precio: Number(row.valor),
        imagen: row.imagen,
      },
    }));

    return NextResponse.json({ compras });
  } catch (error) {
    console.error("Error al obtener compras:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}

// POST: Registrar nueva compra
export async function POST(request) {
  try {
    const body = await request.json();
    const { idUsuarios, items } = body; // items debe ser un array de { idLibreria, valor, cantidad }

    if (!idUsuarios || !items || items.length === 0) {
      return NextResponse.json({ error: "Datos incompletos para procesar compra" }, { status: 400 });
    }

    // 1. Insertamos en compras para obtener id_compras
    const insertCompra = await query(
      "INSERT INTO compras (id_usuarios) VALUES ($1) RETURNING id_compras",
      [idUsuarios]
    );
    const idCompras = insertCompra[0].id_compras;

    // 2. Insertamos cada detalle en d_compras
    for (const item of items) {
      await query(
        `INSERT INTO d_compras (id_compras, id_libreria, estado_compra, valor, cantidad) 
         VALUES ($1, $2, 'Completado', $3, $4)`,
        [idCompras, item.idLibreria, item.valor, item.cantidad]
      );
    }

    return NextResponse.json({ message: "Compra registrada con éxito", idCompras }, { status: 201 });
  } catch (error) {
    console.error("Error al registrar compra:", error);
    return NextResponse.json({ error: "Error interno al procesar la compra" }, { status: 500 });
  }
}
