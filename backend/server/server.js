import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {sequelize, pool} from "../config/db.js";
import session, { Session } from "express-session";
import taskRouter from "../routes/task-routes.js";
import Tasks from "../models/tasks.js" 
import Users from "../models/users.js";
import userRouter from "../routes/user-routes.js";
import sessions from "../models/sessions.js";
import passport from "passport"
import sessionsRouter from "../routes/session-routes.js";
import connectSessionSequelize from 'connect-session-sequelize';
import cookieParser from "cookie-parser";

const SequelizeStore = connectSessionSequelize(session.Store);


dotenv.config()

const taskRoutes = taskRouter
const userRoutes = userRouter
const app = express();


const store = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval:  10 * 60 * 1000, // Check for expired sessions every 15 minutes
    expiration: 24 * 60 * 60 * 1000 // Session expires in 24 hours
});
  
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.get('/', (req, res) => {
    res.cookie('myCookie', 'someValue', { maxAge: 0, httpOnly: true }); 
    res.send('Cookie set!');
  });
app.use("/api/v1",taskRoutes)
app.use("/api/v1",userRoutes)
app.post("/window-closed",async (req,res) => {
    try{
        await sessions.truncate()
        req.session.destroy()
    } catch (err){
        console.error("Error in deleting data from table, ",err)
    }
})

app.use("/api/v1/sessions",async (req,res,next ) => {
    session({
    store: store,
    table: "sessions",
    secret: "hexcode1224",
    resave:false,
    saveUninitialized:false,
    cookie: {maxAge: null}
    }),
    sessionsRouter(req,res,next)
})

async function connected(){
    try{
        await sequelize.authenticate()
        await Tasks.sync()
        await Users.sync()
        await sessions.sync()
        console.log("Database connected")
        console.log("Task table synchronized")
    } catch (error){
        console.error("Error in creating Database: ", error)
    }
}

connected()

Users.hasMany(Tasks, {as: "Task",foreignKey: "userID"})
Tasks.belongsTo(Users,{as:"User" ,foreignKey: "userID"})

app.listen(5000, ()=>{
    console.log("Server is running at http://localhost:5000")
});