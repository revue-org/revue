import { config } from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import * as console from 'console'
import HttpStatusCode from './HttpStatusCode.js'

config()

class JWTManager {
  private jwt: any
  private readonly secret: any

  constructor() {
    this.jwt = jsonwebtoken
    this.secret = process.env.JWT_SECRET
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
    if (token == null) return res.status(HttpStatusCode.FORBIDDEN)

    console.log('Authentication token: ' + token)
    this.jwt.verify(token, this.secret, (err: any, user: any) => {
      if (err) return res.sendStatus(HttpStatusCode.UNAUTHORIZED)
      console.log(user)
      next()
    })
  }
}

export const jwtManager: JWTManager = new JWTManager()
