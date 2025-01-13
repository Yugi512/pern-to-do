import {useState} from "react"
import { useOutletContext } from "react-router-dom"
import SessionInputForm from "./sessionInputForm"
import CompletedButton from "./completedButton"

function ListSessionTasks(){
    const {sessionTasks,setSessionTasks} = useOutletContext()
    
    function updateSessionList(task){
        setSessionTasks([...sessionTasks,task])
    }

    const completedTask = sessionTasks.map((task,index) => {
        if (task.completed === true){
            return <div className="task" id={index} key={task.id}>
                <h4>{task.taskName}</h4>
                <p>{task.taskDescription}</p>
                <button>edit</button>
                <CompletedButton taskID={task.id} completed={task.completed}/>
            </div>
        } 
    })

    const uncompletedTask  = sessionTasks.map((task,index) => {
        if (task.completed === false){
            return <div className="task" id={index} key={task.id}>
                <h4>{task.taskName}</h4>
                <p>{task.taskDescription}</p>
                <button>edit</button>
                <CompletedButton taskID={task.id} completed={task.completed}/>
            </div>
        } 
    })
    return (
        <>
            <SessionInputForm updateSessionList={updateSessionList}/>
            <div id="uncompleted-tasks"> 
            {uncompletedTask}
            </div>
            <div id="completed-tasks">
            {completedTask}
            </div>
        </>
    )
} 

export default ListSessionTasks