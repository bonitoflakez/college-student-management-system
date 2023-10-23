import express from "express";

import { AddStudentGrades } from "../controllers/AddStudentGrades.controller";
import TokenVerifier from "../middleware/TokenVerifier.middleware";
import { FacultyAdminVerifier } from "../middleware/FacultyAdminVerifier.middleware";

const router = express.Router();

router.post("/add", TokenVerifier, FacultyAdminVerifier, AddStudentGrades);

export default router;
