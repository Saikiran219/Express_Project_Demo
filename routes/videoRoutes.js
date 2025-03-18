const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const router = express.Router();
const {GetAllMovies,UploadVedio,GetFilteredMovies,DeleteMovie}=require("../controller/videoConroller");
const validateToken=require("../middlewares/ValidateTokenHandler");
const authorizetoken=require("../middlewares/Authorize");


// Set up Cloudinary Storage for videos
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "netflix-clone-videos",
    resource_type: "video",
  },
});

const upload = multer({ storage });

// Upload Video Route
router.post("/upload",validateToken,authorizetoken(true), upload.single("video"),UploadVedio );
router.delete("/movies/delete", validateToken, authorizetoken(true), DeleteMovie);

// Fetch All Movies
router.get("/movies",validateToken, GetAllMovies);
router.get("/movies/filter",validateToken, GetFilteredMovies);

module.exports = router;
