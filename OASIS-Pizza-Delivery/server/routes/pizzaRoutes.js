const express = require("express");


const {

    getPizzas,

    getPizzaById

} = require(
    "../controllers/pizzaController"
);


const router =
    express.Router();


/*
=========================================================
GET ALL PIZZAS
=========================================================
*/

router.get(
    "/",
    getPizzas
);


/*
=========================================================
GET SINGLE PIZZA
=========================================================
*/

router.get(
    "/:id",
    getPizzaById
);


module.exports = router;