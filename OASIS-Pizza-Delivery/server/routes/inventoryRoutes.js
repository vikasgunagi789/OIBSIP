const express = require("express");

const Inventory =
    require("../models/Inventory");

const adminMiddleware =
    require("../middleware/adminMiddleware");


const router =
    express.Router();


// =====================================================
// GET ALL INVENTORY
// GET /api/inventory
// =====================================================

router.get(
    "/",
    adminMiddleware,
    async (req, res) => {

        try {

            const inventory =
                await Inventory.find()
                    .sort({
                        category: 1,
                        name: 1
                    });


            res.json({

                success: true,

                inventory

            });

        }

        catch (error) {

            console.error(
                "Get inventory error:",
                error
            );


            res.status(500).json({

                message:
                    "Failed to fetch inventory."

            });

        }

    }
);


// =====================================================
// ADD INVENTORY ITEM
// POST /api/inventory
// =====================================================

router.post(
    "/",
    adminMiddleware,
    async (req, res) => {

        try {

            const {
                name,
                category,
                stock,
                lowStockThreshold
            } = req.body;


            if (
                !name ||
                !category ||
                stock === undefined
            ) {

                return res.status(400).json({

                    message:
                        "Name, category and stock are required."

                });

            }


            const existingItem =
                await Inventory.findOne({

                    name: {
                        $regex:
                            `^${name.trim()}$`,
                        $options: "i"
                    },

                    category

                });


            if (existingItem) {

                return res.status(400).json({

                    message:
                        "This inventory item already exists."

                });

            }


            const item =
                await Inventory.create({

                    name:
                        name.trim(),

                    category,

                    stock,

                    lowStockThreshold:
                        lowStockThreshold ?? 20

                });


            res.status(201).json({

                success: true,

                message:
                    "Inventory item added successfully.",

                item

            });

        }

        catch (error) {

            console.error(
                "Add inventory error:",
                error
            );


            res.status(500).json({

                message:
                    "Failed to add inventory item."

            });

        }

    }
);


// =====================================================
// UPDATE INVENTORY ITEM
// PUT /api/inventory/:id
// =====================================================

router.put(
    "/:id",
    adminMiddleware,
    async (req, res) => {

        try {

            const {
                name,
                category,
                stock,
                lowStockThreshold
            } = req.body;


            const item =
                await Inventory.findById(
                    req.params.id
                );


            if (!item) {

                return res.status(404).json({

                    message:
                        "Inventory item not found."

                });

            }


            if (name !== undefined) {

                item.name =
                    name.trim();

            }


            if (category !== undefined) {

                item.category =
                    category;

            }


            if (stock !== undefined) {

                if (Number(stock) < 0) {

                    return res.status(400).json({

                        message:
                            "Stock cannot be negative."

                    });

                }

                item.stock =
                    Number(stock);

            }


            if (
                lowStockThreshold !==
                undefined
            ) {

                if (
                    Number(
                        lowStockThreshold
                    ) < 0
                ) {

                    return res.status(400).json({

                        message:
                            "Threshold cannot be negative."

                    });

                }

                item.lowStockThreshold =
                    Number(
                        lowStockThreshold
                    );

            }


            await item.save();


            res.json({

                success: true,

                message:
                    "Inventory updated successfully.",

                item

            });

        }

        catch (error) {

            console.error(
                "Update inventory error:",
                error
            );


            res.status(500).json({

                message:
                    "Failed to update inventory."

            });

        }

    }
);


// =====================================================
// DELETE INVENTORY ITEM
// DELETE /api/inventory/:id
// =====================================================

router.delete(
    "/:id",
    adminMiddleware,
    async (req, res) => {

        try {

            const item =
                await Inventory.findByIdAndDelete(
                    req.params.id
                );


            if (!item) {

                return res.status(404).json({

                    message:
                        "Inventory item not found."

                });

            }


            res.json({

                success: true,

                message:
                    "Inventory item deleted successfully."

            });

        }

        catch (error) {

            console.error(
                "Delete inventory error:",
                error
            );


            res.status(500).json({

                message:
                    "Failed to delete inventory item."

            });

        }

    }
);


module.exports = router;
