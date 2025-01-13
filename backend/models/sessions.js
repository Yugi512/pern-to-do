import { DataTypes, JSONB } from "sequelize";
import { sequelize } from "../config/db.js";

const sessions = sequelize.define('sessions',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    taskName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    taskDescription:{
        type:DataTypes.STRING(300),
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull:true
    },
    temporary: true, // This makes it a temporary table
    // data:{ 
    //     type: DataTypes.TEXT
    // },
    // expires:{
    //     type: DataTypes.DATE
    // },
})

sessions.schema('public')

export default sessions;