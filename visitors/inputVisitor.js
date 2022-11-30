import { BaseVisitor } from "./baseVisitor.js";

export class InputVisitor extends BaseVisitor {
    constructor() {
        super();
        this.arr = []
    }

    visit_inputstep(o) {
        this.arr.push(o)
    }
}
