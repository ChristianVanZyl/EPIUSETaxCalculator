import {BaseStep} from "./baseStep.js"
import fs from "fs";

// new LoadTableStep("income_table", "tax_income_table") // map.set("income_table"," taxIncomeTable.json") 
export class LoadTableStep extends BaseStep{
    constructor(tableInputFileName, tableOutputName){
            super()
            this.tableOutputName = tableOutputName
            this.tableInputFileName = tableInputFileName;
    }

    execute(payRollData){
        const tableInputFileName = payRollData.get(this.tableInputFileName)
        let tableSet = JSON.parse(fs.readFileSync(tableInputFileName))
        
        payRollData.set(this.tableOutputName, tableSet)
        return payRollData;
    }

}

