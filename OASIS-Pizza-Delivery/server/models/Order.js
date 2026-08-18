const mongoose = require("mongoose");


const orderItemSchema = new mongoose.Schema({

    pizza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    }

});


const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },


    items: {

        type: [orderItemSchema],

        required: true

    },


    customer: {

        name: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        }

    },


    deliveryAddress: {

        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        pincode: {
            type: String,
            required: true
        },

        landmark: {
            type: String,
            default: ""
        }

    },


    subtotal: {
        type: Number,
        required: true
    },


    deliveryFee: {
        type: Number,
        required: true
    },


    tax: {
        type: Number,
        required: true
    },


    total: {
        type: Number,
        required: true
    },


    status: {

        type: String,

        enum: [

            "Order Received",

            "In Kitchen",

            "Sent to Delivery",

            "Delivered",

            "Cancelled"

        ],

        default: "Order Received"

    },


    paymentStatus: {

        type: String,

        enum: [

            "Pending",

            "Paid",

            "Failed"

        ],

        default: "Pending"

    }

}, {

    timestamps: true

});


module.exports =
    mongoose.model(
        "Order",
        orderSchema
    );