import jwt from 'jsonwebtoken';

const userAuth =async (req, res, next) => {

    const {token} = await req.headers;
    //  console.log(token);
    // console.log("check from userAuth");

    if (!token) {
        // console.log("no token")
        return res.status(401).json({success: false, message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("data from userAuth");
        // console.log(decoded);
        // console.log(decoded.id);
        req.userId = decoded.id;
        // console.log("userId:",req.userId);
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: 'Invalid token' });
    }
}

export default userAuth;
