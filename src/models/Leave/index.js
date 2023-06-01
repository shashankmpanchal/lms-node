const express = require("express");

const router = express.Router();
const controller = require("./leave.controller");
const { applyLeave } = require("./leave.Validation");

const checkAuth = require("../../middleware/checkAuth");

router.post("/apply-leave", checkAuth, applyLeave, controller.applyLeave);
router.post("/update-leave/:id", checkAuth, controller.updateLeave);
router.get("/get-leave", checkAuth, controller.getUserLeave);
router.get("/leave-count", checkAuth, controller.LeaveCount);
router.post("/approve-leave/:id", checkAuth, controller.approveLeave);

module.exports = router;
