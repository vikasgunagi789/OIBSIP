/* =========================================
   ELEMENTS
========================================= */

const temperatureInput =
    document.getElementById("temperature");

const unitSelect =
    document.getElementById("unit");

const convertBtn =
    document.getElementById("convertBtn");

const resetBtn =
    document.getElementById("resetBtn");

const error =
    document.getElementById("error");

const celsiusResult =
    document.getElementById("celsiusResult");

const fahrenheitResult =
    document.getElementById("fahrenheitResult");

const kelvinResult =
    document.getElementById("kelvinResult");

const temperatureMessage =
    document.getElementById("temperatureMessage");

const temperatureIcon =
    document.getElementById("temperatureIcon");

const visualTitle =
    document.getElementById("visualTitle");


/* =========================================
   CONVERT BUTTON
========================================= */

convertBtn.addEventListener(
    "click",
    convertTemperature
);


/* =========================================
   RESET BUTTON
========================================= */

resetBtn.addEventListener(
    "click",
    resetConverter
);


/* =========================================
   ENTER KEY
========================================= */

temperatureInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            convertTemperature();

        }

    }
);


/* =========================================
   CONVERT TEMPERATURE
========================================= */

function convertTemperature() {

    const input =
        temperatureInput.value.trim();

    const unit =
        unitSelect.value;


    /* -------------------------
       EMPTY INPUT
    ------------------------- */

    if (input === "") {

        showError(
            "Please enter a temperature."
        );

        return;

    }


    /* -------------------------
       NUMBER CHECK
    ------------------------- */

    const temperature =
        Number(input);


    if (Number.isNaN(temperature)) {

        showError(
            "Please enter a valid number."
        );

        return;

    }


    /* -------------------------
       ABSOLUTE ZERO
    ------------------------- */

    if (
        unit === "celsius" &&
        temperature < -273.15
    ) {

        showError(
            "Celsius cannot be below -273.15°C."
        );

        return;

    }


    if (
        unit === "fahrenheit" &&
        temperature < -459.67
    ) {

        showError(
            "Fahrenheit cannot be below -459.67°F."
        );

        return;

    }


    if (
        unit === "kelvin" &&
        temperature < 0
    ) {

        showError(
            "Kelvin cannot be below 0 K."
        );

        return;

    }


    /* -------------------------
       CLEAR ERROR
    ------------------------- */

    error.textContent = "";


    /* -------------------------
       CONVERT TO CELSIUS
    ------------------------- */

    let celsius;


    if (unit === "celsius") {

        celsius =
            temperature;

    }

    else if (unit === "fahrenheit") {

        celsius =
            (temperature - 32)
            * 5 / 9;

    }

    else {

        celsius =
            temperature - 273.15;

    }


    /* -------------------------
       CONVERT OTHER UNITS
    ------------------------- */

    const fahrenheit =
        (celsius * 9 / 5) + 32;


    const kelvin =
        celsius + 273.15;


    /* -------------------------
       DISPLAY RESULTS
    ------------------------- */

    celsiusResult.textContent =
        `${formatNumber(celsius)} °C`;

    fahrenheitResult.textContent =
        `${formatNumber(fahrenheit)} °F`;

    kelvinResult.textContent =
        `${formatNumber(kelvin)} K`;


    /* -------------------------
       UPDATE VISUAL
    ------------------------- */

    updateTemperatureVisual(
        celsius
    );

}


/* =========================================
   FORMAT NUMBER
========================================= */

function formatNumber(number) {

    return Number(
        number.toFixed(2)
    );

}


/* =========================================
   SHOW ERROR
========================================= */

function showError(message) {

    error.textContent =
        message;


    celsiusResult.textContent =
        "--";

    fahrenheitResult.textContent =
        "--";

    kelvinResult.textContent =
        "--";


    temperatureIcon.textContent =
        "⚠️";

    visualTitle.textContent =
        "Invalid temperature";

    temperatureMessage.textContent =
        "Please check your input and try again.";

}


/* =========================================
   TEMPERATURE VISUAL
========================================= */

function updateTemperatureVisual(
    celsius
) {


    /* FREEZING */

    if (celsius <= 0) {

        temperatureIcon.textContent =
            "🥶";

        visualTitle.textContent =
            "Freezing cold";

        temperatureMessage.textContent =
            "That's seriously cold! Bundle up.";

    }


    /* COLD */

    else if (celsius < 15) {

        temperatureIcon.textContent =
            "🧥";

        visualTitle.textContent =
            "Chilly";

        temperatureMessage.textContent =
            "A jacket might be a good idea.";

    }


    /* COMFORTABLE */

    else if (celsius < 30) {

        temperatureIcon.textContent =
            "🌤️";

        visualTitle.textContent =
            "Comfortable";

        temperatureMessage.textContent =
            "That's a pleasant temperature.";

    }


    /* WARM */

    else if (celsius < 40) {

        temperatureIcon.textContent =
            "☀️";

        visualTitle.textContent =
            "Warm";

        temperatureMessage.textContent =
            "It's getting pretty warm.";

    }


    /* HOT */

    else {

        temperatureIcon.textContent =
            "🔥";

        visualTitle.textContent =
            "Very hot";

        temperatureMessage.textContent =
            "That's extremely hot! Stay hydrated.";

    }

}


/* =========================================
   RESET
========================================= */

function resetConverter() {

    temperatureInput.value =
        "";

    unitSelect.value =
        "celsius";


    error.textContent =
        "";


    celsiusResult.textContent =
        "--";

    fahrenheitResult.textContent =
        "--";

    kelvinResult.textContent =
        "--";


    temperatureIcon.textContent =
        "🌡️";

    visualTitle.textContent =
        "Ready to convert";

    temperatureMessage.textContent =
        "Enter a temperature to get started.";

}