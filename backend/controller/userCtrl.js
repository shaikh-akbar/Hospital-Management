import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from 'cloudinary'

export const patientRegister = catchAsyncError(async(req,res,next)=>{
    const { firstName,lastName,email,phone,gender,dob,nic,password,role} = req.body
    if(!firstName || !lastName || !email || !phone || !gender || !dob || !nic || !password || !role){
        return next(new ErrorHandler("please fill the form",400))
    }
    const isRegistered = await User.findOne({email})
    if(isRegistered){
        return next(new ErrorHandler("Email already registered",400))
    }
    const user = await User.create({firstName,lastName,email,phone,gender,dob,nic,password,role})
    generateToken(user,'User Registered Successfully',200,res)
})

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    if (password !== confirmPassword) {
      return next(
        new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
      );
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }
  
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }
    if (role !== user.role) {
      return next(new ErrorHandler(`User Not Found With This Role!`, 400));
    }
    generateToken(user, "Login Successfully!", 201, res);
  });
  

export const addNewAdmin = catchAsyncError(async(req,res,next)=>{
    const {firstName,lastName,email,phone,gender,dob,nic,password} = req.body
    if(!firstName || !lastName || !email || !phone || !gender || !dob || !nic || !password){
        return next(new ErrorHandler("please fill the form",400))
    }
    const isRegistered = await User.findOne({email})
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} With This Email already registered`))
    }
    const admin = await User.create({firstName,lastName,email,phone,gender,dob,nic,password,role:'Admin'})
    res.status(200).json({
        success:true,
        message:"New Admin Registerd!"
    })
})

export const getAllDoctors = catchAsyncError(async(req,res,next)=>{
    const doctors = await User.find({role:'Doctor'})
    res.status(200).json({
        success:true,
        doctors
    })

})

export const getUserDetails = catchAsyncError(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user
    })
})

export const adminLogout = catchAsyncError(async(req,res,next)=>{
    res.status(200).cookie('adminToken',"",{
        httpOnly:true,
        expires: new Date(Date.now())
    }).json({
        success:true,
        message:'Admin Log Out Successfully'
    })
})

export const patientLogout = catchAsyncError(async(req,res,next)=>{
    res.status(200).cookie('patientToken',"",{
        httpOnly:true,
        expires: new Date(Date.now())
    }).json({
        success:true,
        message:'Patient Log Out Successfully'
    })
})

export const addNewDoctor = catchAsyncError(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler('Doctor Avatar Required',400))
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
      return next(new ErrorHandler("File Format Not Supported!", 400));
    }
  
    const {firstName,lastName,email,phone,gender,dob,nic,password,doctorDepartment} = req.body
    if(!firstName || !lastName || !email || !phone || !gender || !dob || !nic || !password || !doctorDepartment){
        return next(new ErrorHandler("please Provide full details",400))
    }
    const isRegistered = await User.findOne({email})
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already registerd with this email`,400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)
    if(!cloudinaryResponse || cloudinaryResponse.error) {
        console.log(`cloudinary error `,cloudinaryResponse.error || 'Unknown cloudinary error')
    }
    const doctor = await User.create({firstName,lastName,email,phone,gender,dob,nic,password,doctorDepartment,role:'Doctor',docAvatar:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url
    }})
    res.status(200).json({
        success:true,
        message:`Doctor ${doctor.firstName} ${doctor.lastName} added successfully`,
        doctor
    })
})