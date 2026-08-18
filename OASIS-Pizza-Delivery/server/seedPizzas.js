const mongoose = require("mongoose");

const dotenv = require("dotenv");

const Pizza = require("./models/Pizza");


dotenv.config();


const pizzas = [

    {

        name: "VG Margherita",

        description:
            "Classic cheese pizza with rich tomato sauce and mozzarella.",

        category: "veg",

        price: 199,

        image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",

        ingredients: [
            "Tomato Sauce",
            "Mozzarella",
            "Basil"
        ],

        rating: 4.6

    },


    {

        name: "VG Farmhouse",

        description:
            "Loaded with fresh capsicum, onion, tomato and mushrooms.",

        category: "veg",

        price: 249,

        image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",

        ingredients: [
            "Capsicum",
            "Onion",
            "Tomato",
            "Mushroom",
            "Mozzarella"
        ],

        rating: 4.7

    },


    {

        name: "VG Paneer Tikka",

        description:
            "Spicy paneer tikka with onions, capsicum and special sauce.",

        category: "paneer",

        price: 279,

        image:
            "https://images.unsplash.com/photo-1593560708920-61dd98c8a03a",

        ingredients: [
            "Paneer",
            "Capsicum",
            "Onion",
            "Tikka Sauce",
            "Mozzarella"
        ],

        rating: 4.8

    },


    {

        name: "VG Veggie Delight",

        description:
            "A colourful combination of fresh vegetables and creamy cheese.",

        category: "veg",

        price: 229,

        image:
            "https://images.unsplash.com/photo-1579751626657-72bc17010498",

        ingredients: [
            "Sweet Corn",
            "Capsicum",
            "Onion",
            "Olives",
            "Mozzarella"
        ],

        rating: 4.5

    },


    {

        name: "VG Cheese Burst",

        description:
            "Extra cheesy pizza made for serious cheese lovers.",

        category: "special",

        price: 299,

        image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",

        ingredients: [
            "Mozzarella",
            "Cheese Sauce",
            "Cheese Burst Base"
        ],

        rating: 4.9

    }

];


const seedPizzas = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );


        console.log(
            "MongoDB connected."
        );


        await Pizza.deleteMany();


        await Pizza.insertMany(
            pizzas
        );


        console.log(
            `${pizzas.length} pizzas inserted successfully.`
        );


        await mongoose.connection.close();


        process.exit(0);


    } catch (error) {

        console.error(
            "SEED ERROR:",
            error
        );


        process.exit(1);

    }

};


seedPizzas();