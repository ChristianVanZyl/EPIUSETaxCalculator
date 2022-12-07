import { BaseStep } from "./baseStep.js"
import dataLoader from "../dataLoader.js";

export class SetConstantStep extends BaseStep {

    constructor(nameOf, description, filename) {
        super(nameOf, description)
        this.filename = filename
        this.constObj = null
    }

    execute(payRollData) {
        let val = 0;
        Object.entries(this.constObj).forEach(([key, value]) => {
            this.nameOf === key ? val = value : console.log("")
        });
        return this.addTo(payRollData, val)
    }

    accept(visitor) {
        visitor.visit_constantstep(this);
        return visitor
    }

    async init() { 
        this.constObj = await dataLoader(this.filename)
    }


}




