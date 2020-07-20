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
        return add(parseFloat(num1), parseFloat(num2))
    } else if (operator === "sub") {
        return sub(parseFloat(num1), parseFloat(num2))
    } else if (operator === "mul") {
        return mul(parseFloat(num1), parseFloat(num2))
    } else if (operator === "div") {
        if (num2 == "0" || num2 == "-0") {
            return "Cannot divide by zero"
        } else {
            return div(parseFloat(num1), parseFloat(num2))
        }};
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
            toggleOperatorOff(button)
        } else if (eqToggle == "on") {
            displayValue = button.id
            eqToggle = "off"
            storedValue = ''
        } else if (displayValue === "-0") {
            displayValue = "-" + button.id
        } else if (displayValue === "Cannot divide by zero") {
            displayValue = button.id
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
        toggleOperatorOff(button)
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
        if (eqToggle == 'on') {
            prevOp = button.id
            eqToggle = 'off'
            operatorOn(button)
        } else if (opToggle == 'on') {
            toggleOperatorOff(button)
            prevOp = ''
            storedValue = ''
        } else if (typeof(storedValue) == "number" && opToggle == 'off') {
            storedValue = operate(prevOp, storedValue, displayValue)
            if (storedValue == "Cannot divide by zero") {
                display.innerHTML = storedValue
                storedValue = ''
            } else {
                prevOp = button.id
                displayValue = (+storedValue.toFixed(10)).toString()
                display.innerHTML = displayValue
                operatorOn(button)
            } 
            
        } else if (storedValue == "Cannot divide by zero" || displayValue == 
        "Cannot divide by zero") {
            storedValue = ''
        } else if (storedValue === '') {
            prevOp = button.id
            storedValue = parseFloat(displayValue)
            display.innerHTML = +parseFloat(displayValue).toFixed(10)
            opToggle = "on"
            button.classList.add('on')
        } else {
            prevOp = button.id
            operatorOn(button)
        }
    });
});

const equals = document.querySelector('.equal');
equals.addEventListener('click', () => {
    if (eqToggle == "on" || opToggle == "on") {
        opButtons.forEach(button => button.classList.remove('on'))
        return
    } else if (typeof(storedValue) == "number" && prevOp != '') {
        storedValue = operate(prevOp, storedValue, displayValue)
        if (storedValue == "Cannot divide by zero") {
            displayValue = storedValue
            storedValue = ''
        } else {
            displayValue = (+storedValue.toFixed(10)).toString()
            eqToggle = "on"
        }
    } else {
        eqToggle = 'on'
    }

    display.innerHTML = displayValue
})

const backspace = document.querySelector('#bkspc');
backspace.addEventListener('click', () => {
    if (displayValue == "Cannot divide by zero") {
        clearAll()
    } else if (opToggle == 'on') {
        toggleOperatorOff()
        prevOp = ''
    } else if (displayValue.length == 1) {
        displayValue = '0'
    } else if (displayValue != '0') {
        displayValue = displayValue.slice(0,displayValue.length-1)
    }
    display.innerHTML = displayValue
})

const clear = document.querySelector('#clr');
clear.addEventListener('click', clearAll)

function clearAll() {
        displayValue = "0"
        display.innerHTML = displayValue
        storedValue = ''
        prevOp = ''
        eqToggle = 'off'
        opToggle = 'off'
        opButtons.forEach(button => button.classList.remove('on'))
}

function toggleOperatorOff(btn) {
    opToggle = 'off'
    opButtons.forEach(btn => btn.classList.remove('on'))
}

function operatorOn(btn) {
    opToggle = 'on'
    btn.classList.add('on')
}

// if  (decToggle == "on") {
//     displayValue == 
// } else 