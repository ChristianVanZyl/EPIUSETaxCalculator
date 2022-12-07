import { BaseVisitor } from "./baseVisitor.js";

export class ConstantVisitor extends BaseVisitor {
    constructor() {
        super();
        this.arr = []
    }

    visit_constantstep(o){
        this.arr.push(o)
    
    }
}