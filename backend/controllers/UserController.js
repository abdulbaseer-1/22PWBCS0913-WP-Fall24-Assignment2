import express from 'express';
import bcrypt,{compare} from  'bcrypt'
import User from '../models/UserSchema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });


const signUp = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // input , salt

        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        res.status(200).json("Signup Successful");
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
       const user = await User.findOne({email: email});

       if(!user) {
        res.status(404).json("error: user not found");
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        //the login issue i was facing was because i had passed the generate token as a middleware so
        // there was no need to create the token again here, this was causing an error, also i had forgotton to import
        // jwt in user controller.  Other than finding this issue the project has been completeky dine by me
        // in 5-6 hours. 
       // Since you have generateJWT middleware, you probably don't need this JWT generation here
        // Just return success with the token from middleware
        res.status(200).json({
            message: "Logged in successfully",
            token: req.token // This comes from your generateJWT middleware
        });
    } catch (error) {
        res.status(500).json("Error: password or email is invalid");
    }
};

export default {signUp, signIn};