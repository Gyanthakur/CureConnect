import validator from "validator";
import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
// API for adding a doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    // Check if required fields are present
    if (!name || !email || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.json({ success: false, message: 'Please enter a valid email!' });
    }

    // Validate password length
    if (password.length < 8) {
      return res.json({ success: false, message: 'Please enter a strong password!' });
    }

    // Hashing doctor's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    // Parse address if necessary, or directly assign
    let parsedAddress;
    try {
      parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
    } catch (err) {
      return res.json({ success: false, message: 'Invalid address format!' });
    }
    
    // Doctor data to save in the database
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      // address: JSON.parse(address),
      address: parsedAddress,
      date: Date.now(),
    };

    // Save the new doctor
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor has been added successfully." });
    
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// api for admin login

const loginAdmin = async(req,res) => {
  try {
    const {email,password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.JWT_SECRET);

      res.json({success:true,token})
    }
    else{
      res.json({success:false,message:"Invalid admin credentials"})
    }
    
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}



// api to get all doctors list for admin panel

const allDoctors  = async (req,res) => {
  try {

    const doctors = await doctorModel.find({}).select('-password');
    res.json({success:true,doctors});
    
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}


// API to get all appointment list
const appointmentsAdmin= async(req,res) =>{
  try {
    const appointments = await appointmentModel.find({})
    res.json({success:true,appointments})

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

// API for appointment cancellition
// original
// const appointmentCancel = async(req,res) =>{
// 	try {
// 		const {appointmentId} = req.body;

// 		const appointmentData = await appointmentModel.findById(appointmentId)

		
// 		await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled: true})
// 		// releasing doctor slots
// 		const {docId,slotDate,slotTime} = appointmentData
// 		const doctorData = await doctorModel.findById(docId)

// 		let slots_booked = doctorData.slots_booked
// 		slots_booked[slotDate] = slots_booked[slotDate].filter(e => e!== slotTime)
// 		await doctorModel.findByIdAndUpdate(docId,{slots_booked})
// 		res.json({success:true,message:"appointment cancelled "})
		
// 	} catch (error) {
// 		console.error(error);
// 		res.json({ success: false, message: error.message });
// 	}
// }


// chatgpt

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // Find the appointment by ID
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Cancel the appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Releasing doctor slots
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    if (!doctorData) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    let slots_booked = doctorData.slots_booked || {}; // Ensure slots_booked is initialized

    // Check if slotDate exists, if not, initialize it as an empty array
    if (!slots_booked[slotDate]) {
      return res.status(400).json({ success: false, message: 'No slots booked on this date' });
    }

    // Remove the slotTime from the booked slots for the given date
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

    // Update the doctor's booked slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    // Send success response
    res.json({ success: true, message: "Appointment cancelled" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// API to get dashboard  data for admin 
const adminDashboard = async (req,res) => {
  try {
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors:doctors.length,
      appointments:appointments.length,
      patients: users.length,
      latestAppointments : appointments.reverse().slice(0,5)
    }

    res.json({success:true,dashData})

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export { addDoctor,loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard };
