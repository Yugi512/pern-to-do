import express from "express";
import { getTask,getTasks,postTask,deleteTasks, patchTasks} from "../controllers/taskController.js";


const taskRouter = express.Router()

taskRouter.get("/tasks",getTasks)
taskRouter.get("/tasks/:id", getTask)
taskRouter.post("/task",postTask);
taskRouter.patch("/tasks/:id",patchTasks)
taskRouter.delete("/tasks/:id",deleteTasks)

export default taskRouter;