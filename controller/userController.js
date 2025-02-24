const asynchandler=require("express-async-handler");
const User=require("../models/userMOdel");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");

const RegisterUser = asynchandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields Are Mandatory");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User Email Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if (!user) {
        res.status(500); // Changed to 500 for internal server error
        throw new Error("User creation failed");
    }

    res.status(201).json({ id: user.id, email: user.email });
});


const LoginUser = asynchandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields Are Mandatory!");
    }

    const userExists = await User.findOne({ email });

    if (userExists && (await bcrypt.compare(password, userExists.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: userExists.username,
                    email: userExists.email
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "1m" }
        );

        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Please provide the correct credentials");
    }
});


const GetUserByID=asynchandler(async(req,res)=>{
    res.status(200).json({message:"this is the User page"});
});
module.exports={RegisterUser,LoginUser,GetUserByID};