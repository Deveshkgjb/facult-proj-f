// routes/leaveRoutes.js
import express from "express";
import { getLeaveByid, updateLeave, deleteLeave, fetchLeavesByfacultyId, addLeave, updateLeaveStatus, fetchUsersOnLeaveCurrentMonth, markStudentAbsence} from '../controllers/all.controller.js'
import { authenticateToken } from '../middlewares/req.js';

const router = express.Router();

router.get("/faculty/:facultyId", fetchLeavesByfacultyId);
router.get("/currentMonth/:facultyId", fetchUsersOnLeaveCurrentMonth);
router.get("/:id", getLeaveByid);
router.put("/faculty/:id", updateLeaveStatus);
router.put("/:id", updateLeave);
router.delete("/:id", deleteLeave);
router.post("/", addLeave);
router.post("/mark-absence", authenticateToken, markStudentAbsence);

export default router;
