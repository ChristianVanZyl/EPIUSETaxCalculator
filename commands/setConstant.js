import {BaseStep} from "./baseStep.js"
export class SetConstant extends BaseStep{
    
    // new SetConstant("uif_percentage") // map.set("uif_percentage", 0.01) 
 
    constructor(nameOf, description, type){
            super(nameOf, description, type)
    }


    execute(payRollData){
        const nameOf = Number(payRollData.get(this.nameOf))
        let val = nameOf
        return this.addTo(payRollData, val)
        
    }

}

        


