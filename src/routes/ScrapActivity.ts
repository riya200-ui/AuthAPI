import express from "express";
import "dotenv/config";
//import Sources from "../models/Sources";
import { scrapActivityControl} from "../controllers/ScrapActivity";
//const nodemailer = require("nodemailer");

const router = express.Router();

//router.get("/select", SourcesControl.select);
router.get("/", scrapActivityControl.getScrapActivity);

router.post('/', scrapActivityControl.createScrapActivity);

export default router;