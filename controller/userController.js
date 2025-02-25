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
        password: hashedPassword,
        isAdmin:false,
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
                    email: userExists.email,
                    id:userExists.id,
                    isAdmin:userExists.isAdmin
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "10m" }
        );

        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Please provide the correct credentials");
    }
});

const AssignRole=asynchandler(async(req,res)=>{
    const { email } = req.body; 

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    user.isAdmin = true;
    await user.save();

    res.status(200).json({ message: `User with email ${email} is now an admin` });
});

const GetUserByID=asynchandler(async(req,res)=>{
    res.status(200).json(req.user);
});

module.exports={RegisterUser,LoginUser,GetUserByID,AssignRole};