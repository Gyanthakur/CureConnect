import validator from "validator";
import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
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

export { addDoctor,loginAdmin };
