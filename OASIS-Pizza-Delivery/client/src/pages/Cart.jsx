import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import "./Cart.css";


function Cart() {

    const navigate = useNavigate();


    const [cart, setCart] =
        useState([]);


    /*
    =====================================================
    LOAD CART
    =====================================================
    */

    useEffect(() => {

        loadCart();

    }, []);


    const loadCart = () => {

        const savedCart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];


        setCart(savedCart);

    };


    /*
    =====================================================
    SAVE CART
    =====================================================
    */

    const saveCart = (updatedCart) => {

        localStorage.setItem(
            "cart",
            JSON.stringify(
                updatedCart
            )
        );


        setCart(updatedCart);

    };


    /*
    =====================================================
    INCREASE QUANTITY
    =====================================================
    */

    const increaseQuantity = (id) => {

        const updatedCart =
            cart.map((item) => {

                if (item._id === id) {

                    return {

                        ...item,

                        quantity:
                            item.quantity + 1

                    };

                }


                return item;

            });


        saveCart(updatedCart);

    };


    /*
    =====================================================
    DECREASE QUANTITY
    =====================================================
    */

    const decreaseQuantity = (id) => {

        const updatedCart =
            cart
                .map((item) => {

                    if (item._id === id) {

                        return {

                            ...item,

                            quantity:
                                item.quantity - 1

                        };

                    }


                    return item;

                })
                .filter(
                    (item) =>
                        item.quantity > 0
                );


        saveCart(updatedCart);

    };


    /*
    =====================================================
    REMOVE ITEM
    =====================================================
    */

    const removeItem = (id) => {

        const updatedCart =
            cart.filter(
                (item) =>
                    item._id !== id
            );


        saveCart(updatedCart);

    };


    /*
    =====================================================
    CLEAR CART
    =====================================================
    */

    const clearCart = () => {

        localStorage.removeItem(
            "cart"
        );


        setCart([]);

    };


    /*
    =====================================================
    CALCULATIONS
    =====================================================
    */

    const subtotal =
        cart.reduce(
            (total, item) =>

                total +
                (
                    item.price *
                    item.quantity
                ),

            0
        );


    const deliveryFee =
        subtotal === 0
            ? 0
            : subtotal >= 499
                ? 0
                : 40;


    const tax =
        subtotal * 0.05;


    const total =
        subtotal +
        deliveryFee +
        tax;


    const totalItems =
        cart.reduce(
            (total, item) =>
                total +
                item.quantity,

            0
        );



    /*
    =====================================================
    EMPTY CART
    =====================================================
    */

    if (cart.length === 0) {

        return (

            <div className="cart-page">


                {/* NAVBAR */}

                <nav className="cart-navbar">

                    <div
                        className="cart-brand"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >

                        <div className="cart-brand-logo">
                            VG
                        </div>


                        <div className="cart-brand-name">

                            <span>
                                VG
                            </span>

                            <strong>
                                PIZZA
                            </strong>

                        </div>

                    </div>


                    <button
                        className="cart-back-button"
                        onClick={() =>
                            navigate("/menu")
                        }
                    >

                        <i className="fa-solid fa-arrow-left"></i>

                        Back to Menu

                    </button>

                </nav>



                {/* EMPTY CART */}

                <main className="empty-cart-container">

                    <div className="empty-cart-icon">

                        <i className="fa-solid fa-bag-shopping"></i>

                    </div>


                    <p className="empty-cart-label">
                        VG PIZZA CART
                    </p>


                    <h1>
                        Your cart is empty
                    </h1>


                    <p>
                        Looks like you haven't added
                        anything delicious yet.
                    </p>


                    <button
                        className="start-order-button"
                        onClick={() =>
                            navigate("/menu")
                        }
                    >

                        <i className="fa-solid fa-pizza-slice"></i>

                        Explore Pizzas

                    </button>

                </main>


            </div>

        );

    }



    /*
    =====================================================
    MAIN CART
    =====================================================
    */

    return (

        <div className="cart-page">


            {/* =================================================
                NAVBAR
            ================================================= */}

            <nav className="cart-navbar">


                <div
                    className="cart-brand"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >

                    <div className="cart-brand-logo">
                        VG
                    </div>


                    <div className="cart-brand-name">

                        <span>
                            VG
                        </span>

                        <strong>
                            PIZZA
                        </strong>

                    </div>

                </div>



                <div className="cart-nav-right">

                    <button
                        onClick={() =>
                            navigate("/menu")
                        }
                    >

                        <i className="fa-solid fa-arrow-left"></i>

                        Continue Shopping

                    </button>

                </div>


            </nav>



            {/* =================================================
                CONTENT
            ================================================= */}

            <main className="cart-container">


                {/* HEADER */}

                <div className="cart-header">

                    <div>

                        <p className="cart-eyebrow">
                            VG PIZZA • YOUR ORDER
                        </p>

                        <h1>
                            Your Cart
                        </h1>

                        <p>
                            {totalItems}
                            {" "}
                            {totalItems === 1
                                ? "item"
                                : "items"
                            }
                            {" "}
                            ready to go.
                        </p>

                    </div>


                    <button
                        className="clear-cart-button"
                        onClick={clearCart}
                    >

                        <i className="fa-solid fa-trash"></i>

                        Clear Cart

                    </button>

                </div>



                {/* GRID */}

                <div className="cart-layout">


                    {/* =================================================
                        ITEMS
                    ================================================= */}

                    <section className="cart-items">


                        {cart.map(
                            (item) => (

                                <article
                                    className="cart-item"
                                    key={item._id}
                                >


                                    {/* IMAGE */}

                                    <div className="cart-item-image">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />

                                    </div>



                                    {/* DETAILS */}

                                    <div className="cart-item-details">


                                        <div className="cart-item-title-row">

                                            <div>

                                                <h2>
                                                    {item.name}
                                                </h2>

                                                <p>
                                                    {item.description}
                                                </p>

                                            </div>


                                            <button
                                                className="remove-item-button"
                                                onClick={() =>
                                                    removeItem(
                                                        item._id
                                                    )
                                                }
                                                title="Remove item"
                                            >

                                                <i className="fa-solid fa-trash"></i>

                                            </button>

                                        </div>



                                        {/* INGREDIENTS */}

                                        <div className="cart-item-ingredients">

                                            {item.ingredients
                                                .slice(0, 3)
                                                .map(
                                                    (ingredient) => (

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



                                        {/* BOTTOM */}

                                        <div className="cart-item-bottom">


                                            <div className="quantity-control">

                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(
                                                            item._id
                                                        )
                                                    }
                                                >

                                                    <i className="fa-solid fa-minus"></i>

                                                </button>


                                                <span>
                                                    {item.quantity}
                                                </span>


                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(
                                                            item._id
                                                        )
                                                    }
                                                >

                                                    <i className="fa-solid fa-plus"></i>

                                                </button>

                                            </div>



                                            <div className="cart-item-price">

                                                ₹
                                                {
                                                    (
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)
                                                }

                                            </div>


                                        </div>


                                    </div>


                                </article>

                            )
                        )}

                    </section>



                    {/* =================================================
                        SUMMARY
                    ================================================= */}

                    <aside className="cart-summary">


                        <div className="summary-header">

                            <div>

                                <p>
                                    VG PIZZA
                                </p>

                                <h2>
                                    Order Summary
                                </h2>

                            </div>


                            <i className="fa-solid fa-receipt"></i>

                        </div>



                        {/* SUBTOTAL */}

                        <div className="summary-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>
                                ₹{subtotal.toFixed(2)}
                            </strong>

                        </div>



                        {/* DELIVERY */}

                        <div className="summary-row">

                            <span>
                                Delivery
                            </span>

                            <strong
                                className={
                                    deliveryFee === 0
                                        ? "free-text"
                                        : ""
                                }
                            >

                                {deliveryFee === 0
                                    ? "FREE"
                                    : `₹${deliveryFee.toFixed(2)}`
                                }

                            </strong>

                        </div>



                        {/* TAX */}

                        <div className="summary-row">

                            <span>
                                GST
                            </span>

                            <strong>
                                ₹{tax.toFixed(2)}
                            </strong>

                        </div>



                        <div className="summary-divider"></div>



                        {/* TOTAL */}

                        <div className="summary-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹{total.toFixed(2)}
                            </strong>

                        </div>



                        {/* FREE DELIVERY MESSAGE */}

                        {subtotal < 499 && (

                            <div className="delivery-message">

                                <i className="fa-solid fa-truck-fast"></i>

                                <span>

                                    Add ₹
                                    {(499 - subtotal).toFixed(2)}
                                    {" "}
                                    more for
                                    <strong>
                                        {" "}FREE DELIVERY
                                    </strong>

                                </span>

                            </div>

                        )}



                        {subtotal >= 499 && (

                            <div className="delivery-message success">

                                <i className="fa-solid fa-circle-check"></i>

                                <span>
                                    You unlocked
                                    <strong>
                                        {" "}FREE DELIVERY
                                    </strong>
                                </span>

                            </div>

                        )}



                        {/* CHECKOUT */}

                        <button
                            className="checkout-button"
                            onClick={() =>
                                navigate("/checkout")
                            }
                        >

                            Proceed to Checkout

                            <i className="fa-solid fa-arrow-right"></i>

                        </button>



                        <p className="secure-checkout">

                            <i className="fa-solid fa-lock"></i>

                            Secure checkout

                        </p>


                    </aside>


                </div>


            </main>


        </div>

    );

}


export default Cart;