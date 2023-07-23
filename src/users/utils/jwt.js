import jwt from 'jsonwebtoken'
import { HTTP_STATUSES } from '../../shared/constants/index.js'
import { Err } from '../../shared/helpers/error.js'
import config from '../../config/index.js'
const { SECRET_KEY } = config

const generateToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: 60 })

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err && err?.message === 'jwt expired') reject(new Err('Token expired', HTTP_STATUSES.FORBIDDEN))
      if (err) reject(new Err('Token not valid. Unauthorized', HTTP_STATUSES.FORBIDDEN))
      // you need to implement verification token renewal both in the back and in the front

      resolve(decoded)
    })
  })
}

export { generateToken, verifyToken }
