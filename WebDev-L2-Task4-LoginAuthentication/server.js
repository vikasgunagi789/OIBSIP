const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const usersFile =
    path.join(__dirname, "users.json");


// ================================
// MIDDLEWARE
// ================================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// =====================================
// SESSION
// =====================================

app.use(
    session({

        secret:
            process.env.SESSION_SECRET ||
            "development-secret",

        resave: false,

        saveUninitialized: false,

        cookie: {

            maxAge:
                1000 * 60 * 60,

            httpOnly: true,

            secure:
                process.env.NODE_ENV ===
                "production"

        }

    })
);


// ================================
// USER FILE FUNCTIONS
// ================================

function getUsers() {

    try {

        const data =
            fs.readFileSync(
                usersFile,
                "utf8"
            );

        return JSON.parse(data);

    } catch (error) {

        return [];

    }

}


function saveUsers(users) {

    fs.writeFileSync(
        usersFile,
        JSON.stringify(
            users,
            null,
            4
        )
    );

}


// ================================
// REGISTER
// ================================

app.post(
    "/api/register",
    async (req, res) => {

        try {

            const {
                username,
                email,
                password
            } = req.body;


            // Basic validation

            if (
                !username ||
                !email ||
                !password
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "All fields are required."
                });

            }


            // Password validation

            if (password.length < 8) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Password must contain at least 8 characters."
                });

            }


            if (!/\d/.test(password)) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Password must contain at least one number."
                });

            }


            const users =
                getUsers();


            // Duplicate check

            const existingUser =
                users.find(
                    user =>
                        user.email.toLowerCase() ===
                        email.toLowerCase()
                );


            if (existingUser) {

                return res.status(409).json({
                    success: false,
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


            const newUser = {

                id:
                    Date.now().toString(),

                username:
                    username.trim(),

                email:
                    email.trim().toLowerCase(),

                password:
                    hashedPassword

            };


            users.push(
                newUser
            );


            saveUsers(users);


            res.status(201).json({

                success: true,

                message:
                    "Registration successful."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Something went wrong."

            });

        }

    }
);


// ================================
// LOGIN
// ================================

app.post(
    "/api/login",
    async (req, res) => {

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

                    success: false,

                    message:
                        "Email and password are required."

                });

            }


            const users =
                getUsers();


            const user =
                users.find(
                    user =>
                        user.email ===
                        email.trim().toLowerCase()
                );


            // Do not reveal which credential failed

            if (!user) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid email or password."

                });

            }


            const passwordMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );


            if (!passwordMatch) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid email or password."

                });

            }


            // Create session

            req.session.user = {

                id: user.id,

                username: user.username,

                email: user.email

            };


            res.json({

                success: true,

                message:
                    "Login successful."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Something went wrong."

            });

        }

    }
);


// ================================
// AUTH MIDDLEWARE
// ================================

function requireLogin(
    req,
    res,
    next
) {

    if (!req.session.user) {

        return res.status(401).json({

            success: false,

            message:
                "Please login first."

        });

    }


    next();

}


// ================================
// CURRENT USER
// ================================

app.get(
    "/api/me",
    requireLogin,
    (req, res) => {

        res.json({

            success: true,

            user:
                req.session.user

        });

    }
);


// ================================
// LOGOUT
// ================================

app.post(
    "/api/logout",
    (req, res) => {

        req.session.destroy(
            error => {

                if (error) {

                    return res.status(500).json({

                        success: false,

                        message:
                            "Logout failed."

                    });

                }


                res.json({

                    success: true,

                    message:
                        "Logged out successfully."

                });

            }
        );

    }
);

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// =====================================
// SESSION
// =====================================

app.use(
    session({

        secret:
            process.env.SESSION_SECRET ||
            "development-secret",

        resave: false,

        saveUninitialized: false,

        cookie: {

            maxAge:
                1000 * 60 * 60,

            httpOnly: true,

            secure:
                process.env.NODE_ENV ===
                "production"

        }

    })
);


// ================================
// PROTECTED DASHBOARD PAGE
// ================================

app.get(
    "/dashboard.html",
    (req, res, next) => {

        if (!req.session.user) {

            return res.redirect(
                "/"
            );

        }


        next();

    }
);


// ================================
// START SERVER
// ================================

app.listen(
    PORT,
    "0.0.0.0",
    () => {
        console.log(
            `Server running on port ${PORT}`
        );
    }
);