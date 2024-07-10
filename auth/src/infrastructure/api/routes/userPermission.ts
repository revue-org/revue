import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'
import { permissionController } from '@/infrastructure/api/controllers/userPermission.js'
import { ZodUserPresenter } from '@/presentation/api/impl/ZodUserPresenter.js'
import { UserPresenter } from '@/presentation/api/UserPresenter'
import { UserUpdate } from '@/presentation/api/schemas/UserSchemas'

export const userPermission: Router = express.Router()
const userPresenter: UserPresenter = new ZodUserPresenter()

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
  try {
    const userMsg: UserUpdate = userPresenter.parseUpdate(req.body)
    permissionController.addPermissions(req.params.userId, userMsg.permissions).then((): void => {
      res.status(HttpStatusCode.OK).send('Permission added')
    })
  } catch (err) {
    res.status(HttpStatusCode.UNAUTHORIZED).send(err)
  }
})

userPermission.route('/:userId').put((req: Request, res: Response): void => {
  try {
    const userMsg: UserUpdate = userPresenter.parseUpdate(req.body)
    permissionController.updatePermissions(req.params.userId, userMsg.permissions).then((): void => {
      res.status(HttpStatusCode.OK).send('Permissions updated')
    })
  } catch (err) {
    res.status(HttpStatusCode.UNAUTHORIZED).send(err)
  }
})

userPermission.route('/:userId').delete((req: Request, res: Response): void => {
  try {
    const userMsg: UserUpdate = userPresenter.parseUpdate(req.body)
    permissionController.deletePermissions(req.params.userId, userMsg.permissions).then((): void => {
      res.status(HttpStatusCode.OK).send('Permission deleted')
    })
  } catch (err) {
    res.status(HttpStatusCode.UNAUTHORIZED).send(err)
  }
})
