const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"USer"
    },
    name: {
        type: String, 
        required: [true, "Please add the name field"], 
    },
    email: {
        type: String, 
        required: [true, "Please add the email field"], 
    },
    phone: {
        type: String, 
      
    },
    
},{
    timestamps:true,
});

module.exports = mongoose.model("Contact", ContactSchema);
