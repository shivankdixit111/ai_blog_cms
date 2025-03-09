const User = require("../models/user-model");
const bcrypt = require('bcrypt')


const register = async(req, res)=>{
   try{
        const {username, email, password, phoneNo} = req.body;
        const userExist = await User.findOne({email: email});
        if(userExist) {
            return res.status(400).json({message: "User already exist with this email!"})
        }

        const newUser = await User.create({username, email, password, phoneNo})
        newUser.save();  // in pre() method hashing of password would be done

        return res.status(200).json({
            "User" : newUser,
            token: await newUser.generateToken(),
            userId: newUser._id.toString(),
        })
   } catch(error) {
       console.log(error)
   }
}

const login = async(req, res)=>{
    const {email, password} = req.body;
    const userExist = await User.findOne({email: email})
    if(!userExist) {
       return res.status(400).json({message: "Invalid credentials"})
    } 

    const isPasswordValid = await userExist.comparePassword(password, userExist.password);
 
    if(isPasswordValid) {
        return res.status(200).json({
            message: "Login successful !!!",
            token: await userExist.generateToken(),
            userId: userExist._id
        })
    } else {
        return res.status(400).json({message: "Invalid password"})
    }
}
const getCurrentUser = async(req, res)=>{
     try{
       const user = req.user;
    //    console.log('req user ',req.user)
       return res.status(200).json({user})
  
     } catch(error) { 
        console.log(error)
     }
}

module.exports = {register, login, getCurrentUser}