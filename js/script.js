// let firstArgument = ;
// let secondArgument = ;
// let operator = ;

const display = document.querySelector('.display');
const numbers = document.querySelector('.numbers');

numbers.addEventListener('click', e => {
    populateDisplay(e);
});

function add(firstArgument, secondArgument) {
    return +firstArgument + +secondArgument;
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
    display.textContent += button.target.textContent;
}