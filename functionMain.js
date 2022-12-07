import dataLoader from "./dataLoader.js";
import { PayrollMain } from "./payrollMain.js";
import { parseCreate } from "./factory/factoryParseCreate.js";
import commandsFactory from "./commands/commandsFactory.js";


// new function, contains async init 
// factory returns init 

export async function loadStepsJson(filename){
    const stepsJson = await dataLoader(filename); 
    let result = await loadSteps(stepsJson)
    return result
}

export async function loadSteps(stepsJson){
    
    const factory = commandsFactory();
    const parsedSteps = parseCreate(factory, stepsJson)
    // need to init somewhere
    const payroll = new PayrollMain(parsedSteps);
    

    return payroll 
} 