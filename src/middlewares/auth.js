import jsonwebtoken from "jsonwebtoken"
import UserModel from "../models/User.js"

const { JsonWebTokenError } = jsonwebtoken

const auth = async (req, res, next) => {
  const {
    headers: { authentication },
  } = req

  try {
    const {
      payload: {
        user: { email },
      },
    } = jsonwebtoken.verify(authentication, process.env.JWT_SECRET)

    req.user = await UserModel.query().findOne({ email })

    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      res.status(401).send({ error: "no pasaran" })

      return
    }

    res.status(500).send({ error: "oops." })
  }
}

export default auth
