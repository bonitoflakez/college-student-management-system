import express from "express";

import { AddUser } from "../controllers/register.controller";
import { Login } from "../controllers/login.controller";
import UserCheck from "../middleware/UserCheck.middleware";

const router = express.Router();

router.post("/login", Login)
router.post("/register", UserCheck, AddUser);

export default router;