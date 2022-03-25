"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express();
var User_1 = __importDefault(require("./User"));
router.use("/user", User_1.default);
var Sources_1 = __importDefault(require("./Sources"));
router.use("/sources", Sources_1.default);
var ScrapTag_1 = __importDefault(require("./ScrapTag"));
router.use("/scrapTag", ScrapTag_1.default);
var ScrapActivity_1 = __importDefault(require("./ScrapActivity"));
router.use("/scrapActivity", ScrapActivity_1.default);
var ScrapCompanyData_1 = __importDefault(require("./ScrapCompanyData"));
router.use("/scrapComapnyData", ScrapCompanyData_1.default);
var ScrapReviewData_1 = __importDefault(require("./ScrapReviewData"));
router.use("/scrapReviewData", ScrapReviewData_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map