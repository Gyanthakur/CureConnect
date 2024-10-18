import mongoose from "mongoose";
const connectDb = async () =>{
    mongoose.connection.on('connected',()=>console.log('Db successfully connected'))
    await mongoose.connect(`${process.env.MONGO_DP_URI}/CureConnect`)
}

export default connectDb;