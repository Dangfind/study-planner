import pg from "pg"

const { Pool } = pg

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL is not set, database queries will fail")
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.PGPOOL_MAX) || 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
})

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error", error)
})

export async function checkDatabaseConnection() {
  const client = await pool.connect()

  try {
    await client.query("SELECT 1")
    return true
  } finally {
    client.release()
  }
}

export async function closeDatabaseConnection() {
  await pool.end()
}
