import express from "express";

import greetingsRoute from "./greetings.route";
import adminRoute from "./admin.route";

const router = express.Router();

router.use("/hello", greetingsRoute);
router.use("/admin", adminRoute);

export default router;
