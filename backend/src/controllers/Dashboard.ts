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
           
           //ScrapReviewData.find(
            // {created_at: {$gte: ('2022-03-21T00:00:00.000Z'),$lte: ('2022-03-27T00:00:00.000Z')}} )
            
             const january = await ScrapReviewData.find(
              {created_at: {$gte: ('2022-01-01T00:00:00.000Z'),$lte: ('2022-01-31T00:00:00.000Z')}} );

              if (january) {
                return res.status(200).json({
                  message: "contacted by january",
                  //error: true,
                  count: january.length,
                  data: " ",
                });
              }
              else{return res.status(400).json({
                message: "no data is exists in january",
                  error: true,
              });
            };

            /*const feb = await ScrapReviewData.find(
              {created_at: {$gte: ('2022-02-01T00:00:00.000Z'),$lte: ('2022-02-28T00:00:00.000Z')}} )
              if (feb) {
                return res.status(200).json({
                  message: "contacted by feb",
                  //error: true,
                  count: feb.length,
                  data: " ",
                });
              }
              else{return res.status(400).json({
                message: "no data is exists in january",
                  error: true,
              });
            }
            
            
              /*const march = await ScrapReviewData.find(
              {created_at: {$gte: ('2022-03-01T00:00:00.000Z'),$lte: ('2022-03-31T00:00:00.000Z')}} )
              if (march) {
                return res.status(200).json({
                  message: "This email has already registered in our database",
                  error: true,
                  data: " ",
                  count: january.length,
                });
              }
            
              const april = await ScrapReviewData.find(
              {created_at: {$gte: ('2022-04-01T00:00:00.000Z'),$lte: ('2022-04-30T00:00:00.000Z')}} )
              if (april) {
                return res.status(200).json({
                  message: "This email has already registered in our database",
                  error: true,
                  count: january.length,
                  data: " ",
                });
              }
            
            
              const may = await ScrapReviewData.find(
              {created_at: {$gte: ('2022-05-01T00:00:00.000Z'),$lte: ('2022-05-31T00:00:00.000Z')}} )
              if (may) {
                return res.status(200).json({
                  message: "This email has already registered in our database",
                  error: true,
                  count: january.length,
                  data: " ",
                });
              }

              const june = await ScrapReviewData.find(
                {created_at: {$gte: ('2022-06-01T00:00:00.000Z'),$lte: ('2022-06-30T00:00:00.000Z')}} ) 
                if (june) {
                  return res.status(200).json({
                    message: "This email has already registered in our database",
                    error: true,
                    count: january.length,
                    data: " ",
                  });
                }

                const july = await ScrapReviewData.find(
                  {created_at: {$gte: ('2022-07-01T00:00:00.000Z'),$lte: ('2022-07-31T00:00:00.000Z')}} )   
                  if (july) {
                    return res.status(200).json({
                      message: "This email has already registered in our database",
                      error: true,
                      count: january.length,
                      data: " ",
                    });
                  }
                
                  const august = await ScrapReviewData.find(
                    {created_at: {$gte: ('2022-08-01T00:00:00.000Z'),$lte: ('2022-08-31T00:00:00.000Z')}} )     
                    if (august) {
                      return res.status(200).json({
                        message: "This email has already registered in our database",
                        error: true,
                        count: january.length,
                        data: " ",
                      });
                    }
                   
                    const sep = await ScrapReviewData.find(
                      {created_at: {$gte: ('2022-09-01T00:00:00.000Z'),$lte: ('2022-09-30T00:00:00.000Z')}} )
                      if (sep) {
                        return res.status(200).json({
                          message: "This email has already registered in our database",
                          error: true,
                          count: january.length,
                          data: " ",
                        });
                      }
                     
                      const october = await ScrapReviewData.find(
                        {created_at: {$gte: ('2022-10-01T00:00:00.000Z'),$lte: ('2022-10-31T00:00:00.000Z')}} )
                        if (october) {
                          return res.status(200).json({
                            message: "This email has already registered in our database",
                            error: true,
                            count: january.length,
                            data: " ",
                          });
                        }
                       
                        const nov = await ScrapReviewData.find(
                          {created_at: {$gte: ('2022-11-01T00:00:00.000Z'),$lte: ('2022-11-30T00:00:00.000Z')}} )
                          if (nov) {
                            return res.status(200).json({
                              message: "This email has already registered in our database",
                              error: true,
                              count: january.length,
                              data: " ",
                            });
                          }
                        
                     const dec = await ScrapReviewData.find(
                            {created_at: {$gte: ('2022-12-01T00:00:00.000Z'),$lte: ('2022-12-31T00:00:00.000Z')}} )
                            if (dec) {
                              return res.status(200).json({
                                message: "This email has already registered in our database",
                                error: true,
                                count: january.length,
                                data: " ",
                              });
                            }*/
                         
                        
                          }
              
        catch (error) {
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