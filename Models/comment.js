const { Schema, model, default: mongoose } = require('mongoose');

const commentSchema = new Schema({
    content:{
        type:String,
        required : true,
    },
    commentCreatedBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },  
    commentOnBlog:{
        type: Schema.Types.ObjectId,
        ref:"blog",
    },
},{timestamp:true}); 


const commentModel = model("comment",commentSchema);

module.exports = commentModel;