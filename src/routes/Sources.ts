import express from "express";
import "dotenv/config";
//import Sources from "../models/Sources";
import { sourcesControl} from "../controllers/Sources";
//const nodemailer = require("nodemailer");

const router = express.Router();

//router.get("/select", SourcesControl.select);
/*router.get("/source", (req,res) => {
    console.log(req.body);
    res.send("1.Clutch,2.Upwork,3.Linkedin,4.Stackoverflow");
})*/
//get sourcelist GET
router.get('/', sourcesControl.source);

//create source POST
router.post('/', sourcesControl.createsource);

//get sourceid GET

//router.get('/sourceId', sourcesControl.sourceId);

//update sourceid PATCH
//router.patch('/patchsourceid', sourcesControl.patchsourceid);

router.delete('/:id', sourcesControl.deletesources);

export default router;