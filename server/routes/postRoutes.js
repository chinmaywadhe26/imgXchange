
const {verifyToken} = require("../middlewares/verifyToken")
const {createPost, getMyPosts, getPostsByRange, getAllPosts, deletePost, searchPosts, addToFavourites, RemoveFromFavourites, getFavourites} = require("../controllers/postController")
const router = require("express").Router();
router.post("/post/create", verifyToken, createPost)
router.get("/post/getAll", getAllPosts);
router.get("/post/myPosts", verifyToken, getMyPosts)
router.delete("/post/delete/:id", verifyToken, deletePost)
router.get("/post/search", searchPosts )
router.put("/post/addToFavourites/:postId", verifyToken, addToFavourites)
router.put("/post/removeFromFavourites/:postId",verifyToken, RemoveFromFavourites)
router.get("/post/favourites", verifyToken, getFavourites)
router.get("/post/getPostsByRange", verifyToken, getPostsByRange)
module.exports = router;