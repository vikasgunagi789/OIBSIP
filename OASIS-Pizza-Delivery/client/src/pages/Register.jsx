import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/api";


function Register() {

    const navigate = useNavigate();


    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: ""
        });


    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [loading, setLoading] =
        useState(false);



    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]:
                event.target.value

        });

    };



    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);


        try {

            await registerUser(formData);


            setSuccess(
                "Account created successfully."
            );


            setTimeout(() => {

                navigate("/login");

            }, 1000);


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
                        Create Your VG Account
                    </h1>
                        
                    <p>
                        Join VG Pizza and create your perfect pizza
                    </p>

                </div>



                {error && (

                    <div className="message error">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        {error}
                    </div>

                )}



                {success && (

                    <div className="message success">
                        <i className="fa-solid fa-circle-check"></i>
                        {success}
                    </div>

                )}



                <form
                    onSubmit={handleSubmit}
                >


                    <div className="input-group">

                        <label htmlFor="name">
                            Full Name
                        </label>

                        <div className="input-wrapper">

                            <i className="fa-regular fa-user"></i>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>



                    <div className="input-group">

                        <label htmlFor="email">
                            Email Address
                        </label>

                        <div className="input-wrapper">

                            <i className="fa-regular fa-envelope"></i>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>



                    <div className="input-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="input-wrapper">

                            <i className="fa-solid fa-lock"></i>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Minimum 8 characters"
                                value={formData.password}
                                onChange={handleChange}
                                minLength="8"
                                required
                            />

                        </div>

                    </div>



                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >

                        {loading ? (

                            <>
                                <i className="fa-solid fa-spinner fa-spin"></i>
                                Creating Account...
                            </>

                        ) : (

                            <>
                                <i className="fa-solid fa-user-plus"></i>
                                Create Account
                            </>

                        )}

                    </button>


                </form>



                <div className="auth-footer">

                    <p>
                        Already have an account?
                    </p>

                    <Link to="/login">
                        Sign in
                    </Link>

                </div>


            </div>

        </div>

    );

}


export default Register;