import {BaseStep} from "./baseStep.js"
import dataLoader from "../dataLoader.js";

export class SetConstant extends BaseStep{
    
    // new SetConstant("uif_percentage") // map.set("uif_percentage", 0.01) 
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

        


