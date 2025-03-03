const asyncHandler = require("express-async-handler");
const Movie = require("../models/moviesModel");

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

const GetMoviesByLangAndGenre=asyncHandler(async(req,res)=>{
    
})

module.exports = { GetAllMovies, UploadVedio };
