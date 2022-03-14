import express from "express";
import "dotenv/config";
//import Sources from "../models/Sources";
import { scrapCompanyDataControl} from "../controllers/ScrapCompanyData";
//const nodemailer = require("nodemailer");

const router = express.Router();

//router.get("/select", SourcesControl.select);
router.get("/", scrapCompanyDataControl.getscrapCompanyData);

router.post('/', scrapCompanyDataControl.createscrapCompanyData);
router.delete('/:id', scrapCompanyDataControl.deletescrapCompanyData);

export default router;