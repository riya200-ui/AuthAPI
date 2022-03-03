const express = require("express");
const router = express();

import User from "./User";

router.use("/user", User);

export default router;
