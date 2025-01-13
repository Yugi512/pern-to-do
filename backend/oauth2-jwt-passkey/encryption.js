import jwt from "jsonwebtoken";
import {pool} from "../config/db.js"
import Users from "../models/users.js"
import { Op } from "sequelize";
import bcrypt from "bcryptjs"


export const loginReq = async (req,res) => {
    try{
        const {userEmail,userPassword} = req.body
        const user = await Users.findOne({
            where: {
                userEmail:{
                    [Op.eq]: userEmail
                }
            }
        })
        if (!user){
            return res.status(404).json({"success":false,"message":"couldnt access user"})
        }
        const isMatch = await bcrypt.compare(userPassword,user.userPassword)
        if (!isMatch){
            return res.status(404).json({"success":false,"message":"couldnt access user"})
        }
        const token = jwt.sign({userId: user._id},"Blueberry1224")
        res.redirect(`/users/${userEmail}`).json({token})
    } catch (error){
        console.error("Error in logging into user: ", error)
    }
}

export const verifyJWT = async (req,res,next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
 
    jwt.verify(token, 'Blueberry1224', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.userId = decoded.userId;
        next();
    });
}
