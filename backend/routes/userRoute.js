import exprex from 'express'
import { getprofile, LoginUser, registerUser, updateProfile } from '../controllers/userController.js'
import authUser from '../moddlewares/authUser.js';
import upload from '../moddlewares/multer.js';

const userRouter = exprex.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',LoginUser)

userRouter.get('/get-profile',authUser,getprofile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)

export default userRouter;