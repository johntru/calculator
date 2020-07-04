function add(a, b) {
    return a + b
};

function sub(a, b) {
    return a - b
};

function mul(a, b) {
    return a * b
};

function div(a, b) {
    return a / b
};

function operate(operator, num1, num2) {
    if(operator === "add") {
        return add(num1, num2)
    } else if (operator === "sub") {
        return sub(num1, num2)
    } else if (operator === "mul") {
        return mul(num1, num2)
    } else if (operator === "div") {
        return div(num1, num2)
    }
};

var displayValue = "0"
var storedValue = ''
var equalsValue = ''
var nextOp = ''
var prevOp = ''
var opToggle = "off"    // state of operator being toggled to allow display 
                        // to reset for next number
var decToggle = "off"
var eqToggle = "off"

const numButtons = document.querySelectorAll('.num');
const display = document.querySelector('.display')
numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (displayValue === "0" )  {
            displayValue = button.id
        } else if (opToggle == "on") {
            displayValue = button.id
            opToggle = "off"
        } else if (eqToggle == "on") {
            displayValue = button.id
            eqToggle = "off"
            storedValue = ''
        } else if (displayValue === "-0") {
            displayValue = "-" + button.id
        } else {
            displayValue += button.id;
        }
        display.innerHTML = displayValue  
        
        nextOp = prevOp
        
    });
});

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () => {
    if (displayValue.includes('.')) {
        return
    } else {
        displayValue = `${displayValue}.`
        display.innerHTML = displayValue
    }

});

const plusMinus = document.querySelector('.plus-minus')
plusMinus.addEventListener('click', () => {
    if (displayValue === "0") {
        displayValue = '-' + displayValue
    } else if (opToggle == "on") {
        displayValue = '-0'
        opToggle = "off"
    } else if (eqToggle == "on") {
        displayValue *= -1
        storedValue *= -1
    } else if (displayValue.includes('-')) {
        displayValue = displayValue.replace('-', '')
    } else {
        displayValue *= -1
    }
    displayValue = displayValue.toString()
    display.innerHTML = displayValue
    })

const opButtons = document.querySelectorAll('.op');
opButtons.forEach((button) => {
    button.addEventListener('click', () => {
        displayValue = parseFloat(displayValue)
        nextOp = button.id
        if (eqToggle == 'on') {
            prevOp = nextOp
            eqToggle = 'off'
        } else if (storedValue != '') {
            storedValue = operate(prevOp, storedValue, displayValue)
            prevOp = nextOp
            display.innerHTML = +storedValue.toFixed(10)
        } else if (storedValue === '') {
            prevOp = button.id
            storedValue = displayValue
            display.innerHTML = +displayValue.toFixed(10)
        }
        opToggle = "on"
        
    });
});

const equals = document.querySelector('.equal');
equals.addEventListener('click', () => {
    displayValue = parseFloat(displayValue)
    if (storedValue === '') {
        storedValue = displayValue
    } else {
        storedValue = operate(prevOp, storedValue, displayValue)
        displayValue = storedValue
    }
    display.innerHTML = +storedValue.toFixed(10)
    displayValue = displayValue.toString()
    eqToggle = "on"
})

const clear = document.querySelector('.clr');
clear.addEventListener('click', () => {
    displayValue = "0"
    display.innerHTML = displayValue
    storedValue = ''
    prevOp = ''
    eqToggle = 'off'
})


// if  (decToggle == "on") {
//     displayValue == 
// } else 