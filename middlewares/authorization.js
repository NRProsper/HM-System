import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) {
        return res.status(401).json({massage: "Unauthorized: You are not authorized to access this route"})
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = decoded;
        next();
    });

}


export const authorizedRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Access forbidden: insufficient rights" });
        }

        next();
    }
}

