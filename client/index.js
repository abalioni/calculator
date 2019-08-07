class Calculator {

	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
		this.clearAll()
	}

	clearAll() {
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return
		this.currentOperand = this.currentOperand.toString() + number.toString()
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') return
		if (this.previousOperand !== '') {
			this.computeValue()
		}
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}

	computeValue() {
		let computation
		const prev = parseFloat(this.previousOperand),
			current = parseFloat(this.currentOperand)
		if (isNaN(prev) || isNaN(current)) return
		switch (this.operation) {
			case '+':
				computation = prev + current
				break
			case '-':
				computation = prev - current
				break
			case '*':
				computation = prev * current
				break
			case '÷':
				computation = prev / current
				break
			default:
				return
		}
		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ''
	}

	formatNumber(number) {
		const stringNumber = number.toString(),
			integerDigits = parseFloat(stringNumber.split('.')[0]),
			decimalDigits = stringNumber.split('.')[1]
		let integerDisplay
		if (isNaN(integerDigits)) {
			integerDisplay = ''
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0
			})
		}
		if (decimalDigits !== null && decimalDigits !== undefined) {
			return `${integerDisplay}.${decimalDigits}`
		} else {
			return integerDisplay
		}
	}

	updateDisplay() {

		this.currentOperandTextElement.innerText = this.formatNumber(this.currentOperand)
		if (this.operation !== null && this.operation !== undefined) {
			this.previousOperandTextElement.innerText = `${this.formatNumber(this.previousOperand)} ${this.operation}`
		} else {
			this.previousOperandTextElement.innerText = ''
		}
	}

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[operation]')
const equalsButton = document.querySelector('[equals]')
const deleteButton = document.querySelector('[delete]')
const allClearButton = document.querySelector('[all-clear]')
const previousOperand = document.querySelector('[previous-operand]')
const currentOperand = document.querySelector('[current-operand]')

const calculator = new Calculator(previousOperand, currentOperand)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	})
})

equalsButton.addEventListener('click', button => {
	calculator.computeValue()
	calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
	calculator.clearAll()
	calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
	calculator.delete()
	calculator.updateDisplay()
})

equalsButton.addEventListener('click', button => {
	calculator.computeValue()
	calculator.updateDisplay()
})