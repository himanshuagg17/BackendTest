const jwt= require("jsonwebtoken");

const authenticate= (req,res,next)=>{
    const token =req.headers.authorization;

    if(token){
        //we are verifying the token with the original token, if it is true then it is decoded
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                //the middleware has access to the request ,so we can add any field to the request object using the decoded object

                req.body.user=decoded.userID;
                next()
            }
            else{
                res.send({"msg":"please login first"});
            }
        })
    }
    else{
        res.send({"msg":"please login first"});
    }
}


module.exports={
    authenticate
}