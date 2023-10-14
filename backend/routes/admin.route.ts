import express from "express";

import { AddUser } from "../controllers/admin.controller";
import UserCheck from "../middleware/UserCheck.middleware";

const router = express.Router();

router.post("/addUser", UserCheck, AddUser);

export default router;