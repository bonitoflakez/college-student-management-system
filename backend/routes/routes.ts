import express from "express";

import greetingsRoute from "./greetings.route";

const router = express.Router();

router.use("/hello", greetingsRoute);

export default router;