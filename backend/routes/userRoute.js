import exprex from 'express'
import { bookAppointments, cancelAppointment, getprofile, listAppointment, LoginUser, paymentRazorpay, registerUser, updateProfile, verifyRazorpay } from '../controllers/userController.js'
import authUser from '../moddlewares/authUser.js';
import upload from '../moddlewares/multer.js';

const userRouter = exprex.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',LoginUser)

userRouter.get('/get-profile',authUser,getprofile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointments)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default userRouter;