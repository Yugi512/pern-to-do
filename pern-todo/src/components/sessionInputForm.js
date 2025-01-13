import { useState } from "react";

//after form is submitted the input bars must clear and reset 

function SessionInputForm({updateSessionList}){
    const [newTask,setNewTask] = useState({
        taskName: "",
        taskDescription: "",
        completed: false
    })

    function handleChange(event){
        setNewTask({
            ...newTask,
            [event.target.id]: event.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`http://localhost:5000/api/v1/sessions/task`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask)
        })
        .then((r) => r.json())
        .then((task) => {updateSessionList(task)})
    }
    return (
        <div className="form" id="submissionForm"> 
            <form onSubmit={(e) => handleSubmit(e)}> 
                <input
                    type="text"
                    id="taskName"
                    value={newTask.name}
                    placeholder="enter Task Name: "
                    onChange={handleChange}
                >
                </input>
                <br/>
                <input
                    type="text"
                    id="taskDescription"
                    value={newTask.name}
                    placeholder="enter Task Description: "
                    onChange={handleChange}
                ></input>
                <br/>
                <input type="submit" name="submit" value="add a task" className="submit">
                </input>
            </form>
        </div>
    )
}

export default SessionInputForm