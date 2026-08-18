const Pizza = require("../models/Pizza");


/*
=========================================================
GET ALL PIZZAS
=========================================================
*/

const getPizzas = async (req, res) => {

    try {

        const pizzas =
            await Pizza.find({
                available: true
            })
            .sort({
                createdAt: -1
            });


        res.status(200).json({

            success: true,

            count: pizzas.length,

            pizzas

        });


    } catch (error) {

        console.error(
            "GET PIZZAS ERROR:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to fetch pizzas."

        });

    }

};



/*
=========================================================
GET SINGLE PIZZA
=========================================================
*/

const getPizzaById = async (req, res) => {

    try {

        const pizza =
            await Pizza.findById(
                req.params.id
            );


        if (!pizza) {

            return res.status(404).json({

                success: false,

                message:
                    "Pizza not found."

            });

        }


        res.status(200).json({

            success: true,

            pizza

        });


    } catch (error) {

        console.error(
            "GET PIZZA ERROR:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to fetch pizza."

        });

    }

};



module.exports = {

    getPizzas,

    getPizzaById

};