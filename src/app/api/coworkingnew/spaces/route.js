import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Obtenemos los espacios y verificamos si hay reservas activas en el momento
    const sql = `
      SELECT c.*, 
             r.id_reservas, r.fecha_inicial, r.fecha_final, r.estado,
             u.nombre as usuario_nombre, u.apellido as usuario_apellido
      FROM cooworking c
      LEFT JOIN reservas r ON c.id_cooworking = r.id_cooworking AND r.estado = 'Activo'
      LEFT JOIN usuarios u ON r.id_usuarios = u.id_usuarios
      ORDER BY c.nombre_espacio ASC
    `;
    
    const rows = await query(sql);

    const spaces = rows.map((row) => ({
      id: row.id_cooworking,
      nombre: row.nombre_espacio,
      tipo: row.tipo,
      capacidad: parseInt(row.capacidad) || 4,
      ocupado: row.estado === 'Activo',
      ocupadoPor: row.estado === 'Activo' ? `${row.usuario_nombre} ${row.usuario_apellido}` : null,
      horaInicio: row.estado === 'Activo' ? row.fecha_inicial : null,
      horaFin: row.estado === 'Activo' ? row.fecha_final : null,
    }));

    return NextResponse.json(spaces);
  } catch (error) {
    console.error("Error al obtener espacios:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
