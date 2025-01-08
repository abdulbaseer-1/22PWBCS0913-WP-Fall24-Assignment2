import cors from 'cors';

const CORS = cors({ 
    origin: [
        'https://assignment2-frontend-psi.vercel.app',
        'https://assignment2-frontend-abdulbaseer-1s-projects.vercel.app',
        'https://assignment2-frontend-ovmho5zen-abdulbaseer-1s-projects.vercel.app',
        'https://assignment2-frontend-c5r4j5zqe-abdulbaseer-1s-projects.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
});

export default CORS;
