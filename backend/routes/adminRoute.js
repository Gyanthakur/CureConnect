import express from "express";
import { addDoctor, loginAdmin } from "../controllers/adminController.js";
import upload from "../moddlewares/multer.js";
import authAdmin from "../moddlewares/authAdmin.js";


const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login',loginAdmin);


export default adminRouter;