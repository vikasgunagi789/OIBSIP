import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Checkout.css";


function Checkout() {

    const navigate = useNavigate();


    const [cart, setCart] = useState([]);


    const [formData, setFormData] = useState({

        name: "",

        phone: "",

        address: "",

        city: "",

        pincode: "",

        landmark: ""

    });


    const [errors, setErrors] = useState({});


    /*
    =====================================================
    LOAD CART
    =====================================================
    */

    useEffect(() => {

        const savedCart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];


        if (savedCart.length === 0) {

            navigate("/menu");

            return;

        }


        setCart(savedCart);

    }, [navigate]);


    /*
    =====================================================
    INPUT CHANGE
    =====================================================
    */

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData({

            ...formData,

            [name]: value

        });


        if (errors[name]) {

            setErrors({

                ...errors,

                [name]: ""

            });

        }

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
                item.price *
                item.quantity,

            0
        );


    const deliveryFee =
        subtotal >= 499
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
    VALIDATION
    =====================================================
    */

    const validateForm = () => {

        const newErrors = {};


        if (!formData.name.trim()) {

            newErrors.name =
                "Please enter your name.";

        }


        if (!formData.phone.trim()) {

            newErrors.phone =
                "Please enter your phone number.";

        } else if (
            !/^[6-9]\d{9}$/.test(
                formData.phone
            )
        ) {

            newErrors.phone =
                "Enter a valid 10-digit phone number.";

        }


        if (!formData.address.trim()) {

            newErrors.address =
                "Please enter your delivery address.";

        }


        if (!formData.city.trim()) {

            newErrors.city =
                "Please enter your city.";

        }


        if (!formData.pincode.trim()) {

            newErrors.pincode =
                "Please enter your PIN code.";

        } else if (
            !/^\d{6}$/.test(
                formData.pincode
            )
        ) {

            newErrors.pincode =
                "Enter a valid 6-digit PIN code.";

        }


        setErrors(newErrors);


        return Object.keys(newErrors).length === 0;

    };


    /*
    =====================================================
    PLACE ORDER
    =====================================================
    */

    const handlePlaceOrder = async () => {

    if (!validateForm()) {

        return;

    }


    const token =
        localStorage.getItem("token");


    if (!token) {

        navigate("/login");

        return;

    }


    const orderData = {

        items: cart.map(
            (item) => ({

                pizza: item._id,

                name: item.name,

                quantity: item.quantity,

                price: item.price

            })
        ),


        customer: {

            name: formData.name,

            phone: formData.phone

        },


        deliveryAddress: {

            address: formData.address,

            city: formData.city,

            pincode: formData.pincode,

            landmark:
                formData.landmark

        },


        subtotal,

        deliveryFee,

        tax,

        total

    };


    try {

        const response =
            await fetch(
                "http://localhost:5000/api/orders",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body:
                        JSON.stringify(orderData)

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to place order."
            );

            return;

        }


        console.log(
            "VG PIZZA ORDER:",
            data.order
        );


        localStorage.removeItem(
            "cart"
        );


        localStorage.setItem(

            "latestOrder",

            JSON.stringify(
                data.order
            )

        );


        navigate(
            "/order-success",
            {
                state: {
                    order:
                        data.order
                }
            }

        );

    }

    catch (error) {

        console.error(
            "Order error:",
            error
        );


        alert(
            "Unable to connect to server."
        );

    }

};


    return (

        <div className="checkout-page">


            {/* =================================================
                NAVBAR
            ================================================= */}

            <nav className="checkout-navbar">


                <div
                    className="checkout-brand"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >

                    <div className="checkout-brand-logo">
                        VG
                    </div>


                    <div className="checkout-brand-name">

                        <span>
                            VG
                        </span>

                        <strong>
                            PIZZA
                        </strong>

                    </div>

                </div>


                <button
                    className="back-cart-button"
                    onClick={() =>
                        navigate("/cart")
                    }
                >

                    <i className="fa-solid fa-arrow-left"></i>

                    Back to Cart

                </button>

            </nav>



            {/* =================================================
                MAIN
            ================================================= */}

            <main className="checkout-container">


                {/* HEADER */}

                <div className="checkout-header">

                    <p>
                        VG PIZZA • CHECKOUT
                    </p>

                    <h1>
                        Complete Your Order
                    </h1>

                    <span>
                        Almost there. Tell us where to deliver
                        your pizza.
                    </span>

                </div>



                <div className="checkout-layout">


                    {/* =================================================
                        DELIVERY FORM
                    ================================================= */}

                    <section className="delivery-card">


                        <div className="checkout-section-title">

                            <div className="section-number">
                                01
                            </div>

                            <div>

                                <h2>
                                    Delivery Details
                                </h2>

                                <p>
                                    Where should we deliver
                                    your order?
                                </p>

                            </div>

                        </div>



                        {/* NAME + PHONE */}

                        <div className="form-row">


                            <div className="form-group">

                                <label>
                                    Full Name
                                </label>

                                <div
                                    className={
                                        `input-wrapper ${
                                            errors.name
                                                ? "input-error"
                                                : ""
                                        }`
                                    }
                                >

                                    <i className="fa-regular fa-user"></i>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {errors.name && (

                                    <small>
                                        {errors.name}
                                    </small>

                                )}

                            </div>



                            <div className="form-group">

                                <label>
                                    Phone Number
                                </label>

                                <div
                                    className={
                                        `input-wrapper ${
                                            errors.phone
                                                ? "input-error"
                                                : ""
                                        }`
                                    }
                                >

                                    <i className="fa-solid fa-phone"></i>

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="10-digit mobile number"
                                        maxLength="10"
                                        value={
                                            formData.phone
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {errors.phone && (

                                    <small>
                                        {errors.phone}
                                    </small>

                                )}

                            </div>


                        </div>



                        {/* ADDRESS */}

                        <div className="form-group">

                            <label>
                                Delivery Address
                            </label>

                            <div
                                className={
                                    `input-wrapper textarea-wrapper ${
                                        errors.address
                                            ? "input-error"
                                            : ""
                                    }`
                                }
                            >

                                <i className="fa-solid fa-location-dot"></i>

                                <textarea
                                    name="address"
                                    placeholder="House / Flat / Street / Area"
                                    value={
                                        formData.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    rows="3"
                                ></textarea>

                            </div>


                            {errors.address && (

                                <small>
                                    {errors.address}
                                </small>

                            )}

                        </div>



                        {/* CITY + PINCODE */}

                        <div className="form-row">


                            <div className="form-group">

                                <label>
                                    City
                                </label>

                                <div
                                    className={
                                        `input-wrapper ${
                                            errors.city
                                                ? "input-error"
                                                : ""
                                        }`
                                    }
                                >

                                    <i className="fa-solid fa-city"></i>

                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="Your city"
                                        value={
                                            formData.city
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {errors.city && (

                                    <small>
                                        {errors.city}
                                    </small>

                                )}

                            </div>



                            <div className="form-group">

                                <label>
                                    PIN Code
                                </label>

                                <div
                                    className={
                                        `input-wrapper ${
                                            errors.pincode
                                                ? "input-error"
                                                : ""
                                        }`
                                    }
                                >

                                    <i className="fa-solid fa-map-pin"></i>

                                    <input
                                        type="text"
                                        name="pincode"
                                        placeholder="6-digit PIN"
                                        maxLength="6"
                                        value={
                                            formData.pincode
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {errors.pincode && (

                                    <small>
                                        {errors.pincode}
                                    </small>

                                )}

                            </div>


                        </div>



                        {/* LANDMARK */}

                        <div className="form-group">

                            <label>
                                Landmark
                                <span>
                                    Optional
                                </span>
                            </label>

                            <div className="input-wrapper">

                                <i className="fa-solid fa-signs-post"></i>

                                <input
                                    type="text"
                                    name="landmark"
                                    placeholder="Nearby landmark"
                                    value={
                                        formData.landmark
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>



                        {/* PAYMENT NOTICE */}

                        <div className="payment-notice">

                            <div className="payment-notice-icon">

                                <i className="fa-solid fa-shield-halved"></i>

                            </div>

                            <div>

                                <strong>
                                    Secure Payment
                                </strong>

                                <p>
                                    Online payment options will
                                    be available after your order
                                    details are confirmed.
                                </p>

                            </div>

                        </div>


                    </section>



                    {/* =================================================
                        ORDER SUMMARY
                    ================================================= */}

                    <aside className="checkout-summary">


                        <div className="summary-title">

                            <div>

                                <p>
                                    VG PIZZA
                                </p>

                                <h2>
                                    Your Order
                                </h2>

                            </div>

                            <span>
                                {totalItems}
                                {" "}
                                items
                            </span>

                        </div>



                        {/* ITEMS */}

                        <div className="checkout-items">

                            {cart.map(
                                (item) => (

                                    <div
                                        className="checkout-item"
                                        key={item._id}
                                    >

                                        <img
                                            src={
                                                item.image
                                            }
                                            alt={
                                                item.name
                                            }
                                        />


                                        <div className="checkout-item-info">

                                            <h3>
                                                {item.name}
                                            </h3>

                                            <span>
                                                Qty:
                                                {" "}
                                                {item.quantity}
                                            </span>

                                        </div>


                                        <strong>
                                            ₹
                                            {
                                                (
                                                    item.price *
                                                    item.quantity
                                                ).toFixed(2)
                                            }
                                        </strong>

                                    </div>

                                )
                            )}

                        </div>



                        <div className="checkout-divider"></div>



                        {/* PRICE */}

                        <div className="checkout-price-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>
                                ₹{subtotal.toFixed(2)}
                            </strong>

                        </div>


                        <div className="checkout-price-row">

                            <span>
                                Delivery
                            </span>

                            <strong
                                className={
                                    deliveryFee === 0
                                        ? "free"
                                        : ""
                                }
                            >

                                {deliveryFee === 0
                                    ? "FREE"
                                    : `₹${deliveryFee.toFixed(2)}`
                                }

                            </strong>

                        </div>


                        <div className="checkout-price-row">

                            <span>
                                GST
                            </span>

                            <strong>
                                ₹{tax.toFixed(2)}
                            </strong>

                        </div>



                        <div className="checkout-divider"></div>



                        <div className="checkout-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹{total.toFixed(2)}
                            </strong>

                        </div>



                        <button
                            className="place-order-button"
                            onClick={
                                handlePlaceOrder
                            }
                        >

                            Place Order

                            <i className="fa-solid fa-arrow-right"></i>

                        </button>


                        <p className="checkout-secure">

                            <i className="fa-solid fa-lock"></i>

                            Your information is secure

                        </p>


                    </aside>


                </div>


            </main>


        </div>

    );

}


export default Checkout;