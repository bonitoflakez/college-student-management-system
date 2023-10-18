import express from "express";

import { AddStudentDetails } from "../controllers/AddStudentDetails.controller";
import TokenVerifier from "../middleware/TokenVerifier.middleware";
import { FacultyAdminVerifier } from "../middleware/FacultyAdminVerifier.middleware";

const router = express.Router();

router.post(
  "/add-details",
  TokenVerifier,
  FacultyAdminVerifier,
  AddStudentDetails
);

export default router;
