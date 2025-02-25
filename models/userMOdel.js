const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"user name is mandatory"],
    },
    email: {
        type: String, 
        required: [true, "Please add the email field"],
        unique:[true,"Email Already Exists"], 
    },
    password: {
        type: String, 
        required: [true, "Please add the password field"], 
    },
    isAdmin:{
        type:Boolean,
        required:[true,"Please give the role"]
    }
},{
    timestamps:true,
});

module.exports=mongoose.model("USer",userSchema);