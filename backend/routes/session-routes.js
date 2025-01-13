import express from "express";
import { deleteSessionsTask, getSessionsTask, getSessionsTasks, patchSessionsTask, postSessionsTask } from "../controllers/sessionController.js";

const sessionsRouter = express.Router()

sessionsRouter.get("/tasks",getSessionsTasks)
sessionsRouter.get("/tasks/:id",getSessionsTask)
sessionsRouter.post("/task",postSessionsTask)
sessionsRouter.patch("/tasks/:id",patchSessionsTask)
sessionsRouter.delete("/tasks/:id",deleteSessionsTask)
export default sessionsRouter