import "dotenv/config";
import mongoose from "mongoose";
//import jwt from 'jsonwebtoken';

const scrapCompanyDataSchema = new mongoose.Schema(
  {
    scrapCompanyDataID: {
      type: mongoose.Schema.Types.ObjectId,
    },
    scrapActivity: { type: mongoose.Schema.Types.ObjectId, ref: 'ScrapActivity', required: [true, "Please enter your scrapactivityId!"]},
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, "Please enter your userId!"],
    },
    cname: {
      type: String,
      required: [true, " company name by scrapping!"],
      trim: true
    
    },
    url: {
      type: String,
      required: [true, "Please enter your url!"],
      trim: true
      
    },
    rate: {
      type: String ,
      required: [true, "Please enter your rate!"],
      // select:false
    },
    location: {
        type: String,
        required: [true, "Please enter your location!"],
        trim: true,
    },
    size: {
        type: String,
        required: [true, "Please enter your size!"],
        trim: true,
    },
    status: {
        type: String,
        required: [true, "Please enter your status!"],
        trim: true,
    },
    

    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ScrapCompanyData", scrapCompanyDataSchema);
