import {SetConstant} from "./commands/SetConstant.js"
import {AnnualizationStep} from "./commands/annualizationStep.js"
import {CalculateStep} from "./commands/calculateStep.js"
import { CapStep } from "./commands/capStep.js"
import { InputStep } from "./commands/inputStep.js"
import { LoadTableStep } from "./commands/loadTableStep.js"
import { LookupTableStep } from "./commands/lookupTableStep.js"


const a = new InputStep("income")
const b = new InputStep("age")
const c = new InputStep("periods_per_year")
const d = new AnnualizationStep("income", "periods_per_year", "annual_income"); 
const e = new SetConstant("uif_percentage")
const f = new SetConstant("uif_max")
const g = new CalculateStep("income", "*", "uif_percentage", "uif_monthly_not_capped")
const h = new CapStep("uif_max", "uif_monthly_not_capped", "uif_total")
const i = new LoadTableStep("threshold_table", "tax_threshold_table")
const j = new LookupTableStep("age", "tax_threshold_table", "tax_threshold_total")
const k = new LoadTableStep("rebate_table", "tax_rebate_table")
const l = new LookupTableStep("age", "tax_rebate_table", "tax_rebate_total")
const m = new LoadTableStep("income_table", "tax_income_table")
const n = new LookupTableStep("annual_income", "tax_income_table", "tax_before_rebate_total")
const o = new CalculateStep("tax_before_rebate_total", "-", "tax_rebate_total", "yearly_payable_tax")
const p = new CalculateStep("yearly_payable_tax", "/", "periods_per_year", "paye_tax_total")
const q = new CalculateStep("income", "-", "paye_tax_total", "income_after_pay_deduct")
const r = new CalculateStep("income_after_pay_deduct", "-", "uif_total", "net_monthly")
const s = new CalculateStep("net_monthly", "*", "periods_per_year", "net_yearly")


let stepsArr = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s]

let map = new Map();

map.set("income", 10);
map.set("age", 7);
map.set("periods_per_year", 12);
map.set("uif_percentage", 0.01);
map.set("uif_max", 177.12);

map.set("threshold_table", "taxThresholdTable.json")
map.set("rebate_table", "taxRebateTable.json")
map.set("income_table", "taxIncomeTable.json")

stepsArr.forEach((step)=> {
    step.execute(map)
})

console.table(map)

// // test SetConstant
// stepsArr = [a, b]

// map.set("uif_percentage", 0.01);
// map.set("uif_max", 177.12);

// stepsArr.forEach((step)=> {
//     step.execute(map)
// })

// console.table(map)

// // test AnnualizationStep
// stepsArr.push(c)

// map.set("income", 20000);
// map.set("periods_per_year", 12)

// stepsArr.forEach((step)=> {
//     step.execute(map)
// })

// console.table(map)

// test CalculateStep


// map.set("income", 20000);
// map.set("periods_per_year", 12);



// stepsArr.forEach((step)=> {
//     step.execute(map)
// })

// console.table(map)

// // test CapStep
// stepsArr.push(e)

// stepsArr.forEach((step)=> {
//     step.execute(map)
// })

// console.table(map)