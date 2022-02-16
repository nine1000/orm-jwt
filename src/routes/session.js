import jsonwebtoken from "jsonwebtoken"
import hashPassword from "../hashPassword.js"
import auth from "../middlewares/auth.js"
import UserModel from "../models/User.js"

const sessionRoutes = ({ app }) => {
  app.post("/sign-up", async (req, res) => {
    const {
      body: { email, password },
    } = req

    const user = await UserModel.query().findOne({ email })

    if (user) {
      res.send({ status: "OK" })

      return
    }

    const [hash, salt] = hashPassword(password)

    await UserModel.query().insert({
      email,
      passwordHash: hash,
      passwordSalt: salt,
    })

    res.send({ status: "OK" })
  })

  app.post("/sign-in", async (req, res) => {
    const {
      body: { email, password },
    } = req

    const user = await UserModel.query().findOne({ email })

    if (!user) {
      res.status(401).send({ error: "y a pas, wesh." })

      return
    }

    const [hash] = hashPassword(password, user.passwordSalt)

    if (hash !== user.passwordHash) {
      res.status(401).send({ error: "y a pas, wesh." })

      return
    }

    const jwt = jsonwebtoken.sign(
      {
        payload: {
          user: {
            email: user.email,
            id: user.id,
          },
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "2 days" }
    )

    res.send(jwt)
  })

  app.get("/session", auth, async (req, res) => {
    res.send(req.user)
  })
}

export default sessionRoutes
