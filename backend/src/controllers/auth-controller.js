import { response } from "express";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generatedTokens } from "../lib/utils.js";
import cloudinay from "../lib/cloudinary.js";


//signup function
export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {


        if(!fullName || !email || !password) 
            return res.status(400).json({ message: "All fields are required"})

        // hash password
        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters"})
        }

        const user = await User.findOne({email})
        if(user) return res.status(400).json({ message: "User already exists"})

        const salt = await bcrypt.genSalt(10)
        const hasspassword = await bcrypt.hash(password, salt) 

        const newUser = new User({
            fullName,
            email,
            password: hasspassword
        })

        if(newUser) {
            const token = generatedTokens(newUser._id, res)                
            await newUser.save()

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                token: token
            })
        } else {
            res.status(400).json({message: 'Invalid User Data'})
        }
    } catch (error) {
        console.log("Error in signup controller", error)
        res.json({message: 'Invalid server error here I got the error'})
    }
}


//login function
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });    
        
        // console.log(user);

        if(!user) {
            return res.status(400).json({message: 'Invalid credentials'})
        }

        const isPasswordTrue = await bcrypt.compare(password, user.password)

        if(!isPasswordTrue) {
            return res.status(400).json({message: 'Invalid credentials'})
        }

        const token = generatedTokens(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            token: token
        })
    } catch (error) {
        console.log("Error in login-credentials", error.message);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

//logout function
export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge:0});
        res.status(200).json({message: 'Logout successfully'});
    } catch (error) {
        console.log("Error in login-credentials", error.message);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

//updateprofile function
export const updateProfile = async(req, res) => {
    try {
        const {profilePic} = req.body;

        
        const userId = req.user._id
        
        if(!profilePic) 
            return res.status(400).json({message: 'Profile pic required'});
        
        const uploadResponse = await cloudinay.uploader.upload(profilePic);
        // console.log(uploadResponse);
        const updateUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})
    
        console.log(updateUser);

        res.status(200).json(updateUser);
    } catch (error) {
        console.log("Error in update profile", error);
        res.status(500).json({ message: 'Internal Server Error'});

    }
}

//chckauth function
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth", error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}