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
    console.log("request nody is",req.body);
    const {name,email,phone}=req.body
    if(!name || !email){
        res.status(400)
        throw new Error("All feilds are mandatory")
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



module.exports={getcontacts,getContactBYId,createContact,updateContactById,deleteContactBYId}