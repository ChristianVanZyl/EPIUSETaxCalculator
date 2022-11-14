

export class BaseStep{
    constructor(nameOf, description){
        this.nameOf = nameOf;
        this.description = description
    }

    execute(payRollData){
        throw Error("Must be implemented")
    }

    hasType(inputvalue){
        throw Error("Must be implemented")
    }
    

    addTo(payRollData, value){
        
        const name = this.nameOf
        const desc = this.description
   
        
        payRollData.set(name, {description: desc, value: value})
        
        return payRollData
    }

   




}