const express=require("express");
const router=express.Router();
const {RegisterUser,LoginUser,GetUserByID,AssignRole}=require("../controller/userController")
const validateToken= require("../middlewares/ValidateTokenHandler");
const authorizetoken = require("../middlewares/Authorize");


router.post('/Register',RegisterUser)
router.post('/login',LoginUser)
router.get('/current',validateToken,GetUserByID)
router.post('/assignrole',validateToken,authorizetoken(true),AssignRole)


module.exports=router