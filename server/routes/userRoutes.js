import express from 'express';
import userController from '../controllers/UserController.js';
import generateJWT from '../middleware/generateJWT.js';
import authenticateJWT from '../middleware/authenticateJWT.js';


const router = express.Router();

router.post('/signin',generateJWT, userController.signIn); //generating in middleware so no need in controller

router.post('/signup', userController.signUp);

router.get('/protected', authenticateJWT, (req, res) => {
    res.status(200).json("succesfully accessed protected route");
})

export default router;