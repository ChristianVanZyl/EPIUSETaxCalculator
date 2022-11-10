import {BaseStep} from "./baseStep.js"


export class OutputStep extends BaseStep{
    constructor(nameOf, description, type, output){
            super(nameOf, description, type) 
            this.output = output
    }

    execute(payRollData){
       
        const output = payRollData.get(this.output).value
        let val = output

        return this.addTo(payRollData, val)
    }

}
