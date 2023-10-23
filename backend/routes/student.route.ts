import express from "express";

import { AddStudentDetails } from "../controllers/AddStudentDetails.controller";
import TokenVerifier from "../middleware/TokenVerifier.middleware";
import { FacultyAdminVerifier } from "../middleware/FacultyAdminVerifier.middleware";
import {
  SearchStudent,
  fetchStudentInfo,
} from "../controllers/fetchers/fetchStudentInfo.controller";
import { ValidUserVerifier } from "../middleware/ValidUserVerifier.middleware";

const router = express.Router();

router.post(
  "/add-details",
  TokenVerifier,
  FacultyAdminVerifier,
  AddStudentDetails
);

router.post("/get-details", TokenVerifier, ValidUserVerifier, fetchStudentInfo);
router.post("/search", TokenVerifier, FacultyAdminVerifier, SearchStudent);

export default router;
