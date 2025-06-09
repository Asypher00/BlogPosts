// authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access Token Required",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User Not Found",
            });
        }

        req.user = {
            id: decoded.userId,
            username: decoded.username,
            email: decoded.email,
        };

        next(); // This must be called to continue to the next middleware
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({
                success: false,
                message: 'Invalid token'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({
                success: false,
                message: 'Token expired'
            });
        }

        console.error('Authentication error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Export as a named export
module.exports =  authenticateToken ;