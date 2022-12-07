import { BaseStep } from "./baseStep.js"
import dataLoader from "../dataLoader.js";


export class LoadTableStep extends BaseStep {

    constructor(nameOf, description, tableInputFileName) {
        super(nameOf, description)
        this.tableInputFileName = tableInputFileName
        this.tableset = null
    }

    execute(payRollData) {
        payRollData.set(this.nameOf, this.tableset)
        return payRollData;
    }

    accept(visitor) {
        visitor.visit_loadstep(this);
        return visitor
    }


    async init() { 
            this.tableset = await dataLoader(this.tableInputFileName)
    }

   
}

