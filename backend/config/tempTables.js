import { pool, sequelize } from "./db.js";

export async function createTempTable(){
    try{
        await pool.query(
            `CREATE TEMP TABLE IF NOT EXISTS sessions (
            id  SERIAL PRIMARY KEY,
            taskName VARCHAR(255) NOT NULL,
            taskDescription VARCHAR(300) NOT NULL
            );`)
        //, ON COMMIT DROP
        console.log("Temp Task Table created")
    } catch (err){
        console.error("Error has occured creating table: ", err)
    }
}

// const sessionStore = new pgSession({
//     pool: pool,
//     tableName: "sessions",
//     createTableIfMissing: true
// })

// pool.query('CREATE TEMP TABLE IF NOT EXISTS "sessions" ("id"  SERIAL , "taskName" VARCHAR(255) NOT NULL, "taskDescription" VARCHAR(300) NOT NULL, "expire" timestamp(6) NOT NULL,PRIMARY KEY ("id"), ON COMMIT DROP);')

