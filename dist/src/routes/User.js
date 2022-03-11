"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var User_1 = require("../controllers/User");
var router = express_1.default.Router();
router.post("/register", User_1.userControl.register);
router.post("/emailVerificataion", User_1.userControl.emailVerificataion);
router.post("/signin", User_1.userControl.signin);
router.post("/forgotPassword", User_1.userControl.forgotPassword);
router.post("/forgotpasswordVerificataion", User_1.userControl.forgotpasswordVerificataion);
router.post("/resetPassword", User_1.userControl.resetPassword);
router.post("/changePassword", User_1.userControl.changePassword);
router.post("/updateUser", User_1.userControl.changePassword);
router.post("/signout", User_1.userControl.signout);
exports.default = router;
//# sourceMappingURL=User.js.map