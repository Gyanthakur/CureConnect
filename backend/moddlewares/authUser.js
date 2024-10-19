import jwt from "jsonwebtoken";

// User authentication middlewares

const authUser = async (req, res, next) => {
	try {

        // atoken = admin token
        const {token} = req.headers;
        if(!token){
            return res.json({success:false,message:"Not Authorized Login Again!"})
        }
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = tokenDecode.id;

        next();


	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

export default authUser;
