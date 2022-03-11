"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var ScrapActivity_1 = require("../controllers/ScrapActivity");
var router = express_1.default.Router();
router.get("/", ScrapActivity_1.scrapActivityControl.getScrapActivity);
router.post('/', ScrapActivity_1.scrapActivityControl.createScrapActivity);
exports.default = router;
//# sourceMappingURL=ScrapActivity.js.map