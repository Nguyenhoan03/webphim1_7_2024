const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log('Authorization header is missing');
        return res.sendStatus(401); // Unauthorized
    }
    
    const token = authHeader.split(' ')[1];

    if (!token) {
        console.log('Token is missing');
        return res.sendStatus(401); // Unauthorized
    }

    console.log('Received token:', token);  // Log the token to debug

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded || !decoded.id) {
            console.log('Decoded token is missing id');
            return res.sendStatus(403); // Forbidden
        }

        req.userId = decoded.id;
        console.log('Token verified successfully, User ID:', req.userId);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error('Token verification failed: JWT expired');
            return res.status(403).json({ error: 'Token expired' }); // Forbidden
        } else {
            console.error('Token verification failed:', error.message);
            return res.status(403).json({ error: 'Invalid token' }); // Forbidden
        }
    }
};

module.exports = { verifyToken };
