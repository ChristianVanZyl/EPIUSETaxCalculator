import {BaseStep} from "./baseStep.js"
// new InputStep("income") // map.set("income", 0.01) 
export class InputStep extends BaseStep{
    constructor(nameOf, description, value){
            super(nameOf, description) 
            this.value = value
    }

    execute(payRollData){
        return this.addTo(payRollData, this.value)
       
    }
}


        
