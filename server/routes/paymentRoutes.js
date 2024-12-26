const {verifyToken} = require("../middlewares/verifyToken.js");
const {generateOrder, verifyOrder} = require("../controllers/paymentController.js");
const router = require("express").Router();


router.post("/payment/generate", verifyToken, generateOrder);
router.post("/payment/verify", verifyToken, verifyOrder);
module.exports = router;
