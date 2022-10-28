const mongoose = require("mongoose");

const myvar = new mongoose.Schema({
    Blogtype:{
        type:String,
        required:true
    },
    Blog:{
        type:String,
        required:true
    },
    Decription:{
        type:String,
        required:true
    },
    Created:{
        type:String,
        required:true
    }
});

const myblogmodel = mongoose.model("myblog",myvar);

module.exports=myblogmodel;