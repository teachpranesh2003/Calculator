class Calculator{
    constructor(previousButton,currentButton){
        this.previousButton  = previousButton;
        this.currentButton = currentButton;
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousoperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number==='.'&& this.currentOperand.includes('.')) return
        this.currentOperand=this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand==='')return
        if(this.previousOperans!==''){
            this.compute()
        }
         this.operation=operation
         this.previousoperand=this.currentOperand
         this.currentOperand=''

    }
    compute(){
        let computation
        const prev = parseFloat(this.previousoperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev)|| isNaN(current))return
        switch(this.operation){
            case '+':
                computation=prev+current
                break
            case '-':
                computation=prev-current
                break
            case '*':
                computation=prev*current
                break
            case '/':
                computation=prev/current
                break
            default:
                return
        }
        this.currentOperand=computation
        this.operation = undefined
        this.previousoperand=''
    }
    getDisplayNumber(number){
        const stringnumber = number.toString()
        const integerDigits = parseFloat(stringnumber.split('.')[0])
        const decimalDigits = stringnumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay=''
        }
        else{
            integerDisplay=integerDigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
        
    }

    updateDisplay(){
        this.currentButton.innerText=this.getDisplayNumber(this.currentOperand)
        if(this.operation !=null){
        this.previousButton.innerText=`${this.getDisplayNumber(this.previousoperand)} ${this.operation}`

        }
        else{
            this.previousButton.innerText=''
        }
    }
}






const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousButton = document.querySelector('[data-previous-operand]')
const currentButton = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousButton,currentButton)
numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})