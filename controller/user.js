import User from "../model/User.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await User.findOne({ username: username });
        if (!user || user.length === 0) {
            const newUser = new User({username, password, role});
            await newUser.save();
            res.status(201).json({data : newUser, message : "New User created"});
        }
        else {
            res.status(409).json({message : "User already exists"});
        }
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
    
}

export const loginUser = async (req, res) => {
    const SECRET_KEY = process.env.SECRET_KEY;
    console.log(".....",SECRET_KEY);
    try{
        const { username, password} =req.body;
        const user = await User.findOne({username : username});
        if(!user || !(await user.comparePassword(password))){
            res.status(401).json({message : "Invalid Credentials"});
        }
        else{
            // generate token for this user
            const token = jwt.sign({_id : user._id, username : user.username, role : user.role}, SECRET_KEY, {expiresIn : '1d'});
            res.status(200).json({data : token, message : "Login Successful"});
        }
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}