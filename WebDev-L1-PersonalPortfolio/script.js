/* =========================================
   PORTFOLIO JAVASCRIPT
   Vikas Gunagi
========================================= */


/* =========================================
   TYPING EFFECT
========================================= */

const typingElement =
    document.querySelector(".typing-text");


const roles = [
    "Web Developer",
    "Coder",
    "Content Creator",
    "Problem Solver"
];


let roleIndex = 0;
let characterIndex = 0;

let deleting = false;


function typeEffect() {

    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        typingElement.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) %
                roles.length;

        }

    }


    setTimeout(
        typeEffect,
        deleting ? 60 : 100
    );
}


typeEffect();



/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");


menuToggle.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle("open");

        menuToggle.textContent =
            navLinks.classList.contains("open")
                ? "✕"
                : "☰";

    }
);



/* Close mobile menu after clicking */

document
    .querySelectorAll(".nav-link")
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "open"
                    );

                    menuToggle.textContent =
                        "☰";

                }
            );

        }
    );



/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 200;


    sections.forEach(
        section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");


            if (
                scrollPosition >=
                    sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                navigationLinks.forEach(
                    link => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) ===
                            `#${sectionId}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }

        }
    );
}


window.addEventListener(
    "scroll",
    updateActiveNav
);



/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);



/* =========================================
   SKILL BAR ANIMATION
========================================= */

const skillBars =
    document.querySelectorAll(
        ".skill-progress"
    );


const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const width =
                            entry.target.dataset.width;

                        entry.target.style.width =
                            width;

                    }

                }
            );

        },
        {
            threshold: 0.5
        }
    );


skillBars.forEach(
    bar => {

        skillObserver.observe(
            bar
        );

    }
);



/* =========================================
   NUMBER COUNTERS
========================================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );


let countersStarted = false;


function startCounters() {

    if (countersStarted) {
        return;
    }


    countersStarted = true;


    counters.forEach(
        counter => {

            const target =
                Number(
                    counter.dataset.target
                );


            let current = 0;

            const increment =
                Math.max(
                    1,
                    Math.ceil(
                        target / 40
                    )
                );


            function updateCounter() {

                current += increment;


                if (current >= target) {

                    counter.textContent =
                        target;

                    return;

                }


                counter.textContent =
                    current;


                setTimeout(
                    updateCounter,
                    35
                );

            }


            updateCounter();

        }
    );
}


const statsSection =
    document.querySelector(".stats");


const statsObserver =
    new IntersectionObserver(
        entries => {

            if (
                entries[0].isIntersecting
            ) {

                startCounters();

            }

        },
        {
            threshold: 0.5
        }
    );


statsObserver.observe(
    statsSection
);



/* =========================================
   CURSOR GLOW
========================================= */

const cursorGlow =
    document.querySelector(
        ".cursor-glow"
    );


document.addEventListener(
    "mousemove",
    event => {

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    }
);



/* =========================================
   BACK TO TOP
========================================= */

const backTop =
    document.querySelector(
        "#backTop"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }
);


backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);



/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.querySelector(
        "#contactForm"
    );


const toast =
    document.querySelector(
        "#toast"
    );


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.querySelector(
                "#name"
            ).value.trim();


        if (!name) {

            showToast(
                "Please enter your name."
            );

            return;

        }


        showToast(
            `Thanks ${name}! 🚀 Message received.`
        );


        contactForm.reset();

    }
);



/* =========================================
   TOAST FUNCTION
========================================= */

function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );
}