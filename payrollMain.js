import { InputStep } from "./commands/inputStep.js"
import { OutputStep } from "./commands/outputStep.js"
import { Steps } from "./composite/composite.js"


export class PayrollMain {
    constructor(steps, map) {
        this.steps = steps
        this.map = map
    }
        
        getInputs(){
         
            return this.steps.hasType(InputStep);

        };

        getPostExInputs(valuesObj){
            let arr = []
            Object.entries(valuesObj).forEach(([key, val]) => {
                
                arr.push( {"nameOf": key, "description": null, "value": val})    
            });
            return arr
        }

        getOutputs() {
           
            let outputSteps = this.steps.hasType(OutputStep)
            
            outputSteps.forEach(obj => { this.map.forEach((val, key) => {
                    if(key === obj.nameOf){
                        obj["value"] = val.value
                    } }
            )});
         
            return outputSteps
        } 
       
      
        setValues(valuesObj) {
            this.map = new Map();
         
           Object.entries(valuesObj).forEach(([key, val]) => {
            this.map.set(key, val)
     
            });
           
            return valuesObj
        };

        execute(){
           
            this.map = this.steps.execute(this.map)
           
            return this.map
        }
}

  





