import express from 'express'
import { doctorsList } from '../controllers/doctorController.js';

const doctorRouter = express.Router();

doctorRouter.get('/list',doctorsList)

export default doctorRouter;