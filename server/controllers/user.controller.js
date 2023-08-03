const { default: AppError } = require("../utils/appError");
const User = require('../models/user.modal');

// making controller
const register =  async(req,res) =>{
  const {fullName,email,password} = req.body;
    if(!fullName || !email || !password){
        return next(new AppError(`All fields are required`, 400));
    }
    const userExists = await User.findOne({email});

    if(userExists){
        return next(new AppError(`Email already exists`, 400));
    }
    
    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            // secure_url: 
        }
    });

    if(!User){
        return next(new AppError(`User Registration Failed`, 400));
    }

    // TODO : upload user picture

    await user.save();

    // TODO : set JWT token in cookie


    // we dont want to send password again
    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'User registration successfully'
    })
}

const login =  async   (req,res) =>{
   const {email, password} = req.body;

   if( !email || !password){
        return next(new AppError(`All fields are required`, 400));
   }
   
   const user = await User.findOne({
        email
   }).select('+password'); // additionaly asking for the password

   if(!user || !user.comparePassword(password) ){ // Todo
    return next(new AppError(`Email or password do not match`, 400));
   }

   const token = await user.generateJWTToken();

   
}

const logout = (req,res) =>{
    
}

const getProfile = (req,res) =>{
    
}

module.exports = {
    register,
    login,
    logout,
    getProfile
}