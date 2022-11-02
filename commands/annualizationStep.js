import {BaseStep} from "./baseStep.js"

// income is the field name in map from which the VALUE will be fetched
    // new AnnualizationStep("income", "periods_per_year", "annual_income") // map.set("income", 20000)
    // new AnnualizationStep("retirement_contribution", "periods_per_year")
export class AnnualizationStep extends BaseStep{
  
    constructor(income, paymentPeriods, annualized){
            super()
            this.income = income
            this.paymentPeriods = paymentPeriods
            this.annualized = annualized
    }
    
    execute(payRollData){
        const income = Number(payRollData.get(this.income))
        const paymentPeriods = Number((payRollData.get(this.paymentPeriods)))

        const annualized = income * paymentPeriods

        payRollData.set(this.annualized, annualized)

        return payRollData
    }

}
