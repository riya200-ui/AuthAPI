"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
    },
    otp: {
        type: Number,
        required: true,
    },
    otpVerified: {
        type: Boolean,
        required: true,
    },
    forgotPasswordOTP: {
        type: Number,
    },
    role: {
        type: Number,
        default: 0,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Users", userSchema);
//# sourceMappingURL=User.js.map