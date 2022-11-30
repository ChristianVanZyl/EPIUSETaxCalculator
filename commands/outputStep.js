import { BaseStep } from "./baseStep.js"

export class OutputStep extends BaseStep {
    constructor(nameOf, description, output) {
        super(nameOf, description)
        this.output = output
    }

    execute(payRollData) {
        const output = payRollData.get(this.output).value
        let val = output

        return this.addTo(payRollData, val)
    }

    accept(visitor) {
        visitor.visit_outputstep(this);
        return visitor
    }
}
