// need to reroute the task route to the to sessions and access the sesssions table 
import { pool } from "../config/db.js";

export const getSessionsTask = async (req,res) =>{
    try{
        const {id} = req.params;
        const task = await pool.query('SELECT * FROM "sessions" WHERE id=$1',[id])
        if(task.rows.length !==0){
            res.json(task.rows[0])
        } 
        if(task.rows.length === 0){
            res.status(404).json({"success":false,"message": "No data found"})
        }
    }catch (error){
        console.log("Error with retreiving data from Database: ", error)
    }
}

export const getSessionsTasks = async (req,res) =>{
    try{
        const allSessionsTask = await pool.query('SELECT * FROM "sessions"')
        res.json(allSessionsTask.rows)
    }catch (error){
        console.log("Error with retreiving data from Database: ", error)
    }
}


// just for user sessions
export const postSessionsTask = async (req,res)=>{
    try{
        const { taskName, taskDescription} = req.body
        const newTask = await pool.query(
            'INSERT INTO "sessions" ("taskName","taskDescription") VALUES($1,$2) RETURNING *',
            [taskName, taskDescription]
        )
        res.status(200).json({"success":true,"message":"Task succesfully added","row":newTask.rows[0]})
    } catch(error){
        console.log(error)
    }
};
// for user sessions
export const patchSessionsTask = async (req,res) => {
    const {id} = req.params
    const {taskName,taskDescription,completed} = req.body
    try{    
        if(taskDescription){
            const updatedDescription = await pool.query('UPDATE "sessions" SET "taskDescription" = $1 WHERE "id" = $2',
            [taskDescription,id])
        }
        if(taskName){
            const updateName = await pool.query(
                'UPDATE "sessions" SET "taskName" = $1 WHERE "id" = $2',
                [taskName,id]
                )
        }
        if(completed){
            const complete = await pool.query(
                'UPDATE "sessions" SET "completed" = $1 WHERE "id" = $2',
                [completed,id]
                )
        }
        res.status(200).json({"success":true,"message":"Task successfully updated"})
    } catch(error){
        console.error("Error in updating task Info: ", error)
    }

}

export const deleteSessionsTask = async (req,res) => {
    try{
        const {id} = req.params
        const deletedTask = await pool.query('DELETE FROM "sessions" WHERE id = $1',[id])
        res.status(200).json({"success":true,"message":"Task succesfully deleted"})
    } catch(error){
        res.status(400).json({"success":false,"message":"Task couldnt be deleted"})
    }
}