import jwt from "jsonwebtoken";

// Admin authentication middlewares

const authAdmin = async (req, res, next) => {
	try {

        // atoken = admin token
        const {atoken} = req.headers;
        if(!atoken){
            return res.json({success:false,message:"Not Authorized Login Again!"})
        }
        const tokenDecode = jwt.verify(atoken,process.env.JWT_SECRET);
        if(tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Not Authorized Login Again!"})
        }

        next();


	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

export default authAdmin;
