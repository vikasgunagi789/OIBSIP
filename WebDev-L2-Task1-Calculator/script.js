/* =========================================================
   CALCURA SCIENTIFIC CALCULATOR
   OIBSIP - Web Development Level 2 - Task 1
========================================================= */


/* =========================================================
   DISPLAY ELEMENTS
========================================================= */

const historyDisplay =
    document.getElementById("historyDisplay");

const expressionDisplay =
    document.getElementById("expressionDisplay");

const resultDisplay =
    document.getElementById("resultDisplay");


/* =========================================================
   CONTROL ELEMENTS
========================================================= */

const angleModeButton =
    document.getElementById("angleMode");

const themeToggle =
    document.getElementById("themeToggle");


/* =========================================================
   CALCULATOR STATE
========================================================= */

let expression = "";

let lastResult = 0;

let angleMode = "DEG";

let justCalculated = false;


/* =========================================================
   BASIC HELPERS
========================================================= */

function isOperator(value) {

    return [
        "+",
        "−",
        "×",
        "÷"
    ].includes(value);

}


function isDigit(value) {

    return (
        value >= "0" &&
        value <= "9"
    );

}


function normalizeExpression(value) {

    return value
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/π/g, "pi");

}


/* =========================================================
   FORMAT NUMBER
========================================================= */

function formatNumber(number) {

    if (!Number.isFinite(number)) {
        return "Error";
    }


    if (Math.abs(number) < 1e-12) {
        number = 0;
    }


    return Number(
        number.toPrecision(12)
    ).toString();

}


/* =========================================================
   UPDATE DISPLAY
========================================================= */

function updateDisplay() {

    expressionDisplay.textContent =
        expression || "0";


    if (expression === "") {

        resultDisplay.textContent =
            "0";

        return;

    }


    try {

        const result =
            evaluateExpression(expression);


        if (Number.isFinite(result)) {

            resultDisplay.textContent =
                formatNumber(result);

        }

    }

    catch {

        // Don't show an error while
        // the user is still typing.

    }

}


/* =========================================================
   SHOW ERROR
========================================================= */

function showError(message = "Invalid expression") {

    resultDisplay.textContent =
        "Error";

    historyDisplay.textContent =
        message;

}


/* =========================================================
   ANGLE CONVERSION
========================================================= */

function toRadians(value) {

    if (angleMode === "DEG") {

        return value * Math.PI / 180;

    }

    return value;

}


function fromRadians(value) {

    if (angleMode === "DEG") {

        return value * 180 / Math.PI;

    }

    return value;

}


/* =========================================================
   FACTORIAL
========================================================= */

function factorial(number) {

    if (
        number < 0 ||
        !Number.isInteger(number)
    ) {

        throw new Error(
            "Factorial requires a positive integer"
        );

    }


    if (number > 170) {

        throw new Error(
            "Number too large"
        );

    }


    let result = 1;


    for (
        let i = 2;
        i <= number;
        i++
    ) {

        result *= i;

    }


    return result;

}


/* =========================================================
   TOKENIZER
========================================================= */

function tokenize(input) {

    const tokens = [];

    let i = 0;


    while (i < input.length) {

        const char =
            input[i];


        /* -------------------------
           NUMBER
        -------------------------- */

        if (
            isDigit(char) ||
            char === "."
        ) {

            let number = "";

            while (
                i < input.length &&
                (
                    isDigit(input[i]) ||
                    input[i] === "."
                )
            ) {

                number += input[i];

                i++;

            }


            const parsed =
                Number(number);


            if (Number.isNaN(parsed)) {

                throw new Error(
                    "Invalid number"
                );

            }


            tokens.push(parsed);

            continue;

        }


        /* -------------------------
           PI
        -------------------------- */

        if (
            input
                .slice(i, i + 2)
                .toLowerCase() === "pi"
        ) {

            tokens.push(Math.PI);

            i += 2;

            continue;

        }


        /* -------------------------
           E
        -------------------------- */

        if (
            char === "e" &&
            (
                i === 0 ||
                !isDigit(input[i - 1])
            )
        ) {

            tokens.push(Math.E);

            i++;

            continue;

        }


        /* -------------------------
           OPERATORS
        -------------------------- */

        if (
            char === "+" ||
            char === "-" ||
            char === "*" ||
            char === "/" ||
            char === "%"
        ) {

            tokens.push(char);

            i++;

            continue;

        }


        /* -------------------------
           PARENTHESES
        -------------------------- */

        if (
            char === "(" ||
            char === ")"
        ) {

            tokens.push(char);

            i++;

            continue;

        }


        throw new Error(
            "Invalid character"
        );

    }


    return tokens;

}


