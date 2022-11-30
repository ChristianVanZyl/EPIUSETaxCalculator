import { BaseVisitor } from "./baseVisitor.js";

export class OutputVisitor extends BaseVisitor {
    constructor() {
        super();
        this.arr = []
    }

    visit_outputstep(o) {
        this.arr.push(o)
    }

}

