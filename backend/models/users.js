import {DataTypes} from 'sequelize';
import {sequelize} from '../config/db.js';
import bcrypt from "bcryptjs"
import Tasks from './tasks.js';

const Users = sequelize.define('User',{
    userID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    userEmail:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userPassword:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    hooks: {
        beforeCreate: async (user) => {
        user.userPassword = await bcrypt.hash(user.userPassword,10)
        }
    }
})

Users.schema("public")

export default Users;