import exprex from 'express'
import { bookAppointments, getprofile, listAppointment, LoginUser, registerUser, updateProfile } from '../controllers/userController.js'
import authUser from '../moddlewares/authUser.js';
import upload from '../moddlewares/multer.js';

const userRouter = exprex.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',LoginUser)

userRouter.get('/get-profile',authUser,getprofile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointments)
userRouter.get('/appointments',authUser,listAppointment)

export default userRouter;