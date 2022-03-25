"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var mongoose_1 = __importDefault(require("mongoose"));
var SourcesSchema = new mongoose_1.default.Schema({
    sourceId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    sourceName: {
        type: String,
        required: [true, "Please enter your sourcename!"],
        trim: true,
    },
});
exports.default = mongoose_1.default.model("Sources", SourcesSchema);
//# sourceMappingURL=Sources.js.map