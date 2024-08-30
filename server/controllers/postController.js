const Post = require("../models/Post")
const User = require("../models/User")
const createPost = async ( req, res) => {
    const authorId = req.id;
    const authorAccountType = req.accountType;
    if(authorAccountType === "buyer"){
        return res.json({
            success: false,
            message: "forbidden, only sellers can post"
        })
    }
    const {title, author, price, image, publicId} = req.body;
    try{
            const post = new Post({title, author, price, image, publicId, authorId})
            await post.save()
            await User.findByIdAndUpdate(authorId, {
                $push: {uploads: post._id},
            })
            return res.json({
                success: true, 
                message: "post created successfully",
            }, post)
    }catch(error){
            return res.json({
                success:false,
                message: error.message,
            })
    }
}