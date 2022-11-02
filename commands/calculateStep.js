import {BaseStep} from "./baseStep.js"
// new CalculateStep("annualized", "/", "income", "calculated_periods")
export class CalculateStep extends BaseStep{
    constructor(firstValue, operator, secondValue, outputResultName){
            super()
            this.firstValue = firstValue,
            this.operator = operator,
            this.secondValue = secondValue,
            this.outputResultName = outputResultName
    }

    execute(payRollData){
            const firstValue = Number(payRollData.get(this.firstValue))
            const secondValue = Number(payRollData.get(this.secondValue))
            let outputResult

            if(this.operator == "+"){
                outputResult = firstValue + secondValue
            }else if(this.operator == "-"){
                outputResult = firstValue - secondValue
            }else if(this.operator == "/"){
                outputResult = firstValue / secondValue
            }else if(this.operator == "*"){
                outputResult = firstValue * secondValue
            }

            payRollData.set(this.outputResultName, outputResult)
        
            return payRollData

    }
}