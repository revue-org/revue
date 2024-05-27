authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(HttpStatusCode.FORBIDDEN)

    console.log('Authentication token: ' + token)
    this.jwt.verify(token, this.secret, (err: any, _user: any) => {
      if (err) return res.sendStatus(HttpStatusCode.UNAUTHORIZED)
      next()
    })
  }