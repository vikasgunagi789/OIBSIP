import { useLocation, useNavigate } from "react-router-dom";

import "./OrderSuccess.css";


function OrderSuccess() {

    const navigate =
        useNavigate();

    const location =
        useLocation();


    const savedOrder =
        localStorage.getItem(
            "latestOrder"
        );


    const order =
        location.state?.order ||
        (
            savedOrder
                ? JSON.parse(savedOrder)
                : null
        );


    if (!order) {

        return (

            <div className="success-page">

                <h1>
                    No Order Found
                </h1>

                <button
                    onClick={() =>
                        navigate("/menu")
                    }
                >
                    Browse Pizzas
                </button>

            </div>

        );

    }


    return (

        <div className="success-page">


            <div className="success-card">


                <div className="success-icon">

                    <i className="fa-solid fa-check"></i>

                </div>


                <p className="success-brand">
                    VG PIZZA
                </p>


                <h1>
                    Order Confirmed!
                </h1>


                <p className="success-message">

                    Your pizza order has been
                    successfully placed.

                </p>


                <div className="order-number">

                    <span>
                        Order ID
                    </span>

                    <strong>
                        #{order._id.slice(-8).toUpperCase()}
                    </strong>

                </div>


                <div className="success-status">

                    <i className="fa-solid fa-pizza-slice"></i>

                    <div>

                        <strong>
                            {order.status}
                        </strong>

                        <span>
                            We're preparing your order.
                        </span>

                    </div>

                </div>


                <div className="success-total">

                    <span>
                        Total Paid / Payable
                    </span>

                    <strong>
                        ₹{order.total.toFixed(2)}
                    </strong>

                </div>


                <div className="success-buttons">

                    <button
                        className="primary-success-button"
                        onClick={() =>
                            navigate("/orders")
                        }
                    >

                        <i className="fa-solid fa-location-dot"></i>

                        Track Order

                    </button>


                    <button
                        className="secondary-success-button"
                        onClick={() =>
                            navigate("/menu")
                        }
                    >

                        Order More

                    </button>

                </div>


            </div>


        </div>

    );

}


export default OrderSuccess;