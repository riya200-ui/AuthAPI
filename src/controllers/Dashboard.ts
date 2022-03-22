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
           
           ScrapReviewData.find({
            created_at: {
                $gte: ('2022-03-21T00:00:00.000Z'),
                $lte: ('2022-03-27T00:00:00.000Z')
            }
        } )
           
          //.select({"contactDate":  {$gte: '2022-03-19T00:00:00.000Z'}})
           //.select(" { contactDate: { $gt: new Date('2022-03-15'), $lt: new Date('2022-03-21') } }")
           //.select([{ "contactDate": {$gte: '2022-03-15'}},{"contactDate": {$lte: '2022-03-21'}}])
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
           
           ScrapReviewData.find({
            created_at: {
                $gte: ('2022-03-21T00:00:00.000Z'),
                $lte: ('2022-03-27T00:00:00.000Z')
            }
        } )
           
          //.select({"contactDate":  {$gte: '2022-03-19T00:00:00.000Z'}})
           //.select(" { contactDate: { $gt: new Date('2022-03-15'), $lt: new Date('2022-03-21') } }")
           //.select([{ "contactDate": {$gte: '2022-03-15'}},{"contactDate": {$lte: '2022-03-21'}}])
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
          
    
      async leadsbymonths(req, res) {
        try{
           console.log(req.body);
           
           ScrapReviewData.find({
            created_at: {
                $gte: ('2022-03-21T00:00:00.000Z'),
                $lte: ('2022-03-27T00:00:00.000Z')
            }
        } )
        .select(" _id cname clientEmail clientLinkedinURL clientName clientPhoneNumber")

           
          //.select({"contactDate":  {$gte: '2022-03-19T00:00:00.000Z'}})
           //.select(" { contactDate: { $gt: new Date('2022-03-15'), $lt: new Date('2022-03-21') } }")
           //.select([{ "contactDate": {$gte: '2022-03-15'}},{"contactDate": {$lte: '2022-03-21'}}])
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

      //ScrapReviewData.find( { contactDate: { $gt: new Date('2022-03-13'), $lt: new Date('2022-03-19') } } )
    }
    export const dashboardControl = new DashboardControl()