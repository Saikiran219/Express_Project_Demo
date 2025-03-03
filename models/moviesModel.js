const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    languages: [{ type: String, required: true }],
    genres: [{ type: String, required: true }], 
    videoUrl: { type: String, required: true }, // Cloudinary video URL
    thumbnail: { type: String },
  });
  
  module.exports=mongoose.model('Movie',movieSchema)