
const express = require("express");
const path = require("path");
const router = require("./Routes/user");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const {authenticate2} = require("./Middlewares/authenticate")
const blogRouter = require("./Routes/blog");
const blogmodel = require("./Models/blog");




const PORT = 8000;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/bloging")

app.set("view engine","ejs");
app.set("views", path.resolve("./views" ))

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(authenticate2("token"));

app.use(express.static(path.resolve("./public")))

app.use("/user",router)
app.use("/blog",blogRouter)
app.get("/",async (req,res)=>{
    const allBlogs = await blogmodel.find({})
    res.render("home",{
        user: req.user, 
        blogs:allBlogs,
    });
});


app.listen(PORT,()=>{
    console.log("Sever Started")
})