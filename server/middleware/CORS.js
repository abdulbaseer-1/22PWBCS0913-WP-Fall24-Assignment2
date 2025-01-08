import cors from 'cors';

const CORS = cors({ // itsself a middleware, no need for (req, res, next)
        origin: 'https://assignment2-frontend-fnjay0a4h-abdulbaseer-1s-projects.vercel.app/',
        methods:['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedeaders:['Content-Type', 'Authorization'],
        credentials:true,
    });

export default CORS;