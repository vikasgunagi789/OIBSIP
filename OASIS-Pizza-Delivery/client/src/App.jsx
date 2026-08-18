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
                                  

            </Routes>

        </BrowserRouter>

    );

}


export default App;