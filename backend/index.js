import "dotenv/config"

import { checkDatabaseConnection, closeDatabaseConnection } from "./db.js"

import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(morgan("dev"))

app.get("/health", (_request, response) => {
  response.json({ status: "ok" })
})

app.get("/health/db", async (_request, response) => {
  try {
    await checkDatabaseConnection()
    response.json({ status: "ok", database: "up" })
  } catch (error) {
    console.error("Database health check failed", error)
    response.status(503).json({ status: "error", database: "down" })
  }
})

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Backend listening on port ${port}`)
})

async function shutdown(signal) {
  console.log(`${signal} received, shutting down`)

  server.close(async () => {
    try {
      await closeDatabaseConnection()
    } catch (error) {
      console.error("Failed to close database pool", error)
    } finally {
      process.exit(0)
    }
  })
}

process.on("SIGINT", () => {
  void shutdown("SIGINT")
})

process.on("SIGTERM", () => {
  void shutdown("SIGTERM")
})

