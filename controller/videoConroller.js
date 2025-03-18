const asyncHandler = require("express-async-handler");
const Movie = require("../models/moviesModel");
const cloudinary=require("../config/cloudinary")

const GetAllMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
});

const UploadVedio = asyncHandler(async (req, res) => {
  try {
    if (!req.file || !req.body.title || !req.body.languages || !req.body.genres) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    let languages, genres;
    try {
      languages = JSON.parse(req.body.languages);
      genres = JSON.parse(req.body.genres);
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format for languages or genres" });
    }

    const { title } = req.body;

    // Store video URL in MongoDB
    const newMovie = new Movie({
      title,
      languages,
      genres,
      videoUrl: req.file.path, // Cloudinary video URL
    });

    await newMovie.save();
    res.status(201).json({ message: "Movie uploaded!", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});

const GetFilteredMovies =asyncHandler(async(req,res)=>{
    let {language,genre}=req.query;
    const filter={};
    if(language){
        const languagesArray= typeof language==="string"?language.split(","):language;
        filter.languages={$in:languagesArray.map(lang=>lang.trim())};
    }
    if(genre){
        const generArray= typeof genre==="string"?genre.split(","):genre;
        filter.genres={$in:generArray.map(gen=>gen.trim())};
    }
    const movies=await Movie.find(filter);
    res.json(movies);
});

const EditMovies=asyncHandler(async(req,res)=>{
    
})


const DeleteMovie = asyncHandler(async (req, res) => {
  let { url } = req.query;

  if (!url) {
    return res.status(400).json({ message: "URL field is mandatory" });
  }

  try {
    // Find the movie in MongoDB
    const movie = await Movie.findOne({ videoUrl: url });
    if (!movie) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Extract public ID from Cloudinary URL
    const parts = url.split("/");
    const publicIdWithExtension = parts[parts.length - 1];
    const publicId = `netflix-clone-videos/${publicIdWithExtension.split(".")[0]}`; 

    // Delete the video from Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });

    if (cloudinaryResponse.result !== "ok") {
      return res.status(500).json({ message: "Failed to delete video from Cloudinary" });
    }

    // Delete the movie from MongoDB
    await Movie.deleteOne({ videoUrl: url });

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { GetAllMovies, UploadVedio,GetFilteredMovies ,DeleteMovie };