/* =========================================================
   OPERATOR PRECEDENCE
========================================================= */

function precedence(operator) {

    if (
        operator === "+" ||
        operator === "-"
    ) {

        return 1;

    }


    if (
        operator === "*" ||
        operator === "/" ||
        operator === "%"
    ) {

        return 2;

    }


    return 0;

}


/* =========================================================
   APPLY BINARY OPERATOR
========================================================= */

function applyOperator(
    numbers,
    operator
) {

    if (numbers.length < 2) {

        throw new Error(
            "Invalid expression"
        );

    }


    const second =
        numbers.pop();

    const first =
        numbers.pop();


    let result;


    switch (operator) {

        case "+":

            result =
                first + second;

            break;


        case "-":

            result =
                first - second;

            break;


        case "*":

            result =
                first * second;

            break;


        case "/":

            if (second === 0) {

                throw new Error(
                    "Cannot divide by zero"
                );

            }

            result =
                first / second;

            break;


        case "%":

            result =
                first % second;

            break;


        default:

            throw new Error(
                "Unknown operator"
            );

    }


    numbers.push(result);

}


/* =========================================================
   EXPRESSION EVALUATOR
   Shunting-yard style evaluation
========================================================= */

function evaluateExpression(input) {

    const tokens =
        tokenize(
            normalizeExpression(input)
        );


    if (tokens.length === 0) {

        return 0;

    }


    const numbers = [];

    const operators = [];


    let expectingValue = true;


    for (
        let i = 0;
        i < tokens.length;
        i++
    ) {

        const token =
            tokens[i];


        /* -------------------------
           NUMBER
        -------------------------- */

        if (
            typeof token === "number"
        ) {

            numbers.push(token);

            expectingValue = false;

            continue;

        }


        /* -------------------------
           OPEN PARENTHESIS
        -------------------------- */

        if (token === "(") {

            operators.push(token);

            expectingValue = true;

            continue;

        }


        /* -------------------------
           CLOSE PARENTHESIS
        -------------------------- */

        if (token === ")") {

            while (
                operators.length &&
                operators[
                    operators.length - 1
                ] !== "("
            ) {

                applyOperator(
                    numbers,
                    operators.pop()
                );

            }


            if (
                operators.length === 0
            ) {

                throw new Error(
                    "Mismatched parentheses"
                );

            }


            operators.pop();

            expectingValue = false;

            continue;

        }


        /* -------------------------
           OPERATOR
        -------------------------- */

        if (
            typeof token === "string"
        ) {

            // Unary minus
            if (
                token === "-" &&
                expectingValue
            ) {

                numbers.push(0);

            }


            // Other operators cannot
            // appear where a value is needed.
            else if (expectingValue) {

                throw new Error(
                    "Invalid operator placement"
                );

            }


            while (
                operators.length &&
                operators[
                    operators.length - 1
                ] !== "(" &&
                precedence(
                    operators[
                        operators.length - 1
                    ]
                ) >=
                precedence(token)
            ) {

                applyOperator(
                    numbers,
                    operators.pop()
                );

            }


            operators.push(token);

            expectingValue = true;

        }

    }


    if (expectingValue) {

        throw new Error(
            "Incomplete expression"
        );

    }


    while (operators.length) {

        const operator =
            operators.pop();


        if (
            operator === "(" ||
            operator === ")"
        ) {

            throw new Error(
                "Mismatched parentheses"
            );

        }


        applyOperator(
            numbers,
            operator
        );

    }


    if (numbers.length !== 1) {

        throw new Error(
            "Invalid expression"
        );

    }


    const result =
        numbers[0];


    if (!Number.isFinite(result)) {

        throw new Error(
            "Invalid result"
        );

    }


    return result;

}


