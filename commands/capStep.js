// new CapStep("uif_max", "uif_monthly_not_capped") 
export class CapStep{
    constructor(capMax, uncappedValue, result){
            this.capMax = capMax
            this.uncappedValue = uncappedValue
            this.result = result
    }

    execute(payRollData){
        const capMax = Number(payRollData.get(this.capMax))
        const uncappedValue = Number(payRollData.get(this.uncappedValue))
        let total; 
        if(uncappedValue > capMax){
            total = capMax
        }else{
            total = uncappedValue
        }

        payRollData.set(this.result, total)

        return payRollData
    }
}
