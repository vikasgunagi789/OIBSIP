const express = require("express");

const router = express.Router();

const Order =
    require("../models/Order");

const authMiddleware =
    require("../middleware/authMiddleware");


/*
=====================================================
CREATE ORDER
POST /api/orders
=====================================================
*/

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


            if (
                !items ||
                items.length === 0
            ) {

                return res.status(400).json({

                    message:
                        "Your cart is empty."

                });

            }


            const order =
                await Order.create({

                    user: req.user._id,

                    items,

                    customer,

                    deliveryAddress,

                    subtotal,

                    deliveryFee,

                    tax,

                    total

                });


            res.status(201).json({

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

                message:
                    "Failed to create order."

            });

        }

    }

);


/*
=====================================================
GET MY ORDERS
GET /api/orders/my-orders
=====================================================
*/

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
                .sort({
                    createdAt: -1
                });


            res.json({

                orders

            });

        }

        catch (error) {

            console.error(error);


            res.status(500).json({

                message:
                    "Failed to fetch orders."

            });

        }

    }

);


/*
=====================================================
GET SINGLE ORDER
GET /api/orders/:id
=====================================================
*/

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

                });


            if (!order) {

                return res.status(404).json({

                    message:
                        "Order not found."

                });

            }


            res.json({

                order

            });

        }

        catch (error) {

            console.error(error);


            res.status(500).json({

                message:
                    "Failed to fetch order."

            });

        }

    }

);


module.exports = router;