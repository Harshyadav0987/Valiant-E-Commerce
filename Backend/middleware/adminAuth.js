import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try{
        const {token} = req.headers;
        if(!token){
            return res.status(401).json({message: "Unauthorized: No token provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(403).json({message: "Forbidden: Invalid token"});
        }
        next();
    }catch(err){
        console.log("error in admin auth", err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export default adminAuth;