import express from "express";

import tokeVerifierTest from "./TokeVerifierTest.route";
import studentRoute from "./student.route";
import adminRoute from "./admin.route";
import loginRoute from "./login.route";

const router = express.Router();

router.use("/token", tokeVerifierTest);
router.use("/student", studentRoute);
router.use("/admin", adminRoute);
router.use("/auth", loginRoute);

export default router;
