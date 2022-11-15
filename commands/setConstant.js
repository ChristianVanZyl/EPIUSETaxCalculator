import {BaseStep} from "./baseStep.js"
import dataLoader from "../dataLoader.js";

export class SetConstant extends BaseStep{
    
    // async loading needs to be implemented
    constructor(nameOf, description, filename){
            super(nameOf, description)
            this.constObj = dataLoader(filename);
    }

    execute(payRollData){
        let val;
        Object.entries(this.constObj).forEach(([key, value]) => {
            this.nameOf === key ? val = value: console.log("")
        });
        return this.addTo(payRollData, val)
    }

}

        


