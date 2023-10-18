import express from "express";

import tokeVerifierTest from "./TokeVerifierTest.route";
import studentRoute from "./student.route";
import facultyRoute from "./faculty.route";
import registerRoute from "./auth.route";
import authRoute from "./auth.route";

const router = express.Router();

router.use("/token", tokeVerifierTest);
router.use("/student", studentRoute);
router.use("/faculty", facultyRoute);
router.use("/register", registerRoute);
router.use("/auth", authRoute);

export default router;
