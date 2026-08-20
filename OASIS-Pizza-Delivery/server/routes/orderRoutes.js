const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

const authMiddleware =
    require("../middleware/authMiddleware");


// =====================================================
// CREATE ORDER
// POST /api/orders
// =====================================================

router.post(
    "/",
    authMiddleware,
    async (req, res) => {

        try {

            const {
                items,
                customer,
                deliveryAddress,
                subtotal,
                deliveryFee,
                tax,
                total
            } = req.body;


            // ---------------------------------------------
            // CHECK CART
            // ---------------------------------------------

            if (
                !items ||
                !Array.isArray(items) ||
                items.length === 0
            ) {

                return res.status(400).json({

                    message:
                        "Your cart is empty."

                });

            }


            // ---------------------------------------------
            // CHECK USER
            // ---------------------------------------------

            if (!req.user || !req.user._id) {

                return res.status(401).json({

                    message:
                        "User authentication failed."

                });

            }


            // ---------------------------------------------
            // CREATE ORDER
            // ---------------------------------------------

            const order =
                await Order.create({

                    user:
                        req.user._id,

                    items,

                    customer,

                    deliveryAddress,

                    subtotal,

                    deliveryFee,

                    tax,

                    total

                });


            // ---------------------------------------------
            // RESPONSE
            // ---------------------------------------------

            res.status(201).json({

                success: true,

                message:
                    "Order created successfully.",

                order

            });

        }

        catch (error) {

            console.error(
                "Create order error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to create order."

            });

        }

    }
);


// =====================================================
// GET MY ORDERS
// GET /api/orders/my-orders
// =====================================================

router.get(
    "/my-orders",
    authMiddleware,
    async (req, res) => {

        try {

            const orders =
                await Order.find({

                    user:
                        req.user._id

                })
                .populate(
                    "items.pizza",
                    "name price image"
                )
                .sort({
                    createdAt: -1
                });


            res.json({

                success: true,

                orders

            });

        }

        catch (error) {

            console.error(
                "Get my orders error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch orders."

            });

        }

    }
);


// =====================================================
// GET SINGLE ORDER
// GET /api/orders/:id
// =====================================================

router.get(
    "/:id",
    authMiddleware,
    async (req, res) => {

        try {

            const order =
                await Order.findOne({

                    _id:
                        req.params.id,

                    user:
                        req.user._id

                })
                .populate(
                    "user",
                    "name email"
                )
                .populate(
                    "items.pizza",
                    "name price image"
                );


            // ---------------------------------------------
            // ORDER NOT FOUND
            // ---------------------------------------------

            if (!order) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            // ---------------------------------------------
            // SUCCESS
            // ---------------------------------------------

            res.json({

                success: true,

                order

            });

        }

        catch (error) {

            console.error(
                "Get order error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch order."

            });

        }

    }
);


// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;