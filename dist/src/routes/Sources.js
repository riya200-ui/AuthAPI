"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var Sources_1 = require("../controllers/Sources");
var router = express_1.default.Router();
router.get('/', Sources_1.sourcesControl.source);
router.post('/', Sources_1.sourcesControl.createsource);
exports.default = router;
//# sourceMappingURL=Sources.js.map