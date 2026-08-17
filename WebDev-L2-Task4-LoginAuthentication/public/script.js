/* =========================================================
   TASK 4 — AUTHENTICATION
   REGISTER PAGE
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const registerForm =
    document.getElementById("registerForm");

const usernameInput =
    document.getElementById("username");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const registerMessage =
    document.getElementById("registerMessage");

const registerBtn =
    document.getElementById("registerBtn");

const registerBtnText =
    document.getElementById("registerBtnText");

const registerLoader =
    document.getElementById("registerLoader");

const passwordToggle =
    document.getElementById("passwordToggle");

const lengthRule =
    document.getElementById("lengthRule");

const numberRule =
    document.getElementById("numberRule");


/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

if (passwordToggle) {

    passwordToggle.addEventListener(
        "click",
        () => {

            if (
                passwordInput.type === "password"
            ) {

                passwordInput.type =
                    "text";

                passwordToggle.textContent =
                    "🙈";

                passwordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                passwordInput.type =
                    "password";

                passwordToggle.textContent =
                    "👁";

                passwordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        }
    );

}


/* =========================================================
   PASSWORD REQUIREMENTS
========================================================= */

if (passwordInput) {

    passwordInput.addEventListener(
        "input",
        () => {

            const password =
                passwordInput.value;


            /* 8 characters */

            if (password.length >= 8) {

                lengthRule.classList.add(
                    "valid"
                );

                lengthRule.innerHTML =
                    "<b>✓</b> 8+ characters";

            } else {

                lengthRule.classList.remove(
                    "valid"
                );

                lengthRule.innerHTML =
                    "<b>○</b> 8+ characters";

            }


            /* Number */

            if (/\d/.test(password)) {

                numberRule.classList.add(
                    "valid"
                );

                numberRule.innerHTML =
                    "<b>✓</b> 1 number";

            } else {

                numberRule.classList.remove(
                    "valid"
                );

                numberRule.innerHTML =
                    "<b>○</b> 1 number";

            }

        }
    );

}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    message,
    type
) {

    registerMessage.textContent =
        message;

    registerMessage.className =
        `auth-message ${type}`;

}


function clearMessage() {

    registerMessage.textContent =
        "";

    registerMessage.className =
        "auth-message";

}


/* =========================================================
   REGISTER FORM
========================================================= */

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            clearMessage();


            const username =
                usernameInput.value.trim();

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            const confirmPassword =
                confirmPasswordInput.value;


            /* =========================================
               CLIENT-SIDE VALIDATION
            ========================================== */

            if (
                username.length < 3
            ) {

                showMessage(
                    "Username must contain at least 3 characters.",
                    "error"
                );

                usernameInput.focus();

                return;

            }


            if (
                password.length < 8
            ) {

                showMessage(
                    "Password must contain at least 8 characters.",
                    "error"
                );

                passwordInput.focus();

                return;

            }


            if (
                !/\d/.test(password)
            ) {

                showMessage(
                    "Password must contain at least one number.",
                    "error"
                );

                passwordInput.focus();

                return;

            }


            if (
                password !== confirmPassword
            ) {

                showMessage(
                    "Passwords do not match.",
                    "error"
                );

                confirmPasswordInput.focus();

                return;

            }


            /* =========================================
               LOADING STATE
            ========================================== */

            registerBtn.disabled =
                true;

            registerBtnText.classList.add(
                "hidden"
            );

            registerLoader.classList.remove(
                "hidden"
            );


            try {

                /* =====================================
                   SEND DATA TO EXPRESS SERVER
                ====================================== */

                const response =
                    await fetch(
                        "/api/register",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    username:
                                        username,

                                    email:
                                        email,

                                    password:
                                        password

                                })

                        }
                    );


                const data =
                    await response.json();


                /* =====================================
                   SERVER ERROR
                ====================================== */

                if (!response.ok) {

                    showMessage(
                        data.message ||
                        "Registration failed.",
                        "error"
                    );

                    return;

                }


                /* =====================================
                   SUCCESS
                ====================================== */

                showMessage(
                    "Account created successfully! Redirecting...",
                    "success"
                );


                registerForm.reset();


                lengthRule.classList.remove(
                    "valid"
                );

                numberRule.classList.remove(
                    "valid"
                );


                lengthRule.innerHTML =
                    "<b>○</b> 8+ characters";

                numberRule.innerHTML =
                    "<b>○</b> 1 number";


                /* Redirect to login */

                setTimeout(
                    () => {

                        window.location.href =
                            "/";

                    },
                    1500
                );


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                showMessage(
                    "Unable to connect to the server.",
                    "error"
                );


            } finally {

                registerBtn.disabled =
                    false;

                registerBtnText.classList.remove(
                    "hidden"
                );

                registerLoader.classList.add(
                    "hidden"
                );

            }

        }
    );

}

/* =========================================================
   LOGIN PAGE
========================================================= */

const loginForm =
    document.getElementById("loginForm");

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");

const loginMessage =
    document.getElementById("loginMessage");

