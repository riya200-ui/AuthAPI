import "dotenv/config";
import Sources from "../models/Sources";


import { Request, Response } from "express";


export interface TypedRequest<T> extends Request {
  body: T;

  user?: T;
}

export interface Payload {
  sourceName?: string;
  sourceId?: string | number;
}

export class SourcesControl {
    async createsource(
      req: TypedRequest<{ 
        sourceName: String
         }>,
      res: Response
    ) {
      try {
        const {  sourceName } = req.body;
  
        if ( !sourceName) {
          return res.status(400).json({
            message: "Please fill sourcename correctly!",
            error: true,
          });
        }
  
        
        
        
        const newSource = new Sources({
           
            sourceName
            
        });
        await newSource.save();
  
        return res.status(200).json({
          message: "successfully ",
          registered: true,
          data: newSource,
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    async source (req, res)  {
      try{
      console.log(req.body);
      Sources.find()
       // .select("sourceName  _id")
        .exec()
        .then(Sources => {
          const response = {
            count: Sources.length,
            sources: Sources.map(Sources => {
              return {
                sourceName: Sources.sourceName,
               _id: Sources._id,
                request: {
                  type: "GET",
                  url: "http://localhost:5000/sources/" 
                }
              };
            })
          };
          //   if (docs.length >= 0) {
          res.status(200).json(response);
          
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    
    }

    async deletesources(req,res)  {
      try{
        const deleteData = await Sources.findByIdAndDelete(req.params.id);
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

   /* async sourceId (req, res) {
      try{
      console.log(req.body);  
      const id = req.params.sourceId;
      Sources.findById(id)
        .select('sourcesName  _id')
        .exec()
        .then(Sources => {
          console.log("From database",Sources);
          if (Sources) {
            res.status(200).json({
                source: Sources,
                request: {
                    type: 'GET'
                    
                }
            });
          } else {
            res
              .status(404)
              .json({ message: "No valid entry found for provided ID" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: err });
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }
    
    async patchsourceid (req, res) {
      try{
      const id = req.params.sourceId;
      const updateOps = {};
      for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
      }
      Sources.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
          res.status(200).json({
              message: 'source updated',
              request: {
                  type: 'GET',
                  url: 'http://localhost:5000/source/' + result.id
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
    
    async deletesourceid(req, res) {
      try{
      const id = req.params.sourceId;
      Sources.remove({ _id: id })
        .exec()
        .then(Sources => {
          res.status(200).json({
              source: Sources,
              message: 'Sources deleted',
              request: {
                  type: 'POST',
                  url: 'http://localhost:5000/sources',
                  body: { sourcesName: 'String' }
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
    }*/
}
      export const sourcesControl = new SourcesControl()