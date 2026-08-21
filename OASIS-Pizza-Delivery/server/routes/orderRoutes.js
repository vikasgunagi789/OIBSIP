const express = require("express");

const mongoose = require("mongoose");

const router = express.Router();


// =====================================================
// MODELS
// =====================================================

const Order =
    require("../models/Order");

const Pizza =
    require("../models/Pizza");

const Inventory =
    require("../models/Inventory");


// =====================================================
// AUTH MIDDLEWARE
// =====================================================

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

        // -------------------------------------------------
        // START DATABASE SESSION
        // -------------------------------------------------

        const session =
            await mongoose.startSession();


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


            // =================================================
            // CHECK CART
            // =================================================

            if (

                !items ||

                !Array.isArray(items) ||

                items.length === 0

            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Your cart is empty."

                });

            }


            // =================================================
            // CHECK AUTHENTICATED USER
            // =================================================

            if (

                !req.user ||

                !req.user._id

            ) {

                return res.status(401).json({

                    success: false,

                    message:
                        "User authentication failed."

                });

            }


            // =================================================
            // START TRANSACTION
            // =================================================

            session.startTransaction();


            // =================================================
            // GET PIZZA IDS
            // =================================================

            const pizzaIds =
                items.map(

                    item =>
                        item.pizza

                );


            // =================================================
            // FIND PIZZAS
            // =================================================

            const pizzas =
                await Pizza.find({

                    _id: {

                        $in:
                            pizzaIds

                    }

                }).session(session);


            // =================================================
            // CHECK PIZZAS
            // =================================================

            if (

                pizzas.length !==
                pizzaIds.length

            ) {

                throw new Error(

                    "One or more pizzas could not be found."

                );

            }


            // =================================================
            // INGREDIENT REQUIREMENTS
            // =================================================

            const ingredientRequirements =
                new Map();


            // =================================================
            // LOOP THROUGH ORDER ITEMS
            // =================================================

            for (

                const orderItem
                of items

            ) {

                // ---------------------------------------------
                // FIND PIZZA
                // ---------------------------------------------

                const pizza =
                    pizzas.find(

                        p =>

                            p._id.toString() ===
                            orderItem.pizza.toString()

                    );


                if (!pizza) {

                    throw new Error(

                        "Pizza not found."

                    );

                }


                // ---------------------------------------------
                // GET QUANTITY
                // ---------------------------------------------

                const quantity =
                    Number(

                        orderItem.quantity

                    );


                // ---------------------------------------------
                // VALIDATE QUANTITY
                // ---------------------------------------------

                if (

                    !Number.isInteger(quantity) ||

                    quantity < 1

                ) {

                    throw new Error(

                        `Invalid quantity for ${pizza.name}.`

                    );

                }


                // ---------------------------------------------
                // CHECK PIZZA AVAILABILITY
                // ---------------------------------------------

                if (

                    pizza.available === false

                ) {

                    throw new Error(

                        `${pizza.name} is currently unavailable.`

                    );

                }


                // ---------------------------------------------
                // GET INGREDIENTS
                // ---------------------------------------------

                for (

                    const ingredient
                    of pizza.ingredients

                ) {

                    const ingredientName =
                        ingredient.trim();


                    if (!ingredientName) {

                        continue;

                    }


                    const currentQuantity =
                        ingredientRequirements.get(

                            ingredientName

                        ) || 0;


                    ingredientRequirements.set(

                        ingredientName,

                        currentQuantity +
                        quantity

                    );

                }

            }


            // =================================================
            // CHECK INVENTORY
            // =================================================

            const inventoryItems = [];


            for (

                const [

                    ingredientName,

                    requiredQuantity

                ]

                of ingredientRequirements

            ) {

                // ---------------------------------------------
                // FIND INVENTORY ITEM
                // ---------------------------------------------

                const inventoryItem =
                    await Inventory.findOne({

                        name: {

                            $regex:

                                `^${ingredientName}$`,

                            $options:
                                "i"

                        }

                    }).session(session);


                // ---------------------------------------------
                // INGREDIENT NOT FOUND
                // ---------------------------------------------

                if (!inventoryItem) {

                    throw new Error(

                        `Ingredient "${ingredientName}" is not available in inventory.`

                    );

                }


                // ---------------------------------------------
                // CHECK STOCK
                // ---------------------------------------------

                if (

                    inventoryItem.stock <
                    requiredQuantity

                ) {

                    throw new Error(

                        `Not enough ${ingredientName} in stock. Available: ${inventoryItem.stock}, required: ${requiredQuantity}.`

                    );

                }


                // ---------------------------------------------
                // STORE FOR UPDATE
                // ---------------------------------------------

                inventoryItems.push({

                    inventoryItem,

                    requiredQuantity

                });

            }


            // =================================================
            // REDUCE INVENTORY
            // =================================================

            for (

                const {

                    inventoryItem,

                    requiredQuantity

                }

                of inventoryItems

            ) {

                inventoryItem.stock -=
                    requiredQuantity;


                await inventoryItem.save({

                    session

                });

            }


            // =================================================
            // CREATE ORDER
            // =================================================

            const createdOrders =
                await Order.create(

                    [

                        {

                            user:
                                req.user._id,

                            items,

                            customer,

                            deliveryAddress,

                            subtotal,

                            deliveryFee,

                            tax,

                            total

                        }

                    ],

                    {

                        session

                    }

                );


            const order =
                createdOrders[0];


            // =================================================
            // COMMIT TRANSACTION
            // =================================================

            await session.commitTransaction();


            // =================================================
            // RESPONSE
            // =================================================

            return res.status(201).json({

                success: true,

                message:
                    "Order created successfully.",

                order

            });

        }


        catch (error) {

            // =================================================
            // ROLLBACK TRANSACTION
            // =================================================

            if (

                session.inTransaction()

            ) {

                await session.abortTransaction();

            }


            console.error(

                "Create order error:",

                error

            );


            return res.status(400).json({

                success: false,

                message:

                    error.message ||

                    "Failed to create order."

            });

        }


        finally {

            // =================================================
            // CLOSE SESSION
            // =================================================

            await session.endSession();

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

                    createdAt:
                        -1

                );


            return res.json({

                success: true,

                orders

            });

        }


        catch (error) {

            console.error(

                "Get my orders error:",

                error

            );


            return res.status(500).json({

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


            // =================================================
            // ORDER NOT FOUND
            // =================================================

            if (!order) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            // =================================================
            // RESPONSE
            // =================================================

            return res.json({

                success: true,

                order

            });

        }


        catch (error) {

            console.error(

                "Get order error:",

                error

            );


            return res.status(500).json({

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

module.exports =
    router;

