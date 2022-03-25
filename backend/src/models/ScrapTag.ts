import "dotenv/config";
import mongoose from "mongoose";
//import jwt from 'jsonwebtoken';

const ScrapTagSchema = new mongoose.Schema(
  {
    scrapTagId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    tag: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    }
}
)

export default mongoose.model("ScrapTag", ScrapTagSchema);
