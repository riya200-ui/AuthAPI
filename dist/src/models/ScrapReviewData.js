"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var mongoose_1 = __importDefault(require("mongoose"));
var scrapReviewDataSchema = new mongoose_1.default.Schema({
    scrapReviewDataId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    scrapCompanyData: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ScrapCompanyDataId', required: [true, "Please enter your scrapactivityId!"] },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, "Please enter your userId!"],
    },
    review: {
        type: String,
        required: [true, "Please enter your tag!"],
        trim: true,
    },
    rate: {
        type: String || Number,
        required: [true, "Please enter your rate!"],
        trim: true,
    },
    location: {
        type: String,
        required: [true, "Please enter your location!"],
        trim: true,
    },
    industry: {
        type: String,
        required: [true, "Please enter your industry!"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: [true, "Please enter your phonenumber!"],
    },
    linkedinURL: {
        type: String,
        required: [true, "Please enter your linkedinurl!"],
        trim: true,
    },
    contactNotes: {
        type: String,
        required: [true, "Please enter your contactnotes!"],
        trim: true,
    },
    contactDate: {
        type: Date,
        required: [true, "Please enter your contactdate!"],
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
exports.default = mongoose_1.default.model("ScrapReviewData", scrapReviewDataSchema);
//# sourceMappingURL=ScrapReviewData.js.map