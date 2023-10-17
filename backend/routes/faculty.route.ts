import express from "express";

import { AddFacultyDetails } from "../controllers/AddFacultyDetails.controller";
import TokenVerifier from "../middleware/TokenVerifier.middleware";
import { AdminVerifier } from "../middleware/AdminVerifier.middleware";

const router = express.Router();

router.post("/add-details", TokenVerifier, AdminVerifier, AddFacultyDetails);

export default router;
