import { BaseStep } from "./baseStep.js"
// new CalculateStep("annualized", "/", "income", "calculated_periods")
export class CalculateStep extends BaseStep {
    constructor(nameOf, description, firstValue, operator, secondValue, value) {
        super(nameOf, description)
        this.firstValue = firstValue,
        this.operator = operator,
        this.secondValue = secondValue
        this.value = value
    }

    execute(payRollData) {
    
        const firstValue = payRollData.get(this.firstValue).value
        const secondValue = payRollData.get(this.secondValue).value

        let val
        if (this.operator == "+") {
            val = firstValue + secondValue
        } else if (this.operator == "-") {
            val = firstValue - secondValue
        } else if (this.operator == "/") {
            val = firstValue / secondValue
        } else if (this.operator == "*") {
            val = firstValue * secondValue
        }

        return this.addTo(payRollData, val)
    }

    accept(visitor) {
        visitor.visit_calcstep(this);
        return visitor
    }

}