import { useOutletContext } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";

function Login(){
    const [newLogin,setLogin] = useState({
        userEmail: "",
        userPassword: ""
    })

    function handleChange(e){
        setLogin({
            ...newLogin,
            [e.target.id]: e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        const email = newLogin.userEmail
        const password = newLogin.userPassword
        try{
            const response = await axios.post(`/api/v1/user/login`,{email,password})
            const token = response.data.token
            localStorage.setItem('token',token)
            console.log(response.data)
        } catch (err){
            console.error(err.response.data)
        }

    }

    return (
        <div id="login-Form">
            <form onSubmit={handleSubmit}>
                <input type="text" id="userEmail" value={newLogin.userEmail} placeholder="email" onChange={handleChange}></input>
                <br/>
                <input type="text" id="userPassword" value={newLogin.userPassword} placeholder="password" onChange={handleChange}></input>
                <br/>
                <input type="submit" name="submit" value="login"></input>
            </form>
        </div>
    )
}


export default Login