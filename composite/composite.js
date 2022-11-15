import {BaseStep} from "../commands/baseStep.js"

// composite pattern is used to execute a method shared by all of the command classes
// circumventing the need to call the method for each step separately
export class Steps extends BaseStep{
    constructor(...commandSteps){
        super()
        this.commandSteps = commandSteps
    }

    execute(payRollData){
        console.log(payRollData)
        this.commandSteps.forEach(commandStep => {      
             commandStep.execute(payRollData)          
        })
   
        return payRollData
    
    }

 // searches commandsteps array and returns an object array filled only with specified commandstep type (inputvalue param)   

    hasType(inputvalue){
       let arr = []
       
       this.commandSteps.forEach(commandStep => {   
        
                let temp = commandStep.hasType(inputvalue)
                if(temp  === undefined){
                    // if inputvalue is not the type of commandstep, do nothing
                }else if(temp instanceof Array){
                    // recursive call
                    temp.forEach(commandStep => {
                        arr.push(commandStep.hasType(inputvalue))
                    })
                }else{
                    // perform method without recursion
                    arr.push(commandStep.hasType(inputvalue))
                }
               
       })
       
       return arr    
    }




}

