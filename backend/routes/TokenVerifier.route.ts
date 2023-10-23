import express from "express";

import { TokenVerifierController } from "../controllers/TokenVerifier.controller";
import TokenVerifier from "../middleware/TokenVerifier.middleware";

const router = express.Router();

router.post("/verify", TokenVerifier, TokenVerifier);

export default router;
