import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    profilePhoto:{
        type:String,
        require:false,
    },
    password:{
        type:String,
        required:true,
        
    },
})
const User = mongoose.model('User',userSchema)
export default User