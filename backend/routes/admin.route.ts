import express from "express";

import { AddUser } from "../controllers/admin/admin.controller";

const router = express.Router();

router.post("/addUser", AddUser);

export default router;