import validator from "validator";
import bcript from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from 'cloudinary'
// api to resister user

const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.json({ success: false, message: "Missing Details" });
		}

		// validating email format
		if (!validator.isEmail(email)) {
			return res.json({
				success: false,
				message: "Please enter a valid email!",
			});
		}

		// validating strong password
		if (password.length < 8) {
			return res.json({ success: false, message: "Enter a strong password!" });
		}

		// hashing user password
		const salt = await bcript.genSalt(10);
		const hashedPassword = await bcript.hash(password, salt);

		const userData = {
			name,
			email,
			password: hashedPassword,
		};
		const newUser = new userModel(userData);
		const user = await newUser.save();

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		res.json({ success: true, token });
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

// API for Login user
const LoginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await userModel.findOne({ email });

		if (!user) {
			return res.json({ success: false, message: "User doesn't exist!" });
		}

		const isMatch = await bcript.compare(password, user.password);
		if (isMatch) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
			res.json({ success: true, token });
		} else {
			res.json({ success: false, message: "Invalid credentials" });
		}
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

// API to get user profile data

const getprofile = async (req, res) => {
	try {
		const { userId } = req.body;
		const userData = await userModel.findById(userId).select("-password");
		res.json({ success: true, userData });
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

// API for update user profile

const updateProfile = async (req, res) => {
	try {
		const { userId, name, phone, address, dob, gender } = req.body;
		const imageFile = req.file;

		if (!name || !phone || !dob || !gender) {
			return res.json({ success: false, message: "Missing data" });
		}

		await userModel.findByIdAndUpdate(userId, {
			name,
			phone,
			address: JSON.parse(address),
			dob,
			gender,
		});

        if(imageFile){
            // upload image to clouduinary
            const imageUpload =await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId,{image:imageURL})

        }

        res.json({success:true,message:"Profile Updated"})
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

export { registerUser, LoginUser, getprofile, updateProfile };
