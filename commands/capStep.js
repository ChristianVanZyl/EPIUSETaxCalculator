import { BaseStep } from "./baseStep.js"
// new CapStep("uif_max", "uif_monthly_not_capped") 
export class CapStep extends BaseStep {
    constructor(nameOf, description, firstValue, secondValue) {
        super(nameOf, description)
        this.firstValue = firstValue
        this.secondValue = secondValue
    }

    execute(payRollData) {
        const firstValue = payRollData.get(this.firstValue).value
        const secondValue = payRollData.get(this.secondValue).value

        let val;
        if (secondValue > firstValue) {
            val = firstValue
        } else {
            val = secondValue
        }

        return this.addTo(payRollData, val)
    }

    accept(visitor) {
        visitor.visit_capstep(this);
        return visitor
    }
}

