const mongoose=require("mongoose");

const watchedMovieSchema=new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true},
movieId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Movie",
    required:true,
},
progress:{
    type:Number,
    required:true,
},
updatedAt:{
    type:Date,
    default:Date.now
}
});


module.exports=mongoose.model("watchedMovie",watchedMovieSchema);