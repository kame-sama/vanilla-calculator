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

window.addEventListener('keydown', e => {
    console.log(e.key);
    e.preventDefault();
    getKeyPressed(e);
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
        case '-':
            result = subtract(firstArgument, secondArgument);
            break;
        case '×':
        case '*':
            result = multiply(firstArgument, secondArgument);
            break;
        case '÷':
        case '/':
            result = divide(firstArgument, secondArgument);
            break;
    }
    return result;
}

function populateDisplay(button) {
    if ((button.target.textContent == '.' || button.key == '.')
        && content.length < 9) {
        if (!content.includes('.')) content += content ? '.' : '0.';
    } else if (content === '0') {
        content = button.key||button.target.textContent;
    } else if (content.replace('.', '').length < 9) {
        content += button.key||button.target.textContent;
    }
    display.textContent = content;
}

function getOperator(button) {
    if (!operator) {
        operator = button.key||button.target.textContent;
        setSelectedStyle();
    }
    if (firstArgument === null) {
        firstArgument = +content||+display.textContent;
        display.textContent = '0';
        content = '';
    } else {
        compute(button);
        operator = button.key||button.target.textContent;
        setSelectedStyle();
    }
}

function compute(button) {
    if (button.target.textContent != 'C'
        && button.target.textContent != '←'
        && firstArgument && operator) {
        secondArgument = +content||+display.textContent;
        console.log(firstArgument, operator, secondArgument);
        let result = operate(operator, firstArgument, secondArgument);
        display.textContent =
            result.toString().length > 9
            ? result.toPrecision(5)
            : result;
        content = '';
        firstArgument =
            (button.target.textContent == '='
            || button.key == 'Enter'
            || button.key == '=')
            ? null
            : +display.textContent;
        secondArgument = null;
        operator = null;
        const selected = document.querySelector('.selected');
        selected.classList.toggle('selected');
    }
}

function clear(button) {
    if (button.target.textContent == 'C' || button.key == 'Delete') {
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
    if (button.target.textContent == '←' || button.key == 'Backspace') {
        if (display.textContent.length > 1 && content.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
            content = content.slice(0, -1);
        } else {
            display.textContent = '0';
            content = '';
        }
        
    }
}

function getKeyPressed(button) {
    if (button.key.match(/\d|\./)) {
        populateDisplay(button);
    } else if (button.key.match(/\+|-|\*|\//)) {
        getOperator(button);
    } else if (button.key == '=' || button.key == 'Enter') {
        compute(button);
    } else if (button.key == 'Delete') {
        clear(button);
    } else if (button.key == 'Backspace') {
        deleteLastChar(button);
    }
}

function setSelectedStyle() {
    let selected;
    switch (operator) {
        case '+':
            selected = document.querySelector('.operators > *:first-child');
            selected.classList.toggle('selected');
            break;
        case '−':
        case '-':
            selected = document.querySelector('.operators > *:nth-child(2)');
            selected.classList.toggle('selected');
            break;
        case '×':
        case '*':
            selected = document.querySelector('.operators > *:nth-child(3)');
            selected.classList.toggle('selected');
            break;
        case '÷':
        case '/':
            selected = document.querySelector('.operators > *:last-child');
            selected.classList.toggle('selected');
            break;
    }
}