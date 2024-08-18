// impor express
// express call
// define port
// make route
// server listen
const express = require("express");
const dotenv = require("dotenv");
const {readdirSync} =  require("fs");
const { connectDb } = require("./connection");
// const authRoute = require("./routes/authRoutes");
dotenv.config();
const app = express();
const port = process.env.PORT ;
connectDb()
// app.get("/", (req, res) => {
//     res.send("server running");})


// routes dynamically 
readdirSync("./routes").map((route)=>{
    app.use("/api", require(`./routes/${route}`));
})

// app.use("/api", authRoute);
app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
}
)


