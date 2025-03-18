const expess=require("express");
const {GetWatchedMovies,addWatchedMOvie,SearchMovies,SuggestedMovies}=require("../controller/watchedmovieController");
const validateToken =require("../middlewares/ValidateTokenHandler");
const router=expess.Router();

router.get("/watched",validateToken,GetWatchedMovies);
router.get("/search",validateToken,SearchMovies);
router.get("/suggest",validateToken,SuggestedMovies);
router.post("/addwatched",validateToken,addWatchedMOvie);

module.exports=router;

