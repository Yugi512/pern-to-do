import express from 'express'
import { getUsers,getUser,postUser,deleteUser, patchTasksDescription, patchTasksName, patchUser, getUserTasks, postUserTask, deleteUserTask, taskCompleted, getUserTask } from '../controllers/userController.js';
import { loginReq, verifyJWT } from '../oauth2-jwt-passkey/encryption.js';
const userRouter = express.Router();

userRouter.get("/users",getUsers)

userRouter.get("/users/:userEmail",getUser)

userRouter.get("/users/tasks/:userEmail",getUserTasks)

userRouter.get("/users/:userEmail/tasks/:taskID",getUserTask)

userRouter.post("/register",postUser);

userRouter.patch("/users/:userEMAIL/:taskID",async (req,res,next) => {
    const {taskName,taskDescription,completed} = req.body
    if(taskDescription){patchTasksDescription(req,res)}
    if(taskName){patchTasksName(req,res)}
    if(completed){taskCompleted(req,res)}
})

userRouter.patch('/users/:userEMAIL',patchUser)

userRouter.delete("/users/:userEmail",deleteUser)

userRouter.post("/users/:userEmail/task",postUserTask)
userRouter.delete("/users/:userEmail/:taskID",deleteUserTask)

userRouter.post("/user/login",loginReq)
userRouter.get("/user/logout",)

export default userRouter;

