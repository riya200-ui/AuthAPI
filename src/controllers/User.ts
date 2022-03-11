import "dotenv/config";
//export default mongoose.model("Users", userSchema); Users from here
import Users from "../models/User";

import bcrypt from "bcrypt";
//import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
//import UserSchema from '../models/UserSchema';
//import { sendMail } from './sendMail';
//import nodemailer from 'nodemailer';
import { NodeMail } from "./SendMail";

export interface TypedRequest<T> extends Request {
  body: T;

  user?: T;
}

export interface Payload {
  name?: string;
  email?: string;
  password?: string;
  id?: string | number;
}

export class UserControl {
  async register(
    req: TypedRequest<{ name: string; email: string; password: string }>,
    res: Response
  ) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Please fill in all fields correctly!",
          error: true,
        });
      }

      if (!validateEmail(email)) {
        return res
          .status(400)
          .json({ message: "email is invalid!", error: true });
      }

      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "This email has already registered in our database",
          error: true,
          body: req.body,
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          message: "password must be at least 6 characters",
          error: true,
        });
      }

      const passwordHashed = await bcrypt.hash(password, 12);
      const otp = Math.floor(100000 + Math.random() * 900000);
      const nodeMail = new NodeMail();
      await nodeMail.sendEmail(otp,email);

      var where = { email: email };
      await Users.updateOne(where, { otp: otp });
        

      const newUser = new Users({
        name,
        email,
        password: passwordHashed,
        otp ,
        otpVerified: false,
      });
      await newUser.save();

      return res.status(200).json({
        message: "successfully registered!",
        registered: true,
        data: newUser,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async emailVerificataion(
    req: TypedRequest<{ email: string; otp: string }>,
    res: Response
  ) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({
          message: "Please fill in all fields correctly!",
          error: true,
        });
      }

      if (!validateEmail(email)) {
        return res
          .status(400)
          .json({ message: "email is invalid!", error: true });
      }

      let user = await Users.findOne({ email, otp });
      if (user) {
        var query = { email: email };
        await Users.updateOne(query, { otpVerified: true,otp: 0 });
        

        return res.status(200).json({
          message: "otp is verified!",
          activated: true,
        });
      } else {
        return res.status(200).json({
          message: `We are sorry, OTP not matched`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: `user is not exists', ${error.message}`,
      });
    }
  }

  async signin(
    req: TypedRequest<{ email: string; password: string }>,
    res: Response
  ) {
    try {
      const { email, password } = req.body;
      console.log("email, password", req.body);
      if (!(email && password))
        return res.status(200).json({
          success: false,
          message: "Please enter both email and password",
        });

      const userByEmail = await Users.findOne({ email ,otpVerified:true});
      if (!userByEmail) {
        return res
          .status(400)
          .json({ message: "This email  , otpverified does not exist in our database!" });
      }
      

      const hashedPassword = userByEmail.password;

      const isPassword = await new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, isMatched) => {
          if (err) {
            reject(err);
          } else if (isMatched) {
            resolve(isMatched);
          } else {
            resolve(isMatched);
          }
        });
      });
      
      if (isPassword) {
        return res.status(200).json({ message: "signin successed!" });
      } else {
        return res.status(400).json({ message: "Password doesn't match!" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  async signout(
    req: TypedRequest<{ email: string; password: string }>,
    res: Response
  ) {
    try {
      const { email, password } = req.body;
      console.log("email, password", req.body);
      if (!(email && password))
        return res.status(200).json({
          success: false,
          message: "Please enter both email and password",
        });

      const userByEmail = await Users.findOne({ email ,otpVerified:true});
      if (!userByEmail) {
        return res
          .status(400)
          .json({ message: "This email  , otpverified does not exist in our database!" });
      }
      

      const hashedPassword = userByEmail.password;

      const isPassword = await new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, isMatched) => {
          if (err) {
            reject(err);
          } else if (isMatched) {
            resolve(isMatched);
          } else {
            resolve(isMatched);
          }
        });
      });
      
      if (isPassword) {
        return res.status(200).json({ message: "signout successed!" });
      } else {
        return res.status(400).json({ message: "Password doesn't match!" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  
 

  getRefreshToken(req: Request, res: Response) {
    try {
      const refreshToken: string = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(400).json({ message: "please signin first!" });
      }

      const tokenAccess = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      );

      if (!tokenAccess) {
        return res
          .status(403)
          .json({ message: "please signin first to get the token!" });
      }

      const user = tokenAccess as Payload;

      const access_token = createAccessToken({
        id: user.id,
      });

      return res.status(200).json({ access_token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async forgotPassword(req: TypedRequest<{ email: string }>, res: Response) {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "This email does not exist!" });
      } else {
        const forgotPasswordOTP = Math.floor(100000 + Math.random() * 900000);
        const nodeMail = new NodeMail();
        await nodeMail.sendEmail(forgotPasswordOTP, email);

        var where = { email: email };
        await Users.updateOne(where, { forgotPasswordOTP: forgotPasswordOTP });
        return res.status(200).json({
          message: "We have sent OTP on your registered email!",
        });
      }
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async forgotpasswordVerificataion(
    req: TypedRequest<{ forgotPasswordOTP: string; email: string }>,
    res: Response
  ) {
    try {
      //let token;
      // get the user data from client
      const { forgotPasswordOTP, email } = req.body;
      //const  forgotPasswordOTP = forgotPassworOTP;
      // create a guard close
      if (!forgotPasswordOTP) {
        return res.status(400).json({
          message: "Please fill in all fields correctly!",
          error: true,
        });
      }
      // check if email has already registered
      let user = await Users.findOne({ forgotPasswordOTP, email });
      if (user) {
        //remove forgetpassword in db
        var where = { email: email };
        await Users.updateOne(where, { forgotPasswordOTP: 0 });

        return res.status(200).json({
          message: "forgotPassworOTP is verified!",
          activated: true,
        });
      } else {
        return res.status(200).json({
          message: `We are sorry, forgotPassworOTP not matched`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: `user is not exists', ${error.message}`,
      });
    }
    /* const user = { otpVerified: 'false' };
        userSchema.update(user, { otpVerified: 'true'})*/
  }

  async resetPassword(
    req: TypedRequest<{ newpassword: string } & Payload>,
    res: Response
  ) {
    try {
      // get user new password from client
      const { newpassword } = req.body;

      // hash the new password
      const hashedPassword = await bcrypt.hash(newpassword, 12);

      // update the password of user in the database
      await Users.findOneAndUpdate(
        { _id: req.user?.id },
        {
          password: hashedPassword,
        }
      );

      return res
        .status(200)
        .json({ message: "your password successully changed!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async changePassword(
    req: TypedRequest<
      { email: string; password: string; newpassword: string } & Payload
    >,
    res: Response
  ) {
    try {
      // get user new password from client
      const { email, password, newpassword } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Please fill in all fields correctly!",
          error: true,
        });
      }

      if (!validateEmail(email)) {
        return res
          .status(400)
          .json({ message: "email is invalid!", error: true });
      }

      // check if email has already registered
      let user = await Users.findOne({ email, password });
      if (user) {
        // hash the new password
        const hashedPassword = await bcrypt.hash(newpassword, 12);

        // update the password of user in the database
        await Users.findOneAndUpdate(
          { _id: req.user?.id },
          {
            password: hashedPassword,
          }
        );
      }
      return res
        .status(200)
        .json({ message: "your password successully changed!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getUserInformation(req: TypedRequest<Payload>, res: Response) {
    try {
      const user = await Users.findById(req.user?.id).select("-password");
      console.log(user);

      return res.status(200).json({ message: "get user successful", user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getAllUsersInformation(_req: Request, res: Response) {
    try {
      const users = await Users.find().select("password");

      return res
        .status(200)
        .json({ message: "get all users from database", users });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateUser(
    req: TypedRequest<{ name: string; email: string } & Payload>,
    res: Response
  ) {
    try {
      const { name, email } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.user?.id },
        {
          name,
          email,
        }
      );

      return res
        .status(200)
        .json({ message: "your profile updated successfully!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateUserRole(
    req: TypedRequest<{ role: number } & { id: string | number }>,
    res: Response
  ) {
    try {
      const { role } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          role,
        }
      );

      return res.status(200).json({ message: "updated successfully!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await Users.findByIdAndDelete(req.params.id);

      return res
        .status(200)
        .json({ message: "your account deleted successfully!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const userControl = new UserControl();

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function createActivationToken(payload: Payload) {
  return jwt.sign(payload, process.env.SECRET_KEY!, {
    expiresIn: "20m",
  });
}

export function createAccessToken(payload: Payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
}

export function createRefreshToken(payload: Payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
}
