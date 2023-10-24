import express from "express";

import { AddStudentGrades } from "../controllers/AddStudentGrades.controller";
import TokenVerifier from "../middleware/TokenVerifier.middleware";
import { FacultyAdminVerifier } from "../middleware/FacultyAdminVerifier.middleware";
import { ValidUserVerifier } from "../middleware/ValidUserVerifier.middleware";
import { fetchGrades } from "../controllers/fetchers/fetchGrades.controller";

const router = express.Router();

router.post("/add", TokenVerifier, FacultyAdminVerifier, AddStudentGrades);
router.post("/fetch", TokenVerifier, ValidUserVerifier, fetchGrades);

export default router;
