export default {
  client: "pg",
  connection: {
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
  },
}
