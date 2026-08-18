const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");


const authRoutes =
    require("./routes/authRoutes");

const pizzaRoutes =
    require("./routes/pizzaRoutes");

const orderRoutes =
    require("./routes/orderRoutes");


dotenv.config();


const app =
    express();


/*
=========================================================
MIDDLEWARE
=========================================================
*/

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);


app.use(
    express.json()
);

app.use(
    "/api/orders",
    orderRoutes
);



/*
=========================================================
ROUTES
=========================================================
*/

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/pizzas",
    pizzaRoutes
);



/*
=========================================================
TEST ROUTE
=========================================================
*/

app.get(
    "/",
    (req, res) => {

        res.json({

            message:
                "VG Pizza API is running."

        });

    }
);



/*
=========================================================
MONGODB CONNECTION
=========================================================
*/

mongoose
    .connect(
        process.env.MONGO_URI
    )

    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );


        app.listen(
            process.env.PORT || 5000,

            () => {

                console.log(
                    `VG Pizza server running on port ${process.env.PORT || 5000}`
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