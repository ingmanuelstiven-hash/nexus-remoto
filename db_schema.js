const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_1PjWc3TzruNs@ep-little-glitter-actuu44m-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }
});

async function check() {
  const { rows: loginCols } = await pool.query("SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'login'");
  console.log('Login cols:', loginCols);
  const { rows: usrCols } = await pool.query("SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'usuarios'");
  console.log('Usuarios cols:', usrCols);
  process.exit(0);
}
check();
