import {SetConstant} from "./commands/SetConstant.js"
import {AnnualizationStep} from "./commands/annualizationStep.js"
import {CalculateStep} from "./commands/calculateStep.js"
import { CapStep } from "./commands/capStep.js"
import { InputStep } from "./commands/inputStep.js"
import { LoadTableStep } from "./commands/loadTableStep.js"
import { LookupTableStep } from "./commands/lookupTableStep.js"
import {Steps} from "./composite/composite.js"
import { OutputStep } from "./commands/outputStep.js"
import {PayRollData} from "./payRollData.js"
import configInputs from "./config/configInputs.js"
import configConst from "./config/configConstants.js"      

    export default function processPayRollData(input){
   
    let map = input;
    let mapCon = configConst();

    if(map.size === 0){
        map = configInputs();  
    }else(
        
        map = new Map([...map, ...mapCon])
    )
   
    const steps = new Steps (  
        new InputStep("income", "Enter your income", "input"),
        new InputStep("age", "Enter your age", "input"),
        new InputStep("pay_frequency", "Enter your payment period", "input"),
        new AnnualizationStep("annual_income", "the annual income of a user", "calculation", "income", "pay_frequency"),
        new SetConstant("uif_percentage", "the percentage of a monthly salary at which UIF is capped", "constant"),
        new SetConstant("uif_max", "the max amount of a monthly salary at which UIF is capped", "constant"),
        new CalculateStep("uif_monthly_not_capped", "calculate user's monthly UIF according to %, this is not a capped amount", "calculation", "income", "*", "uif_percentage"),
        new CapStep("uif_total", "User's monthly uncapped UIF is checked against the cap values to determine the total", "cap", "uif_max", "uif_monthly_not_capped"),
        new LoadTableStep("threshold_table", "Table containg SARS data in terms of set thresholds for the year", "taxThresholdTable.json"),
        new LookupTableStep("tax_threshold_total", "Find the user's tax threshold according to their age", "lookup", "age", "threshold_table"),
        new LoadTableStep("rebate_table", "Table containg SARS data showing rebate values according to age caps", "taxRebateTable.json"),
        new LookupTableStep("tax_rebate_total", "Find the tax rebate a user qualifies for according to their age", "lookup", "age", "rebate_table"),
        new LoadTableStep("income_table", "Table containg SARS data showing tax liability according to annual income", "taxIncomeTable.json"),
        new LookupTableStep("tax_before_rebate_total", "Find the tax liability before rebate", "lookup", "annual_income", "income_table"),
        new CalculateStep("yearly_payable_tax", "calculate yearly payable tax", "calculation", "tax_before_rebate_total", "-", "tax_rebate_total"),
        new CalculateStep("paye_tax_total", "calculate the PAYE total", "calculation", "yearly_payable_tax", "/", "pay_frequency"),
        new CalculateStep("income_after_paye_deduct", "calculate income after PAYE deduction from gross income", "calculation", "income", "-", "paye_tax_total"),
        new CalculateStep("net_monthly", "calculate net income per month", "calculation", "income_after_paye_deduct", "-", "uif_total"),
        new CalculateStep("net_yearly", "calculate net income per year", "calculation", "net_monthly", "*", "pay_frequency"),
        new OutputStep("Tax Threshold", "The tax threshold a user qualifies for", "output", "tax_threshold_total"),
        new OutputStep("Rebate", "The rebate a user qualifies for", "output", "tax_rebate_total"),
        new OutputStep("Tax Before Rebate", "The tax total a user is liable for before rebate is deducted", "output", "tax_before_rebate_total"),
        new OutputStep("Yearly Tax", "The total amount of a tax that a user has to pay for the year", "output", "yearly_payable_tax"),
        new OutputStep("Paye", "The user's PAYE amount", "output", "paye_tax_total"),
        new OutputStep("UIF Max", "The maximum amount that a user can pay for monthly UIF", "output", "uif_max"),
        new OutputStep("UIF Percentage", "The percentage of a user's periodic income to be deducted for UIF", "output", "uif_percentage"),
        new OutputStep("UIF Monthly", "The overall UIF a user has to pay. This is capped at UIF Max if the UIF Percentage amount exceeds the UIF Max", "output", "uif_total"),
        new OutputStep("Net Monthly", "The monthly net income of a user", "output", "net_monthly"),
        new OutputStep("Net Yearly", "The yearly net income of a user", "output", "net_yearly")
    )
    
  
    steps.execute(map);
    
    const payrollData = new PayRollData(map)
    
    let inputs =  payrollData.hasType("input")
    let outputs = payrollData.hasType("output")
    const ioArray = [inputs, outputs]  
   
 
    return ioArray
    
   
}











   

