const constants=require("../constants")
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode:500;
    switch(statusCode){
        case constants.VALIDATION:
            res.json({title:"validation",message:err.message,stackTrace:err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title:"NOt Found",message:err.message,stackTrace:err.stack});
            break;
        case constants.AUTHORIZATION:
            res.json({title:"Authorization",message:err.message,stackTrace:err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title:"Forbidden",message:err.message,stackTrace:err.stack});
            break;
        default:
            console.log("All good no error!!");
            break;


    }


};

module.exports=errorHandler