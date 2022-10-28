const express = require("express");
const mongoose = require("mongoose");
const mymodel1 = require("./mymodel");
const myblogmodel = require("./myBlogModel");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/stud", () => {
    console.log("Mongodb server running");
});

app.listen(4000, () => {
    console.log("running server");
});

app.get("/", (req, res) => {
    res.send("Hello i am ready to accept your request");
});

app.post("/insertBlog",(req,res)=>{
    // res.send(true)
    try {
        const insertit = new myblogmodel({
            Blogtype:req.body.Blogtype,
            Blog:req.body.Blog,
            Decription:req.body.Decription,
            Created:req.body.Created
        })
        const result = insertit.save()
        res.send(result)
    } catch (error) {
        res.send(error)
    }
});

app.post("/updateBlog",async(req,res)=>{
    // res.send(true)
    try {
        const data = await myblogmodel.findOneAndUpdate(
            {_id:req.body.Blogid},
            {$set:
                {Blog:req.body.Blog,Blogtype:req.body.Blogtype,Created:req.body.Created,Decription:req.body.Decription}
            })
        // res.json({"msg":true,"r":data})
        if (data) {
            res.json({"msg":true,"r":data})
        }else{
            res.json({"msg":false,"d":"else error"})
        }
    } catch (error) {
        res.json({"msg":false,"d":"catch error"})
    }
});

app.post("/DeleteBlog",async(req,res)=>{
    try {
        const data = await myblogmodel.deleteOne({_id:req.body.id})
        if(data){
            res.json({"msg":true,"r":data})
        }else{
            res.json({"msg":false,"d":"else error"}) 
        }
    } catch (error) {
        res.json({"msg":false,"d":"catch error"})
    }
}) 


// updateBlog

app.get("/getblog", async(req,res)=>{
    // res.send({"msg":"msggs"})
    try {
        const result = await myblogmodel.find();
        res.send(result)  
    } catch (error) {
        res.send(error)
    }   
})

app.post("/insert", (req, res) => {

    try {

        const insertData = new mymodel1({
            name: req.body.name,
            city: req.body.city
        });

        insertData.save();

        res.json({
                  "msg":"data Inserted msg from server after saved into mongodb",
                  "name":req.body.name,
                  "city":req.body.city
            });

    } catch (error) {

        res.json({
            "err":"Error in insertion"
    });

    }
});

app.get("/display", async (req, res) => {
    try {
        const show = await mymodel1.find();
        var name = show[0]["name"];
        // res.json({"msg":"display data","alldata":show});
        res.send(show);
    } catch (error) {
        res.send("Error in Data Display...");
    }
});


// ------------------------ ruff work -----------------------------

// app.get("/insert", (req, res) => {
//     try {
//         const insertData = new mymodel1({
//             name: "name1",
//             city: "city1"
//         });
//         insertData.save();
//         res.send("default data inserted..");
//     } catch (error) {
//         res.send("Error in Data Insertion...");
//     }
// });

// app.post("/insert", (req, res) => {
//     try {
//         const insertData = new mymodel1({
//             name: req.body.myname,
//             city: req.body.mycity
//         });
//         insertData.save();
//         res.json({"msg":"data Inserted msg from server after saved into mongodb","name":req.body.myname,"city":req.body.mycity});
//     } catch (error) {
//         res.send("Error in Data Insertion...");
//     }
// });