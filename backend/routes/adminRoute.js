import express from "express";
import { addDoctor, allDoctors, loginAdmin } from "../controllers/adminController.js";
import upload from "../moddlewares/multer.js";
import authAdmin from "../moddlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";


const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/all-doctors',authAdmin,allDoctors);
adminRouter.post('/change-availability',authAdmin,changeAvailability);


export default adminRouter;