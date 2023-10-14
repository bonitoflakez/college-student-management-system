import express from "express";

import { Login } from "../controllers/login.controller";

const router = express.Router();

router.post("/login", Login);

export default router;
