const numberButtons = document.querySelectorAll('[data-number');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const acButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clearAll();
    }

    //Convert .toString() so JavaScript doesn't add the numbers instead we want to append the number and concatanate as a string.
    appendNumber(number) {
        if (this.currentOperand.includes('.') && number === '.')
            return 
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }

    selectOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand + operation;
        this.currentOperand = '';
    }

    compute() {
        let computation = 0;
        const prev = parseFloat(this.previousOperand); //Gets previous operand in number format
        const curr = parseFloat(this.currentOperand);
        //We use isNaN method when we want to check if a number variable is a number
        if (isNaN(prev) || isNaN(curr)) {
            return
        }

        switch(this.operation) {
            case ('*'):
                computation = prev*curr;
                break;
            case ('÷'):
                computation = prev/curr;
                break;
            case ('+'):
                computation = prev+curr;
                break;
            case ('-'):
                computation = prev-curr;
                break;
            default:
                return
        }

        console.log(computation);
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    clearAll() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
        console.log(this.currentOperand);
    }

}

const calc = new Calculator(previousOperandTextElement, currentOperandTextElement);

//Loop through all numberButton elements and add and eventlistener for them
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.selectOperation(button.innerText);
        calc.updateDisplay();
    })
})

acButton.addEventListener('click', () => {
    calc.clearAll();
    calc.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calc.compute();
    calc.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calc.delete();
    calc.updateDisplay();
})