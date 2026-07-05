import { Pool } from 'pg';

// Validación rápida para alertar si falta la URL
if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR CRÍTICO: La variable DATABASE_URL no está definida en el entorno.");
}

const pool =
  global.__pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Requerido por Neon
    },
  });

if (process.env.NODE_ENV !== 'production') {
  global.__pgPool = pool;
}

export { pool };

export async function query(sql, params = []) {
  try {
    const { rows } = await pool.query(sql, params);
    return rows;
  } catch (error) {
 
    
    // Volvemos a lanzar el error para que el componente de Next.js sepa que falló
    throw error;
  }
}