import cors from "cors"
import "dotenv/config"
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

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend listening on port ${port}`)
})
