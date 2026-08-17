/* =========================================================
   DR. A. P. J. ABDUL KALAM — TRIBUTE PAGE
   OIBSIP | Web Development Level 2 | Task 2
========================================================= */


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeBtn = document.getElementById("themeBtn");


// Check previously saved theme
const savedTheme = localStorage.getItem("kalam-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀";

}


// Theme button
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    const isDark =
        document.body.classList.contains("dark");


    if (isDark) {

        themeBtn.textContent = "☀";

        localStorage.setItem(
            "kalam-theme",
            "dark"
        );

    } else {

        themeBtn.textContent = "☾";

        localStorage.setItem(
            "kalam-theme",
            "light"
        );

    }

});


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

// Elements that should animate
const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-grid, " +
    ".fact, " +
    ".timeline-item, " +
    ".achievement-card, " +
    ".quote-section, " +
    ".legacy-content, " +
    ".final-message"
);


// Add reveal class
revealElements.forEach((element) => {

    element.classList.add("reveal");

});


// Observer
const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


// Start observing
revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   NAVIGATION
========================================================= */

const navLinks =
    document.querySelectorAll(
        ".navbar nav a"
    );


navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");


        const target =
            document.querySelector(targetId);


        if (target) {

            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const activeSectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const currentId =
                        entry.target.getAttribute(
                            "id"
                        );


                    navLinks.forEach((link) => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) === `#${currentId}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                }

            });

        },
        {
            threshold: 0.45
        }
    );


sections.forEach((section) => {

    activeSectionObserver.observe(section);

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElements =
    document.querySelectorAll(
        ".footer-bottom p"
    );


if (yearElements.length > 1) {

    yearElements[1].textContent =
        `© ${new Date().getFullYear()} Tribute Page`;

}


/* =========================================================
   PAGE LOADED
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);