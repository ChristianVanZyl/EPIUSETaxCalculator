import fsPromises from 'fs/promises';

// used to calculate various values to use for frontend display, most importantly paye and net pay. 
// the params are the given user inputs

export default async function calcNet(ageInput,incomeInput) {
    let age = ageInput; 
    let period = 12;
    let income = Math.round(incomeInput * 100) / 100;
    let resultBeforeRebate = 0;
    let taxTotal = 0;
    let paye = 0
    let netMonthly = 0;
    let netYearly = 0;
    let resultTaxThresh = await calcThreshold(age)
    let returnObj = {};

    let resultUIFObj = await calcUIF(income)
    let viability = await calcTaxViability(income, resultTaxThresh)
    let resultRebate = await calcRebate(age)


    if(viability){
         resultBeforeRebate = await calcTaxBeforeRebate(income);
         taxTotal = resultBeforeRebate - resultRebate;
         paye = calcPaye(taxTotal)
    }

    netMonthly = income/period - paye - resultUIFObj.Monthly
    netYearly = netMonthly * period;
    

    resultRebate = Math.round(resultRebate * 100) / 100;
    resultBeforeRebate = Math.round(resultBeforeRebate * 100) / 100;
    taxTotal = Math.round(taxTotal * 100) / 100;
    paye = Math.round(paye * 100) / 100;
    let uifMonthly = Math.round(resultUIFObj.Monthly * 100) / 100;
    netMonthly = Math.round(netMonthly * 100) / 100;
    netYearly = Math.round(netYearly * 100) / 100;

    returnObj = {
       
        "taxThreshold": resultTaxThresh,
        "taxRebate": resultRebate,
        "yearlyBeforeRebate": resultBeforeRebate,
        "taxTotal": taxTotal,
        "paye": paye,
        "uifMax": resultUIFObj.Max,
        "uifPerc": resultUIFObj.Percentage,
        "uifMonthly": uifMonthly,
        "netMonthly": netMonthly,
        "netYearly": netYearly  
    }
   
    return returnObj   
}


// used to read and parse json file data
// the value param refers to the json filename

async function read(value){
 try {
        const readObject = await fsPromises.readFile(value, 'utf8');
        let returnObj = JSON.parse(readObject);
        return returnObj
    } catch (err) {
        return console.log(err.message);
    }
}

// fetch necessary json data and add minAge, as well as max age = infinity to the object array

async function fetchAndAddAge(jsonFileName){
    
    let count = 0
    // minAgeArr is instantiated with a 0 value to provide the base minimum value
    let minAgeArr = [{
        "id": 1,
        "MinAge": 0
    }];

    try{
        
    let threshold = await read(jsonFileName);
        
    // minAgeArr is filled with the values from threshold, excluding the null value
    for(count; count < threshold.length; count++){
            if(threshold[count].MaxAge !== null){
                minAgeArr.push({ "id": count+2, "MinAge": threshold[count].MaxAge});
        }
    }
     

    // merge threshold and minAge arrays, recreating threshold array with added minAge
    let mergeArray = [];
    count = 0;
    
    for(count; count < threshold.length; count++){
        if(threshold[count].id === minAgeArr[count].id){
            mergeArray.push({ ...threshold[count], "MinAge": minAgeArr[count].MinAge});
        }
    }

    const index = mergeArray.findIndex(obj => {
        if(obj.MaxAge === null){
            return obj.id;
        };
      }); 
    
    // assign Infinity to MaxAge
    mergeArray[index].MaxAge = Infinity;
    
    return mergeArray;
    
    }catch (err) {
    console.log(err.message);
    }

}

// fetch necessary json data and add MinIncome, Range, BracketPortion, Cumulative TaxPortion and MaxAmount = infinity to the object array

