import { BaseVisitor } from "./baseVisitor.js";

export class LoadVisitor extends BaseVisitor {
  
constructor() {
    super();
    this.arr = []
}

visit_loadstep(o) {
    this.arr.push(o)
}

}








