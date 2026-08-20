const mongoose = require("mongoose");

const dotenv = require("dotenv");

const Inventory =
    require("./models/Inventory");


dotenv.config();


const inventoryItems = [

    {
        name: "Classic Pizza Base",
        category: "base",
        stock: 50,
        lowStockThreshold: 15
    },

    {
        name: "Thin Crust Base",
        category: "base",
        stock: 40,
        lowStockThreshold: 15
    },

    {
        name: "Tomato Pizza Sauce",
        category: "sauce",
        stock: 35,
        lowStockThreshold: 10
    },

    {
        name: "Spicy Peri Peri Sauce",
        category: "sauce",
        stock: 25,
        lowStockThreshold: 8
    },

    {
        name: "Mozzarella Cheese",
        category: "cheese",
        stock: 30,
        lowStockThreshold: 10
    },

    {
        name: "Cheddar Cheese",
        category: "cheese",
        stock: 20,
        lowStockThreshold: 8
    },

    {
        name: "Onion",
        category: "vegetable",
        stock: 45,
        lowStockThreshold: 10
    },

    {
        name: "Capsicum",
        category: "vegetable",
        stock: 40,
        lowStockThreshold: 10
    },

    {
        name: "Tomato",
        category: "vegetable",
        stock: 35,
        lowStockThreshold: 10
    },

    {
        name: "Sweet Corn",
        category: "vegetable",
        stock: 30,
        lowStockThreshold: 8
    },

    {
        name: "Jalapeño",
        category: "vegetable",
        stock: 20,
        lowStockThreshold: 5
    },

    {
        name: "Olives",
        category: "vegetable",
        stock: 25,
        lowStockThreshold: 7
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
                "VG PIZZA inventory seeded successfully."
            );


            console.log(
                `${inventoryItems.length} inventory items added.`
            );


            await mongoose.connection.close();


            process.exit(0);

        }

        catch (error) {

            console.error(
                "Inventory seed error:",
                error
            );


            await mongoose.connection.close();


            process.exit(1);

        }

    };


seedInventory();