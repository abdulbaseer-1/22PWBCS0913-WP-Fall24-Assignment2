import express from 'express';
import mongoose from 'mongoose';
import CORS from './middleware/CORS.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// const server = () => { // not removing b/c maybe i'll need it later for vercel and I am lazy so no rewrite.
    const app = express();
    const PORT = 8080;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(express.static(path.join(__dirname, 'dist')));


    //middlewares
    app.use(CORS);
    app.use(express.json());

    //routes
    app.get('/', (req, res) => {
        res.status(200).json("connection successful");
    })

    app.use('/api', userRoutes);

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
      });


    //mongo connection
    const URI = 'mongodb+srv://khanabdulbaseerkhanyousafzai:yLBxFcRNtnzWl3eK@cluster0.duqoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    mongoose
        .connect(URI)
        .then(() => {
            console.log('Connected to the database');
            app.listen(PORT, () => {
                console.log(`Server is running on port: ${PORT}`);
            });
        })
        .catch((error) => {
            console.error('Failed to connect to the database:', error.message);
        });

// };  //if you do it like thi i.e. by defining it as a function, you need an entry point , prefereably a second file.

// server();

// export default server;