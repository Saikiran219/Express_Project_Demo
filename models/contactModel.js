const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
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
        required: [true, "Please add the phone field"], 
    },
    
},{
    timestamps:true,
});

module.exports = mongoose.model("Contact", ContactSchema);
