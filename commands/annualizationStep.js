import {BaseStep} from "./baseStep.js"

// income is the field name in map from which the VALUE will be fetched
    // new AnnualizationStep("income", "periods_per_year", "annual_income") // map.set("income", 20000)
    // new AnnualizationStep("retirement_contribution", "periods_per_year")
export class AnnualizationStep extends BaseStep{
  
    constructor(nameOf, description, type, firstValue, secondValue){
            super(nameOf, description, type)
            this.firstValue = firstValue
            this.secondValue = secondValue
    }
    
    execute(payRollData){
        const firstValue = payRollData.get(this.firstValue).value
        const secondValue = payRollData.get(this.secondValue).value
      
        let val = firstValue * secondValue

        return this.addTo(payRollData, val)
    }
}