const loginBtn =
    document.getElementById("loginBtn");

const loginBtnText =
    document.getElementById("loginBtnText");

const loginLoader =
    document.getElementById("loginLoader");

const loginPasswordToggle =
    document.getElementById(
        "loginPasswordToggle"
    );


/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

if (loginPasswordToggle) {

    loginPasswordToggle.addEventListener(
        "click",
        () => {

            if (
                loginPassword.type ===
                "password"
            ) {

                loginPassword.type =
                    "text";

                loginPasswordToggle.textContent =
                    "🙈";

                loginPasswordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                loginPassword.type =
                    "password";

                loginPasswordToggle.textContent =
                    "👁";

                loginPasswordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        }
    );

}


/* =========================================================
   LOGIN MESSAGE
========================================================= */

function showLoginMessage(
    message,
    type
) {

    loginMessage.textContent =
        message;

    loginMessage.className =
        `auth-message ${type}`;

}


/* =========================================================
   LOGIN FORM
========================================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            showLoginMessage(
                "",
                ""
            );


            const email =
                loginEmail.value
                    .trim()
                    .toLowerCase();

            const password =
                loginPassword.value;


            /* =========================================
               VALIDATION
            ========================================== */

            if (!email || !password) {

                showLoginMessage(
                    "Please enter your email and password.",
                    "error"
                );

                return;

            }


            /* =========================================
               LOADING
            ========================================== */

            loginBtn.disabled =
                true;

            loginBtnText.classList.add(
                "hidden"
            );

            loginLoader.classList.remove(
                "hidden"
            );


            try {

                /* =====================================
                   SEND LOGIN REQUEST
                ====================================== */

                const response =
                    await fetch(
                        "/api/login",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    email:
                                        email,

                                    password:
                                        password

                                })

                        }
                    );


                const data =
                    await response.json();


                /* =====================================
                   LOGIN FAILED
                ====================================== */

                if (!response.ok) {

                    showLoginMessage(
                        data.message ||
                        "Invalid email or password.",
                        "error"
                    );

                    return;

                }


                /* =====================================
                   LOGIN SUCCESS
                ====================================== */

                showLoginMessage(
                    "Login successful! Redirecting...",
                    "success"
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "/dashboard.html";

                    },
                    700
                );


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                showLoginMessage(
                    "Unable to connect to the server.",
                    "error"
                );


            } finally {

                loginBtn.disabled =
                    false;

                loginBtnText.classList.remove(
                    "hidden"
                );

                loginLoader.classList.add(
                    "hidden"
                );

            }

        }
    );

}

/* =========================================================
   DASHBOARD
========================================================= */

const userName =
    document.getElementById("userName");

const userEmail =
    document.getElementById("userEmail");

const welcomeName =
    document.getElementById("welcomeName");

const cardUsername =
    document.getElementById("cardUsername");

const accountUsername =
    document.getElementById("accountUsername");

const accountEmail =
    document.getElementById("accountEmail");

const userAvatar =
    document.getElementById("userAvatar");

const logoutBtn =
    document.getElementById("logoutBtn");


/* =========================================================
   LOAD CURRENT USER
========================================================= */

if (
    userName &&
    userEmail
) {

    loadCurrentUser();

}


async function loadCurrentUser() {

    try {

        const response =
            await fetch(
                "/api/me"
            );


        const data =
            await response.json();


        /* =============================================
           NOT AUTHENTICATED
        ============================================== */

        if (!response.ok) {

            window.location.href =
                "/";

            return;

        }


        const user =
            data.user;


        /* =============================================
           DISPLAY USER
        ============================================== */

        if (userName) {

            userName.textContent =
                user.username;

        }


        if (userEmail) {

            userEmail.textContent =
                user.email;

        }


        if (welcomeName) {

            welcomeName.textContent =
                user.username;

        }


        if (cardUsername) {

            cardUsername.textContent =
                user.username;

        }


        if (accountUsername) {

            accountUsername.textContent =
                user.username;

        }


        if (accountEmail) {

            accountEmail.textContent =
                user.email;

        }


        if (userAvatar) {

            userAvatar.textContent =
                user.username
                    .charAt(0)
                    .toUpperCase();

        }


    } catch (error) {

        console.error(
            "User loading error:",
            error
        );


        window.location.href =
            "/";

    }

}


/* =========================================================
   LOGOUT
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async () => {

            logoutBtn.disabled =
                true;

            logoutBtn.textContent =
                "Logging out...";


            try {

                const response =
                    await fetch(
                        "/api/logout",
                        {

                            method: "POST"

                        }
                    );


                if (response.ok) {

                    window.location.href =
                        "/";

                } else {

                    logoutBtn.disabled =
                        false;

                    logoutBtn.textContent =
                        "Logout";

                    alert(
                        "Logout failed. Please try again."
                    );

                }


            } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );


                logoutBtn.disabled =
                    false;

                logoutBtn.textContent =
                    "Logout";

            }

        }
    );

}