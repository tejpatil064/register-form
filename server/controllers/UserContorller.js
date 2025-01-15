import { response } from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export async function Signup(req,res)
{
    try
    {

        //data from fronted
        const{name,username,email,password} = req.body;
        console.log(name,username,email, password)

        //if user exist then user already exist
      

        const existingUser = await User.findOne({email})

        if(existingUser)
        {
            res.status(401).json({success:false, message:"Email already exist"})
        }
          //if user not exit then create
        const hashPassword =await bcryptjs.hash(password,10)
        console.log(hashPassword)
        const user = await User.create({
            name, username, email, password:hashPassword
        })
        res.status(200).json({
            success:true,
            message:"User created successfully",
            user:user
        })
        
    }
    catch(error)
    {
        console.log(error);
        response.status(500).json(
            {
                success:false,
                message:"Internal Server Error"
            }
        )
        
    }
}



export async function GetUser(req,res)
{
    try
    {
        const Users = await User.find()

        res.status(200).json({
            success:true,
            message:"User find successfully",
            Users
        })
        
    }
    catch(error)
    {
        console.log(error);
        response.status(500).json(
            {
                success:false,
                message:"Internal Server Error"+error
            }
        )
        
    }
}
