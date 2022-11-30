import { BaseStep } from "./baseStep.js"
// new LookupTableStep("age", "tax_threshold_data", "tax_threshold_total") 
export class LookupTableStep extends BaseStep {

    constructor(nameOf, description, lookupValue, tableName) {
        super(nameOf, description)
        this.lookupValue = lookupValue
        this.tableName = tableName
    }

    execute(payRollData) {
        const lookupValue = payRollData.get(this.lookupValue).value
        const tableName = payRollData.get(this.tableName)

        let tableKey = (Object.keys(tableName)).toString()
        let objectArrayofData = tableName[tableKey];

        // create a temp array and min values array 
        // use chosen array and populate min values array
        // merge min value array with chosen array, store in temp array
        // use temp array for calculations
        let tempArray = [];
        let val;
        let count = 0
        let minArray = [{
            "id": 1,
            "Min": 0
        }];

        for (count; count < objectArrayofData.length; count++) {
            if (objectArrayofData[count].Max !== null) {
                minArray.push({ "id": count + 2, "Min": objectArrayofData[count].Max });
            }
        }

        count = 0;

        for (count; count < objectArrayofData.length; count++) {
            if (objectArrayofData[count].id === minArray[count].id) {
                tempArray.push({ ...objectArrayofData[count], "Min": minArray[count].Min });
            }
        }

        const index = tempArray.findIndex(obj => {
            if (obj.Max === null) {
                return obj.id;
            };
        });
        tempArray[index].Max = Infinity;
        count = 0;

        // use temp array that populated min results
        // identify next step (which if statement to follow) with table key
        // use lookupvalue for final result

        if (tableKey == "TaxThreshold") {

            let newArray = tempArray.filter(m => lookupValue < m.Max && lookupValue >= m.Min ? m.Amount : null)
            if (newArray.length > 0) {
                val = newArray[0].Amount
            } else {
                val = 0;
            }
        }


        if (tableKey === "TaxRebate") {
            let rebate = 0;
            let tempArr2 = [];

            for (count; count < tempArray.length; count++) {
                rebate = rebate + tempArray[count].Amount;
                tempArr2.push({ ...tempArray[count], "Rebate": rebate });
            }
            let newArray = tempArr2.filter(m => lookupValue < m.Max && lookupValue >= m.Min ? m.Rebate : null)
            if (newArray.length > 0) {
                val = newArray[0].Rebate

            } else {
                val = 0;
            }
        }


        if (tableKey === "TaxIncome") {
            let tempArr2 = []
            count = 0;

            for (count; count < tempArray.length; count++) {
                let range = tempArray[count].Max - tempArray[count].Min
                tempArr2.push({ ...tempArray[count], "Range": range });

            }

            let tempArr3 = [];

            count = 0;
            for (count; count < tempArr2.length; count++) {
                let bracketPortion = tempArr2[count].Range * tempArr2[count].Rate
                tempArr3.push({ ...tempArr2[count], "TaxBracketPortion": bracketPortion });

            }

            let accVal = 0;
            let tempArr4 = []
            count = 0;

            for (count; count < tempArr3.length; count++) {

                let bracketPortion = accVal

                tempArr4.push({ ...tempArr3[count], "CumulativeTaxPortion": bracketPortion })

                accVal = tempArr3[count].TaxBracketPortion + bracketPortion;
            }

            count = 0;
            let tempResult = 0;

            for (count; count < tempArr4.length; count++) {
                if (lookupValue >= tempArr4[count].Min && lookupValue < tempArr4[count].Max) {
                    tempResult = (lookupValue - tempArr4[count].Min) * tempArr4[count].Rate + tempArr4[count].CumulativeTaxPortion
                }
            }

            val = tempResult

        }

        return this.addTo(payRollData, val)
    }

    accept(visitor) {
        visitor.visit_lookupstep(this);
        return visitor
    }

}