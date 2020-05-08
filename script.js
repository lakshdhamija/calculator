class Calculator{
    constructor(prevOperandText, currOperandText){
        this.prevOperandText = prevOperandText;
        this.currOperandText = currOperandText;
        this.clear();
    }
    clear(){
        this.prevOperand='';
        this.currOperand='';
        this.operation=undefined;
    }
    delete(){
        this.currOperand = this.currOperand.toString().slice(0,-1);
    }
    appendNumber(number){
        if(number == '.' && this.currOperand.includes('.')){
            return;
        }
        this.currOperand = this.currOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currOperand == ''){
            return;
        }
        if(this.prevOperand != ''){
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currOperand + " " + this.operation;
        this.currOperand = '';
    }
    compute(){
        var result;
        var prev = parseFloat(this.prevOperand);
        var curr = parseFloat(this.currOperand);
        if(isNaN(prev) || isNaN(curr)){
            return;
        }
        switch(this.operation){
            case '+' :
                result = prev + curr;
                break;
            case '-' :
                result = prev - curr;
                break;
            case '/' :
                result = prev / curr;
                break;
            case '*' :
                result = prev * curr;
                break;    
            default:
                return;
        }
        this.currOperand = result;
        this.operation = undefined;
        this.prevOperand = '';
    }
    getDisplayNumber(number){
        var stringNum = number.toString();
        var digitsBefore = parseFloat(stringNum.split('.')[0]);
        var digitsAfter = stringNum.split('.')[1];
        var integerDisplay;
        if(isNaN(digitsBefore)){
            integerDisplay = '';
        }
        else{
            integerDisplay = digitsBefore.toLocaleString('en-IN', {maximumFractionDigits: 0});
        }
        if(digitsAfter != null){
            return integerDisplay + "." + digitsAfter;
        }
        else{
            return integerDisplay;
        }
    }
    updateDisplay(){
        this.currOperandText.innerText = this.getDisplayNumber(this.currOperand);
        this.prevOperandText.innerText = this.prevOperand;
    }

}
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation');
const equals = document.querySelector('[data-equals]');
const clearAll = document.querySelector('[data-all-clear]');
const deletebtn = document.querySelector('[data-delete]');
const prevOperandText = document.querySelector('[data-prev-operand]');
const currOperandText = document.querySelector('[data-curr-operand]');

const calculator = new Calculator(prevOperandText, currOperandText);
numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equals.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

clearAll.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deletebtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});