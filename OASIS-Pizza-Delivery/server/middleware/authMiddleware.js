const jwt = require("jsonwebtoken");


const protect = (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;


        // Check Authorization header

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {

            return res.status(401).json({

                message:
                    "Not authorized. Please login."

            });

        }


        // Get token

        const token =
            authHeader.split(" ")[1];


        if (!token) {

            return res.status(401).json({

                message:
                    "Authentication token missing."

            });

        }


        // Verify token

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        console.log(
            "Authenticated user:",
            decoded
        );


        // Store user ID

        req.user = {

            _id:
                decoded.id ||
                decoded.userId ||
                decoded._id

        };


        // Make sure ID exists

        if (!req.user._id) {

            return res.status(401).json({

                message:
                    "Invalid token: user ID missing."

            });

        }


        next();

    }

    catch (error) {

        console.error(
            "AUTH ERROR:",
            error.message
        );


        return res.status(401).json({

            message:
                "Invalid or expired token."

        });

    }

};


module.exports = protect;