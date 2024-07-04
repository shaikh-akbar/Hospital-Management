import { User } from "../models/userSchema.js";
import jwt from 'jsonwebtoken'
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./errorMiddleware.js";


export const isAdminAuthenticated = catchAsyncError(async(req,res,next)=>{
    const token = req.cookies.adminToken
    if(!token){
        return next(new ErrorHandler('Admin Not Authenticated',400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)
    if(req.user.role !== "Admin"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resourcse`))
    }
    next();
})

export const isPatientAuthenticated = catchAsyncError(async(req,res,next)=>{
    const token = req.cookies.patientToken
    if(!token){
        return next(new ErrorHandler('Patient Is Not Authenticated',400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)
    if(req.user.role !== "Patient"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resourcse`))
    }
    next();
})