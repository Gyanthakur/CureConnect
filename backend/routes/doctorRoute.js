import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorProfile, doctorsList, loginDoctor, updateDoctorProfile } from '../controllers/doctorController.js';
import authDoctor from '../moddlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list',doctorsList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointments',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointments',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)


export default doctorRouter;