import express from "express";
import "dotenv/config";
//import Sources from "../models/Sources";
import { scrapReviewDataControl} from "../controllers/ScrapReviewData";
//const nodemailer = require("nodemailer");

const router = express.Router();

//router.get("/select", SourcesControl.select);
router.get("/", scrapReviewDataControl.getscrapReviewData);

router.post('/', scrapReviewDataControl.createscrapReviewData);
router.delete('/:id', scrapReviewDataControl.deletescrapReviewData);

export default router;