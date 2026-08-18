import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getPizzas } from "../services/api";

import "./Menu.css";


function Menu() {

    const navigate = useNavigate();


    const [pizzas, setPizzas] =
        useState([]);


    const [filteredPizzas, setFilteredPizzas] =
        useState([]);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    const [search, setSearch] =
        useState("");


    const [category, setCategory] =
        useState("all");


    /*
    =====================================================
    LOAD PIZZAS
    =====================================================
    */

    useEffect(() => {

        const loadPizzas = async () => {

            try {

                setLoading(true);

                setError("");


                const data =
                    await getPizzas();


                setPizzas(
                    data.pizzas
                );


                setFilteredPizzas(
                    data.pizzas
                );


            } catch (error) {

                console.error(
                    error
                );


                setError(
                    error.message ||
                    "Unable to load pizzas."
                );


            } finally {

                setLoading(false);

            }

        };


        loadPizzas();

    }, []);



    /*
    =====================================================
    FILTER PIZZAS
    =====================================================
    */

    useEffect(() => {

        let result =
            [...pizzas];


        /*
        CATEGORY
        */

        if (category !== "all") {

            result =
                result.filter(
                    (pizza) =>
                        pizza.category ===
                        category
                );

        }


        /*
        SEARCH
        */

        if (search.trim() !== "") {

            const searchText =
                search
                    .toLowerCase()
                    .trim();


            result =
                result.filter(
                    (pizza) =>

                        pizza.name
                            .toLowerCase()
                            .includes(
                                searchText
                            )

                        ||

                        pizza.description
                            .toLowerCase()
                            .includes(
                                searchText
                            )

                        ||

                        pizza.ingredients
                            .some(
                                (ingredient) =>
                                    ingredient
                                        .toLowerCase()
                                        .includes(
                                            searchText
                                        )
                            )

                );

        }


        setFilteredPizzas(
            result
        );

    }, [
        search,
        category,
        pizzas
    ]);



    /*
    =====================================================
    ADD TO CART
    =====================================================
    */

    const addToCart = (pizza) => {

        const existingCart =
            JSON.parse(
                localStorage.getItem(
                    "cart"
                )
            ) || [];


        const existingItem =
            existingCart.find(
                (item) =>
                    item._id ===
                    pizza._id
            );


        let updatedCart;


        if (existingItem) {

            updatedCart =
                existingCart.map(
                    (item) =>

                        item._id ===
                        pizza._id

                            ? {

                                ...item,

                                quantity:
                                    item.quantity +
                                    1

                            }

                            : item
                );

        } else {

            updatedCart = [

                ...existingCart,

                {

                    ...pizza,

                    quantity: 1

                }

            ];

        }


        localStorage.setItem(
            "cart",
            JSON.stringify(
                updatedCart
            )
        );


        /*
        TEMPORARY FEEDBACK
        */

        alert(
            `${pizza.name} added to cart`
        );

    };



    /*
    =====================================================
    LOADING
    =====================================================
    */

    if (loading) {

        return (

            <div className="menu-page">

                <div className="menu-loading">

                    <div className="loading-spinner"></div>

                    <p>
                        Preparing the VG Pizza menu...
                    </p>

                </div>

            </div>

        );

    }



    /*
    =====================================================
    ERROR
    =====================================================
    */

    if (error) {

        return (

            <div className="menu-page">

                <div className="menu-error">

                    <i className="fa-solid fa-triangle-exclamation"></i>

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            window.location.reload()
                        }
                    >

                        <i className="fa-solid fa-rotate-right"></i>

                        Try Again

                    </button>

                </div>

            </div>

        );

    }



    return (

        <div className="menu-page">


            {/* =================================================
                NAVBAR
            ================================================= */}

            <nav className="menu-navbar">


                <div
                    className="menu-brand"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >

                    <div className="menu-brand-logo">
                        VG
                    </div>


                    <div className="menu-brand-text">

                        <span>
                            VG
                        </span>

                        <strong>
                            PIZZA
                        </strong>

                    </div>

                </div>



                <div className="menu-nav-actions">


                    <button
                        className="cart-button"
                        onClick={() =>
                            navigate("/cart")
                        }
                    >

                        <i className="fa-solid fa-bag-shopping"></i>

                        <span>
                            Cart
                        </span>

                    </button>


                    <button
                        className="dashboard-button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >

                        <i className="fa-solid fa-house"></i>

                        Dashboard

                    </button>


                </div>


            </nav>



            {/* =================================================
                HERO
            ================================================= */}

            <header className="menu-hero">

                <div className="menu-hero-content">

                    <p className="menu-eyebrow">
                        VG PIZZA • FRESH FROM THE OVEN
                    </p>


                    <h1>
                        Find Your
                        <span>
                            Perfect Pizza
                        </span>
                    </h1>


                    <p>
                        Explore our handcrafted pizzas,
                        made with fresh ingredients and
                        loaded with flavour.
                    </p>

                </div>


                <div className="menu-hero-icon">

                    <i className="fa-solid fa-pizza-slice"></i>

                </div>

            </header>



            {/* =================================================
                SEARCH + FILTER
            ================================================= */}

            <section className="menu-controls">


                <div className="search-box">

                    <i className="fa-solid fa-magnifying-glass"></i>


                    <input
                        type="text"
                        placeholder="Search pizzas or ingredients..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />



                    {search && (

                        <button
                            className="clear-search"
                            onClick={() =>
                                setSearch("")
                            }
                        >

                            <i className="fa-solid fa-xmark"></i>

                        </button>

                    )}

                </div>



                <div className="category-filters">


                    <button
                        className={
                            category === "all"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setCategory("all")
                        }
                    >

                        All Pizzas

                    </button>


                    <button
                        className={
                            category === "veg"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setCategory("veg")
                        }
                    >

                        Veg

                    </button>


                    <button
                        className={
                            category === "paneer"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setCategory("paneer")
                        }
                    >

                        Paneer

                    </button>


                    <button
                        className={
                            category === "special"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setCategory("special")
                        }
                    >

                        Specials

                    </button>


                </div>

            </section>



            {/* =================================================
                MENU HEADER
            ================================================= */}

            <section className="menu-section">

                <div className="menu-section-header">

                    <div>

                        <p className="section-label">
                            OUR MENU
                        </p>

                        <h2>
                            Choose Your Favourite
                        </h2>

                    </div>


                    <span className="pizza-count">

                        {filteredPizzas.length}

                        {" "}

                        {filteredPizzas.length === 1
                            ? "Pizza"
                            : "Pizzas"
                        }

                    </span>

                </div>



                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {filteredPizzas.length === 0 ? (

                    <div className="empty-menu">

                        <i className="fa-solid fa-pizza-slice"></i>

                        <h3>
                            No pizzas found
                        </h3>

                        <p>
                            Try another search or category.
                        </p>

                        <button
                            onClick={() => {

                                setSearch("");

                                setCategory("all");

                            }}
                        >

                            Show All Pizzas

                        </button>

                    </div>

                ) : (


                    /* =================================================
                       PIZZA GRID
                    ================================================= */

                    <div className="pizza-grid">


                        {filteredPizzas.map(
                            (pizza) => (

                                <article
                                    className="pizza-card"
                                    key={pizza._id}
                                >


                                    {/* IMAGE */}

                                    <div className="pizza-image-container">

                                        <img
                                            src={
                                                pizza.image
                                            }
                                            alt={
                                                pizza.name
                                            }
                                        />


                                        <span
                                            className={
                                                `pizza-category ${pizza.category}`
                                            }
                                        >

                                            {pizza.category === "veg"
                                                ? "VEG"
                                                : pizza.category === "paneer"
                                                    ? "PANEER"
                                                    : "SPECIAL"
                                            }

                                        </span>


                                        <div className="pizza-rating">

                                            <i className="fa-solid fa-star"></i>

                                            {pizza.rating}

                                        </div>

                                    </div>



                                    {/* CONTENT */}

                                    <div className="pizza-card-content">


                                        <div className="pizza-title-row">

                                            <h3>
                                                {pizza.name}
                                            </h3>


                                            <span className="pizza-price">

                                                ₹
                                                {pizza.price}

                                            </span>

                                        </div>


                                        <p className="pizza-description">

                                            {pizza.description}

                                        </p>


                                        <div className="pizza-ingredients">

                                            {pizza.ingredients
                                                .slice(0, 4)
                                                .map(
                                                    (
                                                        ingredient
                                                    ) => (

                                                        <span
                                                            key={
                                                                ingredient
                                                            }
                                                        >

                                                            {ingredient}

                                                        </span>

                                                    )
                                                )
                                            }

                                        </div>


                                        <button
                                            className="add-cart-button"
                                            onClick={() =>
                                                addToCart(
                                                    pizza
                                                )
                                            }
                                        >

                                            <i className="fa-solid fa-plus"></i>

                                            Add to Cart

                                        </button>


                                    </div>


                                </article>

                            )
                        )}

                    </div>

                )}

            </section>


        </div>

    );

}


export default Menu;