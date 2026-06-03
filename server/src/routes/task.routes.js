import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js"
import { createTask,getTask,updateTask,deleteTask } from "../controllers/task.controller.js";

const router= express.Router()

router.post('/',authMiddleware,createTask)
router.get('/',authMiddleware,getTask)
router.patch('/:taskId',authMiddleware, updateTask)
router.delete('/:taskId',authMiddleware,deleteTask)

export default router