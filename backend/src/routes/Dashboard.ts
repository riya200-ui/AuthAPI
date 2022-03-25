import express from "express";
import "dotenv/config";
//import Sources from "../models/Sources";
import { dashboardControl} from "../controllers/Dashboard";
//const nodemailer = require("nodemailer");

const router = express.Router();

//router.get("/select", SourcesControl.select);
/*router.get("/", (req,res) => {
    console.log(req.body);
    res.send("1.mobileapp,2.webapp");
})*/
router.get('/contact', dashboardControl.getcontacts);
router.get('/lead', dashboardControl.getleads);
router.get('/week', dashboardControl.contactedthisweek);
router.get('/contactsbymonths', dashboardControl.contactsbymonths);
router.get('/leadsbymonths', dashboardControl.leadsbymonths);
export default router;