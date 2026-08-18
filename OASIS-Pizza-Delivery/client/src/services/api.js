const API_URL =
    "http://localhost:5000/api";


/*
=========================================================
REGISTER
=========================================================
*/

export const registerUser =
    async (userData) => {

        const response =
            await fetch(
                `${API_URL}/auth/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            userData
                        )
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Registration failed."
            );

        }


        return data;

    };



/*
=========================================================
LOGIN
=========================================================
*/

export const loginUser =
    async (loginData) => {

        const response =
            await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            loginData
                        )
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Login failed."
            );

        }


        return data;

    };



/*
=========================================================
GET USER PROFILE
=========================================================
*/

export const getProfile =
    async () => {

        const token =
            localStorage.getItem(
                "token"
            );


        const response =
            await fetch(
                `${API_URL}/auth/profile`,
                {
                    method: "GET",

                    headers: {

                        "Content-Type":
                            "application/json",

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
                "Unable to fetch profile."
            );

        }


        return data;

    };

    /*
=========================================================
GET ALL PIZZAS
=========================================================
*/

export const getPizzas = async () => {

    const response =
        await fetch(
            `${API_URL}/pizzas`
        );


    const data =
        await response.json();


    if (!response.ok) {

        throw new Error(
            data.message ||
            "Unable to fetch pizzas."
        );

    }


    return data;

};