import express from "express"
import knex from "knex"
import { Model } from "objection"
import knexfile from "./knexfile.js"
import sessionRoutes from "./src/routes/session.js"

const db = knex(knexfile)
const app = express()
const port = process.env.PORT

Model.knex(db)

app.use(express.json())

sessionRoutes({ app })

app.listen(port, () => console.log(`🎉 Listening on :${port}`))
