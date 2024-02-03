const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const User = require('../models/UserModel');

//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.create({
        email,
        password,
    });

    sendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncErrors (async (req,res,next)=>{
    
    const {email, password} = req.body;

    //checking if user has given both email and password

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));

    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Inavlid Email or Password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    sendToken(user,200,res);
})

//Logout User
exports.logOut = catchAsyncErrors(async (req,res,next)=>{
    
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    
    res.status(200).json({
        success:true,
        message:"Logged Out Successfully",
    })
})