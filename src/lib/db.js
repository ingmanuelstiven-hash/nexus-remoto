import { Pool } from 'pg';

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
  const { rows } = await pool.query(sql, params);
  return rows;
}
