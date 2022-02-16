import { pbkdf2Sync, randomBytes } from "crypto"

const hashPassword = (password, salt = randomBytes(32).toString("hex")) => [
  pbkdf2Sync(password, salt, 100000, 128, "sha512").toString("hex"),
  salt,
]

export default hashPassword
