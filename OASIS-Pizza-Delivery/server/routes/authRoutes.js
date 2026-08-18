const express = require("express");

const {
    register,
    login
} = require("../controllers/authController");

const protect =
    require("../middleware/authMiddleware");


const router =
    express.Router();


/*
=========================================================
PUBLIC ROUTES
=========================================================
*/

router.post(
    "/register",
    register
);


router.post(
    "/login",
    login
);


/*
=========================================================
PROTECTED ROUTE
=========================================================
*/

router.get(
    "/profile",
    protect,

    (req, res) => {

        res.json({

            message:
                "You are authorized to access this route.",

            user:
                req.user

        });

    }

);


module.exports = router;