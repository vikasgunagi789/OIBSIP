const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");


// =====================================================
// LOAD ENVIRONMENT VARIABLES FIRST
// =====================================================

dotenv.config();


// =====================================================
// ROUTES
// =====================================================

const authRoutes =
    require("./routes/authRoutes");

const pizzaRoutes =
    require("./routes/pizzaRoutes");

const orderRoutes =
    require("./routes/orderRoutes");


// =====================================================
// APP
// =====================================================

const app =
    express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use(
    express.json()
);


// =====================================================
// ROUTES
// =====================================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/pizzas",
    pizzaRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);


// =====================================================
// TEST ROUTE
// =====================================================

app.get(
    "/",
    (req, res) => {

        res.json({

            message:
                "VG Pizza API is running."

        });

    }
);


// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose
    .connect(
        process.env.MONGO_URI
    )

    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );


        const PORT =
            process.env.PORT || 5000;


        app.listen(
            PORT,

            () => {

                console.log(
                    `VG Pizza server running on port ${PORT}`
                );

            }
        );

    })

    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error
        );

    });