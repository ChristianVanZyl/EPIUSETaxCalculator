


export class PayRollData{
    constructor(map){
        this.map = map
    }

    hasType(inputvalue){
        let returnvalue = new Map(
            [...this.map]
            .filter(([key, value]) => value.type == inputvalue )
        );
        return returnvalue
    }

}



