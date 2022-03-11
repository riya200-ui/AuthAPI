"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var ScrapCompanyData_1 = require("../controllers/ScrapCompanyData");
var router = express_1.default.Router();
router.get("/", ScrapCompanyData_1.scrapCompanyDataControl.getscrapCompanyData);
router.post('/', ScrapCompanyData_1.scrapCompanyDataControl.createscrapCompanyData);
exports.default = router;
//# sourceMappingURL=ScrapCompanyData.js.map