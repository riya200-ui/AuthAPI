import "dotenv/config";
import ScrapTag from "../models/ScrapTag";


import { Request, Response } from "express";


export interface TypedRequest<T> extends Request {
  body: T;

  user?: T;
}

export interface Payload {
  
  tag?: string;
  
}

export class ScrapTagControl {
  //create tag  POST
    async createScrapTag(
      req: TypedRequest<{ 
        tag: String
         }>,
      res: Response
    ) {
      try {
        const {  tag } = req.body;
  
        if (!tag ) {
          return res.status(400).json({
            message: "Please enter tag correctly!",
            error: true,
          });
        }
  
        const newScrapTag = new ScrapTag({tag});
        await newScrapTag.save();
  
        return res.status(200).json({
          message: "successfully registered!",
          registered: true,
          data: newScrapTag,
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    //get tag GET
    async scrapTag(req, res) {
      try{
        console.log(req.body);
        ScrapTag.find()
        .select(" tag , _id")
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
    
    
    async deletescrapTag(req,res)  {
      try{
        const deleteData = await ScrapTag.findByIdAndDelete(req.params.id);
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
    
  async updatescrapTag(req,res)  {
    try{
      //{_id =db id, id=const}(idobject,update krna)
      const updateData = await ScrapTag.findByIdAndUpdate(req.params.id,req.body, {new:true});
      
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

      export const scrapTagControl = new ScrapTagControl()