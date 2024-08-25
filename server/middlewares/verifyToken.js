const jwt = require("jsonwebtoken")
const verifyToken = async (req, res, next) => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(" ")[1]
    if(!token){
        return  res.json({
            success: false, 
            message: "unauthorized"
        })
    }
    try{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
            if(err) res.json({
                success: false,
                message: "forbidden",
            })

            req.id = user.id;
            req.author = user.author;
            req.accountType = user.accountType;
            next()
        })
    }catch(error){
        return res.json({
            success: false,
            message:"internal server err"
        })
    }

}