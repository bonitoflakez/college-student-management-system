import express from "express";

import tokeVerifierTest from "./TokenVerifier.route";
import studentRoute from "./student.route";
import facultyRoute from "./faculty.route";
import registerRoute from "./auth.route";
import authRoute from "./auth.route";
import attendanceRoute from "./attendance.route";
import gradesRoute from "./grades.route";
import defaultFetcher from './defaultFetcher.rotue';

const router = express.Router();

router.use("/token", tokeVerifierTest);
router.use("/student", studentRoute);
router.use("/faculty", facultyRoute);
router.use("/register", registerRoute);
router.use("/auth", authRoute);
router.use("/attendance", attendanceRoute);
router.use("/grades", gradesRoute);
router.use("/fetch", defaultFetcher);

export default router;
