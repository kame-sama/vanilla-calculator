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
    deleteLastChar(e);
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
        case '−':
            result = subtract(firstArgument, secondArgument);
            break;
        case '×':
            result = multiply(firstArgument, secondArgument);
            break;
        case '÷':
            result = divide(firstArgument, secondArgument);
            break;
    }
    return result;
}

function populateDisplay(button) {
    if (button.target.textContent == '.' && content.length < 9) {
        if (!content.includes('.')) {
            content += content ? '.' : '0.';
        }
    } else if (content === '0') {
        content = button.target.textContent;
    } else if (content.replace('.', '').length < 9) {
        content += button.target.textContent;
    }
    display.textContent = content;
}

function getOperator(button) {
    if (!operator) {
        operator = button.target.textContent;
        button.target.classList.toggle('selected');
    }
    if (firstArgument === null) {
        firstArgument = +content||+display.textContent;
        content = '';
    } else {
        compute(button);
        operator = button.target.textContent;
        button.target.classList.toggle('selected');
    }
}

function compute(button) {
    if (button.target.textContent != 'C' && button.target.textContent != '←'
        && firstArgument && operator) {
        secondArgument = +content||+display.textContent;
        console.log(firstArgument, operator, secondArgument);
        let result = operate(operator, firstArgument, secondArgument);
        display.textContent =
            result.toString().length > 9
            ? result.toPrecision(5)
            : result;
        console.log(display.textContent);
        content = '';
        firstArgument =
            button.target.textContent == '='
            ? null
            : +display.textContent;
        secondArgument = null;
        operator = null;
        const selected = document.querySelector('.selected');
        selected.classList.toggle('selected');
    }
}

function clear(button) {
    if (button.target.textContent == 'C') {
        content = '';
        display.textContent = '0';
        firstArgument = null;
        secondArgument = null;
        operator = null;
        const selected = document.querySelector('.selected');
        if (selected) selected.classList.toggle('selected');
    }
}

function deleteLastChar(button) {
    if (button.target.textContent == '←') {
        if (display.textContent.length > 1 && content.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
            content = content.slice(0, -1);
            console.log(content);
        } else {
            display.textContent = '0';
            content = '0';
        }
        
    }
}