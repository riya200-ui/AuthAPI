import express from "express";
import "dotenv/config";
//import Sources from "../models/Sources";
import { scrapTagControl} from "../controllers/ScrapTag";
//const nodemailer = require("nodemailer");

const router = express.Router();

//router.get("/select", SourcesControl.select);
/*router.get("/", (req,res) => {
    console.log(req.body);
    res.send("1.mobileapp,2.webapp");
})*/
router.get('/', scrapTagControl.scrapTag);
router.post('/', scrapTagControl.createScrapTag);

export default router;