import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Not authenticated!" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token invalid" });
        req.userId = decoded.id;
        next();
    });
}

export { verifyToken };