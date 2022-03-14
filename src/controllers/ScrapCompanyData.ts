import "dotenv/config";
import ScrapCompanyData from "../models/ScrapComanyData";
import mongoose from "mongoose";


import { Request, Response } from "express";


export interface TypedRequest<T> extends Request {
  body: T;

  user?: T;
}

export interface Payload {
}

export class ScrapCompanyDataControl {
    async createscrapCompanyData(
      req: TypedRequest<{ scrapActivity: mongoose.Schema.Types.ObjectId,
        user: mongoose.Schema.Types.ObjectId,
        cname: String,
        //company url
        url:String ,
        //manually add data
        location:String,
        status:String,
        //PRICE RATE
        rate:String ,
        size:String 
        
    }>,
      res: Response
    ) {
      try {
        const { scrapActivity, user, cname, url,location, status, size, rate } = req.body;
        /*if(scrapActivity || user || cname || url || location || status || size || rate){
          return res.status(200).json({
            message: "succes!",
            error: true,
          });
        }*/
        
  
        if (!scrapActivity || !user || !cname || !url || !location || !status || !size || !rate ) {
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
        
        const newScrapCompanyData = new ScrapCompanyData({
            scrapActivity,
            user,
            cname,
            url,
            location,
            status,
            size,
            rate 
        });
        await newScrapCompanyData.save();
  
        return res.status(200).json({
          message: "successfully scrap company data!",
          registered: true,
          data: "",
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
    // @ts-ignore
    async getscrapCompanyData(req: TypedRequest?, res: Response) {
      try{
          //export default mongoose.model("ScrapCompanyData", ScrapCompanyDataSchema);
          //from model ScrapCompanyData
          ScrapCompanyData.find()
        // .select(" tag , _id")
        .select("scrapActivity user cname url _id")
    .populate('scrapActivity', 'scrapActivityId')
    //in database user=userid from model ref user=name
    .populate('user', 'userId')
    //company name
    
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

    async deletescrapCompanyData(req,res)  {
      try{
        const deleteData = await ScrapCompanyData.findByIdAndDelete(req.params.id);
        if(req.params.id){
          return res.status(200).json({
            message: "succes!",
            error: true,
          });
        }
        if(!req.params.id){
          return res.status(400).send();
        }
        res.send(deleteData);
      }catch (error) {
      return res.status(500).json({ message: error.message });
      }
  }
  }
export const scrapCompanyDataControl = new ScrapCompanyDataControl()