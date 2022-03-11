"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var ScrapTag_1 = require("../controllers/ScrapTag");
var router = express_1.default.Router();
router.get('/', ScrapTag_1.scrapTagControl.scrapTag);
router.post('/', ScrapTag_1.scrapTagControl.createScrapTag);
exports.default = router;
//# sourceMappingURL=ScrapTag.js.map