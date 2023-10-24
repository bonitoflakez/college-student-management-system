import express from "express";

import { fetchCourse } from "../controllers/fetchers/fetchCourse.controller";
import { fetchBranch } from "../controllers/fetchers/fetchBranch.controller";
import { fetchGroup } from "../controllers/fetchers/fetchGroups.controller";
import { fetchSubject } from "../controllers/fetchers/fetchSubject.controller";

const router = express.Router();

router.get("/course", fetchCourse);
router.get("/branch", fetchBranch);
router.get("/group", fetchGroup);
router.get("/subject", fetchSubject);

export default router;
