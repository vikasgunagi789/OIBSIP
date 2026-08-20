const mongoose = require("mongoose");


const inventorySchema = new mongoose.Schema(

    {

        name: {

            type: String,

            required: true,

            trim: true

        },


        category: {

            type: String,

            required: true,

            enum: [

                "base",

                "sauce",

                "cheese",

                "vegetable"

            ]

        },


        stock: {

            type: Number,

            required: true,

            min: 0,

            default: 0

        },


        lowStockThreshold: {

            type: Number,

            required: true,

            min: 0,

            default: 20

        }

    },

    {

        timestamps: true

    }

);


module.exports =
    mongoose.model(
        "Inventory",
        inventorySchema
    );
