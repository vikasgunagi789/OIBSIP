import { useNavigate } from "react-router-dom";


function Dashboard() {

    const navigate = useNavigate();


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };


    return (

        <div className="dashboard-page">


            {/* =====================================================
                NAVBAR
            ===================================================== */}

            <nav className="dashboard-nav">


                <div className="brand">

                    <div className="brand-logo">
                        VG
                    </div>

                    <div className="brand-name">

                        <span>
                            VG
                        </span>

                        <strong>
                            PIZZA
                        </strong>

                    </div>

                </div>


                <button
                    className="logout-button"
                    onClick={logout}
                >

                    <i className="fa-solid fa-right-from-bracket"></i>

                    <span>
                        Logout
                    </span>

                </button>


            </nav>



            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}

            <main className="dashboard-content">


                {/* =================================================
                    WELCOME SECTION
                ================================================= */}

                <section className="welcome-card">


                    <div className="welcome-content">


                        <p className="eyebrow">
                            VG PIZZA • USER DASHBOARD
                        </p>


                        <h1>
                            Welcome, {user?.name || "Pizza Lover"}
                        </h1>


                        <p className="welcome-description">
                            Your next perfect pizza is just a few
                            clicks away.
                        </p>


                    </div>


                    <div className="welcome-icon">

                        <i className="fa-solid fa-pizza-slice"></i>

                    </div>


                </section>



                {/* =================================================
                    DASHBOARD CARDS
                ================================================= */}

                <section className="dashboard-grid">


                    {/* =============================================
                        MENU
                    ============================================= */}

                    <article className="dashboard-card">


                        <div className="card-icon">

                            <i className="fa-solid fa-pizza-slice"></i>

                        </div>


                        <h2>
                            VG Pizza Menu
                        </h2>


                        <p>
                            Explore our delicious pizza varieties
                            and discover your next favourite.
                        </p>


                        <button
                            onClick={() => navigate("/menu")}
                        >

                            View pizzas

                            <i className="fa-solid fa-arrow-right"></i>

                        </button>


                    </article>



                    {/* =============================================
                        CUSTOM PIZZA
                    ============================================= */}

                    <article className="dashboard-card">


                        <div className="card-icon">

                            <i className="fa-solid fa-wand-magic-sparkles"></i>

                        </div>


                        <h2>
                            Build Your VG Pizza
                        </h2>


                        <p>
                            Create your own pizza by choosing
                            your base, sauce, cheese and toppings.
                        </p>


                        <button
                            onClick={() => navigate("/build-pizza")}
                        >

                            Start Building

                            <i className="fa-solid fa-arrow-right"></i>

                        </button>


                    </article>



                    {/* =============================================
                        ORDERS
                    ============================================= */}

                    <article className="dashboard-card">


                        <div className="card-icon">

                            <i className="fa-solid fa-bag-shopping"></i>

                        </div>


                        <h2>
                            My VG Orders
                        </h2>


                        <p>
                            Track your current orders and view
                            your previous VG Pizza orders.
                        </p>


                        <button
                            onClick={() => navigate("/orders")}
                        >

                            View Orders

                            <i className="fa-solid fa-arrow-right"></i>

                        </button>


                    </article>


                </section>



                {/* =================================================
                    QUICK INFO
                ================================================= */}

                <section className="dashboard-info">


                    <div className="info-item">

                        <div className="info-icon">

                            <i className="fa-solid fa-bolt"></i>

                        </div>


                        <div>

                            <h3>
                                Freshly Made
                            </h3>

                            <p>
                                Your pizza is prepared fresh after
                                every order.
                            </p>

                        </div>

                    </div>



                    <div className="info-item">

                        <div className="info-icon">

                            <i className="fa-solid fa-truck-fast"></i>

                        </div>


                        <div>

                            <h3>
                                Fast Delivery
                            </h3>

                            <p>
                                Track your order from kitchen to
                                your doorstep.
                            </p>

                        </div>

                    </div>



                    <div className="info-item">

                        <div className="info-icon">

                            <i className="fa-solid fa-shield-halved"></i>

                        </div>


                        <div>

                            <h3>
                                Secure Orders
                            </h3>

                            <p>
                                Your account and orders are securely
                                managed.
                            </p>

                        </div>

                    </div>


                </section>


            </main>



            {/* =====================================================
                FOOTER
            ===================================================== */}

            <footer className="dashboard-footer">

                <div className="footer-brand">

                    <div className="footer-logo">
                        VG
                    </div>

                    <div>

                        <strong>
                            VG PIZZA
                        </strong>

                        <span>
                            Crafted with passion.
                        </span>

                    </div>

                </div>


                <p>
                    © {new Date().getFullYear()} VG Pizza.
                    All rights reserved.
                </p>


            </footer>


        </div>

    );

}


export default Dashboard;