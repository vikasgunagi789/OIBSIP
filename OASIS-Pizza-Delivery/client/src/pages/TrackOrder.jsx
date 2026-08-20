import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import "./TrackOrder.css";

import { io } from "socket.io-client";


function TrackOrder() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [order, setOrder] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =====================================================
    // FETCH ORDER
    // =====================================================

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const token =
                    localStorage.getItem("token");


                if (!token) {

                    navigate("/login");

                    return;

                }


                const response =
                    await fetch(
                        `http://localhost:5000/api/orders/${id}`,

                        {
                            method: "GET",

                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to fetch order."
                    );

                }


                setOrder(
                    data.order
                );

            }

            catch (err) {

                console.error(
                    "Track order error:",
                    err
                );


                setError(
                    err.message ||
                    "Unable to load order."
                );

            }

            finally {

                setLoading(false);

            }

        };


        fetchOrder();

    }, [id, navigate]);


    // =====================================================
    // LOGOUT
    // =====================================================

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="track-page">

                <div className="track-loading">

                    <i className="fa-solid fa-spinner fa-spin"></i>

                    <p>
                        Loading your order...
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error || !order) {

        return (

            <div className="track-page">

                <div className="track-error">

                    <i className="fa-solid fa-circle-exclamation"></i>

                    <h2>
                        Unable to Load Order
                    </h2>

                    <p>
                        {error || "Order not found."}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >

                        <i className="fa-solid fa-arrow-left"></i>

                        Back to Dashboard

                    </button>

                </div>

            </div>

        );

    }


    // =====================================================
    // ORDER STATUS
    // =====================================================

    const status =
        order.status;


    const isReceived =
        [
            "Order Received",
            "In Kitchen",
            "Sent to Delivery",
            "Delivered"
        ].includes(status);


    const isKitchen =
        [
            "In Kitchen",
            "Sent to Delivery",
            "Delivered"
        ].includes(status);


    const isDelivery =
        [
            "Sent to Delivery",
            "Delivered"
        ].includes(status);


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="track-page">


            {/* ================================================= */}
            {/* NAVBAR */}
            {/* ================================================= */}

            <nav className="track-navbar">

                <div
                    className="track-brand"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >

                    <div className="track-logo">
                        VG
                    </div>


                    <div className="track-brand-name">

                        <span>
                            VG
                        </span>

                        <strong>
                            PIZZA
                        </strong>

                    </div>

                </div>


                <div className="track-nav-actions">

                    <button
                        className="dashboard-btn"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >

                        <i className="fa-solid fa-house"></i>

                        Dashboard

                    </button>


                    <button
                        className="logout-btn"
                        onClick={logout}
                    >

                        <i className="fa-solid fa-right-from-bracket"></i>

                        Logout

                    </button>

                </div>

            </nav>



            {/* ================================================= */}
            {/* MAIN */}
            {/* ================================================= */}

            <main className="track-container">


                {/* HEADER */}

                <div className="track-header">

                    <p className="track-eyebrow">

                        <i className="fa-solid fa-location-dot"></i>

                        VG PIZZA • ORDER TRACKING

                    </p>


                    <h1>
                        Track Your Order
                    </h1>


                    <p>
                        Follow your pizza from our kitchen
                        to your doorstep.
                    </p>

                </div>



                {/* ================================================= */}
                {/* ORDER INFORMATION */}
                {/* ================================================= */}

                <section className="order-info-card">

                    <div>

                        <span className="order-label">
                            ORDER ID
                        </span>


                        <h2>
                            #
                            {order._id
                                .slice(-8)
                                .toUpperCase()
                            }
                        </h2>

                    </div>


                    <div className="status-badge">

                        <span></span>

                        {status}

                    </div>

                </section>



                {/* ================================================= */}
                {/* TRACKING */}
                {/* ================================================= */}

                <section className="tracking-card">

                    <div className="card-heading">

                        <div>

                            <span>
                                ORDER STATUS
                            </span>

                            <h2>
                                {status}
                            </h2>

                        </div>


                        <div className="pizza-icon">

                            <i className="fa-solid fa-pizza-slice"></i>

                        </div>

                    </div>



                    <div className="tracking-line">


                        {/* ORDER RECEIVED */}

                        <div
                            className={
                                `tracking-step ${
                                    isReceived
                                        ? "completed"
                                        : ""
                                }`
                            }
                        >

                            <div className="step-icon">

                                <i className="fa-solid fa-clipboard-check"></i>

                            </div>


                            <div className="step-content">

                                <h3>
                                    Order Received
                                </h3>

                                <p>
                                    We've received your order.
                                </p>

                            </div>

                        </div>


                        <div
                            className={
                                `connector ${
                                    isKitchen
                                        ? "active"
                                        : ""
                                }`
                            }
                        ></div>



                        {/* IN KITCHEN */}

                        <div
                            className={
                                `tracking-step ${
                                    isKitchen
                                        ? "current"
                                        : ""
                                }`
                            }
                        >

                            <div className="step-icon">

                                <i className="fa-solid fa-fire-burner"></i>

                            </div>


                            <div className="step-content">

                                <h3>
                                    In Kitchen
                                </h3>

                                <p>
                                    Our chefs are preparing your pizza.
                                </p>

                            </div>

                        </div>


                        <div
                            className={
                                `connector ${
                                    isDelivery
                                        ? "active"
                                        : ""
                                }`
                            }
                        ></div>



                        {/* DELIVERY */}

                        <div
                            className={
                                `tracking-step ${
                                    isDelivery
                                        ? "completed"
                                        : ""
                                }`
                            }
                        >

                            <div className="step-icon">

                                <i className="fa-solid fa-motorcycle"></i>

                            </div>


                            <div className="step-content">

                                <h3>
                                    Sent to Delivery
                                </h3>

                                <p>
                                    Your pizza will be on its way soon.
                                </p>

                            </div>

                        </div>


                    </div>

                </section>



                {/* ================================================= */}
                {/* DETAILS */}
                {/* ================================================= */}

                <div className="track-grid">


                    {/* ORDER DETAILS */}

                    <section className="details-card">

                        <div className="details-title">

                            <i className="fa-solid fa-bag-shopping"></i>

                            <h2>
                                Your Order
                            </h2>

                        </div>


                        {order.items.map(
                            (item, index) => (

                                <div
                                    className="pizza-item"
                                    key={
                                        item._id ||
                                        index
                                    }
                                >

                                    <div className="pizza-item-icon">

                                        <i className="fa-solid fa-pizza-slice"></i>

                                    </div>


                                    <div className="pizza-item-info">

                                        <h3>
                                            {item.name}
                                        </h3>

                                        <p>
                                            ₹
                                            {Number(
                                                item.price
                                            ).toFixed(2)}
                                        </p>

                                        <span>
                                            Quantity:{" "}
                                            {item.quantity}
                                        </span>

                                    </div>


                                    <strong>
                                        ₹
                                        {(
                                            Number(
                                                item.price
                                            ) *
                                            Number(
                                                item.quantity
                                            )
                                        ).toFixed(2)}
                                    </strong>

                                </div>

                            )
                        )}


                        <div className="price-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>
                                ₹
                                {Number(
                                    order.subtotal
                                ).toFixed(2)}
                            </strong>

                        </div>


                        <div className="price-row">

                            <span>
                                Delivery Fee
                            </span>

                            <strong>
                                ₹
                                {Number(
                                    order.deliveryFee
                                ).toFixed(2)}
                            </strong>

                        </div>


                        <div className="price-row">

                            <span>
                                Tax
                            </span>

                            <strong>
                                ₹
                                {Number(
                                    order.tax
                                ).toFixed(2)}
                            </strong>

                        </div>


                        <div className="total-row">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹
                                {Number(
                                    order.total
                                ).toFixed(2)}
                            </strong>

                        </div>

                    </section>



                    {/* DELIVERY DETAILS */}

                    <section className="details-card">

                        <div className="details-title">

                            <i className="fa-solid fa-location-dot"></i>

                            <h2>
                                Delivery Details
                            </h2>

                        </div>


                        <div className="delivery-info">


                            <div>

                                <span>

                                    <i className="fa-solid fa-user"></i>

                                    Customer

                                </span>


                                <strong>
                                    {order.customer?.name ||
                                        "Not available"
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>

                                    <i className="fa-solid fa-phone"></i>

                                    Phone

                                </span>


                                <strong>
                                    {order.customer?.phone ||
                                        "Not available"
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>

                                    <i className="fa-solid fa-location-dot"></i>

                                    Delivery Address

                                </span>


                                <strong>

                                    {order.deliveryAddress?.address}

                                    <br />

                                    {order.deliveryAddress?.city}

                                    {" - "}

                                    {order.deliveryAddress?.pincode}

                                    {
                                        order.deliveryAddress?.landmark
                                            ? ` • ${order.deliveryAddress.landmark}`
                                            : ""
                                    }

                                </strong>

                            </div>

                        </div>

                    </section>


                </div>



                {/* ================================================= */}
                {/* PAYMENT */}
                {/* ================================================= */}

                <section className="details-card payment-card">

                    <div className="details-title">

                        <i className="fa-solid fa-credit-card"></i>

                        <h2>
                            Payment
                        </h2>

                    </div>


                    <div className="payment-row">

                        <span>
                            Payment Status
                        </span>


                        <strong
                            className={
                                order.paymentStatus === "Paid"
                                    ? "payment-paid"
                                    : ""
                            }
                        >
                            {order.paymentStatus}
                        </strong>

                    </div>

                </section>



                {/* ================================================= */}
                {/* ACTIONS */}
                {/* ================================================= */}

                <div className="track-actions">

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >

                        <i className="fa-solid fa-arrow-left"></i>

                        Back to Dashboard

                    </button>


                    <button
                        className="order-more-btn"
                        onClick={() =>
                            navigate("/menu")
                        }
                    >

                        Order More

                        <i className="fa-solid fa-arrow-right"></i>

                    </button>

                </div>


            </main>

        </div>

    );

}


export default TrackOrder;