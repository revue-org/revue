io.use(function (socket, next): void {
    if (socket.handshake.query && socket.handshake.query.token) {
      if (jwtManager.verify(socket.handshake.query.token as string)) next()
    } else {
      next(new Error('Authentication error'))
    }
  })