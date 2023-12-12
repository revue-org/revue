import { userController } from '../controller/user.js'
import express from 'express'

export const userRouter = express.Router()

userRouter.route('/login').post((req, res) => {
  userController.login(req, res)
})

userRouter.route('/logout').post((req, res) => {})

userRouter.route('/newToken').post((req, res) => {}) /*
app.post('/login', async (req, res) => {
  const userId = await dbUserManager.getIdByUsername(req.body.username);
  if (!userId) return res.status(400).send('User not found');

  const userPassword = await dbUserManager.getUserPassword(userId);
  const match = await bcrypt.compare(req.body.password, userPassword);
  if (!match) return res.status(401).send('Wrong password');

  const user = {
    id: userId,
    username: req.body.username
  };
  const accessToken = jwtManager.generateAccessToken(user);
  const refreshToken = jwtManager.generateRefreshToken(user);
  await dbUserManager.setUserToken(userId, refreshToken);

  res.json({accessToken: accessToken, refreshToken: refreshToken, userId: userId});
});

app.put("/newToken", (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken == null) return res.sendStatus(401);
  // if in database is not present the refresh token
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwtManager.jwt.verify(refreshToken, jwtManager.refreshSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwtManager.generateAccessToken({username: user.username});
    res.json({accessToken: accessToken});
  });
});

app.delete('/logout', async (req, res) => {
  // remove from database the user refresh token
  console.log(await dbUserManager.removeUserToken(req.body.id));
  res.sendStatus(204);
});*/
