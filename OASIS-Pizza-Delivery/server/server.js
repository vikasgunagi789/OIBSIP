const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

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

const adminRoutes =
    require("./routes/adminRoutes");

const adminOrderRoutes =
    require("./routes/adminOrderRoutes");

const inventoryRoutes =
    require("./routes/inventoryRoutes");

const paymentRoutes =
    require("./routes/paymentRoutes");


// =====================================================
// APP
// =====================================================

const app = express();


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

app.use(
    "/api/payments",
    paymentRoutes
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

app.use(
    "/api/admin",
    adminRoutes
);

app.use(
    "/api/admin/orders",
    adminOrderRoutes
);

app.use(
    "/api/inventory",
    inventoryRoutes
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
// HTTP SERVER
// =====================================================

const httpServer =
    http.createServer(app);


// =====================================================
// SOCKET.IO
// =====================================================

const io =
    new Server(
        httpServer,
        {

            cors: {

                origin:
                    "http://localhost:5173",

                methods:
                    [
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE"
                    ]

            }

        }
    );


// Make io accessible to routes
app.set(
    "io",
    io
);


// =====================================================
// SOCKET EVENTS
// =====================================================

io.on(
    "connection",
    (socket) => {

        console.log(
            "Socket connected:",
            socket.id
        );


        socket.on(
            "joinOrder",
            (orderId) => {

                socket.join(
                    `order:${orderId}`
                );


                console.log(
                    `Socket ${socket.id} joined order:${orderId}`
                );

            }
        );


        socket.on(
            "disconnect",
            () => {

                console.log(
                    "Socket disconnected:",
                    socket.id
                );

            }
        );

    }
);


// =====================================================
// MONGODB + SERVER
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


        httpServer.listen(
            PORT,
            () => {

                console.log(
                    `VG Pizza server running on port ${PORT}`
                );

            }
        );

    })

    .catch(
        (error) => {

            console.error(
                "MongoDB connection failed:",
                error
            );

        }
    );