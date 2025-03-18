const asyncHandler=require("express-async-handler");
const Movie=require("../models/moviesModel");
const WatchedMovie =require("../models/watchedMovies");

const addWatchedMOvie=asyncHandler(async(req,res)=>{
const {movieId,progress}=req.body;
if(!movieId||progress===undefined){
    return res.status(400).json({message:"MOvieId and progress are required"});
}
const watchedMovie = await WatchedMovie.findOneAndUpdate(
    { userId: req.user.id, movieId },
    { progress, updatedAt: Date.now() },
    { upsert: true, new: true }
  );
  res.status(200).json(watchedMovie);
});

const GetWatchedMovies=asyncHandler(async(req,res)=>{
    const watchedMovies=await WatchedMovie.find({userId:req.user.id}).populate("movieId");
    res.json(watchedMovies);
});


const SearchMovies=asyncHandler(async(req,res)=>{
    const {query}=req.query;
    if(!query){
        res.status(400).json({message:"search Query is required"});
    }
const movies=await Movie.find({
    title:{$regex:query,$options:"i"},
});
res.status(200).json(movies);

});

const SuggestedMovies = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const watchedMovies = await WatchedMovie.find({ userId }).populate("movieId");
  
    if (watchedMovies.length === 0) {
      // Return random movies from 3 genres
      const randomMovies = await Movie.aggregate([{ $sample: { size: 9 } }]); 
      return res.json(randomMovies);
    }
  
    // Get most watched genres
    const genreCounts = {};
    watchedMovies.forEach((wm) => {
      wm.movieId.genres.forEach((genre) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });
  
    // Sort genres by popularity
    const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);
  
    // Fetch movies based on top 3 genres
    const suggestedMovies = await Movie.find({ genres: { $in: sortedGenres.slice(0, 3) } });
  
    res.json(suggestedMovies);
  });

module.exports={addWatchedMOvie,GetWatchedMovies,SearchMovies,SuggestedMovies};