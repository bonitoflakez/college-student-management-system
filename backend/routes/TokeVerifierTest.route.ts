import express from "express";

import { TokeVerifierTest } from "../controllers/TokeVerifierTest.controller";
import TokenVerifier from "../middleware/TokenVerifier.middleware";

const router = express.Router();

router.post("/verify", TokenVerifier, TokeVerifierTest);

export default router;
