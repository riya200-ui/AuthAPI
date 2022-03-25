import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Payload } from "../controllers/User";

interface TypedRequest extends Request {
  user: Payload;
}

export const authMiddleware = (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    return res.status(400).json({ message: "Authorization failed!" });
  }

  try {
    return jwt.verify(
      authorization,
      process.env.ACCESS_TOKEN_SECRET!,
      (err, user) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Invalid authentication token" });
        }

        req.user = user as Payload;
        return next();
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
