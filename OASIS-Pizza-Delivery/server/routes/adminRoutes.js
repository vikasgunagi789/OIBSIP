const express = require("express");

const jwt = require("jsonwebtoken");

const Admin =
    require("../models/Admin");


const router =
    express.Router();

const adminMiddleware =
    require("../middleware/adminMiddleware");


// =====================================================
// ADMIN LOGIN
// POST /api/admin/login
// =====================================================

router.post(
    "/login",
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;


            // ---------------------------------------------
            // CHECK INPUT
            // ---------------------------------------------

            if (!email || !password) {

                return res.status(400).json({

                    message:
                        "Email and password are required."

                });

            }


            // ---------------------------------------------
            // FIND ADMIN
            // ---------------------------------------------

            const admin =
                await Admin.findOne({

                    email:
                        email.toLowerCase().trim()

                });


            if (!admin) {

                return res.status(401).json({

                    message:
                        "Invalid admin credentials."

                });

            }


            // ---------------------------------------------
            // CHECK PASSWORD
            // ---------------------------------------------

            const isPasswordCorrect =
                await admin.comparePassword(
                    password
                );


            if (!isPasswordCorrect) {

                return res.status(401).json({

                    message:
                        "Invalid admin credentials."

                });

            }


            // ---------------------------------------------
            // CREATE JWT
            // ---------------------------------------------

            const token =
                jwt.sign(

                    {

                        id:
                            admin._id.toString(),

                        role:
                            "admin"

                    },

                    process.env.JWT_SECRET,

                    {

                        expiresIn:
                            "7d"

                    }

                );


            // ---------------------------------------------
            // RESPONSE
            // ---------------------------------------------

            res.json({

                message:
                    "Admin login successful.",

                token,

                admin: {

                    id:
                        admin._id,

                    name:
                        admin.name,

                    email:
                        admin.email,

                    role:
                        admin.role

                }

            });

        }

        catch (error) {

            console.error(
                "Admin login error:",
                error
            );


            res.status(500).json({

                message:
                    "Server error during admin login."

            });

        }

    }
);

// =====================================================
// ADMIN PROFILE
// GET /api/admin/profile
// =====================================================

router.get(
    "/profile",
    adminMiddleware,
    async (req, res) => {

        res.json({

            success: true,

            admin: req.admin

        });

    }
);


module.exports = router;
