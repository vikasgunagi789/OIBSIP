import { useNavigate, useParams } from "react-router-dom";

import "./TrackOrder.css";


function TrackOrder() {

    const { id } = useParams();

    const navigate = useNavigate();


    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };


    return (

        <div className="track-page">


            {/* ================================================= */}
            {/* NAVBAR */}
            {/* ================================================= */}

            <nav className="track-navbar">

                <div
                    className="track-brand"
                    onClick={() => navigate("/dashboard")}
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
                        onClick={() => navigate("/dashboard")}
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
                            #{id}
                        </h2>

                    </div>


                    <div className="status-badge">

                        <span></span>

                        Order Received

                    </div>

                </section>



                {/* ================================================= */}
                {/* ORDER TRACKER */}
                {/* ================================================= */}

                <section className="tracking-card">

                    <div className="card-heading">

                        <div>

                            <span>
                                ORDER STATUS
                            </span>

                            <h2>
                                Your pizza is being prepared
                            </h2>

                        </div>


                        <div className="pizza-icon">

                            <i className="fa-solid fa-pizza-slice"></i>

                        </div>

                    </div>



                    <div className="tracking-line">


                        {/* STEP 1 */}

                        <div className="tracking-step completed">

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



                        <div className="connector active"></div>



                        {/* STEP 2 */}

                        <div className="tracking-step current">

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



                        <div className="connector"></div>



                        {/* STEP 3 */}

                        <div className="tracking-step">

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
                {/* ORDER DETAILS */}
                {/* ================================================= */}

                <div className="track-grid">


                    {/* ORDER */}

                    <section className="details-card">

                        <div className="details-title">

                            <i className="fa-solid fa-bag-shopping"></i>

                            <h2>
                                Your Order
                            </h2>

                        </div>


                        <div className="pizza-item">

                            <div className="pizza-item-icon">

                                <i className="fa-solid fa-pizza-slice"></i>

                            </div>


                            <div className="pizza-item-info">

                                <h3>
                                    VG Pizza
                                </h3>

                                <p>
                                    Custom Pizza
                                </p>

                                <span>
                                    Quantity: 1
                                </span>

                            </div>


                            <strong>
                                ₹499.00
                            </strong>

                        </div>


                        <div className="price-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>
                                ₹499.00
                            </strong>

                        </div>


                        <div className="price-row">

                            <span>
                                Delivery Fee
                            </span>

                            <strong>
                                ₹40.00
                            </strong>

                        </div>


                        <div className="price-row">

                            <span>
                                GST
                            </span>

                            <strong>
                                ₹23.90
                            </strong>

                        </div>


                        <div className="total-row">

                            <span>
                                Total Paid
                            </span>

                            <strong>
                                ₹562.90
                            </strong>

                        </div>

                    </section>



                    {/* DELIVERY */}

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
                                    Your Name
                                </strong>

                            </div>


                            <div>

                                <span>
                                    <i className="fa-solid fa-phone"></i>
                                    Phone
                                </span>

                                <strong>
                                    Your Phone
                                </strong>

                            </div>


                            <div>

                                <span>
                                    <i className="fa-solid fa-location-dot"></i>
                                    Delivery Address
                                </span>

                                <strong>
                                    Your delivery address
                                </strong>

                            </div>

                        </div>

                    </section>


                </div>



                {/* ================================================= */}
                {/* BUTTONS */}
                {/* ================================================= */}

                <div className="track-actions">

                    <button
                        className="back-btn"
                        onClick={() => navigate("/dashboard")}
                    >

                        <i className="fa-solid fa-arrow-left"></i>

                        Back to Dashboard

                    </button>


                    <button
                        className="order-more-btn"
                        onClick={() => navigate("/pizzas")}
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