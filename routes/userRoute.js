const express=require("express");
const router=express.Router();
const {RegisterUser,LoginUser,GetUserByID}=require("../controller/userController")

router.route('/Register').post(RegisterUser);
router.route('/login').post(LoginUser);
router.route('/:id').post(GetUserByID);

module.exports=router