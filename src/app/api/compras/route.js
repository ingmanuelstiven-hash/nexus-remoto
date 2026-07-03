import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Función auxiliar para obtener o crear el id_usuarios real de la base de datos
async function getOrCreateUserId(email, nombre = "Usuario Nexus") {
  if (!email) return null;
  
  // Buscar en la tabla usuarios por email
  const rows = await query("SELECT id_usuarios FROM usuarios WHERE email = $1", [email]);
  if (rows.length > 0) {
    return rows[0].id_usuarios;
  }
  
  // Si no existe, creamos el registro para mantener la integridad de la base de datos
  // Primero insertamos en la tabla login (requerido por constraint)
  const insertLoginRow = await query(
    `INSERT INTO login (usuario, contrasena) VALUES ($1, 'auth0-managed') RETURNING id_login`,
    [email]
  );
  const idLogin = insertLoginRow[0].id_login;

  // Luego insertamos en usuarios referenciando el id_login
  const insertRow = await query(
    `INSERT INTO usuarios (nombre, email, apellido, celular, ciudad, id_login) 
     VALUES ($1, $2, '', '', 'Bogotá', $3) RETURNING id_usuarios`,
    [nombre, email, idLogin]
  );
  return insertRow[0].id_usuarios;
}

// GET: Obtener historial de compras del usuario
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId"); // Puede ser el id_usuarios o el sub
    const email = searchParams.get("email");   // Correo del usuario

    // Resolvemos el id_usuarios real a partir del email o userId
    let realUserId = null;
    if (email) {
      realUserId = await getOrCreateUserId(email);
    } else if (userId && userId.includes("@")) {
      realUserId = await getOrCreateUserId(userId);
    } else if (userId) {
      const intId = parseInt(userId);
      if (!isNaN(intId)) {
        realUserId = intId;
      }
    }

    if (!realUserId) {
      return NextResponse.json({ error: "Usuario no identificado o no existe" }, { status: 400 });
    }

    const sql = `
      SELECT c.id_compras, c.fecha_de_compra, dc.valor, dc.cantidad, l.*
      FROM compras c
      JOIN d_compras dc ON c.id_compras = dc.id_compras
      JOIN libreria l ON dc.id_libreria = l.id_libreria
      WHERE c.id_usuarios = $1
      ORDER BY c.fecha_de_compra DESC
    `;

    const rows = await query(sql, [realUserId]);

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
    const { email, nombre, items } = body; // Esperamos email, nombre y los items del carrito

    if (!email || !items || items.length === 0) {
      return NextResponse.json({ error: "Datos incompletos para procesar compra" }, { status: 400 });
    }

    // Resolvemos o registramos el id_usuarios a partir del correo
    const idUsuarios = await getOrCreateUserId(email, nombre);

    if (!idUsuarios) {
      return NextResponse.json({ error: "No se pudo identificar o registrar al usuario" }, { status: 500 });
    }

    // 1. Insertamos la compra
    const insertCompra = await query(
      "INSERT INTO compras (id_usuarios) VALUES ($1) RETURNING id_compras",
      [idUsuarios]
    );
    const idCompras = insertCompra[0].id_compras;

    // 2. Insertamos cada item del carrito en la tabla de detalle d_compras
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
