// const express =require("express");
// const router = express.Router();
const {login, signup} = require("../controllers/authControllers");


const router = require("express").Router();
router.post("/login", login);
router.post("/signup", signup);


module.exports= router;
