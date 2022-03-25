import express from "express";
//export const userControl = new UserControl(); from user const controller
import { userControl } from "../controllers/User";
//const nodemailer = require("nodemailer");

const router = express.Router();

//export class UserControl {async register( register from here
router.get("/", userControl.getUsers);
router.post("/register", userControl.register);

router.post("/emailVerificataion", userControl.emailVerificataion);

router.post("/signin", userControl.signin);

router.post("/forgotPassword", userControl.forgotPassword);
router.post(
  "/forgotpasswordVerificataion",
  userControl.forgotpasswordVerificataion
);
router.post("/resetPassword", userControl.resetPassword);

//router.post("/changePassword", userControl.changePassword);

//router.post("/updateUser", userControl.changePassword);
router.post("/signout", userControl.signout);
router.delete("/:id", userControl.deleteuser);
router.patch('/:id', userControl.updateuser);

export default router;
