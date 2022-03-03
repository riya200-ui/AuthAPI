import express from "express";
import { userControl } from "../controllers/User";
//const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/register", userControl.register);

router.post("/emailVerificataion", userControl.emailVerificataion);

router.post("/login", userControl.login);

router.post("/forgotPassword", userControl.forgotPassword);
router.post(
  "/forgotpasswordVerificataion",
  userControl.forgotpasswordVerificataion
);
router.post("/resetPassword", userControl.resetPassword);

router.post("/changePassword", userControl.changePassword);

router.post("/updateUser", userControl.changePassword);
router.post("/logout", userControl.logout);

export default router;