/* =========================================================
   GET CURRENT VALUE
========================================================= */

function getCurrentValue() {

    try {

        return evaluateExpression(
            expression
        );

    }

    catch {

        return null;

    }

}


/* =========================================================
   ADD NUMBER
========================================================= */

function addNumber(number) {

    if (justCalculated) {

        expression = "";

        historyDisplay.textContent =
            "";

        justCalculated = false;

    }


    expression += number;

    updateDisplay();

}


/* =========================================================
   ADD DECIMAL
========================================================= */

function addDecimal() {

    if (justCalculated) {

        expression = "";

        historyDisplay.textContent =
            "";

        justCalculated = false;

    }


    // Find the current number after
    // the last operator or parenthesis.

    const parts =
        expression.split(
            /[+\-×÷*/%()]/
        );


    const currentNumber =
        parts[parts.length - 1];


    if (
        currentNumber.includes(".")
    ) {

        return;

    }


    if (
        expression === "" ||
        isOperator(
            expression[expression.length - 1]
        ) ||
        expression.endsWith("(")
    ) {

        expression += "0.";

    }

    else {

        expression += ".";

    }


    updateDisplay();

}


/* =========================================================
   ADD OPERATOR
========================================================= */

function addOperator(operator) {

    if (expression === "") {

        if (operator === "−") {

            expression = "−";

            updateDisplay();

        }

        return;

    }


    justCalculated = false;


    const lastChar =
        expression[
            expression.length - 1
        ];


    if (
        isOperator(lastChar)
    ) {

        expression =
            expression.slice(
                0,
                -1
            ) + operator;

    }

    else {

        expression += operator;

    }


    updateDisplay();

}


/* =========================================================
   ADD PARENTHESES
========================================================= */

function addOpenBracket() {

    if (justCalculated) {

        expression = "";

        justCalculated = false;

    }


    if (
        expression !== "" &&
        (
            isDigit(
                expression[
                    expression.length - 1
                ]
            ) ||
            expression.endsWith(")")
        )
    ) {

        expression += "×";

    }


    expression += "(";

    updateDisplay();

}


function addCloseBracket() {

    if (expression === "") {
        return;
    }


    const openCount =
        (
            expression.match(
                /\(/g
            ) || []
        ).length;


    const closeCount =
        (
            expression.match(
                /\)/g
            ) || []
        ).length;


    if (
        openCount <= closeCount
    ) {

        return;

    }


    const lastChar =
        expression[
            expression.length - 1
        ];


    if (
        isOperator(lastChar) ||
        lastChar === "("
    ) {

        return;

    }


    expression += ")";

    updateDisplay();

}


/* =========================================================
   ADD CONSTANT
========================================================= */

function addConstant(value) {

    if (justCalculated) {

        expression = "";

        justCalculated = false;

    }


    const lastChar =
        expression[
            expression.length - 1
        ];


    if (
        expression !== "" &&
        (
            isDigit(lastChar) ||
            lastChar === ")" ||
            lastChar === "."
        )
    ) {

        expression += "×";

    }


    expression += value;

    updateDisplay();

}


/* =========================================================
   SCIENTIFIC FUNCTION
========================================================= */

