import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'
import { permissionController } from '@/infrastructure/api/controllers/userPermission.js'

export const userPermission: Router = express.Router()

userPermission.route('/').get((req: Request, res: Response): void => {
  permissionController
    .getPermissions()
    .then((permissions: string[]): void => {
      res.status(HttpStatusCode.OK).send(permissions)
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userPermission.route('/:userId').get((req: Request, res: Response): void => {
  permissionController
    .getPermissionsByUserId(req.params.userId)
    .then((permissions: string[]): void => {
      res.status(HttpStatusCode.OK).send(permissions)
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userPermission.route('/:userId').post((req: Request, res: Response): void => {
  permissionController
    .addPermissions(req.params.userId, req.body.permissions)
    .then((): void => {
      res.status(HttpStatusCode.OK).send('Permission added')
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userPermission.route('/:userId').put((req: Request, res: Response): void => {
  permissionController
    .updatePermissions(req.params.userId, req.body.permissions)
    .then((): void => {
      res.status(HttpStatusCode.OK).send('Permissions updated')
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userPermission.route('/:userId').delete((req: Request, res: Response): void => {
  permissionController
    .deletePermissions(req.params.userId, req.body.permissions)
    .then((): void => {
      res.status(HttpStatusCode.OK).send('Permission deleted')
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})
