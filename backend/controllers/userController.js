import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            age: user.age,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password")
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, age } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name,
        age,
        email,
        password
    })
    if (user) {
        generateToken(res, user._id);
        res.status(201).json(
            {
                _id: user._id,
                name: user.name,
                age: user.age,
                email: user.email
            }
        )
    } else {
        res.status(401);
        throw new Error("Invalid user data")
    }
})

const logOut = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message:"Logged Out successfully"})
})


export {registerUser, authUser, logOut}