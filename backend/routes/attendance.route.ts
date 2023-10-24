import express from "express";

import { Attendance } from "../controllers/Attendance.controller";
import TokenVerifier from "../middleware/TokenVerifier.middleware";
import { FacultyAdminVerifier } from "../middleware/FacultyAdminVerifier.middleware";
import { ValidUserVerifier } from "../middleware/ValidUserVerifier.middleware";
import { fetchAttendance } from "../controllers/fetchers/fetchAttendance.controller";

const router = express.Router();

router.post("/mark", TokenVerifier, FacultyAdminVerifier, Attendance);
router.post("/fetch", TokenVerifier, ValidUserVerifier, fetchAttendance);

export default router;
