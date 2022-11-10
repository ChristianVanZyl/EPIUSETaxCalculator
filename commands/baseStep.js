

export class BaseStep{
    constructor(nameOf, description, type){
        this.nameOf = nameOf;
        this.description = description
        this.type = type
    }

    execute(payRollData){
        throw Error("Must be implemented")
    }

    addTo(payRollData, value){
        
        const name = this.nameOf
        const desc = this.description
        const typ = this.type
        
        payRollData.set(name, {description: desc, type: typ, value: value})
        
        return payRollData
    }

  
}