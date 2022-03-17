import "dotenv/config";
import Dashboard from "../models/Dashboard";
import ScrapReviewData from "../models/ScrapReviewData";


import { Request, Response } from "express";


export interface TypedRequest<T> extends Request {
  body: T;

  user?: T;
}

export interface Payload {
  
  tag?: string;
  
}

export class DashboardControl {
    async getcontacts(req, res) {
        try{
           console.log(req.body);
           ScrapReviewData.find()
           
           .select(" _id ")
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

    async getleads(req, res) {
        try{
           console.log(req.body);
           
           ScrapReviewData.find()
            
           .select(" _id cname clientEmail clientLinkedinURL clientName clientPhoneNumber")
           .populate('scrapCompanyData', 'cname')
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
    async contactedthisweek(req, res) {
        try{
           console.log(req.body);
           
           ScrapReviewData.find(  )
            .select("contactDate")
           //.select(" { contactDate: { $gt: new Date('2022-03-13'), $lt: new Date('2022-03-19') } }")
           //.populate('scrapCompanyData', 'cname')
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
      
    async contactsbymonths(req, res) {
        try{
          
           console.log(req.body);
           ScrapReviewData.aggregate([
            {
              $match: {
                $and: [
                  {
                    "createdAt": {
                      $gte: '2022-03-01T06:05:24.437+00:00'
                    }
                  },
                  {
                    "createdAt": {
                      $lte: '2022-03-31T06:05:24.437+00:00'
                    }
                  }
                ],
                
              }
              
            },
            {
              $group: {
                _id: {
                  $dateToString: {
                    "date": "$createdAt",
                    "format": "%Y-%m"
                  }
                },
                Count: {
                  $sum: 1
                },
                
              }
            }
          ])
           
           //ScrapReviewData.find(  )
           // .select("contactDate")
           //.select(" { contactDate: { $gt: new Date('2022-03-13'), $lt: new Date('2022-03-19') } }")
           //.populate('scrapCompanyData', 'cname')
           .exec()
          .then(response => {
            res.
            status(200).json({
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
  

      //ScrapReviewData.find( { contactDate: { $gt: new Date('2022-03-13'), $lt: new Date('2022-03-19') } } )
    }
    export const dashboardControl = new DashboardControl()