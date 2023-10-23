import express from "express";

import { Attendance } from "../controllers/Attendance.controller";
import TokenVerifier from "../middleware/TokenVerifier.middleware";
import { FacultyAdminVerifier } from "../middleware/FacultyAdminVerifier.middleware";

const router = express.Router();

router.post("/mark", TokenVerifier, FacultyAdminVerifier, Attendance);

export default router;
