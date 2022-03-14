import "dotenv/config";
import ScrapActivity from "../models/ScrapActivity";
import mongoose from "mongoose";


import { Request, Response } from "express";


export interface TypedRequest<T> extends Request {
  body: T;

  user?: T;
}

export interface Payload {
}

export class ScrapActivityControl {
    async createScrapActivity(
      req: TypedRequest<{ source: mongoose.Schema.Types.ObjectId,
        user: mongoose.Schema.Types.ObjectId,
        tag: mongoose.Schema.Types.ObjectId,
        url:String 
        
    }>,
      res: Response
    ) {
      try {
        const { source, user, tag, url } = req.body;

        
  
        if (!source || !user || !tag  || !url) {
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
        
        const newScrapActivity = new ScrapActivity({
            source,
            user,
            tag,
            url
        });
        await newScrapActivity.save();
  
        return res.status(200).json({
          message: "successfully registered!",
          registered: true,
          data: "",
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
    // @ts-ignore
    async getScrapActivity(req: TypedRequest?, res: Response) {
      try{
        ScrapActivity.find()
        // .select(" tag , _id")
        .select("source userId scrapTagsId url _id")
    .populate('source', 'sourceName')
    .populate('user', 'name')
    .populate('tag', 'tag')
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

    async deletescrapActivity(req,res)  {
      try{
        const deleteData = await ScrapActivity.findByIdAndDelete(req.params.id);
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
  }
export const scrapActivityControl = new ScrapActivityControl()