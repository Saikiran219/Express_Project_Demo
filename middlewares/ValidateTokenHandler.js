const jwt= require("jsonwebtoken");
const asyncHandler=require("express-async-handler");

const validateToken= asyncHandler(async (req,res,next)=>{
    let token;
    let authheader=req.headers.Authorization||req.headers.authorization;
    if (authheader && authheader.startsWith("Bearer")){
        token=authheader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
            if(err){
                res.status(401);
                throw new Error("user is not authorized")
            }
                req.user=decode.user
              next();
        });
        if(!token){
            res.status(401)
            throw new Error("user is not authorized")
        }
    }
})