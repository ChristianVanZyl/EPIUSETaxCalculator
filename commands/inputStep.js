import {BaseStep} from "./baseStep.js"
// new InputStep("income") // map.set("income", 0.01) 
export class InputStep extends BaseStep{
    constructor(userInput){
            super()
            this.userInput = userInput
    }

    execute(payRollData){
        const userInput = Number(payRollData.get(this.userInput))
        
        let inputSet = userInput;

        payRollData.set(this.userInput, inputSet)

        return payRollData;
    }

}
