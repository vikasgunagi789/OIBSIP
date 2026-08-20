const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const authMiddleware =
    require("../middleware/authMiddleware");

const Order =
    require("../models/Order");


const router = express.Router();


const razorpay =
    new Razorpay({

        key_id:
            process.env.RAZORPAY_KEY_ID,

        key_secret:
            process.env.RAZORPAY_KEY_SECRET

    });


// =====================================================
// CREATE RAZORPAY ORDER
// POST /api/payments/create-order
// =====================================================

router.post(
    "/create-order",
    authMiddleware,
    async (req, res) => {

        try {

            const { orderId } =
                req.body;


            if (!orderId) {

                return res.status(400).json({

                    message:
                        "Order ID is required."

                });

            }


            const order =
                await Order.findOne({

                    _id:
                        orderId,

                    user:
                        req.user._id

                });


            if (!order) {

                return res.status(404).json({

                    message:
                        "Order not found."

                });

            }


            if (
                order.paymentStatus === "Paid"
            ) {

                return res.status(400).json({

                    message:
                        "Order is already paid."

                });

            }


            const amountInPaise =
    Math.round(
        Number(order.total) * 100
    );


if (
    !Number.isInteger(amountInPaise) ||
    amountInPaise <= 0
) {

    return res.status(400).json({

        message:
            "Invalid order amount."

    });

}


const razorpayOrder =
    await razorpay.orders.create({

        amount:
            amountInPaise,

        currency:
            "INR",

        receipt:
            `vgpizza_${order._id
                .toString()
                .slice(-20)}`,

        notes: {

            internalOrderId:
                order._id.toString()

        }

    });


            res.json({

                success: true,

                keyId:
                    process.env.RAZORPAY_KEY_ID,

                razorpayOrderId:
                    razorpayOrder.id,

                amount:
                    razorpayOrder.amount,

                currency:
                    razorpayOrder.currency,

                orderId:
                    order._id

            });

        }

        catch (error) {

            console.error(
                "Create Razorpay order error:",
                error
            );


            res.status(500).json({

                message:
                    "Unable to create payment order."

            });

        }

    }
);


// =====================================================
// VERIFY PAYMENT
// POST /api/payments/verify
// =====================================================

router.post(
    "/verify",
    authMiddleware,
    async (req, res) => {

        try {

            const {

                razorpay_order_id,

                razorpay_payment_id,

                razorpay_signature,

                orderId

            } = req.body;


            if (
                !razorpay_order_id ||
                !razorpay_payment_id ||
                !razorpay_signature ||
                !orderId
            ) {

                return res.status(400).json({

                    message:
                        "Payment verification data is incomplete."

                });

            }


            const generatedSignature =
                crypto
                    .createHmac(
                        "sha256",
                        process.env.RAZORPAY_KEY_SECRET
                    )
                    .update(
                        `${razorpay_order_id}|${razorpay_payment_id}`
                    )
                    .digest("hex");


            if (
                generatedSignature !==
                razorpay_signature
            ) {

                return res.status(400).json({

                    message:
                        "Payment signature verification failed."

                });

            }


            const order =
                await Order.findOne({

                    _id:
                        orderId,

                    user:
                        req.user._id

                });


            if (!order) {

                return res.status(404).json({

                    message:
                        "Order not found."

                });

            }


            order.paymentStatus =
                "Paid";


            await order.save();


            res.json({

                success: true,

                message:
                    "Payment verified successfully.",

                order

            });

        }

        catch (error) {

            console.error(
                "Payment verification error:",
                error
            );


            res.status(500).json({

                message:
                    "Payment verification failed."

            });

        }

    }
);


module.exports = router;