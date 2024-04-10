import jsonwebtoken from 'jsonwebtoken'
import { Request, Response } from 'express'
import { Connect } from 'vite'
import { UserInfo } from './UserInfo.js'
import NextFunction = Connect.NextFunction
import { config } from 'dotenv'

config({ path: process.cwd() + '/../.env' })

class JWTManager {
  private jwt: any
  private readonly secret?: string
  private readonly refreshSecret?: string

  constructor() {
    this.jwt = jsonwebtoken
    this.secret = process.env.JWT_SECRET
    this.refreshSecret = process.env.JWT_REFRESH_SECRET
  }

  /**
   * Creates a new token for the user access. The token will expire in 15 minutes.
   * @param {Object} payload the payload to serialize in the token
   * @returns {String} the access token string
   */
  generateAccessToken(payload: UserInfo): string {
    return this.jwt.sign(payload, this.secret, { expiresIn: '12h' })
  }

  /**
   * Creates a new token which user will use to refresh and obtain a new access token.
   * The token has no expiration time.
   * @param {Object} payload the payload to serialize in the token
   * @returns {String} the refresh token string
   */
  generateRefreshToken(payload: UserInfo): string {
    return this.jwt.sign(payload, this.refreshSecret)
  }

  /**
   * Checks if the token sent by the user is valid.
   * Responds with a 401 if there is no token.
   * Responds with a 403 if there is a token but is no longer valid.
   * @param {Request} req the request object
   * @param {Response} res the response object
   * @param {NextFunction} next the function to call next the authentication
   */
  authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(403)

    console.log('Authentication token: ' + token)
    this.jwt.verify(token, this.secret, (err: any, _user: any) => {
      if (err) return res.sendStatus(401)
      next()
    })
  }

  verify(token: string, callback: (_err: Error, _infos: UserInfo) => Promise<void>): void {
    this.jwt.verify(token, this.refreshSecret, callback)
  }
}

export const jwtManager: JWTManager = new JWTManager()
