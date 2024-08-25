const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {generateAccessToken} = require("../helpers/accessToken")
const {generateRefreshToken} = require("../controllers/refreshToken")

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
    const {email, password} = req.body;
    try{
        let user = await User.findOne({
            email
        })
        if(!user){
            return res.json({
                success: false, message: "please signup"
            })

        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.json({
                success:false,
                message: "invalid creds"
            })
        }
        const data = {
            id: user._id,
            accountType: user.accountType,
            author: user.username,
        }
        console.log(process.env.ACCESS_TOKEN_SECRET);  // Should output your secret
console.log(process.env.REFRESH_TOKEN_SECRET); // Should output your refresh secret

        const accessToken = generateAccessToken(data)
        const refreshToken = generateRefreshToken(data)

       

        return res.json({
            success: true,
            message:"Login successfull",
            accessToken,
            refreshToken,
            role: user.accountType,
            author: user.username,
        })

    }catch(error){
            return res.json({
                success: false, 
                message: error.message
            })
    }
};

module.exports = {login, signup};