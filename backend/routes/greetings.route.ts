import express from "express";

import { getGreetings } from "../controllers/greetings.controller";

const router = express.Router();

router.get("/greetings", getGreetings);

export default router;