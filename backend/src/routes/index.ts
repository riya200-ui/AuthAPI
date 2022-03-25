const express = require("express");
const router = express();
//entry

import User from "./User";
router.use("/user", User);

import Sources from "./Sources";
router.use("/sources", Sources);

import ScrapTag from "./ScrapTag";
router.use("/scrapTag", ScrapTag);

import ScrapActivity from "./ScrapActivity";
router.use("/scrapActivity", ScrapActivity);

import ScrapCompanyData from "./ScrapCompanyData";
router.use("/scrapCompanyData", ScrapCompanyData);

import ScrapReviewData from "./ScrapReviewData";
router.use("/scrapReviewData", ScrapReviewData);

import Dashboard from "./Dashboard";
router.use("/dashboard", Dashboard);



export default router;
