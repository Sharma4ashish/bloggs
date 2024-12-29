const {Router} = require("express");
const router = Router();
const User = require("../Models/user");
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt'); 
const { genetrateToken } = require("../utils/service");



mongoose.connect("mongodb://127.0.0.1:27017/bloging")

router.get("/signup",(req,res)=>{
   res.render("signup");
});

router.get("/login",(req,res)=>{
   return res.render("login");
});




router.post("/signup", async (req,res)=>{
    const {fullname,email,password} = req.body; 
    const user = await User.create({
        fullname,
        email,
        password,
    })
    return  res.redirect("/user/login")

})

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
});




router.post("/login", async(req,res)=>{
    const {email,password} = req.body; 
    const userDetails = await User.findOne({email}); 
    if(!userDetails) return res.render("login",{error: "User Not Found"});  
    
    const result = bcrypt.compareSync(password, userDetails.password);
    
    // const isMatched = result === userDetails.password;
    if(!result) return res.status(200).render("login",{error : "Email or Password Incorrect"});

    const token = genetrateToken(userDetails);
    res.cookie("token",token).status(200).redirect("/");
    
    return ;
      
})

module.exports = router;