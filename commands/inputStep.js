import {BaseStep} from "./baseStep.js"
// new InputStep("income") // map.set("income", 0.01) 
export class InputStep extends BaseStep{
    constructor(nameOf, description){
            super(nameOf, description) 
    }

    execute(payRollData){
        const val = payRollData.get(this.nameOf)
        let value = val;

        return this.addTo(payRollData, value)
       
    }
}


        
