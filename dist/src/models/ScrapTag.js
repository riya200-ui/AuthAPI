"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var mongoose_1 = __importDefault(require("mongoose"));
var ScrapTagSchema = new mongoose_1.default.Schema({
    scrapTagId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    tag: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true,
    }
});
exports.default = mongoose_1.default.model("ScrapTag", ScrapTagSchema);
//# sourceMappingURL=ScrapTag.js.map