function applyScientificFunction(functionName) {

    const value =
        getCurrentValue();


    if (value === null) {

        showError();

        return;

    }


    let result;


    try {

        switch (functionName) {

            case "sin":

                result =
                    Math.sin(
                        toRadians(value)
                    );

                break;


            case "cos":

                result =
                    Math.cos(
                        toRadians(value)
                    );

                break;


            case "tan":

                result =
                    Math.tan(
                        toRadians(value)
                    );

                break;


            case "asin":

                if (
                    value < -1 ||
                    value > 1
                ) {

                    throw new Error(
                        "Invalid input"
                    );

                }

                result =
                    fromRadians(
                        Math.asin(value)
                    );

                break;


            case "acos":

                if (
                    value < -1 ||
                    value > 1
                ) {

                    throw new Error(
                        "Invalid input"
                    );

                }

                result =
                    fromRadians(
                        Math.acos(value)
                    );

                break;


            case "atan":

                result =
                    fromRadians(
                        Math.atan(value)
                    );

                break;


            case "log":

                if (value <= 0) {

                    throw new Error(
                        "Log requires a positive number"
                    );

                }

                result =
                    Math.log10(value);

                break;


            case "ln":

                if (value <= 0) {

                    throw new Error(
                        "ln requires a positive number"
                    );

                }

                result =
                    Math.log(value);

                break;


            case "sqrt":

                if (value < 0) {

                    throw new Error(
                        "Cannot square root a negative number"
                    );

                }

                result =
                    Math.sqrt(value);

                break;


            case "square":

                result =
                    value * value;

                break;


            case "factorial":

                result =
                    factorial(value);

                break;


            case "percent":

                result =
                    value / 100;

                break;


            default:

                return;

        }


        expression =
            formatNumber(result);

        lastResult =
            result;

        justCalculated =
            true;

        historyDisplay.textContent =
            `${functionName}(${formatNumber(value)})`;


        updateDisplay();

    }

    catch (error) {

        showError(
            error.message
        );

    }

}


/* =========================================================
   POWER
========================================================= */

function addPower() {

    if (expression === "") {

        return;

    }


    expression += "^";

    updateDisplay();

}


/* =========================================================
   POWER SUPPORT
========================================================= */

function evaluatePowerExpression(input) {

    if (!input.includes("^")) {

        return evaluateExpression(input);

    }


    const parts =
        input.split("^");


    if (parts.length !== 2) {

        throw new Error(
            "Invalid power expression"
        );

    }


    const base =
        evaluateExpression(
            parts[0]
        );


    const exponent =
        evaluateExpression(
            parts[1]
        );


    const result =
        Math.pow(
            base,
            exponent
        );


    if (!Number.isFinite(result)) {

        throw new Error(
            "Invalid power result"
        );

    }


    return result;

}


/* =========================================================
   SIGN CHANGE
========================================================= */

function changeSign() {

    const value =
        getCurrentValue();


    if (value === null) {

        return;

    }


    expression =
        formatNumber(
            -value
        );


    justCalculated =
        true;


    updateDisplay();

}


/* =========================================================
   DELETE LAST CHARACTER
========================================================= */

function deleteLast() {

    if (justCalculated) {

        expression = "";

        justCalculated = false;

        historyDisplay.textContent =
            "";

        updateDisplay();

        return;

    }


    expression =
        expression.slice(
            0,
            -1
        );


    updateDisplay();

}


/* =========================================================
   CLEAR
========================================================= */

function clearCalculator() {

    expression = "";

    lastResult = 0;

    justCalculated = false;

    historyDisplay.textContent =
        "";

    expressionDisplay.textContent =
        "0";

    resultDisplay.textContent =
        "0";

    document
        .querySelector(".calculator")
        .classList
        .remove("error");

}


/* =========================================================
   EQUALS
========================================================= */

function calculateResult() {

    if (expression === "") {

        return;

    }


    try {

        let result;


        // Handle power separately.
        if (expression.includes("^")) {

            result =
                evaluatePowerExpression(
                    expression
                );

        }

        else {

            result =
                evaluateExpression(
                    expression
                );

        }


        if (!Number.isFinite(result)) {

            throw new Error(
                "Invalid result"
            );

        }


        historyDisplay.textContent =
            expression + " =";


        result =
            Number(
                result.toPrecision(12)
            );


        expression =
            formatNumber(result);


        resultDisplay.textContent =
            formatNumber(result);


        lastResult =
            result;


        justCalculated =
            true;


        document
            .querySelector(".calculator")
            .classList
            .remove("error");

    }

    catch (error) {

        showError(
            error.message
        );

        document
            .querySelector(".calculator")
            .classList
            .add("error");

    }

}


