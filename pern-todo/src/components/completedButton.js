import { useOutlet, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

function CompletedButton({taskID,completed}){
    const [done,setDone] = useState(false)
    const {sessionTasks,setSessionTasks} = useOutletContext()

    function updateSessionList(updatedTask){
        const newList = sessionTasks.map((task) => {
            if(task.id === updatedTask.id){
                return updatedTask
            } else{ return task}
        })
        setSessionTasks(newList)
    }

    useEffect(()=> {
        fetch(`http://localhost:5000/api/v1/sessions/tasks/${taskID}`,{
            method:"PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "completed": done
            })
        })
        .then(r => r.json())
        .then((updatedTask) => updateSessionList(updatedTask))
    },[done])

    function handleClick(){
        setDone(!done)
    }

    const button = <div id="mark-done">
        <input type="button" value={done ? "done" : "still in progress"} onClick={(e) => handleClick()}></input>
    </div>

    return button
}

export default CompletedButton;