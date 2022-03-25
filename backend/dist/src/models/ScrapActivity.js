"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var mongoose_1 = __importDefault(require("mongoose"));
var ScrapActivitySchema = new mongoose_1.default.Schema({
    source: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Sources', required: [true, "Please enter your sourceId!"] },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, "Please enter your userId!"],
    },
    tag: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'ScrapTag',
        required: [true, "Please enter your scrapTagsId!"],
    },
    url: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("ScrapActivity", ScrapActivitySchema);
//# sourceMappingURL=ScrapActivity.js.map