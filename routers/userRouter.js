import express from 'express';
import routes from '../routes';
import { userDetail, getChangePassword, postChangePassword, getEditProfile, postEditProfile, me} from '../controllers/userController';
import { onlyPrivate, uploadAvatar } from '../middlewares';

const userRouter = express.Router();

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.me, onlyPrivate, me)

userRouter.get(routes.userDetail(), userDetail);


export default userRouter;