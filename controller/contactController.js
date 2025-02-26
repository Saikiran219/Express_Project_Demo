const asyncHandler=require("express-async-handler");
const Contact= require("../models/contactModel")

const getcontacts = asyncHandler(async (req,res)=>{
    const contact= await Contact.find({user_id:req.user.id});
    res.status(200).json(contact);
});

const getContactBYId =  asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error(`Contact not found with ID: ${req.params.id}`); 
    }
    res.status(200).json({contact});
});

const createContact =  asyncHandler(async (req,res,next)=>{
    const {name,email,phone}=req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All feilds are mandatory")
    }
    const contactExists = await Contact.find()
    .and([
        { email: email },
        { phone: phone },
        { user_id: req.user.id },
    ]);
    if (contactExists.length > 0){
        res.status(400)
        throw new Error(`conatct with the eamil ${email} or phone num ${phone} Already Exists`)
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(200).json({contact});
});

const updateContactById=  asyncHandler(async (req,res,next)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
          res.status(404);
    throw new Error(`Contact not found with ID: ${req.params.id}`); 
    }
   const updatedcontact=await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
   );
    res.status(200).json({updatedcontact});
});


const deleteContactBYId=  asyncHandler(async (req,res,next)=>{

    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error(`Contact not found with ID: ${req.params.id}`);
    }
    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json({message:'deleted Successfully'});
});


//no longer need this middle ware
module.exports={getcontacts,getContactBYId,createContact,updateContactById,deleteContactBYId}