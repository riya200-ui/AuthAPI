"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTemp = void 0;
var fs_1 = __importDefault(require("fs"));
var removeTemp = function (path) {
    return fs_1.default.unlink(path, function (error) {
        if (error)
            throw error;
    });
};
exports.removeTemp = removeTemp;
//# sourceMappingURL=removeTemp.js.map