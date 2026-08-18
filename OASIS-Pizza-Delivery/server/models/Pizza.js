const mongoose = require("mongoose");


const pizzaSchema = new mongoose.Schema(

    {

        name: {

            type: String,

            required: true,

            trim: true

        },


        description: {

            type: String,

            required: true,

            trim: true

        },


        category: {

            type: String,

            enum: [
                "veg",
                "paneer",
                "special"
            ],

            default: "veg"

        },


        price: {

            type: Number,

            required: true,

            min: 0

        },


        image: {

            type: String,

            required: true

        },


        ingredients: [

            {

                type: String,

                trim: true

            }

        ],


        available: {

            type: Boolean,

            default: true

        },


        rating: {

            type: Number,

            default: 4.5,

            min: 0,

            max: 5

        }

    },

    {

        timestamps: true

    }

);


module.exports =
    mongoose.model(
        "Pizza",
        pizzaSchema
    );