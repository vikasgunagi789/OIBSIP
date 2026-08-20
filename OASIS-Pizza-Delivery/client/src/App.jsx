import "./App.css";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";


import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import TrackOrder from "./pages/TrackOrder";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminInventory from "./pages/AdminInventory";
import AdminOrders from "./pages/AdminOrders";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* ==========================================
                    DEFAULT ROUTE
                ========================================== */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />


                {/* ==========================================
                    PUBLIC ROUTES
                ========================================== */}

                <Route
                    path="/register"
                    element={
                        <Register />
                    }
                />


                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />


                {/* ==========================================
                    PROTECTED DASHBOARD
                ========================================== */}

                <Route
                    path="/dashboard"
                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }
                />


                {/* ==========================================
                    UNKNOWN ROUTES
                ========================================== */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

                <Route
                    path="/menu"
                    element={<Menu />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/order-success"
                    element={<OrderSuccess />}
                />

                <Route
                    path="/track-order/:id"
                    element={<TrackOrder />}
                />

                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />

                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/inventory"
                    element={<AdminInventory />}
                />

                <Route
                    path="/admin/orders"
                    element={<AdminOrders />}
                />
                                  

            </Routes>

        </BrowserRouter>

    );

}


export default App;