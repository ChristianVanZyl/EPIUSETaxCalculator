import { InputVisitor } from "./visitors/inputVisitor.js"
import { OutputVisitor } from "./visitors/outputVisitor.js"
import { LoadVisitor } from "./visitors/loadVisitor.js"
import { ConstantVisitor } from "./visitors/constantsVisitor.js"

export class PayrollMain {
    constructor(steps, map) {
        this.steps = steps
        this.map = map
    }

    getInputs() {
        let result = this.steps.accept(new InputVisitor())
        return result.arr
    };

    getOutputs() {
        let result = this.steps.accept(new OutputVisitor())
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





