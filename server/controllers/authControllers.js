const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const signup = async (req, res) => {
    const {username, email, password, accountType} = req.body
    try{
        let user = await User.findOne({username})
        if(user){
            return res.json({
                success: false,
                message: "usernmae already exists"
            })
        }
        const securePassword = await bcrypt.hash(password, 10)
        user = new User({
            username,
            email,
            password: securePassword,
            accountType,
        })
        await user.save()
        return res.json({
            success:true,
            message:"user created  successfully"
        })
    }
    catch(err){
        return res.status(500).json({success:false, message: error.message})
    }
}
const login = async(req, res)=>{

};

module.exports = {login, signup};