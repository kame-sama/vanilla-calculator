let firstArgument = prompt('Enter first argument');
let secondArgument = prompt('Enter second argument');
let operator = prompt('Enter operator');

alert(operate(operator, firstArgument, secondArgument));

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