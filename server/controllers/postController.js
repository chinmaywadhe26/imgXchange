const Post = require("../models/Post")
const User = require("../models/User")
const createPost = async ( req, res) => {
    const authorId = req.id;
    const authorAccountType = req.accountType;
    if(authorAccountType === "buyer"){
        return res
      .status(403)                                                                                                              
      .json({ success: false, message: "Forbidden, only sellers can post" });
    }
    const {title, author, price, image, publicId} = req.body;
    try{
            const post = new Post({title, author, price, image, publicId, authorId})
            await post.save()
            await User.findByIdAndUpdate(authorId, {
                $push: {uploads: post._id},
            })
            return res
      .status(201)
      .json({ success: true, message: "Post created successfully", post });
    }catch(error){
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getAllPosts = async ( req, res) => {
    try{
        const posts = await Post.find({});
        if(posts.length === 0){
            return res
            .status(404)
            .json({ success: false, message: "No posts found" });
    
        }
        return res.status(200).json({ success: true, data: posts });

    }catch(error){
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getMyPosts = async (req, res) => {
    const authorId = req.id;
    const authorAccountType = req.accountType;
    try{
    if(authorAccountType === "buyer"){
        const {purchased} = await User.findById(authorId).populate("purchased")
        if(!purchased) return res
        .status(404)
        .json({ success: false, message: "No posts found" });
        return res.status(200).json({ success: true, data: purchased });
    }
    else{
        const {uploads} = await User.findById(authorId).populate("uploads")
        if(!uploads)  return res
        .status(404)
        .json({ success: false, message: "No posts found" });
        return res.status(200).json({ success: true, data: uploads });
    }

}catch(error){
    return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
    }
    
}

const deletePost = async(req, res) => {
    const {id} = req.params;
    try{
        const post = await Post.findById(id)
        if(!post) return res.status(404).json({success: false, message: "post not found"})
        const {authorId} = post;
    await User.findByIdAndUpdate(authorId, {
        $pull: {uploads: id},
     })
    return res.status(200).json({
        success:true, message: "post deleted successfully"
    })     

    }catch(error){
        return res.status(500).json({success:false, message: error.message})
    }
}

const searchPosts  = async(req, res) => {
    const {search} = req.query;
    // console.log(search)
try{
    const posts = await Post.find({title: {$regex: search, $options: "i"}})
    if(posts.length == 0 ){
        return res.status(404).json({
            success:false, message: "no posts found"
        })
    }
    // console.log(posts)
    return res.status(200).json({
        success: true, data: posts
    })
}catch(error){
    return res.status(500).json({success:false, message: error.message})
}
}

const addToFavourites = async (req, res) => {
        const {authorId} = req.id
        const {postId} = req.params
        try{
            const user = await User.findByIdAndUpdate(authorId, {
                $push: {favourites: postId},
            })
            if(!user) return res.status(404).json({
                success: false, messsage: "user not found"
            })
            return res.status(200).json({
                success: true, message:"post added to favourites"
            })
        }catch(error){
            return res.status(500).json({success:false, message: error.message})
        }
}

const RemoveFromFavourites = async (req, res) => {
    const {authorId} = req.id
    const {postId} = req.params
    try{
        const user = await User.findByIdAndUpdate(authorId, {
            $pull: {favourites: postId},
        })
        if(!user) return res.status(404).json({
            success: false, messsage: "user not found"
        })
        return res.status(200).json({
            success: true, message:"post removed from favourites"
        })
    }catch(error){
        return res.status(500).json({success:false, message: error.message})
    }
}

const getFavourites = async(req, res) => {
        const authorId = req.id;
        try{
                const {favourites} = await User.findById(authorId).populate("favourites")
                if(!favourites){
                    return res.staus(404).json({
                        success: false, message: "no favourites"
                    })
                }
                return res.status(200).json({success: true, data: favourites})

        }catch(error){
            return res.status(500).json({
                success:false, message: error.message
            })
        }
        
} 

const getPostsByRange = async (req, res) => {
    const  authorId = req.id
    const authorAccountType = req.accountType
    let data 
    try{
        if(authorAccountType === "buyer"){
            const {purchased} = await User.findById(authorId).populate('purchased')
            data = purchased
        }
        else{
            const {uploads} = await User.findById(authorId).populate('uploads')
            data = uploads
        }

        if(!data) return res.status(500).json({
            success: "false", message: "no posts found"
        })

        const now = new Date()
        const startOfYear = new Date(now.getFullYear(), 0, 1)
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
        const postsThisYear = data.filter((post) => new Date(post.createdAt) >= startOfYear)
        const postsThisMonth = data.filter((post) => new Date(post.createdAt) >= startOfMonth)
        const postsThisWeek = data.filter((post) => new Date(post.createdAt) >= startOfWeek)
        console.log("posts controller", "postsThisYear:", postsThisYear,"postsThisWeek:", postsThisWeek, "postsThisMonth:", postsThisMonth )
        return res.status(200).json({
            success: true, 
            data: {
                tillNow: data, 
                thisYear : postsThisYear,
                thisMonth: postsThisMonth,
                thisWeek: postsThisWeek
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false, message: err.message
        })
    }

}


module.exports = {createPost, getAllPosts, getMyPosts, deletePost, searchPosts, addToFavourites, RemoveFromFavourites, getFavourites, getPostsByRange}