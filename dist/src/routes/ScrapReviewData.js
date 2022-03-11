"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var ScrapReviewData_1 = require("../controllers/ScrapReviewData");
var router = express_1.default.Router();
router.get("/", ScrapReviewData_1.scrapReviewDataControl.getscrapReviewData);
router.post('/', ScrapReviewData_1.scrapReviewDataControl.createscrapReviewData);
exports.default = router;
//# sourceMappingURL=ScrapReviewData.js.map