import express from 'express'
import { appointmentsDoctor, doctorsList, loginDoctor } from '../controllers/doctorController.js';
import authDoctor from '../moddlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list',doctorsList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)

export default doctorRouter;