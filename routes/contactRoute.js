const express=require("express")
const router=express.Router();
const {getcontacts,getContactBYId,createContact,updateContactById,deleteContactBYId}=require("../controller/contactController");
const validateToken = require("../middlewares/ValidateTokenHandler");

router.use(validateToken);
router.route('/').get(getcontacts).post(createContact);
router.route('/:id').get(getContactBYId).put(updateContactById).delete(deleteContactBYId);

module.exports=router;