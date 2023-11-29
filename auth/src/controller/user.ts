import type { Request, Response } from 'express'
import { User } from 'domain/dist/domain/monitoring/core/User'
import { userSchema } from 'domain/dist/storage/monitoring/schemas/UserSchema'
import { MyMonitoringRepository } from 'domain/dist/storage/monitoring/MyMonitoringRepository'
import { Model, model } from "mongoose";

const mod = model("user", userSchema, "user")

const userManager: MyMonitoringRepository = new MyMonitoringRepository(model<User>("user", userSchema, "user"))

export const userController = {

  login: async (req: Request, res: Response) => {
    try {

      const user: User = await userManager.getUser(req.body.username)
      res.json(user);
/*
      const match = req.body.password === user.getPassword()
//      const match = await bcrypt.compare(req.body.password, userPassword);
      if (!match) return res.status(401).send('Wrong password');

      const infos = {
        id: user.getUserId(),
        username: user.getUsername()
      };
      const accessToken = jwtManager.generateAccessToken(user);
      const refreshToken = jwtManager.generateRefreshToken(user);
      await dbUserManager.setUserToken(userId, refreshToken);

      res.json({accessToken: accessToken, refreshToken: refreshToken, userId: userId});
*/

      //res.json(await deviceModel.findById(req.params.id))
    } catch (err) {
      console.log(err)
    }
  }
}
