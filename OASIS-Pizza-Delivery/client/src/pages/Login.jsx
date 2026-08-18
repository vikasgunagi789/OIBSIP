import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/api";


function Login() {

    const navigate = useNavigate();


    const [email, setEmail] =
        useState("");


    const [password, setPassword] =
        useState("");


    const [error, setError] =
        useState("");


    const [loading, setLoading] =
        useState(false);



    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if (!email || !password) {

            setError(
                "Please enter your email and password."
            );

            return;

        }


        try {

            setLoading(true);


            const data =
                await loginUser({

                    email,
                    password

                });


            /*
            ============================================
            SAVE JWT
            ============================================
            */

            localStorage.setItem(
                "token",
                data.token
            );


            /*
            ============================================
            SAVE USER
            ============================================
            */

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            /*
            ============================================
            GO TO DASHBOARD
            ============================================
            */

            navigate("/dashboard");


        } catch (error) {

            setError(
                error.message
            );

        } finally {

            setLoading(false);

        }

    };



    return (

        <div className="auth-page">

            <div className="auth-card">


                <div className="auth-header">

                    <div className="brand-icon vg-logo">
                        VG
                    </div>


                    <h1>
                        Welcome Back
                    </h1>


                    <p>
                        Sign in to your VG Pizza account
                    </p>

                </div>



                {error && (

                    <div className="message error">

                        <i className="fa-solid fa-circle-exclamation"></i>

                        {error}

                    </div>

                )}



                <form onSubmit={handleSubmit}>


                    <div className="input-group">

                        <label>
                            Email
                        </label>


                        <div className="input-wrapper">

                            <i className="fa-solid fa-envelope"></i>


                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>



                    <div className="input-group">

                        <label>
                            Password
                        </label>


                        <div className="input-wrapper">

                            <i className="fa-solid fa-lock"></i>


                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>



                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >

                        <i
                            className={
                                loading
                                    ? "fa-solid fa-spinner fa-spin"
                                    : "fa-solid fa-right-to-bracket"
                            }
                        ></i>


                        {loading
                            ? "Signing in..."
                            : "Login"
                        }

                    </button>


                </form>



                <div className="auth-footer">

                    <p>
                        Don't have an account?
                    </p>


                    <Link to="/register">
                        Create Account
                    </Link>

                </div>


            </div>

        </div>

    );

}


export default Login;