import {BaseStep} from "./baseStep.js"
import dataLoader from "../dataLoader.js";


// this needs to make use of init for async loading of dataloader

export class LoadTableStep extends BaseStep{
    constructor(nameOf, description, tableInputFileName){
            super(nameOf, description)
            this.tableset = dataLoader(tableInputFileName);
    }

    execute(payRollData){
    
        payRollData.set(this.nameOf, this.tableset)
        return payRollData;
    }

}