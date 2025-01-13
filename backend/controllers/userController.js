import {pool} from "../config/db.js"
import bcrypt from "bcryptjs"

// FIGURE OUT TO MAKE IT SO THAT WE CAN MAKE THE FORMS SEND ENOUGH DATA TO RETRIEVE TASK ID FROM REQ BODY 


export const getUsers = async (req,res) => {
    try{
        const allUsers = await pool.query('SELECT * FROM "Users"')
        res.json(allUsers.rows)
    } catch (err){
        console.error("Error in retrieving data: ", err)
    }
}

export const getUser = async (req,res) => {
    try{
        const {userEmail} = req.params
        const user = await pool.query('SELECT * FROM "Users" WHERE "userEmail"= $1',[userEmail]);
        res.json(user.rows[0])
    } catch (error){
        console.error("Error in retrieving user : ", error)
    }
}

export const getUserTask = async (req,res) => {
    const {userEmail,taskID} = req.params
    const userID = (await pool.query('SELECT * FROM "Users" WHERE "userEmail" = $1',[userEmail])).rows[0].userID
    try{
        const task = await pool.query('SELECT * FROM "Tasks" WHERE "id" = $1 AND "userID" = $2', [taskID,userID])
        res.json(task.rows[0])
    }catch (err){
        console.error("Error retrieving user tasks: ", err);
    }
}

export const postUser = async (req,res) => {
    try {
        const {userName,userEmail,userPassword} = req.body;
        const hashedPassword = await bcrypt.hash(userPassword,10)
        const newUser = await pool.query(
            'INSERT INTO "Users" ("userName","userEmail","userPassword") VALUES($1,$2,$3) RETURNING *',
            [userName,userEmail,hashedPassword]
        )
        res.json(newUser.rows[0]);
    } catch (err){
        console.error("Error creating user: ", err);
    }
}
export const patchTasksName = async (req,res) => {
    const {userEMAIL,taskID} = req.params
    const userID = (await pool.query('SELECT * FROM "Users" WHERE "userEmail" = $1',[userEMAIL])).rows[0].userID
    try {
        const {taskName} = req.body
        const updateName = await pool.query(
            'UPDATE "Tasks" SET "taskName" = $1 WHERE "id" = $2 and "userID" = $3',
            [taskName,taskID,userID]
            )
            res.status(200).json({"success":true,"message":"Task successfully updated"})
    } catch (err) {
        console.log(
            "Error in updating Task Name: ", err
        )
    }
}

export const taskCompleted = async (req,res) => {
    const {userEMAIL,taskID} = req.params
    const userID = await pool.query('SELECT * FROM "Users" WHERE "userEmail" = $1',[userEMAIL]).rows[0].userID
    try{
        const {completed} = req.body
        if(completed){
            const complete = await pool.query(
                'UPDATE "Tasks" SET "completed" = $1 WHERE "id" = $2 AND "userID" = $3' ,
                [completed,taskID,userID]
                )
        }
    } catch (err){
        console.error("Error in marking task completed: ",err)
    }
}

export const patchTasksDescription = async (req,res) => {
    const {userEMAIL,taskID} = req.params
    const userID = (await pool.query('SELECT * FROM "Users" WHERE "userEmail" = $1',[userEMAIL])).rows[0].userID
    try {
        const {taskDescription} = req.body
        const updateDescription = await pool.query(
            'UPDATE "Tasks" SET "taskDescription" = $1 WHERE "id" = $2 and "userID" = $3 ',
            [taskDescription,taskID,userID]
            )
            res.status(200).json({"success":true,"message":"Task successfully updated"})
    } catch (err) {
        console.log(
            "Error in updating Task Description: ", err
        )
    }
}

export const getUserTasks = async (req,res) => {
    const {userEmail} = req.params
    const userID = (await pool.query('SELECT * FROM "Users" WHERE "userEmail" = $1',[userEmail])).rows[0].userID
    try{
        const tasks = await pool.query('SELECT * FROM "Tasks" WHERE "userID" = $1',[userID])
        res.json(tasks.rows)
    } catch (err){
        console.error("Error in retrieving all tasks: ",err)
    }
};

export const patchUser = async (req,res) => {
    const {userEMAIL} = req.params
    const {userName,userEmail,userPassword,loggedIn} = req.body
    const id = (await pool.query('SELECT * FROM "Users" WHERE "userEmail" = $1',[userEMAIL])).rows[0].userID
    try{
        if(userName){
            const updatedName = await pool.query('UPDATE "Users" SET "userName" = $1 where "userID" = $2',[userName,id])
        }
        if(userEmail){
            const updatedEmail = await pool.query('UPDATE "Users" SET "userEmail" = $1 where "userID" = $2',[userEmail,id])
        }
        if(userPassword){
            const updatedPassword = await pool.query('UPDATE "Users" SET "userPassword" = $1 where "userID" = $2',[userPassword,id])
        }
        if(loggedIn){
            const loggedInAcc = await pool.query('UPDATE "Users" SET "loggedIn" = $1 where "userID" = $2',[loggedIn,id])
        }
        res.status(200).json({"success":true,"message":"User successfully updated"})
    } catch(error){
        console.error("Error while updating user information: ", error)
    }
}

export const postUserTask = async (req,res) => {
    const {userEmail} = req.params
    const id = (await pool.query('SELECT * FROM "Users" WHERE "userEmail" = $1',[userEmail])).rows[0].userID
    try{
        const { taskName, taskDescription, userID} = req.body
        if (!userID){        
            const newTask = await pool.query(
                'INSERT INTO "Tasks" ("taskName","taskDescription","userID") VALUES($1,$2,$3) RETURNING *',
                [taskName, taskDescription, id]
            )
            res.json(newTask.rows[0])
            res.status(200).json({"success":true,"message":"Task succesfully added"})
        } else{
            res.status(404).json({"success":false,"message":"Error creating task"})
        }
    } catch(error){
        console.log(error)
    }
}

export const deleteUserTask = async (req,res) => {
    const {userEmail,taskID} = req.params
    const userID = (await pool.query('SELECT * FROM "Users" WHERE "userEmail" = $1',[userEmail])).rows[0].userID
    try {
        if(userID){
            if(taskID){
                const deleteTask = await pool.query('DELETE FROM "Tasks" WHERE "id" = $1 AND "userID" = $2',[taskID,userID])
            }
        }
        res.status(200).json({"success":true,"message":"Task succesfully deleted"})
    } catch (err) {
        console.error("Error deleting user task: ",err)
    }
}


export const deleteUser = async (req,res) => {
    try{
        const {userEmail} = req.params
        const id = (await pool.query('SELECT * FROM "Users" WHERE "userEmail" = $1',[userEmail])).rows[0].userID
        const deleteUser = await pool.query('DELETE FROM "Users" WHERE "userID" = $1',[id])
        res.status(200).json({"success":true,"message":"User succesfully deleted"})
    } catch(error){
        res.status(400).json({"success":false,"message":"User couldnt be deleted"})
    }
}