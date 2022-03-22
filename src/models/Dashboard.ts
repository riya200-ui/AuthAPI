import "dotenv/config";
import mongoose from "mongoose";
//import jwt from 'jsonwebtoken';

const dashboardSchema = new mongoose.Schema(
  {
    scrapReviewDataId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    scrapCompanyData: { type: mongoose.Schema.Types.ObjectId, ref: 'ScrapCompanyData', required: [true, "Please enter your scrapcompany ids!"]},
    scrapActivity: { type: mongoose.Schema.Types.ObjectId, ref: 'ScrapActivity', required: [true, "Please enter your scrapactivityId!"]},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, "Please enter your userId!"],
    },
    review: {
        type: String,
        required: [true, "Please enter your review!"],
        trim: true,
    },
    
    rate: {
        type: String || Number,
        required: [true, "Please enter your rate!"],
        trim: true,
    },
    location: {
        type: String,
        required: [true, "Please enter your location!"],
        trim: true,
    },
    /*size: {
        type: String || Number ,
        required: [true, "Please enter your size!"],
        trim: true,
    },*/
    industry: {
        type: String,
        required: [true, "Please enter your industry!"],
        trim: true,
    },
    clientName: {
      type: String,
      minlength : 3,
      
      required: [true, "Please enter client name!"],
    },
    clientEmail: {
      type: String,
      required: [true, "Please enter your email!"],
      trim: true
      
    },
    clientPhoneNumber: {
      type: Number,
      required: [true, "Please enter your phonenumber!"],
      // select:false
      maxlength:10,
      minlength:10
    },
    clientLinkedinURL: {
        type: String,
        required: [true, "Please enter your linkedinurl!"],
        trim: true,
    },
    contactNotes: {
        type: String,
        required: [true, "Please enter your contactnotes!"],
        trim: true,
    },
    contactDate: {
        type: Date,
        required: [true, "Please enter your contactdate!"],
        trim: true,
    },
    status: {
        type: String,
        required: [true, "Please enter your status!"],
        trim: true,
      },
      created_at:{
        type : Date
      }


    
    
  },
  {
    timestamps: { createdAt: 'created_at' },
  }
);

export default mongoose.model("Dashboard", dashboardSchema);
