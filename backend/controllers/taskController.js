import {pool, sequelize} from "../config/db.js"

export const getTask = async (req,res) =>{
    try{
        const {id} = req.params;
        const task = await pool.query('SELECT * FROM "Tasks" WHERE id=$1',[id])
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

export const getTasks = async (req,res) =>{
    try{
        const allTasks = await pool.query('SELECT * FROM "Tasks"')
        res.json(allTasks.rows)
    }catch (error){
        console.log("Error with retreiving data from Database: ", error)
    }
}


// just for user tasks
export const postTask = async (req,res)=>{
    try{
        const { taskName, taskDescription, userID} = req.body
        const newTask = await pool.query(
            'INSERT INTO "Tasks" ("taskName","taskDescription","userID") VALUES($1,$2,$3) RETURNING *',
            [taskName, taskDescription, userID]
        )
        res.json(newTask.rows[0])
        res.status(200).json({"success":true,"message":"Task succesfully added"})
    } catch(error){
        console.log(error)
    }
};
// for user tasks
export const patchTasks = async (req,res) => {
    const {id} = req.params
    const {userID,taskName,taskDescription,completed} = req.body
    try{    
        if(userID){
            const updatedUserID = await pool.query('UPDATE "Tasks" SET "userID" = $1 WHERE "id" = $2',
            [userID,id])
        }
        if(taskDescription){
            const updatedDescription = await pool.query('UPDATE "Tasks" SET "taskDescription" = $1 WHERE "id" = $2',
            [taskDescription,id])
        }
        if(taskName){
            const updateName = await pool.query(
                'UPDATE "Tasks" SET "taskName" = $1 WHERE "id" = $2',
                [taskName,id]
                )
        }
        if(completed){
            const complete = await pool.query(
                'UPDATE "Tasks" SET "completed" = $1 WHERE "id" = $2',
                [completed,id]
                )
        }
        res.status(200).json({"success":true,"message":"Task successfully updated"})
    } catch(error){
        console.error("Error in updating task Info: ", error)
    }

}

export const deleteTasks = async (req,res) => {
    try{
        const {id} = req.params
        const deletedTask = await pool.query('DELETE FROM "Tasks" WHERE id = $1',[id])
        res.status(200).json({"success":true,"message":"Task succesfully deleted"})
    } catch(error){
        res.status(400).json({"success":false,"message":"Task couldnt be deleted"})
    }
}

// module.exports = {getTask, postTask, patchTask, deleteTasks};