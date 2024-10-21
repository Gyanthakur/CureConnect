import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
	try {
        const {docId} = req.body;

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true,message:'Availability changed'})
        
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

// all doctors list for frontend

const doctorsList = async(req,res) => {
	try {
		const doctors = await doctorModel.find({}).select(['-password','-email'])
		res.json({success:true,doctors});
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
}

// API for allow doctors login

const loginDoctor = async(req,res) => {
	try {
		const {email, password} = req.body
		const doctor = await doctorModel.findOne({email})
		if(!doctor){
			res.json({success:false, message:"Invalid credentials"})
		}
		
		const isMatch = await bcrypt.compare(password, doctor.password)
		if(isMatch){
			const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
			res.json({success:true,token})
		}
		else{
			res.json({success:false, message:"Invalid credentials"})
		}
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
}


// API to get doctor appointments for doctor panel

const appointmentsDoctor = async(req,res)=>{
	try {
		const {docId} = req.body
		const appointments = await appointmentModel.find({docId})

		res.json({success:true,appointments})


	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
}
export {changeAvailability,doctorsList, loginDoctor, appointmentsDoctor}