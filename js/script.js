let firstArgument = null;
let secondArgument = null;
let operator = null;
let content = '';

const display = document.querySelector('.display');
const numbers = document.querySelector('.numbers');
const operators = document.querySelector('.operators');
const clearOrCompute = document.querySelector('.clear-or-compute');

display.textContent = '0';

numbers.addEventListener('click', e => {
    populateDisplay(e);
});

operators.addEventListener('click', e => {
    getOperator(e);
});

clearOrCompute.addEventListener('click', e => {
    compute(e);
    clear(e);
});

function add(firstArgument, secondArgument) {
    return firstArgument + secondArgument;
}

function subtract(firstArgument, secondArgument) {
    return firstArgument - secondArgument;
}

function multiply(firstArgument, secondArgument) {
    return firstArgument * secondArgument;
}

function divide(firstArgument, secondArgument) {
    return firstArgument / secondArgument;
}

function operate(operator, firstArgument, secondArgument) {
    let result;
    switch (operator) {
        case '+':
            result = add(firstArgument, secondArgument);
            break;
        case '-':
            result = subtract(firstArgument, secondArgument);
            break;
        case '*':
            result = multiply(firstArgument, secondArgument);
            break;
        case '/':
            result = divide(firstArgument, secondArgument);
            break;
    }
    return result;
}

function populateDisplay(button) {
    if (button.target.textContent == '.') {
        if (!content.includes('.')) {
            content += content ? '.' : '0.';
        }
    } else if (content === '0') {
        content = button.target.textContent;
    } else {
        content += button.target.textContent;
    }
    display.textContent = content;
}

function getOperator(button) {
    if (!operator) {
        operator = button.target.textContent;
    }
    if (firstArgument === null) {
        firstArgument = +content||+display.textContent;
        content = '';
    } else {
        compute(button);
        operator = button.target.textContent;
    }
}

function compute(button) {
    if (button.target.textContent != 'c' && firstArgument && operator) {
        secondArgument = +content||+display.textContent;
        console.log(firstArgument, operator, secondArgument);
        display.textContent = operate(operator, firstArgument, secondArgument);
        console.log(display.textContent);
        content = '';
        firstArgument =
            button.target.textContent == '='
            ? null
            : +display.textContent;
        secondArgument = null;
        operator = null;
    }
}

function clear(button) {
    if (button.target.textContent == 'c') {
        content = '';
        display.textContent = '0';
        firstArgument = null;
        secondArgument = null;
        operator = null;
    }
}