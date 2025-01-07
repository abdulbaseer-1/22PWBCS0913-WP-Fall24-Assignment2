import cors from 'cors';

const CORS = cors({ // itsself a middleware, no need for (req, res, next)
        origin: 'http://localhost:5173',
        methods:['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedeaders:['Content-Type', 'Authorization'],
        credentials:true,
    });

export default CORS;