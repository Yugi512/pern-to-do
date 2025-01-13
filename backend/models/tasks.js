import {DataTypes} from 'sequelize';
import {sequelize} from '../config/db.js';
import Users from './users.js';

const Tasks = sequelize.define('Task',{
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
    userID:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'userID'
        }
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull:true
    }
    
})

Tasks.schema('public')
export default Tasks;