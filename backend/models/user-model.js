const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
})



//pre() automatically gets called before executing .save() method
// secure the password with bcrypt  
// try to clean controller.js so use this method   
userSchema.pre('save', async function(next){
    let user = this; 

    if (!user.isModified("password")) return next(); // Prevent re-hashing on update
    const saltRound = 10;
    const hashed_Password = await bcrypt.hash(user.password, saltRound)
    user.password = hashed_Password

    next();  //call next to continue saving the document 
})


userSchema.methods.generateToken = async function(){
    const user = this;
    // console.log('user in instance method ' ,this)
    try{
        const token = jwt.sign(
            {
               email: user.email, 
               userId: user._id
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d"
            }
        )
        return token;
    } catch(err) {
        console.log(err)
    }
}

userSchema.methods.comparePassword = async function(password) {
    let user = this;  
    const isPasswordValid = await bcrypt.compare(password, user.password); 
    return isPasswordValid;
}

const User = mongoose.model('User', userSchema)

module.exports = User;