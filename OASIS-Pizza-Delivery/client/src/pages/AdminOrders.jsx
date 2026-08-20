import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import "./AdminOrders.css";


const API_URL =
    "http://localhost:5000";


const statuses = [

    "Order Received",

    "In Kitchen",

    "Sent to Delivery",

    "Delivered",

    "Cancelled"

];


function AdminOrders() {

    const navigate =
        useNavigate();


    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [updatingId, setUpdatingId] =
        useState(null);


    const token =
        localStorage.getItem(
            "adminToken"
        );


    // =====================================================
    // FETCH ORDERS
    // =====================================================

    const fetchOrders =
        async () => {

            try {

                setLoading(true);

                setError("");


                const response =
                    await fetch(
                        `${API_URL}/api/admin/orders`,
                        {

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
                        "Failed to fetch orders."
                    );

                }


                setOrders(
                    data.orders || []
                );

            }

            catch (error) {

                console.error(error);

                setError(
                    error.message
                );

            }

            finally {

                setLoading(false);

            }

        };


    useEffect(() => {

        if (!token) {

            navigate(
                "/admin/login"
            );

            return;

        }


        fetchOrders();

    }, []);


    // =====================================================
    // UPDATE STATUS
    // =====================================================

    const updateStatus =
        async (
            orderId,
            status
        ) => {

            try {

                setUpdatingId(
                    orderId
                );


                const response =
                    await fetch(

                        `${API_URL}/api/admin/orders/${orderId}/status`,

                        {

                            method: "PUT",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${token}`

                            },

                            body:
                                JSON.stringify({

                                    status

                                })

                        }

                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to update order."
                    );

                }


                setOrders(
                    previous =>
                        previous.map(
                            order =>
                                order._id ===
                                orderId

                                    ? {
                                        ...order,
                                        status:
                                            data.order.status
                                    }

                                    : order
                        )
                );

            }

            catch (error) {

                console.error(error);

                setError(
                    error.message
                );

            }

            finally {

                setUpdatingId(
                    null
                );

            }

        };


    // =====================================================
    // STATUS CLASS
    // =====================================================

    const getStatusClass =
        (status) => {

            switch (status) {

                case "Delivered":

                    return "status-delivered";


                case "Cancelled":

                    return "status-cancelled";


                case "In Kitchen":

                    return "status-kitchen";


                case "Sent to Delivery":

                    return "status-delivery";


                default:

                    return "status-received";

            }

        };


    // =====================================================
    // DATE
    // =====================================================

    const formatDate =
        (date) => {

            if (!date) {

                return "—";

            }


            return new Date(
                date
            ).toLocaleString(
                "en-IN",
                {

                    day: "2-digit",

                    month: "short",

                    year: "numeric",

                    hour: "2-digit",

                    minute: "2-digit"

                }
            );

        };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="admin-orders-loading">

                <i className="fa-solid fa-spinner fa-spin"></i>

                <p>
                    Loading VG PIZZA orders...
                </p>

            </div>

        );

    }


    return (

        <div className="admin-orders-page">


            {/* HEADER */}

            <header className="admin-orders-header">


                <div
                    className="admin-orders-brand"
                    onClick={() =>
                        navigate(
                            "/admin/dashboard"
                        )
                    }
                >

                    <div className="admin-orders-logo">
                        VG
                    </div>


                    <div>

                        <span>
                            VG
                        </span>

                        <strong>
                            PIZZA
                        </strong>

                    </div>

                </div>


                <button
                    className="admin-orders-back"
                    onClick={() =>
                        navigate(
                            "/admin/dashboard"
                        )
                    }
                >

                    <i className="fa-solid fa-arrow-left"></i>

                    Dashboard

                </button>

            </header>



            {/* CONTENT */}

            <main className="admin-orders-content">


                <div className="admin-orders-title-row">

                    <div>

                        <p className="admin-orders-eyebrow">
                            VG PIZZA • ADMIN
                        </p>

                        <h1>
                            Orders
                        </h1>

                        <p>
                            Manage customer orders and delivery status.
                        </p>

                    </div>


                    <button
                        className="refresh-orders-button"
                        onClick={fetchOrders}
                    >

                        <i className="fa-solid fa-rotate"></i>

                        Refresh

                    </button>

                </div>



                {error && (

                    <div className="admin-orders-error">

                        <i className="fa-solid fa-circle-exclamation"></i>

                        {error}

                    </div>

                )}



                {/* EMPTY */}

                {orders.length === 0 ? (

                    <div className="admin-orders-empty">

                        <i className="fa-solid fa-receipt"></i>

                        <h2>
                            No Orders Yet
                        </h2>

                        <p>
                            Customer orders will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="admin-orders-list">

                        {orders.map(
                            order => (

                                <article
                                    className="admin-order-card"
                                    key={
                                        order._id
                                    }
                                >


                                    {/* ORDER HEADER */}

                                    <div className="admin-order-top">


                                        <div>

                                            <span className="admin-order-label">
                                                ORDER ID
                                            </span>

                                            <strong className="admin-order-id">

                                                #
                                                {order._id
                                                    .slice(-8)
                                                    .toUpperCase()}

                                            </strong>

                                        </div>


                                        <span
                                            className={
                                                `admin-order-status ${
                                                    getStatusClass(
                                                        order.status
                                                    )
                                                }`
                                            }
                                        >

                                            {order.status}

                                        </span>

                                    </div>



                                    {/* CUSTOMER */}

                                    <div className="admin-order-customer">

                                        <div>

                                            <span>
                                                Customer
                                            </span>

                                            <strong>
                                                {
                                                    order.customer?.name ||
                                                    order.user?.name ||
                                                    "Customer"
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Phone
                                            </span>

                                            <strong>
                                                {
                                                    order.customer?.phone ||
                                                    "—"
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Ordered
                                            </span>

                                            <strong>
                                                {
                                                    formatDate(
                                                        order.createdAt
                                                    )
                                                }
                                            </strong>

                                        </div>

                                    </div>



                                    {/* ITEMS */}

                                    <div className="admin-order-items">

                                        <h3>
                                            Items
                                        </h3>


                                        {order.items?.map(
                                            (item, index) => (

                                                <div
                                                    className="admin-order-item"
                                                    key={
                                                        item._id ||
                                                        index
                                                    }
                                                >

                                                    <div>

                                                        <strong>
                                                            {item.name}
                                                        </strong>

                                                        <span>
                                                            Qty: {
                                                                item.quantity
                                                            }
                                                        </span>

                                                    </div>


                                                    <strong>
                                                        ₹
                                                        {(
                                                            item.price *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </strong>

                                                </div>

                                            )
                                        )}

                                    </div>



                                    {/* DELIVERY */}

                                    <div className="admin-order-address">

                                        <i className="fa-solid fa-location-dot"></i>


                                        <div>

                                            <span>
                                                Delivery Address
                                            </span>

                                            <strong>

                                                {
                                                    order.deliveryAddress?.address
                                                }

                                                {order.deliveryAddress?.city
                                                    ? `, ${order.deliveryAddress.city}`
                                                    : ""}

                                                {order.deliveryAddress?.pincode
                                                    ? ` - ${order.deliveryAddress.pincode}`
                                                    : ""}

                                            </strong>

                                        </div>

                                    </div>



                                    {/* FOOTER */}

                                    <div className="admin-order-footer">


                                        <div className="admin-order-total">

                                            <span>
                                                Total
                                            </span>

                                            <strong>
                                                ₹
                                                {Number(
                                                    order.total || 0
                                                ).toFixed(2)}
                                            </strong>

                                        </div>


                                        <div className="admin-order-actions">

                                            <label>
                                                Update Status
                                            </label>


                                            <select
                                                value={
                                                    order.status
                                                }
                                                disabled={
                                                    updatingId ===
                                                    order._id
                                                }
                                                onChange={
                                                    (e) =>
                                                        updateStatus(
                                                            order._id,
                                                            e.target.value
                                                        )
                                                }
                                            >

                                                {statuses.map(
                                                    status => (

                                                        <option
                                                            key={
                                                                status
                                                            }
                                                            value={
                                                                status
                                                            }
                                                        >
                                                            {status}
                                                        </option>

                                                    )
                                                )}

                                            </select>

                                        </div>

                                    </div>

                                </article>

                            )
                        )}

                    </div>

                )}

            </main>

        </div>

    );

}


export default AdminOrders;