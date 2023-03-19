const express=require("express");
// const bodyparser=require("body-parser");
const mongoose=require("mongoose");

const app=express();
app.use(express.json());

mongoose.connect('mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/Batch7').then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const b7User = {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
};

const User=mongoose.model("user",b7User);
app.post("/createuser",async(req,res)=>{
    const newUser=new User({
        name:req.body.name,
        age:req.body.age
    });

    try{
        const result=await newUser.save();
        res.send("Data added");

    }catch(e){
        console.error(e);
        res.status(500).send("Internal server error")
    }
});


app.listen(5000,()=>{
    console.log("server is running on port 9000");
})