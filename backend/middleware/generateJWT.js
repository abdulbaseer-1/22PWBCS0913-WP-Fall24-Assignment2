// const generateJWT = (req, res, next) => {
//     try {
//         const {email, password} = req.body;

//         const user = {email: email, password: password};
        
//         const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); // payload, secret
        
//         res.json({accessToken: accessToken});
//     }
// }

// export default JWT;

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const generateJWT = (req, res, next) => {
    console.log("in generate jwt : ", process.env.ACCESS_TOKEN_SECRET);
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        //payload
        const user = { email };

        // JWT
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        // Attach the token to the response or request 
        req.token = accessToken;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error generating JWT:", error.message);
        res.status(500).json({ message: 'Failed to generate access token' });
    }
};

export default generateJWT;
