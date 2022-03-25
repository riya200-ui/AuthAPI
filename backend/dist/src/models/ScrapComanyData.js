"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var mongoose_1 = __importDefault(require("mongoose"));
var scrapCompanyDataSchema = new mongoose_1.default.Schema({
    scrapCompanyDataID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    scrapActivity: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ScrapActivityId', required: [true, "Please enter your scrapactivityId!"] },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, "Please enter your userId!"],
    },
    cname: {
        type: String,
        required: [true, " company name by scrapping!"],
        trim: true
    },
    url: {
        type: String,
        required: [true, "Please enter your url!"],
        trim: true
    },
    rate: {
        type: String || Number,
        required: [true, "Please enter your rate!"],
    },
    location: {
        type: String,
        required: [true, "Please enter your location!"],
        trim: true,
    },
    size: {
        type: String || Number,
        required: [true, "Please enter your size!"],
        trim: true,
    },
    status: {
        type: String,
        required: [true, "Please enter your status!"],
        trim: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("ScrapCompanyData", scrapCompanyDataSchema);
//# sourceMappingURL=ScrapComanyData.js.map