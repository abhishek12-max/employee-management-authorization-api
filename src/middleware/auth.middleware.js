const jwt = require("jsonwebtoken");
const Usermodel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {

        // Cookie se token nikalo
        const token = req.cookies.token;
       
        // Token nahi mila
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // Token verify karo
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Database me user dhoondo
        const user = await Usermodel.findById(decoded.id).select("-password");

        // User delete ho chuka ho ya exist na kare
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // User ko request me attach karo
        req.user = user;

        // Next middleware/controller
        next();

    } catch (error) {
         console.log(error); 
        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }
};

module.exports = authMiddleware;