export class BaseStep{
    constructor(){

    }

    execute(payRollData){
        throw Error("Must be implemented")
    }

}