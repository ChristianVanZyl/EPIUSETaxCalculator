
export class BaseVisitor {
    constructor() {
    }

    enter_steps(o) { }
    exit_steps(o) { }
    visit_annualizestep(o) { }
    visit_basestep(o) { }
    visit_calcstep(o) { }
    visit_capstep(o) { }
    visit_inputstep(o) { }
    visit_loadstep(o) { }
    visit_lookupstep(o) { }
    visit_outputstep(o) { }
    visit_constantstep(o) { }
    enter_branchtrue(o){}
    exit_branchtrue(o){}    
    enter_branchfalse(o){}
    exit_branchfalse(o){}    
    
}



