import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import "./AdminLogin.css";


function AdminLogin() {

    const navigate =
        useNavigate();


    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    const handleLogin =
        async (e) => {

            e.preventDefault();

            setError("");

            setLoading(true);


            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/admin/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                email,
                                password

                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Admin login failed."
                    );

                }


                localStorage.setItem(
                    "adminToken",
                    data.token
                );


                localStorage.setItem(
                    "admin",
                    JSON.stringify(
                        data.admin
                    )
                );


                navigate(
                    "/admin/dashboard"
                );

            }

            catch (error) {

                console.error(
                    "Admin login error:",
                    error
                );

                setError(
                    error.message
                );

            }

            finally {

                setLoading(false);

            }

        };


    return (

        <div className="admin-login-page">


            <div className="admin-login-card">


                {/* BRAND */}

                <div className="admin-brand">

                    <div className="admin-logo">
                        VG
                    </div>


                    <div className="admin-brand-text">

                        <span>
                            VG
                        </span>

                        <strong>
                            PIZZA
                        </strong>

                    </div>

                </div>


                <div className="admin-heading">

                    <span className="admin-label">

                        <i className="fa-solid fa-shield-halved"></i>

                        ADMIN PORTAL

                    </span>


                    <h1>
                        Welcome Back
                    </h1>


                    <p>
                        Sign in to manage VG PIZZA.
                    </p>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="admin-error">

                        <i className="fa-solid fa-circle-exclamation"></i>

                        <span>
                            {error}
                        </span>

                    </div>

                )}


                {/* FORM */}

                <form
                    onSubmit={handleLogin}
                    className="admin-login-form"
                >


                    <div className="admin-input-group">

                        <label>
                            Email Address
                        </label>


                        <div className="admin-input-wrapper">

                            <i className="fa-solid fa-envelope"></i>


                            <input
                                type="email"
                                placeholder="admin@vgpizza.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                    </div>



                    <div className="admin-input-group">

                        <label>
                            Password
                        </label>


                        <div className="admin-input-wrapper">

                            <i className="fa-solid fa-lock"></i>


                            <input
                                type="password"
                                placeholder="Enter admin password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                    </div>



                    <button
                        type="submit"
                        className="admin-login-button"
                        disabled={loading}
                    >

                        {loading ? (

                            <>
                                <i className="fa-solid fa-spinner fa-spin"></i>

                                Signing In...
                            </>

                        ) : (

                            <>
                                <i className="fa-solid fa-right-to-bracket"></i>

                                Sign In to Admin Panel
                            </>

                        )}

                    </button>


                </form>


                {/* BACK TO USER LOGIN */}

                <button
                    className="back-user-login"
                    onClick={() =>
                        navigate("/admin/dashboard")
                    }
                >

                    <i className="fa-solid fa-arrow-left"></i>

                    Back to User Login

                </button>


                <div className="admin-security">

                    <i className="fa-solid fa-lock"></i>

                    Secure VG PIZZA Administration

                </div>


            </div>

        </div>

    );

}


export default AdminLogin;