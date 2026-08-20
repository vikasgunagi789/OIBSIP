const express = require("express");

const Order = require("../models/Order");

const adminMiddleware =
    require("../middleware/adminMiddleware");


const router =
    express.Router();


// =====================================================
// GET ALL ORDERS
// GET /api/admin/orders
// =====================================================

router.get(
    "/",
    adminMiddleware,
    async (req, res) => {

        try {

            const orders =
                await Order.find()
                    .populate(
                        "user",
                        "name email"
                    )
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
                "Admin get orders error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch admin orders."

            });

        }

    }
);


// =====================================================
// UPDATE ORDER STATUS
// PUT /api/admin/orders/:id/status
// =====================================================

router.put(
    "/:id/status",
    adminMiddleware,
    async (req, res) => {

        try {

            const {
                status
            } = req.body;


            const allowedStatuses = [

                "Order Received",

                "In Kitchen",

                "Sent to Delivery",

                "Delivered",

                "Cancelled"

            ];


            if (
                !allowedStatuses.includes(
                    status
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid order status."

                });

            }


            const order =
                await Order.findById(
                    req.params.id
                );


            if (!order) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            order.status =
    status;

await order.save();


const io =
    req.app.get("io");


io.to(
    `order:${order._id}`
).emit(
    "orderStatusUpdated",
    {

        orderId:
            order._id.toString(),

        status:
            order.status

    }
);


res.json({

    success: true,

    message:
        "Order status updated successfully.",

    order

});


            res.json({

                success: true,

                message:
                    "Order status updated successfully.",

                order

            });

        }

        catch (error) {

            console.error(
                "Admin update order error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to update order status."

            });

        }

    }
);


module.exports = router;