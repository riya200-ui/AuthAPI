import "dotenv/config";
import ScrapReviewData from "../models/ScrapReviewData";
import mongoose from "mongoose";


import { Request, Response } from "express";


export interface TypedRequest<T> extends Request {
  body: T;

  user?: T;
}

export interface Payload {
}

export class ScrapReviewDataControl {
    async createscrapReviewData(
      req: TypedRequest<{ scrapActivity: mongoose.Schema.Types.ObjectId,
        scrapCompanyData: mongoose.Schema.Types.ObjectId,
        user: mongoose.Schema.Types.ObjectId,
        review: String,
        //cname: String,
        //company url
        url:String ,
        //manually add data
        location:String,
        status:String,
        industry: String
        //PRICE RATE
        rate:String ,
        //size:String,
        clientName:String,
        clientEmail:String,
        clientPhoneNumber:String,
        clientLinkedinURL:String,
        contactDate:String,
        contactNotes:String,

        
    }>,
      res: Response
    ) {
      try {
        const {scrapActivity, scrapCompanyData, user, industry, url,location, status,  rate ,review,
        clientEmail,clientLinkedinURL,clientName,clientPhoneNumber,contactDate,contactNotes} = req.body;

        
  
        if ( !scrapActivity || !scrapCompanyData || !user || !industry || !url || !location || !status || !rate  || !review ||
            !clientEmail || !clientLinkedinURL || !clientName || !clientPhoneNumber || !contactDate || !contactNotes) {
          return res.status(400).json({
            message: "Please fill in all fields correctly!",
            error: true,
          });
        }
  
        const URL = require("url").URL;

        const stringIsAValidUrl = (url:any) => {
         try {
         new URL(url);
           return true;
         } catch (err) {
           return false;
         }
        };

        stringIsAValidUrl("https://www.example.com:777/a/b?c=d&e=f#g"); //true
        stringIsAValidUrl("invalid"); //false
        
        if (!stringIsAValidUrl(url)) {
            return res
              .status(400)
              .json({ message: 'url is invalid!', error: true });
          }
        
        const newScrapReviewData = new ScrapReviewData({
            scrapActivity,
            scrapCompanyData,
            user,
            industry, 
            url,
            location, 
            status, 
            rate ,
            review,
            clientEmail,
            clientLinkedinURL,
            clientName,
            clientPhoneNumber,
            contactDate,
         contactNotes
        });
        await newScrapReviewData.save();
  
        return res.status(200).json({
          message: "successfully scrap companyReview data!",
          registered: true,
          data: "",
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
    // @ts-ignore
    async getscrapReviewData(req: TypedRequest?, res: Response) {
      try{
          //export default mongoose.model("ScrapCompanyData", ScrapCompanyDataSchema);
          //from model ScrapCompanyData
          ScrapReviewData.find()
        // .select(" tag , _id")
        .select("scrapCompanyData  userId  url _id clientEmail clientLinkedinURL clientName clientPhoneNumber")
        .populate('scrapCompanyData', 'scrapCompanyDataId')
    .populate('scrapActivity', 'scrapActivityId')
    //in database user=userid from model ref user=name
    .populate('user', 'userId')
    //company name
    .populate('scrapCompanyData', 'company')
        .exec()
        .then(response => {
          res.status(200).json({
            count: response.length,
            data: response
          })
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
      }catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    async deletescrapReviewData(req,res)  {
      try{
        const deleteData = await ScrapReviewData.findByIdAndDelete(req.params.id);
        /*if(req.params.id){
          return res.status(200).json({
            message: "succes!",
            error: true,
          });
        }*/
        if(!req.params.id){
          return res.status(400).send();
        }
        res.send(deleteData);
      }catch (error) {
      return res.status(500).json({ message: error.message });
      }
  }

  async updatescrapReviewData(req,res)  {
    try{
      //{_id =db id, id=const}(idobject,update krna)
      const updateData = await ScrapReviewData.findByIdAndUpdate(req.params.id,req.body, {new:true});
      if(req.params.id){
        return res.status(200).json({
          message: "succes!",
          error: true,
        });
      }
      if(!req.params.id){
        return res.status(400).send();
      }
      res.send(updateData);
    }catch(error) {
    return res.status(500).json({ message: error.message });
    }
}
  }
export const scrapReviewDataControl = new ScrapReviewDataControl()