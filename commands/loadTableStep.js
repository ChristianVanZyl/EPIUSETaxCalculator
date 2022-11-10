import {BaseStep} from "./baseStep.js"
import jsonLoader from "../jsonLoader.js";

// new LoadTableStep("income_table", "tax_income_table") // map.set("income_table"," taxIncomeTable.json") 
export class LoadTableStep extends BaseStep{
    constructor(nameOf, description, tableInputFileName){
            super(nameOf, description)
            this.tableInputFileName = tableInputFileName;
    }

    execute(payRollData){
        
        
        let tableset = jsonLoader(this.tableInputFileName)
        
        payRollData.set(this.nameOf, tableset)
        return payRollData;
    }

}