/* =========================================================
   NUMBER BUTTON EVENTS
========================================================= */

const numberButtons =
    document.querySelectorAll(
        "[data-number]"
    );


numberButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const number =
                    button.dataset.number;


                if (number === ".") {

                    addDecimal();

                }

                else {

                    addNumber(number);

                }

            }
        );

    }
);


/* =========================================================
   OPERATOR BUTTON EVENTS
========================================================= */

const operatorButtons =
    document.querySelectorAll(
        "[data-operator]"
    );


operatorButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const operator =
                    button.dataset.operator;


                addOperator(operator);

            }
        );

    }
);


/* =========================================================
   SCIENTIFIC BUTTON EVENTS
========================================================= */

const scientificButtons =
    document.querySelectorAll(
        ".scientific-buttons [data-action]"
    );


scientificButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const action =
                    button.dataset.action;


                switch (action) {

                    case "sin":
                    case "cos":
                    case "tan":
                    case "asin":
                    case "acos":
                    case "atan":
                    case "log":
                    case "ln":
                    case "sqrt":
                    case "square":
                    case "factorial":
                    case "percent":

                        applyScientificFunction(
                            action
                        );

                        break;


                    case "power":

                        addPower();

                        break;


                    case "pi":

                        addConstant("π");

                        break;


                    case "e":

                        addConstant("e");

                        break;


                    case "open-bracket":

                        addOpenBracket();

                        break;


                    case "close-bracket":

                        addCloseBracket();

                        break;


                    case "sign":

                        changeSign();

                        break;

                }

            }
        );

    }
);


/* =========================================================
   BASIC ACTION BUTTONS
========================================================= */

const actionButtons =
    document.querySelectorAll(
        ".basic-buttons [data-action]"
    );


actionButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const action =
                    button.dataset.action;


                switch (action) {

                    case "clear":

                        clearCalculator();

                        break;


                    case "delete":

                        deleteLast();

                        break;


                    case "equals":

                        calculateResult();

                        break;

                }

            }
        );

    }
);


/* =========================================================
   DEG / RAD MODE
========================================================= */

angleModeButton.addEventListener(
    "click",
    function () {

        if (angleMode === "DEG") {

            angleMode = "RAD";

        }

        else {

            angleMode = "DEG";

        }


        angleModeButton.textContent =
            angleMode;


        updateDisplay();

    }
);


/* =========================================================
   THEME TOGGLE
========================================================= */

themeToggle.addEventListener(
    "click",
    function () {

        document
            .body
            .classList
            .toggle("light");


        const isLight =
            document
                .body
                .classList
                .contains("light");


        themeToggle.textContent =
            isLight ? "☀" : "☾";

    }
);


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        const key =
            event.key;


        /* Numbers */

        if (
            key >= "0" &&
            key <= "9"
        ) {

            addNumber(key);

            return;

        }


        /* Decimal */

        if (key === ".") {

            addDecimal();

            return;

        }


        /* Operators */

        if (key === "+") {

            addOperator("+");

            return;

        }


        if (key === "-") {

            addOperator("−");

            return;

        }


        if (key === "*") {

            addOperator("×");

            return;

        }


        if (key === "/") {

            event.preventDefault();

            addOperator("÷");

            return;

        }


        if (key === "%") {

            applyScientificFunction(
                "percent"
            );

            return;

        }


        /* Parentheses */

        if (key === "(") {

            addOpenBracket();

            return;

        }


        if (key === ")") {

            addCloseBracket();

            return;

        }


        /* Enter */

        if (
            key === "Enter" ||
            key === "="
        ) {

            calculateResult();

            return;

        }


        /* Backspace */

        if (key === "Backspace") {

            deleteLast();

            return;

        }


        /* Escape */

        if (
            key === "Escape" ||
            key === "Delete"
        ) {

            clearCalculator();

        }

    }
);


/* =========================================================
   INITIAL DISPLAY
========================================================= */

updateDisplay();