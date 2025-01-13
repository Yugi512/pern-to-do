import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function App() {

  const [sessionTasks,setSessionTasks] = useState([])

  async function fetchTasks(url,setter){
    await fetch(url)
          .then((r) => r.json())
          .then((tasks) => setter(tasks))
          .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchTasks("http://localhost:5000/api/v1/sessions/tasks",setSessionTasks)
  },[])

  window.addEventListener('unload',(e) => {
    fetch("http://localhost:5000/window-closed",{method: "POST"})
  })

  console.log(sessionTasks)
  return (
    <div className="App">
      <h1 className="App-header">
        TASKS
      </h1>
      <NavLink to="/login"></NavLink>
      <Outlet context={{sessionTasks:sessionTasks,setSessionTasks:setSessionTasks}}/>
    </div>
  );
}

export default App;
