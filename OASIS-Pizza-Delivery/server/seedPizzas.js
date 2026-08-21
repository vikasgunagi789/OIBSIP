const mongoose = require("mongoose");

const dotenv = require("dotenv");

const Inventory =
    require("./models/Inventory");


dotenv.config();


const inventoryItems = [

    // =================================================
    // PIZZA BASES
    // =================================================

    {
        name: "Classic Pizza Base",
        category: "base",
        stock: 50,
        lowStockThreshold: 15
    },

    {
        name: "Thin Crust Base",
        category: "base",
        stock: 35,
        lowStockThreshold: 10
    },

    {
        name: "Cheese Burst Base",
        category: "base",
        stock: 25,
        lowStockThreshold: 8
    },


    // =================================================
    // SAUCES
    // =================================================

    {
        name: "Classic Tomato Sauce",
        category: "sauce",
        stock: 40,
        lowStockThreshold: 10
    },

    {
        name: "Spicy Peri Peri Sauce",
        category: "sauce",
        stock: 30,
        lowStockThreshold: 8
    },

    {
        name: "Creamy Garlic Sauce",
        category: "sauce",
        stock: 25,
        lowStockThreshold: 8
    },


    // =================================================
    // CHEESE
    // =================================================

    {
        name: "Mozzarella Cheese",
        category: "cheese",
        stock: 45,
        lowStockThreshold: 15
    },

    {
        name: "Cheddar Cheese",
        category: "cheese",
        stock: 30,
        lowStockThreshold: 10
    },

    {
        name: "Cheese Blend",
        category: "cheese",
        stock: 35,
        lowStockThreshold: 10
    },


    // =================================================
    // VEGETABLES
    // =================================================

    {
        name: "Onion",
        category: "vegetable",
        stock: 50,
        lowStockThreshold: 15
    },

    {
        name: "Capsicum",
        category: "vegetable",
        stock: 45,
        lowStockThreshold: 15
    },

    {
        name: "Tomato",
        category: "vegetable",
        stock: 40,
        lowStockThreshold: 12
    },

    {
        name: "Sweet Corn",
        category: "vegetable",
        stock: 35,
        lowStockThreshold: 10
    },

    {
        name: "Jalapeno",
        category: "vegetable",
        stock: 25,
        lowStockThreshold: 8
    }

];


const seedInventory =
    async () => {

        try {

            await mongoose.connect(
                process.env.MONGO_URI
            );


            console.log(
                "MongoDB connected."
            );


            await Inventory.deleteMany({});


            await Inventory.insertMany(
                inventoryItems
            );


            console.log(
                `${inventoryItems.length} VG PIZZA inventory items added successfully.`
            );


            await mongoose.disconnect();


            console.log(
                "MongoDB disconnected."
            );


            process.exit(0);

        }

        catch (error) {

            console.error(
                "Inventory seed error:",
                error
            );


            await mongoose.disconnect();


            process.exit(1);

        }

    };


seedInventory();
