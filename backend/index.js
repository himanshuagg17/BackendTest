const express= require("express");
const {connection}=require("./configs/db");
const {UserModel}=require("./model/user.model");
const {userRouter}=require("./routes/user.routes");
const {noteRouter} =require("./routes/notes.routes");
const {authenticate} =require("./middlewares/authenticate");
const cors=require("cors");
app.use(cors());
require("dotenv").config();

const app=express();

app.use(express.json());


app.get("/",(req,res)=>{
    res.send("this is our home page");
})

//middlewares for the routes functions
app.use("/users",userRouter);

//very important point
//this is the authenticate middleware which must be written just over the notes route so that it is applicable for all the notes routes

app.use(authenticate);



app.use("/notes",noteRouter);




app.listen(process.env.port,async(req,res)=>{
    try{
        await connection;
        console.log("the server is running at port 1800");
    }
    catch{
        console.log("the server could not be connected");
    }
})