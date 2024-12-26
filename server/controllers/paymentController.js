const Razorpay = require("razorpay");
const crypto = require("crypto")
const Order = require("../models/Order.js");
const Post = require("../models/Post.js");
const User = require("../models/User.js");
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
})

const generateOrder = async(req, res) => {
    const purchaserid = req.id;
    const {price} = req.body;
    try{
        let user = await User.findById(purchaserid);
        if(!user) return res.status(404).json({
            success: false, 
            message: "user not found"
        })

        const options = {
            amount: Number(price * 100),
            currency: "INR",
            receipt: crypto.randomBytes(16).toString("hex"),
        }
        razorpayInstance.orders.create(options, (error, order) => {
            if(error){
            return res.status(500).json({
                success: false, 
                message: error.message
            });
        }
        console.log("Order creation request:", options);
        console.log("Order creation response:", order);
        
            return res.status(200).json({
                success: true, 
                data: order
            }); 
            
        });


    } catch(error){
        return res.status(500).json({
            success: false, 
            message: error.message,
        })
    }
}

const verifyOrder = async ( req, res) => {
    const purchaserId =  req.id;
    console.log("req.body: ", req.body);
    const {
        razorpay_order_id, 
        razorpay_payment_id,
        razorpay_signature,
        postUrl,
        postId,
        author,
        title,
        price,
    } = req.body;
    console.log(postId);
    try{
        console.log("verifyOrder function triggered");
        console.log("PostId",postId);
        const signature = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
        .createHmac("sha256",
            process.env.RAZORPAY_SECRET,
        ).update(signature.toString()).digest("hex");
        const isAuthentic = expectedSignature === razorpay_signature;
        if(isAuthentic){
            const order = new Order({
                purchaserId, 
                postUrl,
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                author, 
                title,
                price,
            }); 
            await order.save();

            let userData = await User.findByIdAndUpdate(purchaserId, {
                $push: {purchased: order._id},
            });

            let postData = await Post.findByIdAndUpdate(postId, {
                $push: {purchasedBy: purchaserId},
            });
            console.log("purchaserId", purchaserId);
            console.log("post data", postData);
//             console.log("Received razorpay_order_id:", razorpay_order_id);
// console.log("Generated expectedSignature:", expectedSignature);
// console.log("Is signature authentic:", isAuthentic);
            return res
            .status(200)
            .json({ success: true, message: "Payment successful" });
        }
    }catch(error)
    {
        return res.status(500).json({
            success: false, 
            message: error.message
        });
    }
}

module.exports = {generateOrder, verifyOrder};