async function fetchAndAddIncome(jsonFileName){
    
    let count = 0
    // The minimum amount is instantiated with a 0 value to provide the base 
    let minIncomeArr = [{
        "id": 1,
        "Min": 0
    }];

    try{
        
    let taxIncome = await read(jsonFileName);
        
    // minIncomeArr is filled with the values from taxIncome, excluding the null value
    for(count; count < taxIncome.length; count++){
            if(taxIncome[count].Max !== null){
                minIncomeArr.push({ "id": count+2, "Min": taxIncome[count].Max});
        }
    }
     

    // merge taxIncome and minIncomeArr arrays, recreating taxIncome array with added minIncomeArr
    let mergeArray = [];
    count = 0;
    
    for(count; count < taxIncome.length; count++){
        if(taxIncome[count].id === minIncomeArr[count].id){
            mergeArray.push({ ...taxIncome[count], "Min": minIncomeArr[count].Min});
        }
    }

    const index = mergeArray.findIndex(obj => {
        if(obj.Max === null){
            return obj.id;
        };
      }); 
    
    // assign Infinity to Max
    mergeArray[index].Max = Infinity;


    let secondMergeArray = []
    count = 0;
    
    for(count; count < mergeArray.length; count++){
        let range = mergeArray[count].Max - mergeArray[count].Min
        secondMergeArray.push({ ...mergeArray[count], "Range": range});
        
    }
    let thirdMergeArray = []
    count = 0;

    for(count; count < secondMergeArray.length; count++){
        let bracketPortion = secondMergeArray[count].Range * secondMergeArray[count].Rate
        thirdMergeArray.push({ ...secondMergeArray[count], "TaxBracketPortion": bracketPortion});
        
    }

    let fourthMergeArray = []
  
    let tempObj = 0;
    count = 0;
  
     for(count; count < thirdMergeArray.length; count++){
        
        let bracketPortion = tempObj

        fourthMergeArray.push({ ...thirdMergeArray[count], "CumulativeTaxPortion": bracketPortion })
          
        tempObj = thirdMergeArray[count].TaxBracketPortion + bracketPortion;  
    }
 
    return fourthMergeArray;
    
    }catch (err) {
    console.log(err.message);
    }
}

// used to determine the tax threshold a user belongs to according to their age
// the ageInput param refers to user input received from exported function calcNet

async function calcThreshold(ageInput){

    let age = ageInput
    
    try{
    let dataArray = await fetchAndAddAge("taxThreshold.json");    
    let newArray = dataArray.filter(m => age < m.MaxAge && age >= m.MinAge ? m.MinAmount : null)  
    const returnObj = newArray[0].MinAmount
    return returnObj;
    }catch(err){
    console.log(err.message);
    }
}

// used to calculate monthly UIF payment and passes UIF variables to calcNet

async function calcUIF(incomeInput) {
    let income = incomeInput;
   
    let uifMax = 177.12;
    let uifPerc = 0.01;
    let uifMonthly = income / 12 * uifPerc
 
    let uifResult = 0;
    try{
        if(uifMonthly > uifMax){
            uifResult= uifMax
        }else{
            uifResult = uifMonthly    
        }
     const uifObject = {
        "Max": uifMax,
        "Percentage": uifPerc * 100,
        "Monthly": uifResult,
     }
    return uifObject;

    }catch(err){
    console.log(err.message);
    }
 
}

// used to check whether user qualifies to pay tax according to their tax threshold

async function calcTaxViability(income, amount) {
    let viability; 
  
    try{
    if(income >= amount){
        viability = true;
    }else{
        viability = false;
    }
 
    return viability;
    }catch(err){
    console.log(err.message);
    }
}


// used to calculate all tax before rebate is deducted

async function calcTaxBeforeRebate(incomeInput) {
    let income = incomeInput;
    let counter = 0;
    let result = 0;
    try{
    let dataArray = await fetchAndAddIncome("taxIncome.json");    

    for(counter; counter < dataArray.length; counter++){
        if(income >= dataArray[counter].Min && income < dataArray[counter].Max ){
            result = (income - dataArray[counter].Min) * dataArray[counter].Rate + dataArray[counter].CumulativeTaxPortion
        }
    }

    return result;
    }catch(err){
    console.log(err.message);
    }
}



// used to calculate the rebate that the user qualifies for

async function calcRebate(ageInput) {
    let age = ageInput
    let dataArray = await fetchAndAddAge("taxRebate.json");
   
    try{
        let count = 0;
        let mergeArray = [];
        let rebate = 0;

        for(count; count < dataArray.length; count++){     
                rebate = rebate + dataArray[count].Amount;
                mergeArray.push({ ...dataArray[count], "Rebate": rebate});  
        }
       
        let newArray = mergeArray.filter(m => age < m.MaxAge && age >= m.MinAge ? m.Rebate : null)  
        const returnObj = newArray[0].Rebate
        return returnObj;
        }catch(err){
        console.log(err.message);
     }
}

async function calcPaye(taxtotal) {
    let result = 0
    let period = 12;
    try{
        result = taxtotal / period
        
        return result;
        }catch(err){
        console.log(err.message);
     }
}






