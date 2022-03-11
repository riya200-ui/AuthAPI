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
    
    /*async source(req, res){
      try{
      Sources.findById(req.body.sourceId)
        .then(Sources => {
          if (!Sources) {
            return res.status(404).json({
              message: "Sources not found"
            });
          }
          const scrapTag = new ScrapTag({
            _id: mongoose.Types.ObjectId(),
            tag: req.body.tag,
            Sources: req.body.SourcesId
          });
          return scrapTag.save();
        })
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "ScrapTag stored",
            createdScrapTag: {
              _id: result._id,
              Sources: result.sources,
              tag: result.tag
            },
            request: {
              type: "GET",
              //url: "http://localhost:3000/orders/" + result._id
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      }catch (error) {
        return res.status(500).json({ message: error.message });
        }
    
    }
    
    async scrapTagId(req, res) {
      try{
      ScrapTag.findById(req.params.scrapTagId)
        .exec()
        .then(scrapTag => {
          if (!scrapTag) {
            return res.status(404).json({
              message: "scrapTag not found"
            });
          }
          res.status(200).json({
            scrapTag: scrapTag,
            request: {
              type: "GET",
              //url: "http://localhost:3000/orders"
            }
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
      }catch (error) {
        return res.status(500).json({ message: error.message });
      }

    }*/
    
    
    
}

      export const scrapTagControl = new ScrapTagControl()