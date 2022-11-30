import { InputVisitor } from "./visitors/inputVisitor.js"
import { OutputVisitor } from "./visitors/outputVisitor.js"

export class PayrollMain {
    constructor(steps, map) {
        this.steps = steps
        this.map = map
    }

    getInputs() {
        let result = this.steps.accept(new InputVisitor())
        
        if(this.map.size > 0){
            result.arr.forEach((a) => {
                let val = this.map.get(a.nameOf)
                a.value = val.value
            });
        }
      
        return result.arr
    };

    getOutputs() {
        let result = this.steps.accept(new OutputVisitor())
        result.arr.forEach(a => {
            let val = this.map.get(a.nameOf)
            a.value = val.value
        });
        return result.arr
    };

    setValues(valuesObj) {
        Object.entries(valuesObj).forEach(([key, val]) => {
            this.map.set(key, val)
        });
        return valuesObj
    };

    execute() {
        this.map = this.steps.execute(this.map)
        return this.map
    }
}





