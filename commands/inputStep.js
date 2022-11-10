import {BaseStep} from "./baseStep.js"
// new InputStep("income") // map.set("income", 0.01) 
export class InputStep extends BaseStep{
    constructor(nameOf, description, type){
            super(nameOf, description, type) 
    }

    execute(payRollData){
        
        const nameOf = Number(payRollData.get(this.nameOf))
        
        let val = nameOf

        return this.addTo(payRollData, val)
       
    }

  
}


        
