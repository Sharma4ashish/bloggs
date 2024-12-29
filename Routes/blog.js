const {Router} = require("express");
const router = Router();
const blogmodel = require("../Models/blog");
const commentModel = require("../Models/comment")
const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/uploads/"))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
    }
  })


  const upload = multer({ storage: storage })


router.get("/add-new-blog",(req,res)=>{
    res.render("addBlog", {
        user:req.user
    });
});


router.get("/my-blogs",async (req,res)=>{
    const blogss = await blogmodel.find({});
    res.render("myblogs",{
        user:req.user,
        
        blogss,
    });
});


router.get("/:id",async (req,res)=>{
    const blogId = req.params.id;
    const blog = await blogmodel.findById(blogId);
    const blogss = await blogmodel.find({});
    const comments = await commentModel.find({commentOnBlog:req.params.id}).populate("commentCreatedBy")


    res.render("myblogs",{
        user:req.user,
        blog,
        blogss,
        comments,
    });
});


router.post("/add-new-blog",upload.single("image"), async (req,res)=>{
    const {title , content} = req.body;
    const user = req.user;

    if(!user) return res.redirect("/user/login");
    
    try {
        const blog = await  blogmodel.create({
            title,
            content,
            createdBy : req.user.id,
            imageUrl:`/uploads/${req.file.filename}`
    
        });
        return res.redirect(`/blog/${blog._id}`)
        
    } catch (error) {
        res.render("addBlog",{
            info:error,
        })   
    }
    
     
});


router.post("/comments/:blogId",async (req,res)=>{
    const comment = await commentModel.create({
        content: req.body.content,
        commentCreatedBy: req.user._id,
        commentOnBlog: req.params.blogId,
    });
    return res.redirect(`/blog/${req.params.blogId}`)
     
});



module.exports = router;