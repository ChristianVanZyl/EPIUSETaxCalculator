import {BaseStep} from "./baseStep.js"
 // new LookupTableStep("age", "tax_threshold_data", "tax_threshold_total") 
export class LookupTableStep extends BaseStep{

    constructor(lookupValue, tableData, outputName){
        super()
        this.lookupValue = lookupValue
        this.tableData = tableData
        this.outputName = outputName
    }

    execute(payRollData){
        const lookupValue = Number(payRollData.get(this.lookupValue))
        const tableData = payRollData.get(this.tableData)
        
        let tableKey =  (Object.keys(tableData)).toString()
        let objectArrayofData = tableData[tableKey];
        
       
        // create a temp array and min values array 
        // use chosen array and populate min values array
        // merge min value array with chosen array, store in temp array
        // use temp array for calculations
        let tempArray = [];
        let result;
        let count = 0
        let minArray = [{
            "id": 1,
            "Min": 0
        }];

        for(count; count < objectArrayofData.length; count++){
        if(objectArrayofData[count].Max !== null){
            minArray.push({ "id": count+2, "Min": objectArrayofData[count].Max});
        }
        }
 
        count = 0;

        for(count; count < objectArrayofData.length; count++){
        if(objectArrayofData[count].id === minArray[count].id){
            tempArray.push({ ...objectArrayofData[count], "Min": minArray[count].Min});
        }
        }
        
        const index = tempArray.findIndex(obj => {
            if(obj.Max === null){
                return obj.id;
            };
          }); 
        tempArray[index].Max = Infinity;
        count = 0;
    
        // use temp array that populated min results
        // identify next step (which if statement to follow) with table key
        // use lookupvalue for final result
   
        if(tableKey == "TaxThreshold"){
        
        let newArray = tempArray.filter(m => lookupValue < m.Max && lookupValue >= m.Min ? m.Amount : null)  
        result = newArray[0].Amount
        }
    
      
        if(tableKey === "TaxRebate"){
        let rebate = 0;
        let tempArr2 = [];
        
        for(count; count < tempArray.length; count++){
            rebate = rebate + tempArray[count].Amount;
            tempArr2.push({ ...tempArray[count], "Rebate": rebate}); 
        }
        let newArray = tempArr2.filter(m => lookupValue < m.Max && lookupValue >= m.Min ? m.Rebate : null)  
        result = newArray[0].Rebate  
        
        }

     
        if(tableKey === "TaxIncome"){ 
        

        let tempArr2 = []
        count = 0;
        
        for(count; count < tempArray.length; count++){
            let range = tempArray[count].Max - tempArray[count].Min
            tempArr2.push({ ...tempArray[count], "Range": range});
            
        }
       
        let tempArr3 = [];

        count = 0;
        for(count; count < tempArr2.length; count++){
                let bracketPortion = tempArr2[count].Range * tempArr2[count].Rate
                tempArr3.push({ ...tempArr2[count], "TaxBracketPortion": bracketPortion});
                
        }
      
        let accVal = 0;
        let tempArr4 = []
        count = 0;

        for(count; count < tempArr3.length; count++){
        
            let bracketPortion = accVal
    
            tempArr4.push({ ...tempArr3[count], "CumulativeTaxPortion": bracketPortion })
              
            accVal = tempArr3[count].TaxBracketPortion + bracketPortion;  
        }
      
        count = 0;
        let tempResult = 0;

        for(count; count < tempArr4.length; count++){
            if(lookupValue >= tempArr4[count].Min && lookupValue < tempArr4[count].Max ){
                tempResult = (lookupValue - tempArr4[count].Min) * tempArr4[count].Rate + tempArr4[count].CumulativeTaxPortion
            }
        }

        result = tempResult
        
        }


        payRollData.set(this.outputName, result)

        return payRollData
}
}