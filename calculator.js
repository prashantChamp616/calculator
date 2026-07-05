const display = document.getElementById('display');
const powerButton = document.getElementById('powerButton');
const clearButton = document.getElementById('clear');
const buttons = document.querySelectorAll("button");
const operators = ["+", "-", "×", "÷", "%"];

let isOn = false;
display.value = "Off";

powerButton.classList.remove("bg-red-600", "shadow-red-500/40");
powerButton.classList.add("bg-green-600", "shadow-green-500/40");
updateClearButton();
updateDisplaySize();

let lastOperator = "";
let lastOperand = "";

function updateDisplaySize() {
    let length = display.value.length;

    display.classList.remove("text-5xl", "text-4xl", "text-3xl", "text-2xl", "text-xl");
    if (length <= 10) {
        display.classList.add("text-5xl");
    } else if (length <= 13) {
        display.classList.add("text-4xl");
    } else if (length <= 17) {
        display.classList.add("text-3xl");
    } else if (length <= 21) {
        display.classList.add("text-2xl");
    } else {
        display.classList.add("text-xl");
    }

}

function updateClearButton() {

    if (!isOn) {
        clearButton.textContent = "AC";
        return;
    }
    if (display.value === "") {
        clearButton.textContent = "AC";
    } else {
        clearButton.textContent = "C";
    }
}

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const value = button.dataset.value;

        if (value === "POWER") {
            isOn = !isOn;

            if (isOn) {
                display.value = "";
                powerButton.classList.remove("bg-green-600", "shadow-green-500/40");
                powerButton.classList.add("bg-red-600", "shadow-red-500/40");
            } else {
                display.value = "Off";

                powerButton.classList.remove("bg-red-600", "shadow-red-500/40");
                powerButton.classList.add("bg-green-600", "shadow-green-500/40");
            }

            updateDisplaySize();
            updateClearButton();
            return;
        }
        if (!isOn) {
            return;
        }
        if (display.value === "Error" && value !== "AC") {
            display.value = "";
        } else if (value === "Sign") {
            if (display.value !== "") {
                if (display.value.startsWith("-")) {
                    display.value = display.value.slice(1);
                } else {
                    display.value = "-" + display.value;
                }
            }

        } else if (value === "AC") {
            display.value = "";
        } else if (value === "Del") {
            display.value = display.value.slice(0, -1);
        } else if (value === "=") {
            try {
                let expression = display.value.replace(/×/g, "*").replace(/÷/g, "/");
                let result = eval(expression);

                if (Number.isInteger(result)) {
                    display.value = result;

                } else {
                    display.value = parseFloat(result.toFixed(4));
                }

            } catch (error) {
                display.value = "Error";
            }
        } else {
            if (display.value === "" && ["+", "×", "÷", "%"].includes(value)) {
                return;
            }

            let lastCharacter = display.value.slice(-1);
            if (operators.includes(lastCharacter) && operators.includes(value)) {
                return;
            }
            if (value === ".") {
                let numbers = display.value.split(/[+\-×÷%]/);
                let currentNumber = numbers[numbers.length - 1];
                if (currentNumber.includes(".")) {
                    return;
                }
            }

            if (value === "*") {
                display.value += "×";
            } else if (value === "/") {
                display.value += "÷";
            } else {
                display.value += value;
            }






        }
        updateDisplaySize();
        updateClearButton();

    });
});