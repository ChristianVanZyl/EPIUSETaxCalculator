import {BaseStep} from "../commands/baseStep.js"

// composite pattern is used to execute a method shared by all of the command classes
// circumventing the need to call the method for each step separately
export class Steps extends BaseStep{
    constructor(...commandSteps){
        super()
        this.commandSteps = commandSteps
    }

    execute(payRollData){
     
        this.commandSteps.forEach(commandStep => {      
             commandStep.execute(payRollData)          
        })
        return payRollData
    }

    hasType(inputvalue){
        let map = this.commandSteps
        let returnvalue = map.filter((value) => 
            {
                value instanceof inputvalue 
                return value instanceof inputvalue 
            }
        )   
        return returnvalue
    }

    setValues(vals){ 
        let map = this.commandSteps

        Object.entries(vals).forEach(([key, val]) => {
        map.some(m => m.nameOf === key ? m.value = val: console.log(""))
        });
        return map
    }

}

