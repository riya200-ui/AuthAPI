import express from "express";
import "dotenv/config";
//import Sources from "../models/Sources";
import { scrapActivityControl} from "../controllers/ScrapActivity";
//const nodemailer = require("nodemailer");

const router = express.Router();

//router.get("/select", SourcesControl.select);
router.get("/", scrapActivityControl.getScrapActivity);

router.post('/', scrapActivityControl.createScrapActivity);
router.delete('/:id', scrapActivityControl.deletescrapActivity);
router.patch('/:id', scrapActivityControl.updatescrapActivity);

export default router;