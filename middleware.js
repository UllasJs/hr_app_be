const jwt = require("jsonwebtoken");
require("dotenv").config();

const AuthenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "No token provided" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ success: false, message: "Failed to authenticate token" });
        }

        req.user = decoded;
        next();
    });
};

module.exports = AuthenticateToken;
