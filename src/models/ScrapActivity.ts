import "dotenv/config";
import mongoose from "mongoose";
//import jwt from 'jsonwebtoken';

const ScrapActivitySchema = new mongoose.Schema(
  {
   
    // sourceId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: [true, "Please enter your sourceId!"],
    // },
    source: { type: mongoose.Schema.Types.ObjectId, ref: 'Sources', required: [true, "Please enter your sourceId!"]},

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, "Please enter your userId!"],
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScrapTag',
        required: [true, "Please enter your scrapTagsId!"],
    },

    url: {
      type: String,
      required: true,
    }
   
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ScrapActivity", ScrapActivitySchema);
