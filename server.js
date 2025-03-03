const express=require("express");
const errorHandler = require("./middlewares/errorHandler");
const Dbconnect = require("./config/dbConnection");
const cors = require('cors');
const app=express();
const dotenv=require("dotenv").config();
Dbconnect();
const port=process.env.PORT || 5000

app.use(express.json());
app.use(cors());
app.use("/api/contacts",require("./routes/contactRoute"));
app.use("/api/videos",require("./routes/videoRoutes"));
app.use("/api/users",require("./routes/userRoute"));
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`server listening to the ${port}`);
})