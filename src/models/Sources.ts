import "dotenv/config";
import mongoose from "mongoose";
//import jwt from 'jsonwebtoken';

const SourcesSchema = new mongoose.Schema(
  {
    sourceId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    sourceName: {
      type: String,
      required: [true, "Please enter your sourcename!"],
      trim: true,
    },
    
})
export default mongoose.model("Sources", SourcesSchema);
