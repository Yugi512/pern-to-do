import Sequelize from "sequelize";
import dotenv from 'dotenv';
import pg from "pg";
import { createTempTable } from "./tempTables.js";

dotenv.config();
const {Pool} = pg;

const pool = new Pool ({
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host:"localhost",
    port: 5432,
    database: 'perntodolist',
    timestamps: false
})

const sequelize = new Sequelize(`perntodolist`,process.env.POSTGRES_USERNAME,process.env.POSTGRES_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    operatorAliases: false,
    define:{
        timestamps: false
    },
    logging: false,

    pool: {
        max: 11,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

createTempTable()

export { pool, sequelize };
