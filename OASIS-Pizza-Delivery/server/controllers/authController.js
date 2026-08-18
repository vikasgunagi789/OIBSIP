const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");



/*
=========================================================
REGISTER
=========================================================
*/

const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        // Check empty fields

        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                message:
                    "Please fill in all fields."

            });

        }


        // Password validation

        if (password.length < 8) {

            return res.status(400).json({

                message:
                    "Password must contain at least 8 characters."

            });

        }


        // Check existing user

        const existingUser =
            await User.findOne({
                email
            });


        if (existingUser) {

            return res.status(400).json({

                message:
                    "An account with this email already exists."

            });

        }


        // Hash password

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // Create user

        const user =
            await User.create({

                name,

                email,

                password:
                    hashedPassword

            });


        res.status(201).json({

            message:
                "Account created successfully.",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });


    } catch (error) {

        console.error(
            "REGISTER ERROR:",
            error
        );


        res.status(500).json({

            message:
                "Server error during registration."

        });

    }

};



/*
=========================================================
LOGIN
=========================================================
*/

const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                message:
                    "Please enter your email and password."

            });

        }


        // Find user

        const user =
            await User.findOne({
                email
            });


        if (!user) {

            return res.status(401).json({

                message:
                    "Invalid email or password."

            });

        }


        // Compare password

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                message:
                    "Invalid email or password."

            });

        }


        // Create JWT

        const token =
            jwt.sign(

                {

                    id: user._id,

                    role: user.role

                },

                process.env.JWT_SECRET,

                {

                    expiresIn:
                        "7d"

                }

            );


        res.json({

            message:
                "Login successful.",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });


    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );


        res.status(500).json({

            message:
                "Server error during login."

        });

    }

};


module.exports = {

    register,

    login

};