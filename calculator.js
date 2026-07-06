var screenInput = document.getElementById("display");
var btnPower = document.getElementById("powerButton");
var btnClear = document.getElementById("clear");
var allButtons = document.querySelectorAll("button");

var  powerOn = false;
screenInput.value = "Off";
btnPower.classList.remove("bg-red-600", "shadow-red-500/40");
btnPower.classList.add("bg-green-600", "shadow-green-500/40");

function adjustFontSize(){
    var textLen = screenInput.value.length;
    screenInput.classList.remove("text-5xl", "text-3xl", "text-2xl", "text-xl");
 
    if (textLen < 11) {
        screenInput.classList.add("text-5xl");

    } else if (textLen < 15){
        screenInput.classList.add("text-5xl");
    } else if (textLen < 19) {
        screenInput.classList.add("text-3xl");
    } else if (textLen < 23) {
        screenInput.classList.add("text-2xl");
    } else {
        screenInput.classList.add("text-xl");
    }
}


function checkClearText(){
     if (powerOn == false) {
        btnClear.innerText = "AC";
    } else {
        if (screenInput.value == "") {
            btnClear.innerText = "AC";
        } else {
            btnClear.innerText = "C";
        }
    }
}

checkClearText();
adjustFontSize();

for(var i =0; i < allButtons.length; i++){
    allButtons[i].onclick = function(event) {
        var clickedValue = event.target.getAttribute("data-value");

        if (clickedValue == "POWER") {
            if (powerOn == true) {
                powerOn = false;
                screenInput.value = "Off";
                btnPower.classList.remove("bg-red-600", "shadow-red-500/40");
                btnPower.classList.add("bg-green-600", "shadow-green-500/40");
            } else {
                powerOn = true;
                screenInput.value = "";
                btnPower.classList.remove("bg-green-600", "shadow-green-500/40");
                btnPower.classList.add("bg-red-600", "shadow-red-500/40");
            }
            adjustFontSize();
            checkClearText();
            return;
        }
        if (powerOn == false) {
            return;
        }

        if (screenInput.value == "Error" && clickedValue != "AC") {
            screenInput.value = "";
        }

        if (clickedValue == "AC") {
            screenInput.value = "";
        } 
        else if (clickedValue == "Del") {
            var currentText = screenInput.value;
            screenInput.value = currentText.substring(0, currentText.length - 1);
        } 
        else if (clickedValue == "Sign") {
            if (screenInput.value != "") {
                if (screenInput.value[0] == "-") {
                    screenInput.value = screenInput.value.substring(1);
                } else {
                    screenInput.value = "-" + screenInput.value;
                }
            }
        } 
        else if (clickedValue == "=") {
            try {
                var mathString = screenInput.value;
                
                mathString = mathString.split("×").join("*");
                mathString = mathString.split("÷").join("/");
                
                var answer = eval(mathString);
                
                if (answer % 1 != 0) {
                    answer = parseFloat(answer.toFixed(4));
                }
                
                screenInput.value = answer;
            } catch (err) {
                screenInput.value = "Error";
            }
        }
        else {
            var isOperator = (clickedValue == "+" || clickedValue == "-" || clickedValue == "×" || clickedValue == "÷" || clickedValue == "%");
            
            if (screenInput.value == "" && isOperator) {
                
            } else {
                var lastChar = screenInput.value.charAt(screenInput.value.length - 1);
                var lastCharIsOp = (lastChar == "+" || lastChar == "-" || lastChar == "×" || lastChar == "÷" || lastChar == "%");
                
                if (lastCharIsOp && isOperator) {
                    
                } else {
                    if (clickedValue == ".") {
                        var parts = screenInput.value.split(/[\+\-\×\÷\%]/);
                        var lastPart = parts[parts.length - 1];
                        if (lastPart.indexOf(".") != -1) {
                            return; 
                        }
                    }
                    
                    screenInput.value = screenInput.value + clickedValue;
                }
            }
        }
        adjustFontSize();
        checkClearText();
    };
}