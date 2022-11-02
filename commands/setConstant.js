import {BaseStep} from "./baseStep.js"
export class SetConstant extends BaseStep{
    
    // new SetConstant("uif_percentage") // map.set("uif_percentage", 0.01) 
 
    constructor(capValue){
            super()
            this.capValue = capValue
    }


    execute(payRollData){
        const capValue = Number(payRollData.get(this.capValue))
        let constantSet = capValue;

        payRollData.set(this.capValue, constantSet)
        
        return payRollData
    }

}
