const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {generateAccessToken} = require("../helpers/accessToken")
const {generateRefreshToken} = require("../helpers/refreshToken")

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
        return res.status(500).json({success:false, message: err.message})
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

const refresh = async (req, res) => {
    console.log("header", req.headers.authorization)
    const header = req.headers["authorization"]
    console.log("header" , header)

    const token = header && header.split(" ")[1] 
    console.log("token", token)
    if(!token)  return res.status(401).json({
        success: false, message: "please login"
    })
    try{
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).json({
                success: false, message: err.message
            })

            const accessToken = generateAccessToken({
                id: user.id, accountType: user.accountType, author: user.author,
            })
            console.log("access")

            const refreshToken = generateRefreshToken({
                id: user.id, accountType: user.accountType, author: user.author,
            })
            console.log("refresh")
            
            return res.status(200).json({
                success: true,
                message: "Token refreshed successfully",
                accessToken,
                refreshToken,
                role: user.accountType,
                author: user.author,
              });
            console.log("token refreshed")
        })
    }catch(error){
        return res.status(500).json({
            success: false, message: error.message
        })
    }
}


const switchProfile  = async (req, res) => {
    const authorId = req.id
    const authorAccType = req.accountType

    try{
        const user = await User.findByIdAndUpdate(authorId, {
            accountType: authorAccType === "buyer" ? "seller" : "buyer",
        })

        if(!user) return res.status(404).json({
            success: false, message: "user not found"
        })

        const  data = {
            id: user._id, 
            accountType: user.accountType,
            author : user.author,
        }

        const accessToken = generateAccessToken(data)
        const refreshToken = generateRefreshToken(data)

        return res.status(200).json({
            success: true, 
            message: `switched to ${user.accountType}`,
            accessToken, 
            refreshToken, 
            role: user.accountType, 
            author: user.username
        })
    }catch(err){
        return res.status(500).json({
            success: false, 
            message: err.message     
        })
    }
}
module.exports = {login, signup, refresh, switchProfile};