import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRouter from "./src/routes";
import helmet from "helmet";

// import path from "path";
// import fileUpload from "express-fileupload";
//"dev": "tsc-watch --onSuccess \"node ./index.ts\"",

(() => {
  const app = express();

  // miscellaneous
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(helmet());

  // routes
  app.use("/", indexRouter);
  app.get("/", (_req: Request, res: Response) => {
    res.send(" <div><h1>God bless humanity!</h1></div>  ");
  });

  app.post("/", (_req: Request, res: Response) => {
    res.send(" <div><h1>God bless humanity!</h1></div>  ");
  });

  // connect to db
  const URI = process.env.MONGODB_URL ?? "";
  mongoose.connect(
    URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify : false,
    },
    (err) => {
      if (err) throw err;
      console.log("connected to db");
    }
  );

  const PORT = process.env.PORT ?? 5000;
  app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
  });
})();
