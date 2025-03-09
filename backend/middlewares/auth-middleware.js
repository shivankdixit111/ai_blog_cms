const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const authMiddleware = async(req, res, next)=>{
  try{
    const token = req.header('Authorization');
    const jwtToken = token.replace("Bearer ", "")

    const user = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
    console.log(jwtToken)
    const currentUser = await User.findOne({email: user.email}).select({password: 0})

    req.user = currentUser;
    req.id = currentUser._id; 

    next();
  } catch(error) {
    return res.status(400).json({error})
  }
}

module.exports = authMiddleware;