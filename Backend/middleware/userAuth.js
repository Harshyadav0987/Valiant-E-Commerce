import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    // Accept either "Authorization: Bearer <token>" or legacy "token" header
    const raw = req.headers.authorization || req.headers.token;
    const token = raw && raw.startsWith("Bearer ") ? raw.split(" ")[1] : raw;
    // console.log("Authenticating token:", token);

    if (!token) {
        return res.status(401).json({
            success: false, 
            message: 'Not authorized. Please login again.',
            tokenExpired: true
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if token is about to expire (within 1 hour)
        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = decoded.exp - currentTime;
        
        if (timeUntilExpiry < 0) {
            return res.status(401).json({
                success: false, 
                message: 'Session expired. Please login again.',
                tokenExpired: true
            });
        }
        
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false, 
                message: 'Session expired. Please login again.',
                tokenExpired: true
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false, 
                message: 'Invalid token. Please login again.',
                tokenExpired: true
            });
        }
        
        return res.status(401).json({
            success: false, 
            message: 'Authentication failed. Please login again.',
            tokenExpired: true
        });
    }
}

export default userAuth;