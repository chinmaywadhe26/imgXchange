// const express =require("express");
// const router = express.Router();
const {login} = require("../controllers/authControllers");


const router = require("express").Router();
router.get("/login", login);


module.exports= router;
