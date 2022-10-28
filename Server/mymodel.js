const mongoose = require("mongoose");

const table1=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    city:{
        type:String,
        required:true
    }
});

const mytable1 = mongoose.model("mymodel1",table1);

module.exports=mytable1;