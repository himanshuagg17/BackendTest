const express=require("express");
const { UserModel } = require("../model/user.model");
const jwt=require("jsonwebtoken");

//importing the bcrypt for encrypting the password
const bcrypt=require("bcrypt");


//this is created to have multiple routers
const userRouter=express.Router();


//here we will write the user routes which are register and login

//the register router
//the password here is encrypted by bcrypt
userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        bcrypt.hash(password, 5, async (err, hash)=> {
            if(err) res.send(err.message);
            else{
               // const userData=req.body;
                const user=new UserModel({name,email,password:hash});
                await user.save();
                res.send("the new user has been registered");
            }
        });
        
    }
    catch{
        res.send({"msg":"something went wrong"});
    }
   



//the login router
//here we will use the hashed password to login to the application (the hashed password is decrypted here)
userRouter.post("/login",async(req,res)=>{
    //getting the email and password
    const {email,password}=req.body;
    try{
        //check if user is registred(with plain password)
       // const user=await UserModel.find({$and:[{email:email},{password:password}]});

        //check if user is registered (with hashed password)
        const user=await UserModel.find({email});
        if(user.length>0){

            //we are comparing if the 
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
               //generating the token

               //in this random payload,we are passing the userID from the data of the user to establish relation between the users and notes
                const token= jwt.sign({userID:user[0]._id},"masai");
                res.send({"msg":"the login was successful","token":token})
                }
                else{
                    res.send("something went wrong");
                }
            }) 
        }
        else{
            res.send({"msg":"user not found"});
        }
    }
    catch{
          res.send("please signup first");
    }
})
})





module.exports={
    userRouter
}