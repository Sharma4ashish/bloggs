const { Schema, model, default: mongoose } = require('mongoose');

const blogSchema = new Schema({
    title:{
        type:String,
        required : true,
    },
    content:{
        type:String,
        required : true,
    },  
    createdBy:{
        type: Schema.Types.ObjectId,
        ref:"user",
    },
    imageUrl:{
        type:String,
        
    },
},{timestamp:true}); 


const blogmodel = model("blog",blogSchema);

module.exports = blogmodel;