import "dotenv/config";
import mongoose from "mongoose";
//import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
      // select:false
    },

    otp: {
      type: Number,
      required: true,
    },
    otpVerified: {
      type: Boolean,
      required: true,
    },
    forgotPasswordOTP: {
      type: Number,
    },
    /*tokens:[
      {
        token:{
          type:String,
          require:true
        }
      }
    ],
    
    refreshToken: {
       type: String 
    },*/
    role: {
      type: Number,
      default: 0, // 0 = user, 1 = admin
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", userSchema);
