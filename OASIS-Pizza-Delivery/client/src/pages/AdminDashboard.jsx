import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";


function AdminDashboard() {

    const navigate = useNavigate();

    const admin =
        JSON.parse(
            localStorage.getItem("admin")
        );


    const logout = () => {

        localStorage.removeItem("adminToken");

        localStorage.removeItem("admin");

        navigate("/admin/login");

    };


    return (

        <div className="admin-dashboard">

            <header className="admin-dashboard-header">

                <div className="admin-dashboard-brand">

                    <div className="admin-dashboard-logo">
                        VG
                    </div>

                    <div>
                        <span>VG</span>
                        <strong>PIZZA</strong>
                    </div>

                </div>


                <button
                    onClick={logout}
                    className="admin-logout"
                >

                    <i className="fa-solid fa-right-from-bracket"></i>

                    Logout

                </button>

            </header>


            <main className="admin-dashboard-content">

                <p className="admin-eyebrow">
                    VG PIZZA • ADMIN PANEL
                </p>

                <h1>
                    Welcome, {admin?.name || "Admin"}
                </h1>

                <p className="admin-description">
                    Manage your VG PIZZA operations from here.
                </p>


                <div className="admin-dashboard-grid">

                    <div
                        className="admin-dashboard-card"
                        onClick={() =>
                            navigate("/admin/inventory")
                        }
                        style={{
                            cursor: "pointer"
                        }}
                    >

                        <i className="fa-solid fa-boxes-stacked"></i>

                        <h2>
                            Inventory
                        </h2>

                        <p>
                            Manage pizza ingredients and stock.
                        </p>

                    </div>


                    <div className="admin-dashboard-card"
                        onClick={() =>
                        navigate("/admin/orders")
                        }
                    >

                        <i className="fa-solid fa-receipt"></i>

                        <h2>
                            Orders
                        </h2>

                        <p>
                            View and manage customer orders.
                        </p>

                    </div>


                    <div className="admin-dashboard-card">

                        <i className="fa-solid fa-pizza-slice"></i>

                        <h2>
                            Pizzas
                        </h2>

                        <p>
                            Manage available pizza varieties.
                        </p>

                    </div>


                    <div className="admin-dashboard-card">

                        <i className="fa-solid fa-chart-line"></i>

                        <h2>
                            Overview
                        </h2>

                        <p>
                            View your VG PIZZA statistics.
                        </p>

                    </div>

                </div>

            </main>

        </div>

    );

}


export default AdminDashboard;