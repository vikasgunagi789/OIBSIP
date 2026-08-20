const jwt = require("jsonwebtoken");

const Admin =
    require("../models/Admin");


const adminMiddleware =
    async (req, res, next) => {

        try {

            // =================================================
            // GET AUTHORIZATION HEADER
            // =================================================

            const authHeader =
                req.headers.authorization;


            if (
                !authHeader ||
                !authHeader.startsWith("Bearer ")
            ) {

                return res.status(401).json({

                    message:
                        "Admin authorization required."

                });

            }


            // =================================================
            // GET TOKEN
            // =================================================

            const token =
                authHeader.split(" ")[1];


            if (!token) {

                return res.status(401).json({

                    message:
                        "Admin token is missing."

                });

            }


            // =================================================
            // VERIFY TOKEN
            // =================================================

            const decoded =
                jwt.verify(

                    token,

                    process.env.JWT_SECRET

                );


            // =================================================
            // CHECK ADMIN ROLE
            // =================================================

            if (
                decoded.role !== "admin"
            ) {

                return res.status(403).json({

                    message:
                        "Admin access only."

                });

            }


            // =================================================
            // FIND ADMIN
            // =================================================

            const admin =
                await Admin.findById(
                    decoded.id
                ).select("-password");


            if (!admin) {

                return res.status(401).json({

                    message:
                        "Admin account not found."

                });

            }


            // =================================================
            // ATTACH ADMIN TO REQUEST
            // =================================================

            req.admin =
                admin;


            next();

        }

        catch (error) {

            console.error(
                "ADMIN AUTH ERROR:",
                error.message
            );


            if (
                error.name ===
                "TokenExpiredError"
            ) {

                return res.status(401).json({

                    message:
                        "Admin token has expired."

                });

            }


            return res.status(401).json({

                message:
                    "Invalid admin token."

            });

        }

    };


module.exports =
    adminMiddleware;