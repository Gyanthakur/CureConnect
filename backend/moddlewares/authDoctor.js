import jwt from "jsonwebtoken";

// Doctor authentication middlewares

const authDoctor = async (req, res, next) => {
	try {

        // dtoken = doctor token
        const {dtoken} = req.headers;
        if(!dtoken){
            return res.json({success:false,message:"Not Authorized Login Again!"})
        }
        const tokenDecode = jwt.verify(dtoken,process.env.JWT_SECRET);
        req.body.docId = tokenDecode.id;

        next();


	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

export default authDoctor;
