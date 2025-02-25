const express=require("express");
const router=express.Router();
const {RegisterUser,LoginUser,GetUserByID}=require("../controller/userController")
const validateToken= require("../middlewares/ValidateTokenHandler")

router.post('/Register',RegisterUser)
router.post('/login',LoginUser)
router.get('/current',validateToken,GetUserByID)


module.exports=router