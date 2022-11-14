import { InputStep } from "./commands/inputStep.js"
import { OutputStep } from "./commands/outputStep.js"


export class PayrollMain {
    constructor(steps, map) {
        this.steps = steps
        this.map = map
    }
        
        getInputs(){
            return this.steps.hasType(InputStep);
        };

        getOutputs() {
            let outputSteps = this.steps.hasType(OutputStep)
  
            outputSteps.forEach(obj => { this.map.forEach((val, key) => {
                    if(key === obj.nameOf){
                        obj["value"] = val.value
                    } }
            )});
   
            return outputSteps
        } 
       

        getValues(vals) {
            this.steps.setValues(vals);
            return vals;
        };

        execute(){
            this.map = this.steps.execute(this.map)
            
            return this.map
        }
}

  






